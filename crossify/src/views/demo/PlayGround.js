import React from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// must manually import the stylesheets for each plugin
// import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

export default class abc extends React.Component {
  render() {
    return <div></div>;
  }
}
// class DemoApp extends React.Component {
//   calendarComponentRef = React.createRef();

//   state = {
//     calendarWeekends: true,
//     calendarEvents: [
//       // initial event data
//       { title: "Event Now", start: new Date() },
//     ],
//   };

//   render() {
//     return (
//       <div className="demo-app">
//         <div className="demo-app-top">
//           <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
//           <button onClick={this.gotoPast}>go to a date in the past</button>
//           &nbsp; (also, click a date/time to add an event)
//         </div>
//         <div className="demo-app-calendar">
//           <FullCalendar
//             defaultView="dayGridMonth"
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
//             }}
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             ref={this.calendarComponentRef}
//             weekends={this.state.calendarWeekends}
//             events={this.state.calendarEvents}
//             dateClick={this.handleDateClick}
//           />
//         </div>
//       </div>
//     );
//   }

//   toggleWeekends = () => {
//     this.setState({
//       // update a property
//       calendarWeekends: !this.state.calendarWeekends,
//     });
//   };

//   gotoPast = () => {
//     let calendarApi = this.calendarComponentRef.current.getApi();
//     calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
//   };

//   handleDateClick = (arg) => {
//     console.log();
//   };
//}
/*
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function renderEventContent(eventInfo) {
  return (
    <button className="p-2 bg-alpha w-full" onClick={() => alert("Working")}>
      <div className="font-semibold ">{eventInfo.timeText}</div>
      <div>{eventInfo.event.title}</div>
    </button>
  );
}
export default class DemoApp extends React.Component {
  render() {
    return (
      <div style={{ padding: "8rem" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{ center: "dayGridMonth,timeGridWeek,timeGridDay" }}
          dateClick={this.handleDateClick}
          eventContent={renderEventContent}
          defaultView="timeGridWeek"
          events={[
            { title: "Harshil Patel", date: "2021-04-01" },
            { title: "event 2", date: "2021-04-02" },
          ]}
        />
      </div>
    );
  }

  handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
}

*/
