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
      for (var order in data) {
        var orderRow = createOrderTab(data[order]);
        $("#orders").append(orderRow);
      }
    })
    .fail(function(data) {
      alert("Failed to connect. Please check your connection and try again later.");
    })
}

function createOrderTab(orderData) {
  console.log(orderData);
  var order = $("<div>");
  order.append("1 " + orderData['product_name'] + " for " + orderData['customer_name'] + 
                " in seat " + orderData['row_number'] + orderData['seat_letter']);
  order.attr('class', "row form-control");
  order.click(function(a, b) {
    $(this).toggleClass("inProgress");
  })
  return order;
}