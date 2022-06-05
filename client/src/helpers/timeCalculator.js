function inMs(startDate, startTime, endDate, endTime){
	let firstDate = new Date(startDate);
	let secondDate = new Date(endDate);

	let ms = secondDate.getTime() - firstDate.getTime();
	let second = ms/1000;
	console.log(second)
}

 function diff(start, end) {
    start = start.split(":");
     end = end.split(":");
     var startDate = new Date(0, 0, 0, start[0], start[1], 0);
     var endDate = new Date(0, 0, 0, end[0], end[1], 0);
     var diff = endDate.getTime() - startDate.getTime();
   var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

   if (hours < 0)
       hours = hours + 24;

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
 }

 function toSecond(endDate, endTime){

   const date = new Date();
 
   const postedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()+ " ";
 
   const postedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
 
     return ( new Date(endDate + endTime) - new Date(postedDate + postedTime) );
 
 }


export default toSecond;
    
