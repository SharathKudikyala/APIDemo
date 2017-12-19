var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {

    var query = "select * from App_Credentials where Username = \'"+ req.body.username + "\' and passwordfield = \'" + req.body.password + "\'";
    console.log('Query ::: ', query);
    connection.query(query, function (error, results, fields) {
        if(error){
            res.send({"status": 500, "error": error, "response": null});
            //If there is error, we send the error in the error section with 500 status
        } else {
            if (results.length > 0) {
              res.send(results[0]);
            } else {
              res.send({"status": 403, "error": 'Username/password provided do not match.', "response": null});
            }
            //If there is no error, all is good and response is 200OK.
        }
    });
});

module.exports = router;