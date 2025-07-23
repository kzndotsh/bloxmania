# card-product



## Parameters


### card_product
- **Type**: Object
- **Description**: Product Liquid object (optional)

### show_vendor
- **Type**: Boolean
- **Description**: Show the product vendor. Default: false

### show_quick_add
- **Type**: Boolean
- **Description**: Show the quick add button. Default: false (optional)

### section_id
- **Type**: String
- **Description**: The ID of the section that contains this card.

### show_compare_at_price
- **Type**: Boolean
- **Description**: Show compare at price. Default: true (optional)

### lazy_load
- **Type**: Boolean
- **Description**: Image should be lazy loaded. Default: true (optional)

### layout
- **Type**: String
- **Description**: Card layout: 'grid' or 'list'. Default: 'grid'


## Dependencies


- **snippet**: card-product

- **asset**: image-widget-backing.png


## Usage


```liquid
{% render 'card-product', card_product: product, section_id: section.id, layout: 'list' %}
```



