import React from "react";
import Calendar from "./calendar.jsx";
import Timesheet from "./timesheet.jsx";

// import "scss/Timetracker.scss";

export default class Timetracker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main">
                <div className="sidebar">
                    <Box tagName="日历">
                        <Calendar />
                    </Box>
                </div>
                <div className="container">
                    <Timesheet />
                </div>
            </div>
        )
    }
}


class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlod: true
        }

        this.handleFlod = this.handleFlod.bind(this);
    }

    handleFlod() {
        let flod = this.state.isFlod;
        this.setState({ isFlod: !flod })
    }

    render() {
        return (
            <div className="box">
                <div
                    className="top"
                    onClick={this.handleFlod}
                >
                    <span className="tagName left">{this.props.tagName}</span>
                    <span className="right">{this.state.isFlod ? ">" : "<"}</span>
                </div>
                {this.state.isFlod ?
                    (<div className="body">
                        {this.props.children}
                    </div>) : ""
                }
            </div>
        )
    }
}

// function Box(props) {
//     return (
//         <div className="box">
//             <div className="name">
//                 <span>{this.props.name}</span>
//                 <span>></span>
//             </div>
//             <div className="content">
//                 {props.children}
//             </div>
//         </div>
//     )
// }