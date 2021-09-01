var dateInput = document.querySelector(".date-input");
var showButton = document.querySelector(".show-button");
var output = document.querySelector(".output");

showButton.addEventListener("click", printOutput);

function checkPalindrome(date) {
  var datelist = dateCombinations(date);
  var flag = false;
  for (var i = 0; i < datelist.length; i++) {
    if (datelist[i] == reverseString(datelist[i])) {
      flag = true;
      break;
    }
  }
  return flag;
  console.log(dateCombinations(date));
}

function reverseString(date) {
  var dateList = date.split("");
  var reversedDate = dateList.reverse();
  return reversedDate.join("");
}

function getDateAsString(day, month, year) {
  if (day < 10) {
    strDay = "0" + day;
  } else {
    strDay = day.toString();
  }

  if (month < 10) {
    strMonth = "0" + month;
  } else {
    strMonth = month.toString();
  }

  strYear = year.toString();
  var dateInStr = strYear + strMonth + strDay;
  return dateInStr;
}

function dateCombinations(date) {
  var year = date.slice(0, 4);
  var month = date.slice(4, 6);
  var day = date.slice(6);
  var halfYear = date.slice(2, 4);
  return [
    day + month + year,
    month + day + year,
    year + month + day,
    day + month + halfYear,
    month + day + halfYear,
    halfYear + month + day,
  ];
  console.log(year, month, day);
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var year = Number(date.slice(0, 4));
  var month = Number(date.slice(4, 6));
  var day = Number(date.slice(6)) + 1;

  monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    }
  } else {
    if (day > monthList[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return getDateAsString(day, month, year);
}

function getNextPalindromeDate(date) {
  var count = 0;
  var nextDate = getNextDate(date);
  while (1) {
    count++;
    var isPalindrome = checkPalindrome(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  console.log(count, nextDate);
  finalDate =
    nextDate.slice(6) + "-" + nextDate.slice(4, 6) + "-" + nextDate.slice(0, 4);
  output.innerText =
    "The next nearest palindrome date is " +
    finalDate +
    ", you missed by " +
    count +
    " days.😐";
}

function printOutput() {
  if (checkPalindrome(dateInput.value.replaceAll("-", ""))) {
    output.innerText = "Yay, your birthday palindrome😁";
  } else {
    getNextPalindromeDate(dateInput.value.replaceAll("-", ""));
  }
}
