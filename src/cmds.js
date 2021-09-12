const { once } = require("events")
const discord = require("discord.js")

const Logger = require("../extra/logger")
const utils = require("../extra/utils")

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

cmds.setup = async (args, msg, client) => {
	let reply = await msg.reply({
		content: "We need to create a channel to store data of the bot. Proceed?",
		components: [
			new discord.MessageActionRow()
				.addComponents(
					new discord.MessageButton({
						label: "Yes",
						style: "PRIMARY",
						customId: true
					}),
					new discord.MessageButton({
						label: "No",
						style: "SECONDARY",
						customId: false
					})
				)
		],
	})

	reply = await utils.replyWrapper(msg, reply)
	try {
		let [ interaction ] = await client.waitFor("interactionCreate", 15000, interaction => interaction.user.id == reply.user.id && interaction.message?.id == reply.message.id)
		interaction.update({
			content: "Get rick rolled bro",
			components: []
		})
	} catch (e) {
		await msg.edit({
			content: ":x: **|** Command timed out. Try running the command again",
			components: []
		})
	}
	//let [ interaction ] = await once(client, "interactionCreate")
	//client.once("interactionCreate", async interaction => {
		
	//reply = utils.replyWrapper(msg, reply)
	//reply.edit("noob")
}

cmds.lynch = async (args, msg, client) => {
	logger.debug(args)
	let target = args[0]?.value || args[0]
	msg.reply(`${target} lynched! kek`)
}

module.exports = { cmds, updateReply }