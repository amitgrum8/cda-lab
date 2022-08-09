import express from 'express';
import bodyParser = require('body-parser');
import { tempData } from './temp-data';
import { serverAPIPort, APIPath } from '@fed-exam/config';
import { dataflow } from 'googleapis/build/src/apis/dataflow';
import { Console } from 'console';
console.log('starting server', { serverAPIPort, APIPath });
import fs from 'fs';
import { json } from 'body-parser';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PAGE_SIZE = 1000;

app.use(bodyParser.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

app.get(APIPath, (req, res) => {
	// @ts-ignore
	const page: number = req.query.page || 1;

	const paginatedData = tempData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	res.send(paginatedData);
});


app.post(APIPath.concat("/clone"),(req,res)=>{
	const ticketId=req.body.TicketId
	const ticket=(tempData.filter((ticket)=>ticket.id==ticketId))[0]
	tempData.push({id:Math.random().toString(36).slice(0,10),title:ticket.title,content:ticket.content,creationTime:ticket.creationTime,userEmail:ticket.userEmail,labels:ticket.labels})
	fs.writeFileSync('./data.json',JSON.stringify(tempData))
	res.send("cloned "+ticket.title)
});



app.post(APIPath,)


app.listen(serverAPIPort);
console.log('server running', serverAPIPort);
