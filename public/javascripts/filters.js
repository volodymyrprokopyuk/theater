app.filter('filterRow', function() {
  return function(seats, sector, row) {
    return _.filter(seats, { sector: sector, row: row });
  };
});

app.filter('dt', function() {
  return function(date) {
    return date.format('DD-MM-YYYY HH:mm');
  };
});

app.filter('curr', function() {
  return function(amount) {
    return amount.toFixed(2);
  };
});
