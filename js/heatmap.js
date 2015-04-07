var catnumber = 24;
var gridSize = 30;
var margin = { top: 25, right: 0, bottom: 100, left: 125 },
    width = 900 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom,
    //gridSize = Math.floor(width / catnumber),
    legendElementWidth = gridSize*2,
    buckets = 7,
    //colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
    colors = colorbrewer.YlGnBu[7],
    //categorylabels = ["Potholes", "Trash", "Signs", "Health", "Property", "Graffiti", "Policing"],
    nbrhdlabels = ["AMT", "ANX", "BVH", "DXW", "DTN", "DGT", "ERK", "ESH", "EDG", "FHV", "FHH", "HLL", "LWF", "NHL", "OTH", "PSH", "QNP", "WRV", "WRK", "WVL", "WOO"];

var neighborhoods = [
  "Amity",
  "Annex",
  "Beaver Hills",
  "Dixwell",
  "Downtown",
  "Dwight",
  "East Rock",
  "East Shore",
  "Edgewood",
  "Fair Haven",
  "Fair Haven Heights",
  "Hill",
  "Long Wharf",
  "Newhallville",
  "Other",
  "Prospect Hill",
  "Quinnipiac",
  "West River",
  "West Rock",
  "Westville",
  "Wooster Square/Mill River"
]

var categories = [
  "Bins for Trash & Recycling",
  "General Bus Request/Incident",
  "Graffiti",
  "Hangers",
  "Health Complaints",
  "Illegal Dumping",
  "Other",
  "Other - city responsibility",
  "Parking Meter",
  "Parks Request",
  "Policing Issue",
  "Post to Neighbors",
  "Potholes",
  "Private Property Issue",
  "Public Space, Streets and Drains",
  "Request for volunteers",
  "Sidewalks and Curb damage",
  "Signs / Bus Shelters / Pavement Markings",
  "SNOW RELATED",
  "Street Lamp",
  "Traffic/Road Safety",
  "Traffic Signal / Pedestrian Signal",
  "Trash & Recycling",
  "Tree Trimming"
]

var catlabels = ['Bins', 'Bus', 'Graffiti', 'Hangers', 'Health',
                 'Dumping', 'Other', 'City Request', 'Parking',
                 'Parks', 'Policing', 'To Neighbors', 'Potholes',
                 'Private Property', 'Public Space', 'Volunteers',
                 'Sidewalks', 'Signs', 'Snow', 'Street Lamps',
                 'Traffic', 'Signals', 'Trash', 'Trees']

console.log(neighborhoods);
console.log(' ');
console.log(categories);

//setup the nested objects to store the summed data:
var heatdata = new Object();
for (i = 0; i < neighborhoods.length; i++) {
  heatdata[neighborhoods[i]] = {};
  for (j = 0; j < categories.length; j++) {
    heatdata[neighborhoods[i]][categories[j]] = 0;
  }
}

//console.log("http://localhost/nhrc2/php/HeatmapData.php?tmCovrg=Tm-Cvrg-All");

//console.log('start of data:');
/*
$.getJSON("http://localhost/nhrc2/php/HeatmapData.php?tmCovrg=Tm-Cvrg-All", function(issue){
    var idx = 0;
    $.each(issue, function(){
        //console.log(issue[idx]);
        //console.log(issue[idx]['category']);
        //console.log(issue[idx]['neighborhood'] == 'East Rock');
        //document.write(issue+"<br />"); 
        heatdata[issue[idx]['neighborhood']][issue[idx]['category']] += 1;
        //document.write(idx+"<br />"); 
        idx += 1;

    });
});
*/

//begin d3 section

var nbrhdtip = d3.tip()
  .attr('class', 'd3-nbrhd-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:#aaa'>" + d.fullname + "</span>";
  })

var celltip = d3.tip()
  .attr('class', 'd3-cell-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "Neighborhood: " + d.neighborhoodname + "<br />"+
           "Category: " + d.categoryname + "<br />"+
           "Issues: " + d.count + "<br />";
  })

var svg = d3.select("#heatmap").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(nbrhdtip);
svg.call(celltip);


//initialization of the percent complete donut charts:
var percmargin = { top: 0, right: 0, bottom: 0, left: 50 },
    percwidth = 450,
    percheight = 250,
    twoPi = 2 * Math.PI,
    progress = 0,
    total = 1308573, // must be hard-coded if server doesn't report Content-Length
    formatPercent = d3.format(".0%");

var arc = d3.svg.arc()
    .startAngle(0)
    .innerRadius(70)
    .outerRadius(80);

var svg2 = d3.select("#roundissueperc").append("svg")
    .attr("width", percwidth + percmargin.left + percmargin.right)
    .attr("height", percheight + percmargin.top + percmargin.bottom)
    .append("g")
    .attr("transform", "translate(" + (percmargin.left + percwidth / 2) + "," + (percmargin.top + percheight / 2) + ")");

var meter = svg2.append("g")
    .attr("class", "progress-meter");

meter.append("path")
    .attr("class", "background issue-donut")
    .attr("d", arc.endAngle(twoPi));

var foreground = meter.append("path")
    .attr("class", "foreground");

