import React from "react";
// no default export, so we're importing everyting from this library
import * as rtl from "@testing-library/react";
// not importing to a variable, since this just overrides jest global variables
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import axios from 'axios';

jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve({
      data: {
        message: ["foo.jpg","bar.jpg"]
      }
    }))
  }
});

test("clear images", async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);

  const clearElem = wrapper.getByText(/clear/i);

  rtl.act(()=>{
    rtl.fireEvent.click(clearElem);
  });

  expect(wrapper.queryByAltText(/dog/i)).toBeNull();
})

test('made an api call', async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);
  expect(axios.get).toHaveBeenCalled(); 
})

test("render of dog img", async () => {
  const wrapper = rtl.render(<App />);
  const dogImgs = await wrapper.findAllByAltText(/dog/i);
  expect(dogImgs[0]).toBeVisible();
});

test("Render the heading", async () => {
  // render our React app into an in-memory DOM so we can test against it
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);

  // element is now our dom element that we can test against
  const element = wrapper.getByText(/the dog website/i);

  // test will fail if element is not visible to our robot eyes
  expect(element).toBeVisible();
});

test("Render count input", async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByAltText(/dog/i);

  // using a regular expression instead of a string allows our
  // query to be much more flexible. for example, if the text becomes
  // all uppercase, we don't want our test to break
  const element = wrapper.getByPlaceholderText(/count/i);
  expect(element).toHaveValue(1);
});
