const calendar = document.querySelector('.arrow');
const dayLater = 14;

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
            <div class="date_block">
                <span class="date">${nextDay.getDate()}</span>
                <span class="week_day${week_day == 'СБ' || week_day == 'ВС' ? ' day_off' : ''}">${week_day}</span>
            </div>
        `;
        // console.log(`${getMonth(lastDay).toUpperCase()} ${lastDay.getDate()} ${getWeekDay(lastDay)}`);
        nextDay.setDate(nextDay.getDate() + 1);
        iter--;
    }
    calendar.innerHTML = fragment;
}

createCalendar();


