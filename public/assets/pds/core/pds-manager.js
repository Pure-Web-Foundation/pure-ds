var qn=Object.defineProperty;var _t=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ft=(e,t)=>{for(var r in t)qn(e,r,{get:t[r],enumerable:!0})};var br={};Ft(br,{enums:()=>x});var x,Fe=_t(()=>{x={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"},IconSizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64,"3xl":96}}});var Tr={};Ft(Tr,{default:()=>no,findComponentForElement:()=>Xn,getAllSelectors:()=>Qn,getAllTags:()=>ro,getByCategory:()=>to,ontology:()=>q,searchOntology:()=>eo});function de(e,t){if(!e||!t)return!1;try{return e.matches(t)}catch{return!1}}function Er(e,t){if(!e||!t||!e.closest)return null;try{return e.closest(t)}catch{return null}}function Xn(e,{maxDepth:t=5}={}){if(!e||e.closest&&e.closest(".showcase-toc"))return null;let r=e,n=0;for(;r&&n<t;){if(n++,r.tagName==="DS-SHOWCASE")return null;if(r.classList&&r.classList.contains("showcase-section")){r=r.parentElement;continue}for(let a of PDS.ontology.enhancements){let i=a.selector||a;if(de(r,i))return{element:r,componentType:"enhanced-component",displayName:a.description||i,id:a.id}}if(r.tagName==="FIELDSET"){let a=r.getAttribute("role");if(a==="group"||a==="radiogroup")return{element:r,componentType:"form-group",displayName:a==="radiogroup"?"radio group":"form group"}}if(r.tagName==="LABEL"&&r.querySelector&&r.querySelector("input,select,textarea"))return{element:r,componentType:"form-control",displayName:"label with input"};let o=r.closest?r.closest("label"):null;if(o&&o.querySelector&&o.querySelector("input,select,textarea"))return{element:o,componentType:"form-control",displayName:"label with input"};for(let a of PDS.ontology.primitives){for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let c=s.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(u=>u.startsWith(c)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let d=r.parentElement,l=0;for(;d&&l<t;){if(d.classList&&Array.from(d.classList).some(u=>u.startsWith(c))&&d.tagName!=="DS-SHOWCASE")return{element:d,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};d=d.parentElement,l++}continue}continue}if(de(r,s))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let p=Er(r,s);if(p&&p.tagName!=="DS-SHOWCASE")return{element:p,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.classList){let i=Array.from(r.classList);for(let s of a.selectors||[])if(typeof s=="string"&&s.includes("*")&&s.startsWith(".")){let p=s.slice(1).replace(/\*/g,"");if(i.some(c=>c.startsWith(p)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}}}for(let a of PDS.ontology.layoutPatterns||[])for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let c=s.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(d=>d.startsWith(c)))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}continue}if(de(r,s))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags};let p=Er(r,s);if(p&&p.tagName!=="DS-SHOWCASE")return{element:p,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.tagName&&r.tagName.includes("-")){let a=r.tagName.toLowerCase(),i=PDS.ontology.components.find(s=>s.selectors.includes(a));return{element:r,componentType:"web-component",displayName:i?.name||a,id:i?.id||a,tags:i?.tags}}if(r.tagName==="BUTTON"){let a=r.querySelector&&r.querySelector("pds-icon");return{element:r,componentType:"button",displayName:a?"button with icon":"button",id:"button"}}if(de(r,"pds-icon")||r.closest&&r.closest("pds-icon")){let a=de(r,"pds-icon")?r:r.closest("pds-icon");return{element:a,componentType:"icon",displayName:`pds-icon (${a.getAttribute&&a.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(de(r,"nav[data-dropdown]")||r.closest&&r.closest("nav[data-dropdown]"))return{element:de(r,"nav[data-dropdown]")?r:r.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};r=r.parentElement}return null}function Qn(){let e=[];for(let t of PDS.ontology.primitives)e.push(...t.selectors||[]);for(let t of PDS.ontology.components)e.push(...t.selectors||[]);for(let t of PDS.ontology.layoutPatterns||[])e.push(...t.selectors||[]);return Array.from(new Set(e))}function eo(e,t={}){let r=e.toLowerCase(),n=[],o=(a,i)=>{for(let s of a)(s.id?.toLowerCase().includes(r)||s.name?.toLowerCase().includes(r)||s.description?.toLowerCase().includes(r)||s.tags?.some(c=>c.toLowerCase().includes(r))||s.category?.toLowerCase().includes(r)||s.selectors?.some(c=>c.toLowerCase().includes(r)))&&n.push({...s,type:i})};return(!t.type||t.type==="primitive")&&o(q.primitives,"primitive"),(!t.type||t.type==="component")&&o(q.components,"component"),(!t.type||t.type==="layout")&&o(q.layoutPatterns,"layout"),(!t.type||t.type==="enhancement")&&o(q.enhancements,"enhancement"),n}function to(e){let t=e.toLowerCase();return{primitives:q.primitives.filter(r=>r.category===t),components:q.components.filter(r=>r.category===t),layouts:q.layoutPatterns.filter(r=>r.category===t)}}function ro(){let e=new Set;return q.primitives.forEach(t=>t.tags?.forEach(r=>e.add(r))),q.components.forEach(t=>t.tags?.forEach(r=>e.add(r))),q.layoutPatterns.forEach(t=>t.tags?.forEach(r=>e.add(r))),q.enhancements.forEach(t=>t.tags?.forEach(r=>e.add(r))),Array.from(e).sort()}var q,no,Ot=_t(()=>{q={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"callout",name:"Callout",description:"Contextual information and notification messages",selectors:[".callout",".callout-info",".callout-success",".callout-warning",".callout-danger",".callout-error",".callout-dismissible"],tags:["feedback","message","notification","status","information"],category:"feedback"},{id:"empty-state",name:"Empty State",description:"Empty state layout for missing data or onboarding",selectors:[".empty-state"],tags:["empty","no-data","zero","placeholder","onboarding","state"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-danger",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-fab",name:"FAB",description:"Floating Action Button with expandable satellite actions",selectors:["pds-fab"],tags:["button","action","floating","interactive"],category:"action"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-live-edit",name:"Live Edit",description:"Contextual live editing for PDS design settings",selectors:["pds-live-edit"],tags:["editor","live","config","tooling"],category:"tooling"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element",tags:["menu","interactive","navigation"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"color-input",selector:"label[data-color]",description:"Enhanced color input with swatch shell and hex output",tags:["color","input","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["callout","badge","empty-state"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]},action:{description:"Interactive actions and buttons",primitives:["button"],components:["pds-fab"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],empty:["empty-state","placeholder","zero","no-data","onboarding","callout","card","icon","button"],"empty state":["empty-state","empty","no-data","zero","onboarding"],"no data":["empty-state","empty","zero","placeholder"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-danger","btn-working","pds-fab","floating"],btn:["button","interactive","action","pds-fab"],fab:["pds-fab","floating","button","action","menu"],floating:["fab","pds-fab","button","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],callout:["notification","feedback","message","status","toast","information","alert","warning","error","info","success","danger"],alert:["callout","notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["callout","toast","pds-toaster","feedback","message","popup","alert"],toast:["pds-toaster","notification","callout","feedback","popup","snackbar","alert"],feedback:["callout","notification","toast","status","badge","validation","error","success","alert"],message:["callout","notification","feedback","dialog","toast","alert"],status:["badge","callout","indicator","feedback","state","alert"],error:["callout","danger","validation","feedback","warning","alert"],success:["callout","feedback","badge","status","check","alert"],warning:["callout","caution","feedback","status","alert"],info:["callout","information","feedback","status","alert"],danger:["callout","error","feedback","destructive","delete","alert"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};no=q});var ct={};Ft(ct,{deepMerge:()=>Zr,fragmentFromTemplateLike:()=>Xo,isObject:()=>lt,parseHTML:()=>rr});function lt(e){return e&&typeof e=="object"&&!Array.isArray(e)}function Zr(e,t){let r={...e};return lt(e)&&lt(t)&&Object.keys(t).forEach(n=>{lt(t[n])?n in e?r[n]=Zr(e[n],t[n]):Object.assign(r,{[n]:t[n]}):Object.assign(r,{[n]:t[n]})}),r}function Xo(e){let t=Array.isArray(e?.strings)?e.strings:[],r=Array.isArray(e?.values)?e.values:[],n=new Set,o=[],a=/(\s)(\.[\w-]+)=\s*$/;for(let l=0;l<t.length;l+=1){let u=t[l]??"",g=u.match(a);if(g&&l<r.length){let v=g[2].slice(1),f=`pds-val-${l}`;u=u.replace(a,`$1data-pds-prop="${v}:${f}"`),n.add(l)}o.push(u),l<r.length&&!n.has(l)&&o.push(`<!--pds-val-${l}-->`)}let i=document.createElement("template");i.innerHTML=o.join("");let s=(l,u)=>{let g=l.parentNode;if(!g)return;if(u==null){g.removeChild(l);return}let m=v=>{if(v!=null){if(v instanceof Node){g.insertBefore(v,l);return}if(Array.isArray(v)){v.forEach(f=>m(f));return}g.insertBefore(document.createTextNode(String(v)),l)}};m(u),g.removeChild(l)},p=document.createTreeWalker(i.content,NodeFilter.SHOW_COMMENT),c=[];for(;p.nextNode();){let l=p.currentNode;l?.nodeValue?.startsWith("pds-val-")&&c.push(l)}return c.forEach(l=>{let u=Number(l.nodeValue.replace("pds-val-",""));s(l,r[u])}),i.content.querySelectorAll("*").forEach(l=>{let u=l.getAttribute("data-pds-prop");if(!u)return;let[g,m]=u.split(":"),v=Number(String(m).replace("pds-val-",""));g&&Number.isInteger(v)&&(l[g]=r[v]),l.removeAttribute("data-pds-prop")}),i.content}function rr(e){return new DOMParser().parseFromString(e,"text/html").body.childNodes}var nr=_t(()=>{});Fe();var re="any",Ie={type:"object",allowUnknown:!1,properties:{id:{type:"string",minLength:1,maxLength:64},name:{type:"string",minLength:1,maxLength:80},tags:{type:"array",uniqueItems:!0,items:{type:"string"}},themes:{type:"array",uniqueItems:!0,items:{type:"string",oneOf:[{const:"light",title:"Light"},{const:"dark",title:"Dark"},{const:"system",title:"System"}]}},description:{type:"string",maxLength:500},options:{type:"object",allowUnknown:!0,properties:{liquidGlassEffects:{type:"boolean"},backgroundMesh:{type:"number"}}},form:{type:"object",allowUnknown:!0,properties:{options:{type:"object",allowUnknown:!0,properties:{widgets:{type:"object",allowUnknown:!1,properties:{booleans:{type:"string"},numbers:{type:"string"},selects:{type:"string"}}},layouts:{type:"object",allowUnknown:!1,properties:{fieldsets:{type:"string"},arrays:{type:"string"}}},enhancements:{type:"object",allowUnknown:!1,properties:{icons:{type:"boolean"},datalists:{type:"boolean"},rangeOutput:{type:"boolean"},colorInput:{type:"boolean"}}},validation:{type:"object",allowUnknown:!1,properties:{showErrors:{type:"boolean"},validateOnChange:{type:"boolean"}}}}}}},colors:{type:"object",allowUnknown:!1,properties:{primary:{type:"string",relations:{tokens:["--color-primary-*","--color-primary-fill","--color-primary-text","--background-mesh-*"]}},secondary:{type:"string",relations:{tokens:["--color-secondary-*","--color-gray-*","--background-mesh-*"]}},accent:{type:"string",relations:{tokens:["--color-accent-*","--background-mesh-*"]}},background:{type:"string",relations:{tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},success:{type:["string","null"],relations:{tokens:["--color-success-*"]}},warning:{type:["string","null"],relations:{tokens:["--color-warning-*"]}},danger:{type:["string","null"],relations:{tokens:["--color-danger-*"]}},info:{type:["string","null"],relations:{tokens:["--color-info-*"]}},gradientStops:{type:"number"},elevationOpacity:{type:"number",relations:{tokens:["--surface-*-shadow"]}},darkMode:{type:"object",allowUnknown:!1,properties:{background:{type:"string",relations:{theme:"dark",tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},primary:{type:"string",relations:{theme:"dark",tokens:["--color-primary-*","--color-primary-fill","--color-primary-text"]}},secondary:{type:"string",relations:{theme:"dark",tokens:["--color-secondary-*","--color-gray-*"]}},accent:{type:"string",relations:{theme:"dark",tokens:["--color-accent-*"]}}}}}},typography:{type:"object",allowUnknown:!1,properties:{fontFamilyHeadings:{type:"string",relations:{tokens:["--font-family-headings"]}},fontFamilyBody:{type:"string",relations:{tokens:["--font-family-body"]}},fontFamilyMono:{type:"string",relations:{tokens:["--font-family-mono"]}},baseFontSize:{type:"number",relations:{tokens:["--font-size-*"]}},fontScale:{type:"number",relations:{tokens:["--font-size-*"]}},fontWeightLight:{type:["string","number"],relations:{tokens:["--font-weight-light"]}},fontWeightNormal:{type:["string","number"],relations:{tokens:["--font-weight-normal"]}},fontWeightMedium:{type:["string","number"],relations:{tokens:["--font-weight-medium"]}},fontWeightSemibold:{type:["string","number"],relations:{tokens:["--font-weight-semibold"]}},fontWeightBold:{type:["string","number"],relations:{tokens:["--font-weight-bold"]}},lineHeightTight:{type:["string","number"],relations:{tokens:["--font-line-height-tight"]}},lineHeightNormal:{type:["string","number"],relations:{tokens:["--font-line-height-normal"]}},lineHeightRelaxed:{type:["string","number"],relations:{tokens:["--font-line-height-relaxed"]}},letterSpacingTight:{type:"number"},letterSpacingNormal:{type:"number"},letterSpacingWide:{type:"number"}}},spatialRhythm:{type:"object",allowUnknown:!1,properties:{baseUnit:{type:"number",relations:{tokens:["--spacing-*"]}},scaleRatio:{type:"number"},maxSpacingSteps:{type:"number",relations:{tokens:["--spacing-*"]}},containerPadding:{type:"number"},inputPadding:{type:"number",relations:{rules:[{selectors:["input","textarea","select"],properties:["padding"]}]}},buttonPadding:{type:"number",relations:{rules:[{selectors:["button",".btn"],properties:["padding"]}]}},sectionSpacing:{type:"number",relations:{rules:[{selectors:["section"],properties:["margin","padding"]}]}}}},shape:{type:"object",allowUnknown:!1,properties:{radiusSize:{type:["string","number"],relations:{tokens:["--radius-*"]}},customRadius:{type:["string","number","null"]},borderWidth:{type:["string","number"],relations:{tokens:["--border-width-*"]}}}},behavior:{type:"object",allowUnknown:!1,properties:{transitionSpeed:{type:["string","number"],relations:{tokens:["--transition-*"]}},animationEasing:{type:"string"},customTransitionSpeed:{type:["number","null"]},customEasing:{type:["string","null"]},focusRingWidth:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["outline-width","box-shadow"]}]}},focusRingOpacity:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["box-shadow","outline-color"]}]}},hoverOpacity:{type:"number"}}},layout:{type:"object",allowUnknown:!1,properties:{maxWidth:{type:["number","string"],relations:{tokens:["--layout-max-width","--layout-max-width-*"]}},maxWidths:{type:"object",allowUnknown:!1,properties:{sm:{type:["number","string"],relations:{tokens:["--layout-max-width-sm"]}},md:{type:["number","string"],relations:{tokens:["--layout-max-width-md"]}},lg:{type:["number","string"],relations:{tokens:["--layout-max-width-lg"]}},xl:{type:["number","string"],relations:{tokens:["--layout-max-width-xl"]}}}},containerPadding:{type:["number","string"],relations:{tokens:["--layout-container-padding"]}},breakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"number"},md:{type:"number"},lg:{type:"number"},xl:{type:"number"}}},gridColumns:{type:"number"},gridGutter:{type:"number"},densityCompact:{type:"number"},densityNormal:{type:"number"},densityComfortable:{type:"number"},buttonMinHeight:{type:"number"},inputMinHeight:{type:"number"},baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}},utilities:{type:"object",allowUnknown:!0,properties:{grid:{type:"boolean"},flex:{type:"boolean"},spacing:{type:"boolean"},container:{type:"boolean"}}},gridSystem:{type:"object",allowUnknown:!0,properties:{columns:{type:"array",items:{type:"number"}},autoFitBreakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"string"},md:{type:"string"},lg:{type:"string"},xl:{type:"string"}}},enableGapUtilities:{type:"boolean"}}},containerMaxWidth:{type:["number","string"]}}},layers:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},shadowBlurMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowOffsetMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowDepth:{type:"string"},blurLight:{type:"number"},blurMedium:{type:"number"},blurHeavy:{type:"number"},baseZIndex:{type:"number",relations:{tokens:["--z-*"]}},zIndexStep:{type:"number",relations:{tokens:["--z-*"]}},zIndexBase:{type:"number"},zIndexDropdown:{type:"number"},zIndexSticky:{type:"number"},zIndexFixed:{type:"number"},zIndexModal:{type:"number"},zIndexPopover:{type:"number"},zIndexTooltip:{type:"number"},zIndexNotification:{type:"number"},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}}}},advanced:{type:"object",allowUnknown:!0,properties:{linkStyle:{type:"string"},colorDerivation:{type:"string"}}},a11y:{type:"object",allowUnknown:!0,properties:{minTouchTarget:{type:["string","number"]},prefersReducedMotion:{type:"boolean"},focusStyle:{type:"string"}}},icons:{type:"object",allowUnknown:!1,properties:{set:{type:"string"},weight:{type:"string"},defaultSize:{type:"number",relations:{tokens:["--icon-size"]}},sizes:{type:"object",allowUnknown:!0,properties:{xs:{type:["number","string"]},sm:{type:["number","string"]},md:{type:["number","string"]},lg:{type:["number","string"]},xl:{type:["number","string"]},"2xl":{type:["number","string"]}}},spritePath:{type:"string"},externalPath:{type:"string"},include:{type:"object",allowUnknown:!0,properties:{navigation:{type:"array",items:{type:"string"}},actions:{type:"array",items:{type:"string"}},communication:{type:"array",items:{type:"string"}},content:{type:"array",items:{type:"string"}},status:{type:"array",items:{type:"string"}},time:{type:"array",items:{type:"string"}},commerce:{type:"array",items:{type:"string"}},formatting:{type:"array",items:{type:"string"}},system:{type:"array",items:{type:"string"}}}}}},components:{type:"object",allowUnknown:!0},debug:{type:"boolean"}}},Gn={type:"object",allowUnknown:!0,properties:{mode:{type:"string"},preset:{type:"string"},design:Ie,enhancers:{type:["object","array"]},applyGlobalStyles:{type:"boolean"},manageTheme:{type:"boolean"},themeStorageKey:{type:"string"},preloadStyles:{type:"boolean"},criticalLayers:{type:"array",items:{type:"string"}},autoDefine:{type:"object",allowUnknown:!1,properties:{predefine:{type:"array",items:{type:"string"}},mapper:{type:re},enhancers:{type:["object","array"]},scanExisting:{type:"boolean"},observeShadows:{type:"boolean"},patchAttachShadow:{type:"boolean"},debounceMs:{type:"number"},onError:{type:re},baseURL:{type:"string"}}},managerURL:{type:"string"},manager:{type:re},liveEdit:{type:"boolean"},localization:{type:"object",allowUnknown:!1,properties:{locale:{type:"string"},locales:{type:"array",items:{type:"string"}},messages:{type:"object",allowUnknown:!0},provider:{type:re},translate:{type:re},loadLocale:{type:re},setLocale:{type:re}}},log:{type:re}}};function Pe(e){return e===null?"null":Array.isArray(e)?"array":typeof e}function Vn(e,t){if(t===re)return!0;let r=Pe(e);return Array.isArray(t)?t.includes(r):r===t}function Xe(e,t,r,n){if(!t)return;let o=t.type||re;if(!Vn(e,o)){n.push({path:r,expected:o,actual:Pe(e),message:`Expected ${o} but got ${Pe(e)}`});return}if(o==="array"&&t.items&&Array.isArray(e)&&e.forEach((a,i)=>{Xe(a,t.items,`${r}[${i}]`,n)}),o==="object"&&e&&typeof e=="object"){let a=t.properties||{};for(let[i,s]of Object.entries(e)){if(!Object.prototype.hasOwnProperty.call(a,i)){t.allowUnknown||n.push({path:`${r}.${i}`,expected:"known property",actual:"unknown",message:`Unknown property "${i}"`});continue}Xe(s,a[i],`${r}.${i}`,n)}}}function Nt(e,t="",r={}){if(!e||typeof e!="object")return r;if(e.relations&&t&&(r[t]=e.relations),e.type==="object"&&e.properties&&Object.entries(e.properties).forEach(([n,o])=>{let a=t?`${t}.${n}`:n;Nt(o,a,r)}),e.type==="array"&&e.items){let n=`${t}[]`;Nt(e.items,n,r)}return r}var Sr=Nt(Ie,""),$r=Ie,Kn={"colors.primary":{widget:"input-color"},"colors.secondary":{widget:"input-color"},"colors.accent":{widget:"input-color"},"colors.background":{widget:"input-color"},"colors.success":{widget:"input-color"},"colors.warning":{widget:"input-color"},"colors.danger":{widget:"input-color"},"colors.info":{widget:"input-color"},"colors.gradientStops":{min:2,max:8,step:1,widget:"range"},"colors.elevationOpacity":{min:0,max:1,step:.01,widget:"range"},"colors.darkMode.background":{widget:"input-color"},"colors.darkMode.primary":{widget:"input-color"},"colors.darkMode.secondary":{widget:"input-color"},"colors.darkMode.accent":{widget:"input-color"},description:{widget:"textarea",maxLength:500,rows:4,placeholder:"Summarize the visual and interaction intent"},"typography.fontFamilyHeadings":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Heading font stack"},"typography.fontFamilyBody":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Body font stack"},"typography.fontFamilyMono":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Monospace font stack"},"typography.baseFontSize":{min:8,max:32,step:1,widget:"input-range"},"typography.fontScale":{min:1,max:2,step:.01,widget:"range"},"typography.fontWeightLight":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightNormal":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightMedium":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightSemibold":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightBold":{min:100,max:800,step:100,widget:"input-range"},"typography.lineHeightTight":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightNormal":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightRelaxed":{min:.75,max:3,step:.001,widget:"input-range"},"typography.letterSpacingTight":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingNormal":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingWide":{min:-.1,max:.1,step:.001,widget:"range"},"spatialRhythm.baseUnit":{min:1,max:16,step:1,widget:"range"},"spatialRhythm.scaleRatio":{min:1,max:2,step:.01,widget:"range"},"spatialRhythm.maxSpacingSteps":{min:4,max:64,step:1,widget:"range"},"spatialRhythm.containerPadding":{min:0,max:8,step:.05,widget:"range"},"spatialRhythm.inputPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.buttonPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.sectionSpacing":{min:0,max:8,step:.05,widget:"range"},"shape.radiusSize":{oneOf:Object.entries(x.RadiusSizes).map(([e,t])=>({const:t,title:e}))},"shape.borderWidth":{widget:"select",oneOf:Object.entries(x.BorderWidths).map(([e,t])=>({const:t,title:e}))},"shape.customRadius":{min:0,max:64,step:1,widget:"range"},"behavior.transitionSpeed":{oneOf:Object.entries(x.TransitionSpeeds).map(([e,t])=>({const:t,title:e}))},"behavior.animationEasing":{enum:Object.values(x.AnimationEasings)},"behavior.customTransitionSpeed":{min:0,max:1e3,step:10,widget:"range"},"behavior.focusRingWidth":{min:0,max:8,step:1,widget:"range"},"behavior.focusRingOpacity":{min:0,max:1,step:.01,widget:"range"},"behavior.hoverOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.gridColumns":{min:1,max:24,step:1,widget:"range"},"layout.gridGutter":{min:0,max:8,step:.05,widget:"range"},"layout.maxWidth":{widget:"input-text",placeholder:"e.g. 1200 or 1200px"},"layout.maxWidths.sm":{widget:"input-text",placeholder:"e.g. 640 or 640px"},"layout.maxWidths.md":{widget:"input-text",placeholder:"e.g. 768 or 768px"},"layout.maxWidths.lg":{widget:"input-text",placeholder:"e.g. 1024 or 1024px"},"layout.maxWidths.xl":{widget:"input-text",placeholder:"e.g. 1280 or 1280px"},"layout.containerMaxWidth":{widget:"input-text",placeholder:"e.g. 1400px"},"layout.containerPadding":{widget:"input-text",placeholder:"e.g. var(--spacing-6)"},"layout.breakpoints.sm":{min:320,max:2560,step:1,widget:"input-number"},"layout.breakpoints.md":{min:480,max:3200,step:1,widget:"input-number"},"layout.breakpoints.lg":{min:640,max:3840,step:1,widget:"input-number"},"layout.breakpoints.xl":{min:768,max:5120,step:1,widget:"input-number"},"layout.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.densityCompact":{min:.5,max:2,step:.05,widget:"range"},"layout.densityNormal":{min:.5,max:2,step:.05,widget:"range"},"layout.densityComfortable":{min:.5,max:2,step:.05,widget:"range"},"layout.buttonMinHeight":{min:24,max:96,step:1,widget:"range"},"layout.inputMinHeight":{min:24,max:96,step:1,widget:"range"},"layers.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layers.shadowBlurMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.shadowOffsetMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.blurLight":{min:0,max:48,step:1,widget:"range"},"layers.blurMedium":{min:0,max:64,step:1,widget:"range"},"layers.blurHeavy":{min:0,max:96,step:1,widget:"range"},"layers.baseZIndex":{min:0,max:1e4,step:10,widget:"range"},"layers.zIndexStep":{min:1,max:100,step:1,widget:"range"},"layers.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"advanced.linkStyle":{enum:Object.values(x.LinkStyles)},"a11y.minTouchTarget":{oneOf:Object.entries(x.TouchTargetSizes).map(([e,t])=>({const:t,title:e}))},"a11y.focusStyle":{enum:Object.values(x.FocusStyles)},"icons.defaultSize":{min:8,max:128,step:1,widget:"range",icon:"sparkle"}};function yr(e=[]){return e.join(".")}function vr(e=[]){return`/${e.join("/")}`}function Jn(e,t=[]){if(!(!e||typeof e!="object"))return t.reduce((r,n)=>{if(r!=null&&typeof r=="object")return r[n]},e)}function xr(e,t,r=[]){if(e!=null)return e;let n=Jn(t,r);return n??void 0}function Ne(e=""){return String(e).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/^./,t=>t.toUpperCase())}function zr(e,t){if(!e)return"string";let r=e.type||"string";if(Array.isArray(r)){let n=Pe(t);return n!=="undefined"&&r.includes(n)?n:r.includes("string")?"string":r.find(o=>o!=="null")||r[0]||"string"}return r}function Pt(e,t,r=[]){return!e||!t||!Array.isArray(r)||r.forEach(n=>{t[n]!==void 0&&(e[n]=t[n])}),e}function wr(e,t){return Array.isArray(t?.oneOf)&&t.oneOf.length?t.oneOf:Array.isArray(t?.enum)&&t.enum.length?t.enum.map(r=>({const:r,title:Ne(r)})):Array.isArray(e?.oneOf)&&e.oneOf.length?e.oneOf:Array.isArray(e?.enum)&&e.enum.length?e.enum.map(r=>({const:r,title:Ne(r)})):null}function Yn(e){return e&&(e==="range"?"input-range":e)}function Zn(e,t){if(!Array.isArray(t)||!t.length)return e;let r=new Set;for(let n of t)!n||n.const===void 0||r.add(Pe(n.const));if(!r.size)return e;if(r.size===1){let n=Array.from(r)[0];if(n==="number")return"number";if(n==="string")return"string";if(n==="boolean")return"boolean"}return e}function kr(e,t,r){let n=zr(t,r),o=e.toLowerCase(),a={label:Ne(e.split(".").slice(-1)[0]||e)};n==="boolean"&&(a.widget="toggle"),n==="number"&&(a.widget="range",o.includes("opacity")?(a.min=0,a.max=1,a.step=.01):o.includes("lineheight")?(a.min=.75,a.max=3,a.step=.001,a.widget="input-range"):o.includes("fontweight")?(a.min=100,a.max=800,a.step=100,a.widget="input-range"):o.endsWith("basefontsize")?(a.min=8,a.max=32,a.step=1,a.widget="input-range"):o.includes("scale")||o.includes("ratio")?(a.min=1,a.max=2,a.step=.01):(a.min=0,a.max=Math.max(10,Number.isFinite(Number(r))?Number(r)*4:100),a.step=1)),n==="string"&&e.startsWith("colors.")&&(a.widget="input-color"),n==="string"&&o==="description"&&(a.widget="textarea",a.maxLength=500,a.rows=4);let i=Kn[e]||{},s={...a,...i};return s.widget&&(s.widget=Yn(s.widget)),s}function Lr(e,t,r,n,o,a){if(!e||typeof e!="object")return null;let i=xr(t,a,r),s=zr(e,i);if(s==="object"&&e.properties){let b={type:"object",properties:{}};r.length>0&&(b.title=Ne(r[r.length-1]));let k={};for(let[w,$]of Object.entries(e.properties)){let T=t&&typeof t=="object"&&!Array.isArray(t)?t[w]:void 0,A=Lr($,T,[...r,w],n,o,a);A&&(b.properties[w]=A.schema,A.hasValue&&(k[w]=A.value))}return Object.keys(b.properties).length?{schema:b,value:k,hasValue:Object.keys(k).length>0}:null}if(s==="array"){let b=yr(r),k=kr(b,e,t);o[b]=k;let w=xr(t,a,r),$=e.items?.type||"string",T=Array.isArray($)?$[0]:$,A={type:T},F=wr(e?.items,null);if(F&&(A.oneOf=F),T==="string"&&Array.isArray(w)&&w.length>0){let L=w.find(y=>typeof y=="string"&&y.trim().length>0);L&&(A.examples=[L])}Pt(A,e?.items,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","minItems","maxItems","uniqueItems","description","default"]);let I={type:"array",items:A};Pt(I,e,["minItems","maxItems","uniqueItems","description","default"]);let z=vr(r),C={},P=Array.isArray(A.oneOf)&&A.oneOf.length>0;if(T==="string"&&P&&(C["ui:widget"]=I.maxItems===1?"radio":"checkbox-group"),T==="string"&&Array.isArray(w)&&w.length>0){let L=w.filter(y=>typeof y=="string"&&y.trim().length>0).slice(0,5).join(", ");L&&(C["ui:placeholder"]=L)}return Object.keys(C).length&&(n[z]={...n[z]||{},...C}),{schema:I,value:Array.isArray(t)?t:[],hasValue:Array.isArray(t)}}let p=yr(r),c=kr(p,e,i);o[p]=c;let d=wr(e,c),g={type:Zn(s==="null"?"string":s,d),title:c.label||Ne(r[r.length-1]||p)};d&&(g.oneOf=d),Pt(g,e,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","description","default"]),typeof c.maxLength=="number"&&g.maxLength===void 0&&(g.maxLength=c.maxLength),(g.type==="number"||g.type==="integer")&&typeof c.min=="number"&&g.minimum===void 0&&(g.minimum=c.min),(g.type==="number"||g.type==="integer")&&typeof c.max=="number"&&g.maximum===void 0&&(g.maximum=c.max),(g.type==="number"||g.type==="integer")&&typeof c.step=="number"&&g.multipleOf===void 0&&(g.multipleOf=c.step);let m=i;m!==void 0&&(g.examples=[m]);let v=vr(r),f={};return c.widget&&(f["ui:widget"]=c.widget),c.icon&&(f["ui:icon"]=c.icon),typeof c.min=="number"&&(f["ui:min"]=c.min),typeof c.max=="number"&&(f["ui:max"]=c.max),typeof c.step=="number"&&(f["ui:step"]=c.step),c.placeholder&&(f["ui:placeholder"]=c.placeholder),typeof c.rows=="number"&&(f["ui:options"]={...f["ui:options"]||{},rows:c.rows}),c.widget==="input-range"&&m!==void 0&&(f["ui:allowUnset"]=!0),(typeof c.min=="number"||typeof c.max=="number"||typeof c.step=="number")&&(f["ui:options"]={...f["ui:options"]||{},...typeof c.min=="number"?{min:c.min}:{},...typeof c.max=="number"?{max:c.max}:{},...typeof c.step=="number"?{step:c.step}:{}}),Object.keys(f).length&&(n[v]=f),{schema:g,value:t,hasValue:t!==void 0}}function be(e={}){let t={},r={"/colors":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}},"/colors/darkMode":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}}},n=Q?.default&&typeof Q.default=="object"?Q.default:null,o=Lr(Ie,e,[],r,t,n);return{schema:o?.schema||{type:"object",properties:{}},uiSchema:r,values:o?.value||{},metadata:t}}function je(e={}){return be(e).metadata}function It(e,{log:t,context:r="PDS config"}={}){if(!e||typeof e!="object")return[];let n=[];return Xe(e,Ie,"design",n),n.length&&typeof t=="function"&&n.forEach(o=>{t("warn",`[${r}] ${o.message} at ${o.path}`)}),n}function jt(e,{log:t,context:r="PDS config"}={}){if(!e||typeof e!="object")return[];let n=[];return Xe(e,Gn,"config",n),n.length&&typeof t=="function"&&n.forEach(o=>{t("warn",`[${r}] ${o.message} at ${o.path}`)}),n}var Q={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:x.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:x.RadiusSizes.small,borderWidth:x.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.318,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:x.RadiusSizes.xlarge,borderWidth:x.BorderWidths.medium},behavior:{transitionSpeed:x.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],themes:["light"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:x.RadiusSizes.none,borderWidth:x.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:x.RadiusSizes.xxlarge,borderWidth:x.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:x.RadiusSizes.none,borderWidth:x.BorderWidths.thick},behavior:{transitionSpeed:x.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:x.RadiusSizes.medium,borderWidth:x.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.3,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.3},shape:{radiusSize:x.RadiusSizes.small,borderWidth:x.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:x.RadiusSizes.medium,borderWidth:x.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:x.RadiusSizes.small,borderWidth:x.BorderWidths.thick},behavior:{transitionSpeed:x.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",themes:["light"],description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:x.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:x.RadiusSizes.xxlarge,borderWidth:x.BorderWidths.thin},behavior:{transitionSpeed:x.TransitionSpeeds.slow,animationEasing:x.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0c0c0c",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:x.RadiusSizes.none,borderWidth:x.BorderWidths.thick},behavior:{transitionSpeed:x.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:x.RadiusSizes.large,borderWidth:x.BorderWidths.medium},behavior:{transitionSpeed:x.TransitionSpeeds.normal,animationEasing:x.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c",primary:"#0a4ca4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:x.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:x.RadiusSizes.large,borderWidth:x.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:x.TransitionSpeeds.fast,animationEasing:x.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:x.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:x.RadiusSizes.medium,borderWidth:x.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:x.TransitionSpeeds.normal,animationEasing:x.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",info:"#0e7490",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#06c167"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:x.RadiusSizes.small,borderWidth:x.BorderWidths.medium},behavior:{transitionSpeed:x.TransitionSpeeds.fast,animationEasing:x.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:x.TouchTargetSizes.comfortable,focusStyle:x.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:2.5},shape:{radiusSize:x.RadiusSizes.medium,borderWidth:x.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:x.TransitionSpeeds.fast,animationEasing:x.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:x.TouchTargetSizes.standard,focusStyle:x.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:x.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:1.5},shape:{radiusSize:x.RadiusSizes.medium,borderWidth:x.BorderWidths.thin},behavior:{transitionSpeed:x.TransitionSpeeds.fast,animationEasing:x.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:x.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:x.RadiusSizes.small,borderWidth:x.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:x.TransitionSpeeds.fast,animationEasing:x.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};Q.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!1,backgroundMesh:0},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0,colorInput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:x.FontWeights.light,fontWeightNormal:x.FontWeights.normal,fontWeightMedium:x.FontWeights.medium,fontWeightSemibold:x.FontWeights.semibold,fontWeightBold:x.FontWeights.bold,lineHeightTight:x.LineHeights.tight,lineHeightNormal:x.LineHeights.normal,lineHeightRelaxed:x.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:x.RadiusSizes.large,borderWidth:x.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:x.TransitionSpeeds.normal,animationEasing:x.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:30,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:x.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:x.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:x.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:x.IconSizes,include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"/assets/pds/icons/pds-icons.svg"},debug:!1};var Cr=je(Q.default),Mr=be(Q.default);function Bt(e="log",t,...r){let n=globalThis?.PDS?.log;if(typeof n=="function"){n(e,t,...r);return}if(typeof console>"u")return;let o=typeof console[e]=="function"?console[e].bind(console):typeof console.log=="function"?console.log.bind(console):null;o&&(r.length>0?o(t,...r):o(t))}Fe();Ot();var X=class e{static#m;static get instance(){return this.#m}#e;#o;constructor(t={}){this.options={debug:!1,...t},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),e.#m=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#Se(),typeof CSSStyleSheet<"u"?this.#Me():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let t=this.options.design||{},r=this.#C(t),n=t.layers||{},o=this.#h(n,r.light),a=this.#z(o),i=r.dark!=null?this.#z(this.#h(n,r.dark)):null;return{colors:this.#M(t.colors||{},r),spacing:this.generateSpacingTokens(t.spatialRhythm||{}),radius:this.#B(t.shape||{}),borderWidths:this.#O(t.shape||{}),typography:this.generateTypographyTokens(t.typography||{}),shadows:a,darkShadows:i,layout:this.#D(t.layout||{}),transitions:this.#W(t.behavior||{}),zIndex:this.#H(t.layers||{}),icons:this.#U(t.icons||{})}}#C(t={}){let r=t.layout||{},n=t.layers||{};return{light:this.#f(r.baseShadowOpacity??n.baseShadowOpacity),dark:this.#f(r.darkMode?.baseShadowOpacity??n.darkMode?.baseShadowOpacity)}}#f(t){let r=Number(t);if(Number.isFinite(r))return Math.min(Math.max(r,0),1)}#h(t={},r){let n={...t};return r!=null&&(n.baseShadowOpacity=r),n}#M(t,r={}){let{primary:n="#3b82f6",secondary:o="#64748b",accent:a="#ec4899",background:i="#ffffff",success:s=null,warning:p="#FFBF00",danger:c=null,info:d=null,darkMode:l={}}=t,u={primary:this.#r(n),secondary:this.#r(o),accent:this.#r(a),success:this.#r(s||this.#E(n)),warning:this.#r(p||a),danger:this.#r(c||this.#T(n)),info:this.#r(d||n),gray:this.#b(o),surface:this.#y(i)};return u.surface.fieldset=this.#A(u.surface),u.surfaceSmart=this.#S(u.surface,r),u.dark=this.#_(u,i,l),u.dark&&u.dark.surface&&(u.dark.surfaceSmart=this.#S(u.dark.surface,r)),u.interactive={light:{fill:this.#k(u.primary,4.5),text:u.primary[600]},dark:{fill:this.#k(u.dark.primary,4.5),text:this.#I(u.dark.primary,u.dark.surface.base,4.5)}},u}#r(t){let r=this.#a(t);return{50:this.#t(r.h,Math.max(r.s-10,10),Math.min(r.l+45,95)),100:this.#t(r.h,Math.max(r.s-5,15),Math.min(r.l+35,90)),200:this.#t(r.h,r.s,Math.min(r.l+25,85)),300:this.#t(r.h,r.s,Math.min(r.l+15,75)),400:this.#t(r.h,r.s,Math.min(r.l+5,65)),500:t,600:this.#t(r.h,r.s,Math.max(r.l-10,25)),700:this.#t(r.h,r.s,Math.max(r.l-20,20)),800:this.#t(r.h,r.s,Math.max(r.l-30,15)),900:this.#t(r.h,r.s,Math.max(r.l-40,10))}}#E(t){let r=this.#a(t);return this.#t(120,Math.max(r.s,60),45)}#T(t){let r=this.#a(t);return this.#t(0,Math.max(r.s,70),50)}#b(t){let r=this.#a(t),n=r.h,o=Math.min(r.s,10);return{50:this.#t(n,o,98),100:this.#t(n,o,95),200:this.#t(n,o,88),300:this.#t(n,o,78),400:this.#t(n,o,60),500:t,600:this.#t(n,Math.min(o+5,15),45),700:this.#t(n,Math.min(o+8,18),35),800:this.#t(n,Math.min(o+10,20),20),900:this.#t(n,Math.min(o+12,22),10)}}#y(t){let r=this.#a(t);return{base:t,subtle:this.#t(r.h,Math.max(r.s,2),Math.max(r.l-2,2)),elevated:this.#t(r.h,Math.max(r.s,3),Math.max(r.l-4,5)),sunken:this.#t(r.h,Math.max(r.s,4),Math.max(r.l-6,8)),overlay:this.#t(r.h,Math.max(r.s,2),Math.min(r.l+2,98)),inverse:this.#v(t),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#A(t){return{base:t.subtle,subtle:t.elevated,elevated:t.sunken,sunken:this.#R(t.sunken,.05),overlay:t.elevated}}#R(t,r=.05){let n=this.#a(t),o=Math.max(n.l-n.l*r,5);return this.#t(n.h,n.s,o)}#v(t){let r=this.#a(t);if(r.l>50){let n=Math.min(r.s+5,25),o=Math.max(12-(r.l-50)*.1,8);return this.#t(r.h,n,o)}else{let n=Math.max(r.s-10,5),o=Math.min(85+(50-r.l)*.3,95);return this.#t(r.h,n,o)}}#_(t,r="#ffffff",n={}){let o=n.background?n.background:this.#v(r),a=this.#y(o),i=n.primary?this.#r(n.primary):this.#i(t.primary);return{surface:{...a,fieldset:this.#N(a)},primary:i,secondary:n.secondary?this.#r(n.secondary):this.#i(t.secondary),accent:n.accent?this.#r(n.accent):this.#i(t.accent),gray:n.secondary?this.#b(n.secondary):t.gray,success:this.#i(t.success),info:this.#i(t.info),warning:this.#i(t.warning),danger:this.#i(t.danger)}}#c(t){let r=String(t||"").replace("#",""),n=r.length===3?r.split("").map(a=>a+a).join(""):r,o=parseInt(n,16);return{r:o>>16&255,g:o>>8&255,b:o&255}}#p(t){let{r,g:n,b:o}=this.#c(t),a=[r/255,n/255,o/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*a[0]+.7152*a[1]+.0722*a[2]}#d(t,r){let n=this.#p(t),o=this.#p(r),a=Math.max(n,o),i=Math.min(n,o);return(a+.05)/(i+.05)}#x(t,r=4.5){if(!t)return"#000000";let n="#ffffff",o="#000000",a=this.#d(t,n);if(a>=r)return n;let i=this.#d(t,o);return i>=r||i>a?o:n}#w(t,r=1){let{r:n,g:o,b:a}=this.#c(t);return`rgba(${n}, ${o}, ${a}, ${r})`}#F(t,r,n=.5){let o=this.#c(t),a=this.#c(r),i=Math.round(o.r+(a.r-o.r)*n),s=Math.round(o.g+(a.g-o.g)*n),p=Math.round(o.b+(a.b-o.b)*n);return this.#P(i,s,p)}#P(t,r,n){let o=a=>{let i=Math.max(0,Math.min(255,Math.round(a))).toString(16);return i.length===1?"0"+i:i};return`#${o(t)}${o(r)}${o(n)}`}#N(t){return{base:t.elevated,subtle:t.overlay,elevated:this.#$(t.elevated,.08),sunken:t.elevated,overlay:this.#$(t.overlay,.05)}}#I(t={},r="#000000",n=4.5){let o=["600","700","800","500","400","900","300","200"],a={shade:null,color:null,ratio:0};for(let i of o){let s=t?.[i];if(!s||typeof s!="string")continue;let p=this.#d(s,r);if(p>a.ratio&&(a={shade:i,color:s,ratio:p}),p>=n)return s}return a.color||t?.["600"]||t?.["500"]}#k(t={},r=4.5){let n=["600","700","800","500","400","900"],o={shade:null,color:null,ratio:0};for(let a of n){let i=t?.[a];if(!i||typeof i!="string")continue;let s=this.#d(i,"#ffffff");if(s>o.ratio&&(o={shade:a,color:i,ratio:s}),s>=r)return i}return o.color||t?.["600"]||t?.["500"]}#S(t,r={}){let n={},o=r.light??.1,a=r.dark??.25;return Object.entries(t).forEach(([i,s])=>{if(!s||typeof s!="string"||!s.startsWith("#"))return;let p=this.#p(s)<.5,c=this.#x(s,4.5),d=this.#x(s,3),l=this.#F(c,s,.4),u=c,g=l,m=p?"#ffffff":"#000000",v=p?a:o,f=this.#w(m,v),b=p?"#ffffff":"#000000",k=p?.15:.1,w=this.#w(b,k);n[i]={bg:s,text:c,textSecondary:d,textMuted:l,icon:u,iconSubtle:g,shadow:f,border:w,scheme:p?"dark":"light"}}),n}#$(t,r=.05){let n=this.#a(t),o=Math.min(n.l+(100-n.l)*r,95);return this.#t(n.h,n.s,o)}#i(t){let r={};return Object.entries({50:{source:"900",dimFactor:.8},100:{source:"800",dimFactor:.8},200:{source:"700",dimFactor:.8},300:{source:"600",dimFactor:.8},400:{source:"500",dimFactor:.85},500:{source:"400",dimFactor:.85},600:{source:"300",dimFactor:.85},700:{source:"200",dimFactor:.85},800:{source:"100",dimFactor:.95},900:{source:"50",dimFactor:.95}}).forEach(([o,a])=>{let i=t[a.source];r[o]=this.#j(i,a.dimFactor)}),r}#j(t,r=.8){let n=this.#a(t),o=Math.max(n.s*r,5),a=Math.max(n.l*r,5);return this.#t(n.h,o,a)}generateSpacingTokens(t){let{baseUnit:r=4,scaleRatio:n=1.25,maxSpacingSteps:o=12}=t,a=Number.isFinite(Number(r))?Number(r):4,i=Math.min(Number.isFinite(Number(o))?Number(o):12,12),s={0:"0"};for(let p=1;p<=i;p++)s[p]=`${a*p}px`;return s}#B(t){let{radiusSize:r="medium",customRadius:n=null}=t,o;n!=null?o=n:typeof r=="number"?o=r:typeof r=="string"?o=x.RadiusSizes[r]??x.RadiusSizes.medium:o=x.RadiusSizes.medium;let a=Number.isFinite(Number(o))?Number(o):x.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(a*.25)?Math.round(a*.25):0}px`,sm:`${Number.isFinite(a*.5)?Math.round(a*.5):0}px`,md:`${a}px`,lg:`${Number.isFinite(a*1.5)?Math.round(a*1.5):0}px`,xl:`${Number.isFinite(a*2)?Math.round(a*2):0}px`,full:"9999px"}}#O(t){let{borderWidth:r="medium"}=t,n;typeof r=="number"?n=r:typeof r=="string"?n=x.BorderWidths[r]??x.BorderWidths.medium:n=x.BorderWidths.medium;let o=Number.isFinite(Number(n))?Number(n):x.BorderWidths.medium,a=i=>`${Math.max(1,Math.ceil(i))}px`;return{hairline:a(o*.25),thin:a(o*.5),medium:a(o),thick:a(o*1.5)}}generateTypographyTokens(t){let{fontFamilyHeadings:r="system-ui, -apple-system, sans-serif",fontFamilyBody:n="system-ui, -apple-system, sans-serif",fontFamilyMono:o='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:a=16,fontScale:i=1.25,fontWeightLight:s=x.FontWeights.light,fontWeightNormal:p=x.FontWeights.normal,fontWeightMedium:c=x.FontWeights.medium,fontWeightSemibold:d=x.FontWeights.semibold,fontWeightBold:l=x.FontWeights.bold,lineHeightTight:u=x.LineHeights.tight,lineHeightNormal:g=x.LineHeights.normal,lineHeightRelaxed:m=x.LineHeights.relaxed}=t,v=Number.isFinite(Number(a))?Number(a):16,f=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:r,body:n,mono:o},fontSize:{xs:`${Math.round(v/Math.pow(f,2))}px`,sm:`${Math.round(v/f)}px`,base:`${v}px`,lg:`${Math.round(v*f)}px`,xl:`${Math.round(v*Math.pow(f,2))}px`,"2xl":`${Math.round(v*Math.pow(f,3))}px`,"3xl":`${Math.round(v*Math.pow(f,4))}px`,"4xl":`${Math.round(v*Math.pow(f,5))}px`},fontWeight:{light:s?.toString()||"300",normal:p?.toString()||"400",medium:c?.toString()||"500",semibold:d?.toString()||"600",bold:l?.toString()||"700"},lineHeight:{tight:u?.toString()||"1.25",normal:g?.toString()||"1.5",relaxed:m?.toString()||"1.75"}}}#z(t){let{baseShadowOpacity:r=.1,shadowBlurMultiplier:n=1,shadowOffsetMultiplier:o=1}=t,a=`rgba(0, 0, 0, ${r})`,i=`rgba(0, 0, 0, ${r*.5})`;return{sm:`0 ${1*o}px ${2*n}px 0 ${i}`,base:`0 ${1*o}px ${3*n}px 0 ${a}, 0 ${1*o}px ${2*n}px 0 ${i}`,md:`0 ${4*o}px ${6*n}px ${-1*o}px ${a}, 0 ${2*o}px ${4*n}px ${-1*o}px ${i}`,lg:`0 ${10*o}px ${15*n}px ${-3*o}px ${a}, 0 ${4*o}px ${6*n}px ${-2*o}px ${i}`,xl:`0 ${20*o}px ${25*n}px ${-5*o}px ${a}, 0 ${10*o}px ${10*n}px ${-5*o}px ${i}`,inner:`inset 0 ${2*o}px ${4*n}px 0 ${i}`}}#D(t){let{containerPadding:r=16,breakpoints:n={sm:640,md:768,lg:1024,xl:1280}}=t,o=this.#u(t,"maxWidth"),a=t.maxWidth,i=this.#L(t,{emitFallbacks:!1});return{maxWidth:o?this.#n(a,"1200px"):void 0,maxWidthSm:i.sm,maxWidthMd:i.md,maxWidthLg:i.lg,maxWidthXl:i.xl,minHeight:"100vh",containerPadding:this.#n(r,"16px"),breakpoints:{sm:this.#n(n.sm,"640px"),md:this.#n(n.md,"768px"),lg:this.#n(n.lg,"1024px"),xl:this.#n(n.xl,"1280px")},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#L(t={},r={}){let{emitFallbacks:n=!0}=r,o={sm:640,md:768,lg:1024,xl:1280},{maxWidths:a={},containerPadding:i=16,breakpoints:s=o}=t||{},p=this.#u(t,"maxWidth"),c=["sm","md","lg","xl"].some(f=>this.#u(a,f));if(!n&&!p&&!c)return{sm:void 0,md:void 0,lg:void 0,xl:void 0};let d=t?.maxWidth,l=this.#s(i,16),u=this.#s(d,o.xl),g={sm:this.#s(s.sm,o.sm),md:this.#s(s.md,o.md),lg:this.#s(s.lg,o.lg),xl:this.#s(s.xl,o.xl)},m=f=>f?Math.max(320,f-l*2):u,v={sm:Math.min(u,m(g.sm)),md:Math.min(u,m(g.md)),lg:Math.min(u,m(g.lg)),xl:Math.max(320,u)};return{sm:this.#n(a.sm,`${v.sm}px`),md:this.#n(a.md,`${v.md}px`),lg:this.#n(a.lg,`${v.lg}px`),xl:this.#n(a.xl,`${v.xl}px`)}}#u(t,r){if(!t||typeof t!="object"||!Object.prototype.hasOwnProperty.call(t,r))return!1;let n=t[r];return!(n==null||typeof n=="string"&&n.trim().length===0)}#n(t,r){return typeof t=="number"&&Number.isFinite(t)?`${t}px`:typeof t=="string"&&t.trim().length>0?t:r}#s(t,r){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){let n=parseFloat(t);if(Number.isFinite(n))return n}return r}#W(t){let{transitionSpeed:r=x.TransitionSpeeds.normal,animationEasing:n=x.AnimationEasings["ease-out"]}=t,o;return typeof r=="number"?o=r:typeof r=="string"&&x.TransitionSpeeds[r]?o=x.TransitionSpeeds[r]:o=x.TransitionSpeeds.normal,{fast:`${Math.round(o*.6)}ms`,normal:`${o}ms`,slow:`${Math.round(o*1.4)}ms`}}#H(t){let{baseZIndex:r=1e3,zIndexStep:n=10}=t;return{dropdown:r.toString(),sticky:(r+n*2).toString(),fixed:(r+n*3).toString(),modal:(r+n*4).toString(),drawer:(r+n*5).toString(),popover:(r+n*6).toString(),tooltip:(r+n*7).toString(),notification:(r+n*8).toString()}}#U(t){let{set:r="phosphor",weight:n="regular",defaultSize:o=24,sizes:a={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:s="/assets/img/icons/"}=t;return{set:r,weight:n,defaultSize:`${o}px`,sizes:Object.fromEntries(Object.entries(a).map(([p,c])=>[p,`${c}px`])),spritePath:i,externalPath:s}}#q(t){let r=[];r.push(`  /* Colors */
`);let n=(o,a="")=>{Object.entries(o).forEach(([i,s])=>{typeof s=="object"&&s!==null?n(s,`${a}${i}-`):typeof s=="string"&&r.push(`  --color-${a}${i}: ${s};
`)})};return Object.entries(t).forEach(([o,a])=>{o!=="dark"&&o!=="surfaceSmart"&&o!=="interactive"&&typeof a=="object"&&a!==null&&n(a,`${o}-`)}),t.surfaceSmart&&(r.push(`  /* Smart Surface Tokens (context-aware) */
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
`),r.push(`  --color-text-muted: var(--color-gray-600);
`),r.push(`  --color-border: var(--color-gray-300);
`),r.push(`  --color-input-bg: var(--color-surface-base);
`),r.push(`  --color-input-disabled-bg: var(--color-gray-50);
`),r.push(`  --color-input-disabled-text: var(--color-gray-500);
`),r.push(`  --color-code-bg: var(--color-gray-100);
`),t.interactive&&t.interactive.light&&(r.push(`  /* Interactive Colors - optimized for specific use cases */
`),r.push(`  --color-primary-fill: ${t.interactive.light.fill}; /* For button backgrounds with white text */
`),r.push(`  --color-primary-text: ${t.interactive.light.text}; /* For links and outline buttons on light surfaces */
`)),r.push(`  /* Translucent Surface Tokens */
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
    `),r.push(this.#G(t)),`${r.join("")}
`}#G(t){let r=t.primary?.[500]||"#3b82f6",n=t.secondary?.[500]||"#8b5cf6",o=t.accent?.[500]||"#f59e0b";return`
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
    `}#V(t){let r=[`  /* Spacing */
`];return Object.entries(t).forEach(([n,o])=>{n!=null&&n!=="NaN"&&o!==void 0&&!o.includes("NaN")&&r.push(`  --spacing-${n}: ${o};
`)}),`${r.join("")}
`}#K(t){let r=[`  /* Border Radius */
`];return Object.entries(t).forEach(([n,o])=>{r.push(`  --radius-${n}: ${o};
`)}),`${r.join("")}
`}#J(t){let r=[`  /* Border Widths */
`];return Object.entries(t).forEach(([n,o])=>{r.push(`  --border-width-${n}: ${o};
`)}),`${r.join("")}
`}#Y(t){let r=[`  /* Typography */
`];return Object.entries(t).forEach(([n,o])=>{let a=n.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(o).forEach(([i,s])=>{let p=i.replace(/([A-Z])/g,"-$1").toLowerCase();r.push(`  --font-${a}-${p}: ${s};
`)})}),`${r.join("")}
`}#g(t){let r=[`  /* Shadows */
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
`}#te(t,r){if(!t?.dark)return"";let n=[],o=(l,u="")=>{Object.entries(l).forEach(([g,m])=>{typeof m=="object"&&m!==null?o(m,`${u}${g}-`):typeof m=="string"&&n.push(`  --color-${u}${g}: ${m};
`)})};Object.entries(t.dark).forEach(([l,u])=>{l!=="surfaceSmart"&&typeof u=="object"&&u!==null&&o(u,`${l}-`)});let a=[];t.dark.surfaceSmart&&(a.push(`  /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([l,u])=>{a.push(`  --surface-${l}-bg: ${u.bg};
`),a.push(`  --surface-${l}-text: ${u.text};
`),a.push(`  --surface-${l}-text-secondary: ${u.textSecondary};
`),a.push(`  --surface-${l}-text-muted: ${u.textMuted};
`),a.push(`  --surface-${l}-icon: ${u.icon};
`),a.push(`  --surface-${l}-icon-subtle: ${u.iconSubtle};
`),a.push(`  --surface-${l}-shadow: ${u.shadow};
`),a.push(`  --surface-${l}-border: ${u.border};
`)}),a.push(`
`));let i=`  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
`,s=`  /* Backdrop tokens - dark mode */
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
`,p=this.#oe(t),c=r?[this.#g(r)]:[];return`html[data-theme="dark"] {
${[...n,...a,...c,i,s,p].join("")}}
`}#re(t,r){if(!t?.dark)return"";let n=[],o=(u,g="")=>{Object.entries(u).forEach(([m,v])=>{typeof v=="object"&&v!==null?o(v,`${g}${m}-`):typeof v=="string"&&n.push(`    --color-${g}${m}: ${v};
`)})};Object.entries(t.dark).forEach(([u,g])=>{u!=="surfaceSmart"&&typeof g=="object"&&g!==null&&o(g,`${u}-`)});let a=[];t.dark.surfaceSmart&&(a.push(`    /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([u,g])=>{a.push(`    --surface-${u}-bg: ${g.bg};
`),a.push(`    --surface-${u}-text: ${g.text};
`),a.push(`    --surface-${u}-text-secondary: ${g.textSecondary};
`),a.push(`    --surface-${u}-text-muted: ${g.textMuted};
`),a.push(`    --surface-${u}-icon: ${g.icon};
`),a.push(`    --surface-${u}-icon-subtle: ${g.iconSubtle};
`),a.push(`    --surface-${u}-shadow: ${g.shadow};
`),a.push(`    --surface-${u}-border: ${g.border};
`)}),a.push(`
`));let i=[];t.interactive&&t.interactive.dark&&(i.push(`    /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`    --color-primary-fill: ${t.interactive.dark.fill}; /* For button backgrounds with white text */
`),i.push(`    --color-primary-text: ${t.interactive.dark.text}; /* For links and outline buttons on dark surfaces */
`));let s=[`    --color-text-primary: var(--color-gray-100);
`,`    --color-text-secondary: var(--color-gray-300);
`,`    --color-text-muted: var(--color-gray-600);
`,`    --color-border: var(--color-gray-700);
`,`    --color-input-bg: var(--color-gray-800);
`,`    --color-input-disabled-bg: var(--color-gray-900);
`,`    --color-input-disabled-text: var(--color-gray-600);
`,`    --color-code-bg: var(--color-gray-800);
`,...i].join(""),p=`    /* Backdrop tokens - dark mode */
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
`,c=this.#ne(t),d=r?[this.#g(r)]:[];return`
       html[data-theme="dark"] {
${[...n,...a,...d,s,p,c].join("")}       }
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
    `}#ae(){return`/* Callout dark mode adjustments */
html[data-theme="dark"] {
  .callout-success { background-color: var(--color-success-50); border-color: var(--color-success-500); color: var(--color-success-900); }
  .callout-info { background-color: var(--color-info-50); border-color: var(--color-info-500); color: var(--color-info-900); }
  .callout-warning { background-color: var(--color-warning-50); border-color: var(--color-warning-500); color: var(--color-warning-900); }
  .callout-danger, .callout-error { background-color: var(--color-danger-50); border-color: var(--color-danger-500); color: var(--color-danger-900); }
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
  border-left: calc(var(--border-width-thick) + var(--border-width-thin)) solid var(--color-primary-500);
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

`}#de(){let{shape:t={},spatialRhythm:r={},inputPadding:n,buttonPadding:o,focusRingWidth:a,focusRingOpacity:i,borderWidthThin:s,sectionSpacing:p,buttonMinHeight:c,inputMinHeight:d}=this.options.design,l=typeof t.borderWidth=="number"?t.borderWidth:typeof t.borderWidth=="string"?x.BorderWidths[t.borderWidth]??null:null,u=r.inputPadding??n??.75,g=r.buttonPadding??o??1,m=a||3,v=s||l||x.BorderWidths.thin,f=r.sectionSpacing??p??2,b=c||30;return`/* Mobile-First Form Styles - Generated from Design Config */
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
      box-shadow: 0 0 0 ${m}px color-mix(in oklab, var(--color-danger-500) ${Math.round((i||.3)*100)}%, transparent);
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
    border: var(--border-width-thin) solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
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
    border: var(--border-width-thin) solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
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
  min-height: calc(${b}px * 0.75);
  padding: calc(var(--spacing-1) * ${g*.6}) calc(var(--spacing-4) * 0.85);
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
    border-color: var(--color-primary-500);
  }

  &:has(input[type="checkbox"]:checked),
  input[type="checkbox"]:checked + label:not(fieldset label):not(label[data-toggle]) {
    background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
    color: var(--color-primary-700);
    border-color: var(--color-primary-500);
    border-width: var(--border-width-medium);
    font-weight: var(--font-weight-semibold);
    
    &:hover {
      background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
      border-color: var(--color-primary-600);
    }
  }

  &:has(input[type="checkbox"]:focus),
  input[type="checkbox"]:focus + label:not(fieldset label):not(label[data-toggle]) {
    outline: none;
    box-shadow: 0 0 0 ${m}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
    min-height: calc(${b}px * 0.75);
    padding: calc(var(--spacing-1) * ${g*.6}) calc(var(--spacing-4) * 0.85);
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
      border-color: var(--color-primary-500);
      color: var(--color-text-primary);
    }

    &:has([disabled]) {
      pointer-events: none;
    }

    &:has(input:is([type="radio"], [type="checkbox"]):checked) {
      background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
      border-color: var(--color-primary-500);
      border-width: var(--border-width-medium);
      font-weight: var(--font-weight-semibold);
      
      &:hover {
        background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
        border-color: var(--color-primary-600);
      }
    }

    &:has(input:is([type="radio"], [type="checkbox"]):focus) {
      outline: none;
      box-shadow: 0 0 0 ${m}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
      color: var(--color-primary-600);
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
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 ${m}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
  --btn-pad-y: max(calc(var(--spacing-1) * ${g}), var(--spacing-2));
  --btn-target-h: max(${b}px, calc(var(--font-size-base) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
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
    box-shadow: 0 0 0 ${m}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${m}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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

.btn-danger {
  background-color: var(--color-danger-600);
  color: white;
  border-color: var(--color-danger-600);

  &:hover {
    background-color: color-mix(in oklab, var(--color-danger-600) 90%, black 10%);
    border-color: color-mix(in oklab, var(--color-danger-600) 90%, black 10%);
    color: white;
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-danger-600) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-danger-600) 80%, black 20%);
    color: white;
  }
}

.btn-danger.btn-outline {
  background-color: transparent;
  color: var(--color-danger-600);
  border-color: var(--color-danger-600);

  &:hover {
    background-color: var(--color-danger-600);
    border-color: var(--color-danger-600);
    color: white;

    pds-icon {
      color: white;
    }
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-danger-600) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-danger-600) 80%, black 20%);
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
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${g}), var(--spacing-2)) * 0.85);
  --btn-target-h: max(calc(${b}px * 0.85), calc(var(--font-size-sm) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
  padding: var(--btn-pad-y) calc(var(--spacing-6) * 0.8);
  font-size: var(--font-size-sm);
  min-height: var(--btn-target-h);
  height: var(--btn-target-h);
}

.btn-xs {
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${g}), var(--spacing-2)) * 0.7);
  --btn-target-h: max(calc(${b}px * 0.7), calc(var(--font-size-xs) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
  padding: var(--btn-pad-y) calc(var(--spacing-6) * 0.65);
  font-size: var(--font-size-xs);
  min-height: var(--btn-target-h);
  height: var(--btn-target-h);
}


.btn-lg {
  --btn-pad-y: calc(max(calc(var(--spacing-1) * ${g}), var(--spacing-2)) * 1.15);
  --btn-target-h: max(calc(${b}px * 1.15), calc(var(--font-size-lg) + (var(--btn-pad-y) * 2) + (var(--border-width-medium) * 2)));
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

`}#pe(){let{layout:t={}}=this.options.design,r=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Table Styles - Mobile First */

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
  background-color: var(--color-success-50);
  border-color: var(--color-success-600);
  color: var(--color-success-900);
}
.callout-info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-600);
  color: var(--color-info-900);
}
.callout-warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-600);
  color: var(--color-warning-900);
}
.callout-danger,
.callout-error {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-600);
  color: var(--color-danger-900);
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
`}#me(){return`/* Badge/Pill Styles */

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
  border: var(--border-width-thin) solid currentColor;
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

`}#fe(){let{layout:t={},behavior:r={}}=this.options.design;return`/* ============================================================================
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
 * Some controls (e.g. pds-daterange panel, data-dropdown menus) need to escape
 * the dialog bounds. Scope overflow visibility to custom dialogs that contain
 * those controls instead of enabling it for all dialogs.
 */
dialog.dialog-custom:has(pds-daterange),
dialog.dialog-custom:has([data-dropdown]) {
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

  /* Allow overlay menus (e.g. data-dropdown) to escape dialog-body clipping while open */
  article:has([data-dropdown] > :last-child[aria-hidden="false"]),
  form > article:has([data-dropdown] > :last-child[aria-hidden="false"]),
  .dialog-body:has([data-dropdown] > :last-child[aria-hidden="false"]) {
    overflow: visible;
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

html:has(dialog[open]:modal) {
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

`}#ye(){let{layout:t={}}=this.options.design,r=t.buttonMinHeight||30,n=t.buttonPadding||1,o=`max(calc(var(--spacing-1) * ${n}), var(--spacing-2))`,a=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 0.85)`,i=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 0.7)`,s=`calc(max(calc(var(--spacing-1) * ${n}), var(--spacing-2)) * 1.15)`,p=.72,c=`calc(${o} * ${p})`,d=`calc(${a} * ${p})`,l=`calc(${i} * ${p})`,u=`calc(${s} * ${p})`,g=`${r}px`,m=`calc(${r}px * 0.85)`,v=`calc(${r}px * 0.7)`,f=`calc(${r}px * 1.15)`,b=`max(${g}, calc(var(--font-size-base) + (${o} * 2) + (var(--border-width-medium) * 2)))`,k=`max(${m}, calc(var(--font-size-sm) + (${a} * 2) + (var(--border-width-medium) * 2)))`,w=`max(${v}, calc(var(--font-size-xs) + (${i} * 2) + (var(--border-width-medium) * 2)))`,$=`max(${f}, calc(var(--font-size-lg) + (${s} * 2) + (var(--border-width-medium) * 2)))`;return`/* Icon System */

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
    padding: ${c};
    min-width: ${b};
    min-height: ${b};
    width: ${b};
    height: ${b};
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
    padding: ${d};
    min-width: ${k};
    min-height: ${k};
    width: ${k};
    height: ${k};

    pds-icon,
    pds-icon[size] {
      width: 1.15em;
      height: 1.15em;
    }
  }

  &.btn-xs.icon-only {
    padding: ${l};
    min-width: ${w};
    min-height: ${w};
    width: ${w};
    height: ${w};

    pds-icon,
    pds-icon[size] {
      width: 1.1em;
      height: 1.1em;
    }
  }

  &.btn-lg.icon-only {
    padding: ${u};
    min-width: ${$};
    min-height: ${$};
    width: ${$};
    height: ${$};

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
  display: inline-block;
  padding: 0;

  & > :last-child {
    position: absolute;
    padding: var(--spacing-2);
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

  & > :last-child[aria-hidden="false"] {
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
    padding: var(--spacing-1) 0;

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
      color: var(--color-danger-600);
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
  nav[data-dropdown] > :last-child[aria-hidden="false"] {
    opacity: 0;
  }
}
`}#xe(){let{layout:t={}}=this.options.design,r=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},n=t.gridSystem||{},o=n.columns||[1,2,3,4,6],a=n.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=this.#L(t),s=[`
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

`];for(let p of o)s.push(`.grid-cols-${p} { grid-template-columns: repeat(${p}, 1fr); }
`);s.push(`
/* Auto-fit grids (responsive) */
`);for(let[p,c]of Object.entries(a))s.push(`.grid-auto-${p} { grid-template-columns: repeat(auto-fit, minmax(${c}, 1fr)); }
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

`}#ke(){let{layout:t={},a11y:r={}}=this.options.design,n=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},o=r.minTouchTarget||x.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

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

`}#a(t){let r=parseInt(t.slice(1,3),16)/255,n=parseInt(t.slice(3,5),16)/255,o=parseInt(t.slice(5,7),16)/255,a=Math.max(r,n,o),i=Math.min(r,n,o),s,p,c=(a+i)/2;if(a===i)s=p=0;else{let d=a-i;switch(p=c>.5?d/(2-a-i):d/(a+i),a){case r:s=(n-o)/d+(n<o?6:0);break;case n:s=(o-r)/d+2;break;case o:s=(r-n)/d+4;break}s/=6}return{h:s*360,s:p*100,l:c*100}}#t(t,r,n){t=t/360,r=r/100,n=n/100;let o=(c,d,l)=>(l<0&&(l+=1),l>1&&(l-=1),l<1/6?c+(d-c)*6*l:l<1/2?d:l<2/3?c+(d-c)*(2/3-l)*6:c),a,i,s;if(r===0)a=i=s=n;else{let c=n<.5?n*(1+r):n+r-n*r,d=2*n-c;a=o(d,c,t+1/3),i=o(d,c,t),s=o(d,c,t-1/3)}let p=c=>{let d=Math.round(c*255).toString(16);return d.length===1?"0"+d:d};return`#${p(a)}${p(i)}${p(s)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#Se(){this.#e={tokens:this.#$e(),primitives:this.#ze(),components:this.#Le(),utilities:this.#Ce()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#$e(){let{colors:t,spacing:r,radius:n,borderWidths:o,typography:a,shadows:i,darkShadows:s,layout:p,transitions:c,zIndex:d,icons:l}=this.tokens,u=[`@layer tokens {
       :root {
          ${this.#q(t)}
          ${this.#V(r)}
          ${this.#K(n)}
          ${this.#J(o)}
          ${this.#Y(a)}
          ${this.#g(i)}
          ${this.#Z(p)}
          ${this.#X(c)}
          ${this.#Q(d)}
          ${this.#ee(l)}
       }
       ${this.#re(t,s)}
    }`];return u.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),u.push(this.#te(t,s)),u.join("")}#ze(){let{advanced:t={},a11y:r={},layout:n={}}=this.options.design,o=t.tabSize||x.TabSizes.standard,a=r.minTouchTarget||x.TouchTargetSizes.standard,i=n.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
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
    min-height: ${a}px;
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
    color: var(--color-primary-text, var(--color-primary-600));
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
      background: var(--color-primary-600);
      border-color: var(--color-primary-600);
    }

    &:has(input[type="checkbox"]:focus)::before {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }

    &:has(input[type="checkbox"]:not(:disabled)):hover::before {
      border-color: var(--color-primary-600);
      background: var(--color-surface-subtle);
    }

    &:has(input[type="checkbox"]:checked:not(:disabled)):hover::before {
      background: var(--color-primary-700);
      border-color: var(--color-primary-700);
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

${this.#ue()}

${this.#me()}

${this.#fe()}

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


${this.#we()}

${this.#ke()}

}
`}#Me(){this.#o={tokens:new CSSStyleSheet,primitives:new CSSStyleSheet,components:new CSSStyleSheet,utilities:new CSSStyleSheet},this.#Ee()}#Ee(){this.#o.tokens.replaceSync(this.#e.tokens),this.#o.primitives.replaceSync(this.#e.primitives),this.#o.components.replaceSync(this.#e.components),this.#o.utilities.replaceSync(this.#e.utilities)}get tokensCSS(){return this.#e?.tokens||""}get primitivesCSS(){return this.#e?.primitives||""}get componentsCSS(){return this.#e?.components||""}get utilitiesCSS(){return this.#e?.utilities||""}get layeredCSS(){return this.#e?`${this.#e.tokens}
${this.#e.primitives}
${this.#e.components}
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof q<"u"?q:null,enums:typeof x<"u"?x:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let t=[],r=this.tokens.colors;for(let[n,o]of Object.entries(r))typeof o=="object"&&o!==null&&t.push({name:n,scale:o});return t},getColorScale:t=>this.tokens.colors[t]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([t,r])=>({key:t,value:r})),getTypography:()=>this.tokens.typography,getLayerCSS:t=>{let r=["tokens","primitives","components","utilities"];if(!r.includes(t))throw new Error(`Invalid layer: ${t}. Must be one of ${r.join(", ")}`);return this.#e?.[t]||""},usesEnumValue:(t,r)=>{let n=this.options.design||{};return JSON.stringify(n).includes(r)}}}}get tokensStylesheet(){return this.#o?.tokens}get primitivesStylesheet(){return this.#o?.primitives}get componentsStylesheet(){return this.#o?.components}get utilitiesStylesheet(){return this.#o?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#l("tokens",this.#e.tokens),"pds-primitives.css.js":this.#l("primitives",this.#e.primitives),"pds-components.css.js":this.#l("components",this.#e.components),"pds-utilities.css.js":this.#l("utilities",this.#e.utilities),"pds-styles.css.js":this.#l("styles",this.layeredCSS)}}#l(t,r){let n=r.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${t}
// Auto-generated - do not edit directly

export const ${t} = new CSSStyleSheet();
${t}.replaceSync(\`${n}\`);

export const ${t}CSS = \`${n}\`;
`}};function Ar(e={},t={}){let r=Number(t.minContrast||4.5),n=Number(t.minMutedContrast||3),o=!!t.extendedChecks,a=c=>{let d=String(c||"").replace("#",""),l=d.length===3?d.split("").map(g=>g+g).join(""):d,u=parseInt(l||"0",16);return{r:u>>16&255,g:u>>8&255,b:u&255}},i=c=>{let{r:d,g:l,b:u}=a(c),g=[d/255,l/255,u/255].map(m=>m<=.03928?m/12.92:Math.pow((m+.055)/1.055,2.4));return .2126*g[0]+.7152*g[1]+.0722*g[2]},s=(c,d)=>{if(!c||!d)return 0;let l=i(c),u=i(d),g=Math.max(l,u),m=Math.min(l,u);return(g+.05)/(m+.05)},p=[];try{let d=new X({design:structuredClone(e)}).tokens.colors,l={surfaceBg:d.surface?.base,surfaceText:d.gray?.[900]||"#000000",surfaceTextSecondary:d.gray?.[700]||d.gray?.[800]||d.gray?.[900],surfaceTextMuted:d.gray?.[500]||d.gray?.[600]||d.gray?.[700],surfaceElevated:d.surface?.elevated||d.surface?.base,primaryFill:d.interactive?.light?.fill||d.primary?.[600],primaryText:d.interactive?.light?.text||d.primary?.[600],accentFill:d.accent?.[600]||d.accent?.[500],successFill:d.success?.[600]||d.success?.[500],warningFill:d.warning?.[600]||d.warning?.[500],dangerFill:d.danger?.[600]||d.danger?.[500],infoFill:d.info?.[600]||d.info?.[500]},u=b=>Math.max(s(b,"#ffffff"),s(b,"#000000")),g=s(l.primaryFill,"#ffffff");g<r&&p.push({path:"/colors/primary",message:`Primary button contrast too low in light theme (${g.toFixed(2)} < ${r}). Choose a darker primary.`,ratio:g,min:r,context:"light/btn-primary"});let m=s(l.surfaceBg,l.surfaceText);if(m<r&&p.push({path:"/colors/background",message:`Base text contrast on surface (light) is too low (${m.toFixed(2)} < ${r}). Adjust background or secondary (gray).`,ratio:m,min:r,context:"light/surface-text"}),o){let b=s(l.surfaceBg,l.surfaceTextSecondary);b<r&&p.push({path:"/colors/secondary",message:`Secondary text contrast on base surface (light) is too low (${b.toFixed(2)} < ${r}).`,ratio:b,min:r,context:"light/surface-text-secondary"});let k=s(l.surfaceBg,l.surfaceTextMuted);k<n&&p.push({path:"/colors/secondary",message:`Muted text contrast on base surface (light) is too low (${k.toFixed(2)} < ${n}).`,ratio:k,min:n,context:"light/surface-text-muted"});let w=s(l.surfaceElevated,l.surfaceText);w<r&&p.push({path:"/colors/background",message:`Elevated surface text contrast (light) is too low (${w.toFixed(2)} < ${r}).`,ratio:w,min:r,context:"light/surface-elevated-text"})}let v=s(l.primaryText,l.surfaceBg);v<r&&p.push({path:"/colors/primary",message:`Primary text on surface is too low for outline/link styles (light) (${v.toFixed(2)} < ${r}). Choose a darker primary or lighter surface.`,ratio:v,min:r,context:"light/outline"}),o&&[{path:"/colors/accent",key:"accent",value:l.accentFill},{path:"/colors/success",key:"success",value:l.successFill},{path:"/colors/warning",key:"warning",value:l.warningFill},{path:"/colors/danger",key:"danger",value:l.dangerFill},{path:"/colors/info",key:"info",value:l.infoFill}].forEach(k=>{if(!k?.value)return;let w=u(k.value);w<r&&p.push({path:k.path,message:`${k.key} fill color cannot achieve accessible text contrast (${w.toFixed(2)} < ${r}) with either white or black text.`,ratio:w,min:r,context:`light/${k.key}-fill`})});let f=d.dark;if(f){let b={surfaceBg:f.surface?.base||d.surface?.inverse,surfaceText:f.gray?.[50]||f.gray?.[100]||"#ffffff",surfaceTextMuted:f.gray?.[300]||f.gray?.[400]||f.gray?.[500],primaryFill:d.interactive?.dark?.fill||f.primary?.[600],primaryText:d.interactive?.dark?.text||f.primary?.[600]},k=s(b.primaryFill,"#ffffff");k<r&&p.push({path:"/colors/darkMode/primary",message:`Primary button contrast too low in dark theme (${k.toFixed(2)} < ${r}). Override darkMode.primary or pick a brighter hue.`,ratio:k,min:r,context:"dark/btn-primary"});let w=s(b.primaryText,b.surfaceBg);if(w<r&&p.push({path:"/colors/darkMode/primary",message:`Primary text on surface is too low for outline/link styles (dark) (${w.toFixed(2)} < ${r}). Override darkMode.primary/background.`,ratio:w,min:r,context:"dark/outline"}),o){let $=s(b.surfaceBg,b.surfaceText);$<r&&p.push({path:"/colors/darkMode/background",message:`Base text contrast on surface (dark) is too low (${$.toFixed(2)} < ${r}).`,ratio:$,min:r,context:"dark/surface-text"});let T=s(b.surfaceBg,b.surfaceTextMuted);T<n&&p.push({path:"/colors/darkMode/secondary",message:`Muted text contrast on surface (dark) is too low (${T.toFixed(2)} < ${n}).`,ratio:T,min:n,context:"dark/surface-text-muted"})}}}catch(c){p.push({path:"/",message:`Validation failed: ${String(c?.message||c)}`,ratio:0,min:0})}return{ok:p.length===0,issues:p}}var oo=new Set(["log","warn","error","debug","info"]),ao="__PURE_DS_PDS_SINGLETON__",Dt=null,Wt=null;function _r(){try{let t=(typeof globalThis<"u"?globalThis:window)?.[ao];if(t&&typeof t=="object")return t}catch{return null}return null}function io(e){return!e||typeof e!="object"?null:{mode:e.mode==="live"||e.mode==="static"?e.mode:null,debug:e.debug===!0,thisArg:e.thisArg}}function so(e){if(typeof e!="string")return"log";let t=e.toLowerCase();return oo.has(t)?t:"log"}function lo(){if(typeof Wt=="function")try{let t=io(Wt());if(t)return t}catch{}let e=_r();if(e){let t=e?.mode||e?.compiled?.mode||(e?.registry?.isLive?"live":"static"),r=(e?.debug||e?.currentConfig?.debug||e?.currentConfig?.design?.debug||e?.compiled?.debug||e?.compiled?.design?.debug||!1)===!0;return{mode:t,debug:r,thisArg:e}}return{mode:null,debug:!1}}function co(){if(typeof Dt=="function")try{let t=Dt();if(typeof t=="function")return t}catch{}let e=_r();return typeof e?.logHandler=="function"?e.logHandler:null}function Rr(e,t,...r){if(typeof console>"u")return;let n=typeof console[e]=="function"?console[e].bind(console):typeof console.log=="function"?console.log.bind(console):null;n&&(r.length>0?n(t,...r):n(t))}function po(e,t){let r=t?.debug===!0;return!(t?.mode==="static"&&!r||!r&&e!=="error"&&e!=="warn")}function Fr({getLogger:e,getContext:t}={}){Dt=typeof e=="function"?e:null,Wt=typeof t=="function"?t:null}function Qe(e="log",t,...r){let n=so(e),o=lo(),a=co();if(a)try{a.call(o?.thisArg,n,t,...r);return}catch(i){Rr("error","Custom log handler failed:",i)}po(n,o)&&Rr(n,t,...r)}var uo="en",_={defaultLocale:uo,provider:null,messagesByLocale:new Map,loadingByLocale:new Map,observer:null,reconcileTimer:null,requestedKeys:new Set,textNodeKeyMap:new WeakMap,attributeKeyMap:new WeakMap,valueToKeys:new Map,missingWarnings:new Set},go=["title","placeholder","aria-label","aria-description","aria-placeholder","aria-roledescription","alt","label"],mo=e=>!!e&&typeof e!="string"&&typeof e=="object"&&"strTag"in e;function oe(e){return String(e||"").trim().toLowerCase()}function fo(e){let t=oe(e);return t?t.split("-")[0]||t:""}function pe(e){let t=oe(e);if(!t)return _.defaultLocale;let r=_.provider?.resolveLocale;if(typeof r=="function"){let n=oe(r(e));if(n)return n}return t}function ho(e){let t="";for(let r=0;r<=e.length-1;r+=1)t+=e[r],r<e.length-1&&(t+=`{${r}}`);return t}function ye(e,t){return String(e).replace(/\{(\d+)\}/g,(r,n)=>t(Number(n)))}function Ht(e){if(!e||typeof e!="object")return{};let t={};for(let[r,n]of Object.entries(e)){if(typeof n=="string"){t[r]=n;continue}n&&typeof n=="object"&&typeof n.content=="string"&&(t[r]=n.content)}return t}function bo(e){let t=oe(e);if(!t)return[_.defaultLocale];let r=fo(t);return!r||r===t?[t]:[t,r]}function Pr(e,t){let r=pe(e);_.messagesByLocale.set(r,Ht(t))}function jr(e){typeof e=="string"&&e.length>0&&_.requestedKeys.add(e)}function Nr(e,t){if(typeof e!="string"||!e.length)return;let r=typeof t=="string"?t:String(t||"");r.length&&(_.valueToKeys.has(r)||_.valueToKeys.set(r,new Set),_.valueToKeys.get(r).add(e))}function Be(e){let t=bo(e);for(let r of t)if(_.messagesByLocale.has(r))return{locale:r,messages:_.messagesByLocale.get(r)};return null}async function ve(e,t="explicit"){let r=pe(e),n=Be(r);if(n)return n.messages;let o=r;if(_.loadingByLocale.has(o))return _.loadingByLocale.get(o);if(!_.provider)return{};let a=_.provider.loadLocale||_.provider.setLocale||null;if(typeof a!="function")return{};let i={locale:r,defaultLocale:_.defaultLocale,reason:t,loadedLocales:Array.from(_.messagesByLocale.keys()),messages:{...Be(r)?.messages||{}},load:t==="set-default"||t==="explicit-load"},s;try{s=a(i)}catch{return{}}if(s&&typeof s.then=="function"){let c=s.then(d=>{let l=Ht(d);return Pr(r,l),l}).catch(()=>({})).finally(()=>{_.loadingByLocale.delete(o)});return _.loadingByLocale.set(o,c),c}let p=Ht(s);return Pr(r,p),p}function yo(e){if(!e||typeof e!="object")return"";let r=typeof Element<"u"&&e instanceof Element||e?.nodeType===1?e:null;if(!r)return"";if(r.hasAttribute?.("lang"))return oe(r.getAttribute("lang"));let n=r.closest?.("[lang]");return n&&n.getAttribute?oe(n.getAttribute("lang")):""}function Oe(e={}){if(typeof e?.lang=="string"&&e.lang.trim())return pe(e.lang);let t=e?.element||e?.scope||e?.host||e?.contextElement||null,r=yo(t);if(r)return pe(r);if(typeof document<"u"&&document.documentElement){let n=oe(document.documentElement.getAttribute("lang"));if(n)return pe(n)}return _.defaultLocale}function vo(){let e=new Set([_.defaultLocale]);if(typeof document>"u")return e;let t=oe(document.documentElement?.getAttribute?.("lang"));t&&e.add(pe(t));let r=document.querySelectorAll?.("[lang]")||[];for(let n of r){let o=oe(n.getAttribute("lang"));o&&e.add(pe(o))}return e}async function xo(e){for(let t of e)await ve(t,"lang-detected")}function wo(e){for(let t of Array.from(_.messagesByLocale.keys()))e.has(t)||_.messagesByLocale.delete(t)}function ko(e){let t=String(e||""),r=(t.match(/^\s*/)||[""])[0],n=(t.match(/\s*$/)||[""])[0],o=r.length,a=t.length-n.length,i=a>=o?t.slice(o,a):"";return{leading:r,core:i,trailing:n}}function Ir(e){return String(e||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function So(e,t){let r=typeof e=="string"?e:String(e||""),n=typeof t=="string"?t:String(t||""),o=/\{(\d+)\}/g,a=Array.from(r.matchAll(o));if(!a.length)return r===n?[]:null;let i=[],s="^",p=0;for(let l of a){let u=l.index??0;s+=Ir(r.slice(p,u)),s+="([\\s\\S]*?)",i.push(Number(l[1])),p=u+l[0].length}s+=Ir(r.slice(p)),s+="$";let c=new RegExp(s).exec(n);if(!c)return null;let d=[];for(let l=1;l<c.length;l+=1){let u=i[l-1],g=c[l];if(Object.prototype.hasOwnProperty.call(d,u)&&d[u]!==g)return null;d[u]=g}return d}function Ut(e,t){if(typeof e!="string"||!e.length)return[];let r=[e];for(let[,n]of _.messagesByLocale.entries()){let o=n?.[e];typeof o=="string"&&o.length&&r.push(o)}for(let n of r){let o=So(n,t);if(o)return o}return[]}function Br(e){if(!e)return null;let t=_.valueToKeys.get(e);if(t&&t.size>0){for(let n of t)if(_.requestedKeys.has(n))return n}if(_.requestedKeys.has(e))return e;let r=Array.from(_.messagesByLocale.entries());for(let n of _.requestedKeys)for(let[,o]of r)if(o&&o[n]===e)return n;return null}function Or(e){if(!e)return null;let t=null;for(let[r,n]of _.valueToKeys.entries()){if(typeof r!="string"||!r.length||r===e)continue;let o=e.indexOf(r);if(o!==-1)for(let a of n){if(!_.requestedKeys.has(a))continue;let i=Ut(a,r),s={key:a,matchedText:r,start:o,end:o+r.length,values:i};(!t||s.matchedText.length>t.matchedText.length)&&(t=s);break}}return t}async function $o(e){if(!e||e.nodeType!==3)return;let t=e.parentElement||null;if(!t)return;let{leading:r,core:n,trailing:o}=ko(e.nodeValue);if(!n)return;let a=_.textNodeKeyMap.get(e)||null;if((!a||!_.requestedKeys.has(a))&&(a=Br(n)),!a){let l=Or(n);if(!l)return;let u=Oe({element:t});await ve(u,"text-node");let g=xe(l.key,l.values,{element:t},null),m=l.values.length?ye(g,b=>l.values[b]):g,v=n.slice(0,l.start)+m+n.slice(l.end),f=`${r}${v}${o}`;f!==e.nodeValue&&(e.nodeValue=f);return}_.textNodeKeyMap.set(e,a);let i=Oe({element:t});await ve(i,"text-node");let s=Ut(a,n),p=xe(a,s,{element:t},null),c=s.length?ye(p,l=>s[l]):p,d=`${r}${c}${o}`;d!==e.nodeValue&&(e.nodeValue=d)}async function zo(){if(typeof document>"u"||_.requestedKeys.size===0)return;let e=document.body||document.documentElement;if(!e||typeof document.createTreeWalker!="function")return;let t=[],r=new Set,n=a=>{!a||r.has(a)||(r.add(a),t.push(a))};n(e);for(let a=0;a<t.length;a+=1){let i=t[a];if(!i||typeof i.querySelectorAll!="function")continue;let s=i.querySelectorAll("*");for(let p of s){let c=p?.shadowRoot;c&&n(c)}}let o=[];for(let a of t){let i=document.createTreeWalker(a,NodeFilter.SHOW_TEXT);for(;i.nextNode();)o.push(i.currentNode)}for(let a of o)await $o(a)}function Lo(e){let t=_.attributeKeyMap.get(e);return t||(t=new Map,_.attributeKeyMap.set(e,t)),t}async function Co(e,t){if(!e||typeof e.getAttribute!="function")return;let r=e.getAttribute(t);if(typeof r!="string"||!r.length)return;let n=Lo(e),o=n.get(t)||null;if((!o||!_.requestedKeys.has(o))&&(o=Br(r)),!o){let c=Or(r);if(!c)return;let d=Oe({element:e});await ve(d,"attribute");let l=xe(c.key,c.values,{element:e},null),u=c.values.length?ye(l,m=>c.values[m]):l,g=r.slice(0,c.start)+u+r.slice(c.end);g!==r&&e.setAttribute(t,g),n.set(t,c.key);return}n.set(t,o);let a=Oe({element:e});await ve(a,"attribute");let i=Ut(o,r),s=xe(o,i,{element:e},null),p=i.length?ye(s,c=>i[c]):s;p!==r&&e.setAttribute(t,p)}async function Mo(){if(typeof document>"u"||_.requestedKeys.size===0)return;let e=document.body||document.documentElement;if(!e)return;let t=[],r=new Set,n=o=>{!o||r.has(o)||(r.add(o),t.push(o))};n(e);for(let o=0;o<t.length;o+=1){let a=t[o];if(!a||typeof a.querySelectorAll!="function")continue;let i=a.querySelectorAll("*");for(let s of i){let p=s?.shadowRoot;p&&n(p)}}for(let o of t){if(!o||typeof o.querySelectorAll!="function")continue;let a=o.querySelectorAll("*");for(let i of a)for(let s of go)i.hasAttribute(s)&&await Co(i,s)}}async function Eo(){let e=vo();await xo(e),await zo(),await Mo(),wo(e)}function To(){typeof window>"u"||(_.reconcileTimer&&clearTimeout(_.reconcileTimer),_.reconcileTimer=setTimeout(()=>{_.reconcileTimer=null,Eo()},16))}function xe(e,t=[],r={},n=null){let o=Oe(r),a=Be(o);a||ve(o,"msg");let i=Be(o)?.messages||{},s=Be(_.defaultLocale)?.messages||{},p={key:e,values:t,options:r,locale:o,defaultLocale:_.defaultLocale,messages:i,messagesByLocale:Object.fromEntries(Array.from(_.messagesByLocale.entries())),template:n},c,d=!!a,l=o===_.defaultLocale;typeof _.provider?.translate=="function"&&(c=_.provider.translate(p));let u=null;if(c==null&&(c=i[e]),c==null&&(c=s[e],u=c==null?null:"default"),c==null&&(c=e,u="key"),d&&!l&&u){let m=`${o}::${e}`;_.missingWarnings.has(m)||(_.missingWarnings.add(m),Qe("warn",`[i18n] Missing translation for locale "${o}" and key "${e}"; using ${u} fallback.`))}let g=typeof c=="string"?c:String(c);if(Nr(e,g),Array.isArray(t)&&t.length>0){let m=ye(g,v=>t[v]);m!==g&&Nr(e,m)}return g}var Ao=(e,t,r={})=>{let n=ho(e);jr(n);let o=xe(n,t,r,{strings:e,values:t});return ye(o,a=>t[a])};var se=(e,t={})=>{if(!e)return"";if(mo(e))return Ao(e.strings,e.values,t);let r=String(e);jr(r);let n=xe(r,[],t,null);return!t?.element&&!t?.scope&&!t?.host&&!t?.contextElement&&!t?.lang&&To(),n};var Gt=class extends EventTarget{constructor(){super(),this.mode=null,this.compiled=null,this.log=()=>{},this.logHandler=null}},Dr="__PURE_DS_PDS_SINGLETON__",Vt=typeof globalThis<"u"?globalThis:window,qt=Vt?.[Dr],h=qt&&typeof qt.addEventListener=="function"?qt:new Gt;Vt&&(Vt[Dr]=h);typeof h.log!="function"&&(h.log=(e="log",t,...r)=>{if(typeof console>"u")return;let n=typeof console[e]=="function"?console[e].bind(console):typeof console.log=="function"?console.log.bind(console):null;n&&(r.length>0?n(t,...r):n(t))});typeof h.logHandler!="function"&&(h.logHandler=null);var Kt=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(t={}){this._mode="static",this._staticPaths={...this._staticPaths,...t}}async getStylesheet(t){if(this._mode==="live")return null;try{return(await import(this._staticPaths[t]))[t]}catch(r){h.log("error",`Registry: failed to load static ${t}:`,r),h.log("error",`Registry: looking for ${this._staticPaths[t]}`),h.log("error","Registry: make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");let n=new CSSStyleSheet;return n.replaceSync("/* Failed to load "+t+" */"),n}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},we=new Kt;function Ro(e){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let n=new CSSStyleSheet;n.replaceSync(e),n._pds=!0;let o=(document.adoptedStyleSheets||[]).filter(a=>a._pds!==!0);document.adoptedStyleSheets=[...o,n];return}let t="pds-runtime-stylesheet",r=document.getElementById(t);if(!r){r=document.createElement("style"),r.id=t,r.type="text/css";let n=document.head||document.getElementsByTagName("head")[0];n?n.appendChild(r):document.documentElement.appendChild(r)}r.textContent=e}catch(t){h.log("warn","installRuntimeStyles failed:",t)}}function Wr(e){let t=e;if(!t||typeof t!="object"){h.log("error","Runtime applyStyles requires an explicit generator instance in live mode");return}let r=t.layeredCSS||t.css||"";if(!r){t.options?.log?.("warn","Runtime: no CSS available on generator to apply");return}Ro(r)}async function et(e,t=[],r=null){try{let n=r?.primitivesStylesheet?r.primitivesStylesheet:await we.getStylesheet("primitives");e.adoptedStyleSheets=[n,...t]}catch(n){let o=e.host?.tagName?.toLowerCase()||"unknown";h.log("error",`Adopter: <${o}> failed to adopt primitives:`,n),e.adoptedStyleSheets=t}}async function tt(e,t=["primitives"],r=[],n=null){let o=Array.isArray(r)?r.filter(Boolean):[];if(o.length){let i=(Array.isArray(e.adoptedStyleSheets)?e.adoptedStyleSheets:[]).filter(s=>!o.includes(s));e.adoptedStyleSheets=[...i,...o]}try{let i=(await Promise.all(t.map(async s=>{if(n)switch(s){case"tokens":return n.tokensStylesheet;case"primitives":return n.primitivesStylesheet;case"components":return n.componentsStylesheet;case"utilities":return n.utilitiesStylesheet;default:break}return we.getStylesheet(s)}))).filter(s=>s!==null);e.adoptedStyleSheets=[...i,...o]}catch(a){let i=e.host?.tagName?.toLowerCase()||"unknown";h.log("error",`Adopter: <${i}> failed to adopt layers:`,a),e.adoptedStyleSheets=o}}function Hr(e){let t=new CSSStyleSheet;return t.replaceSync(e),t}var _o=[{selector:".accordion"},{selector:"nav[data-dropdown]"},{selector:"label[data-toggle]"},{selector:"label[data-color]"},{selector:'input[type="range"]'},{selector:"form[data-required]"},{selector:"fieldset[role=group][data-open]"},{selector:"[data-clip]"},{selector:"button, a[class*='btn-']"}];function Fo(e){e.dataset.enhancedAccordion||(e.dataset.enhancedAccordion="true",e.addEventListener("toggle",t=>{t.target.open&&t.target.parentElement===e&&e.querySelectorAll(":scope > details[open]").forEach(r=>{r!==t.target&&(r.open=!1)})},!0))}function Po(e){if(e.dataset.enhancedDropdown)return;e.dataset.enhancedDropdown="true";let t=e.lastElementChild;if(!t)return;let r=e.querySelector("[data-dropdown-toggle]")||e.querySelector("button");r&&!r.hasAttribute("type")&&r.setAttribute("type","button"),t.id||(t.id=`dropdown-${Math.random().toString(36).slice(2,9)}`);let n=t.tagName?.toLowerCase()==="menu",o=8;n&&!t.hasAttribute("role")&&t.setAttribute("role","menu"),t.hasAttribute("aria-hidden")||t.setAttribute("aria-hidden","true"),r&&(r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-controls",t.id),r.setAttribute("aria-expanded","false"));let a=()=>{let z=t.getAttribute("style");t.style.visibility="hidden",t.style.display="inline-block",t.style.pointerEvents="none";let C=t.getBoundingClientRect(),P=Math.max(t.offsetWidth||0,t.scrollWidth||0,C.width||0,1),L=Math.max(t.offsetHeight||0,t.scrollHeight||0,C.height||0,1);return z===null?t.removeAttribute("style"):t.setAttribute("style",z),{width:P,height:L}},i=()=>{let z=(e.getAttribute("data-direction")||e.getAttribute("data-dropdown-direction")||e.getAttribute("data-mode")||"auto").toLowerCase();if(z==="up"||z==="down")return z;let C=(r||e).getBoundingClientRect(),{height:P}=a(),L=Math.max(0,window.innerHeight-C.bottom),y=Math.max(0,C.top),S=L>=P,M=y>=P;return S&&!M?"down":M&&!S?"up":S&&M?"down":y>L?"up":"down"},s=()=>{let z=(e.getAttribute("data-align")||e.getAttribute("data-dropdown-align")||"auto").toLowerCase();if(z==="left"||z==="right"||z==="start"||z==="end")return z==="start"?"left":z==="end"?"right":z;let C=(r||e).getBoundingClientRect(),{width:P}=a(),L=Math.max(0,window.innerWidth-C.left),y=Math.max(0,C.right),S=L>=P,M=y>=P;return S&&!M?"left":M&&!S?"right":S&&M?"left":y>L?"right":"left"},p=(z,C=8)=>{let P=getComputedStyle(e).getPropertyValue(z).trim();if(!P)return C;let L=document.createElement("span");L.style.position="fixed",L.style.visibility="hidden",L.style.pointerEvents="none",L.style.height=P,document.body.appendChild(L);let y=Number.parseFloat(getComputedStyle(L).height);return L.remove(),Number.isFinite(y)?y:C},c=()=>{t.style.removeProperty("position"),t.style.removeProperty("left"),t.style.removeProperty("top"),t.style.removeProperty("right"),t.style.removeProperty("bottom"),t.style.removeProperty("margin-top"),t.style.removeProperty("margin-bottom"),t.style.removeProperty("max-width"),t.style.removeProperty("max-inline-size"),t.style.removeProperty("max-height"),t.style.removeProperty("overflow")},d=z=>{if(!z)return null;if(z.parentElement)return z.parentElement;let C=z.getRootNode?.();return C instanceof ShadowRoot?C.host:null},l=()=>{let z=d(t);for(;z&&z!==document.documentElement;){let C=getComputedStyle(z),P=C.contain||"",L=C.willChange||"";if(C.transform!=="none"||C.perspective!=="none"||C.filter!=="none"||C.backdropFilter!=="none"||P.includes("paint")||P.includes("layout")||P.includes("strict")||P.includes("content")||L.includes("transform")||L.includes("perspective")||L.includes("filter"))return!0;z=d(z)}return!1},u=()=>{t.getAttribute("aria-hidden")==="false"&&(c(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{g()})}))},g=()=>{if(t.getAttribute("aria-hidden")!=="false")return;if(l()){c();return}let z=(r||e).getBoundingClientRect(),C=window.visualViewport,P=C?.width||document.documentElement?.clientWidth||window.innerWidth,L=C?.height||document.documentElement?.clientHeight||window.innerHeight,y=C?.offsetLeft||0,S=C?.offsetTop||0,M=Math.max(1,P-o*2),E=Math.max(1,L-o*2);t.style.maxWidth=`${Math.round(M)}px`,t.style.maxInlineSize=`${Math.round(M)}px`,t.style.maxHeight=`${Math.round(E)}px`,t.style.overflow="auto";let{width:B,height:O}=a(),K=p("--spacing-2",8),N=i(),D=s();e.dataset.dropdownDirection=N,e.dataset.dropdownAlign=D;let Y=D==="right"?z.right-B:z.left;B>=M-1?Y=y+o:Y=Math.max(y+o,Math.min(Y,y+P-B-o));let Re=N==="up"?z.top-K-O:z.bottom+K;Re=Math.max(S+o,Math.min(Re,S+L-O-o)),t.style.position="fixed",t.style.left=`${Math.round(Y)}px`,t.style.top=`${Math.round(Re)}px`,t.style.right="auto",t.style.bottom="auto",t.style.marginTop="0",t.style.marginBottom="0"},m=null,v=()=>{m||(m=()=>g(),window.addEventListener("resize",m),window.addEventListener("scroll",m,!0))},f=()=>{m&&(window.removeEventListener("resize",m),window.removeEventListener("scroll",m,!0),m=null)},b=null,k=null,w=()=>{b||typeof document>"u"||(b=()=>{t.getAttribute("aria-hidden")==="false"&&(e.dataset.dropdownDirection=i(),e.dataset.dropdownAlign=s(),k!==null&&cancelAnimationFrame(k),k=requestAnimationFrame(()=>{k=null,t.getAttribute("aria-hidden")==="false"&&g()}))},document.addEventListener("pds:config-changed",b))},$=()=>{!b||typeof document>"u"||(document.removeEventListener("pds:config-changed",b),b=null,k!==null&&(cancelAnimationFrame(k),k=null))},T=null,A=()=>{e.dataset.dropdownDirection=i(),e.dataset.dropdownAlign=s(),t.setAttribute("aria-hidden","false"),r?.setAttribute("aria-expanded","true"),v(),w(),u(),T||(T=z=>{(z.composedPath?z.composedPath():[z.target]).some(L=>L===e)||F()},setTimeout(()=>{document.addEventListener("click",T)},0))},F=()=>{t.setAttribute("aria-hidden","true"),r?.setAttribute("aria-expanded","false"),f(),$(),c(),T&&(document.removeEventListener("click",T),T=null)},I=()=>{t.getAttribute("aria-hidden")==="false"?F():A()};r?.addEventListener("click",z=>{z.preventDefault(),z.stopPropagation(),I()}),e.addEventListener("keydown",z=>{z.key==="Escape"&&(F(),r?.focus())}),e.addEventListener("focusout",z=>{z.relatedTarget&&((z.composedPath?z.composedPath():[z.relatedTarget]).some(L=>L===e)||F())})}function No(e){if(e.dataset.enhancedToggle)return;e.dataset.enhancedToggle="true";let t=e.querySelector('input[type="checkbox"]');if(!t)return;e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.setAttribute("role","switch"),e.setAttribute("aria-checked",t.checked?"true":"false");let r=document.createElement("span");r.className="toggle-switch",r.setAttribute("role","presentation"),r.setAttribute("aria-hidden","true");let n=document.createElement("span");n.className="toggle-knob",r.appendChild(n),e.insertBefore(r,t.nextSibling);let o=()=>{e.setAttribute("aria-checked",t.checked?"true":"false")},a=()=>{t.disabled||(t.checked=!t.checked,o(),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})))};e.addEventListener("click",i=>{i.preventDefault(),a()}),e.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),a())}),t.addEventListener("change",o)}function Io(e){if(e.dataset.enhancedColorInput)return;let t=e.querySelector('input[type="color"]');if(!t)return;e.dataset.enhancedColorInput="true";let r=e.querySelector(":scope > .color-control"),n=e.querySelector(":scope > .color-control > .color-swatch"),o=e.querySelector(":scope > .color-control > output");r||(r=document.createElement("span"),r.className="color-control",t.before(r)),n||(n=document.createElement("span"),n.className="color-swatch",r.appendChild(n)),t.parentElement!==n&&n.appendChild(t),o||(o=document.createElement("output"),r.appendChild(o));let a=()=>{if(t.dataset.colorUnset==="1"){o.value="",o.textContent=se("not set"),r.dataset.value="",r.dataset.unset="1",n.dataset.unset="1";return}o.value=t.value,o.textContent=t.value,r.dataset.value=t.value,delete r.dataset.unset,delete n.dataset.unset};a();let i=()=>{t.dataset.colorUnset==="1"&&(t.dataset.colorUnset="0"),a()};t.addEventListener("input",i,{passive:!0}),t.addEventListener("change",i,{passive:!0})}function jo(e){if(e.dataset.enhancedRange)return;let t=i=>{if(e.dataset.enhancedRangeProgrammatic)return;e.dataset.enhancedRangeProgrammatic="1";let s=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),"value")||Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");s?.get&&s?.set&&Object.defineProperty(e,"value",{configurable:!0,enumerable:s.enumerable,get(){return s.get.call(this)},set(c){s.set.call(this,c),i()}}),new MutationObserver(c=>{c.some(l=>{let u=l.attributeName;return u==="value"||u==="min"||u==="max"})&&i()}).observe(e,{attributes:!0,attributeFilter:["value","min","max"]})},r=e.closest("label"),n=r?.classList.contains("range-output"),o=e.id||`range-${Math.random().toString(36).substring(2,11)}`,a=`${o}-output`;if(e.id=o,n){let i=r.querySelector("span");if(i&&!i.classList.contains("range-output-wrapper")){let s=document.createElement("span");s.className="range-output-wrapper",s.style.display="flex",s.style.justifyContent="space-between",s.style.alignItems="center";let p=document.createElement("span");p.textContent=i.textContent,s.appendChild(p);let c=document.createElement("output");c.id=a,c.setAttribute("for",o),c.style.color="var(--surface-text-secondary, var(--color-text-secondary))",c.style.fontSize="0.875rem",c.textContent=e.value,s.appendChild(c),i.textContent="",i.appendChild(s);let d=()=>{c.textContent=e.value};e.addEventListener("input",d),e.addEventListener("change",d),t(d),d()}}else{let i=e.closest(".range-container");i||(i=document.createElement("div"),i.className="range-container",e.parentNode?.insertBefore(i,e),i.appendChild(e)),i.style.position="relative";let s=document.createElement("output");s.id=a,s.setAttribute("for",o),s.className="range-bubble",s.setAttribute("aria-live","polite"),i.appendChild(s);let p=()=>{let l=parseFloat(e.min)||0,u=parseFloat(e.max)||100,g=parseFloat(e.value),m=(g-l)/(u-l);s.style.left=`calc(${m*100}% )`,s.textContent=String(g)},c=()=>s.classList.add("visible"),d=()=>s.classList.remove("visible");e.addEventListener("input",p),e.addEventListener("pointerdown",c),e.addEventListener("pointerup",d),e.addEventListener("pointerleave",d),e.addEventListener("focus",c),e.addEventListener("blur",d),e.addEventListener("change",p),t(p),p()}e.dataset.enhancedRange="1"}function Bo(e){if(e.dataset.enhancedRequired)return;e.dataset.enhancedRequired="true";let t=r=>{let n;if(r.closest("[role$=group]")?n=r.closest("[role$=group]").querySelector("legend"):n=r.closest("label"),!n||n.querySelector(".required-asterisk"))return;let o=document.createElement("span");o.classList.add("required-asterisk"),o.textContent="*",o.style.marginLeft="4px";let a=n.querySelector("span, [data-label]");if(a)a.appendChild(o);else{let s=n.querySelector("input, select, textarea");s?n.insertBefore(o,s):n.appendChild(o)}let i=r.closest("form");if(i&&!i.querySelector(".required-legend")){let s=document.createElement("small");s.classList.add("required-legend"),s.textContent=se("* Required fields"),i.insertBefore(s,i.querySelector(".form-actions")||i.lastElementChild)}};e.querySelectorAll("[required]").forEach(r=>{t(r)})}function Oo(e){if(e.dataset.enhancedOpenGroup)return;e.dataset.enhancedOpenGroup="true",e.classList.add("flex","flex-wrap","buttons");let t=document.createElement("input");t.type="text",t.placeholder=se("Add item..."),t.classList.add("input-text","input-sm"),t.style.width="auto";let r=()=>e.querySelector('input[type="radio"], input[type="checkbox"]');e.appendChild(t),t.addEventListener("keydown",n=>{if(n.key==="Enter"||n.key==="Tab"){let o=t.value.trim();if(o){n.preventDefault();let a=r(),i=a?.type==="radio"?"radio":"checkbox",s=`open-group-${Math.random().toString(36).substring(2,11)}`,p=document.createElement("label"),c=document.createElement("span");c.setAttribute("data-label",""),c.textContent=o;let d=document.createElement("input");d.type=i,d.name=a?.name||e.getAttribute("data-name")||"open-group",d.value=o,d.id=s,p.appendChild(c),p.appendChild(d),e.insertBefore(p,t),t.value=""}}else if(n.key==="Backspace"&&t.value===""){n.preventDefault();let o=e.querySelectorAll("label");o.length>0&&o[o.length-1].remove()}})}function Do(e){if(e.dataset.enhancedClip)return;e.dataset.enhancedClip="true",e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.hasAttribute("role")||e.setAttribute("role","button");let t=()=>{let n=e.getAttribute("data-clip-open")==="true";e.setAttribute("aria-expanded",n?"true":"false")},r=()=>{let n=e.getAttribute("data-clip-open")==="true";e.setAttribute("data-clip-open",n?"false":"true"),t()};e.addEventListener("click",n=>{n.defaultPrevented||r()}),e.addEventListener("keydown",n=>{(n.key===" "||n.key==="Enter")&&(n.preventDefault(),r())}),t()}function Wo(e){if(e.dataset.enhancedBtnWorking)return;e.dataset.enhancedBtnWorking="true";let t=null,r=!1;new MutationObserver(o=>{o.forEach(a=>{if(a.attributeName==="class"){let i=e.classList.contains("btn-working"),s=e.querySelector("pds-icon");if(i)if(s)t||(t=s.getAttribute("icon")),s.setAttribute("icon","circle-notch");else{let p=document.createElement("pds-icon");p.setAttribute("icon","circle-notch"),p.setAttribute("size","sm"),e.insertBefore(p,e.firstChild),r=!0}else a.oldValue?.includes("btn-working")&&s&&(r?(s.remove(),r=!1):t&&(s.setAttribute("icon",t),t=null))}})}).observe(e,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var Ho=new Map([[".accordion",Fo],["nav[data-dropdown]",Po],["label[data-toggle]",No],["label[data-color]",Io],['input[type="range"]',jo],["form[data-required]",Bo],["fieldset[role=group][data-open]",Oo],["[data-clip]",Do],["button, a[class*='btn-']",Wo]]),rt=_o.map(e=>({...e,run:Ho.get(e.selector)||(()=>{})}));var Ur=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
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
    `.trim()},{selector:"nav[data-dropdown]",description:"Enhances a nav element with data-dropdown to toggle its last child as a dropdown panel (menu, card, form, etc.).",demoHtml:`
      <nav data-dropdown>
        <button class="btn-primary">Menu</button>
        <div class="card surface-overlay stack-sm">
          <strong>Quick actions</strong>
          <div class="flex gap-sm">
            <button class="btn-primary btn-sm">Ship now</button>
            <button class="btn-outline btn-sm">Schedule</button>
          </div>
        </div>
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
    `.trim()}];var Gr="pds",Uo=/^([a-z][a-z0-9+\-.]*:)?\/\//i,qr=/^[a-z]:/i;function De(e=""){return e.endsWith("/")?e:`${e}/`}function qo(e="",t=Gr){let r=e.replace(/\/+$/,"");return new RegExp(`(?:^|/)${t}$`,"i").test(r)?r:`${r}/${t}`}function Go(e){return e.replace(/^\.\/+/,"")}function Vo(e){return qr.test(e)?e.replace(qr,"").replace(/^\/+/,""):e}function Ko(e){return e.startsWith("public/")?e.substring(7):e}function ke(e,t={}){let r=t.segment||Gr,n=t.defaultRoot||`/assets/${r}/`,o=e?.public&&e.public?.root||e?.static&&e.static?.root||null;if(!o||typeof o!="string")return De(n);let a=o.trim();return a?(a=a.replace(/\\/g,"/"),a=qo(a,r),a=De(a),Uo.test(a)?a:(a=Go(a),a=Vo(a),a.startsWith("/")||(a=Ko(a),a.startsWith("/")||(a=`/${a}`),a=a.replace(/\/+/g,(i,s)=>s===0?i:"/")),De(a))):De(n)}function Vr(e){let t=e.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(t.toLowerCase()))return!0;let o=document.createElement("canvas").getContext("2d");if(!o)return!1;let a="mmmmmmmmmmlli",i="72px",s="monospace";o.font=`${i} ${s}`;let p=o.measureText(a).width;o.font=`${i} "${t}", ${s}`;let c=o.measureText(a).width;return p!==c}function Jo(e){return e?e.split(",").map(n=>n.trim())[0].replace(/['"]/g,"").trim():null}async function Kr(e,t={}){if(!e)return Promise.resolve();let{weights:r=[400,500,600,700],italic:n=!1}=t,o=Jo(e);if(!o||Vr(o))return Promise.resolve();let a=encodeURIComponent(o);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${a}"]`)?(h.log("log",`Font "${o}" is already loading or loaded`),Promise.resolve()):(h.log("log",`Loading font "${o}" from Google Fonts...`),new Promise((s,p)=>{let c=document.createElement("link");c.rel="stylesheet";let d=n?`ital,wght@0,${r.join(";0,")};1,${r.join(";1,")}`:`wght@${r.join(";")}`;c.href=`https://fonts.googleapis.com/css2?family=${a}:${d}&display=swap`,c.setAttribute("data-font-loader",o),c.onload=()=>{h.log("log",`Successfully loaded font "${o}"`),s()},c.onerror=()=>{h.log("warn",`Failed to load font "${o}" from Google Fonts`),p(new Error(`Failed to load font: ${o}`))},document.head.appendChild(c),setTimeout(()=>{Vr(o)||h.log("warn",`Font "${o}" did not load within timeout`),s()},5e3)}))}async function Jt(e){if(!e)return Promise.resolve();let t=new Set;e.fontFamilyHeadings&&t.add(e.fontFamilyHeadings),e.fontFamilyBody&&t.add(e.fontFamilyBody),e.fontFamilyMono&&t.add(e.fontFamilyMono);let r=Array.from(t).map(n=>Kr(n).catch(o=>{h.log("warn",`Could not load font: ${n}`,o)}));await Promise.all(r)}async function Yo(...e){let t={};e.length&&typeof e[e.length-1]=="object"&&(t=e.pop()||{});let r=e,{baseURL:n,mapper:o=c=>`${c}.js`,onError:a=(c,d)=>console.error(`[defineWebComponents] ${c}:`,d)}=t,i=n?new URL(n,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),s=c=>c.toLowerCase().replace(/(^|-)([a-z])/g,(d,l,u)=>u.toUpperCase()),p=async c=>{try{if(customElements.get(c))return{tag:c,status:"already-defined"};let d=o(c),u=await import(d instanceof URL?d.href:new URL(d,i).href),g=u?.default??u?.[s(c)];if(!g){if(customElements.get(c))return{tag:c,status:"self-defined"};throw new Error(`No export found for ${c}. Expected default export or named export "${s(c)}".`)}return customElements.get(c)?{tag:c,status:"race-already-defined"}:(customElements.define(c,g),{tag:c,status:"defined"})}catch(d){throw a(c,d),d}};return Promise.all(r.map(p))}var nt=class{constructor(t={}){let{baseURL:r,mapper:n,onError:o,predicate:a=()=>!0,attributeModule:i="data-module",root:s=document,scanExisting:p=!0,debounceMs:c=16,observeShadows:d=!0,enhancers:l=[],patchAttachShadow:u=!0}=t,g=new Set,m=new Set,v=new Set,f=new Map,b=new WeakMap,k=new WeakMap,w=0,$=!1,T=null,A=S=>{if(!S||!l.length)return;let M=k.get(S);M||(M=new Set,k.set(S,M));for(let E of l)if(!(!E.selector||!E.run)&&!M.has(E.selector))try{S.matches&&S.matches(E.selector)&&(E.run(S),M.add(E.selector))}catch(B){console.warn(`[AutoDefiner] Error applying enhancer for selector "${E.selector}":`,B)}},F=(S,M)=>{if(!$&&!(!S||!S.includes("-"))&&!customElements.get(S)&&!m.has(S)&&!v.has(S)){if(M&&M.getAttribute){let E=M.getAttribute(i);E&&!f.has(S)&&f.set(S,E)}g.add(S),I()}},I=()=>{w||(w=setTimeout(P,c))},z=S=>{if(S){if(S.nodeType===1){let M=S,E=M.tagName?.toLowerCase();E&&E.includes("-")&&!customElements.get(E)&&a(E,M)&&F(E,M),A(M),d&&M.shadowRoot&&C(M.shadowRoot)}S.querySelectorAll&&S.querySelectorAll("*").forEach(M=>{let E=M.tagName?.toLowerCase();E&&E.includes("-")&&!customElements.get(E)&&a(E,M)&&F(E,M),A(M),d&&M.shadowRoot&&C(M.shadowRoot)})}},C=S=>{if(!S||b.has(S))return;z(S);let M=new MutationObserver(E=>{for(let B of E)B.addedNodes?.forEach(O=>{z(O)}),B.type==="attributes"&&B.target&&z(B.target)});M.observe(S,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...l.map(E=>E.selector).filter(E=>E.startsWith("data-"))]}),b.set(S,M)};async function P(){if(clearTimeout(w),w=0,!g.size)return;let S=Array.from(g);g.clear(),S.forEach(M=>m.add(M));try{let M=E=>f.get(E)??(n?n(E):`${E}.js`);await Yo(...S,{baseURL:r,mapper:M,onError:(E,B)=>{v.add(E),o?.(E,B)}})}catch{}finally{S.forEach(M=>m.delete(M))}}let L=s===document?document.documentElement:s,y=new MutationObserver(S=>{for(let M of S)M.addedNodes?.forEach(E=>{z(E)}),M.type==="attributes"&&M.target&&z(M.target)});if(y.observe(L,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...l.map(S=>S.selector).filter(S=>S.startsWith("data-"))]}),d&&u&&Element.prototype.attachShadow){let S=Element.prototype.attachShadow;Element.prototype.attachShadow=function(E){let B=S.call(this,E);if(E&&E.mode==="open"){C(B);let O=this.tagName?.toLowerCase();O&&O.includes("-")&&!customElements.get(O)&&F(O,this)}return B},T=()=>Element.prototype.attachShadow=S}return p&&z(L),{stop(){$=!0,y.disconnect(),T&&T(),w&&(clearTimeout(w),w=0),b.forEach(S=>S.disconnect())},flush:P}}static async define(...t){let r={};t.length&&typeof t[t.length-1]=="object"&&(r=t.pop()||{});let n=t,{baseURL:o,mapper:a=d=>`${d}.js`,onError:i=(d,l)=>console.error(`[defineWebComponents] ${d}:`,l)}=r,s=o?new URL(o,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),p=d=>d.toLowerCase().replace(/(^|-)([a-z])/g,(l,u,g)=>g.toUpperCase()),c=async d=>{try{if(customElements.get(d))return{tag:d,status:"already-defined"};let l=a(d),g=await import(l instanceof URL?l.href:new URL(l,s).href),m=g?.default??g?.[p(d)];if(!m){if(customElements.get(d))return{tag:d,status:"self-defined"};throw new Error(`No export found for ${d}. Expected default export or named export "${p(d)}".`)}return customElements.get(d)?{tag:d,status:"race-already-defined"}:(customElements.define(d,m),{tag:d,status:"defined"})}catch(l){throw i(d,l),l}};return Promise.all(n.map(c))}};var Zo=/^[a-z][a-z0-9+\-.]*:\/\//i,We=(()=>{try{return import.meta.url}catch{return}})(),Se=e=>typeof e=="string"&&e.length&&!e.endsWith("/")?`${e}/`:e;function $e(e,t={}){if(!e||Zo.test(e))return e;let{preferModule:r=!0}=t,n=()=>{if(!We)return null;try{return new URL(e,We).href}catch{return null}},o=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(e,window.location.origin).href}catch{return null}};return(r?n()||o():o()||n())||e}var Jr=(()=>{if(We)try{let e=new URL(We);if(/\/public\/assets\/js\//.test(e.pathname))return new URL("../pds/",We).href}catch{return}})(),Yr=!1;function at(e){Yr||typeof document>"u"||(Yr=!0,e.addEventListener("pds:ready",t=>{let r=t.detail?.mode;r&&document.documentElement.classList.add(`pds-${r}`,"pds-ready")}))}function Zt(e={},t={}){if(!t||typeof t!="object")return e;let r=Array.isArray(e)?[...e]:{...e};for(let[n,o]of Object.entries(t))o&&typeof o=="object"&&!Array.isArray(o)?r[n]=Zt(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o;return r}function Yt(e=""){return String(e).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ue(e){if(e==null)return e;if(typeof e=="function")return;if(typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>ue(r)).filter(r=>r!==void 0);let t={};for(let r in e)if(e.hasOwnProperty(r)){let n=e[r];if(typeof n!="function"){let o=ue(n);o!==void 0&&(t[r]=o)}}return t}function ot(e){let t=ue(e);return typeof structuredClone=="function"?structuredClone(t):JSON.parse(JSON.stringify(t))}function Xt(e={},t={},{presets:r,defaultLog:n,validateDesignConfig:o,validateInitConfig:a}={}){let i=e&&typeof e.log=="function"?e.log:n,s=typeof e=="object"&&("colors"in e||"typography"in e||"spatialRhythm"in e||"shape"in e||"behavior"in e||"layout"in e||"advanced"in e||"a11y"in e||"components"in e||"icons"in e),p=e&&e.enhancers;p&&!Array.isArray(p)&&(p=Object.values(p));let c=p??t.enhancers??[],d=e&&e.preset,l=e&&e.design,u=e&&e.icons&&typeof e.icons=="object"?e.icons:null,g="preset"in(e||{})||"design"in(e||{})||"enhancers"in(e||{});e&&typeof e=="object"&&typeof a=="function"&&a(e,{log:i,context:"PDS.start"});let m,v=null;if(g){l&&typeof l=="object"&&typeof o=="function"&&o(l,{log:i,context:"PDS.start"});let f=String(d||"default").toLowerCase(),b=r?.[f]||Object.values(r||{}).find(O=>Yt(O.name)===f||String(O.name||"").toLowerCase()===f);if(!b)throw new Error(`PDS preset not found: "${d||"default"}"`);v={id:b.id||Yt(b.name),name:b.name||b.id||String(f)};let k=ot(b);if(l&&typeof l=="object"||u){let O=l?ue(l):{},K=u?ue(u):null,N=K?Zt(O,{icons:K}):O;k=Zt(k,ot(N))}let{mode:w,autoDefine:$,applyGlobalStyles:T,manageTheme:A,themeStorageKey:F,preloadStyles:I,criticalLayers:z,managerURL:C,manager:P,localization:L,preset:y,design:S,enhancers:M,log:E,...B}=e;m={...B,design:k,preset:v.name,log:E||n}}else if(s){typeof o=="function"&&o(e,{log:i,context:"PDS.start"});let{log:f,...b}=e;m={design:ot(b),log:f||n}}else{let f=r?.default||Object.values(r||{}).find(b=>Yt(b.name)==="default");if(!f)throw new Error("PDS default preset not available");v={id:f.id||"default",name:f.name||"Default"},m={design:ot(f),preset:v.name,log:n}}return{generatorConfig:m,enhancers:c,presetInfo:v}}function it({manageTheme:e,themeStorageKey:t,applyResolvedTheme:r,setupSystemListenerIfNeeded:n}){let o="light",a=null;if(e&&typeof window<"u"){try{a=localStorage.getItem(t)||null}catch{a=null}try{r?.(a),n?.(a)}catch{}a?a==="system"?o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":o=a:o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:o,storedTheme:a}}function ze(e,{resolvePublicAssetURL:t}){let r=!!(e?.public?.root||e?.static?.root),n=t(e);return!r&&Jr&&(n=Jr),Se($e(n))}async function st(e,{baseEnhancers:t=[]}={}){let{autoDefineBaseURL:r="/auto-define/",autoDefinePreload:n=[],autoDefineMapper:o=null,enhancers:a=[],autoDefineOverrides:i=null,autoDefinePreferModule:s=!0}=e,p=(()=>{let d=new Map;return(t||[]).forEach(l=>d.set(l.selector,l)),(a||[]).forEach(l=>d.set(l.selector,l)),Array.from(d.values())})(),c=null;if(typeof window<"u"&&typeof document<"u"){let d=nt,l=w=>{switch(w){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${w}.js`}},{mapper:u,enhancers:g,...m}=i&&typeof i=="object"?i:{},v=g?Array.isArray(g)?g:typeof g=="object"?Object.values(g):[]:[],f=(()=>{let w=new Map;return(p||[]).forEach($=>{$?.selector&&w.set($.selector,$)}),(v||[]).forEach($=>{if(!$?.selector)return;let T=w.get($.selector)||null;w.set($.selector,{...T||{},...$,run:typeof $?.run=="function"?$.run:T?.run})}),Array.from(w.values())})(),k={baseURL:r&&Se($e(r,{preferModule:s})),predefine:n,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:f,onError:(w,$)=>{if(typeof w=="string"&&w.startsWith("pds-")){let A=["pds-form","pds-drawer"].includes(w),F=$?.message?.includes("#pds/lit")||$?.message?.includes("Failed to resolve module specifier");A&&F?h.log("error",`\u274C PDS component <${w}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`):h.log("warn",`\u26A0\uFE0F PDS component <${w}> not found. Assets may not be installed.`)}else h.log("error",`\u274C Auto-define error for <${w}>:`,$)},...m,mapper:w=>{if(customElements.get(w))return null;if(typeof o=="function")try{let $=o(w);return $===void 0?l(w):$}catch($){return h.log("warn","Custom autoDefine.mapper error; falling back to default:",$?.message||$),l(w)}return l(w)}};c=new d(k),n.length>0&&typeof d.define=="function"&&await d.define(...n,{baseURL:r,mapper:k.mapper,onError:k.onError})}return{autoDefiner:c,mergedEnhancers:p}}var Qt=["light","dark"],er=new Set(Qt);function tr(e){let r=(Array.isArray(e?.themes)?e.themes.map(n=>String(n).toLowerCase()):Qt).filter(n=>er.has(n));return r.length?r:Qt}function Le(e,{preferDocument:t=!0}={}){let r=String(e||"").toLowerCase();if(er.has(r))return r;if(t&&typeof document<"u"){let n=document.documentElement?.getAttribute("data-theme");if(er.has(n))return n}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function ge(e,t){let r=Le(t);return tr(e).includes(r)}var Xr=!1,pt="pds-live-edit-toggle",ar="pds-live-edit-toggle-style";function Qr(e,t=new WeakSet){if(!e||typeof e!="object"||t.has(e))return e;t.add(e),Object.freeze(e);for(let r of Object.keys(e))Qr(e[r],t);return e}function ut(e){let t=ue(e);return typeof structuredClone=="function"?structuredClone(t):JSON.parse(JSON.stringify(t))}function en(e){return e==null||typeof e!="object"?e:Qr(ut(e))}function tn(e){if(typeof document>"u"||typeof e!="function")return;if(document.body){e();return}let t=()=>{document.body&&(document.removeEventListener("DOMContentLoaded",t),e())};document.addEventListener("DOMContentLoaded",t,{once:!0})}function Qo(e={}){let t=e?.interactive!==!1;typeof document>"u"||tn(()=>{if(document.querySelector("pds-live-edit")){if(!t){let r=document.querySelector("pds-live-edit");r&&r.setAttribute("data-pds-live-settings-only","true")}}else{let r=document.createElement("pds-live-edit");t||r.setAttribute("data-pds-live-settings-only","true"),document.body.appendChild(r)}})}function dt(e=0){return new Promise(t=>{setTimeout(t,Math.max(0,Number(e)||0))})}async function He(e={}){let t=e?.mountIfMissing!==!1,r=e?.interactive!==!1,n=typeof e?.requiredMethod=="string"&&e.requiredMethod.trim()?e.requiredMethod.trim():"openDesignSettings",o=Number.isFinite(Number(e?.timeoutMs))?Number(e.timeoutMs):2400;if(typeof document>"u"||!t&&!document.querySelector("pds-live-edit"))return null;t&&Qo({interactive:r});let a=Date.now();for(;Date.now()-a<o;){let s=document.querySelector("pds-live-edit");if(!s){await dt(40);continue}if(typeof s?.[n]=="function")return s;if(typeof customElements<"u"&&typeof customElements.whenDefined=="function"){try{await Promise.race([customElements.whenDefined("pds-live-edit"),dt(80)])}catch{await dt(40)}continue}await dt(40)}let i=document.querySelector("pds-live-edit");return i&&typeof i?.[n]=="function"?i:null}function rn(){if(typeof document>"u")return;document.querySelectorAll("pds-live-edit").forEach(t=>{typeof t?.setInteractiveEditingEnabled=="function"&&t.setInteractiveEditingEnabled(!1),t.remove()})}function ea(e){return e?typeof e.isInteractiveEditingEnabled=="function"?!!e.isInteractiveEditingEnabled():!0:!1}function ta(){if(typeof document>"u"||document.getElementById(ar))return;let e=document.createElement("style");e.id=ar,e.textContent=`
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
      border-bottom: var(--border-width-thin) solid var(--color-border);
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
      color: var(--color-danger-700);
    }

    :where(.pds-live-edit-toggle-nav menu a[data-pds-live-action="reset-config"] pds-icon) {
      color: var(--color-danger-700);
    }
  `,document.head.appendChild(e)}function or(e,t){if(!e)return;e.classList.toggle("btn-primary",t),e.classList.toggle("btn-secondary",!t),e.setAttribute("aria-pressed",t?"true":"false");let r="PDS Manager";e.setAttribute("aria-label",r),e.setAttribute("title",r)}async function ra(){if(typeof document>"u")return null;ta();let e=document.getElementById(pt);if(!e){let t=document.createElement("nav");t.className="pds-live-edit-toggle-nav",t.setAttribute("data-dropdown",""),t.setAttribute("data-mode","auto"),t.setAttribute("data-pds-live-edit-ignore","true"),e=document.createElement("button"),e.id=pt,e.type="button",e.className="icon-only btn-secondary",e.setAttribute("data-pds-live-edit-ignore","true"),e.innerHTML='<pds-icon icon="cursor-click" size="sm"></pds-icon>';let r=document.createElement("menu");r.setAttribute("data-pds-live-edit-ignore","true");let n=(a,i,s)=>{let p=document.createElement("li"),c=document.createElement("a");c.href="#",c.dataset.pdsLiveAction=a,c.setAttribute("data-pds-live-edit-ignore","true");let d=document.createElement("pds-icon");return d.setAttribute("icon",s),d.setAttribute("size","sm"),c.append(d,document.createTextNode(` ${i}`)),p.appendChild(c),p},o=()=>{let a=document.createElement("li");a.setAttribute("data-pds-live-edit-ignore","true");let i=document.createElement("hr");return i.setAttribute("aria-hidden","true"),a.appendChild(i),a};r.appendChild(n("toggle",se("Toggle live editing"),"pencil")),r.appendChild(n("open-settings",se("Open Settings"),"gear")),r.appendChild(o()),r.appendChild(n("reset-config",se("Reset Config"),"arrow-counter-clockwise")),await na(r),t.append(e,r),tn(()=>{document.getElementById(pt)||document.body.appendChild(t)})}return e}async function na(e){if(e instanceof Element){if(e.__pdsLiveSharedMenuItemInFlight)return e.__pdsLiveSharedMenuItemInFlight;e.__pdsLiveSharedMenuItemInFlight=(async()=>{e.querySelectorAll("li.pds-live-shared-quick-mode-item").forEach(s=>s.remove());let t=await He({mountIfMissing:!0,interactive:!1,requiredMethod:"createSharedQuickModeMenuItem",timeoutMs:7e3});if(!t||typeof t.createSharedQuickModeMenuItem!="function")return;let r=await t.createSharedQuickModeMenuItem();if(!(r instanceof Element))return;r.classList.add("pds-live-shared-quick-mode-item");let o=e.querySelector('a[data-pds-live-action="reset-config"]')?.closest("li")||null,a=o?.previousElementSibling||null,i=a&&a.querySelector?.(":scope > hr")?a:null;if(i){e.insertBefore(r,i);return}if(o){e.insertBefore(r,o);return}e.appendChild(r)})();try{await e.__pdsLiveSharedMenuItemInFlight}finally{e.__pdsLiveSharedMenuItemInFlight=null}}}function oa(){if(typeof document>"u")return;let e=document.getElementById(pt);if(e){let r=e.closest(".pds-live-edit-toggle-nav");r?r.remove():e.remove()}let t=document.getElementById(ar);t&&t.remove(),rn()}async function aa(){if(typeof document>"u")return;let e=await ra();if(!e)return;let t=async i=>{if(i){let s=await He({mountIfMissing:!0});s&&typeof s.setInteractiveEditingEnabled=="function"&&s.setInteractiveEditingEnabled(!0)}else rn();or(e,i)};t(!1);let r=e.closest(".pds-live-edit-toggle-nav")||e;e.__pdsLiveEditActionHandler&&r.removeEventListener("click",e.__pdsLiveEditActionHandler);let n=async i=>{let s=i.target?.closest?.("[data-pds-live-action]");if(!s)return;i.preventDefault();let p=String(s.dataset.pdsLiveAction||"");if(p==="toggle"){let c=await He({mountIfMissing:!1}),d=ea(c);await t(!d);return}if(p==="open-settings"){let c=await He({mountIfMissing:!0,requiredMethod:"openDesignSettings",interactive:!1});c&&typeof c.setInteractiveEditingEnabled=="function"&&c.setInteractiveEditingEnabled(!1),c&&typeof c.openDesignSettings=="function"&&(or(e,!1),await c.openDesignSettings());return}if(p==="reset-config"){let c=await He({mountIfMissing:!0,requiredMethod:"resetConfig",interactive:!1});or(e,!1),c&&typeof c.resetConfig=="function"&&await c.resetConfig();return}};e.__pdsLiveEditActionHandler=n,r.addEventListener("click",n),e.__pdsLiveEditDisableHandler&&document.removeEventListener("pds:live-edit:disable",e.__pdsLiveEditDisableHandler),e.__pdsLiveEditEnableHandler&&document.removeEventListener("pds:live-edit:enable",e.__pdsLiveEditEnableHandler);let o=()=>{t(!1)},a=()=>{t(!0)};e.__pdsLiveEditDisableHandler=o,document.addEventListener("pds:live-edit:disable",o),e.__pdsLiveEditEnableHandler=a,document.addEventListener("pds:live-edit:enable",a)}function ia(){if(typeof window>"u"||!window.localStorage)return null;try{let e=window.localStorage.getItem("pure-ds-config");if(!e)return null;let t=JSON.parse(e);if(t&&("preset"in t||"design"in t))return t}catch{return null}return null}function ir(e={},t={}){if(!t||typeof t!="object")return e;let r=Array.isArray(e)?[...e]:{...e};for(let[n,o]of Object.entries(t))o&&typeof o=="object"&&!Array.isArray(o)?r[n]=ir(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o;return r}function sa(e){let t=ia();if(!t||!e||typeof e!="object")return e;let r=t.preset,n=t.design&&typeof t.design=="object"?t.design:null;if(!r&&!n)return e;let o="preset"in e||"design"in e||"enhancers"in e,a={...e};if(r&&(a.preset=r),n)if(o){let i=e.design&&typeof e.design=="object"?e.design:{};a.design=ir(i,n)}else a=ir(e,n);return a}function la(e,t={}){let{hideCategory:r=!0,itemGrid:n="45px 1fr",includeIncompatible:o=!0,disableIncompatible:a=!0,categoryName:i="Presets",theme:s,onSelect:p,iconHandler:c}=t||{},d=Le(s??e?.theme),l=m=>{let f=g(m?.id)?.colors||{},b=f?.primary,k=f?.secondary,w=f?.accent;return b&&k&&w?`<span style="display:flex;gap:1px;flex-shrink:0;" aria-hidden="true">
        <span style="display:inline-block;width:10px;height:20px;background-color:${b};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${k};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${w};">&nbsp;</span>
      </span>`:m?.icon?`<pds-icon icon="${m.icon}" size="sm"></pds-icon>`:""},u=()=>{let m=e?.presets||{};return Object.values(m||{}).filter(v=>!!(v?.id||v?.name))},g=m=>m&&u().find(f=>String(f?.id||f?.name)===String(m))||null;return{hideCategory:r,itemGrid:n,iconHandler:typeof c=="function"?c:l,categories:{[i]:{trigger:()=>!0,getItems:(m={})=>{let v=String(m?.search||"").toLowerCase().trim();return u().filter(b=>{let k=String(b?.name||b?.id||"").toLowerCase(),w=String(b?.description||"").toLowerCase(),$=Array.isArray(b?.tags)?b.tags.map(A=>String(A).toLowerCase()):[];if(v&&!(k.includes(v)||w.includes(v)||$.some(F=>F.includes(v))))return!1;let T=ge(b,d);return!(!o&&!T)}).map(b=>{let k=b?.id||b?.name,w=ge(b,d),$=tr(b),T=$.length===1?`${$[0]} only`:`Not available in ${d} mode`,A=String(b?.description||"").trim(),F=w?A:A?`${A} - ${T}`:T;return{id:k,text:b?.name||String(k),description:F,icon:"palette",class:!w&&a?"disabled":"",disabled:!w&&a,tooltip:w?"":T}}).sort((b,k)=>String(b.text||"").localeCompare(String(k.text||"")))},action:async m=>{if(!m?.id||m?.disabled)return m?.id;let v=g(m.id);return v?typeof p=="function"?await p({preset:v,selection:m,resolvedTheme:d}):(typeof e?.applyLivePreset=="function"&&await e.applyLivePreset(v.id||m.id),v.id||m.id):m?.id}}}}}async function ca(e,{applyResolvedTheme:t,setupSystemListenerIfNeeded:r,emitConfigChanged:n}){if(Xr)return;let[o,a,i]=await Promise.all([Promise.resolve().then(()=>(Ot(),Tr)),Promise.resolve().then(()=>(Fe(),br)),Promise.resolve().then(()=>(nr(),ct))]),s=o?.default||o?.ontology,p=o?.findComponentForElement,c=a?.enums;e.ontology=s,e.findComponentForElement=p,e.enums=c,e.common=i||{},e.presets=Q,e.configRelations=Sr,e.configSpec=$r,e.configEditorMetadata=Cr,e.configFormSchema=Mr,e.buildConfigFormSchema=be,e.getConfigEditorMetadata=je,e.enhancerMetadata=Ur,(!Array.isArray(e.defaultEnhancers)||e.defaultEnhancers.length===0)&&(e.defaultEnhancers=Array.isArray(rt)?rt:[]),e.applyStyles=function(d){let l=d||X.instance;Wr(l),typeof n=="function"&&n({mode:"live",source:"live:styles-applied"})},e.adoptLayers=function(d,l,u){return tt(d,l,u,X.instance)},e.adoptPrimitives=function(d,l){return et(d,l,X.instance)},e.getGenerator=async function(){return X},e.buildPresetOmniboxSettings=function(d={}){return la(e,d)},e.applyLivePreset=async function(d,l={}){if(!d)return!1;if(!e.registry?.isLive)return e.log("warn","PDS.applyLivePreset is only available in live mode."),!1;let u=e.currentConfig||{},{design:g,preset:m,...v}=u,f={...ut(v),preset:d},b=Xt(f,{},{presets:Q,defaultLog:Bt,validateDesignConfig:It,validateInitConfig:jt}),k=Le(e.theme);if(!ge(b.generatorConfig.design,k)){let A=b.presetInfo?.name||b.generatorConfig?.design?.name||d;e.log("warn",`PDS theme "${k}" not supported by preset "${A}".`)}u.theme&&!b.generatorConfig.theme&&(b.generatorConfig.theme=u.theme);let w=new X(b.generatorConfig);if(b.generatorConfig.design?.typography)try{await Jt(b.generatorConfig.design.typography)}catch(A){b.generatorConfig?.log?.("warn","Failed to load some fonts from Google Fonts:",A)}e.applyStyles?.(w);let $=b.presetInfo||{id:d,name:d};if(e.currentPreset=$,e.compiled=en({...u,preset:b.generatorConfig.preset,design:b.generatorConfig.design,theme:b.generatorConfig.theme||u.theme}),e.configEditorMetadata=je(b.generatorConfig.design),e.configFormSchema=be(b.generatorConfig.design),l?.persist!==!1&&typeof window<"u"){let A="pure-ds-config";try{let F=localStorage.getItem(A),I=F?JSON.parse(F):null,z={...I&&typeof I=="object"?I:{},preset:$.id||d,design:ut(b.generatorConfig.design||{})};localStorage.setItem(A,JSON.stringify(z))}catch(F){b.generatorConfig?.log?.("warn","Failed to store preset:",F)}}return!0},e.preloadCritical=function(d,l={}){if(typeof window>"u"||!document.head||!d)return;let{theme:u,layers:g=["tokens"]}=l;try{let m=u||"light";(u==="system"||!u)&&(m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",m);let v=d.design?{...d,theme:m}:{design:d,theme:m},f=new X(v),b=g.map(k=>{try{return f.css?.[k]||""}catch{return""}}).filter(k=>k.trim()).join(`
`);if(b){let k=document.head.querySelector("style[data-pds-preload]");k&&k.remove();let w=document.createElement("style");w.setAttribute("data-pds-preload",""),w.textContent=b,document.head.insertBefore(w,document.head.firstChild)}}catch(m){e.log("warn","PDS preload failed:",m)}},Xr=!0}async function da(e,t,{emitReady:r,emitConfigChanged:n,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}){if(!t||typeof t!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");let i=t?.design?.icons?.externalPath||t?.icons?.externalPath||null;if(t=sa(t),typeof i=="string"&&i.trim()){let g=t?.design&&typeof t.design=="object"?t.design:{},m=g?.icons&&typeof g.icons=="object"?g.icons:{};t={...t,design:{...g,icons:{...m,externalPath:i}}}}if(await ca(e,{applyResolvedTheme:o,setupSystemListenerIfNeeded:a,emitConfigChanged:n}),at(e),typeof document<"u"&&document.adoptedStyleSheets){let g=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(v=>v._pdsFouc)){let v=new CSSStyleSheet;v.replaceSync(g),v._pdsFouc=!0,document.adoptedStyleSheets=[v,...document.adoptedStyleSheets]}}catch(m){if(e.log("warn","Constructable stylesheets not supported, using <style> tag fallback:",m),!document.head.querySelector("style[data-pds-fouc]")){let f=document.createElement("style");f.setAttribute("data-pds-fouc",""),f.textContent=g,document.head.insertBefore(f,document.head.firstChild)}}}let s=t.applyGlobalStyles??!0,p=t.manageTheme??!0,c=t.themeStorageKey??"pure-ds-theme",d=t.preloadStyles??!1,l=t.criticalLayers??["tokens","primitives"],u=t&&t.autoDefine||null;try{let{resolvedTheme:g}=it({manageTheme:p,themeStorageKey:c,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}),m=Xt(t,{},{presets:Q,defaultLog:Bt,validateDesignConfig:It,validateInitConfig:jt});if(p&&!ge(m.generatorConfig.design,g)){let z=m.presetInfo?.name||m.generatorConfig?.design?.name||m.generatorConfig?.preset||"current preset";e.log("warn",`PDS theme "${g}" not supported by preset "${z}".`)}let v=m.enhancers,{log:f,...b}=m.generatorConfig,k=ut(b);k.log=f,p&&(k.theme=g);let w=new X(k);if(k.design?.typography)try{await Jt(k.design.typography)}catch(z){k?.log?.("warn","Failed to load some fonts from Google Fonts:",z)}if(d&&typeof window<"u"&&document.head)try{let z=l.map(C=>{try{return w.css?.[C]||""}catch(P){return k?.log?.("warn",`Failed to generate critical CSS for layer "${C}":`,P),""}}).filter(C=>C.trim()).join(`
`);if(z){let C=document.head.querySelector("style[data-pds-critical]");C&&C.remove();let P=document.createElement("style");P.setAttribute("data-pds-critical",""),P.textContent=z;let L=document.head.querySelector('meta[charset], meta[name="viewport"]');L?L.parentNode.insertBefore(P,L.nextSibling):document.head.insertBefore(P,document.head.firstChild)}}catch(z){k?.log?.("warn","Failed to preload critical styles:",z)}e.registry.setLiveMode(),m.presetInfo?.name?k?.log?.("log",`PDS live with preset "${m.presetInfo.name}"`):k?.log?.("log","PDS live with custom config"),s&&(e.applyStyles?.(X.instance),typeof window<"u"&&setTimeout(()=>{let z=document.head.querySelector("style[data-pds-critical]");z&&z.remove();let C=document.head.querySelector("style[data-pds-preload]");C&&C.remove();let P=document.getElementById("pds-runtime-stylesheet");P&&P.remove()},100));let $=ze(t,{resolvePublicAssetURL:ke}),T;u&&u.baseURL?T=Se($e(u.baseURL,{preferModule:!1})):T=`${$}components/`;let A=null,F=[];try{let z=await st({autoDefineBaseURL:T,autoDefinePreload:u&&Array.isArray(u.predefine)&&u.predefine||[],autoDefineMapper:u&&typeof u.mapper=="function"&&u.mapper||null,enhancers:v,autoDefineOverrides:u||null,autoDefinePreferModule:!(u&&u.baseURL)},{baseEnhancers:rt});A=z.autoDefiner,F=z.mergedEnhancers||[]}catch(z){k?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",z)}let I=w?.options||k;if(e.compiled=en({mode:"live",...I,theme:g,enhancers:F}),e.configEditorMetadata=je(m.generatorConfig.design),e.configFormSchema=be(m.generatorConfig.design),typeof n=="function"&&n({mode:"live",source:"live:config-applied",preset:m.generatorConfig.preset}),typeof document<"u")try{t?.liveEdit?setTimeout(()=>{aa()},0):oa()}catch(z){k?.log?.("warn","Live editor toggle failed to start:",z)}return r({mode:"live",generator:w,config:I,theme:g,autoDefiner:A}),{generator:w,config:I,theme:g,autoDefiner:A}}catch(g){throw e.dispatchEvent(new CustomEvent("pds:error",{detail:{error:g}})),g}}function pa(e){let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):.5}function ua(e){return Array.isArray(e)?e.map(t=>t?{severity:String(t.severity||"info").toLowerCase(),message:String(t.message||""),path:t.path?String(t.path):""}:null).filter(t=>t&&t.message):[]}function W(e={}){let t=String(e.source||"unknown"),r=String(e.type||"generic"),n=pa(e.confidence),o=ua(e.issues),a=e.designPatch&&typeof e.designPatch=="object"?e.designPatch:{},i=e.template&&typeof e.template=="object"?e.template:null;return{source:t,type:r,confidence:n,issues:o,designPatch:a,template:i,meta:e.meta&&typeof e.meta=="object"?e.meta:{}}}function ga(e){return!!(e&&typeof e=="object"&&"source"in e&&"type"in e&&"confidence"in e&&"issues"in e&&"designPatch"in e)}var ma="../templates/templates.json",nn="/assets/pds/templates/templates.json",fa=["public","assets","pds","templates","templates.json"],ha=["..","..","..","public","assets","pds","templates","templates.json"],gt=null;function on(){return!!(typeof process<"u"&&process?.versions?.node)}function ba(e={}){return{id:String(e.id||"").trim(),name:String(e.name||e.id||"Template").trim(),description:String(e.description||"").trim(),icon:String(e.icon||"layout").trim(),file:String(e.file||"").trim(),tags:Array.isArray(e.tags)?e.tags.map(t=>String(t)):[]}}function mt(e={},t={}){let n=(Array.isArray(e)?e:Array.isArray(e?.templates)?e.templates:[]).map(ba).filter(o=>o.id&&o.file);return{version:e?.version||"1",templates:n,__catalogURL:t.catalogURL||null,__catalogFilePath:t.catalogFilePath||null}}async function ya(e={}){let r=[e.catalogURL||globalThis?.PDS?.currentConfig?.templateCatalogURL,ma,nn].filter(Boolean);for(let n of r)try{let o=new URL(n,import.meta.url).href,a=await fetch(o,{credentials:"same-origin"});if(!a.ok)continue;let i=await a.json();return mt(i,{catalogURL:o})}catch{}return mt({templates:[]})}async function va(e={}){let t="node:fs/promises",r="node:path",n="node:url",[{readFile:o},a,{fileURLToPath:i}]=await Promise.all([import(t),import(r),import(n)]),s=[];e.catalogPath&&s.push(a.resolve(e.catalogPath)),s.push(a.resolve(process.cwd(),...fa));let p=a.dirname(i(import.meta.url));s.push(a.resolve(p,...ha));for(let c of s)try{let d=await o(c,"utf8"),l=JSON.parse(d);return mt(l,{catalogFilePath:c})}catch{}return mt({templates:[]})}async function xa(e,t){if(!e?.file)return"";if(!on()){let p=t?.__catalogURL||nn,c=new URL(e.file,p).href,d=await fetch(c,{credentials:"same-origin"});if(!d.ok)throw new Error(`Template file not found: ${e.file}`);return(await d.text()).trim()}let r="node:fs/promises",n="node:path",[{readFile:o},a]=await Promise.all([import(r),import(n)]),i=t?.__catalogFilePath?a.dirname(t.__catalogFilePath):a.resolve(process.cwd(),"public","assets","pds","templates"),s=a.resolve(i,e.file);return(await o(s,"utf8")).trim()}async function ft(e={}){return gt&&!e.forceReload||(gt=on()?await va(e):await ya(e)),gt}async function an(e={}){return(await ft(e)).templates.map(({id:r,name:n,description:o,icon:a,file:i,tags:s})=>({id:r,name:n,description:o,icon:a,file:i,tags:s}))}async function wa(e,t={}){let r=await ft(t),n=r.templates.find(a=>a.id===e)||null;if(!n)return null;let o=await xa(n,r);return{...n,html:o}}async function sn(e,t={}){let r=await wa(e,t);return r?W({source:"template",type:"template",confidence:1,template:{id:r.id,name:r.name,html:r.html,icon:r.icon,description:r.description}}):W({source:"template",type:"template",confidence:0,issues:[{severity:"error",message:`Unknown template: ${e}`}]})}var ln={version:"tw2pds-layout-v4",summary:"Deterministic Tailwind\u2192PDS conversion rules focused on layout intent, semantic primitive mapping, and richer import-* fallback coverage.",governance:[{id:"layout.utilities.grid",controls:["grid","grid-cols-*","grid-auto-*"],note:"When false, grid mappings are skipped."},{id:"layout.utilities.flex",controls:["flex","flex-*","items-*","justify-*","grow"],note:"When false, flex mappings are skipped."},{id:"layout.utilities.spacing",controls:["gap-*","stack-*"],note:"When false, spacing mappings are skipped."},{id:"layout.utilities.container",controls:["container","max-w-*"],note:"When false, container mappings are skipped."}],nonPdsClassPatterns:["^group(?:[/:].*)?$","^layout-container$"],neverFallbackTags:["table","thead","tbody","tfoot","tr","th","td","caption","colgroup","col"],directMappings:[{id:"layout.flex.base",tw:"flex",pds:["flex"],gate:"flex"},{id:"layout.flex.inline",tw:"inline-flex",pds:["flex"],gate:"flex"},{id:"layout.flex.row",tw:"flex-row",pds:["flex-row"],gate:"flex"},{id:"layout.flex.col",tw:"flex-col",pds:["flex-col"],gate:"flex"},{id:"layout.flex.wrap",tw:"flex-wrap",pds:["flex-wrap"],gate:"flex"},{id:"layout.flex.grow",tw:"grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow.tw",tw:"flex-grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow1",tw:"flex-1",pds:["grow"],gate:"flex"},{id:"layout.items.start",tw:"items-start",pds:["items-start"],gate:"flex"},{id:"layout.items.center",tw:"items-center",pds:["items-center"],gate:"flex"},{id:"layout.items.end",tw:"items-end",pds:["items-end"],gate:"flex"},{id:"layout.items.stretch",tw:"items-stretch",pds:["items-stretch"],gate:"flex"},{id:"layout.items.baseline",tw:"items-baseline",pds:["items-baseline"],gate:"flex"},{id:"layout.justify.start",tw:"justify-start",pds:["justify-start"],gate:"flex"},{id:"layout.justify.center",tw:"justify-center",pds:["justify-center"],gate:"flex"},{id:"layout.justify.end",tw:"justify-end",pds:["justify-end"],gate:"flex"},{id:"layout.justify.between",tw:"justify-between",pds:["justify-between"],gate:"flex"},{id:"layout.justify.around",tw:"justify-around",pds:["justify-around"],gate:"flex"},{id:"layout.justify.evenly",tw:"justify-evenly",pds:["justify-evenly"],gate:"flex"},{id:"layout.grid.base",tw:"grid",pds:["grid"],gate:"grid"},{id:"layout.grid.cols.1",tw:"grid-cols-1",pds:["grid-cols-1"],gate:"grid"},{id:"layout.grid.cols.2",tw:"grid-cols-2",pds:["grid-cols-2"],gate:"grid"},{id:"layout.grid.cols.3",tw:"grid-cols-3",pds:["grid-cols-3"],gate:"grid"},{id:"layout.grid.cols.4",tw:"grid-cols-4",pds:["grid-cols-4"],gate:"grid"},{id:"layout.grid.cols.6",tw:"grid-cols-6",pds:["grid-cols-6"],gate:"grid"},{id:"layout.container",tw:"container",pds:["container"],gate:"container"},{id:"intent.surface.shadow",tw:"shadow",pds:["surface-elevated"]},{id:"intent.surface.shadow-md",tw:"shadow-md",pds:["surface-elevated"]},{id:"intent.surface.shadow-lg",tw:"shadow-lg",pds:["surface-elevated"]},{id:"intent.surface.base",tw:"bg-white",pds:["surface-base"]},{id:"typography.align.center",tw:"text-center",pds:["text-center"]},{id:"typography.align.left",tw:"text-left",pds:["text-left"]},{id:"typography.align.right",tw:"text-right",pds:["text-right"]},{id:"typography.text.muted.gray500",tw:"text-gray-500",pds:["text-muted"]},{id:"typography.text.muted.slate500",tw:"text-slate-500",pds:["text-muted"]}],ignoredPatterns:[{id:"style.color",pattern:"^(?:text|from|to|via|decoration|accent|caret)-|^bg-(?!cover$|center$|no-repeat$)",reason:"Visual style token skipped in favor of semantic PDS styling."},{id:"style.radius-border-shadow",pattern:"^(?:rounded|ring|border|shadow|outline)-?",reason:"Surface/shape inferred at primitive level."},{id:"style.typography",pattern:"^(?:font|leading|tracking|uppercase|lowercase|capitalize)-?",reason:"Typography atomic utilities are skipped."},{id:"style.effects",pattern:"^(?:opacity|blur|backdrop|drop-shadow|mix-blend|filter)-",reason:"Visual effects skipped unless mapped to a PDS utility."},{id:"style.transitions",pattern:"^(?:transition|duration|ease|delay|animate)-",reason:"Motion is system-defined in PDS."},{id:"style.spacing.atomic",pattern:"^(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-",reason:"Atomic spacing skipped; structural spacing intent is mapped."},{id:"style.positioning.atomic",pattern:"^(?:absolute|relative|fixed|sticky|inset(?:-[xy])?|top|right|bottom|left|z|translate(?:-[xy])?|-translate-[xy])(?:-|$)",reason:"Atomic positioning/offset utilities are skipped so PDS primitives and layout utilities control placement."}],intentRules:[{id:"intent.layout.responsive-grid-to-auto",summary:"Collapse responsive grid-cols patterns (including base+md two-step patterns) to best-fit grid-auto-*"},{id:"intent.layout.mobile-stack",summary:"Map flex-col + md/lg:flex-row to mobile-stack"},{id:"intent.component.card",summary:"Infer card/surface classes from rounded+shadow+surface signals"},{id:"intent.component.card.normalize",summary:"Detect Tailwind card utility clusters and normalize them to PDS card and surface variants."},{id:"intent.component.button",summary:"Infer btn-primary / btn-outline / icon-only from CTA patterns"},{id:"intent.component.button.normalize",summary:"Prevents import-* style classes on button-like elements and applies PDS button variants/sizes."},{id:"intent.component.button.layout-grow",summary:"Preserve CTA row width intent on button-like elements by mapping w-full/flex-1 to grow."},{id:"intent.icon.color-preserve",summary:"Preserve icon color intent by mapping Tailwind text color utilities on icon-like elements to tokenized import-* classes."},{id:"intent.component.badge.normalize",summary:"Detects Tailwind badge/pill utility clusters and normalizes them to PDS badge primitives/variants."},{id:"intent.typography.heading-semantic",summary:"Removes Tailwind heading typography/color utilities so heading semantics and PDS defaults control typography."},{id:"intent.surface.footer-inverse",summary:"Use surface-inverse for footers with explicit background intent"},{id:"intent.typography.link-treatment",summary:"Apply minimal link treatment for hover/transition-tailwind anchors"},{id:"intent.typography.link-active-preserve",summary:"Preserve anchor text color intent (including active menu states) by mapping Tailwind text utilities to tokenized import-* classes."},{id:"intent.typography.metric-paragraph-to-div",summary:"Normalize metric display lines from paragraph tags to div tags to avoid default paragraph margins in compact stat layouts."},{id:"intent.typography.metric-pair-no-stack",summary:"When a compact metric container has two consecutive typography lines, remove stack-sm so spacing follows Tailwind preflight no-margin assumptions."},{id:"intent.typography.semantic-heading-from-scale",summary:"Map large bold typography scales (text-2xl/text-3xl/text-4xl) to semantic heading tags when possible."},{id:"intent.typography.bold-to-strong",summary:"Prefer semantic strong tags for bold inline text intent instead of utility-only font-weight classes."},{id:"intent.preflight.tailwind-runtime-detected",summary:"Detect Tailwind runtime CSS injection and translate key preflight intent"},{id:"intent.preflight.list-reset",summary:"Preserve Tailwind list-reset preflight behavior via scoped fallback class"},{id:"intent.preflight.anchor-reset",summary:"Preserve Tailwind anchor reset preflight behavior via scoped fallback class"},{id:"table.strict-tags.no-classes",summary:"Never emit classes for semantic table tags (table/thead/tbody/tfoot/tr/th/td/caption/colgroup/col)"},{id:"intent.form.nested-label",summary:"Convert sibling label+control pairs into nested labels"},{id:"fallback.import-style",summary:"Generate import-* classes + local style block for unmapped utility styles"}],gapScaleMap:{"gap-0":"gap-0","gap-1":"gap-xs","gap-2":"gap-sm","gap-3":"gap-sm","gap-4":"gap-md","gap-5":"gap-md","gap-6":"gap-lg","gap-7":"gap-lg","gap-8":"gap-xl","gap-10":"gap-xl","gap-12":"gap-xl"},maxWidthMap:{"max-w-xs":"max-w-sm","max-w-sm":"max-w-sm","max-w-md":"max-w-md","max-w-lg":"max-w-lg","max-w-xl":"max-w-xl","max-w-2xl":"max-w-xl","max-w-3xl":"max-w-xl","max-w-4xl":"max-w-xl","max-w-5xl":"max-w-xl","max-w-6xl":"max-w-xl","max-w-7xl":"max-w-xl"},tailwindSizeScale:{"0":"var(--spacing-0)","0.5":"0.125rem","1":"var(--spacing-1)","1.5":"0.375rem","2":"var(--spacing-2)","2.5":"0.625rem","3":"var(--spacing-3)","3.5":"0.875rem","4":"var(--spacing-4)","5":"var(--spacing-5)","6":"var(--spacing-6)","7":"var(--spacing-7)","8":"var(--spacing-8)","9":"var(--spacing-9)","10":"var(--spacing-10)","11":"var(--spacing-11)","12":"var(--spacing-12)","14":"3.5rem","16":"4rem","20":"5rem","24":"6rem","28":"7rem","32":"8rem","36":"9rem","40":"10rem","48":"12rem"},tailwindShadeScale:["50","100","200","300","400","500","600","700","800","900"],defaultTailwindShade:"500",importStyleRules:{"mx-auto":"margin-left:auto;margin-right:auto","ml-auto":"margin-left:auto","mr-auto":"margin-right:auto","w-full":"width:100%","w-auto":"width:auto","h-full":"height:100%","h-48":"height:12rem","h-2.5":"height:0.625rem","h-10":"height:var(--spacing-10)","h-2":"height:var(--spacing-2)","w-2":"width:var(--spacing-2)","size-8":"width:var(--spacing-8);height:var(--spacing-8)","size-10":"width:var(--spacing-10);height:var(--spacing-10)","size-full":"width:100%;height:100%","min-h-screen":"min-height:100vh","overflow-hidden":"overflow:hidden","overflow-x-hidden":"overflow-x:hidden","overflow-x-auto":"overflow-x:auto","whitespace-nowrap":"white-space:nowrap",hidden:"display:none",block:"display:block",truncate:"overflow:hidden;text-overflow:ellipsis;white-space:nowrap","justify-items-center":"justify-items:center","justify-items-start":"justify-items:start","justify-items-end":"justify-items:end","justify-items-stretch":"justify-items:stretch","grid-flow-col":"grid-auto-flow:column","aspect-square":"aspect-ratio:1 / 1","bg-center":"background-position:center","bg-cover":"background-size:cover","bg-no-repeat":"background-repeat:no-repeat","transition-colors":"transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms"},importStyleDynamicRules:[{id:"fallback.import-style.gap-scale",pattern:"^gap-(\\d+)$",summary:"Converts gap scale utilities (including responsive variants like md:gap-6) to generated import-* fallback classes."},{id:"fallback.import-style.min-width-arbitrary",pattern:"^min-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-width utilities (e.g. min-w-[600px]) to generated import-* fallback classes."},{id:"fallback.import-style.max-width-arbitrary",pattern:"^max-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary max-width utilities (e.g. max-w-[480px]) to generated import-* fallback classes."},{id:"fallback.import-style.min-height-arbitrary",pattern:"^min-h-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-height utilities (e.g. min-h-[180px]) to generated import-* fallback classes."},{id:"fallback.import-style.grid-rows-arbitrary",pattern:"^grid-rows-\\[[^\\]]+\\]$",summary:"Converts arbitrary grid template row utilities (e.g. grid-rows-[1fr_auto]) to generated import-* fallback classes."},{id:"fallback.import-style.size-scale",pattern:"^size-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts size scale/arbitrary utilities into width+height fallback declarations."},{id:"fallback.import-style.width-height-scale",pattern:"^[wh]-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts width/height scale and arbitrary utilities to import-* classes."},{id:"fallback.import-style.spacing",pattern:"^-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(.+)$",summary:"Converts spacing utilities to directional padding/margin fallback declarations, including responsive variants."},{id:"fallback.import-style.text-size",pattern:"^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$",summary:"Converts common text size utilities to import-* font-size declarations."},{id:"fallback.import-style.font-weight",pattern:"^font-(normal|medium|semibold|bold|extrabold|black)$",summary:"Converts common font weight utilities to import-* font-weight declarations."},{id:"fallback.import-style.leading-tracking",pattern:"^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|tighter|wide|wider|widest)$",summary:"Converts line-height and letter-spacing utilities to import-* declarations for typography fidelity."},{id:"fallback.import-style.bg-tokenized",pattern:"^bg-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind background color utilities by mapping families like blue/purple/green/red to PDS semantic tokens."},{id:"fallback.import-style.bg-semantic",pattern:"^bg-(primary|secondary|accent)$",summary:"Safeguards semantic background utilities by mapping bg-primary/bg-secondary/bg-accent to PDS color tokens."},{id:"fallback.import-style.text-tokenized",pattern:"^text-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind text color utilities by mapping common families to PDS semantic tokens."},{id:"fallback.import-style.rounded",pattern:"^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$",summary:"Safeguards rounded utilities (including rounded-t-sm) by mapping to PDS radius tokens."},{id:"fallback.import-style.overlay-alpha",pattern:"^bg-black\\/(\\d{1,3})$",summary:"Converts alpha black overlay classes (e.g. bg-black/50) to tokenized color-mix background overlays."},{id:"fallback.import-style.text-inverse",pattern:"^text-white$",summary:"Preserves white foreground intent for text-on-image use cases using inverse-compatible tokens."},{id:"fallback.import-style.bg-arbitrary",pattern:"^bg-\\[[^\\]]+\\]$",summary:"Converts arbitrary background colors to import-* fallback classes when values are CSS-safe."},{id:"fallback.import-style.text-arbitrary",pattern:"^text-\\[[^\\]]+\\]$",summary:"Converts arbitrary text colors to import-* fallback classes when values are CSS-safe."}]};Fe();nr();typeof h.initializing!="boolean"&&(h.initializing=!1);"currentPreset"in h||(h.currentPreset=null);typeof h.debug!="boolean"&&(h.debug=!1);"currentConfig"in h||(h.currentConfig=null);"compiled"in h||(h.compiled=null);typeof h.logHandler!="function"&&(h.logHandler=null);"mode"in h||(h.mode=null);var ht=null,bt=null,yt=null,vt=null,xt=null,wt=null,dn="__pdsLocalizationRuntime";function Ce(){if(wt)return wt;let e=h?.[dn];return e&&typeof e=="object"?(wt=e,e):null}function Sa(e){let t=e&&typeof e=="object"?e:null;wt=t,h[dn]=t}Fr({getLogger:()=>typeof h.logHandler=="function"?h.logHandler:null,getContext:()=>{let e=h?.mode||h?.compiled?.mode||(h?.registry?.isLive?"live":"static"),t=(h?.debug||h?.currentConfig?.debug||h?.currentConfig?.design?.debug||h?.compiled?.debug||h?.compiled?.design?.debug||!1)===!0;return{mode:e,debug:t,thisArg:h}}});h.log=(e="log",t,...r)=>{Qe(e,t,...r)};var U={locale:"en",messages:{},hasProvider:!1},kt=new Set;function pn(e){return!!e&&typeof e!="string"&&typeof e=="object"&&"strTag"in e}function un(e=[]){let t="";for(let r=0;r<=e.length-1;r+=1)t+=e[r],r<e.length-1&&(t+=`{${r}}`);return t}function $a(e,t){return String(e).replace(/\{(\d+)\}/g,(r,n)=>t(Number(n)))}function za(e){if(!e||typeof e!="object")return{};let t={};for(let[r,n]of Object.entries(e)){if(typeof n=="string"){t[r]=n;continue}n&&typeof n=="object"&&typeof n.content=="string"&&(t[r]=n.content)}return t}function La(e,...t){return{strTag:!0,strings:Array.from(e||[]),values:t,raw:Array.from(e?.raw||[])}}function Ca(e){if(!e)return"";if(pn(e)){let r=un(e.strings||[]),n=U.messages[r]||r;return $a(n,o=>e.values?.[o])}let t=String(e);return U.messages[t]||t}function Ma(e){if(!e)return;let t=pn(e)?un(e.strings||[]):String(e);typeof t=="string"&&t.length>0&&kt.add(t)}function gn(e){if(!e||typeof e.msg!="function"||kt.size===0)return;let t=Array.from(kt);kt.clear();for(let r of t)try{e.msg(r)}catch{}}async function qe(){let e=Ce();return e||(xt||(xt=import(Ge("pds-localization.js")).then(r=>{if(typeof r?.msg!="function"||typeof r?.str!="function"||typeof r?.configureLocalization!="function"||typeof r?.loadLocale!="function"||typeof r?.setLocale!="function"||typeof r?.getLocalizationState!="function")throw new Error("Failed to load localization runtime exports");return Sa(r),gn(r),r}).catch(r=>{throw xt=null,r})),xt)}var mn=(e,t={})=>{let r=Ce();return typeof r?.msg=="function"?r.msg(e,t):(Ma(e),Ca(e,t))},fn=(e,...t)=>{let r=Ce();return typeof r?.str=="function"?r.str(e,...t):La(e,...t)},St=(e=null)=>{let t=Ce();if(typeof t?.configureLocalization=="function")return t.configureLocalization(e);if(!e||typeof e!="object")return U.locale="en",U.messages={},U.hasProvider=!1,{locale:U.locale,messages:{...U.messages},hasProvider:U.hasProvider};typeof e.locale=="string"&&e.locale.trim()&&(U.locale=e.locale.trim()),Object.prototype.hasOwnProperty.call(e,"messages")&&(U.messages=za(e.messages));let r=!!(e.provider||e.translate||e.loadLocale||e.setLocale);return U.hasProvider=r,r&&qe().then(n=>{n.configureLocalization(e),gn(n)}).catch(()=>{}),{locale:U.locale,messages:{...U.messages},hasProvider:U.hasProvider}},hn=async e=>(await qe()).loadLocale(e),bn=async(e,t={})=>(await qe()).setLocale(e,t),yn=()=>{let e=Ce();return typeof e?.getLocalizationState=="function"?e.getLocalizationState():{locale:U.locale,messages:{...U.messages},hasProvider:U.hasProvider}},vn=(e={})=>{let t=Ce();if(typeof t?.createJSONLocalization=="function")return t.createJSONLocalization(e);let r=typeof e?.locale=="string"&&e.locale.trim()?e.locale.trim().toLowerCase():"en",n=Array.isArray(e?.locales)?e.locales.map(p=>String(p||"").trim().toLowerCase()).filter(Boolean):[],o=Array.from(new Set([r,...n])),a=null,i=async()=>(a||(a=qe().then(p=>typeof p?.createJSONLocalization=="function"?p.createJSONLocalization(e):null).catch(()=>null)),a),s=async(p="loadLocale")=>{let c=await i();if(!c||typeof c!="object")return null;let d=c.provider;if(!d||typeof d!="object")return null;let l=d[p];return typeof l=="function"?l:p==="setLocale"&&typeof d.loadLocale=="function"?d.loadLocale:null};return{locale:r,locales:[...o],provider:{locales:[...o],async loadLocale(p={}){let c=await s("loadLocale");return typeof c!="function"?{}:c(p)},async setLocale(p={}){let c=await s("setLocale");return typeof c!="function"?{}:c(p)}}}};function Ge(e,t){return t&&typeof t=="string"?t:`${ze(h.currentConfig||{},{resolvePublicAssetURL:ke})}core/${e}`}async function Ea(){return Array.isArray(h.defaultEnhancers)&&h.defaultEnhancers.length>0?h.defaultEnhancers:(vt||(vt=import(Ge("pds-enhancers.js",h.currentConfig?.enhancersURL)).then(t=>{let r=Array.isArray(t?.defaultPDSEnhancers)?t.defaultPDSEnhancers:[];return h.defaultEnhancers=r,r}).catch(t=>{throw vt=null,t})),vt)}async function Ta(){return typeof h.ask=="function"&&h.ask!==xn?h.ask:(bt||(bt=import(Ge("pds-ask.js",h.currentConfig?.askURL)).then(t=>{let r=t?.ask;if(typeof r!="function")throw new Error("Failed to load ask helper");return h.ask=r,r}).catch(t=>{throw bt=null,t})),bt)}async function Ve(){return typeof h.toast=="function"&&h.toast!==Me?h.toast:(yt||(yt=import(Ge("pds-toast.js",h.currentConfig?.toastURL)).then(t=>{let r=t?.toast;if(typeof r!="function")throw new Error("Failed to load toast helper");return h.toast=r,r}).catch(t=>{throw yt=null,t})),yt)}async function xn(...e){return(await Ta())(...e)}async function Me(...e){return(await Ve())(...e)}Me.success=async(...e)=>(await Ve()).success(...e);Me.error=async(...e)=>(await Ve()).error(...e);Me.warning=async(...e)=>(await Ve()).warning(...e);Me.info=async(...e)=>(await Ve()).info(...e);var cn=function(e="log",t,...r){h.log(e,t,...r)};function lr(e){if(e==null)return e;if(typeof e=="function")return;if(typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>lr(r)).filter(r=>r!==void 0);let t={};for(let[r,n]of Object.entries(e)){let o=lr(n);o!==void 0&&(t[r]=o)}return t}function wn(e,t=new WeakSet){if(!e||typeof e!="object"||t.has(e))return e;t.add(e),Object.freeze(e);for(let r of Object.keys(e))wn(e[r],t);return e}function cr(e){return e==null||typeof e!="object"?e:wn(structuredClone(lr(e)))}async function Aa(e,t={}){if(t?.runtimeConfig===!1||typeof fetch!="function")return null;let r=t?.runtimeConfigURL||`${e}pds-runtime-config.json`;try{let n=await fetch(r,{cache:"no-store"});return n.ok?await n.json():null}catch{return null}}h.registry=we;h.enums=x;h.adoptLayers=tt;h.adoptPrimitives=et;h.parse=rr;h.createStylesheet=Hr;h.isLiveMode=()=>we.isLive;h.ask=xn;h.toast=Me;h.common=ct;h.msg=mn;h.str=fn;h.configureLocalization=St;h.loadLocale=hn;h.setLocale=bn;h.getLocalizationState=yn;h.createJSONLocalization=vn;h.i18n={msg:mn,str:fn,configure:St,loadLocale:hn,setLocale:bn,getState:yn,createJSONLocalization:vn};h.AutoComplete=null;h.loadAutoComplete=async()=>{if(h.AutoComplete&&typeof h.AutoComplete.connect=="function")return h.AutoComplete;let e=Ge("pds-autocomplete.js",h.currentConfig?.autoCompleteURL);return ht||(ht=import(e).then(t=>{let r=t?.AutoComplete||t?.default?.AutoComplete||t?.default||null;if(!r)throw new Error("AutoComplete export not found in module");return h.AutoComplete=r,r}).catch(t=>{throw ht=null,t})),ht};function kn(e){let t=typeof CustomEvent=="function";try{let r=t?new CustomEvent("pds:ready",{detail:e}):new Event("pds:ready");h.dispatchEvent(r)}catch{}if(typeof document<"u")if(t){let r={detail:e,bubbles:!0,composed:!0};try{document.dispatchEvent(new CustomEvent("pds:ready",r))}catch{}try{document.dispatchEvent(new CustomEvent("pds-ready",r))}catch{}}else{try{document.dispatchEvent(new Event("pds:ready"))}catch{}try{document.dispatchEvent(new Event("pds-ready"))}catch{}}}function Sn(e={}){let t=typeof CustomEvent=="function",r={at:Date.now(),...e};try{let n=t?new CustomEvent("pds:config-changed",{detail:r}):new Event("pds:config-changed");h.dispatchEvent(n)}catch{}if(typeof document<"u")if(t){let n={detail:r,bubbles:!0,composed:!0};try{document.dispatchEvent(new CustomEvent("pds:config-changed",n))}catch{}}else try{document.dispatchEvent(new Event("pds:config-changed"))}catch{}}var sr="pure-ds-theme",me=null,Ue=null;function dr(e){try{if(typeof document>"u")return;let t="light";e?e==="system"?t=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":t=e:t=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",document.documentElement.setAttribute("data-theme",t)}catch{}}function pr(e){try{if(me&&Ue){try{typeof me.removeEventListener=="function"?me.removeEventListener("change",Ue):typeof me.removeListener=="function"&&me.removeListener(Ue)}catch{}me=null,Ue=null}if(e==="system"&&typeof window<"u"&&window.matchMedia){let t=window.matchMedia("(prefers-color-scheme: dark)"),r=n=>{let o=n?.matches===void 0?t.matches:n.matches;try{let a=o?"dark":"light";document.documentElement.setAttribute("data-theme",a),h.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:a,source:"system"}}))}catch{}};me=t,Ue=r,typeof t.addEventListener=="function"?t.addEventListener("change",r):typeof t.addListener=="function"&&t.addListener(r)}}catch{}}var Ra=Object.getOwnPropertyDescriptor(h,"theme");Ra||Object.defineProperty(h,"theme",{get(){try{return typeof window>"u"?null:localStorage.getItem(sr)||null}catch{return null}},set(e){try{if(typeof window>"u")return;let t=h.currentConfig?.design||null,r=Le(e);if(t&&!ge(t,r)){let n=t?.name||h.currentPreset?.name||h.currentConfig?.preset||"current preset";h.log("warn",`PDS theme "${r}" not supported by preset "${n}".`),h.dispatchEvent(new CustomEvent("pds:theme:blocked",{detail:{theme:e,resolvedTheme:r,preset:n}}));return}e==null?localStorage.removeItem(sr):localStorage.setItem(sr,e),dr(e),pr(e),h.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:e,source:"api"}}))}catch{}}});h.defaultEnhancers=[];async function _a(e){h.initializing=!0;try{let t=e&&e.mode||"live",{mode:r,...n}=e||{};h.mode=t,h.logHandler=typeof n?.log=="function"?n.log:null,h.currentConfig=cr(n);let o=n&&typeof n.localization=="object"&&n.localization?n.localization:null;o?(await qe(),St(o)):St(null);let a;if(t==="static")a=await Fa(n);else{let{localization:s,...p}=n||{},c=ze(p,{resolvePublicAssetURL:ke}),d=p?.managerURL||p?.public?.managerURL||p?.manager?.url||new URL("core/pds-manager.js",c).href||new URL("./pds-manager.js",import.meta.url).href,{startLive:l}=await import(d);a=await l(h,p,{emitReady:kn,emitConfigChanged:Sn,applyResolvedTheme:dr,setupSystemListenerIfNeeded:pr})}h.compiled=cr(a?.config||null);let i=h?.compiled?.design?.icons?.externalPath||"/assets/img/icons/";return h.log("info",`startup ready; external icon path: ${i}`),a}finally{h.initializing=!1}}h.start=_a;async function Fa(e){if(!e||typeof e!="object")throw new Error("PDS.start({ mode: 'static', ... }) requires a valid configuration object");let t=e.applyGlobalStyles??!0,r=e.manageTheme??!0,n=e.themeStorageKey??"pure-ds-theme",o=e.staticPaths??{},a=ze(e,{resolvePublicAssetURL:ke}),i=e&&e.autoDefine||null,s;i&&i.baseURL?s=Se($e(i.baseURL,{preferModule:!1})):s=`${a}components/`;let p=i&&Array.isArray(i.predefine)&&i.predefine||[],c=i&&typeof i.mapper=="function"&&i.mapper||null;try{at(h);let{resolvedTheme:d}=it({manageTheme:r,themeStorageKey:n,applyResolvedTheme:dr,setupSystemListenerIfNeeded:pr}),l=await Aa(a,e),u=Array.isArray(e?.enhancers)?e.enhancers:e?.enhancers&&typeof e.enhancers=="object"?Object.values(e.enhancers):[],g=l?.config?{...l.config,...e,design:e?.design||l.config.design,preset:e?.preset||l.config.preset}:{...e},m={tokens:`${a}styles/pds-tokens.css.js`,primitives:`${a}styles/pds-primitives.css.js`,components:`${a}styles/pds-components.css.js`,utilities:`${a}styles/pds-utilities.css.js`,styles:`${a}styles/pds-styles.css.js`},v=l?.paths||{};if(o={...m,...v,...o},h.registry.setStaticMode(o),t&&typeof document<"u")try{let k=await h.registry.getStylesheet("styles");if(k){k._pds=!0;let w=(document.adoptedStyleSheets||[]).filter($=>$._pds!==!0);document.adoptedStyleSheets=[...w,k],Sn({mode:"static",source:"static:styles-applied"})}}catch(k){cn.call(h,"warn","Failed to apply static styles:",k)}let f=null,b=[];try{let k=await Ea(),w=await st({autoDefineBaseURL:s,autoDefinePreload:p,autoDefineMapper:c,enhancers:u,autoDefineOverrides:i||null,autoDefinePreferModule:!(i&&i.baseURL)},{baseEnhancers:k});f=w.autoDefiner,b=w.mergedEnhancers||[]}catch(k){cn.call(h,"error","\u274C Failed to initialize AutoDefiner/Enhancers (static):",k)}return h.compiled=cr({mode:"static",...g,theme:d,enhancers:b}),kn({mode:"static",config:g,theme:d,autoDefiner:f}),{config:g,theme:d,autoDefiner:f}}catch(d){throw h.dispatchEvent(new CustomEvent("pds:error",{detail:{error:d}})),d}}var Pa="src/js/pds-live-manager/tailwind-conversion-rules.json",Lt=["base","sm","md","lg","xl","2xl"];function Na(e={}){let t=Array.isArray(e.ignoredPatterns)?e.ignoredPatterns.map(n=>({...n,pattern:n?.pattern instanceof RegExp?n.pattern:new RegExp(String(n?.pattern||""))})):[],r=Array.isArray(e.nonPdsClassPatterns)?e.nonPdsClassPatterns.map(n=>n instanceof RegExp?n:new RegExp(String(n||""))):[];return{...e,ignoredPatterns:t,nonPdsClassPatterns:r}}var G=Na(ln),$n=G.version||"tw2pds-layout-v4",Ia=new Map(G.directMappings.map(e=>[e.tw,e])),ur=new Map(Object.entries(G.gapScaleMap||{})),zn=new Map(Object.entries(G.maxWidthMap||{})),ja=G.nonPdsClassPatterns||[],Ba=new Set(G.neverFallbackTags||[]),Oa={...G.importStyleRules||{}},Da=G.tailwindSizeScale||{},gr=Array.isArray(G.tailwindShadeScale)?G.tailwindShadeScale.map(e=>String(e)).filter(Boolean):["50","100","200","300","400","500","600","700","800","900"],Ln=gr.includes(String(G.defaultTailwindShade||""))?String(G.defaultTailwindShade):"500",zt=1.2,Wa=["container","grid","flex","gap","space","items","justify","content","place","self","col","row","w","h","min","max","p","m","rounded","border","ring","outline","shadow","bg","text","font","leading","tracking","uppercase","lowercase","capitalize","overflow","whitespace","truncate","object","aspect","opacity","blur","backdrop","transition","duration","ease","delay","animate","hidden","block","inline","absolute","relative","fixed","sticky","size"];function Cn(e="",t=""){if(!e||!t)return e;let r=new RegExp(`\\s${t}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`,"gi");return String(e).replace(r,"")}function Ha(e="",t=null){let r=String(e||""),n=0;return r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(input)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*?)>/gi,(o,a,i,s,p,c,d,l,u,g,m)=>{if(s!==g)return o;let v=Cn(`${a||""}${p||""}`,"for"),f=`<${d}${l||""} id="${g}"${m||""}>`;return n+=1,`<label${v}>${c}${f}</label>`}),r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(select|textarea)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*)>([\s\S]*?)<\/\6>/gi,(o,a,i,s,p,c,d,l,u,g,m,v)=>{if(s!==g)return o;let f=Cn(`${a||""}${p||""}`,"for"),b=`<${d}${l||""} id="${g}"${m||""}>${v}</${d}>`;return n+=1,`<label${f}>${c}${b}</label>`}),t&&n>0&&(t.labelNestingCount+=n,j(t,`Nested ${n} label/control pairs.`),R(t,"intent.form.nested-label")),r}function Ua(e="",t="base"){let r=String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rule";return`import-${t&&t!=="base"?`${t}-`:""}${r}`}function fe(e,t,r,n="base",o=""){if(!e||!t||!r)return"";let a=Ua(t,n);if(o){let i=`${n}|${o}`;e.importPseudoStyles.has(i)||e.importPseudoStyles.set(i,new Map),e.importPseudoStyles.get(i).set(a,r)}else n==="base"?e.importBaseStyles.set(a,r):(e.importResponsiveStyles.has(n)||e.importResponsiveStyles.set(n,new Map),e.importResponsiveStyles.get(n).set(a,r));return e.importedStyleCount+=1,a}function Te(e=""){return String(e||"").trim().replace(/_/g," ")}function Ae(e=""){return!e||/[;{}]/.test(e)?!1:/^[-#(),.%/\sa-zA-Z0-9]+$/.test(e)}function Ke(e=""){let t=String(e||"").trim();if(!t)return null;let r=t.match(/^\[([^\]]+)\]$/);if(r){let n=Te(r[1]);return Ae(n)?n:null}return Da[t]||null}function qa(e=""){let t=Number(e);if(!Number.isFinite(t))return Ln;let r=String(t);return gr.includes(r)?r:gr.reduce((n,o)=>{let a=Math.abs(Number(n)-t);return Math.abs(Number(o)-t)<a?o:n},Ln)}function Ye(e="",t="500"){let r=String(e||"").toLowerCase(),n=qa(t);return["blue","sky","indigo","cyan"].includes(r)?`var(--color-primary-${n})`:["purple","violet","fuchsia"].includes(r)?`var(--color-accent-${n})`:["green","emerald","lime","teal"].includes(r)?`var(--color-success-${n})`:["yellow","amber","warning"].includes(r)?`var(--color-warning-${n})`:["red","rose","pink","orange"].includes(r)?`var(--color-danger-${n})`:["slate","gray","zinc","neutral","stone"].includes(r)?`var(--color-gray-${n})`:""}function Mn(e=""){let t=Te(e);return Ae(t)&&(/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(t)||/^(?:rgb|hsl)a?\([^)]*\)$/.test(t))?t:""}function ae(e=""){return String(e||"").split(/\s+/).map(t=>t.trim()).filter(Boolean)}function Ga(e="",t=""){if(!t)return e;let r=String(e||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return`${r} class="${t}"`;let o=n[1]||'"',a=ae(n[2]);a.includes(t)||a.push(t);let i=` class=${o}${a.join(" ")}${o}`;return r.replace(n[0],i)}function Va(e="",t=""){return t?new RegExp(`\\s${t}\\s*=`,"i").test(String(e||"")):!1}function Ka(e=""){let t=String(e||"").replace(/[-_]+/g," ").trim();return t?t.replace(/(^|\s)([a-z])/g,(r,n,o)=>`${n}${o.toUpperCase()}`):"Icon button"}function Ja(e="",t=null){let r=String(e||"");return r&&r.replace(/<(button|a)([^>]*)>\s*(<pds-icon\b[^>]*><\/pds-icon>)\s*<\/\1>/gi,(n,o,a,i)=>{let s=Ga(a,"icon-only");if(!Va(s,"aria-label")){let p=String(i).match(/\sicon\s*=\s*(["'])(.*?)\1/i),c=p?String(p[2]||""):"",d=Ka(c);s+=` aria-label="${d}"`}return t&&(t.intentHits+=1,R(t,"intent.component.button.icon-only-markup")),`<${o}${s}>${i}</${o}>`})}function Ya(e="",t=null){let r=String(e||"");if(!r)return r;let n=0,o=r.replace(/<p([^>]*?)>([\s\S]*?)<\/p>/gi,(a,i,s)=>{let p=String(i||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!p)return a;let c=ae(p[2]||""),d=c.some(u=>/^import-text-/.test(String(u||""))),l=c.includes("text-muted")||c.some(u=>/^import-font-/.test(String(u||"")));return!d||!l?a:(n+=1,`<div${i}>${s}</div>`)});return t&&n>0&&(t.intentHits+=1,R(t,"intent.typography.metric-paragraph-to-div"),j(t,`Normalized ${n} metric text paragraph tag(s) to div.`)),o}function Pn(e="",t=""){if(!t)return e;let r=String(e||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return r;let o=n[1]||'"',a=ae(n[2]).filter(s=>s!==t);if(a.length===0)return r.replace(n[0],"");let i=` class=${o}${a.join(" ")}${o}`;return r.replace(n[0],i)}function Za(e="",t=r=>r){let r=String(e||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return r;let o=n[1]||'"',a=ae(n[2]),i=t(Array.from(a)),s=Array.isArray(i)?i.filter(Boolean):a;if(s.length===0)return r.replace(n[0],"");let p=` class=${o}${s.join(" ")}${o}`;return r.replace(n[0],p)}function Xa(e="",t=null){let r=String(e||"");if(!r)return r;let n=0,o=r.replace(/<(div|section|article|aside)([^>]*)>\s*<(p|div)([^>]*)>[\s\S]*?<\/\3>\s*<(p|div)([^>]*)>[\s\S]*?<\/\5>\s*<\/\1>/gi,(a,i,s,p,c,d,l)=>{let u=String(s||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!u||!ae(u[2]).includes("stack-sm"))return a;let m=String(c||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i),v=String(l||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!m||!v)return a;let f=ae(m[2]),b=ae(v[2]);if(!(f.some($=>/^import-text-/.test(String($||"")))&&b.some($=>/^import-text-/.test(String($||"")))))return a;let w=Pn(s,"stack-sm");return n+=1,a.replace(`<${i}${s}>`,`<${i}${w}>`)});return t&&n>0&&(t.intentHits+=1,R(t,"intent.typography.metric-pair-no-stack"),j(t,`Removed stack-sm from ${n} metric text pair container(s).`)),o}function Qa(e={}){if(!e||typeof e!="object")return{};let t=e.typography;if(t&&typeof t=="object")return t;let r=e.design?.typography;return r&&typeof r=="object"?r:{}}function ei(e={}){let t=Qa(e),r=Number(t.fontScale);return Number.isFinite(r)?Math.max(1,Math.min(2,r)):zt}function ti(e="",t=zt){let n={"4xl":1,"3xl":2,"2xl":3,xl:4}[e];if(!n)return"";let o=Number.isFinite(Number(t))?Math.max(1,Math.min(2,Number(t))):zt,a=Math.max(-1,Math.min(1,Math.round((o-zt)/.25))),i=n-a;return i<1?"h1":i>4?"":`h${i}`}function ri(e="",t=null,r={}){let n=String(e||"");if(!n)return n;let o=ei(r.config||{}),a=0,i=0,s=n.replace(/<(p|div|span)([^>]*)>([\s\S]*?)<\/\1>/gi,(p,c,d,l)=>{let u=String(d||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!u)return p;let g=ae(u[2]);if(!g.includes("import-font-bold"))return p;let v=g.find($=>/^import-text-(?:4xl|3xl|2xl|xl)$/.test(String($||"")))||"",f=v.match(/^import-text-(4xl|3xl|2xl|xl)$/);if(f){let $=ti(f[1],o);if(!$)return p;let T=Za(d,A=>A.filter(F=>F!=="import-font-bold"&&F!==v));return a+=1,`<${$}${T}>${l}</${$}>`}let b=/<\/?(?:div|p|section|article|aside|main|header|footer|ul|ol|li|table|tr|td|th|h[1-6])\b/i.test(l),k=/<\/?(?:strong|b)\b/i.test(l);if(b||k)return p;let w=Pn(d,"import-font-bold");return i+=1,`<${c}${w}><strong>${l}</strong></${c}>`});return t&&(a>0&&(t.intentHits+=1,R(t,"intent.typography.semantic-heading-from-scale"),j(t,`Converted ${a} bold display text node(s) to semantic heading tags (fontScale=${Number(o).toFixed(2)}).`)),i>0&&(t.intentHits+=1,R(t,"intent.typography.bold-to-strong"),j(t,`Wrapped ${i} bold text node(s) in strong tags.`))),s}function ni(e=[]){if(!Array.isArray(e)||e.length===0)return"";let t=e.filter(n=>!Lt.includes(n));if(t.length===0||t.length>1)return"";let r=t[0];return["hover","focus","active"].includes(r)?r:""}function En(e,t="base",r=[]){let n=ni(r),o=Oa[e];if(o)return{declaration:o,breakpoint:t,pseudo:n,ruleId:"fallback.import-style"};let a=String(e).match(/^gap-(\d+)$/);if(a){let y={0:"var(--spacing-0)",1:"var(--spacing-1)",2:"var(--spacing-2)",3:"var(--spacing-3)",4:"var(--spacing-4)",5:"var(--spacing-5)",6:"var(--spacing-6)",7:"var(--spacing-7)",8:"var(--spacing-8)",10:"var(--spacing-10)",12:"var(--spacing-12)"},S=Number(a[1]);if(y[S])return{declaration:`gap:${y[S]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.gap-scale"}}let i=String(e).match(/^(mt|mb|my)-(.+)$/);if(i){let y=i[1],S=i[2],M=Ke(S);if(M){let E="";return y==="mt"?E=`margin-top:${M}`:y==="mb"?E=`margin-bottom:${M}`:E=`margin-top:${M};margin-bottom:${M}`,{declaration:E,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.margin-scale"}}}let s=String(e).match(/^min-w-\[([^\]]+)\]$/);if(s){let y=Te(s[1]);if(Ae(y))return{declaration:`min-width:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.min-width-arbitrary"}}let p=String(e).match(/^max-w-\[([^\]]+)\]$/);if(p){let y=Te(p[1]);if(Ae(y))return{declaration:`max-width:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.max-width-arbitrary"}}let c=String(e).match(/^min-h-\[([^\]]+)\]$/);if(c){let y=Te(c[1]);if(Ae(y))return{declaration:`min-height:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.min-height-arbitrary"}}let d=String(e).match(/^grid-rows-\[([^\]]+)\]$/);if(d){let y=Te(d[1]);if(Ae(y))return{declaration:`grid-template-rows:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.grid-rows-arbitrary"}}let l=String(e).match(/^size-(.+)$/);if(l){let y=Ke(l[1]);if(y)return{declaration:`width:${y};height:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.size-scale"}}let u=String(e).match(/^w-(.+)$/);if(u){let y=Ke(u[1]);if(y)return{declaration:`width:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.width-scale"}}let g=String(e).match(/^h-(.+)$/);if(g){let y=Ke(g[1]);if(y)return{declaration:`height:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.height-scale"}}let m={xs:"var(--font-size-xs)",sm:"var(--font-size-sm)",base:"var(--font-size-md)",lg:"var(--font-size-lg)",xl:"var(--font-size-xl)","2xl":"var(--font-size-2xl)","3xl":"var(--font-size-3xl)","4xl":"var(--font-size-4xl)"},v=String(e).match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/);if(v)return{declaration:`font-size:${m[v[1]]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.text-size"};let f={normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},b=String(e).match(/^font-(normal|medium|semibold|bold|extrabold|black)$/);if(b)return{declaration:`font-weight:${f[b[1]]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.font-weight"};let k={none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2"},w=String(e).match(/^leading-(none|tight|snug|normal|relaxed|loose)$/);if(w)return{declaration:`line-height:${k[w[1]]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.line-height"};let $={tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},T=String(e).match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);if(T)return{declaration:`letter-spacing:${$[T[1]]}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.tracking"};let A=String(e).match(/^bg-black\/(\d{1,3})$/);if(A)return{declaration:`background-color:color-mix(in srgb, var(--color-gray-900) ${Math.max(0,Math.min(100,Number(A[1])))}%, transparent)`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.overlay-alpha"};if(e==="text-white")return{declaration:"color:var(--color-gray-50)",breakpoint:t,pseudo:n,ruleId:"fallback.import-style.text-inverse"};let F=String(e).match(/^bg-(primary|secondary|accent)$/);if(F){let S={primary:"var(--color-primary-fill)",secondary:"var(--color-gray-500)",accent:"var(--color-accent-500)"}[F[1]];if(S)return{declaration:`background-color:${S}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.bg-semantic"}}let I=String(e).match(/^bg-([a-z]+)-(\d{2,3})$/);if(I){let y=Ye(I[1],I[2]);if(y)return{declaration:`background-color:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.bg-tokenized"}}let z=String(e).match(/^bg-\[([^\]]+)\]$/);if(z){let y=Mn(z[1]);if(y)return{declaration:`background-color:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.bg-arbitrary"}}let C=String(e).match(/^text-([a-z]+)-(\d{2,3})$/);if(C){let y=Ye(C[1],C[2]);if(y)return{declaration:`color:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.text-tokenized"}}let P=String(e).match(/^text-\[([^\]]+)\]$/);if(P){let y=Mn(P[1]);if(y)return{declaration:`color:${y}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.text-arbitrary"}}let L=String(e).match(/^rounded(?:-([trbl]{1,2}))?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(L){let y=L[1]||"",S=L[2]||"sm",M=S==="none"?"0":`var(--radius-${S})`,E={t:["top-left","top-right"],b:["bottom-left","bottom-right"],l:["top-left","bottom-left"],r:["top-right","bottom-right"],tl:["top-left"],tr:["top-right"],bl:["bottom-left"],br:["bottom-right"]};if(!y)return{declaration:`border-radius:${M}`,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.rounded"};let O=(E[y]||[]).map(K=>`border-${K}-radius:${M}`).join(";");if(O)return{declaration:O,breakpoint:t,pseudo:n,ruleId:"fallback.import-style.rounded"}}return null}function $t(e,t){return typeof e=="number"&&Number.isFinite(e)?`${e}px`:typeof e=="string"&&e.trim()?e.trim():`${t}px`}function oi(e={}){let r=(e?.design&&typeof e.design=="object"?e.design:e)?.layout?.breakpoints||{};return{sm:$t(r.sm,640),md:$t(r.md,768),lg:$t(r.lg,1024),xl:$t(r.xl,1280)}}function ai(e,t){let r=Array.from(e.importBaseStyles.entries()).map(([a,i])=>`.${a}{${i};}`),n=[];for(let[a,i]of e.importResponsiveStyles.entries()){let s=t?.[a];if(!s||!i?.size)continue;let p=Array.from(i.entries()).map(([c,d])=>`.${c}{${d};}`).join(`
`);n.push(`@media (min-width: ${s}) {
${p}
}`)}for(let[a,i]of e.importPseudoStyles.entries()){let[s,p]=String(a).split("|");if(!p||!i?.size)continue;let c=Array.from(i.entries()).map(([l,u])=>`.${l}:${p}{${u};}`).join(`
`);if(!c)continue;if(s==="base"){n.push(c);continue}let d=t?.[s];d&&n.push(`@media (min-width: ${d}) {
${c}
}`)}let o=[...r,...n].filter(Boolean).join(`
`);return o.trim()?["/* pds-import: generated fallback styles for unmapped Tailwind utilities */",o].join(`
`):""}function ii(e="",t=""){if(!t||!t.trim())return e;let r=`<style data-pds-import="tailwind-fallback">
${t}
</style>`;return/<head[^>]*>/i.test(e)?e.replace(/<head([^>]*)>/i,`<head$1>
${r}`):`${r}
${e}`}function Tn(e=""){if(!e)return!1;if(e.includes(":")||e.includes("["))return!0;let t=e.split("-")[0];return Wa.includes(t)}function ie(e=""){let t=String(e).split(":");if(t.length===1)return{breakpoint:"base",base:t[0],variants:[]};let r=t[t.length-1],n=t.slice(0,-1);return{breakpoint:n.find(a=>Lt.includes(a))||"base",base:r,variants:n}}function si(){return{totalTailwind:0,mapped:0,ignored:0,policySkipped:0,unknown:0,intentHits:0,unknownTokens:new Map,notes:[],appliedRules:new Set,importBaseStyles:new Map,importResponsiveStyles:new Map,importPseudoStyles:new Map,importedStyleCount:0,labelNestingCount:0,removedAtomicSpacingCount:0,removedAtomicPositioningCount:0}}function li(e=""){let t=String(e||"").toLowerCase().replace(/\s+/g,""),r=t.includes("menu,ol,ul{list-style:none")||t.includes("ol,ul,menu{list-style:none")||t.includes("ul,ol,menu{list-style:none"),n=t.includes("a{color:inherit;text-decoration:inherit");return{listReset:r,anchorReset:n}}function ci(e=""){return String(e||"").toLowerCase().includes("cdn.tailwindcss.com")?{listReset:!0,anchorReset:!0}:{listReset:!1,anchorReset:!1}}function di(e="",t=null){let r=String(e||""),n={listReset:!1,anchorReset:!1,strippedRuntimeCssBlocks:0,strippedRuntimeScripts:0};return r=r.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi,(o,a,i)=>{let s=String(i||"");if(!(/tailwindcss\s+v\d/i.test(s)||/\*\s*!\s*tailwindcss/i.test(s)))return o;let c=li(s);return n.listReset=n.listReset||c.listReset,n.anchorReset=n.anchorReset||c.anchorReset,n.strippedRuntimeCssBlocks+=1,""}),r=r.replace(/<script([^>]*?)src\s*=\s*(?:(['"])([^"']*cdn\.tailwindcss\.com[^"']*)\2|([^\s>]*cdn\.tailwindcss\.com[^\s>]*))([^>]*)><\/script>/gi,(o,a,i,s,p)=>{let d=ci(s||p||"");return n.listReset=n.listReset||d.listReset,n.anchorReset=n.anchorReset||d.anchorReset,n.strippedRuntimeScripts+=1,""}),t&&(n.strippedRuntimeCssBlocks>0||n.strippedRuntimeScripts>0)&&(R(t,"intent.preflight.tailwind-runtime-detected"),n.strippedRuntimeCssBlocks>0&&j(t,`Detected and stripped ${n.strippedRuntimeCssBlocks} Tailwind runtime style block(s).`)),t&&n.strippedRuntimeScripts>0&&j(t,`Removed ${n.strippedRuntimeScripts} Tailwind CDN script reference(s).`),{html:r,hints:n}}function j(e,t){!e||!t||e.notes.includes(t)||e.notes.push(t)}function pi(e,t){let r=e.unknownTokens.get(t)||0;e.unknownTokens.set(t,r+1)}function ui(e={}){let r=(e?.design&&typeof e.design=="object"?e.design:e)?.layout?.utilities||{};return{grid:r.grid!==!1,flex:r.flex!==!1,spacing:r.spacing!==!1,container:r.container!==!1}}function J(e,t){return t?e?.[t]!==!1:!0}function An(e){let t=String(e).match(/^grid-cols-(\d+)$/);return t?Number(t[1]):null}function Rn(e={}){let t=Lt.map(o=>({bp:o,cols:e[o]})).filter(o=>Number.isFinite(o.cols));if(t.length<2)return null;if(t.length===2){let[o,a]=t;if(o.bp==="base"&&o.cols===1&&a.cols===2)return"grid-auto-lg";if(o.bp==="base"&&o.cols===1&&a.cols>=3)return null;if(o.cols<a.cols){if(a.cols>=4)return"grid-auto-md";if(a.cols>=2)return"grid-auto-lg"}return null}let r=!0;for(let o=1;o<t.length;o+=1)if(t[o].cols<=t[o-1].cols){r=!1;break}if(!r)return null;let n=t[t.length-1]?.cols||0;return n>=4?"grid-auto-md":n>=3?"grid-auto-sm":null}function gi(e=""){let t=String(e).match(/^text-(gray|slate|zinc|neutral|stone)-(\d{2,3})$/);if(!t)return"";let r=Number(t[2]);return Number.isFinite(r)&&r>=400&&r<=600?"text-muted":""}function mi(e="",t=0){return!e||!Number.isFinite(t)?"":{sm:{2:"sm:grid-cols-2"},md:{3:"md:grid-cols-3"},lg:{4:"lg:grid-cols-4"}}?.[e]?.[t]||""}function fi(e=""){let t=ie(e),n=String(t?.base||"").match(/^space-y-(\d+)$/);if(!n)return"stack-md";let o=Number(n[1]);return Number.isFinite(o)?o<=1?"stack-xs":o<=2?"stack-sm":o<=4?"stack-md":"stack-lg":"stack-md"}function hi(e=new Set){return Array.from(e).some(t=>{let r=String(t||"");return/^gap-(?:xs|sm|md|lg|xl)$/.test(r)||/^gap-[0-9]+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?gap-/.test(r)})}function bi(e=new Set){return Array.from(e).some(t=>/^stack-(?:xs|sm|md|lg|xl)$/.test(String(t||"")))}function yi(e=new Set){return Array.from(e).some(t=>{let r=String(t||"");return/^grid-cols-\d+$/.test(r)||/^grid-auto-(?:sm|md|lg|xl)$/.test(r)||/^(?:sm|md|lg|xl):grid-cols-\d+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?grid-cols-\d+$/.test(r)})}function vi(e,t=12){return Array.from(e.unknownTokens.entries()).sort((r,n)=>n[1]-r[1]).slice(0,t).map(([r])=>r)}function R(e,t){!e||!t||e.appliedRules.add(t)}function le(e=[],t){return!Array.isArray(e)||!t?!1:e.some(r=>t.test(String(r)))}function xi(e=[]){for(let t of e){let r=ie(t);if(r.breakpoint!=="base")continue;let n=String(r.base).match(/^h-(.+)$/);if(!n)continue;let o=Ke(n[1]);if(!o||o==="auto")continue;let a=String(o).match(/^(-?\d+(?:\.\d+)?)rem$/);if(a){let i=Number(a[1]);if(Number.isFinite(i))return i*16}}return null}function wi(e=[],t=""){let r=t==="button",n=le(e,/^bg-/),o=le(e,/^hover:bg-/),a=le(e,/^border/),i=le(e,/^shadow/),s=e.includes("cursor-pointer"),p=le(e,/^rounded/),c=le(e,/^(?:min-w|max-w|w)-/),d=le(e,/^text-(?:white|black|\[[^\]]+\]|[a-z]+-\d{2,3})$/),l=n||o||i;if(!(r||t==="a"&&(l||a||s||p&&c)))return{shouldNormalize:!1,variant:"none",size:"base",iconOnly:!1};let m="none";a&&!n&&!o?m="outline":(l||n&&d)&&(m="primary");let v=e.includes("rounded-full")&&(e.includes("p-2")||e.includes("p-1")||e.includes("p-2.5")),f=le(e,/^size-(?:6|7|8|9|10|11|12)$/),b=v||f,k=xi(e),w=e.includes("text-sm")||e.includes("text-xs"),$=e.includes("text-lg")||e.includes("text-xl"),T="base";return k&&k<=40||w?T="sm":(k&&k>=48||$)&&(T="lg"),{shouldNormalize:!0,variant:m,size:T,iconOnly:b}}function ki(e=""){let t=String(e||"").toLowerCase();return["green","emerald","lime","teal"].includes(t)?"badge-success":["blue","sky","cyan","indigo"].includes(t)?"badge-info":["yellow","amber","orange"].includes(t)?"badge-warning":["red","rose","pink"].includes(t)?"badge-danger":["gray","slate","zinc","neutral","stone"].includes(t)?"badge-secondary":["purple","violet","fuchsia","primary","accent"].includes(t)?"badge-primary":"badge-secondary"}function Si(e=[],t="",r={shouldNormalize:!1}){if(r?.shouldNormalize)return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(["button","a","input","select","textarea"].includes(t))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(e.some(C=>/^badge(?:-|$)/.test(String(C))))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let n=e.map(C=>ie(C)).filter(C=>C.breakpoint==="base").map(C=>String(C.base)),o=n.some(C=>/^rounded(?:-|$)/.test(C)),a=n.some(C=>/^px-/.test(C)),i=n.some(C=>/^py-/.test(C)),s=a&&i,p=n.includes("text-xs")||n.includes("text-sm"),c=n.includes("text-lg")||n.includes("text-xl"),d=n.map(C=>C.match(/^bg-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),l=n.map(C=>C.match(/^text-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),u=n.map(C=>C.match(/^border-([a-z]+)-(\d{2,3})$/)).find(Boolean),g=Number(d?.[2]),m=Number(l?.[2]),v=!!(d&&Number.isFinite(g)&&g<=300),f=n.some(C=>/^border(?:-|$)/.test(C)),b=!!(d||l||u),k=[o,s,p,v||f].filter(Boolean).length;if(!(b&&k>=3))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let $=d&&d[1]||l&&l[1]||u&&u[1]||"",T=ki($),A=f&&!v,F=p?"badge-sm":c?"badge-lg":"",I=v?{family:$,bgShade:Number.isFinite(g)?g:200,textShade:Number.isFinite(m)?m:700}:null;return{shouldNormalize:!0,variantClass:I?"":T,outline:A,sizeClass:F,pastel:I}}function $i(e="",t=0){let r=String(e||"").toLowerCase(),n=Number(t);return r==="white"?"surface-base":["gray","slate","zinc","neutral","stone"].includes(r)?Number.isFinite(n)&&n<=100?"surface-base":"surface-subtle":["blue","sky","cyan","indigo","primary","info"].includes(r)?"surface-info":["purple","violet","fuchsia","accent"].includes(r)?"surface-primary":["green","emerald","lime","teal","success"].includes(r)?"surface-success":["yellow","amber","orange","warning"].includes(r)?"surface-warning":["red","rose","pink","danger"].includes(r)?"surface-danger":"surface-base"}function zi(e=[],t="",r={shouldNormalize:!1},n={shouldNormalize:!1}){if(r?.shouldNormalize||n?.shouldNormalize)return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(!new Set(["div","section","article","aside","li"]).has(t))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(e.some(f=>/^card(?:-|$)/.test(String(f))))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let a=e.map(f=>ie(f)).filter(f=>f.breakpoint==="base").map(f=>String(f.base)),i=a.some(f=>/^rounded(?:-|$)/.test(f)),s=a.some(f=>/^border(?:$|-)/.test(f)),p=a.some(f=>/^shadow(?:$|-)/.test(f)),c=a.some(f=>/^(?:p|px|py|pt|pb|pl|pr)-/.test(f)),d=a.map(f=>f.match(/^bg-([a-z]+)-?(\d{2,3})?$/)).find(Boolean),l=a.includes("bg-white")||!!d;if(!([i,s||p,l,c].filter(Boolean).length>=3))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let m="card-basic";p?m="card-elevated":s&&(m="card-outlined");let v="";return p?v="surface-elevated":d?v=$i(d[1],d[2]):l&&(v="surface-base"),{shouldNormalize:!0,cardVariantClass:m,surfaceClass:v}}function Li({tagName:e,originalClassValue:t,policy:r,summary:n,preflightHints:o={}}){if(Ba.has(e))return R(n,"table.strict-tags.no-classes"),"";let a=String(t).split(/\s+/).filter(Boolean),i=wi(a,e),s=Si(a,e,i),p=zi(a,e,i,s),c=/^h[1-6]$/.test(e),d=["i","svg"].includes(e)||a.some(L=>/^fa(?:[a-z-]+)?$/i.test(String(L||""))||/^fa-/.test(String(L||""))),l=new Set,u={},g={},m=!1,v="",f="",b=!1,k="";a.forEach(L=>{let y=ie(L),S=y.base;if(ja.some(N=>N.test(S))){n.ignored+=1,R(n,"cleanup.non-pds-class");return}let M=Tn(L)||Tn(S);if(M&&(n.totalTailwind+=1),/^space-y-/.test(S)){m=!0,v=v||L,f=f||fi(L),n.ignored+=1,R(n,"layout.spacing.space-y-to-stack");return}if(/^space-x-/.test(S)){let N=String(S).match(/^space-x-(\d+)$/);if(N){let D=`gap-${N[1]}`,Y=ur.get(D);if(Y&&J(r,"spacing")){l.add(Y),b=!0,k=k||L,n.mapped+=1,n.intentHits+=1,R(n,"layout.spacing.space-x-to-gap");return}}n.ignored+=1,R(n,"style.spacing.atomic");return}if(/^grid-cols-\d+$/.test(S)&&y.breakpoint!=="base"){let N=An(S);if(Number.isFinite(N)&&J(r,"grid")){u[y.breakpoint]=N,n.mapped+=1,R(n,"intent.layout.responsive-grid-to-auto");return}if(!J(r,"grid")){n.policySkipped+=1,j(n,"Skipped responsive grid mapping because layout.utilities.grid=false.");return}}if(/^flex-(?:row|col)$/.test(S)&&y.breakpoint!=="base"){if(J(r,"flex")){g[y.breakpoint]=S,n.mapped+=1,R(n,"intent.layout.mobile-stack");return}n.policySkipped+=1,j(n,"Skipped responsive flex mapping because layout.utilities.flex=false.");return}if(/^grid-cols-\d+$/.test(S)&&y.breakpoint==="base"){let N=An(S);Number.isFinite(N)&&J(r,"grid")&&(u.base=N)}let E=Ia.get(S);if(E&&y.breakpoint==="base"){if(!J(r,E.gate)){n.policySkipped+=1,j(n,`Skipped ${S} because layout.utilities.${E.gate}=false.`);return}E.pds.forEach(N=>{N&&l.add(N)}),n.mapped+=1,R(n,E.id);return}if(ur.has(S)&&y.breakpoint==="base"){if(!J(r,"spacing")){n.policySkipped+=1,j(n,"Skipped gap utility because layout.utilities.spacing=false.");return}l.add(ur.get(S)),n.mapped+=1,R(n,"layout.spacing.gap-scale");return}if(zn.has(S)&&y.breakpoint==="base"){if(!J(r,"container")){n.policySkipped+=1,j(n,"Skipped max-width utility because layout.utilities.container=false.");return}l.add(zn.get(S)),n.mapped+=1,R(n,"layout.container.max-width");return}if(i.shouldNormalize&&M){let N=String(S||"");if(y.breakpoint==="base"&&["flex-1","grow","flex-grow"].includes(N)){l.add("grow"),n.mapped+=1,n.intentHits+=1,R(n,"intent.component.button.layout-grow");return}if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(N)||N.startsWith("hover:")){n.ignored+=1,R(n,"intent.component.button.normalize");return}}if(c&&/^(?:text-(?:xs|sm|base|lg|xl|\dxl|white|black|\[[^\]]+\]|[a-z]+-\d{2,3})|font-|leading-|tracking-|uppercase|lowercase|capitalize)/.test(S)){n.ignored+=1,n.intentHits+=1,R(n,"intent.typography.heading-semantic");return}if(s.shouldNormalize&&M){let N=String(S||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(N)||N.startsWith("hover:")){n.ignored+=1,R(n,"intent.component.badge.normalize");return}}if(p.shouldNormalize&&M){let N=String(S||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)/.test(N)||N.startsWith("hover:")){n.ignored+=1,R(n,"intent.component.card.normalize");return}}let B=gi(S);if(B&&y.breakpoint==="base"){l.add(B),n.mapped+=1,n.intentHits+=1,R(n,"intent.typography.text-neutral-to-muted");return}if(/^text-(?:white|black|[a-z]+-\d{2,3}|\[[^\]]+\])$/.test(S)){if(d||e==="a"&&!i.shouldNormalize){let D=En(S,y.breakpoint,y.variants);if(D){let Y=fe(n,`${e}-color-${S}`,D.declaration,D.breakpoint,D.pseudo);if(Y){l.add(Y),n.mapped+=1,n.intentHits+=1,R(n,d?"intent.icon.color-preserve":"intent.typography.link-active-preserve");return}}}n.ignored+=1,R(n,"style.color");return}let K=En(S,y.breakpoint,y.variants);if(K){let N=fe(n,S,K.declaration,K.breakpoint,K.pseudo);if(N){l.add(N),n.mapped+=1,n.intentHits+=1,R(n,K.ruleId),y.breakpoint!=="base"&&j(n,`Generated responsive import fallback for ${L}.`);return}}for(let N of G.ignoredPatterns)if(N.pattern.test(S)){n.ignored+=1,R(n,N.id),N.id==="style.spacing.atomic"&&(n.removedAtomicSpacingCount+=1),N.id==="style.positioning.atomic"&&(n.removedAtomicPositioningCount+=1);return}if(M){n.unknown+=1,pi(n,L);return}l.add(L)}),m&&J(r,"spacing")&&(l.add(f||"stack-md"),n.mapped+=1,n.intentHits+=1,j(n,`Mapped ${v} to ${f||"stack-md"}.`)),b&&J(r,"spacing")&&j(n,`Mapped ${k} to gap utility.`);let w=Rn(u);if(w&&J(r,"grid")?(l.delete("grid-cols-1"),l.delete("grid-cols-2"),l.delete("grid-cols-3"),l.delete("grid-cols-4"),l.delete("grid-cols-6"),l.add("grid"),l.add(w),n.intentHits+=1,R(n,"intent.layout.responsive-grid-to-auto"),j(n,`Collapsed responsive grid columns to ${w}.`)):J(r,"grid")&&Lt.filter(y=>y!=="base"&&Number.isFinite(u[y])).forEach(y=>{let S=u[y],M=mi(y,S);if(M){l.add("grid"),l.add(M),n.intentHits+=1,R(n,"intent.layout.responsive-grid-to-auto"),j(n,`Mapped ${y}:grid-cols-${S} to ${M}.`);return}let E=fe(n,`grid-cols-${S}`,`grid-template-columns:repeat(${S}, minmax(0, 1fr))`,y);E&&(l.add("grid"),l.add(E),n.intentHits+=1,R(n,"fallback.import-style.grid-cols-responsive"),j(n,`Mapped ${y}:grid-cols-${S} to responsive import fallback for exact columns.`))}),J(r,"flex")&&a.includes("flex-col")&&(g.md==="flex-row"||g.lg==="flex-row")&&(l.delete("flex-col"),l.delete("flex-row"),l.add("mobile-stack"),n.intentHits+=1,R(n,"intent.layout.mobile-stack"),j(n,"Mapped flex-col + breakpoint flex-row to mobile-stack.")),(l.has("flex")||l.has("inline-flex"))&&J(r,"spacing")&&(hi(l)||bi(l)||b||m||(l.add("gap-sm"),n.intentHits+=1,R(n,"layout.spacing.flex-min-gap"),j(n,"Added gap-sm fallback for flex container without explicit spacing."))),a.some(L=>/^grid-cols-\d+$/.test(ie(L).base))&&l.has("grid")&&!yi(l)){let L=Rn(u);L?(l.add(L),n.intentHits+=1,R(n,"intent.layout.responsive-grid-to-auto"),j(n,`Applied grid safety fallback ${L} to avoid bare grid output.`)):Number.isFinite(u.base)&&u.base>1?(l.add(`grid-cols-${u.base}`),n.intentHits+=1,R(n,"intent.layout.grid-safety-fallback"),j(n,`Applied grid safety fallback grid-cols-${u.base} to preserve explicit grid intent.`)):(l.add("mobile-stack"),n.intentHits+=1,R(n,"intent.layout.grid-safety-fallback.mobile-stack"),j(n,"Applied mobile-stack safety fallback to avoid bare grid output when explicit grid intent was present."))}let A=a.some(L=>/^(?:bg-white|shadow|shadow-md|shadow-lg)$/.test(L)),F=a.some(L=>/^rounded/.test(L));if(["div","section","article","li","aside"].includes(e)&&A&&F&&(l.add("card"),!l.has("surface-elevated")&&a.some(L=>/^shadow/.test(L))&&l.add("surface-elevated"),!l.has("surface-base")&&a.includes("bg-white")&&l.add("surface-base"),n.intentHits+=1,R(n,"intent.component.card")),e==="button"||e==="a"){let L=a.some(M=>/^bg-(?:[a-z]+-)?[4567]00$/.test(M))&&a.includes("text-white"),y=a.some(M=>/^border/.test(M))&&!L,S=a.includes("p-2")&&a.includes("rounded-full");L?(l.delete("surface-base"),l.delete("surface-elevated"),l.add("btn-primary"),n.intentHits+=1,R(n,"intent.component.button.primary")):y&&(l.add("btn-outline"),n.intentHits+=1,R(n,"intent.component.button.outline")),S&&(l.add("icon-only"),R(n,"intent.component.button.icon-only"))}if(i.shouldNormalize){for(let y of Array.from(l))String(y).startsWith("import-")&&l.delete(y);["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","surface-base","surface-elevated","surface-subtle","card"].forEach(y=>l.delete(y)),i.variant==="primary"?(l.add("btn-primary"),R(n,"intent.component.button.primary")):i.variant==="outline"&&(l.add("btn-outline"),R(n,"intent.component.button.outline")),i.size==="sm"?(l.add("btn-sm"),R(n,"intent.component.button.size-sm")):i.size==="lg"&&(l.add("btn-lg"),R(n,"intent.component.button.size-lg")),i.iconOnly&&(l.add("icon-only"),R(n,"intent.component.button.icon-only")),n.intentHits+=1,R(n,"intent.component.button.normalize")}if(s.shouldNormalize){for(let y of Array.from(l))String(y).startsWith("import-")&&l.delete(y);if(["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","grow","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","text-muted","surface-base","surface-elevated","surface-subtle","card"].forEach(y=>l.delete(y)),l.add("badge"),s.variantClass&&l.add(s.variantClass),s.outline&&l.add("badge-outline"),s.sizeClass&&l.add(s.sizeClass),s.pastel&&s.pastel.family){let y=Ye(s.pastel.family,String(s.pastel.bgShade||200)),S=Ye(s.pastel.family,String(s.pastel.textShade||700));if(y&&S){let M=`badge-pastel-${s.pastel.family}-${s.pastel.bgShade}-${s.pastel.textShade}`,E=fe(n,M,`background-color:${y};color:${S}`,"base");E&&(l.add(E),R(n,"intent.component.badge.pastel-preserve"),j(n,`Preserved pastel badge tone using ${E}.`))}}n.intentHits+=1,R(n,"intent.component.badge.normalize"),j(n,"Normalized badge/pill utility cluster to PDS badge classes.")}if(p.shouldNormalize){for(let y of Array.from(l))String(y).startsWith("import-")&&l.delete(y);["surface-base","surface-subtle","surface-elevated","surface-sunken","surface-overlay","surface-inverse","surface-primary","surface-secondary","surface-success","surface-warning","surface-danger","surface-info","card-basic","card-elevated","card-outlined","card-interactive"].forEach(y=>l.delete(y)),l.add("card"),p.cardVariantClass&&l.add(p.cardVariantClass),p.surfaceClass&&l.add(p.surfaceClass),n.intentHits+=1,R(n,"intent.component.card.normalize"),j(n,"Normalized card utility cluster to PDS card/surface classes.")}if(e==="a"&&!i.shouldNormalize&&a.some(y=>y.includes("hover:text")||y==="transition-colors")){let y=fe(n,"link-reset","text-decoration:none");y&&l.add(y),n.intentHits+=1,R(n,"intent.typography.link-treatment")}if(e==="footer"&&(l.has("surface-base")||a.some(y=>/^bg-/.test(y)))&&(l.delete("surface-base"),l.delete("surface-subtle"),l.add("surface-inverse"),n.intentHits+=1,R(n,"intent.surface.footer-inverse")),o?.listReset&&["ul","ol","menu"].includes(e)){let L=fe(n,"list-reset","list-style:none;margin:0;padding:0");L&&(l.add(L),n.intentHits+=1,R(n,"intent.preflight.list-reset"))}if(o?.anchorReset&&e==="a"&&!i.shouldNormalize){let L=fe(n,"anchor-reset","color:inherit;text-decoration:inherit");L&&(l.add(L),n.intentHits+=1,R(n,"intent.preflight.anchor-reset"))}let C=new Set(["div","section","article","aside","nav","main","header","footer","form","fieldset","ul","ol","li"]),P=a.some(L=>{let y=ie(L).base;return/^(?:flex|grid|container|gap-|space-[xy]-|items-|justify-|content-|place-|self-|w-|h-|min-|max-)/.test(y)});return l.size===0&&C.has(e)&&P&&(l.add("stack-sm"),j(n,`Added stack-sm fallback for <${e}> with unmapped classes.`)),Array.from(l).join(" ")}function Ci(e="",t={}){let r=String(e||""),n=ui(t.config||{}),o=oi(t.config||{}),a=si(),i=di(r,a),p=Ha(i.html,a).replace(/<([a-zA-Z][\w:-]*)([^>]*?)\sclass\s*=\s*(["'])(.*?)\3([^>]*)>/gs,(T,A,F,I,z,C)=>{let P=Li({tagName:String(A||"").toLowerCase(),originalClassValue:z,policy:n,summary:a,preflightHints:i.hints}),L=String(P||"").trim();return L?`<${A}${F} class=${I}${L}${I}${C}>`:`<${A}${F}${C}>`}),c=ri(Xa(Ya(Ja(p,a),a),a),a,{config:t.config||{}}),d=ai(a,o),l=ii(c,d);d&&j(a,`Generated ${a.importedStyleCount} import-* fallback style mappings.`),(a.removedAtomicSpacingCount>0||a.removedAtomicPositioningCount>0)&&j(a,`Removed atomic utilities by policy: spacing=${a.removedAtomicSpacingCount}, positioning=${a.removedAtomicPositioningCount}.`);let u=vi(a,16),g=a.mapped+a.ignored+a.policySkipped,m=a.totalTailwind>0?g/a.totalTailwind:1,v=a.totalTailwind>0?a.unknown/a.totalTailwind:0,f=.42+m*.45+Math.min(a.intentHits,4)*.025-v*.18,b=Math.max(.15,Math.min(.96,Number(f.toFixed(2)))),k=[`pds-import: rulebook=${$n} confidence=${Math.round(b*100)}%`,`pds-import: tailwind=${a.totalTailwind} mapped=${a.mapped} ignored=${a.ignored} policySkipped=${a.policySkipped} unknown=${a.unknown}`];u.length&&k.push(`pds-import: unknown-tailwind=${u.join(", ")}`),a.notes.length&&k.push(`pds-import: notes=${a.notes.join(" | ")}`);let w=`<!-- ${k.join(` -->
<!-- `)} -->
${l}`,$=[];return a.unknown>0&&$.push({severity:"warning",message:`Converted with ${a.unknown} unknown Tailwind utilities requiring manual review.`}),a.policySkipped>0&&$.push({severity:"info",message:`Skipped ${a.policySkipped} utility mappings due to PDS config policy.`}),u.length&&$.push({severity:"info",message:`Top unknown utilities: ${u.slice(0,8).join(", ")}`}),{html:w,confidence:b,issues:$,meta:{rulebookVersion:$n,coverage:{tailwind:a.totalTailwind,mapped:a.mapped,ignored:a.ignored,policySkipped:a.policySkipped,unknown:a.unknown,importedStyles:a.importedStyleCount,nestedLabelPairs:a.labelNestingCount},unknownTailwindTokens:u,notes:a.notes,appliedRules:Array.from(a.appliedRules),policy:n,importStyleSheetInjected:!!d,breakpoints:o}}}function Mi(){return{rulesJsonPath:Pa,...G,directMappings:G.directMappings.map(e=>({id:e.id,tw:e.tw,pds:e.pds,gate:e.gate||null})),ignoredPatterns:G.ignoredPatterns.map(e=>({id:e.id,pattern:String(e.pattern),reason:e.reason}))}}function Ei(e){let t=String(e||"").match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);return t?t[0]:null}function Ti(e){return String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Nn(e){return/<\s*[a-z][^>]*>/i.test(String(e||""))}function Ai(e){let t=String(e||"").trim().toLowerCase();if(!t)return null;let r=Number.parseFloat(t);return Number.isFinite(r)?t.endsWith("rem")||t.endsWith("em")?r*16:t.endsWith("px")||/^[0-9.\-]+$/.test(t)?r:null:null}function ee(e){let t=String(e||"").trim();if(!t)return"";let r=t.match(/#(?:[0-9a-f]{3,8})\b/i);if(r)return r[0].toLowerCase();let n=t.match(/rgba?\([^)]*\)/i);if(n)return n[0];let o=t.match(/hsla?\([^)]*\)/i);return o?o[0]:""}function Ri(e=""){let t=String(e||"").trim();if(!t||typeof window>"u"||typeof document>"u")return"";let r=document.documentElement;if(!r)return"";let n=window.getComputedStyle(r);return String(n.getPropertyValue(t)||"").trim()}function _i(e=""){let t=String(e||"").trim(),r=ee(t);if(r)return r;let n=t.match(/var\(\s*(--[^\s,)]+)\s*(?:,[^)]+)?\)/i);if(!n)return"";let o=Ri(n[1]);return ee(o)}function Fi(e=""){let t=String(e||"").trim();if(!t)return"";let r=t.split(":").pop()||t;if(r==="bg-white")return"#ffffff";if(r==="bg-black")return"#000000";let n=r.match(/^bg-black\/(\d{1,3})$/i);if(n)return`rgba(0,0,0,${Math.max(0,Math.min(100,Number(n[1])))/100})`;let o=r.match(/^bg-\[([^\]]+)\]$/i);if(o)return ee(o[1]);let a=r.match(/^bg-([a-z]+)-(\d{2,3})$/i);if(!a)return"";let i=Ye(a[1],a[2]);return i?_i(i):""}function _n(e=""){return String(e||"").split(/\s+/).map(r=>r.trim()).filter(Boolean).map(r=>Fi(r)).filter(Boolean)}function Pi(e=""){let t=[],r=String(e||""),n=/([^{}]+)\{([^{}]*)\}/g,o=n.exec(r);for(;o;){let a=String(o[1]||"").trim(),i=String(o[2]||"").trim();a&&i&&t.push({selector:a,body:i}),o=n.exec(r)}return t}function Ni(e=""){let t=String(e||"").toLowerCase();return t?/(^|\s|,)(html|body|:root|main)(\s|,|$)|#app\b|#root\b|\.app\b|\.page\b/.test(t):!1}function Ii(e=""){let t=String(e||"").trim().match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)/i);if(!t)return null;let r=Number.parseFloat(t[1]),n=Number.parseFloat(t[2]),o=Number.parseFloat(t[3]),a=t[4]==null?1:Number.parseFloat(t[4]);return[r,n,o,a].every(i=>Number.isFinite(i))?{r:Math.max(0,Math.min(255,r)),g:Math.max(0,Math.min(255,n)),b:Math.max(0,Math.min(255,o)),a:Math.max(0,Math.min(1,a))}:null}function ji(e=""){let t=String(e||"").trim().match(/^#([0-9a-f]{3,8})$/i);if(!t)return null;let r=t[1].toLowerCase();if(r.length===3){let[n,o,a]=r.split("");return{r:Number.parseInt(`${n}${n}`,16),g:Number.parseInt(`${o}${o}`,16),b:Number.parseInt(`${a}${a}`,16),a:1}}return r.length===6||r.length===8?{r:Number.parseInt(r.slice(0,2),16),g:Number.parseInt(r.slice(2,4),16),b:Number.parseInt(r.slice(4,6),16),a:r.length===8?Number.parseInt(r.slice(6,8),16)/255:1}:null}function In(e=""){let t=ee(e);return t?t.startsWith("#")?ji(t):t.startsWith("rgb")?Ii(t):null:null}function Bi(e){if(!e)return null;let t=a=>{let i=Number(a)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4},r=t(e.r),n=t(e.g),o=t(e.b);return .2126*r+.7152*n+.0722*o}function Fn(e=""){let t=String(e||"").trim().toLowerCase();if(!t||t==="transparent")return!0;let r=In(t);return r&&Number.isFinite(r.a)?r.a<=.04:!1}function Oi(e=[],t=[]){let r=e.map(p=>ee(p)).filter(p=>p&&!Fn(p)),n=Je(r);if(n)return{color:n,source:"root"};let o=t.map(p=>ee(p)).filter(p=>p&&!Fn(p)),a=o.filter(p=>{let c=In(p),d=Bi(c);return Number.isFinite(d)?d>=.72:!1}),i=Je(a);if(i)return{color:i,source:"fallback-bright"};let s=Je(o);return s?{color:s,source:"fallback"}:{color:"",source:"none"}}function Ee(e,t=new Map){let r=String(e||""),n=/([a-z-]+)\s*:\s*([^;{}]+)/gi,o=n.exec(r);for(;o;){let a=String(o[1]||"").trim().toLowerCase(),i=String(o[2]||"").trim();a&&i&&(t.has(a)||t.set(a,[]),t.get(a).push(i)),o=n.exec(r)}return t}function Di(e=""){let t=String(e||""),r=new Map,n=[],o=[],a=[],i=[],s=[],p=[],c=[],d=/#(?:[0-9a-f]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi,l=u=>{(String(u||"").match(d)||[]).forEach(m=>{let v=ee(m);v&&n.push(v)})};if(typeof DOMParser<"u"&&Nn(t))try{let g=new DOMParser().parseFromString(t,"text/html");Array.from(g.querySelectorAll("style")).map(w=>w.textContent||"").forEach(w=>{Ee(w,r),l(w),Pi(w).forEach($=>{if(!Ni($.selector))return;let T=Ee($.body,new Map),A=Z(T,["background","background-color"]).map(F=>ee(F)).filter(Boolean);o.push(...A)})}),Array.from(g.querySelectorAll("[style]")).forEach(w=>{let $=w.getAttribute("style")||"";Ee($,r),l($)}),["html","body","main","#app","#root",".app",".page"].forEach(w=>{let $=g.querySelector(w);if(!$)return;let T=$.getAttribute("style")||"";if(!T)return;let A=Ee(T,new Map),F=Z(A,["background","background-color"]).map(z=>ee(z)).filter(Boolean);o.push(...F);let I=_n($.getAttribute("class")||"");a.push(...I)}),Array.from(g.querySelectorAll("[class]")).forEach(w=>{let $=ae(w.getAttribute("class")||"");p.push(...$);let T=_n(w.getAttribute("class")||"");i.push(...T);let A=String(w.tagName||"").toLowerCase(),F=A==="button"||A==="a",I=$.some(z=>/^bg-/.test(String(ie(z).base||"")));F&&I&&T.length&&s.push(...T)});let k=g.body?.textContent||"";k.trim()&&c.push(k),l(g.documentElement?.outerHTML||t)}catch{Ee(t,r),l(t),c.push(t)}else Ee(t,r),l(t),c.push(t);return{declarations:r,colorValues:n,rootBackgroundColors:o,rootClassBackgroundColors:a,classBackgroundColors:i,buttonBackgroundColors:s,classTokens:p,textCorpus:c.join(`
`)}}function Je(e=[]){let t=new Map;e.forEach(o=>{let a=String(o||"").trim();a&&t.set(a,(t.get(a)||0)+1)});let r="",n=-1;return t.forEach((o,a)=>{o>n&&(r=a,n=o)}),r}function Z(e,t=[]){return t.flatMap(r=>e.get(r)||[])}function Wi(e,t){if(!e||!t)return null;let r=String(t).split(".").filter(Boolean),n=e;for(let o of r){if(!n||n.type!=="object"||!n.properties||typeof n.properties!="object")return null;n=n.properties[o]}return n||null}function Hi(e={}){let t=e&&typeof e=="object"?e:{},r=h?.configRelations&&typeof h.configRelations=="object"?h.configRelations:{},n=new Set(Object.keys(r)),o=null;if(typeof h?.buildConfigFormSchema=="function")try{o=h.buildConfigFormSchema(t)?.schema||null}catch{o=null}return!o&&h?.configFormSchema?.schema&&(o=h.configFormSchema.schema),{design:t,schema:o,allowedPaths:n}}function Ui(e,t){if(!e)return t;if(Array.isArray(e.oneOf)&&e.oneOf.length){let r=e.oneOf.map(n=>n?.const).filter(n=>n!=null);if(r.length){if(typeof t=="string"){let n=r.find(o=>String(o).toLowerCase()===t.toLowerCase());if(n!==void 0)return n}if(typeof t=="number"){let n=r.map(o=>Number(o)).filter(o=>Number.isFinite(o));if(n.length)return n.reduce((o,a)=>Math.abs(a-t)<Math.abs(o-t)?a:o,n[0])}return r[0]}}if(e.type==="number"||e.type==="integer"){let r=Number(t);return Number.isFinite(r)?e.type==="integer"?Math.round(r):r:void 0}return e.type==="boolean"?!!t:e.type==="string"?String(t||"").trim():t}function qi(e,t,r){let n=String(t||"").split(".").filter(Boolean);if(!n.length)return;let o=e;for(let a=0;a<n.length;a+=1){let i=n[a];if(a===n.length-1){o[i]=r;return}(!o[i]||typeof o[i]!="object"||Array.isArray(o[i]))&&(o[i]={}),o=o[i]}}function H(e,t,r){if(r==null||r===""||e.allowedPaths.size&&!e.allowedPaths.has(t))return;let n=Wi(e.schema,t),o=Ui(n,r);o==null||o===""||(qi(e.patch,t,o),e.inferredPaths.add(t))}function he(e=[]){let t=e.map(n=>Ai(n)).filter(n=>Number.isFinite(n));if(!t.length)return null;t.sort((n,o)=>n-o);let r=Math.floor(t.length/2);return t.length%2?t[r]:(t[r-1]+t[r])/2}function Gi(e=[]){let t=e.map(r=>String(r||"").split(",")[0]||"").map(r=>r.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean);return Je(t)}function Vi(e){let t=Number(e);return Number.isFinite(t)?t<=.75?"hairline":t<=1.5?"thin":t<=2.5?"medium":"thick":"thin"}function Ki(e=""){let r=String(ie(e).base||"").toLowerCase().match(/^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(!r)return null;let n=r[1]||"DEFAULT",o={none:0,xs:2,sm:4,DEFAULT:6,md:8,lg:12,xl:16,"2xl":24,"3xl":32};return n==="full"?null:Number.isFinite(o[n])?o[n]:null}function Ji(e=[]){let t=e.map(n=>Ki(n)).filter(n=>Number.isFinite(n));if(!t.length)return null;t.sort((n,o)=>n-o);let r=Math.floor(t.length/2);return t.length%2?t[r]:(t[r-1]+t[r])/2}function mr(e={}){let t=String(e.html||"");if(!t.trim())return W({source:"html-inference",type:String(e.sourceType||"design-inference"),confidence:0,issues:[{severity:"warning",message:"No HTML or guideline text provided for design extraction."}],designPatch:{},meta:{extractedPathCount:0,extractedPaths:[]}});let r=Hi(e.config||{}),n=Di(t),o={patch:{},inferredPaths:new Set,allowedPaths:r.allowedPaths,schema:r.schema},a=Z(n.declarations,["color"]).map(V=>ee(V)).filter(Boolean),i=Z(n.declarations,["background","background-color"]).map(V=>ee(V)).filter(Boolean),s=[...i,...a,...n.colorValues].filter(Boolean),p=Array.from(new Set(s)),c=[...n.rootBackgroundColors||[]],d=[...n.rootClassBackgroundColors||[]],l=c.length?c:d,u=[...i,...n.classBackgroundColors||[]],g=Oi(l,u),m=g.color;H(o,"colors.background",m||i[0]||p[0]);let v=p.filter(V=>V&&V!==m),b=Je(n.buttonBackgroundColors||[])||v[0]||p[0],k=v.filter(V=>V&&V!==b);H(o,"colors.primary",b),H(o,"colors.secondary",k[0]||b||p[0]),H(o,"colors.accent",k[1]||k[0]||b||p[0]);let w=Z(n.declarations,["font-family"]),$=Gi(w);H(o,"typography.fontFamilyBody",$),H(o,"typography.fontFamilyHeadings",$),H(o,"typography.fontFamilyMono",/mono|code/i.test(n.textCorpus)?"JetBrains Mono":"");let T=Z(n.declarations,["font-size"]),A=he(T);H(o,"typography.baseSize",A);let F=Z(n.declarations,["padding","padding-top","padding-right","padding-bottom","padding-left","margin","margin-top","margin-right","margin-bottom","margin-left","gap","row-gap","column-gap"]),I=he(F);H(o,"spatialRhythm.baseUnit",I),H(o,"spatialRhythm.inputPadding",I),H(o,"spatialRhythm.buttonPadding",I);let z=Z(n.declarations,["border-radius"]),C=he(z)||Ji(n.classTokens||[]);H(o,"shape.radiusSize",C);let P=Z(n.declarations,["border-width","border-top-width","border-right-width","border-bottom-width","border-left-width"]),L=he(P);H(o,"shape.borderWidth",Vi(L));let y=Z(n.declarations,["max-width"]),S=he(y);H(o,"layout.containerMaxWidth",S),H(o,"layout.maxWidth",S);let M=Z(n.declarations,["min-height","height"]),E=he(M);H(o,"layout.buttonMinHeight",E),H(o,"layout.inputMinHeight",E);let B=Z(n.declarations,["transition-duration"]),O=he(B.map(V=>{let _e=String(V||"").trim().toLowerCase(),ce=Number.parseFloat(_e);return Number.isFinite(ce)?_e.endsWith("ms")?ce:_e.endsWith("s")?ce*1e3:ce:null}));H(o,"behavior.transitionSpeed",O);let N=Z(n.declarations,["box-shadow"]).length>0;H(o,"layers.baseShadowOpacity",N?.2:.08);let D=Array.from(o.inferredPaths),Y=D.reduce((V,_e)=>{let ce=_e.split(".")[0];return V[ce]=(V[ce]||0)+1,V},{}),Re=D.length?Math.min(.92,.35+D.length*.02):.25;return W({source:"html-inference",type:String(e.sourceType||"design-inference"),confidence:Re,issues:D.length?[]:[{severity:"warning",message:"Could not infer enough design signals from input."}],designPatch:o.patch,meta:{extractedPathCount:D.length,extractedPaths:D,categoryCoverage:Y,colorSampleSize:p.length,backgroundInference:{source:g.source,candidates:{root:l.length,declaration:i.length,classBased:(n.classBackgroundColors||[]).length}}}})}function jn(e={}){let t=String(e.input||"").trim(),r=String(e.sourceType||"unknown");if(!t)return W({source:r,type:r,confidence:0,issues:[{severity:"error",message:"No input provided."}],meta:{conversionMode:"none"}});if(Nn(t)){let n=Ct({html:t,config:e.config||{}});return W({source:r,type:r,confidence:n.confidence,issues:n.issues,template:n.template,meta:{...n.meta||{},conversionMode:"html-to-pds"}})}return W({source:r,type:r,confidence:.48,issues:[{severity:"info",message:"Input is not HTML; generated text-based preview template."}],template:{id:`${r}-text-import`,name:"Imported Guideline Text",html:`<article class="card surface-base stack-sm"><h3>Imported Guidelines</h3><pre>${Ti(t)}</pre></article>`},meta:{conversionMode:"text-preview"}})}function Ct(e={}){let t=String(e.html||"").trim();if(!t)return W({source:"tailwind",type:"tailwind-html",confidence:0,issues:[{severity:"error",message:"No HTML provided."}]});let r=Ci(t,{config:e.config||{}});return W({source:"tailwind",type:"tailwind-html",confidence:r.confidence,issues:r.issues,template:{id:"tailwind-import",name:"Converted Tailwind Markup",html:r.html},meta:r.meta})}function fr(e={}){let t=String(e.text||"").trim();if(!t)return W({source:"brand",type:"brand-guidelines",confidence:0,issues:[{severity:"error",message:"No brand guideline text provided."}]});let r=Ei(t),n={colors:{},typography:{}},o=[];return r?n.colors.primary=r:o.push({severity:"warning",message:"No HEX color found; primary color was not inferred."}),/serif/i.test(t)&&(n.typography.fontFamilyBody="Georgia, serif"),/sans[-\s]?serif/i.test(t)&&(n.typography.fontFamilyBody="Inter, Arial, sans-serif"),/mono|monospace/i.test(t)&&(n.typography.fontFamilyMono="JetBrains Mono, monospace"),W({source:"brand",type:"brand-guidelines",confidence:r?.68:.52,issues:o,designPatch:n,meta:{inferred:{primaryColor:r}}})}var hr="convert-only",Bn="adopt-design-and-convert";function Yi(e){return String(e||"").trim().toLowerCase()===Bn?Bn:hr}function On(...e){let t=e.flat().filter(Boolean);if(!t.length)return[];let r=new Set;return t.filter(n=>{let o=`${String(n?.severity||"info")}::${String(n?.path||"")}::${String(n?.message||"")}`;return r.has(o)?!1:(r.add(o),!0)})}function Dn(e=[]){let t=e.map(r=>Number(r)).filter(r=>Number.isFinite(r));return t.length?Math.max(0,Math.min(1,t.reduce((r,n)=>r+n,0)/t.length)):0}function Ze(e={},t={}){return{...e&&typeof e=="object"?e:{},...t&&typeof t=="object"?t:{}}}function Un(e={},t={}){if(!t||typeof t!="object")return e;let r=Array.isArray(e)?[...e]:{...e};return Object.entries(t).forEach(([n,o])=>{o&&typeof o=="object"&&!Array.isArray(o)?r[n]=Un(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o}),r}function Wn(e){if(typeof structuredClone=="function")try{return structuredClone(e)}catch{}return JSON.parse(JSON.stringify(e||{}))}function Zi(e={}){let t=Number(e?.ratio),r=Number(e?.min),n=Number.isFinite(t)?t.toFixed(2):"n/a",o=Number.isFinite(r)?r.toFixed(2):"n/a";return{severity:"error",path:String(e?.path||"/colors"),message:`${String(e?.message||"Color contrast validation failed.")} (ratio=${n}, required=${o})`}}function Hn(e={},t={},r={}){if(!(t&&typeof t=="object"?Object.keys(t):[]).length)return{ok:!0,blocked:!1,issues:[],report:{ok:!0,issues:[]}};let o=Number(r.minContrast),a=Number.isFinite(o)?o:4.5,i=Un(Wn(e||{}),Wn(t||{})),s=Ar(i,{minContrast:a,minMutedContrast:3,extendedChecks:!0}),p=Array.isArray(s?.issues)?s.issues.map(c=>Zi(c)):[];return{ok:!!s?.ok,blocked:!s?.ok,issues:p,report:{ok:!!s?.ok,minContrast:a,issues:Array.isArray(s?.issues)?s.issues:[]}}}function Xi(){return[{id:"template",name:"Templates"},{id:"tailwind-html",name:"Tailwind HTML"},{id:"brand-guidelines",name:"Brand Guidelines"},{id:"figma-json",name:"Figma Tokens JSON (planned)"},{id:"ux-pilot",name:"UX Pilot (planned)"},{id:"google-stitch",name:"Google Stitch (planned)"}]}async function Qi(e={}){let t=String(e.sourceType||""),r=Yi(e.importMode),n=String(e.input||""),o=e.config||null;if(t==="template"){let a=sn(e.templateId,e);return a.meta=Ze(a.meta,{importMode:r}),a}if(t==="tailwind-html"){let a=Ct({html:n,config:o});if(r===hr)return a.meta=Ze(a.meta,{importMode:r}),a;let i=mr({html:n,config:o,sourceType:t}),s=Hn(o||{},i.designPatch||{}),p=s.blocked?{}:i.designPatch,c=s.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...s.issues]:[];return W({source:a.source||"tailwind",type:t,confidence:Dn([a.confidence,i.confidence]),issues:On(a.issues,i.issues,c),template:a.template,designPatch:p,meta:Ze(a.meta,{importMode:r,inference:i.meta,validation:s.report,validationBlocked:s.blocked})})}if(t==="brand-guidelines"){let a=jn({input:n,sourceType:t,config:o});if(r===hr)return a.meta=Ze(a.meta,{importMode:r}),a;let i=fr({text:n}),s=mr({html:n,config:o,sourceType:t}),p={...i.designPatch&&typeof i.designPatch=="object"?i.designPatch:{},...s.designPatch&&typeof s.designPatch=="object"?s.designPatch:{}},c=Hn(o||{},p||{}),d=c.blocked?{}:p,l=c.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...c.issues]:[];return W({source:"brand",type:t,confidence:Dn([a.confidence,i.confidence,s.confidence]),issues:On(a.issues,i.issues,s.issues,l),template:a.template,designPatch:d,meta:Ze(a.meta,{importMode:r,inference:s.meta,brandHeuristics:i.meta,validation:c.report,validationBlocked:c.blocked})})}return t==="figma-json"||t==="ux-pilot"||t==="google-stitch"?W({source:t,type:t,confidence:0,issues:[{severity:"info",message:`${t} adapter is not implemented yet in this phase.`}],meta:{importMode:r}}):W({source:t||"unknown",type:"unknown",confidence:0,issues:[{severity:"error",message:"Unsupported import source type."}],meta:{importMode:r}})}var es="pds-live-import-history";var ne="imports",Mt=null;function ts(){return typeof globalThis<"u"&&typeof globalThis.indexedDB<"u"}function te(e){return typeof e=="string"?e:""}function Et(e){return Array.isArray(e)?e:[]}function Tt(e){return e&&typeof e=="object"?e:{}}function At(){return ts()?Mt||(Mt=new Promise((e,t)=>{let r=globalThis.indexedDB.open(es,1);r.onupgradeneeded=()=>{let n=r.result;if(!n.objectStoreNames.contains(ne)){let o=n.createObjectStore(ne,{keyPath:"id",autoIncrement:!0});o.createIndex("createdAt","createdAt",{unique:!1}),o.createIndex("sourceType","sourceType",{unique:!1}),o.createIndex("fileName","fileName",{unique:!1})}},r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error||new Error("Failed to open import history database."))}),Mt):Promise.resolve(null)}function Rt(e){return new Promise((t,r)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>r(e.error||new Error("IndexedDB operation failed."))})}function rs(e={}){let t=Date.now(),r=Number.isFinite(Number(e.createdAt))?Number(e.createdAt):t,n=new Date(r).toISOString(),o=Et(e.issues).map(p=>({severity:te(p?.severity||"info"),message:te(p?.message||"")})),a=Et(e.notes).filter(p=>typeof p=="string"),i=Et(e.unknownTailwindTokens).filter(p=>typeof p=="string"),s=Et(e.appliedRules).filter(p=>typeof p=="string");return{createdAt:r,createdAtIso:n,sourceType:te(e.sourceType||"unknown"),importMode:te(e.importMode||"convert-only"),source:te(e.source||"unknown"),type:te(e.type||"unknown"),fileName:te(e.fileName||""),fileSize:Number.isFinite(Number(e.fileSize))?Number(e.fileSize):0,mimeType:te(e.mimeType||""),fileContents:te(e.fileContents||""),convertedHtml:te(e.convertedHtml||""),confidence:Number.isFinite(Number(e.confidence))?Number(e.confidence):0,notes:a,issues:o,coverage:Tt(e.coverage),unknownTailwindTokens:i,appliedRules:s,importStyleSheetInjected:!!e.importStyleSheetInjected,templateName:te(e.templateName||""),designPatch:Tt(e.designPatch),meta:Tt(e.meta),resultSnapshot:Tt(e.resultSnapshot)}}async function ns(e={}){let t=await At();if(!t)return null;let r=rs(e),o=t.transaction(ne,"readwrite").objectStore(ne);return{id:await Rt(o.add(r)),...r}}async function os(e={}){let t=await At();if(!t)return[];let r=Number.isFinite(Number(e.limit))?Math.max(1,Number(e.limit)):30,o=t.transaction(ne,"readonly").objectStore(ne);return(await Rt(o.getAll())||[]).sort((i,s)=>Number(s?.createdAt||0)-Number(i?.createdAt||0)).slice(0,r)}async function as(e){let t=await At();if(!t)return null;let r=Number(e);if(!Number.isFinite(r))return null;let o=t.transaction(ne,"readonly").objectStore(ne);return await Rt(o.get(r))||null}async function is(){let e=await At();if(!e)return;let r=e.transaction(ne,"readwrite").objectStore(ne);await Rt(r.clear())}export{is as clearLiveImportHistory,fr as convertBrandGuidelinesToPatch,Ct as convertTailwindHtmlToPds,W as createImportResult,Mi as describeTailwindConversionRules,as as getLiveImportHistoryEntry,Xi as getLiveImportSources,ga as isImportResult,os as listLiveImportHistory,an as listLiveTemplates,Kr as loadGoogleFont,ft as loadLiveTemplateCatalog,Qi as runLiveImport,ns as saveLiveImportHistory,da as startLive};
