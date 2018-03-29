var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('../web/http-helpers');
// var fs = require('fs');



exports.handleRequest = function (req, res) {

  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  

  if(req.method === "GET"){
    httpHelp.serveAssets(res,req.url, (data) => {
      res.writeHead(200,httpHelp.headers);
      res.end(data,'utf8');
    });
  }else if(req.method === "POST"){

    var site = '';
    req.on('data', (dataChunk) => {
      site += dataChunk.toString('utf8');
    });

    req.on('end',() => {

      archive.addUrlToList(site.slice(4), (added) =>{
        if(added){
          console.log("successfully added");
        }
      });

      res.writeHead(302, httpHelp.headers);
      res.end();
    });

    //on POST
      //if post url is not in text file or archived
        //get request for url
        //add url to list and archive url get request
        //send user to archived url
      //if post url is in text
        //check to see if archived
          //if not get request
        //if archive show user archived url
      if (!archive.isUrlInList(site, (err) => {})) {

      }

  }
};
