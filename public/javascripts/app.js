var app = angular.module('app', [ ]);

var Seat = function() {
  return {
    id: 0
    , sector: ''
    , row: 0
    , seat: 0
    , status: ''
    , firstName: ''
    , lastName: ''
    , amount: 0.0
    , currency: ''
    , updatedOn: moment()
  };
};

app.controller('mainCtrl', function($scope, seats) {
  $scope.seats = seats.all();

  $scope.newBooking = function(seat) {
    $scope.seat = _.clone(seat);
  };

  $scope.cancelBooking = function() {
    $scope.seat = null;
  };

  $scope.book = function(seat) {
    seat.status = 'booked';
    seat.amount = parseInt(seat.amount);
    seat.updatedOn = moment();
    seats.update(seat);
    $scope.seat = null;
  };

  $scope.unbook = function(seat) {
    seat.status = 'available';
    seat.firstName = '';
    seat.lastName = '';
    seat.amount = 0.0;
    seat.updatedOn = moment();
    seats.update(seat);
    $scope.seat = null;
  };

  $scope.booked = function() {
    return _.filter($scope.seats, { status: 'booked' });
  };

  $scope.export = function() {
    var json = angular.toJson($scope.seats);
    var urlData = 'data:text/json;charset=utf-8,' + json;
    var a = document.createElement('a');
    $(a).attr('href', urlData).attr('download', 'bookings.json');
    a.click();
  };

  $scope.import = function() {
    localStorage.setItem('bookings', JSON.stringify($scope.seats[0]));
    console.log(JSON.parse(localStorage.getItem('bookings')));
  };

  $scope.clear = function() {

  };
});
