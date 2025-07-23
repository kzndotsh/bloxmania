# article-card



## Parameters


### blog
- **Type**: Object
- **Description**: Blog object

### article
- **Type**: Object
- **Description**: Article object

### media_aspect_ratio
- **Type**: String
- **Description**: The setting changes the aspect ratio of the article image, if shown

### media_height
- **Type**: String
- **Description**: The setting changes the height of the article image. Overrides media_aspect_ratio.

### show_image
- **Type**: String
- **Description**: The setting either show the article image or not. If it's not included it will show the image by default

### show_date
- **Type**: String
- **Description**: The setting either show the article date or not. If it's not included it will not show the image by default

### show_author
- **Type**: String
- **Description**: The setting either show the article author or not. If it's not included it will not show the author by default

### show_badge
- **Type**: String
- **Description**: The setting either show the blog badge or not.

### lazy_load
- **Type**: Boolean
- **Description**: Image should be lazy loaded. Default: true (optional)


## Dependencies


- **snippet**: article-card


## Usage


```liquid
{% render 'article-card' blog: blog, article: article, show_image: section.settings.show_image %}
```



