import React from 'react'

const ClosestTrains = ({ north, south, station, start, end }) => {
    
    function formatNorth(north, animation){

        return north.map(ele => {

            return (
                <li key={ele}>
                    <p className={animation}> {formatTime(ele)}</p>
                </li>
            )
        })

    }

    function formatSouth(south, animation){


        return south.map((ele, idx) => {

            return (
                <li key={ele}>
                    <p className={animation}> {formatTime(ele)}</p>
                </li>
            )
        })



    }
    function formatTime(time) {
        let now = Date.now()
        // now = new Date(now * 1000);
        // Copy and pasted typical unix time conversion, but realized all you do is times by 1000, and then your pretty much good
        let unix_timestamp = time
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = unix_timestamp * 1000
        
        let difUnix = date - now
        difUnix /= 1000
        difUnix = Math.floor(difUnix / 60)
        let color

        if(difUnix <= 5){
            color = "red"
        }else if(difUnix < 10 && difUnix > 5){
            color = "yellow"
        }else{
            color = "white"
        }

        // // Hours part from the timestamp
        // var hours = date.getHours();
        // // Minutes part from the timestamp
        // var minutes = "0" + date.getMinutes();
        // // Seconds part from the timestamp
        // var seconds = "0" + date.getSeconds();

        // // Will display time in 10:30:23 format

        var formattedTime = <p>Train to arrive in <b className={color}>{difUnix}</b> minutes</p>

        return formattedTime
    }
    
    if (north === null) {
        return (
            <center>
            <h2>Closest Trains</h2>
            </center>
        )
    }

    
    north = formatNorth(north)
    south = formatSouth(south)
    return (
        <>
        <div className="row station-title">
            <center>
            <h2>{station}</h2>
            </center>
        </div>
        <div className="row">
            
            <div className="col">
            <h3>{start}</h3>
                <ul id="rec-n">
                {north.slice(0, 2)}
            </ul>
            </div>
            <div className="col">
            <h3>{end}</h3>
            <ul id="rec-n">
            {south.slice(0, 2)}
            </ul>
            </div>
        </div>
        </>
    )

}

export default ClosestTrains