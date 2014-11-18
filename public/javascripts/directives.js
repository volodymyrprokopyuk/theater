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
    }
  };
});

app.directive('total', function() {
  return {
    restrict: 'E'
    , template: function() {
      return $('#total').html();
    }
  };
});

app.directive('booking', function() {
  return {
    restrict: 'E'
    , template: function() {
      return $('#booking').html();
    }
  };
});

app.directive('bookings', function() {
  return {
    restrict: 'E'
    , template: function() {
      return $('#bookings').html();
    }
  };
});
