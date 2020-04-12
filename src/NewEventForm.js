import React from "react"
import "./App.css"
import "./Test"
import Test from "./Test";

class NewEventForm extends React.Component {

  constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({value:event.target.value})
    }
    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }


      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div className="test">
            <label htmlFor="name">Event Name</label>
              <input type="text" id="name" value={this.state.value} onChange={this.handleChange} />
            </div>
            <div className="testtt">
              <h5>Start Date</h5>
              <Test/>
            </div>
            <div className="testtt">
              <h5>End Date</h5>
              <Test/>
            </div>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default NewEventForm