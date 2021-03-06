$('#m_e').on('shown.bs.modal', function() {

  // Bouton retour
  $('#bretourE').click(function() {
    reinitialiserFormuEqui();
    $("#formEquipement").removeClass('was-validated');
    changerTitres("add");
  });

  // Bouton suppression équipement (trash)
  $('.bP').click(function(event) {
    event.stopPropagation(); // empêcher affichage détails du collapse bootstrap
    $('#m_v').modal('show');
    validationSuppression($(this).closest(".card"),"equipement");
    reinitialiserFormuEqui();
  });

  var mode_save_button_equipement = "add";
  var nE, cE, loE, laE, hE, tE;
  // Boutons modification équipement (crayon)
  $('.bS').click(function(event) {
    $("#bretourE").show();
    event.stopPropagation(); // empêcher affichage détails du collapse bootstrap
    mode_save_button_equipement = "set";
    changerTitres("set");
    $('#cnomE').focus();
    // Récupérer les valeurs de l'équipement en question
    nE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(0).find(".valuequipement");
    cE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(1).find(".valuequipement");
    loE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(2).find(".valuequipement");
    laE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(3).find(".valuequipement");
    hE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(4).find(".valuequipement");
    tE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(5).find(".valuequipement");
    // Mettre ces valeurs dans le formulaire
    $('#selectTE').val(tE.html()).change();
    $('#cnomE').val(nE.html()).change();
    $('#ccapaciteE').val(cE.html()).change();
    $('#clongueurE').val(loE.html()).change();
    $('#clargeurE').val(laE.html()).change();
    $('#chauteurE').val(hE.html()).change();
  });

  function editEqui() {
    // Sauvegarder la modification (changement des valeurs dans la liste des équipements)
    nE.html($('#cnomE').val());
    cE.html($('#ccapaciteE').val());
    loE.html($('#clongueurE').val());
    laE.html($('#clargeurE').val());
    hE.html($('#chauteurE').val());
    tE.html($('#selectTE').val());
    nE.closest("p").closest("div").closest(".collapse").prev().find("h5").find("span").eq(0).html($('#cnomE').val());
    mode_save_button_equipement = "add";
  }

  // Ajouter un équipement
  function addEqui() {
    var nomE = $("#cnomE").val();
    var capactiteE = $("#ccapaciteE").val();
    var longueurE = $("#clongueurE").val();
    var largeurE = $("#clargeurE").val();
    var hauteurE = $("#chauteurE").val();
    var typeequipment = $("#selectTE").val()
    var html = '<div class="card">' +
      '<div class="card-header hclass" id="heading' + nomE + '" data-toggle="collapse" data-target="#collapse' + nomE + '" aria-expanded="true" aria-controls="collapse' + nomE + '">' +
      '<h5 class="mb-0">' +
        '<span>' + nomE + '</span>' +
        '<span class="float-right" style="margin-top:-5px;">' +
          '<button type="button" class="btn p-0 bS"><i class="fas fa-pen color-icon"></i></button>' +
          '<button type="button" class="btn py-0 pl-2 bP"><i class="fas fa-trash color-icon"></i></button>' +
        '</span>' +
      '</h5>' +
      '</div>' +
      '<div id="collapse' + nomE + '" class="collapse" aria-labelledby="heading' + nomE + '" data-parent="#accordion">' +
        '<div class="card-body py-1">' +
          '<p><span class="labelcontent cnameE">Name</span> : <span class="valuequipement">' + nomE + '</span></p>' +
          '<p><span class="labelcontent ccapacityE">Capacity</span> : <span class="valuequipement">' + capactiteE + ' kg</span></p>' +
          '<p><span class="labelcontent clengthE">Length</span> : <span class="valuequipement">' + longueurE + ' m</span></p>' +
          '<p><span class="labelcontent cwidthE">Width</span> : <span class="valuequipement">' + largeurE + ' m</span></p>' +
          '<p><span class="labelcontent cheightE">Height</span> : <span class="valuequipement">' + hauteurE + ' m</span></p>' +
          '<p><span class="labelcontent cTE">Type equipment</span> : <span class="valuequipement">' + typeequipment + '</span></p>' +
        '</div>' +
      '</div>' +
      '</div>';
      $('#accordion').append(html);
      $('#cselectequipement').append('<option value="' + nomE + '">' + nomE + '</option>').selectpicker('refresh'); // Ajouter le nouvel équipement au dropdown
  }

  // Validation formulaire
  $("#baddEquipement").click(function(e) {
    if (!$("#formEquipement")[0].checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      $("#formEquipement").addClass('was-validated');
    } else {
      $("#formEquipement").removeClass('was-validated');
      if (mode_save_button_equipement == "add") {
        addEqui();
        $("#cMessageEditEquipement, #cMessageDeleteEquipement").hide();
        $("#cMessageAddEquipement").show();
        setTimeout(function() { $("#cMessageAddEquipement").hide(); }, 7000);
      } else {
        editEqui();
        $("#cMessageAddEquipement, #cMessageDeleteEquipement").hide();
        $("#cMessageEditEquipement").show();
        setTimeout(function() { $("#cMessageEditEquipement").hide(); }, 7000);
      }
      reinitialiserFormuEqui();
    }
  });

  // Toggle button
  $("#toggle").click(function() {
    var operator;
    if($(".cUnite").hasClass("meter")){
      $(".cUnite").removeClass("meter");
      $(".cUnite").addClass("feet");
      if (document.documentElement.lang == "fr") $('.cUnite').html("pi"); // français
      if (document.documentElement.lang == "en") $('.cUnite').html("ft"); // anglais
      operator = "mtf";
    }
    else{
      $('.cUnite').html("m");
      $(".cUnite").addClass("meter");
      $(".cUnite").removeClass("feet");
      operator = "ftm";
    }
    $.each(["#clongueurE", "#clargeurE", "#chauteurE"], function(i, v) {
      value = $(v).val();
      if ((value != "") && (operator == "mtf")) $(v).val((Math.round((value * 0.3048) * 10)) /10); // Convertion mètres en pieds + arrondi à deux décimales
      if ((value != "") && (operator == "ftm")) $(v).val((Math.round((value / 0.3048) * 10)) /10); // Convertion pieds en mètres + arrondi à deux décimales
    });
    $(".valtoconvert").each( function () { // Convertion des valeurs dans la liste des équipements (gauche)
      if (operator == "mtf") $(this).html((Math.round(($(this).html() * 0.3048) * 10)) /10);
      if (operator == "ftm") $(this).html((Math.round(($(this).html() / 0.3048) * 10)) /10);
    });
  });

  // Tooltip on ToggleButton
  $("#clongueurE, #clargeurE, #chauteurE").focus(function() {
    $("#htoggleinstruction").tooltip('show');
  });
  $("#clongueurE, #clargeurE, #chauteurE").focusout(function() {
    $("#htoggleinstruction").tooltip('hide');
  });
});


