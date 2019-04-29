module.exports = ({ seats, votes, divisorFn }) => {
  let byParty = Object.entries(votes)
    .reduce((ack, [ party, numVotes ]) => ({
      ...ack,
      [party]: {
        seats: 0,
        votes: numVotes,
        divisor: numVotes
      }
    }), {});
  while (seats > 0) {
    let party = Object.entries(byParty).reduce((a, [ k, v ]) => a.divisor > v.divisor ? a : v, { divisor: 0 });
    party.seats++;
    party.divisor = divisorFn(party.votes, party.seats);
    seats--;
  }
  return Object.entries(byParty).reduce((a, [k, v]) => ({ ...a, [k]: v.seats }), {});
};
