var j=globalThis,G=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),Ct=new WeakMap,R=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Ct.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ct.set(e,t))}return t}toString(){return this.cssText}},Et=s=>new R(typeof s=="string"?s:s+"",void 0,rt),ot=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new R(e,s,rt)},xt=(s,t)=>{if(G)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=j.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},nt=G?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Et(e)})(s):s;var{is:Xt,defineProperty:Ft,getOwnPropertyDescriptor:Qt,getOwnPropertyNames:te,getOwnPropertySymbols:ee,getPrototypeOf:se}=Object,z=globalThis,bt=z.trustedTypes,ie=bt?bt.emptyScript:"",re=z.reactiveElementPolyfillSupport,O=(s,t)=>s,at={toAttribute(s,t){switch(t){case Boolean:s=s?ie:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Pt=(s,t)=>!Xt(s,t),wt={attribute:!0,type:String,converter:at,reflect:!1,useDefault:!1,hasChanged:Pt};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=wt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Ft(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:o}=Qt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let l=r?.call(this);o?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??wt}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=se(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,i=[...te(e),...ee(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(nt(r))}else t!==void 0&&e.push(nt(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:at).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let o=i.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:at;this._$Em=r;let l=n.fromAttribute(e,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){let r=this.constructor,o=this[t];if(i??=r.getPropertyOptions(t),!((i.hasChanged??Pt)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,o]of i){let{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[O("elementProperties")]=new Map,g[O("finalized")]=new Map,re?.({ReactiveElement:g}),(z.reactiveElementVersions??=[]).push("2.1.1");var lt=globalThis,W=lt.trustedTypes,Tt=W?W.createPolicy("lit-html",{createHTML:s=>s}):void 0,ct="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,dt="?"+y,oe=`<${dt}>`,b=document,L=()=>b.createComment(""),k=s=>s===null||typeof s!="object"&&typeof s!="function",pt=Array.isArray,Ot=s=>pt(s)||typeof s?.[Symbol.iterator]=="function",ht=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mt=/-->/g,Ut=/>/g,E=RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ht=/'/g,Nt=/"/g,Dt=/^(?:script|style|textarea|title)$/i,ut=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),X=ut(1),ft=ut(2),Lt=ut(3),_=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Rt=new WeakMap,x=b.createTreeWalker(b,129);function kt(s,t){if(!pt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tt!==void 0?Tt.createHTML(t):t}var Vt=(s,t)=>{let e=s.length-1,i=[],r,o=t===2?"<svg>":t===3?"<math>":"",n=D;for(let l=0;l<e;l++){let a=s[l],c,p,h=-1,f=0;for(;f<a.length&&(n.lastIndex=f,p=n.exec(a),p!==null);)f=n.lastIndex,n===D?p[1]==="!--"?n=Mt:p[1]!==void 0?n=Ut:p[2]!==void 0?(Dt.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=E):p[3]!==void 0&&(n=E):n===E?p[0]===">"?(n=r??D,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?E:p[3]==='"'?Nt:Ht):n===Nt||n===Ht?n=E:n===Mt||n===Ut?n=D:(n=E,r=void 0);let u=n===E&&s[l+1].startsWith("/>")?" ":"";o+=n===D?a+oe:h>=0?(i.push(c),a.slice(0,h)+ct+a.slice(h)+y+u):a+y+(h===-2?l:u)}return[kt(s,o+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},V=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[c,p]=Vt(t,e);if(this.el=s.createElement(c,i),x.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=x.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(ct)){let f=p[n++],u=r.getAttribute(h).split(y),$=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:$[2],strings:u,ctor:$[1]==="."?q:$[1]==="?"?Z:$[1]==="@"?Y:P}),r.removeAttribute(h)}else h.startsWith(y)&&(a.push({type:6,index:o}),r.removeAttribute(h));if(Dt.test(r.tagName)){let h=r.textContent.split(y),f=h.length-1;if(f>0){r.textContent=W?W.emptyScript:"";for(let u=0;u<f;u++)r.append(h[u],L()),x.nextNode(),a.push({type:2,index:++o});r.append(h[f],L())}}}else if(r.nodeType===8)if(r.data===dt)a.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf(y,h+1))!==-1;)a.push({type:7,index:o}),h+=y.length-1}o++}}static createElement(t,e){let i=b.createElement("template");return i.innerHTML=t,i}};function w(s,t,e=s,i){if(t===_)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,o=k(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=w(s,r._$AS(s,t.values),r,i)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??b).importNode(e,!0);x.currentNode=r;let o=x.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new U(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new J(o,this,t)),this._$AV.push(c),a=i[++l]}n!==a?.index&&(o=x.nextNode(),n++)}return x.currentNode=b,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},U=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),k(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ot(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=V.createElement(kt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let o=new K(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=Rt.get(t.strings);return e===void 0&&Rt.set(t.strings,e=new V(t)),e}k(t){pt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let o of t)r===e.length?e.push(i=new s(this.O(L()),this.O(L()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,r){let o=this.strings,n=!1;if(o===void 0)t=w(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==_,n&&(this._$AH=t);else{let l=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=w(this,l[i+a],e,a),c===_&&(c=this._$AH[a]),n||=!k(c)||c!==this._$AH[a],c===d?t=d:t!==d&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!r&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},q=class extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},Z=class extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},Y=class extends P{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??d)===_)return;let i=this._$AH,r=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==d&&(i===d||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},J=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}},Bt={M:ct,P:y,A:dt,C:1,L:Vt,R:K,D:Ot,V:w,I:U,H:P,N:Z,U:Y,B:q,F:J},ne=lt.litHtmlPolyfillSupport;ne?.(V,U),(lt.litHtmlVersions??=[]).push("3.3.1");var $t=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let o=e?.renderBefore??null;i._$litPart$=r=new U(t.insertBefore(L(),o),o,void 0,e??{})}return r._$AI(s),r};var mt=globalThis,T=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};T._$litElement$=!0,T.finalized=!0,mt.litElementHydrateSupport?.({LitElement:T});var ae=mt.litElementPolyfillSupport;ae?.({LitElement:T});(mt.litElementVersions??=[]).push("4.2.1");var S={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},m=s=>(...t)=>({_$litDirective$:s,values:t}),A=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:he}=Bt,jt=s=>s===null||typeof s!="object"&&typeof s!="function";var Gt=s=>s.strings===void 0,It=()=>document.createComment(""),H=(s,t,e)=>{let i=s._$AA.parentNode,r=t===void 0?s._$AB:t._$AA;if(e===void 0){let o=i.insertBefore(It(),r),n=i.insertBefore(It(),r);e=new he(o,n,s,s.options)}else{let o=e._$AB.nextSibling,n=e._$AM,l=n!==s;if(l){let a;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(a=s._$AU)!==n._$AU&&e._$AP(a)}if(o!==r||l){let a=e._$AA;for(;a!==o;){let c=a.nextSibling;i.insertBefore(a,r),a=c}}}return e},C=(s,t,e=s)=>(s._$AI(t,e),s),le={},F=(s,t=le)=>s._$AH=t,zt=s=>s._$AH,Q=s=>{s._$AR(),s._$AA.remove()};var Wt=(s,t,e)=>{let i=new Map;for(let r=t;r<=e;r++)i.set(s[r],r);return i},ze=m(class extends A{constructor(s){if(super(s),s.type!==S.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let r=[],o=[],n=0;for(let l of s)r[n]=i?i(l,n):n,o[n]=e(l,n),n++;return{values:o,keys:r}}render(s,t,e){return this.dt(s,t,e).values}update(s,[t,e,i]){let r=zt(s),{values:o,keys:n}=this.dt(t,e,i);if(!Array.isArray(r))return this.ut=n,o;let l=this.ut??=[],a=[],c,p,h=0,f=r.length-1,u=0,$=o.length-1;for(;h<=f&&u<=$;)if(r[h]===null)h++;else if(r[f]===null)f--;else if(l[h]===n[u])a[u]=C(r[h],o[u]),h++,u++;else if(l[f]===n[$])a[$]=C(r[f],o[$]),f--,$--;else if(l[h]===n[$])a[$]=C(r[h],o[$]),H(s,a[$+1],r[h]),h++,$--;else if(l[f]===n[u])a[u]=C(r[f],o[u]),H(s,r[h],r[f]),f--,u++;else if(c===void 0&&(c=Wt(n,u,$),p=Wt(l,h,f)),c.has(l[h]))if(c.has(l[f])){let v=p.get(n[u]),it=v!==void 0?r[v]:null;if(it===null){let St=H(s,r[h]);C(St,o[u]),a[u]=St}else a[u]=C(it,o[u]),H(s,r[h],it),r[v]=null;u++}else Q(r[f]),f--;else Q(r[h]),h++;for(;u<=$;){let v=H(s,a[$+1]);C(v,o[u]),a[u++]=v}for(;h<=f;){let v=r[h++];v!==null&&Q(v)}return this.ut=n,F(s,a),_}});var Fe=m(class extends A{constructor(){super(...arguments),this.key=d}render(s,t){return this.key=s,t}update(s,[t,e]){return t!==this.key&&(F(s),this.key=t),e}});var os=m(class extends A{constructor(s){if(super(s),s.type!==S.ATTRIBUTE||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let e=s.element.classList;for(let i of this.st)i in t||(e.remove(i),this.st.delete(i));for(let i in t){let r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(e.add(i),this.st.add(i)):(e.remove(i),this.st.delete(i)))}return _}});var B=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),B(i,t);return!0},tt=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},Kt=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),pe(t)}};function ce(s){this._$AN!==void 0?(tt(this),this._$AM=s,Kt(this)):this._$AM=s}function de(s,t=!1,e=0){let i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(i))for(let o=e;o<i.length;o++)B(i[o],!1),tt(i[o]);else i!=null&&(B(i,!1),tt(i));else B(this,s)}var pe=s=>{s.type==S.CHILD&&(s._$AP??=de,s._$AQ??=ce)},N=class extends A{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),Kt(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(B(this,t),tt(this))}setValue(t){if(Gt(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var ue=()=>new At,At=class{},_t=new WeakMap,fe=m(class extends N{render(s){return d}update(s,[t]){let e=t!==this.G;return e&&this.G!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=t,this.ht=s.options?.host,this.rt(this.ct=s.element)),d}rt(s){if(this.isConnected||(s=void 0),typeof this.G=="function"){let t=this.ht??globalThis,e=_t.get(t);e===void 0&&(e=new WeakMap,_t.set(t,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,s),s!==void 0&&this.G.call(this.ht,s)}else this.G.value=s}get lt(){return typeof this.G=="function"?_t.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var $e=s=>s??d;var et=class{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}},st=class{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(t=>this.Z=t)}resume(){this.Z?.(),this.Y=this.Z=void 0}};var qt=s=>!jt(s)&&typeof s.then=="function",Zt=1073741823,vt=class extends N{constructor(){super(...arguments),this._$Cwt=Zt,this._$Cbt=[],this._$CK=new et(this),this._$CX=new st}render(...t){return t.find(e=>!qt(e))??_}update(t,e){let i=this._$Cbt,r=i.length;this._$Cbt=e;let o=this._$CK,n=this._$CX;this.isConnected||this.disconnected();for(let l=0;l<e.length&&!(l>this._$Cwt);l++){let a=e[l];if(!qt(a))return this._$Cwt=l,a;l<r&&a===i[l]||(this._$Cwt=Zt,r=0,Promise.resolve(a).then(async c=>{for(;n.get();)await n.get();let p=o.deref();if(p!==void 0){let h=p._$Cbt.indexOf(a);h>-1&&h<p._$Cwt&&(p._$Cwt=h,p.setValue(c))}}))}return _}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}},me=m(vt);var M=class extends A{constructor(t){if(super(t),this.it=d,t.type!==S.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===d||t==null)return this._t=void 0,this.it=t;if(t===_)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};M.directiveName="unsafeHTML",M.resultType=1;var _e=m(M);var I=class extends M{};I.directiveName="unsafeSVG",I.resultType=2;var Ae=m(I);var Jt=Symbol.for(""),ve=s=>{if(s?.r===Jt)return s?._$litStatic$},ge=s=>({_$litStatic$:s,r:Jt});var Yt=new Map,gt=s=>(t,...e)=>{let i=e.length,r,o,n=[],l=[],a,c=0,p=!1;for(;c<i;){for(a=t[c];c<i&&(o=e[c],(r=ve(o))!==void 0);)a+=r+t[++c],p=!0;c!==i&&l.push(o),n.push(a),c++}if(c===i&&n.push(t[i]),p){let h=n.join("$$lit$$");(t=Yt.get(h))===void 0&&(n.raw=n,Yt.set(h,t=n)),e=l}return s(t,...e)},ye=gt(X),qs=gt(ft),Zs=gt(Lt);var Qs=X,ti=ot;var yt=class extends A{#t=null;#e=null;render(t){return d}update(t,[e]){let i=t.element;return this.#e!==i?(this.#e=i,this.#t=e,this.#s()):JSON.stringify(this.#t)!==JSON.stringify(e)&&(this.#t=e,this.#s()),d}async#s(){if(!this.#e||!this.#t)return;let t=this.#e.tagName.toLowerCase();await customElements.whenDefined(t);for(let[e,i]of Object.entries(this.#t))this.#e[e]=i}},si=m(yt);export{T as LitElement,os as classMap,ue as createRef,ti as css,Qs as html,$e as ifDefined,Fe as keyed,si as lazyProps,d as nothing,fe as ref,$t as render,ze as repeat,ye as staticHtml,ft as svg,_e as unsafeHTML,Ae as unsafeSVG,ge as unsafeStatic,me as until};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/keyed.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/private-async-helpers.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/until.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-svg.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
