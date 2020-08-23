const moment =require('moment');
const {MongoClient, Cursor} = require('mongodb');
const isodate = require("isodate");
const _=require('lodash');
/**
 * it is connecting mongodb.
 */
async function dbConnection(){
    const uri ="mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
   global.database = await  MongoClient.connect(uri);
   var dbo = await global.database.db("getir-case-study");
   return  dbo.collection("record")
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
            }
           
        }
        const filterData = await  dbo.find(query).toArray();
        filterData.map(datum=>{
            const obj={};
            obj.key=datum.key;
            obj.createdAt=datum.createdAt;
            const sumCount=_.sum(datum.counts);
            obj.totalCount=sumCount;
            if(reqBody.minCount<sumCount&&reqBody.maxCount>sumCount){result.records.push(obj);}
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