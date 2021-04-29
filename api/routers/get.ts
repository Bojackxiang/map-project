import express from 'express'
const get_routers = express.Router();

get_routers.get('/visit', (req, res) => {
    console.log('get request');
    res.send("get request")
})

export default get_routers