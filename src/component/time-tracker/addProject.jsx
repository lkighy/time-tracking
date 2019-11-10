import React from "react";
import Calendar from "./calendar.jsx";
import "scss/addProject.scss";

export default class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flac: false,
            toYear: 0,
            toMonth: 0,
            today: 0,
            calendarDisplay: false
        }
        this.handleSetDate = this.handleSetDate.bind(this)
        this.handleCalendarDisplay = this.handleCalendarDisplay.bind(this)
    }

    componentDidMount() {
        let date = new Date();
        this.setState({
            toYear: this.props.year || date.getFullYear(),
            toMonth: this.props.month || date.getMonth(),
            today: this.props.today || date.getDate(),
        })
    }

    handleCalendarDisplay() {
        this.setState({
            calendarDisplay: true,
        })
    }

    handleSetDate(year, month, day) {
        this.setState(() => ({
            calendarDisplay: false,
            toYear: year - 0,
            toMonth: month - 0,
            today: day - 0,
        }))
    }

    render() {
        return (
            <div className="add_project">
                <div className="add_button">
                    +
                </div>
                <div className="add_form">
                    <div>
                        <DateSelect
                            handleSetDate={this.handleSetDate}
                            toYear={this.state.toYear}
                            toMonth={this.state.toMonth}
                            today={this.state.today}
                            display={this.state.calendarDisplay}
                            handleDisplay={this.handleCalendarDisplay}
                        />
                    </div>
                    <div>
                        <TimeSelect />
                    </div>
                    {/* 选择东西 */}
                    {/* <input type="text" className="content"/> */}
                    <textarea className="content" name="content" id="" cols="30" rows="10"
                        placeholder="你想要做什么?"
                    ></textarea>
                    <button className="submit">确定</button>
                    {/*选择日期/选择开始时间/选择结束时间/选择标签名称/写入内容/好了*/}
                </div>
            </div>
        )
    }
}

class DateSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="date-select">
                <input type="text"
                    onFocus={this.props.handleDisplay}
                    value={this.props.toYear + "/" + this.props.toMonth + "/" + this.props.today}
                    readOnly />
                <div className="date-calendar">
                    {this.props.display ?
                        <Calendar
                            toYear={this.props.toYear}
                            toMonth={this.props.toMonth}
                            today={this.props.today}
                            handleSetDate={this.props.handleSetDate}
                        /> : ""}
                </div>
            </div>
        )
    }
}


// 时间选择: 接收传入的时间(时:分), 接收参数修改的方法 handleTime(hour, minute), 只需要这两个即可,

class TimeSelect extends React.Component {
    constructor(props) {
        super(props)

        this.handleSetTime = this.handleSetTime.bind(this)

        this.state = {
            display: false
        }
    }

    handleSetTime() {
        this.setState({
            display: true
        })
    }

    render() {
        return (
            <div className="time-select">
                <div className="hours">
                    <div className="hour"></div>
                </div>
                <div>:</div>
                <div className="minutes">
                    <div className="minute"></div>
                </div>
            </div>
        )
    }
}
