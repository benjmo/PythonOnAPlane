var currDiv = "login"; // init to menu
var prevDiv = "login"; // init to menu
var CURRENT_CUSTOMER = 0;


$(".button-collapse").sideNav();

// PAGE NAVIGATION
$("#loginButton").click(function() {
  $.get("/get_customer_id_from_name", {
    'name' : $("#loginName")[0].value
  }).always(function(a) {
    if (a.error) {
      alert("Passenger not found. Check your name again");
    } else {
      CURRENT_CUSTOMER = parseInt(a['id'])
      $("#menuTitle").empty().append(document.createTextNode("Hello " + $("#loginName")[0].value + "!"))
      changeView("main-menu")
    }
  })
})

function changeView(destId) {
   if (destId == 'back') {
      changeView(prevDiv);
   } else if (currDiv != destId) {
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

$("#orderConfirm").click(function(){
  console.log("going!", $(this).attr('p_id'), $(this).attr('type'));
  $.get("/add_order", {
    'product-id' : $(this).attr('p_id'),
    'customer-id' : CURRENT_CUSTOMER,
    'product-type' : $(this).attr('type')
  })
  $("#orderModal").modal('hide');
});

// load all the info at the start
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
    
    var category = $("<div>").addClass("col-xs-12"); 

    //for each category
    for (cat in thingByCat) {
      category.append($("<h3>").append(document.createTextNode(cat)));
      
      //...


      for (indiv in thingByCat[cat]) {
        var item = $("<div>").addClass("menuitem");
        if ('img' in thingByCat[cat][indiv]) {
          var img = $("<img>").attr('src', baseStaticURL + thingByCat[cat][indiv]['img']);
          img.attr('alt', thingByCat[cat][indiv]['name']);
          img.attr('style',"margin-right:10px;width:10%;height:auto;");
          item.append(img);
        }
        item.append(document.createTextNode(thingByCat[cat][indiv]['name']));
        var button = $("<button>").attr('type', "button");
        button.addClass("button").append(document.createTextNode("Order"));
        button.attr('p_id', thingByCat[cat][indiv]['p_id']).attr('type', type).attr('name', thingByCat[cat][indiv]['name']);
        button.click(orderItem);
        item.append(button);
        category.append(item)
      }

      //....
      $("#" + type).append(category);
    }
  }
});

function orderItem(a) {
  var thisPr = $(this);
  console.log(this);
  $("#orderModalBody").empty().append(document.createTextNode("Order 1 " + thisPr.attr('name') + "?")).append($("<p>"));
  $.get("/get_orders").done(function(a) {
    $("#orderModalBody").append(document.createTextNode("May take approximately " + (a.length * 0.5) + " minute(s)."));
  })
  $("#orderConfirm").attr('p_id', thisPr.attr('p_id'));
  $("#orderConfirm").attr('type', thisPr.attr('type'));
  $("#orderModal").modal('show');
}