var perctext = meter.append("text")
    .attr("class", 'issue-number-text')
    .attr("text-anchor", "middle")
    .attr("dy", ".0em");

var perctextlabel = meter.append("text")
    .attr("class", 'issue-number-label')
    .attr("text-anchor", "middle")
    .attr("dy", ".85em");



d3.json("http://localhost/nhrc2/php/HeatmapData.php?tmCovrg=Tm-Cvrg-All", function(error, data) {
  if (error) return console.warn(error);
  //console.log(data);
  for (idx = 0; idx < data.length; idx++) {
    heatdata[data[idx]['neighborhood']][data[idx]['category']] += 1;
  }
  var heatdataout = {};
  var neighborhoodarr = [];
  var categoriesarr = [];
  var issuecountarr = [];
  var heatdataarr = [];

  for (i = 0; i < neighborhoods.length; i++) {
    for (j = 0; j < categories.length; j++) {
      //console.log('neighborhood: '+neighborhoods[i]+' category: '+categories[j]+
      //  ' count: '+heatdata[neighborhoods[i]][categories[j]]);
      neighborhoodarr.push(i);
      categoriesarr.push(j);
      issuecountarr.push(heatdata[neighborhoods[i]][categories[j]]);
      heatdataarr.push({'neighborhoodnum': i,
                        'categorynum': j, 
                        'count': heatdata[neighborhoods[i]][categories[j]],
                        'neighborhoodname': neighborhoods[i],
                        'categoryname': categories[j]});
    }
  }
  heatdataout['neighborhoodnum'] = neighborhoodarr;
  heatdataout['categorynum'] = categoriesarr;
  heatdataout['count'] = issuecountarr;
  //heatdataout['neighborhood'] = neighborhoods;
  //heatdataout['category'] = categories;
  
  //Updated Percentage complete donut plot:
  var acknowledged_frac = 0.85;
  var completed_frac = 0.57;
  var angular_rotation = -45 / 180 * Math.PI;

  var arc2 = d3.svg.arc()
      .startAngle(-1 * acknowledged_frac/2. * twoPi + angular_rotation)
      .innerRadius(80)
      .outerRadius(90)
      .endAngle(acknowledged_frac/2. * twoPi + angular_rotation);

  var meter2 = svg2.append("g")
      .attr("class", "progress-meter");

  meter2.append("path")
      .attr("class", "acknowledged-donut")
      .attr("d", arc2);

  var arc3 = d3.svg.arc()
      .startAngle(-1 * completed_frac/2. * twoPi + angular_rotation)
      .innerRadius(90)
      .outerRadius(100)
      .endAngle(completed_frac/2. * twoPi + angular_rotation);

  var meter3 = svg2.append("g")
      .attr("class", "progress-meter");

  meter3.append("path")
      .attr("class", "completed-donut")
      .attr("d", arc3);

  perctext.text(data.length);
  perctextlabel.text("issues");

  var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(heatdataarr, function (d) { return d.count; })])
        .range(colors);
  //document.write('All '+idx+' records have been summed.');
  //console.log(colorScale);


  catlist = [];
  for (i=0; i < categories.length; i++){
    catlist.push({'abbreviation': catlabels[i], 'fullname': categories[i]});
  }

  var catLabels = svg.selectAll(".catLabel")
      .data(catlist)
      .enter().append("text")
        .text(function (d) { return d.abbreviation; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return "dayLabel mono axis"; })
        .on('mouseover', nbrhdtip.show)
        .on('mouseout', nbrhdtip.hide);

    nbrhoodlist = [];
    for (i=0; i < nbrhdlabels.length; i++){
      nbrhoodlist.push({'abbreviation': nbrhdlabels[i], 'fullname': neighborhoods[i]});
    }

    var nbrhdLabels = svg.selectAll(".nbrhdLabel")
        .data(nbrhoodlist)
        .enter().append("text")
        .text(function(d) { return d.abbreviation; })
        .attr("x", function(d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function(d, i) { return "timeLabel mono axis"; })
        .on('mouseover', nbrhdtip.show)
        .on('mouseout', nbrhdtip.hide);

    //console.log(heatdataout);
    //console.log(heatdataarr);
    //console.log('neighborhoodnum: ');
    //console.log(heatdataout.neighborhoodnum);
    //console.log('categorynum: ');
    //console.log(heatdataout.categorynum);

    var heatMap = svg.selectAll(".issuecell")
        .data(heatdataarr)
        .enter().append("rect")
        .attr("x", function(d) { 
          return (+d.neighborhoodnum) * gridSize;
        })
        .attr("y", function(d) { return (+d.categorynum) * gridSize; })
        //.attr("rx", 4)
        //.attr("ry", 4)
        .attr("class", "issuecell bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0])
        .on('mouseover', celltip.show)
        .on('mouseout', celltip.hide);


    heatMap.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.count); });

    //heatMap.append("text").text(function(d) { return d.count; });

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function(d) { return d; })
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height - 20)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.round(d); })
      .attr("x", function(d, i) { return legendElementWidth * i + 15; })
      .attr("y", height + gridSize - 20);

    legend.append("text")
      .attr("class", "mono")
      .text("Number of Issues")
      .attr("x", legendElementWidth * 2.5)
      .attr("y", height + 25);

});
