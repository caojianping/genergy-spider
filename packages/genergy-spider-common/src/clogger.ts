import log4js, { Logger } from 'log4js';

const logPath = '../logs/';

log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: logPath + 'logger.log' },
        dateFile: {
            type: 'dateFile',
            filename: logPath + 'logger',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            absolute: false,
        },
    },
    categories: {
        default: { appenders: ['dateFile'], level: 'INFO' },
        console: { appenders: ['console'], level: 'INFO' },
        logger: { appenders: ['file'], level: 'INFO' },
        loggers: { appenders: ['dateFile'], level: 'INFO' },
    },
});

let console: Logger = log4js.getLogger('console'),
    logger: Logger = log4js.getLogger('logger'),
    loggers: Logger = log4js.getLogger('loggers');

export class Clogger {
    public static console: Logger = console;
    public static logger: Logger = logger;
    public static loggers: Logger = loggers;

    public static httpUse(app: any) {
        app.use(
            log4js.connectLogger(loggers, {
                level: 'INFO',
                format: ':method :url',
            })
        );
    }
}
