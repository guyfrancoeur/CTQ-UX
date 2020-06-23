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
  $('#m_d_map').load('./m.d.map.html');
  
  // Toasts Bootstrap (nombre camions disponibles)
  $(".div-item").hide();
});

// Toggle button
unite = 'm';
$("#button-6").click(function() {
  console.log("here");
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
    $(checkboxB).prop('checked',false);
    $(checkboxC).prop('checked',false);
    $("#cmontant").removeClass("is-invalid");
    $("#cmontant").removeClass("is-valid"); 
    $("#cdureeC").removeClass("is-invalid");
    $("#cdureeC").removeClass("is-valid");
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
    $("#cdureeC").removeClass("is-invalid");
    $("#cdureeC").removeClass("is-valid");
    $("#cdureeA").removeClass("is-invalid");
    $("#cdureeA").removeClass("is-valid"); 
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
    $("#cmontant").removeClass("is-invalid");
    $("#cmontant").removeClass("is-valid"); 
    $("#cdureeA").removeClass("is-invalid");
    $("#cdureeA").removeClass("is-valid"); 
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
var nbCamionsDispo = 20;
var ancien = 0;
// [length,width,height,weight,value,requirements]
// Déclencher la fonction quand au moins 1 caractère est entré
$(".champRempli").on("keyup", function() {
  champRempli($(this));
});
function champRempli(elem){
  // Affichage des camions disponibles : toast Bootstrap
  $('#toast1').toast('show');
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
  var nouveau = Math.round((nbChampsRemplis/6)*nbCamionsDispo);
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
      $("#cnbinfo").html(nbChampsRemplis);
      $("#infos").show();
      $("#info").hide();
      $("#crest").show();
      $("#cNbreduction").html(reduction);
      $("#dollar").show();
      $("#cents").hide();
    }
    else{
      if(nbChampsRemplis == 1){
        $("#cwith").show();
        $("#cnbinfo").html(nbChampsRemplis);
        $("#info").show();
        $("#infos").hide();
        $("#crest").show();
        $("#cNbreduction").html(reduction);
        $("#dollar").hide();
        $("#cents").show();
      }
      else{
        $("#cwith").show();
        $("#cnbinfo").html(nbChampsRemplis);
        $("#infos").show();
        $("#info").hide();
        $("#crest").show();
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
    $("#cinvalidMarket").text("");
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