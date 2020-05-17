

/* ********* Validation Formulaire ********* */
(function() {
	'use strict';
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
})();



/* ********* Languages ********* */




$(function() {
    $('.translate').click(function() {
      var lang = $(this).attr('id');
      console.log(lang);
      $.ajax({
	      url: "./data/" + lang + ".json",
	      dataType: "json",
	      success:function(data){
	      	console.log('success');
	      	
	      	// Bouton de langues :
	    	  $(".other-lang-button").click(function(){
						var val1 = $(".lang-button").text();
					 	var id1 = $(".lang-button").attr("id");
					  var val2 = $(".other-lang-button").text();
					  var id2 = $(".other-lang-button").attr("id");
					  $(".other-lang-button").text(val1);
					  $(".other-lang-button").val(val1);
					  $(".other-lang-button").attr("id",id1);
					  $(".lang-button").text(val2);
					  $(".lang-button").val(val2);
					  $(".lang-button").attr("id",id2);
					}),
					    
					// Changement des attributs :
	    	  $("#home").text(data[0].home);
	    	  
	    	  
	      },
	       
	       error:function(xhr, ajaxOptions, thrownError){
	    	   console.log('error');
	         console.log(thrownError);
	       }
})})});



/* ********* Sécurité Login ********* */
$("#nsecure").slider({tooltip: 'always'}); //a la JQuery

$("#nsecure").change(function(){
  if (parseInt(this.value) == 20) {
    $("#bsubmit").prop('disabled', false);
  }
});







/* ********* Espace résultats ********* */
function modify(){
	$('#container').addClass('col-12');
	$('#div1').addClass('row');
	$('#div2').addClass('col-12');
	$('#div2').addClass('col-xl-6');
	$('#div7').addClass('col-12');
	$('#div7').addClass('col-xl-6');
	$('#div3').addClass('bloc');
	$('#div3').addClass('second-bloc');
	$('#div4').addClass('interieur');
		
	document.getElementById("contenu").innerHTML += "<h3>Results</h3>";
}









var languages = new Array();

languages['fr'] = {
	"home" : "Accueil",
	"sign-in" : "Se connecter",
	"password" : "Mot de passe",
	"sing-up" : "Nouveau ici ? S'inscrire",
	"forgot" : "Mot de passe oublié",
	"quantity" : "Quantité",
	"weight" : "Poids",
	"sign-in2" : "Se connecter",
	"time" : "Temps",
	"value" : "Valeur",
	"hours" : "heures",
	"dollar" : "€",
	"longueur" : "Longueur",
	"width" : "Largeur",
	"height" : "Hauteur",
	"requirements" : "Exigences",
	"loading" : "Chargement",
	"dimensions" : "Dimensions du fret (pieds)",
	"search" : "Rechercher",
	"origin" : "DÉPART - Ville ou Code Postal",
	"destination" : "DESTINATION - Ville ou Code Postal",
	"login-title" : "Se connecter",
	"refrigerated" : "réfrigéré",
	"manufacturer" : "Donneur d'ouvrage",
	"transporter" : "Transporteur",
	"become-m" : "Devenir un donneur d'ouvrage",
	"become-t" : "Become a Transporter",
	"login-index" : "Se connecter"
}

languages['en'] = {
	"home" : "Home",
	"sign-in" : "Sign in",
	"password" : "Password",
	"sing-up" : "New around here ? Sign up",
	"forgot" : "Forgot password ?",
	"quantity" : "Quantity",
	"weight" : "Weight",
	"sign-in2" : "Sign in",
	"time" : "Time",
	"value" : "Value",
	"hours" : "hours",
	"dollar" : "$",
	"longueur" : "Length",
	"width" : "Width",
	"height" : "Height",
	"requirements" : "Requirements",
	"loading" : "Loading",
	"dimensions" : "Freight dimensions (feet)",
	"search" : "Search",
	"origin" : "ORIGIN - City or Postal Code",
	"destination" : "DESTINATION - City or Postal Code",
	"login-title" : "Login",
	"refrigerated" : "refrigerated",
	"manufacturer" : "Manufacturer & broker",
	"transporter" : "Transporter",
	"become-m" : "Become a Manufacturer or a Broker",
	"become-t" : "Become a Transporter",
	"login-index" : "Login"
}
/*
$(function() {
    $('.translate').click(function() {
      var lang = $(this).attr('id');

      $('.lang').each(function(index, item) {
        $(this).text(languages[lang][$(this).attr('id')]);
        $(this).attr('placeholder', languages[lang][$(this).attr('id')]); 
      });
    });
    
    $(".other-lang-button").click(function(){
    	var val1 = $(".lang-button").text();
    	var id1 = $(".lang-button").attr("id");
    	var val2 = $(".other-lang-button").text();
    	var id2 = $(".other-lang-button").attr("id");
    	
    	$(".other-lang-button").text(val1);
    	$(".other-lang-button").val(val1);
    	$(".other-lang-button").attr("id",id1);
        $(".lang-button").text(val2);
        $(".lang-button").val(val2);
        $(".lang-button").attr("id",id2);
    });
  }); 
*/