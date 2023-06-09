import "@/styles/variables.scss";
import "@/styles/fonts.scss";
import "@/styles/reset.scss";
import "@/styles/button.scss";
import "@/styles/components/header.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
