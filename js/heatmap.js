var catnumber = 24;
var gridSize = 30;
var margin = { top: 50, right: 0, bottom: 100, left: 125 },
    width = 900 - margin.left - margin.right,
    height = 820 - margin.top - margin.bottom,
    //gridSize = Math.floor(width / catnumber),
    legendElementWidth = gridSize*2,
    buckets = 7,
    //colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
    colors = colorbrewer.YlGnBu[7],
    //categorylabels = ["Potholes", "Trash", "Signs", "Health", "Property", "Graffiti", "Policing"],
    nbrhdlabels = ["AMT", "ANX", "BVH", "DXW", "DTN", "DGT", "ERK", "ESH", "EDG", "FHV", "FHH", "HLL", "LWF", "NHL", "OTH", "PSH", "QNP", "WRV", "WRK", "WVL", "WOO"];

if (vw == 'Vw-ack-tm-imp' || vw == 'Vw-cmp-tm-imp') {
  colors = ['#e31a1c', '#fd8d3c', '#fecc5c', '#FFFFBD', '#a1dab4', '#41b6c4', '#225ea8'];
}

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

var mapNbrhdNames = {
'Nbrhd-all' : 'All',
'Nbrhd-amity' :   "Amity",
'Nbrhd-annex' :   "Annex",
'Nbrhd-beaverhills' :   "Beaver Hills",
'Nbrhd-dixwell' :   "Dixwell",
'Nbrhd-downtown' :   "Downtown",
'Nbrhd-dwight' :   "Dwight",
'Nbrhd-eastrock' :   "East Rock",
'Nbrhd-eastshore' :   "East Shore",
'Nbrhd-edgewood' :   "Edgewood",
'Nbrhd-fairhaven' :   "Fair Haven",
'Nbrhd-fairhavenheights' :   "Fair Haven Heights",
'Nbrhd-hill' :   "Hill",
'Nbrhd-longwharf' :   "Long Wharf",
'Nbrhd-newhallville' :   "Newhallville",
'Nbhrd-other':   "Other",
'Nbrhd-prospecthill' :   "Prospect Hill",
'Nbrhd-quinnipiac' :   "Quinnipiac",
'Nbrhd-westriver' :   "West River",
'Nbrhd-westrock' :   "West Rock",
'Nbrhd-westville' :   "Westville",
'Nbrhd-woostersquare'   :   "Wooster Square/Mill River"
}

var mapCatNames = {
'Cat-all' : 'All',
'Cat-bins' : "Bins for Trash %26 Recycling",
'Cat-graffiti' : "Graffiti",
'Cat-hangers' : "Hangers",
'Cat-healthcomplaints' : "Health Complaints",
'Cat-illegaldumping' : "Illegal Dumping",
'Cat-other' : "Other",
'Cat-othercity' : "Other - city responsibility",
'Cat-parkingmeter' : "Parking Meter",
'Cat-parkingviolation' : 'Parking Violation/Abandoned Auto',
'Cat-parksreq' : "Parks Request",
'Cat-policing' : "Policing Issue",
'Cat-potholes' : "Potholes",
'Cat-privspace' : "Private Property Issue",
'Cat-pubspace' : "Public Space, Streets and Drains",
'Cat-sidewalks' : "Sidewalks and Curb damage",
'Cat-signs' : "Signs / Bus Shelters / Pavement Markings",
'Cat-streetlamps' : "Street Lamp",
'Cat-traffic' : "Traffic/Road Safety",
'Cat-signals' : "Traffic Signal / Pedestrian Signal",
'Cat-trashandrecycling' : "Trash %26 Recycling",
'Cat-treetrimming' : "Tree Trimming"
}

