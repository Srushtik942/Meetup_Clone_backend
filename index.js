const {initializeDatabase} = require("./db/db.connect");
initializeDatabase();
const Event = require ("./models/event.model");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// create new events
async function addEvent(newEvent) {
      try{
        const event = new Event(newEvent);
        const saveEvent = await event.save();
        console.log(saveEvent);
        return saveEvent;
      }catch(error){
       throw error;
      }
}

app.post("/events",async(req,res)=>{
    try{
        const AddNewEvent  = await addEvent(req.body);
        res.status(200).json({message:"Successfully added the new event", AddNewEvent});
    }catch(error){
        res.status(500).json({message:"Failed to add the event data",error:error});
    }
})

// fetching all events
async function getEvents(){
    try{
        const Events = await Event.find();
        console.log("Events",Events);
        return Events;
    }catch(error){
        throw error;
    }
}

app.get("/events",async(req,res)=>{
    try{
      const eventDetails = await getEvents();
      res.status(200).json({message:"Events fetched successfully!",eventDetails})
    }catch(error){
        res.status(500).json({message:"Failed to fetch data", error: error});
    }
})

// fetch event by their type
async function fetchEventByType(eventType){
    try{
        const fetchEvent = await Event.find({eventType:eventType});
        console.log(fetchEvent);
        return fetchEvent;
    }catch(error){
        throw error;
    }
}

app.get("/events/eventType/:eventType",async(req,res)=>{
    try{
        const getEventByType = await fetchEventByType(req.params.eventType);
        if(getEventByType){
            res.status(200).json({messgae:"Succesffuly fetched events",getEventByType});
        }else{
            res.status(404).json({error:"Event by this type not found!"});
        }
    }catch(error){
        res.status(500).json({message:"Failed to fetch events",error:error});
    }
})


// Search events by TITLE
async function searchEventsByTitle(searchTerm) {
  try {

    const regex = new RegExp(searchTerm.trim(), "i");

    const events = await Event.find({ eventName: regex });

    console.log(`Search "${searchTerm}" returned ${events.length} events`);
    return events;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}



// Search endpoint
app.get("/events/search/:searchTerm", async(req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        console.log("API called with search term:", searchTerm);

        const events = await searchEventsByTitle(searchTerm);

        const response = {
            message: events.length > 0 ? "Successfully found events" : "No events found matching your search",
            events: events,
            count: events.length,
            searchTerm: searchTerm
        };

        console.log("API response:", {
            count: response.count,
            message: response.message
        });

        res.status(200).json(response);
    } catch (error) {
        console.error("API error:", error);
        res.status(500).json({
            message: "Failed to search events!",
            error: error.message
        });
    }
});


// Test specific search
app.get("/events/test/:searchTerm", async(req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        const searchLower = searchTerm.toLowerCase();

        const allEvents = await Event.find();
        const testResults = allEvents.map(event => ({
            eventName: event.eventName,
            eventNameLower: event.eventName?.toLowerCase(),
            searchTerm: searchTerm,
            searchLower: searchLower,
            matches: event.eventName?.toLowerCase().includes(searchLower),
            includes: event.eventName?.toLowerCase().includes(searchLower)
        }));

        res.status(200).json({
            searchTerm,
            results: testResults
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function fetchEventByTitle(name) {
  const events = await Event.find({ eventName: name }); // exact match only
  return events;
}

app.get("/events/eventName/:eventName",async(req,res)=>{
    try{
        const events = await fetchEventByTitle(req.params.eventName);
        if(events && events.length > 0){
            res.status(200).json({message:"Successfully fetched event by name",events});
        }else{
            res.status(404).json({error:"Event not found!"});
        }
    }catch(error){
        res.status(500).json({message:"Failed to fetch event!",error:error});
    }
})

// event by id
async function getEventById(id) {
    try{
        const EventDetails = await Event.findById({_id:id});
        console.log(EventDetails);
        return EventDetails;
    }catch(error){
        throw error;
    }
}

app.get("/events/:eventId",async(req,res)=>{
    try{
        const EventById = await getEventById(req.params.eventId);
        if(EventById){
            res.status(200).json({message:"Fetched the data successfully!",EventById});
        }else{
            res.status(404).json({error:"Not found the event by this id"});
        }
    }catch(error){
        res.status(500).json({message:"Failed to fetch event!",error:error});
    }
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})