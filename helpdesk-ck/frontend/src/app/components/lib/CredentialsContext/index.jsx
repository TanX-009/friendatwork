"use client";
import React, { Component, createContext } from "react";

const CredContext = createContext();

class CredentialsContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
    };
  }
  render() {
    const { children } = this.props;
    return (
      <CredContext.Provider
        value={{
          context: this.state,
          setContext: (value, callback = null) => {
            if (callback) {
              this.setState(value, callback);
            } else this.setState(value);
          },
          updateContext: (value, callback = null) => {
            if (callback) {
              this.setState({ ...this.state, ...value }, callback);
            } else this.setState({ ...this.state, ...value });
          },
        }}
      >
        {children}
      </CredContext.Provider>
    );
  }
}

export { CredContext };
export default CredentialsContext;
