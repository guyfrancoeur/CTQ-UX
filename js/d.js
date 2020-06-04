// ceci est la meme chose en plus court $(function () {  ... }
$( document ).ready(function() { // ou $(function () { 
  console.log("doc is ready!");
  $.fn.selectpicker.Constructor.BootstrapVersion = '4'; //fix selectpicker
  $('.selectpicker').selectpicker();
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  
  // Cacher le bouton close de la partie résultats
  $("#bcloseResults").hide();
  
  // Chargement contenu modale
  $('#m_courriels').load('./m.courriels.html');
  $('#m_results').load('./m.results.html');
  
  // Toasts Bootstrap (nombre camions disponibles)
  $(".div-item").hide();
});

traduire();

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
var inputcourriel = document.getElementById("cinputcourriel");
var ul = document.getElementById("listecourriels");
nbEmails = 0;;
var tabEmails = [];

function saveMails(){
  var tabsplit = ($("#cinputcourriel").val()).split(';');
  tabsplit.forEach(function(element){
    if (validateEmail(element)){
      tabEmails.push(element);
      var li = document.createElement("li");
      li.id = "li" + nbEmails;
      li.className = 'list-group-item';
      li.className = 'd-flex';
      li.className = 'justify-content-between';
      li.className = 'align-items-center';
      li.textContent = element;
      ul.appendChild(li);
      $("#cinputcourriel").val("");
      li.innerHTML += "<button type='button' class='close' aria-label='Close'><span id="+nbEmails+" class='cross' aria-hidden='true' onclick='removeItem(this)'>&times;</span></button>";
      nbEmails ++;
    }
  });
  console.log(tabEmails);
  $('#m_courriels').modal('hide');
}

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
    $(checkboxA).prop('checked',true);
    $(checkboxB).prop('checked',false);
    $(checkboxC).prop('checked',false);
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
    $('#addcourriel').prop("disabled", true);
  };
  if(value == "B"){
    cout = (2 - reduction).toFixed(2);
    $(checkboxB).prop('checked',true);
    $(checkboxA).prop('checked',false);
    $(checkboxC).prop('checked',false);
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
    $('#addcourriel').prop("disabled", true);
  };
  if(value == "C"){
    if(nbEmails != 0) cout = ((2 * nbEmails) - reduction).toFixed(2);
    else{cout = 0;}
    $(checkboxC).prop('checked',true);
    $(checkboxA).prop('checked',false);
    $(checkboxB).prop('checked',false);
    $('#cout').html(cout);
    $('#C').addClass('chosen');
    $('#C').removeClass('notchosen');
    $('#C').addClass('clicked');
    $('#cTextC').addClass('font-weight-bold');
    $('#cdureeC').removeAttr("disabled");
    $('#addcourriel').removeAttr("disabled");
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
  // Affichage des camions disponibles : toast Bootstrap
  $('#toast1').toast('show');
  
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

// Validation formulaire
$("#principalform").submit(function(event){
  if (countChecked() >= 1){
    console.log("submitted !");
    $("#cinvalidMarket").removeClass("alert-danger");
    $("#cinvalidMarket").text("");
  }else{
    // empêche le questionnaire de s'envoyer
    event.preventDefault();
    $("#cinvalidMarket").addClass("alert-danger");
    $("#cinvalidMarket").html("<i class='fas fa-exclamation-circle'></i> Please choose one type of market.");
    console.log("formulaire invalide");
    $('#m_results').modal('hide')
  }
});  
function countChecked(){
  var checked = $(".groupcheckbox:checked");
  return checked.length;
}
