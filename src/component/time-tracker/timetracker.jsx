import React from "react";
import Calendar from "./calendar.jsx";
import Timesheet from "./timesheet.jsx";

export default class Timetracker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main">
                <div className="sidebar">
                    <Calendar />
                </div>
                <div className="container">
                    <Timesheet />
                </div>
            </div>
        )
    }
}
