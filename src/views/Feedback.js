import React, { Component } from 'react';
import { Form, Text, TextArea } from 'react-form';
import { reactLocalStorage } from 'reactjs-localstorage';
import LocalizedStrings from 'react-localization';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit(values, info_string, error_string) {
        let data = values;
        this.setState({type: 'info', message: info_string}, this.sendMessage(data, error_string));
    }
    sendMessage(data, error_string) {
        data.body = encodeURI(data.body);
        data.title = encodeURI(data.title);
        console.log(data);
        let date = new Date();
        let name = (data.name) ? data.name : 'anonymous';
        let header = 'From: ' + name + ' <' + data.email + "> \r\n" +
                     'Reply-To: ' + data.email + "\r\n" +
                     'Date: ' + date ;
        // Virtual delay to for what would happens.
        let mailto = "mailto:metsamittari@luke.fi?subject=" + data.title + "&body=" + data.body;
        const _this = this;
        var odotus = setTimeout(function(data) {
            // For now open up a email-client with the required data.
            //window.location.href = mailto;
            console.log(header);
            _this.setState({type: 'danger', message: error_string});
        }, 2000)
    }

    
	  render() {
        let strings = new LocalizedStrings({
            fi: {
                feedback: "Palaute",
                name: "Nimesi",
                email: "Sähköposti",
                title: "Aihe",
                body: "Viesti",
                submit: "Lähetä",
                info: "Lähetetään palautetta...",
                error: "VIRHE! Tätä ominaisuus ei ole vielä valmis! Lähetä viesti suoraan osoitteeseen: metsamittari@luke.fi"
            },
            en: {
                feedback: "Feedback",
                name: "Your name",
                email: "Your E-Mail address",
                title: "Subject",
                body: "Message",
                submit: "Submit",
                info: "Submitting feedback...",
                error: "ERROR! This feature is not yet finished! Send your message straight to this address: metsamittari@luke.fi"
            }
        });
        strings.setLanguage(reactLocalStorage.get('lang', 'fi'));
        
        if (this.state.type && this.state.message) {
            var classString = 'alert alert-' + this.state.type;
            var status = <div id="status" className={classString} ref="status">{this.state.message}</div>
        }
	      return(
		        <div className="App">
                <div className="App-header">
                    <h1 className="App-title">{strings.feedback}</h1>
                </div>
                <div className="App-content">
                    <div className="pad"></div>
                    <div className="main-scrollable">
                        <div className="main-content">
                            {status}
                            <Form onSubmit={submittedValues => this.handleSubmit(submittedValues, strings.info, strings.error)}>
                                { formApi => (
                                    <form onSubmit={formApi.submitForm} id="feedback">
                                        <div className="form-group">
                                            <label htmlFor="name">{strings.name}:</label>
                                            <Text field="name" className="form-control" id="name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">{strings.email}:</label>
                                            <Text type="email" field="email" className="form-control" id="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="title">{strings.title}:</label>
                                            <Text field="title" className="form-control" id="title" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="body">{strings.body}:</label>
                                            <TextArea field="body" className="form-control vresize" id="body" required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">{strings.submit}</button>
                                    </form>
                                )}
                            </Form>
                            <span className="mailto-link">E-mail: <a href="mailto:metsamittari@luke.fi">metsamittari@luke.fi</a></span>
                        </div>
                    </div>
                    <div className="pad"></div>
                </div>
            </div>
	      );
	  }
}
export default Feedback;
