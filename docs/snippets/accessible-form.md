# accessible-form



## Parameters


### form_id
- **Type**: String
- **Description**: Unique ID for the form (required)

### form_class
- **Type**: String
- **Description**: CSS classes for the form (optional)

### form_action
- **Type**: String
- **Description**: Form action URL (optional)

### form_method
- **Type**: String
- **Description**: Form method (default: "post")

### form_enctype
- **Type**: String
- **Description**: Form encoding type (optional)

### form_novalidate
- **Type**: Boolean
- **Description**: Disable HTML5 validation (default: false)

### form_autocomplete
- **Type**: String
- **Description**: Form autocomplete setting (default: "on")

### form_aria_label
- **Type**: String
- **Description**: ARIA label for the form (optional)

### form_aria_describedby
- **Type**: String
- **Description**: ARIA describedby for the form (optional)

### submit_button_text
- **Type**: String
- **Description**: Submit button text (default: "Submit")

### submit_button_class
- **Type**: String
- **Description**: Submit button CSS classes (optional)

### loading_text
- **Type**: String
- **Description**: Loading state text (default: "Submitting...")

### success_message
- **Type**: String
- **Description**: Success message (optional)

### error_message
- **Type**: String
- **Description**: Error message (optional)


## Dependencies


- **snippet**: accessible-form


## Usage


```liquid
{% render 'accessible-form',
```

```liquid
form_id: 'contact-form',
```

```liquid
form_action: '/contact',
```

```liquid
form_aria_label: 'Contact form',
```

```liquid
submit_button_text: 'Send Message'
```

```liquid
%}
```



