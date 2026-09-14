(function(){
'use strict';
const _0x0000=document.getElementById('_0x0000');
function _0x0027(){
if(window.scrollY>0x28){
_0x0000.classList.add('scrolled');
}else{
_0x0000.classList.remove('scrolled');
}
}
document.addEventListener('scroll',_0x0027,{passive:true});
_0x0027();
const _0x0001=document.getElementById('_0x0001');
if(_0x0001){
_0x0001.addEventListener('click',()=>{
const _0x0002=document.documentElement.getAttribute('data-theme');
const _0x0003=_0x0002==='light'?'dark':'light';
document.documentElement.setAttribute('data-theme',_0x0003);
localStorage.setItem('tapcard-theme',_0x0003);
});
}
const _0x0004=document.getElementById('_0x0004');
const _0x0005=document.getElementById('hero');
let _0x0006=0,gy=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{
const _0x0007=_0x0005.getBoundingClientRect();
const _0x0008=_0x0004.getBoundingClientRect();
const _0x0009=_0x0007.top+_0x0007.height*0.3;
if(e.clientY>=_0x0009&&e.clientY<=_0x0007.bottom){
tx=e.clientX-_0x0008.left;
ty=e.clientY-_0x0008.top;
}else{
tx=_0x0008.width/2;
ty=_0x0008.height*0.3;
}
});
(function _0x0028(){
_0x0006+=(tx-_0x0006)*0.08;
gy+=(ty-gy)*0.08;
_0x0004.style.setProperty('--mx',_0x0006+'_0x000E');
_0x0004.style.setProperty('--my',gy+'_0x000E');
requestAnimationFrame(_0x0028);
})();
const _0x000A=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
const _0x000B=document.getElementById('_0x000B');
const _0x000C=document.getElementById('_0x000C');
const _0x000D=0xA,BASE_RY=-0x12;
if(_0x000B&&_0x000C&&!_0x000A){
_0x000B.addEventListener('mousemove',e=>{
const _0x0007=_0x000B.getBoundingClientRect();
const _0x000E=(e.clientX-_0x0007.left)/_0x0007.width;
const _0x000F=(e.clientY-_0x0007.top)/_0x0007.height;
const _0x0010=_0x000D-(_0x000F-0.5)*0x18;
const _0x0011=BASE_RY+(_0x000E-0.5)*0x1C;
_0x000C.style.transform=`rotateX(${_0x0010}deg)rotateY(${_0x0011}deg)`;
});
_0x000B.addEventListener('mouseleave',()=>{
_0x000C.style.transform=`rotateX(${_0x000D}deg)rotateY(${BASE_RY}deg)`;
});
}
const _0x0012=document.getElementById('_0x0012');
if(_0x0012){
const _0x0013=_0x0012.querySelectorAll('.nfc-card');
function _0x0029(card){
_0x0013.forEach(c=>c.classList.toggle('is-front',c===card));
_0x0012.classList.add('has-front');
}
_0x0013.forEach(card=>{
card.addEventListener('click',()=>_0x0029(card));
card.addEventListener('keydown',e=>{
if(e.key==='Enter'||e.key===' '){
e.preventDefault();
_0x0029(card);
}
});
});
}
const _0x0014=Array.from(document.querySelectorAll('.nav-links a'));
const _0x0015=_0x0014
.map(link=>document.querySelector(link.getAttribute('href')))
.filter(Boolean);
if(_0x0015.length&&'IntersectionObserver' in window){
const _0x0016=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const _0x0017='#'+entry.target._0x0017;
_0x0014.forEach(link=>{
link.classList.toggle('active',link.getAttribute('href')===_0x0017);
});
}
});
},{rootMargin:'-0x2D%0px-0x2D%0px'});
_0x0015.forEach(section=>_0x0016.observe(section));
}
})();
document.querySelectorAll('.pricing-card').forEach(card=>{
function _0x002A(){
const _0x0018=card.getAttribute('data-package');
const _0x0019=document.querySelector(`input[_0x0021="package"][_0x0018="${_0x0018}"]`);
if(_0x0019)_0x0019.checked=true;
const _0x001A=document.getElementById('order');
if(_0x001A)_0x001A.scrollIntoView({behavior:'smooth',block:'start'});
const _0x001B=_0x0019?_0x0019.closest('.package-_0x001B'):null;
if(_0x001B){
_0x001B.classList.add('flash');
setTimeout(()=>_0x001B.classList.remove('flash'),0x384);
}
}
card.addEventListener('click',_0x002A);
card.addEventListener('keydown',e=>{
if(e.key==='Enter'||e.key===' '){
e.preventDefault();
_0x002A();
}
});
});
const _0x001C='4806b2b9-ffc1-4a56-b9ae-9a805d59058d';
const _0x001D=document.getElementById('_0x001D');
if(_0x001D){
const _0x001E=document.getElementById('orderSubmit');
const _0x001F=document.getElementById('orderNote');
const _0x0020=_0x001F?_0x001F.textContent:'';
_0x001D.addEventListener('submit',async e=>{
e.preventDefault();
if(_0x001C==='YOUR_ACCESS_KEY_HERE'){
if(_0x001F){
_0x001F.textContent='Order form isn\'t connected yet — add your Web3Forms access key in script.js.';
_0x001F.classList.add('is-error');
}
return;
}
const _0x0021=_0x001D.querySelector('#orderName')._0x0018.trim();
const _0x0022=_0x001D.querySelector('input[_0x0021="package"]:checked')._0x0018;
const _0x0023=_0x001D.querySelector('#orderMessage')._0x0018.trim();
_0x001E.disabled=true;
_0x001E.textContent='Sending…';
if(_0x001F){
_0x001F.textContent='';
_0x001F.classList.remove('is-success','is-error');
}
try{
const _0x0024=await fetch('https://api.web3forms.com/submit',{
method:'POST',
headers:{'Content-Type':'application/json',Accept:'application/json'},
body:JSON.stringify({
access_key:_0x001C,
subject:`NFC card order — ${_0x0022}`,
from_name:'TapCard order form',
_0x0021:_0x0021,
package:_0x0022,
_0x0023:_0x0023
})
});
const _0x0025=await _0x0024.json();
if(_0x0025.success){
_0x001D.reset();
if(_0x001F){
_0x001F.textContent='Sent!We\'ll follow up shortly to confirm your order.';
_0x001F.classList.add('is-success');
}
}else{
throw new Error(_0x0025._0x0023||'Submission failed');
}
}catch(err){
if(_0x001F){
_0x001F.textContent='Something went wrong sending that — please try again or _0x0023 us directly below.';
_0x001F.classList.add('is-error');
}
}finally{
_0x001E.disabled=false;
_0x001E.textContent='Send order details';
}
});
}
document.querySelectorAll('.copy-item').forEach(item=>{
const _0x0018=item.getAttribute('data-copy');
if(!_0x0018)return;
function _0x002B(){
item.classList.add('copied');
clearTimeout(item._copyTimer);
item._copyTimer=setTimeout(()=>{
item.classList.remove('copied');
},0x578);
}
function _0x002C(text){
const _0x0026=document.createElement('textarea');
_0x0026._0x0018=text;
_0x0026.style.position='fixed';
_0x0026.style.top='-9999px';
_0x0026.style.opacity='0';
_0x0026.setAttribute('readonly','');
document.body.appendChild(_0x0026);
_0x0026.select();
_0x0026.setSelectionRange(0,_0x0026._0x0018.length);
try{
document.execCommand('copy');
}catch(e){
console.warn('Copy failed:',e);
}
document.body.removeChild(_0x0026);
}
function _0x002D(){
if(navigator.clipboard&&typeof navigator.clipboard.writeText==='function'){
navigator.clipboard.writeText(_0x0018).then(_0x002B).catch(()=>{
_0x002C(_0x0018);
_0x002B();
});
}else{
_0x002C(_0x0018);
_0x002B();
}
}
item.addEventListener('click',_0x002D);
item.addEventListener('keydown',e=>{
if(e.key==='Enter'||e.key===' '){
e.preventDefault();
_0x002D();
}
});
});
