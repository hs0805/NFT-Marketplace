const log4js = require('log4js');

const { configParamConst } = require('../configuration/configurationManager');

/**
 * @author aaditya.indu
 * @returns function to get logger instance
 */
const initLogger = () => {
    try{
        return log4js.configure(
            {
                "appenders": {
                    "file" : {
                        type : "file",
                        layout: {
                            type : 'pattern',
                            pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%f{1}:%l] %m%n' 
                        },
                        filename : `${configParamConst.LOG_FILE_PATH}${configParamConst.PRODUCT_NAME}_${configParamConst.HTTP_STACK_HOST_IP}${configParamConst.LOG_FILE_EXTENSION}`,
                        maxLogSize : configParamConst.MAX_LOG_FILE_SIZE,
                        backups : configParamConst.LOG_BACKUPS,
                        compress : false,
                        keepFileExt : true, 
                    }
                },
                categories : {
                    default :  {
                        appenders : ["file"],
                        level : configParamConst.APPLICATION_LOG_LEVEL,
                        enableCallStack : true
                    }
                }
            }
        )
    }
    catch (err) {
        console.error(err);
    }
}

const logger = initLogger().getLogger();

module.exports = logger;