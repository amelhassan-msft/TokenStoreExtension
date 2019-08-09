# Token Store Extension for Azure Functions 

## What ? 
This repo contains source code and usage samples of Token Store Bindings that can be using in Azure Functions. 

## Why ? 
These Token Store Bindings reduce the amount of code you have to write in your Azure Funtions to enable your functions to work with any OAuth2 tokens stored in your Token Store resource. 
The Token Store Input Binding allows you to easily integrate multiple services that require authentication in your function. 

## Binding Details 
1. Token Store Input Binding 
	- Input Parameters: 
		- Auth_flag
			- Type: String 
			- Options: "msi" or "user"
		- Identity_provider 
			- Type: String 
			- Options: "aad" or "facebook" or "google" or null 
		- Token_url 
			- Type: String 
			- Options: "https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}/tokens/{example-token-name}" or "https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}"
	- Usage Scienarios 
		1. MSI (Managed System Identity)
			- Calls to Token Store are authenticated using the Function App's identity. Use this setup when you know the exact name of the token you want to retrieve. 
			- [Auth_flag] = "msi"
			- [Identity_provider] = null
			- [Token_url] = https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}/tokens/{example-token-name} 
				- Token_url should be path up to token name 
		2. User 
			- Calls to Token Store are authenticated using the Function App's identity. Use this setup when you want to retrieve tokens based on a user's identity. Authorization/Authentication must be setup for your Function App so that users can be prompted to login. [link]
			- [Auth_flag] = "user"
			- [Identity_provider] = "aad" or "facebook" or "google"
			- [Token_url] = https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}
				- Token_url should be path up to service  

## Quick Start Example 
	1. Goal: 
	2. 
	3. 
	4. 
## Repository Layout 