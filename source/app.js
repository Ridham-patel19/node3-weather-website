const path=require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')
require('dotenv').config();


//define paths for expresss config
const publicdirpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'templates/views')
const partialspath=path.join(__dirname,'templates/partials')


//its use to initialize express server
const app=express()

//helps to render dynamic html pagesrs and location of view
//setup handelbar
app.set('view engine', 'hbs')  
app.set('views',viewpath)
//use to register partials in app.js
hbs.registerPartials(partialspath)


//set up static directory
app.use(express.static(publicdirpath))

app.get('/',(req, res)=>{
    res.render('index',{
        title:'Weather application',
        name:'Ridham'
       
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name: 'Ridham'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Weather application',
        name:'Ridham'
    })
})



//it will handle the main requests that send by user in this first argument would be url(on which user want go) and second one is call back function which takes two argument request and response

    //we can send html and json also in this 




app.get('/weather',(req,res)=>{

    const address=req.query.address;
    if(!address){
         return res.send({
            error:"please provide valid address"
         })
    }



    //here we get a obj in shoethand destructuture way  and '={}' means we provideing defualt value for it 
    geocode(address,(error,{latitude,longitude,place}={})=>{
        if(error){
            res.send({
                error
            })
        }else{

            const lat=latitude;
            const lon=longitude;

            forcast(lat,lon,(error,data)=>{
                if(error){
                    res.send({
                error
            })
                }
                else{
                    res.send({
                        currenttemprature: data.temprature,
                        description:data.description,
                        location: req.query.address

                    })
                }
            })
            
        }
    })

  
})


app.get('/help/:anything', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'ridham'
    })
})

app.get('/products', (req, res)=>{

    //this use to access the query string which we provide in our req
     if(!req.query.search){
        return   res.send( {
            error: 'please provide search terms'
        })
     }
   
    res.send({
        products: []
    })
})

//it will show the text if any other rout link is there other our routs
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404',
        message: 'Page not found',
        name: 'ridham'
    })
})






//This starts the server and makes it listen on port 3000
const port = process.env.PORT || 3000; // Use Render's dynamic port or 3000 locally
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});






