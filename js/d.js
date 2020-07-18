// ceci est la meme chose en plus court $(function () {  ... }
$( document ).ready(function() { // ou $(function () { 
  console.log("doc is ready!");
  $.fn.selectpicker.Constructor.BootstrapVersion = '4'; //fix selectpicker
  $('.selectpicker').selectpicker();
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  
  // Chargement contenu modale
  $('#m_courriels').load('./m.courriels.html');
  $('#m_d_map').load('./m.d.map.html');
});

// Toggle button
unite = 'm';
$("#button-6").click(function() {
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
nbEmails = 0;
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
  $('#m_d3').modal('hide');
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
    $(checkboxB,checkboxC).prop('checked',false);
    $("#cinvalidMarket").hide();
    $("#cmontant, #cdureeC").removeClass("is-invalid");
    $("#cmontant, #cdureeC").removeClass("is-valid");
    $("#cmontant, #cdureeC").val("");
    $('#cout').html(cout);
    $('#A').addClass('chosen');
    $('#A').addClass('clicked');
    $('#A').removeClass('notchosen');
    $('#ctextA').addClass('font-weight-bold');
    $('#cdureeA').removeAttr("disabled");
    $('#cmontant').css("cursor", "text");
    $('#B,#C').removeClass('chosen');
    $('#B,#C').addClass('notchosen');
    $('#B,#C').removeClass('clicked');
    $('#ctextB,#ctextC').removeClass('font-weight-bold');
    $('#cmontant,#addcourriel,#cdureeC').prop("disabled", true);
    $('#cmontant,#addcourriel,#cdureeC').css("cursor", "pointer");
  };
  if(value == "B"){
    cout = (2 - reduction).toFixed(2);
    $(checkboxB).prop('checked',true);
    $(checkboxA,checkboxC).prop('checked',false);
    $("#cinvalidMarket").hide();
    $("#cdureeA, #cdureeC").removeClass("is-invalid");
    $("#cdureeA, #cdureeC").removeClass("is-valid"); 
    $("#cdureeA, #cdureeC").val("");
    $('#cout').html(cout);
    $('#B').addClass('chosen');
    $('#B').addClass('clicked');
    $('#B').removeClass('notchosen');
    $('#ctextB').addClass('font-weight-bold');
    $('#cmontant').removeAttr("disabled");
    $('#cmontant').css("cursor", "text");
    $('#A,#C').removeClass('chosen');
    $('#A,#C').addClass('notchosen');
    $('#A,#C').removeClass('clicked');
    $('#ctextA,#ctextC').removeClass('font-weight-bold');
    $('#cdureeA,#cdureeC,#addcourriel').prop("disabled", true);
    $('#cdureeA,#cdureeC,#addcourriel').css("cursor", "pointer");
  };
  if(value == "C"){
    if(nbEmails != 0) cout = ((2 * nbEmails) - reduction).toFixed(2);
    else{cout = 0;}
    $(checkboxC).prop('checked',true);
    $(checkboxA,checkboxB).prop('checked',false);
    $("#cinvalidMarket").hide();
    $("#cdureeA, #cmontant").removeClass("is-invalid");
    $("#cdureeA, #cmontant").removeClass("is-valid");
    $("#cdureeA, #cmontant").val("");
    $('#cout').html(cout);
    $('#C').addClass('chosen');
    $('#C').removeClass('notchosen');
    $('#C').addClass('clicked');
    $('#ctextC').addClass('font-weight-bold');
    $('#cdureeC').removeAttr("disabled");
    $('#addcourriel').removeAttr("disabled");
    $('#cdureeC').css("cursor", "text");
    $('#A,#B').removeClass('chosen');
    $('#A,#B').removeClass('clicked');
    $('#A,#B').addClass('notchosen');
    $('#ctextA,#ctextB').removeClass('font-weight-bold');
    $('#cdureeA,#cmontant').prop("disabled", true);
    $('#cdureeA,#cmontant,#addcourriel').css("cursor", "pointer");
  };
}

