var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

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
      'Accept': 'application/json'
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
          title: title,
          subtitle: subtitle
        });
      }

  // Finally return whole array
      return items;
    };
    
    // Create an array of Menu items
    var menuItems = parseFeed(data, 3);
    
    // Check the items are extracted OK
    for(var i = 0; i < menuItems.length; i++) {
      console.log(menuItems[i].title + ' | ' + menuItems[i].subtitle);
    }
    
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'Current Forecast',
        items: menuItems
      }]
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    splashWindow.hide();
        
  },
  
  function(error) {
    console.log('Failed to grab the weather data ' + error);
     }
);