import {subscribeCharacter, subscribeRemoveCharacter} from "./entities/characters/subscribtions";

let initialized = false;

export default function () {

    if(initialized)
        return;

    initialized = true;

    subscribeCharacter();
    subscribeRemoveCharacter();
}