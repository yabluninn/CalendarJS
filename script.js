const calendarDates = document.getElementById("calendar-dates");
const currentMonth = document.getElementById("current-month");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const todayButton = document.getElementById("today-btn");

let date = new Date();
let selectedDate = new Date();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function renderCalendar() {
  date.setDate(1);

  const month = date.getMonth();
  const year = date.getFullYear();

  currentMonth.innerText = `${months[month]} ${year}`;

  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(year, month + 1, 0).getDay();

  const prevLastDay = new Date(year, month, 0).getDate();
  const lastDay = new Date(year, month + 1, 0).getDate();

  const nextDays = 7 - lastDayIndex - 1;

  calendarDates.innerHTML = "";

  for (let x = firstDayIndex; x > 0; x--) {
    const day = document.createElement("div");
    day.classList.add("calendar-date", "disabled");
    day.innerText = prevLastDay - x + 1;
    calendarDates.appendChild(day);
  }

  for (let i = 1; i <= lastDay; i++) {
    const day = document.createElement("div");
    day.classList.add("calendar-date");

    const today = new Date();
    let todayDay = today.getDate();
    let todayMonth = today.getMonth();
    let todayYear = today.getFullYear();

    day.innerText = i;

    if (i === todayDay && year === todayYear && month === todayMonth) {
      day.classList.add("today");
    }

    if (
      i === selectedDate.getDate() &&
      year === selectedDate.getFullYear() &&
      month === selectedDate.getMonth()
    ) {
      day.classList.add("selected");
      day.classList.remove("today");
    }

    const currentDayOfWeek = new Date(year, month, i).getDay();
    if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
      day.classList.add("weekend");
    }

    day.addEventListener("click", () => {
      selectedDate = new Date(year, month, i);
      renderCalendar();
    });

    calendarDates.appendChild(day);
  }

  for (let j = 1; j <= nextDays; j++) {
    const day = document.createElement("div");
    day.classList.add("calendar-date", "disabled");
    day.innerText = j;
    calendarDates.appendChild(day);
  }
}

prevMonthButton.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

todayButton.addEventListener("click", () => {
  selectedDate = new Date();
  renderCalendar();
});

renderCalendar();
