/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bloodtest')
      .controller('TablesPageCtrl', TablesPageCtrl);

  /** @ngInject */
  function TablesPageCtrl($scope, $filter, editableOptions, editableThemes) {
    $scope.metricsTableData = [
      {
        title: 'ESAME EMOCROMOCITOMETRICO',
        subtitle: 'Beckman-Coulter',
        risulato: 'VEDI ALLEGATO',
        um: '',
        valori: '',
      },{
        title: 'CREATININA',
        subtitle: 'Metodo Colorimetrico',
        risulato: '0,92',
        um: 'mg/dL',
        valori: '0.7 - 1,3',
      },{
        title: 'COLESTEROLO TOTALE',
        subtitle: 'Metodo Bicromatico',
        risulato: '161',
        um: 'mg/dL',
        valori: '140 - 220',
      },{
        title: 'COLESTEROLO HDL',
        subtitle: 'Metodo Diretto',
        risulato: '62',
        um: 'mg/dL',
        valori: '30 - 70<br>Nessuna protezione < 35<br>Protezione carente 35 - 60<br>Protezione elevala > 60',
      },{
        title: 'TRIGLICERIDI',
        subtitle: 'Metodo Enzimalico',
        risulato: '42',
        um: 'mg/dL',
        valori: '6 - 200',
      },{
        title: 'TRANSAMINASI GOT/AST',
        subtitle: 'Metodo Cinetico',
        risulato: '25',
        um: 'U/L',
        valori: '0 - 37',
      },{
        title: 'TRANSAMINASI GOT/ALT',
        subtitle: 'Metodo Cinetico',
        risulato: '23',
        um: 'U/L',
        valori: '0 - 41',
      },{
        title: 'SODIO',
        subtitle: 'ISE',
        risulato: '145',
        um: 'mEq/l',
        valori: '136 - 145',
      },{
        title: 'POTASSIO',
        subtitle: 'ISE',
        risulato: '5,03',
        um: 'mEq/l',
        valori: '3.5 — 5.1',
      },{
        title: 'PROTEINE TOTALI',
        subtitle: 'Melodo Colorimetrico - Biureto',
        risulato: '7,20',
        um: 'g/dL',
        valori: '6,4 - 8.3',
      },{
        title: 'ELETTROFORESI PROTEICA VEDI',
        subtitle: 'Elellroforelico',
        risulato: 'ALLEGATO',
        um: '',
        valori: '',
      },
    ];
  }

})();
