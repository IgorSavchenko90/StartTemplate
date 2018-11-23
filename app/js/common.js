$(function (){
  var App = {
    height: $(window).height(),
    width:  $(window).width(),
    navHeight: 50, 
  }
   
   
  // вернет позицию элемента InViewport
  function positionInViewport ( element ) {
     element.startPoint = element.offset().top;
     element.endPoint = element.offset().top + element.height();
  
     var viewport = {
         top : $(window).scrollTop(),
         bottom : $(window).scrollTop() + $(window).innerHeight()
     }
     var precent = 1 - ((viewport.bottom - element.startPoint) / $(window).innerHeight()) * -100;
      return precent;
  }
  
  
  
  // элемент, которому задаем высоту / высота навигации, если есть / процент / блок
  function setBlockHeight( element, navHeight, mod, block ){
    var windowRealHeight = App.height;
    if ( block ){
      windowRealHeight = $(block).height();
    }
    var windowHeight = windowRealHeight - navHeight;
    if ( mod ){
      windowHeight *= mod;
    }
    $(element).height( windowHeight );
    $(element).css("maxHeight", windowHeight );
  }
  
  
  // авто прокрутка до блока
  function setBlockToViewport( ){
    setInterval( function(){
      $(".set_to_viewport__js").each( function(){
        if ( positionInViewport( $(this) ) > 80  && positionInViewport( $(this) ) < 120 ) {
            scrollToBlock( $(this), App.navHeight );
          };
      });
    }, 5000);
  }
  
  
  
  // float_block 2.0
  function float_block( block, add_class, false_block ){
    // param
    var this_b  = $(block);
    var block_t = $(this_b).offset().top;
    var block_h = this_b.outerHeight();
    // if need false block
    if ( false_block ){
      var block_n = "float_block_" + block;
      var false_b = "<div class='" + block_n + "' style='height:" + block_h + "px;' ></div>";
      this_b.wrap(false_b);
    }
    // in load page
    var doc_r  = $(window).scrollTop();
    if ( doc_r + block_h > block_h ){
      this_b.addClass(add_class);
    }
    // in scroll
    $(window).on('scroll', function() {
      var doc_r  = $(window).scrollTop();
      if ( doc_r + block_h > block_h ){
        this_b.addClass(add_class);
      } else {
        this_b.removeClass(add_class);
      }
    });
  }
  
  
  
  // top_navigate_mobile 2.0
  function top_navigate_mobile(){
    
    var main_wrap       = $('#main_wrapper_js');
    var header__nav_btn = $('#header__nav_btn');
    var header__nav     = $('#header__nav_wrap');
    var openClass       = "open_nav";
    
    // header__nav for mobile
    $("body").on( "click", '#header__nav_btn', function(){
      if ( !header__nav.data('open') ){
        menu_open();
      } else {
        menu_close();
      }
    });
    
  
    function menu_open(){
      
      header__nav.addClass(openClass);
      header__nav_btn.addClass(openClass);
      $(main_wrap).addClass(openClass);
      header__nav.data('open', true);
      
      $("html").addClass(openClass);
      $("body").addClass(openClass);
  
      $("body").on( "mousedown", '#main_wrapper_js', function(){
        menu_close();
      });
      $("body").on( "touchmove", '#main_wrapper_js', function(){
        menu_close();
      });
      $("body").on( "touchstart", '#main_wrapper_js', function(){
        menu_close();
      });
  
    }
    function menu_close(){
      header__nav.removeClass(openClass);
      header__nav_btn.removeClass(openClass);
      main_wrap.removeClass(openClass);
      header__nav.data('open', false);
      
      $("html").removeClass(openClass);
      $("body").removeClass(openClass);
    }
  }
  
  
  
  function scrollToNextBlock( block, offset ){
    var block   = block.closest("section");
    var next    = block.next();
    var block_t = $(next).offset().top - offset;
    $('html, body').animate({scrollTop:block_t}, 1000);
  };
  
  
  function scrollToBlock( element, offset ){
    var block_t = $(element).offset().top - offset;
    $('html, body').animate({scrollTop:block_t}, 600);
  };
  
  
  
  
  /* modals */
  function modalOpen(modal){
  	$('.'+modal).slideDown();
  	overlayOpen();
  }
  function modalClose(){
  	$(".modalWindowWrap").slideUp();
  	overlayClose();
  }
  $("body").on( "click", "[data-modal]", function(){
  	var modal = $(this).attr("data-modal");
  	modalOpen(modal);
  });
  $("body").on( "click", function(event){
  	var target = $(event.target);
  	if ( target.hasClass('modalCell') || target.hasClass('modalWindowClose') ){
  		modalClose();
  	}
  });
  
  /* overlay */
  function overlayOpen(){
  	$(".modalOverlay").fadeIn();
  	$("html, body").addClass('no-scroll');
  }
  function overlayClose(){
  	$(".modalOverlay").fadeOut();
  	$("html, body").removeClass('no-scroll');
  }
    
  
  /* masked input */ 
  //var mask = "+7 (999) 999-99-99";
  //var placeholder = {'placeholder':'+7 (___) ___ __ __'};
  var mask = "+38(099) 999-99-99";
  var placeholder = {'placeholder':'+38(0__) ___-__-__'};
  var user_phone = $('.user_phone_mask');
  
  user_phone.each(function(){
  	$(this).mask(mask);
  });
  user_phone.attr(placeholder);
   
  // actions
  $(window).on('resize', function() {
    
  }); 
  $(window).on('scroll', function() {
    
  });
  $(window).on('load', function () {
    
  });
  
  
  
  
});