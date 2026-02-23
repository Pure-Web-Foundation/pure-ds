var Nr=Object.defineProperty;var fe=(r,e)=>()=>(r&&(e=r(r=0)),e);var he=(r,e)=>{for(var t in e)Nr(r,t,{get:e[t],enumerable:!0})};var St={};he(St,{enums:()=>y});var y,Ae=fe(()=>{y={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"},IconSizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64,"3xl":96}}});var It={};he(It,{default:()=>Vr,findComponentForElement:()=>_r,getAllSelectors:()=>Hr,getAllTags:()=>Gr,getByCategory:()=>qr,ontology:()=>_,searchOntology:()=>Ur});function oe(r,e){if(!r||!e)return!1;try{return r.matches(e)}catch{return!1}}function Nt(r,e){if(!r||!e||!r.closest)return null;try{return r.closest(e)}catch{return null}}function _r(r,{maxDepth:e=5}={}){if(!r||r.closest&&r.closest(".showcase-toc"))return null;let t=r,n=0;for(;t&&n<e;){if(n++,t.tagName==="DS-SHOWCASE")return null;if(t.classList&&t.classList.contains("showcase-section")){t=t.parentElement;continue}for(let a of PDS.ontology.enhancements){let i=a.selector||a;if(oe(t,i))return{element:t,componentType:"enhanced-component",displayName:a.description||i,id:a.id}}if(t.tagName==="FIELDSET"){let a=t.getAttribute("role");if(a==="group"||a==="radiogroup")return{element:t,componentType:"form-group",displayName:a==="radiogroup"?"radio group":"form group"}}if(t.tagName==="LABEL"&&t.querySelector&&t.querySelector("input,select,textarea"))return{element:t,componentType:"form-control",displayName:"label with input"};let o=t.closest?t.closest("label"):null;if(o&&o.querySelector&&o.querySelector("input,select,textarea"))return{element:o,componentType:"form-control",displayName:"label with input"};for(let a of PDS.ontology.primitives){for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let d=s.slice(1).replace(/\*/g,"");if(t.classList&&Array.from(t.classList).some(u=>u.startsWith(d)))return{element:t,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let p=t.parentElement,l=0;for(;p&&l<e;){if(p.classList&&Array.from(p.classList).some(u=>u.startsWith(d))&&p.tagName!=="DS-SHOWCASE")return{element:p,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};p=p.parentElement,l++}continue}continue}if(oe(t,s))return{element:t,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let c=Nt(t,s);if(c&&c.tagName!=="DS-SHOWCASE")return{element:c,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(t.classList){let i=Array.from(t.classList);for(let s of a.selectors||[])if(typeof s=="string"&&s.includes("*")&&s.startsWith(".")){let c=s.slice(1).replace(/\*/g,"");if(i.some(d=>d.startsWith(c)))return{element:t,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}}}for(let a of PDS.ontology.layoutPatterns||[])for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let d=s.slice(1).replace(/\*/g,"");if(t.classList&&Array.from(t.classList).some(p=>p.startsWith(d)))return{element:t,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}continue}if(oe(t,s))return{element:t,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags};let c=Nt(t,s);if(c&&c.tagName!=="DS-SHOWCASE")return{element:c,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(t.tagName&&t.tagName.includes("-")){let a=t.tagName.toLowerCase(),i=PDS.ontology.components.find(s=>s.selectors.includes(a));return{element:t,componentType:"web-component",displayName:i?.name||a,id:i?.id||a,tags:i?.tags}}if(t.tagName==="BUTTON"){let a=t.querySelector&&t.querySelector("pds-icon");return{element:t,componentType:"button",displayName:a?"button with icon":"button",id:"button"}}if(oe(t,"pds-icon")||t.closest&&t.closest("pds-icon")){let a=oe(t,"pds-icon")?t:t.closest("pds-icon");return{element:a,componentType:"icon",displayName:`pds-icon (${a.getAttribute&&a.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(oe(t,"nav[data-dropdown]")||t.closest&&t.closest("nav[data-dropdown]"))return{element:oe(t,"nav[data-dropdown]")?t:t.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};t=t.parentElement}return null}function Hr(){let r=[];for(let e of PDS.ontology.primitives)r.push(...e.selectors||[]);for(let e of PDS.ontology.components)r.push(...e.selectors||[]);for(let e of PDS.ontology.layoutPatterns||[])r.push(...e.selectors||[]);return Array.from(new Set(r))}function Ur(r,e={}){let t=r.toLowerCase(),n=[],o=(a,i)=>{for(let s of a)(s.id?.toLowerCase().includes(t)||s.name?.toLowerCase().includes(t)||s.description?.toLowerCase().includes(t)||s.tags?.some(d=>d.toLowerCase().includes(t))||s.category?.toLowerCase().includes(t)||s.selectors?.some(d=>d.toLowerCase().includes(t)))&&n.push({...s,type:i})};return(!e.type||e.type==="primitive")&&o(_.primitives,"primitive"),(!e.type||e.type==="component")&&o(_.components,"component"),(!e.type||e.type==="layout")&&o(_.layoutPatterns,"layout"),(!e.type||e.type==="enhancement")&&o(_.enhancements,"enhancement"),n}function qr(r){let e=r.toLowerCase();return{primitives:_.primitives.filter(t=>t.category===e),components:_.components.filter(t=>t.category===e),layouts:_.layoutPatterns.filter(t=>t.category===e)}}function Gr(){let r=new Set;return _.primitives.forEach(e=>e.tags?.forEach(t=>r.add(t))),_.components.forEach(e=>e.tags?.forEach(t=>r.add(t))),_.layoutPatterns.forEach(e=>e.tags?.forEach(t=>r.add(t))),_.enhancements.forEach(e=>e.tags?.forEach(t=>r.add(t))),Array.from(r).sort()}var _,Vr,tt=fe(()=>{_={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"callout",name:"Callout",description:"Contextual information and notification messages",selectors:[".callout",".callout-info",".callout-success",".callout-warning",".callout-danger",".callout-error",".callout-dismissible"],tags:["feedback","message","notification","status","information"],category:"feedback"},{id:"empty-state",name:"Empty State",description:"Empty state layout for missing data or onboarding",selectors:[".empty-state"],tags:["empty","no-data","zero","placeholder","onboarding","state"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-fab",name:"FAB",description:"Floating Action Button with expandable satellite actions",selectors:["pds-fab"],tags:["button","action","floating","interactive"],category:"action"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-live-edit",name:"Live Edit",description:"Contextual live editing for PDS design settings",selectors:["pds-live-edit"],tags:["editor","live","config","tooling"],category:"tooling"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element",tags:["menu","interactive","navigation"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"color-input",selector:"label[data-color]",description:"Enhanced color input with swatch shell and hex output",tags:["color","input","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["callout","badge","empty-state"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]},action:{description:"Interactive actions and buttons",primitives:["button"],components:["pds-fab"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],empty:["empty-state","placeholder","zero","no-data","onboarding","callout","card","icon","button"],"empty state":["empty-state","empty","no-data","zero","onboarding"],"no data":["empty-state","empty","zero","placeholder"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-working","pds-fab","floating"],btn:["button","interactive","action","pds-fab"],fab:["pds-fab","floating","button","action","menu"],floating:["fab","pds-fab","button","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],callout:["notification","feedback","message","status","toast","information","alert","warning","error","info","success","danger"],alert:["callout","notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["callout","toast","pds-toaster","feedback","message","popup","alert"],toast:["pds-toaster","notification","callout","feedback","popup","snackbar","alert"],feedback:["callout","notification","toast","status","badge","validation","error","success","alert"],message:["callout","notification","feedback","dialog","toast","alert"],status:["badge","callout","indicator","feedback","state","alert"],error:["callout","danger","validation","feedback","warning","alert"],success:["callout","feedback","badge","status","check","alert"],warning:["callout","caution","feedback","status","alert"],info:["callout","information","feedback","status","alert"],danger:["callout","error","feedback","destructive","delete","alert"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};Vr=_});var Jt={};he(Jt,{AutoDefiner:()=>at});async function gn(...r){let e={};r.length&&typeof r[r.length-1]=="object"&&(e=r.pop()||{});let t=r,{baseURL:n,mapper:o=d=>`${d}.js`,onError:a=(d,p)=>console.error(`[defineWebComponents] ${d}:`,p)}=e,i=n?new URL(n,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),s=d=>d.toLowerCase().replace(/(^|-)([a-z])/g,(p,l,u)=>u.toUpperCase()),c=async d=>{try{if(customElements.get(d))return{tag:d,status:"already-defined"};let p=o(d),u=await import(p instanceof URL?p.href:new URL(p,i).href),g=u?.default??u?.[s(d)];if(!g){if(customElements.get(d))return{tag:d,status:"self-defined"};throw new Error(`No export found for ${d}. Expected default export or named export "${s(d)}".`)}return customElements.get(d)?{tag:d,status:"race-already-defined"}:(customElements.define(d,g),{tag:d,status:"defined"})}catch(p){throw a(d,p),p}};return Promise.all(t.map(c))}var at,Yt=fe(()=>{at=class{constructor(e={}){let{baseURL:t,mapper:n,onError:o,predicate:a=()=>!0,attributeModule:i="data-module",root:s=document,scanExisting:c=!0,debounceMs:d=16,observeShadows:p=!0,enhancers:l=[],patchAttachShadow:u=!0}=e,g=new Set,f=new Set,h=new Set,m=new Map,b=new WeakMap,w=new WeakMap,k=0,C=!1,F=null,S=x=>{if(!x||!l.length)return;let z=w.get(x);z||(z=new Set,w.set(x,z));for(let T of l)if(!(!T.selector||!T.run)&&!z.has(T.selector))try{x.matches&&x.matches(T.selector)&&(T.run(x),z.add(T.selector))}catch(B){console.warn(`[AutoDefiner] Error applying enhancer for selector "${T.selector}":`,B)}},A=(x,z)=>{if(!C&&!(!x||!x.includes("-"))&&!customElements.get(x)&&!f.has(x)&&!h.has(x)){if(z&&z.getAttribute){let T=z.getAttribute(i);T&&!m.has(x)&&m.set(x,T)}g.add(x),R()}},R=()=>{k||(k=setTimeout(N,d))},M=x=>{if(x){if(x.nodeType===1){let z=x,T=z.tagName?.toLowerCase();T&&T.includes("-")&&!customElements.get(T)&&a(T,z)&&A(T,z),S(z),p&&z.shadowRoot&&E(z.shadowRoot)}x.querySelectorAll&&x.querySelectorAll("*").forEach(z=>{let T=z.tagName?.toLowerCase();T&&T.includes("-")&&!customElements.get(T)&&a(T,z)&&A(T,z),S(z),p&&z.shadowRoot&&E(z.shadowRoot)})}},E=x=>{if(!x||b.has(x))return;M(x);let z=new MutationObserver(T=>{for(let B of T)B.addedNodes?.forEach(W=>{M(W)}),B.type==="attributes"&&B.target&&M(B.target)});z.observe(x,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...l.map(T=>T.selector).filter(T=>T.startsWith("data-"))]}),b.set(x,z)};async function N(){if(clearTimeout(k),k=0,!g.size)return;let x=Array.from(g);g.clear(),x.forEach(z=>f.add(z));try{let z=T=>m.get(T)??(n?n(T):`${T}.js`);await gn(...x,{baseURL:t,mapper:z,onError:(T,B)=>{h.add(T),o?.(T,B)}})}catch{}finally{x.forEach(z=>f.delete(z))}}let $=s===document?document.documentElement:s,v=new MutationObserver(x=>{for(let z of x)z.addedNodes?.forEach(T=>{M(T)}),z.type==="attributes"&&z.target&&M(z.target)});if(v.observe($,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...l.map(x=>x.selector).filter(x=>x.startsWith("data-"))]}),p&&u&&Element.prototype.attachShadow){let x=Element.prototype.attachShadow;Element.prototype.attachShadow=function(T){let B=x.call(this,T);if(T&&T.mode==="open"){E(B);let W=this.tagName?.toLowerCase();W&&W.includes("-")&&!customElements.get(W)&&A(W,this)}return B},F=()=>Element.prototype.attachShadow=x}return c&&M($),{stop(){C=!0,v.disconnect(),F&&F(),k&&(clearTimeout(k),k=0),b.forEach(x=>x.disconnect())},flush:N}}static async define(...e){let t={};e.length&&typeof e[e.length-1]=="object"&&(t=e.pop()||{});let n=e,{baseURL:o,mapper:a=p=>`${p}.js`,onError:i=(p,l)=>console.error(`[defineWebComponents] ${p}:`,l)}=t,s=o?new URL(o,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),c=p=>p.toLowerCase().replace(/(^|-)([a-z])/g,(l,u,g)=>g.toUpperCase()),d=async p=>{try{if(customElements.get(p))return{tag:p,status:"already-defined"};let l=a(p),g=await import(l instanceof URL?l.href:new URL(l,s).href),f=g?.default??g?.[c(p)];if(!f){if(customElements.get(p))return{tag:p,status:"self-defined"};throw new Error(`No export found for ${p}. Expected default export or named export "${c(p)}".`)}return customElements.get(p)?{tag:p,status:"race-already-defined"}:(customElements.define(p,f),{tag:p,status:"defined"})}catch(l){throw i(p,l),l}};return Promise.all(n.map(d))}}});var gt={};he(gt,{PDSQuery:()=>ut});var ut,mt=fe(()=>{ut=class{constructor(e){this.pds=e,this.intents={color:["color","colours","shade","tint","hue","foreground","background","text","fill","bg","fg"],spacing:["spacing","space","gap","padding","margin","distance","rhythm"],typography:["font","text","type","typography","heading","body","size","weight","family"],border:["border","outline","stroke","edge","frame"],radius:["radius","rounded","corner","curve","round"],shadow:["shadow","elevation","depth","glow","drop-shadow"],component:["component","element","widget"],utility:["utility","class","helper","css"],layout:["layout","container","grid","flex","group","arrange","organize"],pattern:["pattern","example","template","structure"],interaction:["hover","focus","active","disabled","pressed","selected","checked"]},this.entities={button:["button","btn","cta"],input:["input","field","textbox","text-field","form-control"],card:["card","panel"],badge:["badge","pill","tag","chip"],surface:["surface","background","layer","container"],icon:["icon","svg","glyph","symbol"],link:["link","anchor","hyperlink"],nav:["nav","navigation","menu"],modal:["modal","dialog","popup","overlay"],drawer:["drawer","sidebar","panel"],tab:["tab","tabstrip"],toast:["toast","notification","callout","message","alert"]},this.questionWords=["what","which","how","where","when","show","find","get","give","tell"]}async search(e){if(!e||e.length<2)return[];let t=e.toLowerCase().trim(),n=this.tokenize(t),o=this.analyzeQuery(n,t),a=[];o.intents.has("color")&&a.push(...this.queryColors(o,t)),(o.intents.has("utility")||o.intents.has("border")||o.intents.has("layout")||t.includes("class"))&&a.push(...this.queryUtilities(o,t)),(o.intents.has("component")||o.entities.size>0)&&a.push(...this.queryComponents(o,t)),(o.intents.has("layout")||o.intents.has("pattern"))&&a.push(...this.queryPatterns(o,t)),o.intents.has("typography")&&a.push(...this.queryTypography(o,t)),o.intents.has("spacing")&&a.push(...this.querySpacing(o,t));let i=new Map;for(let s of a){let c=s.value;(!i.has(c)||i.get(c).score<s.score)&&i.set(c,s)}return Array.from(i.values()).sort((s,c)=>c.score-s.score).slice(0,10)}tokenize(e){return e.toLowerCase().replace(/[?!.]/g,"").split(/\s+/).filter(t=>t.length>0)}analyzeQuery(e,t){let n={intents:new Set,entities:new Set,modifiers:new Set,isQuestion:!1,tokens:e,fullText:t};n.isQuestion=this.questionWords.some(o=>e.includes(o));for(let[o,a]of Object.entries(this.intents))a.some(i=>e.includes(i)||t.includes(i))&&n.intents.add(o);for(let[o,a]of Object.entries(this.entities))a.some(i=>e.includes(i)||t.includes(i))&&n.entities.add(o);return(e.includes("hover")||t.includes("hover"))&&n.modifiers.add("hover"),(e.includes("focus")||t.includes("focus"))&&n.modifiers.add("focus"),(e.includes("active")||t.includes("active"))&&n.modifiers.add("active"),(e.includes("disabled")||t.includes("disabled"))&&n.modifiers.add("disabled"),n}queryColors(e,t){let n=[],o=this.pds.compiled;if(!o?.tokens?.colors)return n;let a=o.tokens.colors,i=Array.from(e.entities),s=Array.from(e.modifiers);if(s.includes("focus")&&e.intents.has("border")&&i.includes("input")&&n.push({text:"Focus border color: var(--color-primary-500)",value:"--color-primary-500",icon:"palette",category:"Color Token",score:100,cssVar:"var(--color-primary-500)",description:"Primary color used for focus states on form inputs"}),(t.includes("foreground")||t.includes("text"))&&(t.includes("surface")||e.entities.has("surface"))&&(n.push({text:"Text on surface: var(--surface-text)",value:"--surface-text",icon:"palette",category:"Surface Token",score:95,cssVar:"var(--surface-text)",description:"Default text color for current surface"}),n.push({text:"Secondary text: var(--surface-text-secondary)",value:"--surface-text-secondary",icon:"palette",category:"Surface Token",score:90,cssVar:"var(--surface-text-secondary)",description:"Secondary/muted text on surface"})),t.includes("primary")||t.includes("accent")||t.includes("secondary")){let c=t.includes("primary")?"primary":t.includes("accent")?"accent":"secondary";for(let d of[500,600,700]){let p=`--color-${c}-${d}`;n.push({text:`${c.charAt(0).toUpperCase()+c.slice(1)} ${d}: var(${p})`,value:p,icon:"palette",category:"Color Scale",score:80-(d-500)/100,cssVar:`var(${p})`,description:`${c} color scale shade ${d}`})}}if(i.includes("button")&&e.intents.has("color")){let c=s[0];c?n.push({text:`Button ${c} fill: var(--primary-fill-${c})`,value:`--primary-fill-${c}`,icon:"palette",category:"Interactive Token",score:92,description:`Button background color in ${c} state`}):n.push({text:"Button fill: var(--primary-fill)",value:"--primary-fill",icon:"palette",category:"Interactive Token",score:88,description:"Default button background color"})}return n}queryUtilities(e,t){let n=[],o=this.pds.ontology;if(!o?.utilities)return n;let a=o.utilities,i=[];for(let s of Object.values(a))if(typeof s=="object")for(let c of Object.values(s))Array.isArray(c)&&i.push(...c);return e.intents.has("border")&&i.filter(c=>c.includes("border")||c.includes("outline")).forEach(c=>{let d=80;t.includes("gradient")&&c.includes("gradient")&&(d=95),t.includes("glow")&&c.includes("glow")&&(d=95),n.push({text:`${c} - Border utility class`,value:c,icon:"code",category:"Utility Class",score:d,code:`<div class="${c}">...</div>`,description:this.describeUtility(c)})}),e.intents.has("layout")&&i.filter(c=>c.includes("flex")||c.includes("grid")||c.includes("items-")||c.includes("justify-")||c.includes("gap-")).forEach(c=>{n.push({text:`${c} - Layout utility`,value:c,icon:"layout",category:"Utility Class",score:85,code:`<div class="${c}">...</div>`,description:this.describeUtility(c)})}),t.includes("group")&&e.entities.has("button")&&n.push({text:".btn-group - Group buttons together",value:".btn-group",icon:"code",category:"Utility Class",score:90,code:`<div class="btn-group">
  <button class="btn-primary">One</button>
  <button class="btn-primary">Two</button>
</div>`,description:"Container for grouped buttons with connected styling"}),n}queryComponents(e,t){let n=[],o=this.pds.ontology;return!o?.components&&!o?.primitives||(o.components&&o.components.forEach(a=>{let i=this.scoreMatch(t,a.name+" "+a.id);i>50&&n.push({text:`<${a.id}> - ${a.name}`,value:a.id,icon:"brackets-curly",category:"Web Component",score:i,code:`<${a.id}></${a.id}>`,description:a.description||`${a.name} web component`})}),o.primitives&&o.primitives.forEach(a=>{let i=this.scoreMatch(t,a.name+" "+a.id);if(i>50){let s=a.selectors?.[0]||a.id;n.push({text:`${s} - ${a.name}`,value:a.id,icon:"tag",category:"Primitive",score:i-5,code:this.generatePrimitiveExample(a),description:a.description||`${a.name} primitive element`})}}),t.includes("icon")&&(t.includes("only")||t.includes("button"))&&n.push({text:'Icon-only button: <button class="btn-icon">',value:"btn-icon",icon:"star",category:"Pattern",score:95,code:`<button class="btn-icon btn-primary">
  <pds-icon icon="heart"></pds-icon>
</button>`,description:"Button with only an icon, no text label"})),n}queryPatterns(e,t){let n=[],o=this.pds.ontology;return o?.layoutPatterns&&(o.layoutPatterns.forEach(a=>{let i=this.scoreMatch(t,a.name+" "+a.id+" "+(a.description||""));if(i>50){let s=a.selectors?.[0]||`.${a.id}`;n.push({text:`${a.name} - ${a.description||"Layout pattern"}`,value:a.id,icon:"layout",category:"Layout Pattern",score:i,code:`<div class="${s.replace(".","")}">
  <!-- content -->
</div>`,description:a.description||a.name})}}),(t.includes("container")||t.includes("group"))&&(n.push({text:"Card - Container for grouping content",value:"card",icon:"layout",category:"Primitive",score:88,code:`<article class="card">
  <header>
    <h3>Title</h3>
  </header>
  <p>Content...</p>
</article>`,description:"Card container with optional header, body, and footer"}),n.push({text:"Section - Semantic container for grouping",value:"section",icon:"layout",category:"Pattern",score:85,code:`<section>
  <h2>Section Title</h2>
  <!-- content -->
</section>`,description:"Semantic section element for content grouping"}))),n}queryTypography(e,t){let n=[],o=this.pds.compiled;if(!o?.tokens?.typography)return n;let a=o.tokens.typography;return(t.includes("heading")||t.includes("title"))&&n.push({text:"Heading font: var(--font-family-heading)",value:"--font-family-heading",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-heading)",description:"Font family for headings"}),(t.includes("body")||t.includes("text"))&&n.push({text:"Body font: var(--font-family-body)",value:"--font-family-body",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-body)",description:"Font family for body text"}),n}querySpacing(e,t){let n=[],o=this.pds.compiled;if(!o?.tokens?.spacing)return n;let a=o.tokens.spacing;for(let[i,s]of Object.entries(a))["2","4","6","8"].includes(i)&&n.push({text:`Spacing ${i}: var(--spacing-${i})`,value:`--spacing-${i}`,icon:"ruler",category:"Spacing Token",score:75,cssVar:`var(--spacing-${i})`,description:`Spacing value: ${s}`});return n}scoreMatch(e,t){let n=e.toLowerCase(),o=t.toLowerCase(),a=0;if(n===o)return 100;o.includes(n)&&(a+=80);let i=this.tokenize(n),s=this.tokenize(o),c=i.filter(d=>s.includes(d)).length;return a+=c/i.length*40,o.startsWith(n)&&(a+=20),Math.min(100,a)}generatePrimitiveExample(e){let t=e.selectors?.[0]||e.id;return t.includes("button")||e.id==="button"?'<button class="btn-primary">Click me</button>':t.includes("card")||e.id==="card"?`<article class="card">
  <h3>Title</h3>
  <p>Content</p>
</article>`:t.includes("badge")||e.id==="badge"?'<span class="badge">New</span>':`<${t}>Content</${t}>`}describeUtility(e){return e.includes("border-gradient")?"Apply animated gradient border effect":e.includes("border-glow")?"Apply glowing border effect":e.includes("flex")?"Flexbox container utility":e.includes("grid")?"Grid container utility":e.includes("gap-")?"Set gap between flex/grid children":e.includes("items-")?"Align items in flex container":e.includes("justify-")?"Justify content in flex container":e===".btn-group"?"Group buttons with connected styling":"Utility class for styling"}}});var nr={};he(nr,{deepMerge:()=>rr,fragmentFromTemplateLike:()=>fn,isObject:()=>Ne,parseHTML:()=>hn});function Ne(r){return r&&typeof r=="object"&&!Array.isArray(r)}function rr(r,e){let t={...r};return Ne(r)&&Ne(e)&&Object.keys(e).forEach(n=>{Ne(e[n])?n in r?t[n]=rr(r[n],e[n]):Object.assign(t,{[n]:e[n]}):Object.assign(t,{[n]:e[n]})}),t}function fn(r){let e=Array.isArray(r?.strings)?r.strings:[],t=Array.isArray(r?.values)?r.values:[],n=new Set,o=[],a=/(\s)(\.[\w-]+)=\s*$/;for(let l=0;l<e.length;l+=1){let u=e[l]??"",g=u.match(a);if(g&&l<t.length){let h=g[2].slice(1),m=`pds-val-${l}`;u=u.replace(a,`$1data-pds-prop="${h}:${m}"`),n.add(l)}o.push(u),l<t.length&&!n.has(l)&&o.push(`<!--pds-val-${l}-->`)}let i=document.createElement("template");i.innerHTML=o.join("");let s=(l,u)=>{let g=l.parentNode;if(!g)return;if(u==null){g.removeChild(l);return}let f=h=>{if(h!=null){if(h instanceof Node){g.insertBefore(h,l);return}if(Array.isArray(h)){h.forEach(m=>f(m));return}g.insertBefore(document.createTextNode(String(h)),l)}};f(u),g.removeChild(l)},c=document.createTreeWalker(i.content,NodeFilter.SHOW_COMMENT),d=[];for(;c.nextNode();){let l=c.currentNode;l?.nodeValue?.startsWith("pds-val-")&&d.push(l)}return d.forEach(l=>{let u=Number(l.nodeValue.replace("pds-val-",""));s(l,t[u])}),i.content.querySelectorAll("*").forEach(l=>{let u=l.getAttribute("data-pds-prop");if(!u)return;let[g,f]=u.split(":"),h=Number(String(f).replace("pds-val-",""));g&&Number.isInteger(h)&&(l[g]=t[h]),l.removeAttribute("data-pds-prop")}),i.content}function hn(r){return new DOMParser().parseFromString(r,"text/html").body.childNodes}var or=fe(()=>{});Ae();var ce="any",ve={type:"object",allowUnknown:!1,properties:{id:{type:"string",minLength:1,maxLength:64},name:{type:"string",minLength:1,maxLength:80},tags:{type:"array",uniqueItems:!0,items:{type:"string"}},themes:{type:"array",uniqueItems:!0,items:{type:"string",oneOf:[{const:"light",title:"Light"},{const:"dark",title:"Dark"},{const:"system",title:"System"}]}},description:{type:"string",maxLength:500},options:{type:"object",allowUnknown:!0,properties:{liquidGlassEffects:{type:"boolean"},backgroundMesh:{type:"number"}}},form:{type:"object",allowUnknown:!0,properties:{options:{type:"object",allowUnknown:!0,properties:{widgets:{type:"object",allowUnknown:!1,properties:{booleans:{type:"string"},numbers:{type:"string"},selects:{type:"string"}}},layouts:{type:"object",allowUnknown:!1,properties:{fieldsets:{type:"string"},arrays:{type:"string"}}},enhancements:{type:"object",allowUnknown:!1,properties:{icons:{type:"boolean"},datalists:{type:"boolean"},rangeOutput:{type:"boolean"},colorInput:{type:"boolean"}}},validation:{type:"object",allowUnknown:!1,properties:{showErrors:{type:"boolean"},validateOnChange:{type:"boolean"}}}}}}},colors:{type:"object",allowUnknown:!1,properties:{primary:{type:"string",relations:{tokens:["--color-primary-*","--color-primary-fill","--color-primary-text","--background-mesh-*"]}},secondary:{type:"string",relations:{tokens:["--color-secondary-*","--color-gray-*","--background-mesh-*"]}},accent:{type:"string",relations:{tokens:["--color-accent-*","--background-mesh-*"]}},background:{type:"string",relations:{tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},success:{type:["string","null"],relations:{tokens:["--color-success-*"]}},warning:{type:["string","null"],relations:{tokens:["--color-warning-*"]}},danger:{type:["string","null"],relations:{tokens:["--color-danger-*"]}},info:{type:["string","null"],relations:{tokens:["--color-info-*"]}},gradientStops:{type:"number"},elevationOpacity:{type:"number",relations:{tokens:["--surface-*-shadow"]}},darkMode:{type:"object",allowUnknown:!1,properties:{background:{type:"string",relations:{theme:"dark",tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},primary:{type:"string",relations:{theme:"dark",tokens:["--color-primary-*","--color-primary-fill","--color-primary-text"]}},secondary:{type:"string",relations:{theme:"dark",tokens:["--color-secondary-*","--color-gray-*"]}},accent:{type:"string",relations:{theme:"dark",tokens:["--color-accent-*"]}}}}}},typography:{type:"object",allowUnknown:!1,properties:{fontFamilyHeadings:{type:"string",relations:{tokens:["--font-family-headings"]}},fontFamilyBody:{type:"string",relations:{tokens:["--font-family-body"]}},fontFamilyMono:{type:"string",relations:{tokens:["--font-family-mono"]}},baseFontSize:{type:"number",relations:{tokens:["--font-size-*"]}},fontScale:{type:"number",relations:{tokens:["--font-size-*"]}},fontWeightLight:{type:["string","number"],relations:{tokens:["--font-weight-light"]}},fontWeightNormal:{type:["string","number"],relations:{tokens:["--font-weight-normal"]}},fontWeightMedium:{type:["string","number"],relations:{tokens:["--font-weight-medium"]}},fontWeightSemibold:{type:["string","number"],relations:{tokens:["--font-weight-semibold"]}},fontWeightBold:{type:["string","number"],relations:{tokens:["--font-weight-bold"]}},lineHeightTight:{type:["string","number"],relations:{tokens:["--font-line-height-tight"]}},lineHeightNormal:{type:["string","number"],relations:{tokens:["--font-line-height-normal"]}},lineHeightRelaxed:{type:["string","number"],relations:{tokens:["--font-line-height-relaxed"]}},letterSpacingTight:{type:"number"},letterSpacingNormal:{type:"number"},letterSpacingWide:{type:"number"}}},spatialRhythm:{type:"object",allowUnknown:!1,properties:{baseUnit:{type:"number",relations:{tokens:["--spacing-*"]}},scaleRatio:{type:"number"},maxSpacingSteps:{type:"number",relations:{tokens:["--spacing-*"]}},containerPadding:{type:"number"},inputPadding:{type:"number",relations:{rules:[{selectors:["input","textarea","select"],properties:["padding"]}]}},buttonPadding:{type:"number",relations:{rules:[{selectors:["button",".btn"],properties:["padding"]}]}},sectionSpacing:{type:"number",relations:{rules:[{selectors:["section"],properties:["margin","padding"]}]}}}},shape:{type:"object",allowUnknown:!1,properties:{radiusSize:{type:["string","number"],relations:{tokens:["--radius-*"]}},customRadius:{type:["string","number","null"]},borderWidth:{type:["string","number"],relations:{tokens:["--border-width-*"]}}}},behavior:{type:"object",allowUnknown:!1,properties:{transitionSpeed:{type:["string","number"],relations:{tokens:["--transition-*"]}},animationEasing:{type:"string"},customTransitionSpeed:{type:["number","null"]},customEasing:{type:["string","null"]},focusRingWidth:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["outline-width","box-shadow"]}]}},focusRingOpacity:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["box-shadow","outline-color"]}]}},hoverOpacity:{type:"number"}}},layout:{type:"object",allowUnknown:!1,properties:{maxWidth:{type:["number","string"],relations:{tokens:["--layout-max-width","--layout-max-width-*"]}},maxWidths:{type:"object",allowUnknown:!1,properties:{sm:{type:["number","string"],relations:{tokens:["--layout-max-width-sm"]}},md:{type:["number","string"],relations:{tokens:["--layout-max-width-md"]}},lg:{type:["number","string"],relations:{tokens:["--layout-max-width-lg"]}},xl:{type:["number","string"],relations:{tokens:["--layout-max-width-xl"]}}}},containerPadding:{type:["number","string"],relations:{tokens:["--layout-container-padding"]}},breakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"number"},md:{type:"number"},lg:{type:"number"},xl:{type:"number"}}},gridColumns:{type:"number"},gridGutter:{type:"number"},densityCompact:{type:"number"},densityNormal:{type:"number"},densityComfortable:{type:"number"},buttonMinHeight:{type:"number"},inputMinHeight:{type:"number"},baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}},utilities:{type:"object",allowUnknown:!0,properties:{grid:{type:"boolean"},flex:{type:"boolean"},spacing:{type:"boolean"},container:{type:"boolean"}}},gridSystem:{type:"object",allowUnknown:!0,properties:{columns:{type:"array",items:{type:"number"}},autoFitBreakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"string"},md:{type:"string"},lg:{type:"string"},xl:{type:"string"}}},enableGapUtilities:{type:"boolean"}}},containerMaxWidth:{type:["number","string"]}}},layers:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},shadowBlurMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowOffsetMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowDepth:{type:"string"},blurLight:{type:"number"},blurMedium:{type:"number"},blurHeavy:{type:"number"},baseZIndex:{type:"number",relations:{tokens:["--z-*"]}},zIndexStep:{type:"number",relations:{tokens:["--z-*"]}},zIndexBase:{type:"number"},zIndexDropdown:{type:"number"},zIndexSticky:{type:"number"},zIndexFixed:{type:"number"},zIndexModal:{type:"number"},zIndexPopover:{type:"number"},zIndexTooltip:{type:"number"},zIndexNotification:{type:"number"},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}}}},advanced:{type:"object",allowUnknown:!0,properties:{linkStyle:{type:"string"},colorDerivation:{type:"string"}}},a11y:{type:"object",allowUnknown:!0,properties:{minTouchTarget:{type:["string","number"]},prefersReducedMotion:{type:"boolean"},focusStyle:{type:"string"}}},icons:{type:"object",allowUnknown:!1,properties:{set:{type:"string"},weight:{type:"string"},defaultSize:{type:"number",relations:{tokens:["--icon-size"]}},sizes:{type:"object",allowUnknown:!0,properties:{xs:{type:["number","string"]},sm:{type:["number","string"]},md:{type:["number","string"]},lg:{type:["number","string"]},xl:{type:["number","string"]},"2xl":{type:["number","string"]}}},spritePath:{type:"string"},externalPath:{type:"string"},include:{type:"object",allowUnknown:!0,properties:{navigation:{type:"array",items:{type:"string"}},actions:{type:"array",items:{type:"string"}},communication:{type:"array",items:{type:"string"}},content:{type:"array",items:{type:"string"}},status:{type:"array",items:{type:"string"}},time:{type:"array",items:{type:"string"}},commerce:{type:"array",items:{type:"string"}},formatting:{type:"array",items:{type:"string"}},system:{type:"array",items:{type:"string"}}}}}},components:{type:"object",allowUnknown:!0},debug:{type:"boolean"}}},Ir={type:"object",allowUnknown:!0,properties:{mode:{type:"string"},preset:{type:"string"},design:ve,enhancers:{type:["object","array"]},applyGlobalStyles:{type:"boolean"},manageTheme:{type:"boolean"},themeStorageKey:{type:"string"},preloadStyles:{type:"boolean"},criticalLayers:{type:"array",items:{type:"string"}},autoDefine:{type:"object",allowUnknown:!1,properties:{predefine:{type:"array",items:{type:"string"}},mapper:{type:ce},enhancers:{type:["object","array"]},scanExisting:{type:"boolean"},observeShadows:{type:"boolean"},patchAttachShadow:{type:"boolean"},debounceMs:{type:"number"},onError:{type:ce},baseURL:{type:"string"}}},managerURL:{type:"string"},manager:{type:ce},liveEdit:{type:"boolean"},log:{type:ce}}};function be(r){return r===null?"null":Array.isArray(r)?"array":typeof r}function Br(r,e){if(e===ce)return!0;let t=be(r);return Array.isArray(e)?e.includes(t):t===e}function Fe(r,e,t,n){if(!e)return;let o=e.type||ce;if(!Br(r,o)){n.push({path:t,expected:o,actual:be(r),message:`Expected ${o} but got ${be(r)}`});return}if(o==="array"&&e.items&&Array.isArray(r)&&r.forEach((a,i)=>{Fe(a,e.items,`${t}[${i}]`,n)}),o==="object"&&r&&typeof r=="object"){let a=e.properties||{};for(let[i,s]of Object.entries(r)){if(!Object.prototype.hasOwnProperty.call(a,i)){e.allowUnknown||n.push({path:`${t}.${i}`,expected:"known property",actual:"unknown",message:`Unknown property "${i}"`});continue}Fe(s,a[i],`${t}.${i}`,n)}}}function Ze(r,e="",t={}){if(!r||typeof r!="object")return t;if(r.relations&&e&&(t[e]=r.relations),r.type==="object"&&r.properties&&Object.entries(r.properties).forEach(([n,o])=>{let a=e?`${e}.${n}`:n;Ze(o,a,t)}),r.type==="array"&&r.items){let n=`${e}[]`;Ze(r.items,n,t)}return t}var Et=Ze(ve,""),At=ve,jr={"colors.primary":{widget:"input-color"},"colors.secondary":{widget:"input-color"},"colors.accent":{widget:"input-color"},"colors.background":{widget:"input-color"},"colors.success":{widget:"input-color"},"colors.warning":{widget:"input-color"},"colors.danger":{widget:"input-color"},"colors.info":{widget:"input-color"},"colors.gradientStops":{min:2,max:8,step:1,widget:"range"},"colors.elevationOpacity":{min:0,max:1,step:.01,widget:"range"},"colors.darkMode.background":{widget:"input-color"},"colors.darkMode.primary":{widget:"input-color"},"colors.darkMode.secondary":{widget:"input-color"},"colors.darkMode.accent":{widget:"input-color"},description:{widget:"textarea",maxLength:500,rows:4,placeholder:"Summarize the visual and interaction intent"},"typography.fontFamilyHeadings":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Heading font stack"},"typography.fontFamilyBody":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Body font stack"},"typography.fontFamilyMono":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Monospace font stack"},"typography.baseFontSize":{min:8,max:32,step:1,widget:"input-range"},"typography.fontScale":{min:1,max:2,step:.01,widget:"range"},"typography.fontWeightLight":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightNormal":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightMedium":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightSemibold":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightBold":{min:100,max:800,step:100,widget:"input-range"},"typography.lineHeightTight":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightNormal":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightRelaxed":{min:.75,max:3,step:.001,widget:"input-range"},"typography.letterSpacingTight":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingNormal":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingWide":{min:-.1,max:.1,step:.001,widget:"range"},"spatialRhythm.baseUnit":{min:1,max:16,step:1,widget:"range"},"spatialRhythm.scaleRatio":{min:1,max:2,step:.01,widget:"range"},"spatialRhythm.maxSpacingSteps":{min:4,max:64,step:1,widget:"range"},"spatialRhythm.containerPadding":{min:0,max:8,step:.05,widget:"range"},"spatialRhythm.inputPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.buttonPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.sectionSpacing":{min:0,max:8,step:.05,widget:"range"},"shape.radiusSize":{oneOf:Object.entries(y.RadiusSizes).map(([r,e])=>({const:e,title:r}))},"shape.borderWidth":{widget:"select",oneOf:Object.entries(y.BorderWidths).map(([r,e])=>({const:e,title:r}))},"shape.customRadius":{min:0,max:64,step:1,widget:"range"},"behavior.transitionSpeed":{oneOf:Object.entries(y.TransitionSpeeds).map(([r,e])=>({const:e,title:r}))},"behavior.animationEasing":{enum:Object.values(y.AnimationEasings)},"behavior.customTransitionSpeed":{min:0,max:1e3,step:10,widget:"range"},"behavior.focusRingWidth":{min:0,max:8,step:1,widget:"range"},"behavior.focusRingOpacity":{min:0,max:1,step:.01,widget:"range"},"behavior.hoverOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.gridColumns":{min:1,max:24,step:1,widget:"range"},"layout.gridGutter":{min:0,max:8,step:.05,widget:"range"},"layout.maxWidth":{widget:"input-text",placeholder:"e.g. 1200 or 1200px"},"layout.maxWidths.sm":{widget:"input-text",placeholder:"e.g. 640 or 640px"},"layout.maxWidths.md":{widget:"input-text",placeholder:"e.g. 768 or 768px"},"layout.maxWidths.lg":{widget:"input-text",placeholder:"e.g. 1024 or 1024px"},"layout.maxWidths.xl":{widget:"input-text",placeholder:"e.g. 1280 or 1280px"},"layout.containerMaxWidth":{widget:"input-text",placeholder:"e.g. 1400px"},"layout.containerPadding":{widget:"input-text",placeholder:"e.g. var(--spacing-6)"},"layout.breakpoints.sm":{min:320,max:2560,step:1,widget:"input-number"},"layout.breakpoints.md":{min:480,max:3200,step:1,widget:"input-number"},"layout.breakpoints.lg":{min:640,max:3840,step:1,widget:"input-number"},"layout.breakpoints.xl":{min:768,max:5120,step:1,widget:"input-number"},"layout.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.densityCompact":{min:.5,max:2,step:.05,widget:"range"},"layout.densityNormal":{min:.5,max:2,step:.05,widget:"range"},"layout.densityComfortable":{min:.5,max:2,step:.05,widget:"range"},"layout.buttonMinHeight":{min:24,max:96,step:1,widget:"range"},"layout.inputMinHeight":{min:24,max:96,step:1,widget:"range"},"layers.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layers.shadowBlurMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.shadowOffsetMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.blurLight":{min:0,max:48,step:1,widget:"range"},"layers.blurMedium":{min:0,max:64,step:1,widget:"range"},"layers.blurHeavy":{min:0,max:96,step:1,widget:"range"},"layers.baseZIndex":{min:0,max:1e4,step:10,widget:"range"},"layers.zIndexStep":{min:1,max:100,step:1,widget:"range"},"layers.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"advanced.linkStyle":{enum:Object.values(y.LinkStyles)},"a11y.minTouchTarget":{oneOf:Object.entries(y.TouchTargetSizes).map(([r,e])=>({const:e,title:r}))},"a11y.focusStyle":{enum:Object.values(y.FocusStyles)},"icons.defaultSize":{min:8,max:128,step:1,widget:"range",icon:"sparkle"}};function $t(r=[]){return r.join(".")}function Ct(r=[]){return`/${r.join("/")}`}function Or(r,e=[]){if(!(!r||typeof r!="object"))return e.reduce((t,n)=>{if(t!=null&&typeof t=="object")return t[n]},r)}function zt(r,e,t=[]){if(r!=null)return r;let n=Or(e,t);return n??void 0}function ye(r=""){return String(r).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/^./,e=>e.toUpperCase())}function Ft(r,e){if(!r)return"string";let t=r.type||"string";if(Array.isArray(t)){let n=be(e);return n!=="undefined"&&t.includes(n)?n:t.includes("string")?"string":t.find(o=>o!=="null")||t[0]||"string"}return t}function Qe(r,e,t=[]){return!r||!e||!Array.isArray(t)||t.forEach(n=>{e[n]!==void 0&&(r[n]=e[n])}),r}function Mt(r,e){return Array.isArray(e?.oneOf)&&e.oneOf.length?e.oneOf:Array.isArray(e?.enum)&&e.enum.length?e.enum.map(t=>({const:t,title:ye(t)})):Array.isArray(r?.oneOf)&&r.oneOf.length?r.oneOf:Array.isArray(r?.enum)&&r.enum.length?r.enum.map(t=>({const:t,title:ye(t)})):null}function Wr(r){return r&&(r==="range"?"input-range":r)}function Dr(r,e){if(!Array.isArray(e)||!e.length)return r;let t=new Set;for(let n of e)!n||n.const===void 0||t.add(be(n.const));if(!t.size)return r;if(t.size===1){let n=Array.from(t)[0];if(n==="number")return"number";if(n==="string")return"string";if(n==="boolean")return"boolean"}return r}function Tt(r,e,t){let n=Ft(e,t),o=r.toLowerCase(),a={label:ye(r.split(".").slice(-1)[0]||r)};n==="boolean"&&(a.widget="toggle"),n==="number"&&(a.widget="range",o.includes("opacity")?(a.min=0,a.max=1,a.step=.01):o.includes("lineheight")?(a.min=.75,a.max=3,a.step=.001,a.widget="input-range"):o.includes("fontweight")?(a.min=100,a.max=800,a.step=100,a.widget="input-range"):o.endsWith("basefontsize")?(a.min=8,a.max=32,a.step=1,a.widget="input-range"):o.includes("scale")||o.includes("ratio")?(a.min=1,a.max=2,a.step=.01):(a.min=0,a.max=Math.max(10,Number.isFinite(Number(t))?Number(t)*4:100),a.step=1)),n==="string"&&r.startsWith("colors.")&&(a.widget="input-color"),n==="string"&&o==="description"&&(a.widget="textarea",a.maxLength=500,a.rows=4);let i=jr[r]||{},s={...a,...i};return s.widget&&(s.widget=Wr(s.widget)),s}function Lt(r,e,t,n,o,a){if(!r||typeof r!="object")return null;let i=zt(e,a,t),s=Ft(r,i);if(s==="object"&&r.properties){let b={type:"object",properties:{}};t.length>0&&(b.title=ye(t[t.length-1]));let w={};for(let[k,C]of Object.entries(r.properties)){let F=e&&typeof e=="object"&&!Array.isArray(e)?e[k]:void 0,S=Lt(C,F,[...t,k],n,o,a);S&&(b.properties[k]=S.schema,S.hasValue&&(w[k]=S.value))}return Object.keys(b.properties).length?{schema:b,value:w,hasValue:Object.keys(w).length>0}:null}if(s==="array"){let b=$t(t),w=Tt(b,r,e);o[b]=w;let k=zt(e,a,t),C=r.items?.type||"string",F=Array.isArray(C)?C[0]:C,S={type:F},A=Mt(r?.items,null);if(A&&(S.oneOf=A),F==="string"&&Array.isArray(k)&&k.length>0){let $=k.find(v=>typeof v=="string"&&v.trim().length>0);$&&(S.examples=[$])}Qe(S,r?.items,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","minItems","maxItems","uniqueItems","description","default"]);let R={type:"array",items:S};Qe(R,r,["minItems","maxItems","uniqueItems","description","default"]);let M=Ct(t),E={},N=Array.isArray(S.oneOf)&&S.oneOf.length>0;if(F==="string"&&N&&(E["ui:widget"]=R.maxItems===1?"radio":"checkbox-group"),F==="string"&&Array.isArray(k)&&k.length>0){let $=k.filter(v=>typeof v=="string"&&v.trim().length>0).slice(0,5).join(", ");$&&(E["ui:placeholder"]=$)}return Object.keys(E).length&&(n[M]={...n[M]||{},...E}),{schema:R,value:Array.isArray(e)?e:[],hasValue:Array.isArray(e)}}let c=$t(t),d=Tt(c,r,i);o[c]=d;let p=Mt(r,d),g={type:Dr(s==="null"?"string":s,p),title:d.label||ye(t[t.length-1]||c)};p&&(g.oneOf=p),Qe(g,r,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","description","default"]),typeof d.maxLength=="number"&&g.maxLength===void 0&&(g.maxLength=d.maxLength),(g.type==="number"||g.type==="integer")&&typeof d.min=="number"&&g.minimum===void 0&&(g.minimum=d.min),(g.type==="number"||g.type==="integer")&&typeof d.max=="number"&&g.maximum===void 0&&(g.maximum=d.max),(g.type==="number"||g.type==="integer")&&typeof d.step=="number"&&g.multipleOf===void 0&&(g.multipleOf=d.step);let f=i;f!==void 0&&(g.examples=[f]);let h=Ct(t),m={};return d.widget&&(m["ui:widget"]=d.widget),d.icon&&(m["ui:icon"]=d.icon),typeof d.min=="number"&&(m["ui:min"]=d.min),typeof d.max=="number"&&(m["ui:max"]=d.max),typeof d.step=="number"&&(m["ui:step"]=d.step),d.placeholder&&(m["ui:placeholder"]=d.placeholder),typeof d.rows=="number"&&(m["ui:options"]={...m["ui:options"]||{},rows:d.rows}),d.widget==="input-range"&&f!==void 0&&(m["ui:allowUnset"]=!0),(typeof d.min=="number"||typeof d.max=="number"||typeof d.step=="number")&&(m["ui:options"]={...m["ui:options"]||{},...typeof d.min=="number"?{min:d.min}:{},...typeof d.max=="number"?{max:d.max}:{},...typeof d.step=="number"?{step:d.step}:{}}),Object.keys(m).length&&(n[h]=m),{schema:g,value:e,hasValue:e!==void 0}}function de(r={}){let e={},t={"/colors":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}},"/colors/darkMode":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}}},n=Y?.default&&typeof Y.default=="object"?Y.default:null,o=Lt(ve,r,[],t,e,n);return{schema:o?.schema||{type:"object",properties:{}},uiSchema:t,values:o?.value||{},metadata:e}}function xe(r={}){return de(r).metadata}function Ke(r,{log:e,context:t="PDS config"}={}){if(!r||typeof r!="object")return[];let n=[];return Fe(r,ve,"design",n),n.length&&typeof e=="function"&&n.forEach(o=>{e("warn",`[${t}] ${o.message} at ${o.path}`)}),n}function Xe(r,{log:e,context:t="PDS config"}={}){if(!r||typeof r!="object")return[];let n=[];return Fe(r,Ir,"config",n),n.length&&typeof e=="function"&&n.forEach(o=>{e("warn",`[${t}] ${o.message} at ${o.path}`)}),n}var Y={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:y.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.318,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:y.RadiusSizes.xlarge,borderWidth:y.BorderWidths.medium},behavior:{transitionSpeed:y.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],themes:["light"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:y.RadiusSizes.none,borderWidth:y.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:y.RadiusSizes.xxlarge,borderWidth:y.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:y.RadiusSizes.none,borderWidth:y.BorderWidths.thick},behavior:{transitionSpeed:y.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.3,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.3},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.thick},behavior:{transitionSpeed:y.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",themes:["light"],description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:y.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:y.RadiusSizes.xxlarge,borderWidth:y.BorderWidths.thin},behavior:{transitionSpeed:y.TransitionSpeeds.slow,animationEasing:y.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0c0c0c",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:y.RadiusSizes.none,borderWidth:y.BorderWidths.thick},behavior:{transitionSpeed:y.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:y.RadiusSizes.large,borderWidth:y.BorderWidths.medium},behavior:{transitionSpeed:y.TransitionSpeeds.normal,animationEasing:y.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c",primary:"#0a4ca4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:y.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:y.RadiusSizes.large,borderWidth:y.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:y.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:y.TransitionSpeeds.normal,animationEasing:y.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#06c167"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.medium},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:y.TouchTargetSizes.comfortable,focusStyle:y.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:2.5},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:y.TouchTargetSizes.standard,focusStyle:y.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:y.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:1.5},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.thin},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:y.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};Y.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!1,backgroundMesh:0},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0,colorInput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:y.FontWeights.light,fontWeightNormal:y.FontWeights.normal,fontWeightMedium:y.FontWeights.medium,fontWeightSemibold:y.FontWeights.semibold,fontWeightBold:y.FontWeights.bold,lineHeightTight:y.LineHeights.tight,lineHeightNormal:y.LineHeights.normal,lineHeightRelaxed:y.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:y.RadiusSizes.large,borderWidth:y.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:y.TransitionSpeeds.normal,animationEasing:y.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:30,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:y.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:y.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:y.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:y.IconSizes,include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"/assets/pds/icons/pds-icons.svg"},debug:!1};var Rt=xe(Y.default),Pt=de(Y.default);function et(r="log",e,...t){if(this?.debug||this?.design?.debug||!1||r==="error"||r==="warn"){let o=console[r]||console.log;t.length>0?o(e,...t):o(e)}}Ae();tt();var G=class r{static#m;static get instance(){return this.#m}#e;#o;constructor(e={}){this.options={debug:!1,...e},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),r.#m=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#Se(),typeof CSSStyleSheet<"u"?this.#Te():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let e=this.options.design||{},t=this.#M(e),n=e.layers||{},o=this.#h(n,t.light),a=this.#C(o),i=t.dark!=null?this.#C(this.#h(n,t.dark)):null;return{colors:this.#T(e.colors||{},t),spacing:this.generateSpacingTokens(e.spatialRhythm||{}),radius:this.#O(e.shape||{}),borderWidths:this.#W(e.shape||{}),typography:this.generateTypographyTokens(e.typography||{}),shadows:a,darkShadows:i,layout:this.#D(e.layout||{}),transitions:this.#_(e.behavior||{}),zIndex:this.#H(e.layers||{}),icons:this.#U(e.icons||{})}}#M(e={}){let t=e.layout||{},n=e.layers||{};return{light:this.#f(t.baseShadowOpacity??n.baseShadowOpacity),dark:this.#f(t.darkMode?.baseShadowOpacity??n.darkMode?.baseShadowOpacity)}}#f(e){let t=Number(e);if(Number.isFinite(t))return Math.min(Math.max(t,0),1)}#h(e={},t){let n={...e};return t!=null&&(n.baseShadowOpacity=t),n}#T(e,t={}){let{primary:n="#3b82f6",secondary:o="#64748b",accent:a="#ec4899",background:i="#ffffff",success:s=null,warning:c="#FFBF00",danger:d=null,info:p=null,darkMode:l={}}=e,u={primary:this.#r(n),secondary:this.#r(o),accent:this.#r(a),success:this.#r(s||this.#E(n)),warning:this.#r(c||a),danger:this.#r(d||this.#A(n)),info:this.#r(p||n),gray:this.#b(o),surface:this.#y(i)};return u.surface.fieldset=this.#F(u.surface),u.surfaceSmart=this.#S(u.surface,t),u.dark=this.#R(u,i,l),u.dark&&u.dark.surface&&(u.dark.surfaceSmart=this.#S(u.dark.surface,t)),u.interactive={light:{fill:this.#k(u.primary,4.5),text:u.primary[600]},dark:{fill:this.#k(u.dark.primary,4.5),text:this.#B(u.dark.primary,u.dark.surface.base,4.5)}},u}#r(e){let t=this.#a(e);return{50:this.#t(t.h,Math.max(t.s-10,10),Math.min(t.l+45,95)),100:this.#t(t.h,Math.max(t.s-5,15),Math.min(t.l+35,90)),200:this.#t(t.h,t.s,Math.min(t.l+25,85)),300:this.#t(t.h,t.s,Math.min(t.l+15,75)),400:this.#t(t.h,t.s,Math.min(t.l+5,65)),500:e,600:this.#t(t.h,t.s,Math.max(t.l-10,25)),700:this.#t(t.h,t.s,Math.max(t.l-20,20)),800:this.#t(t.h,t.s,Math.max(t.l-30,15)),900:this.#t(t.h,t.s,Math.max(t.l-40,10))}}#E(e){let t=this.#a(e);return this.#t(120,Math.max(t.s,60),45)}#A(e){let t=this.#a(e);return this.#t(0,Math.max(t.s,70),50)}#b(e){let t=this.#a(e),n=t.h,o=Math.min(t.s,10);return{50:this.#t(n,o,98),100:this.#t(n,o,95),200:this.#t(n,o,88),300:this.#t(n,o,78),400:this.#t(n,o,60),500:e,600:this.#t(n,Math.min(o+5,15),45),700:this.#t(n,Math.min(o+8,18),35),800:this.#t(n,Math.min(o+10,20),20),900:this.#t(n,Math.min(o+12,22),10)}}#y(e){let t=this.#a(e);return{base:e,subtle:this.#t(t.h,Math.max(t.s,2),Math.max(t.l-2,2)),elevated:this.#t(t.h,Math.max(t.s,3),Math.max(t.l-4,5)),sunken:this.#t(t.h,Math.max(t.s,4),Math.max(t.l-6,8)),overlay:this.#t(t.h,Math.max(t.s,2),Math.min(t.l+2,98)),inverse:this.#v(e),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#F(e){return{base:e.subtle,subtle:e.elevated,elevated:e.sunken,sunken:this.#L(e.sunken,.05),overlay:e.elevated}}#L(e,t=.05){let n=this.#a(e),o=Math.max(n.l-n.l*t,5);return this.#t(n.h,n.s,o)}#v(e){let t=this.#a(e);if(t.l>50){let n=Math.min(t.s+5,25),o=Math.max(12-(t.l-50)*.1,8);return this.#t(t.h,n,o)}else{let n=Math.max(t.s-10,5),o=Math.min(85+(50-t.l)*.3,95);return this.#t(t.h,n,o)}}#R(e,t="#ffffff",n={}){let o=n.background?n.background:this.#v(t),a=this.#y(o),i=n.primary?this.#r(n.primary):this.#i(e.primary);return{surface:{...a,fieldset:this.#I(a)},primary:i,secondary:n.secondary?this.#r(n.secondary):this.#i(e.secondary),accent:n.accent?this.#r(n.accent):this.#i(e.accent),gray:n.secondary?this.#b(n.secondary):e.gray,success:this.#i(e.success),info:this.#i(e.info),warning:this.#i(e.warning),danger:this.#i(e.danger)}}#c(e){let t=String(e||"").replace("#",""),n=t.length===3?t.split("").map(a=>a+a).join(""):t,o=parseInt(n,16);return{r:o>>16&255,g:o>>8&255,b:o&255}}#p(e){let{r:t,g:n,b:o}=this.#c(e),a=[t/255,n/255,o/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*a[0]+.7152*a[1]+.0722*a[2]}#d(e,t){let n=this.#p(e),o=this.#p(t),a=Math.max(n,o),i=Math.min(n,o);return(a+.05)/(i+.05)}#x(e,t=4.5){if(!e)return"#000000";let n="#ffffff",o="#000000",a=this.#d(e,n);if(a>=t)return n;let i=this.#d(e,o);return i>=t||i>a?o:n}#w(e,t=1){let{r:n,g:o,b:a}=this.#c(e);return`rgba(${n}, ${o}, ${a}, ${t})`}#P(e,t,n=.5){let o=this.#c(e),a=this.#c(t),i=Math.round(o.r+(a.r-o.r)*n),s=Math.round(o.g+(a.g-o.g)*n),c=Math.round(o.b+(a.b-o.b)*n);return this.#N(i,s,c)}#N(e,t,n){let o=a=>{let i=Math.max(0,Math.min(255,Math.round(a))).toString(16);return i.length===1?"0"+i:i};return`#${o(e)}${o(t)}${o(n)}`}#I(e){return{base:e.elevated,subtle:e.overlay,elevated:this.#$(e.elevated,.08),sunken:e.elevated,overlay:this.#$(e.overlay,.05)}}#B(e={},t="#000000",n=4.5){let o=["600","700","800","500","400","900","300","200"],a={shade:null,color:null,ratio:0};for(let i of o){let s=e?.[i];if(!s||typeof s!="string")continue;let c=this.#d(s,t);if(c>a.ratio&&(a={shade:i,color:s,ratio:c}),c>=n)return s}return a.color||e?.["600"]||e?.["500"]}#k(e={},t=4.5){let n=["600","700","800","500","400","900"],o={shade:null,color:null,ratio:0};for(let a of n){let i=e?.[a];if(!i||typeof i!="string")continue;let s=this.#d(i,"#ffffff");if(s>o.ratio&&(o={shade:a,color:i,ratio:s}),s>=t)return i}return o.color||e?.["600"]||e?.["500"]}#S(e,t={}){let n={},o=t.light??.1,a=t.dark??.25;return Object.entries(e).forEach(([i,s])=>{if(!s||typeof s!="string"||!s.startsWith("#"))return;let c=this.#p(s)<.5,d=this.#x(s,4.5),p=this.#x(s,3),l=this.#P(d,s,.4),u=d,g=l,f=c?"#ffffff":"#000000",h=c?a:o,m=this.#w(f,h),b=c?"#ffffff":"#000000",w=c?.15:.1,k=this.#w(b,w);n[i]={bg:s,text:d,textSecondary:p,textMuted:l,icon:u,iconSubtle:g,shadow:m,border:k,scheme:c?"dark":"light"}}),n}#$(e,t=.05){let n=this.#a(e),o=Math.min(n.l+(100-n.l)*t,95);return this.#t(n.h,n.s,o)}#i(e){let t={};return Object.entries({50:{source:"900",dimFactor:.8},100:{source:"800",dimFactor:.8},200:{source:"700",dimFactor:.8},300:{source:"600",dimFactor:.8},400:{source:"500",dimFactor:.85},500:{source:"400",dimFactor:.85},600:{source:"300",dimFactor:.85},700:{source:"200",dimFactor:.85},800:{source:"100",dimFactor:.95},900:{source:"50",dimFactor:.95}}).forEach(([o,a])=>{let i=e[a.source];t[o]=this.#j(i,a.dimFactor)}),t}#j(e,t=.8){let n=this.#a(e),o=Math.max(n.s*t,5),a=Math.max(n.l*t,5);return this.#t(n.h,o,a)}generateSpacingTokens(e){let{baseUnit:t=4,scaleRatio:n=1.25,maxSpacingSteps:o=12}=e,a=Number.isFinite(Number(t))?Number(t):4,i=Math.min(Number.isFinite(Number(o))?Number(o):12,12),s={0:"0"};for(let c=1;c<=i;c++)s[c]=`${a*c}px`;return s}#O(e){let{radiusSize:t="medium",customRadius:n=null}=e,o;n!=null?o=n:typeof t=="number"?o=t:typeof t=="string"?o=y.RadiusSizes[t]??y.RadiusSizes.medium:o=y.RadiusSizes.medium;let a=Number.isFinite(Number(o))?Number(o):y.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(a*.25)?Math.round(a*.25):0}px`,sm:`${Number.isFinite(a*.5)?Math.round(a*.5):0}px`,md:`${a}px`,lg:`${Number.isFinite(a*1.5)?Math.round(a*1.5):0}px`,xl:`${Number.isFinite(a*2)?Math.round(a*2):0}px`,full:"9999px"}}#W(e){let{borderWidth:t="medium"}=e,n;typeof t=="number"?n=t:typeof t=="string"?n=y.BorderWidths[t]??y.BorderWidths.medium:n=y.BorderWidths.medium;let o=Number.isFinite(Number(n))?Number(n):y.BorderWidths.medium,a=i=>`${Math.max(1,Math.ceil(i))}px`;return{hairline:a(o*.25),thin:a(o*.5),medium:a(o),thick:a(o*1.5)}}generateTypographyTokens(e){let{fontFamilyHeadings:t="system-ui, -apple-system, sans-serif",fontFamilyBody:n="system-ui, -apple-system, sans-serif",fontFamilyMono:o='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:a=16,fontScale:i=1.25,fontWeightLight:s=y.FontWeights.light,fontWeightNormal:c=y.FontWeights.normal,fontWeightMedium:d=y.FontWeights.medium,fontWeightSemibold:p=y.FontWeights.semibold,fontWeightBold:l=y.FontWeights.bold,lineHeightTight:u=y.LineHeights.tight,lineHeightNormal:g=y.LineHeights.normal,lineHeightRelaxed:f=y.LineHeights.relaxed}=e,h=Number.isFinite(Number(a))?Number(a):16,m=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:t,body:n,mono:o},fontSize:{xs:`${Math.round(h/Math.pow(m,2))}px`,sm:`${Math.round(h/m)}px`,base:`${h}px`,lg:`${Math.round(h*m)}px`,xl:`${Math.round(h*Math.pow(m,2))}px`,"2xl":`${Math.round(h*Math.pow(m,3))}px`,"3xl":`${Math.round(h*Math.pow(m,4))}px`,"4xl":`${Math.round(h*Math.pow(m,5))}px`},fontWeight:{light:s?.toString()||"300",normal:c?.toString()||"400",medium:d?.toString()||"500",semibold:p?.toString()||"600",bold:l?.toString()||"700"},lineHeight:{tight:u?.toString()||"1.25",normal:g?.toString()||"1.5",relaxed:f?.toString()||"1.75"}}}#C(e){let{baseShadowOpacity:t=.1,shadowBlurMultiplier:n=1,shadowOffsetMultiplier:o=1}=e,a=`rgba(0, 0, 0, ${t})`,i=`rgba(0, 0, 0, ${t*.5})`;return{sm:`0 ${1*o}px ${2*n}px 0 ${i}`,base:`0 ${1*o}px ${3*n}px 0 ${a}, 0 ${1*o}px ${2*n}px 0 ${i}`,md:`0 ${4*o}px ${6*n}px ${-1*o}px ${a}, 0 ${2*o}px ${4*n}px ${-1*o}px ${i}`,lg:`0 ${10*o}px ${15*n}px ${-3*o}px ${a}, 0 ${4*o}px ${6*n}px ${-2*o}px ${i}`,xl:`0 ${20*o}px ${25*n}px ${-5*o}px ${a}, 0 ${10*o}px ${10*n}px ${-5*o}px ${i}`,inner:`inset 0 ${2*o}px ${4*n}px 0 ${i}`}}#D(e){let{containerPadding:t=16,breakpoints:n={sm:640,md:768,lg:1024,xl:1280}}=e,o=this.#u(e,"maxWidth"),a=e.maxWidth,i=this.#z(e,{emitFallbacks:!1});return{maxWidth:o?this.#n(a,"1200px"):void 0,maxWidthSm:i.sm,maxWidthMd:i.md,maxWidthLg:i.lg,maxWidthXl:i.xl,minHeight:"100vh",containerPadding:this.#n(t,"16px"),breakpoints:{sm:this.#n(n.sm,"640px"),md:this.#n(n.md,"768px"),lg:this.#n(n.lg,"1024px"),xl:this.#n(n.xl,"1280px")},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#z(e={},t={}){let{emitFallbacks:n=!0}=t,o={sm:640,md:768,lg:1024,xl:1280},{maxWidths:a={},containerPadding:i=16,breakpoints:s=o}=e||{},c=this.#u(e,"maxWidth"),d=["sm","md","lg","xl"].some(m=>this.#u(a,m));if(!n&&!c&&!d)return{sm:void 0,md:void 0,lg:void 0,xl:void 0};let p=e?.maxWidth,l=this.#s(i,16),u=this.#s(p,o.xl),g={sm:this.#s(s.sm,o.sm),md:this.#s(s.md,o.md),lg:this.#s(s.lg,o.lg),xl:this.#s(s.xl,o.xl)},f=m=>m?Math.max(320,m-l*2):u,h={sm:Math.min(u,f(g.sm)),md:Math.min(u,f(g.md)),lg:Math.min(u,f(g.lg)),xl:Math.max(320,u)};return{sm:this.#n(a.sm,`${h.sm}px`),md:this.#n(a.md,`${h.md}px`),lg:this.#n(a.lg,`${h.lg}px`),xl:this.#n(a.xl,`${h.xl}px`)}}#u(e,t){if(!e||typeof e!="object"||!Object.prototype.hasOwnProperty.call(e,t))return!1;let n=e[t];return!(n==null||typeof n=="string"&&n.trim().length===0)}#n(e,t){return typeof e=="number"&&Number.isFinite(e)?`${e}px`:typeof e=="string"&&e.trim().length>0?e:t}#s(e,t){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let n=parseFloat(e);if(Number.isFinite(n))return n}return t}#_(e){let{transitionSpeed:t=y.TransitionSpeeds.normal,animationEasing:n=y.AnimationEasings["ease-out"]}=e,o;return typeof t=="number"?o=t:typeof t=="string"&&y.TransitionSpeeds[t]?o=y.TransitionSpeeds[t]:o=y.TransitionSpeeds.normal,{fast:`${Math.round(o*.6)}ms`,normal:`${o}ms`,slow:`${Math.round(o*1.4)}ms`}}#H(e){let{baseZIndex:t=1e3,zIndexStep:n=10}=e;return{dropdown:t.toString(),sticky:(t+n*2).toString(),fixed:(t+n*3).toString(),modal:(t+n*4).toString(),drawer:(t+n*5).toString(),popover:(t+n*6).toString(),tooltip:(t+n*7).toString(),notification:(t+n*8).toString()}}#U(e){let{set:t="phosphor",weight:n="regular",defaultSize:o=24,sizes:a={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:s="/assets/img/icons/"}=e;return{set:t,weight:n,defaultSize:`${o}px`,sizes:Object.fromEntries(Object.entries(a).map(([c,d])=>[c,`${d}px`])),spritePath:i,externalPath:s}}#q(e){let t=[];t.push(`  /* Colors */
`);let n=(o,a="")=>{Object.entries(o).forEach(([i,s])=>{typeof s=="object"&&s!==null?n(s,`${a}${i}-`):typeof s=="string"&&t.push(`  --color-${a}${i}: ${s};
`)})};return Object.entries(e).forEach(([o,a])=>{o!=="dark"&&o!=="surfaceSmart"&&o!=="interactive"&&typeof a=="object"&&a!==null&&n(a,`${o}-`)}),e.surfaceSmart&&(t.push(`  /* Smart Surface Tokens (context-aware) */
`),Object.entries(e.surfaceSmart).forEach(([o,a])=>{t.push(`  --surface-${o}-bg: ${a.bg};
`),t.push(`  --surface-${o}-text: ${a.text};
`),t.push(`  --surface-${o}-text-secondary: ${a.textSecondary};
`),t.push(`  --surface-${o}-text-muted: ${a.textMuted};
`),t.push(`  --surface-${o}-icon: ${a.icon};
`),t.push(`  --surface-${o}-icon-subtle: ${a.iconSubtle};
`),t.push(`  --surface-${o}-shadow: ${a.shadow};
`),t.push(`  --surface-${o}-border: ${a.border};
`)}),t.push(`
`)),t.push(`  /* Semantic Text Colors */
`),t.push(`  --color-text-primary: var(--color-gray-900);
`),t.push(`  --color-text-secondary: var(--color-gray-600);
`),t.push(`  --color-text-muted: var(--color-gray-600);
`),t.push(`  --color-border: var(--color-gray-300);
`),t.push(`  --color-input-bg: var(--color-surface-base);
`),t.push(`  --color-input-disabled-bg: var(--color-gray-50);
`),t.push(`  --color-input-disabled-text: var(--color-gray-500);
`),t.push(`  --color-code-bg: var(--color-gray-100);
`),e.interactive&&e.interactive.light&&(t.push(`  /* Interactive Colors - optimized for specific use cases */
`),t.push(`  --color-primary-fill: ${e.interactive.light.fill}; /* For button backgrounds with white text */
`),t.push(`  --color-primary-text: ${e.interactive.light.text}; /* For links and outline buttons on light surfaces */
`)),t.push(`  /* Translucent Surface Tokens */
`),t.push(`  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);
`),t.push(`  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
`),t.push(`  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);
`),t.push(`   /* Backdrop tokens - used for modal dialogs, drawers, overlays */

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
    `),t.push(this.#G(e)),`${t.join("")}
