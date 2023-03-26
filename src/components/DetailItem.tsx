import styles from "@/styles/components/detailItem.module.scss";

interface iListItemProp {
	title: string | undefined;
	children?: JSX.Element | string | JSX.Element[];
}

export default function listItem(props: iListItemProp) {
	return (
		<div className={styles.detailItem}>
			<div className={styles.detailItemTitle}>{props.title} :</div>
			<div className={styles.detailItemValue}>{props.children}</div>
		</div>
	);
}
