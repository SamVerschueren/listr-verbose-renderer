'use strict';
const chalk = require('chalk');
const format = require('date-fns/format');

exports.log = (options, output) => {
	if (options.dateFormat === false) {
		console.log(chalk.dim(output));
		return;
	}

	const timestamp = format(new Date(), options.dateFormat);

	console.log(chalk.dim(`[${timestamp}]`) + ` ${output}`);
};