var cartoMapCatNames = {
'Cat-all' : 'All',
'Cat-bins' : "Bins for Trash & Recycling",
'Cat-graffiti' : "Graffiti",
'Cat-hangers' : "Hangers",
'Cat-healthcomplaints' : "Health Complaints",
'Cat-illegaldumping' : "Illegal Dumping",
'Cat-other' : "Other",
'Cat-othercity' : "Other - city responsibility",
'Cat-parkingmeter' : "Parking Meter",
'Cat-parkingviolation' : 'Parking Violation/Abandoned Auto',
'Cat-parksreq' : "Parks Request",
'Cat-policing' : "Policing Issue",
'Cat-potholes' : "Potholes",
'Cat-privspace' : "Private Property Issue",
'Cat-pubspace' : "Public Space, Streets and Drains",
'Cat-sidewalks' : "Sidewalks and Curb damage",
'Cat-signs' : "Signs / Bus Shelters / Pavement Markings",
'Cat-streetlamps' : "Street Lamp",
'Cat-traffic' : "Traffic/Road Safety",
'Cat-signals' : "Traffic Signal / Pedestrian Signal",
'Cat-trashandrecycling' : "Trash & Recycling",
'Cat-treetrimming' : "Tree Trimming"
}

var legendText = {
  'Vw-iss': 'Number of Issues',
  'Vw-ack': 'Percent of Issues Acknowledged',
  'Vw-cmp': 'Percent of Issues Closed',
  'Vw-ack-tm': 'Mean days to acknowledge',
  'Vw-cmp-tm': 'Mean days to close',
  'Vw-ack-tm-imp': 'Percent decrease in time to acknowledge',
  'Vw-cmp-tm-imp': 'Percent decrease in time to close'
}

var ttText = {
  'Vw-iss': 'Number of Issues',
  'Vw-ack': 'Percent Acknowledged',
  'Vw-cmp': 'Percent Closed',
  'Vw-ack-tm': 'Mean days',
  'Vw-cmp-tm': 'Mean days',
  'Vw-ack-tm-imp': 'Percent improvement',
  'Vw-cmp-tm-imp': 'Percent improvement'
}


var categories = [
  "Bins for Trash & Recycling",
  "Graffiti",
  "Hangers",
  "Health Complaints",
  "Illegal Dumping",
  "Other",
  "Other - city responsibility",
  "Parking Meter",
  "Parking Violation/Abandoned Auto",
  "Parks Request",
  "Policing Issue",
  "Potholes",
  "Private Property Issue",
  "Public Space, Streets and Drains",
  "Sidewalks and Curb damage",
  "Signs / Bus Shelters / Pavement Markings",
  "Street Lamp",
  "Traffic/Road Safety",
  "Traffic Signal / Pedestrian Signal",
  "Trash & Recycling",
  "Tree Trimming"
]

var catlabels = ['Bins', 'Graffiti', 'Hangers', 'Health',
                 'Dumping', 'Other', 'City Request', 'Parking Meter',
                 'Parking Violation', 'Parks', 'Policing', 'Potholes',
                 'Private Property', 'Public Space',
                 'Sidewalks', 'Signs', 'Street Lamps',
                 'Traffic', 'Signals', 'Trash', 'Trees']

console.log(neighborhoods);
console.log(' ');
console.log(categories);

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
           ttText[vw] + ": " + d.count + "<br />";
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

var angular_rotation = -45 / 180 * Math.PI;

var init_ack_start_angle = angular_rotation,
    init_ack_end_angle = angular_rotation,
    init_cmp_start_angle = angular_rotation,
    init_cmp_end_angle = angular_rotation;

function roundToOne(num) {    
    return +(Math.round(num + "e+1")  + "e-1");
}

