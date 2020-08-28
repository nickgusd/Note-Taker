const fs = require("fs");
const bodyParser = require("body-parser");
// const notes = requires("db/db.json")

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
  var newNote = req.body;
  // this id will be 1 // 
//    //  var newnote = req.params.id
//read from db file, then parse the array, push new note to parsed array, then stringify the array and write to db.json file instead of append. 
  

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


   // fs.appendFile("db/db.json", JSON.stringify(newNote), function(err) {
   //    if (err) {
   //       return console.log(err);
   //     }
   //     noteArray.push(newNote);
   //    res.json(noteArray)
   // })

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
            // data.splice("1",)
            console.log("it works!")
            // console.log(parse)
            parse.splice(0,1)
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



// * The following API routes should be created:

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.