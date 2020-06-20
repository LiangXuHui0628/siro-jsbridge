# siro-jsbridge

## Introduce
This project is based on the JS part of [dsbridge](https://github.com/wendux/DSBridge-Android), which is rewritten after engineering.I hope it's useful for you。

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn build
```
# How to use

## In VUE main.js
```
import {SRJSBridge} from 'siro-jsbridge'
Vue.prototype.SRJSBridge = window.SRJSBridge;

then

SRJSBridge.invoke('getBluetoothDevice','getBluetoothDevice',(v)=>{
    console.log(v);
});
```



