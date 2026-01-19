var Le=Object.defineProperty;var N=(n,t)=>()=>(n&&(t=n(n=0)),t);var P=(n,t)=>{for(var e in t)Le(n,e,{get:t[e],enumerable:!0})};var ne={};P(ne,{enums:()=>u});var u,_=N(()=>{u={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"}}});var ce={};P(ce,{default:()=>De,findComponentForElement:()=>Re,getAllSelectors:()=>Ae,getAllTags:()=>je,getByCategory:()=>Be,ontology:()=>z,searchOntology:()=>We});function W(n,t){if(!n||!t)return!1;try{return n.matches(t)}catch{return!1}}function se(n,t){if(!n||!t||!n.closest)return null;try{return n.closest(t)}catch{return null}}function Re(n,{maxDepth:t=5}={}){if(!n||n.closest&&n.closest(".showcase-toc"))return null;let e=n,a=0;for(;e&&a<t;){if(a++,e.tagName==="DS-SHOWCASE")return null;if(e.classList&&e.classList.contains("showcase-section")){e=e.parentElement;continue}for(let o of PDS.ontology.enhancements){let i=o.selector||o;if(W(e,i))return{element:e,componentType:"enhanced-component",displayName:o.description||i,id:o.id}}if(e.tagName==="FIELDSET"){let o=e.getAttribute("role");if(o==="group"||o==="radiogroup")return{element:e,componentType:"form-group",displayName:o==="radiogroup"?"radio group":"form group"}}if(e.tagName==="LABEL"&&e.querySelector&&e.querySelector("input,select,textarea"))return{element:e,componentType:"form-control",displayName:"label with input"};let r=e.closest?e.closest("label"):null;if(r&&r.querySelector&&r.querySelector("input,select,textarea"))return{element:r,componentType:"form-control",displayName:"label with input"};for(let o of PDS.ontology.primitives){for(let i of o.selectors||[]){let c=String(i||"").trim();if(c.includes("*")){if(c.startsWith(".")){let d=c.slice(1).replace(/\*/g,"");if(e.classList&&Array.from(e.classList).some(g=>g.startsWith(d)))return{element:e,componentType:"pds-primitive",displayName:o.name||o.id,id:o.id,tags:o.tags};let s=e.parentElement,p=0;for(;s&&p<t;){if(s.classList&&Array.from(s.classList).some(g=>g.startsWith(d))&&s.tagName!=="DS-SHOWCASE")return{element:s,componentType:"pds-primitive",displayName:o.name||o.id,id:o.id,tags:o.tags};s=s.parentElement,p++}continue}continue}if(W(e,c))return{element:e,componentType:"pds-primitive",displayName:o.name||o.id,id:o.id,tags:o.tags};let l=se(e,c);if(l&&l.tagName!=="DS-SHOWCASE")return{element:l,componentType:"pds-primitive",displayName:o.name||o.id,id:o.id,tags:o.tags}}if(e.classList){let i=Array.from(e.classList);for(let c of o.selectors||[])if(typeof c=="string"&&c.includes("*")&&c.startsWith(".")){let l=c.slice(1).replace(/\*/g,"");if(i.some(d=>d.startsWith(l)))return{element:e,componentType:"pds-primitive",displayName:o.name||o.id,id:o.id,tags:o.tags}}}}for(let o of PDS.ontology.layoutPatterns||[])for(let i of o.selectors||[]){let c=String(i||"").trim();if(c.includes("*")){if(c.startsWith(".")){let d=c.slice(1).replace(/\*/g,"");if(e.classList&&Array.from(e.classList).some(s=>s.startsWith(d)))return{element:e,componentType:"layout-pattern",displayName:o.name||o.id,id:o.id,tags:o.tags}}continue}if(W(e,c))return{element:e,componentType:"layout-pattern",displayName:o.name||o.id,id:o.id,tags:o.tags};let l=se(e,c);if(l&&l.tagName!=="DS-SHOWCASE")return{element:l,componentType:"layout-pattern",displayName:o.name||o.id,id:o.id,tags:o.tags}}if(e.tagName&&e.tagName.includes("-")){let o=e.tagName.toLowerCase(),i=PDS.ontology.components.find(c=>c.selectors.includes(o));return{element:e,componentType:"web-component",displayName:i?.name||o,id:i?.id||o,tags:i?.tags}}if(e.tagName==="BUTTON"){let o=e.querySelector&&e.querySelector("pds-icon");return{element:e,componentType:"button",displayName:o?"button with icon":"button",id:"button"}}if(W(e,"pds-icon")||e.closest&&e.closest("pds-icon")){let o=W(e,"pds-icon")?e:e.closest("pds-icon");return{element:o,componentType:"icon",displayName:`pds-icon (${o.getAttribute&&o.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(W(e,"nav[data-dropdown]")||e.closest&&e.closest("nav[data-dropdown]"))return{element:W(e,"nav[data-dropdown]")?e:e.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};e=e.parentElement}return null}function Ae(){let n=[];for(let t of PDS.ontology.primitives)n.push(...t.selectors||[]);for(let t of PDS.ontology.components)n.push(...t.selectors||[]);for(let t of PDS.ontology.layoutPatterns||[])n.push(...t.selectors||[]);return Array.from(new Set(n))}function We(n,t={}){let e=n.toLowerCase(),a=[],r=(o,i)=>{for(let c of o)(c.id?.toLowerCase().includes(e)||c.name?.toLowerCase().includes(e)||c.description?.toLowerCase().includes(e)||c.tags?.some(d=>d.toLowerCase().includes(e))||c.category?.toLowerCase().includes(e)||c.selectors?.some(d=>d.toLowerCase().includes(e)))&&a.push({...c,type:i})};return(!t.type||t.type==="primitive")&&r(z.primitives,"primitive"),(!t.type||t.type==="component")&&r(z.components,"component"),(!t.type||t.type==="layout")&&r(z.layoutPatterns,"layout"),(!t.type||t.type==="enhancement")&&r(z.enhancements,"enhancement"),a}function Be(n){let t=n.toLowerCase();return{primitives:z.primitives.filter(e=>e.category===t),components:z.components.filter(e=>e.category===t),layouts:z.layoutPatterns.filter(e=>e.category===t)}}function je(){let n=new Set;return z.primitives.forEach(t=>t.tags?.forEach(e=>n.add(e))),z.components.forEach(t=>t.tags?.forEach(e=>n.add(e))),z.layoutPatterns.forEach(t=>t.tags?.forEach(e=>n.add(e))),z.enhancements.forEach(t=>t.tags?.forEach(e=>n.add(e))),Array.from(n).sort()}var z,De,Y=N(()=>{z={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"alert",name:"Alert",description:"Contextual feedback messages",selectors:[".alert",".alert-info",".alert-success",".alert-warning",".alert-danger",".alert-error",".alert-dismissible",".semantic-message"],tags:["feedback","message","notification","status"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element",tags:["menu","interactive","navigation"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["alert","badge"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-working"],btn:["button","interactive","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],alert:["notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["alert","toast","pds-toaster","feedback","message","popup"],toast:["pds-toaster","notification","alert","feedback","popup","snackbar"],feedback:["alert","notification","toast","status","badge","validation","error","success"],message:["alert","notification","feedback","dialog","toast"],status:["badge","alert","indicator","feedback","state"],error:["alert","danger","validation","feedback","warning"],success:["alert","feedback","badge","status","check"],warning:["alert","caution","feedback","status"],info:["alert","information","feedback","status"],danger:["alert","error","feedback","destructive","delete"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};De=z});var be={};P(be,{AutoDefiner:()=>ee});async function tt(...n){let t={};n.length&&typeof n[n.length-1]=="object"&&(t=n.pop()||{});let e=n,{baseURL:a,mapper:r=d=>`${d}.js`,onError:o=(d,s)=>console.error(`[defineWebComponents] ${d}:`,s)}=t,i=a?new URL(a,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),c=d=>d.toLowerCase().replace(/(^|-)([a-z])/g,(s,p,g)=>g.toUpperCase()),l=async d=>{try{if(customElements.get(d))return{tag:d,status:"already-defined"};let s=r(d),g=await import(s instanceof URL?s.href:new URL(s,i).href),h=g?.default??g?.[c(d)];if(!h){if(customElements.get(d))return{tag:d,status:"self-defined"};throw new Error(`No export found for ${d}. Expected default export or named export "${c(d)}".`)}return customElements.get(d)?{tag:d,status:"race-already-defined"}:(customElements.define(d,h),{tag:d,status:"defined"})}catch(s){throw o(d,s),s}};return Promise.all(e.map(l))}var ee,ye=N(()=>{ee=class{constructor(t={}){let{baseURL:e,mapper:a,onError:r,predicate:o=()=>!0,attributeModule:i="data-module",root:c=document,scanExisting:l=!0,debounceMs:d=16,observeShadows:s=!0,enhancers:p=[],patchAttachShadow:g=!0}=t,h=new Set,v=new Set,x=new Set,m=new Map,w=new WeakMap,F=new WeakMap,k=0,T=!1,R=null,B=f=>{if(!f||!p.length)return;let y=F.get(f);y||(y=new Set,F.set(f,y));for(let b of p)if(!(!b.selector||!b.run)&&!y.has(b.selector))try{f.matches&&f.matches(b.selector)&&(b.run(f),y.add(b.selector))}catch(C){console.warn(`[AutoDefiner] Error applying enhancer for selector "${b.selector}":`,C)}},j=(f,y)=>{if(!T&&!(!f||!f.includes("-"))&&!customElements.get(f)&&!v.has(f)&&!x.has(f)){if(y&&y.getAttribute){let b=y.getAttribute(i);b&&!m.has(f)&&m.set(f,b)}h.add(f),$()}},$=()=>{k||(k=setTimeout(L,d))},S=f=>{if(f){if(f.nodeType===1){let y=f,b=y.tagName?.toLowerCase();b&&b.includes("-")&&!customElements.get(b)&&o(b,y)&&j(b,y),B(y),s&&y.shadowRoot&&E(y.shadowRoot)}f.querySelectorAll&&f.querySelectorAll("*").forEach(y=>{let b=y.tagName?.toLowerCase();b&&b.includes("-")&&!customElements.get(b)&&o(b,y)&&j(b,y),B(y),s&&y.shadowRoot&&E(y.shadowRoot)})}},E=f=>{if(!f||w.has(f))return;S(f);let y=new MutationObserver(b=>{for(let C of b)C.addedNodes?.forEach(D=>{S(D)}),C.type==="attributes"&&C.target&&S(C.target)});y.observe(f,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...p.map(b=>b.selector).filter(b=>b.startsWith("data-"))]}),w.set(f,y)};async function L(){if(clearTimeout(k),k=0,!h.size)return;let f=Array.from(h);h.clear(),f.forEach(y=>v.add(y));try{let y=b=>m.get(b)??(a?a(b):`${b}.js`);await tt(...f,{baseURL:e,mapper:y,onError:(b,C)=>{x.add(b),r?.(b,C)}})}catch{}finally{f.forEach(y=>v.delete(y))}}let G=c===document?document.documentElement:c,A=new MutationObserver(f=>{for(let y of f)y.addedNodes?.forEach(b=>{S(b)}),y.type==="attributes"&&y.target&&S(y.target)});if(A.observe(G,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...p.map(f=>f.selector).filter(f=>f.startsWith("data-"))]}),s&&g&&Element.prototype.attachShadow){let f=Element.prototype.attachShadow;Element.prototype.attachShadow=function(b){let C=f.call(this,b);if(b&&b.mode==="open"){E(C);let D=this.tagName?.toLowerCase();D&&D.includes("-")&&!customElements.get(D)&&j(D,this)}return C},R=()=>Element.prototype.attachShadow=f}return l&&S(G),{stop(){T=!0,A.disconnect(),R&&R(),k&&(clearTimeout(k),k=0),w.forEach(f=>f.disconnect())},flush:L}}static async define(...t){let e={};t.length&&typeof t[t.length-1]=="object"&&(e=t.pop()||{});let a=t,{baseURL:r,mapper:o=s=>`${s}.js`,onError:i=(s,p)=>console.error(`[defineWebComponents] ${s}:`,p)}=e,c=r?new URL(r,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),l=s=>s.toLowerCase().replace(/(^|-)([a-z])/g,(p,g,h)=>h.toUpperCase()),d=async s=>{try{if(customElements.get(s))return{tag:s,status:"already-defined"};let p=o(s),h=await import(p instanceof URL?p.href:new URL(p,c).href),v=h?.default??h?.[l(s)];if(!v){if(customElements.get(s))return{tag:s,status:"self-defined"};throw new Error(`No export found for ${s}. Expected default export or named export "${l(s)}".`)}return customElements.get(s)?{tag:s,status:"race-already-defined"}:(customElements.define(s,v),{tag:s,status:"defined"})}catch(p){throw i(s,p),p}};return Promise.all(a.map(d))}}});var ae={};P(ae,{PDSQuery:()=>re});var re,oe=N(()=>{re=class{constructor(t){this.pds=t,this.intents={color:["color","colours","shade","tint","hue","foreground","background","text","fill","bg","fg"],spacing:["spacing","space","gap","padding","margin","distance","rhythm"],typography:["font","text","type","typography","heading","body","size","weight","family"],border:["border","outline","stroke","edge","frame"],radius:["radius","rounded","corner","curve","round"],shadow:["shadow","elevation","depth","glow","drop-shadow"],component:["component","element","widget"],utility:["utility","class","helper","css"],layout:["layout","container","grid","flex","group","arrange","organize"],pattern:["pattern","example","template","structure"],interaction:["hover","focus","active","disabled","pressed","selected","checked"]},this.entities={button:["button","btn","cta"],input:["input","field","textbox","text-field","form-control"],card:["card","panel"],badge:["badge","pill","tag","chip"],surface:["surface","background","layer","container"],icon:["icon","svg","glyph","symbol"],link:["link","anchor","hyperlink"],nav:["nav","navigation","menu"],modal:["modal","dialog","popup","overlay"],drawer:["drawer","sidebar","panel"],tab:["tab","tabstrip"],toast:["toast","notification","alert","message"]},this.questionWords=["what","which","how","where","when","show","find","get","give","tell"]}async search(t){if(!t||t.length<2)return[];let e=t.toLowerCase().trim(),a=this.tokenize(e),r=this.analyzeQuery(a,e),o=[];r.intents.has("color")&&o.push(...this.queryColors(r,e)),(r.intents.has("utility")||r.intents.has("border")||r.intents.has("layout")||e.includes("class"))&&o.push(...this.queryUtilities(r,e)),(r.intents.has("component")||r.entities.size>0)&&o.push(...this.queryComponents(r,e)),(r.intents.has("layout")||r.intents.has("pattern"))&&o.push(...this.queryPatterns(r,e)),r.intents.has("typography")&&o.push(...this.queryTypography(r,e)),r.intents.has("spacing")&&o.push(...this.querySpacing(r,e));let i=new Map;for(let c of o){let l=c.value;(!i.has(l)||i.get(l).score<c.score)&&i.set(l,c)}return Array.from(i.values()).sort((c,l)=>l.score-c.score).slice(0,10)}tokenize(t){return t.toLowerCase().replace(/[?!.]/g,"").split(/\s+/).filter(e=>e.length>0)}analyzeQuery(t,e){let a={intents:new Set,entities:new Set,modifiers:new Set,isQuestion:!1,tokens:t,fullText:e};a.isQuestion=this.questionWords.some(r=>t.includes(r));for(let[r,o]of Object.entries(this.intents))o.some(i=>t.includes(i)||e.includes(i))&&a.intents.add(r);for(let[r,o]of Object.entries(this.entities))o.some(i=>t.includes(i)||e.includes(i))&&a.entities.add(r);return(t.includes("hover")||e.includes("hover"))&&a.modifiers.add("hover"),(t.includes("focus")||e.includes("focus"))&&a.modifiers.add("focus"),(t.includes("active")||e.includes("active"))&&a.modifiers.add("active"),(t.includes("disabled")||e.includes("disabled"))&&a.modifiers.add("disabled"),a}queryColors(t,e){let a=[],r=this.pds.compiled;if(!r?.tokens?.colors)return a;let o=r.tokens.colors,i=Array.from(t.entities),c=Array.from(t.modifiers);if(c.includes("focus")&&t.intents.has("border")&&i.includes("input")&&a.push({text:"Focus border color: var(--color-primary-500)",value:"--color-primary-500",icon:"palette",category:"Color Token",score:100,cssVar:"var(--color-primary-500)",description:"Primary color used for focus states on form inputs"}),(e.includes("foreground")||e.includes("text"))&&(e.includes("surface")||t.entities.has("surface"))&&(a.push({text:"Text on surface: var(--surface-text)",value:"--surface-text",icon:"palette",category:"Surface Token",score:95,cssVar:"var(--surface-text)",description:"Default text color for current surface"}),a.push({text:"Secondary text: var(--surface-text-secondary)",value:"--surface-text-secondary",icon:"palette",category:"Surface Token",score:90,cssVar:"var(--surface-text-secondary)",description:"Secondary/muted text on surface"})),e.includes("primary")||e.includes("accent")||e.includes("secondary")){let l=e.includes("primary")?"primary":e.includes("accent")?"accent":"secondary";for(let d of[500,600,700]){let s=`--color-${l}-${d}`;a.push({text:`${l.charAt(0).toUpperCase()+l.slice(1)} ${d}: var(${s})`,value:s,icon:"palette",category:"Color Scale",score:80-(d-500)/100,cssVar:`var(${s})`,description:`${l} color scale shade ${d}`})}}if(i.includes("button")&&t.intents.has("color")){let l=c[0];l?a.push({text:`Button ${l} fill: var(--primary-fill-${l})`,value:`--primary-fill-${l}`,icon:"palette",category:"Interactive Token",score:92,description:`Button background color in ${l} state`}):a.push({text:"Button fill: var(--primary-fill)",value:"--primary-fill",icon:"palette",category:"Interactive Token",score:88,description:"Default button background color"})}return a}queryUtilities(t,e){let a=[],r=this.pds.ontology;if(!r?.utilities)return a;let o=r.utilities,i=[];for(let c of Object.values(o))if(typeof c=="object")for(let l of Object.values(c))Array.isArray(l)&&i.push(...l);return t.intents.has("border")&&i.filter(l=>l.includes("border")||l.includes("outline")).forEach(l=>{let d=80;e.includes("gradient")&&l.includes("gradient")&&(d=95),e.includes("glow")&&l.includes("glow")&&(d=95),a.push({text:`${l} - Border utility class`,value:l,icon:"code",category:"Utility Class",score:d,code:`<div class="${l}">...</div>`,description:this.describeUtility(l)})}),t.intents.has("layout")&&i.filter(l=>l.includes("flex")||l.includes("grid")||l.includes("items-")||l.includes("justify-")||l.includes("gap-")).forEach(l=>{a.push({text:`${l} - Layout utility`,value:l,icon:"layout",category:"Utility Class",score:85,code:`<div class="${l}">...</div>`,description:this.describeUtility(l)})}),e.includes("group")&&t.entities.has("button")&&a.push({text:".btn-group - Group buttons together",value:".btn-group",icon:"code",category:"Utility Class",score:90,code:`<div class="btn-group">
  <button class="btn-primary">One</button>
  <button class="btn-primary">Two</button>
</div>`,description:"Container for grouped buttons with connected styling"}),a}queryComponents(t,e){let a=[],r=this.pds.ontology;return!r?.components&&!r?.primitives||(r.components&&r.components.forEach(o=>{let i=this.scoreMatch(e,o.name+" "+o.id);i>50&&a.push({text:`<${o.id}> - ${o.name}`,value:o.id,icon:"brackets-curly",category:"Web Component",score:i,code:`<${o.id}></${o.id}>`,description:o.description||`${o.name} web component`})}),r.primitives&&r.primitives.forEach(o=>{let i=this.scoreMatch(e,o.name+" "+o.id);if(i>50){let c=o.selectors?.[0]||o.id;a.push({text:`${c} - ${o.name}`,value:o.id,icon:"tag",category:"Primitive",score:i-5,code:this.generatePrimitiveExample(o),description:o.description||`${o.name} primitive element`})}}),e.includes("icon")&&(e.includes("only")||e.includes("button"))&&a.push({text:'Icon-only button: <button class="btn-icon">',value:"btn-icon",icon:"star",category:"Pattern",score:95,code:`<button class="btn-icon btn-primary">
  <pds-icon icon="heart"></pds-icon>
</button>`,description:"Button with only an icon, no text label"})),a}queryPatterns(t,e){let a=[],r=this.pds.ontology;return r?.layoutPatterns&&(r.layoutPatterns.forEach(o=>{let i=this.scoreMatch(e,o.name+" "+o.id+" "+(o.description||""));if(i>50){let c=o.selectors?.[0]||`.${o.id}`;a.push({text:`${o.name} - ${o.description||"Layout pattern"}`,value:o.id,icon:"layout",category:"Layout Pattern",score:i,code:`<div class="${c.replace(".","")}">
  <!-- content -->
</div>`,description:o.description||o.name})}}),(e.includes("container")||e.includes("group"))&&(a.push({text:"Card - Container for grouping content",value:"card",icon:"layout",category:"Primitive",score:88,code:`<article class="card">
  <header>
    <h3>Title</h3>
  </header>
  <p>Content...</p>
</article>`,description:"Card container with optional header, body, and footer"}),a.push({text:"Section - Semantic container for grouping",value:"section",icon:"layout",category:"Pattern",score:85,code:`<section>
  <h2>Section Title</h2>
  <!-- content -->
</section>`,description:"Semantic section element for content grouping"}))),a}queryTypography(t,e){let a=[],r=this.pds.compiled;if(!r?.tokens?.typography)return a;let o=r.tokens.typography;return(e.includes("heading")||e.includes("title"))&&a.push({text:"Heading font: var(--font-family-heading)",value:"--font-family-heading",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-heading)",description:"Font family for headings"}),(e.includes("body")||e.includes("text"))&&a.push({text:"Body font: var(--font-family-body)",value:"--font-family-body",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-body)",description:"Font family for body text"}),a}querySpacing(t,e){let a=[],r=this.pds.compiled;if(!r?.tokens?.spacing)return a;let o=r.tokens.spacing;for(let[i,c]of Object.entries(o))["2","4","6","8"].includes(i)&&a.push({text:`Spacing ${i}: var(--spacing-${i})`,value:`--spacing-${i}`,icon:"ruler",category:"Spacing Token",score:75,cssVar:`var(--spacing-${i})`,description:`Spacing value: ${c}`});return a}scoreMatch(t,e){let a=t.toLowerCase(),r=e.toLowerCase(),o=0;if(a===r)return 100;r.includes(a)&&(o+=80);let i=this.tokenize(a),c=this.tokenize(r),l=i.filter(d=>c.includes(d)).length;return o+=l/i.length*40,r.startsWith(a)&&(o+=20),Math.min(100,o)}generatePrimitiveExample(t){let e=t.selectors?.[0]||t.id;return e.includes("button")||t.id==="button"?'<button class="btn-primary">Click me</button>':e.includes("card")||t.id==="card"?`<article class="card">
  <h3>Title</h3>
  <p>Content</p>
</article>`:e.includes("badge")||t.id==="badge"?'<span class="badge">New</span>':`<${e}>Content</${e}>`}describeUtility(t){return t.includes("border-gradient")?"Apply animated gradient border effect":t.includes("border-glow")?"Apply glowing border effect":t.includes("flex")?"Flexbox container utility":t.includes("grid")?"Grid container utility":t.includes("gap-")?"Set gap between flex/grid children":t.includes("items-")?"Align items in flex container":t.includes("justify-")?"Justify content in flex container":t===".btn-group"?"Group buttons with connected styling":"Utility class for styling"}}});var Ee={};P(Ee,{deepMerge:()=>Fe,isObject:()=>J});function J(n){return n&&typeof n=="object"&&!Array.isArray(n)}function Fe(n,t){let e={...n};return J(n)&&J(t)&&Object.keys(t).forEach(a=>{J(t[a])?a in n?e[a]=Fe(n[a],t[a]):Object.assign(e,{[a]:t[a]}):Object.assign(e,{[a]:t[a]})}),e}var Ce=N(()=>{});_();var I={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.5,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:u.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:u.RadiusSizes.small,borderWidth:u.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.618,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:u.RadiusSizes.xlarge,borderWidth:u.BorderWidths.medium},behavior:{transitionSpeed:u.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:u.RadiusSizes.none,borderWidth:u.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.5,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:u.RadiusSizes.xxlarge,borderWidth:u.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:u.RadiusSizes.none,borderWidth:u.BorderWidths.thick},behavior:{transitionSpeed:u.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:u.RadiusSizes.medium,borderWidth:u.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.5,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.333},shape:{radiusSize:u.RadiusSizes.small,borderWidth:u.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:u.RadiusSizes.medium,borderWidth:u.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:u.RadiusSizes.small,borderWidth:u.BorderWidths.thick},behavior:{transitionSpeed:u.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:u.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:u.RadiusSizes.xxlarge,borderWidth:u.BorderWidths.thin},behavior:{transitionSpeed:u.TransitionSpeeds.slow,animationEasing:u.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0b0b0b",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:u.RadiusSizes.none,borderWidth:u.BorderWidths.thick},behavior:{transitionSpeed:u.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.414,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:u.RadiusSizes.large,borderWidth:u.BorderWidths.medium},behavior:{transitionSpeed:u.TransitionSpeeds.normal,animationEasing:u.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c",primary:"#0a4ca4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:u.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:u.RadiusSizes.large,borderWidth:u.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:u.TransitionSpeeds.fast,animationEasing:u.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:u.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:1440,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:u.RadiusSizes.medium,borderWidth:u.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:u.TransitionSpeeds.normal,animationEasing:u.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#06c167"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:u.RadiusSizes.small,borderWidth:u.BorderWidths.medium},behavior:{transitionSpeed:u.TransitionSpeeds.fast,animationEasing:u.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:u.TouchTargetSizes.comfortable,focusStyle:u.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:1280,sectionSpacing:2.5},shape:{radiusSize:u.RadiusSizes.medium,borderWidth:u.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:u.TransitionSpeeds.fast,animationEasing:u.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:u.TouchTargetSizes.standard,focusStyle:u.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:u.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:680,sectionSpacing:1.5},shape:{radiusSize:u.RadiusSizes.medium,borderWidth:u.BorderWidths.thin},behavior:{transitionSpeed:u.TransitionSpeeds.fast,animationEasing:u.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:u.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerMaxWidth:1600,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:u.RadiusSizes.small,borderWidth:u.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:u.TransitionSpeeds.fast,animationEasing:u.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};I.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!0,backgroundMesh:4},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:u.FontWeights.light,fontWeightNormal:u.FontWeights.normal,fontWeightMedium:u.FontWeights.medium,fontWeightSemibold:u.FontWeights.semibold,fontWeightBold:u.FontWeights.bold,lineHeightTight:u.LineHeights.tight,lineHeightNormal:u.LineHeights.normal,lineHeightRelaxed:u.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerMaxWidth:1200,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:u.RadiusSizes.large,borderWidth:u.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:u.TransitionSpeeds.normal,animationEasing:u.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:u.TouchTargetSizes.standard,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:u.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:u.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:u.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"public/assets/pds/icons/pds-icons.svg"},gap:4,debug:!1};function ie(n="log",t,...e){if(this?.debug||this?.design?.debug||!1||n==="error"||n==="warn"){let r=console[n]||console.log;e.length>0?r(t,...e):r(t)}}_();Y();var M=class n{static#d;static get instance(){return this.#d}#e;#a;constructor(t={}){this.options={debug:!1,...t},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),n.#d=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#fe(),typeof CSSStyleSheet<"u"?this.#we():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let t=this.options.design||{};return{colors:this.#v(t.colors||{}),spacing:this.generateSpacingTokens(t.spatialRhythm||{}),radius:this.#T(t.shape||{}),borderWidths:this.#L(t.shape||{}),typography:this.generateTypographyTokens(t.typography||{}),shadows:this.#R(t.layers||{}),layout:this.#A(t.layout||{}),transitions:this.#W(t.behavior||{}),zIndex:this.#B(t.layers||{}),icons:this.#j(t.icons||{})}}#v(t){let{primary:e="#3b82f6",secondary:a="#64748b",accent:r="#ec4899",background:o="#ffffff",success:i=null,warning:c="#FFBF00",danger:l=null,info:d=null,darkMode:s={}}=t,p={primary:this.#r(e),secondary:this.#r(a),accent:this.#r(r),success:this.#r(i||this.#x(e)),warning:this.#r(c||r),danger:this.#r(l||this.#w(e)),info:this.#r(d||e),gray:this.#p(a),surface:this.#u(o)};return p.surface.fieldset=this.#k(p.surface),p.surfaceSmart=this.#b(p.surface),p.dark=this.#$(p,o,s),p.dark&&p.dark.surface&&(p.dark.surfaceSmart=this.#b(p.dark.surface)),p.interactive={light:{fill:this.#f(p.primary,4.5),text:p.primary[600]},dark:{fill:this.#f(p.dark.primary,4.5),text:this.#E(p.dark.primary,p.dark.surface.base,4.5)}},p}#r(t){let e=this.#o(t);return{50:this.#t(e.h,Math.max(e.s-10,10),Math.min(e.l+45,95)),100:this.#t(e.h,Math.max(e.s-5,15),Math.min(e.l+35,90)),200:this.#t(e.h,e.s,Math.min(e.l+25,85)),300:this.#t(e.h,e.s,Math.min(e.l+15,75)),400:this.#t(e.h,e.s,Math.min(e.l+5,65)),500:t,600:this.#t(e.h,e.s,Math.max(e.l-10,25)),700:this.#t(e.h,e.s,Math.max(e.l-20,20)),800:this.#t(e.h,e.s,Math.max(e.l-30,15)),900:this.#t(e.h,e.s,Math.max(e.l-40,10))}}#x(t){let e=this.#o(t);return this.#t(120,Math.max(e.s,60),45)}#w(t){let e=this.#o(t);return this.#t(0,Math.max(e.s,70),50)}#p(t){let e=this.#o(t),a=e.h,r=Math.min(e.s,10);return{50:this.#t(a,r,98),100:this.#t(a,r,95),200:this.#t(a,r,88),300:this.#t(a,r,78),400:this.#t(a,r,60),500:t,600:this.#t(a,Math.min(r+5,15),45),700:this.#t(a,Math.min(r+8,18),35),800:this.#t(a,Math.min(r+10,20),20),900:this.#t(a,Math.min(r+12,22),10)}}#u(t){let e=this.#o(t);return{base:t,subtle:this.#t(e.h,Math.max(e.s,2),Math.max(e.l-2,2)),elevated:this.#t(e.h,Math.max(e.s,3),Math.max(e.l-4,5)),sunken:this.#t(e.h,Math.max(e.s,4),Math.max(e.l-6,8)),overlay:this.#t(e.h,Math.max(e.s,2),Math.min(e.l+2,98)),inverse:this.#g(t),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#k(t){return{base:t.subtle,subtle:t.elevated,elevated:t.sunken,sunken:this.#S(t.sunken,.05),overlay:t.elevated}}#S(t,e=.05){let a=this.#o(t),r=Math.max(a.l-a.l*e,5);return this.#t(a.h,a.s,r)}#g(t){let e=this.#o(t);if(e.l>50){let a=Math.min(e.s+5,25),r=Math.max(12-(e.l-50)*.1,8);return this.#t(e.h,a,r)}else{let a=Math.max(e.s-10,5),r=Math.min(85+(50-e.l)*.3,95);return this.#t(e.h,a,r)}}#$(t,e="#ffffff",a={}){let r=a.background?a.background:this.#g(e),o=this.#u(r),i=a.primary?this.#r(a.primary):this.#n(t.primary);return{surface:{...o,fieldset:this.#F(o)},primary:i,secondary:a.secondary?this.#r(a.secondary):this.#n(t.secondary),accent:a.accent?this.#r(a.accent):this.#n(t.accent),gray:a.secondary?this.#p(a.secondary):t.gray,success:this.#n(t.success),info:this.#n(t.info),warning:this.#n(t.warning),danger:this.#n(t.danger)}}#s(t){let e=String(t||"").replace("#",""),a=e.length===3?e.split("").map(o=>o+o).join(""):e,r=parseInt(a,16);return{r:r>>16&255,g:r>>8&255,b:r&255}}#l(t){let{r:e,g:a,b:r}=this.#s(t),o=[e/255,a/255,r/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*o[0]+.7152*o[1]+.0722*o[2]}#c(t,e){let a=this.#l(t),r=this.#l(e),o=Math.max(a,r),i=Math.min(a,r);return(o+.05)/(i+.05)}#m(t,e=4.5){if(!t)return"#000000";let a="#ffffff",r="#000000",o=this.#c(t,a);if(o>=e)return a;let i=this.#c(t,r);return i>=e||i>o?r:a}#h(t,e=1){let{r:a,g:r,b:o}=this.#s(t);return`rgba(${a}, ${r}, ${o}, ${e})`}#z(t,e,a=.5){let r=this.#s(t),o=this.#s(e),i=Math.round(r.r+(o.r-r.r)*a),c=Math.round(r.g+(o.g-r.g)*a),l=Math.round(r.b+(o.b-r.b)*a);return this.#M(i,c,l)}#M(t,e,a){let r=o=>{let i=Math.max(0,Math.min(255,Math.round(o))).toString(16);return i.length===1?"0"+i:i};return`#${r(t)}${r(e)}${r(a)}`}#F(t){return{base:t.elevated,subtle:t.overlay,elevated:this.#y(t.elevated,.08),sunken:t.elevated,overlay:this.#y(t.overlay,.05)}}#E(t={},e="#000000",a=4.5){let r=["600","700","800","500","400","900","300","200"],o={shade:null,color:null,ratio:0};for(let i of r){let c=t?.[i];if(!c||typeof c!="string")continue;let l=this.#c(c,e);if(l>o.ratio&&(o={shade:i,color:c,ratio:l}),l>=a)return c}return o.color||t?.["600"]||t?.["500"]}#f(t={},e=4.5){let a=["600","700","800","500","400","900"],r={shade:null,color:null,ratio:0};for(let o of a){let i=t?.[o];if(!i||typeof i!="string")continue;let c=this.#c(i,"#ffffff");if(c>r.ratio&&(r={shade:o,color:i,ratio:c}),c>=e)return i}return r.color||t?.["600"]||t?.["500"]}#b(t){let e={};return Object.entries(t).forEach(([a,r])=>{if(!r||typeof r!="string"||!r.startsWith("#"))return;let o=this.#l(r)<.5,i=this.#m(r,4.5),c=this.#m(r,3),l=this.#z(i,r,.4),d=i,s=l,p=o?"#ffffff":"#000000",g=o?.25:.1,h=this.#h(p,g),v=o?"#ffffff":"#000000",x=o?.15:.1,m=this.#h(v,x);e[a]={bg:r,text:i,textSecondary:c,textMuted:l,icon:d,iconSubtle:s,shadow:h,border:m,scheme:o?"dark":"light"}}),e}#y(t,e=.05){let a=this.#o(t),r=Math.min(a.l+(100-a.l)*e,95);return this.#t(a.h,a.s,r)}#n(t){let e={};return Object.entries({50:{source:"900",dimFactor:.8},100:{source:"800",dimFactor:.8},200:{source:"700",dimFactor:.8},300:{source:"600",dimFactor:.8},400:{source:"500",dimFactor:.85},500:{source:"400",dimFactor:.85},600:{source:"300",dimFactor:.85},700:{source:"200",dimFactor:.85},800:{source:"100",dimFactor:.95},900:{source:"50",dimFactor:.95}}).forEach(([r,o])=>{let i=t[o.source];e[r]=this.#C(i,o.dimFactor)}),e}#C(t,e=.8){let a=this.#o(t),r=Math.max(a.s*e,5),o=Math.max(a.l*e,5);return this.#t(a.h,r,o)}generateSpacingTokens(t){let{baseUnit:e=4,scaleRatio:a=1.25,maxSpacingSteps:r=12}=t,o=Number.isFinite(Number(e))?Number(e):4,i=Math.min(Number.isFinite(Number(r))?Number(r):12,12),c={0:"0"};for(let l=1;l<=i;l++)c[l]=`${o*l}px`;return c}#T(t){let{radiusSize:e="medium",customRadius:a=null}=t,r;a!=null?r=a:typeof e=="number"?r=e:typeof e=="string"?r=u.RadiusSizes[e]??u.RadiusSizes.medium:r=u.RadiusSizes.medium;let o=Number.isFinite(Number(r))?Number(r):u.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(o*.25)?Math.round(o*.25):0}px`,sm:`${Number.isFinite(o*.5)?Math.round(o*.5):0}px`,md:`${o}px`,lg:`${Number.isFinite(o*1.5)?Math.round(o*1.5):0}px`,xl:`${Number.isFinite(o*2)?Math.round(o*2):0}px`,full:"9999px"}}#L(t){let{borderWidth:e="medium"}=t,a;return typeof e=="number"?a=e:typeof e=="string"?a=u.BorderWidths[e]??u.BorderWidths.medium:a=u.BorderWidths.medium,{hairline:`${u.BorderWidths.hairline}px`,thin:`${u.BorderWidths.thin}px`,medium:`${u.BorderWidths.medium}px`,thick:`${u.BorderWidths.thick}px`}}generateTypographyTokens(t){let{fontFamilyHeadings:e="system-ui, -apple-system, sans-serif",fontFamilyBody:a="system-ui, -apple-system, sans-serif",fontFamilyMono:r='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:o=16,fontScale:i=1.25,fontWeightLight:c=u.FontWeights.light,fontWeightNormal:l=u.FontWeights.normal,fontWeightMedium:d=u.FontWeights.medium,fontWeightSemibold:s=u.FontWeights.semibold,fontWeightBold:p=u.FontWeights.bold,lineHeightTight:g=u.LineHeights.tight,lineHeightNormal:h=u.LineHeights.normal,lineHeightRelaxed:v=u.LineHeights.relaxed}=t,x=Number.isFinite(Number(o))?Number(o):16,m=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:e,body:a,mono:r},fontSize:{xs:`${Math.round(x/Math.pow(m,2))}px`,sm:`${Math.round(x/m)}px`,base:`${x}px`,lg:`${Math.round(x*m)}px`,xl:`${Math.round(x*Math.pow(m,2))}px`,"2xl":`${Math.round(x*Math.pow(m,3))}px`,"3xl":`${Math.round(x*Math.pow(m,4))}px`,"4xl":`${Math.round(x*Math.pow(m,5))}px`},fontWeight:{light:c?.toString()||"300",normal:l?.toString()||"400",medium:d?.toString()||"500",semibold:s?.toString()||"600",bold:p?.toString()||"700"},lineHeight:{tight:g?.toString()||"1.25",normal:h?.toString()||"1.5",relaxed:v?.toString()||"1.75"}}}#R(t){let{baseShadowOpacity:e=.1,shadowBlurMultiplier:a=1,shadowOffsetMultiplier:r=1}=t,o=`rgba(0, 0, 0, ${e})`,i=`rgba(0, 0, 0, ${e*.5})`;return{sm:`0 ${1*r}px ${2*a}px 0 ${i}`,base:`0 ${1*r}px ${3*a}px 0 ${o}, 0 ${1*r}px ${2*a}px 0 ${i}`,md:`0 ${4*r}px ${6*a}px ${-1*r}px ${o}, 0 ${2*r}px ${4*a}px ${-1*r}px ${i}`,lg:`0 ${10*r}px ${15*a}px ${-3*r}px ${o}, 0 ${4*r}px ${6*a}px ${-2*r}px ${i}`,xl:`0 ${20*r}px ${25*a}px ${-5*r}px ${o}, 0 ${10*r}px ${10*a}px ${-5*r}px ${i}`,inner:`inset 0 ${2*r}px ${4*a}px 0 ${i}`}}#A(t){let{maxWidth:e=1200,containerPadding:a=16,breakpoints:r={sm:640,md:768,lg:1024,xl:1280}}=t;return{maxWidth:`${e}px`,minHeight:"100vh",containerPadding:`${a}px`,breakpoints:{sm:`${r.sm}px`,md:`${r.md}px`,lg:`${r.lg}px`,xl:`${r.xl}px`},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#W(t){let{transitionSpeed:e=u.TransitionSpeeds.normal,animationEasing:a=u.AnimationEasings["ease-out"]}=t,r;return typeof e=="number"?r=e:typeof e=="string"&&u.TransitionSpeeds[e]?r=u.TransitionSpeeds[e]:r=u.TransitionSpeeds.normal,{fast:`${Math.round(r*.6)}ms`,normal:`${r}ms`,slow:`${Math.round(r*1.4)}ms`}}#B(t){let{baseZIndex:e=1e3,zIndexStep:a=10}=t;return{dropdown:e.toString(),sticky:(e+a*2).toString(),fixed:(e+a*3).toString(),modal:(e+a*4).toString(),drawer:(e+a*5).toString(),popover:(e+a*6).toString(),tooltip:(e+a*7).toString(),notification:(e+a*8).toString()}}#j(t){let{set:e="phosphor",weight:a="regular",defaultSize:r=24,sizes:o={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:c="/assets/img/icons/"}=t;return{set:e,weight:a,defaultSize:`${r}px`,sizes:Object.fromEntries(Object.entries(o).map(([l,d])=>[l,`${d}px`])),spritePath:i,externalPath:c}}#D(t){let e=[];e.push(`  /* Colors */
`);let a=(r,o="")=>{Object.entries(r).forEach(([i,c])=>{typeof c=="object"&&c!==null?a(c,`${o}${i}-`):typeof c=="string"&&e.push(`  --color-${o}${i}: ${c};
`)})};return Object.entries(t).forEach(([r,o])=>{r!=="dark"&&r!=="surfaceSmart"&&r!=="interactive"&&typeof o=="object"&&o!==null&&a(o,`${r}-`)}),t.surfaceSmart&&(e.push(`  /* Smart Surface Tokens (context-aware) */
`),Object.entries(t.surfaceSmart).forEach(([r,o])=>{e.push(`  --surface-${r}-bg: ${o.bg};
`),e.push(`  --surface-${r}-text: ${o.text};
`),e.push(`  --surface-${r}-text-secondary: ${o.textSecondary};
`),e.push(`  --surface-${r}-text-muted: ${o.textMuted};
`),e.push(`  --surface-${r}-icon: ${o.icon};
`),e.push(`  --surface-${r}-icon-subtle: ${o.iconSubtle};
`),e.push(`  --surface-${r}-shadow: ${o.shadow};
`),e.push(`  --surface-${r}-border: ${o.border};
`)}),e.push(`
`)),e.push(`  /* Semantic Text Colors */
`),e.push(`  --color-text-primary: var(--color-gray-900);
`),e.push(`  --color-text-secondary: var(--color-gray-600);
`),e.push(`  --color-text-muted: var(--color-gray-600);
`),e.push(`  --color-border: var(--color-gray-300);
`),e.push(`  --color-input-bg: var(--color-surface-base);
`),e.push(`  --color-input-disabled-bg: var(--color-gray-50);
`),e.push(`  --color-input-disabled-text: var(--color-gray-500);
`),e.push(`  --color-code-bg: var(--color-gray-100);
`),t.interactive&&t.interactive.light&&(e.push(`  /* Interactive Colors - optimized for specific use cases */
`),e.push(`  --color-primary-fill: ${t.interactive.light.fill}; /* For button backgrounds with white text */
`),e.push(`  --color-primary-text: ${t.interactive.light.text}; /* For links and outline buttons on light surfaces */
`)),e.push(`  /* Translucent Surface Tokens */
`),e.push(`  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);
`),e.push(`  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
`),e.push(`  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);
`),e.push(`   /* Backdrop tokens - used for modal dialogs, drawers, overlays */

    --backdrop-bg: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 150%;
    --backdrop-brightness: 0.9;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    `),e.push(this.#N(t)),`${e.join("")}
`}#N(t){let e=t.primary?.[500]||"#3b82f6",a=t.secondary?.[500]||"#8b5cf6",r=t.accent?.[500]||"#f59e0b";return`
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${e} 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${a} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${r} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${e} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${a} 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${e} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${a} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${r} 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${e} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${a} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${r} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${e} 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${a} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${e} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${e} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${r} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${a} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${r} 15%, transparent) 0px, transparent 50%);
    `}#P(t){let e=[`  /* Spacing */
`];return Object.entries(t).forEach(([a,r])=>{a!=null&&a!=="NaN"&&r!==void 0&&!r.includes("NaN")&&e.push(`  --spacing-${a}: ${r};
`)}),`${e.join("")}
`}#I(t){let e=[`  /* Border Radius */
`];return Object.entries(t).forEach(([a,r])=>{e.push(`  --radius-${a}: ${r};
`)}),`${e.join("")}
`}#U(t){let e=[`  /* Border Widths */
`];return Object.entries(t).forEach(([a,r])=>{e.push(`  --border-width-${a}: ${r};
`)}),`${e.join("")}
`}#O(t){let e=[`  /* Typography */
`];return Object.entries(t).forEach(([a,r])=>{let o=a.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(r).forEach(([i,c])=>{let l=i.replace(/([A-Z])/g,"-$1").toLowerCase();e.push(`  --font-${o}-${l}: ${c};
`)})}),`${e.join("")}
`}#H(t){let e=[`  /* Shadows */
`];return Object.entries(t).forEach(([a,r])=>{e.push(`  --shadow-${a}: ${r};
`)}),`${e.join("")}
`}#q(t){let e=[`  /* Layout */
`];return Object.entries(t).forEach(([a,r])=>{let o=a.replace(/([A-Z])/g,"-$1").toLowerCase();a!=="breakpoints"&&e.push(`  --layout-${o}: ${r};
`)}),`${e.join("")}
`}#G(t){let e=[`  /* Transitions */
`];return Object.entries(t).forEach(([a,r])=>{e.push(`  --transition-${a}: ${r};
`)}),`${e.join("")}
`}#_(t){let e=[`  /* Z-Index */
`];return Object.entries(t).forEach(([a,r])=>{e.push(`  --z-${a}: ${r};
`)}),`${e.join("")}
`}#V(t){let e=[`  /* Icon System */
`];return e.push(`  --icon-set: ${t.set};
`),e.push(`  --icon-weight: ${t.weight};
`),e.push(`  --icon-size: ${t.defaultSize};
`),Object.entries(t.sizes).forEach(([a,r])=>{e.push(`  --icon-size-${a}: ${r};
`)}),`${e.join("")}
`}#Q(t){if(!t?.dark)return"";let e=[],a=(d,s="")=>{Object.entries(d).forEach(([p,g])=>{typeof g=="object"&&g!==null?a(g,`${s}${p}-`):typeof g=="string"&&e.push(`  --color-${s}${p}: ${g};
`)})};Object.entries(t.dark).forEach(([d,s])=>{d!=="surfaceSmart"&&typeof s=="object"&&s!==null&&a(s,`${d}-`)});let r=[];t.dark.surfaceSmart&&(r.push(`  /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([d,s])=>{r.push(`  --surface-${d}-bg: ${s.bg};
`),r.push(`  --surface-${d}-text: ${s.text};
`),r.push(`  --surface-${d}-text-secondary: ${s.textSecondary};
`),r.push(`  --surface-${d}-text-muted: ${s.textMuted};
`),r.push(`  --surface-${d}-icon: ${s.icon};
`),r.push(`  --surface-${d}-icon-subtle: ${s.iconSubtle};
`),r.push(`  --surface-${d}-shadow: ${s.shadow};
`),r.push(`  --surface-${d}-border: ${s.border};
`)}),r.push(`
`));let o=`  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
`,i=`  /* Backdrop tokens - dark mode */
  --backdrop-bg: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.4)
    );
  --backdrop-blur: 10px;
  --backdrop-saturate: 120%;
  --backdrop-brightness: 0.7;
  --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  --backdrop-opacity: 1;
  
  /* Legacy alias for backwards compatibility */
  --backdrop-background: var(--backdrop-bg);
`,c=this.#Y(t);return`html[data-theme="dark"] {
${[...e,...r,o,i,c].join("")}}
`}#Z(t){if(!t?.dark)return"";let e=[],a=(s,p="")=>{Object.entries(s).forEach(([g,h])=>{typeof h=="object"&&h!==null?a(h,`${p}${g}-`):typeof h=="string"&&e.push(`    --color-${p}${g}: ${h};
`)})};Object.entries(t.dark).forEach(([s,p])=>{s!=="surfaceSmart"&&typeof p=="object"&&p!==null&&a(p,`${s}-`)});let r=[];t.dark.surfaceSmart&&(r.push(`    /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([s,p])=>{r.push(`    --surface-${s}-bg: ${p.bg};
`),r.push(`    --surface-${s}-text: ${p.text};
`),r.push(`    --surface-${s}-text-secondary: ${p.textSecondary};
`),r.push(`    --surface-${s}-text-muted: ${p.textMuted};
`),r.push(`    --surface-${s}-icon: ${p.icon};
`),r.push(`    --surface-${s}-icon-subtle: ${p.iconSubtle};
`),r.push(`    --surface-${s}-shadow: ${p.shadow};
`),r.push(`    --surface-${s}-border: ${p.border};
`)}),r.push(`
`));let o=[];t.interactive&&t.interactive.dark&&(o.push(`    /* Interactive Colors - optimized for specific use cases (dark mode) */
`),o.push(`    --color-primary-fill: ${t.interactive.dark.fill}; /* For button backgrounds with white text */
`),o.push(`    --color-primary-text: ${t.interactive.dark.text}; /* For links and outline buttons on dark surfaces */
`));let i=[`    --color-text-primary: var(--color-gray-100);
`,`    --color-text-secondary: var(--color-gray-300);
`,`    --color-text-muted: var(--color-gray-400);
`,`    --color-border: var(--color-gray-700);
`,`    --color-input-bg: var(--color-gray-800);
`,`    --color-input-disabled-bg: var(--color-gray-900);
`,`    --color-input-disabled-text: var(--color-gray-600);
`,`    --color-code-bg: var(--color-gray-800);
`,...o].join(""),c=`    /* Backdrop tokens - dark mode */
    --backdrop-bg: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.4)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 120%;
    --backdrop-brightness: 0.7;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
`,l=this.#J(t);return`
       html[data-theme="dark"] {
${[...e,...r,i,c,l].join("")}       }
`}#J(t){let e=t.dark||t,a=e.primary?.[400]||"#60a5fa",r=e.secondary?.[400]||"#a78bfa",o=e.accent?.[400]||"#fbbf24";return`    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${a} 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, ${r} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${r} 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, ${o} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, ${r} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${o} 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, ${a} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, ${r} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, ${o} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, ${r} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, ${o} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, ${a} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${a} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, ${o} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, ${r} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, ${o} 10%, transparent) 0px, transparent 50%);
      `}#Y(t){let e=t.dark||t,a=e.primary?.[400]||"#60a5fa",r=e.secondary?.[400]||"#a78bfa",o=e.accent?.[400]||"#fbbf24";return`
  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${a} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${r} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${r} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${o} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${r} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${o} 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${a} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${r} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${o} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${r} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${o} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${a} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${a} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${o} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${r} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${o} 10%, transparent) 0px, transparent 50%);
    `}#K(){return`/* Alert dark mode adjustments */
