const http = require("http"),
  url = require("url"),
  fs = require("fs"),
  io = require("socket.io"),
  mongoose = require('mongoose'),
  Restaurant = require('./model/Restaurant'),
  Order = require('./model/Order');


const connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(connectionString, { useNewUrlParser: true })
  .then(() => {
    console.log('connection successful')
  }, err => {
    console.log('could not connect!');
  })

const server = http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    case "/":
      fs.readFile(__dirname + "/index.html", function (err, data) {
        if (err) return send404(res);
        res.writeHead(200, {
          "Content-Type": path == "json.js" ? "text/javascript" : "text/html"
        });
        res.write(data, "utf8");
        res.end();
      });
      break;

    default:
      send404(res);
  }
});
const send404 = function (res) {
  res.writeHead(404);
  res.write("404");
  res.end();
};

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));

// socket.io, I choose you
const ioServer = io.listen(server);

// socket.io setup and manager
ioServer.on("connection", function (socket) {
  // now we have a client object!
  console.log("Connection accepted.");

  // event listeners
  socket.on("message", function (message) {
    console.log(`Recieved message: ${message} - from client`);
    socket.emit("msgreceived");
  });

  socket.on("disconnect", function () {
    console.log("Disconnected...");
  });

  socket.on("get-restaurants", () => {
    console.log("server - get-restarants called");


    // Restaurant.find((error, documents) => {
    //   if (error) console.log('error in Restaurant.find()', error);
    //   else {
    //     console.log('Restaurant.find() return documents: ', documents);
    //     const data = documents.map(x => x.name);
    //     socket.emit('restaurants-data', data);
    //   }
    // });

    Restaurant
      .where('city').equals('Queens')
      .where('cuisine').equals('Delicatessen')
      .exec((error, documents) => {
      if (error) console.log('error in Restaurant.where()', error);
      else {
        console.log('Restaurant.where() return documents: ', documents);
        const data = documents.map(x => JSON.stringify(x));
        socket.emit('restaurants-data', data);
      }
    });

  });

  socket.on("get-orders", () => {
    console.log("server - get-orders called");


    Order.find((error, documents) => {
      if (error) console.log('error in Order.find()', error);
      else {
        console.log('Order.find() return documents: ', documents);
        const data = documents.map(x =>JSON.stringify(x));
        socket.emit('orders-data', data);
      }
    });

  });

  socket.on("add-order", () => {
    console.log("server - add-order called");

    const newOrder = new Order({
      orderId: new Date().getMilliseconds(),
      item: `Item ${Math.floor(Math.random() * 100) + 1}`,
      customer_name: 'Dear Customer'
    })

    newOrder.save(newOrder, (error, obj) => {
      if (error) console.log('error in Order.save()', error);
      else {
        console.log('Order.save() return document: ', obj);
        socket.emit('add-order-data', JSON.stringify(obj));
      }
    });

  });

});
