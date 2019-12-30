//============ GLOBAL VARIABLES ============================ //REFACTOR take some of these out of the global scope
const submitBtn = document.querySelector('#submit-button');

const LOCATION = document.querySelector('#location');
const TYPE = document.querySelector('#type');           //REFACTOR use more of these params in the url
const RATING = document.querySelector('#rating');
const PITCHES = document.querySelector('#pitches');
const STARS = document.querySelector('#stars');
const SEARCH = document.querySelector('#search');
const DISTANCE = document.querySelector('#distance');

let LATITUDE = 40.50; //load map in Nebraska :-)
let LONGITUDE = -98.61;

let MAP = null;

const BASE_URL = 'https://www.mountainproject.com/data/';
const API_KEY = '200657331-fb49257b90603a32bd0fa8152f60be3d';

//===========================================================

// REFACTOR store urls in variables
const makeMap = new Promise((resolve, reject) => {
    let MAP = L.map('mapid').setView([LATITUDE, LONGITUDE], 4);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29uYmVjIiwiYSI6ImNrNHE3dWdvZDM2MzczanF4aDNiZjZweXgifQ.hicY00hru5iAZ4dg_0Cupg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiY29uYmVjIiwiYSI6ImNrNHE3dWdvZDM2MzczanF4aDNiZjZweXgifQ.hicY00hru5iAZ4dg_0Cupg'
    }).addTo(MAP);

    if (MAP){
        resolve(MAP);
    }
    else {
        reject(Error('failed to fetch map tile'));
    }
});

// make the map and listen for clicks
makeMap
.then(response => {
    response.on('click', (event) => {
        LATITUDE = event.latlng.lat;
        LONGITUDE = event.latlng.lng;
    });
})
// on load display random climbs

const buildURL = () => {
    let url = BASE_URL;
    if (SEARCH.value === 'routes'){     //REFACTOR need to make rating a range, break this down to managable pieces, finish users
        url += `get-routes-for-lat-lon?lat=${LATITUDE}&lon=${LONGITUDE}&maxDistance=${DISTANCE.value}&minDiff=${RATING.value}6&maxDiff=${RATING.value}&key=${API_KEY}`;
        console.log(url);
    } else if (SEARCH.value === 'users') {
        url += `get-user?key=${API_KEY}`;
    }
    return url;
}

const getClimbData = (url) => {
    return axios.get(url)
}

// create cards for climbs
    // go grab imgs from data urls
    // create display html

    //style all this shit so it works

// REFACTOR need to add user search and display to this
const submitQuery = async (event) => {
    event.preventDefault();
    const fullURL = buildURL();
    const climbData = await getClimbData(fullURL);
    displayClimbs(climbData)
}

submitBtn.addEventListener('click', submitQuery);
