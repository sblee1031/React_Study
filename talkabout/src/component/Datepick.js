import { useState } from "react";
import DatePicker from "react-datepicker";

const Datepick = (props) => {
  const [startDate, setStartDate] = useState();

  const date = () => {
    setStartDate(props.setDate(date));
  };
  //console.log("선택일 : ", startDate);
  const ocDatePicker = (date) => {
    setStartDate(date);
    props.setDate(date);
    // props.date = startDate;
  };
  const filterPassedTime = (time) => {
    //console.log(time.getDate());
    const currentDate = new Date();
    const selectedDate = new Date(time);
    // console.log(currentDate.getHours() + 1);
    if (currentDate.getDate() < selectedDate.getDate()) {
      //console.log(selectedDate.getHours());
      return currentDate.getHours();
    } else {
      return currentDate.getHours() + 1 < selectedDate.getHours();
    }
  };
  const currentDate = new Date();
  return (
    <DatePicker
      selected={startDate}
      onChange={ocDatePicker}
      showTimeSelect
      minDate={currentDate}
      filterTime={filterPassedTime}
      //minTime={setHours(setMinutes(new Date(), 0), 17)}
      dateFormat="yyyy/MM/dd/ h:mm aa"
    >
      <div style={{ color: "green", fontSize: "15pt" }}>
        토론 가능 시간 선택
      </div>
    </DatePicker>
  );
};

export default Datepick;