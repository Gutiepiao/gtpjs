// const PENDING = "pending";
// const FULFILLED = "fulfilled";
// const REJECTED = "rejected";


// class MyPromise {
//     constructor(executor) {
//         // executor执行器，进入会立即执行
//         executor(this.resolve, this.reject);
//     }
//     // 初始状态
   
//     state = PENDING;
//     // 存储异步回调
//     fulfilledCallBacks = [];
//     rejectedCallBacks = [];

//     // 成功之后的值
//     value = null;
//     // 失败的原因
//     reason = null;

//     // 成功回调
//     resolve = value => {
       
//         if (this.state === PENDING) {
//             this.state = FULFILLED;
            
//             this.value = value;
//             // 是否有回调可执行
            
//             while (this.fulfilledCallBacks.length) {
                
//                 this.fulfilledCallBacks.shift()();
//             }
//         }
//     };
//     // 拒绝回调
//     reject = reason => {
//         if (this.state === PENDING) {
//             this.state = REJECTED;
//             this.reason = reason;
//             while (this.rejectedCallBacks.length) this.rejectedCallBacks.shift()(reason);
//         }
//     };
//     then(onFulfilled, onRejected) {
//         const promise2 = new MyPromise((resolve, reject) => {
//             // 成功
//             const resolveMicrotask = () => {
//                 // 避免循环调用
//                 // 这里有个问题，promise2这里其实是拿不到的，因为promise2还没有完成初始化
//                 // 这里需要用创建一个微任务，在微任务里面调用到的就是初始化完成的promise2。
//                 // 我们用 queueMicrotask 创建微任务
//                 queueMicrotask(() => {
//                     // then执行阶段错误捕获
//                     try {
//                         const x = onFulfilled(this.value);
//                         this.resolvePromise(x, promise2, resolve, reject);
                        
//                     } catch (err) {
//                         reject(err);
//                     }
                    
//                 });
//             };
//             // 失败
//             const rejectMicrotask = () => {
//                 queueMicrotask(() => {
//                     try {
//                         const x = onRejected(this.reason);
//                         this.resolvePromise(x, promise2, resolve, reject);
//                     } catch (err) {
//                         reject(err);
//                     }
//                 });
//             };
            
//             if (this.state === FULFILLED){
               
//                 resolveMicrotask();
//             } 
//             else if (this.state === REJECTED) rejectMicrotask();
//             else if (this.state === PENDING) {
//                 // 存储回调
//                 this.fulfilledCallBacks.push(resolveMicrotask);
//                 this.rejectedCallBacks.push(rejectMicrotask);
//             }
//         });
//         return promise2;
//     }
//     resolvePromise(x, self, resolve, reject) {
//         // 不能返回自身（循环调用）
        
//         if (x === self) {
//             return reject(new TypeError("The promise and the return value are the same"));
//         }
//         // 如果返回一个Promise对象，调用其then方法
//         if (x instanceof MyPromise) {
//             x.then(resolve, reject);
//         } else {
//             // 直接返回X
//             resolve(x);
//         }
//     }
// }

class insPromise{
    constructor(callback){
        callback(this.resolve,this.reject)
    }
    resolve = (value)=>{
        if(this.state === 'pending'){
            this.state === 'fufilled'
            this.value = value
            while(this.fulfilledCallBacks.length>0){
                this.fulfilledCallBacks.shift()()
            }
        }
    }
    reject = (reason)=>{
        if(this.state==='pending'){
            this.state === 'rejected'
            this.reason = reason
            while(this.rejectedCallBacks.length>0){
                this.rejectedCallBacks.shift()()
            }
        }
    }
    fulfilledCallBacks = []
    rejectedCallBacks = []
    value = null
    reason = null
    state = 'pending'
    then =(onFulfilled,onRejected)=>{
        const promise2 = new insPromise((resolve,reject)=>{
            const resolveMicrotask = ()=>{
                queueMicrotask(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        this.resolvePromise(x,promise2,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                    
                })
            }
            const rejectMicrotask = ()=>{
                queueMicrotask(()=>{
                    try{
                        let x = onRejected(this.reason)
                        this.resolvePromise(x,promise2,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                    
                })
            }
            if(this.state === 'fufilled'){
                resolveMicrotask()
            }
            if(this.state === 'rejected'){
                rejectMicrotask()
            }
            if(this.state === 'pending'){
                this.fulfilledCallBacks.push(resolveMicrotask)
                this.rejectedCallBacks.push(rejectMicrotask)
            }
        })
        return promise2
    }
    resolvePromise = (x,promise2,resolve,reject)=>{
        if(x===promise2){
            return reject('cant self')
        }else if(x instanceof insPromise){
            x.then(resolve,reject)
        }else{
            resolve(x)
        }
    }
    
}
var aa = new insPromise((resolve)=>{
    setTimeout(()=>{
        resolve('2222')
    },300)
})
aa.then(res=>{
    console.log(res)
}).then(res=>{
    console.log(res)
})
