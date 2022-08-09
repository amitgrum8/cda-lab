import React ,{useState} from 'react';
import { Ticket } from '../api';
import './ticket.css';


export default function TicketCompnent ({ ticket ,pinFunc,unPinFunc,cloneFunc}: {ticket: Ticket,pinFunc:any,unPinFunc:any,cloneFunc:any}) {
	const [showMore, setShowMore] = useState(false);
    const [buttonText, setButtonText] = useState("show more");
    const [pinned,setPinned]=useState(true)
    function showMoreButton(){
            setShowMore(!showMore)
            if (showMore)
                setButtonText("show more")
            else
                setButtonText("show less")
    }
    function pinbutton(ticketId:string){
        setPinned(!pinned)
        if(pinned)
            pinFunc(ticket.id)
        else
            unPinFunc(ticket.id)
    }
    return (<ul  className='tickets'>
        <li> 
            <h3 className='title'>{ticket.title}</h3>
            <h4>
             {showMore ? ticket.content : `${ticket.content.split("\n").slice(0,4)}`}
         <hr></hr>    
        <button  className="showMore" onClick={()=>showMoreButton()}> {buttonText}</button>
        {pinned ? (<button className="pin" onClick={()=>pinbutton(ticket.id)}>pin</button>):
        (<button className="unpin" onClick={()=> pinbutton(ticket.id)}>unpin</button>)}
        <button className="cloneBtn" onClick={()=>cloneFunc(ticket.id)}> clone</button>     
</h4>
            <footer>
                <div className='meta-data'>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div>
            </footer>
        </li>
    </ul>);
}


