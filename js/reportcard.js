$(document).ready(function () {
    $('.tmcov-opt').click(function() {
        $('.tmcov-opt').removeClass('active-tmcov');
        $('.tmcov-opt').find("a").removeClass('active-tmcov-link');

        console.log('time option clicked!');

        var $this = $(this);
        if (!$this.hasClass('active-tmcov')) {
            $this.addClass('active-tmcov');
            $this.find("a").addClass('active-tmcov-link');
        }
        console.log($(this).attr('id'));
        if ($(this).attr('id') == 'Tm-Cvrg-All') {
            endDateObj = moment();
            begDateObj = moment("2008-03-28");
            begDate = begDateObj.format('YYYY-MM-DD');
            endDate = endDateObj.format('YYYY-MM-DD');
            console.log('report.js registered a Time Coverage ALL click!');
            tmCvrg = 'Tm-Cvrg-All';
        }
        if ($(this).attr('id') == 'Tm-Cvrg-Yr') {
            endDateObj = moment();
            begDateObj = moment().subtract(1, 'years');
            begDate = begDateObj.format('YYYY-MM-DD');
            endDate = endDateObj.format('YYYY-MM-DD');
            console.log('report.js registered a Past Year click!');
            console.log('begDate is: ' + begDate);
            console.log('endDate is: ' + endDate);

            tmCvrg = 'Tm-Cvrg-Yr';
        }
        if ($(this).attr('id') == 'Tm-Cvrg-Mnth') {
            endDateObj = moment();
            begDateObj = moment().subtract(1, 'months');
            begDate = begDateObj.format('YYYY-MM-DD');
            endDate = endDateObj.format('YYYY-MM-DD');
            console.log('report.js registered a Past Month click!');
            tmCvrg = 'Tm-Cvrg-Mnth';
        }
        if ($(this).attr('id') == 'Tm-Cvrg-Wk') {
            endDateObj = moment();
            begDateObj = moment().subtract(7, 'days');
            begDate = begDateObj.format('YYYY-MM-DD');
            endDate = endDateObj.format('YYYY-MM-DD');
            console.log('report.js registered a Past Week click!');
            tmCvrg = 'Tm-Cvrg-Wk';
        }

        console.log('current date: ', moment().format('YYYY-MM-DD'));
        console.log("new beginning date: ", begDate);
        console.log("new end date: ", endDate);
        plotHeatmap();
        $('#cartodbmapspot').empty();
        makemap();

    });

    $('.ctg-opt').click(function() {
        $('.ctg-opt').removeClass('active-cat');
        $('.ctg-opt').find("a").removeClass('active-cat-link');

        console.log('category option clicked!');

        var $this = $(this);
        if (!$this.hasClass('active-cat')) {
            $this.addClass('active-cat');
            $this.find("a").addClass('active-cat-link');
        }
        console.log($(this).attr('id'));
        ctgry = $(this).attr('id')

        console.log('now remaking heatmap!');
        plotHeatmap();
        $('#cartodbmapspot').empty();
        makemap();

    });

    $('.nbrhd-opt').click(function() {
        $('.nbrhd-opt').removeClass('active-nbrhd');
        $('.nbrhd-opt').find("a").removeClass('active-nbrhd-link');

        console.log('neighborhood option clicked!');

        var $this = $(this);
        if (!$this.hasClass('active-nbrhd')) {
            $this.addClass('active-nbrhd');
            $this.find("a").addClass('active-nbrhd-link');
        }
        console.log($(this).attr('id'));
        nbrhd = $(this).attr('id')

        plotHeatmap();
        $('#cartodbmapspot').empty();
        makemap();

    });

    $('.vw-opt').click(function() {
        $('.vw-opt').removeClass('active-vw');
        $('.vw-opt').find("a").removeClass('active-vw-link');

        console.log('neighborhood option clicked!');

        var $this = $(this);
        if (!$this.hasClass('active-vw')) {
            $this.addClass('active-vw');
            $this.find("a").addClass('active-vw-link');
        }
        console.log($(this).attr('id'));
        vw = $(this).attr('id')

        plotHeatmap();
        $('#cartodbmapspot').empty();
        makemap();

    });

});

//Default is to plot all data. The first issue was from 2008-03-29:
var tmCvrg = 'Tm-Cvrg-All';
var ctgry = 'Cat-all';
var nbrhd = 'Nbrhd-all';
var endDateObj = moment();
var begDateObj = moment("2008-03-28");

var begDate = begDateObj.format('YYYY-MM-DD');
var endDate = endDateObj.format('YYYY-MM-DD');

