$( document ).ready(function() {
  $('#m_camion').load('./m.c.html');
  $('#m_tracteur').load('./m.t.html');
  $('#m_equipement').load('./m.e.html');
  $('[data-toggle="tooltip"]').tooltip();
  
  // Cacher bouton validation (modification profile)
  $("#bvalidprofil").hide();
  $("#bcancelprofil").hide();
});

// Edit location
function editable(x) {
  var text1 = x.prev();
  $(text1).prop('contenteditable',true);
}
$('.bset-location').click(function() {
  editable($(this));
  $(".cpostalcode").focus();
});
$(".cpostalcode").focusout(function() {
  $(this).prop('contenteditable',false);
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

// Couleur tableau ajout équipement (vert)
$('.card-header').click(function() {
  console.log("1");
  $(this).addClass("headcolor");
  $(".card-header").not(this).removeClass("headcolor");
});


