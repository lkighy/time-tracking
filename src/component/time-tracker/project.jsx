import React from "react";


export default class Projects extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let projects = [];
        this.props.labels.forEach((lab) => {
            projects.push()
        })
        return (
            <div></div>
        )
    }
}

function Project(props) {
    return (<div className="project">
        <span className="">图标</span>
        <span>tagName</span>
        <span>content</span>
    </div>)
}