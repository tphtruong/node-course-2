import React from 'react';
import bg25 from '../assets/images/bg_poker.png';

const Blank = (props) => {
    return (
        <div className="BlankPage">
            <img src={bg25} alt="logo" />
            <div className="Info">
                <p className="App-title">You win some, you lose some.</p>
                <p>But with Xap Xam Chuong</p>
                <p>Everyone wins !!!</p>
                <p>Except for MR TRUONG</p>
            </div>
        </div>
    )
}
 

export default Blank;