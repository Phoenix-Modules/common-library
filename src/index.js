import ActorService from "./services/actorService.js";
import ChatMessageService from './services/chatMessageService.js'
import CompendiumService from "./services/compendiumService.js";
import DebugService from "./services/debugService.js";
import EffectService from "./services/effectService.js";
import TokenService from "./services/tokenService.js";
import SocketService from "./services/socketService.js";
import * as phxConst from "./constants/phxConst.js";


module.exports = {
    ActorService: ActorService,
    ChatMessageService: ChatMessageService,
    CompendiumService: CompendiumService,
    DebugService: DebugService,
    EffectService: EffectService,
    TokenService: TokenService,
    SocketService: SocketService,
    PhxConst: phxConst
}
