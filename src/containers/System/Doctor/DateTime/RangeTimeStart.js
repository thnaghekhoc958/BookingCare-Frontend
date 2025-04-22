import React, { useState, useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { DATE_AND_TIME } from "../../../../utils";
import moment from "moment";

function RangeTimeStart({
  isRangeTimeStart,
  handleTimeChangeInput
  // handleTimeRangeChange,
}) {
  const [dateTime, setDateTime] = useState([]);
  const [TimeRangeStart, setTimeRangeStart] = useState(null);
  const [TimeRangeEnd, setTimeRangeEnd] = useState(null);

  const startRef = useRef(null);
  const endRef = useRef(null);

  // time-range-start
  const handleTimeRangeChangeStart = (selectedDates) => {
    const startDate = selectedDates[0];
    setTimeRangeStart(startDate);
    handleTimeChangeInput(startDate,null,null)
  };

  return (
    <React.Fragment>
      <div>
        {DATE_AND_TIME.RANGE_TIME_START === isRangeTimeStart && (
          <Flatpickr
            className="col-4 form-control"
            value={TimeRangeStart}
            onChange={handleTimeRangeChangeStart}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H K",
              time_24hr: false,
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default RangeTimeStart;
