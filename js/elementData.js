const selectData = {
    STATES: [
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
    ],

    TYPES: [
        'all',
        'Alpine',
        'Trad',
        'Sport',
        'Mixed',
        'Aid'
    ],

    RATINGS: [
        'all',
        '5.0',
        '5.1',
        '5.2',
        '5.3',
        '5.4',
        '5.5',
        '5.6',
        '5.7',
        '5.8',
        '5.9',
        '5.10',
        '5.11',
        '5.12',
        '5.13',
        'Really friggin hard'
    ],

    PITCHES: [
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
    ],

    STARS: [
        'all',
        0,
        1,
        2,
        3,
        4,
        5
    ],

    SEARCH: [
        'routes',
        'users'
    ],

    DISTANCE: [
        100,
        10,
        20,
        50,
        100,
        200
    ]
}

const buildASelect = (select, data) => {
    data.forEach(item => {
        let option = document.createElement('option');
        if (typeof item !== 'string') {
            item = String(item)
        }
        option.text = item;
        option.value = item;
        select.add(option);
    })
}

const populateSelects = () => {

    //const state = document.querySelector('#location');
    const type = document.querySelector('#type');
    const rating = document.querySelector('#rating');
    const pitches = document.querySelector('#pitches');
    const stars = document.querySelector('#stars');
    const distance = document.querySelector('#distance')
    const search = document.querySelector('#search');

    //buildASelect(state, selectData.DISTANCE);  //REFACTOR Loop throught these
    buildASelect(type, selectData.TYPES);
    buildASelect(rating, selectData.RATINGS);
    buildASelect(pitches, selectData.PITCHES);
    buildASelect(stars, selectData.STARS);
    buildASelect(distance, selectData.DISTANCE);
    buildASelect(search, selectData.SEARCH);
}

window.addEventListener('load', populateSelects)
