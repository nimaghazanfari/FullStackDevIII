const buffer_array = Buffer.from([8, 6, 7, 5, 3, 0, 9]);
const buffer_string = Buffer.from('I\'m a string!', 'utf-8');

console.log(buffer_string.toString());
console.log(buffer_string.toString('hex'));
console.log(buffer_string.toString('utf-8').substring(0, 10));

const concat = Buffer.concat([buffer_array, buffer_string]);
console.log(concat);
console.log(JSON.stringify(concat.toJSON()));