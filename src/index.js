import {addEffectIfMissing, addEffectsIfMissing, deleteEffectIfExists, hasEffect} from "./services/effectService";
import {
    getActorFromChatMessage,
    getCurrentSceneTokenFromChatMessage,
    getItemFromChatMessage
} from "./services/chatMessageService";
import {scaleToken} from "./services/tokenService";


module.exports = {
    addEffectIfMissing,
    addEffectsIfMissing,
    deleteEffectIfExists,
    hasEffect,
    getItemFromChatMessage,
    getActorFromChatMessage,
    getCurrentSceneTokenFromChatMessage,
    scaleToken
}