$('#m_e').on('hidden.bs.modal', function() {
  reinitialiserFormuEqui();
  $("#cMessageEditEquipement, #cMessageDeleteEquipement, #cMessageAddEquipement").hide();
  $("#formEquipement").removeClass('was-validated'); //Retirer traces validation formulaire
});


// Remettre le formulaire à zéro
function reinitialiserFormuEqui() {
  $('#cnomE, #ccapaciteE, #clongueurE, #clargeurE, #chauteurE').val("");
  $('#selectTE').val('default').selectpicker("refresh");
  $("#bretourE").hide();
  changerTitres("add");
}

// Adapter le texte du titre et du bouton pour la modification d'un équipement
function changerTitres(elt){
  switch(elt){
    case "add":
      if (document.documentElement.lang == "en"){ // Si en anglais
        $('#taddequi').html("Add a new equipment");
        $('#baddE').html("Add");
      } else { // Si en français
        $('#taddequi').html("Ajouter un nouvel équipement");
        $('#baddE').html("Ajouter");
      }
      break;
    case "set":
      if (document.documentElement.lang == "en"){ // Si en anglais
        $('#taddequi').html("Modify this equipment");
        $('#baddE').html("Replace");
      } else { // Si en français
        $('#taddequi').html("Modifier cet équipement");
        $('#baddE').html("Remplacer");
      }
      break;
  }
}