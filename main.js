import fs from 'fs';
import chalk from 'chalk';
import yargs from 'yargs';

import { configure } from './utils/configurator';
import { questions } from './utils/questions';
import { location } from './utils/location';

import { getByCity, getByZipcode, latestQuery } from './utils/weather';
import defaultConfig from './utils/defaultConfig';
import userConfig from './weathercli-config.json';
import commandMain from './commands/main';

let multipleImport = false;
let multipleConfigPath = '';

const setLocationData = async (argv) => {
    const locationData = await location();
    const answers = await questions(userConfig, argv, locationData);

    userConfig.units = argv.units || answers.units || userConfig.units;

    if (answers.city === locationData.city) {
        userConfig.city = locationData.city;
        userConfig.country = locationData.countryCode;
        userConfig.zipcode = locationData.zip;

        await getByZipcode(userConfig);

    } else {
        userConfig.city = answers.city;

        userConfig.defaultQuery.city = true;
        userConfig.defaultQuery.zipcode = false;

        await getByCity(userConfig);
    }
};

const setZipcodeData = (argv) => {
    const { units, zipcode } = argv;

    userConfig.zipcode = zipcode[0].toString();
    userConfig.country = zipcode[1];
    userConfig.units = units || userConfig.units;

    userConfig.defaultQuery.zipcode = !!userConfig.zipcode;
    userConfig.defaultQuery.city = false;

};

const getQuestionData = async (argv) => {
    const query = await questions(userConfig, argv);
    const { zipcode, city, units } = query;

    userConfig.country = zipcode.split(' ')[1];
    userConfig.zipcode = zipcode.split(' ')[0];
    userConfig.city = city;
    userConfig.units = units;
};

const app = yargs
    .command('$0', 'display weather', commandMain,
        async (argv) => {

            const { zipcode, city, latest, units, geolocation } = argv;
            if (argv.import && argv.import.length) {
                console.log('Config imported');
                if (multipleImport && multipleConfigPath) {
                    const locations = fs.readFileSync(multipleConfigPath, 'utf8');
                    const locationList = JSON.parse(locations);
                    console.log(chalk.green.bgBlack(`\nDisplaying weather for ${locationList.length} cities`));
                    for (let i = 0; i < locationList.length; i++) {
                        await getByZipcode(locationList[i]);
                        if (i === 9) {
                            break;
                        }
                    }
                } else {
                    await getByZipcode(argv);
                }

            } else {

                switch (true) {
                    case geolocation && !latest && !city:
                        await setLocationData(argv);
                        break;
                    case zipcode && zipcode.length !== 0 && !argv.import:
                        setZipcodeData(argv);
                        await getByZipcode(userConfig);
                        break;
                    case (city || units) && !argv.geolocation:
                        userConfig.city = city || userConfig.city;

                        userConfig.defaultQuery.city = !!userConfig.city;
                        userConfig.defaultQuery.zipcode = false;

                        userConfig.units = units || userConfig.units;
                        await getByCity(userConfig);
                        break;
                    case latest:
                        await latestQuery(userConfig);
                        process.exit(0);
                        break;
                    case !argv._.length && !argv.geolocation && !argv.import
                    && !argv.city && !argv.units && !argv.zipcode:
                        await getQuestionData(argv);
                        await getByZipcode(userConfig);
                        break;
                    default:
                        console.log('no command', argv);
                        break;
                }
                configure(userConfig);
            }
            process.exit(0);
        }
    )
    .config('import', (configPath) => {
        if (configPath !== defaultConfig.configPath) {
            const newConfig = fs.readFileSync(configPath, 'utf-8');
            if (newConfig[0] !== '[') {
                multipleImport = false;
                multipleConfigPath = configPath;
                fs.writeFileSync(defaultConfig.configPath, newConfig);
            } else {
                multipleImport = true;
                multipleConfigPath = configPath;
            }
        }
        return JSON.parse(fs.readFileSync(defaultConfig.configPath, 'utf8'));
    })
    .help()
    .argv;
