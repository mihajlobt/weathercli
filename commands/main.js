export default {
    city: {
        alias: 'c',
        describe: 'City name'
    },
    units: {
        alias: 'u',
        describe: 'Units by which temperature is displayed',
        choices: ['f', 'c', 'celsius', 'fahrenheit']
    },
    zipcode: {
        alias: 'z',
        type: 'array',
        describe: 'Zipcode and country code flag separated by space (ex: 7000 MK)'
    },
    latest: {
        alias: 'l',
        type: 'boolean',
        describe: 'Fetch the latest weather query'
    },
    geolocation: {
        alias: ['g', 'geo'],
        type: 'boolean',
        default: false,
        describe: 'Use geolocation to auto-configure and display the weather.'
    }
};
