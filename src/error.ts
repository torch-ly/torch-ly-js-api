import {torchly} from "./index";

export default function logError(...err: any[]) {
    torchly.errors.push(err);
    console.error(err);
}
