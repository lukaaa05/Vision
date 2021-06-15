const fetch = require("node-fetch");

exports.printMsg = function () {
  console.log(`kiss.printMsg() Will be changed to kiss.test() in future updates! `)
  console.log("This is a message from the demo package");
};

exports.message = function (user, user2, msg) {
  if (!msg) msg = "kissed";
  return `${user} ${msg} ${user2}!`;
};

const activities_list = [
  `https://media.giphy.com/media/JYpVJEcNrDAWc/giphy.gif`,
  `https://media.giphy.com/media/JYpVJEcNrDAWc/giphy.gif`,
  "https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif",
  "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
  "https://gifimage.net/wp-content/uploads/2017/09/anime-forehead-kiss-gif-11.gif",
  "https://i.gifer.com/8Sbz.gif"
];
const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);

exports.kissimg = async function () {
  console.log(`kiss.kissimg() will be removed in future major releases! We recommend switching to kiss.imageurl`)
  // generates a random number between 1 and the length of the activities array list (in this case 5).
  return `${activities_list[index]}`;
};

exports.imageurl = activities_list[index]

exports.test = async function () {
  console.log(`This is a test log! \n Msg ${message('1', '2')}! \n image: ${imageurl}`)
}
