// const jsdom = require('jsdom')
// const dom = new jsdom.JSDOM("")
// const jquery = require('jquery')(dom.window)

//ws = new WebSocket('ws://127.0.0.1:5500/') ;
//ws.send("Here's some text that the server is urgently awaiting!");
// API KEY
const apiKey ="fdf0fddd82f6f5f19572856cc01835b8f5354929";

// SELECTOR
let locationElement = document.querySelector('#location p');
let qualityIcon=document.querySelector('#quality #quality-icon');
let qualityDescription = document.querySelector('#quality-description p');
let indexValue=document.querySelector('#index-value p');
const searchInput=document.querySelector("#search-input");
const searchButton=document.querySelector("#search-button");
const geoButton=document.querySelector("#geo-button");
const details=document.getElementById("details");
const details2=document.getElementById("output2");
tokenId = apiKey;

let input = searchInput;
let output = details;


searchButton.addEventListener('click', (e)=> {
   
     init();
    search(searchInput.value,details);
    e.preventDefault();
});
geoButton.addEventListener("click" ,(e) => {
    init();
    geoloc();
    document.getElementById('indoor-iframe').style.display = "block";
    e.preventDefault();
let longitude;
let latitude;
});

function init() {
    document.getElementById('details').style.display = "block";
    document.getElementById('output2').style.display = "block";
    token.id = apiKey;
    details.innerHTML="";
    details2.innerHTML="";
    var input = $(searchButton);
    var timer = null;
    var output = $(details);
    
    // input.on("click", function () {
    //     /* Debounce */
    // //     search(input.val,output);
    // });
}
 
function search(keyword, output) {
    console.log("1");
    output=$(details);
    ouput2=$(details2);
    var info =apiKey;
   
   
    output.append($("<div/>").addClass("cp-spinner cp-meter"));
   
    let url =
        "https://api.waqi.info/v2/search/?token=" +
        apiKey +
        "&keyword=" +
        keyword;
    fetch(url)
        .then((x) => x.json())
        .then((result) => {
            // var info = token() == "demo" ? "(based on demo token)" : "";
            
            
            if (!result || result.status != "ok") {
                throw result.data;
            }
           
            if (result.data.length == 0) {
                output.append("Sorry, there is no result for your query!");
                return;
            }
 
            var table = $("<table/>").addClass("result");
            output.append(table);
 
            output2.append(
                $("<div/>").html(
                    "Click on any of the station to see the detailed AQI"
                )
            );
 
            var output21 = $("<div/>");
            output2.append(output21);
            result.data.forEach(function (station, i) {
                var tr = $("<tr>");
                tr.append($("<td>").html(station.station.name));
                tr.append($("<td>").html(colorize(station.aqi)));
                tr.append($("<td>").html(station.time.stime));
                tr.on("click", function () {
                    showStation(station, output21);
                });
                table.append(tr);
                if (i == 0) showStation(station, output21);
            });
            output.append(table);
        })
        .catch((e) => {
            output.html("<div class='ui negative message'>" + e + "</div>");
        });
}
 
function showStation(station, output) {
    output2=$(details2);
    output2.html("<h2>Pollutants & Weather conditions:</h2>");
    output2.append($("<div/>").html("Loading..."));
    output.append($("<div/>").addClass("cp-spinner cp-meter"));
    
    let url =
        "https://api.waqi.info/feed/@" + (station.uid||station.idx) + "/?token=" + apiKey;
    fetch(url)
        .then((x) => x.json())
        .then((result) => {
            output2.html("<h2>Pollutants & Weather conditions:</h2>");
            if (!result || result.status != "ok") {
                output2.append("Sorry, something wrong happend: ");
                if (result.data) output2.append($("<code>").html(result.data));
                return;
            }
 
            var names = {
                pm25: "PM<sub>2.5</sub>",
                pm10: "PM<sub>10</sub>",
                o3: "Ozone",
                no2: "Nitrogen Dioxide",
                so2: "Sulphur Dioxide",
                co: "Carbon Monoxide",
                t: "Temperature",
                w: "Wind",
                r: "Rain (precipitation)",
                h: "Relative Humidity",
                d: "Dew",
                p: "Atmostpheric Pressure",
            };
 
            output2.append(
                $("<div>").html(
                    "Station: " +
                        result.data.city.name +
                        " on " +
                        result.data.time.s
                )
            );
 
            var table = $("<table/>").addClass("result");
            output2.append(table);
 
            for (var specie in result.data.iaqi) {
                var aqi = result.data.iaqi[specie].v;
                var tr = $("<tr>");
                tr.append($("<td>").html(names[specie] || specie));
                tr.append($("<td>").html(colorize(aqi, specie)));
                table.append(tr);
            }
           try{
           
            document.getElementById("cityval").innerHTML=(station.station.name);
            document.getElementById("value").innerHTML=(station.aqi);
            if(station.uid === ''){
                qualityDescription.innerHTML = 'Data not available';
                qualityIcon.innerHTML = '❌';
            }
            else if((station.aqi) >= 0 &&(station.aqi) <= 50){
                qualityDescription.innerHTML = 'Great';
                qualityIcon.innerHTML = '🤩';
            }
            else  if((station.aqi) >= 51 && (station.aqi) <= 100){
                qualityDescription.innerHTML = 'Moderate';
                qualityIcon.innerHTML = '😕';
            }
            else if((station.aqi) >= 101 && (station.aqi) <= 150){
                qualityDescription.innerHTML = 'Unhealthy';
                qualityIcon.innerHTML = '🥴';
            }
            else  if((station.aqi) >= 151 && (station.aqi) <= 200){
                qualityDescription.innerHTML = 'Harmful';
                qualityIcon.innerHTML = '😷';
            }
            else  if((station.aqi) >= 201 &&(station.aqi) <= 300){
                qualityDescription.innerHTML = 'Terrible';
                qualityIcon.innerHTML = '🤮';
            }
            else if(_.get(station.aqi) >= 300){
                qualityDescription.innerHTML = 'Dangerous';
                qualityIcon.innerHTML = '🤯';
            }
        }
            
            catch(error){
                locationElement.innerHTML = error;
                indexValue.innerHTML = ``;
                qualityIcon.innerHTML = '❌';
            }
        
        
        })
        .catch((e) => {
            output.html("<h2>Sorry, something wrong wrong</h2>" + e);
        });
}
 
