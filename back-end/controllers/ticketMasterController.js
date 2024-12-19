const express = require('express');
const axios = require('axios')


exports.fetchTMevents = async(req, res) =>{
    try{
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${process.env.TMCONSUMERKEY}`)
        res.send(response.data)
    }
    catch(exception){
        console.log(exception);
    }
}