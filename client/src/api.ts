import axios from 'axios';
import { APIRootPath } from '@fed-exam/config';

export type Ticket = {
	id: string;
	title: string;
	content: string;
	creationTime: number;
	userEmail: string;
	labels?: string[];
};

export type ApiClient = {
	getTickets: () => Promise<Ticket[]>;
	clone:(TicketId:string)=>Promise<void>
};




export const createApiClient = (): ApiClient => {
	return {
		getTickets: () => {
			return axios.get(APIRootPath).then((res) => res.data);
		},
		clone:(TicketId)=>
			axios.post(APIRootPath.concat("/clone") ,{TicketId:TicketId}).then((res)=>res.data)
	};
};

