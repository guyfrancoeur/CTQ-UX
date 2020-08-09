var mode_save_button_camion;
// Récupérer les valeurs de la ligne quand on clique sur le crayon
var current_col;
$('.bset').click(function() {
  changerTitresC("set");
  mode_save_button_camion = "set";
  current_col = $(this).closest("tr");
  var temp = $(current_col).find("td").eq(0).find("button").eq(0).attr('data-content'); // Récupération contenu popover descriptio camion => On obtient un String
  var parsed = $('<div/>').append(temp); // Permet de considérer le String comme un code HTML pour utiliser la fonction find() ensuite
  var description = parsed.find("div").html().replace('<br>', '\n');
  var tracteur = $(current_col).find("td").eq(1).html();
  var equipement = $(current_col).find("td").eq(2).html();
  $('#cdescription').val(description).change();
  $('#cselecttracteur').val(tracteur).change();
  $('#cselectequipement').val(equipement).change();
});

// Bouton ajout camion
$('#bajoutcamion').click(function() {
  reinitialiserFormuCamion();
  changerTitresC("add");
  mode_save_button_camion = "add";
  $('#cdescription').focus();
});

function reinitialiserFormuCamion() {
  $('#cdescription').val("");
  $("#cselecttracteur, #cselectequipement").val("").change();
}

// Ajout/modification camion
function camionEvent() {
  var choix_description = $('#cdescription').val().replace(/\n/g, '<br>\n'); // Prends en compte les retours à la ligne
  var choix_tracteur = $('#cselecttracteur').val();
  var choix_equipement = $('#cselectequipement').val();
  switch (mode_save_button_camion) {
    case "set":
      content = '<i class="fas fa-thumbtack iconDescription"></i><span class="descriptiontitle">Description</span><hr class="hrdescri">' +
                '<div class="textdescription">' + choix_description + '</div>';
      $(current_col).find("td").eq(0).find("button").eq(0).attr('data-content',content);
      $(current_col).find("td").eq(1).html(choix_tracteur);
      $(current_col).find("td").eq(2).html(choix_equipement);
      $("#cMessageAddCamion").hide();
      $("#cMessageEditCamion").show();
      setTimeout(function() { $("#cMessageEditCamion").hide(); }, 7000);
      break;
    case "add":
      var dernierCheckbox1 = $(".checkbox").eq($(".checkbox").length - 1).attr("id"); // Obtenir l'id du dernier checkbox, pour créer le suivant : "id + (numéro checkbox)"
      var dernierCheckbox2 = dernierCheckbox1.substr(8,dernierCheckbox1.length) + 1; // Prochain numéro = nombre de checkbox total + 1
      var html = '<tr>' +
        '<td scope="row">' +
          '<div class="row ml-auto">' +
            '<div class="custom-control custom-checkbox">' +
              '<input type="checkbox" class="custom-control-input checkbox" onchange="checkonebox()" id="checkbox'+ dernierCheckbox2 +'">' +
              '<label class="custom-control-label" for="checkbox'+ dernierCheckbox2 +'"></label>' +
            '</div>' +
            '<button type="button" class="btn p-0 binfo" data-html="true" data-toggle="popover" data-placement="left"' +
            'data-content="<i class=&quot; fas fa-thumbtack iconDescription !&quot;></i>' +
              '<span class=&quot; descriptiontitle !&quot;>Description</span><hr class=&quot; hrdescri !&quot;>' +
              '<div class=&quot; textdescription !&quot;>' + choix_description + '</div>"' +
            'data-trigger="focus"><i class="fas fa-info-circle color-icon"></i></button>' +
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
        $("#cMessageEditCamion").hide();
        $("#cMessageAddCamion").show();
        setTimeout(function() { $("#cMessageAddCamion").hide(); }, 7000);
        break;
  }
  $('[data-toggle="popover"]').popover(); // Rendre fonctionnel le popover qui vient d'être ajouté
}

function changerTitresC(elt){
  switch (elt) {
    case "set":
      if (document.documentElement.lang == "en"){
        $('#bsavecamiontext').html("Replace"); // Si en anglais
        $('#tyourtrucks').html("Modify this truck");
      }
      else{
        $('#bsavecamiontext').html("Remplacer"); // Si en français
        $('#tyourtrucks').html("Modifier ce camion");
      }
      break;
    case "add":
      if (document.documentElement.lang == "en"){
        $('#bsavecamiontext').html("Add"); // Si en anglais
        $('#tyourtrucks').html("Add a new truck");
      }
      else{
        $('#bsavecamiontext').html("Ajouter"); // Si en français
        $('#tyourtrucks').html("Ajouter un nouveau camion");
      }
      break;
  }
}


$('#m_c').on('shown.bs.modal', function() {
  $('#cdescription').focus();
  $('.selectpicker').selectpicker();
  
  // Validation formulaire modale camion
  $("#bsavecamion").click(function(e) {
    if (!$("#formCamion")[0].checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      $("#formCamion").addClass('was-validated');
    }
    else{
      $("#formCamion").removeClass('was-validated');
      camionEvent();
      changerTitresC("add");
      reinitialiserFormuCamion();
    }
  });
});

$('#m_c').on('hidden.bs.modal', function() {
  $("#cMessageEditCamion, #cMessageAddCamion").hide();
  $("#formCamion").removeClass('was-validated');
});