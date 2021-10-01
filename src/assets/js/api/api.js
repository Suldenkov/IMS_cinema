import axios from "axios";
import { renderToday } from "../block/poster";
import {URL} from '../config/config';

export let data = []

export const getTimeTable = async (day = 1) => {
	await axios.get(`${URL}/api/${day}`)
	.then((response) => {
		data = response.data.films;
	})
	.catch((error) => {
		console.log(error);
	})
}

export const postBuy = async () => {
	// console.log(data);
	await axios.post(`${URL}/api`, {data})
	.then((response) => {
		console.log(response);
	})
}
