# Touch Carousel
An any-element, flexible jQuery Carousel plugin with touch/swipe features.

## Usage

Any element can have the `.touchCarousel()` method called on it, with a variety of optional settings being set.
The method call and full list of settings can be seen [below](#touchcarousel).


### Implementation
---

There are a few starting requirements for your HTML structure:

* Your carousel should have a container of class `.tc-root`
* Each carousel item container should be given a class of `.tc-main`


#### Basic
_JS Bin of the below example: http://jsbin.com/aqijuw/latest/_

The most basic format of the carousel will turn elements into a carousel:

```html
<div class='tc-root'>

  <img class='tc-main' src='smallImage1.jpg' alt='alt' width='150' height='100' />
  <h2 class='tc-main'>This is the second item</h2>
  <a class='tc-main' href='#jelly'>
    <h2>Some title</h2>
    <p>Some text</p>
  </a>

</div>
```



#### Larger images
Any `<img>` elements within your `.tc-main` can have a `data-carousel` attribute. This will replace the `src` attribute in the hero item.


```html
<div class='tc-root'>

  <img class='tc-main' src='smallImage1.jpg' alt='alt' width='150' height='100' />
  <img class='tc-main' src='smallImage2.jpg' alt='alt' width='150' height='100' />

</div>
```


#### Mixing elements
`.tc-main` elements don't have to just be `<img>` elements! You can use any element, given it has the `.tc-main` class:


```html
<div class='tc-root'>

  <img class='tc-main' src='smallImage1.jpg' alt='alt' width='150' height='100' />
  <h2 class='tc-main'>This is the second item</h2>
  <a href='#jelly' class='tc-main'>
    <h2>Some title</h2>
    <p>Some text</p>
  </a>

</div>
```




#### Linking Images
_JS Bin of the below example: http://jsbin.com/upixog/latest/_

Carousel items and tabs can link by placing an `<a>` tag anywhere inside (or as) your `.tc-main`.

```html
<div class='tc-root'>

  <div class='tc-main'>
    <a href='#'>
      <img src='smallImage1.jpg' data-carousel='largeImage1.jpg' alt='alt' width='150' height='100' />
    </a>
  </div>
  
  <a href='#' class='tc-main'>
    <img src='smallImage2.jpg' data-carousel='largeImage2.jpg' alt='alt' width='150' height='100' />
  </a>

</div>
```



#### Complex Implementation
_JS Bin of the below example: http://jsbin.com/azapol/latest/_

You can also add custom elements anywhere within your `.tc-main` to create a more custom structure:



    + – .tc-root –––––––––––––––––––––––––––– +
    |                                         |
    | + – .tc-tab ––––––––––––––––––––––––– + |
    | | | + – .tc-hero - + –––––––––––– + | | |
    | | |                |                | | |
    | | |    Carousel    |    Tab-only    | | |
    | | |    content     |    content     | | |
    | | |                |                | | |
    | | + –––––––––––––––+––––––––––––––– + | |
    | + ––––––––––––––––––––––––––––––––––– + |
    + ––––––––––––––––––––––––––––––––––––––– +



In the following example, the `.tc-extra` is being used to show a datetime, for example on a news slider:

```html
<div class='tc-root'>
  
  <article class='tc-main'> <!-- Container for each item -->
  
    <a href='http://google.co.uk'> <!-- The link of item -->
      <img src='smallImage1.jpg' data-carousel='largeImage1.jpg' alt='alt' width='150' height='100' />
      <h3>Item title</h3>
    </a>
    
    <div class='tc-extra'> <!-- Meta content to be displayed outside the main item's link -->
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
### Fixes & Essential
- [ ] Transition-duration of `.reel-timer` to take main timer setting
- [ ] Touch timers to fix
### Features
- [ ] Option extension for other easing types
- [ ] LR Pagination
- [ ] Dotted Pagination
- [ ] LR keyboard
- [ ] Spacebar pause
- [ ] Transitions (Wipe)
- [ ] Transitions (Fade)
- [ ] Scroll extra tabs
- [x] Default tab % width setting
- [x] Classes for Tab/Hero-only elements
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
  <tr><td><em>custom.css</em></td><td>
      Where custom stylings are kept. You should replace these with
      your styles, or implement them into your own site's stylesheets.
  </td>  </tr>
  <tr><td><em>styles.css</em></td><td>
      Generic styling for the TouchCarousel
  </td>  </tr>


  <tr>
    <th colspan=2>/JS</th>
  </tr>
  <tr><td><em>touchCarousel.js</em></td><td>
      This is the main jQuery file which runs carousel. It should be
      included as a script tag <strong>after</strong> your jQuery include.
  </td> </tr>
  <tr><td><em>touchCarousel.min.js</em></td><td>
    A minified version for use on live sites.
  </td></tr>

  <tr>
    <th colspan=2>HTML
      <br>
      These are a compliled example HTML files.
    </th>
  </tr>
  <tr><td><em>imageOnly.html</em></td><td>
    A very basic example of how a list of images can become a carousel.
  </td></tr>
  <tr><td><em>imageLinks.html</em></td><td>
    An example with basic carousel image linking.
  </td></tr>
  <tr><td><em>index.html</em></td><td>
    A more complex example.
  </td></tr>

</table>
