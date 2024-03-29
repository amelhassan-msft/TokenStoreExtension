module.exports = async function (context, req, tokenBindingOutput) {
  // Note: console is local debug, context is azure portal debug
  var fs = require('file-system');
  var fetch = require('isomorphic-fetch');
  var Dropbox = require('dropbox').Dropbox;

  context.res = {
    status: 400,
    body: "Check your dropbox account to see a new document listing all your files."
    };
    
  dbx = new Dropbox({
    fetch: fetch,
    accessToken: tokenBindingOutput  
    })

  .filesListFolder({path: ''}) // returns a promise for Dropboxtypes.files
  .then(response => { 
    var datastring = "Files: ";
    for (let i = 0; i < response.entries.length; i++){
      console.log(response.entries[i].name);
      context.log(response.entries[i].name); 
      datastring += response.entries[i].name + ", ";
    }
      dbx = new Dropbox({
        fetch: fetch,
        accessToken: tokenBindingOutput
        })
    
      .filesUpload({path: "/listdropboxfiles", contents: datastring}).then(function(response){
        console.log("Check your dropbox account to see a new document listing all your files.");
        context.log("Check your dropbox account to see a new document listing all your files.");
        console.log(response);        
      })
      .catch(function(error){
        console.error(error);
        context.log(error);
      });
  })
  .catch(function(error){
    console.error(error);
    context.log("An error occurred in outer catch statement");
    context.log(error);
  });
    
}