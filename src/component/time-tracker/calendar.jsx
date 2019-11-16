import React from "react";

import "css/fonts.css";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.handleDays = this.handleDays.bind(this);
        this.headleLastMonthSwitch = this.headleLastMonthSwitch.bind(this);
        this.headleNextMonthSwitch = this.headleNextMonthSwitch.bind(this);
        this.handleSwitchDate = this.handleSwitchDate.bind(this);
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
            year: this.props.toYear || date.getFullYear(),
            month: this.props.toMonth || date.getMonth(),
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

    handleSwitchDate(year, month) {
        this.setState(() => ({
            year,
            month,
        }))
        this.handleDays(year, month);
    }

    headleLastMonthSwitch() { // 换到上个月
        // let month = this.state.month > 0 ? this.state.month - 1 : 11;
        // let year = this.state.month > 0 ? this.state.year : this.state.year - 1;
        let date = new Date(this.state.year, this.state.month - 1)
        let year = date.getFullYear();
        let month = date.getMonth();
        this.setState(() => ({
            month: month,
            year: year
        }))
        this.handleDays(year, month);
    }

    headleNextMonthSwitch() { // 换到下个月
        let date = new Date(this.state.year, this.state.month + 1)
        let year = date.getFullYear();
        let month = date.getMonth();
        // let month = this.state.month < 11 ? this.state.month + 1 : 0;
        // let year = this.state.month < 11 ? this.state.year : this.state.year + 1;
        this.setState(() => ({
            month: month,
            year: year
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
                    toYear={toYear}
                    toMonth={toMonth}
                    today={today}
                    monthArr={this.state.monthArr}
                    year={this.state.year}
                    month={this.state.month}
                    headleLastMonthSwitch={this.headleLastMonthSwitch}
                    headleNextMonthSwitch={this.headleNextMonthSwitch}
                    handleSwitChDate={this.handleSwitchDate}
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
                    isStay={this.props.isStay}
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

        this.state = {
            status: 0,
            monthArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            yearArr: [],
            year: 0,
        }

        this.handleStatus = this.handleStatus.bind(this)
        this.handleYearList = this.handleYearList.bind(this)
        this.handleYearWheel = this.handleYearWheel.bind(this)
        this.handleSetYear = this.handleSetYear.bind(this)
        this.handleSetMonth = this.handleSetMonth.bind(this)
    }
    componentDidMount() {
        let year = new Date().getFullYear();
        let yearArr = [];
        let firstYear = year - 5;
        let lastYear = year - 0 + 6;
        for (let i = firstYear; i <= lastYear; i++) {
            yearArr.push(i)
        }
        this.setState({ yearArr, year: new Date().getFullYear() })
    }

    handleYearWheel(e) {
        // e.deltaY
        let yearArr = this.state.yearArr;
        let deltaY = e.deltaY / 100
        if (deltaY > 0) { // 往下滑动 删除前面. 在后面添加
            // 现在的问题是怎么添加添加一个删除一个吧
            for (let i = 0; i < 4; i++) {
                yearArr.shift() // 删除前面的元素
                yearArr.push(yearArr[yearArr.length - 1] + 1)// 在尾部追加元素
            }
            this.setState(() => ({ yearArr }))
        } else if (deltaY < 0) { // 网上滑动, 删除后面. 添加前面
            for (let i = 0; i < 4; i++) {
                yearArr.pop() // 删除后面的元素
                yearArr.unshift(yearArr[0] - 1) // 在前面追加数组
            }
            this.setState(() => ({ yearArr }))
        }
    }

    handleYearList() {
        let yearArr = [];
        let firstYear = this.props.toYear - 5;
        let lastYear = this.props.toYear - 0 + 6;
        for (let i = firstYear; i <= lastYear; i++) {
            yearArr.push(i)
        }
        this.setState({ yearArr })

    }

    handleSetYear(e) {
        // 需要临时变量存储内容,
        // this.props.handleSetDate(year, month, day)
        let year = e.target.dataset.value
        this.setState({ year: year, status: 1 })
    }

    handleSetMonth(e) {
        let month = e.target.dataset.value
        // console.log(this.state.year, month)
        this.props.handleSwitChDate(this.state.year, month - 0)
        this.setState({ status: 0 })
    }

    handleStatus() {
        // console.log("status: ", this.state.status)
        let status = this.state.status;
        if (status <= 1) {
            status += 1
            this.setState(() => ({ status: status }))
        }
    }

    render() {
        // 状态码: 0 默认, 1 月份, 2 年份
        let list = [];
        // let ?? 不知道命名什么了
        let block;
        let select = this.props.year + "年 " + this.props.monthArr[this.props.month] + "月";
        if (this.state.status == 1) {
            select = this.state.year+"年"
            let monthArr = this.props.monthArr || this.state.monthArr;
            monthArr.forEach((v, i) => {
                let style = this.props.toYear == this.props.year && this.props.toMonth == i ? "option current" : "option"
                list.push(
                    <div onClick={this.handleSetMonth} className={style} data-value={i} key={i}>{v}月</div>
                )
            });
            block = (<div className="list">
                <div className="array"></div>
                {list}
            </div>)
        } else if (this.state.status == 2) {
            select = this.state.yearArr[0] + " - " + this.state.yearArr[this.state.yearArr.length - 1]
            this.state.yearArr.forEach((v, i) => {
                list.push(
                    <div onClick={this.handleSetYear} className={v == this.props.toYear ? "option current" : "option"} data-value={v} key={i}>{v}</div>
                )
            })
            block = (<div onWheel={this.handleYearWheel} className="list">
                <div className="array"></div>
                {list}
            </div>)
        }

        return (
            <div className="year">
                <a onClick={this.props.headleLastMonthSwitch}><i className="icon-left"></i></a><div className="select" id="calendar-select">
                    {/* 设置什么 点击改变 status 的状态 */}
                    <div onClick={this.handleStatus}>{select}</div>
                    {block}
                    {/* {this.state.status == 0 ? "" : <div className="list">
                        <div className="array"></div>
                        {block}
                    </div>} */}
                </div><a onClick={this.props.headleNextMonthSwitch}><i className="icon-right"></i></a>
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
                    isStay = true
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

