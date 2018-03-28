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
    //if url is not in list
      //add url to list
    //return url is already added

  }

  //res.end(archive.paths.list);
};
