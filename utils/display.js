import chalk from 'chalk';

const weatherDisplay = (data, units) => {
    const display = JSON.parse(data);
    console.log(
    `${chalk.black.bgWhite.bold(`\n Current weather in ${display.name}, ${display.sys.country}: \n`)}
     ${chalk.blueBright(display.main.temp)}${chalk.blueBright(units === 'metric' ? '°C' : '°F')}, feels like ${Math.ceil(display.main.feels_like)}\n`
    );
};

export {
    weatherDisplay
};
