const regExUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const allowedCors = [
  'https://mj669.nomoredomains.monster',
  'http://mj669.nomoredomains.monster',
  'https://api.mj669.nomoredomains.monster',
  'http://api.mj669.nomoredomains.monster',
  'localhost:3000',
  'http://localhost:3000',
];

module.exports = {
  regExUrl,
  allowedCors,
};
