(function() {

  var quizDetailCtrl = function($scope, inputImageUtil, proverbQuizManager) {

    // 初期値
    var quiz = $scope.quiz = proverbQuizManager.data.selectedQuiz;
    var quizList = $scope.quizList = proverbQuizManager.data.quizList;

    // proverbQuizManagerのdata変数の変更を監視
    $scope.$watch(function(){ return proverbQuizManager.data }, function(newValue) {
      $scope.quiz = newValue.selectedQuiz;
      $scope.quiz.id =
        ('00' + newValue.selectedQuiz.sheet).slice(-3) + ('00' + newValue.selectedQuiz.number).slice(-3);
    }, true);

    // 事例用画像選択時のイベント
    $scope.onFileSelect = function($files) {
      var imageFile = $files[0];
      inputImageUtil.read(imageFile)
        .then(function(imageData) {
          $scope.quiz.exampleImageData = imageData;
          console.log(imageData);
        });
    };

    // submit
    $scope.submitQuiz = function() {
      console.log('uuuu');
      proverbQuizManager.putQuiz()
        .success(function() {
          proverbQuizManager.updateQuizList();
        })
        .error(function(error) {
        });
    }

  };

  app.controller('quizDetailCtrl', ['$scope', 'inputImageUtil', 'proverbQuizManager', quizDetailCtrl]);

})();