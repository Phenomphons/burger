var express = require("express");

var router = express.Router();

var burger = require("../models/burgers.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burger: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/api/burgers", function(req, res) {
    burger.create([
      "devoured", "burger_name"
    ], [
      req.body.devoured, req.body.burger_name
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    var burger_name = "id = " + req.params.id;
  
    console.log("burger", burger_name);
  
    burger.update({
      devoured: req.body.devoured,
      burger_name: req.body.burger_name,
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  
    
  });
  
//   router.delete("/api/cats/:id", function(req, res) {
//     var condition = "id=" + req.params.id;
    
    
//     cat.delete(condition, function(result){
//       if(results.affectedRows == 0){
//         return res.status(404).end();
//       } else{
//         res.status(200)
//       }
//       // Send back the ID of '
//        quote
      
//     });
//   });
  
  // Export routes for server.js to use.
  module.exports = router;
  