var De=Object.defineProperty;var U=(n,t)=>()=>(n&&(t=n(n=0)),t);var D=(n,t)=>{for(var e in t)De(n,e,{get:t[e],enumerable:!0})};var pe={};D(pe,{enums:()=>g});var g,q=U(()=>{g={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"},IconSizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64,"3xl":96}}});var fe={};D(fe,{default:()=>Ve,findComponentForElement:()=>Ie,getAllSelectors:()=>He,getAllTags:()=>Ge,getByCategory:()=>qe,ontology:()=>M,searchOntology:()=>_e});function A(n,t){if(!n||!t)return!1;try{return n.matches(t)}catch{return!1}}function he(n,t){if(!n||!t||!n.closest)return null;try{return n.closest(t)}catch{return null}}function Ie(n,{maxDepth:t=5}={}){if(!n||n.closest&&n.closest(".showcase-toc"))return null;let e=n,r=0;for(;e&&r<t;){if(r++,e.tagName==="DS-SHOWCASE")return null;if(e.classList&&e.classList.contains("showcase-section")){e=e.parentElement;continue}for(let a of PDS.ontology.enhancements){let i=a.selector||a;if(A(e,i))return{element:e,componentType:"enhanced-component",displayName:a.description||i,id:a.id}}if(e.tagName==="FIELDSET"){let a=e.getAttribute("role");if(a==="group"||a==="radiogroup")return{element:e,componentType:"form-group",displayName:a==="radiogroup"?"radio group":"form group"}}if(e.tagName==="LABEL"&&e.querySelector&&e.querySelector("input,select,textarea"))return{element:e,componentType:"form-control",displayName:"label with input"};let o=e.closest?e.closest("label"):null;if(o&&o.querySelector&&o.querySelector("input,select,textarea"))return{element:o,componentType:"form-control",displayName:"label with input"};for(let a of PDS.ontology.primitives){for(let i of a.selectors||[]){let c=String(i||"").trim();if(c.includes("*")){if(c.startsWith(".")){let d=c.slice(1).replace(/\*/g,"");if(e.classList&&Array.from(e.classList).some(u=>u.startsWith(d)))return{element:e,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let l=e.parentElement,p=0;for(;l&&p<t;){if(l.classList&&Array.from(l.classList).some(u=>u.startsWith(d))&&l.tagName!=="DS-SHOWCASE")return{element:l,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};l=l.parentElement,p++}continue}continue}if(A(e,c))return{element:e,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let s=he(e,c);if(s&&s.tagName!=="DS-SHOWCASE")return{element:s,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(e.classList){let i=Array.from(e.classList);for(let c of a.selectors||[])if(typeof c=="string"&&c.includes("*")&&c.startsWith(".")){let s=c.slice(1).replace(/\*/g,"");if(i.some(d=>d.startsWith(s)))return{element:e,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}}}for(let a of PDS.ontology.layoutPatterns||[])for(let i of a.selectors||[]){let c=String(i||"").trim();if(c.includes("*")){if(c.startsWith(".")){let d=c.slice(1).replace(/\*/g,"");if(e.classList&&Array.from(e.classList).some(l=>l.startsWith(d)))return{element:e,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}continue}if(A(e,c))return{element:e,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags};let s=he(e,c);if(s&&s.tagName!=="DS-SHOWCASE")return{element:s,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(e.tagName&&e.tagName.includes("-")){let a=e.tagName.toLowerCase(),i=PDS.ontology.components.find(c=>c.selectors.includes(a));return{element:e,componentType:"web-component",displayName:i?.name||a,id:i?.id||a,tags:i?.tags}}if(e.tagName==="BUTTON"){let a=e.querySelector&&e.querySelector("pds-icon");return{element:e,componentType:"button",displayName:a?"button with icon":"button",id:"button"}}if(A(e,"pds-icon")||e.closest&&e.closest("pds-icon")){let a=A(e,"pds-icon")?e:e.closest("pds-icon");return{element:a,componentType:"icon",displayName:`pds-icon (${a.getAttribute&&a.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(A(e,"nav[data-dropdown]")||e.closest&&e.closest("nav[data-dropdown]"))return{element:A(e,"nav[data-dropdown]")?e:e.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};e=e.parentElement}return null}function He(){let n=[];for(let t of PDS.ontology.primitives)n.push(...t.selectors||[]);for(let t of PDS.ontology.components)n.push(...t.selectors||[]);for(let t of PDS.ontology.layoutPatterns||[])n.push(...t.selectors||[]);return Array.from(new Set(n))}function _e(n,t={}){let e=n.toLowerCase(),r=[],o=(a,i)=>{for(let c of a)(c.id?.toLowerCase().includes(e)||c.name?.toLowerCase().includes(e)||c.description?.toLowerCase().includes(e)||c.tags?.some(d=>d.toLowerCase().includes(e))||c.category?.toLowerCase().includes(e)||c.selectors?.some(d=>d.toLowerCase().includes(e)))&&r.push({...c,type:i})};return(!t.type||t.type==="primitive")&&o(M.primitives,"primitive"),(!t.type||t.type==="component")&&o(M.components,"component"),(!t.type||t.type==="layout")&&o(M.layoutPatterns,"layout"),(!t.type||t.type==="enhancement")&&o(M.enhancements,"enhancement"),r}function qe(n){let t=n.toLowerCase();return{primitives:M.primitives.filter(e=>e.category===t),components:M.components.filter(e=>e.category===t),layouts:M.layoutPatterns.filter(e=>e.category===t)}}function Ge(){let n=new Set;return M.primitives.forEach(t=>t.tags?.forEach(e=>n.add(e))),M.components.forEach(t=>t.tags?.forEach(e=>n.add(e))),M.layoutPatterns.forEach(t=>t.tags?.forEach(e=>n.add(e))),M.enhancements.forEach(t=>t.tags?.forEach(e=>n.add(e))),Array.from(n).sort()}var M,Ve,te=U(()=>{M={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"callout",name:"Callout",description:"Contextual information and notification messages",selectors:[".callout",".callout-info",".callout-success",".callout-warning",".callout-danger",".callout-error",".callout-dismissible"],tags:["feedback","message","notification","status","information"],category:"feedback"},{id:"empty-state",name:"Empty State",description:"Empty state layout for missing data or onboarding",selectors:[".empty-state"],tags:["empty","no-data","zero","placeholder","onboarding","state"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-fab",name:"FAB",description:"Floating Action Button with expandable satellite actions",selectors:["pds-fab"],tags:["button","action","floating","interactive"],category:"action"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element",tags:["menu","interactive","navigation"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["callout","badge","empty-state"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]},action:{description:"Interactive actions and buttons",primitives:["button"],components:["pds-fab"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],empty:["empty-state","placeholder","zero","no-data","onboarding","callout","card","icon","button"],"empty state":["empty-state","empty","no-data","zero","onboarding"],"no data":["empty-state","empty","zero","placeholder"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-working","pds-fab","floating"],btn:["button","interactive","action","pds-fab"],fab:["pds-fab","floating","button","action","menu"],floating:["fab","pds-fab","button","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],callout:["notification","feedback","message","status","toast","information","alert","warning","error","info","success","danger"],alert:["callout","notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["callout","toast","pds-toaster","feedback","message","popup","alert"],toast:["pds-toaster","notification","callout","feedback","popup","snackbar","alert"],feedback:["callout","notification","toast","status","badge","validation","error","success","alert"],message:["callout","notification","feedback","dialog","toast","alert"],status:["badge","callout","indicator","feedback","state","alert"],error:["callout","danger","validation","feedback","warning","alert"],success:["callout","feedback","badge","status","check","alert"],warning:["callout","caution","feedback","status","alert"],info:["callout","information","feedback","status","alert"],danger:["callout","error","feedback","destructive","delete","alert"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};Ve=M});var Me={};D(Me,{AutoDefiner:()=>ne});async function ut(...n){let t={};n.length&&typeof n[n.length-1]=="object"&&(t=n.pop()||{});let e=n,{baseURL:r,mapper:o=d=>`${d}.js`,onError:a=(d,l)=>console.error(`[defineWebComponents] ${d}:`,l)}=t,i=r?new URL(r,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),c=d=>d.toLowerCase().replace(/(^|-)([a-z])/g,(l,p,u)=>u.toUpperCase()),s=async d=>{try{if(customElements.get(d))return{tag:d,status:"already-defined"};let l=o(d),u=await import(l instanceof URL?l.href:new URL(l,i).href),m=u?.default??u?.[c(d)];if(!m){if(customElements.get(d))return{tag:d,status:"self-defined"};throw new Error(`No export found for ${d}. Expected default export or named export "${c(d)}".`)}return customElements.get(d)?{tag:d,status:"race-already-defined"}:(customElements.define(d,m),{tag:d,status:"defined"})}catch(l){throw a(d,l),l}};return Promise.all(e.map(s))}var ne,Ee=U(()=>{ne=class{constructor(t={}){let{baseURL:e,mapper:r,onError:o,predicate:a=()=>!0,attributeModule:i="data-module",root:c=document,scanExisting:s=!0,debounceMs:d=16,observeShadows:l=!0,enhancers:p=[],patchAttachShadow:u=!0}=t,m=new Set,f=new Set,b=new Set,h=new Map,w=new WeakMap,z=new WeakMap,k=0,T=!1,L=null,W=y=>{if(!y||!p.length)return;let v=z.get(y);v||(v=new Set,z.set(y,v));for(let x of p)if(!(!x.selector||!x.run)&&!v.has(x.selector))try{y.matches&&y.matches(x.selector)&&(x.run(y),v.add(x.selector))}catch(F){console.warn(`[AutoDefiner] Error applying enhancer for selector "${x.selector}":`,F)}},j=(y,v)=>{if(!T&&!(!y||!y.includes("-"))&&!customElements.get(y)&&!f.has(y)&&!b.has(y)){if(v&&v.getAttribute){let x=v.getAttribute(i);x&&!h.has(y)&&h.set(y,x)}m.add(y),$()}},$=()=>{k||(k=setTimeout(R,d))},S=y=>{if(y){if(y.nodeType===1){let v=y,x=v.tagName?.toLowerCase();x&&x.includes("-")&&!customElements.get(x)&&a(x,v)&&j(x,v),W(v),l&&v.shadowRoot&&E(v.shadowRoot)}y.querySelectorAll&&y.querySelectorAll("*").forEach(v=>{let x=v.tagName?.toLowerCase();x&&x.includes("-")&&!customElements.get(x)&&a(x,v)&&j(x,v),W(v),l&&v.shadowRoot&&E(v.shadowRoot)})}},E=y=>{if(!y||w.has(y))return;S(y);let v=new MutationObserver(x=>{for(let F of x)F.addedNodes?.forEach(B=>{S(B)}),F.type==="attributes"&&F.target&&S(F.target)});v.observe(y,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...p.map(x=>x.selector).filter(x=>x.startsWith("data-"))]}),w.set(y,v)};async function R(){if(clearTimeout(k),k=0,!m.size)return;let y=Array.from(m);m.clear(),y.forEach(v=>f.add(v));try{let v=x=>h.get(x)??(r?r(x):`${x}.js`);await ut(...y,{baseURL:e,mapper:v,onError:(x,F)=>{b.add(x),o?.(x,F)}})}catch{}finally{y.forEach(v=>f.delete(v))}}let J=c===document?document.documentElement:c,_=new MutationObserver(y=>{for(let v of y)v.addedNodes?.forEach(x=>{S(x)}),v.type==="attributes"&&v.target&&S(v.target)});if(_.observe(J,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...p.map(y=>y.selector).filter(y=>y.startsWith("data-"))]}),l&&u&&Element.prototype.attachShadow){let y=Element.prototype.attachShadow;Element.prototype.attachShadow=function(x){let F=y.call(this,x);if(x&&x.mode==="open"){E(F);let B=this.tagName?.toLowerCase();B&&B.includes("-")&&!customElements.get(B)&&j(B,this)}return F},L=()=>Element.prototype.attachShadow=y}return s&&S(J),{stop(){T=!0,_.disconnect(),L&&L(),k&&(clearTimeout(k),k=0),w.forEach(y=>y.disconnect())},flush:R}}static async define(...t){let e={};t.length&&typeof t[t.length-1]=="object"&&(e=t.pop()||{});let r=t,{baseURL:o,mapper:a=l=>`${l}.js`,onError:i=(l,p)=>console.error(`[defineWebComponents] ${l}:`,p)}=e,c=o?new URL(o,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),s=l=>l.toLowerCase().replace(/(^|-)([a-z])/g,(p,u,m)=>m.toUpperCase()),d=async l=>{try{if(customElements.get(l))return{tag:l,status:"already-defined"};let p=a(l),m=await import(p instanceof URL?p.href:new URL(p,c).href),f=m?.default??m?.[s(l)];if(!f){if(customElements.get(l))return{tag:l,status:"self-defined"};throw new Error(`No export found for ${l}. Expected default export or named export "${s(l)}".`)}return customElements.get(l)?{tag:l,status:"race-already-defined"}:(customElements.define(l,f),{tag:l,status:"defined"})}catch(p){throw i(l,p),p}};return Promise.all(r.map(d))}}});var le={};D(le,{PDSQuery:()=>ce});var ce,de=U(()=>{ce=class{constructor(t){this.pds=t,this.intents={color:["color","colours","shade","tint","hue","foreground","background","text","fill","bg","fg"],spacing:["spacing","space","gap","padding","margin","distance","rhythm"],typography:["font","text","type","typography","heading","body","size","weight","family"],border:["border","outline","stroke","edge","frame"],radius:["radius","rounded","corner","curve","round"],shadow:["shadow","elevation","depth","glow","drop-shadow"],component:["component","element","widget"],utility:["utility","class","helper","css"],layout:["layout","container","grid","flex","group","arrange","organize"],pattern:["pattern","example","template","structure"],interaction:["hover","focus","active","disabled","pressed","selected","checked"]},this.entities={button:["button","btn","cta"],input:["input","field","textbox","text-field","form-control"],card:["card","panel"],badge:["badge","pill","tag","chip"],surface:["surface","background","layer","container"],icon:["icon","svg","glyph","symbol"],link:["link","anchor","hyperlink"],nav:["nav","navigation","menu"],modal:["modal","dialog","popup","overlay"],drawer:["drawer","sidebar","panel"],tab:["tab","tabstrip"],toast:["toast","notification","callout","message","alert"]},this.questionWords=["what","which","how","where","when","show","find","get","give","tell"]}async search(t){if(!t||t.length<2)return[];let e=t.toLowerCase().trim(),r=this.tokenize(e),o=this.analyzeQuery(r,e),a=[];o.intents.has("color")&&a.push(...this.queryColors(o,e)),(o.intents.has("utility")||o.intents.has("border")||o.intents.has("layout")||e.includes("class"))&&a.push(...this.queryUtilities(o,e)),(o.intents.has("component")||o.entities.size>0)&&a.push(...this.queryComponents(o,e)),(o.intents.has("layout")||o.intents.has("pattern"))&&a.push(...this.queryPatterns(o,e)),o.intents.has("typography")&&a.push(...this.queryTypography(o,e)),o.intents.has("spacing")&&a.push(...this.querySpacing(o,e));let i=new Map;for(let c of a){let s=c.value;(!i.has(s)||i.get(s).score<c.score)&&i.set(s,c)}return Array.from(i.values()).sort((c,s)=>s.score-c.score).slice(0,10)}tokenize(t){return t.toLowerCase().replace(/[?!.]/g,"").split(/\s+/).filter(e=>e.length>0)}analyzeQuery(t,e){let r={intents:new Set,entities:new Set,modifiers:new Set,isQuestion:!1,tokens:t,fullText:e};r.isQuestion=this.questionWords.some(o=>t.includes(o));for(let[o,a]of Object.entries(this.intents))a.some(i=>t.includes(i)||e.includes(i))&&r.intents.add(o);for(let[o,a]of Object.entries(this.entities))a.some(i=>t.includes(i)||e.includes(i))&&r.entities.add(o);return(t.includes("hover")||e.includes("hover"))&&r.modifiers.add("hover"),(t.includes("focus")||e.includes("focus"))&&r.modifiers.add("focus"),(t.includes("active")||e.includes("active"))&&r.modifiers.add("active"),(t.includes("disabled")||e.includes("disabled"))&&r.modifiers.add("disabled"),r}queryColors(t,e){let r=[],o=this.pds.compiled;if(!o?.tokens?.colors)return r;let a=o.tokens.colors,i=Array.from(t.entities),c=Array.from(t.modifiers);if(c.includes("focus")&&t.intents.has("border")&&i.includes("input")&&r.push({text:"Focus border color: var(--color-primary-500)",value:"--color-primary-500",icon:"palette",category:"Color Token",score:100,cssVar:"var(--color-primary-500)",description:"Primary color used for focus states on form inputs"}),(e.includes("foreground")||e.includes("text"))&&(e.includes("surface")||t.entities.has("surface"))&&(r.push({text:"Text on surface: var(--surface-text)",value:"--surface-text",icon:"palette",category:"Surface Token",score:95,cssVar:"var(--surface-text)",description:"Default text color for current surface"}),r.push({text:"Secondary text: var(--surface-text-secondary)",value:"--surface-text-secondary",icon:"palette",category:"Surface Token",score:90,cssVar:"var(--surface-text-secondary)",description:"Secondary/muted text on surface"})),e.includes("primary")||e.includes("accent")||e.includes("secondary")){let s=e.includes("primary")?"primary":e.includes("accent")?"accent":"secondary";for(let d of[500,600,700]){let l=`--color-${s}-${d}`;r.push({text:`${s.charAt(0).toUpperCase()+s.slice(1)} ${d}: var(${l})`,value:l,icon:"palette",category:"Color Scale",score:80-(d-500)/100,cssVar:`var(${l})`,description:`${s} color scale shade ${d}`})}}if(i.includes("button")&&t.intents.has("color")){let s=c[0];s?r.push({text:`Button ${s} fill: var(--primary-fill-${s})`,value:`--primary-fill-${s}`,icon:"palette",category:"Interactive Token",score:92,description:`Button background color in ${s} state`}):r.push({text:"Button fill: var(--primary-fill)",value:"--primary-fill",icon:"palette",category:"Interactive Token",score:88,description:"Default button background color"})}return r}queryUtilities(t,e){let r=[],o=this.pds.ontology;if(!o?.utilities)return r;let a=o.utilities,i=[];for(let c of Object.values(a))if(typeof c=="object")for(let s of Object.values(c))Array.isArray(s)&&i.push(...s);return t.intents.has("border")&&i.filter(s=>s.includes("border")||s.includes("outline")).forEach(s=>{let d=80;e.includes("gradient")&&s.includes("gradient")&&(d=95),e.includes("glow")&&s.includes("glow")&&(d=95),r.push({text:`${s} - Border utility class`,value:s,icon:"code",category:"Utility Class",score:d,code:`<div class="${s}">...</div>`,description:this.describeUtility(s)})}),t.intents.has("layout")&&i.filter(s=>s.includes("flex")||s.includes("grid")||s.includes("items-")||s.includes("justify-")||s.includes("gap-")).forEach(s=>{r.push({text:`${s} - Layout utility`,value:s,icon:"layout",category:"Utility Class",score:85,code:`<div class="${s}">...</div>`,description:this.describeUtility(s)})}),e.includes("group")&&t.entities.has("button")&&r.push({text:".btn-group - Group buttons together",value:".btn-group",icon:"code",category:"Utility Class",score:90,code:`<div class="btn-group">
  <button class="btn-primary">One</button>
  <button class="btn-primary">Two</button>
</div>`,description:"Container for grouped buttons with connected styling"}),r}queryComponents(t,e){let r=[],o=this.pds.ontology;return!o?.components&&!o?.primitives||(o.components&&o.components.forEach(a=>{let i=this.scoreMatch(e,a.name+" "+a.id);i>50&&r.push({text:`<${a.id}> - ${a.name}`,value:a.id,icon:"brackets-curly",category:"Web Component",score:i,code:`<${a.id}></${a.id}>`,description:a.description||`${a.name} web component`})}),o.primitives&&o.primitives.forEach(a=>{let i=this.scoreMatch(e,a.name+" "+a.id);if(i>50){let c=a.selectors?.[0]||a.id;r.push({text:`${c} - ${a.name}`,value:a.id,icon:"tag",category:"Primitive",score:i-5,code:this.generatePrimitiveExample(a),description:a.description||`${a.name} primitive element`})}}),e.includes("icon")&&(e.includes("only")||e.includes("button"))&&r.push({text:'Icon-only button: <button class="btn-icon">',value:"btn-icon",icon:"star",category:"Pattern",score:95,code:`<button class="btn-icon btn-primary">
  <pds-icon icon="heart"></pds-icon>
</button>`,description:"Button with only an icon, no text label"})),r}queryPatterns(t,e){let r=[],o=this.pds.ontology;return o?.layoutPatterns&&(o.layoutPatterns.forEach(a=>{let i=this.scoreMatch(e,a.name+" "+a.id+" "+(a.description||""));if(i>50){let c=a.selectors?.[0]||`.${a.id}`;r.push({text:`${a.name} - ${a.description||"Layout pattern"}`,value:a.id,icon:"layout",category:"Layout Pattern",score:i,code:`<div class="${c.replace(".","")}">
  <!-- content -->
</div>`,description:a.description||a.name})}}),(e.includes("container")||e.includes("group"))&&(r.push({text:"Card - Container for grouping content",value:"card",icon:"layout",category:"Primitive",score:88,code:`<article class="card">
  <header>
    <h3>Title</h3>
  </header>
  <p>Content...</p>
</article>`,description:"Card container with optional header, body, and footer"}),r.push({text:"Section - Semantic container for grouping",value:"section",icon:"layout",category:"Pattern",score:85,code:`<section>
  <h2>Section Title</h2>
  <!-- content -->
</section>`,description:"Semantic section element for content grouping"}))),r}queryTypography(t,e){let r=[],o=this.pds.compiled;if(!o?.tokens?.typography)return r;let a=o.tokens.typography;return(e.includes("heading")||e.includes("title"))&&r.push({text:"Heading font: var(--font-family-heading)",value:"--font-family-heading",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-heading)",description:"Font family for headings"}),(e.includes("body")||e.includes("text"))&&r.push({text:"Body font: var(--font-family-body)",value:"--font-family-body",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-body)",description:"Font family for body text"}),r}querySpacing(t,e){let r=[],o=this.pds.compiled;if(!o?.tokens?.spacing)return r;let a=o.tokens.spacing;for(let[i,c]of Object.entries(a))["2","4","6","8"].includes(i)&&r.push({text:`Spacing ${i}: var(--spacing-${i})`,value:`--spacing-${i}`,icon:"ruler",category:"Spacing Token",score:75,cssVar:`var(--spacing-${i})`,description:`Spacing value: ${c}`});return r}scoreMatch(t,e){let r=t.toLowerCase(),o=e.toLowerCase(),a=0;if(r===o)return 100;o.includes(r)&&(a+=80);let i=this.tokenize(r),c=this.tokenize(o),s=i.filter(d=>c.includes(d)).length;return a+=s/i.length*40,o.startsWith(r)&&(a+=20),Math.min(100,a)}generatePrimitiveExample(t){let e=t.selectors?.[0]||t.id;return e.includes("button")||t.id==="button"?'<button class="btn-primary">Click me</button>':e.includes("card")||t.id==="card"?`<article class="card">
  <h3>Title</h3>
  <p>Content</p>
</article>`:e.includes("badge")||t.id==="badge"?'<span class="badge">New</span>':`<${e}>Content</${e}>`}describeUtility(t){return t.includes("border-gradient")?"Apply animated gradient border effect":t.includes("border-glow")?"Apply glowing border effect":t.includes("flex")?"Flexbox container utility":t.includes("grid")?"Grid container utility":t.includes("gap-")?"Set gap between flex/grid children":t.includes("items-")?"Align items in flex container":t.includes("justify-")?"Justify content in flex container":t===".btn-group"?"Group buttons with connected styling":"Utility class for styling"}}});var Be={};D(Be,{deepMerge:()=>je,fragmentFromTemplateLike:()=>mt,isObject:()=>Z,parseHTML:()=>ht});function Z(n){return n&&typeof n=="object"&&!Array.isArray(n)}function je(n,t){let e={...n};return Z(n)&&Z(t)&&Object.keys(t).forEach(r=>{Z(t[r])?r in n?e[r]=je(n[r],t[r]):Object.assign(e,{[r]:t[r]}):Object.assign(e,{[r]:t[r]})}),e}function mt(n){let t=Array.isArray(n?.strings)?n.strings:[],e=Array.isArray(n?.values)?n.values:[],r=new Set,o=[],a=/(\s)(\.[\w-]+)=\s*$/;for(let p=0;p<t.length;p+=1){let u=t[p]??"",m=u.match(a);if(m&&p<e.length){let b=m[2].slice(1),h=`pds-val-${p}`;u=u.replace(a,`$1data-pds-prop="${b}:${h}"`),r.add(p)}o.push(u),p<e.length&&!r.has(p)&&o.push(`<!--pds-val-${p}-->`)}let i=document.createElement("template");i.innerHTML=o.join("");let c=(p,u)=>{let m=p.parentNode;if(!m)return;if(u==null){m.removeChild(p);return}let f=b=>{if(b!=null){if(b instanceof Node){m.insertBefore(b,p);return}if(Array.isArray(b)){b.forEach(h=>f(h));return}m.insertBefore(document.createTextNode(String(b)),p)}};f(u),m.removeChild(p)},s=document.createTreeWalker(i.content,NodeFilter.SHOW_COMMENT),d=[];for(;s.nextNode();){let p=s.currentNode;p?.nodeValue?.startsWith("pds-val-")&&d.push(p)}return d.forEach(p=>{let u=Number(p.nodeValue.replace("pds-val-",""));c(p,e[u])}),i.content.querySelectorAll("*").forEach(p=>{let u=p.getAttribute("data-pds-prop");if(!u)return;let[m,f]=u.split(":"),b=Number(String(f).replace("pds-val-",""));m&&Number.isInteger(b)&&(p[m]=e[b]),p.removeAttribute("data-pds-prop")}),i.content}function ht(n){return new DOMParser().parseFromString(n,"text/html").body.childNodes}var Ne=U(()=>{});q();var G="any",ue={type:"object",allowUnknown:!1,properties:{id:{type:"string"},name:{type:"string"},tags:{type:"array",items:{type:"string"}},description:{type:"string"},options:{type:"object",allowUnknown:!0},form:{type:"object",allowUnknown:!0},colors:{type:"object",allowUnknown:!1,properties:{primary:{type:"string",relations:{tokens:["--color-primary-*","--color-primary-fill","--color-primary-text","--background-mesh-*"]}},secondary:{type:"string",relations:{tokens:["--color-secondary-*","--color-gray-*","--background-mesh-*"]}},accent:{type:"string",relations:{tokens:["--color-accent-*","--background-mesh-*"]}},background:{type:"string",relations:{tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},success:{type:["string","null"],relations:{tokens:["--color-success-*"]}},warning:{type:["string","null"],relations:{tokens:["--color-warning-*"]}},danger:{type:["string","null"],relations:{tokens:["--color-danger-*"]}},info:{type:["string","null"],relations:{tokens:["--color-info-*"]}},gradientStops:{type:"number"},elevationOpacity:{type:"number",relations:{tokens:["--surface-*-shadow"]}},darkMode:{type:"object",allowUnknown:!0,properties:{background:{type:"string",relations:{theme:"dark",tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},primary:{type:"string",relations:{theme:"dark",tokens:["--color-primary-*","--color-primary-fill","--color-primary-text"]}},secondary:{type:"string",relations:{theme:"dark",tokens:["--color-secondary-*","--color-gray-*"]}},accent:{type:"string",relations:{theme:"dark",tokens:["--color-accent-*"]}}}}}},typography:{type:"object",allowUnknown:!1,properties:{fontFamilyHeadings:{type:"string",relations:{tokens:["--font-family-headings"]}},fontFamilyBody:{type:"string",relations:{tokens:["--font-family-body"]}},fontFamilyMono:{type:"string",relations:{tokens:["--font-family-mono"]}},baseFontSize:{type:"number",relations:{tokens:["--font-size-*"]}},fontScale:{type:"number",relations:{tokens:["--font-size-*"]}},fontWeightLight:{type:["string","number"],relations:{tokens:["--font-weight-light"]}},fontWeightNormal:{type:["string","number"],relations:{tokens:["--font-weight-normal"]}},fontWeightMedium:{type:["string","number"],relations:{tokens:["--font-weight-medium"]}},fontWeightSemibold:{type:["string","number"],relations:{tokens:["--font-weight-semibold"]}},fontWeightBold:{type:["string","number"],relations:{tokens:["--font-weight-bold"]}},lineHeightTight:{type:["string","number"],relations:{tokens:["--font-line-height-tight"]}},lineHeightNormal:{type:["string","number"],relations:{tokens:["--font-line-height-normal"]}},lineHeightRelaxed:{type:["string","number"],relations:{tokens:["--font-line-height-relaxed"]}},letterSpacingTight:{type:"number"},letterSpacingNormal:{type:"number"},letterSpacingWide:{type:"number"}}},spatialRhythm:{type:"object",allowUnknown:!1,properties:{baseUnit:{type:"number",relations:{tokens:["--spacing-*"]}},scaleRatio:{type:"number"},maxSpacingSteps:{type:"number",relations:{tokens:["--spacing-*"]}},containerMaxWidth:{type:["number","string"]},containerPadding:{type:"number"},inputPadding:{type:"number",relations:{rules:[{selectors:["input","textarea","select"],properties:["padding"]}]}},buttonPadding:{type:"number",relations:{rules:[{selectors:["button",".btn"],properties:["padding"]}]}},sectionSpacing:{type:"number",relations:{rules:[{selectors:["section"],properties:["margin","padding"]}]}}}},shape:{type:"object",allowUnknown:!1,properties:{radiusSize:{type:["string","number"],relations:{tokens:["--radius-*"]}},customRadius:{type:["string","number","null"]},borderWidth:{type:["string","number"],relations:{tokens:["--border-width-*"]}}}},behavior:{type:"object",allowUnknown:!1,properties:{transitionSpeed:{type:["string","number"],relations:{tokens:["--transition-*"]}},animationEasing:{type:"string"},customTransitionSpeed:{type:["number","null"]},customEasing:{type:["string","null"]},focusRingWidth:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["outline-width","box-shadow"]}]}},focusRingOpacity:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["box-shadow","outline-color"]}]}},hoverOpacity:{type:"number"}}},layout:{type:"object",allowUnknown:!1,properties:{maxWidth:{type:["number","string"],relations:{tokens:["--layout-max-width","--layout-max-width-*"]}},maxWidths:{type:"object",allowUnknown:!1,properties:{sm:{type:["number","string"],relations:{tokens:["--layout-max-width-sm"]}},md:{type:["number","string"],relations:{tokens:["--layout-max-width-md"]}},lg:{type:["number","string"],relations:{tokens:["--layout-max-width-lg"]}},xl:{type:["number","string"],relations:{tokens:["--layout-max-width-xl"]}}}},containerPadding:{type:["number","string"],relations:{tokens:["--layout-container-padding"]}},breakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"number"},md:{type:"number"},lg:{type:"number"},xl:{type:"number"}}},gridColumns:{type:"number"},gridGutter:{type:"number"},densityCompact:{type:"number"},densityNormal:{type:"number"},densityComfortable:{type:"number"},buttonMinHeight:{type:"number"},inputMinHeight:{type:"number"},baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},darkMode:{type:"object",allowUnknown:!0,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}},utilities:{type:"object",allowUnknown:!0},gridSystem:{type:"object",allowUnknown:!0},containerMaxWidth:{type:["number","string"]}}},layers:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},shadowBlurMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowOffsetMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowDepth:{type:"string"},blurLight:{type:"number"},blurMedium:{type:"number"},blurHeavy:{type:"number"},baseZIndex:{type:"number",relations:{tokens:["--z-*"]}},zIndexStep:{type:"number",relations:{tokens:["--z-*"]}},zIndexBase:{type:"number"},zIndexDropdown:{type:"number"},zIndexSticky:{type:"number"},zIndexFixed:{type:"number"},zIndexModal:{type:"number"},zIndexPopover:{type:"number"},zIndexTooltip:{type:"number"},zIndexNotification:{type:"number"},darkMode:{type:"object",allowUnknown:!0,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}}}},advanced:{type:"object",allowUnknown:!0},a11y:{type:"object",allowUnknown:!0},icons:{type:"object",allowUnknown:!1,properties:{set:{type:"string"},weight:{type:"string"},defaultSize:{type:"number",relations:{tokens:["--icon-size"]}},sizes:{type:"object",allowUnknown:!0},spritePath:{type:"string"},externalPath:{type:"string"},include:{type:"object",allowUnknown:!0}}},components:{type:"object",allowUnknown:!0},gap:{type:"number"},debug:{type:"boolean"}}},Oe={type:"object",allowUnknown:!0,properties:{mode:{type:"string"},preset:{type:"string"},design:{type:"object"},enhancers:{type:["object","array"]},applyGlobalStyles:{type:"boolean"},manageTheme:{type:"boolean"},themeStorageKey:{type:"string"},preloadStyles:{type:"boolean"},criticalLayers:{type:"array",items:{type:"string"}},autoDefine:{type:"object"},managerURL:{type:"string"},manager:{type:G},log:{type:G}}};function X(n){return n===null?"null":Array.isArray(n)?"array":typeof n}function Pe(n,t){if(t===G)return!0;let e=X(n);return Array.isArray(t)?t.includes(e):e===t}function V(n,t,e,r){if(!t)return;let o=t.type||G;if(!Pe(n,o)){r.push({path:e,expected:o,actual:X(n),message:`Expected ${o} but got ${X(n)}`});return}if(o==="array"&&t.items&&Array.isArray(n)&&n.forEach((a,i)=>{V(a,t.items,`${e}[${i}]`,r)}),o==="object"&&n&&typeof n=="object"){let a=t.properties||{};for(let[i,c]of Object.entries(n)){if(!Object.prototype.hasOwnProperty.call(a,i)){t.allowUnknown||r.push({path:`${e}.${i}`,expected:"known property",actual:"unknown",message:`Unknown property "${i}"`});continue}V(c,a[i],`${e}.${i}`,r)}}}function K(n,t="",e={}){if(!n||typeof n!="object")return e;if(n.relations&&t&&(e[t]=n.relations),n.type==="object"&&n.properties&&Object.entries(n.properties).forEach(([r,o])=>{let a=t?`${t}.${r}`:r;K(o,a,e)}),n.type==="array"&&n.items){let r=`${t}[]`;K(n.items,r,e)}return e}var xt=K(ue,"");function ee(n,{log:t,context:e="PDS config"}={}){if(!n||typeof n!="object")return[];let r=[];return V(n,ue,"design",r),r.length&&typeof t=="function"&&r.forEach(o=>{t("warn",`[${e}] ${o.message} at ${o.path}`)}),r}function ge(n,{log:t,context:e="PDS config"}={}){if(!n||typeof n!="object")return[];let r=[];return V(n,Oe,"config",r),r.length&&typeof t=="function"&&r.forEach(o=>{t("warn",`[${e}] ${o.message} at ${o.path}`)}),r}var O={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.5,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:g.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.618,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:g.RadiusSizes.xlarge,borderWidth:g.BorderWidths.medium},behavior:{transitionSpeed:g.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:g.RadiusSizes.none,borderWidth:g.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.5,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:g.RadiusSizes.xxlarge,borderWidth:g.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:g.RadiusSizes.none,borderWidth:g.BorderWidths.thick},behavior:{transitionSpeed:g.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.5,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.333},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.thick},behavior:{transitionSpeed:g.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:g.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:g.RadiusSizes.xxlarge,borderWidth:g.BorderWidths.thin},behavior:{transitionSpeed:g.TransitionSpeeds.slow,animationEasing:g.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0b0b0b",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:g.RadiusSizes.none,borderWidth:g.BorderWidths.thick},behavior:{transitionSpeed:g.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.414,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:g.RadiusSizes.large,borderWidth:g.BorderWidths.medium},behavior:{transitionSpeed:g.TransitionSpeeds.normal,animationEasing:g.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c",primary:"#0a4ca4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:g.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:g.RadiusSizes.large,borderWidth:g.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:g.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:1440,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:g.TransitionSpeeds.normal,animationEasing:g.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#06c167"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.medium},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:g.TouchTargetSizes.comfortable,focusStyle:g.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:1280,sectionSpacing:2.5},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:g.TouchTargetSizes.standard,focusStyle:g.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:g.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerMaxWidth:680,sectionSpacing:1.5},shape:{radiusSize:g.RadiusSizes.medium,borderWidth:g.BorderWidths.thin},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:g.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerMaxWidth:1600,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:g.RadiusSizes.small,borderWidth:g.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:g.TransitionSpeeds.fast,animationEasing:g.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};O.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!0,backgroundMesh:4},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:g.FontWeights.light,fontWeightNormal:g.FontWeights.normal,fontWeightMedium:g.FontWeights.medium,fontWeightSemibold:g.FontWeights.semibold,fontWeightBold:g.FontWeights.bold,lineHeightTight:g.LineHeights.tight,lineHeightNormal:g.LineHeights.normal,lineHeightRelaxed:g.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerMaxWidth:1200,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:g.RadiusSizes.large,borderWidth:g.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:g.TransitionSpeeds.normal,animationEasing:g.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:g.TouchTargetSizes.standard,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:g.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:g.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:g.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:g.IconSizes,include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"public/assets/pds/icons/pds-icons.svg"},gap:4,debug:!1};function me(n="log",t,...e){if(this?.debug||this?.design?.debug||!1||n==="error"||n==="warn"){let o=console[n]||console.log;e.length>0?o(t,...e):o(t)}}q();te();var C=class n{static#g;static get instance(){return this.#g}#e;#a;constructor(t={}){this.options={debug:!1,...t},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),n.#g=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#ke(),typeof CSSStyleSheet<"u"?this.#Ee():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let t=this.options.design||{},e=this.#M(t),r=t.layers||{},o=this.#h(r,e.light),a=this.#$(o),i=e.dark!=null?this.#$(this.#h(r,e.dark)):null;return{colors:this.#E(t.colors||{},e),spacing:this.generateSpacingTokens(t.spatialRhythm||{}),radius:this.#U(t.shape||{}),borderWidths:this.#D(t.shape||{}),typography:this.generateTypographyTokens(t.typography||{}),shadows:a,darkShadows:i,layout:this.#O(t.layout||{}),transitions:this.#P(t.behavior||{}),zIndex:this.#I(t.layers||{}),icons:this.#H(t.icons||{})}}#M(t={}){let e=t.layout||{},r=t.layers||{};return{light:this.#m(e.baseShadowOpacity??r.baseShadowOpacity),dark:this.#m(e.darkMode?.baseShadowOpacity??r.darkMode?.baseShadowOpacity)}}#m(t){let e=Number(t);if(Number.isFinite(e))return Math.min(Math.max(e,0),1)}#h(t={},e){let r={...t};return e!=null&&(r.baseShadowOpacity=e),r}#E(t,e={}){let{primary:r="#3b82f6",secondary:o="#64748b",accent:a="#ec4899",background:i="#ffffff",success:c=null,warning:s="#FFBF00",danger:d=null,info:l=null,darkMode:p={}}=t,u={primary:this.#r(r),secondary:this.#r(o),accent:this.#r(a),success:this.#r(c||this.#F(r)),warning:this.#r(s||a),danger:this.#r(d||this.#C(r)),info:this.#r(l||r),gray:this.#f(o),surface:this.#b(i)};return u.surface.fieldset=this.#T(u.surface),u.surfaceSmart=this.#k(u.surface,e),u.dark=this.#R(u,i,p),u.dark&&u.dark.surface&&(u.dark.surfaceSmart=this.#k(u.dark.surface,e)),u.interactive={light:{fill:this.#w(u.primary,4.5),text:u.primary[600]},dark:{fill:this.#w(u.dark.primary,4.5),text:this.#B(u.dark.primary,u.dark.surface.base,4.5)}},u}#r(t){let e=this.#n(t);return{50:this.#t(e.h,Math.max(e.s-10,10),Math.min(e.l+45,95)),100:this.#t(e.h,Math.max(e.s-5,15),Math.min(e.l+35,90)),200:this.#t(e.h,e.s,Math.min(e.l+25,85)),300:this.#t(e.h,e.s,Math.min(e.l+15,75)),400:this.#t(e.h,e.s,Math.min(e.l+5,65)),500:t,600:this.#t(e.h,e.s,Math.max(e.l-10,25)),700:this.#t(e.h,e.s,Math.max(e.l-20,20)),800:this.#t(e.h,e.s,Math.max(e.l-30,15)),900:this.#t(e.h,e.s,Math.max(e.l-40,10))}}#F(t){let e=this.#n(t);return this.#t(120,Math.max(e.s,60),45)}#C(t){let e=this.#n(t);return this.#t(0,Math.max(e.s,70),50)}#f(t){let e=this.#n(t),r=e.h,o=Math.min(e.s,10);return{50:this.#t(r,o,98),100:this.#t(r,o,95),200:this.#t(r,o,88),300:this.#t(r,o,78),400:this.#t(r,o,60),500:t,600:this.#t(r,Math.min(o+5,15),45),700:this.#t(r,Math.min(o+8,18),35),800:this.#t(r,Math.min(o+10,20),20),900:this.#t(r,Math.min(o+12,22),10)}}#b(t){let e=this.#n(t);return{base:t,subtle:this.#t(e.h,Math.max(e.s,2),Math.max(e.l-2,2)),elevated:this.#t(e.h,Math.max(e.s,3),Math.max(e.l-4,5)),sunken:this.#t(e.h,Math.max(e.s,4),Math.max(e.l-6,8)),overlay:this.#t(e.h,Math.max(e.s,2),Math.min(e.l+2,98)),inverse:this.#y(t),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#T(t){return{base:t.subtle,subtle:t.elevated,elevated:t.sunken,sunken:this.#L(t.sunken,.05),overlay:t.elevated}}#L(t,e=.05){let r=this.#n(t),o=Math.max(r.l-r.l*e,5);return this.#t(r.h,r.s,o)}#y(t){let e=this.#n(t);if(e.l>50){let r=Math.min(e.s+5,25),o=Math.max(12-(e.l-50)*.1,8);return this.#t(e.h,r,o)}else{let r=Math.max(e.s-10,5),o=Math.min(85+(50-e.l)*.3,95);return this.#t(e.h,r,o)}}#R(t,e="#ffffff",r={}){let o=r.background?r.background:this.#y(e),a=this.#b(o),i=r.primary?this.#r(r.primary):this.#i(t.primary);return{surface:{...a,fieldset:this.#j(a)},primary:i,secondary:r.secondary?this.#r(r.secondary):this.#i(t.secondary),accent:r.accent?this.#r(r.accent):this.#i(t.accent),gray:r.secondary?this.#f(r.secondary):t.gray,success:this.#i(t.success),info:this.#i(t.info),warning:this.#i(t.warning),danger:this.#i(t.danger)}}#l(t){let e=String(t||"").replace("#",""),r=e.length===3?e.split("").map(a=>a+a).join(""):e,o=parseInt(r,16);return{r:o>>16&255,g:o>>8&255,b:o&255}}#p(t){let{r:e,g:r,b:o}=this.#l(t),a=[e/255,r/255,o/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*a[0]+.7152*a[1]+.0722*a[2]}#d(t,e){let r=this.#p(t),o=this.#p(e),a=Math.max(r,o),i=Math.min(r,o);return(a+.05)/(i+.05)}#v(t,e=4.5){if(!t)return"#000000";let r="#ffffff",o="#000000",a=this.#d(t,r);if(a>=e)return r;let i=this.#d(t,o);return i>=e||i>a?o:r}#x(t,e=1){let{r,g:o,b:a}=this.#l(t);return`rgba(${r}, ${o}, ${a}, ${e})`}#A(t,e,r=.5){let o=this.#l(t),a=this.#l(e),i=Math.round(o.r+(a.r-o.r)*r),c=Math.round(o.g+(a.g-o.g)*r),s=Math.round(o.b+(a.b-o.b)*r);return this.#W(i,c,s)}#W(t,e,r){let o=a=>{let i=Math.max(0,Math.min(255,Math.round(a))).toString(16);return i.length===1?"0"+i:i};return`#${o(t)}${o(e)}${o(r)}`}#j(t){return{base:t.elevated,subtle:t.overlay,elevated:this.#S(t.elevated,.08),sunken:t.elevated,overlay:this.#S(t.overlay,.05)}}#B(t={},e="#000000",r=4.5){let o=["600","700","800","500","400","900","300","200"],a={shade:null,color:null,ratio:0};for(let i of o){let c=t?.[i];if(!c||typeof c!="string")continue;let s=this.#d(c,e);if(s>a.ratio&&(a={shade:i,color:c,ratio:s}),s>=r)return c}return a.color||t?.["600"]||t?.["500"]}#w(t={},e=4.5){let r=["600","700","800","500","400","900"],o={shade:null,color:null,ratio:0};for(let a of r){let i=t?.[a];if(!i||typeof i!="string")continue;let c=this.#d(i,"#ffffff");if(c>o.ratio&&(o={shade:a,color:i,ratio:c}),c>=e)return i}return o.color||t?.["600"]||t?.["500"]}#k(t,e={}){let r={},o=e.light??.1,a=e.dark??.25;return Object.entries(t).forEach(([i,c])=>{if(!c||typeof c!="string"||!c.startsWith("#"))return;let s=this.#p(c)<.5,d=this.#v(c,4.5),l=this.#v(c,3),p=this.#A(d,c,.4),u=d,m=p,f=s?"#ffffff":"#000000",b=s?a:o,h=this.#x(f,b),w=s?"#ffffff":"#000000",z=s?.15:.1,k=this.#x(w,z);r[i]={bg:c,text:d,textSecondary:l,textMuted:p,icon:u,iconSubtle:m,shadow:h,border:k,scheme:s?"dark":"light"}}),r}#S(t,e=.05){let r=this.#n(t),o=Math.min(r.l+(100-r.l)*e,95);return this.#t(r.h,r.s,o)}#i(t){let e={};return Object.entries({50:{source:"900",dimFactor:.8},100:{source:"800",dimFactor:.8},200:{source:"700",dimFactor:.8},300:{source:"600",dimFactor:.8},400:{source:"500",dimFactor:.85},500:{source:"400",dimFactor:.85},600:{source:"300",dimFactor:.85},700:{source:"200",dimFactor:.85},800:{source:"100",dimFactor:.95},900:{source:"50",dimFactor:.95}}).forEach(([o,a])=>{let i=t[a.source];e[o]=this.#N(i,a.dimFactor)}),e}#N(t,e=.8){let r=this.#n(t),o=Math.max(r.s*e,5),a=Math.max(r.l*e,5);return this.#t(r.h,o,a)}generateSpacingTokens(t){let{baseUnit:e=4,scaleRatio:r=1.25,maxSpacingSteps:o=12}=t,a=Number.isFinite(Number(e))?Number(e):4,i=Math.min(Number.isFinite(Number(o))?Number(o):12,12),c={0:"0"};for(let s=1;s<=i;s++)c[s]=`${a*s}px`;return c}#U(t){let{radiusSize:e="medium",customRadius:r=null}=t,o;r!=null?o=r:typeof e=="number"?o=e:typeof e=="string"?o=g.RadiusSizes[e]??g.RadiusSizes.medium:o=g.RadiusSizes.medium;let a=Number.isFinite(Number(o))?Number(o):g.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(a*.25)?Math.round(a*.25):0}px`,sm:`${Number.isFinite(a*.5)?Math.round(a*.5):0}px`,md:`${a}px`,lg:`${Number.isFinite(a*1.5)?Math.round(a*1.5):0}px`,xl:`${Number.isFinite(a*2)?Math.round(a*2):0}px`,full:"9999px"}}#D(t){let{borderWidth:e="medium"}=t,r;return typeof e=="number"?r=e:typeof e=="string"?r=g.BorderWidths[e]??g.BorderWidths.medium:r=g.BorderWidths.medium,{hairline:`${g.BorderWidths.hairline}px`,thin:`${g.BorderWidths.thin}px`,medium:`${g.BorderWidths.medium}px`,thick:`${g.BorderWidths.thick}px`}}generateTypographyTokens(t){let{fontFamilyHeadings:e="system-ui, -apple-system, sans-serif",fontFamilyBody:r="system-ui, -apple-system, sans-serif",fontFamilyMono:o='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:a=16,fontScale:i=1.25,fontWeightLight:c=g.FontWeights.light,fontWeightNormal:s=g.FontWeights.normal,fontWeightMedium:d=g.FontWeights.medium,fontWeightSemibold:l=g.FontWeights.semibold,fontWeightBold:p=g.FontWeights.bold,lineHeightTight:u=g.LineHeights.tight,lineHeightNormal:m=g.LineHeights.normal,lineHeightRelaxed:f=g.LineHeights.relaxed}=t,b=Number.isFinite(Number(a))?Number(a):16,h=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:e,body:r,mono:o},fontSize:{xs:`${Math.round(b/Math.pow(h,2))}px`,sm:`${Math.round(b/h)}px`,base:`${b}px`,lg:`${Math.round(b*h)}px`,xl:`${Math.round(b*Math.pow(h,2))}px`,"2xl":`${Math.round(b*Math.pow(h,3))}px`,"3xl":`${Math.round(b*Math.pow(h,4))}px`,"4xl":`${Math.round(b*Math.pow(h,5))}px`},fontWeight:{light:c?.toString()||"300",normal:s?.toString()||"400",medium:d?.toString()||"500",semibold:l?.toString()||"600",bold:p?.toString()||"700"},lineHeight:{tight:u?.toString()||"1.25",normal:m?.toString()||"1.5",relaxed:f?.toString()||"1.75"}}}#$(t){let{baseShadowOpacity:e=.1,shadowBlurMultiplier:r=1,shadowOffsetMultiplier:o=1}=t,a=`rgba(0, 0, 0, ${e})`,i=`rgba(0, 0, 0, ${e*.5})`;return{sm:`0 ${1*o}px ${2*r}px 0 ${i}`,base:`0 ${1*o}px ${3*r}px 0 ${a}, 0 ${1*o}px ${2*r}px 0 ${i}`,md:`0 ${4*o}px ${6*r}px ${-1*o}px ${a}, 0 ${2*o}px ${4*r}px ${-1*o}px ${i}`,lg:`0 ${10*o}px ${15*r}px ${-3*o}px ${a}, 0 ${4*o}px ${6*r}px ${-2*o}px ${i}`,xl:`0 ${20*o}px ${25*r}px ${-5*o}px ${a}, 0 ${10*o}px ${10*r}px ${-5*o}px ${i}`,inner:`inset 0 ${2*o}px ${4*r}px 0 ${i}`}}#O(t){let{maxWidth:e=1200,containerPadding:r=16,breakpoints:o={sm:640,md:768,lg:1024,xl:1280}}=t,a=this.#z(t);return{maxWidth:this.#o(e,"1200px"),maxWidthSm:a.sm,maxWidthMd:a.md,maxWidthLg:a.lg,maxWidthXl:a.xl,minHeight:"100vh",containerPadding:this.#o(r,"16px"),breakpoints:{sm:this.#o(o.sm,"640px"),md:this.#o(o.md,"768px"),lg:this.#o(o.lg,"1024px"),xl:this.#o(o.xl,"1280px")},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#z(t={}){let e={sm:640,md:768,lg:1024,xl:1280},{maxWidths:r={},maxWidth:o=1200,containerPadding:a=16,breakpoints:i=e}=t||{},c=this.#s(a,16),s=this.#s(o,e.xl),d={sm:this.#s(i.sm,e.sm),md:this.#s(i.md,e.md),lg:this.#s(i.lg,e.lg),xl:this.#s(i.xl,e.xl)},l=u=>u?Math.max(320,u-c*2):s,p={sm:Math.min(s,l(d.sm)),md:Math.min(s,l(d.md)),lg:Math.min(s,l(d.lg)),xl:Math.max(320,s)};return{sm:this.#o(r.sm,`${p.sm}px`),md:this.#o(r.md,`${p.md}px`),lg:this.#o(r.lg,`${p.lg}px`),xl:this.#o(r.xl,`${p.xl}px`)}}#o(t,e){return typeof t=="number"&&Number.isFinite(t)?`${t}px`:typeof t=="string"&&t.trim().length>0?t:e}#s(t,e){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){let r=parseFloat(t);if(Number.isFinite(r))return r}return e}#P(t){let{transitionSpeed:e=g.TransitionSpeeds.normal,animationEasing:r=g.AnimationEasings["ease-out"]}=t,o;return typeof e=="number"?o=e:typeof e=="string"&&g.TransitionSpeeds[e]?o=g.TransitionSpeeds[e]:o=g.TransitionSpeeds.normal,{fast:`${Math.round(o*.6)}ms`,normal:`${o}ms`,slow:`${Math.round(o*1.4)}ms`}}#I(t){let{baseZIndex:e=1e3,zIndexStep:r=10}=t;return{dropdown:e.toString(),sticky:(e+r*2).toString(),fixed:(e+r*3).toString(),modal:(e+r*4).toString(),drawer:(e+r*5).toString(),popover:(e+r*6).toString(),tooltip:(e+r*7).toString(),notification:(e+r*8).toString()}}#H(t){let{set:e="phosphor",weight:r="regular",defaultSize:o=24,sizes:a={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:c="/assets/img/icons/"}=t;return{set:e,weight:r,defaultSize:`${o}px`,sizes:Object.fromEntries(Object.entries(a).map(([s,d])=>[s,`${d}px`])),spritePath:i,externalPath:c}}#_(t){let e=[];e.push(`  /* Colors */
`);let r=(o,a="")=>{Object.entries(o).forEach(([i,c])=>{typeof c=="object"&&c!==null?r(c,`${a}${i}-`):typeof c=="string"&&e.push(`  --color-${a}${i}: ${c};
`)})};return Object.entries(t).forEach(([o,a])=>{o!=="dark"&&o!=="surfaceSmart"&&o!=="interactive"&&typeof a=="object"&&a!==null&&r(a,`${o}-`)}),t.surfaceSmart&&(e.push(`  /* Smart Surface Tokens (context-aware) */
`),Object.entries(t.surfaceSmart).forEach(([o,a])=>{e.push(`  --surface-${o}-bg: ${a.bg};
`),e.push(`  --surface-${o}-text: ${a.text};
`),e.push(`  --surface-${o}-text-secondary: ${a.textSecondary};
`),e.push(`  --surface-${o}-text-muted: ${a.textMuted};
`),e.push(`  --surface-${o}-icon: ${a.icon};
`),e.push(`  --surface-${o}-icon-subtle: ${a.iconSubtle};
`),e.push(`  --surface-${o}-shadow: ${a.shadow};
`),e.push(`  --surface-${o}-border: ${a.border};
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
`}#q(t){let e=t.primary?.[500]||"#3b82f6",r=t.secondary?.[500]||"#8b5cf6",o=t.accent?.[500]||"#f59e0b";return`
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${e} 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${r} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${e} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${r} 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${e} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${r} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${o} 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${e} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${r} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${e} 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${r} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${e} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${e} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${o} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${r} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${o} 15%, transparent) 0px, transparent 50%);
    `}#G(t){let e=[`  /* Spacing */
