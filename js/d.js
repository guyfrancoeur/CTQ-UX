// ceci est la meme chose en plus court $(function () {  ... }
$( document ).ready(function() { // ou $(function () { 
  console.log("doc is ready!");
  $.fn.selectpicker.Constructor.BootstrapVersion = '4'; //fix selectpicker
  $('.selectpicker').selectpicker();
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
});

// Toggle button
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
      li.textContent = element;
      ul.appendChild(li);
      $("#inputcourriel").val("");
      li.innerHTML += "<button type='button' class='close' aria-label='Close'><span id="+nbEmails+" class='cross' aria-hidden='true' onclick='removeItem(this)'>&times;</span></button>";
      nbEmails ++;
    }
  });
});

// Suppression courriel
function removeItem(elem){
  var val = "li" + elem.id;
  document.getElementById(val).remove();
  nbEmails --;
}

// Mise en vente
var cout = 0;
function selection(elem){
  var value = elem.id;
  if(value == "A"){
    cout = (1 - reduction).toFixed(2);
    $('#cout').html(cout);
    $('#A').addClass('chosen');
    $('#A').addClass('clicked');
    $('#A').removeClass('notchosen');
    $('#cTextA').addClass('font-weight-bold');
    $('#cdureeA').removeAttr("disabled");
    $('#B').removeClass('chosen');
    $('#C').removeClass('chosen');
    $('#B').addClass('notchosen');
    $('#C').addClass('notchosen');
    $('#B').removeClass('clicked');
    $('#C').removeClass('clicked');
    $('#cTextB').removeClass('font-weight-bold');
    $('#cTextC').removeClass('font-weight-bold');
    $('#cmontant').prop("disabled", true);
    $('#cdureeC').prop("disabled", true);
    $('#inputcourriel').prop("disabled", true);
  };
  if(value == "B"){
    cout = (2 - reduction).toFixed(2);
    $('#cout').html(cout);
    $('#B').addClass('chosen');
    $('#B').addClass('clicked');
    $('#B').removeClass('notchosen');
    $('#cTextB').addClass('font-weight-bold');
    $('#cmontant').removeAttr("disabled");
    $('#A').removeClass('chosen');
    $('#C').removeClass('chosen');
    $('#A').addClass('notchosen');
    $('#C').addClass('notchosen');
    $('#A').removeClass('clicked');
    $('#C').removeClass('clicked');
    $('#cTextA').removeClass('font-weight-bold');
    $('#cTextC').removeClass('font-weight-bold');
    $('#cdureeA').prop("disabled", true);
    $('#cdureeC').prop("disabled", true);
    $('#inputcourriel').prop("disabled", true);
  };
  if(value == "C"){
  	if(nbEmails != 0) cout = ((2 * nbEmails) - reduction).toFixed(2);
  	else{cout = 0;}
    $('#cout').html(cout);
    $('#C').addClass('chosen');
    $('#C').removeClass('notchosen');
    $('#C').addClass('clicked');
    $('#cTextC').addClass('font-weight-bold');
    $('#cdureeC').removeAttr("disabled");
    $('#inputcourriel').removeAttr("disabled");
    $('#A').removeClass('chosen');
    $('#B').removeClass('chosen');
    $('#A').removeClass('clicked');
    $('#B').removeClass('clicked');
    $('#A').addClass('notchosen');
    $('#B').addClass('notchosen');
    $('#cTextA').removeClass('font-weight-bold');
    $('#cTextB').removeClass('font-weight-bold');
    $('#cdureeA').prop("disabled", true);
    $('#cmontant').prop("disabled", true);
  };
}