`}#G(e){let t=e.primary?.[500]||"#3b82f6",n=e.secondary?.[500]||"#8b5cf6",o=e.accent?.[500]||"#f59e0b";return`
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${t} 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${n} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${t} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${n} 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${t} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${n} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${o} 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${t} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${n} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${t} 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${n} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${t} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${t} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${o} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${n} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${o} 15%, transparent) 0px, transparent 50%);
    `}#V(e){let t=[`  /* Spacing */
`];return Object.entries(e).forEach(([n,o])=>{n!=null&&n!=="NaN"&&o!==void 0&&!o.includes("NaN")&&t.push(`  --spacing-${n}: ${o};
`)}),`${t.join("")}
`}#J(e){let t=[`  /* Border Radius */
`];return Object.entries(e).forEach(([n,o])=>{t.push(`  --radius-${n}: ${o};
`)}),`${t.join("")}
`}#Y(e){let t=[`  /* Border Widths */
`];return Object.entries(e).forEach(([n,o])=>{t.push(`  --border-width-${n}: ${o};
`)}),`${t.join("")}
`}#Q(e){let t=[`  /* Typography */
`];return Object.entries(e).forEach(([n,o])=>{let a=n.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(o).forEach(([i,s])=>{let c=i.replace(/([A-Z])/g,"-$1").toLowerCase();t.push(`  --font-${a}-${c}: ${s};
`)})}),`${t.join("")}
`}#g(e){let t=[`  /* Shadows */
`];return Object.entries(e).forEach(([n,o])=>{t.push(`  --shadow-${n}: ${o};
`)}),`${t.join("")}
`}#Z(e){let t=[`  /* Layout */
`];return Object.entries(e).forEach(([n,o])=>{let a=n.replace(/([A-Z])/g,"-$1").toLowerCase();o!=null&&n!=="breakpoints"&&t.push(`  --layout-${a}: ${o};
`)}),`${t.join("")}
`}#K(e){let t=[`  /* Transitions */
`];return Object.entries(e).forEach(([n,o])=>{t.push(`  --transition-${n}: ${o};
`)}),`${t.join("")}
`}#X(e){let t=[`  /* Z-Index */
`];return Object.entries(e).forEach(([n,o])=>{t.push(`  --z-${n}: ${o};
`)}),`${t.join("")}
`}#ee(e){let t=[`  /* Icon System */
`];return t.push(`  --icon-set: ${e.set};
`),t.push(`  --icon-weight: ${e.weight};
`),t.push(`  --icon-size: ${e.defaultSize};
`),Object.entries(e.sizes).forEach(([n,o])=>{t.push(`  --icon-size-${n}: ${o};
`)}),`${t.join("")}
`}#te(e,t){if(!e?.dark)return"";let n=[],o=(l,u="")=>{Object.entries(l).forEach(([g,f])=>{typeof f=="object"&&f!==null?o(f,`${u}${g}-`):typeof f=="string"&&n.push(`  --color-${u}${g}: ${f};
`)})};Object.entries(e.dark).forEach(([l,u])=>{l!=="surfaceSmart"&&typeof u=="object"&&u!==null&&o(u,`${l}-`)});let a=[];e.dark.surfaceSmart&&(a.push(`  /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(e.dark.surfaceSmart).forEach(([l,u])=>{a.push(`  --surface-${l}-bg: ${u.bg};
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
`,c=this.#oe(e),d=t?[this.#g(t)]:[];return`html[data-theme="dark"] {
${[...n,...a,...d,i,s,c].join("")}}
`}#re(e,t){if(!e?.dark)return"";let n=[],o=(u,g="")=>{Object.entries(u).forEach(([f,h])=>{typeof h=="object"&&h!==null?o(h,`${g}${f}-`):typeof h=="string"&&n.push(`    --color-${g}${f}: ${h};
`)})};Object.entries(e.dark).forEach(([u,g])=>{u!=="surfaceSmart"&&typeof g=="object"&&g!==null&&o(g,`${u}-`)});let a=[];e.dark.surfaceSmart&&(a.push(`    /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(e.dark.surfaceSmart).forEach(([u,g])=>{a.push(`    --surface-${u}-bg: ${g.bg};
`),a.push(`    --surface-${u}-text: ${g.text};
`),a.push(`    --surface-${u}-text-secondary: ${g.textSecondary};
`),a.push(`    --surface-${u}-text-muted: ${g.textMuted};
`),a.push(`    --surface-${u}-icon: ${g.icon};
`),a.push(`    --surface-${u}-icon-subtle: ${g.iconSubtle};
`),a.push(`    --surface-${u}-shadow: ${g.shadow};
`),a.push(`    --surface-${u}-border: ${g.border};
`)}),a.push(`
`));let i=[];e.interactive&&e.interactive.dark&&(i.push(`    /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`    --color-primary-fill: ${e.interactive.dark.fill}; /* For button backgrounds with white text */
`),i.push(`    --color-primary-text: ${e.interactive.dark.text}; /* For links and outline buttons on dark surfaces */
`));let s=[`    --color-text-primary: var(--color-gray-100);
`,`    --color-text-secondary: var(--color-gray-300);
`,`    --color-text-muted: var(--color-gray-600);
`,`    --color-border: var(--color-gray-700);
`,`    --color-input-bg: var(--color-gray-800);
`,`    --color-input-disabled-bg: var(--color-gray-900);
`,`    --color-input-disabled-text: var(--color-gray-600);
`,`    --color-code-bg: var(--color-gray-800);
`,...i].join(""),c=`    /* Backdrop tokens - dark mode */
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
`,d=this.#ne(e),p=t?[this.#g(t)]:[];return`
       html[data-theme="dark"] {
${[...n,...a,...p,s,c,d].join("")}       }
`}#ne(e){let t=e.dark||e,n=t.primary?.[400]||"#60a5fa",o=t.secondary?.[400]||"#a78bfa",a=t.accent?.[400]||"#fbbf24";return`    /* Mesh Gradient Variables (Dark Mode) */
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
      `}#oe(e){let t=e.dark||e,n=t.primary?.[400]||"#60a5fa",o=t.secondary?.[400]||"#a78bfa",a=t.accent?.[400]||"#fbbf24";return`
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
}`}#ie(){try{let e=this.options?.design?.options?.backgroundMesh;this.options.debug&&this.options.log?.("debug","backgroundMesh check:",e);let t=Number(e);return!Number.isFinite(t)||t===0?"":`/* Optional background mesh applied from config */
body {
  background: var(--background-mesh-0${Math.max(1,Math.min(5,Math.floor(t)))});
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

`}#ce(){let{layout:e={}}=this.options.design,t=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Semantic HTML Elements (low-specificity via :where()) */

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

`}#de(){let{shape:e={},spatialRhythm:t={},inputPadding:n,buttonPadding:o,focusRingWidth:a,focusRingOpacity:i,borderWidthThin:s,sectionSpacing:c,buttonMinHeight:d,inputMinHeight:p}=this.options.design,l=typeof e.borderWidth=="number"?e.borderWidth:typeof e.borderWidth=="string"?y.BorderWidths[e.borderWidth]??null:null,u=t.inputPadding??n??.75,g=t.buttonPadding??o??1,f=a||3,h=s||l||y.BorderWidths.thin,m=t.sectionSpacing??c??2,b=d||30;return`/* Mobile-First Form Styles - Generated from Design Config */
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
      box-shadow: 0 0 0 ${f}px color-mix(in oklab, var(--color-danger-500) ${Math.round((i||.3)*100)}%, transparent);
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

label:has(input[type="checkbox"]):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"] + label:not(fieldset label):not(label[data-toggle]) {
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
}

label:has(input[type="checkbox"]:checked):not(fieldset label):not(label[data-toggle]),
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

label:has(input[type="checkbox"]:focus):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:focus + label:not(fieldset label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 ${f}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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

    &:has([disabled]){
      pointer-events: none;
    }
  }
  
  label:has(input[type="radio"]:checked),
  label:has(input[type="checkbox"]:checked) {
    background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
    border-color: var(--color-primary-500);
    border-width: var(--border-width-medium);
    font-weight: var(--font-weight-semibold);
    
    &:hover {
      background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
      border-color: var(--color-primary-600);
    }
  }
  
  label:has(input[type="radio"]:focus),
  label:has(input[type="checkbox"]:focus) {
    outline: none;
    box-shadow: 0 0 0 ${f}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${f}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
  display: inline-flex;
  gap: var(--spacing-1);
  align-items: center;
  justify-content: center;
  min-height: ${b}px;
  padding: calc(var(--spacing-1) * ${g}) var(--spacing-6);
  border: var(--border-width-medium) solid transparent;
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
    box-shadow: 0 0 0 ${f}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${f}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
  min-height: calc(${b}px * 0.8);
}

.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  min-height: calc(${b}px * 0.6);
}


