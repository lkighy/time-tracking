import React from "react";

export default class Timesheet extends React.Component {
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
            height: 1536,
            width: 1680,
            rulerHeight: 48,
            timeWidth: 88,
            top: 0,
            left: 0
        }
    }

    handleDrawTable() { // 绘制表格线条
        let width = this.state.width;
        let height = this.state.height;

        let ctx = this.tableRef.current.getContext("2d");
        ctx.translate(0.5, 0.5);

        ctx.strokeStyle = "#E6EAF1"; // 设置线条颜色
        ctx.lineWidth = 1; // 设置线条宽度

        // 23根横线 间隔 60 
        for (let x = 0; 24 > x; x++) {
            ctx.moveTo(0, 12 + x * 64);
            ctx.lineTo(width, 12 + x * 64);
            ctx.stroke();
        }

        // 7 个根竖线 间隔 144
        for (let x = 0; 7 > x; x++) {
            ctx.moveTo((x + 1) * (width / 7), 0);
            ctx.lineTo((x + 1) * (width / 7), width);
            ctx.stroke();
        }

    }

    handleDrawTime() { // 绘制时间表格
        let height = this.state.height;
        let timeWidth = this.state.timeWidth;

        let ctx = this.timeRef.current.getContext("2d");
        ctx.translate(0.5, 0.5);

        ctx.fillStyle = "#ffffff"; // 给标尺填白色,防止透明
        ctx.fillRect(0, 0, 88, height);

        ctx.strokeStyle = "#E6EAF1";
        ctx.lineWidth = 1;

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

            ctx.fillText(t, 32, 16 + x * 64);
        }

    }

    componentDidMount() {
        this.handleDrawTable()
        this.handleDrawTime()
    }

    // 鼠标移动时
    handleMouseMove(e) {
        let width = this.state.width;
        let heigth = this.state.height;

        let rulerHeight = this.state.rulerHeight;
        let timeWidth = this.state.timeWidth;
        let sheetDiv = this.sheetRef.current;

        let x = parseInt(this.state.left);
        let y = parseInt(this.state.top);


        y = y + e.movementY;
        x = x + e.movementX;

        if (x >= rulerHeight) {
            x = 0;
        } else if (x < sheetDiv.offsetWidth - width - timeWidth) {
            x = sheetDiv.offsetWidth - width - timeWidth;
        }

        if (y >= timeWidth) {
            y = 0;

        } else if (y < sheetDiv.offsetHeight - heigth - rulerHeight) {
            y = sheetDiv.offsetHeight - heigth - rulerHeight;
        }

        // target.style.top = y + "px";
        // target.style.left = x + "px";

        // timeDiv.style.top = x + timeWidth + "px";
        // rulerDiv.style.left = y + rulerHeight + "px";

        this.setState(() => ({ top: y, left: x }))
    }

    handleMouseDown(e) {
        e.target.onmousemove = this.handleMouseMove;
    }

    // 移除事件
    handleRemoveMouse(e) {
        // 遇到表格超出,可以在这里添加判断
        target.onmousemove = (e) => e.preventDefault();
    }

    render() {
        let weekDivs = [];
        this.state.weekArr.forEach((v, i) => { weekDivs.push(<div key={i}>{v}</div>) });

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
                        width: this.state.width + "px",
                        height: this.rulerHeight + "px",
                        top: "0",
                        left: this.state.left + this.state.timeWidth
                    }}
                >{weekDivs}</div>

                <canvas
                    className="time"
                    ref={this.timeRef}
                    style={{
                        top: this.state.top + this.state.rulerHeight + "px",
                        left: "0"
                    }}
                    width= {this.timeWidth}
                    height= {this.state.height}
                ></canvas>

                <canvas
                    className="table"
                    ref={this.tableRef}
                    style={{
                        top: this.state.top + this.state.rulerHeight,
                        left: this.state.left + this.state.timeWidth
                    }}
                    width={this.state.width}
                    height={this.state.height}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleRemoveMouse}
                    onMouseLeave={this.handleRemoveMouse}
                ></canvas>
            </div>
        )
    }
}