html[data-theme="dark"] {
  .alert-success { background-color: var(--color-success-50); border-color: var(--color-success-500); color: var(--color-success-900); }
  .alert-info { background-color: var(--color-info-50); border-color: var(--color-info-500); color: var(--color-info-900); }
  .alert-warning { background-color: var(--color-warning-50); border-color: var(--color-warning-500); color: var(--color-warning-900); }
  .alert-danger, .alert-error { background-color: var(--color-danger-50); border-color: var(--color-danger-500); color: var(--color-danger-900); }
  img, video { opacity: 0.8; transition: opacity var(--transition-normal); }
  img:hover, video:hover { opacity: 1; }
}`}#X(){try{let t=this.options?.design?.options?.backgroundMesh;this.options.debug&&this.options.log?.("debug","backgroundMesh check:",t);let e=Number(t);return!Number.isFinite(e)||e===0?"":`/* Optional background mesh applied from config */
body {
  background: var(--background-mesh-0${Math.max(1,Math.min(5,Math.floor(e)))});
  background-attachment: fixed;
}`}catch(t){return this.options.debug&&this.options.log?.("error","Error in generateBodyBackgroundMeshRule:",t),""}}#ee(){try{return this.options?.design?.options?.liquidGlassEffects?`/* Liquid glass utility (opt-in via options.liquidGlassEffects) */
.liquid-glass {
  border-radius: var(--radius-lg);
  /* Subtle translucent fill blended with surface */
  background: color-mix(in oklab, var(--color-surface-subtle) 45%, transparent);

  background-image: linear-gradient(
    135deg,
    rgba(255,255,255,0.35),
    rgba(255,255,255,0.12)
  );
  /* Frosted glass blur + saturation */
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  backdrop-filter: blur(12px) saturate(140%);
  /* Soft inner highlight and outer depth */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -40px 80px rgba(255,255,255,0.12),
    0 10px 30px rgba(0,0,0,0.10);
  /* Glossy border with slight light and dark edges */
  border: 1px solid color-mix(in oklab, var(--color-primary-500) 22%, transparent);
  outline: 1px solid color-mix(in oklab, #ffffff 18%, transparent);
  outline-offset: -1px;
}

html[data-theme="dark"] .liquid-glass {
  background: color-mix(in oklab, var(--color-surface-inverse) 45%, transparent);
  background-image: linear-gradient(
    135deg,
    color-mix(in oklab, var(--color-primary-300) 40%, transparent),
    color-mix(in oklab, var(--color-surface-overlay) 48%, transparent)
  );
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.12),
    inset 0 -40px 80px rgba(0,0,0,0.55),
    0 18px 38px rgba(0,0,0,0.65);
  border: 1px solid color-mix(in oklab, var(--color-primary-300) 26%, transparent);
  outline: 1px solid color-mix(in oklab, #ffffff 16%, transparent);
}

/* Fallback when backdrop-filter isn't supported */
@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  .liquid-glass {
    /* Strengthen fill a bit to compensate for lack of blur */
    background: color-mix(in oklab, var(--color-surface-subtle) 70%, rgba(255,255,255,0.4));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.6),
      0 10px 24px rgba(0,0,0,0.08);
  }

  html[data-theme="dark"] .liquid-glass {
    background: color-mix(in oklab, var(--color-surface-inverse) 70%, transparent);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 18px 32px rgba(0,0,0,0.58);
  }
}
`:""}catch{return""}}#te(){return`/* ============================================================================
   Border Gradient Utilities
   Card outlines with gradient borders and glow effects
   ============================================================================ */


