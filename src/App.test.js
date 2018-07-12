import React from "react";
import { mount } from "enzyme";
import NavBar from "./scenes/navbar";

// resource
// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
describe("NavBar", () => {
  let props;
  let mountedNavBar;
  const navBar = () => {
    if (!mountedNavBar) {
      mountedNavBar = mount(
        <NavBar {...props} />
      );
    }
    return mountedNavBar;
  }

  beforeEach(() => {
    props = {
      loggedIn: undefined,

    };
    mountedNavBar = undefined;
  });
  
  // Tests
  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = NavBar().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(navBar().children());
    });
  });
});