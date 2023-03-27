import Head from "next/head";
import styles from "@/styles/pages/home.module.scss";
import Header from "@/components/Header";
import Link from "next/link";
import { getImage } from "@/services/index.service";
import { useEffect, useState } from "react";

export default function Home() {
	const [imageUrl, handleImageUrl] = useState("");

	useEffect(() => {
		fetchImage();
	}, []);

	const fetchImage = () => {
		getImage().then((res: any) => {
			handleImageUrl(res.response.results[0].urls.full);
		});
	};

	return (
		<>
			<Head>
				<title>Star Wars | Accueil</title>
			</Head>
			<Header />
			<main className={styles.main}>
				<div className={styles.homeGrid}>
					<Link href="/films" className={styles.homeLink}>
						Filmes
					</Link>
					<Link href="/people" className={styles.homeLink}>
						Personnages
					</Link>
					<Link href="/species" className={styles.homeLink}>
						Espèces
					</Link>
					<Link href="/planets" className={styles.homeLink}>
						Planètes
					</Link>
					<Link href="/starships" className={styles.homeLink}>
						Vaissaux
					</Link>
					<Link href="/vehicles" className={styles.homeLink}>
						Véhicules
					</Link>
				</div>

				<div className={styles.imageCtn}>
					{<img src={imageUrl} alt="Image générée" />}
				</div>
			</main>
		</>
	);
}