`];return Object.entries(t).forEach(([r,o])=>{r!=null&&r!=="NaN"&&o!==void 0&&!o.includes("NaN")&&e.push(`  --spacing-${r}: ${o};
`)}),`${e.join("")}
`}#V(t){let e=[`  /* Border Radius */
`];return Object.entries(t).forEach(([r,o])=>{e.push(`  --radius-${r}: ${o};
`)}),`${e.join("")}
`}#Y(t){let e=[`  /* Border Widths */
`];return Object.entries(t).forEach(([r,o])=>{e.push(`  --border-width-${r}: ${o};
`)}),`${e.join("")}
`}#Q(t){let e=[`  /* Typography */
`];return Object.entries(t).forEach(([r,o])=>{let a=r.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(o).forEach(([i,c])=>{let s=i.replace(/([A-Z])/g,"-$1").toLowerCase();e.push(`  --font-${a}-${s}: ${c};
`)})}),`${e.join("")}
`}#u(t){let e=[`  /* Shadows */
`];return Object.entries(t).forEach(([r,o])=>{e.push(`  --shadow-${r}: ${o};
`)}),`${e.join("")}
`}#Z(t){let e=[`  /* Layout */
`];return Object.entries(t).forEach(([r,o])=>{let a=r.replace(/([A-Z])/g,"-$1").toLowerCase();r!=="breakpoints"&&e.push(`  --layout-${a}: ${o};
`)}),`${e.join("")}
`}#J(t){let e=[`  /* Transitions */
`];return Object.entries(t).forEach(([r,o])=>{e.push(`  --transition-${r}: ${o};
`)}),`${e.join("")}
`}#X(t){let e=[`  /* Z-Index */
`];return Object.entries(t).forEach(([r,o])=>{e.push(`  --z-${r}: ${o};
`)}),`${e.join("")}
`}#K(t){let e=[`  /* Icon System */
`];return e.push(`  --icon-set: ${t.set};
`),e.push(`  --icon-weight: ${t.weight};
`),e.push(`  --icon-size: ${t.defaultSize};
`),Object.entries(t.sizes).forEach(([r,o])=>{e.push(`  --icon-size-${r}: ${o};
`)}),`${e.join("")}
`}#ee(t,e){if(!t?.dark)return"";let r=[],o=(p,u="")=>{Object.entries(p).forEach(([m,f])=>{typeof f=="object"&&f!==null?o(f,`${u}${m}-`):typeof f=="string"&&r.push(`  --color-${u}${m}: ${f};
`)})};Object.entries(t.dark).forEach(([p,u])=>{p!=="surfaceSmart"&&typeof u=="object"&&u!==null&&o(u,`${p}-`)});let a=[];t.dark.surfaceSmart&&(a.push(`  /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([p,u])=>{a.push(`  --surface-${p}-bg: ${u.bg};
`),a.push(`  --surface-${p}-text: ${u.text};
`),a.push(`  --surface-${p}-text-secondary: ${u.textSecondary};
`),a.push(`  --surface-${p}-text-muted: ${u.textMuted};
`),a.push(`  --surface-${p}-icon: ${u.icon};
`),a.push(`  --surface-${p}-icon-subtle: ${u.iconSubtle};
`),a.push(`  --surface-${p}-shadow: ${u.shadow};
`),a.push(`  --surface-${p}-border: ${u.border};
`)}),a.push(`
`));let i=`  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
`,c=`  /* Backdrop tokens - dark mode */
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
`,s=this.#oe(t),d=e?[this.#u(e)]:[];return`html[data-theme="dark"] {
${[...r,...a,...d,i,c,s].join("")}}
`}#te(t,e){if(!t?.dark)return"";let r=[],o=(u,m="")=>{Object.entries(u).forEach(([f,b])=>{typeof b=="object"&&b!==null?o(b,`${m}${f}-`):typeof b=="string"&&r.push(`    --color-${m}${f}: ${b};
`)})};Object.entries(t.dark).forEach(([u,m])=>{u!=="surfaceSmart"&&typeof m=="object"&&m!==null&&o(m,`${u}-`)});let a=[];t.dark.surfaceSmart&&(a.push(`    /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(t.dark.surfaceSmart).forEach(([u,m])=>{a.push(`    --surface-${u}-bg: ${m.bg};
`),a.push(`    --surface-${u}-text: ${m.text};
`),a.push(`    --surface-${u}-text-secondary: ${m.textSecondary};
`),a.push(`    --surface-${u}-text-muted: ${m.textMuted};
`),a.push(`    --surface-${u}-icon: ${m.icon};
`),a.push(`    --surface-${u}-icon-subtle: ${m.iconSubtle};
`),a.push(`    --surface-${u}-shadow: ${m.shadow};
`),a.push(`    --surface-${u}-border: ${m.border};
`)}),a.push(`
`));let i=[];t.interactive&&t.interactive.dark&&(i.push(`    /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`    --color-primary-fill: ${t.interactive.dark.fill}; /* For button backgrounds with white text */
`),i.push(`    --color-primary-text: ${t.interactive.dark.text}; /* For links and outline buttons on dark surfaces */
`));let c=[`    --color-text-primary: var(--color-gray-100);
`,`    --color-text-secondary: var(--color-gray-300);
`,`    --color-text-muted: var(--color-gray-400);
`,`    --color-border: var(--color-gray-700);
`,`    --color-input-bg: var(--color-gray-800);
`,`    --color-input-disabled-bg: var(--color-gray-900);
`,`    --color-input-disabled-text: var(--color-gray-600);
`,`    --color-code-bg: var(--color-gray-800);
`,...i].join(""),s=`    /* Backdrop tokens - dark mode */
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
`,d=this.#re(t),l=e?[this.#u(e)]:[];return`
       html[data-theme="dark"] {
${[...r,...a,...l,c,s,d].join("")}       }
`}#re(t){let e=t.dark||t,r=e.primary?.[400]||"#60a5fa",o=e.secondary?.[400]||"#a78bfa",a=e.accent?.[400]||"#fbbf24";return`    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${r} 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, ${r} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, ${r} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, ${o} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${a} 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, ${a} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${r} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, ${r} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
      `}#oe(t){let e=t.dark||t,r=e.primary?.[400]||"#60a5fa",o=e.secondary?.[400]||"#a78bfa",a=e.accent?.[400]||"#fbbf24";return`
  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${r} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${r} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${r} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${o} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${a} 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${o} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${a} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${r} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${o} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${r} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${r} 17%, transparent) 0px, transparent 50%),
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

