import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayersList extends React.Component {
    
    renderPlayersList() {
        //const { instructions, properties } = this.props.playersReducer;
        //return <div>testing</div>;
        var rows = []
        for (var e in this.props.playersReducer){
            console.log('test', this.props.playersReducer[e].name)
            rows.push (
                <div key={e} className="card border-primary text-center bg-light mb-2" >
                    <h3 className="card-header">{this.props.playersReducer[e].name}</h3>
                    <div className="card-body">
                        <h5 className="card-title center">{this.props.playersReducer[e].total}</h5>         
                    </div>
                    <div className="card-footer">
                        <input type="text" value="0" className="form-control text-center"/>
                    </div>         
                </div>              
            );
        }
        rows.push (
            <div key={e} className="card border-primary text-center bg-light mb-2 summary" >
                <h3 className="card-header">Total</h3>
                <div className="card-body">
                    <h5 className="card-title center"></h5>         
                </div>              
                <div className="card-footer">
                    <input type="text" value="0" className="form-control text-center" />
                </div>         
            </div> 
        )          
        return rows;
    }

    render() {
        console.log('headerxxxs',this.props.playersReducer);
        if (!this.props.playersReducer) {
            return null;
        }
        return (
            <div className="card-group">
                {this.renderPlayersList()}
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        playersReducer : state.playersReducer
    }
}

export default connect(mapStateToProps)(PlayersList);