import React from 'react';
import {Link} from 'react-router-dom'
import One from '../../assets/images/1.svg'
import Two from '../../assets/images/2.svg'
import Three from '../../assets/images/3.svg'
import Four from '../../assets/images/4.svg'
import Five from '../../assets/images/5.svg'
import Six from '../../assets/images/6.svg'
import Seven from '../../assets/images/7.svg'
import A from '../../assets/images/A.svg'
import B from '../../assets/images/B.svg'
import C from '../../assets/images/C.svg'
import D from '../../assets/images/D.svg'
import E from '../../assets/images/E.svg'
import F from '../../assets/images/F.svg'
import G from '../../assets/images/G.svg'
import J from '../../assets/images/J.svg'
import L from '../../assets/images/L.svg'
import M from '../../assets/images/M.svg'
import N from '../../assets/images/N.svg'
import Q from '../../assets/images/Q.svg'
import R from '../../assets/images/R.svg'
import Si from '../../assets/images/SI.svg'
import W from '../../assets/images/W.svg'
import Z from '../../assets/images/Z.svg'
import {stations} from './stations'
import SidebarStations from '../station_sidebar/station_sidebar'
import ClosestTrains from './closest_trains_container'
import { set } from 'mongoose';
const images = {
    "1": One,
    "2": Two,
    "3": Three,
    "4": Four,
    "5": Five,
    "6": Six,
    "A": A,
    "C": C,
    "E": E,
    "B": B,
    "D": D,
    "F": F,
    "M": M,
    "G": G,
    "J": J,
    "Z": Z,
    "N": N,
    "Q": Q,
    "R": R,
    "W": W,
    "L": L,
    "7": Seven,
    "Si": Si,
}

