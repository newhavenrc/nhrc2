var v, l;
  $(document).ready(function() {


    // CHANGE THESE TWO PARAMETERS TO MODIFY THE PAGE
    var page_len = 10;
    var vizjson = "http://khof312.cartodb.com/api/v2/viz/6c5a0904-d58e-11e4-80ce-0e853d047bba/viz.json";
    // vizjson must be to a public visualization. by default, the top 
    // layer will be the one shown in the table

    var headers = [];
    var types = {};
    var filters = {};
    var cur_off = 0;
    var skips = ['the_geom', 'the_geom_webmercator', 'created_at', 'updated_at'];
    var rows_tot = 0;
    var num_types = ['numeric', 'integer', 'number', 'double precision'];
    var primary;
    cartodb.createVis("map", vizjson, {
        //tiles_loader: true,
        center_lat: 41.3,
        center_lon: -72.94,
        zoom: 12
      })
      .done(function(viz, layers){
        v = viz, l = layers;
        // console.log(layers.getSu);
        var lay = layers[layers.length-1];
        var username = lay.model.attributes.user_name;
        var table = lay.model.attributes.layer_definition.layers[0].options.layer_name;
        var sql = cartodb.SQL({ user: username });
        primary = lay.getSubLayer(layers[layers.length-1].layers.length-1) ;
      function fillTable(remove){
        var sqlf = [];
        for (i in headers){
          var h = headers[i];
          if(filters[h]){
            if (filters[h]=="null"){
              sqlf.push(" " + h + " is NULL");
            } else {
              if(num_types.indexOf(types[h]) > -1){
                sqlf.push(" " + h + " = " + parseFloat(filters[h]));
              } else {
                sqlf.push(" " + h + " ilike '" + filters[h] +"'");
              }
            }
          }
        }
        if (sqlf.length > 0){
          var where = ' WHERE ' + sqlf.join(' AND ');
        } else {
          var where = ""
        }

        if (remove){
          primary.setSQL("SELECT the_geom, the_geom_webmercator, updated_at, created_at, "+headers.join()+" FROM "+table+" "+where);
          $("#download").attr('href', "http://"+username+".cartodb.com/api/v2/sql?format=geojson&q="+encodeURIComponent("SELECT the_geom, the_geom_webmercator, updated_at, created_at, "+headers.join()+" FROM "+table+" "+where));
        } else {
          $("#download").attr('href', "http://"+username+".cartodb.com/api/v2/sql?format=geojson&q="+encodeURIComponent("SELECT the_geom, the_geom_webmercator, updated_at, created_at, "+headers.join()+" FROM "+table));
        }
      }
    })

  });
        
