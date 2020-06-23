$('#m_t_map').on('shown.bs.modal', function() { 
  var coordonnees = [];
  var checkedTruck = $(".custom-control-input:checked");
  $.each( checkedTruck, function( i, val ) { // Récupère les données des camions sélectionnés dans la page html
    var tract = $(val).closest("td").next("td").html();
    var cam = $(val).closest("td").next("td").next("td").html();
    var codepostal = $(val).closest("td").next("td").next("td").next("td").find(".cpostalcode").val();
    if(codepostal != null && tract != null && cam != null){
      $.ajax({ // Récupère les coordonnées de chaque camion dans zip.json
        url: "./data/zip.json",
        dataType: "json",
        async: false,
        success:function(data){
          $.each(data.geoplaces, function(index, x) {
            if(codepostal.toUpperCase() === (x.zip)){
              coordonnees.push({"tracteur":tract,"camion":cam,"codepostal": codepostal, "coordonnees":[x.lng,x.lat]});
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

  /* ---- OpenLayers ---- */
  var features = [];
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

  var vectorSource = new ol.source.Vector({
    features: features
  });
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-73.5878100, 45.5088400]),
      zoom: 6
    })
  });

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
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
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
      } else {
        container.style.display="none";
      }
  });
  map.on('pointermove', function(evt) {
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
  });

  // make the map's view to zoom and pan enough to display all the points
  map.getView().fit(vectorSource.getExtent(), map.getSize());
});

// Quand on ferme la modale modale map (trucker), on supprime la map (pour pouvoir la recharger la prochaine fois)
$('#m_t_map').on('hidden.bs.modal', function (e) {
  $(this).find(".map").html("");
  var popup = '<div id="popup" class="ol-popup" style="height:130px;width:300px;">' +
    '<button id="popup-closer" type="button" class="close">' +
      '<span aria-hidden="true">&times;</span>' +
    '</button>' +
    '<div id="popup-content"></div>' +
    '</div>';
  $("#map").after(popup);
});

