import axios from "axios";
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

export const postBuy = async (day = 1) => {
	// console.log(data);
	await axios.put(`${URL}/api/${day}`, {films: {...data}})
	.then((response) => {
		console.log(response);
	})
}
