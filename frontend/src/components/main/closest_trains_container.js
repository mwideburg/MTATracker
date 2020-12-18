import React from 'react'

const ClosestTrains = ({ north, south, station, start, end }) => {

    
    if (north === null) {
        return (
            <center>
            <h2>Closest Trains</h2>
            </center>
        )
    }
    // let i = 1000
    // north = north.map(ele => {
        
    //     i = i + 1
    //     return (
    //         <li key={i} className="train-animation">
    //             Arrival: {ele}
    //         </li>
    //     )
    // })
    // let x = 500
    // south = south.map(ele => {
        
    //     x = x + 1
    //     return (
    //         <li className="train-animation" key={x}>
    //             Arrival: {ele}
    //         </li>
    //     )
    // })
    
    
    return (
        <>
        <div className="row">
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