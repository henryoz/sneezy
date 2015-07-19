var UI = require('ui');
var ajax = require('ajax');

var woeid = '13963';
var URL = 'https://pollencheck.p.mashape.com/api/1/forecasts/' + woeid;

var card = new UI.Card({
  title: 'Pollen Count',
  subtitle: 'Testing...'
});

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
    console.log(data.periods[0].day);
  },
  function(error) {
    console.log('Failed to grab the weather data ' + error);
  }
);



card.show();