var currDiv = "main-menu"; // init to menu
var prevDiv = "main-menu"; // init to menu


$(".button-collapse").sideNav();

// PAGE NAVIGATION

function changeView(destId) {
   if (currDiv != destId) {
      $("#" + currDiv).slideUp();
      prevDiv = currDiv;
      $("#" + destId).show();
      currDiv = destId;
   }
   $('.button-collapse').sideNav('hide');
   console.log("Changed from " + currDiv + " to " + destId);
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
      if ('img_name' in curr) {
        thingByCat[curr['category']][thingByCat[curr['category']].length -1]['img'] =  curr['img_name'];
      }
    }

    // actually use the data
    for (cat in thingByCat) {
      $("#" + type).append($("<h3>").append(document.createTextNode(cat)));
      for (indiv in thingByCat[cat]) {
        var item = $("<div>").addClass("menuitem");
        if ('img' in thingByCat[cat][indiv]) {
          var img = $("<img>").attr('src', baseStaticURL + thingByCat[cat][indiv]['img']);
          img.attr('alt', thingByCat[cat][indiv]['name']);
          img.attr('style',"width:10%;height:auto;");
          item.append(img);
        }
        item.append(document.createTextNode(thingByCat[cat][indiv]['name']));
        var button = $("<button>").attr('type', "button");
        button.addClass("menubutton").append(document.createTextNode("Order"));
        button.attr('type', type).attr('p_id', thingByCat[cat][indiv]['p_id']);
        button.click(function() {
          $.get("/add_order", {
            'product-id' : $(this).attr('p_id'),
            'customer-id' : 0,
            'product-type' : $(this).attr('type')
          })
        })
        item.append(button);
        $("#" + type).append(item)
      }
    }
  }
});