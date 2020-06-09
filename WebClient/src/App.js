import React, { Component } from "react";
import axios from "axios";
import Configuration from "./config"

import "./App.css";

import Calculator from "./Components/Calculator";
import CalculationHistory from "./Components/CalculationHistory";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {history: null};

    this.handleCalculated = this.handleCalculated.bind(this);
  }

  async handleCalculated(calculation) {
    await this.saveCalculation(calculation);

    const history = await this.fetchCalculationHistory();
    this.setState({history: history.data});
  }

  async fetchCalculationHistory() {
    const url = `http://${Configuration.API_HOST}:${Configuration.API_PORT}/Calculations`;
    console.log("Get calculation history URL:" + url);
    const history = await axios.get(url);
    return history;
  }

  async saveCalculation(calculation) {
   const result = await axios.post(`http://${Configuration.API_HOST}:${Configuration.API_PORT}/Calculations`, {
      firstValue: calculation.firstValue, 
      secondValue: calculation.secondValue
    });
    console.log(result);
  }

  async componentDidMount() {
    const history = await this.fetchCalculationHistory();
    this.setState({history: history.data});
  }

  render() {
    return (
      <div>
        <h1>Calculator</h1>
        <Calculator OnCalculated={this.handleCalculated} />
        <h1>Calculation History</h1>
        <CalculationHistory records={this.state.history} />
      </div>);
  }
}

export default App;
