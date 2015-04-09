console.log('in interactivemap.js');

var sql = new cartodb.SQL({ user: 'mattgiguere' });

function createSelector(layer) {
    console.log(layer);
    var level = 'nh_neighborhoods';
    var category = 'Potholes';
    var end_date = '2015-03-15';
    var start_date = '2015-01-01';
    var query = "SELECT * FROM scf_data WHERE created_at > '"+ begDate + "'";

    console.log(query);

    if (tmCvrg != 'Tm-Cvrg-All') {
        console.log('hello');
    }
    layer.setSQL(query);
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
    var vizjson = "https://mattgiguere.cartodb.com/api/v2/viz/4e00867a-def0-11e4-bd3e-0e4fddd5de28/viz.json";
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