import React from "react";

export default class Timesheet extends React.Component {
    constructor(props) {
        super(props);

        this.timeRef = React.createRef();
        this.tableRef = React.createRef();

        this.handleDrawTable = this.handleDrawTable.bind(this);
        this.handleDrawTime = this.handleDrawTime.bind(this);

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
        let ctx = this.tableRef.current.getContext("2d");
        ctx.translate(0.5, 0.5);

        ctx.strokeStyle = "#E6EAF1"; // 设置线条颜色
        ctx.lineWidth = 1; // 设置线条宽度

        // 23根横线 间隔 60 
        for (let x = 0; 24 > x; x++) {
            ctx.moveTo(0, x * 64);
            ctx.lineTo(this.state.height, x * 64);
            ctx.stroke();
        }

        // 9 个根横线 间隔 144
        for (let x = 0; 7 > x; x++) {
            ctx.moveTo((x + 1) * (this.state.width/7), 0);
            ctx.lineTo((x + 1) * (this.state.width/7), this.state.width);
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
        ctx.lineTo(timeWidth -1, height);
        ctx.stroke();

        ctx.fillStyle = "#BCBECD";
        // ctx.font = "14px 黑体";
        // 绘制时间尺
        for (let x = 0; x < 24; x++) {
            
            let t;

            if (12 > x) {
                t = t < 10 ? `0${x}AM` : `${x}AM`
            } else {
                t = `${x}PM`
            }

            ctx.fillText(t, 48, 52 + x * 64);
        }
        
    }

    componentDidMount() {
        this.handleDrawTable()
        this.handleDrawTime()
    }

    render() {
        let weekDivs = [];
        this.state.weekArr.forEach((v, i) => {weekDivs.push(<div key={i}>{v}</div>)});

        return (
            <div className="timesheet">
                <div 
                className=""
                ></div>
                <div 
                className="ruler"
                style={{
                    width: this.state.width,
                    height: "48px",
                    left: this.state.left + this.state.timeWidth
                }}
                top="0"
                >{weekDivs}</div>

                <canvas 
                className="time" 
                ref={this.timeRef}
                left="0px"
                top={this.state.top + this.state.rulerHeight}
                width="88px" 
                height={this.state.height}
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
                ></canvas>
            </div>
        )
    }
}