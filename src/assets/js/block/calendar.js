const   calendar = document.querySelector('.slider__days');
const   leftArrow = document.querySelector('.arrow__left');
const   rightArrow = document.querySelector('.arrow__right');
export const Day = (new Date()).getDay();
export  const numberDay = 60;

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
    let iter = numberDay;
    let fragment = '';

    while (iter != 0)
    {
        let week_day = getWeekDay(nextDay);
        fragment += `
            <div class="slider__block">
                <span class="slider__date">${nextDay.getDate()}</span>
                <span class="slider__weekDay${week_day == 'СБ' || week_day == 'ВС' ? ' slider__dayOff' : ''}">${week_day}</span>
            </div>
        `;
        // console.log(`${getMonth(lastDay).toUpperCase()} ${lastDay.getDate()} ${getWeekDay(lastDay)}`);
        nextDay.setDate(nextDay.getDate() + 1);
        iter--;
    }
    calendar.innerHTML = fragment;
}

createCalendar();
// let n = document.querySelector('.arrow');
// n.addEventListener('click', (e) => {
//     console.log(e.target.parentElement);
//     if (e.offsetX < 0) {
//         console.log('before');
//     }
   
//     if (e.offsetX > 200) {
//         console.log('after');
//     }
// })

let offset = 0;
let widthBlock = calendar.children[0].offsetWidth;

rightArrow.addEventListener('click', () =>{
    if (60 / 2 + 10 < offset / -widthBlock)
        return ;
    offset -= widthBlock * 5;
    calendar.style.left = `${offset}px`;
    if (offset != 0)
        leftArrow.style.display = 'block';
});

leftArrow.addEventListener('click', () =>{
    offset += widthBlock * 5;
    calendar.style.left = `${offset}px`;
    if (offset == 0)
        leftArrow.style.display = 'none';
});


