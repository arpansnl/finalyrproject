//Load /posts routes

app.use("/posts",posts);
router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
  });
  // Fetches the latest posts
router.get("/latest", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.aggregate([
      {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
      {"$sort": {"date": -1}},
      {"$limit": 3}
    ]).toArray();
    res.send(results).status(200);
  });
  router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
  router.post("/send", async (req, res) =>{
  if (req.query.admin == SECRET_KEY) {
            info = {"mq2": req.query.mq2, "mq7": req.query.mq7,"mq135": req.query.mq135,"dust2": req.query.dust2 };
            col.insertOne(info);
            resp.send({ "Status": 200 });
            console.log(req);
        }
           else{
            console.log("error")
  }
// Update the post with a new comment

