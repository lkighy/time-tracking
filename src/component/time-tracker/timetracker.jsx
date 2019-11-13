import React from "react";
import Calendar from "./calendar.jsx";
import Timesheet from "./timesheet.jsx";
import Projects from "./project.jsx";
import AddProject from "./addProject.jsx";
import { StateContext } from "context/time_context";

// import "scss/Timetracker.scss";

export default class Timetracker extends React.Component {
    static contextType = StateContext;
    constructor(props) {
        super(props);

        this.state = {
            toYear: 0,
            toMonth: 0,
            today: 0,
        }

        this.handleSetDate = this.handleSetDate.bind(this);
    }

    componentDidMount() {
        let date = new Date();
        this.setState({
            toYear: this.props.year || date.getFullYear(),
            toMonth: this.props.month || date.getMonth(),
            today: this.props.today || date.getDate(),
        })
    }

    handleSetDate(year, month, day) {
        this.setState(() => ({
            toYear: year - 0,
            toMonth: month - 0,
            today: day - 0,
        }))
    }

    render() {
        return (
            <div className="main">
                <div className="sidebar">
                    <Box tagName="日历">
                        <Calendar
                            toYear={this.state.toYear}
                            toMonth={this.state.toMonth}
                            today={this.state.today}
                            handleSetDate={this.handleSetDate}
                            isStay={true}
                        />
                    </Box>
                    <Box tagName="日程">
                        <Projects
                            labels={this.context.labels}
                        />
                    </Box>
                </div>
                <div className="container">
                    <Timesheet />
                </div>
                <AddProject
                    colors={this.context.colors}
                />
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