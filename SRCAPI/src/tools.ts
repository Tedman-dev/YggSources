import axios from "axios";

interface torrentDatas {
	id: number,
	title : string,
	seed: number, 
	leech: number,
	size: number
}

// function for fetch content
export async function fetchQueryTorrent(page: number, query: string): Promise<Array<torrentDatas>> {
	const content: Array<torrentDatas> = [];

	const response = await axios.get(`https://yggapi.eu/torrents?page=${page}&q=${query}&order_by=seeders&per_page=25`);
	if (response.status === 200) {
		const results = response.data;
		content.push(...results.map((result: any) => ({
			id: result.id,
			title: result.title,
			seed: result.seeders,
			leech: result.leechers,
			size: result.size
		})));
	} else {
		console.error(`error ${response.statusText}`);
	}
	return content;
}