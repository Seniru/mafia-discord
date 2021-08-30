const chalk = require("chalk")

const levelLabels = [
	chalk.white.bgBlue.bold` DEBUG `,
	chalk.white.bgGreen.bold` INFO  `,
	chalk.black.bgYellow.bold` WARN! `,
	chalk.white.bgRed.bold` ERROR `,
	chalk.red.bgBlack.bold` FATAL `,
]

class Logger {

	static levels = {
		DEBUG: 0,
		INFO: 1,
		WARN: 2,
		ERROR: 3,
		FATAL: 4
	}

	constructor() {
		this.level = Logger.levels.INFO
	}

	debug(...args) {
		this.flush(Logger.levels.DEBUG, ...args)
	}

	info(...args) {
		this.flush(Logger.levels.INFO, ...args)
	}

	warn(...args) {
		this.flush(Logger.levels.WARN, ...args)
	}
	
	error(...args) {
		this.flush(Logger.levels.ERROR, ...args)
	}

	fatal(...args) {
		this.flush(Logger.levels.FATAL, ...args)
	}

	flush(level, ...args) {
		if (level >= this.level) {
			console.log(levelLabels[level], ...args)
		}
	}

	setLevel(level) {
		this.level = level
	}

}

module.exports = Logger