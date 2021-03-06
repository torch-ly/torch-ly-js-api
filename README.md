# Torch-ly JS API

The Torchly JS API is the connection bridge between torchlys backend and frontend. This API contains several functions to interact with the connected torchly server and therefore with other session participants.
The API is designed to be compatible with several web frameworks like VueJS.

## Usage

In the current state of this project, it is not recommended to use the torchly API. We are working hard to have this API fully functional soon. Even if it is not recommended, it is possible to add this project as a local npm package. More detailed instructions will follow in the future.

After the package is installed, the API provides a function called `initializeTorchly`. This function creates a connection to the backend and initializes some internal variables. The function needs to be called with a configuration parameter. This parameter is a JS object with the following formate:

```ts
{
  backendUrl: string,
  authID: string
}
```

For detailed information on these parameters have a look into the wiki section. (This article is not yet available)

## Contribute

If you are interested in torchly and want to help us push this project further, feel free to create a pull request. If you implement new features, it would be very helpful if you also write automated tests for this feature.  
In order for us to merge a pull request, all tests have to accept.
