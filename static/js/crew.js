var currentOrders;

loadServices()
setInterval(loadServices, 10000);

$("#removeButton").click(function() {
  $(".inProgress").each(function() {
    $.get("/remove_order", {
      'product-id' : $(this).attr('p_id'),
      'customer-id' : $(this).attr('c_id'),
      'product-type' : $(this).attr('type')
    }).always(function(a) {
      console.log(a);
    });
    this.remove();
  })
});

function loadServices() {
  console.log("Loading orders...");
  if ($(".inProgress").length > 0)
    return;
  $.get("/get_orders")
    .done(function(data) {
      currentOrders = data;
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
  var order = $("<div>");
  order.append("1 " + orderData['product_name'] + " for " + orderData['customer_name'] + 
                " in seat " + orderData['row_number'] + orderData['seat_letter']);
  order.attr('class', "row form-control");
  order.attr('p_id', orderData['product_id']);
  order.attr('c_id', orderData['customer_id']);
  order.attr('type', orderData['product_type']);
  order.click(function(a, b) {
    $(this).toggleClass("inProgress");
  })
  return order;
}