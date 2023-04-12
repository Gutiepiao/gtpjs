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

obj = observable({
    name:'gtp'
})
// let actuator = (value)=>{
//     console.log('do something:::'+value)
// }
// observe(actuator)

// obj.name = 'zmj'

var object = {name:'gtp'}
var handler = {
  get(target, property, receiver) {
    console.log(target===object)
  },
}
var proxy = new Proxy(object, handler)
var o = Object.create(proxy)
console.log(o.value)// 15


class Observer {
    caches = {}; // 事件中心
    
    // eventName事件名-独一无二, fn订阅后执行的自定义行为
    on (eventName, fn){ 
      this.caches[eventName] = this.caches[eventName] || [];
      this.caches[eventName].push(fn);
    }
    
    // 发布 => 将订阅的事件进行统一执行
    emit (eventName, data) { 
      if (this.caches[eventName]) {
        this.caches[eventName]
        .forEach(fn => fn(data));
      }
    }
    // 取消订阅 => 若fn不传, 直接取消该事件所有订阅信息
    off (eventName, fn) { 
      if (this.caches[eventName]) {
        const newCaches = fn 
          ? this.caches[eventName].filter(e => e !== fn) 
          : [];
        this.caches[eventName] = newCaches;
      }
    }
  
  }
  

  ob = new Observer();

l1 = (data) => console.log(`l1_${data}`)
l2 = (data) => console.log(`l2_${data}`)

ob.on('event1',l1)
ob.on('event1',l2)

//发布订阅
ob.emit('event1',789) 
// l1_789
// l2_789

// 取消，订阅l1
ob.off('event1',l1)

ob.emit('event1',567)
//l2_567

