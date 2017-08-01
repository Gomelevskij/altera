$(document).ready(function() {

    // Init fullpage script
    $('#fullpage-investors').fullpage({
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        anchors:['section1', 'section2', 'section3', 'section4', 'section5', 'section6'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        // normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null
    });

    // Init circle to main screen
    var Circle = function(sel){
        var circles = document.querySelectorAll(sel);
        [].forEach.call(circles,function(el){
            var valEl = parseFloat(el.innerHTML);
            valEl = valEl*408/100;
            el.innerHTML = '<svg width="65" height="65" viewBox="0 0 150 160"><circle transform="rotate(-90)" r="65" cx="-80" cy="80" /><circle transform="rotate(-90)" style="stroke-dasharray:'+valEl+'px 408px;" r="65" cx="-80" cy="80" /></svg>';

        });
    };
    Circle('.circle');

    $('.scroll-btn.back-top').click(function() {
       $('#menu li[data-menuanchor="section1"]').trigger('click');
    });

    // Tabs
    $(".tabs>a").click( function () {

        $(".tabs>a").removeClass("active");
        $(this).addClass("active");

        $(".tabs-content>div").hide();
        var t_content=$(this).attr("href");
        $(t_content).show();

        return false;
    });


    // Control windows to screen two block bizness
    $('.invest-control__item').click(function() {
       $('.main-control').hide();
       $('.tabs-content_item').hide();
        $(".tabs>a").removeClass("active");
       $('.control-container').fadeIn("slow");
        var t_content=$(this).find("a").attr("href");
        $(".tabs>a[href='" + t_content + "']").addClass("active");
        $(t_content).show();
    });

    // noUiSlider init
    var rangeSlider = document.getElementById('rangeSlider'),
        rangeSliderValueElement = document.getElementById('sliderVal');

    noUiSlider.create(rangeSlider, {
        start: [ 0, 700000 ],
        connect: true,
        range: {
            'min': [  500000 ],
            'max': [ 50000000 ]
        }
    });

    rangeSlider.noUiSlider.on('update', function( values, handle ) {

        var num = Math.round(values[handle]);
        formatNumber(num, '-');

    });

    rangeSlider.noUiSlider.on('end', function( values, handle ) {

        console.log('oбновление графика');
        var val = Math.round(values[handle]);
        var x1 =  val;
        var x2 =  val;
        var x3 =  val;
        var x4 =  val;
        var x5 =  val;
        var x6 =  val;
        var x7 =  val;
        updateChartFirst(x1, x2, x3, x4, x5, x6, x7);
        updateChartSeccond(x1, x2, x3, x4, x5, x6, x7);
        updateChartThree(x1, x2, x3, x4, x5, x6, x7);

    });

    /**
     * Formats number like 100000000 => 100 000 000
     * @param x - number - source tah will be formatted;
     * @param gag - string - will be returned if x is not number;
     * @returns {string}
     */
    function formatNumber(x, gag) {
        if (!x) return gag || '';
        const parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        rangeSliderValueElement.innerHTML = parts + " <span class='rub'></span>";
    }

    // Chart
    var chart;
    initChart();
    function initChart() {
        chart = Highcharts.chart('container', {
            chart: {
                type: 'areaspline'
            },
            xAxis: {
                categories: [
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018',
                    '2019',
                    '2020'
                ]
            },
            credits: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [{
                data: [0, 40, 30, 50, 40, 10, 40]
            },
            {
                data: [0, 10, 20, 30, 40, 30, 20]
            },
            {
                data: [0, 0, 0, 10, 30, 40, 20 ]
            }]
        });
    }

    function updateChartFirst(x1, x2, x3, x4, x5, x6, x7) {
        chart.series[0].data[0].update(x1);
        chart.series[0].data[1].update(x2);
        chart.series[0].data[2].update(x3);
        chart.series[0].data[3].update(x4);
        chart.series[0].data[4].update(x5);
        chart.series[0].data[5].update(x6);
        chart.series[0].data[6].update(x7);
    }

    function updateChartSeccond(x1, x2, x3, x4, x5, x6, x7) {
        chart.series[1].data[0].update(x1 + 3);
        chart.series[1].data[1].update(x2 + 5);
        chart.series[1].data[2].update(x3 + 3);
        chart.series[1].data[3].update(x4 + 6);
        chart.series[1].data[4].update(x5 + 43);
        chart.series[1].data[5].update(x6 + 2);
        chart.series[1].data[6].update(x7 + 2);
    }

    function updateChartThree(x1, x2, x3, x4, x5, x6, x7) {
        chart.series[1].data[0].update(x1 + 5);
        chart.series[1].data[1].update(x2 + 43);
        chart.series[1].data[2].update(x3 + 3);
        chart.series[1].data[3].update(x4 + 3);
        chart.series[1].data[4].update(x5 + 23);
        chart.series[1].data[5].update(x6 + 23);
        chart.series[1].data[6].update(x7 + 25);
    }

});
