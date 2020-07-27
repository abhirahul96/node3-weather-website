const path = require('path')
const express = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath=path.join(__dirname,'../template')

//Setup ejs engine and views locations(views location if required)
app.set('view engine', 'ejs')
// app.set('views',viewsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhishek'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhishek'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'How can we help you?',
        name: 'Abhi'
    })
})



// app.get('', (req, res) => {
//     res.send('<h1>weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'abhishek',
//         age: 24
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About the site</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 45,
//         location: 'India'
//     })
// })
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

//app.com
//app.com/about
//app.com/help

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        msg: 'Help article not found',
        name: 'Abhishek'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        msg: 'My 404 page',
        name: 'Abhishek'
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})