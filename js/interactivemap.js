console.log('in interactivemap.js');

function createSelector(layer) {
    var sql = new cartodb.SQL({ user: 'khof312' });
    var table = layer.model.attributes.layer_definition.layers[0].options.layer_name;
    var primaryquery = "SELECT the_geom, the_geom_webmercator, updated_at, created_at FROM "+table;
    layer.setSQL(primaryquery);
    /*
    var $options = $('#layer_selector li');
    $options.click(function(e) {
        // get the area of the selected layer
        var $li = $(e.target);
        var area = $li.attr('data');
        // deselect all and select the clicked one
        $options.removeClass('selected');
        $li.addClass('selected');
        // create query based on data from the layer
        var query = "select * from european_countries_e";
        if(area !== 'all') {
        query = "select * from european_countries_e where area > " + area;
        }
        // change the query in the layer to update the map
        layer.setSQL(query);
    });
*/
}

function makemap() {
    console.log('now making map...');
    var vizjson = "http://khof312.cartodb.com/api/v2/viz/6c5a0904-d58e-11e4-80ce-0e853d047bba/viz.json";
    cartodb.createVis('map', vizjson, {
      tiles_loader: true,
      center_lat: 41.3,
      center_lon: -72.94,
      zoom: 12
    })
    .done(function(vis, layers) {
      // layer 0 is the base layer, layer 1 is cartodb layer
      console.log('length of layers: ', layers.length);
      var subLayer = layers[layers.length-1].getSubLayer(0);
      createSelector(subLayer);
    })
    .error(function(err) {
      console.log(err);
    });
}

console.log('about to call makemap');
makemap()