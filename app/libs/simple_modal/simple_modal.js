var simpleModal = (function(){

  var modalOverlay = $(".simpleModalOverlay");

  /* overlay */
  function overlayOpen(){
    modalOverlay.fadeIn();
    $("html, body").addClass('no-scroll');
  }
  function overlayClose(){
    modalOverlay.fadeOut();
    $("html, body").removeClass('no-scroll');
  }

  return {
    init: function(){
      $("body").on( "click", "[data-simple_modal]", function(event){
        event.preventDefault();
        var modal = $(this).data("simple_modal");
        simpleModal.modalOpen(modal);
      });
      $("body").on( "click", function(event){
        var target = $(event.target);
        if ( target.hasClass('simpleModalCell') || target.hasClass('simpleModalWindowClose') ){
          simpleModal.modalClose();
        }
      });
      $("body").on( "keydown", function(event){
        if (event.keyCode == 27) {
          simpleModal.modalClose();
        }
      });
    },
    /* public methods */
    modalOpen: function(modal, text){
      if (text){
        $('.'+modal).find(".simpleModalWindowText").html( text );
      }
      $('.'+modal).slideDown();
      overlayOpen();
    },
    modalClose: function(){
      $(".simpleModalWindowWrap").slideUp();
      overlayClose();
    },
  }
})();