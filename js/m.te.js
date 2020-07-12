$('#m_te').on('shown.bs.modal', function() {
  $('.selectpicker').selectpicker();

  // Collapse Bootstrap : fermer les autres quand on en ouvre un
  $(".collapse").click(function () {
    console.log("ok");
    $(".collapse").not(this).removeClass("show");
  });

  // Couleur tableau liste types équipements (header)
  $('.hclass').click(function() {
    $(this).addClass("headcolor");
    $(".hclass").not(this).removeClass("headcolor");
  });

  // Bouton suppression équipement (trash)
  $('.bP').click(function() {
    event.stopPropagation(); // empêcher affichage détails du collapse bootstrap
    $('#m_v').modal('show');
    validationSuppression($(this).closest(".card"),"TE");
    reinitialiserFormuTE();
  });

  var nTE, kTE, coutTE;
  // Boutons modification équipement (crayon)
  $('.bSte').click(function() {
    event.stopPropagation(); // empêcher affichage détails du collapse bootstrap
    $('#cnameTE').focus();
    // Récupérer les valeurs de le type d'équipement en question
    nTE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(0).find(".valuete");
    kTE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(1).find(".valuete");
    coutTE = $(this).closest("span").closest("h5").closest("div").next("div").find("div").find("p").eq(2).find(".valuete");
    // Mettre ces valeurs dans le formulaire
    $('#cnameTE').val(nTE.html()).change();
    $('#ccleTE').val(kTE.html()).change();
    $('#cconsoTE').val(coutTE.html()).change();
  });

  function editTE() {
    // Sauvegarder la modification (changement des valeurs dans la liste des types d'équipements)
    nTE.html($('#cnameTE').val());
    kTE.html($('#ccleTE').val());
    coutTE.html($('#cconsoTE').val());
    nTE.closest("p").closest("div").closest(".collapse").prev().find("h5").find("span").eq(0).html($('#cnameTE').val());
    reinitialiserFormuTE();
  }

  // Remettre le formulaire à zéro
  function reinitialiserFormuTE() {
    $('#cnameTE').val("");
    $('#ccleTE').val("");
    $('#cconsoTE').val("");
  }

  // Validation formulaire
  $("#breplaceTE").click(function() {
    if (!$("#formTE")[0].checkValidity()) {
      $("#formTE").find("#submit-hiddenTE").click();
    }else {
      editTE();
      $("#cMessageDeleteTE").hide();
      $("#cMessageAddTE").hide();
      $("#cMessageEditTE").show(0).delay(10000).hide(0); 
    }
  });
});