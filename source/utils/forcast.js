request = require('request')

//in this file i am es6 shoethand method and destructuring

const forcast = (latitude,longitude,callback)=>{
    const url =`http://api.weatherstack.com/current?access_key=207585dea79cdea56aee83b933f59672&query=${latitude},${longitude}`

    request({url ,json: true},(error,{body})=>{

        if(error){

            callback('enable to connect with weather forcast',undefined)

        }else if(body.error){

            callback('unable to reach! please enter another search',undefined)

        }else{
                 const weatherdata={
                    temprature:body.current.temperature,
                    description:body.current.weather_descriptions[0]
                 }
            
            callback(undefined,weatherdata)

        }
    })
}


module.exports = forcast