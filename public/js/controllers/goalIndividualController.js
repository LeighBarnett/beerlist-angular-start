app.controller('goalIndividualController', function(uibDateParser, $uibModal, $scope, goalFactory, authFactory, $stateParams) {

    if (!$stateParams.goalParam) {
        var goalId = $stateParams.id
        goalFactory.getIndivGoal(goalId)
            .then(function(goal) {
                $scope.goal = goal

                goal.tasks.map(function(task, index) {

                    task.deadline = new Date(task.deadline)
                })
            })
    } else {
        $scope.goal = $stateParams.goalParam;
    }

    $scope.openAddTask = function() {
        $uibModal.open({
            scope: $scope,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../templates/addTaskTemplate.html',
            controller: function($scope, $uibModalInstance) {

                $scope.newTask = { date: new Date(), user: authFactory.currentUser.id };

                // $scope.clear = function() {
                //     $scope.newTask.deadline = null;
                // };



                $scope.dateOptions = {

                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 0
                };
                $scope.open2 = function() {
                    $scope.popup2.opened = true;
                };



                $scope.format = 'dd-MMM-yyyy';

                $scope.popup2 = {
                    opened: false
                };



                $scope.addTask = function(newTask, goalId) {
                    if (newTask.deadline == null) {
                        this.deadLineIncorrect = true;

                    } else {

                        this.deadLineIncorrect = false;

                        goalFactory.addTask(newTask, goalId)

                            .then(function(response) {
                                $scope.goal.tasks = response.data.tasks.map(function(task, index) {
                                    task.deadline = new Date(task.deadline)
                                    return task
                                });

                                console.log($scope.goal)
                                $uibModalInstance.close($scope.newTask);
                            })


                    }
                };

                $scope.closeAddTask = function() {
                    $uibModalInstance.dismiss()
                }
            }



        }).result.catch(function(error) {
            console.log(error)
        });

    }


    $scope.dateOptions = {

        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 0
    };
    $scope.open4 = function() {
        $scope.popup4.opened = true;
    };



    $scope.format = 'dd-MMM-yyyy';

    $scope.popup4 = {
        opened: false
    };


    $scope.editTask = function(index) {

        this.tempTask = angular.copy($scope.goal.tasks[index]);

    }

    $scope.cancelEdit = function(index) {
        //copy the tempBeer over the top of the current beer
        $scope.goal.tasks[index] = angular.copy(this.tempTask);
        //turn off edit view
        this.tempTask = null;
    };

    $scope.updateTask = function(goal, task, index) {
        var goalId = goal._id
        console.log(goal)
        var taskId = task._id
        //save a copy of the tempBeer in case something goes wrong
        var tempTask = angular.copy(this.tempTask);
        //turn off edit view as we are assuming all will be OK
        this.tempTask = null;
        //...then send request as we're optimistic
        goalFactory.updateTask(goalId, taskId, $scope.goal.tasks[index])
            //only if the update goes wrong are we going to do something
            .catch(function(err) {
                alert(err.data.message);
                $scope.goal.tasks[index] = angular.copy(tempTask)
            })
    };


    $scope.completedTask = function(goal, task, index) {
       var goalId = goal._id
        var taskId = task._id
        goalFactory.completedTask(goalId, taskId, $scope.goal.tasks[index])
            .then(function(response) {
                console.log(response)
                $scope.goal.tasks[this.$index] = response
            })
    }

    $scope.deleteTask = function(task, goalId) {
        var taskId = task._id
        goalFactory.deleteTask(taskId, goalId)
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