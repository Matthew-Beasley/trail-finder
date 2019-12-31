//============ GLOBAL VARIABLES ============================

//REFACTOR take some of these out of the global scope
const submitBtn = document.querySelector('#submit-button');
const mapBtn = document.querySelector('#map-button');
const deskTop = document.querySelector('#desk-top');

const TYPE = document.querySelector('#type');
const RATING = document.querySelector('#rating');
const PITCHES = document.querySelector('#pitches');
const STARS = document.querySelector('#stars');
const SEARCH = document.querySelector('#search');
const DISTANCE = document.querySelector('#distance');
const EMAIL = document.querySelector('#email');

let LATITUDE = 40.50; //loading map in Nebraska :-)
let LONGITUDE = -98.61;

const BASE_URL = 'https://www.mountainproject.com/data/';
const API_KEY = '200657331-fb49257b90603a32bd0fa8152f60be3d';

//===========================================================

// REFACTOR store urls in variables?
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

makeMap
.then(response => {
    response.on('click', (event) => {
        LATITUDE = event.latlng.lat;
        LONGITUDE = event.latlng.lng;
        document.querySelector('#lat').value = LATITUDE;
        document.querySelector('#lon').value = LONGITUDE;
    });
})

const buildURL = () => {
    let url = '';
    if (SEARCH.value === 'routes'){     //REFACTOR need to make rating a range, break this down to managable pieces, finish users
        url += `${BASE_URL}get-routes-for-lat-lon?lat=${LATITUDE}&lon=${LONGITUDE}&maxDistance=${DISTANCE.value}`;
        url += `&minDiff=${RATING.value}6&maxDiff=${RATING.value}&stars=${STARS}&pitches=${PITCHES}&type=${TYPE}&key=${API_KEY}`;
    } else if (SEARCH.value === 'users') {
        url = `${BASE_URL}get-user?email=${EMAIL.value}&key=${API_KEY}`;
    }
    return url;
}

const getClimbData = (url) => {
    return axios.get(url)
}

const sterilizeData = (data) => {
    for (let key in data){
        if (key === undefined || key === '') {
            delete data.key;
        }
    }
    return data;
}

//REFACTOR do string parsing to get the big picture displayed when a card is clicked,
//         need to be able to go back to previous page without reloading map
const displayBigCard = ({target}) => {
    if (target.classList.contains('card')){
        deskTop.innerHTML = 'Sorry, under construction';
        deskTop.innerHTML += target.outerHTML;
   }
}

const displayClimbs = (dataObj) => {
    const routes = dataObj.data.routes;
    let html = '';
    //REFACTOR pitches comes up empty sometimes, key hardcoded
    routes.forEach(route => {
        route = sterilizeData(route);
        html +=
        `<div class="card">
            <img src="${route.imgSmallMed}">
            <h3>${route.name}</h3> 
            <div class="list-container">
                <ul class="route-info">
                    <li>Type: ${route.type}</li>
                    <li>Difficulty: ${route.rating}</li>
                    <li>Stars: ${route.stars}</li>
                    <li>Pitches: ${route.pitches}</li> 
                </ul> 
                <ul class="location">
                    <li>Location: ${route.name}</li>
                    ${route.location.map(locale => `
                        <li>${locale}</li>
                    `).join('\n')}
                </ul>
            </div>
        </div>`
    });

    document.querySelector('#desk-top').innerHTML = html;
}

//REFACTOR better/more data displayed
const displayUsers = (dataObj) => {
    let user = dataObj.data;
    user = sterilizeData(user);
    let html =
        `<div class="card">
            <img src="${user.avatar}">
            <h3>${user.name}</h3> 
            <a href="${user.url}">User URL</a>
        </div>`;
    deskTop.innerHTML = html;
}

const toggleMap = (selector) => {
    const mapDiv = document.querySelector('#mapid');

    if (selector === 'on') {
        mapDiv.classList.add('active');
        deskTop.classList.remove('active');
    }
    else if (selector === 'off') {
        mapDiv.classList.remove('active');
        deskTop.innerHTML = '';
        deskTop.classList.add('active');
    }
}

const submitQuery = async (event) => {
    event.preventDefault();
    toggleMap('off')
    const fullURL = buildURL();
    const climbData = await getClimbData(fullURL);

    if (SEARCH.value === 'routes') {
        displayClimbs(climbData)
        console.log('in the route if statement')
    } else if (SEARCH.value === 'users') {
        displayUsers(climbData);
    }
}

document.querySelector('#mapid').style.cursor = 'crosshair';
submitBtn.addEventListener('click', submitQuery);
mapBtn.addEventListener('click', () => {toggleMap('on')});
deskTop.addEventListener('click', displayBigCard);
