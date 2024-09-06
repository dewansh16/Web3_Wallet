import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKeyData } from "@solana/web3.js";
import nacl from "tweetnacl";

interface SolanaWalletProps {
  mnemonic: null | string[];
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  const createWallet = async () => {
    if (!mnemonic) return;
    const seed = await mnemonicToSeed(mnemonic.join(" "));
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
  };

  return (
    <div>
      <button onClick={createWallet}>Add wallet</button>
      {publicKeys.map((p, ind) => (
        <div key={ind}>{p}</div>
      ))}
    </div>
  );
}