function token() {
    return $(token.id).val()
}
 
function colorize(aqi, specie) {
    specie = specie || "aqi";
    if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0)
        return aqi;
 
    var spectrum = [
        { a: 0, b: "#cccccc", f: "#ffffff" },
        { a: 50, b: "#009966", f: "#ffffff" },
        { a: 100, b: "#ffde33", f: "#000000" },
        { a: 150, b: "#ff9933", f: "#000000" },
        { a: 200, b: "#cc0033", f: "#ffffff" },
        { a: 300, b: "#660099", f: "#ffffff" },
        { a: 500, b: "#7e0023", f: "#ffffff" },
    ];
 
    var i = 0;
    for (i = 0; i < spectrum.length - 2; i++) {
        if (aqi == "-" || aqi <= spectrum[i].a) break;
    }
    return $("<div/>")
        .html(aqi)
        .css("font-size", "120%")
        .css("min-width", "30px")
        .css("text-align", "center")
        .css("background-color", spectrum[i].b)
        .css("color", spectrum[i].f);
}
        
  
// GEOLOCATION
function geoloc(){
    output2=$(details)
    
    output3=$(details2);
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=> {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        const url =`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${apiKey}`;
       
        fetch(url)
        .then((x) => x.json())
        .then((result) => {
            // var info = token() == "demo" ? "(based on demo token)" : "";
           
           
            if (!result || result.status != "ok") {
                throw result.data;
            }
           
            if (result.data.length == 0) {
                output2.append("Sorry, there is no result for your query!");
                return;
            }
            var table = $("<table/>").addClass("result");
            output2.append(table);
 
            output2.append(
                $("<div/>").html(
                    "Click on the station to see the detailed AQI"
                )
            );
 
            // var output21 = $("<div/>");
            // output.append(output21);
            // station=result.data;
            //     var tr = $("<tr>");
            //     tr.append($("<td>").html(station.city.name));
            //     tr.append($("<td>").html(colorize(station.aqi)));
            //     tr.append($("<td>").html(station.time.stime));
                
            //     table.append(tr);
                
          
            
          
            // var table = $("<table/>").addClass("result");
            // output.append(table);
          
           
           
            
                    
            // var output21 = $("<div/>");
         
            output2.append(table);
           
            
                
     
                var names = {
                    pm25: "PM<sub>2.5</sub>",
                    pm10: "PM<sub>10</sub>",
                    o3: "Ozone",
                    no2: "Nitrogen Dioxide",
                    so2: "Sulphur Dioxide",
                    co: "Carbon Monoxide",
                    t: "Temperature",
                    w: "Wind",
                    r: "Rain (precipitation)",
                    h: "Relative Humidity",
                    d: "Dew",
                    p: "Atmostpheric Pressure",
                };
     
                output2.append(
                    $("<div>").html(
                        "Station: " +
                            result.data.city.name +
                            " on " +
                            result.data.time.s
                    )
                );
     
                var table1 = $("<table/>").addClass("result");
                output3.append(table1);
     
                for (var specie in result.data.iaqi) {
                    var aqi = result.data.iaqi[specie].v;
                    var tr = $("<tr>");
                    tr.append($("<td>").html(names[specie] || specie));
                    tr.append($("<td>").html(colorize(aqi, specie)));
                    table1.append(tr);
                }
        
            station=result.data;
            document.getElementById("cityval").innerHTML=(station.city.name);
            document.getElementById("value").innerHTML=(station.aqi);
            if(station.idx === ''){
                qualityDescription.innerHTML = 'Data not available';
                qualityIcon.innerHTML = '❌';
            }
            else if((station.aqi) >= 0 &&(station.aqi) <= 50){
                qualityDescription.innerHTML = 'Great';
                qualityIcon.innerHTML = '🤩';
            }
            else  if((station.aqi) >= 51 && (station.aqi) <= 100){
                qualityDescription.innerHTML = 'Moderate';
                qualityIcon.innerHTML = '😕';
            }
            else if((station.aqi) >= 101 && (station.aqi) <= 150){
                qualityDescription.innerHTML = 'Unhealthy';
                qualityIcon.innerHTML = '🥴';
            }
            else  if((station.aqi) >= 151 && (station.aqi) <= 200){
                qualityDescription.innerHTML = 'Harmful';
                qualityIcon.innerHTML = '😷';
            }
            else  if((station.aqi) >= 201 &&(station.aqi) <= 300){
                qualityDescription.innerHTML = 'Terrible';
                qualityIcon.innerHTML = '🤮';
            }
            else if((station.aqi) >= 300){
                qualityDescription.innerHTML = 'Dangerous';
                qualityIcon.innerHTML = '🤯';
            }
        
    
        
    
    }
        )

      
        .catch((e)=>{
            console.log(e);
        })
       
            
            
            
        
        })
       
    }
}