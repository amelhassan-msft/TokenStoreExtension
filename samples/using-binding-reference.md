# Using the TokenStoreBinding in your Azure Functions Created from Scratch 

## JavaScript Azure Function Instructions 
Complete the steps under "PreReqs" [on this page](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function-azure-cli).
After you have created your node JS Azure Function app follow these steps to be able to use the TokenStoreBindings.
- To install the TokenExtension NuGet package run this command: **"func extensions install -p azurefunctions.tokenstore.extension.v1 -v 1.0.1"**
- To generate an extensions.csproj run this command: **"func extensions sync"**
- To use the TokenStoreBinding, include the binding in your function.json file 
    - Example for the "tokenName" scenario:
    ``` 
    {
        "bindings":[{
            "type": "TokenStoreBinding",
            "direction": "in",
            "name": "TokenBindingOutput",
            "tokenUrl": "https://{your-tokenstore-name}.tokenstore.azure.net/services/{name-of-your-service}/tokens/{your-token-name}",
            "scenario": "tokenName", 
            "identityProvider": null
        }]
    }
    ```
    - Example for the "user" scenario:
    ```
    {
        "bindings":[{
            "type": "TokenStoreBinding",
            "direction": "in",
            "name": "TokenBindingOutput",
            "tokenUrl": "https://{your-tokenstore-name}.tokenstore.azure.net/services/{name-of-your-service}",
            "scienario": "user", 
            "identityProvider": "aad"
        }]
    }
    ```
- In your index.js main function, reference the binding by its "name" to access its output 
- Deploy your code to the Azure Portal 

Trouble shooting 
- Some helpful command line prompts:
    - dotnet restore
        - Restores dependencies and tools of a project
    - dotnet build 
        - Builds a .net core application 

## C# Azure Function Instructions 
- Use Visual Studios to create a local Azure Functions template project 
- To be able to use the TokenStoreBinding complete one of the following 
    - In Visual Studios navigate to **"Manage NuGet"** packages and search for and install the **"azurefunctions.tokenstore.extension.v1"** package 
    - Clone this GitHub repo and build the TokenStoreBinding project (under binding-library) using Visual Studios. Add the dll of this built project to your Azure Function Visual Studios Project as an assembly reference. 
- Deploy your function to the Azure Portal

## General Settings 
1. Set up Authentication Configurations for your Azure Function App in the Azure Portal 
    - Set your Azure Function's MSI to "On". This can be be found under the "Networking" section under the "Identity" tab. 
    - If you are using the "user" scenario for the TokenStoreBinding, manage user login under the "Authentucation/Authorization" under the "Networking section". 
2. Create a Token Store and manage permissions 
    - [Follow this resource to create a Token Store](https://github.com/Azure/azure-tokens/tree/master/docs)
    - Ensure that your Azure Function App is authenticated to make calls to your Token Store by using its Managed System Identity (MSI) to register it under your Function App's Access Policies. 