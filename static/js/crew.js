loadServices();

$("#removeButton").click(function() {
  $(".inProgress").each(function() {
    // TODO: call remove_order when it's implemented.
    this.remove();
  })
});

function loadServices() {
  $.get("/get_orders")
    .done(function(data) {
      $("#orders").empty();
      for (var order in data['orders']) {
        var orderRow = createNewOrder(data['orders'][order]);
        $("#orders").append(orderRow);
      }
    })
    .fail(function(data) {
      alert("Failed to connect. Please check your connection and try again later.");
    })
}

function createNewOrder(orderData) {
  console.log(orderData);
  var product = orderData['product'];
  var customer = orderData['customer'];
  var order = $("<div>");
  order.append("1 " + product['name'] + " for " + customer['name'] + 
                " in seat " + customer['row_number'] + customer['seat_letter']);
  order.attr('class', "row form-control");
  order.click(function(a, b) {
    $(this).toggleClass("inProgress");
  })
  return order;
}