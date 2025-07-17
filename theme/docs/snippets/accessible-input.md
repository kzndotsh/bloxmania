# accessible-input



## Parameters


### input_type
- **Type**: String
- **Description**: Input type (default: "text")

### input_id
- **Type**: String
- **Description**: Unique ID for the input (required)

### input_name
- **Type**: String
- **Description**: Input name attribute (default: input_id)

### input_class
- **Type**: String
- **Description**: CSS classes for the input (optional)

### input_value
- **Type**: String
- **Description**: Input value (optional)

### input_placeholder
- **Type**: String
- **Description**: Input placeholder (optional)

### input_required
- **Type**: Boolean
- **Description**: Whether input is required (default: false)

### input_disabled
- **Type**: Boolean
- **Description**: Whether input is disabled (default: false)

### input_readonly
- **Type**: Boolean
- **Description**: Whether input is readonly (default: false)

### input_autocomplete
- **Type**: String
- **Description**: Autocomplete attribute (optional)

### input_pattern
- **Type**: String
- **Description**: Pattern attribute for validation (optional)

### input_min
- **Type**: String
- **Description**: Min attribute for number/date inputs (optional)

### input_max
- **Type**: String
- **Description**: Max attribute for number/date inputs (optional)

### input_step
- **Type**: String
- **Description**: Step attribute for number inputs (optional)

### input_maxlength
- **Type**: String
- **Description**: Maximum length for text inputs (optional)

### input_minlength
- **Type**: String
- **Description**: Minimum length for text inputs (optional)

### label_text
- **Type**: String
- **Description**: Label text (required)

### label_class
- **Type**: String
- **Description**: CSS classes for the label (optional)

### help_text
- **Type**: String
- **Description**: Help text for the input (optional)

### error_text
- **Type**: String
- **Description**: Error message (optional)

### wrapper_class
- **Type**: String
- **Description**: CSS classes for the wrapper (optional)


## Dependencies


- **snippet**: accessible-input


## Usage


```liquid
{% render 'accessible-input',
```

```liquid
input_id: 'email',
```

```liquid
input_type: 'email',
```

```liquid
label_text: 'Email Address',
```

```liquid
input_required: true,
```

```liquid
help_text: 'We will never share your email address'
```

```liquid
%}
```



