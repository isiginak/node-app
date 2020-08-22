const {filterData} = require('../services/filerdata-service');
const obj=[{body:{
"startDate": "2016-01-26",
"endDate": "2018-02-02",
"minCount": 2700,
"maxCount": 3000
}},
{body:{
  "startDate": null,
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
  }}]
test('When date and count is sent to it , existing record is returned.', () => {
  filterData(obj[0]).then(dat=>{
    expect(dat).toBe({
      "records": [
          {
              "key": "TAKwGc6Jr4i8Z487",
              "createdAt": "2017-01-28T01:22:14.398Z",
              "totalCount": 2800
          },
          {
              "key": "NAeQ8eX7e5TEg7oH",
              "createdAt": "2017-01-27T08:19:14.135Z",
              "totalCount": 2900
          }
      ],
      "code": 0,
      "msg": "Success"
  });
  })
    
  });

  test('startDate and endDate may be null,So it return error message.', () => {
    filterData(obj[1]).then(dat=>{
      expect(dat).toBe("startDate and endDate is not empty!")
    });
  });