/* Gradient border utility - premium/promo card style */
.border-gradient {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

/* Gradient border variants - different color combinations */
.border-gradient-primary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-300),
      var(--color-primary-600)
    ) border-box;
}

.border-gradient-accent {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-accent-300),
      var(--color-accent-600)
    ) border-box;
}

.border-gradient-secondary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-secondary-300),
      var(--color-secondary-600)
    ) border-box;
}

/* Gradient border with different strengths/thickness */
.border-gradient-soft {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-medium {
  border: 2px solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-strong {
  border: 3px solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

/* Glow effect utility - for callouts and active states */
.border-glow {
  box-shadow: 0 0 12px var(--color-primary-500);
}

.border-glow-sm {
  box-shadow: 0 0 6px var(--color-primary-500);
}

.border-glow-lg {
  box-shadow: 0 0 20px var(--color-primary-500);
}

/* Combined gradient + glow for premium effects */
.border-gradient-glow {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(135deg,
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
  box-shadow: 0 0 12px var(--color-primary-500);
}

/* Semantic glow variants */
.border-glow-primary {
  box-shadow: 0 0 12px var(--color-primary-500);
}

.border-glow-accent {
  box-shadow: 0 0 12px var(--color-accent-500);
}

.border-glow-success {
  box-shadow: 0 0 12px var(--color-success-500);
}

.border-glow-warning {
  box-shadow: 0 0 12px var(--color-warning-500);
}

.border-glow-danger {
  box-shadow: 0 0 12px var(--color-danger-500);
}

`}#re(){let{layout:t={}}=this.options.design,e=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Semantic HTML Elements (low-specificity via :where()) */

:where(blockquote) {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-6) var(--spacing-8);
  border-left: 4px solid var(--color-primary-500);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-none);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  
  :where(p):last-child {
    margin-bottom: 0;
  }
  
  :where(cite) {
    display: block;
    margin-top: var(--spacing-4);
    font-size: var(--font-size-base);
    font-style: normal;
    color: var(--color-primary-500);
  }
}

:where(hr) {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
  height: 0;
}

/* Labeled horizontal rule: <hr data-content="OR"> */
:where(hr[data-content]) {
  position: relative;
  border: none;
  text-align: center;
  height: auto;
  overflow: visible;
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-border), transparent);
  }
  
  &::after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    padding: 0 var(--spacing-3);
    background-color: var(--color-surface-base);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    line-height: var(--font-line-height-normal);
  }
}

:where(dl) {
  margin: 0 0 var(--spacing-4) 0;
}

:where(dt) {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
  
  &:first-child {
    margin-top: 0;
  }
}

:where(dd) {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

:where(nav), :where(header), :where(footer) {
  display: block;
}

:where(header), :where(footer) {
  width: 100%;
}

/* Headings within header elements have tight spacing for intro content */
:where(header) > :where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
}

:where(article), :where(section), :where(aside) {
  display: block;
  margin-bottom: var(--spacing-6);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

:where(mark) {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

:where(kbd) {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 0 0 var(--color-border);
}

:where(abbr[title]) {
  text-decoration: underline dotted;
  cursor: help;
  text-decoration-thickness: 1px;
}

:where(time) {
  font-variant-numeric: tabular-nums;
}

:where(address) {
  font-style: normal;
  line-height: var(--font-line-height-relaxed);
  margin: 0 0 var(--spacing-4) 0;
}

:where(details):not(.accordion *) {
  margin: 0 0 var(--spacing-2) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] :where(summary) {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-subtle);
    
    &::after {
      transform: rotate(270deg);
    }
  }
  
  & > *:not(:where(summary)) {
    padding: var(--spacing-4);
  }
}

:where(summary) {
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-fast);
  
  &::-webkit-details-marker {
    display: none;
  }
  
  &::after {
    content: "\u203A";
    display: inline-block;
    transform: rotate(90deg);
    transition: transform var(--transition-fast);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-secondary);
  }
  
  &:hover {
    background-color: var(--color-surface-subtle);
  }
}

/* Dialog styles moved to #generateDialogStyles() */

`}#ae(){let{gap:t,inputPadding:e,buttonPadding:a,focusRingWidth:r,focusRingOpacity:o,borderWidthThin:i,sectionSpacing:c,buttonMinHeight:l,inputMinHeight:d}=this.options.design,s=e||.75,p=a||1,g=r||3,h=i||1,v=t||1,x=c||2,m=l||44;return`/* Mobile-First Form Styles - Generated from Design Config */
form {
  margin: 0;
  width: 100%;
}

fieldset {
  margin: 0;  
  width: 100%;
  
  /* Unified styling for radio groups and checkbox groups */
  &[role="radiogroup"],
  &[role="group"] {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: 0;
    background-color: transparent;
    
    label {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-1) 0;
      cursor: pointer;
      min-height: auto;
      border: none;
      background: none;
      font-weight: var(--font-weight-normal);
      margin-bottom: 0;
      
      &:hover {
        color: var(--color-primary-700);
      }
    }

    input[type="checkbox"]{
      border-radius: var(--radius-xs);
    }
    
    input[type="radio"],
    input[type="checkbox"] {
      position: static;
      opacity: 1;
      width: var(--spacing-5);
      height: var(--spacing-5);
      min-height: var(--spacing-5);
      padding: var(--spacing-2);
      margin: 0;
      cursor: pointer;
      flex-shrink: 0;
      accent-color: var(--color-primary-600);

      &:focus-visible {
        outline: none;

        box-shadow:
          0 0 0 2px var(--color-primary-500),
          0 0 0 4px color-mix(in srgb,
            var(--color-primary-500) 40%,
            transparent
          );
      }

      &:checked {
        background-color: var(--color-primary-600);
      }
      
    }
  }
  
}



/* Nested legend scaling: reduce font-size for deeper sub-forms */
fieldset > legend { font-size: var(--font-size-lg); }
fieldset fieldset > legend { font-size: var(--font-size-base); }
fieldset fieldset fieldset > legend { font-size: var(--font-size-sm); }

.form-container {
  display: grid;
  gap: var(--spacing-6);
  width: 100%;
}

.fields {
  display: grid;
  gap: var(--spacing-4);
}

label {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  line-height: var(--font-line-height-normal);
}

[data-label] {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-2);
}

[data-open]{
  [data-label]{
    margin-bottom: 0;
  }
}

.field-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-1);
  line-height: var(--font-line-height-relaxed);
}

