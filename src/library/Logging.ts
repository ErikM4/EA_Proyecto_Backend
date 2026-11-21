import chalk from 'chalk';
import util from 'util';

const formatArgs = (args: unknown): string => (typeof args === 'string' ? args : util.inspect(args, { depth: null, colors: true }));

export default class Logging {
    public static log = (args: unknown) => this.info(args);

    public static info = (args: unknown) => {
        const message = typeof args === 'string' ? chalk.blueBright(args) : formatArgs(args);
        process.stdout.write(`${chalk.blue(`[${new Date().toLocaleString()}] [INFO]`)} ${message}\n`);
    };

    public static warning = (args: unknown) => {
        const message = typeof args === 'string' ? chalk.yellowBright(args) : formatArgs(args);
        process.stdout.write(`${chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`)} ${message}\n`);
    };

    public static error = (args: unknown) => {
        const message = typeof args === 'string' ? chalk.redBright(args) : formatArgs(args);
        process.stderr.write(`${chalk.red(`[${new Date().toLocaleString()}] [ERROR]`)} ${message}\n`);
    };
}
