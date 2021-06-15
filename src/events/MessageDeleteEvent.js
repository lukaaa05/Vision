const BaseEvent = require('../utils/structures/BaseEvent');
module.exports =class MassageEvent extends BaseEvent {
    constructor() {
        super('messageDelete');
    }

    async run(client, message) {
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author  
        })
    }
}