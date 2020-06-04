$( document ).ready(function() {
  $('#m_camion').load('./m.c.html');
  $('#m_tracteur').load('./m.t.html');
  $('#m_equipement').load('./m.e.html');
  $('[data-toggle="tooltip"]').tooltip();
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

$('#bsetprofil').click(function() {
	console.log("focntionne");
	$("#cnomEntreprise").prop('contenteditable',true);
	$("#nadresse1").prop('contenteditable',true);
	$("#nadresse2").prop('contenteditable',true);
});