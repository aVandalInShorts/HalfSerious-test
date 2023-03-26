import styles from "@/styles/components/listItem.module.scss";
import Link from "next/link";

interface iListItemProp {
	title: string;
	href: string;
}

export default function listItem(props: iListItemProp) {
	return (
		<div className={styles.listItem}>
			<div className={styles.listItemTitle}>{props.title}</div>
			<div className={styles.listItemLink}>
				<Link href={props.href} className="btn">
					En savoir plus
				</Link>
			</div>
		</div>
	);
}
