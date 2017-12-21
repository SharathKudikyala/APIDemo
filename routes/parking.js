var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    var query = `Select (select name from ctrlp.floors where in_device = '1111110') as floorname ,
((Select two_w_slots*6 From ctrlp.company_slots where floor =7)-(select count(vehicle_type) from ctrlp.data where outstatus!= 'out' and deviceidin = '1111110' and vehicle_type='Two Wheeler')) as Two_Wheelers_free,
((Select four_w_slots From ctrlp.company_slots where floor =7)-(select count(vehicle_type) from ctrlp.data where outstatus!= 'out' and deviceidin = '1111110' and vehicle_type='Four Wheeler')) as Four_Wheelers_free 
from dual
union
Select (select name from ctrlp.floors where in_device = '1111120') as floorname ,
((Select two_w_slots*6 From ctrlp.company_slots where floor =8)-(select count(vehicle_type) from ctrlp.data where outstatus!= 'out' and deviceidin = '1111120' and vehicle_type='Two Wheeler')) as Two_Wheelers_free,
((Select four_w_slots From ctrlp.company_slots where floor =8)-(select count(vehicle_type) from ctrlp.data where outstatus!= 'out' and deviceidin = '1111120' and vehicle_type='Four Wheeler')) as Four_Wheelers_free 
from dual;`;
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

module.exports = router;