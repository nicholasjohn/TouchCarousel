# Touch Carousel
An any-element, flexible jQuery Carousel plugin with touch/swipe features.

## Usage

Any element can have the `.touchCarousel()` method called on it, with a variety of optional settings being set.
The method call and full list of settings can be seen [below](#touchcarousel).


### Implementation
---

There are a few starting requirements for your HTML structure:

* Your carousel container should have a class of `.tc-tabs`
* Each item within the carousel container should be given a class of `.tc-tab`



#### Basic

The most basic format of the carousel will turn a list into a carousel; for example:

```html
<ul class='tc-tabs'>
  <li class='tc-tab'>
    <img src='http://dummyimage.com/300x150' alt='alt' />
  </li>
  <li class='tc-tab'>
    <img src='http://dummyimage.com/300x150' alt='alt' />
  </li>
</ul>
```



#### Larger images
Any `<img>` elements can be given a `data-carousel` attribute to change the image `src` attribute inside the item's hero version; for example:


```html
<ul class='tc-tabs'>

  <li class='tc-tab'>
    <img src='http://dummyimage.com/300x150' data-carousel='http://dummyimage.com/1000x600' alt='alt' />
  </li>

  <li class='tc-tab'>
    <img src='http://dummyimage.com/300x150' data-carousel='http://dummyimage.com/1000x600' alt='alt' />
  </li>

</ul>
```



#### Linking Images

Basic linkage can be applied by wrapping the `<img>` in an `<a class='tc-tab'>`

```html
<ul class='tc-tabs'>

  <li class='tc-tab'>
    <a href='#'>
      <img src='http://dummyimage.com/300x150' alt='alt' />
    </a>
  </li>

  <li class='tc-tab'>
    <a href='#'>
      <img src='http://dummyimage.com/300x150' alt='alt' />
    </a>
  </li>

</ul>
```

#### Mixing elements
`.tc-tab` elements don't have to just be `<li>` elements inside a `<ul>`! You can use any elements, given they keep the same classes; for example:

```html
<div class='tc-tabs'>

  <img class='tc-tab' src='http://dummyimage.com/300x150' alt='alt' width='150' height='100' />

  <div class='tc-tab'>
    This is the second item
  </div>
  
  <a href='#' class='tc-tab'>
    <h2>Some title</h2>
    <p>Some text</p>
  </a>

</div>
```






#### The '-only' class

You can add custom elements anywhere within your `.tc-tab` to create a more custom structure.
For example, in the following carousel an extra datetime is being shown *only* in the item's tabular form and is showing a header *only* in the hero form:

```html
<div class='tc-tabs'>
  
  <article class='tc-tab'>
    <img src='http://dummyimage.com/300x150' data-carousel='http://dummyimage.com/1000x600' alt='alt' width='150' height='100' />
    <h2 class='tc-hero-only'>This is a title!</h2>
    <span class='date-published tc-tab-only'>Weds 8 August 2012. Last updated: 1.16AM</span>
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
>
> ##### showTimers
> Whether the 'filling' timer bars should be displayed <br>
> _Default: true_
>
> ##### showTabs
> Whether the tabs section should be displayed. Set to false if the carousel hero area is the only region to be shown. <br>
> _Default: true_
>
> ##### autoResizeTabs
> Whether tabs should gain percentage widths of the tabs section (i.e. 'fill' the region) <br>
> _Default: true_
>
> ##### hoverActive
> Set to false to disable all hover pausing, or use the below options of (heroHoverPause & tabsHoverPause)
> _Default: true_
>
> ##### heroHoverPause
> Should the carousel pause when hovering the hero? <br>
> _Default: true_
>
> ##### tabsHoverPause
> Should hovering the tabs change the carousel? <br>
> _Default: true_


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
### Essential
- [ ] Transition-duration of `.reel-timer` to take main timer setting
- [ ] Touch timers to fix
### Features
- [ ] Option extension for other easing types
- [ ] LR Pagination
- [ ] Dotted Pagination
- [x] LR keyboard
- [x] Hover pause w/button
- [x] Pausing for tabs/hero/both can be set in options
- [?] Spacebar pause - Need to check whether this is more important than page scroll (option maybe?)
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

## Composite DOM Structures
<<<<<<< HEAD

### Initial
The source-file HTML DOM structure of the carousel should be as follows:

=======

### Initial
The source-file HTML DOM structure of the carousel should be as follows:

```
+---.tc-tabs------------------------+
|  .tc-tab(s)                       |
+-----------------------------------+
```

### Final
The final DOM structure of the carousel will be as follows:

> +--.tc-root-------------------------------+
> |                                         |
> |  +---.tc-hero-wrapper----------------+  |
> |  |  +----.tc-hero-reel------------+  |  |
> |  |  | .tc-hero-item(s)            |  |  |
> |  |  +-----------------------------+  |  |
> |  +-----------------------------------+  |
> |                                         |
> |  +---.tc-tabs------------------------+  |
> |  |  .tc-tab(s)                       |  |
> |  +-----------------------------------+  |
> |                                         |
> +-----------------------------------------+