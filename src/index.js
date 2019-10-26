import ReactDOM from "react-dom";
import React from "react";
// import Calendar from "./component/time-tracker/calendar.jsx";
import "./sass/calendar.scss";
import App from "./component/time-tracker/index.js";
import "./sass/timetracker.scss";

import "./sass/timesheet.scss";

// React.Component



ReactDOM.render(
    <App />,
    document.querySelector("#root")
)