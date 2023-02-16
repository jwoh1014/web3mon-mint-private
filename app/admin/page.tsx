import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

import Header from "../../components/Header/Header";
import AdminPage from "../../components/AdminPage/AdminPage";

export default function Home() {
	return (
		<main>
			<Header />
			<AdminPage />
		</main>
	);
}
