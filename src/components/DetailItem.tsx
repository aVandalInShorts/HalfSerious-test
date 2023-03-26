import styles from "@/styles/components/detailItem.module.scss";

interface iListItemProp {
	title: string | undefined;
	value: string | undefined;
}

export default function listItem(props: iListItemProp) {
	return (
		<div className={styles.detailItem}>
			<div className={styles.detailItemTitle}>{props.title} :</div>
			<div className={styles.detailItemValue}>{props.value}</div>
		</div>
	);
}
