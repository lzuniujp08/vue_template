
// const ipcRenderer = require('electron').ipcRenderer;
// window.Socket = {
//     callback:{},
//     init:function(){
//         var self = this;
//         ipcRenderer.on('senddata',function(sender,data){
//             if(!data){
//                 return;
//             }
//             if(!!data.event&&typeof(self.callback[data['event']])=='function'){
//                 if(!!data.data){
//                     data.data = null;
//                 }
//                 self.callback[data['event']](data.data);
//             }
//         });
//     },
//     sendTo:function(tag,event,data){
//         if(!tag||!event){
//             return;
//         }
//         if(!data){
//             data = null;
//         }
//         ipcRenderer.send('senddata',{tag:tag,event:event,data:data});
//     },
//     sendAll:function(){
//         ipcRenderer.send('senddata',{tag:'ALLWINDOWS',event:event,data:data});
//     },
//     send:function(event,data){
//         if(!event){
//             return;
//         }
//         if(!data){
//             data = null;
//         }
//         this.sendTo('main',event,data);
//     },
//     on:function(event,callback){
//         var self = this;
//         self.callback[event] = callback;
//     }
// }
// Socket.init();