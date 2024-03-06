const express = require('express');
const bodyParser = require('body-parser');
import * as Realm from "realm-web";
const app = express();
const port = process.env.PORT||3000;

// Parse JSON bodies
app.use(bodyParser.json());

// POST route to receive data from client
app.post('/data', (req, res) => {
  console.log(2);
  const receivedData = req.body;
  console.log('Received data from client:', receivedData);
  if (req.query.admin == SECRET_KEY) {
            info = {"mq2": req.query.mq2, "mq7": req.query.mq7,"mq135": req.query.mq135,"dust2": req.query.dust2 };
            col.insertOne(info);
            resp.send({ "Status": 200 });
            console.log(req);
  }

  else{
         console.log("error");
         res.status(401);
        res.send({ "Error": "Admin incorrect" });
  }
});

// Start the server
app.listen(port,"0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});

