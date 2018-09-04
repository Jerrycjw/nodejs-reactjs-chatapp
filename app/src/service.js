import axios from 'axios'
import {apiUrl} from './config'

const apiURL = apiUrl;


export const get = (endpoint, options = null) => {

		const url = `${apiURL}/${endpoint}`;

		return axios.get(url, options);
	}

export const post = (endpoint = "", data = {}, options = {headers: {'Content-Type': 'application/json'}}) => {

		const url = `${apiURL}/${endpoint}`;
		
		return axios.post(url, data, options);
	}

