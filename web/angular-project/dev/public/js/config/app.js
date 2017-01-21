var smart_currency = angular.module('smart_currency', ['ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

        $urlRouterProvider.otherwise('/send');

        $stateProvider.state('send', {
            url: '/send',
            templateUrl: 'partials/send-partial.html',
            controller: 'SendController'
        })

        .state('accept', {
            url: '/accept',
            templateUrl: 'partials/accept-partial.html',
            controller: 'AcceptController'
        });

        $mdThemingProvider.theme('docs-dark', 'default')
          .primaryPalette('pink')
          .dark();
    }]);
})(smart_currency);
