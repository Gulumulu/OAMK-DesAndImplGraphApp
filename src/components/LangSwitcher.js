import React, { Component } from 'react'

class LangSwitcher extends Component {

    render() {
        return (
            <span>
                <img src={require('../' + this.props.lang + '.png')} onClick={this.props.toggleLanguage} alt=""/>
            </span>
        )
    }
}

export default LangSwitcher