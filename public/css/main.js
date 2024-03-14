// const jsdom = require('jsdom')
// const dom = new jsdom.JSDOM("")
// const jquery = require('jquery')(dom.window)








const ACCESS_KEY="sk-AmXN65f13f654c1504550";
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
const slide=document.getElementsByClassName("mySlides");
tokenId = apiKey;

let input = searchInput;
let output = details;

document.querySelector("#indoor1").style.display="none";


searchButton.addEventListener('click', (e)=> {
    document.querySelector("#indoor1").style.display="none";
     init();
     document.getElementById('indoor-iframe').style.display = "none";
    search(searchInput.value,details);
    e.preventDefault();
});
geoButton.addEventListener("click" ,(e) => {
    init();
    geoloc();
    document.querySelector("#indoor1").style.display="block";
    
    document.getElementById("initialbutton").style.display='block';
    document.getElementById("initialbutton1").style.display='flex';
    document.getElementById("initialbutton2").style.display='flex';
    document.getElementById("initialbutton1").style.flexDirection='column';
    document.getElementById("initialbutton2").style.flexDirection='row';
    document.getElementById('indoor-iframe').style.display = "block";
 
    document.getElementById('solutions').style.display = "block";
    document.getElementById("slideshow").style.display="block";
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
          document.getElementById("result1").innerHTML=calculateCigarettes(station.aqi);
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
            else  if((station.aqi) >= 151 && (station.aqi) <= 160){
                qualityDescription.innerHTML = 'Harmful';
                qualityIcon.innerHTML = '😷';
            }
            else  if((station.aqi) >= 161 &&(station.aqi) <= 300){
                qualityDescription.innerHTML = 'Terrible';
                qualityIcon.innerHTML = '🤮';
            }
            else if(_.get(station.aqi) >= 301){
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
            document.getElementById("result1").innerHTML=calculateCigarettes(station.aqi);
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
            else  if((station.aqi) >= 151 && (station.aqi) <= 160){
                qualityDescription.innerHTML = 'Harmful';
                qualityIcon.innerHTML = '😷';
            }
            else  if((station.aqi) >= 161 &&(station.aqi) <= 300){
                qualityDescription.innerHTML = 'Terrible';
                qualityIcon.innerHTML = '🤮';
            }
            else if((station.aqi) >= 301){
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
function yogmantra(){
    let yogabutton= document.getElementById("yogmantra");
    yogabutton.style.display="flex";
    yogabutton.style.flexDirection="row";
}
function plantmantra(){
    let plantdetails= document.getElementById("plants");
    plantdetails.style.display="block";
   
   
}
function smokingantra(){
    let formdetails= document.getElementById("quitform");
    formdetails.style.display="block";
   
   
}

function back(){
    document.getElementById("initialbutton").style.display="block";
    document.getElementById("asana0").style.display="none";
    document.getElementById("yogmantra").style.display="none";
}
    
async function yoga1(i){
    document.getElementById("initialbutton").style.display="none";
yogabutton=document.getElementById("yogmantra");
yogabutton.style.display="inline-block";

const apiUrl = "https://yoga-api-nzy4.onrender.com/v1/categories?id=4";
const output = document.getElementById('output');

const response = await fetch(apiUrl); 
const data1 = await response.json(); 
const data=data1.poses;
    let english_name=data[i].english_name;
    let pose_benefits=data[i].pose_benefits;
    let pose_description=data[i].pose_description;
    let sanskrit_name=data[i].sanskrit_name;
    let translation_name=data[i].translation_name;
    let desdiv=document.getElementById("asana0");
    desdiv.innerHTML="English name: "+english_name+"<br>"+" Pose benefits: "+pose_benefits+"<br>"+"pose-description"+pose_description+"<br>"+"Sanskrit name"+sanskrit_name+"<br>"+"Translation name:"+translation_name;
    let imgdiv=document.getElementById("asana-pic");
       let img=document.createElement("img");
       img.src=data[i].url_png;
      desdiv.appendChild(img);
}



function Searchplant () {
   
 let htmlcode1=``;let htmlcode2=``;let htmlcode3=``;
     fetch('/css/plantjson.json')
        .then(response =>response.json())
        .then(result => {
            
     result1=result.data;
      card=document.getElementById("card");
    for(i=3;i<14;i++){
        if(i==5||i==6)
        continue;
   htmlcode1=htmlcode1+`<button class="button-89" id="${i}"onclick=appendcard(event)>${result1[i].common_name}</button>`
   createcard(i);   
   

    }
       
    for(i=16;i<19;i++){
       
        htmlcode2=htmlcode2+`<button class="button-89" id="${i}" onclick=appendcard(event)>${result1[i].common_name}</button>`
        createcard(i);
        
    
      }
      for(i=28;i<30;i++){
       
        htmlcode3=htmlcode3+ `<button class="button-89" id="${i}" onclick=appendcard(event)>${result1[i].common_name}</button>`;
        
    createcard(i);
      }
     card.innerHTML=``;
      card.innerHTML=htmlcode1;
      card.innerHTML+=htmlcode2;
    card.innerHTML+=htmlcode3+`<button class="button-89" onclick=back1(event)>back</button>`;
    console.log(htmlcode1);
     
    })
.catch(error => console.log('error', error));
}
function back1(){
    var ele = document.getElementsByClassName("button-89");
    for (var i = 0; i < ele.length; i++ ) {
        ele[i].style.display = "none";
    }

var ele = document.getElementsByClassName("cardp");
for (var i = 0; i < ele.length; i++ ) {
ele[i].style.display="none";
}
}
let card1=document.getElementById("card1");
let htmlCode = ``;
function createcard(i){
    fetch('/css/plantjson.json')
    .then(response =>response.json())
    .then(result => {
     
     result1=result.data;
    image=result1[i].default_image;
        htmlCode =
    htmlCode +
    `
    <article class="cardp" id="${i}card">
      <div class="plant-desp2">
      <img src="${image.original_url}" alt="${image.regular_url}" >
      </div>
      <div class="container" id="plant-desp">
      <h3>Name: ${result1[i].common_name}</h3>
      <p>Scientific Name: ${result1[i].scientific_name}</p>
      <p>watering: ${result1[i].watering}</p>
      <p>Sunlight: ${result1[i].sunlight}</p>
      </div>
    </article>
  `;
  // uncomment the line below to see the output in the browser console.
  // console.log(htmlCode);
  card1.innerHTML=htmlCode;
})
}
function reset(){
    var ele = document.getElementsByClassName('cardp');
    for (var i = 0; i < ele.length; i++ ) {
        ele[i].style.display = "none";
    }
}
function appendcard(event){
   reset();
 target=event.target;
document.getElementById(target.id+"card").style.display="inline-block";
}
var form = document.forms['quitform'];
var quitdate = form.elements[0];
var startdate = form.elements[1];
var packs_a_day = form.elements[2];
var price_pack = form.elements[3];
var textarea = form.elements[5];

form.addEventListener("submit", submit, false);


function submit() {
	date1 = new Date(quitdate.value);
	date2 = new Date(startdate.value);
	diffTime = Math.abs(date2 - date1);
	diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	total_cost = parseFloat(packs_a_day.value) * parseFloat(price_pack.value) * diffDays;
	textarea.value = "Days Quit: "+diffDays+", Money Saved Rs"+total_cost;
	event.preventDefault();
}
function smokingmantra(){
    
    let form=document.getElementById("quitform");
    form.style.display="inline-block";
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
function back2(){
document.getElementById("quitform").style.display="none";
}


var ipinfo;
var city;
var aqiData;
var aqi;
var conc;
var ciggs;

async function getIpInfo() {
  await fetch("https://ipinfo.io/json?token=a38819ed3126d7")
    .then((res) => res.json())
    .then((data) => {
      ipinfo = data;
      city = ipinfo.city;
    })
    .then(() => {
      populateLocationNav();
      getAQI();
    });
}
async function getAQI() {
  const url = `https://api.waqi.info/feed/${city}?token=0aad6101e2cee1b141964b71dd78ec8b05345cb8`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      aqiData = data;
      aqi = aqiData.data.aqi;
      populateAQI();
      updateAQIStyle(aqi);
      aqi2ciggs(aqi);
    });
}
const AQITablePM25 = {
    concentrations: [
        { min: 0, max: 15.5, index: { min: 0, max: 50 } },
        { min: 15.5, max: 40.5, index: { min: 50, max: 100 } },
        { min: 40.5, max: 65.5, index: { min: 100, max: 150 } },
        { min: 65.5, max: 150.5, index: { min: 150, max: 200 } },
        { min: 150.5, max: 250.5, index: { min: 200, max: 300 } },
        { min: 250.5, max: 500.5, index: { min: 300, max: 400 } },
        { min: 500.5, max: 99999999999, index: { min: 400, max: 99999999999 } }
    ]
};

function getBreakpoints(AQI) {
    const breakpoints = AQITablePM25.concentrations.find(function (conc) {
        if (conc.index.min <= AQI && conc.index.max > AQI) {
            return conc;
        }
    });
    if (breakpoints === undefined) {
        throw new Error(`AQI out of bounds. AQI: ${AQI}`);
    }
    return breakpoints;
}


function calcPM25(AQI) {
    const breakpoints = getBreakpoints(AQI);
    const PM_min = breakpoints.min;
    const PM_max = breakpoints.max;
    const AQI_min = breakpoints.index.min;
    const AQI_max = breakpoints.index.max;

    const PM = ((AQI - AQI_min) / (AQI_max - AQI_min)) * (PM_max - PM_min) + PM_min;

    return PM;
}

function aqiToCigarettes(particleConcentration) {
    const cigarettesPerParticle = 1 / 22;
    const cigarettesPerDay = particleConcentration * cigarettesPerParticle;

    return cigarettesPerDay;
}


function calculateCigarettes(aqiInput) {
   

    if (isNaN(aqiInput) || aqiInput <= 0) {
        alert("Please enter a valid positive AQI.");
        return;
    }


    const particleConcentration = calcPM25(aqiInput);


    const cigarettesEquivalent = aqiToCigarettes(particleConcentration);

    
    return `It seems like you've smoked ${cigarettesEquivalent.toFixed(2)} cigarettes`;
}