const request = require('request');
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
class MainPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            line: "",
            items: "",
            path: null,
            firstTimes: 0,
            station: null,
            name: null,
            trains: 0,
            start: "",
            end: "",
            image: ""

        }
        this.updateStation = this.updateStation.bind(this)
    }
    getStations(line, path){
        // This is hitting stations.js, which is parsing a bunch of txt files in order to grab station names,
        // but also their stop_id so we can use them late to filter the feed
        
        this.setState({items: stations(line), line: line, path: path, image: images[line]})
    }
    updateStation(station, name, directions){
        // This is recieving the stop_id which is updated to the state and is used to filter the feed,
        // In the future I would like to make it so you can have multiple, save them, and not have this state,
        // be so unitlateral or just dependent on one component.
        
        this.setState({station: station, name: name, start: directions[0], end: directions[1]})
        this.getFeed()
        setInterval(() => {
            let count = this.state.firstTimes + 1
            this.setState({firstTimes: count})
            this.getFeed()
            
        }, 3000)
        setTimeout(() => {
            document.getElementById('closest-trains').style.opacity = 1

        }, 500)
    }
    async getFeed() {
        // Beautiful async!
        if (this.state.path != null) {
            var requestSettings = {
                method: 'GET',
                url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs' + `${this.state.path}`,
                encoding: null,
                headers: {
                    'x-api-key': 'Y6uzeeKW5s58j2e1NxdDMDBKAyT1o4N7rltQeqW6'
                }

            };

            request(requestSettings, (error, response, body) => this.processFeed(error, response, body))
        }
    }

    processFeed(error, response, body) {
        // This is my solution to waiting for the promise and then using the GTF bindings to decode the message,
        // not sure if this is the best way, but it works and it sems pretty harmless.
        let x = []
        if (!error && response.statusCode === 200) {
            var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
            feed.entity.forEach(function (entity) {
                if (entity.tripUpdate) {
                    if (entity.tripUpdate.stopTimeUpdate) {
                        x.push(entity)
                    }
                    
                }
            });
        }
        
        this.setState({ trains: x })
    }
    filterTrainsByStation(){
        let station = this.state.station
        let north
        let south
        let trains = []
        if (this.state.trains != 0) {
            this.state.trains.forEach(train => {
                let x = train.tripUpdate.stopTimeUpdate
                
                x = x.filter(ele => ele.stopId.substring(0, 3) === station)
                trains.push(...x)

                
            })
        }
        let animation = ""
        
        if (this.state.firstTimes >= 0) {
            animation = "train-animation"
        }
        north = this.filterNorth(trains, animation)
        south = this.filterSouth(trains, animation)
        
        return [north, south]
    }
    filterNorth(x, animation){
        let north = []
        
        x.filter(ele => ele.stopId[3] === "N").forEach(ele => {
            
            let arr = ele.arrival ? ele.arrival.time : "No Arrival Updates"
            let dep = ele.departure ? ele.departure.time : "No Departure Updates"
            north.push(arr)
        })
        // north = this.formatNorth(north, animation)
        return north

    }
    filterSouth(x, animation){
        let south = []
        x.forEach(ele => {
            if (ele.stopId[3] === "S") {
                let arr = ele.arrival ? ele.arrival.time : "No Arrival Updates"
                south.push(arr)
            }
        })
        // south = this.formatSouth(south, animation)
        return south

    }
    formatNorth(trains, animation){
       
        return trains.map(ele => {
            
            return (
                <li key={ele}>
                    Arrival: {this.formatTime(ele)}
                </li>
            )
        })
        
    }

    formatSouth(trains, animation){
        
       
        return trains.map((ele, idx) => {
            
            return (
                <li key={ele}>
                    Arrival: {this.formatTime(ele)}
                </li>
            )
        })
        
        

    }

    getImage(){
        return this.state.image != "" ? <img src={this.state.image} alt={this.state.line} className="line-icon selected"></img> : ""
    }
    setUpdateAnimation(){
        let counter = this.state.firstTimes + 1
        this.setState({firstTimes: counter})
        // if(this.state.firstTimes > 1){
            
        //     document.getElementById("north").classList.add("train-animation")
        //     document.getElementById("north").classList.add("train-animation")
        // }
            
        
    }

    getNextTwoTrains(){

    }
    formatTime(time) {
        // Copy and pasted typical unix time conversion, but realized all you do is times by 1000, and then your pretty much good
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
    render() {
        let north = null
        let south = null
        let station = (this.state.name === null) ? "Select Station to Get Updates" : this.state.name

        let allNorth
        let allSouth
        if (this.state.trains != 0) {
            // if a feed is selected filter and format the feed
            let trains = this.filterTrainsByStation()
            north = trains[0]
            south = trains[1]
            allNorth = this.formatNorth(north)
            allSouth = this.formatSouth(south)
        }

        // format time of trains for this compnent
   
        
        // Grab svg of the selected line
        const lineImg = this.getImage()

        // This could be broken into different component, but the async had been a 
        // little tricky so this is what I ended up with
        
        return (
            <>
                
        <div className="main-container">
            <div className="sidebar left">
                <div className="sticky-icon">
                {lineImg}
                </div>
                
                <SidebarStations items={this.state.items} line={this.state.line} updateStation={this.updateStation}/>

            </div>
            <div className={"main-middle"}>
            <center><h2 className="title">SUBWAY LINES</h2></center>
            <div className="feeds-container cl">
                        <button className="line-icon"><img src={A} alt="A"  onClick={() => this.getStations("A", "-ace")}></img></button>
                        <button className="line-icon"><img src={C} alt="C" onClick={() => this.getStations("C", "-ace")}></img></button>
                        <button className="line-icon"><img src={E} alt="E" onClick={() => this.getStations("E", "-ace")}></img></button>
                        <button className="line-icon"><img src={G} alt="G" onClick={() => this.getStations("G", "-g")}></img></button>
                        <button className="line-icon"><img src={One} alt="1" onClick={() => this.getStations("1", "")}></img></button>
                        <button className="line-icon"><img src={Two} alt="2" onClick={() => this.getStations("2", "")}></img></button>
                        <button className="line-icon"><img src={Three} alt="3" onClick={() => this.getStations("3", "")}></img></button>
                        <button className="line-icon"><img src={Four} alt="4" onClick={() => this.getStations("4", "")}></img></button>
                        <button className="line-icon"><img src={Five} alt="5" onClick={() => this.getStations("5", "")}></img></button>
                        <button className="line-icon"><img src={Six} alt="6" onClick={() => this.getStations("6", "")}></img></button>
                        <button className="line-icon"><img src={J} alt="J" onClick={() => this.getStations("J", "-jz")}></img></button>
                        <button className="line-icon"><img src={Z} alt="Z" onClick={() => this.getStations("Z", "-jz")}></img></button>
                        <button className="line-icon"><img src={B} alt="B" onClick={() => this.getStations("B", "-bdfm")}></img></button>
                        <button className="line-icon"><img src={D} alt="D" onClick={() => this.getStations("D", "-bdfm")}></img></button>
                        <button className="line-icon"><img src={F} alt="F" onClick={() => this.getStations("F", "-bdfm")}></img></button>
                        <button className="line-icon"><img src={M} alt="M" onClick={() => this.getStations("M", "-bdfm")}></img></button>
                        <button className="line-icon"><img src={Seven} alt="7" onClick={() => this.getStations("7", "-7")}></img></button>
                        <button className="line-icon"><img src={L} alt="L" onClick={() => this.getStations("L", "-l")}></img></button>
                        <button className="line-icon"><img src={N} alt="N" onClick={() => this.getStations("N", "-nqrw")}></img></button>
                        <button className="line-icon"><img src={Q} alt="Q" onClick={() => this.getStations("Q", "-nqrw")}></img></button>
                        <button className="line-icon"><img src={R} alt="R" onClick={() => this.getStations("R", "-nqrw")}></img></button>
                        <button className="line-icon"><img src={W} alt="W" onClick={() => this.getStations("W", "-nqrw")}></img></button>
                        <button className="line-icon"><img src={Si} alt="SI" onClick={() => this.getStations("Si", "-si")}></img></button>
            </div>
            <div className="station-details" id="closest-trains">
            <ClosestTrains className="hide" key="closesTrains" station={station} north={north} south={south} start={this.state.start} end={this.state.end}/>
            </div>
            </div>
            <div className="sidebar right">
            <h2>{station}</h2>
            <h3>{this.state.start}</h3>
            
            <ul id="north">
            {allNorth}
            </ul>
            <h3>{this.state.end}</h3>
            
            <ul id="south">
            {allSouth}
            </ul>
            </div>
            
        </div>
        </>
        );
    }
}

export default MainPage;