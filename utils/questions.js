import inquirer from 'inquirer';

export const questions = async (config, argv, locationData) => {


    const unitsQuestion = {
        type: 'list',
        name: 'units',
        message: 'Choose units of temperature:',
        default: 'c',
        choices: [
            'Celsius', 'Fahrenheit'
        ],
        filter(input) {
            return input.toLowerCase();
        }
    };

    const defaultQuestions = [
        unitsQuestion,
        {
            type: 'input',
            name: 'city',
            message: 'Enter city name',
            validate(input) {
                return !(!input || !input.length);
            }
        },
        {
            type: 'input',
            name: 'zipcode',
            message: 'Enter Zipcode and Country Code',
            validate(input) {
                return !(!input || !input.length);
            }
        }
    ];
    const geoQuestions = [
        {
            type: 'input',
            name: 'city',
            message: `Which city? ${locationData ? locationData.city : ''}?`,
            default: locationData ? locationData.city : ''
        },
        unitsQuestion
    ];
    const inquiries = argv.geolocation ? geoQuestions : defaultQuestions;

    return inquirer.prompt(inquiries);
};
