import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

class Header extends Component {
    render() {
        
        let strings = new LocalizedStrings({
			fi:{
                home:"Koti",
                feedback:"Palaute"
			},
			en:{
                home:"Home",
                feedback:"Feedback"
			}
        });
        
		strings.setLanguage(reactLocalStorage.get('lang', 'fi'));
        
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">{strings.home}</Link></li>
                        <li><Link to="/feedback">{strings.feedback}</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Header;
