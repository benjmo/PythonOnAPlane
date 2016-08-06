loadServices();

function loadServices() {
  $.get("/get_services")
    .done(function(data) {
      $("#orders").empty();
      for (var order in data['services']) {
        var orderRow = createNewOrder(data['services'][order]);
        $("#orders").append(orderRow);
      }
    })
    .fail(function(data) {
      alert("Failed to connect. Please check your connection and try again later.");
    })
}

function createNewOrder(orderData) {
  console.log(orderData);
  var order = $("<div>").append("Product: " + orderData['product-id'] + "Customer: " + orderData['customer-id']);
  order.attr('class', "row form-control");
  return order;
}