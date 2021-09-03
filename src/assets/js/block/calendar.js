const calendar = document.querySelector('.arrow');
const dayLater = 20;
export const Day = (new Date()).getDay();

function getWeekDay(date) {
	let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
	return days[date.getDay()];

}

function getMonth(date)
{
	let months = ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь'];
	return months[date.getMonth()];
}

function createCalendar()
{
    let lastDay = new Date();
    let nextDay = new Date();
    let iter = dayLater;
    let fragment = '';

    while (iter != 0)
    {
        let week_day = getWeekDay(nextDay);
        fragment += `
            <div class="calendar_block">
                <span class="calendar_date">${nextDay.getDate()}</span>
                <span class="calendar_weekDay${week_day == 'СБ' || week_day == 'ВС' ? ' day_off' : ''}">${week_day}</span>
            </div>
        `;
        // console.log(`${getMonth(lastDay).toUpperCase()} ${lastDay.getDate()} ${getWeekDay(lastDay)}`);
        nextDay.setDate(nextDay.getDate() + 1);
        iter--;
    }
    calendar.innerHTML = fragment;
}

createCalendar();
let n = document.querySelector('.arrow');
n.addEventListener('click', (e) => {
    console.log(e.target.parentElement);
})


