import {subscribeCharacter, subscribeRemoveCharacter} from "./entities/characters/subscribtions";
import {subscribeInitiative} from "./initiative";
import {subscribePlayer, subscribeRemovePlayer} from "./entities/player";
import {subscribeClearAllDrawings, subscribeRemoveDrawing, subscribeUpdateDrawing} from "./drawing";
import {subscribePointTo} from "./measurements";

export default function () {
    subscribeCharacter();
    subscribeRemoveCharacter();
    subscribeInitiative();
    subscribePlayer();
    subscribeRemovePlayer();
    subscribeUpdateDrawing();
    subscribeRemoveDrawing();
    subscribeClearAllDrawings();
    subscribePointTo();
}
