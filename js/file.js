/* ********* Languages ********* */
//$(function() {
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
    })
  })
//});

//Je ne comprend pas pourquoi deux facon de faire.
//Que fait cette fonction ?
//Utile pour quel formulaire ?
// Validation formulaire
//(function() {
//  'use strict';
  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
//})();

// Animation index.html
$(".arrow-card" ).click(function() {
	$(this).fadeOut(100);
  $(this).fadeIn(100);
});
$(".petite-div" ).click(function() {
	$(this).fadeOut(100);
  $(this).fadeIn(100);
});

//exemple complet 
//$('#m_profil').load('../modal/m.profil.html', function () { m_profil_ready('#m_profil'); });
$('#m_template').load('./m.template.html');
$('#m_broker').load('./m.broker.html');
$('#m_trucker').load('./m.trucker.html');

// Taille card index.html
$( document ).ready(function() {
	var heightDivLogin = $('#divLogin').height();
	$('#arrow-card1').height(heightDivLogin);
	$('#arrow-card2').height(heightDivLogin);
	$('#divAdmin').height(heightDivLogin);
});



