module.exports = ({ seats, votes, startDivisorFn, divisorFn }) => {
  let seatsLeft = seats;
  const numParties = Object.keys(votes).length;
  const totalNumVotes = Object.values(votes).reduce((ack, v) => ack + v, 0);
  const autoThreshold = 2 * numParties;
  let byParty = Object.entries(votes)
    .reduce((ack, [ party, numVotes ]) => {
      const allocatedSeats = Math.max(0, Math.floor(seats * numVotes / totalNumVotes) - autoThreshold) || 0;
      seatsLeft -= allocatedSeats;
      return {
        ...ack,
        [party]: {
          seats: allocatedSeats,
          votes: numVotes,
          divisor: allocatedSeats === 0 ? startDivisorFn(numVotes) : divisorFn(numVotes, allocatedSeats)
        }
      }
    }, {});
  while (seatsLeft > 0) {
    let party = Object.entries(byParty).reduce((a, [ k, v ]) => a.divisor > v.divisor ? a : v, { divisor: 0 });
    party.seats++;
    party.divisor = divisorFn(party.votes, party.seats);
    seatsLeft--;
  }
  return Object.entries(byParty).reduce((a, [k, v]) => ({ ...a, [k]: v.seats }), {});
};
