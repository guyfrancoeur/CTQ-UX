// ceci est la meme chose en plus court $(function () {  ... }
$( document ).ready(function() { // ou $(function () { 
  console.log("doc is ready!");
  $.fn.selectpicker.Constructor.BootstrapVersion = '4'; //fix selectpicker
  $('.selectpicker').selectpicker();
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
});

// Toogle button
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

// Validation courriel
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

// Ajout courriel
var addcourriel = document.getElementById("addcourriel");
var inputcourriel = document.getElementById("inputcourriel");
var ul = document.getElementById("listecourriels");
nbEmails = 0;

$("#addcourriel").click(function() {
	var tabsplit = ($("#inputcourriel").val()).split(';');
	tabsplit.forEach(function(element){
		if (validateEmail(element)){
		 	var li = document.createElement("li");
		 	li.id = "li" + nbEmails;
		  li.className = 'list-group-item';
		  li.className = 'd-flex';
		  li.className = 'justify-content-between';
		  li.className = 'align-items-center';
		  li.textContent = element +";";
		  ul.appendChild(li);
		  $("#inputcourriel").val("");
		  li.innerHTML += "<button type='button' class='close' aria-label='Close'><span id="+nbEmails+" class='cross' aria-hidden='true' onclick='removeItem(this)'>&times;</span></button>";
		  nbEmails ++;
		}
	});
});

// Suppression courriel
function removeItem(elem){
  console.log("fonctionne");
  console.log(elem.id);
  var val = "li" + elem.id;
  document.getElementById(val).remove();
}

// Mise en vente
var cout = 0;
function selection(elem){
	var value = elem.id;
	if(value == "A"){
		cout = 1;
		$('#cout').html(cout);
		$('#A').addClass('bg-light');
		$('#cTextA').addClass('font-weight-bold');
		$('#cdureeA').removeAttr("disabled");
		$('#B').removeClass('bg-light');
		$('#C').removeClass('bg-light');
		$('#cTextB').removeClass('font-weight-bold');
		$('#cTextC').removeClass('font-weight-bold');
		$('#cmontant').prop("disabled", true);
		$('#cdureeC').prop("disabled", true);
		$('#inputcourriel').prop("disabled", true);
	};
	if(value == "B"){
		cout = 2;
		$('#cout').html(cout);
		$('#B').addClass('bg-light');
		$('#cTextB').addClass('font-weight-bold');
		$('#cmontant').removeAttr("disabled");
		$('#A').removeClass('bg-light');
		$('#C').removeClass('bg-light');
		$('#cTextA').removeClass('font-weight-bold');
		$('#cTextC').removeClass('font-weight-bold');
		$('#cdureeA').prop("disabled", true);
		$('#cdureeC').prop("disabled", true);
		$('#inputcourriel').prop("disabled", true);
	};
	if(value == "C"){
		cout = 2 * nbEmails;
		$('#cout').html(cout);
		$('#C').addClass('bg-light');
		$('#cTextC').addClass('font-weight-bold');
		$('#cdureeC').removeAttr("disabled");
		$('#inputcourriel').removeAttr("disabled");
		$('#A').removeClass('bg-light');
		$('#B').removeClass('bg-light');
		$('#cTextA').removeClass('font-weight-bold');
		$('#cTextB').removeClass('font-weight-bold');
		$('#cdureeA').prop("disabled", true);
		$('#cmontant').prop("disabled", true);
	};
}

// Espace résultats
// ici
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
	$('#buttonend').addClass('pb-3');
	$('#divOrigin').removeClass('pr-xl-3');
	$('#divDestination').removeClass('pr-xl-3');
	document.getElementById("contenu").innerHTML = "<h3>Results</h3>";
}

// Validation formulaire
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

// Réduction
var tabChampsRemplis = [false,false,false,false,false,false]
// [length,width,height,weight,value,requirements]
function champRempli(elem){
	nbChampsRemplis = 0;
	if(($(elem).val() == "") || ($(elem).val() == [])){
		if($(elem).attr("id") == "clongueur") tabChampsRemplis[0] = false;
		if($(elem).attr("id") == "cwidth") tabChampsRemplis[1] = false;
		if($(elem).attr("id") == "cheight") tabChampsRemplis[2] = false;
		if($(elem).attr("id") == "cweight") tabChampsRemplis[3] = false;
		if($(elem).attr("id") == "cvalue") tabChampsRemplis[4] = false;
		if($(elem).attr("id") == "crequirements") tabChampsRemplis[5] = false;
	}
	else{
		if($(elem).attr("id") == "clongueur") tabChampsRemplis[0] = true;
		if($(elem).attr("id") == "cwidth") tabChampsRemplis[1] = true;
		if($(elem).attr("id") == "cheight") tabChampsRemplis[2] = true;
		if($(elem).attr("id") == "cweight") tabChampsRemplis[3] = true;
		if($(elem).attr("id") == "cvalue") tabChampsRemplis[4] = true;
		if($(elem).attr("id") == "crequirements") tabChampsRemplis[5] = true;
		
	}
	for(var i in tabChampsRemplis){
		if(tabChampsRemplis[i] == true) {
			nbChampsRemplis ++;
		}
	}
	reduction = nbChampsRemplis * 0.25;
	if(nbChampsRemplis == 0){
		$("#creduction").text("");
		return;
	}
	if(reduction >= 1){
		$("#creduction").text("- " + reduction + " $");
	}
	else{
		$("#creduction").text("- " + reduction + " cents");
	}
	
}