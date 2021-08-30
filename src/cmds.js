const discord = require("discord.js")
const Logger = require("../extra/logger")
const logger = new Logger()
logger.setLevel(Logger.levels.DEBUG)

const updateReply = (target, client) => {
	target.oldReply = target.reply
	if (target instanceof discord.Message) return target.oldReply
	return (...args) => {
		if (!target.replied) return target.oldReply(...args)
		let guild = client.guilds.cache.find(guild => guild.id == target.guildId)
		let channel = guild.channels.cache.find(channel => channel.id == target.channelId)
		return channel.send(...args)
	}
}

let cmds = {}

cmds.ping = async (args, msg, client) => {
	msg.reply("Pong!")
}

cmds.lynch = async (args, msg, client) => {
	logger.debug(args)
	let target = args[0]?.value || args[0]
	msg.reply(`${target} lynched! kek`)
}

module.exports = { cmds, updateReply }