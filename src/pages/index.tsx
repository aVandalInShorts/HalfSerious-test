import Head from "next/head";
import styles from "@/styles/pages/home.module.scss";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
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
			</main>
		</>
	);
}
