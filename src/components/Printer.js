import React, { Component } from 'react';


class Printer extends Component {
    constructor(props) {
        super(props);
        
    }
    
    handleClick() {
        window.print();
    }
    
    render() {
        return (
            <button className={this.props.className} onClick={() => this.handleClick()}>{this.props.children}</button>
        )
    }
}
export default Printer;
