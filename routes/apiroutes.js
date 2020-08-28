const fs = require("fs");
const bodyParser = require("body-parser");
// const notes = requires("db/db.json")

module.exports = function(app) {
  app.use(bodyParser())
// API GET Requests
  // Below code handles when users "visit" a page.
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
  var newNote = req.body;
 
   fs.readFile("db/db.json", function(error, data) {
      var dataparse = JSON.parse(data);
      newNote.id = dataparse.length + 1 
      // console.log(dataparse)
      dataparse.push(newNote);
      // console.log(dataparse)

      fs.writeFile("db/db.json", JSON.stringify(dataparse), function(err) {
         if (err) {
            return console.log(err);
          }
       
         res.json(dataparse);
      })

   }
   )

 })

//  * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//loop through array and splice it where the id matches the id in the array.

 app.delete("/api/notes/:id", function(req, res) {               
//     //need to create query parameter for note to be deleted
     var deleteNote = req.params.id;
     console.log(deleteNote)
//splice array where note we are trying to delete is,
     fs.readFile("db/db.json", "utf8", function(error, data) {
      if (error) {
         return console.log(error);
      }
      var parse = JSON.parse(data);
      // console.log(parse[0])
      // console.log(parse[0].id)
      for (var i = 0; i < parse.length; i++) {
         if(parse[i].id == deleteNote) {
            console.log("it matches!")
            parse.splice([i], 1)
            console.log(parse)
            fs.writeFile("db/db.json", JSON.stringify(parse), function(err) {
               if (err) {
                  return console.log(err);
                }
             
               res.json(parse);
            })
         }
      }
     })
 })
 }



