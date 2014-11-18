app.factory('seats', function() {
  var seats = [ ];
  // id, status, currency
  seats = _.range(1, 65).map(function(id) {
    var seat = Seat();
    seat.id = id;
    seat.status = 'available';
    seat.currency = 'EUR';
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

  var all = function() {
    return seats;
  };

  var update = function(seat) {
    var seatToUpdate = _.find(seats, { id: seat.id });
    _.merge(seatToUpdate, seat);
  };

  return {
    all: all
    , update: update
  };
});
