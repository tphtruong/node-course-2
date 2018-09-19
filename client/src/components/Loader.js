import React, { PropTypes } from 'react';
import './Loader.css';
// import loaderImg from '../assets/images/loading.png';

const Loader = ({ loading }) => {
    if (!loading) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="p13-loader">
                <i className="fa fa-spinner fa-spin" 
                    style={{"font-size":"48px"}}></i>
            </div>
        </div>
    );
};

// Loader.propTypes = {
//     loading: PropTypes.bool,
// };

export default Loader;
