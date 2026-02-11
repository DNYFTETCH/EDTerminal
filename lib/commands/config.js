const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const os = require('os');
const inquirer = require('inquirer');

const configPath = path.join(os.homedir(), '.edterminal', 'config.json');

module.exports = (program) => {
  program
    .command('config')
    .alias('cfg')
    .description('Configure EDTerminal settings')
    .option('-l, --list', 'List all configurations')
    .option('-s, --set <key=value>', 'Set configuration value')
    .option('-g, --get <key>', 'Get configuration value')
    .option('-r, --reset', 'Reset to default configuration')
    .action(async (options) => {
      
      // Ensure config directory exists
      const configDir = path.dirname(configPath);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }

      // Load or create config
      let config = {};
      if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      }

      // Handle different options
      if (options.list) {
        console.log(chalk.cyan('\n⚙️  EDTerminal Configuration:\n'));
        Object.entries(config).forEach(([key, value]) => {
          console.log(`  ${chalk.yellow(key)}: ${chalk.white(value)}`);
        });
        console.log('\n');
      }
      else if (options.set) {
        const [key, value] = options.set.split('=');
        if (key && value) {
          config[key] = value;
          fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
          console.log(chalk.green(`✓ Configuration updated: ${key}=${value}`));
        } else {
          console.log(chalk.red('✗ Invalid format. Use: --set key=value'));
        }
      }
      else if (options.get) {
        const value = config[options.get];
        if (value) {
          console.log(chalk.white(`${options.get}=${value}`));
        } else {
          console.log(chalk.yellow(`Configuration key not found: ${options.get}`));
        }
      }
      else if (options.reset) {
        config = {
          theme: 'default',
          editor: process.env.EDITOR || 'vim',
          format24h: true,
          showBanner: true
        };
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log(chalk.green('✓ Configuration reset to defaults'));
      }
      else {
        // Interactive configuration
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'theme',
            message: 'Select color theme:',
            choices: ['default', 'dark', 'light', 'high-contrast'],
            default: config.theme || 'default'
          },
          {
            type: 'input',
            name: 'editor',
            message: 'Default editor:',
            default: config.editor || process.env.EDITOR || 'vim'
          },
          {
            type: 'confirm',
            name: 'format24h',
            message: 'Use 24-hour format:',
            default: config.format24h !== undefined ? config.format24h : true
          },
          {
            type: 'confirm',
            name: 'showBanner',
            message: 'Show banner on startup:',
            default: config.showBanner !== undefined ? config.showBanner : true
          }
        ]);

        fs.writeFileSync(configPath, JSON.stringify(answers, null, 2));
        console.log(chalk.green('\n✓ Configuration saved successfully!\n'));
      }
    });
};
