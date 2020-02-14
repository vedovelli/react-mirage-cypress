import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    list: [],
    errorMessage: ""
  };

  componentDidMount() {
    this.setState({ message: "" });
    axios
      .get("/api/users")
      .then(res => {
        this.setState({ list: res.data.users });
      })
      .catch(error =>
        this.setState({ errorMessage: error.response.data.error })
      );
  }
  render() {
    const { errorMessage, list } = this.state;
    return (
      <div>
        <h1>Test</h1>
        {errorMessage !== "" && <h1>{errorMessage}</h1>}
        {errorMessage === "" &&
          list.map(user => (
            <p data-testid="user" key={user.id}>
              {user.name}
            </p>
          ))}
      </div>
    );
  }
}

export default App;
