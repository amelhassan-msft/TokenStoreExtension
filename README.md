# Token Store Extension for Azure Functions 

## What ? 
This repo contains source code and usage samples of Token Store Bindings that can be using in Azure Functions. 

## Why ? 
These Token Store Bindings reduce the amount of code you have to write in your Azure Funtions to enable your functions to work with any OAuth2 tokens stored in your Token Store resource. 
The Token Store Input Binding allows you to easily integrate multiple services that require authentication in your function. 

## Binding Details 
1. Token Store Input Binding 
	- Input Parameters: 
		- [Auth_flag]
			- Type: String 
			- Options: "msi" or "user"
		- [Identity_provider] 
			- Type: String 
			- Options: "aad" or "facebook" or "google" or null 
		- [Token_url] 
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
			- Calls to Token Store are authenticated using the Function App's identity. Use this setup when you want to retrieve tokens based on a user's identity. Authorization/Authentication must be setup for your Function App so that users can be prompted to login. 
			  You must use an Http triggered function as the binding accesses the request header. [link]
			- [Auth_flag] = "user"
			- [Identity_provider] = "aad" or "facebook" or "google"
			- [Token_url] = https://{example-tokenstore-name}.tokenstore.azure.net/services/{example-service}
				- Token_url should be path up to service  

## Quick Start Example 
#### Goal: List the files of a user's Dropbox account by prompting them to sign in with their Google account. This example shows how the input Token Store Binding makes it easy to link two external services in an Azure Function App. ***
	1.  Choose and note down a {Function App Name} and a {Token Store Name}. These parameters must be strings. 
	2. Register a Dropbox app 
		- You need to register a Dropbox app in order to get authorized access to the user's Dropbox files for your Azure Token Store.
		- Go to the [Dropbox developer site](https://www.dropbox.com/developers/apps) and click "Create app"
			- API: "Dropbox API"
			- Type of access: "Full Dropbox"
			- Name: choose any name
		- On the next page, note down the Dropbox App Id and Dropbox secret. You will need these later
		- Under "Redirect URIs", paste the following: https://{Token Store Name}.tokenstore.azure.net/redirect
		- Set "Allow implicit grant" to "Disallow". Token Store will use the authorization grant flow, so you can disable implicit flow to be safe
	3. Register a Google app 
		- You need to register a Google app in order to enable Google Authentication/Authorization for your Azure Function App 
		- Follow the steps [outlined here] (https://docs.microsoft.com/en-us/azure/app-service/configure-authentication-provider-google)
			- Skip step #1. Use the following URLs instead: 
				- Authorized JavaScript Origins: https://{Function App Name}.azurewebsites.net
				- Auhtorized Domains List: {Function App Name}.azurewebsites.net
				- Authorized Redirect URI: 	https://{Function App Name}.azurewebsites.net/.auth/login/google/callback
	4. Click this button to deploy the Azure ARM template. . <a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Famelhassan-msft%2FARM_Test%2Fmaster%2Fazuredeploy.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png"/> </a>
		- This template creates and appropriately configures the following Azure resources: Token Store, Function App, and Application Insights 
		- Select your desired resource group and any Function App Name and Token Store Name 
		- Fill in the Dropb App Id, Dropbox App Secret, Google Client_ID, and Google Client_Secret with values noted down from the previous steps. 
	5. Navigate to your Token Store and go to Services -> Dropbox -> Tokens. Click "login" next to the sampleToken and it will prompt you to login to you Dropbox account. Now your Google and Dropbox accounts are linked. Sign in is only needed once as referesh tokens are handled for you.
	6. Run the example by navigating to your Azure Function App in the Azure Portal and under "Functions" copy and paste the url of the "Dropbox_Google_TokenStoreBinding" function in your browser. If successful, you may be prompted to login to your Google account and you should see your Dropbox files listed. 

## Repository Layout 