# quantity-input



## Parameters


### product
- **Type**: Object
- **Description**: Product Liquid object (required)

### section_id
- **Type**: String
- **Description**: Section ID (required)

### product_form_id
- **Type**: String
- **Description**: Form ID for the product form (required)


## Dependencies


- **snippet**: quantity-input


## Usage


```liquid
{% render 'quantity-input', product: product, section_id: section.id, product_form_id: 'product-form-123' %}
```



