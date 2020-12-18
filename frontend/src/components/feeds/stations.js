import React from "react"
import {getStations, getLine} from '../../google_transit/stops'
export const stations = (line) => {
    const list = getStations()  
    
    const stationIds = {}
        let stationsList = {}
        getLine(line).forEach(ele => {
            
            stationsList[list[ele]] = ele})
        stationIds[line] = stationsList
    return(
        stationIds
    )
}