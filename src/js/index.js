import '../style/style.scss'

let options = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	timezone: 'UTC'
  };

let date = new Date()
function getWeekDay(date) {
	let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  
	return days[date.getDay()];
  }

  console.log(getWeekDay(date));