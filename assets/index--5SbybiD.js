import{n as e,r as t,t as n}from"./vendor-sifKlCMd.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var r=t(),i=e(),a=`/Cosmetic_db/assets/mascot-xWQnxpLg.png`,o=n(),s=`https://lcvszvxbszszqikboxeq.supabase.co`,c=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdnN6dnhic3pzenFpa2JveGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDAyOTEsImV4cCI6MjA5NDY3NjI5MX0.W3yfYh9WWHv_7pBzAh5dTafDr8uOkWTc6LAIZLxCkAE`,l=null;function u(){return{apikey:c,Authorization:`Bearer ${l||c}`,"Content-Type":`application/json`,Prefer:`return=representation`}}async function d(e,t={}){let n=await fetch(`${s}/rest/v1${e}`,{headers:u(),...t});if(!n.ok){let e=await n.text();throw Error(e)}let r=await n.text();return r?JSON.parse(r):[]}async function f(e,t,n=1e3){let r=[],i=1/0;for(let a=0;a<1e5;a++){let a=t+n-1,o=await fetch(`${s}/rest/v1${e}`,{headers:{...u(),"Range-Unit":`items`,Range:`${t}-${a}`,Prefer:`count=exact`}});if(!o.ok)throw Error(await o.text());let c=o.headers.get(`content-range`)||o.headers.get(`Content-Range`);if(c){let e=c.match(/\/(\d+|\*)\s*$/);e&&e[1]!==`*`&&(i=Number(e[1]))}let l=await o.text(),d=l?JSON.parse(l):[];if(r.push(...d),d.length===0||(t+=d.length,t>=i))break}return r}async function p(e,t=200){let n=await fetch(`${s}/rest/v1${e}`,{headers:{...u(),"Range-Unit":`items`,Range:`0-${t-1}`,Prefer:`count=exact`}});if(!n.ok)throw Error(await n.text());let r=n.headers.get(`content-range`)||n.headers.get(`Content-Range`),i=1/0;if(r){let e=r.match(/\/(\d+|\*)\s*$/);e&&e[1]!==`*`&&(i=Number(e[1]))}let a=await n.text();return{rows:a?JSON.parse(a):[],total:i}}async function m(e,t){let n=await fetch(`${s}/auth/v1/token?grant_type=password`,{method:`POST`,headers:{apikey:c,"Content-Type":`application/json`},body:JSON.stringify({email:e,password:t})}),r=await n.json();if(!n.ok)throw Error(r?.error_description||r?.msg||`Ошибка входа`);l=r.access_token;try{localStorage.setItem(`sb_token`,r.access_token)}catch{}return r}function h(){l=null;try{localStorage.removeItem(`sb_token`)}catch{}}async function g(){let e=null;try{e=localStorage.getItem(`sb_token`)}catch{}return e?(await fetch(`${s}/auth/v1/user`,{headers:{apikey:c,Authorization:`Bearer ${e}`}})).ok?(l=e,!0):(h(),!1):!1}var _={ПАВ:`#3f7fb0`,Масла:`#b07d2e`,Витамины:`#3f8f5a`,Отдушки:`#b04f82`,Кислоты:`#b0524a`,Структурообразователи:`#6b6e5a`,Растворители:`#4a8a9a`,Технические:`#6b6e5a`,Эмоленты:`#b07d2e`,Кондиционеры:`#3f7fb0`,Протеины:`#3f8f5a`,Увлажнители:`#4a8a9a`,unknown:`#8b8f86`},v=e=>_[e]||`#6b6e5a`,y={moisture:{label:`Увлажнение`,some:`Немного увлажняет`,hue:`#2f8fa6`},nutrition:{label:`Питание`,some:`Немного питает`,hue:`#c0892f`},repair:{label:`Восстановление`,some:`Немного восстановит`,hue:`#3f9a63`},protection:{label:`Защита`,some:`Немного защищает`,hue:`#4f78c4`}};function b(e){let t=(e.product_type||``).toLowerCase(),n=[];return t.includes(`маск`)||t.includes(`кондиционер`)?([`moisture`,`nutrition`,`repair`,`protection`].forEach(t=>{let r=e[`attr_`+t];r===`full`||r===!0?n.push({text:y[t].label,hue:y[t].hue,strong:!0}):r===`some`&&n.push({text:y[t].some,hue:y[t].hue,strong:!1})}),e.attr_curls===!0&&n.push({text:`Подходит кудряшкам`,hue:`#9a5fb0`,strong:!0}),n):t.includes(`шампунь`)?(e.analytical_type&&n.push({text:e.analytical_type,hue:`#2f8fa6`,strong:!0}),e.skin_type&&n.push({text:e.skin_type,hue:`#6b8f5a`,strong:!1}),n):(e.attr_film===!0&&n.push({text:`Плёнкообразователь`,hue:`#7d8a6b`,strong:!1}),e.attr_uva_chem===!0&&n.push({text:`Химический UVA-фильтр`,hue:`#4f78c4`,strong:!0}),n)}var x={ПАВ:`Поверхностно-активные вещества это основа очищения. Связывают жир и грязь, смываются водой. Чем агрессивнее ПАВ, тем сильнее очищение, но выше риск пересушивания.`,"ПАВ::Анионные ПАВ":`Самые высокоочищающие, имеют отрицательный заряд, оказывают самое агрессивное действие, могут раздражать.`,"ПАВ::Анионные ПАВ · Жёсткие":`Лучше всего подходят жирному типу кожи головы. Дают обильную пену и глубокое очищение.`,"ПАВ::Амфотерные ПАВ":`Свойства зависят от pH: при pH от 4 до 6 смягчают другие, более жёсткие ПАВ; при pH выше 7 усиливают их агрессию. Часто идут как со-ПАВ.`,"ПАВ::Неионные ПАВ · Мягкие":`Низкое пенообразование. Снижают агрессию других ПАВ, подходят чувствительной и сухой коже.`,"Окклюзивы::Силиконы":`Химические соединения кислорода и кремния. Дают блеск, гладкость кутикулы и защиту, без лечебного эффекта.`,"Структурообразователи::Силиконы":`Создают плёнку на поверхности волоса: гладкость, блеск, защита от влаги и тепла.`,Увлажнители:`Гумектанты отвечают за непосредственное увлажнение. В хорошем увлажняющем средстве их должно быть несколько в верхней части состава.`,"Увлажнители::Гумектанты":`Притягивают и удерживают влагу в волосе. Глицерин это самый распространённый представитель.`,Протеины:`Гидролизованные белки временно заполняют повреждения кутикулы, возвращают плотность и упругость повреждённым волосам.`,Масла:`Питают, смягчают, придают блеск. Растительные масла различаются по проникновению и жирнокислотному составу.`,Отдушки:`Ароматизаторы. Некоторые компоненты отдушек являются признанными ЕС аллергенами, и маркируются отдельно.`,Растворители:`Основа средства, чаще всего вода. Растворяют остальные компоненты.`,Технические:`Регуляторы вязкости, pH, UV-фильтры и прочие функциональные добавки.`,Кондиционеры:`Катионные компоненты с положительным зарядом, сглаживают кутикулу, снимают статику, облегчают расчёсывание.`,Витамины:`Активные добавки-антиоксиданты. Влияют на состояние волоса при достаточной концентрации.`},S=(e,t,n,r)=>{let i=e||{};return i[`${t}::${n}::${r}`]||i[`${t}::${n}`]||i[t]||x[`${t}::${n}::${r}`]||x[`${t}::${n}`]||x[t]||null},C=e=>(e||``).toLowerCase().replace(/[^a-zа-я0-9 ]/gi,``).trim();function w(e){let t=e.findIndex(e=>(e.group||``).toLowerCase().includes(`отдушк`));return t>0?e.slice(0,t):e}var T=e=>e?e<=3?1:e<=6?.75:e<=10?.5:.3:.4;function E(e,t){let n=w(e),r=w(t);if(!n.length||!r.length)return{score:0,sharedNames:[]};let i=new Map(r.map(e=>[C(e.inci),e])),a=0,o=0,s=[];for(let e of n){let t=T(e.position);o+=t,i.has(C(e.inci))&&(a+=t,s.push(e.inci))}let c=new Map(n.map(e=>[C(e.inci),e])),l=0,u=0;for(let e of r){let t=T(e.position);u+=t,c.has(C(e.inci))&&(l+=t)}let d=((o?a/o:0)+(u?l/u:0))/2,f=new Set(n.map(e=>e.group).filter(Boolean)),p=new Set(r.map(e=>e.group).filter(Boolean)),m=[...f].filter(e=>p.has(e)).length,h=new Set([...f,...p]).size,g=h?m/h:0;return{score:Math.round((d*.7+g*.3)*100),sharedNames:s}}var D=e=>e.ingredients.map(e=>({inci:e.ing.inci_name,group:e.ing.group,position:e.position})),O=[{type:`Шампунь`,test:(e,t)=>e.has(`ПАВ`)&&t.some(e=>/sulfate|sulfo|glucoside|betaine|sarcosinate/i.test(e))},{type:`Кондиционер`,test:(e,t)=>t.some(e=>/behentrimonium|cetrimonium|distearoylethyl|quaternium/i.test(e))||e.has(`Эмоленты`)&&t.some(e=>/cetearyl alcohol/i.test(e))},{type:`Маска`,test:e=>e.has(`Протеины`)&&(e.has(`Масла`)||e.has(`Эмоленты`))},{type:`SPF`,test:(e,t)=>t.some(e=>/titanium dioxide|zinc oxide|octocrylene|avobenzone|homosalate|ethylhexyl methoxycinnamate|tinosorb|uvinul/i.test(e))},{type:`Крем`,test:(e,t)=>t.some(e=>/dimethicone|ceramide|petrolatum/i.test(e))&&e.has(`Увлажнители`)},{type:`Масло`,test:(e,t)=>t.length<=6&&e.has(`Масла`)&&!e.has(`ПАВ`)&&!t.some(e=>/aqua|water/i.test(e))},{type:`Сыворотка`,test:e=>(e.has(`Витамины`)||e.has(`Кислоты`))&&!e.has(`ПАВ`)}];function k(e){let t=new Set(e.map(e=>e.group).filter(Boolean)),n=e.map(e=>e.inci);for(let e of O)if(e.test(t,n))return e.type;return null}function A(e,t,n,{sameType:r=!0,order:i=`match`}={}){let a=t?.id,o=n.filter(e=>e.id!==a).filter(e=>!r||!t||e.product_type===t.product_type).map(t=>({product:t,...E(e,D(t))})).filter(e=>e.score>=20);return i===`price`?o.sort((e,t)=>(e.product.price_rub||0)-(t.product.price_rub||0)||t.score-e.score):o.sort((e,t)=>t.score-e.score||(e.product.price_rub||0)-(t.product.price_rub||0)),o}var j=`
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

  /* ── Падающие цветочки ── */
  .petals-canvas {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }
  .petal {
    position: absolute; top: -60px; opacity: 0;
    animation: petalFall linear infinite;
    will-change: transform, opacity;
  }
  .petal svg { display: block; }
  @keyframes petalFall {
    0%   { opacity: 0; transform: translateY(0) rotate(0deg) scale(1); }
    8%   { opacity: 0.7; }
    90%  { opacity: 0.5; }
    100% { opacity: 0; transform: translateY(105vh) rotate(360deg) scale(0.85); }
  }
  /* чтобы контент был поверх лепестков */
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
  }
  .hier-sub .hier-item { font-size: 13px; padding: 7px 10px; }
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
    background: linear-gradient(160deg, rgba(225,238,252,0.55), rgba(208,226,244,0.42));
    border: 1px solid rgba(170,208,238,0.38);
    backdrop-filter: blur(18px) saturate(120%); -webkit-backdrop-filter: blur(18px) saturate(120%);
    border-radius: 20px; overflow: hidden; cursor: pointer;
    box-shadow: 0 2px 12px rgba(30,80,140,0.07); transition: transform .18s, box-shadow .25s;
    display: flex; flex-direction: column;
  }
  .card:hover { transform: scale(1.033); box-shadow: 0 8px 28px rgba(30,80,140,0.13); }
  .card-media {
    aspect-ratio: 3 / 4;  /* вертикально-ориентированная банка/флакон */
    background: linear-gradient(150deg, rgba(235,245,255,0.65), rgba(210,228,245,0.45));
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

`,M=[`крем`,`сыворотк`,`spf`,`тонер`,`эмульс`,`умыван`],N=e=>M.some(t=>(e||``).toLowerCase().includes(t)),P=e=>e==null?null:e<700?`бюджетно`:e<1500?`средняя`:`высокая`;function F(e){let t=e.ingredients||null,n=t?.ingredient_groups||[],r=n.find(e=>e.is_primary)||n[0]||{},i=t?.oils_meta,a=Array.isArray(i)?i[0]:i;return{id:e.id,position:e.position,matched:!!t,ing:{inci_name:t?.inci_name||e.raw_inci_name||``,ru_name:t?.ru_name||null,description:t?.description||null,is_eu_allergen:!!t?.is_eu_allergen,group:r.group||null,subgroup:r.subgroup||null,subgroup2:r.subgroup2||null,oil:a?{comedogenicity:a.comedogenicity,penetration:a.penetration,fatty_acids:a.fatty_acids}:null}}}function I(e,t){return{...e,price_tier:P(e.price_rub),is_face:N(e.product_type),ingredients:t?t.map(F):[]}}var L=`*,ingredients(id,inci_name,ru_name,description,is_eu_allergen,ingredient_groups(group,subgroup,subgroup2,is_primary),oils_meta(penetration,fatty_acids,comedogenicity))`;function ee(){let[e,t]=(0,r.useState)(!1),[n,i]=(0,r.useState)(!1),[a,s]=(0,r.useState)(`products`),[c,l]=(0,r.useState)([]),[u,m]=(0,r.useState)([]),[_,v]=(0,r.useState)({}),[y,x]=(0,r.useState)({}),[S,C]=(0,r.useState)(!1),[w,T]=(0,r.useState)(``),[E,D]=(0,r.useState)(``),[O,k]=(0,r.useState)(null),[A,M]=(0,r.useState)(null),[ee,R]=(0,r.useState)(!1),[B,V]=(0,r.useState)(!1),[H,U]=(0,r.useState)({type:``,fn:``,scalp:``,wash:``,price:``,flags:{}}),[W,ae]=(0,r.useState)(`recommend`),[oe,se]=(0,r.useState)(!1),[G,ue]=(0,r.useState)(``),[de,fe]=(0,r.useState)(!1),[K,pe]=(0,r.useState)(!1),[q,J]=(0,r.useState)([]),[he,Y]=(0,r.useState)(``),ge=e=>{J(t=>t.some(t=>t.id===e.id)?t:t.length>=5?(Y(`Добавлено максимальное количество средств для сравнения`),t):(Y(``),Ae&&Ae(e).catch(()=>{}),[...t,e]))},_e=e=>J(t=>t.filter(t=>t.id!==e)),ve=()=>{J([]),Y(``)},ye=()=>{M(null),k(null),s(`compare`)};(0,r.useEffect)(()=>{g().then(e=>{t(e),i(!0)})},[]);let X=(0,r.useCallback)(async()=>{C(!0),T(``);let e=`/products?select=*,notes&order=name.asc`;try{let{rows:t,total:n}=await p(e,200);l(t.map(e=>I(e,null))),C(!1),n>t.length&&f(e,t.length).then(e=>{e.length&&l(t=>[...t,...e.map(e=>I(e,null))])}).catch(()=>{})}catch(e){T(`Ошибка загрузки средств: `+e.message),C(!1)}},[]),Se=e=>{let t=e.ingredient_groups||[],n=t.find(e=>e.is_primary)||t[0]||null;return{id:e.id,inci_name:e.inci_name,ru_name:e.ru_name,aliases:e.aliases,description:e.description,is_eu_allergen:!!e.is_eu_allergen,group:n?.group||null,subgroup:n?.subgroup||null,subgroup2:n?.subgroup2||null,allGroups:t}},Ce=(0,r.useCallback)(async()=>{C(!0),T(``);let e=`/ingredients?select=id,inci_name,ru_name,aliases,description,is_eu_allergen,ingredient_groups(group,subgroup,subgroup2,is_primary)&order=inci_name.asc`;try{let{rows:t,total:n}=await p(e,300);m(t.map(Se)),C(!1),n>t.length&&f(e,t.length).then(e=>{e.length&&m(t=>[...t,...e.map(Se)])}).catch(()=>{})}catch(e){T(`Ошибка загрузки ингредиентов: `+e.message),C(!1)}},[]),we=(0,r.useCallback)(async(e,t)=>{await d(`/ingredients?id=eq.${e}`,{method:`PATCH`,body:JSON.stringify(t)}),m(n=>n.map(n=>n.id===e?{...n,...t}:n))},[]),Oe=(0,r.useCallback)(async()=>{try{let e=await d(`/subgroups?select=group,subgroup,subgroup2,description`),t={};for(let n of e)n.group&&n.subgroup&&n.subgroup2&&(t[`${n.group}::${n.subgroup}::${n.subgroup2}`]=n.description),n.group&&n.subgroup&&(t[`${n.group}::${n.subgroup}`]=n.description),n.group&&!n.subgroup&&(t[n.group]=n.description);v(t)}catch{}},[]);(0,r.useEffect)(()=>{e&&(a===`products`&&X(),a===`ingredients`&&Ce(),Object.keys(_).length===0&&Oe())},[a,e]);let ke=(0,r.useRef)(!1),Z=async e=>{if(y[e.id]){k({...e,price_tier:P(e.price_rub),is_face:N(e.product_type),ingredients:y[e.id]});return}try{let t=(await d(`/product_ingredients?product_id=eq.${e.id}&select=${encodeURIComponent(L)}&order=position.asc`)).map(F);x(n=>({...n,[e.id]:t})),k({...e,price_tier:P(e.price_rub),is_face:N(e.product_type),ingredients:t})}catch{k({...e,ingredients:[]})}},Ae=(0,r.useCallback)(async e=>{if(!(!e||y[e.id]))try{let t=await d(`/product_ingredients?product_id=eq.${e.id}&select=${encodeURIComponent(L)}&order=position.asc`);x(n=>({...n,[e.id]:t.map(F)}))}catch{}},[y]),Q=(0,r.useCallback)(async e=>{let t=c.map(e=>e.id).filter(e=>!y[e]),n={};for(let r=0;r<t.length;r+=40){let i=await d(`/product_ingredients?product_id=in.(${t.slice(r,r+40).join(`,`)})&select=product_id,${encodeURIComponent(L)}&order=position.asc`);for(let e of i)(n[e.product_id]=n[e.product_id]||[]).push(F(e));e&&e(Math.min(r+40,t.length),t.length)}return x(e=>({...e,...n})),c.map(e=>({...e,price_tier:P(e.price_rub),is_face:N(e.product_type),ingredients:y[e.id]||n[e.id]||[]}))},[c,y]);(0,r.useEffect)(()=>{!e||ke.current||c.length&&(ke.current=!0,Q().catch(()=>{ke.current=!1}))},[e,c,Q]);let je=e=>{let t=(e.skin_type||``).toLowerCase(),n=[];return t.includes(`жирн`)&&n.push(`жирный`),t.includes(`норм`)&&n.push(`нормальный`),t.includes(`сух`)&&n.push(`сухой`),n},Me={жирный:`жирнится за 1–2 дня`,нормальный:`жирнится за 2–4 дня`,сухой:`жирнится за 5–7 дней`},Ne={moisture:`Увлажнение`,nutrition:`Питание`,repair:`Восстановление`,protection:`Защита`},Pe=[{id:`noAllergen`,label:`Без аллергенов`,status:`live`,test:e=>y[e.id]?!y[e.id].some(e=>e.ing.is_eu_allergen):!0},{id:`curls`,label:`Подходит кудряшкам`,status:`live`,test:e=>e.attr_curls===!0},{id:`sensitive`,label:`Чувствительная кожа`,status:`live`,test:e=>e.attr_sensitive===!0||(e.skin_type||``).toLowerCase().includes(`чувств`)},{id:`dandruff`,label:`Против перхоти`,status:`soon`,test:()=>!0},{id:`blonde`,label:`Для блонда`,status:`soon`,test:()=>!0},{id:`hairloss`,label:`При выпадении`,status:`soon`,test:()=>!0}],Fe=(0,r.useMemo)(()=>({types:[...new Set(c.map(e=>e.product_type).filter(Boolean))].sort(),washes:[...new Set(c.filter(e=>(e.product_type||``).toLowerCase().includes(`шампунь`)).map(e=>e.analytical_type).filter(Boolean))].sort(),prices:[`бюджетно`,`средняя`,`высокая`].filter(e=>c.some(t=>t.price_tier===e))}),[c]),Ie=(H.type||``).toLowerCase(),Le=Ie.includes(`шампунь`),Re=!!Ie.match(/маск|кондиционер/),ze=Re,Be=Le,Ve=Le,He=Pe.filter(e=>e.id===`curls`?Re||Le:!0),Ue=(()=>{let e=c.filter(e=>{let t=E.toLowerCase();if(t&&!(e.name?.toLowerCase().includes(t)||e.brand?.toLowerCase().includes(t))||H.type&&e.product_type!==H.type||H.price&&e.price_tier!==H.price||H.wash&&e.analytical_type!==H.wash||H.scalp&&!je(e).includes(H.scalp))return!1;if(H.fn){let t=e[`attr_`+H.fn];if(t!==`full`&&t!==`some`&&t!==!0)return!1}for(let t of Pe)if(H.flags[t.id]&&t.status===`live`&&!t.test(e))return!1;return!0}),t=(e,t)=>(e.name||``).localeCompare(t.name||``,`ru`),n=e=>{let t=(e.notes||``).toLowerCase();return t.includes(`рекомендов`)||t.includes(`супер состав`)},r=e=>{let t=y[e.id];return t?!t.some(e=>e.ing.is_eu_allergen||e.ing.is_avoid):!1},i=[...e];return W===`recommend`?i.sort((e,i)=>{let a=n(e)?0:r(e)?1:2,o=n(i)?0:r(i)?1:2;return a===o?t(e,i):a-o}):W===`price`?i.sort((e,n)=>(e.price_rub??1/0)-(n.price_rub??1/0)||t(e,n)):W===`name`?i.sort(t):W===`type`?i.sort((e,n)=>(e.product_type||`я`).localeCompare(n.product_type||`я`,`ru`)||t(e,n)):W===`brand`?i.sort((e,n)=>(e.brand||`я`).localeCompare(n.brand||`я`,`ru`)||t(e,n)):i.sort((e,t)=>{let n=e.created_at?Date.parse(e.created_at):0;return(t.created_at?Date.parse(t.created_at):0)-n||t.id-e.id}),i})(),$=[H.type,H.fn,H.price,H.scalp,H.wash].filter(Boolean).length+Object.values(H.flags).filter(Boolean).length,We=()=>U({type:``,fn:``,scalp:``,wash:``,price:``,flags:{}}),Ge=e=>U(t=>({...t,flags:{...t.flags,[e]:!t.flags[e]}})),Ke=e=>U(t=>{let n=(e||``).toLowerCase(),r=n.includes(`шампунь`),i=!!n.match(/маск|кондиционер/);return{...t,type:e,fn:!e||i?t.fn:``,scalp:!e||r?t.scalp:``,wash:!e||r?t.wash:``}});return Fe.types,n?e?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`style`,{children:j}),(0,o.jsxs)(`div`,{className:`app`,children:[(0,o.jsx)(Te,{}),(0,o.jsxs)(`div`,{className:`topbar`,children:[(0,o.jsx)(`div`,{className:`topbar-aurora`,"aria-hidden":`true`}),(0,o.jsx)(`div`,{className:`topbar-veil`,"aria-hidden":`true`}),(0,o.jsxs)(`div`,{className:`brand`,children:[(0,o.jsx)(`div`,{className:`brand-mark`,children:(0,o.jsxs)(`svg`,{width:`40`,height:`44`,viewBox:`0 0 40 44`,fill:`none`,"aria-hidden":`true`,children:[(0,o.jsxs)(`defs`,{children:[(0,o.jsxs)(`linearGradient`,{id:`flask-glass`,x1:`0`,y1:`0`,x2:`1`,y2:`0.3`,children:[(0,o.jsx)(`stop`,{offset:`0`,stopColor:`#1d8f66`}),(0,o.jsx)(`stop`,{offset:`0.35`,stopColor:`#0f6b4d`}),(0,o.jsx)(`stop`,{offset:`0.65`,stopColor:`#0a5a40`}),(0,o.jsx)(`stop`,{offset:`1`,stopColor:`#063a2a`})]}),(0,o.jsxs)(`radialGradient`,{id:`flask-sheen`,cx:`0.32`,cy:`0.28`,r:`0.8`,children:[(0,o.jsx)(`stop`,{offset:`0`,stopColor:`#7fe3bb`,stopOpacity:`0.9`}),(0,o.jsx)(`stop`,{offset:`0.4`,stopColor:`#2ea579`,stopOpacity:`0.15`}),(0,o.jsx)(`stop`,{offset:`1`,stopColor:`#063a2a`,stopOpacity:`0`})]}),(0,o.jsxs)(`linearGradient`,{id:`flask-liquid`,x1:`0`,y1:`0`,x2:`0.2`,y2:`1`,children:[(0,o.jsx)(`stop`,{offset:`0`,stopColor:`#74e0b4`}),(0,o.jsx)(`stop`,{offset:`1`,stopColor:`#1d9e72`})]}),(0,o.jsx)(`clipPath`,{id:`flask-clip`,children:(0,o.jsx)(`path`,{d:`M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z`})})]}),(0,o.jsx)(`g`,{className:`flask-drop`,children:(0,o.jsx)(`rect`,{x:`18.2`,y:`0`,width:`3.6`,height:`3.6`,rx:`1`,fill:`#f0a98f`})}),(0,o.jsx)(`g`,{className:`flask-drop d2`,children:(0,o.jsx)(`circle`,{cx:`20`,cy:`0`,r:`2`,fill:`#b98fd6`})}),(0,o.jsx)(`g`,{className:`flask-drop d3`,children:(0,o.jsx)(`rect`,{x:`18.5`,y:`0`,width:`3`,height:`3`,rx:`1.5`,fill:`#6fa8d8`})}),(0,o.jsxs)(`g`,{className:`flask-body`,children:[(0,o.jsx)(`path`,{d:`M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z`,fill:`url(#flask-glass)`,stroke:`#052e20`,strokeWidth:`1`,strokeLinejoin:`round`}),(0,o.jsxs)(`g`,{clipPath:`url(#flask-clip)`,children:[(0,o.jsx)(`path`,{d:`M7 33 Q5 37 4 40 a7 7 0 0 0 6 7 h20 a7 7 0 0 0 6 -7 Q35 37 33 33 Z`,fill:`url(#flask-liquid)`,opacity:`0.95`}),(0,o.jsx)(`path`,{d:`M7 33 Q13 30 20 33 Q27 36 33 33`,stroke:`#8fe9c4`,strokeWidth:`1.5`,fill:`none`,opacity:`0.8`}),(0,o.jsx)(`circle`,{className:`flask-bub`,cx:`13`,cy:`41`,r:`1.6`,fill:`rgba(255,255,255,0.88)`}),(0,o.jsx)(`circle`,{className:`flask-bub b2`,cx:`21`,cy:`43`,r:`1.1`,fill:`rgba(255,255,255,0.78)`}),(0,o.jsx)(`circle`,{className:`flask-bub b3`,cx:`17`,cy:`42`,r:`1.4`,fill:`rgba(255,255,255,0.82)`}),(0,o.jsx)(`circle`,{className:`flask-bub b4`,cx:`26`,cy:`44`,r:`0.9`,fill:`rgba(255,255,255,0.72)`}),(0,o.jsx)(`circle`,{className:`flask-bub`,cx:`19`,cy:`45`,r:`1.2`,fill:`rgba(255,255,255,0.75)`,style:{animationDelay:`0.9s`}}),(0,o.jsx)(`circle`,{className:`flask-bub b2`,cx:`24`,cy:`40`,r:`0.8`,fill:`rgba(255,255,255,0.65)`,style:{animationDelay:`1.4s`}})]}),(0,o.jsx)(`path`,{d:`M15 5 v11 L4 36 a7 7 0 0 0 6 11 h20 a7 7 0 0 0 6 -11 L25 16 V5 z`,fill:`url(#flask-sheen)`}),(0,o.jsx)(`g`,{clipPath:`url(#flask-clip)`,children:(0,o.jsx)(`rect`,{className:`flask-shade`,x:`26`,y:`2`,width:`14`,height:`48`,fill:`#042319`})}),(0,o.jsx)(`path`,{d:`M17.5 8 v8 l-4.5 8`,stroke:`rgba(255,255,255,0.6)`,strokeWidth:`1.3`,strokeLinecap:`round`,fill:`none`}),(0,o.jsx)(`line`,{x1:`12.5`,y1:`5`,x2:`27.5`,y2:`5`,stroke:`#052e20`,strokeWidth:`2.6`,strokeLinecap:`round`}),(0,o.jsx)(`line`,{x1:`13`,y1:`4.3`,x2:`27`,y2:`4.3`,stroke:`rgba(255,255,255,0.5)`,strokeWidth:`1`,strokeLinecap:`round`})]})]})}),(0,o.jsxs)(`div`,{className:`brand-text`,children:[(0,o.jsx)(`strong`,{children:`beauty helper`}),(0,o.jsx)(`span`,{children:`косметическая база · анализ составов`})]})]}),(0,o.jsxs)(`div`,{className:`topbar-actions`,children:[(0,o.jsx)(`button`,{className:`btn btn-sm ${K?`btn-primary`:`btn-glass`}`,onClick:()=>pe(e=>!e),children:K?`✓ Режим редактора`:`Режим редактора`}),K&&a===`products`&&(0,o.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>R(!0),children:`+ Средство`}),K&&a===`ingredients`&&(0,o.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>V(!0),children:`+ Ингредиент`}),(0,o.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:()=>fe(e=>!e),title:`Настройки`,children:`⚙`}),(0,o.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:()=>{h(),t(!1)},children:`Выйти`})]})]}),de&&(0,o.jsxs)(`div`,{style:{background:`rgba(20,40,32,0.9)`,padding:`12px 2rem`,display:`flex`,alignItems:`center`,gap:12,flexWrap:`wrap`},children:[(0,o.jsx)(`span`,{style:{fontSize:12,color:`#cbd8cf`,flexShrink:0},children:`API-ключ remove.bg:`}),(0,o.jsx)(`input`,{type:`password`,value:G,onChange:e=>ue(e.target.value),placeholder:`Вставьте ключ — он нигде не сохраняется`,style:{flex:1,minWidth:260,padding:`7px 12px`,borderRadius:8,border:`1px solid #3a5a4a`,background:`#0f231a`,color:`#eef2ef`,fontSize:13,fontFamily:`monospace`,outline:`none`}}),G&&(0,o.jsx)(`span`,{style:{fontSize:12,color:`#7fcaa0`},children:`✓ Ключ введён`})]}),(0,o.jsx)(`div`,{className:`tabs-bar`,children:(0,o.jsxs)(`div`,{className:`tabs`,children:[(0,o.jsx)(`button`,{className:`tab ${a===`products`?`active`:``}`,onClick:()=>{s(`products`),D(``)},children:`Средства`}),(0,o.jsx)(`button`,{className:`tab ${a===`ingredients`?`active`:``}`,onClick:()=>{s(`ingredients`),D(``)},children:`Ингредиенты`}),(0,o.jsx)(`button`,{className:`tab ${a===`similar`?`active`:``}`,onClick:()=>{s(`similar`),D(``)},children:`Аналоги`}),(0,o.jsx)(`button`,{className:`tab ${a===`compare`?`active`:``}`,onClick:()=>{s(`compare`),D(``)},children:`Сравнение`})]})}),(0,o.jsxs)(`div`,{className:`main`,children:[w&&(0,o.jsx)(`div`,{className:`error-msg`,children:w}),a===`products`&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`div`,{className:`toolbar`,children:[(0,o.jsx)(`input`,{className:`search`,placeholder:`Поиск по названию или бренду…`,value:E,onChange:e=>D(e.target.value)}),(0,o.jsxs)(`button`,{className:`btn btn-sm ${$?`btn-primary`:`btn-glass`} filter-toggle`,onClick:()=>se(e=>!e),children:[(0,o.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,style:{marginRight:6,verticalAlign:`-2px`},children:(0,o.jsx)(`path`,{d:`M1 2h12M3 7h8M5 12h4`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})}),`Фильтры`,$?` · ${$}`:``]})]}),oe&&(0,o.jsxs)(`div`,{className:`filter-panel`,children:[(0,o.jsxs)(`div`,{className:`filter-field`,children:[(0,o.jsx)(`label`,{children:`Вид средства`}),(0,o.jsx)(ne,{value:H.type,onChange:Ke,types:Fe.types})]}),ze&&(0,o.jsxs)(`div`,{className:`filter-field`,children:[(0,o.jsx)(`label`,{children:`Функция`}),(0,o.jsxs)(`select`,{value:H.fn,onChange:e=>U(t=>({...t,fn:e.target.value})),children:[(0,o.jsx)(`option`,{value:``,children:`Любая`}),Object.entries(Ne).map(([e,t])=>(0,o.jsx)(`option`,{value:e,children:t},e))]})]}),Be&&(0,o.jsxs)(`div`,{className:`filter-field`,children:[(0,o.jsx)(`label`,{children:`Тип кожи головы`}),(0,o.jsxs)(`select`,{value:H.scalp,onChange:e=>U(t=>({...t,scalp:e.target.value})),children:[(0,o.jsx)(`option`,{value:``,children:`Любой`}),Object.entries(Me).map(([e,t])=>(0,o.jsxs)(`option`,{value:e,style:{textTransform:`capitalize`},children:[e,` · `,t]},e))]})]}),Ve&&Fe.washes.length>0&&(0,o.jsxs)(`div`,{className:`filter-field`,children:[(0,o.jsxs)(`label`,{children:[`Промывающая способность `,(0,o.jsx)(`span`,{className:`field-hint`,children:`для продвинутых`})]}),(0,o.jsxs)(`select`,{value:H.wash,onChange:e=>U(t=>({...t,wash:e.target.value})),children:[(0,o.jsx)(`option`,{value:``,children:`Любая`}),Fe.washes.map(e=>(0,o.jsx)(`option`,{value:e,children:e},e))]})]}),(0,o.jsxs)(`div`,{className:`filter-field`,children:[(0,o.jsx)(`label`,{children:`Ценовая категория`}),(0,o.jsxs)(`select`,{value:H.price,onChange:e=>U(t=>({...t,price:e.target.value})),children:[(0,o.jsx)(`option`,{value:``,children:`Любая`}),(0,o.jsx)(`option`,{value:`бюджетно`,children:`Бюджетно`}),(0,o.jsx)(`option`,{value:`средняя`,children:`Средняя`}),(0,o.jsx)(`option`,{value:`высокая`,children:`Высокая`})]})]}),(0,o.jsx)(`div`,{className:`filter-checks`,children:He.map(e=>(0,o.jsxs)(`label`,{className:`filter-check ${e.status===`soon`?`soon`:``}`,title:e.status===`soon`?`В плане реализации`:``,children:[(0,o.jsx)(`input`,{type:`checkbox`,checked:!!H.flags[e.id],onChange:()=>Ge(e.id)}),(0,o.jsxs)(`span`,{children:[e.label,e.status===`soon`&&(0,o.jsx)(`em`,{className:`soon-tag`,children:`скоро`})]})]},e.id))}),$>0&&(0,o.jsx)(`button`,{className:`filter-reset`,onClick:We,children:`Сбросить`})]}),$>0&&(0,o.jsxs)(`div`,{className:`filter-chips`,children:[H.type&&(0,o.jsxs)(`span`,{className:`chip`,onClick:()=>Ke(``),children:[H.type,` ✕`]}),H.fn&&(0,o.jsxs)(`span`,{className:`chip`,onClick:()=>U(e=>({...e,fn:``})),children:[Ne[H.fn],` ✕`]}),H.scalp&&(0,o.jsxs)(`span`,{className:`chip`,onClick:()=>U(e=>({...e,scalp:``})),style:{textTransform:`capitalize`},children:[`Кожа: `,H.scalp,` ✕`]}),H.wash&&(0,o.jsxs)(`span`,{className:`chip`,onClick:()=>U(e=>({...e,wash:``})),children:[H.wash,` ✕`]}),H.price&&(0,o.jsxs)(`span`,{className:`chip`,onClick:()=>U(e=>({...e,price:``})),style:{textTransform:`capitalize`},children:[H.price,` ✕`]}),Pe.filter(e=>H.flags[e.id]).map(e=>(0,o.jsxs)(`span`,{className:`chip`,onClick:()=>Ge(e.id),children:[e.label,` ✕`]},e.id))]}),(0,o.jsxs)(`div`,{className:`section-head`,children:[(0,o.jsx)(`div`,{className:`section-title`,children:`Косметические средства`}),(0,o.jsxs)(`div`,{className:`ing-head-right`,children:[(0,o.jsxs)(`select`,{className:`sim-select ing-sort`,value:W,onChange:e=>ae(e.target.value),children:[(0,o.jsx)(`option`,{value:`recommend`,children:`Рекомендации`}),(0,o.jsx)(`option`,{value:`date`,children:`По дате добавления`}),(0,o.jsx)(`option`,{value:`price`,children:`По цене`}),(0,o.jsx)(`option`,{value:`name`,children:`По названию`}),(0,o.jsx)(`option`,{value:`type`,children:`По группам`}),(0,o.jsx)(`option`,{value:`brand`,children:`По бренду`})]}),(0,o.jsxs)(`div`,{className:`count`,children:[Ue.length,` позиций`]})]})]}),S?(0,o.jsx)(Ee,{}):Ue.length===0?(0,o.jsxs)(`div`,{className:`empty-state`,children:[(0,o.jsx)(`span`,{className:`empty-ic`,children:`◇`}),(0,o.jsx)(`p`,{children:E||$?`Ничего не найдено по выбранным фильтрам`:`Средства ещё не добавлены`}),$>0&&(0,o.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:We,children:`Сбросить фильтры`})]}):(0,o.jsx)(`div`,{className:`grid`,children:Ue.map(e=>(0,o.jsxs)(`div`,{className:`card`,onClick:()=>Z(e),children:[(0,o.jsxs)(`div`,{className:`card-media`,children:[e.product_type&&(0,o.jsx)(`span`,{className:`card-type`,children:e.product_type}),e.image_url?(0,o.jsx)(`img`,{src:e.image_url,alt:e.brand||``}):(0,o.jsx)(`div`,{className:`pt-ph`,style:{width:`70%`,height:`82%`,"--tint":z(e.product_type)},"aria-hidden":`true`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 40 48`,width:`100%`,height:`100%`,children:[(0,o.jsx)(`rect`,{x:`13`,y:`2`,width:`14`,height:`6`,rx:`2`,fill:`var(--tint)`,opacity:`0.85`}),(0,o.jsx)(`rect`,{x:`8`,y:`8`,width:`24`,height:`38`,rx:`7`,fill:`var(--tint)`,opacity:`0.16`,stroke:`var(--tint)`,strokeOpacity:`0.35`,strokeWidth:`1`}),(0,o.jsx)(`text`,{x:`20`,y:`32`,textAnchor:`middle`,fontFamily:`Familjen Grotesk, sans-serif`,fontWeight:`600`,fontSize:`16`,fill:`var(--tint)`,children:te(e)})]})})]}),(0,o.jsxs)(`div`,{className:`card-body`,children:[e.name&&(0,o.jsx)(`div`,{className:`card-name`,children:e.name}),e.brand&&(0,o.jsx)(`div`,{className:`card-brand`,children:e.brand}),(0,o.jsx)(`div`,{className:`card-fns`,children:b(e).map((e,t)=>(0,o.jsx)(`span`,{className:`fn-glass ${e.strong?``:`soft`}`,style:{"--fn":e.hue},children:e.text},t))})]})]},e.id))})]}),a===`ingredients`&&(0,o.jsx)(me,{data:u,loading:S,onOpenDetail:M,editorMode:K,onSaveIngredient:we}),a===`similar`&&(0,o.jsx)(ce,{allProducts:c,allIngredients:u,loadAllCompositions:Q,onOpenProduct:Z}),a===`compare`&&(0,o.jsx)(le,{allProducts:c,allIngredients:u,loadComposition:Ae,compoCache:y,items:q,onRemove:_e,onClear:ve,onOpenProduct:Z})]}),O&&(0,o.jsx)(ie,{product:O,subgroupDesc:_,removeBgKey:G,editorMode:K,onClose:()=>k(null),onOpenDetail:M,onOpenProduct:Z,allProducts:c,compoCache:y,loadAllCompositions:Q,inCompare:q.some(e=>e.id===O.id),compareCount:q.length,compareMax:5,onAddToCompare:()=>ge(O),onGoCompare:ye,onImageSaved:async(e,t)=>{await d(`/products?id=eq.${e}`,{method:`PATCH`,body:JSON.stringify({image_url:t})}),k(e=>e&&{...e,image_url:t}),l(n=>n.map(n=>n.id===e?{...n,image_url:t}:n))},onDelete:async()=>{await d(`/products?id=eq.${O.id}`,{method:`DELETE`}),k(null),X()}}),A&&(0,o.jsx)(re,{detail:A,subgroupDesc:_,allProducts:c,allIngredients:u,compoCache:y,onNavigate:M,onOpenProduct:e=>{M(null),Z(e)},onClose:()=>M(null)}),ee&&(0,o.jsx)(be,{ingredients:u,removeBgKey:G,onClose:()=>R(!1),onSaved:()=>{R(!1),X()}}),B&&(0,o.jsx)(xe,{onClose:()=>V(!1),onSaved:()=>{V(!1),Ce()}})]})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`style`,{children:j}),(0,o.jsx)(De,{onSuccess:()=>t(!0)})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`style`,{children:j}),(0,o.jsx)(`div`,{style:{minHeight:`100vh`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`linear-gradient(168deg,#eef5f3,#e0eeea)`},children:(0,o.jsxs)(`div`,{className:`loading-dots`,children:[(0,o.jsx)(`span`,{}),(0,o.jsx)(`span`,{}),(0,o.jsx)(`span`,{})]})})]})}var R={Шампунь:`#2f8fa6`,Кондиционер:`#3f7fb0`,Маска:`#3f9a63`,Крем:`#c0892f`,Сыворотка:`#9a5fb0`,SPF:`#4f78c4`,Масло:`#b07d2e`,Спрей:`#4a8a9a`,Тонер:`#6b8f5a`},z=e=>R[e]||`#6b8f7e`,te=e=>((e.brand||e.name||`?`).trim()[0]||`?`).toUpperCase();function B({product:e,size:t=56}){let n=z(e.product_type);return e.image_url?(0,o.jsx)(`img`,{className:`pt-img`,src:e.image_url,alt:e.name,style:{width:t,height:t*1.18}}):(0,o.jsx)(`div`,{className:`pt-ph`,style:{width:t,height:t*1.18,"--tint":n},"aria-hidden":`true`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 40 48`,width:`100%`,height:`100%`,children:[(0,o.jsx)(`rect`,{x:`13`,y:`2`,width:`14`,height:`6`,rx:`2`,fill:`var(--tint)`,opacity:`0.85`}),(0,o.jsx)(`rect`,{x:`8`,y:`8`,width:`24`,height:`38`,rx:`7`,fill:`var(--tint)`,opacity:`0.16`,stroke:`var(--tint)`,strokeOpacity:`0.35`,strokeWidth:`1`}),(0,o.jsx)(`text`,{x:`20`,y:`32`,textAnchor:`middle`,fontFamily:`Familjen Grotesk, sans-serif`,fontWeight:`600`,fontSize:`16`,fill:`var(--tint)`,children:te(e)})]})})}var V={Волосы:(0,o.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`17`,height:`17`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,children:(0,o.jsx)(`path`,{d:`M5 4c0 6 1 10 2 16M12 3c0 7 0 11-1 17M19 4c0 6-1 10-2 16`})}),"Лицо и тело":(0,o.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`17`,height:`17`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,children:[(0,o.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`}),(0,o.jsx)(`path`,{d:`M9 10h.01M15 10h.01M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8`})]}),Укладка:(0,o.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`17`,height:`17`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,o.jsx)(`path`,{d:`M6 3h7l-1 6 4 1-7 11 1-8-4-1z`})}),Прочее:(0,o.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`17`,height:`17`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,children:[(0,o.jsx)(`circle`,{cx:`5`,cy:`12`,r:`1.6`}),(0,o.jsx)(`circle`,{cx:`12`,cy:`12`,r:`1.6`}),(0,o.jsx)(`circle`,{cx:`19`,cy:`12`,r:`1.6`})]})},H=[{label:`Волосы`,keywords:[`шампунь`,`маска`,`кондиционер`,`масло`,`несмываемое`,`ко-вошинг`,`хелатное`,`несмываемый`,`спрей`,`бальзам для волос`,`флюид`]},{label:`Лицо и тело`,keywords:[`крем`,`сыворотка`,`тонер`,`гель`,`лосьон`,`молочко`,`мицеллярная`,`пенка`,`скраб`,`пилинг`,`пудра`,`салфетки`,`очищение`,`макияж`,`spf`,`эссенция`,`уход за губами`,`бальзам для губ`,`эмульсия`,`маска для лица`,`ампула`,`бальзам`]},{label:`Укладка`,keywords:[`укладка`,`текстурайзер`,`стайлинг`]}];function ne({value:e,onChange:t,types:n=[]}){let[i,a]=(0,r.useState)(!1),[s,c]=(0,r.useState)(null),l=(0,r.useRef)(null);(0,r.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&a(!1)};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[]);let u=new Set,d=H.map(e=>{let t=n.filter(t=>{let n=t.toLowerCase();return e.keywords.some(e=>n.includes(e))&&!u.has(t)});return t.forEach(e=>u.add(e)),{label:e.label,items:t}}).filter(e=>e.items.length),f=n.filter(e=>!u.has(e));f.length&&d.push({label:`Прочее`,items:f});let p=e=>{t(e),a(!1),c(null)};return(0,o.jsxs)(`div`,{className:`hier-type`,ref:l,children:[(0,o.jsxs)(`button`,{type:`button`,className:`hier-trigger`,onClick:()=>a(e=>!e),children:[(0,o.jsx)(`span`,{children:e||`Все виды`}),(0,o.jsx)(`span`,{className:`hier-caret`,children:i?`▴`:`▾`})]}),i&&(0,o.jsxs)(`div`,{className:`hier-menu`,children:[(0,o.jsx)(`div`,{className:`hier-root ${e?``:`active`}`,onClick:()=>p(``),children:`Все виды`}),d.map(t=>(0,o.jsxs)(`div`,{className:`hier-group`,onMouseEnter:()=>c(t.label),onMouseLeave:()=>c(null),children:[(0,o.jsxs)(`div`,{className:`hier-group-head`,children:[(0,o.jsxs)(`span`,{className:`hier-group-name`,children:[(0,o.jsx)(`span`,{className:`hier-ic`,children:V[t.label]}),t.label]}),(0,o.jsx)(`span`,{className:`hier-arrow`,children:`›`})]}),s===t.label&&(0,o.jsx)(`div`,{className:`hier-sub`,children:t.items.map(t=>(0,o.jsx)(`div`,{className:`hier-item ${e===t?`active`:``}`,onClick:()=>p(t),children:t},t))})]},t.label))]})]})}function U({product:e,score:t,onClick:n}){let r=t>=70?`#1f7a5c`:t>=45?`#c98a3a`:`#8b8f86`;return(0,o.jsxs)(`button`,{className:`pcard`,onClick:n,children:[(0,o.jsxs)(`div`,{className:`pcard-media`,children:[e.product_type&&(0,o.jsx)(`span`,{className:`pcard-type`,children:e.product_type}),typeof t==`number`&&(0,o.jsxs)(`span`,{className:`pcard-match`,style:{"--m":r},children:[t,`%`]}),e.image_url?(0,o.jsx)(`img`,{src:e.image_url,alt:e.name}):(0,o.jsx)(`div`,{className:`pt-ph`,style:{width:`70%`,height:`82%`,"--tint":z(e.product_type)},"aria-hidden":`true`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 40 48`,width:`100%`,height:`100%`,children:[(0,o.jsx)(`rect`,{x:`13`,y:`2`,width:`14`,height:`6`,rx:`2`,fill:`var(--tint)`,opacity:`0.85`}),(0,o.jsx)(`rect`,{x:`8`,y:`8`,width:`24`,height:`38`,rx:`7`,fill:`var(--tint)`,opacity:`0.16`,stroke:`var(--tint)`,strokeOpacity:`0.35`,strokeWidth:`1`}),(0,o.jsx)(`text`,{x:`20`,y:`32`,textAnchor:`middle`,fontFamily:`Familjen Grotesk, sans-serif`,fontWeight:`600`,fontSize:`16`,fill:`var(--tint)`,children:te(e)})]})})]}),(0,o.jsxs)(`div`,{className:`pcard-body`,children:[(0,o.jsx)(`div`,{className:`pcard-name`,children:e.name}),(0,o.jsx)(`div`,{className:`pcard-brand`,children:e.brand})]})]})}function re({detail:e,onNavigate:t,onOpenProduct:n,onClose:i,onAddToCompare:a,onGoCompare:s,subgroupDesc:c,allProducts:l=[],allIngredients:u=[],compoCache:d={}}){let[f,p]=(0,r.useState)(!1);(0,r.useEffect)(()=>{p(!1)},[e.kind,e.inci,e.group,e.subgroup]);let m=l.filter(e=>d[e.id]).map(e=>({...e,ingredients:d[e.id]})),h=m.length,g=e=>m.filter(t=>t.ingredients.some(t=>C(t.ing.inci_name)===C(e))),_=(e,t)=>m.filter(n=>n.ingredients.some(n=>n.ing.group===e&&(!t||n.ing.subgroup===t))),y=(e,t)=>u.filter(n=>n.group===e&&(!t||n.subgroup===t)),b=e=>{let n=u.find(t=>C(t.inci_name)===C(e))||m.flatMap(e=>e.ingredients).map(e=>e.ing).find(t=>C(t.inci_name)===C(e));n&&t({kind:`ingredient`,inci:n.inci_name,ru:n.ru_name,description:n.description,is_eu_allergen:n.is_eu_allergen,groups:n.allGroups&&n.allGroups.length?n.allGroups.map(e=>({group:e.group,subgroup:e.subgroup,subgroup2:e.subgroup2})):[{group:n.group,subgroup:n.subgroup,subgroup2:n.subgroup2}]})},x=(e,n)=>t({kind:`group`,group:e,subgroup:n}),w;if(e.kind===`ingredient`){let t=g(e.inci);w=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`div`,{className:`dm-head`,children:[(0,o.jsx)(`span`,{className:`dm-kind`,children:`Ингредиент`}),(0,o.jsx)(`h2`,{className:`dm-title`,children:e.inci}),e.ru&&(0,o.jsx)(`div`,{className:`dm-sub`,children:e.ru}),e.is_eu_allergen&&(0,o.jsx)(`span`,{className:`dm-allergen`,children:`Аллерген ЕС`})]}),e.description&&(0,o.jsx)(`p`,{className:`dm-desc`,children:e.description}),!e.description&&(0,o.jsx)(`p`,{className:`dm-desc dm-muted`,children:`Описание пока готовится.`}),(a||s)&&(0,o.jsxs)(`div`,{className:`dm-cmp-actions`,children:[a&&(0,o.jsx)(`button`,{className:`btn btn-glass btn-sm ${f?`is-added`:``}`,onClick:()=>{a(e.inci),p(!0)},disabled:f,children:f?`✓ В сравнении`:`＋ Добавить в сравнение`}),s&&(0,o.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:s,children:`Перейти к сравнению →`})]}),(0,o.jsxs)(`div`,{className:`dm-section`,children:[(0,o.jsx)(`span`,{className:`dm-label`,children:`Группы и подгруппы`}),e.groups.map((e,t)=>(0,o.jsxs)(`div`,{className:`dm-grouprow`,children:[(0,o.jsx)(`span`,{className:`g-tag`,style:{background:v(e.group)+`1f`,color:v(e.group)},onClick:()=>x(e.group),children:e.group}),e.subgroup&&(0,o.jsx)(`span`,{className:`dm-arrow`,children:`→`}),e.subgroup&&(0,o.jsx)(`span`,{className:`dm-subtag`,onClick:()=>x(e.group,e.subgroup),children:e.subgroup}),e.subgroup2&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:`dm-arrow`,children:`→`}),(0,o.jsx)(`span`,{className:`dm-subtag`,children:e.subgroup2})]}),S(c,e.group,e.subgroup,e.subgroup2)&&(0,o.jsx)(`p`,{className:`dm-groupdesc`,children:S(c,e.group,e.subgroup,e.subgroup2)})]},t))]}),(0,o.jsxs)(`div`,{className:`dm-section`,children:[(0,o.jsxs)(`span`,{className:`dm-label`,children:[`Встречается в средствах`,h?` (${t.length})`:``]}),h===0?(0,o.jsx)(`p`,{className:`dm-muted`,children:`Чтобы увидеть, в каких средствах встречается компонент, откройте вкладку «Поиск аналогов» — составы подгрузятся, и список появится здесь.`}):t.length===0?(0,o.jsx)(`p`,{className:`dm-muted`,children:`Среди загруженных составов средств с этим компонентом нет.`}):(0,o.jsx)(`div`,{className:`pcards ${t.length<=3?`few`:``}`,children:t.map(e=>(0,o.jsx)(U,{product:e,onClick:()=>n(e)},e.id))})]})]})}else if(e.kind===`group`){let t=S(c,e.group,e.subgroup),r=y(e.group,e.subgroup),i=_(e.group,e.subgroup);w=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`div`,{className:`dm-head`,children:[(0,o.jsx)(`span`,{className:`dm-kind`,children:e.subgroup?`Подгруппа`:`Группа`}),(0,o.jsx)(`h2`,{className:`dm-title`,style:{color:v(e.group)},children:e.subgroup||e.group}),e.subgroup&&(0,o.jsxs)(`div`,{className:`dm-sub`,onClick:()=>x(e.group),style:{cursor:`pointer`},children:[`в группе «`,e.group,`»`]})]}),t?(0,o.jsx)(`p`,{className:`dm-desc`,children:t}):(0,o.jsx)(`p`,{className:`dm-desc dm-muted`,children:`Описание этой группы пока готовится.`}),r.length>0&&(0,o.jsxs)(`div`,{className:`dm-section`,children:[(0,o.jsxs)(`span`,{className:`dm-label`,children:[`Компоненты этой группы (`,r.length,`)`]}),(0,o.jsx)(`div`,{className:`dm-chips`,children:r.map(e=>(0,o.jsxs)(`span`,{className:`dm-ingchip`,onClick:()=>b(e.inci_name),children:[e.inci_name,e.ru_name?` · ${e.ru_name}`:``]},e.id))})]}),(0,o.jsxs)(`div`,{className:`dm-section`,children:[(0,o.jsxs)(`span`,{className:`dm-label`,children:[`Средства с этой группой`,h?` (${i.length})`:``]}),h===0?(0,o.jsx)(`p`,{className:`dm-muted`,children:`Откройте вкладку «Поиск аналогов», чтобы подгрузить составы — тогда здесь появятся средства с этой группой.`}):i.length===0?(0,o.jsx)(`p`,{className:`dm-muted`,children:`Среди загруженных составов средств с этой группой нет.`}):(0,o.jsx)(`div`,{className:`pcards ${i.length<=3?`few`:``}`,children:i.map(e=>(0,o.jsx)(U,{product:e,onClick:()=>n(e)},e.id))})]})]})}else e.kind===`info`&&(w=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`div`,{className:`dm-head`,children:[(0,o.jsx)(`span`,{className:`dm-kind`,children:e.category}),(0,o.jsx)(`h2`,{className:`dm-title`,children:e.title}),e.subtitle&&(0,o.jsx)(`div`,{className:`dm-sub`,children:e.subtitle})]}),e.description?(0,o.jsx)(`p`,{className:`dm-desc`,children:e.description}):(0,o.jsx)(`p`,{className:`dm-desc dm-muted`,children:`Подробное описание этой категории готовится. Здесь появится отдельная страница с разбором: что это значит, кому подходит и как выбирать.`})]}));return(0,o.jsx)(`div`,{className:`overlay`,onClick:i,children:(0,o.jsxs)(`div`,{className:`modal dm-modal`,onClick:e=>e.stopPropagation(),children:[(0,o.jsx)(`button`,{className:`modal-close`,onClick:i,children:`✕`}),(0,o.jsx)(`div`,{className:`dm-body`,children:w})]})})}function W(e){let t=e.ingredients||[];if(!t.length)return null;let n=t.map(e=>({inci:e.ing.inci_name,group:e.ing.group,position:e.position})),r=G(n).map(e=>e.text),i=t.filter(e=>e.ing.is_eu_allergen).length,a=t.length,o=n.findIndex(e=>(e.group||``).toLowerCase().includes(`отдушк`)),s=o>0?o:a,c=[];if(r.length){let e=r.slice(0,3).map(e=>e.toLowerCase());c.push(`Работает на ${e.join(`, `)}`)}return c.push(`${a} ингредиент${a%10==1&&a%100!=11?``:a%10>=2&&a%10<=4&&(a%100<10||a%100>=20)?`а`:`ов`}, из них ~${s} в активной части`),c.push(i===0?`аллергенов EU не обнаружено`:`${i} потенциальн${i===1?`ый аллерген`:`ых аллергена(ов)`} EU`),{text:c.join(` · `),fns:r,allergens:i}}function ie({product:e,onClose:t,onOpenDetail:n,onOpenProduct:i,subgroupDesc:a,allProducts:s=[],compoCache:c={},loadAllCompositions:l,onImageSaved:u,onDelete:d,removeBgKey:f,editorMode:p=!1,inCompare:m=!1,compareCount:h=0,compareMax:g=5,onAddToCompare:_,onGoCompare:y}){let[x,C]=(0,r.useState)(!1);(0,r.useEffect)(()=>{l&&l().catch(()=>{})},[]);let w=e=>n({kind:`ingredient`,inci:e.inci_name,ru:e.ru_name,description:e.description,is_eu_allergen:e.is_eu_allergen,groups:[{group:e.group,subgroup:e.subgroup,subgroup2:e.subgroup2}]}),T=e=>n({kind:`group`,group:e}),E=(e,t)=>n({kind:`group`,group:e,subgroup:t}),O=(e,t,r)=>n({kind:`info`,category:e,title:t,subtitle:r}),k=(e,t)=>{if((e.product_type||``).toLowerCase().includes(`шампунь`)){if(t.text===e.analytical_type)return O(`Промывающая способность`,t.text,`Что означает этот тип очищения и кому он подходит`);if(t.text===e.skin_type)return O(`Тип кожи головы`,t.text,`Особенности этого типа кожи головы и подбор ухода`)}return O(`Характеристика средства`,t.text)},j=b(e),M=(e.product_type||``).toLowerCase().includes(`шампунь`)?`Очищение и тип кожи головы`:(e.product_type||``).toLowerCase().match(/маск|кондиционер/)?`Действие`:`Характеристики`,N=e.ingredients.filter(e=>e.ing.is_eu_allergen).length,P=Math.max(40,100-N*18),F=P>=85?{label:`Высокая безопасность`,note:`аллергенов не обнаружено`,color:`#1f7a5c`}:P>=65?{label:`Средняя безопасность`,note:`${N} аллерген(ов) в составе`,color:`#c98a3a`}:{label:`Пониженная безопасность`,note:`${N} аллерген(ов) в составе`,color:`#c0584f`},I=e.ingredients.filter(e=>e.matched).length,L=(0,r.useMemo)(()=>{let t=D(e);if(!t.length)return[];let n=s.filter(t=>t.id!==e.id&&c[t.id]).map(e=>({...e,ingredients:c[e.id]}));return n.length?A(t,e,n,{sameType:!0}).slice(0,4):[]},[e.id,s,c]);return(0,o.jsx)(`div`,{className:`overlay`,onClick:t,children:(0,o.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(`div`,{className:`modal-head`,children:[(0,o.jsx)(`div`,{className:`modal-media`,children:e.image_url?(0,o.jsx)(`img`,{src:e.image_url,alt:e.name}):(0,o.jsx)(`div`,{className:`pt-ph`,style:{width:`58%`,height:`72%`,"--tint":z(e.product_type)},"aria-hidden":`true`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 40 48`,width:`100%`,height:`100%`,children:[(0,o.jsx)(`rect`,{x:`13`,y:`2`,width:`14`,height:`6`,rx:`2`,fill:`var(--tint)`,opacity:`0.85`}),(0,o.jsx)(`rect`,{x:`8`,y:`8`,width:`24`,height:`38`,rx:`7`,fill:`var(--tint)`,opacity:`0.16`,stroke:`var(--tint)`,strokeOpacity:`0.35`,strokeWidth:`1`}),(0,o.jsx)(`text`,{x:`20`,y:`32`,textAnchor:`middle`,fontFamily:`Familjen Grotesk, sans-serif`,fontWeight:`600`,fontSize:`16`,fill:`var(--tint)`,children:te(e)})]})})}),(0,o.jsxs)(`div`,{className:`modal-info`,children:[(0,o.jsx)(`button`,{className:`modal-close`,onClick:t,children:`✕`}),(0,o.jsx)(`div`,{className:`modal-title`,children:e.name}),(0,o.jsx)(`div`,{className:`modal-brand`,children:e.brand}),(0,o.jsxs)(`div`,{className:`meta-row`,children:[e.product_type&&(0,o.jsxs)(`div`,{className:`meta-item`,children:[(0,o.jsx)(`span`,{className:`meta-label`,children:`Категория`}),(0,o.jsx)(`span`,{className:`meta-value meta-link`,onClick:()=>O(`Вид средства`,e.product_type,`Что это за категория средств и как её выбирать`),children:e.product_type})]}),e.price_tier&&(0,o.jsxs)(`div`,{className:`meta-item`,children:[(0,o.jsx)(`span`,{className:`meta-label`,children:`Цена`}),(0,o.jsx)(`span`,{className:`meta-value`,style:{textTransform:`capitalize`},children:e.price_tier})]}),e.is_face&&(0,o.jsxs)(`div`,{className:`meta-item`,children:[(0,o.jsx)(`span`,{className:`meta-label`,children:`Зона`}),(0,o.jsx)(`span`,{className:`meta-value`,children:`Для лица`})]})]}),j.length>0&&(0,o.jsxs)(`div`,{className:`fn-block`,children:[(0,o.jsx)(`span`,{className:`fn-block-label`,children:M}),(0,o.jsx)(`div`,{className:`fn-list`,children:j.map((t,n)=>(0,o.jsxs)(`span`,{className:`fn-glass-lg ${t.strong?``:`soft`} fn-clickable`,style:{"--fn":t.hue},onClick:()=>k(e,t),children:[(0,o.jsx)(`span`,{className:`dot`}),t.text]},n))})]}),(0,o.jsxs)(`div`,{className:`safety safety-link`,onClick:()=>O(`Степень безопасности`,F.label,`Как мы считаем степень безопасности и что влияет на оценку`),children:[(0,o.jsx)(`div`,{className:`safety-ring`,style:{background:F.color},children:P}),(0,o.jsxs)(`div`,{className:`safety-txt`,children:[(0,o.jsx)(`b`,{style:{color:F.color},children:F.label}),(0,o.jsx)(`span`,{children:F.note})]}),(0,o.jsx)(`span`,{className:`safety-arrow`,children:`→`})]}),(()=>{let t=W(e),n=(e.notes||``).toLowerCase(),r=n.includes(`супер состав`)?{icon:`🏆`,label:`Супер состав`,cls:`badge-gold`}:n.includes(`рекомендовано`)||n.includes(`рекомендован`)?{icon:`⭐`,label:`Рекомендовано`,cls:`badge-star`}:null;return!t&&!r?null:(0,o.jsxs)(`div`,{className:`summary-block`,children:[r&&(0,o.jsxs)(`span`,{className:`notes-badge ${r.cls}`,children:[r.icon,` `,r.label]}),t&&(0,o.jsx)(`p`,{className:`summary-text`,children:t.text})]})})(),(0,o.jsxs)(`div`,{className:`cmp-add-row`,children:[(0,o.jsx)(`button`,{className:`btn btn-sm ${m?`btn-glass is-added`:`btn-glass`}`,onClick:_,disabled:m||h>=g,children:m?`✓ В сравнении`:`＋ Добавить в сравнение`}),h>0&&(0,o.jsxs)(`button`,{className:`btn btn-primary btn-sm`,onClick:y,children:[`Перейти к сравнению (`,h,`)`]})]}),!m&&h>=g&&(0,o.jsx)(`div`,{className:`cmp-add-note`,children:`Добавлено максимальное количество средств для сравнения`}),p&&(x?(0,o.jsxs)(`div`,{style:{marginTop:10,padding:12,border:`1px solid var(--glass-border)`,borderRadius:12},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:8},children:[(0,o.jsx)(`span`,{style:{fontSize:12,color:`var(--ink-soft)`},children:`Изображение`}),(0,o.jsx)(`button`,{className:`btn btn-glass btn-sm`,onClick:()=>C(!1),children:`Отмена`})]}),(0,o.jsx)(ye,{removeBgKey:f,onDone:async t=>{t&&u&&(await u(e.id,t),C(!1))}})]}):(0,o.jsx)(`button`,{className:`btn btn-glass btn-sm photo-btn`,onClick:()=>C(!0),children:e.image_url?`Заменить фото`:`＋ Добавить фото`}))]})]}),(0,o.jsxs)(`div`,{className:`compo`,children:[(0,o.jsxs)(`div`,{className:`compo-head`,children:[`Состав, `,e.ingredients.length,` ингредиентов `,(0,o.jsxs)(`span`,{children:[`· распознано `,I]})]}),(0,o.jsxs)(`div`,{className:`ing-list`,children:[(0,o.jsxs)(`div`,{className:`ing-grid`,children:[(0,o.jsx)(`div`,{className:`ing-colhead`}),(0,o.jsx)(`div`,{className:`ing-colhead`,children:`Ингредиент`}),(0,o.jsx)(`div`,{className:`ing-colhead`,children:`Группа`}),(0,o.jsx)(`div`,{className:`ing-colhead`,children:`Подгруппа · описание`})]}),(()=>{let t=e.ingredients.findIndex(e=>e.ing.group===`Отдушки`),n=t>-1&&!e.is_face;return e.ingredients.map((e,r)=>{let i=e.ing,s=n&&r>t;return(0,o.jsxs)(`div`,{children:[n&&r===t+1&&(0,o.jsxs)(`div`,{className:`compo-divider`,children:[(0,o.jsx)(`span`,{className:`ln`}),(0,o.jsx)(`span`,{className:`lbl`,children:`ниже ~1% · менее значимо`}),(0,o.jsx)(`span`,{className:`ln`})]}),(0,o.jsxs)(`div`,{className:`ing-grid ${s?`minor`:``}`,children:[(0,o.jsx)(`div`,{className:`ing-cell ing-pos`,children:e.position||r+1}),(0,o.jsxs)(`div`,{className:`ing-cell ing-cell-hover`,children:[(0,o.jsxs)(`div`,{className:`ing-inci`,children:[(0,o.jsx)(`span`,{className:`sub-link`,onClick:()=>w(i),children:i.inci_name}),i.is_eu_allergen&&(0,o.jsx)(`span`,{className:`badge-eu`,title:`Аллерген EU-26. Список со всеми описаниями – на этапе подключения к базе`,children:`Аллерген`})]}),i.ru_name&&(0,o.jsx)(`div`,{className:`ing-ru`,children:i.ru_name})]}),(0,o.jsx)(`div`,{className:`ing-cell ing-cell-sep`,children:i.group?(0,o.jsx)(`span`,{className:`g-tag`,style:{background:v(i.group)+`1f`,color:v(i.group)},onClick:()=>T(i.group),children:i.group}):(0,o.jsx)(`span`,{style:{color:`var(--ink-faint)`},children:`–`})}),(0,o.jsxs)(`div`,{className:`ing-cell ing-cell-sep`,children:[i.subgroup&&(0,o.jsxs)(`div`,{className:`ing-sub`,children:[(0,o.jsx)(`span`,{className:`lbl`,children:`Подгруппа`}),(0,o.jsx)(`span`,{className:`sub-link`,onClick:()=>E(i.group,i.subgroup),children:i.subgroup})]}),(i.description||S(a,i.group,i.subgroup,i.subgroup2))&&(0,o.jsx)(`div`,{className:`ing-desc`,style:{marginTop:i.subgroup?5:0},children:i.description||S(a,i.group,i.subgroup,i.subgroup2)}),i.oil&&(0,o.jsxs)(`div`,{className:`ing-oil`,children:[`Комедогенность `,i.oil.comedogenicity,` · проникновение `,i.oil.penetration]}),!i.subgroup&&!i.description&&!i.oil&&!S(a,i.group,i.subgroup,i.subgroup2)&&(0,o.jsx)(`span`,{style:{color:`var(--ink-faint)`,fontSize:12},children:`–`})]})]})]},e.id)})})()]}),L.length>0?(0,o.jsxs)(`div`,{className:`similar-block`,children:[(0,o.jsxs)(`div`,{className:`similar-head`,children:[(0,o.jsx)(`span`,{className:`similar-title`,children:`Похожие по составу`}),(0,o.jsx)(`span`,{className:`similar-hint`,children:`того же вида · по сходству состава`})]}),(0,o.jsx)(`div`,{className:`pcards ${L.length<=3?`few`:``}`,children:L.map(({product:e,score:t})=>(0,o.jsx)(U,{product:e,score:t,onClick:()=>i&&i(e)},e.id))})]}):(0,o.jsxs)(`div`,{className:`similar-block`,children:[(0,o.jsx)(`div`,{className:`similar-head`,children:(0,o.jsx)(`span`,{className:`similar-title`,children:`Похожие по составу`})}),(0,o.jsx)(`p`,{className:`dm-muted`,style:{marginTop:8},children:`Аналоги пока не найдены. Чтобы сравнить состав вручную, откройте вкладку «Аналоги».`})]}),p&&(0,o.jsx)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,marginTop:16},children:(0,o.jsx)(`button`,{className:`btn btn-danger btn-sm`,onClick:d,children:`Удалить средство`})})]})]})})}function ae({value:e,onPick:t,onClear:n,products:i=[],placeholder:a=`Начните вводить название или бренд…`}){let[s,c]=(0,r.useState)(``),[l,u]=(0,r.useState)(!1),d=(0,r.useMemo)(()=>{let e=s.trim().toLowerCase();return e?i.filter(t=>(t.name||``).toLowerCase().includes(e)||(t.brand||``).toLowerCase().includes(e)).slice(0,8):[]},[s,i]);return e?(0,o.jsxs)(`div`,{className:`ac-chosen`,children:[(0,o.jsx)(B,{product:e,size:38}),(0,o.jsxs)(`span`,{className:`ac-chosen-meta`,children:[(0,o.jsx)(`span`,{className:`ac-opt-name`,children:e.name}),(0,o.jsx)(`span`,{className:`ac-opt-brand`,children:e.brand})]}),(0,o.jsx)(`button`,{className:`ac-clear`,onClick:n,title:`Очистить`,children:`✕`})]}):(0,o.jsxs)(`div`,{className:`ac-wrap`,children:[(0,o.jsx)(`input`,{className:`ac-input`,value:s,placeholder:a,onChange:e=>{c(e.target.value),u(!0)},onFocus:()=>u(!0),onBlur:()=>setTimeout(()=>u(!1),150)}),l&&s.trim()&&(0,o.jsx)(`div`,{className:`ac-drop`,children:d.length===0?(0,o.jsx)(`div`,{className:`ac-empty`,children:`Ничего не найдено`}):d.map(e=>(0,o.jsxs)(`button`,{className:`ac-opt`,onMouseDown:()=>{t(e),c(``),u(!1)},children:[(0,o.jsx)(B,{product:e,size:34}),(0,o.jsxs)(`span`,{className:`ac-opt-meta`,children:[(0,o.jsx)(`span`,{className:`ac-opt-name`,children:e.name}),(0,o.jsxs)(`span`,{className:`ac-opt-brand`,children:[e.brand,e.product_type?` · ${e.product_type}`:``]})]})]},e.id))})]})}function oe(e=[]){let t=t=>{let n=e.find(e=>C(e.inci_name)===C(t));return n?n.group:null};return e=>e.split(/[,;\n]+/).map(e=>e.trim()).filter(Boolean).map((e,n)=>({inci:e,group:t(e),position:n+1}))}var se=[{group:`Увлажнители`,text:`Увлажнение`,hue:`#3f7fb0`},{group:`Масла`,text:`Питание`,hue:`#b07d2e`},{group:`Эмоленты`,text:`Смягчение`,hue:`#c0892f`},{group:`Протеины`,text:`Восстановление`,hue:`#9a5fb0`},{group:`Кондиционеры`,text:`Гладкость`,hue:`#3f9a63`},{group:`Структурообразователи`,text:`Плёнка / защита`,hue:`#4f78c4`}];function G(e){let t=new Set(e.map(e=>e.group).filter(Boolean));return se.filter(e=>t.has(e.group))}function ce({onOpenProduct:e,allProducts:t=[],allIngredients:n=[],loadAllCompositions:i}){let a=(0,r.useMemo)(()=>oe(n),[n]),[s,c]=(0,r.useState)(``),[l,u]=(0,r.useState)(null),[d,f]=(0,r.useState)(``),[p,m]=(0,r.useState)(``),[h,g]=(0,r.useState)(`match`),[_,v]=(0,r.useState)(!1),[y,b]=(0,r.useState)(!1),[x,S]=(0,r.useState)(null),[C,w]=(0,r.useState)([]),T=[...new Set(t.map(e=>e.product_type).filter(Boolean))].sort(),E=l?C.find(e=>e.id===l.id)||l:null,O=E&&E.ingredients?D(E):a(s),j=l||s.trim().length>0,M=l?l.product_type:k(O),N=d||M||``,P=(0,r.useMemo)(()=>{if(!_||!C.length)return[];let e=A(O,E,C,{sameType:!1,order:h}),t=p||N;return t&&(e=e.filter(e=>e.product.product_type===t)),e.slice(0,24)},[_,C,s,l,h,p,N]),F=async()=>{b(!0),S({done:0,total:t.length});try{w(await i((e,n)=>S({done:e,total:n||t.length}))),v(!0)}finally{b(!1),S(null)}},I=()=>{c(``),u(null),f(``),m(``),v(!1)},L=()=>v(!1),ee=l?`${l.name} · ${l.brand}`:`состав из ${O.length} компонентов`;return(0,o.jsxs)(`div`,{className:`sim-tab`,children:[(0,o.jsx)(`div`,{className:`section-head`,children:(0,o.jsx)(`div`,{className:`section-title`,children:`Аналоги`})}),!_&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`p`,{className:`sim-intro`,children:`Выберите средство из базы или вставьте его состав. Мы подберём похожие средства и отсортируем их по совпадению состава или по цене.`}),(0,o.jsxs)(`div`,{className:`sim-single`,children:[(0,o.jsx)(`label`,{className:`sim-label`,children:`Выберите средство в базе`}),(0,o.jsx)(ae,{value:l,products:t,onPick:e=>{u(e),c(``),f(``)},onClear:()=>u(null)}),(0,o.jsxs)(`details`,{className:`sim-manual`,open:!l&&s.length>0,children:[(0,o.jsx)(`summary`,{children:`Нет в базе? Ввести состав вручную`}),(0,o.jsx)(`textarea`,{className:`sim-textarea compact`,placeholder:`Вода, лаурет-сульфат натрия, кокамидопропилбетаин, глицерин, отдушка…`,value:s,onChange:e=>{c(e.target.value),u(null),f(``)}}),j&&!l&&O.length>0&&(0,o.jsxs)(`div`,{className:`type-detect`,children:[M?(0,o.jsxs)(`span`,{children:[`Похоже на: `,(0,o.jsx)(`b`,{children:M}),`. Можно уточнить:`]}):(0,o.jsx)(`span`,{children:`Вид не определился. Выберите вручную:`}),(0,o.jsx)(`div`,{className:`type-pills`,children:T.map(e=>(0,o.jsx)(`span`,{className:`type-pill ${(d||M)===e?`active`:``}`,onClick:()=>f(e),children:e},e))})]})]})]}),(0,o.jsxs)(`div`,{className:`cmp-cta`,children:[(0,o.jsx)(`button`,{className:`btn btn-primary btn-cta`,onClick:F,disabled:!j||y,children:y?`Загрузка составов… ${x?Math.round(100*x.done/Math.max(1,x.total)):0}%`:`Найти аналоги`}),!j&&(0,o.jsx)(`span`,{className:`cmp-hint`,children:`Сначала выберите средство или вставьте состав`}),y&&(0,o.jsx)(`span`,{className:`cmp-hint`,children:`Первый поиск грузит составы всех средств, дальше будет мгновенно`})]})]}),_&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`div`,{className:`input-collapsed`,children:[(0,o.jsxs)(`span`,{className:`ic-summary`,children:[`Аналоги для: `,(0,o.jsx)(`b`,{children:ee})]}),(0,o.jsx)(`button`,{className:`btn btn-glass btn-sm ic-edit`,onClick:L,children:`Изменить`}),(0,o.jsx)(`button`,{className:`filter-reset`,onClick:I,children:`Сбросить`})]}),(0,o.jsxs)(`div`,{className:`results-bar`,children:[(0,o.jsxs)(`div`,{className:`count`,children:[`Найдено: `,P.length]}),(0,o.jsxs)(`div`,{className:`results-controls`,children:[(0,o.jsxs)(`select`,{className:`sim-select sim-select-sm`,value:p,onChange:e=>m(e.target.value),children:[(0,o.jsx)(`option`,{value:``,children:N?`Вид: как у исходного (${N})`:`Вид: любой`}),T.map(e=>(0,o.jsx)(`option`,{value:e,children:e},e))]}),(0,o.jsxs)(`select`,{className:`sim-select sim-select-sm`,value:h,onChange:e=>g(e.target.value),children:[(0,o.jsx)(`option`,{value:`match`,children:`Сначала по совпадению`}),(0,o.jsx)(`option`,{value:`price`,children:`Сначала дешевле`})]})]})]}),P.length===0?(0,o.jsxs)(`div`,{className:`empty-state`,children:[(0,o.jsx)(`span`,{className:`empty-ic`,children:`◇`}),(0,o.jsx)(`p`,{children:`Похожих средств не нашлось. Попробуйте другой вид средства или уберите фильтр вида.`})]}):(0,o.jsx)(`div`,{className:`pcards`,children:P.map(({product:t,score:n})=>(0,o.jsx)(U,{product:t,score:n,onClick:()=>e(t)},t.id))})]})]})}function le({onOpenProduct:e,items:t=[],onRemove:n,onClear:i,allProducts:a=[],allIngredients:s=[],loadComposition:c,compoCache:l={}}){(0,r.useEffect)(()=>{t.forEach(e=>{l[e.id]||c&&c(e).catch(()=>{})})},[t,l]);let u=e=>{let t=l[e.id];if(!t)return null;let n=t.filter(e=>e.ing&&e.ing.is_eu_allergen).length,r=Math.max(40,100-n*18);return{score:r,label:r>=85?`Высокая`:r>=65?`Средняя`:`Пониженная`,color:r>=85?`#1f7a5c`:r>=65?`#c98a3a`:`#c0584f`,allergens:n}},d=e=>l[e.id]?l[e.id].map(e=>({inci:e.ing.inci_name,group:e.ing.group,position:e.position})):[],f=t.length?d(t[0]):[],p=(e,t)=>{if(t===0)return null;let n=d(e);return!n.length||!f.length?null:E(f,n).score};return t.length?(0,o.jsxs)(`div`,{className:`sim-tab`,children:[(0,o.jsxs)(`div`,{className:`section-head`,children:[(0,o.jsxs)(`div`,{className:`section-title`,children:[`Сравнение · `,t.length,` из 5`]}),(0,o.jsx)(`button`,{className:`filter-reset`,onClick:i,children:`Очистить всё`})]}),(0,o.jsx)(`div`,{className:`cmp-matrix-wrap`,children:(0,o.jsxs)(`table`,{className:`cmp-matrix`,children:[(0,o.jsx)(`thead`,{children:(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`th`,{className:`cmp-corner`}),t.map(t=>(0,o.jsxs)(`th`,{className:`cmp-col-head`,children:[(0,o.jsx)(`button`,{className:`cmp-col-x`,title:`Убрать`,onClick:()=>n(t.id),children:`×`}),(0,o.jsxs)(`div`,{className:`cmp-col-card`,onClick:()=>e&&e(t),title:`Открыть карточку`,children:[(0,o.jsx)(B,{product:t,size:64}),(0,o.jsx)(`div`,{className:`cmp-col-name`,children:t.name}),t.brand&&(0,o.jsx)(`div`,{className:`cmp-col-brand`,children:t.brand})]})]},t.id))]})}),(0,o.jsxs)(`tbody`,{children:[(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{className:`cmp-row-label`,children:`Вид средства`}),t.map(e=>(0,o.jsx)(`td`,{className:`cmp-cell`,children:e.product_type||`—`},e.id))]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{className:`cmp-row-label`,children:`Функции`}),t.map(e=>{let t=b(e);return(0,o.jsx)(`td`,{className:`cmp-cell`,children:t.length?(0,o.jsx)(`div`,{className:`cmp-fn-list`,children:t.map((e,t)=>(0,o.jsx)(`span`,{className:`fn-glass ${e.strong?``:`soft`}`,style:{"--fn":e.hue},children:e.text},t))}):(0,o.jsx)(`span`,{className:`dm-muted`,children:`базовый состав`})},e.id)})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{className:`cmp-row-label`,children:`Безопасность`}),t.map(e=>{let t=u(e);return(0,o.jsx)(`td`,{className:`cmp-cell`,children:t?(0,o.jsxs)(`div`,{className:`cmp-safety`,children:[(0,o.jsx)(`span`,{className:`cmp-safety-ring`,style:{background:t.color},children:t.score}),(0,o.jsx)(`span`,{className:`cmp-safety-lbl`,style:{color:t.color},children:t.label})]}):(0,o.jsx)(`span`,{className:`dm-muted`,children:`загрузка…`})},e.id)})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{className:`cmp-row-label`,children:`Стоимость`}),t.map(e=>(0,o.jsx)(`td`,{className:`cmp-cell`,style:{textTransform:`capitalize`},children:e.price_tier||`—`},e.id))]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsxs)(`td`,{className:`cmp-row-label`,children:[`Совпадение состава`,(0,o.jsx)(`span`,{className:`cmp-row-sub`,children:`с первым средством`})]}),t.map((e,t)=>{let n=p(e,t);return(0,o.jsx)(`td`,{className:`cmp-cell`,children:t===0?(0,o.jsx)(`span`,{className:`cmp-base-pill`,children:`база сравнения`}):n==null?(0,o.jsx)(`span`,{className:`dm-muted`,children:`загрузка…`}):(0,o.jsxs)(`span`,{className:`cmp-sim-pct`,style:{"--m":n>=70?`#1f7a5c`:n>=45?`#c98a3a`:`#8b8f86`},children:[n,`%`]})},e.id)})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsxs)(`td`,{className:`cmp-row-label`,children:[`Состав`,(0,o.jsx)(`span`,{className:`cmp-row-sub`,children:`кол-во ингредиентов`})]}),t.map(e=>{let t=l[e.id]?l[e.id].length:null;return(0,o.jsx)(`td`,{className:`cmp-cell`,children:t??(0,o.jsx)(`span`,{className:`dm-muted`,children:`загрузка…`})},e.id)})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{className:`cmp-row-label`,children:`Заметка`}),t.map(e=>(0,o.jsx)(`td`,{className:`cmp-cell`,children:e.notes&&String(e.notes).trim()?(0,o.jsx)(`span`,{className:`cmp-note-text`,children:String(e.notes).trim()}):(0,o.jsx)(`span`,{className:`dm-muted`,children:`нет`})},e.id))]})]})]})}),(0,o.jsxs)(`p`,{className:`cmp-tech`,style:{marginTop:14},children:[`Совпадение по составу — `,(0,o.jsx)(`b`,{children:`технический показатель`}),` относительно первого (базового) средства в списке. Чтобы подобрать замену по всей базе, откройте вкладку «Аналоги».`]})]}):(0,o.jsxs)(`div`,{className:`sim-tab`,children:[(0,o.jsx)(`div`,{className:`section-head`,children:(0,o.jsx)(`div`,{className:`section-title`,children:`Сравнение`})}),(0,o.jsxs)(`div`,{className:`cmp-empty`,children:[(0,o.jsx)(`p`,{className:`sim-intro`,style:{marginBottom:14},children:`Здесь можно сравнить до 5 средств между собой: функции, состав, безопасность, стоимость и заметки.`}),(0,o.jsx)(`p`,{className:`dm-muted`,children:`Откройте карточку любого средства и нажмите «Добавить в сравнение».`})]})]})}var ue=[`Витамины`,`Антиоксиданты`,`Кислоты`,`Протеины`,`Пептиды`,`Активы`,`Увлажнители`,`Масла`,`Липиды`],de=new Set([]),fe=e=>{let t=(e.inci_name||``).toLowerCase();if(de.has(t))return-1;let n=ue.indexOf(e.group);return n===-1?ue.length:n},K=/[^\p{L}\p{N}\s\-+/().,'%·:&]/u,pe=e=>!e.group||/unknown|неразобран|\?\?\?/i.test(e.group||``)||K.test(e.inci_name||``)||!(e.inci_name||``).trim();function me({data:e=[],loading:t,onOpenDetail:n,editorMode:i=!1,onSaveIngredient:a}){let s=e=>n({kind:`ingredient`,inci:e.inci_name,ru:e.ru_name,description:e.description,is_eu_allergen:e.is_eu_allergen,groups:e.allGroups&&e.allGroups.length?e.allGroups.map(e=>({group:e.group,subgroup:e.subgroup,subgroup2:e.subgroup2})):[{group:e.group,subgroup:e.subgroup,subgroup2:e.subgroup2}]}),c=(e,t)=>n({kind:`group`,group:e,subgroup:t}),[l,u]=(0,r.useState)(``),[d,f]=(0,r.useState)(``),[p,m]=(0,r.useState)(``),[h,g]=(0,r.useState)(`active`),[_,y]=(0,r.useState)(!1),[b,x]=(0,r.useState)(50),[S,C]=(0,r.useState)(1),[w,T]=(0,r.useState)(null),[E,D]=(0,r.useState)(null),O=(0,r.useMemo)(()=>{let t=new Map;for(let n of e)n.group&&(t.has(n.group)||t.set(n.group,new Set),n.subgroup&&t.get(n.group).add(n.subgroup));return[...t.entries()].map(([e,t])=>({group:e,subs:[...t].sort()})).sort((e,t)=>e.group.localeCompare(t.group,`ru`))},[e]),k=(0,r.useMemo)(()=>e.filter(pe).length,[e]),A=(0,r.useMemo)(()=>{let t=l.toLowerCase(),n=e.filter(e=>!(!(!t||(e.inci_name||``).toLowerCase().includes(t)||(e.ru_name||``).toLowerCase().includes(t))||d&&e.group!==d||p&&e.subgroup!==p||_&&!pe(e))),r=(e,t)=>(e.inci_name||``).localeCompare(t.inci_name||``,`ru`);return n=h===`alpha`?[...n].sort(r):h===`alpha-desc`?[...n].sort((e,t)=>r(t,e)):h===`group`?[...n].sort((e,t)=>(e.group||`я`).localeCompare(t.group||`я`,`ru`)||r(e,t)):[...n].sort((e,t)=>{let n=e=>e.description&&String(e.description).trim().length>0?0:1;return n(e)-n(t)||fe(e)-fe(t)||r(e,t)}),n},[e,l,d,p,_,h]),j=Math.max(1,Math.ceil(A.length/b)),M=Math.min(S,j),N=A.slice((M-1)*b,M*b),P=[];for(let e=1;e<=j;e++)e===1||e===j||Math.abs(e-M)<=1?P.push(e):P[P.length-1]!==`…`&&P.push(`…`);let F=(e,t)=>{i&&T({id:e,field:t})},I=async(e,t,n)=>{if(T(null),a){D(e);try{await a(e,{[t]:n})}finally{D(null)}}};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`div`,{className:`toolbar`,children:[(0,o.jsx)(`input`,{className:`search`,placeholder:`Поиск по названию или составляющей…`,value:l,onChange:e=>{u(e.target.value),C(1)}}),i&&(0,o.jsxs)(`label`,{className:`filter-check`,style:{whiteSpace:`nowrap`},title:`Записи без группы, с неразобранной категорией или некорректными символами`,children:[(0,o.jsx)(`input`,{type:`checkbox`,checked:_,onChange:()=>{y(e=>!e),C(1)}}),(0,o.jsxs)(`span`,{children:[`С ошибками`,k?` · ${k}`:``]})]})]}),(0,o.jsxs)(`div`,{className:`filter-pills`,children:[(0,o.jsx)(`span`,{className:`pill ${d?``:`active`}`,onClick:()=>{f(``),m(``),C(1)},children:`Все группы`}),O.map(e=>(0,o.jsx)(`span`,{className:`pill ${d===e.group?`active`:``}`,onClick:()=>{f(e.group),m(``),C(1)},children:e.group},e.group))]}),d&&O.find(e=>e.group===d&&e.subs.length>0)&&(0,o.jsxs)(`div`,{className:`filter-pills`,style:{marginTop:-6,paddingLeft:14},children:[(0,o.jsx)(`span`,{style:{color:`var(--ink-faint)`,fontSize:12,alignSelf:`center`,marginRight:4},children:`↳ подгруппы:`}),(0,o.jsx)(`span`,{className:`pill pill-sub ${p?``:`active`}`,onClick:()=>{m(``),C(1)},children:`Все`}),O.find(e=>e.group===d).subs.map(e=>(0,o.jsx)(`span`,{className:`pill pill-sub ${p===e?`active`:``}`,onClick:()=>{m(e),C(1)},children:e},e))]}),(0,o.jsxs)(`div`,{className:`section-head`,children:[(0,o.jsx)(`div`,{className:`section-title`,children:`Ингредиенты`}),(0,o.jsxs)(`div`,{className:`ing-head-right`,children:[(0,o.jsxs)(`select`,{className:`sim-select ing-sort`,value:h,onChange:e=>{g(e.target.value),C(1)},children:[(0,o.jsx)(`option`,{value:`active`,children:`Лучшие`}),(0,o.jsx)(`option`,{value:`alpha`,children:`По названию (А–Я)`}),(0,o.jsx)(`option`,{value:`alpha-desc`,children:`По названию (Я–А)`}),(0,o.jsx)(`option`,{value:`group`,children:`По группам`})]}),(0,o.jsxs)(`div`,{className:`count`,children:[A.length,` записей`,i&&` · редактирование включено`]})]})]}),t?(0,o.jsx)(Ee,{}):(0,o.jsx)(`div`,{className:`table-wrap`,children:(0,o.jsxs)(`table`,{children:[(0,o.jsx)(`thead`,{children:(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`th`,{style:{width:`24%`},children:`Название`}),(0,o.jsx)(`th`,{style:{width:`20%`},children:`Русское название`}),(0,o.jsx)(`th`,{style:{width:`16%`},children:`Группа`}),(0,o.jsx)(`th`,{style:{width:`16%`},children:`Подгруппа`}),(0,o.jsx)(`th`,{style:{width:`24%`},children:`Описание`})]})}),(0,o.jsx)(`tbody`,{children:N.map(e=>(0,o.jsxs)(`tr`,{className:E===e.id?`row-saving`:``,children:[(0,o.jsxs)(`td`,{className:`td-inci`,children:[(0,o.jsx)(`span`,{className:`inci-link`,onClick:()=>s(e),children:e.inci_name}),e.is_eu_allergen&&(0,o.jsx)(`span`,{className:`badge-eu`,style:{marginLeft:7},title:`Аллерген из списка EU-26`,children:`Аллерген`})]}),(0,o.jsx)(`td`,{children:i&&w?.id===e.id&&w?.field===`ru_name`?(0,o.jsx)(`input`,{className:`cell-input`,autoFocus:!0,defaultValue:e.ru_name||``,onBlur:t=>I(e.id,`ru_name`,t.target.value),onKeyDown:t=>t.key===`Enter`&&I(e.id,`ru_name`,t.target.value)}):(0,o.jsx)(`span`,{className:i?`cell-edit-hint`:``,onClick:()=>F(e.id,`ru_name`),style:{color:e.ru_name?`var(--ink-soft)`:`var(--ink-faint)`},children:e.ru_name||`–`})}),(0,o.jsx)(`td`,{children:e.group?(0,o.jsx)(`span`,{className:`g-tag ${i?`cell-edit-hint`:``}`,style:{display:`inline-block`,background:v(e.group)+`1f`,color:v(e.group),cursor:`pointer`},onClick:()=>c(e.group),children:e.group}):(0,o.jsx)(`span`,{style:{color:`var(--ink-faint)`},children:`–`})}),(0,o.jsx)(`td`,{style:{color:`var(--ink-soft)`,fontSize:13},children:e.subgroup?(0,o.jsx)(`span`,{className:`inci-link`,onClick:()=>c(e.group,e.subgroup),children:e.subgroup}):`–`}),(0,o.jsx)(`td`,{style:{color:`var(--ink-soft)`,fontSize:13,lineHeight:1.5},children:i&&w?.id===e.id&&w?.field===`description`?(0,o.jsx)(`input`,{className:`cell-input`,autoFocus:!0,defaultValue:e.description||``,onBlur:t=>I(e.id,`description`,t.target.value),onKeyDown:t=>t.key===`Enter`&&I(e.id,`description`,t.target.value)}):(0,o.jsx)(`span`,{className:i?`cell-edit-hint`:``,onClick:()=>F(e.id,`description`),children:e.description||`–`})})]},e.id))})]})}),(0,o.jsx)(()=>(0,o.jsxs)(`div`,{className:`pager`,children:[(0,o.jsxs)(`div`,{className:`pg-size`,children:[`Показывать`,(0,o.jsxs)(`select`,{value:b,onChange:e=>{x(Number(e.target.value)),C(1)},children:[(0,o.jsx)(`option`,{value:25,children:`25`}),(0,o.jsx)(`option`,{value:50,children:`50`}),(0,o.jsx)(`option`,{value:100,children:`100`}),(0,o.jsx)(`option`,{value:200,children:`200`})]}),`на странице · всего `,A.length]}),(0,o.jsxs)(`div`,{className:`pager-controls`,children:[(0,o.jsx)(`button`,{className:`pg-btn`,disabled:M===1,onClick:()=>C(M-1),children:`‹`}),P.map((e,t)=>e===`…`?(0,o.jsx)(`span`,{style:{color:`var(--ink-faint)`,padding:`0 4px`},children:`…`},`e`+t):(0,o.jsx)(`button`,{className:`pg-btn ${e===M?`active`:``}`,onClick:()=>C(e),children:e},e)),(0,o.jsx)(`button`,{className:`pg-btn`,disabled:M===j,onClick:()=>C(M+1),children:`›`})]})]}),{})]})}function q(e){let t=e.replace(/[;\n\r]+/g,`, `);return t=t.replace(/,[ \t]+/g,`, `),t.split(`, `).map(e=>e.trim()).filter(Boolean)}var J=1200;async function he(e){let t=`product_${Date.now()}.webp`,n;try{n=await fetch(`${s}/storage/v1/object/product-images/${t}`,{method:`POST`,headers:{apikey:c,Authorization:`Bearer ${l||c}`,"Content-Type":`image/webp`,"x-upsert":`true`},body:e})}catch(e){throw Error(`[Storage] Сетевая ошибка при загрузке в Supabase: ${e.message}`)}if(!n.ok){let e=``;try{let t=await n.json();e=t?.error||t?.message||JSON.stringify(t)}catch{e=await n.text().catch(()=>n.statusText)}throw n.status===400?Error(`[Storage 400] Неверный запрос. Проверьте название bucket "product-images". Детали: ${e}`):n.status===401||n.status===403?Error(`[Storage ${n.status}] Нет прав записи в bucket. Проверьте что bucket "product-images" публичный. Детали: ${e}`):n.status===404?Error(`[Storage 404] Bucket "product-images" не найден — создайте его в Supabase → Storage.`):Error(`[Storage ${n.status}] ${e}`)}return{url:`${s}/storage/v1/object/public/product-images/${t}`,kb:Math.round(e.size/1024)}}async function Y(e){let t;try{t=await createImageBitmap(e)}catch(e){throw Error(`[Resize] Не удалось декодировать изображение: ${e.message}. Попробуйте другой файл или формат.`)}let n=document.createElement(`canvas`);n.width=J,n.height=J;let r=n.getContext(`2d`),i=Math.min(J/t.width,J/t.height),a=t.width*i,o=t.height*i;return r.clearRect(0,0,J,J),r.drawImage(t,(J-a)/2,(J-o)/2,a,o),new Promise((e,t)=>n.toBlob(n=>n?e(n):t(Error(`[Resize] canvas.toBlob вернул null — браузер не поддерживает WebP?`)),`image/webp`,.88))}async function ge(e,t){let n=new FormData;n.append(`image_file`,e),n.append(`size`,`auto`);let r;try{r=await fetch(`https://api.remove.bg/v1.0/removebg`,{method:`POST`,headers:{"X-Api-Key":t},body:n})}catch(e){throw Error(`[remove.bg] Сетевая ошибка: ${e.message}. Проверьте интернет-соединение.`)}if(!r.ok){let e=``;try{let t=await r.json();e=t?.errors?.[0]?.title||JSON.stringify(t)}catch{e=r.statusText}throw r.status===402?Error(`[remove.bg 402] Лимит бесплатных запросов исчерпан. Переключитесь на режим "Без удаления".`):r.status===403?Error(`[remove.bg 403] Неверный API-ключ. Проверьте ключ в настройках ⚙.`):Error(`[remove.bg ${r.status}] ${e}`)}return r.blob()}async function _e(e){let t;try{t=await createImageBitmap(e)}catch(e){throw Error(`[BlobToWebP] Не удалось прочитать результат remove.bg: ${e.message}`)}let n=document.createElement(`canvas`);n.width=J,n.height=J;let r=n.getContext(`2d`),i=Math.min(J/t.width,J/t.height),a=t.width*i,o=t.height*i;return r.clearRect(0,0,J,J),r.drawImage(t,(J-a)/2,(J-o)/2,a,o),new Promise((e,t)=>n.toBlob(n=>n?e(n):t(Error(`[BlobToWebP] canvas.toBlob вернул null`)),`image/webp`,.88))}async function ve(e){try{new URL(e)}catch{throw Error(`[URL] Некорректный URL. Убедитесь что ссылка начинается с https://`)}let t=`https://corsproxy.io/?${encodeURIComponent(e)}`,n;try{n=await fetch(t)}catch(e){throw Error(`[URL] Не удалось подключиться через прокси: ${e.message}. Попробуйте загрузить файлом с компьютера.`)}if(!n.ok)throw n.status===403?Error(`[URL 403] Сайт запрещает скачивание картинок. Загрузите файлом с компьютера.`):n.status===404?Error(`[URL 404] Изображение не найдено по этому URL.`):Error(`[URL ${n.status}] Ошибка загрузки. Попробуйте загрузить файлом.`);let r=await n.blob().catch(e=>{throw Error(`[URL] Не удалось прочитать ответ: ${e.message}`)});if(!r.type.startsWith(`image/`))throw Error(`[URL] Ответ не является изображением (тип: ${r.type}). Попробуйте другую ссылку.`);return r}function ye({onDone:e,removeBgKey:t}){let[n,i]=(0,r.useState)(`url`),[a,s]=(0,r.useState)(``),[c,l]=(0,r.useState)(`removebg`),[u,d]=(0,r.useState)(`idle`),[f,p]=(0,r.useState)([]),[m,h]=(0,r.useState)(``),[g,_]=(0,r.useState)(null),[v,y]=(0,r.useState)(null),b=(0,r.useRef)(),x=(e,t=`active`)=>p(n=>[...n.map(e=>e.state===`active`?{...e,state:`done`}:e),{msg:e,state:t}]),S=()=>{d(`idle`),p([]),h(``),_(null),y(null),s(``),b.current&&(b.current.value=``),e(null)},C=async n=>{d(`loading`),p([]),h(``),_(null);try{x(`Загружаю изображение...`);let r=await n();x(`Изображение получено (${Math.round(r.size/1024)} КБ, тип: ${r.type})`);let i;if(c===`removebg`){if(!t?.trim())throw Error(`[Настройки] Не введён API-ключ remove.bg. Нажмите ⚙ в правом верхнем углу.`);x(`Масштабирую для отправки в remove.bg...`);let e=await Y(r);x(`Масштабировано (${Math.round(e.size/1024)} КБ). Отправляю в remove.bg...`);let n=await ge(e,t.trim());x(`Фон удалён (${Math.round(n.size/1024)} КБ). Финальная обработка...`),i=await _e(n)}else x(`Масштабирую до 1200×1200 WebP...`),i=await Y(r);x(`Изображение готово (${Math.round(i.size/1024)} КБ). Загружаю в Storage...`);let{url:a,kb:o}=await he(i);x(`Сохранено в Supabase Storage ✓`,`done`),_(a),y(o),d(`done`),e(a)}catch(t){d(`error`),h(t.message),p(e=>e.map((t,n)=>n===e.length-1?{...t,state:`error`}:t)),e(null)}};return(0,o.jsxs)(`div`,{children:[(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,marginBottom:10,alignItems:`center`,flexWrap:`wrap`},children:[(0,o.jsx)(`div`,{style:{display:`flex`,border:`1.5px solid var(--sand)`,borderRadius:8,overflow:`hidden`},children:[`url`,`file`].map(e=>(0,o.jsx)(`button`,{onClick:()=>{i(e),S()},style:{padding:`7px 16px`,fontSize:12,fontWeight:500,background:n===e?`var(--deep)`:`white`,color:n===e?`var(--cream)`:`var(--brown)`,border:`none`,cursor:`pointer`,fontFamily:`inherit`},children:e===`url`?`По ссылке`:`С компьютера`},e))}),(0,o.jsxs)(`div`,{style:{display:`flex`,border:`1.5px solid var(--sand)`,borderRadius:8,overflow:`hidden`,marginLeft:`auto`},children:[(0,o.jsx)(`button`,{onClick:()=>l(`removebg`),style:{padding:`7px 12px`,fontSize:11,fontWeight:500,background:c===`removebg`?`#1D9E75`:`white`,color:c===`removebg`?`white`:`var(--brown)`,border:`none`,cursor:`pointer`,fontFamily:`inherit`},children:`remove.bg`}),(0,o.jsx)(`button`,{onClick:()=>l(`nobg`),style:{padding:`7px 12px`,fontSize:11,fontWeight:500,background:c===`nobg`?`var(--brown)`:`white`,color:c===`nobg`?`white`:`var(--brown)`,border:`none`,cursor:`pointer`,fontFamily:`inherit`},children:`Без удаления`})]})]}),c===`removebg`&&!t?.trim()&&(0,o.jsx)(`div`,{style:{fontSize:12,color:`var(--rose)`,background:`#fdf0ee`,padding:`8px 12px`,borderRadius:8,marginBottom:10},children:`⚠ Введите API-ключ remove.bg — нажмите ⚙ вверху`}),u!==`done`&&(n===`url`?(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,o.jsx)(`input`,{className:`form-input`,style:{flex:1},value:a,onChange:e=>s(e.target.value),placeholder:`https://...`,disabled:u===`loading`,onKeyDown:e=>e.key===`Enter`&&a.trim()&&C(()=>ve(a.trim()))}),(0,o.jsx)(`button`,{className:`btn btn-ghost`,style:{flexShrink:0},onClick:()=>C(()=>ve(a.trim())),disabled:!a.trim()||u===`loading`,children:u===`loading`?`...`:`Обработать`})]}):(0,o.jsxs)(`div`,{onClick:()=>b.current?.click(),style:{border:`2px dashed var(--sand)`,borderRadius:10,padding:`18px`,textAlign:`center`,cursor:u===`loading`?`default`:`pointer`,background:`var(--warm)`},onMouseEnter:e=>{u!==`loading`&&(e.currentTarget.style.borderColor=`var(--gold)`)},onMouseLeave:e=>e.currentTarget.style.borderColor=`var(--sand)`,children:[(0,o.jsx)(`div`,{style:{fontSize:22,marginBottom:5},children:`📁`}),(0,o.jsx)(`div`,{style:{fontSize:13,color:`var(--brown)`,fontWeight:500},children:u===`loading`?`Обработка...`:`Нажмите чтобы выбрать файл`}),(0,o.jsx)(`div`,{style:{fontSize:11,color:`var(--dust)`,marginTop:3},children:`JPG, PNG, WebP`}),(0,o.jsx)(`input`,{ref:b,type:`file`,accept:`image/*`,style:{display:`none`},onChange:e=>{let t=e.target.files?.[0];t&&C(()=>Promise.resolve(t))}})]})),f.length>0&&(0,o.jsx)(`div`,{style:{marginTop:10,background:`var(--warm)`,borderRadius:10,padding:`10px 14px`},children:f.map((e,t)=>(0,o.jsxs)(`div`,{style:{fontSize:12,padding:`3px 0`,color:e.state===`error`?`var(--rose)`:e.state===`done`?`var(--sage)`:`var(--brown)`,display:`flex`,gap:6,alignItems:`flex-start`},children:[(0,o.jsx)(`span`,{style:{flexShrink:0},children:e.state===`done`?`✓`:e.state===`error`?`✕`:`⏳`}),(0,o.jsx)(`span`,{children:e.msg})]},t))}),u===`error`&&m&&(0,o.jsxs)(`div`,{style:{marginTop:8},children:[(0,o.jsx)(`div`,{style:{background:`#fdf0ee`,border:`1px solid #e0b0aa`,color:`var(--rose)`,padding:`10px 14px`,borderRadius:8,fontSize:13,marginBottom:8},children:m}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,o.jsx)(`button`,{className:`btn btn-ghost btn-sm`,onClick:S,children:`Попробовать снова`}),c===`removebg`&&(0,o.jsx)(`button`,{className:`btn btn-ghost btn-sm`,onClick:()=>{l(`nobg`),S()},children:`Попробовать без удаления фона`}),n===`url`&&(0,o.jsx)(`button`,{className:`btn btn-ghost btn-sm`,onClick:()=>{i(`file`),S()},children:`Загрузить файлом`})]})]}),u===`done`&&g&&(0,o.jsxs)(`div`,{style:{marginTop:10,display:`flex`,alignItems:`center`,gap:14,padding:`10px 14px`,background:`var(--warm)`,borderRadius:10},children:[(0,o.jsx)(`div`,{style:{width:80,height:80,borderRadius:8,flexShrink:0,overflow:`hidden`,background:`repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 0 / 10px 10px`},children:(0,o.jsx)(`img`,{src:g,alt:`preview`,style:{width:`100%`,height:`100%`,objectFit:`contain`}})}),(0,o.jsxs)(`div`,{style:{flex:1},children:[(0,o.jsx)(`div`,{style:{fontSize:13,fontWeight:500,color:`var(--sage)`},children:c===`removebg`?`✓ Фон удалён`:`✓ Сохранено`}),(0,o.jsxs)(`div`,{style:{fontSize:11,color:`var(--dust)`,marginTop:3},children:[`1200×1200 WebP · `,v,` КБ`]})]}),(0,o.jsx)(`button`,{onClick:S,style:{background:`none`,border:`none`,fontSize:18,color:`var(--dust)`,cursor:`pointer`,padding:`0 4px`},children:`×`})]})]})}function be({ingredients:e,onClose:t,onSaved:n,removeBgKey:i}){let[a,s]=(0,r.useState)(``),[c,l]=(0,r.useState)(``),[u,f]=(0,r.useState)(null),[p,m]=(0,r.useState)(``),[h,g]=(0,r.useState)([]),[_,v]=(0,r.useState)(!1),[y,b]=(0,r.useState)(``),x=e=>{m(e),g(e.trim()?q(e):[])},S=e=>g(t=>t.filter((t,n)=>n!==e)),C=(e,t)=>g(n=>n.map((n,r)=>r===e?t:n)),w=e=>g(t=>{let n=[...t];return n.splice(e+1,0,``),n}),T=async()=>{if(!a.trim()){b(`Введите название средства`);return}v(!0),b(``);try{let[t]=await d(`/products`,{method:`POST`,body:JSON.stringify({name:a.trim(),brand:c.trim()||null,image_url:u||null})}),r=h.filter(e=>e.trim());if(r.length>0){let n=r.map((n,r)=>{let i=e.find(e=>e.inci_name?.toLowerCase()===n.toLowerCase());return{product_id:t.id,ingredient_id:i?.id||null,position:r+1,raw_inci_name:n.trim()}});await d(`/product_ingredients`,{method:`POST`,body:JSON.stringify(n)})}n()}catch(e){b(`Ошибка сохранения: `+e.message)}finally{v(!1)}},E=h.filter(e=>e.trim()).length;return(0,o.jsx)(`div`,{className:`modal-overlay`,onClick:t,children:(0,o.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,o.jsx)(`button`,{className:`modal-close`,onClick:t,children:`✕`}),(0,o.jsx)(`div`,{className:`modal-title`,children:`Новое средство`}),y&&(0,o.jsx)(`div`,{className:`error-msg`,children:y}),(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsx)(`label`,{className:`form-label`,children:`Название *`}),(0,o.jsx)(`input`,{className:`form-input`,value:a,onChange:e=>s(e.target.value),placeholder:`Например: Пенка Madagascar Centella`})]}),(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsx)(`label`,{className:`form-label`,children:`Бренд`}),(0,o.jsx)(`input`,{className:`form-input`,value:c,onChange:e=>l(e.target.value),placeholder:`Например: SKIN1004`})]}),(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsxs)(`label`,{className:`form-label`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,o.jsx)(`span`,{children:`Изображение`}),(0,o.jsx)(`span`,{style:{fontWeight:400,color:`var(--dust)`,textTransform:`none`,letterSpacing:0,fontSize:11},children:`необязательно — можно добавить позже`})]}),(0,o.jsx)(ye,{onDone:e=>f(e),removeBgKey:i})]}),(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsx)(`label`,{className:`form-label`,children:`Состав (вставьте одним текстом)`}),(0,o.jsx)(`textarea`,{className:`form-input form-textarea`,style:{minHeight:90,fontFamily:`monospace`,fontSize:12},value:p,onChange:e=>x(e.target.value),placeholder:`Centella Asiatica Extract (30%), Glycerin, 1,2-Hexanediol, Aqua...`}),E>0&&(0,o.jsxs)(`div`,{style:{fontSize:12,color:`var(--sage)`,marginTop:5},children:[`✓ Распознано `,E,` ингредиентов`]})]}),h.length>0&&(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsxs)(`label`,{className:`form-label`,style:{display:`flex`,justifyContent:`space-between`},children:[(0,o.jsx)(`span`,{children:`Список ингредиентов`}),(0,o.jsx)(`span`,{style:{fontWeight:400,color:`var(--dust)`,textTransform:`none`,letterSpacing:0,fontSize:11},children:`+ между строками — вставить новую`})]}),(0,o.jsx)(`div`,{style:{maxHeight:300,overflowY:`auto`,border:`1px solid var(--sand)`,borderRadius:8,padding:`4px 8px`},children:h.map((e,t)=>(0,o.jsxs)(`div`,{children:[(0,o.jsxs)(`div`,{className:`ing-add-row`,children:[(0,o.jsx)(`span`,{style:{fontSize:11,color:`var(--dust)`,width:22,textAlign:`right`,flexShrink:0},children:t+1}),(0,o.jsx)(`input`,{className:`form-input`,style:{flex:1,padding:`6px 10px`,fontSize:13,borderColor:e.trim()?``:`var(--rose)`},value:e,onChange:e=>C(t,e.target.value),placeholder:`Название компонента`}),(0,o.jsx)(`button`,{className:`ing-remove`,onClick:()=>S(t),children:`×`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6,margin:`1px 0 1px 28px`},children:[(0,o.jsxs)(`button`,{onClick:()=>w(t),style:{background:`none`,border:`none`,cursor:`pointer`,fontSize:11,color:`var(--dust)`,padding:`0 4px`,display:`flex`,alignItems:`center`,gap:3},children:[(0,o.jsx)(`span`,{style:{fontSize:14},children:`+`}),(0,o.jsx)(`span`,{children:`вставить`})]}),(0,o.jsx)(`div`,{style:{flex:1,height:`0.5px`,background:`var(--warm)`}})]})]},t))})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:10,justifyContent:`flex-end`,marginTop:`1rem`},children:[(0,o.jsx)(`button`,{className:`btn btn-ghost`,onClick:t,children:`Отмена`}),(0,o.jsx)(`button`,{className:`btn btn-primary`,onClick:T,disabled:_||!a.trim(),children:_?`Сохранение...`:`Сохранить${E>0?` (${E} ингр.)`:``}`})]})]})})}function xe({onClose:e,onSaved:t}){let[n,i]=(0,r.useState)(``),[a,s]=(0,r.useState)(``),[c,l]=(0,r.useState)(``),[u,f]=(0,r.useState)(``),[p,m]=(0,r.useState)(``),[h,g]=(0,r.useState)(!1),[_,v]=(0,r.useState)(``);return(0,o.jsx)(`div`,{className:`modal-overlay`,onClick:e,children:(0,o.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,o.jsx)(`button`,{className:`modal-close`,onClick:e,children:`✕`}),(0,o.jsx)(`div`,{className:`modal-title`,children:`Новый ингредиент`}),_&&(0,o.jsx)(`div`,{className:`error-msg`,children:_}),(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsx)(`label`,{className:`form-label`,children:`Название *`}),(0,o.jsx)(`input`,{className:`form-input`,value:n,onChange:e=>i(e.target.value),placeholder:`Например: Aqua`})]}),(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsx)(`label`,{className:`form-label`,children:`Русское название`}),(0,o.jsx)(`input`,{className:`form-input`,value:a,onChange:e=>s(e.target.value),placeholder:`Например: Вода`})]}),(0,o.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:12},children:[(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsx)(`label`,{className:`form-label`,children:`Группа`}),(0,o.jsx)(`input`,{className:`form-input`,value:c,onChange:e=>l(e.target.value),placeholder:`Например: Растворители`})]}),(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsx)(`label`,{className:`form-label`,children:`Подгруппа`}),(0,o.jsx)(`input`,{className:`form-input`,value:u,onChange:e=>f(e.target.value)})]})]}),(0,o.jsxs)(`div`,{className:`form-group`,children:[(0,o.jsx)(`label`,{className:`form-label`,children:`Описание`}),(0,o.jsx)(`textarea`,{className:`form-input form-textarea`,value:p,onChange:e=>m(e.target.value),placeholder:`Краткое описание компонента...`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:10,justifyContent:`flex-end`,marginTop:`1rem`},children:[(0,o.jsx)(`button`,{className:`btn btn-ghost`,onClick:e,children:`Отмена`}),(0,o.jsx)(`button`,{className:`btn btn-primary`,onClick:async()=>{if(!n.trim()){v(`Введите название`);return}g(!0),v(``);try{let[e]=await d(`/ingredients`,{method:`POST`,body:JSON.stringify({inci_name:n.trim(),ru_name:a.trim()||null,description:p.trim()||null})});c.trim()&&e?.id&&await d(`/ingredient_groups`,{method:`POST`,body:JSON.stringify({ingredient_id:e.id,group:c.trim(),subgroup:u.trim()||null,is_primary:!0})}),t()}catch(e){v(`Ошибка: `+e.message)}finally{g(!1)}},disabled:h,children:h?`Сохранение...`:`Сохранить`})]})]})})}var X=[`#ffb7c5`,`#ffc8d4`,`#ff9eb5`,`#ffd6e0`,`rgba(255,182,206,0.6)`,`rgba(255,255,255,0.5)`,`#f7c5d5`],Se=22;function Ce({color:e,size:t}){return(0,o.jsxs)(`svg`,{width:t,height:t,viewBox:`0 0 40 40`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,o.jsx)(`ellipse`,{cx:`20`,cy:`8`,rx:`6`,ry:`9`,fill:e,transform:`rotate(0 20 20)`}),(0,o.jsx)(`ellipse`,{cx:`20`,cy:`8`,rx:`6`,ry:`9`,fill:e,transform:`rotate(72 20 20)`}),(0,o.jsx)(`ellipse`,{cx:`20`,cy:`8`,rx:`6`,ry:`9`,fill:e,transform:`rotate(144 20 20)`}),(0,o.jsx)(`ellipse`,{cx:`20`,cy:`8`,rx:`6`,ry:`9`,fill:e,transform:`rotate(216 20 20)`}),(0,o.jsx)(`ellipse`,{cx:`20`,cy:`8`,rx:`6`,ry:`9`,fill:e,transform:`rotate(288 20 20)`}),(0,o.jsx)(`circle`,{cx:`20`,cy:`20`,r:`5`,fill:`rgba(255,255,200,0.85)`})]})}var we=Array.from({length:Se},(e,t)=>({id:t,left:`${(t*4.5+Math.random()*4)%100}%`,size:14+Math.floor(t*1.3%18),duration:`${7+t*1.7%9}s`,delay:`${-(t*.8%12)}s`,color:X[t%X.length],drift:`${-30+t*17%60}px`}));function Te(){return(0,o.jsx)(`div`,{className:`petals-canvas`,"aria-hidden":`true`,children:we.map(e=>(0,o.jsx)(`div`,{className:`petal`,style:{left:e.left,animationDuration:e.duration,animationDelay:e.delay},children:(0,o.jsx)(Ce,{color:e.color,size:e.size})},e.id))})}function Ee(){let[e,t]=(0,r.useState)({x:0,y:0}),n=(0,r.useRef)(null);(0,r.useEffect)(()=>{let e=e=>{let r=n.current;if(!r)return;let i=r.getBoundingClientRect(),a=i.left+i.width/2,o=i.top+i.height/2,s=e=>Math.max(-1,Math.min(1,e));t({x:s((e.clientX-a)/(window.innerWidth/2)),y:s((e.clientY-o)/(window.innerHeight/2))})};return window.addEventListener(`mousemove`,e),()=>window.removeEventListener(`mousemove`,e)},[]);let i={lx:43.5,ly:47.5,rx:58.8,ry:46.6},s=e.x*4,c=e.y*4,l=({leftPct:e,topPct:t})=>(0,o.jsxs)(`span`,{className:`me-eye`,style:{left:`${e}%`,top:`${t}%`},children:[(0,o.jsx)(`span`,{className:`me-patch`}),(0,o.jsx)(`span`,{className:`me-pupil`,style:{transform:`translate(${s}px, ${c}px)`}})]});return(0,o.jsxs)(`div`,{className:`loading-inline`,children:[(0,o.jsxs)(`div`,{className:`loading-mascot`,ref:n,children:[(0,o.jsx)(`img`,{src:a,alt:``,draggable:`false`}),(0,o.jsx)(l,{leftPct:i.lx,topPct:i.ly}),(0,o.jsx)(l,{leftPct:i.rx,topPct:i.ry})]}),(0,o.jsxs)(`div`,{className:`loading-dots`,children:[(0,o.jsx)(`span`,{}),(0,o.jsx)(`span`,{}),(0,o.jsx)(`span`,{})]})]})}function De({onSuccess:e}){let[t,n]=(0,r.useState)(``),[i,s]=(0,r.useState)(``),[c,l]=(0,r.useState)(!1),[u,d]=(0,r.useState)(``),[f,p]=(0,r.useState)(!1),[h,g]=(0,r.useState)({x:0,y:0}),_=(0,r.useRef)(null);(0,r.useEffect)(()=>{let e=e=>{let t=_.current;if(!t)return;let n=t.getBoundingClientRect(),r=n.left+n.width/2,i=n.top+n.height/2,a=e=>Math.max(-1,Math.min(1,e));g({x:a((e.clientX-r)/(window.innerWidth/2)),y:a((e.clientY-i)/(window.innerHeight/2))})};return window.addEventListener(`mousemove`,e),()=>window.removeEventListener(`mousemove`,e)},[]);let v=e=>{let t=(e||``).toLowerCase();return t.includes(`invalid login`)||t.includes(`invalid`)||t.includes(`credentials`)?`Неверная почта или пароль`:t.includes(`email not confirmed`)||t.includes(`not confirmed`)?`Почта не подтверждена. Проверьте письмо со ссылкой`:t.includes(`rate`)||t.includes(`too many`)||t.includes(`limit`)?`Слишком много попыток. Попробуйте чуть позже`:t.includes(`network`)||t.includes(`failed to fetch`)||t.includes(`fetch`)?`Нет соединения. Проверьте интернет`:t.includes(`user not found`)?`Неверная почта или пароль`:e||`Не удалось войти. Попробуйте ещё раз`},y=()=>t.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.trim())?i?null:`Введите пароль`:`Проверьте формат почты`:`Введите почту`,b=async()=>{let n=y();if(n){d(n);return}l(!0),d(``);try{await m(t.trim(),i),e()}catch(e){d(v(e.message))}finally{l(!1)}},x={lx:43.5,ly:47.5,rx:58.8,ry:46.6},S=h.x*4,C=h.y*4,w=({leftPct:e,topPct:t})=>(0,o.jsxs)(`span`,{className:`me-eye`,style:{left:`${e}%`,top:`${t}%`},children:[(0,o.jsx)(`span`,{className:`me-patch`}),f?(0,o.jsx)(`svg`,{viewBox:`0 0 28 16`,className:`me-closed`,children:(0,o.jsx)(`path`,{d:`M4 6 Q14 15 24 6`})}):(0,o.jsx)(`span`,{className:`me-pupil`,style:{transform:`translate(${S}px, ${C}px)`}})]}),T=e=>{e.key===`Enter`&&b()};return(0,o.jsx)(`div`,{className:`login3-wrap`,children:(0,o.jsxs)(`div`,{className:`login3-stage`,children:[(0,o.jsxs)(`div`,{className:`me-figure`,ref:_,children:[(0,o.jsx)(`img`,{src:a,alt:``,draggable:`false`}),(0,o.jsx)(w,{leftPct:x.lx,topPct:x.ly}),(0,o.jsx)(w,{leftPct:x.rx,topPct:x.ry})]}),(0,o.jsxs)(`div`,{className:`login3-card`,children:[(0,o.jsxs)(`h1`,{className:`login3-title`,children:[`beauty `,(0,o.jsx)(`span`,{children:`helper`})]}),(0,o.jsx)(`p`,{className:`login3-sub`,children:`Войдите, чтобы продолжить`}),u&&(0,o.jsx)(`div`,{className:`login3-error`,children:u}),(0,o.jsxs)(`div`,{className:`login3-field`,children:[(0,o.jsx)(`label`,{className:`login3-label`,htmlFor:`login-email`,children:`Почта`}),(0,o.jsx)(`input`,{id:`login-email`,className:`login3-input`,type:`email`,value:t,autoComplete:`username`,name:`username`,placeholder:`you@example.com`,onChange:e=>{n(e.target.value),u&&d(``)},onKeyDown:T,autoFocus:!0})]}),(0,o.jsxs)(`div`,{className:`login3-field`,children:[(0,o.jsx)(`label`,{className:`login3-label`,htmlFor:`login-password`,children:`Пароль`}),(0,o.jsx)(`input`,{id:`login-password`,className:`login3-input`,type:`password`,value:i,autoComplete:`current-password`,name:`password`,placeholder:`••••••••`,onChange:e=>{s(e.target.value),u&&d(``)},onKeyDown:T,onFocus:()=>p(!0),onBlur:()=>p(!1)})]}),(0,o.jsx)(`button`,{className:`login3-btn`,onClick:b,disabled:c,children:(0,o.jsx)(`span`,{children:c?`Заходим…`:`Войти`})})]})]})})}(0,i.createRoot)(document.getElementById(`root`)).render((0,o.jsx)(r.StrictMode,{children:(0,o.jsx)(ee,{})}));