import React from "react"
const request = require('request');
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const Feed = ({ station, url }) => {
    // if(station === null){
    //     return null
    // }
    
    let trains = 0;
    
    let path = url
    async function getFeed(){
        let result
        if (url != null) {
            var requestSettings = {
                method: 'GET',
                url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs' + `${url}`,
                encoding: null,
                headers: {
                    'x-api-key': 'Y6uzeeKW5s58j2e1NxdDMDBKAyT1o4N7rltQeqW6'
                }

            };
            
            result = await request(requestSettings, (error, response, body) => processFeed(error, response, body))
        }
        return result
    }

    function processFeed(error, response, body){
        
        let x = []
        if (!error && response.statusCode === 200) {


            var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);

            
            feed.entity.forEach(function (entity) {


                if (entity.tripUpdate) {
                    if (entity.tripUpdate.stopTimeUpdate) {

                        x.push(entity)
                    }
                    console.log(entity.tripUpdate);
                }
            });





        }
        
        trains = x
        let i = 0
        if (x.length === 0) {
            return 
        }
        
        trains = trains.map(train => {

            let y = train.tripUpdate.stopTimeUpdate
            let info = y.map(ele => {


                let arr = ele.arrival ? formatTime(ele.arrival.time) : "No Arrival Updates"
                let dep = ele.departure ? formatTime(ele.departure.time) : "No Departure Updates"


                return ele.stopId + " " + "arrival" + arr + " " + "dep" + dep

            })

            return (
                <div key={train.id}>
                    <ul>
                        TRAIN {train.id}<br />
                        {info}
                    </ul>
                </div>
            )



        })
        // return (
        //     <div>
        //         <ul>
                    
        //         </ul>
        //     </div>
        // );
        
    }
    function formatTime(time){
        let unix_timestamp = time
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime
    }
    
    if (url === null) {
        return null
    }
    
    
    
}

export default Feed