(function() {

  var inputImageUtil = function($q) {

    function _getFileReader(deferred) {
      var reader = new FileReader();
      reader.onload = function() {
        deferred.resolve(reader.result);
      };
      reader.onerror = function() {
        deferred.reject(reader.result);
      };
      reader.onprogress = function(event) {
        var progress = Math.round((event.loaded / event.total) * 100);
        deferred.notify(progress);
      };
      return reader;
    }

    function read(imageFile) {
      var deferred = $q.defer();
      var reader = _getFileReader(deferred);
      reader.readAsDataURL(imageFile);
      return deferred.promise;
    }

    return {
      read: read
    }
  };

  app.factory('inputImageUtil', ['$q', inputImageUtil]);

})();