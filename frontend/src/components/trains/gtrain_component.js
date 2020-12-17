import React from 'react';
const request = require('request');
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

// var ProtoBuf = require('protobufjs')
// var transit = ProtoBuf.loadProtoFile("nyct-subway.proto").build("transit_realtime");
class GTrain extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            trains : 0,
            wait: 0
        }
        this.processFeed = this.processFeed.bind(this)
    }
    async componentDidMount(){
        var requestSettings = {
            method: 'GET',
            url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si',
            encoding: null,
            headers: {
                'x-api-key': 'Y6uzeeKW5s58j2e1NxdDMDBKAyT1o4N7rltQeqW6'
            }

        };
        
        
        request(requestSettings, (error, response, body) => this.processFeed(error, response, body))
        
    }
    componentDidUpdate(){
        console.log(this.state.trains)
    }

    processFeed(error, response, body) {
        
        let x = []
        if (!error && response.statusCode === 200) {
            
           
            var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
            
           
            feed.entity.forEach(function (entity) {
                
               
                if (entity.tripUpdate) {
                    if (entity.tripUpdate.stopTimeUpdate){

                        x.push(entity)
                    }
                    console.log(entity.tripUpdate);
                }
            });
            

            

            
        }
        
        this.setState({trains: x})
        this.setState({wait: 1})
    }
    formatTime(time){
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

    update(x){
        this.setState({trains: x})
    }

    render() {
        if (this.state.wait === 0){
            return null
        }
        let i = 0
        let trains = this.state.trains.map(train => {
            
            let x = train.tripUpdate.stopTimeUpdate
            let info = x.map(ele => {
                
                
                let arr = ele.arrival ? this.formatTime(ele.arrival.time) : "No Arrival Updates"
                let dep = ele.departure ? this.formatTime(ele.departure.time) : "No Departure Updates"

                
                return ele.stopId + " "
                    
            })
            
            return (
                <div key={train.id}>
                    <ul>
                        TRAIN {train.id}<br/>
                        {info}
                    </ul>
                </div>
            )

            
            
        })
        return (
            <div>
                <ul>
                {trains}
                </ul>
            </div>
        );
    }
}

export default GTrain;