// Réduction
var tabChampsRemplis = [false,false,false,false,false,false]
var reduction = 0;
var ancienneReduction = 0;
var nbCamionsDispo = 10;
var ancien = 0;
// [length,width,height,weight,value,requirements]
// Déclencher la fonction quand au moins 1 caractère est entré
$(".champRempli").on("keyup", function() {
  champRempli($(this));
});
function champRempli(elem){
  // Affichage modale camions disponibles si origine et destination entrée sont valides (toast Bootstrap)
  nbChampsRemplis = 0;
  if(($(elem).val() == "") || ($(elem).val() == [])){
    $(elem).removeClass("is-valid");
    if($(elem).attr("id") == "clongueur") tabChampsRemplis[0] = false;
    if($(elem).attr("id") == "cwidth") tabChampsRemplis[1] = false;
    if($(elem).attr("id") == "cheight") tabChampsRemplis[2] = false;
    if($(elem).attr("id") == "cweight") tabChampsRemplis[3] = false;
    if($(elem).attr("id") == "cvalue") tabChampsRemplis[4] = false;
    if($(elem).attr("id") == "crequirements") tabChampsRemplis[5] = false;
  }
  else{
    $(elem).addClass("is-valid");
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
  // Changmenet du nb de camions disponibles en fonction du nb de champs remplis
  if (nbChampsRemplis == 0) var nouveau = Math.round(nbCamionsDispo/7); // Si aucun champs n'est rempli, on affiche quand même un minimum de camions disponibles
  else {var nouveau = Math.round((nbChampsRemplis/6)*nbCamionsDispo)}
  if(nouveau != ancien){
    $("#nbcamions").html(nouveau);
    animationNbCamions();
  }
  ancien = nouveau;

  reduction = (nbChampsRemplis * 0.1).toFixed(2);
  if(nbChampsRemplis == 0){
    $("#cwith").hide();
    $("#cnbinfo").hide();
    $("#cwith").hide();
    $("#cNbreduction").hide();
    $("#dollar").hide();
    $("#cents").hide();
    $("#cents").hide();
    $("#infos").hide();
    $("#info").hide();
    $("#crest").hide();
    if (cout != 0){
      cout = (parseFloat(cout) + 0.1);
      $('#cout').html(cout.toFixed(2));
    }
  }
  else{
    if(reduction > 1){
      $("#cwith").show();
      $("#cnbinfo").show();
      $("#cnbinfo").html(nbChampsRemplis);
      $("#infos").show();
      $("#info").hide();
      $("#crest").show();
      $("#cNbreduction").show();
      $("#cNbreduction").html(reduction);
      $("#dollar").show();
      $("#cents").hide();
    }
    else{
      if(nbChampsRemplis == 1){
        $("#cwith").show();
        $("#cnbinfo").show();
        $("#cnbinfo").html(nbChampsRemplis);
        $("#info").show();
        $("#infos").hide();
        $("#crest").show();
        $("#cNbreduction").show();
        $("#cNbreduction").html(reduction);
        $("#dollar").hide();
        $("#cents").show();
      }
      else{
        $("#cwith").show();
        $("#cnbinfo").show();
        $("#cnbinfo").html(nbChampsRemplis);
        $("#infos").show();
        $("#info").hide();
        $("#crest").show();
        $("#cNbreduction").show();
        $("#cNbreduction").html(reduction);
        $("#dollar").hide();
        $("#cents").show();
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

// Animation changmenet nb camions dispo
function animationNbCamions() {
  $("#nbcamions").addClass("animationnbcamions");
  $(".animationnbcamions").css("-webkit-animation-play-state", "running");
  $('.animationnbcamions').on("animationend", function(){
    setTimeout(function() { 
      $("#nbcamions").removeClass("animationnbcamions");
    }, 700);
  });
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
  $("#htoggleinstruction").tooltip('show');
});
$("#cwidth").focus(function() {
  $("#htoggleinstruction").tooltip('show');
});
$("#clongueur").focus(function() {
  $("#htoggleinstruction").tooltip('show');
});

$("#cheight").focusout(function() {
  $("#htoggleinstruction").tooltip('hide');
});
$("#cwidth").focusout(function() {
  $("#htoggleinstruction").tooltip('hide');
});
$("#clongueur").focusout(function() {
  $("#htoggleinstruction").tooltip('hide');
});

// Validation formulaire
$("#principalform").submit(function(event){
  if (countChecked() >= 1){
    $("#cinvalidMarket").hide();
    switch ($(".groupcheckbox:checked").attr("id")){
      case ("checkboxA"):
        if ($("#cdureeA").val() == ""){
          $("#cdureeA").addClass("is-invalid");
          event.preventDefault();
        }else{console.log("submitted !");};
        break;
      case ("checkboxB"):
        if ($("#cmontant").val() == ""){
          $("#cmontant").addClass("is-invalid");
          event.preventDefault();
        }else{console.log("submitted !");};
        break;
      case ("checkboxC"):
        if ($("#cdureeC").val() == ""){
          $("#cdureeC").addClass("is-invalid");  
          event.preventDefault();
        }else{console.log("submitted !");};
        break;
    }
    if($("#corigin").val() == "") $("#corigin").addClass("is-invalid");
    if($("#cdestination").val() == "") $("#cdestination").addClass("is-invalid");
  }else{
    // empêche le questionnaire de s'envoyer
    event.preventDefault();
    $("#cinvalidMarket").show();
    console.log("formulaire invalide");
    if($("#corigin").val() == "") $("#corigin").addClass("is-invalid");
    if($("#cdestination").val() == "") $("#cdestination").addClass("is-invalid");
  }
});  
function countChecked(){
  var checked = $(".groupcheckbox:checked");
  return checked.length;
}

// Désactiver le bouton dans le toast Bootstrap quand il est caché (nb camions dispo)
$('#toast1').on('hidden.bs.toast', function () {
  $('#bmapD').prop("disabled", true);
  $('#closeToast').prop("disabled", true);
});
$('#toast1').on('show.bs.toast', function () {
  $('#bmapD').prop("disabled", false);
  $('#closeToast').prop("disabled", false);
});