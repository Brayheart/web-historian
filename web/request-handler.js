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
/*
    when making a POST request check if site is already located in sites.txt 
    if it is in sites.txt and it is in archives get the page and display the page
    if not add it to sites.txt and add the site to the archives sites folder by downloading
    it into the archive/sites folder, but also redirect them to the loading.html page since it 
    is not found in the archive/sites folder. 

    archive contains all the sites we do have.
    sites.txt contains all the sites we "should"" have
*/ 
    archive.isUrlInList()

    var site = '';
    req.on('data', (dataChunk) => {
      site += dataChunk.toString('utf8');
    });

    req.on('end',() => {
      var nList = false;
      var urlArchived = false;

      // archive.isUrlInList(site.slice(4), function(nList){
      //   if(nList){
      //     console.log("yay");
      //   }
      // });

      // console.log(nList);
      
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
