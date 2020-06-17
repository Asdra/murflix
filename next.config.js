const path = require('path');

const conf = {
    webpack(config, { isServer }) {
        config.resolve.alias['~'] = path.resolve(__dirname);
        config.resolve.alias['@lib'] = path.resolve(__dirname + "/lib");
        
        return config;
    }
};

module.exports = conf;