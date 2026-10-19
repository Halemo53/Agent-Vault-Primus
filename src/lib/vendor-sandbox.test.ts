import { describe, expect, it } from "vitest";
import { addSandboxVendor, createVendorSandbox, fundVendorSandbox } from "./vendor-sandbox";

describe("Vendor sandbox balance", () => {
  it("starts with 1000 mock USDC without a wallet", () => {
    expect(createVendorSandbox().balance).toBe(1000);
  });
  it("deducts one test USDC when adding a demo vendor", () => {
    const next = addSandboxVendor(createVendorSandbox(), "coingecko");
    expect(next.balance).toBe(999);
    expect(next.added).toEqual(["coingecko"]);
  });
  it("adds 1000 USDC on each refill with no refill limit", () => {
    let state = createVendorSandbox();
    for (let i = 0; i < 100; i++) state = fundVendorSandbox(state);
    expect(state.balance).toBe(101000);
  });
  it("does not charge again for an already added vendor", () => {
    const state = addSandboxVendor(createVendorSandbox(), "infura");
    expect(addSandboxVendor(state, "infura").balance).toBe(999);
  });
  it("does not allow a negative mock balance", () => {
    const state = { balance: 0, added: [] };
    expect(addSandboxVendor(state, "coingecko")).toEqual(state);
  });
});