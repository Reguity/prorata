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
  divisorFn: (votes, seats) => seats == 0 ? votes / 1.2 : votes / (2 * seats + 1)
});

console.warn(r);
