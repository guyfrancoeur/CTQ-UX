/* ********* Languages ********* */
function traduire() {
  $('.translate').click(function() {
    var lang = $(this).attr('id');
    $.ajax({
      url: "./data/" + lang + ".json",
      dataType: "json",
      success:function(data){	
        $.each(data, function(index, x) {
          if(x.propriete == "text") $(x.obj).text(x.value);
          else{
            $(x.obj).attr(x.propriete, x.value);
          }
        });
      },
      error:function(xhr, ajaxOptions, thrownError){
        console.log('error');
        console.log(thrownError);
      }
    });
  });
}
