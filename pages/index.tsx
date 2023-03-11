import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useProgram, useClaimNFT, useClaimConditions, useProgramMetadata } from "@thirdweb-dev/react/solana"
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Home: NextPage = () => {
  const { program } = useProgram("3jEe21Jux9ULqCAK7o8VPkFEA3wiyMu3uJvyX3ur5oTs", "nft-drop")
  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);
  const {data: conditions, isLoading: conditionsIsLoading} = useClaimConditions(program);
  const {data: metadata, isLoading: metadataIsLoading} = useProgramMetadata(program);
  
  console.log(metadata);
  console.log(conditions);
  
  
  return (
    
    <>
      <div className={styles.container}>
      <WalletMultiButtonDynamic />
        <div className={styles.iconContainer}>
          <Image
            src="/thirdweb.svg"
            height={75}
            width={115}
            style={{
              objectFit: "contain",
            }}
            alt="thirdweb"
          />
          <Image
            width={75}
            height={75}
            src="/sol.png"
            className={styles.icon}
            alt="sol"
          />
        </div>
        <h1 className={styles.h1}>ALALA 👋</h1>
         {metadataIsLoading ? <p>Loading...</p> : <p>{metadata?.description}</p>}
        <button disabled={isLoading} onClick={() => claim({amount: 1})}>Claim 1 Alala NFT</button>
          {conditionsIsLoading ? (
            <p>?/?</p>
          ) : (
            <p>
              {conditions?.totalAvailableSupply}/{conditions?.claimedSupply}
            </p>
          ) }
         
      </div>
    </>
    
  );
  
};


export default Home;
