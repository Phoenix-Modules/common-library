/**
 * Parses the foundry chat message to retrieve a DND5e Item.
 *
 * @param {ChatMessage} chatMessage - DND5e Chat Message.
 * @returns {Item5e} an Item5e Document.
 */
export async function getItemFromChatMessage(chatMessage) {
    const itemId = chatMessage?.flags?.dnd5e?.use?.itemUuid;
    if(!itemId) {
        console.warn("cannot get item from chat message!");
        return;
    }
    return await fromUuid(itemId);
}

/**
 * Parses the foundry chat message to retrieve a DND5e Actor.
 *
 * @param {ChatMessage} chatMessage - DND5e Chat Message.
 * @returns {Actor5e} an Item5e Document.
 */
export async function getActorFromChatMessage(chatMessage) {
    const actorId = chatMessage?.speaker?.actor;
    if(!actorId) {
        console.warn("Cannot get actor from chat message!");
        return;
    }
    return await fromUuid(`Actor.${actorId}`);
}

/**
 * Parses the foundry chat message to retrieve the token of the current chat message speaker.
 *
 * @param {ChatMessage} chatMessage - DND5e Chat Message.
 * @returns {Token} the Scene Token.
 */
export async function getCurrentSceneTokenFromChatMessage(chatMessage) {
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
}


