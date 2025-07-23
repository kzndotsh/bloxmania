# accessible-button



## Parameters


### button_type
- **Type**: String
- **Description**: Button type (default: "button")

### button_id
- **Type**: String
- **Description**: Unique ID for the button (optional)

### button_class
- **Type**: String
- **Description**: CSS classes for the button (optional)

### button_text
- **Type**: String
- **Description**: Button text content (required)

### button_disabled
- **Type**: Boolean
- **Description**: Whether button is disabled (default: false)

### button_loading
- **Type**: Boolean
- **Description**: Whether button is in loading state (default: false)

### button_pressed
- **Type**: Boolean
- **Description**: Whether button is pressed (for toggle buttons) (optional)

### button_expanded
- **Type**: Boolean
- **Description**: Whether button controls expanded content (optional)

### button_controls
- **Type**: String
- **Description**: ID of element controlled by button (optional)

### button_describedby
- **Type**: String
- **Description**: ID of element describing the button (optional)

### button_label
- **Type**: String
- **Description**: ARIA label for the button (optional)

### button_onclick
- **Type**: String
- **Description**: JavaScript onclick handler (optional)

### button_form
- **Type**: String
- **Description**: Form ID this button belongs to (optional)

### button_formaction
- **Type**: String
- **Description**: Form action for submit buttons (optional)

### button_formmethod
- **Type**: String
- **Description**: Form method for submit buttons (optional)

### button_icon
- **Type**: String
- **Description**: Icon HTML/SVG (optional)

### button_icon_position
- **Type**: String
- **Description**: Icon position: "left" or "right" (default: "left")

### loading_text
- **Type**: String
- **Description**: Loading state text (default: "Loading...")

### wrapper_class
- **Type**: String
- **Description**: CSS classes for the wrapper (optional)


## Dependencies


- **snippet**: accessible-button


## Usage


```liquid
{% render 'accessible-button',
```

```liquid
button_text: 'Add to Cart',
```

```liquid
button_type: 'submit',
```

```liquid
button_class: 'btn-primary',
```

```liquid
button_icon: '<svg>...</svg>'
```

```liquid
%}
```



