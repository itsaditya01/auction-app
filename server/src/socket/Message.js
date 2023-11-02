const generateMessage = (username, msg) => {
  return {
    username,
    text: msg,
    createdAt: new Date().getTime(),
  };
};

const generateBid = (username, userId, bidAmount) => {
  return {
    username,
    bidAmount,
    userId,
    createdAt: new Date().getTime(),
  };
};

module.exports = { generateMessage, generateBid };
