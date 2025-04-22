import React, { useState,useEffect,useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { DATE_AND_TIME } from "../../../../utils";
import moment from "moment";

function RangeTimeEnd({
  isRangeTimeEnd,
  handleTimeChangeInput,
  // handleTimeRangeChange,
}) {
  const [dateTime, setDateTime] = useState([]);
  const [TimeRangeStart, setTimeRangeStart] = useState(null);
  const [TimeRangeEnd, setTimeRangeEnd] = useState(null);

  const startRef = useRef(null);
  const endRef = useRef(null);

 
    // time-range-end
  const handleTimeRangeChangeEnd = (selectedDates) => {
    const endDate = selectedDates[0];
      setTimeRangeEnd(endDate);
      handleTimeChangeInput(null,endDate,null)
  };

  // useEffect(() => {
  //   if (TimeRangeStart) {
  //     console.log("TimeRangeStart success")

  //     startRef.current = TimeRangeStart;
  //   }if (TimeRangeEnd){
  //     console.log("TimeRangeEnd success")

  //     endRef.current = TimeRangeEnd;
  //   }
  //   if (startRef.current && endRef.current) {
  //     handleTimeRangeChange(startRef.current,endRef.current)
  //     startRef.current = null;
  //     endRef.current = null;
  //   }
  // }, [TimeRangeStart,TimeRangeEnd]);
  console.log('TimeRangeEnd ',TimeRangeEnd)

  return (
    <React.Fragment>
      <div>
        {DATE_AND_TIME.RANGE_TIME_END === isRangeTimeEnd && (
          <Flatpickr
            className="col-4 form-control"
            value={TimeRangeEnd}
            onChange={handleTimeRangeChangeEnd}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H K",
              time_24hr: false,
              minTime: TimeRangeStart, // Chỉ cho phép giờ sau TimeRangeStart
            }}
          />
        )}
      </div>
      {/* Hiển thị kết quả  && DATE_AND_TIME.ACTION_PRINT === isPrintResult */}
        {/* {
          TimeRangeStart && TimeRangeEnd  &&(
            <div className="form-control">
              {`${moment(TimeRangeStart).format("h")} - ${moment(TimeRangeEnd).format("h")}`}
            </div>
          )
        } */}
    </React.Fragment>
  );
}

export default RangeTimeEnd;
