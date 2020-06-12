$( document ).ready(function() {
  $('#m_c').load('./m.c.html');
  $('#m_t').load('./m.t.html');
  $('#m_e').load('./m.e.html');
  $('#m_v').load('./m.v.html');
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  
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
  validationSuppression($(this).closest( "tr" ));
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
      $(current_col).find("td").eq(0).html($('#selectTracteur').val());
      $(current_col).find("td").eq(1).html($('#selectEquipement').val());
      break;
    
    case "add":
      var choix_description = $('#cdescription').val();
      var choix_tracteur = $('#selectTracteur').val();
      var choix_equipement = $('#selectEquipement').val();
      var html = '<tr>' +
      '<td scope="row" class="text-right">' +
        '<button type="button" class="btn p-0 binfo" data-toggle="tooltip" data-placement="left" title="'+ choix_description +'" data-trigger="focus"><i class="fas fa-info-circle color-icon"></i></button>' +
      '</td>' +
      '<td>'+ choix_tracteur +'</td>'+
      '<td>'+ choix_equipement +'</td>' +
      '<td><input type="text" class="form-control form-control-sm m-auto cpostalcode"></td>'+
      '<th scope="row" class="text-right">'+
        '<button type="button" class="btn p-0 bset" data-toggle="modal" data-target="#m_c"><i class="fas fa-pencil-alt color-icon"></i></button>'+
        '<button type="button" class="btn p-0 btrash"><i class="fas fa-trash color-icon"></i></button>' +
      '</th></tr>';
      $('#tableCamions > tbody:last-child').append(html);
      break;
  }
  $('#m_c').modal('hide');
  $('[data-toggle="tooltip"]').tooltip(); // Rendre fonctionnel le tooltip qui vient d'être ajouté
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

// Fonctions qui concernent la modale ajout équipement _______________________________________________________________________________________________________________
$('#m_e').on('shown.bs.modal', function() {
  // Couleur tableau liste équipement (header)
  $('.hclass').click(function() {
    $(this).addClass("headcolor");
    $(".hclass").not(this).removeClass("headcolor");
  });
  
  // Bouton suppression équipement (trash)
  $('.bP').click(function() {
    $('#m_v').modal('show');
    validationSuppression($(this).closest(".card"));
  });
  
  var mode_save_button_equipement = "add";
  var nE, cE, loE, laE, hE;
  // Boutons modification équipement (crayon)
  $('.bS').click(function() {
    mode_save_button_equipement = "set";
    changerTitres();
    $('#cnomE').focus();
    // Récupérer les valeurs de l'équipement en question
    nE = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(0).find(".valuequipement");
    cE = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(1).find(".valuequipement");
    loE = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(2).find(".valuequipement");
    laE = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(3).find(".valuequipement");
    hE = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(4).find(".valuequipement");
    // Mettre ces valeurs dans le formulaire
    $('#cnomE').val(nE.html()).change();
    $('#ccapaciteE').val(cE.html()).change();
    $('#clongueurE').val(loE.html()).change();
    $('#clargeurE').val(laE.html()).change();
    $('#chauteurE').val(hE.html()).change();
  });
  
  function editEqui(){
    // Sauvegarder la modification (changement des valeurs dans la liste des équipements)
    nE.html($('#cnomE').val());
    cE.html($('#ccapaciteE').val());
    loE.html($('#clongueurE').val());
    laE.html($('#clargeurE').val());
    hE.html($('#chauteurE').val());
    nE.closest("p").closest("div").closest(".collapse").prev().find("h5").find("span").eq(0).html($('#cnomE').val());
    reinitialiserFormuEqui();
    mode_save_button_equipement = "add";
  }
  
  // Ajouter un équipement
  function addEqui(){
      var nomE = $("#cnomE").val();
      var capactiteE = $("#ccapaciteE").val();
      var longueurE = $("#clongueurE").val();
      var largeurE = $("#clargeurE").val();
      var hauteurE = $("#chauteurE").val();
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
              '<p><span class="labelcontent lcname">Name</span> : <span class="valuequipement">' + nomE + '</span></p>' +
              '<p><span class="labelcontent lccapacity">Capacity</span> : <span class="valuequipement">' + capactiteE + ' kg</span></p>' +
              '<p><span class="labelcontent lclength">Length</span> : <span class="valuequipement">' + longueurE + ' m</span></p>' +
              '<p><span class="labelcontent lcwidth">Width</span> : <span class="valuequipement">' + largeurE + ' m</span></p>' +
              '<p><span class="labelcontent lcheight">Height</span> : <span class="valuequipement">' + hauteurE + ' m</span></p>' +
           '</div>' +
        '</div>' +
      '</div>';
      $('#accordion').append(html);
      $('#selectEquipement').append('<option value="' + nomE + '">' + nomE + '</option>').selectpicker('refresh'); // Ajouter le nouvel équipement au dropdown
      reinitialiserFormuEqui();
  }
  
  // Remettre le formulaire à zéro
  function reinitialiserFormuEqui(){
    $('#cnomE').val("");
    $('#ccapaciteE').val("");
    $('#clongueurE').val("");
    $('#clargeurE').val("");
    $('#clargeurE').val("");
    $('#chauteurE').val("");
  }
  
  // Validation formulaire
  $("#baddEquipement").click(function() {
    if (!$("#formEquipement")[0].checkValidity()) {
      $("#formEquipement").find("#submit-hidden").click();
    }
    else{
      if (mode_save_button_equipement == "add"){
        addEqui();
        $("#cMessageAddEquipement").show();
        $("#cMessageEditEquipement").hide();
      }
      else{
        editEqui();
        remettreTitresEqui();
        $("#cMessageEditEquipement").show();
        $("#cMessageAddEquipement").hide();
      }
    }
  });
  
  // Adapter le texte du titre et du bouton pour la modification d'un équipement
  function changerTitres(){
    if ($('#haddEqui').html() == "Add a new equipment"){ // Si en anglais
      $('#haddEqui').html("Modify this equipment");
      $('#baddE').html("Replace");
    }
    else{ // Si en français
      $('#haddEqui').html("Modifier cet équipement");
      $('#baddE').html("Remplacer");
    }
  }
  function remettreTitresEqui(){
    if ($('#haddEqui').html() == "Modify this equipment"){ // Si en anglais
      $('#haddEqui').html("Add a new equipment");
      $('#baddE').html("Add");
    }
    else{ // Si en français
      $('#haddEqui').html("Ajouter un nouvel équipement");
      $('#baddE').html("Ajouter");
    }
  }
});

// Validation formulaire modale camion
$('#m_c').on('shown.bs.modal', function() {
  $("#bsavecamion").click(function() {
    if (!$("#formCamion")[0].checkValidity()) {
      $("#formCamion").find("#submit-hiddenC").click();
    }
  });
});

function validationSuppression(x){
  $(".bYes").click(function() {
    x.remove();
    $('#m_v').modal('hide');
  });
  $(".bNo").click(function() {
    $('#m_v').modal('hide');
  });
}


// Fonctions qui concernent la modale tracteur __________________________________________________________________________________________________________________________________
$('#m_t').on('shown.bs.modal', function() {
  // Couleur tableau liste tracteurs (header)
  $('.hclass').click(function() {
    $(this).addClass("headcolor");
    $(".hclass").not(this).removeClass("headcolor");
  });
  
  // Bouton suppression équipement (trash)
  $('.bP').click(function() {
    $('#m_v').modal('show');
    validationSuppression($(this).closest(".card"));
  });
  
  var mode_save_button_tracteur = "add";
  var nE, cE, loE, laE, hE;
  // Boutons modification équipement (crayon)
  $('.bSt').click(function() {
    mode_save_button_tracteur = "set";
    changerTitresT();
    $('#cnomtracteur').focus();
    // Récupérer les valeurs de l'équipement en question
    nT = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(0).find(".valuetracteur");
    sT = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(1).find(".valuetracteur");
    tcT = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(2).find(".valuetracteur");
    cT = $(this).closest( "span" ).closest( "h5" ).closest( "div" ).next("div").find("div").find("p").eq(3).find(".valuetracteur");
    // Mettre ces valeurs dans le formulaire
    $('#cnomtracteur').val(nT.html()).change();
    $('#cstatut').val(sT.html()).change();
    $('#ctypefuel').val(tcT.html()).change();
    $('#cconsotracteur').val(cT.html()).change();
  });
  
  function editTract(){
    // Sauvegarder la modification (changement des valeurs dans la liste des équipements)
    nT.html($('#cnomtracteur').val());
    sT.html($('#cstatut').val());
    tcT.html($('#ctypefuel').val());
    cT.html($('#cconsotracteur').val());
    nT.closest("p").closest("div").closest(".collapse").prev().find("h5").find("span").eq(0).html($('#cnomtracteur').val());
    reinitialiserFormuTract();
    mode_save_button_tracteur = "add";
  }
  
  // Ajouter un équipement
  function addTract(){
      var nomT = $("#cnomtracteur").val();
      var statutT = $("#cstatut").val();
      var typeCarburant = $("#ctypefuel").val();
      var consoT = $("#cconsotracteur").val();
      var html = '<div class="card">' +
        '<div class="card-header hclass" id="heading' + nomT + '" data-toggle="collapse" data-target="#collapse' + nomT + '" aria-expanded="true" aria-controls="collapse' + nomT + '">' +
           '<h5 class="mb-0">' +
              '<span>' + nomT + '</span>' +
              '<span class="float-right" style="margin-top:-5px;">' +
                '<button type="button" class="btn p-0 bS"><i class="fas fa-pen color-icon"></i></button>' +
                '<button type="button" class="btn py-0 pl-2 bP"><i class="fas fa-trash color-icon"></i></button>' +
              '</span>' +
          '</h5>' +
        '</div>' +
        '<div id="collapse' + nomT + '" class="collapse" aria-labelledby="heading' + nomT + '" data-parent="#accordion">' +
           '<div class="card-body py-1">' +
              '<p><span class="labelcontentT lcname">Name</span> : <span class="valuetracteur">' + nomT + '</span></p>' +
              '<p><span class="labelcontentT lcstatus">Status</span> : <span class="valuetracteur">' + statutT + '</span></p>' +
              '<p><span class="labelcontentT lcfueltype">Type of fuel</span> : <span class="valuetracteur">' + typeCarburant + '</span></p>' +
              '<p><span class="labelcontentT lccomsumption">Consumption</span> : <span class="valuetracteur">' + consoT + '</span></p>' +
           '</div>' +
        '</div>' +
      '</div>';
      $('#accordionT').append(html);
      $('#selectTracteur').append('<option value="' + nomT + '">' + nomT + '</option>').selectpicker('refresh'); // Ajouter le nouveau tracteur au dropdown
      reinitialiserFormuTract();
  }
  
  // Remettre le formulaire à zéro
  function reinitialiserFormuTract(){
    $('#cnomtracteur').val("");
    $('#cstatut').val('default').selectpicker("refresh");
    $('#ctypefuel').val('default').selectpicker("refresh");
    $('#cconsotracteur').val("");
  }
  
  // Validation formulaire
  $("#baddTracteur").click(function() {
    if (!$("#formTracteur")[0].checkValidity()) {
      $("#formTracteur").find("#submit-hiddenT").click();
    }
    else{
      if (mode_save_button_tracteur == "add"){
        addTract();
        $("#cMessageAddTracteur").show();
        $("#cMessageEditTracteur").hide();
      }
      else{
        editTract();
        remettreTitresTract();
        $("#cMessageEditTracteur").show();
        $("#cMessageAddTracteur").hide();
      }
    }
  });
  
  // Adapter le texte du titre et du bouton pour la modification d'un équipement
  function changerTitresT(){
    if ($('#haddTracteur').html() == "Add a new tractor"){ // Si en anglais
      $('#haddTracteur').html("Modify this tractor");
      $('#baddT').html("Replace");
    }
    else{ // Si en français
      $('#haddTracteur').html("Modifier ce tracteur");
      $('#baddT').html("Remplacer");
    }
  }
  function remettreTitresTract(){
    if ($('#haddTracteur').html() == "Modify this tractor"){ // Si en anglais
      $('#haddTracteur').html("Add a new tractor");
      $('#baddT').html("Add");
    }
    else{ // Si en français
      $('#haddTracteur').html("Ajouter un nouveau tracteur");
      $('#baddT').html("Ajouter");
    }
  }
});