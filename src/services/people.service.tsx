import axios from "axios";

const getSpecies = (url: string, cb: any) => {
	handleRequest(url, cb);
};

const handleRequest = (url: string, cb: any) => {
	axios.get(url).then((response) => {
		cb(response);
	});
};

export { getSpecies };
