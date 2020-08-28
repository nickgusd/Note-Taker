const fs = require("fs");
const bodyParser = require("body-parser");

let noteArray = [];

module.exports = function(app) {
// API GET Requests
  // Below code handles when users "visit" a page.
  app.use(bodyParser())

  app.get("/api/notes", function(req, res) {
   //   console.log(res)
   fs.readFile("db/db.json", function(error, data) {
      
      if (error) {
         return console.log(error);
      } else {
         var getNotes = JSON.parse(data);
         res.json(getNotes)
      }
    
      
   })
   
   

   // * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

  });

 app.post("/api/notes", function(req, res) {
  
//    //  var newnote = req.params.id
   fs.appendFile("db/db.json", JSON.stringify(req.body), function(err) {
      if (err) {
         return console.log(err);
       }
      res.json(noteArray.push(req.body))
   })

 })

//  * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.



 app.delete("/api/notes/:id", function(req, res) {               
//     //need to create query parameter for note to be deleted
     var deleteNote = req.params.id;

     fs.readFile("db/db.json", "utf8", function(error, data) {
      if (error) {
         return console.log(error);
      }
      // console.log(data)
      if (deleteNote === data) {
         data = ["the"];
         console.log(data)
         console.log(deleteNote)
      }
   })

 })

 }







// * The following API routes should be created:

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.