import React from 'react';
import { List } from 'immutable';

const renderHistoryList = (historyList) => {
    var count = historyList.length;
    var coll = historyList.map( (history) => {
        return (
            <li key={history._id} className="list-group-item d-flex justify-content-between align-items-center">
                {history.name}<span className="badge badge-primary badge-pill">{history.total}</span>
            </li>
        )
    })
    console.log('coll',coll);   
    return coll;
}

const HistoryList = (props) => {
    console.log('history-component', props.history);

    // if (props.history)
    //     renderHistoryList(props.history);

    return (

        <div className="card-group">
            <h1>History</h1>

            <ul className="list-group direction-row">
                {props.history && renderHistoryList(props.history)}
                {/* <li className="list-group-item d-flex justify-content-between align-items-center">
                    Hoa<span className="badge badge-primary badge-pill">14</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Hoa<span className="badge badge-primary badge-pill">2</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Hoa<span className="badge badge-primary badge-pill">2</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Hoa<span className="badge badge-primary badge-pill">2</span>
                </li>        */}
            </ul>

        </div> 
    )
}

export default HistoryList;