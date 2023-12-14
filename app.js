const express = require("express");
const bodyParser = require("body-parser");

//MY DEPENDENCIES
const feedRoutes = require("./routes/feed");

const app = express();

//BODY PARSER M.W
app.use(bodyParser.json());

//SET CORS HEADERS WITH A GENERIC M.W
//- BEFORE FORWARDING THE REQUEST TO THE ROUTESER
//WHICH ULTIMALTLY SEND THE RESPONSE!
app.use((req, res, next) => {
  //First Header: Unloak CORS for all origins(clients)!
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Second Header: Allow the origins in 1 - to use specific HTTM methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH",
  );
  //Third Header: Specify the headers that clients can set on their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  //Forword the requst to the next m.w.s !
  next();
});

//USE THE ROUTE - TO FILTER ANY HTTP METHOD COMMING TO /feed
app.use("/feed", feedRoutes);

//USE THE ROUTE

//Not on 3000 - since later for smoething else
app.listen(8080);

/*KEY NOTES: 

   0.SPA: 
*****************************************
   1.The Body-Parser
*************************************************
(node external dependnecy )
        Body-Parser m.w - before the routes m.w.s - initial it to parse JSON
        AND NOT AS FORM DATA - x-www-form-urlencoded (HTML FORM DATA FORMAT)
        application./json -> To append the data in the JSON format to the request
        so when the controller will be able to parse the req.body - in JSON format
  *********************************
            2.CORS: (CORS ERROR )
  ***********************************
    - A browser security mechanism 
    - Not happens on SSR APP ! ONLY WITH SPA APPS!(different origin) 

    -SOLUTION - ENABLE THE CORS - ON THE SERVER! 
      Tells the browser that it should accept the response 
      sent by my server : 

    Configure CORS: In the app.js - using m.w
        1.Enable all origns 
        2. 
    
*****************************************
        CLIENT SIDE CODE - CODEPEN
***************************************

    1.send POST request with fetch API : 
        Must specify the 'Content-Type':'application/json' HEADER 
        Otherwise - the title and content in the request body are PLAIN TEXT 
        Check in the network tab: 
        
        1.Request Headers:(below the Response Headers)
          1.1 Content-Type: text/plain !!!!
              This is why the server did not read this !

         Problems!!

          PROBLEM 1: Request Payload: [object Object] 
              A JS OBJECT - THAT CAN NOT BE HANDLED BY THE API! 
              THE API REQUIRES JSON DATA WHICH IN THE END IS JUST TEXT 
          
            SOLUTION: ON THE CLIENT - CONVERT THE JSON JS object to a JSON STRING 
                body: JSON.stringify({})

                CHECK IN NETWORK/REQUEST/PAYLOAD:  OK JSON PAYLOAD(JSON STRING!)
                {title: "Codepen Title", content: "Codepen Content"}
                  content: "Codepen Content"
                  title:"Codepen Title"
          PROBLEM 1: Request Headers: 
                  'Content-Type':'text/plain'
            SOLUTION: set the Header on the client to applciation/json
    1. 


 */
