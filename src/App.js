import React, { Component } from "react";

class App extends Component {
  state = {
    list: []
  };

  componentDidMount() {
    fetch("users")
      .then(res => res.json())
      .then(data => {
        this.setState({ list: data.users });
      });
  }
  render() {
    return (
      <div>
        <h1>Test</h1>
        {this.state.list.map(user => (
          <p data-testid="user" key={user.id}>
            {user.name}
          </p>
        ))}
      </div>
    );
  }
}

export default App;
