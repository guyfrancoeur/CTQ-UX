$(document).ready(function() {
  $('#m_c').load('./m.c.html');
  $('#m_t').load('./m.t.html');
  $('#m_e').load('./m.e.html');
  $('#m_te').load('./m.te.html');
  $('#m_v').load('./m.v.html');
  $('#m_t_map').load('./m.t.map.html');
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
 
    //Cacher boutons validations (modale ajout équipement & modification profile)
  $(".bV, .bX, #bvalidprofil, #bcancelprofil").hide();
});

// Bouton trash (suppression ligne camion)
$('.btrash').click(function() {
  $('#m_v').modal('show');
  validationSuppression($(this).closest("tr"));
});

// Modification profil
$('#bsetprofil').click(function() {
  $("#bsetprofil").hide();
  $("#divadresse2").removeClass("pl-2");
  $("#divadresse2").addClass("pl-4");
  $("#cnomEntreprise, #cadresse1, #cadresse2, #cvaleurProfit").prop('contenteditable', true);
  placeCaretAtEnd(document.querySelector('#cnomEntreprise'));
  $("#divadresse").addClass("editeffect");
  $("#cnomEntreprise, #cadresse1, #cadresse2, #cvaleurProfit").addClass("setprofile");
  $("#bvalidprofil, #bcancelprofil").show();
  var nomEntreprise = $("#cnomEntreprise").html();
  var ad1 = $("#cadresse1").html();
  var ad2 = $("#cadresse2").html();
  var profit = $("#cvaleurProfit").html();

  // Bouton retour (modification profil) = remettre anciennes valeurs
  $('#bcancelprofil').click(function() {
      $("#bsetprofil").show();
      $("#cnomEntreprise").html(nomEntreprise);
      $("#cadresse1").html(ad1);
      $("#cadresse2").html(ad2);
      $("#cvaleurProfit").html(profit);
  });
});

function validerprofil() {
  $("#bsetprofil").show();
  $("#bvalidprofil, #bcancelprofil").hide();
  $("#cnomEntreprise, #cadresse1, #cadresse2, #cvaleurProfit").removeClass("setprofile");
  $("#divadresse").removeClass("editeffect");
  $("#cnomEntreprise, #cadresse1, #cadresse2, #cvaleurProfit").prop('contenteditable', false);
}

// Placer le curseur à la fin dans la partie éditable (profil)
function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

// Superposer plusieurs modales
$(document).on('show.bs.modal', '.modal', function() {
  var zIndex = 1040 + (10 * $('.modal:visible').length);
  $(this).css('z-index', zIndex);
  setTimeout(function() {
    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
  }, 0);
});

// Validation suppression (modale)
function messageSupprEquipement() {
  $("#cMessageEditEquipement, #cMessageAddEquipement").hide();
  $("#cMessageDeleteEquipement").show(0).delay(10000).hide(0); 
}
function messageSupprTracteur() {
  $("#cMessageEditTracteur, #cMessageAddTracteur").hide();
  $("#cMessageDeleteTracteur").show(0).delay(10000).hide(0);
}
function messageSupprTE() {
  $("#cMessageEditTE, #cMessageAddTE").hide();
  $("#cMessageDeleteTE").show(0).delay(10000).hide(0);
}
function validationSuppression(x,obj) {
  $(".bYes").click(function() {
    x.remove();
    $('#m_v').modal('hide');
    if (obj == "tracteur"){
      messageSupprTracteur();
    }
    if (obj == "equipement"){
      messageSupprEquipement();
    }
    if (obj == "TE"){
      messageSupprTE();
    }
  });
  $(".bNo").click(function() {
    $('#m_v').modal('hide');
  });
}

// Si au moins un camion est sélectionné (checkbox), on rend visible le bouton pour la modale qui contient une map
$( ".custom-control-input" ).change(function() {
  if (countCheckedTruck() >= 1){
    if (countCheckedTruck() == 1 && ($(this).is(":checked"))) animationMap();
    $("#bmaptrucker").prop("disabled",false);
  }
  if (countCheckedTruck() == 0){
    $("#bmaptrucker").prop("disabled",true);
  }
});
function countCheckedTruck(){ // Compte le nombre de checkbox sélectionnés
  var checkedTruck = $(".custom-control-input:checked");
  return checkedTruck.length;
}

// Lance l'animation pour le bouton map
function animationMap() {
  $("#bmaptrucker").addClass("animationmap");
  $(".animationmap").css("-webkit-animation-play-state", "running");
  $('.animationmap').on("animationend", function(){
    setTimeout(function() { 
      $("#bmaptrucker").removeClass("animationmap");
    }, 1000);
  });
}

// Select all checkboxes
$("#selectall").click(function () {
  $(".checkbox").prop('checked', $(this).prop('checked'));
  if($("#selectall").is(':checked')) animationMap();
});

// Validation Code Postal camions (input)
$(".cpostalcode").keyup(function() {
  var elt = $(this);
  var result = false;
  var valeurInput = $(elt).val();
  var nbCaracteres = valeurInput.length;
  if (nbCaracteres == 0){
    $(elt).removeClass("is-invalid");
    $(elt).removeClass("is-valid");
  }
 $.ajax({
    url: "./data/zip.json",
    dataType: "json",
    async: false,
    success:function(data){
      $.each(data.geoplaces, function(index, x) {
        if(valeurInput.toUpperCase() === (x.zip).substr(0, nbCaracteres)){
          result = true;
          if (valeurInput.toUpperCase() === (x.zip)){
            $(elt).addClass("is-valid");
          }else{
            $(elt).addClass("is-invalid");
          }
        }
      });
    },
    error:function(xhr, ajaxOptions, thrownError){
      console.log('error');
      console.log(thrownError);
    }
  });
  if(!result) {
    $(elt).addClass("is-invalid");
    $(elt).removeClass("is-valid");
  }
  else {
    $(elt).removeClass("is-invalid");
  }
  return result;
});

// Fonctions communes aux trois modales
$('#m_t, #m_te, #m_e, #m_c').on('shown.bs.modal', function() {
  $('.selectpicker').selectpicker();

  // Couleur tableau liste tracteurs (header)
  $('[data-toggle="collapse"]').click(function() {
    $(this).addClass("headcolor");
    $('[data-toggle="collapse"]').not(this).removeClass("headcolor");
  });
});
