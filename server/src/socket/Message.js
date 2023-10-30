const generateMessage = (username, msg) => {
  return {
    username,
    text: msg,
    createdAt: new Date().getTime(),
  };
};

const generateBid = (username, bidAmount) => {
  return {
    username,
    bidAmount,
    createdAt: new Date().getTime(),
  };
};


module.exports = { generateMessage, generateBid };
