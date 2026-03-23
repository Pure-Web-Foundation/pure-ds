var Gn=Object.defineProperty;var _t=(t,e)=>()=>(t&&(e=t(t=0)),e);var Ft=(t,e)=>{for(var r in e)Gn(t,r,{get:e[r],enumerable:!0})};var vr={};Ft(vr,{enums:()=>$});var $,_e=_t(()=>{$={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"},IconSizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64,"3xl":96}}});var Rr={};Ft(Rr,{default:()=>ao,findComponentForElement:()=>eo,getAllSelectors:()=>to,getAllTags:()=>oo,getByCategory:()=>no,ontology:()=>q,searchOntology:()=>ro});function de(t,e){if(!t||!e)return!1;try{return t.matches(e)}catch{return!1}}function Tr(t,e){if(!t||!e||!t.closest)return null;try{return t.closest(e)}catch{return null}}function eo(t,{maxDepth:e=5}={}){if(!t||t.closest&&t.closest(".showcase-toc"))return null;let r=t,n=0;for(;r&&n<e;){if(n++,r.tagName==="DS-SHOWCASE")return null;if(r.classList&&r.classList.contains("showcase-section")){r=r.parentElement;continue}for(let a of PDS.ontology.enhancements){let i=a.selector||a;if(de(r,i))return{element:r,componentType:"enhanced-component",displayName:a.description||i,id:a.id}}if(r.tagName==="FIELDSET"){let a=r.getAttribute("role");if(a==="group"||a==="radiogroup")return{element:r,componentType:"form-group",displayName:a==="radiogroup"?"radio group":"form group"}}if(r.tagName==="LABEL"&&r.querySelector&&r.querySelector("input,select,textarea"))return{element:r,componentType:"form-control",displayName:"label with input"};let o=r.closest?r.closest("label"):null;if(o&&o.querySelector&&o.querySelector("input,select,textarea"))return{element:o,componentType:"form-control",displayName:"label with input"};for(let a of PDS.ontology.primitives){for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let l=s.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(u=>u.startsWith(l)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let p=r.parentElement,c=0;for(;p&&c<e;){if(p.classList&&Array.from(p.classList).some(u=>u.startsWith(l))&&p.tagName!=="DS-SHOWCASE")return{element:p,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};p=p.parentElement,c++}continue}continue}if(de(r,s))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let d=Tr(r,s);if(d&&d.tagName!=="DS-SHOWCASE")return{element:d,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.classList){let i=Array.from(r.classList);for(let s of a.selectors||[])if(typeof s=="string"&&s.includes("*")&&s.startsWith(".")){let d=s.slice(1).replace(/\*/g,"");if(i.some(l=>l.startsWith(d)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}}}for(let a of PDS.ontology.layoutPatterns||[])for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let l=s.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(p=>p.startsWith(l)))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}continue}if(de(r,s))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags};let d=Tr(r,s);if(d&&d.tagName!=="DS-SHOWCASE")return{element:d,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.tagName&&r.tagName.includes("-")){let a=r.tagName.toLowerCase(),i=PDS.ontology.components.find(s=>s.selectors.includes(a));return{element:r,componentType:"web-component",displayName:i?.name||a,id:i?.id||a,tags:i?.tags}}if(r.tagName==="BUTTON"){let a=r.querySelector&&r.querySelector("pds-icon");return{element:r,componentType:"button",displayName:a?"button with icon":"button",id:"button"}}if(de(r,"pds-icon")||r.closest&&r.closest("pds-icon")){let a=de(r,"pds-icon")?r:r.closest("pds-icon");return{element:a,componentType:"icon",displayName:`pds-icon (${a.getAttribute&&a.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(de(r,"nav[data-dropdown]")||r.closest&&r.closest("nav[data-dropdown]"))return{element:de(r,"nav[data-dropdown]")?r:r.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};r=r.parentElement}return null}function to(){let t=[];for(let e of PDS.ontology.primitives)t.push(...e.selectors||[]);for(let e of PDS.ontology.components)t.push(...e.selectors||[]);for(let e of PDS.ontology.layoutPatterns||[])t.push(...e.selectors||[]);return Array.from(new Set(t))}function ro(t,e={}){let r=t.toLowerCase(),n=[],o=(a,i)=>{for(let s of a)(s.id?.toLowerCase().includes(r)||s.name?.toLowerCase().includes(r)||s.description?.toLowerCase().includes(r)||s.tags?.some(l=>l.toLowerCase().includes(r))||s.category?.toLowerCase().includes(r)||s.selectors?.some(l=>l.toLowerCase().includes(r)))&&n.push({...s,type:i})};return(!e.type||e.type==="primitive")&&o(q.primitives,"primitive"),(!e.type||e.type==="component")&&o(q.components,"component"),(!e.type||e.type==="layout")&&o(q.layoutPatterns,"layout"),(!e.type||e.type==="enhancement")&&o(q.enhancements,"enhancement"),n}function no(t){let e=t.toLowerCase();return{primitives:q.primitives.filter(r=>r.category===e),components:q.components.filter(r=>r.category===e),layouts:q.layoutPatterns.filter(r=>r.category===e)}}function oo(){let t=new Set;return q.primitives.forEach(e=>e.tags?.forEach(r=>t.add(r))),q.components.forEach(e=>e.tags?.forEach(r=>t.add(r))),q.layoutPatterns.forEach(e=>e.tags?.forEach(r=>t.add(r))),q.enhancements.forEach(e=>e.tags?.forEach(r=>t.add(r))),Array.from(t).sort()}var q,ao,Dt=_t(()=>{q={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"callout",name:"Callout",description:"Contextual information and notification messages",selectors:[".callout",".callout-info",".callout-success",".callout-warning",".callout-danger",".callout-error",".callout-dismissible"],tags:["feedback","message","notification","status","information"],category:"feedback"},{id:"empty-state",name:"Empty State",description:"Empty state layout for missing data or onboarding",selectors:[".empty-state"],tags:["empty","no-data","zero","placeholder","onboarding","state"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-danger",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-fab",name:"FAB",description:"Floating Action Button with expandable satellite actions",selectors:["pds-fab"],tags:["button","action","floating","interactive"],category:"action"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-live-edit",name:"Live Edit",description:"Contextual live editing for PDS design settings",selectors:["pds-live-edit"],tags:["editor","live","config","tooling"],category:"tooling"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element. Use data-dropdown-close on clickable descendants to dismiss on selection.",tags:["menu","interactive","navigation","dismiss","close"]},{id:"dropdown-close",selector:"[data-dropdown-close]",description:"Declarative close marker for nav[data-dropdown] panels; clicking marked targets closes the open dropdown.",tags:["dropdown","menu","dismiss","close","attribute"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"color-input",selector:"label[data-color]",description:"Enhanced color input with swatch shell and hex output",tags:["color","input","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["callout","badge","empty-state"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]},action:{description:"Interactive actions and buttons",primitives:["button"],components:["pds-fab"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],empty:["empty-state","placeholder","zero","no-data","onboarding","callout","card","icon","button"],"empty state":["empty-state","empty","no-data","zero","onboarding"],"no data":["empty-state","empty","zero","placeholder"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-danger","btn-working","pds-fab","floating"],btn:["button","interactive","action","pds-fab"],fab:["pds-fab","floating","button","action","menu"],floating:["fab","pds-fab","button","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],callout:["notification","feedback","message","status","toast","information","alert","warning","error","info","success","danger"],alert:["callout","notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["callout","toast","pds-toaster","feedback","message","popup","alert"],toast:["pds-toaster","notification","callout","feedback","popup","snackbar","alert"],feedback:["callout","notification","toast","status","badge","validation","error","success","alert"],message:["callout","notification","feedback","dialog","toast","alert"],status:["badge","callout","indicator","feedback","state","alert"],error:["callout","danger","validation","feedback","warning","alert"],success:["callout","feedback","badge","status","check","alert"],warning:["callout","caution","feedback","status","alert"],info:["callout","information","feedback","status","alert"],danger:["callout","error","feedback","destructive","delete","alert"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};ao=q});var dt={};Ft(dt,{deepMerge:()=>Qr,fragmentFromTemplateLike:()=>nr,isObject:()=>lt,parseFragment:()=>ct,parseHTML:()=>or});function lt(t){return t&&typeof t=="object"&&!Array.isArray(t)}function Qr(t,e){let r={...t};return lt(t)&&lt(e)&&Object.keys(e).forEach(n=>{lt(e[n])?n in t?r[n]=Qr(t[n],e[n]):Object.assign(r,{[n]:e[n]}):Object.assign(r,{[n]:e[n]})}),r}function nr(t){let e=Array.isArray(t?.strings)?t.strings:[],r=Array.isArray(t?.values)?t.values:[],n=new Set,o=[],a=/(\s)(\.[\w-]+)=\s*$/,i=/(\s)(@[\w-]+)=\s*$/,s=/(\s)(\?[\w-]+)=\s*$/,d=/(\s)([\w:-]+)=\s*$/;for(let g=0;g<e.length;g+=1){let x=e[g]??"";if(g<r.length){let b=`pds-val-${g}`,f=x.match(a),h=x.match(i),v=x.match(s),m=x.match(d);if(f){let S=f[2].slice(1);x=x.replace(a,`$1data-pds-bind-${g}="prop:${S}:${b}"`),n.add(g)}else if(h){let S=h[2].slice(1);x=x.replace(i,`$1data-pds-bind-${g}="event:${S}:${b}"`),n.add(g)}else if(v){let S=v[2].slice(1);x=x.replace(s,`$1data-pds-bind-${g}="boolean:${S}:${b}"`),n.add(g)}else if(m){let S=m[2];x=x.replace(d,`$1data-pds-bind-${g}="attr:${S}:${b}"`),n.add(g)}}o.push(x),g<r.length&&!n.has(g)&&o.push(`<!--pds-val-${g}-->`)}let l=document.createElement("template");l.innerHTML=o.join("");let p=(g,x)=>{let b=g.parentNode;if(!b)return;if(x==null){b.removeChild(g);return}let f=h=>{if(h!=null){if(h instanceof Node){b.insertBefore(h,g);return}if(Array.isArray(h)){h.forEach(v=>f(v));return}b.insertBefore(document.createTextNode(String(h)),g)}};f(x),b.removeChild(g)},c=document.createTreeWalker(l.content,NodeFilter.SHOW_COMMENT),u=[];for(;c.nextNode();){let g=c.currentNode;g?.nodeValue?.startsWith("pds-val-")&&u.push(g)}return u.forEach(g=>{let x=Number(g.nodeValue.replace("pds-val-",""));p(g,r[x])}),l.content.querySelectorAll("*").forEach(g=>{[...g.attributes].forEach(x=>{if(!x.name.startsWith("data-pds-bind-"))return;let b=x.value.indexOf(":"),f=x.value.lastIndexOf(":");if(b<=0||f<=b){g.removeAttribute(x.name);return}let h=x.value.slice(0,b),v=x.value.slice(b+1,f),m=x.value.slice(f+1),S=Number(String(m).replace("pds-val-","")),C=r[S];if(!v||!Number.isInteger(S)){g.removeAttribute(x.name);return}h==="prop"?g[v]=C:h==="event"?(typeof C=="function"||C&&typeof C.handleEvent=="function")&&g.addEventListener(v,C):h==="boolean"?C?g.setAttribute(v,""):g.removeAttribute(v):h==="attr"&&(C==null||C===!1?g.removeAttribute(v):g.setAttribute(v,String(C))),g.removeAttribute(x.name)})}),l.content}function ct(t,...e){if(Array.isArray(t)&&Object.prototype.hasOwnProperty.call(t,"raw"))return nr({strings:Array.from(t),values:e});if(Array.isArray(t?.strings)&&Array.isArray(t?.values))return nr({strings:t.strings,values:t.values});let n=document.createElement("template");return n.innerHTML=String(t??""),n.content}function or(t,...e){return ct(t,...e).childNodes}var ar=_t(()=>{});_e();var re="any",Ne={type:"object",allowUnknown:!1,properties:{id:{type:"string",minLength:1,maxLength:64},name:{type:"string",minLength:1,maxLength:80},tags:{type:"array",uniqueItems:!0,items:{type:"string"}},themes:{type:"array",uniqueItems:!0,items:{type:"string",oneOf:[{const:"light",title:"Light"},{const:"dark",title:"Dark"},{const:"system",title:"System"}]}},description:{type:"string",maxLength:500},options:{type:"object",allowUnknown:!0,properties:{liquidGlassEffects:{type:"boolean"},backgroundMesh:{type:"number"}}},form:{type:"object",allowUnknown:!0,properties:{options:{type:"object",allowUnknown:!0,properties:{widgets:{type:"object",allowUnknown:!1,properties:{booleans:{type:"string"},numbers:{type:"string"},selects:{type:"string"}}},layouts:{type:"object",allowUnknown:!1,properties:{fieldsets:{type:"string"},arrays:{type:"string"}}},enhancements:{type:"object",allowUnknown:!1,properties:{icons:{type:"boolean"},datalists:{type:"boolean"},rangeOutput:{type:"boolean"},colorInput:{type:"boolean"}}},validation:{type:"object",allowUnknown:!1,properties:{showErrors:{type:"boolean"},validateOnChange:{type:"boolean"}}}}}}},colors:{type:"object",allowUnknown:!1,properties:{primary:{type:"string",relations:{tokens:["--color-primary-*","--color-primary-fill","--color-primary-text","--background-mesh-*"]}},secondary:{type:"string",relations:{tokens:["--color-secondary-*","--color-gray-*","--background-mesh-*"]}},accent:{type:"string",relations:{tokens:["--color-accent-*","--background-mesh-*"]}},background:{type:"string",relations:{tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},success:{type:["string","null"],relations:{tokens:["--color-success-*","--color-success-fill","--color-success-fill-hover","--color-success-fill-active","--color-success-text","--color-success-text-hover","--color-success-contrast","--color-success-display-*","--surface-*-success-text","--surface-*-success-text-hover"]}},warning:{type:["string","null"],relations:{tokens:["--color-warning-*","--color-warning-fill","--color-warning-fill-hover","--color-warning-fill-active","--color-warning-text","--color-warning-text-hover","--color-warning-contrast","--color-warning-display-*","--surface-*-warning-text","--surface-*-warning-text-hover"]}},danger:{type:["string","null"],relations:{tokens:["--color-danger-*","--color-danger-fill","--color-danger-fill-hover","--color-danger-fill-active","--color-danger-text","--color-danger-text-hover","--color-danger-contrast","--color-danger-display-*","--surface-*-danger-text","--surface-*-danger-text-hover"]}},info:{type:["string","null"],relations:{tokens:["--color-info-*","--color-info-fill","--color-info-fill-hover","--color-info-fill-active","--color-info-text","--color-info-text-hover","--color-info-contrast","--color-info-display-*","--surface-*-info-text","--surface-*-info-text-hover"]}},gradientStops:{type:"number"},elevationOpacity:{type:"number",relations:{tokens:["--surface-*-shadow"]}},darkMode:{type:"object",allowUnknown:!1,properties:{background:{type:"string",relations:{theme:"dark",tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},primary:{type:"string",relations:{theme:"dark",tokens:["--color-primary-*","--color-primary-fill","--color-primary-text"]}},secondary:{type:"string",relations:{theme:"dark",tokens:["--color-secondary-*","--color-gray-*"]}},accent:{type:"string",relations:{theme:"dark",tokens:["--color-accent-*"]}}}}}},typography:{type:"object",allowUnknown:!1,properties:{fontFamilyHeadings:{type:"string",relations:{tokens:["--font-family-headings"]}},fontFamilyBody:{type:"string",relations:{tokens:["--font-family-body"]}},fontFamilyMono:{type:"string",relations:{tokens:["--font-family-mono"]}},baseFontSize:{type:"number",relations:{tokens:["--font-size-*"]}},fontScale:{type:"number",relations:{tokens:["--font-size-*"]}},fontWeightLight:{type:["string","number"],relations:{tokens:["--font-weight-light"]}},fontWeightNormal:{type:["string","number"],relations:{tokens:["--font-weight-normal"]}},fontWeightMedium:{type:["string","number"],relations:{tokens:["--font-weight-medium"]}},fontWeightSemibold:{type:["string","number"],relations:{tokens:["--font-weight-semibold"]}},fontWeightBold:{type:["string","number"],relations:{tokens:["--font-weight-bold"]}},lineHeightTight:{type:["string","number"],relations:{tokens:["--font-line-height-tight"]}},lineHeightNormal:{type:["string","number"],relations:{tokens:["--font-line-height-normal"]}},lineHeightRelaxed:{type:["string","number"],relations:{tokens:["--font-line-height-relaxed"]}},letterSpacingTight:{type:"number"},letterSpacingNormal:{type:"number"},letterSpacingWide:{type:"number"}}},spatialRhythm:{type:"object",allowUnknown:!1,properties:{baseUnit:{type:"number",relations:{tokens:["--spacing-*"]}},scaleRatio:{type:"number"},maxSpacingSteps:{type:"number",relations:{tokens:["--spacing-*"]}},containerPadding:{type:"number"},inputPadding:{type:"number",relations:{rules:[{selectors:["input","textarea","select"],properties:["padding"]}]}},buttonPadding:{type:"number",relations:{rules:[{selectors:["button",".btn"],properties:["padding"]}]}},sectionSpacing:{type:"number",relations:{rules:[{selectors:["section"],properties:["margin","padding"]}]}}}},shape:{type:"object",allowUnknown:!1,properties:{radiusSize:{type:["string","number"],relations:{tokens:["--radius-*"]}},customRadius:{type:["string","number","null"]},borderWidth:{type:["string","number"],relations:{tokens:["--border-width-*"]}}}},behavior:{type:"object",allowUnknown:!1,properties:{transitionSpeed:{type:["string","number"],relations:{tokens:["--transition-*"]}},animationEasing:{type:"string"},customTransitionSpeed:{type:["number","null"]},customEasing:{type:["string","null"]},focusRingWidth:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["outline-width","box-shadow"]}]}},focusRingOpacity:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["box-shadow","outline-color"]}]}},hoverOpacity:{type:"number"}}},layout:{type:"object",allowUnknown:!1,properties:{maxWidth:{type:["number","string"],relations:{tokens:["--layout-max-width","--layout-max-width-*"]}},maxWidths:{type:"object",allowUnknown:!1,properties:{sm:{type:["number","string"],relations:{tokens:["--layout-max-width-sm"]}},md:{type:["number","string"],relations:{tokens:["--layout-max-width-md"]}},lg:{type:["number","string"],relations:{tokens:["--layout-max-width-lg"]}},xl:{type:["number","string"],relations:{tokens:["--layout-max-width-xl"]}}}},containerPadding:{type:["number","string"],relations:{tokens:["--layout-container-padding"]}},breakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"number"},md:{type:"number"},lg:{type:"number"},xl:{type:"number"}}},gridColumns:{type:"number"},gridGutter:{type:"number"},densityCompact:{type:"number"},densityNormal:{type:"number"},densityComfortable:{type:"number"},buttonMinHeight:{type:"number"},inputMinHeight:{type:"number"},baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}},utilities:{type:"object",allowUnknown:!0,properties:{grid:{type:"boolean"},flex:{type:"boolean"},spacing:{type:"boolean"},container:{type:"boolean"}}},gridSystem:{type:"object",allowUnknown:!0,properties:{columns:{type:"array",items:{type:"number"}},autoFitBreakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"string"},md:{type:"string"},lg:{type:"string"},xl:{type:"string"}}},enableGapUtilities:{type:"boolean"}}},containerMaxWidth:{type:["number","string"]}}},layers:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},shadowBlurMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowOffsetMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowDepth:{type:"string"},blurLight:{type:"number"},blurMedium:{type:"number"},blurHeavy:{type:"number"},baseZIndex:{type:"number",relations:{tokens:["--z-*"]}},zIndexStep:{type:"number",relations:{tokens:["--z-*"]}},zIndexBase:{type:"number"},zIndexDropdown:{type:"number"},zIndexSticky:{type:"number"},zIndexFixed:{type:"number"},zIndexModal:{type:"number"},zIndexPopover:{type:"number"},zIndexTooltip:{type:"number"},zIndexNotification:{type:"number"},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}}}},advanced:{type:"object",allowUnknown:!0,properties:{linkStyle:{type:"string"},colorDerivation:{type:"string"}}},a11y:{type:"object",allowUnknown:!0,properties:{minTouchTarget:{type:["string","number"]},prefersReducedMotion:{type:"boolean"},focusStyle:{type:"string"}}},icons:{type:"object",allowUnknown:!1,properties:{set:{type:"string"},weight:{type:"string"},defaultSize:{type:"number",relations:{tokens:["--icon-size"]}},sizes:{type:"object",allowUnknown:!0,properties:{xs:{type:["number","string"]},sm:{type:["number","string"]},md:{type:["number","string"]},lg:{type:["number","string"]},xl:{type:["number","string"]},"2xl":{type:["number","string"]}}},spritePath:{type:"string"},externalPath:{type:"string"},include:{type:"object",allowUnknown:!0,properties:{navigation:{type:"array",items:{type:"string"}},actions:{type:"array",items:{type:"string"}},communication:{type:"array",items:{type:"string"}},content:{type:"array",items:{type:"string"}},status:{type:"array",items:{type:"string"}},time:{type:"array",items:{type:"string"}},commerce:{type:"array",items:{type:"string"}},formatting:{type:"array",items:{type:"string"}},system:{type:"array",items:{type:"string"}}}}}},components:{type:"object",allowUnknown:!0},debug:{type:"boolean"}}},Kn={type:"object",allowUnknown:!0,properties:{mode:{type:"string"},preset:{type:"string"},design:Ne,enhancers:{type:["object","array"]},applyGlobalStyles:{type:"boolean"},manageTheme:{type:"boolean"},themeStorageKey:{type:"string"},preloadStyles:{type:"boolean"},criticalLayers:{type:"array",items:{type:"string"}},autoDefine:{type:"object",allowUnknown:!1,properties:{predefine:{type:"array",items:{type:"string"}},mapper:{type:re},enhancers:{type:["object","array"]},scanExisting:{type:"boolean"},observeShadows:{type:"boolean"},patchAttachShadow:{type:"boolean"},debounceMs:{type:"number"},onError:{type:re},baseURL:{type:"string"}}},managerURL:{type:"string"},manager:{type:re},liveEdit:{type:"boolean"},localization:{type:"object",allowUnknown:!1,properties:{locale:{type:"string"},locales:{type:"array",items:{type:"string"}},messages:{type:"object",allowUnknown:!0},provider:{type:re},translate:{type:re},loadLocale:{type:re},setLocale:{type:re}}},log:{type:re}}};function Fe(t){return t===null?"null":Array.isArray(t)?"array":typeof t}function Jn(t,e){if(e===re)return!0;let r=Fe(t);return Array.isArray(e)?e.includes(r):r===e}function Ze(t,e,r,n){if(!e)return;let o=e.type||re;if(!Jn(t,o)){n.push({path:r,expected:o,actual:Fe(t),message:`Expected ${o} but got ${Fe(t)}`});return}if(o==="array"&&e.items&&Array.isArray(t)&&t.forEach((a,i)=>{Ze(a,e.items,`${r}[${i}]`,n)}),o==="object"&&t&&typeof t=="object"){let a=e.properties||{};for(let[i,s]of Object.entries(t)){if(!Object.prototype.hasOwnProperty.call(a,i)){e.allowUnknown||n.push({path:`${r}.${i}`,expected:"known property",actual:"unknown",message:`Unknown property "${i}"`});continue}Ze(s,a[i],`${r}.${i}`,n)}}}function Nt(t,e="",r={}){if(!t||typeof t!="object")return r;if(t.relations&&e&&(r[e]=t.relations),t.type==="object"&&t.properties&&Object.entries(t.properties).forEach(([n,o])=>{let a=e?`${e}.${n}`:n;Nt(o,a,r)}),t.type==="array"&&t.items){let n=`${e}[]`;Nt(t.items,n,r)}return r}var Lr=Nt(Ne,""),zr=Ne,Yn={"colors.primary":{widget:"input-color"},"colors.secondary":{widget:"input-color"},"colors.accent":{widget:"input-color"},"colors.background":{widget:"input-color"},"colors.success":{widget:"input-color"},"colors.warning":{widget:"input-color"},"colors.danger":{widget:"input-color"},"colors.info":{widget:"input-color"},"colors.gradientStops":{min:2,max:8,step:1,widget:"range"},"colors.elevationOpacity":{min:0,max:1,step:.01,widget:"range"},"colors.darkMode.background":{widget:"input-color"},"colors.darkMode.primary":{widget:"input-color"},"colors.darkMode.secondary":{widget:"input-color"},"colors.darkMode.accent":{widget:"input-color"},description:{widget:"textarea",maxLength:500,rows:4,placeholder:"Summarize the visual and interaction intent"},"typography.fontFamilyHeadings":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Heading font stack"},"typography.fontFamilyBody":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Body font stack"},"typography.fontFamilyMono":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Monospace font stack"},"typography.baseFontSize":{min:8,max:32,step:1,widget:"input-range"},"typography.fontScale":{min:1,max:2,step:.01,widget:"range"},"typography.fontWeightLight":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightNormal":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightMedium":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightSemibold":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightBold":{min:100,max:800,step:100,widget:"input-range"},"typography.lineHeightTight":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightNormal":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightRelaxed":{min:.75,max:3,step:.001,widget:"input-range"},"typography.letterSpacingTight":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingNormal":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingWide":{min:-.1,max:.1,step:.001,widget:"range"},"spatialRhythm.baseUnit":{min:1,max:16,step:1,widget:"range"},"spatialRhythm.scaleRatio":{min:1,max:2,step:.01,widget:"range"},"spatialRhythm.maxSpacingSteps":{min:4,max:64,step:1,widget:"range"},"spatialRhythm.containerPadding":{min:0,max:8,step:.05,widget:"range"},"spatialRhythm.inputPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.buttonPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.sectionSpacing":{min:0,max:8,step:.05,widget:"range"},"shape.radiusSize":{oneOf:Object.entries($.RadiusSizes).map(([t,e])=>({const:e,title:t}))},"shape.borderWidth":{widget:"select",oneOf:Object.entries($.BorderWidths).map(([t,e])=>({const:e,title:t}))},"shape.customRadius":{min:0,max:64,step:1,widget:"range"},"behavior.transitionSpeed":{oneOf:Object.entries($.TransitionSpeeds).map(([t,e])=>({const:e,title:t}))},"behavior.animationEasing":{enum:Object.values($.AnimationEasings)},"behavior.customTransitionSpeed":{min:0,max:1e3,step:10,widget:"range"},"behavior.focusRingWidth":{min:0,max:8,step:1,widget:"range"},"behavior.focusRingOpacity":{min:0,max:1,step:.01,widget:"range"},"behavior.hoverOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.gridColumns":{min:1,max:24,step:1,widget:"range"},"layout.gridGutter":{min:0,max:8,step:.05,widget:"range"},"layout.maxWidth":{widget:"input-text",placeholder:"e.g. 1200 or 1200px"},"layout.maxWidths.sm":{widget:"input-text",placeholder:"e.g. 640 or 640px"},"layout.maxWidths.md":{widget:"input-text",placeholder:"e.g. 768 or 768px"},"layout.maxWidths.lg":{widget:"input-text",placeholder:"e.g. 1024 or 1024px"},"layout.maxWidths.xl":{widget:"input-text",placeholder:"e.g. 1280 or 1280px"},"layout.containerMaxWidth":{widget:"input-text",placeholder:"e.g. 1400px"},"layout.containerPadding":{widget:"input-text",placeholder:"e.g. var(--spacing-6)"},"layout.breakpoints.sm":{min:320,max:2560,step:1,widget:"input-number"},"layout.breakpoints.md":{min:480,max:3200,step:1,widget:"input-number"},"layout.breakpoints.lg":{min:640,max:3840,step:1,widget:"input-number"},"layout.breakpoints.xl":{min:768,max:5120,step:1,widget:"input-number"},"layout.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.densityCompact":{min:.5,max:2,step:.05,widget:"range"},"layout.densityNormal":{min:.5,max:2,step:.05,widget:"range"},"layout.densityComfortable":{min:.5,max:2,step:.05,widget:"range"},"layout.buttonMinHeight":{min:24,max:96,step:1,widget:"range"},"layout.inputMinHeight":{min:24,max:96,step:1,widget:"range"},"layers.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layers.shadowBlurMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.shadowOffsetMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.blurLight":{min:0,max:48,step:1,widget:"range"},"layers.blurMedium":{min:0,max:64,step:1,widget:"range"},"layers.blurHeavy":{min:0,max:96,step:1,widget:"range"},"layers.baseZIndex":{min:0,max:1e4,step:10,widget:"range"},"layers.zIndexStep":{min:1,max:100,step:1,widget:"range"},"layers.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"advanced.linkStyle":{enum:Object.values($.LinkStyles)},"a11y.minTouchTarget":{oneOf:Object.entries($.TouchTargetSizes).map(([t,e])=>({const:e,title:t}))},"a11y.focusStyle":{enum:Object.values($.FocusStyles)},"icons.defaultSize":{min:8,max:128,step:1,widget:"range",icon:"sparkle"}};function xr(t=[]){return t.join(".")}function wr(t=[]){return`/${t.join("/")}`}function Xn(t,e=[]){if(!(!t||typeof t!="object"))return e.reduce((r,n)=>{if(r!=null&&typeof r=="object")return r[n]},t)}function kr(t,e,r=[]){if(t!=null)return t;let n=Xn(e,r);return n??void 0}function Pe(t=""){return String(t).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/^./,e=>e.toUpperCase())}function Cr(t,e){if(!t)return"string";let r=t.type||"string";if(Array.isArray(r)){let n=Fe(e);return n!=="undefined"&&r.includes(n)?n:r.includes("string")?"string":r.find(o=>o!=="null")||r[0]||"string"}return r}function Pt(t,e,r=[]){return!t||!e||!Array.isArray(r)||r.forEach(n=>{e[n]!==void 0&&(t[n]=e[n])}),t}function Sr(t,e){return Array.isArray(e?.oneOf)&&e.oneOf.length?e.oneOf:Array.isArray(e?.enum)&&e.enum.length?e.enum.map(r=>({const:r,title:Pe(r)})):Array.isArray(t?.oneOf)&&t.oneOf.length?t.oneOf:Array.isArray(t?.enum)&&t.enum.length?t.enum.map(r=>({const:r,title:Pe(r)})):null}function Zn(t){return t&&(t==="range"?"input-range":t)}function Qn(t,e){if(!Array.isArray(e)||!e.length)return t;let r=new Set;for(let n of e)!n||n.const===void 0||r.add(Fe(n.const));if(!r.size)return t;if(r.size===1){let n=Array.from(r)[0];if(n==="number")return"number";if(n==="string")return"string";if(n==="boolean")return"boolean"}return t}function $r(t,e,r){let n=Cr(e,r),o=t.toLowerCase(),a={label:Pe(t.split(".").slice(-1)[0]||t)};n==="boolean"&&(a.widget="toggle"),n==="number"&&(a.widget="range",o.includes("opacity")?(a.min=0,a.max=1,a.step=.01):o.includes("lineheight")?(a.min=.75,a.max=3,a.step=.001,a.widget="input-range"):o.includes("fontweight")?(a.min=100,a.max=800,a.step=100,a.widget="input-range"):o.endsWith("basefontsize")?(a.min=8,a.max=32,a.step=1,a.widget="input-range"):o.includes("scale")||o.includes("ratio")?(a.min=1,a.max=2,a.step=.01):(a.min=0,a.max=Math.max(10,Number.isFinite(Number(r))?Number(r)*4:100),a.step=1)),n==="string"&&t.startsWith("colors.")&&(a.widget="input-color"),n==="string"&&o==="description"&&(a.widget="textarea",a.maxLength=500,a.rows=4);let i=Yn[t]||{},s={...a,...i};return s.widget&&(s.widget=Zn(s.widget)),s}function Mr(t,e,r,n,o,a){if(!t||typeof t!="object")return null;let i=kr(e,a,r),s=Cr(t,i);if(s==="object"&&t.properties){let f={type:"object",properties:{}};r.length>0&&(f.title=Pe(r[r.length-1]));let h={};for(let[v,m]of Object.entries(t.properties)){let S=e&&typeof e=="object"&&!Array.isArray(e)?e[v]:void 0,C=Mr(m,S,[...r,v],n,o,a);C&&(f.properties[v]=C.schema,C.hasValue&&(h[v]=C.value))}return Object.keys(f.properties).length?{schema:f,value:h,hasValue:Object.keys(h).length>0}:null}if(s==="array"){let f=xr(r),h=$r(f,t,e);o[f]=h;let v=kr(e,a,r),m=t.items?.type||"string",S=Array.isArray(m)?m[0]:m,C={type:S},T=Sr(t?.items,null);if(T&&(C.oneOf=T),S==="string"&&Array.isArray(v)&&v.length>0){let M=v.find(k=>typeof k=="string"&&k.trim().length>0);M&&(C.examples=[M])}Pt(C,t?.items,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","minItems","maxItems","uniqueItems","description","default"]);let I={type:"array",items:C};Pt(I,t,["minItems","maxItems","uniqueItems","description","default"]);let z=wr(r),E={},P=Array.isArray(C.oneOf)&&C.oneOf.length>0;if(S==="string"&&P&&(E["ui:widget"]=I.maxItems===1?"radio":"checkbox-group"),S==="string"&&Array.isArray(v)&&v.length>0){let M=v.filter(k=>typeof k=="string"&&k.trim().length>0).slice(0,5).join(", ");M&&(E["ui:placeholder"]=M)}return Object.keys(E).length&&(n[z]={...n[z]||{},...E}),{schema:I,value:Array.isArray(e)?e:[],hasValue:Array.isArray(e)}}let d=xr(r),l=$r(d,t,i);o[d]=l;let p=Sr(t,l),y={type:Qn(s==="null"?"string":s,p),title:l.label||Pe(r[r.length-1]||d)};p&&(y.oneOf=p),Pt(y,t,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","description","default"]),typeof l.maxLength=="number"&&y.maxLength===void 0&&(y.maxLength=l.maxLength),(y.type==="number"||y.type==="integer")&&typeof l.min=="number"&&y.minimum===void 0&&(y.minimum=l.min),(y.type==="number"||y.type==="integer")&&typeof l.max=="number"&&y.maximum===void 0&&(y.maximum=l.max),(y.type==="number"||y.type==="integer")&&typeof l.step=="number"&&y.multipleOf===void 0&&(y.multipleOf=l.step);let g=i;g!==void 0&&(y.examples=[g]);let x=wr(r),b={};return l.widget&&(b["ui:widget"]=l.widget),l.icon&&(b["ui:icon"]=l.icon),typeof l.min=="number"&&(b["ui:min"]=l.min),typeof l.max=="number"&&(b["ui:max"]=l.max),typeof l.step=="number"&&(b["ui:step"]=l.step),l.placeholder&&(b["ui:placeholder"]=l.placeholder),typeof l.rows=="number"&&(b["ui:options"]={...b["ui:options"]||{},rows:l.rows}),l.widget==="input-range"&&g!==void 0&&(b["ui:allowUnset"]=!0),(typeof l.min=="number"||typeof l.max=="number"||typeof l.step=="number")&&(b["ui:options"]={...b["ui:options"]||{},...typeof l.min=="number"?{min:l.min}:{},...typeof l.max=="number"?{max:l.max}:{},...typeof l.step=="number"?{step:l.step}:{}}),Object.keys(b).length&&(n[x]=b),{schema:y,value:e,hasValue:e!==void 0}}function be(t={}){let e={},r={"/colors":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}},"/colors/darkMode":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}}},n=Q?.default&&typeof Q.default=="object"?Q.default:null,o=Mr(Ne,t,[],r,e,n);return{schema:o?.schema||{type:"object",properties:{}},uiSchema:r,values:o?.value||{},metadata:e}}function je(t={}){return be(t).metadata}function jt(t,{log:e,context:r="PDS config"}={}){if(!t||typeof t!="object")return[];let n=[];return Ze(t,Ne,"design",n),n.length&&typeof e=="function"&&n.forEach(o=>{e("warn",`[${r}] ${o.message} at ${o.path}`)}),n}function Ot(t,{log:e,context:r="PDS config"}={}){if(!t||typeof t!="object")return[];let n=[];return Ze(t,Kn,"config",n),n.length&&typeof e=="function"&&n.forEach(o=>{e("warn",`[${r}] ${o.message} at ${o.path}`)}),n}var Q={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:$.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.318,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:$.RadiusSizes.xlarge,borderWidth:$.BorderWidths.medium},behavior:{transitionSpeed:$.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],themes:["light"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:$.RadiusSizes.none,borderWidth:$.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:$.RadiusSizes.xxlarge,borderWidth:$.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:$.RadiusSizes.none,borderWidth:$.BorderWidths.thick},behavior:{transitionSpeed:$.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.3,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.3},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.thick},behavior:{transitionSpeed:$.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",themes:["light"],description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:$.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:$.RadiusSizes.xxlarge,borderWidth:$.BorderWidths.thin},behavior:{transitionSpeed:$.TransitionSpeeds.slow,animationEasing:$.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0c0c0c",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:$.RadiusSizes.none,borderWidth:$.BorderWidths.thick},behavior:{transitionSpeed:$.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:$.RadiusSizes.large,borderWidth:$.BorderWidths.medium},behavior:{transitionSpeed:$.TransitionSpeeds.normal,animationEasing:$.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:$.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:$.RadiusSizes.large,borderWidth:$.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:$.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:$.TransitionSpeeds.normal,animationEasing:$.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",info:"#0e7490",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#b1b1b1"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.medium},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:$.TouchTargetSizes.comfortable,focusStyle:$.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:2.5},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:$.TouchTargetSizes.standard,focusStyle:$.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:$.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:1.5},shape:{radiusSize:$.RadiusSizes.medium,borderWidth:$.BorderWidths.thin},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:$.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:$.RadiusSizes.small,borderWidth:$.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:$.TransitionSpeeds.fast,animationEasing:$.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};Q.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!1,backgroundMesh:0},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0,colorInput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:$.FontWeights.light,fontWeightNormal:$.FontWeights.normal,fontWeightMedium:$.FontWeights.medium,fontWeightSemibold:$.FontWeights.semibold,fontWeightBold:$.FontWeights.bold,lineHeightTight:$.LineHeights.tight,lineHeightNormal:$.LineHeights.normal,lineHeightRelaxed:$.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:$.RadiusSizes.large,borderWidth:$.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:$.TransitionSpeeds.normal,animationEasing:$.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:30,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:$.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:$.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:$.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:$.IconSizes,include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"/assets/pds/icons/pds-icons.svg"},debug:!1};var Er=je(Q.default),Ar=be(Q.default);function Bt(t="log",e,...r){let n=globalThis?.PDS?.log;if(typeof n=="function"){n(t,e,...r);return}if(typeof console>"u")return;let o=typeof console[t]=="function"?console[t].bind(console):typeof console.log=="function"?console.log.bind(console):null;o&&(r.length>0?o(e,...r):o(e))}_e();Dt();var Z=class t{static#v;static get instance(){return this.#v}#e;#a;constructor(e={}){this.options={debug:!1,...e},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),t.#v=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#Se(),typeof CSSStyleSheet<"u"?this.#Me():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let e=this.options.design||{},r=this.#A(e),n=e.layers||{},o=this.#w(n,r.light),a=this.#M(o),i=r.dark!=null?this.#M(this.#w(n,r.dark)):null;return{colors:this.#T(e.colors||{},r),spacing:this.generateSpacingTokens(e.spatialRhythm||{}),radius:this.#O(e.shape||{}),borderWidths:this.#B(e.shape||{}),typography:this.generateTypographyTokens(e.typography||{}),shadows:a,darkShadows:i,layout:this.#D(e.layout||{}),transitions:this.#H(e.behavior||{}),zIndex:this.#W(e.layers||{}),icons:this.#U(e.icons||{})}}#A(e={}){let r=e.layout||{},n=e.layers||{};return{light:this.#x(r.baseShadowOpacity??n.baseShadowOpacity),dark:this.#x(r.darkMode?.baseShadowOpacity??n.darkMode?.baseShadowOpacity)}}#x(e){let r=Number(e);if(Number.isFinite(r))return Math.min(Math.max(r,0),1)}#w(e={},r){let n={...e};return r!=null&&(n.baseShadowOpacity=r),n}#T(e,r={}){let{primary:n="#3b82f6",secondary:o="#64748b",accent:a="#ec4899",background:i="#ffffff",success:s=null,warning:d="#FFBF00",danger:l=null,info:p=null,darkMode:c={}}=e,u={primary:this.#i(n),secondary:this.#i(o),accent:this.#i(a),success:this.#i(s||this.#R(n)),warning:this.#i(d||a),danger:this.#i(l||this.#I(n)),info:this.#i(p||n),gray:this.#k(o),surface:this.#S(i)};return u.surface.fieldset=this.#_(u.surface),u.surfaceSmart=this.#C(u.surface,r),u.dark=this.#F(u,i,c),u.dark&&u.dark.surface&&(u.dark.surfaceSmart=this.#C(u.dark.surface,r)),u.interactive={light:this.#r(u.primary,u.surface.base),dark:this.#r(u.dark.primary,u.dark.surface.base)},u.accentInteractive={light:this.#r(u.accent,u.surface.base),dark:this.#r(u.dark.accent,u.dark.surface.base)},u.surfaceAccent={light:this.#n(u.accent,u.surface),dark:this.#n(u.dark.accent,u.dark.surface)},u.dangerInteractive={light:this.#r(u.danger,u.surface.base),dark:this.#r(u.dark.danger,u.dark.surface.base)},u.successInteractive={light:this.#r(u.success,u.surface.base),dark:this.#r(u.dark.success,u.dark.surface.base)},u.warningInteractive={light:this.#r(u.warning,u.surface.base),dark:this.#r(u.dark.warning,u.dark.surface.base)},u.infoInteractive={light:this.#r(u.info,u.surface.base),dark:this.#r(u.dark.info,u.dark.surface.base)},u.surfaceStatus={light:{success:this.#n(u.success,u.surface),warning:this.#n(u.warning,u.surface),info:this.#n(u.info,u.surface),danger:this.#n(u.danger,u.surface)},dark:{success:this.#n(u.dark.success,u.dark.surface),warning:this.#n(u.dark.warning,u.dark.surface),info:this.#n(u.dark.info,u.dark.surface),danger:this.#n(u.dark.danger,u.dark.surface)}},u}#i(e){let r=this.#s(e);return{50:this.#t(r.h,Math.max(r.s-10,10),Math.min(r.l+45,95)),100:this.#t(r.h,Math.max(r.s-5,15),Math.min(r.l+35,90)),200:this.#t(r.h,r.s,Math.min(r.l+25,85)),300:this.#t(r.h,r.s,Math.min(r.l+15,75)),400:this.#t(r.h,r.s,Math.min(r.l+5,65)),500:e,600:this.#t(r.h,r.s,Math.max(r.l-10,25)),700:this.#t(r.h,r.s,Math.max(r.l-20,20)),800:this.#t(r.h,r.s,Math.max(r.l-30,15)),900:this.#t(r.h,r.s,Math.max(r.l-40,10))}}#R(e){let r=this.#s(e);return this.#t(120,Math.max(r.s,60),45)}#I(e){let r=this.#s(e);return this.#t(0,Math.max(r.s,70),50)}#k(e){let r=this.#s(e),n=r.h,o=Math.min(r.s,10);return{50:this.#t(n,o,98),100:this.#t(n,o,95),200:this.#t(n,o,88),300:this.#t(n,o,78),400:this.#t(n,o,60),500:e,600:this.#t(n,Math.min(o+5,15),45),700:this.#t(n,Math.min(o+8,18),35),800:this.#t(n,Math.min(o+10,20),20),900:this.#t(n,Math.min(o+12,22),10)}}#S(e){let r=this.#s(e);return{base:e,subtle:this.#t(r.h,Math.max(r.s,2),Math.max(r.l-2,2)),elevated:this.#t(r.h,Math.max(r.s,3),Math.max(r.l-4,5)),sunken:this.#t(r.h,Math.max(r.s,4),Math.max(r.l-6,8)),overlay:this.#t(r.h,Math.max(r.s,2),Math.min(r.l+2,98)),inverse:this.#$(e),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#_(e){return{base:e.subtle,subtle:e.elevated,elevated:e.sunken,sunken:this.#h(e.sunken,.05),overlay:e.elevated}}#h(e,r=.05){let n=this.#s(e),o=Math.max(n.l-n.l*r,5);return this.#t(n.h,n.s,o)}#$(e){let r=this.#s(e);if(r.l>50){let n=Math.min(r.s+5,25),o=Math.max(12-(r.l-50)*.1,8);return this.#t(r.h,n,o)}else{let n=Math.max(r.s-10,5),o=Math.min(85+(50-r.l)*.3,95);return this.#t(r.h,n,o)}}#F(e,r="#ffffff",n={}){let o=n.background?n.background:this.#$(r),a=this.#S(o),i=(s,d)=>s?this.#i(s):d;return{surface:{...a,fieldset:this.#N(a)},primary:i(n.primary,e.primary),secondary:i(n.secondary,e.secondary),accent:i(n.accent,e.accent),gray:n.secondary?this.#k(n.secondary):e.gray,success:i(n.success,e.success),info:i(n.info,e.info),warning:i(n.warning,e.warning),danger:i(n.danger,e.danger)}}#p(e){let r=String(e||"").replace("#",""),n=r.length===3?r.split("").map(a=>a+a).join(""):r,o=parseInt(n,16);return{r:o>>16&255,g:o>>8&255,b:o&255}}#u(e){let{r,g:n,b:o}=this.#p(e),a=[r/255,n/255,o/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*a[0]+.7152*a[1]+.0722*a[2]}#g(e,r){let n=this.#u(e),o=this.#u(r),a=Math.max(n,o),i=Math.min(n,o);return(a+.05)/(i+.05)}#f(e,r=4.5){if(!e)return"#000000";let n="#ffffff",o="#000000",a=this.#g(e,n);if(a>=r)return n;let i=this.#g(e,o);return i>=r||i>a?o:n}#L(e,r=1){let{r:n,g:o,b:a}=this.#p(e);return`rgba(${n}, ${o}, ${a}, ${r})`}#z(e,r,n=.5){let o=this.#p(e),a=this.#p(r),i=Math.round(o.r+(a.r-o.r)*n),s=Math.round(o.g+(a.g-o.g)*n),d=Math.round(o.b+(a.b-o.b)*n);return this.#P(i,s,d)}#P(e,r,n){let o=a=>{let i=Math.max(0,Math.min(255,Math.round(a))).toString(16);return i.length===1?"0"+i:i};return`#${o(e)}${o(r)}${o(n)}`}#N(e){return{base:e.elevated,subtle:e.overlay,elevated:this.#m(e.elevated,.08),sunken:e.elevated,overlay:this.#m(e.overlay,.05)}}#c(e={},r="#000000",n=4.5){let o=["600","700","800","500","400","900","300","200"],a={shade:null,color:null,ratio:0};for(let i of o){let s=e?.[i];if(!s||typeof s!="string")continue;let d=this.#g(s,r);if(d>a.ratio&&(a={shade:i,color:s,ratio:d}),d>=n)return s}return a.color||e?.["600"]||e?.["500"]}#r(e={},r="#ffffff"){let n=this.#u(r)<.18,o=this.#j(e,4.5),a=n?this.#m(o,.15):this.#h(o,.1),i=n?this.#m(o,.07):this.#h(o,.2),s=this.#c(e,r,4.5),d=this.#c(e,r,5.5),l=this.#c(e,r,3);return{fill:o,fillHover:a,fillActive:i,text:s,textHover:d||s,textVisited:this.#z(s||o,r,.2),focusRing:l||s||o,selectionBg:s||o,selectionText:this.#f(s||o,4.5),contrast:this.#f(o,4.5)}}#n(e={},r={}){let n={};return Object.entries(r).forEach(([o,a])=>{if(!a||typeof a!="string"||!a.startsWith("#"))return;let i=this.#c(e,a,4.5),s=this.#c(e,a,5);n[o]={text:i,textHover:s||i}}),n}#j(e={},r=4.5){let n=["600","700","800","500","400","900"],o={shade:null,color:null,ratio:0};for(let a of n){let i=e?.[a];if(!i||typeof i!="string")continue;let s=this.#g(i,"#ffffff");if(s>o.ratio&&(o={shade:a,color:i,ratio:s}),s>=r)return i}return o.color||e?.["600"]||e?.["500"]}#C(e,r={}){let n={},o=r.light??.1,a=r.dark??.25;return Object.entries(e).forEach(([i,s])=>{if(!s||typeof s!="string"||!s.startsWith("#"))return;let d=this.#u(s)<.5,l=this.#f(s,4.5),p=this.#f(s,3),c=this.#z(l,s,.4),u=l,y=c,g=d?"#ffffff":"#000000",x=d?a:o,b=this.#L(g,x),f=d?"#ffffff":"#000000",h=d?.15:.1,v=this.#L(f,h);n[i]={bg:s,text:l,textSecondary:p,textMuted:c,icon:u,iconSubtle:y,shadow:b,border:v,scheme:d?"dark":"light"}}),n}#m(e,r=.05){let n=this.#s(e),o=Math.min(n.l+(100-n.l)*r,95);return this.#t(n.h,n.s,o)}generateSpacingTokens(e){let{baseUnit:r=4,scaleRatio:n=1.25,maxSpacingSteps:o=12}=e,a=Number.isFinite(Number(r))?Number(r):4,i=Math.min(Number.isFinite(Number(o))?Number(o):12,12),s={0:"0"};for(let d=1;d<=i;d++)s[d]=`${a*d}px`;return s}#O(e){let{radiusSize:r="medium",customRadius:n=null}=e,o;n!=null?o=n:typeof r=="number"?o=r:typeof r=="string"?o=$.RadiusSizes[r]??$.RadiusSizes.medium:o=$.RadiusSizes.medium;let a=Number.isFinite(Number(o))?Number(o):$.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(a*.25)?Math.round(a*.25):0}px`,sm:`${Number.isFinite(a*.5)?Math.round(a*.5):0}px`,md:`${a}px`,lg:`${Number.isFinite(a*1.5)?Math.round(a*1.5):0}px`,xl:`${Number.isFinite(a*2)?Math.round(a*2):0}px`,full:"9999px"}}#B(e){let{borderWidth:r="medium"}=e,n;typeof r=="number"?n=r:typeof r=="string"?n=$.BorderWidths[r]??$.BorderWidths.medium:n=$.BorderWidths.medium;let o=Number.isFinite(Number(n))?Number(n):$.BorderWidths.medium,a=i=>`${Math.max(1,Math.ceil(i))}px`;return{hairline:a(o*.25),thin:a(o*.5),medium:a(o),thick:a(o*1.5)}}generateTypographyTokens(e){let{fontFamilyHeadings:r="system-ui, -apple-system, sans-serif",fontFamilyBody:n="system-ui, -apple-system, sans-serif",fontFamilyMono:o='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:a=16,fontScale:i=1.25,fontWeightLight:s=$.FontWeights.light,fontWeightNormal:d=$.FontWeights.normal,fontWeightMedium:l=$.FontWeights.medium,fontWeightSemibold:p=$.FontWeights.semibold,fontWeightBold:c=$.FontWeights.bold,lineHeightTight:u=$.LineHeights.tight,lineHeightNormal:y=$.LineHeights.normal,lineHeightRelaxed:g=$.LineHeights.relaxed}=e,x=Number.isFinite(Number(a))?Number(a):16,b=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:r,body:n,mono:o},fontSize:{xs:`${Math.round(x/Math.pow(b,2))}px`,sm:`${Math.round(x/b)}px`,base:`${x}px`,lg:`${Math.round(x*b)}px`,xl:`${Math.round(x*Math.pow(b,2))}px`,"2xl":`${Math.round(x*Math.pow(b,3))}px`,"3xl":`${Math.round(x*Math.pow(b,4))}px`,"4xl":`${Math.round(x*Math.pow(b,5))}px`},fontWeight:{light:s?.toString()||"300",normal:d?.toString()||"400",medium:l?.toString()||"500",semibold:p?.toString()||"600",bold:c?.toString()||"700"},lineHeight:{tight:u?.toString()||"1.25",normal:y?.toString()||"1.5",relaxed:g?.toString()||"1.75"}}}#M(e){let{baseShadowOpacity:r=.1,shadowBlurMultiplier:n=1,shadowOffsetMultiplier:o=1}=e,a=`rgba(0, 0, 0, ${r})`,i=`rgba(0, 0, 0, ${r*.5})`;return{sm:`0 ${1*o}px ${2*n}px 0 ${i}`,base:`0 ${1*o}px ${3*n}px 0 ${a}, 0 ${1*o}px ${2*n}px 0 ${i}`,md:`0 ${4*o}px ${6*n}px ${-1*o}px ${a}, 0 ${2*o}px ${4*n}px ${-1*o}px ${i}`,lg:`0 ${10*o}px ${15*n}px ${-3*o}px ${a}, 0 ${4*o}px ${6*n}px ${-2*o}px ${i}`,xl:`0 ${20*o}px ${25*n}px ${-5*o}px ${a}, 0 ${10*o}px ${10*n}px ${-5*o}px ${i}`,inner:`inset 0 ${2*o}px ${4*n}px 0 ${i}`}}#D(e){let{containerPadding:r=16,breakpoints:n={sm:640,md:768,lg:1024,xl:1280}}=e,o=this.#b(e,"maxWidth"),a=e.maxWidth,i=this.#E(e,{emitFallbacks:!1});return{maxWidth:o?this.#o(a,"1200px"):void 0,maxWidthSm:i.sm,maxWidthMd:i.md,maxWidthLg:i.lg,maxWidthXl:i.xl,minHeight:"100vh",containerPadding:this.#o(r,"16px"),breakpoints:{sm:this.#o(n.sm,"640px"),md:this.#o(n.md,"768px"),lg:this.#o(n.lg,"1024px"),xl:this.#o(n.xl,"1280px")},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#E(e={},r={}){let{emitFallbacks:n=!0}=r,o={sm:640,md:768,lg:1024,xl:1280},{maxWidths:a={},containerPadding:i=16,breakpoints:s=o}=e||{},d=this.#b(e,"maxWidth"),l=["sm","md","lg","xl"].some(b=>this.#b(a,b));if(!n&&!d&&!l)return{sm:void 0,md:void 0,lg:void 0,xl:void 0};let p=e?.maxWidth,c=this.#l(i,16),u=this.#l(p,o.xl),y={sm:this.#l(s.sm,o.sm),md:this.#l(s.md,o.md),lg:this.#l(s.lg,o.lg),xl:this.#l(s.xl,o.xl)},g=b=>b?Math.max(320,b-c*2):u,x={sm:Math.min(u,g(y.sm)),md:Math.min(u,g(y.md)),lg:Math.min(u,g(y.lg)),xl:Math.max(320,u)};return{sm:this.#o(a.sm,`${x.sm}px`),md:this.#o(a.md,`${x.md}px`),lg:this.#o(a.lg,`${x.lg}px`),xl:this.#o(a.xl,`${x.xl}px`)}}#b(e,r){if(!e||typeof e!="object"||!Object.prototype.hasOwnProperty.call(e,r))return!1;let n=e[r];return!(n==null||typeof n=="string"&&n.trim().length===0)}#o(e,r){return typeof e=="number"&&Number.isFinite(e)?`${e}px`:typeof e=="string"&&e.trim().length>0?e:r}#l(e,r){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let n=parseFloat(e);if(Number.isFinite(n))return n}return r}#H(e){let{transitionSpeed:r=$.TransitionSpeeds.normal,animationEasing:n=$.AnimationEasings["ease-out"]}=e,o;return typeof r=="number"?o=r:typeof r=="string"&&$.TransitionSpeeds[r]?o=$.TransitionSpeeds[r]:o=$.TransitionSpeeds.normal,{fast:`${Math.round(o*.6)}ms`,normal:`${o}ms`,slow:`${Math.round(o*1.4)}ms`}}#W(e){let{baseZIndex:r=1e3,zIndexStep:n=10}=e;return{dropdown:r.toString(),sticky:(r+n*2).toString(),fixed:(r+n*3).toString(),modal:(r+n*4).toString(),drawer:(r+n*5).toString(),popover:(r+n*6).toString(),tooltip:(r+n*7).toString(),notification:(r+n*8).toString()}}#U(e){let{set:r="phosphor",weight:n="regular",defaultSize:o=24,sizes:a={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:s="/assets/img/icons/"}=e;return{set:r,weight:n,defaultSize:`${o}px`,sizes:Object.fromEntries(Object.entries(a).map(([d,l])=>[d,`${l}px`])),spritePath:i,externalPath:s}}#q(e){let r=[];r.push(`  /* Colors */
`);let n=(o,a="")=>{Object.entries(o).forEach(([i,s])=>{typeof s=="object"&&s!==null?n(s,`${a}${i}-`):typeof s=="string"&&r.push(`  --color-${a}${i}: ${s};
`)})};Object.entries(e).forEach(([o,a])=>{o!=="dark"&&o!=="surfaceSmart"&&o!=="interactive"&&o!=="accentInteractive"&&o!=="dangerInteractive"&&o!=="successInteractive"&&o!=="warningInteractive"&&o!=="infoInteractive"&&o!=="surfaceAccent"&&o!=="surfaceStatus"&&typeof a=="object"&&a!==null&&n(a,`${o}-`)}),e.surfaceSmart&&(r.push(`  /* Smart Surface Tokens (context-aware) */
`),Object.entries(e.surfaceSmart).forEach(([o,a])=>{r.push(`  --surface-${o}-bg: ${a.bg};
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
`),e.interactive&&e.interactive.light&&(r.push(`  /* Interactive Colors - optimized for specific use cases */
`),r.push(`  --color-primary-fill: ${e.interactive.light.fill}; /* For button backgrounds with white text */
`),r.push(`  --color-primary-fill-hover: ${e.interactive.light.fillHover};
`),r.push(`  --color-primary-fill-active: ${e.interactive.light.fillActive};
`),r.push(`  --color-primary-text: ${e.interactive.light.text}; /* For links and outline buttons on light surfaces */
`),r.push(`  --color-primary-text-hover: ${e.interactive.light.textHover};
`),r.push(`  --color-primary-text-visited: ${e.interactive.light.textVisited};
`),r.push(`  --color-primary-contrast: ${e.interactive.light.contrast};
`),r.push(`  --color-focus-ring: ${e.interactive.light.focusRing};
`),r.push(`  --color-selection-bg: ${e.interactive.light.selectionBg};
`),r.push(`  --color-selection-text: ${e.interactive.light.selectionText};
`),r.push(`  --color-link: var(--color-primary-text);
`),r.push(`  --color-link-hover: var(--color-primary-text-hover);
`),r.push(`  --color-link-visited: var(--color-primary-text-visited);
`)),e.accentInteractive?.light&&(r.push(`  /* Accent Role Colors */
`),r.push(`  --color-accent-fill: ${e.accentInteractive.light.fill};
`),r.push(`  --color-accent-fill-hover: ${e.accentInteractive.light.fillHover};
`),r.push(`  --color-accent-fill-active: ${e.accentInteractive.light.fillActive};
`),r.push(`  --color-accent-text: ${e.accentInteractive.light.text};
`),r.push(`  --color-accent-text-hover: ${e.accentInteractive.light.textHover};
`)),e.surfaceAccent?.light&&(r.push(`  /* Surface-Aware Accent Text Tokens */
`),Object.entries(e.surfaceAccent.light).forEach(([o,a])=>{r.push(`  --surface-${o}-accent-text: ${a.text};
`),r.push(`  --surface-${o}-accent-text-hover: ${a.textHover};
`)})),e.dangerInteractive?.light&&(r.push(`  /* Danger Role Colors */
`),r.push(`  --color-danger-fill: ${e.dangerInteractive.light.fill};
`),r.push(`  --color-danger-fill-hover: ${e.dangerInteractive.light.fillHover};
`),r.push(`  --color-danger-fill-active: ${e.dangerInteractive.light.fillActive};
`),r.push(`  --color-danger-text: ${e.dangerInteractive.light.text};
`),r.push(`  --color-danger-text-hover: ${e.dangerInteractive.light.textHover};
`),r.push(`  --color-danger-contrast: ${e.dangerInteractive.light.contrast};
`)),e.successInteractive?.light&&(r.push(`  /* Success Role Colors */
`),r.push(`  --color-success-fill: ${e.successInteractive.light.fill};
`),r.push(`  --color-success-fill-hover: ${e.successInteractive.light.fillHover};
`),r.push(`  --color-success-fill-active: ${e.successInteractive.light.fillActive};
`),r.push(`  --color-success-text: ${e.successInteractive.light.text};
`),r.push(`  --color-success-text-hover: ${e.successInteractive.light.textHover};
`),r.push(`  --color-success-contrast: ${e.successInteractive.light.contrast};
`)),e.warningInteractive?.light&&(r.push(`  /* Warning Role Colors */
`),r.push(`  --color-warning-fill: ${e.warningInteractive.light.fill};
`),r.push(`  --color-warning-fill-hover: ${e.warningInteractive.light.fillHover};
`),r.push(`  --color-warning-fill-active: ${e.warningInteractive.light.fillActive};
`),r.push(`  --color-warning-text: ${e.warningInteractive.light.text};
`),r.push(`  --color-warning-text-hover: ${e.warningInteractive.light.textHover};
`),r.push(`  --color-warning-contrast: ${e.warningInteractive.light.contrast};
`)),e.infoInteractive?.light&&(r.push(`  /* Info Role Colors */
`),r.push(`  --color-info-fill: ${e.infoInteractive.light.fill};
`),r.push(`  --color-info-fill-hover: ${e.infoInteractive.light.fillHover};
`),r.push(`  --color-info-fill-active: ${e.infoInteractive.light.fillActive};
`),r.push(`  --color-info-text: ${e.infoInteractive.light.text};
`),r.push(`  --color-info-text-hover: ${e.infoInteractive.light.textHover};
`),r.push(`  --color-info-contrast: ${e.infoInteractive.light.contrast};
`)),e.surfaceStatus?.light&&(r.push(`  /* Surface-Aware Status Text Tokens */
`),Object.entries(e.surfaceStatus.light).forEach(([o,a])=>{Object.entries(a).forEach(([i,s])=>{r.push(`  --surface-${i}-${o}-text: ${s.text};
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
    `),r.push(this.#V(e)),`${r.join("")}
`}#V(e){let r=e.primary?.[500]||"#3b82f6",n=e.secondary?.[500]||"#8b5cf6",o=e.accent?.[500]||"#f59e0b";return`
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
    `}#G(e){let r=[`  /* Spacing */
`];return Object.entries(e).forEach(([n,o])=>{n!=null&&n!=="NaN"&&o!==void 0&&!o.includes("NaN")&&r.push(`  --spacing-${n}: ${o};
`)}),`${r.join("")}
`}#K(e){let r=[`  /* Border Radius */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --radius-${n}: ${o};
`)}),`${r.join("")}
`}#J(e){let r=[`  /* Border Widths */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --border-width-${n}: ${o};
`)}),`${r.join("")}
`}#Y(e){let r=[`  /* Typography */
`];return Object.entries(e).forEach(([n,o])=>{let a=n.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(o).forEach(([i,s])=>{let d=i.replace(/([A-Z])/g,"-$1").toLowerCase();r.push(`  --font-${a}-${d}: ${s};
`)})}),`${r.join("")}
`}#y(e){let r=[`  /* Shadows */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --shadow-${n}: ${o};
`)}),`${r.join("")}
`}#X(e){let r=[`  /* Layout */
`];return Object.entries(e).forEach(([n,o])=>{let a=n.replace(/([A-Z])/g,"-$1").toLowerCase();o!=null&&n!=="breakpoints"&&r.push(`  --layout-${a}: ${o};
`)}),`${r.join("")}
`}#Z(e){let r=[`  /* Transitions */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --transition-${n}: ${o};
`)}),`${r.join("")}
`}#Q(e){let r=[`  /* Z-Index */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --z-${n}: ${o};
`)}),`${r.join("")}
`}#ee(e){let r=[`  /* Icon System */
`];return r.push(`  --icon-set: ${e.set};
`),r.push(`  --icon-weight: ${e.weight};
`),r.push(`  --icon-size: ${e.defaultSize};
`),Object.entries(e.sizes).forEach(([n,o])=>{r.push(`  --icon-size-${n}: ${o};
`)}),`${r.join("")}
`}#te(e,r){if(!e?.dark)return"";let n=[],o=(m,S="")=>{Object.entries(m).forEach(([C,T])=>{typeof T=="object"&&T!==null?o(T,`${S}${C}-`):typeof T=="string"&&n.push(`  --color-${S}${C}: ${T};
`)})};Object.entries(e.dark).forEach(([m,S])=>{m!=="surfaceSmart"&&typeof S=="object"&&S!==null&&o(S,`${m}-`)});let a=[];e.dark.surfaceSmart&&(a.push(`  /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(e.dark.surfaceSmart).forEach(([m,S])=>{a.push(`  --surface-${m}-bg: ${S.bg};
`),a.push(`  --surface-${m}-text: ${S.text};
`),a.push(`  --surface-${m}-text-secondary: ${S.textSecondary};
`),a.push(`  --surface-${m}-text-muted: ${S.textMuted};
`),a.push(`  --surface-${m}-icon: ${S.icon};
`),a.push(`  --surface-${m}-icon-subtle: ${S.iconSubtle};
`),a.push(`  --surface-${m}-shadow: ${S.shadow};
`),a.push(`  --surface-${m}-border: ${S.border};
`)}),a.push(`
`));let i=[];e.interactive?.dark&&(i.push(`  /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`  --color-primary-fill: ${e.interactive.dark.fill};
`),i.push(`  --color-primary-fill-hover: ${e.interactive.dark.fillHover};
`),i.push(`  --color-primary-fill-active: ${e.interactive.dark.fillActive};
`),i.push(`  --color-primary-text: ${e.interactive.dark.text};
`),i.push(`  --color-primary-text-hover: ${e.interactive.dark.textHover};
`),i.push(`  --color-primary-text-visited: ${e.interactive.dark.textVisited};
`),i.push(`  --color-primary-contrast: ${e.interactive.dark.contrast};
`),i.push(`  --color-focus-ring: ${e.interactive.dark.focusRing};
`),i.push(`  --color-selection-bg: ${e.interactive.dark.selectionBg};
`),i.push(`  --color-selection-text: ${e.interactive.dark.selectionText};
`),i.push(`  --color-link: var(--color-primary-text);
`),i.push(`  --color-link-hover: var(--color-primary-text-hover);
`),i.push(`  --color-link-visited: var(--color-primary-text-visited);
`));let s=[];e.accentInteractive?.dark&&(s.push(`  /* Accent Role Colors (dark mode) */
`),s.push(`  --color-accent-fill: ${e.accentInteractive.dark.fill};
`),s.push(`  --color-accent-fill-hover: ${e.accentInteractive.dark.fillHover};
`),s.push(`  --color-accent-fill-active: ${e.accentInteractive.dark.fillActive};
`),s.push(`  --color-accent-text: ${e.accentInteractive.dark.text};
`),s.push(`  --color-accent-text-hover: ${e.accentInteractive.dark.textHover};
`));let d=[];e.surfaceAccent?.dark&&(d.push(`  /* Surface-Aware Accent Text Tokens (dark mode) */
`),Object.entries(e.surfaceAccent.dark).forEach(([m,S])=>{d.push(`  --surface-${m}-accent-text: ${S.text};
`),d.push(`  --surface-${m}-accent-text-hover: ${S.textHover};
`)}));let l=[];e.dangerInteractive?.dark&&(l.push(`  /* Danger Role Colors (dark mode) */
`),l.push(`  --color-danger-fill: ${e.dangerInteractive.dark.fill};
`),l.push(`  --color-danger-fill-hover: ${e.dangerInteractive.dark.fillHover};
`),l.push(`  --color-danger-fill-active: ${e.dangerInteractive.dark.fillActive};
`),l.push(`  --color-danger-text: ${e.dangerInteractive.dark.text};
`),l.push(`  --color-danger-text-hover: ${e.dangerInteractive.dark.textHover};
`),l.push(`  --color-danger-contrast: ${e.dangerInteractive.dark.contrast};
`));let p=[];e.successInteractive?.dark&&(p.push(`  /* Success Role Colors (dark mode) */
`),p.push(`  --color-success-fill: ${e.successInteractive.dark.fill};
`),p.push(`  --color-success-fill-hover: ${e.successInteractive.dark.fillHover};
`),p.push(`  --color-success-fill-active: ${e.successInteractive.dark.fillActive};
`),p.push(`  --color-success-text: ${e.successInteractive.dark.text};
`),p.push(`  --color-success-text-hover: ${e.successInteractive.dark.textHover};
`),p.push(`  --color-success-contrast: ${e.successInteractive.dark.contrast};
`));let c=[];e.warningInteractive?.dark&&(c.push(`  /* Warning Role Colors (dark mode) */
`),c.push(`  --color-warning-fill: ${e.warningInteractive.dark.fill};
`),c.push(`  --color-warning-fill-hover: ${e.warningInteractive.dark.fillHover};
`),c.push(`  --color-warning-fill-active: ${e.warningInteractive.dark.fillActive};
`),c.push(`  --color-warning-text: ${e.warningInteractive.dark.text};
`),c.push(`  --color-warning-text-hover: ${e.warningInteractive.dark.textHover};
`),c.push(`  --color-warning-contrast: ${e.warningInteractive.dark.contrast};
`));let u=[];e.infoInteractive?.dark&&(u.push(`  /* Info Role Colors (dark mode) */
`),u.push(`  --color-info-fill: ${e.infoInteractive.dark.fill};
`),u.push(`  --color-info-fill-hover: ${e.infoInteractive.dark.fillHover};
`),u.push(`  --color-info-fill-active: ${e.infoInteractive.dark.fillActive};
`),u.push(`  --color-info-text: ${e.infoInteractive.dark.text};
`),u.push(`  --color-info-text-hover: ${e.infoInteractive.dark.textHover};
`),u.push(`  --color-info-contrast: ${e.infoInteractive.dark.contrast};
`));let y=[];e.surfaceStatus?.dark&&(y.push(`  /* Surface-Aware Status Text Tokens (dark mode) */
`),Object.entries(e.surfaceStatus.dark).forEach(([m,S])=>{Object.entries(S).forEach(([C,T])=>{y.push(`  --surface-${C}-${m}-text: ${T.text};
`),y.push(`  --surface-${C}-${m}-text-hover: ${T.textHover};
`)})}));let g=[`  /* Semantic Callout Display Tokens (dark mode) */
`];for(let m of["success","info","warning","danger"])g.push(`  --color-${m}-display-bg: color-mix(in oklab, var(--color-${m}-400) 12%, var(--color-surface-base));
`),g.push(`  --color-${m}-display-border: var(--color-${m}-400);
`),g.push(`  --color-${m}-display-text: var(--color-${m}-100);
`);let x=`  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
`,b=`  /* Backdrop tokens - dark mode */
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
`,f=this.#oe(e),h=r?[this.#y(r)]:[];return`html[data-theme="dark"] {
${[...n,...a,...h,x,...i,...s,...d,...l,...p,...c,...u,...y,...g,b,f].join("")}}
`}#re(e,r){if(!e?.dark)return"";let n=[],o=(m,S="")=>{Object.entries(m).forEach(([C,T])=>{typeof T=="object"&&T!==null?o(T,`${S}${C}-`):typeof T=="string"&&n.push(`    --color-${S}${C}: ${T};
`)})};Object.entries(e.dark).forEach(([m,S])=>{m!=="surfaceSmart"&&typeof S=="object"&&S!==null&&o(S,`${m}-`)});let a=[];e.dark.surfaceSmart&&(a.push(`    /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(e.dark.surfaceSmart).forEach(([m,S])=>{a.push(`    --surface-${m}-bg: ${S.bg};
`),a.push(`    --surface-${m}-text: ${S.text};
`),a.push(`    --surface-${m}-text-secondary: ${S.textSecondary};
`),a.push(`    --surface-${m}-text-muted: ${S.textMuted};
`),a.push(`    --surface-${m}-icon: ${S.icon};
`),a.push(`    --surface-${m}-icon-subtle: ${S.iconSubtle};
`),a.push(`    --surface-${m}-shadow: ${S.shadow};
`),a.push(`    --surface-${m}-border: ${S.border};
`)}),a.push(`
`));let i=[];e.interactive&&e.interactive.dark&&(i.push(`    /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`    --color-primary-fill: ${e.interactive.dark.fill};
`),i.push(`    --color-primary-fill-hover: ${e.interactive.dark.fillHover};
`),i.push(`    --color-primary-fill-active: ${e.interactive.dark.fillActive};
`),i.push(`    --color-primary-text: ${e.interactive.dark.text};
`),i.push(`    --color-primary-text-hover: ${e.interactive.dark.textHover};
`),i.push(`    --color-primary-text-visited: ${e.interactive.dark.textVisited};
`),i.push(`    --color-primary-contrast: ${e.interactive.dark.contrast};
`),i.push(`    --color-focus-ring: ${e.interactive.dark.focusRing};
`),i.push(`    --color-selection-bg: ${e.interactive.dark.selectionBg};
`),i.push(`    --color-selection-text: ${e.interactive.dark.selectionText};
`),i.push(`    --color-link: var(--color-primary-text);
`),i.push(`    --color-link-hover: var(--color-primary-text-hover);
`),i.push(`    --color-link-visited: var(--color-primary-text-visited);
`));let s=[];e.accentInteractive?.dark&&(s.push(`    /* Accent Role Colors (dark mode) */
`),s.push(`    --color-accent-fill: ${e.accentInteractive.dark.fill};
`),s.push(`    --color-accent-fill-hover: ${e.accentInteractive.dark.fillHover};
`),s.push(`    --color-accent-fill-active: ${e.accentInteractive.dark.fillActive};
`),s.push(`    --color-accent-text: ${e.accentInteractive.dark.text};
`),s.push(`    --color-accent-text-hover: ${e.accentInteractive.dark.textHover};
`));let d=[];e.surfaceAccent?.dark&&(d.push(`    /* Surface-Aware Accent Text Tokens (dark mode) */
`),Object.entries(e.surfaceAccent.dark).forEach(([m,S])=>{d.push(`    --surface-${m}-accent-text: ${S.text};
`),d.push(`    --surface-${m}-accent-text-hover: ${S.textHover};
`)}));let l=[];e.dangerInteractive?.dark&&(l.push(`    /* Danger Role Colors (dark mode) */
`),l.push(`    --color-danger-fill: ${e.dangerInteractive.dark.fill};
`),l.push(`    --color-danger-fill-hover: ${e.dangerInteractive.dark.fillHover};
`),l.push(`    --color-danger-fill-active: ${e.dangerInteractive.dark.fillActive};
`),l.push(`    --color-danger-text: ${e.dangerInteractive.dark.text};
`),l.push(`    --color-danger-text-hover: ${e.dangerInteractive.dark.textHover};
`),l.push(`    --color-danger-contrast: ${e.dangerInteractive.dark.contrast};
`));let p=[];e.successInteractive?.dark&&(p.push(`    /* Success Role Colors (dark mode) */
`),p.push(`    --color-success-fill: ${e.successInteractive.dark.fill};
`),p.push(`    --color-success-fill-hover: ${e.successInteractive.dark.fillHover};
`),p.push(`    --color-success-fill-active: ${e.successInteractive.dark.fillActive};
`),p.push(`    --color-success-text: ${e.successInteractive.dark.text};
`),p.push(`    --color-success-text-hover: ${e.successInteractive.dark.textHover};
`),p.push(`    --color-success-contrast: ${e.successInteractive.dark.contrast};
`));let c=[];e.warningInteractive?.dark&&(c.push(`    /* Warning Role Colors (dark mode) */
`),c.push(`    --color-warning-fill: ${e.warningInteractive.dark.fill};
`),c.push(`    --color-warning-fill-hover: ${e.warningInteractive.dark.fillHover};
`),c.push(`    --color-warning-fill-active: ${e.warningInteractive.dark.fillActive};
`),c.push(`    --color-warning-text: ${e.warningInteractive.dark.text};
`),c.push(`    --color-warning-text-hover: ${e.warningInteractive.dark.textHover};
`),c.push(`    --color-warning-contrast: ${e.warningInteractive.dark.contrast};
`));let u=[];e.infoInteractive?.dark&&(u.push(`    /* Info Role Colors (dark mode) */
`),u.push(`    --color-info-fill: ${e.infoInteractive.dark.fill};
`),u.push(`    --color-info-fill-hover: ${e.infoInteractive.dark.fillHover};
`),u.push(`    --color-info-fill-active: ${e.infoInteractive.dark.fillActive};
`),u.push(`    --color-info-text: ${e.infoInteractive.dark.text};
`),u.push(`    --color-info-text-hover: ${e.infoInteractive.dark.textHover};
`),u.push(`    --color-info-contrast: ${e.infoInteractive.dark.contrast};
`));let y=[];e.surfaceStatus?.dark&&(y.push(`    /* Surface-Aware Status Text Tokens (dark mode) */
`),Object.entries(e.surfaceStatus.dark).forEach(([m,S])=>{Object.entries(S).forEach(([C,T])=>{y.push(`    --surface-${C}-${m}-text: ${T.text};
`),y.push(`    --surface-${C}-${m}-text-hover: ${T.textHover};
`)})}));let g=[`    /* Semantic Callout Display Tokens (dark mode) */
`];for(let m of["success","info","warning","danger"])g.push(`    --color-${m}-display-bg: color-mix(in oklab, var(--color-${m}-400) 12%, var(--color-surface-base));
`),g.push(`    --color-${m}-display-border: var(--color-${m}-400);
`),g.push(`    --color-${m}-display-text: var(--color-${m}-100);
`);let x=[`    --color-text-primary: var(--color-gray-100);
`,`    --color-text-secondary: var(--color-gray-300);
`,`    --color-text-muted: var(--color-gray-500);
`,`    --color-border: var(--color-gray-700);
`,`    --color-input-bg: var(--color-gray-800);
`,`    --color-input-disabled-bg: var(--color-gray-900);
`,`    --color-input-disabled-text: var(--color-gray-600);
`,`    --color-code-bg: var(--color-gray-800);
`,...i].join(""),b=`    /* Backdrop tokens - dark mode */
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
`,f=this.#ne(e),h=r?[this.#y(r)]:[];return`
       html[data-theme="dark"] {
${[...n,...a,...h,x,...s,...d,...l,...p,...c,...u,...y,...g,b,f].join("")}       }
`}#ne(e){let r=e.dark||e,n=r.primary?.[400]||"#60a5fa",o=r.secondary?.[400]||"#a78bfa",a=r.accent?.[400]||"#fbbf24";return`    /* Mesh Gradient Variables (Dark Mode) */
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
      `}#oe(e){let r=e.dark||e,n=r.primary?.[400]||"#60a5fa",o=r.secondary?.[400]||"#a78bfa",a=r.accent?.[400]||"#fbbf24";return`
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
}`}#ie(){try{let e=this.options?.design?.options?.backgroundMesh;this.options.debug&&this.options.log?.("debug","backgroundMesh check:",e);let r=Number(e);return!Number.isFinite(r)||r===0?"":`/* Optional background mesh applied from config */
body {
  background: var(--background-mesh-0${Math.max(1,Math.min(5,Math.floor(r)))});
  background-attachment: fixed;
}`}catch(e){return this.options.debug&&this.options.log?.("error","Error in generateBodyBackgroundMeshRule:",e),""}}#se(){try{return this.options?.design?.options?.liquidGlassEffects?`/* Liquid glass utility (opt-in via options.liquidGlassEffects) */
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

`}#ce(){let{layout:e={}}=this.options.design,r=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Semantic HTML Elements (low-specificity via :where()) */

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

`}#de(){let{shape:e={},spatialRhythm:r={},inputPadding:n,buttonPadding:o,focusRingWidth:a,focusRingOpacity:i,borderWidthThin:s,sectionSpacing:d,buttonMinHeight:l,inputMinHeight:p}=this.options.design,c=typeof e.borderWidth=="number"?e.borderWidth:typeof e.borderWidth=="string"?$.BorderWidths[e.borderWidth]??null:null,u=r.inputPadding??n??.75,y=r.buttonPadding??o??1,g=a||3,x=s||c||$.BorderWidths.thin,b=r.sectionSpacing??d??2,f=l||30;return`/* Mobile-First Form Styles - Generated from Design Config */
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
  min-height: ${p||40}px;
  padding: calc(var(--spacing-1) * ${u}) var(--spacing-4);
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
      box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-danger-fill) ${Math.round((i||.3)*100)}%, transparent);
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
  padding: calc(var(--spacing-1) * ${y*.6}) calc(var(--spacing-4) * 0.85);
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
    box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
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
    padding: calc(var(--spacing-1) * ${y*.6}) calc(var(--spacing-4) * 0.85);
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

    &:has([disabled]) {
      pointer-events: none;
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
      box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
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
  --btn-pad-y: max(calc(var(--spacing-1) * ${y}), var(--spacing-2));
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
    box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${g}px color-mix(in oklab, var(--color-focus-ring, var(--color-primary-500)) ${Math.round((i||.3)*100)}%, transparent);
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
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${y}), var(--spacing-2)) * 0.85);
  --btn-target-h: max(calc(${f}px * 0.85), calc(var(--font-size-sm) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
  padding: var(--btn-pad-y) calc(var(--spacing-6) * 0.8);
  font-size: var(--font-size-sm);
  min-height: var(--btn-target-h);
  height: var(--btn-target-h);
}

.btn-xs {
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${y}), var(--spacing-2)) * 0.7);
  --btn-target-h: max(calc(${f}px * 0.7), calc(var(--font-size-xs) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
  padding: var(--btn-pad-y) calc(var(--spacing-6) * 0.65);
  font-size: var(--font-size-xs);
  min-height: var(--btn-target-h);
  height: var(--btn-target-h);
}


.btn-lg {
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${y}), var(--spacing-2)) * 1.15);
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

