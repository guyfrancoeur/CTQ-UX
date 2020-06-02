//Je ne comprend pas pourquoi deux facon de faire.
//Que fait cette fonction ?
//Utile pour quel formulaire ?
// Validation formulaire
//(function() {
//  'use strict';
/*
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
*/
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

// Taille card index.html
// est utile ??
//$( document ).ready(function() {
//	var heightDivLogin = $('#divLogin').height();
//	$('#arrow-card1').height(heightDivLogin);
//	$('#arrow-card2').height(heightDivLogin);
//	$('#divAdmin').height(heightDivLogin);
//});
