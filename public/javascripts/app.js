var app = angular.module('app', [ ]);

var Seat = function() {
  return {
    id: 0
    , category: ''
    , status: ''
    , title: ''
    , firstName: ''
    , lastName: ''
    , amount: 0.0
    , currency: ''
    , updatedOn: moment()
  };
};

app.controller('mainCtrl', function($scope) {
  $scope.seat = Seat();
});

// save/cancel
// import/export
// available/sold
// total
