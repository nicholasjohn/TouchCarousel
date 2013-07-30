(function () {
  /*
    Extension: HeroCarousel
  */

  // Public variables
  var $slideDuration = 4000 // In milliseconds
    , $transitionDuration = 250 // In milliseconds
    , $easing = 'swing' // 'swing' or 'linear'
    , $numArticles = 4



  // Carousel setup
  var $heroReel = $('.js-touch-reel')
  $('.js-touch-carousel .touch-tab').each(function(i,v){
    var $currentSlideimg = $(this).find('img')
      , $a   = $(this).children('a')
      , $h   = $(this).find('h3')
      , $meta = $(this).find('.meta')
      , $newImg = $('<img>').attr({
        src: $currentSlideimg.data('carousel'),
        title: $currentSlideimg.attr('alt'),
        alt: $currentSlideimg.attr('alt')
      })
      , $newH = $('<h3>').addClass('h1 article-title').html($h.text())
      , $newA = $('<a>').attr({
        href: $a.attr('href')
      }).append($newImg).append($newH)
      , $newItem = $('<div>').addClass('article').append($newA).append($meta) // New hero item


    $heroReel.append($newItem)

    // TIMERS
    // Active: #214b71
    // Normal: #3a73a6
    var $timerOverlay = $('<div>').addClass('reel-timer-overlay js-reel-timer-overlay')
      , $timerDiv = $('<div>').addClass('reel-timer').append($timerOverlay)
    $(this).addClass('js-touch-tab').attr('data-slide',(i+1)).prepend($timerDiv)

  })


  // Private vars
  var $currentSlide = 0
    , $nextSlide = 1
    , $isPaused = false
    , $subWidth = 0
    , $timeOut


  // This function either gets the new margin-left
  // position of the .touch-reel for a $slideNum provided,
  // or will 'fix' a broken position to the $currentSlide
  function updateMargin($slideNum){
    var $m = ($slideNum===1)?0:($slideNum-1)
      , $newMargin = -( $m * $('.js-touch-item').width())
    $heroReel.stop().animate({'margin-left' : $newMargin}, $transitionDuration, $easing)
  }

  // This function calls a slide to be moved to
  function goToSlide($slideNum){
    //console.log('goToSlide('+$slideNum+') called')

    $('.touch-tab.active').removeClass('active')
    $('.animating').removeClass('animating')
    $('.touch-tab[data-slide="'+$slideNum+'"]').addClass('active').find('.js-reel-timer-overlay').addClass('animating')
    //.css({'-webkit-transition-duration':$slideDuration+'ms'})
    updateMargin($slideNum)

  }

  // This function calls the next slide
  // Upon reaching the end of elements
  // the carousel will go back to the beginning
  nextSlide = function nextSlide(){
    //console.log('nextSlide()')
    if(!$isPaused){

      goToSlide($nextSlide)
      clearTimeout($timeOut)
      $timeOut = setTimeout(nextSlide, $slideDuration)

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
  prevSlide = function prevSlide(){
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

      goToSlide($currentSlide)
      clearTimeout($timeOut)
      $timeOut = setTimeout(nextSlide, $slideDuration)


    }
  }


  // Deals with hovers on the .sub-menu
  $('.js-touch-tab').hover(function(){
    clearTimeout($timeOut)
    goToSlide($(this).data('slide'))


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
    $timeOut = setTimeout(nextSlide, $slideDuration)
  })



  // Initiate
  $heroReel.show(0,function(){
    $('.js-reel-timer-overlay:first-of-type').width(0)
    setTimeout(nextSlide,50)
  })






  /*
    RESPONSIVE
    FUNCTIONS
  */
  $(window)
  .on('exit.two-col enter.two-col', function () {
    $subWidth = $('.js-touch-carousel .touch-tab:first-child').width()
    //console.log('updating')
    updateMargin()
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

  $heroReel.on('touchstart', function(e){
    $isPaused = true

    $initialPosition = $heroReel.css('margin-left')

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

        $heroMargin = parseInt($heroReel.css('margin-left'),10)

        if( $heroMargin >= 0 ){
          // Carousel is left of first item
          $heroReel.css({'margin-left': $marginLeftMove * 0.2 })
        }else if( $heroMargin <= -($('.js-touch-item').width()*3) ){
          // Carousel is right of last item

          $heroReel.css({'margin-left': parseInt($initialPosition,10) + ($changeX*0.2) })
        }else{
          $heroReel.css({'margin-left': $marginLeftMove })
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

      if(Math.abs($changeX) < 100 || $falseSwipe === true){
        $heroReel.animate({'margin-left': $initialPosition})
        $falseSwipe = false
        //console.log('null swipe')
      }else{
        if($marginLeftMove < parseInt($initialPosition,10)){
          //console.log('left swipe')
          if($currentSlide!==4){
            clearTimeout($timeOut)
            nextSlide()
          }else{
            goToSlide(4)
            clearTimeout($timeOut)
            $timeOut = setTimeout(nextSlide, $slideDuration)
          }
        }else{
          //console.log('right swipe')
          if($currentSlide!==1){
            clearTimeout($timeOut)
            prevSlide()
          }else{
            goToSlide(1)
            clearTimeout($timeOut)
            $timeOut = setTimeout(nextSlide, $slideDuration)
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





}())