input, textarea, select {
  &:focus {
    outline: none;
  }
}

input, textarea, select {
  width: 100%;
  min-height: ${d||40}px;
  padding: calc(var(--spacing-1) * ${s}) var(--spacing-4);
  border: ${h}px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-line-height-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  
  &:focus {
    border-color: var(--color-primary-500);
    background-color: var(--color-surface-base);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &:invalid {
    border-color: var(--color-danger-500);
    
    &:focus {
      box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-danger-500) ${Math.round((o||.3)*100)}%, transparent);
    }
  }
}

input[type="range"] {
  padding: 0;
  background: transparent;
  min-height: auto;
}

/* Make range visually match other inputs */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: var(--input-min-height, 40px); /* align control height with inputs */
  width: 100%;
}

/* Track and thumb styling - using CSS nesting to reduce repetition */
input[type="range"] {
  /* WebKit track */
  &::-webkit-slider-runnable-track {
    height: var(--range-track-height, 8px);
    background: var(--color-input-bg);
    border-radius: var(--radius-full);
  }

  /* WebKit thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--range-thumb-size, 28px);
    height: var(--range-thumb-size, 28px);
    margin-top: calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2);
    background: color-mix(in srgb, var(--color-primary-500) 15%, var(--color-surface-base));
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    cursor: grab;
    border: 1px solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
  }

  /* Mozilla track */
  &::-moz-range-track {
    height: var(--range-track-height, 8px);
    background: var(--color-input-bg);
    border-radius: var(--radius-full);
  }

  /* Mozilla thumb */
  &::-moz-range-thumb {
    width: var(--range-thumb-size, 28px);
    height: var(--range-thumb-size, 28px);
    background: color-mix(in srgb, var(--color-primary-500) 15%, var(--color-surface-base));
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    border: 1px solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
    transform: translateY(calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2));
  }

  /* Hover and focus states for WebKit */
  &:hover::-webkit-slider-thumb,
  &:focus-visible::-webkit-slider-thumb {
    cursor: grabbing;
    background: var(--color-primary-500);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: var(--color-primary-600);
  }

  /* Active state for WebKit */
  &:active::-webkit-slider-thumb {
    background: var(--color-primary-600);
  }

  /* Hover and focus states for Mozilla */
  &:hover::-moz-range-thumb,
  &:focus-visible::-moz-range-thumb {
    background: var(--color-primary-500);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: var(--color-primary-600);
    cursor: grabbing;
  }

  /* Active state for Mozilla */
  &:active::-moz-range-thumb {
    background: var(--color-primary-600);
  }
}

/* Focus style for container to match input focus */
.range-container:focus-within {
  border-color: var(--color-primary-500);  
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
}

input[type="range"]:active::-moz-range-thumb {
  background: var(--color-primary-600);
}

input[type="color"] {
  -webkit-appearance: none;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem; /* your radius */
  overflow: hidden; /* important */
  cursor: pointer;

  /* The wrapper */
  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: inherit;
  }

  /* The swatch (the actual color box) */
  &::-webkit-color-swatch {
    border: none;
    border-radius: inherit;
  }
}

/* Button-style checkbox inputs outside of fieldsets */
.checkbox-container input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
}

label:has(input[type="checkbox"]):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"] + label:not(fieldset label):not(label[data-toggle]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: calc(${m}px * 0.75);
  padding: calc(var(--spacing-1) * ${p*.6}) calc(var(--spacing-4) * 0.85);
  border: ${h}px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.2;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: transparent;
  color: var(--color-text-primary);
  margin: 0;
  flex: 0 1 auto;
  white-space: nowrap;
  
  &:hover {
    background-color: var(--color-surface-subtle);
    border-color: var(--color-primary-500);
  }
}

label:has(input[type="checkbox"]:checked):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:checked + label:not(fieldset label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
  color: var(--color-primary-700);
  border-color: var(--color-primary-500);
  border-width: 2px;
  font-weight: var(--font-weight-semibold);
  
  &:hover {
    background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
    border-color: var(--color-primary-600);
  }
}

label:has(input[type="checkbox"]:focus):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:focus + label:not(fieldset label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-primary-500) ${Math.round((o||.3)*100)}%, transparent);
}

label:has(input[type="checkbox"]:disabled):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:disabled + label:not(fieldset label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

label:has(input[type="checkbox"]:checked:disabled):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:checked:disabled + label:not(fieldset label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
}

/* Keep default checkbox/radio for inputs NOT in special containers */
input[type="checkbox"]:not(fieldset input[type="checkbox"]):not(.checkbox-container input[type="checkbox"]),
input[type="radio"]:not(fieldset input[type="radio"]) {
  width: var(--spacing-5);
  height: var(--spacing-5);
  min-height: var(--spacing-5);
  margin-right: var(--spacing-2);
  cursor: pointer;
  position: static;
  opacity: 1;
  appearance: auto;
  -webkit-appearance: auto;

  &:disabled {
    cursor: not-allowed;
  }
}

/* Button-style radio and checkbox groups with .buttons class */
fieldset[role="radiogroup"].buttons,
fieldset[role="group"].buttons {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  
  input[type="radio"],
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }
  
  label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: calc(${m}px * 0.75);
    padding: calc(var(--spacing-1) * ${p*.6}) calc(var(--spacing-4) * 0.85);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: 1.2;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    touch-action: manipulation;
    user-select: none;
    background-color: transparent;
    color: var(--color-text-primary);
    margin: 0;
    flex: 0 1 auto;
    white-space: nowrap;
    
    &:hover {
      background-color: var(--color-surface-subtle);
      border-color: var(--color-primary-500);
      color: var(--color-text-primary);
    }

    &:has([disabled]){
      pointer-events: none;
    }
  }
  
  label:has(input[type="radio"]:checked),
  label:has(input[type="checkbox"]:checked) {
    background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
    border-color: var(--color-primary-500);
    border-width: 2px;
    font-weight: var(--font-weight-semibold);
    
    &:hover {
      background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
      border-color: var(--color-primary-600);
    }
  }
  
  label:has(input[type="radio"]:focus),
  label:has(input[type="checkbox"]:focus) {
    outline: none;
    box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-primary-500) ${Math.round((o||.3)*100)}%, transparent);
  }
  
  label:has(input[type="radio"]:disabled),
  label:has(input[type="checkbox"]:disabled) {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  label:has(input[type="radio"]:checked:disabled),
  label:has(input[type="checkbox"]:checked:disabled) {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
  }
}

/* Toggle switches - enhanced checkboxes with data-toggle attribute */
label[data-toggle] {
  display: inline-flex;
  align-items: normal;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  padding: 0;
  background: transparent;
  border: none;
  min-height: auto;
  font-weight: var(--font-weight-normal);

  /* Hide the original checkbox in toggle switches */
  input[type="checkbox"] {
    display: none;
  }

  /* Toggle switch container */
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    background-color: var(--color-gray-300);
    border-radius: var(--radius-full);
    transition: background-color 200ms ease;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* Toggle switch knob */
  .toggle-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 50%;
    transition: left 200ms ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  /* Icons in toggle knob (opt-in via .with-icons class) */
  &.with-icons .toggle-knob::before {
    content: "\u2715";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: var(--color-gray-600);
    transition: opacity 200ms ease;
  }

  &.with-icons:has(input[type="checkbox"]:checked) .toggle-knob::before {
    content: "\u2713";
    color: var(--color-primary-600);
  }

  /* Toggle switch when checked - using :has() selector */
  &:has(input[type="checkbox"]:checked) .toggle-switch {
    background-color: var(--color-primary-fill);
  }
  

  /* Toggle knob when checked - always moves to the right */
  &:has(input[type="checkbox"]:checked) .toggle-knob {
    left: 22px;
  }

  /* Focus state for toggle switch */
  &:has(input[type="checkbox"]:focus) .toggle-switch {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Focus visible state when label is focused via keyboard */
  &:focus-visible .toggle-switch {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Remove default outline on label itself */
  &:focus {
    outline: none;
  }

  /* Disabled state */
  &:has(input[type="checkbox"]:disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    .toggle-switch {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

input[type="file"] {
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
}

/* Textareas */
textarea {
  min-height: calc(var(--spacing-4) * 5);
  padding: var(--spacing-3) var(--spacing-4);
  resize: vertical;
  line-height: var(--font-line-height-relaxed);
}

/* Select dropdowns */
select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right var(--spacing-2) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--spacing-8);
}

/* Button styling */
button, .btn, input[type="submit"], input[type="button"], input[type="reset"] {
  display: inline-flex;
  gap: var(--spacing-1);
  align-items: center;
  justify-content: center;
  min-height: ${m}px;
  padding: calc(var(--spacing-1) * ${p}) var(--spacing-6);
  border: ${h}px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  /* Only apply generic hover to non-variant buttons */
  &:hover:not(.btn-primary):not(.btn-secondary):not(.btn-outline) {
    background-color: var(--color-surface-elevated);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-primary-500) ${Math.round((o||.3)*100)}%, transparent);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-primary {
  background-color: var(--color-primary-fill);
  color: white;
  border-color: var(--color-primary-fill);
  
  &:hover {
    background-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    color: white;
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    color: white;
  }
  
  &:focus {
    box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-primary-500) ${Math.round((o||.3)*100)}%, transparent);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-secondary {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  &:hover {
    background-color: var(--color-surface-elevated);
  }
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  
  &:hover {
    background-color: var(--color-primary-500);
    color: var(--color-primary-contrast, #ffffff);
    border-color: var(--color-primary-500);

    pds-icon {
      color: var(--color-primary-contrast, #ffffff);
    }
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-primary-500) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-primary-500) 80%, black 20%);
    color: var(--color-primary-contrast, #ffffff);

    pds-icon {
      color: var(--color-primary-contrast, #ffffff);
    }
  }
  
  &:disabled {
    background-color: transparent;
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  min-height: calc(${m}px * 0.8);
}

.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  min-height: calc(${m}px * 0.6);
}


.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  min-height: calc(${m}px * 1.2);
}

/* Working/loading state for buttons */
button.btn-working,
a.btn-working {
  cursor: wait;
  pointer-events: none;
  opacity: 0.6;
  
  pds-icon:first-child {
    animation: pds-spin 0.8s linear infinite;
  }
}

@keyframes pds-spin {
  to { transform: rotate(360deg); }
}

/* Skeleton loading animation */
.skeleton {
  background: linear-gradient(
    90deg,
    color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%) 0%,
    color-mix(in oklab, var(--color-surface-base) 85%, var(--color-text-primary) 15%) 50%,
    color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%) 100%
  );
  background-size: 200% 100%;
  animation: pds-skeleton 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
  
  &::before {
    content: '\\00a0';
  }
}

@keyframes pds-skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Form utility classes */
.range-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  background: var(--color-input-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  min-height: var(--input-min-height, 40px);
  position: relative;

  input[type="range"] {
    border: none;
  }
}

.range-bubble {
  position: absolute;
  top: calc(-1 * (var(--range-thumb-size, 28px) + var(--spacing-2)));
  transform: translateX(-50%);
  min-width: calc(var(--range-thumb-size, 28px) * 0.8);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  color: var(--color-text-primary);
  text-align: center;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease, transform 150ms ease;

  &.visible {
    opacity: 1;
  }
}

/* Anchor bubble to the thumb position using left (set by enhancer)
   and center with translateX(-50%). */

/* Array field styling */
.array-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.array-item {
  position: relative;
  padding: var(--spacing-4);
  border: ${h}px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  .array-controls {
    padding-top: var(--spacing-3);
    border-top: ${h}px solid var(--color-border);
    margin-top: var(--spacing-4);
  }
}

.array-controls {
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
  flex-wrap: wrap;

  button {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
    min-height: auto;
  }
}

.range-value {
  min-width: var(--spacing-16);
  text-align: right;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.checkbox-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-2);
  flex-wrap: wrap;

  input[type="checkbox"],
  input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
}

