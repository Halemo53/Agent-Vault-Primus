export const TESTNET_STARTING_BALANCE = 1000;
export const TESTNET_REFILL_AMOUNT = 1000;
export const SANDBOX_TEST_AMOUNT = 1;

export type VendorSandbox = { balance: number; added: string[] };

export function createVendorSandbox(): VendorSandbox {
  return { balance: TESTNET_STARTING_BALANCE, added: [] };
}

export function fundVendorSandbox(state: VendorSandbox): VendorSandbox {
  return { ...state, balance: state.balance + TESTNET_REFILL_AMOUNT };
}

export function addSandboxVendor(state: VendorSandbox, vendorId: string): VendorSandbox {
  if (state.added.includes(vendorId) || state.balance < SANDBOX_TEST_AMOUNT) return state;
  return { balance: state.balance - SANDBOX_TEST_AMOUNT, added: [...state.added, vendorId] };
}