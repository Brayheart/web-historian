var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, (err,data) => {
    data = data.toString('utf8').split('\n');
    callback(data);
  });
};

exports.isUrlInList = function(url, callback) {
  var inList = false;

  fs.readFile(this.paths.list, (err,data) => {
    data = data.toString('utf8').split('\n');
    if(data.includes(url)){
      inList = true;
    }
    callback(inList);
  });
};

exports.addUrlToList = function(url, callback) {
  console.log(url);
  var writeStream = fs.writeFile(this.paths.list, url + '\n', {flag: 'a'}, (err) => {
    if (err) throw err;
    this.isUrlInList(url, function(arg) {
      callback(arg); 
    });
  });
}

exports.isUrlArchived = function(url, callback) {
  var isArchived = false;

  fs.readdir(this.paths.archivedSites, (err, files) => {
    if(files.includes(url)){
      isArchived = true;
    }
    callback(isArchived);
  });
};

exports.downloadUrls = function(urls) {
  var correctThis = this;


  urls.forEach(function(url){
  
    // if (!correctThis.isUrlInList(url, function(err) {
    //   if(err) throw err
    // })) {
    //   correctThis.addUrlToList(url, function(err) {
    //     if (err) throw err;
    //   });
    // }

    urlSliced = url.slice(4);
    http.get(`http://${urlSliced}`, (res) => {

      var htmlData = '';

      res.on('data', (dataChunk) => {
        htmlData += dataChunk.toString('utf8');
      });

      res.on('end', () => {
        fs.writeFile(correctThis.paths.archivedSites +'/'+ url, htmlData, (err) => {
          if(err){
            console.log("unable to write file");
          };
        });
      });

    });
  });
};
