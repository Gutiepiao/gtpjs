const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);


const observable = obj => new Proxy(obj, {
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    // notify
    queuedObservers.forEach(observer => observer(value));
    return result;
  }
});

// obj = observable({
//     name:'gtp'
// })
// let actuator = (value)=>{
//     console.log('do something:::'+value)
// }
// observe(actuator)

// obj.name = 'zmj'

var object = {name:'gtp'}
var handler = {
  get(target, property, receiver) {
    console.log(o===receiver)
  },
}
var proxy = new Proxy(object, handler)
var o = Object.create(proxy)
console.log(o.value)// 15



