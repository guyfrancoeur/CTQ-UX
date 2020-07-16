var origine;
var destination;

// Validation Code Postal (Origine et Destination)
$(".OHform").keyup(function() {
  var elt = $(this);
  var valeurInput = $(elt).val();
  var nbCaracteres = valeurInput.length;
  if (nbCaracteres == 0){
    $(elt).removeClass("is-invalid");
    $(elt).removeClass("is-valid");
  }
  else{
    $.ajax({
      url: "./data/zip.json",
      dataType: "json",
      async: false,
      success:function(data){
        $.each(data.geoplaces, function(index, x) {
          if(valeurInput.toUpperCase() === (x.zip).substr(0, nbCaracteres)){
            if (valeurInput.toUpperCase() === (x.zip)){
              $(elt).addClass("is-valid");
              $(elt).removeClass("is-invalid");
              if($(elt).attr("id") == "corigin") origine = [x.lng,x.lat];
              if($(elt).attr("id") == "cdestination") destination = [x.lng,x.lat];
            }
            else{
              $(elt).addClass("is-invalid");
              $(elt).removeClass("is-valid");
            }
          }
        });
      },
      error:function(xhr, ajaxOptions, thrownError){
        console.log('error');
        console.log(thrownError);
      }
    });
    if (($("#corigin").hasClass("is-valid")) && ($("#cdestination").hasClass("is-valid"))){
      $('#toast1').toast('show');
      $("#infoIcon").tooltip('show');
    }else{
      $('#toast1').toast('hide');
    }
  }
});

