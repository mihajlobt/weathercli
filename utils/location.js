import got from 'got';

export const location = async () => {
    const response = await got('http://ip-api.com/json/?fields=countryCode,city,zip');
    return JSON.parse(response.body);
};
