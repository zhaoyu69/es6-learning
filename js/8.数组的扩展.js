// ========================== 扩展运算符 ==========================
// 扩展运算符（spread）是三个点（...）
// function f(v, w, x, y, z) { }
// const args = [0, 1];
// f(-1, ...args, 2, ...[3]);
//
// const arr = [
//     ...(x > 0 ? ['a'] : []),
//     'b',
// ];

// 替代函数的 apply 方法
// // ES5 的写法
// function f(x, y, z) {
//     // ...
// }
// var args = [0, 1, 2];
// f.apply(null, args);
//
// // ES6的写法
// function f(x, y, z) {
//     // ...
// }
// let args = [0, 1, 2];
// f(...args);

// // ES5的 写法
// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// Array.prototype.push.apply(arr1, arr2);
//
// // ES6 的写法
// let arr1 = [0, 1, 2];
// let arr2 = [3, 4, 5];
// arr1.push(...arr2);

// // ES5
// new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// // ES6
// new Date(...[2015, 1, 1]);

// 扩展运算符的应用
//（1）复制数组（深克隆）
// const a1 = [1, 2];
// // 写法一
// const a2 = [...a1];
// // 写法二
// const [...a2] = a1;

//（2）合并数组（浅克隆）
// 修改原数组 新拼接的数组会改变
// const arr1 = ['a', 'b'];
// const arr2 = ['c'];
// const arr3 = ['d', 'e'];
//
// console.log([...arr1, ...arr2, ...arr3]);

//（3）与解构赋值结合（只能放在参数的最后一位，否则会报错，和函数参数相同。）
// const [first, ...rest] = [1, 2, 3, 4, 5];
// first // 1
// rest  // [2, 3, 4, 5]
//
// const [first, ...rest] = [];
// first // undefined
// rest  // []
//
// const [first, ...rest] = ["foo"];
// first  // "foo"
// rest   // []

//（4）字符串
// console.log([...'hello']);

// 能够正确识别四个字节的 Unicode 字符。
// 'x\uD83D\uDE80y'.length // 4
// [...'x\uD83D\uDE80y'].length // 3

// function length(str){
//     return [...str].length;
// }

//（5）实现了 Iterator 接口的对象
// nodeList是部署了Iterator接口的对象
// let nodeList = document.querySelectorAll('div');
// let array = [...nodeList];

// let arrayLike = {
//     '0': 'a',
//     '1': 'b',
//     '2': 'c',
//     length: 3
// };
//
// let array = Array.from(arrayLike);
// // TypeError: Cannot spread non-iterable object.
// let arr = [...array];
// console.log(arr);

//（6）Map 和 Set 结构，Generator 函数
// let map = new Map([
//     [1, 'one'],
//     [2, 'two'],
//     [3, 'three'],
// ]);
//
// let arr = [...map.keys()]; // [1, 2, 3]
// console.log(arr);
//
// const go = function*(){
//     yield 1;
//     yield 2;
//     yield 3;
// };
//
// console.log([...go()]); // [1, 2, 3]

// ============== Array.from() ================
// 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
// 所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。

// Array.from({ length: 3 });
// // [ undefined, undefined, undefined ]
//
// // Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
// Array.from([1, 2, 3], (x) => x * x);
// // [1, 4, 9]
//
// // 将数组中布尔值为false的成员转为0。
// Array.from([1, , 2, , 3], (n) => n || 0)
// // [1, 0, 2, 0, 3]
//
// Array.from({ length: 2 }, () => 'jack')
// // ['jack', 'jack']
//
// // 将字符串转为数组，然后返回字符串的长度。能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
// function countSymbols(string) {
//     return Array.from(string).length;
// }

// ============= Array.of() ===============
// Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

// Array.of() // []
// Array.of(undefined) // [undefined]
// Array.of(1) // [1]
// Array.of(1, 2) // [1, 2]

// function ArrayOf(){
//     return [].slice.call(arguments);
// }

// ============================ 数组实例的 copyWithin() ===========================
// Array.prototype.copyWithin(target, start = 0, end = this.length)
/*
*target:从该位置开始替换数据。如果为负值，表示倒数。
start:从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
end:到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
*/
// // 将3号位复制到0号位
// [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// // [4, 2, 3, 4, 5]
//
// // -2相当于3号位，-1相当于4号位
//     [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// // [4, 2, 3, 4, 5]
//
// // 将3号位复制到0号位
//     [].copyWithin.call({length: 5, 3: 1}, 0, 3)
// // {0: 1, 3: 1, length: 5}
//
// // 将2号位到数组结束，复制到0号位
// let i32a = new Int32Array([1, 2, 3, 4, 5]);
// i32a.copyWithin(0, 2);
// // Int32Array [3, 4, 5, 4, 5]
//
// // 对于没有部署 TypedArray 的 copyWithin 方法的平台
// // 需要采用下面的写法
// [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// // Int32Array [4, 2, 3, 4, 5]

// =========================== 数组实例的 find() 和 findIndex() ==========================
// console.log([1, 4, -5, 10, -21].find((n) => n < 0));
//
// [1, 5, 10, 15].find(function(value, index, arr) {
//     console.log(value, index, arr);
//     return value > 9;
// }); // 10

// findIndex 类似find，可识别NaN
// [NaN].indexOf(NaN)
// // -1
// [NaN].findIndex(y => Object.is(NaN, y));
// // 0

// =========================== 数组实例的 fill() ============================
// ['a', 'b', 'c'].fill(7); //[7, 7, 7]
// ['a', 'b', 'c'].fill(7, 1, 2); //['a', 7, 'c']
//
// //被赋值的是同一内存地址的对象 不是深拷贝对象
// let arr = new Array(3).fill({name: "Mike"});
// arr[0].name = "Ben";
// console.log(arr);
// // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

// =================== 数组实例的 entries()，keys() 和 values() =====================
// ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。
// 它们都返回一个遍历器对象 用for...of循环进行遍历
// keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
// let obj = ['a', 'b'];
// for(let idx of obj.keys()){
//     console.log(idx);
// }
// for(let elem of obj.values()){
//     console.log(elem);
// }
// for(let [idx, elem] of obj.entries()){
//     console.log(idx, elem);
// }

// ====================== 数组实例的 includes() =========================
// [NaN].includes(NaN);
// // true

// =================== 数组实例的 flat()，flatMap() =====================
// flat()将嵌套的数组“拉平” 可选参数，拉平的层，1,2,...,Infinity(都拉成一维数组)
// console.log([1, 2, [3, [4, 5]]].flat());
// // [1, 2, 3, [4, 5]]
//
// console.log([1, 2, [3, [4, 5]]].flat(2));
// // [1, 2, 3, 4, 5]
//
// // flatMap()先执行map函数，再flat拉平。只能展开一层数组。
// [2, 3, 4].flatMap((x) => [x, x * 2]);

// ========================= 数组的空位 ==========================
// const arr = new Array(3);
// console.log(arr); //[empty × 3]
// empty != undefined

// console.log(0 in [undefined, undefined, undefined]); // true
// console.log(0 in [, , ,]); // false

// ES6则是明确将空位转为undefined。
