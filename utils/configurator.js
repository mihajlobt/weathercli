import fs from 'fs';
import defaultConfig from './defaultConfig';

export const configure = (config) => {
    fs.writeFileSync(defaultConfig.configPath, JSON.stringify(config));
    console.log('Config updated!');
};
