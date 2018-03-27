import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import jsdom from "jsdom";
import { HelloWorld } from "./../../../../src/ui/components/helloWorld/helloWorld";

const doc = jsdom.jsdom(
	"<!doctype html><html><head><title></title></head><body><meta></meta></body></html>"
);
global.document = doc;
global.window = doc.defaultView;

describe("Render Root", () => {
	const wrapper = mount(<HelloWorld />);

	it("wag-root available ", () => {
		expect(wrapper.find(".one").length).to.equal(1);
	});
});
