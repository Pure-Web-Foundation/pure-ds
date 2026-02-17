var qe=Object.defineProperty;var D=(o,t)=>()=>(o&&(t=o(o=0)),t);var U=(o,t)=>{for(var e in t)qe(o,e,{get:t[e],enumerable:!0})};var xe={};U(xe,{enums:()=>g});var g,G=D(()=>{g={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"},IconSizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64,"3xl":96}}});var $e={};U($e,{default:()=>Xe,findComponentForElement:()=>Je,getAllSelectors:()=>Ye,getAllTags:()=>Ke,getByCategory:()=>Ze,ontology:()=>M,searchOntology:()=>Qe});function j(o,t){if(!o||!t)return!1;try{return o.matches(t)}catch{return!1}}function Se(o,t){if(!o||!t||!o.closest)return null;try{return o.closest(t)}catch{return null}}function Je(o,{maxDepth:t=5}={}){if(!o||o.closest&&o.closest(".showcase-toc"))return null;let e=o,r=0;for(;e&&r<t;){if(r++,e.tagName==="DS-SHOWCASE")return null;if(e.classList&&e.classList.contains("showcase-section")){e=e.parentElement;continue}for(let n of PDS.ontology.enhancements){let i=n.selector||n;if(j(e,i))return{element:e,componentType:"enhanced-component",displayName:n.description||i,id:n.id}}if(e.tagName==="FIELDSET"){let n=e.getAttribute("role");if(n==="group"||n==="radiogroup")return{element:e,componentType:"form-group",displayName:n==="radiogroup"?"radio group":"form group"}}if(e.tagName==="LABEL"&&e.querySelector&&e.querySelector("input,select,textarea"))return{element:e,componentType:"form-control",displayName:"label with input"};let a=e.closest?e.closest("label"):null;if(a&&a.querySelector&&a.querySelector("input,select,textarea"))return{element:a,componentType:"form-control",displayName:"label with input"};for(let n of PDS.ontology.primitives){for(let i of n.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let u=s.slice(1).replace(/\*/g,"");if(e.classList&&Array.from(e.classList).some(d=>d.startsWith(u)))return{element:e,componentType:"pds-primitive",displayName:n.name||n.id,id:n.id,tags:n.tags};let c=e.parentElement,p=0;for(;c&&p<t;){if(c.classList&&Array.from(c.classList).some(d=>d.startsWith(u))&&c.tagName!=="DS-SHOWCASE")return{element:c,componentType:"pds-primitive",displayName:n.name||n.id,id:n.id,tags:n.tags};c=c.parentElement,p++}continue}continue}if(j(e,s))return{element:e,componentType:"pds-primitive",displayName:n.name||n.id,id:n.id,tags:n.tags};let l=Se(e,s);if(l&&l.tagName!=="DS-SHOWCASE")return{element:l,componentType:"pds-primitive",displayName:n.name||n.id,id:n.id,tags:n.tags}}if(e.classList){let i=Array.from(e.classList);for(let s of n.selectors||[])if(typeof s=="string"&&s.includes("*")&&s.startsWith(".")){let l=s.slice(1).replace(/\*/g,"");if(i.some(u=>u.startsWith(l)))return{element:e,componentType:"pds-primitive",displayName:n.name||n.id,id:n.id,tags:n.tags}}}}for(let n of PDS.ontology.layoutPatterns||[])for(let i of n.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let u=s.slice(1).replace(/\*/g,"");if(e.classList&&Array.from(e.classList).some(c=>c.startsWith(u)))return{element:e,componentType:"layout-pattern",displayName:n.name||n.id,id:n.id,tags:n.tags}}continue}if(j(e,s))return{element:e,componentType:"layout-pattern",displayName:n.name||n.id,id:n.id,tags:n.tags};let l=Se(e,s);if(l&&l.tagName!=="DS-SHOWCASE")return{element:l,componentType:"layout-pattern",displayName:n.name||n.id,id:n.id,tags:n.tags}}if(e.tagName&&e.tagName.includes("-")){let n=e.tagName.toLowerCase(),i=PDS.ontology.components.find(s=>s.selectors.includes(n));return{element:e,componentType:"web-component",displayName:i?.name||n,id:i?.id||n,tags:i?.tags}}if(e.tagName==="BUTTON"){let n=e.querySelector&&e.querySelector("pds-icon");return{element:e,componentType:"button",displayName:n?"button with icon":"button",id:"button"}}if(j(e,"pds-icon")||e.closest&&e.closest("pds-icon")){let n=j(e,"pds-icon")?e:e.closest("pds-icon");return{element:n,componentType:"icon",displayName:`pds-icon (${n.getAttribute&&n.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(j(e,"nav[data-dropdown]")||e.closest&&e.closest("nav[data-dropdown]"))return{element:j(e,"nav[data-dropdown]")?e:e.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};e=e.parentElement}return null}function Ye(){let o=[];for(let t of PDS.ontology.primitives)o.push(...t.selectors||[]);for(let t of PDS.ontology.components)o.push(...t.selectors||[]);for(let t of PDS.ontology.layoutPatterns||[])o.push(...t.selectors||[]);return Array.from(new Set(o))}function Qe(o,t={}){let e=o.toLowerCase(),r=[],a=(n,i)=>{for(let s of n)(s.id?.toLowerCase().includes(e)||s.name?.toLowerCase().includes(e)||s.description?.toLowerCase().includes(e)||s.tags?.some(u=>u.toLowerCase().includes(e))||s.category?.toLowerCase().includes(e)||s.selectors?.some(u=>u.toLowerCase().includes(e)))&&r.push({...s,type:i})};return(!t.type||t.type==="primitive")&&a(M.primitives,"primitive"),(!t.type||t.type==="component")&&a(M.components,"component"),(!t.type||t.type==="layout")&&a(M.layoutPatterns,"layout"),(!t.type||t.type==="enhancement")&&a(M.enhancements,"enhancement"),r}function Ze(o){let t=o.toLowerCase();return{primitives:M.primitives.filter(e=>e.category===t),components:M.components.filter(e=>e.category===t),layouts:M.layoutPatterns.filter(e=>e.category===t)}}function Ke(){let o=new Set;return M.primitives.forEach(t=>t.tags?.forEach(e=>o.add(e))),M.components.forEach(t=>t.tags?.forEach(e=>o.add(e))),M.layoutPatterns.forEach(t=>t.tags?.forEach(e=>o.add(e))),M.enhancements.forEach(t=>t.tags?.forEach(e=>o.add(e))),Array.from(o).sort()}var M,Xe,ae=D(()=>{M={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"callout",name:"Callout",description:"Contextual information and notification messages",selectors:[".callout",".callout-info",".callout-success",".callout-warning",".callout-danger",".callout-error",".callout-dismissible"],tags:["feedback","message","notification","status","information"],category:"feedback"},{id:"empty-state",name:"Empty State",description:"Empty state layout for missing data or onboarding",selectors:[".empty-state"],tags:["empty","no-data","zero","placeholder","onboarding","state"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-fab",name:"FAB",description:"Floating Action Button with expandable satellite actions",selectors:["pds-fab"],tags:["button","action","floating","interactive"],category:"action"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-live-edit",name:"Live Edit",description:"Contextual live editing for PDS design settings",selectors:["pds-live-edit"],tags:["editor","live","config","tooling"],category:"tooling"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element",tags:["menu","interactive","navigation"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["callout","badge","empty-state"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]},action:{description:"Interactive actions and buttons",primitives:["button"],components:["pds-fab"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],empty:["empty-state","placeholder","zero","no-data","onboarding","callout","card","icon","button"],"empty state":["empty-state","empty","no-data","zero","onboarding"],"no data":["empty-state","empty","zero","placeholder"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-working","pds-fab","floating"],btn:["button","interactive","action","pds-fab"],fab:["pds-fab","floating","button","action","menu"],floating:["fab","pds-fab","button","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],callout:["notification","feedback","message","status","toast","information","alert","warning","error","info","success","danger"],alert:["callout","notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["callout","toast","pds-toaster","feedback","message","popup","alert"],toast:["pds-toaster","notification","callout","feedback","popup","snackbar","alert"],feedback:["callout","notification","toast","status","badge","validation","error","success","alert"],message:["callout","notification","feedback","dialog","toast","alert"],status:["badge","callout","indicator","feedback","state","alert"],error:["callout","danger","validation","feedback","warning","alert"],success:["callout","feedback","badge","status","check","alert"],warning:["callout","caution","feedback","status","alert"],info:["callout","information","feedback","status","alert"],danger:["callout","error","feedback","destructive","delete","alert"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};Xe=M});var Re={};U(Re,{AutoDefiner:()=>ce});async function yt(...o){let t={};o.length&&typeof o[o.length-1]=="object"&&(t=o.pop()||{});let e=o,{baseURL:r,mapper:a=u=>`${u}.js`,onError:n=(u,c)=>console.error(`[defineWebComponents] ${u}:`,c)}=t,i=r?new URL(r,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),s=u=>u.toLowerCase().replace(/(^|-)([a-z])/g,(c,p,d)=>d.toUpperCase()),l=async u=>{try{if(customElements.get(u))return{tag:u,status:"already-defined"};let c=a(u),d=await import(c instanceof URL?c.href:new URL(c,i).href),m=d?.default??d?.[s(u)];if(!m){if(customElements.get(u))return{tag:u,status:"self-defined"};throw new Error(`No export found for ${u}. Expected default export or named export "${s(u)}".`)}return customElements.get(u)?{tag:u,status:"race-already-defined"}:(customElements.define(u,m),{tag:u,status:"defined"})}catch(c){throw n(u,c),c}};return Promise.all(e.map(l))}var ce,We=D(()=>{ce=class{constructor(t={}){let{baseURL:e,mapper:r,onError:a,predicate:n=()=>!0,attributeModule:i="data-module",root:s=document,scanExisting:l=!0,debounceMs:u=16,observeShadows:c=!0,enhancers:p=[],patchAttachShadow:d=!0}=t,m=new Set,f=new Set,b=new Set,h=new Map,w=new WeakMap,z=new WeakMap,S=0,L=!1,R=null,F=y=>{if(!y||!p.length)return;let v=z.get(y);v||(v=new Set,z.set(y,v));for(let x of p)if(!(!x.selector||!x.run)&&!v.has(x.selector))try{y.matches&&y.matches(x.selector)&&(x.run(y),v.add(x.selector))}catch(C){console.warn(`[AutoDefiner] Error applying enhancer for selector "${x.selector}":`,C)}},A=(y,v)=>{if(!L&&!(!y||!y.includes("-"))&&!customElements.get(y)&&!f.has(y)&&!b.has(y)){if(v&&v.getAttribute){let x=v.getAttribute(i);x&&!h.has(y)&&h.set(y,x)}m.add(y),k()}},k=()=>{S||(S=setTimeout(W,u))},$=y=>{if(y){if(y.nodeType===1){let v=y,x=v.tagName?.toLowerCase();x&&x.includes("-")&&!customElements.get(x)&&n(x,v)&&A(x,v),F(v),c&&v.shadowRoot&&E(v.shadowRoot)}y.querySelectorAll&&y.querySelectorAll("*").forEach(v=>{let x=v.tagName?.toLowerCase();x&&x.includes("-")&&!customElements.get(x)&&n(x,v)&&A(x,v),F(v),c&&v.shadowRoot&&E(v.shadowRoot)})}},E=y=>{if(!y||w.has(y))return;$(y);let v=new MutationObserver(x=>{for(let C of x)C.addedNodes?.forEach(N=>{$(N)}),C.type==="attributes"&&C.target&&$(C.target)});v.observe(y,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...p.map(x=>x.selector).filter(x=>x.startsWith("data-"))]}),w.set(y,v)};async function W(){if(clearTimeout(S),S=0,!m.size)return;let y=Array.from(m);m.clear(),y.forEach(v=>f.add(v));try{let v=x=>h.get(x)??(r?r(x):`${x}.js`);await yt(...y,{baseURL:e,mapper:v,onError:(x,C)=>{b.add(x),a?.(x,C)}})}catch{}finally{y.forEach(v=>f.delete(v))}}let K=s===document?document.documentElement:s,q=new MutationObserver(y=>{for(let v of y)v.addedNodes?.forEach(x=>{$(x)}),v.type==="attributes"&&v.target&&$(v.target)});if(q.observe(K,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...p.map(y=>y.selector).filter(y=>y.startsWith("data-"))]}),c&&d&&Element.prototype.attachShadow){let y=Element.prototype.attachShadow;Element.prototype.attachShadow=function(x){let C=y.call(this,x);if(x&&x.mode==="open"){E(C);let N=this.tagName?.toLowerCase();N&&N.includes("-")&&!customElements.get(N)&&A(N,this)}return C},R=()=>Element.prototype.attachShadow=y}return l&&$(K),{stop(){L=!0,q.disconnect(),R&&R(),S&&(clearTimeout(S),S=0),w.forEach(y=>y.disconnect())},flush:W}}static async define(...t){let e={};t.length&&typeof t[t.length-1]=="object"&&(e=t.pop()||{});let r=t,{baseURL:a,mapper:n=c=>`${c}.js`,onError:i=(c,p)=>console.error(`[defineWebComponents] ${c}:`,p)}=e,s=a?new URL(a,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),l=c=>c.toLowerCase().replace(/(^|-)([a-z])/g,(p,d,m)=>m.toUpperCase()),u=async c=>{try{if(customElements.get(c))return{tag:c,status:"already-defined"};let p=n(c),m=await import(p instanceof URL?p.href:new URL(p,s).href),f=m?.default??m?.[l(c)];if(!f){if(customElements.get(c))return{tag:c,status:"self-defined"};throw new Error(`No export found for ${c}. Expected default export or named export "${l(c)}".`)}return customElements.get(c)?{tag:c,status:"race-already-defined"}:(customElements.define(c,f),{tag:c,status:"defined"})}catch(p){throw i(c,p),p}};return Promise.all(r.map(u))}}});var be={};U(be,{PDSQuery:()=>fe});var fe,ye=D(()=>{fe=class{constructor(t){this.pds=t,this.intents={color:["color","colours","shade","tint","hue","foreground","background","text","fill","bg","fg"],spacing:["spacing","space","gap","padding","margin","distance","rhythm"],typography:["font","text","type","typography","heading","body","size","weight","family"],border:["border","outline","stroke","edge","frame"],radius:["radius","rounded","corner","curve","round"],shadow:["shadow","elevation","depth","glow","drop-shadow"],component:["component","element","widget"],utility:["utility","class","helper","css"],layout:["layout","container","grid","flex","group","arrange","organize"],pattern:["pattern","example","template","structure"],interaction:["hover","focus","active","disabled","pressed","selected","checked"]},this.entities={button:["button","btn","cta"],input:["input","field","textbox","text-field","form-control"],card:["card","panel"],badge:["badge","pill","tag","chip"],surface:["surface","background","layer","container"],icon:["icon","svg","glyph","symbol"],link:["link","anchor","hyperlink"],nav:["nav","navigation","menu"],modal:["modal","dialog","popup","overlay"],drawer:["drawer","sidebar","panel"],tab:["tab","tabstrip"],toast:["toast","notification","callout","message","alert"]},this.questionWords=["what","which","how","where","when","show","find","get","give","tell"]}async search(t){if(!t||t.length<2)return[];let e=t.toLowerCase().trim(),r=this.tokenize(e),a=this.analyzeQuery(r,e),n=[];a.intents.has("color")&&n.push(...this.queryColors(a,e)),(a.intents.has("utility")||a.intents.has("border")||a.intents.has("layout")||e.includes("class"))&&n.push(...this.queryUtilities(a,e)),(a.intents.has("component")||a.entities.size>0)&&n.push(...this.queryComponents(a,e)),(a.intents.has("layout")||a.intents.has("pattern"))&&n.push(...this.queryPatterns(a,e)),a.intents.has("typography")&&n.push(...this.queryTypography(a,e)),a.intents.has("spacing")&&n.push(...this.querySpacing(a,e));let i=new Map;for(let s of n){let l=s.value;(!i.has(l)||i.get(l).score<s.score)&&i.set(l,s)}return Array.from(i.values()).sort((s,l)=>l.score-s.score).slice(0,10)}tokenize(t){return t.toLowerCase().replace(/[?!.]/g,"").split(/\s+/).filter(e=>e.length>0)}analyzeQuery(t,e){let r={intents:new Set,entities:new Set,modifiers:new Set,isQuestion:!1,tokens:t,fullText:e};r.isQuestion=this.questionWords.some(a=>t.includes(a));for(let[a,n]of Object.entries(this.intents))n.some(i=>t.includes(i)||e.includes(i))&&r.intents.add(a);for(let[a,n]of Object.entries(this.entities))n.some(i=>t.includes(i)||e.includes(i))&&r.entities.add(a);return(t.includes("hover")||e.includes("hover"))&&r.modifiers.add("hover"),(t.includes("focus")||e.includes("focus"))&&r.modifiers.add("focus"),(t.includes("active")||e.includes("active"))&&r.modifiers.add("active"),(t.includes("disabled")||e.includes("disabled"))&&r.modifiers.add("disabled"),r}queryColors(t,e){let r=[],a=this.pds.compiled;if(!a?.tokens?.colors)return r;let n=a.tokens.colors,i=Array.from(t.entities),s=Array.from(t.modifiers);if(s.includes("focus")&&t.intents.has("border")&&i.includes("input")&&r.push({text:"Focus border color: var(--color-primary-500)",value:"--color-primary-500",icon:"palette",category:"Color Token",score:100,cssVar:"var(--color-primary-500)",description:"Primary color used for focus states on form inputs"}),(e.includes("foreground")||e.includes("text"))&&(e.includes("surface")||t.entities.has("surface"))&&(r.push({text:"Text on surface: var(--surface-text)",value:"--surface-text",icon:"palette",category:"Surface Token",score:95,cssVar:"var(--surface-text)",description:"Default text color for current surface"}),r.push({text:"Secondary text: var(--surface-text-secondary)",value:"--surface-text-secondary",icon:"palette",category:"Surface Token",score:90,cssVar:"var(--surface-text-secondary)",description:"Secondary/muted text on surface"})),e.includes("primary")||e.includes("accent")||e.includes("secondary")){let l=e.includes("primary")?"primary":e.includes("accent")?"accent":"secondary";for(let u of[500,600,700]){let c=`--color-${l}-${u}`;r.push({text:`${l.charAt(0).toUpperCase()+l.slice(1)} ${u}: var(${c})`,value:c,icon:"palette",category:"Color Scale",score:80-(u-500)/100,cssVar:`var(${c})`,description:`${l} color scale shade ${u}`})}}if(i.includes("button")&&t.intents.has("color")){let l=s[0];l?r.push({text:`Button ${l} fill: var(--primary-fill-${l})`,value:`--primary-fill-${l}`,icon:"palette",category:"Interactive Token",score:92,description:`Button background color in ${l} state`}):r.push({text:"Button fill: var(--primary-fill)",value:"--primary-fill",icon:"palette",category:"Interactive Token",score:88,description:"Default button background color"})}return r}queryUtilities(t,e){let r=[],a=this.pds.ontology;if(!a?.utilities)return r;let n=a.utilities,i=[];for(let s of Object.values(n))if(typeof s=="object")for(let l of Object.values(s))Array.isArray(l)&&i.push(...l);return t.intents.has("border")&&i.filter(l=>l.includes("border")||l.includes("outline")).forEach(l=>{let u=80;e.includes("gradient")&&l.includes("gradient")&&(u=95),e.includes("glow")&&l.includes("glow")&&(u=95),r.push({text:`${l} - Border utility class`,value:l,icon:"code",category:"Utility Class",score:u,code:`<div class="${l}">...</div>`,description:this.describeUtility(l)})}),t.intents.has("layout")&&i.filter(l=>l.includes("flex")||l.includes("grid")||l.includes("items-")||l.includes("justify-")||l.includes("gap-")).forEach(l=>{r.push({text:`${l} - Layout utility`,value:l,icon:"layout",category:"Utility Class",score:85,code:`<div class="${l}">...</div>`,description:this.describeUtility(l)})}),e.includes("group")&&t.entities.has("button")&&r.push({text:".btn-group - Group buttons together",value:".btn-group",icon:"code",category:"Utility Class",score:90,code:`<div class="btn-group">
  <button class="btn-primary">One</button>
  <button class="btn-primary">Two</button>
</div>`,description:"Container for grouped buttons with connected styling"}),r}queryComponents(t,e){let r=[],a=this.pds.ontology;return!a?.components&&!a?.primitives||(a.components&&a.components.forEach(n=>{let i=this.scoreMatch(e,n.name+" "+n.id);i>50&&r.push({text:`<${n.id}> - ${n.name}`,value:n.id,icon:"brackets-curly",category:"Web Component",score:i,code:`<${n.id}></${n.id}>`,description:n.description||`${n.name} web component`})}),a.primitives&&a.primitives.forEach(n=>{let i=this.scoreMatch(e,n.name+" "+n.id);if(i>50){let s=n.selectors?.[0]||n.id;r.push({text:`${s} - ${n.name}`,value:n.id,icon:"tag",category:"Primitive",score:i-5,code:this.generatePrimitiveExample(n),description:n.description||`${n.name} primitive element`})}}),e.includes("icon")&&(e.includes("only")||e.includes("button"))&&r.push({text:'Icon-only button: <button class="btn-icon">',value:"btn-icon",icon:"star",category:"Pattern",score:95,code:`<button class="btn-icon btn-primary">
  <pds-icon icon="heart"></pds-icon>
</button>`,description:"Button with only an icon, no text label"})),r}queryPatterns(t,e){let r=[],a=this.pds.ontology;return a?.layoutPatterns&&(a.layoutPatterns.forEach(n=>{let i=this.scoreMatch(e,n.name+" "+n.id+" "+(n.description||""));if(i>50){let s=n.selectors?.[0]||`.${n.id}`;r.push({text:`${n.name} - ${n.description||"Layout pattern"}`,value:n.id,icon:"layout",category:"Layout Pattern",score:i,code:`<div class="${s.replace(".","")}">
  <!-- content -->
</div>`,description:n.description||n.name})}}),(e.includes("container")||e.includes("group"))&&(r.push({text:"Card - Container for grouping content",value:"card",icon:"layout",category:"Primitive",score:88,code:`<article class="card">
  <header>
    <h3>Title</h3>
  </header>
  <p>Content...</p>
</article>`,description:"Card container with optional header, body, and footer"}),r.push({text:"Section - Semantic container for grouping",value:"section",icon:"layout",category:"Pattern",score:85,code:`<section>
  <h2>Section Title</h2>
  <!-- content -->
</section>`,description:"Semantic section element for content grouping"}))),r}queryTypography(t,e){let r=[],a=this.pds.compiled;if(!a?.tokens?.typography)return r;let n=a.tokens.typography;return(e.includes("heading")||e.includes("title"))&&r.push({text:"Heading font: var(--font-family-heading)",value:"--font-family-heading",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-heading)",description:"Font family for headings"}),(e.includes("body")||e.includes("text"))&&r.push({text:"Body font: var(--font-family-body)",value:"--font-family-body",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-body)",description:"Font family for body text"}),r}querySpacing(t,e){let r=[],a=this.pds.compiled;if(!a?.tokens?.spacing)return r;let n=a.tokens.spacing;for(let[i,s]of Object.entries(n))["2","4","6","8"].includes(i)&&r.push({text:`Spacing ${i}: var(--spacing-${i})`,value:`--spacing-${i}`,icon:"ruler",category:"Spacing Token",score:75,cssVar:`var(--spacing-${i})`,description:`Spacing value: ${s}`});return r}scoreMatch(t,e){let r=t.toLowerCase(),a=e.toLowerCase(),n=0;if(r===a)return 100;a.includes(r)&&(n+=80);let i=this.tokenize(r),s=this.tokenize(a),l=i.filter(u=>s.includes(u)).length;return n+=l/i.length*40,a.startsWith(r)&&(n+=20),Math.min(100,n)}generatePrimitiveExample(t){let e=t.selectors?.[0]||t.id;return e.includes("button")||t.id==="button"?'<button class="btn-primary">Click me</button>':e.includes("card")||t.id==="card"?`<article class="card">
  <h3>Title</h3>
  <p>Content</p>
</article>`:e.includes("badge")||t.id==="badge"?'<span class="badge">New</span>':`<${e}>Content</${e}>`}describeUtility(t){return t.includes("border-gradient")?"Apply animated gradient border effect":t.includes("border-glow")?"Apply glowing border effect":t.includes("flex")?"Flexbox container utility":t.includes("grid")?"Grid container utility":t.includes("gap-")?"Set gap between flex/grid children":t.includes("items-")?"Align items in flex container":t.includes("justify-")?"Justify content in flex container":t===".btn-group"?"Group buttons with connected styling":"Utility class for styling"}}});var Ie={};U(Ie,{deepMerge:()=>Ue,fragmentFromTemplateLike:()=>wt,isObject:()=>Z,parseHTML:()=>kt});function Z(o){return o&&typeof o=="object"&&!Array.isArray(o)}function Ue(o,t){let e={...o};return Z(o)&&Z(t)&&Object.keys(t).forEach(r=>{Z(t[r])?r in o?e[r]=Ue(o[r],t[r]):Object.assign(e,{[r]:t[r]}):Object.assign(e,{[r]:t[r]})}),e}function wt(o){let t=Array.isArray(o?.strings)?o.strings:[],e=Array.isArray(o?.values)?o.values:[],r=new Set,a=[],n=/(\s)(\.[\w-]+)=\s*$/;for(let p=0;p<t.length;p+=1){let d=t[p]??"",m=d.match(n);if(m&&p<e.length){let b=m[2].slice(1),h=`pds-val-${p}`;d=d.replace(n,`$1data-pds-prop="${b}:${h}"`),r.add(p)}a.push(d),p<e.length&&!r.has(p)&&a.push(`<!--pds-val-${p}-->`)}let i=document.createElement("template");i.innerHTML=a.join("");let s=(p,d)=>{let m=p.parentNode;if(!m)return;if(d==null){m.removeChild(p);return}let f=b=>{if(b!=null){if(b instanceof Node){m.insertBefore(b,p);return}if(Array.isArray(b)){b.forEach(h=>f(h));return}m.insertBefore(document.createTextNode(String(b)),p)}};f(d),m.removeChild(p)},l=document.createTreeWalker(i.content,NodeFilter.SHOW_COMMENT),u=[];for(;l.nextNode();){let p=l.currentNode;p?.nodeValue?.startsWith("pds-val-")&&u.push(p)}return u.forEach(p=>{let d=Number(p.nodeValue.replace("pds-val-",""));s(p,e[d])}),i.content.querySelectorAll("*").forEach(p=>{let d=p.getAttribute("data-pds-prop");if(!d)return;let[m,f]=d.split(":"),b=Number(String(f).replace("pds-val-",""));m&&Number.isInteger(b)&&(p[m]=e[b]),p.removeAttribute("data-pds-prop")}),i.content}function kt(o){return new DOMParser().parseFromString(o,"text/html").body.childNodes}var He=D(()=>{});G();var P="any",te={type:"object",allowUnknown:!1,properties:{id:{type:"string"},name:{type:"string"},tags:{type:"array",items:{type:"string"}},description:{type:"string"},options:{type:"object",allowUnknown:!0},form:{type:"object",allowUnknown:!0},colors:{type:"object",allowUnknown:!1,properties:{primary:{type:"string",relations:{tokens:["--color-primary-*","--color-primary-fill","--color-primary-text","--background-mesh-*"]}},secondary:{type:"string",relations:{tokens:["--color-secondary-*","--color-gray-*","--background-mesh-*"]}},accent:{type:"string",relations:{tokens:["--color-accent-*","--background-mesh-*"]}},background:{type:"string",relations:{tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},success:{type:["string","null"],relations:{tokens:["--color-success-*"]}},warning:{type:["string","null"],relations:{tokens:["--color-warning-*"]}},danger:{type:["string","null"],relations:{tokens:["--color-danger-*"]}},info:{type:["string","null"],relations:{tokens:["--color-info-*"]}},gradientStops:{type:"number"},elevationOpacity:{type:"number",relations:{tokens:["--surface-*-shadow"]}},darkMode:{type:"object",allowUnknown:!0,properties:{background:{type:"string",relations:{theme:"dark",tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},primary:{type:"string",relations:{theme:"dark",tokens:["--color-primary-*","--color-primary-fill","--color-primary-text"]}},secondary:{type:"string",relations:{theme:"dark",tokens:["--color-secondary-*","--color-gray-*"]}},accent:{type:"string",relations:{theme:"dark",tokens:["--color-accent-*"]}}}}}},typography:{type:"object",allowUnknown:!1,properties:{fontFamilyHeadings:{type:"string",relations:{tokens:["--font-family-headings"]}},fontFamilyBody:{type:"string",relations:{tokens:["--font-family-body"]}},fontFamilyMono:{type:"string",relations:{tokens:["--font-family-mono"]}},baseFontSize:{type:"number",relations:{tokens:["--font-size-*"]}},fontScale:{type:"number",relations:{tokens:["--font-size-*"]}},fontWeightLight:{type:["string","number"],relations:{tokens:["--font-weight-light"]}},fontWeightNormal:{type:["string","number"],relations:{tokens:["--font-weight-normal"]}},fontWeightMedium:{type:["string","number"],relations:{tokens:["--font-weight-medium"]}},fontWeightSemibold:{type:["string","number"],relations:{tokens:["--font-weight-semibold"]}},fontWeightBold:{type:["string","number"],relations:{tokens:["--font-weight-bold"]}},lineHeightTight:{type:["string","number"],relations:{tokens:["--font-line-height-tight"]}},lineHeightNormal:{type:["string","number"],relations:{tokens:["--font-line-height-normal"]}},lineHeightRelaxed:{type:["string","number"],relations:{tokens:["--font-line-height-relaxed"]}},letterSpacingTight:{type:"number"},letterSpacingNormal:{type:"number"},letterSpacingWide:{type:"number"}}},spatialRhythm:{type:"object",allowUnknown:!1,properties:{baseUnit:{type:"number",relations:{tokens:["--spacing-*"]}},scaleRatio:{type:"number"},maxSpacingSteps:{type:"number",relations:{tokens:["--spacing-*"]}},containerMaxWidth:{type:["number","string"]},containerPadding:{type:"number"},inputPadding:{type:"number",relations:{rules:[{selectors:["input","textarea","select"],properties:["padding"]}]}},buttonPadding:{type:"number",relations:{rules:[{selectors:["button",".btn"],properties:["padding"]}]}},sectionSpacing:{type:"number",relations:{rules:[{selectors:["section"],properties:["margin","padding"]}]}}}},shape:{type:"object",allowUnknown:!1,properties:{radiusSize:{type:["string","number"],relations:{tokens:["--radius-*"]}},customRadius:{type:["string","number","null"]},borderWidth:{type:["string","number"],relations:{tokens:["--border-width-*"]}}}},behavior:{type:"object",allowUnknown:!1,properties:{transitionSpeed:{type:["string","number"],relations:{tokens:["--transition-*"]}},animationEasing:{type:"string"},customTransitionSpeed:{type:["number","null"]},customEasing:{type:["string","null"]},focusRingWidth:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["outline-width","box-shadow"]}]}},focusRingOpacity:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["box-shadow","outline-color"]}]}},hoverOpacity:{type:"number"}}},layout:{type:"object",allowUnknown:!1,properties:{maxWidth:{type:["number","string"],relations:{tokens:["--layout-max-width","--layout-max-width-*"]}},maxWidths:{type:"object",allowUnknown:!1,properties:{sm:{type:["number","string"],relations:{tokens:["--layout-max-width-sm"]}},md:{type:["number","string"],relations:{tokens:["--layout-max-width-md"]}},lg:{type:["number","string"],relations:{tokens:["--layout-max-width-lg"]}},xl:{type:["number","string"],relations:{tokens:["--layout-max-width-xl"]}}}},containerPadding:{type:["number","string"],relations:{tokens:["--layout-container-padding"]}},breakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"number"},md:{type:"number"},lg:{type:"number"},xl:{type:"number"}}},gridColumns:{type:"number"},gridGutter:{type:"number"},densityCompact:{type:"number"},densityNormal:{type:"number"},densityComfortable:{type:"number"},buttonMinHeight:{type:"number"},inputMinHeight:{type:"number"},baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},darkMode:{type:"object",allowUnknown:!0,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}},utilities:{type:"object",allowUnknown:!0},gridSystem:{type:"object",allowUnknown:!0},containerMaxWidth:{type:["number","string"]}}},layers:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},shadowBlurMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowOffsetMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowDepth:{type:"string"},blurLight:{type:"number"},blurMedium:{type:"number"},blurHeavy:{type:"number"},baseZIndex:{type:"number",relations:{tokens:["--z-*"]}},zIndexStep:{type:"number",relations:{tokens:["--z-*"]}},zIndexBase:{type:"number"},zIndexDropdown:{type:"number"},zIndexSticky:{type:"number"},zIndexFixed:{type:"number"},zIndexModal:{type:"number"},zIndexPopover:{type:"number"},zIndexTooltip:{type:"number"},zIndexNotification:{type:"number"},darkMode:{type:"object",allowUnknown:!0,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}}}},advanced:{type:"object",allowUnknown:!0},a11y:{type:"object",allowUnknown:!0},icons:{type:"object",allowUnknown:!1,properties:{set:{type:"string"},weight:{type:"string"},defaultSize:{type:"number",relations:{tokens:["--icon-size"]}},sizes:{type:"object",allowUnknown:!0},spritePath:{type:"string"},externalPath:{type:"string"},include:{type:"object",allowUnknown:!0}}},components:{type:"object",allowUnknown:!0},gap:{type:"number"},debug:{type:"boolean"}}},Ge={type:"object",allowUnknown:!0,properties:{mode:{type:"string"},preset:{type:"string"},design:te,enhancers:{type:["object","array"]},applyGlobalStyles:{type:"boolean"},manageTheme:{type:"boolean"},themeStorageKey:{type:"string"},preloadStyles:{type:"boolean"},criticalLayers:{type:"array",items:{type:"string"}},autoDefine:{type:"object",allowUnknown:!1,properties:{predefine:{type:"array",items:{type:"string"}},mapper:{type:P},enhancers:{type:["object","array"]},scanExisting:{type:"boolean"},observeShadows:{type:"boolean"},patchAttachShadow:{type:"boolean"},debounceMs:{type:"number"},onError:{type:P},baseURL:{type:"string"}}},managerURL:{type:"string"},manager:{type:P},liveEdit:{type:"boolean"},log:{type:P}}};function X(o){return o===null?"null":Array.isArray(o)?"array":typeof o}function Ve(o,t){if(t===P)return!0;let e=X(o);return Array.isArray(t)?t.includes(e):e===t}function V(o,t,e,r){if(!t)return;let a=t.type||P;if(!Ve(o,a)){r.push({path:e,expected:a,actual:X(o),message:`Expected ${a} but got ${X(o)}`});return}if(a==="array"&&t.items&&Array.isArray(o)&&o.forEach((n,i)=>{V(n,t.items,`${e}[${i}]`,r)}),a==="object"&&o&&typeof o=="object"){let n=t.properties||{};for(let[i,s]of Object.entries(o)){if(!Object.prototype.hasOwnProperty.call(n,i)){t.allowUnknown||r.push({path:`${e}.${i}`,expected:"known property",actual:"unknown",message:`Unknown property "${i}"`});continue}V(s,n[i],`${e}.${i}`,r)}}}function ee(o,t="",e={}){if(!o||typeof o!="object")return e;if(o.relations&&t&&(e[t]=o.relations),o.type==="object"&&o.properties&&Object.entries(o.properties).forEach(([r,a])=>{let n=t?`${t}.${r}`:r;ee(a,n,e)}),o.type==="array"&&o.items){let r=`${t}[]`;ee(o.items,r,e)}return e}var we=ee(te,"");function re(o,{log:t,context:e="PDS config"}={}){if(!o||typeof o!="object")return[];let r=[];return V(o,te,"design",r),r.length&&typeof t=="function"&&r.forEach(a=>{t("warn",`[${e}] ${a.message} at ${a.path}`)}),r}function ke(o,{log:t,context:e="PDS config"}={}){if(!o||typeof o!="object")return[];let r=[];return V(o,Ge,"config",r),r.length&&typeof t=="function"&&r.forEach(a=>{t("warn",`[${e}] ${a.message} at ${a.path}`)}),r}var O={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.5,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:g.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.618,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:g.RadiusSizes.xlarge,borderWidth:g.BorderWidths.medium},behavior:{transitionSpeed:g.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],themes:["light"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:g.RadiusSizes.none,borderWidth:g.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.5,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:g.RadiusSizes.xxlarge,borderWidth:g.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:g.RadiusSizes.none,borderWidth:g.BorderWidths.thick},behavior:{transitionSpeed:g.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.5,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.333},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.thick},behavior:{transitionSpeed:g.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",themes:["light"],description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:g.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:g.RadiusSizes.xxlarge,borderWidth:g.BorderWidths.thin},behavior:{transitionSpeed:g.TransitionSpeeds.slow,animationEasing:g.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0c0c0c",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:g.RadiusSizes.none,borderWidth:g.BorderWidths.thick},behavior:{transitionSpeed:g.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.414,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:g.RadiusSizes.large,borderWidth:g.BorderWidths.medium},behavior:{transitionSpeed:g.TransitionSpeeds.normal,animationEasing:g.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c",primary:"#0a4ca4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:g.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:g.RadiusSizes.large,borderWidth:g.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:g.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:1440,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:g.TransitionSpeeds.normal,animationEasing:g.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#06c167"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.medium},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:g.TouchTargetSizes.comfortable,focusStyle:g.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:1280,sectionSpacing:2.5},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:g.TouchTargetSizes.standard,focusStyle:g.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:g.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:680,sectionSpacing:1.5},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.thin},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:g.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerMaxWidth:1600,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};O.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!0,backgroundMesh:4},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:g.FontWeights.light,fontWeightNormal:g.FontWeights.normal,fontWeightMedium:g.FontWeights.medium,fontWeightSemibold:g.FontWeights.semibold,fontWeightBold:g.FontWeights.bold,lineHeightTight:g.LineHeights.tight,lineHeightNormal:g.LineHeights.normal,lineHeightRelaxed:g.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerMaxWidth:1200,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:g.RadiusSizes.large,borderWidth:g.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:g.TransitionSpeeds.normal,animationEasing:g.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:g.TouchTargetSizes.standard,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:g.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:g.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:g.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:g.IconSizes,include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"public/assets/pds/icons/pds-icons.svg"},gap:4,debug:!1};function oe(o="log",t,...e){if(this?.debug||this?.design?.debug||!1||o==="error"||o==="warn"){let a=console[o]||console.log;e.length>0?a(t,...e):a(t)}}G();ae();var T=class o{static#g;static get instance(){return this.#g}#e;#a;constructor(t={}){this.options={debug:!1,...t},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),o.#g=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#ke(),typeof CSSStyleSheet<"u"?this.#Ee():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let t=this.options.design||{},e=this.#M(t),r=t.layers||{},a=this.#h(r,e.light),n=this.#$(a),i=e.dark!=null?this.#$(this.#h(r,e.dark)):null;return{colors:this.#E(t.colors||{},e),spacing:this.generateSpacingTokens(t.spatialRhythm||{}),radius:this.#P(t.shape||{}),borderWidths:this.#O(t.shape||{}),typography:this.generateTypographyTokens(t.typography||{}),shadows:n,darkShadows:i,layout:this.#D(t.layout||{}),transitions:this.#U(t.behavior||{}),zIndex:this.#I(t.layers||{}),icons:this.#H(t.icons||{})}}#M(t={}){let e=t.layout||{},r=t.layers||{};return{light:this.#m(e.baseShadowOpacity??r.baseShadowOpacity),dark:this.#m(e.darkMode?.baseShadowOpacity??r.darkMode?.baseShadowOpacity)}}#m(t){let e=Number(t);if(Number.isFinite(e))return Math.min(Math.max(e,0),1)}#h(t={},e){let r={...t};return e!=null&&(r.baseShadowOpacity=e),r}#E(t,e={}){let{primary:r="#3b82f6",secondary:a="#64748b",accent:n="#ec4899",background:i="#ffffff",success:s=null,warning:l="#FFBF00",danger:u=null,info:c=null,darkMode:p={}}=t,d={primary:this.#r(r),secondary:this.#r(a),accent:this.#r(n),success:this.#r(s||this.#F(r)),warning:this.#r(l||n),danger:this.#r(u||this.#C(r)),info:this.#r(c||r),gray:this.#f(a),surface:this.#b(i)};return d.surface.fieldset=this.#T(d.surface),d.surfaceSmart=this.#k(d.surface,e),d.dark=this.#A(d,i,p),d.dark&&d.dark.surface&&(d.dark.surfaceSmart=this.#k(d.dark.surface,e)),d.interactive={light:{fill:this.#w(d.primary,4.5),text:d.primary[600]},dark:{fill:this.#w(d.dark.primary,4.5),text:this.#B(d.dark.primary,d.dark.surface.base,4.5)}},d}#r(t){let e=this.#n(t);return{50:this.#t(e.h,Math.max(e.s-10,10),Math.min(e.l+45,95)),100:this.#t(e.h,Math.max(e.s-5,15),Math.min(e.l+35,90)),200:this.#t(e.h,e.s,Math.min(e.l+25,85)),300:this.#t(e.h,e.s,Math.min(e.l+15,75)),400:this.#t(e.h,e.s,Math.min(e.l+5,65)),500:t,600:this.#t(e.h,e.s,Math.max(e.l-10,25)),700:this.#t(e.h,e.s,Math.max(e.l-20,20)),800:this.#t(e.h,e.s,Math.max(e.l-30,15)),900:this.#t(e.h,e.s,Math.max(e.l-40,10))}}#F(t){let e=this.#n(t);return this.#t(120,Math.max(e.s,60),45)}#C(t){let e=this.#n(t);return this.#t(0,Math.max(e.s,70),50)}#f(t){let e=this.#n(t),r=e.h,a=Math.min(e.s,10);return{50:this.#t(r,a,98),100:this.#t(r,a,95),200:this.#t(r,a,88),300:this.#t(r,a,78),400:this.#t(r,a,60),500:t,600:this.#t(r,Math.min(a+5,15),45),700:this.#t(r,Math.min(a+8,18),35),800:this.#t(r,Math.min(a+10,20),20),900:this.#t(r,Math.min(a+12,22),10)}}#b(t){let e=this.#n(t);return{base:t,subtle:this.#t(e.h,Math.max(e.s,2),Math.max(e.l-2,2)),elevated:this.#t(e.h,Math.max(e.s,3),Math.max(e.l-4,5)),sunken:this.#t(e.h,Math.max(e.s,4),Math.max(e.l-6,8)),overlay:this.#t(e.h,Math.max(e.s,2),Math.min(e.l+2,98)),inverse:this.#y(t),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#T(t){return{base:t.subtle,subtle:t.elevated,elevated:t.sunken,sunken:this.#L(t.sunken,.05),overlay:t.elevated}}#L(t,e=.05){let r=this.#n(t),a=Math.max(r.l-r.l*e,5);return this.#t(r.h,r.s,a)}#y(t){let e=this.#n(t);if(e.l>50){let r=Math.min(e.s+5,25),a=Math.max(12-(e.l-50)*.1,8);return this.#t(e.h,r,a)}else{let r=Math.max(e.s-10,5),a=Math.min(85+(50-e.l)*.3,95);return this.#t(e.h,r,a)}}#A(t,e="#ffffff",r={}){let a=r.background?r.background:this.#y(e),n=this.#b(a),i=r.primary?this.#r(r.primary):this.#i(t.primary);return{surface:{...n,fieldset:this.#j(n)},primary:i,secondary:r.secondary?this.#r(r.secondary):this.#i(t.secondary),accent:r.accent?this.#r(r.accent):this.#i(t.accent),gray:r.secondary?this.#f(r.secondary):t.gray,success:this.#i(t.success),info:this.#i(t.info),warning:this.#i(t.warning),danger:this.#i(t.danger)}}#l(t){let e=String(t||"").replace("#",""),r=e.length===3?e.split("").map(n=>n+n).join(""):e,a=parseInt(r,16);return{r:a>>16&255,g:a>>8&255,b:a&255}}#p(t){let{r:e,g:r,b:a}=this.#l(t),n=[e/255,r/255,a/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*n[0]+.7152*n[1]+.0722*n[2]}#d(t,e){let r=this.#p(t),a=this.#p(e),n=Math.max(r,a),i=Math.min(r,a);return(n+.05)/(i+.05)}#v(t,e=4.5){if(!t)return"#000000";let r="#ffffff",a="#000000",n=this.#d(t,r);if(n>=e)return r;let i=this.#d(t,a);return i>=e||i>n?a:r}#x(t,e=1){let{r,g:a,b:n}=this.#l(t);return`rgba(${r}, ${a}, ${n}, ${e})`}#R(t,e,r=.5){let a=this.#l(t),n=this.#l(e),i=Math.round(a.r+(n.r-a.r)*r),s=Math.round(a.g+(n.g-a.g)*r),l=Math.round(a.b+(n.b-a.b)*r);return this.#W(i,s,l)}#W(t,e,r){let a=n=>{let i=Math.max(0,Math.min(255,Math.round(n))).toString(16);return i.length===1?"0"+i:i};return`#${a(t)}${a(e)}${a(r)}`}#j(t){return{base:t.elevated,subtle:t.overlay,elevated:this.#S(t.elevated,.08),sunken:t.elevated,overlay:this.#S(t.overlay,.05)}}#B(t={},e="#000000",r=4.5){let a=["600","700","800","500","400","900","300","200"],n={shade:null,color:null,ratio:0};for(let i of a){let s=t?.[i];if(!s||typeof s!="string")continue;let l=this.#d(s,e);if(l>n.ratio&&(n={shade:i,color:s,ratio:l}),l>=r)return s}return n.color||t?.["600"]||t?.["500"]}#w(t={},e=4.5){let r=["600","700","800","500","400","900"],a={shade:null,color:null,ratio:0};for(let n of r){let i=t?.[n];if(!i||typeof i!="string")continue;let s=this.#d(i,"#ffffff");if(s>a.ratio&&(a={shade:n,color:i,ratio:s}),s>=e)return i}return a.color||t?.["600"]||t?.["500"]}#k(t,e={}){let r={},a=e.light??.1,n=e.dark??.25;return Object.entries(t).forEach(([i,s])=>{if(!s||typeof s!="string"||!s.startsWith("#"))return;let l=this.#p(s)<.5,u=this.#v(s,4.5),c=this.#v(s,3),p=this.#R(u,s,.4),d=u,m=p,f=l?"#ffffff":"#000000",b=l?n:a,h=this.#x(f,b),w=l?"#ffffff":"#000000",z=l?.15:.1,S=this.#x(w,z);r[i]={bg:s,text:u,textSecondary:c,textMuted:p,icon:d,iconSubtle:m,shadow:h,border:S,scheme:l?"dark":"light"}}),r}#S(t,e=.05){let r=this.#n(t),a=Math.min(r.l+(100-r.l)*e,95);return this.#t(r.h,r.s,a)}#i(t){let e={};return Object.entries({50:{source:"900",dimFactor:.8},100:{source:"800",dimFactor:.8},200:{source:"700",dimFactor:.8},300:{source:"600",dimFactor:.8},400:{source:"500",dimFactor:.85},500:{source:"400",dimFactor:.85},600:{source:"300",dimFactor:.85},700:{source:"200",dimFactor:.85},800:{source:"100",dimFactor:.95},900:{source:"50",dimFactor:.95}}).forEach(([a,n])=>{let i=t[n.source];e[a]=this.#N(i,n.dimFactor)}),e}#N(t,e=.8){let r=this.#n(t),a=Math.max(r.s*e,5),n=Math.max(r.l*e,5);return this.#t(r.h,a,n)}generateSpacingTokens(t){let{baseUnit:e=4,scaleRatio:r=1.25,maxSpacingSteps:a=12}=t,n=Number.isFinite(Number(e))?Number(e):4,i=Math.min(Number.isFinite(Number(a))?Number(a):12,12),s={0:"0"};for(let l=1;l<=i;l++)s[l]=`${n*l}px`;return s}#P(t){let{radiusSize:e="medium",customRadius:r=null}=t,a;r!=null?a=r:typeof e=="number"?a=e:typeof e=="string"?a=g.RadiusSizes[e]??g.RadiusSizes.medium:a=g.RadiusSizes.medium;let n=Number.isFinite(Number(a))?Number(a):g.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(n*.25)?Math.round(n*.25):0}px`,sm:`${Number.isFinite(n*.5)?Math.round(n*.5):0}px`,md:`${n}px`,lg:`${Number.isFinite(n*1.5)?Math.round(n*1.5):0}px`,xl:`${Number.isFinite(n*2)?Math.round(n*2):0}px`,full:"9999px"}}#O(t){let{borderWidth:e="medium"}=t,r;return typeof e=="number"?r=e:typeof e=="string"?r=g.BorderWidths[e]??g.BorderWidths.medium:r=g.BorderWidths.medium,{hairline:`${g.BorderWidths.hairline}px`,thin:`${g.BorderWidths.thin}px`,medium:`${g.BorderWidths.medium}px`,thick:`${g.BorderWidths.thick}px`}}generateTypographyTokens(t){let{fontFamilyHeadings:e="system-ui, -apple-system, sans-serif",fontFamilyBody:r="system-ui, -apple-system, sans-serif",fontFamilyMono:a='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:n=16,fontScale:i=1.25,fontWeightLight:s=g.FontWeights.light,fontWeightNormal:l=g.FontWeights.normal,fontWeightMedium:u=g.FontWeights.medium,fontWeightSemibold:c=g.FontWeights.semibold,fontWeightBold:p=g.FontWeights.bold,lineHeightTight:d=g.LineHeights.tight,lineHeightNormal:m=g.LineHeights.normal,lineHeightRelaxed:f=g.LineHeights.relaxed}=t,b=Number.isFinite(Number(n))?Number(n):16,h=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:e,body:r,mono:a},fontSize:{xs:`${Math.round(b/Math.pow(h,2))}px`,sm:`${Math.round(b/h)}px`,base:`${b}px`,lg:`${Math.round(b*h)}px`,xl:`${Math.round(b*Math.pow(h,2))}px`,"2xl":`${Math.round(b*Math.pow(h,3))}px`,"3xl":`${Math.round(b*Math.pow(h,4))}px`,"4xl":`${Math.round(b*Math.pow(h,5))}px`},fontWeight:{light:s?.toString()||"300",normal:l?.toString()||"400",medium:u?.toString()||"500",semibold:c?.toString()||"600",bold:p?.toString()||"700"},lineHeight:{tight:d?.toString()||"1.25",normal:m?.toString()||"1.5",relaxed:f?.toString()||"1.75"}}}#$(t){let{baseShadowOpacity:e=.1,shadowBlurMultiplier:r=1,shadowOffsetMultiplier:a=1}=t,n=`rgba(0, 0, 0, ${e})`,i=`rgba(0, 0, 0, ${e*.5})`;return{sm:`0 ${1*a}px ${2*r}px 0 ${i}`,base:`0 ${1*a}px ${3*r}px 0 ${n}, 0 ${1*a}px ${2*r}px 0 ${i}`,md:`0 ${4*a}px ${6*r}px ${-1*a}px ${n}, 0 ${2*a}px ${4*r}px ${-1*a}px ${i}`,lg:`0 ${10*a}px ${15*r}px ${-3*a}px ${n}, 0 ${4*a}px ${6*r}px ${-2*a}px ${i}`,xl:`0 ${20*a}px ${25*r}px ${-5*a}px ${n}, 0 ${10*a}px ${10*r}px ${-5*a}px ${i}`,inner:`inset 0 ${2*a}px ${4*r}px 0 ${i}`}}#D(t){let{maxWidth:e=1200,containerPadding:r=16,breakpoints:a={sm:640,md:768,lg:1024,xl:1280}}=t,n=this.#z(t);return{maxWidth:this.#o(e,"1200px"),maxWidthSm:n.sm,maxWidthMd:n.md,maxWidthLg:n.lg,maxWidthXl:n.xl,minHeight:"100vh",containerPadding:this.#o(r,"16px"),breakpoints:{sm:this.#o(a.sm,"640px"),md:this.#o(a.md,"768px"),lg:this.#o(a.lg,"1024px"),xl:this.#o(a.xl,"1280px")},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#z(t={}){let e={sm:640,md:768,lg:1024,xl:1280},{maxWidths:r={},maxWidth:a=1200,containerPadding:n=16,breakpoints:i=e}=t||{},s=this.#s(n,16),l=this.#s(a,e.xl),u={sm:this.#s(i.sm,e.sm),md:this.#s(i.md,e.md),lg:this.#s(i.lg,e.lg),xl:this.#s(i.xl,e.xl)},c=d=>d?Math.max(320,d-s*2):l,p={sm:Math.min(l,c(u.sm)),md:Math.min(l,c(u.md)),lg:Math.min(l,c(u.lg)),xl:Math.max(320,l)};return{sm:this.#o(r.sm,`${p.sm}px`),md:this.#o(r.md,`${p.md}px`),lg:this.#o(r.lg,`${p.lg}px`),xl:this.#o(r.xl,`${p.xl}px`)}}#o(t,e){return typeof t=="number"&&Number.isFinite(t)?`${t}px`:typeof t=="string"&&t.trim().length>0?t:e}#s(t,e){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){let r=parseFloat(t);if(Number.isFinite(r))return r}return e}#U(t){let{transitionSpeed:e=g.TransitionSpeeds.normal,animationEasing:r=g.AnimationEasings["ease-out"]}=t,a;return typeof e=="number"?a=e:typeof e=="string"&&g.TransitionSpeeds[e]?a=g.TransitionSpeeds[e]:a=g.TransitionSpeeds.normal,{fast:`${Math.round(a*.6)}ms`,normal:`${a}ms`,slow:`${Math.round(a*1.4)}ms`}}#I(t){let{baseZIndex:e=1e3,zIndexStep:r=10}=t;return{dropdown:e.toString(),sticky:(e+r*2).toString(),fixed:(e+r*3).toString(),modal:(e+r*4).toString(),drawer:(e+r*5).toString(),popover:(e+r*6).toString(),tooltip:(e+r*7).toString(),notification:(e+r*8).toString()}}#H(t){let{set:e="phosphor",weight:r="regular",defaultSize:a=24,sizes:n={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:s="/assets/img/icons/"}=t;return{set:e,weight:r,defaultSize:`${a}px`,sizes:Object.fromEntries(Object.entries(n).map(([l,u])=>[l,`${u}px`])),spritePath:i,externalPath:s}}#_(t){let e=[];e.push(`  /* Colors */
`);let r=(a,n="")=>{Object.entries(a).forEach(([i,s])=>{typeof s=="object"&&s!==null?r(s,`${n}${i}-`):typeof s=="string"&&e.push(`  --color-${n}${i}: ${s};
`)})};return Object.entries(t).forEach(([a,n])=>{a!=="dark"&&a!=="surfaceSmart"&&a!=="interactive"&&typeof n=="object"&&n!==null&&r(n,`${a}-`)}),t.surfaceSmart&&(e.push(`  /* Smart Surface Tokens (context-aware) */
`),Object.entries(t.surfaceSmart).forEach(([a,n])=>{e.push(`  --surface-${a}-bg: ${n.bg};
`),e.push(`  --surface-${a}-text: ${n.text};
`),e.push(`  --surface-${a}-text-secondary: ${n.textSecondary};
`),e.push(`  --surface-${a}-text-muted: ${n.textMuted};
`),e.push(`  --surface-${a}-icon: ${n.icon};
`),e.push(`  --surface-${a}-icon-subtle: ${n.iconSubtle};
`),e.push(`  --surface-${a}-shadow: ${n.shadow};
`),e.push(`  --surface-${a}-border: ${n.border};
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
    `),e.push(this.#q(t)),`${e.join("")}
`}#q(t){let e=t.primary?.[500]||"#3b82f6",r=t.secondary?.[500]||"#8b5cf6",a=t.accent?.[500]||"#f59e0b";return`
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${e} 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${r} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${a} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${e} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${r} 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${e} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${a} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${r} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${a} 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${e} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${r} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${a} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${e} 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${r} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${a} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${e} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${e} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${a} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${r} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${a} 15%, transparent) 0px, transparent 50%);
    `}#G(t){let e=[`  /* Spacing */
`];return Object.entries(t).forEach(([r,a])=>{r!=null&&r!=="NaN"&&a!==void 0&&!a.includes("NaN")&&e.push(`  --spacing-${r}: ${a};
`)}),`${e.join("")}
`}#V(t){let e=[`  /* Border Radius */
`];return Object.entries(t).forEach(([r,a])=>{e.push(`  --radius-${r}: ${a};
`)}),`${e.join("")}
`}#J(t){let e=[`  /* Border Widths */
`];return Object.entries(t).forEach(([r,a])=>{e.push(`  --border-width-${r}: ${a};
`)}),`${e.join("")}
`}#Y(t){let e=[`  /* Typography */
`];return Object.entries(t).forEach(([r,a])=>{let n=r.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(a).forEach(([i,s])=>{let l=i.replace(/([A-Z])/g,"-$1").toLowerCase();e.push(`  --font-${n}-${l}: ${s};
`)})}),`${e.join("")}
`}#u(t){let e=[`  /* Shadows */
`];return Object.entries(t).forEach(([r,a])=>{e.push(`  --shadow-${r}: ${a};
`)}),`${e.join("")}
`}#Q(t){let e=[`  /* Layout */
`];return Object.entries(t).forEach(([r,a])=>{let n=r.replace(/([A-Z])/g,"-$1").toLowerCase();r!=="breakpoints"&&e.push(`  --layout-${n}: ${a};
`)}),`${e.join("")}
`}#Z(t){let e=[`  /* Transitions */
`];return Object.entries(t).forEach(([r,a])=>{e.push(`  --transition-${r}: ${a};
`)}),`${e.join("")}
`}#K(t){let e=[`  /* Z-Index */
`];return Object.entries(t).forEach(([r,a])=>{e.push(`  --z-${r}: ${a};
`)}),`${e.join("")}
`}#X(t){let e=[`  /* Icon System */
`];return e.push(`  --icon-set: ${t.set};
`),e.push(`  --icon-weight: ${t.weight};
`),e.push(`  --icon-size: ${t.defaultSize};
`),Object.entries(t.sizes).forEach(([r,a])=>{e.push(`  --icon-size-${r}: ${a};
`)}),`${e.join("")}
`}#ee(t,e){if(!t?.dark)return"";let r=[],a=(p,d="")=>{Object.entries(p).forEach(([m,f])=>{typeof f=="object"&&f!==null?a(f,`${d}${m}-`):typeof f=="string"&&r.push(`  --color-${d}${m}: ${f};
`)})};Object.entries(t.dark).forEach(([p,d])=>{p!=="surfaceSmart"&&typeof d=="object"&&d!==null&&a(d,`${p}-`)});let n=[];t.dark.surfaceSmart&&(n.push(`  /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([p,d])=>{n.push(`  --surface-${p}-bg: ${d.bg};
`),n.push(`  --surface-${p}-text: ${d.text};
`),n.push(`  --surface-${p}-text-secondary: ${d.textSecondary};
`),n.push(`  --surface-${p}-text-muted: ${d.textMuted};
`),n.push(`  --surface-${p}-icon: ${d.icon};
`),n.push(`  --surface-${p}-icon-subtle: ${d.iconSubtle};
`),n.push(`  --surface-${p}-shadow: ${d.shadow};
`),n.push(`  --surface-${p}-border: ${d.border};
`)}),n.push(`
`));let i=`  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
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
`,l=this.#oe(t),u=e?[this.#u(e)]:[];return`html[data-theme="dark"] {
${[...r,...n,...u,i,s,l].join("")}}
`}#te(t,e){if(!t?.dark)return"";let r=[],a=(d,m="")=>{Object.entries(d).forEach(([f,b])=>{typeof b=="object"&&b!==null?a(b,`${m}${f}-`):typeof b=="string"&&r.push(`    --color-${m}${f}: ${b};
`)})};Object.entries(t.dark).forEach(([d,m])=>{d!=="surfaceSmart"&&typeof m=="object"&&m!==null&&a(m,`${d}-`)});let n=[];t.dark.surfaceSmart&&(n.push(`    /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([d,m])=>{n.push(`    --surface-${d}-bg: ${m.bg};
`),n.push(`    --surface-${d}-text: ${m.text};
`),n.push(`    --surface-${d}-text-secondary: ${m.textSecondary};
`),n.push(`    --surface-${d}-text-muted: ${m.textMuted};
`),n.push(`    --surface-${d}-icon: ${m.icon};
`),n.push(`    --surface-${d}-icon-subtle: ${m.iconSubtle};
`),n.push(`    --surface-${d}-shadow: ${m.shadow};
`),n.push(`    --surface-${d}-border: ${m.border};
`)}),n.push(`
`));let i=[];t.interactive&&t.interactive.dark&&(i.push(`    /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`    --color-primary-fill: ${t.interactive.dark.fill}; /* For button backgrounds with white text */
`),i.push(`    --color-primary-text: ${t.interactive.dark.text}; /* For links and outline buttons on dark surfaces */
`));let s=[`    --color-text-primary: var(--color-gray-100);
`,`    --color-text-secondary: var(--color-gray-300);
`,`    --color-text-muted: var(--color-gray-400);
`,`    --color-border: var(--color-gray-700);
`,`    --color-input-bg: var(--color-gray-800);
`,`    --color-input-disabled-bg: var(--color-gray-900);
`,`    --color-input-disabled-text: var(--color-gray-600);
`,`    --color-code-bg: var(--color-gray-800);
`,...i].join(""),l=`    /* Backdrop tokens - dark mode */
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
`,u=this.#re(t),c=e?[this.#u(e)]:[];return`
       html[data-theme="dark"] {
${[...r,...n,...c,s,l,u].join("")}       }
`}#re(t){let e=t.dark||t,r=e.primary?.[400]||"#60a5fa",a=e.secondary?.[400]||"#a78bfa",n=e.accent?.[400]||"#fbbf24";return`    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${r} 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, ${a} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, ${n} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, ${r} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${a} 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, ${r} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, ${n} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${n} 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, ${n} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${r} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, ${a} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, ${n} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, ${r} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, ${n} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, ${n} 10%, transparent) 0px, transparent 50%);
      `}#oe(t){let e=t.dark||t,r=e.primary?.[400]||"#60a5fa",a=e.secondary?.[400]||"#a78bfa",n=e.accent?.[400]||"#fbbf24";return`
  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${r} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${a} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${n} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${r} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${a} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${r} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${n} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${n} 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${n} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${r} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${a} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${n} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${r} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${n} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${n} 10%, transparent) 0px, transparent 50%);
    `}#ae(){return`/* Callout dark mode adjustments */
