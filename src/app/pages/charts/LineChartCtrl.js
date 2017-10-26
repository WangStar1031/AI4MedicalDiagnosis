/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts')
      .controller('LineChartCtrl', LineChartCtrl);

  var line_data_chart = [];
  var line_server_data = [];
  var check_init = false;
  var lineChart = null;
  for( var i = 0; i <40; i++){
    var item_obj = {};
    item_obj.value = 300;
    line_data_chart.push(item_obj);
  }
  function __get_dataset_for_chart() {
    line_data_chart.unshift(line_server_data[0]);
    line_data_chart.pop();
    line_server_data.shift();
    return line_data_chart;
  }

  /** @ngInject */
  function LineChartCtrl($scope, baConfig, $element, layoutPaths) {
    if(check_init) return;
    if(!($element[0].getAttribute('id'))) return;
    check_init = true;

    setInterval(function(){
      $.get("http://127.0.0.1:8080/grafico/rest/ecg_get", {}, function(response){
        if( line_server_data.length >= 40) return;
        for(var i=0; i<response.valueList.length; i++){
          var item_obj = {};
          item_obj.value = response.valueList[i];
          line_server_data.push( item_obj);
        }     
      });
    }, 700);
    setTimeout(function(){
      setInterval( function(){
        __DrawChart($scope, baConfig, $element, layoutPaths);
      }, 100);
    }, 1000);
  }

  function __DrawChart($scope, baConfig, $element, layoutPaths){
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    if(!(id)) return;
    if($("#"+id).length == 0) return;
    // console.log(lineChart);
    var elem = $("#lineChart");
    if(lineChart != null && elem.html() != ""){
      // console.log("Recall");
      lineChart.dataProvider = __get_dataset_for_chart();
      lineChart.validateData();
    } else {
      // console.log("INitail");
    lineChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      marginTop: 0,
      marginRight: 15,
      dataProvider: __get_dataset_for_chart(),
      valueAxes: [
        {
          autoGridCount: false,
          gridCount: 20,
          labelFrequency: 1,
          axisAlpha: 0,
          position: 'left',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
        }
      ],
      graphs: [
        {
          id: 'g1',
          balloonText: '[[value]]',
          bullet: '',//previous 'round'
          bulletSize: 8,
          lineColor: layoutColors.danger,
          lineThickness: 1,
          negativeLineColor: layoutColors.warning,
          type: 'line',
          valueField: 'value'
        }
      ],
      categoryField: 'year',
      categoryAxis: {
        labelsEnabled: false
      },
      export: {
        enabled: true
      },
      allLabels: [{
        "text": "Value axis",
        "rotation": 270,
        "x": "0",
        "y": "0",
        "width": "100%",
        "size": 15,
        "bold": false,
        "align": "right"
      }],
      creditsPosition: 'bottom-right',
      pathToImages: layoutPaths.images.amChart
    });
  }
  }

})();
