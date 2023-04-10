/*
async函数返回值


结论：async函数在抛出返回值时，会根据返回值类型开启不同数目的微任务

return结果值：非thenable、非promise（不等待）
return结果值：thenable（等待 1个then的时间）
return结果值：promise（等待 2个then的时间）



await右值类型区别


接非 thenable 类型，会立即向微任务队列添加一个微任务then，但不需等待

接 thenable 类型，需要等待一个 then 的时间之后执行

接Promise类型(有确定的返回值)，会立即向微任务队列添加一个微任务then，但不需等待

TC 39 对await 后面是 promise 的情况如何处理进行了一次修改，移除了额外的两个微任务，在早期版本，依然会等待两个 then 的时间
*/