`}#le(){let{gap:t,inputPadding:e,buttonPadding:r,focusRingWidth:o,focusRingOpacity:a,borderWidthThin:i,sectionSpacing:c,buttonMinHeight:s,inputMinHeight:d}=this.options.design,l=e||.75,p=r||1,u=o||3,m=i||1,f=t||1,b=c||2,h=s||44;return`/* Mobile-First Form Styles - Generated from Design Config */
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
  padding: calc(var(--spacing-1) * ${l}) var(--spacing-4);
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
      box-shadow: 0 0 0 ${u}px color-mix(in oklab, var(--color-danger-500) ${Math.round((a||.3)*100)}%, transparent);
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
  box-shadow: 0 0 0 ${u}px color-mix(in oklab, var(--color-primary-500) ${Math.round((a||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${u}px color-mix(in oklab, var(--color-primary-500) ${Math.round((a||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${u}px color-mix(in oklab, var(--color-primary-500) ${Math.round((a||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${u}px color-mix(in oklab, var(--color-primary-500) ${Math.round((a||.3)*100)}%, transparent);
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
`}#ve(){let{layout:t={}}=this.options.design,e=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},r=t.gridSystem||{},o=r.columns||[1,2,3,4,6],a=r.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=this.#z(t),c=[`
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

`];for(let s of o)c.push(`.grid-cols-${s} { grid-template-columns: repeat(${s}, 1fr); }
`);c.push(`
/* Auto-fit grids (responsive) */
`);for(let[s,d]of Object.entries(a))c.push(`.grid-auto-${s} { grid-template-columns: repeat(auto-fit, minmax(${d}, 1fr)); }
`);return c.push(`
/* Gap utilities */
.gap-0 { gap: 0; } .gap-xs { gap: var(--spacing-1); } .gap-sm { gap: var(--spacing-2); } .gap-md { gap: var(--spacing-4); } .gap-lg { gap: var(--spacing-6); } .gap-xl { gap: var(--spacing-8); }

`),c.push(`
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
`),c.join("")}#xe(){return`/* Media Element Utilities */

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

`}#we(){let{layout:t={},a11y:e={}}=this.options.design,r=t.breakpoints||{sm:640,md:768,lg:1024,xl:1280},o=e.minTouchTarget||g.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

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

`}#n(t){let e=parseInt(t.slice(1,3),16)/255,r=parseInt(t.slice(3,5),16)/255,o=parseInt(t.slice(5,7),16)/255,a=Math.max(e,r,o),i=Math.min(e,r,o),c,s,d=(a+i)/2;if(a===i)c=s=0;else{let l=a-i;switch(s=d>.5?l/(2-a-i):l/(a+i),a){case e:c=(r-o)/l+(r<o?6:0);break;case r:c=(o-e)/l+2;break;case o:c=(e-r)/l+4;break}c/=6}return{h:c*360,s:s*100,l:d*100}}#t(t,e,r){t=t/360,e=e/100,r=r/100;let o=(d,l,p)=>(p<0&&(p+=1),p>1&&(p-=1),p<1/6?d+(l-d)*6*p:p<1/2?l:p<2/3?d+(l-d)*(2/3-p)*6:d),a,i,c;if(e===0)a=i=c=r;else{let d=r<.5?r*(1+e):r+e-r*e,l=2*r-d;a=o(l,d,t+1/3),i=o(l,d,t),c=o(l,d,t-1/3)}let s=d=>{let l=Math.round(d*255).toString(16);return l.length===1?"0"+l:l};return`#${s(a)}${s(i)}${s(c)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#ke(){this.#e={tokens:this.#Se(),primitives:this.#$e(),components:this.#ze(),utilities:this.#Me()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#Se(){let{colors:t,spacing:e,radius:r,borderWidths:o,typography:a,shadows:i,darkShadows:c,layout:s,transitions:d,zIndex:l,icons:p}=this.tokens,u=[`@layer tokens {
       :root {
          ${this.#_(t)}
          ${this.#G(e)}
          ${this.#V(r)}
          ${this.#Y(o)}
          ${this.#Q(a)}
          ${this.#u(i)}
          ${this.#Z(s)}
          ${this.#J(d)}
          ${this.#X(l)}
          ${this.#K(p)}
       }
       ${this.#te(t,c)}
    }`];return u.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),u.push(this.#ee(t,c)),u.join("")}#$e(){let{advanced:t={},a11y:e={},layout:r={}}=this.options.design,o=t.tabSize||g.TabSizes.standard,a=e.minTouchTarget||g.TouchTargetSizes.standard,i=r.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
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
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof M<"u"?M:null,enums:typeof g<"u"?g:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let t=[],e=this.tokens.colors;for(let[r,o]of Object.entries(e))typeof o=="object"&&o!==null&&t.push({name:r,scale:o});return t},getColorScale:t=>this.tokens.colors[t]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([t,e])=>({key:t,value:e})),getTypography:()=>this.tokens.typography,getLayerCSS:t=>{let e=["tokens","primitives","components","utilities"];if(!e.includes(t))throw new Error(`Invalid layer: ${t}. Must be one of ${e.join(", ")}`);return this.#e?.[t]||""},usesEnumValue:(t,e)=>{let r=this.options.design||{};return JSON.stringify(r).includes(e)}}}}get tokensStylesheet(){return this.#a?.tokens}get primitivesStylesheet(){return this.#a?.primitives}get componentsStylesheet(){return this.#a?.components}get utilitiesStylesheet(){return this.#a?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#c("tokens",this.#e.tokens),"pds-primitives.css.js":this.#c("primitives",this.#e.primitives),"pds-components.css.js":this.#c("components",this.#e.components),"pds-utilities.css.js":this.#c("utilities",this.#e.utilities),"pds-styles.css.js":this.#c("styles",this.layeredCSS)}}#c(t,e){let r=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${t}
// Auto-generated - do not edit directly

export const ${t} = new CSSStyleSheet();
${t}.replaceSync(\`${r}\`);

export const ${t}CSS = \`${r}\`;
`}};var re=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(t={}){this._mode="static",this._staticPaths={...this._staticPaths,...t}}async getStylesheet(t){if(this._mode==="live")return null;try{return(await import(this._staticPaths[t]))[t]}catch(e){console.error(`[PDS Registry] Failed to load static ${t}:`,e),console.error(`[PDS Registry] Looking for: ${this._staticPaths[t]}`),console.error("[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");let r=new CSSStyleSheet;return r.replaceSync("/* Failed to load "+t+" */"),r}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},oe=new re;function Ye(n){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let r=new CSSStyleSheet;r.replaceSync(n),r._pds=!0;let o=(document.adoptedStyleSheets||[]).filter(a=>a._pds!==!0);document.adoptedStyleSheets=[...o,r];return}let t="pds-runtime-stylesheet",e=document.getElementById(t);if(!e){e=document.createElement("style"),e.id=t,e.type="text/css";let r=document.head||document.getElementsByTagName("head")[0];r?r.appendChild(e):document.documentElement.appendChild(e)}e.textContent=n}catch(t){console.warn("installRuntimeStyles failed:",t)}}function ae(n){let t=n;if(!t||typeof t!="object"){console.error("[Runtime] applyStyles requires an explicit generator instance in live mode");return}let e=t.layeredCSS||t.css||"";if(!e){t.options?.log?.("warn","[Runtime] No CSS available on generator to apply");return}Ye(e)}async function be(n,t=[],e=null){try{let r=e?.primitivesStylesheet?e.primitivesStylesheet:await oe.getStylesheet("primitives");n.adoptedStyleSheets=[r,...t]}catch(r){let o=n.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${o}> failed to adopt primitives:`,r),n.adoptedStyleSheets=t}}async function ye(n,t=["primitives"],e=[],r=null){try{let a=(await Promise.all(t.map(async i=>{if(r)switch(i){case"tokens":return r.tokensStylesheet;case"primitives":return r.primitivesStylesheet;case"components":return r.componentsStylesheet;case"utilities":return r.utilitiesStylesheet;default:break}return oe.getStylesheet(i)}))).filter(i=>i!==null);n.adoptedStyleSheets=[...a,...e]}catch(o){let a=n.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${a}> failed to adopt layers:`,o),n.adoptedStyleSheets=e}}var Qe=[{selector:".accordion"},{selector:"nav[data-dropdown]"},{selector:"label[data-toggle]"},{selector:'input[type="range"]'},{selector:"form[data-required]"},{selector:"fieldset[role=group][data-open]"},{selector:"[data-clip]"},{selector:"button, a[class*='btn-']"}];function Ze(n){n.dataset.enhancedAccordion||(n.dataset.enhancedAccordion="true",n.addEventListener("toggle",t=>{t.target.open&&t.target.parentElement===n&&n.querySelectorAll(":scope > details[open]").forEach(e=>{e!==t.target&&(e.open=!1)})},!0))}function Je(n){if(n.dataset.enhancedDropdown)return;n.dataset.enhancedDropdown="true";let t=n.lastElementChild;if(!t)return;let e=n.querySelector("[data-dropdown-toggle]")||n.querySelector("button");e&&!e.hasAttribute("type")&&e.setAttribute("type","button"),t.id||(t.id=`dropdown-${Math.random().toString(36).slice(2,9)}`),t.tagName?.toLowerCase()==="menu"&&!t.hasAttribute("role")&&t.setAttribute("role","menu"),t.hasAttribute("aria-hidden")||t.setAttribute("aria-hidden","true"),e&&(e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-controls",t.id),e.setAttribute("aria-expanded","false"));let o=()=>{let s=(n.getAttribute("data-mode")||"auto").toLowerCase();if(s==="up"||s==="down")return s;let d=n.getBoundingClientRect(),l=Math.max(0,window.innerHeight-d.bottom);return Math.max(0,d.top)>l?"up":"down"},a=()=>{n.dataset.dropdownDirection=o(),t.setAttribute("aria-hidden","false"),e?.setAttribute("aria-expanded","true")},i=()=>{t.setAttribute("aria-hidden","true"),e?.setAttribute("aria-expanded","false")},c=()=>{t.getAttribute("aria-hidden")==="false"?i():a()};e?.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),c()}),document.addEventListener("click",s=>{n.contains(s.target)||i()}),n.addEventListener("keydown",s=>{s.key==="Escape"&&(i(),e?.focus())}),n.addEventListener("focusout",s=>{(!s.relatedTarget||!n.contains(s.relatedTarget))&&i()})}function Xe(n){if(n.dataset.enhancedToggle)return;n.dataset.enhancedToggle="true";let t=n.querySelector('input[type="checkbox"]');if(!t)return;n.hasAttribute("tabindex")||n.setAttribute("tabindex","0"),n.setAttribute("role","switch"),n.setAttribute("aria-checked",t.checked?"true":"false");let e=document.createElement("span");e.className="toggle-switch",e.setAttribute("role","presentation"),e.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="toggle-knob",e.appendChild(r),n.insertBefore(e,t.nextSibling);let o=()=>{n.setAttribute("aria-checked",t.checked?"true":"false")},a=()=>{t.disabled||(t.checked=!t.checked,o(),t.dispatchEvent(new Event("change",{bubbles:!0})))};n.addEventListener("click",i=>{i.preventDefault(),a()}),n.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),a())}),t.addEventListener("change",o)}function Ke(n){if(n.dataset.enhancedRange)return;let t=n.closest("label"),e=t?.classList.contains("range-output"),r=n.id||`range-${Math.random().toString(36).substring(2,11)}`,o=`${r}-output`;if(n.id=r,e){let a=t.querySelector("span");if(a&&!a.classList.contains("range-output-wrapper")){let i=document.createElement("span");i.className="range-output-wrapper",i.style.display="flex",i.style.justifyContent="space-between",i.style.alignItems="center";let c=document.createElement("span");c.textContent=a.textContent,i.appendChild(c);let s=document.createElement("output");s.id=o,s.setAttribute("for",r),s.style.color="var(--surface-text-secondary, var(--color-text-secondary))",s.style.fontSize="0.875rem",s.textContent=n.value,i.appendChild(s),a.textContent="",a.appendChild(i);let d=()=>{s.textContent=n.value};n.addEventListener("input",d)}}else{let a=n.closest(".range-container");a||(a=document.createElement("div"),a.className="range-container",n.parentNode?.insertBefore(a,n),a.appendChild(n)),a.style.position="relative";let i=document.createElement("output");i.id=o,i.setAttribute("for",r),i.className="range-bubble",i.setAttribute("aria-live","polite"),a.appendChild(i);let c=()=>{let l=parseFloat(n.min)||0,p=parseFloat(n.max)||100,u=parseFloat(n.value),m=(u-l)/(p-l);i.style.left=`calc(${m*100}% )`,i.textContent=String(u)},s=()=>i.classList.add("visible"),d=()=>i.classList.remove("visible");n.addEventListener("input",c),n.addEventListener("pointerdown",s),n.addEventListener("pointerup",d),n.addEventListener("pointerleave",d),n.addEventListener("focus",s),n.addEventListener("blur",d),c()}n.dataset.enhancedRange="1"}function et(n){if(n.dataset.enhancedRequired)return;n.dataset.enhancedRequired="true";let t=e=>{let r=e.closest("label");if(!r||r.querySelector(".required-asterisk"))return;let o=document.createElement("span");o.classList.add("required-asterisk"),o.textContent="*",o.style.marginLeft="4px",r.querySelector("span").appendChild(o);let a=e.closest("form");if(a&&!a.querySelector(".required-legend")){let i=document.createElement("small");i.classList.add("required-legend"),i.textContent="* Required fields",a.insertBefore(i,a.querySelector(".form-actions")||a.lastElementChild)}};n.querySelectorAll("[required]").forEach(e=>{t(e)})}function tt(n){if(n.dataset.enhancedOpenGroup)return;n.dataset.enhancedOpenGroup="true",n.classList.add("flex","flex-wrap","buttons");let t=document.createElement("input");t.type="text",t.placeholder="Add item...",t.classList.add("input-text","input-sm"),t.style.width="auto";let e=n.querySelector('input[type="radio"], input[type="checkbox"]');n.appendChild(t),t.addEventListener("keydown",r=>{if(r.key==="Enter"||r.key==="Tab"){let o=t.value.trim();if(o){r.preventDefault();let a=e.type==="radio"?"radio":"checkbox",i=`open-group-${Math.random().toString(36).substring(2,11)}`,c=document.createElement("label"),s=document.createElement("span");s.setAttribute("data-label",""),s.textContent=o;let d=document.createElement("input");d.type=a,d.name=e.name||n.getAttribute("data-name")||"open-group",d.value=o,d.id=i,c.appendChild(s),c.appendChild(d),n.insertBefore(c,t),t.value=""}}else if(r.key==="Backspace"&&t.value===""){r.preventDefault();let o=n.querySelectorAll("label");o.length>0&&o[o.length-1].remove()}})}function rt(n){if(n.dataset.enhancedClip)return;n.dataset.enhancedClip="true",n.hasAttribute("tabindex")||n.setAttribute("tabindex","0"),n.hasAttribute("role")||n.setAttribute("role","button");let t=()=>{let r=n.getAttribute("data-clip-open")==="true";n.setAttribute("aria-expanded",r?"true":"false")},e=()=>{let r=n.getAttribute("data-clip-open")==="true";n.setAttribute("data-clip-open",r?"false":"true"),t()};n.addEventListener("click",r=>{r.defaultPrevented||e()}),n.addEventListener("keydown",r=>{(r.key===" "||r.key==="Enter")&&(r.preventDefault(),e())}),t()}function ot(n){if(n.dataset.enhancedBtnWorking)return;n.dataset.enhancedBtnWorking="true";let t=null,e=!1;new MutationObserver(o=>{o.forEach(a=>{if(a.attributeName==="class"){let i=n.classList.contains("btn-working"),c=n.querySelector("pds-icon");if(i)if(c)t||(t=c.getAttribute("icon")),c.setAttribute("icon","circle-notch");else{let s=document.createElement("pds-icon");s.setAttribute("icon","circle-notch"),s.setAttribute("size","sm"),n.insertBefore(s,n.firstChild),e=!0}else a.oldValue?.includes("btn-working")&&c&&(e?(c.remove(),e=!1):t&&(c.setAttribute("icon",t),t=null))}})}).observe(n,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var at=new Map([[".accordion",Ze],["nav[data-dropdown]",Je],["label[data-toggle]",Xe],['input[type="range"]',Ke],["form[data-required]",et],["fieldset[role=group][data-open]",tt],["[data-clip]",rt],["button, a[class*='btn-']",ot]]),ve=Qe.map(n=>({...n,run:at.get(n.selector)||(()=>{})}));var xe=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
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
    `.trim()}];var ke="pds",nt=/^([a-z][a-z0-9+\-.]*:)?\/\//i,we=/^[a-z]:/i;function P(n=""){return n.endsWith("/")?n:`${n}/`}function it(n="",t=ke){let e=n.replace(/\/+$/,"");return new RegExp(`(?:^|/)${t}$`,"i").test(e)?e:`${e}/${t}`}function st(n){return n.replace(/^\.\/+/,"")}function ct(n){return we.test(n)?n.replace(we,"").replace(/^\/+/,""):n}function lt(n){return n.startsWith("public/")?n.substring(7):n}function Se(n,t={}){let e=t.segment||ke,r=t.defaultRoot||`/assets/${e}/`,o=n?.public&&n.public?.root||n?.static&&n.static?.root||null;if(!o||typeof o!="string")return P(r);let a=o.trim();return a?(a=a.replace(/\\/g,"/"),a=it(a,e),a=P(a),nt.test(a)?a:(a=st(a),a=ct(a),a.startsWith("/")||(a=lt(a),a.startsWith("/")||(a=`/${a}`),a=a.replace(/\/+/g,(i,c)=>c===0?i:"/")),P(a))):P(r)}function $e(n){let t=n.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(t.toLowerCase()))return!0;let o=document.createElement("canvas").getContext("2d");if(!o)return!1;let a="mmmmmmmmmmlli",i="72px",c="monospace";o.font=`${i} ${c}`;let s=o.measureText(a).width;o.font=`${i} "${t}", ${c}`;let d=o.measureText(a).width;return s!==d}function dt(n){return n?n.split(",").map(r=>r.trim())[0].replace(/['"]/g,"").trim():null}async function pt(n,t={}){if(!n)return Promise.resolve();let{weights:e=[400,500,600,700],italic:r=!1}=t,o=dt(n);if(!o||$e(o))return Promise.resolve();let a=encodeURIComponent(o);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${a}"]`)?(console.log(`Font "${o}" is already loading or loaded`),Promise.resolve()):(console.log(`Loading font "${o}" from Google Fonts...`),new Promise((c,s)=>{let d=document.createElement("link");d.rel="stylesheet";let l=r?`ital,wght@0,${e.join(";0,")};1,${e.join(";1,")}`:`wght@${e.join(";")}`;d.href=`https://fonts.googleapis.com/css2?family=${a}:${l}&display=swap`,d.setAttribute("data-font-loader",o),d.onload=()=>{console.log(`Successfully loaded font "${o}"`),c()},d.onerror=()=>{console.warn(`Failed to load font "${o}" from Google Fonts`),s(new Error(`Failed to load font: ${o}`))},document.head.appendChild(d),setTimeout(()=>{$e(o)||console.warn(`Font "${o}" did not load within timeout`),c()},5e3)}))}async function ze(n){if(!n)return Promise.resolve();let t=new Set;n.fontFamilyHeadings&&t.add(n.fontFamilyHeadings),n.fontFamilyBody&&t.add(n.fontFamilyBody),n.fontFamilyMono&&t.add(n.fontFamilyMono);let e=Array.from(t).map(r=>pt(r).catch(o=>{console.warn(`Could not load font: ${r}`,o)}));await Promise.all(e)}var gt=/^[a-z][a-z0-9+\-.]*:\/\//i,I=(()=>{try{return import.meta.url}catch{return}})(),Y=n=>typeof n=="string"&&n.length&&!n.endsWith("/")?`${n}/`:n;function Q(n,t={}){if(!n||gt.test(n))return n;let{preferModule:e=!0}=t,r=()=>{if(!I)return null;try{return new URL(n,I).href}catch{return null}},o=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(n,window.location.origin).href}catch{return null}};return(e?r()||o():o()||r())||n}var Fe=(()=>{if(I)try{let n=new URL(I);if(/\/public\/assets\/js\//.test(n.pathname))return new URL("../pds/",I).href}catch{return}})(),Ce=!1;function Te(n){Ce||typeof document>"u"||(Ce=!0,n.addEventListener("pds:ready",t=>{let e=t.detail?.mode;e&&document.documentElement.classList.add(`pds-${e}`,"pds-ready")}))}function se(n={},t={}){if(!t||typeof t!="object")return n;let e=Array.isArray(n)?[...n]:{...n};for(let[r,o]of Object.entries(t))o&&typeof o=="object"&&!Array.isArray(o)?e[r]=se(e[r]&&typeof e[r]=="object"?e[r]:{},o):e[r]=o;return e}function ie(n=""){return String(n).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function N(n){if(n==null)return n;if(typeof n=="function")return;if(typeof n!="object")return n;if(Array.isArray(n))return n.map(e=>N(e)).filter(e=>e!==void 0);let t={};for(let e in n)if(n.hasOwnProperty(e)){let r=n[e];if(typeof r!="function"){let o=N(r);o!==void 0&&(t[e]=o)}}return t}function Le(n={},t={},{presets:e,defaultLog:r}){let o=n&&typeof n.log=="function"?n.log:r,a=typeof n=="object"&&("colors"in n||"typography"in n||"spatialRhythm"in n||"shape"in n||"behavior"in n||"layout"in n||"advanced"in n||"a11y"in n||"components"in n||"icons"in n),i=n&&n.enhancers;i&&!Array.isArray(i)&&(i=Object.values(i));let c=i??t.enhancers??[],s=n&&n.preset,d=n&&n.design,l=n&&n.icons&&typeof n.icons=="object"?n.icons:null,p="preset"in(n||{})||"design"in(n||{})||"enhancers"in(n||{});n&&typeof n=="object"&&ge(n,{log:o,context:"PDS.start"});let u,m=null;if(p){d&&typeof d=="object"&&ee(d,{log:o,context:"PDS.start"});let f=String(s||"default").toLowerCase(),b=e?.[f]||Object.values(e||{}).find(v=>ie(v.name)===f||String(v.name||"").toLowerCase()===f);if(!b)throw new Error(`PDS preset not found: "${s||"default"}"`);m={id:b.id||ie(b.name),name:b.name||b.id||String(f)};let h=structuredClone(b);if(d&&typeof d=="object"||l){let v=d?N(d):{},x=l?N(l):null,F=x?se(v,{icons:x}):v;h=se(h,structuredClone(F))}let{mode:w,autoDefine:z,applyGlobalStyles:k,manageTheme:T,themeStorageKey:L,preloadStyles:W,criticalLayers:j,managerURL:$,manager:S,preset:E,design:R,enhancers:J,log:_,...y}=n;u={...y,design:h,preset:m.name,log:_||r}}else if(a){ee(n,{log:o,context:"PDS.start"});let{log:f,...b}=n;u={design:structuredClone(b),log:f||r}}else{let f=e?.default||Object.values(e||{}).find(b=>ie(b.name)==="default");if(!f)throw new Error("PDS default preset not available");m={id:f.id||"default",name:f.name||"Default"},u={design:structuredClone(f),preset:m.name,log:r}}return{generatorConfig:u,enhancers:c,presetInfo:m}}function Re({manageTheme:n,themeStorageKey:t,applyResolvedTheme:e,setupSystemListenerIfNeeded:r}){let o="light",a=null;if(n&&typeof window<"u"){try{a=localStorage.getItem(t)||null}catch{a=null}try{e?.(a),r?.(a)}catch{}a?a==="system"?o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":o=a:o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:o,storedTheme:a}}function Ae(n,{resolvePublicAssetURL:t}){let e=!!(n?.public?.root||n?.static?.root),r=t(n);return!e&&Fe&&(r=Fe),Y(Q(r))}async function We(n,{baseEnhancers:t=[]}={}){let{autoDefineBaseURL:e="/auto-define/",autoDefinePreload:r=[],autoDefineMapper:o=null,enhancers:a=[],autoDefineOverrides:i=null,autoDefinePreferModule:c=!0}=n,s=(()=>{let l=new Map;return(t||[]).forEach(p=>l.set(p.selector,p)),(a||[]).forEach(p=>l.set(p.selector,p)),Array.from(l.values())})(),d=null;if(typeof window<"u"&&typeof document<"u"){let l=null;try{let h=await Promise.resolve().then(()=>(Ee(),Me));l=h?.AutoDefiner||h?.default?.AutoDefiner||h?.default||null}catch(h){console.warn("AutoDefiner not available:",h?.message||h)}let p=h=>{switch(h){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${h}.js`}},{mapper:u,...m}=i&&typeof i=="object"?i:{},b={baseURL:e&&Y(Q(e,{preferModule:c})),predefine:r,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:s,onError:(h,w)=>{if(typeof h=="string"&&h.startsWith("pds-")){let k=["pds-form","pds-drawer"].includes(h),T=w?.message?.includes("#pds/lit")||w?.message?.includes("Failed to resolve module specifier");k&&T?console.error(`\u274C PDS component <${h}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`):console.warn(`\u26A0\uFE0F PDS component <${h}> not found. Assets may not be installed.`)}else console.error(`\u274C Auto-define error for <${h}>:`,w)},...m,mapper:h=>{if(customElements.get(h))return null;if(typeof o=="function")try{let w=o(h);return w===void 0?p(h):w}catch(w){return console.warn("Custom autoDefine.mapper error; falling back to default:",w?.message||w),p(h)}return p(h)}};l&&(d=new l(b),r.length>0&&typeof l.define=="function"&&await l.define(...r,{baseURL:e,mapper:b.mapper,onError:b.onError}))}return{autoDefiner:d,mergedEnhancers:s}}var Ue=!1,H=null;async function ft(n,{applyResolvedTheme:t,setupSystemListenerIfNeeded:e}){if(Ue)return;let[r,o,a,i]=await Promise.all([Promise.resolve().then(()=>(te(),fe)),Promise.resolve().then(()=>(q(),pe)),Promise.resolve().then(()=>(de(),le)),Promise.resolve().then(()=>(Ne(),Be))]),c=r?.default||r?.ontology,s=r?.findComponentForElement,d=o?.enums;H=a?.PDSQuery||a?.default||null,n.ontology=c,n.findComponentForElement=s,n.enums=d,n.common=i||{},n.presets=O,n.enhancerMetadata=xe,n.applyStyles=function(l){return ae(l||C.instance)},n.adoptLayers=function(l,p,u){return ye(l,p,u,C.instance)},n.adoptPrimitives=function(l,p){return be(l,p,C.instance)},n.getGenerator=async function(){return C},n.query=async function(l){if(!H){let u=await Promise.resolve().then(()=>(de(),le));H=u?.PDSQuery||u?.default||null}return H?await new H(n).search(l):[]},Object.getOwnPropertyDescriptor(n,"compiled")||Object.defineProperty(n,"compiled",{get(){return n.registry?.isLive&&C.instance?C.instance.compiled:null},enumerable:!0,configurable:!1}),n.preloadCritical=function(l,p={}){if(typeof window>"u"||!document.head||!l)return;let{theme:u,layers:m=["tokens"]}=p;try{let f=u||"light";(u==="system"||!u)&&(f=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",f);let b=l.design?{...l,theme:f}:{design:l,theme:f},h=new C(b),w=m.map(z=>{try{return h.css?.[z]||""}catch{return""}}).filter(z=>z.trim()).join(`
`);if(w){let z=document.head.querySelector("style[data-pds-preload]");z&&z.remove();let k=document.createElement("style");k.setAttribute("data-pds-preload",""),k.textContent=w,document.head.insertBefore(k,document.head.firstChild)}}catch(f){console.warn("PDS preload failed:",f)}},Ue=!0}async function bt(n,t,{emitReady:e,applyResolvedTheme:r,setupSystemListenerIfNeeded:o}){if(!t||typeof t!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");if(await ft(n,{applyResolvedTheme:r,setupSystemListenerIfNeeded:o}),Te(n),typeof document<"u"&&document.adoptedStyleSheets){let p=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(m=>m._pdsFouc)){let m=new CSSStyleSheet;m.replaceSync(p),m._pdsFouc=!0,document.adoptedStyleSheets=[m,...document.adoptedStyleSheets]}}catch(u){if(console.warn("Constructable stylesheets not supported, using <style> tag fallback:",u),!document.head.querySelector("style[data-pds-fouc]")){let f=document.createElement("style");f.setAttribute("data-pds-fouc",""),f.textContent=p,document.head.insertBefore(f,document.head.firstChild)}}}let a=t.applyGlobalStyles??!0,i=t.manageTheme??!0,c=t.themeStorageKey??"pure-ds-theme",s=t.preloadStyles??!1,d=t.criticalLayers??["tokens","primitives"],l=t&&t.autoDefine||null;try{let{resolvedTheme:p}=Re({manageTheme:i,themeStorageKey:c,applyResolvedTheme:r,setupSystemListenerIfNeeded:o}),u=Le(t,{},{presets:O,defaultLog:me}),m=u.enhancers,{log:f,...b}=u.generatorConfig,h=structuredClone(b);h.log=f,i&&(h.theme=p);let w=new C(h);if(h.design?.typography)try{await ze(h.design.typography)}catch($){h?.log?.("warn","Failed to load some fonts from Google Fonts:",$)}if(s&&typeof window<"u"&&document.head)try{let $=d.map(S=>{try{return w.css?.[S]||""}catch(E){return h?.log?.("warn",`Failed to generate critical CSS for layer "${S}":`,E),""}}).filter(S=>S.trim()).join(`
`);if($){let S=document.head.querySelector("style[data-pds-critical]");S&&S.remove();let E=document.createElement("style");E.setAttribute("data-pds-critical",""),E.textContent=$;let R=document.head.querySelector('meta[charset], meta[name="viewport"]');R?R.parentNode.insertBefore(E,R.nextSibling):document.head.insertBefore(E,document.head.firstChild)}}catch($){h?.log?.("warn","Failed to preload critical styles:",$)}n.registry.setLiveMode(),u.presetInfo?.name?h?.log?.("log",`PDS live with preset "${u.presetInfo.name}"`):h?.log?.("log","PDS live with custom config"),a&&(await ae(C.instance),typeof window<"u"&&setTimeout(()=>{let $=document.head.querySelector("style[data-pds-critical]");$&&$.remove();let S=document.head.querySelector("style[data-pds-preload]");S&&S.remove();let E=document.getElementById("pds-runtime-stylesheet");E&&E.remove()},100));let z=Ae(t,{resolvePublicAssetURL:Se}),k;l&&l.baseURL?k=Y(Q(l.baseURL,{preferModule:!1})):k=`${z}components/`;let T=null,L=[];try{let $=await We({autoDefineBaseURL:k,autoDefinePreload:l&&Array.isArray(l.predefine)&&l.predefine||[],autoDefineMapper:l&&typeof l.mapper=="function"&&l.mapper||null,enhancers:m,autoDefineOverrides:l||null,autoDefinePreferModule:!(l&&l.baseURL)},{baseEnhancers:ve});T=$.autoDefiner,L=$.mergedEnhancers||[]}catch($){h?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",$)}let W=w?.options||h,j=N(t);return n.currentConfig=Object.freeze({mode:"live",...structuredClone(j),design:structuredClone(u.generatorConfig.design),preset:u.generatorConfig.preset,theme:p,enhancers:L}),e({mode:"live",generator:w,config:W,theme:p,autoDefiner:T}),{generator:w,config:W,theme:p,autoDefiner:T}}catch(p){throw n.dispatchEvent(new CustomEvent("pds:error",{detail:{error:p}})),p}}export{bt as startLive};
