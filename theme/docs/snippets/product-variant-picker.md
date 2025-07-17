# product-variant-picker



## Parameters


### product
- **Type**: Object
- **Description**: Product Liquid object (required)

### block
- **Type**: Object
- **Description**: Block settings (optional)

### product_form_id
- **Type**: String
- **Description**: Form ID for the product form (required)

### update_url
- **Type**: Boolean
- **Description**: Update URL when variant changes (optional)


## Dependencies


- **snippet**: product-variant-picker


## Usage


```liquid
{% render 'product-variant-picker', product: product, product_form_id: 'product-form-123' %}
```



