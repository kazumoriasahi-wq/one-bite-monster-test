(function(root){'use strict';const TAU=Math.PI*2,WINDOW=.27,DURATION=45;
const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
function create(seed=Date.now()){return{phase:'ready',time:0,left:DURATION,score:0,bestCombo:0,combo:0,eaten:0,avoided:0,lives:3,face:-Math.PI/2,food:null,gap:.3,cool:0,mouth:0,events:[],serial:0,rng:seed>>>0,lastHazard:false};}
function random(s){s.rng=(Math.imul(s.rng,1664525)+1013904223)>>>0;return s.rng/4294967296;}
function start(s){if(s.phase!=='ready')return false;s.phase='playing';s.gap=.35;return true;}
function speed(s){return Math.min(2.6,1.15+s.eaten*.045);}
function spawn(s){const hazard=s.eaten>=3&&!s.lastHazard&&random(s)<.24;s.lastHazard=hazard;s.food={id:++s.serial,hazard,kind:Math.floor(random(s)*4),angle:s.face-1.55};}
function error(s,type){s.lives--;s.combo=0;s.events.push({type});if(s.lives<=0){s.phase='over';s.events.push({type:'over'});}}
function bite(s){if(s.phase!=='playing'||s.cool>0||!s.food)return null;s.cool=.22;s.mouth=.25;const f=s.food;if(!f||Math.abs(wrap(f.angle-s.face))>WINDOW){error(s,'empty');return'empty';}s.food=null;s.gap=.37;if(f.hazard){error(s,'spike');return'spike';}s.combo++;s.bestCombo=Math.max(s.combo,s.bestCombo);s.eaten++;const perfect=Math.abs(wrap(f.angle-s.face))<.105,gain=10+Math.min(10,s.combo)*2+(perfect?5:0);s.score+=gain;s.events.push({type:perfect?'perfect':'eat',gain,combo:s.combo,kind:f.kind,angle:f.angle});return perfect?'perfect':'eat';}
function step(s,dt){if(s.phase!=='playing'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(.1,dt);s.time+=dt;s.left=Math.max(0,DURATION-s.time);s.face=-Math.PI/2+s.time*.16;s.cool=Math.max(0,s.cool-dt);s.mouth=Math.max(0,s.mouth-dt);if(s.left<=0){s.phase='over';s.events.push({type:'over'});return;}if(!s.food){s.gap-=dt;if(s.gap<=0)spawn(s);return;}const f=s.food;f.angle+=(speed(s)+.16)*dt;if(wrap(f.angle-s.face)>.42){s.food=null;s.gap=.35;if(f.hazard){s.avoided++;s.score+=3;s.events.push({type:'avoid',gain:3});}else error(s,'miss');}}
function near(s){return!!s.food&&Math.abs(wrap(s.food.angle-s.face))<=WINDOW;}
const api={TAU,WINDOW,DURATION,wrap,create,start,speed,spawn,bite,step,near};root.BiteEngine=api;if(typeof module!=='undefined')module.exports=api;})(globalThis);
