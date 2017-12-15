import React, { Component } from 'react';
import Header from './components/Header';

class Layout extends Component {
    render() {
        return (
            <div className="Layout">
                <Header />
                {this.props.children}
            </div>
        );
    }
}
export default Layout;
