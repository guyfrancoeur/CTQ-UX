$( document ).ready(function() {
  $('#m_camion').load('./m.c.html');
  $('#m_tracteur').load('./m.t.html');
  $('#m_equipement').load('./m.e.html');
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  
  // Cacher bouton validation (modification profile)
  $("#bvalidprofil").hide();
  $("#bcancelprofil").hide();
  
  //Cacher boutons validations (modale ajout équipement)
  $(".bV").hide();
  $(".bX").hide();
});

// Edit location
function editable(x) {
  var text1 = x.prev();
  $(text1).prop('contenteditable',true);
  $(text1).addClass("setprofile");
}
$('.bset-location').click(function() {
  editable($(this));
  $(".cpostalcode").focus();
});
$(".cpostalcode").focusout(function() {
  $(this).prop('contenteditable',false);
  $(this).removeClass("setprofile");
});

// Bouton trash (suppression ligne)
$('.btrash').click(function() {
  $(this).closest( "tr" ).remove();
});

var mode_save_button_camion;
// Récupérer les valeurs de la ligne quand on clique sur le crayon
var current_col;
$('.bset').click(function() {
  mode_save_button_camion = "set";
  current_col = $(this).closest( "tr" );
  var tracteur = $(current_col).find("td").eq(0).html();
  var equipement = $(current_col).find("td").eq(1).html();
  $('#selectTracteur').val(tracteur).change();
  $('#selectEquipement').val(equipement).change();
});

// Bouton ajout camion, réinitialiser la sélection (dropdown)
$('#bajoutcamion').click(function() {
  mode_save_button_camion = "add";
  $("#selectTracteur").val("").change();
  $("#selectEquipement").val("").change();
});

function camionEvent(){
  switch(mode_save_button_camion){
    case "set":
      console.log("set");
      $(current_col).find("td").eq(0).html($('#selectTracteur').val());
      $(current_col).find("td").eq(1).html($('#selectEquipement').val());
      break;
    
    case "add":
      console.log("add");
      var choix_tracteur = $('#selectTracteur').val();
      var choix_equipement = $('#selectEquipement').val();
      $('#tableCamions > tbody:last-child').append('<tr><td>'+ choix_tracteur +'</td><td>'+ choix_equipement +'</td><td><span class="cpostalcode" contenteditable="false">XXX</span> <button type="button" class="bset-location btn p-0"><i class="fas fa-map-marker-alt color-icon"></i></button></td><th scope="row" class="text-right"><button type="button" class="btn p-0 bset" data-toggle="modal" data-target="#m_camion"><i class="fas fa-pencil-alt color-icon"></i></button><button type="button" class="btn p-0 btrash"><i class="fas fa-trash color-icon"></i></button></th></tr>');
      break;
  }
  $('#m_camion').modal('hide');
}

// Modification profil
$('#bsetprofil').click(function() {
  $("#cnomEntreprise").prop('contenteditable',true);
  var value = $("#cnomEntreprise").val();
  $("#cnomEntreprise").focus().val("").val(value);
  $("#nadresse1").prop('contenteditable',true);
  $("#nadresse2").prop('contenteditable',true);
  $("#divadresse").addClass("editeffect");
  $("#cnomEntreprise").addClass("setprofile");
  $("#nadresse1").addClass("setprofile");
  $("#nadresse2").addClass("setprofile");
  
  $("#bvalidprofil").show();
  $("#bcancelprofil").show();
});
function validerprofil(){
  $("#bvalidprofil").hide();
  $("#bcancelprofil").hide();
  $("#cnomEntreprise").removeClass("setprofile");
  $("#nadresse1").removeClass("setprofile");
  $("#nadresse2").removeClass("setprofile");
  $("#divadresse").removeClass("editeffect");
  $("#cnomEntreprise").prop('contenteditable',false);
  $("#nadresse1").prop('contenteditable',false);
  $("#nadresse2").prop('contenteditable',false);
}