// Réduction
var tabChampsRemplis = [false,false,false,false,false,false]
var reduction = 0;
var ancienneReduction = 0;
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
    if(tabChampsRemplis[i] == true) nbChampsRemplis ++;
  }
  reduction = (nbChampsRemplis * 0.1).toFixed(2);
  console.log(tabChampsRemplis);
  if(nbChampsRemplis == 0){
    $("#creduction").text("");
    $("#textreduction").text("");
    if (cout != 0){
  	  cout = (parseFloat(cout) + 0.1);
      $('#cout').html(cout.toFixed(2));
    }
  }
  else{
    if(reduction >= 1){
  	  $("#textreduction").text("With "+ nbChampsRemplis + " infos about the cargo you can save : ");
      $("#creduction").text(reduction + " $");
    }
    else{
  	  if(nbChampsRemplis == 1){
    	  $("#textreduction").text("With "+ nbChampsRemplis + " info about the cargo you can save : ");
        $("#creduction").text(reduction + " cents");
      }
      else{
  	    $("#textreduction").text("With "+ nbChampsRemplis + " infos about the cargo you can save : ");
        $("#creduction").text(reduction + " cents");
      }
    }
    if(reduction > ancienneReduction){
      animationReduction();
      ifCoutIsSet();
    }
    if(reduction < ancienneReduction){
    	ifCoutIsSet2();
    }
  }
  ancienneReduction = reduction;
}

function ifCoutIsSet(){
  if (cout != 0){
  	cout = (parseFloat(cout) - 0.10).toFixed(2);
    $('#cout').html(cout);
  }
}

function ifCoutIsSet2(){
  if (cout != 0){
  	cout = (parseFloat(cout) + 0.10).toFixed(2);
    $('#cout').html(cout);
  }
}

// Lance l'animation pour la réduction
function animationReduction() {
  $("#creduction").addClass("animationcout");
  $(".animationcout").css("-webkit-animation-play-state", "running");
  $('.animationcout').on("animationend", function(){
    setTimeout(function() { 
      $("#creduction").removeClass("animationcout");
    }, 1000);
  });
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
	
  $("#bcloseResults").show();
}
  
// Suppression Espace Résultats
$("#bcloseResults").click(function() {
  $('#container').addClass('col-md-10 ');
  $('#div1').removeClass('row');
  $('#div2').removeClass('col-12');
  $('#div2').removeClass('col-xl-6');
  $('#div3').removeClass('bloc');
  $('#div3').removeClass('second-bloc');
  $('#div13').removeClass('resizebloc');
  $('#div4').removeClass('interieur');
  $('#div5').removeClass('col-12');
  $('#div5').removeClass('col-xl-6');
  $('#div6').removeClass('pb-3');
  $('#div6').addClass('pr-0');
  $('#div6').addClass('col-xl-5');
  $('#div6').removeClass('col-12');
  $('#div7').removeClass('pb-5');
  $('#div7').addClass('col-xl-7');
  $('#div8').addClass('row');
  $('#div8').removeClass('pr-4');
  $('#div8').removeClass('pl-0');
  $('#div8').addClass('mx-0');
  $('#div9').removeClass('pl-0');
  $('#div10').addClass('pr-xl-3');
  $('#div11').removeClass('px-0');
  $('#div12').removeClass('px-0');
  $('#div13').removeClass('resizing');
  $('#div14').removeClass('add2');
  $('.resizechamp').addClass('col-md-4');
  $('.resizechamp').addClass('col-8');
  $('.resizechamp').removeClass('col-md-6');
  $('.resizechamp3').addClass('px-3');
  $('.resizechamp3').removeClass('pl-0');
  $('#cTextA').addClass('col-md-2');
  $('#cTextB').addClass('col-md-2');
  $('#cTextC').addClass('col-md-2');
  $('#cTextA').removeClass('col-md-3');
  $('#cTextB').removeClass('col-md-3');
  $('#cTextC').removeClass('col-md-3');
  $('#buttonend').removeClass('pb-3');
  $('#divOrigin').addClass('pr-xl-3');
  $('#divDestination').addClass('pr-xl-3');
  document.getElementById("contenu").innerHTML = "";
	
  $("#bcloseResults").hide();
});

// Tooltip on ToggleButton
$("#cheight").focus(function() {
  $("#tToggleinstruction").tooltip('show');
});
$("#cwidth").focus(function() {
  $("#tToggleinstruction").tooltip('show');
});
$("#clongueur").focus(function() {
  $("#tToggleinstruction").tooltip('show');
});

$("#cheight").focusout(function() {
  $("#tToggleinstruction").tooltip('hide');
});
$("#cwidth").focusout(function() {
  $("#tToggleinstruction").tooltip('hide');
});
$("#clongueur").focusout(function() {
  $("#tToggleinstruction").tooltip('hide');
});