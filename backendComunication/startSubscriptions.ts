import {subscribeCharacter, subscribeRemoveCharacter} from "./entities/characters/subscribtions";
import {subscribeInitiative} from "./initiative";

let initialized = false;

export default function () {

    if(initialized)
        return;

    initialized = true;

    subscribeCharacter();
    subscribeRemoveCharacter();
    subscribeInitiative();
}
