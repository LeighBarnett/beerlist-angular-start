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
            .then(function(response) {

                $scope.goal = response.data
            })

        .catch(function(error) {
            console.log(error)
        });
    }

$scope.deleteTask=function(task,goalId){
    var taskId=task._id
goalFactory.deleteTask(taskId,goalId)
.then(function(response) {
            for (var i = 0; i < $scope.goal.tasks.length; i++) {
                if (task._id == $scope.goal.tasks[i]._id) {

                    $scope.goal.tasks.splice(i, 1)
                    break;
                }
            }

        })
        .catch(function(error) {
            console.log(error)
        });
}





})
