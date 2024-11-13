export default function isoToNormal(iso) {
  const date = new Date(iso);
  // const months = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "June",
  //   "July",
  //   "Aug",
  //   "Sept",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // return {
  //   date:
  //     months[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear(),
  //   day: date.getDay(),
  // };
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = date.getMonth() + 1;
  return {
    date: date.getDate() + "/" + month + "/" + date.getFullYear(),
    day: days[date.getDay()],
    time: date.getHours() + ":" + date.getMinutes(),
    dateTime:
      date.getDate() +
      "/" +
      month +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes(),
  };
}
