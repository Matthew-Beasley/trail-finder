const STATES = [
    'all',
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
];

const TYPES = [
    'all',
    'Alpine',
    'Trad',
    'Sport',
    'Mixed',
    'Aid'
]

const RATINGS = [
    'all',
    5.0,
    5.1,
    5.2,
    5.3,
    5.4,
    5.5,
    5.6,
    5.7,
    5.8,
    5.9,
    5.10,
    5.11,
    5.12,
    5.13,
    'Really friggin hard'
];

const PITCHES = [
    'all',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    'more than 10'
]

const STARS = [
    'all',
    0,
    1,
    2,
    3,
    4,
    5
]

const buildASelect = (select, data) => {
    data.forEach(item => {
        let option = document.createElement('option');
        if (typeof item !== 'string') {
            item = String(item)
        }
        option.text = item;
        option.value = item;
        select.add(option, null);
    })
}

const populateSelects = () => {

    const state = document.querySelector('#location');
    const type = document.querySelector('#climb-type');
    const rating = document.querySelector('#rating');
    const pitches = document.querySelector('#pitches');
    const stars = document.querySelector('#stars');

    buildASelect(state, STATES);
    buildASelect(type, TYPES);
    buildASelect(rating, RATINGS);
    buildASelect(pitches, PITCHES);
    buildASelect(stars, STARS);
}

window.addEventListener('load', populateSelects)
