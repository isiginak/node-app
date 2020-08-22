var express = require('express');
var router = express.Router();

const {filterData,}=require('../services/filerdata-service');
const {OkSuccessfulResponse,}=require('../error/successfull-response')
const {BadRequestClientError,}=require('../error/error-response');

async function filterDataRooter(req,res,next){
  try {
    let response = new OkSuccessfulResponse();
    response.data= await filterData(req.body).catch(error=>{
      const err=new BadRequestClientError(error);
      res.status(err.code).json(err.message);
    });
    res.status(response.code).json(response.data);
  } catch (error) {
    throw  error;
  }
  
}
/* GET home page. */
router.post('/filter-data', filterDataRooter);

module.exports = {router};
