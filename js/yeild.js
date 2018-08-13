// 声明一个生成器函数
function* countAppleSales () {
    let saleList = [3, 7, 5];
    for (let i = 0; i < saleList.length; i++) {
        yield saleList[i];
    }
}

// 一旦生成器函数已定义，可以通过构造一个迭代器来使用它。
let appleStore = countAppleSales(); // Generator { }
console.log(appleStore.next()); // { value: 3, done: false }
console.log(appleStore.next()); // { value: 7, done: false }
console.log(appleStore.next()); // { value: 5, done: false }
console.log(appleStore.next()); // { value: undefined, done: true }