// ---- OpenLayers ----
$('#m_d_map').on('shown.bs.modal', function() {
  var features = [];
  var layers = []
  layers.push(new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  );

  // Origine
  if (typeof origine != 'undefined'){
    const iconOrigin = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(origine)),
      name: 'Origine',
    });
    iconOrigin.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1.0],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: './images/origin.svg'
        })
      })
    );
    features.push(iconOrigin);
  }
  // Destination
  if (typeof destination != 'undefined'){
    const iconDestination = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(destination)),
      name: 'Destination'
    });
    iconDestination.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1.0],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: './images/destination.svg'
        })
      })
    );
    features.push(iconDestination);
  }


  // ---- CAMIONS ----
  var camions = [
    {tracteur:"T1",camion:"E1",codepostal:"H3N"},
    {tracteur:"T2",camion:"E2",codepostal:"G7N"},
    {tracteur:"T3",camion:"E3",codepostal:"G0J"},
    {tracteur:"T4",camion:"E4",codepostal:"J2K"},
    {tracteur:"T5",camion:"E5",codepostal:"G8P"},
    {tracteur:"T6",camion:"E6",codepostal:"G3N"},
    {tracteur:"T7",camion:"7",codepostal:"C1A"},
    {tracteur:"T8",camion:"E8",codepostal:"P0V"},
    {tracteur:"T9",camion:"E9",codepostal:"N6P"},
    {tracteur:"T10",camion:"E1",codepostal:"N2P"}
  ];

  // Nombre de camions disponibles à afficher (nombre inscrit dans la modale)
  nbcamions = $("#nbcamions").html();
  if((nbcamions != camions.length) && (nbcamions != 0)) camions = camions.slice(0, nbcamions);

  if(nbcamions != 0) {
    // Transformer liste des camions en une nouvelle liste avec les coordonnées correspondant au code postal
    // {tracteur:"T1",camion:"E1",codepostal:"H3N"} >> {tracteur:"X",camion:"X",codepostal:"X",coordonnees:[X,X]},
    var coordonnees = [];
    $.each(camions, function( i, val ) {
      if(val.codepostal != null && val.tracteur != null && val.camion != null){
        $.ajax({ // Récupère les coordonnées du code postal de chaque camion dans zip.json
          url: "./data/zip.json",
          dataType: "json",
          async: false,
          success:function(data){
            $.each(data.geoplaces, function(index, x) {
              if(val.codepostal.toUpperCase() === (x.zip)){
                coordonnees.push({"tracteur":val.tracteur,"camion":val.camion,"codepostal": val.codepostal, "coordonnees":[x.lng,x.lat]});
              }
            });
          },
          error:function(xhr, ajaxOptions, thrownError){
            console.log('error');
            console.log(thrownError);
          }
        });
      }
    });

    $.each(coordonnees, function( i, val ) {  // Crée un objet (marker) pour chaque camion
      var newtruck = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(val.coordonnees)),
        name: val.tracteur + " " + val.camion + " " + val.codepostal + " " + val.coordonnees
      });
      newtruck.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1.0],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: './images/truck.svg'
          })
        })
      );
      features.push(newtruck);
    });
  }
  // ---- CAMIONS (fin) ----

  var vectorSource = new ol.source.Vector({features: features});
  var vectorLayer = new ol.layer.Vector({source: vectorSource});
  layers.push(vectorLayer);

  // Création de la map
  var map = new ol.Map({
    target: 'map',
    layers: layers,
    view: new ol.View({
      center: ol.proj.fromLonLat([-73.5878100, 45.5088400]),
      zoom: 6
    })
  });


  // Recadrer la carte pour afficher origine, destination et les camions
  var padding = [80, 0, 50, 0];
  if (typeof destination != 'undefined' && typeof origine != 'undefined') map.getView().fit(vectorSource.getExtent(), {
    size: map.getSize(),
    padding: padding,
  });
  else{ // Sinon centrer sur un des deux
    if (typeof destination != 'undefined') map.getView().setCenter(ol.proj.transform(desination, 'EPSG:4326', 'EPSG:3857'));
    if (typeof origine != 'undefined') map.getView().setCenter(ol.proj.transform(origine, 'EPSG:4326', 'EPSG:3857'));
  }

   // ---- POPUP ----
   var container = document.getElementById('popup');
   var content = document.getElementById('popup-content');
   var closer = document.getElementById('popup-closer');
 
   // Évennement en cliquant sur la croix du popup
   closer.onclick = function() {
      overlay.setPosition(undefined);
     closer.blur();
     return false;
   };
 
   // Create an overlay to anchor the popup to the map.
   var overlay = new ol.Overlay({
     element: container,
   });
   map.addOverlay(overlay);
   
   // Add a click handler to the map to render the popup.
   map.on('singleclick', function(evt) {
     var name = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
       return feature.get('name');
     })
     if (name) {
       var coordinate = evt.coordinate;
       overlay.setPosition(coordinate);
       container.style.display="block";
       if (name == "Origine" && $('#en').hasClass("currentlanguage")){
         $("#popup").css("height","50px");
         $("#popup").css("width","150px");
         content.innerHTML = "<span style='margin-left:20px;font-weight:600;color:rgb(90,90,90);'>Origin</span>";
         return;
       }
       if (name == "Origine" && $('#fr').hasClass("currentlanguage")){
         $("#popup").css("height","50px");
         $("#popup").css("width","150px");
         content.innerHTML = "<span style='margin-left:18px;font-weight:600;color:rgb(90,90,90);'>Origine</span>";
         return;
       }
       if (name == "Destination"){
         $("#popup").css("height","50px");
         $("#popup").css("width","150px");
         content.innerHTML = "<span style='font-weight:600;color:rgb(90,90,90);'>Destination</span>";
         return;
       }
       else{
         $("#popup").css("height","130px");
         $("#popup").css("width","300px");
         var all = name.split(" ");
         if ($('#en').hasClass("currentlanguage")){ // Si en anglais
           content.innerHTML = " <i class='fas fa-truck fa-sm iconPopup'></i> <span style='font-weight:600;'>Tractor : </span>" + all[0] + "<br/>" +
           " <i class='fas fa-truck-loading fa-sm iconPopup'></i> <span style='font-weight:600;'>Equipment : </span>" + all[1] + "<br/>" +
           " <i class='fas fa-map-signs fa-sm iconPopup'></i> <span style='font-weight:600;'>Postal code : </span>" + all[2] + "<br/>" +
           " <i class='fas fa-map-marked-alt fa-sm iconPopup'></i> <span style='font-weight:600;'>Coordinates : </span>" + all[3];
         }
         else{ // Si en français
           content.innerHTML = " <i class='fas fa-truck fa-sm iconPopup'></i> <span style='font-weight:600;'>Tracteur : </span>" + all[0] + "<br/>" +
           " <i class='fas fa-truck-loading fa-sm iconPopup'></i> <span style='font-weight:600;'>Équipement : </span>" + all[1] + "<br/>" +
           " <i class='fas fa-map-signs fa-sm iconPopup'></i> <span style='font-weight:600;'>Code postal : </span>" + all[2] + "<br/>" +
           " <i class='fas fa-map-marked-alt fa-sm iconPopup'></i> <span style='font-weight:600;'>Coordonnées : </span>" + all[3];
         }            
       }
     } else {
       container.style.display="none";
     }
   });
 
   map.on('pointermove', function(evt) {
     map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
   });
  
});


// Quand on ferme la modale modale map (trucker), on supprime la map
$('#m_d_map').on('hidden.bs.modal', function (e) {
  $(this).find(".map").html("");
  var popup = '<div id="popup" class="ol-popup" style="height:130px;width:300px;">' +
    '<button id="popup-closer" type="button" class="close">' +
      '<span aria-hidden="true">&times;</span>' +
    '</button>' +
    '<div id="popup-content"></div>' +
    '</div>';
  $("#map").after(popup);
});