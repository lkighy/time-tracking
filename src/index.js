import ReactDOM from "react-dom";
import React from "react";
// import Calendar from "./component/time-tracker/calendar.jsx";
import "./scss/calendar.scss";
import App from "./component/time-tracker/index.js";
import "./scss/timetracker.scss";

import "./scss/timesheet.scss";
import "./scss/reset.scss";

// React.Component



ReactDOM.render(
    <App />,
    document.querySelector("#root")
)