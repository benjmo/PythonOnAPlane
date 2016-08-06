var currDiv = "main-menu"; // init to menu
var prevDiv = "main-menu"; // init to menu


$(".button-collapse").sideNav();

// PAGE NAVIGATION

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

function addOrder() {

}