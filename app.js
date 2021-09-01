require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/index');
const apiRoutes = require('./routes/routes')

const PORT = process.env.PORT || 3000

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', '*');
    next();
});
// app.use('*',(req,res,next)=>{
//     if(req.headers['content-type'] !== 'application/json') {
//         return res.status(415).json({
//             message:'Invalid content type'
//         })
//     }
//     next()
// })
// app.use('')
app.use('/', apiRoutes);

console.info("APP START ----------");

app.use('*', (req, res) => {
    console.error(`APP INVALID ROUTE ${req.originalUrl}`)
    res.status(405).json({
        message:`APP INVALID ROUTE  ${req.originalUrl}`
    })
});

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.info(`Server has been started on port ${PORT}`)
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});