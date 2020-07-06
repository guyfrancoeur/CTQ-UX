/* ********* Languages ********* */
function translateFunction(lang,name) {
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
      $.each(data[name], function(n, tab) {
        $.each(tab, function(i, x) {
          if(x.propriete == "text") $(x.obj).text(x.value);
          if(x.propriete == "titleDropdown") $(x.obj).selectpicker({title: x.value}).selectpicker('render');
          if(x.propriete == "textDropdown"){
            $(x.obj).text(x.value);
            $(x.obj).closest("select").selectpicker('refresh');
          }
          else{
            $(x.obj).attr(x.propriete, x.value);
          }
        });
      });
      $.each(data.all, function(i, y) {
        $(y.obj).text(y.value);
      });
    },
    error:function(xhr, ajaxOptions, thrownError){
      console.log('error');
      console.log(thrownError);
    }
  });
}