`}#pe(){let{layout:e={}}=this.options.design,r=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Table Styles - Mobile First */

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

`}#ue(){return`/* Callout/Notification Styles */

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

`}#ge(){return`/* Accordion (details/summary) */

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
`}#fe(){return`/* Badge/Pill Styles */

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

`}#me(){let{layout:e={},behavior:r={}}=this.options.design;return`/* ============================================================================
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
@media (max-width: ${(e.breakpoints||{sm:640,md:768,lg:1024,xl:1280}).sm-1}px) {
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


`}#he(){let{layout:e={}}=this.options.design;return`/* Tab Strip Component */

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
@media (max-width: ${(e.breakpoints||{sm:640,md:768,lg:1024,xl:1280}).sm-1}px) {
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

`}#ye(){let{layout:e={}}=this.options.design,r=e.buttonMinHeight||30,n=e.buttonPadding||1,o=`max(calc(var(--spacing-1) * ${n}), var(--spacing-2))`,a=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 0.85)`,i=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 0.7)`,s=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 1.15)`,d=.72,l=`calc(${o} * ${d})`,p=`calc(${a} * ${d})`,c=`calc(${i} * ${d})`,u=`calc(${s} * ${d})`,y=`${r}px`,g=`calc(${r}px * 0.85)`,x=`calc(${r}px * 0.7)`,b=`calc(${r}px * 1.15)`,f=`max(${y}, calc(var(--font-size-base) + (${o} * 2) + (var(--border-width-medium) * 2)))`,h=`max(${g}, calc(var(--font-size-sm) + (${a} * 2) + (var(--border-width-medium) * 2)))`,v=`max(${x}, calc(var(--font-size-xs) + (${i} * 2) + (var(--border-width-medium) * 2)))`,m=`max(${b}, calc(var(--font-size-lg) + (${s} * 2) + (var(--border-width-medium) * 2)))`;return`/* Icon System */

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
    padding: ${p};
    min-width: ${h};
    min-height: ${h};
    width: ${h};
    height: ${h};

    pds-icon,
    pds-icon[size] {
      width: 1.15em;
      height: 1.15em;
    }
  }

  &.btn-xs.icon-only {
    padding: ${c};
    min-width: ${v};
    min-height: ${v};
    width: ${v};
    height: ${v};

    pds-icon,
    pds-icon[size] {
      width: 1.1em;
      height: 1.1em;
    }
  }

  &.btn-lg.icon-only {
    padding: ${u};
    min-width: ${m};
    min-height: ${m};
    width: ${m};
    height: ${m};

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
    min-width: var(--dropdown-min-width, 12rem);
    width: max-content;
    inline-size: max-content;
    max-width: none;
    max-inline-size: none;
    opacity: 0;
    visibility: hidden;
    display: none;
    pointer-events: none;
    transform-origin: top center;
    z-index: var(--z-dropdown, 1050);
    max-height: min(60vh, 24rem);
    overflow-x: hidden;
    overflow-y: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
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
    transition:
      opacity var(--dropdown-transition-duration) ease,
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
      transform-origin: top center;
    }
  }

  &[data-mode="auto"]:not([data-dropdown-direction]) > :last-child {
    top: 100%;
    bottom: auto;
    margin-top: var(--spacing-2);
    margin-bottom: 0;
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
  }
}
`}#xe(){let{layout:e={}}=this.options.design,r=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280},n=e.gridSystem||{},o=n.columns||[1,2,3,4,6],a=n.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=this.#E(e),s=[`
/* ============================================================================
   Layout Utilities
   Modern grid and flex system for building responsive layouts
   ============================================================================ */

