// PAGE NAVIGATION

var currDiv = "main-menu"; // init to menu
var prevDiv = "main-menu"; // init to menu

function changeView(sourceId, destId) {
   $("sourceId").hide();
   prevDiv = sourceId;
   $("destId").show();
   currDiv = destId;
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

function addOrder() {

}