app.controller('goalController', function($scope, goalFactory) {


    $scope.goals = [];
    $scope.addGoal = function(newGoal) {
        $scope.newGoal.date = new Date()
        goalFactory.addGoal(newGoal)
            .then(function(newGoalData) {
                $scope.goals.push(newGoalData);
            })
            .catch(function(error) {
                console.log(error)
            });
    }



    $scope.removeGoal = function(goal) {
        var goalId = goal._id
        goalFactory.removeGoal(goalId)
            .then(function(goal) {
                for (var i = 0; i < $scope.goals.length; i++){
                	//ask about goal._id below
                	if(goal._id==$scope.goals[i]._id){
                		
                		$scope.goals.splice(i, 1)
                		break;
                	}
                }

            })
            .catch(function(error) {
                console.log(error)
            });
    }

    goalFactory.getGoals().then(function(goals) {
            $scope.goals = goals;
        })
        .catch(function(error) {
            console.log(error)
        });
})
