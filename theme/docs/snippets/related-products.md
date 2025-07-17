# related-products



## Parameters


### product
- **Type**: Object
- **Description**: Product Liquid object (required)

### heading
- **Type**: String
- **Description**: Section heading (optional)

### products_to_show
- **Type**: Number
- **Description**: Number of products to show (optional, default: 4)


## Dependencies


- **snippet**: related-products

- **snippet**: card-product

- **snippet**: card-product

- **snippet**: card-product

- **snippet**: card-product


## Usage


```liquid
{% render 'related-products', product: product, heading: 'You may also like', products_to_show: 4 %}
```



