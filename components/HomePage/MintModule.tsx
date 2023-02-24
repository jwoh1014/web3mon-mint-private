"use client";
import React, { useEffect } from "react";
import { CONTRACT_ID, useNearContext } from "../../context/NearContext";
import styles from "./HomePage.module.css";
import ConnectBtn from "../ConnectBtn/ConnectBtn";
import { utils } from "near-api-js";
import { toast } from "react-toastify";
import useCollection from "../../hooks/useCollection";

export default function MintModule() {
	const { accountId, viewMethod, callMethods } = useNearContext();
	const [mintAmount, setMintAmount] = React.useState(1);
	const { wlAmount, wlMintPrice, mintPrice, maxSupply, totalSupply } =
		useCollection();

	async function mintNft() {
		if (!accountId) {
			toast.warn("Please connect your wallet first");
			return;
		}
		if (mintPrice == "") {
			toast.warn("Error getting mint price");
			return;
		}
		//Routing Mint / WL Mint
		const finalMintAmount = mintAmount || 1;
		if (wlAmount && parseInt(wlAmount) > 0) {
			const price = wlMintPrice;
			if (!price) {
				toast.warn("Error getting wl mint price");
				return;
			}
			const actions = [];
			for (let i = 0; i < finalMintAmount; i++) {
				actions.push({
					contractId: CONTRACT_ID,
					methodName: "whitelist_nft_mint",
					args: {},
					amount:
						wlMintPrice == "0"
							? utils.format.parseNearAmount("0.015")!
							: utils.format.parseNearAmount(price)!,
					gas: "200000000000000",
				});
			}
			await callMethods(actions);
		} else {
			const price = mintPrice;
			if (!price) {
				toast.warn("Error getting mint price");
				return;
			}
			const actions = [];

			for (let i = 0; i < finalMintAmount; i++) {
				actions.push({
					contractId: CONTRACT_ID,
					methodName: "nft_mint",
					args: {},
					amount: utils.format.parseNearAmount(price)!,
					gas: "200000000000000",
				});
			}

			await callMethods(actions);
		}
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<p>
				Minted {totalSupply} / {maxSupply}
			</p>
			{accountId ? (
				<div>
					<p>Your WL Amount: {wlAmount}</p>
					<div
						style={{
							display: "flex",
							justifyItems: "center",
							alignItems: "center",
							gap: "20px",
						}}
					>
						<button className={"button-86"} onClick={mintNft}>
							Mint for{" "}
							{parseInt(wlAmount!) > 0
								? parseFloat(wlMintPrice || "0") * mintAmount
								: parseFloat(mintPrice || "0") * mintAmount}{" "}
							Ⓝ
						</button>
						<input
							type="number"
							value={mintAmount}
							max={wlAmount > 0 ? wlAmount : 10}
							min={1}
							step={1}
							placeholder="Amount"
							onChange={(e) => setMintAmount(parseInt(e.target.value))}
							style={{
								width: "5rem",
								height: "2rem",
								border: "2px solid #ffffff",
								borderRadius: "0.5rem",
								padding: "0.5rem",
								backgroundColor: "rgba(0, 0, 0, 0.1)",
								color: "#fff",
							}}
						/>
					</div>
				</div>
			) : (
				<ConnectBtn />
			)}
		</div>
	);
}
