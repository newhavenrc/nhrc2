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
            begDateObj = moment();
            begDateObj = begDateObj.days(-365);
            begDate = begDateObj.format('YYYY-MM-DD');
            endDate = endDateObj.format('YYYY-MM-DD');
            console.log('report.js registered a Past Year click!');
            console.log('begDate is: ' + begDate);
            console.log('endDate is: ' + endDate);

            tmCvrg = 'Tm-Cvrg-Yr';
        }
        if ($(this).attr('id') == 'Tm-Cvrg-Mnth') {
            endDateObj = moment();
            begDateObj = moment();
            begDateObj = begDateObj.days(-30);
            begDate = begDateObj.format('YYYY-MM-DD');
            endDate = endDateObj.format('YYYY-MM-DD');
            console.log('report.js registered a Past Month click!');
            tmCvrg = 'Tm-Cvrg-Mnth';
        }
        if ($(this).attr('id') == 'Tm-Cvrg-Wk') {
            endDateObj = moment();
            begDateObj = moment();
            begDateObj = begDateObj.days(-7);
            begDate = begDateObj.format('YYYY-MM-DD');
            endDate = endDateObj.format('YYYY-MM-DD');
            console.log('report.js registered a Past Week click!');
            tmCvrg = 'Tm-Cvrg-Wk';
        }

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
    });

});

//Default is to plot all data. The first issue was from 2008-03-29:
var tmCvrg = 'Tm-Cvrg-All';
var ctgry = 'Cat-all';
var nbrhd = 'Nbrhd-all';
var endDateObj = moment();
var begDateObj = moment("2008-03-28");

var begDate = begDateObj.format('YYYY-MM-DDTHH:mm:ss');
var endDate = endDateObj.format('YYYY-MM-DDTHH:mm:ss');

