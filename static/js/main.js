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

function addOrder() {

}