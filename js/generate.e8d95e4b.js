"use strict";(self["webpackChunkquizbowl_schedule_generator"]=self["webpackChunkquizbowl_schedule_generator"]||[]).push([[7],{8174:function(e,t,o){o.d(t,{W:function(){return s}});class s extends Error{constructor(e){super(e),this.name="QuizbowlEngineException"}}},5037:function(e,t,o){o.d(t,{h:function(){return r}});var s=o(2482);class r{constructor(){(0,s.Z)(this,"schoolCanNotPlaySelf",!0),(0,s.Z)(this,"teamCanNotPlaySameTeamTwice",!0),(0,s.Z)(this,"byeRoundAllowed",!0),(0,s.Z)(this,"maxByesPerTeam",1),(0,s.Z)(this,"numberOfRounds",6),(0,s.Z)(this,"maxTimesAgainstSameSchool",0),(0,s.Z)(this,"maxTimesInSameRoom",0)}}},4310:function(e,t,o){o.d(t,{m:function(){return n}});var s=o(5037),r=o(1020);const n=(0,r.Q_)("Configuration",{state:()=>{const e={schools:[],rooms:[],ruleset:new s.h};return e},getters:{getSchools:e=>e.schools,getRooms:e=>e.rooms,getRules:e=>e.ruleset},actions:{set(e,t,o){this.schools=e,this.rooms=t,this.ruleset=o}}})},8815:function(e,t,o){o.d(t,{p:function(){return n}});var s=o(8174),r=o(1020);const n=(0,r.Q_)("Result",{state:()=>{const e={schedule:null};return e},getters:{getSchedule:e=>{if(null==e.schedule)throw new s.W("Schedule Not Generated");return e.schedule}},actions:{set(e){console.log("committing schedule"),console.log(e),this.schedule=e}}})},9272:function(e,t,o){o.r(t),o.d(t,{default:function(){return G}});var s=o(3396),r=o(7139),n=o(7771),a=o(7041),l=o(2370),i=o(4870),c=o(320),h=o(131),u=o(9888);const m=(0,c.a)({name:"VDivider",props:{color:String,inset:Boolean,length:[Number,String],thickness:[Number,String],vertical:Boolean,...(0,a.x$)()},setup(e,t){let{attrs:o}=t;const{themeClasses:r}=(0,a.ER)(e),{backgroundColorClasses:n,backgroundColorStyles:c}=(0,l.Y5)((0,i.Vh)(e,"color")),m=(0,s.Fl)((()=>{const t={};return e.length&&(t[e.vertical?"maxHeight":"maxWidth"]=(0,h.kb)(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=(0,h.kb)(e.thickness)),t}));return(0,u.L)((()=>(0,s.Wm)("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},r.value,n.value],style:[m.value,c.value],"aria-orientation":o.role&&"separator"!==o.role?void 0:e.vertical?"vertical":"horizontal",role:`${o.role||"separator"}`},null))),{}}}),d=(0,s._)("h1",null,"Generating...",-1),f=(0,s._)("span",null,"Please Wait. This may take several minutes.",-1);function g(e,t,o,a,l,i){const c=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",null,[d,f,e.failed?((0,s.wg)(),(0,s.j4)(n.w,{key:0,prominent:"",type:"error"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Failed to Generate Schedule "),(0,s.Wm)(c,{onClick:t[0]||(t[0]=t=>e.work()),to:"/generate"},{default:(0,s.w5)((()=>[(0,s.Uk)("Retry")])),_:1}),(0,s.Uk)(" or "),(0,s.Wm)(c,{to:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)("Reconfigure")])),_:1}),(0,s.Wm)(m),(0,s._)("small",null,(0,r.zw)(e.errMsg),1)])),_:1})):(0,s.kq)("",!0)])}o(7658);var y=o(4310),v=o(2482);class p extends Array{constructor(e){if(super(),e&&e instanceof Array)for(const t of e)this.push(t)}popRandom(){const e=Math.floor(Math.random()*this.length);return this.splice(e,1)[0]}copy(){return new p([...this])}}class b{constructor(e,t){(0,v.Z)(this,"letter",void 0),(0,v.Z)(this,"numberString",void 0),(0,v.Z)(this,"symbol",void 0),this.letter=e,this.numberString=t,this.symbol=Symbol()}toString(){return`${this.letter} (${this.numberString})`}}class S extends p{}const w="A";function T(e){return String.fromCharCode(w.charCodeAt(0)+e)}function R(e){const t=[];for(let o=0;o<e.length;o++)t.push(new b(T(o),e[o]));return t}class x{constructor(e){(0,v.Z)(this,"name",void 0),(0,v.Z)(this,"symbol",void 0),this.name=e,this.symbol=Symbol(this.toString())}toString(){return this.name}}class k{constructor(e,t){(0,v.Z)(this,"school",void 0),(0,v.Z)(this,"number",void 0),(0,v.Z)(this,"symbol",void 0),this.school=e,this.number=t,this.symbol=Symbol(this.toString())}toString(){return`${this.school.toString()} ${this.number}`}}class W extends p{}function C(e){const t=new W([]);for(const o of e){const e=new x(o.name);for(let s=0;s<o.numberOfTeams;s++)t.push(new k(e,s+1))}return t}var Z=o(8174),B=o(5037);class _{isSameSchool(){return!1}toString(){throw new Z.W("You should not create an instance of Match")}hasTeam(e){return!1}getTeams(){return[]}isBye(){return!1}}class P extends _{constructor(e,t,o){super(),(0,v.Z)(this,"teamA",void 0),(0,v.Z)(this,"teamB",void 0),(0,v.Z)(this,"room",void 0),this.teamA=e,this.teamB=t,this.room=o}isSameSchool(){return this.teamA.school==this.teamB.school}toString(){return`${this.teamA.toString()} vs ${this.teamB.toString()} in ${this.room.toString()}`}hasTeam(e){return this.teamA===e||this.teamB===e}getTeams(){return[this.teamA,this.teamB]}getRoom(){return this.room}}class E extends _{constructor(e){super(),(0,v.Z)(this,"team",void 0),this.team=e}toString(){return`${this.team.toString()} has a bye`}hasTeam(e){return this.team===e}isBye(){return!0}}class M{getMatch(e){return this.matches[e]}matchesLength(){return this.matches.length}constructor(e,t,o=!1){(0,v.Z)(this,"matches",[]),this.generateRound(e,t,o)}generateMatch(e,t){const o=e.popRandom(),s=e.popRandom(),r=t.popRandom();return new P(o,s,r)}generateRound(e,t,o){const s=e.copy(),r=t.copy();this.ensureSafeToGenerateRound(s,o,r),this.generateMatches(s,r),this.generateBye(s)}generateBye(e){while(e.length>0){const t=new E(e.popRandom());this.matches.push(t)}}generateMatches(e,t){while(e.length>1){const o=this.generateMatch(e,t);this.matches.push(o)}}ensureSafeToGenerateRound(e,t,o){if(e.length%2===1&&!t)throw new Z.W("There must be an even number of teams if teams are not allowed a bye.");if(this.matches.length>0)throw new Z.W("You can not generate a round after it has already been generated.");if(o.length<e.length/2)throw new Z.W("There must be at least half as many rooms as teams.")}forEach(e){this.matches.forEach(e)}getTeamMatch(e){for(const t of this.matches)if(t.hasTeam(e))return t;throw new Z.W("Team Match Not Found")}}class $ extends Z.W{constructor(e){super(e),this.name="RuleEnforcementException"}}function A(e,t,o){return e.hasOwnProperty(t)||(e[t]=o),e[t]}class O{getRound(e){return this.rounds[e]}roundsLength(){return this.rounds.length}constructor(e,t,o=new B.h){(0,v.Z)(this,"rounds",void 0),(0,v.Z)(this,"teams",void 0),(0,v.Z)(this,"rooms",void 0),(0,v.Z)(this,"ruleset",void 0),this.rounds=[],this.teams=new W(e),this.rooms=new S(t),this.ruleset=o;for(let s=0;s<this.ruleset.numberOfRounds;s++)this.rounds.push(new M(this.teams,this.rooms,o.byeRoundAllowed))}doSchoolsPlaySelf(){this.forEach((e=>{e.forEach((e=>{if(e.isSameSchool())throw new $("team has the same school competing against itself.")}))}))}doesTeamPlaySameTeamTwice(){for(const e of this.teams){let t=[];for(const o of this.rounds){const s=o.getTeamMatch(e);t=t.concat(s.getTeams().filter((t=>t!==e)))}if(new Set(t).size!==t.length)throw new $("team plays the same team twice.")}}doesExceedByesPerTeam(e){for(const t of this.teams){let o=0;for(const s of this.rounds){const r=s.getTeamMatch(t);if(r.isBye()&&o++,o>e)throw new $("team has too many bye rounds.")}}}ensureSchoolLimit(e){const t={};for(const o of this.rounds)for(const e of o.matches)e instanceof P&&this.recordSchoolMeets(e,t);for(const o of Object.getOwnPropertySymbols(t))for(const s of Object.getOwnPropertySymbols(t[o]))if(t[o][s]>e)throw new Z.W("Too many meetings against same school "+o.toString()+" "+s.toString()+" "+t[o][s])}recordSchoolMeets(e,t){const o=e.getTeams(),s=A(t,o[0].symbol,{});A(s,o[1].school.symbol,0),s[o[1].school.symbol]+=1;const r=A(t,o[1].symbol,{});A(r,o[0].school.symbol,0),r[o[0].school.symbol]+=1}ensureRoomRounds(e){const t={};for(const o of this.rounds)for(const e of o.matches)e instanceof P&&this.recordRoomRounds(e,t);for(const o of Object.getOwnPropertySymbols(t))for(const s of Object.getOwnPropertySymbols(t[o]))if(t[o][s]>e)throw new Z.W("Too many rounds in the same room")}recordRoomRounds(e,t){const o=e.getTeams(),s=A(t,o[0].symbol,{});A(s,e.getRoom().symbol,0),s[e.getRoom().symbol]+=1;const r=A(t,o[1].symbol,{});A(r,e.getRoom().symbol,0),r[e.getRoom().symbol]+=1}ensureValid(){this.ruleset.schoolCanNotPlaySelf&&this.doSchoolsPlaySelf(),this.ruleset.teamCanNotPlaySameTeamTwice&&this.doesTeamPlaySameTeamTwice(),this.ruleset.byeRoundAllowed&&this.doesExceedByesPerTeam(this.ruleset.maxByesPerTeam),this.ruleset.maxTimesAgainstSameSchool>0&&this.ensureSchoolLimit(this.ruleset.maxTimesAgainstSameSchool),this.ruleset.maxTimesInSameRoom&&this.ensureRoomRounds(this.ruleset.maxTimesInSameRoom)}forEach(e){this.rounds.forEach(e)}}const z=1e5;class V{static generate(e,t,o=new B.h){const s=new Set;for(let a=0;a<z;a++)try{const s=new O(e,t,o);return s.ensureValid(),s}catch(n){const e=n.toString();s.add(e)}let r="Failed to generate schedule within try limit.\n";throw s.forEach((e=>{r+=e+"\n"})),new Z.W(r)}}var F=o(8815);const I=100;var N=(0,s.aZ)({name:"ScheduleGenerator",methods:{work(){this.failed=!1,setTimeout(this.workInternal,I)},workInternal(){try{const e=R(this.rooms),t=C(this.schools),o=V.generate(t,e,this.rules);this.failed=!1,this.commitResult(o),this.$router.push("/result")}catch(e){this.failed=!0,e instanceof Error?this.errMsg=e.toString():this.errMsg=""}}},data:()=>({failed:!1,errMsg:""}),mounted(){setTimeout(this.work,I)},setup:()=>{const e=(0,y.m)(),t=(0,F.p)();return{schools:e.getSchools,rooms:e.getRooms,rules:e.getRules,commitResult:t.set}}}),j=o(89);const L=(0,j.Z)(N,[["render",g]]);var G=L},2482:function(e,t,o){function s(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,{Z:function(){return s}})},7771:function(e,t,o){o.d(t,{w:function(){return k}});var s=o(3396),r=o(1114);const n=(0,r.J)("v-alert-title");var a=o(6319),l=o(836),i=o(3289),c=o(5221),h=o(9694),u=o(4544),m=o(2465),d=o(6903),f=o(489),g=o(4231),y=o(1138),v=o(7041),p=o(1629),b=o(5087),S=o(2370),w=o(4960),T=o(4870),R=o(320);const x=["success","info","warning","error"],k=(0,R.a)({name:"VAlert",props:{border:{type:[Boolean,String],validator:e=>"boolean"===typeof e||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:w.lE,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>x.includes(e)},...(0,h.f)(),...(0,u.x)(),...(0,m.c)(),...(0,d.y)(),...(0,f.F)(),...(0,g.I)(),...(0,y.Q)(),...(0,v.x$)(),...(0,c.bk)({variant:"flat"})},emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:o}=t;const r=(0,b.z)(e,"modelValue"),y=(0,s.Fl)((()=>{if(!1!==e.icon)return e.type?e.icon??`$${e.type}`:e.icon})),w=(0,s.Fl)((()=>({color:e.color??e.type,variant:e.variant}))),{themeClasses:R}=(0,v.ER)(e),{colorClasses:x,colorStyles:k,variantClasses:W}=(0,c.c1)(w),{densityClasses:C}=(0,h.t)(e),{dimensionStyles:Z}=(0,u.$)(e),{elevationClasses:B}=(0,m.Y)(e),{locationStyles:_}=(0,d.T)(e),{positionClasses:P}=(0,f.K)(e),{roundedClasses:E}=(0,g.b)(e),{textColorClasses:M,textColorStyles:$}=(0,S.rY)((0,T.Vh)(e,"borderColor")),{t:A}=(0,p.bU)(),O=(0,s.Fl)((()=>({"aria-label":A(e.closeLabel),onClick(e){r.value=!1}})));return()=>{var t,h;const u=!(!o.prepend&&!y.value),m=!(!o.title&&!e.title),d=!(!e.text&&!o.text),f=!(!o.close&&!e.closable);return r.value&&(0,s.Wm)(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${!0===e.border?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},R.value,x.value,C.value,B.value,P.value,E.value,W.value],style:[k.value,Z.value,_.value],role:"alert"},{default:()=>[(0,c.Ux)(!1,"v-alert"),e.border&&(0,s.Wm)("div",{key:"border",class:["v-alert__border",M.value],style:$.value},null),u&&(0,s.Wm)(l.z,{key:"prepend",defaults:{VIcon:{density:e.density,icon:y.value,size:e.prominent?44:28}}},{default:()=>[(0,s.Wm)("div",{class:"v-alert__prepend"},[o.prepend?o.prepend():y.value&&(0,s.Wm)(i.t,null,null)])]}),(0,s.Wm)("div",{class:"v-alert__content"},[m&&(0,s.Wm)(n,{key:"title"},{default:()=>[o.title?o.title():e.title]}),d&&(o.text?o.text():e.text),null==(t=o.default)?void 0:t.call(o)]),o.append&&(0,s.Wm)("div",{key:"append",class:"v-alert__append"},[o.append()]),f&&(0,s.Wm)(l.z,{key:"close",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>[(0,s.Wm)("div",{class:"v-alert__close"},[(null==(h=o.close)?void 0:h.call(o,{props:O.value}))??(0,s.Wm)(a.T,O.value,null)])]})]})}}})}}]);
//# sourceMappingURL=generate.e8d95e4b.js.map