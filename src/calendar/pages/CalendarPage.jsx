import { Calendar } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar,CalendarEvent,CalendarModal,FabAddNew,FabDelete } from '../'
import { localizer,getMessages } from '../../helpers'
import { useEffect, useState } from 'react'
import { useAuthStore, useUiStore } from '../../hooks'
import { useCalendarStore } from '../../hooks/useCalendarStore'




    

export const CalendarPage = () => {

    const {user} = useAuthStore()

    const {events,setActiveEvent,startLoadingEvents}= useCalendarStore()
    const {openDateModal} = useUiStore()
    
    const [lasView, setLasView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event,start,end,isSelected)=>{
        //console.log({event,start,end,isSelected})
        const isMyEvent = (user.uid===event.user._id) || (user.uid===event.user.uid)
        const style={
            backgroundColor:isMyEvent?'#347CF7':'#465660',
            borderRadius:'0px',
            opacity:0.8,
            color:'white',
        } 
    return {
        style
    }
    }
    
    const onDoubleClick=(event)=>{
        //console.log({doubleClick:event})
        openDateModal()
    }

    const onSelect=(event)=>{
        //console.log({click:event})
        setActiveEvent(event)
    }

    const onViewChange=(event)=>{
        localStorage.setItem('lastView',event)
        setLasView(event)
    }

    useEffect(() => {
        startLoadingEvents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <>
            <NavBar/>
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lasView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px' }}
                messages={getMessages()}
                eventPropGetter={eventStyleGetter}
                components={{event:CalendarEvent}}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
            />
            <CalendarModal/>
            <FabAddNew/>
            <FabDelete/>
        </>
    )
}
