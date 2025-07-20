/**
 * BloxMania Dawn-Style Utilities
 * Following Dawn's utility patterns for maintainable theme architecture
 */

// Section ID utility following Dawn's pattern
// Only declare if not already declared
if (typeof SectionId === 'undefined') {
  class SectionId {
    static separator = '__';

    // For a qualified section id (e.g. 'template--22224696705326__main'), return just the section id (e.g. 'template--22224696705326')
    static parseId(qualifiedSectionId) {
      return qualifiedSectionId.split(SectionId.separator)[0];
    }

    // For a qualified section id (e.g. 'template--22224696705326__main'), return just the section name (e.g. 'main')
    static parseSectionName(qualifiedSectionId) {
      return qualifiedSectionId.split(SectionId.separator)[1];
    }

    // For a section id (e.g. 'template--22224696705326') and a section name (e.g. 'recommended-products'), return a qualified section id (e.g. 'template--22224696705326__recommended-products')
    static getIdForSection(sectionId, sectionName) {
      return `${sectionId}${SectionId.separator}${sectionName}`;
    }
  }

  // Export for global scope
  window.SectionId = SectionId;
}

// HTML Update Utility following Dawn's pattern
// Only declare if not already declared
if (typeof HTMLUpdateUtility === 'undefined') {
  class HTMLUpdateUtility {
    /**
     * Used to swap an HTML node with a new node.
     * The new node is inserted as a previous sibling to the old node, the old node is hidden, and then the old node is removed.
     *
     * The function currently uses a double buffer approach, but this should be replaced by a view transition once it is more widely supported https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
     */
    static viewTransition(
      oldNode,
      newContent,
      preProcessCallbacks = [],
      postProcessCallbacks = []
    ) {
      preProcessCallbacks?.forEach((callback) => callback(newContent));

      const newNodeWrapper = document.createElement('div');
      HTMLUpdateUtility.setInnerHTML(newNodeWrapper, newContent.outerHTML);
      const newNode = newNodeWrapper.firstChild;

      // dedupe IDs
      const uniqueKey = Date.now();
      oldNode.querySelectorAll('[id], [form]').forEach((element) => {
        element.id && (element.id = `${element.id}-${uniqueKey}`);
        element.form &&
          element.setAttribute(
            'form',
            `${element.form.getAttribute('id')}-${uniqueKey}`
          );
      });

      oldNode.parentNode.insertBefore(newNode, oldNode);
      oldNode.style.display = 'none';

      postProcessCallbacks?.forEach((callback) => callback(newNode));

      setTimeout(() => oldNode.remove(), 500);
    }

    // Sets inner HTML and reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
    static setInnerHTML(element, html) {
      element.innerHTML = html;
      element.querySelectorAll('script').forEach((oldScriptTag) => {
        const newScriptTag = document.createElement('script');
        Array.from(oldScriptTag.attributes).forEach((attribute) => {
          newScriptTag.setAttribute(attribute.name, attribute.value);
        });
        newScriptTag.appendChild(
          document.createTextNode(oldScriptTag.innerHTML)
        );
        oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
      });
    }
  }

  // Export for global scope
  window.HTMLUpdateUtility = HTMLUpdateUtility;
}

// Focus management utilities following Dawn's pattern
const trapFocusHandlers = {};

// Only declare if not already declared
if (typeof trapFocus === 'undefined') {
  function trapFocus(container, elementToFocus = container) {
    const { getFocusableElements } = window.BloxManiaConstants || {};
    const elements = getFocusableElements
      ? getFocusableElements(container)
      : Array.from(
          container.querySelectorAll(
            "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
          )
        );

    const first = elements[0];
    const last = elements[elements.length - 1];

    removeTrapFocus();

    trapFocusHandlers.focusin = (event) => {
      if (
        event.target !== container &&
        event.target !== last &&
        event.target !== first
      )
        return;

      document.addEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function () {
      document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function (event) {
      if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
      // On the last focusable element and tab forward, focus the first element.
      if (event.target === last && !event.shiftKey) {
        event.preventDefault();
        first.focus();
      }

      //  On the first focusable element and tab backward, focus the last element.
      if (
        (event.target === container || event.target === first) &&
        event.shiftKey
      ) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);

    elementToFocus.focus();

    if (
      elementToFocus.tagName === 'INPUT' &&
      ['search', 'text', 'email', 'url'].includes(elementToFocus.type) &&
      elementToFocus.value
    ) {
      elementToFocus.setSelectionRange(0, elementToFocus.value.length);
    }
  }

  // Export for global scope
  window.trapFocus = trapFocus;
}

// Only declare if not already declared
if (typeof removeTrapFocus === 'undefined') {
  function removeTrapFocus(elementToFocus = null) {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);

    if (elementToFocus) elementToFocus.focus();
  }

  // Export for global scope
  window.removeTrapFocus = removeTrapFocus;
}

// Keyboard event utilities
// Only declare if not already declared
if (typeof onKeyUpEscape === 'undefined') {
  function onKeyUpEscape(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if (!openDetailsElement) return;

    const summaryElement = openDetailsElement.querySelector('summary');
    const openModalElement = openDetailsElement.closest(
      'details[open] > .modal__content'
    );

    if (openModalElement) {
      const modalElement = openModalElement.closest('details[open]');
      const modalToggle = modalElement.querySelector('summary');
      modalToggle.focus();
      modalToggle.click();
    } else if (summaryElement) {
      summaryElement.focus();
      summaryElement.click();
    }
  }

  // Export for global scope
  window.onKeyUpEscape = onKeyUpEscape;
}

// Media utilities following Dawn's pattern
// Only declare if not already declared
if (typeof pauseAllMedia === 'undefined') {
  function pauseAllMedia() {
    document.querySelectorAll('.js-youtube').forEach((video) => {
      video.contentWindow.postMessage(
        '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
        '*'
      );
    });
    document.querySelectorAll('.js-vimeo').forEach((video) => {
      video.contentWindow.postMessage('{"method":"pause"}', '*');
    });
    document.querySelectorAll('video').forEach((video) => video.pause());
    document.querySelectorAll('product-model').forEach((model) => {
      if (model.modelViewerUI) model.modelViewerUI.pause();
    });
  }

  // Export for global scope
  window.pauseAllMedia = pauseAllMedia;
}

// Fetch configuration utility following Dawn's pattern
// Only declare if not already declared
if (typeof fetchConfig === 'undefined') {
  function fetchConfig(type = 'json') {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: type === 'json' ? 'application/json' : 'text/html',
      },
    };
  }

  // Export for global scope
  window.fetchConfig = fetchConfig;
}

// Pub/Sub event system following Dawn's pattern
class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }

  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

// Export utilities for use in other modules
window.DawnUtilities = {
  SectionId,
  HTMLUpdateUtility,
  trapFocus,
  removeTrapFocus,
  onKeyUpEscape,
  pauseAllMedia,
  fetchConfig,
  PubSub,
};
