var ro=Object.defineProperty;var Xe=(e,t)=>()=>(e&&(t=e(e=0)),t);var Qe=(e,t)=>{for(var r in t)ro(e,r,{get:t[r],enumerable:!0})};var zr={};Qe(zr,{enums:()=>$});var $,Ie=Xe(()=>{$={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"},IconSizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64,"3xl":96}}});var Or={};Qe(Or,{default:()=>mo,findComponentForElement:()=>co,getAllSelectors:()=>uo,getAllTags:()=>go,getByCategory:()=>fo,ontology:()=>K,searchOntology:()=>po});function ue(e,t){if(!e||!t)return!1;try{return e.matches(t)}catch{return!1}}function Nr(e,t){if(!e||!t||!e.closest)return null;try{return e.closest(t)}catch{return null}}function co(e,{maxDepth:t=5}={}){if(!e||e.closest&&e.closest(".showcase-toc"))return null;let r=e,n=0;for(;r&&n<t;){if(n++,r.tagName==="DS-SHOWCASE")return null;if(r.classList&&r.classList.contains("showcase-section")){r=r.parentElement;continue}for(let a of PDS.ontology.enhancements){let i=a.selector||a;if(ue(r,i))return{element:r,componentType:"enhanced-component",displayName:a.description||i,id:a.id}}if(r.tagName==="FIELDSET"){let a=r.getAttribute("role");if(a==="group"||a==="radiogroup")return{element:r,componentType:"form-group",displayName:a==="radiogroup"?"radio group":"form group"}}if(r.tagName==="LABEL"&&r.querySelector&&r.querySelector("input,select,textarea"))return{element:r,componentType:"form-control",displayName:"label with input"};let o=r.closest?r.closest("label"):null;if(o&&o.querySelector&&o.querySelector("input,select,textarea"))return{element:o,componentType:"form-control",displayName:"label with input"};for(let a of PDS.ontology.primitives){for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let l=s.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(p=>p.startsWith(l)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let u=r.parentElement,c=0;for(;u&&c<t;){if(u.classList&&Array.from(u.classList).some(p=>p.startsWith(l))&&u.tagName!=="DS-SHOWCASE")return{element:u,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};u=u.parentElement,c++}continue}continue}if(ue(r,s))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let d=Nr(r,s);if(d&&d.tagName!=="DS-SHOWCASE")return{element:d,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.classList){let i=Array.from(r.classList);for(let s of a.selectors||[])if(typeof s=="string"&&s.includes("*")&&s.startsWith(".")){let d=s.slice(1).replace(/\*/g,"");if(i.some(l=>l.startsWith(d)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}}}for(let a of PDS.ontology.layoutPatterns||[])for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let l=s.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(u=>u.startsWith(l)))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}continue}if(ue(r,s))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags};let d=Nr(r,s);if(d&&d.tagName!=="DS-SHOWCASE")return{element:d,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.tagName&&r.tagName.includes("-")){let a=r.tagName.toLowerCase(),i=PDS.ontology.components.find(s=>s.selectors.includes(a));return{element:r,componentType:"web-component",displayName:i?.name||a,id:i?.id||a,tags:i?.tags}}if(r.tagName==="BUTTON"){let a=r.querySelector&&r.querySelector("pds-icon");return{element:r,componentType:"button",displayName:a?"button with icon":"button",id:"button"}}if(ue(r,"pds-icon")||r.closest&&r.closest("pds-icon")){let a=ue(r,"pds-icon")?r:r.closest("pds-icon");return{element:a,componentType:"icon",displayName:`pds-icon (${a.getAttribute&&a.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(ue(r,"nav[data-dropdown]")||r.closest&&r.closest("nav[data-dropdown]"))return{element:ue(r,"nav[data-dropdown]")?r:r.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};r=r.parentElement}return null}function uo(){let e=[];for(let t of PDS.ontology.primitives)e.push(...t.selectors||[]);for(let t of PDS.ontology.components)e.push(...t.selectors||[]);for(let t of PDS.ontology.layoutPatterns||[])e.push(...t.selectors||[]);return Array.from(new Set(e))}function po(e,t={}){let r=e.toLowerCase(),n=[],o=(a,i)=>{for(let s of a)(s.id?.toLowerCase().includes(r)||s.name?.toLowerCase().includes(r)||s.description?.toLowerCase().includes(r)||s.tags?.some(l=>l.toLowerCase().includes(r))||s.category?.toLowerCase().includes(r)||s.selectors?.some(l=>l.toLowerCase().includes(r)))&&n.push({...s,type:i})};return(!t.type||t.type==="primitive")&&o(K.primitives,"primitive"),(!t.type||t.type==="component")&&o(K.components,"component"),(!t.type||t.type==="layout")&&o(K.layoutPatterns,"layout"),(!t.type||t.type==="enhancement")&&o(K.enhancements,"enhancement"),n}function fo(e){let t=e.toLowerCase();return{primitives:K.primitives.filter(r=>r.category===t),components:K.components.filter(r=>r.category===t),layouts:K.layoutPatterns.filter(r=>r.category===t)}}function go(){let e=new Set;return K.primitives.forEach(t=>t.tags?.forEach(r=>e.add(r))),K.components.forEach(t=>t.tags?.forEach(r=>e.add(r))),K.layoutPatterns.forEach(t=>t.tags?.forEach(r=>e.add(r))),K.enhancements.forEach(t=>t.tags?.forEach(r=>e.add(r))),Array.from(e).sort()}var K,mo,Wt=Xe(()=>{K={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"callout",name:"Callout",description:"Contextual information and notification messages",selectors:[".callout",".callout-info",".callout-success",".callout-warning",".callout-danger",".callout-error",".callout-dismissible"],tags:["feedback","message","notification","status","information"],category:"feedback"},{id:"empty-state",name:"Empty State",description:"Empty state layout for missing data or onboarding",selectors:[".empty-state"],tags:["empty","no-data","zero","placeholder","onboarding","state"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-danger",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-fab",name:"FAB",description:"Floating Action Button with expandable satellite actions",selectors:["pds-fab"],tags:["button","action","floating","interactive"],category:"action"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-live-edit",name:"Live Edit",description:"Contextual live editing for PDS design settings",selectors:["pds-live-edit"],tags:["editor","live","config","tooling"],category:"tooling"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element. Use data-dropdown-close on clickable descendants to dismiss on selection.",tags:["menu","interactive","navigation","dismiss","close"]},{id:"dropdown-close",selector:"[data-dropdown-close]",description:"Declarative close marker for nav[data-dropdown] panels; clicking marked targets closes the open dropdown.",tags:["dropdown","menu","dismiss","close","attribute"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"color-input",selector:"label[data-color]",description:"Enhanced color input with swatch shell and hex output",tags:["color","input","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["callout","badge","empty-state"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]},action:{description:"Interactive actions and buttons",primitives:["button"],components:["pds-fab"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],empty:["empty-state","placeholder","zero","no-data","onboarding","callout","card","icon","button"],"empty state":["empty-state","empty","no-data","zero","onboarding"],"no data":["empty-state","empty","zero","placeholder"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-danger","btn-working","pds-fab","floating"],btn:["button","interactive","action","pds-fab"],fab:["pds-fab","floating","button","action","menu"],floating:["fab","pds-fab","button","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],callout:["notification","feedback","message","status","toast","information","alert","warning","error","info","success","danger"],alert:["callout","notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["callout","toast","pds-toaster","feedback","message","popup","alert"],toast:["pds-toaster","notification","callout","feedback","popup","snackbar","alert"],feedback:["callout","notification","toast","status","badge","validation","error","success","alert"],message:["callout","notification","feedback","dialog","toast","alert"],status:["badge","callout","indicator","feedback","state","alert"],error:["callout","danger","validation","feedback","warning","alert"],success:["callout","feedback","badge","status","check","alert"],warning:["callout","caution","feedback","status","alert"],info:["callout","information","feedback","status","alert"],danger:["callout","error","feedback","destructive","delete","alert"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};mo=K});var nn={};Qe(nn,{AutoDefiner:()=>Qt});async function la(...e){let t={};e.length&&typeof e[e.length-1]=="object"&&(t=e.pop()||{});let r=e,{baseURL:n,mapper:o=l=>`${l}.js`,onError:a=(l,u)=>console.error(`[defineWebComponents] ${l}:`,u)}=t,i=n?new URL(n,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),s=l=>l.toLowerCase().replace(/(^|-)([a-z])/g,(u,c,p)=>p.toUpperCase()),d=async l=>{try{if(customElements.get(l))return{tag:l,status:"already-defined"};let u=o(l),p=await import(u instanceof URL?u.href:new URL(u,i).href),m=p?.default??p?.[s(l)];if(!m){if(customElements.get(l))return{tag:l,status:"self-defined"};throw new Error(`No export found for ${l}. Expected default export or named export "${s(l)}".`)}return customElements.get(l)?{tag:l,status:"race-already-defined"}:(customElements.define(l,m),{tag:l,status:"defined"})}catch(u){throw a(l,u),u}};return Promise.all(r.map(d))}var Qt,on=Xe(()=>{Qt=class{constructor(t={}){let{baseURL:r,mapper:n,onError:o,predicate:a=()=>!0,attributeModule:i="data-module",root:s=document,scanExisting:d=!0,debounceMs:l=16,observeShadows:u=!0,enhancers:c=[],patchAttachShadow:p=!0}=t,m=new Set,h=new Set,v=new Set,g=new Map,f=new WeakMap,y=new WeakMap,x=0,b=!1,S=null,C=L=>{if(!L||!c.length)return;let R=y.get(L);R||(R=new Set,y.set(L,R));for(let k of c)if(!(!k.selector||!k.run)&&!R.has(k.selector))try{L.matches&&L.matches(k.selector)&&(k.run(L),R.add(k.selector))}catch(_){console.warn(`[AutoDefiner] Error applying enhancer for selector "${k.selector}":`,_)}},A=(L,R)=>{if(!b&&!(!L||!L.includes("-"))&&!customElements.get(L)&&!h.has(L)&&!v.has(L)){if(R&&R.getAttribute){let k=R.getAttribute(i);k&&!g.has(L)&&g.set(L,k)}m.add(L),T()}},T=()=>{x||(x=setTimeout(j,l))},I=L=>{if(L){if(L.nodeType===1){let R=L,k=R.tagName?.toLowerCase();k&&k.includes("-")&&!customElements.get(k)&&a(k,R)&&A(k,R),C(R),u&&R.shadowRoot&&E(R.shadowRoot)}L.querySelectorAll&&L.querySelectorAll("*").forEach(R=>{let k=R.tagName?.toLowerCase();k&&k.includes("-")&&!customElements.get(k)&&a(k,R)&&A(k,R),C(R),u&&R.shadowRoot&&E(R.shadowRoot)})}},E=L=>{if(!L||f.has(L))return;I(L);let R=new MutationObserver(k=>{for(let _ of k)_.addedNodes?.forEach(O=>{I(O)}),_.type==="attributes"&&_.target&&I(_.target)});R.observe(L,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...c.map(k=>k.selector).filter(k=>k.startsWith("data-"))]}),f.set(L,R)};async function j(){if(clearTimeout(x),x=0,!m.size)return;let L=Array.from(m);m.clear(),L.forEach(R=>h.add(R));try{let R=k=>g.get(k)??(n?n(k):`${k}.js`);await la(...L,{baseURL:r,mapper:R,onError:(k,_)=>{v.add(k),o?.(k,_)}})}catch{}finally{L.forEach(R=>h.delete(R))}}let M=s===document?document.documentElement:s,z=new MutationObserver(L=>{for(let R of L)R.addedNodes?.forEach(k=>{I(k)}),R.type==="attributes"&&R.target&&I(R.target)});if(z.observe(M,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...c.map(L=>L.selector).filter(L=>L.startsWith("data-"))]}),u&&p&&Element.prototype.attachShadow){let L=Element.prototype.attachShadow;Element.prototype.attachShadow=function(k){let _=L.call(this,k);if(k&&k.mode==="open"){E(_);let O=this.tagName?.toLowerCase();O&&O.includes("-")&&!customElements.get(O)&&A(O,this)}return _},S=()=>Element.prototype.attachShadow=L}return d&&I(M),{stop(){b=!0,z.disconnect(),S&&S(),x&&(clearTimeout(x),x=0),f.forEach(L=>L.disconnect())},flush:j}}static async define(...t){let r={};t.length&&typeof t[t.length-1]=="object"&&(r=t.pop()||{});let n=t,{baseURL:o,mapper:a=u=>`${u}.js`,onError:i=(u,c)=>console.error(`[defineWebComponents] ${u}:`,c)}=r,s=o?new URL(o,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),d=u=>u.toLowerCase().replace(/(^|-)([a-z])/g,(c,p,m)=>m.toUpperCase()),l=async u=>{try{if(customElements.get(u))return{tag:u,status:"already-defined"};let c=a(u),m=await import(c instanceof URL?c.href:new URL(c,s).href),h=m?.default??m?.[d(u)];if(!h){if(customElements.get(u))return{tag:u,status:"self-defined"};throw new Error(`No export found for ${u}. Expected default export or named export "${d(u)}".`)}return customElements.get(u)?{tag:u,status:"race-already-defined"}:(customElements.define(u,h),{tag:u,status:"defined"})}catch(c){throw i(u,c),c}};return Promise.all(n.map(l))}}});var ut={};Qe(ut,{deepMerge:()=>ln,enQueue:()=>pa,escapeForRegExp:()=>ma,fragmentFromTemplateLike:()=>sr,humanizeIdentifier:()=>ba,isObject:()=>ct,isUrl:()=>fa,openCenteredWindow:()=>ha,parseFragment:()=>dt,parseHTML:()=>lr,throttle:()=>ua,withTimeout:()=>ga});function ct(e){return e&&typeof e=="object"&&!Array.isArray(e)}function ln(e,t){let r={...e};return ct(e)&&ct(t)&&Object.keys(t).forEach(n=>{ct(t[n])?n in e?r[n]=ln(e[n],t[n]):Object.assign(r,{[n]:t[n]}):Object.assign(r,{[n]:t[n]})}),r}function sr(e){let t=Array.isArray(e?.strings)?e.strings:[],r=Array.isArray(e?.values)?e.values:[],n=new Set,o=[],a=/(\s)(\.[\w-]+)=["']?\s*$/,i=/(\s)(@[\w-]+)=["']?\s*$/,s=/(\s)(\?[\w-]+)=["']?\s*$/,d=/(\s)([\w:-]+)=["']?\s*$/,l=/=["']\s*$/,u=!1;for(let g=0;g<t.length;g+=1){let f=t[g]??"";if(u&&(f=f.replace(/^["']/,""),u=!1),g<r.length){let y=`pds-val-${g}`,x=f.match(a),b=f.match(i),S=f.match(s),C=f.match(d);if(x){let A=x[2].slice(1);u=l.test(t[g]??""),f=f.replace(a,`$1data-pds-bind-${g}="prop:${A}:${y}"`),n.add(g)}else if(b){let A=b[2].slice(1);u=l.test(t[g]??""),f=f.replace(i,`$1data-pds-bind-${g}="event:${A}:${y}"`),n.add(g)}else if(S){let A=S[2].slice(1);u=l.test(t[g]??""),f=f.replace(s,`$1data-pds-bind-${g}="boolean:${A}:${y}"`),n.add(g)}else if(C){let A=C[2];u=l.test(t[g]??""),f=f.replace(d,`$1data-pds-bind-${g}="attr:${A}:${y}"`),n.add(g)}}o.push(f),g<r.length&&!n.has(g)&&o.push(`<!--pds-val-${g}-->`)}let c=document.createElement("template");c.innerHTML=o.join("");let p=(g,f)=>{let y=g.parentNode;if(!y)return;if(f==null){y.removeChild(g);return}let x=b=>{if(b!=null){if(b instanceof Node){y.insertBefore(b,g);return}if(Array.isArray(b)){b.forEach(S=>x(S));return}y.insertBefore(document.createTextNode(String(b)),g)}};x(f),y.removeChild(g)},m=document.createTreeWalker(c.content,NodeFilter.SHOW_COMMENT),h=[];for(;m.nextNode();){let g=m.currentNode;g?.nodeValue?.startsWith("pds-val-")&&h.push(g)}return h.forEach(g=>{let f=Number(g.nodeValue.replace("pds-val-",""));p(g,r[f])}),c.content.querySelectorAll("*").forEach(g=>{[...g.attributes].forEach(f=>{if(!f.name.startsWith("data-pds-bind-"))return;let y=f.value.indexOf(":"),x=f.value.lastIndexOf(":");if(y<=0||x<=y){g.removeAttribute(f.name);return}let b=f.value.slice(0,y),S=f.value.slice(y+1,x),C=f.value.slice(x+1),A=Number(String(C).replace("pds-val-","")),T=r[A];if(!S||!Number.isInteger(A)){g.removeAttribute(f.name);return}b==="prop"?g[S]=T:b==="event"?(typeof T=="function"||T&&typeof T.handleEvent=="function")&&g.addEventListener(S,T):b==="boolean"?T?g.setAttribute(S,""):g.removeAttribute(S):b==="attr"&&(T==null||T===!1?g.removeAttribute(S):g.setAttribute(S,String(T))),g.removeAttribute(f.name)})}),c.content}function dt(e,...t){if(Array.isArray(e)&&Object.prototype.hasOwnProperty.call(e,"raw"))return sr({strings:Array.from(e),values:t});if(Array.isArray(e?.strings)&&Array.isArray(e?.values))return sr({strings:e.strings,values:e.values});let n=document.createElement("template");return n.innerHTML=String(e??""),n.content}function lr(e,...t){return dt(e,...t).childNodes}function ua(e,t=100){let r;return function(...o){let a=()=>{clearTimeout(r),e(...o)};clearTimeout(r),r=setTimeout(a,t)}}function pa(e){setTimeout(e,0)}function fa(e){try{if(typeof e!="string"||e.indexOf(`
`)!==-1||e.indexOf(" ")!==-1||e.startsWith("#/"))return!1;let t=new URL(e,window.location.origin);return t.protocol==="http:"||t.protocol==="https:"}catch{return!1}}function ga(e,t,r="Operation"){return!t||t<=0?e:new Promise((n,o)=>{let a=setTimeout(()=>{o(new Error(`${r} timed out after ${t}ms`))},t);Promise.resolve(e).then(i=>{clearTimeout(a),n(i)}).catch(i=>{clearTimeout(a),o(i)})})}function ma(e){return String(e).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ha(e,t,r){let n=window.screen.width/2-t/2,o=window.screen.height/2-r/2;return window.open(e,"",`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${t}, height=${r}, top=${o}, left=${n}`)}function ba(e){if(e==null)return"";let t=String(e).trim();return t?t.replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\s+/g," ").trim():""}var cr=Xe(()=>{});Ie();var oe="any",Pe={type:"object",allowUnknown:!1,properties:{id:{type:"string",minLength:1,maxLength:64},name:{type:"string",minLength:1,maxLength:80},tags:{type:"array",uniqueItems:!0,items:{type:"string"}},themes:{type:"array",uniqueItems:!0,items:{type:"string",oneOf:[{const:"light",title:"Light"},{const:"dark",title:"Dark"},{const:"system",title:"System"}]}},description:{type:"string",maxLength:500},options:{type:"object",allowUnknown:!0,properties:{liquidGlassEffects:{type:"boolean"},backgroundMesh:{type:"number"}}},form:{type:"object",allowUnknown:!0,properties:{options:{type:"object",allowUnknown:!0,properties:{widgets:{type:"object",allowUnknown:!1,properties:{booleans:{type:"string"},numbers:{type:"string"},selects:{type:"string"}}},layouts:{type:"object",allowUnknown:!1,properties:{fieldsets:{type:"string"},arrays:{type:"string"}}},enhancements:{type:"object",allowUnknown:!1,properties:{icons:{type:"boolean"},datalists:{type:"boolean"},rangeOutput:{type:"boolean"},colorInput:{type:"boolean"}}},validation:{type:"object",allowUnknown:!1,properties:{showErrors:{type:"boolean"},validateOnChange:{type:"boolean"}}}}}}},colors:{type:"object",allowUnknown:!1,properties:{primary:{type:"string",relations:{tokens:["--color-primary-*","--color-primary-fill","--color-primary-text","--background-mesh-*"]}},secondary:{type:"string",relations:{tokens:["--color-secondary-*","--color-gray-*","--background-mesh-*"]}},accent:{type:"string",relations:{tokens:["--color-accent-*","--background-mesh-*"]}},background:{type:"string",relations:{tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},success:{type:["string","null"],relations:{tokens:["--color-success-*","--color-success-fill","--color-success-fill-hover","--color-success-fill-active","--color-success-text","--color-success-text-hover","--color-success-contrast","--color-success-display-*","--surface-*-success-text","--surface-*-success-text-hover"]}},warning:{type:["string","null"],relations:{tokens:["--color-warning-*","--color-warning-fill","--color-warning-fill-hover","--color-warning-fill-active","--color-warning-text","--color-warning-text-hover","--color-warning-contrast","--color-warning-display-*","--surface-*-warning-text","--surface-*-warning-text-hover"]}},danger:{type:["string","null"],relations:{tokens:["--color-danger-*","--color-danger-fill","--color-danger-fill-hover","--color-danger-fill-active","--color-danger-text","--color-danger-text-hover","--color-danger-contrast","--color-danger-display-*","--surface-*-danger-text","--surface-*-danger-text-hover"]}},info:{type:["string","null"],relations:{tokens:["--color-info-*","--color-info-fill","--color-info-fill-hover","--color-info-fill-active","--color-info-text","--color-info-text-hover","--color-info-contrast","--color-info-display-*","--surface-*-info-text","--surface-*-info-text-hover"]}},gradientStops:{type:"number"},elevationOpacity:{type:"number",relations:{tokens:["--surface-*-shadow"]}},darkMode:{type:"object",allowUnknown:!1,properties:{background:{type:"string",relations:{theme:"dark",tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},primary:{type:"string",relations:{theme:"dark",tokens:["--color-primary-*","--color-primary-fill","--color-primary-text"]}},secondary:{type:"string",relations:{theme:"dark",tokens:["--color-secondary-*","--color-gray-*"]}},accent:{type:"string",relations:{theme:"dark",tokens:["--color-accent-*"]}}}}}},typography:{type:"object",allowUnknown:!1,properties:{fontFamilyHeadings:{type:"string",relations:{tokens:["--font-family-headings"]}},fontFamilyBody:{type:"string",relations:{tokens:["--font-family-body"]}},fontFamilyMono:{type:"string",relations:{tokens:["--font-family-mono"]}},baseFontSize:{type:"number",relations:{tokens:["--font-size-*"]}},fontScale:{type:"number",relations:{tokens:["--font-size-*"]}},fontWeightLight:{type:["string","number"],relations:{tokens:["--font-weight-light"]}},fontWeightNormal:{type:["string","number"],relations:{tokens:["--font-weight-normal"]}},fontWeightMedium:{type:["string","number"],relations:{tokens:["--font-weight-medium"]}},fontWeightSemibold:{type:["string","number"],relations:{tokens:["--font-weight-semibold"]}},fontWeightBold:{type:["string","number"],relations:{tokens:["--font-weight-bold"]}},lineHeightTight:{type:["string","number"],relations:{tokens:["--font-line-height-tight"]}},lineHeightNormal:{type:["string","number"],relations:{tokens:["--font-line-height-normal"]}},lineHeightRelaxed:{type:["string","number"],relations:{tokens:["--font-line-height-relaxed"]}},letterSpacingTight:{type:"number"},letterSpacingNormal:{type:"number"},letterSpacingWide:{type:"number"}}},spatialRhythm:{type:"object",allowUnknown:!1,properties:{baseUnit:{type:"number",relations:{tokens:["--spacing-*"]}},scaleRatio:{type:"number"},maxSpacingSteps:{type:"number",relations:{tokens:["--spacing-*"]}},containerPadding:{type:"number"},inputPadding:{type:"number",relations:{rules:[{selectors:["input","textarea","select"],properties:["padding"]}]}},buttonPadding:{type:"number",relations:{rules:[{selectors:["button",".btn"],properties:["padding"]}]}},sectionSpacing:{type:"number",relations:{rules:[{selectors:["section"],properties:["margin","padding"]}]}}}},shape:{type:"object",allowUnknown:!1,properties:{radiusSize:{type:["string","number"],relations:{tokens:["--radius-*"]}},customRadius:{type:["string","number","null"]},borderWidth:{type:["string","number"],relations:{tokens:["--border-width-*"]}}}},behavior:{type:"object",allowUnknown:!1,properties:{transitionSpeed:{type:["string","number"],relations:{tokens:["--transition-*"]}},animationEasing:{type:"string"},customTransitionSpeed:{type:["number","null"]},customEasing:{type:["string","null"]},focusRingWidth:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["outline-width","box-shadow"]}]}},focusRingOpacity:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["box-shadow","outline-color"]}]}},hoverOpacity:{type:"number"}}},layout:{type:"object",allowUnknown:!1,properties:{maxWidth:{type:["number","string"],relations:{tokens:["--layout-max-width","--layout-max-width-*"]}},maxWidths:{type:"object",allowUnknown:!1,properties:{sm:{type:["number","string"],relations:{tokens:["--layout-max-width-sm"]}},md:{type:["number","string"],relations:{tokens:["--layout-max-width-md"]}},lg:{type:["number","string"],relations:{tokens:["--layout-max-width-lg"]}},xl:{type:["number","string"],relations:{tokens:["--layout-max-width-xl"]}}}},containerPadding:{type:["number","string"],relations:{tokens:["--layout-container-padding"]}},breakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"number"},md:{type:"number"},lg:{type:"number"},xl:{type:"number"}}},gridColumns:{type:"number"},gridGutter:{type:"number"},densityCompact:{type:"number"},densityNormal:{type:"number"},densityComfortable:{type:"number"},buttonMinHeight:{type:"number"},inputMinHeight:{type:"number"},baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}},utilities:{type:"object",allowUnknown:!0,properties:{grid:{type:"boolean"},flex:{type:"boolean"},spacing:{type:"boolean"},container:{type:"boolean"}}},gridSystem:{type:"object",allowUnknown:!0,properties:{columns:{type:"array",items:{type:"number"}},autoFitBreakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"string"},md:{type:"string"},lg:{type:"string"},xl:{type:"string"}}},enableGapUtilities:{type:"boolean"}}},containerMaxWidth:{type:["number","string"]}}},layers:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},shadowBlurMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowOffsetMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowDepth:{type:"string"},blurLight:{type:"number"},blurMedium:{type:"number"},blurHeavy:{type:"number"},baseZIndex:{type:"number",relations:{tokens:["--z-*"]}},zIndexStep:{type:"number",relations:{tokens:["--z-*"]}},zIndexBase:{type:"number"},zIndexDropdown:{type:"number"},zIndexSticky:{type:"number"},zIndexFixed:{type:"number"},zIndexModal:{type:"number"},zIndexPopover:{type:"number"},zIndexTooltip:{type:"number"},zIndexNotification:{type:"number"},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}}}},advanced:{type:"object",allowUnknown:!0,properties:{linkStyle:{type:"string"},colorDerivation:{type:"string"}}},a11y:{type:"object",allowUnknown:!0,properties:{minTouchTarget:{type:["string","number"]},prefersReducedMotion:{type:"boolean"},focusStyle:{type:"string"}}},icons:{type:"object",allowUnknown:!1,properties:{set:{type:"string"},weight:{type:"string"},defaultSize:{type:"number",relations:{tokens:["--icon-size"]}},sizes:{type:"object",allowUnknown:!0,properties:{xs:{type:["number","string"]},sm:{type:["number","string"]},md:{type:["number","string"]},lg:{type:["number","string"]},xl:{type:["number","string"]},"2xl":{type:["number","string"]}}},spritePath:{type:"string"},externalPath:{type:"string"},include:{type:"object",allowUnknown:!0,properties:{navigation:{type:"array",items:{type:"string"}},actions:{type:"array",items:{type:"string"}},communication:{type:"array",items:{type:"string"}},content:{type:"array",items:{type:"string"}},status:{type:"array",items:{type:"string"}},time:{type:"array",items:{type:"string"}},commerce:{type:"array",items:{type:"string"}},formatting:{type:"array",items:{type:"string"}},system:{type:"array",items:{type:"string"}}}}}},components:{type:"object",allowUnknown:!0},debug:{type:"boolean"}}},no={type:"object",allowUnknown:!0,properties:{mode:{type:"string"},preset:{type:"string"},design:Pe,enhancers:{type:["object","array"]},applyGlobalStyles:{type:"boolean"},manageTheme:{type:"boolean"},themeStorageKey:{type:"string"},preloadStyles:{type:"boolean"},criticalLayers:{type:"array",items:{type:"string"}},autoDefine:{type:"object",allowUnknown:!1,properties:{predefine:{type:"array",items:{type:"string"}},mapper:{type:oe},enhancers:{type:["object","array"]},scanExisting:{type:"boolean"},observeShadows:{type:"boolean"},patchAttachShadow:{type:"boolean"},debounceMs:{type:"number"},onError:{type:oe},baseURL:{type:"string"}}},managerURL:{type:"string"},manager:{type:oe},liveEdit:{type:"boolean"},localization:{type:"object",allowUnknown:!1,properties:{locale:{type:"string"},locales:{type:"array",items:{type:"string"}},messages:{type:"object",allowUnknown:!0},provider:{type:oe},translate:{type:oe},loadLocale:{type:oe},setLocale:{type:oe}}},log:{type:oe}}};function _e(e){return e===null?"null":Array.isArray(e)?"array":typeof e}function oo(e,t){if(t===oe)return!0;let r=_e(e);return Array.isArray(t)?t.includes(r):r===t}function et(e,t,r,n){if(!t)return;let o=t.type||oe;if(!oo(e,o)){n.push({path:r,expected:o,actual:_e(e),message:`Expected ${o} but got ${_e(e)}`});return}if(o==="array"&&t.items&&Array.isArray(e)&&e.forEach((a,i)=>{et(a,t.items,`${r}[${i}]`,n)}),o==="object"&&e&&typeof e=="object"){let a=t.properties||{};for(let[i,s]of Object.entries(e)){if(!Object.prototype.hasOwnProperty.call(a,i)){t.allowUnknown||n.push({path:`${r}.${i}`,expected:"known property",actual:"unknown",message:`Unknown property "${i}"`});continue}et(s,a[i],`${r}.${i}`,n)}}}function jt(e,t="",r={}){if(!e||typeof e!="object")return r;if(e.relations&&t&&(r[t]=e.relations),e.type==="object"&&e.properties&&Object.entries(e.properties).forEach(([n,o])=>{let a=t?`${t}.${n}`:n;jt(o,a,r)}),e.type==="array"&&e.items){let n=`${t}[]`;jt(e.items,n,r)}return r}var Tr=jt(Pe,""),Rr=Pe,ao={"colors.primary":{widget:"input-color"},"colors.secondary":{widget:"input-color"},"colors.accent":{widget:"input-color"},"colors.background":{widget:"input-color"},"colors.success":{widget:"input-color"},"colors.warning":{widget:"input-color"},"colors.danger":{widget:"input-color"},"colors.info":{widget:"input-color"},"colors.gradientStops":{min:2,max:8,step:1,widget:"range"},"colors.elevationOpacity":{min:0,max:1,step:.01,widget:"range"},"colors.darkMode.background":{widget:"input-color"},"colors.darkMode.primary":{widget:"input-color"},"colors.darkMode.secondary":{widget:"input-color"},"colors.darkMode.accent":{widget:"input-color"},description:{widget:"textarea",maxLength:500,rows:4,placeholder:"Summarize the visual and interaction intent"},"typography.fontFamilyHeadings":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Heading font stack"},"typography.fontFamilyBody":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Body font stack"},"typography.fontFamilyMono":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Monospace font stack"},"typography.baseFontSize":{min:8,max:32,step:1,widget:"input-range"},"typography.fontScale":{min:1,max:2,step:.01,widget:"range"},"typography.fontWeightLight":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightNormal":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightMedium":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightSemibold":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightBold":{min:100,max:800,step:100,widget:"input-range"},"typography.lineHeightTight":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightNormal":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightRelaxed":{min:.75,max:3,step:.001,widget:"input-range"},"typography.letterSpacingTight":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingNormal":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingWide":{min:-.1,max:.1,step:.001,widget:"range"},"spatialRhythm.baseUnit":{min:1,max:16,step:1,widget:"range"},"spatialRhythm.scaleRatio":{min:1,max:2,step:.01,widget:"range"},"spatialRhythm.maxSpacingSteps":{min:4,max:64,step:1,widget:"range"},"spatialRhythm.containerPadding":{min:0,max:8,step:.05,widget:"range"},"spatialRhythm.inputPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.buttonPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.sectionSpacing":{min:0,max:8,step:.05,widget:"range"},"shape.radiusSize":{oneOf:Object.entries($.RadiusSizes).map(([e,t])=>({const:t,title:e}))},"shape.borderWidth":{widget:"select",oneOf:Object.entries($.BorderWidths).map(([e,t])=>({const:t,title:e}))},"shape.customRadius":{min:0,max:64,step:1,widget:"range"},"behavior.transitionSpeed":{oneOf:Object.entries($.TransitionSpeeds).map(([e,t])=>({const:t,title:e}))},"behavior.animationEasing":{enum:Object.values($.AnimationEasings)},"behavior.customTransitionSpeed":{min:0,max:1e3,step:10,widget:"range"},"behavior.focusRingWidth":{min:0,max:8,step:1,widget:"range"},"behavior.focusRingOpacity":{min:0,max:1,step:.01,widget:"range"},"behavior.hoverOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.gridColumns":{min:1,max:24,step:1,widget:"range"},"layout.gridGutter":{min:0,max:8,step:.05,widget:"range"},"layout.maxWidth":{widget:"input-text",placeholder:"e.g. 1200 or 1200px"},"layout.maxWidths.sm":{widget:"input-text",placeholder:"e.g. 640 or 640px"},"layout.maxWidths.md":{widget:"input-text",placeholder:"e.g. 768 or 768px"},"layout.maxWidths.lg":{widget:"input-text",placeholder:"e.g. 1024 or 1024px"},"layout.maxWidths.xl":{widget:"input-text",placeholder:"e.g. 1280 or 1280px"},"layout.containerMaxWidth":{widget:"input-text",placeholder:"e.g. 1400px"},"layout.containerPadding":{widget:"input-text",placeholder:"e.g. var(--spacing-6)"},"layout.breakpoints.sm":{min:320,max:2560,step:1,widget:"input-number"},"layout.breakpoints.md":{min:480,max:3200,step:1,widget:"input-number"},"layout.breakpoints.lg":{min:640,max:3840,step:1,widget:"input-number"},"layout.breakpoints.xl":{min:768,max:5120,step:1,widget:"input-number"},"layout.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.densityCompact":{min:.5,max:2,step:.05,widget:"range"},"layout.densityNormal":{min:.5,max:2,step:.05,widget:"range"},"layout.densityComfortable":{min:.5,max:2,step:.05,widget:"range"},"layout.buttonMinHeight":{min:24,max:96,step:1,widget:"range"},"layout.inputMinHeight":{min:24,max:96,step:1,widget:"range"},"layers.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layers.shadowBlurMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.shadowOffsetMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.blurLight":{min:0,max:48,step:1,widget:"range"},"layers.blurMedium":{min:0,max:64,step:1,widget:"range"},"layers.blurHeavy":{min:0,max:96,step:1,widget:"range"},"layers.baseZIndex":{min:0,max:1e4,step:10,widget:"range"},"layers.zIndexStep":{min:1,max:100,step:1,widget:"range"},"layers.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"advanced.linkStyle":{enum:Object.values($.LinkStyles)},"a11y.minTouchTarget":{oneOf:Object.entries($.TouchTargetSizes).map(([e,t])=>({const:t,title:e}))},"a11y.focusStyle":{enum:Object.values($.FocusStyles)},"icons.defaultSize":{min:8,max:128,step:1,widget:"range",icon:"sparkle"}};function Lr(e=[]){return e.join(".")}function Cr(e=[]){return`/${e.join("/")}`}function io(e,t=[]){if(!(!e||typeof e!="object"))return t.reduce((r,n)=>{if(r!=null&&typeof r=="object")return r[n]},e)}function Ar(e,t,r=[]){if(e!=null)return e;let n=io(t,r);return n??void 0}function Fe(e=""){return String(e).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/^./,t=>t.toUpperCase())}function Ir(e,t){if(!e)return"string";let r=e.type||"string";if(Array.isArray(r)){let n=_e(t);return n!=="undefined"&&r.includes(n)?n:r.includes("string")?"string":r.find(o=>o!=="null")||r[0]||"string"}return r}function Ot(e,t,r=[]){return!e||!t||!Array.isArray(r)||r.forEach(n=>{t[n]!==void 0&&(e[n]=t[n])}),e}function Er(e,t){return Array.isArray(t?.oneOf)&&t.oneOf.length?t.oneOf:Array.isArray(t?.enum)&&t.enum.length?t.enum.map(r=>({const:r,title:Fe(r)})):Array.isArray(e?.oneOf)&&e.oneOf.length?e.oneOf:Array.isArray(e?.enum)&&e.enum.length?e.enum.map(r=>({const:r,title:Fe(r)})):null}function so(e){return e&&(e==="range"?"input-range":e)}function lo(e,t){if(!Array.isArray(t)||!t.length)return e;let r=new Set;for(let n of t)!n||n.const===void 0||r.add(_e(n.const));if(!r.size)return e;if(r.size===1){let n=Array.from(r)[0];if(n==="number")return"number";if(n==="string")return"string";if(n==="boolean")return"boolean"}return e}function Mr(e,t,r){let n=Ir(t,r),o=e.toLowerCase(),a={label:Fe(e.split(".").slice(-1)[0]||e)};n==="boolean"&&(a.widget="toggle"),n==="number"&&(a.widget="range",o.includes("opacity")?(a.min=0,a.max=1,a.step=.01):o.includes("lineheight")?(a.min=.75,a.max=3,a.step=.001,a.widget="input-range"):o.includes("fontweight")?(a.min=100,a.max=800,a.step=100,a.widget="input-range"):o.endsWith("basefontsize")?(a.min=8,a.max=32,a.step=1,a.widget="input-range"):o.includes("scale")||o.includes("ratio")?(a.min=1,a.max=2,a.step=.01):(a.min=0,a.max=Math.max(10,Number.isFinite(Number(r))?Number(r)*4:100),a.step=1)),n==="string"&&e.startsWith("colors.")&&(a.widget="input-color"),n==="string"&&o==="description"&&(a.widget="textarea",a.maxLength=500,a.rows=4);let i=ao[e]||{},s={...a,...i};return s.widget&&(s.widget=so(s.widget)),s}function _r(e,t,r,n,o,a){if(!e||typeof e!="object")return null;let i=Ar(t,a,r),s=Ir(e,i);if(s==="object"&&e.properties){let f={type:"object",properties:{}};r.length>0&&(f.title=Fe(r[r.length-1]));let y={};for(let[x,b]of Object.entries(e.properties)){let S=t&&typeof t=="object"&&!Array.isArray(t)?t[x]:void 0,C=_r(b,S,[...r,x],n,o,a);C&&(f.properties[x]=C.schema,C.hasValue&&(y[x]=C.value))}return Object.keys(f.properties).length?{schema:f,value:y,hasValue:Object.keys(y).length>0}:null}if(s==="array"){let f=Lr(r),y=Mr(f,e,t);o[f]=y;let x=Ar(t,a,r),b=e.items?.type||"string",S=Array.isArray(b)?b[0]:b,C={type:S},A=Er(e?.items,null);if(A&&(C.oneOf=A),S==="string"&&Array.isArray(x)&&x.length>0){let M=x.find(z=>typeof z=="string"&&z.trim().length>0);M&&(C.examples=[M])}Ot(C,e?.items,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","minItems","maxItems","uniqueItems","description","default"]);let T={type:"array",items:C};Ot(T,e,["minItems","maxItems","uniqueItems","description","default"]);let I=Cr(r),E={},j=Array.isArray(C.oneOf)&&C.oneOf.length>0;if(S==="string"&&j&&(E["ui:widget"]=T.maxItems===1?"radio":"checkbox-group"),S==="string"&&Array.isArray(x)&&x.length>0){let M=x.filter(z=>typeof z=="string"&&z.trim().length>0).slice(0,5).join(", ");M&&(E["ui:placeholder"]=M)}return Object.keys(E).length&&(n[I]={...n[I]||{},...E}),{schema:T,value:Array.isArray(t)?t:[],hasValue:Array.isArray(t)}}let d=Lr(r),l=Mr(d,e,i);o[d]=l;let u=Er(e,l),m={type:lo(s==="null"?"string":s,u),title:l.label||Fe(r[r.length-1]||d)};u&&(m.oneOf=u),Ot(m,e,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","description","default"]),typeof l.maxLength=="number"&&m.maxLength===void 0&&(m.maxLength=l.maxLength),(m.type==="number"||m.type==="integer")&&typeof l.min=="number"&&m.minimum===void 0&&(m.minimum=l.min),(m.type==="number"||m.type==="integer")&&typeof l.max=="number"&&m.maximum===void 0&&(m.maximum=l.max),(m.type==="number"||m.type==="integer")&&typeof l.step=="number"&&m.multipleOf===void 0&&(m.multipleOf=l.step);let h=i;h!==void 0&&(m.examples=[h]);let v=Cr(r),g={};return l.widget&&(g["ui:widget"]=l.widget),l.icon&&(g["ui:icon"]=l.icon),typeof l.min=="number"&&(g["ui:min"]=l.min),typeof l.max=="number"&&(g["ui:max"]=l.max),typeof l.step=="number"&&(g["ui:step"]=l.step),l.placeholder&&(g["ui:placeholder"]=l.placeholder),typeof l.rows=="number"&&(g["ui:options"]={...g["ui:options"]||{},rows:l.rows}),l.widget==="input-range"&&h!==void 0&&(g["ui:allowUnset"]=!0),(typeof l.min=="number"||typeof l.max=="number"||typeof l.step=="number")&&(g["ui:options"]={...g["ui:options"]||{},...typeof l.min=="number"?{min:l.min}:{},...typeof l.max=="number"?{max:l.max}:{},...typeof l.step=="number"?{step:l.step}:{}}),Object.keys(g).length&&(n[v]=g),{schema:m,value:t,hasValue:t!==void 0}}function ye(e={}){let t={},r={"/colors":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}},"/colors/darkMode":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}}},n=ee?.default&&typeof ee.default=="object"?ee.default:null,o=_r(Pe,e,[],r,t,n);return{schema:o?.schema||{type:"object",properties:{}},uiSchema:r,values:o?.value||{},metadata:t}}function Ne(e={}){return ye(e).metadata}function Bt(e,{log:t,context:r="PDS config"}={}){if(!e||typeof e!="object")return[];let n=[];return et(e,Pe,"design",n),n.length&&typeof t=="function"&&n.forEach(o=>{t("warn",`[${r}] ${o.message} at ${o.path}`)}),n}function Dt(e,{log:t,context:r="PDS config"}={}){if(!e||typeof e!="object")return[];let n=[];return et(e,no,"config",n),n.length&&typeof t=="function"&&n.forEach(o=>{t("warn",`[${r}] ${o.message} at ${o.path}`)}),n}var ee={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:$.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.318,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:$.RadiusSizes.xlarge,borderWidth:$.BorderWidths.medium},behavior:{transitionSpeed:$.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],themes:["light"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:$.RadiusSizes.none,borderWidth:$.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:$.RadiusSizes.xxlarge,borderWidth:$.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:$.RadiusSizes.none,borderWidth:$.BorderWidths.thick},behavior:{transitionSpeed:$.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.3,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.3},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.thick},behavior:{transitionSpeed:$.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",themes:["light"],description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:$.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:$.RadiusSizes.xxlarge,borderWidth:$.BorderWidths.thin},behavior:{transitionSpeed:$.TransitionSpeeds.slow,animationEasing:$.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0c0c0c",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:$.RadiusSizes.none,borderWidth:$.BorderWidths.thick},behavior:{transitionSpeed:$.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:$.RadiusSizes.large,borderWidth:$.BorderWidths.medium},behavior:{transitionSpeed:$.TransitionSpeeds.normal,animationEasing:$.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:$.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:$.RadiusSizes.large,borderWidth:$.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:$.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:$.TransitionSpeeds.normal,animationEasing:$.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",info:"#0e7490",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#b1b1b1"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.medium},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:$.TouchTargetSizes.comfortable,focusStyle:$.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:2.5},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:$.TouchTargetSizes.standard,focusStyle:$.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:$.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:1.5},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.thin},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:$.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};ee.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!1,backgroundMesh:0},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0,colorInput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:$.FontWeights.light,fontWeightNormal:$.FontWeights.normal,fontWeightMedium:$.FontWeights.medium,fontWeightSemibold:$.FontWeights.semibold,fontWeightBold:$.FontWeights.bold,lineHeightTight:$.LineHeights.tight,lineHeightNormal:$.LineHeights.normal,lineHeightRelaxed:$.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:$.RadiusSizes.large,borderWidth:$.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:$.TransitionSpeeds.normal,animationEasing:$.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:30,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:$.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:$.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:$.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:$.IconSizes,include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle","corners-out","corners-in"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"/assets/pds/icons/pds-icons.svg"},debug:!1};var Fr=Ne(ee.default),Pr=ye(ee.default);function Ht(e="log",t,...r){let n=globalThis?.PDS?.log;if(typeof n=="function"){n(e,t,...r);return}if(typeof console>"u")return;let o=typeof console[e]=="function"?console[e].bind(console):typeof console.log=="function"?console.log.bind(console):null;o&&(r.length>0?o(t,...r):o(t))}Ie();Wt();var X=class e{static#v;static get instance(){return this.#v}#e;#a;constructor(t={}){this.options={debug:!1,...t},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),e.#v=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#Se(),typeof CSSStyleSheet<"u"?this.#Ae():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let t=this.options.design||{},r=this.#M(t),n=t.layers||{},o=this.#w(n,r.light),a=this.#A(o),i=r.dark!=null?this.#A(this.#w(n,r.dark)):null;return{colors:this.#T(t.colors||{},r),spacing:this.generateSpacingTokens(t.spatialRhythm||{}),radius:this.#j(t.shape||{}),borderWidths:this.#B(t.shape||{}),typography:this.generateTypographyTokens(t.typography||{}),shadows:a,darkShadows:i,layout:this.#D(t.layout||{}),transitions:this.#H(t.behavior||{}),zIndex:this.#W(t.layers||{}),icons:this.#U(t.icons||{})}}#M(t={}){let r=t.layout||{},n=t.layers||{};return{light:this.#x(r.baseShadowOpacity??n.baseShadowOpacity),dark:this.#x(r.darkMode?.baseShadowOpacity??n.darkMode?.baseShadowOpacity)}}#x(t){let r=Number(t);if(Number.isFinite(r))return Math.min(Math.max(r,0),1)}#w(t={},r){let n={...t};return r!=null&&(n.baseShadowOpacity=r),n}#T(t,r={}){let{primary:n="#3b82f6",secondary:o="#64748b",accent:a="#ec4899",background:i="#ffffff",success:s=null,warning:d="#FFBF00",danger:l=null,info:u=null,darkMode:c={}}=t,p={primary:this.#i(n),secondary:this.#i(o),accent:this.#i(a),success:this.#i(s||this.#R(n)),warning:this.#i(d||a),danger:this.#i(l||this.#I(n)),info:this.#i(u||n),gray:this.#k(o),surface:this.#S(i)};return p.surface.fieldset=this.#_(p.surface),p.surfaceSmart=this.#C(p.surface,r),p.dark=this.#F(p,i,c),p.dark&&p.dark.surface&&(p.dark.surfaceSmart=this.#C(p.dark.surface,r)),p.interactive={light:this.#r(p.primary,p.surface.base),dark:this.#r(p.dark.primary,p.dark.surface.base)},p.accentInteractive={light:this.#r(p.accent,p.surface.base),dark:this.#r(p.dark.accent,p.dark.surface.base)},p.surfaceAccent={light:this.#n(p.accent,p.surface),dark:this.#n(p.dark.accent,p.dark.surface)},p.dangerInteractive={light:this.#r(p.danger,p.surface.base),dark:this.#r(p.dark.danger,p.dark.surface.base)},p.successInteractive={light:this.#r(p.success,p.surface.base),dark:this.#r(p.dark.success,p.dark.surface.base)},p.warningInteractive={light:this.#r(p.warning,p.surface.base),dark:this.#r(p.dark.warning,p.dark.surface.base)},p.infoInteractive={light:this.#r(p.info,p.surface.base),dark:this.#r(p.dark.info,p.dark.surface.base)},p.surfaceStatus={light:{success:this.#n(p.success,p.surface),warning:this.#n(p.warning,p.surface),info:this.#n(p.info,p.surface),danger:this.#n(p.danger,p.surface)},dark:{success:this.#n(p.dark.success,p.dark.surface),warning:this.#n(p.dark.warning,p.dark.surface),info:this.#n(p.dark.info,p.dark.surface),danger:this.#n(p.dark.danger,p.dark.surface)}},p}#i(t){let r=this.#s(t);return{50:this.#t(r.h,Math.max(r.s-10,10),Math.min(r.l+45,95)),100:this.#t(r.h,Math.max(r.s-5,15),Math.min(r.l+35,90)),200:this.#t(r.h,r.s,Math.min(r.l+25,85)),300:this.#t(r.h,r.s,Math.min(r.l+15,75)),400:this.#t(r.h,r.s,Math.min(r.l+5,65)),500:t,600:this.#t(r.h,r.s,Math.max(r.l-10,25)),700:this.#t(r.h,r.s,Math.max(r.l-20,20)),800:this.#t(r.h,r.s,Math.max(r.l-30,15)),900:this.#t(r.h,r.s,Math.max(r.l-40,10))}}#R(t){let r=this.#s(t);return this.#t(120,Math.max(r.s,60),45)}#I(t){let r=this.#s(t);return this.#t(0,Math.max(r.s,70),50)}#k(t){let r=this.#s(t),n=r.h,o=Math.min(r.s,10);return{50:this.#t(n,o,98),100:this.#t(n,o,95),200:this.#t(n,o,88),300:this.#t(n,o,78),400:this.#t(n,o,60),500:t,600:this.#t(n,Math.min(o+5,15),45),700:this.#t(n,Math.min(o+8,18),35),800:this.#t(n,Math.min(o+10,20),20),900:this.#t(n,Math.min(o+12,22),10)}}#S(t){let r=this.#s(t);return{base:t,subtle:this.#t(r.h,Math.max(r.s,2),Math.max(r.l-2,2)),elevated:this.#t(r.h,Math.max(r.s,3),Math.max(r.l-4,5)),sunken:this.#t(r.h,Math.max(r.s,4),Math.max(r.l-6,8)),overlay:this.#t(r.h,Math.max(r.s,2),Math.min(r.l+2,98)),inverse:this.#$(t),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#_(t){return{base:t.subtle,subtle:t.elevated,elevated:t.sunken,sunken:this.#h(t.sunken,.05),overlay:t.elevated}}#h(t,r=.05){let n=this.#s(t),o=Math.max(n.l-n.l*r,5);return this.#t(n.h,n.s,o)}#$(t){let r=this.#s(t);if(r.l>50){let n=Math.min(r.s+5,25),o=Math.max(12-(r.l-50)*.1,8);return this.#t(r.h,n,o)}else{let n=Math.max(r.s-10,5),o=Math.min(85+(50-r.l)*.3,95);return this.#t(r.h,n,o)}}#F(t,r="#ffffff",n={}){let o=n.background?n.background:this.#$(r),a=this.#S(o),i=(s,d)=>s?this.#i(s):d;return{surface:{...a,fieldset:this.#N(a)},primary:i(n.primary,t.primary),secondary:i(n.secondary,t.secondary),accent:i(n.accent,t.accent),gray:n.secondary?this.#k(n.secondary):t.gray,success:i(n.success,t.success),info:i(n.info,t.info),warning:i(n.warning,t.warning),danger:i(n.danger,t.danger)}}#u(t){let r=String(t||"").replace("#",""),n=r.length===3?r.split("").map(a=>a+a).join(""):r,o=parseInt(n,16);return{r:o>>16&255,g:o>>8&255,b:o&255}}#p(t){let{r,g:n,b:o}=this.#u(t),a=[r/255,n/255,o/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*a[0]+.7152*a[1]+.0722*a[2]}#f(t,r){let n=this.#p(t),o=this.#p(r),a=Math.max(n,o),i=Math.min(n,o);return(a+.05)/(i+.05)}#g(t,r=4.5){if(!t)return"#000000";let n="#ffffff",o="#000000",a=this.#f(t,n);if(a>=r)return n;let i=this.#f(t,o);return i>=r||i>a?o:n}#z(t,r=1){let{r:n,g:o,b:a}=this.#u(t);return`rgba(${n}, ${o}, ${a}, ${r})`}#L(t,r,n=.5){let o=this.#u(t),a=this.#u(r),i=Math.round(o.r+(a.r-o.r)*n),s=Math.round(o.g+(a.g-o.g)*n),d=Math.round(o.b+(a.b-o.b)*n);return this.#P(i,s,d)}#P(t,r,n){let o=a=>{let i=Math.max(0,Math.min(255,Math.round(a))).toString(16);return i.length===1?"0"+i:i};return`#${o(t)}${o(r)}${o(n)}`}#N(t){return{base:t.elevated,subtle:t.overlay,elevated:this.#m(t.elevated,.08),sunken:t.elevated,overlay:this.#m(t.overlay,.05)}}#c(t={},r="#000000",n=4.5){let o=["600","700","800","500","400","900","300","200"],a={shade:null,color:null,ratio:0};for(let i of o){let s=t?.[i];if(!s||typeof s!="string")continue;let d=this.#f(s,r);if(d>a.ratio&&(a={shade:i,color:s,ratio:d}),d>=n)return s}return a.color||t?.["600"]||t?.["500"]}#r(t={},r="#ffffff"){let n=this.#p(r)<.18,o=this.#O(t,4.5),a=n?this.#m(o,.15):this.#h(o,.1),i=n?this.#m(o,.07):this.#h(o,.2),s=this.#c(t,r,4.5),d=this.#c(t,r,5.5),l=this.#c(t,r,3);return{fill:o,fillHover:a,fillActive:i,text:s,textHover:d||s,textVisited:this.#L(s||o,r,.2),focusRing:l||s||o,selectionBg:s||o,selectionText:this.#g(s||o,4.5),contrast:this.#g(o,4.5)}}#n(t={},r={}){let n={};return Object.entries(r).forEach(([o,a])=>{if(!a||typeof a!="string"||!a.startsWith("#"))return;let i=this.#c(t,a,4.5),s=this.#c(t,a,5);n[o]={text:i,textHover:s||i}}),n}#O(t={},r=4.5){let n=["600","700","800","500","400","900"],o={shade:null,color:null,ratio:0};for(let a of n){let i=t?.[a];if(!i||typeof i!="string")continue;let s=this.#f(i,"#ffffff");if(s>o.ratio&&(o={shade:a,color:i,ratio:s}),s>=r)return i}return o.color||t?.["600"]||t?.["500"]}#C(t,r={}){let n={},o=r.light??.1,a=r.dark??.25;return Object.entries(t).forEach(([i,s])=>{if(!s||typeof s!="string"||!s.startsWith("#"))return;let d=this.#p(s)<.5,l=this.#g(s,4.5),u=this.#g(s,3),c=this.#L(l,s,.4),p=l,m=c,h=d?"#ffffff":"#000000",v=d?a:o,g=this.#z(h,v),f=d?"#ffffff":"#000000",y=d?.15:.1,x=this.#z(f,y);n[i]={bg:s,text:l,textSecondary:u,textMuted:c,icon:p,iconSubtle:m,shadow:g,border:x,scheme:d?"dark":"light"}}),n}#m(t,r=.05){let n=this.#s(t),o=Math.min(n.l+(100-n.l)*r,95);return this.#t(n.h,n.s,o)}generateSpacingTokens(t){let{baseUnit:r=4,scaleRatio:n=1.25,maxSpacingSteps:o=12}=t,a=Number.isFinite(Number(r))?Number(r):4,i=Math.min(Number.isFinite(Number(o))?Number(o):12,12),s={0:"0"};for(let d=1;d<=i;d++)s[d]=`${a*d}px`;return s}#j(t){let{radiusSize:r="medium",customRadius:n=null}=t,o;n!=null?o=n:typeof r=="number"?o=r:typeof r=="string"?o=$.RadiusSizes[r]??$.RadiusSizes.medium:o=$.RadiusSizes.medium;let a=Number.isFinite(Number(o))?Number(o):$.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(a*.25)?Math.round(a*.25):0}px`,sm:`${Number.isFinite(a*.5)?Math.round(a*.5):0}px`,md:`${a}px`,lg:`${Number.isFinite(a*1.5)?Math.round(a*1.5):0}px`,xl:`${Number.isFinite(a*2)?Math.round(a*2):0}px`,full:"9999px"}}#B(t){let{borderWidth:r="medium"}=t,n;typeof r=="number"?n=r:typeof r=="string"?n=$.BorderWidths[r]??$.BorderWidths.medium:n=$.BorderWidths.medium;let o=Number.isFinite(Number(n))?Number(n):$.BorderWidths.medium,a=i=>`${Math.max(1,Math.ceil(i))}px`;return{hairline:a(o*.25),thin:a(o*.5),medium:a(o),thick:a(o*1.5)}}generateTypographyTokens(t){let{fontFamilyHeadings:r="system-ui, -apple-system, sans-serif",fontFamilyBody:n="system-ui, -apple-system, sans-serif",fontFamilyMono:o='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:a=16,fontScale:i=1.25,fontWeightLight:s=$.FontWeights.light,fontWeightNormal:d=$.FontWeights.normal,fontWeightMedium:l=$.FontWeights.medium,fontWeightSemibold:u=$.FontWeights.semibold,fontWeightBold:c=$.FontWeights.bold,lineHeightTight:p=$.LineHeights.tight,lineHeightNormal:m=$.LineHeights.normal,lineHeightRelaxed:h=$.LineHeights.relaxed}=t,v=Number.isFinite(Number(a))?Number(a):16,g=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:r,body:n,mono:o},fontSize:{xs:`${Math.round(v/Math.pow(g,2))}px`,sm:`${Math.round(v/g)}px`,base:`${v}px`,lg:`${Math.round(v*g)}px`,xl:`${Math.round(v*Math.pow(g,2))}px`,"2xl":`${Math.round(v*Math.pow(g,3))}px`,"3xl":`${Math.round(v*Math.pow(g,4))}px`,"4xl":`${Math.round(v*Math.pow(g,5))}px`},fontWeight:{light:s?.toString()||"300",normal:d?.toString()||"400",medium:l?.toString()||"500",semibold:u?.toString()||"600",bold:c?.toString()||"700"},lineHeight:{tight:p?.toString()||"1.25",normal:m?.toString()||"1.5",relaxed:h?.toString()||"1.75"}}}#A(t){let{baseShadowOpacity:r=.1,shadowBlurMultiplier:n=1,shadowOffsetMultiplier:o=1}=t,a=`rgba(0, 0, 0, ${r})`,i=`rgba(0, 0, 0, ${r*.5})`;return{sm:`0 ${1*o}px ${2*n}px 0 ${i}`,base:`0 ${1*o}px ${3*n}px 0 ${a}, 0 ${1*o}px ${2*n}px 0 ${i}`,md:`0 ${4*o}px ${6*n}px ${-1*o}px ${a}, 0 ${2*o}px ${4*n}px ${-1*o}px ${i}`,lg:`0 ${10*o}px ${15*n}px ${-3*o}px ${a}, 0 ${4*o}px ${6*n}px ${-2*o}px ${i}`,xl:`0 ${20*o}px ${25*n}px ${-5*o}px ${a}, 0 ${10*o}px ${10*n}px ${-5*o}px ${i}`,inner:`inset 0 ${2*o}px ${4*n}px 0 ${i}`}}#D(t){let{containerPadding:r=16,breakpoints:n={sm:640,md:768,lg:1024,xl:1280}}=t,o=this.#b(t,"maxWidth"),a=t.maxWidth,i=this.#E(t,{emitFallbacks:!1});return{maxWidth:o?this.#o(a,"1200px"):void 0,maxWidthSm:i.sm,maxWidthMd:i.md,maxWidthLg:i.lg,maxWidthXl:i.xl,minHeight:"100vh",containerPadding:this.#o(r,"16px"),breakpoints:{sm:this.#o(n.sm,"640px"),md:this.#o(n.md,"768px"),lg:this.#o(n.lg,"1024px"),xl:this.#o(n.xl,"1280px")},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#E(t={},r={}){let{emitFallbacks:n=!0}=r,o={sm:640,md:768,lg:1024,xl:1280},{maxWidths:a={},containerPadding:i=16,breakpoints:s=o}=t||{},d=this.#b(t,"maxWidth"),l=["sm","md","lg","xl"].some(g=>this.#b(a,g));if(!n&&!d&&!l)return{sm:void 0,md:void 0,lg:void 0,xl:void 0};let u=t?.maxWidth,c=this.#l(i,16),p=this.#l(u,o.xl),m={sm:this.#l(s.sm,o.sm),md:this.#l(s.md,o.md),lg:this.#l(s.lg,o.lg),xl:this.#l(s.xl,o.xl)},h=g=>g?Math.max(320,g-c*2):p,v={sm:Math.min(p,h(m.sm)),md:Math.min(p,h(m.md)),lg:Math.min(p,h(m.lg)),xl:Math.max(320,p)};return{sm:this.#o(a.sm,`${v.sm}px`),md:this.#o(a.md,`${v.md}px`),lg:this.#o(a.lg,`${v.lg}px`),xl:this.#o(a.xl,`${v.xl}px`)}}#b(t,r){if(!t||typeof t!="object"||!Object.prototype.hasOwnProperty.call(t,r))return!1;let n=t[r];return!(n==null||typeof n=="string"&&n.trim().length===0)}#o(t,r){return typeof t=="number"&&Number.isFinite(t)?`${t}px`:typeof t=="string"&&t.trim().length>0?t:r}#l(t,r){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){let n=parseFloat(t);if(Number.isFinite(n))return n}return r}#H(t){let{transitionSpeed:r=$.TransitionSpeeds.normal,animationEasing:n=$.AnimationEasings["ease-out"]}=t,o;return typeof r=="number"?o=r:typeof r=="string"&&$.TransitionSpeeds[r]?o=$.TransitionSpeeds[r]:o=$.TransitionSpeeds.normal,{fast:`${Math.round(o*.6)}ms`,normal:`${o}ms`,slow:`${Math.round(o*1.4)}ms`}}#W(t){let{baseZIndex:r=1e3,zIndexStep:n=10}=t;return{dropdown:r.toString(),sticky:(r+n*2).toString(),fixed:(r+n*3).toString(),modal:(r+n*4).toString(),drawer:(r+n*5).toString(),popover:(r+n*6).toString(),tooltip:(r+n*7).toString(),notification:(r+n*8).toString()}}#U(t){let{set:r="phosphor",weight:n="regular",defaultSize:o=24,sizes:a={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:s="/assets/img/icons/"}=t;return{set:r,weight:n,defaultSize:`${o}px`,sizes:Object.fromEntries(Object.entries(a).map(([d,l])=>[d,`${l}px`])),spritePath:i,externalPath:s}}#q(t){let r=[];r.push(`  /* Colors */
`);let n=(o,a="")=>{Object.entries(o).forEach(([i,s])=>{typeof s=="object"&&s!==null?n(s,`${a}${i}-`):typeof s=="string"&&r.push(`  --color-${a}${i}: ${s};
`)})};Object.entries(t).forEach(([o,a])=>{o!=="dark"&&o!=="surfaceSmart"&&o!=="interactive"&&o!=="accentInteractive"&&o!=="dangerInteractive"&&o!=="successInteractive"&&o!=="warningInteractive"&&o!=="infoInteractive"&&o!=="surfaceAccent"&&o!=="surfaceStatus"&&typeof a=="object"&&a!==null&&n(a,`${o}-`)}),t.surfaceSmart&&(r.push(`  /* Smart Surface Tokens (context-aware) */
`),Object.entries(t.surfaceSmart).forEach(([o,a])=>{r.push(`  --surface-${o}-bg: ${a.bg};
`),r.push(`  --surface-${o}-text: ${a.text};
`),r.push(`  --surface-${o}-text-secondary: ${a.textSecondary};
`),r.push(`  --surface-${o}-text-muted: ${a.textMuted};
`),r.push(`  --surface-${o}-icon: ${a.icon};
`),r.push(`  --surface-${o}-icon-subtle: ${a.iconSubtle};
`),r.push(`  --surface-${o}-shadow: ${a.shadow};
`),r.push(`  --surface-${o}-border: ${a.border};
`)}),r.push(`
`)),r.push(`  /* Semantic Text Colors */
`),r.push(`  --color-text-primary: var(--color-gray-900);
`),r.push(`  --color-text-secondary: var(--color-gray-600);
`),r.push(`  --color-text-muted: var(--color-gray-500);
`),r.push(`  --color-border: var(--color-gray-300);
`),r.push(`  --color-input-bg: var(--color-surface-base);
`),r.push(`  --color-input-disabled-bg: var(--color-gray-50);
`),r.push(`  --color-input-disabled-text: var(--color-gray-500);
`),r.push(`  --color-code-bg: var(--color-gray-100);
`),t.interactive&&t.interactive.light&&(r.push(`  /* Interactive Colors - optimized for specific use cases */
`),r.push(`  --color-primary-fill: ${t.interactive.light.fill}; /* For button backgrounds with white text */
`),r.push(`  --color-primary-fill-hover: ${t.interactive.light.fillHover};
`),r.push(`  --color-primary-fill-active: ${t.interactive.light.fillActive};
`),r.push(`  --color-primary-text: ${t.interactive.light.text}; /* For links and outline buttons on light surfaces */
`),r.push(`  --color-primary-text-hover: ${t.interactive.light.textHover};
`),r.push(`  --color-primary-text-visited: ${t.interactive.light.textVisited};
`),r.push(`  --color-primary-contrast: ${t.interactive.light.contrast};
`),r.push(`  --color-focus-ring: ${t.interactive.light.focusRing};
`),r.push(`  --color-selection-bg: ${t.interactive.light.selectionBg};
`),r.push(`  --color-selection-text: ${t.interactive.light.selectionText};
`),r.push(`  --color-link: var(--color-primary-text);
`),r.push(`  --color-link-hover: var(--color-primary-text-hover);
`),r.push(`  --color-link-visited: var(--color-primary-text-visited);
`)),t.accentInteractive?.light&&(r.push(`  /* Accent Role Colors */
`),r.push(`  --color-accent-fill: ${t.accentInteractive.light.fill};
`),r.push(`  --color-accent-fill-hover: ${t.accentInteractive.light.fillHover};
`),r.push(`  --color-accent-fill-active: ${t.accentInteractive.light.fillActive};
`),r.push(`  --color-accent-text: ${t.accentInteractive.light.text};
`),r.push(`  --color-accent-text-hover: ${t.accentInteractive.light.textHover};
`)),t.surfaceAccent?.light&&(r.push(`  /* Surface-Aware Accent Text Tokens */
`),Object.entries(t.surfaceAccent.light).forEach(([o,a])=>{r.push(`  --surface-${o}-accent-text: ${a.text};
`),r.push(`  --surface-${o}-accent-text-hover: ${a.textHover};
`)})),t.dangerInteractive?.light&&(r.push(`  /* Danger Role Colors */
`),r.push(`  --color-danger-fill: ${t.dangerInteractive.light.fill};
`),r.push(`  --color-danger-fill-hover: ${t.dangerInteractive.light.fillHover};
`),r.push(`  --color-danger-fill-active: ${t.dangerInteractive.light.fillActive};
`),r.push(`  --color-danger-text: ${t.dangerInteractive.light.text};
`),r.push(`  --color-danger-text-hover: ${t.dangerInteractive.light.textHover};
`),r.push(`  --color-danger-contrast: ${t.dangerInteractive.light.contrast};
`)),t.successInteractive?.light&&(r.push(`  /* Success Role Colors */
`),r.push(`  --color-success-fill: ${t.successInteractive.light.fill};
`),r.push(`  --color-success-fill-hover: ${t.successInteractive.light.fillHover};
`),r.push(`  --color-success-fill-active: ${t.successInteractive.light.fillActive};
`),r.push(`  --color-success-text: ${t.successInteractive.light.text};
`),r.push(`  --color-success-text-hover: ${t.successInteractive.light.textHover};
`),r.push(`  --color-success-contrast: ${t.successInteractive.light.contrast};
`)),t.warningInteractive?.light&&(r.push(`  /* Warning Role Colors */
`),r.push(`  --color-warning-fill: ${t.warningInteractive.light.fill};
`),r.push(`  --color-warning-fill-hover: ${t.warningInteractive.light.fillHover};
`),r.push(`  --color-warning-fill-active: ${t.warningInteractive.light.fillActive};
`),r.push(`  --color-warning-text: ${t.warningInteractive.light.text};
`),r.push(`  --color-warning-text-hover: ${t.warningInteractive.light.textHover};
`),r.push(`  --color-warning-contrast: ${t.warningInteractive.light.contrast};
`)),t.infoInteractive?.light&&(r.push(`  /* Info Role Colors */
`),r.push(`  --color-info-fill: ${t.infoInteractive.light.fill};
`),r.push(`  --color-info-fill-hover: ${t.infoInteractive.light.fillHover};
`),r.push(`  --color-info-fill-active: ${t.infoInteractive.light.fillActive};
`),r.push(`  --color-info-text: ${t.infoInteractive.light.text};
`),r.push(`  --color-info-text-hover: ${t.infoInteractive.light.textHover};
`),r.push(`  --color-info-contrast: ${t.infoInteractive.light.contrast};
`)),t.surfaceStatus?.light&&(r.push(`  /* Surface-Aware Status Text Tokens */
`),Object.entries(t.surfaceStatus.light).forEach(([o,a])=>{Object.entries(a).forEach(([i,s])=>{r.push(`  --surface-${i}-${o}-text: ${s.text};
`),r.push(`  --surface-${i}-${o}-text-hover: ${s.textHover};
`)})})),r.push(`  /* Semantic Callout Display Tokens */
`);for(let o of["success","info","warning","danger"])r.push(`  --color-${o}-display-bg: var(--color-${o}-50);
`),r.push(`  --color-${o}-display-border: var(--color-${o}-600);
`),r.push(`  --color-${o}-display-text: var(--color-${o}-900);
`);return r.push(`  /* Translucent Surface Tokens */
`),r.push(`  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);
`),r.push(`  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
`),r.push(`  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);
`),r.push(`   /* Backdrop tokens - used for modal dialogs, drawers, overlays */

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
    `),r.push(this.#V(t)),`${r.join("")}
`}#V(t){let r=t.primary?.[500]||"#3b82f6",n=t.secondary?.[500]||"#8b5cf6",o=t.accent?.[500]||"#f59e0b";return`
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${r} 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${n} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${r} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${n} 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${r} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${n} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${o} 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${r} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${n} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${r} 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${n} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${r} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${r} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${o} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${n} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${o} 15%, transparent) 0px, transparent 50%);
    `}#G(t){let r=[`  /* Spacing */
`];return Object.entries(t).forEach(([n,o])=>{n!=null&&n!=="NaN"&&o!==void 0&&!o.includes("NaN")&&r.push(`  --spacing-${n}: ${o};
`)}),`${r.join("")}
`}#K(t){let r=[`  /* Border Radius */
`];return Object.entries(t).forEach(([n,o])=>{r.push(`  --radius-${n}: ${o};
`)}),`${r.join("")}
`}#J(t){let r=[`  /* Border Widths */
`];return Object.entries(t).forEach(([n,o])=>{r.push(`  --border-width-${n}: ${o};
`)}),`${r.join("")}
`}#Y(t){let r=[`  /* Typography */
`];return Object.entries(t).forEach(([n,o])=>{let a=n.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(o).forEach(([i,s])=>{let d=i.replace(/([A-Z])/g,"-$1").toLowerCase();r.push(`  --font-${a}-${d}: ${s};
`)})}),`${r.join("")}
`}#y(t){let r=[`  /* Shadows */
`];return Object.entries(t).forEach(([n,o])=>{r.push(`  --shadow-${n}: ${o};
`)}),`${r.join("")}
`}#Z(t){let r=[`  /* Layout */
`];return Object.entries(t).forEach(([n,o])=>{let a=n.replace(/([A-Z])/g,"-$1").toLowerCase();o!=null&&n!=="breakpoints"&&r.push(`  --layout-${a}: ${o};
`)}),`${r.join("")}
`}#X(t){let r=[`  /* Transitions */
`];return Object.entries(t).forEach(([n,o])=>{r.push(`  --transition-${n}: ${o};
`)}),`${r.join("")}
`}#Q(t){let r=[`  /* Z-Index */
`];return Object.entries(t).forEach(([n,o])=>{r.push(`  --z-${n}: ${o};
`)}),`${r.join("")}
`}#ee(t){let r=[`  /* Icon System */
`];return r.push(`  --icon-set: ${t.set};
`),r.push(`  --icon-weight: ${t.weight};
`),r.push(`  --icon-size: ${t.defaultSize};
`),Object.entries(t.sizes).forEach(([n,o])=>{r.push(`  --icon-size-${n}: ${o};
`)}),`${r.join("")}
`}#te(t,r){if(!t?.dark)return"";let n=[],o=(b,S="")=>{Object.entries(b).forEach(([C,A])=>{typeof A=="object"&&A!==null?o(A,`${S}${C}-`):typeof A=="string"&&n.push(`  --color-${S}${C}: ${A};
`)})};Object.entries(t.dark).forEach(([b,S])=>{b!=="surfaceSmart"&&typeof S=="object"&&S!==null&&o(S,`${b}-`)});let a=[];t.dark.surfaceSmart&&(a.push(`  /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([b,S])=>{a.push(`  --surface-${b}-bg: ${S.bg};
`),a.push(`  --surface-${b}-text: ${S.text};
`),a.push(`  --surface-${b}-text-secondary: ${S.textSecondary};
`),a.push(`  --surface-${b}-text-muted: ${S.textMuted};
`),a.push(`  --surface-${b}-icon: ${S.icon};
`),a.push(`  --surface-${b}-icon-subtle: ${S.iconSubtle};
`),a.push(`  --surface-${b}-shadow: ${S.shadow};
`),a.push(`  --surface-${b}-border: ${S.border};
`)}),a.push(`
`));let i=[];t.interactive?.dark&&(i.push(`  /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`  --color-primary-fill: ${t.interactive.dark.fill};
`),i.push(`  --color-primary-fill-hover: ${t.interactive.dark.fillHover};
`),i.push(`  --color-primary-fill-active: ${t.interactive.dark.fillActive};
`),i.push(`  --color-primary-text: ${t.interactive.dark.text};
`),i.push(`  --color-primary-text-hover: ${t.interactive.dark.textHover};
`),i.push(`  --color-primary-text-visited: ${t.interactive.dark.textVisited};
`),i.push(`  --color-primary-contrast: ${t.interactive.dark.contrast};
`),i.push(`  --color-focus-ring: ${t.interactive.dark.focusRing};
`),i.push(`  --color-selection-bg: ${t.interactive.dark.selectionBg};
`),i.push(`  --color-selection-text: ${t.interactive.dark.selectionText};
`),i.push(`  --color-link: var(--color-primary-text);
`),i.push(`  --color-link-hover: var(--color-primary-text-hover);
`),i.push(`  --color-link-visited: var(--color-primary-text-visited);
`));let s=[];t.accentInteractive?.dark&&(s.push(`  /* Accent Role Colors (dark mode) */
`),s.push(`  --color-accent-fill: ${t.accentInteractive.dark.fill};
`),s.push(`  --color-accent-fill-hover: ${t.accentInteractive.dark.fillHover};
`),s.push(`  --color-accent-fill-active: ${t.accentInteractive.dark.fillActive};
`),s.push(`  --color-accent-text: ${t.accentInteractive.dark.text};
`),s.push(`  --color-accent-text-hover: ${t.accentInteractive.dark.textHover};
`));let d=[];t.surfaceAccent?.dark&&(d.push(`  /* Surface-Aware Accent Text Tokens (dark mode) */
`),Object.entries(t.surfaceAccent.dark).forEach(([b,S])=>{d.push(`  --surface-${b}-accent-text: ${S.text};
`),d.push(`  --surface-${b}-accent-text-hover: ${S.textHover};
`)}));let l=[];t.dangerInteractive?.dark&&(l.push(`  /* Danger Role Colors (dark mode) */
`),l.push(`  --color-danger-fill: ${t.dangerInteractive.dark.fill};
`),l.push(`  --color-danger-fill-hover: ${t.dangerInteractive.dark.fillHover};
`),l.push(`  --color-danger-fill-active: ${t.dangerInteractive.dark.fillActive};
`),l.push(`  --color-danger-text: ${t.dangerInteractive.dark.text};
`),l.push(`  --color-danger-text-hover: ${t.dangerInteractive.dark.textHover};
`),l.push(`  --color-danger-contrast: ${t.dangerInteractive.dark.contrast};
`));let u=[];t.successInteractive?.dark&&(u.push(`  /* Success Role Colors (dark mode) */
`),u.push(`  --color-success-fill: ${t.successInteractive.dark.fill};
`),u.push(`  --color-success-fill-hover: ${t.successInteractive.dark.fillHover};
`),u.push(`  --color-success-fill-active: ${t.successInteractive.dark.fillActive};
`),u.push(`  --color-success-text: ${t.successInteractive.dark.text};
`),u.push(`  --color-success-text-hover: ${t.successInteractive.dark.textHover};
`),u.push(`  --color-success-contrast: ${t.successInteractive.dark.contrast};
`));let c=[];t.warningInteractive?.dark&&(c.push(`  /* Warning Role Colors (dark mode) */
`),c.push(`  --color-warning-fill: ${t.warningInteractive.dark.fill};
`),c.push(`  --color-warning-fill-hover: ${t.warningInteractive.dark.fillHover};
`),c.push(`  --color-warning-fill-active: ${t.warningInteractive.dark.fillActive};
`),c.push(`  --color-warning-text: ${t.warningInteractive.dark.text};
`),c.push(`  --color-warning-text-hover: ${t.warningInteractive.dark.textHover};
`),c.push(`  --color-warning-contrast: ${t.warningInteractive.dark.contrast};
`));let p=[];t.infoInteractive?.dark&&(p.push(`  /* Info Role Colors (dark mode) */
`),p.push(`  --color-info-fill: ${t.infoInteractive.dark.fill};
`),p.push(`  --color-info-fill-hover: ${t.infoInteractive.dark.fillHover};
`),p.push(`  --color-info-fill-active: ${t.infoInteractive.dark.fillActive};
`),p.push(`  --color-info-text: ${t.infoInteractive.dark.text};
`),p.push(`  --color-info-text-hover: ${t.infoInteractive.dark.textHover};
`),p.push(`  --color-info-contrast: ${t.infoInteractive.dark.contrast};
`));let m=[];t.surfaceStatus?.dark&&(m.push(`  /* Surface-Aware Status Text Tokens (dark mode) */
`),Object.entries(t.surfaceStatus.dark).forEach(([b,S])=>{Object.entries(S).forEach(([C,A])=>{m.push(`  --surface-${C}-${b}-text: ${A.text};
`),m.push(`  --surface-${C}-${b}-text-hover: ${A.textHover};
`)})}));let h=[`  /* Semantic Callout Display Tokens (dark mode) */
`];for(let b of["success","info","warning","danger"])h.push(`  --color-${b}-display-bg: color-mix(in oklab, var(--color-${b}-400) 12%, var(--color-surface-base));
`),h.push(`  --color-${b}-display-border: var(--color-${b}-400);
`),h.push(`  --color-${b}-display-text: var(--color-${b}-100);
`);let v=`  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
`,g=`  /* Backdrop tokens - dark mode */
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
`,f=this.#oe(t),y=r?[this.#y(r)]:[];return`html[data-theme="dark"] {
${[...n,...a,...y,v,...i,...s,...d,...l,...u,...c,...p,...m,...h,g,f].join("")}}
`}#re(t,r){if(!t?.dark)return"";let n=[],o=(b,S="")=>{Object.entries(b).forEach(([C,A])=>{typeof A=="object"&&A!==null?o(A,`${S}${C}-`):typeof A=="string"&&n.push(`    --color-${S}${C}: ${A};
`)})};Object.entries(t.dark).forEach(([b,S])=>{b!=="surfaceSmart"&&typeof S=="object"&&S!==null&&o(S,`${b}-`)});let a=[];t.dark.surfaceSmart&&(a.push(`    /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([b,S])=>{a.push(`    --surface-${b}-bg: ${S.bg};
`),a.push(`    --surface-${b}-text: ${S.text};
`),a.push(`    --surface-${b}-text-secondary: ${S.textSecondary};
`),a.push(`    --surface-${b}-text-muted: ${S.textMuted};
`),a.push(`    --surface-${b}-icon: ${S.icon};
`),a.push(`    --surface-${b}-icon-subtle: ${S.iconSubtle};
`),a.push(`    --surface-${b}-shadow: ${S.shadow};
`),a.push(`    --surface-${b}-border: ${S.border};
`)}),a.push(`
`));let i=[];t.interactive&&t.interactive.dark&&(i.push(`    /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`    --color-primary-fill: ${t.interactive.dark.fill};
`),i.push(`    --color-primary-fill-hover: ${t.interactive.dark.fillHover};
`),i.push(`    --color-primary-fill-active: ${t.interactive.dark.fillActive};
`),i.push(`    --color-primary-text: ${t.interactive.dark.text};
`),i.push(`    --color-primary-text-hover: ${t.interactive.dark.textHover};
`),i.push(`    --color-primary-text-visited: ${t.interactive.dark.textVisited};
`),i.push(`    --color-primary-contrast: ${t.interactive.dark.contrast};
`),i.push(`    --color-focus-ring: ${t.interactive.dark.focusRing};
`),i.push(`    --color-selection-bg: ${t.interactive.dark.selectionBg};
`),i.push(`    --color-selection-text: ${t.interactive.dark.selectionText};
`),i.push(`    --color-link: var(--color-primary-text);
`),i.push(`    --color-link-hover: var(--color-primary-text-hover);
`),i.push(`    --color-link-visited: var(--color-primary-text-visited);
`));let s=[];t.accentInteractive?.dark&&(s.push(`    /* Accent Role Colors (dark mode) */
`),s.push(`    --color-accent-fill: ${t.accentInteractive.dark.fill};
`),s.push(`    --color-accent-fill-hover: ${t.accentInteractive.dark.fillHover};
`),s.push(`    --color-accent-fill-active: ${t.accentInteractive.dark.fillActive};
`),s.push(`    --color-accent-text: ${t.accentInteractive.dark.text};
`),s.push(`    --color-accent-text-hover: ${t.accentInteractive.dark.textHover};
`));let d=[];t.surfaceAccent?.dark&&(d.push(`    /* Surface-Aware Accent Text Tokens (dark mode) */
`),Object.entries(t.surfaceAccent.dark).forEach(([b,S])=>{d.push(`    --surface-${b}-accent-text: ${S.text};
`),d.push(`    --surface-${b}-accent-text-hover: ${S.textHover};
`)}));let l=[];t.dangerInteractive?.dark&&(l.push(`    /* Danger Role Colors (dark mode) */
`),l.push(`    --color-danger-fill: ${t.dangerInteractive.dark.fill};
`),l.push(`    --color-danger-fill-hover: ${t.dangerInteractive.dark.fillHover};
`),l.push(`    --color-danger-fill-active: ${t.dangerInteractive.dark.fillActive};
`),l.push(`    --color-danger-text: ${t.dangerInteractive.dark.text};
`),l.push(`    --color-danger-text-hover: ${t.dangerInteractive.dark.textHover};
`),l.push(`    --color-danger-contrast: ${t.dangerInteractive.dark.contrast};
`));let u=[];t.successInteractive?.dark&&(u.push(`    /* Success Role Colors (dark mode) */
`),u.push(`    --color-success-fill: ${t.successInteractive.dark.fill};
`),u.push(`    --color-success-fill-hover: ${t.successInteractive.dark.fillHover};
`),u.push(`    --color-success-fill-active: ${t.successInteractive.dark.fillActive};
`),u.push(`    --color-success-text: ${t.successInteractive.dark.text};
`),u.push(`    --color-success-text-hover: ${t.successInteractive.dark.textHover};
`),u.push(`    --color-success-contrast: ${t.successInteractive.dark.contrast};
`));let c=[];t.warningInteractive?.dark&&(c.push(`    /* Warning Role Colors (dark mode) */
`),c.push(`    --color-warning-fill: ${t.warningInteractive.dark.fill};
`),c.push(`    --color-warning-fill-hover: ${t.warningInteractive.dark.fillHover};
`),c.push(`    --color-warning-fill-active: ${t.warningInteractive.dark.fillActive};
`),c.push(`    --color-warning-text: ${t.warningInteractive.dark.text};
`),c.push(`    --color-warning-text-hover: ${t.warningInteractive.dark.textHover};
`),c.push(`    --color-warning-contrast: ${t.warningInteractive.dark.contrast};
`));let p=[];t.infoInteractive?.dark&&(p.push(`    /* Info Role Colors (dark mode) */
`),p.push(`    --color-info-fill: ${t.infoInteractive.dark.fill};
`),p.push(`    --color-info-fill-hover: ${t.infoInteractive.dark.fillHover};
`),p.push(`    --color-info-fill-active: ${t.infoInteractive.dark.fillActive};
`),p.push(`    --color-info-text: ${t.infoInteractive.dark.text};
`),p.push(`    --color-info-text-hover: ${t.infoInteractive.dark.textHover};
`),p.push(`    --color-info-contrast: ${t.infoInteractive.dark.contrast};
`));let m=[];t.surfaceStatus?.dark&&(m.push(`    /* Surface-Aware Status Text Tokens (dark mode) */
`),Object.entries(t.surfaceStatus.dark).forEach(([b,S])=>{Object.entries(S).forEach(([C,A])=>{m.push(`    --surface-${C}-${b}-text: ${A.text};
`),m.push(`    --surface-${C}-${b}-text-hover: ${A.textHover};
`)})}));let h=[`    /* Semantic Callout Display Tokens (dark mode) */
`];for(let b of["success","info","warning","danger"])h.push(`    --color-${b}-display-bg: color-mix(in oklab, var(--color-${b}-400) 12%, var(--color-surface-base));
`),h.push(`    --color-${b}-display-border: var(--color-${b}-400);
`),h.push(`    --color-${b}-display-text: var(--color-${b}-100);
`);let v=[`    --color-text-primary: var(--color-gray-100);
`,`    --color-text-secondary: var(--color-gray-300);
`,`    --color-text-muted: var(--color-gray-500);
`,`    --color-border: var(--color-gray-700);
`,`    --color-input-bg: var(--color-gray-800);
`,`    --color-input-disabled-bg: var(--color-gray-900);
`,`    --color-input-disabled-text: var(--color-gray-600);
`,`    --color-code-bg: var(--color-gray-800);
`,...i].join(""),g=`    /* Backdrop tokens - dark mode */
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
`,f=this.#ne(t),y=r?[this.#y(r)]:[];return`
       html[data-theme="dark"] {
${[...n,...a,...y,v,...s,...d,...l,...u,...c,...p,...m,...h,g,f].join("")}       }
`}#ne(t){let r=t.dark||t,n=r.primary?.[400]||"#60a5fa",o=r.secondary?.[400]||"#a78bfa",a=r.accent?.[400]||"#fbbf24";return`    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${n} 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, ${n} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, ${n} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, ${o} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${a} 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, ${n} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, ${a} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${n} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, ${n} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${n} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
      `}#oe(t){let r=t.dark||t,n=r.primary?.[400]||"#60a5fa",o=r.secondary?.[400]||"#a78bfa",a=r.accent?.[400]||"#fbbf24";return`
  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${n} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${n} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${n} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${o} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${a} 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${n} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${a} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${n} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${n} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${n} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
    `}#ae(){return`/* Dark mode component adjustments */
html[data-theme="dark"] {
  img, video { opacity: 0.8; transition: opacity var(--transition-normal); }
  img:hover, video:hover { opacity: 1; }
}`}#ie(){try{let t=this.options?.design?.options?.backgroundMesh;this.options.debug&&this.options.log?.("debug","backgroundMesh check:",t);let r=Number(t);return!Number.isFinite(r)||r===0?"":`/* Optional background mesh applied from config */
body {
  background: var(--background-mesh-0${Math.max(1,Math.min(5,Math.floor(r)))});
  background-attachment: fixed;
}`}catch(t){return this.options.debug&&this.options.log?.("error","Error in generateBodyBackgroundMeshRule:",t),""}}#se(){try{return this.options?.design?.options?.liquidGlassEffects?`/* Liquid glass utility (opt-in via options.liquidGlassEffects) */
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
  border: var(--border-width-thin) solid color-mix(in oklab, var(--color-primary-500) 22%, transparent);
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
  border: var(--border-width-thin) solid color-mix(in oklab, var(--color-primary-300) 26%, transparent);
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
`:""}catch{return""}}#le(){return`/* ============================================================================
   Border Gradient Utilities
   Card outlines with gradient borders and glow effects
   ============================================================================ */


/* Gradient border utility - premium/promo card style */
.border-gradient {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

/* Gradient border variants - different color combinations */
.border-gradient-primary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-300),
      var(--color-primary-600)
    ) border-box;
}

.border-gradient-accent {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-accent-300),
      var(--color-accent-600)
    ) border-box;
}

.border-gradient-secondary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-secondary-300),
      var(--color-secondary-600)
    ) border-box;
}

/* Gradient border with different strengths/thickness */
.border-gradient-soft {
  border: var(--border-width-thin) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-medium {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-strong {
  border: var(--border-width-thick) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
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
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
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

`}#ce(){let{layout:t={}}=this.options.design,r=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Semantic HTML Elements (low-specificity via :where()) */

:where(blockquote) {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-6) var(--spacing-8);
  border-left: calc(var(--border-width-thick) + var(--border-width-thin)) solid var(--color-link);
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
    color: var(--color-link);
  }
}

:where(hr) {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: var(--border-width-thin) solid var(--color-border);
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
  background-color: var(--color-warning-display-bg);
  color: var(--color-warning-display-text);
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
  border: var(--border-width-thin) solid var(--color-border);
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
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] :where(summary) {
    border-bottom: var(--border-width-thin) solid var(--color-border);
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

`}#de(){let{shape:t={},spatialRhythm:r={},inputPadding:n,buttonPadding:o,focusRingWidth:a,focusRingOpacity:i,borderWidthThin:s,sectionSpacing:d,buttonMinHeight:l,inputMinHeight:u}=this.options.design,c=typeof t.borderWidth=="number"?t.borderWidth:typeof t.borderWidth=="string"?$.BorderWidths[t.borderWidth]??null:null,p=r.inputPadding??n??.75,m=r.buttonPadding??o??1,h=a||3,v=s||c||$.BorderWidths.thin,g=r.sectionSpacing??d??2,f=l||30;return`/* Mobile-First Form Styles - Generated from Design Config */
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
        color: var(--color-link-hover, var(--color-primary-text-hover));
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
      accent-color: var(--color-primary-fill);

      &:focus-visible {
        outline: none;

        box-shadow:
          0 0 0 2px var(--color-focus-ring, var(--color-primary-500)),
          0 0 0 4px color-mix(in srgb,
            var(--color-focus-ring, var(--color-primary-500)) 40%,
            transparent
          );
      }

      &:checked {
        background-color: var(--color-primary-fill);
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
  min-height: ${u||40}px;
  padding: calc(var(--spacing-1) * ${p}) var(--spacing-4);
  border: var(--border-width-medium) solid var(--color-border);
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
    border-color: var(--color-focus-ring, var(--color-primary-500));
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
    border-color: var(--color-danger-fill);
    
    &:focus {
      box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-danger-fill) ${Math.round((i||.3)*100)}%, transparent);
    }
  }
}

/* One-time-code / OTP input enhancement \u2014 single input, segmented visual style */
input[autocomplete="one-time-code"],
input.input-otp {
  --otp-digits: 6;
  --otp-ls: 1.6ch;
  --otp-gap: 1.15;
  --otp-edge-pad: max(var(--spacing-2), calc(var(--radius-md) * 0.8));
  --otp-start-shift: calc((((var(--_otp-bgsz) - 1ch) / 2) * 0.98));
  --otp-pad-start: calc(var(--otp-edge-pad) + var(--otp-start-shift));
  --otp-pad-end: var(--otp-edge-pad);
  --otp-cell-bg: color-mix(in oklab, var(--color-surface-subtle) 94%, var(--color-primary-fill) 6%);
  --otp-active-bg: color-mix(in oklab, var(--color-primary-fill) 18%, var(--color-surface-base));
  --_otp-bgsz: calc(var(--otp-ls) + 1ch);
  --_otp-digit: 0;

  all: unset;
  display: block;
  box-sizing: border-box;
  inline-size: calc((var(--otp-digits) * var(--_otp-bgsz)) + var(--otp-pad-start) + var(--otp-pad-end));
  max-inline-size: 100%;
  min-inline-size: 0;
  min-block-size: auto;
  padding-block: max(var(--spacing-3), 0.9ch);
  padding-inline-start: var(--otp-pad-start);
  padding-inline-end: var(--otp-pad-end);
  border-radius: max(var(--radius-md), calc(var(--otp-edge-pad) * 0.9));
  text-align: left;
  text-indent: 0;
  letter-spacing: var(--otp-ls);
  font-family: var(--font-family-mono, monospace);
  font-variant-numeric: tabular-nums;
  font-size: clamp(var(--font-size-lg), 2vw, calc(var(--font-size-xl) + var(--font-size-xs)));
  line-height: 1;
  white-space: nowrap;
  direction: ltr;
  color: var(--color-text-primary);
  caret-color: var(--color-text-primary);
  cursor: text;
  overflow: hidden;
  scrollbar-width: none;
  background:
    linear-gradient(
      90deg,
      var(--otp-active-bg) 0 calc(var(--otp-gap) * var(--otp-ls)),
      transparent calc(var(--otp-gap) * var(--otp-ls)) 100%
    ) calc(var(--_otp-digit) * var(--_otp-bgsz)) 0 / var(--_otp-bgsz) 100% no-repeat,
    repeating-linear-gradient(
      90deg,
      var(--otp-cell-bg) 0 calc(var(--otp-gap) * var(--otp-ls)),
      transparent calc(var(--otp-gap) * var(--otp-ls)) var(--_otp-bgsz)
    ) 0 0 / var(--_otp-bgsz) 100% repeat-x,
    var(--color-input-bg);
  background-origin: content-box, content-box, border-box;
  background-clip: content-box, content-box, border-box;
  box-shadow:
    inset 0 0 0 var(--border-width-medium) var(--color-border),
    var(--shadow-sm);

  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    color: transparent;
  }

  &:focus {
    box-shadow:
      inset 0 0 0 var(--border-width-medium) var(--color-focus-ring, var(--color-primary-500)),
      0 0 0 ${h}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
  }

  &:invalid {
    box-shadow:
      inset 0 0 0 var(--border-width-medium) var(--color-border),
      var(--shadow-sm);
  }

  &:invalid:focus {
    box-shadow:
      inset 0 0 0 var(--border-width-medium) var(--color-focus-ring, var(--color-primary-500)),
      0 0 0 ${h}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
  }

  &[data-otp-complete="true"] {
    --otp-active-bg: color-mix(in oklab, var(--color-success-fill, var(--color-primary-fill)) 18%, var(--color-surface-base));
  }

  &:disabled {
    color: var(--color-input-disabled-text);
    caret-color: transparent;
    background:
      linear-gradient(
        90deg,
        color-mix(in oklab, var(--color-input-disabled-bg) 90%, var(--color-border) 10%) calc(var(--otp-gap) * var(--otp-ls)),
        transparent 0
      ) 0 0 / var(--_otp-bgsz) 100% repeat-x;
    box-shadow: inset 0 0 0 var(--border-width-medium) var(--color-border);
  }
}

.otp-status {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
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
    background: color-mix(in srgb, var(--color-primary-fill) 15%, var(--color-surface-base));
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    cursor: grab;
    border: var(--border-width-thin) solid color-mix(in srgb, var(--color-primary-fill) 30%, var(--color-border));
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
    background: color-mix(in srgb, var(--color-primary-fill) 15%, var(--color-surface-base));
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    border: var(--border-width-thin) solid color-mix(in srgb, var(--color-primary-fill) 30%, var(--color-border));
    transform: translateY(calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2));
  }

  /* Hover and focus states for WebKit */
  &:hover::-webkit-slider-thumb,
  &:focus-visible::-webkit-slider-thumb {
    cursor: grabbing;
    background: var(--color-primary-fill);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: var(--color-primary-fill-hover);
  }

  /* Active state for WebKit */
  &:active::-webkit-slider-thumb {
    background: var(--color-primary-fill-active);
  }

  /* Hover and focus states for Mozilla */
  &:hover::-moz-range-thumb,
  &:focus-visible::-moz-range-thumb {
    background: var(--color-primary-fill);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: var(--color-primary-fill-hover);
    cursor: grabbing;
  }

  /* Active state for Mozilla */
  &:active::-moz-range-thumb {
    background: var(--color-primary-fill-active);
  }
}

/* Focus style for container to match input focus */
.range-container:focus-within {
  border-color: var(--color-focus-ring, var(--color-primary-500));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-focus-ring, var(--color-primary-500)) 30%, transparent);
}

input[type="range"]:active::-moz-range-thumb {
  background: var(--color-primary-fill-active);
}

input[type="color"] {
  -webkit-appearance: none;
  appearance: none;
  padding: 0;
  width: calc(var(--spacing-8) + var(--spacing-1));
  height: calc(var(--spacing-8) + var(--spacing-1));
  min-height: auto;
  border-radius: var(--radius-sm);
  border: var(--border-width-thin) solid var(--color-border);
  overflow: hidden;
  cursor: pointer;
  background: transparent;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: inherit;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: inherit;
  }

  &::-moz-color-swatch {
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

:is(
  label:has(input[type="checkbox"]),
  input[type="checkbox"] + label
):not(fieldset label):not(label[data-toggle]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: calc(${f}px * 0.75);
  padding: calc(var(--spacing-1) * ${m*.6}) calc(var(--spacing-4) * 0.85);
  border: var(--border-width-medium) solid var(--color-border);
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
    border-color: var(--color-primary-fill);
  }

  &:has(input[type="checkbox"]:checked),
  input[type="checkbox"]:checked + label:not(fieldset label):not(label[data-toggle]) {
    background-color: color-mix(in oklab, var(--color-primary-fill) 8%, transparent);
    color: var(--color-primary-text);
    border-color: var(--color-primary-fill);
    border-width: var(--border-width-medium);
    font-weight: var(--font-weight-semibold);
    
    &:hover {
      background-color: color-mix(in oklab, var(--color-primary-fill) 15%, transparent);
      border-color: var(--color-primary-fill);
    }
  }

  &:has(input[type="checkbox"]:focus),
  input[type="checkbox"]:focus + label:not(fieldset label):not(label[data-toggle]) {
    outline: none;
    box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
  }

  &:has(input[type="checkbox"]:disabled),
  input[type="checkbox"]:disabled + label:not(fieldset label):not(label[data-toggle]) {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:has(input[type="checkbox"]:checked:disabled),
  input[type="checkbox"]:checked:disabled + label:not(fieldset label):not(label[data-toggle]) {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
  }
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
  accent-color: var(--color-primary-fill);

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
    min-height: calc(${f}px * 0.75);
    padding: calc(var(--spacing-1) * ${m*.6}) calc(var(--spacing-4) * 0.85);
    border: var(--border-width-medium) solid var(--color-border);
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
      border-color: var(--color-primary-fill);
      color: var(--color-text-primary);
    }

    &:has(input:is([type="radio"], [type="checkbox"]):checked) {
      background-color: color-mix(in oklab, var(--color-primary-fill) 8%, transparent);
      border-color: var(--color-primary-fill);
      border-width: var(--border-width-medium);
      font-weight: var(--font-weight-semibold);
      
      &:hover {
        background-color: color-mix(in oklab, var(--color-primary-fill) 15%, transparent);
        border-color: var(--color-primary-fill-hover);
      }
    }

    &:has(input:is([type="radio"], [type="checkbox"]):focus) {
      outline: none;
      box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
    }

    &:has(input:is([type="radio"], [type="checkbox"]):disabled) {
      background-color: var(--color-input-disabled-bg);
      color: var(--color-input-disabled-text);
      border-color: var(--color-border);
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:has(input:is([type="radio"], [type="checkbox"]):checked:disabled) {
      background-color: var(--color-input-disabled-bg);
      color: var(--color-input-disabled-text);
      border-color: var(--color-border);
    }
  }
}

/* Toggle switches - enhanced checkboxes with data-toggle attribute */
label[data-toggle] {
  display: inline-flex;
  align-items: center;
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

  span[data-label] {
    margin-bottom: 0;
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

  &:has(input[type="checkbox"]:checked) {
    &.with-icons .toggle-knob::before {
      content: "\u2713";
      color: var(--color-primary-contrast, white);
    }

    .toggle-switch {
      background-color: var(--color-primary-fill);
    }

    .toggle-knob {
      left: 22px;
    }
  }

  &:has(input[type="checkbox"]:focus) .toggle-switch,
  &:focus-visible .toggle-switch {
    outline: 2px solid var(--color-focus-ring, var(--color-primary-500));
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

/* Color input enhancement shell - applied by enhanceColorInput on label[data-color] */
label[data-color] {
  display: grid;
  gap: var(--spacing-2);

  .color-control {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-3);
    width: fit-content;
    min-height: var(--input-min-height, 40px);
    padding: var(--spacing-2) var(--spacing-3);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-base);
    color: var(--color-text-primary);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  }

  .color-control .color-swatch {
    position: relative;
    display: inline-flex;
    width: calc(var(--spacing-8) + var(--spacing-1));
    height: calc(var(--spacing-8) + var(--spacing-1));
    border-radius: var(--radius-sm);
  }

  .color-control output {
    margin: 0;
    min-width: 8ch;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    line-height: var(--font-line-height-tight);
    color: var(--color-text-secondary);
    text-transform: lowercase;
  }

  .color-control[data-unset="1"] output {
    font-style: italic;
    color: var(--color-text-muted);
  }

  .color-control input[type="color"] {
    width: calc(var(--spacing-8) + var(--spacing-1));
    height: calc(var(--spacing-8) + var(--spacing-1));
    border-radius: var(--radius-sm);
    border: var(--border-width-thin) solid var(--color-border);
    background: transparent;
    padding: 0;
  }

  .color-control input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: calc(var(--radius-sm) - var(--border-width-thin));
  }

  .color-control input[type="color"]::-moz-color-swatch {
    border: none;
    border-radius: calc(var(--radius-sm) - var(--border-width-thin));
  }

  .color-control .color-swatch[data-unset="1"]::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: var(--radius-sm);
    border: var(--border-width-thin) solid var(--color-border);
    background-color: color-mix(in oklab, var(--color-surface-subtle) 78%, var(--color-text-primary) 22%);
    background-image:
      linear-gradient(
        45deg,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%) 25%,
        transparent 25%,
        transparent 75%,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%) 75%,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%)
      ),
      linear-gradient(
        45deg,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%) 25%,
        transparent 25%,
        transparent 75%,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%) 75%,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%)
      );
    background-size: calc(var(--spacing-2) * 1.25) calc(var(--spacing-2) * 1.25);
    background-position:
      0 0,
      calc(var(--spacing-2) * 0.625) calc(var(--spacing-2) * 0.625);
    pointer-events: none;
  }

  .color-control .color-swatch[data-unset="1"] input[type="color"] {
    opacity: 0;
  }

  &:focus-within .color-control {
    border-color: var(--color-focus-ring, var(--color-primary-500));
    box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
  }

  &:has(input[type="color"]:disabled) .color-control {
    background: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    cursor: not-allowed;
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
  --btn-pad-y: max(calc(var(--spacing-1) * ${m}), var(--spacing-2));
  --btn-target-h: max(${f}px, calc(var(--font-size-base) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
  display: inline-flex;
  gap: var(--spacing-1);
  align-items: center;
  justify-content: center;
  min-height: var(--btn-target-h);
  height: var(--btn-target-h);
  padding: var(--btn-pad-y) var(--spacing-6);
  border: var(--border-width-medium) solid transparent;
  border-radius: var(--radius-md);
  box-sizing: border-box;
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  /* Only apply generic hover to non-variant buttons */
  &:hover:not(.btn-primary):not(.btn-secondary):not(.btn-outline):not(.btn-danger) {
    background-color: var(--color-surface-elevated);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
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
    background-color: var(--color-primary-fill-hover);
    border-color: var(--color-primary-fill-hover);
    color: white;
  }

  &:active {
    background-color: var(--color-primary-fill-active);
    border-color: var(--color-primary-fill-active);
    color: white;
  }
  
  &:focus {
    box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
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
  color: var(--color-link);
  border-color: var(--color-link);
  
  &:hover {
    background-color: var(--color-primary-fill);
    color: var(--color-primary-contrast, #ffffff);
    border-color: var(--color-primary-fill);

    pds-icon {
      color: var(--color-primary-contrast, #ffffff);
    }
  }

  &:active {
    background-color: var(--color-primary-fill-active);
    border-color: var(--color-primary-fill-active);
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

.btn-danger {
  background-color: var(--color-danger-fill);
  color: white;
  border-color: var(--color-danger-fill);

  &:hover {
    background-color: var(--color-danger-fill-hover);
    border-color: var(--color-danger-fill-hover);
    color: white;
  }

  &:active {
    background-color: var(--color-danger-fill-active);
    border-color: var(--color-danger-fill-active);
    color: white;
  }
}

.btn-danger.btn-outline {
  background-color: transparent;
  color: var(--color-danger-fill);
  border-color: var(--color-danger-fill);

  &:hover {
    background-color: var(--color-danger-fill);
    border-color: var(--color-danger-fill);
    color: white;

    pds-icon {
      color: white;
    }
  }

  &:active {
    background-color: var(--color-danger-fill-active);
    border-color: var(--color-danger-fill-active);
    color: white;

    pds-icon {
      color: white;
    }
  }

  &:disabled {
    background-color: transparent;
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-sm {
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${m}), var(--spacing-2)) * 0.85);
  --btn-target-h: max(calc(${f}px * 0.85), calc(var(--font-size-sm) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
  padding: var(--btn-pad-y) calc(var(--spacing-6) * 0.8);
  font-size: var(--font-size-sm);
  min-height: var(--btn-target-h);
  height: var(--btn-target-h);
}

.btn-xs {
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${m}), var(--spacing-2)) * 0.7);
  --btn-target-h: max(calc(${f}px * 0.7), calc(var(--font-size-xs) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
  padding: var(--btn-pad-y) calc(var(--spacing-6) * 0.65);
  font-size: var(--font-size-xs);
  min-height: var(--btn-target-h);
  height: var(--btn-target-h);
}


.btn-lg {
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${m}), var(--spacing-2)) * 1.15);
  --btn-target-h: max(calc(${f}px * 1.15), calc(var(--font-size-lg) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
  padding: var(--btn-pad-y) calc(var(--spacing-6) * 1.35);
  font-size: var(--font-size-lg);
  min-height: var(--btn-target-h);
  height: var(--btn-target-h);
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
  --skeleton-base: color-mix(in oklab, var(--color-text-primary) 8%, transparent);
  --skeleton-highlight: color-mix(in oklab, var(--color-text-primary) 16%, transparent);
  --skeleton-child-offset: 0ms;
  --skeleton-type-offset: 0ms;
  --skeleton-parent-offset: 0ms;
  --skeleton-delay: calc(
    220ms +
    var(--skeleton-child-offset) +
    var(--skeleton-type-offset) +
    var(--skeleton-parent-offset)
  );
  background: linear-gradient(
    90deg,
    var(--skeleton-base) 0%,
    var(--skeleton-highlight) 50%,
    var(--skeleton-base) 100%
  );
  background-size: 200% 100%;
  animation:
    pds-skeleton-fade-in 220ms ease-out both,
    pds-skeleton 1.5s ease-in-out infinite var(--skeleton-delay);
  border-radius: var(--radius-sm);
  
  &::before {
    content: '\\00a0';
  }
}

/* Deterministic stagger so large skeleton groups do not animate in lockstep. */
:where(.skeleton:nth-child(11n + 1)) { --skeleton-child-offset: 0ms; }
:where(.skeleton:nth-child(11n + 2)) { --skeleton-child-offset: 17ms; }
:where(.skeleton:nth-child(11n + 3)) { --skeleton-child-offset: 34ms; }
:where(.skeleton:nth-child(11n + 4)) { --skeleton-child-offset: 51ms; }
:where(.skeleton:nth-child(11n + 5)) { --skeleton-child-offset: 68ms; }
:where(.skeleton:nth-child(11n + 6)) { --skeleton-child-offset: 85ms; }
:where(.skeleton:nth-child(11n + 7)) { --skeleton-child-offset: 102ms; }
:where(.skeleton:nth-child(11n + 8)) { --skeleton-child-offset: 119ms; }
:where(.skeleton:nth-child(11n + 9)) { --skeleton-child-offset: 136ms; }
:where(.skeleton:nth-child(11n + 10)) { --skeleton-child-offset: 153ms; }
:where(.skeleton:nth-child(11n + 11)) { --skeleton-child-offset: 170ms; }

:where(.skeleton:nth-of-type(7n + 1)) { --skeleton-type-offset: 0ms; }
:where(.skeleton:nth-of-type(7n + 2)) { --skeleton-type-offset: 11ms; }
:where(.skeleton:nth-of-type(7n + 3)) { --skeleton-type-offset: 22ms; }
:where(.skeleton:nth-of-type(7n + 4)) { --skeleton-type-offset: 33ms; }
:where(.skeleton:nth-of-type(7n + 5)) { --skeleton-type-offset: 44ms; }
:where(.skeleton:nth-of-type(7n + 6)) { --skeleton-type-offset: 55ms; }
:where(.skeleton:nth-of-type(7n + 7)) { --skeleton-type-offset: 66ms; }

:where(*:nth-child(5n + 1) > .skeleton) { --skeleton-parent-offset: 0ms; }
:where(*:nth-child(5n + 2) > .skeleton) { --skeleton-parent-offset: 9ms; }
:where(*:nth-child(5n + 3) > .skeleton) { --skeleton-parent-offset: 18ms; }
:where(*:nth-child(5n + 4) > .skeleton) { --skeleton-parent-offset: 27ms; }
:where(*:nth-child(5n + 5) > .skeleton) { --skeleton-parent-offset: 36ms; }

@keyframes pds-skeleton-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pds-skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Empty State */
.empty-state {
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  color: var(--color-text-secondary);
  padding: var(--spacing-6) var(--spacing-4);
  background-color: var(--color-surface-subtle);
  max-width: var(--layout-max-width-md, 736px);
  border-radius: var(--radius-md);
  nav {
    margin-top: var(--spacing-4);
    display: flex;
    gap: var(--spacing-3);
  }
  pds-icon {    
    color: var(--color-text-muted);
  }
}

/* clip lines */

[data-clip] {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: attr(data-clip number, 3);
  line-clamp: attr(data-clip number, 3);
  position: relative;
  padding-inline-end: var(--spacing-6);
  --clip-more-bg: var(--color-surface-base);
  max-height: var(--clip-max-height-closed, calc(var(--spacing-12) * 3));
  transition: max-height var(--transition-fast), padding-inline-end var(--transition-fast);
  overflow: hidden;

  /* optional visual \u201Cmore\u201D hint*/
  &:not([data-clip-open="true"])[data-clip-more]::after{
    content: attr(data-clip-more);
  }

  &:not([data-clip-open="true"]):not([data-clip-more])::after{
    content: "more...";
  }

  /* optional visual \u201Cless\u201D hint*/
  &[data-clip-open="true"][data-clip-less]::after{
    content: attr(data-clip-less);
  }

  &[data-clip-open="true"]:not([data-clip-less])::after{
    content: "less...";
  }

  &::after{
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 0;
    display: inline-flex;
    align-items: center;
    padding: var
    padding-inline-start: var(--spacing-2);
    cursor: pointer;
    opacity: .7;
    transition: opacity var(--transition-fast), transform var(--transition-fast);
  }

  &[data-clip-open="true"] {
    -webkit-line-clamp: unset;
    line-clamp: unset;
    max-height: var(--clip-max-height-open, calc(var(--spacing-12) * 20));
    padding-inline-end: var(--spacing-6);
  }

  &[data-clip-open="true"]::after{
    opacity: .9;
    transform: translateY(calc(var(--spacing-1) * -1));
  }

}



/* Form utility classes */
.range-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  background: var(--color-input-bg);
  border: var(--border-width-thin) solid var(--color-border);
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
  border: var(--border-width-medium) solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  .array-controls {
    padding-top: var(--spacing-3);
    border-top: var(--border-width-medium) solid var(--color-border);
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

`}#ue(){let{layout:t={}}=this.options.design,r=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Table Styles - Mobile First */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 var(--spacing-6) 0;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-size-sm);
  
  @media (min-width: ${r.sm}px) {
    font-size: var(--font-size-base);
  }
}

.table-responsive {
  @media (max-width: ${r.sm-1}px) {
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
  border-bottom: var(--border-width-medium) solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: var(--border-width-thin) solid var(--color-border);
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
  border: var(--border-width-thin) solid var(--color-border);
  
  th, td {
    border: var(--border-width-thin) solid var(--color-border);
  }
}

.table-compact {
  th, td {
    padding: var(--spacing-2) var(--spacing-3);
  }
}

`}#pe(){return`/* Callout/Notification Styles */

.callout {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: calc(var(--border-width-thick) + var(--border-width-thin)) solid;
  border-color: var(--color-border);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  line-height: var(--font-line-height-relaxed);
  background-color: var(--color-surface-subtle);
  color: var(--color-text-primary);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}
/* Variants: success/info/warning/danger mapped to tokens */
.callout-success {
  background-color: var(--color-success-display-bg);
  border-color: var(--color-success-display-border);
  color: var(--color-success-display-text);
}
.callout-info {
  background-color: var(--color-info-display-bg);
  border-color: var(--color-info-display-border);
  color: var(--color-info-display-text);
}
.callout-warning {
  background-color: var(--color-warning-display-bg);
  border-color: var(--color-warning-display-border);
  color: var(--color-warning-display-text);
}
.callout-danger,
.callout-error {
  background-color: var(--color-danger-display-bg);
  border-color: var(--color-danger-display-border);
  color: var(--color-danger-display-text);
}

.callout-title {
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-base);
}

.callout-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  pds-icon {
    flex-shrink: 0;
  }
}

.callout-dismissible {
  padding-right: var(--spacing-12);
  position: relative;
}

.callout-close {
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

`}#fe(){return`/* Accordion (details/summary) */

:where(.accordion details) {
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  margin: 0 0 var(--spacing-3) 0;
  overflow: hidden;

  &[open] {
    overflow: visible;

    & > summary::after {
      transform: rotate(45deg);
    }

    &::details-content {
      block-size: auto;
      overflow: visible;
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

:where(.accordion summary) {
  cursor: pointer;
  padding: var(--spacing-3) var(--spacing-4);
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  border-radius: var(--radius-md);
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
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) 30%, transparent);
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

/* Fallback: grid trick for browsers without ::details-content support */
@supports not selector(::details-content) {
  :where(.accordion details) {
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
      overflow: visible;
    }
  }
}
`}#ge(){return`/* Badge/Pill Styles */

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
.badge-primary { background-color: var(--color-primary-fill); }
.badge-secondary { background-color: var(--color-secondary-600); }
.badge-success { background-color: var(--color-success-fill); }
.badge-info { background-color: var(--color-info-fill); }
.badge-warning { background-color: var(--color-warning-fill); }
.badge-danger { background-color: var(--color-danger-fill); }

.badge-outline {
  background-color: transparent;
  color: var(--color-text-secondary);
  border: var(--border-width-thin) solid currentColor;
  &.badge-primary { color: var(--color-primary-text); }
  &.badge-secondary { color: var(--color-text-secondary); }
  &.badge-success { color: var(--color-success-text); }
  &.badge-info { color: var(--color-info-text); }
  &.badge-warning { color: var(--color-warning-text); }
  &.badge-danger { color: var(--color-danger-text); }
}

.badge-sm { padding: 2px var(--spacing-1); font-size: 10px; }
.badge-lg { padding: var(--spacing-2) var(--spacing-3); font-size: var(--font-size-sm); }
.pill { padding: var(--spacing-1) var(--spacing-3); border-radius: var(--radius-full); }

`}#me(){let{layout:t={},behavior:r={}}=this.options.design;return`/* ============================================================================
   Dialog Primitive
   Native <dialog> element with PDS integration
   ============================================================================ */

/* Dialog base styles */
dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  width: min(600px, calc(100vw - var(--spacing-8)));
  max-width: min(600px, calc(100vw - var(--spacing-8)));
  max-height: calc(100dvh - var(--spacing-8));
  margin: 0;
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  
  /* Surface styling - elevated overlay */
  background-color: var(--surface-overlay-bg);
  color: var(--surface-overlay-text);
  box-shadow: 0 8px 32px var(--surface-overlay-shadow);
  
  /* Smooth transitions */
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
  transition: 
    opacity var(--transition-normal) ease,
    transform var(--transition-normal) ease;
  
  
}

/* Open state */
dialog[open] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  animation: pds-dialog-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-enter {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Safari fallback: disable scale animation to avoid dialog clipping bugs */
dialog.dialog-no-scale-animation {
  transform: translate(-50%, -50%);
  transition: opacity var(--transition-normal) ease;
}

dialog.dialog-no-scale-animation[open] {
  transform: translate(-50%, -50%);
  animation: pds-dialog-fade-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-fade-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Backdrop styling */
dialog::backdrop {
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  transition: opacity var(--transition-normal) ease;
}

dialog[open]::backdrop {
  opacity: var(--backdrop-opacity, 1);
  animation: pds-dialog-backdrop-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-backdrop-enter {
  from { opacity: 0; }
  to { opacity: var(--backdrop-opacity, 1); }
}

/* Dialog - constrain max height to 90vh, support custom maxHeight via CSS variable */
dialog {
  max-height: var(--dialog-max-height, 90vh);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent dialog itself from scrolling - let .dialog-body handle it */
}

/*
 * Overlay safety valve:
 * Some controls (e.g. pds-daterange panel) need to escape
 * the dialog bounds. Scope overflow visibility to custom dialogs that contain
 * those controls instead of enabling it for all dialogs.
 */
dialog.dialog-custom:has(pds-daterange) {
  overflow: visible;
}

/* Form structure - use flexbox instead of contents */
dialog form {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* Allow flex child to shrink */
  margin: 0;
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
    border-bottom: var(--border-width-thin) solid var(--surface-overlay-border);
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
    overflow-x: visible;
  }

  article:has(pds-daterange),
  form > article:has(pds-daterange),
  .dialog-body:has(pds-daterange) {
    overflow: visible;
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
    border-top: var(--border-width-thin) solid var(--surface-overlay-border);
    flex-shrink: 0;
  }
}

/* Dialog size modifiers */
dialog.dialog-sm { width: min(400px, calc(100vw - var(--spacing-8))); max-width: min(400px, calc(100vw - var(--spacing-8))); }
dialog.dialog-lg { width: min(800px, calc(100vw - var(--spacing-8))); max-width: min(800px, calc(100vw - var(--spacing-8))); }
dialog.dialog-xl { width: min(1200px, calc(100vw - var(--spacing-8))); max-width: min(1200px, calc(100vw - var(--spacing-8))); }
dialog.dialog-full { width: calc(100vw - var(--spacing-8)); max-width: calc(100vw - var(--spacing-8)); max-height: calc(100dvh - var(--spacing-8)); }

/* Mobile responsiveness - maximize on mobile */
@media (max-width: ${(t.breakpoints||{sm:640,md:768,lg:1024,xl:1280}).sm-1}px) {
  dialog,
  dialog.dialog-sm,
  dialog.dialog-lg,
  dialog.dialog-xl,
  dialog.dialog-full,
  dialog.dialog-no-scale-animation,
  dialog.dialog-no-scale-animation[open] {
    left: 0;
    top: 0;
    max-width: 100vw; 
    width: 100vw;
    height: 100dvh;
    max-height: 100dvh; 
    --dialog-max-height: 100dvh; /* Override custom maxHeight on mobile */
    border-radius: 0; 
    margin: 0;
  }

  dialog,
  dialog.dialog-sm,
  dialog.dialog-lg,
  dialog.dialog-xl,
  dialog.dialog-full {
    transform: scale(0.98);
  }

  dialog[open],
  dialog.dialog-sm[open],
  dialog.dialog-lg[open],
  dialog.dialog-xl[open],
  dialog.dialog-full[open] {
    transform: scale(1);
    animation: pds-dialog-enter-mobile var(--transition-normal) ease;
  }

  dialog.dialog-no-scale-animation {
    transition: opacity var(--transition-normal) ease;
  }
  dialog.dialog-no-scale-animation[open] {
    animation: pds-dialog-fade-enter var(--transition-normal) ease;
  }
  @keyframes pds-dialog-enter-mobile {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  dialog header, dialog form > header, dialog article, dialog form > article, dialog footer, dialog form > footer { padding: var(--spacing-4); }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  dialog, dialog::backdrop { transition-duration: 0.01s !important; }
}

html:has(dialog[open]:modal),
html:has(pds-drawer[open]) {
 overflow: hidden;
 scrollbar-gutter: stable;
}


`}#he(){let{layout:t={}}=this.options.design;return`/* Tab Strip Component */

/* Tab navigation */

pds-tabstrip {
  margin-top: var(--spacing-6);

  & > nav {
    display: flex;
    gap: var(--spacing-1);
    border-bottom: var(--border-width-medium) solid var(--color-border);
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
      border-bottom: var(--border-width-medium) solid transparent;
      margin-bottom: calc(-1 * var(--border-width-medium)); /* Overlap the nav border */

      &:hover {
        color: var(--color-text-primary);
        background-color: var(--color-surface-hover);
      }

      &:focus-visible {
        outline: var(--focus-ring-width, 2px) solid var(--color-focus-ring, var(--color-primary-500));
        outline-offset: -2px;
        border-radius: var(--radius-sm);
        z-index: 1;
      }

      /* Active tab */
      &[aria-current="page"] {
        color: var(--color-link);
        font-weight: var(--font-weight-semibold);
        border-bottom-color: var(--color-link);

        &:hover {
          color: var(--color-link-hover);
          border-bottom-color: var(--color-link-hover);
          background-color: color-mix(in oklab, var(--color-link) 10%, transparent);
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

`}#be(){return`/* Custom Scrollbars */
::-webkit-scrollbar { width: 12px; height: 12px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--color-secondary-300);
  border-radius: var(--radius-full);
  border: var(--border-width-thick) solid transparent;
  background-clip: padding-box;
  transition: background-color var(--transition-fast);
  &:hover { background: var(--color-secondary-400); border: var(--border-width-medium) solid transparent; background-clip: padding-box; }
  &:active { background: var(--color-secondary-500); border: var(--border-width-medium) solid transparent; background-clip: padding-box; }
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

`}#ye(){let{layout:t={}}=this.options.design,r=t.buttonMinHeight||30,n=t.buttonPadding||1,o=`max(calc(var(--spacing-1) * ${n}), var(--spacing-2))`,a=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 0.85)`,i=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 0.7)`,s=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 1.15)`,d=.72,l=`calc(${o} * ${d})`,u=`calc(${a} * ${d})`,c=`calc(${i} * ${d})`,p=`calc(${s} * ${d})`,m=`${r}px`,h=`calc(${r}px * 0.85)`,v=`calc(${r}px * 0.7)`,g=`calc(${r}px * 1.15)`,f=`max(${m}, calc(var(--font-size-base) + (${o} * 2) + (var(--border-width-medium) * 2)))`,y=`max(${h}, calc(var(--font-size-sm) + (${a} * 2) + (var(--border-width-medium) * 2)))`,x=`max(${v}, calc(var(--font-size-xs) + (${i} * 2) + (var(--border-width-medium) * 2)))`,b=`max(${g}, calc(var(--font-size-lg) + (${s} * 2) + (var(--border-width-medium) * 2)))`;return`/* Icon System */

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
.icon-32xl, pds-icon[size="3xl"] { width: var(--icon-size-3xl); height: var(--icon-size-3xl); }


/* Icon color utilities */
.icon-primary, pds-icon.primary { color: var(--color-primary-text); }
.icon-secondary, pds-icon.secondary { color: var(--color-text-secondary); }
.icon-accent, pds-icon.accent { color: var(--color-accent-text); }
.icon-success, pds-icon.success { color: var(--color-success-text); }
.icon-warning, pds-icon.warning { color: var(--color-warning-text); }
.icon-danger, pds-icon.danger { color: var(--color-danger-text); }
.icon-info, pds-icon.info { color: var(--color-info-text); }
.icon-muted, pds-icon.muted { color: var(--color-text-muted); }
.icon-subtle, pds-icon.subtle { color: var(--color-text-subtle); }

/* Icon with text combinations */
.icon-text { display: inline-flex; align-items: center; gap: var(--spacing-2); }
.icon-text-start { flex-direction: row; }
.icon-text-end { flex-direction: row-reverse; }

/* Button icon utilities */
button,
a.btn,
a.btn-primary,
a.btn-secondary,
a.btn-outline,
a.btn-danger,
a.icon-only {
  pds-icon,
  pds-icon[size] {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  &.icon-only {
    padding: ${l};
    min-width: ${f};
    min-height: ${f};
    width: ${f};
    height: ${f};
    display: inline-flex;
    align-items: center;
    justify-content: center;

    pds-icon,
    pds-icon[size] {
      width: 1.2em;
      height: 1.2em;
    }
  }

  &.btn-sm.icon-only {
    padding: ${u};
    min-width: ${y};
    min-height: ${y};
    width: ${y};
    height: ${y};

    pds-icon,
    pds-icon[size] {
      width: 1.15em;
      height: 1.15em;
    }
  }

  &.btn-xs.icon-only {
    padding: ${c};
    min-width: ${x};
    min-height: ${x};
    width: ${x};
    height: ${x};

    pds-icon,
    pds-icon[size] {
      width: 1.1em;
      height: 1.1em;
    }
  }

  &.btn-lg.icon-only {
    padding: ${p};
    min-width: ${b};
    min-height: ${b};
    width: ${b};
    height: ${b};

    pds-icon,
    pds-icon[size] {
      width: 1.25em;
      height: 1.25em;
    }
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

`}#ve(){return`/* Dropdown Component */

/* Basic dropdown host */
nav[data-dropdown] {
  position: relative;
  display: flex;
  padding: 0;

  &.split-button {
    display: inline-flex;
    align-items: stretch;
    gap: 0;

    & > [data-dropdown-default],
    & > [data-dropdown-toggle] {
      border-radius: 0;
      position: relative;
    }

    & > [data-dropdown-default] {
      border-start-start-radius: var(--radius-md);
      border-end-start-radius: var(--radius-md);
      border-inline-end: 0;
      padding-inline: var(--spacing-3);
      min-inline-size: 9.5rem;
      justify-content: center;
    }

    & > [data-dropdown-toggle] {
      border-start-end-radius: var(--radius-md);
      border-end-end-radius: var(--radius-md);
      inline-size: 2.5rem;
      min-inline-size: 2.5rem;
      padding-inline: 0;
      justify-content: center;
    }

    & > [data-dropdown-toggle] pds-icon,
    & > [data-dropdown-default] pds-icon {
      pointer-events: none;
    }
  }

  & > :last-child {
    position: absolute;
    padding: 0 var(--spacing-2);
    margin: 0;
    background: var(--color-surface-overlay);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    top: 100%;
    bottom: auto;
    left: 0;
    right: auto;
    margin-top: var(--spacing-2);
    --dropdown-transition-duration: var(--transition-fast, 160ms);
    --dropdown-closed-scale: 0.97;
    --dropdown-closed-translate-y: calc(var(--spacing-1) * -1);
    min-width: var(--dropdown-min-width, 12rem);
    width: max-content;
    inline-size: max-content;
    max-width: none;
    max-inline-size: none;
    opacity: 0;
    visibility: hidden;
    display: none;
    pointer-events: none;
    transform: translateY(var(--dropdown-closed-translate-y)) scale(var(--dropdown-closed-scale));
    transform-origin: top center;
    z-index: var(--z-dropdown, 1050);
    max-height: min(60vh, 24rem);
    overflow-x: hidden;
    overflow-y: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      transform var(--dropdown-transition-duration) ease,
      visibility 0s linear var(--dropdown-transition-duration),
      display 0s linear var(--dropdown-transition-duration);
    transition-behavior: allow-discrete;
  }

  & > :last-child[popover] {
    inset: auto;
    margin: 0;
  }

  & > :last-child[aria-hidden="false"],
  & > :last-child:popover-open {
    display: inline-block;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0) scale(1);
    transition:
      opacity var(--dropdown-transition-duration) ease,
      transform var(--dropdown-transition-duration) ease,
      visibility 0s linear 0s,
      display 0s linear 0s;
  }

  menu {
    list-style: none;
  }

  menu li {
    padding: var(--spacing-2) 0;

    & + li {
      border-top: var(--border-width-thin) solid var(--color-border);
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
      border-top: var(--border-width-thick) solid var(--color-border);
      margin: var(--spacing-2) 0;
    }
  }

  menu a {
    display: flex;
    color: var(--color-text-primary);
    text-decoration: none;
    align-items: center;
    gap: var(--spacing-2);

    &.danger {
      color: var(--color-danger-text);
    }
  }

  &.align-right,
  &[data-align="right"],
  &[data-align="end"],
  &[data-dropdown-align="right"],
  &[data-dropdown-align="end"] {
    & > :last-child {
      left: auto;
      right: 0;
    }
  }

  &[data-mode="up"],
  &[data-dropdown-direction="up"] {
    & > :last-child {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: var(--spacing-2);
      --dropdown-closed-translate-y: var(--spacing-1);
      transform-origin: bottom center;
    }
  }

  &[data-mode="down"],
  &[data-dropdown-direction="down"] {
    & > :last-child {
      top: 100%;
      bottom: auto;
      margin-top: var(--spacing-2);
      margin-bottom: 0;
      --dropdown-closed-translate-y: calc(var(--spacing-1) * -1);
      transform-origin: top center;
    }
  }

  &[data-mode="auto"]:not([data-dropdown-direction]) > :last-child {
    top: 100%;
    bottom: auto;
    margin-top: var(--spacing-2);
    margin-bottom: 0;
    --dropdown-closed-translate-y: calc(var(--spacing-1) * -1);
    transform-origin: top center;
  }

  @media (prefers-reduced-motion: reduce) {
    & > :last-child {
      transition-duration: 0.01s !important;
    }
  }
}

@starting-style {
  nav[data-dropdown] > :last-child[aria-hidden="false"],
  nav[data-dropdown] > :last-child:popover-open {
    opacity: 0;
    transform: translateY(var(--dropdown-closed-translate-y)) scale(var(--dropdown-closed-scale));
  }
}
`}#xe(){let{layout:t={}}=this.options.design,r=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},n=t.gridSystem||{},o=n.columns||[1,2,3,4,6],a=n.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=this.#E(t),s=[`
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

`];for(let d of o)s.push(`.grid-cols-${d} { grid-template-columns: repeat(${d}, 1fr); }
`);s.push(`
/* Auto-fit grids (responsive) */
`);for(let[d,l]of Object.entries(a))s.push(`.grid-auto-${d} { grid-template-columns: repeat(auto-fit, minmax(${l}, 1fr)); }
`);return s.push(`
/* Gap utilities */
.gap-0 { gap: 0; } .gap-xs { gap: var(--spacing-1); } .gap-sm { gap: var(--spacing-2); } .gap-md { gap: var(--spacing-4); } .gap-lg { gap: var(--spacing-6); } .gap-xl { gap: var(--spacing-8); }

`),s.push(`
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
.max-w-sm { max-width: var(--layout-max-width-sm, ${i.sm}); } .max-w-md { max-width: var(--layout-max-width-md, ${i.md}); } .max-w-lg { max-width: var(--layout-max-width-lg, ${i.lg}); } .max-w-xl { max-width: var(--layout-max-width-xl, ${i.xl}); }

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
@media (max-width: ${r.md-1}px) {
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
`),s.join("")}#we(){return`/* Media Element Utilities */

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

`}#ke(){let{layout:t={},a11y:r={}}=this.options.design,n=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},o=r.minTouchTarget||$.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

/* Small devices (${n.sm}px and up) */
@media (min-width: ${n.sm}px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } .sm\\:flex-row { flex-direction: row; } .sm\\:text-sm { font-size: var(--font-size-sm); } .sm\\:p-6 { padding: var(--spacing-6); } .sm\\:gap-6 { gap: var(--spacing-6); } .sm\\:hidden { display: none; } .sm\\:block { display: block; }
}

/* Medium devices (${n.md}px and up) */
@media (min-width: ${n.md}px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); } .md\\:text-lg { font-size: var(--font-size-lg); } .md\\:p-8 { padding: var(--spacing-8); } .md\\:gap-8 { gap: var(--spacing-8); } .md\\:flex-row { flex-direction: row; } .md\\:w-1\\/2 { width: 50%; } .md\\:w-1\\/3 { width: 33.333333%; } .md\\:hidden { display: none; } .md\\:block { display: block; }
}

/* Large devices (${n.lg}px and up) */
@media (min-width: ${n.lg}px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); } .lg\\:text-xl { font-size: var(--font-size-xl); } .lg\\:p-12 { padding: var(--spacing-12); } .lg\\:gap-12 { gap: var(--spacing-12); } .lg\\:w-1\\/4 { width: 25%; } .lg\\:hidden { display: none; } .lg\\:block { display: block; }
}

/* Touch device optimizations */
@media (pointer: coarse) {
  /* Touch devices - larger touch targets for interactive elements */
  select, textarea,
  input:not([type="radio"]):not([type="checkbox"]) {
    min-height: ${o}px;
    min-width: ${o}px;
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
    min-height: ${o}px;
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
      color: var(--color-link-hover);
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
    border-width: var(--border-width-medium);
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

`}#s(t){let r=parseInt(t.slice(1,3),16)/255,n=parseInt(t.slice(3,5),16)/255,o=parseInt(t.slice(5,7),16)/255,a=Math.max(r,n,o),i=Math.min(r,n,o),s,d,l=(a+i)/2;if(a===i)s=d=0;else{let u=a-i;switch(d=l>.5?u/(2-a-i):u/(a+i),a){case r:s=(n-o)/u+(n<o?6:0);break;case n:s=(o-r)/u+2;break;case o:s=(r-n)/u+4;break}s/=6}return{h:s*360,s:d*100,l:l*100}}#t(t,r,n){t=t/360,r=r/100,n=n/100;let o=(l,u,c)=>(c<0&&(c+=1),c>1&&(c-=1),c<1/6?l+(u-l)*6*c:c<1/2?u:c<2/3?l+(u-l)*(2/3-c)*6:l),a,i,s;if(r===0)a=i=s=n;else{let l=n<.5?n*(1+r):n+r-n*r,u=2*n-l;a=o(u,l,t+1/3),i=o(u,l,t),s=o(u,l,t-1/3)}let d=l=>{let u=Math.round(l*255).toString(16);return u.length===1?"0"+u:u};return`#${d(a)}${d(i)}${d(s)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#Se(){this.#e={tokens:this.#$e(),primitives:this.#ze(),components:this.#Le(),utilities:this.#Ce()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#$e(){let{colors:t,spacing:r,radius:n,borderWidths:o,typography:a,shadows:i,darkShadows:s,layout:d,transitions:l,zIndex:u,icons:c}=this.tokens,p=[`@layer tokens {
       :root {
          ${this.#q(t)}
          ${this.#G(r)}
          ${this.#K(n)}
          ${this.#J(o)}
          ${this.#Y(a)}
          ${this.#y(i)}
          ${this.#Z(d)}
          ${this.#X(l)}
          ${this.#Q(u)}
          ${this.#ee(c)}
       }
       ${this.#re(t,s)}
    }`];return p.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),p.push(this.#te(t,s)),p.join("")}#ze(){let{advanced:t={},a11y:r={},layout:n={}}=this.options.design,o=t.tabSize||$.TabSizes.standard,a=r.minTouchTarget||$.TouchTargetSizes.standard,i=n.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
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
    tab-size: ${o};
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

  /* Disabled primitive (low specificity): usable on any element via [disabled] or aria-disabled. */
  :where([disabled], [aria-disabled="true"]) {
    opacity: var(--state-disabled-opacity, 0.7);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Also dim/disable labels that contain disabled controls. */
  :where(label:has(:disabled), label:has([disabled])) {
    opacity: var(--state-disabled-opacity, 0.7);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Button primitives */
  :where(button) {
    all: unset;
    box-sizing: border-box;
    font: inherit;
    color: var(--color-primary-contrast, white);
    background: var(--color-primary-fill);
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
    min-height: ${a}px;
    touch-action: manipulation;
    user-select: none;
  }

  :where(button):hover:not(:disabled) {
    opacity: 0.9;
    background-color: var(--color-primary-fill-hover);
  }

  :where(button):focus-visible {
    outline: 2px solid var(--color-focus-ring, var(--color-primary-500));
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
    border: var(--border-width-thin) solid var(--color-border);
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
    border-color: var(--color-focus-ring, var(--color-primary-500));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-focus-ring, var(--color-primary-500)) 30%, transparent);
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
    color: var(--color-link, var(--color-primary-text, var(--color-primary-600)));
    text-decoration: underline;
    text-underline-offset: 0.2em;
    transition: color var(--transition-fast), opacity var(--transition-fast);
  }

  :where(a):hover {
    color: var(--color-link-hover, var(--color-link, var(--color-primary-text, var(--color-primary-600))));
    opacity: 0.9;
  }

  :where(a):visited {
    color: var(--color-link-visited, var(--color-link, var(--color-primary-text, var(--color-primary-600))));
  }

  :where(a):focus-visible {
    outline: 2px solid var(--color-focus-ring, var(--color-primary-500));
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  ::selection {
    background: var(--color-selection-bg, var(--color-primary-text, var(--color-primary-600)));
    color: var(--color-selection-text, var(--color-primary-contrast, #ffffff));
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
  :where(
    label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"])
  ) {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-left: calc(var(--spacing-5) + var(--spacing-3));

    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      width: 1px;
      height: 1px;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: var(--spacing-5);
      height: var(--spacing-5);
      border: var(--border-width-medium) solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-surface-base);
      transition: all var(--transition-fast);
      flex-shrink: 0;
    }

    &:has(input[type="checkbox"]:checked)::after {
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

    &:has(input[type="checkbox"]:checked)::before {
      background: var(--color-primary-fill);
      border-color: var(--color-primary-fill);
    }

    &:has(input[type="checkbox"]:focus)::before {
      outline: 2px solid var(--color-focus-ring, var(--color-primary-500));
      outline-offset: 2px;
    }

    &:has(input[type="checkbox"]:not(:disabled)):hover::before {
      border-color: var(--color-primary-fill);
      background: var(--color-surface-subtle);
    }

    &:has(input[type="checkbox"]:checked:not(:disabled)):hover::before {
      background: var(--color-primary-fill-hover);
      border-color: var(--color-primary-fill-hover);
    }

    &:has(input[type="checkbox"]:disabled) {
      opacity: 0.5;
      cursor: not-allowed;
    }
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
    border-radius: var(--radius-sm);
  }

  :where(img:not([height]):not([width]), video:not([height]):not([width])) {
    height: auto;
    max-width: 100%;   
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

`}#Le(){return`@layer components {

${this.#ce()}

${this.#de()}

${this.#pe()}

${this.#ge()}

${this.#me()}

${this.#fe()}

${this.#ve()}

${this.#he()}

${this.#ue()}

/* Card component */

.card {
  background: var(--color-surface-base);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}

:where(.card:has(> header):has(> footer)) {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: var(--spacing-4);
}

:where(.card > footer) {
  display: flex;
  justify-content: space-evenly;
}

:where(.card > header > :last-child:not(:first-child)) {
  color: var(--color-text-muted);
}

.card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
}

.card-outlined,
.card-basic {
  background: var(--color-surface-base);
  border: var(--border-width-thin) solid var(--color-border);
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

${this.#be()}

${this.#ae()}

}
`}#Ce(){return`@layer utilities {

${this.#ye()}

${this.#xe()}

/* Optional utilities/features controlled by config options */
/* - Body background mesh rule (applies one of the generated mesh vars) */
/* - Liquid glass utility class */
${this.#ie()}
${this.#se()}

${this.#le()}

/* Surface utilities */

.surface {
  background-color: var(--color-surface-base);
  --border-gradient-fill: var(--color-surface-base);
}

.surface-subtle {
  background-color: var(--color-surface-subtle);
  --border-gradient-fill: var(--color-surface-subtle);
}

.surface-elevated {
  background-color: var(--color-surface-elevated);
  --border-gradient-fill: var(--color-surface-elevated);
}

.surface-sunken {
  background-color: var(--color-surface-sunken);
  --border-gradient-fill: var(--color-surface-sunken);
}

.surface-overlay {
  background-color: var(--color-surface-overlay);
  --border-gradient-fill: var(--color-surface-overlay);
}

/* Translucent semantic variants */
.surface-translucent {
  background-color: var(--color-surface-translucent-50);
  --border-gradient-fill: var(--color-surface-translucent-50);
}

.surface-translucent-25 {
  background-color: var(--color-surface-translucent-25);
  --border-gradient-fill: var(--color-surface-translucent-25);
}

.surface-translucent-50 {
  background-color: var(--color-surface-translucent-50);
  --border-gradient-fill: var(--color-surface-translucent-50);
}

.surface-translucent-75 {
  background-color: var(--color-surface-translucent-75);
  --border-gradient-fill: var(--color-surface-translucent-75);
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
  --border-gradient-fill: var(--color-surface-inverse);
  color: var(--surface-inverse-text);

  pds-icon {
    color: var(--surface-inverse-icon);
  }
  
  /* btn-primary stays vibrant in any context */
  & .btn-primary {
    background-color: var(--color-primary-fill);
    border-color: var(--color-primary-fill);
    color: var(--color-primary-contrast, #ffffff);
    
    &:hover {
      background-color: var(--color-primary-fill-hover);
      border-color: var(--color-primary-fill-hover);
    }
  }
}

/* Light-mode inverse: apply dark semantic tokens */
html:not([data-theme="dark"]) .surface-inverse {
  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  --color-surface-muted: rgba(255, 255, 255, 0.08);
  
  & button:not(.btn-primary):not(.btn-outline):not(.btn-danger),
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
    color: var(--color-link);
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
  
  & button:not(.btn-primary):not(.btn-outline):not(.btn-danger),
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
    color: var(--color-link);
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


${this.#we()}

${this.#ke()}

}
`}#Ae(){this.#a={tokens:new CSSStyleSheet,primitives:new CSSStyleSheet,components:new CSSStyleSheet,utilities:new CSSStyleSheet},this.#Ee()}#Ee(){this.#a.tokens.replaceSync(this.#e.tokens),this.#a.primitives.replaceSync(this.#e.primitives),this.#a.components.replaceSync(this.#e.components),this.#a.utilities.replaceSync(this.#e.utilities)}get tokensCSS(){return this.#e?.tokens||""}get primitivesCSS(){return this.#e?.primitives||""}get componentsCSS(){return this.#e?.components||""}get utilitiesCSS(){return this.#e?.utilities||""}get layeredCSS(){return this.#e?`${this.#e.tokens}
${this.#e.primitives}
${this.#e.components}
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof K<"u"?K:null,enums:typeof $<"u"?$:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let t=[],r=this.tokens.colors;for(let[n,o]of Object.entries(r))typeof o=="object"&&o!==null&&t.push({name:n,scale:o});return t},getColorScale:t=>this.tokens.colors[t]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([t,r])=>({key:t,value:r})),getTypography:()=>this.tokens.typography,getLayerCSS:t=>{let r=["tokens","primitives","components","utilities"];if(!r.includes(t))throw new Error(`Invalid layer: ${t}. Must be one of ${r.join(", ")}`);return this.#e?.[t]||""},usesEnumValue:(t,r)=>{let n=this.options.design||{};return JSON.stringify(n).includes(r)}}}}get tokensStylesheet(){return this.#a?.tokens}get primitivesStylesheet(){return this.#a?.primitives}get componentsStylesheet(){return this.#a?.components}get utilitiesStylesheet(){return this.#a?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#d("tokens",this.#e.tokens),"pds-primitives.css.js":this.#d("primitives",this.#e.primitives),"pds-components.css.js":this.#d("components",this.#e.components),"pds-utilities.css.js":this.#d("utilities",this.#e.utilities),"pds-styles.css.js":this.#d("styles",this.layeredCSS)}}#d(t,r){let n=r.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${t}
// Auto-generated - do not edit directly

export const ${t} = new CSSStyleSheet();
${t}.replaceSync(\`${n}\`);

export const ${t}CSS = \`${n}\`;
`}};function jr(e={},t={}){let r=Number(t.minContrast||4.5),n=Number(t.minMutedContrast||3),o=!!t.extendedChecks,a=t.warnOnHueDrift!==!1,i=Number.isFinite(Number(t.maxHueDrift))?Number(t.maxHueDrift):35,s=Number.isFinite(Number(t.minSaturationForHueWarning))?Number(t.minSaturationForHueWarning):18,d=g=>{let y=String(g||"").trim().match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);if(!y)return null;let x=y[1];return`#${(x.length===3?x.split("").map(S=>S+S).join(""):x).toLowerCase()}`},l=g=>{let f=d(g);if(!f)return null;let y=f.replace("#",""),x=y.length===3?y.split("").map(S=>S+S).join(""):y,b=parseInt(x||"0",16);return{r:b>>16&255,g:b>>8&255,b:b&255}},u=g=>{let f=l(g);if(!f)return 0;let{r:y,g:x,b}=f,S=[y/255,x/255,b/255].map(C=>C<=.03928?C/12.92:Math.pow((C+.055)/1.055,2.4));return .2126*S[0]+.7152*S[1]+.0722*S[2]},c=(g,f)=>{if(!g||!f)return 0;let y=u(g),x=u(f),b=Math.max(y,x),S=Math.min(y,x);return(b+.05)/(S+.05)},p=g=>{let f=l(g);if(!f)return null;let y=f.r/255,x=f.g/255,b=f.b/255,S=Math.max(y,x,b),C=Math.min(y,x,b),A=S-C,T=0;A!==0&&(S===y?T=(x-b)/A%6:S===x?T=(b-y)/A+2:T=(y-x)/A+4,T*=60,T<0&&(T+=360));let I=(S+C)/2,E=A===0?0:A/(1-Math.abs(2*I-1));return{h:T,s:E*100,l:I*100}},m=(g,f)=>{if(!Number.isFinite(g)||!Number.isFinite(f))return null;let y=Math.abs(g-f);return Math.min(y,360-y)},h=[],v=[];try{let f=new X({design:structuredClone(e)}).tokens.colors,y={surfaceBg:f.surface?.base,surfaceText:f.gray?.[900]||"#000000",surfaceTextSecondary:f.gray?.[700]||f.gray?.[800]||f.gray?.[900],surfaceTextMuted:f.gray?.[500]||f.gray?.[600]||f.gray?.[700],surfaceElevated:f.surface?.elevated||f.surface?.base,primaryFill:f.interactive?.light?.fill||f.primary?.[600],primaryText:f.interactive?.light?.text||f.primary?.[600],accentFill:f.accent?.[600]||f.accent?.[500],successFill:f.success?.[600]||f.success?.[500],warningFill:f.warning?.[600]||f.warning?.[500],dangerFill:f.danger?.[600]||f.danger?.[500],infoFill:f.info?.[600]||f.info?.[500]},x=T=>Math.max(c(T,"#ffffff"),c(T,"#000000")),b=c(y.primaryFill,"#ffffff");b<r&&h.push({path:"/colors/primary",message:`Primary button contrast too low in light theme (${b.toFixed(2)} < ${r}). Choose a darker primary.`,ratio:b,min:r,context:"light/btn-primary"});let S=c(y.surfaceBg,y.surfaceText);if(S<r&&h.push({path:"/colors/background",message:`Base text contrast on surface (light) is too low (${S.toFixed(2)} < ${r}). Adjust background or secondary (gray).`,ratio:S,min:r,context:"light/surface-text"}),o){let T=c(y.surfaceBg,y.surfaceTextSecondary);T<r&&h.push({path:"/colors/secondary",message:`Secondary text contrast on base surface (light) is too low (${T.toFixed(2)} < ${r}).`,ratio:T,min:r,context:"light/surface-text-secondary"});let I=c(y.surfaceBg,y.surfaceTextMuted);I<n&&h.push({path:"/colors/secondary",message:`Muted text contrast on base surface (light) is too low (${I.toFixed(2)} < ${n}).`,ratio:I,min:n,context:"light/surface-text-muted"});let E=c(y.surfaceElevated,y.surfaceText);E<r&&h.push({path:"/colors/background",message:`Elevated surface text contrast (light) is too low (${E.toFixed(2)} < ${r}).`,ratio:E,min:r,context:"light/surface-elevated-text"})}let C=c(y.primaryText,y.surfaceBg);C<r&&h.push({path:"/colors/primary",message:`Primary text on surface is too low for outline/link styles (light) (${C.toFixed(2)} < ${r}). Choose a darker primary or lighter surface.`,ratio:C,min:r,context:"light/outline"}),o&&[{path:"/colors/accent",key:"accent",value:y.accentFill},{path:"/colors/success",key:"success",value:y.successFill},{path:"/colors/warning",key:"warning",value:y.warningFill},{path:"/colors/danger",key:"danger",value:y.dangerFill},{path:"/colors/info",key:"info",value:y.infoFill}].forEach(I=>{if(!I?.value)return;let E=x(I.value);E<r&&h.push({path:I.path,message:`${I.key} fill color cannot achieve accessible text contrast (${E.toFixed(2)} < ${r}) with either white or black text.`,ratio:E,min:r,context:`light/${I.key}-fill`})});let A=f.dark;if(A){let T={surfaceBg:A.surface?.base||f.surface?.inverse,surfaceText:A.gray?.[50]||A.gray?.[100]||"#ffffff",surfaceTextMuted:A.gray?.[300]||A.gray?.[400]||A.gray?.[500],primaryFill:f.interactive?.dark?.fill||A.primary?.[600],primaryText:f.interactive?.dark?.text||A.primary?.[600]},I=c(T.primaryFill,"#ffffff");I<r&&h.push({path:"/colors/darkMode/primary",message:`Primary button contrast too low in dark theme (${I.toFixed(2)} < ${r}). Override darkMode.primary or pick a brighter hue.`,ratio:I,min:r,context:"dark/btn-primary"});let E=c(T.primaryText,T.surfaceBg);if(E<r&&h.push({path:"/colors/darkMode/primary",message:`Primary text on surface is too low for outline/link styles (dark) (${E.toFixed(2)} < ${r}). Override darkMode.primary/background.`,ratio:E,min:r,context:"dark/outline"}),o){let j=c(T.surfaceBg,T.surfaceText);j<r&&h.push({path:"/colors/darkMode/background",message:`Base text contrast on surface (dark) is too low (${j.toFixed(2)} < ${r}).`,ratio:j,min:r,context:"dark/surface-text"});let M=c(T.surfaceBg,T.surfaceTextMuted);M<n&&h.push({path:"/colors/darkMode/secondary",message:`Muted text contrast on surface (dark) is too low (${M.toFixed(2)} < ${n}).`,ratio:M,min:n,context:"dark/surface-text-muted"})}}if(a){let T=e?.colors||{},I=T?.darkMode||{};["primary","secondary","accent"].forEach(j=>{let M=T?.[j],z=I?.[j];if(!M||!z)return;let L=p(M),R=p(z);if(!L||!R||L.s<s&&R.s<s)return;let k=m(L.h,R.h);k==null||k<=i||v.push({path:`/colors/darkMode/${j}`,message:`Dark mode ${j} hue drifts ${k.toFixed(1)}deg from light ${j} (${L.h.toFixed(1)}deg -> ${R.h.toFixed(1)}deg). This may reduce cross-theme brand identity consistency.`,context:`dark/identity-hue-${j}`})})}}catch(g){h.push({path:"/",message:`Validation failed: ${String(g?.message||g)}`,ratio:0,min:0})}return{ok:h.length===0,issues:h,warnings:v}}var ho=new Set(["log","warn","error","debug","info"]),bo="__PURE_DS_PDS_SINGLETON__",Ut=null,qt=null;function Dr(){try{let t=(typeof globalThis<"u"?globalThis:window)?.[bo];if(t&&typeof t=="object")return t}catch{return null}return null}function yo(e){return!e||typeof e!="object"?null:{mode:e.mode==="live"||e.mode==="static"?e.mode:null,debug:e.debug===!0,thisArg:e.thisArg}}function vo(e){if(typeof e!="string")return"log";let t=e.toLowerCase();return ho.has(t)?t:"log"}function xo(){if(typeof qt=="function")try{let t=yo(qt());if(t)return t}catch{}let e=Dr();if(e){let t=e?.mode||e?.compiled?.mode||(e?.registry?.isLive?"live":"static"),r=(e?.debug||e?.currentConfig?.debug||e?.currentConfig?.design?.debug||e?.compiled?.debug||e?.compiled?.design?.debug||!1)===!0;return{mode:t,debug:r,thisArg:e}}return{mode:null,debug:!1}}function wo(){if(typeof Ut=="function")try{let t=Ut();if(typeof t=="function")return t}catch{}let e=Dr();return typeof e?.logHandler=="function"?e.logHandler:null}function Br(e,t,...r){if(typeof console>"u")return;let n=typeof console[e]=="function"?console[e].bind(console):typeof console.log=="function"?console.log.bind(console):null;n&&(r.length>0?n(t,...r):n(t))}function ko(e,t){let r=t?.debug===!0;return!(t?.mode==="static"&&!r||!r&&e!=="error"&&e!=="warn")}function Hr({getLogger:e,getContext:t}={}){Ut=typeof e=="function"?e:null,qt=typeof t=="function"?t:null}function tt(e="log",t,...r){let n=vo(e),o=xo(),a=wo();if(a)try{a.call(o?.thisArg,n,t,...r);return}catch(i){Br("error","Custom log handler failed:",i)}ko(n,o)&&Br(n,t,...r)}var So="en",N={defaultLocale:So,provider:null,messagesByLocale:new Map,loadingByLocale:new Map,observer:null,reconcileTimer:null,requestedKeys:new Set,textNodeKeyMap:new WeakMap,attributeKeyMap:new WeakMap,valueToKeys:new Map,missingWarnings:new Set},$o=["title","placeholder","aria-label","aria-description","aria-placeholder","aria-roledescription","alt","label"],zo=e=>!!e&&typeof e!="string"&&typeof e=="object"&&"strTag"in e;function ie(e){return String(e||"").trim().toLowerCase()}function Lo(e){let t=ie(e);return t?t.split("-")[0]||t:""}function pe(e){let t=ie(e);if(!t)return N.defaultLocale;let r=N.provider?.resolveLocale;if(typeof r=="function"){let n=ie(r(e));if(n)return n}return t}function Co(e){let t="";for(let r=0;r<=e.length-1;r+=1)t+=e[r],r<e.length-1&&(t+=`{${r}}`);return t}function ve(e,t){return String(e).replace(/\{(\d+)\}/g,(r,n)=>t(Number(n)))}function Vt(e){if(!e||typeof e!="object")return{};let t={};for(let[r,n]of Object.entries(e)){if(typeof n=="string"){t[r]=n;continue}n&&typeof n=="object"&&typeof n.content=="string"&&(t[r]=n.content)}return t}function Ao(e){let t=ie(e);if(!t)return[N.defaultLocale];let r=Lo(t);return!r||r===t?[t]:[t,r]}function Wr(e,t){let r=pe(e);N.messagesByLocale.set(r,Vt(t))}function Vr(e){typeof e=="string"&&e.length>0&&N.requestedKeys.add(e)}function Ur(e,t){if(typeof e!="string"||!e.length)return;let r=typeof t=="string"?t:String(t||"");r.length&&(N.valueToKeys.has(r)||N.valueToKeys.set(r,new Set),N.valueToKeys.get(r).add(e))}function Oe(e){let t=Ao(e);for(let r of t)if(N.messagesByLocale.has(r))return{locale:r,messages:N.messagesByLocale.get(r)};return null}async function xe(e,t="explicit"){let r=pe(e),n=Oe(r);if(n)return n.messages;let o=r;if(N.loadingByLocale.has(o))return N.loadingByLocale.get(o);if(!N.provider)return{};let a=N.provider.loadLocale||N.provider.setLocale||null;if(typeof a!="function")return{};let i={locale:r,defaultLocale:N.defaultLocale,reason:t,loadedLocales:Array.from(N.messagesByLocale.keys()),messages:{...Oe(r)?.messages||{}},load:t==="set-default"||t==="explicit-load"},s;try{s=a(i)}catch{return{}}if(s&&typeof s.then=="function"){let l=s.then(u=>{let c=Vt(u);return Wr(r,c),c}).catch(()=>({})).finally(()=>{N.loadingByLocale.delete(o)});return N.loadingByLocale.set(o,l),l}let d=Vt(s);return Wr(r,d),d}function Eo(e){if(!e||typeof e!="object")return"";let r=typeof Element<"u"&&e instanceof Element||e?.nodeType===1?e:null;if(!r)return"";if(r.hasAttribute?.("lang"))return ie(r.getAttribute("lang"));let n=r.closest?.("[lang]");return n&&n.getAttribute?ie(n.getAttribute("lang")):""}function je(e={}){if(typeof e?.lang=="string"&&e.lang.trim())return pe(e.lang);let t=e?.element||e?.scope||e?.host||e?.contextElement||null,r=Eo(t);if(r)return pe(r);if(typeof document<"u"&&document.documentElement){let n=ie(document.documentElement.getAttribute("lang"));if(n)return pe(n)}return N.defaultLocale}function Mo(){let e=new Set([N.defaultLocale]);if(typeof document>"u")return e;let t=ie(document.documentElement?.getAttribute?.("lang"));t&&e.add(pe(t));let r=document.querySelectorAll?.("[lang]")||[];for(let n of r){let o=ie(n.getAttribute("lang"));o&&e.add(pe(o))}return e}async function To(e){for(let t of e)await xe(t,"lang-detected")}function Ro(e){for(let t of Array.from(N.messagesByLocale.keys()))e.has(t)||N.messagesByLocale.delete(t)}function Io(e){let t=String(e||""),r=(t.match(/^\s*/)||[""])[0],n=(t.match(/\s*$/)||[""])[0],o=r.length,a=t.length-n.length,i=a>=o?t.slice(o,a):"";return{leading:r,core:i,trailing:n}}function qr(e){return String(e||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _o(e,t){let r=typeof e=="string"?e:String(e||""),n=typeof t=="string"?t:String(t||""),o=/\{(\d+)\}/g,a=Array.from(r.matchAll(o));if(!a.length)return r===n?[]:null;let i=[],s="^",d=0;for(let c of a){let p=c.index??0;s+=qr(r.slice(d,p)),s+="([\\s\\S]*?)",i.push(Number(c[1])),d=p+c[0].length}s+=qr(r.slice(d)),s+="$";let l=new RegExp(s).exec(n);if(!l)return null;let u=[];for(let c=1;c<l.length;c+=1){let p=i[c-1],m=l[c];if(Object.prototype.hasOwnProperty.call(u,p)&&u[p]!==m)return null;u[p]=m}return u}function Gt(e,t){if(typeof e!="string"||!e.length)return[];let r=[e];for(let[,n]of N.messagesByLocale.entries()){let o=n?.[e];typeof o=="string"&&o.length&&r.push(o)}for(let n of r){let o=_o(n,t);if(o)return o}return[]}function Gr(e){if(!e)return null;let t=N.valueToKeys.get(e);if(t&&t.size>0){for(let n of t)if(N.requestedKeys.has(n))return n}if(N.requestedKeys.has(e))return e;let r=Array.from(N.messagesByLocale.entries());for(let n of N.requestedKeys)for(let[,o]of r)if(o&&o[n]===e)return n;return null}function Kr(e){if(!e)return null;let t=null;for(let[r,n]of N.valueToKeys.entries()){if(typeof r!="string"||!r.length||r===e)continue;let o=e.indexOf(r);if(o!==-1)for(let a of n){if(!N.requestedKeys.has(a))continue;let i=Gt(a,r),s={key:a,matchedText:r,start:o,end:o+r.length,values:i};(!t||s.matchedText.length>t.matchedText.length)&&(t=s);break}}return t}async function Fo(e){if(!e||e.nodeType!==3)return;let t=e.parentElement||null;if(!t)return;let{leading:r,core:n,trailing:o}=Io(e.nodeValue);if(!n)return;let a=N.textNodeKeyMap.get(e)||null;if((!a||!N.requestedKeys.has(a))&&(a=Gr(n)),!a){let c=Kr(n);if(!c)return;let p=je({element:t});await xe(p,"text-node");let m=we(c.key,c.values,{element:t},null),h=c.values.length?ve(m,f=>c.values[f]):m,v=n.slice(0,c.start)+h+n.slice(c.end),g=`${r}${v}${o}`;g!==e.nodeValue&&(e.nodeValue=g);return}N.textNodeKeyMap.set(e,a);let i=je({element:t});await xe(i,"text-node");let s=Gt(a,n),d=we(a,s,{element:t},null),l=s.length?ve(d,c=>s[c]):d,u=`${r}${l}${o}`;u!==e.nodeValue&&(e.nodeValue=u)}async function Po(){if(typeof document>"u"||N.requestedKeys.size===0)return;let e=document.body||document.documentElement;if(!e||typeof document.createTreeWalker!="function")return;let t=[],r=new Set,n=a=>{!a||r.has(a)||(r.add(a),t.push(a))};n(e);for(let a=0;a<t.length;a+=1){let i=t[a];if(!i||typeof i.querySelectorAll!="function")continue;let s=i.querySelectorAll("*");for(let d of s){let l=d?.shadowRoot;l&&n(l)}}let o=[];for(let a of t){let i=document.createTreeWalker(a,NodeFilter.SHOW_TEXT);for(;i.nextNode();)o.push(i.currentNode)}for(let a of o)await Fo(a)}function No(e){let t=N.attributeKeyMap.get(e);return t||(t=new Map,N.attributeKeyMap.set(e,t)),t}async function Oo(e,t){if(!e||typeof e.getAttribute!="function")return;let r=e.getAttribute(t);if(typeof r!="string"||!r.length)return;let n=No(e),o=n.get(t)||null;if((!o||!N.requestedKeys.has(o))&&(o=Gr(r)),!o){let l=Kr(r);if(!l)return;let u=je({element:e});await xe(u,"attribute");let c=we(l.key,l.values,{element:e},null),p=l.values.length?ve(c,h=>l.values[h]):c,m=r.slice(0,l.start)+p+r.slice(l.end);m!==r&&e.setAttribute(t,m),n.set(t,l.key);return}n.set(t,o);let a=je({element:e});await xe(a,"attribute");let i=Gt(o,r),s=we(o,i,{element:e},null),d=i.length?ve(s,l=>i[l]):s;d!==r&&e.setAttribute(t,d)}async function jo(){if(typeof document>"u"||N.requestedKeys.size===0)return;let e=document.body||document.documentElement;if(!e)return;let t=[],r=new Set,n=o=>{!o||r.has(o)||(r.add(o),t.push(o))};n(e);for(let o=0;o<t.length;o+=1){let a=t[o];if(!a||typeof a.querySelectorAll!="function")continue;let i=a.querySelectorAll("*");for(let s of i){let d=s?.shadowRoot;d&&n(d)}}for(let o of t){if(!o||typeof o.querySelectorAll!="function")continue;let a=o.querySelectorAll("*");for(let i of a)for(let s of $o)i.hasAttribute(s)&&await Oo(i,s)}}async function Bo(){let e=Mo();await To(e),await Po(),await jo(),Ro(e)}function Do(){typeof window>"u"||(N.reconcileTimer&&clearTimeout(N.reconcileTimer),N.reconcileTimer=setTimeout(()=>{N.reconcileTimer=null,Bo()},16))}function we(e,t=[],r={},n=null){let o=je(r),a=Oe(o);a||xe(o,"msg");let i=Oe(o)?.messages||{},s=Oe(N.defaultLocale)?.messages||{},d={key:e,values:t,options:r,locale:o,defaultLocale:N.defaultLocale,messages:i,messagesByLocale:Object.fromEntries(Array.from(N.messagesByLocale.entries())),template:n},l,u=!!a,c=o===N.defaultLocale;typeof N.provider?.translate=="function"&&(l=N.provider.translate(d));let p=null;if(l==null&&(l=i[e]),l==null&&(l=s[e],p=l==null?null:"default"),l==null&&(l=e,p="key"),u&&!c&&p){let h=`${o}::${e}`;N.missingWarnings.has(h)||(N.missingWarnings.add(h),tt("warn",`[i18n] Missing translation for locale "${o}" and key "${e}"; using ${p} fallback.`))}let m=typeof l=="string"?l:String(l);if(Ur(e,m),Array.isArray(t)&&t.length>0){let h=ve(m,v=>t[v]);h!==m&&Ur(e,h)}return m}var Ho=(e,t,r={})=>{let n=Co(e);Vr(n);let o=we(n,t,r,{strings:e,values:t});return ve(o,a=>t[a])};var Q=(e,t={})=>{if(!e)return"";if(zo(e))return Ho(e.strings,e.values,t);let r=String(e);Vr(r);let n=we(r,[],t,null);return!t?.element&&!t?.scope&&!t?.host&&!t?.contextElement&&!t?.lang&&Do(),n};var Jt=class extends EventTarget{constructor(){super(),this.mode=null,this.compiled=null,this.log=()=>{},this.logHandler=null}},Jr="__PURE_DS_PDS_SINGLETON__",Yt=typeof globalThis<"u"?globalThis:window,Kt=Yt?.[Jr],w=Kt&&typeof Kt.addEventListener=="function"?Kt:new Jt;Yt&&(Yt[Jr]=w);typeof w.log!="function"&&(w.log=(e="log",t,...r)=>{if(typeof console>"u")return;let n=typeof console[e]=="function"?console[e].bind(console):typeof console.log=="function"?console.log.bind(console):null;n&&(r.length>0?n(t,...r):n(t))});typeof w.logHandler!="function"&&(w.logHandler=null);var Zt=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(t={}){this._mode="static",this._staticPaths={...this._staticPaths,...t}}async getStylesheet(t){if(this._mode==="live")return null;try{return(await import(this._staticPaths[t]))[t]}catch(r){w.log("error",`Registry: failed to load static ${t}:`,r),w.log("error",`Registry: looking for ${this._staticPaths[t]}`),w.log("error","Registry: make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");let n=new CSSStyleSheet;return n.replaceSync("/* Failed to load "+t+" */"),n}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},ke=new Zt;function Wo(e){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let n=new CSSStyleSheet;n.replaceSync(e),n._pds=!0;let o=(document.adoptedStyleSheets||[]).filter(a=>a._pds!==!0);document.adoptedStyleSheets=[...o,n];return}let t="pds-runtime-stylesheet",r=document.getElementById(t);if(!r){r=document.createElement("style"),r.id=t,r.type="text/css";let n=document.head||document.getElementsByTagName("head")[0];n?n.appendChild(r):document.documentElement.appendChild(r)}r.textContent=e}catch(t){w.log("warn","installRuntimeStyles failed:",t)}}function Yr(e){let t=e;if(!t||typeof t!="object"){w.log("error","Runtime applyStyles requires an explicit generator instance in live mode");return}let r=t.layeredCSS||t.css||"";if(!r){t.options?.log?.("warn","Runtime: no CSS available on generator to apply");return}Wo(r)}async function rt(e,t=[],r=null){try{let n=r?.primitivesStylesheet?r.primitivesStylesheet:await ke.getStylesheet("primitives");e.adoptedStyleSheets=[n,...t]}catch(n){let o=e.host?.tagName?.toLowerCase()||"unknown";w.log("error",`Adopter: <${o}> failed to adopt primitives:`,n),e.adoptedStyleSheets=t}}async function nt(e,t=["primitives"],r=[],n=null){let o=Array.isArray(r)?r.filter(Boolean):[];if(o.length){let i=(Array.isArray(e.adoptedStyleSheets)?e.adoptedStyleSheets:[]).filter(s=>!o.includes(s));e.adoptedStyleSheets=[...i,...o]}try{let i=(await Promise.all(t.map(async s=>{if(n)switch(s){case"tokens":return n.tokensStylesheet;case"primitives":return n.primitivesStylesheet;case"components":return n.componentsStylesheet;case"utilities":return n.utilitiesStylesheet;default:break}return ke.getStylesheet(s)}))).filter(s=>s!==null);e.adoptedStyleSheets=[...i,...o]}catch(a){let i=e.host?.tagName?.toLowerCase()||"unknown";w.log("error",`Adopter: <${i}> failed to adopt layers:`,a),e.adoptedStyleSheets=o}}function Zr(e){let t=new CSSStyleSheet;return t.replaceSync(e),t}var Uo=[{selector:".accordion"},{selector:"nav[data-dropdown]"},{selector:"label[data-toggle]"},{selector:"label[data-color]"},{selector:'input[autocomplete="one-time-code"]'},{selector:'input[type="range"]'},{selector:"form[data-required]"},{selector:"fieldset[role=group][data-open]"},{selector:"[data-clip]"},{selector:"button, a[class*='btn-']"}];function qo(e){e.dataset.enhancedAccordion||(e.dataset.enhancedAccordion="true",e.addEventListener("toggle",t=>{t.target.open&&t.target.parentElement===e&&e.querySelectorAll(":scope > details[open]").forEach(r=>{r!==t.target&&(r.open=!1)})},!0))}function Vo(e){if(e.dataset.enhancedDropdown)return;e.dataset.enhancedDropdown="true";let t=e.lastElementChild,r=e.classList.contains("split-button");if(!t)return;let n=e.querySelector("[data-dropdown-toggle]")||e.querySelector("button"),o=typeof HTMLElement<"u"&&"showPopover"in HTMLElement.prototype&&"hidePopover"in HTMLElement.prototype;n&&!n.hasAttribute("type")&&n.setAttribute("type","button"),t.id||(t.id=`dropdown-${Math.random().toString(36).slice(2,9)}`);let a=t.tagName?.toLowerCase()==="menu",i=8;a&&!t.hasAttribute("role")&&t.setAttribute("role","menu"),t.hasAttribute("aria-hidden")||t.setAttribute("aria-hidden","true"),n&&(n.setAttribute("aria-haspopup","true"),n.setAttribute("aria-controls",t.id),n.setAttribute("aria-expanded","false"),n.setAttribute("popovertarget",t.id));let s=()=>!r||!a?null:t.querySelector(":scope > li[data-default]")||t.querySelector(":scope > li"),d=k=>k?k.querySelector(":scope > a, :scope > button")||k.firstElementChild:null,l=()=>{if(!r||!n)return null;let k=e.querySelector(":scope > [data-dropdown-default]");return k||(k=document.createElement("button"),k.setAttribute("type","button"),k.setAttribute("data-dropdown-default",""),k.className=n.className,e.insertBefore(k,n),k)},u=(k,_)=>{if(!k||!_)return;k.replaceChildren(...Array.from(_.childNodes).map(B=>B.cloneNode(!0)));let O=_.getAttribute("aria-label")||_.textContent?.replace(/\s+/g," ").trim()||Q("Default action");k.setAttribute("aria-label",O),k.title=O},c=()=>{if(!r)return;let k=l(),_=s(),O=d(_);if(!k||!O)return;u(k,O);let B=()=>{O&&typeof O.click=="function"&&O.click()};k.addEventListener("click",F=>{F.preventDefault(),B()})};if(!o){let k="__PDS_DROPDOWN_POPOVER_WARNED__";globalThis[k]||(globalThis[k]=!0,console.warn("[PDS] nav[data-dropdown] requires the Popover API. Add a popover polyfill (recommended: @oddbird/popover-polyfill) for browsers without support."));return}c(),t.setAttribute("popover","auto");let p=()=>{let k=t.getAttribute("style");t.style.visibility="hidden",t.style.display="inline-block",t.style.pointerEvents="none";let _=t.getBoundingClientRect(),O=Math.max(t.offsetWidth||0,t.scrollWidth||0,_.width||0,1),B=Math.max(t.offsetHeight||0,t.scrollHeight||0,_.height||0,1);return k===null?t.removeAttribute("style"):t.setAttribute("style",k),{width:O,height:B}},m=()=>{try{return t.matches(":popover-open")}catch{return!1}},h=()=>{t.setAttribute("aria-hidden","true"),n?.setAttribute("aria-expanded","false")},v=()=>{t.setAttribute("aria-hidden","false"),n?.setAttribute("aria-expanded","true")},g=()=>{let k=(e.getAttribute("data-direction")||e.getAttribute("data-dropdown-direction")||e.getAttribute("data-mode")||"auto").toLowerCase();if(k==="up"||k==="down")return k;let _=(n||e).getBoundingClientRect(),{height:O}=p(),B=Math.max(0,window.innerHeight-_.bottom),F=Math.max(0,_.top),H=B>=O,W=F>=O;return H&&!W?"down":W&&!H?"up":H&&W?"down":F>B?"up":"down"},f=()=>{if(r)return"right";let k=(e.getAttribute("data-align")||e.getAttribute("data-dropdown-align")||"auto").toLowerCase();if(k==="left"||k==="right"||k==="start"||k==="end")return k==="start"?"left":k==="end"?"right":k;let _=(n||e).getBoundingClientRect(),{width:O}=p(),B=Math.max(0,window.innerWidth-_.left),F=Math.max(0,_.right),H=B>=O,W=F>=O;return H&&!W?"left":W&&!H?"right":H&&W?"left":F>B?"right":"left"},y=(k,_=8)=>{let O=getComputedStyle(e).getPropertyValue(k).trim();if(!O)return _;let B=document.createElement("span");B.style.position="fixed",B.style.visibility="hidden",B.style.pointerEvents="none",B.style.height=O,document.body.appendChild(B);let F=Number.parseFloat(getComputedStyle(B).height);return B.remove(),Number.isFinite(F)?F:_},x=()=>{["position","left","top","right","bottom","margin-top","margin-bottom","max-width","max-inline-size","max-height","overflow"].forEach(k=>t.style.removeProperty(k))},b=()=>{let k=e.parentElement;for(;k&&k!==document.body&&k!==document.documentElement;){let _=getComputedStyle(k);if(_.transform!=="none"||_.perspective!=="none"||_.filter!=="none"||_.backdropFilter!=="none")return!0;k=k.parentElement}return!1},S=()=>{if(!m())return;let k=(n||e).getBoundingClientRect(),_=window.visualViewport,O=_?.width||document.documentElement?.clientWidth||window.innerWidth,B=_?.height||document.documentElement?.clientHeight||window.innerHeight,F=_?.offsetLeft||0,H=_?.offsetTop||0,W=Math.max(1,O-i*2),Pt=Math.max(1,B-i*2);t.style.maxWidth=`${Math.round(W)}px`,t.style.maxInlineSize=`${Math.round(W)}px`,t.style.maxHeight=`${Math.round(Pt)}px`,t.style.overflow="auto";let{width:U,height:ce}=p(),ne=y("--spacing-2",8),Sr=g(),$r=f();e.dataset.dropdownDirection=Sr,e.dataset.dropdownAlign=$r;let Ze=$r==="right"?k.right-U:k.left;U>=W-1?Ze=F+i:Ze=Math.max(F+i,Math.min(Ze,F+O-U-i));let Nt=Sr==="up"?k.top-ne-ce:k.bottom+ne;Nt=Math.max(H+i,Math.min(Nt,H+B-ce-i)),Object.assign(t.style,{position:"fixed",left:`${Math.round(Ze)}px`,top:`${Math.round(Nt)}px`,right:"auto",bottom:"auto",marginTop:"0",marginBottom:"0"})},C=null,A=()=>{C||(C=()=>S(),window.addEventListener("resize",C),window.addEventListener("scroll",C,!0))},T=()=>{C&&(window.removeEventListener("resize",C),window.removeEventListener("scroll",C,!0),C=null)},I=null,E=null,j=()=>{I||typeof document>"u"||(I=()=>{m()&&(e.dataset.dropdownDirection=g(),e.dataset.dropdownAlign=f(),E!==null&&cancelAnimationFrame(E),E=requestAnimationFrame(()=>{E=null,m()&&S()}))},document.addEventListener("pds:config-changed",I))},M=()=>{!I||typeof document>"u"||(document.removeEventListener("pds:config-changed",I),I=null,E!==null&&(cancelAnimationFrame(E),E=null))};t.addEventListener("toggle",k=>{if(k.newState==="open"){v(),S(),A(),j();return}h(),T(),M(),b()&&x()});let z=()=>{m()||(e.dataset.dropdownDirection=g(),e.dataset.dropdownAlign=f(),t.showPopover(),requestAnimationFrame(()=>S()))},L=()=>{m()&&t.hidePopover()},R=()=>{m()?L():z()};h(),t.addEventListener("click",k=>{let _=k.target instanceof Element?k.target:k.target?.parentElement;_&&_.closest("[data-dropdown-close]")&&L()}),t.addEventListener("beforetoggle",k=>{if(k.newState==="open"){e.dataset.dropdownDirection=g(),e.dataset.dropdownAlign=f();return}h(),T(),M(),b()&&x()}),e.addEventListener("keydown",k=>{k.key==="Escape"&&(L(),n?.focus())})}function Go(e){if(e.dataset.enhancedToggle)return;e.dataset.enhancedToggle="true";let t=e.querySelector('input[type="checkbox"]');if(!t)return;e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.setAttribute("role","switch"),e.setAttribute("aria-checked",t.checked?"true":"false");let r=document.createElement("span");r.className="toggle-switch",r.setAttribute("role","presentation"),r.setAttribute("aria-hidden","true");let n=document.createElement("span");n.className="toggle-knob",r.appendChild(n),e.insertBefore(r,t.nextSibling);let o=()=>{e.setAttribute("aria-checked",t.checked?"true":"false")},a=()=>{t.disabled||(t.checked=!t.checked,o(),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})))};e.addEventListener("click",i=>{i.preventDefault(),a()}),e.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),a())}),t.addEventListener("change",o)}function Ko(e){if(e.dataset.enhancedColorInput)return;let t=e.querySelector('input[type="color"]');if(!t)return;e.dataset.enhancedColorInput="true";let r=e.querySelector(":scope > .color-control"),n=e.querySelector(":scope > .color-control > .color-swatch"),o=e.querySelector(":scope > .color-control > output");r||(r=document.createElement("span"),r.className="color-control",t.before(r)),n||(n=document.createElement("span"),n.className="color-swatch",r.appendChild(n)),t.parentElement!==n&&n.appendChild(t),o||(o=document.createElement("output"),r.appendChild(o));let a=()=>{if(t.dataset.colorUnset==="1"){o.value="",o.textContent=Q("not set"),r.dataset.value="",r.dataset.unset="1",n.dataset.unset="1";return}o.value=t.value,o.textContent=t.value,r.dataset.value=t.value,delete r.dataset.unset,delete n.dataset.unset};a();let i=()=>{t.dataset.colorUnset==="1"&&(t.dataset.colorUnset="0"),a()};t.addEventListener("input",i,{passive:!0}),t.addEventListener("change",i,{passive:!0})}function Jo(e){if(e.dataset.enhancedOneTimeCode)return;e.dataset.enhancedOneTimeCode="true";let t=Number.parseInt(e.getAttribute("data-otp-length")||e.getAttribute("maxlength")||"6",10),r=Number.isFinite(t)&&t>0?t:6,n=e.getAttribute("data-otp-autosubmit")!=="false",o=e.getAttribute("data-otp-format")==="alphanumeric",a=e.getAttribute("data-otp-status-id")||`${e.id||`otp-${Math.random().toString(36).slice(2,9)}`}-status`,i=v=>{let g=String(v||"").replace(/\s+/g,"");return(o?g.replace(/[^0-9a-z]/gi,""):g.replace(/\D+/g,"")).slice(0,r)};e.classList.add("input-otp"),e.dataset.otpLength=String(r),e.dataset.otpComplete="false",e.style.setProperty("--otp-digits",String(r)),e.style.setProperty("--_otp-digit","0"),(!e.hasAttribute("type")||e.getAttribute("type")?.toLowerCase()==="number")&&e.setAttribute("type","text"),e.setAttribute("maxlength",String(r)),e.hasAttribute("inputmode")||e.setAttribute("inputmode",o?"text":"numeric"),e.hasAttribute("enterkeyhint")||e.setAttribute("enterkeyhint","done"),e.hasAttribute("autocapitalize")||e.setAttribute("autocapitalize","off"),e.hasAttribute("spellcheck")||e.setAttribute("spellcheck","false"),e.hasAttribute("pattern")||e.setAttribute("pattern",o?`[0-9A-Za-z]{${r}}`:`\\d{${r}}`),!e.hasAttribute("aria-label")&&!e.labels?.length&&e.setAttribute("aria-label",Q("One-time code"));let s=e.form||e.closest("form"),d=!1,l=null,u=()=>{let v=typeof e.selectionStart=="number"?e.selectionStart:e.value.length,g=Math.max(0,Math.min(v,Math.max(r-1,0)));e.style.setProperty("--_otp-digit",String(g))},c=()=>{typeof e.scrollLeft=="number"&&(e.scrollLeft=0)};if(typeof document<"u"){l=document.getElementById(a),l||(l=document.createElement("span"),l.id=a,l.className="otp-status",l.setAttribute("aria-live","polite"),l.setAttribute("aria-atomic","true"),e.insertAdjacentElement("afterend",l));let v=new Set((e.getAttribute("aria-describedby")||"").split(/\s+/).filter(Boolean));v.add(a),e.setAttribute("aria-describedby",Array.from(v).join(" "))}let p=()=>{if(!l)return;let v=e.value.length;l.textContent=v===0?Q("Enter the verification code"):v>=r?Q("Code complete"):`${v}/${r}`},m=()=>{!n||d||!s||typeof s.checkValidity=="function"&&!s.checkValidity()||(d=!0,requestAnimationFrame(()=>{d=!1;let v=e.getAttribute("data-otp-submit-selector"),g=v?s.querySelector(v):void 0;typeof s.requestSubmit=="function"?s.requestSubmit(g||void 0):s.submit()}))},h=(v,{dispatchChange:g=!1}={})=>{let f=i(v);e.value!==f&&(e.value=f);let y=f.length===r;e.dataset.otpComplete=y?"true":"false",p(),u(),c(),g&&e.dispatchEvent(new Event("change",{bubbles:!0})),y&&m()};e.addEventListener("beforeinput",v=>{if(v.defaultPrevented||v.inputType?.startsWith("delete")||typeof v.data!="string"||v.data.length===0)return;!i(v.data)&&v.data.trim()&&v.preventDefault()}),e.addEventListener("input",()=>{h(e.value);try{let v=e.value.length;e.setSelectionRange(v,v)}catch{}u(),c()}),["focus","click","keyup","select"].forEach(v=>{e.addEventListener(v,()=>{requestAnimationFrame(()=>{u(),c()})})}),e.addEventListener("paste",v=>{let g=v.clipboardData?.getData("text")||"";g&&(v.preventDefault(),e.value=i(g),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})))}),e.addEventListener("keydown",v=>{v.key==="Enter"&&e.value.length===r&&m()}),h(e.value)}function Yo(e){if(e.dataset.enhancedRange)return;let t=i=>{if(e.dataset.enhancedRangeProgrammatic)return;e.dataset.enhancedRangeProgrammatic="1";let s=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),"value")||Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");s?.get&&s?.set&&Object.defineProperty(e,"value",{configurable:!0,enumerable:s.enumerable,get(){return s.get.call(this)},set(l){s.set.call(this,l),i()}}),new MutationObserver(l=>{l.some(c=>{let p=c.attributeName;return p==="value"||p==="min"||p==="max"})&&i()}).observe(e,{attributes:!0,attributeFilter:["value","min","max"]})},r=e.closest("label"),n=r?.classList.contains("range-output"),o=e.id||`range-${Math.random().toString(36).substring(2,11)}`,a=`${o}-output`;if(e.id=o,n){let i=r.querySelector("span");if(i&&!i.classList.contains("range-output-wrapper")){let s=i.getAttribute("data-range-label")||r.getAttribute("data-range-label")||"",d=document.createElement("span");d.className="range-output-wrapper",d.style.display="flex",d.style.justifyContent="space-between",d.style.alignItems="center";let l=document.createElement("span");l.textContent=s||i.textContent,d.appendChild(l);let u=document.createElement("output");u.id=a,u.setAttribute("for",o),u.style.color="var(--surface-text-secondary, var(--color-text-secondary))",u.style.fontSize="0.875rem",u.textContent=e.value,d.appendChild(u),i.textContent="",i.appendChild(d);let c=()=>{u.textContent=e.value};e.addEventListener("input",c),e.addEventListener("change",c),t(c),c()}}else{let i=e.closest(".range-container");i||(i=document.createElement("div"),i.className="range-container",e.parentNode?.insertBefore(i,e),i.appendChild(e)),i.style.position="relative";let s=document.createElement("output");s.id=a,s.setAttribute("for",o),s.className="range-bubble",s.setAttribute("aria-live","polite"),i.appendChild(s);let d=()=>{let c=parseFloat(e.min)||0,p=parseFloat(e.max)||100,m=parseFloat(e.value),h=(m-c)/(p-c);s.style.left=`calc(${h*100}% )`,s.textContent=String(m)},l=()=>s.classList.add("visible"),u=()=>s.classList.remove("visible");e.addEventListener("input",d),e.addEventListener("pointerdown",l),e.addEventListener("pointerup",u),e.addEventListener("pointerleave",u),e.addEventListener("focus",l),e.addEventListener("blur",u),e.addEventListener("change",d),t(d),d()}e.dataset.enhancedRange="1"}function Zo(e){if(e.dataset.enhancedRequired)return;e.dataset.enhancedRequired="true";let t=r=>{let n;if(r.closest("[role$=group]")?n=r.closest("[role$=group]").querySelector("legend"):n=r.closest("label"),!n||n.querySelector(".required-asterisk"))return;let o=document.createElement("span");o.classList.add("required-asterisk"),o.textContent="*",o.style.marginLeft="4px";let a=n.querySelector("span, [data-label]");if(a)a.appendChild(o);else{let s=n.querySelector("input, select, textarea");s?n.insertBefore(o,s):n.appendChild(o)}let i=r.closest("form");if(i&&!i.querySelector(".required-legend")){let s=document.createElement("small");s.classList.add("required-legend"),s.textContent=Q("* Required fields"),i.insertBefore(s,i.querySelector(".form-actions")||i.lastElementChild)}};e.querySelectorAll("[required]").forEach(r=>{t(r)})}function Xo(e){if(e.dataset.enhancedOpenGroup)return;e.dataset.enhancedOpenGroup="true",e.classList.add("flex","flex-wrap","buttons");let t=document.createElement("input");t.type="text",t.placeholder=Q("Add item..."),t.classList.add("input-text","input-sm"),t.style.width="auto";let r=()=>e.querySelector('input[type="radio"], input[type="checkbox"]');e.appendChild(t),t.addEventListener("keydown",n=>{if(n.key==="Enter"||n.key==="Tab"){let o=t.value.trim();if(o){n.preventDefault();let a=r(),i=a?.type==="radio"?"radio":"checkbox",s=`open-group-${Math.random().toString(36).substring(2,11)}`,d=document.createElement("label"),l=document.createElement("span");l.setAttribute("data-label",""),l.textContent=o;let u=document.createElement("input");u.type=i,u.name=a?.name||e.getAttribute("data-name")||"open-group",u.value=o,u.id=s,d.appendChild(l),d.appendChild(u),e.insertBefore(d,t),t.value=""}}else if(n.key==="Backspace"&&t.value===""){n.preventDefault();let o=e.querySelectorAll("label");o.length>0&&o[o.length-1].remove()}})}function Qo(e){if(e.dataset.enhancedClip)return;e.dataset.enhancedClip="true",e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.hasAttribute("role")||e.setAttribute("role","button");let t=()=>{let n=e.getAttribute("data-clip-open")==="true";e.setAttribute("aria-expanded",n?"true":"false")},r=()=>{let n=e.getAttribute("data-clip-open")==="true";e.setAttribute("data-clip-open",n?"false":"true"),t()};e.addEventListener("click",n=>{n.defaultPrevented||r()}),e.addEventListener("keydown",n=>{(n.key===" "||n.key==="Enter")&&(n.preventDefault(),r())}),t()}function ea(e){if(e.dataset.enhancedBtnWorking)return;e.dataset.enhancedBtnWorking="true";let t=null,r=!1;new MutationObserver(o=>{o.forEach(a=>{if(a.attributeName==="class"){let i=e.classList.contains("btn-working"),s=e.querySelector("pds-icon");if(i)if(s)t||(t=s.getAttribute("icon")),s.setAttribute("icon","circle-notch");else{let d=document.createElement("pds-icon");d.setAttribute("icon","circle-notch"),d.setAttribute("size","sm"),e.insertBefore(d,e.firstChild),r=!0}else a.oldValue?.includes("btn-working")&&s&&(r?(s.remove(),r=!1):t&&(s.setAttribute("icon",t),t=null))}})}).observe(e,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var ta=new Map([[".accordion",qo],["nav[data-dropdown]",Vo],["label[data-toggle]",Go],["label[data-color]",Ko],['input[autocomplete="one-time-code"]',Jo],['input[type="range"]',Yo],["form[data-required]",Zo],["fieldset[role=group][data-open]",Xo],["[data-clip]",Qo],["button, a[class*='btn-']",ea]]),ot=Uo.map(e=>({...e,run:ta.get(e.selector)||(()=>{})}));var Xr=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
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
    `.trim()},{selector:"nav[data-dropdown]",description:"Enhances a nav element with data-dropdown to toggle its last child as a dropdown panel (menu, card, form, etc.). Add data-dropdown-close to any clickable descendant that should close the menu on selection.",attributes:[{name:"split-button",description:"Class that creates a split-button layout by mirroring the default menu item into a primary action button. Uses the first <li> by default, or <li data-default> when present.",appliesTo:"nav[data-dropdown]"},{name:"data-dropdown-close",description:"When clicked (or when a descendant is clicked), closes the currently open dropdown popover.",appliesTo:"Any clickable element inside nav[data-dropdown] menu/panel content"}],demoHtml:`
      <nav data-dropdown>
        <button class="btn-primary">Menu</button>
        <menu>
          <li><a href="#open">Open</a></li>
          <li><a href="#settings" data-dropdown-close>Open settings and close</a></li>
        </menu>
      </nav>
    `.trim()},{selector:"label[data-toggle]",description:"Creates a toggle switch element from a checkbox.",demoHtml:`
      <label data-toggle>
        <input type="checkbox">
        <span data-label>Enable notifications</span>
      </label>
    `.trim()},{selector:"label[data-color]",description:"Wraps color inputs with a styled control shell and synced hex output while keeping the native picker.",demoHtml:`
      <label data-color>
        <span>Brand color</span>
        <input type="color" value="#7c3aed">
      </label>
    `.trim()},{selector:'input[autocomplete="one-time-code"]',description:"Enhances a single text input into a segmented one-time-code / OTP field with numeric sanitizing, full-code paste support, and optional auto-submit when the expected length is reached.",attributes:[{name:"data-otp-length",description:"Expected code length. Defaults to the input maxlength, or 6 when neither is provided.",appliesTo:'input[autocomplete="one-time-code"]'},{name:'data-otp-autosubmit="false"',description:"Opt out of automatically submitting the parent form when the code is complete.",appliesTo:'input[autocomplete="one-time-code"]'},{name:"data-otp-submit-selector",description:"Optional selector for the preferred submit button passed to form.requestSubmit().",appliesTo:'input[autocomplete="one-time-code"]'}],demoHtml:`
      <form action="#verify" method="post">
        <label>
          <span data-label>Email address</span>
          <input type="email" autocomplete="email" value="marc@example.com">
        </label>
        <label>
          <span data-label>Verification code</span>
          <input
            autocomplete="one-time-code"
            inputmode="numeric"
            maxlength="6"
            data-otp-length="6"
            aria-describedby="otp-help"
          >
        </label>
        <small id="otp-help" class="field-description">
          We sent a 6-digit code to marc@example.com. You can paste the full code.
        </small>
        <nav class="form-actions">
          <button type="submit" class="btn-primary">Verify</button>
        </nav>
      </form>
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
    `.trim()},{selector:"[data-clip]",description:"Enables click/keyboard toggling for line-clamped content blocks.",demoHtml:`
      <div data-clip="2" data-clip-more="more...">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
      </div>
    `.trim()},{selector:"button, a[class*='btn-']",description:"Automatically manages spinner icon for buttons with .btn-working class",demoHtml:`
      <button class="btn-primary btn-working">
        <span>Saving</span>
      </button>
    `.trim()}];var en="pds",ra=/^([a-z][a-z0-9+\-.]*:)?\/\//i,Qr=/^[a-z]:/i;function Be(e=""){return e.endsWith("/")?e:`${e}/`}function na(e="",t=en){let r=e.replace(/\/+$/,"");return new RegExp(`(?:^|/)${t}$`,"i").test(r)?r:`${r}/${t}`}function oa(e){return e.replace(/^\.\/+/,"")}function aa(e){return Qr.test(e)?e.replace(Qr,"").replace(/^\/+/,""):e}function ia(e){return e.startsWith("public/")?e.substring(7):e}function Se(e,t={}){let r=t.segment||en,n=t.defaultRoot||`/assets/${r}/`,o=e?.public&&e.public?.root||e?.static&&e.static?.root||null;if(!o||typeof o!="string")return Be(n);let a=o.trim();return a?(a=a.replace(/\\/g,"/"),a=na(a,r),a=Be(a),ra.test(a)?a:(a=oa(a),a=aa(a),a.startsWith("/")||(a=ia(a),a.startsWith("/")||(a=`/${a}`),a=a.replace(/\/+/g,(i,s)=>s===0?i:"/")),Be(a))):Be(n)}function tn(e){let t=e.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(t.toLowerCase()))return!0;let o=document.createElement("canvas").getContext("2d");if(!o)return!1;let a="mmmmmmmmmmlli",i="72px",s="monospace";o.font=`${i} ${s}`;let d=o.measureText(a).width;o.font=`${i} "${t}", ${s}`;let l=o.measureText(a).width;return d!==l}function sa(e){return e?e.split(",").map(n=>n.trim())[0].replace(/['"]/g,"").trim():null}async function rn(e,t={}){if(!e)return Promise.resolve();let{weights:r=[400,500,600,700],italic:n=!1}=t,o=sa(e);if(!o||tn(o))return Promise.resolve();let a=encodeURIComponent(o);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${a}"]`)?(w.log("log",`Font "${o}" is already loading or loaded`),Promise.resolve()):(w.log("log",`Loading font "${o}" from Google Fonts...`),new Promise((s,d)=>{let l=document.createElement("link");l.rel="stylesheet";let u=n?`ital,wght@0,${r.join(";0,")};1,${r.join(";1,")}`:`wght@${r.join(";")}`;l.href=`https://fonts.googleapis.com/css2?family=${a}:${u}&display=swap`,l.setAttribute("data-font-loader",o),l.onload=()=>{w.log("log",`Successfully loaded font "${o}"`),s()},l.onerror=()=>{w.log("warn",`Failed to load font "${o}" from Google Fonts`),d(new Error(`Failed to load font: ${o}`))},document.head.appendChild(l),setTimeout(()=>{tn(o)||w.log("warn",`Font "${o}" did not load within timeout`),s()},5e3)}))}async function Xt(e){if(!e)return Promise.resolve();let t=new Set;e.fontFamilyHeadings&&t.add(e.fontFamilyHeadings),e.fontFamilyBody&&t.add(e.fontFamilyBody),e.fontFamilyMono&&t.add(e.fontFamilyMono);let r=Array.from(t).map(n=>rn(n).catch(o=>{w.log("warn",`Could not load font: ${n}`,o)}));await Promise.all(r)}var er=null;async function ca(){return er||(er=Promise.resolve().then(()=>(on(),nn)).then(e=>e?.AutoDefiner||e?.default?.AutoDefiner||e?.default).then(e=>{if(typeof e!="function")throw new Error("AutoDefiner constructor not found in pure-web/auto-definer");return e})),er}var da=/^[a-z][a-z0-9+\-.]*:\/\//i,De=(()=>{try{return import.meta.url}catch{return}})(),$e=e=>typeof e=="string"&&e.length&&!e.endsWith("/")?`${e}/`:e;function ze(e,t={}){if(!e||da.test(e))return e;let{preferModule:r=!0}=t,n=()=>{if(!De)return null;try{return new URL(e,De).href}catch{return null}},o=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(e,window.location.origin).href}catch{return null}};return(r?n()||o():o()||n())||e}var an=(()=>{if(De)try{let e=new URL(De);if(/\/public\/assets\/js\//.test(e.pathname))return new URL("../pds/",De).href}catch{return}})(),sn=!1;function it(e){sn||typeof document>"u"||(sn=!0,e.addEventListener("pds:ready",t=>{let r=t.detail?.mode;r&&document.documentElement.classList.add(`pds-${r}`,"pds-ready")}))}function rr(e={},t={}){if(!t||typeof t!="object")return e;let r=Array.isArray(e)?[...e]:{...e};for(let[n,o]of Object.entries(t))o&&typeof o=="object"&&!Array.isArray(o)?r[n]=rr(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o;return r}function tr(e=""){return String(e).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function fe(e){if(e==null)return e;if(typeof e=="function")return;if(typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>fe(r)).filter(r=>r!==void 0);let t={};for(let r in e)if(e.hasOwnProperty(r)){let n=e[r];if(typeof n!="function"){let o=fe(n);o!==void 0&&(t[r]=o)}}return t}function at(e){let t=fe(e);return typeof structuredClone=="function"?structuredClone(t):JSON.parse(JSON.stringify(t))}function nr(e={},t={},{presets:r,defaultLog:n,validateDesignConfig:o,validateInitConfig:a}={}){let i=e&&typeof e.log=="function"?e.log:n,s=typeof e=="object"&&("colors"in e||"typography"in e||"spatialRhythm"in e||"shape"in e||"behavior"in e||"layout"in e||"advanced"in e||"a11y"in e||"components"in e||"icons"in e),d=e&&e.enhancers;d&&!Array.isArray(d)&&(d=Object.values(d));let l=d??t.enhancers??[],u=e&&e.preset,c=e&&e.design,p=e&&e.icons&&typeof e.icons=="object"?e.icons:null,m="preset"in(e||{})||"design"in(e||{})||"enhancers"in(e||{});e&&typeof e=="object"&&typeof a=="function"&&a(e,{log:i,context:"PDS.start"});let h,v=null;if(m){c&&typeof c=="object"&&typeof o=="function"&&o(c,{log:i,context:"PDS.start"});let g=String(u||"default").toLowerCase(),f=r?.[g]||Object.values(r||{}).find(O=>tr(O.name)===g||String(O.name||"").toLowerCase()===g);if(!f)throw new Error(`PDS preset not found: "${u||"default"}"`);v={id:f.id||tr(f.name),name:f.name||f.id||String(g)};let y=at(f);if(c&&typeof c=="object"||p){let O=c?fe(c):{},B=p?fe(p):null,F=B?rr(O,{icons:B}):O;y=rr(y,at(F))}let{mode:x,autoDefine:b,applyGlobalStyles:S,manageTheme:C,themeStorageKey:A,preloadStyles:T,criticalLayers:I,managerURL:E,manager:j,localization:M,preset:z,design:L,enhancers:R,log:k,..._}=e;h={..._,design:y,preset:v.name,log:k||n}}else if(s){typeof o=="function"&&o(e,{log:i,context:"PDS.start"});let{log:g,...f}=e;h={design:at(f),log:g||n}}else{let g=r?.default||Object.values(r||{}).find(f=>tr(f.name)==="default");if(!g)throw new Error("PDS default preset not available");v={id:g.id||"default",name:g.name||"Default"},h={design:at(g),preset:v.name,log:n}}return{generatorConfig:h,enhancers:l,presetInfo:v}}function st({manageTheme:e,themeStorageKey:t,applyResolvedTheme:r,setupSystemListenerIfNeeded:n}){let o="light",a=null;if(e&&typeof window<"u"){try{a=localStorage.getItem(t)||null}catch{a=null}try{r?.(a),n?.(a)}catch{}a?a==="system"?o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":o=a:o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:o,storedTheme:a}}function Le(e,{resolvePublicAssetURL:t}){let r=!!(e?.public?.root||e?.static?.root),n=t(e);return!r&&an&&(n=an),$e(ze(n))}async function lt(e,{baseEnhancers:t=[]}={}){let{autoDefineBaseURL:r="/auto-define/",autoDefinePreload:n=[],autoDefineMapper:o=null,enhancers:a=[],autoDefineOverrides:i=null,autoDefinePreferModule:s=!0}=e,d=(()=>{let u=new Map;return(t||[]).forEach(c=>u.set(c.selector,c)),(a||[]).forEach(c=>u.set(c.selector,c)),Array.from(u.values())})(),l=null;if(typeof window<"u"&&typeof document<"u"){let u=await ca(),c=x=>{switch(x){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${x}.js`}},{mapper:p,enhancers:m,...h}=i&&typeof i=="object"?i:{},v=m?Array.isArray(m)?m:typeof m=="object"?Object.values(m):[]:[],g=(()=>{let x=new Map;return(d||[]).forEach(b=>{b?.selector&&x.set(b.selector,b)}),(v||[]).forEach(b=>{if(!b?.selector)return;let S=x.get(b.selector)||null;x.set(b.selector,{...S||{},...b,run:typeof b?.run=="function"?b.run:S?.run})}),Array.from(x.values())})(),y={baseURL:r&&$e(ze(r,{preferModule:s})),predefine:n,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:g,onError:(x,b)=>{if(typeof x=="string"&&x.startsWith("pds-")){let C=["pds-form","pds-drawer"].includes(x),A=b?.message?.includes("#pds/lit")||b?.message?.includes("Failed to resolve module specifier");C&&A?w.log("error",`\u274C PDS component <${x}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`):w.log("warn",`\u26A0\uFE0F PDS component <${x}> not found. Assets may not be installed.`)}else w.log("error",`\u274C Auto-define error for <${x}>:`,b)},...h,mapper:x=>{if(customElements.get(x))return null;if(typeof o=="function")try{let b=o(x);return b===void 0?c(x):b}catch(b){return w.log("warn","Custom autoDefine.mapper error; falling back to default:",b?.message||b),c(x)}return c(x)}};l=new u(y),n.length>0&&typeof u.define=="function"&&await u.define(...n,{baseURL:r,mapper:y.mapper,onError:y.onError})}return{autoDefiner:l,mergedEnhancers:d}}var or=["light","dark"],ar=new Set(or);function ir(e){let r=(Array.isArray(e?.themes)?e.themes.map(n=>String(n).toLowerCase()):or).filter(n=>ar.has(n));return r.length?r:or}function Ce(e,{preferDocument:t=!0}={}){let r=String(e||"").toLowerCase();if(ar.has(r))return r;if(t&&typeof document<"u"){let n=document.documentElement?.getAttribute("data-theme");if(ar.has(n))return n}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function ge(e,t){let r=Ce(t);return ir(e).includes(r)}var cn=!1,ft="pds-live-edit-toggle",ur="pds-live-edit-toggle-style";function dn(e,t=new WeakSet){if(!e||typeof e!="object"||t.has(e))return e;t.add(e),Object.freeze(e);for(let r of Object.keys(e))dn(e[r],t);return e}function gt(e){let t=fe(e);return typeof structuredClone=="function"?structuredClone(t):JSON.parse(JSON.stringify(t))}function un(e){return e==null||typeof e!="object"?e:dn(gt(e))}function pn(e){if(typeof document>"u"||typeof e!="function")return;if(document.body){e();return}let t=()=>{document.body&&(document.removeEventListener("DOMContentLoaded",t),e())};document.addEventListener("DOMContentLoaded",t,{once:!0})}function ya(e={}){let t=e?.interactive!==!1;typeof document>"u"||pn(()=>{if(document.querySelector("pds-live-edit")){if(!t){let r=document.querySelector("pds-live-edit");r&&r.setAttribute("data-pds-live-settings-only","true")}}else{let r=document.createElement("pds-live-edit");t||r.setAttribute("data-pds-live-settings-only","true"),document.body.appendChild(r)}})}function pt(e=0){return new Promise(t=>{setTimeout(t,Math.max(0,Number(e)||0))})}async function He(e={}){let t=e?.mountIfMissing!==!1,r=e?.interactive!==!1,n=typeof e?.requiredMethod=="string"&&e.requiredMethod.trim()?e.requiredMethod.trim():"openDesignSettings",o=Number.isFinite(Number(e?.timeoutMs))?Number(e.timeoutMs):2400;if(typeof document>"u"||!t&&!document.querySelector("pds-live-edit"))return null;t&&ya({interactive:r});let a=Date.now();for(;Date.now()-a<o;){let s=document.querySelector("pds-live-edit");if(!s){await pt(40);continue}if(typeof s?.[n]=="function")return s;if(typeof customElements<"u"&&typeof customElements.whenDefined=="function"){try{await Promise.race([customElements.whenDefined("pds-live-edit"),pt(80)])}catch{await pt(40)}continue}await pt(40)}let i=document.querySelector("pds-live-edit");return i&&typeof i?.[n]=="function"?i:null}function fn(){if(typeof document>"u")return;document.querySelectorAll("pds-live-edit").forEach(t=>{typeof t?.setInteractiveEditingEnabled=="function"&&t.setInteractiveEditingEnabled(!1),t.remove()})}function va(e){return e?typeof e.isInteractiveEditingEnabled=="function"?!!e.isInteractiveEditingEnabled():!0:!1}function xa(){if(typeof document>"u"||document.getElementById(ur))return;let e=document.createElement("style");e.id=ur,e.textContent=`
    :where(.pds-live-edit-toggle-nav) {
      position: fixed;
      top: var(--spacing-3);
      right: var(--spacing-3);
      z-index: var(--z-dropdown, 1050);
    }

    :where(.pds-live-edit-toggle-nav menu) {
      min-width: 220px;
    }

    :where(.pds-live-edit-toggle-nav menu a[data-pds-live-action]) {
      cursor: pointer;
    }

    :where(.pds-live-edit-toggle-nav menu li.pds-live-shared-quick-mode-item) {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    :where(.pds-live-edit-toggle-nav menu li.pds-live-shared-quick-mode-item .pds-live-editor-menu) {
      display: grid;
      gap: var(--spacing-2);
      padding: var(--spacing-2);      
    }

    :where(.pds-live-edit-toggle-nav menu li.pds-live-shared-quick-mode-item label) {
      display: grid;
      gap: var(--spacing-1);
      margin: 0;
    }

    :where(.pds-live-edit-toggle-nav menu li.pds-live-shared-quick-mode-item label > span) {
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
    }

    :where(.pds-live-edit-toggle-nav menu li > hr) {
      border: 0;
      border-top: var(--border-width-thin) solid var(--color-border);
      margin: var(--spacing-2) 0 var(--spacing-1) 0;
    }

    :where(.pds-live-edit-toggle-nav menu li:has(> hr)) {
      padding: 0;
      margin: 0;
      list-style: none;
      pointer-events: none;
    }

    :where(.pds-live-edit-toggle-nav menu a[data-pds-live-action="reset-config"]) {
      color: var(--color-danger-text);
    }

    :where(.pds-live-edit-toggle-nav menu a[data-pds-live-action="reset-config"] pds-icon) {
      color: var(--color-danger-text);
    }
  `,document.head.appendChild(e)}function dr(e,t){if(!e)return;e.classList.toggle("btn-primary",t),e.classList.toggle("btn-secondary",!t),e.setAttribute("aria-pressed",t?"true":"false");let r="PDS Manager";e.setAttribute("aria-label",r),e.setAttribute("title",r)}async function wa(){if(typeof document>"u")return null;xa();let e=document.getElementById(ft);if(!e){let t=document.createElement("nav");t.className="pds-live-edit-toggle-nav",t.setAttribute("data-dropdown",""),t.setAttribute("data-mode","auto"),t.setAttribute("data-pds-live-edit-ignore","true"),e=document.createElement("button"),e.id=ft,e.type="button",e.className="icon-only btn-secondary",e.setAttribute("data-pds-live-edit-ignore","true"),e.innerHTML='<pds-icon icon="cursor-click" size="sm"></pds-icon>';let r=document.createElement("menu");r.setAttribute("data-pds-live-edit-ignore","true");let n=(i,s,d)=>{let l=document.createElement("li"),u=document.createElement("a");u.href="#",u.dataset.pdsLiveAction=i,u.setAttribute("data-pds-live-edit-ignore","true");let c=document.createElement("pds-icon");return c.setAttribute("icon",d),c.setAttribute("size","sm"),u.append(c,document.createTextNode(` ${s}`)),l.appendChild(u),l},o=()=>{let i=document.createElement("li");i.setAttribute("data-pds-live-edit-ignore","true");let s=document.createElement("hr");return s.setAttribute("aria-hidden","true"),i.appendChild(s),i};r.appendChild(n("toggle",Q("Toggle live editing"),"pencil"));let a=n("open-settings",Q("Open Settings"),"gear");a.setAttribute("data-dropdown-close",""),r.appendChild(a),r.appendChild(n("reset-config",Q("Reset Config"),"arrow-counter-clockwise")),await ka(r),t.append(e,r),pn(()=>{document.getElementById(ft)||document.body.appendChild(t)})}return e}async function ka(e){if(e instanceof Element){if(e.__pdsLiveSharedMenuItemInFlight)return e.__pdsLiveSharedMenuItemInFlight;e.__pdsLiveSharedMenuItemInFlight=(async()=>{e.querySelectorAll("li.pds-live-shared-quick-mode-item").forEach(s=>s.remove());let t=await He({mountIfMissing:!0,interactive:!1,requiredMethod:"createSharedQuickModeMenuItem",timeoutMs:7e3});if(!t||typeof t.createSharedQuickModeMenuItem!="function")return;let r=await t.createSharedQuickModeMenuItem();if(!(r instanceof Element))return;r.classList.add("pds-live-shared-quick-mode-item");let o=e.querySelector('a[data-pds-live-action="reset-config"]')?.closest("li")||null,a=o?.previousElementSibling||null,i=a&&a.querySelector?.(":scope > hr")?a:null;if(i){e.insertBefore(r,i);return}if(o){e.insertBefore(r,o);return}e.appendChild(r)})();try{await e.__pdsLiveSharedMenuItemInFlight}finally{e.__pdsLiveSharedMenuItemInFlight=null}}}function Sa(){if(typeof document>"u")return;let e=document.getElementById(ft);if(e){let r=e.closest(".pds-live-edit-toggle-nav");r?r.remove():e.remove()}let t=document.getElementById(ur);t&&t.remove(),fn()}async function $a(){if(typeof document>"u")return;let e=await wa();if(!e)return;let t=async i=>{if(i){let s=await He({mountIfMissing:!0});s&&typeof s.setInteractiveEditingEnabled=="function"&&s.setInteractiveEditingEnabled(!0)}else fn();dr(e,i)};t(!1);let r=e.closest(".pds-live-edit-toggle-nav")||e;e.__pdsLiveEditActionHandler&&r.removeEventListener("click",e.__pdsLiveEditActionHandler);let n=async i=>{let s=i.target?.closest?.("[data-pds-live-action]");if(!s)return;i.preventDefault();let d=String(s.dataset.pdsLiveAction||"");if(d==="toggle"){let l=await He({mountIfMissing:!1}),u=va(l);await t(!u);return}if(d==="open-settings"){let l=await He({mountIfMissing:!0,requiredMethod:"openDesignSettings",interactive:!1});l&&typeof l.setInteractiveEditingEnabled=="function"&&l.setInteractiveEditingEnabled(!1),l&&typeof l.openDesignSettings=="function"&&(dr(e,!1),await l.openDesignSettings());return}if(d==="reset-config"){let l=await He({mountIfMissing:!0,requiredMethod:"resetConfig",interactive:!1});dr(e,!1),l&&typeof l.resetConfig=="function"&&await l.resetConfig();return}};e.__pdsLiveEditActionHandler=n,r.addEventListener("click",n),e.__pdsLiveEditDisableHandler&&document.removeEventListener("pds:live-edit:disable",e.__pdsLiveEditDisableHandler),e.__pdsLiveEditEnableHandler&&document.removeEventListener("pds:live-edit:enable",e.__pdsLiveEditEnableHandler);let o=()=>{t(!1)},a=()=>{t(!0)};e.__pdsLiveEditDisableHandler=o,document.addEventListener("pds:live-edit:disable",o),e.__pdsLiveEditEnableHandler=a,document.addEventListener("pds:live-edit:enable",a)}function za(){if(typeof window>"u"||!window.localStorage)return null;try{let e=window.localStorage.getItem("pure-ds-config");if(!e)return null;let t=JSON.parse(e);if(t&&("preset"in t||"design"in t))return t}catch{return null}return null}function pr(e={},t={}){if(!t||typeof t!="object")return e;let r=Array.isArray(e)?[...e]:{...e};for(let[n,o]of Object.entries(t))o&&typeof o=="object"&&!Array.isArray(o)?r[n]=pr(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o;return r}function La(e){let t=za();if(!t||!e||typeof e!="object")return e;let r=t.preset,n=t.design&&typeof t.design=="object"?t.design:null;if(!r&&!n)return e;let o="preset"in e||"design"in e||"enhancers"in e,a={...e};if(r&&(a.preset=r),n)if(o){let i=e.design&&typeof e.design=="object"?e.design:{};a.design=pr(i,n)}else a=pr(e,n);return a}function Ca(e,t={}){let{hideCategory:r=!0,itemGrid:n="45px 1fr",includeIncompatible:o=!0,disableIncompatible:a=!0,categoryName:i="Presets",theme:s,onSelect:d,iconHandler:l}=t||{},u=Ce(s??e?.theme),c=h=>{let g=m(h?.id)?.colors||{},f=g?.primary,y=g?.secondary,x=g?.accent;return f&&y&&x?`<span style="display:flex;gap:1px;flex-shrink:0;" aria-hidden="true">
        <span style="display:inline-block;width:10px;height:20px;background-color:${f};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${y};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${x};">&nbsp;</span>
      </span>`:h?.icon?`<pds-icon icon="${h.icon}" size="sm"></pds-icon>`:""},p=()=>{let h=e?.presets||{};return Object.values(h||{}).filter(v=>!!(v?.id||v?.name))},m=h=>h&&p().find(g=>String(g?.id||g?.name)===String(h))||null;return{hideCategory:r,itemGrid:n,iconHandler:typeof l=="function"?l:c,categories:{[i]:{trigger:()=>!0,getItems:(h={})=>{let v=String(h?.search||"").toLowerCase().trim();return p().filter(f=>{let y=String(f?.name||f?.id||"").toLowerCase(),x=String(f?.description||"").toLowerCase(),b=Array.isArray(f?.tags)?f.tags.map(C=>String(C).toLowerCase()):[];if(v&&!(y.includes(v)||x.includes(v)||b.some(A=>A.includes(v))))return!1;let S=ge(f,u);return!(!o&&!S)}).map(f=>{let y=f?.id||f?.name,x=ge(f,u),b=ir(f),S=b.length===1?`${b[0]} only`:`Not available in ${u} mode`,C=String(f?.description||"").trim(),A=x?C:C?`${C} - ${S}`:S;return{id:y,text:f?.name||String(y),description:A,icon:"palette",class:!x&&a?"disabled":"",disabled:!x&&a,tooltip:x?"":S}}).sort((f,y)=>String(f.text||"").localeCompare(String(y.text||"")))},action:async h=>{if(!h?.id||h?.disabled)return h?.id;let v=m(h.id);return v?typeof d=="function"?await d({preset:v,selection:h,resolvedTheme:u}):(typeof e?.applyLivePreset=="function"&&await e.applyLivePreset(v.id||h.id),v.id||h.id):h?.id}}}}}async function Aa(e,{applyResolvedTheme:t,setupSystemListenerIfNeeded:r,emitConfigChanged:n}){if(cn)return;let[o,a,i]=await Promise.all([Promise.resolve().then(()=>(Wt(),Or)),Promise.resolve().then(()=>(Ie(),zr)),Promise.resolve().then(()=>(cr(),ut))]),s=o?.default||o?.ontology,d=o?.findComponentForElement,l=a?.enums;e.ontology=s,e.findComponentForElement=d,e.enums=l,e.common=i||{},e.presets=ee,e.configRelations=Tr,e.configSpec=Rr,e.configEditorMetadata=Fr,e.configFormSchema=Pr,e.buildConfigFormSchema=ye,e.getConfigEditorMetadata=Ne,e.enhancerMetadata=Xr,(!Array.isArray(e.defaultEnhancers)||e.defaultEnhancers.length===0)&&(e.defaultEnhancers=Array.isArray(ot)?ot:[]),e.applyStyles=function(u){let c=u||X.instance;Yr(c),typeof n=="function"&&n({mode:"live",source:"live:styles-applied"})},e.adoptLayers=function(u,c,p){return nt(u,c,p,X.instance)},e.adoptPrimitives=function(u,c){return rt(u,c,X.instance)},e.getGenerator=async function(){return X},e.buildPresetOmniboxSettings=function(u={}){return Ca(e,u)},e.applyLivePreset=async function(u,c={}){if(!u)return!1;if(!e.registry?.isLive)return e.log("warn","PDS.applyLivePreset is only available in live mode."),!1;let p=e.currentConfig||{},{design:m,preset:h,...v}=p,g={...gt(v),preset:u},f=nr(g,{},{presets:ee,defaultLog:Ht,validateDesignConfig:Bt,validateInitConfig:Dt}),y=Ce(e.theme);if(!ge(f.generatorConfig.design,y)){let C=f.presetInfo?.name||f.generatorConfig?.design?.name||u;e.log("warn",`PDS theme "${y}" not supported by preset "${C}".`)}p.theme&&!f.generatorConfig.theme&&(f.generatorConfig.theme=p.theme);let x=new X(f.generatorConfig);if(f.generatorConfig.design?.typography)try{await Xt(f.generatorConfig.design.typography)}catch(C){f.generatorConfig?.log?.("warn","Failed to load some fonts from Google Fonts:",C)}e.applyStyles?.(x);let b=f.presetInfo||{id:u,name:u};if(e.currentPreset=b,e.compiled=un({...p,preset:f.generatorConfig.preset,design:f.generatorConfig.design,theme:f.generatorConfig.theme||p.theme}),e.configEditorMetadata=Ne(f.generatorConfig.design),e.configFormSchema=ye(f.generatorConfig.design),c?.persist!==!1&&typeof window<"u"){let C="pure-ds-config";try{let A=localStorage.getItem(C),T=A?JSON.parse(A):null,I={...T&&typeof T=="object"?T:{},preset:b.id||u,design:gt(f.generatorConfig.design||{})};localStorage.setItem(C,JSON.stringify(I))}catch(A){f.generatorConfig?.log?.("warn","Failed to store preset:",A)}}return!0},e.preloadCritical=function(u,c={}){if(typeof window>"u"||!document.head||!u)return;let{theme:p,layers:m=["tokens"]}=c;try{let h=p||"light";(p==="system"||!p)&&(h=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",h);let v=u.design?{...u,theme:h}:{design:u,theme:h},g=new X(v),f=m.map(y=>{try{return g.css?.[y]||""}catch{return""}}).filter(y=>y.trim()).join(`
`);if(f){let y=document.head.querySelector("style[data-pds-preload]");y&&y.remove();let x=document.createElement("style");x.setAttribute("data-pds-preload",""),x.textContent=f,document.head.insertBefore(x,document.head.firstChild)}}catch(h){e.log("warn","PDS preload failed:",h)}},cn=!0}async function Ea(e,t,{emitReady:r,emitConfigChanged:n,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}){if(!t||typeof t!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");let i=t?.design?.icons?.externalPath||t?.icons?.externalPath||null;if(t=La(t),typeof i=="string"&&i.trim()){let m=t?.design&&typeof t.design=="object"?t.design:{},h=m?.icons&&typeof m.icons=="object"?m.icons:{};t={...t,design:{...m,icons:{...h,externalPath:i}}}}if(await Aa(e,{applyResolvedTheme:o,setupSystemListenerIfNeeded:a,emitConfigChanged:n}),it(e),typeof document<"u"&&document.adoptedStyleSheets){let m=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(v=>v._pdsFouc)){let v=new CSSStyleSheet;v.replaceSync(m),v._pdsFouc=!0,document.adoptedStyleSheets=[v,...document.adoptedStyleSheets]}}catch(h){if(e.log("warn","Constructable stylesheets not supported, using <style> tag fallback:",h),!document.head.querySelector("style[data-pds-fouc]")){let g=document.createElement("style");g.setAttribute("data-pds-fouc",""),g.textContent=m,document.head.insertBefore(g,document.head.firstChild)}}}let s=t.applyGlobalStyles??!0,d=t.manageTheme??!0,l=t.themeStorageKey??"pure-ds-theme",u=t.preloadStyles??!1,c=t.criticalLayers??["tokens","primitives"],p=t&&t.autoDefine||null;try{let{resolvedTheme:m}=st({manageTheme:d,themeStorageKey:l,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}),h=nr(t,{},{presets:ee,defaultLog:Ht,validateDesignConfig:Bt,validateInitConfig:Dt});if(d&&!ge(h.generatorConfig.design,m)){let I=h.presetInfo?.name||h.generatorConfig?.design?.name||h.generatorConfig?.preset||"current preset";e.log("warn",`PDS theme "${m}" not supported by preset "${I}".`)}let v=h.enhancers,{log:g,...f}=h.generatorConfig,y=gt(f);y.log=g,d&&(y.theme=m);let x=new X(y);if(y.design?.typography)try{await Xt(y.design.typography)}catch(I){y?.log?.("warn","Failed to load some fonts from Google Fonts:",I)}if(u&&typeof window<"u"&&document.head)try{let I=c.map(E=>{try{return x.css?.[E]||""}catch(j){return y?.log?.("warn",`Failed to generate critical CSS for layer "${E}":`,j),""}}).filter(E=>E.trim()).join(`
`);if(I){let E=document.head.querySelector("style[data-pds-critical]");E&&E.remove();let j=document.createElement("style");j.setAttribute("data-pds-critical",""),j.textContent=I;let M=document.head.querySelector('meta[charset], meta[name="viewport"]');M?M.parentNode.insertBefore(j,M.nextSibling):document.head.insertBefore(j,document.head.firstChild)}}catch(I){y?.log?.("warn","Failed to preload critical styles:",I)}e.registry.setLiveMode(),h.presetInfo?.name?y?.log?.("log",`PDS live with preset "${h.presetInfo.name}"`):y?.log?.("log","PDS live with custom config"),s&&(e.applyStyles?.(X.instance),typeof window<"u"&&setTimeout(()=>{let I=document.head.querySelector("style[data-pds-critical]");I&&I.remove();let E=document.head.querySelector("style[data-pds-preload]");E&&E.remove();let j=document.getElementById("pds-runtime-stylesheet");j&&j.remove()},100));let b=Le(t,{resolvePublicAssetURL:Se}),S;p&&p.baseURL?S=$e(ze(p.baseURL,{preferModule:!1})):S=`${b}components/`;let C=null,A=[];try{let I=await lt({autoDefineBaseURL:S,autoDefinePreload:p&&Array.isArray(p.predefine)&&p.predefine||[],autoDefineMapper:p&&typeof p.mapper=="function"&&p.mapper||null,enhancers:v,autoDefineOverrides:p||null,autoDefinePreferModule:!(p&&p.baseURL)},{baseEnhancers:ot});C=I.autoDefiner,A=I.mergedEnhancers||[]}catch(I){y?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",I)}let T=x?.options||y;if(e.compiled=un({mode:"live",...T,theme:m,enhancers:A}),e.configEditorMetadata=Ne(h.generatorConfig.design),e.configFormSchema=ye(h.generatorConfig.design),typeof n=="function"&&n({mode:"live",source:"live:config-applied",preset:h.generatorConfig.preset}),typeof document<"u")try{t?.liveEdit?setTimeout(()=>{$a()},0):Sa()}catch(I){y?.log?.("warn","Live editor toggle failed to start:",I)}return r({mode:"live",generator:x,config:T,theme:m,autoDefiner:C}),{generator:x,config:T,theme:m,autoDefiner:C}}catch(m){throw e.dispatchEvent(new CustomEvent("pds:error",{detail:{error:m}})),m}}function Ma(e){let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):.5}function Ta(e){return Array.isArray(e)?e.map(t=>t?{severity:String(t.severity||"info").toLowerCase(),message:String(t.message||""),path:t.path?String(t.path):""}:null).filter(t=>t&&t.message):[]}function q(e={}){let t=String(e.source||"unknown"),r=String(e.type||"generic"),n=Ma(e.confidence),o=Ta(e.issues),a=e.designPatch&&typeof e.designPatch=="object"?e.designPatch:{},i=e.template&&typeof e.template=="object"?e.template:null;return{source:t,type:r,confidence:n,issues:o,designPatch:a,template:i,meta:e.meta&&typeof e.meta=="object"?e.meta:{}}}function Ra(e){return!!(e&&typeof e=="object"&&"source"in e&&"type"in e&&"confidence"in e&&"issues"in e&&"designPatch"in e)}var Ia="../templates/templates.json",gn="/assets/pds/templates/templates.json",_a=["public","assets","pds","templates","templates.json"],Fa=["..","..","..","public","assets","pds","templates","templates.json"],mt=null;function mn(){return!!(typeof process<"u"&&process?.versions?.node)}function Pa(e={}){return{id:String(e.id||"").trim(),name:String(e.name||e.id||"Template").trim(),description:String(e.description||"").trim(),icon:String(e.icon||"layout").trim(),file:String(e.file||"").trim(),tags:Array.isArray(e.tags)?e.tags.map(t=>String(t)):[]}}function ht(e={},t={}){let n=(Array.isArray(e)?e:Array.isArray(e?.templates)?e.templates:[]).map(Pa).filter(o=>o.id&&o.file);return{version:e?.version||"1",templates:n,__catalogURL:t.catalogURL||null,__catalogFilePath:t.catalogFilePath||null}}async function Na(e={}){let r=[e.catalogURL||globalThis?.PDS?.currentConfig?.templateCatalogURL,Ia,gn].filter(Boolean);for(let n of r)try{let o=new URL(n,import.meta.url).href,a=await fetch(o,{credentials:"same-origin"});if(!a.ok)continue;let i=await a.json();return ht(i,{catalogURL:o})}catch{}return ht({templates:[]})}async function Oa(e={}){let t="node:fs/promises",r="node:path",n="node:url",[{readFile:o},a,{fileURLToPath:i}]=await Promise.all([import(t),import(r),import(n)]),s=[];e.catalogPath&&s.push(a.resolve(e.catalogPath)),s.push(a.resolve(process.cwd(),..._a));let d=a.dirname(i(import.meta.url));s.push(a.resolve(d,...Fa));for(let l of s)try{let u=await o(l,"utf8"),c=JSON.parse(u);return ht(c,{catalogFilePath:l})}catch{}return ht({templates:[]})}async function ja(e,t){if(!e?.file)return"";if(!mn()){let d=t?.__catalogURL||gn,l=new URL(e.file,d).href,u=await fetch(l,{credentials:"same-origin"});if(!u.ok)throw new Error(`Template file not found: ${e.file}`);return(await u.text()).trim()}let r="node:fs/promises",n="node:path",[{readFile:o},a]=await Promise.all([import(r),import(n)]),i=t?.__catalogFilePath?a.dirname(t.__catalogFilePath):a.resolve(process.cwd(),"public","assets","pds","templates"),s=a.resolve(i,e.file);return(await o(s,"utf8")).trim()}async function bt(e={}){return mt&&!e.forceReload||(mt=mn()?await Oa(e):await Na(e)),mt}async function hn(e={}){return(await bt(e)).templates.map(({id:r,name:n,description:o,icon:a,file:i,tags:s})=>({id:r,name:n,description:o,icon:a,file:i,tags:s}))}async function Ba(e,t={}){let r=await bt(t),n=r.templates.find(a=>a.id===e)||null;if(!n)return null;let o=await ja(n,r);return{...n,html:o}}async function bn(e,t={}){let r=await Ba(e,t);return r?q({source:"template",type:"template",confidence:1,template:{id:r.id,name:r.name,html:r.html,icon:r.icon,description:r.description}}):q({source:"template",type:"template",confidence:0,issues:[{severity:"error",message:`Unknown template: ${e}`}]})}var yn={version:"tw2pds-layout-v4",summary:"Deterministic Tailwind\u2192PDS conversion rules focused on layout intent, semantic primitive mapping, and richer import-* fallback coverage.",governance:[{id:"layout.utilities.grid",controls:["grid","grid-cols-*","grid-auto-*"],note:"When false, grid mappings are skipped."},{id:"layout.utilities.flex",controls:["flex","flex-*","items-*","justify-*","grow"],note:"When false, flex mappings are skipped."},{id:"layout.utilities.spacing",controls:["gap-*","stack-*"],note:"When false, spacing mappings are skipped."},{id:"layout.utilities.container",controls:["container","max-w-*"],note:"When false, container mappings are skipped."}],nonPdsClassPatterns:["^group(?:[/:].*)?$","^layout-container$"],neverFallbackTags:["table","thead","tbody","tfoot","tr","th","td","caption","colgroup","col"],directMappings:[{id:"layout.flex.base",tw:"flex",pds:["flex"],gate:"flex"},{id:"layout.flex.inline",tw:"inline-flex",pds:["flex"],gate:"flex"},{id:"layout.flex.row",tw:"flex-row",pds:["flex-row"],gate:"flex"},{id:"layout.flex.col",tw:"flex-col",pds:["flex-col"],gate:"flex"},{id:"layout.flex.wrap",tw:"flex-wrap",pds:["flex-wrap"],gate:"flex"},{id:"layout.flex.grow",tw:"grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow.tw",tw:"flex-grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow1",tw:"flex-1",pds:["grow"],gate:"flex"},{id:"layout.items.start",tw:"items-start",pds:["items-start"],gate:"flex"},{id:"layout.items.center",tw:"items-center",pds:["items-center"],gate:"flex"},{id:"layout.items.end",tw:"items-end",pds:["items-end"],gate:"flex"},{id:"layout.items.stretch",tw:"items-stretch",pds:["items-stretch"],gate:"flex"},{id:"layout.items.baseline",tw:"items-baseline",pds:["items-baseline"],gate:"flex"},{id:"layout.justify.start",tw:"justify-start",pds:["justify-start"],gate:"flex"},{id:"layout.justify.center",tw:"justify-center",pds:["justify-center"],gate:"flex"},{id:"layout.justify.end",tw:"justify-end",pds:["justify-end"],gate:"flex"},{id:"layout.justify.between",tw:"justify-between",pds:["justify-between"],gate:"flex"},{id:"layout.justify.around",tw:"justify-around",pds:["justify-around"],gate:"flex"},{id:"layout.justify.evenly",tw:"justify-evenly",pds:["justify-evenly"],gate:"flex"},{id:"layout.grid.base",tw:"grid",pds:["grid"],gate:"grid"},{id:"layout.grid.cols.1",tw:"grid-cols-1",pds:["grid-cols-1"],gate:"grid"},{id:"layout.grid.cols.2",tw:"grid-cols-2",pds:["grid-cols-2"],gate:"grid"},{id:"layout.grid.cols.3",tw:"grid-cols-3",pds:["grid-cols-3"],gate:"grid"},{id:"layout.grid.cols.4",tw:"grid-cols-4",pds:["grid-cols-4"],gate:"grid"},{id:"layout.grid.cols.6",tw:"grid-cols-6",pds:["grid-cols-6"],gate:"grid"},{id:"layout.container",tw:"container",pds:["container"],gate:"container"},{id:"intent.surface.shadow",tw:"shadow",pds:["surface-elevated"]},{id:"intent.surface.shadow-md",tw:"shadow-md",pds:["surface-elevated"]},{id:"intent.surface.shadow-lg",tw:"shadow-lg",pds:["surface-elevated"]},{id:"intent.surface.base",tw:"bg-white",pds:["surface-base"]},{id:"typography.align.center",tw:"text-center",pds:["text-center"]},{id:"typography.align.left",tw:"text-left",pds:["text-left"]},{id:"typography.align.right",tw:"text-right",pds:["text-right"]},{id:"typography.text.muted.gray500",tw:"text-gray-500",pds:["text-muted"]},{id:"typography.text.muted.slate500",tw:"text-slate-500",pds:["text-muted"]}],ignoredPatterns:[{id:"style.color",pattern:"^(?:text|from|to|via|decoration|accent|caret)-|^bg-(?!cover$|center$|no-repeat$)",reason:"Visual style token skipped in favor of semantic PDS styling."},{id:"style.radius-border-shadow",pattern:"^(?:rounded|ring|border|shadow|outline)-?",reason:"Surface/shape inferred at primitive level."},{id:"style.typography",pattern:"^(?:font|leading|tracking|uppercase|lowercase|capitalize)-?",reason:"Typography atomic utilities are skipped."},{id:"style.effects",pattern:"^(?:opacity|blur|backdrop|drop-shadow|mix-blend|filter)-",reason:"Visual effects skipped unless mapped to a PDS utility."},{id:"style.transitions",pattern:"^(?:transition|duration|ease|delay|animate)-",reason:"Motion is system-defined in PDS."},{id:"style.spacing.atomic",pattern:"^(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-",reason:"Atomic spacing skipped; structural spacing intent is mapped."},{id:"style.positioning.atomic",pattern:"^(?:absolute|relative|fixed|sticky|inset(?:-[xy])?|top|right|bottom|left|z|translate(?:-[xy])?|-translate-[xy])(?:-|$)",reason:"Atomic positioning/offset utilities are skipped so PDS primitives and layout utilities control placement."}],intentRules:[{id:"intent.layout.responsive-grid-to-auto",summary:"Collapse responsive grid-cols patterns (including base+md two-step patterns) to best-fit grid-auto-*"},{id:"intent.layout.mobile-stack",summary:"Map flex-col + md/lg:flex-row to mobile-stack"},{id:"intent.component.card",summary:"Infer card/surface classes from rounded+shadow+surface signals"},{id:"intent.component.card.normalize",summary:"Detect Tailwind card utility clusters and normalize them to PDS card and surface variants."},{id:"intent.component.button",summary:"Infer btn-primary / btn-outline / icon-only from CTA patterns"},{id:"intent.component.button.normalize",summary:"Prevents import-* style classes on button-like elements and applies PDS button variants/sizes."},{id:"intent.component.button.layout-grow",summary:"Preserve CTA row width intent on button-like elements by mapping w-full/flex-1 to grow."},{id:"intent.icon.color-preserve",summary:"Preserve icon color intent by mapping Tailwind text color utilities on icon-like elements to tokenized import-* classes."},{id:"intent.component.badge.normalize",summary:"Detects Tailwind badge/pill utility clusters and normalizes them to PDS badge primitives/variants."},{id:"intent.typography.heading-semantic",summary:"Removes Tailwind heading typography/color utilities so heading semantics and PDS defaults control typography."},{id:"intent.surface.footer-inverse",summary:"Use surface-inverse for footers with explicit background intent"},{id:"intent.typography.link-treatment",summary:"Apply minimal link treatment for hover/transition-tailwind anchors"},{id:"intent.typography.link-active-preserve",summary:"Preserve anchor text color intent (including active menu states) by mapping Tailwind text utilities to tokenized import-* classes."},{id:"intent.typography.metric-paragraph-to-div",summary:"Normalize metric display lines from paragraph tags to div tags to avoid default paragraph margins in compact stat layouts."},{id:"intent.typography.metric-pair-no-stack",summary:"When a compact metric container has two consecutive typography lines, remove stack-sm so spacing follows Tailwind preflight no-margin assumptions."},{id:"intent.typography.semantic-heading-from-scale",summary:"Map large bold typography scales (text-2xl/text-3xl/text-4xl) to semantic heading tags when possible."},{id:"intent.typography.bold-to-strong",summary:"Prefer semantic strong tags for bold inline text intent instead of utility-only font-weight classes."},{id:"intent.preflight.tailwind-runtime-detected",summary:"Detect Tailwind runtime CSS injection and translate key preflight intent"},{id:"intent.preflight.list-reset",summary:"Preserve Tailwind list-reset preflight behavior via scoped fallback class"},{id:"intent.preflight.anchor-reset",summary:"Preserve Tailwind anchor reset preflight behavior via scoped fallback class"},{id:"table.strict-tags.no-classes",summary:"Never emit classes for semantic table tags (table/thead/tbody/tfoot/tr/th/td/caption/colgroup/col)"},{id:"intent.form.nested-label",summary:"Convert sibling label+control pairs into nested labels"},{id:"fallback.import-style",summary:"Generate import-* classes + local style block for unmapped utility styles"}],gapScaleMap:{"gap-0":"gap-0","gap-1":"gap-xs","gap-2":"gap-sm","gap-3":"gap-sm","gap-4":"gap-md","gap-5":"gap-md","gap-6":"gap-lg","gap-7":"gap-lg","gap-8":"gap-xl","gap-10":"gap-xl","gap-12":"gap-xl"},maxWidthMap:{"max-w-xs":"max-w-sm","max-w-sm":"max-w-sm","max-w-md":"max-w-md","max-w-lg":"max-w-lg","max-w-xl":"max-w-xl","max-w-2xl":"max-w-xl","max-w-3xl":"max-w-xl","max-w-4xl":"max-w-xl","max-w-5xl":"max-w-xl","max-w-6xl":"max-w-xl","max-w-7xl":"max-w-xl"},tailwindSizeScale:{"0":"var(--spacing-0)","0.5":"0.125rem","1":"var(--spacing-1)","1.5":"0.375rem","2":"var(--spacing-2)","2.5":"0.625rem","3":"var(--spacing-3)","3.5":"0.875rem","4":"var(--spacing-4)","5":"var(--spacing-5)","6":"var(--spacing-6)","7":"var(--spacing-7)","8":"var(--spacing-8)","9":"var(--spacing-9)","10":"var(--spacing-10)","11":"var(--spacing-11)","12":"var(--spacing-12)","14":"3.5rem","16":"4rem","20":"5rem","24":"6rem","28":"7rem","32":"8rem","36":"9rem","40":"10rem","48":"12rem"},tailwindShadeScale:["50","100","200","300","400","500","600","700","800","900"],defaultTailwindShade:"500",importStyleRules:{"mx-auto":"margin-left:auto;margin-right:auto","ml-auto":"margin-left:auto","mr-auto":"margin-right:auto","w-full":"width:100%","w-auto":"width:auto","h-full":"height:100%","h-48":"height:12rem","h-2.5":"height:0.625rem","h-10":"height:var(--spacing-10)","h-2":"height:var(--spacing-2)","w-2":"width:var(--spacing-2)","size-8":"width:var(--spacing-8);height:var(--spacing-8)","size-10":"width:var(--spacing-10);height:var(--spacing-10)","size-full":"width:100%;height:100%","min-h-screen":"min-height:100vh","overflow-hidden":"overflow:hidden","overflow-x-hidden":"overflow-x:hidden","overflow-x-auto":"overflow-x:auto","whitespace-nowrap":"white-space:nowrap",hidden:"display:none",block:"display:block",truncate:"overflow:hidden;text-overflow:ellipsis;white-space:nowrap","justify-items-center":"justify-items:center","justify-items-start":"justify-items:start","justify-items-end":"justify-items:end","justify-items-stretch":"justify-items:stretch","grid-flow-col":"grid-auto-flow:column","aspect-square":"aspect-ratio:1 / 1","bg-center":"background-position:center","bg-cover":"background-size:cover","bg-no-repeat":"background-repeat:no-repeat","transition-colors":"transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms"},importStyleDynamicRules:[{id:"fallback.import-style.gap-scale",pattern:"^gap-(\\d+)$",summary:"Converts gap scale utilities (including responsive variants like md:gap-6) to generated import-* fallback classes."},{id:"fallback.import-style.min-width-arbitrary",pattern:"^min-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-width utilities (e.g. min-w-[600px]) to generated import-* fallback classes."},{id:"fallback.import-style.max-width-arbitrary",pattern:"^max-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary max-width utilities (e.g. max-w-[480px]) to generated import-* fallback classes."},{id:"fallback.import-style.min-height-arbitrary",pattern:"^min-h-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-height utilities (e.g. min-h-[180px]) to generated import-* fallback classes."},{id:"fallback.import-style.grid-rows-arbitrary",pattern:"^grid-rows-\\[[^\\]]+\\]$",summary:"Converts arbitrary grid template row utilities (e.g. grid-rows-[1fr_auto]) to generated import-* fallback classes."},{id:"fallback.import-style.size-scale",pattern:"^size-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts size scale/arbitrary utilities into width+height fallback declarations."},{id:"fallback.import-style.width-height-scale",pattern:"^[wh]-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts width/height scale and arbitrary utilities to import-* classes."},{id:"fallback.import-style.spacing",pattern:"^-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(.+)$",summary:"Converts spacing utilities to directional padding/margin fallback declarations, including responsive variants."},{id:"fallback.import-style.text-size",pattern:"^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$",summary:"Converts common text size utilities to import-* font-size declarations."},{id:"fallback.import-style.font-weight",pattern:"^font-(normal|medium|semibold|bold|extrabold|black)$",summary:"Converts common font weight utilities to import-* font-weight declarations."},{id:"fallback.import-style.leading-tracking",pattern:"^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|tighter|wide|wider|widest)$",summary:"Converts line-height and letter-spacing utilities to import-* declarations for typography fidelity."},{id:"fallback.import-style.bg-tokenized",pattern:"^bg-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind background color utilities by mapping families like blue/purple/green/red to PDS semantic tokens."},{id:"fallback.import-style.bg-semantic",pattern:"^bg-(primary|secondary|accent)$",summary:"Safeguards semantic background utilities by mapping bg-primary/bg-secondary/bg-accent to PDS color tokens."},{id:"fallback.import-style.text-tokenized",pattern:"^text-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind text color utilities by mapping common families to PDS semantic tokens."},{id:"fallback.import-style.rounded",pattern:"^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$",summary:"Safeguards rounded utilities (including rounded-t-sm) by mapping to PDS radius tokens."},{id:"fallback.import-style.overlay-alpha",pattern:"^bg-black\\/(\\d{1,3})$",summary:"Converts alpha black overlay classes (e.g. bg-black/50) to tokenized color-mix background overlays."},{id:"fallback.import-style.text-inverse",pattern:"^text-white$",summary:"Preserves white foreground intent for text-on-image use cases using inverse-compatible tokens."},{id:"fallback.import-style.bg-arbitrary",pattern:"^bg-\\[[^\\]]+\\]$",summary:"Converts arbitrary background colors to import-* fallback classes when values are CSS-safe."},{id:"fallback.import-style.text-arbitrary",pattern:"^text-\\[[^\\]]+\\]$",summary:"Converts arbitrary text colors to import-* fallback classes when values are CSS-safe."}]};Ie();cr();var yt=class{constructor(t={},r=null){let n=t&&typeof t=="object"?t:{},o=r||(typeof document<"u"?document:new EventTarget),a=new WeakMap,i=m=>m.map(h=>String(h)).join("."),s,d=(m,h,v,g)=>{let f=i(m),y={property:h,path:f,value:v,oldValue:g};o.dispatchEvent(new CustomEvent(`change:${f}`,{detail:y,bubbles:!0,composed:!0})),o.dispatchEvent(new CustomEvent("change",{detail:{...y,state:s},bubbles:!0,composed:!0}))},l=(m,h)=>(typeof h=="function"&&o.addEventListener(m,h),s),u=(m,h)=>(typeof h=="function"&&o.removeEventListener(m,h),s),c=(m,h)=>{if(typeof h=="function"){let v=g=>{h(g),o.removeEventListener(m,v)};o.addEventListener(m,v)}return s},p=(m,h)=>{if(!m||typeof m!="object")return m;if(a.has(m))return a.get(m);let v=new Proxy(m,{get(g,f,y){if(f==="on")return l;if(f==="off")return u;if(f==="once")return c;let x=Reflect.get(g,f,y);return x&&typeof x=="object"?p(x,[...h,f]):x},set(g,f,y,x){let b=Reflect.get(g,f,x);return Object.is(b,y)?!0:Reflect.set(g,f,y,x)?(d([...h,f],f,y,b),!0):!1},deleteProperty(g,f){if(!Reflect.has(g,f))return!0;let y=g[f];return Reflect.deleteProperty(g,f)?(d([...h,f],f,void 0,y),!0):!1}});return a.set(m,v),v};return s=p(n,[]),s}};function vn(e,t,r){if(!e||!t||typeof r!="object")return()=>{};let n={};return Object.entries(r).forEach(([o,a])=>{n[o]=i=>{typeof a=="function"&&a(e,i.detail.value,i.detail.oldValue)},t.on(`change:${o}`,n[o])}),()=>{Object.entries(n).forEach(([o,a])=>{t.off(`change:${o}`,a)})}}typeof w.initializing!="boolean"&&(w.initializing=!1);"currentPreset"in w||(w.currentPreset=null);typeof w.debug!="boolean"&&(w.debug=!1);"currentConfig"in w||(w.currentConfig=null);"compiled"in w||(w.compiled=null);typeof w.logHandler!="function"&&(w.logHandler=null);"mode"in w||(w.mode=null);var vt=null,xt=null,wt=null,kt=null,St=null,$t=null,wn="__pdsLocalizationRuntime";function Ae(){if($t)return $t;let e=w?.[wn];return e&&typeof e=="object"?($t=e,e):null}function Ha(e){let t=e&&typeof e=="object"?e:null;$t=t,w[wn]=t}Hr({getLogger:()=>typeof w.logHandler=="function"?w.logHandler:null,getContext:()=>{let e=w?.mode||w?.compiled?.mode||(w?.registry?.isLive?"live":"static"),t=(w?.debug||w?.currentConfig?.debug||w?.currentConfig?.design?.debug||w?.compiled?.debug||w?.compiled?.design?.debug||!1)===!0;return{mode:e,debug:t,thisArg:w}}});w.log=(e="log",t,...r)=>{tt(e,t,...r)};var G={locale:"en",messages:{},hasProvider:!1},zt=new Set;function kn(e){return!!e&&typeof e!="string"&&typeof e=="object"&&"strTag"in e}function Sn(e=[]){let t="";for(let r=0;r<=e.length-1;r+=1)t+=e[r],r<e.length-1&&(t+=`{${r}}`);return t}function Wa(e,t){return String(e).replace(/\{(\d+)\}/g,(r,n)=>t(Number(n)))}function Ua(e){if(!e||typeof e!="object")return{};let t={};for(let[r,n]of Object.entries(e)){if(typeof n=="string"){t[r]=n;continue}n&&typeof n=="object"&&typeof n.content=="string"&&(t[r]=n.content)}return t}function qa(e,...t){return{strTag:!0,strings:Array.from(e||[]),values:t,raw:Array.from(e?.raw||[])}}function Va(e){if(!e)return"";if(kn(e)){let r=Sn(e.strings||[]),n=G.messages[r]||r;return Wa(n,o=>e.values?.[o])}let t=String(e);return G.messages[t]||t}function Ga(e){if(!e)return;let t=kn(e)?Sn(e.strings||[]):String(e);typeof t=="string"&&t.length>0&&zt.add(t)}function $n(e){if(!e||typeof e.msg!="function"||zt.size===0)return;let t=Array.from(zt);zt.clear();for(let r of t)try{e.msg(r)}catch{}}async function Ue(){let e=Ae();return e||(St||(St=import(qe("pds-localization.js")).then(r=>{if(typeof r?.msg!="function"||typeof r?.str!="function"||typeof r?.configureLocalization!="function"||typeof r?.loadLocale!="function"||typeof r?.setLocale!="function"||typeof r?.getLocalizationState!="function")throw new Error("Failed to load localization runtime exports");return Ha(r),$n(r),r}).catch(r=>{throw St=null,r})),St)}var zn=(e,t={})=>{let r=Ae();return typeof r?.msg=="function"?r.msg(e,t):(Ga(e),Va(e,t))},Ln=(e,...t)=>{let r=Ae();return typeof r?.str=="function"?r.str(e,...t):qa(e,...t)},Lt=(e=null)=>{let t=Ae();if(typeof t?.configureLocalization=="function")return t.configureLocalization(e);if(!e||typeof e!="object")return G.locale="en",G.messages={},G.hasProvider=!1,{locale:G.locale,messages:{...G.messages},hasProvider:G.hasProvider};typeof e.locale=="string"&&e.locale.trim()&&(G.locale=e.locale.trim()),Object.prototype.hasOwnProperty.call(e,"messages")&&(G.messages=Ua(e.messages));let r=!!(e.provider||e.translate||e.loadLocale||e.setLocale);return G.hasProvider=r,r&&Ue().then(n=>{n.configureLocalization(e),$n(n)}).catch(()=>{}),{locale:G.locale,messages:{...G.messages},hasProvider:G.hasProvider}},Cn=async e=>(await Ue()).loadLocale(e),An=async(e,t={})=>(await Ue()).setLocale(e,t),En=()=>{let e=Ae();return typeof e?.getLocalizationState=="function"?e.getLocalizationState():{locale:G.locale,messages:{...G.messages},hasProvider:G.hasProvider}},Mn=(e={})=>{let t=Ae();if(typeof t?.createJSONLocalization=="function")return t.createJSONLocalization(e);let r=typeof e?.locale=="string"&&e.locale.trim()?e.locale.trim().toLowerCase():"en",n=Array.isArray(e?.locales)?e.locales.map(d=>String(d||"").trim().toLowerCase()).filter(Boolean):[],o=Array.from(new Set([r,...n])),a=null,i=async()=>(a||(a=Ue().then(d=>typeof d?.createJSONLocalization=="function"?d.createJSONLocalization(e):null).catch(()=>null)),a),s=async(d="loadLocale")=>{let l=await i();if(!l||typeof l!="object")return null;let u=l.provider;if(!u||typeof u!="object")return null;let c=u[d];return typeof c=="function"?c:d==="setLocale"&&typeof u.loadLocale=="function"?u.loadLocale:null};return{locale:r,locales:[...o],provider:{locales:[...o],async loadLocale(d={}){let l=await s("loadLocale");return typeof l!="function"?{}:l(d)},async setLocale(d={}){let l=await s("setLocale");return typeof l!="function"?{}:l(d)}}}};function qe(e,t){return t&&typeof t=="string"?t:`${Le(w.currentConfig||{},{resolvePublicAssetURL:Se})}core/${e}`}async function Ka(){return Array.isArray(w.defaultEnhancers)&&w.defaultEnhancers.length>0?w.defaultEnhancers:(kt||(kt=import(qe("pds-enhancers.js",w.currentConfig?.enhancersURL)).then(t=>{let r=Array.isArray(t?.defaultPDSEnhancers)?t.defaultPDSEnhancers:[];return w.defaultEnhancers=r,r}).catch(t=>{throw kt=null,t})),kt)}async function Ja(){return typeof w.ask=="function"&&w.ask!==Tn?w.ask:(xt||(xt=import(qe("pds-ask.js",w.currentConfig?.askURL)).then(t=>{let r=t?.ask;if(typeof r!="function")throw new Error("Failed to load ask helper");return w.ask=r,r}).catch(t=>{throw xt=null,t})),xt)}async function Ve(){return typeof w.toast=="function"&&w.toast!==Ee?w.toast:(wt||(wt=import(qe("pds-toast.js",w.currentConfig?.toastURL)).then(t=>{let r=t?.toast;if(typeof r!="function")throw new Error("Failed to load toast helper");return w.toast=r,r}).catch(t=>{throw wt=null,t})),wt)}async function Tn(...e){return(await Ja())(...e)}async function Ee(...e){return(await Ve())(...e)}Ee.success=async(...e)=>(await Ve()).success(...e);Ee.error=async(...e)=>(await Ve()).error(...e);Ee.warning=async(...e)=>(await Ve()).warning(...e);Ee.info=async(...e)=>(await Ve()).info(...e);var xn=function(e="log",t,...r){w.log(e,t,...r)};function gr(e){if(e==null)return e;if(typeof e=="function")return;if(typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>gr(r)).filter(r=>r!==void 0);let t={};for(let[r,n]of Object.entries(e)){let o=gr(n);o!==void 0&&(t[r]=o)}return t}function Rn(e,t=new WeakSet){if(!e||typeof e!="object"||t.has(e))return e;t.add(e),Object.freeze(e);for(let r of Object.keys(e))Rn(e[r],t);return e}function mr(e){return e==null||typeof e!="object"?e:Rn(structuredClone(gr(e)))}async function Ya(e,t={}){if(t?.runtimeConfig===!1||typeof fetch!="function")return null;let r=t?.runtimeConfigURL||`${e}pds-runtime-config.json`;try{let n=await fetch(r,{cache:"no-store"});return n.ok?await n.json():null}catch{return null}}w.registry=ke;w.enums=$;w.adoptLayers=nt;w.adoptPrimitives=rt;var Za=lr;w.parse=Za;var Xa=dt;w.html=Xa;w.State=yt;w.bindState=vn;w.createStylesheet=Zr;w.isLiveMode=()=>ke.isLive;w.ask=Tn;w.toast=Ee;w.common=ut;w.msg=zn;w.str=Ln;w.configureLocalization=Lt;w.loadLocale=Cn;w.setLocale=An;w.getLocalizationState=En;w.createJSONLocalization=Mn;w.i18n={msg:zn,str:Ln,configure:Lt,loadLocale:Cn,setLocale:An,getState:En,createJSONLocalization:Mn};w.AutoComplete=null;w.loadAutoComplete=async()=>{if(w.AutoComplete&&typeof w.AutoComplete.connect=="function")return w.AutoComplete;let e=qe("pds-autocomplete.js",w.currentConfig?.autoCompleteURL);return vt||(vt=import(e).then(t=>{let r=t?.AutoComplete||t?.default?.AutoComplete||t?.default||null;if(!r)throw new Error("AutoComplete export not found in module");return w.AutoComplete=r,r}).catch(t=>{throw vt=null,t})),vt};function In(e){let t=typeof CustomEvent=="function";try{let r=t?new CustomEvent("pds:ready",{detail:e}):new Event("pds:ready");w.dispatchEvent(r)}catch{}if(typeof document<"u")if(t){let r={detail:e,bubbles:!0,composed:!0};try{document.dispatchEvent(new CustomEvent("pds:ready",r))}catch{}try{document.dispatchEvent(new CustomEvent("pds-ready",r))}catch{}}else{try{document.dispatchEvent(new Event("pds:ready"))}catch{}try{document.dispatchEvent(new Event("pds-ready"))}catch{}}}function _n(e={}){let t=typeof CustomEvent=="function",r={at:Date.now(),...e};try{let n=t?new CustomEvent("pds:config-changed",{detail:r}):new Event("pds:config-changed");w.dispatchEvent(n)}catch{}if(typeof document<"u")if(t){let n={detail:r,bubbles:!0,composed:!0};try{document.dispatchEvent(new CustomEvent("pds:config-changed",n))}catch{}}else try{document.dispatchEvent(new Event("pds:config-changed"))}catch{}}var fr="pure-ds-theme",me=null,We=null;function hr(e){try{if(typeof document>"u")return;let t="light";e?e==="system"?t=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":t=e:t=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",document.documentElement.setAttribute("data-theme",t)}catch{}}function br(e){try{if(me&&We){try{typeof me.removeEventListener=="function"?me.removeEventListener("change",We):typeof me.removeListener=="function"&&me.removeListener(We)}catch{}me=null,We=null}if(e==="system"&&typeof window<"u"&&window.matchMedia){let t=window.matchMedia("(prefers-color-scheme: dark)"),r=n=>{let o=n?.matches===void 0?t.matches:n.matches;try{let a=o?"dark":"light";document.documentElement.setAttribute("data-theme",a),w.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:a,source:"system"}}))}catch{}};me=t,We=r,typeof t.addEventListener=="function"?t.addEventListener("change",r):typeof t.addListener=="function"&&t.addListener(r)}}catch{}}var Qa=Object.getOwnPropertyDescriptor(w,"theme");Qa||Object.defineProperty(w,"theme",{get(){try{return typeof window>"u"?null:localStorage.getItem(fr)||null}catch{return null}},set(e){try{if(typeof window>"u")return;let t=w.currentConfig?.design||null,r=Ce(e);if(t&&!ge(t,r)){let n=t?.name||w.currentPreset?.name||w.currentConfig?.preset||"current preset";w.log("warn",`PDS theme "${r}" not supported by preset "${n}".`),w.dispatchEvent(new CustomEvent("pds:theme:blocked",{detail:{theme:e,resolvedTheme:r,preset:n}}));return}e==null?localStorage.removeItem(fr):localStorage.setItem(fr,e),hr(e),br(e),w.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:e,source:"api"}}))}catch{}}});w.defaultEnhancers=[];async function ei(e){w.initializing=!0;try{let t=e&&e.mode||"live",{mode:r,...n}=e||{};w.mode=t,w.logHandler=typeof n?.log=="function"?n.log:null,w.currentConfig=mr(n);let o=n&&typeof n.localization=="object"&&n.localization?n.localization:null;o?(await Ue(),Lt(o)):Lt(null);let a;if(t==="static")a=await ti(n);else{let{localization:s,...d}=n||{},l=Le(d,{resolvePublicAssetURL:Se}),u=d?.managerURL||d?.public?.managerURL||d?.manager?.url||new URL("core/pds-manager.js",l).href||new URL("./pds-manager.js",import.meta.url).href,{startLive:c}=await import(u);a=await c(w,d,{emitReady:In,emitConfigChanged:_n,applyResolvedTheme:hr,setupSystemListenerIfNeeded:br})}w.compiled=mr(a?.config||null);let i=w?.compiled?.design?.icons?.externalPath||"/assets/img/icons/";return w.log("info",`startup ready; external icon path: ${i}`),a}finally{w.initializing=!1}}w.start=ei;async function ti(e){if(!e||typeof e!="object")throw new Error("PDS.start({ mode: 'static', ... }) requires a valid configuration object");let t=e.applyGlobalStyles??!0,r=e.manageTheme??!0,n=e.themeStorageKey??"pure-ds-theme",o=e.staticPaths??{},a=Le(e,{resolvePublicAssetURL:Se}),i=e&&e.autoDefine||null,s;i&&i.baseURL?s=$e(ze(i.baseURL,{preferModule:!1})):s=`${a}components/`;let d=i&&Array.isArray(i.predefine)&&i.predefine||[],l=i&&typeof i.mapper=="function"&&i.mapper||null;try{it(w);let{resolvedTheme:u}=st({manageTheme:r,themeStorageKey:n,applyResolvedTheme:hr,setupSystemListenerIfNeeded:br}),c=await Ya(a,e),p=Array.isArray(e?.enhancers)?e.enhancers:e?.enhancers&&typeof e.enhancers=="object"?Object.values(e.enhancers):[],m=c?.config?{...c.config,...e,design:e?.design||c.config.design,preset:e?.preset||c.config.preset}:{...e},h={tokens:`${a}styles/pds-tokens.css.js`,primitives:`${a}styles/pds-primitives.css.js`,components:`${a}styles/pds-components.css.js`,utilities:`${a}styles/pds-utilities.css.js`,styles:`${a}styles/pds-styles.css.js`},v=c?.paths||{};if(o={...h,...v,...o},w.registry.setStaticMode(o),t&&typeof document<"u")try{let y=await w.registry.getStylesheet("styles");if(y){y._pds=!0;let x=(document.adoptedStyleSheets||[]).filter(b=>b._pds!==!0);document.adoptedStyleSheets=[...x,y],_n({mode:"static",source:"static:styles-applied"})}}catch(y){xn.call(w,"warn","Failed to apply static styles:",y)}let g=null,f=[];try{let y=await Ka(),x=await lt({autoDefineBaseURL:s,autoDefinePreload:d,autoDefineMapper:l,enhancers:p,autoDefineOverrides:i||null,autoDefinePreferModule:!(i&&i.baseURL)},{baseEnhancers:y});g=x.autoDefiner,f=x.mergedEnhancers||[]}catch(y){xn.call(w,"error","\u274C Failed to initialize AutoDefiner/Enhancers (static):",y)}return w.compiled=mr({mode:"static",...m,theme:u,enhancers:f}),In({mode:"static",config:m,theme:u,autoDefiner:g}),{config:m,theme:u,autoDefiner:g}}catch(u){throw w.dispatchEvent(new CustomEvent("pds:error",{detail:{error:u}})),u}}var ri="src/js/pds-live-manager/tailwind-conversion-rules.json",Et=["base","sm","md","lg","xl","2xl"];function ni(e={}){let t=Array.isArray(e.ignoredPatterns)?e.ignoredPatterns.map(n=>({...n,pattern:n?.pattern instanceof RegExp?n.pattern:new RegExp(String(n?.pattern||""))})):[],r=Array.isArray(e.nonPdsClassPatterns)?e.nonPdsClassPatterns.map(n=>n instanceof RegExp?n:new RegExp(String(n||""))):[];return{...e,ignoredPatterns:t,nonPdsClassPatterns:r}}var J=ni(yn),Fn=J.version||"tw2pds-layout-v4",oi=new Map(J.directMappings.map(e=>[e.tw,e])),yr=new Map(Object.entries(J.gapScaleMap||{})),Pn=new Map(Object.entries(J.maxWidthMap||{})),ai=J.nonPdsClassPatterns||[],ii=new Set(J.neverFallbackTags||[]),si={...J.importStyleRules||{}},li=J.tailwindSizeScale||{},vr=Array.isArray(J.tailwindShadeScale)?J.tailwindShadeScale.map(e=>String(e)).filter(Boolean):["50","100","200","300","400","500","600","700","800","900"],Nn=vr.includes(String(J.defaultTailwindShade||""))?String(J.defaultTailwindShade):"500",At=1.2,ci=["container","grid","flex","gap","space","items","justify","content","place","self","col","row","w","h","min","max","p","m","rounded","border","ring","outline","shadow","bg","text","font","leading","tracking","uppercase","lowercase","capitalize","overflow","whitespace","truncate","object","aspect","opacity","blur","backdrop","transition","duration","ease","delay","animate","hidden","block","inline","absolute","relative","fixed","sticky","size"];function On(e="",t=""){if(!e||!t)return e;let r=new RegExp(`\\s${t}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`,"gi");return String(e).replace(r,"")}function di(e="",t=null){let r=String(e||""),n=0;return r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(input)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*?)>/gi,(o,a,i,s,d,l,u,c,p,m,h)=>{if(s!==m)return o;let v=On(`${a||""}${d||""}`,"for"),g=`<${u}${c||""} id="${m}"${h||""}>`;return n+=1,`<label${v}>${l}${g}</label>`}),r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(select|textarea)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*)>([\s\S]*?)<\/\6>/gi,(o,a,i,s,d,l,u,c,p,m,h,v)=>{if(s!==m)return o;let g=On(`${a||""}${d||""}`,"for"),f=`<${u}${c||""} id="${m}"${h||""}>${v}</${u}>`;return n+=1,`<label${g}>${l}${f}</label>`}),t&&n>0&&(t.labelNestingCount+=n,D(t,`Nested ${n} label/control pairs.`),P(t,"intent.form.nested-label")),r}function ui(e="",t="base"){let r=String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rule";return`import-${t&&t!=="base"?`${t}-`:""}${r}`}function he(e,t,r,n="base",o=""){if(!e||!t||!r)return"";let a=ui(t,n);if(o){let i=`${n}|${o}`;e.importPseudoStyles.has(i)||e.importPseudoStyles.set(i,new Map),e.importPseudoStyles.get(i).set(a,r)}else n==="base"?e.importBaseStyles.set(a,r):(e.importResponsiveStyles.has(n)||e.importResponsiveStyles.set(n,new Map),e.importResponsiveStyles.get(n).set(a,r));return e.importedStyleCount+=1,a}function Te(e=""){return String(e||"").trim().replace(/_/g," ")}function Re(e=""){return!e||/[;{}]/.test(e)?!1:/^[-#(),.%/\sa-zA-Z0-9]+$/.test(e)}function Ge(e=""){let t=String(e||"").trim();if(!t)return null;let r=t.match(/^\[([^\]]+)\]$/);if(r){let n=Te(r[1]);return Re(n)?n:null}return li[t]||null}function pi(e=""){let t=Number(e);if(!Number.isFinite(t))return Nn;let r=String(t);return vr.includes(r)?r:vr.reduce((n,o)=>{let a=Math.abs(Number(n)-t);return Math.abs(Number(o)-t)<a?o:n},Nn)}function Je(e="",t="500"){let r=String(e||"").toLowerCase(),n=pi(t);return["blue","sky","indigo","cyan"].includes(r)?`var(--color-primary-${n})`:["purple","violet","fuchsia"].includes(r)?`var(--color-accent-${n})`:["green","emerald","lime","teal"].includes(r)?`var(--color-success-${n})`:["yellow","amber","warning"].includes(r)?`var(--color-warning-${n})`:["red","rose","pink","orange"].includes(r)?`var(--color-danger-${n})`:["slate","gray","zinc","neutral","stone"].includes(r)?`var(--color-gray-${n})`:""}function jn(e=""){let t=Te(e);return Re(t)&&(/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(t)||/^(?:rgb|hsl)a?\([^)]*\)$/.test(t))?t:""}function se(e=""){return String(e||"").split(/\s+/).map(t=>t.trim()).filter(Boolean)}function fi(e="",t=""){if(!t)return e;let r=String(e||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return`${r} class="${t}"`;let o=n[1]||'"',a=se(n[2]);a.includes(t)||a.push(t);let i=` class=${o}${a.join(" ")}${o}`;return r.replace(n[0],i)}function gi(e="",t=""){return t?new RegExp(`\\s${t}\\s*=`,"i").test(String(e||"")):!1}function mi(e=""){let t=String(e||"").replace(/[-_]+/g," ").trim();return t?t.replace(/(^|\s)([a-z])/g,(r,n,o)=>`${n}${o.toUpperCase()}`):"Icon button"}function hi(e="",t=null){let r=String(e||"");return r&&r.replace(/<(button|a)([^>]*)>\s*(<pds-icon\b[^>]*><\/pds-icon>)\s*<\/\1>/gi,(n,o,a,i)=>{let s=fi(a,"icon-only");if(!gi(s,"aria-label")){let d=String(i).match(/\sicon\s*=\s*(["'])(.*?)\1/i),l=d?String(d[2]||""):"",u=mi(l);s+=` aria-label="${u}"`}return t&&(t.intentHits+=1,P(t,"intent.component.button.icon-only-markup")),`<${o}${s}>${i}</${o}>`})}function bi(e="",t=null){let r=String(e||"");if(!r)return r;let n=0,o=r.replace(/<p([^>]*?)>([\s\S]*?)<\/p>/gi,(a,i,s)=>{let d=String(i||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!d)return a;let l=se(d[2]||""),u=l.some(p=>/^import-text-/.test(String(p||""))),c=l.includes("text-muted")||l.some(p=>/^import-font-/.test(String(p||"")));return!u||!c?a:(n+=1,`<div${i}>${s}</div>`)});return t&&n>0&&(t.intentHits+=1,P(t,"intent.typography.metric-paragraph-to-div"),D(t,`Normalized ${n} metric text paragraph tag(s) to div.`)),o}function Vn(e="",t=""){if(!t)return e;let r=String(e||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return r;let o=n[1]||'"',a=se(n[2]).filter(s=>s!==t);if(a.length===0)return r.replace(n[0],"");let i=` class=${o}${a.join(" ")}${o}`;return r.replace(n[0],i)}function yi(e="",t=r=>r){let r=String(e||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return r;let o=n[1]||'"',a=se(n[2]),i=t(Array.from(a)),s=Array.isArray(i)?i.filter(Boolean):a;if(s.length===0)return r.replace(n[0],"");let d=` class=${o}${s.join(" ")}${o}`;return r.replace(n[0],d)}function vi(e="",t=null){let r=String(e||"");if(!r)return r;let n=0,o=r.replace(/<(div|section|article|aside)([^>]*)>\s*<(p|div)([^>]*)>[\s\S]*?<\/\3>\s*<(p|div)([^>]*)>[\s\S]*?<\/\5>\s*<\/\1>/gi,(a,i,s,d,l,u,c)=>{let p=String(s||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!p||!se(p[2]).includes("stack-sm"))return a;let h=String(l||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i),v=String(c||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!h||!v)return a;let g=se(h[2]),f=se(v[2]);if(!(g.some(b=>/^import-text-/.test(String(b||"")))&&f.some(b=>/^import-text-/.test(String(b||"")))))return a;let x=Vn(s,"stack-sm");return n+=1,a.replace(`<${i}${s}>`,`<${i}${x}>`)});return t&&n>0&&(t.intentHits+=1,P(t,"intent.typography.metric-pair-no-stack"),D(t,`Removed stack-sm from ${n} metric text pair container(s).`)),o}function xi(e={}){if(!e||typeof e!="object")return{};let t=e.typography;if(t&&typeof t=="object")return t;let r=e.design?.typography;return r&&typeof r=="object"?r:{}}function wi(e={}){let t=xi(e),r=Number(t.fontScale);return Number.isFinite(r)?Math.max(1,Math.min(2,r)):At}function ki(e="",t=At){let n={"4xl":1,"3xl":2,"2xl":3,xl:4}[e];if(!n)return"";let o=Number.isFinite(Number(t))?Math.max(1,Math.min(2,Number(t))):At,a=Math.max(-1,Math.min(1,Math.round((o-At)/.25))),i=n-a;return i<1?"h1":i>4?"":`h${i}`}function Si(e="",t=null,r={}){let n=String(e||"");if(!n)return n;let o=wi(r.config||{}),a=0,i=0,s=n.replace(/<(p|div|span)([^>]*)>([\s\S]*?)<\/\1>/gi,(d,l,u,c)=>{let p=String(u||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!p)return d;let m=se(p[2]);if(!m.includes("import-font-bold"))return d;let v=m.find(b=>/^import-text-(?:4xl|3xl|2xl|xl)$/.test(String(b||"")))||"",g=v.match(/^import-text-(4xl|3xl|2xl|xl)$/);if(g){let b=ki(g[1],o);if(!b)return d;let S=yi(u,C=>C.filter(A=>A!=="import-font-bold"&&A!==v));return a+=1,`<${b}${S}>${c}</${b}>`}let f=/<\/?(?:div|p|section|article|aside|main|header|footer|ul|ol|li|table|tr|td|th|h[1-6])\b/i.test(c),y=/<\/?(?:strong|b)\b/i.test(c);if(f||y)return d;let x=Vn(u,"import-font-bold");return i+=1,`<${l}${x}><strong>${c}</strong></${l}>`});return t&&(a>0&&(t.intentHits+=1,P(t,"intent.typography.semantic-heading-from-scale"),D(t,`Converted ${a} bold display text node(s) to semantic heading tags (fontScale=${Number(o).toFixed(2)}).`)),i>0&&(t.intentHits+=1,P(t,"intent.typography.bold-to-strong"),D(t,`Wrapped ${i} bold text node(s) in strong tags.`))),s}function $i(e=[]){if(!Array.isArray(e)||e.length===0)return"";let t=e.filter(n=>!Et.includes(n));if(t.length===0||t.length>1)return"";let r=t[0];return["hover","focus","active"].includes(r)?r:""}function Bn(e,t="base",r=[]){let n=$i(r),o=si[e];if(o)return{declaration:o,breakpoint:t,pseudo:n,ruleId:"fallback.import-style"};let a=String(e).match(/^gap-(\d+)$/);if(a){let z={0:"var(--spacing-0)",1:"var(--spacing-1)",2:"var(--spacing-2)",3:"var(--spacing-3)",4:"var(--spacing-4)",5:"var(--spacing-5)",6:"var(--spacing-6)",7:"var(--spacing-7)",8:"var(--spacing-8)",10:"var(--spacing-10)",12:"var(--spacing-12)"},L=Number(a[1]);if(z[L])return{declaration:`gap:${z[L]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.gap-scale"}}let i=String(e).match(/^(mt|mb|my)-(.+)$/);if(i){let z=i[1],L=i[2],R=Ge(L);if(R){let k="";return z==="mt"?k=`margin-top:${R}`:z==="mb"?k=`margin-bottom:${R}`:k=`margin-top:${R};margin-bottom:${R}`,{declaration:k,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.margin-scale"}}}let s=String(e).match(/^min-w-\[([^\]]+)\]$/);if(s){let z=Te(s[1]);if(Re(z))return{declaration:`min-width:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.min-width-arbitrary"}}let d=String(e).match(/^max-w-\[([^\]]+)\]$/);if(d){let z=Te(d[1]);if(Re(z))return{declaration:`max-width:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.max-width-arbitrary"}}let l=String(e).match(/^min-h-\[([^\]]+)\]$/);if(l){let z=Te(l[1]);if(Re(z))return{declaration:`min-height:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.min-height-arbitrary"}}let u=String(e).match(/^grid-rows-\[([^\]]+)\]$/);if(u){let z=Te(u[1]);if(Re(z))return{declaration:`grid-template-rows:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.grid-rows-arbitrary"}}let c=String(e).match(/^size-(.+)$/);if(c){let z=Ge(c[1]);if(z)return{declaration:`width:${z};height:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.size-scale"}}let p=String(e).match(/^w-(.+)$/);if(p){let z=Ge(p[1]);if(z)return{declaration:`width:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.width-scale"}}let m=String(e).match(/^h-(.+)$/);if(m){let z=Ge(m[1]);if(z)return{declaration:`height:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.height-scale"}}let h={xs:"var(--font-size-xs)",sm:"var(--font-size-sm)",base:"var(--font-size-md)",lg:"var(--font-size-lg)",xl:"var(--font-size-xl)","2xl":"var(--font-size-2xl)","3xl":"var(--font-size-3xl)","4xl":"var(--font-size-4xl)"},v=String(e).match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/);if(v)return{declaration:`font-size:${h[v[1]]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.text-size"};let g={normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},f=String(e).match(/^font-(normal|medium|semibold|bold|extrabold|black)$/);if(f)return{declaration:`font-weight:${g[f[1]]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.font-weight"};let y={none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2"},x=String(e).match(/^leading-(none|tight|snug|normal|relaxed|loose)$/);if(x)return{declaration:`line-height:${y[x[1]]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.line-height"};let b={tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},S=String(e).match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);if(S)return{declaration:`letter-spacing:${b[S[1]]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.tracking"};let C=String(e).match(/^bg-black\/(\d{1,3})$/);if(C)return{declaration:`background-color:color-mix(in srgb, var(--color-gray-900) ${Math.max(0,Math.min(100,Number(C[1])))}%, transparent)`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.overlay-alpha"};if(e==="text-white")return{declaration:"color:var(--color-gray-50)",breakpoint:t,pseudo:n,ruleId:"fallback.import-style.text-inverse"};let A=String(e).match(/^bg-(primary|secondary|accent)$/);if(A){let L={primary:"var(--color-primary-fill)",secondary:"var(--color-gray-500)",accent:"var(--color-accent-500)"}[A[1]];if(L)return{declaration:`background-color:${L}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.bg-semantic"}}let T=String(e).match(/^bg-([a-z]+)-(\d{2,3})$/);if(T){let z=Je(T[1],T[2]);if(z)return{declaration:`background-color:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.bg-tokenized"}}let I=String(e).match(/^bg-\[([^\]]+)\]$/);if(I){let z=jn(I[1]);if(z)return{declaration:`background-color:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.bg-arbitrary"}}let E=String(e).match(/^text-([a-z]+)-(\d{2,3})$/);if(E){let z=Je(E[1],E[2]);if(z)return{declaration:`color:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.text-tokenized"}}let j=String(e).match(/^text-\[([^\]]+)\]$/);if(j){let z=jn(j[1]);if(z)return{declaration:`color:${z}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.text-arbitrary"}}let M=String(e).match(/^rounded(?:-([trbl]{1,2}))?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(M){let z=M[1]||"",L=M[2]||"sm",R=L==="none"?"0":`var(--radius-${L})`,k={t:["top-left","top-right"],b:["bottom-left","bottom-right"],l:["top-left","bottom-left"],r:["top-right","bottom-right"],tl:["top-left"],tr:["top-right"],bl:["bottom-left"],br:["bottom-right"]};if(!z)return{declaration:`border-radius:${R}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.rounded"};let O=(k[z]||[]).map(B=>`border-${B}-radius:${R}`).join(";");if(O)return{declaration:O,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.rounded"}}return null}function Ct(e,t){return typeof e=="number"&&Number.isFinite(e)?`${e}px`:typeof e=="string"&&e.trim()?e.trim():`${t}px`}function zi(e={}){let r=(e?.design&&typeof e.design=="object"?e.design:e)?.layout?.breakpoints||{};return{sm:Ct(r.sm,640),md:Ct(r.md,768),lg:Ct(r.lg,1024),xl:Ct(r.xl,1280)}}function Li(e,t){let r=Array.from(e.importBaseStyles.entries()).map(([a,i])=>`.${a}{${i};}`),n=[];for(let[a,i]of e.importResponsiveStyles.entries()){let s=t?.[a];if(!s||!i?.size)continue;let d=Array.from(i.entries()).map(([l,u])=>`.${l}{${u};}`).join(`
`);n.push(`@media (min-width: ${s}) {
${d}
}`)}for(let[a,i]of e.importPseudoStyles.entries()){let[s,d]=String(a).split("|");if(!d||!i?.size)continue;let l=Array.from(i.entries()).map(([c,p])=>`.${c}:${d}{${p};}`).join(`
`);if(!l)continue;if(s==="base"){n.push(l);continue}let u=t?.[s];u&&n.push(`@media (min-width: ${u}) {
${l}
}`)}let o=[...r,...n].filter(Boolean).join(`
`);return o.trim()?["/* pds-import: generated fallback styles for unmapped Tailwind utilities */",o].join(`
`):""}function Ci(e="",t=""){if(!t||!t.trim())return e;let r=`<style data-pds-import="tailwind-fallback">
${t}
</style>`;return/<head[^>]*>/i.test(e)?e.replace(/<head([^>]*)>/i,`<head$1>
${r}`):`${r}
${e}`}function Dn(e=""){if(!e)return!1;if(e.includes(":")||e.includes("["))return!0;let t=e.split("-")[0];return ci.includes(t)}function le(e=""){let t=String(e).split(":");if(t.length===1)return{breakpoint:"base",base:t[0],variants:[]};let r=t[t.length-1],n=t.slice(0,-1);return{breakpoint:n.find(a=>Et.includes(a))||"base",base:r,variants:n}}function Ai(){return{totalTailwind:0,mapped:0,ignored:0,policySkipped:0,unknown:0,intentHits:0,unknownTokens:new Map,notes:[],appliedRules:new Set,importBaseStyles:new Map,importResponsiveStyles:new Map,importPseudoStyles:new Map,importedStyleCount:0,labelNestingCount:0,removedAtomicSpacingCount:0,removedAtomicPositioningCount:0}}function Ei(e=""){let t=String(e||"").toLowerCase().replace(/\s+/g,""),r=t.includes("menu,ol,ul{list-style:none")||t.includes("ol,ul,menu{list-style:none")||t.includes("ul,ol,menu{list-style:none"),n=t.includes("a{color:inherit;text-decoration:inherit");return{listReset:r,anchorReset:n}}function Mi(e=""){return String(e||"").toLowerCase().includes("cdn.tailwindcss.com")?{listReset:!0,anchorReset:!0}:{listReset:!1,anchorReset:!1}}function Ti(e="",t=null){let r=String(e||""),n={listReset:!1,anchorReset:!1,strippedRuntimeCssBlocks:0,strippedRuntimeScripts:0};return r=r.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi,(o,a,i)=>{let s=String(i||"");if(!(/tailwindcss\s+v\d/i.test(s)||/\*\s*!\s*tailwindcss/i.test(s)))return o;let l=Ei(s);return n.listReset=n.listReset||l.listReset,n.anchorReset=n.anchorReset||l.anchorReset,n.strippedRuntimeCssBlocks+=1,""}),r=r.replace(/<script([^>]*?)src\s*=\s*(?:(['"])([^"']*cdn\.tailwindcss\.com[^"']*)\2|([^\s>]*cdn\.tailwindcss\.com[^\s>]*))([^>]*)><\/script>/gi,(o,a,i,s,d)=>{let u=Mi(s||d||"");return n.listReset=n.listReset||u.listReset,n.anchorReset=n.anchorReset||u.anchorReset,n.strippedRuntimeScripts+=1,""}),t&&(n.strippedRuntimeCssBlocks>0||n.strippedRuntimeScripts>0)&&(P(t,"intent.preflight.tailwind-runtime-detected"),n.strippedRuntimeCssBlocks>0&&D(t,`Detected and stripped ${n.strippedRuntimeCssBlocks} Tailwind runtime style block(s).`)),t&&n.strippedRuntimeScripts>0&&D(t,`Removed ${n.strippedRuntimeScripts} Tailwind CDN script reference(s).`),{html:r,hints:n}}function D(e,t){!e||!t||e.notes.includes(t)||e.notes.push(t)}function Ri(e,t){let r=e.unknownTokens.get(t)||0;e.unknownTokens.set(t,r+1)}function Ii(e={}){let r=(e?.design&&typeof e.design=="object"?e.design:e)?.layout?.utilities||{};return{grid:r.grid!==!1,flex:r.flex!==!1,spacing:r.spacing!==!1,container:r.container!==!1}}function Y(e,t){return t?e?.[t]!==!1:!0}function Hn(e){let t=String(e).match(/^grid-cols-(\d+)$/);return t?Number(t[1]):null}function Wn(e={}){let t=Et.map(o=>({bp:o,cols:e[o]})).filter(o=>Number.isFinite(o.cols));if(t.length<2)return null;if(t.length===2){let[o,a]=t;if(o.bp==="base"&&o.cols===1&&a.cols===2)return"grid-auto-lg";if(o.bp==="base"&&o.cols===1&&a.cols>=3)return null;if(o.cols<a.cols){if(a.cols>=4)return"grid-auto-md";if(a.cols>=2)return"grid-auto-lg"}return null}let r=!0;for(let o=1;o<t.length;o+=1)if(t[o].cols<=t[o-1].cols){r=!1;break}if(!r)return null;let n=t[t.length-1]?.cols||0;return n>=4?"grid-auto-md":n>=3?"grid-auto-sm":null}function _i(e=""){let t=String(e).match(/^text-(gray|slate|zinc|neutral|stone)-(\d{2,3})$/);if(!t)return"";let r=Number(t[2]);return Number.isFinite(r)&&r>=400&&r<=600?"text-muted":""}function Fi(e="",t=0){return!e||!Number.isFinite(t)?"":{sm:{2:"sm:grid-cols-2"},md:{3:"md:grid-cols-3"},lg:{4:"lg:grid-cols-4"}}?.[e]?.[t]||""}function Pi(e=""){let t=le(e),n=String(t?.base||"").match(/^space-y-(\d+)$/);if(!n)return"stack-md";let o=Number(n[1]);return Number.isFinite(o)?o<=1?"stack-xs":o<=2?"stack-sm":o<=4?"stack-md":"stack-lg":"stack-md"}function Ni(e=new Set){return Array.from(e).some(t=>{let r=String(t||"");return/^gap-(?:xs|sm|md|lg|xl)$/.test(r)||/^gap-[0-9]+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?gap-/.test(r)})}function Oi(e=new Set){return Array.from(e).some(t=>/^stack-(?:xs|sm|md|lg|xl)$/.test(String(t||"")))}function ji(e=new Set){return Array.from(e).some(t=>{let r=String(t||"");return/^grid-cols-\d+$/.test(r)||/^grid-auto-(?:sm|md|lg|xl)$/.test(r)||/^(?:sm|md|lg|xl):grid-cols-\d+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?grid-cols-\d+$/.test(r)})}function Bi(e,t=12){return Array.from(e.unknownTokens.entries()).sort((r,n)=>n[1]-r[1]).slice(0,t).map(([r])=>r)}function P(e,t){!e||!t||e.appliedRules.add(t)}function de(e=[],t){return!Array.isArray(e)||!t?!1:e.some(r=>t.test(String(r)))}function Di(e=[]){for(let t of e){let r=le(t);if(r.breakpoint!=="base")continue;let n=String(r.base).match(/^h-(.+)$/);if(!n)continue;let o=Ge(n[1]);if(!o||o==="auto")continue;let a=String(o).match(/^(-?\d+(?:\.\d+)?)rem$/);if(a){let i=Number(a[1]);if(Number.isFinite(i))return i*16}}return null}function Hi(e=[],t=""){let r=t==="button",n=de(e,/^bg-/),o=de(e,/^hover:bg-/),a=de(e,/^border/),i=de(e,/^shadow/),s=e.includes("cursor-pointer"),d=de(e,/^rounded/),l=de(e,/^(?:min-w|max-w|w)-/),u=de(e,/^text-(?:white|black|\[[^\]]+\]|[a-z]+-\d{2,3})$/),c=n||o||i;if(!(r||t==="a"&&(c||a||s||d&&l)))return{shouldNormalize:!1,variant:"none",size:"base",iconOnly:!1};let h="none";a&&!n&&!o?h="outline":(c||n&&u)&&(h="primary");let v=e.includes("rounded-full")&&(e.includes("p-2")||e.includes("p-1")||e.includes("p-2.5")),g=de(e,/^size-(?:6|7|8|9|10|11|12)$/),f=v||g,y=Di(e),x=e.includes("text-sm")||e.includes("text-xs"),b=e.includes("text-lg")||e.includes("text-xl"),S="base";return y&&y<=40||x?S="sm":(y&&y>=48||b)&&(S="lg"),{shouldNormalize:!0,variant:h,size:S,iconOnly:f}}function Wi(e=""){let t=String(e||"").toLowerCase();return["green","emerald","lime","teal"].includes(t)?"badge-success":["blue","sky","cyan","indigo"].includes(t)?"badge-info":["yellow","amber","orange"].includes(t)?"badge-warning":["red","rose","pink"].includes(t)?"badge-danger":["gray","slate","zinc","neutral","stone"].includes(t)?"badge-secondary":["purple","violet","fuchsia","primary","accent"].includes(t)?"badge-primary":"badge-secondary"}function Ui(e=[],t="",r={shouldNormalize:!1}){if(r?.shouldNormalize)return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(["button","a","input","select","textarea"].includes(t))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(e.some(E=>/^badge(?:-|$)/.test(String(E))))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let n=e.map(E=>le(E)).filter(E=>E.breakpoint==="base").map(E=>String(E.base)),o=n.some(E=>/^rounded(?:-|$)/.test(E)),a=n.some(E=>/^px-/.test(E)),i=n.some(E=>/^py-/.test(E)),s=a&&i,d=n.includes("text-xs")||n.includes("text-sm"),l=n.includes("text-lg")||n.includes("text-xl"),u=n.map(E=>E.match(/^bg-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),c=n.map(E=>E.match(/^text-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),p=n.map(E=>E.match(/^border-([a-z]+)-(\d{2,3})$/)).find(Boolean),m=Number(u?.[2]),h=Number(c?.[2]),v=!!(u&&Number.isFinite(m)&&m<=300),g=n.some(E=>/^border(?:-|$)/.test(E)),f=!!(u||c||p),y=[o,s,d,v||g].filter(Boolean).length;if(!(f&&y>=3))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let b=u&&u[1]||c&&c[1]||p&&p[1]||"",S=Wi(b),C=g&&!v,A=d?"badge-sm":l?"badge-lg":"",T=v?{family:b,bgShade:Number.isFinite(m)?m:200,textShade:Number.isFinite(h)?h:700}:null;return{shouldNormalize:!0,variantClass:T?"":S,outline:C,sizeClass:A,pastel:T}}function qi(e="",t=0){let r=String(e||"").toLowerCase(),n=Number(t);return r==="white"?"surface-base":["gray","slate","zinc","neutral","stone"].includes(r)?Number.isFinite(n)&&n<=100?"surface-base":"surface-subtle":["blue","sky","cyan","indigo","primary","info"].includes(r)?"surface-info":["purple","violet","fuchsia","accent"].includes(r)?"surface-primary":["green","emerald","lime","teal","success"].includes(r)?"surface-success":["yellow","amber","orange","warning"].includes(r)?"surface-warning":["red","rose","pink","danger"].includes(r)?"surface-danger":"surface-base"}function Vi(e=[],t="",r={shouldNormalize:!1},n={shouldNormalize:!1}){if(r?.shouldNormalize||n?.shouldNormalize)return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(!new Set(["div","section","article","aside","li"]).has(t))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(e.some(g=>/^card(?:-|$)/.test(String(g))))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let a=e.map(g=>le(g)).filter(g=>g.breakpoint==="base").map(g=>String(g.base)),i=a.some(g=>/^rounded(?:-|$)/.test(g)),s=a.some(g=>/^border(?:$|-)/.test(g)),d=a.some(g=>/^shadow(?:$|-)/.test(g)),l=a.some(g=>/^(?:p|px|py|pt|pb|pl|pr)-/.test(g)),u=a.map(g=>g.match(/^bg-([a-z]+)-?(\d{2,3})?$/)).find(Boolean),c=a.includes("bg-white")||!!u;if(!([i,s||d,c,l].filter(Boolean).length>=3))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let h="card-basic";d?h="card-elevated":s&&(h="card-outlined");let v="";return d?v="surface-elevated":u?v=qi(u[1],u[2]):c&&(v="surface-base"),{shouldNormalize:!0,cardVariantClass:h,surfaceClass:v}}function Gi({tagName:e,originalClassValue:t,policy:r,summary:n,preflightHints:o={}}){if(ii.has(e))return P(n,"table.strict-tags.no-classes"),"";let a=String(t).split(/\s+/).filter(Boolean),i=Hi(a,e),s=Ui(a,e,i),d=Vi(a,e,i,s),l=/^h[1-6]$/.test(e),u=["i","svg"].includes(e)||a.some(M=>/^fa(?:[a-z-]+)?$/i.test(String(M||""))||/^fa-/.test(String(M||""))),c=new Set,p={},m={},h=!1,v="",g="",f=!1,y="";a.forEach(M=>{let z=le(M),L=z.base;if(ai.some(F=>F.test(L))){n.ignored+=1,P(n,"cleanup.non-pds-class");return}let R=Dn(M)||Dn(L);if(R&&(n.totalTailwind+=1),/^space-y-/.test(L)){h=!0,v=v||M,g=g||Pi(M),n.ignored+=1,P(n,"layout.spacing.space-y-to-stack");return}if(/^space-x-/.test(L)){let F=String(L).match(/^space-x-(\d+)$/);if(F){let H=`gap-${F[1]}`,W=yr.get(H);if(W&&Y(r,"spacing")){c.add(W),f=!0,y=y||M,n.mapped+=1,n.intentHits+=1,P(n,"layout.spacing.space-x-to-gap");return}}n.ignored+=1,P(n,"style.spacing.atomic");return}if(/^grid-cols-\d+$/.test(L)&&z.breakpoint!=="base"){let F=Hn(L);if(Number.isFinite(F)&&Y(r,"grid")){p[z.breakpoint]=F,n.mapped+=1,P(n,"intent.layout.responsive-grid-to-auto");return}if(!Y(r,"grid")){n.policySkipped+=1,D(n,"Skipped responsive grid mapping because layout.utilities.grid=false.");return}}if(/^flex-(?:row|col)$/.test(L)&&z.breakpoint!=="base"){if(Y(r,"flex")){m[z.breakpoint]=L,n.mapped+=1,P(n,"intent.layout.mobile-stack");return}n.policySkipped+=1,D(n,"Skipped responsive flex mapping because layout.utilities.flex=false.");return}if(/^grid-cols-\d+$/.test(L)&&z.breakpoint==="base"){let F=Hn(L);Number.isFinite(F)&&Y(r,"grid")&&(p.base=F)}let k=oi.get(L);if(k&&z.breakpoint==="base"){if(!Y(r,k.gate)){n.policySkipped+=1,D(n,`Skipped ${L} because layout.utilities.${k.gate}=false.`);return}k.pds.forEach(F=>{F&&c.add(F)}),n.mapped+=1,P(n,k.id);return}if(yr.has(L)&&z.breakpoint==="base"){if(!Y(r,"spacing")){n.policySkipped+=1,D(n,"Skipped gap utility because layout.utilities.spacing=false.");return}c.add(yr.get(L)),n.mapped+=1,P(n,"layout.spacing.gap-scale");return}if(Pn.has(L)&&z.breakpoint==="base"){if(!Y(r,"container")){n.policySkipped+=1,D(n,"Skipped max-width utility because layout.utilities.container=false.");return}c.add(Pn.get(L)),n.mapped+=1,P(n,"layout.container.max-width");return}if(i.shouldNormalize&&R){let F=String(L||"");if(z.breakpoint==="base"&&["flex-1","grow","flex-grow"].includes(F)){c.add("grow"),n.mapped+=1,n.intentHits+=1,P(n,"intent.component.button.layout-grow");return}if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(F)||F.startsWith("hover:")){n.ignored+=1,P(n,"intent.component.button.normalize");return}}if(l&&/^(?:text-(?:xs|sm|base|lg|xl|\dxl|white|black|\[[^\]]+\]|[a-z]+-\d{2,3})|font-|leading-|tracking-|uppercase|lowercase|capitalize)/.test(L)){n.ignored+=1,n.intentHits+=1,P(n,"intent.typography.heading-semantic");return}if(s.shouldNormalize&&R){let F=String(L||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(F)||F.startsWith("hover:")){n.ignored+=1,P(n,"intent.component.badge.normalize");return}}if(d.shouldNormalize&&R){let F=String(L||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)/.test(F)||F.startsWith("hover:")){n.ignored+=1,P(n,"intent.component.card.normalize");return}}let _=_i(L);if(_&&z.breakpoint==="base"){c.add(_),n.mapped+=1,n.intentHits+=1,P(n,"intent.typography.text-neutral-to-muted");return}if(/^text-(?:white|black|[a-z]+-\d{2,3}|\[[^\]]+\])$/.test(L)){if(u||e==="a"&&!i.shouldNormalize){let H=Bn(L,z.breakpoint,z.variants);if(H){let W=he(n,`${e}-color-${L}`,H.declaration,H.breakpoint,H.pseudo);if(W){c.add(W),n.mapped+=1,n.intentHits+=1,P(n,u?"intent.icon.color-preserve":"intent.typography.link-active-preserve");return}}}n.ignored+=1,P(n,"style.color");return}let B=Bn(L,z.breakpoint,z.variants);if(B){let F=he(n,L,B.declaration,B.breakpoint,B.pseudo);if(F){c.add(F),n.mapped+=1,n.intentHits+=1,P(n,B.ruleId),z.breakpoint!=="base"&&D(n,`Generated responsive import fallback for ${M}.`);return}}for(let F of J.ignoredPatterns)if(F.pattern.test(L)){n.ignored+=1,P(n,F.id),F.id==="style.spacing.atomic"&&(n.removedAtomicSpacingCount+=1),F.id==="style.positioning.atomic"&&(n.removedAtomicPositioningCount+=1);return}if(R){n.unknown+=1,Ri(n,M);return}c.add(M)}),h&&Y(r,"spacing")&&(c.add(g||"stack-md"),n.mapped+=1,n.intentHits+=1,D(n,`Mapped ${v} to ${g||"stack-md"}.`)),f&&Y(r,"spacing")&&D(n,`Mapped ${y} to gap utility.`);let x=Wn(p);if(x&&Y(r,"grid")?(c.delete("grid-cols-1"),c.delete("grid-cols-2"),c.delete("grid-cols-3"),c.delete("grid-cols-4"),c.delete("grid-cols-6"),c.add("grid"),c.add(x),n.intentHits+=1,P(n,"intent.layout.responsive-grid-to-auto"),D(n,`Collapsed responsive grid columns to ${x}.`)):Y(r,"grid")&&Et.filter(z=>z!=="base"&&Number.isFinite(p[z])).forEach(z=>{let L=p[z],R=Fi(z,L);if(R){c.add("grid"),c.add(R),n.intentHits+=1,P(n,"intent.layout.responsive-grid-to-auto"),D(n,`Mapped ${z}:grid-cols-${L} to ${R}.`);return}let k=he(n,`grid-cols-${L}`,`grid-template-columns:repeat(${L}, minmax(0, 1fr))`,z);k&&(c.add("grid"),c.add(k),n.intentHits+=1,P(n,"fallback.import-style.grid-cols-responsive"),D(n,`Mapped ${z}:grid-cols-${L} to responsive import fallback for exact columns.`))}),Y(r,"flex")&&a.includes("flex-col")&&(m.md==="flex-row"||m.lg==="flex-row")&&(c.delete("flex-col"),c.delete("flex-row"),c.add("mobile-stack"),n.intentHits+=1,P(n,"intent.layout.mobile-stack"),D(n,"Mapped flex-col + breakpoint flex-row to mobile-stack.")),(c.has("flex")||c.has("inline-flex"))&&Y(r,"spacing")&&(Ni(c)||Oi(c)||f||h||(c.add("gap-sm"),n.intentHits+=1,P(n,"layout.spacing.flex-min-gap"),D(n,"Added gap-sm fallback for flex container without explicit spacing."))),a.some(M=>/^grid-cols-\d+$/.test(le(M).base))&&c.has("grid")&&!ji(c)){let M=Wn(p);M?(c.add(M),n.intentHits+=1,P(n,"intent.layout.responsive-grid-to-auto"),D(n,`Applied grid safety fallback ${M} to avoid bare grid output.`)):Number.isFinite(p.base)&&p.base>1?(c.add(`grid-cols-${p.base}`),n.intentHits+=1,P(n,"intent.layout.grid-safety-fallback"),D(n,`Applied grid safety fallback grid-cols-${p.base} to preserve explicit grid intent.`)):(c.add("mobile-stack"),n.intentHits+=1,P(n,"intent.layout.grid-safety-fallback.mobile-stack"),D(n,"Applied mobile-stack safety fallback to avoid bare grid output when explicit grid intent was present."))}let C=a.some(M=>/^(?:bg-white|shadow|shadow-md|shadow-lg)$/.test(M)),A=a.some(M=>/^rounded/.test(M));if(["div","section","article","li","aside"].includes(e)&&C&&A&&(c.add("card"),!c.has("surface-elevated")&&a.some(M=>/^shadow/.test(M))&&c.add("surface-elevated"),!c.has("surface-base")&&a.includes("bg-white")&&c.add("surface-base"),n.intentHits+=1,P(n,"intent.component.card")),e==="button"||e==="a"){let M=a.some(R=>/^bg-(?:[a-z]+-)?[4567]00$/.test(R))&&a.includes("text-white"),z=a.some(R=>/^border/.test(R))&&!M,L=a.includes("p-2")&&a.includes("rounded-full");M?(c.delete("surface-base"),c.delete("surface-elevated"),c.add("btn-primary"),n.intentHits+=1,P(n,"intent.component.button.primary")):z&&(c.add("btn-outline"),n.intentHits+=1,P(n,"intent.component.button.outline")),L&&(c.add("icon-only"),P(n,"intent.component.button.icon-only"))}if(i.shouldNormalize){for(let z of Array.from(c))String(z).startsWith("import-")&&c.delete(z);["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","surface-base","surface-elevated","surface-subtle","card"].forEach(z=>c.delete(z)),i.variant==="primary"?(c.add("btn-primary"),P(n,"intent.component.button.primary")):i.variant==="outline"&&(c.add("btn-outline"),P(n,"intent.component.button.outline")),i.size==="sm"?(c.add("btn-sm"),P(n,"intent.component.button.size-sm")):i.size==="lg"&&(c.add("btn-lg"),P(n,"intent.component.button.size-lg")),i.iconOnly&&(c.add("icon-only"),P(n,"intent.component.button.icon-only")),n.intentHits+=1,P(n,"intent.component.button.normalize")}if(s.shouldNormalize){for(let z of Array.from(c))String(z).startsWith("import-")&&c.delete(z);if(["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","grow","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","text-muted","surface-base","surface-elevated","surface-subtle","card"].forEach(z=>c.delete(z)),c.add("badge"),s.variantClass&&c.add(s.variantClass),s.outline&&c.add("badge-outline"),s.sizeClass&&c.add(s.sizeClass),s.pastel&&s.pastel.family){let z=Je(s.pastel.family,String(s.pastel.bgShade||200)),L=Je(s.pastel.family,String(s.pastel.textShade||700));if(z&&L){let R=`badge-pastel-${s.pastel.family}-${s.pastel.bgShade}-${s.pastel.textShade}`,k=he(n,R,`background-color:${z};color:${L}`,"base");k&&(c.add(k),P(n,"intent.component.badge.pastel-preserve"),D(n,`Preserved pastel badge tone using ${k}.`))}}n.intentHits+=1,P(n,"intent.component.badge.normalize"),D(n,"Normalized badge/pill utility cluster to PDS badge classes.")}if(d.shouldNormalize){for(let z of Array.from(c))String(z).startsWith("import-")&&c.delete(z);["surface-base","surface-subtle","surface-elevated","surface-sunken","surface-overlay","surface-inverse","surface-primary","surface-secondary","surface-success","surface-warning","surface-danger","surface-info","card-basic","card-elevated","card-outlined","card-interactive"].forEach(z=>c.delete(z)),c.add("card"),d.cardVariantClass&&c.add(d.cardVariantClass),d.surfaceClass&&c.add(d.surfaceClass),n.intentHits+=1,P(n,"intent.component.card.normalize"),D(n,"Normalized card utility cluster to PDS card/surface classes.")}if(e==="a"&&!i.shouldNormalize&&a.some(z=>z.includes("hover:text")||z==="transition-colors")){let z=he(n,"link-reset","text-decoration:none");z&&c.add(z),n.intentHits+=1,P(n,"intent.typography.link-treatment")}if(e==="footer"&&(c.has("surface-base")||a.some(z=>/^bg-/.test(z)))&&(c.delete("surface-base"),c.delete("surface-subtle"),c.add("surface-inverse"),n.intentHits+=1,P(n,"intent.surface.footer-inverse")),o?.listReset&&["ul","ol","menu"].includes(e)){let M=he(n,"list-reset","list-style:none;margin:0;padding:0");M&&(c.add(M),n.intentHits+=1,P(n,"intent.preflight.list-reset"))}if(o?.anchorReset&&e==="a"&&!i.shouldNormalize){let M=he(n,"anchor-reset","color:inherit;text-decoration:inherit");M&&(c.add(M),n.intentHits+=1,P(n,"intent.preflight.anchor-reset"))}let E=new Set(["div","section","article","aside","nav","main","header","footer","form","fieldset","ul","ol","li"]),j=a.some(M=>{let z=le(M).base;return/^(?:flex|grid|container|gap-|space-[xy]-|items-|justify-|content-|place-|self-|w-|h-|min-|max-)/.test(z)});return c.size===0&&E.has(e)&&j&&(c.add("stack-sm"),D(n,`Added stack-sm fallback for <${e}> with unmapped classes.`)),Array.from(c).join(" ")}function Ki(e="",t={}){let r=String(e||""),n=Ii(t.config||{}),o=zi(t.config||{}),a=Ai(),i=Ti(r,a),d=di(i.html,a).replace(/<([a-zA-Z][\w:-]*)([^>]*?)\sclass\s*=\s*(["'])(.*?)\3([^>]*)>/gs,(S,C,A,T,I,E)=>{let j=Gi({tagName:String(C||"").toLowerCase(),originalClassValue:I,policy:n,summary:a,preflightHints:i.hints}),M=String(j||"").trim();return M?`<${C}${A} class=${T}${M}${T}${E}>`:`<${C}${A}${E}>`}),l=Si(vi(bi(hi(d,a),a),a),a,{config:t.config||{}}),u=Li(a,o),c=Ci(l,u);u&&D(a,`Generated ${a.importedStyleCount} import-* fallback style mappings.`),(a.removedAtomicSpacingCount>0||a.removedAtomicPositioningCount>0)&&D(a,`Removed atomic utilities by policy: spacing=${a.removedAtomicSpacingCount}, positioning=${a.removedAtomicPositioningCount}.`);let p=Bi(a,16),m=a.mapped+a.ignored+a.policySkipped,h=a.totalTailwind>0?m/a.totalTailwind:1,v=a.totalTailwind>0?a.unknown/a.totalTailwind:0,g=.42+h*.45+Math.min(a.intentHits,4)*.025-v*.18,f=Math.max(.15,Math.min(.96,Number(g.toFixed(2)))),y=[`pds-import: rulebook=${Fn} confidence=${Math.round(f*100)}%`,`pds-import: tailwind=${a.totalTailwind} mapped=${a.mapped} ignored=${a.ignored} policySkipped=${a.policySkipped} unknown=${a.unknown}`];p.length&&y.push(`pds-import: unknown-tailwind=${p.join(", ")}`),a.notes.length&&y.push(`pds-import: notes=${a.notes.join(" | ")}`);let x=`<!-- ${y.join(` -->
<!-- `)} -->
${c}`,b=[];return a.unknown>0&&b.push({severity:"warning",message:`Converted with ${a.unknown} unknown Tailwind utilities requiring manual review.`}),a.policySkipped>0&&b.push({severity:"info",message:`Skipped ${a.policySkipped} utility mappings due to PDS config policy.`}),p.length&&b.push({severity:"info",message:`Top unknown utilities: ${p.slice(0,8).join(", ")}`}),{html:x,confidence:f,issues:b,meta:{rulebookVersion:Fn,coverage:{tailwind:a.totalTailwind,mapped:a.mapped,ignored:a.ignored,policySkipped:a.policySkipped,unknown:a.unknown,importedStyles:a.importedStyleCount,nestedLabelPairs:a.labelNestingCount},unknownTailwindTokens:p,notes:a.notes,appliedRules:Array.from(a.appliedRules),policy:n,importStyleSheetInjected:!!u,breakpoints:o}}}function Ji(){return{rulesJsonPath:ri,...J,directMappings:J.directMappings.map(e=>({id:e.id,tw:e.tw,pds:e.pds,gate:e.gate||null})),ignoredPatterns:J.ignoredPatterns.map(e=>({id:e.id,pattern:String(e.pattern),reason:e.reason}))}}function Yi(e){let t=String(e||"").match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);return t?t[0]:null}function Zi(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Gn(e){return/<\s*[a-z][^>]*>/i.test(String(e||""))}function Xi(e){let t=String(e||"").trim().toLowerCase();if(!t)return null;let r=Number.parseFloat(t);return Number.isFinite(r)?t.endsWith("rem")||t.endsWith("em")?r*16:t.endsWith("px")||/^[0-9.\-]+$/.test(t)?r:null:null}function te(e){let t=String(e||"").trim();if(!t)return"";let r=t.match(/#(?:[0-9a-f]{3,8})\b/i);if(r)return r[0].toLowerCase();let n=t.match(/rgba?\([^)]*\)/i);if(n)return n[0];let o=t.match(/hsla?\([^)]*\)/i);return o?o[0]:""}function Qi(e=""){let t=String(e||"").trim();if(!t||typeof window>"u"||typeof document>"u")return"";let r=document.documentElement;if(!r)return"";let n=window.getComputedStyle(r);return String(n.getPropertyValue(t)||"").trim()}function es(e=""){let t=String(e||"").trim(),r=te(t);if(r)return r;let n=t.match(/var\(\s*(--[^\s,)]+)\s*(?:,[^)]+)?\)/i);if(!n)return"";let o=Qi(n[1]);return te(o)}function ts(e=""){let t=String(e||"").trim();if(!t)return"";let r=t.split(":").pop()||t;if(r==="bg-white")return"#ffffff";if(r==="bg-black")return"#000000";let n=r.match(/^bg-black\/(\d{1,3})$/i);if(n)return`rgba(0,0,0,${Math.max(0,Math.min(100,Number(n[1])))/100})`;let o=r.match(/^bg-\[([^\]]+)\]$/i);if(o)return te(o[1]);let a=r.match(/^bg-([a-z]+)-(\d{2,3})$/i);if(!a)return"";let i=Je(a[1],a[2]);return i?es(i):""}function Un(e=""){return String(e||"").split(/\s+/).map(r=>r.trim()).filter(Boolean).map(r=>ts(r)).filter(Boolean)}function rs(e=""){let t=[],r=String(e||""),n=/([^{}]+)\{([^{}]*)\}/g,o=n.exec(r);for(;o;){let a=String(o[1]||"").trim(),i=String(o[2]||"").trim();a&&i&&t.push({selector:a,body:i}),o=n.exec(r)}return t}function ns(e=""){let t=String(e||"").toLowerCase();return t?/(^|\s|,)(html|body|:root|main)(\s|,|$)|#app\b|#root\b|\.app\b|\.page\b/.test(t):!1}function os(e=""){let t=String(e||"").trim().match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)/i);if(!t)return null;let r=Number.parseFloat(t[1]),n=Number.parseFloat(t[2]),o=Number.parseFloat(t[3]),a=t[4]==null?1:Number.parseFloat(t[4]);return[r,n,o,a].every(i=>Number.isFinite(i))?{r:Math.max(0,Math.min(255,r)),g:Math.max(0,Math.min(255,n)),b:Math.max(0,Math.min(255,o)),a:Math.max(0,Math.min(1,a))}:null}function as(e=""){let t=String(e||"").trim().match(/^#([0-9a-f]{3,8})$/i);if(!t)return null;let r=t[1].toLowerCase();if(r.length===3){let[n,o,a]=r.split("");return{r:Number.parseInt(`${n}${n}`,16),g:Number.parseInt(`${o}${o}`,16),b:Number.parseInt(`${a}${a}`,16),a:1}}return r.length===6||r.length===8?{r:Number.parseInt(r.slice(0,2),16),g:Number.parseInt(r.slice(2,4),16),b:Number.parseInt(r.slice(4,6),16),a:r.length===8?Number.parseInt(r.slice(6,8),16)/255:1}:null}function Kn(e=""){let t=te(e);return t?t.startsWith("#")?as(t):t.startsWith("rgb")?os(t):null:null}function is(e){if(!e)return null;let t=a=>{let i=Number(a)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4},r=t(e.r),n=t(e.g),o=t(e.b);return .2126*r+.7152*n+.0722*o}function qn(e=""){let t=String(e||"").trim().toLowerCase();if(!t||t==="transparent")return!0;let r=Kn(t);return r&&Number.isFinite(r.a)?r.a<=.04:!1}function ss(e=[],t=[]){let r=e.map(d=>te(d)).filter(d=>d&&!qn(d)),n=Ke(r);if(n)return{color:n,source:"root"};let o=t.map(d=>te(d)).filter(d=>d&&!qn(d)),a=o.filter(d=>{let l=Kn(d),u=is(l);return Number.isFinite(u)?u>=.72:!1}),i=Ke(a);if(i)return{color:i,source:"fallback-bright"};let s=Ke(o);return s?{color:s,source:"fallback"}:{color:"",source:"none"}}function Me(e,t=new Map){let r=String(e||""),n=/([a-z-]+)\s*:\s*([^;{}]+)/gi,o=n.exec(r);for(;o;){let a=String(o[1]||"").trim().toLowerCase(),i=String(o[2]||"").trim();a&&i&&(t.has(a)||t.set(a,[]),t.get(a).push(i)),o=n.exec(r)}return t}function ls(e=""){let t=String(e||""),r=new Map,n=[],o=[],a=[],i=[],s=[],d=[],l=[],u=/#(?:[0-9a-f]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi,c=p=>{(String(p||"").match(u)||[]).forEach(h=>{let v=te(h);v&&n.push(v)})};if(typeof DOMParser<"u"&&Gn(t))try{let m=new DOMParser().parseFromString(t,"text/html");Array.from(m.querySelectorAll("style")).map(x=>x.textContent||"").forEach(x=>{Me(x,r),c(x),rs(x).forEach(b=>{if(!ns(b.selector))return;let S=Me(b.body,new Map),C=Z(S,["background","background-color"]).map(A=>te(A)).filter(Boolean);o.push(...C)})}),Array.from(m.querySelectorAll("[style]")).forEach(x=>{let b=x.getAttribute("style")||"";Me(b,r),c(b)}),["html","body","main","#app","#root",".app",".page"].forEach(x=>{let b=m.querySelector(x);if(!b)return;let S=b.getAttribute("style")||"";if(!S)return;let C=Me(S,new Map),A=Z(C,["background","background-color"]).map(I=>te(I)).filter(Boolean);o.push(...A);let T=Un(b.getAttribute("class")||"");a.push(...T)}),Array.from(m.querySelectorAll("[class]")).forEach(x=>{let b=se(x.getAttribute("class")||"");d.push(...b);let S=Un(x.getAttribute("class")||"");i.push(...S);let C=String(x.tagName||"").toLowerCase(),A=C==="button"||C==="a",T=b.some(I=>/^bg-/.test(String(le(I).base||"")));A&&T&&S.length&&s.push(...S)});let y=m.body?.textContent||"";y.trim()&&l.push(y),c(m.documentElement?.outerHTML||t)}catch{Me(t,r),c(t),l.push(t)}else Me(t,r),c(t),l.push(t);return{declarations:r,colorValues:n,rootBackgroundColors:o,rootClassBackgroundColors:a,classBackgroundColors:i,buttonBackgroundColors:s,classTokens:d,textCorpus:l.join(`
`)}}function Ke(e=[]){let t=new Map;e.forEach(o=>{let a=String(o||"").trim();a&&t.set(a,(t.get(a)||0)+1)});let r="",n=-1;return t.forEach((o,a)=>{o>n&&(r=a,n=o)}),r}function Z(e,t=[]){return t.flatMap(r=>e.get(r)||[])}function cs(e,t){if(!e||!t)return null;let r=String(t).split(".").filter(Boolean),n=e;for(let o of r){if(!n||n.type!=="object"||!n.properties||typeof n.properties!="object")return null;n=n.properties[o]}return n||null}function ds(e={}){let t=e&&typeof e=="object"?e:{},r=w?.configRelations&&typeof w.configRelations=="object"?w.configRelations:{},n=new Set(Object.keys(r)),o=null;if(typeof w?.buildConfigFormSchema=="function")try{o=w.buildConfigFormSchema(t)?.schema||null}catch{o=null}return!o&&w?.configFormSchema?.schema&&(o=w.configFormSchema.schema),{design:t,schema:o,allowedPaths:n}}function us(e,t){if(!e)return t;if(Array.isArray(e.oneOf)&&e.oneOf.length){let r=e.oneOf.map(n=>n?.const).filter(n=>n!=null);if(r.length){if(typeof t=="string"){let n=r.find(o=>String(o).toLowerCase()===t.toLowerCase());if(n!==void 0)return n}if(typeof t=="number"){let n=r.map(o=>Number(o)).filter(o=>Number.isFinite(o));if(n.length)return n.reduce((o,a)=>Math.abs(a-t)<Math.abs(o-t)?a:o,n[0])}return r[0]}}if(e.type==="number"||e.type==="integer"){let r=Number(t);return Number.isFinite(r)?e.type==="integer"?Math.round(r):r:void 0}return e.type==="boolean"?!!t:e.type==="string"?String(t||"").trim():t}function ps(e,t,r){let n=String(t||"").split(".").filter(Boolean);if(!n.length)return;let o=e;for(let a=0;a<n.length;a+=1){let i=n[a];if(a===n.length-1){o[i]=r;return}(!o[i]||typeof o[i]!="object"||Array.isArray(o[i]))&&(o[i]={}),o=o[i]}}function V(e,t,r){if(r==null||r===""||e.allowedPaths.size&&!e.allowedPaths.has(t))return;let n=cs(e.schema,t),o=us(n,r);o==null||o===""||(ps(e.patch,t,o),e.inferredPaths.add(t))}function be(e=[]){let t=e.map(n=>Xi(n)).filter(n=>Number.isFinite(n));if(!t.length)return null;t.sort((n,o)=>n-o);let r=Math.floor(t.length/2);return t.length%2?t[r]:(t[r-1]+t[r])/2}function fs(e=[]){let t=e.map(r=>String(r||"").split(",")[0]||"").map(r=>r.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean);return Ke(t)}function gs(e){let t=Number(e);return Number.isFinite(t)?t<=.75?"hairline":t<=1.5?"thin":t<=2.5?"medium":"thick":"thin"}function ms(e=""){let r=String(le(e).base||"").toLowerCase().match(/^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(!r)return null;let n=r[1]||"DEFAULT",o={none:0,xs:2,sm:4,DEFAULT:6,md:8,lg:12,xl:16,"2xl":24,"3xl":32};return n==="full"?null:Number.isFinite(o[n])?o[n]:null}function hs(e=[]){let t=e.map(n=>ms(n)).filter(n=>Number.isFinite(n));if(!t.length)return null;t.sort((n,o)=>n-o);let r=Math.floor(t.length/2);return t.length%2?t[r]:(t[r-1]+t[r])/2}function xr(e={}){let t=String(e.html||"");if(!t.trim())return q({source:"html-inference",type:String(e.sourceType||"design-inference"),confidence:0,issues:[{severity:"warning",message:"No HTML or guideline text provided for design extraction."}],designPatch:{},meta:{extractedPathCount:0,extractedPaths:[]}});let r=ds(e.config||{}),n=ls(t),o={patch:{},inferredPaths:new Set,allowedPaths:r.allowedPaths,schema:r.schema},a=Z(n.declarations,["color"]).map(U=>te(U)).filter(Boolean),i=Z(n.declarations,["background","background-color"]).map(U=>te(U)).filter(Boolean),s=[...i,...a,...n.colorValues].filter(Boolean),d=Array.from(new Set(s)),l=[...n.rootBackgroundColors||[]],u=[...n.rootClassBackgroundColors||[]],c=l.length?l:u,p=[...i,...n.classBackgroundColors||[]],m=ss(c,p),h=m.color;V(o,"colors.background",h||i[0]||d[0]);let v=d.filter(U=>U&&U!==h),f=Ke(n.buttonBackgroundColors||[])||v[0]||d[0],y=v.filter(U=>U&&U!==f);V(o,"colors.primary",f),V(o,"colors.secondary",y[0]||f||d[0]),V(o,"colors.accent",y[1]||y[0]||f||d[0]);let x=Z(n.declarations,["font-family"]),b=fs(x);V(o,"typography.fontFamilyBody",b),V(o,"typography.fontFamilyHeadings",b),V(o,"typography.fontFamilyMono",/mono|code/i.test(n.textCorpus)?"JetBrains Mono":"");let S=Z(n.declarations,["font-size"]),C=be(S);V(o,"typography.baseSize",C);let A=Z(n.declarations,["padding","padding-top","padding-right","padding-bottom","padding-left","margin","margin-top","margin-right","margin-bottom","margin-left","gap","row-gap","column-gap"]),T=be(A);V(o,"spatialRhythm.baseUnit",T),V(o,"spatialRhythm.inputPadding",T),V(o,"spatialRhythm.buttonPadding",T);let I=Z(n.declarations,["border-radius"]),E=be(I)||hs(n.classTokens||[]);V(o,"shape.radiusSize",E);let j=Z(n.declarations,["border-width","border-top-width","border-right-width","border-bottom-width","border-left-width"]),M=be(j);V(o,"shape.borderWidth",gs(M));let z=Z(n.declarations,["max-width"]),L=be(z);V(o,"layout.containerMaxWidth",L),V(o,"layout.maxWidth",L);let R=Z(n.declarations,["min-height","height"]),k=be(R);V(o,"layout.buttonMinHeight",k),V(o,"layout.inputMinHeight",k);let _=Z(n.declarations,["transition-duration"]),O=be(_.map(U=>{let ce=String(U||"").trim().toLowerCase(),ne=Number.parseFloat(ce);return Number.isFinite(ne)?ce.endsWith("ms")?ne:ce.endsWith("s")?ne*1e3:ne:null}));V(o,"behavior.transitionSpeed",O);let F=Z(n.declarations,["box-shadow"]).length>0;V(o,"layers.baseShadowOpacity",F?.2:.08);let H=Array.from(o.inferredPaths),W=H.reduce((U,ce)=>{let ne=ce.split(".")[0];return U[ne]=(U[ne]||0)+1,U},{}),Pt=H.length?Math.min(.92,.35+H.length*.02):.25;return q({source:"html-inference",type:String(e.sourceType||"design-inference"),confidence:Pt,issues:H.length?[]:[{severity:"warning",message:"Could not infer enough design signals from input."}],designPatch:o.patch,meta:{extractedPathCount:H.length,extractedPaths:H,categoryCoverage:W,colorSampleSize:d.length,backgroundInference:{source:m.source,candidates:{root:c.length,declaration:i.length,classBased:(n.classBackgroundColors||[]).length}}}})}function Jn(e={}){let t=String(e.input||"").trim(),r=String(e.sourceType||"unknown");if(!t)return q({source:r,type:r,confidence:0,issues:[{severity:"error",message:"No input provided."}],meta:{conversionMode:"none"}});if(Gn(t)){let n=Mt({html:t,config:e.config||{}});return q({source:r,type:r,confidence:n.confidence,issues:n.issues,template:n.template,meta:{...n.meta||{},conversionMode:"html-to-pds"}})}return q({source:r,type:r,confidence:.48,issues:[{severity:"info",message:"Input is not HTML; generated text-based preview template."}],template:{id:`${r}-text-import`,name:"Imported Guideline Text",html:`<article class="card surface-base stack-sm"><h3>Imported Guidelines</h3><pre>${Zi(t)}</pre></article>`},meta:{conversionMode:"text-preview"}})}function Mt(e={}){let t=String(e.html||"").trim();if(!t)return q({source:"tailwind",type:"tailwind-html",confidence:0,issues:[{severity:"error",message:"No HTML provided."}]});let r=Ki(t,{config:e.config||{}});return q({source:"tailwind",type:"tailwind-html",confidence:r.confidence,issues:r.issues,template:{id:"tailwind-import",name:"Converted Tailwind Markup",html:r.html},meta:r.meta})}function wr(e={}){let t=String(e.text||"").trim();if(!t)return q({source:"brand",type:"brand-guidelines",confidence:0,issues:[{severity:"error",message:"No brand guideline text provided."}]});let r=Yi(t),n={colors:{},typography:{}},o=[];return r?n.colors.primary=r:o.push({severity:"warning",message:"No HEX color found; primary color was not inferred."}),/serif/i.test(t)&&(n.typography.fontFamilyBody="Georgia, serif"),/sans[-\s]?serif/i.test(t)&&(n.typography.fontFamilyBody="Inter, Arial, sans-serif"),/mono|monospace/i.test(t)&&(n.typography.fontFamilyMono="JetBrains Mono, monospace"),q({source:"brand",type:"brand-guidelines",confidence:r?.68:.52,issues:o,designPatch:n,meta:{inferred:{primaryColor:r}}})}var kr="convert-only",Yn="adopt-design-and-convert";function bs(e){return String(e||"").trim().toLowerCase()===Yn?Yn:kr}function Zn(...e){let t=e.flat().filter(Boolean);if(!t.length)return[];let r=new Set;return t.filter(n=>{let o=`${String(n?.severity||"info")}::${String(n?.path||"")}::${String(n?.message||"")}`;return r.has(o)?!1:(r.add(o),!0)})}function Xn(e=[]){let t=e.map(r=>Number(r)).filter(r=>Number.isFinite(r));return t.length?Math.max(0,Math.min(1,t.reduce((r,n)=>r+n,0)/t.length)):0}function Ye(e={},t={}){return{...e&&typeof e=="object"?e:{},...t&&typeof t=="object"?t:{}}}function to(e={},t={}){if(!t||typeof t!="object")return e;let r=Array.isArray(e)?[...e]:{...e};return Object.entries(t).forEach(([n,o])=>{o&&typeof o=="object"&&!Array.isArray(o)?r[n]=to(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o}),r}function Qn(e){if(typeof structuredClone=="function")try{return structuredClone(e)}catch{}return JSON.parse(JSON.stringify(e||{}))}function ys(e={}){let t=Number(e?.ratio),r=Number(e?.min),n=Number.isFinite(t)?t.toFixed(2):"n/a",o=Number.isFinite(r)?r.toFixed(2):"n/a";return{severity:"error",path:String(e?.path||"/colors"),message:`${String(e?.message||"Color contrast validation failed.")} (ratio=${n}, required=${o})`}}function eo(e={},t={},r={}){if(!(t&&typeof t=="object"?Object.keys(t):[]).length)return{ok:!0,blocked:!1,issues:[],report:{ok:!0,issues:[]}};let o=Number(r.minContrast),a=Number.isFinite(o)?o:4.5,i=to(Qn(e||{}),Qn(t||{})),s=jr(i,{minContrast:a,minMutedContrast:3,extendedChecks:!0}),d=Array.isArray(s?.issues)?s.issues.map(l=>ys(l)):[];return{ok:!!s?.ok,blocked:!s?.ok,issues:d,report:{ok:!!s?.ok,minContrast:a,issues:Array.isArray(s?.issues)?s.issues:[]}}}function vs(){return[{id:"template",name:"Templates"},{id:"tailwind-html",name:"Tailwind HTML"},{id:"brand-guidelines",name:"Brand Guidelines"},{id:"figma-json",name:"Figma Tokens JSON (planned)"},{id:"ux-pilot",name:"UX Pilot (planned)"},{id:"google-stitch",name:"Google Stitch (planned)"}]}async function xs(e={}){let t=String(e.sourceType||""),r=bs(e.importMode),n=String(e.input||""),o=e.config||null;if(t==="template"){let a=bn(e.templateId,e);return a.meta=Ye(a.meta,{importMode:r}),a}if(t==="tailwind-html"){let a=Mt({html:n,config:o});if(r===kr)return a.meta=Ye(a.meta,{importMode:r}),a;let i=xr({html:n,config:o,sourceType:t}),s=eo(o||{},i.designPatch||{}),d=s.blocked?{}:i.designPatch,l=s.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...s.issues]:[];return q({source:a.source||"tailwind",type:t,confidence:Xn([a.confidence,i.confidence]),issues:Zn(a.issues,i.issues,l),template:a.template,designPatch:d,meta:Ye(a.meta,{importMode:r,inference:i.meta,validation:s.report,validationBlocked:s.blocked})})}if(t==="brand-guidelines"){let a=Jn({input:n,sourceType:t,config:o});if(r===kr)return a.meta=Ye(a.meta,{importMode:r}),a;let i=wr({text:n}),s=xr({html:n,config:o,sourceType:t}),d={...i.designPatch&&typeof i.designPatch=="object"?i.designPatch:{},...s.designPatch&&typeof s.designPatch=="object"?s.designPatch:{}},l=eo(o||{},d||{}),u=l.blocked?{}:d,c=l.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...l.issues]:[];return q({source:"brand",type:t,confidence:Xn([a.confidence,i.confidence,s.confidence]),issues:Zn(a.issues,i.issues,s.issues,c),template:a.template,designPatch:u,meta:Ye(a.meta,{importMode:r,inference:s.meta,brandHeuristics:i.meta,validation:l.report,validationBlocked:l.blocked})})}return t==="figma-json"||t==="ux-pilot"||t==="google-stitch"?q({source:t,type:t,confidence:0,issues:[{severity:"info",message:`${t} adapter is not implemented yet in this phase.`}],meta:{importMode:r}}):q({source:t||"unknown",type:"unknown",confidence:0,issues:[{severity:"error",message:"Unsupported import source type."}],meta:{importMode:r}})}var ws="pds-live-import-history";var ae="imports",Tt=null;function ks(){return typeof globalThis<"u"&&typeof globalThis.indexedDB<"u"}function re(e){return typeof e=="string"?e:""}function Rt(e){return Array.isArray(e)?e:[]}function It(e){return e&&typeof e=="object"?e:{}}function _t(){return ks()?Tt||(Tt=new Promise((e,t)=>{let r=globalThis.indexedDB.open(ws,1);r.onupgradeneeded=()=>{let n=r.result;if(!n.objectStoreNames.contains(ae)){let o=n.createObjectStore(ae,{keyPath:"id",autoIncrement:!0});o.createIndex("createdAt","createdAt",{unique:!1}),o.createIndex("sourceType","sourceType",{unique:!1}),o.createIndex("fileName","fileName",{unique:!1})}},r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error||new Error("Failed to open import history database."))}),Tt):Promise.resolve(null)}function Ft(e){return new Promise((t,r)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>r(e.error||new Error("IndexedDB operation failed."))})}function Ss(e={}){let t=Date.now(),r=Number.isFinite(Number(e.createdAt))?Number(e.createdAt):t,n=new Date(r).toISOString(),o=Rt(e.issues).map(d=>({severity:re(d?.severity||"info"),message:re(d?.message||"")})),a=Rt(e.notes).filter(d=>typeof d=="string"),i=Rt(e.unknownTailwindTokens).filter(d=>typeof d=="string"),s=Rt(e.appliedRules).filter(d=>typeof d=="string");return{createdAt:r,createdAtIso:n,sourceType:re(e.sourceType||"unknown"),importMode:re(e.importMode||"convert-only"),source:re(e.source||"unknown"),type:re(e.type||"unknown"),fileName:re(e.fileName||""),fileSize:Number.isFinite(Number(e.fileSize))?Number(e.fileSize):0,mimeType:re(e.mimeType||""),fileContents:re(e.fileContents||""),convertedHtml:re(e.convertedHtml||""),confidence:Number.isFinite(Number(e.confidence))?Number(e.confidence):0,notes:a,issues:o,coverage:It(e.coverage),unknownTailwindTokens:i,appliedRules:s,importStyleSheetInjected:!!e.importStyleSheetInjected,templateName:re(e.templateName||""),designPatch:It(e.designPatch),meta:It(e.meta),resultSnapshot:It(e.resultSnapshot)}}async function $s(e={}){let t=await _t();if(!t)return null;let r=Ss(e),o=t.transaction(ae,"readwrite").objectStore(ae);return{id:await Ft(o.add(r)),...r}}async function zs(e={}){let t=await _t();if(!t)return[];let r=Number.isFinite(Number(e.limit))?Math.max(1,Number(e.limit)):30,o=t.transaction(ae,"readonly").objectStore(ae);return(await Ft(o.getAll())||[]).sort((i,s)=>Number(s?.createdAt||0)-Number(i?.createdAt||0)).slice(0,r)}async function Ls(e){let t=await _t();if(!t)return null;let r=Number(e);if(!Number.isFinite(r))return null;let o=t.transaction(ae,"readonly").objectStore(ae);return await Ft(o.get(r))||null}async function Cs(){let e=await _t();if(!e)return;let r=e.transaction(ae,"readwrite").objectStore(ae);await Ft(r.clear())}export{Cs as clearLiveImportHistory,wr as convertBrandGuidelinesToPatch,Mt as convertTailwindHtmlToPds,q as createImportResult,Ji as describeTailwindConversionRules,Ls as getLiveImportHistoryEntry,vs as getLiveImportSources,Ra as isImportResult,zs as listLiveImportHistory,hn as listLiveTemplates,rn as loadGoogleFont,bt as loadLiveTemplateCatalog,xs as runLiveImport,$s as saveLiveImportHistory,Ea as startLive};
