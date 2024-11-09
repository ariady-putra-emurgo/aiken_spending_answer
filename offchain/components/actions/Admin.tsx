import { useState } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

import { Action } from "@/types/action";

export default function Admin(props: { onDeposit: Action; onWithdraw: Action }) {
  const { onDeposit, onWithdraw } = props;

  function DepositButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [lovelace, setLovelace] = useState(0n);
    const [beneficiaryAddress, setBeneficiaryAddress] = useState(""); // addr_...

    return (
      <>
        <Button onPress={onOpen} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" radius="full">
          Deposit
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Deposit</ModalHeader>
                <ModalBody>
                  <Input
                    type="number"
                    label="Quantity"
                    placeholder="0.000000"
                    variant="bordered"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">ADA</span>
                      </div>
                    }
                    onValueChange={(value: string) => setLovelace(BigInt(parseFloat(value) * 1_000000))}
                  />
                  <Input label="Beneficiary" placeholder="addr_..." variant="bordered" onValueChange={setBeneficiaryAddress} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => onDeposit({ lovelace, beneficiaryAddress }).then(onClose)}
                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                    radius="full"
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }

  function WithdrawButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [validatorAddress, setValidatorAddress] = useState(""); // addr_...

    return (
      <>
        <Button onPress={onOpen} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" radius="full">
          Withdraw
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Withdraw</ModalHeader>
                <ModalBody>
                  <Input label="Contract Address" placeholder="addr_..." variant="bordered" onValueChange={setValidatorAddress} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => onWithdraw(validatorAddress).then(onClose)}
                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                    radius="full"
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <DepositButton />
      <WithdrawButton />
    </div>
  );
}
