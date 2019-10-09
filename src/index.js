import ReactDOM from "react-dom";
import React from "react";
// import Calendar from "./component/time-tracker/calendar.jsx";
import "./sass/calendar.scss";
import Timetracker from "./component/time-tracker/timetracker.jsx";
import "./sass/timetracker.scss";

import "./sass/timesheet.scss";

// React.Component

ReactDOM.render(
    <Timetracker />,
    document.querySelector("#root")
)