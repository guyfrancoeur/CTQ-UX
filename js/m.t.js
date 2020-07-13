$('#m_t').on('shown.bs.modal', function() {

  // Bouton suppression tracteur (trash)
  $('.bP').click(function() {
    event.stopPropagation(); // empêcher affichage détails du collapse bootstrap
    $('#m_v').modal('show');
    validationSuppression($(this).closest(".card"),"tracteur");
    reinitialiserFormuTract();
  });

  var mode_save_button_tracteur = "add";
  var nT, sT, tcT, cT;
  // Boutons modification tracteur (crayon)
  $('.bSt').click(function() {
    event.stopPropagation(); // empêcher affichage détails du collapse bootstrap
    mode_save_button_tracteur = "set";
    changerTitresT();
    $('#cnomtracteur').focus();
    // Récupérer les valeurs du tracteur en question
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
    // Sauvegarder la modification (changement des valeurs dans la liste des tracteurs)
    nT.html($('#cnomtracteur').val());
    sT.html($('#cstatut').val());
    tcT.html($('#ctypefuel').val());
    cT.html($('#cconsotracteur').val());
    nT.closest("p").closest("div").closest(".collapse").prev().find("h5").find("span").eq(0).html($('#cnomtracteur').val());
    reinitialiserFormuTract();
    mode_save_button_tracteur = "add";
  }

  // Ajouter un tracteur
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
            '<p><span class="labelcontentT cnameE">Name</span> : <span class="valuetracteur">' + nomT + '</span></p>' +
            '<p><span class="labelcontentT cstatusE">Status</span> : <span class="valuetracteur">' + statutT + '</span></p>' +
            '<p><span class="labelcontentT cfueltypeE">Type of fuel</span> : <span class="valuetracteur">' + typeCarburant + '</span></p>' +
            '<p><span class="labelcontentT ccomsumptionE">Consumption</span> : <span class="valuetracteur">' + consoT + '</span></p>' +
         '</div>' +
      '</div>' +
    '</div>';
    $('#accordionT').append(html);
    $('#cselecttracteur').append('<option value="' + nomT + '">' + nomT + '</option>').selectpicker('refresh'); // Ajouter le nouveau tracteur au dropdown
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
        $("#cMessageEditTracteur").hide();
        $("#cMessageDeleteTracteur").hide();
        $("#cMessageAddTracteur").show(0).delay(10000).hide(0); 
      }
      else{
        editTract();
        remettreTitresTract();
        $("#cMessageDeleteTracteur").hide();
        $("#cMessageAddTracteur").hide();
        $("#cMessageEditTracteur").show(0).delay(10000).hide(0);
      }
    }
  });

  // Adapter le texte du titre et du bouton pour la modification d'un tracteur
  function changerTitresT(){
    if ($('#en').hasClass("currentlanguage")){ // Si en anglais
      $('#taddtracteur').html("Modify this tractor");
      $('#baddT').html("Replace");
    }
    else{ // Si en français
      $('#taddtracteur').html("Modifier ce tracteur");
      $('#baddT').html("Remplacer");
    }
  }
  function remettreTitresTract(){
    if ($('#en').hasClass("currentlanguage")){ // Si en anglais
      $('#taddtracteur').html("Add a new tractor");
      $('#baddT').html("Add");
    }
    else{ // Si en français
      $('#taddtracteur').html("Ajouter un nouveau tracteur");
      $('#baddT').html("Ajouter");
    }
  }
}); 