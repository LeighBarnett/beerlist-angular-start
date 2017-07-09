app.controller('goalIndividualController', function($uibModal, $scope, goalFactory, $stateParams) {
    if (!$stateParams.goalParam) {
        var goalId = $stateParams.id
        goalFactory.getIndivGoal(goalId)
            .then(function(goal) {
                $scope.goal = goal
            })
    } else {
        $scope.goal = $stateParams.goalParam;
    }

    $scope.addTask = function(newTask, goalId) {
        newTask.date = new Date()
        goalFactory.addTask(newTask, goalId)
            .then(function(data) {
            	console.log(data.tasks)
                // $scope.goals.push(newGoalData);
            })
            .catch(function(error) {
                console.log(error)
            });
    }







})
