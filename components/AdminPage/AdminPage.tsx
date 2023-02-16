"use client";
import React from "react";
import useCollection from "../../hooks/useCollection";
import style from "./AdminPage.module.css";
export default function AdminPage() {
	const {
		mintPrice,
		wlMintPrice,
		contractOwner,
		publicSaleState,
		privateSaleState,
		flipPrivateSale,
		flipPublicSale,
		set_mint_price,
		set_wl_mint_price,
		add_to_whitelist,
		add_to_whitelist_many,
	} = useCollection();

	const priceRef = React.useRef<HTMLInputElement>(null);
	const wlPriceRef = React.useRef<HTMLInputElement>(null);
	const wlAddressRef = React.useRef<HTMLInputElement>(null);
	const wlAmountRef = React.useRef<HTMLInputElement>(null);
	const wlTextAreaRef = React.useRef<HTMLTextAreaElement>(null);
	async function handlePriceChange() {
		if (!priceRef.current) return;
		const price = priceRef.current.value;
		await set_mint_price(price);
	}

	async function handleWlPriceChange() {
		if (!wlPriceRef.current) return;
		const price = wlPriceRef.current.value;
		await set_wl_mint_price(price);
	}

	async function handleAddWhiteList() {
		console.log("HERE");
		console.log(wlAddressRef.current, wlAmountRef.current);
		if (!wlAddressRef.current || !wlAmountRef.current) return;
		const address = wlAddressRef.current.value;
		const amount = wlAmountRef.current.value;
		await add_to_whitelist(address, parseInt(amount));
	}
	async function handleWlManyAdd() {
		if (!wlTextAreaRef.current) return;
		const text = wlTextAreaRef.current.value;
		const lines = text.split("\n");
		const addresses = [];
		const amounts = [];
		//TODO: in chunks
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const [address, amount] = line.split(" ");
			addresses.push(address);
			amounts.push(amount);
		}
		await add_to_whitelist_many(
			addresses,
			amounts.map((a) => parseInt(a))
		);
	}
	return (
		<div className={style.container}>
			<div className={style.p}>
				<h1>Admin Page</h1>
			</div>
			<p>Contract Owner:{contractOwner}</p>
			<hr />
			<div
				style={{
					fontWeight: "lighter",
					fontSize: "1.5rem",
				}}
			>
				<p>Mint Price: {mintPrice} NEAR</p>
				<p>Whitelist Mint Price: {wlMintPrice} NEAR</p>
			</div>
			<div>
				<div>
					<input ref={priceRef} type="number" placeholder="Mint Price" />
					<button onClick={handlePriceChange}>Change Mint Price</button>
				</div>
				<div>
					<input ref={wlPriceRef} type="number" placeholder="WL Mint Price" />
					<button onClick={handleWlPriceChange}>Change WL Mint Price</button>
				</div>
			</div>
			<hr />
			<div>
				<h2>Sales Status:</h2>
				<p>Public Sale: {publicSaleState ? "Active" : "Inactive"}</p>
				<p>Private Sale: {privateSaleState ? "Active" : "Inactive"}</p>
			</div>
			<div>
				<button onClick={flipPublicSale}>Toggle Public Sale</button>
				<button onClick={flipPrivateSale}>Toggle Private Sale</button>
			</div>
			<hr />
			<div>
				<h2>WhiteList</h2>
				<div>
					<h3>Add Single</h3>
					<input
						ref={wlAddressRef}
						type="text"
						placeholder="<wallet address>"
					/>
					<input ref={wlAmountRef} type="number" placeholder="<amount>" />
					<button onClick={handleAddWhiteList}>Add</button>
				</div>
				<div
					style={{
						marginTop: "1rem",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<h3>Add Multiple </h3>
					<textarea
						placeholder="<wallet address> <amount>"
						ref={wlTextAreaRef}
						rows={10}
						cols={30}
						style={{
							fontFamily: "open-sans, sans-serif",
							fontSize: "1rem",
						}}
					/>
					<button onClick={handleWlManyAdd}>Add</button>
				</div>
			</div>
		</div>
	);
}
