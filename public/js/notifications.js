var notifications = document.getElementsByClassName("alert");

Array.prototype.forEach.call(notifications, function(notification, index) {
  alertify.alert(notifications.item(index).innerHTML);
});
