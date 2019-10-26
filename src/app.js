import  React from "react";
import "./sass/calendar.scss";
import Timetracker from "./component/time-tracker/timetracker.jsx";
import "./sass/timetracker.scss";

import "./sass/timesheet.scss";

let Context = React.createContext();

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // 初始化数据.
        // size: 尺寸
        // labels: 数据
        // date: 日期
        this.setPosition = this.setPosition.bind(this);
        this.setDate = this.setDate.bind(this);
        this.getLabels = this.getLabels.bind(this);
        
        this.state = {
            position: {
                top: 0,
                left: 0
            },
            size: {
                width: 1440,
                height: 1680,
                offsetX: 88,
                offsetY: 48,
            },
            date: {
                toYear: 2019,
                toMonth: 1,
                toDay: 1,
                year: 0,
                month: 0,
                date: 0
            },
            labels: [],
        }
    }

    setPosition(obj) {
        this.setState({
            size: obj
        })
    }

    setDate(obj) {
        this.setState({
            date: obj
        })
    }

    getLabels(date) {

    }

    render() {
        return (
            <Context.Provider
            value={{
                size: this.state.size,
                labels: this.state.labels,
                date: this.state.date
            }}
            >
                <Timetracker />
            </Context.Provider>
        )
    }
}