import React from "react";
import { UserContext } from "./../../context/usercontext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { motion } from "framer-motion";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import SweetAlert from "react-bootstrap-sweetalert";
import RequestForEvent from "components/Modals/RequestForEvent";

import { ModalManager } from "react-dynamic-modal";

export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      alert: null,
      currentSelectionInfo: null,
      events: [],
      loading: false,
      club_id: this.props.club_id,
      isAdmin: this.props.isAdmin,
    };
  }

  componentDidMount() {
    const cleanedEvents = this.props.EventData.map(
      ({ event_name, date, startdate, _id }) => {
        const startDateTime = moment(startdate).format("YYYY-MM-DD HH:mm:ss");
        const endDateTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
        return {
          title: event_name,
          start: startDateTime,
          end: endDateTime,
          id: "/events/event=" + _id,
        };
      }
    );
    this.setState({ loading: true }, () => {
      this.setState({
        loading: false,
        events: cleanedEvents,
      });
    });
  }
  redirectToEventPage = (selectionInfo) => {
    window.open(selectionInfo.event._def.publicId, "_blank").focus();
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

  redirectToRequestModal = () => {
    ModalManager.open(
      <RequestForEvent
        onRequestClose={() => true}
        categoryList={this.props.categoryData}
        startDate={this.state.currentSelectionInfo.startStr}
        endDate={this.state.currentSelectionInfo.endStr}
        club_id={this.state.club_id}
        isAdmin={this.state.isAdmin}
      />
    );
    this.setState({ alert: null, currentSelectionInfo: null });
  };

  selectedDates = (selectionInfo) => {
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
        onConfirm={this.redirectToRequestModal}
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
      currentSelectionInfo: selectionInfo,
    });
  };
  render() {
    return (
      <div className="mt-6">
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
              className="rounded-lg  font-semibold p-2 px-4 text-base text-white  hover:lightalpha active:lightalpha "
              onClick={this.changeView}
              style={{ backgroundColor: "#b388dd" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {" "}
              <i className="fas fa-wrench text-sm"></i> Toggle View
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
}
