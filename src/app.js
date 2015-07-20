var UI = require('ui');
var ajax = require('ajax');

var card = new UI.Card({
  title: "Today's pollen count",
  subtitle: "Fetching..."
});

card.show();

// "Where on Earth ID" - currently hard-set to Bristol. 
// TODO: Pass through via config (using location or manually set).
var woeid = '13963';
// The API call, with woeid appended.
var URL = 'https://pollencheck.p.mashape.com/api/1/forecasts/' + woeid;

ajax(
  {
    url: URL,
    type: 'json',
    headers: {
      'X-Mashape-Key': 'HpeEz7yI8JmshzdrtGpshHhxhofZp1y9XGxjsnyTLuNIof9bi1',
      'Accept': 'application/json'
    }
  },
  
  function(data) {
//     Grab the arrays for info for the current day, the next day, and two days into the future.
    var today = data.periods[0];
//     var tomorrow = data.periods[1];
//     var twoDays = data.periods[2];
    card.subtitle(today.combined.avgLevel);
  },
  
  function(error) {
    console.log('Failed to grab the weather data ' + error);
    card.title('Oops!');
    card.subtitle('Something went wrong.');
    card.body('Sorry! Please try reloading the app.');
  }
);