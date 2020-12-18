import React from "react"
const lineDir = {
    "1": ["Bronx", "Manhattan"],
    "2": ["Bronx", "Brooklyn"],
    "3": ["Bronx", "Brooklyn"],
    "4": ["Bronx", "Brooklyn"],
    "5": ["Bronx", "Brooklyn"],
    "6": ["Bronx", "Manhattan"],
    "A": ["Uptown", "Downtown"],
    "C": ["Uptown", "Downtown"],
    "E": ["Uptown", "Downtown"],
    "B": ["Uptown", "Downtown"],
    "D": ["Uptown", "Downtown"],
    "F": ["Uptown", "Downtown"],
    "M": ["Uptown", "Downtown"],
    "G": ["North", "South"],
    "J": ["Uptown", "Downtown"],
    "Z": ["Uptown", "Downtown"],
    "N": ["Uptown", "Downtown"],
    "Q": ["Uptown", "Downtown"],
    "R": ["Uptown", "Downtown"],
    "W": ["Uptown", "Downtown"],
    "L": ["Manhattan", "Brooklyn"],
    "7": ["Manhattan", "Queens"],
    "Si": ["North", "South"],
}
const SidebarStations = ({items, line, updateStation}) => {
    
    const that = this
    if(items === ""){
        return ""
    }
    let direction = lineDir[line]
    let names = Object.keys(items[line])
    let i = 0
    let stat = names.map(ele => {
        
        return (
            <li key={i++}>
                <button className="station-select-btn" onClick={() => updateStation(Object.values(items)[0][ele], ele, direction)}>{ele}</button>
            </li>
        )
    })

    return(
        <ul>
            {stat}
        </ul>
    )
    
}

export default SidebarStations