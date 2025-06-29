const request = require('request')
/* so here we are making geocode as a function in which we are passing 2 argument adress and a callback 
(A callback is a function passed as an argument to another function, which is called (or invoked) later, usually after some operation is completed (like a task, event, or async call))
so we difine that call back when we call this function in wich its getting argument data and error*/
const geocode = (address,callback) => {
    const apiKey='caf7268f3f684f7b9640f127e094f526'
    const url2=`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    request({url: url2,json: true},(error,response)=>{
        if(error){

            callback('enable to connect with loaction service',undefined);

        }else if(!response.body || !response.body.results ||response.body.results.length === 0){

            callback('unable to find location use another search',undefined)

        }else{

            data = {
                 longitude:response.body.results[0].geometry.lng,
                 latitude:response.body.results[0].geometry.lat,
                 place:response.body.results[0].components.state_district
                   }
            callback(undefined,data)
        }
    })
}











module.exports = geocode;