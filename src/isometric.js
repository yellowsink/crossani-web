// Cartesian coordinates to isometric coordinates
export const c2i = ([x, y]) => [(x - y), (x + y) / 2];

// This is how much a tile needs to be offset by to tightly tile in isometric space
//export const tileVector = [.5, .25];
export const tileVector = [.5, .5];

// Isometric coordinates to cartesian coordinates
// not actually used lmao
//export const i2c = ([x, y]) => [(x + y) / 2, (x - y)];