## CLI Weather App

#### Libraries Used
* [Yargs](https://yargs.js.org/docs/) - for command line handling - 
* [Inquirer](https://www.npmjs.com/package/inquirer) - for command prompts
* [Got](https://github.com/sindresorhus/got) - for API requests

#### Features
* Minimal interface
* Geolocation auto-configuration (disabled by default - use flag --geo or --geolocation)
* NodeJS ESM modules
* ES6 Syntax

#### Install
    git clone repository
    yarn install in repository root
    
    open './utils/defaultConfig.js' and enter your OpenWeather API Key
    
    run npm link
    

#### How to Use
    weathercli [flags]
    
##### Flags help - to list all flags and get help
    weathercli --help
    
##### import a config with one or multiple locations 
    weathercli --import ./path-to-file    
__Config example - Single Location__

    {"zipcode":"1000","units":"celsius","city":"skopje","country":"mk","defaultQuery":{"zipcode":false,"city":true}} 
    
__Config example - Multiple Locations__
    
    [
          {"zipcode":"1000","units":"c","city":"Skopje","country":"MK","defaultQuery":{"zipcode":false,"city":true}},
          {"zipcode":"7000","units":"f","city":"Bitola","country":"MK","defaultQuery":{"zipcode":false,"city":true}}
    ]
    


#### Help
    Options:
      --version                 Show version number                        [boolean]
      --import                  Path to JSON config file
      --help                    Show help                                  [boolean]
      --city, -c                City name
      --units, -u               Units by which temperature is displayed
                                        [choices: "f", "c", "celsius", "fahrenheit"]
      --zipcode, -z             Zipcode and country code Zipcode and country code
                        flag separated by space (ex: 7000 MK)                [array]
      --latest, -l              Fetch the latest weather query             [boolean]
      --geolocation, -g, --geo  Use geolocation to auto-configure and display the
                                weather.                  [boolean] [default: false]
