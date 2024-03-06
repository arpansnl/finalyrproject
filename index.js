const express = require('express');
const path=require('path');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define the directory where your HTML files (views) are located
app.set('views', path.join(__dirname, 'views'));

// Optionally, you can define a static files directory (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the HTML file
app.get('/', (req, res) => {
  res.render('index'); // Assuming you have an "index.ejs" file in the "views" directory
});
const port = process.env.PORT||3000;
// Start the server

app.listen(port,"0.0.0.0",()=>{
    console.log("server started!!");
})