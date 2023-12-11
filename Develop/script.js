//wait for the DOM is ready
$(document).ready(function(){
  //get current date and time using Day.js
  const currentDate = dayjs().format('MMMM, D, YYYY');
  $("#currentDay").text(currentDate);

  //create time blocks for standar bussines hours(9am-5pm)
  const workHours = Array.from({ length: 12 }, (_, index) => index + 9);

  console.log(workHours)

  //funtion to create time blocks
  function generateTimeBlocks(){
      const $main = $("main");

      workHours.forEach( (hour)=>{
          const $timeBlock = $("<div>").addClass("time-block");
          const $hour = $("<div>").addClass("hour").text(`${hour}:00`);
          const $textArea = $("<textarea>").addClass("description");

          const currentHour = dayjs().hour();

          if(hour < currentHour){
              $timeBlock.addClass("past");
          }else if(hour === currentHour){
              $timeBlock.addClass("present");
          }else{
              $timeBlock.addClass("future");
          }

          //check local storage for saved events and display
          const savedEvent = localStorage.getItem(`event-${hour}`);
          if(savedEvent){
              $textArea.val(savedEvent);
          }

          const $saveBtn = $("<button>").addClass("saveBtn").text("save");
          $timeBlock.append($hour, $textArea, $saveBtn);
          $main.append($timeBlock);
      })
  }
  generateTimeBlocks();

  //save event to local storage
  $("fa-save").on("click", function(){
      const hour = $(this).siblings(".hour").text().split(":")[0];
      const event = $(this).siblings(".description").val();
      localStorage.setItem(`event-${hour}`, event);
  })

})