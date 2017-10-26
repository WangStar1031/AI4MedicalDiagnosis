/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.mail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('mail', {
          url: '/mail',
          templateUrl: 'app/pages/components/mail/mail.html',
          controller: "MailTabCtrl",
          controllerAs: "tabCtrl",
          title: 'Doctor Mail',
          sidebarMeta: {
            icon: 'ion-email',
            order: 100,
          },
        }).state('mail.label', {
          url: '/:label',
          templateUrl: 'app/pages/components/mail/list/mailList.html',
          title: 'Mail',
          controller: "MailListCtrl",
          controllerAs: "listCtrl"
        }).state('mail.detail', {
          url: '/:label/:id',
          templateUrl: 'app/pages/components/mail/detail/mailDetail.html',
          title: 'Mail',
          controller: "MailDetailCtrl",
          controllerAs: "detailCtrl"
        });
    $urlRouterProvider.when('/mail','/mail/inbox');
  }

})();
