var express = require("express");

//tells node that we are creating an "express" server
var app = express();

// Sets an initial port to use later with out listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require("./routes/apiroutes")(app);
require("./routes/htmlRoutes")(app);

//listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

