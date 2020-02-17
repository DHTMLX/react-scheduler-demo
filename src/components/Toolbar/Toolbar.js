import React, { Component } from 'react';
export default class Toolbar extends Component {
    handleTimeFormatStateChange = (e) => {
        if (this.props.onTimeFormatStateChange) {
            this.props.onTimeFormatStateChange(e.target.checked)
        }
    }
    render() {
        return (
            <div className='time-format-section'>
                <label className='time-format-chkbx'>
                    Time format: 
                    <input type='checkbox'
                        checked={ this.props.timeFormatState }
                        onChange={ this.handleTimeFormatStateChange }
                    />
                    <div className='chkbx-text'></div>
                </label>
            </div>
        );
    }
}
