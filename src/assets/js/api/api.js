import axios from "axios";
import { renderToday } from "../block/poster";
import {URL} from '../config/config';

export let data = []

export const getTimeTable = async () => {
	await axios.get(`${URL}/api`)
	.then((response) => {
		data = response.data.data;
		// console.log(response.data['data'])
	})
	.catch((error) => {
		console.log(error);
	})
}

export const postBuy = async () => {
	await axios.post(`${URL}/api`, {data})
	.then((response) => {
		console.log(response);
	})
}
