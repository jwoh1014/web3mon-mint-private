import { Inter } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "../components/HomePage/HomePage";
import Header from "../components/Header/Header";

export default function Home() {
	return (
		<main>
			<Header />
			<HomePage />
		</main>
	);
}
