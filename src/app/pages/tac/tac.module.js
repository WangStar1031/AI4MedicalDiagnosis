/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tac', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('tac', {
          url: '/tac',
          templateUrl: 'app/pages/tac/tac.html',
          controller: 'TACCtrl',
          title: 'TAC',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 170,
          },
        });
  }

})();
