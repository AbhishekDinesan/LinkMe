const express = require('express');
const axios = require('axios')
const {extractEventPayload} = require ('../models/eventPayload')

//refactor the response queries

exports.genericEvents = async(req, res) =>{
    try{ 
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=12&city=Waterloo&apikey=${process.env.TMCONSUMERKEY}`)
        const events = response.data._embedded.events.map(extractEventPayload);
        res.send(events)
    }
    catch(exception){
        console.log(exception);
    }
}

exports.queryEventsOnStartDate = async(req, res) => {
    try{
        const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events', {
            params: {
              apikey: process.env.TMCONSUMERKEY,
              sort: 'date,asc',
              startDateTime: '2025-01-01T00:00:00Z',
              size: 20 
            }
          });
        const events = response.data._embedded.events.map(extractEventPayload);
        res.send(events)
    }
    catch(exception){
        console.log(exception)
    }
}

