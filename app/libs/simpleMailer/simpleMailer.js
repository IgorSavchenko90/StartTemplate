if ( typeof(simpleMailer) === "undefined" ||  typeof(simpleMailer) === "null" ){
  var simpleMailer = {};
}
$(document).ready(function(){
  
  // simpleMailer
  $("body").on( "submit", ".fn_simpleMailer", function(){
    var form       = $(this);
    var data       = new FormData(form[0]);
    var btn_submit = form.find('[type=submit]');
    // simpleMailer data
    var callback   = form.data('callback');

    $.ajax({
      // server script to process the upload
      url: "../libs/simpleMailer/simpleMailer.php",
      type: 'POST',
      // Form data
      data: data,
      // Tell jQuery not to process data or worry about content-type
      dataType: "json",
      cache: false,
      contentType: false,
      processData: false,
      beforeSend: function(data){ 
        form.addClass('sending');
        btn_submit.addClass('sending');
      },
      success: function(data){
        // if redirect 
        if ( data.location ) {
          window.location.replace(data.location+"/");
        } else {
          form.trigger('reset');
          // clear styles
          form.removeClass('sending');
          btn_submit.removeClass('sending');
          // style success
          form.addClass('success');
          btn_submit.addClass('success');
          simpleModal.modalClose();
          // clear styles success
          setTimeout(function(){
            form.removeClass('success');
            btn_submit.removeClass('success');
          }, 2500);
          // message
          console.log("simpleMailer success");
        }
        if ( typeof simpleMailer[callback] !== "undefined" ){
          simpleMailer[callback]();
        }
      },
      error: function(data){
        console.log("simpleMailer error");
      }
    });
    return false;
  });

});