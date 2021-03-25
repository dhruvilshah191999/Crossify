import React from "react";
import FullCalendar, { sliceEvents } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { motion } from "framer-motion";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import SweetAlert from "react-bootstrap-sweetalert";

function renderEventContent(eventInfo) {
  return (
    <button className="p-2 bg-alpha w-full" onClick={() => alert("Working")}>
      <div className="font-semibold ">{eventInfo.timeText}</div>
      <div>{eventInfo.event.title}</div>
    </button>
  );
}
export default class DemoApp extends React.Component {
  calendarRef = React.createRef();
  state = {
    alert: null,
    events: [
      {
        title: "Harshil Patel",
        date: "2021-04-01",
        start: new Date(),
        end: "2021-03-28",
      },
      {
        title: "event 2",
        date: "2021-04-02",
        start: "2021-03-22",
        end: "2021-04-01",
      },
      { title: "event 2", date: "2021-04-02" },
      { title: "event 2", date: "2021-04-02" },
      { title: "event 2", date: "2021-04-02" },
      { title: "event 2", date: "2021-04-02" },
      { title: "event 2", date: new Date("March 29, 2021 03:24:00") },
    ],
  };

  popOver = () => {
    // alert("Working as smooth");
    //hovering effect if you want to add
  };

  redirectToEventPage = (selectionInfo) => {
    //todo Get the Id and then provide the link to open in new tab
    alert("Clicked");
  };

  setDate = (e) => {
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.gotoDate(e.target.value);
  };
  changeView = () => {
    let calendarApi = this.calendarRef.current.getApi();
    const currentOption = calendarApi.getOption("eventDisplay");
    const circleOfLife = [
      "auto",
      "block",
      "list-item",
      "background",
      "inverse-background",
      "none",
    ];
    const i = circleOfLife.indexOf(currentOption);
    const newI = (i + 1) % (circleOfLife.length - 1);
    calendarApi.setOption("eventDisplay", circleOfLife[newI]);
  };

  selectedDates = (selectionInfo) => {
    console.log(selectionInfo);
    const getAlert = () => (
      <SweetAlert
        customClass="text-black"
        success
        showCancel
        confirmBtnText="Let's Fill the Details."
        confirmBtnBsStyle="success"
        title="Apply for Event "
        focusCancelBtn
        confirmBtnCssClass="text-base rounded px-4 py-2 bg-green-500"
        confirmBtnStyle={{ color: "white" }}
        cancelBtnCssClass="text-base"
        cancelBtnBsStyle="default"
        onConfirm={() => {}}
        onCancel={() => {
          this.setState({ alert: null });
        }}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        You are requesting to host Event for {selectionInfo.startStr} to{" "}
        {selectionInfo.endStr}.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
    //todo pop up with sweetalert and say that do you sure you want to request for event for this to this
  };
  render() {
    return (
      <>
        <FullCalendar
          ref={this.calendarRef}
          height="800px"
          stickyHeaderDates={true}
          stickyFooterScrollbar={true}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            center: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventColor="#B388DD"
          // eventBorderColor=""
          // dateClick={this.handleDateClick}
          // eventContent={renderEventContent}
          defaultView="timeGridWeek"
          events={this.state.events}
          eventDisplay="auto"
          eventTimeFormat={{
            // like '14:30:00'
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          }}
          eventClick={this.redirectToEventPage}
          eventMouseEnter={this.popOver}
          selectable={true}
          select={this.selectedDates}
          dayMaxEventRows={true}
          dayMaxEvents={true}
        />
        {this.state.alert}
        <div className="flex w-full mt-4">
          <div className="font-semibold text-lg">
            Jump to :
            <input type="date" className="ml-2 " onChange={this.setDate} />
          </div>
          <div className="ml-auto">
            <motion.button
              type="button"
              className="rounded-lg  font-semibold p-2 text-base text-white hover:lightalpha active:lightalpha "
              onClick={this.changeView}
              style={{ backgroundColor: "#b388dd" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {" "}
              <i class="fas fa-wrench text-sm"></i> Toggle View
            </motion.button>
          </div>
        </div>
      </>
    );
  }

  handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
}
