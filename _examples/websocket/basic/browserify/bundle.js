(function(){function b(d,e,g){function a(j,i){if(!e[j]){if(!d[j]){var f="function"==typeof require&&require;if(!i&&f)return f(j,!0);if(h)return h(j,!0);var c=new Error("Cannot find module '"+j+"'");throw c.code="MODULE_NOT_FOUND",c}var k=e[j]={exports:{}};d[j][0].call(k.exports,function(b){var c=d[j][1][b];return a(c||b)},k,k.exports,b,d,e,g)}return e[j].exports}for(var h="function"==typeof require&&require,c=0;c<g.length;c++)a(g[c]);return a}return b})()({1:[function(a){function b(a){i.innerHTML+=a+"\n"}function c(a){console.log(a),window.alert(a)}function d(a){const c=document.getElementById("input"),d=document.getElementById("sendBtn");d.disabled=!1,d.onclick=function(){const d=c.value;c.value="",a.emit("chat",d),b("Me: "+d)}}const e=a("neffos.js");var f="https:"==document.location.protocol?"wss":"ws",g=document.location.port?":"+document.location.port:"",h=f+"://"+document.location.hostname+g+"/echo",i=document.getElementById("output");(async function(){try{const a=await e.dial(h,{default:{_OnNamespaceConnected:function(a,c){b("connected to namespace: "+c.Namespace),d(a)},_OnNamespaceDisconnect:function(a,c){b("disconnected from namespace: "+c.Namespace)},_OnAnyEvent:function(a,b){e.isSystemEvent(b.Event)||console.log(b)},chat:function(a,c){b(c.Body)}}});a.connect("default")}catch(a){c(a)}})()},{"neffos.js":3}],2:[function(a,b){function c(){throw new Error("setTimeout has not been defined")}function d(){throw new Error("clearTimeout has not been defined")}function e(a){if(l===setTimeout)return setTimeout(a,0);if((l===c||!l)&&setTimeout)return l=setTimeout,setTimeout(a,0);try{return l(a,0)}catch(b){try{return l.call(null,a,0)}catch(b){return l.call(this,a,0)}}}function f(a){if(m===clearTimeout)return clearTimeout(a);if((m===d||!m)&&clearTimeout)return m=clearTimeout,clearTimeout(a);try{return m(a)}catch(b){try{return m.call(null,a)}catch(b){return m.call(this,a)}}}function g(){q&&o&&(q=!1,o.length?p=o.concat(p):r=-1,p.length&&h())}function h(){if(!q){var a=e(g);q=!0;for(var b=p.length;b;){for(o=p,p=[];++r<b;)o&&o[r].run();r=-1,b=p.length}o=null,q=!1,f(a)}}function j(a,b){this.fun=a,this.array=b}function k(){}var l,m,n=b.exports={};(function(){try{l="function"==typeof setTimeout?setTimeout:c}catch(a){l=c}try{m="function"==typeof clearTimeout?clearTimeout:d}catch(a){m=d}})();var o,p=[],q=!1,r=-1;n.nextTick=function(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];p.push(new j(a,b)),1!==p.length||q||e(h)},j.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=k,n.addListener=k,n.once=k,n.off=k,n.removeListener=k,n.removeAllListeners=k,n.emit=k,n.prependListener=k,n.prependOnceListener=k,n.listeners=function(){return[]},n.binding=function(){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},{}],3:[function(a,b,c){(function(d,e){function f(a){return!("_OnNamespaceConnect"!==a&&"_OnNamespaceConnected"!==a&&"_OnNamespaceDisconnect"!==a&&"_OnRoomJoin"!==a&&"_OnRoomJoined"!==a&&"_OnRoomLeave"!==a&&"_OnRoomLeft"!==a)}function g(a){return!(void 0!==a)||!(null!==a)||(""==a||"string"==typeof a||a instanceof String?0===a.length||""===a:!!(a instanceof Error)&&g(a.message))}function h(a){return g(a)?"":a.replace(E,"@%!semicolon@%!")}function i(a){return g(a)?"":a.replace(F,";")}function j(a){if(a.IsNative&&g(a.wait))return a.Body;var b="0",c="0",d=a.Body||"";return a.isError&&(d=a.Err,b="1"),a.isNoOp&&(c="1"),[a.wait||"",h(a.Namespace),h(a.Room),h(a.Event),b,c,d].join(";")}function k(a,b,c){if(0==c)return[a];var d=a.split(b,c);if(d.length==c){var e=d.join(b)+b;return d.push(a.substr(e.length)),d}return[a]}function l(a,b){var c=new D;if(0==a.length)return c.isInvalid=!0,c;var d=k(a,";",6);if(7!=d.length)return b?(c.Event="_OnNativeMessage",c.Body=a):c.isInvalid=!0,c;c.wait=d[0],c.Namespace=i(d[1]),c.Room=i(d[2]),c.Event=i(d[3]),c.isError="1"==d[4]||!1,c.isNoOp="1"==d[5]||!1;var e=d[6];return g(e)?c.Body="":c.isError?c.Err=e:c.Body=e,c.isInvalid=!1,c.IsForced=!1,c.IsLocal=!1,c.IsNative=b&&"_OnNativeMessage"==c.Event||!1,c}function m(){if(!v){var a=d.hrtime();return"$"+1e9*a[0]+a[1]}var b=window.performance.now();return"$"+b.toString()}function n(a){return a+";".repeat(6)}function o(a,b){return a.events.has(b.Event)?a.events.get(b.Event)(a,b):a.events.has("_OnAnyEvent")?a.events.get("_OnAnyEvent")(a,b):null}function p(a){return null===a||a===void 0||"undefined"==typeof a}function q(a,b){if(p(a))return p(b)||b("connHandler is empty."),null;var c=new Map,d=new Map,e=0;if(Object.keys(a).forEach(function(b){e++;var f=a[b];if(f instanceof Function)d.set(b,f);else if(f instanceof Map)c.set(b,f);else{var g=new Map;Object.keys(f).forEach(function(a){g.set(a,f[a])}),c.set(b,g)}}),0<d.size){if(e!=d.size)return p(b)||b("all keys of connHandler should be events, mix of namespaces and event callbacks is not supported "+d.size+" vs total "+e),null;c.set("",d)}return c}function r(a,b){return a.has(b)?a.get(b):null}function s(a,b,c){return-1==a.indexOf("ws")&&(a="ws://"+a),new Promise(function(d,e){WebSocket||e("WebSocket is not accessible through this browser.");var f=q(b,e);if(!p(f)){var h=new WebSocket(a,c),i=new N(h,f);h.binaryType="arraybuffer",h.onmessage=function(a){var b=i.handle(a);return g(b)?void(i.isAcknowledged()&&d(i)):void e(b)},h.onopen=function(){h.send("M")},h.onerror=function(a){i.close(),e(a)}}})}var t=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})},u=this&&this.__generator||function(a,b){function c(a){return function(b){return d([a,b])}}function d(c){if(e)throw new TypeError("Generator is already executing.");for(;k;)try{if(e=1,h&&(i=2&c[0]?h["return"]:c[0]?h["throw"]||((i=h["return"])&&i.call(h),0):h.next)&&!(i=i.call(h,c[1])).done)return i;switch((h=0,i)&&(c=[2&c[0],i.value]),c[0]){case 0:case 1:i=c;break;case 4:return k.label++,{value:c[1],done:!1};case 5:k.label++,h=c[1],c=[0];continue;case 7:c=k.ops.pop(),k.trys.pop();continue;default:if((i=k.trys,!(i=0<i.length&&i[i.length-1]))&&(6===c[0]||2===c[0])){k=0;continue}if(3===c[0]&&(!i||c[1]>i[0]&&c[1]<i[3])){k.label=c[1];break}if(6===c[0]&&k.label<i[1]){k.label=i[1],i=c;break}if(i&&k.label<i[2]){k.label=i[2],k.ops.push(c);break}i[2]&&k.ops.pop(),k.trys.pop();continue;}c=b.call(a,k)}catch(a){c=[6,a],h=0}finally{e=i=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}var e,h,i,j,k={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return j={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(j[Symbol.iterator]=function(){return this}),j},v="undefined"!=typeof window;WebSocket=v?window.WebSocket:a("ws");var w="_OnNamespaceConnected",x="_OnNamespaceDisconnect",y="_OnRoomJoin",z="_OnRoomJoined",A="_OnRoomLeave",B="_OnRoomLeft",C="_OnNativeMessage",D=function(){function a(){}return a.prototype.isConnect=function(){return"_OnNamespaceConnect"==this.Event||!1},a.prototype.isDisconnect=function(){return this.Event==x||!1},a.prototype.isRoomJoin=function(){return this.Event==y||!1},a.prototype.isRoomLeft=function(){return this.Event==B||!1},a.prototype.isWait=function(){return!g(this.wait)&&(this.wait[0]=="#"||this.wait[0]=="$"||!1)},a}(),E=new RegExp(";","g"),F=new RegExp("@%!semicolon@%!","g"),G=function(){function a(a,b){this.nsConn=a,this.name=b}return a.prototype.emit=function(a,b){var c=new D;return c.Namespace=this.nsConn.namespace,c.Room=this.name,c.Event=a,c.Body=b,this.nsConn.conn.write(c)},a.prototype.leave=function(){var a=new D;return a.Namespace=this.nsConn.namespace,a.Room=this.name,a.Event=A,this.nsConn.askRoomLeave(a)},a}(),H=function(){function a(a,b,c){this.conn=a,this.namespace=b,this.events=c,this.rooms=new Map}return a.prototype.emit=function(a,b){var c=new D;return c.Namespace=this.namespace,c.Event=a,c.Body=b,this.conn.write(c)},a.prototype.ask=function(a,b){var c=new D;return c.Namespace=this.namespace,c.Event=a,c.Body=b,this.conn.ask(c)},a.prototype.joinRoom=function(a){return t(this,void 0,void 0,function(){return u(this,function(b){switch(b.label){case 0:return[4,this.askRoomJoin(a)];case 1:return[2,b.sent()];}})})},a.prototype.room=function(a){return this.rooms.get(a)},a.prototype.leaveAll=function(){return t(this,void 0,void 0,function(){var a,b=this;return u(this,function(){return a=new D,a.Namespace=this.namespace,a.Event=B,a.IsLocal=!0,this.rooms.forEach(function(c,d){return t(b,void 0,void 0,function(){var b;return u(this,function(c){switch(c.label){case 0:a.Room=d,c.label=1;case 1:return c.trys.push([1,3,,4]),[4,this.askRoomLeave(a)];case 2:return c.sent(),[3,4];case 3:return b=c.sent(),[2,b];case 4:return[2];}})})}),[2,null]})})},a.prototype.forceLeaveAll=function(a){var b=this,c=new D;c.Namespace=this.namespace,c.Event=A,c.IsForced=!0,c.IsLocal=a,this.rooms.forEach(function(a,d){c.Room=d,o(b,c),b.rooms.delete(d),c.Event=B,o(b,c),c.Event=A})},a.prototype.disconnect=function(){var a=new D;return a.Namespace=this.namespace,a.Event=x,this.conn.askDisconnect(a)},a.prototype.askRoomJoin=function(a){var b=this;return new Promise(function(c,d){return t(b,void 0,void 0,function(){var b,e,f,h;return u(this,function(i){switch(i.label){case 0:if(b=this.rooms.get(a),void 0!==b)return c(b),[2];e=new D,e.Namespace=this.namespace,e.Room=a,e.Event=y,e.IsLocal=!0,i.label=1;case 1:return i.trys.push([1,3,,4]),[4,this.conn.ask(e)];case 2:return i.sent(),[3,4];case 3:return f=i.sent(),d(f),[2];case 4:return(h=o(this,e),!g(h))?(d(h),[2]):(b=new G(this,a),this.rooms.set(a,b),e.Event=z,o(this,e),c(b),[2]);}})})})},a.prototype.askRoomLeave=function(a){return t(this,void 0,void 0,function(){var b,c;return u(this,function(d){switch(d.label){case 0:if(!this.rooms.has(a.Room))return[2,K];d.label=1;case 1:return d.trys.push([1,3,,4]),[4,this.conn.ask(a)];case 2:return d.sent(),[3,4];case 3:return b=d.sent(),[2,b];case 4:return(c=o(this,a),!g(c))?[2,c]:(this.rooms.delete(a.Room),a.Event=B,o(this,a),[2,null]);}})})},a.prototype.replyRoomJoin=function(a){if(!(g(a.wait)||a.isNoOp)){if(!this.rooms.has(a.Room)){var b=o(this,a);if(!g(b))return a.Err=b.message,void this.conn.write(a);this.rooms.set(a.Room,new G(this,a.Room)),a.Event=z,o(this,a)}this.conn.writeEmptyReply(a.wait)}},a.prototype.replyRoomLeave=function(a){return g(a.wait)||a.isNoOp?void 0:this.rooms.has(a.Room)?void(o(this,a),this.rooms.delete(a.Room),this.conn.writeEmptyReply(a.wait),a.Event=B,o(this,a)):void this.conn.writeEmptyReply(a.wait)},a}(),I=new Error("invalid payload"),J=new Error("bad namespace"),K=new Error("bad room"),L=new Error("use of closed connection"),M=new Error("write closed"),N=function(){function a(a,b){var c=this;this.conn=a,this._isAcknowledged=!1,this.namespaces=b;var d=b.has("");this.allowNativeMessages=d&&b.get("").has(C),this.queue=[],this.waitingMessages=new Map,this.connectedNamespaces=new Map,this.closed=!1,this.conn.onclose=function(){return c.close(),null}}return a.prototype.isAcknowledged=function(){return this._isAcknowledged},a.prototype.handle=function(a){if(!this._isAcknowledged){var b=this.handleAck(a.data);return null==b?(this._isAcknowledged=!0,this.handleQueue()):this.conn.close(),b}return this.handleMessage(a.data)},a.prototype.handleAck=function(a){var b=a[0];switch(b){case"A":var c=a.slice(1);this.ID=c;break;case"H":var d=a.slice(1);return new Error(d);default:return this.queue.push(a),null;}},a.prototype.handleQueue=function(){var a=this;null==this.queue||0==this.queue.length||this.queue.forEach(function(b,c){a.queue.splice(c,1),a.handleMessage(b)})},a.prototype.handleMessage=function(a){var b=l(a,this.allowNativeMessages);if(b.isInvalid)return I;if(b.IsNative&&this.allowNativeMessages){var c=this.namespace("");return o(c,b)}if(b.isWait()){var d=this.waitingMessages.get(b.wait);if(null!=d)return void d(b)}var e=this.namespace(b.Namespace);switch(b.Event){case"_OnNamespaceConnect":this.replyConnect(b);break;case x:this.replyDisconnect(b);break;case y:if(void 0!==e){e.replyRoomJoin(b);break}case A:if(void 0!==e){e.replyRoomLeave(b);break}default:if(void 0===e)return J;b.IsLocal=!1;var f=o(e,b);if(!g(f))return b.Err=f.message,this.write(b),f;}return null},a.prototype.connect=function(a){return this.askConnect(a)},a.prototype.waitServerConnect=function(a){var b=this;return p(this.waitServerConnectNotifiers)&&(this.waitServerConnectNotifiers=new Map),new Promise(function(c){return t(b,void 0,void 0,function(){var b=this;return u(this,function(){return this.waitServerConnectNotifiers.set(a,function(){b.waitServerConnectNotifiers.delete(a),c(b.namespace(a))}),[2]})})})},a.prototype.namespace=function(a){return this.connectedNamespaces.get(a)},a.prototype.replyConnect=function(a){if(!(g(a.wait)||a.isNoOp)){var b=this.namespace(a.Namespace);if(void 0!==b)return void this.writeEmptyReply(a.wait);var c=r(this.namespaces,a.Namespace);return p(c)?(a.Err=J.message,void this.write(a)):void(b=new H(this,a.Namespace,c),this.connectedNamespaces.set(a.Namespace,b),this.writeEmptyReply(a.wait),a.Event=w,o(b,a),!p(this.waitServerConnectNotifiers)&&0<this.waitServerConnectNotifiers.size&&this.waitServerConnectNotifiers.has(a.Namespace)&&this.waitServerConnectNotifiers.get(a.Namespace)())}},a.prototype.replyDisconnect=function(a){if(!(g(a.wait)||a.isNoOp)){var b=this.namespace(a.Namespace);return void 0===b?void this.writeEmptyReply(a.wait):void(b.forceLeaveAll(!0),this.connectedNamespaces.delete(a.Namespace),this.writeEmptyReply(a.wait),o(b,a))}},a.prototype.ask=function(a){var b=this;return new Promise(function(c,d){return b.isClosed()?void d(L):(a.wait=m(),b.waitingMessages.set(a.wait,function(a){return a.isError?void d(new Error(a.Err)):void c(a)}),!b.write(a))?void d(M):void 0})},a.prototype.askConnect=function(a){var b=this;return new Promise(function(c,d){return t(b,void 0,void 0,function(){var b,e,f,h,i;return u(this,function(j){switch(j.label){case 0:if(b=this.namespace(a),void 0!==b)return c(b),[2];if(e=r(this.namespaces,a),p(e))return d(J),[2];if(f=new D,f.Namespace=a,f.Event="_OnNamespaceConnect",f.IsLocal=!0,b=new H(this,a,e),h=o(b,f),!g(h))return d(h),[2];j.label=1;case 1:return j.trys.push([1,3,,4]),[4,this.ask(f)];case 2:return j.sent(),[3,4];case 3:return i=j.sent(),d(i),[2];case 4:return this.connectedNamespaces.set(a,b),f.Event=w,o(b,f),c(b),[2];}})})})},a.prototype.askDisconnect=function(a){return t(this,void 0,void 0,function(){var b,c;return u(this,function(d){switch(d.label){case 0:if(b=this.namespace(a.Namespace),void 0===b)return[2,J];d.label=1;case 1:return d.trys.push([1,3,,4]),[4,this.ask(a)];case 2:return d.sent(),[3,4];case 3:return c=d.sent(),[2,c];case 4:return b.forceLeaveAll(!0),this.connectedNamespaces.delete(a.Namespace),a.IsLocal=!0,[2,o(b,a)];}})})},a.prototype.isClosed=function(){return this.closed||this.conn.readyState==this.conn.CLOSED||!1},a.prototype.write=function(a){if(this.isClosed())return!1;if(!a.isConnect()&&!a.isDisconnect()){var b=this.namespace(a.Namespace);if(void 0===b)return!1;if(!g(a.Room)&&!a.isRoomJoin()&&!a.isRoomLeft()&&!b.rooms.has(a.Room))return!1}return this.conn.send(j(a)),!0},a.prototype.writeEmptyReply=function(a){this.conn.send(n(a))},a.prototype.close=function(){var a=this;if(!this.closed){var b=new D;b.Event=x,b.IsForced=!0,b.IsLocal=!0,this.connectedNamespaces.forEach(function(c){c.forceLeaveAll(!0),b.Namespace=c.namespace,o(c,b),a.connectedNamespaces.delete(c.namespace)}),this.waitingMessages.clear(),this.conn.readyState===this.conn.OPEN&&this.conn.close(),this.closed=!0}},a}();(function(){var a={dial:s,isSystemEvent:f,OnNamespaceConnect:"_OnNamespaceConnect",OnNamespaceConnected:w,OnNamespaceDisconnect:x,OnRoomJoin:y,OnRoomJoined:z,OnRoomLeave:A,OnRoomLeft:B,OnAnyEvent:"_OnAnyEvent",OnNativeMessage:C,Message:D,Room:G,NSConn:H,Conn:N,ErrInvalidPayload:I,ErrBadNamespace:J,ErrBadRoom:K,ErrClosed:L,ErrWrite:M};if("undefined"!=typeof c)c=a,b.exports=a;else{var d="object"==typeof self&&self.self===self&&self||"object"==typeof e&&e.global===e&&e;d.neffos=a}})()}).call(this,a("_process"),"undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global)},{_process:2,ws:4}],4:[function(a,b){'use strict';b.exports=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}},{}]},{},[1]);