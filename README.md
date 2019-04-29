# prorata
Proportional allocation of seats in a parliament determined by party votes,
allocation of issued shares by shareowners and similar.

# Installation
```
npm install prorata
```

Example use. Determine the seats in the 2018 Swedish election
```js
const prorata = require('prorata');
let allocation = prorata({
 seats: 349, // Number of seats in the Swedish Riksdag
 votes: { // Votes by party
   S:  1775861,
   M:  1236648,
   SD: 1101069,
   C:  537289,
   V:  496018,
   KD: 397857,
   L:  342661,
   MP: 271498
 },
 /* Custom divisor callbacks. We use a Modified Sainte-Laguë method ("Jämkade uddatalsmetoden") */
 startDiviserFn: (votes) => votes / 1.2,
 divisorFn: (votes, seats) => votes / (2 * seats + 1)
});
/* => {
  S: 101,
  M: 70,
  SD: 63,
  C: 30,
  V: 28,
  KD: 23,
  L: 19,
  MP: 15
}*/
```
