const moment = require("moment");


let time = moment().format("h:mm");


function chatformat(text,nameofuser){
return {
text,
nameofuser,
time
}
}

module.exports = chatformat;