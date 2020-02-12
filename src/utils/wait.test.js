import wait from './wait';

// this doesn't work! (wait() returns a promise, not the resolved value)
// test("wait for promise to resolve", () => {
//   const result = wait(2);
//   expect(res).toBe("bogus");
// });

// NOT THE RIGHT WAY!!!!!
// test("wait for promise to resolve", () => {
//   wait(2).then(res => expect(res).toBe("bogus"));
// });

// the done way
// test("wait for promise to resolve", (done) => {
//   wait(2).then(res => {
//     expect(res).toBe("hurray");
//     done();
//   });
// });

// the returned unresolved Promise way
// test("wait for promise to resolve", () => {
//   return wait(3).then(res => expect(res).toBe("hurray"));
// });

jest.useFakeTimers();

// the better returned unresolved Promise way
test("wait for promise to resolve", async () => {
   const spy = jest.fn();

   const waitFn = wait(30, spy);

   jest.runAllTimers();

   const res = await waitFn;

   expect(res).toBe("hurray");

   expect(spy).toHaveBeenCalledWith("hurray");
   expect(spy).toHaveBeenCalledTimes(1);
});