/* Container */
.container {
  display: block;
  width: 100%;
  max-width: ${e.containerMaxWidth||"1400px"};
  margin: 0 auto;
  padding: ${e.containerPadding||"var(--spacing-6)"};
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

`}#ke(){let{layout:e={},a11y:r={}}=this.options.design,n=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280},o=r.minTouchTarget||$.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

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

`}#s(e){let r=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,a=Math.max(r,n,o),i=Math.min(r,n,o),s,d,l=(a+i)/2;if(a===i)s=d=0;else{let p=a-i;switch(d=l>.5?p/(2-a-i):p/(a+i),a){case r:s=(n-o)/p+(n<o?6:0);break;case n:s=(o-r)/p+2;break;case o:s=(r-n)/p+4;break}s/=6}return{h:s*360,s:d*100,l:l*100}}#t(e,r,n){e=e/360,r=r/100,n=n/100;let o=(l,p,c)=>(c<0&&(c+=1),c>1&&(c-=1),c<1/6?l+(p-l)*6*c:c<1/2?p:c<2/3?l+(p-l)*(2/3-c)*6:l),a,i,s;if(r===0)a=i=s=n;else{let l=n<.5?n*(1+r):n+r-n*r,p=2*n-l;a=o(p,l,e+1/3),i=o(p,l,e),s=o(p,l,e-1/3)}let d=l=>{let p=Math.round(l*255).toString(16);return p.length===1?"0"+p:p};return`#${d(a)}${d(i)}${d(s)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#Se(){this.#e={tokens:this.#$e(),primitives:this.#Le(),components:this.#ze(),utilities:this.#Ce()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#$e(){let{colors:e,spacing:r,radius:n,borderWidths:o,typography:a,shadows:i,darkShadows:s,layout:d,transitions:l,zIndex:p,icons:c}=this.tokens,u=[`@layer tokens {
       :root {
          ${this.#q(e)}
          ${this.#G(r)}
          ${this.#K(n)}
          ${this.#J(o)}
          ${this.#Y(a)}
          ${this.#y(i)}
          ${this.#X(d)}
          ${this.#Z(l)}
          ${this.#Q(p)}
          ${this.#ee(c)}
       }
       ${this.#re(e,s)}
    }`];return u.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),u.push(this.#te(e,s)),u.join("")}#Le(){let{advanced:e={},a11y:r={},layout:n={}}=this.options.design,o=e.tabSize||$.TabSizes.standard,a=r.minTouchTarget||$.TouchTargetSizes.standard,i=n.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
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

`}#ze(){return`@layer components {

${this.#ce()}

${this.#de()}

${this.#ue()}

${this.#fe()}

${this.#me()}

${this.#ge()}

${this.#ve()}

${this.#he()}

${this.#pe()}

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
`}#Me(){this.#a={tokens:new CSSStyleSheet,primitives:new CSSStyleSheet,components:new CSSStyleSheet,utilities:new CSSStyleSheet},this.#Ee()}#Ee(){this.#a.tokens.replaceSync(this.#e.tokens),this.#a.primitives.replaceSync(this.#e.primitives),this.#a.components.replaceSync(this.#e.components),this.#a.utilities.replaceSync(this.#e.utilities)}get tokensCSS(){return this.#e?.tokens||""}get primitivesCSS(){return this.#e?.primitives||""}get componentsCSS(){return this.#e?.components||""}get utilitiesCSS(){return this.#e?.utilities||""}get layeredCSS(){return this.#e?`${this.#e.tokens}
${this.#e.primitives}
${this.#e.components}
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof q<"u"?q:null,enums:typeof $<"u"?$:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let e=[],r=this.tokens.colors;for(let[n,o]of Object.entries(r))typeof o=="object"&&o!==null&&e.push({name:n,scale:o});return e},getColorScale:e=>this.tokens.colors[e]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([e,r])=>({key:e,value:r})),getTypography:()=>this.tokens.typography,getLayerCSS:e=>{let r=["tokens","primitives","components","utilities"];if(!r.includes(e))throw new Error(`Invalid layer: ${e}. Must be one of ${r.join(", ")}`);return this.#e?.[e]||""},usesEnumValue:(e,r)=>{let n=this.options.design||{};return JSON.stringify(n).includes(r)}}}}get tokensStylesheet(){return this.#a?.tokens}get primitivesStylesheet(){return this.#a?.primitives}get componentsStylesheet(){return this.#a?.components}get utilitiesStylesheet(){return this.#a?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#d("tokens",this.#e.tokens),"pds-primitives.css.js":this.#d("primitives",this.#e.primitives),"pds-components.css.js":this.#d("components",this.#e.components),"pds-utilities.css.js":this.#d("utilities",this.#e.utilities),"pds-styles.css.js":this.#d("styles",this.layeredCSS)}}#d(e,r){let n=r.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${e}
// Auto-generated - do not edit directly

export const ${e} = new CSSStyleSheet();
${e}.replaceSync(\`${n}\`);

export const ${e}CSS = \`${n}\`;
`}};function Ir(t={},e={}){let r=Number(e.minContrast||4.5),n=Number(e.minMutedContrast||3),o=!!e.extendedChecks,a=e.warnOnHueDrift!==!1,i=Number.isFinite(Number(e.maxHueDrift))?Number(e.maxHueDrift):35,s=Number.isFinite(Number(e.minSaturationForHueWarning))?Number(e.minSaturationForHueWarning):18,d=b=>{let h=String(b||"").trim().match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);if(!h)return null;let v=h[1];return`#${(v.length===3?v.split("").map(S=>S+S).join(""):v).toLowerCase()}`},l=b=>{let f=d(b);if(!f)return null;let h=f.replace("#",""),v=h.length===3?h.split("").map(S=>S+S).join(""):h,m=parseInt(v||"0",16);return{r:m>>16&255,g:m>>8&255,b:m&255}},p=b=>{let f=l(b);if(!f)return 0;let{r:h,g:v,b:m}=f,S=[h/255,v/255,m/255].map(C=>C<=.03928?C/12.92:Math.pow((C+.055)/1.055,2.4));return .2126*S[0]+.7152*S[1]+.0722*S[2]},c=(b,f)=>{if(!b||!f)return 0;let h=p(b),v=p(f),m=Math.max(h,v),S=Math.min(h,v);return(m+.05)/(S+.05)},u=b=>{let f=l(b);if(!f)return null;let h=f.r/255,v=f.g/255,m=f.b/255,S=Math.max(h,v,m),C=Math.min(h,v,m),T=S-C,I=0;T!==0&&(S===h?I=(v-m)/T%6:S===v?I=(m-h)/T+2:I=(h-v)/T+4,I*=60,I<0&&(I+=360));let z=(S+C)/2,E=T===0?0:T/(1-Math.abs(2*z-1));return{h:I,s:E*100,l:z*100}},y=(b,f)=>{if(!Number.isFinite(b)||!Number.isFinite(f))return null;let h=Math.abs(b-f);return Math.min(h,360-h)},g=[],x=[];try{let f=new Z({design:structuredClone(t)}).tokens.colors,h={surfaceBg:f.surface?.base,surfaceText:f.gray?.[900]||"#000000",surfaceTextSecondary:f.gray?.[700]||f.gray?.[800]||f.gray?.[900],surfaceTextMuted:f.gray?.[500]||f.gray?.[600]||f.gray?.[700],surfaceElevated:f.surface?.elevated||f.surface?.base,primaryFill:f.interactive?.light?.fill||f.primary?.[600],primaryText:f.interactive?.light?.text||f.primary?.[600],accentFill:f.accent?.[600]||f.accent?.[500],successFill:f.success?.[600]||f.success?.[500],warningFill:f.warning?.[600]||f.warning?.[500],dangerFill:f.danger?.[600]||f.danger?.[500],infoFill:f.info?.[600]||f.info?.[500]},v=I=>Math.max(c(I,"#ffffff"),c(I,"#000000")),m=c(h.primaryFill,"#ffffff");m<r&&g.push({path:"/colors/primary",message:`Primary button contrast too low in light theme (${m.toFixed(2)} < ${r}). Choose a darker primary.`,ratio:m,min:r,context:"light/btn-primary"});let S=c(h.surfaceBg,h.surfaceText);if(S<r&&g.push({path:"/colors/background",message:`Base text contrast on surface (light) is too low (${S.toFixed(2)} < ${r}). Adjust background or secondary (gray).`,ratio:S,min:r,context:"light/surface-text"}),o){let I=c(h.surfaceBg,h.surfaceTextSecondary);I<r&&g.push({path:"/colors/secondary",message:`Secondary text contrast on base surface (light) is too low (${I.toFixed(2)} < ${r}).`,ratio:I,min:r,context:"light/surface-text-secondary"});let z=c(h.surfaceBg,h.surfaceTextMuted);z<n&&g.push({path:"/colors/secondary",message:`Muted text contrast on base surface (light) is too low (${z.toFixed(2)} < ${n}).`,ratio:z,min:n,context:"light/surface-text-muted"});let E=c(h.surfaceElevated,h.surfaceText);E<r&&g.push({path:"/colors/background",message:`Elevated surface text contrast (light) is too low (${E.toFixed(2)} < ${r}).`,ratio:E,min:r,context:"light/surface-elevated-text"})}let C=c(h.primaryText,h.surfaceBg);C<r&&g.push({path:"/colors/primary",message:`Primary text on surface is too low for outline/link styles (light) (${C.toFixed(2)} < ${r}). Choose a darker primary or lighter surface.`,ratio:C,min:r,context:"light/outline"}),o&&[{path:"/colors/accent",key:"accent",value:h.accentFill},{path:"/colors/success",key:"success",value:h.successFill},{path:"/colors/warning",key:"warning",value:h.warningFill},{path:"/colors/danger",key:"danger",value:h.dangerFill},{path:"/colors/info",key:"info",value:h.infoFill}].forEach(z=>{if(!z?.value)return;let E=v(z.value);E<r&&g.push({path:z.path,message:`${z.key} fill color cannot achieve accessible text contrast (${E.toFixed(2)} < ${r}) with either white or black text.`,ratio:E,min:r,context:`light/${z.key}-fill`})});let T=f.dark;if(T){let I={surfaceBg:T.surface?.base||f.surface?.inverse,surfaceText:T.gray?.[50]||T.gray?.[100]||"#ffffff",surfaceTextMuted:T.gray?.[300]||T.gray?.[400]||T.gray?.[500],primaryFill:f.interactive?.dark?.fill||T.primary?.[600],primaryText:f.interactive?.dark?.text||T.primary?.[600]},z=c(I.primaryFill,"#ffffff");z<r&&g.push({path:"/colors/darkMode/primary",message:`Primary button contrast too low in dark theme (${z.toFixed(2)} < ${r}). Override darkMode.primary or pick a brighter hue.`,ratio:z,min:r,context:"dark/btn-primary"});let E=c(I.primaryText,I.surfaceBg);if(E<r&&g.push({path:"/colors/darkMode/primary",message:`Primary text on surface is too low for outline/link styles (dark) (${E.toFixed(2)} < ${r}). Override darkMode.primary/background.`,ratio:E,min:r,context:"dark/outline"}),o){let P=c(I.surfaceBg,I.surfaceText);P<r&&g.push({path:"/colors/darkMode/background",message:`Base text contrast on surface (dark) is too low (${P.toFixed(2)} < ${r}).`,ratio:P,min:r,context:"dark/surface-text"});let M=c(I.surfaceBg,I.surfaceTextMuted);M<n&&g.push({path:"/colors/darkMode/secondary",message:`Muted text contrast on surface (dark) is too low (${M.toFixed(2)} < ${n}).`,ratio:M,min:n,context:"dark/surface-text-muted"})}}if(a){let I=t?.colors||{},z=I?.darkMode||{};["primary","secondary","accent"].forEach(P=>{let M=I?.[P],k=z?.[P];if(!M||!k)return;let L=u(M),A=u(k);if(!L||!A||L.s<s&&A.s<s)return;let R=y(L.h,A.h);R==null||R<=i||x.push({path:`/colors/darkMode/${P}`,message:`Dark mode ${P} hue drifts ${R.toFixed(1)}deg from light ${P} (${L.h.toFixed(1)}deg -> ${A.h.toFixed(1)}deg). This may reduce cross-theme brand identity consistency.`,context:`dark/identity-hue-${P}`})})}}catch(b){g.push({path:"/",message:`Validation failed: ${String(b?.message||b)}`,ratio:0,min:0})}return{ok:g.length===0,issues:g,warnings:x}}var io=new Set(["log","warn","error","debug","info"]),so="__PURE_DS_PDS_SINGLETON__",Ht=null,Wt=null;function Fr(){try{let e=(typeof globalThis<"u"?globalThis:window)?.[so];if(e&&typeof e=="object")return e}catch{return null}return null}function lo(t){return!t||typeof t!="object"?null:{mode:t.mode==="live"||t.mode==="static"?t.mode:null,debug:t.debug===!0,thisArg:t.thisArg}}function co(t){if(typeof t!="string")return"log";let e=t.toLowerCase();return io.has(e)?e:"log"}function po(){if(typeof Wt=="function")try{let e=lo(Wt());if(e)return e}catch{}let t=Fr();if(t){let e=t?.mode||t?.compiled?.mode||(t?.registry?.isLive?"live":"static"),r=(t?.debug||t?.currentConfig?.debug||t?.currentConfig?.design?.debug||t?.compiled?.debug||t?.compiled?.design?.debug||!1)===!0;return{mode:e,debug:r,thisArg:t}}return{mode:null,debug:!1}}function uo(){if(typeof Ht=="function")try{let e=Ht();if(typeof e=="function")return e}catch{}let t=Fr();return typeof t?.logHandler=="function"?t.logHandler:null}function _r(t,e,...r){if(typeof console>"u")return;let n=typeof console[t]=="function"?console[t].bind(console):typeof console.log=="function"?console.log.bind(console):null;n&&(r.length>0?n(e,...r):n(e))}function go(t,e){let r=e?.debug===!0;return!(e?.mode==="static"&&!r||!r&&t!=="error"&&t!=="warn")}function Pr({getLogger:t,getContext:e}={}){Ht=typeof t=="function"?t:null,Wt=typeof e=="function"?e:null}function Qe(t="log",e,...r){let n=co(t),o=po(),a=uo();if(a)try{a.call(o?.thisArg,n,e,...r);return}catch(i){_r("error","Custom log handler failed:",i)}go(n,o)&&_r(n,e,...r)}var fo="en",F={defaultLocale:fo,provider:null,messagesByLocale:new Map,loadingByLocale:new Map,observer:null,reconcileTimer:null,requestedKeys:new Set,textNodeKeyMap:new WeakMap,attributeKeyMap:new WeakMap,valueToKeys:new Map,missingWarnings:new Set},mo=["title","placeholder","aria-label","aria-description","aria-placeholder","aria-roledescription","alt","label"],ho=t=>!!t&&typeof t!="string"&&typeof t=="object"&&"strTag"in t;function oe(t){return String(t||"").trim().toLowerCase()}function bo(t){let e=oe(t);return e?e.split("-")[0]||e:""}function pe(t){let e=oe(t);if(!e)return F.defaultLocale;let r=F.provider?.resolveLocale;if(typeof r=="function"){let n=oe(r(t));if(n)return n}return e}function yo(t){let e="";for(let r=0;r<=t.length-1;r+=1)e+=t[r],r<t.length-1&&(e+=`{${r}}`);return e}function ye(t,e){return String(t).replace(/\{(\d+)\}/g,(r,n)=>e(Number(n)))}function Ut(t){if(!t||typeof t!="object")return{};let e={};for(let[r,n]of Object.entries(t)){if(typeof n=="string"){e[r]=n;continue}n&&typeof n=="object"&&typeof n.content=="string"&&(e[r]=n.content)}return e}function vo(t){let e=oe(t);if(!e)return[F.defaultLocale];let r=bo(e);return!r||r===e?[e]:[e,r]}function Nr(t,e){let r=pe(t);F.messagesByLocale.set(r,Ut(e))}function Br(t){typeof t=="string"&&t.length>0&&F.requestedKeys.add(t)}function jr(t,e){if(typeof t!="string"||!t.length)return;let r=typeof e=="string"?e:String(e||"");r.length&&(F.valueToKeys.has(r)||F.valueToKeys.set(r,new Set),F.valueToKeys.get(r).add(t))}function Oe(t){let e=vo(t);for(let r of e)if(F.messagesByLocale.has(r))return{locale:r,messages:F.messagesByLocale.get(r)};return null}async function ve(t,e="explicit"){let r=pe(t),n=Oe(r);if(n)return n.messages;let o=r;if(F.loadingByLocale.has(o))return F.loadingByLocale.get(o);if(!F.provider)return{};let a=F.provider.loadLocale||F.provider.setLocale||null;if(typeof a!="function")return{};let i={locale:r,defaultLocale:F.defaultLocale,reason:e,loadedLocales:Array.from(F.messagesByLocale.keys()),messages:{...Oe(r)?.messages||{}},load:e==="set-default"||e==="explicit-load"},s;try{s=a(i)}catch{return{}}if(s&&typeof s.then=="function"){let l=s.then(p=>{let c=Ut(p);return Nr(r,c),c}).catch(()=>({})).finally(()=>{F.loadingByLocale.delete(o)});return F.loadingByLocale.set(o,l),l}let d=Ut(s);return Nr(r,d),d}function xo(t){if(!t||typeof t!="object")return"";let r=typeof Element<"u"&&t instanceof Element||t?.nodeType===1?t:null;if(!r)return"";if(r.hasAttribute?.("lang"))return oe(r.getAttribute("lang"));let n=r.closest?.("[lang]");return n&&n.getAttribute?oe(n.getAttribute("lang")):""}function Be(t={}){if(typeof t?.lang=="string"&&t.lang.trim())return pe(t.lang);let e=t?.element||t?.scope||t?.host||t?.contextElement||null,r=xo(e);if(r)return pe(r);if(typeof document<"u"&&document.documentElement){let n=oe(document.documentElement.getAttribute("lang"));if(n)return pe(n)}return F.defaultLocale}function wo(){let t=new Set([F.defaultLocale]);if(typeof document>"u")return t;let e=oe(document.documentElement?.getAttribute?.("lang"));e&&t.add(pe(e));let r=document.querySelectorAll?.("[lang]")||[];for(let n of r){let o=oe(n.getAttribute("lang"));o&&t.add(pe(o))}return t}async function ko(t){for(let e of t)await ve(e,"lang-detected")}function So(t){for(let e of Array.from(F.messagesByLocale.keys()))t.has(e)||F.messagesByLocale.delete(e)}function $o(t){let e=String(t||""),r=(e.match(/^\s*/)||[""])[0],n=(e.match(/\s*$/)||[""])[0],o=r.length,a=e.length-n.length,i=a>=o?e.slice(o,a):"";return{leading:r,core:i,trailing:n}}function Or(t){return String(t||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Lo(t,e){let r=typeof t=="string"?t:String(t||""),n=typeof e=="string"?e:String(e||""),o=/\{(\d+)\}/g,a=Array.from(r.matchAll(o));if(!a.length)return r===n?[]:null;let i=[],s="^",d=0;for(let c of a){let u=c.index??0;s+=Or(r.slice(d,u)),s+="([\\s\\S]*?)",i.push(Number(c[1])),d=u+c[0].length}s+=Or(r.slice(d)),s+="$";let l=new RegExp(s).exec(n);if(!l)return null;let p=[];for(let c=1;c<l.length;c+=1){let u=i[c-1],y=l[c];if(Object.prototype.hasOwnProperty.call(p,u)&&p[u]!==y)return null;p[u]=y}return p}function qt(t,e){if(typeof t!="string"||!t.length)return[];let r=[t];for(let[,n]of F.messagesByLocale.entries()){let o=n?.[t];typeof o=="string"&&o.length&&r.push(o)}for(let n of r){let o=Lo(n,e);if(o)return o}return[]}function Dr(t){if(!t)return null;let e=F.valueToKeys.get(t);if(e&&e.size>0){for(let n of e)if(F.requestedKeys.has(n))return n}if(F.requestedKeys.has(t))return t;let r=Array.from(F.messagesByLocale.entries());for(let n of F.requestedKeys)for(let[,o]of r)if(o&&o[n]===t)return n;return null}function Hr(t){if(!t)return null;let e=null;for(let[r,n]of F.valueToKeys.entries()){if(typeof r!="string"||!r.length||r===t)continue;let o=t.indexOf(r);if(o!==-1)for(let a of n){if(!F.requestedKeys.has(a))continue;let i=qt(a,r),s={key:a,matchedText:r,start:o,end:o+r.length,values:i};(!e||s.matchedText.length>e.matchedText.length)&&(e=s);break}}return e}async function zo(t){if(!t||t.nodeType!==3)return;let e=t.parentElement||null;if(!e)return;let{leading:r,core:n,trailing:o}=$o(t.nodeValue);if(!n)return;let a=F.textNodeKeyMap.get(t)||null;if((!a||!F.requestedKeys.has(a))&&(a=Dr(n)),!a){let c=Hr(n);if(!c)return;let u=Be({element:e});await ve(u,"text-node");let y=xe(c.key,c.values,{element:e},null),g=c.values.length?ye(y,f=>c.values[f]):y,x=n.slice(0,c.start)+g+n.slice(c.end),b=`${r}${x}${o}`;b!==t.nodeValue&&(t.nodeValue=b);return}F.textNodeKeyMap.set(t,a);let i=Be({element:e});await ve(i,"text-node");let s=qt(a,n),d=xe(a,s,{element:e},null),l=s.length?ye(d,c=>s[c]):d,p=`${r}${l}${o}`;p!==t.nodeValue&&(t.nodeValue=p)}async function Co(){if(typeof document>"u"||F.requestedKeys.size===0)return;let t=document.body||document.documentElement;if(!t||typeof document.createTreeWalker!="function")return;let e=[],r=new Set,n=a=>{!a||r.has(a)||(r.add(a),e.push(a))};n(t);for(let a=0;a<e.length;a+=1){let i=e[a];if(!i||typeof i.querySelectorAll!="function")continue;let s=i.querySelectorAll("*");for(let d of s){let l=d?.shadowRoot;l&&n(l)}}let o=[];for(let a of e){let i=document.createTreeWalker(a,NodeFilter.SHOW_TEXT);for(;i.nextNode();)o.push(i.currentNode)}for(let a of o)await zo(a)}function Mo(t){let e=F.attributeKeyMap.get(t);return e||(e=new Map,F.attributeKeyMap.set(t,e)),e}async function Eo(t,e){if(!t||typeof t.getAttribute!="function")return;let r=t.getAttribute(e);if(typeof r!="string"||!r.length)return;let n=Mo(t),o=n.get(e)||null;if((!o||!F.requestedKeys.has(o))&&(o=Dr(r)),!o){let l=Hr(r);if(!l)return;let p=Be({element:t});await ve(p,"attribute");let c=xe(l.key,l.values,{element:t},null),u=l.values.length?ye(c,g=>l.values[g]):c,y=r.slice(0,l.start)+u+r.slice(l.end);y!==r&&t.setAttribute(e,y),n.set(e,l.key);return}n.set(e,o);let a=Be({element:t});await ve(a,"attribute");let i=qt(o,r),s=xe(o,i,{element:t},null),d=i.length?ye(s,l=>i[l]):s;d!==r&&t.setAttribute(e,d)}async function Ao(){if(typeof document>"u"||F.requestedKeys.size===0)return;let t=document.body||document.documentElement;if(!t)return;let e=[],r=new Set,n=o=>{!o||r.has(o)||(r.add(o),e.push(o))};n(t);for(let o=0;o<e.length;o+=1){let a=e[o];if(!a||typeof a.querySelectorAll!="function")continue;let i=a.querySelectorAll("*");for(let s of i){let d=s?.shadowRoot;d&&n(d)}}for(let o of e){if(!o||typeof o.querySelectorAll!="function")continue;let a=o.querySelectorAll("*");for(let i of a)for(let s of mo)i.hasAttribute(s)&&await Eo(i,s)}}async function To(){let t=wo();await ko(t),await Co(),await Ao(),So(t)}function Ro(){typeof window>"u"||(F.reconcileTimer&&clearTimeout(F.reconcileTimer),F.reconcileTimer=setTimeout(()=>{F.reconcileTimer=null,To()},16))}function xe(t,e=[],r={},n=null){let o=Be(r),a=Oe(o);a||ve(o,"msg");let i=Oe(o)?.messages||{},s=Oe(F.defaultLocale)?.messages||{},d={key:t,values:e,options:r,locale:o,defaultLocale:F.defaultLocale,messages:i,messagesByLocale:Object.fromEntries(Array.from(F.messagesByLocale.entries())),template:n},l,p=!!a,c=o===F.defaultLocale;typeof F.provider?.translate=="function"&&(l=F.provider.translate(d));let u=null;if(l==null&&(l=i[t]),l==null&&(l=s[t],u=l==null?null:"default"),l==null&&(l=t,u="key"),p&&!c&&u){let g=`${o}::${t}`;F.missingWarnings.has(g)||(F.missingWarnings.add(g),Qe("warn",`[i18n] Missing translation for locale "${o}" and key "${t}"; using ${u} fallback.`))}let y=typeof l=="string"?l:String(l);if(jr(t,y),Array.isArray(e)&&e.length>0){let g=ye(y,x=>e[x]);g!==y&&jr(t,g)}return y}var Io=(t,e,r={})=>{let n=yo(t);Br(n);let o=xe(n,e,r,{strings:t,values:e});return ye(o,a=>e[a])};var se=(t,e={})=>{if(!t)return"";if(ho(t))return Io(t.strings,t.values,e);let r=String(t);Br(r);let n=xe(r,[],e,null);return!e?.element&&!e?.scope&&!e?.host&&!e?.contextElement&&!e?.lang&&Ro(),n};var Gt=class extends EventTarget{constructor(){super(),this.mode=null,this.compiled=null,this.log=()=>{},this.logHandler=null}},Wr="__PURE_DS_PDS_SINGLETON__",Kt=typeof globalThis<"u"?globalThis:window,Vt=Kt?.[Wr],w=Vt&&typeof Vt.addEventListener=="function"?Vt:new Gt;Kt&&(Kt[Wr]=w);typeof w.log!="function"&&(w.log=(t="log",e,...r)=>{if(typeof console>"u")return;let n=typeof console[t]=="function"?console[t].bind(console):typeof console.log=="function"?console.log.bind(console):null;n&&(r.length>0?n(e,...r):n(e))});typeof w.logHandler!="function"&&(w.logHandler=null);var Jt=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(e={}){this._mode="static",this._staticPaths={...this._staticPaths,...e}}async getStylesheet(e){if(this._mode==="live")return null;try{return(await import(this._staticPaths[e]))[e]}catch(r){w.log("error",`Registry: failed to load static ${e}:`,r),w.log("error",`Registry: looking for ${this._staticPaths[e]}`),w.log("error","Registry: make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");let n=new CSSStyleSheet;return n.replaceSync("/* Failed to load "+e+" */"),n}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},we=new Jt;function _o(t){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let n=new CSSStyleSheet;n.replaceSync(t),n._pds=!0;let o=(document.adoptedStyleSheets||[]).filter(a=>a._pds!==!0);document.adoptedStyleSheets=[...o,n];return}let e="pds-runtime-stylesheet",r=document.getElementById(e);if(!r){r=document.createElement("style"),r.id=e,r.type="text/css";let n=document.head||document.getElementsByTagName("head")[0];n?n.appendChild(r):document.documentElement.appendChild(r)}r.textContent=t}catch(e){w.log("warn","installRuntimeStyles failed:",e)}}function Ur(t){let e=t;if(!e||typeof e!="object"){w.log("error","Runtime applyStyles requires an explicit generator instance in live mode");return}let r=e.layeredCSS||e.css||"";if(!r){e.options?.log?.("warn","Runtime: no CSS available on generator to apply");return}_o(r)}async function et(t,e=[],r=null){try{let n=r?.primitivesStylesheet?r.primitivesStylesheet:await we.getStylesheet("primitives");t.adoptedStyleSheets=[n,...e]}catch(n){let o=t.host?.tagName?.toLowerCase()||"unknown";w.log("error",`Adopter: <${o}> failed to adopt primitives:`,n),t.adoptedStyleSheets=e}}async function tt(t,e=["primitives"],r=[],n=null){let o=Array.isArray(r)?r.filter(Boolean):[];if(o.length){let i=(Array.isArray(t.adoptedStyleSheets)?t.adoptedStyleSheets:[]).filter(s=>!o.includes(s));t.adoptedStyleSheets=[...i,...o]}try{let i=(await Promise.all(e.map(async s=>{if(n)switch(s){case"tokens":return n.tokensStylesheet;case"primitives":return n.primitivesStylesheet;case"components":return n.componentsStylesheet;case"utilities":return n.utilitiesStylesheet;default:break}return we.getStylesheet(s)}))).filter(s=>s!==null);t.adoptedStyleSheets=[...i,...o]}catch(a){let i=t.host?.tagName?.toLowerCase()||"unknown";w.log("error",`Adopter: <${i}> failed to adopt layers:`,a),t.adoptedStyleSheets=o}}function qr(t){let e=new CSSStyleSheet;return e.replaceSync(t),e}var Fo=[{selector:".accordion"},{selector:"nav[data-dropdown]"},{selector:"label[data-toggle]"},{selector:"label[data-color]"},{selector:'input[type="range"]'},{selector:"form[data-required]"},{selector:"fieldset[role=group][data-open]"},{selector:"[data-clip]"},{selector:"button, a[class*='btn-']"}];function Po(t){t.dataset.enhancedAccordion||(t.dataset.enhancedAccordion="true",t.addEventListener("toggle",e=>{e.target.open&&e.target.parentElement===t&&t.querySelectorAll(":scope > details[open]").forEach(r=>{r!==e.target&&(r.open=!1)})},!0))}function No(t){if(t.dataset.enhancedDropdown)return;t.dataset.enhancedDropdown="true";let e=t.lastElementChild;if(!e)return;let r=t.querySelector("[data-dropdown-toggle]")||t.querySelector("button"),n=typeof HTMLElement<"u"&&"showPopover"in HTMLElement.prototype&&"hidePopover"in HTMLElement.prototype;r&&!r.hasAttribute("type")&&r.setAttribute("type","button"),e.id||(e.id=`dropdown-${Math.random().toString(36).slice(2,9)}`);let o=e.tagName?.toLowerCase()==="menu",a=8;if(o&&!e.hasAttribute("role")&&e.setAttribute("role","menu"),e.hasAttribute("aria-hidden")||e.setAttribute("aria-hidden","true"),r&&(r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-controls",e.id),r.setAttribute("aria-expanded","false")),!n){let z="__PDS_DROPDOWN_POPOVER_WARNED__";globalThis[z]||(globalThis[z]=!0,console.warn("[PDS] nav[data-dropdown] requires the Popover API. Add a popover polyfill (recommended: @oddbird/popover-polyfill) for browsers without support."));return}e.setAttribute("popover","auto");let i=()=>{let z=e.getAttribute("style");e.style.visibility="hidden",e.style.display="inline-block",e.style.pointerEvents="none";let E=e.getBoundingClientRect(),P=Math.max(e.offsetWidth||0,e.scrollWidth||0,E.width||0,1),M=Math.max(e.offsetHeight||0,e.scrollHeight||0,E.height||0,1);return z===null?e.removeAttribute("style"):e.setAttribute("style",z),{width:P,height:M}},s=()=>{try{return e.matches(":popover-open")}catch{return!1}},d=()=>{e.setAttribute("aria-hidden","true"),r?.setAttribute("aria-expanded","false")},l=()=>{e.setAttribute("aria-hidden","false"),r?.setAttribute("aria-expanded","true")},p=()=>{let z=(t.getAttribute("data-direction")||t.getAttribute("data-dropdown-direction")||t.getAttribute("data-mode")||"auto").toLowerCase();if(z==="up"||z==="down")return z;let E=(r||t).getBoundingClientRect(),{height:P}=i(),M=Math.max(0,window.innerHeight-E.bottom),k=Math.max(0,E.top),L=M>=P,A=k>=P;return L&&!A?"down":A&&!L?"up":L&&A?"down":k>M?"up":"down"},c=()=>{let z=(t.getAttribute("data-align")||t.getAttribute("data-dropdown-align")||"auto").toLowerCase();if(z==="left"||z==="right"||z==="start"||z==="end")return z==="start"?"left":z==="end"?"right":z;let E=(r||t).getBoundingClientRect(),{width:P}=i(),M=Math.max(0,window.innerWidth-E.left),k=Math.max(0,E.right),L=M>=P,A=k>=P;return L&&!A?"left":A&&!L?"right":L&&A?"left":k>M?"right":"left"},u=(z,E=8)=>{let P=getComputedStyle(t).getPropertyValue(z).trim();if(!P)return E;let M=document.createElement("span");M.style.position="fixed",M.style.visibility="hidden",M.style.pointerEvents="none",M.style.height=P,document.body.appendChild(M);let k=Number.parseFloat(getComputedStyle(M).height);return M.remove(),Number.isFinite(k)?k:E},y=()=>{["position","left","top","right","bottom","margin-top","margin-bottom","max-width","max-inline-size","max-height","overflow"].forEach(z=>e.style.removeProperty(z))},g=()=>{if(!s())return;let z=(r||t).getBoundingClientRect(),E=window.visualViewport,P=E?.width||document.documentElement?.clientWidth||window.innerWidth,M=E?.height||document.documentElement?.clientHeight||window.innerHeight,k=E?.offsetLeft||0,L=E?.offsetTop||0,A=Math.max(1,P-a*2),R=Math.max(1,M-a*2);e.style.maxWidth=`${Math.round(A)}px`,e.style.maxInlineSize=`${Math.round(A)}px`,e.style.maxHeight=`${Math.round(R)}px`,e.style.overflow="auto";let{width:O,height:B}=i(),K=u("--spacing-2",8),N=p(),D=c();t.dataset.dropdownDirection=N,t.dataset.dropdownAlign=D;let Y=D==="right"?z.right-O:z.left;O>=A-1?Y=k+a:Y=Math.max(k+a,Math.min(Y,k+P-O-a));let Re=N==="up"?z.top-K-B:z.bottom+K;Re=Math.max(L+a,Math.min(Re,L+M-B-a)),Object.assign(e.style,{position:"fixed",left:`${Math.round(Y)}px`,top:`${Math.round(Re)}px`,right:"auto",bottom:"auto",marginTop:"0",marginBottom:"0"})},x=null,b=()=>{x||(x=()=>g(),window.addEventListener("resize",x),window.addEventListener("scroll",x,!0))},f=()=>{x&&(window.removeEventListener("resize",x),window.removeEventListener("scroll",x,!0),x=null)},h=null,v=null,m=()=>{h||typeof document>"u"||(h=()=>{s()&&(t.dataset.dropdownDirection=p(),t.dataset.dropdownAlign=c(),v!==null&&cancelAnimationFrame(v),v=requestAnimationFrame(()=>{v=null,s()&&g()}))},document.addEventListener("pds:config-changed",h))},S=()=>{!h||typeof document>"u"||(document.removeEventListener("pds:config-changed",h),h=null,v!==null&&(cancelAnimationFrame(v),v=null))};e.addEventListener("toggle",z=>{if(z.newState==="open"){l(),g(),b(),m();return}d(),f(),S(),y()});let C=()=>{s()||(t.dataset.dropdownDirection=p(),t.dataset.dropdownAlign=c(),e.showPopover(),requestAnimationFrame(()=>g()))},T=()=>{s()&&e.hidePopover()},I=()=>{s()?T():C()};d(),e.addEventListener("click",z=>{let E=z.target instanceof Element?z.target:z.target?.parentElement;E&&E.closest("[data-dropdown-close]")&&T()}),r?.addEventListener("click",z=>{z.preventDefault(),z.stopPropagation(),I()}),t.addEventListener("keydown",z=>{z.key==="Escape"&&(T(),r?.focus())})}function jo(t){if(t.dataset.enhancedToggle)return;t.dataset.enhancedToggle="true";let e=t.querySelector('input[type="checkbox"]');if(!e)return;t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.setAttribute("role","switch"),t.setAttribute("aria-checked",e.checked?"true":"false");let r=document.createElement("span");r.className="toggle-switch",r.setAttribute("role","presentation"),r.setAttribute("aria-hidden","true");let n=document.createElement("span");n.className="toggle-knob",r.appendChild(n),t.insertBefore(r,e.nextSibling);let o=()=>{t.setAttribute("aria-checked",e.checked?"true":"false")},a=()=>{e.disabled||(e.checked=!e.checked,o(),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})))};t.addEventListener("click",i=>{i.preventDefault(),a()}),t.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),a())}),e.addEventListener("change",o)}function Oo(t){if(t.dataset.enhancedColorInput)return;let e=t.querySelector('input[type="color"]');if(!e)return;t.dataset.enhancedColorInput="true";let r=t.querySelector(":scope > .color-control"),n=t.querySelector(":scope > .color-control > .color-swatch"),o=t.querySelector(":scope > .color-control > output");r||(r=document.createElement("span"),r.className="color-control",e.before(r)),n||(n=document.createElement("span"),n.className="color-swatch",r.appendChild(n)),e.parentElement!==n&&n.appendChild(e),o||(o=document.createElement("output"),r.appendChild(o));let a=()=>{if(e.dataset.colorUnset==="1"){o.value="",o.textContent=se("not set"),r.dataset.value="",r.dataset.unset="1",n.dataset.unset="1";return}o.value=e.value,o.textContent=e.value,r.dataset.value=e.value,delete r.dataset.unset,delete n.dataset.unset};a();let i=()=>{e.dataset.colorUnset==="1"&&(e.dataset.colorUnset="0"),a()};e.addEventListener("input",i,{passive:!0}),e.addEventListener("change",i,{passive:!0})}function Bo(t){if(t.dataset.enhancedRange)return;let e=i=>{if(t.dataset.enhancedRangeProgrammatic)return;t.dataset.enhancedRangeProgrammatic="1";let s=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"value")||Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");s?.get&&s?.set&&Object.defineProperty(t,"value",{configurable:!0,enumerable:s.enumerable,get(){return s.get.call(this)},set(l){s.set.call(this,l),i()}}),new MutationObserver(l=>{l.some(c=>{let u=c.attributeName;return u==="value"||u==="min"||u==="max"})&&i()}).observe(t,{attributes:!0,attributeFilter:["value","min","max"]})},r=t.closest("label"),n=r?.classList.contains("range-output"),o=t.id||`range-${Math.random().toString(36).substring(2,11)}`,a=`${o}-output`;if(t.id=o,n){let i=r.querySelector("span");if(i&&!i.classList.contains("range-output-wrapper")){let s=i.getAttribute("data-range-label")||r.getAttribute("data-range-label")||"",d=document.createElement("span");d.className="range-output-wrapper",d.style.display="flex",d.style.justifyContent="space-between",d.style.alignItems="center";let l=document.createElement("span");l.textContent=s||i.textContent,d.appendChild(l);let p=document.createElement("output");p.id=a,p.setAttribute("for",o),p.style.color="var(--surface-text-secondary, var(--color-text-secondary))",p.style.fontSize="0.875rem",p.textContent=t.value,d.appendChild(p),i.textContent="",i.appendChild(d);let c=()=>{p.textContent=t.value};t.addEventListener("input",c),t.addEventListener("change",c),e(c),c()}}else{let i=t.closest(".range-container");i||(i=document.createElement("div"),i.className="range-container",t.parentNode?.insertBefore(i,t),i.appendChild(t)),i.style.position="relative";let s=document.createElement("output");s.id=a,s.setAttribute("for",o),s.className="range-bubble",s.setAttribute("aria-live","polite"),i.appendChild(s);let d=()=>{let c=parseFloat(t.min)||0,u=parseFloat(t.max)||100,y=parseFloat(t.value),g=(y-c)/(u-c);s.style.left=`calc(${g*100}% )`,s.textContent=String(y)},l=()=>s.classList.add("visible"),p=()=>s.classList.remove("visible");t.addEventListener("input",d),t.addEventListener("pointerdown",l),t.addEventListener("pointerup",p),t.addEventListener("pointerleave",p),t.addEventListener("focus",l),t.addEventListener("blur",p),t.addEventListener("change",d),e(d),d()}t.dataset.enhancedRange="1"}function Do(t){if(t.dataset.enhancedRequired)return;t.dataset.enhancedRequired="true";let e=r=>{let n;if(r.closest("[role$=group]")?n=r.closest("[role$=group]").querySelector("legend"):n=r.closest("label"),!n||n.querySelector(".required-asterisk"))return;let o=document.createElement("span");o.classList.add("required-asterisk"),o.textContent="*",o.style.marginLeft="4px";let a=n.querySelector("span, [data-label]");if(a)a.appendChild(o);else{let s=n.querySelector("input, select, textarea");s?n.insertBefore(o,s):n.appendChild(o)}let i=r.closest("form");if(i&&!i.querySelector(".required-legend")){let s=document.createElement("small");s.classList.add("required-legend"),s.textContent=se("* Required fields"),i.insertBefore(s,i.querySelector(".form-actions")||i.lastElementChild)}};t.querySelectorAll("[required]").forEach(r=>{e(r)})}function Ho(t){if(t.dataset.enhancedOpenGroup)return;t.dataset.enhancedOpenGroup="true",t.classList.add("flex","flex-wrap","buttons");let e=document.createElement("input");e.type="text",e.placeholder=se("Add item..."),e.classList.add("input-text","input-sm"),e.style.width="auto";let r=()=>t.querySelector('input[type="radio"], input[type="checkbox"]');t.appendChild(e),e.addEventListener("keydown",n=>{if(n.key==="Enter"||n.key==="Tab"){let o=e.value.trim();if(o){n.preventDefault();let a=r(),i=a?.type==="radio"?"radio":"checkbox",s=`open-group-${Math.random().toString(36).substring(2,11)}`,d=document.createElement("label"),l=document.createElement("span");l.setAttribute("data-label",""),l.textContent=o;let p=document.createElement("input");p.type=i,p.name=a?.name||t.getAttribute("data-name")||"open-group",p.value=o,p.id=s,d.appendChild(l),d.appendChild(p),t.insertBefore(d,e),e.value=""}}else if(n.key==="Backspace"&&e.value===""){n.preventDefault();let o=t.querySelectorAll("label");o.length>0&&o[o.length-1].remove()}})}function Wo(t){if(t.dataset.enhancedClip)return;t.dataset.enhancedClip="true",t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.hasAttribute("role")||t.setAttribute("role","button");let e=()=>{let n=t.getAttribute("data-clip-open")==="true";t.setAttribute("aria-expanded",n?"true":"false")},r=()=>{let n=t.getAttribute("data-clip-open")==="true";t.setAttribute("data-clip-open",n?"false":"true"),e()};t.addEventListener("click",n=>{n.defaultPrevented||r()}),t.addEventListener("keydown",n=>{(n.key===" "||n.key==="Enter")&&(n.preventDefault(),r())}),e()}function Uo(t){if(t.dataset.enhancedBtnWorking)return;t.dataset.enhancedBtnWorking="true";let e=null,r=!1;new MutationObserver(o=>{o.forEach(a=>{if(a.attributeName==="class"){let i=t.classList.contains("btn-working"),s=t.querySelector("pds-icon");if(i)if(s)e||(e=s.getAttribute("icon")),s.setAttribute("icon","circle-notch");else{let d=document.createElement("pds-icon");d.setAttribute("icon","circle-notch"),d.setAttribute("size","sm"),t.insertBefore(d,t.firstChild),r=!0}else a.oldValue?.includes("btn-working")&&s&&(r?(s.remove(),r=!1):e&&(s.setAttribute("icon",e),e=null))}})}).observe(t,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var qo=new Map([[".accordion",Po],["nav[data-dropdown]",No],["label[data-toggle]",jo],["label[data-color]",Oo],['input[type="range"]',Bo],["form[data-required]",Do],["fieldset[role=group][data-open]",Ho],["[data-clip]",Wo],["button, a[class*='btn-']",Uo]]),rt=Fo.map(t=>({...t,run:qo.get(t.selector)||(()=>{})}));var Vr=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
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
    `.trim()},{selector:"nav[data-dropdown]",description:"Enhances a nav element with data-dropdown to toggle its last child as a dropdown panel (menu, card, form, etc.). Add data-dropdown-close to any clickable descendant that should close the menu on selection.",attributes:[{name:"data-dropdown-close",description:"When clicked (or when a descendant is clicked), closes the currently open dropdown popover.",appliesTo:"Any clickable element inside nav[data-dropdown] menu/panel content"}],demoHtml:`
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
    `.trim()}];var Kr="pds",Vo=/^([a-z][a-z0-9+\-.]*:)?\/\//i,Gr=/^[a-z]:/i;function De(t=""){return t.endsWith("/")?t:`${t}/`}function Go(t="",e=Kr){let r=t.replace(/\/+$/,"");return new RegExp(`(?:^|/)${e}$`,"i").test(r)?r:`${r}/${e}`}function Ko(t){return t.replace(/^\.\/+/,"")}function Jo(t){return Gr.test(t)?t.replace(Gr,"").replace(/^\/+/,""):t}function Yo(t){return t.startsWith("public/")?t.substring(7):t}function ke(t,e={}){let r=e.segment||Kr,n=e.defaultRoot||`/assets/${r}/`,o=t?.public&&t.public?.root||t?.static&&t.static?.root||null;if(!o||typeof o!="string")return De(n);let a=o.trim();return a?(a=a.replace(/\\/g,"/"),a=Go(a,r),a=De(a),Vo.test(a)?a:(a=Ko(a),a=Jo(a),a.startsWith("/")||(a=Yo(a),a.startsWith("/")||(a=`/${a}`),a=a.replace(/\/+/g,(i,s)=>s===0?i:"/")),De(a))):De(n)}function Jr(t){let e=t.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(e.toLowerCase()))return!0;let o=document.createElement("canvas").getContext("2d");if(!o)return!1;let a="mmmmmmmmmmlli",i="72px",s="monospace";o.font=`${i} ${s}`;let d=o.measureText(a).width;o.font=`${i} "${e}", ${s}`;let l=o.measureText(a).width;return d!==l}function Xo(t){return t?t.split(",").map(n=>n.trim())[0].replace(/['"]/g,"").trim():null}async function Yr(t,e={}){if(!t)return Promise.resolve();let{weights:r=[400,500,600,700],italic:n=!1}=e,o=Xo(t);if(!o||Jr(o))return Promise.resolve();let a=encodeURIComponent(o);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${a}"]`)?(w.log("log",`Font "${o}" is already loading or loaded`),Promise.resolve()):(w.log("log",`Loading font "${o}" from Google Fonts...`),new Promise((s,d)=>{let l=document.createElement("link");l.rel="stylesheet";let p=n?`ital,wght@0,${r.join(";0,")};1,${r.join(";1,")}`:`wght@${r.join(";")}`;l.href=`https://fonts.googleapis.com/css2?family=${a}:${p}&display=swap`,l.setAttribute("data-font-loader",o),l.onload=()=>{w.log("log",`Successfully loaded font "${o}"`),s()},l.onerror=()=>{w.log("warn",`Failed to load font "${o}" from Google Fonts`),d(new Error(`Failed to load font: ${o}`))},document.head.appendChild(l),setTimeout(()=>{Jr(o)||w.log("warn",`Font "${o}" did not load within timeout`),s()},5e3)}))}async function Yt(t){if(!t)return Promise.resolve();let e=new Set;t.fontFamilyHeadings&&e.add(t.fontFamilyHeadings),t.fontFamilyBody&&e.add(t.fontFamilyBody),t.fontFamilyMono&&e.add(t.fontFamilyMono);let r=Array.from(e).map(n=>Yr(n).catch(o=>{w.log("warn",`Could not load font: ${n}`,o)}));await Promise.all(r)}async function Zo(...t){let e={};t.length&&typeof t[t.length-1]=="object"&&(e=t.pop()||{});let r=t,{baseURL:n,mapper:o=l=>`${l}.js`,onError:a=(l,p)=>console.error(`[defineWebComponents] ${l}:`,p)}=e,i=n?new URL(n,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),s=l=>l.toLowerCase().replace(/(^|-)([a-z])/g,(p,c,u)=>u.toUpperCase()),d=async l=>{try{if(customElements.get(l))return{tag:l,status:"already-defined"};let p=o(l),u=await import(p instanceof URL?p.href:new URL(p,i).href),y=u?.default??u?.[s(l)];if(!y){if(customElements.get(l))return{tag:l,status:"self-defined"};throw new Error(`No export found for ${l}. Expected default export or named export "${s(l)}".`)}return customElements.get(l)?{tag:l,status:"race-already-defined"}:(customElements.define(l,y),{tag:l,status:"defined"})}catch(p){throw a(l,p),p}};return Promise.all(r.map(d))}var nt=class{constructor(e={}){let{baseURL:r,mapper:n,onError:o,predicate:a=()=>!0,attributeModule:i="data-module",root:s=document,scanExisting:d=!0,debounceMs:l=16,observeShadows:p=!0,enhancers:c=[],patchAttachShadow:u=!0}=e,y=new Set,g=new Set,x=new Set,b=new Map,f=new WeakMap,h=new WeakMap,v=0,m=!1,S=null,C=L=>{if(!L||!c.length)return;let A=h.get(L);A||(A=new Set,h.set(L,A));for(let R of c)if(!(!R.selector||!R.run)&&!A.has(R.selector))try{L.matches&&L.matches(R.selector)&&(R.run(L),A.add(R.selector))}catch(O){console.warn(`[AutoDefiner] Error applying enhancer for selector "${R.selector}":`,O)}},T=(L,A)=>{if(!m&&!(!L||!L.includes("-"))&&!customElements.get(L)&&!g.has(L)&&!x.has(L)){if(A&&A.getAttribute){let R=A.getAttribute(i);R&&!b.has(L)&&b.set(L,R)}y.add(L),I()}},I=()=>{v||(v=setTimeout(P,l))},z=L=>{if(L){if(L.nodeType===1){let A=L,R=A.tagName?.toLowerCase();R&&R.includes("-")&&!customElements.get(R)&&a(R,A)&&T(R,A),C(A),p&&A.shadowRoot&&E(A.shadowRoot)}L.querySelectorAll&&L.querySelectorAll("*").forEach(A=>{let R=A.tagName?.toLowerCase();R&&R.includes("-")&&!customElements.get(R)&&a(R,A)&&T(R,A),C(A),p&&A.shadowRoot&&E(A.shadowRoot)})}},E=L=>{if(!L||f.has(L))return;z(L);let A=new MutationObserver(R=>{for(let O of R)O.addedNodes?.forEach(B=>{z(B)}),O.type==="attributes"&&O.target&&z(O.target)});A.observe(L,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...c.map(R=>R.selector).filter(R=>R.startsWith("data-"))]}),f.set(L,A)};async function P(){if(clearTimeout(v),v=0,!y.size)return;let L=Array.from(y);y.clear(),L.forEach(A=>g.add(A));try{let A=R=>b.get(R)??(n?n(R):`${R}.js`);await Zo(...L,{baseURL:r,mapper:A,onError:(R,O)=>{x.add(R),o?.(R,O)}})}catch{}finally{L.forEach(A=>g.delete(A))}}let M=s===document?document.documentElement:s,k=new MutationObserver(L=>{for(let A of L)A.addedNodes?.forEach(R=>{z(R)}),A.type==="attributes"&&A.target&&z(A.target)});if(k.observe(M,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...c.map(L=>L.selector).filter(L=>L.startsWith("data-"))]}),p&&u&&Element.prototype.attachShadow){let L=Element.prototype.attachShadow;Element.prototype.attachShadow=function(R){let O=L.call(this,R);if(R&&R.mode==="open"){E(O);let B=this.tagName?.toLowerCase();B&&B.includes("-")&&!customElements.get(B)&&T(B,this)}return O},S=()=>Element.prototype.attachShadow=L}return d&&z(M),{stop(){m=!0,k.disconnect(),S&&S(),v&&(clearTimeout(v),v=0),f.forEach(L=>L.disconnect())},flush:P}}static async define(...e){let r={};e.length&&typeof e[e.length-1]=="object"&&(r=e.pop()||{});let n=e,{baseURL:o,mapper:a=p=>`${p}.js`,onError:i=(p,c)=>console.error(`[defineWebComponents] ${p}:`,c)}=r,s=o?new URL(o,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),d=p=>p.toLowerCase().replace(/(^|-)([a-z])/g,(c,u,y)=>y.toUpperCase()),l=async p=>{try{if(customElements.get(p))return{tag:p,status:"already-defined"};let c=a(p),y=await import(c instanceof URL?c.href:new URL(c,s).href),g=y?.default??y?.[d(p)];if(!g){if(customElements.get(p))return{tag:p,status:"self-defined"};throw new Error(`No export found for ${p}. Expected default export or named export "${d(p)}".`)}return customElements.get(p)?{tag:p,status:"race-already-defined"}:(customElements.define(p,g),{tag:p,status:"defined"})}catch(c){throw i(p,c),c}};return Promise.all(n.map(l))}};var Qo=/^[a-z][a-z0-9+\-.]*:\/\//i,He=(()=>{try{return import.meta.url}catch{return}})(),Se=t=>typeof t=="string"&&t.length&&!t.endsWith("/")?`${t}/`:t;function $e(t,e={}){if(!t||Qo.test(t))return t;let{preferModule:r=!0}=e,n=()=>{if(!He)return null;try{return new URL(t,He).href}catch{return null}},o=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(t,window.location.origin).href}catch{return null}};return(r?n()||o():o()||n())||t}var Xr=(()=>{if(He)try{let t=new URL(He);if(/\/public\/assets\/js\//.test(t.pathname))return new URL("../pds/",He).href}catch{return}})(),Zr=!1;function at(t){Zr||typeof document>"u"||(Zr=!0,t.addEventListener("pds:ready",e=>{let r=e.detail?.mode;r&&document.documentElement.classList.add(`pds-${r}`,"pds-ready")}))}function Zt(t={},e={}){if(!e||typeof e!="object")return t;let r=Array.isArray(t)?[...t]:{...t};for(let[n,o]of Object.entries(e))o&&typeof o=="object"&&!Array.isArray(o)?r[n]=Zt(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o;return r}function Xt(t=""){return String(t).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ue(t){if(t==null)return t;if(typeof t=="function")return;if(typeof t!="object")return t;if(Array.isArray(t))return t.map(r=>ue(r)).filter(r=>r!==void 0);let e={};for(let r in t)if(t.hasOwnProperty(r)){let n=t[r];if(typeof n!="function"){let o=ue(n);o!==void 0&&(e[r]=o)}}return e}function ot(t){let e=ue(t);return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function Qt(t={},e={},{presets:r,defaultLog:n,validateDesignConfig:o,validateInitConfig:a}={}){let i=t&&typeof t.log=="function"?t.log:n,s=typeof t=="object"&&("colors"in t||"typography"in t||"spatialRhythm"in t||"shape"in t||"behavior"in t||"layout"in t||"advanced"in t||"a11y"in t||"components"in t||"icons"in t),d=t&&t.enhancers;d&&!Array.isArray(d)&&(d=Object.values(d));let l=d??e.enhancers??[],p=t&&t.preset,c=t&&t.design,u=t&&t.icons&&typeof t.icons=="object"?t.icons:null,y="preset"in(t||{})||"design"in(t||{})||"enhancers"in(t||{});t&&typeof t=="object"&&typeof a=="function"&&a(t,{log:i,context:"PDS.start"});let g,x=null;if(y){c&&typeof c=="object"&&typeof o=="function"&&o(c,{log:i,context:"PDS.start"});let b=String(p||"default").toLowerCase(),f=r?.[b]||Object.values(r||{}).find(B=>Xt(B.name)===b||String(B.name||"").toLowerCase()===b);if(!f)throw new Error(`PDS preset not found: "${p||"default"}"`);x={id:f.id||Xt(f.name),name:f.name||f.id||String(b)};let h=ot(f);if(c&&typeof c=="object"||u){let B=c?ue(c):{},K=u?ue(u):null,N=K?Zt(B,{icons:K}):B;h=Zt(h,ot(N))}let{mode:v,autoDefine:m,applyGlobalStyles:S,manageTheme:C,themeStorageKey:T,preloadStyles:I,criticalLayers:z,managerURL:E,manager:P,localization:M,preset:k,design:L,enhancers:A,log:R,...O}=t;g={...O,design:h,preset:x.name,log:R||n}}else if(s){typeof o=="function"&&o(t,{log:i,context:"PDS.start"});let{log:b,...f}=t;g={design:ot(f),log:b||n}}else{let b=r?.default||Object.values(r||{}).find(f=>Xt(f.name)==="default");if(!b)throw new Error("PDS default preset not available");x={id:b.id||"default",name:b.name||"Default"},g={design:ot(b),preset:x.name,log:n}}return{generatorConfig:g,enhancers:l,presetInfo:x}}function it({manageTheme:t,themeStorageKey:e,applyResolvedTheme:r,setupSystemListenerIfNeeded:n}){let o="light",a=null;if(t&&typeof window<"u"){try{a=localStorage.getItem(e)||null}catch{a=null}try{r?.(a),n?.(a)}catch{}a?a==="system"?o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":o=a:o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:o,storedTheme:a}}function Le(t,{resolvePublicAssetURL:e}){let r=!!(t?.public?.root||t?.static?.root),n=e(t);return!r&&Xr&&(n=Xr),Se($e(n))}async function st(t,{baseEnhancers:e=[]}={}){let{autoDefineBaseURL:r="/auto-define/",autoDefinePreload:n=[],autoDefineMapper:o=null,enhancers:a=[],autoDefineOverrides:i=null,autoDefinePreferModule:s=!0}=t,d=(()=>{let p=new Map;return(e||[]).forEach(c=>p.set(c.selector,c)),(a||[]).forEach(c=>p.set(c.selector,c)),Array.from(p.values())})(),l=null;if(typeof window<"u"&&typeof document<"u"){let p=nt,c=v=>{switch(v){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${v}.js`}},{mapper:u,enhancers:y,...g}=i&&typeof i=="object"?i:{},x=y?Array.isArray(y)?y:typeof y=="object"?Object.values(y):[]:[],b=(()=>{let v=new Map;return(d||[]).forEach(m=>{m?.selector&&v.set(m.selector,m)}),(x||[]).forEach(m=>{if(!m?.selector)return;let S=v.get(m.selector)||null;v.set(m.selector,{...S||{},...m,run:typeof m?.run=="function"?m.run:S?.run})}),Array.from(v.values())})(),h={baseURL:r&&Se($e(r,{preferModule:s})),predefine:n,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:b,onError:(v,m)=>{if(typeof v=="string"&&v.startsWith("pds-")){let C=["pds-form","pds-drawer"].includes(v),T=m?.message?.includes("#pds/lit")||m?.message?.includes("Failed to resolve module specifier");C&&T?w.log("error",`\u274C PDS component <${v}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`):w.log("warn",`\u26A0\uFE0F PDS component <${v}> not found. Assets may not be installed.`)}else w.log("error",`\u274C Auto-define error for <${v}>:`,m)},...g,mapper:v=>{if(customElements.get(v))return null;if(typeof o=="function")try{let m=o(v);return m===void 0?c(v):m}catch(m){return w.log("warn","Custom autoDefine.mapper error; falling back to default:",m?.message||m),c(v)}return c(v)}};l=new p(h),n.length>0&&typeof p.define=="function"&&await p.define(...n,{baseURL:r,mapper:h.mapper,onError:h.onError})}return{autoDefiner:l,mergedEnhancers:d}}var er=["light","dark"],tr=new Set(er);function rr(t){let r=(Array.isArray(t?.themes)?t.themes.map(n=>String(n).toLowerCase()):er).filter(n=>tr.has(n));return r.length?r:er}function ze(t,{preferDocument:e=!0}={}){let r=String(t||"").toLowerCase();if(tr.has(r))return r;if(e&&typeof document<"u"){let n=document.documentElement?.getAttribute("data-theme");if(tr.has(n))return n}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function ge(t,e){let r=ze(e);return rr(t).includes(r)}var en=!1,ut="pds-live-edit-toggle",sr="pds-live-edit-toggle-style";function tn(t,e=new WeakSet){if(!t||typeof t!="object"||e.has(t))return t;e.add(t),Object.freeze(t);for(let r of Object.keys(t))tn(t[r],e);return t}function gt(t){let e=ue(t);return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function rn(t){return t==null||typeof t!="object"?t:tn(gt(t))}function nn(t){if(typeof document>"u"||typeof t!="function")return;if(document.body){t();return}let e=()=>{document.body&&(document.removeEventListener("DOMContentLoaded",e),t())};document.addEventListener("DOMContentLoaded",e,{once:!0})}function ea(t={}){let e=t?.interactive!==!1;typeof document>"u"||nn(()=>{if(document.querySelector("pds-live-edit")){if(!e){let r=document.querySelector("pds-live-edit");r&&r.setAttribute("data-pds-live-settings-only","true")}}else{let r=document.createElement("pds-live-edit");e||r.setAttribute("data-pds-live-settings-only","true"),document.body.appendChild(r)}})}function pt(t=0){return new Promise(e=>{setTimeout(e,Math.max(0,Number(t)||0))})}async function We(t={}){let e=t?.mountIfMissing!==!1,r=t?.interactive!==!1,n=typeof t?.requiredMethod=="string"&&t.requiredMethod.trim()?t.requiredMethod.trim():"openDesignSettings",o=Number.isFinite(Number(t?.timeoutMs))?Number(t.timeoutMs):2400;if(typeof document>"u"||!e&&!document.querySelector("pds-live-edit"))return null;e&&ea({interactive:r});let a=Date.now();for(;Date.now()-a<o;){let s=document.querySelector("pds-live-edit");if(!s){await pt(40);continue}if(typeof s?.[n]=="function")return s;if(typeof customElements<"u"&&typeof customElements.whenDefined=="function"){try{await Promise.race([customElements.whenDefined("pds-live-edit"),pt(80)])}catch{await pt(40)}continue}await pt(40)}let i=document.querySelector("pds-live-edit");return i&&typeof i?.[n]=="function"?i:null}function on(){if(typeof document>"u")return;document.querySelectorAll("pds-live-edit").forEach(e=>{typeof e?.setInteractiveEditingEnabled=="function"&&e.setInteractiveEditingEnabled(!1),e.remove()})}function ta(t){return t?typeof t.isInteractiveEditingEnabled=="function"?!!t.isInteractiveEditingEnabled():!0:!1}function ra(){if(typeof document>"u"||document.getElementById(sr))return;let t=document.createElement("style");t.id=sr,t.textContent=`
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
  `,document.head.appendChild(t)}function ir(t,e){if(!t)return;t.classList.toggle("btn-primary",e),t.classList.toggle("btn-secondary",!e),t.setAttribute("aria-pressed",e?"true":"false");let r="PDS Manager";t.setAttribute("aria-label",r),t.setAttribute("title",r)}async function na(){if(typeof document>"u")return null;ra();let t=document.getElementById(ut);if(!t){let e=document.createElement("nav");e.className="pds-live-edit-toggle-nav",e.setAttribute("data-dropdown",""),e.setAttribute("data-mode","auto"),e.setAttribute("data-pds-live-edit-ignore","true"),t=document.createElement("button"),t.id=ut,t.type="button",t.className="icon-only btn-secondary",t.setAttribute("data-pds-live-edit-ignore","true"),t.innerHTML='<pds-icon icon="cursor-click" size="sm"></pds-icon>';let r=document.createElement("menu");r.setAttribute("data-pds-live-edit-ignore","true");let n=(i,s,d)=>{let l=document.createElement("li"),p=document.createElement("a");p.href="#",p.dataset.pdsLiveAction=i,p.setAttribute("data-pds-live-edit-ignore","true");let c=document.createElement("pds-icon");return c.setAttribute("icon",d),c.setAttribute("size","sm"),p.append(c,document.createTextNode(` ${s}`)),l.appendChild(p),l},o=()=>{let i=document.createElement("li");i.setAttribute("data-pds-live-edit-ignore","true");let s=document.createElement("hr");return s.setAttribute("aria-hidden","true"),i.appendChild(s),i};r.appendChild(n("toggle",se("Toggle live editing"),"pencil"));let a=n("open-settings",se("Open Settings"),"gear");a.setAttribute("data-dropdown-close",""),r.appendChild(a),r.appendChild(n("reset-config",se("Reset Config"),"arrow-counter-clockwise")),await oa(r),e.append(t,r),nn(()=>{document.getElementById(ut)||document.body.appendChild(e)})}return t}async function oa(t){if(t instanceof Element){if(t.__pdsLiveSharedMenuItemInFlight)return t.__pdsLiveSharedMenuItemInFlight;t.__pdsLiveSharedMenuItemInFlight=(async()=>{t.querySelectorAll("li.pds-live-shared-quick-mode-item").forEach(s=>s.remove());let e=await We({mountIfMissing:!0,interactive:!1,requiredMethod:"createSharedQuickModeMenuItem",timeoutMs:7e3});if(!e||typeof e.createSharedQuickModeMenuItem!="function")return;let r=await e.createSharedQuickModeMenuItem();if(!(r instanceof Element))return;r.classList.add("pds-live-shared-quick-mode-item");let o=t.querySelector('a[data-pds-live-action="reset-config"]')?.closest("li")||null,a=o?.previousElementSibling||null,i=a&&a.querySelector?.(":scope > hr")?a:null;if(i){t.insertBefore(r,i);return}if(o){t.insertBefore(r,o);return}t.appendChild(r)})();try{await t.__pdsLiveSharedMenuItemInFlight}finally{t.__pdsLiveSharedMenuItemInFlight=null}}}function aa(){if(typeof document>"u")return;let t=document.getElementById(ut);if(t){let r=t.closest(".pds-live-edit-toggle-nav");r?r.remove():t.remove()}let e=document.getElementById(sr);e&&e.remove(),on()}async function ia(){if(typeof document>"u")return;let t=await na();if(!t)return;let e=async i=>{if(i){let s=await We({mountIfMissing:!0});s&&typeof s.setInteractiveEditingEnabled=="function"&&s.setInteractiveEditingEnabled(!0)}else on();ir(t,i)};e(!1);let r=t.closest(".pds-live-edit-toggle-nav")||t;t.__pdsLiveEditActionHandler&&r.removeEventListener("click",t.__pdsLiveEditActionHandler);let n=async i=>{let s=i.target?.closest?.("[data-pds-live-action]");if(!s)return;i.preventDefault();let d=String(s.dataset.pdsLiveAction||"");if(d==="toggle"){let l=await We({mountIfMissing:!1}),p=ta(l);await e(!p);return}if(d==="open-settings"){let l=await We({mountIfMissing:!0,requiredMethod:"openDesignSettings",interactive:!1});l&&typeof l.setInteractiveEditingEnabled=="function"&&l.setInteractiveEditingEnabled(!1),l&&typeof l.openDesignSettings=="function"&&(ir(t,!1),await l.openDesignSettings());return}if(d==="reset-config"){let l=await We({mountIfMissing:!0,requiredMethod:"resetConfig",interactive:!1});ir(t,!1),l&&typeof l.resetConfig=="function"&&await l.resetConfig();return}};t.__pdsLiveEditActionHandler=n,r.addEventListener("click",n),t.__pdsLiveEditDisableHandler&&document.removeEventListener("pds:live-edit:disable",t.__pdsLiveEditDisableHandler),t.__pdsLiveEditEnableHandler&&document.removeEventListener("pds:live-edit:enable",t.__pdsLiveEditEnableHandler);let o=()=>{e(!1)},a=()=>{e(!0)};t.__pdsLiveEditDisableHandler=o,document.addEventListener("pds:live-edit:disable",o),t.__pdsLiveEditEnableHandler=a,document.addEventListener("pds:live-edit:enable",a)}function sa(){if(typeof window>"u"||!window.localStorage)return null;try{let t=window.localStorage.getItem("pure-ds-config");if(!t)return null;let e=JSON.parse(t);if(e&&("preset"in e||"design"in e))return e}catch{return null}return null}function lr(t={},e={}){if(!e||typeof e!="object")return t;let r=Array.isArray(t)?[...t]:{...t};for(let[n,o]of Object.entries(e))o&&typeof o=="object"&&!Array.isArray(o)?r[n]=lr(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o;return r}function la(t){let e=sa();if(!e||!t||typeof t!="object")return t;let r=e.preset,n=e.design&&typeof e.design=="object"?e.design:null;if(!r&&!n)return t;let o="preset"in t||"design"in t||"enhancers"in t,a={...t};if(r&&(a.preset=r),n)if(o){let i=t.design&&typeof t.design=="object"?t.design:{};a.design=lr(i,n)}else a=lr(t,n);return a}function ca(t,e={}){let{hideCategory:r=!0,itemGrid:n="45px 1fr",includeIncompatible:o=!0,disableIncompatible:a=!0,categoryName:i="Presets",theme:s,onSelect:d,iconHandler:l}=e||{},p=ze(s??t?.theme),c=g=>{let b=y(g?.id)?.colors||{},f=b?.primary,h=b?.secondary,v=b?.accent;return f&&h&&v?`<span style="display:flex;gap:1px;flex-shrink:0;" aria-hidden="true">
        <span style="display:inline-block;width:10px;height:20px;background-color:${f};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${h};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${v};">&nbsp;</span>
      </span>`:g?.icon?`<pds-icon icon="${g.icon}" size="sm"></pds-icon>`:""},u=()=>{let g=t?.presets||{};return Object.values(g||{}).filter(x=>!!(x?.id||x?.name))},y=g=>g&&u().find(b=>String(b?.id||b?.name)===String(g))||null;return{hideCategory:r,itemGrid:n,iconHandler:typeof l=="function"?l:c,categories:{[i]:{trigger:()=>!0,getItems:(g={})=>{let x=String(g?.search||"").toLowerCase().trim();return u().filter(f=>{let h=String(f?.name||f?.id||"").toLowerCase(),v=String(f?.description||"").toLowerCase(),m=Array.isArray(f?.tags)?f.tags.map(C=>String(C).toLowerCase()):[];if(x&&!(h.includes(x)||v.includes(x)||m.some(T=>T.includes(x))))return!1;let S=ge(f,p);return!(!o&&!S)}).map(f=>{let h=f?.id||f?.name,v=ge(f,p),m=rr(f),S=m.length===1?`${m[0]} only`:`Not available in ${p} mode`,C=String(f?.description||"").trim(),T=v?C:C?`${C} - ${S}`:S;return{id:h,text:f?.name||String(h),description:T,icon:"palette",class:!v&&a?"disabled":"",disabled:!v&&a,tooltip:v?"":S}}).sort((f,h)=>String(f.text||"").localeCompare(String(h.text||"")))},action:async g=>{if(!g?.id||g?.disabled)return g?.id;let x=y(g.id);return x?typeof d=="function"?await d({preset:x,selection:g,resolvedTheme:p}):(typeof t?.applyLivePreset=="function"&&await t.applyLivePreset(x.id||g.id),x.id||g.id):g?.id}}}}}async function da(t,{applyResolvedTheme:e,setupSystemListenerIfNeeded:r,emitConfigChanged:n}){if(en)return;let[o,a,i]=await Promise.all([Promise.resolve().then(()=>(Dt(),Rr)),Promise.resolve().then(()=>(_e(),vr)),Promise.resolve().then(()=>(ar(),dt))]),s=o?.default||o?.ontology,d=o?.findComponentForElement,l=a?.enums;t.ontology=s,t.findComponentForElement=d,t.enums=l,t.common=i||{},t.presets=Q,t.configRelations=Lr,t.configSpec=zr,t.configEditorMetadata=Er,t.configFormSchema=Ar,t.buildConfigFormSchema=be,t.getConfigEditorMetadata=je,t.enhancerMetadata=Vr,(!Array.isArray(t.defaultEnhancers)||t.defaultEnhancers.length===0)&&(t.defaultEnhancers=Array.isArray(rt)?rt:[]),t.applyStyles=function(p){let c=p||Z.instance;Ur(c),typeof n=="function"&&n({mode:"live",source:"live:styles-applied"})},t.adoptLayers=function(p,c,u){return tt(p,c,u,Z.instance)},t.adoptPrimitives=function(p,c){return et(p,c,Z.instance)},t.getGenerator=async function(){return Z},t.buildPresetOmniboxSettings=function(p={}){return ca(t,p)},t.applyLivePreset=async function(p,c={}){if(!p)return!1;if(!t.registry?.isLive)return t.log("warn","PDS.applyLivePreset is only available in live mode."),!1;let u=t.currentConfig||{},{design:y,preset:g,...x}=u,b={...gt(x),preset:p},f=Qt(b,{},{presets:Q,defaultLog:Bt,validateDesignConfig:jt,validateInitConfig:Ot}),h=ze(t.theme);if(!ge(f.generatorConfig.design,h)){let C=f.presetInfo?.name||f.generatorConfig?.design?.name||p;t.log("warn",`PDS theme "${h}" not supported by preset "${C}".`)}u.theme&&!f.generatorConfig.theme&&(f.generatorConfig.theme=u.theme);let v=new Z(f.generatorConfig);if(f.generatorConfig.design?.typography)try{await Yt(f.generatorConfig.design.typography)}catch(C){f.generatorConfig?.log?.("warn","Failed to load some fonts from Google Fonts:",C)}t.applyStyles?.(v);let m=f.presetInfo||{id:p,name:p};if(t.currentPreset=m,t.compiled=rn({...u,preset:f.generatorConfig.preset,design:f.generatorConfig.design,theme:f.generatorConfig.theme||u.theme}),t.configEditorMetadata=je(f.generatorConfig.design),t.configFormSchema=be(f.generatorConfig.design),c?.persist!==!1&&typeof window<"u"){let C="pure-ds-config";try{let T=localStorage.getItem(C),I=T?JSON.parse(T):null,z={...I&&typeof I=="object"?I:{},preset:m.id||p,design:gt(f.generatorConfig.design||{})};localStorage.setItem(C,JSON.stringify(z))}catch(T){f.generatorConfig?.log?.("warn","Failed to store preset:",T)}}return!0},t.preloadCritical=function(p,c={}){if(typeof window>"u"||!document.head||!p)return;let{theme:u,layers:y=["tokens"]}=c;try{let g=u||"light";(u==="system"||!u)&&(g=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",g);let x=p.design?{...p,theme:g}:{design:p,theme:g},b=new Z(x),f=y.map(h=>{try{return b.css?.[h]||""}catch{return""}}).filter(h=>h.trim()).join(`
`);if(f){let h=document.head.querySelector("style[data-pds-preload]");h&&h.remove();let v=document.createElement("style");v.setAttribute("data-pds-preload",""),v.textContent=f,document.head.insertBefore(v,document.head.firstChild)}}catch(g){t.log("warn","PDS preload failed:",g)}},en=!0}async function pa(t,e,{emitReady:r,emitConfigChanged:n,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}){if(!e||typeof e!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");let i=e?.design?.icons?.externalPath||e?.icons?.externalPath||null;if(e=la(e),typeof i=="string"&&i.trim()){let y=e?.design&&typeof e.design=="object"?e.design:{},g=y?.icons&&typeof y.icons=="object"?y.icons:{};e={...e,design:{...y,icons:{...g,externalPath:i}}}}if(await da(t,{applyResolvedTheme:o,setupSystemListenerIfNeeded:a,emitConfigChanged:n}),at(t),typeof document<"u"&&document.adoptedStyleSheets){let y=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(x=>x._pdsFouc)){let x=new CSSStyleSheet;x.replaceSync(y),x._pdsFouc=!0,document.adoptedStyleSheets=[x,...document.adoptedStyleSheets]}}catch(g){if(t.log("warn","Constructable stylesheets not supported, using <style> tag fallback:",g),!document.head.querySelector("style[data-pds-fouc]")){let b=document.createElement("style");b.setAttribute("data-pds-fouc",""),b.textContent=y,document.head.insertBefore(b,document.head.firstChild)}}}let s=e.applyGlobalStyles??!0,d=e.manageTheme??!0,l=e.themeStorageKey??"pure-ds-theme",p=e.preloadStyles??!1,c=e.criticalLayers??["tokens","primitives"],u=e&&e.autoDefine||null;try{let{resolvedTheme:y}=it({manageTheme:d,themeStorageKey:l,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}),g=Qt(e,{},{presets:Q,defaultLog:Bt,validateDesignConfig:jt,validateInitConfig:Ot});if(d&&!ge(g.generatorConfig.design,y)){let z=g.presetInfo?.name||g.generatorConfig?.design?.name||g.generatorConfig?.preset||"current preset";t.log("warn",`PDS theme "${y}" not supported by preset "${z}".`)}let x=g.enhancers,{log:b,...f}=g.generatorConfig,h=gt(f);h.log=b,d&&(h.theme=y);let v=new Z(h);if(h.design?.typography)try{await Yt(h.design.typography)}catch(z){h?.log?.("warn","Failed to load some fonts from Google Fonts:",z)}if(p&&typeof window<"u"&&document.head)try{let z=c.map(E=>{try{return v.css?.[E]||""}catch(P){return h?.log?.("warn",`Failed to generate critical CSS for layer "${E}":`,P),""}}).filter(E=>E.trim()).join(`
`);if(z){let E=document.head.querySelector("style[data-pds-critical]");E&&E.remove();let P=document.createElement("style");P.setAttribute("data-pds-critical",""),P.textContent=z;let M=document.head.querySelector('meta[charset], meta[name="viewport"]');M?M.parentNode.insertBefore(P,M.nextSibling):document.head.insertBefore(P,document.head.firstChild)}}catch(z){h?.log?.("warn","Failed to preload critical styles:",z)}t.registry.setLiveMode(),g.presetInfo?.name?h?.log?.("log",`PDS live with preset "${g.presetInfo.name}"`):h?.log?.("log","PDS live with custom config"),s&&(t.applyStyles?.(Z.instance),typeof window<"u"&&setTimeout(()=>{let z=document.head.querySelector("style[data-pds-critical]");z&&z.remove();let E=document.head.querySelector("style[data-pds-preload]");E&&E.remove();let P=document.getElementById("pds-runtime-stylesheet");P&&P.remove()},100));let m=Le(e,{resolvePublicAssetURL:ke}),S;u&&u.baseURL?S=Se($e(u.baseURL,{preferModule:!1})):S=`${m}components/`;let C=null,T=[];try{let z=await st({autoDefineBaseURL:S,autoDefinePreload:u&&Array.isArray(u.predefine)&&u.predefine||[],autoDefineMapper:u&&typeof u.mapper=="function"&&u.mapper||null,enhancers:x,autoDefineOverrides:u||null,autoDefinePreferModule:!(u&&u.baseURL)},{baseEnhancers:rt});C=z.autoDefiner,T=z.mergedEnhancers||[]}catch(z){h?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",z)}let I=v?.options||h;if(t.compiled=rn({mode:"live",...I,theme:y,enhancers:T}),t.configEditorMetadata=je(g.generatorConfig.design),t.configFormSchema=be(g.generatorConfig.design),typeof n=="function"&&n({mode:"live",source:"live:config-applied",preset:g.generatorConfig.preset}),typeof document<"u")try{e?.liveEdit?setTimeout(()=>{ia()},0):aa()}catch(z){h?.log?.("warn","Live editor toggle failed to start:",z)}return r({mode:"live",generator:v,config:I,theme:y,autoDefiner:C}),{generator:v,config:I,theme:y,autoDefiner:C}}catch(y){throw t.dispatchEvent(new CustomEvent("pds:error",{detail:{error:y}})),y}}function ua(t){let e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):.5}function ga(t){return Array.isArray(t)?t.map(e=>e?{severity:String(e.severity||"info").toLowerCase(),message:String(e.message||""),path:e.path?String(e.path):""}:null).filter(e=>e&&e.message):[]}function H(t={}){let e=String(t.source||"unknown"),r=String(t.type||"generic"),n=ua(t.confidence),o=ga(t.issues),a=t.designPatch&&typeof t.designPatch=="object"?t.designPatch:{},i=t.template&&typeof t.template=="object"?t.template:null;return{source:e,type:r,confidence:n,issues:o,designPatch:a,template:i,meta:t.meta&&typeof t.meta=="object"?t.meta:{}}}function fa(t){return!!(t&&typeof t=="object"&&"source"in t&&"type"in t&&"confidence"in t&&"issues"in t&&"designPatch"in t)}var ma="../templates/templates.json",an="/assets/pds/templates/templates.json",ha=["public","assets","pds","templates","templates.json"],ba=["..","..","..","public","assets","pds","templates","templates.json"],ft=null;function sn(){return!!(typeof process<"u"&&process?.versions?.node)}function ya(t={}){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"Template").trim(),description:String(t.description||"").trim(),icon:String(t.icon||"layout").trim(),file:String(t.file||"").trim(),tags:Array.isArray(t.tags)?t.tags.map(e=>String(e)):[]}}function mt(t={},e={}){let n=(Array.isArray(t)?t:Array.isArray(t?.templates)?t.templates:[]).map(ya).filter(o=>o.id&&o.file);return{version:t?.version||"1",templates:n,__catalogURL:e.catalogURL||null,__catalogFilePath:e.catalogFilePath||null}}async function va(t={}){let r=[t.catalogURL||globalThis?.PDS?.currentConfig?.templateCatalogURL,ma,an].filter(Boolean);for(let n of r)try{let o=new URL(n,import.meta.url).href,a=await fetch(o,{credentials:"same-origin"});if(!a.ok)continue;let i=await a.json();return mt(i,{catalogURL:o})}catch{}return mt({templates:[]})}async function xa(t={}){let e="node:fs/promises",r="node:path",n="node:url",[{readFile:o},a,{fileURLToPath:i}]=await Promise.all([import(e),import(r),import(n)]),s=[];t.catalogPath&&s.push(a.resolve(t.catalogPath)),s.push(a.resolve(process.cwd(),...ha));let d=a.dirname(i(import.meta.url));s.push(a.resolve(d,...ba));for(let l of s)try{let p=await o(l,"utf8"),c=JSON.parse(p);return mt(c,{catalogFilePath:l})}catch{}return mt({templates:[]})}async function wa(t,e){if(!t?.file)return"";if(!sn()){let d=e?.__catalogURL||an,l=new URL(t.file,d).href,p=await fetch(l,{credentials:"same-origin"});if(!p.ok)throw new Error(`Template file not found: ${t.file}`);return(await p.text()).trim()}let r="node:fs/promises",n="node:path",[{readFile:o},a]=await Promise.all([import(r),import(n)]),i=e?.__catalogFilePath?a.dirname(e.__catalogFilePath):a.resolve(process.cwd(),"public","assets","pds","templates"),s=a.resolve(i,t.file);return(await o(s,"utf8")).trim()}async function ht(t={}){return ft&&!t.forceReload||(ft=sn()?await xa(t):await va(t)),ft}async function ln(t={}){return(await ht(t)).templates.map(({id:r,name:n,description:o,icon:a,file:i,tags:s})=>({id:r,name:n,description:o,icon:a,file:i,tags:s}))}async function ka(t,e={}){let r=await ht(e),n=r.templates.find(a=>a.id===t)||null;if(!n)return null;let o=await wa(n,r);return{...n,html:o}}async function cn(t,e={}){let r=await ka(t,e);return r?H({source:"template",type:"template",confidence:1,template:{id:r.id,name:r.name,html:r.html,icon:r.icon,description:r.description}}):H({source:"template",type:"template",confidence:0,issues:[{severity:"error",message:`Unknown template: ${t}`}]})}var dn={version:"tw2pds-layout-v4",summary:"Deterministic Tailwind\u2192PDS conversion rules focused on layout intent, semantic primitive mapping, and richer import-* fallback coverage.",governance:[{id:"layout.utilities.grid",controls:["grid","grid-cols-*","grid-auto-*"],note:"When false, grid mappings are skipped."},{id:"layout.utilities.flex",controls:["flex","flex-*","items-*","justify-*","grow"],note:"When false, flex mappings are skipped."},{id:"layout.utilities.spacing",controls:["gap-*","stack-*"],note:"When false, spacing mappings are skipped."},{id:"layout.utilities.container",controls:["container","max-w-*"],note:"When false, container mappings are skipped."}],nonPdsClassPatterns:["^group(?:[/:].*)?$","^layout-container$"],neverFallbackTags:["table","thead","tbody","tfoot","tr","th","td","caption","colgroup","col"],directMappings:[{id:"layout.flex.base",tw:"flex",pds:["flex"],gate:"flex"},{id:"layout.flex.inline",tw:"inline-flex",pds:["flex"],gate:"flex"},{id:"layout.flex.row",tw:"flex-row",pds:["flex-row"],gate:"flex"},{id:"layout.flex.col",tw:"flex-col",pds:["flex-col"],gate:"flex"},{id:"layout.flex.wrap",tw:"flex-wrap",pds:["flex-wrap"],gate:"flex"},{id:"layout.flex.grow",tw:"grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow.tw",tw:"flex-grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow1",tw:"flex-1",pds:["grow"],gate:"flex"},{id:"layout.items.start",tw:"items-start",pds:["items-start"],gate:"flex"},{id:"layout.items.center",tw:"items-center",pds:["items-center"],gate:"flex"},{id:"layout.items.end",tw:"items-end",pds:["items-end"],gate:"flex"},{id:"layout.items.stretch",tw:"items-stretch",pds:["items-stretch"],gate:"flex"},{id:"layout.items.baseline",tw:"items-baseline",pds:["items-baseline"],gate:"flex"},{id:"layout.justify.start",tw:"justify-start",pds:["justify-start"],gate:"flex"},{id:"layout.justify.center",tw:"justify-center",pds:["justify-center"],gate:"flex"},{id:"layout.justify.end",tw:"justify-end",pds:["justify-end"],gate:"flex"},{id:"layout.justify.between",tw:"justify-between",pds:["justify-between"],gate:"flex"},{id:"layout.justify.around",tw:"justify-around",pds:["justify-around"],gate:"flex"},{id:"layout.justify.evenly",tw:"justify-evenly",pds:["justify-evenly"],gate:"flex"},{id:"layout.grid.base",tw:"grid",pds:["grid"],gate:"grid"},{id:"layout.grid.cols.1",tw:"grid-cols-1",pds:["grid-cols-1"],gate:"grid"},{id:"layout.grid.cols.2",tw:"grid-cols-2",pds:["grid-cols-2"],gate:"grid"},{id:"layout.grid.cols.3",tw:"grid-cols-3",pds:["grid-cols-3"],gate:"grid"},{id:"layout.grid.cols.4",tw:"grid-cols-4",pds:["grid-cols-4"],gate:"grid"},{id:"layout.grid.cols.6",tw:"grid-cols-6",pds:["grid-cols-6"],gate:"grid"},{id:"layout.container",tw:"container",pds:["container"],gate:"container"},{id:"intent.surface.shadow",tw:"shadow",pds:["surface-elevated"]},{id:"intent.surface.shadow-md",tw:"shadow-md",pds:["surface-elevated"]},{id:"intent.surface.shadow-lg",tw:"shadow-lg",pds:["surface-elevated"]},{id:"intent.surface.base",tw:"bg-white",pds:["surface-base"]},{id:"typography.align.center",tw:"text-center",pds:["text-center"]},{id:"typography.align.left",tw:"text-left",pds:["text-left"]},{id:"typography.align.right",tw:"text-right",pds:["text-right"]},{id:"typography.text.muted.gray500",tw:"text-gray-500",pds:["text-muted"]},{id:"typography.text.muted.slate500",tw:"text-slate-500",pds:["text-muted"]}],ignoredPatterns:[{id:"style.color",pattern:"^(?:text|from|to|via|decoration|accent|caret)-|^bg-(?!cover$|center$|no-repeat$)",reason:"Visual style token skipped in favor of semantic PDS styling."},{id:"style.radius-border-shadow",pattern:"^(?:rounded|ring|border|shadow|outline)-?",reason:"Surface/shape inferred at primitive level."},{id:"style.typography",pattern:"^(?:font|leading|tracking|uppercase|lowercase|capitalize)-?",reason:"Typography atomic utilities are skipped."},{id:"style.effects",pattern:"^(?:opacity|blur|backdrop|drop-shadow|mix-blend|filter)-",reason:"Visual effects skipped unless mapped to a PDS utility."},{id:"style.transitions",pattern:"^(?:transition|duration|ease|delay|animate)-",reason:"Motion is system-defined in PDS."},{id:"style.spacing.atomic",pattern:"^(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-",reason:"Atomic spacing skipped; structural spacing intent is mapped."},{id:"style.positioning.atomic",pattern:"^(?:absolute|relative|fixed|sticky|inset(?:-[xy])?|top|right|bottom|left|z|translate(?:-[xy])?|-translate-[xy])(?:-|$)",reason:"Atomic positioning/offset utilities are skipped so PDS primitives and layout utilities control placement."}],intentRules:[{id:"intent.layout.responsive-grid-to-auto",summary:"Collapse responsive grid-cols patterns (including base+md two-step patterns) to best-fit grid-auto-*"},{id:"intent.layout.mobile-stack",summary:"Map flex-col + md/lg:flex-row to mobile-stack"},{id:"intent.component.card",summary:"Infer card/surface classes from rounded+shadow+surface signals"},{id:"intent.component.card.normalize",summary:"Detect Tailwind card utility clusters and normalize them to PDS card and surface variants."},{id:"intent.component.button",summary:"Infer btn-primary / btn-outline / icon-only from CTA patterns"},{id:"intent.component.button.normalize",summary:"Prevents import-* style classes on button-like elements and applies PDS button variants/sizes."},{id:"intent.component.button.layout-grow",summary:"Preserve CTA row width intent on button-like elements by mapping w-full/flex-1 to grow."},{id:"intent.icon.color-preserve",summary:"Preserve icon color intent by mapping Tailwind text color utilities on icon-like elements to tokenized import-* classes."},{id:"intent.component.badge.normalize",summary:"Detects Tailwind badge/pill utility clusters and normalizes them to PDS badge primitives/variants."},{id:"intent.typography.heading-semantic",summary:"Removes Tailwind heading typography/color utilities so heading semantics and PDS defaults control typography."},{id:"intent.surface.footer-inverse",summary:"Use surface-inverse for footers with explicit background intent"},{id:"intent.typography.link-treatment",summary:"Apply minimal link treatment for hover/transition-tailwind anchors"},{id:"intent.typography.link-active-preserve",summary:"Preserve anchor text color intent (including active menu states) by mapping Tailwind text utilities to tokenized import-* classes."},{id:"intent.typography.metric-paragraph-to-div",summary:"Normalize metric display lines from paragraph tags to div tags to avoid default paragraph margins in compact stat layouts."},{id:"intent.typography.metric-pair-no-stack",summary:"When a compact metric container has two consecutive typography lines, remove stack-sm so spacing follows Tailwind preflight no-margin assumptions."},{id:"intent.typography.semantic-heading-from-scale",summary:"Map large bold typography scales (text-2xl/text-3xl/text-4xl) to semantic heading tags when possible."},{id:"intent.typography.bold-to-strong",summary:"Prefer semantic strong tags for bold inline text intent instead of utility-only font-weight classes."},{id:"intent.preflight.tailwind-runtime-detected",summary:"Detect Tailwind runtime CSS injection and translate key preflight intent"},{id:"intent.preflight.list-reset",summary:"Preserve Tailwind list-reset preflight behavior via scoped fallback class"},{id:"intent.preflight.anchor-reset",summary:"Preserve Tailwind anchor reset preflight behavior via scoped fallback class"},{id:"table.strict-tags.no-classes",summary:"Never emit classes for semantic table tags (table/thead/tbody/tfoot/tr/th/td/caption/colgroup/col)"},{id:"intent.form.nested-label",summary:"Convert sibling label+control pairs into nested labels"},{id:"fallback.import-style",summary:"Generate import-* classes + local style block for unmapped utility styles"}],gapScaleMap:{"gap-0":"gap-0","gap-1":"gap-xs","gap-2":"gap-sm","gap-3":"gap-sm","gap-4":"gap-md","gap-5":"gap-md","gap-6":"gap-lg","gap-7":"gap-lg","gap-8":"gap-xl","gap-10":"gap-xl","gap-12":"gap-xl"},maxWidthMap:{"max-w-xs":"max-w-sm","max-w-sm":"max-w-sm","max-w-md":"max-w-md","max-w-lg":"max-w-lg","max-w-xl":"max-w-xl","max-w-2xl":"max-w-xl","max-w-3xl":"max-w-xl","max-w-4xl":"max-w-xl","max-w-5xl":"max-w-xl","max-w-6xl":"max-w-xl","max-w-7xl":"max-w-xl"},tailwindSizeScale:{"0":"var(--spacing-0)","0.5":"0.125rem","1":"var(--spacing-1)","1.5":"0.375rem","2":"var(--spacing-2)","2.5":"0.625rem","3":"var(--spacing-3)","3.5":"0.875rem","4":"var(--spacing-4)","5":"var(--spacing-5)","6":"var(--spacing-6)","7":"var(--spacing-7)","8":"var(--spacing-8)","9":"var(--spacing-9)","10":"var(--spacing-10)","11":"var(--spacing-11)","12":"var(--spacing-12)","14":"3.5rem","16":"4rem","20":"5rem","24":"6rem","28":"7rem","32":"8rem","36":"9rem","40":"10rem","48":"12rem"},tailwindShadeScale:["50","100","200","300","400","500","600","700","800","900"],defaultTailwindShade:"500",importStyleRules:{"mx-auto":"margin-left:auto;margin-right:auto","ml-auto":"margin-left:auto","mr-auto":"margin-right:auto","w-full":"width:100%","w-auto":"width:auto","h-full":"height:100%","h-48":"height:12rem","h-2.5":"height:0.625rem","h-10":"height:var(--spacing-10)","h-2":"height:var(--spacing-2)","w-2":"width:var(--spacing-2)","size-8":"width:var(--spacing-8);height:var(--spacing-8)","size-10":"width:var(--spacing-10);height:var(--spacing-10)","size-full":"width:100%;height:100%","min-h-screen":"min-height:100vh","overflow-hidden":"overflow:hidden","overflow-x-hidden":"overflow-x:hidden","overflow-x-auto":"overflow-x:auto","whitespace-nowrap":"white-space:nowrap",hidden:"display:none",block:"display:block",truncate:"overflow:hidden;text-overflow:ellipsis;white-space:nowrap","justify-items-center":"justify-items:center","justify-items-start":"justify-items:start","justify-items-end":"justify-items:end","justify-items-stretch":"justify-items:stretch","grid-flow-col":"grid-auto-flow:column","aspect-square":"aspect-ratio:1 / 1","bg-center":"background-position:center","bg-cover":"background-size:cover","bg-no-repeat":"background-repeat:no-repeat","transition-colors":"transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms"},importStyleDynamicRules:[{id:"fallback.import-style.gap-scale",pattern:"^gap-(\\d+)$",summary:"Converts gap scale utilities (including responsive variants like md:gap-6) to generated import-* fallback classes."},{id:"fallback.import-style.min-width-arbitrary",pattern:"^min-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-width utilities (e.g. min-w-[600px]) to generated import-* fallback classes."},{id:"fallback.import-style.max-width-arbitrary",pattern:"^max-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary max-width utilities (e.g. max-w-[480px]) to generated import-* fallback classes."},{id:"fallback.import-style.min-height-arbitrary",pattern:"^min-h-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-height utilities (e.g. min-h-[180px]) to generated import-* fallback classes."},{id:"fallback.import-style.grid-rows-arbitrary",pattern:"^grid-rows-\\[[^\\]]+\\]$",summary:"Converts arbitrary grid template row utilities (e.g. grid-rows-[1fr_auto]) to generated import-* fallback classes."},{id:"fallback.import-style.size-scale",pattern:"^size-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts size scale/arbitrary utilities into width+height fallback declarations."},{id:"fallback.import-style.width-height-scale",pattern:"^[wh]-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts width/height scale and arbitrary utilities to import-* classes."},{id:"fallback.import-style.spacing",pattern:"^-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(.+)$",summary:"Converts spacing utilities to directional padding/margin fallback declarations, including responsive variants."},{id:"fallback.import-style.text-size",pattern:"^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$",summary:"Converts common text size utilities to import-* font-size declarations."},{id:"fallback.import-style.font-weight",pattern:"^font-(normal|medium|semibold|bold|extrabold|black)$",summary:"Converts common font weight utilities to import-* font-weight declarations."},{id:"fallback.import-style.leading-tracking",pattern:"^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|tighter|wide|wider|widest)$",summary:"Converts line-height and letter-spacing utilities to import-* declarations for typography fidelity."},{id:"fallback.import-style.bg-tokenized",pattern:"^bg-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind background color utilities by mapping families like blue/purple/green/red to PDS semantic tokens."},{id:"fallback.import-style.bg-semantic",pattern:"^bg-(primary|secondary|accent)$",summary:"Safeguards semantic background utilities by mapping bg-primary/bg-secondary/bg-accent to PDS color tokens."},{id:"fallback.import-style.text-tokenized",pattern:"^text-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind text color utilities by mapping common families to PDS semantic tokens."},{id:"fallback.import-style.rounded",pattern:"^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$",summary:"Safeguards rounded utilities (including rounded-t-sm) by mapping to PDS radius tokens."},{id:"fallback.import-style.overlay-alpha",pattern:"^bg-black\\/(\\d{1,3})$",summary:"Converts alpha black overlay classes (e.g. bg-black/50) to tokenized color-mix background overlays."},{id:"fallback.import-style.text-inverse",pattern:"^text-white$",summary:"Preserves white foreground intent for text-on-image use cases using inverse-compatible tokens."},{id:"fallback.import-style.bg-arbitrary",pattern:"^bg-\\[[^\\]]+\\]$",summary:"Converts arbitrary background colors to import-* fallback classes when values are CSS-safe."},{id:"fallback.import-style.text-arbitrary",pattern:"^text-\\[[^\\]]+\\]$",summary:"Converts arbitrary text colors to import-* fallback classes when values are CSS-safe."}]};_e();ar();typeof w.initializing!="boolean"&&(w.initializing=!1);"currentPreset"in w||(w.currentPreset=null);typeof w.debug!="boolean"&&(w.debug=!1);"currentConfig"in w||(w.currentConfig=null);"compiled"in w||(w.compiled=null);typeof w.logHandler!="function"&&(w.logHandler=null);"mode"in w||(w.mode=null);var bt=null,yt=null,vt=null,xt=null,wt=null,kt=null,un="__pdsLocalizationRuntime";function Ce(){if(kt)return kt;let t=w?.[un];return t&&typeof t=="object"?(kt=t,t):null}function $a(t){let e=t&&typeof t=="object"?t:null;kt=e,w[un]=e}Pr({getLogger:()=>typeof w.logHandler=="function"?w.logHandler:null,getContext:()=>{let t=w?.mode||w?.compiled?.mode||(w?.registry?.isLive?"live":"static"),e=(w?.debug||w?.currentConfig?.debug||w?.currentConfig?.design?.debug||w?.compiled?.debug||w?.compiled?.design?.debug||!1)===!0;return{mode:t,debug:e,thisArg:w}}});w.log=(t="log",e,...r)=>{Qe(t,e,...r)};var U={locale:"en",messages:{},hasProvider:!1},St=new Set;function gn(t){return!!t&&typeof t!="string"&&typeof t=="object"&&"strTag"in t}function fn(t=[]){let e="";for(let r=0;r<=t.length-1;r+=1)e+=t[r],r<t.length-1&&(e+=`{${r}}`);return e}function La(t,e){return String(t).replace(/\{(\d+)\}/g,(r,n)=>e(Number(n)))}function za(t){if(!t||typeof t!="object")return{};let e={};for(let[r,n]of Object.entries(t)){if(typeof n=="string"){e[r]=n;continue}n&&typeof n=="object"&&typeof n.content=="string"&&(e[r]=n.content)}return e}function Ca(t,...e){return{strTag:!0,strings:Array.from(t||[]),values:e,raw:Array.from(t?.raw||[])}}function Ma(t){if(!t)return"";if(gn(t)){let r=fn(t.strings||[]),n=U.messages[r]||r;return La(n,o=>t.values?.[o])}let e=String(t);return U.messages[e]||e}function Ea(t){if(!t)return;let e=gn(t)?fn(t.strings||[]):String(t);typeof e=="string"&&e.length>0&&St.add(e)}function mn(t){if(!t||typeof t.msg!="function"||St.size===0)return;let e=Array.from(St);St.clear();for(let r of e)try{t.msg(r)}catch{}}async function qe(){let t=Ce();return t||(wt||(wt=import(Ve("pds-localization.js")).then(r=>{if(typeof r?.msg!="function"||typeof r?.str!="function"||typeof r?.configureLocalization!="function"||typeof r?.loadLocale!="function"||typeof r?.setLocale!="function"||typeof r?.getLocalizationState!="function")throw new Error("Failed to load localization runtime exports");return $a(r),mn(r),r}).catch(r=>{throw wt=null,r})),wt)}var hn=(t,e={})=>{let r=Ce();return typeof r?.msg=="function"?r.msg(t,e):(Ea(t),Ma(t,e))},bn=(t,...e)=>{let r=Ce();return typeof r?.str=="function"?r.str(t,...e):Ca(t,...e)},$t=(t=null)=>{let e=Ce();if(typeof e?.configureLocalization=="function")return e.configureLocalization(t);if(!t||typeof t!="object")return U.locale="en",U.messages={},U.hasProvider=!1,{locale:U.locale,messages:{...U.messages},hasProvider:U.hasProvider};typeof t.locale=="string"&&t.locale.trim()&&(U.locale=t.locale.trim()),Object.prototype.hasOwnProperty.call(t,"messages")&&(U.messages=za(t.messages));let r=!!(t.provider||t.translate||t.loadLocale||t.setLocale);return U.hasProvider=r,r&&qe().then(n=>{n.configureLocalization(t),mn(n)}).catch(()=>{}),{locale:U.locale,messages:{...U.messages},hasProvider:U.hasProvider}},yn=async t=>(await qe()).loadLocale(t),vn=async(t,e={})=>(await qe()).setLocale(t,e),xn=()=>{let t=Ce();return typeof t?.getLocalizationState=="function"?t.getLocalizationState():{locale:U.locale,messages:{...U.messages},hasProvider:U.hasProvider}},wn=(t={})=>{let e=Ce();if(typeof e?.createJSONLocalization=="function")return e.createJSONLocalization(t);let r=typeof t?.locale=="string"&&t.locale.trim()?t.locale.trim().toLowerCase():"en",n=Array.isArray(t?.locales)?t.locales.map(d=>String(d||"").trim().toLowerCase()).filter(Boolean):[],o=Array.from(new Set([r,...n])),a=null,i=async()=>(a||(a=qe().then(d=>typeof d?.createJSONLocalization=="function"?d.createJSONLocalization(t):null).catch(()=>null)),a),s=async(d="loadLocale")=>{let l=await i();if(!l||typeof l!="object")return null;let p=l.provider;if(!p||typeof p!="object")return null;let c=p[d];return typeof c=="function"?c:d==="setLocale"&&typeof p.loadLocale=="function"?p.loadLocale:null};return{locale:r,locales:[...o],provider:{locales:[...o],async loadLocale(d={}){let l=await s("loadLocale");return typeof l!="function"?{}:l(d)},async setLocale(d={}){let l=await s("setLocale");return typeof l!="function"?{}:l(d)}}}};function Ve(t,e){return e&&typeof e=="string"?e:`${Le(w.currentConfig||{},{resolvePublicAssetURL:ke})}core/${t}`}async function Aa(){return Array.isArray(w.defaultEnhancers)&&w.defaultEnhancers.length>0?w.defaultEnhancers:(xt||(xt=import(Ve("pds-enhancers.js",w.currentConfig?.enhancersURL)).then(e=>{let r=Array.isArray(e?.defaultPDSEnhancers)?e.defaultPDSEnhancers:[];return w.defaultEnhancers=r,r}).catch(e=>{throw xt=null,e})),xt)}async function Ta(){return typeof w.ask=="function"&&w.ask!==kn?w.ask:(yt||(yt=import(Ve("pds-ask.js",w.currentConfig?.askURL)).then(e=>{let r=e?.ask;if(typeof r!="function")throw new Error("Failed to load ask helper");return w.ask=r,r}).catch(e=>{throw yt=null,e})),yt)}async function Ge(){return typeof w.toast=="function"&&w.toast!==Me?w.toast:(vt||(vt=import(Ve("pds-toast.js",w.currentConfig?.toastURL)).then(e=>{let r=e?.toast;if(typeof r!="function")throw new Error("Failed to load toast helper");return w.toast=r,r}).catch(e=>{throw vt=null,e})),vt)}async function kn(...t){return(await Ta())(...t)}async function Me(...t){return(await Ge())(...t)}Me.success=async(...t)=>(await Ge()).success(...t);Me.error=async(...t)=>(await Ge()).error(...t);Me.warning=async(...t)=>(await Ge()).warning(...t);Me.info=async(...t)=>(await Ge()).info(...t);var pn=function(t="log",e,...r){w.log(t,e,...r)};function dr(t){if(t==null)return t;if(typeof t=="function")return;if(typeof t!="object")return t;if(Array.isArray(t))return t.map(r=>dr(r)).filter(r=>r!==void 0);let e={};for(let[r,n]of Object.entries(t)){let o=dr(n);o!==void 0&&(e[r]=o)}return e}function Sn(t,e=new WeakSet){if(!t||typeof t!="object"||e.has(t))return t;e.add(t),Object.freeze(t);for(let r of Object.keys(t))Sn(t[r],e);return t}function pr(t){return t==null||typeof t!="object"?t:Sn(structuredClone(dr(t)))}async function Ra(t,e={}){if(e?.runtimeConfig===!1||typeof fetch!="function")return null;let r=e?.runtimeConfigURL||`${t}pds-runtime-config.json`;try{let n=await fetch(r,{cache:"no-store"});return n.ok?await n.json():null}catch{return null}}w.registry=we;w.enums=$;w.adoptLayers=tt;w.adoptPrimitives=et;var Ia=or;w.parse=Ia;var _a=ct;w.html=_a;w.createStylesheet=qr;w.isLiveMode=()=>we.isLive;w.ask=kn;w.toast=Me;w.common=dt;w.msg=hn;w.str=bn;w.configureLocalization=$t;w.loadLocale=yn;w.setLocale=vn;w.getLocalizationState=xn;w.createJSONLocalization=wn;w.i18n={msg:hn,str:bn,configure:$t,loadLocale:yn,setLocale:vn,getState:xn,createJSONLocalization:wn};w.AutoComplete=null;w.loadAutoComplete=async()=>{if(w.AutoComplete&&typeof w.AutoComplete.connect=="function")return w.AutoComplete;let t=Ve("pds-autocomplete.js",w.currentConfig?.autoCompleteURL);return bt||(bt=import(t).then(e=>{let r=e?.AutoComplete||e?.default?.AutoComplete||e?.default||null;if(!r)throw new Error("AutoComplete export not found in module");return w.AutoComplete=r,r}).catch(e=>{throw bt=null,e})),bt};function $n(t){let e=typeof CustomEvent=="function";try{let r=e?new CustomEvent("pds:ready",{detail:t}):new Event("pds:ready");w.dispatchEvent(r)}catch{}if(typeof document<"u")if(e){let r={detail:t,bubbles:!0,composed:!0};try{document.dispatchEvent(new CustomEvent("pds:ready",r))}catch{}try{document.dispatchEvent(new CustomEvent("pds-ready",r))}catch{}}else{try{document.dispatchEvent(new Event("pds:ready"))}catch{}try{document.dispatchEvent(new Event("pds-ready"))}catch{}}}function Ln(t={}){let e=typeof CustomEvent=="function",r={at:Date.now(),...t};try{let n=e?new CustomEvent("pds:config-changed",{detail:r}):new Event("pds:config-changed");w.dispatchEvent(n)}catch{}if(typeof document<"u")if(e){let n={detail:r,bubbles:!0,composed:!0};try{document.dispatchEvent(new CustomEvent("pds:config-changed",n))}catch{}}else try{document.dispatchEvent(new Event("pds:config-changed"))}catch{}}var cr="pure-ds-theme",fe=null,Ue=null;function ur(t){try{if(typeof document>"u")return;let e="light";t?t==="system"?e=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e=t:e=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",document.documentElement.setAttribute("data-theme",e)}catch{}}function gr(t){try{if(fe&&Ue){try{typeof fe.removeEventListener=="function"?fe.removeEventListener("change",Ue):typeof fe.removeListener=="function"&&fe.removeListener(Ue)}catch{}fe=null,Ue=null}if(t==="system"&&typeof window<"u"&&window.matchMedia){let e=window.matchMedia("(prefers-color-scheme: dark)"),r=n=>{let o=n?.matches===void 0?e.matches:n.matches;try{let a=o?"dark":"light";document.documentElement.setAttribute("data-theme",a),w.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:a,source:"system"}}))}catch{}};fe=e,Ue=r,typeof e.addEventListener=="function"?e.addEventListener("change",r):typeof e.addListener=="function"&&e.addListener(r)}}catch{}}var Fa=Object.getOwnPropertyDescriptor(w,"theme");Fa||Object.defineProperty(w,"theme",{get(){try{return typeof window>"u"?null:localStorage.getItem(cr)||null}catch{return null}},set(t){try{if(typeof window>"u")return;let e=w.currentConfig?.design||null,r=ze(t);if(e&&!ge(e,r)){let n=e?.name||w.currentPreset?.name||w.currentConfig?.preset||"current preset";w.log("warn",`PDS theme "${r}" not supported by preset "${n}".`),w.dispatchEvent(new CustomEvent("pds:theme:blocked",{detail:{theme:t,resolvedTheme:r,preset:n}}));return}t==null?localStorage.removeItem(cr):localStorage.setItem(cr,t),ur(t),gr(t),w.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:t,source:"api"}}))}catch{}}});w.defaultEnhancers=[];async function Pa(t){w.initializing=!0;try{let e=t&&t.mode||"live",{mode:r,...n}=t||{};w.mode=e,w.logHandler=typeof n?.log=="function"?n.log:null,w.currentConfig=pr(n);let o=n&&typeof n.localization=="object"&&n.localization?n.localization:null;o?(await qe(),$t(o)):$t(null);let a;if(e==="static")a=await Na(n);else{let{localization:s,...d}=n||{},l=Le(d,{resolvePublicAssetURL:ke}),p=d?.managerURL||d?.public?.managerURL||d?.manager?.url||new URL("core/pds-manager.js",l).href||new URL("./pds-manager.js",import.meta.url).href,{startLive:c}=await import(p);a=await c(w,d,{emitReady:$n,emitConfigChanged:Ln,applyResolvedTheme:ur,setupSystemListenerIfNeeded:gr})}w.compiled=pr(a?.config||null);let i=w?.compiled?.design?.icons?.externalPath||"/assets/img/icons/";return w.log("info",`startup ready; external icon path: ${i}`),a}finally{w.initializing=!1}}w.start=Pa;async function Na(t){if(!t||typeof t!="object")throw new Error("PDS.start({ mode: 'static', ... }) requires a valid configuration object");let e=t.applyGlobalStyles??!0,r=t.manageTheme??!0,n=t.themeStorageKey??"pure-ds-theme",o=t.staticPaths??{},a=Le(t,{resolvePublicAssetURL:ke}),i=t&&t.autoDefine||null,s;i&&i.baseURL?s=Se($e(i.baseURL,{preferModule:!1})):s=`${a}components/`;let d=i&&Array.isArray(i.predefine)&&i.predefine||[],l=i&&typeof i.mapper=="function"&&i.mapper||null;try{at(w);let{resolvedTheme:p}=it({manageTheme:r,themeStorageKey:n,applyResolvedTheme:ur,setupSystemListenerIfNeeded:gr}),c=await Ra(a,t),u=Array.isArray(t?.enhancers)?t.enhancers:t?.enhancers&&typeof t.enhancers=="object"?Object.values(t.enhancers):[],y=c?.config?{...c.config,...t,design:t?.design||c.config.design,preset:t?.preset||c.config.preset}:{...t},g={tokens:`${a}styles/pds-tokens.css.js`,primitives:`${a}styles/pds-primitives.css.js`,components:`${a}styles/pds-components.css.js`,utilities:`${a}styles/pds-utilities.css.js`,styles:`${a}styles/pds-styles.css.js`},x=c?.paths||{};if(o={...g,...x,...o},w.registry.setStaticMode(o),e&&typeof document<"u")try{let h=await w.registry.getStylesheet("styles");if(h){h._pds=!0;let v=(document.adoptedStyleSheets||[]).filter(m=>m._pds!==!0);document.adoptedStyleSheets=[...v,h],Ln({mode:"static",source:"static:styles-applied"})}}catch(h){pn.call(w,"warn","Failed to apply static styles:",h)}let b=null,f=[];try{let h=await Aa(),v=await st({autoDefineBaseURL:s,autoDefinePreload:d,autoDefineMapper:l,enhancers:u,autoDefineOverrides:i||null,autoDefinePreferModule:!(i&&i.baseURL)},{baseEnhancers:h});b=v.autoDefiner,f=v.mergedEnhancers||[]}catch(h){pn.call(w,"error","\u274C Failed to initialize AutoDefiner/Enhancers (static):",h)}return w.compiled=pr({mode:"static",...y,theme:p,enhancers:f}),$n({mode:"static",config:y,theme:p,autoDefiner:b}),{config:y,theme:p,autoDefiner:b}}catch(p){throw w.dispatchEvent(new CustomEvent("pds:error",{detail:{error:p}})),p}}var ja="src/js/pds-live-manager/tailwind-conversion-rules.json",Ct=["base","sm","md","lg","xl","2xl"];function Oa(t={}){let e=Array.isArray(t.ignoredPatterns)?t.ignoredPatterns.map(n=>({...n,pattern:n?.pattern instanceof RegExp?n.pattern:new RegExp(String(n?.pattern||""))})):[],r=Array.isArray(t.nonPdsClassPatterns)?t.nonPdsClassPatterns.map(n=>n instanceof RegExp?n:new RegExp(String(n||""))):[];return{...t,ignoredPatterns:e,nonPdsClassPatterns:r}}var V=Oa(dn),zn=V.version||"tw2pds-layout-v4",Ba=new Map(V.directMappings.map(t=>[t.tw,t])),fr=new Map(Object.entries(V.gapScaleMap||{})),Cn=new Map(Object.entries(V.maxWidthMap||{})),Da=V.nonPdsClassPatterns||[],Ha=new Set(V.neverFallbackTags||[]),Wa={...V.importStyleRules||{}},Ua=V.tailwindSizeScale||{},mr=Array.isArray(V.tailwindShadeScale)?V.tailwindShadeScale.map(t=>String(t)).filter(Boolean):["50","100","200","300","400","500","600","700","800","900"],Mn=mr.includes(String(V.defaultTailwindShade||""))?String(V.defaultTailwindShade):"500",zt=1.2,qa=["container","grid","flex","gap","space","items","justify","content","place","self","col","row","w","h","min","max","p","m","rounded","border","ring","outline","shadow","bg","text","font","leading","tracking","uppercase","lowercase","capitalize","overflow","whitespace","truncate","object","aspect","opacity","blur","backdrop","transition","duration","ease","delay","animate","hidden","block","inline","absolute","relative","fixed","sticky","size"];function En(t="",e=""){if(!t||!e)return t;let r=new RegExp(`\\s${e}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`,"gi");return String(t).replace(r,"")}function Va(t="",e=null){let r=String(t||""),n=0;return r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(input)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*?)>/gi,(o,a,i,s,d,l,p,c,u,y,g)=>{if(s!==y)return o;let x=En(`${a||""}${d||""}`,"for"),b=`<${p}${c||""} id="${y}"${g||""}>`;return n+=1,`<label${x}>${l}${b}</label>`}),r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(select|textarea)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*)>([\s\S]*?)<\/\6>/gi,(o,a,i,s,d,l,p,c,u,y,g,x)=>{if(s!==y)return o;let b=En(`${a||""}${d||""}`,"for"),f=`<${p}${c||""} id="${y}"${g||""}>${x}</${p}>`;return n+=1,`<label${b}>${l}${f}</label>`}),e&&n>0&&(e.labelNestingCount+=n,j(e,`Nested ${n} label/control pairs.`),_(e,"intent.form.nested-label")),r}function Ga(t="",e="base"){let r=String(t||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rule";return`import-${e&&e!=="base"?`${e}-`:""}${r}`}function me(t,e,r,n="base",o=""){if(!t||!e||!r)return"";let a=Ga(e,n);if(o){let i=`${n}|${o}`;t.importPseudoStyles.has(i)||t.importPseudoStyles.set(i,new Map),t.importPseudoStyles.get(i).set(a,r)}else n==="base"?t.importBaseStyles.set(a,r):(t.importResponsiveStyles.has(n)||t.importResponsiveStyles.set(n,new Map),t.importResponsiveStyles.get(n).set(a,r));return t.importedStyleCount+=1,a}function Ae(t=""){return String(t||"").trim().replace(/_/g," ")}function Te(t=""){return!t||/[;{}]/.test(t)?!1:/^[-#(),.%/\sa-zA-Z0-9]+$/.test(t)}function Ke(t=""){let e=String(t||"").trim();if(!e)return null;let r=e.match(/^\[([^\]]+)\]$/);if(r){let n=Ae(r[1]);return Te(n)?n:null}return Ua[e]||null}function Ka(t=""){let e=Number(t);if(!Number.isFinite(e))return Mn;let r=String(e);return mr.includes(r)?r:mr.reduce((n,o)=>{let a=Math.abs(Number(n)-e);return Math.abs(Number(o)-e)<a?o:n},Mn)}function Ye(t="",e="500"){let r=String(t||"").toLowerCase(),n=Ka(e);return["blue","sky","indigo","cyan"].includes(r)?`var(--color-primary-${n})`:["purple","violet","fuchsia"].includes(r)?`var(--color-accent-${n})`:["green","emerald","lime","teal"].includes(r)?`var(--color-success-${n})`:["yellow","amber","warning"].includes(r)?`var(--color-warning-${n})`:["red","rose","pink","orange"].includes(r)?`var(--color-danger-${n})`:["slate","gray","zinc","neutral","stone"].includes(r)?`var(--color-gray-${n})`:""}function An(t=""){let e=Ae(t);return Te(e)&&(/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(e)||/^(?:rgb|hsl)a?\([^)]*\)$/.test(e))?e:""}function ae(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(Boolean)}function Ja(t="",e=""){if(!e)return t;let r=String(t||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return`${r} class="${e}"`;let o=n[1]||'"',a=ae(n[2]);a.includes(e)||a.push(e);let i=` class=${o}${a.join(" ")}${o}`;return r.replace(n[0],i)}function Ya(t="",e=""){return e?new RegExp(`\\s${e}\\s*=`,"i").test(String(t||"")):!1}function Xa(t=""){let e=String(t||"").replace(/[-_]+/g," ").trim();return e?e.replace(/(^|\s)([a-z])/g,(r,n,o)=>`${n}${o.toUpperCase()}`):"Icon button"}function Za(t="",e=null){let r=String(t||"");return r&&r.replace(/<(button|a)([^>]*)>\s*(<pds-icon\b[^>]*><\/pds-icon>)\s*<\/\1>/gi,(n,o,a,i)=>{let s=Ja(a,"icon-only");if(!Ya(s,"aria-label")){let d=String(i).match(/\sicon\s*=\s*(["'])(.*?)\1/i),l=d?String(d[2]||""):"",p=Xa(l);s+=` aria-label="${p}"`}return e&&(e.intentHits+=1,_(e,"intent.component.button.icon-only-markup")),`<${o}${s}>${i}</${o}>`})}function Qa(t="",e=null){let r=String(t||"");if(!r)return r;let n=0,o=r.replace(/<p([^>]*?)>([\s\S]*?)<\/p>/gi,(a,i,s)=>{let d=String(i||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!d)return a;let l=ae(d[2]||""),p=l.some(u=>/^import-text-/.test(String(u||""))),c=l.includes("text-muted")||l.some(u=>/^import-font-/.test(String(u||"")));return!p||!c?a:(n+=1,`<div${i}>${s}</div>`)});return e&&n>0&&(e.intentHits+=1,_(e,"intent.typography.metric-paragraph-to-div"),j(e,`Normalized ${n} metric text paragraph tag(s) to div.`)),o}function Nn(t="",e=""){if(!e)return t;let r=String(t||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return r;let o=n[1]||'"',a=ae(n[2]).filter(s=>s!==e);if(a.length===0)return r.replace(n[0],"");let i=` class=${o}${a.join(" ")}${o}`;return r.replace(n[0],i)}function ei(t="",e=r=>r){let r=String(t||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return r;let o=n[1]||'"',a=ae(n[2]),i=e(Array.from(a)),s=Array.isArray(i)?i.filter(Boolean):a;if(s.length===0)return r.replace(n[0],"");let d=` class=${o}${s.join(" ")}${o}`;return r.replace(n[0],d)}function ti(t="",e=null){let r=String(t||"");if(!r)return r;let n=0,o=r.replace(/<(div|section|article|aside)([^>]*)>\s*<(p|div)([^>]*)>[\s\S]*?<\/\3>\s*<(p|div)([^>]*)>[\s\S]*?<\/\5>\s*<\/\1>/gi,(a,i,s,d,l,p,c)=>{let u=String(s||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!u||!ae(u[2]).includes("stack-sm"))return a;let g=String(l||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i),x=String(c||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!g||!x)return a;let b=ae(g[2]),f=ae(x[2]);if(!(b.some(m=>/^import-text-/.test(String(m||"")))&&f.some(m=>/^import-text-/.test(String(m||"")))))return a;let v=Nn(s,"stack-sm");return n+=1,a.replace(`<${i}${s}>`,`<${i}${v}>`)});return e&&n>0&&(e.intentHits+=1,_(e,"intent.typography.metric-pair-no-stack"),j(e,`Removed stack-sm from ${n} metric text pair container(s).`)),o}function ri(t={}){if(!t||typeof t!="object")return{};let e=t.typography;if(e&&typeof e=="object")return e;let r=t.design?.typography;return r&&typeof r=="object"?r:{}}function ni(t={}){let e=ri(t),r=Number(e.fontScale);return Number.isFinite(r)?Math.max(1,Math.min(2,r)):zt}function oi(t="",e=zt){let n={"4xl":1,"3xl":2,"2xl":3,xl:4}[t];if(!n)return"";let o=Number.isFinite(Number(e))?Math.max(1,Math.min(2,Number(e))):zt,a=Math.max(-1,Math.min(1,Math.round((o-zt)/.25))),i=n-a;return i<1?"h1":i>4?"":`h${i}`}function ai(t="",e=null,r={}){let n=String(t||"");if(!n)return n;let o=ni(r.config||{}),a=0,i=0,s=n.replace(/<(p|div|span)([^>]*)>([\s\S]*?)<\/\1>/gi,(d,l,p,c)=>{let u=String(p||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!u)return d;let y=ae(u[2]);if(!y.includes("import-font-bold"))return d;let x=y.find(m=>/^import-text-(?:4xl|3xl|2xl|xl)$/.test(String(m||"")))||"",b=x.match(/^import-text-(4xl|3xl|2xl|xl)$/);if(b){let m=oi(b[1],o);if(!m)return d;let S=ei(p,C=>C.filter(T=>T!=="import-font-bold"&&T!==x));return a+=1,`<${m}${S}>${c}</${m}>`}let f=/<\/?(?:div|p|section|article|aside|main|header|footer|ul|ol|li|table|tr|td|th|h[1-6])\b/i.test(c),h=/<\/?(?:strong|b)\b/i.test(c);if(f||h)return d;let v=Nn(p,"import-font-bold");return i+=1,`<${l}${v}><strong>${c}</strong></${l}>`});return e&&(a>0&&(e.intentHits+=1,_(e,"intent.typography.semantic-heading-from-scale"),j(e,`Converted ${a} bold display text node(s) to semantic heading tags (fontScale=${Number(o).toFixed(2)}).`)),i>0&&(e.intentHits+=1,_(e,"intent.typography.bold-to-strong"),j(e,`Wrapped ${i} bold text node(s) in strong tags.`))),s}function ii(t=[]){if(!Array.isArray(t)||t.length===0)return"";let e=t.filter(n=>!Ct.includes(n));if(e.length===0||e.length>1)return"";let r=e[0];return["hover","focus","active"].includes(r)?r:""}function Tn(t,e="base",r=[]){let n=ii(r),o=Wa[t];if(o)return{declaration:o,breakpoint:e,pseudo:n,ruleId:"fallback.import-style"};let a=String(t).match(/^gap-(\d+)$/);if(a){let k={0:"var(--spacing-0)",1:"var(--spacing-1)",2:"var(--spacing-2)",3:"var(--spacing-3)",4:"var(--spacing-4)",5:"var(--spacing-5)",6:"var(--spacing-6)",7:"var(--spacing-7)",8:"var(--spacing-8)",10:"var(--spacing-10)",12:"var(--spacing-12)"},L=Number(a[1]);if(k[L])return{declaration:`gap:${k[L]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.gap-scale"}}let i=String(t).match(/^(mt|mb|my)-(.+)$/);if(i){let k=i[1],L=i[2],A=Ke(L);if(A){let R="";return k==="mt"?R=`margin-top:${A}`:k==="mb"?R=`margin-bottom:${A}`:R=`margin-top:${A};margin-bottom:${A}`,{declaration:R,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.margin-scale"}}}let s=String(t).match(/^min-w-\[([^\]]+)\]$/);if(s){let k=Ae(s[1]);if(Te(k))return{declaration:`min-width:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.min-width-arbitrary"}}let d=String(t).match(/^max-w-\[([^\]]+)\]$/);if(d){let k=Ae(d[1]);if(Te(k))return{declaration:`max-width:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.max-width-arbitrary"}}let l=String(t).match(/^min-h-\[([^\]]+)\]$/);if(l){let k=Ae(l[1]);if(Te(k))return{declaration:`min-height:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.min-height-arbitrary"}}let p=String(t).match(/^grid-rows-\[([^\]]+)\]$/);if(p){let k=Ae(p[1]);if(Te(k))return{declaration:`grid-template-rows:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.grid-rows-arbitrary"}}let c=String(t).match(/^size-(.+)$/);if(c){let k=Ke(c[1]);if(k)return{declaration:`width:${k};height:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.size-scale"}}let u=String(t).match(/^w-(.+)$/);if(u){let k=Ke(u[1]);if(k)return{declaration:`width:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.width-scale"}}let y=String(t).match(/^h-(.+)$/);if(y){let k=Ke(y[1]);if(k)return{declaration:`height:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.height-scale"}}let g={xs:"var(--font-size-xs)",sm:"var(--font-size-sm)",base:"var(--font-size-md)",lg:"var(--font-size-lg)",xl:"var(--font-size-xl)","2xl":"var(--font-size-2xl)","3xl":"var(--font-size-3xl)","4xl":"var(--font-size-4xl)"},x=String(t).match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/);if(x)return{declaration:`font-size:${g[x[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-size"};let b={normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},f=String(t).match(/^font-(normal|medium|semibold|bold|extrabold|black)$/);if(f)return{declaration:`font-weight:${b[f[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.font-weight"};let h={none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2"},v=String(t).match(/^leading-(none|tight|snug|normal|relaxed|loose)$/);if(v)return{declaration:`line-height:${h[v[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.line-height"};let m={tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},S=String(t).match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);if(S)return{declaration:`letter-spacing:${m[S[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.tracking"};let C=String(t).match(/^bg-black\/(\d{1,3})$/);if(C)return{declaration:`background-color:color-mix(in srgb, var(--color-gray-900) ${Math.max(0,Math.min(100,Number(C[1])))}%, transparent)`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.overlay-alpha"};if(t==="text-white")return{declaration:"color:var(--color-gray-50)",breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-inverse"};let T=String(t).match(/^bg-(primary|secondary|accent)$/);if(T){let L={primary:"var(--color-primary-fill)",secondary:"var(--color-gray-500)",accent:"var(--color-accent-500)"}[T[1]];if(L)return{declaration:`background-color:${L}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-semantic"}}let I=String(t).match(/^bg-([a-z]+)-(\d{2,3})$/);if(I){let k=Ye(I[1],I[2]);if(k)return{declaration:`background-color:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-tokenized"}}let z=String(t).match(/^bg-\[([^\]]+)\]$/);if(z){let k=An(z[1]);if(k)return{declaration:`background-color:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-arbitrary"}}let E=String(t).match(/^text-([a-z]+)-(\d{2,3})$/);if(E){let k=Ye(E[1],E[2]);if(k)return{declaration:`color:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-tokenized"}}let P=String(t).match(/^text-\[([^\]]+)\]$/);if(P){let k=An(P[1]);if(k)return{declaration:`color:${k}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-arbitrary"}}let M=String(t).match(/^rounded(?:-([trbl]{1,2}))?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(M){let k=M[1]||"",L=M[2]||"sm",A=L==="none"?"0":`var(--radius-${L})`,R={t:["top-left","top-right"],b:["bottom-left","bottom-right"],l:["top-left","bottom-left"],r:["top-right","bottom-right"],tl:["top-left"],tr:["top-right"],bl:["bottom-left"],br:["bottom-right"]};if(!k)return{declaration:`border-radius:${A}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.rounded"};let B=(R[k]||[]).map(K=>`border-${K}-radius:${A}`).join(";");if(B)return{declaration:B,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.rounded"}}return null}function Lt(t,e){return typeof t=="number"&&Number.isFinite(t)?`${t}px`:typeof t=="string"&&t.trim()?t.trim():`${e}px`}function si(t={}){let r=(t?.design&&typeof t.design=="object"?t.design:t)?.layout?.breakpoints||{};return{sm:Lt(r.sm,640),md:Lt(r.md,768),lg:Lt(r.lg,1024),xl:Lt(r.xl,1280)}}function li(t,e){let r=Array.from(t.importBaseStyles.entries()).map(([a,i])=>`.${a}{${i};}`),n=[];for(let[a,i]of t.importResponsiveStyles.entries()){let s=e?.[a];if(!s||!i?.size)continue;let d=Array.from(i.entries()).map(([l,p])=>`.${l}{${p};}`).join(`
`);n.push(`@media (min-width: ${s}) {
${d}
}`)}for(let[a,i]of t.importPseudoStyles.entries()){let[s,d]=String(a).split("|");if(!d||!i?.size)continue;let l=Array.from(i.entries()).map(([c,u])=>`.${c}:${d}{${u};}`).join(`
`);if(!l)continue;if(s==="base"){n.push(l);continue}let p=e?.[s];p&&n.push(`@media (min-width: ${p}) {
${l}
}`)}let o=[...r,...n].filter(Boolean).join(`
`);return o.trim()?["/* pds-import: generated fallback styles for unmapped Tailwind utilities */",o].join(`
`):""}function ci(t="",e=""){if(!e||!e.trim())return t;let r=`<style data-pds-import="tailwind-fallback">
${e}
</style>`;return/<head[^>]*>/i.test(t)?t.replace(/<head([^>]*)>/i,`<head$1>
${r}`):`${r}
${t}`}function Rn(t=""){if(!t)return!1;if(t.includes(":")||t.includes("["))return!0;let e=t.split("-")[0];return qa.includes(e)}function ie(t=""){let e=String(t).split(":");if(e.length===1)return{breakpoint:"base",base:e[0],variants:[]};let r=e[e.length-1],n=e.slice(0,-1);return{breakpoint:n.find(a=>Ct.includes(a))||"base",base:r,variants:n}}function di(){return{totalTailwind:0,mapped:0,ignored:0,policySkipped:0,unknown:0,intentHits:0,unknownTokens:new Map,notes:[],appliedRules:new Set,importBaseStyles:new Map,importResponsiveStyles:new Map,importPseudoStyles:new Map,importedStyleCount:0,labelNestingCount:0,removedAtomicSpacingCount:0,removedAtomicPositioningCount:0}}function pi(t=""){let e=String(t||"").toLowerCase().replace(/\s+/g,""),r=e.includes("menu,ol,ul{list-style:none")||e.includes("ol,ul,menu{list-style:none")||e.includes("ul,ol,menu{list-style:none"),n=e.includes("a{color:inherit;text-decoration:inherit");return{listReset:r,anchorReset:n}}function ui(t=""){return String(t||"").toLowerCase().includes("cdn.tailwindcss.com")?{listReset:!0,anchorReset:!0}:{listReset:!1,anchorReset:!1}}function gi(t="",e=null){let r=String(t||""),n={listReset:!1,anchorReset:!1,strippedRuntimeCssBlocks:0,strippedRuntimeScripts:0};return r=r.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi,(o,a,i)=>{let s=String(i||"");if(!(/tailwindcss\s+v\d/i.test(s)||/\*\s*!\s*tailwindcss/i.test(s)))return o;let l=pi(s);return n.listReset=n.listReset||l.listReset,n.anchorReset=n.anchorReset||l.anchorReset,n.strippedRuntimeCssBlocks+=1,""}),r=r.replace(/<script([^>]*?)src\s*=\s*(?:(['"])([^"']*cdn\.tailwindcss\.com[^"']*)\2|([^\s>]*cdn\.tailwindcss\.com[^\s>]*))([^>]*)><\/script>/gi,(o,a,i,s,d)=>{let p=ui(s||d||"");return n.listReset=n.listReset||p.listReset,n.anchorReset=n.anchorReset||p.anchorReset,n.strippedRuntimeScripts+=1,""}),e&&(n.strippedRuntimeCssBlocks>0||n.strippedRuntimeScripts>0)&&(_(e,"intent.preflight.tailwind-runtime-detected"),n.strippedRuntimeCssBlocks>0&&j(e,`Detected and stripped ${n.strippedRuntimeCssBlocks} Tailwind runtime style block(s).`)),e&&n.strippedRuntimeScripts>0&&j(e,`Removed ${n.strippedRuntimeScripts} Tailwind CDN script reference(s).`),{html:r,hints:n}}function j(t,e){!t||!e||t.notes.includes(e)||t.notes.push(e)}function fi(t,e){let r=t.unknownTokens.get(e)||0;t.unknownTokens.set(e,r+1)}function mi(t={}){let r=(t?.design&&typeof t.design=="object"?t.design:t)?.layout?.utilities||{};return{grid:r.grid!==!1,flex:r.flex!==!1,spacing:r.spacing!==!1,container:r.container!==!1}}function J(t,e){return e?t?.[e]!==!1:!0}function In(t){let e=String(t).match(/^grid-cols-(\d+)$/);return e?Number(e[1]):null}function _n(t={}){let e=Ct.map(o=>({bp:o,cols:t[o]})).filter(o=>Number.isFinite(o.cols));if(e.length<2)return null;if(e.length===2){let[o,a]=e;if(o.bp==="base"&&o.cols===1&&a.cols===2)return"grid-auto-lg";if(o.bp==="base"&&o.cols===1&&a.cols>=3)return null;if(o.cols<a.cols){if(a.cols>=4)return"grid-auto-md";if(a.cols>=2)return"grid-auto-lg"}return null}let r=!0;for(let o=1;o<e.length;o+=1)if(e[o].cols<=e[o-1].cols){r=!1;break}if(!r)return null;let n=e[e.length-1]?.cols||0;return n>=4?"grid-auto-md":n>=3?"grid-auto-sm":null}function hi(t=""){let e=String(t).match(/^text-(gray|slate|zinc|neutral|stone)-(\d{2,3})$/);if(!e)return"";let r=Number(e[2]);return Number.isFinite(r)&&r>=400&&r<=600?"text-muted":""}function bi(t="",e=0){return!t||!Number.isFinite(e)?"":{sm:{2:"sm:grid-cols-2"},md:{3:"md:grid-cols-3"},lg:{4:"lg:grid-cols-4"}}?.[t]?.[e]||""}function yi(t=""){let e=ie(t),n=String(e?.base||"").match(/^space-y-(\d+)$/);if(!n)return"stack-md";let o=Number(n[1]);return Number.isFinite(o)?o<=1?"stack-xs":o<=2?"stack-sm":o<=4?"stack-md":"stack-lg":"stack-md"}function vi(t=new Set){return Array.from(t).some(e=>{let r=String(e||"");return/^gap-(?:xs|sm|md|lg|xl)$/.test(r)||/^gap-[0-9]+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?gap-/.test(r)})}function xi(t=new Set){return Array.from(t).some(e=>/^stack-(?:xs|sm|md|lg|xl)$/.test(String(e||"")))}function wi(t=new Set){return Array.from(t).some(e=>{let r=String(e||"");return/^grid-cols-\d+$/.test(r)||/^grid-auto-(?:sm|md|lg|xl)$/.test(r)||/^(?:sm|md|lg|xl):grid-cols-\d+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?grid-cols-\d+$/.test(r)})}function ki(t,e=12){return Array.from(t.unknownTokens.entries()).sort((r,n)=>n[1]-r[1]).slice(0,e).map(([r])=>r)}function _(t,e){!t||!e||t.appliedRules.add(e)}function le(t=[],e){return!Array.isArray(t)||!e?!1:t.some(r=>e.test(String(r)))}function Si(t=[]){for(let e of t){let r=ie(e);if(r.breakpoint!=="base")continue;let n=String(r.base).match(/^h-(.+)$/);if(!n)continue;let o=Ke(n[1]);if(!o||o==="auto")continue;let a=String(o).match(/^(-?\d+(?:\.\d+)?)rem$/);if(a){let i=Number(a[1]);if(Number.isFinite(i))return i*16}}return null}function $i(t=[],e=""){let r=e==="button",n=le(t,/^bg-/),o=le(t,/^hover:bg-/),a=le(t,/^border/),i=le(t,/^shadow/),s=t.includes("cursor-pointer"),d=le(t,/^rounded/),l=le(t,/^(?:min-w|max-w|w)-/),p=le(t,/^text-(?:white|black|\[[^\]]+\]|[a-z]+-\d{2,3})$/),c=n||o||i;if(!(r||e==="a"&&(c||a||s||d&&l)))return{shouldNormalize:!1,variant:"none",size:"base",iconOnly:!1};let g="none";a&&!n&&!o?g="outline":(c||n&&p)&&(g="primary");let x=t.includes("rounded-full")&&(t.includes("p-2")||t.includes("p-1")||t.includes("p-2.5")),b=le(t,/^size-(?:6|7|8|9|10|11|12)$/),f=x||b,h=Si(t),v=t.includes("text-sm")||t.includes("text-xs"),m=t.includes("text-lg")||t.includes("text-xl"),S="base";return h&&h<=40||v?S="sm":(h&&h>=48||m)&&(S="lg"),{shouldNormalize:!0,variant:g,size:S,iconOnly:f}}function Li(t=""){let e=String(t||"").toLowerCase();return["green","emerald","lime","teal"].includes(e)?"badge-success":["blue","sky","cyan","indigo"].includes(e)?"badge-info":["yellow","amber","orange"].includes(e)?"badge-warning":["red","rose","pink"].includes(e)?"badge-danger":["gray","slate","zinc","neutral","stone"].includes(e)?"badge-secondary":["purple","violet","fuchsia","primary","accent"].includes(e)?"badge-primary":"badge-secondary"}function zi(t=[],e="",r={shouldNormalize:!1}){if(r?.shouldNormalize)return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(["button","a","input","select","textarea"].includes(e))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(t.some(E=>/^badge(?:-|$)/.test(String(E))))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let n=t.map(E=>ie(E)).filter(E=>E.breakpoint==="base").map(E=>String(E.base)),o=n.some(E=>/^rounded(?:-|$)/.test(E)),a=n.some(E=>/^px-/.test(E)),i=n.some(E=>/^py-/.test(E)),s=a&&i,d=n.includes("text-xs")||n.includes("text-sm"),l=n.includes("text-lg")||n.includes("text-xl"),p=n.map(E=>E.match(/^bg-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),c=n.map(E=>E.match(/^text-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),u=n.map(E=>E.match(/^border-([a-z]+)-(\d{2,3})$/)).find(Boolean),y=Number(p?.[2]),g=Number(c?.[2]),x=!!(p&&Number.isFinite(y)&&y<=300),b=n.some(E=>/^border(?:-|$)/.test(E)),f=!!(p||c||u),h=[o,s,d,x||b].filter(Boolean).length;if(!(f&&h>=3))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let m=p&&p[1]||c&&c[1]||u&&u[1]||"",S=Li(m),C=b&&!x,T=d?"badge-sm":l?"badge-lg":"",I=x?{family:m,bgShade:Number.isFinite(y)?y:200,textShade:Number.isFinite(g)?g:700}:null;return{shouldNormalize:!0,variantClass:I?"":S,outline:C,sizeClass:T,pastel:I}}function Ci(t="",e=0){let r=String(t||"").toLowerCase(),n=Number(e);return r==="white"?"surface-base":["gray","slate","zinc","neutral","stone"].includes(r)?Number.isFinite(n)&&n<=100?"surface-base":"surface-subtle":["blue","sky","cyan","indigo","primary","info"].includes(r)?"surface-info":["purple","violet","fuchsia","accent"].includes(r)?"surface-primary":["green","emerald","lime","teal","success"].includes(r)?"surface-success":["yellow","amber","orange","warning"].includes(r)?"surface-warning":["red","rose","pink","danger"].includes(r)?"surface-danger":"surface-base"}function Mi(t=[],e="",r={shouldNormalize:!1},n={shouldNormalize:!1}){if(r?.shouldNormalize||n?.shouldNormalize)return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(!new Set(["div","section","article","aside","li"]).has(e))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(t.some(b=>/^card(?:-|$)/.test(String(b))))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let a=t.map(b=>ie(b)).filter(b=>b.breakpoint==="base").map(b=>String(b.base)),i=a.some(b=>/^rounded(?:-|$)/.test(b)),s=a.some(b=>/^border(?:$|-)/.test(b)),d=a.some(b=>/^shadow(?:$|-)/.test(b)),l=a.some(b=>/^(?:p|px|py|pt|pb|pl|pr)-/.test(b)),p=a.map(b=>b.match(/^bg-([a-z]+)-?(\d{2,3})?$/)).find(Boolean),c=a.includes("bg-white")||!!p;if(!([i,s||d,c,l].filter(Boolean).length>=3))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let g="card-basic";d?g="card-elevated":s&&(g="card-outlined");let x="";return d?x="surface-elevated":p?x=Ci(p[1],p[2]):c&&(x="surface-base"),{shouldNormalize:!0,cardVariantClass:g,surfaceClass:x}}function Ei({tagName:t,originalClassValue:e,policy:r,summary:n,preflightHints:o={}}){if(Ha.has(t))return _(n,"table.strict-tags.no-classes"),"";let a=String(e).split(/\s+/).filter(Boolean),i=$i(a,t),s=zi(a,t,i),d=Mi(a,t,i,s),l=/^h[1-6]$/.test(t),p=["i","svg"].includes(t)||a.some(M=>/^fa(?:[a-z-]+)?$/i.test(String(M||""))||/^fa-/.test(String(M||""))),c=new Set,u={},y={},g=!1,x="",b="",f=!1,h="";a.forEach(M=>{let k=ie(M),L=k.base;if(Da.some(N=>N.test(L))){n.ignored+=1,_(n,"cleanup.non-pds-class");return}let A=Rn(M)||Rn(L);if(A&&(n.totalTailwind+=1),/^space-y-/.test(L)){g=!0,x=x||M,b=b||yi(M),n.ignored+=1,_(n,"layout.spacing.space-y-to-stack");return}if(/^space-x-/.test(L)){let N=String(L).match(/^space-x-(\d+)$/);if(N){let D=`gap-${N[1]}`,Y=fr.get(D);if(Y&&J(r,"spacing")){c.add(Y),f=!0,h=h||M,n.mapped+=1,n.intentHits+=1,_(n,"layout.spacing.space-x-to-gap");return}}n.ignored+=1,_(n,"style.spacing.atomic");return}if(/^grid-cols-\d+$/.test(L)&&k.breakpoint!=="base"){let N=In(L);if(Number.isFinite(N)&&J(r,"grid")){u[k.breakpoint]=N,n.mapped+=1,_(n,"intent.layout.responsive-grid-to-auto");return}if(!J(r,"grid")){n.policySkipped+=1,j(n,"Skipped responsive grid mapping because layout.utilities.grid=false.");return}}if(/^flex-(?:row|col)$/.test(L)&&k.breakpoint!=="base"){if(J(r,"flex")){y[k.breakpoint]=L,n.mapped+=1,_(n,"intent.layout.mobile-stack");return}n.policySkipped+=1,j(n,"Skipped responsive flex mapping because layout.utilities.flex=false.");return}if(/^grid-cols-\d+$/.test(L)&&k.breakpoint==="base"){let N=In(L);Number.isFinite(N)&&J(r,"grid")&&(u.base=N)}let R=Ba.get(L);if(R&&k.breakpoint==="base"){if(!J(r,R.gate)){n.policySkipped+=1,j(n,`Skipped ${L} because layout.utilities.${R.gate}=false.`);return}R.pds.forEach(N=>{N&&c.add(N)}),n.mapped+=1,_(n,R.id);return}if(fr.has(L)&&k.breakpoint==="base"){if(!J(r,"spacing")){n.policySkipped+=1,j(n,"Skipped gap utility because layout.utilities.spacing=false.");return}c.add(fr.get(L)),n.mapped+=1,_(n,"layout.spacing.gap-scale");return}if(Cn.has(L)&&k.breakpoint==="base"){if(!J(r,"container")){n.policySkipped+=1,j(n,"Skipped max-width utility because layout.utilities.container=false.");return}c.add(Cn.get(L)),n.mapped+=1,_(n,"layout.container.max-width");return}if(i.shouldNormalize&&A){let N=String(L||"");if(k.breakpoint==="base"&&["flex-1","grow","flex-grow"].includes(N)){c.add("grow"),n.mapped+=1,n.intentHits+=1,_(n,"intent.component.button.layout-grow");return}if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(N)||N.startsWith("hover:")){n.ignored+=1,_(n,"intent.component.button.normalize");return}}if(l&&/^(?:text-(?:xs|sm|base|lg|xl|\dxl|white|black|\[[^\]]+\]|[a-z]+-\d{2,3})|font-|leading-|tracking-|uppercase|lowercase|capitalize)/.test(L)){n.ignored+=1,n.intentHits+=1,_(n,"intent.typography.heading-semantic");return}if(s.shouldNormalize&&A){let N=String(L||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(N)||N.startsWith("hover:")){n.ignored+=1,_(n,"intent.component.badge.normalize");return}}if(d.shouldNormalize&&A){let N=String(L||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)/.test(N)||N.startsWith("hover:")){n.ignored+=1,_(n,"intent.component.card.normalize");return}}let O=hi(L);if(O&&k.breakpoint==="base"){c.add(O),n.mapped+=1,n.intentHits+=1,_(n,"intent.typography.text-neutral-to-muted");return}if(/^text-(?:white|black|[a-z]+-\d{2,3}|\[[^\]]+\])$/.test(L)){if(p||t==="a"&&!i.shouldNormalize){let D=Tn(L,k.breakpoint,k.variants);if(D){let Y=me(n,`${t}-color-${L}`,D.declaration,D.breakpoint,D.pseudo);if(Y){c.add(Y),n.mapped+=1,n.intentHits+=1,_(n,p?"intent.icon.color-preserve":"intent.typography.link-active-preserve");return}}}n.ignored+=1,_(n,"style.color");return}let K=Tn(L,k.breakpoint,k.variants);if(K){let N=me(n,L,K.declaration,K.breakpoint,K.pseudo);if(N){c.add(N),n.mapped+=1,n.intentHits+=1,_(n,K.ruleId),k.breakpoint!=="base"&&j(n,`Generated responsive import fallback for ${M}.`);return}}for(let N of V.ignoredPatterns)if(N.pattern.test(L)){n.ignored+=1,_(n,N.id),N.id==="style.spacing.atomic"&&(n.removedAtomicSpacingCount+=1),N.id==="style.positioning.atomic"&&(n.removedAtomicPositioningCount+=1);return}if(A){n.unknown+=1,fi(n,M);return}c.add(M)}),g&&J(r,"spacing")&&(c.add(b||"stack-md"),n.mapped+=1,n.intentHits+=1,j(n,`Mapped ${x} to ${b||"stack-md"}.`)),f&&J(r,"spacing")&&j(n,`Mapped ${h} to gap utility.`);let v=_n(u);if(v&&J(r,"grid")?(c.delete("grid-cols-1"),c.delete("grid-cols-2"),c.delete("grid-cols-3"),c.delete("grid-cols-4"),c.delete("grid-cols-6"),c.add("grid"),c.add(v),n.intentHits+=1,_(n,"intent.layout.responsive-grid-to-auto"),j(n,`Collapsed responsive grid columns to ${v}.`)):J(r,"grid")&&Ct.filter(k=>k!=="base"&&Number.isFinite(u[k])).forEach(k=>{let L=u[k],A=bi(k,L);if(A){c.add("grid"),c.add(A),n.intentHits+=1,_(n,"intent.layout.responsive-grid-to-auto"),j(n,`Mapped ${k}:grid-cols-${L} to ${A}.`);return}let R=me(n,`grid-cols-${L}`,`grid-template-columns:repeat(${L}, minmax(0, 1fr))`,k);R&&(c.add("grid"),c.add(R),n.intentHits+=1,_(n,"fallback.import-style.grid-cols-responsive"),j(n,`Mapped ${k}:grid-cols-${L} to responsive import fallback for exact columns.`))}),J(r,"flex")&&a.includes("flex-col")&&(y.md==="flex-row"||y.lg==="flex-row")&&(c.delete("flex-col"),c.delete("flex-row"),c.add("mobile-stack"),n.intentHits+=1,_(n,"intent.layout.mobile-stack"),j(n,"Mapped flex-col + breakpoint flex-row to mobile-stack.")),(c.has("flex")||c.has("inline-flex"))&&J(r,"spacing")&&(vi(c)||xi(c)||f||g||(c.add("gap-sm"),n.intentHits+=1,_(n,"layout.spacing.flex-min-gap"),j(n,"Added gap-sm fallback for flex container without explicit spacing."))),a.some(M=>/^grid-cols-\d+$/.test(ie(M).base))&&c.has("grid")&&!wi(c)){let M=_n(u);M?(c.add(M),n.intentHits+=1,_(n,"intent.layout.responsive-grid-to-auto"),j(n,`Applied grid safety fallback ${M} to avoid bare grid output.`)):Number.isFinite(u.base)&&u.base>1?(c.add(`grid-cols-${u.base}`),n.intentHits+=1,_(n,"intent.layout.grid-safety-fallback"),j(n,`Applied grid safety fallback grid-cols-${u.base} to preserve explicit grid intent.`)):(c.add("mobile-stack"),n.intentHits+=1,_(n,"intent.layout.grid-safety-fallback.mobile-stack"),j(n,"Applied mobile-stack safety fallback to avoid bare grid output when explicit grid intent was present."))}let C=a.some(M=>/^(?:bg-white|shadow|shadow-md|shadow-lg)$/.test(M)),T=a.some(M=>/^rounded/.test(M));if(["div","section","article","li","aside"].includes(t)&&C&&T&&(c.add("card"),!c.has("surface-elevated")&&a.some(M=>/^shadow/.test(M))&&c.add("surface-elevated"),!c.has("surface-base")&&a.includes("bg-white")&&c.add("surface-base"),n.intentHits+=1,_(n,"intent.component.card")),t==="button"||t==="a"){let M=a.some(A=>/^bg-(?:[a-z]+-)?[4567]00$/.test(A))&&a.includes("text-white"),k=a.some(A=>/^border/.test(A))&&!M,L=a.includes("p-2")&&a.includes("rounded-full");M?(c.delete("surface-base"),c.delete("surface-elevated"),c.add("btn-primary"),n.intentHits+=1,_(n,"intent.component.button.primary")):k&&(c.add("btn-outline"),n.intentHits+=1,_(n,"intent.component.button.outline")),L&&(c.add("icon-only"),_(n,"intent.component.button.icon-only"))}if(i.shouldNormalize){for(let k of Array.from(c))String(k).startsWith("import-")&&c.delete(k);["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","surface-base","surface-elevated","surface-subtle","card"].forEach(k=>c.delete(k)),i.variant==="primary"?(c.add("btn-primary"),_(n,"intent.component.button.primary")):i.variant==="outline"&&(c.add("btn-outline"),_(n,"intent.component.button.outline")),i.size==="sm"?(c.add("btn-sm"),_(n,"intent.component.button.size-sm")):i.size==="lg"&&(c.add("btn-lg"),_(n,"intent.component.button.size-lg")),i.iconOnly&&(c.add("icon-only"),_(n,"intent.component.button.icon-only")),n.intentHits+=1,_(n,"intent.component.button.normalize")}if(s.shouldNormalize){for(let k of Array.from(c))String(k).startsWith("import-")&&c.delete(k);if(["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","grow","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","text-muted","surface-base","surface-elevated","surface-subtle","card"].forEach(k=>c.delete(k)),c.add("badge"),s.variantClass&&c.add(s.variantClass),s.outline&&c.add("badge-outline"),s.sizeClass&&c.add(s.sizeClass),s.pastel&&s.pastel.family){let k=Ye(s.pastel.family,String(s.pastel.bgShade||200)),L=Ye(s.pastel.family,String(s.pastel.textShade||700));if(k&&L){let A=`badge-pastel-${s.pastel.family}-${s.pastel.bgShade}-${s.pastel.textShade}`,R=me(n,A,`background-color:${k};color:${L}`,"base");R&&(c.add(R),_(n,"intent.component.badge.pastel-preserve"),j(n,`Preserved pastel badge tone using ${R}.`))}}n.intentHits+=1,_(n,"intent.component.badge.normalize"),j(n,"Normalized badge/pill utility cluster to PDS badge classes.")}if(d.shouldNormalize){for(let k of Array.from(c))String(k).startsWith("import-")&&c.delete(k);["surface-base","surface-subtle","surface-elevated","surface-sunken","surface-overlay","surface-inverse","surface-primary","surface-secondary","surface-success","surface-warning","surface-danger","surface-info","card-basic","card-elevated","card-outlined","card-interactive"].forEach(k=>c.delete(k)),c.add("card"),d.cardVariantClass&&c.add(d.cardVariantClass),d.surfaceClass&&c.add(d.surfaceClass),n.intentHits+=1,_(n,"intent.component.card.normalize"),j(n,"Normalized card utility cluster to PDS card/surface classes.")}if(t==="a"&&!i.shouldNormalize&&a.some(k=>k.includes("hover:text")||k==="transition-colors")){let k=me(n,"link-reset","text-decoration:none");k&&c.add(k),n.intentHits+=1,_(n,"intent.typography.link-treatment")}if(t==="footer"&&(c.has("surface-base")||a.some(k=>/^bg-/.test(k)))&&(c.delete("surface-base"),c.delete("surface-subtle"),c.add("surface-inverse"),n.intentHits+=1,_(n,"intent.surface.footer-inverse")),o?.listReset&&["ul","ol","menu"].includes(t)){let M=me(n,"list-reset","list-style:none;margin:0;padding:0");M&&(c.add(M),n.intentHits+=1,_(n,"intent.preflight.list-reset"))}if(o?.anchorReset&&t==="a"&&!i.shouldNormalize){let M=me(n,"anchor-reset","color:inherit;text-decoration:inherit");M&&(c.add(M),n.intentHits+=1,_(n,"intent.preflight.anchor-reset"))}let E=new Set(["div","section","article","aside","nav","main","header","footer","form","fieldset","ul","ol","li"]),P=a.some(M=>{let k=ie(M).base;return/^(?:flex|grid|container|gap-|space-[xy]-|items-|justify-|content-|place-|self-|w-|h-|min-|max-)/.test(k)});return c.size===0&&E.has(t)&&P&&(c.add("stack-sm"),j(n,`Added stack-sm fallback for <${t}> with unmapped classes.`)),Array.from(c).join(" ")}function Ai(t="",e={}){let r=String(t||""),n=mi(e.config||{}),o=si(e.config||{}),a=di(),i=gi(r,a),d=Va(i.html,a).replace(/<([a-zA-Z][\w:-]*)([^>]*?)\sclass\s*=\s*(["'])(.*?)\3([^>]*)>/gs,(S,C,T,I,z,E)=>{let P=Ei({tagName:String(C||"").toLowerCase(),originalClassValue:z,policy:n,summary:a,preflightHints:i.hints}),M=String(P||"").trim();return M?`<${C}${T} class=${I}${M}${I}${E}>`:`<${C}${T}${E}>`}),l=ai(ti(Qa(Za(d,a),a),a),a,{config:e.config||{}}),p=li(a,o),c=ci(l,p);p&&j(a,`Generated ${a.importedStyleCount} import-* fallback style mappings.`),(a.removedAtomicSpacingCount>0||a.removedAtomicPositioningCount>0)&&j(a,`Removed atomic utilities by policy: spacing=${a.removedAtomicSpacingCount}, positioning=${a.removedAtomicPositioningCount}.`);let u=ki(a,16),y=a.mapped+a.ignored+a.policySkipped,g=a.totalTailwind>0?y/a.totalTailwind:1,x=a.totalTailwind>0?a.unknown/a.totalTailwind:0,b=.42+g*.45+Math.min(a.intentHits,4)*.025-x*.18,f=Math.max(.15,Math.min(.96,Number(b.toFixed(2)))),h=[`pds-import: rulebook=${zn} confidence=${Math.round(f*100)}%`,`pds-import: tailwind=${a.totalTailwind} mapped=${a.mapped} ignored=${a.ignored} policySkipped=${a.policySkipped} unknown=${a.unknown}`];u.length&&h.push(`pds-import: unknown-tailwind=${u.join(", ")}`),a.notes.length&&h.push(`pds-import: notes=${a.notes.join(" | ")}`);let v=`<!-- ${h.join(` -->
<!-- `)} -->
${c}`,m=[];return a.unknown>0&&m.push({severity:"warning",message:`Converted with ${a.unknown} unknown Tailwind utilities requiring manual review.`}),a.policySkipped>0&&m.push({severity:"info",message:`Skipped ${a.policySkipped} utility mappings due to PDS config policy.`}),u.length&&m.push({severity:"info",message:`Top unknown utilities: ${u.slice(0,8).join(", ")}`}),{html:v,confidence:f,issues:m,meta:{rulebookVersion:zn,coverage:{tailwind:a.totalTailwind,mapped:a.mapped,ignored:a.ignored,policySkipped:a.policySkipped,unknown:a.unknown,importedStyles:a.importedStyleCount,nestedLabelPairs:a.labelNestingCount},unknownTailwindTokens:u,notes:a.notes,appliedRules:Array.from(a.appliedRules),policy:n,importStyleSheetInjected:!!p,breakpoints:o}}}function Ti(){return{rulesJsonPath:ja,...V,directMappings:V.directMappings.map(t=>({id:t.id,tw:t.tw,pds:t.pds,gate:t.gate||null})),ignoredPatterns:V.ignoredPatterns.map(t=>({id:t.id,pattern:String(t.pattern),reason:t.reason}))}}function Ri(t){let e=String(t||"").match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);return e?e[0]:null}function Ii(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function jn(t){return/<\s*[a-z][^>]*>/i.test(String(t||""))}function _i(t){let e=String(t||"").trim().toLowerCase();if(!e)return null;let r=Number.parseFloat(e);return Number.isFinite(r)?e.endsWith("rem")||e.endsWith("em")?r*16:e.endsWith("px")||/^[0-9.\-]+$/.test(e)?r:null:null}function ee(t){let e=String(t||"").trim();if(!e)return"";let r=e.match(/#(?:[0-9a-f]{3,8})\b/i);if(r)return r[0].toLowerCase();let n=e.match(/rgba?\([^)]*\)/i);if(n)return n[0];let o=e.match(/hsla?\([^)]*\)/i);return o?o[0]:""}function Fi(t=""){let e=String(t||"").trim();if(!e||typeof window>"u"||typeof document>"u")return"";let r=document.documentElement;if(!r)return"";let n=window.getComputedStyle(r);return String(n.getPropertyValue(e)||"").trim()}function Pi(t=""){let e=String(t||"").trim(),r=ee(e);if(r)return r;let n=e.match(/var\(\s*(--[^\s,)]+)\s*(?:,[^)]+)?\)/i);if(!n)return"";let o=Fi(n[1]);return ee(o)}function Ni(t=""){let e=String(t||"").trim();if(!e)return"";let r=e.split(":").pop()||e;if(r==="bg-white")return"#ffffff";if(r==="bg-black")return"#000000";let n=r.match(/^bg-black\/(\d{1,3})$/i);if(n)return`rgba(0,0,0,${Math.max(0,Math.min(100,Number(n[1])))/100})`;let o=r.match(/^bg-\[([^\]]+)\]$/i);if(o)return ee(o[1]);let a=r.match(/^bg-([a-z]+)-(\d{2,3})$/i);if(!a)return"";let i=Ye(a[1],a[2]);return i?Pi(i):""}function Fn(t=""){return String(t||"").split(/\s+/).map(r=>r.trim()).filter(Boolean).map(r=>Ni(r)).filter(Boolean)}function ji(t=""){let e=[],r=String(t||""),n=/([^{}]+)\{([^{}]*)\}/g,o=n.exec(r);for(;o;){let a=String(o[1]||"").trim(),i=String(o[2]||"").trim();a&&i&&e.push({selector:a,body:i}),o=n.exec(r)}return e}function Oi(t=""){let e=String(t||"").toLowerCase();return e?/(^|\s|,)(html|body|:root|main)(\s|,|$)|#app\b|#root\b|\.app\b|\.page\b/.test(e):!1}function Bi(t=""){let e=String(t||"").trim().match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)/i);if(!e)return null;let r=Number.parseFloat(e[1]),n=Number.parseFloat(e[2]),o=Number.parseFloat(e[3]),a=e[4]==null?1:Number.parseFloat(e[4]);return[r,n,o,a].every(i=>Number.isFinite(i))?{r:Math.max(0,Math.min(255,r)),g:Math.max(0,Math.min(255,n)),b:Math.max(0,Math.min(255,o)),a:Math.max(0,Math.min(1,a))}:null}function Di(t=""){let e=String(t||"").trim().match(/^#([0-9a-f]{3,8})$/i);if(!e)return null;let r=e[1].toLowerCase();if(r.length===3){let[n,o,a]=r.split("");return{r:Number.parseInt(`${n}${n}`,16),g:Number.parseInt(`${o}${o}`,16),b:Number.parseInt(`${a}${a}`,16),a:1}}return r.length===6||r.length===8?{r:Number.parseInt(r.slice(0,2),16),g:Number.parseInt(r.slice(2,4),16),b:Number.parseInt(r.slice(4,6),16),a:r.length===8?Number.parseInt(r.slice(6,8),16)/255:1}:null}function On(t=""){let e=ee(t);return e?e.startsWith("#")?Di(e):e.startsWith("rgb")?Bi(e):null:null}function Hi(t){if(!t)return null;let e=a=>{let i=Number(a)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4},r=e(t.r),n=e(t.g),o=e(t.b);return .2126*r+.7152*n+.0722*o}function Pn(t=""){let e=String(t||"").trim().toLowerCase();if(!e||e==="transparent")return!0;let r=On(e);return r&&Number.isFinite(r.a)?r.a<=.04:!1}function Wi(t=[],e=[]){let r=t.map(d=>ee(d)).filter(d=>d&&!Pn(d)),n=Je(r);if(n)return{color:n,source:"root"};let o=e.map(d=>ee(d)).filter(d=>d&&!Pn(d)),a=o.filter(d=>{let l=On(d),p=Hi(l);return Number.isFinite(p)?p>=.72:!1}),i=Je(a);if(i)return{color:i,source:"fallback-bright"};let s=Je(o);return s?{color:s,source:"fallback"}:{color:"",source:"none"}}function Ee(t,e=new Map){let r=String(t||""),n=/([a-z-]+)\s*:\s*([^;{}]+)/gi,o=n.exec(r);for(;o;){let a=String(o[1]||"").trim().toLowerCase(),i=String(o[2]||"").trim();a&&i&&(e.has(a)||e.set(a,[]),e.get(a).push(i)),o=n.exec(r)}return e}function Ui(t=""){let e=String(t||""),r=new Map,n=[],o=[],a=[],i=[],s=[],d=[],l=[],p=/#(?:[0-9a-f]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi,c=u=>{(String(u||"").match(p)||[]).forEach(g=>{let x=ee(g);x&&n.push(x)})};if(typeof DOMParser<"u"&&jn(e))try{let y=new DOMParser().parseFromString(e,"text/html");Array.from(y.querySelectorAll("style")).map(v=>v.textContent||"").forEach(v=>{Ee(v,r),c(v),ji(v).forEach(m=>{if(!Oi(m.selector))return;let S=Ee(m.body,new Map),C=X(S,["background","background-color"]).map(T=>ee(T)).filter(Boolean);o.push(...C)})}),Array.from(y.querySelectorAll("[style]")).forEach(v=>{let m=v.getAttribute("style")||"";Ee(m,r),c(m)}),["html","body","main","#app","#root",".app",".page"].forEach(v=>{let m=y.querySelector(v);if(!m)return;let S=m.getAttribute("style")||"";if(!S)return;let C=Ee(S,new Map),T=X(C,["background","background-color"]).map(z=>ee(z)).filter(Boolean);o.push(...T);let I=Fn(m.getAttribute("class")||"");a.push(...I)}),Array.from(y.querySelectorAll("[class]")).forEach(v=>{let m=ae(v.getAttribute("class")||"");d.push(...m);let S=Fn(v.getAttribute("class")||"");i.push(...S);let C=String(v.tagName||"").toLowerCase(),T=C==="button"||C==="a",I=m.some(z=>/^bg-/.test(String(ie(z).base||"")));T&&I&&S.length&&s.push(...S)});let h=y.body?.textContent||"";h.trim()&&l.push(h),c(y.documentElement?.outerHTML||e)}catch{Ee(e,r),c(e),l.push(e)}else Ee(e,r),c(e),l.push(e);return{declarations:r,colorValues:n,rootBackgroundColors:o,rootClassBackgroundColors:a,classBackgroundColors:i,buttonBackgroundColors:s,classTokens:d,textCorpus:l.join(`
`)}}function Je(t=[]){let e=new Map;t.forEach(o=>{let a=String(o||"").trim();a&&e.set(a,(e.get(a)||0)+1)});let r="",n=-1;return e.forEach((o,a)=>{o>n&&(r=a,n=o)}),r}function X(t,e=[]){return e.flatMap(r=>t.get(r)||[])}function qi(t,e){if(!t||!e)return null;let r=String(e).split(".").filter(Boolean),n=t;for(let o of r){if(!n||n.type!=="object"||!n.properties||typeof n.properties!="object")return null;n=n.properties[o]}return n||null}function Vi(t={}){let e=t&&typeof t=="object"?t:{},r=w?.configRelations&&typeof w.configRelations=="object"?w.configRelations:{},n=new Set(Object.keys(r)),o=null;if(typeof w?.buildConfigFormSchema=="function")try{o=w.buildConfigFormSchema(e)?.schema||null}catch{o=null}return!o&&w?.configFormSchema?.schema&&(o=w.configFormSchema.schema),{design:e,schema:o,allowedPaths:n}}function Gi(t,e){if(!t)return e;if(Array.isArray(t.oneOf)&&t.oneOf.length){let r=t.oneOf.map(n=>n?.const).filter(n=>n!=null);if(r.length){if(typeof e=="string"){let n=r.find(o=>String(o).toLowerCase()===e.toLowerCase());if(n!==void 0)return n}if(typeof e=="number"){let n=r.map(o=>Number(o)).filter(o=>Number.isFinite(o));if(n.length)return n.reduce((o,a)=>Math.abs(a-e)<Math.abs(o-e)?a:o,n[0])}return r[0]}}if(t.type==="number"||t.type==="integer"){let r=Number(e);return Number.isFinite(r)?t.type==="integer"?Math.round(r):r:void 0}return t.type==="boolean"?!!e:t.type==="string"?String(e||"").trim():e}function Ki(t,e,r){let n=String(e||"").split(".").filter(Boolean);if(!n.length)return;let o=t;for(let a=0;a<n.length;a+=1){let i=n[a];if(a===n.length-1){o[i]=r;return}(!o[i]||typeof o[i]!="object"||Array.isArray(o[i]))&&(o[i]={}),o=o[i]}}function W(t,e,r){if(r==null||r===""||t.allowedPaths.size&&!t.allowedPaths.has(e))return;let n=qi(t.schema,e),o=Gi(n,r);o==null||o===""||(Ki(t.patch,e,o),t.inferredPaths.add(e))}function he(t=[]){let e=t.map(n=>_i(n)).filter(n=>Number.isFinite(n));if(!e.length)return null;e.sort((n,o)=>n-o);let r=Math.floor(e.length/2);return e.length%2?e[r]:(e[r-1]+e[r])/2}function Ji(t=[]){let e=t.map(r=>String(r||"").split(",")[0]||"").map(r=>r.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean);return Je(e)}function Yi(t){let e=Number(t);return Number.isFinite(e)?e<=.75?"hairline":e<=1.5?"thin":e<=2.5?"medium":"thick":"thin"}function Xi(t=""){let r=String(ie(t).base||"").toLowerCase().match(/^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(!r)return null;let n=r[1]||"DEFAULT",o={none:0,xs:2,sm:4,DEFAULT:6,md:8,lg:12,xl:16,"2xl":24,"3xl":32};return n==="full"?null:Number.isFinite(o[n])?o[n]:null}function Zi(t=[]){let e=t.map(n=>Xi(n)).filter(n=>Number.isFinite(n));if(!e.length)return null;e.sort((n,o)=>n-o);let r=Math.floor(e.length/2);return e.length%2?e[r]:(e[r-1]+e[r])/2}function hr(t={}){let e=String(t.html||"");if(!e.trim())return H({source:"html-inference",type:String(t.sourceType||"design-inference"),confidence:0,issues:[{severity:"warning",message:"No HTML or guideline text provided for design extraction."}],designPatch:{},meta:{extractedPathCount:0,extractedPaths:[]}});let r=Vi(t.config||{}),n=Ui(e),o={patch:{},inferredPaths:new Set,allowedPaths:r.allowedPaths,schema:r.schema},a=X(n.declarations,["color"]).map(G=>ee(G)).filter(Boolean),i=X(n.declarations,["background","background-color"]).map(G=>ee(G)).filter(Boolean),s=[...i,...a,...n.colorValues].filter(Boolean),d=Array.from(new Set(s)),l=[...n.rootBackgroundColors||[]],p=[...n.rootClassBackgroundColors||[]],c=l.length?l:p,u=[...i,...n.classBackgroundColors||[]],y=Wi(c,u),g=y.color;W(o,"colors.background",g||i[0]||d[0]);let x=d.filter(G=>G&&G!==g),f=Je(n.buttonBackgroundColors||[])||x[0]||d[0],h=x.filter(G=>G&&G!==f);W(o,"colors.primary",f),W(o,"colors.secondary",h[0]||f||d[0]),W(o,"colors.accent",h[1]||h[0]||f||d[0]);let v=X(n.declarations,["font-family"]),m=Ji(v);W(o,"typography.fontFamilyBody",m),W(o,"typography.fontFamilyHeadings",m),W(o,"typography.fontFamilyMono",/mono|code/i.test(n.textCorpus)?"JetBrains Mono":"");let S=X(n.declarations,["font-size"]),C=he(S);W(o,"typography.baseSize",C);let T=X(n.declarations,["padding","padding-top","padding-right","padding-bottom","padding-left","margin","margin-top","margin-right","margin-bottom","margin-left","gap","row-gap","column-gap"]),I=he(T);W(o,"spatialRhythm.baseUnit",I),W(o,"spatialRhythm.inputPadding",I),W(o,"spatialRhythm.buttonPadding",I);let z=X(n.declarations,["border-radius"]),E=he(z)||Zi(n.classTokens||[]);W(o,"shape.radiusSize",E);let P=X(n.declarations,["border-width","border-top-width","border-right-width","border-bottom-width","border-left-width"]),M=he(P);W(o,"shape.borderWidth",Yi(M));let k=X(n.declarations,["max-width"]),L=he(k);W(o,"layout.containerMaxWidth",L),W(o,"layout.maxWidth",L);let A=X(n.declarations,["min-height","height"]),R=he(A);W(o,"layout.buttonMinHeight",R),W(o,"layout.inputMinHeight",R);let O=X(n.declarations,["transition-duration"]),B=he(O.map(G=>{let Ie=String(G||"").trim().toLowerCase(),ce=Number.parseFloat(Ie);return Number.isFinite(ce)?Ie.endsWith("ms")?ce:Ie.endsWith("s")?ce*1e3:ce:null}));W(o,"behavior.transitionSpeed",B);let N=X(n.declarations,["box-shadow"]).length>0;W(o,"layers.baseShadowOpacity",N?.2:.08);let D=Array.from(o.inferredPaths),Y=D.reduce((G,Ie)=>{let ce=Ie.split(".")[0];return G[ce]=(G[ce]||0)+1,G},{}),Re=D.length?Math.min(.92,.35+D.length*.02):.25;return H({source:"html-inference",type:String(t.sourceType||"design-inference"),confidence:Re,issues:D.length?[]:[{severity:"warning",message:"Could not infer enough design signals from input."}],designPatch:o.patch,meta:{extractedPathCount:D.length,extractedPaths:D,categoryCoverage:Y,colorSampleSize:d.length,backgroundInference:{source:y.source,candidates:{root:c.length,declaration:i.length,classBased:(n.classBackgroundColors||[]).length}}}})}function Bn(t={}){let e=String(t.input||"").trim(),r=String(t.sourceType||"unknown");if(!e)return H({source:r,type:r,confidence:0,issues:[{severity:"error",message:"No input provided."}],meta:{conversionMode:"none"}});if(jn(e)){let n=Mt({html:e,config:t.config||{}});return H({source:r,type:r,confidence:n.confidence,issues:n.issues,template:n.template,meta:{...n.meta||{},conversionMode:"html-to-pds"}})}return H({source:r,type:r,confidence:.48,issues:[{severity:"info",message:"Input is not HTML; generated text-based preview template."}],template:{id:`${r}-text-import`,name:"Imported Guideline Text",html:`<article class="card surface-base stack-sm"><h3>Imported Guidelines</h3><pre>${Ii(e)}</pre></article>`},meta:{conversionMode:"text-preview"}})}function Mt(t={}){let e=String(t.html||"").trim();if(!e)return H({source:"tailwind",type:"tailwind-html",confidence:0,issues:[{severity:"error",message:"No HTML provided."}]});let r=Ai(e,{config:t.config||{}});return H({source:"tailwind",type:"tailwind-html",confidence:r.confidence,issues:r.issues,template:{id:"tailwind-import",name:"Converted Tailwind Markup",html:r.html},meta:r.meta})}function br(t={}){let e=String(t.text||"").trim();if(!e)return H({source:"brand",type:"brand-guidelines",confidence:0,issues:[{severity:"error",message:"No brand guideline text provided."}]});let r=Ri(e),n={colors:{},typography:{}},o=[];return r?n.colors.primary=r:o.push({severity:"warning",message:"No HEX color found; primary color was not inferred."}),/serif/i.test(e)&&(n.typography.fontFamilyBody="Georgia, serif"),/sans[-\s]?serif/i.test(e)&&(n.typography.fontFamilyBody="Inter, Arial, sans-serif"),/mono|monospace/i.test(e)&&(n.typography.fontFamilyMono="JetBrains Mono, monospace"),H({source:"brand",type:"brand-guidelines",confidence:r?.68:.52,issues:o,designPatch:n,meta:{inferred:{primaryColor:r}}})}var yr="convert-only",Dn="adopt-design-and-convert";function Qi(t){return String(t||"").trim().toLowerCase()===Dn?Dn:yr}function Hn(...t){let e=t.flat().filter(Boolean);if(!e.length)return[];let r=new Set;return e.filter(n=>{let o=`${String(n?.severity||"info")}::${String(n?.path||"")}::${String(n?.message||"")}`;return r.has(o)?!1:(r.add(o),!0)})}function Wn(t=[]){let e=t.map(r=>Number(r)).filter(r=>Number.isFinite(r));return e.length?Math.max(0,Math.min(1,e.reduce((r,n)=>r+n,0)/e.length)):0}function Xe(t={},e={}){return{...t&&typeof t=="object"?t:{},...e&&typeof e=="object"?e:{}}}function Vn(t={},e={}){if(!e||typeof e!="object")return t;let r=Array.isArray(t)?[...t]:{...t};return Object.entries(e).forEach(([n,o])=>{o&&typeof o=="object"&&!Array.isArray(o)?r[n]=Vn(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o}),r}function Un(t){if(typeof structuredClone=="function")try{return structuredClone(t)}catch{}return JSON.parse(JSON.stringify(t||{}))}function es(t={}){let e=Number(t?.ratio),r=Number(t?.min),n=Number.isFinite(e)?e.toFixed(2):"n/a",o=Number.isFinite(r)?r.toFixed(2):"n/a";return{severity:"error",path:String(t?.path||"/colors"),message:`${String(t?.message||"Color contrast validation failed.")} (ratio=${n}, required=${o})`}}function qn(t={},e={},r={}){if(!(e&&typeof e=="object"?Object.keys(e):[]).length)return{ok:!0,blocked:!1,issues:[],report:{ok:!0,issues:[]}};let o=Number(r.minContrast),a=Number.isFinite(o)?o:4.5,i=Vn(Un(t||{}),Un(e||{})),s=Ir(i,{minContrast:a,minMutedContrast:3,extendedChecks:!0}),d=Array.isArray(s?.issues)?s.issues.map(l=>es(l)):[];return{ok:!!s?.ok,blocked:!s?.ok,issues:d,report:{ok:!!s?.ok,minContrast:a,issues:Array.isArray(s?.issues)?s.issues:[]}}}function ts(){return[{id:"template",name:"Templates"},{id:"tailwind-html",name:"Tailwind HTML"},{id:"brand-guidelines",name:"Brand Guidelines"},{id:"figma-json",name:"Figma Tokens JSON (planned)"},{id:"ux-pilot",name:"UX Pilot (planned)"},{id:"google-stitch",name:"Google Stitch (planned)"}]}async function rs(t={}){let e=String(t.sourceType||""),r=Qi(t.importMode),n=String(t.input||""),o=t.config||null;if(e==="template"){let a=cn(t.templateId,t);return a.meta=Xe(a.meta,{importMode:r}),a}if(e==="tailwind-html"){let a=Mt({html:n,config:o});if(r===yr)return a.meta=Xe(a.meta,{importMode:r}),a;let i=hr({html:n,config:o,sourceType:e}),s=qn(o||{},i.designPatch||{}),d=s.blocked?{}:i.designPatch,l=s.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...s.issues]:[];return H({source:a.source||"tailwind",type:e,confidence:Wn([a.confidence,i.confidence]),issues:Hn(a.issues,i.issues,l),template:a.template,designPatch:d,meta:Xe(a.meta,{importMode:r,inference:i.meta,validation:s.report,validationBlocked:s.blocked})})}if(e==="brand-guidelines"){let a=Bn({input:n,sourceType:e,config:o});if(r===yr)return a.meta=Xe(a.meta,{importMode:r}),a;let i=br({text:n}),s=hr({html:n,config:o,sourceType:e}),d={...i.designPatch&&typeof i.designPatch=="object"?i.designPatch:{},...s.designPatch&&typeof s.designPatch=="object"?s.designPatch:{}},l=qn(o||{},d||{}),p=l.blocked?{}:d,c=l.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...l.issues]:[];return H({source:"brand",type:e,confidence:Wn([a.confidence,i.confidence,s.confidence]),issues:Hn(a.issues,i.issues,s.issues,c),template:a.template,designPatch:p,meta:Xe(a.meta,{importMode:r,inference:s.meta,brandHeuristics:i.meta,validation:l.report,validationBlocked:l.blocked})})}return e==="figma-json"||e==="ux-pilot"||e==="google-stitch"?H({source:e,type:e,confidence:0,issues:[{severity:"info",message:`${e} adapter is not implemented yet in this phase.`}],meta:{importMode:r}}):H({source:e||"unknown",type:"unknown",confidence:0,issues:[{severity:"error",message:"Unsupported import source type."}],meta:{importMode:r}})}var ns="pds-live-import-history";var ne="imports",Et=null;function os(){return typeof globalThis<"u"&&typeof globalThis.indexedDB<"u"}function te(t){return typeof t=="string"?t:""}function At(t){return Array.isArray(t)?t:[]}function Tt(t){return t&&typeof t=="object"?t:{}}function Rt(){return os()?Et||(Et=new Promise((t,e)=>{let r=globalThis.indexedDB.open(ns,1);r.onupgradeneeded=()=>{let n=r.result;if(!n.objectStoreNames.contains(ne)){let o=n.createObjectStore(ne,{keyPath:"id",autoIncrement:!0});o.createIndex("createdAt","createdAt",{unique:!1}),o.createIndex("sourceType","sourceType",{unique:!1}),o.createIndex("fileName","fileName",{unique:!1})}},r.onsuccess=()=>t(r.result),r.onerror=()=>e(r.error||new Error("Failed to open import history database."))}),Et):Promise.resolve(null)}function It(t){return new Promise((e,r)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>r(t.error||new Error("IndexedDB operation failed."))})}function as(t={}){let e=Date.now(),r=Number.isFinite(Number(t.createdAt))?Number(t.createdAt):e,n=new Date(r).toISOString(),o=At(t.issues).map(d=>({severity:te(d?.severity||"info"),message:te(d?.message||"")})),a=At(t.notes).filter(d=>typeof d=="string"),i=At(t.unknownTailwindTokens).filter(d=>typeof d=="string"),s=At(t.appliedRules).filter(d=>typeof d=="string");return{createdAt:r,createdAtIso:n,sourceType:te(t.sourceType||"unknown"),importMode:te(t.importMode||"convert-only"),source:te(t.source||"unknown"),type:te(t.type||"unknown"),fileName:te(t.fileName||""),fileSize:Number.isFinite(Number(t.fileSize))?Number(t.fileSize):0,mimeType:te(t.mimeType||""),fileContents:te(t.fileContents||""),convertedHtml:te(t.convertedHtml||""),confidence:Number.isFinite(Number(t.confidence))?Number(t.confidence):0,notes:a,issues:o,coverage:Tt(t.coverage),unknownTailwindTokens:i,appliedRules:s,importStyleSheetInjected:!!t.importStyleSheetInjected,templateName:te(t.templateName||""),designPatch:Tt(t.designPatch),meta:Tt(t.meta),resultSnapshot:Tt(t.resultSnapshot)}}async function is(t={}){let e=await Rt();if(!e)return null;let r=as(t),o=e.transaction(ne,"readwrite").objectStore(ne);return{id:await It(o.add(r)),...r}}async function ss(t={}){let e=await Rt();if(!e)return[];let r=Number.isFinite(Number(t.limit))?Math.max(1,Number(t.limit)):30,o=e.transaction(ne,"readonly").objectStore(ne);return(await It(o.getAll())||[]).sort((i,s)=>Number(s?.createdAt||0)-Number(i?.createdAt||0)).slice(0,r)}async function ls(t){let e=await Rt();if(!e)return null;let r=Number(t);if(!Number.isFinite(r))return null;let o=e.transaction(ne,"readonly").objectStore(ne);return await It(o.get(r))||null}async function cs(){let t=await Rt();if(!t)return;let r=t.transaction(ne,"readwrite").objectStore(ne);await It(r.clear())}export{cs as clearLiveImportHistory,br as convertBrandGuidelinesToPatch,Mt as convertTailwindHtmlToPds,H as createImportResult,Ti as describeTailwindConversionRules,ls as getLiveImportHistoryEntry,ts as getLiveImportSources,fa as isImportResult,ss as listLiveImportHistory,ln as listLiveTemplates,Yr as loadGoogleFont,ht as loadLiveTemplateCatalog,rs as runLiveImport,is as saveLiveImportHistory,pa as startLive};
