var mode_save_button_camion;
// Récupérer les valeurs de la ligne quand on clique sur le crayon
var current_col;
$('.bset').click(function() {
  changerTitresC("set");
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
  changerTitresC("add");
  mode_save_button_camion = "add";
  $('#cdescription').focus();
  $('#cdescription').val("");
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
            '<button type="button" class="btn p-0 binfo" data-toggle="tooltip" data-placement="left" title="' + choix_description + '" data-trigger="focus hover click"><i class="fas fa-info-circle color-icon"></i></button>' +
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

function changerTitresC(elt){
  console.log("vu");
  switch (elt) {
    case "set":
      if ($('#en').hasClass("currentlanguage")) $('#bsavecamiontext').html("Replace"); // Si en anglais
      else $('#bsavecamiontext').html("Remplacer"); // Si en français
      break;
    case "add":
      if ($('#en').hasClass("currentlanguage")) $('#bsavecamiontext').html("Add"); // Si en anglais
      else $('#bsavecamiontext').html("Ajouter"); // Si en français
      break;
  }
}


$('#m_c').on('shown.bs.modal', function() {
  // Validation formulaire modale camion
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