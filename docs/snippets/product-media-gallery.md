# product-media-gallery



## Parameters


### product
- **Type**: Object
- **Description**: Product Liquid object (required)

### variant_images
- **Type**: Array
- **Description**: Array of variant images (optional)

### enable_zoom
- **Type**: Boolean
- **Description**: Enable image zoom functionality (optional)

### enable_video_looping
- **Type**: Boolean
- **Description**: Enable video looping (optional)


## Dependencies


- **snippet**: product-media-gallery


## Usage


```liquid
{% render 'product-media-gallery', product: product, enable_zoom: true %}
```



