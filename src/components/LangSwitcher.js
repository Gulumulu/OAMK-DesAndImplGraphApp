import React, { Component } from 'react'

class LangSwitcher extends Component {

    render() {
        return (
            <div>
                <img src={require('../' + this.props.lang + '.png')} onClick={this.props.toggleLanguage}/>
            </div>
        )
    }
}

export default LangSwitcher