function g(n){let e=Array.isArray(n?.strings)?n.strings:[],c=Array.isArray(n?.values)?n.values:[],u=new Set,t=[],f=/(\s)(\.[\w-]+)=\s*$/;for(let r=0;r<e.length;r+=1){let s=e[r]??"",l=s.match(f);if(l&&r<c.length){let d=l[2].slice(1),y=`pds-val-${r}`;s=s.replace(f,`$1data-pds-prop="${d}:${y}"`),u.add(r)}t.push(s),r<c.length&&!u.has(r)&&t.push(`<!--pds-val-${r}-->`)}let m=document.createElement("template");m.innerHTML=t.join("");let a=(r,s)=>{let l=r.parentNode;if(!l)return;if(s==null){l.removeChild(r);return}let p=d=>{if(d!=null){if(d instanceof Node){l.insertBefore(d,r);return}if(Array.isArray(d)){d.forEach(y=>p(y));return}l.insertBefore(document.createTextNode(String(d)),r)}};p(s),l.removeChild(r)},i=document.createTreeWalker(m.content,NodeFilter.SHOW_COMMENT),o=[];for(;i.nextNode();){let r=i.currentNode;r?.nodeValue?.startsWith("pds-val-")&&o.push(r)}return o.forEach(r=>{let s=Number(r.nodeValue.replace("pds-val-",""));a(r,c[s])}),m.content.querySelectorAll("*").forEach(r=>{let s=r.getAttribute("data-pds-prop");if(!s)return;let[l,p]=s.split(":"),d=Number(String(p).replace("pds-val-",""));l&&Number.isInteger(d)&&(r[l]=c[d]),r.removeAttribute("data-pds-prop")}),m.content}function b(n,e){if(e==null)return;if(typeof e=="object"&&Array.isArray(e.strings)&&Array.isArray(e.values)){n.appendChild(g(e));return}if(e instanceof Node){n.appendChild(e);return}if(Array.isArray(e)){e.forEach(u=>b(n,u));return}let c=typeof e=="string"?e:String(e);n.appendChild(document.createTextNode(c))}function A(){let n=navigator.userAgent,e=/Safari/i.test(n),c=/(Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPiOS|Opera)/i.test(n);return e&&!c}function C(n){if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return;let e=window.matchMedia?.("(max-width: 639px)").matches,c=n.classList.contains("dialog-no-scale-animation")?"pds-dialog-fade-enter":e?"pds-dialog-enter-mobile":"pds-dialog-enter";n.style.animation="none",n.offsetWidth,n.style.animation=`${c} var(--transition-normal) ease`,n.addEventListener("animationend",()=>{n.style.animation=""},{once:!0})}function x(n={}){return n?.liquidGlassEffects===!0}async function E(n,e={}){return e={...{title:"Confirm",type:"confirm",buttons:{ok:{name:"OK",primary:!0},cancel:{name:"Cancel",cancel:!0}}},...e},new Promise(u=>{let t=document.createElement("dialog");A()&&t.classList.add("dialog-no-scale-animation"),x(e)&&t.classList.add("liquid-glass"),e.size&&t.classList.add(`dialog-${e.size}`),e.type&&t.classList.add(`dialog-${e.type}`),e.class&&(Array.isArray(e.class)?t.classList.add(...e.class):t.classList.add(e.class)),e.maxHeight&&t.style.setProperty("--dialog-max-height",e.maxHeight);let f=Object.entries(e.buttons).map(([a,i])=>{let o=i.primary?"btn-primary btn-sm":"btn-outline btn-sm";return`<button type="${i.cancel?"button":"submit"}" class="${o}" value="${a}">${i.name}</button>`});if(e.useForm){let a=document.createElement("div");b(a,n);let i=a.querySelector("form");if(i){t.innerHTML=`
          <header>
            <h2>${e.title}</h2>
          </header>
        `;let o=document.createElement("article");for(o.className="dialog-body";i.firstChild;)o.appendChild(i.firstChild);i.appendChild(o);let h=document.createElement("footer");h.innerHTML=f.join(""),i.appendChild(h),t.appendChild(i)}else t.innerHTML=`
          <header>
            <h2>${e.title}</h2>
          </header>
          <article id="msg-container"></article>
          <footer>
            ${f.join("")}
          </footer>
        `,t.querySelector("#msg-container").appendChild(a)}else{t.innerHTML=`
        <form method="dialog">
          <header>
            <h2>${e.title}</h2>
          </header>
          
          <article id="msg-container"></article>
          
          <footer>
            ${f.join("")}
          </footer>
        </form>
      `;let a=t.querySelector("#msg-container");b(a,n)}t.addEventListener("click",a=>{a.target.closest('button[value="cancel"]')&&(t.close(),u(!1))});let m=()=>{let a=t.querySelector("form");a?a.addEventListener("submit",i=>{i.preventDefault();let o;e.useForm&&i.submitter.value==="ok"?(console.log("Found form:",a),console.log("Form elements:",a?Array.from(a.elements):"no form"),o=new FormData(a),console.log("FormData entries:",Array.from(o.entries()))):o=i.submitter.value==="ok",t.close(),u(o)}):requestAnimationFrame(m)};m(),t.addEventListener("close",()=>{setTimeout(()=>t.remove(),200)}),document.body.appendChild(t),typeof e.rendered=="function"&&e.rendered(t),t.showModal(),requestAnimationFrame(()=>C(t))})}export{E as ask};
