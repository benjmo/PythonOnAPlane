var currDiv = "main-menu"; // init to menu
var prevDiv = "main-menu"; // init to menu

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

// slideout panel
var slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70
});

// Toggle button
document.querySelector('.toggle-button').addEventListener('click', function() {
  slideout.toggle();
});

function addOrder() {

}