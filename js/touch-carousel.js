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
      , directionKeys: true
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

      var $thisTab = $(this)

      $thisTab.css('width', Math.floor( ($tcRoot.width() - parseInt($(this).css('margin-left'),10) - parseInt($(this).css('margin-right'),10) ) / $visibleTabs) )

      var $tcMain = $thisTab.children().clone()

      // Strip redundant DOM nodes
      $tcMain.find('.tc-tab-only').remove()
      $thisTab.find('.tc-hero-only').remove()

      // (if statement is for .tc-tab <img> tags)
      if ($tcMain.data('carousel') !== 'undefined'){
        $tcMain.attr('src', $tcMain.data('carousel'))
      }
      // Replace <img>@src with @data-carousel
      $tcMain.find('img[data-carousel]').each(function() {
        $(this).attr('src', $(this).data('carousel'))
      })

      // Create new hero item
      var $heroItem = $('<div>').width($width).addClass('tc-hero-item js-tc-hero-item').addClass('js-tc-tab').attr('data-slide',(i+1)).append($tcMain) // New hero item
      // Add hero item
      $tcReel.append($heroItem)

      $thisTab.addClass('js-tc-tab').attr('data-slide',(i+1))
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
      var $marginsMultiplyNumMinusOne = ( parseInt( $('.tc-tab:first-child').css('margin-left'),10) + parseInt( $('.tc-tab:first-child').css('margin-right'),10) ) * ( $visibleTabs - 1)
      var $newWidth = Math.floor( ($tcRoot.width() - $marginsMultiplyNumMinusOne ) / $visibleTabs )
      $('.tc-tab').css('width', $newWidth )

      var $slideAmount = Math.floor( $('.tc-tab:first-child').width() + parseInt($('.tc-tab:first-child').css('margin-left'), 10) + parseInt($('.tc-tab:first-child').css('margin-right'), 10) ) * $currentTab

      $('.tc-tabs').stop().animate({'margin-left':  $slideAmount+'px'}, $transitionDuration)

    }


    // This function calls a slide to be moved to
    this.goToSlide = function goToSlide($slideNum){
      $('.tc-tab.active').removeClass('active')
      this.updateMargin($slideNum)
    }


    // This function slides the tabs
    // in a given direction
    // Upon reaching the end of elements
    // the carousel will go back to the beginning
    // and vice-verca with the end
    this.slideTabs = function slideTabs(direction) {

      if(!$isPaused){

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

        }

      }, function() {
        if (settings.tabsHoverPause){
          $isPaused = false
          $timeOut = setTimeout($this.slideTabs, $slideDuration)
        }

      })
    } // END OF settings.hoverActive







    /*
      RESPONSIVE
      FUNCTIONS
    */
    $(window).on('resize load', function () {
      if ( $(window).width() < 740 ) {
        $visibleTabs = 4
      } else {
        $visibleTabs = 3
      }
      $this.updateMargin()
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
    if (settings.directionKeys === true) {
      $(document.documentElement).keyup(function (event) {
        if (event.keyCode == 37) {
          $this.slideTabs('left')
        } else if (event.keyCode == 39) {
          $this.slideTabs()
        }
      })
    }




    /*
      TOUCH
      EVENTS
    */

    var $initialX
      , $initialY
      , $currentX
      , $currentY
      , $changeX
      , $initialMargin
      , $marginLeftMove
      , $falseSwipe = false
      , $moving = false

    $('.tc-tabs').on('touchstart', function(e){
      $isPaused = true

      $initialMargin = $('.tc-tabs').css('margin-left')
      $initialX = e.originalEvent.touches[0].pageX
      $initialY = e.originalEvent.touches[0].pageY


      // Touch move
      $(this).on( 'touchmove', function(e){

        $currentX = e.originalEvent.touches[0].pageX
        $currentY = e.originalEvent.touches[0].pageY

        if (Math.abs($currentX - $initialX) >
            Math.abs($currentY - $initialY) || $moving === true) {
          // A horizontal movement, so add the touchmove handler
          e.preventDefault()
          $moving = true
          $changeX = $currentX - $initialX
          $marginLeftMove = parseInt($initialMargin,10) + $changeX

          $tabsMargin = parseInt($('.tc-tabs').css('margin-left'),10)

          if( $tabsMargin >= 0 ){
            // Carousel is left of first item
            $('.tc-tabs').css({'margin-left': $marginLeftMove * 0.2 })
          }else if( $tabsMargin <= -($('.js-tc-hero-wrapper').width()*3) ){
            // Carousel is right of last item

            $('.tc-tabs').css({'margin-left': parseInt($initialMargin,10) + ($changeX*0.2) })
          }else{
            $('.tc-tabs').css({'margin-left': $marginLeftMove })
          }

        } else {
          // A vertical movement, so let the
          // device scroll the document
          $(this).off('touchend')
          $(this).off('touchmove')
          $falseSwipe = true
        }


      })
      // Touch end
      $(this).on('touchend', function(e){
        $moving = false
        $(this).off('touchend')
        $(this).off('touchmove')


        var $currentMargin = parseInt($('.tc-tabs').css('margin-left'),10)
          , $tabWidth = $('.tc-tab:first-child').width()
          , $distanceToSnap = $currentMargin % ( $tabWidth + parseInt($('.tc-tab:first-child').css('margin-right'),10) )

        if ($distanceToSnap > 0) {
           $('.tc-tabs').animate({'margin-left': 0 }, 'fast')
        } else if ( Math.abs($distanceToSnap) < Math.floor($tabWidth/2) ) {
          $('.tc-tabs').animate({'margin-left': $currentMargin + Math.abs($distanceToSnap) }, 'fast')
        } else {
          $('.tc-tabs').animate({'margin-left': $currentMargin - ($tabWidth + $distanceToSnap) }, 'fast')
        }

        clearTimeout($timeOut)
        $isPaused = false
        $timeOut = setTimeout($this.slideTabs, $slideDuration)

        $changeX = 0
        $initialX = 0
        $initialY = 0
        $currentY = 0
        $currentX = 0
        $initialMargin = 0
        $marginLeftMove = 0
        $falseSwipe = false
        $moving = false
      })
    })

    // Initialise
    return this.init()


  }
})()