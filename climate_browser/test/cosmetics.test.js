/* eslint-disable import/extensions */
import { describe, it } from "mocha";
import { assert } from "chai";
import { getNumberWithSign } from "../src/utils/cosmetics.js";

describe("Converting numeric value to string", () => {
  it("Takes 5 as input and returns +5 as string", () => {
    assert.equal(getNumberWithSign(5), "+5");
  });

  it("Takes -1 as input and returns -1 as string", () => {
    assert.equal(getNumberWithSign(-1), "-1");
  });

  it("Takes 0 as input and returns 0 as string", () => {
    assert.equal(getNumberWithSign(0), "0");
  });
});
