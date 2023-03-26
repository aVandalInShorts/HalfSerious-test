import ListItem from "./ListItem";
import styles from "@/styles/components/list.module.scss";

export default function handleList(props: any) {
	return <div className={styles.list}>{props.children}</div>;
}
