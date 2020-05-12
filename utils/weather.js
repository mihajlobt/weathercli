import got from 'got';
import { weatherDisplay } from './display';
import defaultConfig from './defaultConfig';
import userConfig from '../weathercli-config.json';

const { url, apiKey } = defaultConfig;

const convertUnits = (units) => {
    switch (units) {
        case 'c':
            return 'metric';
        case 'celsius':
            return 'metric';
        case 'f':
            return 'imperial';
        case 'fahrenheit':
            return 'imperial';
        default:
            return convertUnits(userConfig.units);
    }
};

const getByZipcode = async (data) => {
    const { zipcode, country, units } = data;
    const tempUnits = convertUnits(units);
    try {
        const response = await got(
            `${url}?zip=${zipcode},${country}&units=${tempUnits}&appid=${apiKey}`
        );
        weatherDisplay(response.body, tempUnits);
    } catch (error) {
        console.log('error getting weather', error);
    }
};

const getByCity = async (data) => {
    const { units, city } = data;
    const tempUnits = convertUnits(units);
    try {
        const response = await got(
            `${url}?q=${city}&units=${tempUnits}&appid=${apiKey}`
        );
        weatherDisplay(response.body, tempUnits);
    } catch (error) {
        console.log('invalid city', error);
    }
};

const latestQuery = async (config) => {
    const { defaultQuery } = config;
    if (defaultQuery.zipcode) {
        await getByZipcode(config);
    } else {
        await getByCity(config);
    }
};


export {
    getByZipcode,
    getByCity,
    latestQuery
};