html[data-theme="dark"] {
  .callout-success { background-color: var(--color-success-50); border-color: var(--color-success-500); color: var(--color-success-900); }
  .callout-info { background-color: var(--color-info-50); border-color: var(--color-info-500); color: var(--color-info-900); }
  .callout-warning { background-color: var(--color-warning-50); border-color: var(--color-warning-500); color: var(--color-warning-900); }
  .callout-danger, .callout-error { background-color: var(--color-danger-50); border-color: var(--color-danger-500); color: var(--color-danger-900); }
  img, video { opacity: 0.8; transition: opacity var(--transition-normal); }
  img:hover, video:hover { opacity: 1; }
}`}#ne(){try{let t=this.options?.design?.options?.backgroundMesh;this.options.debug&&this.options.log?.("debug","backgroundMesh check:",t);let e=Number(t);return!Number.isFinite(e)||e===0?"":`/* Optional background mesh applied from config */
body {
  background: var(--background-mesh-0${Math.max(1,Math.min(5,Math.floor(e)))});
  background-attachment: fixed;
}`}catch(t){return this.options.debug&&this.options.log?.("error","Error in generateBodyBackgroundMeshRule:",t),""}}#ie(){try{return this.options?.design?.options?.liquidGlassEffects?`/* Liquid glass utility (opt-in via options.liquidGlassEffects) */
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
`:""}catch{return""}}#se(){return`/* ============================================================================
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

`}#ce(){let{layout:t={}}=this.options.design,e=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Semantic HTML Elements (low-specificity via :where()) */

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

