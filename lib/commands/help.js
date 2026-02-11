const chalk = require('chalk');
const Table = require('cli-table3');

module.exports = (program) => {
  program
    .command('help')
    .alias('h')
    .description('Show all available commands')
    .action(() => {
      const table = new Table({
        head: [chalk.cyan('Command'), chalk.cyan('Description')],
        colWidths: [20, 50]
      });

      table.push(
        ['ed help', 'Show this help message'],
        ['ed info', 'Show system information'],
        ['ed time', 'Show current time and date'],
        ['ed config', 'Configure EDTerminal settings'],
        ['ed config list', 'List all configurations'],
        ['ed greet <name>', 'Greet someone'],
        ['ed weather <city>', 'Show weather (requires API key)'],
        ['ed version', 'Show version information']
      );

      console.log(chalk.yellow('\n📚 Available Commands:\n'));
      console.log(table.toString());
      console.log(chalk.gray('\nTip: Use ed <command> --help for specific command details\n'));
    });
};
