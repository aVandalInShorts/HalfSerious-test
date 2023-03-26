import Link from "next/link";

export default function Header() {
	return (
		<header className="site-header">
			<Link href="/" className="site-header-logo">
				<img src="/logo.svg" />
			</Link>

			<nav className="site-header-nav">
				<Link href="/films">Filmes</Link>
				<Link href="/people">Personnages</Link>
				<Link href="/species">Espèces</Link>
				<Link href="/planets">Planètes</Link>
				<Link href="/starships">Vaissaux</Link>
				<Link href="/vehicules">Véhicules</Link>
			</nav>

			<button className="site-header-nav-btn">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</header>
	);
}
