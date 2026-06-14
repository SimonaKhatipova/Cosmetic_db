import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{i as t,n,r,t as i}from"./vendor-DvSjJ-I6.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var a=e(t(),1),o=r(),s=`/assets/mascot-xWQnxpLg.png`,c=`/legal/`,l={offer:c+`oferta.html`,policy:c+`politika.html`,pdConsent:c+`soglasie-pd.html`,adsConsent:c+`soglasie-reklama.html`,ownerName:`Хатипова Симона Ирековна`,ownerInn:`590775176329`,ownerEmail:`info.simona@vk.com`},u=n(),d={bg:`#eef2ef`,glass:`rgba(255,253,250,0.72)`,glassBd:`rgba(255,255,255,0.72)`,ink:`#16241d`,inkSoft:`#3f534a`,inkFaint:`#74897f`,accent:`#0f6b4d`,accentD:`#0a4a35`,accentS:`#2a9b73`,accentBg:`rgba(15,107,77,0.08)`,line:`rgba(60,110,88,0.15)`,shadow:`0 8px 32px rgba(15,75,55,0.14)`,shadowSm:`0 2px 14px rgba(15,75,55,0.09)`,rose:`#c17b8a`,font:`'Manrope', sans-serif`,serif:`'Playfair Display', serif`},f={fontSize:11,fontWeight:700,color:d.inkFaint,letterSpacing:`.12em`,textTransform:`uppercase`,display:`flex`,alignItems:`center`,gap:10,marginBottom:16};function p(){return(0,u.jsx)(`span`,{style:{fontFamily:`'Familjen Grotesk', sans-serif`,fontWeight:700,color:d.accent,letterSpacing:`-0.02em`,whiteSpace:`nowrap`},children:`Beauty Helper`})}function m({children:e,color:t}){return(0,u.jsxs)(`div`,{style:{...f,color:t||d.inkFaint},children:[(0,u.jsx)(`span`,{style:{display:`block`,width:20,height:1.5,background:t||d.inkFaint,opacity:.5}}),e]})}var h={pink:`/flowers/flower-pink.png`,blue:`/flowers/flower-blue.png`},g=[{img:`pink`,hue:0,size:740,left:`-13%`,top:`-9%`,opacity:.15,rot:12,blur:0},{img:`blue`,hue:0,size:430,left:`81%`,top:`3%`,opacity:.14,rot:-18,blur:0},{img:`pink`,hue:255,size:300,left:`57%`,top:`36%`,opacity:.12,rot:30,blur:5},{img:`blue`,hue:140,size:860,left:`60%`,top:`56%`,opacity:.11,rot:-8,blur:9},{img:`pink`,hue:45,size:350,left:`5%`,top:`54%`,opacity:.12,rot:-16,blur:0},{img:`blue`,hue:235,size:250,left:`30%`,top:`82%`,opacity:.1,rot:24,blur:7}];function _(){let e=(0,a.useRef)([]);return(0,a.useEffect)(()=>{let t,n=g.map(()=>({x:0,y:0,tx:0,ty:0})),r=t=>{e.current.forEach((e,r)=>{if(!e)return;let i=e.getBoundingClientRect(),a=i.left+i.width/2-t.clientX,o=i.top+i.height/2-t.clientY,s=Math.hypot(a,o)||1,c=Math.max(0,1-s/520);n[r].tx=a/s*c*64,n[r].ty=o/s*c*64})},i=()=>{e.current.forEach((e,t)=>{if(!e)return;let r=n[t];r.x+=(r.tx-r.x)*.018,r.y+=(r.ty-r.y)*.018,e.style.transform=`translate(${r.x.toFixed(2)}px, ${r.y.toFixed(2)}px) rotate(${g[t].rot}deg)`}),t=requestAnimationFrame(i)};return window.addEventListener(`mousemove`,r),t=requestAnimationFrame(i),()=>{window.removeEventListener(`mousemove`,r),cancelAnimationFrame(t)}},[]),(0,u.jsxs)(`div`,{style:{position:`fixed`,inset:0,zIndex:0,pointerEvents:`none`,overflow:`hidden`},children:[(0,u.jsx)(`div`,{style:{position:`absolute`,left:`-8%`,top:`22%`,width:620,height:620,borderRadius:`50%`,background:`rgba(155,125,180,0.16)`,filter:`blur(100px)`}}),(0,u.jsx)(`div`,{style:{position:`absolute`,left:`68%`,top:`-8%`,width:460,height:460,borderRadius:`50%`,background:`rgba(155,125,180,0.12)`,filter:`blur(95px)`}}),(0,u.jsx)(`div`,{style:{position:`absolute`,left:`38%`,top:`66%`,width:520,height:520,borderRadius:`50%`,background:`rgba(139,99,184,0.10)`,filter:`blur(110px)`}}),g.map(({img:t,hue:n,size:r,left:i,top:a,opacity:o,rot:s,blur:c},l)=>(0,u.jsx)(`div`,{ref:t=>{e.current[l]=t},style:{position:`absolute`,left:i,top:a,width:r,height:r,opacity:o,transform:`rotate(${s}deg)`,willChange:`transform`},children:(0,u.jsx)(`img`,{src:h[t],width:r,height:r,alt:``,style:{display:`block`,width:`100%`,height:`100%`,objectFit:`contain`,filter:`${n?`hue-rotate(${n}deg) saturate(1.2)`:`saturate(1.08)`}${c?` blur(${c}px)`:``}`}})},l))]})}function v({onLogin:e,onRegister:t,onPricing:n}){return(0,u.jsxs)(`nav`,{className:`lp-nav`,children:[(0,u.jsx)(`div`,{className:`lp-brand`,onClick:()=>{window.location.hash=``,window.scrollTo({top:0,behavior:`smooth`})},children:`Beauty Helper`}),(0,u.jsx)(`div`,{style:{flex:1}}),(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,u.jsx)(`button`,{className:`lp-nav-btn lp-pricing-link`,onClick:n,children:`Тарифы`}),(0,u.jsx)(`button`,{className:`lp-nav-btn lp-login`,onClick:e,children:`Войти`}),(0,u.jsx)(`button`,{className:`lp-nav-btn lp-try`,onClick:t,children:`Попробовать`})]})]})}var y=[{name:`CeraVe Cleanser`,type:`Очищение`,bg:`#edf4f0`,init:`CV`},{name:`The Ordinary Niac.`,type:`Сыворотка`,bg:`#f0edf4`,init:`TO`},{name:`La Roche-Posay SPF`,type:`Защита`,bg:`#edf0f4`,init:`LR`},{name:`Bioderma Sensibio`,type:`Мицеллярная`,bg:`#f4edf0`,init:`BD`},{name:`Kiehl's Ultra Facial`,type:`Увлажнение`,bg:`#edf4ed`,init:`KH`},{name:`Paula's Choice BHA`,type:`Кислоты`,bg:`#f4f0ed`,init:`PC`},{name:`Drunk Elephant C-F`,type:`Антиоксид.`,bg:`#ededf4`,init:`DE`}],b=[{name:`Olaplex No.3`,type:`Восстановление`,bg:`#edf4f4`,init:`OL`},{name:`Davines NOUNOU`,type:`Шампунь`,bg:`#f4eded`,init:`DV`},{name:`Redken All Soft`,type:`Маска`,bg:`#eef4ed`,init:`RK`},{name:`Moroccanoil`,type:`Масло`,bg:`#f4f4ed`,init:`MO`},{name:`Wella Fusion 9+`,type:`Протеин`,bg:`#ededf4`,init:`WL`},{name:`Kerastase Elixir`,type:`Масло`,bg:`#f4edf4`,init:`KS`},{name:`L'Oreal Absolut`,type:`Маска`,bg:`#edf4ee`,init:`LO`}];function x({name:e,type:t,bg:n,init:r}){return(0,u.jsxs)(`div`,{style:{flexShrink:0,width:148,borderRadius:12,background:n,border:`1px solid rgba(255,255,255,0.88)`,padding:`9px 12px 10px`,boxShadow:`0 2px 8px rgba(15,75,55,0.07)`},children:[(0,u.jsx)(`div`,{style:{fontSize:8.5,fontWeight:700,color:d.inkFaint,letterSpacing:`.07em`,textTransform:`uppercase`,marginBottom:7},children:t}),(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:9},children:[(0,u.jsxs)(`div`,{style:{position:`relative`,width:34,height:50,flexShrink:0},children:[(0,u.jsx)(`div`,{style:{position:`absolute`,top:0,left:`50%`,transform:`translateX(-50%)`,width:16,height:10,borderRadius:`4px 4px 2px 2px`,background:`rgba(255,255,255,0.92)`,border:`1px solid rgba(0,0,0,0.06)`}}),(0,u.jsx)(`div`,{style:{position:`absolute`,top:9,left:`50%`,transform:`translateX(-50%)`,width:12,height:5,background:`rgba(255,255,255,0.82)`,border:`1px solid rgba(0,0,0,0.05)`,borderBottom:`none`}}),(0,u.jsx)(`div`,{style:{position:`absolute`,top:13,left:0,right:0,bottom:0,borderRadius:`7px 7px 10px 10px`,background:`rgba(255,255,255,0.82)`,border:`1px solid rgba(0,0,0,0.06)`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,u.jsx)(`span`,{style:{fontSize:9,fontWeight:800,color:`rgba(0,0,0,0.25)`,letterSpacing:`.02em`},children:r})})]}),(0,u.jsx)(`div`,{style:{fontSize:10.5,fontWeight:600,color:d.ink,lineHeight:1.25},children:e})]})]})}function S({label:e,steps:t,color:n}){return(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6,flexWrap:`wrap`},children:[(0,u.jsx)(`div`,{style:{fontSize:10,fontWeight:700,color:n,width:40,flexShrink:0,letterSpacing:`.04em`},children:e}),t.map((e,n)=>(0,u.jsxs)(a.Fragment,{children:[(0,u.jsx)(`div`,{style:{fontSize:10.5,color:d.inkSoft,fontWeight:500,background:`rgba(255,255,255,0.72)`,border:`1px solid ${d.line}`,padding:`3px 8px`,borderRadius:6,whiteSpace:`nowrap`},children:e}),n<t.length-1&&(0,u.jsx)(`div`,{style:{fontSize:9,color:d.inkFaint,flexShrink:0},children:`→`})]},n))]})}var C=[{seg:1,text:`1-я неделя: заметно меньше ломкости`},{seg:3,text:`3-я неделя: волосы мягче на ощупь`},{seg:5,text:`5-я неделя: меньше жирности у корней`},{seg:7,text:`7-я неделя: объём и лёгкость`},{seg:9,text:`9-я неделя: желаемый результат близко`},{seg:10,text:`10-я неделя: цель достигнута!`}];function w(){let[e,t]=(0,a.useState)(1);(0,a.useEffect)(()=>{let e=setInterval(()=>{t(e=>e>=10?0:e+1)},1e3);return()=>clearInterval(e)},[]);let n=[...C].reverse().find(t=>e>=t.seg)?.text??`Начинаем программу ухода...`;return(0,u.jsxs)(`div`,{style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:14,padding:`13px 17px`,backdropFilter:`blur(12px)`,boxShadow:d.shadowSm},children:[(0,u.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:9},children:[(0,u.jsx)(`span`,{style:{fontSize:9.5,fontWeight:700,color:d.inkFaint,letterSpacing:`.1em`,textTransform:`uppercase`},children:`Восстановление волос`}),(0,u.jsxs)(`span`,{style:{fontSize:11,fontWeight:700,color:e>=10?d.accentS:d.inkSoft},children:[e*10,`%`]})]}),(0,u.jsx)(`div`,{style:{display:`flex`,gap:3.5,marginBottom:9},children:Array.from({length:10}).map((t,n)=>(0,u.jsx)(`div`,{style:{flex:1,height:9,borderRadius:2.5,background:n<e?`linear-gradient(90deg, ${d.accentS}, ${d.accent})`:`rgba(42,155,115,0.11)`,transition:`background 0.35s ease`,boxShadow:n<e?`0 1px 4px rgba(15,107,77,0.18)`:`none`}},n))}),(0,u.jsx)(`div`,{style:{fontSize:10.5,color:d.inkSoft,fontStyle:`italic`},children:n})]})}function T(){return(0,u.jsxs)(`div`,{style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:16,padding:`13px 15px`,backdropFilter:`blur(12px)`,boxShadow:d.shadowSm},children:[(0,u.jsx)(`div`,{style:{fontSize:9.5,fontWeight:700,color:d.inkFaint,letterSpacing:`.1em`,textTransform:`uppercase`,marginBottom:10},children:`Сравнение средств`}),(0,u.jsx)(`div`,{style:{display:`flex`,gap:5,marginBottom:9},children:[{init:`RB`,bg:`#edf4f0`},{init:`AE`,bg:`#f0edf4`},{init:`HH`,bg:`#edf0f4`},{init:`IS`,bg:`#f4edf0`}].map(({init:e,bg:t})=>(0,u.jsx)(`div`,{style:{flex:1,height:32,borderRadius:9,background:t,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:9,fontWeight:700,color:`rgba(0,0,0,0.3)`,border:`1px solid rgba(255,255,255,0.85)`},children:e},e))}),[{label:`Безопасн.`,values:[`100`,`100`,`100`,`100`],accent:!0},{label:`Ингред.`,values:[`46`,`32`,`26`,`30`]},{label:`Совпад.`,values:[`база`,`37%`,`5%`,`36%`]}].map(({label:e,values:t,accent:n})=>(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,paddingBottom:5,marginBottom:5,borderBottom:`1px solid ${d.line}`},children:[(0,u.jsx)(`div`,{style:{width:56,fontSize:9.5,color:d.inkFaint,flexShrink:0},children:e}),t.map((e,t)=>(0,u.jsx)(`div`,{style:{flex:1,textAlign:`center`,fontSize:10,fontWeight:700,color:n?d.accentS:e===`база`?d.inkFaint:d.inkSoft},children:e},t))]},e))]})}function E(){return(0,u.jsxs)(`div`,{style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:16,padding:`13px 15px`,backdropFilter:`blur(12px)`,boxShadow:d.shadowSm},children:[(0,u.jsx)(`div`,{style:{fontSize:9.5,fontWeight:700,color:d.inkFaint,letterSpacing:`.1em`,textTransform:`uppercase`,marginBottom:10},children:`Состав`}),(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:10,marginBottom:10},children:[(0,u.jsx)(`div`,{style:{width:48,height:48,borderRadius:`50%`,background:d.accentS,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:(0,u.jsx)(`span`,{style:{fontFamily:d.serif,fontSize:15,fontWeight:700,color:`#fff`},children:`100`})}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{fontSize:12,fontWeight:700,color:d.accentS,marginBottom:2},children:`Высокая`}),(0,u.jsx)(`div`,{style:{fontSize:10,color:d.inkFaint},children:`безопасность`})]})]}),(0,u.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:5},children:[{text:`Супер состав`,bg:`rgba(42,155,115,0.10)`,bd:`rgba(42,155,115,0.22)`,color:d.accent,dot:d.accentS},{text:`Рекомендовано`,bg:`rgba(42,155,115,0.05)`,bd:`rgba(42,155,115,0.20)`,color:d.accent,dot:d.accentS},{text:`Потенциальный аллерген`,bg:`rgba(201,138,58,0.10)`,bd:`rgba(201,138,58,0.30)`,color:`#9a6a24`,dot:`#c98a3a`}].map(({text:e,bg:t,bd:n,color:r,dot:i})=>(0,u.jsxs)(`div`,{style:{display:`inline-flex`,alignItems:`center`,gap:5,background:t,border:`1px solid ${n}`,borderRadius:8,padding:`4px 9px`},children:[(0,u.jsx)(`div`,{style:{width:5,height:5,borderRadius:1.5,background:i}}),(0,u.jsx)(`span`,{style:{fontSize:9.5,fontWeight:700,color:r,letterSpacing:`.03em`},children:e})]},e))})]})}function D({onRegister:e,onScrollPricing:t}){return(0,u.jsxs)(`section`,{style:{minHeight:`100vh`,display:`flex`,alignItems:`flex-start`,padding:`clamp(88px, 15vw, 112px) clamp(1.5rem, 6vw, 4rem) clamp(48px, 8vw, 80px)`,position:`relative`,overflow:`hidden`},children:[(0,u.jsx)(`div`,{style:{position:`absolute`,inset:0,zIndex:0,pointerEvents:`none`,background:`
          radial-gradient(860px 520px at 85% 15%, rgba(42,155,115,0.09) 0%, transparent 60%),
          radial-gradient(640px 400px at 5% 85%,  rgba(15,107,77,0.06) 0%, transparent 60%)
        `}}),(0,u.jsxs)(`div`,{className:`lp-hero-grid`,style:{maxWidth:1440,margin:`0 auto`,width:`100%`,display:`grid`,gridTemplateColumns:`1fr minmax(400px, 560px)`,gap:`clamp(40px, 5vw, 80px)`,position:`relative`,zIndex:1},children:[(0,u.jsxs)(i.div,{initial:{opacity:0,y:28},animate:{opacity:1,y:0},transition:{duration:.75,ease:[.23,1,.32,1]},style:{paddingTop:12},children:[(0,u.jsxs)(`div`,{style:{...f,color:d.accentS},children:[(0,u.jsx)(`span`,{style:{display:`block`,width:24,height:1.5,background:d.accentS}}),`Инструмент для осознанного ухода`]}),(0,u.jsxs)(`h1`,{style:{fontFamily:d.serif,fontSize:`clamp(3rem, 6.2vw, 6.6rem)`,fontWeight:700,fontStyle:`italic`,color:d.ink,lineHeight:1.05,letterSpacing:`-0.022em`,marginBottom:30},children:[`Почему ваша`,(0,u.jsx)(`br`,{}),`косметика`,(0,u.jsx)(`br`,{}),`не работает?`]}),(0,u.jsxs)(`p`,{style:{fontSize:`clamp(16px, 2.1vw, 24px)`,color:d.inkSoft,lineHeight:1.68,maxWidth:620,marginBottom:44},children:[`Подходит ли Вам Ваш шампунь? Как пользоваться этой дорогущей маской, чтобы результат был виден? Сочетаются ли активы в любимых средствах? Давайте разбираться вместе с `,(0,u.jsx)(p,{}),`.`]}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:12,flexWrap:`wrap`,marginBottom:56},children:[(0,u.jsx)(`button`,{onClick:e,style:{fontFamily:d.font,fontWeight:700,fontSize:`clamp(16px, 1.5vw, 19px)`,padding:`18px 38px`,borderRadius:14,border:`none`,cursor:`pointer`,background:d.accentD,color:`#fff`,boxShadow:`0 6px 24px rgba(10,74,53,0.32)`,letterSpacing:`-0.01em`},children:`Попробовать бесплатно`}),(0,u.jsx)(`button`,{onClick:t,style:{fontFamily:d.font,fontWeight:600,fontSize:`clamp(16px, 1.5vw, 19px)`,padding:`18px 36px`,borderRadius:14,cursor:`pointer`,background:d.glass,color:d.inkSoft,border:`1px solid ${d.glassBd}`,backdropFilter:`blur(10px)`},children:`Оплатить подписку`})]}),(0,u.jsx)(`div`,{className:`lp-stats`,style:{display:`flex`,gap:0,flexWrap:`wrap`,paddingTop:30,borderTop:`1px solid ${d.line}`},children:[{value:`20 000+`,label:`ингредиентов в базе`},{value:`1 200+`,label:`средств в каталоге`},{value:`20+`,label:`типов средств`},{value:`100%`,label:`составов на русском`}].map(({value:e,label:t},n,r)=>(0,u.jsxs)(`div`,{className:`lp-stat`,style:{paddingRight:28,marginRight:28,borderRight:n<r.length-1?`1px solid ${d.line}`:`none`},children:[(0,u.jsx)(`div`,{style:{fontSize:`clamp(24px, 2.4vw, 34px)`,fontWeight:800,color:d.accent,letterSpacing:`-0.03em`},children:e}),(0,u.jsx)(`div`,{style:{fontSize:12.5,color:d.inkFaint,marginTop:3},children:t})]},t))})]}),(0,u.jsxs)(i.div,{initial:{opacity:0,x:24},animate:{opacity:1,x:0},transition:{duration:.85,delay:.18,ease:[.23,1,.32,1]},style:{display:`flex`,flexDirection:`column`,gap:10},children:[(0,u.jsxs)(`div`,{style:{borderRadius:18,overflow:`hidden`,border:`1px solid ${d.glassBd}`,background:d.glass,backdropFilter:`blur(14px)`,WebkitBackdropFilter:`blur(14px)`,boxShadow:d.shadowSm},children:[(0,u.jsxs)(`div`,{style:{padding:`10px 16px`,display:`flex`,alignItems:`center`,gap:7,borderBottom:`1px solid ${d.line}`},children:[(0,u.jsx)(`div`,{style:{width:7,height:7,borderRadius:2,background:d.accentS,animation:`cpulse 1.6s ease-in-out infinite`}}),(0,u.jsx)(`span`,{style:{fontSize:10,fontWeight:700,color:d.inkFaint,letterSpacing:`.1em`,textTransform:`uppercase`},children:`Подбор средств`}),(0,u.jsx)(`span`,{style:{fontSize:10,color:d.accentS,fontWeight:600},children:`· идёт анализ`})]}),(0,u.jsx)(`div`,{style:{overflow:`hidden`,padding:`9px 0 5px`},children:(0,u.jsx)(`div`,{style:{display:`flex`,gap:7,paddingLeft:12,animation:`scrollLeft 20s linear infinite`,width:`max-content`},children:[...y,...y].map((e,t)=>(0,u.jsx)(x,{...e},t))})}),(0,u.jsx)(`div`,{style:{overflow:`hidden`,padding:`0 0 9px`},children:(0,u.jsx)(`div`,{style:{display:`flex`,gap:7,paddingLeft:12,animation:`scrollRight 24s linear infinite`,width:`max-content`},children:[...b,...b].map((e,t)=>(0,u.jsx)(x,{...e},t))})})]}),(0,u.jsxs)(`div`,{style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:18,padding:`16px 18px`,backdropFilter:`blur(14px)`,WebkitBackdropFilter:`blur(14px)`,boxShadow:d.shadow},children:[(0,u.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:10},children:[(0,u.jsx)(`div`,{style:{fontSize:10,fontWeight:700,color:d.inkFaint,letterSpacing:`.1em`,textTransform:`uppercase`},children:`Индивидуальный уход для волос`}),(0,u.jsx)(`div`,{style:{fontSize:9,fontWeight:800,letterSpacing:`.05em`,background:d.accentD,color:`#fff`,padding:`2px 8px`,borderRadius:100},children:`ПОДПИСКА`})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6,padding:`7px 11px`,borderRadius:9,marginBottom:14,background:`rgba(42,155,115,0.07)`,border:`1px solid rgba(42,155,115,0.14)`},children:[(0,u.jsx)(`div`,{style:{width:5,height:5,borderRadius:`50%`,background:d.accentS,flexShrink:0}}),(0,u.jsx)(`span`,{style:{fontSize:10.5,color:d.inkSoft},children:`Тонкие волосы · склонность к жирности у корней`})]}),[{n:1,step:`Глубокое очищение`,product:`Раз в неделю, по Вашим индивидуальным показаниям`},{n:2,step:`Очищение`,product:`Шампунь, подобранный под Ваш тип кожи головы`},{n:3,step:`Уход`,product:`Смываемые средства: красота волос и восстановление повреждений`},{n:4,step:`Защита`,product:`Несмываемый финиш для защиты от окружающей среды`}].map(({n:e,step:t,product:n},r,i)=>(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,gap:11,paddingBottom:r<i.length-1?11:0,marginBottom:r<i.length-1?11:0,borderBottom:r<i.length-1?`1px solid ${d.line}`:`none`},children:[(0,u.jsx)(`div`,{style:{width:26,height:26,borderRadius:8,flexShrink:0,background:d.accentBg,border:`1px solid rgba(15,107,77,0.14)`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:11,fontWeight:800,color:d.accent},children:e}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{fontSize:11,fontWeight:700,color:d.ink,marginBottom:1},children:t}),(0,u.jsx)(`div`,{style:{fontSize:10.5,color:d.inkSoft},children:n})]})]},e))]}),(0,u.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1.4fr`,gap:10},children:[(0,u.jsx)(E,{}),(0,u.jsx)(T,{})]}),(0,u.jsxs)(`div`,{style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:16,padding:`14px 16px`,backdropFilter:`blur(12px)`,WebkitBackdropFilter:`blur(12px)`,boxShadow:d.shadowSm},children:[(0,u.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:10},children:[(0,u.jsx)(`div`,{style:{fontSize:10,fontWeight:700,color:d.inkFaint,letterSpacing:`.1em`,textTransform:`uppercase`},children:`Схема ухода для лица`}),(0,u.jsx)(`div`,{style:{fontSize:9,fontWeight:800,letterSpacing:`.05em`,background:d.accentD,color:`#fff`,padding:`2px 8px`,borderRadius:100},children:`ПОДПИСКА`})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:7},children:[(0,u.jsx)(S,{label:`Утро`,steps:[`Очищение`,`Активы`,`Увлажнение и барьер`,`Защита от солнца`],color:d.accentS}),(0,u.jsx)(S,{label:`Вечер`,steps:[`Демакияж`,`Очищение`,`Активы`,`Увлажнение и барьер`],color:`#9b7db4`})]})]}),(0,u.jsx)(w,{})]})]})]})}function O(){let e=[{n:`01`,title:`Купили средство, результата нет`,desc:(0,u.jsxs)(u.Fragment,{children:[`Баночки выбираются по чужим советам и красивой упаковке. Кожа и волосы остаются прежними. `,(0,u.jsx)(p,{}),` подбирает уход под Ваш тип и Вашу задачу, чтобы каждая покупка приближала к цели.`]})},{n:`02`,title:`Состав читается как шифр`,desc:(0,u.jsx)(u.Fragment,{children:`Aqua, Phenoxyethanol, Niacinamide. Сложно понять, где польза и где лишний раздражитель. Мы переводим каждый ингредиент на простой русский: что он делает, кому подходит, на что обратить внимание.`})},{n:`03`,title:`Советы из интернета Вам не подходят`,desc:(0,u.jsxs)(u.Fragment,{children:[`То, что помогло блогеру, Вам может навредить: другая кожа, другие задачи, несочетаемые активы. `,(0,u.jsx)(p,{}),` опирается на Ваш профиль и Ваши средства и собирает уход лично под Вас.`]})}];return(0,u.jsx)(`section`,{style:{padding:`clamp(52px, 8vw, 80px) clamp(1.5rem, 6vw, 4rem)`,background:`rgba(255,255,255,0.28)`,borderTop:`1px solid ${d.line}`,borderBottom:`1px solid ${d.line}`},children:(0,u.jsxs)(`div`,{style:{maxWidth:1100,margin:`0 auto`},children:[(0,u.jsx)(m,{children:`Знакомо?`}),(0,u.jsx)(`h2`,{style:{fontFamily:d.serif,fontSize:`clamp(1.8rem, 3.5vw, 2.6rem)`,fontWeight:600,color:d.ink,marginBottom:14,letterSpacing:`-0.02em`},children:`Три причины, почему уход не работает`}),(0,u.jsxs)(`p`,{style:{fontSize:16,color:d.inkSoft,lineHeight:1.65,marginBottom:48,maxWidth:640},children:[`Чаще всего выбор косметики идёт вслепую. Вот что обычно мешает увидеть результат и как с этим помогает `,(0,u.jsx)(p,{}),`.`]}),(0,u.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:20},children:e.map(({n:e,title:t,desc:n},r)=>(0,u.jsxs)(i.div,{initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:r*.1},style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:20,padding:`28px`,backdropFilter:`blur(12px)`,WebkitBackdropFilter:`blur(12px)`,boxShadow:d.shadowSm},children:[(0,u.jsx)(`div`,{style:{fontFamily:d.serif,fontSize:52,fontWeight:700,color:d.accent,opacity:.14,lineHeight:1,marginBottom:14,letterSpacing:`-0.02em`},children:e}),(0,u.jsx)(`div`,{style:{fontSize:16,fontWeight:700,color:d.ink,marginBottom:10,letterSpacing:`-0.015em`},children:t}),(0,u.jsx)(`p`,{style:{fontSize:14,color:d.inkSoft,lineHeight:1.68,margin:0},children:n})]},e))})]})})}function k(){return(0,u.jsx)(`section`,{style:{padding:`clamp(56px, 9vw, 96px) clamp(1.5rem, 6vw, 4rem)`},children:(0,u.jsxs)(`div`,{style:{maxWidth:1100,margin:`0 auto`,display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`clamp(40px, 7vw, 88px)`,alignItems:`center`},children:[(0,u.jsxs)(i.div,{initial:{opacity:0,x:-20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.6},children:[(0,u.jsx)(m,{children:`Наше решение`}),(0,u.jsxs)(`h2`,{style:{fontFamily:d.serif,fontSize:`clamp(1.8rem, 3.5vw, 2.8rem)`,fontWeight:600,fontStyle:`italic`,color:d.ink,marginBottom:20,letterSpacing:`-0.022em`,lineHeight:1.14},children:[`Ваш личный`,(0,u.jsx)(`br`,{}),`эксперт по косметике`]}),(0,u.jsx)(`p`,{style:{fontSize:16,color:d.inkSoft,lineHeight:1.72,marginBottom:32},children:`Расшифруйте любой состав, узнайте о совместимости ингредиентов и получите готовую схему ухода лично для Вас.`}),(0,u.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[{label:`20 000+ ингредиентов`,detail:`с расшифровкой на русском`},{label:`Тест на тип кожи и волос`,detail:`персонализированный старт`},{label:`Индивидуальная схема ухода`,detail:`что покупать и в какой последовательности`},{label:`Анализ совместимости`,detail:`ингредиентов в Ваших средствах`}].map(({label:e,detail:t})=>(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:14,padding:`13px 18px`,borderRadius:12,background:d.glass,border:`1px solid ${d.glassBd}`,backdropFilter:`blur(10px)`},children:[(0,u.jsx)(`div`,{style:{width:6,height:6,borderRadius:2,flexShrink:0,background:d.accent}}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{style:{fontSize:14,fontWeight:700,color:d.ink},children:e}),(0,u.jsx)(`span`,{style:{fontSize:13,color:d.inkFaint,marginLeft:8},children:t})]})]},e))})]}),(0,u.jsx)(i.div,{initial:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.6,delay:.12},children:(0,u.jsxs)(`div`,{style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:20,padding:`28px`,backdropFilter:`blur(16px)`,WebkitBackdropFilter:`blur(16px)`,boxShadow:d.shadow},children:[(0,u.jsx)(`div`,{style:{fontSize:10,fontWeight:700,color:d.inkFaint,letterSpacing:`.12em`,textTransform:`uppercase`,marginBottom:22},children:`Ваша схема ухода для волос`}),[{label:`Мытьё и уход`,items:[`Пилинг кожи головы`,`Шампунь под Ваш тип кожи головы`,`Комплексная маска`,`Поверхностный кондиционер`]},{label:`Укладка и защита`,items:[`Термозащита под Вашу рутину укладки`,`Масло как финишный продукт`]}].map(({label:e,items:t},n)=>(0,u.jsxs)(`div`,{style:{marginBottom:n===0?22:0},children:[(0,u.jsx)(`div`,{style:{fontSize:11,fontWeight:700,color:d.accentS,letterSpacing:`.08em`,textTransform:`uppercase`,marginBottom:10},children:e}),t.map((e,n)=>(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,padding:`9px 0`,borderBottom:n<t.length-1?`1px solid ${d.line}`:`none`},children:[(0,u.jsx)(`div`,{style:{width:22,height:22,borderRadius:7,flexShrink:0,background:d.accentBg,border:`1px solid ${d.line}`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:11,fontWeight:800,color:d.accent},children:n+1}),(0,u.jsx)(`span`,{style:{fontSize:13,color:d.inkSoft},children:e})]},n))]},e)),(0,u.jsxs)(`div`,{style:{marginTop:18,padding:`12px 14px`,borderRadius:12,background:`rgba(155,125,180,0.09)`,border:`1px solid rgba(155,125,180,0.24)`},children:[(0,u.jsx)(`div`,{style:{fontSize:11,fontWeight:700,color:`#7b5da0`,letterSpacing:`.06em`,textTransform:`uppercase`,marginBottom:4},children:`+ Рутина для кудряшек`}),(0,u.jsx)(`div`,{style:{fontSize:12.5,color:d.inkSoft,lineHeight:1.55},children:`Отдельная программа, которая раскрывает потенциал натуральной красоты Ваших кудрявых волос.`})]}),(0,u.jsxs)(`div`,{style:{marginTop:16,paddingTop:16,borderTop:`1px solid ${d.line}`,display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,u.jsx)(`span`,{style:{fontSize:12,color:d.inkFaint},children:`Подобрано под Ваш тип волос`}),(0,u.jsx)(`span`,{style:{fontSize:11,fontWeight:700,color:d.accent,background:d.accentBg,padding:`3px 10px`,borderRadius:100,border:`1px solid rgba(15,107,77,0.18)`},children:`Подписка`})]})]})})]})})}function A(){return(0,u.jsx)(`section`,{style:{padding:`clamp(52px, 8vw, 80px) clamp(1.5rem, 6vw, 4rem)`,background:`rgba(255,255,255,0.22)`,borderTop:`1px solid ${d.line}`,borderBottom:`1px solid ${d.line}`},children:(0,u.jsxs)(`div`,{style:{maxWidth:1100,margin:`0 auto`},children:[(0,u.jsx)(m,{children:`Как это работает`}),(0,u.jsx)(`h2`,{style:{fontFamily:d.serif,fontSize:`clamp(1.8rem, 3.5vw, 2.6rem)`,fontWeight:600,color:d.ink,marginBottom:60,letterSpacing:`-0.02em`},children:`Три шага до результата`}),(0,u.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:32,position:`relative`},children:[(0,u.jsx)(`div`,{style:{position:`absolute`,top:44,left:`17%`,right:`17%`,height:1,background:`linear-gradient(90deg, transparent, ${d.line} 15%, ${d.line} 85%, transparent)`,zIndex:0}}),[{n:`1`,title:`Расскажите о себе`,desc:`Полный профессиональный тест: тип кожи и волос, их состояние, привычки, цели и беспокойства. Чем точнее профиль, тем точнее подбор средств под Ваши индивидуальные особенности.`},{n:`2`,title:`Проанализируйте свой арсенал`,desc:`Проверьте всё, что уже стоит на Вашей полке: уход для волос, для лица и даже декоративную косметику. Узнаете, что действительно работает на Вас, а что стоит заменить.`},{n:`3`,title:`Идите к цели по схеме`,desc:`Получите индивидуальную схему ухода, ведите дневник прогресса и двигайтесь к своим бьюти-целям вместе с нами: чувствовать себя счастливой, красивой, здоровой и уверенной.`}].map(({n:e,title:t,desc:n},r)=>(0,u.jsxs)(i.div,{initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:r*.14},style:{position:`relative`,zIndex:1},children:[(0,u.jsx)(`div`,{style:{width:88,height:88,borderRadius:22,marginBottom:24,background:d.glass,border:`1px solid ${d.glassBd}`,backdropFilter:`blur(12px)`,boxShadow:d.shadowSm,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,u.jsx)(`span`,{style:{fontFamily:d.serif,fontSize:34,fontWeight:700,color:d.accent,letterSpacing:`-0.02em`},children:e})}),(0,u.jsx)(`div`,{style:{fontSize:16,fontWeight:700,color:d.ink,marginBottom:10,letterSpacing:`-0.015em`},children:t}),(0,u.jsx)(`p`,{style:{fontSize:14,color:d.inkSoft,lineHeight:1.68,margin:0},children:n})]},e))]})]})})}function j(){return(0,u.jsx)(`section`,{style:{padding:`clamp(56px, 9vw, 96px) clamp(1.5rem, 6vw, 4rem)`},children:(0,u.jsxs)(`div`,{style:{maxWidth:1100,margin:`0 auto`},children:[(0,u.jsx)(m,{children:`Отзывы`}),(0,u.jsx)(`h2`,{style:{fontFamily:d.serif,fontSize:`clamp(1.8rem, 3.5vw, 2.6rem)`,fontWeight:600,color:d.ink,marginBottom:48,letterSpacing:`-0.02em`},children:`Что говорят пользователи`}),(0,u.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:20},children:[{text:`Годами казалось, что уход просто «не работает». Оказалось, средства спорили друг с другом. Со схемой появился результат, который видно в зеркале.`,name:`Полина С.`,detail:`Уход не давал результата`},{text:`После осветления волосы были как солома. Подобрали восстановление по составам, и через два месяца они снова мягкие и блестят.`,name:`Катя В.`,detail:`Окрашенные волосы`},{text:`Перепробовала кучу «аптечных» шампуней от перхоти. Здесь объяснили, какие компоненты мне нужны, и проблема ушла, больше не возвращается.`,name:`Мария Т.`,detail:`Перхоть и чувствительная кожа головы`},{text:`Длина наконец выглядит здоровой: волосы не пушатся и не электризуются. А я всего лишь убрала из рутины то, что мне не подходило.`,name:`Алина Р.`,detail:`Пушистость и электризация`},{text:`Раньше покупала банки хаотично, по рекламе. Теперь у меня ясные этапы ухода и список того, что докупать. Трачу меньше, а эффект лучше.`,name:`Дарья К.`,detail:`Хаотичный уход и лишние траты`},{text:`Тест на тип кожи расставил всё по местам: крем больше не жирнит, активы не конфликтуют. Кожа спокойная впервые за долгое время.`,name:`Софья Л.`,detail:`Комбинированная кожа, 28 лет`}].map(({text:e,name:t,detail:n},r)=>(0,u.jsxs)(i.div,{initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:r*.1},style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:20,padding:`28px`,backdropFilter:`blur(12px)`,WebkitBackdropFilter:`blur(12px)`,boxShadow:d.shadowSm},children:[(0,u.jsx)(`div`,{style:{fontFamily:d.serif,fontSize:72,fontWeight:700,color:d.accent,opacity:.18,lineHeight:.8,marginBottom:18,userSelect:`none`},children:`"`}),(0,u.jsx)(`p`,{style:{fontSize:14,color:d.inkSoft,lineHeight:1.72,marginBottom:24,fontStyle:`italic`},children:e}),(0,u.jsxs)(`div`,{style:{borderTop:`1px solid ${d.line}`,paddingTop:16},children:[(0,u.jsx)(`div`,{style:{fontSize:14,fontWeight:700,color:d.ink},children:t}),(0,u.jsx)(`div`,{style:{fontSize:12,color:d.inkFaint,marginTop:3},children:n})]})]},t))})]})})}function M({onRegister:e,onPurchase:t}){return(0,u.jsx)(`section`,{style:{padding:`clamp(52px, 8vw, 80px) clamp(1.5rem, 6vw, 4rem)`,background:`rgba(255,255,255,0.22)`,borderTop:`1px solid ${d.line}`,borderBottom:`1px solid ${d.line}`},children:(0,u.jsxs)(`div`,{style:{maxWidth:880,margin:`0 auto`},children:[(0,u.jsx)(m,{children:`Тарифы`}),(0,u.jsx)(`h2`,{style:{fontFamily:d.serif,fontSize:`clamp(1.8rem, 3.5vw, 2.6rem)`,fontWeight:600,color:d.ink,marginBottom:10,letterSpacing:`-0.02em`},children:`Начните бесплатно`}),(0,u.jsx)(`p`,{style:{fontSize:16,color:d.inkSoft,marginBottom:44,lineHeight:1.6},children:`Базовые функции бесплатны и доступны навсегда. Подписка добавляет полный тест, индивидуальные схемы ухода, безлимитные анализы и сопровождение к цели.`}),(0,u.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:20},children:[(0,u.jsxs)(`div`,{style:{background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:22,padding:`32px`,backdropFilter:`blur(12px)`,boxShadow:d.shadowSm},children:[(0,u.jsx)(`div`,{style:{fontSize:11,fontWeight:700,color:d.inkFaint,letterSpacing:`.1em`,textTransform:`uppercase`,marginBottom:12},children:`Бесплатно`}),(0,u.jsx)(`div`,{style:{fontFamily:d.serif,fontSize:42,fontWeight:700,color:d.ink,marginBottom:4,letterSpacing:`-0.02em`},children:`0 ₽`}),(0,u.jsx)(`div`,{style:{fontSize:13,color:d.inkFaint,marginBottom:28},children:`навсегда`}),(0,u.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:10,marginBottom:28},children:[`7 поисков по базе средств в неделю`,`3 анализа своих средств в неделю (которых нет в базе)`,`Краткий тест на тип кожи и волос`,`Справочник 20 000+ ингредиентов`,`Сравнение до 2 средств`].map(e=>(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:10,fontSize:14,color:d.inkSoft},children:[(0,u.jsx)(`div`,{style:{width:5,height:5,borderRadius:1.5,background:d.accentS,flexShrink:0}}),e]},e))}),(0,u.jsx)(`button`,{onClick:e,style:{width:`100%`,fontFamily:d.font,fontWeight:700,fontSize:14,padding:`13px`,borderRadius:13,cursor:`pointer`,background:`transparent`,color:d.accent,border:`1.5px solid ${d.accent}`},children:`Начать бесплатно`})]}),(0,u.jsxs)(`div`,{style:{background:`linear-gradient(145deg, rgba(10,74,53,0.92), rgba(15,107,77,0.97))`,borderRadius:22,padding:`32px`,boxShadow:`0 16px 48px rgba(10,74,53,0.3)`,position:`relative`,overflow:`hidden`},children:[(0,u.jsx)(`div`,{style:{position:`absolute`,top:-50,right:-50,width:200,height:200,borderRadius:`50%`,background:`rgba(42,155,115,0.22)`,filter:`blur(44px)`,pointerEvents:`none`}}),(0,u.jsxs)(`div`,{style:{position:`relative`},children:[(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:10,marginBottom:12},children:[(0,u.jsx)(`div`,{style:{fontSize:11,fontWeight:700,color:`rgba(255,255,255,0.55)`,letterSpacing:`.1em`,textTransform:`uppercase`},children:`Подписка`}),(0,u.jsx)(`div`,{style:{fontSize:10,fontWeight:800,letterSpacing:`.06em`,background:`rgba(255,255,255,0.18)`,color:`#fff`,padding:`2px 9px`,borderRadius:100},children:`ПОПУЛЯРНОЕ`})]}),(0,u.jsx)(`div`,{style:{fontFamily:d.serif,fontSize:42,fontWeight:700,color:`#fff`,marginBottom:4,letterSpacing:`-0.02em`},children:`3 490 ₽`}),(0,u.jsx)(`div`,{style:{fontSize:13,color:`rgba(255,255,255,0.5)`,marginBottom:28},children:`в месяц`}),(0,u.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:10,marginBottom:28},children:[`Безлимитные поиски и анализы составов`,`Полный профессиональный тест + подбор средств под Вас`,`Индивидуальные схемы ухода: волосы и лицо`,`Анализ совместимости Ваших средств`,`Дневник прогресса и движение к целям вместе с нами`,`Сравнение до 5 средств и подбор аналогов`,`Отдельная рутина для кудрявых волос`].map(e=>(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:10,fontSize:14,color:`rgba(255,255,255,0.85)`},children:[(0,u.jsx)(`div`,{style:{width:5,height:5,borderRadius:1.5,background:`rgba(255,255,255,0.55)`,flexShrink:0}}),e]},e))}),(0,u.jsx)(`button`,{onClick:t,style:{width:`100%`,fontFamily:d.font,fontWeight:700,fontSize:14,padding:`13px`,borderRadius:13,border:`none`,cursor:`pointer`,background:`#fff`,color:d.accentD,boxShadow:`0 4px 16px rgba(0,0,0,0.12)`},children:`Оформить подписку`})]})]})]})]})})}function N({onRegister:e}){let[t,n]=(0,a.useState)(``);return(0,u.jsx)(`section`,{style:{padding:`clamp(56px, 9vw, 96px) clamp(1.5rem, 6vw, 4rem)`},children:(0,u.jsxs)(`div`,{style:{maxWidth:560,margin:`0 auto`,textAlign:`center`},children:[(0,u.jsx)(m,{children:`Начните сейчас`}),(0,u.jsxs)(`h2`,{style:{fontFamily:d.serif,fontSize:`clamp(1.8rem, 3.5vw, 2.8rem)`,fontWeight:600,fontStyle:`italic`,color:d.ink,marginBottom:16,letterSpacing:`-0.022em`,lineHeight:1.18},children:[`Разберитесь в уходе`,(0,u.jsx)(`br`,{}),`раз и навсегда`]}),(0,u.jsx)(`p`,{style:{fontSize:16,color:d.inkSoft,lineHeight:1.7,marginBottom:36},children:`Создайте аккаунт и получите бесплатный доступ: поиск по базе средств, анализы своих средств и тест на тип кожи и волос.`}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:8,background:d.glass,border:`1px solid ${d.glassBd}`,borderRadius:16,padding:6,backdropFilter:`blur(14px)`,WebkitBackdropFilter:`blur(14px)`,boxShadow:d.shadow},children:[(0,u.jsx)(`input`,{type:`email`,value:t,onChange:e=>n(e.target.value),placeholder:`Ваш email`,style:{flex:1,fontFamily:d.font,fontSize:14,color:d.ink,border:`none`,background:`transparent`,outline:`none`,padding:`10px 14px`}}),(0,u.jsx)(`button`,{onClick:e,style:{fontFamily:d.font,fontWeight:700,fontSize:14,padding:`10px 22px`,borderRadius:11,border:`none`,cursor:`pointer`,background:d.accentD,color:`#fff`,boxShadow:`0 4px 14px rgba(10,74,53,0.28)`,whiteSpace:`nowrap`},children:`Попробовать бесплатно`})]}),(0,u.jsx)(`div`,{style:{fontSize:12,color:d.inkFaint,marginTop:14},children:`Без привязки карты. Отмена в любой момент.`})]})})}function P({onLogin:e,onPricing:t}){let n={fontSize:12,color:d.inkFaint,textDecoration:`underline`,textUnderlineOffset:2},r={fontSize:13,color:d.inkSoft,cursor:`pointer`,background:`none`,border:`none`,padding:0,textAlign:`left`,fontFamily:d.font},i={fontSize:11,fontWeight:800,letterSpacing:`.1em`,textTransform:`uppercase`,color:d.inkFaint,marginBottom:12};return(0,u.jsx)(`footer`,{style:{padding:`44px clamp(1.5rem, 6vw, 4rem) 30px`,borderTop:`1px solid ${d.line}`},children:(0,u.jsxs)(`div`,{style:{maxWidth:1100,margin:`0 auto`,display:`flex`,alignItems:`flex-start`,justifyContent:`space-between`,flexWrap:`wrap`,gap:32},children:[(0,u.jsxs)(`div`,{style:{maxWidth:240},children:[(0,u.jsx)(`div`,{style:{fontFamily:`'Familjen Grotesk', sans-serif`,fontWeight:700,fontSize:17,color:d.ink,letterSpacing:`-0.028em`,marginBottom:6},children:`Beauty Helper`}),(0,u.jsx)(`div`,{style:{fontSize:12.5,color:d.inkFaint,lineHeight:1.6},children:`Помогаем разобраться в составах и собрать уход, который работает.`}),(0,u.jsx)(`div`,{style:{fontSize:12,color:d.inkFaint,marginTop:8},children:`by Simona · 2026`})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:9},children:[(0,u.jsx)(`div`,{style:i,children:`Разделы`}),(0,u.jsx)(`button`,{onClick:t,style:r,children:`Тарифы`}),(0,u.jsx)(`button`,{onClick:e,style:r,children:`Войти`})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,u.jsx)(`div`,{style:i,children:`Документы`}),(0,u.jsx)(`a`,{href:l.offer,target:`_blank`,rel:`noopener noreferrer`,style:n,children:`Оферта`}),(0,u.jsx)(`a`,{href:l.policy,target:`_blank`,rel:`noopener noreferrer`,style:n,children:`Политика обработки ПД`}),(0,u.jsx)(`a`,{href:l.pdConsent,target:`_blank`,rel:`noopener noreferrer`,style:n,children:`Согласие на обработку ПД`}),(0,u.jsx)(`a`,{href:l.adsConsent,target:`_blank`,rel:`noopener noreferrer`,style:n,children:`Согласие на рассылку`})]}),(0,u.jsxs)(`div`,{style:{fontSize:12,color:d.inkFaint,lineHeight:1.8},children:[(0,u.jsx)(`div`,{style:i,children:`Реквизиты`}),(0,u.jsx)(`div`,{children:l.ownerName}),(0,u.jsxs)(`div`,{children:[`ИНН `,l.ownerInn]}),(0,u.jsx)(`a`,{href:`mailto:${l.ownerEmail}`,style:{color:d.inkFaint},children:l.ownerEmail}),(0,u.jsx)(`div`,{style:{marginTop:12},children:(0,u.jsx)(`button`,{onClick:e,style:{fontFamily:d.font,fontWeight:700,fontSize:13,padding:`8px 18px`,borderRadius:9,cursor:`pointer`,background:d.accentBg,color:d.accent,border:`1.5px solid ${d.accent}`},children:`Войти`})})]})]})})}function ee({onLogin:e,onRegister:t,onPurchase:n}){let r=(0,a.useRef)(null),i=()=>r.current?.scrollIntoView({behavior:`smooth`});return(0,u.jsxs)(`div`,{style:{minHeight:`100vh`,fontFamily:d.font,colorScheme:`light`,background:`
        radial-gradient(1100px 560px at 8%   -12%, #e7eee9 0%, transparent 55%),
        radial-gradient(900px  480px at 102%  -4%, #e0e9e3 0%, transparent 52%),
        linear-gradient(165deg, #eef2ef 0%, #dfe8e1 60%, #d6e1da 100%)
      `,backgroundAttachment:`fixed`},children:[(0,u.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Familjen+Grotesk:wght@700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        /* фон-цветы декоративны; гасим горизонтальный скролл на мобайле */
        html, body { overflow-x: hidden; max-width: 100%; }
        button { font-family: 'Manrope', sans-serif; }
        input  { font-family: 'Manrope', sans-serif; }
        ::placeholder { color: #74897f; }
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes cpulse {
          0%, 100% { opacity: 0.45; transform: scale(0.85); }
          50%       { opacity: 1;    transform: scale(1.2);  }
        }
        /* ── Лаконичное стеклянное меню ── */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 60px; display: flex; align-items: center;
          padding: 0 clamp(1rem, 5vw, 4rem);
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(22px) saturate(160%); -webkit-backdrop-filter: blur(22px) saturate(160%);
          border-bottom: 1px solid rgba(255,255,255,0.6);
          box-shadow: 0 4px 24px rgba(15,75,55,0.06);
        }
        .lp-brand {
          font-family: 'Familjen Grotesk', sans-serif; font-weight: 700;
          font-size: clamp(17px, 2.2vw, 20px); color: ${d.ink};
          letter-spacing: -0.028em; cursor: pointer;
        }
        .lp-nav-btn { font-family: ${d.font}; font-weight: 700; font-size: 14px; border-radius: 10px; cursor: pointer; white-space: nowrap; border: none; }
        .lp-pricing-link { padding: 9px 14px; background: transparent; color: ${d.inkSoft}; }
        .lp-pricing-link:hover { color: ${d.accent}; }
        .lp-login { padding: 9px 18px; background: ${d.accentBg}; color: ${d.accent}; border: 1.5px solid ${d.accent}; }
        .lp-try { padding: 9px 18px; background: ${d.accentD}; color: #fff; box-shadow: 0 4px 14px rgba(10,74,53,0.28); }
        @media (max-width: 600px) {
          .lp-nav { height: 56px; }
          .lp-pricing-link { display: none; }
          .lp-nav-btn { font-size: 13px; }
          .lp-login, .lp-try { padding: 8px 14px; }
        }
        @media (max-width: 360px) {
          .lp-login, .lp-try { padding: 7px 11px; font-size: 12.5px; }
        }
        /* Hero: две колонки на десктопе, стопка на мобайле (иначе горизонтальный скролл) */
        @media (max-width: 860px) {
          .lp-hero-grid { grid-template-columns: 1fr !important; }
          .lp-hero-grid > * { min-width: 0; }
        }
        /* Метрики: 4 в ряд на десктопе, 2×2 на мобайле */
        @media (max-width: 520px) {
          .lp-stats { gap: 20px 0 !important; }
          .lp-stat { flex: 0 0 50% !important; padding-right: 0 !important; margin-right: 0 !important; border-right: none !important; }
        }
      `}),(0,u.jsx)(_,{}),(0,u.jsxs)(`div`,{style:{position:`relative`,zIndex:1},children:[(0,u.jsx)(v,{onLogin:e,onRegister:t,onPricing:i}),(0,u.jsx)(D,{onRegister:t,onScrollPricing:i}),(0,u.jsx)(O,{}),(0,u.jsx)(k,{}),(0,u.jsx)(A,{}),(0,u.jsx)(j,{}),(0,u.jsx)(`div`,{ref:r,children:(0,u.jsx)(M,{onRegister:t,onPurchase:n})}),(0,u.jsx)(N,{onRegister:t}),(0,u.jsx)(P,{onLogin:e,onPricing:i})]})]})}var F=`https://lcvszvxbszszqikboxeq.supabase.co`,te=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdnN6dnhic3pzenFpa2JveGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDAyOTEsImV4cCI6MjA5NDY3NjI5MX0.W3yfYh9WWHv_7pBzAh5dTafDr8uOkWTc6LAIZLxCkAE`;async function I({accessToken:e,email:t=``,onError:n}={}){if(!e){n?.(`not_authenticated`);return}try{let r=await fetch(`${F}/functions/v1/robokassa-pay`,{method:`POST`,headers:{"Content-Type":`application/json`,apikey:te,Authorization:`Bearer ${e}`},body:JSON.stringify({email:t})});if(!r.ok){let e=await r.text().catch(()=>``);n?.(r.status===404?`function_not_deployed`:e||`pay_init_failed`);return}let i=await r.json();if(!i?.url){n?.(`no_url`);return}window.location.href=i.url}catch(e){n?.(String(e?.message||e))}}var L=`https://lcvszvxbszszqikboxeq.supabase.co`,R=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdnN6dnhic3pzenFpa2JveGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDAyOTEsImV4cCI6MjA5NDY3NjI5MX0.W3yfYh9WWHv_7pBzAh5dTafDr8uOkWTc6LAIZLxCkAE`,z=null,B=null,V=null,ne=()=>B?.user_metadata?.name||null,re=`simonakhatipova@gmail.com`,ie=()=>B?.email===re,ae={search:7,analysis:3,compare:2},oe={compare:5},H=()=>ie()||V?.tariff===`pro`&&(!V.pro_until||new Date(V.pro_until)>new Date),se=()=>H()?oe.compare:ae.compare,ce=e=>e.replace(/[^a-zA-Z0-9@._%+\-]/g,``),le=e=>{let t=e.trim().startsWith(`+`),n=e.replace(/\D/g,``);return(t?`+`:``)+n};function ue(){return{apikey:R,Authorization:`Bearer ${z||R}`,"Content-Type":`application/json`,Prefer:`return=representation`}}async function U(e,t={}){let n=await fetch(`${L}/rest/v1${e}`,{headers:ue(),...t});if(!n.ok){let e=await n.text();throw Error(e)}let r=await n.text();return r?JSON.parse(r):[]}async function de(e,t,n=1e3){let r=[],i=1/0;for(let a=0;a<1e5;a++){let a=t+n-1,o=await fetch(`${L}/rest/v1${e}`,{headers:{...ue(),"Range-Unit":`items`,Range:`${t}-${a}`,Prefer:`count=exact`}});if(!o.ok)throw Error(await o.text());let s=o.headers.get(`content-range`)||o.headers.get(`Content-Range`);if(s){let e=s.match(/\/(\d+|\*)\s*$/);e&&e[1]!==`*`&&(i=Number(e[1]))}let c=await o.text(),l=c?JSON.parse(c):[];if(r.push(...l),l.length===0||(t+=l.length,t>=i))break}return r}async function fe(e,t=200){let n=await fetch(`${L}/rest/v1${e}`,{headers:{...ue(),"Range-Unit":`items`,Range:`0-${t-1}`,Prefer:`count=exact`}});if(!n.ok)throw Error(await n.text());let r=n.headers.get(`content-range`)||n.headers.get(`Content-Range`),i=1/0;if(r){let e=r.match(/\/(\d+|\*)\s*$/);e&&e[1]!==`*`&&(i=Number(e[1]))}let a=await n.text();return{rows:a?JSON.parse(a):[],total:i}}async function pe(e,t){let n=await fetch(`${L}/auth/v1/token?grant_type=password`,{method:`POST`,headers:{apikey:R,"Content-Type":`application/json`},body:JSON.stringify({email:e,password:t})}),r=await n.json();if(!n.ok)throw Error(r?.error_description||r?.msg||`Ошибка входа`);z=r.access_token,B=r.user||null;try{localStorage.setItem(`sb_token`,r.access_token)}catch{}return r}function me(){z=null,B=null,V=null;try{localStorage.removeItem(`sb_token`)}catch{}}async function he(e){let t=await fetch(`${L}/auth/v1/recover`,{method:`POST`,headers:{apikey:R,"Content-Type":`application/json`},body:JSON.stringify({email:e})});if(!t.ok){let e=await t.json().catch(()=>({}));throw Error(e?.error_description||e?.msg||`Не удалось отправить письмо`)}}async function ge(e){let t=await fetch(`${L}/auth/v1/otp`,{method:`POST`,headers:{apikey:R,"Content-Type":`application/json`},body:JSON.stringify({email:e,create_user:!0})});if(!t.ok){let e=await t.json().catch(()=>({}));throw Error(e?.error_description||e?.msg||`Не удалось отправить код`)}}async function _e(e,t){let n=await fetch(`${L}/auth/v1/verify`,{method:`POST`,headers:{apikey:R,"Content-Type":`application/json`},body:JSON.stringify({type:`email`,email:e,token:t})}),r=await n.json();if(!n.ok)throw Error(r?.error_description||r?.msg||`Неверный код`);z=r.access_token,B=r.user||null;try{localStorage.setItem(`sb_token`,r.access_token)}catch{}return r}async function ve(){let e=null;try{e=localStorage.getItem(`sb_token`)}catch{}if(!e)return!1;let t=await fetch(`${L}/auth/v1/user`,{headers:{apikey:R,Authorization:`Bearer ${e}`}});if(!t.ok)return me(),!1;try{B=await t.json()}catch{B=null}return z=e,!0}async function W(e){await fetch(`${L}/auth/v1/user`,{method:`PUT`,headers:{apikey:R,Authorization:`Bearer ${z}`,"Content-Type":`application/json`},body:JSON.stringify({data:e})}),B=B?{...B,user_metadata:{...B.user_metadata,...e}}:{user_metadata:{...e}}}async function ye(e){let t=await fetch(`${L}/auth/v1/user`,{method:`PUT`,headers:{apikey:R,Authorization:`Bearer ${z}`,"Content-Type":`application/json`},body:JSON.stringify({password:e})}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(n?.error_description||n?.msg||`Не удалось сохранить пароль`);return n}function G(e){let t={len:e.length>=8,case:/[a-zа-яё]/.test(e)&&/[A-ZА-ЯЁ]/.test(e),digit:/\d/.test(e),special:/[^A-Za-zА-Яа-яЁё0-9]/.test(e)},n=+!!t.len+ +!!t.case+ +!!t.digit+ +!!t.special;e.length>=12&&n>=3&&(n=4),n=Math.min(4,n);let r=e.length===0?``:n<=1?`Слабый`:n===2?`Средний`:n===3?`Хороший`:`Надёжный`;return{score:n,label:r,color:n<=1?`#c0584f`:n===2?`#c98a3a`:n===3?`#3f9a63`:`#1f7a5c`,checks:t}}async function be(){if(!B?.id)return V=null,null;try{V=(await U(`/profiles?id=eq.${B.id}&select=tariff,pro_until`))[0]||{tariff:`free`,pro_until:null}}catch{V={tariff:`free`,pro_until:null}}return V}async function xe(){if(!B?.id)return{search:0,analysis:0};let e=new Date(Date.now()-7*864e5).toISOString();try{let t=await U(`/usage_events?user_id=eq.${B.id}&created_at=gte.${e}&select=kind`);return{search:t.filter(e=>e.kind===`search`).length,analysis:t.filter(e=>e.kind===`analysis`).length}}catch{return{search:0,analysis:0}}}async function Se(e){if(!(!B?.id||H()))try{await U(`/usage_events`,{method:`POST`,body:JSON.stringify({user_id:B.id,kind:e})})}catch{}}var Ce={ПАВ:`#3f7fb0`,Масла:`#b07d2e`,Витамины:`#3f8f5a`,Отдушки:`#b04f82`,Кислоты:`#8a63b8`,Структурообразователи:`#6b6e5a`,Растворители:`#4a8a9a`,Технические:`#6b6e5a`,Эмоленты:`#b07d2e`,Кондиционеры:`#3f7fb0`,Протеины:`#3f8f5a`,Увлажнители:`#4a8a9a`,unknown:`#8b8f86`},K=e=>Ce[e]||`#6b6e5a`,we={moisture:{label:`Увлажнение`,some:`Немного увлажняет`,hue:`#2f8fa6`},nutrition:{label:`Питание`,some:`Немного питает`,hue:`#c0892f`},repair:{label:`Восстановление`,some:`Немного восстановит`,hue:`#3f9a63`},protection:{label:`Защита`,some:`Немного защищает`,hue:`#4f78c4`}};function Te(e){let t=(e.product_type||``).toLowerCase(),n=[];return t.includes(`маск`)||t.includes(`кондиционер`)?([`moisture`,`nutrition`,`repair`,`protection`].forEach(t=>{let r=e[`attr_`+t];r===`full`||r===!0?n.push({text:we[t].label,hue:we[t].hue,strong:!0}):r===`some`&&n.push({text:we[t].some,hue:we[t].hue,strong:!1})}),e.attr_curls===!0&&n.push({text:`Подходит кудряшкам`,hue:`#9a5fb0`,strong:!0}),n):t.includes(`шампунь`)?(e.analytical_type&&n.push({text:e.analytical_type,hue:`#2f8fa6`,strong:!0}),e.skin_type&&n.push({text:e.skin_type,hue:`#6b8f5a`,strong:!1}),n):(e.attr_film===!0&&n.push({text:`Плёнкообразователь`,hue:`#7d8a6b`,strong:!1}),e.attr_uva_chem===!0&&n.push({text:`Химический UVA-фильтр`,hue:`#4f78c4`,strong:!0}),n)}var q={ПАВ:`Поверхностно-активные вещества это основа очищения. Связывают жир и грязь, смываются водой. Чем агрессивнее ПАВ, тем сильнее очищение, но выше риск пересушивания.`,"ПАВ::Анионные ПАВ":`Самые высокоочищающие, имеют отрицательный заряд, оказывают самое агрессивное действие, могут раздражать.`,"ПАВ::Анионные ПАВ · Жёсткие":`Лучше всего подходят жирному типу кожи головы. Дают обильную пену и глубокое очищение.`,"ПАВ::Амфотерные ПАВ":`Свойства зависят от pH: при pH от 4 до 6 смягчают другие, более жёсткие ПАВ; при pH выше 7 усиливают их агрессию. Часто идут как со-ПАВ.`,"ПАВ::Неионные ПАВ · Мягкие":`Низкое пенообразование. Снижают агрессию других ПАВ, подходят чувствительной и сухой коже.`,"Окклюзивы::Силиконы":`Химические соединения кислорода и кремния. Дают блеск, гладкость кутикулы и защиту, без лечебного эффекта.`,"Структурообразователи::Силиконы":`Создают плёнку на поверхности волоса: гладкость, блеск, защита от влаги и тепла.`,Увлажнители:`Гумектанты отвечают за непосредственное увлажнение. В хорошем увлажняющем средстве их должно быть несколько в верхней части состава.`,"Увлажнители::Гумектанты":`Притягивают и удерживают влагу в волосе. Глицерин это самый распространённый представитель.`,Протеины:`Гидролизованные белки временно заполняют повреждения кутикулы, возвращают плотность и упругость повреждённым волосам.`,Масла:`Питают, смягчают, придают блеск. Растительные масла различаются по проникновению и жирнокислотному составу.`,Отдушки:`Ароматизаторы. Некоторые компоненты отдушек являются признанными ЕС аллергенами, и маркируются отдельно.`,Растворители:`Основа средства, чаще всего вода. Растворяют остальные компоненты.`,Технические:`Регуляторы вязкости, pH, UV-фильтры и прочие функциональные добавки.`,Кондиционеры:`Катионные компоненты с положительным зарядом, сглаживают кутикулу, снимают статику, облегчают расчёсывание.`,Витамины:`Активные добавки-антиоксиданты. Влияют на состояние волоса при достаточной концентрации.`},J=(e,t,n,r)=>{let i=e||{};return i[`${t}::${n}::${r}`]||i[`${t}::${n}`]||i[t]||q[`${t}::${n}::${r}`]||q[`${t}::${n}`]||q[t]||null};function Ee(e,t,n){if(e===t)return 0;if(Math.abs(e.length-t.length)>n)return n+1;let r=Array.from({length:t.length+1},(e,t)=>t);for(let i=1;i<=e.length;i++){let a=[i],o=i;for(let n=1;n<=t.length;n++)a[n]=Math.min(r[n]+1,a[n-1]+1,r[n-1]+(e[i-1]===t[n-1]?0:1)),a[n]<o&&(o=a[n]);if(o>n)return n+1;r=a}return r[t.length]}function De(e,t){if(!e)return!1;let n=t.length<=5?1:t.length<=8?2:3;for(let r of String(e).toLowerCase().split(/[^a-zа-яё0-9]+/))if(!(!r||r.length+n<t.length)&&Ee(r.slice(0,t.length+n),t,n)<=n)return!0;return!1}var Y=e=>(e||``).toLowerCase().replace(/[^a-zа-я0-9 ]/gi,``).trim();function X(e){let t=e.findIndex(e=>(e.group||``).toLowerCase().includes(`отдушк`));return t>0?e.slice(0,t):e}var Oe=e=>e?e<=3?1:e<=6?.75:e<=10?.5:.3:.4;function Z(e,t){let n=X(e),r=X(t);if(!n.length||!r.length)return{score:0,sharedNames:[]};let i=new Map(r.map(e=>[Y(e.inci),e])),a=0,o=0,s=[];for(let e of n){let t=Oe(e.position);o+=t,i.has(Y(e.inci))&&(a+=t,s.push(e.inci))}let c=new Map(n.map(e=>[Y(e.inci),e])),l=0,u=0;for(let e of r){let t=Oe(e.position);u+=t,c.has(Y(e.inci))&&(l+=t)}let d=((o?a/o:0)+(u?l/u:0))/2,f=new Set(n.map(e=>e.group).filter(Boolean)),p=new Set(r.map(e=>e.group).filter(Boolean)),m=[...f].filter(e=>p.has(e)).length,h=new Set([...f,...p]).size,g=h?m/h:0;return{score:Math.round((d*.7+g*.3)*100),sharedNames:s}}var ke=e=>e.ingredients.map(e=>({inci:e.ing.inci_name,group:e.ing.group,position:e.position})),Ae=[{type:`Шампунь`,test:(e,t)=>e.has(`ПАВ`)&&t.some(e=>/sulfate|sulfo|glucoside|betaine|sarcosinate/i.test(e))},{type:`Кондиционер`,test:(e,t)=>t.some(e=>/behentrimonium|cetrimonium|distearoylethyl|quaternium/i.test(e))||e.has(`Эмоленты`)&&t.some(e=>/cetearyl alcohol/i.test(e))},{type:`Маска`,test:e=>e.has(`Протеины`)&&(e.has(`Масла`)||e.has(`Эмоленты`))},{type:`SPF`,test:(e,t)=>t.some(e=>/titanium dioxide|zinc oxide|octocrylene|avobenzone|homosalate|ethylhexyl methoxycinnamate|tinosorb|uvinul/i.test(e))},{type:`Крем`,test:(e,t)=>t.some(e=>/dimethicone|ceramide|petrolatum/i.test(e))&&e.has(`Увлажнители`)},{type:`Масло`,test:(e,t)=>t.length<=6&&e.has(`Масла`)&&!e.has(`ПАВ`)&&!t.some(e=>/aqua|water/i.test(e))},{type:`Сыворотка`,test:e=>(e.has(`Витамины`)||e.has(`Кислоты`))&&!e.has(`ПАВ`)}];function je(e){let t=new Set(e.map(e=>e.group).filter(Boolean)),n=e.map(e=>e.inci);for(let e of Ae)if(e.test(t,n))return e.type;return null}function Me(e,t,n,{sameType:r=!0,order:i=`match`}={}){let a=t?.id,o=n.filter(e=>e.id!==a).filter(e=>!r||!t||e.product_type===t.product_type).map(t=>({product:t,...Z(e,ke(t))})).filter(e=>e.score>=20);return i===`price`?o.sort((e,t)=>(e.product.price_rub||0)-(t.product.price_rub||0)||t.score-e.score):o.sort((e,t)=>t.score-e.score||(e.product.price_rub||0)-(t.product.price_rub||0)),o}var Ne=`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Familjen+Grotesk:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* ФОН СТРАНИЦЫ — спокойный прохладный шалфейно-нефритовый, менее насыщенный,
       чтобы не спорить с тёплым стеклом карточек */
    --bg-1: #eef2ef;
    --bg-2: #e6ede8;
    --bg-3: #dbe6df;

    /* СТЕКЛО — едва тёплое, кремово-нефритовое: убирает диссонанс при открытии карточки */
    --glass: rgba(255,253,250,0.62);
    --glass-strong: rgba(255,253,249,0.82);
    --glass-warm: rgba(240,247,250,0.8);    /* прохладная подложка модалки/панелей */
    --glass-border: rgba(255,255,255,0.72);
    --glass-hairline: rgba(120,140,128,0.18);

    --ink: #16241d;
    --ink-soft: #3f534a;
    --ink-faint: #74897f;
    --accent: #0f6b4d;
    --accent-deep: #0a4a35;
    --accent-soft: #2a9b73;
    --line: rgba(60,110,88,0.15);
    --shadow: 0 8px 32px rgba(15,75,55,0.14);
    --shadow-sm: 0 2px 14px rgba(15,75,55,0.09);
    --shadow-warm: 0 18px 50px rgba(30,70,90,0.13);
    --warm: rgba(236,244,248,0.7);   /* прохладная мягкая заливка (бывш. бежевая) */
    --rose: #c17b8a;
    --warn: #c98a3a;
    --danger: #c0584f;

    /* алиасы старой палитры: инлайн-стили admin-модалок ссылаются на них,
       при переходе на v6 переменные пропали — маппим на новые токены */
    --sage: var(--accent);
    --dust: var(--ink-faint);
    --sand: rgba(60,110,88,0.25);
    --gold: var(--accent);
    --brown: var(--ink-soft);
    --deep: var(--ink);
    --cream: #f6f9f7;
  }

  body { font-family: 'Manrope', sans-serif; color: var(--ink); }

  .app {
    min-height: 100vh; position: relative; overflow-x: hidden;
    background:
      radial-gradient(1100px 560px at 8% -12%, #e7eee9 0%, transparent 55%),
      radial-gradient(900px 480px at 102% -4%, #e0e9e3 0%, transparent 52%),
      linear-gradient(165deg, #eef2ef 0%, #dfe8e1 60%, #d6e1da 100%);
    background-attachment: fixed;
  }

  /* ── Фон: крупные цветы + размытые фиолетовые пятна ── */
  .flowers-backdrop {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }
  .bg-blob { position: absolute; border-radius: 50%; filter: blur(90px); }
  .bg-blob-1 { width: 540px; height: 540px; left: -10%; top: 32%; background: rgba(155,125,180,0.16); }
  .bg-blob-2 { width: 460px; height: 460px; left: 72%; top: -12%; background: rgba(155,125,180,0.12); }
  /* чтобы контент был поверх фона */
  .topbar, .tabs-bar, .main { position: relative; z-index: 2; }

  /* ── ШАПКА: движущийся градиент-«шёлк», поверх светлая стеклянная вуаль для читаемости ── */
  .topbar {
    position: sticky; top: 0; z-index: 100;
    padding: 0 clamp(1rem, 4vw, 2.4rem);
    height: 56px; display: flex; align-items: center; gap: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.4);
    box-shadow: 0 4px 20px rgba(80,60,110,0.10);
    overflow: hidden;
    isolation: isolate;
  }
  /* слой 1 — переливающийся градиент (сирень/голубой/розовый + наш глубокий изумруд, усилен) */
  .topbar-aurora {
    position: absolute; inset: -40% -10%; z-index: -2;
    background:
      radial-gradient(46% 120% at 16% 32%, #b98fd6 0%, transparent 56%),
      radial-gradient(42% 130% at 42% 70%, #6fa8d8 0%, transparent 52%),
      radial-gradient(48% 120% at 60% 35%, #0f6b4d 0%, transparent 56%),
      radial-gradient(44% 120% at 80% 68%, #2ea579 0%, transparent 54%),
      radial-gradient(40% 120% at 95% 40%, #0a4a35 0%, transparent 50%),
      radial-gradient(38% 110% at 30% 92%, #1d8f66 0%, transparent 50%),
      linear-gradient(110deg, #a78fd6, #2ea579 45%, #0f6b4d 65%, #7fb0d8 85%, #d68fbf);
    background-size: 230% 230%;
    filter: saturate(128%);
    animation: aurora 18s ease-in-out infinite;
  }
  @keyframes aurora {
    0%   { background-position: 0% 50%, 100% 0%, 50% 100%, 0% 0%, 0% 50%; }
    50%  { background-position: 100% 50%, 0% 100%, 80% 0%, 100% 100%, 100% 50%; }
    100% { background-position: 0% 50%, 100% 0%, 50% 100%, 0% 0%, 0% 50%; }
  }
  /* слой 2 — светлая стеклянная вуаль: гасит яркость, заголовки остаются читаемы */
  .topbar-veil {
    position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.5));
    backdrop-filter: blur(14px) saturate(115%); -webkit-backdrop-filter: blur(14px) saturate(115%);
  }
  @media (prefers-reduced-motion: reduce) { .topbar-aurora { animation: none; } }
  .brand, .topbar-actions { position: relative; z-index: 1; }
  .topbar-actions { margin-left: auto; }
  .topbar-user {
    font-size: 13px; font-weight: 600; color: var(--ink-soft);
    margin-right: 4px; white-space: nowrap;
  }

  .brand { display: flex; align-items: center; gap: 11px; }
  .brand-mark {
    width: 38px; height: 42px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;
    filter: drop-shadow(0 4px 9px rgba(10,74,53,0.28));
    perspective: 220px;
  }
  /* колба вращается влево в 3D (по оси Y) */
  .flask-body { transform-box: fill-box; transform-origin: 50% 50%; transform-style: preserve-3d; animation: flask3d 8s linear infinite; }
  @keyframes flask3d {
    0%   { transform: rotateY(0deg); }
    100% { transform: rotateY(-360deg); }
  }
  /* объёмная боковая тень: пульсирует в такт повороту, создаёт ощущение цилиндра */
  .flask-shade { mix-blend-mode: multiply; animation: shade 9s linear infinite; transform-box: fill-box; }
  @keyframes shade {
    0%   { opacity: .15; transform: translateX(2px); }
    25%  { opacity: .42; transform: translateX(4px); }
    50%  { opacity: .15; transform: translateX(-2px); }
    75%  { opacity: .42; transform: translateX(-4px); }
    100% { opacity: .15; transform: translateX(2px); }
  }
  /* падающие в колбу ингредиенты — постоянно */
  .flask-drop { opacity: 0; animation: drop 1.8s ease-in infinite; }
  .flask-drop.d2 { animation-delay: .6s; }
  .flask-drop.d3 { animation-delay: 1.2s; }
  @keyframes drop {
    0% { opacity: 0; transform: translateY(-16px) scale(.8); }
    22% { opacity: 1; }
    52% { opacity: 1; transform: translateY(8px) scale(1); }
    66%, 100% { opacity: 0; transform: translateY(12px) scale(.4); }
  }
  /* пузырьки кипения — постоянно */
  .flask-bub { opacity: 0; transform-box: fill-box; animation: fizz 1.4s ease-out infinite; }
  .flask-bub.b2 { animation-delay: .35s; }
  .flask-bub.b3 { animation-delay: .7s; }
  .flask-bub.b4 { animation-delay: 1.05s; }
  @keyframes fizz {
    0% { opacity: 0; transform: translateY(2px) scale(.5); }
    30% { opacity: .9; }
    100% { opacity: 0; transform: translateY(-13px) scale(1.1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .flask-body, .flask-shade, .flask-drop, .flask-bub { animation: none; }
    .flask-drop { opacity: 0; }
  }
  .brand-text { display: flex; flex-direction: column; line-height: 1.2; align-items: flex-start; }
  .brand-text b { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 20px; color: #1a1530; letter-spacing: -0.025em; }
  .brand-text span { font-size: 9.5px; color: #5a4d72; text-transform: uppercase; letter-spacing: .13em; font-weight: 700; }
  .topbar-actions { display: flex; gap: 8px; align-items: center; }
  .topbar .btn-glass { background: rgba(255,255,255,0.55); color: #3a3252; border: 1px solid rgba(255,255,255,0.6); }
  .topbar .btn-glass:hover { background: rgba(255,255,255,0.8); color: #1a1530; }
  .topbar .btn-primary { background: var(--accent-deep); color: #fff; }

  .btn {
    font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 13px;
    border: none; cursor: pointer; border-radius: 12px; padding: 10px 18px;
    transition: transform .12s, box-shadow .2s, background .2s;
  }
  .btn:active { transform: scale(.97); }
  .btn-primary { background: var(--accent-deep); color: white; box-shadow: 0 4px 14px rgba(10,74,53,0.3); }
  .btn-primary:hover { background: #073828; }
  .btn-glass {
    background: var(--glass); color: var(--ink-soft);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  }
  .btn-glass:hover { background: var(--glass-strong); color: var(--ink); }
  .btn-sm { padding: 7px 14px; font-size: 12px; border-radius: 10px; }
  .btn-danger { background: rgba(193,123,138,0.12); color: var(--rose); }
  .btn-danger:hover { background: rgba(193,123,138,0.2); }

  .tabs-bar { background: rgba(255,255,255,0.4); border-bottom: 1px solid var(--glass-border); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .tabs { display: flex; gap: 4px; padding: 0 clamp(1rem,4vw,2.5rem); max-width: 1180px; margin: 0 auto; }
  .tab {
    font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 14px;
    padding: 16px 20px; border: none; cursor: pointer;
    background: transparent; color: var(--ink-faint); transition: all .2s;
    border-bottom: 2.5px solid transparent; margin-bottom: -1px;
  }
  .tab:hover { color: var(--ink-soft); }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .tab:focus { outline: none; }
  .tab:focus-visible { outline: 2px solid color-mix(in srgb, var(--accent) 55%, transparent); outline-offset: 2px; border-radius: 6px; }

  .main { max-width: 1180px; margin: 0 auto; padding: clamp(1rem,3vw,2rem) clamp(1rem,4vw,2.5rem) 4rem; }

  .toolbar { display: flex; gap: 12px; align-items: center; margin-bottom: 22px; flex-wrap: wrap; }
  .search {
    flex: 1; min-width: 220px;
    background: var(--glass); border: 1px solid var(--glass-border);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border-radius: 14px; padding: 12px 18px; font-size: 14px; font-family: inherit; color: var(--ink);
    outline: none; transition: border-color .2s, background .2s;
  }
  .search:focus { border-color: var(--accent); background: var(--glass-strong); }
  .search::placeholder { color: var(--ink-faint); }
  .filter-toggle { display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; padding: 12px 18px; font-size: 14px; border-radius: 14px; }

  .filter-panel {
    display: flex; flex-wrap: wrap; gap: 14px 18px; align-items: flex-end;
    background: var(--glass-warm); border: 1px solid var(--glass-border);
    backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-radius: 16px; padding: 16px 18px; margin-bottom: 16px;
    box-shadow: var(--shadow-sm);
    animation: filterIn .22s ease;
    position: relative; z-index: 60;
  }
  @keyframes filterIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
  .filter-field { display: flex; flex-direction: column; gap: 6px; min-width: 168px; flex: 1; }
  .filter-field label { font-size: 10.5px; text-transform: uppercase; letter-spacing: .07em; color: var(--ink-faint); font-weight: 700; }
  .filter-field select {
    appearance: none; -webkit-appearance: none;
    background: rgba(255,255,255,0.62) url("data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%230a4a35' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 14px center;
    border: 1px solid var(--glass-border); border-radius: 11px;
    padding: 10px 32px 10px 13px; font-size: 13.5px; font-family: inherit; color: var(--ink);
    cursor: pointer; outline: none; transition: border-color .2s, background-color .2s;
  }
  .filter-field select:focus { border-color: var(--accent); }

  /* Иерархический фильтр вида средства */
  .hier-type { position: relative; z-index: 70; }
  .hier-trigger {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.62); border: 1px solid var(--glass-border); border-radius: 11px;
    padding: 10px 13px; font-size: 13.5px; font-family: inherit; color: var(--ink);
    cursor: pointer; outline: none; transition: border-color .2s;
  }
  .hier-trigger:hover, .hier-trigger:focus { border-color: var(--accent); }
  .hier-caret { color: var(--accent-deep); font-size: 11px; }
  .hier-menu {
    position: absolute; top: calc(100% + 5px); left: 0; right: 0; z-index: 999;
    background: rgba(255,255,255,0.98); border: 1px solid var(--glass-border); border-radius: 13px;
    box-shadow: 0 18px 48px rgba(20,50,40,0.22); padding: 6px; min-width: 240px;
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  }
  .hier-root, .hier-group-head, .hier-item {
    padding: 9px 12px; border-radius: 9px; font-size: 13.5px; color: var(--ink); cursor: pointer;
    display: flex; align-items: center; justify-content: space-between; transition: background .12s;
  }
  .hier-root:hover, .hier-group:hover > .hier-group-head, .hier-item:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); }
  .hier-root.active, .hier-item.active { background: color-mix(in srgb, var(--accent) 22%, transparent); font-weight: 600; }
  .hier-group { position: relative; }
  .hier-group-head { font-weight: 600; color: var(--ink-soft); }
  .hier-group-name { display: inline-flex; align-items: center; gap: 9px; }
  .hier-ic { display: inline-flex; color: var(--accent-deep); opacity: 0.85; }
  .hier-arrow { color: var(--accent-deep); font-size: 15px; line-height: 1; }
  .hier-sub {
    margin: 2px 0 4px 8px; padding-left: 6px;
    border-left: 2px solid color-mix(in srgb, var(--accent) 30%, transparent);
    max-height: 340px; overflow-y: auto;
  }
  .hier-sub .hier-item { font-size: 13px; padding: 7px 10px; }
  .hier-sub-head {
    padding: 8px 10px 4px; margin-top: 2px; border-radius: 8px; cursor: pointer;
    font-size: 10.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
    color: var(--ink-faint); transition: background .12s, color .12s;
  }
  .hier-sub-head:hover { background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent-deep); }
  .hier-sub-head.active { color: var(--accent); background: color-mix(in srgb, var(--accent) 18%, transparent); }
  .filter-reset {
    background: none; border: none; cursor: pointer; color: var(--rose);
    font-family: inherit; font-size: 13px; font-weight: 600; padding: 10px 4px; white-space: nowrap;
  }
  .filter-reset:hover { text-decoration: underline; }
  .filter-checks { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; padding-bottom: 2px; }
  .filter-check { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13.5px; font-weight: 600; color: var(--ink-soft); user-select: none; }
  .filter-check input { appearance: none; -webkit-appearance: none; width: 18px; height: 18px; border-radius: 6px; border: 1.5px solid color-mix(in srgb, var(--accent) 40%, transparent); background: rgba(255,255,255,0.6); cursor: pointer; position: relative; transition: background .15s, border-color .15s; flex-shrink: 0; }
  .filter-check input:checked { background: var(--accent); border-color: var(--accent); }
  .filter-check input:checked::after { content: ""; position: absolute; left: 5px; top: 1.5px; width: 5px; height: 9px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
  .filter-check:hover { color: var(--ink); }
  .field-hint { font-size: 9px; font-weight: 600; color: var(--accent-soft); text-transform: none; letter-spacing: 0; opacity: 0.8; }
  .filter-check.soon { opacity: 0.6; }
  .soon-tag { font-style: normal; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--warn); background: rgba(201,138,58,0.14); border-radius: 5px; padding: 1px 5px; margin-left: 6px; vertical-align: 1px; }

  /* ── Раскладка страницы средств: на десктопе фильтры слева ── */
  .products-layout { display: grid; grid-template-columns: 248px minmax(0, 1fr); gap: 28px; align-items: start; }
  .products-main { min-width: 0; }
  .filter-sidebar {
    position: sticky; top: 16px;
    background: var(--glass-warm); border: 1px solid var(--glass-border);
    backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-radius: 18px; padding: 14px 14px 18px; box-shadow: var(--shadow-sm);
    max-height: calc(100vh - 32px); overflow-y: auto;
  }
  .filter-sidebar-head {
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    font-size: 11px; text-transform: uppercase; letter-spacing: .08em; font-weight: 800;
    color: var(--ink-soft); padding: 2px 4px 11px; margin-bottom: 6px;
    border-bottom: 1px solid var(--glass-border);
  }
  .filter-sidebar-head .filter-reset { padding: 0; font-size: 11px; }
  .filter-sidebar-body { display: flex; flex-direction: column; gap: 16px; }
  .filter-sidebar-body .filter-field { min-width: 0; }
  .filter-sidebar-body .filter-checks { flex-direction: column; align-items: flex-start; gap: 11px; }

  /* Развёрнутое дерево вида средства (сайдбар) — три чётких уровня: группа › подгруппа › тип */
  .hier-tree { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; }
  .hier-tree-root, .hier-tree-item, .hier-tree-sub-head { cursor: pointer; border-radius: 8px; transition: background .12s, color .12s; }
  .hier-tree-root { padding: 8px 10px; font-size: 13px; font-weight: 700; color: var(--ink); }
  .hier-tree-root:hover, .hier-tree-item:hover, .hier-tree-sub-head:hover { background: color-mix(in srgb, var(--accent) 11%, transparent); }
  .hier-tree-root.active, .hier-tree-item.active { background: color-mix(in srgb, var(--accent) 20%, transparent); color: var(--accent-deep); font-weight: 600; }
  /* Группа — заметный заголовок-секция с разделителем сверху */
  .hier-tree-group { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--glass-border); }
  .hier-tree-group:first-of-type { margin-top: 4px; padding-top: 0; border-top: none; }
  .hier-tree-group-head { display: flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 800; color: var(--ink); padding: 4px 6px 8px; letter-spacing: -0.01em; }
  .hier-tree-group-head .hier-ic { font-size: 14px; opacity: .9; }
  /* Подгруппа — вторичный уровень с акцентной линией слева */
  .hier-tree-sub { margin: 2px 0 5px 4px; padding-left: 10px; border-left: 2px solid color-mix(in srgb, var(--accent) 30%, transparent); }
  .hier-tree-sub-head { padding: 6px 9px; font-size: 12px; font-weight: 700; color: var(--ink-soft); }
  .hier-tree-sub-head.active { color: var(--accent-deep); background: color-mix(in srgb, var(--accent) 16%, transparent); }
  /* Тип — третий уровень: мельче, с отступом, легче по весу */
  .hier-tree-item { padding: 5px 9px 5px 14px; font-size: 12.5px; font-weight: 500; color: var(--ink-soft); }
  .hier-tree-item.active { color: var(--accent-deep); font-weight: 600; }

  /* Десктоп: кнопка «Фильтры» и мобильная панель скрыты — фильтры в сайдбаре */
  @media (min-width: 861px) {
    .filter-toggle { display: none; }
    .products-main .filter-panel { display: none; }
  }
  /* Мобайл/планшет: сайдбар скрыт, фильтры — дропдауном по кнопке */
  @media (max-width: 860px) {
    .products-layout { display: block; }
    .filter-sidebar { display: none; }
  }

  /* ── Freemium: кнопка профиля в шапке, личный кабинет, paywall ── */
  .profile-btn { display: inline-flex; align-items: center; gap: 7px; padding-left: 7px; }
  .profile-ava {
    width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
    background: var(--accent); color: #fff; font-size: 11px; font-weight: 800;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .tariff-pill {
    font-size: 9px; font-weight: 800; letter-spacing: .06em; padding: 2px 6px; border-radius: 100px;
    background: rgba(255,255,255,0.16); color: #eef4f1; border: 1px solid rgba(255,255,255,0.28);
  }
  .tariff-pill.pro { background: linear-gradient(120deg,#caa24a,#e7c878); color: #3a2c08; border: none; }

  .lk-overlay { display: flex; align-items: flex-start; justify-content: center; padding: clamp(1rem, 5vh, 3.5rem) 16px 40px; }
  .lk-card {
    position: relative; width: min(440px, 92vw); max-height: 90vh; overflow-y: auto;
    background: var(--glass-strong); border: 1px solid var(--glass-border);
    backdrop-filter: blur(26px) saturate(150%); -webkit-backdrop-filter: blur(26px) saturate(150%);
    border-radius: 24px; padding: 26px 24px; box-shadow: 0 30px 80px rgba(15,50,40,0.28);
  }
  .lk-close {
    position: absolute; top: 14px; right: 14px; width: 30px; height: 30px; border-radius: 50%;
    border: none; background: rgba(0,0,0,0.05); color: var(--ink-soft); font-size: 14px; cursor: pointer;
  }
  .lk-close:hover { background: rgba(0,0,0,0.1); }
  .lk-head { display: flex; align-items: center; gap: 13px; margin-bottom: 20px; }
  .lk-ava {
    width: 50px; height: 50px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent-deep)); color: #fff;
    font-size: 21px; font-weight: 800; display: flex; align-items: center; justify-content: center;
  }
  .lk-name { font-family: 'Familjen Grotesk', sans-serif; font-size: 19px; font-weight: 700; color: var(--ink); letter-spacing: -0.02em; }
  .lk-email { font-size: 12.5px; color: var(--ink-faint); }
  .lk-tariff {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    background: color-mix(in srgb, var(--accent) 8%, transparent);
    border: 1px solid var(--glass-border); border-radius: 16px; padding: 14px 16px; margin-bottom: 18px;
  }
  .lk-tariff.pro { background: linear-gradient(120deg, rgba(202,162,74,0.14), rgba(231,200,120,0.1)); border-color: rgba(202,162,74,0.4); }
  .lk-tariff-label { font-size: 10px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--ink-faint); }
  .lk-tariff-val { font-size: 16px; font-weight: 700; color: var(--ink); }
  .lk-tariff-until { font-size: 11.5px; color: var(--accent-deep); margin-top: 2px; }
  .lk-section-label { font-size: 10px; text-transform: uppercase; letter-spacing: .08em; font-weight: 800; color: var(--ink-faint); margin-bottom: 10px; }
  .lk-meters { margin-bottom: 18px; }
  .lk-meter { margin-bottom: 12px; }
  .lk-meter-top { display: flex; justify-content: space-between; font-size: 13px; color: var(--ink-soft); margin-bottom: 5px; }
  .lk-meter-top .over { color: var(--rose); font-weight: 700; }
  .lk-meter-bar { height: 7px; border-radius: 100px; background: rgba(0,0,0,0.07); overflow: hidden; }
  .lk-meter-fill { height: 100%; border-radius: 100px; transition: width .3s ease; }
  .lk-hint { font-size: 11.5px; color: var(--ink-faint); margin-top: 4px; line-height: 1.5; }
  .lk-info { border-top: 1px solid var(--glass-border); padding-top: 16px; margin-bottom: 16px; }
  .lk-row { display: flex; justify-content: space-between; font-size: 13.5px; padding: 5px 0; color: var(--ink-soft); }
  .lk-row b { color: var(--ink); font-weight: 600; }
  .lk-docs { display: flex; gap: 16px; margin-bottom: 14px; }
  .lk-docs a { font-size: 12.5px; color: var(--ink-faint); text-decoration: none; }
  .lk-docs a:hover { color: var(--accent); text-decoration: underline; }
  .lk-logout {
    width: 100%; padding: 11px; border-radius: 12px; cursor: pointer;
    background: none; border: 1px solid var(--glass-border); color: var(--rose);
    font-family: inherit; font-size: 13.5px; font-weight: 600;
  }
  .lk-logout:hover { background: rgba(192,82,74,0.08); }

  /* ── Личный кабинет: отдельная страница ── */
  .lk-page { position: fixed; inset: 0; z-index: 500; overflow-y: auto;
    background:
      radial-gradient(120% 70% at 50% -8%, #e7f1ec 0%, rgba(231,241,236,0) 55%),
      linear-gradient(168deg, #eef5f3, #e6f1ee 55%, #e1efeb); }
  .lk-topbar { position: sticky; top: 0; z-index: 6; display: flex; align-items: center; gap: 12px;
    padding: 13px clamp(16px, 5vw, 40px); background: rgba(238,242,239,0.86);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.5); }
  .lk-topbar-title { font-weight: 700; font-size: 16px; color: var(--ink); letter-spacing: -0.02em; }
  .lk-back { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 14px;
    color: var(--accent); background: rgba(15,107,77,0.07); border: 1.5px solid var(--accent);
    border-radius: 10px; padding: 7px 15px; cursor: pointer; font-family: inherit; }
  .lk-back:hover { background: rgba(15,107,77,0.13); }
  .lk-top-logout { margin-left: auto; font-weight: 600; font-size: 13.5px; color: var(--rose);
    background: none; border: 1px solid var(--glass-border); border-radius: 10px; padding: 7px 15px; cursor: pointer; font-family: inherit; }
  .lk-top-logout:hover { background: rgba(192,82,74,0.08); }
  .lk-wrap { max-width: 960px; margin: 0 auto; padding: clamp(20px, 4vw, 36px) clamp(16px, 5vw, 40px) 80px; }

  .lk-hero { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
  .lk-hero-ava { width: 64px; height: 64px; border-radius: 20px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 26px;
    background: linear-gradient(135deg, var(--accent), var(--accent-deep)); box-shadow: 0 6px 18px rgba(15,107,77,0.28); }
  .lk-hero-name { font-family: 'Familjen Grotesk', sans-serif; font-size: 23px; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; line-height: 1.15; }
  .lk-hero-email { font-size: 13px; color: var(--ink-faint); margin-top: 2px; }
  .lk-pill { margin-left: auto; align-self: center; font-size: 12px; font-weight: 800; letter-spacing: .04em;
    padding: 7px 15px; border-radius: 100px; white-space: nowrap;
    background: rgba(60,110,88,0.12); color: var(--accent-deep); }
  .lk-pill.pro { background: linear-gradient(120deg, rgba(202,162,74,0.22), rgba(231,200,120,0.16)); color: #8a6a1f; border: 1px solid rgba(202,162,74,0.4); }

  .lk-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .lk-block { background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border);
    border-radius: 18px; padding: 20px 20px; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .lk-block-wide { grid-column: 1 / -1; }
  .lk-block-title { font-family: 'Familjen Grotesk', sans-serif; font-size: 15px; font-weight: 700; color: var(--ink);
    letter-spacing: -0.01em; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  @media (max-width: 680px) { .lk-grid { grid-template-columns: 1fr; } }

  .lk-field { margin-bottom: 12px; }
  .lk-field label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: .07em;
    font-weight: 700; color: var(--ink-faint); margin-bottom: 5px; }
  .lk-input { width: 100%; padding: 10px 13px; border-radius: 11px; border: 1px solid var(--glass-border);
    background: rgba(255,255,255,0.7); font-family: inherit; font-size: 14px; color: var(--ink); }
  .lk-input:focus { outline: none; border-color: var(--accent); }
  .lk-input[disabled] { color: var(--ink-faint); background: rgba(0,0,0,0.03); }
  .lk-save { margin-top: 4px; padding: 10px 20px; border-radius: 11px; border: none; cursor: pointer;
    background: var(--accent); color: #fff; font-family: inherit; font-weight: 700; font-size: 14px; }
  .lk-save:disabled { opacity: .5; cursor: default; }
  .lk-saved { font-size: 12.5px; color: var(--accent); font-weight: 700; margin-left: 10px; }

  .lk-viewed { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 10px; }
  .lk-viewed-item { display: flex; align-items: center; gap: 9px; padding: 8px; border-radius: 12px; cursor: pointer;
    background: rgba(255,255,255,0.55); border: 1px solid var(--glass-border); transition: transform .12s; }
  .lk-viewed-item:hover { transform: translateY(-2px); }
  .lk-viewed-thumb { width: 38px; height: 46px; border-radius: 8px; flex-shrink: 0; object-fit: contain;
    background: linear-gradient(150deg, rgba(246,251,255,0.7), rgba(232,243,253,0.5)); }
  .lk-viewed-name { font-size: 12px; font-weight: 600; color: var(--ink); line-height: 1.25;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .lk-viewed-brand { font-size: 10px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .04em; margin-top: 1px; }
  .lk-empty { font-size: 13px; color: var(--ink-faint); line-height: 1.6; }

  .lk-soon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 12px; }
  .lk-soon-card { position: relative; padding: 15px 15px 14px; border-radius: 14px;
    background: rgba(255,255,255,0.45); border: 1px solid var(--glass-border); }
  .lk-soon-ic { font-size: 22px; line-height: 1; margin-bottom: 9px; }
  .lk-soon-name { font-size: 13.5px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .lk-soon-desc { font-size: 12px; color: var(--ink-soft); line-height: 1.5; }
  .lk-badge { position: absolute; top: 11px; right: 11px; font-size: 9px; font-weight: 800; letter-spacing: .05em;
    padding: 3px 8px; border-radius: 100px; background: rgba(60,110,88,0.13); color: var(--accent-deep); }
  .lk-badge.pro { background: var(--accent-deep); color: #fff; }
  .lk-docs-page { display: flex; flex-wrap: wrap; gap: 10px; }
  .lk-docs-page a { font-size: 13px; color: var(--accent); text-decoration: none; font-weight: 600;
    padding: 7px 13px; border-radius: 10px; background: rgba(15,107,77,0.06); border: 1px solid var(--glass-border); }
  .lk-docs-page a:hover { background: rgba(15,107,77,0.12); }

  /* ── Кабинет v2: ценностные блоки ── */
  .lk-stack { display: flex; flex-direction: column; gap: 20px; }
  .lk-pill-cta { margin-left: auto; align-self: center; font-weight: 700; font-size: 13px; color: #fff;
    background: var(--accent-deep); border: none; border-radius: 100px; padding: 10px 20px; cursor: pointer; font-family: inherit; }
  .lk-pill-cta:hover { background: var(--accent); }
  .lk-hero-card { padding: 28px clamp(20px, 4vw, 34px); border-radius: 22px;
    background: linear-gradient(135deg, rgba(42,155,115,0.13), rgba(15,107,77,0.06));
    border: 1px solid rgba(42,155,115,0.22); }
  .lk-hero-card-tag { font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
  .lk-hero-card-title { font-family: 'Familjen Grotesk', sans-serif; font-size: clamp(20px, 3vw, 27px); font-weight: 800; color: var(--ink); letter-spacing: -0.02em; margin: 0 0 8px; }
  .lk-hero-card-text { font-size: 14.5px; color: var(--ink-soft); line-height: 1.6; max-width: 620px; margin: 0 0 16px; }
  .lk-slots { display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
  .lk-slot { width: 56px; height: 56px; border-radius: 14px; border: 2px dashed rgba(15,107,77,0.3);
    display: flex; align-items: center; justify-content: center; font-size: 22px; color: rgba(15,107,77,0.5); background: rgba(255,255,255,0.4); }
  .lk-primary { padding: 13px 26px; border-radius: 13px; border: none; cursor: pointer;
    background: var(--accent-deep); color: #fff; font-family: inherit; font-weight: 700; font-size: 14.5px; box-shadow: 0 6px 18px rgba(10,74,53,0.25); }
  .lk-primary:hover { background: var(--accent); }
  .lk-block-airy { padding: 24px clamp(18px, 3vw, 26px); }
  .lk-sub { font-size: 13px; color: var(--ink-faint); line-height: 1.55; margin: -6px 0 16px; max-width: 580px; }
  .lk-bars { display: flex; flex-direction: column; gap: 11px; }
  .lk-bar-row { display: grid; grid-template-columns: 132px 1fr 64px; align-items: center; gap: 12px; }
  .lk-bar-label { font-size: 13px; color: var(--ink-soft); font-weight: 600; }
  .lk-bar-track { height: 10px; border-radius: 100px; background: rgba(0,0,0,0.06); overflow: hidden; }
  .lk-bar-fill { height: 100%; border-radius: 100px; transition: width .4s ease; }
  .lk-bar-val { font-size: 12px; font-weight: 700; color: var(--ink-faint); text-align: right; }
  .lk-two { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .lk-banner { display: flex; gap: 14px; padding: 20px; border-radius: 18px; border: 1px solid var(--glass-border); }
  .lk-banner.hair { background: linear-gradient(135deg, rgba(42,155,115,0.12), rgba(255,255,255,0.42)); }
  .lk-banner.face { background: linear-gradient(135deg, rgba(155,125,180,0.13), rgba(255,255,255,0.42)); }
  .lk-banner-ic { font-size: 30px; line-height: 1; flex-shrink: 0; }
  .lk-banner-name { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .lk-banner-text { font-size: 13px; color: var(--ink-soft); line-height: 1.55; margin-bottom: 13px; }
  .lk-ghost { padding: 9px 18px; border-radius: 11px; cursor: pointer; font-family: inherit; font-weight: 700; font-size: 13px;
    background: rgba(255,255,255,0.6); border: 1.5px solid var(--accent); color: var(--accent); }
  .lk-ghost:hover { background: var(--accent); color: #fff; }
  .lk-weeks { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 6px; }
  .lk-week { flex-shrink: 0; width: 96px; text-align: center; }
  .lk-week-photo { width: 96px; height: 120px; border-radius: 14px; border: 2px dashed rgba(15,107,77,0.25);
    display: flex; align-items: center; justify-content: center; font-size: 26px; color: rgba(15,107,77,0.4);
    background: rgba(255,255,255,0.4); margin-bottom: 6px; }
  .lk-week-n { font-size: 12px; color: var(--ink-faint); font-weight: 600; }
  .lk-articles { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
  .lk-article { position: relative; padding: 16px; border-radius: 14px; background: rgba(255,255,255,0.45); border: 1px solid var(--glass-border); }
  .lk-article-t { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 5px; max-width: 84%; }
  .lk-article-d { font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }
  .lk-meters-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 14px; }
  @media (max-width: 680px) {
    .lk-two { grid-template-columns: 1fr; }
    .lk-meters-row { grid-template-columns: 1fr; }
    .lk-bar-row { grid-template-columns: 96px 1fr 52px; }
  }

  /* ── Настройки (переиспользует .lk-page / .lk-block) ── */
  .lk-top-ico { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px;
    border-radius: 10px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.55);
    color: var(--ink-soft); font-size: 16px; cursor: pointer; }
  .lk-top-ico:hover { background: rgba(255,255,255,0.85); color: var(--ink); }
  .set-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 560px) { .set-grid { grid-template-columns: 1fr; } }
  .set-readonly { font-size: 14px; color: var(--ink); padding: 10px 13px; border-radius: 11px;
    background: rgba(0,0,0,0.035); border: 1px solid var(--glass-border); word-break: break-all; }
  .set-row { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid var(--glass-border); }
  .set-row:last-child { border-bottom: none; }
  .set-row-txt { flex: 1; min-width: 0; }
  .set-row-name { font-size: 14px; font-weight: 600; color: var(--ink); }
  .set-row-desc { font-size: 12.5px; color: var(--ink-faint); margin-top: 2px; line-height: 1.45; }
  /* переключатель */
  .set-switch { position: relative; width: 44px; height: 26px; flex-shrink: 0; cursor: pointer; }
  .set-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
  .set-switch .track { position: absolute; inset: 0; border-radius: 100px; background: rgba(0,0,0,0.16); transition: background .2s; }
  .set-switch .knob { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%;
    background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: transform .2s; }
  .set-switch input:checked + .track { background: var(--accent); }
  .set-switch input:checked + .track + .knob { transform: translateX(18px); }
  .set-switch input:disabled + .track { opacity: 0.5; cursor: not-allowed; }
  .set-links { display: flex; flex-direction: column; gap: 2px; }
  .set-link { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 2px;
    font-size: 14px; color: var(--ink-soft); text-decoration: none; border-bottom: 1px solid var(--glass-border); cursor: pointer; }
  .set-link:last-child { border-bottom: none; }
  .set-link:hover { color: var(--accent); }
  .set-link .arr { color: var(--ink-faint); font-size: 16px; }
  .set-danger { width: 100%; padding: 12px; border-radius: 12px; cursor: pointer; font-family: inherit;
    font-weight: 700; font-size: 13.5px; background: rgba(193,123,138,0.1); color: var(--rose); border: 1px solid rgba(193,123,138,0.3); }
  .set-danger:hover { background: rgba(193,123,138,0.18); }
  .set-saved { font-size: 12.5px; color: var(--accent); font-weight: 700; }
  .set-about-row { display: flex; justify-content: space-between; font-size: 13.5px; padding: 7px 0; color: var(--ink-soft); }
  .set-about-row b { color: var(--ink); font-weight: 600; }

  .paywall-card {
    width: min(400px, 92vw); text-align: center;
    background: var(--glass-strong); border: 1px solid var(--glass-border);
    backdrop-filter: blur(26px) saturate(150%); -webkit-backdrop-filter: blur(26px) saturate(150%);
    border-radius: 24px; padding: 28px 26px; box-shadow: 0 30px 80px rgba(15,50,40,0.28);
  }
  .paywall-emoji { font-size: 40px; margin-bottom: 8px; }
  .paywall-title { font-family: 'Familjen Grotesk', sans-serif; font-size: 21px; font-weight: 700; color: var(--ink); margin: 0 0 8px; letter-spacing: -0.02em; }
  .paywall-body { font-size: 14px; color: var(--ink-soft); line-height: 1.6; margin: 0 0 18px; }
  .paywall-list { list-style: none; padding: 0; margin: 0 0 22px; text-align: left; display: flex; flex-direction: column; gap: 9px; }
  .paywall-list li { font-size: 13.5px; color: var(--ink-soft); padding-left: 26px; position: relative; }
  .paywall-list li::before { content: "✓"; position: absolute; left: 4px; color: var(--accent); font-weight: 800; }
  .paywall-card .btn-primary { width: 100%; }
  .paywall-later { background: none; border: none; cursor: pointer; color: var(--ink-faint); font-family: inherit; font-size: 13px; margin-top: 10px; padding: 6px; }
  .paywall-later:hover { color: var(--ink-soft); text-decoration: underline; }

  .filter-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .chip {
    font-size: 12px; font-weight: 600; color: var(--accent-deep);
    background: color-mix(in srgb, var(--accent) 12%, rgba(255,255,255,0.5));
    border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
    border-radius: 9px; padding: 5px 11px; cursor: pointer; transition: background .15s;
  }
  .chip:hover { background: color-mix(in srgb, var(--accent) 20%, rgba(255,255,255,0.5)); }

  .empty-state { text-align: center; padding: 60px 20px; color: var(--ink-faint); }
  .empty-state .empty-ic { font-size: 40px; opacity: 0.4; display: block; margin-bottom: 12px; }
  .empty-state p { font-size: 15px; margin-bottom: 16px; }

  .section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 18px; text-align: left; }
  .section-title { text-align: left; }
  .ing-head-right { display: flex; align-items: center; gap: 14px; }
  .ing-sort { max-width: 220px; }
  .section-title { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: clamp(20px, 3vw, 26px); letter-spacing: -0.02em; }
  .count { font-size: 13px; color: var(--ink-faint); font-weight: 500; }

  /* ── Витрина: вертикальные карточки-банки ── */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 18px; position: relative; z-index: 1; }
  .card {
    background: linear-gradient(160deg, rgba(243,249,255,0.66), rgba(231,242,252,0.52));
    border: 1px solid rgba(193,221,244,0.42);
    backdrop-filter: blur(18px) saturate(120%); -webkit-backdrop-filter: blur(18px) saturate(120%);
    border-radius: 20px; overflow: hidden; cursor: pointer;
    box-shadow: 0 2px 12px rgba(30,80,140,0.07); transition: transform .18s, box-shadow .25s;
    display: flex; flex-direction: column;
  }
  .card:hover { transform: scale(1.033); box-shadow: 0 8px 28px rgba(30,80,140,0.13); }
  /* ── скелетоны загрузки ── */
  @keyframes sk-shimmer { 0% { background-position: -300px 0; } 100% { background-position: 300px 0; } }
  .sk { background: linear-gradient(90deg, rgba(190,210,230,0.16) 25%, rgba(190,210,230,0.34) 50%, rgba(190,210,230,0.16) 75%);
    background-size: 600px 100%; animation: sk-shimmer 1.25s ease-in-out infinite; border-radius: 8px; }
  .sk-card { background: rgba(243,249,255,0.5); border: 1px solid rgba(193,221,244,0.32);
    border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; }
  .sk-card .sk-media { aspect-ratio: 3 / 4; border-radius: 0; }
  .sk-card .sk-body { padding: 14px 15px 16px; display: flex; flex-direction: column; gap: 8px; }
  .sk-line { height: 11px; }
  .sk-row { display: flex; gap: 14px; align-items: center; padding: 13px 4px; border-bottom: 1px solid var(--glass-border); }
  .card-media {
    aspect-ratio: 3 / 4;  /* вертикально-ориентированная банка/флакон */
    background: linear-gradient(150deg, rgba(248,252,255,0.72), rgba(234,244,253,0.52));
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .card-media img { width: 100%; height: 100%; object-fit: contain; padding: 8px; }
  .card-media .ph { font-size: 30px; color: var(--ink-faint); opacity: .5; }
  .card-type {
    position: absolute; top: 10px; left: 10px;
    font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em;
    background: rgba(255,255,255,0.7); backdrop-filter: blur(6px);
    color: var(--ink-soft); padding: 4px 9px; border-radius: 8px;
  }
  .card-body { padding: 14px 15px 16px; display: flex; flex-direction: column; flex: 1; }
  .card-name {
    font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 14px; line-height: 1.3;
    letter-spacing: -0.01em; margin-bottom: 6px;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    min-height: calc(3 * 1.3em);  /* фиксируем высоту под 3 строки — бренд всегда на одном уровне */
  }
  .card-brand { font-size: 11px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }
  .card-fns { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
  /* цветное стекло — цвет задаётся инлайн через --fn (hue функции) */
  .fn-glass {
    font-size: 11px; font-weight: 600; padding: 5px 10px; border-radius: 9px;
    color: var(--fn); white-space: nowrap;
    background: color-mix(in srgb, var(--fn) 14%, rgba(255,255,255,0.5));
    border: 1px solid color-mix(in srgb, var(--fn) 32%, transparent);
    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.5);
  }
  /* бледный вариант для "немного ..." */
  .fn-glass.soft {
    background: color-mix(in srgb, var(--fn) 7%, rgba(255,255,255,0.42));
    border-color: color-mix(in srgb, var(--fn) 18%, transparent);
    color: color-mix(in srgb, var(--fn) 70%, var(--ink-soft));
    font-weight: 600;
  }

  /* ── Блок заметок (notes) в модалке ── */
  .notes-block {
    margin-top: 12px; padding: 12px 14px;
    background: linear-gradient(135deg, rgba(230,244,255,0.6), rgba(218,238,252,0.5));
    border: 1px solid rgba(100,170,230,0.28); border-radius: 14px;
  }
  .notes-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
    border-radius: 20px; padding: 3px 10px; margin-bottom: 7px;
  }
  .badge-gold { background: rgba(255,215,0,0.22); color: #8a6a00; border: 1px solid rgba(255,200,0,0.35); }
  .badge-star { background: rgba(100,160,240,0.18); color: #1a5a9a; border: 1px solid rgba(100,160,240,0.3); }
  .notes-text { font-size: 13px; color: var(--ink-soft); line-height: 1.55; }
  /* компактная авто-сводка вместо крупного блока наград */
  .summary-block {
    margin-top: 12px; padding: 11px 14px;
    background: linear-gradient(135deg, rgba(225,242,235,0.55), rgba(214,236,228,0.45));
    border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent); border-radius: 13px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .summary-block .notes-badge { margin-bottom: 0; align-self: flex-start; }
  .summary-text { font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }

  /* ── Модалка карточки продукта ── */
  .overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(40,55,75,0.35); backdrop-filter: blur(4px);
    display: flex; align-items: flex-start; justify-content: center;
    padding: clamp(1rem, 4vh, 3rem) 1rem; overflow-y: auto;
  }
  .modal {
    width: 100%; max-width: 880px; margin: auto;
    background: linear-gradient(160deg, rgba(240,248,255,0.82), rgba(228,241,237,0.78));
    border: 1px solid rgba(180,215,240,0.55);
    backdrop-filter: blur(34px) saturate(150%); -webkit-backdrop-filter: blur(34px) saturate(150%);
    border-radius: 24px; box-shadow: 0 18px 50px rgba(30,80,140,0.13);
    overflow: hidden;
  }
  .modal-head { display: grid; grid-template-columns: 280px 1fr; gap: 0; }
  @media (max-width: 640px) { .modal-head { grid-template-columns: 1fr; } }
  .modal-media {
    aspect-ratio: 3 / 4;
    background: linear-gradient(150deg, rgba(230,243,255,0.75), rgba(205,228,248,0.55));
    display: flex; align-items: center; justify-content: center; position: relative;
  }
  .modal-media img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
  .modal-media .ph { font-size: 44px; color: var(--ink-faint); opacity: .5; }
  .modal-info { padding: 22px 24px; position: relative; }
  .modal-close {
    position: absolute; top: 14px; right: 14px; width: 32px; height: 32px;
    border-radius: 50%; border: none; cursor: pointer; font-size: 15px;
    background: rgba(255,255,255,0.6); color: var(--ink-soft);
    display: flex; align-items: center; justify-content: center;
  }
  .modal-close:hover { background: white; }
  .modal-title { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 21px; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 6px; padding-right: 36px; }
  .modal-brand { font-size: 12px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .07em; font-weight: 600; }
  .modal-desc { font-size: 13.5px; color: var(--ink-soft); line-height: 1.55; margin-top: 12px; }
  .meta-row { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--line); }
  .meta-item { display: flex; flex-direction: column; gap: 3px; }
  .meta-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-faint); font-weight: 600; }
  .meta-value { font-size: 13.5px; color: var(--ink); font-weight: 600; }
  .meta-link { cursor: pointer; border-bottom: 1px dashed var(--ink-faint); transition: color .15s, border-color .15s; }
  .meta-link:hover { color: var(--accent); border-bottom-color: var(--accent); }
  .fn-clickable { cursor: pointer; transition: transform .12s, box-shadow .15s; }
  .fn-clickable:hover { transform: translateY(-1px); box-shadow: 0 3px 10px rgba(15,75,55,0.14); }
  .safety-link { cursor: pointer; transition: background .15s; }
  .safety-link:hover { background: rgba(255,255,255,0.72); }
  .safety-arrow { margin-left: auto; color: var(--ink-faint); font-size: 16px; align-self: center; }
  .fn-block { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); }
  .fn-block-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-faint); font-weight: 600; display: block; margin-bottom: 9px; }
  .fn-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .fn-glass-lg {
    font-size: 13px; font-weight: 600; padding: 8px 14px; border-radius: 12px;
    color: var(--fn); display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Familjen Grotesk', sans-serif;
    background: color-mix(in srgb, var(--fn) 15%, rgba(255,255,255,0.55));
    border: 1px solid color-mix(in srgb, var(--fn) 34%, transparent);
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.55), 0 2px 8px color-mix(in srgb, var(--fn) 14%, transparent);
  }
  .fn-glass-lg.soft {
    background: color-mix(in srgb, var(--fn) 8%, rgba(255,255,255,0.45));
    border-color: color-mix(in srgb, var(--fn) 20%, transparent);
    color: color-mix(in srgb, var(--fn) 72%, var(--ink-soft));
  }
  .fn-glass-lg .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--fn); flex-shrink: 0; }
  .fn-glass-lg.soft .dot { opacity: 0.5; }
  .compo-divider { display: flex; align-items: center; gap: 10px; margin: 10px 2px; }
  .compo-divider .ln { flex: 1; height: 1px; background: var(--line); }
  .compo-divider .lbl { font-size: 11px; font-weight: 600; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .04em; white-space: nowrap; }
  .ing.minor { opacity: 0.62; }
  .chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
  .chip { font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 20px; background: rgba(255,255,255,0.55); border: 1px solid var(--glass-border); color: var(--ink-soft); }
  .chip-attr { background: rgba(123,168,127,0.14); color: #5a8560; border-color: rgba(123,168,127,0.3); }
  .photo-btn { margin-top: 14px; }

  .safety { display: flex; align-items: center; gap: 12px; margin-top: 16px; padding: 12px 14px; border-radius: 14px; background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); }
  .safety-ring { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; color: white; }
  .safety-txt b { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 14px; display: block; }
  .safety-txt span { font-size: 12px; color: var(--ink-soft); }

  .compo { padding: 0 24px 24px; }
  .compo-head { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-soft); margin: 8px 0 12px; }
  .compo-head span { color: var(--ink-faint); font-weight: 500; text-transform: none; letter-spacing: 0; }
  .ing-list { display: flex; flex-direction: column; max-height: 440px; overflow-y: auto; }
  .ing-list::-webkit-scrollbar { width: 6px; }
  .ing-list::-webkit-scrollbar-thumb { background: rgba(60,110,88,0.3); border-radius: 3px; }
  .ing-grid { display: grid; grid-template-columns: 26px minmax(150px,1.2fr) minmax(120px,150px) 1.1fr; gap: 0; align-items: stretch; }
  .ing-colhead {
    font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--accent-deep);
    padding: 10px 14px 9px; position: sticky; top: 0; z-index: 2;
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 13%, rgba(238,244,240,0.95)), color-mix(in srgb, var(--accent) 9%, rgba(236,243,239,0.92)));
    border-bottom: 1.5px solid color-mix(in srgb, var(--accent) 28%, transparent);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  }
  .ing-colhead:first-child { border-top-left-radius: 12px; }
  .ing-colhead:last-child { border-top-right-radius: 12px; }
  .ing-colhead + .ing-colhead { border-left: 1px solid color-mix(in srgb, var(--accent) 14%, transparent); }
  .ing-cell { padding: 13px 14px; border-bottom: 1px solid var(--line); text-align: left; }
  .ing-grid:hover .ing-cell-hover { background: rgba(255,255,255,0.45); }
  .ing-cell-sep { border-left: 1px solid var(--line); }
  .ing-pos { font-size: 12px; color: var(--ink-faint); font-weight: 600; }
  .ing-inci { font-weight: 600; font-size: 14.5px; color: var(--ink); display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
  .ing-ru { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; text-align: left; }
  .ing-sub { font-size: 12.5px; color: var(--ink-soft); line-height: 1.45; }
  .ing-sub .lbl { color: var(--ink-faint); display: block; font-size: 11px; margin-bottom: 1px; }
  .ing-desc { font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }
  .ing-oil { font-size: 11.5px; color: #a06f2a; margin-top: 4px; }
  .badge-eu { font-size: 10px; font-weight: 700; color: var(--rose); background: rgba(193,123,138,0.13); border-radius: 6px; padding: 2px 7px; letter-spacing: .02em; cursor: help; }
  .badge-na { font-size: 10px; color: var(--ink-faint); font-style: italic; }
  .g-tag {
    font-size: 12px; font-weight: 600; padding: 5px 11px; border-radius: 9px;
    line-height: 1.25; cursor: pointer; transition: transform .12s, box-shadow .15s; display: inline-block;
    max-width: 100%; overflow-wrap: anywhere; word-break: break-word; white-space: normal;
  }
  .g-tag:hover { transform: translateY(-1px); box-shadow: 0 3px 10px rgba(15,75,55,0.16); }
  .sub-link { cursor: pointer; border-bottom: 1px dashed var(--ink-faint); transition: color .15s; }
  .sub-link:hover { color: var(--accent); border-bottom-color: var(--accent); }
  .minor .ing-cell { opacity: 0.6; }

  /* ── Справочник: таблица ── */
  .table-wrap {
    background: var(--glass); border: 1px solid var(--glass-border);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border-radius: 18px; overflow: hidden;
  }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th {
    text-align: left; font-family: 'Manrope', sans-serif; font-weight: 700;
    font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-faint);
    padding: 14px 18px; border-bottom: 1px solid var(--line); background: rgba(255,255,255,0.3);
    vertical-align: middle;
  }
  td { text-align: left; padding: 13px 18px; border-bottom: 1px solid var(--line); font-size: 13.5px; vertical-align: top; }
  td:not(:last-child) { border-right: 1px solid var(--line); }
  th:not(:last-child) { border-right: 1px solid var(--line); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.4); }
  .td-inci { font-weight: 600; color: var(--ink); }
  .inci-link { cursor: pointer; border-bottom: 1px solid transparent; transition: color .15s, border-color .15s; }
  .inci-link:hover { color: var(--accent); border-bottom-color: var(--accent); }

  /* ── ДЕТАЛЬНАЯ КАРТОЧКА (ингредиент / группа) ── */
  .dm-modal { max-width: 680px; position: relative; }
  .dm-body { padding: 30px 32px 32px; max-height: 82vh; overflow-y: auto; }
  .dm-body::-webkit-scrollbar { width: 6px; }
  .dm-body::-webkit-scrollbar-thumb { background: rgba(60,110,88,0.3); border-radius: 3px; }
  .dm-head { margin-bottom: 16px; padding-right: 30px; }
  .dm-kind { font-size: 10.5px; text-transform: uppercase; letter-spacing: .1em; color: var(--ink-faint); font-weight: 700; }
  .dm-title { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 24px; line-height: 1.15; letter-spacing: -0.02em; margin-top: 4px; color: var(--ink); }
  .dm-sub { font-size: 14px; color: var(--ink-soft); margin-top: 3px; }
  .dm-allergen { display: inline-block; margin-top: 8px; font-size: 11px; font-weight: 700; color: var(--rose); background: rgba(193,123,138,0.13); border-radius: 7px; padding: 3px 10px; }
  .dm-desc { font-size: 14px; color: var(--ink-soft); line-height: 1.6; margin-bottom: 8px; }
  .dm-muted { color: var(--ink-faint); font-style: italic; }
  .dm-section { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); }
  .dm-label { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: .07em; color: var(--ink-faint); font-weight: 700; margin-bottom: 12px; }
  .dm-grouprow { margin-bottom: 14px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .dm-arrow { color: var(--ink-faint); font-size: 13px; }
  .dm-subtag { font-size: 13px; font-weight: 600; color: var(--accent-deep); cursor: pointer; border-bottom: 1px dashed var(--ink-faint); }
  .dm-subtag:hover { border-bottom-color: var(--accent); }
  .dm-groupdesc { flex-basis: 100%; font-size: 13px; color: var(--ink-soft); line-height: 1.55; margin-top: 4px; padding-left: 2px; }
  .dm-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .dm-ingchip { font-size: 12.5px; font-weight: 600; color: var(--ink-soft); background: rgba(255,255,255,0.55); border: 1px solid var(--glass-border); border-radius: 9px; padding: 6px 11px; cursor: pointer; transition: background .15s, color .15s; }
  .dm-ingchip:hover { background: var(--glass-strong); color: var(--accent-deep); }
  .dm-prodlist { display: flex; flex-direction: column; gap: 8px; }
  .dm-prodcard { display: flex; flex-direction: row; align-items: center; gap: 12px; text-align: left; cursor: pointer; width: 100%;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); border-radius: 12px; padding: 9px 12px; font-family: inherit;
    transition: background .15s, transform .12s; }
  .dm-prodcard:hover { background: var(--glass-strong); transform: translateX(2px); }
  .dm-prodmeta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .pt-img { object-fit: cover; border-radius: 9px; flex-shrink: 0; background: rgba(255,255,255,0.5); }
  .pt-ph { flex-shrink: 0; border-radius: 9px; background: color-mix(in srgb, var(--tint) 8%, rgba(255,255,255,0.55)); border: 1px solid color-mix(in srgb, var(--tint) 18%, transparent); display: flex; align-items: center; justify-content: center; padding: 3px; }

  /* ── Блок похожих по составу (в модалке средства) ── */
  .similar-block { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); }
  .similar-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
  .similar-title { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 15px; color: var(--ink); }
  .similar-hint { font-size: 11px; color: var(--ink-faint); }
  .similar-list { display: flex; flex-direction: column; gap: 8px; }
  .similar-card { display: flex; align-items: center; gap: 14px; width: 100%; text-align: left; cursor: pointer; font-family: inherit;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); border-radius: 14px; padding: 12px 14px;
    transition: background .15s, transform .12s; }
  .similar-card:hover { background: var(--glass-strong); transform: translateX(2px); }
  .similar-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
  .similar-name { font-size: 14px; font-weight: 600; color: var(--ink); line-height: 1.25; }
  .similar-right { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; flex-shrink: 0; }
  .similar-match { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 18px; color: var(--m); }
  .similar-matchlbl { font-size: 9.5px; text-transform: uppercase; letter-spacing: .05em; color: var(--ink-faint); font-weight: 600; }
  .similar-cheaper { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: var(--accent); background: rgba(15,107,77,0.12); border-radius: 6px; padding: 2px 7px; }

  /* ── Плиточные мини-карточки средств (похожие / встречается в) ── */
  /* размер колонок подстраивается, но не уже минимума — изображение остаётся читаемым */
  .pcards { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(124px, 1fr)); }
  .pcards.few { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  .pcard {
    position: relative; isolation: isolate; overflow: hidden;
    background: var(--glass); border: 1px solid var(--glass-border);
    backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-radius: 16px; cursor: pointer; text-align: left; font-family: inherit; padding: 0;
    box-shadow: var(--shadow-sm); transition: transform .18s, box-shadow .25s;
    display: flex; flex-direction: column;
  }
  .pcard:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
  /* шёлковый блик — диагональный световой проход поверх карточки при наведении */
  .pcard::after {
    content: ""; position: absolute; inset: 0; z-index: 3; pointer-events: none; border-radius: inherit;
    background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 47%, rgba(255,255,255,0.18) 53%, transparent 70%);
    background-size: 280% 280%; background-position: 130% 0; opacity: 0;
    transition: opacity .25s;
  }
  .pcard:hover::after { opacity: 1; animation: silk 1.1s ease forwards; }
  @keyframes silk { 0% { background-position: 130% 0; } 100% { background-position: -60% 0; } }
  .pcard-media {
    aspect-ratio: 3 / 4; position: relative;
    background: linear-gradient(150deg, rgba(225,238,252,0.55), rgba(208,226,244,0.42));
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .pcard-media img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
  .pcard-media .ph { font-size: 26px; color: var(--ink-faint); opacity: .5; }
  .pcard-type {
    position: absolute; top: 7px; left: 7px; z-index: 2;
    font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em;
    background: rgba(255,255,255,0.72); backdrop-filter: blur(6px);
    color: var(--ink-soft); padding: 3px 7px; border-radius: 7px;
  }
  .pcard-match {
    position: absolute; top: 7px; right: 7px; z-index: 2;
    font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 12px; color: #fff;
    background: var(--m); border-radius: 8px; padding: 3px 7px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .pcard-body { padding: 9px 10px 11px; }
  .pcard-name { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 12.5px; line-height: 1.28; letter-spacing: -0.01em; color: var(--ink);
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pcard-brand { font-size: 9.5px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .05em; font-weight: 600; margin-top: 4px; }

  /* ── Вкладка «Сравнение составов» ── */
  .sim-intro { font-size: 14px; color: var(--ink-soft); line-height: 1.55; margin-bottom: 20px; max-width: 760px; }
  .sim-tab .sim-intro { max-width: 680px; margin-left: auto; margin-right: auto; text-align: center; }
  .cmp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
  @media (max-width: 720px) { .cmp-grid { grid-template-columns: 1fr; } }
  .cmp-side { display: flex; flex-direction: column; gap: 8px;
    background: var(--glass-warm); border: 1px solid var(--glass-border); border-radius: 16px; padding: 16px 18px;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .cmp-side-head { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 15px; color: var(--ink); margin-bottom: 4px; }
  .cmp-mode { display: flex; gap: 6px; margin-bottom: 6px; }
  .cmp-mode-btn { flex: 1; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; padding: 8px 10px; border-radius: 10px;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); color: var(--ink-soft); transition: all .15s; }
  .cmp-mode-btn.active { background: var(--accent); color: white; border-color: var(--accent); }
  .cmp-sort { display: flex; gap: 6px; }
  .cmp-sort-btn { flex: 1; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; padding: 9px 10px; border-radius: 10px;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); color: var(--ink-soft); transition: all .15s; }
  .cmp-sort-btn.active { background: var(--accent-deep); color: white; border-color: var(--accent-deep); }
  .sim-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: .07em; color: var(--ink-faint); font-weight: 700; }
  .sim-textarea, .sim-select {
    width: 100%; font-family: inherit; font-size: 13.5px; color: var(--ink);
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; padding: 11px 13px; outline: none;
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: border-color .2s;
  }
  .sim-textarea { resize: vertical; line-height: 1.5; min-height: 88px; }
  .sim-textarea:focus, .sim-select:focus { border-color: var(--accent); }
  .sim-or { align-self: center; font-size: 12px; font-weight: 700; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .08em; }
  .sim-or-sm { font-size: 10.5px; margin: 2px 0; }
  .sim-single { max-width: 680px; margin: 0 auto 8px; display: flex; flex-direction: column; gap: 10px;
    background: var(--glass-warm); border: 1px solid var(--glass-border); border-radius: 18px;
    padding: 22px 24px; box-shadow: var(--shadow-sm);
    backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%); }
  .sim-manual { margin-top: 6px; }
  .sim-manual > summary { cursor: pointer; font-size: 12.5px; color: var(--accent-deep); font-weight: 600; padding: 4px 0; list-style: none; user-select: none; }
  .sim-manual > summary::-webkit-details-marker { display: none; }
  .sim-manual > summary::before { content: "＋ "; }
  .sim-manual[open] > summary::before { content: "－ "; }
  .sim-manual > * { margin-top: 8px; }
  .sim-select-sm { width: auto; min-width: 150px; font-size: 12.5px; padding: 7px 11px; }
  .results-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin: 4px 0 14px; }
  .results-controls { display: flex; gap: 8px; flex-wrap: wrap; }
  .cmp-picked-card { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 14px;
    background: var(--glass); border: 1px solid var(--glass-border); position: relative; }
  .cmp-picked-clickable { cursor: pointer; transition: transform .12s, box-shadow .2s; }
  .cmp-picked-clickable:hover { transform: translateY(-1px); box-shadow: var(--shadow-sm); }
  .cmp-picked-card .pt-img, .cmp-picked-card .pt-ph { width: 48px !important; height: 56px !important; flex: 0 0 48px; border-radius: 10px; }
  .cmp-picked-meta { min-width: 0; flex: 1; }
  .cmp-picked-name { font-size: 14px; font-weight: 650; color: var(--ink); line-height: 1.3; }
  .cmp-picked-brand { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }
  .cmp-picked-type { font-size: 11px; color: var(--ink-faint); margin-top: 3px; }
  .cmp-picked-x { position: absolute; top: 6px; right: 8px; border: none; background: transparent; cursor: pointer;
    font-size: 20px; line-height: 1; color: var(--ink-faint); padding: 2px 6px; border-radius: 8px; }
  .cmp-picked-x:hover { color: var(--ink); background: var(--glass-border); }
  .cmp-actions { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .cmp-hint { font-size: 12.5px; color: var(--ink-faint); }
  .sim-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; }
  .sim-result-card { display: flex; align-items: center; gap: 13px; cursor: pointer;
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 12px 14px;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); transition: transform .12s, box-shadow .2s; }
  .sim-result-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }
  .sim-result-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
  .sim-shared { font-size: 11px; color: var(--ink-faint); margin-top: 3px; line-height: 1.4; }
  /* прямое сравнение двух составов */
  .cmp-pair { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 18px; padding: 22px;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .cmp-pair-score { display: flex; flex-direction: column; align-items: center; gap: 2px; margin-bottom: 22px; }
  .cmp-pair-num { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 44px; color: var(--m); line-height: 1; }
  .cmp-pair-lbl { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-faint); font-weight: 600; }
  .cmp-pair-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  @media (max-width: 640px) { .cmp-pair-cols { grid-template-columns: 1fr; } }
  .cmp-pair-col { display: flex; flex-direction: column; gap: 7px; align-items: flex-start; }
  .cmp-tag { font-size: 12px; font-weight: 600; color: var(--ink-soft); background: rgba(255,255,255,0.55);
    border: 1px solid var(--glass-border); border-radius: 8px; padding: 4px 9px; }
  .cmp-tag.shared { color: var(--accent-deep); background: rgba(15,107,77,0.1); border-color: color-mix(in srgb, var(--accent) 24%, transparent); }
  .dm-prodtype { font-size: 10px; text-transform: uppercase; letter-spacing: .06em; color: var(--accent); font-weight: 700; }
  .dm-prodname { font-size: 14px; font-weight: 600; color: var(--ink); }
  .dm-prodbrand { font-size: 12px; color: var(--ink-faint); }
  .cell-input {
    width: 100%; font-family: inherit; font-size: 13px; color: var(--ink);
    background: white; border: 1px solid var(--accent); border-radius: 8px; padding: 6px 10px; outline: none;
  }
  .cell-edit-hint { cursor: pointer; border-bottom: 1px dashed transparent; }
  tr:hover .cell-edit-hint { border-bottom-color: var(--ink-faint); }

  .pager { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; flex-wrap: wrap; gap: 12px; }
  .pager-controls { display: flex; align-items: center; gap: 6px; }
  .pg-btn {
    min-width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--glass-border);
    background: var(--glass); color: var(--ink-soft); font-weight: 600; font-size: 13px; cursor: pointer;
    backdrop-filter: blur(8px);
  }
  .pg-btn:hover:not(:disabled) { background: var(--glass-strong); color: var(--ink); }
  .pg-btn:disabled { opacity: .4; cursor: default; }
  .pg-btn.active { background: var(--accent); color: white; border-color: var(--accent); }
  .pg-size { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-soft); }
  .pg-size select {
    font-family: inherit; font-size: 13px; color: var(--ink); cursor: pointer;
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 10px; padding: 7px 10px; outline: none;
  }
  .filter-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
  .pill {
    font-size: 12.5px; font-weight: 600; padding: 8px 15px; border-radius: 11px; cursor: pointer;
    background: rgba(255,255,255,0.5); border: 1px solid var(--glass-border); color: var(--ink-soft);
    transition: background .16s, color .16s, border-color .16s, box-shadow .16s; letter-spacing: -0.01em;
  }
  .pill:hover { background: color-mix(in srgb, var(--accent) 12%, rgba(255,255,255,0.6)); border-color: color-mix(in srgb, var(--accent) 30%, transparent); color: var(--accent-deep); }
  .pill.active {
    background: var(--accent-deep); color: #fff; border-color: var(--accent-deep);
    box-shadow: 0 3px 12px color-mix(in srgb, var(--accent-deep) 35%, transparent);
  }
  .pill-sub { font-size: 12px; padding: 6px 13px; border-radius: 9px; }
  .pill-sub.active { background: color-mix(in srgb, var(--accent-deep) 82%, transparent); }

  .admin-toggle { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-soft); font-weight: 600; cursor: pointer; user-select: none; }
  .switch { width: 38px; height: 22px; border-radius: 11px; background: rgba(120,135,155,0.3); position: relative; transition: background .2s; flex-shrink: 0; }
  .switch.on { background: var(--accent); }
  .switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: white; transition: transform .2s; }
  .switch.on::after { transform: translateX(16px); }

  /* ── Кнопки сравнения в карточке ингредиента ── */
  .dm-cmp-actions { display: flex; gap: 9px; flex-wrap: wrap; margin: 4px 0 4px; }
  .btn.is-added { color: var(--accent-deep); border-color: color-mix(in srgb, var(--accent) 32%, transparent); }

  /* ── Поиск средства автокомплитом (вкладка сравнения) ── */
  .ac-wrap { position: relative; }
  .ac-input {
    width: 100%; font-family: inherit; font-size: 13.5px; color: var(--ink);
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; padding: 11px 13px; outline: none;
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: border-color .2s;
  }
  .ac-input:focus { border-color: var(--accent); }
  .ac-drop {
    position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 30; max-height: 280px; overflow-y: auto;
    background: var(--glass-warm); border: 1px solid var(--glass-border); border-radius: 14px;
    backdrop-filter: blur(20px) saturate(150%); -webkit-backdrop-filter: blur(20px) saturate(150%);
    box-shadow: var(--shadow); padding: 6px;
  }
  .ac-opt { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; cursor: pointer; font-family: inherit;
    background: transparent; border: none; border-radius: 10px; padding: 8px 9px; transition: background .12s; }
  .ac-opt:hover { background: var(--glass-strong); }
  .ac-opt-meta { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .ac-opt-name { font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.2; }
  .ac-opt-brand { font-size: 11px; color: var(--ink-faint); }
  .ac-empty { padding: 10px; font-size: 13px; color: var(--ink-faint); }
  /* выбранное средство — чип */
  .ac-chosen { display: flex; align-items: center; gap: 11px;
    background: var(--glass); border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--glass-border)); border-radius: 12px; padding: 9px 11px; }
  .ac-chosen-meta { display: flex; flex-direction: column; gap: 1px; min-width: 0; flex: 1; }
  .ac-clear { flex-shrink: 0; cursor: pointer; border: none; background: rgba(255,255,255,0.6); color: var(--ink-soft);
    width: 26px; height: 26px; border-radius: 50%; font-size: 13px; }
  .ac-clear:hover { color: var(--ink); }

  /* ── Компактные поля ввода состава ── */
  .sim-textarea.compact { min-height: 56px; rows: 2; }
  .ana-controls { display: flex; gap: 14px; align-items: flex-end; flex-wrap: wrap; margin-bottom: 8px; }
  .ana-controls .filter-field { min-width: 180px; }

  /* автоопределение типа */
  .type-detect { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 8px; font-size: 12.5px; color: var(--ink-soft); }
  .type-detect b { color: var(--accent-deep); font-weight: 700; }
  .type-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .type-pill { font-size: 11.5px; font-weight: 600; padding: 4px 11px; border-radius: 16px; cursor: pointer;
    background: var(--glass); border: 1px solid var(--glass-border); color: var(--ink-soft); transition: all .15s; }
  .type-pill.active { background: var(--accent); color: white; border-color: var(--accent); }

  /* ── Центральная кнопка «Сравнить/Найти» ── */
  .cmp-cta { display: flex; flex-direction: column; align-items: center; gap: 8px; margin: 22px 0; }
  .btn-cta { padding: 13px 54px; font-size: 15px; border-radius: 14px; font-weight: 700; }

  /* ── Свёрнутая строка ввода после запуска ── */
  .input-collapsed {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    background: var(--glass); border: 1px solid var(--glass-border); border-radius: 14px; padding: 10px 14px; margin-bottom: 20px;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  }
  .ic-summary { font-size: 13px; color: var(--ink-soft); flex: 1; min-width: 0; }
  .ic-summary b { color: var(--ink); font-weight: 600; }
  .ic-edit { margin-left: auto; }

  /* ── Карта функций результата сравнения (что будет делать средство) ── */
  .fn-result { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 18px; padding: 22px;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); margin-bottom: 16px; }
  .fn-result-head { font-family: 'Familjen Grotesk', sans-serif; font-weight: 600; font-size: 16px; color: var(--ink); margin-bottom: 4px; }
  .fn-result-sub { font-size: 12.5px; color: var(--ink-faint); margin-bottom: 16px; }
  .fn-result-list { display: flex; flex-wrap: wrap; gap: 9px; }
  .cmp-tech { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); font-size: 12.5px; color: var(--ink-faint); }
  .cmp-tech b { color: var(--ink-soft); font-weight: 600; }

  /* Кнопка добавления в сравнение (в карточке средства) */
  .cmp-add-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
  .cmp-add-row .is-added { color: var(--accent-deep); border-color: color-mix(in srgb, var(--accent-deep) 40%, transparent); }
  .cmp-add-note { margin-top: 8px; font-size: 12.5px; color: #c0584f; font-weight: 600; }

  /* Матрица сравнения (до 5 средств) */
  .cmp-empty { text-align: center; padding: 40px 16px; }
  .cmp-matrix-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-top: 4px; }
  .cmp-matrix { border-collapse: separate; border-spacing: 0; width: 100%; min-width: 520px; table-layout: fixed; }
  .cmp-matrix th, .cmp-matrix td { vertical-align: top; padding: 12px 12px; border-bottom: 1px solid var(--line); }
  .cmp-corner { width: 150px; background: transparent; border-bottom: none; }
  .cmp-col-head { position: relative; text-align: center; background: var(--glass-warm); border-bottom: 2px solid var(--line); border-top-left-radius: 12px; border-top-right-radius: 12px; }
  .cmp-col-x { position: absolute; top: 6px; right: 6px; width: 22px; height: 22px; border-radius: 50%; border: none; background: rgba(0,0,0,0.06); color: var(--ink-soft); cursor: pointer; font-size: 15px; line-height: 1; z-index: 2; }
  .cmp-col-x:hover { background: #c0584f; color: #fff; }
  .cmp-col-card { cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .cmp-col-name { font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.25; }
  .cmp-col-brand { font-size: 11px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: .05em; }
  .cmp-row-label { width: 150px; font-size: 12.5px; font-weight: 700; color: var(--ink-soft); background: color-mix(in srgb, var(--accent-deep) 4%, transparent); display: flex; flex-direction: column; gap: 2px; }
  .cmp-row-sub { font-size: 10.5px; font-weight: 500; color: var(--ink-faint); text-transform: none; letter-spacing: 0; }
  .cmp-cell { font-size: 13px; color: var(--ink); }
  .cmp-fn-list { display: flex; flex-wrap: wrap; gap: 5px; }
  .cmp-safety { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
  .cmp-safety-ring { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 13px; }
  .cmp-safety-lbl { font-size: 12px; font-weight: 600; }
  .cmp-sim-pct { font-weight: 700; font-size: 15px; color: var(--m); }
  .cmp-base-pill { font-size: 11px; font-weight: 600; color: var(--accent-deep); background: color-mix(in srgb, var(--accent-deep) 10%, transparent); padding: 3px 9px; border-radius: 999px; }
  .cmp-note-text { font-size: 12.5px; color: var(--ink-soft); line-height: 1.45; white-space: pre-wrap; }

  /* ─── ЗАГРУЗОЧНЫЙ МАСКОТ (встроенный, на вкладках) ──────────────────────── */
  .loading-inline {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 60px 20px;
  }
  .loading-fullscreen {
    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: linear-gradient(168deg, #eef5f3, #e6f1ee 55%, #e0eeea);
  }
  .loading-mascot {
    position: relative; width: 180px;
    filter: drop-shadow(0 10px 18px rgba(40,30,70,0.2));
    animation: mascotBob 2.4s ease-in-out infinite;
  }
  @keyframes mascotBob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-9px); }
  }
  .loading-mascot img { width: 100%; display: block; }
  .loading-dots { display: flex; gap: 8px; margin-top: 20px; }
  .loading-dots span {
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--accent); opacity: 0.4;
    animation: dotPulse 1.2s ease-in-out infinite;
  }
  .loading-dots span:nth-child(2) { animation-delay: .2s; }
  .loading-dots span:nth-child(3) { animation-delay: .4s; }
  @keyframes dotPulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.15); }
  }

  /* ─── ЭКРАН ВХОДА v3 ───────────────────────────────────────────────── */
  .login3-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1.5rem;
    background:
      radial-gradient(120% 75% at 50% -8%, #e2f0ec 0%, rgba(226,240,236,0) 55%),
      radial-gradient(110% 80% at 88% 112%, #d8ece7 0%, rgba(216,236,231,0) 50%),
      linear-gradient(168deg, #eef5f3, #e6f1ee 55%, #e0eeea);
  }
  .login3-stage { position: relative; width: 100%; max-width: 340px; }

  /* персонаж за карточкой — выглядывает сверху, увеличен */
  .me-figure {
    position: relative; width: 300px; margin: 0 auto -120px; z-index: 1;
    filter: drop-shadow(0 16px 26px rgba(40,30,70,0.3));
    pointer-events: none;
  }
  .me-figure img { width: 100%; display: block; user-select: none; }
  .me-eye {
    position: absolute; width: 34px; height: 34px; margin: -17px 0 0 -17px;
    display: flex; align-items: center; justify-content: center;
  }
  .me-patch {
    position: absolute; inset: 0; border-radius: 50%;
    background: radial-gradient(circle at 50% 45%, #4a1f72 0%, #4a1f72 42%, rgba(74,31,114,0.55) 64%, rgba(74,31,114,0) 100%);
  }
  .me-pupil {
    position: relative; z-index: 2; width: 16px; height: 16px; border-radius: 50%;
    background: radial-gradient(circle at 38% 30%, #4a4458 0%, #0c0810 72%);
    box-shadow: 1px -1px 0 0.5px rgba(255,255,255,0.78);
    transition: transform .1s ease-out;
  }
  .me-closed { position: relative; z-index: 2; width: 30px; height: 17px; overflow: visible; }
  .me-closed path { fill: none; stroke: #2a1240; stroke-width: 2.6; stroke-linecap: round; }

  /* карточка — компактная, холодное стекло, зелёный кант по периметру */
  .login3-card {
    position: relative; z-index: 2; text-align: center;
    padding: 74px 26px 26px;
    background: linear-gradient(160deg, rgba(245,251,250,0.7), rgba(228,241,237,0.62));
    border: 1.5px solid color-mix(in srgb, var(--accent) 40%, transparent);
    border-radius: 22px;
    box-shadow:
      0 24px 56px -26px rgba(20,60,48,0.38),
      0 1px 0 rgba(255,255,255,0.6) inset;
    backdrop-filter: blur(24px) saturate(150%); -webkit-backdrop-filter: blur(24px) saturate(150%);
  }
  .login3-title {
    font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 30px;
    letter-spacing: -0.025em; color: var(--ink); margin: 0 0 4px; line-height: 1.05;
  }
  .login3-title span { color: var(--accent); }
  .login3-sub { font-size: 13px; color: var(--ink-soft); margin: 0 0 1.4rem; }

  .login3-field { margin-bottom: 13px; text-align: left; }
  .login3-label {
    font-size: 10.5px; font-weight: 700; color: var(--ink-faint);
    text-transform: uppercase; letter-spacing: .07em; margin-bottom: 5px; display: block;
  }
  .login3-input {
    width: 100%; box-sizing: border-box; font-family: inherit; font-size: 15px; padding: 11px 14px;
    border-radius: 12px; color: var(--ink); background: rgba(255,255,255,0.66);
    border: 1px solid color-mix(in srgb, var(--accent) 16%, var(--glass-border));
    outline: none; transition: border-color .2s, box-shadow .2s, background .2s;
  }
  .login3-input::placeholder { color: var(--ink-faint); }
  .login3-input:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(15,107,77,0.12); background: rgba(255,255,255,0.88); }

  /* кнопка с медленной непрерывной волной шёлка */
  .login3-btn {
    position: relative; overflow: hidden; isolation: isolate;
    width: 100%; margin-top: 8px; font-family: inherit; font-size: 15px; font-weight: 600;
    padding: 13px; border-radius: 12px; border: none; cursor: pointer; color: #fff;
    background: linear-gradient(135deg, var(--accent-deep), #073828);
    box-shadow: 0 9px 22px -8px rgba(10,74,53,0.55); transition: transform .15s, box-shadow .25s;
  }
  .login3-btn span { position: relative; z-index: 2; }
  /* волна: широкий мягкий световой гребень, медленно и непрерывно идущий слева направо */
  .login3-btn::before {
    content: ""; position: absolute; inset: -50% -10%; z-index: 1; pointer-events: none;
    background: linear-gradient(105deg,
      transparent 38%,
      rgba(255,255,255,0.10) 46%,
      rgba(255,255,255,0.30) 50%,
      rgba(255,255,255,0.10) 54%,
      transparent 62%);
    background-size: 250% 100%; background-repeat: no-repeat;
    transform: translateX(0);
    animation: silkWave 4.5s linear infinite;
    opacity: .9;
  }
  @keyframes silkWave {
    0%   { background-position: 150% 0; }
    100% { background-position: -150% 0; }
  }
  .login3-btn:hover { transform: translateY(-1px); box-shadow: 0 13px 28px -8px rgba(10,74,53,0.65); }
  .login3-btn:hover::before { animation-duration: 2.6s; }
  .login3-btn:disabled { opacity: .65; cursor: default; transform: none; }

  .login3-error {
    background: rgba(192,82,74,0.1); color: #a8463d; border: 1px solid rgba(192,82,74,0.28);
    border-radius: 10px; padding: 9px 12px; font-size: 12.5px; margin-bottom: 12px; text-align: center;
  }
  .login3-info {
    background: rgba(42,155,115,0.1); color: var(--accent-deep); border: 1px solid rgba(42,155,115,0.28);
    border-radius: 10px; padding: 9px 12px; font-size: 12.5px; margin-bottom: 12px; text-align: center;
  }

  /* ── Admin-модалки и формы: стили потерялись при переходе на UI v6, восстановлены ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(20,40,32,0.45); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
    display: flex; align-items: flex-start; justify-content: center;
    padding: clamp(1rem, 4vh, 3rem) 1rem; overflow-y: auto;
  }
  .modal-overlay .modal {
    position: relative; max-width: 560px; margin: auto; padding: 26px 26px 22px;
    background: linear-gradient(160deg, rgba(247,252,251,0.96), rgba(233,243,239,0.94));
    border: 1px solid rgba(15,107,77,0.2); border-radius: 22px;
    backdrop-filter: blur(24px) saturate(150%); -webkit-backdrop-filter: blur(24px) saturate(150%);
    box-shadow: 0 24px 56px -20px rgba(10,74,53,0.4);
    overflow: visible;
  }
  .form-group { margin-bottom: 1.1rem; }
  .form-label {
    display: block; margin-bottom: 6px;
    font-size: 11px; font-weight: 700; color: var(--ink-faint);
    text-transform: uppercase; letter-spacing: .07em;
  }
  .form-input {
    width: 100%; padding: 10px 14px; box-sizing: border-box;
    border: 1.5px solid var(--line); border-radius: 10px;
    font-size: 14px; font-family: 'Manrope', sans-serif; color: var(--ink);
    background: rgba(255,255,255,0.8); outline: none; transition: border-color .2s;
  }
  .form-input:focus { border-color: var(--accent); }
  .form-textarea { min-height: 80px; resize: vertical; }
  .error-msg {
    background: rgba(192,82,74,0.1); color: #a8463d; border: 1px solid rgba(192,82,74,0.28);
    border-radius: 10px; padding: 9px 12px; font-size: 13px; margin-bottom: 12px;
  }
  .btn-ghost { background: rgba(255,255,255,0.55); border: 1px solid var(--line); color: var(--ink-soft); }
  .btn-ghost:hover { background: rgba(255,255,255,0.85); }
  .ing-add-row { display: flex; gap: 8px; align-items: center; padding: 2px 0; }
  .ing-remove {
    background: none; border: none; cursor: pointer;
    color: var(--ink-faint); font-size: 17px; padding: 0 4px;
  }
  .ing-remove:hover { color: var(--danger); }

  /* ── ссылки под формой входа/регистрации ── */
  .login3-links {
    margin-top: 14px; display: flex; flex-direction: column; gap: 7px;
    font-size: 13px; color: var(--ink-faint); text-align: center;
  }
  .login3-link {
    background: none; border: none; cursor: pointer; padding: 0;
    font-size: 13px; font-weight: 700; color: var(--accent);
  }
  .login3-link:hover { text-decoration: underline; }
  .login3-link-muted { font-weight: 600; color: var(--ink-faint); }

  /* ── регистрация: прогресс и списки возможностей ── */
  .reg-progress { display: flex; gap: 4px; margin-bottom: 18px; }
  .reg-progress-seg {
    flex: 1; height: 3px; border-radius: 2px; background: rgba(60,110,88,0.15);
    transition: background .3s;
  }
  .reg-progress-seg.on { background: var(--accent); }
  /* ── индикатор надёжности пароля ── */
  .pw-meter { margin: -4px 0 14px; text-align: left; }
  .pw-bar { display: flex; gap: 4px; margin-bottom: 6px; }
  .pw-seg { flex: 1; height: 5px; border-radius: 3px; transition: background .25s; }
  .pw-label { font-size: 12px; font-weight: 700; margin-bottom: 7px; }
  .pw-hints { display: flex; flex-wrap: wrap; gap: 5px 12px; list-style: none; padding: 0; margin: 0; }
  .pw-hints li { font-size: 11.5px; color: var(--ink-faint); position: relative; padding-left: 15px; }
  .pw-hints li::before { content: "○"; position: absolute; left: 0; }
  .pw-hints li.ok { color: var(--accent); }
  .pw-hints li.ok::before { content: "✓"; }
  .reg-perks {
    background: rgba(15,107,77,0.06); border: 1px solid rgba(15,107,77,0.14);
    border-radius: 12px; padding: 12px 14px; margin-bottom: 14px; text-align: left;
  }
  .reg-perks-head {
    font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 8px;
  }
  .reg-perks-pro { background: rgba(255,255,255,0.4); border-color: rgba(60,110,88,0.14); }
  .reg-perks-pro .reg-perks-head { color: var(--ink-faint); }
  .reg-perk {
    display: flex; align-items: center; gap: 9px;
    font-size: 13px; color: var(--ink-soft); margin-bottom: 6px;
  }
  .reg-perk:last-child { margin-bottom: 0; }
  .reg-perk-locked { color: var(--ink-faint); opacity: .75; }
  .reg-perk-dot { width: 5px; height: 5px; border-radius: 2px; background: var(--accent); flex-shrink: 0; }
  .reg-perk-check {
    width: 16px; height: 16px; border-radius: 5px; background: var(--accent); color: #fff;
    font-size: 9px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .reg-perk-lock {
    width: 16px; height: 16px; border-radius: 5px; border: 1.5px solid rgba(60,110,88,0.25);
    font-size: 9px; color: var(--ink-faint); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .reg-code-input { font-size: 22px; letter-spacing: .35em; text-align: center; font-weight: 700; }
  /* регистрация поверх лендинга: фон лендинга блюрится, своя заливка экрана убирается */
  .reg-overlay {
    position: fixed; inset: 0; z-index: 400; overflow-y: auto;
    background: rgba(238,242,239,0.55);
    backdrop-filter: blur(16px) saturate(120%); -webkit-backdrop-filter: blur(16px) saturate(120%);
  }
  .reg-overlay .login3-wrap { background: none; min-height: 100vh; }
  .reg-btn-outline {
    width: 100%; margin-top: 9px; padding: 12px; border-radius: 12px; cursor: pointer;
    background: transparent; color: var(--accent); border: 1.5px solid var(--accent);
    font-weight: 600; font-size: 14px;
  }
  .reg-btn-outline:hover { background: rgba(15,107,77,0.06); }

  /* ── модал покупки и тост ── */
  .purchase-head {
    background: linear-gradient(135deg, rgba(10,74,53,0.92), rgba(15,107,77,0.95));
    border-radius: 16px; padding: 20px 22px; margin-bottom: 18px;
  }
  .purchase-head-label {
    font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.55);
    letter-spacing: .1em; text-transform: uppercase; margin-bottom: 7px;
  }
  .purchase-head-price {
    font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #fff;
  }
  .purchase-head-price span { font-size: 15px; font-weight: 500; opacity: .6; }
  .purchase-note { margin-top: 11px; text-align: center; font-size: 12px; color: var(--ink-faint); }
  .purchase-toast {
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    z-index: 600; background: #0a4a35; color: #fff; font-weight: 600; font-size: 14px;
    padding: 14px 28px; border-radius: 14px; box-shadow: 0 8px 28px rgba(10,74,53,0.4);
    white-space: nowrap;
  }

  /* ── юридические согласия (регистрация, оплата) ── */
  .reg-consents { display: flex; flex-direction: column; gap: 9px; margin-bottom: 14px; text-align: left; }
  .reg-consent {
    display: flex; align-items: flex-start; gap: 9px; cursor: pointer;
    font-size: 12px; color: var(--ink-soft); line-height: 1.5; user-select: none;
  }
  .reg-consent input {
    appearance: none; -webkit-appearance: none; flex-shrink: 0; margin-top: 1px;
    width: 17px; height: 17px; border-radius: 5px; cursor: pointer; position: relative;
    border: 1.5px solid color-mix(in srgb, var(--accent) 45%, transparent);
    background: rgba(255,255,255,0.7); transition: background .15s, border-color .15s;
  }
  .reg-consent input:checked { background: var(--accent); border-color: var(--accent); }
  .reg-consent input:checked::after {
    content: ""; position: absolute; left: 4.5px; top: 1px; width: 4.5px; height: 8.5px;
    border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg);
  }
  .reg-consent-link { color: var(--accent); font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
  .req-star { color: #c0584f; font-weight: 700; margin-left: 2px; }
  .reg-req-note { font-size: 11.5px; color: var(--ink-faint); margin: 2px 0 12px; }
  .reg-req-note .req-star { margin-right: 3px; }

  /* ── плашка cookie ── */
  .cookie-bar {
    position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
    z-index: 700; width: min(720px, calc(100vw - 28px));
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    padding: 14px 18px; border-radius: 16px;
    background: rgba(247,252,251,0.94); border: 1px solid rgba(15,107,77,0.22);
    backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%);
    box-shadow: 0 16px 44px -14px rgba(10,74,53,0.4);
  }
  .cookie-text { flex: 1 1 320px; font-size: 12px; color: var(--ink-soft); line-height: 1.55; }
  .cookie-agree { white-space: nowrap; font-weight: 600; }
  .cookie-bar .btn:disabled { opacity: .55; cursor: default; }

  /* ── «Добавить на экран Домой» (iOS) ── */
  .a2hs-overlay { position: fixed; inset: 0; z-index: 800; display: flex; align-items: flex-end; justify-content: center;
    background: rgba(10,30,22,0.42); backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px); }
  .a2hs-sheet { width: 100%; max-width: 480px; background: rgba(252,254,253,0.99); position: relative;
    border-radius: 22px 22px 0 0; padding: 22px 20px calc(20px + env(safe-area-inset-bottom));
    box-shadow: 0 -16px 50px rgba(10,50,38,0.3); animation: a2hsUp .32s cubic-bezier(.23,1,.32,1); }
  @keyframes a2hsUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .a2hs-close { position: absolute; top: 14px; right: 14px; width: 30px; height: 30px; border-radius: 50%; border: none;
    background: rgba(0,0,0,0.05); color: var(--ink-soft); font-size: 14px; cursor: pointer; }
  .a2hs-head { display: flex; gap: 14px; align-items: center; margin-bottom: 16px; padding-right: 30px; }
  .a2hs-icon { width: 52px; height: 52px; border-radius: 13px; flex-shrink: 0; box-shadow: 0 4px 14px rgba(15,107,77,0.25); }
  .a2hs-title { font-family: 'Familjen Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: var(--ink); letter-spacing: -0.02em; line-height: 1.2; }
  .a2hs-sub { font-size: 13px; color: var(--ink-faint); margin-top: 4px; line-height: 1.45; }
  .a2hs-benefits { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
  .a2hs-benefits li { font-size: 13.5px; color: var(--ink-soft); padding-left: 24px; position: relative; }
  .a2hs-benefits li::before { content: "✓"; position: absolute; left: 2px; color: var(--accent); font-weight: 800; }
  .a2hs-steps { background: color-mix(in srgb, var(--accent) 7%, transparent); border: 1px solid var(--glass-border);
    border-radius: 14px; padding: 14px 16px; display: flex; flex-direction: column; gap: 11px; margin-bottom: 16px; }
  .a2hs-step { font-size: 13.5px; color: var(--ink); line-height: 1.45; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .a2hs-n { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); color: #fff;
    font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }
  .a2hs-ok { width: 100%; padding: 13px; border-radius: 13px; border: none; cursor: pointer;
    background: var(--accent-deep); color: #fff; font-family: inherit; font-weight: 700; font-size: 14.5px; }
  .a2hs-ok:hover { background: var(--accent); }

  /* ════════ Мобильная версия ════════ */
  /* нижняя навигация — только на мобайле */
  .bottom-nav { display: none; }
  @media (max-width: 600px) {
    /* шапка: убираем приветствие, разрешаем перенос кнопок, компактные отступы */
    .topbar { height: auto; min-height: 54px; padding-top: 8px; padding-bottom: 8px; flex-wrap: wrap; gap: 10px; }
    .topbar-user { display: none; }
    .brand-text span { display: none; }
    .brand-text b { font-size: 17px; }
    .topbar-actions { gap: 6px; flex-wrap: wrap; justify-content: flex-end; row-gap: 6px; }
    .topbar-actions .btn-sm { padding: 7px 11px; }
    /* верхние вкладки прячем — вместо них нижняя навигация */
    .tabs-bar { display: none; }
    /* контент не должен прятаться за нижней навигацией */
    .main { padding-bottom: 84px; }
    /* ── нижняя навигация (bottom nav) ── */
    .bottom-nav {
      display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 150;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(20px) saturate(150%); -webkit-backdrop-filter: blur(20px) saturate(150%);
      border-top: 1px solid var(--glass-border);
      box-shadow: 0 -6px 24px rgba(15,75,55,0.08);
      padding: 6px 4px calc(6px + env(safe-area-inset-bottom));
    }
    .bn-item { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 3px;
      background: none; border: none; cursor: pointer; padding: 5px 2px; color: var(--ink-faint); font-family: inherit; }
    .bn-item.active { color: var(--accent); }
    .bn-ic { position: relative; display: inline-flex; width: 24px; height: 24px; align-items: center; justify-content: center; }
    .bn-ic svg { width: 24px; height: 24px; }
    .bn-label { font-size: 10.5px; font-weight: 600; letter-spacing: -0.01em; }
    .bn-badge { position: absolute; top: -5px; right: -7px; min-width: 15px; height: 15px; padding: 0 3px;
      border-radius: 100px; background: var(--accent); color: #fff; font-size: 9px; font-weight: 800;
      display: flex; align-items: center; justify-content: center; line-height: 1; }
    /* кабинет/настройки: топбар компактнее */
    .lk-topbar { gap: 8px; padding: 11px 16px; }
    .lk-topbar-title { font-size: 15px; }
    .lk-back, .lk-top-logout { padding: 7px 12px; font-size: 13px; }
  }
  @media (max-width: 380px) {
    .brand-mark { display: none; }
  }

`,Pe=[`крем`,`сыворотк`,`spf`,`тонер`,`эмульс`,`умыван`],Fe=e=>Pe.some(t=>(e||``).toLowerCase().includes(t)),Ie=e=>e==null?null:e<700?`бюджетно`:e<1500?`средняя`:`высокая`;function Le(e){let t=e.ingredients||null,n=t?.ingredient_groups||[],r=n.find(e=>e.is_primary)||n[0]||{},i=t?.oils_meta,a=Array.isArray(i)?i[0]:i;return{id:e.id,position:e.position,matched:!!t,ing:{inci_name:t?.inci_name||e.raw_inci_name||``,ru_name:t?.ru_name||null,description:t?.description||null,is_eu_allergen:!!t?.is_eu_allergen,group:r.group||null,subgroup:r.subgroup||null,subgroup2:r.subgroup2||null,oil:a?{comedogenicity:a.comedogenicity,penetration:a.penetration,fatty_acids:a.fatty_acids}:null}}}function Re(e,t){return{...e,price_tier:Ie(e.price_rub),is_face:Fe(e.product_type),ingredients:t?t.map(Le):[]}}var ze=`*,ingredients(id,inci_name,ru_name,description,is_eu_allergen,ingredient_groups(group,subgroup,subgroup2,is_primary),oils_meta(penetration,fatty_acids,comedogenicity))`;function Be(){let[e,t]=(0,a.useState)(!1),[n,r]=(0,a.useState)(!1),[i,o]=(0,a.useState)(`landing`),[s,c]=(0,a.useState)(!1),[l,d]=(0,a.useState)(!1),f=()=>{c(!1),d(!0),setTimeout(()=>d(!1),3e3)},[p,m]=(0,a.useState)(`products`),[h,g]=(0,a.useState)([]),[_,v]=(0,a.useState)([]),[y,b]=(0,a.useState)({}),[x,S]=(0,a.useState)({}),[C,w]=(0,a.useState)(!1),[T,E]=(0,a.useState)(``),[D,O]=(0,a.useState)(``),[k,A]=(0,a.useState)(null),[j,M]=(0,a.useState)(null),[N,P]=(0,a.useState)(!1),[F,te]=(0,a.useState)(!1),[I,L]=(0,a.useState)({type:``,typeSel:null,fn:``,scalp:``,wash:``,price:``,flags:{}}),[R,z]=(0,a.useState)(`recommend`),[B,V]=(0,a.useState)(!1),[re,oe]=(0,a.useState)(``),[ce,le]=(0,a.useState)(!1),[ue,pe]=(0,a.useState)(!1),[he,ge]=(0,a.useState)(null),[_e,W]=(0,a.useState)({search:0,analysis:0}),[ye,G]=(0,a.useState)(!1),[Ce,K]=(0,a.useState)(()=>{try{return JSON.parse(localStorage.getItem(`bh_viewed`)||`[]`)}catch{return[]}}),we=e=>K(t=>{let n=[{id:e.id,name:e.name,brand:e.brand||null,image_url:e.image_url||null,product_type:e.product_type||null},...t.filter(t=>t.id!==e.id)].slice(0,24);try{localStorage.setItem(`bh_viewed`,JSON.stringify(n))}catch{}return n}),[q,J]=(0,a.useState)(null),Ee=e=>{Se(e),W(t=>({...t,[e]:(t[e]||0)+1}))},Y=e=>!H()&&(_e[e]||0)>=ae[e],[X,Oe]=(0,a.useState)(!1),[Z,ke]=(0,a.useState)([]),[Ae,je]=(0,a.useState)(``),Me=e=>{ke(t=>{if(t.some(t=>t.id===e.id))return t;let n=t[0]?.product_type;if(t.length&&n&&e.product_type&&e.product_type!==n)return je(`В сравнении уже «${n}» — добавлять можно средства той же категории.`),t;let r=se();return t.length>=r?(H()?je(`Добавлено максимальное количество средств для сравнения`):J(`compare`),t):(je(``),rt&&rt(e).catch(()=>{}),[...t,e])})},Pe=e=>ke(t=>t.filter(t=>t.id!==e)),Be=()=>{ke([]),je(``)},Ve=()=>{M(null),A(null),m(`compare`)};(0,a.useEffect)(()=>{ve().then(e=>{t(e),r(!0)})},[]),(0,a.useEffect)(()=>{let e=e=>{if(e.key===`Escape`){if(j)return M(null);if(k)return A(null);if(N)return P(!1);if(F)return te(!1);if(q)return J(null);if(s)return c(!1);if(ue)return pe(!1);if(ye)return G(!1);if(i!==`landing`)return o(`landing`)}};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[j,k,N,F,q,s,ue,ye,i]),(0,a.useEffect)(()=>{e&&(zt(),be().then(e=>ge(e)),xe().then(W))},[e]);let We=(0,a.useRef)(!1);(0,a.useEffect)(()=>{if(!n||We.current)return;let e=new URLSearchParams(window.location.search),t=e.get(`payment`);if(!t)return;We.current=!0,e.delete(`payment`);let r=window.location.pathname+(e.toString()?`?${e}`:``)+window.location.hash;if(window.history.replaceState({},``,r),t!==`success`)return;d(!0),setTimeout(()=>d(!1),5e3);let i=0,a=()=>be().then(e=>{ge(e),!H()&&++i<5&&setTimeout(a,2e3)});a()},[n]);let Ge=(0,a.useRef)(``);(0,a.useEffect)(()=>{let t=D.trim().toLowerCase();if(!e||t.length<2||t===Ge.current)return;let n=setTimeout(()=>{if(Y(`search`)){J(`search`),O(``);return}Ge.current=t,Ee(`search`)},700);return()=>clearTimeout(n)},[D,e]);let Ke=(0,a.useCallback)(async()=>{w(!0),E(``);let e=`/products?select=*,notes&order=name.asc`;try{let{rows:t,total:n}=await fe(e,60);g(t.map(e=>Re(e,null))),w(!1),n>t.length&&de(e,t.length).then(e=>{e.length&&g(t=>[...t,...e.map(e=>Re(e,null))])}).catch(()=>{})}catch(e){E(`Ошибка загрузки средств: `+e.message),w(!1)}},[]),qe=e=>{let t=e.ingredient_groups||[],n=t.find(e=>e.is_primary)||t[0]||null;return{id:e.id,inci_name:e.inci_name,ru_name:e.ru_name,aliases:e.aliases,description:e.description,is_eu_allergen:!!e.is_eu_allergen,group:n?.group||null,subgroup:n?.subgroup||null,subgroup2:n?.subgroup2||null,allGroups:t}},Xe=(0,a.useCallback)(async()=>{w(!0),E(``);let e=`/ingredients?select=id,inci_name,ru_name,aliases,description,is_eu_allergen,ingredient_groups(group,subgroup,subgroup2,is_primary)&order=inci_name.asc`;try{let{rows:t,total:n}=await fe(e,90);v(t.map(qe)),w(!1),n>t.length&&de(e,t.length).then(e=>{e.length&&v(t=>[...t,...e.map(qe)])}).catch(()=>{})}catch(e){E(`Ошибка загрузки ингредиентов: `+e.message),w(!1)}},[]),Qe=(0,a.useCallback)(async(e,t)=>{await U(`/ingredients?id=eq.${e}`,{method:`PATCH`,body:JSON.stringify(t)}),v(n=>n.map(n=>n.id===e?{...n,...t}:n))},[]),et=(0,a.useCallback)(async()=>{try{let e=await U(`/subgroups?select=group,subgroup,subgroup2,description`),t={};for(let n of e)n.group&&n.subgroup&&n.subgroup2&&(t[`${n.group}::${n.subgroup}::${n.subgroup2}`]=n.description),n.group&&n.subgroup&&(t[`${n.group}::${n.subgroup}`]=n.description),n.group&&!n.subgroup&&(t[n.group]=n.description);b(t)}catch{}},[]);(0,a.useEffect)(()=>{e&&(p===`products`&&Ke(),(p===`ingredients`||_.length===0)&&Xe(),Object.keys(y).length===0&&et())},[p,e]);let tt=(0,a.useRef)(!1),nt=async e=>{if(we(e),x[e.id]){A({...e,price_tier:Ie(e.price_rub),is_face:Fe(e.product_type),ingredients:x[e.id]});return}try{let t=(await U(`/product_ingredients?product_id=eq.${e.id}&select=${encodeURIComponent(ze)}&order=position.asc`)).map(Le);S(n=>({...n,[e.id]:t})),A({...e,price_tier:Ie(e.price_rub),is_face:Fe(e.product_type),ingredients:t})}catch{A({...e,ingredients:[]})}},rt=(0,a.useCallback)(async e=>{if(!(!e||x[e.id]))try{let t=await U(`/product_ingredients?product_id=eq.${e.id}&select=${encodeURIComponent(ze)}&order=position.asc`);S(n=>({...n,[e.id]:t.map(Le)}))}catch{}},[x]),ot=(0,a.useCallback)(async e=>{let t=h.map(e=>e.id).filter(e=>!x[e]),n={};for(let r=0;r<t.length;r+=40){let i=await U(`/product_ingredients?product_id=in.(${t.slice(r,r+40).join(`,`)})&select=product_id,${encodeURIComponent(ze)}&order=position.asc`);for(let e of i)(n[e.product_id]=n[e.product_id]||[]).push(Le(e));e&&e(Math.min(r+40,t.length),t.length)}return S(e=>({...e,...n})),h.map(e=>({...e,price_tier:Ie(e.price_rub),is_face:Fe(e.product_type),ingredients:x[e.id]||n[e.id]||[]}))},[h,x]);(0,a.useEffect)(()=>{!e||tt.current||h.length&&(tt.current=!0,ot().catch(()=>{tt.current=!1}))},[e,h,ot]);let st=e=>{let t=(e.skin_type||``).toLowerCase(),n=[];return t.includes(`жирн`)&&n.push(`жирный`),t.includes(`норм`)&&n.push(`нормальный`),t.includes(`сух`)&&n.push(`сухой`),n},ct={жирный:`жирнится за 1–2 дня`,нормальный:`жирнится за 2–4 дня`,сухой:`жирнится за 5–7 дней`},lt={moisture:`Увлажнение`,nutrition:`Питание`,repair:`Восстановление`,protection:`Защита`},ut=[{id:`noAllergen`,label:`Без аллергенов`,status:`live`,test:e=>x[e.id]?!x[e.id].some(e=>e.ing.is_eu_allergen):!0},{id:`curls`,label:`Подходит кудряшкам`,status:`live`,test:e=>e.attr_curls===!0},{id:`sensitive`,label:`Чувствительная кожа`,status:`live`,test:e=>e.attr_sensitive===!0||(e.skin_type||``).toLowerCase().includes(`чувств`)},{id:`dandruff`,label:`Против перхоти`,status:`soon`,test:()=>!0},{id:`blonde`,label:`Для блонда`,status:`soon`,test:()=>!0},{id:`hairloss`,label:`При выпадении`,status:`soon`,test:()=>!0}],ft=(0,a.useMemo)(()=>({types:[...new Set(h.map(e=>e.product_type).filter(Boolean))].sort(),washes:[...new Set(h.filter(e=>(e.product_type||``).toLowerCase().includes(`шампунь`)).map(e=>e.analytical_type).filter(Boolean))].sort(),prices:[`бюджетно`,`средняя`,`высокая`].filter(e=>h.some(t=>t.price_tier===e))}),[h]),pt=(I.type||``).toLowerCase(),mt=pt.includes(`шампунь`),ht=!!pt.match(/маск|кондиционер/),gt=ht,_t=mt,vt=mt,yt=ut.filter(e=>e.id===`curls`?ht||mt:!0),Q=(()=>{let e=D.toLowerCase().trim(),t=e=>{if(I.typeSel){let{sheet:t,types:n}=I.typeSel;if(t&&e.source_sheet!==t||!n.includes(e.product_type))return!1}if(I.price&&e.price_tier!==I.price||I.wash&&e.analytical_type!==I.wash||I.scalp&&!st(e).includes(I.scalp))return!1;if(I.fn){let t=e[`attr_`+I.fn];if(t!==`full`&&t!==`some`&&t!==!0)return!1}for(let t of ut)if(I.flags[t.id]&&t.status===`live`&&!t.test(e))return!1;return!0},n=h.filter(n=>(!e||n.name?.toLowerCase().includes(e)||n.brand?.toLowerCase().includes(e))&&t(n));!n.length&&e.length>=4&&(n=h.filter(n=>(De(n.name,e)||De(n.brand,e))&&t(n)));let r=(e,t)=>(e.name||``).localeCompare(t.name||``,`ru`),i=e=>{let t=(e.notes||``).toLowerCase();return t.includes(`рекомендов`)||t.includes(`супер состав`)},a=e=>{let t=x[e.id];return t?!t.some(e=>e.ing.is_eu_allergen||e.ing.is_avoid):!1},o=[...n];return R===`recommend`?o.sort((e,t)=>{let n=i(e)?0:a(e)?1:2,o=i(t)?0:a(t)?1:2;return n===o?r(e,t):n-o}):R===`price`?o.sort((e,t)=>(e.price_rub??1/0)-(t.price_rub??1/0)||r(e,t)):R===`name`?o.sort(r):R===`type`?o.sort((e,t)=>(e.product_type||`я`).localeCompare(t.product_type||`я`,`ru`)||r(e,t)):R===`brand`?o.sort((e,t)=>(e.brand||`я`).localeCompare(t.brand||`я`,`ru`)||r(e,t)):o.sort((e,t)=>{let n=e.created_at?Date.parse(e.created_at):0;return(t.created_at?Date.parse(t.created_at):0)-n||t.id-e.id}),o})(),$=[I.type,I.fn,I.price,I.scalp,I.wash].filter(Boolean).length+Object.values(I.flags).filter(Boolean).length,bt=()=>L({type:``,typeSel:null,fn:``,scalp:``,wash:``,price:``,flags:{}}),xt=e=>L(t=>({...t,flags:{...t.flags,[e]:!t.flags[e]}})),St=e=>L(t=>{let n=e&&e.types?.length?e:null,r=(n?.label||``).toLowerCase(),i=r.includes(`шампунь`),a=!!r.match(/маск|кондиционер/);return{...t,type:n?.label||``,typeSel:n,fn:!n||a?t.fn:``,scalp:!n||i?t.scalp:``,wash:!n||i?t.wash:``}});ft.types;let Ct=(0,u.jsxs)(u.Fragment,{children:[gt&&(0,u.jsxs)(`div`,{className:`filter-field`,children:[(0,u.jsx)(`label`,{children:`Функция`}),(0,u.jsxs)(`select`,{value:I.fn,onChange:e=>L(t=>({...t,fn:e.target.value})),children:[(0,u.jsx)(`option`,{value:``,children:`Любая`}),Object.entries(lt).map(([e,t])=>(0,u.jsx)(`option`,{value:e,children:t},e))]})]}),_t&&(0,u.jsxs)(`div`,{className:`filter-field`,children:[(0,u.jsx)(`label`,{children:`Тип кожи головы`}),(0,u.jsxs)(`select`,{value:I.scalp,onChange:e=>L(t=>({...t,scalp:e.target.value})),children:[(0,u.jsx)(`option`,{value:``,children:`Любой`}),Object.entries(ct).map(([e,t])=>(0,u.jsxs)(`option`,{value:e,style:{textTransform:`capitalize`},children:[e,` · `,t]},e))]})]}),vt&&ft.washes.length>0&&(0,u.jsxs)(`div`,{className:`filter-field`,children:[(0,u.jsxs)(`label`,{children:[`Промывающая способность `,(0,u.jsx)(`span`,{className:`field-hint`,children:`для продвинутых`})]}),(0,u.jsxs)(`select`,{value:I.wash,onChange:e=>L(t=>({...t,wash:e.target.value})),children:[(0,u.jsx)(`option`,{value:``,children:`Любая`}),ft.washes.map(e=>(0,u.jsx)(`option`,{value:e,children:e},e))]})]}),(0,u.jsxs)(`div`,{className:`filter-field`,children:[(0,u.jsx)(`label`,{children:`Ценовая категория`}),(0,u.jsxs)(`select`,{value:I.price,onChange:e=>L(t=>({...t,price:e.target.value})),children:[(0,u.jsx)(`option`,{value:``,children:`Любая`}),(0,u.jsx)(`option`,{value:`бюджетно`,children:`Бюджетно`}),(0,u.jsx)(`option`,{value:`средняя`,children:`Средняя`}),(0,u.jsx)(`option`,{value:`высокая`,children:`Высокая`})]})]}),(0,u.jsx)(`div`,{className:`filter-checks`,children:yt.map(e=>(0,u.jsxs)(`label`,{className:`filter-check ${e.status===`soon`?`soon`:``}`,title:e.status===`soon`?`В плане реализации`:``,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:!!I.flags[e.id],onChange:()=>xt(e.id)}),(0,u.jsxs)(`span`,{children:[e.label,e.status===`soon`&&(0,u.jsx)(`em`,{className:`soon-tag`,children:`скоро`})]})]},e.id))})]});return n?e?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`style`,{children:Ne}),s&&(0,u.jsx)(qt,{onClose:()=>c(!1),onSuccess:f}),l&&(0,u.jsx)(`div`,{className:`purchase-toast`,children:`Подписка оформлена`}),ye&&(0,u.jsx)(Ut,{profile:he,usage:_e,pro:H(),viewed:Ce,onOpenProduct:e=>{G(!1),nt(e)},onOpenSettings:()=>pe(!0),onClose:()=>G(!1),onSubscribe:()=>{G(!1),c(!0)},onLogout:()=>{me(),t(!1),G(!1),o(`landing`),c(!1)}}),ue&&(0,u.jsx)(Gt,{onClose:()=>pe(!1),onLogout:()=>{me(),t(!1),pe(!1),G(!1),o(`landing`),c(!1)}}),q&&(0,u.jsx)(Ht,{reason:q,onClose:()=>J(null),onSubscribe:()=>{J(null),c(!0)}}),(0,u.jsx)(Rt,{}),(0,u.jsx)(Kt,{}),(0,u.jsxs)(`div`,{className:`app`,children:[(0,u.jsx)(At,{}),(0,u.jsxs)(`div`,{className:`topbar`,children:[(0,u.jsx)(`div`,{className:`topbar-aurora`,"aria-hidden":`true`}),(0,u.jsx)(`div`,{className:`topbar-veil`,"aria-hidden":`true`}),(0,u.jsxs)(`div`,{className:`brand`,children:[(0,u.jsx)(`div`,{className:`brand-mark`,children:(0,u.jsxs)(`svg`,{width:`40`,height:`44`,viewBox:`0 0 40 44`,fill:`none`,"aria-hidden":`true`,children:[(0,u.jsxs)(`defs`,{children:[(0,u.jsxs)(`linearGradient`,{id:`flask-glass`,x1:`0`,y1:`0`,x2:`1`,y2:`0.3`,children:[(0,u.jsx)(`stop`,{offset:`0`,stopColor:`#1d8f66`}),(0,u.jsx)(`stop`,{offset:`0.35`,stopColor:`#0f6b4d`}),(0,u.jsx)(`stop`,{offset:`0.65`,stopColor:`#0a5a40`}),(0,u.jsx)(`stop`,{offset:`1`,stopColor:`#063a2a`})]}),(0,u.jsxs)(`radialGradient`,{id:`flask-sheen`,cx:`0.32`,cy:`0.28`,r:`0.8`,children:[(0,u.jsx)(`stop`,{offset:`0`,stopColor:`#7fe3bb`,stopOpacity:`0.9`}),(0,u.jsx)(`stop`,{offset:`0.4`,stopColor:`#2ea579`,stopOpacity:`0.15`}),(0,u.jsx)(`stop`,{offset:`1`,stopColor:`#063a2a`,stopOpacity:`0`})]}),(0,u.jsxs)(`linearGradient`,{id:`flask-liquid`,x1:`0`,y1:`0`,x2:`0.2`,y2:`1`,children:[(0,u.jsx)(`stop`,{offset:`0`,stopColor:`#74e0b4`}),(0,u.jsx)(`stop`,{offset:`1`,stopColor:`#1d9e72`})]}),(0,u.jsx)(`clipPath`,{id:`flask-clip`,children:(0,u.jsx)(`path`,{d:`M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z`})})]}),(0,u.jsx)(`g`,{className:`flask-drop`,children:(0,u.jsx)(`rect`,{x:`18.2`,y:`0`,width:`3.6`,height:`3.6`,rx:`1`,fill:`#f0a98f`})}),(0,u.jsx)(`g`,{className:`flask-drop d2`,children:(0,u.jsx)(`circle`,{cx:`20`,cy:`0`,r:`2`,fill:`#b98fd6`})}),(0,u.jsx)(`g`,{className:`flask-drop d3`,children:(0,u.jsx)(`rect`,{x:`18.5`,y:`0`,width:`3`,height:`3`,rx:`1.5`,fill:`#6fa8d8`})}),(0,u.jsxs)(`g`,{className:`flask-body`,children:[(0,u.jsx)(`path`,{d:`M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z`,fill:`url(#flask-glass)`,stroke:`#052e20`,strokeWidth:`1`,strokeLinejoin:`round`}),(0,u.jsxs)(`g`,{clipPath:`url(#flask-clip)`,children:[(0,u.jsx)(`path`,{d:`M7 33 Q5 37 4 40 a7 7 0 0 0 6 7 h20 a7 7 0 0 0 6 -7 Q35 37 33 33 Z`,fill:`url(#flask-liquid)`,opacity:`0.95`}),(0,u.jsx)(`path`,{d:`M7 33 Q13 30 20 33 Q27 36 33 33`,stroke:`#8fe9c4`,strokeWidth:`1.5`,fill:`none`,opacity:`0.8`}),(0,u.jsx)(`circle`,{className:`flask-bub`,cx:`13`,cy:`41`,r:`1.6`,fill:`rgba(255,255,255,0.88)`}),(0,u.jsx)(`circle`,{className:`flask-bub b2`,cx:`21`,cy:`43`,r:`1.1`,fill:`rgba(255,255,255,0.78)`}),(0,u.jsx)(`circle`,{className:`flask-bub b3`,cx:`17`,cy:`42`,r:`1.4`,fill:`rgba(255,255,255,0.82)`}),(0,u.jsx)(`circle`,{className:`flask-bub b4`,cx:`26`,cy:`44`,r:`0.9`,fill:`rgba(255,255,255,0.72)`}),(0,u.jsx)(`circle`,{className:`flask-bub`,cx:`19`,cy:`45`,r:`1.2`,fill:`rgba(255,255,255,0.75)`,style:{animationDelay:`0.9s`}}),(0,u.jsx)(`circle`,{className:`flask-bub b2`,cx:`24`,cy:`40`,r:`0.8`,fill:`rgba(255,255,255,0.65)`,style:{animationDelay:`1.4s`}})]}),(0,u.jsx)(`path`,{d:`M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z`,fill:`url(#flask-sheen)`}),(0,u.jsx)(`g`,{clipPath:`url(#flask-clip)`,children:(0,u.jsx)(`rect`,{className:`flask-shade`,x:`26`,y:`2`,width:`14`,height:`48`,fill:`#042319`})}),(0,u.jsx)(`path`,{d:`M17.5 8 v8 l-4.5 8`,stroke:`rgba(255,255,255,0.6)`,strokeWidth:`1.3`,strokeLinecap:`round`,fill:`none`}),(0,u.jsx)(`line`,{x1:`12.5`,y1:`5`,x2:`27.5`,y2:`5`,stroke:`#052e20`,strokeWidth:`2.6`,strokeLinecap:`round`}),(0,u.jsx)(`line`,{x1:`13`,y1:`4.3`,x2:`27`,y2:`4.3`,stroke:`rgba(255,255,255,0.5)`,strokeWidth:`1`,strokeLinecap:`round`})]})]})}),(0,u.jsxs)(`div`,{className:`brand-text`,children:[(0,u.jsx)(`strong`,{children:`beauty helper`}),(0,u.jsx)(`span`,{children:`косметическая база · анализ составов`})]})]}),(0,u.jsxs)(`div`,{className:`topbar-actions`,children:[ne()&&(0,u.jsxs)(`span`,{className:`topbar-user`,children:[`Привет, `,ne()]}),ie()&&(0,u.jsx)(`button`,{className:`btn btn-sm ${X?`btn-primary`:`btn-glass`}`,onClick:()=>Oe(e=>!e),children:X?`✓ Режим редактора`:`Режим редактора`}),ie()&&X&&p===`products`&&(0,u.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>P(!0),children:`+ Средство`}),ie()&&X&&p===`ingredients`&&(0,u.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>te(!0),children:`+ Ингредиент`}),ie()&&X&&(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:()=>le(e=>!e),title:`API-ключ remove.bg`,children:`🔑`}),(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:()=>pe(!0),title:`Настройки`,children:`⚙`}),(0,u.jsxs)(`button`,{className:`btn btn-glass btn-sm profile-btn`,onClick:()=>G(!0),title:`Личный кабинет`,children:[(0,u.jsx)(`span`,{className:`profile-ava`,children:(ne()?.[0]||`Я`).toUpperCase()}),(0,u.jsx)(`span`,{className:`tariff-pill ${H()?`pro`:``}`,children:H()?`PRO`:`FREE`})]}),(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:()=>{me(),t(!1),o(`landing`),c(!1)},children:`Выйти`})]})]}),ce&&(0,u.jsxs)(`div`,{style:{background:`rgba(20,40,32,0.9)`,padding:`12px 2rem`,display:`flex`,alignItems:`center`,gap:12,flexWrap:`wrap`},children:[(0,u.jsx)(`span`,{style:{fontSize:12,color:`#cbd8cf`,flexShrink:0},children:`API-ключ remove.bg:`}),(0,u.jsx)(`input`,{type:`password`,value:re,onChange:e=>oe(e.target.value),placeholder:`Вставьте ключ — он нигде не сохраняется`,style:{flex:1,minWidth:260,padding:`7px 12px`,borderRadius:8,border:`1px solid #3a5a4a`,background:`#0f231a`,color:`#eef2ef`,fontSize:13,fontFamily:`monospace`,outline:`none`}}),re&&(0,u.jsx)(`span`,{style:{fontSize:12,color:`#7fcaa0`},children:`✓ Ключ введён`})]}),(0,u.jsx)(`div`,{className:`tabs-bar`,children:(0,u.jsxs)(`div`,{className:`tabs`,children:[(0,u.jsx)(`button`,{className:`tab ${p===`products`?`active`:``}`,onClick:()=>{m(`products`),O(``)},children:`Средства`}),(0,u.jsx)(`button`,{className:`tab ${p===`ingredients`?`active`:``}`,onClick:()=>{m(`ingredients`),O(``)},children:`Ингредиенты`}),(0,u.jsx)(`button`,{className:`tab ${p===`similar`?`active`:``}`,onClick:()=>{m(`similar`),O(``)},children:`Аналоги`}),(0,u.jsx)(`button`,{className:`tab ${p===`compare`?`active`:``}`,onClick:()=>{m(`compare`),O(``)},children:`Сравнение`})]})}),(0,u.jsx)(`nav`,{className:`bottom-nav`,children:[{k:`products`,label:`Средства`,icon:(0,u.jsx)(`path`,{d:`M9 3h6M10 3v3.2L7.6 9.6A3.6 3.6 0 0 0 7 11.7V18a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-6.3a3.6 3.6 0 0 0-.6-2.1L14 6.2V3M7.2 14h9.6`})},{k:`ingredients`,label:`Ингредиенты`,icon:(0,u.jsx)(`path`,{d:`M12 3s6 6.5 6 10.5a6 6 0 1 1-12 0C6 9.5 12 3 12 3z`})},{k:`similar`,label:`Аналоги`,icon:(0,u.jsx)(`path`,{d:`M4 8h10l-2.4-2.4M4 8l2.4 2.4M20 16H10l2.4 2.4M20 16l-2.4-2.4`})},{k:`compare`,label:`Сравнение`,icon:(0,u.jsx)(`path`,{d:`M6 20V10M12 20V4M18 20v-7`}),badge:Z.length}].map(e=>(0,u.jsxs)(`button`,{className:`bn-item ${p===e.k?`active`:``}`,onClick:()=>{m(e.k),O(``),window.scrollTo({top:0})},children:[(0,u.jsxs)(`span`,{className:`bn-ic`,children:[(0,u.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,strokeLinejoin:`round`,children:e.icon}),e.badge?(0,u.jsx)(`span`,{className:`bn-badge`,children:e.badge}):null]}),(0,u.jsx)(`span`,{className:`bn-label`,children:e.label})]},e.k))}),(0,u.jsxs)(`div`,{className:`main`,children:[T&&(0,u.jsx)(`div`,{className:`error-msg`,children:T}),p===`products`&&(0,u.jsxs)(`div`,{className:`products-layout`,children:[(0,u.jsxs)(`aside`,{className:`filter-sidebar`,children:[(0,u.jsxs)(`div`,{className:`filter-sidebar-head`,children:[(0,u.jsxs)(`span`,{children:[`Фильтры`,$?` · ${$}`:``]}),$>0&&(0,u.jsx)(`button`,{className:`filter-reset`,onClick:bt,children:`Сбросить`})]}),(0,u.jsxs)(`div`,{className:`filter-sidebar-body`,children:[(0,u.jsxs)(`div`,{className:`filter-field`,children:[(0,u.jsx)(`label`,{children:`Вид средства`}),(0,u.jsx)(Ye,{sel:I.typeSel,onChange:St,types:ft.types})]}),Ct]})]}),(0,u.jsxs)(`div`,{className:`products-main`,children:[(0,u.jsxs)(`div`,{className:`toolbar`,children:[(0,u.jsx)(`input`,{className:`search`,placeholder:`Поиск по названию или бренду…`,value:D,onChange:e=>O(e.target.value)}),(0,u.jsxs)(`button`,{className:`btn btn-sm ${$?`btn-primary`:`btn-glass`} filter-toggle`,onClick:()=>V(e=>!e),children:[(0,u.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,style:{marginRight:6,verticalAlign:`-2px`},children:(0,u.jsx)(`path`,{d:`M1 2h12M3 7h8M5 12h4`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})}),`Фильтры`,$?` · ${$}`:``]})]}),B&&(0,u.jsxs)(`div`,{className:`filter-panel`,children:[(0,u.jsxs)(`div`,{className:`filter-field`,children:[(0,u.jsx)(`label`,{children:`Вид средства`}),(0,u.jsx)(Je,{value:I.type,sel:I.typeSel,onChange:St,types:ft.types})]}),Ct,$>0&&(0,u.jsx)(`button`,{className:`filter-reset`,onClick:bt,children:`Сбросить`})]}),$>0&&(0,u.jsxs)(`div`,{className:`filter-chips`,children:[I.type&&(0,u.jsxs)(`span`,{className:`chip`,onClick:()=>St(null),children:[I.type,` ✕`]}),I.fn&&(0,u.jsxs)(`span`,{className:`chip`,onClick:()=>L(e=>({...e,fn:``})),children:[lt[I.fn],` ✕`]}),I.scalp&&(0,u.jsxs)(`span`,{className:`chip`,onClick:()=>L(e=>({...e,scalp:``})),style:{textTransform:`capitalize`},children:[`Кожа: `,I.scalp,` ✕`]}),I.wash&&(0,u.jsxs)(`span`,{className:`chip`,onClick:()=>L(e=>({...e,wash:``})),children:[I.wash,` ✕`]}),I.price&&(0,u.jsxs)(`span`,{className:`chip`,onClick:()=>L(e=>({...e,price:``})),style:{textTransform:`capitalize`},children:[I.price,` ✕`]}),ut.filter(e=>I.flags[e.id]).map(e=>(0,u.jsxs)(`span`,{className:`chip`,onClick:()=>xt(e.id),children:[e.label,` ✕`]},e.id))]}),(0,u.jsxs)(`div`,{className:`section-head`,children:[(0,u.jsx)(`div`,{className:`section-title`,children:`Косметические средства`}),(0,u.jsxs)(`div`,{className:`ing-head-right`,children:[(0,u.jsxs)(`select`,{className:`sim-select ing-sort`,value:R,onChange:e=>z(e.target.value),children:[(0,u.jsx)(`option`,{value:`recommend`,children:`Рекомендации`}),(0,u.jsx)(`option`,{value:`date`,children:`По дате добавления`}),(0,u.jsx)(`option`,{value:`price`,children:`По цене`}),(0,u.jsx)(`option`,{value:`name`,children:`По названию`}),(0,u.jsx)(`option`,{value:`type`,children:`По группам`}),(0,u.jsx)(`option`,{value:`brand`,children:`По бренду`})]}),(0,u.jsxs)(`div`,{className:`count`,children:[Q.length,` позиций`]})]})]}),C?(0,u.jsx)(Mt,{}):Q.length===0?(0,u.jsxs)(`div`,{className:`empty-state`,children:[(0,u.jsx)(`span`,{className:`empty-ic`,children:`◇`}),(0,u.jsx)(`p`,{children:D||$?`Ничего не найдено по выбранным фильтрам`:`Средства ещё не добавлены`}),$>0&&(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:bt,children:`Сбросить фильтры`})]}):(0,u.jsx)(`div`,{className:`grid`,children:Q.map(e=>(0,u.jsxs)(`div`,{className:`card`,onClick:()=>nt(e),children:[(0,u.jsxs)(`div`,{className:`card-media`,children:[e.product_type&&(0,u.jsx)(`span`,{className:`card-type`,children:e.product_type}),e.image_url?(0,u.jsx)(`img`,{src:e.image_url,alt:e.brand||``}):(0,u.jsx)(`div`,{className:`pt-ph`,style:{width:`70%`,height:`82%`,"--tint":He(e.product_type)},"aria-hidden":`true`,children:(0,u.jsxs)(`svg`,{viewBox:`0 0 40 48`,width:`100%`,height:`100%`,children:[(0,u.jsx)(`rect`,{x:`13`,y:`2`,width:`14`,height:`6`,rx:`2`,fill:`var(--tint)`,opacity:`0.85`}),(0,u.jsx)(`rect`,{x:`8`,y:`8`,width:`24`,height:`38`,rx:`7`,fill:`var(--tint)`,opacity:`0.16`,stroke:`var(--tint)`,strokeOpacity:`0.35`,strokeWidth:`1`}),(0,u.jsx)(`text`,{x:`20`,y:`32`,textAnchor:`middle`,fontFamily:`Familjen Grotesk, sans-serif`,fontWeight:`600`,fontSize:`16`,fill:`var(--tint)`,children:Ue(e)})]})})]}),(0,u.jsxs)(`div`,{className:`card-body`,children:[e.name&&(0,u.jsx)(`div`,{className:`card-name`,children:e.name}),e.brand&&(0,u.jsx)(`div`,{className:`card-brand`,children:e.brand}),(0,u.jsx)(`div`,{className:`card-fns`,children:Te(e).map((e,t)=>(0,u.jsx)(`span`,{className:`fn-glass ${e.strong?``:`soft`}`,style:{"--fn":e.hue},children:e.text},t))})]})]},e.id))})]})]}),p===`ingredients`&&(0,u.jsx)(dt,{data:_,loading:C,onOpenDetail:M,editorMode:X,onSaveIngredient:Qe}),p===`similar`&&(0,u.jsx)(it,{allProducts:h,allIngredients:_,loadAllCompositions:ot,onOpenProduct:nt}),p===`compare`&&(0,u.jsx)(at,{allProducts:h,allIngredients:_,loadComposition:rt,compoCache:x,items:Z,onRemove:Pe,onClear:Be,onOpenProduct:nt})]}),k&&(0,u.jsx)($e,{product:k,subgroupDesc:y,removeBgKey:re,editorMode:X,onClose:()=>A(null),onOpenDetail:M,onOpenProduct:nt,allProducts:h,compoCache:x,loadAllCompositions:ot,inCompare:Z.some(e=>e.id===k.id),compareCount:Z.length,compareMax:se(),compareBaseType:Z[0]?.product_type||null,onAddToCompare:()=>Me(k),onGoCompare:Ve,onImageSaved:async(e,t)=>{await U(`/products?id=eq.${e}`,{method:`PATCH`,body:JSON.stringify({image_url:t})}),A(e=>e&&{...e,image_url:t}),g(n=>n.map(n=>n.id===e?{...n,image_url:t}:n))},onDelete:async()=>{await U(`/products?id=eq.${k.id}`,{method:`DELETE`}),A(null),Ke()}}),j&&(0,u.jsx)(Ze,{detail:j,subgroupDesc:y,allProducts:h,allIngredients:_,compoCache:x,onNavigate:M,onOpenProduct:e=>{M(null),nt(e)},onClose:()=>M(null)}),N&&(0,u.jsx)(Et,{ingredients:_,products:h,removeBgKey:re,onClose:()=>P(!1),onSaved:()=>{P(!1),Ke()}}),F&&(0,u.jsx)(Dt,{onClose:()=>te(!1),onSaved:()=>{te(!1),Xe()}})]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`style`,{children:Ne}),(0,u.jsx)(ee,{onLogin:()=>o(`login`),onRegister:()=>o(`register`),onPurchase:()=>c(!0)}),i===`login`&&(0,u.jsx)(`div`,{className:`reg-overlay`,onClick:e=>{e.target===e.currentTarget&&o(`landing`)},children:(0,u.jsx)(It,{onSuccess:()=>t(!0),onShowRegister:()=>o(`register`),onBack:()=>o(`landing`)})}),i===`register`&&(0,u.jsx)(`div`,{className:`reg-overlay`,onClick:e=>{e.target===e.currentTarget&&o(`landing`)},children:(0,u.jsx)(Lt,{onSuccess:()=>t(!0),onShowLogin:()=>o(`login`),onBack:()=>o(`landing`),onPurchase:()=>{t(!0),c(!0)}})}),s&&(0,u.jsx)(qt,{onClose:()=>c(!1),onSuccess:f}),l&&(0,u.jsx)(`div`,{className:`purchase-toast`,children:`Подписка оформлена`}),(0,u.jsx)(Rt,{}),(0,u.jsx)(Kt,{})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`style`,{children:Ne}),(0,u.jsx)(`div`,{style:{minHeight:`100vh`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`linear-gradient(168deg,#eef5f3,#e0eeea)`},children:(0,u.jsx)(Pt,{})})]})}var Ve={Шампунь:`#2f8fa6`,Кондиционер:`#3f7fb0`,Маска:`#3f9a63`,Крем:`#c0892f`,Сыворотка:`#9a5fb0`,SPF:`#4f78c4`,Масло:`#b07d2e`,Спрей:`#4a8a9a`,Тонер:`#6b8f5a`},He=e=>Ve[e]||`#6b8f7e`,Ue=e=>((e.brand||e.name||`?`).trim()[0]||`?`).toUpperCase();function We({product:e,size:t=56}){let n=He(e.product_type);return e.image_url?(0,u.jsx)(`img`,{className:`pt-img`,src:e.image_url,alt:e.name,style:{width:t,height:t*1.18}}):(0,u.jsx)(`div`,{className:`pt-ph`,style:{width:t,height:t*1.18,"--tint":n},"aria-hidden":`true`,children:(0,u.jsxs)(`svg`,{viewBox:`0 0 40 48`,width:`100%`,height:`100%`,children:[(0,u.jsx)(`rect`,{x:`13`,y:`2`,width:`14`,height:`6`,rx:`2`,fill:`var(--tint)`,opacity:`0.85`}),(0,u.jsx)(`rect`,{x:`8`,y:`8`,width:`24`,height:`38`,rx:`7`,fill:`var(--tint)`,opacity:`0.16`,stroke:`var(--tint)`,strokeOpacity:`0.35`,strokeWidth:`1`}),(0,u.jsx)(`text`,{x:`20`,y:`32`,textAnchor:`middle`,fontFamily:`Familjen Grotesk, sans-serif`,fontWeight:`600`,fontSize:`16`,fill:`var(--tint)`,children:Ue(e)})]})})}var Ge={"Уход за волосами":(0,u.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`17`,height:`17`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,children:(0,u.jsx)(`path`,{d:`M5 4c0 6 1 10 2 16M12 3c0 7 0 11-1 17M19 4c0 6-1 10-2 16`})}),"Уход за кожей":(0,u.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`17`,height:`17`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,children:[(0,u.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`}),(0,u.jsx)(`path`,{d:`M9 10h.01M15 10h.01M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8`})]}),Прочее:(0,u.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`17`,height:`17`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,children:[(0,u.jsx)(`circle`,{cx:`5`,cy:`12`,r:`1.6`}),(0,u.jsx)(`circle`,{cx:`12`,cy:`12`,r:`1.6`}),(0,u.jsx)(`circle`,{cx:`19`,cy:`12`,r:`1.6`})]})},Ke=[{group:`Уход за волосами`,sheet:`Анализ для волос`,subs:[{label:`Очищение`,types:[`Шампунь`,`Хелатный шампунь`,`Шампунь глубокой очистки`]},{label:`Пилинг и эксфолиация`,types:[`Пилинг`]},{label:`Кондиционирование и маски`,types:[`Маска / Кондиционер`]},{label:`Несмываемый уход`,types:[`Спрей`,`Крем`,`Масло`,`Лосьон`]},{label:`Укладка`,types:[`Гель для укладки`,`Пенка для укладки`,`Текстурайзер`]}]},{group:`Уход за кожей`,sheet:`Анализ косметики`,subs:[{label:`Очищение`,types:[`Пенка`,`Очищающее средство`,`Мицеллярная вода`,`Салфетки`]},{label:`Тонизирование`,types:[`Тонер`,`Тоник`,`Мист`]},{label:`Эксфолиация`,types:[`Пудра`,`Пилинг`,`Скраб`,`Сыворотка-пилинг`]},{label:`Сыворотки и концентраты`,types:[`Сыворотка`,`Эссенция`,`Флюид`,`Ампула`]},{label:`Увлажнение и питание`,types:[`Крем`,`Гель`,`Бальзам`,`Лосьон`,`Крем-гель`,`Эмульсия`,`Молочко`,`Спрей`]},{label:`Маски`,types:[`Маска`]},{label:`Локальный уход`,types:[`Стик`,`Точечное средство`]},{label:`Солнцезащита`,types:[`Солнцезащитное средство`]},{label:`Декоративная косметика`,types:[`База под макияж`,`Консилер`,`Тональная основа`,`Палетка теней`]}]}],qe=new Set(Ke.flatMap(e=>e.subs.flatMap(e=>e.types)));function Je({value:e,sel:t,onChange:n,types:r=[]}){let[i,o]=(0,a.useState)(!1),[s,c]=(0,a.useState)(null),l=(0,a.useRef)(null);(0,a.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&o(!1)};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[]);let d=r.filter(e=>!qe.has(e)),f=e=>{n(e),o(!1),c(null)},p=(e,n)=>!!t&&t.label===e&&(t.sheet||null)===(n||null);return(0,u.jsxs)(`div`,{className:`hier-type`,ref:l,children:[(0,u.jsxs)(`button`,{type:`button`,className:`hier-trigger`,onClick:()=>o(e=>!e),children:[(0,u.jsx)(`span`,{children:e||`Все виды`}),(0,u.jsx)(`span`,{className:`hier-caret`,children:i?`▴`:`▾`})]}),i&&(0,u.jsxs)(`div`,{className:`hier-menu`,children:[(0,u.jsx)(`div`,{className:`hier-root ${e?``:`active`}`,onClick:()=>f(null),children:`Все виды`}),Ke.map(e=>{let t=e.subs.map(e=>({...e,types:e.types.filter(e=>r.includes(e))})).filter(e=>e.types.length);return t.length?(0,u.jsxs)(`div`,{className:`hier-group`,onMouseEnter:()=>c(e.group),onMouseLeave:()=>c(null),children:[(0,u.jsxs)(`div`,{className:`hier-group-head`,children:[(0,u.jsxs)(`span`,{className:`hier-group-name`,children:[(0,u.jsx)(`span`,{className:`hier-ic`,children:Ge[e.group]}),e.group]}),(0,u.jsx)(`span`,{className:`hier-arrow`,children:`›`})]}),s===e.group&&(0,u.jsx)(`div`,{className:`hier-sub`,children:t.map(t=>(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`hier-sub-head ${p(t.label,e.sheet)?`active`:``}`,title:`Выбрать всю подгруппу`,onClick:()=>f({label:t.label,sheet:e.sheet,types:t.types}),children:t.label}),t.types.map(t=>(0,u.jsx)(`div`,{className:`hier-item ${p(t,e.sheet)?`active`:``}`,onClick:()=>f({label:t,sheet:e.sheet,types:[t]}),children:t},t))]},t.label))})]},e.group):null}),d.length>0&&(0,u.jsxs)(`div`,{className:`hier-group`,onMouseEnter:()=>c(`Прочее`),onMouseLeave:()=>c(null),children:[(0,u.jsxs)(`div`,{className:`hier-group-head`,children:[(0,u.jsxs)(`span`,{className:`hier-group-name`,children:[(0,u.jsx)(`span`,{className:`hier-ic`,children:Ge.Прочее}),`Прочее`]}),(0,u.jsx)(`span`,{className:`hier-arrow`,children:`›`})]}),s===`Прочее`&&(0,u.jsx)(`div`,{className:`hier-sub`,children:d.map(e=>(0,u.jsx)(`div`,{className:`hier-item ${p(e,null)?`active`:``}`,onClick:()=>f({label:e,sheet:null,types:[e]}),children:e},e))})]})]})]})}function Ye({sel:e,onChange:t,types:n=[]}){let r=n.filter(e=>!qe.has(e)),i=(t,n)=>!!e&&e.label===t&&(e.sheet||null)===(n||null),a=Ke.map(e=>({...e,subs:e.subs.map(e=>({...e,types:e.types.filter(e=>n.includes(e))})).filter(e=>e.types.length)})).filter(e=>e.subs.length);return(0,u.jsxs)(`nav`,{className:`hier-tree`,children:[(0,u.jsx)(`div`,{className:`hier-tree-root ${e?``:`active`}`,onClick:()=>t(null),children:`Все виды`}),a.map(e=>(0,u.jsxs)(`div`,{className:`hier-tree-group`,children:[(0,u.jsxs)(`div`,{className:`hier-tree-group-head`,children:[(0,u.jsx)(`span`,{className:`hier-ic`,children:Ge[e.group]}),e.group]}),e.subs.map(n=>(0,u.jsxs)(`div`,{className:`hier-tree-sub`,children:[(0,u.jsx)(`div`,{className:`hier-tree-sub-head ${i(n.label,e.sheet)?`active`:``}`,title:`Выбрать всю подгруппу`,onClick:()=>t({label:n.label,sheet:e.sheet,types:n.types}),children:n.label}),n.types.map(n=>(0,u.jsx)(`div`,{className:`hier-tree-item ${i(n,e.sheet)?`active`:``}`,onClick:()=>t({label:n,sheet:e.sheet,types:[n]}),children:n},n))]},n.label))]},e.group)),r.length>0&&(0,u.jsxs)(`div`,{className:`hier-tree-group`,children:[(0,u.jsxs)(`div`,{className:`hier-tree-group-head`,children:[(0,u.jsx)(`span`,{className:`hier-ic`,children:Ge.Прочее}),`Прочее`]}),r.map(e=>(0,u.jsx)(`div`,{className:`hier-tree-item ${i(e,null)?`active`:``}`,onClick:()=>t({label:e,sheet:null,types:[e]}),children:e},e))]})]})}function Xe({product:e,score:t,onClick:n}){let r=t>=70?`#1f7a5c`:t>=45?`#c98a3a`:`#8b8f86`;return(0,u.jsxs)(`button`,{className:`pcard`,onClick:n,children:[(0,u.jsxs)(`div`,{className:`pcard-media`,children:[e.product_type&&(0,u.jsx)(`span`,{className:`pcard-type`,children:e.product_type}),typeof t==`number`&&(0,u.jsxs)(`span`,{className:`pcard-match`,style:{"--m":r},children:[t,`%`]}),e.image_url?(0,u.jsx)(`img`,{src:e.image_url,alt:e.name}):(0,u.jsx)(`div`,{className:`pt-ph`,style:{width:`70%`,height:`82%`,"--tint":He(e.product_type)},"aria-hidden":`true`,children:(0,u.jsxs)(`svg`,{viewBox:`0 0 40 48`,width:`100%`,height:`100%`,children:[(0,u.jsx)(`rect`,{x:`13`,y:`2`,width:`14`,height:`6`,rx:`2`,fill:`var(--tint)`,opacity:`0.85`}),(0,u.jsx)(`rect`,{x:`8`,y:`8`,width:`24`,height:`38`,rx:`7`,fill:`var(--tint)`,opacity:`0.16`,stroke:`var(--tint)`,strokeOpacity:`0.35`,strokeWidth:`1`}),(0,u.jsx)(`text`,{x:`20`,y:`32`,textAnchor:`middle`,fontFamily:`Familjen Grotesk, sans-serif`,fontWeight:`600`,fontSize:`16`,fill:`var(--tint)`,children:Ue(e)})]})})]}),(0,u.jsxs)(`div`,{className:`pcard-body`,children:[(0,u.jsx)(`div`,{className:`pcard-name`,children:e.name}),(0,u.jsx)(`div`,{className:`pcard-brand`,children:e.brand})]})]})}function Ze({detail:e,onNavigate:t,onOpenProduct:n,onClose:r,onAddToCompare:i,onGoCompare:o,subgroupDesc:s,allProducts:c=[],allIngredients:l=[],compoCache:d={}}){let[f,p]=(0,a.useState)(!1);(0,a.useEffect)(()=>{p(!1)},[e.kind,e.inci,e.group,e.subgroup]);let m=c.filter(e=>d[e.id]).map(e=>({...e,ingredients:d[e.id]})),h=m.length,g=e=>m.filter(t=>t.ingredients.some(t=>Y(t.ing.inci_name)===Y(e))),_=(e,t)=>m.filter(n=>n.ingredients.some(n=>n.ing.group===e&&(!t||n.ing.subgroup===t))),v=(e,t)=>l.filter(n=>n.group===e&&(!t||n.subgroup===t)),y=e=>{let n=l.find(t=>Y(t.inci_name)===Y(e))||m.flatMap(e=>e.ingredients).map(e=>e.ing).find(t=>Y(t.inci_name)===Y(e));n&&t({kind:`ingredient`,inci:n.inci_name,ru:n.ru_name,description:n.description,is_eu_allergen:n.is_eu_allergen,groups:n.allGroups&&n.allGroups.length?n.allGroups.map(e=>({group:e.group,subgroup:e.subgroup,subgroup2:e.subgroup2})):[{group:n.group,subgroup:n.subgroup,subgroup2:n.subgroup2}]})},b=(e,n)=>t({kind:`group`,group:e,subgroup:n}),x;if(e.kind===`ingredient`){let t=g(e.inci);x=(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`dm-head`,children:[(0,u.jsx)(`span`,{className:`dm-kind`,children:`Ингредиент`}),(0,u.jsx)(`h2`,{className:`dm-title`,children:e.inci}),e.ru&&(0,u.jsx)(`div`,{className:`dm-sub`,children:e.ru}),e.is_eu_allergen&&(0,u.jsx)(`span`,{className:`dm-allergen`,children:`Аллерген ЕС`})]}),e.description&&(0,u.jsx)(`p`,{className:`dm-desc`,children:e.description}),!e.description&&(0,u.jsx)(`p`,{className:`dm-desc dm-muted`,children:`Описание пока готовится.`}),(i||o)&&(0,u.jsxs)(`div`,{className:`dm-cmp-actions`,children:[i&&(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm ${f?`is-added`:``}`,onClick:()=>{i(e.inci),p(!0)},disabled:f,children:f?`✓ В сравнении`:`＋ Добавить в сравнение`}),o&&(0,u.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:o,children:`Перейти к сравнению →`})]}),(0,u.jsxs)(`div`,{className:`dm-section`,children:[(0,u.jsx)(`span`,{className:`dm-label`,children:`Группы и подгруппы`}),e.groups.map((e,t)=>(0,u.jsxs)(`div`,{className:`dm-grouprow`,children:[(0,u.jsx)(`span`,{className:`g-tag`,style:{background:K(e.group)+`1f`,color:K(e.group)},onClick:()=>b(e.group),children:e.group}),e.subgroup&&(0,u.jsx)(`span`,{className:`dm-arrow`,children:`→`}),e.subgroup&&(0,u.jsx)(`span`,{className:`dm-subtag`,onClick:()=>b(e.group,e.subgroup),children:e.subgroup}),e.subgroup2&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`span`,{className:`dm-arrow`,children:`→`}),(0,u.jsx)(`span`,{className:`dm-subtag`,children:e.subgroup2})]}),J(s,e.group,e.subgroup,e.subgroup2)&&(0,u.jsx)(`p`,{className:`dm-groupdesc`,children:J(s,e.group,e.subgroup,e.subgroup2)})]},t))]}),(0,u.jsxs)(`div`,{className:`dm-section`,children:[(0,u.jsxs)(`span`,{className:`dm-label`,children:[`Встречается в средствах`,h?` (${t.length})`:``]}),h===0?(0,u.jsx)(`p`,{className:`dm-muted`,children:`Чтобы увидеть, в каких средствах встречается компонент, откройте вкладку «Поиск аналогов» — составы подгрузятся, и список появится здесь.`}):t.length===0?(0,u.jsx)(`p`,{className:`dm-muted`,children:`Среди загруженных составов средств с этим компонентом нет.`}):(0,u.jsx)(`div`,{className:`pcards ${t.length<=3?`few`:``}`,children:t.map(e=>(0,u.jsx)(Xe,{product:e,onClick:()=>n(e)},e.id))})]})]})}else if(e.kind===`group`){let t=J(s,e.group,e.subgroup),r=v(e.group,e.subgroup),i=_(e.group,e.subgroup);x=(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`dm-head`,children:[(0,u.jsx)(`span`,{className:`dm-kind`,children:e.subgroup?`Подгруппа`:`Группа`}),(0,u.jsx)(`h2`,{className:`dm-title`,style:{color:K(e.group)},children:e.subgroup||e.group}),e.subgroup&&(0,u.jsxs)(`div`,{className:`dm-sub`,onClick:()=>b(e.group),style:{cursor:`pointer`},children:[`в группе «`,e.group,`»`]})]}),t?(0,u.jsx)(`p`,{className:`dm-desc`,children:t}):(0,u.jsx)(`p`,{className:`dm-desc dm-muted`,children:`Описание этой группы пока готовится.`}),r.length>0&&(0,u.jsxs)(`div`,{className:`dm-section`,children:[(0,u.jsxs)(`span`,{className:`dm-label`,children:[`Компоненты этой группы (`,r.length,`)`]}),(0,u.jsx)(`div`,{className:`dm-chips`,children:r.map(e=>(0,u.jsxs)(`span`,{className:`dm-ingchip`,onClick:()=>y(e.inci_name),children:[e.inci_name,e.ru_name?` · ${e.ru_name}`:``]},e.id))})]}),(0,u.jsxs)(`div`,{className:`dm-section`,children:[(0,u.jsxs)(`span`,{className:`dm-label`,children:[`Средства с этой группой`,h?` (${i.length})`:``]}),h===0?(0,u.jsx)(`p`,{className:`dm-muted`,children:`Откройте вкладку «Поиск аналогов», чтобы подгрузить составы — тогда здесь появятся средства с этой группой.`}):i.length===0?(0,u.jsx)(`p`,{className:`dm-muted`,children:`Среди загруженных составов средств с этой группой нет.`}):(0,u.jsx)(`div`,{className:`pcards ${i.length<=3?`few`:``}`,children:i.map(e=>(0,u.jsx)(Xe,{product:e,onClick:()=>n(e)},e.id))})]})]})}else e.kind===`info`&&(x=(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`dm-head`,children:[(0,u.jsx)(`span`,{className:`dm-kind`,children:e.category}),(0,u.jsx)(`h2`,{className:`dm-title`,children:e.title}),e.subtitle&&(0,u.jsx)(`div`,{className:`dm-sub`,children:e.subtitle})]}),e.description?(0,u.jsx)(`p`,{className:`dm-desc`,children:e.description}):(0,u.jsx)(`p`,{className:`dm-desc dm-muted`,children:`Подробное описание этой категории готовится. Здесь появится отдельная страница с разбором: что это значит, кому подходит и как выбирать.`})]}));return(0,u.jsx)(`div`,{className:`overlay`,onClick:r,children:(0,u.jsxs)(`div`,{className:`modal dm-modal`,onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(`button`,{className:`modal-close`,onClick:r,children:`✕`}),(0,u.jsx)(`div`,{className:`dm-body`,children:x})]})})}function Qe(e){let t=e.ingredients||[];if(!t.length)return null;let n=t.map(e=>({inci:e.ing.inci_name,group:e.ing.group,position:e.position})),r=rt(n).map(e=>e.text),i=t.filter(e=>e.ing.is_eu_allergen).length,a=t.length,o=n.findIndex(e=>(e.group||``).toLowerCase().includes(`отдушк`)),s=o>0?o:a,c=[];if(r.length){let e=r.slice(0,3).map(e=>e.toLowerCase());c.push(`Работает на ${e.join(`, `)}`)}return c.push(`${a} ингредиент${a%10==1&&a%100!=11?``:a%10>=2&&a%10<=4&&(a%100<10||a%100>=20)?`а`:`ов`}, из них ~${s} в активной части`),c.push(i===0?`аллергенов EU не обнаружено`:`${i} потенциальн${i===1?`ый аллерген`:`ых аллергена(ов)`} EU`),{text:c.join(` · `),fns:r,allergens:i}}function $e({product:e,onClose:t,onOpenDetail:n,onOpenProduct:r,subgroupDesc:i,allProducts:o=[],compoCache:s={},loadAllCompositions:c,onImageSaved:l,onDelete:d,removeBgKey:f,editorMode:p=!1,inCompare:m=!1,compareCount:h=0,compareMax:g=5,compareBaseType:_=null,onAddToCompare:v,onGoCompare:y}){let[b,x]=(0,a.useState)(!1);(0,a.useEffect)(()=>{c&&c().catch(()=>{})},[]);let S=e=>n({kind:`ingredient`,inci:e.inci_name,ru:e.ru_name,description:e.description,is_eu_allergen:e.is_eu_allergen,groups:[{group:e.group,subgroup:e.subgroup,subgroup2:e.subgroup2}]}),C=e=>n({kind:`group`,group:e}),w=(e,t)=>n({kind:`group`,group:e,subgroup:t}),T=(e,t,r)=>n({kind:`info`,category:e,title:t,subtitle:r}),E=(e,t)=>{if((e.product_type||``).toLowerCase().includes(`шампунь`)){if(t.text===e.analytical_type)return T(`Промывающая способность`,t.text,`Что означает этот тип очищения и кому он подходит`);if(t.text===e.skin_type)return T(`Тип кожи головы`,t.text,`Особенности этого типа кожи головы и подбор ухода`)}return T(`Характеристика средства`,t.text)},D=Te(e),O=(e.product_type||``).toLowerCase().includes(`шампунь`)?`Очищение и тип кожи головы`:(e.product_type||``).toLowerCase().match(/маск|кондиционер/)?`Действие`:`Характеристики`,k=e.ingredients.filter(e=>e.ing.is_eu_allergen).length,A=Math.max(40,100-k*18),j=A>=85?{label:`Высокая безопасность`,note:`аллергенов не обнаружено`,color:`#1f7a5c`}:A>=65?{label:`Средняя безопасность`,note:`${k} аллерген(ов) в составе`,color:`#c98a3a`}:{label:`Пониженная безопасность`,note:`${k} аллерген(ов) в составе`,color:`#c0584f`},M=e.ingredients.filter(e=>e.matched).length,N=(0,a.useMemo)(()=>{let t=ke(e);if(!t.length)return[];let n=o.filter(t=>t.id!==e.id&&s[t.id]).map(e=>({...e,ingredients:s[e.id]}));return n.length?Me(t,e,n,{sameType:!0}).slice(0,4):[]},[e.id,o,s]);return(0,u.jsx)(`div`,{className:`overlay`,onClick:t,children:(0,u.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(`div`,{className:`modal-head`,children:[(0,u.jsx)(`div`,{className:`modal-media`,children:e.image_url?(0,u.jsx)(`img`,{src:e.image_url,alt:e.name}):(0,u.jsx)(`div`,{className:`pt-ph`,style:{width:`58%`,height:`72%`,"--tint":He(e.product_type)},"aria-hidden":`true`,children:(0,u.jsxs)(`svg`,{viewBox:`0 0 40 48`,width:`100%`,height:`100%`,children:[(0,u.jsx)(`rect`,{x:`13`,y:`2`,width:`14`,height:`6`,rx:`2`,fill:`var(--tint)`,opacity:`0.85`}),(0,u.jsx)(`rect`,{x:`8`,y:`8`,width:`24`,height:`38`,rx:`7`,fill:`var(--tint)`,opacity:`0.16`,stroke:`var(--tint)`,strokeOpacity:`0.35`,strokeWidth:`1`}),(0,u.jsx)(`text`,{x:`20`,y:`32`,textAnchor:`middle`,fontFamily:`Familjen Grotesk, sans-serif`,fontWeight:`600`,fontSize:`16`,fill:`var(--tint)`,children:Ue(e)})]})})}),(0,u.jsxs)(`div`,{className:`modal-info`,children:[(0,u.jsx)(`button`,{className:`modal-close`,onClick:t,children:`✕`}),(0,u.jsx)(`div`,{className:`modal-title`,children:e.name}),(0,u.jsx)(`div`,{className:`modal-brand`,children:e.brand}),(0,u.jsxs)(`div`,{className:`meta-row`,children:[e.product_type&&(0,u.jsxs)(`div`,{className:`meta-item`,children:[(0,u.jsx)(`span`,{className:`meta-label`,children:`Категория`}),(0,u.jsx)(`span`,{className:`meta-value meta-link`,onClick:()=>T(`Вид средства`,e.product_type,`Что это за категория средств и как её выбирать`),children:e.product_type})]}),e.price_tier&&(0,u.jsxs)(`div`,{className:`meta-item`,children:[(0,u.jsx)(`span`,{className:`meta-label`,children:`Цена`}),(0,u.jsx)(`span`,{className:`meta-value`,style:{textTransform:`capitalize`},children:e.price_tier})]}),e.is_face&&(0,u.jsxs)(`div`,{className:`meta-item`,children:[(0,u.jsx)(`span`,{className:`meta-label`,children:`Зона`}),(0,u.jsx)(`span`,{className:`meta-value`,children:`Для лица`})]})]}),D.length>0&&(0,u.jsxs)(`div`,{className:`fn-block`,children:[(0,u.jsx)(`span`,{className:`fn-block-label`,children:O}),(0,u.jsx)(`div`,{className:`fn-list`,children:D.map((t,n)=>(0,u.jsxs)(`span`,{className:`fn-glass-lg ${t.strong?``:`soft`} fn-clickable`,style:{"--fn":t.hue},onClick:()=>E(e,t),children:[(0,u.jsx)(`span`,{className:`dot`}),t.text]},n))})]}),(0,u.jsxs)(`div`,{className:`safety safety-link`,onClick:()=>T(`Степень безопасности`,j.label,`Как мы считаем степень безопасности и что влияет на оценку`),children:[(0,u.jsx)(`div`,{className:`safety-ring`,style:{background:j.color},children:A}),(0,u.jsxs)(`div`,{className:`safety-txt`,children:[(0,u.jsx)(`b`,{style:{color:j.color},children:j.label}),(0,u.jsx)(`span`,{children:j.note})]}),(0,u.jsx)(`span`,{className:`safety-arrow`,children:`→`})]}),(()=>{let t=Qe(e),n=(e.notes||``).toLowerCase(),r=n.includes(`супер состав`)?{icon:`🏆`,label:`Супер состав`,cls:`badge-gold`}:n.includes(`рекомендовано`)||n.includes(`рекомендован`)?{icon:`⭐`,label:`Рекомендовано`,cls:`badge-star`}:null;return!t&&!r?null:(0,u.jsxs)(`div`,{className:`summary-block`,children:[r&&(0,u.jsxs)(`span`,{className:`notes-badge ${r.cls}`,children:[r.icon,` `,r.label]}),t&&(0,u.jsx)(`p`,{className:`summary-text`,children:t.text})]})})(),(()=>{let t=!m&&_&&e.product_type&&e.product_type!==_;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`cmp-add-row`,children:[(0,u.jsx)(`button`,{className:`btn btn-sm ${m?`btn-glass is-added`:`btn-glass`}`,onClick:v,disabled:m||h>=g||t,children:m?`✓ В сравнении`:`＋ Добавить в сравнение`}),h>0&&(0,u.jsxs)(`button`,{className:`btn btn-primary btn-sm`,onClick:y,children:[`Перейти к сравнению (`,h,`)`]})]}),t&&(0,u.jsxs)(`div`,{className:`cmp-add-note`,children:[`В сравнении уже «`,_,`». Сравнивать можно средства одной категории — очистите сравнение, чтобы начать заново.`]}),!t&&!m&&h>=g&&(0,u.jsx)(`div`,{className:`cmp-add-note`,children:`Добавлено максимальное количество средств для сравнения`})]})})(),p&&(b?(0,u.jsxs)(`div`,{style:{marginTop:10,padding:12,border:`1px solid var(--glass-border)`,borderRadius:12},children:[(0,u.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:8},children:[(0,u.jsx)(`span`,{style:{fontSize:12,color:`var(--ink-soft)`},children:`Изображение`}),(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:()=>x(!1),children:`Отмена`})]}),(0,u.jsx)(wt,{removeBgKey:f,onDone:async t=>{t&&l&&(await l(e.id,t),x(!1))}})]}):(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm photo-btn`,onClick:()=>x(!0),children:e.image_url?`Заменить фото`:`＋ Добавить фото`}))]})]}),(0,u.jsxs)(`div`,{className:`compo`,children:[(0,u.jsxs)(`div`,{className:`compo-head`,children:[`Состав, `,e.ingredients.length,` ингредиентов `,(0,u.jsxs)(`span`,{children:[`· распознано `,M]})]}),(0,u.jsxs)(`div`,{className:`ing-list`,children:[(0,u.jsxs)(`div`,{className:`ing-grid`,children:[(0,u.jsx)(`div`,{className:`ing-colhead`}),(0,u.jsx)(`div`,{className:`ing-colhead`,children:`Ингредиент`}),(0,u.jsx)(`div`,{className:`ing-colhead`,children:`Группа`}),(0,u.jsx)(`div`,{className:`ing-colhead`,children:`Подгруппа · описание`})]}),(()=>{let t=e.ingredients.findIndex(e=>e.ing.group===`Отдушки`),n=t>-1&&!e.is_face;return e.ingredients.map((e,r)=>{let a=e.ing,o=n&&r>t;return(0,u.jsxs)(`div`,{children:[n&&r===t+1&&(0,u.jsxs)(`div`,{className:`compo-divider`,children:[(0,u.jsx)(`span`,{className:`ln`}),(0,u.jsx)(`span`,{className:`lbl`,children:`ниже ~1% · менее значимо`}),(0,u.jsx)(`span`,{className:`ln`})]}),(0,u.jsxs)(`div`,{className:`ing-grid ${o?`minor`:``}`,children:[(0,u.jsx)(`div`,{className:`ing-cell ing-pos`,children:e.position||r+1}),(0,u.jsxs)(`div`,{className:`ing-cell ing-cell-hover`,children:[(0,u.jsxs)(`div`,{className:`ing-inci`,children:[(0,u.jsx)(`span`,{className:`sub-link`,onClick:()=>S(a),children:a.inci_name}),a.is_eu_allergen&&(0,u.jsx)(`span`,{className:`badge-eu`,title:`Аллерген EU-26. Список со всеми описаниями – на этапе подключения к базе`,children:`Аллерген`})]}),a.ru_name&&(0,u.jsx)(`div`,{className:`ing-ru`,children:a.ru_name})]}),(0,u.jsx)(`div`,{className:`ing-cell ing-cell-sep`,children:a.group?(0,u.jsx)(`span`,{className:`g-tag`,style:{background:K(a.group)+`1f`,color:K(a.group)},onClick:()=>C(a.group),children:a.group}):(0,u.jsx)(`span`,{style:{color:`var(--ink-faint)`},children:`–`})}),(0,u.jsxs)(`div`,{className:`ing-cell ing-cell-sep`,children:[a.subgroup&&(0,u.jsxs)(`div`,{className:`ing-sub`,children:[(0,u.jsx)(`span`,{className:`lbl`,children:`Подгруппа`}),(0,u.jsx)(`span`,{className:`sub-link`,onClick:()=>w(a.group,a.subgroup),children:a.subgroup})]}),(a.description||J(i,a.group,a.subgroup,a.subgroup2))&&(0,u.jsx)(`div`,{className:`ing-desc`,style:{marginTop:a.subgroup?5:0},children:a.description||J(i,a.group,a.subgroup,a.subgroup2)}),a.oil&&(0,u.jsxs)(`div`,{className:`ing-oil`,children:[`Комедогенность `,a.oil.comedogenicity,` · проникновение `,a.oil.penetration]}),!a.subgroup&&!a.description&&!a.oil&&!J(i,a.group,a.subgroup,a.subgroup2)&&(0,u.jsx)(`span`,{style:{color:`var(--ink-faint)`,fontSize:12},children:`–`})]})]})]},e.id)})})()]}),N.length>0?(0,u.jsxs)(`div`,{className:`similar-block`,children:[(0,u.jsxs)(`div`,{className:`similar-head`,children:[(0,u.jsx)(`span`,{className:`similar-title`,children:`Похожие по составу`}),(0,u.jsx)(`span`,{className:`similar-hint`,children:`того же вида · по сходству состава`})]}),(0,u.jsx)(`div`,{className:`pcards ${N.length<=3?`few`:``}`,children:N.map(({product:e,score:t})=>(0,u.jsx)(Xe,{product:e,score:t,onClick:()=>r&&r(e)},e.id))})]}):(0,u.jsxs)(`div`,{className:`similar-block`,children:[(0,u.jsx)(`div`,{className:`similar-head`,children:(0,u.jsx)(`span`,{className:`similar-title`,children:`Похожие по составу`})}),(0,u.jsx)(`p`,{className:`dm-muted`,style:{marginTop:8},children:`Аналоги пока не найдены. Чтобы сравнить состав вручную, откройте вкладку «Аналоги».`})]}),p&&(0,u.jsx)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,marginTop:16},children:(0,u.jsx)(`button`,{className:`btn btn-danger btn-sm`,onClick:d,children:`Удалить средство`})})]})]})})}function et({value:e,onPick:t,onClear:n,products:r=[],placeholder:i=`Начните вводить название или бренд…`}){let[o,s]=(0,a.useState)(``),[c,l]=(0,a.useState)(!1),d=(0,a.useMemo)(()=>{let e=o.trim().toLowerCase();return e?r.filter(t=>(t.name||``).toLowerCase().includes(e)||(t.brand||``).toLowerCase().includes(e)).slice(0,8):[]},[o,r]);return e?(0,u.jsxs)(`div`,{className:`ac-chosen`,children:[(0,u.jsx)(We,{product:e,size:38}),(0,u.jsxs)(`span`,{className:`ac-chosen-meta`,children:[(0,u.jsx)(`span`,{className:`ac-opt-name`,children:e.name}),(0,u.jsx)(`span`,{className:`ac-opt-brand`,children:e.brand})]}),(0,u.jsx)(`button`,{className:`ac-clear`,onClick:n,title:`Очистить`,children:`✕`})]}):(0,u.jsxs)(`div`,{className:`ac-wrap`,children:[(0,u.jsx)(`input`,{className:`ac-input`,value:o,placeholder:i,onChange:e=>{s(e.target.value),l(!0)},onFocus:()=>l(!0),onBlur:()=>setTimeout(()=>l(!1),150)}),c&&o.trim()&&(0,u.jsx)(`div`,{className:`ac-drop`,children:d.length===0?(0,u.jsx)(`div`,{className:`ac-empty`,children:`Ничего не найдено`}):d.map(e=>(0,u.jsxs)(`button`,{className:`ac-opt`,onMouseDown:()=>{t(e),s(``),l(!1)},children:[(0,u.jsx)(We,{product:e,size:34}),(0,u.jsxs)(`span`,{className:`ac-opt-meta`,children:[(0,u.jsx)(`span`,{className:`ac-opt-name`,children:e.name}),(0,u.jsxs)(`span`,{className:`ac-opt-brand`,children:[e.brand,e.product_type?` · ${e.product_type}`:``]})]})]},e.id))})]})}function tt(e=[]){let t=t=>{let n=e.find(e=>Y(e.inci_name)===Y(t));return n?n.group:null};return e=>e.split(/[,;\n]+/).map(e=>e.trim()).filter(Boolean).map((e,n)=>({inci:e,group:t(e),position:n+1}))}var nt=[{group:`Увлажнители`,text:`Увлажнение`,hue:`#3f7fb0`},{group:`Масла`,text:`Питание`,hue:`#b07d2e`},{group:`Эмоленты`,text:`Смягчение`,hue:`#c0892f`},{group:`Протеины`,text:`Восстановление`,hue:`#9a5fb0`},{group:`Кондиционеры`,text:`Гладкость`,hue:`#3f9a63`},{group:`Структурообразователи`,text:`Плёнка / защита`,hue:`#4f78c4`}];function rt(e){let t=new Set(e.map(e=>e.group).filter(Boolean));return nt.filter(e=>t.has(e.group))}function it({onOpenProduct:e,allProducts:t=[],allIngredients:n=[],loadAllCompositions:r}){let i=(0,a.useMemo)(()=>tt(n),[n]),[o,s]=(0,a.useState)(``),[c,l]=(0,a.useState)(null),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(``),[h,g]=(0,a.useState)(`match`),[_,v]=(0,a.useState)(!1),[y,b]=(0,a.useState)(!1),[x,S]=(0,a.useState)(null),[C,w]=(0,a.useState)([]),T=[...new Set(t.map(e=>e.product_type).filter(Boolean))].sort(),E=c?C.find(e=>e.id===c.id)||c:null,D=E&&E.ingredients?ke(E):i(o),O=c||o.trim().length>0,k=c?c.product_type:je(D),A=d||k||``,j=(0,a.useMemo)(()=>{if(!_||!C.length)return[];let e=Me(D,E,C,{sameType:!1,order:h}),t=p||A;return t&&(e=e.filter(e=>e.product.product_type===t)),e.slice(0,24)},[_,C,o,c,h,p,A]),M=async()=>{b(!0),S({done:0,total:t.length});try{w(await r((e,n)=>S({done:e,total:n||t.length}))),v(!0)}finally{b(!1),S(null)}},N=()=>{s(``),l(null),f(``),m(``),v(!1)},P=()=>v(!1),ee=c?`${c.name} · ${c.brand}`:`состав из ${D.length} компонентов`;return(0,u.jsxs)(`div`,{className:`sim-tab`,children:[(0,u.jsx)(`div`,{className:`section-head`,children:(0,u.jsx)(`div`,{className:`section-title`,children:`Аналоги`})}),!_&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`p`,{className:`sim-intro`,children:`Выберите средство из базы или вставьте его состав. Мы подберём похожие средства и отсортируем их по совпадению состава или по цене.`}),(0,u.jsxs)(`div`,{className:`sim-single`,children:[(0,u.jsx)(`label`,{className:`sim-label`,children:`Выберите средство в базе`}),(0,u.jsx)(et,{value:c,products:t,onPick:e=>{l(e),s(``),f(``)},onClear:()=>l(null)}),(0,u.jsxs)(`details`,{className:`sim-manual`,open:!c&&o.length>0,children:[(0,u.jsx)(`summary`,{children:`Нет в базе? Ввести состав вручную`}),(0,u.jsx)(`textarea`,{className:`sim-textarea compact`,placeholder:`Вода, лаурет-сульфат натрия, кокамидопропилбетаин, глицерин, отдушка…`,value:o,onChange:e=>{s(e.target.value),l(null),f(``)}}),O&&!c&&D.length>0&&(0,u.jsxs)(`div`,{className:`type-detect`,children:[k?(0,u.jsxs)(`span`,{children:[`Похоже на: `,(0,u.jsx)(`b`,{children:k}),`. Можно уточнить:`]}):(0,u.jsx)(`span`,{children:`Вид не определился. Выберите вручную:`}),(0,u.jsx)(`div`,{className:`type-pills`,children:T.map(e=>(0,u.jsx)(`span`,{className:`type-pill ${(d||k)===e?`active`:``}`,onClick:()=>f(e),children:e},e))})]})]})]}),(0,u.jsxs)(`div`,{className:`cmp-cta`,children:[(0,u.jsx)(`button`,{className:`btn btn-primary btn-cta`,onClick:M,disabled:!O||y,children:y?`Загрузка составов… ${x?Math.round(100*x.done/Math.max(1,x.total)):0}%`:`Найти аналоги`}),!O&&(0,u.jsx)(`span`,{className:`cmp-hint`,children:`Сначала выберите средство или вставьте состав`}),y&&(0,u.jsx)(`span`,{className:`cmp-hint`,children:`Первый поиск грузит составы всех средств, дальше будет мгновенно`})]})]}),_&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`input-collapsed`,children:[(0,u.jsxs)(`span`,{className:`ic-summary`,children:[`Аналоги для: `,(0,u.jsx)(`b`,{children:ee})]}),(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm ic-edit`,onClick:P,children:`Изменить`}),(0,u.jsx)(`button`,{className:`filter-reset`,onClick:N,children:`Сбросить`})]}),(0,u.jsxs)(`div`,{className:`results-bar`,children:[(0,u.jsxs)(`div`,{className:`count`,children:[`Найдено: `,j.length]}),(0,u.jsxs)(`div`,{className:`results-controls`,children:[(0,u.jsxs)(`select`,{className:`sim-select sim-select-sm`,value:p,onChange:e=>m(e.target.value),children:[(0,u.jsx)(`option`,{value:``,children:A?`Вид: как у исходного (${A})`:`Вид: любой`}),T.map(e=>(0,u.jsx)(`option`,{value:e,children:e},e))]}),(0,u.jsxs)(`select`,{className:`sim-select sim-select-sm`,value:h,onChange:e=>g(e.target.value),children:[(0,u.jsx)(`option`,{value:`match`,children:`Сначала по совпадению`}),(0,u.jsx)(`option`,{value:`price`,children:`Сначала дешевле`})]})]})]}),j.length===0?(0,u.jsxs)(`div`,{className:`empty-state`,children:[(0,u.jsx)(`span`,{className:`empty-ic`,children:`◇`}),(0,u.jsx)(`p`,{children:`Похожих средств не нашлось. Попробуйте другой вид средства или уберите фильтр вида.`})]}):(0,u.jsx)(`div`,{className:`pcards`,children:j.map(({product:t,score:n})=>(0,u.jsx)(Xe,{product:t,score:n,onClick:()=>e(t)},t.id))})]})]})}function at({onOpenProduct:e,items:t=[],onRemove:n,onClear:r,allProducts:i=[],allIngredients:o=[],loadComposition:s,compoCache:c={}}){(0,a.useEffect)(()=>{t.forEach(e=>{c[e.id]||s&&s(e).catch(()=>{})})},[t,c]);let l=e=>{let t=c[e.id];if(!t)return null;let n=t.filter(e=>e.ing&&e.ing.is_eu_allergen).length,r=Math.max(40,100-n*18);return{score:r,label:r>=85?`Высокая`:r>=65?`Средняя`:`Пониженная`,color:r>=85?`#1f7a5c`:r>=65?`#c98a3a`:`#c0584f`,allergens:n}},d=e=>c[e.id]?c[e.id].map(e=>({inci:e.ing.inci_name,group:e.ing.group,position:e.position})):[],f=t.length?d(t[0]):[],p=(e,t)=>{if(t===0)return null;let n=d(e);return!n.length||!f.length?null:Z(f,n).score};return t.length?(0,u.jsxs)(`div`,{className:`sim-tab`,children:[(0,u.jsxs)(`div`,{className:`section-head`,children:[(0,u.jsxs)(`div`,{className:`section-title`,children:[`Сравнение · `,t.length,` из 5`]}),(0,u.jsx)(`button`,{className:`filter-reset`,onClick:r,children:`Очистить всё`})]}),(0,u.jsx)(`div`,{className:`cmp-matrix-wrap`,children:(0,u.jsxs)(`table`,{className:`cmp-matrix`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{className:`cmp-corner`}),t.map(t=>(0,u.jsxs)(`th`,{className:`cmp-col-head`,children:[(0,u.jsx)(`button`,{className:`cmp-col-x`,title:`Убрать`,onClick:()=>n(t.id),children:`×`}),(0,u.jsxs)(`div`,{className:`cmp-col-card`,onClick:()=>e&&e(t),title:`Открыть карточку`,children:[(0,u.jsx)(We,{product:t,size:64}),(0,u.jsx)(`div`,{className:`cmp-col-name`,children:t.name}),t.brand&&(0,u.jsx)(`div`,{className:`cmp-col-brand`,children:t.brand})]})]},t.id))]})}),(0,u.jsxs)(`tbody`,{children:[(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{className:`cmp-row-label`,children:`Вид средства`}),t.map(e=>(0,u.jsx)(`td`,{className:`cmp-cell`,children:e.product_type||`—`},e.id))]}),(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{className:`cmp-row-label`,children:`Функции`}),t.map(e=>{let t=Te(e);return(0,u.jsx)(`td`,{className:`cmp-cell`,children:t.length?(0,u.jsx)(`div`,{className:`cmp-fn-list`,children:t.map((e,t)=>(0,u.jsx)(`span`,{className:`fn-glass ${e.strong?``:`soft`}`,style:{"--fn":e.hue},children:e.text},t))}):(0,u.jsx)(`span`,{className:`dm-muted`,children:`базовый состав`})},e.id)})]}),(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{className:`cmp-row-label`,children:`Безопасность`}),t.map(e=>{let t=l(e);return(0,u.jsx)(`td`,{className:`cmp-cell`,children:t?(0,u.jsxs)(`div`,{className:`cmp-safety`,children:[(0,u.jsx)(`span`,{className:`cmp-safety-ring`,style:{background:t.color},children:t.score}),(0,u.jsx)(`span`,{className:`cmp-safety-lbl`,style:{color:t.color},children:t.label})]}):(0,u.jsx)(`span`,{className:`dm-muted`,children:`загрузка…`})},e.id)})]}),(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{className:`cmp-row-label`,children:`Стоимость`}),t.map(e=>(0,u.jsx)(`td`,{className:`cmp-cell`,style:{textTransform:`capitalize`},children:e.price_tier||`—`},e.id))]}),(0,u.jsxs)(`tr`,{children:[(0,u.jsxs)(`td`,{className:`cmp-row-label`,children:[`Совпадение состава`,(0,u.jsx)(`span`,{className:`cmp-row-sub`,children:`с первым средством`})]}),t.map((e,t)=>{let n=p(e,t);return(0,u.jsx)(`td`,{className:`cmp-cell`,children:t===0?(0,u.jsx)(`span`,{className:`cmp-base-pill`,children:`база сравнения`}):n==null?(0,u.jsx)(`span`,{className:`dm-muted`,children:`загрузка…`}):(0,u.jsxs)(`span`,{className:`cmp-sim-pct`,style:{"--m":n>=70?`#1f7a5c`:n>=45?`#c98a3a`:`#8b8f86`},children:[n,`%`]})},e.id)})]}),(0,u.jsxs)(`tr`,{children:[(0,u.jsxs)(`td`,{className:`cmp-row-label`,children:[`Состав`,(0,u.jsx)(`span`,{className:`cmp-row-sub`,children:`кол-во ингредиентов`})]}),t.map(e=>{let t=c[e.id]?c[e.id].length:null;return(0,u.jsx)(`td`,{className:`cmp-cell`,children:t??(0,u.jsx)(`span`,{className:`dm-muted`,children:`загрузка…`})},e.id)})]}),(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{className:`cmp-row-label`,children:`Комментарий`}),t.map(e=>(0,u.jsx)(`td`,{className:`cmp-cell`,children:e.notes&&String(e.notes).trim()?(0,u.jsx)(`span`,{className:`cmp-note-text`,children:String(e.notes).trim()}):(0,u.jsx)(`span`,{className:`dm-muted`,children:`нет`})},e.id))]})]})]})}),(0,u.jsxs)(`p`,{className:`cmp-tech`,style:{marginTop:14},children:[`Совпадение по составу — `,(0,u.jsx)(`b`,{children:`технический показатель`}),` относительно первого (базового) средства в списке. Чтобы подобрать замену по всей базе, откройте вкладку «Аналоги».`]})]}):(0,u.jsxs)(`div`,{className:`sim-tab`,children:[(0,u.jsx)(`div`,{className:`section-head`,children:(0,u.jsx)(`div`,{className:`section-title`,children:`Сравнение`})}),(0,u.jsxs)(`div`,{className:`cmp-empty`,children:[(0,u.jsx)(`p`,{className:`sim-intro`,style:{marginBottom:14},children:`Здесь можно сравнить до 5 средств одной категории: функции, состав, безопасность, стоимость и комментарии.`}),(0,u.jsx)(`p`,{className:`dm-muted`,children:`Откройте карточку любого средства и нажмите «Добавить в сравнение».`})]})]})}var ot=[`Витамины`,`Антиоксиданты`,`Кислоты`,`Протеины`,`Пептиды`,`Активы`,`Увлажнители`,`Масла`,`Липиды`],st=new Set([]),ct=e=>{let t=(e.inci_name||``).toLowerCase();if(st.has(t))return-1;let n=ot.indexOf(e.group);return n===-1?ot.length:n},lt=/[^\p{L}\p{N}\s\-+/().,'%·:&]/u,ut=e=>!e.group||/unknown|неразобран|\?\?\?/i.test(e.group||``)||lt.test(e.inci_name||``)||!(e.inci_name||``).trim();function dt({data:e=[],loading:t,onOpenDetail:n,editorMode:r=!1,onSaveIngredient:i}){let o=e=>n({kind:`ingredient`,inci:e.inci_name,ru:e.ru_name,description:e.description,is_eu_allergen:e.is_eu_allergen,groups:e.allGroups&&e.allGroups.length?e.allGroups.map(e=>({group:e.group,subgroup:e.subgroup,subgroup2:e.subgroup2})):[{group:e.group,subgroup:e.subgroup,subgroup2:e.subgroup2}]}),s=(e,t)=>n({kind:`group`,group:e,subgroup:t}),[c,l]=(0,a.useState)(``),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(``),[h,g]=(0,a.useState)(`active`),[_,v]=(0,a.useState)(!1),[y,b]=(0,a.useState)(50),[x,S]=(0,a.useState)(1),[C,w]=(0,a.useState)(null),[T,E]=(0,a.useState)(null),D=(0,a.useMemo)(()=>{let t=new Map;for(let n of e)n.group&&(t.has(n.group)||t.set(n.group,new Set),n.subgroup&&t.get(n.group).add(n.subgroup));return[...t.entries()].map(([e,t])=>({group:e,subs:[...t].sort()})).sort((e,t)=>e.group.localeCompare(t.group,`ru`))},[e]),O=(0,a.useMemo)(()=>e.filter(ut).length,[e]),k=e=>{let t=c.trim().toLowerCase();return!t||(e.inci_name||``).toLowerCase().includes(t)||(e.ru_name||``).toLowerCase().includes(t)?null:(e.aliases||``).split(`|`).map(e=>e.trim()).find(e=>e.toLowerCase().includes(t))||null},A=(0,a.useMemo)(()=>{let t=c.toLowerCase().trim(),n=e=>!(d&&e.group!==d||p&&e.subgroup!==p||_&&!ut(e)),r=e.filter(e=>(!t||(e.inci_name||``).toLowerCase().includes(t)||(e.ru_name||``).toLowerCase().includes(t)||(e.aliases||``).toLowerCase().includes(t))&&n(e));!r.length&&t.length>=4&&(r=e.filter(e=>(De(e.inci_name,t)||De(e.ru_name,t)||De(e.aliases,t))&&n(e)));let i=(e,t)=>(e.inci_name||``).localeCompare(t.inci_name||``,`ru`);return r=h===`alpha`?[...r].sort(i):h===`alpha-desc`?[...r].sort((e,t)=>i(t,e)):h===`group`?[...r].sort((e,t)=>(e.group||`я`).localeCompare(t.group||`я`,`ru`)||i(e,t)):[...r].sort((e,t)=>{let n=e=>e.description&&String(e.description).trim().length>0?0:1;return n(e)-n(t)||ct(e)-ct(t)||i(e,t)}),r},[e,c,d,p,_,h]),j=Math.max(1,Math.ceil(A.length/y)),M=Math.min(x,j),N=A.slice((M-1)*y,M*y),P=[];for(let e=1;e<=j;e++)e===1||e===j||Math.abs(e-M)<=1?P.push(e):P[P.length-1]!==`…`&&P.push(`…`);let ee=(e,t)=>{r&&w({id:e,field:t})},F=async(e,t,n)=>{if(w(null),i){E(e);try{await i(e,{[t]:n})}finally{E(null)}}};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`toolbar`,children:[(0,u.jsx)(`input`,{className:`search`,placeholder:`Поиск по названию или составляющей…`,value:c,onChange:e=>{l(e.target.value),S(1)}}),r&&(0,u.jsxs)(`label`,{className:`filter-check`,style:{whiteSpace:`nowrap`},title:`Записи без группы, с неразобранной категорией или некорректными символами`,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:_,onChange:()=>{v(e=>!e),S(1)}}),(0,u.jsxs)(`span`,{children:[`С ошибками`,O?` · ${O}`:``]})]})]}),(0,u.jsxs)(`div`,{className:`filter-pills`,children:[(0,u.jsx)(`span`,{className:`pill ${d?``:`active`}`,onClick:()=>{f(``),m(``),S(1)},children:`Все группы`}),D.map(e=>(0,u.jsx)(`span`,{className:`pill ${d===e.group?`active`:``}`,onClick:()=>{f(e.group),m(``),S(1)},children:e.group},e.group))]}),d&&D.find(e=>e.group===d&&e.subs.length>0)&&(0,u.jsxs)(`div`,{className:`filter-pills`,style:{marginTop:-6,paddingLeft:14},children:[(0,u.jsx)(`span`,{style:{color:`var(--ink-faint)`,fontSize:12,alignSelf:`center`,marginRight:4},children:`↳ подгруппы:`}),(0,u.jsx)(`span`,{className:`pill pill-sub ${p?``:`active`}`,onClick:()=>{m(``),S(1)},children:`Все`}),D.find(e=>e.group===d).subs.map(e=>(0,u.jsx)(`span`,{className:`pill pill-sub ${p===e?`active`:``}`,onClick:()=>{m(e),S(1)},children:e},e))]}),(0,u.jsxs)(`div`,{className:`section-head`,children:[(0,u.jsx)(`div`,{className:`section-title`,children:`Ингредиенты`}),(0,u.jsxs)(`div`,{className:`ing-head-right`,children:[(0,u.jsxs)(`select`,{className:`sim-select ing-sort`,value:h,onChange:e=>{g(e.target.value),S(1)},children:[(0,u.jsx)(`option`,{value:`active`,children:`Лучшие`}),(0,u.jsx)(`option`,{value:`alpha`,children:`По названию (А–Я)`}),(0,u.jsx)(`option`,{value:`alpha-desc`,children:`По названию (Я–А)`}),(0,u.jsx)(`option`,{value:`group`,children:`По группам`})]}),(0,u.jsxs)(`div`,{className:`count`,children:[A.length,` записей`,r&&` · редактирование включено`]})]})]}),t?(0,u.jsx)(Nt,{}):(0,u.jsx)(`div`,{className:`table-wrap`,children:(0,u.jsxs)(`table`,{children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{style:{width:`24%`},children:`Название`}),(0,u.jsx)(`th`,{style:{width:`20%`},children:`Русское название`}),(0,u.jsx)(`th`,{style:{width:`16%`},children:`Группа`}),(0,u.jsx)(`th`,{style:{width:`16%`},children:`Подгруппа`}),(0,u.jsx)(`th`,{style:{width:`24%`},children:`Описание`})]})}),(0,u.jsx)(`tbody`,{children:N.map(e=>(0,u.jsxs)(`tr`,{className:T===e.id?`row-saving`:``,children:[(0,u.jsxs)(`td`,{className:`td-inci`,children:[(0,u.jsx)(`span`,{className:`inci-link`,onClick:()=>o(e),children:e.inci_name}),e.is_eu_allergen&&(0,u.jsx)(`span`,{className:`badge-eu`,style:{marginLeft:7},title:`Аллерген из списка EU-26`,children:`Аллерген`}),k(e)&&(0,u.jsxs)(`div`,{style:{fontSize:11,color:`var(--ink-faint)`,marginTop:2},title:`Совпадение по альтернативному написанию этого ингредиента`,children:[`найдено по алиасу: `,(0,u.jsx)(`span`,{style:{color:`var(--ink-soft)`},children:k(e)})]})]}),(0,u.jsx)(`td`,{children:r&&C?.id===e.id&&C?.field===`ru_name`?(0,u.jsx)(`input`,{className:`cell-input`,autoFocus:!0,defaultValue:e.ru_name||``,onBlur:t=>F(e.id,`ru_name`,t.target.value),onKeyDown:t=>t.key===`Enter`&&F(e.id,`ru_name`,t.target.value)}):(0,u.jsx)(`span`,{className:r?`cell-edit-hint`:``,onClick:()=>ee(e.id,`ru_name`),style:{color:e.ru_name?`var(--ink-soft)`:`var(--ink-faint)`},children:e.ru_name||`–`})}),(0,u.jsx)(`td`,{children:e.group?(0,u.jsx)(`span`,{className:`g-tag ${r?`cell-edit-hint`:``}`,style:{display:`inline-block`,background:K(e.group)+`1f`,color:K(e.group),cursor:`pointer`},onClick:()=>s(e.group),children:e.group}):(0,u.jsx)(`span`,{style:{color:`var(--ink-faint)`},children:`–`})}),(0,u.jsx)(`td`,{style:{color:`var(--ink-soft)`,fontSize:14.5,fontWeight:600},children:e.subgroup?(0,u.jsx)(`span`,{className:`inci-link`,onClick:()=>s(e.group,e.subgroup),children:e.subgroup}):`–`}),(0,u.jsx)(`td`,{style:{color:`var(--ink-soft)`,fontSize:13,lineHeight:1.5},children:r&&C?.id===e.id&&C?.field===`description`?(0,u.jsx)(`input`,{className:`cell-input`,autoFocus:!0,defaultValue:e.description||``,onBlur:t=>F(e.id,`description`,t.target.value),onKeyDown:t=>t.key===`Enter`&&F(e.id,`description`,t.target.value)}):(0,u.jsx)(`span`,{className:r?`cell-edit-hint`:``,onClick:()=>ee(e.id,`description`),children:e.description||`–`})})]},e.id))})]})}),(0,u.jsx)(()=>(0,u.jsxs)(`div`,{className:`pager`,children:[(0,u.jsxs)(`div`,{className:`pg-size`,children:[`Показывать`,(0,u.jsxs)(`select`,{value:y,onChange:e=>{b(Number(e.target.value)),S(1)},children:[(0,u.jsx)(`option`,{value:25,children:`25`}),(0,u.jsx)(`option`,{value:50,children:`50`}),(0,u.jsx)(`option`,{value:100,children:`100`}),(0,u.jsx)(`option`,{value:200,children:`200`})]}),`на странице · всего `,A.length]}),(0,u.jsxs)(`div`,{className:`pager-controls`,children:[(0,u.jsx)(`button`,{className:`pg-btn`,disabled:M===1,onClick:()=>S(M-1),children:`‹`}),P.map((e,t)=>e===`…`?(0,u.jsx)(`span`,{style:{color:`var(--ink-faint)`,padding:`0 4px`},children:`…`},`e`+t):(0,u.jsx)(`button`,{className:`pg-btn ${e===M?`active`:``}`,onClick:()=>S(e),children:e},e)),(0,u.jsx)(`button`,{className:`pg-btn`,disabled:M===j,onClick:()=>S(M+1),children:`›`})]})]}),{})]})}function ft(e){let t=e.replace(/[;\n\r]+/g,`, `);return t=t.replace(/,[ \t]+/g,`, `),t.split(`, `).map(e=>e.trim()).filter(Boolean)}var pt=`авекмнорстух`,mt=`abekmhopctyx`,ht=e=>e.replace(/[авекмнорстух]/g,e=>mt[pt.indexOf(e)]);function gt(e){return ht((e||``).toLowerCase()).replace(/[_\-*]/g,` `).replace(/\([^)]*\)/g,` `).replace(/\s*\d+([.,\s]\d+)*\s*(ppm|ppb|%|iu\/?g?)\s*$/i,``).replace(/\s*\/\s*/g,`/`).trim().replace(/\s+/g,` `)}function _t(e){return ht((e||``).toLowerCase()).replace(/[_\-*]/g,``).replace(/[^ -~]/g,``).replace(/\([^)]*\)/g,``).replace(/[^a-z0-9/]/g,``)}function vt(e){let t=new Map,n=new Map;for(let r of e){let e=[r.inci_name,...r.aliases?r.aliases.split(`|`):[]];for(let i of e){let e=gt(i);e&&!t.has(e)&&t.set(e,r);let a=_t(i);if(a.length>=4){let e=n.get(a);e===void 0?n.set(a,r):e&&e.id!==r.id&&n.set(a,null)}}}return{strict:t,aggressive:n}}function yt(e,t){let n=gt(e),r=n?t.strict.get(n):null;if(r)return{ing:r,source:r.inci_name?.toLowerCase()===(e||``).trim().toLowerCase()?`exact`:`norm`};let i=_t(e);if(i.length>=4){let e=t.aggressive.get(i);if(e)return{ing:e,source:`ocr`}}return null}var Q=1200;async function $(e){let t=`product_${Date.now()}.webp`,n;try{n=await fetch(`${L}/storage/v1/object/product-images/${t}`,{method:`POST`,headers:{apikey:R,Authorization:`Bearer ${z||R}`,"Content-Type":`image/webp`,"x-upsert":`true`},body:e})}catch(e){throw Error(`[Storage] Сетевая ошибка при загрузке в Supabase: ${e.message}`)}if(!n.ok){let e=``;try{let t=await n.json();e=t?.error||t?.message||JSON.stringify(t)}catch{e=await n.text().catch(()=>n.statusText)}throw n.status===400?Error(`[Storage 400] Неверный запрос. Проверьте название bucket "product-images". Детали: ${e}`):n.status===401||n.status===403?Error(`[Storage ${n.status}] Нет прав записи в bucket. Проверьте что bucket "product-images" публичный. Детали: ${e}`):n.status===404?Error(`[Storage 404] Bucket "product-images" не найден — создайте его в Supabase → Storage.`):Error(`[Storage ${n.status}] ${e}`)}return{url:`${L}/storage/v1/object/public/product-images/${t}`,kb:Math.round(e.size/1024)}}async function bt(e){let t;try{t=await createImageBitmap(e)}catch(e){throw Error(`[Resize] Не удалось декодировать изображение: ${e.message}. Попробуйте другой файл или формат.`)}let n=document.createElement(`canvas`);n.width=Q,n.height=Q;let r=n.getContext(`2d`),i=Math.min(Q/t.width,Q/t.height),a=t.width*i,o=t.height*i;return r.clearRect(0,0,Q,Q),r.drawImage(t,(Q-a)/2,(Q-o)/2,a,o),new Promise((e,t)=>n.toBlob(n=>n?e(n):t(Error(`[Resize] canvas.toBlob вернул null — браузер не поддерживает WebP?`)),`image/webp`,.88))}async function xt(e,t){let n=new FormData;n.append(`image_file`,e),n.append(`size`,`auto`);let r;try{r=await fetch(`https://api.remove.bg/v1.0/removebg`,{method:`POST`,headers:{"X-Api-Key":t},body:n})}catch(e){throw Error(`[remove.bg] Сетевая ошибка: ${e.message}. Проверьте интернет-соединение.`)}if(!r.ok){let e=``;try{let t=await r.json();e=t?.errors?.[0]?.title||JSON.stringify(t)}catch{e=r.statusText}throw r.status===402?Error(`[remove.bg 402] Лимит бесплатных запросов исчерпан. Переключитесь на режим "Без удаления".`):r.status===403?Error(`[remove.bg 403] Неверный API-ключ. Проверьте ключ в настройках ⚙.`):Error(`[remove.bg ${r.status}] ${e}`)}return r.blob()}async function St(e){let t;try{t=await createImageBitmap(e)}catch(e){throw Error(`[BlobToWebP] Не удалось прочитать результат remove.bg: ${e.message}`)}let n=document.createElement(`canvas`);n.width=Q,n.height=Q;let r=n.getContext(`2d`),i=Math.min(Q/t.width,Q/t.height),a=t.width*i,o=t.height*i;return r.clearRect(0,0,Q,Q),r.drawImage(t,(Q-a)/2,(Q-o)/2,a,o),new Promise((e,t)=>n.toBlob(n=>n?e(n):t(Error(`[BlobToWebP] canvas.toBlob вернул null`)),`image/webp`,.88))}async function Ct(e){try{new URL(e)}catch{throw Error(`[URL] Некорректный URL. Убедитесь что ссылка начинается с https://`)}let t=`https://corsproxy.io/?${encodeURIComponent(e)}`,n;try{n=await fetch(t)}catch(e){throw Error(`[URL] Не удалось подключиться через прокси: ${e.message}. Попробуйте загрузить файлом с компьютера.`)}if(!n.ok)throw n.status===403?Error(`[URL 403] Сайт запрещает скачивание картинок. Загрузите файлом с компьютера.`):n.status===404?Error(`[URL 404] Изображение не найдено по этому URL.`):Error(`[URL ${n.status}] Ошибка загрузки. Попробуйте загрузить файлом.`);let r=await n.blob().catch(e=>{throw Error(`[URL] Не удалось прочитать ответ: ${e.message}`)});if(!r.type.startsWith(`image/`))throw Error(`[URL] Ответ не является изображением (тип: ${r.type}). Попробуйте другую ссылку.`);return r}function wt({onDone:e,removeBgKey:t}){let[n,r]=(0,a.useState)(`url`),[i,o]=(0,a.useState)(``),[s,c]=(0,a.useState)(`removebg`),[l,d]=(0,a.useState)(`idle`),[f,p]=(0,a.useState)([]),[m,h]=(0,a.useState)(``),[g,_]=(0,a.useState)(null),[v,y]=(0,a.useState)(null),b=(0,a.useRef)(),x=(e,t=`active`)=>p(n=>[...n.map(e=>e.state===`active`?{...e,state:`done`}:e),{msg:e,state:t}]),S=()=>{d(`idle`),p([]),h(``),_(null),y(null),o(``),b.current&&(b.current.value=``),e(null)},C=async n=>{d(`loading`),p([]),h(``),_(null);try{x(`Загружаю изображение...`);let r=await n();x(`Изображение получено (${Math.round(r.size/1024)} КБ, тип: ${r.type})`);let i;if(s===`removebg`){if(!t?.trim())throw Error(`[Настройки] Не введён API-ключ remove.bg. Нажмите ⚙ в правом верхнем углу.`);x(`Масштабирую для отправки в remove.bg...`);let e=await bt(r);x(`Масштабировано (${Math.round(e.size/1024)} КБ). Отправляю в remove.bg...`);let n=await xt(e,t.trim());x(`Фон удалён (${Math.round(n.size/1024)} КБ). Финальная обработка...`),i=await St(n)}else x(`Масштабирую до 1200×1200 WebP...`),i=await bt(r);x(`Изображение готово (${Math.round(i.size/1024)} КБ). Загружаю в Storage...`);let{url:a,kb:o}=await $(i);x(`Сохранено в Supabase Storage ✓`,`done`),_(a),y(o),d(`done`),e(a)}catch(t){d(`error`),h(t.message),p(e=>e.map((t,n)=>n===e.length-1?{...t,state:`error`}:t)),e(null)}};return(0,u.jsxs)(`div`,{children:[(0,u.jsxs)(`div`,{style:{display:`flex`,gap:8,marginBottom:10,alignItems:`center`,flexWrap:`wrap`},children:[(0,u.jsx)(`div`,{style:{display:`flex`,border:`1.5px solid var(--sand)`,borderRadius:8,overflow:`hidden`},children:[`url`,`file`].map(e=>(0,u.jsx)(`button`,{onClick:()=>{r(e),S()},style:{padding:`7px 16px`,fontSize:12,fontWeight:500,background:n===e?`var(--deep)`:`white`,color:n===e?`var(--cream)`:`var(--brown)`,border:`none`,cursor:`pointer`,fontFamily:`inherit`},children:e===`url`?`По ссылке`:`С компьютера`},e))}),(0,u.jsxs)(`div`,{style:{display:`flex`,border:`1.5px solid var(--sand)`,borderRadius:8,overflow:`hidden`,marginLeft:`auto`},children:[(0,u.jsx)(`button`,{onClick:()=>c(`removebg`),style:{padding:`7px 12px`,fontSize:11,fontWeight:500,background:s===`removebg`?`#1D9E75`:`white`,color:s===`removebg`?`white`:`var(--brown)`,border:`none`,cursor:`pointer`,fontFamily:`inherit`},children:`remove.bg`}),(0,u.jsx)(`button`,{onClick:()=>c(`nobg`),style:{padding:`7px 12px`,fontSize:11,fontWeight:500,background:s===`nobg`?`var(--brown)`:`white`,color:s===`nobg`?`white`:`var(--brown)`,border:`none`,cursor:`pointer`,fontFamily:`inherit`},children:`Без удаления`})]})]}),s===`removebg`&&!t?.trim()&&(0,u.jsx)(`div`,{style:{fontSize:12,color:`var(--rose)`,background:`#fdf0ee`,padding:`8px 12px`,borderRadius:8,marginBottom:10},children:`⚠ Введите API-ключ remove.bg — нажмите ⚙ вверху`}),l!==`done`&&(n===`url`?(0,u.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,u.jsx)(`input`,{className:`form-input`,style:{flex:1},value:i,onChange:e=>o(e.target.value),placeholder:`https://...`,disabled:l===`loading`,onKeyDown:e=>e.key===`Enter`&&i.trim()&&C(()=>Ct(i.trim()))}),(0,u.jsx)(`button`,{className:`btn btn-ghost`,style:{flexShrink:0},onClick:()=>C(()=>Ct(i.trim())),disabled:!i.trim()||l===`loading`,children:l===`loading`?`...`:`Обработать`})]}):(0,u.jsxs)(`div`,{onClick:()=>b.current?.click(),style:{border:`2px dashed var(--sand)`,borderRadius:10,padding:`18px`,textAlign:`center`,cursor:l===`loading`?`default`:`pointer`,background:`var(--warm)`},onMouseEnter:e=>{l!==`loading`&&(e.currentTarget.style.borderColor=`var(--gold)`)},onMouseLeave:e=>e.currentTarget.style.borderColor=`var(--sand)`,children:[(0,u.jsx)(`div`,{style:{fontSize:22,marginBottom:5},children:`📁`}),(0,u.jsx)(`div`,{style:{fontSize:13,color:`var(--brown)`,fontWeight:500},children:l===`loading`?`Обработка...`:`Нажмите чтобы выбрать файл`}),(0,u.jsx)(`div`,{style:{fontSize:11,color:`var(--dust)`,marginTop:3},children:`JPG, PNG, WebP`}),(0,u.jsx)(`input`,{ref:b,type:`file`,accept:`image/*`,style:{display:`none`},onChange:e=>{let t=e.target.files?.[0];t&&C(()=>Promise.resolve(t))}})]})),f.length>0&&(0,u.jsx)(`div`,{style:{marginTop:10,background:`var(--warm)`,borderRadius:10,padding:`10px 14px`},children:f.map((e,t)=>(0,u.jsxs)(`div`,{style:{fontSize:12,padding:`3px 0`,color:e.state===`error`?`var(--rose)`:e.state===`done`?`var(--sage)`:`var(--brown)`,display:`flex`,gap:6,alignItems:`flex-start`},children:[(0,u.jsx)(`span`,{style:{flexShrink:0},children:e.state===`done`?`✓`:e.state===`error`?`✕`:`⏳`}),(0,u.jsx)(`span`,{children:e.msg})]},t))}),l===`error`&&m&&(0,u.jsxs)(`div`,{style:{marginTop:8},children:[(0,u.jsx)(`div`,{style:{background:`#fdf0ee`,border:`1px solid #e0b0aa`,color:`var(--rose)`,padding:`10px 14px`,borderRadius:8,fontSize:13,marginBottom:8},children:m}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,u.jsx)(`button`,{className:`btn btn-ghost btn-sm`,onClick:S,children:`Попробовать снова`}),s===`removebg`&&(0,u.jsx)(`button`,{className:`btn btn-ghost btn-sm`,onClick:()=>{c(`nobg`),S()},children:`Попробовать без удаления фона`}),n===`url`&&(0,u.jsx)(`button`,{className:`btn btn-ghost btn-sm`,onClick:()=>{r(`file`),S()},children:`Загрузить файлом`})]})]}),l===`done`&&g&&(0,u.jsxs)(`div`,{style:{marginTop:10,display:`flex`,alignItems:`center`,gap:14,padding:`10px 14px`,background:`var(--warm)`,borderRadius:10},children:[(0,u.jsx)(`div`,{style:{width:80,height:80,borderRadius:8,flexShrink:0,overflow:`hidden`,background:`repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 0 / 10px 10px`},children:(0,u.jsx)(`img`,{src:g,alt:`preview`,style:{width:`100%`,height:`100%`,objectFit:`contain`}})}),(0,u.jsxs)(`div`,{style:{flex:1},children:[(0,u.jsx)(`div`,{style:{fontSize:13,fontWeight:500,color:`var(--sage)`},children:s===`removebg`?`✓ Фон удалён`:`✓ Сохранено`}),(0,u.jsxs)(`div`,{style:{fontSize:11,color:`var(--dust)`,marginTop:3},children:[`1200×1200 WebP · `,v,` КБ`]})]}),(0,u.jsx)(`button`,{onClick:S,style:{background:`none`,border:`none`,fontSize:18,color:`var(--dust)`,cursor:`pointer`,padding:`0 4px`},children:`×`})]})]})}function Tt(e,t,n=[]){let r=e=>(e||``).toString().toLowerCase().replace(/\s+/g,` `).trim(),i=r(e),a=r(t);return i?n.filter(e=>{let t=r(e.name),n=r(e.brand);return!t||!(t===i||i.length>4&&(t.includes(i)||i.includes(t))||Ee(t,i,2)<=2)?!1:a&&n?n===a||n.includes(a)||a.includes(n)||Ee(n,a,1)<=1:!0}).slice(0,6):[]}function Et({ingredients:e,products:t=[],onClose:n,onSaved:r,removeBgKey:i}){let[o,s]=(0,a.useState)([]),[c,l]=(0,a.useState)(``),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(null),[h,g]=(0,a.useState)(``),[_,v]=(0,a.useState)([]),[y,b]=(0,a.useState)(!1),[x,S]=(0,a.useState)(``),C=(0,a.useMemo)(()=>vt(e),[e]),w=e=>{g(e),v(e.trim()?ft(e):[])},T=e=>v(t=>t.filter((t,n)=>n!==e)),E=(e,t)=>v(n=>n.map((n,r)=>r===e?t:n)),D=e=>v(t=>{let n=[...t];return n.splice(e+1,0,``),n}),O=async(e=!1)=>{if(!c.trim()){S(`Введите название средства`);return}if(!e){let e=Tt(c,d,t);if(e.length){s(e),S(``);return}}b(!0),S(``),s([]);try{let[e]=await U(`/products`,{method:`POST`,body:JSON.stringify({name:c.trim(),brand:d.trim()||null,image_url:p||null})}),t=_.filter(e=>e.trim());if(t.length>0){let n=t.map((t,n)=>{let r=yt(t,C);return{product_id:e.id,ingredient_id:r?.ing.id||null,position:n+1,raw_inci_name:t.trim(),match_source:r?.source||null}});await U(`/product_ingredients`,{method:`POST`,body:JSON.stringify(n)})}r()}catch(e){S(`Ошибка сохранения: `+e.message)}finally{b(!1)}},k=_.filter(e=>e.trim()).length,A=(0,a.useMemo)(()=>_.filter(e=>e.trim()&&yt(e,C)).length,[_,C]);return(0,u.jsx)(`div`,{className:`modal-overlay`,onClick:n,children:(0,u.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(`button`,{className:`modal-close`,onClick:n,children:`✕`}),(0,u.jsx)(`div`,{className:`modal-title`,children:`Новое средство`}),x&&(0,u.jsx)(`div`,{className:`error-msg`,children:x}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Название *`}),(0,u.jsx)(`input`,{className:`form-input`,value:c,onChange:e=>l(e.target.value),placeholder:`Например: Пенка Madagascar Centella`})]}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Бренд`}),(0,u.jsx)(`input`,{className:`form-input`,value:d,onChange:e=>f(e.target.value),placeholder:`Например: SKIN1004`})]}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsxs)(`label`,{className:`form-label`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,u.jsx)(`span`,{children:`Изображение`}),(0,u.jsx)(`span`,{style:{fontWeight:400,color:`var(--dust)`,textTransform:`none`,letterSpacing:0,fontSize:11},children:`необязательно — можно добавить позже`})]}),(0,u.jsx)(wt,{onDone:e=>m(e),removeBgKey:i})]}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Состав (вставьте одним текстом)`}),(0,u.jsx)(`textarea`,{className:`form-input form-textarea`,style:{minHeight:90,fontFamily:`monospace`,fontSize:12},value:h,onChange:e=>w(e.target.value),placeholder:`Centella Asiatica Extract (30%), Glycerin, 1,2-Hexanediol, Aqua...`}),k>0&&(0,u.jsxs)(`div`,{style:{fontSize:12,color:`var(--sage)`,marginTop:5},children:[`✓ Распознано `,k,` ингредиентов · в справочнике найдено `,A,A<k&&(0,u.jsx)(`span`,{style:{color:`var(--dust)`},children:` · ненайденные сохранятся текстом`})]})]}),_.length>0&&(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsxs)(`label`,{className:`form-label`,style:{display:`flex`,justifyContent:`space-between`},children:[(0,u.jsx)(`span`,{children:`Список ингредиентов`}),(0,u.jsx)(`span`,{style:{fontWeight:400,color:`var(--dust)`,textTransform:`none`,letterSpacing:0,fontSize:11},children:`+ между строками — вставить новую`})]}),(0,u.jsx)(`div`,{style:{maxHeight:300,overflowY:`auto`,border:`1px solid var(--sand)`,borderRadius:8,padding:`4px 8px`},children:_.map((e,t)=>{let n=e.trim()?yt(e,C):null;return(0,u.jsxs)(`div`,{children:[(0,u.jsxs)(`div`,{className:`ing-add-row`,children:[(0,u.jsx)(`span`,{style:{fontSize:11,color:`var(--dust)`,width:22,textAlign:`right`,flexShrink:0},children:t+1}),(0,u.jsx)(`input`,{className:`form-input`,style:{flex:1,padding:`6px 10px`,fontSize:13,borderColor:e.trim()?``:`var(--rose)`},value:e,onChange:e=>E(t,e.target.value),placeholder:`Название компонента`}),(0,u.jsx)(`span`,{title:n?`Найден в справочнике: ${n.ing.inci_name}${n.ing.ru_name?` · ${n.ing.ru_name}`:``}`:e.trim()?`Не найден в справочнике — сохранится текстом`:``,style:{width:16,textAlign:`center`,flexShrink:0,fontSize:12,cursor:`default`,color:n?`var(--sage)`:`var(--dust)`},children:n?`✓`:e.trim()?`?`:``}),(0,u.jsx)(`button`,{className:`ing-remove`,onClick:()=>T(t),children:`×`})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6,margin:`1px 0 1px 28px`},children:[(0,u.jsxs)(`button`,{onClick:()=>D(t),style:{background:`none`,border:`none`,cursor:`pointer`,fontSize:11,color:`var(--dust)`,padding:`0 4px`,display:`flex`,alignItems:`center`,gap:3},children:[(0,u.jsx)(`span`,{style:{fontSize:14},children:`+`}),(0,u.jsx)(`span`,{children:`вставить`})]}),(0,u.jsx)(`div`,{style:{flex:1,height:`0.5px`,background:`var(--warm)`}})]})]},t)})})]}),o.length>0&&(0,u.jsxs)(`div`,{style:{marginTop:`1rem`,padding:`12px 14px`,borderRadius:10,background:`rgba(201,138,58,0.10)`,border:`1px solid rgba(201,138,58,0.32)`},children:[(0,u.jsx)(`div`,{style:{fontWeight:700,fontSize:13,color:`#9a6b22`,marginBottom:7},children:`Возможно, такое средство уже есть в каталоге:`}),(0,u.jsx)(`ul`,{style:{margin:`0 0 10px`,paddingLeft:18,fontSize:13,color:`var(--ink-soft)`,lineHeight:1.6},children:o.map(e=>(0,u.jsxs)(`li`,{children:[e.name,e.brand?` · ${e.brand}`:``]},e.id))}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,u.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:()=>s([]),children:`Проверю и поправлю`}),(0,u.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>O(!0),disabled:y,children:`Всё равно добавить`})]})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:10,justifyContent:`flex-end`,marginTop:`1rem`},children:[(0,u.jsx)(`button`,{className:`btn btn-ghost`,onClick:n,children:`Отмена`}),(0,u.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>O(),disabled:y||!c.trim(),children:y?`Сохранение...`:`Сохранить${k>0?` (${k} ингр.)`:``}`})]})]})})}function Dt({onClose:e,onSaved:t}){let[n,r]=(0,a.useState)(``),[i,o]=(0,a.useState)(``),[s,c]=(0,a.useState)(``),[l,d]=(0,a.useState)(``),[f,p]=(0,a.useState)(``),[m,h]=(0,a.useState)(!1),[g,_]=(0,a.useState)(``);return(0,u.jsx)(`div`,{className:`modal-overlay`,onClick:e,children:(0,u.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(`button`,{className:`modal-close`,onClick:e,children:`✕`}),(0,u.jsx)(`div`,{className:`modal-title`,children:`Новый ингредиент`}),g&&(0,u.jsx)(`div`,{className:`error-msg`,children:g}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Название *`}),(0,u.jsx)(`input`,{className:`form-input`,value:n,onChange:e=>r(e.target.value),placeholder:`Например: Aqua`})]}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Русское название`}),(0,u.jsx)(`input`,{className:`form-input`,value:i,onChange:e=>o(e.target.value),placeholder:`Например: Вода`})]}),(0,u.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:12},children:[(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Группа`}),(0,u.jsx)(`input`,{className:`form-input`,value:s,onChange:e=>c(e.target.value),placeholder:`Например: Растворители`})]}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Подгруппа`}),(0,u.jsx)(`input`,{className:`form-input`,value:l,onChange:e=>d(e.target.value)})]})]}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Описание`}),(0,u.jsx)(`textarea`,{className:`form-input form-textarea`,value:f,onChange:e=>p(e.target.value),placeholder:`Краткое описание компонента...`})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:10,justifyContent:`flex-end`,marginTop:`1rem`},children:[(0,u.jsx)(`button`,{className:`btn btn-ghost`,onClick:e,children:`Отмена`}),(0,u.jsx)(`button`,{className:`btn btn-primary`,onClick:async()=>{if(!n.trim()){_(`Введите название`);return}h(!0),_(``);try{let[e]=await U(`/ingredients`,{method:`POST`,body:JSON.stringify({inci_name:n.trim(),ru_name:i.trim()||null,description:f.trim()||null})});s.trim()&&e?.id&&await U(`/ingredient_groups`,{method:`POST`,body:JSON.stringify({ingredient_id:e.id,group:s.trim(),subgroup:l.trim()||null,is_primary:!0})}),t()}catch(e){_(`Ошибка: `+e.message)}finally{h(!1)}},disabled:m,children:m?`Сохранение...`:`Сохранить`})]})]})})}var Ot={pink:`/flowers/flower-pink.png`,blue:`/flowers/flower-blue.png`},kt=[{img:`pink`,hue:0,size:560,left:`-11%`,top:`-8%`,opacity:.08,rot:14,blur:0},{img:`blue`,hue:260,size:380,left:`86%`,top:`5%`,opacity:.07,rot:-22,blur:0},{img:`blue`,hue:140,size:640,left:`76%`,top:`58%`,opacity:.06,rot:-10,blur:8},{img:`pink`,hue:45,size:300,left:`-5%`,top:`62%`,opacity:.06,rot:28,blur:5}];function At(){return(0,u.jsxs)(`div`,{className:`flowers-backdrop`,"aria-hidden":`true`,children:[(0,u.jsx)(`div`,{className:`bg-blob bg-blob-1`}),(0,u.jsx)(`div`,{className:`bg-blob bg-blob-2`}),kt.map(({img:e,hue:t,size:n,left:r,top:i,opacity:a,rot:o,blur:s},c)=>(0,u.jsx)(`img`,{src:Ot[e],alt:``,width:n,height:n,style:{position:`absolute`,left:r,top:i,width:n,height:n,opacity:a,objectFit:`contain`,transform:`rotate(${o}deg)`,filter:`${t?`hue-rotate(${t}deg) saturate(1.15)`:`saturate(1.05)`}${s?` blur(${s}px)`:``}`}},c))]})}function jt({pw:e}){let{score:t,label:n,color:r,checks:i}=G(e);return e?(0,u.jsxs)(`div`,{className:`pw-meter`,children:[(0,u.jsx)(`div`,{className:`pw-bar`,children:[0,1,2,3].map(e=>(0,u.jsx)(`div`,{className:`pw-seg`,style:{background:e<t?r:`rgba(0,0,0,0.10)`}},e))}),(0,u.jsx)(`div`,{className:`pw-label`,style:{color:r},children:n}),(0,u.jsxs)(`ul`,{className:`pw-hints`,children:[(0,u.jsx)(`li`,{className:i.len?`ok`:``,children:`от 8 символов`}),(0,u.jsx)(`li`,{className:i.case?`ok`:``,children:`строчные и ЗАГЛАВНЫЕ`}),(0,u.jsx)(`li`,{className:i.digit?`ok`:``,children:`цифра`}),(0,u.jsx)(`li`,{className:i.special?`ok`:``,children:`символ (!@#…)`})]})]}):null}function Mt({count:e=12}){return(0,u.jsx)(`div`,{className:`grid`,"aria-hidden":`true`,children:Array.from({length:e}).map((e,t)=>(0,u.jsxs)(`div`,{className:`sk-card`,children:[(0,u.jsx)(`div`,{className:`sk sk-media`}),(0,u.jsxs)(`div`,{className:`sk-body`,children:[(0,u.jsx)(`div`,{className:`sk sk-line`,style:{width:`90%`}}),(0,u.jsx)(`div`,{className:`sk sk-line`,style:{width:`65%`}}),(0,u.jsx)(`div`,{className:`sk sk-line`,style:{width:`40%`,marginTop:4}})]})]},t))})}function Nt({count:e=10}){return(0,u.jsx)(`div`,{"aria-hidden":`true`,style:{padding:`0 4px`},children:Array.from({length:e}).map((e,t)=>(0,u.jsxs)(`div`,{className:`sk-row`,children:[(0,u.jsx)(`div`,{className:`sk sk-line`,style:{width:`26%`}}),(0,u.jsx)(`div`,{className:`sk sk-line`,style:{width:`18%`}}),(0,u.jsx)(`div`,{className:`sk sk-line`,style:{width:`14%`}}),(0,u.jsx)(`div`,{className:`sk sk-line`,style:{flex:1}})]},t))})}function Pt(){let[e,t]=(0,a.useState)({x:0,y:0}),n=(0,a.useRef)(null);(0,a.useEffect)(()=>{let e=e=>{let r=n.current;if(!r)return;let i=r.getBoundingClientRect(),a=i.left+i.width/2,o=i.top+i.height/2,s=e=>Math.max(-1,Math.min(1,e));t({x:s((e.clientX-a)/(window.innerWidth/2)),y:s((e.clientY-o)/(window.innerHeight/2))})};return window.addEventListener(`mousemove`,e),()=>window.removeEventListener(`mousemove`,e)},[]);let r={lx:43.5,ly:47.5,rx:58.8,ry:46.6},i=e.x*4,o=e.y*4,c=({leftPct:e,topPct:t})=>(0,u.jsxs)(`span`,{className:`me-eye`,style:{left:`${e}%`,top:`${t}%`},children:[(0,u.jsx)(`span`,{className:`me-patch`}),(0,u.jsx)(`span`,{className:`me-pupil`,style:{transform:`translate(${i}px, ${o}px)`}})]});return(0,u.jsxs)(`div`,{className:`loading-inline`,children:[(0,u.jsxs)(`div`,{className:`loading-mascot`,ref:n,children:[(0,u.jsx)(`img`,{src:s,alt:``,draggable:`false`}),(0,u.jsx)(c,{leftPct:r.lx,topPct:r.ly}),(0,u.jsx)(c,{leftPct:r.rx,topPct:r.ry})]}),(0,u.jsxs)(`div`,{className:`loading-dots`,children:[(0,u.jsx)(`span`,{}),(0,u.jsx)(`span`,{}),(0,u.jsx)(`span`,{})]})]})}function Ft({shut:e=!1}){let[t,n]=(0,a.useState)({x:0,y:0}),r=(0,a.useRef)(null);(0,a.useEffect)(()=>{let e=e=>{let t=r.current;if(!t)return;let i=t.getBoundingClientRect(),a=i.left+i.width/2,o=i.top+i.height/2,s=e=>Math.max(-1,Math.min(1,e));n({x:s((e.clientX-a)/(window.innerWidth/2)),y:s((e.clientY-o)/(window.innerHeight/2))})};return window.addEventListener(`mousemove`,e),()=>window.removeEventListener(`mousemove`,e)},[]);let i={lx:43.5,ly:47.5,rx:58.8,ry:46.6},o=t.x*4,c=t.y*4,l=(t,n)=>(0,u.jsxs)(`span`,{className:`me-eye`,style:{left:`${t}%`,top:`${n}%`},children:[(0,u.jsx)(`span`,{className:`me-patch`}),e?(0,u.jsx)(`svg`,{viewBox:`0 0 28 16`,className:`me-closed`,children:(0,u.jsx)(`path`,{d:`M4 6 Q14 15 24 6`})}):(0,u.jsx)(`span`,{className:`me-pupil`,style:{transform:`translate(${o}px, ${c}px)`}})]});return(0,u.jsxs)(`div`,{className:`me-figure`,ref:r,children:[(0,u.jsx)(`img`,{src:s,alt:``,draggable:`false`}),l(i.lx,i.ly),l(i.rx,i.ry)]})}function It({onSuccess:e,onShowRegister:t,onBack:n}){let[r,i]=(0,a.useState)(``),[o,s]=(0,a.useState)(``),[c,l]=(0,a.useState)(!1),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(``),[h,g]=(0,a.useState)(!1),_=async()=>{if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.trim())){f(`Введите почту, и мы отправим ссылку для сброса пароля`);return}l(!0),f(``),m(``);try{await he(r.trim()),m(`Отправили письмо со ссылкой для сброса пароля`)}catch(e){f(e.message)}finally{l(!1)}},v=e=>{let t=(e||``).toLowerCase();return t.includes(`invalid login`)||t.includes(`invalid`)||t.includes(`credentials`)?`Неверная почта или пароль`:t.includes(`email not confirmed`)||t.includes(`not confirmed`)?`Почта не подтверждена. Проверьте письмо со ссылкой`:t.includes(`rate`)||t.includes(`too many`)||t.includes(`limit`)?`Слишком много попыток. Попробуйте чуть позже`:t.includes(`network`)||t.includes(`failed to fetch`)||t.includes(`fetch`)?`Нет соединения. Проверьте интернет`:t.includes(`user not found`)?`Неверная почта или пароль`:e||`Не удалось войти. Попробуйте ещё раз`},y=()=>r.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.trim())?o?null:`Введите пароль`:`Проверьте формат почты`:`Введите почту`,b=async()=>{let t=y();if(t){f(t);return}l(!0),f(``);try{await pe(r.trim(),o),e()}catch(e){f(v(e.message))}finally{l(!1)}},x=e=>{e.key===`Enter`&&b()};return(0,u.jsx)(`div`,{className:`login3-wrap`,onClick:e=>{n&&!e.target.closest(`.login3-card`)&&n()},children:(0,u.jsxs)(`div`,{className:`login3-stage`,children:[(0,u.jsx)(Ft,{shut:h}),(0,u.jsxs)(`div`,{className:`login3-card`,children:[(0,u.jsxs)(`h1`,{className:`login3-title`,children:[`beauty `,(0,u.jsx)(`span`,{children:`helper`})]}),(0,u.jsx)(`p`,{className:`login3-sub`,children:`Войдите, чтобы продолжить`}),d&&(0,u.jsx)(`div`,{className:`login3-error`,children:d}),p&&(0,u.jsx)(`div`,{className:`login3-info`,children:p}),(0,u.jsxs)(`div`,{className:`login3-field`,children:[(0,u.jsx)(`label`,{className:`login3-label`,htmlFor:`login-email`,children:`Почта`}),(0,u.jsx)(`input`,{id:`login-email`,className:`login3-input`,type:`email`,value:r,autoComplete:`username`,name:`username`,placeholder:`you@example.com`,inputMode:`email`,onChange:e=>{i(ce(e.target.value)),d&&f(``)},onKeyDown:x,autoFocus:!0})]}),(0,u.jsxs)(`div`,{className:`login3-field`,children:[(0,u.jsx)(`label`,{className:`login3-label`,htmlFor:`login-password`,children:`Пароль`}),(0,u.jsx)(`input`,{id:`login-password`,className:`login3-input`,type:`password`,value:o,autoComplete:`current-password`,name:`password`,placeholder:`••••••••`,onChange:e=>{s(e.target.value),d&&f(``)},onKeyDown:x,onFocus:()=>g(!0),onBlur:()=>g(!1)})]}),(0,u.jsx)(`button`,{className:`login3-btn`,onClick:b,disabled:c,children:(0,u.jsx)(`span`,{children:c?`Заходим…`:`Войти`})}),(0,u.jsxs)(`div`,{className:`login3-links`,children:[(0,u.jsx)(`button`,{className:`login3-link login3-link-muted`,onClick:_,disabled:c,children:`Забыли пароль?`}),t&&(0,u.jsxs)(`div`,{children:[`Нет аккаунта? `,(0,u.jsx)(`button`,{className:`login3-link`,onClick:t,children:`Зарегистрироваться`})]}),n&&(0,u.jsx)(`button`,{className:`login3-link login3-link-muted`,onClick:n,children:`← На главную`})]})]})]})})}function Lt({onSuccess:e,onShowLogin:t,onBack:n,onPurchase:r}){let[i,o]=(0,a.useState)(1),[s,c]=(0,a.useState)(``),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(``),[h,g]=(0,a.useState)(``),[_,v]=(0,a.useState)(``),[y,b]=(0,a.useState)(!1),[x,S]=(0,a.useState)(!1),[C,w]=(0,a.useState)(!1),[T,E]=(0,a.useState)(!1),[D,O]=(0,a.useState)(``),k=e=>{let t=(e||``).toLowerCase();return t.includes(`rate`)||t.includes(`too many`)||t.includes(`limit`)||t.includes(`seconds`)?`Слишком много попыток. Попробуйте чуть позже`:t.includes(`invalid`)||t.includes(`expired`)||t.includes(`token`)?`Код не совпал. Проверьте все 6 цифр из письма или запросите новый`:t.includes(`network`)||t.includes(`fetch`)?`Нет соединения. Проверьте интернет`:e||`Что-то пошло не так. Попробуйте ещё раз`},A=async()=>{if(!s.trim()){O(`Введите имя`);return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.trim())){O(`Проверьте формат почты`);return}if(p.replace(/\D/g,``).length<10){O(`Введите контактный телефон`);return}if(!y){O(`Для регистрации нужно согласие с условиями Оферты`);return}if(!x){O(`Для регистрации нужно согласие на обработку персональных данных`);return}E(!0),O(``);try{await ge(d.trim()),o(2)}catch(e){O(k(e.message))}finally{E(!1)}},j=async()=>{if(h.length<6){O(`Введите 6 цифр из письма`);return}E(!0),O(``);try{await _e(d.trim(),h),await W({name:s.trim(),phone:p.trim()||null,consent_offer:!0,consent_pd:!0,consent_ads:C,consent_ts:new Date().toISOString()}).catch(()=>{}),o(3)}catch(e){O(k(e.message))}finally{E(!1)}},M=async()=>{let e=G(_);if(_.length<8){O(`Пароль должен быть не короче 8 символов`);return}if(e.score<2){O(`Пароль слишком простой — добавьте буквы разного регистра, цифры или символ`);return}E(!0),O(``);try{await ye(_),o(4)}catch(e){O(k(e.message))}finally{E(!1)}},N=(e,t)=>(0,u.jsx)(`a`,{className:`reg-consent-link`,href:e,target:`_blank`,rel:`noopener noreferrer`,children:t}),P=s.trim()&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.trim())&&p.replace(/\D/g,``).length>=10&&y&&x,ee=(0,u.jsx)(`div`,{className:`reg-progress`,children:[1,2,3,4].map(e=>(0,u.jsx)(`div`,{className:`reg-progress-seg ${e<=i?`on`:``}`},e))});return(0,u.jsx)(`div`,{className:`login3-wrap`,onClick:e=>{n&&!e.target.closest(`.login3-card`)&&n()},children:(0,u.jsxs)(`div`,{className:`login3-stage`,children:[(0,u.jsx)(Ft,{}),(0,u.jsxs)(`div`,{className:`login3-card`,children:[ee,i===1&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`h1`,{className:`login3-title`,children:`Создать аккаунт`}),(0,u.jsx)(`p`,{className:`login3-sub`,children:`Бесплатно. Без привязки карты.`}),(0,u.jsx)(`div`,{className:`reg-perks`,children:[`7 поисков по каталогу средств в неделю`,`3 анализа своих средств в неделю`,`Краткий тест на тип кожи и волос`].map(e=>(0,u.jsxs)(`div`,{className:`reg-perk`,children:[(0,u.jsx)(`span`,{className:`reg-perk-dot`}),e]},e))}),D&&(0,u.jsx)(`div`,{className:`login3-error`,children:D}),(0,u.jsxs)(`div`,{className:`login3-field`,children:[(0,u.jsxs)(`label`,{className:`login3-label`,htmlFor:`reg-name`,children:[`Имя`,(0,u.jsx)(`span`,{className:`req-star`,children:`*`})]}),(0,u.jsx)(`input`,{id:`reg-name`,className:`login3-input`,type:`text`,value:s,autoComplete:`given-name`,placeholder:`Как к вам обращаться?`,autoFocus:!0,onChange:e=>{c(e.target.value),D&&O(``)},onKeyDown:e=>e.key===`Enter`&&A()})]}),(0,u.jsxs)(`div`,{className:`login3-field`,children:[(0,u.jsxs)(`label`,{className:`login3-label`,htmlFor:`reg-email`,children:[`Почта`,(0,u.jsx)(`span`,{className:`req-star`,children:`*`})]}),(0,u.jsx)(`input`,{id:`reg-email`,className:`login3-input`,type:`email`,value:d,autoComplete:`email`,placeholder:`you@example.com`,inputMode:`email`,onChange:e=>{f(ce(e.target.value)),D&&O(``)},onKeyDown:e=>e.key===`Enter`&&A()})]}),(0,u.jsxs)(`div`,{className:`login3-field`,children:[(0,u.jsxs)(`label`,{className:`login3-label`,htmlFor:`reg-phone`,children:[`Контактный телефон`,(0,u.jsx)(`span`,{className:`req-star`,children:`*`})]}),(0,u.jsx)(`input`,{id:`reg-phone`,className:`login3-input`,type:`tel`,value:p,autoComplete:`tel`,placeholder:`+7 ___ ___-__-__`,inputMode:`tel`,onChange:e=>{m(le(e.target.value)),D&&O(``)},onKeyDown:e=>e.key===`Enter`&&A()})]}),(0,u.jsxs)(`div`,{className:`reg-consents`,children:[(0,u.jsxs)(`label`,{className:`reg-consent`,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:y,onChange:e=>{b(e.target.checked),D&&O(``)}}),(0,u.jsxs)(`span`,{children:[`Согласен с условиями `,N(l.offer,`Оферты`),(0,u.jsx)(`span`,{className:`req-star`,children:`*`})]})]}),(0,u.jsxs)(`label`,{className:`reg-consent`,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:x,onChange:e=>{S(e.target.checked),D&&O(``)}}),(0,u.jsxs)(`span`,{children:[`Даю `,N(l.pdConsent,`согласие`),` на обработку моих персональных данных в соответствии с `,N(l.policy,`Политикой`),(0,u.jsx)(`span`,{className:`req-star`,children:`*`})]})]}),(0,u.jsxs)(`label`,{className:`reg-consent`,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:C,onChange:e=>w(e.target.checked)}),(0,u.jsxs)(`span`,{children:[`Даю `,N(l.adsConsent,`согласие`),` на получение специальных предложений и полезной информации`]})]})]}),(0,u.jsx)(`button`,{className:`login3-btn`,onClick:A,disabled:T||!P,children:(0,u.jsx)(`span`,{children:T?`Отправляем код…`:`Получить код подтверждения`})}),(0,u.jsxs)(`div`,{className:`login3-links`,children:[(0,u.jsxs)(`div`,{children:[`Уже есть аккаунт? `,(0,u.jsx)(`button`,{className:`login3-link`,onClick:t,children:`Войти`})]}),n&&(0,u.jsx)(`button`,{className:`login3-link login3-link-muted`,onClick:n,children:`← На главную`})]})]}),i===2&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`h1`,{className:`login3-title`,children:`Проверьте почту`}),(0,u.jsxs)(`p`,{className:`login3-sub`,children:[`Мы отправили 6-значный код на`,(0,u.jsx)(`br`,{}),(0,u.jsx)(`b`,{children:d})]}),D&&(0,u.jsx)(`div`,{className:`login3-error`,children:D}),(0,u.jsxs)(`div`,{className:`login3-field`,children:[(0,u.jsx)(`label`,{className:`login3-label`,htmlFor:`reg-code`,children:`Код из письма`}),(0,u.jsx)(`input`,{id:`reg-code`,className:`login3-input reg-code-input`,type:`text`,inputMode:`numeric`,value:h,placeholder:`123456`,autoFocus:!0,onChange:e=>{g(e.target.value.replace(/\D/g,``).slice(0,6)),D&&O(``)},onKeyDown:e=>e.key===`Enter`&&j()})]}),(0,u.jsx)(`button`,{className:`login3-btn`,onClick:j,disabled:T,children:(0,u.jsx)(`span`,{children:T?`Проверяем код…`:`Подтвердить`})}),(0,u.jsxs)(`div`,{className:`login3-links`,children:[(0,u.jsxs)(`div`,{children:[`Не получили письмо? `,(0,u.jsx)(`button`,{className:`login3-link`,onClick:()=>{o(1),g(``),O(``)},children:`Отправить повторно`})]}),(0,u.jsx)(`button`,{className:`login3-link login3-link-muted`,onClick:()=>o(1),children:`← Назад`})]})]}),i===3&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`h1`,{className:`login3-title`,children:`Придумайте пароль`}),(0,u.jsx)(`p`,{className:`login3-sub`,children:`Чтобы в следующий раз входить по почте и паролю — быстро и без кода.`}),D&&(0,u.jsx)(`div`,{className:`login3-error`,children:D}),(0,u.jsxs)(`div`,{className:`login3-field`,children:[(0,u.jsx)(`label`,{className:`login3-label`,htmlFor:`reg-pass`,children:`Пароль`}),(0,u.jsx)(`input`,{id:`reg-pass`,className:`login3-input`,type:`password`,value:_,autoComplete:`new-password`,placeholder:`Минимум 8 символов`,autoFocus:!0,onChange:e=>{v(e.target.value),D&&O(``)},onKeyDown:e=>e.key===`Enter`&&M()})]}),(0,u.jsx)(jt,{pw:_}),(0,u.jsx)(`button`,{className:`login3-btn`,onClick:M,disabled:T,children:(0,u.jsx)(`span`,{children:T?`Сохраняем…`:`Сохранить пароль`})}),(0,u.jsx)(`div`,{className:`login3-links`,children:(0,u.jsx)(`button`,{className:`login3-link login3-link-muted`,onClick:()=>o(4),children:`Пропустить — задам пароль позже в кабинете`})})]}),i===4&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`h1`,{className:`login3-title`,children:s.trim()?`${s.trim()}, добро пожаловать!`:`Добро пожаловать!`}),(0,u.jsx)(`p`,{className:`login3-sub`,children:`Аккаунт создан. Вам доступно:`}),(0,u.jsxs)(`div`,{className:`reg-perks reg-perks-free`,children:[(0,u.jsx)(`div`,{className:`reg-perks-head`,children:`Доступно сейчас`}),[`7 поисков по каталогу средств в неделю`,`3 анализа своих средств в неделю`,`Краткий тест на тип кожи и волос`,`Справочник 20 000+ ингредиентов`,`Сравнение до 2 средств`].map(e=>(0,u.jsxs)(`div`,{className:`reg-perk`,children:[(0,u.jsx)(`span`,{className:`reg-perk-check`,children:`✓`}),e]},e))]}),(0,u.jsxs)(`div`,{className:`reg-perks reg-perks-pro`,children:[(0,u.jsx)(`div`,{className:`reg-perks-head`,children:`С подпиской (3 490 ₽/мес)`}),[`Безлимитные поиски и анализы составов`,`Полный тест + подбор средств под Вас`,`Индивидуальные схемы ухода: волосы и лицо`,`Дневник прогресса и анализ совместимости`].map(e=>(0,u.jsxs)(`div`,{className:`reg-perk reg-perk-locked`,children:[(0,u.jsx)(`span`,{className:`reg-perk-lock`,children:`⊘`}),e]},e))]}),(0,u.jsx)(`button`,{className:`login3-btn`,onClick:e,children:(0,u.jsx)(`span`,{children:`Начать пользоваться`})}),(0,u.jsx)(`button`,{className:`reg-btn-outline`,onClick:r,children:`Оформить подписку`})]})]})]})})}function Rt(){let[e,t]=(0,a.useState)(()=>{try{return!localStorage.getItem(`bh_cookie_consent`)}catch{return!0}});return e?(0,u.jsxs)(`div`,{className:`cookie-bar`,children:[(0,u.jsxs)(`div`,{className:`cookie-text`,children:[`Мы используем файлы cookie, чтобы обеспечивать правильную работу нашего сайта и анализировать сетевой трафик. Продолжая использовать данный сайт, вы`,` `,(0,u.jsx)(`a`,{className:`reg-consent-link`,href:l.pdConsent,target:`_blank`,rel:`noopener noreferrer`,children:`соглашаетесь`}),` `,`на обработку своих персональных данных в соответствии с`,` `,(0,u.jsx)(`a`,{className:`reg-consent-link`,href:l.policy,target:`_blank`,rel:`noopener noreferrer`,children:`Политикой`}),`.`]}),(0,u.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>{let e=new Date().toISOString();try{localStorage.setItem(`bh_cookie_consent`,e)}catch{}z&&W({consent_cookie:e}).catch(()=>{}),t(!1)},children:`Принять`})]}):null}function zt(){try{let e=localStorage.getItem(`bh_cookie_consent`);e&&z&&!B?.user_metadata?.consent_cookie&&W({consent_cookie:e}).catch(()=>{})}catch{}}function Bt({label:e,used:t,limit:n}){let r=Math.min(100,Math.round(t/n*100)),i=t>=n;return(0,u.jsxs)(`div`,{className:`lk-meter`,children:[(0,u.jsxs)(`div`,{className:`lk-meter-top`,children:[(0,u.jsx)(`span`,{children:e}),(0,u.jsxs)(`span`,{className:i?`over`:``,children:[t,` / `,n]})]}),(0,u.jsx)(`div`,{className:`lk-meter-bar`,children:(0,u.jsx)(`div`,{className:`lk-meter-fill`,style:{width:`${r}%`,background:i?`var(--rose)`:`var(--accent)`}})})]})}var Vt={search:{title:`Поиск на эту неделю исчерпан`,body:`На бесплатном тарифе ${ae.search} поисков в неделю. С подпиской поиск без ограничений.`},analysis:{title:`Анализ средств на эту неделю исчерпан`,body:`На бесплатном тарифе ${ae.analysis} анализа своих средств в неделю. С подпиской ограничений нет.`},compare:{title:`Сравнение до 2 средств`,body:`На бесплатном тарифе можно сравнивать 2 средства. С подпиской доступно до 5 и подбор аналогов.`}};function Ht({reason:e,onClose:t,onSubscribe:n}){let r=Vt[e]||Vt.search;return(0,u.jsx)(`div`,{className:`modal-overlay`,onClick:e=>{e.target===e.currentTarget&&t()},children:(0,u.jsxs)(`div`,{className:`paywall-card`,children:[(0,u.jsx)(`div`,{className:`paywall-emoji`,"aria-hidden":`true`,children:`🦋`}),(0,u.jsx)(`h3`,{className:`paywall-title`,children:r.title}),(0,u.jsx)(`p`,{className:`paywall-body`,children:r.body}),(0,u.jsxs)(`ul`,{className:`paywall-list`,children:[(0,u.jsx)(`li`,{children:`Безлимитный поиск и анализ составов`}),(0,u.jsx)(`li`,{children:`Полный тест и персональная схема ухода`}),(0,u.jsx)(`li`,{children:`Совместимость активов и дневник прогресса`}),(0,u.jsx)(`li`,{children:`Сравнение до 5 средств и подбор аналогов`})]}),(0,u.jsx)(`button`,{className:`btn btn-primary`,onClick:n,children:`Оформить подписку`}),(0,u.jsx)(`button`,{className:`paywall-later`,onClick:t,children:`Позже`})]})})}function Ut({profile:e,usage:t,pro:n,onClose:r,onSubscribe:i,onLogout:a,viewed:o=[],onOpenProduct:s,onOpenSettings:c}){let l=B?.user_metadata||{},d=B?.email||``,f=l.name||``,p=(f[0]||d[0]||`Я`).toUpperCase();return(0,u.jsxs)(`div`,{className:`lk-page`,children:[(0,u.jsxs)(`div`,{className:`lk-topbar`,children:[(0,u.jsx)(`button`,{className:`lk-back`,onClick:r,children:`← Каталог`}),(0,u.jsx)(`span`,{className:`lk-topbar-title`,children:`Личный кабинет`}),(0,u.jsx)(`button`,{className:`lk-top-ico`,style:{marginLeft:`auto`},onClick:c,title:`Настройки`,children:`⚙`}),(0,u.jsx)(`button`,{className:`lk-top-logout`,style:{marginLeft:0},onClick:a,children:`Выйти`})]}),(0,u.jsx)(`div`,{className:`lk-wrap`,children:(0,u.jsxs)(`div`,{className:`lk-stack`,children:[(0,u.jsxs)(`div`,{className:`lk-hero`,children:[(0,u.jsx)(`div`,{className:`lk-hero-ava`,children:p}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`lk-hero-name`,children:f?`Привет, ${f}!`:`Ваш кабинет`}),(0,u.jsx)(`div`,{className:`lk-hero-email`,children:n?`Подписка PRO активна`:`Бесплатный тариф`})]}),!n&&(0,u.jsx)(`button`,{className:`lk-pill-cta`,onClick:i,children:`Открыть PRO`})]}),(0,u.jsxs)(`section`,{className:`lk-hero-card`,children:[(0,u.jsx)(`div`,{className:`lk-hero-card-tag`,children:`Начните отсюда`}),(0,u.jsx)(`h2`,{className:`lk-hero-card-title`,children:`Соберём Вашу полку ухода`}),(0,u.jsx)(`p`,{className:`lk-hero-card-text`,children:`Добавьте средства, которыми пользуетесь сейчас. Мы разберём составы, запомним Вашу рутину и покажем, что уже работает и что стоит добавить.`}),(0,u.jsx)(`div`,{className:`lk-slots`,children:[0,1,2,3].map(e=>(0,u.jsx)(`div`,{className:`lk-slot`,children:`＋`},e))}),(0,u.jsx)(`button`,{className:`lk-primary`,children:`Собрать мой уход`})]}),(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Что уже закрыто и где пробел`}),(0,u.jsx)(`p`,{className:`lk-sub`,children:`Когда Вы добавите средства, здесь появится карта Вашего ухода по задачам. Сейчас показан пример.`}),(0,u.jsx)(`div`,{className:`lk-bars`,children:[{label:`Очищение`,val:80},{label:`Увлажнение`,val:55},{label:`Активы`,val:30},{label:`Защита (SPF)`,val:15},{label:`Восстановление`,val:45}].map(e=>(0,u.jsxs)(`div`,{className:`lk-bar-row`,children:[(0,u.jsx)(`div`,{className:`lk-bar-label`,children:e.label}),(0,u.jsx)(`div`,{className:`lk-bar-track`,children:(0,u.jsx)(`div`,{className:`lk-bar-fill`,style:{width:`${e.val}%`,background:e.val<35?`#c98a3a`:`linear-gradient(90deg,#2a9b73,#0f6b4d)`}})}),(0,u.jsx)(`div`,{className:`lk-bar-val`,style:{color:e.val<35?`#c98a3a`:`var(--ink-faint)`},children:e.val<35?`пробел`:`${e.val}%`})]},e.label))})]}),(0,u.jsxs)(`div`,{className:`lk-two`,children:[(0,u.jsxs)(`section`,{className:`lk-banner hair`,children:[(0,u.jsx)(`div`,{className:`lk-banner-ic`,children:`💆`}),(0,u.jsxs)(`div`,{className:`lk-banner-body`,children:[(0,u.jsxs)(`div`,{className:`lk-banner-name`,children:[`Схема ухода за волосами `,(0,u.jsx)(`span`,{className:`lk-badge pro`,children:`PRO`})]}),(0,u.jsx)(`div`,{className:`lk-banner-text`,children:`Пройдите большой тест по волосам, и мы соберём пошаговую программу под Ваш тип кожи головы и состояние волос.`}),(0,u.jsx)(`button`,{className:`lk-ghost`,onClick:i,children:`Пройти тест`})]})]}),(0,u.jsxs)(`section`,{className:`lk-banner face`,children:[(0,u.jsx)(`div`,{className:`lk-banner-ic`,children:`✨`}),(0,u.jsxs)(`div`,{className:`lk-banner-body`,children:[(0,u.jsxs)(`div`,{className:`lk-banner-name`,children:[`Схема ухода за лицом `,(0,u.jsx)(`span`,{className:`lk-badge pro`,children:`PRO`})]}),(0,u.jsx)(`div`,{className:`lk-banner-text`,children:`Определим тип кожи и задачи, подберём активы и порядок нанесения утром и вечером.`}),(0,u.jsx)(`button`,{className:`lk-ghost`,onClick:i,children:`Пройти тест`})]})]})]}),(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsxs)(`div`,{className:`lk-block-title`,children:[`Дневник прогресса `,(0,u.jsx)(`span`,{className:`lk-badge pro`,children:`PRO`})]}),(0,u.jsx)(`p`,{className:`lk-sub`,children:`Загружайте фото раз в неделю и наблюдайте, как меняются волосы и кожа.`}),(0,u.jsx)(`div`,{className:`lk-weeks`,children:[1,2,3,4,5,6].map(e=>(0,u.jsxs)(`div`,{className:`lk-week`,children:[(0,u.jsx)(`div`,{className:`lk-week-photo`,children:`＋`}),(0,u.jsxs)(`div`,{className:`lk-week-n`,children:[`Неделя `,e]})]},e))})]}),(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Короткие тесты`}),(0,u.jsx)(`div`,{className:`lk-soon-grid`,children:[{ic:`💆`,name:`Тип кожи головы`,desc:`Жирность, чувствительность, перхоть`},{ic:`🧴`,name:`Тип кожи лица`,desc:`Сухость, жирность, реакции`},{ic:`💇`,name:`Состояние волос`,desc:`Пористость, ломкость, объём`}].map(e=>(0,u.jsxs)(`div`,{className:`lk-soon-card`,children:[(0,u.jsx)(`span`,{className:`lk-badge`,children:`скоро`}),(0,u.jsx)(`div`,{className:`lk-soon-ic`,children:e.ic}),(0,u.jsx)(`div`,{className:`lk-soon-name`,children:e.name}),(0,u.jsx)(`div`,{className:`lk-soon-desc`,children:e.desc})]},e.name))})]}),(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Читать и применять`}),(0,u.jsx)(`div`,{className:`lk-articles`,children:[{t:`Как читать состав за две минуты`,d:`С чего начать и на что смотреть в первую очередь`},{t:`Привычки, которые портят волосы`,d:`Простые шаги, что поменять уже сегодня`},{t:`Аксессуары для волос`,d:`Расчёски, полотенца, наволочки: что выбрать`}].map(e=>(0,u.jsxs)(`div`,{className:`lk-article`,children:[(0,u.jsx)(`span`,{className:`lk-badge`,children:`скоро`}),(0,u.jsx)(`div`,{className:`lk-article-t`,children:e.t}),(0,u.jsx)(`div`,{className:`lk-article-d`,children:e.d})]},e.t))})]}),o.length>0&&(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Вы недавно смотрели`}),(0,u.jsx)(`div`,{className:`lk-viewed`,children:o.slice(0,8).map(e=>(0,u.jsxs)(`div`,{className:`lk-viewed-item`,onClick:()=>s&&s(e),title:`Открыть карточку`,children:[e.image_url?(0,u.jsx)(`img`,{className:`lk-viewed-thumb`,src:e.image_url,alt:``}):(0,u.jsx)(`div`,{className:`lk-viewed-thumb`}),(0,u.jsxs)(`div`,{style:{minWidth:0},children:[(0,u.jsx)(`div`,{className:`lk-viewed-name`,children:e.name}),e.brand&&(0,u.jsx)(`div`,{className:`lk-viewed-brand`,children:e.brand})]})]},e.id))})]}),!n&&(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Бесплатный тариф`}),(0,u.jsxs)(`div`,{className:`lk-meters-row`,children:[(0,u.jsx)(Bt,{label:`Поиск по каталогу`,used:t.search,limit:ae.search}),(0,u.jsx)(Bt,{label:`Анализ своих средств`,used:t.analysis,limit:ae.analysis})]}),(0,u.jsx)(`button`,{className:`lk-primary`,onClick:i,children:`Открыть всё в PRO`})]})]})})]})}var Wt=`MVP · версия 0.5 (июнь 2026)`;function Gt({onClose:e,onLogout:t}){let n=B?.user_metadata||{},r=B?.email||``,[i,o]=(0,a.useState)(n.name||``),[s,c]=(0,a.useState)(n.phone||``),[d,f]=(0,a.useState)(!1),[p,m]=(0,a.useState)(!1),[h,g]=(0,a.useState)(``),_=i!==(n.name||``)||s!==(n.phone||``),v=async()=>{f(!0),g(``),m(!1);try{await W({name:i.trim(),phone:s.trim()}),m(!0)}catch(e){g(e.message||`Не удалось сохранить`)}finally{f(!1)}},[y,b]=(0,a.useState)(``),[x,S]=(0,a.useState)(``),[C,w]=(0,a.useState)(!1),[T,E]=(0,a.useState)(``),[D,O]=(0,a.useState)(``),k=y.length>=8&&G(y).score>=2&&y===x,A=async()=>{w(!0),E(``),O(``);try{await ye(y),E(`Пароль обновлён`),b(``),S(``)}catch(e){O(e.message||`Не удалось сменить пароль`)}finally{w(!1)}},[j,M]=(0,a.useState)(n.notify_news??n.ads_consent??!1),N=e=>{M(e),W({notify_news:e}).catch(()=>{})};return(0,u.jsxs)(`div`,{className:`lk-page`,children:[(0,u.jsxs)(`div`,{className:`lk-topbar`,children:[(0,u.jsx)(`button`,{className:`lk-back`,onClick:e,children:`← Назад`}),(0,u.jsx)(`span`,{className:`lk-topbar-title`,children:`Настройки`})]}),(0,u.jsx)(`div`,{className:`lk-wrap`,children:(0,u.jsxs)(`div`,{className:`lk-stack`,children:[(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Аккаунт`}),(0,u.jsxs)(`div`,{className:`set-grid`,children:[(0,u.jsxs)(`div`,{className:`lk-field`,children:[(0,u.jsx)(`label`,{children:`Имя`}),(0,u.jsx)(`input`,{className:`lk-input`,value:i,onChange:e=>o(e.target.value),placeholder:`Как к Вам обращаться`})]}),(0,u.jsxs)(`div`,{className:`lk-field`,children:[(0,u.jsx)(`label`,{children:`Телефон`}),(0,u.jsx)(`input`,{className:`lk-input`,value:s,onChange:e=>c(le(e.target.value)),placeholder:`+7…`,inputMode:`tel`})]})]}),(0,u.jsxs)(`div`,{className:`lk-field`,children:[(0,u.jsx)(`label`,{children:`E-mail`}),(0,u.jsx)(`div`,{className:`set-readonly`,children:r||`—`})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:14,marginTop:4},children:[(0,u.jsx)(`button`,{className:`lk-primary`,onClick:v,disabled:!_||d,style:{opacity:!_||d?.55:1,cursor:!_||d?`default`:`pointer`},children:d?`Сохраняю…`:`Сохранить`}),p&&!_&&(0,u.jsx)(`span`,{className:`set-saved`,children:`✓ Сохранено`}),h&&(0,u.jsx)(`span`,{style:{fontSize:12.5,color:`var(--rose)`},children:h})]})]}),(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Безопасность`}),(0,u.jsx)(`p`,{className:`lk-sub`,children:`Новый пароль для входа по почте. Минимум 8 символов.`}),(0,u.jsxs)(`div`,{className:`set-grid`,children:[(0,u.jsxs)(`div`,{className:`lk-field`,children:[(0,u.jsx)(`label`,{children:`Новый пароль`}),(0,u.jsx)(`input`,{className:`lk-input`,type:`password`,value:y,onChange:e=>b(e.target.value),placeholder:`Придумайте пароль`,autoComplete:`new-password`}),y&&(0,u.jsx)(jt,{pw:y})]}),(0,u.jsxs)(`div`,{className:`lk-field`,children:[(0,u.jsx)(`label`,{children:`Повторите пароль`}),(0,u.jsx)(`input`,{className:`lk-input`,type:`password`,value:x,onChange:e=>S(e.target.value),placeholder:`Ещё раз`,autoComplete:`new-password`}),x&&y!==x&&(0,u.jsx)(`div`,{className:`lk-hint`,style:{color:`var(--rose)`},children:`Пароли не совпадают`})]})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:14,marginTop:4},children:[(0,u.jsx)(`button`,{className:`lk-primary`,onClick:A,disabled:!k||C,style:{opacity:!k||C?.55:1,cursor:!k||C?`default`:`pointer`},children:C?`Сохраняю…`:`Сменить пароль`}),T&&(0,u.jsxs)(`span`,{className:`set-saved`,children:[`✓ `,T]}),D&&(0,u.jsx)(`span`,{style:{fontSize:12.5,color:`var(--rose)`},children:D})]})]}),(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Уведомления`}),(0,u.jsxs)(`div`,{className:`set-row`,children:[(0,u.jsxs)(`div`,{className:`set-row-txt`,children:[(0,u.jsx)(`div`,{className:`set-row-name`,children:`Новости и советы по уходу`}),(0,u.jsx)(`div`,{className:`set-row-desc`,children:`Письма о новых разборах, статьях и обновлениях. Можно отключить в любой момент.`})]}),(0,u.jsxs)(`label`,{className:`set-switch`,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:!!j,onChange:e=>N(e.target.checked)}),(0,u.jsx)(`span`,{className:`track`}),(0,u.jsx)(`span`,{className:`knob`})]})]}),(0,u.jsxs)(`div`,{className:`set-row`,children:[(0,u.jsxs)(`div`,{className:`set-row-txt`,children:[(0,u.jsx)(`div`,{className:`set-row-name`,children:`Важные уведомления об аккаунте`}),(0,u.jsx)(`div`,{className:`set-row-desc`,children:`Безопасность, подписка, оплата. Эти письма приходят всегда.`})]}),(0,u.jsxs)(`label`,{className:`set-switch`,title:`Нельзя отключить`,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:!0,readOnly:!0,disabled:!0}),(0,u.jsx)(`span`,{className:`track`}),(0,u.jsx)(`span`,{className:`knob`})]})]})]}),(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`Конфиденциальность и данные`}),(0,u.jsxs)(`div`,{className:`set-links`,children:[(0,u.jsxs)(`a`,{className:`set-link`,href:l.policy,target:`_blank`,rel:`noopener noreferrer`,children:[`Политика обработки персональных данных `,(0,u.jsx)(`span`,{className:`arr`,children:`→`})]}),(0,u.jsxs)(`a`,{className:`set-link`,href:l.pdConsent,target:`_blank`,rel:`noopener noreferrer`,children:[`Согласие на обработку персональных данных `,(0,u.jsx)(`span`,{className:`arr`,children:`→`})]}),(0,u.jsxs)(`a`,{className:`set-link`,href:l.offer,target:`_blank`,rel:`noopener noreferrer`,children:[`Публичная оферта `,(0,u.jsx)(`span`,{className:`arr`,children:`→`})]}),(0,u.jsxs)(`a`,{className:`set-link`,href:l.adsConsent,target:`_blank`,rel:`noopener noreferrer`,children:[`Согласие на рекламную рассылку `,(0,u.jsx)(`span`,{className:`arr`,children:`→`})]})]}),(0,u.jsx)(`p`,{className:`lk-sub`,style:{margin:`16px 0 12px`},children:`Вы можете запросить удаление аккаунта и всех связанных персональных данных. Мы обработаем запрос в течение 30 дней.`}),(0,u.jsx)(`button`,{className:`set-danger`,onClick:()=>{let e=encodeURIComponent(`Прошу удалить мой аккаунт и связанные с ним персональные данные.\n\nE-mail аккаунта: ${r}`);window.location.href=`mailto:${l.ownerEmail}?subject=%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BD%D0%B0%20%D1%83%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BA%D0%BA%D0%B0%D1%83%D0%BD%D1%82%D0%B0%20Beauty%20Helper&body=${e}`},children:`Запросить удаление аккаунта`})]}),(0,u.jsxs)(`section`,{className:`lk-block lk-block-airy`,children:[(0,u.jsx)(`div`,{className:`lk-block-title`,children:`О приложении`}),(0,u.jsxs)(`div`,{className:`set-about-row`,children:[(0,u.jsx)(`span`,{children:`Версия`}),(0,u.jsx)(`b`,{children:Wt})]}),(0,u.jsxs)(`div`,{className:`set-about-row`,children:[(0,u.jsx)(`span`,{children:`Поддержка`}),(0,u.jsx)(`a`,{href:`mailto:${l.ownerEmail}`,style:{color:`var(--accent)`,fontWeight:600},children:l.ownerEmail})]}),(0,u.jsxs)(`div`,{className:`set-about-row`,children:[(0,u.jsx)(`span`,{children:`Правообладатель`}),(0,u.jsx)(`b`,{children:l.ownerName})]}),(0,u.jsxs)(`div`,{className:`set-about-row`,children:[(0,u.jsx)(`span`,{children:`ИНН`}),(0,u.jsx)(`b`,{children:l.ownerInn})]})]}),(0,u.jsx)(`button`,{className:`set-danger`,style:{color:`var(--rose)`},onClick:t,children:`Выйти из аккаунта`})]})})]})}function Kt(){let[e,t]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e=!1,n=!1,r=!1;try{e=!!localStorage.getItem(`bh_a2hs_dismissed`),n=!!localStorage.getItem(`bh_a2hs_force`),r=!!localStorage.getItem(`bh_cookie_consent`)}catch{}let i=navigator.userAgent||``,a=/iphone|ipad|ipod/i.test(i)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1,o=/safari/i.test(i)&&!/crios|fxios|edgios|android/i.test(i),s=window.navigator.standalone===!0||window.matchMedia(`(display-mode: standalone)`).matches;if(n||a&&o&&!s&&!e&&r){let e=setTimeout(()=>t(!0),n?0:2500);return()=>clearTimeout(e)}},[]);let n=()=>{t(!1);try{localStorage.setItem(`bh_a2hs_dismissed`,`1`)}catch{}};return e?(0,u.jsx)(`div`,{className:`a2hs-overlay`,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,u.jsxs)(`div`,{className:`a2hs-sheet`,children:[(0,u.jsx)(`button`,{className:`a2hs-close`,onClick:n,"aria-label":`Закрыть`,children:`✕`}),(0,u.jsxs)(`div`,{className:`a2hs-head`,children:[(0,u.jsx)(`img`,{className:`a2hs-icon`,src:`/app-icon-192.png`,alt:``}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`a2hs-title`,children:`Держите Beauty Helper под рукой`}),(0,u.jsx)(`div`,{className:`a2hs-sub`,children:`Добавьте сайт на экран «Домой» — он будет открываться как приложение.`})]})]}),(0,u.jsxs)(`ul`,{className:`a2hs-benefits`,children:[(0,u.jsx)(`li`,{children:`Быстрый доступ в одно касание`}),(0,u.jsx)(`li`,{children:`Открывается на весь экран, без панелей браузера`}),(0,u.jsx)(`li`,{children:`Не потеряется среди вкладок`})]}),(0,u.jsxs)(`div`,{className:`a2hs-steps`,children:[(0,u.jsxs)(`div`,{className:`a2hs-step`,children:[(0,u.jsx)(`span`,{className:`a2hs-n`,children:`1`}),` Нажмите `,(0,u.jsx)(`b`,{children:`«Поделиться»`}),` `,(0,u.jsx)(`svg`,{width:`15`,height:`15`,viewBox:`0 0 24 24`,fill:`none`,stroke:`#2a7`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{verticalAlign:`-2px`},children:(0,u.jsx)(`path`,{d:`M12 3v12M8 7l4-4 4 4M6 12v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6`})}),` в нижней панели Safari`]}),(0,u.jsxs)(`div`,{className:`a2hs-step`,children:[(0,u.jsx)(`span`,{className:`a2hs-n`,children:`2`}),` Выберите `,(0,u.jsx)(`b`,{children:`«На экран „Домой“»`}),` `,(0,u.jsxs)(`svg`,{width:`15`,height:`15`,viewBox:`0 0 24 24`,fill:`none`,stroke:`#2a7`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{verticalAlign:`-2px`},children:[(0,u.jsx)(`rect`,{x:`4`,y:`4`,width:`16`,height:`16`,rx:`4`}),(0,u.jsx)(`path`,{d:`M12 9v6M9 12h6`})]})]}),(0,u.jsxs)(`div`,{className:`a2hs-step`,children:[(0,u.jsx)(`span`,{className:`a2hs-n`,children:`3`}),` Нажмите `,(0,u.jsx)(`b`,{children:`«Добавить»`}),` в правом верхнем углу`]})]}),(0,u.jsx)(`button`,{className:`a2hs-ok`,onClick:n,children:`Понятно`})]})}):null}function qt({onClose:e,onSuccess:t}){let[n,r]=(0,a.useState)(B?.email||``),[i,o]=(0,a.useState)(!1),[s,c]=(0,a.useState)(!1),[d,f]=(0,a.useState)(!1),[p,m]=(0,a.useState)(``);return(0,u.jsx)(`div`,{className:`modal-overlay`,onClick:e,children:(0,u.jsxs)(`div`,{className:`modal`,style:{maxWidth:420},onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(`button`,{className:`modal-close`,onClick:e,children:`✕`}),(0,u.jsxs)(`div`,{className:`purchase-head`,children:[(0,u.jsx)(`div`,{className:`purchase-head-label`,children:`Подписка Beauty Helper`}),(0,u.jsxs)(`div`,{className:`purchase-head-price`,children:[`3 490 ₽ `,(0,u.jsx)(`span`,{children:`/ мес`})]})]}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Включено`}),[`Персональная схема ухода для лица`,`Персональная схема ухода для волос`,`Анализ совместимости средств`,`Неограниченные анализы состава`,`Сравнение до 5 средств`].map(e=>(0,u.jsxs)(`div`,{className:`reg-perk`,children:[(0,u.jsx)(`span`,{className:`reg-perk-dot`}),e]},e))]}),(0,u.jsxs)(`div`,{className:`form-group`,children:[(0,u.jsx)(`label`,{className:`form-label`,children:`Email для чека`}),(0,u.jsx)(`input`,{className:`form-input`,type:`email`,value:n,placeholder:`you@example.com`,inputMode:`email`,onChange:e=>r(ce(e.target.value))})]}),(0,u.jsxs)(`div`,{className:`reg-consents`,style:{marginBottom:12},children:[(0,u.jsxs)(`label`,{className:`reg-consent`,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:i,onChange:e=>{o(e.target.checked),p&&m(``)}}),(0,u.jsxs)(`span`,{children:[`Согласен с условиями `,(0,u.jsx)(`a`,{className:`reg-consent-link`,href:l.offer,target:`_blank`,rel:`noopener noreferrer`,children:`Оферты`})]})]}),(0,u.jsxs)(`label`,{className:`reg-consent`,children:[(0,u.jsx)(`input`,{type:`checkbox`,checked:s,onChange:e=>{c(e.target.checked),p&&m(``)}}),(0,u.jsxs)(`span`,{children:[`Даю `,(0,u.jsx)(`a`,{className:`reg-consent-link`,href:l.pdConsent,target:`_blank`,rel:`noopener noreferrer`,children:`согласие`}),` на обработку моих персональных данных в соответствии с `,(0,u.jsx)(`a`,{className:`reg-consent-link`,href:l.policy,target:`_blank`,rel:`noopener noreferrer`,children:`Политикой`})]})]})]}),p&&(0,u.jsx)(`div`,{className:`error-msg`,children:p}),(0,u.jsx)(`button`,{className:`btn btn-primary`,style:{width:`100%`},onClick:()=>{if(!i){m(`Для оплаты нужно согласие с условиями Оферты`);return}if(!s){m(`Для оплаты нужно согласие на обработку персональных данных`);return}f(!0),m(``),I({accessToken:z,email:n,onError:e=>{f(!1),m(e===`not_authenticated`?`Войдите в аккаунт, чтобы оформить подписку`:e===`function_not_deployed`?`Оплата ещё не настроена. Попробуйте позже`:`Не удалось открыть оплату. Попробуйте ещё раз`)}})},disabled:d,children:d?`Открываем оплату…`:`Оплатить 3 490 ₽`}),(0,u.jsx)(`div`,{className:`purchase-note`,children:`Оплата через Робокассу · Автопродление, отмена в любой момент`})]})})}(0,o.createRoot)(document.getElementById(`root`)).render((0,u.jsx)(a.StrictMode,{children:(0,u.jsx)(Be,{})}));