document.addEventListener("DOMContentLoaded", function() {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    /*plugins and theming*/
    locale: "en-gb",
    plugins: ["dayGrid", "timeGrid"],
    defaultView: "timeGridWeek",
    eventTextColor: "#fff",
    eventBorderColor: "#000",

    /*header*/
    header: {
      left: "prevYear,prev,next,nextYear today",
      center: " ",
      right: "timeGridWeek,timeGridDay"
    },
    buttonText: {
      today: "Today",
      week: "Week",
      day: "Day"
    },

    /*custom properties of GridView*/
    nowIndicator: "true", //indicator of current time
    minTime: "08:00:00", //start time
    maxTime: "19:00:00", //end time
    slotLabelFormat: {
      hour: "numeric",
      minute: "2-digit",
      omitZeroMinute: false,
      meridiem: ""
    }, //side time labels
    contentHeight: "auto", //resizes table to fit any screen
    navLinks: "true", //links any date to day view
    weekends: false,
    eventLimit: true,
    slotEventOverlap: true,
    views: {
      timeGrid: {
        eventLimit: 5
      }
    },

    /*events go here*/
    events: [
      {
        id: "1",
        title: "Test Event",
        start: "2020-03-10T10:30:00",
        end: "2020-03-10T11:30:00"
      },
      {
        id: "1",
        title: "Test Event",
        start: "2020-03-11T10:30:00",
        end: "2020-03-11T11:30:00"
      }
    ]
  });
  calendar.render();
  myDatepicker();

  function myDatepicker() {
    $(".fc-center").append('<input type="text" id="datepicker"></input>');
    $(function() {
      $("#datepicker").datepicker({
        showOn: "both",
        showOptions: {
          direction: "down"
        },
        autoSize: true,
        buttonImage:
          "https://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
        buttonText: "Select date...",
        changeMonth: true,
        changeYear: true,
        dateFormat: "DD, d MM yy",
        firstDay: 1,
        showOtherMonths: true,
        selectOtherMonths: true,

        onSelect: function(formated, dates) {
          var newDate = $.datepicker.formatDate("yy-mm-dd", formated);
          alert(newDate);
          calendar.gotoDate(newDate);
          console.log("running function select");
          myDatepicker();
        }
      });
      $("#datepicker").datepicker("setDate", "+0d");
    });
  }
});

