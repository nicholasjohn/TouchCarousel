# Touch Carousel
A flexible jQuery Carousel plugin with touch/swipe features.

## Example
You can see a working example at http://jsbin.com/azapol/latest/edit/

## Usage

Any element can have the `.touchCarousel()` method called on it, with a variety of optional settings being set.
The method call and full list of settings can be seen below:

```javascript
var touchCarousel = $('.touch-carousel').touchCarousel(
  {
    slideDuration: 4000 // How long an item is shown before going to the next item (milliseconds)
  , transitionDuration: 250 // The length of sliding transition (milliseconds)
  , easing: 'swing' // Currently 'swing' or 'linear'
  , width: '100%' // Width in pixels or '100%' for flexible
  }
)
```


### Basic

The most basic format of the carousel can make plain images into a slider.

_Note: all `<img>` tags can have a `data-carousel` attribute for an alternative image as the matching carousel item_

```html
<div class='touch-carousel'>

  <img src='smallImage1.jpg' data-carousel='largeImage1.jpg' alt='alt' width='150' height='100' />
  <img src='smallImage2.jpg' data-carousel='largeImage2.jpg' alt='alt' width='150' height='100' />

</div>
```


### Linking Images

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


### Complex Implementation
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







## Update Log
- [x] Conversion to plugin
- [x] Extend plugin functions
- [x] Header works off class, not <h> tag
- [ ] Remove necessity for `<a>` tag within tabs
- [ ] Transition-duration of `.reel-timer` to take main timer setting


##Project Files
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
    <th colspan=2>HTML</th>
  </tr>
  <tr>
    <td>
      <em>index.html</em>
    </td>
    <td>
      This is a compliled example HTML file.
      Please see inside the document for notes and tips.
    </td>
  </tr>

</table>
