/* ********* Languages ********* */
function translateFunction(lang,name) {
  document.documentElement.lang = lang;
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

$('#m_c, #m_courriels, #m_e, #m_t, #m_te, #m_v').on('shown.bs.modal', function() {
  $(this).off('shown.bs.modal');  // Évite la création d'un nouveau event listener à chaque ouverture de la modale
});