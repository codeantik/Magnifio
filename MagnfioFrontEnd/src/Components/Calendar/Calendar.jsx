import React, { useContext, useState } from 'react';
import { 
  ScheduleComponent, 
  Day, 
  Week, 
  WorkWeek, 
  Month, 
  Agenda, 
  Inject, 
  DragAndDrop, 
  Resize
} from '@syncfusion/ej2-react-schedule';
import {
 createEvent, 
 updateEvent, 
 deleteEvent,
} from '../Loginpage/Loginpage';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sampleBase';
import * as dataSource from './dataSource.json';
import eventContext from '../../context/events/eventContext';
import axios from 'axios';
import "./Calendar.css";
import { values } from 'lodash';


export default class Calendar extends SampleBase {

  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.scheduleData, null, true);
    this.state = {

    };
  }

  onPopupClose(args) {
    if (args.type === "Editor" && args.target.classList.contains("e-work-cells")) {
      let data = args.data;
      data.Id = this.scheduleObj.getEventMaxID();
      console.log('calendarData', data);
    }
  }

  onActionComplete(args) {
    console.log(args);
    if (args.requestType === "eventCreated") {
      console.log(args.addedRecords[0]);
      console.log(args.addedRecords[0].Id);
      createEvent({
        id: args.addedRecords[0].Id,
        summary: args.addedRecords[0].Subject,
        location: args.addedRecords[0].Location,
        start: {
          dateTime: args.addedRecords[0].StartTime.toISOString(),
        },
        end: {
          dateTime: args.addedRecords[0].EndTime.toISOString(),
        },
        attendees: [],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
            requestId: 'JksKJJSK1KJSK',
          },
        },
      });
    }
    else if(args.requestType === "eventRemoved") {
      deleteEvent(args.deletedRecords[0].Id);
    }
    else if(args.requestType === "eventChanged") {
      updateEvent(args.changedRecords[0].Id, {
          summary: args.changedRecords[0].Subject,
          location: args.changedRecords[0].Location,
          start: {
            dateTime: args.changedRecords[0].StartTime.toISOString(),
          },
          end: {
            dateTime: args.changedRecords[0].EndTime.toISOString(),
          }
        });
    }
  }
  

  fetchCalendarEvents = async (eventData) => {
    // const { data } = await axios.get(`http://3.87.73.247:8080/events`)
    // // console.log('data', data)
    // this.setState({
    //   events: data,
    //   res: data.map(event => {
    //     const year1 = parseInt(event.startTime.substring(0, 4));
    //     const month1 = parseInt(event.startTime.substring(5, 7));
    //     const date1 = parseInt(event.startTime.substring(8, 10));
    //     const h1 = parseInt(event.startTime.substring(11, 13));
    //     const m1 = parseInt(event.startTime.substring(14, 16));

    //     const year2 = parseInt(event.endTime.substring(0, 4));
    //     const month2 = parseInt(event.endTime.substring(5, 7));
    //     const date2 = parseInt(event.endTime.substring(8, 10));
    //     const h2 = parseInt(event.endTime.substring(11, 13));
    //     const m2 = parseInt(event.endTime.substring(14, 16));
    //     return ({
    //       Id: event.eventId,
    //       Subject: event.subject,
    //       StartTime: new Date(year1, month1 - 1, date1, h1, m1),
    //       EndTime: new Date(year2, month2 - 1, date2, h2, m2),
    //     })
    //   })
    // })


    const finalEventData =  eventData.map(event => {
      const year1 = parseInt(event.startTime.substring(0, 4));
      const month1 = parseInt(event.startTime.substring(5, 7));
      const date1 = parseInt(event.startTime.substring(8, 10));
      const h1 = parseInt(event.startTime.substring(11, 13));
      const m1 = parseInt(event.startTime.substring(14, 16));

      const year2 = parseInt(event.endTime.substring(0, 4));
      const month2 = parseInt(event.endTime.substring(5, 7));
      const date2 = parseInt(event.endTime.substring(8, 10));
      const h2 = parseInt(event.endTime.substring(11, 13));
      const m2 = parseInt(event.endTime.substring(14, 16));
      return ({
        Id: event.eventId,
        Subject: event.subject,
        StartTime: new Date(year1, month1 - 1, date1, h1, m1),
        EndTime: new Date(year2, month2 - 1, date2, h2, m2),
      })
    })

    return finalEventData;

  }


  render() {
    return <CalendarHelper 
      onPopupClose={this.onPopupClose.bind(this)} 
      onActionComplete={this.onActionComplete.bind(this)}
      scheduleObj={(values) => this.scheduleObj = values}
    />
  }
}


const CalendarHelper = (props) => {

  const { onPopupClose, onActionComplete, scheduleObj } = props;
  const { events } = useContext(eventContext);
  console.log('calendar-events-check', events);


  const fetchEvents = (eventData = events) => {
    const finalEventData =  eventData.map(event => {
      const year1 = parseInt(event.startTime.substring(0, 4));
      const month1 = parseInt(event.startTime.substring(5, 7));
      const date1 = parseInt(event.startTime.substring(8, 10));
      const h1 = parseInt(event.startTime.substring(11, 13));
      const m1 = parseInt(event.startTime.substring(14, 16));

      const year2 = parseInt(event.endTime.substring(0, 4));
      const month2 = parseInt(event.endTime.substring(5, 7));
      const date2 = parseInt(event.endTime.substring(8, 10));
      const h2 = parseInt(event.endTime.substring(11, 13));
      const m2 = parseInt(event.endTime.substring(14, 16));
      return ({
        Id: event.eventId,
        Subject: event.subject,
        StartTime: new Date(year1, month1 - 1, date1, h1, m1),
        EndTime: new Date(year2, month2 - 1, date2, h2, m2),
      })
    })

    return finalEventData;
  }


  return (
    <div className='calendar'>
        <ScheduleComponent 
          height='550px' 
          selectedDate={Date.now()}
          ref={(val) => scheduleObj(val)}
          eventSettings={{ dataSource: fetchEvents() }} 
          currentView='Month'
          popupClose={onPopupClose}
          actionComplete={onActionComplete}
        >
          <Inject 
            services={[
              Day, 
              Week, 
              WorkWeek, 
              Month, 
              Agenda, 
              DragAndDrop, 
              Resize
            ]} 
          />
        </ScheduleComponent>
      </div>
  );
}
