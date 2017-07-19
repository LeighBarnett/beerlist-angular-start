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


    goalFactory.completed=function(goal){
        return $http.put('/goals/' + goal._id, goal)
            .then(function(response) {
                return response.data
            });
    }

  goalFactory.completedTask=function(goalId, taskId, task){
        return $http.put('/goals/' + goalId + '/tasks/' + taskId, task)
            .then(function(response) {
                return response.data
            });
    }


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

    goalFactory.getIndivGoal = function(goalId) {
        return $http.get('/goals/' + goalId)
            .then(function(response) {
                return response.data
            }, function(err) {
                console.error(err)
            });
    };

    goalFactory.addTask = function(newTask, goalId) {
        return $http.post('/goals/' + goalId + '/tasks', newTask)
            .then(function(response) {
                return response;
            });
    };

    goalFactory.updateTask = function(goalId, taskId, task) {
        return $http.put('/goals/' + goalId + '/tasks/' + taskId, task)
            .then(function(response) {
                return response.data
            });
    };

    goalFactory.deleteTask = function(taskId, goalId) {

        return $http.delete('/goals/' + goalId + '/tasks/' + taskId)
            .then(function(response) {
                return angular.copy(response.data);
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