import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
	const [isOpen, handleOpen] = useState(false);
	const router = useRouter();

	return (
		<header className={`site-header${isOpen ? " is-open" : ""}`}>
			<Link href="/" className="site-header-logo">
				<img src="/logo.svg" />
			</Link>

			<nav className="site-header-nav">
				<Link
					href="/films"
					className={
						router.pathname.startsWith("/films") ? "active" : ""
					}
				>
					Filmes
				</Link>
				<Link
					href="/people"
					className={
						router.pathname.startsWith("/people") ? "active" : ""
					}
				>
					Personnages
				</Link>
				<Link
					href="/species"
					className={
						router.pathname.startsWith("/species") ? "active" : ""
					}
				>
					Espèces
				</Link>
				<Link
					href="/planets"
					className={
						router.pathname.startsWith("/planets") ? "active" : ""
					}
				>
					Planètes
				</Link>
				<Link
					href="/starships"
					className={
						router.pathname.startsWith("/starships") ? "active" : ""
					}
				>
					Vaissaux
				</Link>
				<Link
					href="/vehicles"
					className={
						router.pathname.startsWith("/vehicles") ? "active" : ""
					}
				>
					Véhicules
				</Link>
			</nav>

			<button
				className="site-header-nav-btn"
				onClick={() => handleOpen(!isOpen)}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</header>
	);
}
