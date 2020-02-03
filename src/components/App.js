import React, { Component } from "react";
import "./App.css";
import Result from "./Result";
import Form from "./Form";
class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temperature: "",
    presure: "",
    wind: "",
    err: false
  };
  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 1) return;

    if (prevState.value !== this.state.value) {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=930abecef9db495d58e58eb9af3e4e2f&units=metric`;
      fetch(api)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error("nie udało się");
        })
        .then(response => response.json())
        .then(result => {
          const time = new Date().toLocaleString();
          this.setState(state => ({
            date: time,
            city: state.value,
            sunrise: result.sys.sunrise,
            sunset: result.sys.sunset,
            temperature: result.main.temp.toFixed(0),
            pressure: result.main.pressure,
            wind: result.wind.speed,
            err: false
          }));
        })

        .catch(err => {
          console.log(err);
          this.setState(prevState => ({
            err: true,
            city: prevState.value
          }));
        });
    }
  }

  // handleCitySubmit = e => {
  //   e.preventDefault();
  //   const api = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=930abecef9db495d58e58eb9af3e4e2f&units=metric`;
  //   fetch(api)
  //     .then(response => {
  //       if (response.ok) {
  //         return response;
  //       }
  //       throw Error("nie udało się");
  //     })
  //     .then(response => response.json())
  //     .then(result => {
  //       const time = new Date().toLocaleString();
  //       this.setState(prevState => ({
  //         date: time,
  //         city: prevState.value,
  //         sunrise: result.sys.sunrise,
  //         sunset: result.sys.sunset,
  //         temperature: result.main.temp.toFixed(0),
  //         pressure: result.main.pressure,
  //         wind: result.wind.speed
  //       }));
  //     })

  //     .catch(err => {
  //       console.log(err);
  //       this.setState(prevState => ({
  //         err: true,
  //         city: prevState.value
  //       }));
  //     });
  // };
  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          error={this.state.err}
          change={this.handleInputChange}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