// Fonctions qui concernent la modale ajout équipement
$('#m_equipement').on('shown.bs.modal', function() {
  //Cacher boutons validations (modale ajout équipement)
  $(".bV").hide();
  $(".bX").hide();
  
  // Couleur tableau ajout équipement (vert)
  $('.hclass').click(function() {
    $(this).addClass("headcolor");
    $(".hclass").not(this).removeClass("headcolor");
  });
  
  // Boutons modification équipement (crayon)
  $('.bS').click(function() {
    $(this).closest( "div" ).next("div").find(".valuequipement").prop('contenteditable',true);
    $(this).closest("div").next("div").find(".valuequipement").addClass("setprofile");
    $(".bV").show();
    $(".bX").show();
  });
  
  // Bouton validation modification équipement (V)
  $('.bV').click(function() {
    $(this).closest( "div" ).prev("div").find(".valuequipement").prop('contenteditable',false);
    $(this).closest("div").prev("div").find(".valuequipement").removeClass("setprofile");
    $(".bV").hide();
    $(".bX").hide();
  });
  
  // Bouton suppression équipement (trash)
  $('.bP').click(function() {
    $(this).closest(".card").remove();
  });
  
  // Ajouter un équipement
  $("#baddEquipement").click(function() {
    var nomE = $("#cnomE").val();
    var capactiteE = $("#ccapaciteE").val();
    var longueurE = $("#clongueurE").val();
    var largeurE = $("#clargeurE").val();
    var hauteurE = $("#chauteurE").val();
    
    var html = '<div class="card">' +
      '<div class="card-header hclass" id="heading' + nomE + '" data-toggle="collapse" data-target="#collapse' + nomE + '" aria-expanded="true" aria-controls="collapse' + nomE + '"> '+
        '<h5 class="mb-0">' + nomE + '</h5> ' + 
      '</div>' +
      '<div id="collapse' + nomE + '" class="collapse" aria-labelledby="heading' + nomE + '" data-parent="#accordion">' +
        '<div class="card-body py-1">' +
          '<div class="row">' +
            '<div class="justify-content-center d-flex flex-column align-items-center mr-2 flex-shrink-1">' +
              '<button type="button" class="btn px-1 bS"><i class="fas fa-pen color-icon"></i></button>' +
              '<button type="button" class="btn px-1 bP"><i class="fas fa-trash color-icon"></i></button>' +
            '</div>' +
            '<div class="pl-2">' +
              '<p><span class="labelcontent">Name</span><span class="spanclass">: </span><span class="valuequipement">' + nomE + '</span></p>' +
              '<p><span class="labelcontent">Capacity</span><span class="spanclass">: </span><span class="valuequipement">' + capactiteE + ' kg</span></p>' +
              '<p><span class="labelcontent">Length</span><span class="spanclass">: </span><span class="valuequipement">' + longueurE + ' m</span></p>' +
              '<p><span class="labelcontent">Width</span><span class="spanclass">: </span><span class="valuequipement">' + largeurE + ' m</span></p>' +
              '<p><span class="labelcontent">Height</span><span class="spanclass">: </span><span class="valuequipement">' + hauteurE + ' m</span></p>' +
            '</div>' +
            '<div class="justify-content-center d-flex flex-column align-items-center ml-auto pr-2">' +
              '<button type="button" class="btn px-1 bV"><i class="fas fa-check fa-lg" style="color:#7FB23B;"></i></button>' +
              '<button type="button" class="btn px-1 bX"><i class="fas fa-times-circle fa-lg" style="color:#AF2020;"></i></button>' +
            '</div>'
          '</div'> +
        '</div'> +
      '</div'> +
      '</div>';
    $('#accordion').append(html);
    $('#selectEquipement').append('<option value="' + nomE + '">' + nomE + '</option>');
    
  });
});

$('#m_tracteur').on('shown.bs.modal', function() {
  $('.selectpicker').selectpicker(); // Dropdown
});
$('#m_camion').on('shown.bs.modal', function() {
  $('.selectpicker').selectpicker(); // Dropdown
});