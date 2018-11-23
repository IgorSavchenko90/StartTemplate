// if slick 
if (typeof $(this).slick == 'function') {
  
  var photo_report__slider = $('.photo_report__slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $(".slider__prev").click(function() {
      photo_report__slider.slick("slickPrev");
  }), $(".slider__next").click(function() {
      photo_report__slider.slick("slickNext");
  });
  
}
// END if slick