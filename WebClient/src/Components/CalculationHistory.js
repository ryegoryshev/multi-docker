import React, { Component } from "react";

class CalculationHistory extends Component {

  render() {
    if (!this.props.records) {
      return "Loading data...";
    } else {
      return (
        <ul>
          {this.props.records.map((record, i) => {
            const recordText = `${record.firstValue} * ${record.secondValue} = ${record.result}`;
            return <li key={i}>{recordText}</li>;
          })}
        </ul>
      );
    }
  }
}

export default CalculationHistory;
