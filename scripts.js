// ==========================================
// SMOOTH SCROLL MENU 
// ==========================================

function pageScroll(){
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href^="#s01"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
}

// ==========================================
// SCROLL TO TOP OF PAGE
// ==========================================

function scrollUp(){
  var offset = 250;
  var duration = 1000;
  $(window).scroll(function() {
    if ($(this).scrollTop() > offset) {
      $(".back-to-top").fadeIn(duration);
    } else {
      $(".back-to-top").fadeOut(duration);
    }
  });

  $(".back-to-top").click(function(event) {
    event.preventDefault();
    $("html, body").animate({scrollTop: 0}, duration);
    $(".navbar-toggler").addClass("collapsed");
    $(".navbar-toggler").attr("aria-expanded", "false");
    $(".navbar-collapse").removeClass("show");
    return false;
  });
}
  

// ===================================================
// REMOVE COLLAPSIBLE CLASSES TO DISPLAY FULL CONTENT
// ===================================================

function epCollapse(){
  if ($(".width-tester").css("width") == "768px") {
    $(".ep-more").removeClass("show");
    if(!$(".collapse.ep-desc").hasClass( "show" )){ 
      $('.ep-icon, .ep-desc, .ep-video').addClass("show");
    }
  } else {
    if($(".collapse.ep-desc" ).hasClass( "show" )){ 
      // $('.ep-icon, .ep-desc, .ep-video, .ep-close').removeClass("show");
      $('.ep-icon, .ep-desc, .ep-video').removeClass("show");
    }
  }
}

// ===================================================
// CHANGE "more" LINK TEXT WHEN CLICKED (SHOW MORE/SHOW LESS)
// ===================================================

function changeLink(){
  $("a.more").click(function () {
    var more = $(this).attr("moretext");
    if (typeof more !== typeof undefined && more !== false) {
      $(this).text(function(i, text){
          return text === "show less" ? more : "show less";
      })
    }
  });
}

// ===================================================
// ROTATE COLLAPSE ARROW
// ===================================================

function rotateArrow(){
  // $(".collapse-toggle, .ep-close").click(function () {
  $(".collapse-toggle").click(function () {
    var thisSection = $(this).closest("[id]").prop("id");
    // console.log(thisSection);
    $("#" + thisSection + " .collapse-toggle").toggleClass("rotate");
    $(".collapse-toggle").not(this).removeClass("rotate");
  });
}


// ===================================================
// FUNCTION CALLS
// ===================================================

$(document).ready(function(){  

  changeLink();
  epCollapse();  
  rotateArrow();
  pageScroll();
  scrollUp();

  // ======================================
  // "HOW" SECTION SLIDER INITIALIZER START
  // ======================================

  $('.slider-how').slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    centerMode: false,
    autoplay: false,
    mobileFirst: true,
    dots: true,
    prevArrow: "<i class='fa fa-angle-left slick-prev' aria-hidden='true'></i>",
    nextArrow: "<i class='fa fa-angle-right slick-next' aria-hidden='true'></i>"
  });



  // ======================================
  // "WHO" SECTION SLIDER INITIALIZER START
  // ======================================

  $('.slider-who').slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 2,
    centerMode: false,
    autoplaySpeed: 5000,
    mobileFirst: true,
    prevArrow: "<i class='fa fa-angle-left slick-prev' aria-hidden='true'></i>",
    nextArrow: "<i class='fa fa-angle-right slick-next' aria-hidden='true'></i>"
    ,
    responsive: [
    {
      breakpoint: 490,
      settings: {
        slidesToShow: 2
      }
    }
    ,
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3
      }
    }
    ,
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4
      }
    }
    ,
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 6
      }
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 7
      }
    }
  ]
  });

  $('.collapse').on('shown.bs.collapse', function(e) {
    var $card = $(this).closest('.card');
    $('html,body').animate({
      scrollTop: $card.offset().top
    }, 500);
  });


});

// $(window).on('resize', function(){
//   epCollapse();
// });