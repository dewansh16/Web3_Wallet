import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Button } from "./ui/button";

interface EtherWalletProps {
  mnemonic: null | string[];
}

export function EtherWallet({ mnemonic }: EtherWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const createWallet = async () => {
    if (!mnemonic) return;
    const seed = await mnemonicToSeed(mnemonic.join(" "));
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div>
      <Button className="my-2" onClick={createWallet}>
        Add Eth wallet
      </Button>
      {addresses.map((p, ind) => (
        <div key={ind}>{p}</div>
      ))}
    </div>
  );
}
