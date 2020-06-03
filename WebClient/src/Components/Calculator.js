import React, { Component } from "react";

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstValue: 2,
      secondValue: 2,
      result: 4,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstValueChange = this.handleFirstValueChange.bind(this);
    this.handleSecondValueChange = this.handleSecondValueChange.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const result = this.state.firstValue * this.state.secondValue;
    this.setState({ result: result });

    const calculation = {
      firstValue: this.state.firstValue,
      secondValue: this.state.secondValue,
      result: result,
    };

    this.props["OnCalculated"](calculation);
  };

  handleFirstValueChange = (event) => {
    this.setState({ firstValue: event.target.value });
  };

  handleSecondValueChange = (event) => {
    this.setState({ secondValue: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter first value:</label>
          <input
            type="text"
            value={this.state.firstValue}
            onChange={this.handleFirstValueChange}
          ></input>
          <label> Enter second value:</label>
          <input
            type="text"
            value={this.state.secondValue}
            onChange={this.handleSecondValueChange}
          ></input>
          <input type="submit" value="Calculate" />
          <br />
          <label>Result: {this.state.result}</label>
        </form>
      </div>
    );
  }
}

export default Calculator;
