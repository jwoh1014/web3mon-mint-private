"use client";
import styles from "./HomePage.module.css";
import { motion } from "framer-motion";
import React from "react";
import { FaDiscord, FaTwitter, FaGlobe } from "react-icons/fa";
import MintModule from "./MintModule";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className={styles.homepage}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles["homepage-center-div"]}
      >
        <motion.div
          whileInView={{
            y: [-30, 0],
            opacity: [0, 1],
            transition: { duration: 1, delay: 0.25 },
          }}
        >
          <h1 style={{ fontSize: "300%", textDecoration :"underline" }}>Web3Mon NFT</h1>
        </motion.div>

        <motion.div
          whileInView={{
            y: [-30, 0],
            opacity: [0, 1],
            transition: { duration: 1, delay: 0.5 },
          }}
        >
          <h2>
            Web3Mon is the FIRST and REAL NFT Multiverse game on Multichain.
          </h2>
        </motion.div>
        <motion.div
          whileInView={{
            y: [-30, 0],
            opacity: [0, 1],
            transition: { duration: 1, delay: 0.75 },
          }}
        >
          <p>
            The first NFT of Web3Mon is skins. It is used as a character&apos;s
            cloth in the game.
          </p>
        </motion.div>
        <motion.div
          whileInView={{
            y: [-30, 0],
            opacity: [0, 1],
            transition: { duration: 1, delay: 1 },
          }}
        >
          <p>
            There are 300 skins and 5 backgrounds. A total of 1500 NFTs will be
            minted on each chain that the Web3Mon team support.
          </p>
        </motion.div>
        <motion.div
          whileInView={{
            y: [-30, 0],
            opacity: [0, 1],
            transition: { duration: 1, delay: 1 },
          }}
        >
          <p>
            If you have our first NFT on NEAR,<br/> you will get a Pre-Airdrop
            opportunity in the upcoming Multichain (Polygon, Solana,
            Arbitrum, Terra, and etc) Minting and $WAR token launch.
          </p>
        </motion.div>
        <motion.div
          whileInView={{
            y: [-30, 0],
            opacity: [0, 1],
            transition: { duration: 1, delay: 1.25 },
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div className={styles["homepage-icon"]}>
            <FaDiscord
              onClick={() => {
                window.open("https://discord.com/invite/jwfpBe7qbU");
              }}
              size="45px"
            />
          </div>
          <div className={styles["homepage-icon"]}>
            <FaTwitter
              onClick={() => {
                window.open("https://twitter.com/web3mon");
              }}
              size="45px"
            />
          </div>
          <div className={styles["homepage-icon"]}>
            <FaGlobe
              onClick={() => {
                window.open("https://web3mon.io/");
              }}
              size="45px"
            />
          </div>
        </motion.div>

        <hr style={{ width: "60%", margin: "auto" }} />
        <div>
          <MintModule />
        </div>
      </motion.div>
      <motion.div
        animate={{
          opacity: [0, 1],
          scale: [0.5, 1.1, 1],
          transition: { duration: 1, delay: 1.25 },
        }}
      >
        <Image
          src="/img/preview.gif"
          className={styles["homepage-preview-img"]}
          alt="preview"
          width={400}
          height={400}
        />
      </motion.div>
    </div>
  );
}
