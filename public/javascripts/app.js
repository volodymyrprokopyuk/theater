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

// save/cancel
// import/export
// available/sold
// total
