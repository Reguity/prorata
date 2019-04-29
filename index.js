module.exports = ({ seats, votes, startDivisorFn, divisorFn }) => {
  let byShareowner = Object.entries(votes)
    .reduce((ack, [ shareowner, numVotes ]) => ({
      ...ack,
      [shareowner]: {
        seats: 0,
        votes: numVotes,
        divisor: startDivisorFn(numVotes)
      }
    }), {});
  while (seats > 0) {
    let shareowner = Object.entries(byShareowner).reduce((a, [ k, v ]) => a.divisor > v.divisor ? a : v, { divisor: 0 });
    shareowner.seats++;
    shareowner.divisor = divisorFn(shareowner.votes, shareowner.seats);
    seats--;
  }
  return Object.entries(byShareowner).reduce((a, [k, v]) => ({ ...a, [k]: v.seats }), {});
};