`}#oe(){let{layout:t={}}=this.options.design,e=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Table Styles - Mobile First */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 var(--spacing-6) 0;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-size-sm);
  
  @media (min-width: ${e.sm}px) {
    font-size: var(--font-size-base);
  }
}

.table-responsive {
  @media (max-width: ${e.sm-1}px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 0 var(--spacing-6) 0;
    
    table {
      min-width: 600px;
      margin: 0;
    }
  }
}

thead {
  background-color: var(--color-surface-subtle);
}

th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

tbody {
  tr {
    transition: background-color var(--transition-fast);
    
    &:hover {
      background-color: var(--color-surface-subtle);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
}

.table-striped {
  tbody tr:nth-child(even) {
    background-color: var(--color-surface-subtle);
  }
}

.table-bordered {
  border: 1px solid var(--color-border);
  
  th, td {
    border: 1px solid var(--color-border);
  }
}

.table-compact {
  th, td {
    padding: var(--spacing-2) var(--spacing-3);
  }
}

`}#ne(){return`/* Alert/Notification Styles */

/* Alias: .semantic-message shares alert base styles */
.alert, .semantic-message {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  line-height: var(--font-line-height-relaxed);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}
/* Variants: success/info/warning/danger mapped to tokens */
.alert-success, .semantic-message.success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-600);
  color: var(--color-success-900);
}
.alert-info, .semantic-message.info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-600);
  color: var(--color-info-900);
}
.alert-warning, .semantic-message.warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-600);
  color: var(--color-warning-900);
}
.alert-danger,
.alert-error,
.semantic-message.danger {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-600);
  color: var(--color-danger-900);
}

/* Semantic-message content defaults */
.semantic-message strong { display: block; }
.semantic-message p { margin: 0; font-size: var(--font-size-sm); }

.alert-title {
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-base);
}

.alert-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  pds-icon {
    flex-shrink: 0;
  }
}

.alert-dismissible {
  padding-right: var(--spacing-12);
  position: relative;
}

.alert-close {
  position: absolute;
  top: var(--spacing-3);
  right: var(--spacing-3);
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  padding: var(--spacing-1);
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 1;
  }
}

`}#ie(){return`/* Accordion (details/summary) */

.accordion {
  --_acc-radius: var(--radius-md);
  --_acc-border: 1px solid var(--color-border);
  --_acc-bg: var(--color-surface-base);

  details {
    border: var(--_acc-border);
    border-radius: var(--_acc-radius);
    background: var(--_acc-bg);
    margin: 0 0 var(--spacing-3) 0;

    &[open] {
      & > summary::after {
        transform: rotate(45deg);
      }

      &::details-content {
        block-size: auto;
      }
    }

    /* Modern approach: animate block-size with ::details-content */
    &::details-content {
      block-size: 0;
      overflow: hidden;
      transition: block-size var(--transition-normal) ease, content-visibility var(--transition-normal);
      transition-behavior: allow-discrete;
    }

    /* Content padding (works for both approaches) */
    & > :not(summary) > * {
      padding-inline: var(--spacing-4);
      padding-block: var(--spacing-3);
    }
  }

  summary {
    cursor: pointer;
    padding: var(--spacing-3) var(--spacing-4);
    list-style: none;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    border-radius: var(--radius-sm);
    transition: background-color var(--transition-fast), box-shadow var(--transition-fast);

    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      background-color: var(--color-surface-subtle);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
    }

    /* Chevron indicator */
    &::after {
      content: "";
      margin-inline-start: auto;
      inline-size: 0.7em;
      block-size: 0.7em;
      border-inline-end: 2px solid currentColor;
      border-block-end: 2px solid currentColor;
      transform: rotate(-45deg);
      transition: transform var(--transition-normal);
    }
  }
}

/* Fallback: grid trick for browsers without ::details-content support */
@supports not selector(::details-content) {
  .accordion details {
    & > :not(summary) {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--transition-normal) ease;
      overflow: hidden;

      & > * {
        min-block-size: 0;
      }
    }

    &[open] > :not(summary) {
      grid-template-rows: 1fr;
    }
  }
}
`}#se(){return`/* Badge/Pill Styles */

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
  vertical-align: middle;
  background-color: var(--color-gray-200);
  color: var(--color-gray-800);
}

.badge-primary, .badge-secondary, .badge-success, .badge-info, .badge-warning, .badge-danger { color: white; }
.badge-primary { background-color: var(--color-primary-600); }
.badge-secondary { background-color: var(--color-secondary-600); }
.badge-success { background-color: var(--color-success-600); }
.badge-info { background-color: var(--color-info-600); }
.badge-warning { background-color: var(--color-warning-600); }
.badge-danger { background-color: var(--color-danger-600); }

.badge-outline {
  background-color: transparent;
  border: 1px solid currentColor;
  &.badge-primary { color: var(--color-text-primary); }
  &.badge-secondary { color: var(--color-secondary-600); }
  &.badge-success { color: var(--color-success-600); }
  &.badge-info { color: var(--color-info-600); }
  &.badge-warning { color: var(--color-warning-600); }
  &.badge-danger { color: var(--color-danger-600); }
}

.badge-sm { padding: 2px var(--spacing-1); font-size: 10px; }
.badge-lg { padding: var(--spacing-2) var(--spacing-3); font-size: var(--font-size-sm); }
.pill { padding: var(--spacing-1) var(--spacing-3); border-radius: var(--radius-full); }

`}#ce(){let{layout:t={},behavior:e={}}=this.options.design;return`/* ============================================================================
   Dialog Primitive
   Native <dialog> element with PDS integration
   ============================================================================ */

/* Dialog base styles */
dialog {
  position: fixed;
  inset: 0;
  max-width: min(600px, calc(100vw - var(--spacing-8)));
  max-height: calc(100vh - var(--spacing-8));
  margin: auto;
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  
  /* Surface styling - elevated overlay */
  background-color: var(--surface-overlay-bg);
  color: var(--surface-overlay-text);
  box-shadow: 0 8px 32px var(--surface-overlay-shadow);
  
  /* Smooth transitions */
  opacity: 0;
  scale: 0.95;
  transition: 
    opacity 0.2s ease,
    scale 0.2s ease,
    overlay 0.2s ease allow-discrete,
    display 0.2s ease allow-discrete;
  
  
}

/* Open state */
dialog[open] {
  opacity: 1;
  scale: 1;
}

/* Starting style for smooth open animation */
@starting-style {
  dialog[open] {
    opacity: 0;
    scale: 0.95;
  }
}

/* Backdrop styling */
dialog::backdrop {
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  transition: 
    opacity 0.2s ease,
    overlay 0.2s ease allow-discrete,
    display 0.2s ease allow-discrete;
}

dialog[open]::backdrop {
  opacity: var(--backdrop-opacity, 1);
}

@starting-style {
  dialog[open]::backdrop {
    opacity: 0;
  }
}

/* Dialog - constrain max height to 90vh, support custom maxHeight via CSS variable */
dialog {
  max-height: var(--dialog-max-height, 90vh);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent dialog itself from scrolling - let .dialog-body handle it */
}

/* Form structure - use flexbox instead of contents */
dialog form {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* Allow flex child to shrink */
  margin: 0;
}

/* Dialog fields - to open pds-form subforms */
.dialog-field {
    margin-top: var(--spacing-3);
}

/* Dialog header */
dialog {
  header,
  form > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-4);
    padding: var(--spacing-6);
    border-bottom: 1px solid var(--surface-overlay-border);
    flex-shrink: 0;   

    h2,
    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--surface-overlay-text);
      flex: 1;
    }

    /* Close button in header */
    button[value="cancel"],
    .dialog-close {
      background: none;
      border: none;
      padding: var(--spacing-2);
      border-radius: var(--radius-sm);
      cursor: pointer;
      color: var(--surface-overlay-icon);
      transition: background-color var(--transition-fast);
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: var(--color-surface-subtle);
      }

      &:focus-visible {
        outline: 2px solid var(--color-focus-ring);
        outline-offset: 2px;
      }
    }
  }

  /* Dialog body - scrollable content */
  article,
  form > article,
  .dialog-body {
    flex: 1 1 auto;
    min-height: 0; /* Critical: allow flex child to shrink and scroll */
    padding: var(--spacing-3) var(--spacing-6);
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* Dialog footer - actions */
  footer,
  form > footer {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-3);
    justify-content: flex-end;
    align-items: center;
    padding: var(--spacing-6);
    border-top: 1px solid var(--surface-overlay-border);
    flex-shrink: 0;
  }
}

/* Dialog size modifiers */
dialog.dialog-sm { max-width: min(400px, calc(100vw - var(--spacing-8))); }
dialog.dialog-lg { max-width: min(800px, calc(100vw - var(--spacing-8))); }
dialog.dialog-xl { max-width: min(1200px, calc(100vw - var(--spacing-8))); }
dialog.dialog-full { max-width: calc(100vw - var(--spacing-8)); max-height: calc(100vh - var(--spacing-8)); }

/* Mobile responsiveness - maximize on mobile */
@media (max-width: ${(t.breakpoints||{sm:640,md:768,lg:1024,xl:1280}).sm-1}px) {
  dialog { 
    max-width: 100vw; 
    max-height: 100vh; 
    --dialog-max-height: 100vh; /* Override custom maxHeight on mobile */
    border-radius: 0; 
    top: 50%; 
    transform: translateY(-50%); 
    margin: 0; 
  }
  dialog header, dialog form > header, dialog article, dialog form > article, dialog footer, dialog form > footer { padding: var(--spacing-4); }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  dialog, dialog::backdrop { transition-duration: 0.01s !important; }
}

`}#le(){let{layout:t={}}=this.options.design;return`/* Tab Strip Component */

/* Tab navigation */

pds-tabstrip {
  margin-top: var(--spacing-6);

  & > nav {
    display: flex;
    gap: var(--spacing-1);
    border-bottom: 2px solid var(--color-border);
    margin-bottom: var(--spacing-6);
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }

    /* Tab links */
    & > a {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      padding: var(--spacing-3) var(--spacing-4);
      font-family: var(--font-family-body);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary);
      text-decoration: none;
      white-space: nowrap;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: color var(--transition-fast);
      border-bottom: 2px solid transparent;
      margin-bottom: -2px; /* Overlap the nav border */

      &:hover {
        color: var(--color-text-primary);
        background-color: var(--color-surface-hover);
      }

      &:focus-visible {
        outline: var(--focus-ring-width, 2px) solid var(--color-primary-500);
        outline-offset: -2px;
        border-radius: var(--radius-sm);
        z-index: 1;
      }

      /* Active tab */
      &[aria-current="page"] {
        color: var(--color-primary-600);
        font-weight: var(--font-weight-semibold);
        border-bottom-color: var(--color-primary-600);

        &:hover {
          color: var(--color-primary-700);
          border-bottom-color: var(--color-primary-700);
          background-color: var(--color-primary-50);
        }
      }
    }
  }

  /* Tab panel */
  & > pds-tabpanel {
    display: block;
    margin-top: var(--spacing-4);

    &[data-tabpanel] {
      animation: tabFadeIn var(--transition-normal) ease-out;
      padding: var(--spacing-4) 0;

      &[hidden] {
        display: none;
      }
    }
  }
}

@keyframes tabFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile responsive */
@media (max-width: ${(t.breakpoints||{sm:640,md:768,lg:1024,xl:1280}).sm-1}px) {
  pds-tabstrip > nav { gap: var(--spacing-1); }
  pds-tabstrip > nav > a { padding: var(--spacing-2) var(--spacing-3); font-size: var(--font-size-sm); }
  pds-tabstrip > pds-tabpanel[data-tabpanel] { padding: var(--spacing-3) 0; }
}

`}#de(){return`/* Custom Scrollbars */
::-webkit-scrollbar { width: 12px; height: 12px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--color-secondary-300);
  border-radius: var(--radius-full);
  border: 3px solid transparent;
  background-clip: padding-box;
  transition: background-color var(--transition-fast);
  &:hover { background: var(--color-secondary-400); border: 2px solid transparent; background-clip: padding-box; }
  &:active { background: var(--color-secondary-500); border: 2px solid transparent; background-clip: padding-box; }
  @media (prefers-color-scheme: dark) {
    background: var(--color-secondary-600);
    &:hover { background: var(--color-secondary-500); }
    &:active { background: var(--color-secondary-400); }
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary-300) transparent;
  @media (prefers-color-scheme: dark) { scrollbar-color: var(--color-secondary-600) transparent; }
}
*:hover { scrollbar-color: var(--color-secondary-400) transparent; }
@media (prefers-color-scheme: dark) { *:hover { scrollbar-color: var(--color-secondary-500) transparent; } }

`}#pe(){let{a11y:t={}}=this.options.design,e=t.minTouchTarget||u.TouchTargetSizes.standard;return`/* Icon System */

pds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  vertical-align: middle;
  pointer-events: none;
}

