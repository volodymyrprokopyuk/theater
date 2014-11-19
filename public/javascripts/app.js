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

app.controller('mainCtrl', function($scope, seats, tr) {
  $scope.seats = seats.all();

  $scope.newBooking = function(seat) {
    $scope.seat = _.clone(seat);
  };

  $scope.cancelBooking = function() {
    $scope.seat = null;
  };

  $scope.book = function(seat) {
    seat.status = 'booked';
    seat.amount = _.isString(seat.amount)
      ? parseFloat(seat.amount.replace(',', '.')) : seat.amount;
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
    $scope.importing = !$scope.importing;
    $scope.imported && (seats.load($scope.imported)
      || alert('The data you are trying to import is corrupted')
      , $scope.imported = null);
  };

  $scope.askClear = function() {
    $scope.clearing = !$scope.clearing;
  };

  $scope.clear = function() {
    seats.clear();
    seats.save();
    $scope.clearing = false;
  };

  $scope.lng = function(language) {
    tr.lng(language);
  };

  $scope.tr = function(expression) {
    return tr.tr(expression);
  };
});
