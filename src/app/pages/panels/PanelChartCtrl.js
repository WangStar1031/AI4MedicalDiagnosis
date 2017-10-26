/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.panels')
      .controller('PanelChartCtrl', PanelChartCtrl);

  var panel_data_chart = [];
  var line_server_data = [];
  var check_init = false;
  var panelChart = null;
  var firstDate = new Date(2012, 0, 1);
  firstDate.setDate(firstDate.getDate() - 1000);
  firstDate.setHours(0, 0, 0, 0);
  
  for( var i = 0; i < 40; i++)
      panel_data_chart.push({ "date": "", "alfa": 300, "beta": 300, "teta": 300 });

  function __get_dataset_for_chart() {
    panel_data_chart.unshift(line_server_data[0]);
    panel_data_chart.pop();
    line_server_data.shift();
    for( var i = 0; i < panel_data_chart.length; i++)
    { 
      var newDate = new Date(firstDate);
      newDate.setHours(0, i, 0, 0);
      panel_data_chart[i].date = newDate;
    }
    return panel_data_chart;
  }

  /** @ngInject */
  function PanelChartCtrl($scope, baConfig, $element, layoutPaths) {
    if(check_init) return;
    if(!($element[0].getAttribute('id'))) return;
    check_init = true;

    setInterval(function(){
      $.get("http://127.0.0.1:8080/grafico/rest/eeg_get", {}, function(response){
        if( line_server_data.length >= 40) return;
        for(var i=0; i< response.valueAlfaList.length; i++)
            line_server_data.push( { "date": "", "alfa": response.valueAlfaList[i], "beta": response.valueBetaList[i], "teta": response.valueTetaList[i] } );
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
    var elem = $(".amcharts-scrollbar-chart-div");
    if( elem )
      elem.css("display","none");
    if(panelChart != null && $("#panelChart").html() != ""){
      panelChart.dataProvider = __get_dataset_for_chart();
      panelChart.validateData();
    } else {
      panelChart = AmCharts.makeChart(id, {
        type: "stock",
        categoryAxesSettings: {
          minPeriod: "mm"
        },
        dataSets: [{
          color: "#ff0000",
          fieldMappings: [{
            fromField: "alfa",
            toField: "alfa"
          }, {
            fromField: "beta",
            toField: "beta"
          }, {
            fromField: "teta",
            toField: "teta"
          }],
          dataProvider: __get_dataset_for_chart(),
          categoryField: "date"
        }],
        panels: [{
          showCategoryAxis: false,
          percentHeight: 34,
          stockGraphs: [{
            valueField: "alfa",
          }],
        },
        {
          showCategoryAxis: false,
          percentHeight: 33,
          stockGraphs: [{
            valueField: "beta",
          }],
        },
        {
          showCategoryAxis: false,
          percentHeight: 33,
          stockGraphs: [{
            valueField: "teta",
          }],
        }],
      });
    }
  }

})();
