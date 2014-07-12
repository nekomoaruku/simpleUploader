(function() {

  var quizInitialValue = {
    id: '001000',
    sheet: 1,
    number: 0
  };

  var proverbQuizManager = function($http, $q) {

    var apiServer = 'http://localhost:3000/proverbs';

    // コントローラー間で共有したいため、dataという変数で持つ。
    // コントローラー側でdataを$watchすることで変更を監視できる。
    var data = {
      selectedQuiz: quizInitialValue,
      quizList: []
    };

    // 初期化メソッド。初期化します。
    function initProverbQuizManager() {
      var promise = $q.all([
        $http.get(apiServer)
      ]).then(function(res) {
        var quizListJson = res[0].data;
        quizListJson.forEach(function(json) {
          data.quizList.push(_parseQuizJson(json.dataJson));
        });
      });

      return promise;
    }

    // サーバーにクイズを登録する
    function putQuiz() {

      var rowData = data.selectedQuiz;

      var postData = {
        id: rowData.id,
        sheet: parseInt(rowData.sheet),
        number: parseInt(rowData.number),
        proverb: rowData.proverb,
        quiz: rowData.quiz,
        choices: [
          _splitChoiceStr(rowData.choice0),
          _splitChoiceStr(rowData.choice1),
          _splitChoiceStr(rowData.choice2),
          _splitChoiceStr(rowData.choice3)
        ],
        rightChoiceIndex: parseInt(rowData.rightChoiceIndex),
        example: rowData.example,
        exampleImageData: rowData.exampleImageData
      };

      return $http.post(apiServer, postData);

      function _splitChoiceStr(choiceStr) {
        return choiceStr.split(',');
      }
    }

    // クイズ一覧を取得します
    function updateQuizList() {
      $http.get(apiServer)
        .success(function(response) {
          data.quizList = [];
          response.forEach(function(quizJson) {
            data.quizList.push(_parseQuizJson(quizJson.dataJson));
          });
        });
    }

    // 便利メソッド1。サーバーから受け取ったJSONを、
    // HTML上で表示・編集出来る形式にパースします。
    function _parseQuizJson(quizJson) {
      var quiz = JSON.parse(quizJson);
      var joinChar = ',';
      quiz.choice0 = quiz.choices[0].join(joinChar);
      quiz.choice1 = quiz.choices[1].join(joinChar);
      quiz.choice2 = quiz.choices[2].join(joinChar);
      quiz.choice3 = quiz.choices[3].join(joinChar);
      return quiz;
    }

    return {
      data: data,
      initProverbQuizManager: initProverbQuizManager,
      putQuiz: putQuiz,
      updateQuizList: updateQuizList
    }

  };

  app.factory('proverbQuizManager', ['$http', '$q', proverbQuizManager]);

})();