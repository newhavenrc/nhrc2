console.log('in interactivemap.js');

var sql = new cartodb.SQL({ user: 'mattgiguere' });

function createSelector(layer) {
    console.log(layer);
    var query = "SELECT * FROM scf_data WHERE created_at > '"+ begDate + "' AND created_at <= '" + endDate + "'";
    //console.log(query);
    //query = "SELECT * FROM scf_data";

    if (nbrhd != 'Nbrhd-all') {
        query += " AND neighborhood = '" + mapNbrhdNames[nbrhd] + "'";
    }

    if (ctgry != 'Cat-all') {
        query += " AND category = '" + mapCatNames[ctgry] + "'";
    }

    console.log(query);

    layer.setSQL(query);
}

function makemap() {
    console.log('now making map...');
    var vizjson = "https://mattgiguere.cartodb.com/api/v2/viz/b4556692-def6-11e4-84f7-0e853d047bba/viz.json";
    cartodb.createVis('cartodbmapspot', vizjson, {
      tiles_loader: true,
      center_lat: 41.3,
      center_lon: -72.94,
      zoom: 12
    })
    .done(function(vis, layers) {
      // layer 0 is the base layer, layer 1 is cartodb layer
      console.log('length of layers: ', layers.length);
      console.log(layers[1].layers[0].sub);
      var subLayer = layers[1].layers[0].sub;
      createSelector(subLayer);
    })
    .error(function(err) {
      console.log(err);
    });
}

console.log('about to call makemap');
makemap()