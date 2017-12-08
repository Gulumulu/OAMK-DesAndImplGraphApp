import React, { Component } from 'react';
import { Form, Text, TextArea } from 'react-form';

class Feedback extends Component {
    constructor(props) {
        super(props);
    }
    formSubmission(values) {
        let data = values.submittedValues;
        let mailSettings = {
            reciever: 't5kolu01@students.oamk.fi',
            sender: data.email,
            senderName: data.name
            title: data.title,
            body: data.body
        }
        console.log("Form submitted!");
        console.log(data);
    }
	  render() {
	      return(
            
		        <div className="App">
                <div className="App-header">
                    <h1 className="App-title">Feedback</h1>
                </div>
                <div className="App-content">
                    <div className="pad"></div>
                    <div className="main-scrollable">
                        <div className="main-content">
                            <Form onSubmit={submittedValues => this.formSubmission({submittedValues})}>
                                { formApi => (
                                    <form onSubmit={formApi.submitForm} id="feedback">
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name:</label>
                                            <Text field="name" className="form-control" id="name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Your E-Mail address:</label>
                                            <Text type="email" field="email" className="form-control" id="email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="title">Subject:</label>
                                            <Text field="title" className="form-control" id="title" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="body">Message:</label>
                                            <TextArea field="body" className="form-control" id="body" required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )}
                            </Form>
                        </div>
                    </div>
                    <div className="pad"></div>
                </div>
            </div>
	      );
	  }
}
export default Feedback;
