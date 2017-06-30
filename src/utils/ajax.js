import Vue from 'vue'
import axios from 'axios'
function comErrorCallback(error) {
  console.log('comErrorCallback>>>>>',error)
}
function comCodeToast(code) {
  
}
var ajax = {
  get (url, params,isComCodeToast) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(response => {
        //console.log(url+'>>>>>>',response)
        if (response.status === 200) {
          if (isComCodeToast) {
            resolve(response)
            return
          }
          if (response.data.code === '000000'){
            resolve(response)
          } else {
            comCodeToast(response.data.code)
          }
        } else {
          comErrorCallback(response)
        }
      }).catch((error) => {
        if (reject) {
          reject(error)
        } else {
          comErrorCallback(error)
        } 
      })
    })
  },
  post (url, params,isComCodeToast) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(response => {
        if (response.status === 200) {
          if (isComCodeToast) {
            resolve(response)
            return
          }
          if (response.data.code === '000000'){
            resolve(response)
          } else {
            comCodeToast(response.data.code)
          }
        } else {
          comErrorCallback(response)
        }
      }).catch((error) => {
        if (reject) {
          reject(error)
        } else {
          comErrorCallback(error)
        } 
      })
    })
  },
}
export default{
  install: () => {
    Vue.prototype.$http = ajax
  }
}