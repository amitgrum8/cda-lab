import React ,{useState ,useEffect } from 'react';
import { Ticket } from './api';
import TicketCompnent from './components/ticket'
export const Tickets = ({ tickets, cloneFunc,search }: { tickets: Ticket[], cloneFunc:any,search: string }) => {
    const[pin,setPinned]=useState(false)
    const [RenderfilteredTickets,setFilterTicktets]=useState<Ticket[]>([])
    useEffect(() => {
        const filtertTicktesAfterandBefore=beforeAfterCheck(tickets,search)
        setFilterTicktets(filtertTicktesAfterandBefore)
        },[tickets,search]);
    function createDate(date:string){
        const year=date.slice(-4)
        const day=date.slice(0,2)
        const month=date.slice(3,5)
        return new Date(year+"-"+month+"-"+day).valueOf()
    }
    function beforeAfterCheck(ticktes:Ticket[],search:string){
        if(search.slice(0,6)=="after:") {
            const valueofDate=createDate(search.slice(6,16))
            const searchword=search.slice(17).toLowerCase()
            const ticketAfter=tickets.filter((ticket)=>new Date(ticket.creationTime).valueOf()>valueofDate)
            return ticketAfter.filter((ticket)=>(ticket.title.toLowerCase()+ ticket.content.toLowerCase()).includes(searchword))
        }
        if(search.slice(0,7)=="before:") {
            const valueofDate=createDate(search.slice(7,17))
            const searchword=search.slice(18).toLowerCase()
            const ticketBefore=tickets.filter((ticket)=>new Date(ticket.creationTime).valueOf()<valueofDate)
            return ticketBefore.filter((ticket)=>(ticket.title.toLowerCase()+ ticket.content.toLowerCase()).includes(searchword))
        }
        if(search.slice(0,5)=="from:") {
            const arr=search.split(" ")
            if(arr.length>=2){
                const email=arr[0].slice(5)
                const searchword=arr.slice(1).join(" ").toLowerCase()
                console.log(searchword)
                tickets=tickets.filter((ticket)=>ticket.userEmail=email)
                return tickets.filter((ticket)=>(ticket.title.toLowerCase()+ ticket.content.toLowerCase()).includes(searchword))
            }
            return tickets.filter((ticket)=>(ticket.title.toLowerCase()+ ticket.content.toLowerCase()).includes("from:"))
        }
        const filteredTickets = tickets
        .filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(search.toLowerCase()));
        return filteredTickets
    }
    function pinTicket (ticketId:string){
    const indexOfTicket=RenderfilteredTickets.findIndex((ticket)=>ticket.id===ticketId)
    const ticket=RenderfilteredTickets[indexOfTicket]
    const retArr=[ticket].concat(RenderfilteredTickets.filter(ticket=>ticket.id!=ticketId))
    
    setFilterTicktets(retArr)
    }

    function unPinTicket(ticketId:string){
        const filterdTicktes=tickets
        .filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(search.toLowerCase()));
        const indexOfTicket=filterdTicktes.findIndex((ticket)=>ticket.id===ticketId)
        const ticket=filterdTicktes[indexOfTicket]
        const filterdTicktesWithoutTicket=RenderfilteredTickets.filter(ticket=>ticket.id!=ticketId)
        const retArr=filterdTicktesWithoutTicket.slice(0,indexOfTicket).concat([ticket]).concat(filterdTicktesWithoutTicket.slice(indexOfTicket))
        setFilterTicktets(retArr)
    }
    async function clone(ticketId:string){
        alert(await cloneFunc(ticketId))
    }
    return (<ul className='tickets'>
        {RenderfilteredTickets.map((ticket) => (<li key={ticket.id} className='ticket'>
          <TicketCompnent ticket={ticket} pinFunc={pinTicket} unPinFunc={unPinTicket} cloneFunc={clone}/>
        </li>))}
    </ul>);
}
