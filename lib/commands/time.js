const chalk = require('chalk');

module.exports = (program) => {
  program
    .command('time')
    .alias('t')
    .description('Show current date and time')
    .option('-f, --format <type>', 'Time format (12h/24h)', '24h')
    .action((options) => {
      const now = new Date();
      
      let timeString;
      if (options.format === '12h') {
        timeString = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      } else {
        timeString = now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      }

      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      console.log(chalk.cyan('\n📅 Date:'), chalk.white(dateString));
      console.log(chalk.cyan('⏰ Time:'), chalk.white(timeString));
      console.log(chalk.cyan('🕒 Timestamp:'), chalk.gray(now.getTime()), '\n');
    });
};
