$( document ).ready(function() {
  $('#m_ajoutcamion').load('./m.ajoutcamion.html');
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

// Récupérer les valeurs de la ligne quand on clique sur le crayon
$('.bset').click(function() {
	var current_col = $(this).closest( "tr" );
	var tracteur = $(current_col).find("td").eq(0).html();
	var equipement = $(current_col).find("td").eq(1).html();
	$('#selectTracteur').val(tracteur).change();
	$('#selectEquipement').val(equipement).change();
});

// Bouton ajout camion, réinitialiser la sélection (dropdown)
$('#bajoutcamion').click(function() {
	$("#selectTracteur").val("").change();
	$("#selectEquipement").val("").change();
});
