# product-buy-buttons



## Parameters


### block
- **Type**: Object
- **Description**: Block settings (required)

### product
- **Type**: Object
- **Description**: Product Liquid object (required)

### product_form_id
- **Type**: String
- **Description**: Form ID for the product form (required)

### section_id
- **Type**: String
- **Description**: Section ID (required)


## Dependencies


- **snippet**: product-buy-buttons


## Usage


```liquid
{% render 'product-buy-buttons', block: block, product: product, product_form_id: 'product-form-123', section_id: section.id %}
```



