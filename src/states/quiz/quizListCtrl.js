(function() {

  var quizInitialValue = {
    id: '001000',
    sheet: 1,
    number: 0,
    isTestMode: false
  };

  var quizListCtrl = function($scope, proverbQuizManager) {

    // 初期値
    var quizList = $scope.quizList = proverbQuizManager.data.quizList;

    // proverbQuizManagerのdata変数の変更を監視
    $scope.$watch(function(){ return proverbQuizManager.data }, function(newValue) {
      $scope.quizList = newValue.quizList;
    }, true);

    // クイズを選択
    $scope.selectQuiz = function(quiz) {
      console.log(quiz);
      if (quiz) {
        proverbQuizManager.data.selectedQuiz = angular.copy(quiz);
      } else {
        proverbQuizManager.data.selectedQuiz = angular.copy(quizInitialValue);
        proverbQuizManager.data.selectedQuiz.exampleImageData = 'data:image/png;base64,';
      }
    }
  };

  app.controller('quizListCtrl', ['$scope', 'proverbQuizManager', quizListCtrl]);

})();