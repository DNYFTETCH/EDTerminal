#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const boxen = require('boxen');
const packageJson = require('./package.json');
const helpCommand = require('./lib/commands/help');
const infoCommand = require('./lib/commands/info');
const timeCommand = require('./lib/commands/time');
const configCommand = require('./lib/commands/config');

// Display banner
console.log(
  chalk.cyan(
    figlet.textSync('EDTerminal', { 
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })
  )
);

console.log(
  boxen(chalk.green('Enhanced Developer Terminal Utility v' + packageJson.version), {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'cyan'
  })
);

// Initialize CLI
program
  .name('ed')
  .version(packageJson.version, '-v, --version', 'Output the current version')
  .description('EDTerminal - Your terminal companion for development')
  .option('-d, --debug', 'Output debug information')
  .hook('preAction', (thisCommand, actionCommand) => {
    if (program.opts().debug) {
      console.log(chalk.gray(`[DEBUG] Executing command: ${actionCommand.name() || 'none'}`));
    }
  });

// Register commands
helpCommand(program);
infoCommand(program);
timeCommand(program);
configCommand(program);

// Default command
program
  .command('default', { isDefault: true })
  .description('Show welcome message')
  .action(() => {
    console.log(chalk.white('\nWelcome to EDTerminal!'));
    console.log(chalk.yellow('Type ') + chalk.cyan('ed help') + chalk.yellow(' to see available commands\n'));
  });

// Error handling
program.showSuggestionAfterError(true);

program.parse(process.argv);