/* Icon size utilities */
.icon-xs, pds-icon[size="xs"] { width: var(--icon-size-xs); height: var(--icon-size-xs); }
.icon-sm, pds-icon[size="sm"] { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon-md, pds-icon[size="md"] { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon-lg, pds-icon[size="lg"] { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon-xl, pds-icon[size="xl"] { width: var(--icon-size-xl); height: var(--icon-size-xl); }
.icon-2xl, pds-icon[size="2xl"] { width: var(--icon-size-2xl); height: var(--icon-size-2xl); }

/* Icon color utilities */
.icon-primary, pds-icon.primary { color: var(--color-primary-600); }
.icon-secondary, pds-icon.secondary { color: var(--color-secondary-600); }
.icon-accent, pds-icon.accent { color: var(--color-accent-600); }
.icon-success, pds-icon.success { color: var(--color-success-600); }
.icon-warning, pds-icon.warning { color: var(--color-warning-600); }
.icon-danger, pds-icon.danger { color: var(--color-danger-600); }
.icon-info, pds-icon.info { color: var(--color-info-600); }
.icon-muted, pds-icon.muted { color: var(--color-text-muted); }
.icon-subtle, pds-icon.subtle { color: var(--color-text-subtle); }

/* Icon with text combinations */
.icon-text { display: inline-flex; align-items: center; gap: var(--spacing-2); }
.icon-text-start { flex-direction: row; }
.icon-text-end { flex-direction: row-reverse; }

/* Button icon utilities */
button, a {
  pds-icon {
    flex-shrink: 0;
  }

  &.icon-only {
    padding: var(--spacing-2);
    min-width: ${e}px;
    width: ${e}px;
    height: ${e}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

/* Icon in inputs */
.input-icon, .input-icon-end {
  position: relative;
  display: flex;
  align-items: center;
  pds-icon { position: absolute; color: var(--color-text-muted); pointer-events: none; width: var(--icon-size-md); height: var(--icon-size-md); }
}
.input-icon {
  pds-icon { left: var(--spacing-3); }
  input { padding-left: calc(var(--icon-size-md) + var(--spacing-6)); width: 100%; }
}
.input-icon-end {
  pds-icon { left: unset; right: var(--spacing-3); }
  input { padding-left: var(--spacing-4); padding-right: calc(var(--icon-size-md) + var(--spacing-6)); width: 100%; }
}

`}#ue(){return`/* Dropdown Component */

/* Basic dropdown host */
nav[data-dropdown] {
  position: relative;
  display: inline-block;
  padding: 0;

  menu {
    position: absolute;
    list-style: none;
    padding: var(--spacing-2);
    margin: 0;
    background: var(--color-surface-overlay);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    top: 100%;
    bottom: auto;
    left: 0;
    right: auto;
    margin-top: var(--spacing-2);
    --dropdown-transition-duration: var(--transition-fast, 160ms);
    min-width: max(100%, var(--dropdown-min-width, 12rem));
    width: max-content;
    opacity: 0;
    scale: 0.95;
    visibility: hidden;
    display: none;
    pointer-events: none;
    transform-origin: top center;
    z-index: var(--z-dropdown, 1050);
    max-height: min(60vh, 24rem);
    overflow-y: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      scale var(--dropdown-transition-duration) ease,
      visibility 0s linear var(--dropdown-transition-duration),
      display 0s linear var(--dropdown-transition-duration);
    transition-behavior: allow-discrete;
  }

  menu[aria-hidden="false"] {
    display: block;
    opacity: 1;
    scale: 1;
    visibility: visible;
    pointer-events: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      scale var(--dropdown-transition-duration) ease,
      visibility 0s linear 0s,
      display 0s linear 0s;
  }

  li {
    padding: var(--spacing-1) 0;

    & + li {
      border-top: 1px solid var(--color-border);
      margin-top: var(--spacing-2);
    }

    &:has(> hr) {
      border-top: none;
      margin-top: 0;
      padding: 0;

      & + li {
        border-top: none;
        margin-top: 0;
      }
    }

    & > hr {
      border: none;
      border-top: 3px solid var(--color-border);
      margin: var(--spacing-2) 0;
    }
  }

  a {
    display: flex;
    color: var(--color-text-primary);
    text-decoration: none;
    align-items: center;
    gap: var(--spacing-2);

    &.danger {
      color: var(--color-danger-600);
    }
  }

  &.align-right,
  &[data-align="right"],
  &[data-align="end"],
  &[data-dropdown-align="right"],
  &[data-dropdown-align="end"] {
    menu {
      left: auto;
      right: 0;
    }
  }

  &[data-mode="up"],
  &[data-dropdown-direction="up"] {
    menu {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: var(--spacing-2);
      transform-origin: bottom center;
    }
  }

  &[data-mode="down"],
  &[data-dropdown-direction="down"] {
    menu {
      top: 100%;
      bottom: auto;
      margin-top: var(--spacing-2);
      margin-bottom: 0;
      transform-origin: top center;
    }
  }

  &[data-mode="auto"] menu {
    top: 100%;
    bottom: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    menu {
      transition-duration: 0.01s !important;
    }
  }
}

@starting-style {
  nav[data-dropdown] menu[aria-hidden="false"] {
    opacity: 0;
    scale: 0.95;
  }
}
`}#ge(){let{layout:t={}}=this.options.design,e=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},a=t.gridSystem||{},r=a.columns||[1,2,3,4,6],o=a.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=[`
/* ============================================================================
   Layout Utilities
   Modern grid and flex system for building responsive layouts
   ============================================================================ */

/* Container */
.container {
  display: block;
  width: 100%;
  max-width: ${t.containerMaxWidth||"1400px"};
  margin: 0 auto;
  padding: ${t.containerPadding||"var(--spacing-6)"};
}

/* Grid System */
.grid {
  display: grid;
  gap: var(--spacing-4);
}

`];for(let c of r)i.push(`.grid-cols-${c} { grid-template-columns: repeat(${c}, 1fr); }
`);i.push(`
/* Auto-fit grids (responsive) */
`);for(let[c,l]of Object.entries(o))i.push(`.grid-auto-${c} { grid-template-columns: repeat(auto-fit, minmax(${l}, 1fr)); }
`);return i.push(`
/* Gap utilities */
.gap-0 { gap: 0; } .gap-xs { gap: var(--spacing-1); } .gap-sm { gap: var(--spacing-2); } .gap-md { gap: var(--spacing-4); } .gap-lg { gap: var(--spacing-6); } .gap-xl { gap: var(--spacing-8); }

`),i.push(`
/* Flexbox System */
.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.grow { flex: 1 1 0%; }

/* Alignment utilities */
.items-start { align-items: flex-start; } .items-center { align-items: center; } .items-end { align-items: flex-end; } .items-stretch { align-items: stretch; } .items-baseline { align-items: baseline; }
.justify-start { justify-content: flex-start; } .justify-center { justify-content: center; } .justify-end { justify-content: flex-end; } .justify-between { justify-content: space-between; } .justify-around { justify-content: space-around; } .justify-evenly { justify-content: space-evenly; }
.text-left { text-align: left; } .text-center { text-align: center; } .text-right { text-align: right; }

/* Text overflow utility */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Required Legend Utility */
:where(.required-legend) {
  display: block;
  margin: var(--spacing-3) 0;
  color: var(--color-text-muted);
}

/* Max-width utilities */
.max-w-sm { max-width: 400px; } .max-w-md { max-width: 600px; } .max-w-lg { max-width: 800px; } .max-w-xl { max-width: 1200px; }

/* Stack utilities - vertical rhythm for stacked elements */
[class^="stack-"], [class*=" stack-"] {
  display: flex;
  flex-direction: column;
}
.stack-xs { gap: var(--spacing-1); }
.stack-sm { gap: var(--spacing-2); }
.stack-md { gap: var(--spacing-4); }
.stack-lg { gap: var(--spacing-6); }
.stack-xl { gap: var(--spacing-8); }

/* Section spacing - for major content blocks */
.section { padding-block: var(--spacing-8); }
.section-lg { padding-block: var(--spacing-12); }

/* Responsive helpers */
@media (max-width: ${e.md-1}px) {
  .mobile-stack { flex-direction: column; }
  .mobile-stack > * { width: 100%; }
}

/* ============================================================================
   Backdrop Utilities
   Reusable backdrop layer for modal components (dialogs, drawers, overlays)
   ============================================================================ */

/* Base backdrop class for modal overlays */
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: var(--z-modal, 1040);

  &.active {
    opacity: var(--backdrop-opacity, 1);
    pointer-events: auto;
  }
}

/* Backdrop variants */
.backdrop-light { --backdrop-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)); --backdrop-brightness: 1.1; }
.backdrop-dark { --backdrop-bg: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); --backdrop-brightness: 0.6; }
.backdrop-blur-sm { --backdrop-blur: 5px; } .backdrop-blur-md { --backdrop-blur: 10px; } .backdrop-blur-lg { --backdrop-blur: 20px; }
`),i.join("")}#me(){return`/* Media Element Utilities */

/* Gallery images */
.img-gallery {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

/* Responsive images with different radius sizes */
.img-rounded-sm { border-radius: var(--radius-sm); } .img-rounded-md { border-radius: var(--radius-md); } .img-rounded-lg { border-radius: var(--radius-lg); } .img-rounded-xl { border-radius: var(--radius-xl); } .img-rounded-full { border-radius: var(--radius-full); }

/* Inline images */
.img-inline {
  display: inline;
  vertical-align: middle;
  border-radius: var(--radius-xs);
  margin: 0 var(--spacing-1);
  max-width: 60px;
  height: auto;
}

/* Video specific utilities */
.video-responsive {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: var(--radius-md);
}

/* Figure utilities */
.figure-responsive {
  width: 100%;
  height: auto;
}

`}#he(){let{layout:t={},a11y:e={}}=this.options.design,a=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},r=e.minTouchTarget||u.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

/* Small devices (${a.sm}px and up) */
@media (min-width: ${a.sm}px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } .sm\\:flex-row { flex-direction: row; } .sm\\:text-sm { font-size: var(--font-size-sm); } .sm\\:p-6 { padding: var(--spacing-6); } .sm\\:gap-6 { gap: var(--spacing-6); } .sm\\:hidden { display: none; } .sm\\:block { display: block; }
}

/* Medium devices (${a.md}px and up) */
@media (min-width: ${a.md}px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); } .md\\:text-lg { font-size: var(--font-size-lg); } .md\\:p-8 { padding: var(--spacing-8); } .md\\:gap-8 { gap: var(--spacing-8); } .md\\:flex-row { flex-direction: row; } .md\\:w-1\\/2 { width: 50%; } .md\\:w-1\\/3 { width: 33.333333%; } .md\\:hidden { display: none; } .md\\:block { display: block; }
}

/* Large devices (${a.lg}px and up) */
@media (min-width: ${a.lg}px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); } .lg\\:text-xl { font-size: var(--font-size-xl); } .lg\\:p-12 { padding: var(--spacing-12); } .lg\\:gap-12 { gap: var(--spacing-12); } .lg\\:w-1\\/4 { width: 25%; } .lg\\:hidden { display: none; } .lg\\:block { display: block; }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Touch devices - larger touch targets for interactive elements */
  button, a, select, textarea,
  input:not([type="radio"]):not([type="checkbox"]) {
    min-height: ${r}px;
    min-width: ${r}px;
  }
  
  /* Radio and checkbox inputs: keep reasonable size but ensure label tap area is large */
  input[type="radio"],
  input[type="checkbox"] {
    /* Keep native size - labels provide the touch target */
    min-height: unset;
    min-width: unset;
  }
  
  /* Ensure labels with radio/checkbox have adequate touch targets */
  /* Exclude button-style fieldsets which already have proper sizing */
  label:has(input[type="radio"]):not(fieldset.buttons label),
  label:has(input[type="checkbox"]):not(fieldset.buttons label),
  fieldset[role="radiogroup"]:not(.buttons) label,
  fieldset[role="group"]:not(.buttons) label {
    min-height: ${r}px;
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2) 0;
  }
  
  /* Disable hover effects
   on touch devices */
  .card {
    &:hover {
      box-shadow: var(--shadow-base);
    }
  }
  
  a {
    &:hover {
      color: var(--color-primary-600);
    }
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --color-primary-600: #0000ff;
    --color-primary-700: #0000cc;
  }
  
  button, input, textarea, select {
    border-width: 2px;
  }
}

/* Print styles */
@media print {
  *, *::before, *::after {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
  }
  
  a, a:visited {
    text-decoration: underline;
  }
  
  button {
    display: none;
  }
  
  .mobile-hidden, .desktop-hidden {
    display: block !important;
  }
}

`}#o(t){let e=parseInt(t.slice(1,3),16)/255,a=parseInt(t.slice(3,5),16)/255,r=parseInt(t.slice(5,7),16)/255,o=Math.max(e,a,r),i=Math.min(e,a,r),c,l,d=(o+i)/2;if(o===i)c=l=0;else{let s=o-i;switch(l=d>.5?s/(2-o-i):s/(o+i),o){case e:c=(a-r)/s+(a<r?6:0);break;case a:c=(r-e)/s+2;break;case r:c=(e-a)/s+4;break}c/=6}return{h:c*360,s:l*100,l:d*100}}#t(t,e,a){t=t/360,e=e/100,a=a/100;let r=(d,s,p)=>(p<0&&(p+=1),p>1&&(p-=1),p<1/6?d+(s-d)*6*p:p<1/2?s:p<2/3?d+(s-d)*(2/3-p)*6:d),o,i,c;if(e===0)o=i=c=a;else{let d=a<.5?a*(1+e):a+e-a*e,s=2*a-d;o=r(s,d,t+1/3),i=r(s,d,t),c=r(s,d,t-1/3)}let l=d=>{let s=Math.round(d*255).toString(16);return s.length===1?"0"+s:s};return`#${l(o)}${l(i)}${l(c)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#fe(){this.#e={tokens:this.#be(),primitives:this.#ye(),components:this.#ve(),utilities:this.#xe()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#be(){let{colors:t,spacing:e,radius:a,borderWidths:r,typography:o,shadows:i,layout:c,transitions:l,zIndex:d,icons:s}=this.tokens,p=[`@layer tokens {
       :root {
          ${this.#D(t)}
          ${this.#P(e)}
          ${this.#I(a)}
          ${this.#U(r)}
          ${this.#O(o)}
          ${this.#H(i)}
          ${this.#q(c)}
          ${this.#G(l)}
          ${this.#_(d)}
          ${this.#V(s)}
       }
       ${this.#Z(t)}
    }`];return p.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),p.push(this.#Q(t)),p.join("")}#ye(){let{advanced:t={},a11y:e={},layout:a={}}=this.options.design,r=t.tabSize||u.TabSizes.standard,o=e.minTouchTarget||u.TouchTargetSizes.standard,i=a.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
  /* Base HTML reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :where(html) {
    interpolate-size: allow-keywords;
    font-family: var(--font-family-body);
    font-size: var(--font-size-base);
    line-height: var(--font-line-height-normal);
    color: var(--color-text-primary);
    background-color: var(--color-surface-base);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    tab-size: ${r};
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  }

  :where(dialog){
    background-color: transparent;
    min-width: 320px;
    border: none;
  }

  :where(body) {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    min-height: 100vh;
    min-height: var(--layout-min-height, 100vh);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  :where(body.drawer-open) {
    /* overflow: hidden; */
    /* scrollbar-gutter: stable; */
  }

  /* Button primitives */
  :where(button) {
    all: unset;
    box-sizing: border-box;
    font: inherit;
    color: var(--color-primary-contrast, white);
    background: var(--color-primary-600);
    padding: var(--spacing-2) var(--spacing-4);
    border: 0;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: opacity var(--transition-fast), background-color var(--transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    min-height: ${o}px;
    touch-action: manipulation;
    user-select: none;
  }

  :where(button):hover:not(:disabled) {
    opacity: 0.9;
    background-color: var(--color-primary-700);
  }

  :where(button):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  :where(button):disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :where(button):active:not(:disabled) {
    transform: scale(0.98);
  }

  /* Input primitives */
  :where(input:not([type="radio"]):not([type="checkbox"]):not([type="range"]):not([type="color"])),
  :where(select),
  :where(textarea) {
    font: inherit;
    color: var(--color-text-primary);
    background: var(--color-input-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-2) var(--spacing-3);
    min-height: 40px;
    width: 100%;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    appearance: none;
  }

  :where(input):focus-visible,
  :where(select):focus-visible,
  :where(textarea):focus-visible {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
  }

  :where(input):disabled,
  :where(select):disabled,
  :where(textarea):disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--color-input-disabled-bg);
  }

  /* Harmonized placeholder styling */
  :where(input)::placeholder,
  :where(textarea)::placeholder,
  :where(pds-richtext)::placeholder {
    color: var(--color-text-muted);
    opacity: 1;
    font-weight: var(--font-weight-normal);
  }

  :where(textarea) {
    min-height: 80px;
    resize: vertical;
  }

  /* Link primitives */
  :where(a) {
    color: var(--color-primary-600);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    transition: opacity var(--transition-fast);
  }

  :where(a):hover {
    opacity: 0.8;
  }

  :where(a):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  /* Form primitives */
  :where(label) {
    display: block;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-2);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
  }

  /* Checkbox enhancement - visually hide native input but keep accessible
     Excludes button-style checkboxes in fieldsets and special containers */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]) input[type="checkbox"]) {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  /* Style label container for checkbox */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"])) {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-left: calc(var(--spacing-5) + var(--spacing-3));
  }

  /* Custom checkbox box using PDS tokens - works with or without span wrapper */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"])::before) {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: var(--spacing-5);
    height: var(--spacing-5);
    border: var(--border-width-md) solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface-base);
    transition: all var(--transition-fast);
    flex-shrink: 0;
  }

  /* Checkmark */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked)::after) {
    content: "";
    position: absolute;
    left: var(--spacing-2);
    top: 50%;
    transform: translateY(-60%) rotate(45deg);
    width: var(--spacing-1-5);
    height: var(--spacing-3);
    border: solid var(--color-primary-contrast, white);
    border-width: 0 2px 2px 0;
  }

  /* Checked state */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked)::before) {
    background: var(--color-primary-600);
    border-color: var(--color-primary-600);
  }

  /* Focus styles for accessibility */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:focus)::before) {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Hover effects */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:not(:disabled)):hover::before) {
    border-color: var(--color-primary-600);
    background: var(--color-surface-subtle);
  }

  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked:not(:disabled)):hover::before) {
    background: var(--color-primary-700);
    border-color: var(--color-primary-700);
  }

  /* Disabled state */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :where(fieldset) {
    border: none;
  }

  :where(legend) {
    display: block;
    font-weight: var(--font-weight-semibold);
    padding: 0;
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-3) 0;
    border: none;
    line-height: var(--font-line-height-tight);
    font-size: var(--font-size-lg);
    background: transparent; /* avoid browser default notch behavior */
    width: auto;
    box-sizing: border-box;
  }

  
  /* List primitives */
  :where(ul, ol) {
    padding-left: var(--spacing-6);
    margin: var(--spacing-3) 0;
  }

  :where(li) {
    margin: var(--spacing-1) 0;
  }

  /* Typography primitives */
  :where(h1, h2, h3, h4, h5, h6) {
    font-family: var(--font-family-headings);
    font-weight: var(--font-weight-bold);
    line-height: var(--font-line-height-tight);
    margin: var(--spacing-4) 0 var(--spacing-3) 0;
    color: var(--color-text-primary);
    word-wrap: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
  }

  /* Mobile-first heading sizes */
  :where(h1) { font-size: var(--font-size-2xl); }
  :where(h2) { font-size: var(--font-size-xl); }
  :where(h3) { font-size: var(--font-size-lg); }
  :where(h4) { font-size: var(--font-size-base); }
  :where(h5) { font-size: var(--font-size-sm); }
  :where(h6) { font-size: var(--font-size-xs); }

  /* Scale up on larger screens */
  @media (min-width: ${i.sm}px) {
    :where(h1) { font-size: var(--font-size-3xl); }
    :where(h2) { font-size: var(--font-size-2xl); }
    :where(h3) { font-size: var(--font-size-xl); }
    :where(h4) { font-size: var(--font-size-lg); }
    :where(h5) { font-size: var(--font-size-base); }
    :where(h6) { font-size: var(--font-size-sm); }
  }

  :where(p) {
    margin: var(--spacing-3) 0;
    line-height: var(--font-line-height-relaxed);
    color: var(--color-text-primary);
  }

  /* Code primitives */
  :where(code) {
    font-family: var(--font-family-mono, monospace);
    font-size: 0.9em;
    background: var(--color-surface-muted);
    padding: 0.2em 0.4em;
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
  }

  :where(pre) {
    font-family: var(--font-family-mono, monospace);
    background: var(--color-surface-muted);
    padding: var(--spacing-4);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: var(--spacing-4) 0;
  }

  :where(pre code) {
    background: none;
    padding: 0;
  }

  /* Media primitives */
  :where(img, video) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }

  :where(figure) {
    margin: 0 0 var(--spacing-6) 0;
  }

  :where(figcaption) {
    margin-top: var(--spacing-3);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--font-line-height-relaxed);
  }

  
  :where([hidden]) {
    display: none !important;
  }
}

`}#ve(){return`@layer components {

${this.#re()}

${this.#ae()}

${this.#ne()}

${this.#se()}

${this.#ce()}

${this.#ie()}

${this.#ue()}

${this.#le()}

${this.#oe()}

/* Card component */

.card {
  background: var(--color-surface-base);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}

.card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
}

.card-outlined,
.card-basic {
  background: var(--color-surface-base);
  border: 1px solid var(--color-border);
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

${this.#de()}

${this.#K()}

}
`}#xe(){return`@layer utilities {

${this.#pe()}

${this.#ge()}

/* Optional utilities/features controlled by config options */
/* - Body background mesh rule (applies one of the generated mesh vars) */
/* - Liquid glass utility class */
${this.#X()}
${this.#ee()}

${this.#te()}

/* Surface utilities */

.surface {
  background-color: var(--color-surface-base);
}

.surface-subtle {
  background-color: var(--color-surface-subtle);
}

.surface-elevated {
  background-color: var(--color-surface-elevated);
}

.surface-sunken {
  background-color: var(--color-surface-sunken);
}

.surface-overlay {
  background-color: var(--color-surface-overlay);
}

/* Translucent semantic variants */
.surface-translucent {
  background-color: var(--color-surface-translucent-50);
}

.surface-translucent-25 {
  background-color: var(--color-surface-translucent-25);
}

.surface-translucent-50 {
  background-color: var(--color-surface-translucent-50);
}

.surface-translucent-75 {
  background-color: var(--color-surface-translucent-75);
}

/* Legacy utility retained for backwards compatibility (opinionated overlay) */
.surface-overlay {
  padding: var(--spacing-4);
  background-color: var(--color-surface-overlay);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}


/* 
 * SURFACE-INVERSE: Local Theme Context Flip
 * 
 * We can't simply add .surface-inverse to the dark mode selector because that would
 * also apply the dark color PALETTE (grays, surfaces, etc.), which would override
 * --color-surface-inverse itself. Instead, we duplicate only the SEMANTIC tokens.
 * 
 * Light theme .surface-inverse \u2192 dark semantic tokens
 * Dark theme .surface-inverse  \u2192 light semantic tokens (flip back)
 */

/* Surface-inverse visual properties (shared, uses smart surface tokens) */
.surface-inverse {
  background-color: var(--color-surface-inverse);
  color: var(--surface-inverse-text);

  pds-icon {
    color: var(--surface-inverse-icon);
  }
  
  /* btn-primary stays vibrant in any context */
  & .btn-primary {
    background-color: var(--color-primary-500);
    border-color: var(--color-primary-500);
    color: var(--color-primary-contrast, #ffffff);
    
    &:hover {
      background-color: var(--color-primary-400);
      border-color: var(--color-primary-400);
    }
  }
}

/* Light-mode inverse: apply dark semantic tokens */
html:not([data-theme="dark"]) .surface-inverse {
  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  --color-surface-muted: rgba(255, 255, 255, 0.08);
  
  & button:not(.btn-primary):not(.btn-outline):not(.btn-danger):not(.btn-success):not(.btn-warning),
  & .btn-secondary {
    background-color: rgba(255, 255, 255, 0.12);
    color: var(--surface-inverse-text);
    border-color: rgba(255, 255, 255, 0.25);
    
    &:hover { background-color: rgba(255, 255, 255, 0.2); }
    &:active { background-color: rgba(255, 255, 255, 0.28); }
  }
  
  & select {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--surface-inverse-text);
  }
  
  & a:not([class*="btn"]) {
    color: var(--color-primary-300, #7dd3fc);
  }
}

/* Dark-mode inverse: flip back to light semantic tokens */
html[data-theme="dark"] .surface-inverse {
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);
  --color-surface-muted: var(--color-gray-100);
  
  & button:not(.btn-primary):not(.btn-outline):not(.btn-danger):not(.btn-success):not(.btn-warning),
  & .btn-secondary {
    background-color: rgba(0, 0, 0, 0.06);
    color: var(--surface-inverse-text);
    border-color: rgba(0, 0, 0, 0.15);
    
    &:hover { background-color: rgba(0, 0, 0, 0.1); }
    &:active { background-color: rgba(0, 0, 0, 0.15); }
  }
  
  & select {
    background-color: #ffffff;
    color: var(--surface-inverse-text);
  }
  
  & a:not([class*="btn"]) {
    color: var(--color-primary-600, #0284c7);
  }
}

/* Shadow utilities */
.shadow-sm {
  box-shadow: var(--shadow-sm);
}

.shadow-base, .shadow {
  box-shadow: var(--shadow-base);
}

.shadow-md {
  box-shadow: var(--shadow-md);
}

.shadow-lg {
  box-shadow: var(--shadow-lg);
}

.shadow-xl {
  box-shadow: var(--shadow-xl);
}

.shadow-inner {
  box-shadow: var(--shadow-inner);
}

.shadow-none {
  box-shadow: none;
}

.text-muted {
  color: var(--color-text-muted);
}


${this.#me()}

${this.#he()}

}
`}#we(){this.#a={tokens:new CSSStyleSheet,primitives:new CSSStyleSheet,components:new CSSStyleSheet,utilities:new CSSStyleSheet},this.#ke()}#ke(){this.#a.tokens.replaceSync(this.#e.tokens),this.#a.primitives.replaceSync(this.#e.primitives),this.#a.components.replaceSync(this.#e.components),this.#a.utilities.replaceSync(this.#e.utilities)}get tokensCSS(){return this.#e?.tokens||""}get primitivesCSS(){return this.#e?.primitives||""}get componentsCSS(){return this.#e?.components||""}get utilitiesCSS(){return this.#e?.utilities||""}get layeredCSS(){return this.#e?`${this.#e.tokens}
${this.#e.primitives}
${this.#e.components}
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof z<"u"?z:null,enums:typeof u<"u"?u:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let t=[],e=this.tokens.colors;for(let[a,r]of Object.entries(e))typeof r=="object"&&r!==null&&t.push({name:a,scale:r});return t},getColorScale:t=>this.tokens.colors[t]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([t,e])=>({key:t,value:e})),getTypography:()=>this.tokens.typography,getLayerCSS:t=>{let e=["tokens","primitives","components","utilities"];if(!e.includes(t))throw new Error(`Invalid layer: ${t}. Must be one of ${e.join(", ")}`);return this.#e?.[t]||""},usesEnumValue:(t,e)=>{let a=this.options.design||{};return JSON.stringify(a).includes(e)}}}}get tokensStylesheet(){return this.#a?.tokens}get primitivesStylesheet(){return this.#a?.primitives}get componentsStylesheet(){return this.#a?.components}get utilitiesStylesheet(){return this.#a?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#i("tokens",this.#e.tokens),"pds-primitives.css.js":this.#i("primitives",this.#e.primitives),"pds-components.css.js":this.#i("components",this.#e.components),"pds-utilities.css.js":this.#i("utilities",this.#e.utilities),"pds-styles.css.js":this.#i("styles",this.layeredCSS)}}#i(t,e){let a=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${t}
// Auto-generated - do not edit directly

export const ${t} = new CSSStyleSheet();
${t}.replaceSync(\`${a}\`);

export const ${t}CSS = \`${a}\`;
`}};var K=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(t={}){this._mode="static",this._staticPaths={...this._staticPaths,...t},console.log("[PDS Registry] Switched to STATIC mode",this._staticPaths)}async getStylesheet(t){if(this._mode==="live")return null;try{return(await import(this._staticPaths[t]))[t]}catch(e){console.error(`[PDS Registry] Failed to load static ${t}:`,e),console.error(`[PDS Registry] Looking for: ${this._staticPaths[t]}`),console.error("[PDS Registry] Make sure you've run 'npm run pds:export' and configured PDS.start() with the correct static.root path");let a=new CSSStyleSheet;return a.replaceSync("/* Failed to load "+t+" */"),a}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},X=new K;function Ne(n){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let a=new CSSStyleSheet;a.replaceSync(n),a._pds=!0;let r=(document.adoptedStyleSheets||[]).filter(o=>o._pds!==!0);document.adoptedStyleSheets=[...r,a];return}let t="pds-runtime-stylesheet",e=document.getElementById(t);if(!e){e=document.createElement("style"),e.id=t,e.type="text/css";let a=document.head||document.getElementsByTagName("head")[0];a?a.appendChild(e):document.documentElement.appendChild(e)}e.textContent=n}catch(t){console.warn("installRuntimeStyles failed:",t)}}function V(n){let t=n;if(!t||typeof t!="object"){console.error("[Runtime] applyStyles requires an explicit generator instance in live mode");return}let e=t.layeredCSS||t.css||"";if(!e){t.options?.log?.("warn","[Runtime] No CSS available on generator to apply");return}Ne(e)}async function le(n,t=[],e=null){try{let a=e?.primitivesStylesheet?e.primitivesStylesheet:await X.getStylesheet("primitives");n.adoptedStyleSheets=[a,...t]}catch(a){let r=n.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${r}> failed to adopt primitives:`,a),n.adoptedStyleSheets=t}}async function de(n,t=["primitives"],e=[],a=null){try{let o=(await Promise.all(t.map(async i=>{if(a)switch(i){case"tokens":return a.tokensStylesheet;case"primitives":return a.primitivesStylesheet;case"components":return a.componentsStylesheet;case"utilities":return a.utilitiesStylesheet;default:break}return X.getStylesheet(i)}))).filter(i=>i!==null);n.adoptedStyleSheets=[...o,...e]}catch(r){let o=n.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${o}> failed to adopt layers:`,r),n.adoptedStyleSheets=e}}var Pe=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
      <div class="accordion">
        <details>
          <summary>Section 1</summary>
          <p>Content for section 1</p>
        </details>
        <details>
          <summary>Section 2</summary>
          <p>Content for section 2</p>
        </details>
        <details>
          <summary>Section 3</summary>
          <p>Content for section 3</p>
        </details>
      </div>
    `.trim()},{selector:"nav[data-dropdown]",description:"Enhances a nav element with data-dropdown to function as a dropdown menu.",demoHtml:`
      <nav data-dropdown>
        <button class="btn-primary">Menu</button>
        <menu>
          <li><a href="#">Item 1</a></li>
          <li><a href="#">Item 2</a></li>
        </menu>
      </nav>
    `.trim()},{selector:"label[data-toggle]",description:"Creates a toggle switch element from a checkbox.",demoHtml:`
      <label data-toggle>
        <input type="checkbox">
        <span data-label>Enable notifications</span>
      </label>
    `.trim()},{selector:'input[type="range"]',description:"Enhances range inputs with an attached <output>.",demoHtml:`
      <label class="range-output">
        <span data-label>Volume</span>
        <input type="range" min="0" max="100" value="40">
      </label>
    `.trim()},{selector:"form[data-required]",description:"Enhances required form fields using an asterisk in the label.",demoHtml:`
      <form data-required action="#" method="post">
      <label>
        <span>Field Label</span>
        <input type="text" required>
      </label>
        <nav class="form-actions">
          <button type="submit" class="btn-primary">Submit</button>
        </nav>
      </form>
    `.trim()},{selector:"fieldset[role=group][data-open]",description:"Enhances a checkbox/radio group to be open (have a way to add and remove items).",demoHtml:`
      <fieldset role="group" data-open>
        <label>
          <span data-label>Test</span>
          <input value="lala" name="test1" type="radio" />
        </label>
      </fieldset>
    `.trim()},{selector:"button, a[class*='btn-']",description:"Automatically manages spinner icon for buttons with .btn-working class",demoHtml:`
      <button class="btn-primary btn-working">
        <span>Saving</span>
      </button>
    `.trim()}];function Ie(n){n.dataset.enhancedAccordion||(n.dataset.enhancedAccordion="true",n.addEventListener("toggle",t=>{t.target.open&&t.target.parentElement===n&&n.querySelectorAll(":scope > details[open]").forEach(e=>{e!==t.target&&(e.open=!1)})},!0))}function Ue(n){if(n.dataset.enhancedDropdown)return;n.dataset.enhancedDropdown="true";let t=n.querySelector("menu");if(!t)return;let e=n.querySelector("[data-dropdown-toggle]")||n.querySelector("button");e&&!e.hasAttribute("type")&&e.setAttribute("type","button"),t.id||(t.id=`dropdown-${Math.random().toString(36).slice(2,9)}`),t.setAttribute("role",t.getAttribute("role")||"menu"),t.hasAttribute("aria-hidden")||t.setAttribute("aria-hidden","true"),e&&(e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-controls",t.id),e.setAttribute("aria-expanded","false"));let a=()=>{let c=(n.getAttribute("data-mode")||"auto").toLowerCase();if(c==="up"||c==="down")return c;let l=n.getBoundingClientRect(),d=Math.max(0,window.innerHeight-l.bottom);return Math.max(0,l.top)>d?"up":"down"},r=()=>{n.dataset.dropdownDirection=a(),t.setAttribute("aria-hidden","false"),e?.setAttribute("aria-expanded","true")},o=()=>{t.setAttribute("aria-hidden","true"),e?.setAttribute("aria-expanded","false")},i=()=>{t.getAttribute("aria-hidden")==="false"?o():r()};e?.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),i()}),document.addEventListener("click",c=>{n.contains(c.target)||o()}),n.addEventListener("keydown",c=>{c.key==="Escape"&&(o(),e?.focus())}),n.addEventListener("focusout",c=>{(!c.relatedTarget||!n.contains(c.relatedTarget))&&o()})}function Oe(n){if(n.dataset.enhancedToggle)return;n.dataset.enhancedToggle="true";let t=n.querySelector('input[type="checkbox"]');if(!t)return;n.hasAttribute("tabindex")||n.setAttribute("tabindex","0"),n.setAttribute("role","switch"),n.setAttribute("aria-checked",t.checked?"true":"false");let e=document.createElement("span");e.className="toggle-switch",e.setAttribute("role","presentation"),e.setAttribute("aria-hidden","true");let a=document.createElement("span");a.className="toggle-knob",e.appendChild(a),n.insertBefore(e,t.nextSibling);let r=()=>{n.setAttribute("aria-checked",t.checked?"true":"false")},o=()=>{t.disabled||(t.checked=!t.checked,r(),t.dispatchEvent(new Event("change",{bubbles:!0})))};n.addEventListener("click",i=>{i.preventDefault(),o()}),n.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),o())}),t.addEventListener("change",r)}function He(n){if(n.dataset.enhancedRange)return;let t=n.closest("label"),e=t?.classList.contains("range-output"),a=n.id||`range-${Math.random().toString(36).substring(2,11)}`,r=`${a}-output`;if(n.id=a,e){let o=t.querySelector("span");if(o&&!o.classList.contains("range-output-wrapper")){let i=document.createElement("span");i.className="range-output-wrapper",i.style.display="flex",i.style.justifyContent="space-between",i.style.alignItems="center";let c=document.createElement("span");c.textContent=o.textContent,i.appendChild(c);let l=document.createElement("output");l.id=r,l.setAttribute("for",a),l.style.color="var(--surface-text-secondary, var(--color-text-secondary))",l.style.fontSize="0.875rem",l.textContent=n.value,i.appendChild(l),o.textContent="",o.appendChild(i);let d=()=>{l.textContent=n.value};n.addEventListener("input",d)}}else{let o=n.closest(".range-container");o||(o=document.createElement("div"),o.className="range-container",n.parentNode?.insertBefore(o,n),o.appendChild(n)),o.style.position="relative";let i=document.createElement("output");i.id=r,i.setAttribute("for",a),i.className="range-bubble",i.setAttribute("aria-live","polite"),o.appendChild(i);let c=()=>{let s=parseFloat(n.min)||0,p=parseFloat(n.max)||100,g=parseFloat(n.value),h=(g-s)/(p-s);i.style.left=`calc(${h*100}% )`,i.textContent=String(g)},l=()=>i.classList.add("visible"),d=()=>i.classList.remove("visible");n.addEventListener("input",c),n.addEventListener("pointerdown",l),n.addEventListener("pointerup",d),n.addEventListener("pointerleave",d),n.addEventListener("focus",l),n.addEventListener("blur",d),c()}n.dataset.enhancedRange="1"}function qe(n){if(n.dataset.enhancedRequired)return;n.dataset.enhancedRequired="true";let t=e=>{let a=e.closest("label");if(!a||a.querySelector(".required-asterisk"))return;let r=document.createElement("span");r.classList.add("required-asterisk"),r.textContent="*",r.style.marginLeft="4px",a.querySelector("span").appendChild(r);let o=e.closest("form");if(o&&!o.querySelector(".required-legend")){let i=document.createElement("small");i.classList.add("required-legend"),i.textContent="* Required fields",o.insertBefore(i,o.querySelector(".form-actions")||o.lastElementChild)}};n.querySelectorAll("[required]").forEach(e=>{t(e)})}function Ge(n){if(n.dataset.enhancedOpenGroup)return;n.dataset.enhancedOpenGroup="true",n.classList.add("flex","flex-wrap","buttons");let t=document.createElement("input");t.type="text",t.placeholder="Add item...",t.classList.add("input-text","input-sm"),t.style.width="auto";let e=n.querySelector('input[type="radio"], input[type="checkbox"]');n.appendChild(t),t.addEventListener("keydown",a=>{if(a.key==="Enter"||a.key==="Tab"){let r=t.value.trim();if(r){a.preventDefault();let o=e.type==="radio"?"radio":"checkbox",i=`open-group-${Math.random().toString(36).substring(2,11)}`,c=document.createElement("label"),l=document.createElement("span");l.setAttribute("data-label",""),l.textContent=r;let d=document.createElement("input");d.type=o,d.name=e.name||n.getAttribute("data-name")||"open-group",d.value=r,d.id=i,c.appendChild(l),c.appendChild(d),n.insertBefore(c,t),t.value=""}}else if(a.key==="Backspace"&&t.value===""){a.preventDefault();let r=n.querySelectorAll("label");r.length>0&&r[r.length-1].remove()}})}function _e(n){if(n.dataset.enhancedBtnWorking)return;n.dataset.enhancedBtnWorking="true";let t=null,e=!1;new MutationObserver(r=>{r.forEach(o=>{if(o.attributeName==="class"){let i=n.classList.contains("btn-working"),c=n.querySelector("pds-icon");if(i)if(c)t||(t=c.getAttribute("icon")),c.setAttribute("icon","circle-notch");else{let l=document.createElement("pds-icon");l.setAttribute("icon","circle-notch"),l.setAttribute("size","sm"),n.insertBefore(l,n.firstChild),e=!0}else o.oldValue?.includes("btn-working")&&c&&(e?(c.remove(),e=!1):t&&(c.setAttribute("icon",t),t=null))}})}).observe(n,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var Ve=new Map([[".accordion",Ie],["nav[data-dropdown]",Ue],["label[data-toggle]",Oe],['input[type="range"]',He],["form[data-required]",qe],["fieldset[role=group][data-open]",Ge],["button, a[class*='btn-']",_e]]),pe=Pe.map(n=>({...n,run:Ve.get(n.selector)||(()=>{})}));var ge="pds",Qe=/^([a-z][a-z0-9+\-.]*:)?\/\//i,ue=/^[a-z]:/i;function U(n=""){return n.endsWith("/")?n:`${n}/`}function Ze(n="",t=ge){let e=n.replace(/\/+$/,"");return new RegExp(`(?:^|/)${t}$`,"i").test(e)?e:`${e}/${t}`}function Je(n){return n.replace(/^\.\/+/,"")}function Ye(n){return ue.test(n)?n.replace(ue,"").replace(/^\/+/,""):n}function Ke(n){return n.startsWith("public/")?n.substring(7):n}function me(n,t={}){let e=t.segment||ge,a=t.defaultRoot||`/assets/${e}/`,r=n?.public&&n.public?.root||n?.static&&n.static?.root||null;if(!r||typeof r!="string")return U(a);let o=r.trim();return o?(o=o.replace(/\\/g,"/"),o=Ze(o,e),o=U(o),Qe.test(o)?o:(o=Je(o),o=Ye(o),o.startsWith("/")||(o=Ke(o),o.startsWith("/")||(o=`/${o}`),o=o.replace(/\/+/g,(i,c)=>c===0?i:"/")),U(o))):U(a)}function he(n){let t=n.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(t.toLowerCase()))return!0;let r=document.createElement("canvas").getContext("2d");if(!r)return!1;let o="mmmmmmmmmmlli",i="72px",c="monospace";r.font=`${i} ${c}`;let l=r.measureText(o).width;r.font=`${i} "${t}", ${c}`;let d=r.measureText(o).width;return l!==d}function Xe(n){return n?n.split(",").map(a=>a.trim())[0].replace(/['"]/g,"").trim():null}async function et(n,t={}){if(!n)return Promise.resolve();let{weights:e=[400,500,600,700],italic:a=!1}=t,r=Xe(n);if(!r||he(r))return Promise.resolve();let o=encodeURIComponent(r);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${o}"]`)?(console.log(`Font "${r}" is already loading or loaded`),Promise.resolve()):(console.log(`Loading font "${r}" from Google Fonts...`),new Promise((c,l)=>{let d=document.createElement("link");d.rel="stylesheet";let s=a?`ital,wght@0,${e.join(";0,")};1,${e.join(";1,")}`:`wght@${e.join(";")}`;d.href=`https://fonts.googleapis.com/css2?family=${o}:${s}&display=swap`,d.setAttribute("data-font-loader",r),d.onload=()=>{console.log(`Successfully loaded font "${r}"`),c()},d.onerror=()=>{console.warn(`Failed to load font "${r}" from Google Fonts`),l(new Error(`Failed to load font: ${r}`))},document.head.appendChild(d),setTimeout(()=>{he(r)||console.warn(`Font "${r}" did not load within timeout`),c()},5e3)}))}async function fe(n){if(!n)return Promise.resolve();let t=new Set;n.fontFamilyHeadings&&t.add(n.fontFamilyHeadings),n.fontFamilyBody&&t.add(n.fontFamilyBody),n.fontFamilyMono&&t.add(n.fontFamilyMono);let e=Array.from(t).map(a=>et(a).catch(r=>{console.warn(`Could not load font: ${a}`,r)}));await Promise.all(e)}var rt=/^[a-z][a-z0-9+\-.]*:\/\//i,O=(()=>{try{return import.meta.url}catch{return}})(),Q=n=>typeof n=="string"&&n.length&&!n.endsWith("/")?`${n}/`:n;function Z(n,t={}){if(!n||rt.test(n))return n;let{preferModule:e=!0}=t,a=()=>{if(!O)return null;try{return new URL(n,O).href}catch{return null}},r=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(n,window.location.origin).href}catch{return null}};return(e?a()||r():r()||a())||n}var ve=(()=>{if(O)try{let n=new URL(O);if(/\/public\/assets\/js\//.test(n.pathname))return new URL("../pds/",O).href}catch{return}})(),xe=!1;function we(n){xe||typeof document>"u"||(xe=!0,n.addEventListener("pds:ready",t=>{let e=t.detail?.mode;e&&document.documentElement.classList.add(`pds-${e}`,"pds-ready")}))}function ke(n={},t={}){if(!t||typeof t!="object")return n;let e=Array.isArray(n)?[...n]:{...n};for(let[a,r]of Object.entries(t))r&&typeof r=="object"&&!Array.isArray(r)?e[a]=ke(e[a]&&typeof e[a]=="object"?e[a]:{},r):e[a]=r;return e}function te(n=""){return String(n).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function H(n){if(n==null)return n;if(typeof n=="function")return;if(typeof n!="object")return n;if(Array.isArray(n))return n.map(e=>H(e)).filter(e=>e!==void 0);let t={};for(let e in n)if(n.hasOwnProperty(e)){let a=n[e];if(typeof a!="function"){let r=H(a);r!==void 0&&(t[e]=r)}}return t}function Se(n={},t={},{presets:e,defaultLog:a}){let r=typeof n=="object"&&("colors"in n||"typography"in n||"spatialRhythm"in n||"shape"in n||"behavior"in n||"layout"in n||"advanced"in n||"a11y"in n||"components"in n||"icons"in n),o=n&&n.enhancers;o&&!Array.isArray(o)&&(o=Object.values(o));let i=o??t.enhancers??[],c=n&&n.preset,l=n&&n.design,d="preset"in(n||{})||"design"in(n||{})||"enhancers"in(n||{}),s,p=null;if(d){let g=String(c||"default").toLowerCase(),h=e?.[g]||Object.values(e||{}).find(A=>te(A.name)===g||String(A.name||"").toLowerCase()===g);if(!h)throw new Error(`PDS preset not found: "${c||"default"}"`);p={id:h.id||te(h.name),name:h.name||h.id||String(g)};let v=structuredClone(h);if(l&&typeof l=="object"){let A=H(l);v=ke(v,structuredClone(A))}let{mode:x,autoDefine:m,applyGlobalStyles:w,manageTheme:F,themeStorageKey:k,preloadStyles:T,criticalLayers:R,managerURL:B,manager:j,preset:$,design:S,enhancers:E,log:L,...G}=n;s={...G,design:v,preset:p.name,log:L||a}}else if(r){let{log:g,...h}=n;s={design:structuredClone(h),log:g||a}}else{let g=e?.default||Object.values(e||{}).find(h=>te(h.name)==="default");if(!g)throw new Error("PDS default preset not available");p={id:g.id||"default",name:g.name||"Default"},s={design:structuredClone(g),preset:p.name,log:a}}return{generatorConfig:s,enhancers:i,presetInfo:p}}function $e({manageTheme:n,themeStorageKey:t,applyResolvedTheme:e,setupSystemListenerIfNeeded:a}){let r="light",o=null;if(n&&typeof window<"u"){try{o=localStorage.getItem(t)||null}catch{o=null}try{e?.(o),a?.(o)}catch{}o?o==="system"?r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":r=o:r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:r,storedTheme:o}}function ze(n,{resolvePublicAssetURL:t}){let e=!!(n?.public?.root||n?.static?.root),a=t(n);return!e&&ve&&(a=ve),Q(Z(a))}async function Me(n,{baseEnhancers:t=[]}={}){let{autoDefineBaseURL:e="/auto-define/",autoDefinePreload:a=[],autoDefineMapper:r=null,enhancers:o=[],autoDefineOverrides:i=null,autoDefinePreferModule:c=!0}=n,l=(()=>{let s=new Map;return(t||[]).forEach(p=>s.set(p.selector,p)),(o||[]).forEach(p=>s.set(p.selector,p)),Array.from(s.values())})(),d=null;if(typeof window<"u"&&typeof document<"u"){let s=null;try{let m=await Promise.resolve().then(()=>(ye(),be));s=m?.AutoDefiner||m?.default?.AutoDefiner||m?.default||null}catch(m){console.warn("AutoDefiner not available:",m?.message||m)}let p=m=>{switch(m){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${m}.js`}},{mapper:g,...h}=i&&typeof i=="object"?i:{},x={baseURL:e&&Q(Z(e,{preferModule:c})),predefine:a,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:l,onError:(m,w)=>{if(typeof m=="string"&&m.startsWith("pds-")){let k=["pds-form","pds-drawer"].includes(m),T=w?.message?.includes("#pds/lit")||w?.message?.includes("Failed to resolve module specifier");k&&T?console.error(`\u274C PDS component <${m}> requires Lit but #pds/lit is not in import map.
Add this to your HTML <head>:
<script type="importmap">
  { "imports": { "#pds/lit": "./path/to/lit.js" } }
<\/script>
See: https://github.com/pure-ds/core#lit-components`):console.warn(`\u26A0\uFE0F PDS component <${m}> not found. Assets may not be installed.`)}else console.error(`\u274C Auto-define error for <${m}>:`,w)},...h,mapper:m=>{if(customElements.get(m))return null;if(typeof r=="function")try{let w=r(m);return w===void 0?p(m):w}catch(w){return console.warn("Custom autoDefine.mapper error; falling back to default:",w?.message||w),p(m)}return p(m)}};s&&(d=new s(x),a.length>0&&typeof s.define=="function"&&await s.define(...a,{baseURL:e,mapper:x.mapper,onError:x.onError}))}return{autoDefiner:d,mergedEnhancers:l}}var Te=!1,q=null;async function at(n,{applyResolvedTheme:t,setupSystemListenerIfNeeded:e}){if(Te)return;let[a,r,o,i]=await Promise.all([Promise.resolve().then(()=>(Y(),ce)),Promise.resolve().then(()=>(_(),ne)),Promise.resolve().then(()=>(oe(),ae)),Promise.resolve().then(()=>(Ce(),Ee))]),c=a?.default||a?.ontology,l=a?.findComponentForElement,d=r?.enums;q=o?.PDSQuery||o?.default||null,n.ontology=c,n.findComponentForElement=l,n.enums=d,n.common=i||{},n.presets=I,n.applyStyles=function(s){return V(s||M.instance)},n.adoptLayers=function(s,p,g){return de(s,p,g,M.instance)},n.adoptPrimitives=function(s,p){return le(s,p,M.instance)},n.getGenerator=async function(){return M},n.query=async function(s){if(!q){let g=await Promise.resolve().then(()=>(oe(),ae));q=g?.PDSQuery||g?.default||null}return q?await new q(n).search(s):[]},n._applyResolvedTheme=t,n._setupSystemListenerIfNeeded=e,Object.getOwnPropertyDescriptor(n,"compiled")||Object.defineProperty(n,"compiled",{get(){return n.registry?.isLive&&M.instance?M.instance.compiled:null},enumerable:!0,configurable:!1}),n.setTheme=async function(s,p={}){let{storageKey:g="pure-ds-theme",persist:h=!0}=p;if(!["light","dark","system"].includes(s))throw new Error(`Invalid theme "${s}". Must be "light", "dark", or "system".`);if(typeof window>"u")return s==="system"?"light":s;let v=s;if(s==="system"&&(v=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",v),h&&localStorage.setItem(g,s),n.registry.isLive&&M.instance)try{let x=M.instance;if(x&&x.configure){let m={...x.config,theme:v};x.configure(m),await V(M.instance)}}catch(x){console.warn("Failed to update styles for new theme:",x)}return n.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:v,requested:s,source:"programmatic"}})),v},n.preloadCritical=function(s,p={}){if(typeof window>"u"||!document.head||!s)return;let{theme:g,layers:h=["tokens"]}=p;try{let v=g||"light";(g==="system"||!g)&&(v=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",v);let x=s.design?{...s,theme:v}:{design:s,theme:v},m=new M(x),w=h.map(F=>{try{return m.css?.[F]||""}catch{return""}}).filter(F=>F.trim()).join(`
`);if(w){let F=document.head.querySelector("style[data-pds-preload]");F&&F.remove();let k=document.createElement("style");k.setAttribute("data-pds-preload",""),k.textContent=w,document.head.insertBefore(k,document.head.firstChild)}}catch(v){console.warn("PDS preload failed:",v)}},Te=!0}async function ot(n,t,{emitReady:e,applyResolvedTheme:a,setupSystemListenerIfNeeded:r}){if(!t||typeof t!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");if(await at(n,{applyResolvedTheme:a,setupSystemListenerIfNeeded:r}),we(n),typeof document<"u"&&document.adoptedStyleSheets){let p=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(h=>h._pdsFouc)){let h=new CSSStyleSheet;h.replaceSync(p),h._pdsFouc=!0,document.adoptedStyleSheets=[h,...document.adoptedStyleSheets]}}catch(g){if(console.warn("Constructable stylesheets not supported, using <style> tag fallback:",g),!document.head.querySelector("style[data-pds-fouc]")){let v=document.createElement("style");v.setAttribute("data-pds-fouc",""),v.textContent=p,document.head.insertBefore(v,document.head.firstChild)}}}let o=t.applyGlobalStyles??!0,i=t.manageTheme??!0,c=t.themeStorageKey??"pure-ds-theme",l=t.preloadStyles??!1,d=t.criticalLayers??["tokens","primitives"],s=t&&t.autoDefine||null;try{let{resolvedTheme:p}=$e({manageTheme:i,themeStorageKey:c,applyResolvedTheme:a,setupSystemListenerIfNeeded:r}),g=Se(t,{},{presets:I,defaultLog:ie}),h=g.enhancers,{log:v,...x}=g.generatorConfig,m=structuredClone(x);m.log=v,i&&(m.theme=p);let w=new M(m);if(m.design?.typography)try{await fe(m.design.typography)}catch($){m?.log?.("warn","Failed to load some fonts from Google Fonts:",$)}if(l&&typeof window<"u"&&document.head)try{let $=d.map(S=>{try{return w.css?.[S]||""}catch(E){return m?.log?.("warn",`Failed to generate critical CSS for layer "${S}":`,E),""}}).filter(S=>S.trim()).join(`
`);if($){let S=document.head.querySelector("style[data-pds-critical]");S&&S.remove();let E=document.createElement("style");E.setAttribute("data-pds-critical",""),E.textContent=$;let L=document.head.querySelector('meta[charset], meta[name="viewport"]');L?L.parentNode.insertBefore(E,L.nextSibling):document.head.insertBefore(E,document.head.firstChild)}}catch($){m?.log?.("warn","Failed to preload critical styles:",$)}n.registry.setLiveMode(),g.presetInfo?.name?m?.log?.("log",`PDS live with preset "${g.presetInfo.name}"`):m?.log?.("log","PDS live with custom config"),o&&(await V(M.instance),typeof window<"u"&&setTimeout(()=>{let $=document.head.querySelector("style[data-pds-critical]");$&&$.remove();let S=document.head.querySelector("style[data-pds-preload]");S&&S.remove();let E=document.getElementById("pds-runtime-stylesheet");E&&E.remove()},100));let F=ze(t,{resolvePublicAssetURL:me}),k;s&&s.baseURL?k=Q(Z(s.baseURL,{preferModule:!1})):k=`${F}components/`;let T=null,R=[];try{let $=await Me({autoDefineBaseURL:k,autoDefinePreload:s&&Array.isArray(s.predefine)&&s.predefine||[],autoDefineMapper:s&&typeof s.mapper=="function"&&s.mapper||null,enhancers:h,autoDefineOverrides:s||null,autoDefinePreferModule:!(s&&s.baseURL)},{baseEnhancers:pe});T=$.autoDefiner,R=$.mergedEnhancers||[]}catch($){m?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",$)}let B=w?.options||m,j=H(t);return n.currentConfig=Object.freeze({mode:"live",...structuredClone(j),design:structuredClone(g.generatorConfig.design),preset:g.generatorConfig.preset,theme:p,enhancers:R}),e({mode:"live",generator:w,config:B,theme:p,autoDefiner:T}),{generator:w,config:B,theme:p,autoDefiner:T}}catch(p){throw n.dispatchEvent(new CustomEvent("pds:error",{detail:{error:p}})),p}}export{ot as startLive};
