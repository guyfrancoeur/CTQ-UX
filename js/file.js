/* ********* Languages ********* */
$(function() {
  $('.translate').click(function() {
    var lang = $(this).attr('id');
    $.ajax({
      url: "./data/" + lang + ".json",
      dataType: "json",
      success:function(data){	
        $.each(data, function(index, x) {
          $(x.obj).text(x.value);
          $(x.obj).attr('placeholder', x.value);
          //$(x.obj).attr('title', x.value);
        });
      },
      error:function(xhr, ajaxOptions, thrownError){
        console.log('error');
        console.log(thrownError);
      }
    })
  })
});
