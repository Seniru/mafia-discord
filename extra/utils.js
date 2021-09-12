const events = require("events")
const Logger = require("./logger")

module.exports = {

	replyWrapper: async (msg, reply) => {
		if (!reply) {// interaction
			msg.edit = msg.editReply,
			msg.delete = msg.deleteReply
			msg.message = await msg.fetchReply()
			return msg
		}
		// if it's not an interaction, it's a Message
		reply.user = msg.author
		reply.message = reply
		return reply
	},

	waitFor: async (ee, event, timeout, fn) => {
		if (timeout) {

			let promise = new Promise((resolve, reject) => {

				setTimeout(() => {
					reject("Wait operation timed out!")
				}, timeout);

				(async () => {
					for await (let evt of events.on(ee, event)) {
						if (fn) {
							if (fn(...evt)) {
								resolve(evt)
							}
						} else {
							resolve(evt)
						}
					}
				})()
			})

			let res = await promise.catch(e => {
				throw new Error(e)
			})

			return res
			  
		}
	}

}