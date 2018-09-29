import React from 'react';
import PropTypes from 'prop-types'

const AddMessage = (props) => {
    let input
    const onKeyPressEnter = (e) => {
        if (e.key === 'Enter') {
            props.dispatch(input.value, 'Me') //When the enter key is pressed,
            input.value = ''  //we dispatch the addMessage action, passing the value of the input field.
        }
    }
     
    return (
        <section id="new-message">
            <input
                onKeyPress={onKeyPressEnter}
                type="text"
                ref={(node) => {
                    input = node
                }}
            />
        </section>
    )
}

AddMessage.propTypes = {
    dispatch: PropTypes.func.isRequired
  }

export default AddMessage;