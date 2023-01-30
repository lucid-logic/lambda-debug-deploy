exports.handler = function (event, context, callback) {
  console.log("Received event blah: ", event);
  var data = {
    greetings: "Hello, " + event.firstName + " " + event.lastName + ".",
  };
  callback(null, data);
};
