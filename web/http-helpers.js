var path = require("path");
var fs = require("fs");
var archive = require("../helpers/archive-helpers");

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if (asset === "/") {
    fs.readFile(archive.paths.siteAssets + "/index.html", (err, data) => {
      if (err) throw err;
      callback(data);
    });
  } else if (asset === "/loading.html") {
    fs.readFile(archive.paths.siteAssets + "/loading.html", (err, data) => {
      if (err) throw err;
      console.log('here');
      res.writeHead(302, this.headers);
      res.end(data.toString("utf8"));
    });
  } else {
    fs.readFile(archive.paths.archivedSites + "/" + asset, (err, data) => {
      if (err) {
        res.writeHead(404, this.headers);
        res.end();
      }
      callback(data);
    });
  }
};

// As you progress, keep thinking about what helper functions you can put here!
