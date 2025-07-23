# button



## Parameters


### button_text
- **Type**: String
- **Description**: Button text content (required)

### button_url
- **Type**: String
- **Description**: Button URL/href (optional)

### button_type
- **Type**: String
- **Description**: Button type. Values are "button", "submit", "reset". Default: "button" (optional)

### button_style
- **Type**: String
- **Description**: Button style variant. Values are "primary", "secondary", "outline", "ghost", "danger". Default: "primary" (optional)

### button_size
- **Type**: String
- **Description**: Button size. Values are "small", "medium", "large". Default: "medium" (optional)

### button_full_width
- **Type**: Boolean
- **Description**: Make button full width. Default: false (optional)

### button_disabled
- **Type**: Boolean
- **Description**: Disable button. Default: false (optional)

### button_loading
- **Type**: Boolean
- **Description**: Show loading state. Default: false (optional)

### button_icon
- **Type**: String
- **Description**: Icon name to display (optional)

### button_icon_position
- **Type**: String
- **Description**: Icon position. Values are "left", "right". Default: "left" (optional)

### button_id
- **Type**: String
- **Description**: Button ID attribute (optional)

### button_class
- **Type**: String
- **Description**: Additional CSS classes (optional)

### button_attributes
- **Type**: String
- **Description**: Additional HTML attributes (optional)

### button_aria_label
- **Type**: String
- **Description**: ARIA label for accessibility (optional)

### button_form_id
- **Type**: String
- **Description**: Form ID for submit buttons (optional)


## Dependencies


- **snippet**: button

- **snippet**: button

- **snippet**: icon

- **snippet**: icon

- **snippet**: loading-spinner

- **snippet**: icon

- **snippet**: icon

- **snippet**: loading-spinner


## Usage


```liquid
{% render 'button', button_text: 'Add to Cart', button_style: 'primary', button_type: 'submit' %}
```

```liquid
{% render 'button', button_text: 'View Product', button_url: product.url, button_style: 'secondary' %}
```



