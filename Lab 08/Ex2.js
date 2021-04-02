console.log('== System ==');
console.log('platform:', process.platform);
console.log('architecture:', process.arch);

console.log('== NodeJS ==');
console.log('Node version:', process.versions.node);
console.log('v8 version:', process.versions.v8);
console.log('libuv version:', process.versions.zlib);

console.log('== Process ==');
console.log('pid:', process.pid);
console.log('title:', process.title);
console.log('Directory:', process.cwd());