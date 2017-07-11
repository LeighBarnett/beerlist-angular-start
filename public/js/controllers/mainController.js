app.controller('goalController', function($uibModal, $scope, goalFactory) {


    $scope.goals = [];

    $scope.openAddGoal = function() {
        $uibModal.open({
            scope:$scope,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addGoalTemplate.html',
            controller: function($scope, $uibModalInstance) {
                $scope.addGoal = function(newGoal) {
                    newGoal.date = new Date()
                    goalFactory.addGoal(newGoal)
                        .then(function(newGoalData) {
                            $scope.goals.push(newGoalData);
                            $uibModalInstance.close($scope.newGoal);
                        })
                };
            }
        }).result.catch(function(error) {
            console.log(error)
        });

    }



    $scope.editGoal = function(index) {

        this.tempGoal = angular.copy($scope.goals[index]);

    }

    $scope.cancelEdit = function(index) {
        //copy the tempBeer over the top of the current beer
        $scope.goals[index] = angular.copy(this.tempGoal);
        //turn off edit view
        this.tempGoal = null;
    };

    $scope.updateGoal = function(index) {

        //save a copy of the tempBeer in case something goes wrong
        var tempGoal = angular.copy(this.tempGoal);
        //turn off edit view as we are assuming all will be OK
        this.tempGoal = null;
        //...then send request as we're optimistic
        goalFactory.updateGoal($scope.goals[index])
            //only if the update goes wrong are we going to do something
            .catch(function(err) {
                alert(err.data.message);
                $scope.goals[index] = angular.copy(tempGoal)
            })
    };


    $scope.removeGoal = function(goal) {
        var goalId = goal._id
        goalFactory.removeGoal(goalId)
            .then(function(goal) {
                for (var i = 0; i < $scope.goals.length; i++) {
                    //ask about goal._id below
                    if (goal._id == $scope.goals[i]._id) {

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
