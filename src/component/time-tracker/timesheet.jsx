import React from "react";

import { StateContext } from "context/time_context";

export default class Timesheet extends React.Component {
    static contextType = StateContext;
    constructor(props) {
        super(props);

        this.rulerRef = React.createRef();
        this.timeRef = React.createRef();
        this.tableRef = React.createRef();
        this.sheetRef = React.createRef();

        this.handleDrawTable = this.handleDrawTable.bind(this);
        this.handleDrawTime = this.handleDrawTime.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleRemoveMouse = this.handleRemoveMouse.bind(this);

        this.state = {
            weekArr: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            height: 1440,
            width: 1680,
            rulerHeight: 48,
            timeWidth: 88,
            top: 0,
            left: 0
        }
    }

    handleDrawTable() { // 绘制表格线条
        let size = this.context.size;

        let width = size.width;
        let height = size.height;
        let topSpace = size.height / 24;
        let leftSpace = size.width / 7;

        let ctx = this.tableRef.current.getContext("2d");
        ctx.translate(-0.5, -0.5);

        ctx.strokeStyle = "#E6EAF1"; // 设置线条颜色
        ctx.lineWidth = 1; // 设置线条宽度

        // 23根横线 间隔 60 
        for (let x = 0; 24 > x; x++) {
            ctx.moveTo(0, x * topSpace);
            ctx.lineTo(width, x * topSpace);
            ctx.stroke();
        }

        // 7 个根竖线 间隔 144
        for (let x = 0; 8 > x; x++) {
            ctx.moveTo(x * leftSpace, 0);
            ctx.lineTo(x * leftSpace, height);
            ctx.stroke();
        }

    }

    handleDrawTime() { // 绘制时间表格
        let size = this.context.size;

        let height = size.height;
        let topSpace = size.height / 24;

        let timeWidth = size.offsetX;

        let ctx = this.timeRef.current.getContext("2d");
        ctx.translate(-0.5, -0.5);

        ctx.fillStyle = "#ffffff"; // 给标尺填白色,防止透明
        ctx.fillRect(0, 0, 88, height);

        ctx.moveTo(timeWidth + 1, 0);
        ctx.lineTo(timeWidth + 1, height);
        ctx.stroke();

        ctx.strokeStyle = "#E6EAF1";
        ctx.lineWidth = 1;

        ctx.strokeStyle = "#E6EAF1"; // 设置线条颜色
        ctx.moveTo(timeWidth - 1, 0);
        ctx.lineTo(timeWidth - 1, height);
        ctx.stroke();

        ctx.fillStyle = "#BCBECD";
        ctx.font = "12px Arial";
        // 绘制时间尺
        for (let x = 0; x < 24; x++) {

            let t;

            if (12 > x) {
                t = x < 10 ? `  ${x} AM` : `${x} AM`
            } else {
                t = `${x} PM`
            }

            ctx.fillText(t, 32, 6 + x * topSpace);
        }

    }

    componentDidMount() {
        this.handleDrawTable()
        this.handleDrawTime()
    }

    // 鼠标移动时
    handleMouseMove(e) {
        const size = this.context.size;
        const position = this.context.position;

        let width = size.width;
        let height = size.height;

        let rulerHeight = size.offsetY;
        let timeWidth = size.offsetX;
        let sheetDiv = this.sheetRef.current;

        let x = parseInt(position.left);
        let y = parseInt(position.top);


        y = y + e.movementY;
        x = x + e.movementX;

        if (x > 0) {
            x = 0;
        } else if (x < sheetDiv.offsetWidth - width - timeWidth) {
            x = sheetDiv.offsetWidth - width - timeWidth;
        }

        if (y > 0) {
            y = 0;

        } else if (y < sheetDiv.offsetHeight - height - rulerHeight) {
            y = sheetDiv.offsetHeight - height - rulerHeight;
        }

        // let offsetX = sheetDiv.offsetWidth - width - timeWidth;
        // x = x > 0 ? 0 : (y < offsetX ? offsetX : x);

        // let offsetY = sheetDiv.offsetHeight - height - rulerHeight;
        // y = y > 0 ? 0 : (y < offsetY ? offsetY : y);

        this.context.handlePosition(x, y);
    }

    handleMouseDown(e) {
        e.target.onmousemove = this.handleMouseMove;
    }

