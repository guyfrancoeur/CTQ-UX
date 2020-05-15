// /************* FOR DEV PREVIEW *************** */
// $("#creerCompte").modal("show");


/************* /FOR DEV PREVIEW *************** */

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




/* ********* LOGIN (modal) ********* */
$(function(){
  $('#login-form').submit(function(e) {
    e.preventDefault()
    var $form = $(this)
    $.post($form.attr('action'), $form.serialize())
    .done(function(data) {
      $('#login').html(data)
      $('#formulaire').modal('hide')
    })
    .fail(function() {
      alert('ça ne marche pas...')
    })
  })
  $('.modal').on('shown.bs.modal', function(){
    $('input:first').focus()
  })
});
$('#sign-in').click(()=>{
	$("#formulaire").modal("show");
});

/* ********* SIGN UP (modal) ********* */
$('#sign-up').click(()=>{
	$("#formulaire").modal("hide");
	$("#creerCompte").modal("show");
});

/* ********* RECOVER (modal) ********* */

$('#forgot').click(()=>{
	$("#formulaire").modal("hide");
	$("#recupererPass").modal("show");
});

/* ********* Languages ********* */

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
	"refrigerated" : "réfrigéré"
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
	"refrigerated" : "refrigerated"
}


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
