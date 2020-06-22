var origine;
var destination;

// Validation Code Postal (Origine et Destination)
$(".OHform").keyup(function() {
  var elt = $(this);
  var result = false;
  var valeurInput = $(elt).val();
  var nbCaracteres = valeurInput.length;
  if (nbCaracteres == 0){
    $(elt).removeClass("is-invalid");
    $(elt).removeClass("is-valid");
  }
 $.ajax({
    url: "./data/zip.json",
    dataType: "json",
    async: false,
    success:function(data){
      $.each(data.geoplaces, function(index, x) {
        if(valeurInput.toUpperCase() === (x.zip).substr(0, nbCaracteres)){
          result = true;
          if (valeurInput.toUpperCase() === (x.zip)){
            $(elt).addClass("is-valid");
            if($(elt).attr("id") == "corigin") origine = [x.lng,x.lat];
            if($(elt).attr("id") == "cdestination") destination = [x.lng,x.lat];
          }
        }
      });
    },
    error:function(xhr, ajaxOptions, thrownError){
      console.log('error');
      console.log(thrownError);
    }
  });
  if(!result) {
    $(elt).addClass("is-invalid");
    $(elt).removeClass("is-valid");
  }
  else {
    $(elt).removeClass("is-invalid");
  }
  return result;
});

// OpenLayers
$('#m_d_map').on('shown.bs.modal', function() {
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-73.5878100, 45.5088400]),
      zoom: 6
    })
  });

  // Origine
  if (typeof origine != 'undefined'){
    const iconOrigin = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(origine)),
      name: 'Origine',
    });
    var newOrigine = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [iconOrigin]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: './images/origin.svg'
        })
      })
    });
    map.addLayer(newOrigine);
  }
  // Destination
  if (typeof origine != 'undefined'){
    const iconDestination = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(destination)),
      name: 'Destination',
    });
    var newDestination = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [iconDestination]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: './images/destination.svg'
        })
      })
    });
    map.addLayer(newDestination);
  }
});

// Quand on ferme la modale modale map (trucker), on supprime la map
$('#m_d_map').on('hidden.bs.modal', function (e) {
  $(this).find(".map").html("");
});