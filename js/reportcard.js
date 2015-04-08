$(document).ready(function () {
    $('.tmcov-opt').click(function() {
        $('.tmcov-opt').removeClass('active-tmcov');
        console.log('time option clicked!');

        var $this = $(this);
        if (!$this.hasClass('active-tmcov')) {
            $this.addClass('active-tmcov');
        }
        console.log($(this).attr('id'));
        if ($(this).attr('id') == 'Tm-Cvrg-All') {
            endDateObj = moment();
            begDateObj = moment("2008-03-28");
            tmCvrg = 'Tm-Cvrg-All';
        }
        if ($(this).attr('id') == 'Tm-Cvrg-Yr') {
            endDateObj = moment();
            begDateObj = moment();
            begDateObj = begDateObj.days(-365);
            tmCvrg = 'Tm-Cvrg-Yr';
        }
        if ($(this).attr('id') == 'Tm-Cvrg-Mnth') {
            endDateObj = moment();
            begDateObj = moment();
            begDateObj = begDateObj.days(-30);
            tmCvrg = 'Tm-Cvrg-Mnth';
        }
        if ($(this).attr('id') == 'Tm-Cvrg-Wk') {
            endDateObj = moment();
            begDateObj = moment();
            begDateObj = begDateObj.days(-7);
            tmCvrg = 'Tm-Cvrg-Wk';
        }

        plotHeatmap();

    });

});

//Default is to plot all data. The first issue was from 2008-03-29:
var tmCvrg = 'Tm-Cvrg-All';
var endDateObj = moment();
var begDateObj = moment("2008-03-28");

var begDate = begDateObj.format('YYYY-MM-DDTHH:mm:ss');
var endDate = endDateObj.format('YYYY-MM-DDTHH:mm:ss');

