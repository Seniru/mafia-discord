const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const Logger = require("../extra/logger")
const logger = new Logger()
logger.setLevel(Logger.levels.INFO)

require("dotenv").config()

const commands = [

	new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with pong!"),

	new SlashCommandBuilder()
		.setName("lynch")
		.setDescription("Lynches the nerd")
		.addUserOption((option) => 
			option
				.setName("user")
				.setDescription("The user to lynch")
				.setRequired(true)
		),

	new SlashCommandBuilder()
		.setName("setup")
		.setDescription("Setup the server")

]
	.map(command => command.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT, "881071692414345246"),
			{ body: commands },
		);

		logger.info("Successfully registered application commands.")
	} catch (error) {
		logger.fatal("Failed to register commands!", error)
	}
})();