.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  min-height: calc(${b}px * 1.2);
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

`}#pe(){let{layout:e={}}=this.options.design,t=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Table Styles - Mobile First */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 var(--spacing-6) 0;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-size-sm);
  
  @media (min-width: ${t.sm}px) {
    font-size: var(--font-size-base);
  }
}

.table-responsive {
  @media (max-width: ${t.sm-1}px) {
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
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  line-height: var(--font-line-height-relaxed);
  background-color: red;
  
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
  border-radius: inherit;
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

`}#fe(){let{layout:e={},behavior:t={}}=this.options.design;return`/* ============================================================================
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
  dialog.dialog-no-scale-animation,
  dialog.dialog-no-scale-animation[open] {
    left: 0 !important;
    top: 0 !important;
  }

  dialog.dialog-no-scale-animation,
  dialog.dialog-no-scale-animation[open] {
    transform: none !important;
  }

  dialog[open] {
    left: 0 !important;
    top: 0 !important;
  }

  dialog { 
    max-width: 100vw; 
    width: 100vw;
    height: 100dvh;
    max-height: 100dvh; 
    --dialog-max-height: 100dvh; /* Override custom maxHeight on mobile */
    border-radius: 0; 
    margin: 0;
    transform: scale(0.98);
  }
  dialog[open] {
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

`}#ye(){let{layout:e={}}=this.options.design,t=e.buttonMinHeight||30;return`/* Icon System */

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
button, a {
  pds-icon {
    flex-shrink: 0;
  }

  &.icon-only {
    padding: var(--spacing-2);
    min-width: ${t}px;
    width: ${t}px;
    height: ${t}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &.btn-sm.icon-only {
    min-width: calc(${t}px * 0.8);
    width: calc(${t}px * 0.8);
    height: calc(${t}px * 0.8);
  }

  &.btn-xs.icon-only {
    min-width: calc(${t}px * 0.6);
    width: calc(${t}px * 0.6);
    height: calc(${t}px * 0.6);
  }

  &.btn-lg.icon-only {
    min-width: calc(${t}px * 1.2);
    width: calc(${t}px * 1.2);
    height: calc(${t}px * 1.2);
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
`}#xe(){let{layout:e={}}=this.options.design,t=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280},n=e.gridSystem||{},o=n.columns||[1,2,3,4,6],a=n.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=this.#z(e),s=[`
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

`];for(let c of o)s.push(`.grid-cols-${c} { grid-template-columns: repeat(${c}, 1fr); }
`);s.push(`
/* Auto-fit grids (responsive) */
`);for(let[c,d]of Object.entries(a))s.push(`.grid-auto-${c} { grid-template-columns: repeat(auto-fit, minmax(${d}, 1fr)); }
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
@media (max-width: ${t.md-1}px) {
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

`}#ke(){let{layout:e={},a11y:t={}}=this.options.design,n=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280},o=t.minTouchTarget||y.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

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
@media (hover: none) and (pointer: coarse) {
  /* Touch devices - larger touch targets for interactive elements */
  button:not(.icon-only), a:not(.icon-only), select, textarea,
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

`}#a(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,a=Math.max(t,n,o),i=Math.min(t,n,o),s,c,d=(a+i)/2;if(a===i)s=c=0;else{let p=a-i;switch(c=d>.5?p/(2-a-i):p/(a+i),a){case t:s=(n-o)/p+(n<o?6:0);break;case n:s=(o-t)/p+2;break;case o:s=(t-n)/p+4;break}s/=6}return{h:s*360,s:c*100,l:d*100}}#t(e,t,n){e=e/360,t=t/100,n=n/100;let o=(d,p,l)=>(l<0&&(l+=1),l>1&&(l-=1),l<1/6?d+(p-d)*6*l:l<1/2?p:l<2/3?d+(p-d)*(2/3-l)*6:d),a,i,s;if(t===0)a=i=s=n;else{let d=n<.5?n*(1+t):n+t-n*t,p=2*n-d;a=o(p,d,e+1/3),i=o(p,d,e),s=o(p,d,e-1/3)}let c=d=>{let p=Math.round(d*255).toString(16);return p.length===1?"0"+p:p};return`#${c(a)}${c(i)}${c(s)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#Se(){this.#e={tokens:this.#$e(),primitives:this.#Ce(),components:this.#ze(),utilities:this.#Me()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#$e(){let{colors:e,spacing:t,radius:n,borderWidths:o,typography:a,shadows:i,darkShadows:s,layout:c,transitions:d,zIndex:p,icons:l}=this.tokens,u=[`@layer tokens {
       :root {
          ${this.#q(e)}
          ${this.#V(t)}
          ${this.#J(n)}
          ${this.#Y(o)}
          ${this.#Q(a)}
          ${this.#g(i)}
          ${this.#Z(c)}
          ${this.#K(d)}
          ${this.#X(p)}
          ${this.#ee(l)}
       }
       ${this.#re(e,s)}
    }`];return u.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),u.push(this.#te(e,s)),u.join("")}#Ce(){let{advanced:e={},a11y:t={},layout:n={}}=this.options.design,o=e.tabSize||y.TabSizes.standard,a=t.minTouchTarget||y.TouchTargetSizes.standard,i=n.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
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
    border: var(--border-width-medium) solid var(--color-border);
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

`}#ze(){return`@layer components {

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
`}#Me(){return`@layer utilities {

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


${this.#we()}

${this.#ke()}

}
`}#Te(){this.#o={tokens:new CSSStyleSheet,primitives:new CSSStyleSheet,components:new CSSStyleSheet,utilities:new CSSStyleSheet},this.#Ee()}#Ee(){this.#o.tokens.replaceSync(this.#e.tokens),this.#o.primitives.replaceSync(this.#e.primitives),this.#o.components.replaceSync(this.#e.components),this.#o.utilities.replaceSync(this.#e.utilities)}get tokensCSS(){return this.#e?.tokens||""}get primitivesCSS(){return this.#e?.primitives||""}get componentsCSS(){return this.#e?.components||""}get utilitiesCSS(){return this.#e?.utilities||""}get layeredCSS(){return this.#e?`${this.#e.tokens}
${this.#e.primitives}
${this.#e.components}
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof _<"u"?_:null,enums:typeof y<"u"?y:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let e=[],t=this.tokens.colors;for(let[n,o]of Object.entries(t))typeof o=="object"&&o!==null&&e.push({name:n,scale:o});return e},getColorScale:e=>this.tokens.colors[e]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([e,t])=>({key:e,value:t})),getTypography:()=>this.tokens.typography,getLayerCSS:e=>{let t=["tokens","primitives","components","utilities"];if(!t.includes(e))throw new Error(`Invalid layer: ${e}. Must be one of ${t.join(", ")}`);return this.#e?.[e]||""},usesEnumValue:(e,t)=>{let n=this.options.design||{};return JSON.stringify(n).includes(t)}}}}get tokensStylesheet(){return this.#o?.tokens}get primitivesStylesheet(){return this.#o?.primitives}get componentsStylesheet(){return this.#o?.components}get utilitiesStylesheet(){return this.#o?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#l("tokens",this.#e.tokens),"pds-primitives.css.js":this.#l("primitives",this.#e.primitives),"pds-components.css.js":this.#l("components",this.#e.components),"pds-utilities.css.js":this.#l("utilities",this.#e.utilities),"pds-styles.css.js":this.#l("styles",this.layeredCSS)}}#l(e,t){let n=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${e}
// Auto-generated - do not edit directly

export const ${e} = new CSSStyleSheet();
${e}.replaceSync(\`${n}\`);

export const ${e}CSS = \`${n}\`;
`}};function Bt(r={},e={}){let t=Number(e.minContrast||4.5),n=Number(e.minMutedContrast||3),o=!!e.extendedChecks,a=d=>{let p=String(d||"").replace("#",""),l=p.length===3?p.split("").map(g=>g+g).join(""):p,u=parseInt(l||"0",16);return{r:u>>16&255,g:u>>8&255,b:u&255}},i=d=>{let{r:p,g:l,b:u}=a(d),g=[p/255,l/255,u/255].map(f=>f<=.03928?f/12.92:Math.pow((f+.055)/1.055,2.4));return .2126*g[0]+.7152*g[1]+.0722*g[2]},s=(d,p)=>{if(!d||!p)return 0;let l=i(d),u=i(p),g=Math.max(l,u),f=Math.min(l,u);return(g+.05)/(f+.05)},c=[];try{let p=new G({design:structuredClone(r)}).tokens.colors,l={surfaceBg:p.surface?.base,surfaceText:p.gray?.[900]||"#000000",surfaceTextSecondary:p.gray?.[700]||p.gray?.[800]||p.gray?.[900],surfaceTextMuted:p.gray?.[500]||p.gray?.[600]||p.gray?.[700],surfaceElevated:p.surface?.elevated||p.surface?.base,primaryFill:p.interactive?.light?.fill||p.primary?.[600],primaryText:p.interactive?.light?.text||p.primary?.[600],accentFill:p.accent?.[600]||p.accent?.[500],successFill:p.success?.[600]||p.success?.[500],warningFill:p.warning?.[600]||p.warning?.[500],dangerFill:p.danger?.[600]||p.danger?.[500],infoFill:p.info?.[600]||p.info?.[500]},u=b=>Math.max(s(b,"#ffffff"),s(b,"#000000")),g=s(l.primaryFill,"#ffffff");g<t&&c.push({path:"/colors/primary",message:`Primary button contrast too low in light theme (${g.toFixed(2)} < ${t}). Choose a darker primary.`,ratio:g,min:t,context:"light/btn-primary"});let f=s(l.surfaceBg,l.surfaceText);if(f<t&&c.push({path:"/colors/background",message:`Base text contrast on surface (light) is too low (${f.toFixed(2)} < ${t}). Adjust background or secondary (gray).`,ratio:f,min:t,context:"light/surface-text"}),o){let b=s(l.surfaceBg,l.surfaceTextSecondary);b<t&&c.push({path:"/colors/secondary",message:`Secondary text contrast on base surface (light) is too low (${b.toFixed(2)} < ${t}).`,ratio:b,min:t,context:"light/surface-text-secondary"});let w=s(l.surfaceBg,l.surfaceTextMuted);w<n&&c.push({path:"/colors/secondary",message:`Muted text contrast on base surface (light) is too low (${w.toFixed(2)} < ${n}).`,ratio:w,min:n,context:"light/surface-text-muted"});let k=s(l.surfaceElevated,l.surfaceText);k<t&&c.push({path:"/colors/background",message:`Elevated surface text contrast (light) is too low (${k.toFixed(2)} < ${t}).`,ratio:k,min:t,context:"light/surface-elevated-text"})}let h=s(l.primaryText,l.surfaceBg);h<t&&c.push({path:"/colors/primary",message:`Primary text on surface is too low for outline/link styles (light) (${h.toFixed(2)} < ${t}). Choose a darker primary or lighter surface.`,ratio:h,min:t,context:"light/outline"}),o&&[{path:"/colors/accent",key:"accent",value:l.accentFill},{path:"/colors/success",key:"success",value:l.successFill},{path:"/colors/warning",key:"warning",value:l.warningFill},{path:"/colors/danger",key:"danger",value:l.dangerFill},{path:"/colors/info",key:"info",value:l.infoFill}].forEach(w=>{if(!w?.value)return;let k=u(w.value);k<t&&c.push({path:w.path,message:`${w.key} fill color cannot achieve accessible text contrast (${k.toFixed(2)} < ${t}) with either white or black text.`,ratio:k,min:t,context:`light/${w.key}-fill`})});let m=p.dark;if(m){let b={surfaceBg:m.surface?.base||p.surface?.inverse,surfaceText:m.gray?.[50]||m.gray?.[100]||"#ffffff",surfaceTextMuted:m.gray?.[300]||m.gray?.[400]||m.gray?.[500],primaryFill:p.interactive?.dark?.fill||m.primary?.[600],primaryText:p.interactive?.dark?.text||m.primary?.[600]},w=s(b.primaryFill,"#ffffff");w<t&&c.push({path:"/colors/darkMode/primary",message:`Primary button contrast too low in dark theme (${w.toFixed(2)} < ${t}). Override darkMode.primary or pick a brighter hue.`,ratio:w,min:t,context:"dark/btn-primary"});let k=s(b.primaryText,b.surfaceBg);if(k<t&&c.push({path:"/colors/darkMode/primary",message:`Primary text on surface is too low for outline/link styles (dark) (${k.toFixed(2)} < ${t}). Override darkMode.primary/background.`,ratio:k,min:t,context:"dark/outline"}),o){let C=s(b.surfaceBg,b.surfaceText);C<t&&c.push({path:"/colors/darkMode/background",message:`Base text contrast on surface (dark) is too low (${C.toFixed(2)} < ${t}).`,ratio:C,min:t,context:"dark/surface-text"});let F=s(b.surfaceBg,b.surfaceTextMuted);F<n&&c.push({path:"/colors/darkMode/secondary",message:`Muted text contrast on surface (dark) is too low (${F.toFixed(2)} < ${n}).`,ratio:F,min:n,context:"dark/surface-text-muted"})}}}catch(d){c.push({path:"/",message:`Validation failed: ${String(d?.message||d)}`,ratio:0,min:0})}return{ok:c.length===0,issues:c}}var rt=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(e={}){this._mode="static",this._staticPaths={...this._staticPaths,...e}}async getStylesheet(e){if(this._mode==="live")return null;try{return(await import(this._staticPaths[e]))[e]}catch(t){console.error(`[PDS Registry] Failed to load static ${e}:`,t),console.error(`[PDS Registry] Looking for: ${this._staticPaths[e]}`),console.error("[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");let n=new CSSStyleSheet;return n.replaceSync("/* Failed to load "+e+" */"),n}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},nt=new rt;function Jr(r){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let n=new CSSStyleSheet;n.replaceSync(r),n._pds=!0;let o=(document.adoptedStyleSheets||[]).filter(a=>a._pds!==!0);document.adoptedStyleSheets=[...o,n];return}let e="pds-runtime-stylesheet",t=document.getElementById(e);if(!t){t=document.createElement("style"),t.id=e,t.type="text/css";let n=document.head||document.getElementsByTagName("head")[0];n?n.appendChild(t):document.documentElement.appendChild(t)}t.textContent=r}catch(e){console.warn("installRuntimeStyles failed:",e)}}function jt(r){let e=r;if(!e||typeof e!="object"){console.error("[Runtime] applyStyles requires an explicit generator instance in live mode");return}let t=e.layeredCSS||e.css||"";if(!t){e.options?.log?.("warn","[Runtime] No CSS available on generator to apply");return}Jr(t)}async function Ot(r,e=[],t=null){try{let n=t?.primitivesStylesheet?t.primitivesStylesheet:await nt.getStylesheet("primitives");r.adoptedStyleSheets=[n,...e]}catch(n){let o=r.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${o}> failed to adopt primitives:`,n),r.adoptedStyleSheets=e}}async function Wt(r,e=["primitives"],t=[],n=null){try{let a=(await Promise.all(e.map(async i=>{if(n)switch(i){case"tokens":return n.tokensStylesheet;case"primitives":return n.primitivesStylesheet;case"components":return n.componentsStylesheet;case"utilities":return n.utilitiesStylesheet;default:break}return nt.getStylesheet(i)}))).filter(i=>i!==null);r.adoptedStyleSheets=[...a,...t]}catch(o){let a=r.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${a}> failed to adopt layers:`,o),r.adoptedStyleSheets=t}}var Yr=[{selector:".accordion"},{selector:"nav[data-dropdown]"},{selector:"label[data-toggle]"},{selector:"label[data-color]"},{selector:'input[type="range"]'},{selector:"form[data-required]"},{selector:"fieldset[role=group][data-open]"},{selector:"[data-clip]"},{selector:"button, a[class*='btn-']"}];function Qr(r){r.dataset.enhancedAccordion||(r.dataset.enhancedAccordion="true",r.addEventListener("toggle",e=>{e.target.open&&e.target.parentElement===r&&r.querySelectorAll(":scope > details[open]").forEach(t=>{t!==e.target&&(t.open=!1)})},!0))}function Zr(r){if(r.dataset.enhancedDropdown)return;r.dataset.enhancedDropdown="true";let e=r.lastElementChild;if(!e)return;let t=r.querySelector("[data-dropdown-toggle]")||r.querySelector("button");t&&!t.hasAttribute("type")&&t.setAttribute("type","button"),e.id||(e.id=`dropdown-${Math.random().toString(36).slice(2,9)}`);let n=e.tagName?.toLowerCase()==="menu",o=8;n&&!e.hasAttribute("role")&&e.setAttribute("role","menu"),e.hasAttribute("aria-hidden")||e.setAttribute("aria-hidden","true"),t&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-controls",e.id),t.setAttribute("aria-expanded","false"));let a=()=>{let S=e.getAttribute("style");e.style.visibility="hidden",e.style.display="inline-block",e.style.pointerEvents="none";let A=e.getBoundingClientRect(),R=Math.max(e.offsetWidth||0,e.scrollWidth||0,A.width||0,1),M=Math.max(e.offsetHeight||0,e.scrollHeight||0,A.height||0,1);return S===null?e.removeAttribute("style"):e.setAttribute("style",S),{width:R,height:M}},i=()=>{let S=(r.getAttribute("data-direction")||r.getAttribute("data-dropdown-direction")||r.getAttribute("data-mode")||"auto").toLowerCase();if(S==="up"||S==="down")return S;let A=(t||r).getBoundingClientRect(),{height:R}=a(),M=Math.max(0,window.innerHeight-A.bottom),E=Math.max(0,A.top),N=M>=R,$=E>=R;return N&&!$?"down":$&&!N?"up":N&&$?"down":E>M?"up":"down"},s=()=>{let S=(r.getAttribute("data-align")||r.getAttribute("data-dropdown-align")||"auto").toLowerCase();if(S==="left"||S==="right"||S==="start"||S==="end")return S==="start"?"left":S==="end"?"right":S;let A=(t||r).getBoundingClientRect(),{width:R}=a(),M=Math.max(0,window.innerWidth-A.left),E=Math.max(0,A.right),N=M>=R,$=E>=R;return N&&!$?"left":$&&!N?"right":N&&$?"left":E>M?"right":"left"},c=(S,A=8)=>{let R=getComputedStyle(r).getPropertyValue(S).trim();if(!R)return A;let M=document.createElement("span");M.style.position="fixed",M.style.visibility="hidden",M.style.pointerEvents="none",M.style.height=R,document.body.appendChild(M);let E=Number.parseFloat(getComputedStyle(M).height);return M.remove(),Number.isFinite(E)?E:A},d=()=>{e.style.removeProperty("position"),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("right"),e.style.removeProperty("bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("max-width"),e.style.removeProperty("max-inline-size"),e.style.removeProperty("max-height"),e.style.removeProperty("overflow")},p=()=>{e.getAttribute("aria-hidden")==="false"&&(d(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{l()})}))},l=()=>{if(e.getAttribute("aria-hidden")!=="false")return;let S=(t||r).getBoundingClientRect(),A=window.visualViewport,R=A?.width||document.documentElement?.clientWidth||window.innerWidth,M=A?.height||document.documentElement?.clientHeight||window.innerHeight,E=A?.offsetLeft||0,N=A?.offsetTop||0,$=Math.max(1,R-o*2),v=Math.max(1,M-o*2);e.style.maxWidth=`${Math.round($)}px`,e.style.maxInlineSize=`${Math.round($)}px`,e.style.maxHeight=`${Math.round(v)}px`,e.style.overflow="auto";let{width:x,height:z}=a(),T=c("--spacing-2",8),B=i(),W=s();r.dataset.dropdownDirection=B,r.dataset.dropdownAlign=W;let U=W==="right"?S.right-x:S.left;x>=$-1?U=E+o:U=Math.max(E+o,Math.min(U,E+R-x-o));let P=B==="up"?S.top-T-z:S.bottom+T;P=Math.max(N+o,Math.min(P,N+M-z-o)),e.style.position="fixed",e.style.left=`${Math.round(U)}px`,e.style.top=`${Math.round(P)}px`,e.style.right="auto",e.style.bottom="auto",e.style.marginTop="0",e.style.marginBottom="0"},u=null,g=()=>{u||(u=()=>l(),window.addEventListener("resize",u),window.addEventListener("scroll",u,!0))},f=()=>{u&&(window.removeEventListener("resize",u),window.removeEventListener("scroll",u,!0),u=null)},h=null,m=()=>{h||typeof document>"u"||(h=()=>{e.getAttribute("aria-hidden")==="false"&&(r.dataset.dropdownDirection=i(),r.dataset.dropdownAlign=s(),p(),setTimeout(()=>{e.getAttribute("aria-hidden")==="false"&&p()},50),setTimeout(()=>{e.getAttribute("aria-hidden")==="false"&&p()},150))},document.addEventListener("pds:config-changed",h))},b=()=>{!h||typeof document>"u"||(document.removeEventListener("pds:config-changed",h),h=null)},w=null,k=()=>{r.dataset.dropdownDirection=i(),r.dataset.dropdownAlign=s(),e.setAttribute("aria-hidden","false"),t?.setAttribute("aria-expanded","true"),g(),m(),p(),w||(w=S=>{(S.composedPath?S.composedPath():[S.target]).some(M=>M===r)||C()},setTimeout(()=>{document.addEventListener("click",w)},0))},C=()=>{e.setAttribute("aria-hidden","true"),t?.setAttribute("aria-expanded","false"),f(),b(),d(),w&&(document.removeEventListener("click",w),w=null)},F=()=>{e.getAttribute("aria-hidden")==="false"?C():k()};t?.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation(),F()}),r.addEventListener("keydown",S=>{S.key==="Escape"&&(C(),t?.focus())}),r.addEventListener("focusout",S=>{S.relatedTarget&&((S.composedPath?S.composedPath():[S.relatedTarget]).some(M=>M===r)||C())})}function Kr(r){if(r.dataset.enhancedToggle)return;r.dataset.enhancedToggle="true";let e=r.querySelector('input[type="checkbox"]');if(!e)return;r.hasAttribute("tabindex")||r.setAttribute("tabindex","0"),r.setAttribute("role","switch"),r.setAttribute("aria-checked",e.checked?"true":"false");let t=document.createElement("span");t.className="toggle-switch",t.setAttribute("role","presentation"),t.setAttribute("aria-hidden","true");let n=document.createElement("span");n.className="toggle-knob",t.appendChild(n),r.insertBefore(t,e.nextSibling);let o=()=>{r.setAttribute("aria-checked",e.checked?"true":"false")},a=()=>{e.disabled||(e.checked=!e.checked,o(),e.dispatchEvent(new Event("change",{bubbles:!0})))};r.addEventListener("click",i=>{i.preventDefault(),a()}),r.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),a())}),e.addEventListener("change",o)}function Xr(r){if(r.dataset.enhancedColorInput)return;let e=r.querySelector('input[type="color"]');if(!e)return;r.dataset.enhancedColorInput="true";let t=r.querySelector(":scope > .color-control"),n=r.querySelector(":scope > .color-control > .color-swatch"),o=r.querySelector(":scope > .color-control > output");t||(t=document.createElement("span"),t.className="color-control",e.before(t)),n||(n=document.createElement("span"),n.className="color-swatch",t.appendChild(n)),e.parentElement!==n&&n.appendChild(e),o||(o=document.createElement("output"),t.appendChild(o));let a=()=>{if(e.dataset.colorUnset==="1"){o.value="",o.textContent="not set",t.dataset.value="",t.dataset.unset="1",n.dataset.unset="1";return}o.value=e.value,o.textContent=e.value,t.dataset.value=e.value,delete t.dataset.unset,delete n.dataset.unset};a();let i=()=>{e.dataset.colorUnset==="1"&&(e.dataset.colorUnset="0"),a()};e.addEventListener("input",i,{passive:!0}),e.addEventListener("change",i,{passive:!0})}function en(r){if(r.dataset.enhancedRange)return;let e=i=>{if(r.dataset.enhancedRangeProgrammatic)return;r.dataset.enhancedRangeProgrammatic="1";let s=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(r),"value")||Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");s?.get&&s?.set&&Object.defineProperty(r,"value",{configurable:!0,enumerable:s.enumerable,get(){return s.get.call(this)},set(d){s.set.call(this,d),i()}}),new MutationObserver(d=>{d.some(l=>{let u=l.attributeName;return u==="value"||u==="min"||u==="max"})&&i()}).observe(r,{attributes:!0,attributeFilter:["value","min","max"]})},t=r.closest("label"),n=t?.classList.contains("range-output"),o=r.id||`range-${Math.random().toString(36).substring(2,11)}`,a=`${o}-output`;if(r.id=o,n){let i=t.querySelector("span");if(i&&!i.classList.contains("range-output-wrapper")){let s=document.createElement("span");s.className="range-output-wrapper",s.style.display="flex",s.style.justifyContent="space-between",s.style.alignItems="center";let c=document.createElement("span");c.textContent=i.textContent,s.appendChild(c);let d=document.createElement("output");d.id=a,d.setAttribute("for",o),d.style.color="var(--surface-text-secondary, var(--color-text-secondary))",d.style.fontSize="0.875rem",d.textContent=r.value,s.appendChild(d),i.textContent="",i.appendChild(s);let p=()=>{d.textContent=r.value};r.addEventListener("input",p),r.addEventListener("change",p),e(p),p()}}else{let i=r.closest(".range-container");i||(i=document.createElement("div"),i.className="range-container",r.parentNode?.insertBefore(i,r),i.appendChild(r)),i.style.position="relative";let s=document.createElement("output");s.id=a,s.setAttribute("for",o),s.className="range-bubble",s.setAttribute("aria-live","polite"),i.appendChild(s);let c=()=>{let l=parseFloat(r.min)||0,u=parseFloat(r.max)||100,g=parseFloat(r.value),f=(g-l)/(u-l);s.style.left=`calc(${f*100}% )`,s.textContent=String(g)},d=()=>s.classList.add("visible"),p=()=>s.classList.remove("visible");r.addEventListener("input",c),r.addEventListener("pointerdown",d),r.addEventListener("pointerup",p),r.addEventListener("pointerleave",p),r.addEventListener("focus",d),r.addEventListener("blur",p),r.addEventListener("change",c),e(c),c()}r.dataset.enhancedRange="1"}function tn(r){if(r.dataset.enhancedRequired)return;r.dataset.enhancedRequired="true";let e=t=>{let n;if(t.closest("[role$=group]")?n=t.closest("[role$=group]").querySelector("legend"):n=t.closest("label"),!n||n.querySelector(".required-asterisk"))return;let o=document.createElement("span");o.classList.add("required-asterisk"),o.textContent="*",o.style.marginLeft="4px";let a=n.querySelector("span, [data-label]");if(a)a.appendChild(o);else{let s=n.querySelector("input, select, textarea");s?n.insertBefore(o,s):n.appendChild(o)}let i=t.closest("form");if(i&&!i.querySelector(".required-legend")){let s=document.createElement("small");s.classList.add("required-legend"),s.textContent="* Required fields",i.insertBefore(s,i.querySelector(".form-actions")||i.lastElementChild)}};r.querySelectorAll("[required]").forEach(t=>{e(t)})}function rn(r){if(r.dataset.enhancedOpenGroup)return;r.dataset.enhancedOpenGroup="true",r.classList.add("flex","flex-wrap","buttons");let e=document.createElement("input");e.type="text",e.placeholder="Add item...",e.classList.add("input-text","input-sm"),e.style.width="auto";let t=()=>r.querySelector('input[type="radio"], input[type="checkbox"]');r.appendChild(e),e.addEventListener("keydown",n=>{if(n.key==="Enter"||n.key==="Tab"){let o=e.value.trim();if(o){n.preventDefault();let a=t(),i=a?.type==="radio"?"radio":"checkbox",s=`open-group-${Math.random().toString(36).substring(2,11)}`,c=document.createElement("label"),d=document.createElement("span");d.setAttribute("data-label",""),d.textContent=o;let p=document.createElement("input");p.type=i,p.name=a?.name||r.getAttribute("data-name")||"open-group",p.value=o,p.id=s,c.appendChild(d),c.appendChild(p),r.insertBefore(c,e),e.value=""}}else if(n.key==="Backspace"&&e.value===""){n.preventDefault();let o=r.querySelectorAll("label");o.length>0&&o[o.length-1].remove()}})}function nn(r){if(r.dataset.enhancedClip)return;r.dataset.enhancedClip="true",r.hasAttribute("tabindex")||r.setAttribute("tabindex","0"),r.hasAttribute("role")||r.setAttribute("role","button");let e=()=>{let n=r.getAttribute("data-clip-open")==="true";r.setAttribute("aria-expanded",n?"true":"false")},t=()=>{let n=r.getAttribute("data-clip-open")==="true";r.setAttribute("data-clip-open",n?"false":"true"),e()};r.addEventListener("click",n=>{n.defaultPrevented||t()}),r.addEventListener("keydown",n=>{(n.key===" "||n.key==="Enter")&&(n.preventDefault(),t())}),e()}function on(r){if(r.dataset.enhancedBtnWorking)return;r.dataset.enhancedBtnWorking="true";let e=null,t=!1;new MutationObserver(o=>{o.forEach(a=>{if(a.attributeName==="class"){let i=r.classList.contains("btn-working"),s=r.querySelector("pds-icon");if(i)if(s)e||(e=s.getAttribute("icon")),s.setAttribute("icon","circle-notch");else{let c=document.createElement("pds-icon");c.setAttribute("icon","circle-notch"),c.setAttribute("size","sm"),r.insertBefore(c,r.firstChild),t=!0}else a.oldValue?.includes("btn-working")&&s&&(t?(s.remove(),t=!1):e&&(s.setAttribute("icon",e),e=null))}})}).observe(r,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var an=new Map([[".accordion",Qr],["nav[data-dropdown]",Zr],["label[data-toggle]",Kr],["label[data-color]",Xr],['input[type="range"]',en],["form[data-required]",tn],["fieldset[role=group][data-open]",rn],["[data-clip]",nn],["button, a[class*='btn-']",on]]),Dt=Yr.map(r=>({...r,run:an.get(r.selector)||(()=>{})}));var _t=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
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
    `.trim()}];var Ut="pds",sn=/^([a-z][a-z0-9+\-.]*:)?\/\//i,Ht=/^[a-z]:/i;function we(r=""){return r.endsWith("/")?r:`${r}/`}function ln(r="",e=Ut){let t=r.replace(/\/+$/,"");return new RegExp(`(?:^|/)${e}$`,"i").test(t)?t:`${t}/${e}`}function cn(r){return r.replace(/^\.\/+/,"")}function dn(r){return Ht.test(r)?r.replace(Ht,"").replace(/^\/+/,""):r}function pn(r){return r.startsWith("public/")?r.substring(7):r}function qt(r,e={}){let t=e.segment||Ut,n=e.defaultRoot||`/assets/${t}/`,o=r?.public&&r.public?.root||r?.static&&r.static?.root||null;if(!o||typeof o!="string")return we(n);let a=o.trim();return a?(a=a.replace(/\\/g,"/"),a=ln(a,t),a=we(a),sn.test(a)?a:(a=cn(a),a=dn(a),a.startsWith("/")||(a=pn(a),a.startsWith("/")||(a=`/${a}`),a=a.replace(/\/+/g,(i,s)=>s===0?i:"/")),we(a))):we(n)}function Gt(r){let e=r.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(e.toLowerCase()))return!0;let o=document.createElement("canvas").getContext("2d");if(!o)return!1;let a="mmmmmmmmmmlli",i="72px",s="monospace";o.font=`${i} ${s}`;let c=o.measureText(a).width;o.font=`${i} "${e}", ${s}`;let d=o.measureText(a).width;return c!==d}function un(r){return r?r.split(",").map(n=>n.trim())[0].replace(/['"]/g,"").trim():null}async function Vt(r,e={}){if(!r)return Promise.resolve();let{weights:t=[400,500,600,700],italic:n=!1}=e,o=un(r);if(!o||Gt(o))return Promise.resolve();let a=encodeURIComponent(o);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${a}"]`)?(console.log(`Font "${o}" is already loading or loaded`),Promise.resolve()):(console.log(`Loading font "${o}" from Google Fonts...`),new Promise((s,c)=>{let d=document.createElement("link");d.rel="stylesheet";let p=n?`ital,wght@0,${t.join(";0,")};1,${t.join(";1,")}`:`wght@${t.join(";")}`;d.href=`https://fonts.googleapis.com/css2?family=${a}:${p}&display=swap`,d.setAttribute("data-font-loader",o),d.onload=()=>{console.log(`Successfully loaded font "${o}"`),s()},d.onerror=()=>{console.warn(`Failed to load font "${o}" from Google Fonts`),c(new Error(`Failed to load font: ${o}`))},document.head.appendChild(d),setTimeout(()=>{Gt(o)||console.warn(`Font "${o}" did not load within timeout`),s()},5e3)}))}async function ot(r){if(!r)return Promise.resolve();let e=new Set;r.fontFamilyHeadings&&e.add(r.fontFamilyHeadings),r.fontFamilyBody&&e.add(r.fontFamilyBody),r.fontFamilyMono&&e.add(r.fontFamilyMono);let t=Array.from(e).map(n=>Vt(n).catch(o=>{console.warn(`Could not load font: ${n}`,o)}));await Promise.all(t)}var mn=/^[a-z][a-z0-9+\-.]*:\/\//i,ke=(()=>{try{return import.meta.url}catch{return}})(),Le=r=>typeof r=="string"&&r.length&&!r.endsWith("/")?`${r}/`:r;function Re(r,e={}){if(!r||mn.test(r))return r;let{preferModule:t=!0}=e,n=()=>{if(!ke)return null;try{return new URL(r,ke).href}catch{return null}},o=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(r,window.location.origin).href}catch{return null}};return(t?n()||o():o()||n())||r}var Qt=(()=>{if(ke)try{let r=new URL(ke);if(/\/public\/assets\/js\//.test(r.pathname))return new URL("../pds/",ke).href}catch{return}})(),Zt=!1;function Kt(r){Zt||typeof document>"u"||(Zt=!0,r.addEventListener("pds:ready",e=>{let t=e.detail?.mode;t&&document.documentElement.classList.add(`pds-${t}`,"pds-ready")}))}function st(r={},e={}){if(!e||typeof e!="object")return r;let t=Array.isArray(r)?[...r]:{...r};for(let[n,o]of Object.entries(e))o&&typeof o=="object"&&!Array.isArray(o)?t[n]=st(t[n]&&typeof t[n]=="object"?t[n]:{},o):t[n]=o;return t}function it(r=""){return String(r).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ae(r){if(r==null)return r;if(typeof r=="function")return;if(typeof r!="object")return r;if(Array.isArray(r))return r.map(t=>ae(t)).filter(t=>t!==void 0);let e={};for(let t in r)if(r.hasOwnProperty(t)){let n=r[t];if(typeof n!="function"){let o=ae(n);o!==void 0&&(e[t]=o)}}return e}function lt(r={},e={},{presets:t,defaultLog:n,validateDesignConfig:o,validateInitConfig:a}={}){let i=r&&typeof r.log=="function"?r.log:n,s=typeof r=="object"&&("colors"in r||"typography"in r||"spatialRhythm"in r||"shape"in r||"behavior"in r||"layout"in r||"advanced"in r||"a11y"in r||"components"in r||"icons"in r),c=r&&r.enhancers;c&&!Array.isArray(c)&&(c=Object.values(c));let d=c??e.enhancers??[],p=r&&r.preset,l=r&&r.design,u=r&&r.icons&&typeof r.icons=="object"?r.icons:null,g="preset"in(r||{})||"design"in(r||{})||"enhancers"in(r||{});r&&typeof r=="object"&&typeof a=="function"&&a(r,{log:i,context:"PDS.start"});let f,h=null;if(g){l&&typeof l=="object"&&typeof o=="function"&&o(l,{log:i,context:"PDS.start"});let m=String(p||"default").toLowerCase(),b=t?.[m]||Object.values(t||{}).find(B=>it(B.name)===m||String(B.name||"").toLowerCase()===m);if(!b)throw new Error(`PDS preset not found: "${p||"default"}"`);h={id:b.id||it(b.name),name:b.name||b.id||String(m)};let w=structuredClone(b);if(l&&typeof l=="object"||u){let B=l?ae(l):{},W=u?ae(u):null,U=W?st(B,{icons:W}):B;w=st(w,structuredClone(U))}let{mode:k,autoDefine:C,applyGlobalStyles:F,manageTheme:S,themeStorageKey:A,preloadStyles:R,criticalLayers:M,managerURL:E,manager:N,preset:$,design:v,enhancers:x,log:z,...T}=r;f={...T,design:w,preset:h.name,log:z||n}}else if(s){typeof o=="function"&&o(r,{log:i,context:"PDS.start"});let{log:m,...b}=r;f={design:structuredClone(b),log:m||n}}else{let m=t?.default||Object.values(t||{}).find(b=>it(b.name)==="default");if(!m)throw new Error("PDS default preset not available");h={id:m.id||"default",name:m.name||"Default"},f={design:structuredClone(m),preset:h.name,log:n}}return{generatorConfig:f,enhancers:d,presetInfo:h}}function Xt({manageTheme:r,themeStorageKey:e,applyResolvedTheme:t,setupSystemListenerIfNeeded:n}){let o="light",a=null;if(r&&typeof window<"u"){try{a=localStorage.getItem(e)||null}catch{a=null}try{t?.(a),n?.(a)}catch{}a?a==="system"?o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":o=a:o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:o,storedTheme:a}}function er(r,{resolvePublicAssetURL:e}){let t=!!(r?.public?.root||r?.static?.root),n=e(r);return!t&&Qt&&(n=Qt),Le(Re(n))}async function tr(r,{baseEnhancers:e=[]}={}){let{autoDefineBaseURL:t="/auto-define/",autoDefinePreload:n=[],autoDefineMapper:o=null,enhancers:a=[],autoDefineOverrides:i=null,autoDefinePreferModule:s=!0}=r,c=(()=>{let p=new Map;return(e||[]).forEach(l=>p.set(l.selector,l)),(a||[]).forEach(l=>p.set(l.selector,l)),Array.from(p.values())})(),d=null;if(typeof window<"u"&&typeof document<"u"){let p=null;try{let m=await Promise.resolve().then(()=>(Yt(),Jt));p=m?.AutoDefiner||m?.default?.AutoDefiner||m?.default||null}catch(m){console.warn("AutoDefiner not available:",m?.message||m)}let l=m=>{switch(m){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${m}.js`}},{mapper:u,...g}=i&&typeof i=="object"?i:{},h={baseURL:t&&Le(Re(t,{preferModule:s})),predefine:n,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:c,onError:(m,b)=>{if(typeof m=="string"&&m.startsWith("pds-")){let k=["pds-form","pds-drawer"].includes(m),C=b?.message?.includes("#pds/lit")||b?.message?.includes("Failed to resolve module specifier");k&&C?console.error(`\u274C PDS component <${m}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`):console.warn(`\u26A0\uFE0F PDS component <${m}> not found. Assets may not be installed.`)}else console.error(`\u274C Auto-define error for <${m}>:`,b)},...g,mapper:m=>{if(customElements.get(m))return null;if(typeof o=="function")try{let b=o(m);return b===void 0?l(m):b}catch(b){return console.warn("Custom autoDefine.mapper error; falling back to default:",b?.message||b),l(m)}return l(m)}};p&&(d=new p(h),n.length>0&&typeof p.define=="function"&&await p.define(...n,{baseURL:t,mapper:h.mapper,onError:h.onError}))}return{autoDefiner:d,mergedEnhancers:c}}var ct=["light","dark"],dt=new Set(ct);function pt(r){let t=(Array.isArray(r?.themes)?r.themes.map(n=>String(n).toLowerCase()):ct).filter(n=>dt.has(n));return t.length?t:ct}function Pe(r,{preferDocument:e=!0}={}){let t=String(r||"").toLowerCase();if(dt.has(t))return t;if(e&&typeof document<"u"){let n=document.documentElement?.getAttribute("data-theme");if(dt.has(n))return n}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Se(r,e){let t=Pe(e);return pt(r).includes(t)}var ar=!1,$e=null,Be="pds-live-edit-toggle",ht="pds-live-edit-toggle-style";function ir(r){if(typeof document>"u"||typeof r!="function")return;if(document.body){r();return}let e=()=>{document.body&&(document.removeEventListener("DOMContentLoaded",e),r())};document.addEventListener("DOMContentLoaded",e,{once:!0})}function bn(r={}){let e=r?.interactive!==!1;typeof document>"u"||ir(()=>{if(document.querySelector("pds-live-edit")){if(!e){let t=document.querySelector("pds-live-edit");t&&t.setAttribute("data-pds-live-settings-only","true")}}else{let t=document.createElement("pds-live-edit");e||t.setAttribute("data-pds-live-settings-only","true"),document.body.appendChild(t)}})}function Ie(r=0){return new Promise(e=>{setTimeout(e,Math.max(0,Number(r)||0))})}async function Ce(r={}){let e=r?.mountIfMissing!==!1,t=r?.interactive!==!1,n=typeof r?.requiredMethod=="string"&&r.requiredMethod.trim()?r.requiredMethod.trim():"openDesignSettings",o=Number.isFinite(Number(r?.timeoutMs))?Number(r.timeoutMs):2400;if(typeof document>"u"||!e&&!document.querySelector("pds-live-edit"))return null;e&&bn({interactive:t});let a=Date.now();for(;Date.now()-a<o;){let s=document.querySelector("pds-live-edit");if(!s){await Ie(40);continue}if(typeof s?.[n]=="function")return s;if(typeof customElements<"u"&&typeof customElements.whenDefined=="function"){try{await Promise.race([customElements.whenDefined("pds-live-edit"),Ie(80)])}catch{await Ie(40)}continue}await Ie(40)}let i=document.querySelector("pds-live-edit");return i&&typeof i?.[n]=="function"?i:null}function sr(){if(typeof document>"u")return;document.querySelectorAll("pds-live-edit").forEach(e=>{typeof e?.setInteractiveEditingEnabled=="function"&&e.setInteractiveEditingEnabled(!1),e.remove()})}function yn(r){return r?typeof r.isInteractiveEditingEnabled=="function"?!!r.isInteractiveEditingEnabled():!0:!1}function vn(){if(typeof document>"u"||document.getElementById(ht))return;let r=document.createElement("style");r.id=ht,r.textContent=`
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
  `,document.head.appendChild(r)}function ft(r,e){if(!r)return;r.classList.toggle("btn-primary",e),r.classList.toggle("btn-secondary",!e),r.setAttribute("aria-pressed",e?"true":"false");let t="PDS Manager";r.setAttribute("aria-label",t),r.setAttribute("title",t)}async function xn(){if(typeof document>"u")return null;vn();let r=document.getElementById(Be);if(!r){let e=document.createElement("nav");e.className="pds-live-edit-toggle-nav",e.setAttribute("data-dropdown",""),e.setAttribute("data-mode","auto"),e.setAttribute("data-pds-live-edit-ignore","true"),r=document.createElement("button"),r.id=Be,r.type="button",r.className="icon-only btn-secondary",r.setAttribute("data-pds-live-edit-ignore","true"),r.innerHTML='<pds-icon icon="cursor-click" size="sm"></pds-icon>';let t=document.createElement("menu");t.setAttribute("data-pds-live-edit-ignore","true");let n=(a,i,s)=>{let c=document.createElement("li"),d=document.createElement("a");d.href="#",d.dataset.pdsLiveAction=a,d.setAttribute("data-pds-live-edit-ignore","true");let p=document.createElement("pds-icon");return p.setAttribute("icon",s),p.setAttribute("size","sm"),d.append(p,document.createTextNode(` ${i}`)),c.appendChild(d),c},o=()=>{let a=document.createElement("li");a.setAttribute("data-pds-live-edit-ignore","true");let i=document.createElement("hr");return i.setAttribute("aria-hidden","true"),a.appendChild(i),a};t.appendChild(n("toggle","Toggle live editing","pencil")),t.appendChild(n("open-settings","Open Settings","gear")),t.appendChild(o()),t.appendChild(n("reset-config","Reset Config","arrow-counter-clockwise")),await wn(t),e.append(r,t),ir(()=>{document.getElementById(Be)||document.body.appendChild(e)})}return r}async function wn(r){if(r instanceof Element){if(r.__pdsLiveSharedMenuItemInFlight)return r.__pdsLiveSharedMenuItemInFlight;r.__pdsLiveSharedMenuItemInFlight=(async()=>{r.querySelectorAll("li.pds-live-shared-quick-mode-item").forEach(s=>s.remove());let e=await Ce({mountIfMissing:!0,interactive:!1,requiredMethod:"createSharedQuickModeMenuItem",timeoutMs:7e3});if(!e||typeof e.createSharedQuickModeMenuItem!="function")return;let t=await e.createSharedQuickModeMenuItem();if(!(t instanceof Element))return;t.classList.add("pds-live-shared-quick-mode-item");let o=r.querySelector('a[data-pds-live-action="reset-config"]')?.closest("li")||null,a=o?.previousElementSibling||null,i=a&&a.querySelector?.(":scope > hr")?a:null;if(i){r.insertBefore(t,i);return}if(o){r.insertBefore(t,o);return}r.appendChild(t)})();try{await r.__pdsLiveSharedMenuItemInFlight}finally{r.__pdsLiveSharedMenuItemInFlight=null}}}function kn(){if(typeof document>"u")return;let r=document.getElementById(Be);if(r){let t=r.closest(".pds-live-edit-toggle-nav");t?t.remove():r.remove()}let e=document.getElementById(ht);e&&e.remove(),sr()}async function Sn(){if(typeof document>"u")return;let r=await xn();if(!r)return;let e=async i=>{if(i){let s=await Ce({mountIfMissing:!0});s&&typeof s.setInteractiveEditingEnabled=="function"&&s.setInteractiveEditingEnabled(!0)}else sr();ft(r,i)};e(!1);let t=r.closest(".pds-live-edit-toggle-nav")||r;r.__pdsLiveEditActionHandler&&t.removeEventListener("click",r.__pdsLiveEditActionHandler);let n=async i=>{let s=i.target?.closest?.("[data-pds-live-action]");if(!s)return;i.preventDefault();let c=String(s.dataset.pdsLiveAction||"");if(c==="toggle"){let d=await Ce({mountIfMissing:!1}),p=yn(d);await e(!p);return}if(c==="open-settings"){let d=await Ce({mountIfMissing:!0,requiredMethod:"openDesignSettings",interactive:!1});d&&typeof d.setInteractiveEditingEnabled=="function"&&d.setInteractiveEditingEnabled(!1),d&&typeof d.openDesignSettings=="function"&&(ft(r,!1),await d.openDesignSettings());return}if(c==="reset-config"){let d=await Ce({mountIfMissing:!0,requiredMethod:"resetConfig",interactive:!1});ft(r,!1),d&&typeof d.resetConfig=="function"&&await d.resetConfig();return}};r.__pdsLiveEditActionHandler=n,t.addEventListener("click",n),r.__pdsLiveEditDisableHandler&&document.removeEventListener("pds:live-edit:disable",r.__pdsLiveEditDisableHandler),r.__pdsLiveEditEnableHandler&&document.removeEventListener("pds:live-edit:enable",r.__pdsLiveEditEnableHandler);let o=()=>{e(!1)},a=()=>{e(!0)};r.__pdsLiveEditDisableHandler=o,document.addEventListener("pds:live-edit:disable",o),r.__pdsLiveEditEnableHandler=a,document.addEventListener("pds:live-edit:enable",a)}function $n(){if(typeof window>"u"||!window.localStorage)return null;try{let r=window.localStorage.getItem("pure-ds-config");if(!r)return null;let e=JSON.parse(r);if(e&&("preset"in e||"design"in e))return e}catch{return null}return null}function bt(r={},e={}){if(!e||typeof e!="object")return r;let t=Array.isArray(r)?[...r]:{...r};for(let[n,o]of Object.entries(e))o&&typeof o=="object"&&!Array.isArray(o)?t[n]=bt(t[n]&&typeof t[n]=="object"?t[n]:{},o):t[n]=o;return t}function Cn(r){let e=$n();if(!e||!r||typeof r!="object")return r;let t=e.preset,n=e.design&&typeof e.design=="object"?e.design:null;if(!t&&!n)return r;let o="preset"in r||"design"in r||"enhancers"in r,a={...r};if(t&&(a.preset=t),n)if(o){let i=r.design&&typeof r.design=="object"?r.design:{};a.design=bt(i,n)}else a=bt(r,n);return a}function zn(r,e={}){let{hideCategory:t=!0,itemGrid:n="45px 1fr",includeIncompatible:o=!0,disableIncompatible:a=!0,categoryName:i="Presets",theme:s,onSelect:c,iconHandler:d}=e||{},p=Pe(s??r?.theme),l=f=>{let m=g(f?.id)?.colors||{},b=m?.primary,w=m?.secondary,k=m?.accent;return b&&w&&k?`<span style="display:flex;gap:1px;flex-shrink:0;" aria-hidden="true">
        <span style="display:inline-block;width:10px;height:20px;background-color:${b};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${w};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${k};">&nbsp;</span>
      </span>`:f?.icon?`<pds-icon icon="${f.icon}" size="sm"></pds-icon>`:""},u=()=>{let f=r?.presets||{};return Object.values(f||{}).filter(h=>!!(h?.id||h?.name))},g=f=>f&&u().find(m=>String(m?.id||m?.name)===String(f))||null;return{hideCategory:t,itemGrid:n,iconHandler:typeof d=="function"?d:l,categories:{[i]:{trigger:()=>!0,getItems:(f={})=>{let h=String(f?.search||"").toLowerCase().trim();return u().filter(b=>{let w=String(b?.name||b?.id||"").toLowerCase(),k=String(b?.description||"").toLowerCase(),C=Array.isArray(b?.tags)?b.tags.map(S=>String(S).toLowerCase()):[];if(h&&!(w.includes(h)||k.includes(h)||C.some(A=>A.includes(h))))return!1;let F=Se(b,p);return!(!o&&!F)}).map(b=>{let w=b?.id||b?.name,k=Se(b,p),C=pt(b),F=C.length===1?`${C[0]} only`:`Not available in ${p} mode`,S=String(b?.description||"").trim(),A=k?S:S?`${S} - ${F}`:F;return{id:w,text:b?.name||String(w),description:A,icon:"palette",class:!k&&a?"disabled":"",disabled:!k&&a,tooltip:k?"":F}}).sort((b,w)=>String(b.text||"").localeCompare(String(w.text||"")))},action:async f=>{if(!f?.id||f?.disabled)return f?.id;let h=g(f.id);return h?typeof c=="function"?await c({preset:h,selection:f,resolvedTheme:p}):(typeof r?.applyLivePreset=="function"&&await r.applyLivePreset(h.id||f.id),h.id||f.id):f?.id}}}}}async function Mn(r,{applyResolvedTheme:e,setupSystemListenerIfNeeded:t,emitConfigChanged:n}){if(ar)return;let[o,a,i,s]=await Promise.all([Promise.resolve().then(()=>(tt(),It)),Promise.resolve().then(()=>(Ae(),St)),Promise.resolve().then(()=>(mt(),gt)),Promise.resolve().then(()=>(or(),nr))]),c=o?.default||o?.ontology,d=o?.findComponentForElement,p=a?.enums;$e=i?.PDSQuery||i?.default||null,r.ontology=c,r.findComponentForElement=d,r.enums=p,r.common=s||{},r.presets=Y,r.configRelations=Et,r.configSpec=At,r.configEditorMetadata=Rt,r.configFormSchema=Pt,r.buildConfigFormSchema=de,r.getConfigEditorMetadata=xe,r.enhancerMetadata=_t,r.applyStyles=function(l){let u=l||G.instance;jt(u),typeof n=="function"&&n({mode:"live",source:"live:styles-applied"})},r.adoptLayers=function(l,u,g){return Wt(l,u,g,G.instance)},r.adoptPrimitives=function(l,u){return Ot(l,u,G.instance)},r.getGenerator=async function(){return G},r.query=async function(l){if(!$e){let g=await Promise.resolve().then(()=>(mt(),gt));$e=g?.PDSQuery||g?.default||null}return $e?await new $e(r).search(l):[]},r.buildPresetOmniboxSettings=function(l={}){return zn(r,l)},r.applyLivePreset=async function(l,u={}){if(!l)return!1;if(!r.registry?.isLive)return console.warn("PDS.applyLivePreset is only available in live mode."),!1;let g=r.currentConfig||{},{design:f,preset:h,...m}=g,b={...structuredClone(ae(m)),preset:l},w=lt(b,{},{presets:Y,defaultLog:et,validateDesignConfig:Ke,validateInitConfig:Xe}),k=Pe(r.theme);if(!Se(w.generatorConfig.design,k)){let A=w.presetInfo?.name||w.generatorConfig?.design?.name||l;console.warn(`PDS theme "${k}" not supported by preset "${A}".`)}g.theme&&!w.generatorConfig.theme&&(w.generatorConfig.theme=g.theme);let C=new G(w.generatorConfig);if(w.generatorConfig.design?.typography)try{await ot(w.generatorConfig.design.typography)}catch(A){w.generatorConfig?.log?.("warn","Failed to load some fonts from Google Fonts:",A)}r.applyStyles?.(C);let F=w.presetInfo||{id:l,name:l};if(r.currentPreset=F,r.currentConfig=Object.freeze({...g,preset:w.generatorConfig.preset,design:structuredClone(w.generatorConfig.design),theme:w.generatorConfig.theme||g.theme}),r.configEditorMetadata=xe(w.generatorConfig.design),r.configFormSchema=de(w.generatorConfig.design),u?.persist!==!1&&typeof window<"u"){let A="pure-ds-config";try{let R=localStorage.getItem(A),M=R?JSON.parse(R):null,E={...M&&typeof M=="object"?M:{},preset:F.id||l,design:structuredClone(w.generatorConfig.design||{})};localStorage.setItem(A,JSON.stringify(E))}catch(R){w.generatorConfig?.log?.("warn","Failed to store preset:",R)}}return!0},Object.getOwnPropertyDescriptor(r,"compiled")||Object.defineProperty(r,"compiled",{get(){return r.registry?.isLive&&G.instance?G.instance.compiled:null},enumerable:!0,configurable:!1}),r.preloadCritical=function(l,u={}){if(typeof window>"u"||!document.head||!l)return;let{theme:g,layers:f=["tokens"]}=u;try{let h=g||"light";(g==="system"||!g)&&(h=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",h);let m=l.design?{...l,theme:h}:{design:l,theme:h},b=new G(m),w=f.map(k=>{try{return b.css?.[k]||""}catch{return""}}).filter(k=>k.trim()).join(`
`);if(w){let k=document.head.querySelector("style[data-pds-preload]");k&&k.remove();let C=document.createElement("style");C.setAttribute("data-pds-preload",""),C.textContent=w,document.head.insertBefore(C,document.head.firstChild)}}catch(h){console.warn("PDS preload failed:",h)}},ar=!0}async function Tn(r,e,{emitReady:t,emitConfigChanged:n,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}){if(!e||typeof e!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");if(e=Cn(e),await Mn(r,{applyResolvedTheme:o,setupSystemListenerIfNeeded:a,emitConfigChanged:n}),Kt(r),typeof document<"u"&&document.adoptedStyleSheets){let u=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(f=>f._pdsFouc)){let f=new CSSStyleSheet;f.replaceSync(u),f._pdsFouc=!0,document.adoptedStyleSheets=[f,...document.adoptedStyleSheets]}}catch(g){if(console.warn("Constructable stylesheets not supported, using <style> tag fallback:",g),!document.head.querySelector("style[data-pds-fouc]")){let h=document.createElement("style");h.setAttribute("data-pds-fouc",""),h.textContent=u,document.head.insertBefore(h,document.head.firstChild)}}}let i=e.applyGlobalStyles??!0,s=e.manageTheme??!0,c=e.themeStorageKey??"pure-ds-theme",d=e.preloadStyles??!1,p=e.criticalLayers??["tokens","primitives"],l=e&&e.autoDefine||null;try{let{resolvedTheme:u}=Xt({manageTheme:s,themeStorageKey:c,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}),g=lt(e,{},{presets:Y,defaultLog:et,validateDesignConfig:Ke,validateInitConfig:Xe});if(s&&!Se(g.generatorConfig.design,u)){let M=g.presetInfo?.name||g.generatorConfig?.design?.name||g.generatorConfig?.preset||"current preset";console.warn(`PDS theme "${u}" not supported by preset "${M}".`)}let f=g.enhancers,{log:h,...m}=g.generatorConfig,b=structuredClone(m);b.log=h,s&&(b.theme=u);let w=new G(b);if(b.design?.typography)try{await ot(b.design.typography)}catch(M){b?.log?.("warn","Failed to load some fonts from Google Fonts:",M)}if(d&&typeof window<"u"&&document.head)try{let M=p.map(E=>{try{return w.css?.[E]||""}catch(N){return b?.log?.("warn",`Failed to generate critical CSS for layer "${E}":`,N),""}}).filter(E=>E.trim()).join(`
`);if(M){let E=document.head.querySelector("style[data-pds-critical]");E&&E.remove();let N=document.createElement("style");N.setAttribute("data-pds-critical",""),N.textContent=M;let $=document.head.querySelector('meta[charset], meta[name="viewport"]');$?$.parentNode.insertBefore(N,$.nextSibling):document.head.insertBefore(N,document.head.firstChild)}}catch(M){b?.log?.("warn","Failed to preload critical styles:",M)}r.registry.setLiveMode(),g.presetInfo?.name?b?.log?.("log",`PDS live with preset "${g.presetInfo.name}"`):b?.log?.("log","PDS live with custom config"),i&&(r.applyStyles?.(G.instance),typeof window<"u"&&setTimeout(()=>{let M=document.head.querySelector("style[data-pds-critical]");M&&M.remove();let E=document.head.querySelector("style[data-pds-preload]");E&&E.remove();let N=document.getElementById("pds-runtime-stylesheet");N&&N.remove()},100));let k=er(e,{resolvePublicAssetURL:qt}),C;l&&l.baseURL?C=Le(Re(l.baseURL,{preferModule:!1})):C=`${k}components/`;let F=null,S=[];try{let M=await tr({autoDefineBaseURL:C,autoDefinePreload:l&&Array.isArray(l.predefine)&&l.predefine||[],autoDefineMapper:l&&typeof l.mapper=="function"&&l.mapper||null,enhancers:f,autoDefineOverrides:l||null,autoDefinePreferModule:!(l&&l.baseURL)},{baseEnhancers:Dt});F=M.autoDefiner,S=M.mergedEnhancers||[]}catch(M){b?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",M)}let A=w?.options||b,R=ae(e);if(r.currentConfig=Object.freeze({mode:"live",...structuredClone(R),design:structuredClone(g.generatorConfig.design),preset:g.generatorConfig.preset,theme:u,enhancers:S}),r.configEditorMetadata=xe(g.generatorConfig.design),r.configFormSchema=de(g.generatorConfig.design),typeof n=="function"&&n({mode:"live",source:"live:config-applied",preset:g.generatorConfig.preset}),typeof document<"u")try{e?.liveEdit?setTimeout(()=>{Sn()},0):kn()}catch(M){b?.log?.("warn","Live editor toggle failed to start:",M)}return t({mode:"live",generator:w,config:A,theme:u,autoDefiner:F}),{generator:w,config:A,theme:u,autoDefiner:F}}catch(u){throw r.dispatchEvent(new CustomEvent("pds:error",{detail:{error:u}})),u}}function En(r){let e=Number(r);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):.5}function An(r){return Array.isArray(r)?r.map(e=>e?{severity:String(e.severity||"info").toLowerCase(),message:String(e.message||""),path:e.path?String(e.path):""}:null).filter(e=>e&&e.message):[]}function j(r={}){let e=String(r.source||"unknown"),t=String(r.type||"generic"),n=En(r.confidence),o=An(r.issues),a=r.designPatch&&typeof r.designPatch=="object"?r.designPatch:{},i=r.template&&typeof r.template=="object"?r.template:null;return{source:e,type:t,confidence:n,issues:o,designPatch:a,template:i,meta:r.meta&&typeof r.meta=="object"?r.meta:{}}}function Fn(r){return!!(r&&typeof r=="object"&&"source"in r&&"type"in r&&"confidence"in r&&"issues"in r&&"designPatch"in r)}var Ln="../templates/templates.json",lr="/assets/pds/templates/templates.json",Rn=["public","assets","pds","templates","templates.json"],Pn=["..","..","..","public","assets","pds","templates","templates.json"],je=null;function cr(){return!!(typeof process<"u"&&process?.versions?.node)}function Nn(r={}){return{id:String(r.id||"").trim(),name:String(r.name||r.id||"Template").trim(),description:String(r.description||"").trim(),icon:String(r.icon||"layout").trim(),file:String(r.file||"").trim(),tags:Array.isArray(r.tags)?r.tags.map(e=>String(e)):[]}}function Oe(r={},e={}){let n=(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(Nn).filter(o=>o.id&&o.file);return{version:r?.version||"1",templates:n,__catalogURL:e.catalogURL||null,__catalogFilePath:e.catalogFilePath||null}}async function In(r={}){let t=[r.catalogURL||globalThis?.PDS?.currentConfig?.templateCatalogURL,Ln,lr].filter(Boolean);for(let n of t)try{let o=new URL(n,import.meta.url).href,a=await fetch(o,{credentials:"same-origin"});if(!a.ok)continue;let i=await a.json();return Oe(i,{catalogURL:o})}catch{}return Oe({templates:[]})}async function Bn(r={}){let e="node:fs/promises",t="node:path",n="node:url",[{readFile:o},a,{fileURLToPath:i}]=await Promise.all([import(e),import(t),import(n)]),s=[];r.catalogPath&&s.push(a.resolve(r.catalogPath)),s.push(a.resolve(process.cwd(),...Rn));let c=a.dirname(i(import.meta.url));s.push(a.resolve(c,...Pn));for(let d of s)try{let p=await o(d,"utf8"),l=JSON.parse(p);return Oe(l,{catalogFilePath:d})}catch{}return Oe({templates:[]})}async function jn(r,e){if(!r?.file)return"";if(!cr()){let c=e?.__catalogURL||lr,d=new URL(r.file,c).href,p=await fetch(d,{credentials:"same-origin"});if(!p.ok)throw new Error(`Template file not found: ${r.file}`);return(await p.text()).trim()}let t="node:fs/promises",n="node:path",[{readFile:o},a]=await Promise.all([import(t),import(n)]),i=e?.__catalogFilePath?a.dirname(e.__catalogFilePath):a.resolve(process.cwd(),"public","assets","pds","templates"),s=a.resolve(i,r.file);return(await o(s,"utf8")).trim()}async function We(r={}){return je&&!r.forceReload||(je=cr()?await Bn(r):await In(r)),je}async function dr(r={}){return(await We(r)).templates.map(({id:t,name:n,description:o,icon:a,file:i,tags:s})=>({id:t,name:n,description:o,icon:a,file:i,tags:s}))}async function On(r,e={}){let t=await We(e),n=t.templates.find(a=>a.id===r)||null;if(!n)return null;let o=await jn(n,t);return{...n,html:o}}async function pr(r,e={}){let t=await On(r,e);return t?j({source:"template",type:"template",confidence:1,template:{id:t.id,name:t.name,html:t.html,icon:t.icon,description:t.description}}):j({source:"template",type:"template",confidence:0,issues:[{severity:"error",message:`Unknown template: ${r}`}]})}var ur={version:"tw2pds-layout-v4",summary:"Deterministic Tailwind\u2192PDS conversion rules focused on layout intent, semantic primitive mapping, and richer import-* fallback coverage.",governance:[{id:"layout.utilities.grid",controls:["grid","grid-cols-*","grid-auto-*"],note:"When false, grid mappings are skipped."},{id:"layout.utilities.flex",controls:["flex","flex-*","items-*","justify-*","grow"],note:"When false, flex mappings are skipped."},{id:"layout.utilities.spacing",controls:["gap-*","stack-*"],note:"When false, spacing mappings are skipped."},{id:"layout.utilities.container",controls:["container","max-w-*"],note:"When false, container mappings are skipped."}],nonPdsClassPatterns:["^group(?:[/:].*)?$","^layout-container$"],neverFallbackTags:["table","thead","tbody","tfoot","tr","th","td","caption","colgroup","col"],directMappings:[{id:"layout.flex.base",tw:"flex",pds:["flex"],gate:"flex"},{id:"layout.flex.inline",tw:"inline-flex",pds:["flex"],gate:"flex"},{id:"layout.flex.row",tw:"flex-row",pds:["flex-row"],gate:"flex"},{id:"layout.flex.col",tw:"flex-col",pds:["flex-col"],gate:"flex"},{id:"layout.flex.wrap",tw:"flex-wrap",pds:["flex-wrap"],gate:"flex"},{id:"layout.flex.grow",tw:"grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow.tw",tw:"flex-grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow1",tw:"flex-1",pds:["grow"],gate:"flex"},{id:"layout.items.start",tw:"items-start",pds:["items-start"],gate:"flex"},{id:"layout.items.center",tw:"items-center",pds:["items-center"],gate:"flex"},{id:"layout.items.end",tw:"items-end",pds:["items-end"],gate:"flex"},{id:"layout.items.stretch",tw:"items-stretch",pds:["items-stretch"],gate:"flex"},{id:"layout.items.baseline",tw:"items-baseline",pds:["items-baseline"],gate:"flex"},{id:"layout.justify.start",tw:"justify-start",pds:["justify-start"],gate:"flex"},{id:"layout.justify.center",tw:"justify-center",pds:["justify-center"],gate:"flex"},{id:"layout.justify.end",tw:"justify-end",pds:["justify-end"],gate:"flex"},{id:"layout.justify.between",tw:"justify-between",pds:["justify-between"],gate:"flex"},{id:"layout.justify.around",tw:"justify-around",pds:["justify-around"],gate:"flex"},{id:"layout.justify.evenly",tw:"justify-evenly",pds:["justify-evenly"],gate:"flex"},{id:"layout.grid.base",tw:"grid",pds:["grid"],gate:"grid"},{id:"layout.grid.cols.1",tw:"grid-cols-1",pds:["grid-cols-1"],gate:"grid"},{id:"layout.grid.cols.2",tw:"grid-cols-2",pds:["grid-cols-2"],gate:"grid"},{id:"layout.grid.cols.3",tw:"grid-cols-3",pds:["grid-cols-3"],gate:"grid"},{id:"layout.grid.cols.4",tw:"grid-cols-4",pds:["grid-cols-4"],gate:"grid"},{id:"layout.grid.cols.6",tw:"grid-cols-6",pds:["grid-cols-6"],gate:"grid"},{id:"layout.container",tw:"container",pds:["container"],gate:"container"},{id:"intent.surface.shadow",tw:"shadow",pds:["surface-elevated"]},{id:"intent.surface.shadow-md",tw:"shadow-md",pds:["surface-elevated"]},{id:"intent.surface.shadow-lg",tw:"shadow-lg",pds:["surface-elevated"]},{id:"intent.surface.base",tw:"bg-white",pds:["surface-base"]},{id:"typography.align.center",tw:"text-center",pds:["text-center"]},{id:"typography.align.left",tw:"text-left",pds:["text-left"]},{id:"typography.align.right",tw:"text-right",pds:["text-right"]},{id:"typography.text.muted.gray500",tw:"text-gray-500",pds:["text-muted"]},{id:"typography.text.muted.slate500",tw:"text-slate-500",pds:["text-muted"]}],ignoredPatterns:[{id:"style.color",pattern:"^(?:text|from|to|via|decoration|accent|caret)-|^bg-(?!cover$|center$|no-repeat$)",reason:"Visual style token skipped in favor of semantic PDS styling."},{id:"style.radius-border-shadow",pattern:"^(?:rounded|ring|border|shadow|outline)-?",reason:"Surface/shape inferred at primitive level."},{id:"style.typography",pattern:"^(?:font|leading|tracking|uppercase|lowercase|capitalize)-?",reason:"Typography atomic utilities are skipped."},{id:"style.effects",pattern:"^(?:opacity|blur|backdrop|drop-shadow|mix-blend|filter)-",reason:"Visual effects skipped unless mapped to a PDS utility."},{id:"style.transitions",pattern:"^(?:transition|duration|ease|delay|animate)-",reason:"Motion is system-defined in PDS."},{id:"style.spacing.atomic",pattern:"^(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-",reason:"Atomic spacing skipped; structural spacing intent is mapped."},{id:"style.positioning.atomic",pattern:"^(?:absolute|relative|fixed|sticky|inset(?:-[xy])?|top|right|bottom|left|z|translate(?:-[xy])?|-translate-[xy])(?:-|$)",reason:"Atomic positioning/offset utilities are skipped so PDS primitives and layout utilities control placement."}],intentRules:[{id:"intent.layout.responsive-grid-to-auto",summary:"Collapse responsive grid-cols patterns (including base+md two-step patterns) to best-fit grid-auto-*"},{id:"intent.layout.mobile-stack",summary:"Map flex-col + md/lg:flex-row to mobile-stack"},{id:"intent.component.card",summary:"Infer card/surface classes from rounded+shadow+surface signals"},{id:"intent.component.card.normalize",summary:"Detect Tailwind card utility clusters and normalize them to PDS card and surface variants."},{id:"intent.component.button",summary:"Infer btn-primary / btn-outline / icon-only from CTA patterns"},{id:"intent.component.button.normalize",summary:"Prevents import-* style classes on button-like elements and applies PDS button variants/sizes."},{id:"intent.component.button.layout-grow",summary:"Preserve CTA row width intent on button-like elements by mapping w-full/flex-1 to grow."},{id:"intent.icon.color-preserve",summary:"Preserve icon color intent by mapping Tailwind text color utilities on icon-like elements to tokenized import-* classes."},{id:"intent.component.badge.normalize",summary:"Detects Tailwind badge/pill utility clusters and normalizes them to PDS badge primitives/variants."},{id:"intent.typography.heading-semantic",summary:"Removes Tailwind heading typography/color utilities so heading semantics and PDS defaults control typography."},{id:"intent.surface.footer-inverse",summary:"Use surface-inverse for footers with explicit background intent"},{id:"intent.typography.link-treatment",summary:"Apply minimal link treatment for hover/transition-tailwind anchors"},{id:"intent.typography.link-active-preserve",summary:"Preserve anchor text color intent (including active menu states) by mapping Tailwind text utilities to tokenized import-* classes."},{id:"intent.typography.metric-paragraph-to-div",summary:"Normalize metric display lines from paragraph tags to div tags to avoid default paragraph margins in compact stat layouts."},{id:"intent.typography.metric-pair-no-stack",summary:"When a compact metric container has two consecutive typography lines, remove stack-sm so spacing follows Tailwind preflight no-margin assumptions."},{id:"intent.typography.semantic-heading-from-scale",summary:"Map large bold typography scales (text-2xl/text-3xl/text-4xl) to semantic heading tags when possible."},{id:"intent.typography.bold-to-strong",summary:"Prefer semantic strong tags for bold inline text intent instead of utility-only font-weight classes."},{id:"intent.preflight.tailwind-runtime-detected",summary:"Detect Tailwind runtime CSS injection and translate key preflight intent"},{id:"intent.preflight.list-reset",summary:"Preserve Tailwind list-reset preflight behavior via scoped fallback class"},{id:"intent.preflight.anchor-reset",summary:"Preserve Tailwind anchor reset preflight behavior via scoped fallback class"},{id:"table.strict-tags.no-classes",summary:"Never emit classes for semantic table tags (table/thead/tbody/tfoot/tr/th/td/caption/colgroup/col)"},{id:"intent.form.nested-label",summary:"Convert sibling label+control pairs into nested labels"},{id:"fallback.import-style",summary:"Generate import-* classes + local style block for unmapped utility styles"}],gapScaleMap:{"gap-0":"gap-0","gap-1":"gap-xs","gap-2":"gap-sm","gap-3":"gap-sm","gap-4":"gap-md","gap-5":"gap-md","gap-6":"gap-lg","gap-7":"gap-lg","gap-8":"gap-xl","gap-10":"gap-xl","gap-12":"gap-xl"},maxWidthMap:{"max-w-xs":"max-w-sm","max-w-sm":"max-w-sm","max-w-md":"max-w-md","max-w-lg":"max-w-lg","max-w-xl":"max-w-xl","max-w-2xl":"max-w-xl","max-w-3xl":"max-w-xl","max-w-4xl":"max-w-xl","max-w-5xl":"max-w-xl","max-w-6xl":"max-w-xl","max-w-7xl":"max-w-xl"},tailwindSizeScale:{"0":"var(--spacing-0)","0.5":"0.125rem","1":"var(--spacing-1)","1.5":"0.375rem","2":"var(--spacing-2)","2.5":"0.625rem","3":"var(--spacing-3)","3.5":"0.875rem","4":"var(--spacing-4)","5":"var(--spacing-5)","6":"var(--spacing-6)","7":"var(--spacing-7)","8":"var(--spacing-8)","9":"var(--spacing-9)","10":"var(--spacing-10)","11":"var(--spacing-11)","12":"var(--spacing-12)","14":"3.5rem","16":"4rem","20":"5rem","24":"6rem","28":"7rem","32":"8rem","36":"9rem","40":"10rem","48":"12rem"},tailwindShadeScale:["50","100","200","300","400","500","600","700","800","900"],defaultTailwindShade:"500",importStyleRules:{"mx-auto":"margin-left:auto;margin-right:auto","ml-auto":"margin-left:auto","mr-auto":"margin-right:auto","w-full":"width:100%","w-auto":"width:auto","h-full":"height:100%","h-48":"height:12rem","h-2.5":"height:0.625rem","h-10":"height:var(--spacing-10)","h-2":"height:var(--spacing-2)","w-2":"width:var(--spacing-2)","size-8":"width:var(--spacing-8);height:var(--spacing-8)","size-10":"width:var(--spacing-10);height:var(--spacing-10)","size-full":"width:100%;height:100%","min-h-screen":"min-height:100vh","overflow-hidden":"overflow:hidden","overflow-x-hidden":"overflow-x:hidden","overflow-x-auto":"overflow-x:auto","whitespace-nowrap":"white-space:nowrap",hidden:"display:none",block:"display:block",truncate:"overflow:hidden;text-overflow:ellipsis;white-space:nowrap","justify-items-center":"justify-items:center","justify-items-start":"justify-items:start","justify-items-end":"justify-items:end","justify-items-stretch":"justify-items:stretch","grid-flow-col":"grid-auto-flow:column","aspect-square":"aspect-ratio:1 / 1","bg-center":"background-position:center","bg-cover":"background-size:cover","bg-no-repeat":"background-repeat:no-repeat","transition-colors":"transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms"},importStyleDynamicRules:[{id:"fallback.import-style.gap-scale",pattern:"^gap-(\\d+)$",summary:"Converts gap scale utilities (including responsive variants like md:gap-6) to generated import-* fallback classes."},{id:"fallback.import-style.min-width-arbitrary",pattern:"^min-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-width utilities (e.g. min-w-[600px]) to generated import-* fallback classes."},{id:"fallback.import-style.max-width-arbitrary",pattern:"^max-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary max-width utilities (e.g. max-w-[480px]) to generated import-* fallback classes."},{id:"fallback.import-style.min-height-arbitrary",pattern:"^min-h-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-height utilities (e.g. min-h-[180px]) to generated import-* fallback classes."},{id:"fallback.import-style.grid-rows-arbitrary",pattern:"^grid-rows-\\[[^\\]]+\\]$",summary:"Converts arbitrary grid template row utilities (e.g. grid-rows-[1fr_auto]) to generated import-* fallback classes."},{id:"fallback.import-style.size-scale",pattern:"^size-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts size scale/arbitrary utilities into width+height fallback declarations."},{id:"fallback.import-style.width-height-scale",pattern:"^[wh]-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts width/height scale and arbitrary utilities to import-* classes."},{id:"fallback.import-style.spacing",pattern:"^-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(.+)$",summary:"Converts spacing utilities to directional padding/margin fallback declarations, including responsive variants."},{id:"fallback.import-style.text-size",pattern:"^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$",summary:"Converts common text size utilities to import-* font-size declarations."},{id:"fallback.import-style.font-weight",pattern:"^font-(normal|medium|semibold|bold|extrabold|black)$",summary:"Converts common font weight utilities to import-* font-weight declarations."},{id:"fallback.import-style.leading-tracking",pattern:"^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|tighter|wide|wider|widest)$",summary:"Converts line-height and letter-spacing utilities to import-* declarations for typography fidelity."},{id:"fallback.import-style.bg-tokenized",pattern:"^bg-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind background color utilities by mapping families like blue/purple/green/red to PDS semantic tokens."},{id:"fallback.import-style.bg-semantic",pattern:"^bg-(primary|secondary|accent)$",summary:"Safeguards semantic background utilities by mapping bg-primary/bg-secondary/bg-accent to PDS color tokens."},{id:"fallback.import-style.text-tokenized",pattern:"^text-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind text color utilities by mapping common families to PDS semantic tokens."},{id:"fallback.import-style.rounded",pattern:"^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$",summary:"Safeguards rounded utilities (including rounded-t-sm) by mapping to PDS radius tokens."},{id:"fallback.import-style.overlay-alpha",pattern:"^bg-black\\/(\\d{1,3})$",summary:"Converts alpha black overlay classes (e.g. bg-black/50) to tokenized color-mix background overlays."},{id:"fallback.import-style.text-inverse",pattern:"^text-white$",summary:"Preserves white foreground intent for text-on-image use cases using inverse-compatible tokens."},{id:"fallback.import-style.bg-arbitrary",pattern:"^bg-\\[[^\\]]+\\]$",summary:"Converts arbitrary background colors to import-* fallback classes when values are CSS-safe."},{id:"fallback.import-style.text-arbitrary",pattern:"^text-\\[[^\\]]+\\]$",summary:"Converts arbitrary text colors to import-* fallback classes when values are CSS-safe."}]};var ie=globalThis.PDS,Dn="src/js/pds-live-manager/tailwind-conversion-rules.json",He=["base","sm","md","lg","xl","2xl"];function _n(r={}){let e=Array.isArray(r.ignoredPatterns)?r.ignoredPatterns.map(n=>({...n,pattern:n?.pattern instanceof RegExp?n.pattern:new RegExp(String(n?.pattern||""))})):[],t=Array.isArray(r.nonPdsClassPatterns)?r.nonPdsClassPatterns.map(n=>n instanceof RegExp?n:new RegExp(String(n||""))):[];return{...r,ignoredPatterns:e,nonPdsClassPatterns:t}}var H=_n(ur),gr=H.version||"tw2pds-layout-v4",Hn=new Map(H.directMappings.map(r=>[r.tw,r])),yt=new Map(Object.entries(H.gapScaleMap||{})),mr=new Map(Object.entries(H.maxWidthMap||{})),Un=H.nonPdsClassPatterns||[],qn=new Set(H.neverFallbackTags||[]),Gn={...H.importStyleRules||{}},Vn=H.tailwindSizeScale||{},vt=Array.isArray(H.tailwindShadeScale)?H.tailwindShadeScale.map(r=>String(r)).filter(Boolean):["50","100","200","300","400","500","600","700","800","900"],fr=vt.includes(String(H.defaultTailwindShade||""))?String(H.defaultTailwindShade):"500",_e=1.2,Jn=["container","grid","flex","gap","space","items","justify","content","place","self","col","row","w","h","min","max","p","m","rounded","border","ring","outline","shadow","bg","text","font","leading","tracking","uppercase","lowercase","capitalize","overflow","whitespace","truncate","object","aspect","opacity","blur","backdrop","transition","duration","ease","delay","animate","hidden","block","inline","absolute","relative","fixed","sticky","size"];function hr(r="",e=""){if(!r||!e)return r;let t=new RegExp(`\\s${e}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`,"gi");return String(r).replace(t,"")}function Yn(r="",e=null){let t=String(r||""),n=0;return t=t.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(input)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*?)>/gi,(o,a,i,s,c,d,p,l,u,g,f)=>{if(s!==g)return o;let h=hr(`${a||""}${c||""}`,"for"),m=`<${p}${l||""} id="${g}"${f||""}>`;return n+=1,`<label${h}>${d}${m}</label>`}),t=t.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(select|textarea)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*)>([\s\S]*?)<\/\6>/gi,(o,a,i,s,c,d,p,l,u,g,f,h)=>{if(s!==g)return o;let m=hr(`${a||""}${c||""}`,"for"),b=`<${p}${l||""} id="${g}"${f||""}>${h}</${p}>`;return n+=1,`<label${m}>${d}${b}</label>`}),e&&n>0&&(e.labelNestingCount+=n,I(e,`Nested ${n} label/control pairs.`),L(e,"intent.form.nested-label")),t}function Qn(r="",e="base"){let t=String(r||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rule";return`import-${e&&e!=="base"?`${e}-`:""}${t}`}function se(r,e,t,n="base",o=""){if(!r||!e||!t)return"";let a=Qn(e,n);if(o){let i=`${n}|${o}`;r.importPseudoStyles.has(i)||r.importPseudoStyles.set(i,new Map),r.importPseudoStyles.get(i).set(a,t)}else n==="base"?r.importBaseStyles.set(a,t):(r.importResponsiveStyles.has(n)||r.importResponsiveStyles.set(n,new Map),r.importResponsiveStyles.get(n).set(a,t));return r.importedStyleCount+=1,a}function ue(r=""){return String(r||"").trim().replace(/_/g," ")}function ge(r=""){return!r||/[;{}]/.test(r)?!1:/^[-#(),.%/\sa-zA-Z0-9]+$/.test(r)}function ze(r=""){let e=String(r||"").trim();if(!e)return null;let t=e.match(/^\[([^\]]+)\]$/);if(t){let n=ue(t[1]);return ge(n)?n:null}return Vn[e]||null}function Zn(r=""){let e=Number(r);if(!Number.isFinite(e))return fr;let t=String(e);return vt.includes(t)?t:vt.reduce((n,o)=>{let a=Math.abs(Number(n)-e);return Math.abs(Number(o)-e)<a?o:n},fr)}function Te(r="",e="500"){let t=String(r||"").toLowerCase(),n=Zn(e);return["blue","sky","indigo","cyan"].includes(t)?`var(--color-primary-${n})`:["purple","violet","fuchsia"].includes(t)?`var(--color-accent-${n})`:["green","emerald","lime","teal"].includes(t)?`var(--color-success-${n})`:["yellow","amber","warning"].includes(t)?`var(--color-warning-${n})`:["red","rose","pink","orange"].includes(t)?`var(--color-danger-${n})`:["slate","gray","zinc","neutral","stone"].includes(t)?`var(--color-gray-${n})`:""}function br(r=""){let e=ue(r);return ge(e)&&(/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(e)||/^(?:rgb|hsl)a?\([^)]*\)$/.test(e))?e:""}function X(r=""){return String(r||"").split(/\s+/).map(e=>e.trim()).filter(Boolean)}function Kn(r="",e=""){if(!e)return r;let t=String(r||""),n=t.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return`${t} class="${e}"`;let o=n[1]||'"',a=X(n[2]);a.includes(e)||a.push(e);let i=` class=${o}${a.join(" ")}${o}`;return t.replace(n[0],i)}function Xn(r="",e=""){return e?new RegExp(`\\s${e}\\s*=`,"i").test(String(r||"")):!1}function eo(r=""){let e=String(r||"").replace(/[-_]+/g," ").trim();return e?e.replace(/(^|\s)([a-z])/g,(t,n,o)=>`${n}${o.toUpperCase()}`):"Icon button"}function to(r="",e=null){let t=String(r||"");return t&&t.replace(/<(button|a)([^>]*)>\s*(<pds-icon\b[^>]*><\/pds-icon>)\s*<\/\1>/gi,(n,o,a,i)=>{let s=Kn(a,"icon-only");if(!Xn(s,"aria-label")){let c=String(i).match(/\sicon\s*=\s*(["'])(.*?)\1/i),d=c?String(c[2]||""):"",p=eo(d);s+=` aria-label="${p}"`}return e&&(e.intentHits+=1,L(e,"intent.component.button.icon-only-markup")),`<${o}${s}>${i}</${o}>`})}function ro(r="",e=null){let t=String(r||"");if(!t)return t;let n=0,o=t.replace(/<p([^>]*?)>([\s\S]*?)<\/p>/gi,(a,i,s)=>{let c=String(i||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!c)return a;let d=X(c[2]||""),p=d.some(u=>/^import-text-/.test(String(u||""))),l=d.includes("text-muted")||d.some(u=>/^import-font-/.test(String(u||"")));return!p||!l?a:(n+=1,`<div${i}>${s}</div>`)});return e&&n>0&&(e.intentHits+=1,L(e,"intent.typography.metric-paragraph-to-div"),I(e,`Normalized ${n} metric text paragraph tag(s) to div.`)),o}function $r(r="",e=""){if(!e)return r;let t=String(r||""),n=t.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return t;let o=n[1]||'"',a=X(n[2]).filter(s=>s!==e);if(a.length===0)return t.replace(n[0],"");let i=` class=${o}${a.join(" ")}${o}`;return t.replace(n[0],i)}function no(r="",e=t=>t){let t=String(r||""),n=t.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return t;let o=n[1]||'"',a=X(n[2]),i=e(Array.from(a)),s=Array.isArray(i)?i.filter(Boolean):a;if(s.length===0)return t.replace(n[0],"");let c=` class=${o}${s.join(" ")}${o}`;return t.replace(n[0],c)}function oo(r="",e=null){let t=String(r||"");if(!t)return t;let n=0,o=t.replace(/<(div|section|article|aside)([^>]*)>\s*<(p|div)([^>]*)>[\s\S]*?<\/\3>\s*<(p|div)([^>]*)>[\s\S]*?<\/\5>\s*<\/\1>/gi,(a,i,s,c,d,p,l)=>{let u=String(s||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!u||!X(u[2]).includes("stack-sm"))return a;let f=String(d||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i),h=String(l||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!f||!h)return a;let m=X(f[2]),b=X(h[2]);if(!(m.some(C=>/^import-text-/.test(String(C||"")))&&b.some(C=>/^import-text-/.test(String(C||"")))))return a;let k=$r(s,"stack-sm");return n+=1,a.replace(`<${i}${s}>`,`<${i}${k}>`)});return e&&n>0&&(e.intentHits+=1,L(e,"intent.typography.metric-pair-no-stack"),I(e,`Removed stack-sm from ${n} metric text pair container(s).`)),o}function ao(r={}){if(!r||typeof r!="object")return{};let e=r.typography;if(e&&typeof e=="object")return e;let t=r.design?.typography;return t&&typeof t=="object"?t:{}}function io(r={}){let e=ao(r),t=Number(e.fontScale);return Number.isFinite(t)?Math.max(1,Math.min(2,t)):_e}function so(r="",e=_e){let n={"4xl":1,"3xl":2,"2xl":3,xl:4}[r];if(!n)return"";let o=Number.isFinite(Number(e))?Math.max(1,Math.min(2,Number(e))):_e,a=Math.max(-1,Math.min(1,Math.round((o-_e)/.25))),i=n-a;return i<1?"h1":i>4?"":`h${i}`}function lo(r="",e=null,t={}){let n=String(r||"");if(!n)return n;let o=io(t.config||{}),a=0,i=0,s=n.replace(/<(p|div|span)([^>]*)>([\s\S]*?)<\/\1>/gi,(c,d,p,l)=>{let u=String(p||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!u)return c;let g=X(u[2]);if(!g.includes("import-font-bold"))return c;let h=g.find(C=>/^import-text-(?:4xl|3xl|2xl|xl)$/.test(String(C||"")))||"",m=h.match(/^import-text-(4xl|3xl|2xl|xl)$/);if(m){let C=so(m[1],o);if(!C)return c;let F=no(p,S=>S.filter(A=>A!=="import-font-bold"&&A!==h));return a+=1,`<${C}${F}>${l}</${C}>`}let b=/<\/?(?:div|p|section|article|aside|main|header|footer|ul|ol|li|table|tr|td|th|h[1-6])\b/i.test(l),w=/<\/?(?:strong|b)\b/i.test(l);if(b||w)return c;let k=$r(p,"import-font-bold");return i+=1,`<${d}${k}><strong>${l}</strong></${d}>`});return e&&(a>0&&(e.intentHits+=1,L(e,"intent.typography.semantic-heading-from-scale"),I(e,`Converted ${a} bold display text node(s) to semantic heading tags (fontScale=${Number(o).toFixed(2)}).`)),i>0&&(e.intentHits+=1,L(e,"intent.typography.bold-to-strong"),I(e,`Wrapped ${i} bold text node(s) in strong tags.`))),s}function co(r=[]){if(!Array.isArray(r)||r.length===0)return"";let e=r.filter(n=>!He.includes(n));if(e.length===0||e.length>1)return"";let t=e[0];return["hover","focus","active"].includes(t)?t:""}function yr(r,e="base",t=[]){let n=co(t),o=Gn[r];if(o)return{declaration:o,breakpoint:e,pseudo:n,ruleId:"fallback.import-style"};let a=String(r).match(/^gap-(\d+)$/);if(a){let v={0:"var(--spacing-0)",1:"var(--spacing-1)",2:"var(--spacing-2)",3:"var(--spacing-3)",4:"var(--spacing-4)",5:"var(--spacing-5)",6:"var(--spacing-6)",7:"var(--spacing-7)",8:"var(--spacing-8)",10:"var(--spacing-10)",12:"var(--spacing-12)"},x=Number(a[1]);if(v[x])return{declaration:`gap:${v[x]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.gap-scale"}}let i=String(r).match(/^(mt|mb|my)-(.+)$/);if(i){let v=i[1],x=i[2],z=ze(x);if(z){let T="";return v==="mt"?T=`margin-top:${z}`:v==="mb"?T=`margin-bottom:${z}`:T=`margin-top:${z};margin-bottom:${z}`,{declaration:T,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.margin-scale"}}}let s=String(r).match(/^min-w-\[([^\]]+)\]$/);if(s){let v=ue(s[1]);if(ge(v))return{declaration:`min-width:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.min-width-arbitrary"}}let c=String(r).match(/^max-w-\[([^\]]+)\]$/);if(c){let v=ue(c[1]);if(ge(v))return{declaration:`max-width:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.max-width-arbitrary"}}let d=String(r).match(/^min-h-\[([^\]]+)\]$/);if(d){let v=ue(d[1]);if(ge(v))return{declaration:`min-height:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.min-height-arbitrary"}}let p=String(r).match(/^grid-rows-\[([^\]]+)\]$/);if(p){let v=ue(p[1]);if(ge(v))return{declaration:`grid-template-rows:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.grid-rows-arbitrary"}}let l=String(r).match(/^size-(.+)$/);if(l){let v=ze(l[1]);if(v)return{declaration:`width:${v};height:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.size-scale"}}let u=String(r).match(/^w-(.+)$/);if(u){let v=ze(u[1]);if(v)return{declaration:`width:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.width-scale"}}let g=String(r).match(/^h-(.+)$/);if(g){let v=ze(g[1]);if(v)return{declaration:`height:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.height-scale"}}let f={xs:"var(--font-size-xs)",sm:"var(--font-size-sm)",base:"var(--font-size-md)",lg:"var(--font-size-lg)",xl:"var(--font-size-xl)","2xl":"var(--font-size-2xl)","3xl":"var(--font-size-3xl)","4xl":"var(--font-size-4xl)"},h=String(r).match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/);if(h)return{declaration:`font-size:${f[h[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-size"};let m={normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},b=String(r).match(/^font-(normal|medium|semibold|bold|extrabold|black)$/);if(b)return{declaration:`font-weight:${m[b[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.font-weight"};let w={none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2"},k=String(r).match(/^leading-(none|tight|snug|normal|relaxed|loose)$/);if(k)return{declaration:`line-height:${w[k[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.line-height"};let C={tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},F=String(r).match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);if(F)return{declaration:`letter-spacing:${C[F[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.tracking"};let S=String(r).match(/^bg-black\/(\d{1,3})$/);if(S)return{declaration:`background-color:color-mix(in srgb, var(--color-gray-900) ${Math.max(0,Math.min(100,Number(S[1])))}%, transparent)`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.overlay-alpha"};if(r==="text-white")return{declaration:"color:var(--color-gray-50)",breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-inverse"};let A=String(r).match(/^bg-(primary|secondary|accent)$/);if(A){let x={primary:"var(--color-primary-fill)",secondary:"var(--color-gray-500)",accent:"var(--color-accent-500)"}[A[1]];if(x)return{declaration:`background-color:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-semantic"}}let R=String(r).match(/^bg-([a-z]+)-(\d{2,3})$/);if(R){let v=Te(R[1],R[2]);if(v)return{declaration:`background-color:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-tokenized"}}let M=String(r).match(/^bg-\[([^\]]+)\]$/);if(M){let v=br(M[1]);if(v)return{declaration:`background-color:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-arbitrary"}}let E=String(r).match(/^text-([a-z]+)-(\d{2,3})$/);if(E){let v=Te(E[1],E[2]);if(v)return{declaration:`color:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-tokenized"}}let N=String(r).match(/^text-\[([^\]]+)\]$/);if(N){let v=br(N[1]);if(v)return{declaration:`color:${v}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-arbitrary"}}let $=String(r).match(/^rounded(?:-([trbl]{1,2}))?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if($){let v=$[1]||"",x=$[2]||"sm",z=x==="none"?"0":`var(--radius-${x})`,T={t:["top-left","top-right"],b:["bottom-left","bottom-right"],l:["top-left","bottom-left"],r:["top-right","bottom-right"],tl:["top-left"],tr:["top-right"],bl:["bottom-left"],br:["bottom-right"]};if(!v)return{declaration:`border-radius:${z}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.rounded"};let W=(T[v]||[]).map(U=>`border-${U}-radius:${z}`).join(";");if(W)return{declaration:W,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.rounded"}}return null}function De(r,e){return typeof r=="number"&&Number.isFinite(r)?`${r}px`:typeof r=="string"&&r.trim()?r.trim():`${e}px`}function po(r={}){let t=(r?.design&&typeof r.design=="object"?r.design:r)?.layout?.breakpoints||{};return{sm:De(t.sm,640),md:De(t.md,768),lg:De(t.lg,1024),xl:De(t.xl,1280)}}function uo(r,e){let t=Array.from(r.importBaseStyles.entries()).map(([a,i])=>`.${a}{${i};}`),n=[];for(let[a,i]of r.importResponsiveStyles.entries()){let s=e?.[a];if(!s||!i?.size)continue;let c=Array.from(i.entries()).map(([d,p])=>`.${d}{${p};}`).join(`
`);n.push(`@media (min-width: ${s}) {
${c}
}`)}for(let[a,i]of r.importPseudoStyles.entries()){let[s,c]=String(a).split("|");if(!c||!i?.size)continue;let d=Array.from(i.entries()).map(([l,u])=>`.${l}:${c}{${u};}`).join(`
`);if(!d)continue;if(s==="base"){n.push(d);continue}let p=e?.[s];p&&n.push(`@media (min-width: ${p}) {
${d}
}`)}let o=[...t,...n].filter(Boolean).join(`
`);return o.trim()?["/* pds-import: generated fallback styles for unmapped Tailwind utilities */",o].join(`
`):""}function go(r="",e=""){if(!e||!e.trim())return r;let t=`<style data-pds-import="tailwind-fallback">
${e}
</style>`;return/<head[^>]*>/i.test(r)?r.replace(/<head([^>]*)>/i,`<head$1>
${t}`):`${t}
${r}`}function vr(r=""){if(!r)return!1;if(r.includes(":")||r.includes("["))return!0;let e=r.split("-")[0];return Jn.includes(e)}function ee(r=""){let e=String(r).split(":");if(e.length===1)return{breakpoint:"base",base:e[0],variants:[]};let t=e[e.length-1],n=e.slice(0,-1);return{breakpoint:n.find(a=>He.includes(a))||"base",base:t,variants:n}}function mo(){return{totalTailwind:0,mapped:0,ignored:0,policySkipped:0,unknown:0,intentHits:0,unknownTokens:new Map,notes:[],appliedRules:new Set,importBaseStyles:new Map,importResponsiveStyles:new Map,importPseudoStyles:new Map,importedStyleCount:0,labelNestingCount:0,removedAtomicSpacingCount:0,removedAtomicPositioningCount:0}}function fo(r=""){let e=String(r||"").toLowerCase().replace(/\s+/g,""),t=e.includes("menu,ol,ul{list-style:none")||e.includes("ol,ul,menu{list-style:none")||e.includes("ul,ol,menu{list-style:none"),n=e.includes("a{color:inherit;text-decoration:inherit");return{listReset:t,anchorReset:n}}function ho(r=""){return String(r||"").toLowerCase().includes("cdn.tailwindcss.com")?{listReset:!0,anchorReset:!0}:{listReset:!1,anchorReset:!1}}function bo(r="",e=null){let t=String(r||""),n={listReset:!1,anchorReset:!1,strippedRuntimeCssBlocks:0,strippedRuntimeScripts:0};return t=t.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi,(o,a,i)=>{let s=String(i||"");if(!(/tailwindcss\s+v\d/i.test(s)||/\*\s*!\s*tailwindcss/i.test(s)))return o;let d=fo(s);return n.listReset=n.listReset||d.listReset,n.anchorReset=n.anchorReset||d.anchorReset,n.strippedRuntimeCssBlocks+=1,""}),t=t.replace(/<script([^>]*?)src\s*=\s*(?:(['"])([^"']*cdn\.tailwindcss\.com[^"']*)\2|([^\s>]*cdn\.tailwindcss\.com[^\s>]*))([^>]*)><\/script>/gi,(o,a,i,s,c)=>{let p=ho(s||c||"");return n.listReset=n.listReset||p.listReset,n.anchorReset=n.anchorReset||p.anchorReset,n.strippedRuntimeScripts+=1,""}),e&&(n.strippedRuntimeCssBlocks>0||n.strippedRuntimeScripts>0)&&(L(e,"intent.preflight.tailwind-runtime-detected"),n.strippedRuntimeCssBlocks>0&&I(e,`Detected and stripped ${n.strippedRuntimeCssBlocks} Tailwind runtime style block(s).`)),e&&n.strippedRuntimeScripts>0&&I(e,`Removed ${n.strippedRuntimeScripts} Tailwind CDN script reference(s).`),{html:t,hints:n}}function I(r,e){!r||!e||r.notes.includes(e)||r.notes.push(e)}function yo(r,e){let t=r.unknownTokens.get(e)||0;r.unknownTokens.set(e,t+1)}function vo(r={}){let t=(r?.design&&typeof r.design=="object"?r.design:r)?.layout?.utilities||{};return{grid:t.grid!==!1,flex:t.flex!==!1,spacing:t.spacing!==!1,container:t.container!==!1}}function V(r,e){return e?r?.[e]!==!1:!0}function xr(r){let e=String(r).match(/^grid-cols-(\d+)$/);return e?Number(e[1]):null}function wr(r={}){let e=He.map(o=>({bp:o,cols:r[o]})).filter(o=>Number.isFinite(o.cols));if(e.length<2)return null;if(e.length===2){let[o,a]=e;if(o.bp==="base"&&o.cols===1&&a.cols===2)return"grid-auto-lg";if(o.bp==="base"&&o.cols===1&&a.cols>=3)return null;if(o.cols<a.cols){if(a.cols>=4)return"grid-auto-md";if(a.cols>=2)return"grid-auto-lg"}return null}let t=!0;for(let o=1;o<e.length;o+=1)if(e[o].cols<=e[o-1].cols){t=!1;break}if(!t)return null;let n=e[e.length-1]?.cols||0;return n>=4?"grid-auto-md":n>=3?"grid-auto-sm":null}function xo(r=""){let e=String(r).match(/^text-(gray|slate|zinc|neutral|stone)-(\d{2,3})$/);if(!e)return"";let t=Number(e[2]);return Number.isFinite(t)&&t>=400&&t<=600?"text-muted":""}function wo(r="",e=0){return!r||!Number.isFinite(e)?"":{sm:{2:"sm:grid-cols-2"},md:{3:"md:grid-cols-3"},lg:{4:"lg:grid-cols-4"}}?.[r]?.[e]||""}function ko(r=""){let e=ee(r),n=String(e?.base||"").match(/^space-y-(\d+)$/);if(!n)return"stack-md";let o=Number(n[1]);return Number.isFinite(o)?o<=1?"stack-xs":o<=2?"stack-sm":o<=4?"stack-md":"stack-lg":"stack-md"}function So(r=new Set){return Array.from(r).some(e=>{let t=String(e||"");return/^gap-(?:xs|sm|md|lg|xl)$/.test(t)||/^gap-[0-9]+$/.test(t)||/^import-(?:sm-|md-|lg-|xl-)?gap-/.test(t)})}function $o(r=new Set){return Array.from(r).some(e=>/^stack-(?:xs|sm|md|lg|xl)$/.test(String(e||"")))}function Co(r=new Set){return Array.from(r).some(e=>{let t=String(e||"");return/^grid-cols-\d+$/.test(t)||/^grid-auto-(?:sm|md|lg|xl)$/.test(t)||/^(?:sm|md|lg|xl):grid-cols-\d+$/.test(t)||/^import-(?:sm-|md-|lg-|xl-)?grid-cols-\d+$/.test(t)})}function zo(r,e=12){return Array.from(r.unknownTokens.entries()).sort((t,n)=>n[1]-t[1]).slice(0,e).map(([t])=>t)}function L(r,e){!r||!e||r.appliedRules.add(e)}function re(r=[],e){return!Array.isArray(r)||!e?!1:r.some(t=>e.test(String(t)))}function Mo(r=[]){for(let e of r){let t=ee(e);if(t.breakpoint!=="base")continue;let n=String(t.base).match(/^h-(.+)$/);if(!n)continue;let o=ze(n[1]);if(!o||o==="auto")continue;let a=String(o).match(/^(-?\d+(?:\.\d+)?)rem$/);if(a){let i=Number(a[1]);if(Number.isFinite(i))return i*16}}return null}function To(r=[],e=""){let t=e==="button",n=re(r,/^bg-/),o=re(r,/^hover:bg-/),a=re(r,/^border/),i=re(r,/^shadow/),s=r.includes("cursor-pointer"),c=re(r,/^rounded/),d=re(r,/^(?:min-w|max-w|w)-/),p=re(r,/^text-(?:white|black|\[[^\]]+\]|[a-z]+-\d{2,3})$/),l=n||o||i;if(!(t||e==="a"&&(l||a||s||c&&d)))return{shouldNormalize:!1,variant:"none",size:"base",iconOnly:!1};let f="none";a&&!n&&!o?f="outline":(l||n&&p)&&(f="primary");let h=r.includes("rounded-full")&&(r.includes("p-2")||r.includes("p-1")||r.includes("p-2.5")),m=re(r,/^size-(?:6|7|8|9|10|11|12)$/),b=h||m,w=Mo(r),k=r.includes("text-sm")||r.includes("text-xs"),C=r.includes("text-lg")||r.includes("text-xl"),F="base";return w&&w<=40||k?F="sm":(w&&w>=48||C)&&(F="lg"),{shouldNormalize:!0,variant:f,size:F,iconOnly:b}}function Eo(r=""){let e=String(r||"").toLowerCase();return["green","emerald","lime","teal"].includes(e)?"badge-success":["blue","sky","cyan","indigo"].includes(e)?"badge-info":["yellow","amber","orange"].includes(e)?"badge-warning":["red","rose","pink"].includes(e)?"badge-danger":["gray","slate","zinc","neutral","stone"].includes(e)?"badge-secondary":["purple","violet","fuchsia","primary","accent"].includes(e)?"badge-primary":"badge-secondary"}function Ao(r=[],e="",t={shouldNormalize:!1}){if(t?.shouldNormalize)return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(["button","a","input","select","textarea"].includes(e))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(r.some(E=>/^badge(?:-|$)/.test(String(E))))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let n=r.map(E=>ee(E)).filter(E=>E.breakpoint==="base").map(E=>String(E.base)),o=n.some(E=>/^rounded(?:-|$)/.test(E)),a=n.some(E=>/^px-/.test(E)),i=n.some(E=>/^py-/.test(E)),s=a&&i,c=n.includes("text-xs")||n.includes("text-sm"),d=n.includes("text-lg")||n.includes("text-xl"),p=n.map(E=>E.match(/^bg-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),l=n.map(E=>E.match(/^text-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),u=n.map(E=>E.match(/^border-([a-z]+)-(\d{2,3})$/)).find(Boolean),g=Number(p?.[2]),f=Number(l?.[2]),h=!!(p&&Number.isFinite(g)&&g<=300),m=n.some(E=>/^border(?:-|$)/.test(E)),b=!!(p||l||u),w=[o,s,c,h||m].filter(Boolean).length;if(!(b&&w>=3))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let C=p&&p[1]||l&&l[1]||u&&u[1]||"",F=Eo(C),S=m&&!h,A=c?"badge-sm":d?"badge-lg":"",R=h?{family:C,bgShade:Number.isFinite(g)?g:200,textShade:Number.isFinite(f)?f:700}:null;return{shouldNormalize:!0,variantClass:R?"":F,outline:S,sizeClass:A,pastel:R}}function Fo(r="",e=0){let t=String(r||"").toLowerCase(),n=Number(e);return t==="white"?"surface-base":["gray","slate","zinc","neutral","stone"].includes(t)?Number.isFinite(n)&&n<=100?"surface-base":"surface-subtle":["blue","sky","cyan","indigo","primary","info"].includes(t)?"surface-info":["purple","violet","fuchsia","accent"].includes(t)?"surface-primary":["green","emerald","lime","teal","success"].includes(t)?"surface-success":["yellow","amber","orange","warning"].includes(t)?"surface-warning":["red","rose","pink","danger"].includes(t)?"surface-danger":"surface-base"}function Lo(r=[],e="",t={shouldNormalize:!1},n={shouldNormalize:!1}){if(t?.shouldNormalize||n?.shouldNormalize)return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(!new Set(["div","section","article","aside","li"]).has(e))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(r.some(m=>/^card(?:-|$)/.test(String(m))))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let a=r.map(m=>ee(m)).filter(m=>m.breakpoint==="base").map(m=>String(m.base)),i=a.some(m=>/^rounded(?:-|$)/.test(m)),s=a.some(m=>/^border(?:$|-)/.test(m)),c=a.some(m=>/^shadow(?:$|-)/.test(m)),d=a.some(m=>/^(?:p|px|py|pt|pb|pl|pr)-/.test(m)),p=a.map(m=>m.match(/^bg-([a-z]+)-?(\d{2,3})?$/)).find(Boolean),l=a.includes("bg-white")||!!p;if(!([i,s||c,l,d].filter(Boolean).length>=3))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let f="card-basic";c?f="card-elevated":s&&(f="card-outlined");let h="";return c?h="surface-elevated":p?h=Fo(p[1],p[2]):l&&(h="surface-base"),{shouldNormalize:!0,cardVariantClass:f,surfaceClass:h}}function Ro({tagName:r,originalClassValue:e,policy:t,summary:n,preflightHints:o={}}){if(qn.has(r))return L(n,"table.strict-tags.no-classes"),"";let a=String(e).split(/\s+/).filter(Boolean),i=To(a,r),s=Ao(a,r,i),c=Lo(a,r,i,s),d=/^h[1-6]$/.test(r),p=["i","svg"].includes(r)||a.some($=>/^fa(?:[a-z-]+)?$/i.test(String($||""))||/^fa-/.test(String($||""))),l=new Set,u={},g={},f=!1,h="",m="",b=!1,w="";a.forEach($=>{let v=ee($),x=v.base;if(Un.some(P=>P.test(x))){n.ignored+=1,L(n,"cleanup.non-pds-class");return}let z=vr($)||vr(x);if(z&&(n.totalTailwind+=1),/^space-y-/.test(x)){f=!0,h=h||$,m=m||ko($),n.ignored+=1,L(n,"layout.spacing.space-y-to-stack");return}if(/^space-x-/.test(x)){let P=String(x).match(/^space-x-(\d+)$/);if(P){let D=`gap-${P[1]}`,te=yt.get(D);if(te&&V(t,"spacing")){l.add(te),b=!0,w=w||$,n.mapped+=1,n.intentHits+=1,L(n,"layout.spacing.space-x-to-gap");return}}n.ignored+=1,L(n,"style.spacing.atomic");return}if(/^grid-cols-\d+$/.test(x)&&v.breakpoint!=="base"){let P=xr(x);if(Number.isFinite(P)&&V(t,"grid")){u[v.breakpoint]=P,n.mapped+=1,L(n,"intent.layout.responsive-grid-to-auto");return}if(!V(t,"grid")){n.policySkipped+=1,I(n,"Skipped responsive grid mapping because layout.utilities.grid=false.");return}}if(/^flex-(?:row|col)$/.test(x)&&v.breakpoint!=="base"){if(V(t,"flex")){g[v.breakpoint]=x,n.mapped+=1,L(n,"intent.layout.mobile-stack");return}n.policySkipped+=1,I(n,"Skipped responsive flex mapping because layout.utilities.flex=false.");return}if(/^grid-cols-\d+$/.test(x)&&v.breakpoint==="base"){let P=xr(x);Number.isFinite(P)&&V(t,"grid")&&(u.base=P)}let T=Hn.get(x);if(T&&v.breakpoint==="base"){if(!V(t,T.gate)){n.policySkipped+=1,I(n,`Skipped ${x} because layout.utilities.${T.gate}=false.`);return}T.pds.forEach(P=>{P&&l.add(P)}),n.mapped+=1,L(n,T.id);return}if(yt.has(x)&&v.breakpoint==="base"){if(!V(t,"spacing")){n.policySkipped+=1,I(n,"Skipped gap utility because layout.utilities.spacing=false.");return}l.add(yt.get(x)),n.mapped+=1,L(n,"layout.spacing.gap-scale");return}if(mr.has(x)&&v.breakpoint==="base"){if(!V(t,"container")){n.policySkipped+=1,I(n,"Skipped max-width utility because layout.utilities.container=false.");return}l.add(mr.get(x)),n.mapped+=1,L(n,"layout.container.max-width");return}if(i.shouldNormalize&&z){let P=String(x||"");if(v.breakpoint==="base"&&["flex-1","grow","flex-grow"].includes(P)){l.add("grow"),n.mapped+=1,n.intentHits+=1,L(n,"intent.component.button.layout-grow");return}if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(P)||P.startsWith("hover:")){n.ignored+=1,L(n,"intent.component.button.normalize");return}}if(d&&/^(?:text-(?:xs|sm|base|lg|xl|\dxl|white|black|\[[^\]]+\]|[a-z]+-\d{2,3})|font-|leading-|tracking-|uppercase|lowercase|capitalize)/.test(x)){n.ignored+=1,n.intentHits+=1,L(n,"intent.typography.heading-semantic");return}if(s.shouldNormalize&&z){let P=String(x||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(P)||P.startsWith("hover:")){n.ignored+=1,L(n,"intent.component.badge.normalize");return}}if(c.shouldNormalize&&z){let P=String(x||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)/.test(P)||P.startsWith("hover:")){n.ignored+=1,L(n,"intent.component.card.normalize");return}}let B=xo(x);if(B&&v.breakpoint==="base"){l.add(B),n.mapped+=1,n.intentHits+=1,L(n,"intent.typography.text-neutral-to-muted");return}if(/^text-(?:white|black|[a-z]+-\d{2,3}|\[[^\]]+\])$/.test(x)){if(p||r==="a"&&!i.shouldNormalize){let D=yr(x,v.breakpoint,v.variants);if(D){let te=se(n,`${r}-color-${x}`,D.declaration,D.breakpoint,D.pseudo);if(te){l.add(te),n.mapped+=1,n.intentHits+=1,L(n,p?"intent.icon.color-preserve":"intent.typography.link-active-preserve");return}}}n.ignored+=1,L(n,"style.color");return}let U=yr(x,v.breakpoint,v.variants);if(U){let P=se(n,x,U.declaration,U.breakpoint,U.pseudo);if(P){l.add(P),n.mapped+=1,n.intentHits+=1,L(n,U.ruleId),v.breakpoint!=="base"&&I(n,`Generated responsive import fallback for ${$}.`);return}}for(let P of H.ignoredPatterns)if(P.pattern.test(x)){n.ignored+=1,L(n,P.id),P.id==="style.spacing.atomic"&&(n.removedAtomicSpacingCount+=1),P.id==="style.positioning.atomic"&&(n.removedAtomicPositioningCount+=1);return}if(z){n.unknown+=1,yo(n,$);return}l.add($)}),f&&V(t,"spacing")&&(l.add(m||"stack-md"),n.mapped+=1,n.intentHits+=1,I(n,`Mapped ${h} to ${m||"stack-md"}.`)),b&&V(t,"spacing")&&I(n,`Mapped ${w} to gap utility.`);let k=wr(u);if(k&&V(t,"grid")?(l.delete("grid-cols-1"),l.delete("grid-cols-2"),l.delete("grid-cols-3"),l.delete("grid-cols-4"),l.delete("grid-cols-6"),l.add("grid"),l.add(k),n.intentHits+=1,L(n,"intent.layout.responsive-grid-to-auto"),I(n,`Collapsed responsive grid columns to ${k}.`)):V(t,"grid")&&He.filter(v=>v!=="base"&&Number.isFinite(u[v])).forEach(v=>{let x=u[v],z=wo(v,x);if(z){l.add("grid"),l.add(z),n.intentHits+=1,L(n,"intent.layout.responsive-grid-to-auto"),I(n,`Mapped ${v}:grid-cols-${x} to ${z}.`);return}let T=se(n,`grid-cols-${x}`,`grid-template-columns:repeat(${x}, minmax(0, 1fr))`,v);T&&(l.add("grid"),l.add(T),n.intentHits+=1,L(n,"fallback.import-style.grid-cols-responsive"),I(n,`Mapped ${v}:grid-cols-${x} to responsive import fallback for exact columns.`))}),V(t,"flex")&&a.includes("flex-col")&&(g.md==="flex-row"||g.lg==="flex-row")&&(l.delete("flex-col"),l.delete("flex-row"),l.add("mobile-stack"),n.intentHits+=1,L(n,"intent.layout.mobile-stack"),I(n,"Mapped flex-col + breakpoint flex-row to mobile-stack.")),(l.has("flex")||l.has("inline-flex"))&&V(t,"spacing")&&(So(l)||$o(l)||b||f||(l.add("gap-sm"),n.intentHits+=1,L(n,"layout.spacing.flex-min-gap"),I(n,"Added gap-sm fallback for flex container without explicit spacing."))),a.some($=>/^grid-cols-\d+$/.test(ee($).base))&&l.has("grid")&&!Co(l)){let $=wr(u);$?(l.add($),n.intentHits+=1,L(n,"intent.layout.responsive-grid-to-auto"),I(n,`Applied grid safety fallback ${$} to avoid bare grid output.`)):Number.isFinite(u.base)&&u.base>1?(l.add(`grid-cols-${u.base}`),n.intentHits+=1,L(n,"intent.layout.grid-safety-fallback"),I(n,`Applied grid safety fallback grid-cols-${u.base} to preserve explicit grid intent.`)):(l.add("mobile-stack"),n.intentHits+=1,L(n,"intent.layout.grid-safety-fallback.mobile-stack"),I(n,"Applied mobile-stack safety fallback to avoid bare grid output when explicit grid intent was present."))}let S=a.some($=>/^(?:bg-white|shadow|shadow-md|shadow-lg)$/.test($)),A=a.some($=>/^rounded/.test($));if(["div","section","article","li","aside"].includes(r)&&S&&A&&(l.add("card"),!l.has("surface-elevated")&&a.some($=>/^shadow/.test($))&&l.add("surface-elevated"),!l.has("surface-base")&&a.includes("bg-white")&&l.add("surface-base"),n.intentHits+=1,L(n,"intent.component.card")),r==="button"||r==="a"){let $=a.some(z=>/^bg-(?:[a-z]+-)?[4567]00$/.test(z))&&a.includes("text-white"),v=a.some(z=>/^border/.test(z))&&!$,x=a.includes("p-2")&&a.includes("rounded-full");$?(l.delete("surface-base"),l.delete("surface-elevated"),l.add("btn-primary"),n.intentHits+=1,L(n,"intent.component.button.primary")):v&&(l.add("btn-outline"),n.intentHits+=1,L(n,"intent.component.button.outline")),x&&(l.add("icon-only"),L(n,"intent.component.button.icon-only"))}if(i.shouldNormalize){for(let v of Array.from(l))String(v).startsWith("import-")&&l.delete(v);["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","surface-base","surface-elevated","surface-subtle","card"].forEach(v=>l.delete(v)),i.variant==="primary"?(l.add("btn-primary"),L(n,"intent.component.button.primary")):i.variant==="outline"&&(l.add("btn-outline"),L(n,"intent.component.button.outline")),i.size==="sm"?(l.add("btn-sm"),L(n,"intent.component.button.size-sm")):i.size==="lg"&&(l.add("btn-lg"),L(n,"intent.component.button.size-lg")),i.iconOnly&&(l.add("icon-only"),L(n,"intent.component.button.icon-only")),n.intentHits+=1,L(n,"intent.component.button.normalize")}if(s.shouldNormalize){for(let v of Array.from(l))String(v).startsWith("import-")&&l.delete(v);if(["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","grow","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","text-muted","surface-base","surface-elevated","surface-subtle","card"].forEach(v=>l.delete(v)),l.add("badge"),s.variantClass&&l.add(s.variantClass),s.outline&&l.add("badge-outline"),s.sizeClass&&l.add(s.sizeClass),s.pastel&&s.pastel.family){let v=Te(s.pastel.family,String(s.pastel.bgShade||200)),x=Te(s.pastel.family,String(s.pastel.textShade||700));if(v&&x){let z=`badge-pastel-${s.pastel.family}-${s.pastel.bgShade}-${s.pastel.textShade}`,T=se(n,z,`background-color:${v};color:${x}`,"base");T&&(l.add(T),L(n,"intent.component.badge.pastel-preserve"),I(n,`Preserved pastel badge tone using ${T}.`))}}n.intentHits+=1,L(n,"intent.component.badge.normalize"),I(n,"Normalized badge/pill utility cluster to PDS badge classes.")}if(c.shouldNormalize){for(let v of Array.from(l))String(v).startsWith("import-")&&l.delete(v);["surface-base","surface-subtle","surface-elevated","surface-sunken","surface-overlay","surface-inverse","surface-primary","surface-secondary","surface-success","surface-warning","surface-danger","surface-info","card-basic","card-elevated","card-outlined","card-interactive"].forEach(v=>l.delete(v)),l.add("card"),c.cardVariantClass&&l.add(c.cardVariantClass),c.surfaceClass&&l.add(c.surfaceClass),n.intentHits+=1,L(n,"intent.component.card.normalize"),I(n,"Normalized card utility cluster to PDS card/surface classes.")}if(r==="a"&&!i.shouldNormalize&&a.some(v=>v.includes("hover:text")||v==="transition-colors")){let v=se(n,"link-reset","text-decoration:none");v&&l.add(v),n.intentHits+=1,L(n,"intent.typography.link-treatment")}if(r==="footer"&&(l.has("surface-base")||a.some(v=>/^bg-/.test(v)))&&(l.delete("surface-base"),l.delete("surface-subtle"),l.add("surface-inverse"),n.intentHits+=1,L(n,"intent.surface.footer-inverse")),o?.listReset&&["ul","ol","menu"].includes(r)){let $=se(n,"list-reset","list-style:none;margin:0;padding:0");$&&(l.add($),n.intentHits+=1,L(n,"intent.preflight.list-reset"))}if(o?.anchorReset&&r==="a"&&!i.shouldNormalize){let $=se(n,"anchor-reset","color:inherit;text-decoration:inherit");$&&(l.add($),n.intentHits+=1,L(n,"intent.preflight.anchor-reset"))}let E=new Set(["div","section","article","aside","nav","main","header","footer","form","fieldset","ul","ol","li"]),N=a.some($=>{let v=ee($).base;return/^(?:flex|grid|container|gap-|space-[xy]-|items-|justify-|content-|place-|self-|w-|h-|min-|max-)/.test(v)});return l.size===0&&E.has(r)&&N&&(l.add("stack-sm"),I(n,`Added stack-sm fallback for <${r}> with unmapped classes.`)),Array.from(l).join(" ")}function Po(r="",e={}){let t=String(r||""),n=vo(e.config||{}),o=po(e.config||{}),a=mo(),i=bo(t,a),c=Yn(i.html,a).replace(/<([a-zA-Z][\w:-]*)([^>]*?)\sclass\s*=\s*(["'])(.*?)\3([^>]*)>/gs,(F,S,A,R,M,E)=>{let N=Ro({tagName:String(S||"").toLowerCase(),originalClassValue:M,policy:n,summary:a,preflightHints:i.hints}),$=String(N||"").trim();return $?`<${S}${A} class=${R}${$}${R}${E}>`:`<${S}${A}${E}>`}),d=lo(oo(ro(to(c,a),a),a),a,{config:e.config||{}}),p=uo(a,o),l=go(d,p);p&&I(a,`Generated ${a.importedStyleCount} import-* fallback style mappings.`),(a.removedAtomicSpacingCount>0||a.removedAtomicPositioningCount>0)&&I(a,`Removed atomic utilities by policy: spacing=${a.removedAtomicSpacingCount}, positioning=${a.removedAtomicPositioningCount}.`);let u=zo(a,16),g=a.mapped+a.ignored+a.policySkipped,f=a.totalTailwind>0?g/a.totalTailwind:1,h=a.totalTailwind>0?a.unknown/a.totalTailwind:0,m=.42+f*.45+Math.min(a.intentHits,4)*.025-h*.18,b=Math.max(.15,Math.min(.96,Number(m.toFixed(2)))),w=[`pds-import: rulebook=${gr} confidence=${Math.round(b*100)}%`,`pds-import: tailwind=${a.totalTailwind} mapped=${a.mapped} ignored=${a.ignored} policySkipped=${a.policySkipped} unknown=${a.unknown}`];u.length&&w.push(`pds-import: unknown-tailwind=${u.join(", ")}`),a.notes.length&&w.push(`pds-import: notes=${a.notes.join(" | ")}`);let k=`<!-- ${w.join(` -->
<!-- `)} -->
${l}`,C=[];return a.unknown>0&&C.push({severity:"warning",message:`Converted with ${a.unknown} unknown Tailwind utilities requiring manual review.`}),a.policySkipped>0&&C.push({severity:"info",message:`Skipped ${a.policySkipped} utility mappings due to PDS config policy.`}),u.length&&C.push({severity:"info",message:`Top unknown utilities: ${u.slice(0,8).join(", ")}`}),{html:k,confidence:b,issues:C,meta:{rulebookVersion:gr,coverage:{tailwind:a.totalTailwind,mapped:a.mapped,ignored:a.ignored,policySkipped:a.policySkipped,unknown:a.unknown,importedStyles:a.importedStyleCount,nestedLabelPairs:a.labelNestingCount},unknownTailwindTokens:u,notes:a.notes,appliedRules:Array.from(a.appliedRules),policy:n,importStyleSheetInjected:!!p,breakpoints:o}}}function No(){return{rulesJsonPath:Dn,...H,directMappings:H.directMappings.map(r=>({id:r.id,tw:r.tw,pds:r.pds,gate:r.gate||null})),ignoredPatterns:H.ignoredPatterns.map(r=>({id:r.id,pattern:String(r.pattern),reason:r.reason}))}}function Io(r){let e=String(r||"").match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);return e?e[0]:null}function Bo(r){return String(r||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Cr(r){return/<\s*[a-z][^>]*>/i.test(String(r||""))}function jo(r){let e=String(r||"").trim().toLowerCase();if(!e)return null;let t=Number.parseFloat(e);return Number.isFinite(t)?e.endsWith("rem")||e.endsWith("em")?t*16:e.endsWith("px")||/^[0-9.\-]+$/.test(e)?t:null:null}function Q(r){let e=String(r||"").trim();if(!e)return"";let t=e.match(/#(?:[0-9a-f]{3,8})\b/i);if(t)return t[0].toLowerCase();let n=e.match(/rgba?\([^)]*\)/i);if(n)return n[0];let o=e.match(/hsla?\([^)]*\)/i);return o?o[0]:""}function Oo(r=""){let e=String(r||"").trim();if(!e||typeof window>"u"||typeof document>"u")return"";let t=document.documentElement;if(!t)return"";let n=window.getComputedStyle(t);return String(n.getPropertyValue(e)||"").trim()}function Wo(r=""){let e=String(r||"").trim(),t=Q(e);if(t)return t;let n=e.match(/var\(\s*(--[^\s,)]+)\s*(?:,[^)]+)?\)/i);if(!n)return"";let o=Oo(n[1]);return Q(o)}function Do(r=""){let e=String(r||"").trim();if(!e)return"";let t=e.split(":").pop()||e;if(t==="bg-white")return"#ffffff";if(t==="bg-black")return"#000000";let n=t.match(/^bg-black\/(\d{1,3})$/i);if(n)return`rgba(0,0,0,${Math.max(0,Math.min(100,Number(n[1])))/100})`;let o=t.match(/^bg-\[([^\]]+)\]$/i);if(o)return Q(o[1]);let a=t.match(/^bg-([a-z]+)-(\d{2,3})$/i);if(!a)return"";let i=Te(a[1],a[2]);return i?Wo(i):""}function kr(r=""){return String(r||"").split(/\s+/).map(t=>t.trim()).filter(Boolean).map(t=>Do(t)).filter(Boolean)}function _o(r=""){let e=[],t=String(r||""),n=/([^{}]+)\{([^{}]*)\}/g,o=n.exec(t);for(;o;){let a=String(o[1]||"").trim(),i=String(o[2]||"").trim();a&&i&&e.push({selector:a,body:i}),o=n.exec(t)}return e}function Ho(r=""){let e=String(r||"").toLowerCase();return e?/(^|\s|,)(html|body|:root|main)(\s|,|$)|#app\b|#root\b|\.app\b|\.page\b/.test(e):!1}function Uo(r=""){let e=String(r||"").trim().match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)/i);if(!e)return null;let t=Number.parseFloat(e[1]),n=Number.parseFloat(e[2]),o=Number.parseFloat(e[3]),a=e[4]==null?1:Number.parseFloat(e[4]);return[t,n,o,a].every(i=>Number.isFinite(i))?{r:Math.max(0,Math.min(255,t)),g:Math.max(0,Math.min(255,n)),b:Math.max(0,Math.min(255,o)),a:Math.max(0,Math.min(1,a))}:null}function qo(r=""){let e=String(r||"").trim().match(/^#([0-9a-f]{3,8})$/i);if(!e)return null;let t=e[1].toLowerCase();if(t.length===3){let[n,o,a]=t.split("");return{r:Number.parseInt(`${n}${n}`,16),g:Number.parseInt(`${o}${o}`,16),b:Number.parseInt(`${a}${a}`,16),a:1}}return t.length===6||t.length===8?{r:Number.parseInt(t.slice(0,2),16),g:Number.parseInt(t.slice(2,4),16),b:Number.parseInt(t.slice(4,6),16),a:t.length===8?Number.parseInt(t.slice(6,8),16)/255:1}:null}function zr(r=""){let e=Q(r);return e?e.startsWith("#")?qo(e):e.startsWith("rgb")?Uo(e):null:null}function Go(r){if(!r)return null;let e=a=>{let i=Number(a)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4},t=e(r.r),n=e(r.g),o=e(r.b);return .2126*t+.7152*n+.0722*o}function Sr(r=""){let e=String(r||"").trim().toLowerCase();if(!e||e==="transparent")return!0;let t=zr(e);return t&&Number.isFinite(t.a)?t.a<=.04:!1}function Vo(r=[],e=[]){let t=r.map(c=>Q(c)).filter(c=>c&&!Sr(c)),n=Me(t);if(n)return{color:n,source:"root"};let o=e.map(c=>Q(c)).filter(c=>c&&!Sr(c)),a=o.filter(c=>{let d=zr(c),p=Go(d);return Number.isFinite(p)?p>=.72:!1}),i=Me(a);if(i)return{color:i,source:"fallback-bright"};let s=Me(o);return s?{color:s,source:"fallback"}:{color:"",source:"none"}}function pe(r,e=new Map){let t=String(r||""),n=/([a-z-]+)\s*:\s*([^;{}]+)/gi,o=n.exec(t);for(;o;){let a=String(o[1]||"").trim().toLowerCase(),i=String(o[2]||"").trim();a&&i&&(e.has(a)||e.set(a,[]),e.get(a).push(i)),o=n.exec(t)}return e}function Jo(r=""){let e=String(r||""),t=new Map,n=[],o=[],a=[],i=[],s=[],c=[],d=[],p=/#(?:[0-9a-f]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi,l=u=>{(String(u||"").match(p)||[]).forEach(f=>{let h=Q(f);h&&n.push(h)})};if(typeof DOMParser<"u"&&Cr(e))try{let g=new DOMParser().parseFromString(e,"text/html");Array.from(g.querySelectorAll("style")).map(k=>k.textContent||"").forEach(k=>{pe(k,t),l(k),_o(k).forEach(C=>{if(!Ho(C.selector))return;let F=pe(C.body,new Map),S=J(F,["background","background-color"]).map(A=>Q(A)).filter(Boolean);o.push(...S)})}),Array.from(g.querySelectorAll("[style]")).forEach(k=>{let C=k.getAttribute("style")||"";pe(C,t),l(C)}),["html","body","main","#app","#root",".app",".page"].forEach(k=>{let C=g.querySelector(k);if(!C)return;let F=C.getAttribute("style")||"";if(!F)return;let S=pe(F,new Map),A=J(S,["background","background-color"]).map(M=>Q(M)).filter(Boolean);o.push(...A);let R=kr(C.getAttribute("class")||"");a.push(...R)}),Array.from(g.querySelectorAll("[class]")).forEach(k=>{let C=X(k.getAttribute("class")||"");c.push(...C);let F=kr(k.getAttribute("class")||"");i.push(...F);let S=String(k.tagName||"").toLowerCase(),A=S==="button"||S==="a",R=C.some(M=>/^bg-/.test(String(ee(M).base||"")));A&&R&&F.length&&s.push(...F)});let w=g.body?.textContent||"";w.trim()&&d.push(w),l(g.documentElement?.outerHTML||e)}catch{pe(e,t),l(e),d.push(e)}else pe(e,t),l(e),d.push(e);return{declarations:t,colorValues:n,rootBackgroundColors:o,rootClassBackgroundColors:a,classBackgroundColors:i,buttonBackgroundColors:s,classTokens:c,textCorpus:d.join(`
`)}}function Me(r=[]){let e=new Map;r.forEach(o=>{let a=String(o||"").trim();a&&e.set(a,(e.get(a)||0)+1)});let t="",n=-1;return e.forEach((o,a)=>{o>n&&(t=a,n=o)}),t}function J(r,e=[]){return e.flatMap(t=>r.get(t)||[])}function Yo(r,e){if(!r||!e)return null;let t=String(e).split(".").filter(Boolean),n=r;for(let o of t){if(!n||n.type!=="object"||!n.properties||typeof n.properties!="object")return null;n=n.properties[o]}return n||null}function Qo(r={}){let e=r&&typeof r=="object"?r:{},t=ie?.configRelations&&typeof ie.configRelations=="object"?ie.configRelations:{},n=new Set(Object.keys(t)),o=null;if(typeof ie?.buildConfigFormSchema=="function")try{o=ie.buildConfigFormSchema(e)?.schema||null}catch{o=null}return!o&&ie?.configFormSchema?.schema&&(o=ie.configFormSchema.schema),{design:e,schema:o,allowedPaths:n}}function Zo(r,e){if(!r)return e;if(Array.isArray(r.oneOf)&&r.oneOf.length){let t=r.oneOf.map(n=>n?.const).filter(n=>n!=null);if(t.length){if(typeof e=="string"){let n=t.find(o=>String(o).toLowerCase()===e.toLowerCase());if(n!==void 0)return n}if(typeof e=="number"){let n=t.map(o=>Number(o)).filter(o=>Number.isFinite(o));if(n.length)return n.reduce((o,a)=>Math.abs(a-e)<Math.abs(o-e)?a:o,n[0])}return t[0]}}if(r.type==="number"||r.type==="integer"){let t=Number(e);return Number.isFinite(t)?r.type==="integer"?Math.round(t):t:void 0}return r.type==="boolean"?!!e:r.type==="string"?String(e||"").trim():e}function Ko(r,e,t){let n=String(e||"").split(".").filter(Boolean);if(!n.length)return;let o=r;for(let a=0;a<n.length;a+=1){let i=n[a];if(a===n.length-1){o[i]=t;return}(!o[i]||typeof o[i]!="object"||Array.isArray(o[i]))&&(o[i]={}),o=o[i]}}function O(r,e,t){if(t==null||t===""||r.allowedPaths.size&&!r.allowedPaths.has(e))return;let n=Yo(r.schema,e),o=Zo(n,t);o==null||o===""||(Ko(r.patch,e,o),r.inferredPaths.add(e))}function le(r=[]){let e=r.map(n=>jo(n)).filter(n=>Number.isFinite(n));if(!e.length)return null;e.sort((n,o)=>n-o);let t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}function Xo(r=[]){let e=r.map(t=>String(t||"").split(",")[0]||"").map(t=>t.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean);return Me(e)}function ea(r){let e=Number(r);return Number.isFinite(e)?e<=.75?"hairline":e<=1.5?"thin":e<=2.5?"medium":"thick":"thin"}function ta(r=""){let t=String(ee(r).base||"").toLowerCase().match(/^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(!t)return null;let n=t[1]||"DEFAULT",o={none:0,xs:2,sm:4,DEFAULT:6,md:8,lg:12,xl:16,"2xl":24,"3xl":32};return n==="full"?null:Number.isFinite(o[n])?o[n]:null}function ra(r=[]){let e=r.map(n=>ta(n)).filter(n=>Number.isFinite(n));if(!e.length)return null;e.sort((n,o)=>n-o);let t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}function xt(r={}){let e=String(r.html||"");if(!e.trim())return j({source:"html-inference",type:String(r.sourceType||"design-inference"),confidence:0,issues:[{severity:"warning",message:"No HTML or guideline text provided for design extraction."}],designPatch:{},meta:{extractedPathCount:0,extractedPaths:[]}});let t=Qo(r.config||{}),n=Jo(e),o={patch:{},inferredPaths:new Set,allowedPaths:t.allowedPaths,schema:t.schema},a=J(n.declarations,["color"]).map(q=>Q(q)).filter(Boolean),i=J(n.declarations,["background","background-color"]).map(q=>Q(q)).filter(Boolean),s=[...i,...a,...n.colorValues].filter(Boolean),c=Array.from(new Set(s)),d=[...n.rootBackgroundColors||[]],p=[...n.rootClassBackgroundColors||[]],l=d.length?d:p,u=[...i,...n.classBackgroundColors||[]],g=Vo(l,u),f=g.color;O(o,"colors.background",f||i[0]||c[0]);let h=c.filter(q=>q&&q!==f),b=Me(n.buttonBackgroundColors||[])||h[0]||c[0],w=h.filter(q=>q&&q!==b);O(o,"colors.primary",b),O(o,"colors.secondary",w[0]||b||c[0]),O(o,"colors.accent",w[1]||w[0]||b||c[0]);let k=J(n.declarations,["font-family"]),C=Xo(k);O(o,"typography.fontFamilyBody",C),O(o,"typography.fontFamilyHeadings",C),O(o,"typography.fontFamilyMono",/mono|code/i.test(n.textCorpus)?"JetBrains Mono":"");let F=J(n.declarations,["font-size"]),S=le(F);O(o,"typography.baseSize",S);let A=J(n.declarations,["padding","padding-top","padding-right","padding-bottom","padding-left","margin","margin-top","margin-right","margin-bottom","margin-left","gap","row-gap","column-gap"]),R=le(A);O(o,"spatialRhythm.baseUnit",R),O(o,"spatialRhythm.inputPadding",R),O(o,"spatialRhythm.buttonPadding",R);let M=J(n.declarations,["border-radius"]),E=le(M)||ra(n.classTokens||[]);O(o,"shape.radiusSize",E);let N=J(n.declarations,["border-width","border-top-width","border-right-width","border-bottom-width","border-left-width"]),$=le(N);O(o,"shape.borderWidth",ea($));let v=J(n.declarations,["max-width"]),x=le(v);O(o,"layout.containerMaxWidth",x),O(o,"layout.maxWidth",x);let z=J(n.declarations,["min-height","height"]),T=le(z);O(o,"layout.buttonMinHeight",T),O(o,"layout.inputMinHeight",T);let B=J(n.declarations,["transition-duration"]),W=le(B.map(q=>{let me=String(q||"").trim().toLowerCase(),ne=Number.parseFloat(me);return Number.isFinite(ne)?me.endsWith("ms")?ne:me.endsWith("s")?ne*1e3:ne:null}));O(o,"behavior.transitionSpeed",W);let P=J(n.declarations,["box-shadow"]).length>0;O(o,"layers.baseShadowOpacity",P?.2:.08);let D=Array.from(o.inferredPaths),te=D.reduce((q,me)=>{let ne=me.split(".")[0];return q[ne]=(q[ne]||0)+1,q},{}),Pr=D.length?Math.min(.92,.35+D.length*.02):.25;return j({source:"html-inference",type:String(r.sourceType||"design-inference"),confidence:Pr,issues:D.length?[]:[{severity:"warning",message:"Could not infer enough design signals from input."}],designPatch:o.patch,meta:{extractedPathCount:D.length,extractedPaths:D,categoryCoverage:te,colorSampleSize:c.length,backgroundInference:{source:g.source,candidates:{root:l.length,declaration:i.length,classBased:(n.classBackgroundColors||[]).length}}}})}function Mr(r={}){let e=String(r.input||"").trim(),t=String(r.sourceType||"unknown");if(!e)return j({source:t,type:t,confidence:0,issues:[{severity:"error",message:"No input provided."}],meta:{conversionMode:"none"}});if(Cr(e)){let n=Ue({html:e,config:r.config||{}});return j({source:t,type:t,confidence:n.confidence,issues:n.issues,template:n.template,meta:{...n.meta||{},conversionMode:"html-to-pds"}})}return j({source:t,type:t,confidence:.48,issues:[{severity:"info",message:"Input is not HTML; generated text-based preview template."}],template:{id:`${t}-text-import`,name:"Imported Guideline Text",html:`<article class="card surface-base stack-sm"><h3>Imported Guidelines</h3><pre>${Bo(e)}</pre></article>`},meta:{conversionMode:"text-preview"}})}function Ue(r={}){let e=String(r.html||"").trim();if(!e)return j({source:"tailwind",type:"tailwind-html",confidence:0,issues:[{severity:"error",message:"No HTML provided."}]});let t=Po(e,{config:r.config||{}});return j({source:"tailwind",type:"tailwind-html",confidence:t.confidence,issues:t.issues,template:{id:"tailwind-import",name:"Converted Tailwind Markup",html:t.html},meta:t.meta})}function wt(r={}){let e=String(r.text||"").trim();if(!e)return j({source:"brand",type:"brand-guidelines",confidence:0,issues:[{severity:"error",message:"No brand guideline text provided."}]});let t=Io(e),n={colors:{},typography:{}},o=[];return t?n.colors.primary=t:o.push({severity:"warning",message:"No HEX color found; primary color was not inferred."}),/serif/i.test(e)&&(n.typography.fontFamilyBody="Georgia, serif"),/sans[-\s]?serif/i.test(e)&&(n.typography.fontFamilyBody="Inter, Arial, sans-serif"),/mono|monospace/i.test(e)&&(n.typography.fontFamilyMono="JetBrains Mono, monospace"),j({source:"brand",type:"brand-guidelines",confidence:t?.68:.52,issues:o,designPatch:n,meta:{inferred:{primaryColor:t}}})}var kt="convert-only",Tr="adopt-design-and-convert";function na(r){return String(r||"").trim().toLowerCase()===Tr?Tr:kt}function Er(...r){let e=r.flat().filter(Boolean);if(!e.length)return[];let t=new Set;return e.filter(n=>{let o=`${String(n?.severity||"info")}::${String(n?.path||"")}::${String(n?.message||"")}`;return t.has(o)?!1:(t.add(o),!0)})}function Ar(r=[]){let e=r.map(t=>Number(t)).filter(t=>Number.isFinite(t));return e.length?Math.max(0,Math.min(1,e.reduce((t,n)=>t+n,0)/e.length)):0}function Ee(r={},e={}){return{...r&&typeof r=="object"?r:{},...e&&typeof e=="object"?e:{}}}function Rr(r={},e={}){if(!e||typeof e!="object")return r;let t=Array.isArray(r)?[...r]:{...r};return Object.entries(e).forEach(([n,o])=>{o&&typeof o=="object"&&!Array.isArray(o)?t[n]=Rr(t[n]&&typeof t[n]=="object"?t[n]:{},o):t[n]=o}),t}function Fr(r){if(typeof structuredClone=="function")try{return structuredClone(r)}catch{}return JSON.parse(JSON.stringify(r||{}))}function oa(r={}){let e=Number(r?.ratio),t=Number(r?.min),n=Number.isFinite(e)?e.toFixed(2):"n/a",o=Number.isFinite(t)?t.toFixed(2):"n/a";return{severity:"error",path:String(r?.path||"/colors"),message:`${String(r?.message||"Color contrast validation failed.")} (ratio=${n}, required=${o})`}}function Lr(r={},e={},t={}){if(!(e&&typeof e=="object"?Object.keys(e):[]).length)return{ok:!0,blocked:!1,issues:[],report:{ok:!0,issues:[]}};let o=Number(t.minContrast),a=Number.isFinite(o)?o:4.5,i=Rr(Fr(r||{}),Fr(e||{})),s=Bt(i,{minContrast:a,minMutedContrast:3,extendedChecks:!0}),c=Array.isArray(s?.issues)?s.issues.map(d=>oa(d)):[];return{ok:!!s?.ok,blocked:!s?.ok,issues:c,report:{ok:!!s?.ok,minContrast:a,issues:Array.isArray(s?.issues)?s.issues:[]}}}function aa(){return[{id:"template",name:"Templates"},{id:"tailwind-html",name:"Tailwind HTML"},{id:"brand-guidelines",name:"Brand Guidelines"},{id:"figma-json",name:"Figma Tokens JSON (planned)"},{id:"ux-pilot",name:"UX Pilot (planned)"},{id:"google-stitch",name:"Google Stitch (planned)"}]}async function ia(r={}){let e=String(r.sourceType||""),t=na(r.importMode),n=String(r.input||""),o=r.config||null;if(e==="template"){let a=pr(r.templateId,r);return a.meta=Ee(a.meta,{importMode:t}),a}if(e==="tailwind-html"){let a=Ue({html:n,config:o});if(t===kt)return a.meta=Ee(a.meta,{importMode:t}),a;let i=xt({html:n,config:o,sourceType:e}),s=Lr(o||{},i.designPatch||{}),c=s.blocked?{}:i.designPatch,d=s.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...s.issues]:[];return j({source:a.source||"tailwind",type:e,confidence:Ar([a.confidence,i.confidence]),issues:Er(a.issues,i.issues,d),template:a.template,designPatch:c,meta:Ee(a.meta,{importMode:t,inference:i.meta,validation:s.report,validationBlocked:s.blocked})})}if(e==="brand-guidelines"){let a=Mr({input:n,sourceType:e,config:o});if(t===kt)return a.meta=Ee(a.meta,{importMode:t}),a;let i=wt({text:n}),s=xt({html:n,config:o,sourceType:e}),c={...i.designPatch&&typeof i.designPatch=="object"?i.designPatch:{},...s.designPatch&&typeof s.designPatch=="object"?s.designPatch:{}},d=Lr(o||{},c||{}),p=d.blocked?{}:c,l=d.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...d.issues]:[];return j({source:"brand",type:e,confidence:Ar([a.confidence,i.confidence,s.confidence]),issues:Er(a.issues,i.issues,s.issues,l),template:a.template,designPatch:p,meta:Ee(a.meta,{importMode:t,inference:s.meta,brandHeuristics:i.meta,validation:d.report,validationBlocked:d.blocked})})}return e==="figma-json"||e==="ux-pilot"||e==="google-stitch"?j({source:e,type:e,confidence:0,issues:[{severity:"info",message:`${e} adapter is not implemented yet in this phase.`}],meta:{importMode:t}}):j({source:e||"unknown",type:"unknown",confidence:0,issues:[{severity:"error",message:"Unsupported import source type."}],meta:{importMode:t}})}var sa="pds-live-import-history";var K="imports",qe=null;function la(){return typeof globalThis<"u"&&typeof globalThis.indexedDB<"u"}function Z(r){return typeof r=="string"?r:""}function Ge(r){return Array.isArray(r)?r:[]}function Ve(r){return r&&typeof r=="object"?r:{}}function Je(){return la()?qe||(qe=new Promise((r,e)=>{let t=globalThis.indexedDB.open(sa,1);t.onupgradeneeded=()=>{let n=t.result;if(!n.objectStoreNames.contains(K)){let o=n.createObjectStore(K,{keyPath:"id",autoIncrement:!0});o.createIndex("createdAt","createdAt",{unique:!1}),o.createIndex("sourceType","sourceType",{unique:!1}),o.createIndex("fileName","fileName",{unique:!1})}},t.onsuccess=()=>r(t.result),t.onerror=()=>e(t.error||new Error("Failed to open import history database."))}),qe):Promise.resolve(null)}function Ye(r){return new Promise((e,t)=>{r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error||new Error("IndexedDB operation failed."))})}function ca(r={}){let e=Date.now(),t=Number.isFinite(Number(r.createdAt))?Number(r.createdAt):e,n=new Date(t).toISOString(),o=Ge(r.issues).map(c=>({severity:Z(c?.severity||"info"),message:Z(c?.message||"")})),a=Ge(r.notes).filter(c=>typeof c=="string"),i=Ge(r.unknownTailwindTokens).filter(c=>typeof c=="string"),s=Ge(r.appliedRules).filter(c=>typeof c=="string");return{createdAt:t,createdAtIso:n,sourceType:Z(r.sourceType||"unknown"),importMode:Z(r.importMode||"convert-only"),source:Z(r.source||"unknown"),type:Z(r.type||"unknown"),fileName:Z(r.fileName||""),fileSize:Number.isFinite(Number(r.fileSize))?Number(r.fileSize):0,mimeType:Z(r.mimeType||""),fileContents:Z(r.fileContents||""),convertedHtml:Z(r.convertedHtml||""),confidence:Number.isFinite(Number(r.confidence))?Number(r.confidence):0,notes:a,issues:o,coverage:Ve(r.coverage),unknownTailwindTokens:i,appliedRules:s,importStyleSheetInjected:!!r.importStyleSheetInjected,templateName:Z(r.templateName||""),designPatch:Ve(r.designPatch),meta:Ve(r.meta),resultSnapshot:Ve(r.resultSnapshot)}}async function da(r={}){let e=await Je();if(!e)return null;let t=ca(r),o=e.transaction(K,"readwrite").objectStore(K);return{id:await Ye(o.add(t)),...t}}async function pa(r={}){let e=await Je();if(!e)return[];let t=Number.isFinite(Number(r.limit))?Math.max(1,Number(r.limit)):30,o=e.transaction(K,"readonly").objectStore(K);return(await Ye(o.getAll())||[]).sort((i,s)=>Number(s?.createdAt||0)-Number(i?.createdAt||0)).slice(0,t)}async function ua(r){let e=await Je();if(!e)return null;let t=Number(r);if(!Number.isFinite(t))return null;let o=e.transaction(K,"readonly").objectStore(K);return await Ye(o.get(t))||null}async function ga(){let r=await Je();if(!r)return;let t=r.transaction(K,"readwrite").objectStore(K);await Ye(t.clear())}export{ga as clearLiveImportHistory,wt as convertBrandGuidelinesToPatch,Ue as convertTailwindHtmlToPds,j as createImportResult,No as describeTailwindConversionRules,ua as getLiveImportHistoryEntry,aa as getLiveImportSources,Fn as isImportResult,pa as listLiveImportHistory,dr as listLiveTemplates,Vt as loadGoogleFont,We as loadLiveTemplateCatalog,ia as runLiveImport,da as saveLiveImportHistory,Tn as startLive};
