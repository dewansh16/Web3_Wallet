"use client";
import { generateMnemonic } from "bip39";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SolanaWallet } from "@/components/SolanaWallet";

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const generateMnemonic1 = async () => {
    const mn = await generateMnemonic();
    const newMnemonics = mn.split(" ");
    console.log("mn = ", newMnemonics);
    setMnemonic(newMnemonics);
    // setMnemonic(mn);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <Button onClick={generateMnemonic1} disabled={!!mnemonic}>
        Generate Mnemonic
      </Button>
      <div className=" w-full">
        <Accordion className="w-1/3 m-auto" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Mnemonic</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap w-full">
                {mnemonic?.map((item) => {
                  return (
                    <div className="w-1/3 flex items-center justify-center p-3 border-2 hover:bg-slate-400">
                      {item}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SolanaWallet mnemonic={mnemonic} />
      </div>
    </main>
  );
}
