import ActorService from "./services/actorService";
import ChatMessageService from './services/chatMessageService'
import CompendiumService from "./services/compendiumService";
import DebugService from "./services/debugService.js";
import EffectService from "./services/effectService.js";
import TokenService from "./services/tokenService.js";
import SocketService from "./services/socketService.js";
import * as constants from "./constants/constants.js";


module.exports = {
    ActorService: ActorService,
    ChatMessageService: ChatMessageService,
    CompendiumService: CompendiumService,
    DebugService: DebugService,
    EffectService: EffectService,
    TokenService: TokenService,
    SocketService: SocketService,
    Constants: constants
}
