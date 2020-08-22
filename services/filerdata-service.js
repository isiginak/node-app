const moment =require('moment');
const {MongoClient, Cursor} = require('mongodb');
const {BadRequestClientError,}=require('../error/error-response');
var isodate = require("isodate");
/**
 * it is connecting mongodb.
 */
async function dbConnection(){
    const uri ="mongodb+srv://ikbal:en257Doks!@getircluster.vbnuf.mongodb.net/<dbname>?retryWrites=true&w=majority";
   global.database = await  MongoClient.connect(uri);
   var dbo = await global.database.db("getir_db");
   return  dbo.collection("getir_data")
  }
  /**
   * 
   * @param {*} reqBody  this is request body object
   * @description  it is checked request parameters.
   */
  async function isCheckParameters(reqBody){
      const errorObj={};
    if(!reqBody.startDate||reqBody.startDate==''||!reqBody.endDate||reqBody.endDate==''){
          errorObj.status=false;
          errorObj.msg= 'startDate and endDate is not empty!';
          return errorObj
    }
    if(!reqBody.minCount||!reqBody.maxCount){
        errorObj.status=false;
        errorObj.msg= 'minCount and maxCount is not empty!';
        return errorObj
    }
      
    errorObj.status=true;
    return errorObj;
  }
  /**
   * 
   * @param {*} reqBody  this is object
   * @returns filter data about date and count 
   */
async function filterData(reqBody){
    try {
        const result = {};
        result.records = [];
        const isCheked=await isCheckParameters(reqBody);
        if(!isCheked.status) throw  isCheked.msg
        const startDate=moment(reqBody.startDate).format('YYYY-MM-DD');
        const endDate=moment(reqBody.endDate).format('YYYY-MM-DD');
        const dbo= await dbConnection();
        const query={
            createdAt:{
                $gt:isodate(startDate),
                $lt:isodate(endDate),
            },
            totalCount:{
                $gt:reqBody.minCount,
                $lt:reqBody.maxCount,
            }
        }
        const filterData = await  dbo.find(query).toArray();
        filterData.map(datum=>{
            const obj={};
            obj.key=datum.key;
            obj.createdAt=datum.createdAt;
            obj.totalCount=datum.totalCount;
            result.records.push(obj);
        });
            result.code=0;
            result.msg='Success';
            return result;
    } catch (error) {
        throw error;
    }
}
module.exports={
    filterData,
}