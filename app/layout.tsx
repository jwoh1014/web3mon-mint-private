import "./globals.scss";
import "@near-wallet-selector/modal-ui/styles.css";
import { NearProvider } from "../context/NearContext";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<NearProvider>{children}</NearProvider>
			</body>
		</html>
	);
}
