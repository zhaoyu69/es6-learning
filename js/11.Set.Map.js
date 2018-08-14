// ========================== Set =============================
// 没有重复的值
// const s = new Set();
//
// [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
//
// for (let i of s) {
//     console.log(i);
// }
// // 2 3 5 4
//
// const set = new Set([1, 2, 3, 4, 4]);
// console.log([...set]);
//
// // 去除数组的重复成员
// const array = [1,2,3,4,2,3,4,1,2,3,4];
// console.log([...new Set(array)]);

// Set 内部判断两个值是否不同，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
// let set = new Set();
// let a = NaN;
// let b = NaN;
// set.add(a);
// set.add(b);
// console.log([...set]); //[NAN]

// 两个对象总是不相等的。
// let set = new Set();
//
// set.add({});
// console.log(set.size) // 1
//
// set.add({});
// console.log(set.size) // 2

// ======================= Set 实例的属性和方法 =======================
// 实例属性：1. constructor：构造函数，默认就是Set函数。 2. size：Set成员总数。
// 实例方法：1. add 2. delete 3. has 4. clear
// let s = new Set();
// s.add(1).add(2).add(2);
// console.log(s.size); // 2
// console.log(s.has(2)); // true
// console.log(s.has(3)); // false
// s.delete(2);
// s.has(2); // false

// Array.from 把 Set结构转为数组。
// const items = new Set([1, 2, 3, 4, 5]);
// const array = Array.from(items);

// 去除数组重复成员
// function dedupe(array) {
//     return Array.from(new Set(array));
// }
//
// dedupe([1, 1, 2, 3]) // [1, 2, 3]

// 遍历操作：1. keys 2. values 3. entries 4. forEach
// let set = new Set(['red', 'green', 'blue']);
//
// for (let item of set.keys()) {
//     console.log(item);
// }
// // red
// // green
// // blue
//
// for (let item of set.values()) {
//     console.log(item);
// }
// // red
// // green
// // blue
//
// for (let item of set.entries()) {
//     console.log(item);
// }
// // ["red", "red"]
// // ["green", "green"]
// // ["blue", "blue"]

// // 直接用for...of遍历Set
// let set = new Set(['red', 'green', 'blue']);
//
// for (let x of set) {
//     console.log(x);
// }
//
// // forEach
// set.forEach((s, key) => console.log(s, key));

// 遍历的应用
// 数组的map和filter方法也可以间接用于 Set。
// let set = new Set([1, 2, 3]);
// set = new Set([...set].map(x => x * 2));
// // 返回Set结构：{2, 4, 6}
//
// let set = new Set([1, 2, 3, 4, 5]);
// set = new Set([...set].filter(x => (x % 2) == 0));
// // 返回Set结构：{2, 4}

// 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
// let a = new Set([1, 2, 3]);
// let b = new Set([4, 3, 2]);
//
// // 并集
// let union = new Set([...a, ...b]);
// // Set {1, 2, 3, 4}
//
// // 交集
// let intersect = new Set([...a].filter(x => b.has(x)));
// // set {2, 3}
//
// // 差集
// let difference = new Set([...a].filter(x => !b.has(x)));
// // Set {1}

// 改变原有的Set结构
// // 方法一
// let set = new Set([1, 2, 3]);
// set = new Set([...set].map(val => val * 2));
// // set的值是2, 4, 6
//
// 方法二
// let set = new Set([1, 2, 3]);
// set = new Set(Array.from(set, val => val * 2));
// // set的值是2, 4, 6

// =========================== WeakSet ============================
// 与Set类似，区别在于 1. 成员只能是对象 2. 成员都是弱引用，随时可能消失，不能遍历
// 1. add 2. delete 3. has

// =========================== Map ==============================
// Object "字符串-值" Map "值-值" 键不局限于字符串表示
// 1. set 2. get 3. delte 4. has
// const m = new Map();
// const o = {p: 'Hello World'};
//
// m.set(o, 'content')
// m.get(o) // "content"
//
// m.has(o) // true
// m.delete(o) // true
// m.has(o) // false

// const map = new Map([
//     ['name', '张三'],
//     ['title', 'Author']
// ]);
//
// map.size // 2
// map.has('name') // true
// map.get('name') // "张三"
// map.has('title') // true
// map.get('title') // "Author"

// Set和Map都可以用来生成新的Map。
// const set = new Set([
//     ['foo', 1],
//     ['bar', 2]
// ]);
// const m1 = new Map(set);
// m1.get('foo') // 1
//
// const m2 = new Map([['baz', 3]]);
// const m3 = new Map(m2);
// m3.get('baz') // 3

