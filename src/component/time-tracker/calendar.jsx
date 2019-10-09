import React from "react";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.handleDays = this.handleDays.bind(this);
        this.headleLastMonthSwitch = this.headleLastMonthSwitch.bind(this);
        this.headleNextMonthSwitch = this.headleNextMonthSwitch.bind(this);

        this.state = {
            monthArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            toYear: 0,
            toMonth: 0,
            today: 0,
            year: 0,
            month: 0,
            date: 0,
            inDays: {
                days: [],
                daysNum: 0,
                fromDay: 0,
            },
        }
    }

    componentDidMount() { // 挂载
        let date = new Date();
        this.setState({
            toYear: date.getFullYear(),
            toMonth: date.getMonth(),
            today: date.getDate(),
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
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
        this.setState({
            month,
            year
        })
        this.handleDays(year, month);
    }

    headleNextMonthSwitch() { // 换到下个月
        let month = this.state.month < 11 ? this.state.month + 1 : 0;
        let year = this.state.month < 11 ? this.state.year : this.state.year + 1;
        this.setState({
            month,
            year
        })
        this.handleDays(year, month);

    }

    render() {
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
                    toYear={this.state.toYear}
                    toMonth={this.state.toMonth}
                    today={this.state.today}
                    year={this.state.year}
                    month={this.state.month}
                    date={this.state.date}
                    inDays={this.state.inDays}
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
    }

    render() {
        let month = this.props.month;
        let year = this.props.year;

        let thisMonth = year + "," + month;
        let lastMonth = month > 0 ? year + "," + (month - 1) : (year - 1) + "," + 11;
        let nextMonth = month < 11 ? year + "," + (month + 1) : (year + 1) + "," + 1;

        let days = [];
        for (let i = 0; i < parseInt(this.props.inDays.days.length / 7); i++) {
            let pack = [];
            let isStay = false;
            let data;
            for (let j = i * 7; j < i * 7 + 7; j++) {
                let day = this.props.inDays.days[j];
                let today = this.props.toYear + "," + this.props.toMonth + "," + this.props.today;
                let key;
                let style;

                if (j < this.props.inDays.fromDay) {
                    key = lastMonth + "," + day
                    isStay = isStay || (key == today)
                    style = "no-this "+ (key == today ? "current" : "");
                } else if (j > this.props.inDays.fromDay + this.props.inDays.daysNum - 1) {
                    key = nextMonth + "," + day
                    isStay = isStay || (key == today)
                    style = "no-this "+ (key == today ? "current" : "");
                } else {
                    key = thisMonth + "," + day
                    isStay = isStay || (key == today)
                    style = key == today ? "current" : "";
                }

                data = <div 
                key={key}
                date-date={key}
                className={style}
                >{day}</div>

                pack.push(data);
            }
            let stay = (isStay ? "stay" : "");
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

