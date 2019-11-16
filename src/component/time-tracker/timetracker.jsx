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
            dateRange: [],
        }

        this.handleSetDate = this.handleSetDate.bind(this);
    }

    componentDidMount() {
        let date = new Date();
        // this.setState({
        //     toYear: this.props.year || date.getFullYear(),
        //     toMonth: this.props.month || date.getMonth(),
        //     today: this.props.today || date.getDate(),
        // })
        this.handleSetDate(
            this.props.year || date.getFullYear(),
            this.props.month || date.getMonth(),
            this.props.today || date.getDate(),
            )
    }

    // handleSetDateRange() {
    //     // 设置什么呢?
    // }

    handleSetDate(year, month, day) {
        // 那么的话需要什么呢?
        // 获取这周的日期,那么的话
        let date = new Date(year, month, day);
        let week = date.getDay() // 这是这周的星期几?
        // 获取周日的日期, 获取周六的日期
        let sun = day - 0 - week;
        let sat = day - 0 + 6 - week;
        let dateRange = [];
        for (let i = sun; i < sat; i++) {
            let todate = new Date(year, month, i);
            dateRange.push(todate.getFullYear() + "/" + (todate.getMonth() - 0 + 1)+ "/" + todate.getDate());
        }
        this.setState(() => ({
            toYear: year - 0,
            toMonth: month - 0,
            today: day - 0,
            dateRange: dateRange,
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
                    <Timesheet 
                        year={this.state.toYear}
                        month={this.state.toMonth}
                        day={this.state.today}
                        dateRange={this.state.dateRange}
                    />
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
                    {/* <span className="right">{this.state.isFlod ? ">" : "<"}</span> */}
                    <span className="right">{this.state.isFlod ? <i className="icon-down"></i> : <i className="icon-up"></i> }</span>
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