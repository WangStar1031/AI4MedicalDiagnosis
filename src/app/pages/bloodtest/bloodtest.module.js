/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bloodtest', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('bloodtest', {
          url: '/bloodtest',
          templateUrl: 'app/pages/bloodtest/tables.html',
          controller: 'TablesPageCtrl',
          title: 'Blood Test',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        });
  }

})();
