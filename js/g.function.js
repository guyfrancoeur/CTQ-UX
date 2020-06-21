/* ********* Languages ********* */
$('.translate').click(function() {
  var lang = $(this).attr('id');
  if (lang == "fr"){
    $("#fr").addClass("currentlanguage");
    $("#en").removeClass("currentlanguage");
  }else{
    $("#en").addClass("currentlanguage");
    $("#fr").removeClass("currentlanguage");
  }
  $.ajax({
    url: "./data/" + lang + ".json",
    dataType: "json",
    success:function(data){ 
      $.each(data, function(index, x) {
        if(x.propriete == "text") $(x.obj).text(x.value);
        if(x.propriete == "title") $(x.obj).selectpicker({title: x.value}).selectpicker('render');
        if(x.propriete == "textdrop"){
          $(x.obj).text(x.value);
          $(x.obj).closest("select").selectpicker('refresh');
        }
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