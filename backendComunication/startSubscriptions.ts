import {subscribeCharacter, subscribeRemoveCharacter} from "./entities/characters/subscribtions";
import {subscribeInitiative} from "./initiative";
import {subscribePlayer} from "./entities/player";

export default function () {
    subscribeCharacter();
    subscribeRemoveCharacter();
    subscribeInitiative();
    subscribePlayer();
}
