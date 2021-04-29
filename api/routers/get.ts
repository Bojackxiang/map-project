import express from 'express'
const get_routers = express.Router();

get_routers.get('/visit', (req, res) => {

    res.send("get request")
})

export default get_routers