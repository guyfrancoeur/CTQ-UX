$(document).ready(function() {
  $('#m_c').load('./m.c.html');
  $('#m_t').load('./m.t.html');
  $('#m_e').load('./m.e.html');
  $('#m_te').load('./m.te.html');
  $('#m_v').load('./m.v.html');
  $('#m_t_map').load('./m.t.map.html');
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  $('.selectpicker').selectpicker();
  
  // Cacher bouton validation (modification profile)
  $("#bvalidprofil").hide();
  $("#bcancelprofil").hide();

    //Cacher boutons validations (modale ajout équipement)
  $(".bV").hide();
  $(".bX").hide();
});

// Bouton trash (suppression ligne)
$('.btrash').click(function() {
  $('#m_v').modal('show');
  validationSuppression($(this).closest("tr"));
});

var mode_save_button_camion;
// Récupérer les valeurs de la ligne quand on clique sur le crayon
var current_col;
$('.bset').click(function() {
  mode_save_button_camion = "set";
  current_col = $(this).closest("tr");
  var desctiption = $(current_col).find("td").eq(0).find("button").attr('data-original-title');
  var tracteur = $(current_col).find("td").eq(1).html();
  var equipement = $(current_col).find("td").eq(2).html();
  $('#cdescription').val(desctiption).change();
  $('#cselecttracteur').val(tracteur).change();
  $('#cselectequipement').val(equipement).change();
});

// Bouton ajout camion, réinitialiser la sélection (dropdown)
$('#bajoutcamion').click(function() {
  mode_save_button_camion = "add";
  $('#cdescription').focus();
  $("#cselecttracteur").val("").change();
  $("#cselectequipement").val("").change();
});

// Ajout/modification camion
function camionEvent() {
  switch (mode_save_button_camion) {
    case "set":
      $(current_col).find("td").eq(0).find("button").attr('data-original-title', $('#cdescription').val());
      $(current_col).find("td").eq(1).html($('#cselecttracteur').val());
      $(current_col).find("td").eq(2).html($('#cselectequipement').val());
      break;

    case "add":
      var choix_description = $('#cdescription').val();
      var choix_tracteur = $('#cselecttracteur').val();
      var choix_equipement = $('#cselectequipement').val();
      var dernierCheckbox1 = $(".checkbox").eq($(".checkbox").length - 1).attr("id");
      var dernierCheckbox2 = dernierCheckbox1.substr(8,dernierCheckbox1.length);
      var html = '<tr>' +
        '<td scope="row">' +
          '<div class="row ml-auto">' +
            '<div class="custom-control custom-checkbox">' +
              '<input type="checkbox" class="custom-control-input checkbox" id="checkbox'+ (dernierCheckbox2+1) +'">' +
              '<label class="custom-control-label" for="checkbox'+ (dernierCheckbox2+1) +'"></label>' +
            '</div>' +
            '<button type="button" class="btn p-0 binfo" data-toggle="tooltip" data-placement="left" title="' + choix_description + '" data-trigger="focus"><i class="fas fa-info-circle color-icon"></i></button>' +
          '</div>' +
        '</td>' +
        '<td>' + choix_tracteur + '</td>' +
        '<td>' + choix_equipement + '</td>' +
        '<td><input type="text" class="form-control form-control-sm m-auto cpostalcode"></td>' +
        '<th scope="row" class="text-right">' +
          '<button type="button" class="btn p-0 bset" data-toggle="modal" data-target="#m_c"><i class="fas fa-pencil-alt color-icon"></i></button>' +
          '<button type="button" class="btn p-0 btrash"><i class="fas fa-trash color-icon"></i></button>' +
        '</th></tr>';
        $('#tableCamions > tbody:last-child').append(html);
        break;
    }
    $('#m_c').modal('hide');
    $('[data-toggle="tooltip"]').tooltip(); // Rendre fonctionnel le tooltip qui vient d'être ajouté
}

// Validation formulaire modale camion
$('#m_c').on('shown.bs.modal', function() {
  $('#cdescription').focus();
  $('.selectpicker').selectpicker();
  $("#bsavecamion").click(function(e) {
    if (!$("#formCamion")[0].checkValidity()) {
      $("#formCamion").find("#submit-hiddenC").click();
    }
    else{
      camionEvent();
    }
  });
});

// Modification profil
$('#bsetprofil').click(function() {
  $("#bsetprofil").hide();
  $("#divadresse2").removeClass("pl-2");
  $("#divadresse2").addClass("pl-4");
  $("#cnomEntreprise").prop('contenteditable', true);
  placeCaretAtEnd(document.querySelector('#cnomEntreprise'));
  $("#cadresse1").prop('contenteditable', true);
  $("#cadresse2").prop('contenteditable', true);
  $("#cvaleurProfit").prop('contenteditable', true);
  $("#divadresse").addClass("editeffect");
  $("#cnomEntreprise").addClass("setprofile");
  $("#cadresse1").addClass("setprofile");
  $("#cadresse2").addClass("setprofile");
  $("#cvaleurProfit").addClass("setprofile");
  $("#bvalidprofil").show();
  $("#bcancelprofil").show();
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
  $("#bvalidprofil").hide();
  $("#bcancelprofil").hide();
  $("#cnomEntreprise").removeClass("setprofile");
  $("#cadresse1").removeClass("setprofile");
  $("#cadresse2").removeClass("setprofile");
  $("#cvaleurProfit").removeClass("setprofile");
  $("#divadresse").removeClass("editeffect");
  $("#cnomEntreprise").prop('contenteditable', false);
  $("#cadresse1").prop('contenteditable', false);
  $("#cadresse2").prop('contenteditable', false);
  $("#cvaleurProfit").prop('contenteditable', false);
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
  $("#cMessageEditEquipement").hide();
  $("#cMessageAddEquipement").hide();
  $("#cMessageDeleteEquipement").show(0).delay(10000).hide(0); 
}
function messageSupprTracteur() {
  $("#cMessageEditTracteur").hide();
  $("#cMessageAddTracteur").hide();
  $("#cMessageDeleteTracteur").show(0).delay(10000).hide(0);
}
function messageSupprTE() {
  $("#cMessageEditTE").hide();
  $("#cMessageAddTE").hide();
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