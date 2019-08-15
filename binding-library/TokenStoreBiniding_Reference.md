# Azure Function [bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings) for interacting with [Token Store](https://github.com/azure/azure-tokens) 

## Access 
- NuGet or dll 
## Usage 
- Declaritive 
- Imperative 
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
	- **Token naming convention for "User" scenario**

	
	- **Edge Cases**
		- If the token specified does not exist, the TokenStoreInputBinding will create the token with the given name and prompt the user to login. 