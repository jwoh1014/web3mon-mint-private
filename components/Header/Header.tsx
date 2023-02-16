"use client";
import styles from "./Header.module.css";
import React from "react";
import ConnectBtn from "../ConnectBtn/ConnectBtn";

export default function Header() {
	return (
		<div className={styles.header}>
			<div className={styles["header-logo"]}>
				<img src="/logo.png" className={styles.logo} />
			</div>
			<div className={styles["header-login"]}>
				<ConnectBtn />
			</div>
		</div>
	);
}
