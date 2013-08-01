(function () {
  $.fn.touchCarousel = function(options) {
    /*
      Extension: HeroCarousel
      Built by: Nick Price
    */
    $this = this

    this.wrap( $('<div />').addClass('tc-root js-tc-root') )
    $tcRoot = this.parents('.tc-root')



    // Public variables
    var settings = $.extend({
        slideDuration: 4000
      , transitionDuration: 250
      , easing: 'swing'
      , width: '100%'
      , autoResizeTabs: true
    }, options )

    // Public variables
    var $slideDuration = settings.slideDuration // In milliseconds
      , $transitionDuration = settings.transitionDuration // In milliseconds
      , $easing = settings.easing // 'swing' or 'linear'
      , $width = settings.width // Width in pixels


    if($width == '100%'){
      $tcRoot.css('width','100%')
      $width = $tcRoot.width()
    }else{
      $width = parseInt($width,10) // Strip units should the user enter 'px'
      $tcRoot.width($width)
    }


    var $numArticles = $('.tc-tab').length

    if($('.tc-tabs').length < 1){
      $('.tc-tab').wrapAll('<div>')
    }
    // Carousel setup
    var $touchReel = $('<div class="tc-reel js-tc-reel" />').width($numArticles*$width)
        $touchItem = $('<div class="tc-item js-tc-item" />').append($touchReel)
    $tcRoot.prepend($touchItem)


    // Get each dom .tc-tab
    $('.tc-root .tc-tab').each(function(i,v){

      if(settings.autoResizeTabs === true) $(this).css('width',($tcRoot.width()/$numArticles))

      var $tcMain = $(this).clone().html()
      $tcMain = $($tcMain)

      // Strip any .tc-tab-only from new hero
      $tcMain.find('.tc-tab-only').remove()


      if($tcMain.data('carousel') !== 'undefined'){
        $tcMain.attr('src', $tcMain.data('carousel'))
      }
      // Replace <img>@src with @data-carousel
      $tcMain.find('img[data-carousel]').each(function(){
        $(this).attr('src', $(this).data('carousel'))
      })


      // Strip any .tc-hero-only from tabs
      $(this).find('.tc-hero-only').remove()

      // Create new hero item
      $heroItem = $('<div>').width($width).addClass('article').append($tcMain) // New hero item

      // Add hero item
      $touchReel.append($heroItem)

      // TIMERS
      // Active: #214b71
      // Normal: #3a73a6
      var $timerOverlay = $('<div>').addClass('reel-timer-overlay js-reel-timer-overlay')
        , $timerDiv = $('<div>').addClass('reel-timer').append($timerOverlay)

      $(this).addClass('js-tc-tab').attr('data-slide',(i+1)).prepend($timerDiv)

    })





    // Private vars
    var $currentSlide = 0
      , $nextSlide = 1
      , $isPaused = false
      , $subWidth = 0
      , $timeOut

    // Resets slider to the first slide
    this.resetCarousel = function resetCarousel(){
      $currentSlide = 0
    , $nextSlide = 1
    , $isPaused = false
    , $subWidth = 0

      this.goToSlide($nextSlide)
      clearTimeout($timeOut)
      $timeOut = setTimeout(this.nextSlide, $slideDuration)
    }

    // This function either gets the new margin-left
    // position of the .tc-reel for a $slideNum provided,
    // or will 'fix' a broken position to the $currentSlide
    this.updateMargin = function updateMargin($slideNum){
      //console.log($slideNum)
      var $m = ($slideNum===1)?0:($slideNum-1)
        , $newMargin = -( $m * $('.js-tc-item').width())
      $touchReel.stop().animate({'margin-left' : $newMargin}, $transitionDuration, $easing)
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

    // This function calls the next slide
    // Upon reaching the end of elements
    // the carousel will go back to the beginning
    this.nextSlide = function nextSlide(){
      //console.log('nextSlide()')
      if(!$isPaused){

        $this.goToSlide($nextSlide)
        clearTimeout($timeOut)
        $timeOut = setTimeout($this.nextSlide, $slideDuration)

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
    this.prevSlide = function prevSlide(){
      //console.log('prevSlide()')
      if(!$isPaused){

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
        $timeOut = setTimeout($this.nextSlide, $slideDuration)


      }
    }


    // Deals with hovers on the .sub-menu
    $('.js-tc-tab').hover(function(){
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
      $(this).find('.js-reel-timer-overlay').removeClass('animating').addClass('full')

    }, function(){
      $isPaused = false
      $(this).find('.full').removeClass('full').width(0).addClass('animating')
      $timeOut = setTimeout($this.nextSlide, $slideDuration)
    })



    // INIT
    this.init = function() {
      $touchReel.show()
      $('.js-reel-timer-overlay:first-of-type').width(0)
      setTimeout($this.nextSlide,50)
      return this
    }






    /*
      RESPONSIVE
      FUNCTIONS
    */
    $(window)
    .on('exit.two-col enter.two-col', function () {
      $subWidth = $('.tc-root .tc-tab:first-child').width()
      //console.log('updating')
      $this.updateMargin($currentSlide)
    })
    .on('resize', function(){
      $width = this.width()
      $('.js-tc-reel').width($numArticles*$width)
      $('.js-tc-reel .article').width($width)
      $this.updateMargin($currentSlide)
    })












    /*
      TOUCH
      EVENTS
    */
    var $initialX
      , $initialY
      , $currentX
      , $currentY
      , $changeX
      , $initialPosition
      , $marginLeftMove
      , $falseSwipe = false
      , $moving = false

    $touchReel.on('touchstart', function(e){
      $isPaused = true

      $initialPosition = $touchReel.css('margin-left')

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
          $marginLeftMove = parseInt($initialPosition,10) + $changeX

          $heroMargin = parseInt($touchReel.css('margin-left'),10)

          if( $heroMargin >= 0 ){
            // Carousel is left of first item
            $touchReel.css({'margin-left': $marginLeftMove * 0.2 })
          }else if( $heroMargin <= -($('.js-tc-item').width()*3) ){
            // Carousel is right of last item

            $touchReel.css({'margin-left': parseInt($initialPosition,10) + ($changeX*0.2) })
          }else{
            $touchReel.css({'margin-left': $marginLeftMove })
          }

          // add active state
          $('.js-tc-tab.active').find('.js-reel-timer-overlay').removeClass('animating').addClass('full')

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

        $('.js-tc-tab.active').find('.full').removeClass('full').width(0).addClass('animating')

        $isPaused = false

        if(Math.abs($changeX) < 20 || $falseSwipe === true){
          $touchReel.animate({'margin-left': $initialPosition})
          $falseSwipe = false
          //console.log('null swipe')
        }else{
          if($marginLeftMove < parseInt($initialPosition,10)){
            //console.log('left swipe')
            if($currentSlide!==$numArticles){
              clearTimeout($timeOut)
              this.nextSlide()
            }else{
              this.goToSlide($numArticles)
              clearTimeout($timeOut)
              $timeOut = setTimeout(this.nextSlide, $slideDuration)
            }
          }else{
            //console.log('right swipe')
            if($currentSlide!==1){
              clearTimeout($timeOut)
              this.prevSlide()
            }else{
              $tcRoot.goToSlide(1)
              clearTimeout($timeOut)
              $timeOut = setTimeout(this.nextSlide, $slideDuration)
            }
          }
        }

        $changeX = 0
        $initialX = 0
        $initialY = 0
        $currentY = 0
        $currentX = 0
        $initialPosition = 0
        $marginLeftMove = 0
        $falseSwipe = false
        $moving = false
      })
    })


    return this.init()


  }
})()