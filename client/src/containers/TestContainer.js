import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const MyComponent = () => {
    return (
        <div>child component</div>
    )
}

class GameContainer extends React.Component {
    onTaskStart = (payload) => {
        this.props.dispatch('TASK_START', payload);
    }
    onTaskEnd = (payload) => {
        this.props.dispatch('TASK_END', payload);
    }
    render() {
        return (
            <MyComponent
                onTaskStart={this.onTaskStart}
                onTaskEnd={this.onTaskEnd}
            />
        )
    }
}

function mapStateToProps(state){
    return {
        players : state.players
    }
}

export default connect(mapStateToProps,actions)(GameContainer);