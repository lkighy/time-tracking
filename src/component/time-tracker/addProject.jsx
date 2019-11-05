import React from "react";
import "scss/addProject.scss";

export default class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flac: false
        }
    }

    render() {
        return (
            <div className="add_project">
                <div className="add_button">
                    +
                </div>
                <div className="add_form">
                    <input type="text" className="date_select" />
                    <input type="text" className="date_select_start" />
                    <span>~</span>
                    <input type="text" className="date_select_end" />
                    {/* 选择东西 */}
                    {/* <input type="text" className="content"/> */}
                    <textarea className="content" name="content" id="" cols="30" rows="10"></textarea>
                    <button className="submit">确定</button>
                    {/*选择日期/选择开始时间/选择结束时间/选择标签名称/写入内容/好了*/}
                </div>
            </div>
        )
    }
}

class InputDate extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        ""
    }
}