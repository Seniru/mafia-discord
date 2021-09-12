const discord = require("discord.js")

const { cmds, updateReply } = require("./src/cmds")

const Logger = require("./extra/logger")
const utils = require("./extra/utils")
const logger = new Logger()
logger.setLevel(Logger.levels.DEBUG)
require("dotenv").config()

// Create a new client instance
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "!"

client.once("ready", async () => {
	logger.info("Client Ready!", `(${client.user.username}#${client.user.discriminator})`)
})

client.on("messageCreate", async msg => {

	if ((msg.author.id == client.user.id) || !msg.content.startsWith(PREFIX)) return
	msg.reply = updateReply(msg, client)

	let args = msg.content.substring(PREFIX.length).replace(/\s+/gi, " ").split(" ")
	let cmd = args[0];
	args.shift(0)

	if (cmds[cmd]) {
		await cmds[cmd](args, msg, client)
	}

})

client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return
	interaction.reply = updateReply(interaction, client)

	if (cmds[interaction.commandName]) {
		await cmds[interaction.commandName](interaction.options.data, interaction, client)
	}
	
})

client.waitFor = async (event, timeout, fn) => {
	return await utils.waitFor(client, event, timeout, fn)
}

logger.info("Logging in...")
client.login(process.env.TOKEN)