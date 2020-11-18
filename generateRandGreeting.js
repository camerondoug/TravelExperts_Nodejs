/*Author:  Doug Cameron
June  14th, 2020
Course Module :  Web Application Development CPRG-210-OSD
Assignment : 4

---------------------------------------------------------------------
JS code for creating the randomw greeting

*/

const greetings = ["Welcome to Table Ready", 				//set up array with greetings
"Your table is waiting", "Hope you enjoyed the experience",
 "How can we help you?"];

exports.newGreeting = function getGreeting() { 				// export function so other modules can use it
	let rand = Math.floor(Math.random() * greetings.length); // create a random number
	return greetings[rand];									// grap the random greeting from the array
}