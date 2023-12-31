
function generate() {
  // get references of all the inputs
  const length = document.getElementById("passwordRange").value;
  const useUppercase = document.getElementById("allCaps").checked;
  const useLowercase = document.getElementById("lowerCase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;
  const excludeDuplicates = document.getElementById("no-duplicates").checked;

  // generate the random password
  const password = generatePassword(parseInt(length), useUppercase, useLowercase, useNumbers, useSymbols, excludeDuplicates)

  // show the password
  document.getElementById('outputPassword').value = password
}



function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols, excludeDuplicates) {
let charset = '';

if (useUppercase) {
  charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
}

if (useLowercase) {
  charset += 'abcdefghijklmnopqrstuvwxyz';
}

if (useNumbers) {
  charset += '0123456789';
}

if (useSymbols) {
  charset += '!@#$%^&*()-_+=<>?';
}

let password = [];
let usedChars = [];

if (excludeDuplicates && length > charset.length) {
  console.error('Password length exceeds the available character set. Unable to generate a unique password.');
  return '';
}

for (let i = 0; i < length; i++) {
  let randomChar = charset.charAt(Math.floor(Math.random() * charset.length));

  if (excludeDuplicates) {
    while (usedChars.includes(randomChar)) {
      randomChar = charset.charAt(Math.floor(Math.random() * charset.length));
    }
    usedChars.push(randomChar);
  }

  password.push(randomChar);
}

return password.join('');

}



$(window).scroll(function() {
if ($(this).scrollTop() > 600) {
  $(".scrollup").fadeIn();
} else {
  $(".scrollup").fadeOut();
}
})
$(".scrollup").click(function() {
  $("html, body").animate({
    scrollTop: 0
  }, 600);
  return false;
})

/* JQuery UI Sortable */

$(function () {
  $("#password-list").sortable();
  $("#password-list").sortable({
    forceHelperSize: true
  });
  // Getter
  var forceHelperSize = $( "#password-list" ).sortable( "option", "forceHelperSize" );

  // Setter
  $( "#password-list" ).sortable( "option", "forceHelperSize", true );
});


$(document).ready(function(){
  $("#newPassword").hide();
  $("#newEntry").click(function(){
    $("#sectionHeader").text("Create New Password");
    $("#passwordForm").trigger("reset");
    $("#newPassword").toggle();
  });
  $("#closeMe").click(function(){
    $("#newPassword").toggle();
  });
});