`}#le(){let{gap:t,inputPadding:e,buttonPadding:r,focusRingWidth:a,focusRingOpacity:n,borderWidthThin:i,sectionSpacing:s,buttonMinHeight:l,inputMinHeight:u}=this.options.design,c=e||.75,p=r||1,d=a||3,m=i||1,f=t||1,b=s||2,h=l||44;return`/* Mobile-First Form Styles - Generated from Design Config */
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
  min-height: ${u||40}px;
  padding: calc(var(--spacing-1) * ${c}) var(--spacing-4);
  border: ${m}px solid var(--color-border);
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
      box-shadow: 0 0 0 ${d}px color-mix(in oklab, var(--color-danger-500) ${Math.round((n||.3)*100)}%, transparent);
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
  min-height: calc(${h}px * 0.75);
  padding: calc(var(--spacing-1) * ${p*.6}) calc(var(--spacing-4) * 0.85);
  border: ${m}px solid var(--color-border);
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
  box-shadow: 0 0 0 ${d}px color-mix(in oklab, var(--color-primary-500) ${Math.round((n||.3)*100)}%, transparent);
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
    min-height: calc(${h}px * 0.75);
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
    box-shadow: 0 0 0 ${d}px color-mix(in oklab, var(--color-primary-500) ${Math.round((n||.3)*100)}%, transparent);
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
  min-height: ${h}px;
  padding: calc(var(--spacing-1) * ${p}) var(--spacing-6);
  border: ${m}px solid transparent;
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
    box-shadow: 0 0 0 ${d}px color-mix(in oklab, var(--color-primary-500) ${Math.round((n||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${d}px color-mix(in oklab, var(--color-primary-500) ${Math.round((n||.3)*100)}%, transparent);
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
  min-height: calc(${h}px * 0.8);
}

.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  min-height: calc(${h}px * 0.6);
}


.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  min-height: calc(${h}px * 1.2);
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
  max-width: var(--layout-max-width-md);
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
  border: ${m}px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  .array-controls {
    padding-top: var(--spacing-3);
    border-top: ${m}px solid var(--color-border);
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

`}#de(){let{layout:t={}}=this.options.design,e=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`/* Table Styles - Mobile First */

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

`}#pe(){return`/* Callout/Notification Styles */

.callout {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: 4px solid;
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

`}#ue(){return`/* Accordion (details/summary) */

:where(.accordion details) {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  margin: 0 0 var(--spacing-3) 0;
  overflow: hidden;

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

`}#me(){let{layout:t={},behavior:e={}}=this.options.design;return`/* ============================================================================
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

`}#he(){let{layout:t={}}=this.options.design;return`/* Tab Strip Component */

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

`}#fe(){return`/* Custom Scrollbars */
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

`}#be(){let{a11y:t={}}=this.options.design,e=t.minTouchTarget||g.TouchTargetSizes.standard;return`/* Icon System */

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

`}#ye(){return`/* Dropdown Component */

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
    border: 1px solid var(--color-border);
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

  & > :last-child[aria-hidden="false"] {
    display: inline-block;
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

  menu {
    list-style: none;
  }

  menu li {
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

  &[data-mode="auto"] > :last-child {
    top: 100%;
    bottom: auto;
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
    scale: 0.95;
  }
}
`}#ve(){let{layout:t={}}=this.options.design,e=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},r=t.gridSystem||{},a=r.columns||[1,2,3,4,6],n=r.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=this.#z(t),s=[`
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

`];for(let l of a)s.push(`.grid-cols-${l} { grid-template-columns: repeat(${l}, 1fr); }
`);s.push(`
/* Auto-fit grids (responsive) */
`);for(let[l,u]of Object.entries(n))s.push(`.grid-auto-${l} { grid-template-columns: repeat(auto-fit, minmax(${u}, 1fr)); }
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
`),s.join("")}#xe(){return`/* Media Element Utilities */

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

`}#we(){let{layout:t={},a11y:e={}}=this.options.design,r=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},a=e.minTouchTarget||g.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

/* Small devices (${r.sm}px and up) */
@media (min-width: ${r.sm}px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } .sm\\:flex-row { flex-direction: row; } .sm\\:text-sm { font-size: var(--font-size-sm); } .sm\\:p-6 { padding: var(--spacing-6); } .sm\\:gap-6 { gap: var(--spacing-6); } .sm\\:hidden { display: none; } .sm\\:block { display: block; }
}

/* Medium devices (${r.md}px and up) */
@media (min-width: ${r.md}px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); } .md\\:text-lg { font-size: var(--font-size-lg); } .md\\:p-8 { padding: var(--spacing-8); } .md\\:gap-8 { gap: var(--spacing-8); } .md\\:flex-row { flex-direction: row; } .md\\:w-1\\/2 { width: 50%; } .md\\:w-1\\/3 { width: 33.333333%; } .md\\:hidden { display: none; } .md\\:block { display: block; }
}

/* Large devices (${r.lg}px and up) */
@media (min-width: ${r.lg}px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); } .lg\\:text-xl { font-size: var(--font-size-xl); } .lg\\:p-12 { padding: var(--spacing-12); } .lg\\:gap-12 { gap: var(--spacing-12); } .lg\\:w-1\\/4 { width: 25%; } .lg\\:hidden { display: none; } .lg\\:block { display: block; }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Touch devices - larger touch targets for interactive elements */
  button, a, select, textarea,
  input:not([type="radio"]):not([type="checkbox"]) {
    min-height: ${a}px;
    min-width: ${a}px;
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
    min-height: ${a}px;
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

`}#n(t){let e=parseInt(t.slice(1,3),16)/255,r=parseInt(t.slice(3,5),16)/255,a=parseInt(t.slice(5,7),16)/255,n=Math.max(e,r,a),i=Math.min(e,r,a),s,l,u=(n+i)/2;if(n===i)s=l=0;else{let c=n-i;switch(l=u>.5?c/(2-n-i):c/(n+i),n){case e:s=(r-a)/c+(r<a?6:0);break;case r:s=(a-e)/c+2;break;case a:s=(e-r)/c+4;break}s/=6}return{h:s*360,s:l*100,l:u*100}}#t(t,e,r){t=t/360,e=e/100,r=r/100;let a=(u,c,p)=>(p<0&&(p+=1),p>1&&(p-=1),p<1/6?u+(c-u)*6*p:p<1/2?c:p<2/3?u+(c-u)*(2/3-p)*6:u),n,i,s;if(e===0)n=i=s=r;else{let u=r<.5?r*(1+e):r+e-r*e,c=2*r-u;n=a(c,u,t+1/3),i=a(c,u,t),s=a(c,u,t-1/3)}let l=u=>{let c=Math.round(u*255).toString(16);return c.length===1?"0"+c:c};return`#${l(n)}${l(i)}${l(s)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#ke(){this.#e={tokens:this.#Se(),primitives:this.#$e(),components:this.#ze(),utilities:this.#Me()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#Se(){let{colors:t,spacing:e,radius:r,borderWidths:a,typography:n,shadows:i,darkShadows:s,layout:l,transitions:u,zIndex:c,icons:p}=this.tokens,d=[`@layer tokens {
       :root {
          ${this.#_(t)}
          ${this.#G(e)}
          ${this.#V(r)}
          ${this.#J(a)}
          ${this.#Y(n)}
          ${this.#u(i)}
          ${this.#Q(l)}
          ${this.#Z(u)}
          ${this.#K(c)}
          ${this.#X(p)}
       }
       ${this.#te(t,s)}
    }`];return d.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),d.push(this.#ee(t,s)),d.join("")}#$e(){let{advanced:t={},a11y:e={},layout:r={}}=this.options.design,a=t.tabSize||g.TabSizes.standard,n=e.minTouchTarget||g.TouchTargetSizes.standard,i=r.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
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
    tab-size: ${a};
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
    min-height: ${n}px;
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

`}#ze(){return`@layer components {

${this.#ce()}

${this.#le()}

${this.#pe()}

${this.#ge()}

${this.#me()}

${this.#ue()}

${this.#ye()}

${this.#he()}

${this.#de()}

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
  border: 1px solid var(--color-border);
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

${this.#fe()}

${this.#ae()}

}
`}#Me(){return`@layer utilities {

${this.#be()}

${this.#ve()}

/* Optional utilities/features controlled by config options */
/* - Body background mesh rule (applies one of the generated mesh vars) */
/* - Liquid glass utility class */
${this.#ne()}
${this.#ie()}

${this.#se()}

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


${this.#xe()}

${this.#we()}

}
`}#Ee(){this.#a={tokens:new CSSStyleSheet,primitives:new CSSStyleSheet,components:new CSSStyleSheet,utilities:new CSSStyleSheet},this.#Fe()}#Fe(){this.#a.tokens.replaceSync(this.#e.tokens),this.#a.primitives.replaceSync(this.#e.primitives),this.#a.components.replaceSync(this.#e.components),this.#a.utilities.replaceSync(this.#e.utilities)}get tokensCSS(){return this.#e?.tokens||""}get primitivesCSS(){return this.#e?.primitives||""}get componentsCSS(){return this.#e?.components||""}get utilitiesCSS(){return this.#e?.utilities||""}get layeredCSS(){return this.#e?`${this.#e.tokens}
${this.#e.primitives}
${this.#e.components}
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof M<"u"?M:null,enums:typeof g<"u"?g:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let t=[],e=this.tokens.colors;for(let[r,a]of Object.entries(e))typeof a=="object"&&a!==null&&t.push({name:r,scale:a});return t},getColorScale:t=>this.tokens.colors[t]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([t,e])=>({key:t,value:e})),getTypography:()=>this.tokens.typography,getLayerCSS:t=>{let e=["tokens","primitives","components","utilities"];if(!e.includes(t))throw new Error(`Invalid layer: ${t}. Must be one of ${e.join(", ")}`);return this.#e?.[t]||""},usesEnumValue:(t,e)=>{let r=this.options.design||{};return JSON.stringify(r).includes(e)}}}}get tokensStylesheet(){return this.#a?.tokens}get primitivesStylesheet(){return this.#a?.primitives}get componentsStylesheet(){return this.#a?.components}get utilitiesStylesheet(){return this.#a?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#c("tokens",this.#e.tokens),"pds-primitives.css.js":this.#c("primitives",this.#e.primitives),"pds-components.css.js":this.#c("components",this.#e.components),"pds-utilities.css.js":this.#c("utilities",this.#e.utilities),"pds-styles.css.js":this.#c("styles",this.layeredCSS)}}#c(t,e){let r=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${t}
// Auto-generated - do not edit directly

export const ${t} = new CSSStyleSheet();
${t}.replaceSync(\`${r}\`);

export const ${t}CSS = \`${r}\`;
`}};var ne=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(t={}){this._mode="static",this._staticPaths={...this._staticPaths,...t}}async getStylesheet(t){if(this._mode==="live")return null;try{return(await import(this._staticPaths[t]))[t]}catch(e){console.error(`[PDS Registry] Failed to load static ${t}:`,e),console.error(`[PDS Registry] Looking for: ${this._staticPaths[t]}`),console.error("[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");let r=new CSSStyleSheet;return r.replaceSync("/* Failed to load "+t+" */"),r}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},ie=new ne;function et(o){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let r=new CSSStyleSheet;r.replaceSync(o),r._pds=!0;let a=(document.adoptedStyleSheets||[]).filter(n=>n._pds!==!0);document.adoptedStyleSheets=[...a,r];return}let t="pds-runtime-stylesheet",e=document.getElementById(t);if(!e){e=document.createElement("style"),e.id=t,e.type="text/css";let r=document.head||document.getElementsByTagName("head")[0];r?r.appendChild(e):document.documentElement.appendChild(e)}e.textContent=o}catch(t){console.warn("installRuntimeStyles failed:",t)}}function J(o){let t=o;if(!t||typeof t!="object"){console.error("[Runtime] applyStyles requires an explicit generator instance in live mode");return}let e=t.layeredCSS||t.css||"";if(!e){t.options?.log?.("warn","[Runtime] No CSS available on generator to apply");return}et(e)}async function ze(o,t=[],e=null){try{let r=e?.primitivesStylesheet?e.primitivesStylesheet:await ie.getStylesheet("primitives");o.adoptedStyleSheets=[r,...t]}catch(r){let a=o.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${a}> failed to adopt primitives:`,r),o.adoptedStyleSheets=t}}async function Me(o,t=["primitives"],e=[],r=null){try{let n=(await Promise.all(t.map(async i=>{if(r)switch(i){case"tokens":return r.tokensStylesheet;case"primitives":return r.primitivesStylesheet;case"components":return r.componentsStylesheet;case"utilities":return r.utilitiesStylesheet;default:break}return ie.getStylesheet(i)}))).filter(i=>i!==null);o.adoptedStyleSheets=[...n,...e]}catch(a){let n=o.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${n}> failed to adopt layers:`,a),o.adoptedStyleSheets=e}}var tt=[{selector:".accordion"},{selector:"nav[data-dropdown]"},{selector:"label[data-toggle]"},{selector:'input[type="range"]'},{selector:"form[data-required]"},{selector:"fieldset[role=group][data-open]"},{selector:"[data-clip]"},{selector:"button, a[class*='btn-']"}];function rt(o){o.dataset.enhancedAccordion||(o.dataset.enhancedAccordion="true",o.addEventListener("toggle",t=>{t.target.open&&t.target.parentElement===o&&o.querySelectorAll(":scope > details[open]").forEach(e=>{e!==t.target&&(e.open=!1)})},!0))}function ot(o){if(o.dataset.enhancedDropdown)return;o.dataset.enhancedDropdown="true";let t=o.lastElementChild;if(!t)return;let e=o.querySelector("[data-dropdown-toggle]")||o.querySelector("button");e&&!e.hasAttribute("type")&&e.setAttribute("type","button"),t.id||(t.id=`dropdown-${Math.random().toString(36).slice(2,9)}`),t.tagName?.toLowerCase()==="menu"&&!t.hasAttribute("role")&&t.setAttribute("role","menu"),t.hasAttribute("aria-hidden")||t.setAttribute("aria-hidden","true"),e&&(e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-controls",t.id),e.setAttribute("aria-expanded","false"));let a=()=>{let c=(o.getAttribute("data-direction")||o.getAttribute("data-dropdown-direction")||o.getAttribute("data-mode")||"auto").toLowerCase();if(c==="up"||c==="down")return c;let p=o.getBoundingClientRect(),d=t?.getBoundingClientRect?.()||{height:0},m=Math.max(t?.offsetHeight||0,t?.scrollHeight||0,d.height||0,200),f=Math.max(0,window.innerHeight-p.bottom),b=Math.max(0,p.top);return f>=m?"down":b>=m||b>f?"up":"down"},n=()=>{let c=(o.getAttribute("data-align")||o.getAttribute("data-dropdown-align")||"auto").toLowerCase();if(c==="left"||c==="right"||c==="start"||c==="end")return c==="start"?"left":c==="end"?"right":c;let p=o.getBoundingClientRect(),d=t?.getBoundingClientRect?.()||{width:0},m=Math.max(t?.offsetWidth||0,t?.scrollWidth||0,d.width||0,240),f=Math.max(0,window.innerWidth-p.left),b=Math.max(0,p.right);return f>=m?"left":b>=m||b>f?"right":"left"},i=null,s=()=>{o.dataset.dropdownDirection=a(),o.dataset.dropdownAlign=n(),t.setAttribute("aria-hidden","false"),e?.setAttribute("aria-expanded","true"),i||(i=c=>{(c.composedPath?c.composedPath():[c.target]).some(m=>m===o)||l()},setTimeout(()=>{document.addEventListener("click",i)},0))},l=()=>{t.setAttribute("aria-hidden","true"),e?.setAttribute("aria-expanded","false"),i&&(document.removeEventListener("click",i),i=null)},u=()=>{t.getAttribute("aria-hidden")==="false"?l():s()};e?.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),u()}),o.addEventListener("keydown",c=>{c.key==="Escape"&&(l(),e?.focus())}),o.addEventListener("focusout",c=>{c.relatedTarget&&((c.composedPath?c.composedPath():[c.relatedTarget]).some(m=>m===o)||l())})}function at(o){if(o.dataset.enhancedToggle)return;o.dataset.enhancedToggle="true";let t=o.querySelector('input[type="checkbox"]');if(!t)return;o.hasAttribute("tabindex")||o.setAttribute("tabindex","0"),o.setAttribute("role","switch"),o.setAttribute("aria-checked",t.checked?"true":"false");let e=document.createElement("span");e.className="toggle-switch",e.setAttribute("role","presentation"),e.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="toggle-knob",e.appendChild(r),o.insertBefore(e,t.nextSibling);let a=()=>{o.setAttribute("aria-checked",t.checked?"true":"false")},n=()=>{t.disabled||(t.checked=!t.checked,a(),t.dispatchEvent(new Event("change",{bubbles:!0})))};o.addEventListener("click",i=>{i.preventDefault(),n()}),o.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),n())}),t.addEventListener("change",a)}function nt(o){if(o.dataset.enhancedRange)return;let t=o.closest("label"),e=t?.classList.contains("range-output"),r=o.id||`range-${Math.random().toString(36).substring(2,11)}`,a=`${r}-output`;if(o.id=r,e){let n=t.querySelector("span");if(n&&!n.classList.contains("range-output-wrapper")){let i=document.createElement("span");i.className="range-output-wrapper",i.style.display="flex",i.style.justifyContent="space-between",i.style.alignItems="center";let s=document.createElement("span");s.textContent=n.textContent,i.appendChild(s);let l=document.createElement("output");l.id=a,l.setAttribute("for",r),l.style.color="var(--surface-text-secondary, var(--color-text-secondary))",l.style.fontSize="0.875rem",l.textContent=o.value,i.appendChild(l),n.textContent="",n.appendChild(i);let u=()=>{l.textContent=o.value};o.addEventListener("input",u)}}else{let n=o.closest(".range-container");n||(n=document.createElement("div"),n.className="range-container",o.parentNode?.insertBefore(n,o),n.appendChild(o)),n.style.position="relative";let i=document.createElement("output");i.id=a,i.setAttribute("for",r),i.className="range-bubble",i.setAttribute("aria-live","polite"),n.appendChild(i);let s=()=>{let c=parseFloat(o.min)||0,p=parseFloat(o.max)||100,d=parseFloat(o.value),m=(d-c)/(p-c);i.style.left=`calc(${m*100}% )`,i.textContent=String(d)},l=()=>i.classList.add("visible"),u=()=>i.classList.remove("visible");o.addEventListener("input",s),o.addEventListener("pointerdown",l),o.addEventListener("pointerup",u),o.addEventListener("pointerleave",u),o.addEventListener("focus",l),o.addEventListener("blur",u),s()}o.dataset.enhancedRange="1"}function it(o){if(o.dataset.enhancedRequired)return;o.dataset.enhancedRequired="true";let t=e=>{let r;if(e.closest("[role$=group]")?r=e.closest("[role$=group]").querySelector("legend"):r=e.closest("label"),!r||r.querySelector(".required-asterisk"))return;let a=document.createElement("span");a.classList.add("required-asterisk"),a.textContent="*",a.style.marginLeft="4px";let n=r.querySelector("span, [data-label]");if(n)n.appendChild(a);else{let s=r.querySelector("input, select, textarea");s?r.insertBefore(a,s):r.appendChild(a)}let i=e.closest("form");if(i&&!i.querySelector(".required-legend")){let s=document.createElement("small");s.classList.add("required-legend"),s.textContent="* Required fields",i.insertBefore(s,i.querySelector(".form-actions")||i.lastElementChild)}};o.querySelectorAll("[required]").forEach(e=>{t(e)})}function st(o){if(o.dataset.enhancedOpenGroup)return;o.dataset.enhancedOpenGroup="true",o.classList.add("flex","flex-wrap","buttons");let t=document.createElement("input");t.type="text",t.placeholder="Add item...",t.classList.add("input-text","input-sm"),t.style.width="auto";let e=o.querySelector('input[type="radio"], input[type="checkbox"]');o.appendChild(t),t.addEventListener("keydown",r=>{if(r.key==="Enter"||r.key==="Tab"){let a=t.value.trim();if(a){r.preventDefault();let n=e.type==="radio"?"radio":"checkbox",i=`open-group-${Math.random().toString(36).substring(2,11)}`,s=document.createElement("label"),l=document.createElement("span");l.setAttribute("data-label",""),l.textContent=a;let u=document.createElement("input");u.type=n,u.name=e.name||o.getAttribute("data-name")||"open-group",u.value=a,u.id=i,s.appendChild(l),s.appendChild(u),o.insertBefore(s,t),t.value=""}}else if(r.key==="Backspace"&&t.value===""){r.preventDefault();let a=o.querySelectorAll("label");a.length>0&&a[a.length-1].remove()}})}function ct(o){if(o.dataset.enhancedClip)return;o.dataset.enhancedClip="true",o.hasAttribute("tabindex")||o.setAttribute("tabindex","0"),o.hasAttribute("role")||o.setAttribute("role","button");let t=()=>{let r=o.getAttribute("data-clip-open")==="true";o.setAttribute("aria-expanded",r?"true":"false")},e=()=>{let r=o.getAttribute("data-clip-open")==="true";o.setAttribute("data-clip-open",r?"false":"true"),t()};o.addEventListener("click",r=>{r.defaultPrevented||e()}),o.addEventListener("keydown",r=>{(r.key===" "||r.key==="Enter")&&(r.preventDefault(),e())}),t()}function lt(o){if(o.dataset.enhancedBtnWorking)return;o.dataset.enhancedBtnWorking="true";let t=null,e=!1;new MutationObserver(a=>{a.forEach(n=>{if(n.attributeName==="class"){let i=o.classList.contains("btn-working"),s=o.querySelector("pds-icon");if(i)if(s)t||(t=s.getAttribute("icon")),s.setAttribute("icon","circle-notch");else{let l=document.createElement("pds-icon");l.setAttribute("icon","circle-notch"),l.setAttribute("size","sm"),o.insertBefore(l,o.firstChild),e=!0}else n.oldValue?.includes("btn-working")&&s&&(e?(s.remove(),e=!1):t&&(s.setAttribute("icon",t),t=null))}})}).observe(o,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var dt=new Map([[".accordion",rt],["nav[data-dropdown]",ot],["label[data-toggle]",at],['input[type="range"]',nt],["form[data-required]",it],["fieldset[role=group][data-open]",st],["[data-clip]",ct],["button, a[class*='btn-']",lt]]),Ee=tt.map(o=>({...o,run:dt.get(o.selector)||(()=>{})}));var Fe=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
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
    `.trim()}];var Te="pds",pt=/^([a-z][a-z0-9+\-.]*:)?\/\//i,Ce=/^[a-z]:/i;function I(o=""){return o.endsWith("/")?o:`${o}/`}function ut(o="",t=Te){let e=o.replace(/\/+$/,"");return new RegExp(`(?:^|/)${t}$`,"i").test(e)?e:`${e}/${t}`}function gt(o){return o.replace(/^\.\/+/,"")}function mt(o){return Ce.test(o)?o.replace(Ce,"").replace(/^\/+/,""):o}function ht(o){return o.startsWith("public/")?o.substring(7):o}function Le(o,t={}){let e=t.segment||Te,r=t.defaultRoot||`/assets/${e}/`,a=o?.public&&o.public?.root||o?.static&&o.static?.root||null;if(!a||typeof a!="string")return I(r);let n=a.trim();return n?(n=n.replace(/\\/g,"/"),n=ut(n,e),n=I(n),pt.test(n)?n:(n=gt(n),n=mt(n),n.startsWith("/")||(n=ht(n),n.startsWith("/")||(n=`/${n}`),n=n.replace(/\/+/g,(i,s)=>s===0?i:"/")),I(n))):I(r)}function Ae(o){let t=o.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(t.toLowerCase()))return!0;let a=document.createElement("canvas").getContext("2d");if(!a)return!1;let n="mmmmmmmmmmlli",i="72px",s="monospace";a.font=`${i} ${s}`;let l=a.measureText(n).width;a.font=`${i} "${t}", ${s}`;let u=a.measureText(n).width;return l!==u}function ft(o){return o?o.split(",").map(r=>r.trim())[0].replace(/['"]/g,"").trim():null}async function bt(o,t={}){if(!o)return Promise.resolve();let{weights:e=[400,500,600,700],italic:r=!1}=t,a=ft(o);if(!a||Ae(a))return Promise.resolve();let n=encodeURIComponent(a);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${n}"]`)?(console.log(`Font "${a}" is already loading or loaded`),Promise.resolve()):(console.log(`Loading font "${a}" from Google Fonts...`),new Promise((s,l)=>{let u=document.createElement("link");u.rel="stylesheet";let c=r?`ital,wght@0,${e.join(";0,")};1,${e.join(";1,")}`:`wght@${e.join(";")}`;u.href=`https://fonts.googleapis.com/css2?family=${n}:${c}&display=swap`,u.setAttribute("data-font-loader",a),u.onload=()=>{console.log(`Successfully loaded font "${a}"`),s()},u.onerror=()=>{console.warn(`Failed to load font "${a}" from Google Fonts`),l(new Error(`Failed to load font: ${a}`))},document.head.appendChild(u),setTimeout(()=>{Ae(a)||console.warn(`Font "${a}" did not load within timeout`),s()},5e3)}))}async function se(o){if(!o)return Promise.resolve();let t=new Set;o.fontFamilyHeadings&&t.add(o.fontFamilyHeadings),o.fontFamilyBody&&t.add(o.fontFamilyBody),o.fontFamilyMono&&t.add(o.fontFamilyMono);let e=Array.from(t).map(r=>bt(r).catch(a=>{console.warn(`Could not load font: ${r}`,a)}));await Promise.all(e)}var vt=/^[a-z][a-z0-9+\-.]*:\/\//i,H=(()=>{try{return import.meta.url}catch{return}})(),Y=o=>typeof o=="string"&&o.length&&!o.endsWith("/")?`${o}/`:o;function Q(o,t={}){if(!o||vt.test(o))return o;let{preferModule:e=!0}=t,r=()=>{if(!H)return null;try{return new URL(o,H).href}catch{return null}},a=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(o,window.location.origin).href}catch{return null}};return(e?r()||a():a()||r())||o}var je=(()=>{if(H)try{let o=new URL(H);if(/\/public\/assets\/js\//.test(o.pathname))return new URL("../pds/",H).href}catch{return}})(),Be=!1;function Ne(o){Be||typeof document>"u"||(Be=!0,o.addEventListener("pds:ready",t=>{let e=t.detail?.mode;e&&document.documentElement.classList.add(`pds-${e}`,"pds-ready")}))}function de(o={},t={}){if(!t||typeof t!="object")return o;let e=Array.isArray(o)?[...o]:{...o};for(let[r,a]of Object.entries(t))a&&typeof a=="object"&&!Array.isArray(a)?e[r]=de(e[r]&&typeof e[r]=="object"?e[r]:{},a):e[r]=a;return e}function le(o=""){return String(o).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function B(o){if(o==null)return o;if(typeof o=="function")return;if(typeof o!="object")return o;if(Array.isArray(o))return o.map(e=>B(e)).filter(e=>e!==void 0);let t={};for(let e in o)if(o.hasOwnProperty(e)){let r=o[e];if(typeof r!="function"){let a=B(r);a!==void 0&&(t[e]=a)}}return t}function pe(o={},t={},{presets:e,defaultLog:r}){let a=o&&typeof o.log=="function"?o.log:r,n=typeof o=="object"&&("colors"in o||"typography"in o||"spatialRhythm"in o||"shape"in o||"behavior"in o||"layout"in o||"advanced"in o||"a11y"in o||"components"in o||"icons"in o),i=o&&o.enhancers;i&&!Array.isArray(i)&&(i=Object.values(i));let s=i??t.enhancers??[],l=o&&o.preset,u=o&&o.design,c=o&&o.icons&&typeof o.icons=="object"?o.icons:null,p="preset"in(o||{})||"design"in(o||{})||"enhancers"in(o||{});o&&typeof o=="object"&&ke(o,{log:a,context:"PDS.start"});let d,m=null;if(p){u&&typeof u=="object"&&re(u,{log:a,context:"PDS.start"});let f=String(l||"default").toLowerCase(),b=e?.[f]||Object.values(e||{}).find(v=>le(v.name)===f||String(v.name||"").toLowerCase()===f);if(!b)throw new Error(`PDS preset not found: "${l||"default"}"`);m={id:b.id||le(b.name),name:b.name||b.id||String(f)};let h=structuredClone(b);if(u&&typeof u=="object"||c){let v=u?B(u):{},x=c?B(c):null,C=x?de(v,{icons:x}):v;h=de(h,structuredClone(C))}let{mode:w,autoDefine:z,applyGlobalStyles:S,manageTheme:L,themeStorageKey:R,preloadStyles:F,criticalLayers:A,managerURL:k,manager:$,preset:E,design:W,enhancers:K,log:q,...y}=o;d={...y,design:h,preset:m.name,log:q||r}}else if(n){re(o,{log:a,context:"PDS.start"});let{log:f,...b}=o;d={design:structuredClone(b),log:f||r}}else{let f=e?.default||Object.values(e||{}).find(b=>le(b.name)==="default");if(!f)throw new Error("PDS default preset not available");m={id:f.id||"default",name:f.name||"Default"},d={design:structuredClone(f),preset:m.name,log:r}}return{generatorConfig:d,enhancers:s,presetInfo:m}}function Pe({manageTheme:o,themeStorageKey:t,applyResolvedTheme:e,setupSystemListenerIfNeeded:r}){let a="light",n=null;if(o&&typeof window<"u"){try{n=localStorage.getItem(t)||null}catch{n=null}try{e?.(n),r?.(n)}catch{}n?n==="system"?a=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":a=n:a=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:a,storedTheme:n}}function Oe(o,{resolvePublicAssetURL:t}){let e=!!(o?.public?.root||o?.static?.root),r=t(o);return!e&&je&&(r=je),Y(Q(r))}async function De(o,{baseEnhancers:t=[]}={}){let{autoDefineBaseURL:e="/auto-define/",autoDefinePreload:r=[],autoDefineMapper:a=null,enhancers:n=[],autoDefineOverrides:i=null,autoDefinePreferModule:s=!0}=o,l=(()=>{let c=new Map;return(t||[]).forEach(p=>c.set(p.selector,p)),(n||[]).forEach(p=>c.set(p.selector,p)),Array.from(c.values())})(),u=null;if(typeof window<"u"&&typeof document<"u"){let c=null;try{let h=await Promise.resolve().then(()=>(We(),Re));c=h?.AutoDefiner||h?.default?.AutoDefiner||h?.default||null}catch(h){console.warn("AutoDefiner not available:",h?.message||h)}let p=h=>{switch(h){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${h}.js`}},{mapper:d,...m}=i&&typeof i=="object"?i:{},b={baseURL:e&&Y(Q(e,{preferModule:s})),predefine:r,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:l,onError:(h,w)=>{if(typeof h=="string"&&h.startsWith("pds-")){let S=["pds-form","pds-drawer"].includes(h),L=w?.message?.includes("#pds/lit")||w?.message?.includes("Failed to resolve module specifier");S&&L?console.error(`\u274C PDS component <${h}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`):console.warn(`\u26A0\uFE0F PDS component <${h}> not found. Assets may not be installed.`)}else console.error(`\u274C Auto-define error for <${h}>:`,w)},...m,mapper:h=>{if(customElements.get(h))return null;if(typeof a=="function")try{let w=a(h);return w===void 0?p(h):w}catch(w){return console.warn("Custom autoDefine.mapper error; falling back to default:",w?.message||w),p(h)}return p(h)}};c&&(u=new c(b),r.length>0&&typeof c.define=="function"&&await c.define(...r,{baseURL:e,mapper:b.mapper,onError:b.onError}))}return{autoDefiner:u,mergedEnhancers:l}}var ue=["light","dark"],ge=new Set(ue);function xt(o){let e=(Array.isArray(o?.themes)?o.themes.map(r=>String(r).toLowerCase()):ue).filter(r=>ge.has(r));return e.length?e:ue}function me(o,{preferDocument:t=!0}={}){let e=String(o||"").toLowerCase();if(ge.has(e))return e;if(t&&typeof document<"u"){let r=document.documentElement?.getAttribute("data-theme");if(ge.has(r))return r}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function he(o,t){let e=me(t);return xt(o).includes(e)}var _e=!1,_=null;function St(){if(typeof window>"u"||!window.localStorage)return null;try{let o=window.localStorage.getItem("pure-ds-config");if(!o)return null;let t=JSON.parse(o);if(t&&("preset"in t||"design"in t))return t}catch{return null}return null}function ve(o={},t={}){if(!t||typeof t!="object")return o;let e=Array.isArray(o)?[...o]:{...o};for(let[r,a]of Object.entries(t))a&&typeof a=="object"&&!Array.isArray(a)?e[r]=ve(e[r]&&typeof e[r]=="object"?e[r]:{},a):e[r]=a;return e}function $t(o){let t=St();if(!t||!o||typeof o!="object")return o;let e=t.preset,r=t.design&&typeof t.design=="object"?t.design:null;if(!e&&!r)return o;let a="preset"in o||"design"in o||"enhancers"in o,n={...o};if(e&&(n.preset=e),r)if(a){let i=o.design&&typeof o.design=="object"?o.design:{};n.design=ve(i,r)}else n=ve(o,r);return n}async function zt(o,{applyResolvedTheme:t,setupSystemListenerIfNeeded:e}){if(_e)return;let[r,a,n,i]=await Promise.all([Promise.resolve().then(()=>(ae(),$e)),Promise.resolve().then(()=>(G(),xe)),Promise.resolve().then(()=>(ye(),be)),Promise.resolve().then(()=>(He(),Ie))]),s=r?.default||r?.ontology,l=r?.findComponentForElement,u=a?.enums;_=n?.PDSQuery||n?.default||null,o.ontology=s,o.findComponentForElement=l,o.enums=u,o.common=i||{},o.presets=O,o.configRelations=we,o.enhancerMetadata=Fe,o.applyStyles=function(c){return J(c||T.instance)},o.adoptLayers=function(c,p,d){return Me(c,p,d,T.instance)},o.adoptPrimitives=function(c,p){return ze(c,p,T.instance)},o.getGenerator=async function(){return T},o.query=async function(c){if(!_){let d=await Promise.resolve().then(()=>(ye(),be));_=d?.PDSQuery||d?.default||null}return _?await new _(o).search(c):[]},o.applyLivePreset=async function(c,p={}){if(!c)return!1;if(!o.registry?.isLive)return console.warn("PDS.applyLivePreset is only available in live mode."),!1;let d=o.currentConfig||{},{design:m,preset:f,...b}=d,h={...structuredClone(B(b)),preset:c},w=pe(h,{},{presets:O,defaultLog:oe}),z=me(o.theme);if(!he(w.generatorConfig.design,z)){let F=w.presetInfo?.name||w.generatorConfig?.design?.name||c;console.warn(`PDS theme "${z}" not supported by preset "${F}".`)}d.theme&&!w.generatorConfig.theme&&(w.generatorConfig.theme=d.theme);let S=new T(w.generatorConfig);if(w.generatorConfig.design?.typography)try{await se(w.generatorConfig.design.typography)}catch(F){w.generatorConfig?.log?.("warn","Failed to load some fonts from Google Fonts:",F)}await J(S);let L=w.presetInfo||{id:c,name:c};if(o.currentPreset=L,o.currentConfig=Object.freeze({...d,preset:w.generatorConfig.preset,design:structuredClone(w.generatorConfig.design),theme:w.generatorConfig.theme||d.theme}),p?.persist!==!1&&typeof window<"u"){let F="pure-ds-config";try{let A=localStorage.getItem(F),k=A?JSON.parse(A):null,$={...k&&typeof k=="object"?k:{},preset:L.id||c,design:structuredClone(w.generatorConfig.design||{})};localStorage.setItem(F,JSON.stringify($))}catch(A){w.generatorConfig?.log?.("warn","Failed to store preset:",A)}}return!0},Object.getOwnPropertyDescriptor(o,"compiled")||Object.defineProperty(o,"compiled",{get(){return o.registry?.isLive&&T.instance?T.instance.compiled:null},enumerable:!0,configurable:!1}),o.preloadCritical=function(c,p={}){if(typeof window>"u"||!document.head||!c)return;let{theme:d,layers:m=["tokens"]}=p;try{let f=d||"light";(d==="system"||!d)&&(f=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",f);let b=c.design?{...c,theme:f}:{design:c,theme:f},h=new T(b),w=m.map(z=>{try{return h.css?.[z]||""}catch{return""}}).filter(z=>z.trim()).join(`
`);if(w){let z=document.head.querySelector("style[data-pds-preload]");z&&z.remove();let S=document.createElement("style");S.setAttribute("data-pds-preload",""),S.textContent=w,document.head.insertBefore(S,document.head.firstChild)}}catch(f){console.warn("PDS preload failed:",f)}},_e=!0}async function Mt(o,t,{emitReady:e,applyResolvedTheme:r,setupSystemListenerIfNeeded:a}){if(!t||typeof t!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");if(t=$t(t),await zt(o,{applyResolvedTheme:r,setupSystemListenerIfNeeded:a}),Ne(o),typeof document<"u"&&document.adoptedStyleSheets){let p=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(m=>m._pdsFouc)){let m=new CSSStyleSheet;m.replaceSync(p),m._pdsFouc=!0,document.adoptedStyleSheets=[m,...document.adoptedStyleSheets]}}catch(d){if(console.warn("Constructable stylesheets not supported, using <style> tag fallback:",d),!document.head.querySelector("style[data-pds-fouc]")){let f=document.createElement("style");f.setAttribute("data-pds-fouc",""),f.textContent=p,document.head.insertBefore(f,document.head.firstChild)}}}let n=t.applyGlobalStyles??!0,i=t.manageTheme??!0,s=t.themeStorageKey??"pure-ds-theme",l=t.preloadStyles??!1,u=t.criticalLayers??["tokens","primitives"],c=t&&t.autoDefine||null;try{let{resolvedTheme:p}=Pe({manageTheme:i,themeStorageKey:s,applyResolvedTheme:r,setupSystemListenerIfNeeded:a}),d=pe(t,{},{presets:O,defaultLog:oe});if(i&&!he(d.generatorConfig.design,p)){let k=d.presetInfo?.name||d.generatorConfig?.design?.name||d.generatorConfig?.preset||"current preset";console.warn(`PDS theme "${p}" not supported by preset "${k}".`)}let m=d.enhancers,{log:f,...b}=d.generatorConfig,h=structuredClone(b);h.log=f,i&&(h.theme=p);let w=new T(h);if(h.design?.typography)try{await se(h.design.typography)}catch(k){h?.log?.("warn","Failed to load some fonts from Google Fonts:",k)}if(l&&typeof window<"u"&&document.head)try{let k=u.map($=>{try{return w.css?.[$]||""}catch(E){return h?.log?.("warn",`Failed to generate critical CSS for layer "${$}":`,E),""}}).filter($=>$.trim()).join(`
`);if(k){let $=document.head.querySelector("style[data-pds-critical]");$&&$.remove();let E=document.createElement("style");E.setAttribute("data-pds-critical",""),E.textContent=k;let W=document.head.querySelector('meta[charset], meta[name="viewport"]');W?W.parentNode.insertBefore(E,W.nextSibling):document.head.insertBefore(E,document.head.firstChild)}}catch(k){h?.log?.("warn","Failed to preload critical styles:",k)}o.registry.setLiveMode(),d.presetInfo?.name?h?.log?.("log",`PDS live with preset "${d.presetInfo.name}"`):h?.log?.("log","PDS live with custom config"),n&&(await J(T.instance),typeof window<"u"&&setTimeout(()=>{let k=document.head.querySelector("style[data-pds-critical]");k&&k.remove();let $=document.head.querySelector("style[data-pds-preload]");$&&$.remove();let E=document.getElementById("pds-runtime-stylesheet");E&&E.remove()},100));let z=Oe(t,{resolvePublicAssetURL:Le}),S;c&&c.baseURL?S=Y(Q(c.baseURL,{preferModule:!1})):S=`${z}components/`;let L=null,R=[];try{let k=await De({autoDefineBaseURL:S,autoDefinePreload:c&&Array.isArray(c.predefine)&&c.predefine||[],autoDefineMapper:c&&typeof c.mapper=="function"&&c.mapper||null,enhancers:m,autoDefineOverrides:c||null,autoDefinePreferModule:!(c&&c.baseURL)},{baseEnhancers:Ee});L=k.autoDefiner,R=k.mergedEnhancers||[]}catch(k){h?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",k)}let F=w?.options||h,A=B(t);if(o.currentConfig=Object.freeze({mode:"live",...structuredClone(A),design:structuredClone(d.generatorConfig.design),preset:d.generatorConfig.preset,theme:p,enhancers:R}),t?.liveEdit&&typeof document<"u")try{document.querySelector("pds-live-edit")||setTimeout(()=>{let k=document.createElement("pds-live-edit");document.body.appendChild(k)},1e3)}catch(k){h?.log?.("warn","Live editor failed to start:",k)}return e({mode:"live",generator:w,config:F,theme:p,autoDefiner:L}),{generator:w,config:F,theme:p,autoDefiner:L}}catch(p){throw o.dispatchEvent(new CustomEvent("pds:error",{detail:{error:p}})),p}}export{Mt as startLive};
