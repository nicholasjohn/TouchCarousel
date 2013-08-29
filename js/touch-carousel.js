(function () {
  $.fn.touchCarousel = function(options) {
    /*
      Extension: HeroCarousel
      Built by: Nick Price
    */
    var $this = this

    this.wrap( $('<div />').addClass('tc-root js-tc-root') )
    var $tcRoot = this.parents('.tc-root')


    // User-defined variables
    var settings = $.extend(
      {
        slideDuration: 4000
      , transitionDuration: 250
      , easing: 'swing'
      , width: '100%'
      , autoResizeTabs: true
      , showTimers: true
      , showTabs: true
      , heroHoverPause: true
      , tabsHoverPause: true
      , hoverActive: true
      , visibleTabs: false
      , highlightTabs: true
      , onTimer: 'hero'
      }
    , options )

    // User-defined variables
    var $slideDuration = settings.slideDuration // In milliseconds
      , $transitionDuration = settings.transitionDuration // In milliseconds
      , $easing = settings.easing // 'swing' or 'linear'
      , $width = settings.width // Width in pixels
      , $visibleTabs = settings.visibleTabs






    /******************

        DOM SETUP

    *****************/
    if ($width == '100%'){
      $tcRoot.css('width','100%')
      $width = $tcRoot.width()
    }else{
      $width = parseInt($width,10) // Strip units should the user enter 'px'
      $tcRoot.width($width)
    }

    var $numArticles = $('.tc-tab').length

    if ($('.tc-tabs').length < 1){
      $('.tc-tab').wrapAll('<div>')
    }


    // Carousel setup
    var $tcReel = $('<div class="tc-hero-reel js-tc-hero-reel" />').css('width', ($numArticles * $width) )
      , $tcWrapper = $('<div class="tc-hero-wrapper js-tc-hero-wrapper" />').append($tcReel)
      , $arrowLeft = $('<div class="tc-arrow-left js-tc-arrow-left" />')
      , $arrowRight = $('<div class="tc-arrow-right js-tc-arrow-right" />')
    $tcRoot.prepend($tcWrapper).append($arrowLeft).append($arrowRight)


    /******************

        HERO SETUP

    *****************/
    $('.tc-tab').each(function(i,v){

      $(this).css('width', Math.floor( ($tcRoot.width() - parseInt($(this).css('margin-left'),10) - parseInt($(this).css('margin-right'),10) ) / $visibleTabs) )

      var $tcMain = $(this).children().clone()

      // Strip redundant DOM nodes
      $tcMain.find('.tc-tab-only').remove()
      $(this).find('.tc-hero-only').remove()

      // Replace <img>@src with @data-carousel
      // (if statement is for .tc-tab <img> tags)
      if ($tcMain.data('carousel') !== 'undefined'){
        $tcMain.attr('src', $tcMain.data('carousel'))
      }
      $tcMain.find('img[data-carousel]').each(function() {
        $(this).attr('src', $(this).data('carousel'))
      })


      // Create new hero item
      var $heroItem = $('<div>').width($width).addClass('tc-hero-item js-tc-hero-item').addClass('js-tc-tab').attr('data-slide',(i+1)).append($tcMain) // New hero item
      // Add hero item
      $tcReel.append($heroItem)

      // Timers
      var $timerOverlay = $('<div>').addClass('reel-timer-overlay js-reel-timer-overlay')
        , $timerDiv = $('<div>').addClass('reel-timer').append($timerOverlay)
      $(this).addClass('js-tc-tab').attr('data-slide',(i+1))
      if (settings.showTimers) $(this).prepend($timerDiv)


      // Settings > show tabs
      if (!settings.showTabs) $(this).hide()
    })







    /******************

         METHODS

    *****************/

    // Private vars
    var $currentSlide = 0
      , $nextSlide = 1
      , $isPaused = false
      , $subWidth = 0
      , $currentTab = 0
      , $timeOut


    // This function resets slider
    // to the first slide
    this.resetCarousel = function resetCarousel() {
      $currentSlide = 0
    , $nextSlide = 1
    , $isPaused = false
    , $subWidth = 0

      this.goToSlide($nextSlide)
      clearTimeout($timeOut)
      $timeOut = setTimeout(this.nextSlide, $slideDuration)
    }


    // This function either gets the new margin-left
    // position of the .tc-hero-reel for a $slideNum provided,
    // or will 'fix' a broken position to the $currentSlide
    this.updateMargin = function updateMargin($slideNum){

      // Fix hero reel movements
      $tcReel.css('width', ($numArticles * $width) )
      $('.js-tc-hero-item').width($tcRoot.width())

      if ($slideNum > 1) {
        $m = $slideNum - 1
      } else {
        $m = 0
      }

      var $newMargin = -( $m * $tcRoot.width() )

      $tcReel.stop().animate({'margin-left' : $newMargin}, $transitionDuration, $easing)

      // Resize tabs
      $('.tc-tab').css('width', Math.floor( ($tcRoot.width() - parseInt($('.tc-tab:first-child').css('margin-left'),10) - parseInt($('.tc-tab:first-child').css('margin-right'),10) ) / $visibleTabs) )
      var $slideAmount = Math.floor( $('.tc-tab:first-child').width() + parseInt($('.tc-tab:first-child').css('margin-left'), 10) + parseInt($('.tc-tab:first-child').css('margin-right'), 10) ) * $currentTab
      $('.tc-tabs').stop().animate({'margin-left':  $slideAmount+'px'}, $transitionDuration)

    }


    // This function calls a slide to be moved to
    this.goToSlide = function goToSlide($slideNum){
      //console.log('goToSlide('+$slideNum+') called')

      $('.tc-tab.active').removeClass('active')
      $('.animating').removeClass('animating')
      $('.tc-tab[data-slide="'+$slideNum+'"]').addClass('active').find('.js-reel-timer-overlay').addClass('animating')
      //.css({'-webkit-transition-duration':$slideDuration+'ms'})
      this.updateMargin($slideNum)

    }


    // This function slides the tabs
    // in a given direction
    // Upon reaching the end of elements
    // the carousel will go back to the beginning
    // and vice-verca with the end
    this.slideTabs = function slideTabs(direction) {

      clearTimeout($timeOut)

      if (direction === 'left' || direction === 'undefined') {
        // Tabs moving left - check for end of row
        $currentTab++
        if ($currentTab === 1) $currentTab = -($numArticles - $visibleTabs)
      }else{
        // Tabs moving right - check for end of row
        $currentTab--
        if ($currentTab === -($numArticles - $visibleTabs + 1)) $currentTab = 0
      }

      var $slideAmount = Math.floor( $('.tc-tab:first-child').width() + parseInt($('.tc-tab:first-child').css('margin-left'), 10) + parseInt($('.tc-tab:first-child').css('margin-right'), 10) ) * $currentTab
      $('.tc-tabs').stop().animate({'margin-left':  $slideAmount+'px'}, $transitionDuration)
      $timeOut = setTimeout($this.slideTabs, $slideDuration)

    }


    // This function calls the next slide
    // Upon reaching the end of elements
    // the carousel will go back to the beginning
    this.nextSlide = function nextSlide() {
      //console.log('nextSlide()')
      if (!$isPaused){

        $this.goToSlide($nextSlide)
        clearTimeout($timeOut)
        $timeOut = setTimeout($this.slideTabs, $slideDuration)

        //Update slide states
        if ( ($nextSlide+1) > $numArticles ){ // Has carousel reached the end?
          $nextSlide = 1 // Reset carousel
          $currentSlide = $numArticles
        }else{
          $currentSlide = $nextSlide
          $nextSlide++
        }
      }
    }


    // This function calls the previous slide
    // Upon reaching the beginning of elements
    // the carousel will go to the last slide
    this.prevSlide = function prevSlide() {
      //console.log('prevSlide()')
      if (!$isPaused){

        //Update slide states
        if ( ($currentSlide-1) === 0 ){ // Has carousel reached the end?
          $nextSlide = 1 // Reset carousel
          $currentSlide = $numArticles
        }else{
          $nextSlide = $currentSlide
          $currentSlide--
        }

        $this.goToSlide($currentSlide)
        clearTimeout($timeOut)
        $timeOut = setTimeout($this.slideTabs, $slideDuration)


      }
    }


    // INIT
    this.init = function() {
      $('.js-reel-timer-overlay:first-of-type').width(0)
      $this.goToSlide($nextSlide)
      $timeOut = setTimeout($this.slideTabs, $slideDuration)
      return this
    }






    /******************

      FUNCTION CALLS

    *****************/
    // HOVER TABS
    if (settings.hoverActive){
      $('.js-tc-tab').hover(function() {

        if (settings.tabsHoverPause){
          clearTimeout($timeOut)
          $this.goToSlide($(this).data('slide'))

          //Update slide states
          $currentSlide = $(this).data('slide')
          if ( ($currentSlide+1) > $numArticles ){ // Has carousel reached the end?
            $nextSlide = 1 // Reset carousel
          }else{
            $nextSlide = $currentSlide + 1
          }

          $isPaused = true
          $('.js-tc-tab[data-slide="'+$currentSlide+'"]').find('.js-reel-timer-overlay').removeClass('animating').addClass('full')

        }

      }, function() {
        if (settings.tabsHoverPause){
          $isPaused = false
          $('.js-tc-tab[data-slide="'+$currentSlide+'"]').find('.full').removeClass('full').width(0).addClass('animating')
          $timeOut = setTimeout($this.slideTabs, $slideDuration)
        }

      })
    } // END OF settings.hoverActive







    /*
      RESPONSIVE
      FUNCTIONS
    */
    $(window)
    .on('resize', function() {

      if( $(window).width() < 740 ) {
        $visibleTabs = 4
      } else {
        $visibleTabs = 3
      }

      if (settings.width == '100%'){
        $tcRoot.css('width','100%')
        $width = $tcRoot.width()
      }else{
        $width = parseInt($width,10) // Strip units should the user enter 'px'
        $tcRoot.width($width)
      }
      $('.js-tc-hero-reel').width($numArticles*$width)
      $this.updateMargin($currentSlide)
    })


    // Arrows are clicked
    $arrowLeft.on('click', function () {
      $this.slideTabs('left')
    })
    $arrowRight.on('click', function () {
      $this.slideTabs('right')
    })


    /*
      KEYBOARD
      EVENTS
    */
    $(document.documentElement).keyup(function (event) {
      if (event.keyCode == 37) {
        $this.slideTabs('left')
      } else if (event.keyCode == 39) {
        $this.slideTabs()
      }
    })

    return this.init()


  }
})()