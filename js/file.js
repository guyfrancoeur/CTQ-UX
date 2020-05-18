/* ********* Aide ********* */
$(function () {
  $('[data-toggle="popover"]').popover()
});




/* ********* Requirements ********* */
// Compteur Requirements
var compteur = 0;
var ul2 = document.getElementById("compteur");

var ul2 = document.getElementById("listrequirements");
$("option").click(function() {
	compteur++;
	document.getElementById("compteur").innerHTML = compteur;
	value = $(this).text();
	var li2 = document.createElement("li");
	li2.id = $(this).val();
  li2.className = 'list-group-item';
  li2.className = 'd-flex';
  li2.className = 'justify-content-between';
  li2.className = 'align-items-left';
  li2.textContent = value;
  ul2.appendChild(li2);
  document.getElementById($(this).val()).innerHTML += "<button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
	
});

$( "option" ).click(function() {
  $(this).slideUp();
});




/* ********* Ajout courriels ********* */
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var addcourriel = document.getElementById("addcourriel");
var inputcourriel = document.getElementById("inputcourriel");
var ul = document.getElementById("listecourriels");
nbEmails = 0;

addcourriel.addEventListener("click", function() {
	if (validateEmail(inputcourriel.value)){
		nbEmails ++;
	 	var li = document.createElement("li");
	  li.className = 'list-group-item';
	  li.className = 'd-flex';
	  li.className = 'justify-content-between';
	  li.className = 'align-items-center';
	  li.textContent = inputcourriel.value +";";
	  console.log(inputcourriel);
	  ul.appendChild(li);
	  li.innerHTML += "<button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
	}
});



/* ********* Mise en vente ********* */

var cout = 0;
function selection(elem){
	var value = elem.id;
	if(value == "A"){
		cout = 1;
		$('#cout').html(cout);
		$('#A').addClass('bg-light');
		$('#cTextA').addClass('font-weight-bold');
		$('#duree').removeAttr("disabled");
		$('#B').removeClass('bg-light');
		$('#C').removeClass('bg-light');
		$('#cTextB').removeClass('font-weight-bold');
		$('#cTextC').removeClass('font-weight-bold');
		$('#montant').prop("disabled", true);
		$('#duree2').prop("disabled", true);
		$('#inputcourriel').prop("disabled", true);
	};
	if(value == "B"){
		cout = 2;
		$('#cout').html(cout);
		$('#B').addClass('bg-light');
		$('#cTextB').addClass('font-weight-bold');
		$('#montant').removeAttr("disabled");
		$('#A').removeClass('bg-light');
		$('#C').removeClass('bg-light');
		$('#cTextA').removeClass('font-weight-bold');
		$('#cTextC').removeClass('font-weight-bold');
		$('#duree').prop("disabled", true);
		$('#duree2').prop("disabled", true);
		$('#inputcourriel').prop("disabled", true);
	};
	if(value == "C"){
		cout = 2 * nbEmails;
		$('#cout').html(cout);
		$('#C').addClass('bg-light');
		$('#cTextC').addClass('font-weight-bold');
		$('#duree2').removeAttr("disabled");
		$('#inputcourriel').removeAttr("disabled");
		$('#A').removeClass('bg-light');
		$('#B').removeClass('bg-light');
		$('#cTextA').removeClass('font-weight-bold');
		$('#cTextB').removeClass('font-weight-bold');
		$('#duree').prop("disabled", true);
		$('#montant').prop("disabled", true);
	};
}





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
	    	
				// Changement des attributs :
	  	  $("#home").text(data[0].home);
	  	  $("#bsubmit").text(data[0].bsubmit);
	  	  $("#lpass").text(data[0].lpass);
	  	  $("#forgot").text(data[0].forgot);
	  	  $("#hours").text(data[0].hours);
	  	  $("#requirements").text(data[0].requirements);
	  	  $("#loading").text(data[0].loading);
	  	  $("#dimensions").text(data[0].dimensions);
	  	  $("#getquote").text(data[0].search);
	  	  $("#logintitle").text(data[0].logintitle);
	  	  $("#refrigerated").text(data[0].refrigerated);
	  	  $("#cmev").text(data[0].cmev);
	  	  $("#cTextA").text(data[0].cTextA);
	  	  $("#cTextB").text(data[0].cTextB);
	  	  $("#cTextC").text(data[0].cTextC);
	  	  $("#cCout").text(data[0].cCout);
	  	  $("#cterms").text(data[0].cCout);

	  	  // Changement des placeholder :
	  	  $("#origin").attr('placeholder', data[0].origin);
	  	  $("#destination").attr('placeholder', data[0].destination);
	  	  $("#longueur").attr('placeholder', data[0].longueur);
	  	  $("#quantity").attr('placeholder', data[0].quantity);
	  	  $("#weight").attr('placeholder', data[0].weight);
	  	  $("#time").attr('placeholder', data[0].time);
	  	  $("#value").attr('placeholder', data[0].value);
	  	  $("#password").attr('placeholder', data[0].password);
	  	  $("width").attr('placeholder', data[0].width);
	  	  $("height").attr('placeholder', data[0].height);
	  	  $("duree").attr('placeholder', data[0].duree);
	  	  $("#montant").attr('placeholder', data[0].montant);
	  	  $("duree2").attr('placeholder', data[0].duree2);
	  	  
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
				})
	    },
	    error:function(xhr, ajaxOptions, thrownError){
	  	  console.log('error');
	      console.log(thrownError);
	    }
	  })
	})
});



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