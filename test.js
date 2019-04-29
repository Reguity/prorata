const prorata = require('./index');

let r = prorata({
  seats: 349,
  votes: {
    S:  1775861,
    M:  1236648,
    SD: 1101069,
    C:  537289,
    V:  496018,
    KD: 397857,
    L:  342661,
    MP: 271498
  },
  startDivisorFn: (numVotes) => numVotes / 1.2,
  divisorFn: (numVotes, seats) => numVotes / (1.4 * seats + 1)
});

console.warn(r);
