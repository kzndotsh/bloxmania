/**
 * Quantity Input - Following Dawn's Web Component patterns
 * Handles quantity input with increment/decrement buttons and validation
 */

class QuantityInput extends HTMLElement {
  constructor() {
    super();

    this.input = null;
    this.decreaseButton = null;
    this.increaseButton = null;
    this.min = 1;
    this.max = null;
    this.step = 1;
  }

  connectedCallback() {
    this.setupDOM();
    this.setupEventListeners();
    this.setupAccessibility();
    this.updateButtonStates();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupDOM() {
    this.input = this.querySelector('input[type="number"]');

    // Look for buttons with various possible selectors
    this.decreaseButton = this.querySelector(
      '.quantity-decrease, [data-action="decrease"], [name="minus"], .quantity__button[name="minus"]'
    );
    this.increaseButton = this.querySelector(
      '.quantity-increase, [data-action="increase"], [name="plus"], .quantity__button[name="plus"]'
    );

    // Get attributes from input or element
    this.min = parseInt(
      this.input?.getAttribute('min') || this.getAttribute('min') || '1'
    );
    this.max =
      parseInt(this.input?.getAttribute('max') || this.getAttribute('max')) ||
      null;
    this.step = parseInt(
      this.input?.getAttribute('step') || this.getAttribute('step') || '1'
    );

    // Ensure input has proper attributes
    if (this.input) {
      this.input.setAttribute('min', this.min.toString());
      if (this.max) {
        this.input.setAttribute('max', this.max.toString());
      }
      this.input.setAttribute('step', this.step.toString());
    }
  }

  setupEventListeners() {
    // Input events
    if (this.input) {
      this.input.addEventListener('input', this.handleInput.bind(this));
      this.input.addEventListener('change', this.handleChange.bind(this));
      this.input.addEventListener('blur', this.handleBlur.bind(this));
      this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    // Button events - single click only
    if (this.decreaseButton) {
      this.decreaseButton.addEventListener(
        'click',
        this.handleDecrease.bind(this)
      );
    }

    if (this.increaseButton) {
      this.increaseButton.addEventListener(
        'click',
        this.handleIncrease.bind(this)
      );
    }
  }

  setupAccessibility() {
    // Set up ARIA attributes
    if (this.input) {
      this.input.setAttribute('role', 'spinbutton');
      this.input.setAttribute('aria-label', 'Quantity');
    }

    if (this.decreaseButton) {
      this.decreaseButton.setAttribute('aria-label', 'Decrease quantity');
      this.decreaseButton.setAttribute('type', 'button');
    }

    if (this.increaseButton) {
      this.increaseButton.setAttribute('aria-label', 'Increase quantity');
      this.increaseButton.setAttribute('type', 'button');
    }

    // Add live region for screen readers
    if (!this.querySelector('[aria-live]')) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'visually-hidden';
      liveRegion.id = `quantity-live-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      this.appendChild(liveRegion);
    }
  }

  handleInput(event) {
    // Real-time validation during typing
    const value = parseInt(event.target.value);

    if (isNaN(value) || value < this.min) {
      // Don't prevent typing, but show visual feedback
      this.input.classList.add('quantity-input--invalid');
    } else {
      this.input.classList.remove('quantity-input--invalid');
    }

    this.updateButtonStates();
  }

  handleChange(event) {
    this.validateAndUpdate();
  }

  handleBlur(event) {
    this.validateAndUpdate();
  }

  handleKeydown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.changeQuantity(this.step);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.changeQuantity(-this.step);
        break;
      case 'Enter':
        event.preventDefault();
        this.validateAndUpdate();
        break;
    }
  }

  handleDecrease(event) {
    event.preventDefault();
    this.changeQuantity(-this.step);
  }

  handleIncrease(event) {
    event.preventDefault();
    this.changeQuantity(this.step);
  }

  changeQuantity(delta) {
    const currentValue = parseInt(this.input.value) || this.min;
    const newValue = currentValue + delta;

    this.setValue(newValue);
  }

  setValue(value) {
    const validatedValue = this.validateValue(value);

    if (this.input.value !== validatedValue.toString()) {
      this.input.value = validatedValue;
      this.input.dispatchEvent(new Event('change', { bubbles: true }));

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent('quantity:changed', {
          bubbles: true,
          detail: {
            value: validatedValue,
            previousValue:
              parseInt(this.input.dataset.previousValue) || this.min,
            input: this,
          },
        })
      );

      // Update previous value
      this.input.dataset.previousValue = validatedValue.toString();

      // Announce to screen readers
      this.announceQuantityChange(validatedValue);
    }

    this.updateButtonStates();
  }

  validateValue(value) {
    const numValue = parseInt(value);

    // Handle invalid input
    if (isNaN(numValue)) {
      return this.min;
    }

    // Enforce minimum
    if (numValue < this.min) {
      return this.min;
    }

    // Enforce maximum
    if (this.max && numValue > this.max) {
      return this.max;
    }

    // Enforce step
    const remainder = (numValue - this.min) % this.step;
    if (remainder !== 0) {
      return numValue - remainder;
    }

    return numValue;
  }

  validateAndUpdate() {
    const currentValue = parseInt(this.input.value);
    const validatedValue = this.validateValue(currentValue);

    if (currentValue !== validatedValue) {
      this.setValue(validatedValue);
    }
  }

  updateButtonStates() {
    const currentValue = parseInt(this.input.value) || this.min;

    // Update decrease button
    if (this.decreaseButton) {
      const canDecrease = currentValue > this.min;
      this.decreaseButton.disabled = !canDecrease;
      this.decreaseButton.setAttribute('aria-disabled', !canDecrease);
    }

    // Update increase button
    if (this.increaseButton) {
      const canIncrease = !this.max || currentValue < this.max;
      this.increaseButton.disabled = !canIncrease;
      this.increaseButton.setAttribute('aria-disabled', !canIncrease);
    }
  }

  announceQuantityChange(value) {
    const liveRegion = this.querySelector('[aria-live]');
    if (liveRegion) {
      liveRegion.textContent = `Quantity changed to ${value}`;
    }
  }

  cleanup() {
    // Remove event listeners if needed
  }

  // Getters and setters
  get value() {
    return parseInt(this.input?.value) || this.min;
  }

  set value(newValue) {
    this.setValue(newValue);
  }

  get minimum() {
    return this.min;
  }

  set minimum(newMin) {
    this.min = parseInt(newMin);
    if (this.input) {
      this.input.setAttribute('min', this.min.toString());
    }
    this.validateAndUpdate();
  }

  get maximum() {
    return this.max;
  }

  set maximum(newMax) {
    this.max = parseInt(newMax);
    if (this.input) {
      if (this.max) {
        this.input.setAttribute('max', this.max.toString());
      } else {
        this.input.removeAttribute('max');
      }
    }
    this.validateAndUpdate();
  }

  // Public methods
  increase() {
    this.changeQuantity(this.step);
  }

  decrease() {
    this.changeQuantity(-this.step);
  }

  reset() {
    this.setValue(this.min);
  }
}

// Register the component
if (!customElements.get('quantity-input')) {
  customElements.define('quantity-input', QuantityInput);
}