    // 移除事件
    handleRemoveMouse(e) {
        // 遇到表格超出,可以在这里添加判断
        let target = this.tableRef.current;
        target.onmousemove = (e) => e.preventDefault();

    }

    render() {
        let size = this.context.size;
        let position = this.context.position;
        let weekDivs = [];
        let width = size.width;
        let height = size.height;
        let offsetX = size.offsetX;
        let offsetY = size.offsetY;
        let left = position.left;
        let top = position.top;
        let labels = this.context.labels;

        this.context.weekArr.forEach((v, i) => { weekDivs.push(<div key={i}>{v}</div>) });

        return (
            <div
                ref={this.sheetRef}
                className="timesheet">
                <div
                    className=""
                ></div>
                <div
                    className="ruler"
                    ref={this.rulerRef}
                    style={{
                        width: width + "px",
                        height: offsetY + "px",
                        top: "0",
                        left: left + offsetX
                    }}
                >{weekDivs}</div>

                <canvas
                    className="time"
                    ref={this.timeRef}
                    style={{
                        top: top + offsetY + "px",
                        left: "0"
                    }}
                    width={offsetX}
                    height={height}
                ></canvas>

                <canvas
                    className="table"
                    ref={this.tableRef}
                    style={{
                        top: top + offsetY,
                        left: left + offsetX
                    }}
                    width={width}
                    height={height}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleRemoveMouse}
                    onMouseLeave={this.handleRemoveMouse}
                ></canvas>
                <Labels
                    labels={labels}
                    width={width}
                    height={height}
                    top={top + offsetY}
                    left={left + offsetX}
                />
            </div>
        )
    }
}


// class AddProject extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {}
// }


class Labels extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let labels = [];
        this.props.labels.forEach((lab) => {
            labels.push(<Label
                height={this.props.height}
                width={this.props.width}
                key={lab.id}
                {...lab}
            />)
        })

        let top = this.props.top;
        let left = this.props.left;
        return (
            <div
                className="labels"
                style={{
                    top,
                    left
                }}
            >
                {labels}
            </div>
        )
    }
}


class Label extends React.Component {
    constructor(props) {
        super(props);

        this.handlePosition = this.handlePosition.bind(this);

        this.state = {
            width: 0,
            height: 0,
            top: 0,
            left: 0
        }
    }

    handlePosition() {
        let parentWidth = this.props.width;
        let parentHeight = this.props.height;

        let date = this.props.date;
        let startTime = this.props.startTime;
        let endTime = this.props.endTime;

        let time = new Date(date);
        let week = time.getDay();

        // 计算 left
        let left = week * parseInt(parentWidth) / 7;

        // 计算宽高
        let [startHour, startMinutes] = startTime.split(":");
        let [endHour, endMinutes] = endTime.split(":");

        let scale = parentHeight / 24 / 60;

        let top = scale * (startHour * 60 + parseInt(startMinutes)); // 起始高度
        let height = scale * ((endHour - startHour) * 60 + parseInt(endMinutes)); // 终止高度

        // let startTop = (startHour * scale); // 每分钟移动的高度
        // startTop = startTop + parseInt(startMinutes);
        // let endHeight = endHour * scale;
        // endHeight = endHeight + parseInt(endMinutes);

        // // let top = startTop * scale;
        // let height = endHeight - startTop;
        let width = parseInt(parentWidth) / 7 - 8;

        this.setState({ width, height, top, left });
    }

    componentDidMount() {
        this.handlePosition()
    }

    render() {
        let top = this.state.top;
        let left = this.state.left;
        let width = this.state.width;
        let height = this.state.height;
        let backgroundColor = this.props.backgroundColor;
        let color = this.props.color;
        let date = this.props.date;
        let startTime = this.props.startTime;
        let content = this.props.content;
        let labelName = this.props.labelName;

        return (
            <div
                className="label"
                height={height}
                style={{
                    backgroundColor,
                    color,
                    width: width + "px",
                    top: top + "px",
                    left: left + 4 + "px",
                    height: height + "px",
                }}
            >
                <div className="top">
                    <div className="time"
                        data-date={date}
                    >{startTime}</div>
                    <div className="tag">{labelName}</div>
                </div>
                <div className="content">{content}</div>
            </div>
        )
    }

}