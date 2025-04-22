import React, { useState,useEffect,useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { DATE_AND_TIME } from "../../../../utils";
import moment from "moment";

function DatePickerComponent({
  isDayTime,
  handleTimeChangeInput,
}) {
  const [dateTime, setDateTime] = useState([]);
  const [TimeRangeStart, setTimeRangeStart] = useState(null);
  const [TimeRangeEnd, setTimeRangeEnd] = useState(null);

  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleDateChange = (selectedDates) => {
    setDateTime(selectedDates);
    handleTimeChangeInput(null,null,selectedDates)
  };

  return (
    <React.Fragment>
      <div>
        {DATE_AND_TIME.DATE_TIME === isDayTime && (
          <Flatpickr
            className="form-control"
            value={dateTime}
            onChange={handleDateChange}
            options={{
              enableTime: false,
              dateFormat: "d/m/Y",
              minDate: new Date().setHours(0, 0, 0, 0)
            }}
          />
        )}
              {DATE_AND_TIME.DATE_BIRTHDAY === isDayTime && (
          <Flatpickr
            className="form-control"
            value={dateTime}
            onChange={handleDateChange}
            options={{
              enableTime: false,
              dateFormat: "d/m/Y",
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default DatePickerComponent;
