import{s as Ct,u as T,c as H,r as Ca,n as Sr,i as Ae,d as ne,h as Ot,p as Ht,a as D,w as pn,o as Y,b as q,e as z,f as Qt,g as Se,F as je,j as Rt,t as Oa,k as Pr,l as le,m as v,q as J,v as K,x as de,y as R,z as kt,A as Oe,_ as hn,B as ie,C as Ze,D as Cr,E as Ra,G as Le,H as $a,P as La,I as gn,J as Ia,K as Or,L as Rr,T as zn,M as Ve,N as $r,O as Lr,Q as Ir}from"./settings.d8b8695f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const $e=typeof window<"u";function Nr(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const M=Object.assign;function Vt(e,t){const n={};for(const a in t){const r=t[a];n[a]=ce(r)?r.map(e):e(r)}return n}const We=()=>{},ce=Array.isArray,Tr=/\/$/,Mr=e=>e.replace(Tr,"");function Yt(e,t,n="/"){let a,r={},i="",o="";const c=t.indexOf("#");let s=t.indexOf("?");return c<s&&c>=0&&(s=-1),s>-1&&(a=t.slice(0,s),i=t.slice(s+1,c>-1?c:t.length),r=e(i)),c>-1&&(a=a||t.slice(0,c),o=t.slice(c,t.length)),a=jr(a!=null?a:t,n),{fullPath:a+(i&&"?")+i+o,path:a,query:r,hash:o}}function zr(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Dn(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Dr(e,t,n){const a=t.matched.length-1,r=n.matched.length-1;return a>-1&&a===r&&ze(t.matched[a],n.matched[r])&&Na(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function ze(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Na(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Fr(e[n],t[n]))return!1;return!0}function Fr(e,t){return ce(e)?Fn(e,t):ce(t)?Fn(t,e):e===t}function Fn(e,t){return ce(t)?e.length===t.length&&e.every((n,a)=>n===t[a]):e.length===1&&e[0]===t}function jr(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),a=e.split("/");let r=n.length-1,i,o;for(i=0;i<a.length;i++)if(o=a[i],o!==".")if(o==="..")r>1&&r--;else break;return n.slice(0,r).join("/")+"/"+a.slice(i-(i===a.length?1:0)).join("/")}var Je;(function(e){e.pop="pop",e.push="push"})(Je||(Je={}));var Ge;(function(e){e.back="back",e.forward="forward",e.unknown=""})(Ge||(Ge={}));function Br(e){if(!e)if($e){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Mr(e)}const Ur=/^[^#]+#/;function Hr(e,t){return e.replace(Ur,"#")+t}function Vr(e,t){const n=document.documentElement.getBoundingClientRect(),a=e.getBoundingClientRect();return{behavior:t.behavior,left:a.left-n.left-(t.left||0),top:a.top-n.top-(t.top||0)}}const $t=()=>({left:window.pageXOffset,top:window.pageYOffset});function Yr(e){let t;if("el"in e){const n=e.el,a=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?a?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;t=Vr(r,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function jn(e,t){return(history.state?history.state.position-t:-1)+e}const Zt=new Map;function Xr(e,t){Zt.set(e,t)}function Wr(e){const t=Zt.get(e);return Zt.delete(e),t}let Gr=()=>location.protocol+"//"+location.host;function Ta(e,t){const{pathname:n,search:a,hash:r}=t,i=e.indexOf("#");if(i>-1){let c=r.includes(e.slice(i))?e.slice(i).length:1,s=r.slice(c);return s[0]!=="/"&&(s="/"+s),Dn(s,"")}return Dn(n,e)+a+r}function qr(e,t,n,a){let r=[],i=[],o=null;const c=({state:d})=>{const g=Ta(e,location),b=n.value,k=t.value;let C=0;if(d){if(n.value=g,t.value=d,o&&o===b){o=null;return}C=k?d.position-k.position:0}else a(g);r.forEach(p=>{p(n.value,b,{delta:C,type:Je.pop,direction:C?C>0?Ge.forward:Ge.back:Ge.unknown})})};function s(){o=n.value}function u(d){r.push(d);const g=()=>{const b=r.indexOf(d);b>-1&&r.splice(b,1)};return i.push(g),g}function l(){const{history:d}=window;!d.state||d.replaceState(M({},d.state,{scroll:$t()}),"")}function f(){for(const d of i)d();i=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",l)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",l),{pauseListeners:s,listen:u,destroy:f}}function Bn(e,t,n,a=!1,r=!1){return{back:e,current:t,forward:n,replaced:a,position:window.history.length,scroll:r?$t():null}}function Kr(e){const{history:t,location:n}=window,a={value:Ta(e,n)},r={value:t.state};r.value||i(a.value,{back:null,current:a.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(s,u,l){const f=e.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?e:e.slice(f))+s:Gr()+e+s;try{t[l?"replaceState":"pushState"](u,"",d),r.value=u}catch(g){console.error(g),n[l?"replace":"assign"](d)}}function o(s,u){const l=M({},t.state,Bn(r.value.back,s,r.value.forward,!0),u,{position:r.value.position});i(s,l,!0),a.value=s}function c(s,u){const l=M({},r.value,t.state,{forward:s,scroll:$t()});i(l.current,l,!0);const f=M({},Bn(a.value,s,null),{position:l.position+1},u);i(s,f,!1),a.value=s}return{location:a,state:r,push:c,replace:o}}function Qr(e){e=Br(e);const t=Kr(e),n=qr(e,t.state,t.location,t.replace);function a(i,o=!0){o||n.pauseListeners(),history.go(i)}const r=M({location:"",base:e,go:a,createHref:Hr.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function Zr(e){return typeof e=="string"||e&&typeof e=="object"}function Ma(e){return typeof e=="string"||typeof e=="symbol"}const ge={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},za=Symbol("");var Un;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Un||(Un={}));function De(e,t){return M(new Error,{type:e,[za]:!0},t)}function fe(e,t){return e instanceof Error&&za in e&&(t==null||!!(e.type&t))}const Hn="[^/]+?",Jr={sensitive:!1,strict:!1,start:!0,end:!0},ei=/[.+*?^${}()[\]/\\]/g;function ti(e,t){const n=M({},Jr,t),a=[];let r=n.start?"^":"";const i=[];for(const u of e){const l=u.length?[]:[90];n.strict&&!u.length&&(r+="/");for(let f=0;f<u.length;f++){const d=u[f];let g=40+(n.sensitive?.25:0);if(d.type===0)f||(r+="/"),r+=d.value.replace(ei,"\\$&"),g+=40;else if(d.type===1){const{value:b,repeatable:k,optional:C,regexp:p}=d;i.push({name:b,repeatable:k,optional:C});const h=p||Hn;if(h!==Hn){g+=10;try{new RegExp(`(${h})`)}catch(L){throw new Error(`Invalid custom RegExp for param "${b}" (${h}): `+L.message)}}let P=k?`((?:${h})(?:/(?:${h}))*)`:`(${h})`;f||(P=C&&u.length<2?`(?:/${P})`:"/"+P),C&&(P+="?"),r+=P,g+=20,C&&(g+=-8),k&&(g+=-20),h===".*"&&(g+=-50)}l.push(g)}a.push(l)}if(n.strict&&n.end){const u=a.length-1;a[u][a[u].length-1]+=.7000000000000001}n.strict||(r+="/?"),n.end?r+="$":n.strict&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function c(u){const l=u.match(o),f={};if(!l)return null;for(let d=1;d<l.length;d++){const g=l[d]||"",b=i[d-1];f[b.name]=g&&b.repeatable?g.split("/"):g}return f}function s(u){let l="",f=!1;for(const d of e){(!f||!l.endsWith("/"))&&(l+="/"),f=!1;for(const g of d)if(g.type===0)l+=g.value;else if(g.type===1){const{value:b,repeatable:k,optional:C}=g,p=b in u?u[b]:"";if(ce(p)&&!k)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const h=ce(p)?p.join("/"):p;if(!h)if(C)d.length<2&&(l.endsWith("/")?l=l.slice(0,-1):f=!0);else throw new Error(`Missing required param "${b}"`);l+=h}}return l||"/"}return{re:o,score:a,keys:i,parse:c,stringify:s}}function ni(e,t){let n=0;for(;n<e.length&&n<t.length;){const a=t[n]-e[n];if(a)return a;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function ai(e,t){let n=0;const a=e.score,r=t.score;for(;n<a.length&&n<r.length;){const i=ni(a[n],r[n]);if(i)return i;n++}if(Math.abs(r.length-a.length)===1){if(Vn(a))return 1;if(Vn(r))return-1}return r.length-a.length}function Vn(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const ri={type:0,value:""},ii=/[a-zA-Z0-9_]/;function oi(e){if(!e)return[[]];if(e==="/")return[[ri]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(g){throw new Error(`ERR (${n})/"${u}": ${g}`)}let n=0,a=n;const r=[];let i;function o(){i&&r.push(i),i=[]}let c=0,s,u="",l="";function f(){!u||(n===0?i.push({type:0,value:u}):n===1||n===2||n===3?(i.length>1&&(s==="*"||s==="+")&&t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:u,regexp:l,repeatable:s==="*"||s==="+",optional:s==="*"||s==="?"})):t("Invalid state to consume buffer"),u="")}function d(){u+=s}for(;c<e.length;){if(s=e[c++],s==="\\"&&n!==2){a=n,n=4;continue}switch(n){case 0:s==="/"?(u&&f(),o()):s===":"?(f(),n=1):d();break;case 4:d(),n=a;break;case 1:s==="("?n=2:ii.test(s)?d():(f(),n=0,s!=="*"&&s!=="?"&&s!=="+"&&c--);break;case 2:s===")"?l[l.length-1]=="\\"?l=l.slice(0,-1)+s:n=3:l+=s;break;case 3:f(),n=0,s!=="*"&&s!=="?"&&s!=="+"&&c--,l="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${u}"`),f(),o(),r}function si(e,t,n){const a=ti(oi(e.path),n),r=M(a,{record:e,parent:t,children:[],alias:[]});return t&&!r.record.aliasOf==!t.record.aliasOf&&t.children.push(r),r}function li(e,t){const n=[],a=new Map;t=Wn({strict:!1,end:!0,sensitive:!1},t);function r(l){return a.get(l)}function i(l,f,d){const g=!d,b=ci(l);b.aliasOf=d&&d.record;const k=Wn(t,l),C=[b];if("alias"in l){const P=typeof l.alias=="string"?[l.alias]:l.alias;for(const L of P)C.push(M({},b,{components:d?d.record.components:b.components,path:L,aliasOf:d?d.record:b}))}let p,h;for(const P of C){const{path:L}=P;if(f&&L[0]!=="/"){const N=f.record.path,S=N[N.length-1]==="/"?"":"/";P.path=f.record.path+(L&&S+L)}if(p=si(P,f,k),d?d.alias.push(p):(h=h||p,h!==p&&h.alias.push(p),g&&l.name&&!Xn(p)&&o(l.name)),b.children){const N=b.children;for(let S=0;S<N.length;S++)i(N[S],p,d&&d.children[S])}d=d||p,(p.record.components&&Object.keys(p.record.components).length||p.record.name||p.record.redirect)&&s(p)}return h?()=>{o(h)}:We}function o(l){if(Ma(l)){const f=a.get(l);f&&(a.delete(l),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(l);f>-1&&(n.splice(f,1),l.record.name&&a.delete(l.record.name),l.children.forEach(o),l.alias.forEach(o))}}function c(){return n}function s(l){let f=0;for(;f<n.length&&ai(l,n[f])>=0&&(l.record.path!==n[f].record.path||!Da(l,n[f]));)f++;n.splice(f,0,l),l.record.name&&!Xn(l)&&a.set(l.record.name,l)}function u(l,f){let d,g={},b,k;if("name"in l&&l.name){if(d=a.get(l.name),!d)throw De(1,{location:l});k=d.record.name,g=M(Yn(f.params,d.keys.filter(h=>!h.optional).map(h=>h.name)),l.params&&Yn(l.params,d.keys.map(h=>h.name))),b=d.stringify(g)}else if("path"in l)b=l.path,d=n.find(h=>h.re.test(b)),d&&(g=d.parse(b),k=d.record.name);else{if(d=f.name?a.get(f.name):n.find(h=>h.re.test(f.path)),!d)throw De(1,{location:l,currentLocation:f});k=d.record.name,g=M({},f.params,l.params),b=d.stringify(g)}const C=[];let p=d;for(;p;)C.unshift(p.record),p=p.parent;return{name:k,path:b,params:g,matched:C,meta:fi(C)}}return e.forEach(l=>i(l)),{addRoute:i,resolve:u,removeRoute:o,getRoutes:c,getRecordMatcher:r}}function Yn(e,t){const n={};for(const a of t)a in e&&(n[a]=e[a]);return n}function ci(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:ui(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function ui(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const a in e.components)t[a]=typeof n=="boolean"?n:n[a];return t}function Xn(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function fi(e){return e.reduce((t,n)=>M(t,n.meta),{})}function Wn(e,t){const n={};for(const a in e)n[a]=a in t?t[a]:e[a];return n}function Da(e,t){return t.children.some(n=>n===e||Da(e,n))}const Fa=/#/g,di=/&/g,mi=/\//g,vi=/=/g,pi=/\?/g,ja=/\+/g,hi=/%5B/g,gi=/%5D/g,Ba=/%5E/g,bi=/%60/g,Ua=/%7B/g,yi=/%7C/g,Ha=/%7D/g,wi=/%20/g;function bn(e){return encodeURI(""+e).replace(yi,"|").replace(hi,"[").replace(gi,"]")}function ki(e){return bn(e).replace(Ua,"{").replace(Ha,"}").replace(Ba,"^")}function Jt(e){return bn(e).replace(ja,"%2B").replace(wi,"+").replace(Fa,"%23").replace(di,"%26").replace(bi,"`").replace(Ua,"{").replace(Ha,"}").replace(Ba,"^")}function _i(e){return Jt(e).replace(vi,"%3D")}function Ei(e){return bn(e).replace(Fa,"%23").replace(pi,"%3F")}function xi(e){return e==null?"":Ei(e).replace(mi,"%2F")}function _t(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function Ai(e){const t={};if(e===""||e==="?")return t;const a=(e[0]==="?"?e.slice(1):e).split("&");for(let r=0;r<a.length;++r){const i=a[r].replace(ja," "),o=i.indexOf("="),c=_t(o<0?i:i.slice(0,o)),s=o<0?null:_t(i.slice(o+1));if(c in t){let u=t[c];ce(u)||(u=t[c]=[u]),u.push(s)}else t[c]=s}return t}function Gn(e){let t="";for(let n in e){const a=e[n];if(n=_i(n),a==null){a!==void 0&&(t+=(t.length?"&":"")+n);continue}(ce(a)?a.map(i=>i&&Jt(i)):[a&&Jt(a)]).forEach(i=>{i!==void 0&&(t+=(t.length?"&":"")+n,i!=null&&(t+="="+i))})}return t}function Si(e){const t={};for(const n in e){const a=e[n];a!==void 0&&(t[n]=ce(a)?a.map(r=>r==null?null:""+r):a==null?a:""+a)}return t}const Pi=Symbol(""),qn=Symbol(""),Lt=Symbol(""),yn=Symbol(""),en=Symbol("");function Ye(){let e=[];function t(a){return e.push(a),()=>{const r=e.indexOf(a);r>-1&&e.splice(r,1)}}function n(){e=[]}return{add:t,list:()=>e,reset:n}}function ye(e,t,n,a,r){const i=a&&(a.enterCallbacks[r]=a.enterCallbacks[r]||[]);return()=>new Promise((o,c)=>{const s=f=>{f===!1?c(De(4,{from:n,to:t})):f instanceof Error?c(f):Zr(f)?c(De(2,{from:t,to:f})):(i&&a.enterCallbacks[r]===i&&typeof f=="function"&&i.push(f),o())},u=e.call(a&&a.instances[r],t,n,s);let l=Promise.resolve(u);e.length<3&&(l=l.then(s)),l.catch(f=>c(f))})}function Xt(e,t,n,a){const r=[];for(const i of e)for(const o in i.components){let c=i.components[o];if(!(t!=="beforeRouteEnter"&&!i.instances[o]))if(Ci(c)){const u=(c.__vccOpts||c)[t];u&&r.push(ye(u,n,a,i,o))}else{let s=c();r.push(()=>s.then(u=>{if(!u)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const l=Nr(u)?u.default:u;i.components[o]=l;const d=(l.__vccOpts||l)[t];return d&&ye(d,n,a,i,o)()}))}}return r}function Ci(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Kn(e){const t=Ae(Lt),n=Ae(yn),a=H(()=>t.resolve(T(e.to))),r=H(()=>{const{matched:s}=a.value,{length:u}=s,l=s[u-1],f=n.matched;if(!l||!f.length)return-1;const d=f.findIndex(ze.bind(null,l));if(d>-1)return d;const g=Qn(s[u-2]);return u>1&&Qn(l)===g&&f[f.length-1].path!==g?f.findIndex(ze.bind(null,s[u-2])):d}),i=H(()=>r.value>-1&&Li(n.params,a.value.params)),o=H(()=>r.value>-1&&r.value===n.matched.length-1&&Na(n.params,a.value.params));function c(s={}){return $i(s)?t[T(e.replace)?"replace":"push"](T(e.to)).catch(We):Promise.resolve()}return{route:a,href:H(()=>a.value.href),isActive:i,isExactActive:o,navigate:c}}const Oi=ne({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Kn,setup(e,{slots:t}){const n=Ca(Kn(e)),{options:a}=Ae(Lt),r=H(()=>({[Zn(e.activeClass,a.linkActiveClass,"router-link-active")]:n.isActive,[Zn(e.exactActiveClass,a.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&t.default(n);return e.custom?i:Ot("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},i)}}}),Ri=Oi;function $i(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Li(e,t){for(const n in t){const a=t[n],r=e[n];if(typeof a=="string"){if(a!==r)return!1}else if(!ce(r)||r.length!==a.length||a.some((i,o)=>i!==r[o]))return!1}return!0}function Qn(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Zn=(e,t,n)=>e!=null?e:t!=null?t:n,Ii=ne({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const a=Ae(en),r=H(()=>e.route||a.value),i=Ae(qn,0),o=H(()=>{let u=T(i);const{matched:l}=r.value;let f;for(;(f=l[u])&&!f.components;)u++;return u}),c=H(()=>r.value.matched[o.value]);Ht(qn,H(()=>o.value+1)),Ht(Pi,c),Ht(en,r);const s=D();return pn(()=>[s.value,c.value,e.name],([u,l,f],[d,g,b])=>{l&&(l.instances[f]=u,g&&g!==l&&u&&u===d&&(l.leaveGuards.size||(l.leaveGuards=g.leaveGuards),l.updateGuards.size||(l.updateGuards=g.updateGuards))),u&&l&&(!g||!ze(l,g)||!d)&&(l.enterCallbacks[f]||[]).forEach(k=>k(u))},{flush:"post"}),()=>{const u=r.value,l=e.name,f=c.value,d=f&&f.components[l];if(!d)return Jn(n.default,{Component:d,route:u});const g=f.props[l],b=g?g===!0?u.params:typeof g=="function"?g(u):g:null,C=Ot(d,M({},b,t,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[l]=null)},ref:s}));return Jn(n.default,{Component:C,route:u})||C}}});function Jn(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const Va=Ii;function Ni(e){const t=li(e.routes,e),n=e.parseQuery||Ai,a=e.stringifyQuery||Gn,r=e.history,i=Ye(),o=Ye(),c=Ye(),s=Ct(ge);let u=ge;$e&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const l=Vt.bind(null,m=>""+m),f=Vt.bind(null,xi),d=Vt.bind(null,_t);function g(m,E){let y,A;return Ma(m)?(y=t.getRecordMatcher(m),A=E):A=m,t.addRoute(A,y)}function b(m){const E=t.getRecordMatcher(m);E&&t.removeRoute(E)}function k(){return t.getRoutes().map(m=>m.record)}function C(m){return!!t.getRecordMatcher(m)}function p(m,E){if(E=M({},E||s.value),typeof m=="string"){const $=Yt(n,m,E.path),W=t.resolve({path:$.path},E),He=r.createHref($.fullPath);return M($,W,{params:d(W.params),hash:_t($.hash),redirectedFrom:void 0,href:He})}let y;if("path"in m)y=M({},m,{path:Yt(n,m.path,E.path).path});else{const $=M({},m.params);for(const W in $)$[W]==null&&delete $[W];y=M({},m,{params:f(m.params)}),E.params=f(E.params)}const A=t.resolve(y,E),F=m.hash||"";A.params=l(d(A.params));const X=zr(a,M({},m,{hash:ki(F),path:A.path})),I=r.createHref(X);return M({fullPath:X,hash:F,query:a===Gn?Si(m.query):m.query||{}},A,{redirectedFrom:void 0,href:I})}function h(m){return typeof m=="string"?Yt(n,m,s.value.path):M({},m)}function P(m,E){if(u!==m)return De(8,{from:E,to:m})}function L(m){return O(m)}function N(m){return L(M(h(m),{replace:!0}))}function S(m){const E=m.matched[m.matched.length-1];if(E&&E.redirect){const{redirect:y}=E;let A=typeof y=="function"?y(m):y;return typeof A=="string"&&(A=A.includes("?")||A.includes("#")?A=h(A):{path:A},A.params={}),M({query:m.query,hash:m.hash,params:"path"in A?{}:m.params},A)}}function O(m,E){const y=u=p(m),A=s.value,F=m.state,X=m.force,I=m.replace===!0,$=S(y);if($)return O(M(h($),{state:typeof $=="object"?M({},F,$.state):F,force:X,replace:I}),E||y);const W=y;W.redirectedFrom=E;let He;return!X&&Dr(a,A,y)&&(He=De(16,{to:W,from:A}),Tn(A,A,!0,!1)),(He?Promise.resolve(He):x(W,A)).catch(ee=>fe(ee)?fe(ee,2)?ee:Ft(ee):Dt(ee,W,A)).then(ee=>{if(ee){if(fe(ee,2))return O(M({replace:I},h(ee.to),{state:typeof ee.to=="object"?M({},F,ee.to.state):F,force:X}),E||W)}else ee=re(W,A,!0,I,F);return V(W,A,ee),ee})}function Q(m,E){const y=P(m,E);return y?Promise.reject(y):Promise.resolve()}function x(m,E){let y;const[A,F,X]=Ti(m,E);y=Xt(A.reverse(),"beforeRouteLeave",m,E);for(const $ of A)$.leaveGuards.forEach(W=>{y.push(ye(W,m,E))});const I=Q.bind(null,m,E);return y.push(I),Re(y).then(()=>{y=[];for(const $ of i.list())y.push(ye($,m,E));return y.push(I),Re(y)}).then(()=>{y=Xt(F,"beforeRouteUpdate",m,E);for(const $ of F)$.updateGuards.forEach(W=>{y.push(ye(W,m,E))});return y.push(I),Re(y)}).then(()=>{y=[];for(const $ of m.matched)if($.beforeEnter&&!E.matched.includes($))if(ce($.beforeEnter))for(const W of $.beforeEnter)y.push(ye(W,m,E));else y.push(ye($.beforeEnter,m,E));return y.push(I),Re(y)}).then(()=>(m.matched.forEach($=>$.enterCallbacks={}),y=Xt(X,"beforeRouteEnter",m,E),y.push(I),Re(y))).then(()=>{y=[];for(const $ of o.list())y.push(ye($,m,E));return y.push(I),Re(y)}).catch($=>fe($,8)?$:Promise.reject($))}function V(m,E,y){for(const A of c.list())A(m,E,y)}function re(m,E,y,A,F){const X=P(m,E);if(X)return X;const I=E===ge,$=$e?history.state:{};y&&(A||I?r.replace(m.fullPath,M({scroll:I&&$&&$.scroll},F)):r.push(m.fullPath,F)),s.value=m,Tn(m,E,y,I),Ft()}let Z;function xr(){Z||(Z=r.listen((m,E,y)=>{if(!Mn.listening)return;const A=p(m),F=S(A);if(F){O(M(F,{replace:!0}),A).catch(We);return}u=A;const X=s.value;$e&&Xr(jn(X.fullPath,y.delta),$t()),x(A,X).catch(I=>fe(I,12)?I:fe(I,2)?(O(I.to,A).then($=>{fe($,20)&&!y.delta&&y.type===Je.pop&&r.go(-1,!1)}).catch(We),Promise.reject()):(y.delta&&r.go(-y.delta,!1),Dt(I,A,X))).then(I=>{I=I||re(A,X,!1),I&&(y.delta&&!fe(I,8)?r.go(-y.delta,!1):y.type===Je.pop&&fe(I,20)&&r.go(-1,!1)),V(A,X,I)}).catch(We)}))}let zt=Ye(),Nn=Ye(),ct;function Dt(m,E,y){Ft(m);const A=Nn.list();return A.length?A.forEach(F=>F(m,E,y)):console.error(m),Promise.reject(m)}function Ar(){return ct&&s.value!==ge?Promise.resolve():new Promise((m,E)=>{zt.add([m,E])})}function Ft(m){return ct||(ct=!m,xr(),zt.list().forEach(([E,y])=>m?y(m):E()),zt.reset()),m}function Tn(m,E,y,A){const{scrollBehavior:F}=e;if(!$e||!F)return Promise.resolve();const X=!y&&Wr(jn(m.fullPath,0))||(A||!y)&&history.state&&history.state.scroll||null;return Sr().then(()=>F(m,E,X)).then(I=>I&&Yr(I)).catch(I=>Dt(I,m,E))}const jt=m=>r.go(m);let Bt;const Ut=new Set,Mn={currentRoute:s,listening:!0,addRoute:g,removeRoute:b,hasRoute:C,getRoutes:k,resolve:p,options:e,push:L,replace:N,go:jt,back:()=>jt(-1),forward:()=>jt(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:Nn.add,isReady:Ar,install(m){const E=this;m.component("RouterLink",Ri),m.component("RouterView",Va),m.config.globalProperties.$router=E,Object.defineProperty(m.config.globalProperties,"$route",{enumerable:!0,get:()=>T(s)}),$e&&!Bt&&s.value===ge&&(Bt=!0,L(r.location).catch(F=>{}));const y={};for(const F in ge)y[F]=H(()=>s.value[F]);m.provide(Lt,E),m.provide(yn,Ca(y)),m.provide(en,s);const A=m.unmount;Ut.add(m),m.unmount=function(){Ut.delete(m),Ut.size<1&&(u=ge,Z&&Z(),Z=null,s.value=ge,Bt=!1,ct=!1),A()}}};return Mn}function Re(e){return e.reduce((t,n)=>t.then(()=>n()),Promise.resolve())}function Ti(e,t){const n=[],a=[],r=[],i=Math.max(t.matched.length,e.matched.length);for(let o=0;o<i;o++){const c=t.matched[o];c&&(e.matched.find(u=>ze(u,c))?a.push(c):n.push(c));const s=e.matched[o];s&&(t.matched.find(u=>ze(u,s))||r.push(s))}return[n,a,r]}function Ya(){return Ae(Lt)}function Mi(){return Ae(yn)}const Te=Ct({to:{},count:0}),zi=ne({__name:"ProgressBar",setup(e){const t=D(null);let n,a,r=0;return pn(Te,i=>{const o=t.value;if(!o)return;const c=i.count;if(c>0&&c>r)clearTimeout(a),a=setTimeout(()=>{n&&n.cancel(),n=o.animate({width:["0%","10%","80%","90%"],offset:[0,.01,.4,1],easing:"ease-out"},{fill:"forwards",duration:15e3}),o.classList.add("is-visible")},60);else if(c==0){clearTimeout(a),n&&n.pause();const s=getComputedStyle(o).width,u=o.offsetWidth;n&&n.cancel(),u<10?o.classList.remove("is-visible"):(n=o.animate({width:[s,"100%"]},{fill:"forwards",duration:300,easing:"ease-in"}),n.onfinish=()=>{o.classList.remove("is-visible")})}r=i.count}),(i,o)=>(Y(),q("div",{id:"progress-bar",ref_key:"progressBar",ref:t},null,512))}});const Di=ne({__name:"App",setup(e){const t=D(!1);async function n(){const a=Rt(),r=Oa();await Pr(a),await r.init(),t.value=!0}return n(),(a,r)=>(Y(),q(je,null,[z(zi),t.value?(Y(),Qt(T(Va),{key:0})):Se("",!0)],64))}}),Fi="/assets/logo.da9b9095.svg";const Xa=(e,t)=>{const n=e.__vccOpts||e;for(const[a,r]of t)n[a]=r;return n},ji={},Bi={id:"logo"},Ui=v("img",{alt:"Vue logo",src:Fi},null,-1);function Hi(e,t){return Y(),q("div",Bi,[Ui,le(" Banking ")])}const Wa=Xa(ji,[["render",Hi]]),Vi={id:"header"},Yi={class:"menu mobile"},Xi={class:"elements"},Wi={title:"Synchroniser les comptes",class:"element sync"},Gi={class:"elements"},qi={class:"icons"},Ki={title:"Synchroniser les comptes",class:"element sync"},Qi=ne({__name:"SiteHeader",setup(e){const t=D(!1),n=D(!1);function a(){n.value=!0,t.value=!t.value,document.body.classList.toggle("is-clipped")}function r(){t.value&&a()}function i(){n.value=!1}return(o,c)=>{const s=de("RouterLink"),u=de("font-awesome-icon");return Y(),q("header",Vi,[v("nav",null,[z(s,{to:{name:"home"},onClick:r},{default:J(()=>[z(Wa)]),_:1}),v("div",Yi,[v("div",Xi,[v("button",Wi,[z(u,{icon:"fa-solid fa-arrows-rotate"})]),v("button",{title:"Menu",onClick:a,class:K([{active:t.value},"element"])},[z(u,{icon:"fa-solid fa-bars"})],2)])]),v("div",{class:K(["menu",{active:t.value,fade:n.value}]),onTransitionend:i},[v("div",Gi,[z(s,{to:"/",class:"element",onClick:r},{default:J(()=>[le(" Mes comptes ")]),_:1}),z(s,{to:"/objectives",class:"element",onClick:r},{default:J(()=>[le(" Objectifs ")]),_:1}),z(s,{to:"/graphes",class:"element",onClick:r},{default:J(()=>[le(" \xC9volution ")]),_:1}),v("div",qi,[v("button",Ki,[z(u,{icon:"fa-solid fa-arrows-rotate"})]),z(s,{to:"/settings",title:"Param\xE8tres",class:"element",onClick:r},{default:J(()=>[z(u,{icon:"fa-solid fa-gear"})]),_:1}),z(s,{to:{name:"authSignOut"},title:"D\xE9connexion",class:"element",onClick:r},{default:J(()=>[z(u,{icon:"fa-solid fa-arrow-right-from-bracket"})]),_:1})])])],34)])])}}});const Zi={id:"home",class:"container"},Ji=ne({__name:"HomeView",setup(e){return(t,n)=>{const a=de("router-view");return Y(),q(je,null,[z(Qi),v("div",Zi,[z(a)])],64)}}});const eo={},to={id:"error",class:"container"},no={class:"title"},ao={class:"subtitle"},ro={class:"field"},io={class:"control is-not-fullwidth"};function oo(e,t){return Y(),q("div",to,[v("div",null,[v("h1",no,R(e.$t("err.404.0")),1),v("h2",ao,R(e.$t("err.404.1")),1),v("div",ro,[v("div",io,[v("button",{type:"submit",class:"input button is-large",onClick:t[0]||(t[0]=kt(n=>e.$router.push({name:"home"}),["prevent"]))},R(e.$t("err.404.2")),1)])])])])}const so=Xa(eo,[["render",oo]]),lo={class:"title"},co={class:"subtitle"},uo={key:0},fo={class:"notification is-danger","aria-live":"polite"},mo={class:"field"},vo={for:"email",class:"label"},po={class:"control"},ho={class:"field"},go={for:"pwd",class:"label"},bo={class:"help",style:{"text-align":"right"}},yo={class:"field"},wo={class:"control is-not-fullwidth"},ko=["disabled"],_o={class:"field"},Eo=ne({__name:"SigninView",setup(e){const t=Oe(),n=D(""),a=D(""),r=D(void 0),i=D(!1),o=D(!1);async function c(u){u.preventDefault(),o.value=!0,i.value=!1,t.signIn(n.value,a.value,l=>{switch(!0){case l.Logged:Be.push(t.redirectTo);break;case l.BadCredentials:r.value="auth.badEmailPwdErr",i.value=!0;break;case l.Internal:r.value="auth.internalErr";break}window.scrollTo({top:0,behavior:"smooth"}),o.value=!1})}function s(u){u.target instanceof Element&&u.target.classList.remove("is-danger")}return(u,l)=>{const f=de("RouterLink");return Y(),q(je,null,[v("h1",lo,R(u.$t("auth.signIn")),1),v("h2",co,R(u.$t("auth.signInSub")),1),z(hn,null,{default:J(()=>[r.value!==void 0?(Y(),q("div",uo,[v("div",fo,R(u.$t(r.value)),1)])):Se("",!0)]),_:1}),v("form",{onSubmit:c},[v("div",mo,[v("label",vo,R(u.$t("auth.email")),1),v("div",po,[ie(v("input",{id:"email",type:"email",class:K(["input",{"is-danger":i.value}]),placeholder:"harold.finch@octan.com",autocomplete:"email","onUpdate:modelValue":l[0]||(l[0]=d=>n.value=d),onFocus:s,required:""},null,34),[[Ze,n.value]])])]),v("div",ho,[v("label",go,R(u.$t("auth.pwd")),1),z(Cr,{id:"pwd",modelValue:a.value,"onUpdate:modelValue":l[1]||(l[1]=d=>a.value=d),placeholder:"XXXXXXXXX",autocomplete:"current-password",class:K({"is-danger":i.value}),onFocus:s,required:""},null,8,["modelValue","class"]),v("div",bo,[z(f,{to:{name:"authResetPwd"}},{default:J(()=>[le(R(u.$t("auth.resetPwdLink")),1)]),_:1})])]),v("div",yo,[v("div",wo,[v("button",{type:"submit",class:K(["input button is-large",{"is-loading":o.value}]),disabled:o.value},R(u.$t("auth.submitSignIn")),11,ko)])]),v("p",_o,[z(f,{to:{name:"authSignUp"}},{default:J(()=>[le(R(u.$t("auth.signUpLink")),1)]),_:1})])],32)],64)}}}),xo={class:"title"},Ao={class:"subtitle"},So={key:0},Po={class:"field"},Co={for:"email",class:"label"},Oo={class:"control"},Ro=["disabled"],$o={class:"field"},Lo={class:"control is-not-fullwidth"},Io=["disabled"],No={class:"field"},To={key:0},Mo={class:"field"},zo={for:"verifyCode",class:"label"},Do={class:"control"},Fo={class:"help"},jo={style:{"text-align":"right"}},Bo=["disabled"],Uo={class:"field"},Ho={class:"control is-not-fullwidth"},Vo=["disabled"],Yo={class:"field"},Xo={key:1},Wo={class:"notification is-danger"},Go={class:"field"},qo={data(){return{allowed:!1,internalErr:!1}},beforeRouteEnter(e,t,n){if(e.params.inviteCode!==void 0&&e.params.email!==void 0){n(a=>{const r=a;r.allowed=!0});return}Oe().checkSignUp(a=>{n(r=>{const i=r;a.internalErr?i.internalErr=!0:a.allowed&&(i.allowed=!0)})})}},ea=ne({...qo,__name:"SignupView",setup(e){const t=Oe(),n=Rt(),a=Mi(),r=Ya();Ra();const i=D(!1),o=D(new Date),c=D(new Date);let s=0;const u=D(void 0),l=a.params.invite!==void 0?a.params.invite.toString():" ",f=D(a.params.email!==void 0?a.params.email.toString():""),d=D(""),g=a.params.email!==void 0,b=D(!1),k=Ct({}),C=D(!1),p=D(!1);function h(x){if(x.preventDefault(),!u.value)return;N();const V=$a.value;for(const re in V)if(V[re]!==La.Good)return k.value={err:"auth.badPwdErr"},u.value.iPwdErr=!0,u.value.iPwdAgainErr=!0,S();if(u.value.inputPwd!==u.value.inputPwdAgain)return k.value={err:"auth.badPwdAgainErr"},u.value.iPwdAgainErr=!0,S();t.verifySignUp(f.value,n.locale.value,l,re=>{switch(!0){case re.ok:{const Z=new Date;Z.setSeconds(Z.getSeconds()+gn.codeResend),c.value=Z,i.value=!0,d.value="",Q(),k.value={success:"auth.verifySignUpOK"};break}case re.inviteCodeErr:k.value={err:"auth.inviteCodeErr"};break;case re.emailErr:i.value=!1,k.value={err:"auth.emailErr"},C.value=!0;break;case re.internalErr:k.value={err:"auth.internalErr"};break}return S()})}function P(x){x.preventDefault(),u.value&&(N(),t.signUp(f.value,u.value.inputPwd,n.locale.value,l,d.value,V=>{if(!u.value)return S();switch(!0){case V.ok:r.push({name:"home"});break;case V.pwdErr:i.value=!1,u.value.iPwdErr=!0,u.value.iPwdAgainErr=!0,k.value={err:"auth.badPwdErr"};break;case V.inviteCodeErr:k.value={err:"auth.inviteCodeErr"};break;case V.verifyCodeErr:p.value=!0,k.value={err:"auth.verifyCodeErr"};break;case V.internalErr:k.value={err:"auth.internalErr"};break}return S()}))}function L(x){x.preventDefault(),i.value?P(x):h(x)}function N(){b.value||!u.value||(b.value=!0,C.value=!1,u.value.iPwdErr=!1,u.value.iPwdAgainErr=!1,p.value=!1)}function S(){window.scrollTo({top:0,behavior:"smooth"}),b.value=!1}function O(x){x.target instanceof Element&&x.target.classList.remove("is-danger")}function Q(){clearInterval(s),o.value=new Date,s=setInterval(()=>{if(c.value<=o.value){o.value=c.value,clearInterval(s);return}o.value=new Date},1e3)}return(x,V)=>{const re=de("RouterLink");return Y(),q(je,null,[v("h1",xo,R(x.$t("auth.signUp")),1),v("h2",Ao,R(x.$t("auth.signUpSub")),1),z(hn,null,{default:J(()=>[T(k).err!==void 0||T(k).success!==void 0?(Y(),q("div",So,[v("div",{class:K(["notification",{"is-success":T(k).success,"is-danger":T(k).err}]),"aria-live":"polite"},R(x.$t(T(k).err!==void 0?T(k).err:T(k).success!==void 0?T(k).success:"")),3)])):Se("",!0)]),_:1}),x.allowed?(Y(),q("form",{key:0,onSubmit:L},[ie(v("div",null,[v("div",Po,[v("label",Co,R(x.$t("auth.email")),1),v("div",Oo,[ie(v("input",{id:"email",type:"email",class:K(["input",{"is-danger":C.value}]),autocomplete:"email",placeholder:"harold.finch@octan.com","onUpdate:modelValue":V[0]||(V[0]=Z=>f.value=Z),required:"",disabled:T(g),onFocus:O},null,42,Ro),[[Ze,f.value]])])]),z(Ia,{ref_key:"makePwd",ref:u},null,512),v("div",$o,[v("div",Lo,[v("button",{type:"submit",class:K(["input button is-large",{"is-loading":b.value}]),disabled:b.value},R(x.$t("auth.submitSignUp")),11,Io)])]),v("p",No,[z(re,{to:{name:"authSignIn"}},{default:J(()=>[le(R(x.$t("auth.signInLink")),1)]),_:1})])],512),[[Le,!i.value]]),i.value?(Y(),q("div",To,[v("div",Mo,[v("label",zo,R(x.$t("auth.verifyCode")),1),v("div",Do,[ie(v("input",{id:"verifyCode",type:"text",class:K(["input",{"is-danger":p.value}]),placeholder:"XXXXXXXXX",autocomplete:"one-time-code",spellcheck:"false",autocorrect:"off",autocapitalize:"off","onUpdate:modelValue":V[1]||(V[1]=Z=>d.value=Z),required:"",onFocus:O},null,34),[[Ze,d.value]])]),v("div",Fo,[v("p",jo,[v("button",{type:"button",onClick:h,class:"styleless-input resend",disabled:c.value.getTime()-o.value.getTime()>0},[le(R(x.$t("auth.verifyCodeLink"))+" ",1),ie(v("span",null," ("+R(x.$d(c.value.getTime()-o.value.getTime(),"minutes"))+") ",513),[[Le,c.value.getTime()-o.value.getTime()>0]])],8,Bo)])])]),v("div",Uo,[v("div",Ho,[v("button",{type:"submit",class:K(["input button is-large",{"is-loading":b.value}]),disabled:b.value},R(x.$t("auth.submitSignUp")),11,Vo)])]),v("p",Yo,[v("a",{href:"#",onClick:V[2]||(V[2]=kt(Z=>i.value=!i.value,["prevent"]))},R(x.$t("auth.goBackLink")),1)])])):Se("",!0)],32)):(Y(),q("div",Xo,[v("div",Wo,R(x.internalErr?x.$t("auth.internalErr"):x.$t("auth.signUpNotAllowedErr")),1),v("p",Go,[z(re,{to:{name:"authSignIn"}},{default:J(()=>[le(R(x.$t("auth.signInLink")),1)]),_:1})])]))],64)}}}),Ko={id:"auth",class:"container"},Qo={class:"auth-box"},Zo={class:"settings"},Jo=["title","disabled"],es=["selected"],ts=["title"],ns=ne({__name:"LayoutView",setup(e){Oe().user!=null&&Be.push("/");const n=Rt(),a=Oa(),r=D(!1);function i(o){o.target instanceof HTMLSelectElement&&(r.value=!0,Rr(n,o.target.value).then(()=>{r.value=!1}))}return(o,c)=>{const s=de("RouterLink"),u=de("font-awesome-icon"),l=de("router-view");return Y(),q("div",Ko,[v("div",Qo,[v("header",null,[z(s,{to:"/","aria-label":o.$t("auth.goBackSignInLink")},{default:J(()=>[z(Wa,{class:"logo"})]),_:1},8,["aria-label"]),v("div",Zo,[v("div",{class:K(["select",{"is-loading":r.value}])},[v("select",{title:o.$t("auth.changeLocale"),class:"input lang",onChange:i,disabled:r.value},[(Y(!0),q(je,null,Or(T(gn).locale.supported,f=>(Y(),q("option",{key:f,selected:T(n).locale.value==f},R(f),9,es))),128))],40,Jo)],2),v("button",{class:"theme",onClick:c[0]||(c[0]=(...f)=>T(a).toggleTheme&&T(a).toggleTheme(...f)),title:o.$t("auth.changeTheme")},[T(a).theme===T(zn).Dark?(Y(),Qt(u,{key:0,icon:"fa-solid fa-sun"})):Se("",!0),T(a).theme===T(zn).Light?(Y(),Qt(u,{key:1,icon:"fa-solid fa-moon"})):Se("",!0)],8,ts)])]),v("main",null,[z(l)])])])}}});const as=ne({__name:"SignoutView",setup(e){return Oe().logout(),Be.push({name:"home"}),()=>{}}}),rs={class:"title"},is={class:"subtitle"},os={key:0},ss={class:"field"},ls={for:"email",class:"label"},cs={class:"control"},us={class:"field"},fs={class:"control is-not-fullwidth"},ds=["disabled"],ms={class:"field"},vs={class:"field"},ps={for:"verifyCode",class:"label"},hs={class:"control"},gs={class:"help"},bs={style:{"text-align":"right"}},ys=["disabled"],ws={class:"field"},ks={class:"control is-not-fullwidth"},_s=["disabled"],Es={class:"field"},xs={class:"field"},As={for:"email",class:"label"},Ss={class:"control"},Ps=["value"],Cs={class:"field"},Os={class:"control is-not-fullwidth"},Rs=["disabled"],$s={class:"field"},Ls=ne({__name:"ResetPwdVue",setup(e){const t=Oe(),n=Rt(),a=Ya(),r=D(0),i=D(new Date),o=D(new Date);let c=0;const s=D(void 0),u=D(""),l=D(""),f=D(!1),d=D(!1),g=D(!1),b=Ct({});function k(){!s.value||(s.value.iPwdAgainErr=!1,s.value.iPwdErr=!1,d.value=!0,f.value=!1,g.value=!1)}function C(S){S.preventDefault(),k(),t.verifyResetPwd(u.value,n.locale.value,O=>{switch(!0){case O.ok:{const Q=new Date;Q.setSeconds(Q.getSeconds()+gn.codeResend),o.value=Q,r.value=1,l.value="",N(),b.value={success:"auth.verifySignUpOK"};break}case O.emailErr:r.value=0,b.value={err:"auth.emailErr"},f.value=!0;break;case O.internalErr:b.value={err:"auth.internalErr"};break}h()})}function p(S){S.preventDefault(),k(),t.checkResetPwd(u.value,l.value,O=>{switch(!0){case O.ok:{r.value=2,Ra(),s.value&&(s.value.inputPwd="",s.value.inputPwdAgain=""),b.value={};break}case O.verifyCodeErr:b.value={err:"auth.verifyCodeErr"},g.value=!0;break;case O.internalErr:b.value={err:"auth.internalErr"};break}h()})}function h(){window.scrollTo({top:0,behavior:"smooth"}),d.value=!1}function P(S){var Q;if(S.preventDefault(),!s.value)return;k();const O=$a.value;for(const x in O)if(O[x]!==La.Good)return b.value={err:"auth.badPwdErr"},s.value.iPwdErr=!0,s.value.iPwdAgainErr=!0,h();if(s.value.inputPwd!==s.value.inputPwdAgain)return b.value={err:"auth.badPwdAgainErr"},s.value.iPwdAgainErr=!0,h();t.resetPwd(l.value,u.value,(Q=s.value)==null?void 0:Q.inputPwd,x=>{if(s.value)switch(!0){case x.ok:{a.push({name:"home"});break}case x.pwdErr:{s.value.iPwdErr=!0,s.value.iPwdAgainErr=!0,b.value={err:"auth.badPwdErr"};break}case x.verifyCodeErr:{b.value={err:"auth.verifyCodeErr"};break}case x.internalErr:{b.value={err:"auth.internalErr"};break}}d.value=!1})}function L(S){S.target instanceof Element&&S.target.classList.remove("is-danger")}function N(){clearInterval(c),i.value=new Date,c=setInterval(()=>{if(o.value<=i.value){i.value=o.value,clearInterval(c);return}i.value=new Date},1e3)}return(S,O)=>{const Q=de("RouterLink");return Y(),q(je,null,[v("h1",rs,R(S.$t("auth.pwdReset")),1),v("h2",is,R(S.$t("auth.pwdResetSub")),1),z(hn,null,{default:J(()=>[T(b).err!==void 0||T(b).success!==void 0?(Y(),q("div",os,[v("div",{class:K(["notification",{"is-success":T(b).success,"is-danger":T(b).err}]),"aria-live":"polite"},R(S.$t(T(b).err!==void 0?T(b).err:T(b).success!==void 0?T(b).success:"")),3)])):Se("",!0)]),_:1}),ie(v("form",{onSubmit:C},[v("div",ss,[v("label",ls,R(S.$t("auth.email")),1),v("div",cs,[ie(v("input",{id:"email",type:"email",class:K(["input",{"is-danger":f.value}]),placeholder:"harold.finch@octan.com",autocomplete:"email","onUpdate:modelValue":O[0]||(O[0]=x=>u.value=x),onFocus:L,required:""},null,34),[[Ze,u.value]])])]),v("div",us,[v("div",fs,[v("button",{type:"submit",class:K(["input button is-large",{"is-loading":d.value}]),disabled:d.value},R(S.$t("auth.submitPwdReset")),11,ds)])]),v("p",ms,[z(Q,{to:{name:"authSignIn"}},{default:J(()=>[le(R(S.$t("auth.signInLink")),1)]),_:1})])],544),[[Le,r.value===0]]),ie(v("form",{onSubmit:p},[v("div",vs,[v("label",ps,R(S.$t("auth.verifyCode")),1),v("div",hs,[ie(v("input",{id:"verifyCode",type:"text",class:K(["input",{"is-danger":g.value}]),placeholder:"XXXXXXXXX",autocomplete:"one-time-code",spellcheck:"false",autocorrect:"off",autocapitalize:"off","onUpdate:modelValue":O[1]||(O[1]=x=>l.value=x),required:"",onFocus:L},null,34),[[Ze,l.value]])]),v("div",gs,[v("p",bs,[v("button",{type:"button",onClick:C,class:"styleless-input resend",disabled:o.value.getTime()-i.value.getTime()>0},[le(R(S.$t("auth.verifyCodeLink"))+" ",1),ie(v("span",null," ("+R(S.$d(o.value.getTime()-i.value.getTime(),"minutes"))+") ",513),[[Le,o.value.getTime()-i.value.getTime()>0]])],8,ys)])])]),v("div",ws,[v("div",ks,[v("button",{type:"submit",class:K(["input button is-large",{"is-loading":d.value}]),disabled:d.value},R(S.$t("auth.submitPwdReset")),11,_s)])]),v("p",Es,[v("a",{href:"#",onClick:O[2]||(O[2]=kt(x=>r.value=0,["prevent"]))},R(S.$t("auth.goBackLink")),1)])],544),[[Le,r.value===1]]),ie(v("form",{onSubmit:P,name:"register"},[v("div",xs,[v("label",As,R(S.$t("auth.email")),1),v("div",Ss,[v("input",{id:"email",type:"email",class:"input",disabled:"true",autocomplete:"email",value:u.value},null,8,Ps)])]),z(Ia,{ref_key:"makePwd",ref:s},null,512),v("div",Cs,[v("div",Os,[v("button",{type:"submit",class:K(["input button is-large",{"is-loading":d.value}]),disabled:d.value},R(S.$t("auth.submitPwdReset")),11,Rs)])]),v("p",$s,[v("a",{href:"#",onClick:O[3]||(O[3]=kt(x=>r.value=1,["prevent"]))},R(S.$t("auth.goBackLink")),1)])],544),[[Le,r.value===2]])],64)}}}),Is={path:"/auth",component:ns,redirect:{name:"authSignIn"},children:[{name:"authSignIn",path:"sign-in",component:Eo},{name:"authSignUp",path:"sign-up",component:ea},{path:"sign-up/invite/:inviteCode/:email",component:ea},{name:"authResetPwd",path:"reset-pwd",component:Ls},{name:"authSignOut",path:"sign-out",component:as,meta:{requiresAuth:!0}}],meta:{requiresAuth:!1}},Ns={name:"settings",path:"settings",component:()=>Ve(()=>import("./settings.d8b8695f.js").then(e=>e.R),["assets/settings.d8b8695f.js","assets/settings.fc8c4544.css"]),redirect:{name:"settingsAppearance"},children:[{name:"settingsAppearance",path:"appearance",component:()=>Ve(()=>import("./settings.d8b8695f.js").then(e=>e.S),["assets/settings.d8b8695f.js","assets/settings.fc8c4544.css"])},{name:"settingsEmail",path:"email",component:()=>Ve(()=>import("./settings.d8b8695f.js").then(e=>e.U),["assets/settings.d8b8695f.js","assets/settings.fc8c4544.css"])},{name:"settingsPwd",path:"pwd",component:()=>Ve(()=>import("./settings.d8b8695f.js").then(e=>e.V),["assets/settings.d8b8695f.js","assets/settings.fc8c4544.css"])},{name:"settingsDelete",path:"delete",component:()=>Ve(()=>import("./settings.d8b8695f.js").then(e=>e.W),["assets/settings.d8b8695f.js","assets/settings.fc8c4544.css"])}]},Be=Ni({history:Qr("/"),routes:[{path:"/",name:"home",component:Ji,children:[Ns]},{...Is},{path:"/:pathMatch(.*)*",component:so,meta:{everyone:!0}}]});Be.beforeEach(async e=>{Te.value={to:e,count:Te.value.count+1},e.meta.requiresAuth===void 0&&(e.meta.requiresAuth=!0);const t=Oe(),n=await t.isLoggedIn();if(e.meta.requiresAuth&&!n&&!e.meta.everyone)return t.redirectTo=e.fullPath,{name:"authSignIn"};if(!e.meta.requiresAuth&&n&&!e.meta.everyone)return{name:"home"}});Be.afterEach((e,t,n)=>{(n==null?void 0:n.type)!==8&&(Te.value.to===e||Te.value.to==e.redirectedFrom)&&(Te.value={to:{},count:0})});function ta(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ta(Object(n),!0).forEach(function(a){G(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ta(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function Et(e){return Et=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Et(e)}function Ts(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function na(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function Ms(e,t,n){return t&&na(e.prototype,t),n&&na(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function G(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function wn(e,t){return Ds(e)||js(e,t)||Ga(e,t)||Us()}function it(e){return zs(e)||Fs(e)||Ga(e)||Bs()}function zs(e){if(Array.isArray(e))return tn(e)}function Ds(e){if(Array.isArray(e))return e}function Fs(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function js(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var a=[],r=!0,i=!1,o,c;try{for(n=n.call(e);!(r=(o=n.next()).done)&&(a.push(o.value),!(t&&a.length===t));r=!0);}catch(s){i=!0,c=s}finally{try{!r&&n.return!=null&&n.return()}finally{if(i)throw c}}return a}}function Ga(e,t){if(!!e){if(typeof e=="string")return tn(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return tn(e,t)}}function tn(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Bs(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Us(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var aa=function(){},kn={},qa={},Ka=null,Qa={mark:aa,measure:aa};try{typeof window<"u"&&(kn=window),typeof document<"u"&&(qa=document),typeof MutationObserver<"u"&&(Ka=MutationObserver),typeof performance<"u"&&(Qa=performance)}catch{}var Hs=kn.navigator||{},ra=Hs.userAgent,ia=ra===void 0?"":ra,we=kn,B=qa,oa=Ka,ut=Qa;we.document;var he=!!B.documentElement&&!!B.head&&typeof B.addEventListener=="function"&&typeof B.createElement=="function",Za=~ia.indexOf("MSIE")||~ia.indexOf("Trident/"),ft,dt,mt,vt,pt,me="___FONT_AWESOME___",nn=16,Ja="fa",er="svg-inline--fa",Pe="data-fa-i2svg",an="data-fa-pseudo-element",Vs="data-fa-pseudo-element-pending",_n="data-prefix",En="data-icon",sa="fontawesome-i2svg",Ys="async",Xs=["HTML","HEAD","STYLE","SCRIPT"],tr=function(){try{return!0}catch{return!1}}(),j="classic",U="sharp",xn=[j,U];function ot(e){return new Proxy(e,{get:function(n,a){return a in n?n[a]:n[j]}})}var et=ot((ft={},G(ft,j,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),G(ft,U,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular"}),ft)),tt=ot((dt={},G(dt,j,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),G(dt,U,{solid:"fass",regular:"fasr"}),dt)),nt=ot((mt={},G(mt,j,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),G(mt,U,{fass:"fa-solid",fasr:"fa-regular"}),mt)),Ws=ot((vt={},G(vt,j,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),G(vt,U,{"fa-solid":"fass","fa-regular":"fasr"}),vt)),Gs=/fa(s|r|l|t|d|b|k|ss|sr)?[\-\ ]/,nr="fa-layers-text",qs=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Ks=ot((pt={},G(pt,j,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),G(pt,U,{900:"fass",400:"fasr"}),pt)),ar=[1,2,3,4,5,6,7,8,9,10],Qs=ar.concat([11,12,13,14,15,16,17,18,19,20]),Zs=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Ee={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},at=new Set;Object.keys(tt[j]).map(at.add.bind(at));Object.keys(tt[U]).map(at.add.bind(at));var Js=[].concat(xn,it(at),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",Ee.GROUP,Ee.SWAP_OPACITY,Ee.PRIMARY,Ee.SECONDARY]).concat(ar.map(function(e){return"".concat(e,"x")})).concat(Qs.map(function(e){return"w-".concat(e)})),qe=we.FontAwesomeConfig||{};function el(e){var t=B.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function tl(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(B&&typeof B.querySelector=="function"){var nl=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];nl.forEach(function(e){var t=wn(e,2),n=t[0],a=t[1],r=tl(el(n));r!=null&&(qe[a]=r)})}var rr={styleDefault:"solid",familyDefault:"classic",cssPrefix:Ja,replacementClass:er,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};qe.familyPrefix&&(qe.cssPrefix=qe.familyPrefix);var Fe=w(w({},rr),qe);Fe.autoReplaceSvg||(Fe.observeMutations=!1);var _={};Object.keys(rr).forEach(function(e){Object.defineProperty(_,e,{enumerable:!0,set:function(n){Fe[e]=n,Ke.forEach(function(a){return a(_)})},get:function(){return Fe[e]}})});Object.defineProperty(_,"familyPrefix",{enumerable:!0,set:function(t){Fe.cssPrefix=t,Ke.forEach(function(n){return n(_)})},get:function(){return Fe.cssPrefix}});we.FontAwesomeConfig=_;var Ke=[];function al(e){return Ke.push(e),function(){Ke.splice(Ke.indexOf(e),1)}}var be=nn,ue={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function rl(e){if(!(!e||!he)){var t=B.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=B.head.childNodes,a=null,r=n.length-1;r>-1;r--){var i=n[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return B.head.insertBefore(t,a),e}}var il="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function rt(){for(var e=12,t="";e-- >0;)t+=il[Math.random()*62|0];return t}function Ue(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function An(e){return e.classList?Ue(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function ir(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ol(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(ir(e[n]),'" ')},"").trim()}function It(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function Sn(e){return e.size!==ue.size||e.x!==ue.x||e.y!==ue.y||e.rotate!==ue.rotate||e.flipX||e.flipY}function sl(e){var t=e.transform,n=e.containerWidth,a=e.iconWidth,r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),c="rotate(".concat(t.rotate," 0 0)"),s={transform:"".concat(i," ").concat(o," ").concat(c)},u={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:s,path:u}}function ll(e){var t=e.transform,n=e.width,a=n===void 0?nn:n,r=e.height,i=r===void 0?nn:r,o=e.startCentered,c=o===void 0?!1:o,s="";return c&&Za?s+="translate(".concat(t.x/be-a/2,"em, ").concat(t.y/be-i/2,"em) "):c?s+="translate(calc(-50% + ".concat(t.x/be,"em), calc(-50% + ").concat(t.y/be,"em)) "):s+="translate(".concat(t.x/be,"em, ").concat(t.y/be,"em) "),s+="scale(".concat(t.size/be*(t.flipX?-1:1),", ").concat(t.size/be*(t.flipY?-1:1),") "),s+="rotate(".concat(t.rotate,"deg) "),s}var cl=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function or(){var e=Ja,t=er,n=_.cssPrefix,a=_.replacementClass,r=cl;if(n!==e||a!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),c=new RegExp("\\.".concat(t),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(c,".".concat(a))}return r}var la=!1;function Wt(){_.autoAddCss&&!la&&(rl(or()),la=!0)}var ul={mixout:function(){return{dom:{css:or,insertCss:Wt}}},hooks:function(){return{beforeDOMElementCreation:function(){Wt()},beforeI2svg:function(){Wt()}}}},ve=we||{};ve[me]||(ve[me]={});ve[me].styles||(ve[me].styles={});ve[me].hooks||(ve[me].hooks={});ve[me].shims||(ve[me].shims=[]);var se=ve[me],sr=[],fl=function e(){B.removeEventListener("DOMContentLoaded",e),xt=1,sr.map(function(t){return t()})},xt=!1;he&&(xt=(B.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(B.readyState),xt||B.addEventListener("DOMContentLoaded",fl));function dl(e){!he||(xt?setTimeout(e,0):sr.push(e))}function st(e){var t=e.tag,n=e.attributes,a=n===void 0?{}:n,r=e.children,i=r===void 0?[]:r;return typeof e=="string"?ir(e):"<".concat(t," ").concat(ol(a),">").concat(i.map(st).join(""),"</").concat(t,">")}function ca(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var ml=function(t,n){return function(a,r,i,o){return t.call(n,a,r,i,o)}},Gt=function(t,n,a,r){var i=Object.keys(t),o=i.length,c=r!==void 0?ml(n,r):n,s,u,l;for(a===void 0?(s=1,l=t[i[0]]):(s=0,l=a);s<o;s++)u=i[s],l=c(l,t[u],u,t);return l};function vl(e){for(var t=[],n=0,a=e.length;n<a;){var r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){var i=e.charCodeAt(n++);(i&64512)==56320?t.push(((r&1023)<<10)+(i&1023)+65536):(t.push(r),n--)}else t.push(r)}return t}function rn(e){var t=vl(e);return t.length===1?t[0].toString(16):null}function pl(e,t){var n=e.length,a=e.charCodeAt(t),r;return a>=55296&&a<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function ua(e){return Object.keys(e).reduce(function(t,n){var a=e[n],r=!!a.icon;return r?t[a.iconName]=a.icon:t[n]=a,t},{})}function on(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=n.skipHooks,r=a===void 0?!1:a,i=ua(t);typeof se.hooks.addPack=="function"&&!r?se.hooks.addPack(e,ua(t)):se.styles[e]=w(w({},se.styles[e]||{}),i),e==="fas"&&on("fa",t)}var ht,gt,bt,Ie=se.styles,hl=se.shims,gl=(ht={},G(ht,j,Object.values(nt[j])),G(ht,U,Object.values(nt[U])),ht),Pn=null,lr={},cr={},ur={},fr={},dr={},bl=(gt={},G(gt,j,Object.keys(et[j])),G(gt,U,Object.keys(et[U])),gt);function yl(e){return~Js.indexOf(e)}function wl(e,t){var n=t.split("-"),a=n[0],r=n.slice(1).join("-");return a===e&&r!==""&&!yl(r)?r:null}var mr=function(){var t=function(i){return Gt(Ie,function(o,c,s){return o[s]=Gt(c,i,{}),o},{})};lr=t(function(r,i,o){if(i[3]&&(r[i[3]]=o),i[2]){var c=i[2].filter(function(s){return typeof s=="number"});c.forEach(function(s){r[s.toString(16)]=o})}return r}),cr=t(function(r,i,o){if(r[o]=o,i[2]){var c=i[2].filter(function(s){return typeof s=="string"});c.forEach(function(s){r[s]=o})}return r}),dr=t(function(r,i,o){var c=i[2];return r[o]=o,c.forEach(function(s){r[s]=o}),r});var n="far"in Ie||_.autoFetchSvg,a=Gt(hl,function(r,i){var o=i[0],c=i[1],s=i[2];return c==="far"&&!n&&(c="fas"),typeof o=="string"&&(r.names[o]={prefix:c,iconName:s}),typeof o=="number"&&(r.unicodes[o.toString(16)]={prefix:c,iconName:s}),r},{names:{},unicodes:{}});ur=a.names,fr=a.unicodes,Pn=Nt(_.styleDefault,{family:_.familyDefault})};al(function(e){Pn=Nt(e.styleDefault,{family:_.familyDefault})});mr();function Cn(e,t){return(lr[e]||{})[t]}function kl(e,t){return(cr[e]||{})[t]}function xe(e,t){return(dr[e]||{})[t]}function vr(e){return ur[e]||{prefix:null,iconName:null}}function _l(e){var t=fr[e],n=Cn("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function ke(){return Pn}var On=function(){return{prefix:null,iconName:null,rest:[]}};function Nt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,a=n===void 0?j:n,r=et[a][e],i=tt[a][e]||tt[a][r],o=e in se.styles?e:null;return i||o||null}var fa=(bt={},G(bt,j,Object.keys(nt[j])),G(bt,U,Object.keys(nt[U])),bt);function Tt(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.skipLookups,r=a===void 0?!1:a,i=(t={},G(t,j,"".concat(_.cssPrefix,"-").concat(j)),G(t,U,"".concat(_.cssPrefix,"-").concat(U)),t),o=null,c=j;(e.includes(i[j])||e.some(function(u){return fa[j].includes(u)}))&&(c=j),(e.includes(i[U])||e.some(function(u){return fa[U].includes(u)}))&&(c=U);var s=e.reduce(function(u,l){var f=wl(_.cssPrefix,l);if(Ie[l]?(l=gl[c].includes(l)?Ws[c][l]:l,o=l,u.prefix=l):bl[c].indexOf(l)>-1?(o=l,u.prefix=Nt(l,{family:c})):f?u.iconName=f:l!==_.replacementClass&&l!==i[j]&&l!==i[U]&&u.rest.push(l),!r&&u.prefix&&u.iconName){var d=o==="fa"?vr(u.iconName):{},g=xe(u.prefix,u.iconName);d.prefix&&(o=null),u.iconName=d.iconName||g||u.iconName,u.prefix=d.prefix||u.prefix,u.prefix==="far"&&!Ie.far&&Ie.fas&&!_.autoFetchSvg&&(u.prefix="fas")}return u},On());return(e.includes("fa-brands")||e.includes("fab"))&&(s.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(s.prefix="fad"),!s.prefix&&c===U&&(Ie.fass||_.autoFetchSvg)&&(s.prefix="fass",s.iconName=xe(s.prefix,s.iconName)||s.iconName),(s.prefix==="fa"||o==="fa")&&(s.prefix=ke()||"fas"),s}var El=function(){function e(){Ts(this,e),this.definitions={}}return Ms(e,[{key:"add",value:function(){for(var n=this,a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];var o=r.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(c){n.definitions[c]=w(w({},n.definitions[c]||{}),o[c]),on(c,o[c]);var s=nt[j][c];s&&on(s,o[c]),mr()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(i){var o=r[i],c=o.prefix,s=o.iconName,u=o.icon,l=u[2];n[c]||(n[c]={}),l.length>0&&l.forEach(function(f){typeof f=="string"&&(n[c][f]=u)}),n[c][s]=u}),n}}]),e}(),da=[],Ne={},Me={},xl=Object.keys(Me);function Al(e,t){var n=t.mixoutsTo;return da=e,Ne={},Object.keys(Me).forEach(function(a){xl.indexOf(a)===-1&&delete Me[a]}),da.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(o){typeof r[o]=="function"&&(n[o]=r[o]),Et(r[o])==="object"&&Object.keys(r[o]).forEach(function(c){n[o]||(n[o]={}),n[o][c]=r[o][c]})}),a.hooks){var i=a.hooks();Object.keys(i).forEach(function(o){Ne[o]||(Ne[o]=[]),Ne[o].push(i[o])})}a.provides&&a.provides(Me)}),n}function sn(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];var i=Ne[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(a))}),t}function Ce(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var r=Ne[e]||[];r.forEach(function(i){i.apply(null,n)})}function pe(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Me[e]?Me[e].apply(null,t):void 0}function ln(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||ke();if(!!t)return t=xe(n,t)||t,ca(pr.definitions,n,t)||ca(se.styles,n,t)}var pr=new El,Sl=function(){_.autoReplaceSvg=!1,_.observeMutations=!1,Ce("noAuto")},Pl={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return he?(Ce("beforeI2svg",t),pe("pseudoElements2svg",t),pe("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;_.autoReplaceSvg===!1&&(_.autoReplaceSvg=!0),_.observeMutations=!0,dl(function(){Ol({autoReplaceSvgRoot:n}),Ce("watch",t)})}},Cl={icon:function(t){if(t===null)return null;if(Et(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:xe(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],a=Nt(t[0]);return{prefix:a,iconName:xe(a,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(_.cssPrefix,"-"))>-1||t.match(Gs))){var r=Tt(t.split(" "),{skipLookups:!0});return{prefix:r.prefix||ke(),iconName:xe(r.prefix,r.iconName)||r.iconName}}if(typeof t=="string"){var i=ke();return{prefix:i,iconName:xe(i,t)||t}}}},ae={noAuto:Sl,config:_,dom:Pl,parse:Cl,library:pr,findIconDefinition:ln,toHtml:st},Ol=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,a=n===void 0?B:n;(Object.keys(se.styles).length>0||_.autoFetchSvg)&&he&&_.autoReplaceSvg&&ae.dom.i2svg({node:a})};function Mt(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(a){return st(a)})}}),Object.defineProperty(e,"node",{get:function(){if(!!he){var a=B.createElement("div");return a.innerHTML=e.html,a.children}}}),e}function Rl(e){var t=e.children,n=e.main,a=e.mask,r=e.attributes,i=e.styles,o=e.transform;if(Sn(o)&&n.found&&!a.found){var c=n.width,s=n.height,u={x:c/s/2,y:.5};r.style=It(w(w({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:t}]}function $l(e){var t=e.prefix,n=e.iconName,a=e.children,r=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(_.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:w(w({},r),{},{id:o}),children:a}]}]}function Rn(e){var t=e.icons,n=t.main,a=t.mask,r=e.prefix,i=e.iconName,o=e.transform,c=e.symbol,s=e.title,u=e.maskId,l=e.titleId,f=e.extra,d=e.watchable,g=d===void 0?!1:d,b=a.found?a:n,k=b.width,C=b.height,p=r==="fak",h=[_.replacementClass,i?"".concat(_.cssPrefix,"-").concat(i):""].filter(function(x){return f.classes.indexOf(x)===-1}).filter(function(x){return x!==""||!!x}).concat(f.classes).join(" "),P={children:[],attributes:w(w({},f.attributes),{},{"data-prefix":r,"data-icon":i,class:h,role:f.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(k," ").concat(C)})},L=p&&!~f.classes.indexOf("fa-fw")?{width:"".concat(k/C*16*.0625,"em")}:{};g&&(P.attributes[Pe]=""),s&&(P.children.push({tag:"title",attributes:{id:P.attributes["aria-labelledby"]||"title-".concat(l||rt())},children:[s]}),delete P.attributes.title);var N=w(w({},P),{},{prefix:r,iconName:i,main:n,mask:a,maskId:u,transform:o,symbol:c,styles:w(w({},L),f.styles)}),S=a.found&&n.found?pe("generateAbstractMask",N)||{children:[],attributes:{}}:pe("generateAbstractIcon",N)||{children:[],attributes:{}},O=S.children,Q=S.attributes;return N.children=O,N.attributes=Q,c?$l(N):Rl(N)}function ma(e){var t=e.content,n=e.width,a=e.height,r=e.transform,i=e.title,o=e.extra,c=e.watchable,s=c===void 0?!1:c,u=w(w(w({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});s&&(u[Pe]="");var l=w({},o.styles);Sn(r)&&(l.transform=ll({transform:r,startCentered:!0,width:n,height:a}),l["-webkit-transform"]=l.transform);var f=It(l);f.length>0&&(u.style=f);var d=[];return d.push({tag:"span",attributes:u,children:[t]}),i&&d.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),d}function Ll(e){var t=e.content,n=e.title,a=e.extra,r=w(w(w({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),i=It(a.styles);i.length>0&&(r.style=i);var o=[];return o.push({tag:"span",attributes:r,children:[t]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var qt=se.styles;function cn(e){var t=e[0],n=e[1],a=e.slice(4),r=wn(a,1),i=r[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(_.cssPrefix,"-").concat(Ee.GROUP)},children:[{tag:"path",attributes:{class:"".concat(_.cssPrefix,"-").concat(Ee.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(_.cssPrefix,"-").concat(Ee.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:n,icon:o}}var Il={found:!1,width:512,height:512};function Nl(e,t){!tr&&!_.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function un(e,t){var n=t;return t==="fa"&&_.styleDefault!==null&&(t=ke()),new Promise(function(a,r){if(pe("missingIconAbstract"),n==="fa"){var i=vr(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&qt[t]&&qt[t][e]){var o=qt[t][e];return a(cn(o))}Nl(e,t),a(w(w({},Il),{},{icon:_.showMissingIcons&&e?pe("missingIconAbstract")||{}:{}}))})}var va=function(){},fn=_.measurePerformance&&ut&&ut.mark&&ut.measure?ut:{mark:va,measure:va},Xe='FA "6.3.0"',Tl=function(t){return fn.mark("".concat(Xe," ").concat(t," begins")),function(){return hr(t)}},hr=function(t){fn.mark("".concat(Xe," ").concat(t," ends")),fn.measure("".concat(Xe," ").concat(t),"".concat(Xe," ").concat(t," begins"),"".concat(Xe," ").concat(t," ends"))},$n={begin:Tl,end:hr},yt=function(){};function pa(e){var t=e.getAttribute?e.getAttribute(Pe):null;return typeof t=="string"}function Ml(e){var t=e.getAttribute?e.getAttribute(_n):null,n=e.getAttribute?e.getAttribute(En):null;return t&&n}function zl(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(_.replacementClass)}function Dl(){if(_.autoReplaceSvg===!0)return wt.replace;var e=wt[_.autoReplaceSvg];return e||wt.replace}function Fl(e){return B.createElementNS("http://www.w3.org/2000/svg",e)}function jl(e){return B.createElement(e)}function gr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,a=n===void 0?e.tag==="svg"?Fl:jl:n;if(typeof e=="string")return B.createTextNode(e);var r=a(e.tag);Object.keys(e.attributes||[]).forEach(function(o){r.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){r.appendChild(gr(o,{ceFn:a}))}),r}function Bl(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var wt={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(r){n.parentNode.insertBefore(gr(r),n)}),n.getAttribute(Pe)===null&&_.keepOriginalSource){var a=B.createComment(Bl(n));n.parentNode.replaceChild(a,n)}else n.remove()},nest:function(t){var n=t[0],a=t[1];if(~An(n).indexOf(_.replacementClass))return wt.replace(t);var r=new RegExp("".concat(_.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var i=a[0].attributes.class.split(" ").reduce(function(c,s){return s===_.replacementClass||s.match(r)?c.toSvg.push(s):c.toNode.push(s),c},{toNode:[],toSvg:[]});a[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=a.map(function(c){return st(c)}).join(`
`);n.setAttribute(Pe,""),n.innerHTML=o}};function ha(e){e()}function br(e,t){var n=typeof t=="function"?t:yt;if(e.length===0)n();else{var a=ha;_.mutateApproach===Ys&&(a=we.requestAnimationFrame||ha),a(function(){var r=Dl(),i=$n.begin("mutate");e.map(r),i(),n()})}}var Ln=!1;function yr(){Ln=!0}function dn(){Ln=!1}var At=null;function ga(e){if(!!oa&&!!_.observeMutations){var t=e.treeCallback,n=t===void 0?yt:t,a=e.nodeCallback,r=a===void 0?yt:a,i=e.pseudoElementsCallback,o=i===void 0?yt:i,c=e.observeMutationsRoot,s=c===void 0?B:c;At=new oa(function(u){if(!Ln){var l=ke();Ue(u).forEach(function(f){if(f.type==="childList"&&f.addedNodes.length>0&&!pa(f.addedNodes[0])&&(_.searchPseudoElements&&o(f.target),n(f.target)),f.type==="attributes"&&f.target.parentNode&&_.searchPseudoElements&&o(f.target.parentNode),f.type==="attributes"&&pa(f.target)&&~Zs.indexOf(f.attributeName))if(f.attributeName==="class"&&Ml(f.target)){var d=Tt(An(f.target)),g=d.prefix,b=d.iconName;f.target.setAttribute(_n,g||l),b&&f.target.setAttribute(En,b)}else zl(f.target)&&r(f.target)})}}),he&&At.observe(s,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Ul(){!At||At.disconnect()}function Hl(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(a,r){var i=r.split(":"),o=i[0],c=i.slice(1);return o&&c.length>0&&(a[o]=c.join(":").trim()),a},{})),n}function Vl(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"",r=Tt(An(e));return r.prefix||(r.prefix=ke()),t&&n&&(r.prefix=t,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=kl(r.prefix,e.innerText)||Cn(r.prefix,rn(e.innerText))),!r.iconName&&_.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function Yl(e){var t=Ue(e.attributes).reduce(function(r,i){return r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r},{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return _.autoA11y&&(n?t["aria-labelledby"]="".concat(_.replacementClass,"-title-").concat(a||rt()):(t["aria-hidden"]="true",t.focusable="false")),t}function Xl(){return{iconName:null,title:null,titleId:null,prefix:null,transform:ue,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ba(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Vl(e),a=n.iconName,r=n.prefix,i=n.rest,o=Yl(e),c=sn("parseNodeAttributes",{},e),s=t.styleParser?Hl(e):[];return w({iconName:a,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:r,transform:ue,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:s,attributes:o}},c)}var Wl=se.styles;function wr(e){var t=_.autoReplaceSvg==="nest"?ba(e,{styleParser:!1}):ba(e);return~t.extra.classes.indexOf(nr)?pe("generateLayersText",e,t):pe("generateSvgReplacementMutation",e,t)}var _e=new Set;xn.map(function(e){_e.add("fa-".concat(e))});Object.keys(et[j]).map(_e.add.bind(_e));Object.keys(et[U]).map(_e.add.bind(_e));_e=it(_e);function ya(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!he)return Promise.resolve();var n=B.documentElement.classList,a=function(f){return n.add("".concat(sa,"-").concat(f))},r=function(f){return n.remove("".concat(sa,"-").concat(f))},i=_.autoFetchSvg?_e:xn.map(function(l){return"fa-".concat(l)}).concat(Object.keys(Wl));i.includes("fa")||i.push("fa");var o=[".".concat(nr,":not([").concat(Pe,"])")].concat(i.map(function(l){return".".concat(l,":not([").concat(Pe,"])")})).join(", ");if(o.length===0)return Promise.resolve();var c=[];try{c=Ue(e.querySelectorAll(o))}catch{}if(c.length>0)a("pending"),r("complete");else return Promise.resolve();var s=$n.begin("onTree"),u=c.reduce(function(l,f){try{var d=wr(f);d&&l.push(d)}catch(g){tr||g.name==="MissingIcon"&&console.error(g)}return l},[]);return new Promise(function(l,f){Promise.all(u).then(function(d){br(d,function(){a("active"),a("complete"),r("pending"),typeof t=="function"&&t(),s(),l()})}).catch(function(d){s(),f(d)})})}function Gl(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;wr(e).then(function(n){n&&br([n],t)})}function ql(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(t||{}).icon?t:ln(t||{}),r=n.mask;return r&&(r=(r||{}).icon?r:ln(r||{})),e(a,w(w({},n),{},{mask:r}))}}var Kl=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.transform,r=a===void 0?ue:a,i=n.symbol,o=i===void 0?!1:i,c=n.mask,s=c===void 0?null:c,u=n.maskId,l=u===void 0?null:u,f=n.title,d=f===void 0?null:f,g=n.titleId,b=g===void 0?null:g,k=n.classes,C=k===void 0?[]:k,p=n.attributes,h=p===void 0?{}:p,P=n.styles,L=P===void 0?{}:P;if(!!t){var N=t.prefix,S=t.iconName,O=t.icon;return Mt(w({type:"icon"},t),function(){return Ce("beforeDOMElementCreation",{iconDefinition:t,params:n}),_.autoA11y&&(d?h["aria-labelledby"]="".concat(_.replacementClass,"-title-").concat(b||rt()):(h["aria-hidden"]="true",h.focusable="false")),Rn({icons:{main:cn(O),mask:s?cn(s.icon):{found:!1,width:null,height:null,icon:{}}},prefix:N,iconName:S,transform:w(w({},ue),r),symbol:o,title:d,maskId:l,titleId:b,extra:{attributes:h,styles:L,classes:C}})})}},Ql={mixout:function(){return{icon:ql(Kl)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=ya,n.nodeCallback=Gl,n}}},provides:function(t){t.i2svg=function(n){var a=n.node,r=a===void 0?B:a,i=n.callback,o=i===void 0?function(){}:i;return ya(r,o)},t.generateSvgReplacementMutation=function(n,a){var r=a.iconName,i=a.title,o=a.titleId,c=a.prefix,s=a.transform,u=a.symbol,l=a.mask,f=a.maskId,d=a.extra;return new Promise(function(g,b){Promise.all([un(r,c),l.iconName?un(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(k){var C=wn(k,2),p=C[0],h=C[1];g([n,Rn({icons:{main:p,mask:h},prefix:c,iconName:r,transform:s,symbol:u,maskId:f,title:i,titleId:o,extra:d,watchable:!0})])}).catch(b)})},t.generateAbstractIcon=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.transform,c=n.styles,s=It(c);s.length>0&&(r.style=s);var u;return Sn(o)&&(u=pe("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),a.push(u||i.icon),{children:a,attributes:r}}}},Zl={mixout:function(){return{layer:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,i=r===void 0?[]:r;return Mt({type:"layer"},function(){Ce("beforeDOMElementCreation",{assembler:n,params:a});var o=[];return n(function(c){Array.isArray(c)?c.map(function(s){o=o.concat(s.abstract)}):o=o.concat(c.abstract)}),[{tag:"span",attributes:{class:["".concat(_.cssPrefix,"-layers")].concat(it(i)).join(" ")},children:o}]})}}}},Jl={mixout:function(){return{counter:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,i=r===void 0?null:r,o=a.classes,c=o===void 0?[]:o,s=a.attributes,u=s===void 0?{}:s,l=a.styles,f=l===void 0?{}:l;return Mt({type:"counter",content:n},function(){return Ce("beforeDOMElementCreation",{content:n,params:a}),Ll({content:n.toString(),title:i,extra:{attributes:u,styles:f,classes:["".concat(_.cssPrefix,"-layers-counter")].concat(it(c))}})})}}}},ec={mixout:function(){return{text:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,i=r===void 0?ue:r,o=a.title,c=o===void 0?null:o,s=a.classes,u=s===void 0?[]:s,l=a.attributes,f=l===void 0?{}:l,d=a.styles,g=d===void 0?{}:d;return Mt({type:"text",content:n},function(){return Ce("beforeDOMElementCreation",{content:n,params:a}),ma({content:n,transform:w(w({},ue),i),title:c,extra:{attributes:f,styles:g,classes:["".concat(_.cssPrefix,"-layers-text")].concat(it(u))}})})}}},provides:function(t){t.generateLayersText=function(n,a){var r=a.title,i=a.transform,o=a.extra,c=null,s=null;if(Za){var u=parseInt(getComputedStyle(n).fontSize,10),l=n.getBoundingClientRect();c=l.width/u,s=l.height/u}return _.autoA11y&&!r&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,ma({content:n.innerHTML,width:c,height:s,transform:i,title:r,extra:o,watchable:!0})])}}},tc=new RegExp('"',"ug"),wa=[1105920,1112319];function nc(e){var t=e.replace(tc,""),n=pl(t,0),a=n>=wa[0]&&n<=wa[1],r=t.length===2?t[0]===t[1]:!1;return{value:rn(r?t[0]:t),isSecondary:a||r}}function ka(e,t){var n="".concat(Vs).concat(t.replace(":","-"));return new Promise(function(a,r){if(e.getAttribute(n)!==null)return a();var i=Ue(e.children),o=i.filter(function(O){return O.getAttribute(an)===t})[0],c=we.getComputedStyle(e,t),s=c.getPropertyValue("font-family").match(qs),u=c.getPropertyValue("font-weight"),l=c.getPropertyValue("content");if(o&&!s)return e.removeChild(o),a();if(s&&l!=="none"&&l!==""){var f=c.getPropertyValue("content"),d=~["Sharp"].indexOf(s[2])?U:j,g=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(s[2])?tt[d][s[2].toLowerCase()]:Ks[d][u],b=nc(f),k=b.value,C=b.isSecondary,p=s[0].startsWith("FontAwesome"),h=Cn(g,k),P=h;if(p){var L=_l(k);L.iconName&&L.prefix&&(h=L.iconName,g=L.prefix)}if(h&&!C&&(!o||o.getAttribute(_n)!==g||o.getAttribute(En)!==P)){e.setAttribute(n,P),o&&e.removeChild(o);var N=Xl(),S=N.extra;S.attributes[an]=t,un(h,g).then(function(O){var Q=Rn(w(w({},N),{},{icons:{main:O,mask:On()},prefix:g,iconName:P,extra:S,watchable:!0})),x=B.createElement("svg");t==="::before"?e.insertBefore(x,e.firstChild):e.appendChild(x),x.outerHTML=Q.map(function(V){return st(V)}).join(`
`),e.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function ac(e){return Promise.all([ka(e,"::before"),ka(e,"::after")])}function rc(e){return e.parentNode!==document.head&&!~Xs.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(an)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function _a(e){if(!!he)return new Promise(function(t,n){var a=Ue(e.querySelectorAll("*")).filter(rc).map(ac),r=$n.begin("searchPseudoElements");yr(),Promise.all(a).then(function(){r(),dn(),t()}).catch(function(){r(),dn(),n()})})}var ic={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=_a,n}}},provides:function(t){t.pseudoElements2svg=function(n){var a=n.node,r=a===void 0?B:a;_.searchPseudoElements&&_a(r)}}},Ea=!1,oc={mixout:function(){return{dom:{unwatch:function(){yr(),Ea=!0}}}},hooks:function(){return{bootstrap:function(){ga(sn("mutationObserverCallbacks",{}))},noAuto:function(){Ul()},watch:function(n){var a=n.observeMutationsRoot;Ea?dn():ga(sn("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},xa=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(a,r){var i=r.toLowerCase().split("-"),o=i[0],c=i.slice(1).join("-");if(o&&c==="h")return a.flipX=!0,a;if(o&&c==="v")return a.flipY=!0,a;if(c=parseFloat(c),isNaN(c))return a;switch(o){case"grow":a.size=a.size+c;break;case"shrink":a.size=a.size-c;break;case"left":a.x=a.x-c;break;case"right":a.x=a.x+c;break;case"up":a.y=a.y-c;break;case"down":a.y=a.y+c;break;case"rotate":a.rotate=a.rotate+c;break}return a},n)},sc={mixout:function(){return{parse:{transform:function(n){return xa(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-transform");return r&&(n.transform=xa(r)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var a=n.main,r=n.transform,i=n.containerWidth,o=n.iconWidth,c={transform:"translate(".concat(i/2," 256)")},s="translate(".concat(r.x*32,", ").concat(r.y*32,") "),u="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),l="rotate(".concat(r.rotate," 0 0)"),f={transform:"".concat(s," ").concat(u," ").concat(l)},d={transform:"translate(".concat(o/2*-1," -256)")},g={outer:c,inner:f,path:d};return{tag:"g",attributes:w({},g.outer),children:[{tag:"g",attributes:w({},g.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:w(w({},a.icon.attributes),g.path)}]}]}}}},Kt={x:0,y:0,width:"100%",height:"100%"};function Aa(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function lc(e){return e.tag==="g"?e.children:[e]}var cc={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-mask"),i=r?Tt(r.split(" ").map(function(o){return o.trim()})):On();return i.prefix||(i.prefix=ke()),n.mask=i,n.maskId=a.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.mask,c=n.maskId,s=n.transform,u=i.width,l=i.icon,f=o.width,d=o.icon,g=sl({transform:s,containerWidth:f,iconWidth:u}),b={tag:"rect",attributes:w(w({},Kt),{},{fill:"white"})},k=l.children?{children:l.children.map(Aa)}:{},C={tag:"g",attributes:w({},g.inner),children:[Aa(w({tag:l.tag,attributes:w(w({},l.attributes),g.path)},k))]},p={tag:"g",attributes:w({},g.outer),children:[C]},h="mask-".concat(c||rt()),P="clip-".concat(c||rt()),L={tag:"mask",attributes:w(w({},Kt),{},{id:h,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[b,p]},N={tag:"defs",children:[{tag:"clipPath",attributes:{id:P},children:lc(d)},L]};return a.push(N,{tag:"rect",attributes:w({fill:"currentColor","clip-path":"url(#".concat(P,")"),mask:"url(#".concat(h,")")},Kt)}),{children:a,attributes:r}}}},uc={provides:function(t){var n=!1;we.matchMedia&&(n=we.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:w(w({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=w(w({},i),{},{attributeName:"opacity"}),c={tag:"circle",attributes:w(w({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||c.children.push({tag:"animate",attributes:w(w({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:w(w({},o),{},{values:"1;0;1;1;0;1;"})}),a.push(c),a.push({tag:"path",attributes:w(w({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:w(w({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||a.push({tag:"path",attributes:w(w({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:w(w({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},fc={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-symbol"),i=r===null?!1:r===""?!0:r;return n.symbol=i,n}}}},dc=[ul,Ql,Zl,Jl,ec,ic,oc,sc,cc,uc,fc];Al(dc,{mixoutsTo:ae});ae.noAuto;var kr=ae.config,mc=ae.library;ae.dom;var St=ae.parse;ae.findIconDefinition;ae.toHtml;var vc=ae.icon;ae.layer;var pc=ae.text;ae.counter;function Sa(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function oe(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Sa(Object(n),!0).forEach(function(a){te(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Sa(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function Pt(e){return Pt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pt(e)}function te(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function hc(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,i;for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function gc(e,t){if(e==null)return{};var n=hc(e,t),a,r;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],!(t.indexOf(a)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,a)||(n[a]=e[a]))}return n}function mn(e){return bc(e)||yc(e)||wc(e)||kc()}function bc(e){if(Array.isArray(e))return vn(e)}function yc(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function wc(e,t){if(!!e){if(typeof e=="string")return vn(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return vn(e,t)}}function vn(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function kc(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var _c=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},_r={exports:{}};(function(e){(function(t){var n=function(p,h,P){if(!u(h)||f(h)||d(h)||g(h)||s(h))return h;var L,N=0,S=0;if(l(h))for(L=[],S=h.length;N<S;N++)L.push(n(p,h[N],P));else{L={};for(var O in h)Object.prototype.hasOwnProperty.call(h,O)&&(L[p(O,P)]=n(p,h[O],P))}return L},a=function(p,h){h=h||{};var P=h.separator||"_",L=h.split||/(?=[A-Z])/;return p.split(L).join(P)},r=function(p){return b(p)?p:(p=p.replace(/[\-_\s]+(.)?/g,function(h,P){return P?P.toUpperCase():""}),p.substr(0,1).toLowerCase()+p.substr(1))},i=function(p){var h=r(p);return h.substr(0,1).toUpperCase()+h.substr(1)},o=function(p,h){return a(p,h).toLowerCase()},c=Object.prototype.toString,s=function(p){return typeof p=="function"},u=function(p){return p===Object(p)},l=function(p){return c.call(p)=="[object Array]"},f=function(p){return c.call(p)=="[object Date]"},d=function(p){return c.call(p)=="[object RegExp]"},g=function(p){return c.call(p)=="[object Boolean]"},b=function(p){return p=p-0,p===p},k=function(p,h){var P=h&&"process"in h?h.process:h;return typeof P!="function"?p:function(L,N){return P(L,p,N)}},C={camelize:r,decamelize:o,pascalize:i,depascalize:o,camelizeKeys:function(p,h){return n(k(r,h),p)},decamelizeKeys:function(p,h){return n(k(o,h),p,h)},pascalizeKeys:function(p,h){return n(k(i,h),p)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=C:t.humps=C})(_c)})(_r);var Ec=_r.exports,xc=["class","style"];function Ac(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),r=Ec.camelize(n.slice(0,a)),i=n.slice(a+1).trim();return t[r]=i,t},{})}function Sc(e){return e.split(/\s+/).reduce(function(t,n){return t[n]=!0,t},{})}function In(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(s){return In(s)}),r=Object.keys(e.attributes||{}).reduce(function(s,u){var l=e.attributes[u];switch(u){case"class":s.class=Sc(l);break;case"style":s.style=Ac(l);break;default:s.attrs[u]=l}return s},{attrs:{},class:{},style:{}});n.class;var i=n.style,o=i===void 0?{}:i,c=gc(n,xc);return Ot(e.tag,oe(oe(oe({},t),{},{class:r.class,style:oe(oe({},r.style),o)},r.attrs),c),a)}var Er=!1;try{Er=!0}catch{}function Pc(){if(!Er&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Qe(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?te({},e,t):{}}function Cc(e){var t,n=(t={"fa-spin":e.spin,"fa-pulse":e.pulse,"fa-fw":e.fixedWidth,"fa-border":e.border,"fa-li":e.listItem,"fa-inverse":e.inverse,"fa-flip":e.flip===!0,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both"},te(t,"fa-".concat(e.size),e.size!==null),te(t,"fa-rotate-".concat(e.rotation),e.rotation!==null),te(t,"fa-pull-".concat(e.pull),e.pull!==null),te(t,"fa-swap-opacity",e.swapOpacity),te(t,"fa-bounce",e.bounce),te(t,"fa-shake",e.shake),te(t,"fa-beat",e.beat),te(t,"fa-fade",e.fade),te(t,"fa-beat-fade",e.beatFade),te(t,"fa-flash",e.flash),te(t,"fa-spin-pulse",e.spinPulse),te(t,"fa-spin-reverse",e.spinReverse),t);return Object.keys(n).map(function(a){return n[a]?a:null}).filter(function(a){return a})}function Pa(e){if(e&&Pt(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(St.icon)return St.icon(e);if(e===null)return null;if(Pt(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}var Oc=ne({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(t){return[!0,!1,"horizontal","vertical","both"].indexOf(t)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(t){return["right","left"].indexOf(t)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(t){return[90,180,270].indexOf(Number.parseInt(t,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(t)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(t,n){var a=n.attrs,r=H(function(){return Pa(t.icon)}),i=H(function(){return Qe("classes",Cc(t))}),o=H(function(){return Qe("transform",typeof t.transform=="string"?St.transform(t.transform):t.transform)}),c=H(function(){return Qe("mask",Pa(t.mask))}),s=H(function(){return vc(r.value,oe(oe(oe(oe({},i.value),o.value),c.value),{},{symbol:t.symbol,title:t.title}))});pn(s,function(l){if(!l)return Pc("Could not find one or more icon(s)",r.value,c.value)},{immediate:!0});var u=H(function(){return s.value?In(s.value.abstract[0],{},a):null});return function(){return u.value}}});ne({name:"FontAwesomeLayers",props:{fixedWidth:{type:Boolean,default:!1}},setup:function(t,n){var a=n.slots,r=kr.familyPrefix,i=H(function(){return["".concat(r,"-layers")].concat(mn(t.fixedWidth?["".concat(r,"-fw")]:[]))});return function(){return Ot("div",{class:i.value},a.default?a.default():[])}}});ne({name:"FontAwesomeLayersText",props:{value:{type:[String,Number],default:""},transform:{type:[String,Object],default:null},counter:{type:Boolean,default:!1},position:{type:String,default:null,validator:function(t){return["bottom-left","bottom-right","top-left","top-right"].indexOf(t)>-1}}},setup:function(t,n){var a=n.attrs,r=kr.familyPrefix,i=H(function(){return Qe("classes",[].concat(mn(t.counter?["".concat(r,"-layers-counter")]:[]),mn(t.position?["".concat(r,"-layers-").concat(t.position)]:[])))}),o=H(function(){return Qe("transform",typeof t.transform=="string"?St.transform(t.transform):t.transform)}),c=H(function(){var u=pc(t.value.toString(),oe(oe({},o.value),i.value)),l=u.abstract;return t.counter&&(l[0].attributes.class=l[0].attributes.class.replace("fa-layers-text","")),l[0]}),s=H(function(){return In(c.value,{},a)});return function(){return s.value}}});var Rc={prefix:"fas",iconName:"bars",icon:[448,512,["navicon"],"f0c9","M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"]},$c={prefix:"fas",iconName:"arrow-right-from-bracket",icon:[512,512,["sign-out"],"f08b","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"]},Lc={prefix:"fas",iconName:"eye-slash",icon:[640,512,[],"f070","M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"]},Ic={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},Nc={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M89.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L370.3 160H320c-17.7 0-32 14.3-32 32s14.3 32 32 32H447.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L398.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C57.2 122 39.6 150.7 28.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM23 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L109.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H32.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"]},Tc={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]},Mc={prefix:"fas",iconName:"circle-info",icon:[512,512,["info-circle"],"f05a","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},zc={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M481.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-30.9 28.1c-7.7 7.1-11.4 17.5-10.9 27.9c.1 2.9 .2 5.8 .2 8.8s-.1 5.9-.2 8.8c-.5 10.5 3.1 20.9 10.9 27.9l30.9 28.1c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-39.7-12.6c-10-3.2-20.8-1.1-29.7 4.6c-4.9 3.1-9.9 6.1-15.1 8.7c-9.3 4.8-16.5 13.2-18.8 23.4l-8.9 40.7c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-8.9-40.7c-2.2-10.2-9.5-18.6-18.8-23.4c-5.2-2.7-10.2-5.6-15.1-8.7c-8.8-5.7-19.7-7.8-29.7-4.6L69.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l30.9-28.1c7.7-7.1 11.4-17.5 10.9-27.9c-.1-2.9-.2-5.8-.2-8.8s.1-5.9 .2-8.8c.5-10.5-3.1-20.9-10.9-27.9L8.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l39.7 12.6c10 3.2 20.8 1.1 29.7-4.6c4.9-3.1 9.9-6.1 15.1-8.7c9.3-4.8 16.5-13.2 18.8-23.4l8.9-40.7c2-9.1 9-16.3 18.2-17.8C213.3 1.2 227.5 0 242 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l8.9 40.7c2.2 10.2 9.4 18.6 18.8 23.4c5.2 2.7 10.2 5.6 15.1 8.7c8.8 5.7 19.7 7.7 29.7 4.6l39.7-12.6c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM242 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"]},Dc={prefix:"fas",iconName:"sun",icon:[512,512,[9728],"f185","M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"]},Fc={prefix:"fas",iconName:"xmark",icon:[320,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"]},jc={prefix:"fas",iconName:"moon",icon:[384,512,[127769,9214],"f186","M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"]},Bc={prefix:"fas",iconName:"circle-xmark",icon:[512,512,[61532,"times-circle","xmark-circle"],"f057","M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"]};mc.add(Nc,zc,$c,Rc,Fc,Dc,jc,Ic,Mc,Bc,Tc,Lc);function Uc(e){e.component("font-awesome-icon",Oc)}const Hc=Ir,lt=$r(Di);Uc(lt);lt.use(Lr());lt.use(Be);lt.use(Hc);lt.mount("#app");
