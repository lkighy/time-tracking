import Timetracker from "./timetracker.jsx";
import React from "react";
import { state } from "context/time_context";


export default class App extends React.Component {
    // static contextType = StateContext;
    constructor(props) {
        super(props);

        this.handlePosition = this.handlePosition.bind(this);
        this.handleDate = this.handleDate.bind(this);

        this.state = state;
    }

    handlePosition(x, y) {
        this.setState(() => ({
            position: { left: x, top: y }
        }))
    }

    handleDate(obj) {
        this.setState({
            date: obj
        })
    }

    render() {
        return (
            <Timetracker
                size={this.state.size}
                date={this.state.date}
                colors={this.state.colors}
                labels={this.state.labels}
                weekArr={this.state.weekArr}
                position={this.state.position}

                handleDate={this.handleDate}
                handlePositionX={this.handlePositionX}
                handlePositionY={this.handlePositionY}
                handlePosition={this.handlePosition}
            />
        )
    }

}


