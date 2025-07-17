# icon



## Parameters


### icon
- **Type**: String
- **Description**: Icon name (required)

### size
- **Type**: String
- **Description**: Icon size. Values are "small", "medium", "large", "xlarge". Default: "medium" (optional)

### color
- **Type**: String
- **Description**: Icon color. Values are "primary", "secondary", "white", "gray", "current". Default: "current" (optional)

### class
- **Type**: String
- **Description**: Additional CSS classes (optional)

### alt
- **Type**: String
- **Description**: Alternative text for accessibility (optional)

### aria_hidden
- **Type**: Boolean
- **Description**: Hide from screen readers. Default: true (optional)


## Dependencies


- **snippet**: icon

- **snippet**: icon


## Usage


```liquid
{% render 'icon', icon: 'arrow', size: 'small' %}
```

```liquid
{% render 'icon', icon: 'cart', color: 'primary', alt: 'Shopping cart' %}
```



