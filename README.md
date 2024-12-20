# aiken_spending_answer

This project answers the:

- `admin` spending validator
- `cip_68` validator

Install `pnpm` if you have not by running `npm i -g pnpm`, and then go to [`offchain`](./offchain):

- Run `pnpm i` if you have never run the `offchain`
- Run `pnpm dev` to run the `offchain`

Open http://localhost:3000

## `admin` Spending Validator

When there's no datum, the validator will allow spending if the `Transaction` is signed by the `pkh` as specified in the script param;
otherwise the `Transaction` must be signed by the datum's provided `VerificationKeyHash`.

```gleam
let signer = datum |> option.or_else(pkh)
list.has(tx.extra_signatories, signer)?
```

## `cip_68` Validator

Added [`insufficient-staking-control`](https://library.mlabs.city/common-plutus-security-vulnerabilities#11.insufficientstakingkeycontrol) vulnerability prevention during token minting by enforcing the `ref_token` to be sent to self address with no staking part;
and during metadata updating, the `ref_token` must be resent to the same address.

```gleam
/// During minting:
mint(..) {
  ..
  pub fn must_send_ref_token_to_self_script(..) {
    ..
    // output self address must not have a stake credential
    expect None = ref_token_utxo.address.stake_credential
    ..
  }
  ..
}

/// During updating:
spend(..) {
  ..
  output.address == input.output.address
  ..
}
```
