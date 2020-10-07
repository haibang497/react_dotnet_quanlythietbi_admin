import React, { Component } from "react";

import "./custom.css";
import { DonVi } from "./components/DonViComponent";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
    <>
        <DonVi/>
    </>
    );
  }
}
