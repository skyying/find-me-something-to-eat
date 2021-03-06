import {mapWeekDay} from "../logic/mapWeekday.js";

export const isRestaurantOpenNow = (hours) => {
  let weekDay = mapWeekDay(new Date().getDay());
  let nowHour = new Date().getHours();
  let nowMin = new Date().getMinutes();
  let now = "" + nowHour + nowMin;

  return hours.some(slot => {
    let isOpen = false;
    for (let dayOpenTime in slot.open) {
      if (
        slot.open[dayOpenTime] &&
                slot.open[dayOpenTime].day === weekDay
      ) {
        let {start, end} = slot.open[dayOpenTime];
        // check if restarant open now
        let isOpenNow =
                    (start <= now && now <= end) ||
                    (end <= start && (now <= end || now >= start));
        if (isOpenNow) {
          return true;
        }
      }
    }
    return isOpen;
  });
};
