app.factory('goalFactory', function($http) {
    var goalFactory = {};

    goalFactory.getGoals = function() {
        return $http.get('/goals')
            .then(function(response) {
                    return angular.copy(response.data);
                },
                function(error) {
                    alert("error")
                });
    };

    goalFactory.addGoal = function(newGoal) {
        return $http.post('/goals', newGoal)
            .then(function(response) {
                return angular.copy(response.data);
            });
    };

    goalFactory.updateGoal = function(goal) {
    return $http.put('/goals/' + goal._id, goal)
      .then(function(response) {
        return response.data
      });
  };

    goalFactory.removeGoal = function(goalId) {
        return $http.delete('/goals/' + goalId)
            .then(function(response) {
                return angular.copy(response.data);
            });
    };
    return goalFactory;

})