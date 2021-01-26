import {initializeTorchly} from "./index";

initializeTorchly({
    backendUrl: "wss://server.erichier.tech:5000/graphql",
    authID: "gm"
})

console.log("End")