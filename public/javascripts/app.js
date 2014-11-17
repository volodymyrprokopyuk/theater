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

app.factory('seats', function() {
  var seats = [ ];

  // id, status
  seats = _.range(1, 65).map(function(id) {
    var seat = Seat();
    seat.id = id;
    seat.status = 'available';
    return seat;
  // sector
  }).map(function(seat) {
    seat.sector = (seat.id > 0 && seat.id < 13) ? 'A'
      : (seat.id > 12 && seat.id < 33) ? 'B'
      : (seat.id > 32 && seat.id < 53) ? 'C'
      : (seat.id > 52 && seat.id < 65) ? 'D' : '';
    return seat;
  });
  // row, seat
  var location = { };
  var distribute = function(seatsPerRow, seat) {
    _.merge(seat, ++location.seat > seatsPerRow
      ? (location.seat = 1, ++location.row, location) : location);
  };
  var distribute4 = _.partial(distribute, 4);
  var distribute10 = _.partial(distribute, 10);
  location = { row: 1, seat: 0 };
  _.filter(seats, { sector: 'A' }).map(distribute4);
  location = { row: 1, seat: 0 };
  _.filter(seats, { sector: 'B' }).map(distribute10);
  location = { row: 1, seat: 0 };
  _.filter(seats, { sector: 'C' }).map(distribute10);
  location = { row: 1, seat: 0 };
  _.filter(seats, { sector: 'D' }).map(distribute4);

  return {
    find: function() {
      return seats;
    }
  };
});

app.filter('rowFilter', function() {
  return function(seats, sector, row) {
    return _.filter(seats, { sector: sector, row: row });
  };
});

app.controller('mainCtrl', function($scope, seats) {
  $scope.seats = seats.find();
});

app.directive('seat', function() {
  return {
    restrict: 'E'
    , template: function() {
      return $('#seat').html();
    }
  };
});

app.directive('row', function() {
  return {
    restrict: 'E'
    , template: function() {
      return $('#row').html();
    }, scope: true
    , link: function(scope, elem, attrs) {
      scope.sector = attrs.sector;
      scope.row = parseInt(attrs.row);
      scope.span = parseInt(attrs.span);
    }
  };
});

// save/cancel
// import/export
// available/sold
// total
