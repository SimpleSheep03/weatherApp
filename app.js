fetchWeather(document.getElementById('place').innerText.split(', ')[0].toLowerCase());

var prevPlace='allahabad';
var button = document.getElementById('button-addon2');
var inputArea= document.getElementById('nameInput');
button.addEventListener("click", findWeather);
inputArea.addEventListener("keydown", (e) =>{
    if(e.key=="Enter"){
        e.preventDefault();
        findWeather();
    }
});

function findWeather() {
    //fetch the name
    var placeName=inputArea.value;
    //call for fetchWeather
    fetchWeather(placeName);
    //clear
    document.getElementById('nameInput').value=""
}

async function fetchWeather(placeName){
    //fetch the weather
    await fetch(`http://api.weatherapi.com/v1/current.json?key=69afc791809c4a86bd151329241102&q=${placeName}`).then(res => res.json()).then(data => {
    console.log(data);

    //change place details
    document.getElementById('place').innerText=`${data.location.name}, ${data.location.region}, ${data.location.country}`;

    //fetch necessary details
    var current= data.current;
    var temp_c= current.temp_c;
    var temp_f= current.temp_f;
    var text=current.condition.text;
    var icon= current.condition.icon;
    var feelslike_c=current.feelslike_c;
    var humidity= current.humidity;


    //add to HTML
    var weatherUpdates = `
        <img src=${icon} id="icon"> </img>
        <div class="card text-white bg-danger" style="max-width: 10rem; max-height:6rem;" >
        <h4 class="card-title">Conditions</h4>
        <p class="card-text">${text}</p>
        </div>
        <div class="card text-white bg-danger" style="max-width: 10rem; max-height:6rem;" >
        <h4 class="card-title">Temperature observed</h4>
        <p class="card-text">${temp_c} \u00B0C or ${temp_f} \u00B0F</p>
        </div>
        <div class="card text-white bg-danger" style="max-width: 10rem; max-height:6rem;">
        <h4 class="card-title">Feels like</h4>
        <p class="card-text">${feelslike_c} \u00B0C</p>
        </div>
        <div class="card text-white bg-danger" style="max-width: 10rem; max-height:6rem;">
        <h4 class="card-title">Humidity</h4>
        <p class="card-text">${humidity} \u00B0C</p>
        </div>
    `;

    document.getElementById('weatherUpdates').innerHTML = weatherUpdates;

    }).catch(err => {
        console.log(err);
        alert("Sorry we couldn't find that place... Plase enter a valid place");
    })
    
}
