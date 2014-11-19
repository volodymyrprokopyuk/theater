app.factory('seats', function() {
  var seats = [ ];

  var init = function() {
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
  };

  var all = function() {
    return seats;
  };

  var save = function() {
    var json = angular.toJson(seats);
    localStorage.setItem('bookings', json);
  };

  var update = function(seat) {
    var seatToUpdate = _.find(seats, { id: seat.id });
    seatToUpdate
      && (_.merge(seatToUpdate, _.pick(seat
        , 'status', 'firstName', 'lastName', 'amount', 'updatedOn'))
        , save());
  };

  var validate = function(seat) {
    return _.isNumber(seat.id)
      && _.isString(seat.status)
      && /^available|booked$/.test(seat.status)
      && _.isString(seat.firstName)
      && _.isString(seat.lastName)
      && _.isNumber(seat.amount)
      && moment(seat.updatedOn).isValid();
  };

  var parse = function(seat) {
    seat.updatedOn = moment(seat.updatedOn);
  };

  var load = function(rawSeats) {
    var loaded = true;
    try {
      var newSeats = JSON.parse(rawSeats);
      _.map(newSeats, function(newSeat) {
        validate(newSeat) && (parse(newSeat), update(newSeat));
      });
    } catch (e) {
      loaded = false;
    }
    return loaded;
  };

  var clear = function() {
    _.map(seats, function(seat) {
      seat.status = 'available';
      seat.firstName = '';
      seat.lastName = '';
      seat.amount = 0.0;
      seat.updatedOn = moment();
    });
  };

  init();
  var bookings = localStorage.getItem('bookings');
  bookings && load(bookings);

  return {
    all: all
    , update: update
    , load: load
    , save: save
    , clear: clear
  };
});

app.factory('tr', function() {

  var en = {
    'Theatre booking': 'Theatre booking'
    , 'Export': 'Export'
    , 'Import': 'Import'
    , 'No': 'No'
    , 'Clear': 'Clear'
    , 'Hide': 'Hide'
    , 'Bookings': 'Bookings'
    , 'Total': 'Total'
    , 'Designed by Volodymyr Prokopyuk, 2014'
      : 'Designed by Volodymyr Prokopyuk, 2014'
    , 'You are about to delete all bookings'
      : 'You are about to delete all bookings'
    , 'Yes, delete all bookings': 'Yes, delete all bookings'
    , 'Paste here previously exported file content and press Import again'
      : 'Paste here previously exported file content and press Import again'
    , 'available': 'available'
    , 'booked': 'booked'
    , 'Unbook': 'Unbook'
    , 'First name': 'First name'
    , 'Last name': 'Last name'
    , 'Amount': 'Amount'
    , 'EUR': 'EUR'
    , 'Cancel': 'Cancel'
    , 'Book': 'Book'
    , 'Update': 'Update'
    , 'Sector': 'Sector'
    , 'Row': 'Row'
    , 'Seat': 'Seat'
    , 'Status': 'Status'
    , 'Booked on': 'Booked on'
    , 'The data you are trying to import is corrupted'
      : 'The data you are trying to import is corrupted'
  };

  var ua = {
    'Theatre booking': 'Резервування театральних квитків'
    , 'Export': 'Експорт'
    , 'Import': 'Імпорт'
    , 'No': 'Ні'
    , 'Clear': 'Знищити'
    , 'Hide': 'Приховати'
    , 'Bookings': 'Резервування'
    , 'Total': 'Зарезервовано'
    , 'Designed by Volodymyr Prokopyuk, 2014'
      : 'Розробка: Володимир Прокопюк, 2014'
    , 'You are about to delete all bookings'
      : 'Ви хочете знищити інформацію про всі резервування'
    , 'Yes, delete all bookings': 'Так, знищити інформацію про всі резервування'
    , 'Paste here previously exported file content and press Import again'
      : 'Скопіюйте сюди вміст попередньо експортованого файлу і нарисніть Імпорт ще раз'
    , 'available': 'вільне'
    , 'booked': 'зарезервоване'
    , 'Unbook': 'Звільнити'
    , 'First name': "Ім'я"
    , 'Last name': 'Прізвище'
    , 'Amount': 'Вартість'
    , 'EUR': 'ГРН'
    , 'Cancel': 'Скасувати'
    , 'Book': 'Зарезервувати'
    , 'Update': 'Актуалізувати'
    , 'Sector': 'Сектор'
    , 'Row': 'Ряд'
    , 'Seat': 'Місце'
    , 'Status': 'Статус'
    , 'Booked on': 'Зарезервоване'
    , 'The data you are trying to import is corrupted'
      : 'Дані які ви намагаєтеся імпортувати пошкоджені'
  };

  var trans = ua;

  var lng = function(language) {
    trans = language === 'en' ? en
      : language === 'ua' ? ua
      : en;
  };


  var tr = function(expression) {
    return trans[expression] || 'UNKNOWN EXPRESSION';
  };

  return { tr: tr, lng: lng };
});
