# Azure Function [bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings) for interacting with [Token Store](https://github.com/azure/azure-tokens) 

## Access 
To use the most up to date Token Store bindings, install the **Microsoft.Extensions.TokenStore NuGet package**. If you 
would like to make changes to the binding code, clone this GitHub repo, and build the projects in the binding-library 
to generate a dll that can be included as an assembly reference in your Azure Functions project.  
## Usage 
- Declarative TokenStoreInputBinding in a C# Azure Function (include as an input to your function)
``` 
[TokenStoreInputBinding(tokenUrl = "https://{token-store-name}.tokenstore.azure.net/services/{service}",
            authFlag = "user", identityProvider = "google")] string outputToken
``` 
- Imperative TokenStoreInputBinding in a C# Azure Function (use within your function)
	- As input parameter to your function include: Binder binder
	- Inside of your function include the following:
	``` 
            TokenStoreInputBindingAttribute attribute = new TokenStoreInputBindingAttribute("https://{token-store-name}.tokenstore.azure.net/services/{service}", "user", "google"); // Initialize TokenStoreBinding
            var outputToken = await binder.BindAsync<string>(attribute);
	``` 
## The bindings 
- TokenStoreInputBinding
    - **Inputs**:
        - [authFlag]
			- Type: String 
			- Options: "msi" or "user"
		- [identityProvider] 
			- Type: String 
			- Options: "aad" or "facebook" or "google" or null 
		- [tokenUrl] 
			- Type: String 
			- Options: "https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}/tokens/{example-token-name}" or "https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}"
    - **Output** 
        - Type: String 
        - Contains the access token request 
    - **Usage Scienarios** 
        1. MSI (Managed System Identity)
			- Calls to Token Store are authenticated using the Function App's identity. Use this setup when you know the exact name of the token you want to retrieve. 
            - Example use case: A personal azure function app that sends yourself a text message using Twilio each time a file is uploaded to GoogleDrive. 
			- Example inputs to the binding 
                - [authFlag] = "msi"
			    - [identityProvider] = null
			    - [tokenUrl] = https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}/tokens/{example-token-name} 
				    - Token_url should be path up to token name 
		2. User 
			- Calls to Token Store are authenticated using the Function App's identity. The full path to the token is constructed using the logged in user's credentials. Use this setup when you want to retrieve tokens based on a user's identity. Authorization/Authentication must be setup for your Function App so that users can be prompted to login. 
			- Example use case: An azure function app that is used by many users. For each user, they are prompted to login with their Google account. The app then lists tweets by the user, newly added files to their DropBox account, and recent posts they have made on Facebook. 
			- You must use an Http triggered function as the binding accesses the request header.
			- [authFlag] = "user"
			- [identityProvider] = "aad" or "facebook" or "google"
			- [tokenUrl] = https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}
				- Token_url should be path up to service  
	- **Token Naming Convention**
		- If the token specified does not exist, the TokenStoreInputBinding will create the token with the given name and prompt the user to login. In the "msi" case, 
		the toke name will be extracted from the provided url path of the token. In the "user" case, the token name will be constructed based on the login identityProvider specified and 
		a predetermined naming convention (see table below). 
	

	| Login    | Token Display Name   | Token Name               |
	| :---     |   :---               |    :---                  |
	| aad      | {upn}                | {Tenant ID} - {Object ID}|
	| facebook | Facebook: {username} | {Facebook ID}            |
	|  Google  |  {Email}             |  {Sub ID}                |
