
const ChatMessageService = {

    GetItemFromChatMessage: async (chatMessage) => {
        const itemId = chatMessage?.flags?.dnd5e?.use?.itemUuid;
        if(!itemId) {
            console.warn("cannot get item from chat message!");
            return;
        }
        return await fromUuid(itemId);
    },

    GetActorFromChatMessage: async (chatMessage) => {
        const actorId = chatMessage?.speaker?.actor;
        if(!actorId) {
            console.warn("Cannot get actor from chat message!");
            return;
        }
        return await fromUuid(`Actor.${actorId}`);
    },

    GetCurrentSceneTokenFromChatMessage: (chatMessage) => {
        const tokenId = chatMessage?.speaker?.token;
        if(!tokenId) {
            console.warn("There is no token for the initiator of this chat message!");
            return;
        }
        const searchResult = game.scenes.active.collections.tokens.search(tokenId);
        if(searchResult.length === 0) {
            console.warn("There is no token for the initiator of this chat message in the active scene!");
            return;
        }
        return searchResult[0];
    },

    GetTargetsFromChatMessage: async (chatMessage) => {
        const targets = chatMessage?.flags?.dnd5e?.targets;
        const targetObjs = [];
        if(Array.isArray(targets)) {
            for (let i = 0; i < targets.length; i++) {
                const target = await fromUuid(targets[i].uuid);
                targetObjs.push(target);
            }
        }
        return targetObjs;
    }
}

export default ChatMessageService;



