var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var query = 'SELECT * from user_Profile';
	console.log('Query ::: ', query);
 	connection.query(query, function (error, results, fields) {
	  	if(error){
	  		res.send({"status": 500, "error": error, "response": null});
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(results);
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});


/* GET users listing. */
router.get('/:userID', function(req, res, next) {
	var query = 'SELECT * from user_Profile where userId='+ req.params.userID;
    console.log('Query ::: ', query);
    connection.query( query , function (error, results, fields) {
        if(error){
            res.send({"status": 500, "error": error, "response": null});
            //If there is error, we send the error in the error section with 500 status
        } else {
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.send({"status": 404, "error": 'No such user exists.', "response": null});
            }
            //If there is no error, all is good and response is 200OK.
        }
    });
});

module.exports = router;
