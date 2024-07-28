
const ChatMessageService = {

    GetChatMessageSpeakerItem: async (chatMessage) => {
        const itemId = chatMessage?.flags?.dnd5e?.use?.itemUuid;
        if(!itemId) {
            console.warn("cannot get item from chat message!");
            return;
        }
        return await fromUuid(itemId);
    },

    GetChatMessageSpeakerActor: async (chatMessage) => {
        const actorId = chatMessage?.speaker?.actor;
        if(!actorId) {
            console.warn("Cannot get actor from chat message!");
            return;
        }
        return await fromUuid(`Actor.${actorId}`);
    },

    GetChatMessageSpeakerToken: (chatMessage) => {
        const speakerActorId = chatMessage?.speaker?.actor;
        if(!speakerActorId) {
            console.warn("There is no token for the initiator of this chat message!");
            return;
        }
        const searchResult = game.scenes.active.collections.tokens.find(x => x.actorId === speakerActorId)
        if(!searchResult) {
            console.warn("There is no token for the initiator of this chat message in the active scene!");
            return;
        }
        return searchResult;
    },

    GetChatMessageSpeakerTargets: (chatMessage) => {
        // const array = [];
        // chatMessage.user.targets.forEach(v => array.push(v));
        return Array.from(chatMessage.user.targets);
    },
}

export default ChatMessageService;



