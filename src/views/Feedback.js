import React, { Component } from 'react';
import { Form, Text, TextArea } from 'react-form';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit(values) {
        let data = values.submittedValues;
        this.setState({type: 'info', message: 'Sending...'}, this.sendMessage(data));
    }
    sendMessage(data) {
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
            window.location.href = mailto;
            console.log(header);
            _this.setState({type: 'success', message: 'Email "sent"(not really!)'});
        }, 2000)
    }

    
	  render() {
        if (this.state.type && this.state.message) {
            var classString = 'alert alert-' + this.state.type;
            var status = <div id="status" className={classString} ref="status">{this.state.message}</div>
        }
	      return(
		        <div className="App">
                <div className="App-header">
                    <h1 className="App-title">Feedback</h1>
                </div>
                <div className="App-content">
                    <div className="pad"></div>
                    <div className="main-scrollable">
                        <div className="main-content">
                            {status}
                            <Form onSubmit={submittedValues => this.handleSubmit({submittedValues})}>
                                { formApi => (
                                    <form onSubmit={formApi.submitForm} id="feedback">
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name:</label>
                                            <Text field="name" className="form-control" id="name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Your E-Mail address:</label>
                                            <Text type="email" field="email" className="form-control" id="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="title">Subject:</label>
                                            <Text field="title" className="form-control" id="title" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="body">Message:</label>
                                            <TextArea field="body" className="form-control vresize" id="body" required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
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
