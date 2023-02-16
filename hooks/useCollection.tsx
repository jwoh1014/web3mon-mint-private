"use client";
import { utils } from "near-api-js";
import React from "react";
import { CONTRACT_ID, useNearContext } from "../context/NearContext";
import { useQuery } from "react-query";
export default function useCollection() {
	const { accountId, viewMethod, callMethods } = useNearContext();

	const { data: mintPrice, refetch: refetchMintPrice } = useQuery(
		"MintPrice",
		async () => {
			const result = await viewMethod(CONTRACT_ID, "get_mint_price", {});
			return utils.format.formatNearAmount(result);
		}
	);

	const { data: wlMintPrice, refetch: refetchWLMintPrice } = useQuery(
		"WLMintPrice",
		async () => {
			const result = await viewMethod(CONTRACT_ID, "get_wl_mint_price", {});
			return utils.format.formatNearAmount(result);
		}
	);

	const { data: maxSupply, refetch: refetchMaxSupply } = useQuery(
		"MaxSupply",
		async () => {
			const result = await viewMethod(CONTRACT_ID, "get_max_supply", {});
			return result;
		}
	);

	const { data: totalSupply, refetch: refetchTotalSupply } = useQuery(
		"TotalSupply",
		async () => {
			const result = await viewMethod(CONTRACT_ID, "nft_total_supply", {});
			return result;
		},
		{
			refetchInterval: 10000,
		}
	);

	const { data: publicSaleState, refetch: refetchPublicSaleState } = useQuery(
		"publicSaleState",
		async () => {
			const result = await viewMethod(CONTRACT_ID, "get_sale_status", {});
			return result;
		}
	);

	const { data: privateSaleState, refetch: refetchPrivateSaleState } = useQuery(
		"privateSaleState",
		async () => {
			const result: boolean = await viewMethod(
				CONTRACT_ID,
				"get_presale_status",
				{}
			);
			return result;
		}
	);

	const { data: contractOwner } = useQuery("contractOwner", async () => {
		const result: string = await viewMethod(CONTRACT_ID, "get_owner", {});
		return result;
	});

	const { data: wlAmount } = useQuery(
		["wlAmount", accountId],
		async () => {
			const result = await viewMethod(CONTRACT_ID, "get_wl_amount", {
				account_id: accountId,
			});

			return result;
		},
		{
			enabled: !!accountId,
			initialData: 0,
		}
	);

	async function flipPublicSale() {
		const result = await callMethods([
			{
				contractId: CONTRACT_ID,
				methodName: "flip_public_sale",
				args: {},
				gas: "300000000000000",
				amount: "0",
			},
		]);
		console.log(result);
		await refetchPublicSaleState();
	}
	async function flipPrivateSale() {
		const result = await callMethods([
			{
				contractId: CONTRACT_ID,
				methodName: "flip_presale",
				args: {},
				gas: "300000000000000",
				amount: "0",
			},
		]);
		console.log(result);
		await refetchPrivateSaleState();
	}
	async function add_to_whitelist(account_id: string, amount: number) {
		const result = await callMethods([
			{
				contractId: CONTRACT_ID,
				methodName: "add_to_whitelist",
				args: { account_id, amount },
				gas: "300000000000000",
				amount: "0",
			},
		]);
		console.log(result);
	}
	async function add_to_whitelist_many(
		account_ids: string[],
		amounts: number[]
	) {
		const maxNumberPerChunk = 20;
		const chunks = [];
		const amountChunks = [];
		let actions = [];
		for (let i = 0; i < account_ids.length; i += maxNumberPerChunk) {
			chunks.push(account_ids.slice(i, i + maxNumberPerChunk));
			amountChunks.push(amounts.slice(i, i + maxNumberPerChunk));
		}
		for (let i = 0; i < chunks.length; i++) {
			actions.push({
				contractId: CONTRACT_ID,
				methodName: "add_to_whitelist_many",
				args: {
					account_ids: chunks[i],
					amounts: amountChunks[i],
				},
				gas: "300000000000000",
				amount: "0",
			});
		}
		const result = await callMethods(actions);
		console.log(result);
	}
	async function set_mint_price(price: string) {
		const result = await callMethods([
			{
				contractId: CONTRACT_ID,
				methodName: "set_mint_price",
				args: {
					price: utils.format.parseNearAmount(price.toString()),
				},
				gas: "300000000000000",
				amount: "0",
			},
		]);
		console.log(result);
		await refetchMintPrice();
	}

	async function set_wl_mint_price(price: string) {
		const result = await callMethods([
			{
				contractId: CONTRACT_ID,
				methodName: "set_wl_mint_price",
				args: {
					price: utils.format.parseNearAmount(price.toString()),
				},
				gas: "300000000000000",
				amount: "0",
			},
		]);
		console.log(result);
		await refetchWLMintPrice();
	}

	return {
		privateSaleState,
		publicSaleState,
		contractOwner,
		mintPrice,
		wlMintPrice,
		wlAmount,
		flipPublicSale,
		flipPrivateSale,
		add_to_whitelist,
		add_to_whitelist_many,
		set_mint_price,
		set_wl_mint_price,
		maxSupply,
		totalSupply,
	};
}
