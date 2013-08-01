# Touch Carousel
A flexible jQuery Carousel plugin with touch/swipe features. 

## Usage

Any element can have the `.touchCarousel()` method called on it, with a variety of optional settings being set.
The method call and full list of settings can be seen #touchcarousel below.


### Implementation
---

#### Basic
_JS Bin of the below example: http://jsbin.com/aqijuw/latest/_

The most basic format of the carousel can make plain images into a slider.

_Note: all `<img>` tags can have a `data-carousel` attribute for an alternative image as the matching carousel item_

```html
<div class='touch-carousel'>

  <img src='smallImage1.jpg' data-carousel='largeImage1.jpg' alt='alt' width='150' height='100' />
  <img src='smallImage2.jpg' data-carousel='largeImage2.jpg' alt='alt' width='150' height='100' />

</div>
```


#### Linking Images
_JS Bin of the below example: http://jsbin.com/upixog/latest/_

Carousel items and tabs can link by wrapping the `<img>` tags within an `<a href='#'>` tag:

```html
<div class='touch-carousel'>

  <a href='#'>
    <img src='smallImage1.jpg' data-carousel='largeImage1.jpg' alt='alt' width='150' height='100' />
  </a>
  
  <a href='#'>
    <img src='smallImage2.jpg' data-carousel='largeImage2.jpg' alt='alt' width='150' height='100' />
  </a>

</div>
```


#### Complex Implementation
_JS Bin of the below example: http://jsbin.com/azapol/latest/_

You can also add custom elements with a more complex structure:

* Each tab should have a class of `.touch-tab`
* If the item should link, nest within an `<a>` tag
* Titles should have a class of `.article-title`
* Meta data should have a class of `.meta` - any tags inside will be duplicated below the title in the main item

In the following example, the `.meta` is being used to show a datetime, for example on a news slider:

```html
<div class='touch-carousel'>
  
  <article class='touch-tab'> <!-- Container for each item -->
  
    <a href='http://google.co.uk'> <!-- The link of item -->
      <img src='smallImage1.jpg' data-carousel='largeImage1.jpg' alt='alt' width='150' height='100' />
      <h3 class='article-title'>Item title</h3>
    </a>
    
    <div class='meta'> <!-- Meta content to be displayed outside the main item's link -->
      <span class='date-published'>Weds 8 August 2012. Last updated: 1.16AM</span>
    </div>
    
  </article>

</div>
```


### $.touchCarousel()
---

<!--more-->
#### Options

> ##### slideDuration
> How long an item is shown before going to the next item (milliseconds) <br>
> _Default: 4000_
> 
> ##### transitionDuration
> The length of sliding transition (milliseconds) <br>
> _Default: 250_
> 
> ##### easing
> Currently 'swing' or 'linear' <br>
> _Default: 'swing'_
> 
> ##### width
> Width in pixels or '100%' for flexible <br>
> _Default: '100%'_



#### Methods

> ##### .goToSlide( slideNumber )
> The carousel will move onto the given slideNumber and proceed from there.
> 
> ##### .nextSlide()
> The carousel will move onto the next slide and proceed from there. If at the end of the carousel, it will return to the beginning.
> 
> ##### .prevSlide()
> The carousel will move onto the previous slide and proceed from there. If at the first slide, it will go to the last slide.
> 
> ##### .resetCarousel()
> This will restart the slider and reset all settings.
> 



## Update Log
- [ ] Option extension for other easing types
- [ ] Transition-duration of `.reel-timer` to take main timer setting
- [x] Conversion to plugin
- [x] Extend plugin functions
- [x] Header works off class, not <h> tag
- [x] Remove necessity for `<a>` tag within tabs
- [x] Extend for images-only
- [x] Extend for images in links
- [x] Extend for complex structures


## Project Files
The below table summarises the contents of each file throughout the structure of TouchCarousel:

<table>
  <tr>
    <th colspan=2>/CSS</th>
  </tr>
  <tr>
    <td>
      <em>custom.css</em>
    </td>
    <td>
      Where custom stylings are kept. You should replace these with
      your styles, or implement them into your own site's stylesheets.
    </td>
  </tr>
  <tr>
    <td>
      <em>styles.css</em>
    </td>
    <td>
      Generic styling for the TouchCarousel
    </td>
  </tr>


  <tr>
    <th colspan=2>/JS</th>
  </tr>
  <tr>
    <td>
      <em>touchCarousel.js</em>
    </td>
    <td>
      This is the main jQuery file which runs carousel. It should be
      included as a script tag <strong>after</strong> your jQuery include.
    </td>
  </tr>
  <tr>
    <td>
      <em>touchCarousel.min.js</em>
    </td>
    <td>
      A minified version for use on live sites.
    </td>
  </tr>

  <tr>
    <th colspan=2>HTML
      <br>
      These are a compliled example HTML files.
    </th>
  </tr>
  <tr>
    <td>
      <em>index.html</em>
    </td>
    <td>
      </td>
  </tr>

</table>
