import {subscribeCharacter, subscribeRemoveCharacter} from "./entities/characters/subscribtions";
import {subscribeInitiative} from "./initiative";

export default function () {
    subscribeCharacter();
    subscribeRemoveCharacter();
    subscribeInitiative();
}
