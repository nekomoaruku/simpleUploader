var app = angular.module('simpleUploader', ['ui.router', 'angularFileUpload']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$sceDelegateProvider',
  function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://localhost:3000/proverbs'
    ]);

    // For any unmatched url
    $urlRouterProvider.otherwise('/quiz');

    // Setting up router
    $stateProvider
      .state('quiz', {
        url: '/quiz',
        views: {
          'list@': {
            templateUrl: 'states/quiz/quizList.html',
            controller: 'quizListCtrl'
          },
          'detail@': {
            templateUrl: 'states/quiz/quizDetail.html',
            controller: 'quizDetailCtrl'
          }
        },
        resolve: {
          initProverbQuizManager: ['proverbQuizManager', function(proverbQuizManager) {
            return proverbQuizManager.initProverbQuizManager();
          }]
        }
      });
  }
]);