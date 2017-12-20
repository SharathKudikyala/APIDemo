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

/* GET user details. */
router.get('/:userID', function(req, res, next) {
	var query = 'SELECT * from user_Profile where userId='+ req.params.userID;
    console.log('Query ::: ', query);
    connection.query( query , function (error, results, fields) {
        if(error){
            res.send({"status": 500, "error": error, "response": null});
            //If there is error, we send the error in the error section with 500 status
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                res.send({"status": 404, "error": 'No such user exists.', "response": null});
            }
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/* POST user. */
router.post('/', function(req, res, next) {
	var results = [];
	var vehicles = req.body.vehicles;
	var userID = req.body.userID;
	var employeeName = req.body.employeeName;
	var companyID = req.body.companyID;

	var promises = vehicles.map(vehicle => {
        var query = "INSERT INTO user_Profile (userID, employeeName, companyID, vehicleType, vehicleNumber, RFID_Number) values ( " +
           userID + ", \'" + employeeName + "\', \'" + companyID + "\', \'" + vehicle.vehicleType + "\', \'" + vehicle.vehicleNumber + "\', \'" + vehicle.RFID_Number +  "\')";
        console.log('POST user query ::: ', query);
        return new Promise(function(resolve, reject) {
            connection.query(query, function (error, result, fields) {
                if(error){
                    reject({"status": 500, "error": error, "response": null});
                    //If there is error, we send the error in the error section with 500 status
                } else {
                	resolve(result);
                    //If there is no error, all is good and response is 200OK.
                }
            });
        });

	});
	Promise.all(promises)
        .then(result => res.send({"status": 200, "success": true, "user_profile": req.body}))
        .catch(e => res.send({"status": 500, "error": e, "response": null}))
});

module.exports = router;
