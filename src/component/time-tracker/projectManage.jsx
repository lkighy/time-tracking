import React from "react";
import Calendar from "./calendar.jsx";
import "scss/projectManage.scss";

const ADD_PROJECT = "ADD_PROJECT";
const MODIFY_PROJECT = "MODIFY_PROJECT";

class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
        this.handleSetDisplay = this.handleSetDisplay.bind(this)
    }

    handleSetDisplay(display) {
        this.setState({ display })
    }

    render() {
        return (
            <div className="add_project">
                <div className={this.state.display ? "add_button flac" : "add_button"}
                    onClick={() => this.setState({ display: !this.state.display })}
                >
                    <i className="icon-add"></i>
                </div>
                {this.state.display ?
                    <ProjectForm
                        status={ADD_PROJECT}
                        handleSetDisplay={this.handleSetDisplay}

                        colors={this.props.colors}
                        handleAddLabel={this.props.handleAddLabel}
                    /> : ""
                }
            </div>
        )
    }
}

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            toYear: 0,
            toMonth: 0,
            today: 0,
            startTime: "",
            endTime: "",
            startHour: 0,
            startMinute: 0,
            endHour: 0,
            endMinute: 0,
            color: {},
            value: "",
            calendarDisplay: false
        }
        this.handleSetDate = this.handleSetDate.bind(this)
        this.handleSetStartTime = this.handleSetStartTime.bind(this)
        this.handleSetEndTime = this.handleSetEndTime.bind(this)
        this.handleCalendarDisplay = this.handleCalendarDisplay.bind(this)
        this.handleSetColor = this.handleSetColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAddLabel = this.handleAddLabel.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        let date = new Date();
        if (this.props.statue == MODIFY_PROJECT) { // 是否是修改
            let [year, month, day] = this.props.date.split("/")
            let [startHour, startMinute] = this.props.startTime(":")
            let [endHour, endMinute] = this.props.endTime(":")
            this.setState({
                id: this.props.id,
                toYear: year,
                toMonth: month,
                today: day,
                startHour,
                startMinute,
                endHour,
                endMinute,
                color: this.props.colors[0]
            })
        } else {
            this.setState({
                toYear: date.getFullYear(),
                toMonth: date.getMonth(),
                today: date.getDate(),
                startHour: date.getHours(),
                startMinute: date.getMinutes(),
                endHour: date.getHours(),
                endMinute: date.getMinutes(),
                color: this.props.colors[0],
            })
        }
    }

    handleCalendarDisplay() {
        this.setState({
            calendarDisplay: !this.state.calendarDisplay,
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

    handleSetColor(e) {
        this.setState({
            color: {
                id: e.target.dataset.id,
                labelName: e.target.dataset.labelName,
                fontColor: e.target.dataset.color,
                backgroundColor: e.target.dataset.backgroundColor
            }
        })
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

    handleAddLabel(e) {
        e.preventDefault()
        this.props.handleAddLabel({
            id: this.state.id,
            date: this.state.toYear + "/" + (this.state.toMonth + 1) + "/" + this.state.today,
            startTime: this.state.startHour + ":" + this.state.startMinute,
            endTime: this.state.endHour + ":" + this.state.endMinute,
            content: this.state.value,
            color: this.state.color,
        })
        this.props.handleSetDisplay(false)
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleClose(e) {
        e.preventDefault()
        this.props.handleSetDisplay(false)
    }

    render() {
        // 因为需要判断是否是修改还是创建
        return (
            <div className="add_form">
                <a href="" className="close"
                    onClick={this.handleClose}
                >
                    <i className="icon-close"></i>
                </a>
                <div className="tagname">日期:</div>
                <div>
                    <DateSelect
                        toYear={this.state.toYear}
                        toMonth={this.state.toMonth}
                        today={this.state.today}
                        display={this.state.calendarDisplay}

                        handleDisplay={this.handleCalendarDisplay}
                        handleSetDate={this.handleSetDate}
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
                        color={this.state.color}

                        handleSetColor={this.handleSetColor}
                    />
                </div>
                <div className="tagname">备注:</div>
                <textarea className="content" name="content" id="" cols="30" rows="10"
                    value={this.state.value}

                    onChange={this.handleChange}
                    placeholder="你想要做什么?"
                ></textarea>

                {this.props.status == MODIFY_PROJECT ? (
                    <div className="btn-group">
                        <button className="btn-primary"
                        >修改</button>
                        <button className="btn-delete"
                        >删除</button>
                    </div>
                ) : (
                        <div className="btn-group">
                            <button className="btn-primary"
                                onClick={this.handleAddLabel}
                            >添加</button>
                            <button className="btn-cancel"
                            >取消</button>
                        </div>
                    )}
            </div>

        )
    }
}


class AddClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labelName: "",
            backgroundColor: "",
            fontColor: "",
        }
    }

    render() {
        // id 随意, 可以肯定的是不是在这里指定的
        // labelName 标签名称
        // backgroundColor 背景颜色 需要颜色选择组件
        // fontColor 字体颜色 需要颜色选择组件
        // 预览图
        return (
            <div>
                <div className="labname">标签名称:</div>
                <input type="text" className="label-name" />
                <div className="labname">字体颜色:</div>
                <div>颜色选择块啊喂</div>
                <div className="labname">背景颜色:</div>
                <div>颜色选择块</div>
                <div className="labname">预览:</div>
            </div>
        )
    }
}

class ClassSelect extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let colors = this.props.colors;
        let tags = [];
        colors.forEach((v) => {
            let current = v.id == this.props.color.id;
            tags.push(
                <div
                    className="tag"
                    key={v.id}
                    onClick={this.props.handleSetColor}
                    data-id={v.id}
                    data-color={v.fontColor}
                    data-background-color={v.backgroundColor}
                    data-label-name={v.labelName}
                    style={{
                        color: current ? v.fontColor : v.backgroundColor,
                        backgroundColor: current ? v.backgroundColor : v.fontColor,
                        border: "1px solid " + (current ? v.fontColor : v.backgroundColor)
                    }}
                >
                    {v.labelName}
                </div>
            )
        })
        return (
            <div className="class-select">
                {tags}
                {/* 这里有个点击按钮需要添加 */}
                <div className="add-button"><i className="icon-add"></i></div>
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
                    onClick={this.props.handleDisplay}
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

export { AddButton, ProjectForm }


//#region addButton 未拆分前的代码

// export default class AddProject extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             flac: false,
//             toYear: 0,
//             toMonth: 0,
//             today: 0,
//             startHour: 0,
//             startMinute: 0,
//             endHour: 0,
//             endMinute: 0,
//             color: {},
//             value: "",
//             calendarDisplay: false
//         }
//         this.handleSetDate = this.handleSetDate.bind(this)
//         this.handleSetStartTime = this.handleSetStartTime.bind(this)
//         this.handleSetEndTime = this.handleSetEndTime.bind(this)
//         this.handleCalendarDisplay = this.handleCalendarDisplay.bind(this)
//         this.handleFlac = this.handleFlac.bind(this)
//         this.handleSetColor = this.handleSetColor.bind(this)
//         this.handleChange = this.handleChange.bind(this)
//         this.handleAddLabel = this.handleAddLabel.bind(this)
//     }

//     handleFlac() {
//         let flac = this.state.flac;
//         this.setState({ flac: !flac })
//     }

//     componentDidMount() {
//         let date = new Date();
//         this.setState({
//             toYear: this.props.year || date.getFullYear(),
//             toMonth: this.props.month || date.getMonth(),
//             today: this.props.today || date.getDate(),
//             startHour: date.getHours(),
//             startMinute: date.getMinutes(),
//             endHour: date.getHours(),
//             endMinute: date.getMinutes(),
//             color: this.props.colors[0],
//         })
//     }

//     handleCalendarDisplay() {
//         this.setState({
//             calendarDisplay: !this.state.calendarDisplay,
//         })
//     }

//     handleSetDate(year, month, day) {
//         this.setState(() => ({
//             calendarDisplay: false,
//             toYear: year - 0,
//             toMonth: month - 0,
//             today: day - 0,
//         }))
//     }

//     handleSetColor(e) {
//         this.setState({
//             color: {
//                 id: e.target.dataset.id,
//                 labelName: e.target.dataset.labelName,
//                 fontColor: e.target.dataset.color,
//                 backgroundColor: e.target.dataset.backgroundColor
//             }
//         })
//     }

//     handleSetStartTime(hour, minute) {
//         this.setState(() => ({
//             startHour: hour,
//             startMinute: minute
//         }))
//     }
//     handleSetEndTime(hour, minute) {
//         this.setState(() => ({
//             endHour: hour,
//             endMinute: minute
//         }))
//     }

//     handleAddLabel(e) {
//         e.preventDefault()
//         this.props.handleAddLabel({
//             date: this.state.toYear + "/" + (this.state.toMonth + 1) + "/" + this.state.today,
//             startTime: this.state.startHour + ":" + this.state.startMinute,
//             endTime: this.state.endHour + ":" + this.state.endMinute,
//             content: this.state.value,
//             color: this.state.color,
//         })
//         this.setState({ flac: false })
//     }

//     handleChange(e) {
//         this.setState({
//             value: e.target.value
//         })
//     }

//     render() {
//         return (
//             <div className="add_project">
//                 <div className={this.state.flac ? "add_button flac" : "add_button"}
//                     onClick={this.handleFlac}
//                 >
//                     <i className="icon-add"></i>
//                 </div>
//                 {this.state.flac ?
//                     <div className="add_form">
//                         <div className="tagname">日期:</div>
//                         <div>
//                             <DateSelect
//                                 handleSetDate={this.handleSetDate}
//                                 toYear={this.state.toYear}
//                                 toMonth={this.state.toMonth}
//                                 today={this.state.today}
//                                 display={this.state.calendarDisplay}
//                                 handleDisplay={this.handleCalendarDisplay}
//                             />
//                         </div>
//                         <div className="tagname">时间:</div>
//                         <div className="time-selects">
//                             <TimeSelect
//                                 hour={this.state.startHour}
//                                 minute={this.state.startMinute}
//                                 handleSetTime={this.handleSetStartTime}

//                             />
//                             <div>-</div>
//                             <TimeSelect
//                                 hour={this.state.endHour}
//                                 minute={this.state.endMinute}
//                                 handleSetTime={this.handleSetEndTime}
//                             />
//                         </div>
//                         <div className="tagname">类型:</div>
//                         <div className="box">
//                             <ClassSelect
//                                 colors={this.props.colors}
//                                 color={this.state.color}
//                                 handleSetColor={this.handleSetColor}
//                             />
//                         </div>
//                         <div className="tagname">备注:</div>
//                         <textarea className="content" name="content" id="" cols="30" rows="10"
//                             value={this.state.value}
//                             onChange={this.handleChange}
//                             placeholder="你想要做什么?"
//                         ></textarea>
//                         <button className="submit" onClick={this.handleAddLabel}>确定</button>
//                         {/*选择日期/选择开始时间/选择结束时间/选择标签名称/写入内容/好了*/}
//                     </div> : ""}
//             </div>
//         )
//     }
// }

//#endregion