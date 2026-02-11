const chalk = require('chalk');
const os = require('os');
const boxen = require('boxen');
const packageJson = require('../../package.json');

module.exports = (program) => {
  program
    .command('info')
    .alias('i')
    .description('Show system and environment information')
    .action(() => {
      const info = [
        `${chalk.bold('EDTerminal')} ${chalk.green('v' + packageJson.version)}`,
        `${chalk.bold('Node.js')} ${chalk.cyan(process.version)}`,
        `${chalk.bold('Platform')} ${chalk.yellow(os.platform() + ' ' + os.arch())}`,
        `${chalk.bold('OS')} ${chalk.magenta(os.type() + ' ' + os.release())}`,
        `${chalk.bold('CPU')} ${chalk.blue(os.cpus()[0].model)}`,
        `${chalk.bold('Memory')} ${chalk.white(Math.round(os.totalmem() / 1024 / 1024 / 1024) + 'GB')}`,
        `${chalk.bold('Uptime')} ${chalk.gray(Math.round(os.uptime() / 60 / 60) + ' hours')}`,
        `${chalk.bold('Home')} ${chalk.gray(os.homedir())}`
      ];

      console.log(
        boxen(info.join('\n'), {
          padding: 1,
          margin: 1,
          borderStyle: 'double',
          borderColor: 'cyan',
          title: '🖥️  System Information',
          titleAlignment: 'center'
        })
      );
    });
};