function plotHeatmap() {

if (window.location.hostname == "newhavenreportcard.com") {
  prefix = "http://newhavenreportcard.com/"
} else {
  prefix = "http://localhost/nhrc2/"
}

console.log(prefix+"php/HeatmapData.php?tmCovrg="+tmCvrg+"&begDate="+begDate+"&endDate="+endDate+"&ctgry="+mapCatNames[ctgry]+"&nbrhd="+mapNbrhdNames[nbrhd]);
d3.json(prefix+"php/HeatmapData.php?tmCovrg="+tmCvrg+"&begDate="+begDate+"&endDate="+endDate+"&ctgry="+mapCatNames[ctgry]+"&nbrhd="+mapNbrhdNames[nbrhd], function(error, data) {
  if (error) return console.warn(error);

  /* 
    loop through data binning in neighborhood and category.
     also keep track of the number of issues that were not 
     acknowledged or completed
  */
  //setup the nested objects to store the summed data:
  var heatdata = new Object();
  var ackdata = new Object();
  var cmpdata = new Object();
  var acktimsum = new Object();
  var cmptimsum = new Object();
  var emptlist = [];

  for (i = 0; i < neighborhoods.length; i++) {
    heatdata[neighborhoods[i]] = {};
    ackdata[neighborhoods[i]] = {};
    cmpdata[neighborhoods[i]] = {};
    acktimsum[neighborhoods[i]] = {};
    cmptimsum[neighborhoods[i]] = {};

    for (j = 0; j < categories.length; j++) {
      heatdata[neighborhoods[i]][categories[j]] = 0;
      ackdata[neighborhoods[i]][categories[j]] = 0;
      cmpdata[neighborhoods[i]][categories[j]] = 0;
      acktimsum[neighborhoods[i]][categories[j]] = 0;
      cmptimsum[neighborhoods[i]][categories[j]] = 0;
    }
  }

  var not_acknowledged_count = 0;
  var not_completed_count = 0;
  for (idx = 0; idx < data.length; idx++) {
    heatdata[data[idx]['neighborhood']][data[idx]['category']] += 1;
    if (data[idx]['acknowledged_at'] == null) {
      not_acknowledged_count++;
    } else {
      ackdata[data[idx]['neighborhood']][data[idx]['category']] += 1;  
      acktimsum[data[idx]['neighborhood']][data[idx]['category']] += +(data[idx]['time_to_ack']);
    }
    if (data[idx]['closed_at'] == null) {
      not_completed_count++;
    } else {
      cmpdata[data[idx]['neighborhood']][data[idx]['category']] += 1;
      cmptimsum[data[idx]['neighborhood']][data[idx]['category']] += +(data[idx]['time_to_cmp']);
    }
    
  }

  console.log('Number of issues: ' + data.length);
  //number of issues acknowledged:
  var num_ack = data.length - not_acknowledged_count;
  //percent acknowledged:
  var perc_ack = Math.round(num_ack/data.length * 100., 1);
  console.log(perc_ack + '% of issues acknowledged: ' + num_ack);

  //number of issues completed:
  var num_comp = data.length - not_completed_count;
  //percent completed:
  var perc_comp = Math.round(num_comp/data.length * 100., 1);

  console.log(perc_comp + '% of issues completed: ' + num_comp);

  var heatdataout = {};
  var neighborhoodarr = [];
  var categoriesarr = [];
  var issuecountarr = [];
  var heatdataarr = [];


  for (i = 0; i < neighborhoods.length; i++) {
    for (j = 0; j < categories.length; j++) {

      switch(vw) {
        case 'Vw-iss':
          count = heatdata[neighborhoods[i]][categories[j]];
          break;
        case 'Vw-ack':
          count = roundToOne(ackdata[neighborhoods[i]][categories[j]] / 
                  heatdata[neighborhoods[i]][categories[j]] * 100.);
          break;
        case 'Vw-cmp':
          count = roundToOne(cmpdata[neighborhoods[i]][categories[j]] / 
                  heatdata[neighborhoods[i]][categories[j]] * 100.);
          break;
        case 'Vw-ack-tm':
          count = acktimsum[neighborhoods[i]][categories[j]] /
                  ackdata[neighborhoods[i]][categories[j]];
          break;
        case 'Vw-cmp-tm':
          count = cmptimsum[neighborhoods[i]][categories[j]] /
                  cmpdata[neighborhoods[i]][categories[j]];
          break;
        case 'Vw-ack-tm-imp':
          count = 0;
          break;
        case 'Vw-cmp-tm-imp':
          count = 0;
          break;
      }

      neighborhoodarr.push(i);
      categoriesarr.push(j);
      issuecountarr.push(heatdata[neighborhoods[i]][categories[j]]);
      heatdataarr.push({'neighborhoodnum': i,
                        'categorynum': j, 
                        'count': count,
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
  var acknowledged_frac = 1 - not_acknowledged_count/data.length;
  var completed_frac = 1 - not_completed_count/data.length;

  var new_ack_start_angle = -1 * acknowledged_frac/2. * twoPi + angular_rotation;
  var new_ack_end_angle = acknowledged_frac/2. * twoPi + angular_rotation;
  var new_cmp_start_angle = -1 * completed_frac/2. * twoPi + angular_rotation;
  var new_cmp_end_angle = completed_frac/2. * twoPi + angular_rotation;

  var arc2 = d3.svg.arc()
      .startAngle(angular_rotation)
      .innerRadius(80)
      .outerRadius(90)
      .endAngle(angular_rotation);

  var meter2 = svg2.append("g")
      .attr("class", "progress-meter");

  //remove the old acknowledged-donut it if exists:
  d3.selectAll('.acknowledged-donut')
    .remove();

  var ackdonut = meter2.append("path")
      .attr("class", "acknowledged-donut")
      .attr("d", arc2)
      .on('mouseover', function() {
          perctext
              .classed('issue-ack-perc-text', true)
              .text(Math.round(acknowledged_frac * 100., 1) + "%");
          perctextlabel
            .classed('issue-ack-perc-label', true)
            .text("acknowledged");
      })
      .on('mouseout', function() {
          perctext
            .classed('issue-ack-perc-text', false)
            .text(data.length);
          perctextlabel
            .classed('issue-ack-perc-label', false)
            .text("issues");
      });

  //do a transition when the data change:
  ackdonut.transition().duration(750).attrTween("d", arc2Tween);

  //a function for the custom transition for the acknowledged arc
  //donut (the orange one):
  function arc2Tween() {
    var i = d3.interpolate(init_ack_start_angle, new_ack_start_angle);
    var j = d3.interpolate(init_ack_end_angle, new_ack_end_angle);
    return function(t) {
      if (t == 1) {
        //now that the transition has finished, update the initial
        //value for next time:
        init_ack_start_angle = new_ack_start_angle;
        init_ack_end_angle = new_ack_end_angle;
      }
      return arc2.startAngle(i(t))
                .endAngle(j(t))();
    };
  }

  var arc3 = d3.svg.arc()
      .startAngle(new_cmp_start_angle)
      .innerRadius(90)
      .outerRadius(100)
      .endAngle(completed_frac/2. * twoPi + angular_rotation);

  var meter3 = svg2.append("g")
      .attr("class", "progress-meter");

  //remove the old acknowledged-donut it if exists:
  d3.selectAll('.completed-donut')
    .remove();

  var compdonut = meter3.append("path")
      .attr("class", "completed-donut")
      .attr("d", arc3)
      .on('mouseover', function() {
          perctext
              .classed('issue-cmp-perc-text', true)
              .text(Math.round(completed_frac * 100., 1) + "%");
          perctextlabel
            .classed('issue-cmp-perc-label', true)
            .text("completed");
      })
      .on('mouseout', function() {
          perctext
            .classed('issue-cmp-perc-text', false)
            .text(data.length);
          perctextlabel
            .classed('issue-cmp-perc-label', false)
            .text("issues");
      });

  compdonut.transition().duration(750).attrTween("d", arc3Tween);

  function arc3Tween() {
    var i = d3.interpolate(init_cmp_start_angle, new_cmp_start_angle);
    var j = d3.interpolate(init_cmp_end_angle, new_cmp_end_angle);
    return function(t) {
      if (t == 1) {
        //now that the transition has finished, update the initial
        //value for next time:
        init_cmp_start_angle = new_cmp_start_angle;
        init_cmp_end_angle = new_cmp_end_angle;
      }
      return arc3.startAngle(i(t))
                .endAngle(j(t))();
    };
  }
  
  perctext.text(data.length);
  perctextlabel.text("issues");

  var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(heatdataarr, function (d) { return d.count; })])
        .range(colors);

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
        .data(heatdataarr);

    heatMap.data(heatdataarr)
      .exit()
      .transition()
      .duration(750)
      .style("fill", colors[0])
      .remove();

    heatMap
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


    
    heatMap.transition().duration(750)
        .style("fill", function(d) { return colorScale(d.count); });

    //heatMap.append("text").text(function(d) { return d.count; });

    d3.selectAll(".legend")
      .remove();

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

    d3.selectAll(".legend-cell-text")
      .remove();

    legend.append("text")
      .attr("class", "mono legend-cell-text")
      .text(function(d) { return "≥ " + Math.round(d); })
      .attr("x", function(d, i) { return legendElementWidth * i + 15; })
      .attr("y", height + gridSize - 20);

    legend.append("text")
      .attr("class", "mono")
      .text(legendText[vw])
      .attr("x", legendElementWidth * 2.5)
      .attr("y", height + 25);

});
};

window.onload = plotHeatmap();