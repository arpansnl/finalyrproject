const http=require('http');
const app=require('./index');
const { hostname } = require('os');
const port=process.env.PORT || 5000;
const server=http.createServer(app);
server.listen(port, 'https://finalyrproject.onrender.com',() => {
    console.log('started on port ${port}');
});