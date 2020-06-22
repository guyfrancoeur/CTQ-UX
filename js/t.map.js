$('#m_t_map').on('shown.bs.modal', function() {
  var coordonnees = [];
  var checkedTruck = $(".custom-control-input:checked");
  $.each( checkedTruck, function( i, val ) {
    var posi = $(val).closest("td").next("td").next("td").next("td").find(".cpostalcode").val();
    $.ajax({
      url: "./data/zip.json",
      dataType: "json",
      async: false,
      success:function(data){
        $.each(data.geoplaces, function(index, x) {
          if(posi.toUpperCase() === (x.zip)){
            coordonnees.push([x.lng,x.lat]);
          }
        });
      },
      error:function(xhr, ajaxOptions, thrownError){
        console.log('error');
        console.log(thrownError);
      }
    });
  });

  // OpenLayers
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-73.5878100, 45.5088400]),
      zoom: 5
    })
  });
  $.each(coordonnees, function( i, val ) {
    console.log(val);
    const iconTruck = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(val))
    });
    var newtruck = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [iconTruck]
        }),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: './images/truck.svg'
          })
        })
      });
      map.addLayer(newtruck);
    });
});