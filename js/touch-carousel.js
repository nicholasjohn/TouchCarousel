(function () {
  $.fn.touchCarousel = function(options) {
    /*
      Extension: HeroCarousel
      Built by: Nick Price
    */

    $this = this
    this.addClass('js-touch-carousel')


    // Public variables
    var settings = $.extend({
        slideDuration: 4000
      , transitionDuration: 250
      , easing: 'swing'
      , width: '100%'
    }, options )

    // Public variables
    var $slideDuration = settings.slideDuration // In milliseconds
      , $transitionDuration = settings.transitionDuration // In milliseconds
      , $easing = settings.easing // 'swing' or 'linear'
      , $width = settings.width // Width in pixels



    if($width == '100%'){
      $('.js-touch-carousel').css('width','100%')
      $width = $('.js-touch-carousel').width()
    }else{
      $width = parseInt($width,10) // Strip units should the user enter 'px'
      $('.js-touch-carousel').width($width)
    }


    // DEFINE CAROUSEL TYPE
    if( $('.js-touch-carousel > img').length !== 0 ) {
      $carouselType = 'imagesOnly'
      var $numArticles = $('.js-touch-carousel > img').length
      console.log($numArticles)
      $('.js-touch-carousel > img').wrapAll('<div class="touch-tabs js-touch-tabs" />')

    } else if( $('.js-touch-carousel > .touch-tab').length !== 0 ){
      $carouselType = 'linksInside'
      var $numArticles = $('.touch-tab').length
      console.log($numArticles)
      $('.js-touch-carousel > .touch-tab').wrapAll('<div class="touch-tabs js-touch-tabs" />')

    } else if( $('a:first-child > img').length !== 0 ) {
      $carouselType = 'imageLinks'
      var $numArticles = $('.js-touch-carousel > a').length
      console.log($numArticles)
      $('.js-touch-carousel > a').wrapAll('<div class="touch-tabs js-touch-tabs" />')

    }


    // Carousel setup
    var $touchReel = $('<div class="touch-reel js-touch-reel" />').width($numArticles*$width)
        $touchItem = $('<div class="touch-item js-touch-item" />').append($touchReel)
      , $carouselType

    $('.js-touch-carousel').prepend($touchItem)


    switch($carouselType) {

      case 'imagesOnly' : // .touch-carousel contains images only
        $('.js-touch-tabs img').each(function(i,v){
          var $bigImg = $('<img>').attr({
              src: $(this).data('carousel'),
              title: $(this).attr('alt'),
              alt: $(this).attr('alt')
            })
            , $newItem = $('<div>').width($width).addClass('article').append($bigImg) // New hero item

          $touchReel.append($newItem)

          // TIMERS
          // Active: #214b71
          // Normal: #3a73a6
          var $timerOverlay = $('<div>').addClass('reel-timer-overlay js-reel-timer-overlay')
            , $timerDiv = $('<div>').addClass('reel-timer').append($timerOverlay)

          var $wrapper = $('<article>').addClass('touch-tab js-touch-tab').attr('data-slide',(i+1))
          $(this).wrap($wrapper)
          $timerDiv.insertBefore($(this))

        })
        break;

      case 'imageLinks' : // .touch-carousel contains images within links
        $('.js-touch-carousel .touch-tabs > a').each(function(i,v){
          var $bigImg = $(this).find('img')
            , $a   = $(this)
            , $newImg = $('<img>').attr({
              src: $bigImg.data('carousel'),
              title: $bigImg.attr('alt'),
              alt: $bigImg.attr('alt')
            })
            , $newA = $('<a>').attr({
              href: $a.attr('href')
            }).append($newImg)
            , $newItem = $('<div>').width($width).addClass('article').append($newA)

          $touchReel.append($newItem)

          // TIMERS
          // Active: #214b71
          // Normal: #3a73a6
          var $timerOverlay = $('<div>').addClass('reel-timer-overlay js-reel-timer-overlay')
            , $timerDiv = $('<div>').addClass('reel-timer').append($timerOverlay)

          var $wrapper = $('<article>').addClass('touch-tab js-touch-tab').attr('data-slide',(i+1))
          $(this).wrap($wrapper)
          $timerDiv.insertBefore($(this))

        })
        break;

      default : // .touch-tab is complex
        $('.js-touch-carousel .touch-tab').each(function(i,v){
          var $bigImg = $(this).find('img')
            , $a   = $(this).find('a')
            , $h   = $(this).find('.article-title')
            , $meta = $(this).find('.meta')
            , $newImg = $('<img>').attr({
              src: $bigImg.data('carousel'),
              title: $bigImg.attr('alt'),
              alt: $bigImg.attr('alt')
            })
            , $newH = $('<h3>').addClass('h1 article-title').html($h.text())
            , $newA = $('<a>').attr({
              href: $a.attr('href')
            }).append($newImg).append($newH)
            , $newItem = $('<div>').width($width).addClass('article').append($newA).append($meta) // New hero item


          $touchReel.append($newItem)

          // TIMERS
          // Active: #214b71
          // Normal: #3a73a6
          var $timerOverlay = $('<div>').addClass('reel-timer-overlay js-reel-timer-overlay')
            , $timerDiv = $('<div>').addClass('reel-timer').append($timerOverlay)
          $(this).addClass('js-touch-tab').attr('data-slide',(i+1)).prepend($timerDiv)

        })
        break;
    }

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

      $this.goToSlide($nextSlide)
      clearTimeout($timeOut)
      $timeOut = setTimeout($this.nextSlide, $slideDuration)
    }

    // This function either gets the new margin-left
    // position of the .touch-reel for a $slideNum provided,
    // or will 'fix' a broken position to the $currentSlide
    this.updateMargin = function updateMargin($slideNum){
      //console.log($slideNum)
      var $m = ($slideNum===1)?0:($slideNum-1)
        , $newMargin = -( $m * $('.js-touch-item').width())
      $touchReel.stop().animate({'margin-left' : $newMargin}, $transitionDuration, $easing)
    }

    // This function calls a slide to be moved to
    this.goToSlide = function goToSlide($slideNum){
      //console.log('goToSlide('+$slideNum+') called')

      $('.touch-tab.active').removeClass('active')
      $('.animating').removeClass('animating')
      $('.touch-tab[data-slide="'+$slideNum+'"]').addClass('active').find('.js-reel-timer-overlay').addClass('animating')
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
          $currentSlide = 4
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
          $currentSlide = 4
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
    $('.js-touch-tab').hover(function(){
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
      setTimeout(this.nextSlide,50)
      return this
    }






    /*
      RESPONSIVE
      FUNCTIONS
    */
    $(window)
    .on('exit.two-col enter.two-col', function () {
      $subWidth = $('.js-touch-carousel .touch-tab:first-child').width()
      //console.log('updating')
      this.updateMargin($currentSlide)
    })
    .on('resize', function(){
      $width = $('.js-touch-carousel').width()
      $('.js-touch-reel').width($numArticles*$width)
      $('.js-touch-reel .article').width($width)
      this.updateMargin($currentSlide)
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
          }else if( $heroMargin <= -($('.js-touch-item').width()*3) ){
            // Carousel is right of last item

            $touchReel.css({'margin-left': parseInt($initialPosition,10) + ($changeX*0.2) })
          }else{
            $touchReel.css({'margin-left': $marginLeftMove })
          }

          // add active state
          $('.js-touch-tab.active').find('.js-reel-timer-overlay').removeClass('animating').addClass('full')

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

        $('.js-touch-tab.active').find('.full').removeClass('full').width(0).addClass('animating')

        $isPaused = false

        if(Math.abs($changeX) < 20 || $falseSwipe === true){
          $touchReel.animate({'margin-left': $initialPosition})
          $falseSwipe = false
          //console.log('null swipe')
        }else{
          if($marginLeftMove < parseInt($initialPosition,10)){
            //console.log('left swipe')
            if($currentSlide!==4){
              clearTimeout($timeOut)
              $this.nextSlide()
            }else{
              $this.goToSlide(4)
              clearTimeout($timeOut)
              $timeOut = setTimeout($this.nextSlide, $slideDuration)
            }
          }else{
            //console.log('right swipe')
            if($currentSlide!==1){
              clearTimeout($timeOut)
              $this.prevSlide()
            }else{
              $this.goToSlide(1)
              clearTimeout($timeOut)
              $timeOut = setTimeout($this.nextSlide, $slideDuration)
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