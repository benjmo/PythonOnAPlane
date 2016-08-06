// PAGE NAVIGATION

var currDiv = "main-menu"; // init to menu
var prevDiv = "main-menu"; // init to menu

function changeView(sourceId, destId) {
   $("#" + sourceId).slideUp();
   prevDiv = sourceId;
   $("#" + destId).show();
   currDiv = destId;
   console.log("Changed from " + sourceId + " to " + destId);
}

$(window).on("navigate", function (event, data) {
  var direction = data.state.direction;
  if (direction == 'back') {
    changeView(currDiv, prevDiv);
  }
  if (direction == 'forward') {
    // do something else
  }
});

// other function
$.get("/get_products").done(function(data){
  for (type in data) {
    // parse into useful format
    var thingByCat = {}
    for (p in data[type]) {
      var curr = data[type][p];
      if (!(curr['category'] in thingByCat)) {
        thingByCat[curr['category']] = []
      }
      thingByCat[curr['category']].push({
        'name' : curr['name'], 
        'p_id' : p,
      })
    }

    // actually use the data
    for (cat in thingByCat) {
      $("#" + type).append($("<h3>").append(document.createTextNode(cat)));
      for (indiv in thingByCat[cat]) {
        var item = $("<div>").addClass("menuitem");
        item.append($("<img>"));
        item.append(document.createTextNode(thingByCat[cat][indiv]['name']))
        item.append($("<button>").attr('type', "button").addClass("menubutton").append(document.createTextNode("Order")));
        $("#" + type).append(item)
      }
    }
  }
});