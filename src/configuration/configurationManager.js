// process.env["NODE_CONFIG_DIR"] = "./config" ;

// process.env.ALLOW_CONFIG_MUTATIONS = "true" ;

const config = require('config');    // this config refer to yaml file in config folder of root directory

/**
 * @author happy.singh
 * @description load config parameter using config module
 * @param {String} paramName 
 * @returns 
 */

const loadConfig = (paramName) => {
    try {
        if(config.has(paramName))
            return config.get(paramName);
        else 
            console.error(`Parameter ${paramName} not found in configuration file`);
    }
    catch(e) {
        console.error(e);
    }
}

/**
 * @author happy.singh
 * @description immutable parameter loaded / startup configurtion parameters
 */
const configParamConst = Object.freeze({
   HTTP_STACK_HOST_IP: loadConfig("httpStackHostIp"),
   HTTP_STACK_PORT: loadConfig('httpStackPort'),
   PRODUCT_NAME: loadConfig('productName'),
   APPLICATION_LOG_LEVEL: loadConfig('applicationLogLevel'),
   MAX_LOG_FILE_SIZE: loadConfig('maxLogFileSize'),
//    MAX_BACKUP_INDEX: loadConfig('maxBackupIndex'),
   LOG_FILE_PATH: loadConfig('logFilePath'),
   LOG_FILE_EXTENSION: loadConfig('logFileExtension'),
   LOG_BACKUPS: loadConfig('logBackups'),
});

module.exports = {
    configParamConst
}
