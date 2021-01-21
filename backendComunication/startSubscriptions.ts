import {subscribeCharacter, subscribeRemoveCharacter} from "./entities/characters/subscribtions";

export default function () {
    subscribeCharacter();
    subscribeRemoveCharacter();
}
