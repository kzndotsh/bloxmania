# product-inventory



## Parameters


### variant
- **Type**: Object
- **Description**: Product variant object (required)

### block
- **Type**: Object
- **Description**: Block settings (optional)

### section_id
- **Type**: String
- **Description**: Section ID (required)


## Dependencies


- **snippet**: product-inventory


## Usage


```liquid
{% render 'product-inventory', variant: current_variant, block: block, section_id: section.id %}
```



