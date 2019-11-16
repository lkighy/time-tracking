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
            startHour: 0,
            startMinute: 0,
            endHour: 0,
            endMinute: 0,
            calendarDisplay: false
        }
        this.handleSetDate = this.handleSetDate.bind(this)
        this.handleSetStartTime = this.handleSetStartTime.bind(this)
        this.handleSetEndTime = this.handleSetEndTime.bind(this)
        this.handleCalendarDisplay = this.handleCalendarDisplay.bind(this)
        this.handleFlac = this.handleFlac.bind(this)
    }

    handleFlac() {
        let flac = this.state.flac;
        this.setState({ flac: !flac })
    }

    componentDidMount() {
        let date = new Date();
        this.setState({
            toYear: this.props.year || date.getFullYear(),
            toMonth: this.props.month || date.getMonth(),
            today: this.props.today || date.getDate(),
            startHour: date.getHours(),
            startMinute: date.getMinutes(),
            endHour: date.getHours(),
            endMinute: date.getMinutes(),
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
    handleSetStartTime(hour, minute) {
        this.setState(() => ({
            startHour: hour,
            startMinute: minute
        }))
    }
    handleSetEndTime(hour, minute) {
        this.setState(() => ({
            endHour: hour,
            endMinute: minute
        }))
    }

    render() {
        return (
            <div className="add_project">
                <div className={this.state.flac ? "add_button flac" : "add_button"}
                    onClick={this.handleFlac}
                >
                    <i className="icon-add"></i>
                </div>
                {this.state.flac ? <div className="add_form">
                    <div className="tagname">日期:</div>
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
                    <div className="tagname">时间:</div>
                    <div className="time-selects">
                        <TimeSelect
                            hour={this.state.startHour}
                            minute={this.state.startMinute}
                            handleSetTime={this.handleSetStartTime}

                        />
                        <div>-</div>
                        <TimeSelect
                            hour={this.state.endHour}
                            minute={this.state.endMinute}
                            handleSetTime={this.handleSetEndTime}
                        />
                    </div>
                    <div className="tagname">类型:</div>
                    <div className="box">
                        <ClassSelect
                            colors={this.props.colors}
                        />
                    </div>
                    {/* 选择东西 */}
                    {/* <input type="text" className="content"/> */}
                    {/* 选择颜色出行 */}
                    <div className="tagname">备注:</div>
                    <textarea className="content" name="content" id="" cols="30" rows="10"
                        placeholder="你想要做什么?"
                    ></textarea>
                    <button className="submit">确定</button>
                    {/*选择日期/选择开始时间/选择结束时间/选择标签名称/写入内容/好了*/}
                </div> : ""}
            </div>
        )
    }
}


class ClassSelect extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // 接收得 props 参数 有 colors:
        // 现在你要怎么做呢
        let colors = this.props.colors;
        let tags = [];
        colors.forEach((v, i) => {
            tags.push(
                <div
                    className="tag"
                    key={v.id}
                    style={{
                        color: v.color,
                        backgroundColor: v.backgroundColor,
                    }}
                >
                    {v.labelName}
                </div>
            )
        })
        return (
            <div className="class-select">
                {tags}
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
                    value={this.props.toYear + "/" + (this.props.toMonth + 1) + "/" + this.props.today}
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

        this.handleTime = this.handleTime.bind(this)
        this.handleHourWheel = this.handleHourWheel.bind(this)
        this.handleMinuteWheel = this.handleMinuteWheel.bind(this)
    }


    // 格式化 小时 和 分钟,保持两位数保证好看
    formatTime(time) {
        time = parseInt(time)
        if (parseInt(time) < 10) {
            return "0" + time
        }
        return time
    }

    // 传入 时间得类型,如果是 hour 则按照 hour 处理 否则按找分钟处理
    handleTime(e) {
        let v;
        let act = e.target.dataset.act // 判断动作是加还是减
        let type = e.target.dataset.type // 判断是小时还分钟
        if (act == "next") {
        }

        if (type == "hour") {
            v = this.props.hour
            if (act == "next") {
                v = v < 23 ? v + 1 : 0
            } else {
                v = v > 0 ? v - 1 : 59
            }
            this.props.handleSetTime(v, this.props.minute)
        } else {
            v = this.props.minute
            if (act == "next") {
                v = v < 59 ? v + 1 : 0
            } else {
                v = v > 0 ? v - 1 : 0
            }
            this.props.handleSetTime(this.props.hour, v)
        }

    }

    handleMinuteWheel(e) {
        // console.log("Y滚动: ", e.deltaY / 100)
        let minute = this.props.minute;
        minute = minute + e.deltaY / 100
        if (minute > 59) {
            minute = 0
        } else if (minute < 0) {
            minute = 59
        }
        this.props.handleSetTime(this.props.hour, minute)
    }
    handleHourWheel(e) {
        let hour = this.props.hour;
        hour = hour + e.deltaY / 100
        if (hour > 23) {
            hour = 0
        } else if (hour < 0) {
            hour = 23
        }

        this.props.handleSetTime(hour, this.props.minute)
    }

    render() {
        let hour = parseInt(this.props.hour);
        let minute = parseInt(this.props.minute);
        let nextHour = hour < 23 ? hour + 1 : 0
        let prevHour = hour > 0 ? hour - 1 : 23
        let nextMinute = minute < 59 ? minute + 1 : 0
        let prevMinute = minute > 0 ? minute - 1 : 59
        return (
            <div className="time-select">
                <div className="hours"
                    onWheel={this.handleHourWheel}
                >
                    <div className="prev"
                        data-type="hour"
                        data-act="prev"
                        onClick={this.handleTime}
                    >{this.formatTime(prevHour)}</div>

                    <div className="hour">{this.formatTime(this.props.hour)}</div>
                    <div className="next"
                        data-type="hour"
                        data-act="next"
                        onClick={this.handleTime}
                    >{this.formatTime(nextHour)}</div>
                </div>
                <div>:</div>
                <div className="minutes"
                    onWheel={this.handleMinuteWheel}
                >
                    <div className="prev"
                        data-type="minute"
                        data-act="next"
                        onClick={this.handleTime}
                    >{this.formatTime(prevMinute)}</div>
                    <div className="minute">{this.formatTime(this.props.minute)}</div>
                    <div className="next"
                        data-type="minute"
                        data-act="next"
                        onClick={this.handleTime}
                    >{this.formatTime(nextMinute)}</div>
                </div>
            </div>
        )
    }
}
