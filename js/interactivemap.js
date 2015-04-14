console.log('in interactivemap.js');

var sql = new cartodb.SQL({ user: 'mattgiguere' });

function createSelector(layer) {
    console.log(layer);
    var query = "SELECT * FROM scf_data_full WHERE _created_at0 > '"+ begDate + "' AND _created_at0 <= '" + endDate + "'";
    //console.log(query);
    //query = "SELECT * FROM scf_data";

    if (nbrhd != 'Nbrhd-all') {
        query += " AND neighborhood = '" + mapNbrhdNames[nbrhd] + "'";
    }

    if (ctgry != 'Cat-all') {
        query += " AND category = '" + cartoMapCatNames[ctgry] + "'";
    }

    console.log(query);

    layer.setSQL(query);
}

function makemap() {
    console.log('now making map...');
    var vizjson = "https://mattgiguere.cartodb.com/api/v2/viz/c3cd43dc-dfa6-11e4-8063-0e018d66dc29/viz.json";
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