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
class Feeds extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            line: "",
            items: ""
        }
    }
    getStations(line){

        this.setState({items: stations(line), line: line})
    }
    render() {
        let stat = ""
        if(this.state.items != ""){
            stat = Object.keys(this.state.items[this.state.line])
            
            stat = stat.map(ele => {
                debugger
                return(
                    <li>
                        {ele}
                    </li>
                )
            })
        }
        return (
            <>
                <center><h2 className="title">SUBWAY LINES</h2></center>
        <div className="main-container">
            
            <div className="feeds-container cl">
                    
                
                    
                    
                        <img src={A} alt="A" className="line-icon" onClick={() => this.getStations("A")}></img>
                        <img src={C} alt="B" className="line-icon" onClick={() => this.getStations("B")}></img>
                        <img src={E} alt="C" className="line-icon" onClick={() => this.getStations("C")}></img>
                        <img src={G} alt="G" className="line-icon" onClick={() => this.getStations("G")}></img>
                        <img src={One} alt="1" className="line-icon" onClick={() => this.getStations("1")}></img>
                        <img src={Two} alt="2" className="line-icon" onClick={() => this.getStations("2")}></img>
                        <img src={Three} alt="3" className="line-icon" onClick={() => this.getStations("3")}></img>
                        <img src={Four} alt="4" className="line-icon" onClick={() => this.getStations("4")}></img>
                        <img src={Five} alt="5" className="line-icon" onClick={() => this.getStations("5")}></img>
                        <img src={Six} alt="6" className="line-icon" onClick={() => this.getStations("6")}></img>
                        <img src={J} alt="J" className="line-icon" onClick={() => this.getStations("J")}></img>
                        <img src={Z} alt="Z" className="line-icon" onClick={() => this.getStations("Z")}></img>
                        <img src={B} alt="B" className="line-icon" onClick={() => this.getStations("B")}></img>
                        <img src={D} alt="D" className="line-icon" onClick={() => this.getStations("D")}></img>
                        <img src={F} alt="F" className="line-icon" onClick={() => this.getStations("F")}></img>
                        <img src={M} alt="M" className="line-icon" onClick={() => this.getStations("M")}></img>
                        <img src={Seven} alt="7" className="line-icon" onClick={() => this.getStations("7")}></img>
                        <img src={L} alt="L" className="line-icon" onClick={() => this.getStations("L")}></img>
                        <img src={N} alt="N" className="line-icon" onClick={() => this.getStations("N")}></img>
                        <img src={Q} alt="Q" className="line-icon" onClick={() => this.getStations("Q")}></img>
                        <img src={R} alt="R" className="line-icon" onClick={() => this.getStations("R")}></img>
                        <img src={W} alt="W" className="line-icon" onClick={() => this.getStations("W")}></img>
                        <img src={Si} alt="SI" className="line-icon" onClick={() => this.getStations("Si")}></img>
                
            </div>
            
        </div>
        <div>
            <ul>
                {stat}
            </ul>
        </div>
        </>
        );
    }
}

export default Feeds;