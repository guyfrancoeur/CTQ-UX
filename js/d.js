// ceci est la meme chose en plus court $(function () {  ... }
$( document ).ready(function() { 
  console.log( "ready!" );
  $('.selectpicker').selectpicker();
});

/* ********* Toogle Button ********* */
unite = 'm';
$(".toggle-button-cover").click(function() {
	if(unite == "m"){
		$('.cUnite').html("pi");
		unite = "pi";
	}
	else{
		$('.cUnite').html("m");
		unite = "m";
	}
});

/* ********* Aide (popover) ********* */
$(function () {
  $('[data-toggle="popover"]').popover()
});

/* ********* Requirements ********* */
var ul2 = document.getElementById("listrequirements");
$("option").click(function() {
	if($(this).hasClass("choosen")){
		$(this).removeClass("bg-primary");
		$(this).removeClass("choosen");
		var id = "#" + $(this).val();
		$(id).remove();
	}
	else{
		$(this).addClass("bg-primary");
		$(this).addClass("choosen");
	
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
	}
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

$("#addcourriel").click(function() {
	var tabsplit = ($("#inputcourriel").val()).split(';');
	tabsplit.forEach(function(element){
		if (validateEmail(element)){
			nbEmails ++;
		 	var li = document.createElement("li");
		  li.className = 'list-group-item';
		  li.className = 'd-flex';
		  li.className = 'justify-content-between';
		  li.className = 'align-items-center';
		  li.textContent = element +";";
		  ul.appendChild(li);
		  $("#inputcourriel").val("");
		  li.innerHTML += "<button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
		}
	});
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

/* ********* Espace résultats ********* */
function modify(){
	$('#container').removeClass('col-md-10 ');
	$('#div1').addClass('row');
	$('#div2').addClass('col-12');
	$('#div2').addClass('col-xl-6');
	$('#div3').addClass('bloc');
	$('#div3').addClass('second-bloc');
	$('#div13').addClass('resizebloc');
	$('#div4').addClass('interieur');
	$('#div5').addClass('col-12');
	$('#div5').addClass('col-xl-6');
	$('#div6').addClass('pb-3');
	$('#div6').removeClass('pr-0');
	$('#div6').removeClass('col-xl-5');
	$('#div6').addClass('col-12');
	$('#div7').addClass('pb-5');
	$('#div7').removeClass('col-xl-7');
	$('#div8').removeClass('row');
	$('#div8').addClass('pr-4');
	$('#div8').addClass('pl-0');
	$('#div8').removeClass('mx-0');
	$('#div9').addClass('pl-0');
	$('#div10').removeClass('pr-xl-3');
	$('#div11').addClass('px-0');
	$('#div12').addClass('px-0');
	$('#div13').addClass('resizing');
	$('#div14').addClass('add2');
	$('.resizechamp').removeClass('col-md-4');
	$('.resizechamp').removeClass('col-8');
	$('.resizechamp').addClass('col-md-6');
	$('.resizechamp3').removeClass('px-3');
	$('.resizechamp3').addClass('pl-0');
	$('#cTextA').removeClass('col-md-2');
	$('#cTextB').removeClass('col-md-2');
	$('#cTextC').removeClass('col-md-2');
	$('#cTextA').addClass('col-md-3');
	$('#cTextB').addClass('col-md-3');
	$('#cTextC').addClass('col-md-3');
	$('.resizechamp2').removeClass('col-md-6');
	$('.resizechamp2').removeClass('col-4');
	$('.resizechamp2').addClass('col-md-3');
	$('#buttonend').addClass('pb-3');
	$('#divOrigin').removeClass('pr-xl-3');
	$('#divDestination').removeClass('pr-xl-3');
	
	divDestination
	document.getElementById("contenu").innerHTML = "<h3>Results</h3>";
}

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
