/** (c) Walgreen Co. All rights reserved.**/
import React, { Component } from "react";
import { HelloWorld } from "./../helloWorld/hellowWorld";

export default class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <HelloWorld />;
	}
}
