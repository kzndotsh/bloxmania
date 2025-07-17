# product-price



## Parameters


### product
- **Type**: Object
- **Description**: Product Liquid object (required)

### use_variant
- **Type**: Boolean
- **Description**: Use variant pricing (optional)

### show_badges
- **Type**: Boolean
- **Description**: Show sale/sold out badges (optional)

### price_class
- **Type**: String
- **Description**: Additional CSS classes for price (optional)


## Dependencies


- **snippet**: product-price


## Usage


```liquid
{% render 'product-price', product: product, use_variant: true, show_badges: true %}
```



