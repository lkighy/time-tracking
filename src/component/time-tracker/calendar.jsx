import React from "react";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.handleDays = this.handleDays.bind(this);
        this.headleLastMonthSwitch = this.headleLastMonthSwitch.bind(this);
        this.headleNextMonthSwitch = this.headleNextMonthSwitch.bind(this);
        // this.handleSetDate = this.handleSetDate.bind(this);

        this.state = {
            monthArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            // toYear: 0, // 选中的年份
            // toMonth: 0, // 选中的月份
            // today: 0, // 表示选中哪一天
            year: 0, // 表示日历显示的当前年份
            month: 0, // 表示日历显示的当前月份
            inDays: {
                days: [],
                daysNum: 0, // 这个月有多少天
                fromDay: 0, // 从序列几开始
            },
        }
    }

    componentDidMount() { // 挂载
        let date = new Date();
        this.setState({
            // toYear: this.props.year || date.getFullYear(),
            // toMonth: this.props.month || date.getMonth(),
            // today: this.props.today || date.getDate(),
            year: this.props.year || date.getFullYear(),
            month: this.props.month || date.getMonth(),
        })
        this.handleDays(date.getFullYear(), date.getMonth());
    }

    handleDays(year, month) {
        let days = [];
        // let year = this.state.year;
        // let month = this.state.month;
        let date = new Date(year, month, 1) // 创建 1日的日期
        let daysNum = getMonthToDay(year, month)

        let fromDay = date.getDay()
        let lastMonthDayNum = month > 0 ? getMonthToDay(year, month - 1) : 31;

        // 往数组添加本月的日期
        for (let i = 1; i <= daysNum; i++) {
            days.push(i);
        }

        // 往数组添加上月的日期,填补的长度为星期
        for (let i = lastMonthDayNum; i > lastMonthDayNum - fromDay; i--) {
            days.unshift(i);
        }

        // 在末尾添加下月的日期, 凑够 35 长度
        let len = days.length;
        for (let i = len; i < 42; i++) {
            days.push(i - len + 1);
        }

        this.setState({
            inDays: {
                days: days,
                daysNum: daysNum,
                fromDay: fromDay,
            }
        })
    }

    headleLastMonthSwitch() { // 换到上个月
        let month = this.state.month > 0 ? this.state.month - 1 : 11;
        let year = this.state.month > 0 ? this.state.year : this.state.year - 1;
        this.setState(() => ({
            month,
            year
        }))
        this.handleDays(year, month);
    }

    headleNextMonthSwitch() { // 换到下个月
        let month = this.state.month < 11 ? this.state.month + 1 : 0;
        let year = this.state.month < 11 ? this.state.year : this.state.year + 1;
        this.setState(() => ({
            month,
            year
        }))
        this.handleDays(year, month);
    }

    // handleSetDate(year, month, day) {
    //     // 设置日期
    //     this.setState(() => ({
    //         toYear: year - 0,
    //         toMonth: month - 0,
    //         today: day - 0
    //     }))

    // }

    render() {
        let toYear = this.props.toYear;
        let toMonth = this.props.toMonth;
        let today = this.props.today;

        return (
            <div className="calendar">
                <YearSwitch
                    monthArr={this.state.monthArr}
                    year={this.state.year}
                    month={this.state.month}
                    headleLastMonthSwitch={this.headleLastMonthSwitch}
                    headleNextMonthSwitch={this.headleNextMonthSwitch}
                />
                <div className="week">
                    <div>日</div>
                    <div>一</div>
                    <div>二</div>
                    <div>三</div>
                    <div>四</div>
                    <div>五</div>
                    <div>六</div>
                </div>
                <DaysList
                    isStay={true}
                    toMonth={toMonth}
                    toYear={toYear}
                    today={today}
                    year={this.state.year}
                    month={this.state.month}
                    inDays={this.state.inDays}
                    handleSetDate={this.props.handleSetDate}
                />
            </div>
        )
    }
}

// 年份切换按钮
class YearSwitch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="year">
                <a onClick={this.props.headleLastMonthSwitch}>&lt;</a><div className="select" id="calendar-select">
                    <div>{this.props.year}年 {this.props.monthArr[this.props.month]}月</div>
                    <div className="list"></div>
                </div><a onClick={this.props.headleNextMonthSwitch}>&gt;</a>
            </div>
        )
    }
}

// 日期切换
class DaysList extends React.Component {
    constructor(props) {
        super(props);

        this.handleSwitchDay = this.handleSwitchDay.bind(this);
    }

    handleSwitchDay(e) {

        let year = e.target.dataset.year;
        let month = e.target.dataset.month;
        let day = e.target.dataset.day;
        this.props.handleSetDate(year, month, day)
    }

    render() {
        let month = this.props.month;
        let year = this.props.year;
        let toMonth = this.props.toMonth;
        let toYear = this.props.toYear;
        let today = this.props.today;
        let inDays = this.props.inDays;

        let days = [];

        for (let i = 0; i < parseInt(inDays.days.length / 7); i++) {
            let pack = [];
            let isStay = false;
            // let data;
            for (let j = i * 7; j < i * 7 + 7; j++) {
                let day = inDays.days[j];

                let inMonth = month;
                let inYear = year;

                if (j < inDays.fromDay) {
                    if (inMonth > 0) {
                        inMonth--;
                    } else {
                        inMonth = 11;
                        inYear--;
                    }
                    // month > 0 ? month-- : (month + 11) & year--; // 一行搞定,但是会存在问题, 所以不采用

                } else if (j > inDays.fromDay + inDays.daysNum - 1) {
                    if (inMonth < 11) {
                        inMonth++;
                    } else {
                        inMonth = 0;
                        inYear++;
                    }
                    // month < 11 ? month++:(month-=11)&year++; // 存在问题,不采用
                }

                let className = "";
                if (toYear == inYear && toMonth == inMonth && day == today) {
                    className += "current ";
                }

                if (inYear != year || inMonth != month) {
                    className += "no-this"
                }
                pack.push(
                    <div
                        key={j}
                        data-month={inMonth}
                        data-year={inYear}
                        data-day={day}
                        className={className}
                        onClick={this.handleSwitchDay}
                    >
                        {day}
                    </div>
                )
            }
            let stay = this.props.isStay && isStay ? "stay" : "";
            days.push(<div className={"pack " + stay} key={i} >{pack}</div>);
        }

        return (
            <div className="days">
                {days}
            </div>
        )
    }
}

// 计算一个月多少天
function getMonthToDay(year, month) {
    switch (month) {
        case 0:
            return 31;
        case 1:
            if (year % 4 == 0) {
                return 29
            } else {
                return 28
            }
        case 2:
            return 31;
        case 3:
            return 30;
        case 4:
            return 31;
        case 5:
            return 30;
        case 6:
            return 31;
        case 7:
            return 31;
        case 8:
            return 30;
        case 9:
            return 31;
        case 10:
            return 30;
        case 11:
            return 31;
    }
}

