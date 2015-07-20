var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Accel = require('ui/accel');


var splashWindow = new UI.Window();

var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Downloading pollen data...',
  font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
//   textAlign:'center',
  backgroundColor:'white'
});

splashWindow.add(text);
splashWindow.show();


var woeid = '13963';
var URL = 'https://pollencheck.p.mashape.com/api/1/forecasts/' + woeid;

ajax(
  {
    url: URL,
    type: 'json',
    headers: {
      'X-Mashape-Key': 'HpeEz7yI8JmshzdrtGpshHhxhofZp1y9XGxjsnyTLuNIof9bi1',
      'Accept': 'application/json',
    }
  },
  
  function(data) {
    var parseFeed = function(data, quantity) {
      var items = [];
      for(var i = 0; i < quantity; i++) {
        // Always upper case the description string
        var title = data.periods[i].day;
        
        var subtitle = data.periods[i].combined.avgLevel;
  
        // Add to menu items array
        items.push({
          title: 'Day ' + title,
          subtitle: subtitle
        });
      }

  // Finally return whole array
      return items;
    };
    
    // Create an array of Menu items
    var menuItems = parseFeed(data, 3);
    
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'Current Forecast',
        items: menuItems
      }]
    });
    
    resultsMenu.on('select', function(e) {
      // Get that forecast
      var forecast = data.periods[e.itemIndex];

      // Assemble body string
      var content = forecast.combined.avgCounter;
      
      // Create the Card for detailed view
      var detailCard = new UI.Card({
        title:'Details',
        subtitle:e.item.subtitle,
        body: content
      });
      detailCard.show();
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    splashWindow.hide();
  },
  
  function(error) {
    console.log('Failed to grab the weather data ' + error);
     }
);

Accel.init();
