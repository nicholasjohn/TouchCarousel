# TOUCH CAROUSEL
A jQuery Carousel plugin with touch/swipe features.


## Example
You can see a working example at http://jsbin.com/azapol/latest/edit/


## Usage

Any element can have the *.touchCarousel()* method called on it, with a variety of optional settings being set.
The method call and full list of settings can be seen below:

```javascript
var touchCarousel = $('.touch-carousel').touchCarousel(
  {
    slideDuration: 4000 // In milliseconds
  , transitionDuration: 250 // In milliseconds
  , easing: 'swing' // 'swing' or 'linear'
  , width: '100%' // Width in pixels
  }
)
```

The element must contain a set of elements of class *.touch-tab* within it, which will become the 'tabs'. The minimal structure for each of these elements is below:

```html
<element class='touch-tab'>
  <a href='#'>
    <img src='http://dummyimage.com/194x109' alt='Image Description' width='150' height='84' data-carousel='http://dummyimage.com/800x373/999/fff/&text=Hero 1'>
  </a>
</element>
```


## Update Log
- [x] Conversion to plugin
- [x] Extend plugin functions
- [ ] Remove necessity for <a> tag within tabs
- [ ] Transition-duration of <strong>.reel-timer</strong> to take main timer setting


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
