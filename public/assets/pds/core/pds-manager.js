var Jr=Object.defineProperty;var ut=(t,e)=>()=>(t&&(e=t(t=0)),e);var gt=(t,e)=>{for(var r in e)Jr(t,r,{get:e[r],enumerable:!0})};var Ht={};gt(Ht,{enums:()=>y});var y,$e=ut(()=>{y={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"},IconSizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64,"3xl":96}}});var rr={};gt(rr,{default:()=>ln,findComponentForElement:()=>rn,getAllSelectors:()=>nn,getAllTags:()=>sn,getByCategory:()=>an,ontology:()=>H,searchOntology:()=>on});function ae(t,e){if(!t||!e)return!1;try{return t.matches(e)}catch{return!1}}function tr(t,e){if(!t||!e||!t.closest)return null;try{return t.closest(e)}catch{return null}}function rn(t,{maxDepth:e=5}={}){if(!t||t.closest&&t.closest(".showcase-toc"))return null;let r=t,n=0;for(;r&&n<e;){if(n++,r.tagName==="DS-SHOWCASE")return null;if(r.classList&&r.classList.contains("showcase-section")){r=r.parentElement;continue}for(let a of PDS.ontology.enhancements){let i=a.selector||a;if(ae(r,i))return{element:r,componentType:"enhanced-component",displayName:a.description||i,id:a.id}}if(r.tagName==="FIELDSET"){let a=r.getAttribute("role");if(a==="group"||a==="radiogroup")return{element:r,componentType:"form-group",displayName:a==="radiogroup"?"radio group":"form group"}}if(r.tagName==="LABEL"&&r.querySelector&&r.querySelector("input,select,textarea"))return{element:r,componentType:"form-control",displayName:"label with input"};let o=r.closest?r.closest("label"):null;if(o&&o.querySelector&&o.querySelector("input,select,textarea"))return{element:o,componentType:"form-control",displayName:"label with input"};for(let a of PDS.ontology.primitives){for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let d=s.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(u=>u.startsWith(d)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let c=r.parentElement,l=0;for(;c&&l<e;){if(c.classList&&Array.from(c.classList).some(u=>u.startsWith(d))&&c.tagName!=="DS-SHOWCASE")return{element:c,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};c=c.parentElement,l++}continue}continue}if(ae(r,s))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let p=tr(r,s);if(p&&p.tagName!=="DS-SHOWCASE")return{element:p,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.classList){let i=Array.from(r.classList);for(let s of a.selectors||[])if(typeof s=="string"&&s.includes("*")&&s.startsWith(".")){let p=s.slice(1).replace(/\*/g,"");if(i.some(d=>d.startsWith(p)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}}}for(let a of PDS.ontology.layoutPatterns||[])for(let i of a.selectors||[]){let s=String(i||"").trim();if(s.includes("*")){if(s.startsWith(".")){let d=s.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(c=>c.startsWith(d)))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}continue}if(ae(r,s))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags};let p=tr(r,s);if(p&&p.tagName!=="DS-SHOWCASE")return{element:p,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.tagName&&r.tagName.includes("-")){let a=r.tagName.toLowerCase(),i=PDS.ontology.components.find(s=>s.selectors.includes(a));return{element:r,componentType:"web-component",displayName:i?.name||a,id:i?.id||a,tags:i?.tags}}if(r.tagName==="BUTTON"){let a=r.querySelector&&r.querySelector("pds-icon");return{element:r,componentType:"button",displayName:a?"button with icon":"button",id:"button"}}if(ae(r,"pds-icon")||r.closest&&r.closest("pds-icon")){let a=ae(r,"pds-icon")?r:r.closest("pds-icon");return{element:a,componentType:"icon",displayName:`pds-icon (${a.getAttribute&&a.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(ae(r,"nav[data-dropdown]")||r.closest&&r.closest("nav[data-dropdown]"))return{element:ae(r,"nav[data-dropdown]")?r:r.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};r=r.parentElement}return null}function nn(){let t=[];for(let e of PDS.ontology.primitives)t.push(...e.selectors||[]);for(let e of PDS.ontology.components)t.push(...e.selectors||[]);for(let e of PDS.ontology.layoutPatterns||[])t.push(...e.selectors||[]);return Array.from(new Set(t))}function on(t,e={}){let r=t.toLowerCase(),n=[],o=(a,i)=>{for(let s of a)(s.id?.toLowerCase().includes(r)||s.name?.toLowerCase().includes(r)||s.description?.toLowerCase().includes(r)||s.tags?.some(d=>d.toLowerCase().includes(r))||s.category?.toLowerCase().includes(r)||s.selectors?.some(d=>d.toLowerCase().includes(r)))&&n.push({...s,type:i})};return(!e.type||e.type==="primitive")&&o(H.primitives,"primitive"),(!e.type||e.type==="component")&&o(H.components,"component"),(!e.type||e.type==="layout")&&o(H.layoutPatterns,"layout"),(!e.type||e.type==="enhancement")&&o(H.enhancements,"enhancement"),n}function an(t){let e=t.toLowerCase();return{primitives:H.primitives.filter(r=>r.category===e),components:H.components.filter(r=>r.category===e),layouts:H.layoutPatterns.filter(r=>r.category===e)}}function sn(){let t=new Set;return H.primitives.forEach(e=>e.tags?.forEach(r=>t.add(r))),H.components.forEach(e=>e.tags?.forEach(r=>t.add(r))),H.layoutPatterns.forEach(e=>e.tags?.forEach(r=>t.add(r))),H.enhancements.forEach(e=>e.tags?.forEach(r=>t.add(r))),Array.from(t).sort()}var H,ln,vt=ut(()=>{H={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"callout",name:"Callout",description:"Contextual information and notification messages",selectors:[".callout",".callout-info",".callout-success",".callout-warning",".callout-danger",".callout-error",".callout-dismissible"],tags:["feedback","message","notification","status","information"],category:"feedback"},{id:"empty-state",name:"Empty State",description:"Empty state layout for missing data or onboarding",selectors:[".empty-state"],tags:["empty","no-data","zero","placeholder","onboarding","state"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-fab",name:"FAB",description:"Floating Action Button with expandable satellite actions",selectors:["pds-fab"],tags:["button","action","floating","interactive"],category:"action"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-live-edit",name:"Live Edit",description:"Contextual live editing for PDS design settings",selectors:["pds-live-edit"],tags:["editor","live","config","tooling"],category:"tooling"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element",tags:["menu","interactive","navigation"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"color-input",selector:"label[data-color]",description:"Enhanced color input with swatch shell and hex output",tags:["color","input","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["callout","badge","empty-state"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]},action:{description:"Interactive actions and buttons",primitives:["button"],components:["pds-fab"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],empty:["empty-state","placeholder","zero","no-data","onboarding","callout","card","icon","button"],"empty state":["empty-state","empty","no-data","zero","onboarding"],"no data":["empty-state","empty","zero","placeholder"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-working","pds-fab","floating"],btn:["button","interactive","action","pds-fab"],fab:["pds-fab","floating","button","action","menu"],floating:["fab","pds-fab","button","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],callout:["notification","feedback","message","status","toast","information","alert","warning","error","info","success","danger"],alert:["callout","notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["callout","toast","pds-toaster","feedback","message","popup","alert"],toast:["pds-toaster","notification","callout","feedback","popup","snackbar","alert"],feedback:["callout","notification","toast","status","badge","validation","error","success","alert"],message:["callout","notification","feedback","dialog","toast","alert"],status:["badge","callout","indicator","feedback","state","alert"],error:["callout","danger","validation","feedback","warning","alert"],success:["callout","feedback","badge","status","check","alert"],warning:["callout","caution","feedback","status","alert"],info:["callout","information","feedback","status","alert"],danger:["callout","error","feedback","destructive","delete","alert"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};ln=H});var Ge={};gt(Ge,{deepMerge:()=>mr,fragmentFromTemplateLike:()=>Tn,isObject:()=>qe,parseHTML:()=>Et});function qe(t){return t&&typeof t=="object"&&!Array.isArray(t)}function mr(t,e){let r={...t};return qe(t)&&qe(e)&&Object.keys(e).forEach(n=>{qe(e[n])?n in t?r[n]=mr(t[n],e[n]):Object.assign(r,{[n]:e[n]}):Object.assign(r,{[n]:e[n]})}),r}function Tn(t){let e=Array.isArray(t?.strings)?t.strings:[],r=Array.isArray(t?.values)?t.values:[],n=new Set,o=[],a=/(\s)(\.[\w-]+)=\s*$/;for(let l=0;l<e.length;l+=1){let u=e[l]??"",g=u.match(a);if(g&&l<r.length){let b=g[2].slice(1),h=`pds-val-${l}`;u=u.replace(a,`$1data-pds-prop="${b}:${h}"`),n.add(l)}o.push(u),l<r.length&&!n.has(l)&&o.push(`<!--pds-val-${l}-->`)}let i=document.createElement("template");i.innerHTML=o.join("");let s=(l,u)=>{let g=l.parentNode;if(!g)return;if(u==null){g.removeChild(l);return}let m=b=>{if(b!=null){if(b instanceof Node){g.insertBefore(b,l);return}if(Array.isArray(b)){b.forEach(h=>m(h));return}g.insertBefore(document.createTextNode(String(b)),l)}};m(u),g.removeChild(l)},p=document.createTreeWalker(i.content,NodeFilter.SHOW_COMMENT),d=[];for(;p.nextNode();){let l=p.currentNode;l?.nodeValue?.startsWith("pds-val-")&&d.push(l)}return d.forEach(l=>{let u=Number(l.nodeValue.replace("pds-val-",""));s(l,r[u])}),i.content.querySelectorAll("*").forEach(l=>{let u=l.getAttribute("data-pds-prop");if(!u)return;let[g,m]=u.split(":"),b=Number(String(m).replace("pds-val-",""));g&&Number.isInteger(b)&&(l[g]=r[b]),l.removeAttribute("data-pds-prop")}),i.content}function Et(t){return new DOMParser().parseFromString(t,"text/html").body.childNodes}var Tt=ut(()=>{});$e();var pe="any",ze={type:"object",allowUnknown:!1,properties:{id:{type:"string",minLength:1,maxLength:64},name:{type:"string",minLength:1,maxLength:80},tags:{type:"array",uniqueItems:!0,items:{type:"string"}},themes:{type:"array",uniqueItems:!0,items:{type:"string",oneOf:[{const:"light",title:"Light"},{const:"dark",title:"Dark"},{const:"system",title:"System"}]}},description:{type:"string",maxLength:500},options:{type:"object",allowUnknown:!0,properties:{liquidGlassEffects:{type:"boolean"},backgroundMesh:{type:"number"}}},form:{type:"object",allowUnknown:!0,properties:{options:{type:"object",allowUnknown:!0,properties:{widgets:{type:"object",allowUnknown:!1,properties:{booleans:{type:"string"},numbers:{type:"string"},selects:{type:"string"}}},layouts:{type:"object",allowUnknown:!1,properties:{fieldsets:{type:"string"},arrays:{type:"string"}}},enhancements:{type:"object",allowUnknown:!1,properties:{icons:{type:"boolean"},datalists:{type:"boolean"},rangeOutput:{type:"boolean"},colorInput:{type:"boolean"}}},validation:{type:"object",allowUnknown:!1,properties:{showErrors:{type:"boolean"},validateOnChange:{type:"boolean"}}}}}}},colors:{type:"object",allowUnknown:!1,properties:{primary:{type:"string",relations:{tokens:["--color-primary-*","--color-primary-fill","--color-primary-text","--background-mesh-*"]}},secondary:{type:"string",relations:{tokens:["--color-secondary-*","--color-gray-*","--background-mesh-*"]}},accent:{type:"string",relations:{tokens:["--color-accent-*","--background-mesh-*"]}},background:{type:"string",relations:{tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},success:{type:["string","null"],relations:{tokens:["--color-success-*"]}},warning:{type:["string","null"],relations:{tokens:["--color-warning-*"]}},danger:{type:["string","null"],relations:{tokens:["--color-danger-*"]}},info:{type:["string","null"],relations:{tokens:["--color-info-*"]}},gradientStops:{type:"number"},elevationOpacity:{type:"number",relations:{tokens:["--surface-*-shadow"]}},darkMode:{type:"object",allowUnknown:!1,properties:{background:{type:"string",relations:{theme:"dark",tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},primary:{type:"string",relations:{theme:"dark",tokens:["--color-primary-*","--color-primary-fill","--color-primary-text"]}},secondary:{type:"string",relations:{theme:"dark",tokens:["--color-secondary-*","--color-gray-*"]}},accent:{type:"string",relations:{theme:"dark",tokens:["--color-accent-*"]}}}}}},typography:{type:"object",allowUnknown:!1,properties:{fontFamilyHeadings:{type:"string",relations:{tokens:["--font-family-headings"]}},fontFamilyBody:{type:"string",relations:{tokens:["--font-family-body"]}},fontFamilyMono:{type:"string",relations:{tokens:["--font-family-mono"]}},baseFontSize:{type:"number",relations:{tokens:["--font-size-*"]}},fontScale:{type:"number",relations:{tokens:["--font-size-*"]}},fontWeightLight:{type:["string","number"],relations:{tokens:["--font-weight-light"]}},fontWeightNormal:{type:["string","number"],relations:{tokens:["--font-weight-normal"]}},fontWeightMedium:{type:["string","number"],relations:{tokens:["--font-weight-medium"]}},fontWeightSemibold:{type:["string","number"],relations:{tokens:["--font-weight-semibold"]}},fontWeightBold:{type:["string","number"],relations:{tokens:["--font-weight-bold"]}},lineHeightTight:{type:["string","number"],relations:{tokens:["--font-line-height-tight"]}},lineHeightNormal:{type:["string","number"],relations:{tokens:["--font-line-height-normal"]}},lineHeightRelaxed:{type:["string","number"],relations:{tokens:["--font-line-height-relaxed"]}},letterSpacingTight:{type:"number"},letterSpacingNormal:{type:"number"},letterSpacingWide:{type:"number"}}},spatialRhythm:{type:"object",allowUnknown:!1,properties:{baseUnit:{type:"number",relations:{tokens:["--spacing-*"]}},scaleRatio:{type:"number"},maxSpacingSteps:{type:"number",relations:{tokens:["--spacing-*"]}},containerPadding:{type:"number"},inputPadding:{type:"number",relations:{rules:[{selectors:["input","textarea","select"],properties:["padding"]}]}},buttonPadding:{type:"number",relations:{rules:[{selectors:["button",".btn"],properties:["padding"]}]}},sectionSpacing:{type:"number",relations:{rules:[{selectors:["section"],properties:["margin","padding"]}]}}}},shape:{type:"object",allowUnknown:!1,properties:{radiusSize:{type:["string","number"],relations:{tokens:["--radius-*"]}},customRadius:{type:["string","number","null"]},borderWidth:{type:["string","number"],relations:{tokens:["--border-width-*"]}}}},behavior:{type:"object",allowUnknown:!1,properties:{transitionSpeed:{type:["string","number"],relations:{tokens:["--transition-*"]}},animationEasing:{type:"string"},customTransitionSpeed:{type:["number","null"]},customEasing:{type:["string","null"]},focusRingWidth:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["outline-width","box-shadow"]}]}},focusRingOpacity:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["box-shadow","outline-color"]}]}},hoverOpacity:{type:"number"}}},layout:{type:"object",allowUnknown:!1,properties:{maxWidth:{type:["number","string"],relations:{tokens:["--layout-max-width","--layout-max-width-*"]}},maxWidths:{type:"object",allowUnknown:!1,properties:{sm:{type:["number","string"],relations:{tokens:["--layout-max-width-sm"]}},md:{type:["number","string"],relations:{tokens:["--layout-max-width-md"]}},lg:{type:["number","string"],relations:{tokens:["--layout-max-width-lg"]}},xl:{type:["number","string"],relations:{tokens:["--layout-max-width-xl"]}}}},containerPadding:{type:["number","string"],relations:{tokens:["--layout-container-padding"]}},breakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"number"},md:{type:"number"},lg:{type:"number"},xl:{type:"number"}}},gridColumns:{type:"number"},gridGutter:{type:"number"},densityCompact:{type:"number"},densityNormal:{type:"number"},densityComfortable:{type:"number"},buttonMinHeight:{type:"number"},inputMinHeight:{type:"number"},baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}},utilities:{type:"object",allowUnknown:!0,properties:{grid:{type:"boolean"},flex:{type:"boolean"},spacing:{type:"boolean"},container:{type:"boolean"}}},gridSystem:{type:"object",allowUnknown:!0,properties:{columns:{type:"array",items:{type:"number"}},autoFitBreakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"string"},md:{type:"string"},lg:{type:"string"},xl:{type:"string"}}},enableGapUtilities:{type:"boolean"}}},containerMaxWidth:{type:["number","string"]}}},layers:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},shadowBlurMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowOffsetMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowDepth:{type:"string"},blurLight:{type:"number"},blurMedium:{type:"number"},blurHeavy:{type:"number"},baseZIndex:{type:"number",relations:{tokens:["--z-*"]}},zIndexStep:{type:"number",relations:{tokens:["--z-*"]}},zIndexBase:{type:"number"},zIndexDropdown:{type:"number"},zIndexSticky:{type:"number"},zIndexFixed:{type:"number"},zIndexModal:{type:"number"},zIndexPopover:{type:"number"},zIndexTooltip:{type:"number"},zIndexNotification:{type:"number"},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}}}},advanced:{type:"object",allowUnknown:!0,properties:{linkStyle:{type:"string"},colorDerivation:{type:"string"}}},a11y:{type:"object",allowUnknown:!0,properties:{minTouchTarget:{type:["string","number"]},prefersReducedMotion:{type:"boolean"},focusStyle:{type:"string"}}},icons:{type:"object",allowUnknown:!1,properties:{set:{type:"string"},weight:{type:"string"},defaultSize:{type:"number",relations:{tokens:["--icon-size"]}},sizes:{type:"object",allowUnknown:!0,properties:{xs:{type:["number","string"]},sm:{type:["number","string"]},md:{type:["number","string"]},lg:{type:["number","string"]},xl:{type:["number","string"]},"2xl":{type:["number","string"]}}},spritePath:{type:"string"},externalPath:{type:"string"},include:{type:"object",allowUnknown:!0,properties:{navigation:{type:"array",items:{type:"string"}},actions:{type:"array",items:{type:"string"}},communication:{type:"array",items:{type:"string"}},content:{type:"array",items:{type:"string"}},status:{type:"array",items:{type:"string"}},time:{type:"array",items:{type:"string"}},commerce:{type:"array",items:{type:"string"}},formatting:{type:"array",items:{type:"string"}},system:{type:"array",items:{type:"string"}}}}}},components:{type:"object",allowUnknown:!0},debug:{type:"boolean"}}},Kr={type:"object",allowUnknown:!0,properties:{mode:{type:"string"},preset:{type:"string"},design:ze,enhancers:{type:["object","array"]},applyGlobalStyles:{type:"boolean"},manageTheme:{type:"boolean"},themeStorageKey:{type:"string"},preloadStyles:{type:"boolean"},criticalLayers:{type:"array",items:{type:"string"}},autoDefine:{type:"object",allowUnknown:!1,properties:{predefine:{type:"array",items:{type:"string"}},mapper:{type:pe},enhancers:{type:["object","array"]},scanExisting:{type:"boolean"},observeShadows:{type:"boolean"},patchAttachShadow:{type:"boolean"},debounceMs:{type:"number"},onError:{type:pe},baseURL:{type:"string"}}},managerURL:{type:"string"},manager:{type:pe},liveEdit:{type:"boolean"},log:{type:pe}}};function Ce(t){return t===null?"null":Array.isArray(t)?"array":typeof t}function Zr(t,e){if(e===pe)return!0;let r=Ce(t);return Array.isArray(e)?e.includes(r):r===e}function Be(t,e,r,n){if(!e)return;let o=e.type||pe;if(!Zr(t,o)){n.push({path:r,expected:o,actual:Ce(t),message:`Expected ${o} but got ${Ce(t)}`});return}if(o==="array"&&e.items&&Array.isArray(t)&&t.forEach((a,i)=>{Be(a,e.items,`${r}[${i}]`,n)}),o==="object"&&t&&typeof t=="object"){let a=e.properties||{};for(let[i,s]of Object.entries(t)){if(!Object.prototype.hasOwnProperty.call(a,i)){e.allowUnknown||n.push({path:`${r}.${i}`,expected:"known property",actual:"unknown",message:`Unknown property "${i}"`});continue}Be(s,a[i],`${r}.${i}`,n)}}}function ft(t,e="",r={}){if(!t||typeof t!="object")return r;if(t.relations&&e&&(r[e]=t.relations),t.type==="object"&&t.properties&&Object.entries(t.properties).forEach(([n,o])=>{let a=e?`${e}.${n}`:n;ft(o,a,r)}),t.type==="array"&&t.items){let n=`${e}[]`;ft(t.items,n,r)}return r}var Jt=ft(ze,""),Kt=ze,Qr={"colors.primary":{widget:"input-color"},"colors.secondary":{widget:"input-color"},"colors.accent":{widget:"input-color"},"colors.background":{widget:"input-color"},"colors.success":{widget:"input-color"},"colors.warning":{widget:"input-color"},"colors.danger":{widget:"input-color"},"colors.info":{widget:"input-color"},"colors.gradientStops":{min:2,max:8,step:1,widget:"range"},"colors.elevationOpacity":{min:0,max:1,step:.01,widget:"range"},"colors.darkMode.background":{widget:"input-color"},"colors.darkMode.primary":{widget:"input-color"},"colors.darkMode.secondary":{widget:"input-color"},"colors.darkMode.accent":{widget:"input-color"},description:{widget:"textarea",maxLength:500,rows:4,placeholder:"Summarize the visual and interaction intent"},"typography.fontFamilyHeadings":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Heading font stack"},"typography.fontFamilyBody":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Body font stack"},"typography.fontFamilyMono":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Monospace font stack"},"typography.baseFontSize":{min:8,max:32,step:1,widget:"input-range"},"typography.fontScale":{min:1,max:2,step:.01,widget:"range"},"typography.fontWeightLight":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightNormal":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightMedium":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightSemibold":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightBold":{min:100,max:800,step:100,widget:"input-range"},"typography.lineHeightTight":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightNormal":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightRelaxed":{min:.75,max:3,step:.001,widget:"input-range"},"typography.letterSpacingTight":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingNormal":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingWide":{min:-.1,max:.1,step:.001,widget:"range"},"spatialRhythm.baseUnit":{min:1,max:16,step:1,widget:"range"},"spatialRhythm.scaleRatio":{min:1,max:2,step:.01,widget:"range"},"spatialRhythm.maxSpacingSteps":{min:4,max:64,step:1,widget:"range"},"spatialRhythm.containerPadding":{min:0,max:8,step:.05,widget:"range"},"spatialRhythm.inputPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.buttonPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.sectionSpacing":{min:0,max:8,step:.05,widget:"range"},"shape.radiusSize":{oneOf:Object.entries(y.RadiusSizes).map(([t,e])=>({const:e,title:t}))},"shape.borderWidth":{widget:"select",oneOf:Object.entries(y.BorderWidths).map(([t,e])=>({const:e,title:t}))},"shape.customRadius":{min:0,max:64,step:1,widget:"range"},"behavior.transitionSpeed":{oneOf:Object.entries(y.TransitionSpeeds).map(([t,e])=>({const:e,title:t}))},"behavior.animationEasing":{enum:Object.values(y.AnimationEasings)},"behavior.customTransitionSpeed":{min:0,max:1e3,step:10,widget:"range"},"behavior.focusRingWidth":{min:0,max:8,step:1,widget:"range"},"behavior.focusRingOpacity":{min:0,max:1,step:.01,widget:"range"},"behavior.hoverOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.gridColumns":{min:1,max:24,step:1,widget:"range"},"layout.gridGutter":{min:0,max:8,step:.05,widget:"range"},"layout.maxWidth":{widget:"input-text",placeholder:"e.g. 1200 or 1200px"},"layout.maxWidths.sm":{widget:"input-text",placeholder:"e.g. 640 or 640px"},"layout.maxWidths.md":{widget:"input-text",placeholder:"e.g. 768 or 768px"},"layout.maxWidths.lg":{widget:"input-text",placeholder:"e.g. 1024 or 1024px"},"layout.maxWidths.xl":{widget:"input-text",placeholder:"e.g. 1280 or 1280px"},"layout.containerMaxWidth":{widget:"input-text",placeholder:"e.g. 1400px"},"layout.containerPadding":{widget:"input-text",placeholder:"e.g. var(--spacing-6)"},"layout.breakpoints.sm":{min:320,max:2560,step:1,widget:"input-number"},"layout.breakpoints.md":{min:480,max:3200,step:1,widget:"input-number"},"layout.breakpoints.lg":{min:640,max:3840,step:1,widget:"input-number"},"layout.breakpoints.xl":{min:768,max:5120,step:1,widget:"input-number"},"layout.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.densityCompact":{min:.5,max:2,step:.05,widget:"range"},"layout.densityNormal":{min:.5,max:2,step:.05,widget:"range"},"layout.densityComfortable":{min:.5,max:2,step:.05,widget:"range"},"layout.buttonMinHeight":{min:24,max:96,step:1,widget:"range"},"layout.inputMinHeight":{min:24,max:96,step:1,widget:"range"},"layers.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layers.shadowBlurMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.shadowOffsetMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.blurLight":{min:0,max:48,step:1,widget:"range"},"layers.blurMedium":{min:0,max:64,step:1,widget:"range"},"layers.blurHeavy":{min:0,max:96,step:1,widget:"range"},"layers.baseZIndex":{min:0,max:1e4,step:10,widget:"range"},"layers.zIndexStep":{min:1,max:100,step:1,widget:"range"},"layers.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"advanced.linkStyle":{enum:Object.values(y.LinkStyles)},"a11y.minTouchTarget":{oneOf:Object.entries(y.TouchTargetSizes).map(([t,e])=>({const:e,title:t}))},"a11y.focusStyle":{enum:Object.values(y.FocusStyles)},"icons.defaultSize":{min:8,max:128,step:1,widget:"range",icon:"sparkle"}};function Ut(t=[]){return t.join(".")}function qt(t=[]){return`/${t.join("/")}`}function Xr(t,e=[]){if(!(!t||typeof t!="object"))return e.reduce((r,n)=>{if(r!=null&&typeof r=="object")return r[n]},t)}function Gt(t,e,r=[]){if(t!=null)return t;let n=Xr(e,r);return n??void 0}function Me(t=""){return String(t).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/^./,e=>e.toUpperCase())}function Zt(t,e){if(!t)return"string";let r=t.type||"string";if(Array.isArray(r)){let n=Ce(e);return n!=="undefined"&&r.includes(n)?n:r.includes("string")?"string":r.find(o=>o!=="null")||r[0]||"string"}return r}function mt(t,e,r=[]){return!t||!e||!Array.isArray(r)||r.forEach(n=>{e[n]!==void 0&&(t[n]=e[n])}),t}function Vt(t,e){return Array.isArray(e?.oneOf)&&e.oneOf.length?e.oneOf:Array.isArray(e?.enum)&&e.enum.length?e.enum.map(r=>({const:r,title:Me(r)})):Array.isArray(t?.oneOf)&&t.oneOf.length?t.oneOf:Array.isArray(t?.enum)&&t.enum.length?t.enum.map(r=>({const:r,title:Me(r)})):null}function en(t){return t&&(t==="range"?"input-range":t)}function tn(t,e){if(!Array.isArray(e)||!e.length)return t;let r=new Set;for(let n of e)!n||n.const===void 0||r.add(Ce(n.const));if(!r.size)return t;if(r.size===1){let n=Array.from(r)[0];if(n==="number")return"number";if(n==="string")return"string";if(n==="boolean")return"boolean"}return t}function Yt(t,e,r){let n=Zt(e,r),o=t.toLowerCase(),a={label:Me(t.split(".").slice(-1)[0]||t)};n==="boolean"&&(a.widget="toggle"),n==="number"&&(a.widget="range",o.includes("opacity")?(a.min=0,a.max=1,a.step=.01):o.includes("lineheight")?(a.min=.75,a.max=3,a.step=.001,a.widget="input-range"):o.includes("fontweight")?(a.min=100,a.max=800,a.step=100,a.widget="input-range"):o.endsWith("basefontsize")?(a.min=8,a.max=32,a.step=1,a.widget="input-range"):o.includes("scale")||o.includes("ratio")?(a.min=1,a.max=2,a.step=.01):(a.min=0,a.max=Math.max(10,Number.isFinite(Number(r))?Number(r)*4:100),a.step=1)),n==="string"&&t.startsWith("colors.")&&(a.widget="input-color"),n==="string"&&o==="description"&&(a.widget="textarea",a.maxLength=500,a.rows=4);let i=Qr[t]||{},s={...a,...i};return s.widget&&(s.widget=en(s.widget)),s}function Qt(t,e,r,n,o,a){if(!t||typeof t!="object")return null;let i=Gt(e,a,r),s=Zt(t,i);if(s==="object"&&t.properties){let f={type:"object",properties:{}};r.length>0&&(f.title=Me(r[r.length-1]));let k={};for(let[v,S]of Object.entries(t.properties)){let R=e&&typeof e=="object"&&!Array.isArray(e)?e[v]:void 0,$=Qt(S,R,[...r,v],n,o,a);$&&(f.properties[v]=$.schema,$.hasValue&&(k[v]=$.value))}return Object.keys(f.properties).length?{schema:f,value:k,hasValue:Object.keys(k).length>0}:null}if(s==="array"){let f=Ut(r),k=Yt(f,t,e);o[f]=k;let v=Gt(e,a,r),S=t.items?.type||"string",R=Array.isArray(S)?S[0]:S,$={type:R},L=Vt(t?.items,null);if(L&&($.oneOf=L),R==="string"&&Array.isArray(v)&&v.length>0){let C=v.find(x=>typeof x=="string"&&x.trim().length>0);C&&($.examples=[C])}mt($,t?.items,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","minItems","maxItems","uniqueItems","description","default"]);let P={type:"array",items:$};mt(P,t,["minItems","maxItems","uniqueItems","description","default"]);let E=qt(r),A={},N=Array.isArray($.oneOf)&&$.oneOf.length>0;if(R==="string"&&N&&(A["ui:widget"]=P.maxItems===1?"radio":"checkbox-group"),R==="string"&&Array.isArray(v)&&v.length>0){let C=v.filter(x=>typeof x=="string"&&x.trim().length>0).slice(0,5).join(", ");C&&(A["ui:placeholder"]=C)}return Object.keys(A).length&&(n[E]={...n[E]||{},...A}),{schema:P,value:Array.isArray(e)?e:[],hasValue:Array.isArray(e)}}let p=Ut(r),d=Yt(p,t,i);o[p]=d;let c=Vt(t,d),g={type:tn(s==="null"?"string":s,c),title:d.label||Me(r[r.length-1]||p)};c&&(g.oneOf=c),mt(g,t,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","description","default"]),typeof d.maxLength=="number"&&g.maxLength===void 0&&(g.maxLength=d.maxLength),(g.type==="number"||g.type==="integer")&&typeof d.min=="number"&&g.minimum===void 0&&(g.minimum=d.min),(g.type==="number"||g.type==="integer")&&typeof d.max=="number"&&g.maximum===void 0&&(g.maximum=d.max),(g.type==="number"||g.type==="integer")&&typeof d.step=="number"&&g.multipleOf===void 0&&(g.multipleOf=d.step);let m=i;m!==void 0&&(g.examples=[m]);let b=qt(r),h={};return d.widget&&(h["ui:widget"]=d.widget),d.icon&&(h["ui:icon"]=d.icon),typeof d.min=="number"&&(h["ui:min"]=d.min),typeof d.max=="number"&&(h["ui:max"]=d.max),typeof d.step=="number"&&(h["ui:step"]=d.step),d.placeholder&&(h["ui:placeholder"]=d.placeholder),typeof d.rows=="number"&&(h["ui:options"]={...h["ui:options"]||{},rows:d.rows}),d.widget==="input-range"&&m!==void 0&&(h["ui:allowUnset"]=!0),(typeof d.min=="number"||typeof d.max=="number"||typeof d.step=="number")&&(h["ui:options"]={...h["ui:options"]||{},...typeof d.min=="number"?{min:d.min}:{},...typeof d.max=="number"?{max:d.max}:{},...typeof d.step=="number"?{step:d.step}:{}}),Object.keys(h).length&&(n[b]=h),{schema:g,value:e,hasValue:e!==void 0}}function ue(t={}){let e={},r={"/colors":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}},"/colors/darkMode":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}}},n=K?.default&&typeof K.default=="object"?K.default:null,o=Qt(ze,t,[],r,e,n);return{schema:o?.schema||{type:"object",properties:{}},uiSchema:r,values:o?.value||{},metadata:e}}function Ee(t={}){return ue(t).metadata}function ht(t,{log:e,context:r="PDS config"}={}){if(!t||typeof t!="object")return[];let n=[];return Be(t,ze,"design",n),n.length&&typeof e=="function"&&n.forEach(o=>{e("warn",`[${r}] ${o.message} at ${o.path}`)}),n}function bt(t,{log:e,context:r="PDS config"}={}){if(!t||typeof t!="object")return[];let n=[];return Be(t,Kr,"config",n),n.length&&typeof e=="function"&&n.forEach(o=>{e("warn",`[${r}] ${o.message} at ${o.path}`)}),n}var K={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:y.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.318,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:y.RadiusSizes.xlarge,borderWidth:y.BorderWidths.medium},behavior:{transitionSpeed:y.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],themes:["light"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:y.RadiusSizes.none,borderWidth:y.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:y.RadiusSizes.xxlarge,borderWidth:y.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:y.RadiusSizes.none,borderWidth:y.BorderWidths.thick},behavior:{transitionSpeed:y.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.3,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.3},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.thick},behavior:{transitionSpeed:y.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",themes:["light"],description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:y.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:y.RadiusSizes.xxlarge,borderWidth:y.BorderWidths.thin},behavior:{transitionSpeed:y.TransitionSpeeds.slow,animationEasing:y.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0c0c0c",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:y.RadiusSizes.none,borderWidth:y.BorderWidths.thick},behavior:{transitionSpeed:y.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.35,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:y.RadiusSizes.large,borderWidth:y.BorderWidths.medium},behavior:{transitionSpeed:y.TransitionSpeeds.normal,animationEasing:y.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c",primary:"#0a4ca4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:y.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:y.RadiusSizes.large,borderWidth:y.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:y.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:y.TransitionSpeeds.normal,animationEasing:y.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",info:"#0e7490",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#06c167"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.medium},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:y.TouchTargetSizes.comfortable,focusStyle:y.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:2.5},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:y.TouchTargetSizes.standard,focusStyle:y.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:y.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:1.5},shape:{radiusSize:y.RadiusSizes.medium,borderWidth:y.BorderWidths.thin},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:y.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:y.RadiusSizes.small,borderWidth:y.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:y.TransitionSpeeds.fast,animationEasing:y.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};K.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!1,backgroundMesh:0},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0,colorInput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:y.FontWeights.light,fontWeightNormal:y.FontWeights.normal,fontWeightMedium:y.FontWeights.medium,fontWeightSemibold:y.FontWeights.semibold,fontWeightBold:y.FontWeights.bold,lineHeightTight:y.LineHeights.tight,lineHeightNormal:y.LineHeights.normal,lineHeightRelaxed:y.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:y.RadiusSizes.large,borderWidth:y.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:y.TransitionSpeeds.normal,animationEasing:y.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:30,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:y.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:y.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:y.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:y.IconSizes,include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"/assets/pds/icons/pds-icons.svg"},debug:!1};var Xt=Ee(K.default),er=ue(K.default);function yt(t="log",e,...r){if(this?.debug||this?.design?.debug||!1||t==="error"||t==="warn"){let o=console[t]||console.log;r.length>0?o(e,...r):o(e)}}$e();vt();var V=class t{static#m;static get instance(){return this.#m}#e;#o;constructor(e={}){this.options={debug:!1,...e},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),t.#m=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#Se(),typeof CSSStyleSheet<"u"?this.#Ee():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let e=this.options.design||{},r=this.#z(e),n=e.layers||{},o=this.#h(n,r.light),a=this.#C(o),i=r.dark!=null?this.#C(this.#h(n,r.dark)):null;return{colors:this.#E(e.colors||{},r),spacing:this.generateSpacingTokens(e.spatialRhythm||{}),radius:this.#O(e.shape||{}),borderWidths:this.#_(e.shape||{}),typography:this.generateTypographyTokens(e.typography||{}),shadows:a,darkShadows:i,layout:this.#D(e.layout||{}),transitions:this.#W(e.behavior||{}),zIndex:this.#H(e.layers||{}),icons:this.#U(e.icons||{})}}#z(e={}){let r=e.layout||{},n=e.layers||{};return{light:this.#f(r.baseShadowOpacity??n.baseShadowOpacity),dark:this.#f(r.darkMode?.baseShadowOpacity??n.darkMode?.baseShadowOpacity)}}#f(e){let r=Number(e);if(Number.isFinite(r))return Math.min(Math.max(r,0),1)}#h(e={},r){let n={...e};return r!=null&&(n.baseShadowOpacity=r),n}#E(e,r={}){let{primary:n="#3b82f6",secondary:o="#64748b",accent:a="#ec4899",background:i="#ffffff",success:s=null,warning:p="#FFBF00",danger:d=null,info:c=null,darkMode:l={}}=e,u={primary:this.#r(n),secondary:this.#r(o),accent:this.#r(a),success:this.#r(s||this.#T(n)),warning:this.#r(p||a),danger:this.#r(d||this.#A(n)),info:this.#r(c||n),gray:this.#b(o),surface:this.#y(i)};return u.surface.fieldset=this.#L(u.surface),u.surfaceSmart=this.#S(u.surface,r),u.dark=this.#F(u,i,l),u.dark&&u.dark.surface&&(u.dark.surfaceSmart=this.#S(u.dark.surface,r)),u.interactive={light:{fill:this.#k(u.primary,4.5),text:u.primary[600]},dark:{fill:this.#k(u.dark.primary,4.5),text:this.#j(u.dark.primary,u.dark.surface.base,4.5)}},u}#r(e){let r=this.#a(e);return{50:this.#t(r.h,Math.max(r.s-10,10),Math.min(r.l+45,95)),100:this.#t(r.h,Math.max(r.s-5,15),Math.min(r.l+35,90)),200:this.#t(r.h,r.s,Math.min(r.l+25,85)),300:this.#t(r.h,r.s,Math.min(r.l+15,75)),400:this.#t(r.h,r.s,Math.min(r.l+5,65)),500:e,600:this.#t(r.h,r.s,Math.max(r.l-10,25)),700:this.#t(r.h,r.s,Math.max(r.l-20,20)),800:this.#t(r.h,r.s,Math.max(r.l-30,15)),900:this.#t(r.h,r.s,Math.max(r.l-40,10))}}#T(e){let r=this.#a(e);return this.#t(120,Math.max(r.s,60),45)}#A(e){let r=this.#a(e);return this.#t(0,Math.max(r.s,70),50)}#b(e){let r=this.#a(e),n=r.h,o=Math.min(r.s,10);return{50:this.#t(n,o,98),100:this.#t(n,o,95),200:this.#t(n,o,88),300:this.#t(n,o,78),400:this.#t(n,o,60),500:e,600:this.#t(n,Math.min(o+5,15),45),700:this.#t(n,Math.min(o+8,18),35),800:this.#t(n,Math.min(o+10,20),20),900:this.#t(n,Math.min(o+12,22),10)}}#y(e){let r=this.#a(e);return{base:e,subtle:this.#t(r.h,Math.max(r.s,2),Math.max(r.l-2,2)),elevated:this.#t(r.h,Math.max(r.s,3),Math.max(r.l-4,5)),sunken:this.#t(r.h,Math.max(r.s,4),Math.max(r.l-6,8)),overlay:this.#t(r.h,Math.max(r.s,2),Math.min(r.l+2,98)),inverse:this.#v(e),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#L(e){return{base:e.subtle,subtle:e.elevated,elevated:e.sunken,sunken:this.#R(e.sunken,.05),overlay:e.elevated}}#R(e,r=.05){let n=this.#a(e),o=Math.max(n.l-n.l*r,5);return this.#t(n.h,n.s,o)}#v(e){let r=this.#a(e);if(r.l>50){let n=Math.min(r.s+5,25),o=Math.max(12-(r.l-50)*.1,8);return this.#t(r.h,n,o)}else{let n=Math.max(r.s-10,5),o=Math.min(85+(50-r.l)*.3,95);return this.#t(r.h,n,o)}}#F(e,r="#ffffff",n={}){let o=n.background?n.background:this.#v(r),a=this.#y(o),i=n.primary?this.#r(n.primary):this.#i(e.primary);return{surface:{...a,fieldset:this.#N(a)},primary:i,secondary:n.secondary?this.#r(n.secondary):this.#i(e.secondary),accent:n.accent?this.#r(n.accent):this.#i(e.accent),gray:n.secondary?this.#b(n.secondary):e.gray,success:this.#i(e.success),info:this.#i(e.info),warning:this.#i(e.warning),danger:this.#i(e.danger)}}#c(e){let r=String(e||"").replace("#",""),n=r.length===3?r.split("").map(a=>a+a).join(""):r,o=parseInt(n,16);return{r:o>>16&255,g:o>>8&255,b:o&255}}#p(e){let{r,g:n,b:o}=this.#c(e),a=[r/255,n/255,o/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*a[0]+.7152*a[1]+.0722*a[2]}#d(e,r){let n=this.#p(e),o=this.#p(r),a=Math.max(n,o),i=Math.min(n,o);return(a+.05)/(i+.05)}#x(e,r=4.5){if(!e)return"#000000";let n="#ffffff",o="#000000",a=this.#d(e,n);if(a>=r)return n;let i=this.#d(e,o);return i>=r||i>a?o:n}#w(e,r=1){let{r:n,g:o,b:a}=this.#c(e);return`rgba(${n}, ${o}, ${a}, ${r})`}#P(e,r,n=.5){let o=this.#c(e),a=this.#c(r),i=Math.round(o.r+(a.r-o.r)*n),s=Math.round(o.g+(a.g-o.g)*n),p=Math.round(o.b+(a.b-o.b)*n);return this.#I(i,s,p)}#I(e,r,n){let o=a=>{let i=Math.max(0,Math.min(255,Math.round(a))).toString(16);return i.length===1?"0"+i:i};return`#${o(e)}${o(r)}${o(n)}`}#N(e){return{base:e.elevated,subtle:e.overlay,elevated:this.#$(e.elevated,.08),sunken:e.elevated,overlay:this.#$(e.overlay,.05)}}#j(e={},r="#000000",n=4.5){let o=["600","700","800","500","400","900","300","200"],a={shade:null,color:null,ratio:0};for(let i of o){let s=e?.[i];if(!s||typeof s!="string")continue;let p=this.#d(s,r);if(p>a.ratio&&(a={shade:i,color:s,ratio:p}),p>=n)return s}return a.color||e?.["600"]||e?.["500"]}#k(e={},r=4.5){let n=["600","700","800","500","400","900"],o={shade:null,color:null,ratio:0};for(let a of n){let i=e?.[a];if(!i||typeof i!="string")continue;let s=this.#d(i,"#ffffff");if(s>o.ratio&&(o={shade:a,color:i,ratio:s}),s>=r)return i}return o.color||e?.["600"]||e?.["500"]}#S(e,r={}){let n={},o=r.light??.1,a=r.dark??.25;return Object.entries(e).forEach(([i,s])=>{if(!s||typeof s!="string"||!s.startsWith("#"))return;let p=this.#p(s)<.5,d=this.#x(s,4.5),c=this.#x(s,3),l=this.#P(d,s,.4),u=d,g=l,m=p?"#ffffff":"#000000",b=p?a:o,h=this.#w(m,b),f=p?"#ffffff":"#000000",k=p?.15:.1,v=this.#w(f,k);n[i]={bg:s,text:d,textSecondary:c,textMuted:l,icon:u,iconSubtle:g,shadow:h,border:v,scheme:p?"dark":"light"}}),n}#$(e,r=.05){let n=this.#a(e),o=Math.min(n.l+(100-n.l)*r,95);return this.#t(n.h,n.s,o)}#i(e){let r={};return Object.entries({50:{source:"900",dimFactor:.8},100:{source:"800",dimFactor:.8},200:{source:"700",dimFactor:.8},300:{source:"600",dimFactor:.8},400:{source:"500",dimFactor:.85},500:{source:"400",dimFactor:.85},600:{source:"300",dimFactor:.85},700:{source:"200",dimFactor:.85},800:{source:"100",dimFactor:.95},900:{source:"50",dimFactor:.95}}).forEach(([o,a])=>{let i=e[a.source];r[o]=this.#B(i,a.dimFactor)}),r}#B(e,r=.8){let n=this.#a(e),o=Math.max(n.s*r,5),a=Math.max(n.l*r,5);return this.#t(n.h,o,a)}generateSpacingTokens(e){let{baseUnit:r=4,scaleRatio:n=1.25,maxSpacingSteps:o=12}=e,a=Number.isFinite(Number(r))?Number(r):4,i=Math.min(Number.isFinite(Number(o))?Number(o):12,12),s={0:"0"};for(let p=1;p<=i;p++)s[p]=`${a*p}px`;return s}#O(e){let{radiusSize:r="medium",customRadius:n=null}=e,o;n!=null?o=n:typeof r=="number"?o=r:typeof r=="string"?o=y.RadiusSizes[r]??y.RadiusSizes.medium:o=y.RadiusSizes.medium;let a=Number.isFinite(Number(o))?Number(o):y.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(a*.25)?Math.round(a*.25):0}px`,sm:`${Number.isFinite(a*.5)?Math.round(a*.5):0}px`,md:`${a}px`,lg:`${Number.isFinite(a*1.5)?Math.round(a*1.5):0}px`,xl:`${Number.isFinite(a*2)?Math.round(a*2):0}px`,full:"9999px"}}#_(e){let{borderWidth:r="medium"}=e,n;typeof r=="number"?n=r:typeof r=="string"?n=y.BorderWidths[r]??y.BorderWidths.medium:n=y.BorderWidths.medium;let o=Number.isFinite(Number(n))?Number(n):y.BorderWidths.medium,a=i=>`${Math.max(1,Math.ceil(i))}px`;return{hairline:a(o*.25),thin:a(o*.5),medium:a(o),thick:a(o*1.5)}}generateTypographyTokens(e){let{fontFamilyHeadings:r="system-ui, -apple-system, sans-serif",fontFamilyBody:n="system-ui, -apple-system, sans-serif",fontFamilyMono:o='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:a=16,fontScale:i=1.25,fontWeightLight:s=y.FontWeights.light,fontWeightNormal:p=y.FontWeights.normal,fontWeightMedium:d=y.FontWeights.medium,fontWeightSemibold:c=y.FontWeights.semibold,fontWeightBold:l=y.FontWeights.bold,lineHeightTight:u=y.LineHeights.tight,lineHeightNormal:g=y.LineHeights.normal,lineHeightRelaxed:m=y.LineHeights.relaxed}=e,b=Number.isFinite(Number(a))?Number(a):16,h=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:r,body:n,mono:o},fontSize:{xs:`${Math.round(b/Math.pow(h,2))}px`,sm:`${Math.round(b/h)}px`,base:`${b}px`,lg:`${Math.round(b*h)}px`,xl:`${Math.round(b*Math.pow(h,2))}px`,"2xl":`${Math.round(b*Math.pow(h,3))}px`,"3xl":`${Math.round(b*Math.pow(h,4))}px`,"4xl":`${Math.round(b*Math.pow(h,5))}px`},fontWeight:{light:s?.toString()||"300",normal:p?.toString()||"400",medium:d?.toString()||"500",semibold:c?.toString()||"600",bold:l?.toString()||"700"},lineHeight:{tight:u?.toString()||"1.25",normal:g?.toString()||"1.5",relaxed:m?.toString()||"1.75"}}}#C(e){let{baseShadowOpacity:r=.1,shadowBlurMultiplier:n=1,shadowOffsetMultiplier:o=1}=e,a=`rgba(0, 0, 0, ${r})`,i=`rgba(0, 0, 0, ${r*.5})`;return{sm:`0 ${1*o}px ${2*n}px 0 ${i}`,base:`0 ${1*o}px ${3*n}px 0 ${a}, 0 ${1*o}px ${2*n}px 0 ${i}`,md:`0 ${4*o}px ${6*n}px ${-1*o}px ${a}, 0 ${2*o}px ${4*n}px ${-1*o}px ${i}`,lg:`0 ${10*o}px ${15*n}px ${-3*o}px ${a}, 0 ${4*o}px ${6*n}px ${-2*o}px ${i}`,xl:`0 ${20*o}px ${25*n}px ${-5*o}px ${a}, 0 ${10*o}px ${10*n}px ${-5*o}px ${i}`,inner:`inset 0 ${2*o}px ${4*n}px 0 ${i}`}}#D(e){let{containerPadding:r=16,breakpoints:n={sm:640,md:768,lg:1024,xl:1280}}=e,o=this.#u(e,"maxWidth"),a=e.maxWidth,i=this.#M(e,{emitFallbacks:!1});return{maxWidth:o?this.#n(a,"1200px"):void 0,maxWidthSm:i.sm,maxWidthMd:i.md,maxWidthLg:i.lg,maxWidthXl:i.xl,minHeight:"100vh",containerPadding:this.#n(r,"16px"),breakpoints:{sm:this.#n(n.sm,"640px"),md:this.#n(n.md,"768px"),lg:this.#n(n.lg,"1024px"),xl:this.#n(n.xl,"1280px")},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#M(e={},r={}){let{emitFallbacks:n=!0}=r,o={sm:640,md:768,lg:1024,xl:1280},{maxWidths:a={},containerPadding:i=16,breakpoints:s=o}=e||{},p=this.#u(e,"maxWidth"),d=["sm","md","lg","xl"].some(h=>this.#u(a,h));if(!n&&!p&&!d)return{sm:void 0,md:void 0,lg:void 0,xl:void 0};let c=e?.maxWidth,l=this.#s(i,16),u=this.#s(c,o.xl),g={sm:this.#s(s.sm,o.sm),md:this.#s(s.md,o.md),lg:this.#s(s.lg,o.lg),xl:this.#s(s.xl,o.xl)},m=h=>h?Math.max(320,h-l*2):u,b={sm:Math.min(u,m(g.sm)),md:Math.min(u,m(g.md)),lg:Math.min(u,m(g.lg)),xl:Math.max(320,u)};return{sm:this.#n(a.sm,`${b.sm}px`),md:this.#n(a.md,`${b.md}px`),lg:this.#n(a.lg,`${b.lg}px`),xl:this.#n(a.xl,`${b.xl}px`)}}#u(e,r){if(!e||typeof e!="object"||!Object.prototype.hasOwnProperty.call(e,r))return!1;let n=e[r];return!(n==null||typeof n=="string"&&n.trim().length===0)}#n(e,r){return typeof e=="number"&&Number.isFinite(e)?`${e}px`:typeof e=="string"&&e.trim().length>0?e:r}#s(e,r){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let n=parseFloat(e);if(Number.isFinite(n))return n}return r}#W(e){let{transitionSpeed:r=y.TransitionSpeeds.normal,animationEasing:n=y.AnimationEasings["ease-out"]}=e,o;return typeof r=="number"?o=r:typeof r=="string"&&y.TransitionSpeeds[r]?o=y.TransitionSpeeds[r]:o=y.TransitionSpeeds.normal,{fast:`${Math.round(o*.6)}ms`,normal:`${o}ms`,slow:`${Math.round(o*1.4)}ms`}}#H(e){let{baseZIndex:r=1e3,zIndexStep:n=10}=e;return{dropdown:r.toString(),sticky:(r+n*2).toString(),fixed:(r+n*3).toString(),modal:(r+n*4).toString(),drawer:(r+n*5).toString(),popover:(r+n*6).toString(),tooltip:(r+n*7).toString(),notification:(r+n*8).toString()}}#U(e){let{set:r="phosphor",weight:n="regular",defaultSize:o=24,sizes:a={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:s="/assets/img/icons/"}=e;return{set:r,weight:n,defaultSize:`${o}px`,sizes:Object.fromEntries(Object.entries(a).map(([p,d])=>[p,`${d}px`])),spritePath:i,externalPath:s}}#q(e){let r=[];r.push(`  /* Colors */
`);let n=(o,a="")=>{Object.entries(o).forEach(([i,s])=>{typeof s=="object"&&s!==null?n(s,`${a}${i}-`):typeof s=="string"&&r.push(`  --color-${a}${i}: ${s};
`)})};return Object.entries(e).forEach(([o,a])=>{o!=="dark"&&o!=="surfaceSmart"&&o!=="interactive"&&typeof a=="object"&&a!==null&&n(a,`${o}-`)}),e.surfaceSmart&&(r.push(`  /* Smart Surface Tokens (context-aware) */
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
`),r.push(`  --color-text-muted: var(--color-gray-600);
`),r.push(`  --color-border: var(--color-gray-300);
`),r.push(`  --color-input-bg: var(--color-surface-base);
`),r.push(`  --color-input-disabled-bg: var(--color-gray-50);
`),r.push(`  --color-input-disabled-text: var(--color-gray-500);
`),r.push(`  --color-code-bg: var(--color-gray-100);
`),e.interactive&&e.interactive.light&&(r.push(`  /* Interactive Colors - optimized for specific use cases */
`),r.push(`  --color-primary-fill: ${e.interactive.light.fill}; /* For button backgrounds with white text */
`),r.push(`  --color-primary-text: ${e.interactive.light.text}; /* For links and outline buttons on light surfaces */
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
    `),r.push(this.#G(e)),`${r.join("")}
`}#G(e){let r=e.primary?.[500]||"#3b82f6",n=e.secondary?.[500]||"#8b5cf6",o=e.accent?.[500]||"#f59e0b";return`
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
    `}#V(e){let r=[`  /* Spacing */
`];return Object.entries(e).forEach(([n,o])=>{n!=null&&n!=="NaN"&&o!==void 0&&!o.includes("NaN")&&r.push(`  --spacing-${n}: ${o};
`)}),`${r.join("")}
`}#Y(e){let r=[`  /* Border Radius */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --radius-${n}: ${o};
`)}),`${r.join("")}
`}#J(e){let r=[`  /* Border Widths */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --border-width-${n}: ${o};
`)}),`${r.join("")}
`}#K(e){let r=[`  /* Typography */
`];return Object.entries(e).forEach(([n,o])=>{let a=n.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(o).forEach(([i,s])=>{let p=i.replace(/([A-Z])/g,"-$1").toLowerCase();r.push(`  --font-${a}-${p}: ${s};
`)})}),`${r.join("")}
`}#g(e){let r=[`  /* Shadows */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --shadow-${n}: ${o};
`)}),`${r.join("")}
`}#Z(e){let r=[`  /* Layout */
`];return Object.entries(e).forEach(([n,o])=>{let a=n.replace(/([A-Z])/g,"-$1").toLowerCase();o!=null&&n!=="breakpoints"&&r.push(`  --layout-${a}: ${o};
`)}),`${r.join("")}
`}#Q(e){let r=[`  /* Transitions */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --transition-${n}: ${o};
`)}),`${r.join("")}
`}#X(e){let r=[`  /* Z-Index */
`];return Object.entries(e).forEach(([n,o])=>{r.push(`  --z-${n}: ${o};
`)}),`${r.join("")}
`}#ee(e){let r=[`  /* Icon System */
`];return r.push(`  --icon-set: ${e.set};
`),r.push(`  --icon-weight: ${e.weight};
`),r.push(`  --icon-size: ${e.defaultSize};
`),Object.entries(e.sizes).forEach(([n,o])=>{r.push(`  --icon-size-${n}: ${o};
`)}),`${r.join("")}
`}#te(e,r){if(!e?.dark)return"";let n=[],o=(l,u="")=>{Object.entries(l).forEach(([g,m])=>{typeof m=="object"&&m!==null?o(m,`${u}${g}-`):typeof m=="string"&&n.push(`  --color-${u}${g}: ${m};
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
`,p=this.#oe(e),d=r?[this.#g(r)]:[];return`html[data-theme="dark"] {
${[...n,...a,...d,i,s,p].join("")}}
`}#re(e,r){if(!e?.dark)return"";let n=[],o=(u,g="")=>{Object.entries(u).forEach(([m,b])=>{typeof b=="object"&&b!==null?o(b,`${g}${m}-`):typeof b=="string"&&n.push(`    --color-${g}${m}: ${b};
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
`,d=this.#ne(e),c=r?[this.#g(r)]:[];return`
       html[data-theme="dark"] {
${[...n,...a,...c,s,p,d].join("")}       }
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
    `}#ae(){return`/* Callout dark mode adjustments */
html[data-theme="dark"] {
  .callout-success { background-color: var(--color-success-50); border-color: var(--color-success-500); color: var(--color-success-900); }
  .callout-info { background-color: var(--color-info-50); border-color: var(--color-info-500); color: var(--color-info-900); }
  .callout-warning { background-color: var(--color-warning-50); border-color: var(--color-warning-500); color: var(--color-warning-900); }
  .callout-danger, .callout-error { background-color: var(--color-danger-50); border-color: var(--color-danger-500); color: var(--color-danger-900); }
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

`}#de(){let{shape:e={},spatialRhythm:r={},inputPadding:n,buttonPadding:o,focusRingWidth:a,focusRingOpacity:i,borderWidthThin:s,sectionSpacing:p,buttonMinHeight:d,inputMinHeight:c}=this.options.design,l=typeof e.borderWidth=="number"?e.borderWidth:typeof e.borderWidth=="string"?y.BorderWidths[e.borderWidth]??null:null,u=r.inputPadding??n??.75,g=r.buttonPadding??o??1,m=a||3,b=s||l||y.BorderWidths.thin,h=r.sectionSpacing??p??2,f=d||30;return`/* Mobile-First Form Styles - Generated from Design Config */
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
  min-height: ${c||40}px;
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

label:has(input[type="checkbox"]):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"] + label:not(fieldset label):not(label[data-toggle]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: calc(${f}px * 0.75);
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
  box-shadow: 0 0 0 ${m}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
    min-height: calc(${f}px * 0.75);
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
    box-shadow: 0 0 0 ${m}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
  display: inline-flex;
  gap: var(--spacing-1);
  align-items: center;
  justify-content: center;
  min-height: ${f}px;
  padding: max(calc(var(--spacing-1) * ${g}), var(--spacing-2)) var(--spacing-6);
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

.btn-sm {
  padding: calc(max(calc(var(--spacing-1) * ${g}), var(--spacing-2)) * 0.85) calc(var(--spacing-6) * 0.8);
  font-size: var(--font-size-sm);
  min-height: calc(${f}px * 0.85);
}

.btn-xs {
  padding: calc(max(calc(var(--spacing-1) * ${g}), var(--spacing-2)) * 0.7) calc(var(--spacing-6) * 0.65);
  font-size: var(--font-size-xs);
  min-height: calc(${f}px * 0.7);
}


.btn-lg {
  padding: calc(max(calc(var(--spacing-1) * ${g}), var(--spacing-2)) * 1.15) calc(var(--spacing-6) * 1.35);
  font-size: var(--font-size-lg);
  min-height: calc(${f}px * 1.15);
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

`}#fe(){let{layout:e={},behavior:r={}}=this.options.design;return`/* ============================================================================
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

`}#ye(){let{layout:e={}}=this.options.design,r=e.buttonMinHeight||30;return`/* Icon System */

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
    min-width: ${r}px;
    width: ${r}px;
    height: ${r}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &.btn-sm.icon-only {
    min-width: calc(${r}px * 0.8);
    width: calc(${r}px * 0.8);
    height: calc(${r}px * 0.8);
  }

  &.btn-xs.icon-only {
    min-width: calc(${r}px * 0.6);
    width: calc(${r}px * 0.6);
    height: calc(${r}px * 0.6);
  }

  &.btn-lg.icon-only {
    min-width: calc(${r}px * 1.2);
    width: calc(${r}px * 1.2);
    height: calc(${r}px * 1.2);
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
`}#xe(){let{layout:e={}}=this.options.design,r=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280},n=e.gridSystem||{},o=n.columns||[1,2,3,4,6],a=n.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=this.#M(e),s=[`
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

`];for(let p of o)s.push(`.grid-cols-${p} { grid-template-columns: repeat(${p}, 1fr); }
`);s.push(`
/* Auto-fit grids (responsive) */
`);for(let[p,d]of Object.entries(a))s.push(`.grid-auto-${p} { grid-template-columns: repeat(auto-fit, minmax(${d}, 1fr)); }
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

`}#ke(){let{layout:e={},a11y:r={}}=this.options.design,n=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280},o=r.minTouchTarget||y.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

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

`}#a(e){let r=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,a=Math.max(r,n,o),i=Math.min(r,n,o),s,p,d=(a+i)/2;if(a===i)s=p=0;else{let c=a-i;switch(p=d>.5?c/(2-a-i):c/(a+i),a){case r:s=(n-o)/c+(n<o?6:0);break;case n:s=(o-r)/c+2;break;case o:s=(r-n)/c+4;break}s/=6}return{h:s*360,s:p*100,l:d*100}}#t(e,r,n){e=e/360,r=r/100,n=n/100;let o=(d,c,l)=>(l<0&&(l+=1),l>1&&(l-=1),l<1/6?d+(c-d)*6*l:l<1/2?c:l<2/3?d+(c-d)*(2/3-l)*6:d),a,i,s;if(r===0)a=i=s=n;else{let d=n<.5?n*(1+r):n+r-n*r,c=2*n-d;a=o(c,d,e+1/3),i=o(c,d,e),s=o(c,d,e-1/3)}let p=d=>{let c=Math.round(d*255).toString(16);return c.length===1?"0"+c:c};return`#${p(a)}${p(i)}${p(s)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#Se(){this.#e={tokens:this.#$e(),primitives:this.#Ce(),components:this.#Me(),utilities:this.#ze()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#$e(){let{colors:e,spacing:r,radius:n,borderWidths:o,typography:a,shadows:i,darkShadows:s,layout:p,transitions:d,zIndex:c,icons:l}=this.tokens,u=[`@layer tokens {
       :root {
          ${this.#q(e)}
          ${this.#V(r)}
          ${this.#Y(n)}
          ${this.#J(o)}
          ${this.#K(a)}
          ${this.#g(i)}
          ${this.#Z(p)}
          ${this.#Q(d)}
          ${this.#X(c)}
          ${this.#ee(l)}
       }
       ${this.#re(e,s)}
    }`];return u.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),u.push(this.#te(e,s)),u.join("")}#Ce(){let{advanced:e={},a11y:r={},layout:n={}}=this.options.design,o=e.tabSize||y.TabSizes.standard,a=r.minTouchTarget||y.TouchTargetSizes.standard,i=n.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
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

`}#Me(){return`@layer components {

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
`}#ze(){return`@layer utilities {

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
`}#Ee(){this.#o={tokens:new CSSStyleSheet,primitives:new CSSStyleSheet,components:new CSSStyleSheet,utilities:new CSSStyleSheet},this.#Te()}#Te(){this.#o.tokens.replaceSync(this.#e.tokens),this.#o.primitives.replaceSync(this.#e.primitives),this.#o.components.replaceSync(this.#e.components),this.#o.utilities.replaceSync(this.#e.utilities)}get tokensCSS(){return this.#e?.tokens||""}get primitivesCSS(){return this.#e?.primitives||""}get componentsCSS(){return this.#e?.components||""}get utilitiesCSS(){return this.#e?.utilities||""}get layeredCSS(){return this.#e?`${this.#e.tokens}
${this.#e.primitives}
${this.#e.components}
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof H<"u"?H:null,enums:typeof y<"u"?y:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let e=[],r=this.tokens.colors;for(let[n,o]of Object.entries(r))typeof o=="object"&&o!==null&&e.push({name:n,scale:o});return e},getColorScale:e=>this.tokens.colors[e]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([e,r])=>({key:e,value:r})),getTypography:()=>this.tokens.typography,getLayerCSS:e=>{let r=["tokens","primitives","components","utilities"];if(!r.includes(e))throw new Error(`Invalid layer: ${e}. Must be one of ${r.join(", ")}`);return this.#e?.[e]||""},usesEnumValue:(e,r)=>{let n=this.options.design||{};return JSON.stringify(n).includes(r)}}}}get tokensStylesheet(){return this.#o?.tokens}get primitivesStylesheet(){return this.#o?.primitives}get componentsStylesheet(){return this.#o?.components}get utilitiesStylesheet(){return this.#o?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#l("tokens",this.#e.tokens),"pds-primitives.css.js":this.#l("primitives",this.#e.primitives),"pds-components.css.js":this.#l("components",this.#e.components),"pds-utilities.css.js":this.#l("utilities",this.#e.utilities),"pds-styles.css.js":this.#l("styles",this.layeredCSS)}}#l(e,r){let n=r.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${e}
// Auto-generated - do not edit directly

export const ${e} = new CSSStyleSheet();
${e}.replaceSync(\`${n}\`);

export const ${e}CSS = \`${n}\`;
`}};function nr(t={},e={}){let r=Number(e.minContrast||4.5),n=Number(e.minMutedContrast||3),o=!!e.extendedChecks,a=d=>{let c=String(d||"").replace("#",""),l=c.length===3?c.split("").map(g=>g+g).join(""):c,u=parseInt(l||"0",16);return{r:u>>16&255,g:u>>8&255,b:u&255}},i=d=>{let{r:c,g:l,b:u}=a(d),g=[c/255,l/255,u/255].map(m=>m<=.03928?m/12.92:Math.pow((m+.055)/1.055,2.4));return .2126*g[0]+.7152*g[1]+.0722*g[2]},s=(d,c)=>{if(!d||!c)return 0;let l=i(d),u=i(c),g=Math.max(l,u),m=Math.min(l,u);return(g+.05)/(m+.05)},p=[];try{let c=new V({design:structuredClone(t)}).tokens.colors,l={surfaceBg:c.surface?.base,surfaceText:c.gray?.[900]||"#000000",surfaceTextSecondary:c.gray?.[700]||c.gray?.[800]||c.gray?.[900],surfaceTextMuted:c.gray?.[500]||c.gray?.[600]||c.gray?.[700],surfaceElevated:c.surface?.elevated||c.surface?.base,primaryFill:c.interactive?.light?.fill||c.primary?.[600],primaryText:c.interactive?.light?.text||c.primary?.[600],accentFill:c.accent?.[600]||c.accent?.[500],successFill:c.success?.[600]||c.success?.[500],warningFill:c.warning?.[600]||c.warning?.[500],dangerFill:c.danger?.[600]||c.danger?.[500],infoFill:c.info?.[600]||c.info?.[500]},u=f=>Math.max(s(f,"#ffffff"),s(f,"#000000")),g=s(l.primaryFill,"#ffffff");g<r&&p.push({path:"/colors/primary",message:`Primary button contrast too low in light theme (${g.toFixed(2)} < ${r}). Choose a darker primary.`,ratio:g,min:r,context:"light/btn-primary"});let m=s(l.surfaceBg,l.surfaceText);if(m<r&&p.push({path:"/colors/background",message:`Base text contrast on surface (light) is too low (${m.toFixed(2)} < ${r}). Adjust background or secondary (gray).`,ratio:m,min:r,context:"light/surface-text"}),o){let f=s(l.surfaceBg,l.surfaceTextSecondary);f<r&&p.push({path:"/colors/secondary",message:`Secondary text contrast on base surface (light) is too low (${f.toFixed(2)} < ${r}).`,ratio:f,min:r,context:"light/surface-text-secondary"});let k=s(l.surfaceBg,l.surfaceTextMuted);k<n&&p.push({path:"/colors/secondary",message:`Muted text contrast on base surface (light) is too low (${k.toFixed(2)} < ${n}).`,ratio:k,min:n,context:"light/surface-text-muted"});let v=s(l.surfaceElevated,l.surfaceText);v<r&&p.push({path:"/colors/background",message:`Elevated surface text contrast (light) is too low (${v.toFixed(2)} < ${r}).`,ratio:v,min:r,context:"light/surface-elevated-text"})}let b=s(l.primaryText,l.surfaceBg);b<r&&p.push({path:"/colors/primary",message:`Primary text on surface is too low for outline/link styles (light) (${b.toFixed(2)} < ${r}). Choose a darker primary or lighter surface.`,ratio:b,min:r,context:"light/outline"}),o&&[{path:"/colors/accent",key:"accent",value:l.accentFill},{path:"/colors/success",key:"success",value:l.successFill},{path:"/colors/warning",key:"warning",value:l.warningFill},{path:"/colors/danger",key:"danger",value:l.dangerFill},{path:"/colors/info",key:"info",value:l.infoFill}].forEach(k=>{if(!k?.value)return;let v=u(k.value);v<r&&p.push({path:k.path,message:`${k.key} fill color cannot achieve accessible text contrast (${v.toFixed(2)} < ${r}) with either white or black text.`,ratio:v,min:r,context:`light/${k.key}-fill`})});let h=c.dark;if(h){let f={surfaceBg:h.surface?.base||c.surface?.inverse,surfaceText:h.gray?.[50]||h.gray?.[100]||"#ffffff",surfaceTextMuted:h.gray?.[300]||h.gray?.[400]||h.gray?.[500],primaryFill:c.interactive?.dark?.fill||h.primary?.[600],primaryText:c.interactive?.dark?.text||h.primary?.[600]},k=s(f.primaryFill,"#ffffff");k<r&&p.push({path:"/colors/darkMode/primary",message:`Primary button contrast too low in dark theme (${k.toFixed(2)} < ${r}). Override darkMode.primary or pick a brighter hue.`,ratio:k,min:r,context:"dark/btn-primary"});let v=s(f.primaryText,f.surfaceBg);if(v<r&&p.push({path:"/colors/darkMode/primary",message:`Primary text on surface is too low for outline/link styles (dark) (${v.toFixed(2)} < ${r}). Override darkMode.primary/background.`,ratio:v,min:r,context:"dark/outline"}),o){let S=s(f.surfaceBg,f.surfaceText);S<r&&p.push({path:"/colors/darkMode/background",message:`Base text contrast on surface (dark) is too low (${S.toFixed(2)} < ${r}).`,ratio:S,min:r,context:"dark/surface-text"});let R=s(f.surfaceBg,f.surfaceTextMuted);R<n&&p.push({path:"/colors/darkMode/secondary",message:`Muted text contrast on surface (dark) is too low (${R.toFixed(2)} < ${n}).`,ratio:R,min:n,context:"dark/surface-text-muted"})}}}catch(d){p.push({path:"/",message:`Validation failed: ${String(d?.message||d)}`,ratio:0,min:0})}return{ok:p.length===0,issues:p}}var xt=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(e={}){this._mode="static",this._staticPaths={...this._staticPaths,...e}}async getStylesheet(e){if(this._mode==="live")return null;try{return(await import(this._staticPaths[e]))[e]}catch(r){console.error(`[PDS Registry] Failed to load static ${e}:`,r),console.error(`[PDS Registry] Looking for: ${this._staticPaths[e]}`),console.error("[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");let n=new CSSStyleSheet;return n.replaceSync("/* Failed to load "+e+" */"),n}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},ge=new xt;function cn(t){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let n=new CSSStyleSheet;n.replaceSync(t),n._pds=!0;let o=(document.adoptedStyleSheets||[]).filter(a=>a._pds!==!0);document.adoptedStyleSheets=[...o,n];return}let e="pds-runtime-stylesheet",r=document.getElementById(e);if(!r){r=document.createElement("style"),r.id=e,r.type="text/css";let n=document.head||document.getElementsByTagName("head")[0];n?n.appendChild(r):document.documentElement.appendChild(r)}r.textContent=t}catch(e){console.warn("installRuntimeStyles failed:",e)}}function or(t){let e=t;if(!e||typeof e!="object"){console.error("[Runtime] applyStyles requires an explicit generator instance in live mode");return}let r=e.layeredCSS||e.css||"";if(!r){e.options?.log?.("warn","[Runtime] No CSS available on generator to apply");return}cn(r)}async function Oe(t,e=[],r=null){try{let n=r?.primitivesStylesheet?r.primitivesStylesheet:await ge.getStylesheet("primitives");t.adoptedStyleSheets=[n,...e]}catch(n){let o=t.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${o}> failed to adopt primitives:`,n),t.adoptedStyleSheets=e}}async function _e(t,e=["primitives"],r=[],n=null){let o=Array.isArray(r)?r.filter(Boolean):[];if(o.length){let i=(Array.isArray(t.adoptedStyleSheets)?t.adoptedStyleSheets:[]).filter(s=>!o.includes(s));t.adoptedStyleSheets=[...i,...o]}try{let i=(await Promise.all(e.map(async s=>{if(n)switch(s){case"tokens":return n.tokensStylesheet;case"primitives":return n.primitivesStylesheet;case"components":return n.componentsStylesheet;case"utilities":return n.utilitiesStylesheet;default:break}return ge.getStylesheet(s)}))).filter(s=>s!==null);t.adoptedStyleSheets=[...i,...o]}catch(a){let i=t.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${i}> failed to adopt layers:`,a),t.adoptedStyleSheets=o}}function ar(t){let e=new CSSStyleSheet;return e.replaceSync(t),e}var dn=[{selector:".accordion"},{selector:"nav[data-dropdown]"},{selector:"label[data-toggle]"},{selector:"label[data-color]"},{selector:'input[type="range"]'},{selector:"form[data-required]"},{selector:"fieldset[role=group][data-open]"},{selector:"[data-clip]"},{selector:"button, a[class*='btn-']"}];function pn(t){t.dataset.enhancedAccordion||(t.dataset.enhancedAccordion="true",t.addEventListener("toggle",e=>{e.target.open&&e.target.parentElement===t&&t.querySelectorAll(":scope > details[open]").forEach(r=>{r!==e.target&&(r.open=!1)})},!0))}function un(t){if(t.dataset.enhancedDropdown)return;t.dataset.enhancedDropdown="true";let e=t.lastElementChild;if(!e)return;let r=t.querySelector("[data-dropdown-toggle]")||t.querySelector("button");r&&!r.hasAttribute("type")&&r.setAttribute("type","button"),e.id||(e.id=`dropdown-${Math.random().toString(36).slice(2,9)}`);let n=e.tagName?.toLowerCase()==="menu",o=8;n&&!e.hasAttribute("role")&&e.setAttribute("role","menu"),e.hasAttribute("aria-hidden")||e.setAttribute("aria-hidden","true"),r&&(r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-controls",e.id),r.setAttribute("aria-expanded","false"));let a=()=>{let $=e.getAttribute("style");e.style.visibility="hidden",e.style.display="inline-block",e.style.pointerEvents="none";let L=e.getBoundingClientRect(),P=Math.max(e.offsetWidth||0,e.scrollWidth||0,L.width||0,1),E=Math.max(e.offsetHeight||0,e.scrollHeight||0,L.height||0,1);return $===null?e.removeAttribute("style"):e.setAttribute("style",$),{width:P,height:E}},i=()=>{let $=(t.getAttribute("data-direction")||t.getAttribute("data-dropdown-direction")||t.getAttribute("data-mode")||"auto").toLowerCase();if($==="up"||$==="down")return $;let L=(r||t).getBoundingClientRect(),{height:P}=a(),E=Math.max(0,window.innerHeight-L.bottom),A=Math.max(0,L.top),N=E>=P,C=A>=P;return N&&!C?"down":C&&!N?"up":N&&C?"down":A>E?"up":"down"},s=()=>{let $=(t.getAttribute("data-align")||t.getAttribute("data-dropdown-align")||"auto").toLowerCase();if($==="left"||$==="right"||$==="start"||$==="end")return $==="start"?"left":$==="end"?"right":$;let L=(r||t).getBoundingClientRect(),{width:P}=a(),E=Math.max(0,window.innerWidth-L.left),A=Math.max(0,L.right),N=E>=P,C=A>=P;return N&&!C?"left":C&&!N?"right":N&&C?"left":A>E?"right":"left"},p=($,L=8)=>{let P=getComputedStyle(t).getPropertyValue($).trim();if(!P)return L;let E=document.createElement("span");E.style.position="fixed",E.style.visibility="hidden",E.style.pointerEvents="none",E.style.height=P,document.body.appendChild(E);let A=Number.parseFloat(getComputedStyle(E).height);return E.remove(),Number.isFinite(A)?A:L},d=()=>{e.style.removeProperty("position"),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("right"),e.style.removeProperty("bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("max-width"),e.style.removeProperty("max-inline-size"),e.style.removeProperty("max-height"),e.style.removeProperty("overflow")},c=()=>{e.getAttribute("aria-hidden")==="false"&&(d(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{l()})}))},l=()=>{if(e.getAttribute("aria-hidden")!=="false")return;let $=(r||t).getBoundingClientRect(),L=window.visualViewport,P=L?.width||document.documentElement?.clientWidth||window.innerWidth,E=L?.height||document.documentElement?.clientHeight||window.innerHeight,A=L?.offsetLeft||0,N=L?.offsetTop||0,C=Math.max(1,P-o*2),x=Math.max(1,E-o*2);e.style.maxWidth=`${Math.round(C)}px`,e.style.maxInlineSize=`${Math.round(C)}px`,e.style.maxHeight=`${Math.round(x)}px`,e.style.overflow="auto";let{width:w,height:M}=a(),z=p("--spacing-2",8),B=i(),D=s();t.dataset.dropdownDirection=B,t.dataset.dropdownAlign=D;let q=D==="right"?$.right-w:$.left;w>=C-1?q=A+o:q=Math.max(A+o,Math.min(q,A+P-w-o));let I=B==="up"?$.top-z-M:$.bottom+z;I=Math.max(N+o,Math.min(I,N+E-M-o)),e.style.position="fixed",e.style.left=`${Math.round(q)}px`,e.style.top=`${Math.round(I)}px`,e.style.right="auto",e.style.bottom="auto",e.style.marginTop="0",e.style.marginBottom="0"},u=null,g=()=>{u||(u=()=>l(),window.addEventListener("resize",u),window.addEventListener("scroll",u,!0))},m=()=>{u&&(window.removeEventListener("resize",u),window.removeEventListener("scroll",u,!0),u=null)},b=null,h=()=>{b||typeof document>"u"||(b=()=>{e.getAttribute("aria-hidden")==="false"&&(t.dataset.dropdownDirection=i(),t.dataset.dropdownAlign=s(),c(),setTimeout(()=>{e.getAttribute("aria-hidden")==="false"&&c()},50),setTimeout(()=>{e.getAttribute("aria-hidden")==="false"&&c()},150))},document.addEventListener("pds:config-changed",b))},f=()=>{!b||typeof document>"u"||(document.removeEventListener("pds:config-changed",b),b=null)},k=null,v=()=>{t.dataset.dropdownDirection=i(),t.dataset.dropdownAlign=s(),e.setAttribute("aria-hidden","false"),r?.setAttribute("aria-expanded","true"),g(),h(),c(),k||(k=$=>{($.composedPath?$.composedPath():[$.target]).some(E=>E===t)||S()},setTimeout(()=>{document.addEventListener("click",k)},0))},S=()=>{e.setAttribute("aria-hidden","true"),r?.setAttribute("aria-expanded","false"),m(),f(),d(),k&&(document.removeEventListener("click",k),k=null)},R=()=>{e.getAttribute("aria-hidden")==="false"?S():v()};r?.addEventListener("click",$=>{$.preventDefault(),$.stopPropagation(),R()}),t.addEventListener("keydown",$=>{$.key==="Escape"&&(S(),r?.focus())}),t.addEventListener("focusout",$=>{$.relatedTarget&&(($.composedPath?$.composedPath():[$.relatedTarget]).some(E=>E===t)||S())})}function gn(t){if(t.dataset.enhancedToggle)return;t.dataset.enhancedToggle="true";let e=t.querySelector('input[type="checkbox"]');if(!e)return;t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.setAttribute("role","switch"),t.setAttribute("aria-checked",e.checked?"true":"false");let r=document.createElement("span");r.className="toggle-switch",r.setAttribute("role","presentation"),r.setAttribute("aria-hidden","true");let n=document.createElement("span");n.className="toggle-knob",r.appendChild(n),t.insertBefore(r,e.nextSibling);let o=()=>{t.setAttribute("aria-checked",e.checked?"true":"false")},a=()=>{e.disabled||(e.checked=!e.checked,o(),e.dispatchEvent(new Event("change",{bubbles:!0})))};t.addEventListener("click",i=>{i.preventDefault(),a()}),t.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),a())}),e.addEventListener("change",o)}function mn(t){if(t.dataset.enhancedColorInput)return;let e=t.querySelector('input[type="color"]');if(!e)return;t.dataset.enhancedColorInput="true";let r=t.querySelector(":scope > .color-control"),n=t.querySelector(":scope > .color-control > .color-swatch"),o=t.querySelector(":scope > .color-control > output");r||(r=document.createElement("span"),r.className="color-control",e.before(r)),n||(n=document.createElement("span"),n.className="color-swatch",r.appendChild(n)),e.parentElement!==n&&n.appendChild(e),o||(o=document.createElement("output"),r.appendChild(o));let a=()=>{if(e.dataset.colorUnset==="1"){o.value="",o.textContent="not set",r.dataset.value="",r.dataset.unset="1",n.dataset.unset="1";return}o.value=e.value,o.textContent=e.value,r.dataset.value=e.value,delete r.dataset.unset,delete n.dataset.unset};a();let i=()=>{e.dataset.colorUnset==="1"&&(e.dataset.colorUnset="0"),a()};e.addEventListener("input",i,{passive:!0}),e.addEventListener("change",i,{passive:!0})}function fn(t){if(t.dataset.enhancedRange)return;let e=i=>{if(t.dataset.enhancedRangeProgrammatic)return;t.dataset.enhancedRangeProgrammatic="1";let s=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"value")||Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");s?.get&&s?.set&&Object.defineProperty(t,"value",{configurable:!0,enumerable:s.enumerable,get(){return s.get.call(this)},set(d){s.set.call(this,d),i()}}),new MutationObserver(d=>{d.some(l=>{let u=l.attributeName;return u==="value"||u==="min"||u==="max"})&&i()}).observe(t,{attributes:!0,attributeFilter:["value","min","max"]})},r=t.closest("label"),n=r?.classList.contains("range-output"),o=t.id||`range-${Math.random().toString(36).substring(2,11)}`,a=`${o}-output`;if(t.id=o,n){let i=r.querySelector("span");if(i&&!i.classList.contains("range-output-wrapper")){let s=document.createElement("span");s.className="range-output-wrapper",s.style.display="flex",s.style.justifyContent="space-between",s.style.alignItems="center";let p=document.createElement("span");p.textContent=i.textContent,s.appendChild(p);let d=document.createElement("output");d.id=a,d.setAttribute("for",o),d.style.color="var(--surface-text-secondary, var(--color-text-secondary))",d.style.fontSize="0.875rem",d.textContent=t.value,s.appendChild(d),i.textContent="",i.appendChild(s);let c=()=>{d.textContent=t.value};t.addEventListener("input",c),t.addEventListener("change",c),e(c),c()}}else{let i=t.closest(".range-container");i||(i=document.createElement("div"),i.className="range-container",t.parentNode?.insertBefore(i,t),i.appendChild(t)),i.style.position="relative";let s=document.createElement("output");s.id=a,s.setAttribute("for",o),s.className="range-bubble",s.setAttribute("aria-live","polite"),i.appendChild(s);let p=()=>{let l=parseFloat(t.min)||0,u=parseFloat(t.max)||100,g=parseFloat(t.value),m=(g-l)/(u-l);s.style.left=`calc(${m*100}% )`,s.textContent=String(g)},d=()=>s.classList.add("visible"),c=()=>s.classList.remove("visible");t.addEventListener("input",p),t.addEventListener("pointerdown",d),t.addEventListener("pointerup",c),t.addEventListener("pointerleave",c),t.addEventListener("focus",d),t.addEventListener("blur",c),t.addEventListener("change",p),e(p),p()}t.dataset.enhancedRange="1"}function hn(t){if(t.dataset.enhancedRequired)return;t.dataset.enhancedRequired="true";let e=r=>{let n;if(r.closest("[role$=group]")?n=r.closest("[role$=group]").querySelector("legend"):n=r.closest("label"),!n||n.querySelector(".required-asterisk"))return;let o=document.createElement("span");o.classList.add("required-asterisk"),o.textContent="*",o.style.marginLeft="4px";let a=n.querySelector("span, [data-label]");if(a)a.appendChild(o);else{let s=n.querySelector("input, select, textarea");s?n.insertBefore(o,s):n.appendChild(o)}let i=r.closest("form");if(i&&!i.querySelector(".required-legend")){let s=document.createElement("small");s.classList.add("required-legend"),s.textContent="* Required fields",i.insertBefore(s,i.querySelector(".form-actions")||i.lastElementChild)}};t.querySelectorAll("[required]").forEach(r=>{e(r)})}function bn(t){if(t.dataset.enhancedOpenGroup)return;t.dataset.enhancedOpenGroup="true",t.classList.add("flex","flex-wrap","buttons");let e=document.createElement("input");e.type="text",e.placeholder="Add item...",e.classList.add("input-text","input-sm"),e.style.width="auto";let r=()=>t.querySelector('input[type="radio"], input[type="checkbox"]');t.appendChild(e),e.addEventListener("keydown",n=>{if(n.key==="Enter"||n.key==="Tab"){let o=e.value.trim();if(o){n.preventDefault();let a=r(),i=a?.type==="radio"?"radio":"checkbox",s=`open-group-${Math.random().toString(36).substring(2,11)}`,p=document.createElement("label"),d=document.createElement("span");d.setAttribute("data-label",""),d.textContent=o;let c=document.createElement("input");c.type=i,c.name=a?.name||t.getAttribute("data-name")||"open-group",c.value=o,c.id=s,p.appendChild(d),p.appendChild(c),t.insertBefore(p,e),e.value=""}}else if(n.key==="Backspace"&&e.value===""){n.preventDefault();let o=t.querySelectorAll("label");o.length>0&&o[o.length-1].remove()}})}function yn(t){if(t.dataset.enhancedClip)return;t.dataset.enhancedClip="true",t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.hasAttribute("role")||t.setAttribute("role","button");let e=()=>{let n=t.getAttribute("data-clip-open")==="true";t.setAttribute("aria-expanded",n?"true":"false")},r=()=>{let n=t.getAttribute("data-clip-open")==="true";t.setAttribute("data-clip-open",n?"false":"true"),e()};t.addEventListener("click",n=>{n.defaultPrevented||r()}),t.addEventListener("keydown",n=>{(n.key===" "||n.key==="Enter")&&(n.preventDefault(),r())}),e()}function vn(t){if(t.dataset.enhancedBtnWorking)return;t.dataset.enhancedBtnWorking="true";let e=null,r=!1;new MutationObserver(o=>{o.forEach(a=>{if(a.attributeName==="class"){let i=t.classList.contains("btn-working"),s=t.querySelector("pds-icon");if(i)if(s)e||(e=s.getAttribute("icon")),s.setAttribute("icon","circle-notch");else{let p=document.createElement("pds-icon");p.setAttribute("icon","circle-notch"),p.setAttribute("size","sm"),t.insertBefore(p,t.firstChild),r=!0}else a.oldValue?.includes("btn-working")&&s&&(r?(s.remove(),r=!1):e&&(s.setAttribute("icon",e),e=null))}})}).observe(t,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var xn=new Map([[".accordion",pn],["nav[data-dropdown]",un],["label[data-toggle]",gn],["label[data-color]",mn],['input[type="range"]',fn],["form[data-required]",hn],["fieldset[role=group][data-open]",bn],["[data-clip]",yn],["button, a[class*='btn-']",vn]]),ir=dn.map(t=>({...t,run:xn.get(t.selector)||(()=>{})}));var sr=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
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
    `.trim()}];var cr="pds",wn=/^([a-z][a-z0-9+\-.]*:)?\/\//i,lr=/^[a-z]:/i;function Te(t=""){return t.endsWith("/")?t:`${t}/`}function kn(t="",e=cr){let r=t.replace(/\/+$/,"");return new RegExp(`(?:^|/)${e}$`,"i").test(r)?r:`${r}/${e}`}function Sn(t){return t.replace(/^\.\/+/,"")}function $n(t){return lr.test(t)?t.replace(lr,"").replace(/^\/+/,""):t}function Cn(t){return t.startsWith("public/")?t.substring(7):t}function me(t,e={}){let r=e.segment||cr,n=e.defaultRoot||`/assets/${r}/`,o=t?.public&&t.public?.root||t?.static&&t.static?.root||null;if(!o||typeof o!="string")return Te(n);let a=o.trim();return a?(a=a.replace(/\\/g,"/"),a=kn(a,r),a=Te(a),wn.test(a)?a:(a=Sn(a),a=$n(a),a.startsWith("/")||(a=Cn(a),a.startsWith("/")||(a=`/${a}`),a=a.replace(/\/+/g,(i,s)=>s===0?i:"/")),Te(a))):Te(n)}function dr(t){let e=t.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(e.toLowerCase()))return!0;let o=document.createElement("canvas").getContext("2d");if(!o)return!1;let a="mmmmmmmmmmlli",i="72px",s="monospace";o.font=`${i} ${s}`;let p=o.measureText(a).width;o.font=`${i} "${e}", ${s}`;let d=o.measureText(a).width;return p!==d}function Mn(t){return t?t.split(",").map(n=>n.trim())[0].replace(/['"]/g,"").trim():null}async function pr(t,e={}){if(!t)return Promise.resolve();let{weights:r=[400,500,600,700],italic:n=!1}=e,o=Mn(t);if(!o||dr(o))return Promise.resolve();let a=encodeURIComponent(o);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${a}"]`)?(console.log(`Font "${o}" is already loading or loaded`),Promise.resolve()):(console.log(`Loading font "${o}" from Google Fonts...`),new Promise((s,p)=>{let d=document.createElement("link");d.rel="stylesheet";let c=n?`ital,wght@0,${r.join(";0,")};1,${r.join(";1,")}`:`wght@${r.join(";")}`;d.href=`https://fonts.googleapis.com/css2?family=${a}:${c}&display=swap`,d.setAttribute("data-font-loader",o),d.onload=()=>{console.log(`Successfully loaded font "${o}"`),s()},d.onerror=()=>{console.warn(`Failed to load font "${o}" from Google Fonts`),p(new Error(`Failed to load font: ${o}`))},document.head.appendChild(d),setTimeout(()=>{dr(o)||console.warn(`Font "${o}" did not load within timeout`),s()},5e3)}))}async function wt(t){if(!t)return Promise.resolve();let e=new Set;t.fontFamilyHeadings&&e.add(t.fontFamilyHeadings),t.fontFamilyBody&&e.add(t.fontFamilyBody),t.fontFamilyMono&&e.add(t.fontFamilyMono);let r=Array.from(e).map(n=>pr(n).catch(o=>{console.warn(`Could not load font: ${n}`,o)}));await Promise.all(r)}async function zn(...t){let e={};t.length&&typeof t[t.length-1]=="object"&&(e=t.pop()||{});let r=t,{baseURL:n,mapper:o=d=>`${d}.js`,onError:a=(d,c)=>console.error(`[defineWebComponents] ${d}:`,c)}=e,i=n?new URL(n,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),s=d=>d.toLowerCase().replace(/(^|-)([a-z])/g,(c,l,u)=>u.toUpperCase()),p=async d=>{try{if(customElements.get(d))return{tag:d,status:"already-defined"};let c=o(d),u=await import(c instanceof URL?c.href:new URL(c,i).href),g=u?.default??u?.[s(d)];if(!g){if(customElements.get(d))return{tag:d,status:"self-defined"};throw new Error(`No export found for ${d}. Expected default export or named export "${s(d)}".`)}return customElements.get(d)?{tag:d,status:"race-already-defined"}:(customElements.define(d,g),{tag:d,status:"defined"})}catch(c){throw a(d,c),c}};return Promise.all(r.map(p))}var De=class{constructor(e={}){let{baseURL:r,mapper:n,onError:o,predicate:a=()=>!0,attributeModule:i="data-module",root:s=document,scanExisting:p=!0,debounceMs:d=16,observeShadows:c=!0,enhancers:l=[],patchAttachShadow:u=!0}=e,g=new Set,m=new Set,b=new Set,h=new Map,f=new WeakMap,k=new WeakMap,v=0,S=!1,R=null,$=w=>{if(!w||!l.length)return;let M=k.get(w);M||(M=new Set,k.set(w,M));for(let z of l)if(!(!z.selector||!z.run)&&!M.has(z.selector))try{w.matches&&w.matches(z.selector)&&(z.run(w),M.add(z.selector))}catch(B){console.warn(`[AutoDefiner] Error applying enhancer for selector "${z.selector}":`,B)}},L=(w,M)=>{if(!S&&!(!w||!w.includes("-"))&&!customElements.get(w)&&!m.has(w)&&!b.has(w)){if(M&&M.getAttribute){let z=M.getAttribute(i);z&&!h.has(w)&&h.set(w,z)}g.add(w),P()}},P=()=>{v||(v=setTimeout(N,d))},E=w=>{if(w){if(w.nodeType===1){let M=w,z=M.tagName?.toLowerCase();z&&z.includes("-")&&!customElements.get(z)&&a(z,M)&&L(z,M),$(M),c&&M.shadowRoot&&A(M.shadowRoot)}w.querySelectorAll&&w.querySelectorAll("*").forEach(M=>{let z=M.tagName?.toLowerCase();z&&z.includes("-")&&!customElements.get(z)&&a(z,M)&&L(z,M),$(M),c&&M.shadowRoot&&A(M.shadowRoot)})}},A=w=>{if(!w||f.has(w))return;E(w);let M=new MutationObserver(z=>{for(let B of z)B.addedNodes?.forEach(D=>{E(D)}),B.type==="attributes"&&B.target&&E(B.target)});M.observe(w,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...l.map(z=>z.selector).filter(z=>z.startsWith("data-"))]}),f.set(w,M)};async function N(){if(clearTimeout(v),v=0,!g.size)return;let w=Array.from(g);g.clear(),w.forEach(M=>m.add(M));try{let M=z=>h.get(z)??(n?n(z):`${z}.js`);await zn(...w,{baseURL:r,mapper:M,onError:(z,B)=>{b.add(z),o?.(z,B)}})}catch{}finally{w.forEach(M=>m.delete(M))}}let C=s===document?document.documentElement:s,x=new MutationObserver(w=>{for(let M of w)M.addedNodes?.forEach(z=>{E(z)}),M.type==="attributes"&&M.target&&E(M.target)});if(x.observe(C,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...l.map(w=>w.selector).filter(w=>w.startsWith("data-"))]}),c&&u&&Element.prototype.attachShadow){let w=Element.prototype.attachShadow;Element.prototype.attachShadow=function(z){let B=w.call(this,z);if(z&&z.mode==="open"){A(B);let D=this.tagName?.toLowerCase();D&&D.includes("-")&&!customElements.get(D)&&L(D,this)}return B},R=()=>Element.prototype.attachShadow=w}return p&&E(C),{stop(){S=!0,x.disconnect(),R&&R(),v&&(clearTimeout(v),v=0),f.forEach(w=>w.disconnect())},flush:N}}static async define(...e){let r={};e.length&&typeof e[e.length-1]=="object"&&(r=e.pop()||{});let n=e,{baseURL:o,mapper:a=c=>`${c}.js`,onError:i=(c,l)=>console.error(`[defineWebComponents] ${c}:`,l)}=r,s=o?new URL(o,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),p=c=>c.toLowerCase().replace(/(^|-)([a-z])/g,(l,u,g)=>g.toUpperCase()),d=async c=>{try{if(customElements.get(c))return{tag:c,status:"already-defined"};let l=a(c),g=await import(l instanceof URL?l.href:new URL(l,s).href),m=g?.default??g?.[p(c)];if(!m){if(customElements.get(c))return{tag:c,status:"self-defined"};throw new Error(`No export found for ${c}. Expected default export or named export "${p(c)}".`)}return customElements.get(c)?{tag:c,status:"race-already-defined"}:(customElements.define(c,m),{tag:c,status:"defined"})}catch(l){throw i(c,l),l}};return Promise.all(n.map(d))}};var En=/^[a-z][a-z0-9+\-.]*:\/\//i,Ae=(()=>{try{return import.meta.url}catch{return}})(),fe=t=>typeof t=="string"&&t.length&&!t.endsWith("/")?`${t}/`:t;function he(t,e={}){if(!t||En.test(t))return t;let{preferModule:r=!0}=e,n=()=>{if(!Ae)return null;try{return new URL(t,Ae).href}catch{return null}},o=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(t,window.location.origin).href}catch{return null}};return(r?n()||o():o()||n())||t}var ur=(()=>{if(Ae)try{let t=new URL(Ae);if(/\/public\/assets\/js\//.test(t.pathname))return new URL("../pds/",Ae).href}catch{return}})(),gr=!1;function We(t){gr||typeof document>"u"||(gr=!0,t.addEventListener("pds:ready",e=>{let r=e.detail?.mode;r&&document.documentElement.classList.add(`pds-${r}`,"pds-ready")}))}function St(t={},e={}){if(!e||typeof e!="object")return t;let r=Array.isArray(t)?[...t]:{...t};for(let[n,o]of Object.entries(e))o&&typeof o=="object"&&!Array.isArray(o)?r[n]=St(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o;return r}function kt(t=""){return String(t).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ie(t){if(t==null)return t;if(typeof t=="function")return;if(typeof t!="object")return t;if(Array.isArray(t))return t.map(r=>ie(r)).filter(r=>r!==void 0);let e={};for(let r in t)if(t.hasOwnProperty(r)){let n=t[r];if(typeof n!="function"){let o=ie(n);o!==void 0&&(e[r]=o)}}return e}function $t(t={},e={},{presets:r,defaultLog:n,validateDesignConfig:o,validateInitConfig:a}={}){let i=t&&typeof t.log=="function"?t.log:n,s=typeof t=="object"&&("colors"in t||"typography"in t||"spatialRhythm"in t||"shape"in t||"behavior"in t||"layout"in t||"advanced"in t||"a11y"in t||"components"in t||"icons"in t),p=t&&t.enhancers;p&&!Array.isArray(p)&&(p=Object.values(p));let d=p??e.enhancers??[],c=t&&t.preset,l=t&&t.design,u=t&&t.icons&&typeof t.icons=="object"?t.icons:null,g="preset"in(t||{})||"design"in(t||{})||"enhancers"in(t||{});t&&typeof t=="object"&&typeof a=="function"&&a(t,{log:i,context:"PDS.start"});let m,b=null;if(g){l&&typeof l=="object"&&typeof o=="function"&&o(l,{log:i,context:"PDS.start"});let h=String(c||"default").toLowerCase(),f=r?.[h]||Object.values(r||{}).find(B=>kt(B.name)===h||String(B.name||"").toLowerCase()===h);if(!f)throw new Error(`PDS preset not found: "${c||"default"}"`);b={id:f.id||kt(f.name),name:f.name||f.id||String(h)};let k=structuredClone(f);if(l&&typeof l=="object"||u){let B=l?ie(l):{},D=u?ie(u):null,q=D?St(B,{icons:D}):B;k=St(k,structuredClone(q))}let{mode:v,autoDefine:S,applyGlobalStyles:R,manageTheme:$,themeStorageKey:L,preloadStyles:P,criticalLayers:E,managerURL:A,manager:N,preset:C,design:x,enhancers:w,log:M,...z}=t;m={...z,design:k,preset:b.name,log:M||n}}else if(s){typeof o=="function"&&o(t,{log:i,context:"PDS.start"});let{log:h,...f}=t;m={design:structuredClone(f),log:h||n}}else{let h=r?.default||Object.values(r||{}).find(f=>kt(f.name)==="default");if(!h)throw new Error("PDS default preset not available");b={id:h.id||"default",name:h.name||"Default"},m={design:structuredClone(h),preset:b.name,log:n}}return{generatorConfig:m,enhancers:d,presetInfo:b}}function He({manageTheme:t,themeStorageKey:e,applyResolvedTheme:r,setupSystemListenerIfNeeded:n}){let o="light",a=null;if(t&&typeof window<"u"){try{a=localStorage.getItem(e)||null}catch{a=null}try{r?.(a),n?.(a)}catch{}a?a==="system"?o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":o=a:o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:o,storedTheme:a}}function be(t,{resolvePublicAssetURL:e}){let r=!!(t?.public?.root||t?.static?.root),n=e(t);return!r&&ur&&(n=ur),fe(he(n))}async function Ue(t,{baseEnhancers:e=[]}={}){let{autoDefineBaseURL:r="/auto-define/",autoDefinePreload:n=[],autoDefineMapper:o=null,enhancers:a=[],autoDefineOverrides:i=null,autoDefinePreferModule:s=!0}=t,p=(()=>{let c=new Map;return(e||[]).forEach(l=>c.set(l.selector,l)),(a||[]).forEach(l=>c.set(l.selector,l)),Array.from(c.values())})(),d=null;if(typeof window<"u"&&typeof document<"u"){let c=De,l=v=>{switch(v){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${v}.js`}},{mapper:u,enhancers:g,...m}=i&&typeof i=="object"?i:{},b=g?Array.isArray(g)?g:typeof g=="object"?Object.values(g):[]:[],h=(()=>{let v=new Map;return(p||[]).forEach(S=>{S?.selector&&v.set(S.selector,S)}),(b||[]).forEach(S=>{if(!S?.selector)return;let R=v.get(S.selector)||null;v.set(S.selector,{...R||{},...S,run:typeof S?.run=="function"?S.run:R?.run})}),Array.from(v.values())})(),k={baseURL:r&&fe(he(r,{preferModule:s})),predefine:n,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:h,onError:(v,S)=>{if(typeof v=="string"&&v.startsWith("pds-")){let $=["pds-form","pds-drawer"].includes(v),L=S?.message?.includes("#pds/lit")||S?.message?.includes("Failed to resolve module specifier");$&&L?console.error(`\u274C PDS component <${v}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`):console.warn(`\u26A0\uFE0F PDS component <${v}> not found. Assets may not be installed.`)}else console.error(`\u274C Auto-define error for <${v}>:`,S)},...m,mapper:v=>{if(customElements.get(v))return null;if(typeof o=="function")try{let S=o(v);return S===void 0?l(v):S}catch(S){return console.warn("Custom autoDefine.mapper error; falling back to default:",S?.message||S),l(v)}return l(v)}};d=new c(k),n.length>0&&typeof c.define=="function"&&await c.define(...n,{baseURL:r,mapper:k.mapper,onError:k.onError})}return{autoDefiner:d,mergedEnhancers:p}}var Ct=["light","dark"],Mt=new Set(Ct);function zt(t){let r=(Array.isArray(t?.themes)?t.themes.map(n=>String(n).toLowerCase()):Ct).filter(n=>Mt.has(n));return r.length?r:Ct}function ye(t,{preferDocument:e=!0}={}){let r=String(t||"").toLowerCase();if(Mt.has(r))return r;if(e&&typeof document<"u"){let n=document.documentElement?.getAttribute("data-theme");if(Mt.has(n))return n}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function se(t,e){let r=ye(e);return zt(t).includes(r)}var fr=!1,Ye="pds-live-edit-toggle",Lt="pds-live-edit-toggle-style";function hr(t){if(typeof document>"u"||typeof t!="function")return;if(document.body){t();return}let e=()=>{document.body&&(document.removeEventListener("DOMContentLoaded",e),t())};document.addEventListener("DOMContentLoaded",e,{once:!0})}function An(t={}){let e=t?.interactive!==!1;typeof document>"u"||hr(()=>{if(document.querySelector("pds-live-edit")){if(!e){let r=document.querySelector("pds-live-edit");r&&r.setAttribute("data-pds-live-settings-only","true")}}else{let r=document.createElement("pds-live-edit");e||r.setAttribute("data-pds-live-settings-only","true"),document.body.appendChild(r)}})}function Ve(t=0){return new Promise(e=>{setTimeout(e,Math.max(0,Number(t)||0))})}async function Le(t={}){let e=t?.mountIfMissing!==!1,r=t?.interactive!==!1,n=typeof t?.requiredMethod=="string"&&t.requiredMethod.trim()?t.requiredMethod.trim():"openDesignSettings",o=Number.isFinite(Number(t?.timeoutMs))?Number(t.timeoutMs):2400;if(typeof document>"u"||!e&&!document.querySelector("pds-live-edit"))return null;e&&An({interactive:r});let a=Date.now();for(;Date.now()-a<o;){let s=document.querySelector("pds-live-edit");if(!s){await Ve(40);continue}if(typeof s?.[n]=="function")return s;if(typeof customElements<"u"&&typeof customElements.whenDefined=="function"){try{await Promise.race([customElements.whenDefined("pds-live-edit"),Ve(80)])}catch{await Ve(40)}continue}await Ve(40)}let i=document.querySelector("pds-live-edit");return i&&typeof i?.[n]=="function"?i:null}function br(){if(typeof document>"u")return;document.querySelectorAll("pds-live-edit").forEach(e=>{typeof e?.setInteractiveEditingEnabled=="function"&&e.setInteractiveEditingEnabled(!1),e.remove()})}function Ln(t){return t?typeof t.isInteractiveEditingEnabled=="function"?!!t.isInteractiveEditingEnabled():!0:!1}function Rn(){if(typeof document>"u"||document.getElementById(Lt))return;let t=document.createElement("style");t.id=Lt,t.textContent=`
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
  `,document.head.appendChild(t)}function At(t,e){if(!t)return;t.classList.toggle("btn-primary",e),t.classList.toggle("btn-secondary",!e),t.setAttribute("aria-pressed",e?"true":"false");let r="PDS Manager";t.setAttribute("aria-label",r),t.setAttribute("title",r)}async function Fn(){if(typeof document>"u")return null;Rn();let t=document.getElementById(Ye);if(!t){let e=document.createElement("nav");e.className="pds-live-edit-toggle-nav",e.setAttribute("data-dropdown",""),e.setAttribute("data-mode","auto"),e.setAttribute("data-pds-live-edit-ignore","true"),t=document.createElement("button"),t.id=Ye,t.type="button",t.className="icon-only btn-secondary",t.setAttribute("data-pds-live-edit-ignore","true"),t.innerHTML='<pds-icon icon="cursor-click" size="sm"></pds-icon>';let r=document.createElement("menu");r.setAttribute("data-pds-live-edit-ignore","true");let n=(a,i,s)=>{let p=document.createElement("li"),d=document.createElement("a");d.href="#",d.dataset.pdsLiveAction=a,d.setAttribute("data-pds-live-edit-ignore","true");let c=document.createElement("pds-icon");return c.setAttribute("icon",s),c.setAttribute("size","sm"),d.append(c,document.createTextNode(` ${i}`)),p.appendChild(d),p},o=()=>{let a=document.createElement("li");a.setAttribute("data-pds-live-edit-ignore","true");let i=document.createElement("hr");return i.setAttribute("aria-hidden","true"),a.appendChild(i),a};r.appendChild(n("toggle","Toggle live editing","pencil")),r.appendChild(n("open-settings","Open Settings","gear")),r.appendChild(o()),r.appendChild(n("reset-config","Reset Config","arrow-counter-clockwise")),await Pn(r),e.append(t,r),hr(()=>{document.getElementById(Ye)||document.body.appendChild(e)})}return t}async function Pn(t){if(t instanceof Element){if(t.__pdsLiveSharedMenuItemInFlight)return t.__pdsLiveSharedMenuItemInFlight;t.__pdsLiveSharedMenuItemInFlight=(async()=>{t.querySelectorAll("li.pds-live-shared-quick-mode-item").forEach(s=>s.remove());let e=await Le({mountIfMissing:!0,interactive:!1,requiredMethod:"createSharedQuickModeMenuItem",timeoutMs:7e3});if(!e||typeof e.createSharedQuickModeMenuItem!="function")return;let r=await e.createSharedQuickModeMenuItem();if(!(r instanceof Element))return;r.classList.add("pds-live-shared-quick-mode-item");let o=t.querySelector('a[data-pds-live-action="reset-config"]')?.closest("li")||null,a=o?.previousElementSibling||null,i=a&&a.querySelector?.(":scope > hr")?a:null;if(i){t.insertBefore(r,i);return}if(o){t.insertBefore(r,o);return}t.appendChild(r)})();try{await t.__pdsLiveSharedMenuItemInFlight}finally{t.__pdsLiveSharedMenuItemInFlight=null}}}function In(){if(typeof document>"u")return;let t=document.getElementById(Ye);if(t){let r=t.closest(".pds-live-edit-toggle-nav");r?r.remove():t.remove()}let e=document.getElementById(Lt);e&&e.remove(),br()}async function Nn(){if(typeof document>"u")return;let t=await Fn();if(!t)return;let e=async i=>{if(i){let s=await Le({mountIfMissing:!0});s&&typeof s.setInteractiveEditingEnabled=="function"&&s.setInteractiveEditingEnabled(!0)}else br();At(t,i)};e(!1);let r=t.closest(".pds-live-edit-toggle-nav")||t;t.__pdsLiveEditActionHandler&&r.removeEventListener("click",t.__pdsLiveEditActionHandler);let n=async i=>{let s=i.target?.closest?.("[data-pds-live-action]");if(!s)return;i.preventDefault();let p=String(s.dataset.pdsLiveAction||"");if(p==="toggle"){let d=await Le({mountIfMissing:!1}),c=Ln(d);await e(!c);return}if(p==="open-settings"){let d=await Le({mountIfMissing:!0,requiredMethod:"openDesignSettings",interactive:!1});d&&typeof d.setInteractiveEditingEnabled=="function"&&d.setInteractiveEditingEnabled(!1),d&&typeof d.openDesignSettings=="function"&&(At(t,!1),await d.openDesignSettings());return}if(p==="reset-config"){let d=await Le({mountIfMissing:!0,requiredMethod:"resetConfig",interactive:!1});At(t,!1),d&&typeof d.resetConfig=="function"&&await d.resetConfig();return}};t.__pdsLiveEditActionHandler=n,r.addEventListener("click",n),t.__pdsLiveEditDisableHandler&&document.removeEventListener("pds:live-edit:disable",t.__pdsLiveEditDisableHandler),t.__pdsLiveEditEnableHandler&&document.removeEventListener("pds:live-edit:enable",t.__pdsLiveEditEnableHandler);let o=()=>{e(!1)},a=()=>{e(!0)};t.__pdsLiveEditDisableHandler=o,document.addEventListener("pds:live-edit:disable",o),t.__pdsLiveEditEnableHandler=a,document.addEventListener("pds:live-edit:enable",a)}function jn(){if(typeof window>"u"||!window.localStorage)return null;try{let t=window.localStorage.getItem("pure-ds-config");if(!t)return null;let e=JSON.parse(t);if(e&&("preset"in e||"design"in e))return e}catch{return null}return null}function Rt(t={},e={}){if(!e||typeof e!="object")return t;let r=Array.isArray(t)?[...t]:{...t};for(let[n,o]of Object.entries(e))o&&typeof o=="object"&&!Array.isArray(o)?r[n]=Rt(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o;return r}function Bn(t){let e=jn();if(!e||!t||typeof t!="object")return t;let r=e.preset,n=e.design&&typeof e.design=="object"?e.design:null;if(!r&&!n)return t;let o="preset"in t||"design"in t||"enhancers"in t,a={...t};if(r&&(a.preset=r),n)if(o){let i=t.design&&typeof t.design=="object"?t.design:{};a.design=Rt(i,n)}else a=Rt(t,n);return a}function On(t,e={}){let{hideCategory:r=!0,itemGrid:n="45px 1fr",includeIncompatible:o=!0,disableIncompatible:a=!0,categoryName:i="Presets",theme:s,onSelect:p,iconHandler:d}=e||{},c=ye(s??t?.theme),l=m=>{let h=g(m?.id)?.colors||{},f=h?.primary,k=h?.secondary,v=h?.accent;return f&&k&&v?`<span style="display:flex;gap:1px;flex-shrink:0;" aria-hidden="true">
        <span style="display:inline-block;width:10px;height:20px;background-color:${f};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${k};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${v};">&nbsp;</span>
      </span>`:m?.icon?`<pds-icon icon="${m.icon}" size="sm"></pds-icon>`:""},u=()=>{let m=t?.presets||{};return Object.values(m||{}).filter(b=>!!(b?.id||b?.name))},g=m=>m&&u().find(h=>String(h?.id||h?.name)===String(m))||null;return{hideCategory:r,itemGrid:n,iconHandler:typeof d=="function"?d:l,categories:{[i]:{trigger:()=>!0,getItems:(m={})=>{let b=String(m?.search||"").toLowerCase().trim();return u().filter(f=>{let k=String(f?.name||f?.id||"").toLowerCase(),v=String(f?.description||"").toLowerCase(),S=Array.isArray(f?.tags)?f.tags.map($=>String($).toLowerCase()):[];if(b&&!(k.includes(b)||v.includes(b)||S.some(L=>L.includes(b))))return!1;let R=se(f,c);return!(!o&&!R)}).map(f=>{let k=f?.id||f?.name,v=se(f,c),S=zt(f),R=S.length===1?`${S[0]} only`:`Not available in ${c} mode`,$=String(f?.description||"").trim(),L=v?$:$?`${$} - ${R}`:R;return{id:k,text:f?.name||String(k),description:L,icon:"palette",class:!v&&a?"disabled":"",disabled:!v&&a,tooltip:v?"":R}}).sort((f,k)=>String(f.text||"").localeCompare(String(k.text||"")))},action:async m=>{if(!m?.id||m?.disabled)return m?.id;let b=g(m.id);return b?typeof p=="function"?await p({preset:b,selection:m,resolvedTheme:c}):(typeof t?.applyLivePreset=="function"&&await t.applyLivePreset(b.id||m.id),b.id||m.id):m?.id}}}}}async function _n(t,{applyResolvedTheme:e,setupSystemListenerIfNeeded:r,emitConfigChanged:n}){if(fr)return;let[o,a,i]=await Promise.all([Promise.resolve().then(()=>(vt(),rr)),Promise.resolve().then(()=>($e(),Ht)),Promise.resolve().then(()=>(Tt(),Ge))]),s=o?.default||o?.ontology,p=o?.findComponentForElement,d=a?.enums;t.ontology=s,t.findComponentForElement=p,t.enums=d,t.common=i||{},t.presets=K,t.configRelations=Jt,t.configSpec=Kt,t.configEditorMetadata=Xt,t.configFormSchema=er,t.buildConfigFormSchema=ue,t.getConfigEditorMetadata=Ee,t.enhancerMetadata=sr,t.applyStyles=function(c){let l=c||V.instance;or(l),typeof n=="function"&&n({mode:"live",source:"live:styles-applied"})},t.adoptLayers=function(c,l,u){return _e(c,l,u,V.instance)},t.adoptPrimitives=function(c,l){return Oe(c,l,V.instance)},t.getGenerator=async function(){return V},t.buildPresetOmniboxSettings=function(c={}){return On(t,c)},t.applyLivePreset=async function(c,l={}){if(!c)return!1;if(!t.registry?.isLive)return console.warn("PDS.applyLivePreset is only available in live mode."),!1;let u=t.currentConfig||{},{design:g,preset:m,...b}=u,h={...structuredClone(ie(b)),preset:c},f=$t(h,{},{presets:K,defaultLog:yt,validateDesignConfig:ht,validateInitConfig:bt}),k=ye(t.theme);if(!se(f.generatorConfig.design,k)){let $=f.presetInfo?.name||f.generatorConfig?.design?.name||c;console.warn(`PDS theme "${k}" not supported by preset "${$}".`)}u.theme&&!f.generatorConfig.theme&&(f.generatorConfig.theme=u.theme);let v=new V(f.generatorConfig);if(f.generatorConfig.design?.typography)try{await wt(f.generatorConfig.design.typography)}catch($){f.generatorConfig?.log?.("warn","Failed to load some fonts from Google Fonts:",$)}t.applyStyles?.(v);let S=f.presetInfo||{id:c,name:c};if(t.currentPreset=S,t.currentConfig=Object.freeze({...u,preset:f.generatorConfig.preset,design:structuredClone(f.generatorConfig.design),theme:f.generatorConfig.theme||u.theme}),t.configEditorMetadata=Ee(f.generatorConfig.design),t.configFormSchema=ue(f.generatorConfig.design),l?.persist!==!1&&typeof window<"u"){let $="pure-ds-config";try{let L=localStorage.getItem($),P=L?JSON.parse(L):null,E={...P&&typeof P=="object"?P:{},preset:S.id||c,design:structuredClone(f.generatorConfig.design||{})};localStorage.setItem($,JSON.stringify(E))}catch(L){f.generatorConfig?.log?.("warn","Failed to store preset:",L)}}return!0},Object.getOwnPropertyDescriptor(t,"compiled")||Object.defineProperty(t,"compiled",{get(){return t.registry?.isLive&&V.instance?V.instance.compiled:null},enumerable:!0,configurable:!1}),t.preloadCritical=function(c,l={}){if(typeof window>"u"||!document.head||!c)return;let{theme:u,layers:g=["tokens"]}=l;try{let m=u||"light";(u==="system"||!u)&&(m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",m);let b=c.design?{...c,theme:m}:{design:c,theme:m},h=new V(b),f=g.map(k=>{try{return h.css?.[k]||""}catch{return""}}).filter(k=>k.trim()).join(`
`);if(f){let k=document.head.querySelector("style[data-pds-preload]");k&&k.remove();let v=document.createElement("style");v.setAttribute("data-pds-preload",""),v.textContent=f,document.head.insertBefore(v,document.head.firstChild)}}catch(m){console.warn("PDS preload failed:",m)}},fr=!0}async function Dn(t,e,{emitReady:r,emitConfigChanged:n,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}){if(!e||typeof e!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");if(e=Bn(e),await _n(t,{applyResolvedTheme:o,setupSystemListenerIfNeeded:a,emitConfigChanged:n}),We(t),typeof document<"u"&&document.adoptedStyleSheets){let u=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(m=>m._pdsFouc)){let m=new CSSStyleSheet;m.replaceSync(u),m._pdsFouc=!0,document.adoptedStyleSheets=[m,...document.adoptedStyleSheets]}}catch(g){if(console.warn("Constructable stylesheets not supported, using <style> tag fallback:",g),!document.head.querySelector("style[data-pds-fouc]")){let b=document.createElement("style");b.setAttribute("data-pds-fouc",""),b.textContent=u,document.head.insertBefore(b,document.head.firstChild)}}}let i=e.applyGlobalStyles??!0,s=e.manageTheme??!0,p=e.themeStorageKey??"pure-ds-theme",d=e.preloadStyles??!1,c=e.criticalLayers??["tokens","primitives"],l=e&&e.autoDefine||null;try{let{resolvedTheme:u}=He({manageTheme:s,themeStorageKey:p,applyResolvedTheme:o,setupSystemListenerIfNeeded:a}),g=$t(e,{},{presets:K,defaultLog:yt,validateDesignConfig:ht,validateInitConfig:bt});if(s&&!se(g.generatorConfig.design,u)){let E=g.presetInfo?.name||g.generatorConfig?.design?.name||g.generatorConfig?.preset||"current preset";console.warn(`PDS theme "${u}" not supported by preset "${E}".`)}let m=g.enhancers,{log:b,...h}=g.generatorConfig,f=structuredClone(h);f.log=b,s&&(f.theme=u);let k=new V(f);if(f.design?.typography)try{await wt(f.design.typography)}catch(E){f?.log?.("warn","Failed to load some fonts from Google Fonts:",E)}if(d&&typeof window<"u"&&document.head)try{let E=c.map(A=>{try{return k.css?.[A]||""}catch(N){return f?.log?.("warn",`Failed to generate critical CSS for layer "${A}":`,N),""}}).filter(A=>A.trim()).join(`
`);if(E){let A=document.head.querySelector("style[data-pds-critical]");A&&A.remove();let N=document.createElement("style");N.setAttribute("data-pds-critical",""),N.textContent=E;let C=document.head.querySelector('meta[charset], meta[name="viewport"]');C?C.parentNode.insertBefore(N,C.nextSibling):document.head.insertBefore(N,document.head.firstChild)}}catch(E){f?.log?.("warn","Failed to preload critical styles:",E)}t.registry.setLiveMode(),g.presetInfo?.name?f?.log?.("log",`PDS live with preset "${g.presetInfo.name}"`):f?.log?.("log","PDS live with custom config"),i&&(t.applyStyles?.(V.instance),typeof window<"u"&&setTimeout(()=>{let E=document.head.querySelector("style[data-pds-critical]");E&&E.remove();let A=document.head.querySelector("style[data-pds-preload]");A&&A.remove();let N=document.getElementById("pds-runtime-stylesheet");N&&N.remove()},100));let v=be(e,{resolvePublicAssetURL:me}),S;l&&l.baseURL?S=fe(he(l.baseURL,{preferModule:!1})):S=`${v}components/`;let R=null,$=[];try{let E=await Ue({autoDefineBaseURL:S,autoDefinePreload:l&&Array.isArray(l.predefine)&&l.predefine||[],autoDefineMapper:l&&typeof l.mapper=="function"&&l.mapper||null,enhancers:m,autoDefineOverrides:l||null,autoDefinePreferModule:!(l&&l.baseURL)},{baseEnhancers:ir});R=E.autoDefiner,$=E.mergedEnhancers||[]}catch(E){f?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",E)}let L=k?.options||f,P=ie(e);if(t.currentConfig=Object.freeze({mode:"live",...structuredClone(P),design:structuredClone(g.generatorConfig.design),preset:g.generatorConfig.preset,theme:u,enhancers:$}),t.configEditorMetadata=Ee(g.generatorConfig.design),t.configFormSchema=ue(g.generatorConfig.design),typeof n=="function"&&n({mode:"live",source:"live:config-applied",preset:g.generatorConfig.preset}),typeof document<"u")try{e?.liveEdit?setTimeout(()=>{Nn()},0):In()}catch(E){f?.log?.("warn","Live editor toggle failed to start:",E)}return r({mode:"live",generator:k,config:L,theme:u,autoDefiner:R}),{generator:k,config:L,theme:u,autoDefiner:R}}catch(u){throw t.dispatchEvent(new CustomEvent("pds:error",{detail:{error:u}})),u}}function Wn(t){let e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):.5}function Hn(t){return Array.isArray(t)?t.map(e=>e?{severity:String(e.severity||"info").toLowerCase(),message:String(e.message||""),path:e.path?String(e.path):""}:null).filter(e=>e&&e.message):[]}function O(t={}){let e=String(t.source||"unknown"),r=String(t.type||"generic"),n=Wn(t.confidence),o=Hn(t.issues),a=t.designPatch&&typeof t.designPatch=="object"?t.designPatch:{},i=t.template&&typeof t.template=="object"?t.template:null;return{source:e,type:r,confidence:n,issues:o,designPatch:a,template:i,meta:t.meta&&typeof t.meta=="object"?t.meta:{}}}function Un(t){return!!(t&&typeof t=="object"&&"source"in t&&"type"in t&&"confidence"in t&&"issues"in t&&"designPatch"in t)}var qn="../templates/templates.json",yr="/assets/pds/templates/templates.json",Gn=["public","assets","pds","templates","templates.json"],Vn=["..","..","..","public","assets","pds","templates","templates.json"],Je=null;function vr(){return!!(typeof process<"u"&&process?.versions?.node)}function Yn(t={}){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"Template").trim(),description:String(t.description||"").trim(),icon:String(t.icon||"layout").trim(),file:String(t.file||"").trim(),tags:Array.isArray(t.tags)?t.tags.map(e=>String(e)):[]}}function Ke(t={},e={}){let n=(Array.isArray(t)?t:Array.isArray(t?.templates)?t.templates:[]).map(Yn).filter(o=>o.id&&o.file);return{version:t?.version||"1",templates:n,__catalogURL:e.catalogURL||null,__catalogFilePath:e.catalogFilePath||null}}async function Jn(t={}){let r=[t.catalogURL||globalThis?.PDS?.currentConfig?.templateCatalogURL,qn,yr].filter(Boolean);for(let n of r)try{let o=new URL(n,import.meta.url).href,a=await fetch(o,{credentials:"same-origin"});if(!a.ok)continue;let i=await a.json();return Ke(i,{catalogURL:o})}catch{}return Ke({templates:[]})}async function Kn(t={}){let e="node:fs/promises",r="node:path",n="node:url",[{readFile:o},a,{fileURLToPath:i}]=await Promise.all([import(e),import(r),import(n)]),s=[];t.catalogPath&&s.push(a.resolve(t.catalogPath)),s.push(a.resolve(process.cwd(),...Gn));let p=a.dirname(i(import.meta.url));s.push(a.resolve(p,...Vn));for(let d of s)try{let c=await o(d,"utf8"),l=JSON.parse(c);return Ke(l,{catalogFilePath:d})}catch{}return Ke({templates:[]})}async function Zn(t,e){if(!t?.file)return"";if(!vr()){let p=e?.__catalogURL||yr,d=new URL(t.file,p).href,c=await fetch(d,{credentials:"same-origin"});if(!c.ok)throw new Error(`Template file not found: ${t.file}`);return(await c.text()).trim()}let r="node:fs/promises",n="node:path",[{readFile:o},a]=await Promise.all([import(r),import(n)]),i=e?.__catalogFilePath?a.dirname(e.__catalogFilePath):a.resolve(process.cwd(),"public","assets","pds","templates"),s=a.resolve(i,t.file);return(await o(s,"utf8")).trim()}async function Ze(t={}){return Je&&!t.forceReload||(Je=vr()?await Kn(t):await Jn(t)),Je}async function xr(t={}){return(await Ze(t)).templates.map(({id:r,name:n,description:o,icon:a,file:i,tags:s})=>({id:r,name:n,description:o,icon:a,file:i,tags:s}))}async function Qn(t,e={}){let r=await Ze(e),n=r.templates.find(a=>a.id===t)||null;if(!n)return null;let o=await Zn(n,r);return{...n,html:o}}async function wr(t,e={}){let r=await Qn(t,e);return r?O({source:"template",type:"template",confidence:1,template:{id:r.id,name:r.name,html:r.html,icon:r.icon,description:r.description}}):O({source:"template",type:"template",confidence:0,issues:[{severity:"error",message:`Unknown template: ${t}`}]})}var kr={version:"tw2pds-layout-v4",summary:"Deterministic Tailwind\u2192PDS conversion rules focused on layout intent, semantic primitive mapping, and richer import-* fallback coverage.",governance:[{id:"layout.utilities.grid",controls:["grid","grid-cols-*","grid-auto-*"],note:"When false, grid mappings are skipped."},{id:"layout.utilities.flex",controls:["flex","flex-*","items-*","justify-*","grow"],note:"When false, flex mappings are skipped."},{id:"layout.utilities.spacing",controls:["gap-*","stack-*"],note:"When false, spacing mappings are skipped."},{id:"layout.utilities.container",controls:["container","max-w-*"],note:"When false, container mappings are skipped."}],nonPdsClassPatterns:["^group(?:[/:].*)?$","^layout-container$"],neverFallbackTags:["table","thead","tbody","tfoot","tr","th","td","caption","colgroup","col"],directMappings:[{id:"layout.flex.base",tw:"flex",pds:["flex"],gate:"flex"},{id:"layout.flex.inline",tw:"inline-flex",pds:["flex"],gate:"flex"},{id:"layout.flex.row",tw:"flex-row",pds:["flex-row"],gate:"flex"},{id:"layout.flex.col",tw:"flex-col",pds:["flex-col"],gate:"flex"},{id:"layout.flex.wrap",tw:"flex-wrap",pds:["flex-wrap"],gate:"flex"},{id:"layout.flex.grow",tw:"grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow.tw",tw:"flex-grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow1",tw:"flex-1",pds:["grow"],gate:"flex"},{id:"layout.items.start",tw:"items-start",pds:["items-start"],gate:"flex"},{id:"layout.items.center",tw:"items-center",pds:["items-center"],gate:"flex"},{id:"layout.items.end",tw:"items-end",pds:["items-end"],gate:"flex"},{id:"layout.items.stretch",tw:"items-stretch",pds:["items-stretch"],gate:"flex"},{id:"layout.items.baseline",tw:"items-baseline",pds:["items-baseline"],gate:"flex"},{id:"layout.justify.start",tw:"justify-start",pds:["justify-start"],gate:"flex"},{id:"layout.justify.center",tw:"justify-center",pds:["justify-center"],gate:"flex"},{id:"layout.justify.end",tw:"justify-end",pds:["justify-end"],gate:"flex"},{id:"layout.justify.between",tw:"justify-between",pds:["justify-between"],gate:"flex"},{id:"layout.justify.around",tw:"justify-around",pds:["justify-around"],gate:"flex"},{id:"layout.justify.evenly",tw:"justify-evenly",pds:["justify-evenly"],gate:"flex"},{id:"layout.grid.base",tw:"grid",pds:["grid"],gate:"grid"},{id:"layout.grid.cols.1",tw:"grid-cols-1",pds:["grid-cols-1"],gate:"grid"},{id:"layout.grid.cols.2",tw:"grid-cols-2",pds:["grid-cols-2"],gate:"grid"},{id:"layout.grid.cols.3",tw:"grid-cols-3",pds:["grid-cols-3"],gate:"grid"},{id:"layout.grid.cols.4",tw:"grid-cols-4",pds:["grid-cols-4"],gate:"grid"},{id:"layout.grid.cols.6",tw:"grid-cols-6",pds:["grid-cols-6"],gate:"grid"},{id:"layout.container",tw:"container",pds:["container"],gate:"container"},{id:"intent.surface.shadow",tw:"shadow",pds:["surface-elevated"]},{id:"intent.surface.shadow-md",tw:"shadow-md",pds:["surface-elevated"]},{id:"intent.surface.shadow-lg",tw:"shadow-lg",pds:["surface-elevated"]},{id:"intent.surface.base",tw:"bg-white",pds:["surface-base"]},{id:"typography.align.center",tw:"text-center",pds:["text-center"]},{id:"typography.align.left",tw:"text-left",pds:["text-left"]},{id:"typography.align.right",tw:"text-right",pds:["text-right"]},{id:"typography.text.muted.gray500",tw:"text-gray-500",pds:["text-muted"]},{id:"typography.text.muted.slate500",tw:"text-slate-500",pds:["text-muted"]}],ignoredPatterns:[{id:"style.color",pattern:"^(?:text|from|to|via|decoration|accent|caret)-|^bg-(?!cover$|center$|no-repeat$)",reason:"Visual style token skipped in favor of semantic PDS styling."},{id:"style.radius-border-shadow",pattern:"^(?:rounded|ring|border|shadow|outline)-?",reason:"Surface/shape inferred at primitive level."},{id:"style.typography",pattern:"^(?:font|leading|tracking|uppercase|lowercase|capitalize)-?",reason:"Typography atomic utilities are skipped."},{id:"style.effects",pattern:"^(?:opacity|blur|backdrop|drop-shadow|mix-blend|filter)-",reason:"Visual effects skipped unless mapped to a PDS utility."},{id:"style.transitions",pattern:"^(?:transition|duration|ease|delay|animate)-",reason:"Motion is system-defined in PDS."},{id:"style.spacing.atomic",pattern:"^(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-",reason:"Atomic spacing skipped; structural spacing intent is mapped."},{id:"style.positioning.atomic",pattern:"^(?:absolute|relative|fixed|sticky|inset(?:-[xy])?|top|right|bottom|left|z|translate(?:-[xy])?|-translate-[xy])(?:-|$)",reason:"Atomic positioning/offset utilities are skipped so PDS primitives and layout utilities control placement."}],intentRules:[{id:"intent.layout.responsive-grid-to-auto",summary:"Collapse responsive grid-cols patterns (including base+md two-step patterns) to best-fit grid-auto-*"},{id:"intent.layout.mobile-stack",summary:"Map flex-col + md/lg:flex-row to mobile-stack"},{id:"intent.component.card",summary:"Infer card/surface classes from rounded+shadow+surface signals"},{id:"intent.component.card.normalize",summary:"Detect Tailwind card utility clusters and normalize them to PDS card and surface variants."},{id:"intent.component.button",summary:"Infer btn-primary / btn-outline / icon-only from CTA patterns"},{id:"intent.component.button.normalize",summary:"Prevents import-* style classes on button-like elements and applies PDS button variants/sizes."},{id:"intent.component.button.layout-grow",summary:"Preserve CTA row width intent on button-like elements by mapping w-full/flex-1 to grow."},{id:"intent.icon.color-preserve",summary:"Preserve icon color intent by mapping Tailwind text color utilities on icon-like elements to tokenized import-* classes."},{id:"intent.component.badge.normalize",summary:"Detects Tailwind badge/pill utility clusters and normalizes them to PDS badge primitives/variants."},{id:"intent.typography.heading-semantic",summary:"Removes Tailwind heading typography/color utilities so heading semantics and PDS defaults control typography."},{id:"intent.surface.footer-inverse",summary:"Use surface-inverse for footers with explicit background intent"},{id:"intent.typography.link-treatment",summary:"Apply minimal link treatment for hover/transition-tailwind anchors"},{id:"intent.typography.link-active-preserve",summary:"Preserve anchor text color intent (including active menu states) by mapping Tailwind text utilities to tokenized import-* classes."},{id:"intent.typography.metric-paragraph-to-div",summary:"Normalize metric display lines from paragraph tags to div tags to avoid default paragraph margins in compact stat layouts."},{id:"intent.typography.metric-pair-no-stack",summary:"When a compact metric container has two consecutive typography lines, remove stack-sm so spacing follows Tailwind preflight no-margin assumptions."},{id:"intent.typography.semantic-heading-from-scale",summary:"Map large bold typography scales (text-2xl/text-3xl/text-4xl) to semantic heading tags when possible."},{id:"intent.typography.bold-to-strong",summary:"Prefer semantic strong tags for bold inline text intent instead of utility-only font-weight classes."},{id:"intent.preflight.tailwind-runtime-detected",summary:"Detect Tailwind runtime CSS injection and translate key preflight intent"},{id:"intent.preflight.list-reset",summary:"Preserve Tailwind list-reset preflight behavior via scoped fallback class"},{id:"intent.preflight.anchor-reset",summary:"Preserve Tailwind anchor reset preflight behavior via scoped fallback class"},{id:"table.strict-tags.no-classes",summary:"Never emit classes for semantic table tags (table/thead/tbody/tfoot/tr/th/td/caption/colgroup/col)"},{id:"intent.form.nested-label",summary:"Convert sibling label+control pairs into nested labels"},{id:"fallback.import-style",summary:"Generate import-* classes + local style block for unmapped utility styles"}],gapScaleMap:{"gap-0":"gap-0","gap-1":"gap-xs","gap-2":"gap-sm","gap-3":"gap-sm","gap-4":"gap-md","gap-5":"gap-md","gap-6":"gap-lg","gap-7":"gap-lg","gap-8":"gap-xl","gap-10":"gap-xl","gap-12":"gap-xl"},maxWidthMap:{"max-w-xs":"max-w-sm","max-w-sm":"max-w-sm","max-w-md":"max-w-md","max-w-lg":"max-w-lg","max-w-xl":"max-w-xl","max-w-2xl":"max-w-xl","max-w-3xl":"max-w-xl","max-w-4xl":"max-w-xl","max-w-5xl":"max-w-xl","max-w-6xl":"max-w-xl","max-w-7xl":"max-w-xl"},tailwindSizeScale:{"0":"var(--spacing-0)","0.5":"0.125rem","1":"var(--spacing-1)","1.5":"0.375rem","2":"var(--spacing-2)","2.5":"0.625rem","3":"var(--spacing-3)","3.5":"0.875rem","4":"var(--spacing-4)","5":"var(--spacing-5)","6":"var(--spacing-6)","7":"var(--spacing-7)","8":"var(--spacing-8)","9":"var(--spacing-9)","10":"var(--spacing-10)","11":"var(--spacing-11)","12":"var(--spacing-12)","14":"3.5rem","16":"4rem","20":"5rem","24":"6rem","28":"7rem","32":"8rem","36":"9rem","40":"10rem","48":"12rem"},tailwindShadeScale:["50","100","200","300","400","500","600","700","800","900"],defaultTailwindShade:"500",importStyleRules:{"mx-auto":"margin-left:auto;margin-right:auto","ml-auto":"margin-left:auto","mr-auto":"margin-right:auto","w-full":"width:100%","w-auto":"width:auto","h-full":"height:100%","h-48":"height:12rem","h-2.5":"height:0.625rem","h-10":"height:var(--spacing-10)","h-2":"height:var(--spacing-2)","w-2":"width:var(--spacing-2)","size-8":"width:var(--spacing-8);height:var(--spacing-8)","size-10":"width:var(--spacing-10);height:var(--spacing-10)","size-full":"width:100%;height:100%","min-h-screen":"min-height:100vh","overflow-hidden":"overflow:hidden","overflow-x-hidden":"overflow-x:hidden","overflow-x-auto":"overflow-x:auto","whitespace-nowrap":"white-space:nowrap",hidden:"display:none",block:"display:block",truncate:"overflow:hidden;text-overflow:ellipsis;white-space:nowrap","justify-items-center":"justify-items:center","justify-items-start":"justify-items:start","justify-items-end":"justify-items:end","justify-items-stretch":"justify-items:stretch","grid-flow-col":"grid-auto-flow:column","aspect-square":"aspect-ratio:1 / 1","bg-center":"background-position:center","bg-cover":"background-size:cover","bg-no-repeat":"background-repeat:no-repeat","transition-colors":"transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms"},importStyleDynamicRules:[{id:"fallback.import-style.gap-scale",pattern:"^gap-(\\d+)$",summary:"Converts gap scale utilities (including responsive variants like md:gap-6) to generated import-* fallback classes."},{id:"fallback.import-style.min-width-arbitrary",pattern:"^min-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-width utilities (e.g. min-w-[600px]) to generated import-* fallback classes."},{id:"fallback.import-style.max-width-arbitrary",pattern:"^max-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary max-width utilities (e.g. max-w-[480px]) to generated import-* fallback classes."},{id:"fallback.import-style.min-height-arbitrary",pattern:"^min-h-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-height utilities (e.g. min-h-[180px]) to generated import-* fallback classes."},{id:"fallback.import-style.grid-rows-arbitrary",pattern:"^grid-rows-\\[[^\\]]+\\]$",summary:"Converts arbitrary grid template row utilities (e.g. grid-rows-[1fr_auto]) to generated import-* fallback classes."},{id:"fallback.import-style.size-scale",pattern:"^size-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts size scale/arbitrary utilities into width+height fallback declarations."},{id:"fallback.import-style.width-height-scale",pattern:"^[wh]-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts width/height scale and arbitrary utilities to import-* classes."},{id:"fallback.import-style.spacing",pattern:"^-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(.+)$",summary:"Converts spacing utilities to directional padding/margin fallback declarations, including responsive variants."},{id:"fallback.import-style.text-size",pattern:"^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$",summary:"Converts common text size utilities to import-* font-size declarations."},{id:"fallback.import-style.font-weight",pattern:"^font-(normal|medium|semibold|bold|extrabold|black)$",summary:"Converts common font weight utilities to import-* font-weight declarations."},{id:"fallback.import-style.leading-tracking",pattern:"^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|tighter|wide|wider|widest)$",summary:"Converts line-height and letter-spacing utilities to import-* declarations for typography fidelity."},{id:"fallback.import-style.bg-tokenized",pattern:"^bg-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind background color utilities by mapping families like blue/purple/green/red to PDS semantic tokens."},{id:"fallback.import-style.bg-semantic",pattern:"^bg-(primary|secondary|accent)$",summary:"Safeguards semantic background utilities by mapping bg-primary/bg-secondary/bg-accent to PDS color tokens."},{id:"fallback.import-style.text-tokenized",pattern:"^text-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind text color utilities by mapping common families to PDS semantic tokens."},{id:"fallback.import-style.rounded",pattern:"^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$",summary:"Safeguards rounded utilities (including rounded-t-sm) by mapping to PDS radius tokens."},{id:"fallback.import-style.overlay-alpha",pattern:"^bg-black\\/(\\d{1,3})$",summary:"Converts alpha black overlay classes (e.g. bg-black/50) to tokenized color-mix background overlays."},{id:"fallback.import-style.text-inverse",pattern:"^text-white$",summary:"Preserves white foreground intent for text-on-image use cases using inverse-compatible tokens."},{id:"fallback.import-style.bg-arbitrary",pattern:"^bg-\\[[^\\]]+\\]$",summary:"Converts arbitrary background colors to import-* fallback classes when values are CSS-safe."},{id:"fallback.import-style.text-arbitrary",pattern:"^text-\\[[^\\]]+\\]$",summary:"Converts arbitrary text colors to import-* fallback classes when values are CSS-safe."}]};$e();Tt();var Pt=class extends EventTarget{},T=new Pt;T.initializing=!1;T.currentPreset=null;T.debug=!1;var Qe=null,Xe=null,et=null,tt=null;function rt(t,e){return e&&typeof e=="string"?e:`${be(T.currentConfig||{},{resolvePublicAssetURL:me})}core/${t}`}async function eo(){return Array.isArray(T.defaultEnhancers)&&T.defaultEnhancers.length>0?T.defaultEnhancers:(tt||(tt=import(rt("pds-enhancers.js",T.currentConfig?.enhancersURL)).then(e=>{let r=Array.isArray(e?.defaultPDSEnhancers)?e.defaultPDSEnhancers:[];return T.defaultEnhancers=r,r}).catch(e=>{throw tt=null,e})),tt)}async function to(){return typeof T.ask=="function"&&T.ask!==$r?T.ask:(Xe||(Xe=import(rt("pds-ask.js",T.currentConfig?.askURL)).then(e=>{let r=e?.ask;if(typeof r!="function")throw new Error("Failed to load ask helper");return T.ask=r,r}).catch(e=>{throw Xe=null,e})),Xe)}async function Fe(){return typeof T.toast=="function"&&T.toast!==ve?T.toast:(et||(et=import(rt("pds-toast.js",T.currentConfig?.toastURL)).then(e=>{let r=e?.toast;if(typeof r!="function")throw new Error("Failed to load toast helper");return T.toast=r,r}).catch(e=>{throw et=null,e})),et)}async function $r(...t){return(await to())(...t)}async function ve(...t){return(await Fe())(...t)}ve.success=async(...t)=>(await Fe()).success(...t);ve.error=async(...t)=>(await Fe()).error(...t);ve.warning=async(...t)=>(await Fe()).warning(...t);ve.info=async(...t)=>(await Fe()).info(...t);var Sr=function(t="log",e,...r){let n=!!(T.registry&&!T.registry.isLive),o=(this?.debug||this?.design?.debug||T.debug||!1)===!0;if(n){if(!T.debug)return}else if(!o&&t!=="error"&&t!=="warn")return;let a=console[t]||console.log;r.length>0?a(e,...r):a(e)};function It(t){if(t==null)return t;if(typeof t=="function")return;if(typeof t!="object")return t;if(Array.isArray(t))return t.map(r=>It(r)).filter(r=>r!==void 0);let e={};for(let[r,n]of Object.entries(t)){let o=It(n);o!==void 0&&(e[r]=o)}return e}async function ro(t,e={}){if(e?.runtimeConfig===!1||typeof fetch!="function")return null;let r=e?.runtimeConfigURL||`${t}pds-runtime-config.json`;try{let n=await fetch(r,{cache:"no-store"});return n.ok?await n.json():null}catch{return null}}T.registry=ge;T.enums=y;T.adoptLayers=_e;T.adoptPrimitives=Oe;T.parse=Et;T.createStylesheet=ar;T.isLiveMode=()=>ge.isLive;T.ask=$r;T.toast=ve;T.common=Ge;T.AutoComplete=null;T.loadAutoComplete=async()=>{if(T.AutoComplete&&typeof T.AutoComplete.connect=="function")return T.AutoComplete;let t=rt("pds-autocomplete.js",T.currentConfig?.autoCompleteURL);return Qe||(Qe=import(t).then(e=>{let r=e?.AutoComplete||e?.default?.AutoComplete||e?.default||null;if(!r)throw new Error("AutoComplete export not found in module");return T.AutoComplete=r,r}).catch(e=>{throw Qe=null,e})),Qe};function Cr(t){let e=typeof CustomEvent=="function";try{let r=e?new CustomEvent("pds:ready",{detail:t}):new Event("pds:ready");T.dispatchEvent(r)}catch{}if(typeof document<"u")if(e){let r={detail:t,bubbles:!0,composed:!0};try{document.dispatchEvent(new CustomEvent("pds:ready",r))}catch{}try{document.dispatchEvent(new CustomEvent("pds-ready",r))}catch{}}else{try{document.dispatchEvent(new Event("pds:ready"))}catch{}try{document.dispatchEvent(new Event("pds-ready"))}catch{}}}function Mr(t={}){let e=typeof CustomEvent=="function",r={at:Date.now(),...t};try{let n=e?new CustomEvent("pds:config-changed",{detail:r}):new Event("pds:config-changed");T.dispatchEvent(n)}catch{}if(typeof document<"u")if(e){let n={detail:r,bubbles:!0,composed:!0};try{document.dispatchEvent(new CustomEvent("pds:config-changed",n))}catch{}}else try{document.dispatchEvent(new Event("pds:config-changed"))}catch{}}var Ft="pure-ds-theme",le=null,Re=null;function Nt(t){try{if(typeof document>"u")return;let e="light";t?t==="system"?e=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e=t:e=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",document.documentElement.setAttribute("data-theme",e)}catch{}}function jt(t){try{if(le&&Re){try{typeof le.removeEventListener=="function"?le.removeEventListener("change",Re):typeof le.removeListener=="function"&&le.removeListener(Re)}catch{}le=null,Re=null}if(t==="system"&&typeof window<"u"&&window.matchMedia){let e=window.matchMedia("(prefers-color-scheme: dark)"),r=n=>{let o=n?.matches===void 0?e.matches:n.matches;try{let a=o?"dark":"light";document.documentElement.setAttribute("data-theme",a),T.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:a,source:"system"}}))}catch{}};le=e,Re=r,typeof e.addEventListener=="function"?e.addEventListener("change",r):typeof e.addListener=="function"&&e.addListener(r)}}catch{}}Object.defineProperty(T,"theme",{get(){try{return typeof window>"u"?null:localStorage.getItem(Ft)||null}catch{return null}},set(t){try{if(typeof window>"u")return;let e=T.currentConfig?.design||null,r=ye(t);if(e&&!se(e,r)){let n=e?.name||T.currentPreset?.name||T.currentConfig?.preset||"current preset";console.warn(`PDS theme "${r}" not supported by preset "${n}".`),T.dispatchEvent(new CustomEvent("pds:theme:blocked",{detail:{theme:t,resolvedTheme:r,preset:n}}));return}t==null?localStorage.removeItem(Ft):localStorage.setItem(Ft,t),Nt(t),jt(t),T.dispatchEvent(new CustomEvent("pds:theme:changed",{detail:{theme:t,source:"api"}}))}catch{}}});T.defaultEnhancers=[];async function no(t){let e=t&&t.mode||"live",{mode:r,...n}=t||{};if(e==="static")return oo(n);let o=be(n,{resolvePublicAssetURL:me}),a=n?.managerURL||n?.public?.managerURL||n?.manager?.url||new URL("core/pds-manager.js",o).href||new URL("./pds-manager.js",import.meta.url).href,{startLive:i}=await import(a);return i(T,n,{emitReady:Cr,emitConfigChanged:Mr,applyResolvedTheme:Nt,setupSystemListenerIfNeeded:jt})}T.start=no;async function oo(t){if(!t||typeof t!="object")throw new Error("PDS.start({ mode: 'static', ... }) requires a valid configuration object");let e=t.applyGlobalStyles??!0,r=t.manageTheme??!0,n=t.themeStorageKey??"pure-ds-theme",o=t.staticPaths??{},a=be(t,{resolvePublicAssetURL:me}),i=t&&t.autoDefine||null,s;i&&i.baseURL?s=fe(he(i.baseURL,{preferModule:!1})):s=`${a}components/`;let p=i&&Array.isArray(i.predefine)&&i.predefine||[],d=i&&typeof i.mapper=="function"&&i.mapper||null;try{We(T);let{resolvedTheme:c}=He({manageTheme:r,themeStorageKey:n,applyResolvedTheme:Nt,setupSystemListenerIfNeeded:jt}),l=await ro(a,t),u=Array.isArray(t?.enhancers)?t.enhancers:t?.enhancers&&typeof t.enhancers=="object"?Object.values(t.enhancers):[],g=l?.config?{...l.config,...t,design:t?.design||l.config.design,preset:t?.preset||l.config.preset}:{...t},m={tokens:`${a}styles/pds-tokens.css.js`,primitives:`${a}styles/pds-primitives.css.js`,components:`${a}styles/pds-components.css.js`,utilities:`${a}styles/pds-utilities.css.js`,styles:`${a}styles/pds-styles.css.js`},b=l?.paths||{};if(o={...m,...b,...o},T.registry.setStaticMode(o),e&&typeof document<"u")try{let v=await T.registry.getStylesheet("styles");if(v){v._pds=!0;let S=(document.adoptedStyleSheets||[]).filter(R=>R._pds!==!0);document.adoptedStyleSheets=[...S,v],Mr({mode:"static",source:"static:styles-applied"})}}catch(v){Sr.call(T,"warn","Failed to apply static styles:",v)}let h=null,f=[];try{let v=await eo(),S=await Ue({autoDefineBaseURL:s,autoDefinePreload:p,autoDefineMapper:d,enhancers:u,autoDefineOverrides:i||null,autoDefinePreferModule:!(i&&i.baseURL)},{baseEnhancers:v});h=S.autoDefiner,f=S.mergedEnhancers||[]}catch(v){Sr.call(T,"error","\u274C Failed to initialize AutoDefiner/Enhancers (static):",v)}let k=It(t);return T.currentConfig=Object.freeze({mode:"static",...structuredClone(k),design:structuredClone(g.design||{}),preset:g.preset,theme:c,enhancers:f}),Cr({mode:"static",config:g,theme:c,autoDefiner:h}),{config:g,theme:c,autoDefiner:h}}catch(c){throw T.dispatchEvent(new CustomEvent("pds:error",{detail:{error:c}})),c}}var ao="src/js/pds-live-manager/tailwind-conversion-rules.json",at=["base","sm","md","lg","xl","2xl"];function io(t={}){let e=Array.isArray(t.ignoredPatterns)?t.ignoredPatterns.map(n=>({...n,pattern:n?.pattern instanceof RegExp?n.pattern:new RegExp(String(n?.pattern||""))})):[],r=Array.isArray(t.nonPdsClassPatterns)?t.nonPdsClassPatterns.map(n=>n instanceof RegExp?n:new RegExp(String(n||""))):[];return{...t,ignoredPatterns:e,nonPdsClassPatterns:r}}var U=io(kr),zr=U.version||"tw2pds-layout-v4",so=new Map(U.directMappings.map(t=>[t.tw,t])),Bt=new Map(Object.entries(U.gapScaleMap||{})),Er=new Map(Object.entries(U.maxWidthMap||{})),lo=U.nonPdsClassPatterns||[],co=new Set(U.neverFallbackTags||[]),po={...U.importStyleRules||{}},uo=U.tailwindSizeScale||{},Ot=Array.isArray(U.tailwindShadeScale)?U.tailwindShadeScale.map(t=>String(t)).filter(Boolean):["50","100","200","300","400","500","600","700","800","900"],Tr=Ot.includes(String(U.defaultTailwindShade||""))?String(U.defaultTailwindShade):"500",ot=1.2,go=["container","grid","flex","gap","space","items","justify","content","place","self","col","row","w","h","min","max","p","m","rounded","border","ring","outline","shadow","bg","text","font","leading","tracking","uppercase","lowercase","capitalize","overflow","whitespace","truncate","object","aspect","opacity","blur","backdrop","transition","duration","ease","delay","animate","hidden","block","inline","absolute","relative","fixed","sticky","size"];function Ar(t="",e=""){if(!t||!e)return t;let r=new RegExp(`\\s${e}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`,"gi");return String(t).replace(r,"")}function mo(t="",e=null){let r=String(t||""),n=0;return r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(input)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*?)>/gi,(o,a,i,s,p,d,c,l,u,g,m)=>{if(s!==g)return o;let b=Ar(`${a||""}${p||""}`,"for"),h=`<${c}${l||""} id="${g}"${m||""}>`;return n+=1,`<label${b}>${d}${h}</label>`}),r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(select|textarea)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*)>([\s\S]*?)<\/\6>/gi,(o,a,i,s,p,d,c,l,u,g,m,b)=>{if(s!==g)return o;let h=Ar(`${a||""}${p||""}`,"for"),f=`<${c}${l||""} id="${g}"${m||""}>${b}</${c}>`;return n+=1,`<label${h}>${d}${f}</label>`}),e&&n>0&&(e.labelNestingCount+=n,j(e,`Nested ${n} label/control pairs.`),F(e,"intent.form.nested-label")),r}function fo(t="",e="base"){let r=String(t||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rule";return`import-${e&&e!=="base"?`${e}-`:""}${r}`}function ce(t,e,r,n="base",o=""){if(!t||!e||!r)return"";let a=fo(e,n);if(o){let i=`${n}|${o}`;t.importPseudoStyles.has(i)||t.importPseudoStyles.set(i,new Map),t.importPseudoStyles.get(i).set(a,r)}else n==="base"?t.importBaseStyles.set(a,r):(t.importResponsiveStyles.has(n)||t.importResponsiveStyles.set(n,new Map),t.importResponsiveStyles.get(n).set(a,r));return t.importedStyleCount+=1,a}function we(t=""){return String(t||"").trim().replace(/_/g," ")}function ke(t=""){return!t||/[;{}]/.test(t)?!1:/^[-#(),.%/\sa-zA-Z0-9]+$/.test(t)}function Pe(t=""){let e=String(t||"").trim();if(!e)return null;let r=e.match(/^\[([^\]]+)\]$/);if(r){let n=we(r[1]);return ke(n)?n:null}return uo[e]||null}function ho(t=""){let e=Number(t);if(!Number.isFinite(e))return Tr;let r=String(e);return Ot.includes(r)?r:Ot.reduce((n,o)=>{let a=Math.abs(Number(n)-e);return Math.abs(Number(o)-e)<a?o:n},Tr)}function Ne(t="",e="500"){let r=String(t||"").toLowerCase(),n=ho(e);return["blue","sky","indigo","cyan"].includes(r)?`var(--color-primary-${n})`:["purple","violet","fuchsia"].includes(r)?`var(--color-accent-${n})`:["green","emerald","lime","teal"].includes(r)?`var(--color-success-${n})`:["yellow","amber","warning"].includes(r)?`var(--color-warning-${n})`:["red","rose","pink","orange"].includes(r)?`var(--color-danger-${n})`:["slate","gray","zinc","neutral","stone"].includes(r)?`var(--color-gray-${n})`:""}function Lr(t=""){let e=we(t);return ke(e)&&(/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(e)||/^(?:rgb|hsl)a?\([^)]*\)$/.test(e))?e:""}function ee(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(Boolean)}function bo(t="",e=""){if(!e)return t;let r=String(t||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return`${r} class="${e}"`;let o=n[1]||'"',a=ee(n[2]);a.includes(e)||a.push(e);let i=` class=${o}${a.join(" ")}${o}`;return r.replace(n[0],i)}function yo(t="",e=""){return e?new RegExp(`\\s${e}\\s*=`,"i").test(String(t||"")):!1}function vo(t=""){let e=String(t||"").replace(/[-_]+/g," ").trim();return e?e.replace(/(^|\s)([a-z])/g,(r,n,o)=>`${n}${o.toUpperCase()}`):"Icon button"}function xo(t="",e=null){let r=String(t||"");return r&&r.replace(/<(button|a)([^>]*)>\s*(<pds-icon\b[^>]*><\/pds-icon>)\s*<\/\1>/gi,(n,o,a,i)=>{let s=bo(a,"icon-only");if(!yo(s,"aria-label")){let p=String(i).match(/\sicon\s*=\s*(["'])(.*?)\1/i),d=p?String(p[2]||""):"",c=vo(d);s+=` aria-label="${c}"`}return e&&(e.intentHits+=1,F(e,"intent.component.button.icon-only-markup")),`<${o}${s}>${i}</${o}>`})}function wo(t="",e=null){let r=String(t||"");if(!r)return r;let n=0,o=r.replace(/<p([^>]*?)>([\s\S]*?)<\/p>/gi,(a,i,s)=>{let p=String(i||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!p)return a;let d=ee(p[2]||""),c=d.some(u=>/^import-text-/.test(String(u||""))),l=d.includes("text-muted")||d.some(u=>/^import-font-/.test(String(u||"")));return!c||!l?a:(n+=1,`<div${i}>${s}</div>`)});return e&&n>0&&(e.intentHits+=1,F(e,"intent.typography.metric-paragraph-to-div"),j(e,`Normalized ${n} metric text paragraph tag(s) to div.`)),o}function Br(t="",e=""){if(!e)return t;let r=String(t||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return r;let o=n[1]||'"',a=ee(n[2]).filter(s=>s!==e);if(a.length===0)return r.replace(n[0],"");let i=` class=${o}${a.join(" ")}${o}`;return r.replace(n[0],i)}function ko(t="",e=r=>r){let r=String(t||""),n=r.match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!n)return r;let o=n[1]||'"',a=ee(n[2]),i=e(Array.from(a)),s=Array.isArray(i)?i.filter(Boolean):a;if(s.length===0)return r.replace(n[0],"");let p=` class=${o}${s.join(" ")}${o}`;return r.replace(n[0],p)}function So(t="",e=null){let r=String(t||"");if(!r)return r;let n=0,o=r.replace(/<(div|section|article|aside)([^>]*)>\s*<(p|div)([^>]*)>[\s\S]*?<\/\3>\s*<(p|div)([^>]*)>[\s\S]*?<\/\5>\s*<\/\1>/gi,(a,i,s,p,d,c,l)=>{let u=String(s||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!u||!ee(u[2]).includes("stack-sm"))return a;let m=String(d||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i),b=String(l||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!m||!b)return a;let h=ee(m[2]),f=ee(b[2]);if(!(h.some(S=>/^import-text-/.test(String(S||"")))&&f.some(S=>/^import-text-/.test(String(S||"")))))return a;let v=Br(s,"stack-sm");return n+=1,a.replace(`<${i}${s}>`,`<${i}${v}>`)});return e&&n>0&&(e.intentHits+=1,F(e,"intent.typography.metric-pair-no-stack"),j(e,`Removed stack-sm from ${n} metric text pair container(s).`)),o}function $o(t={}){if(!t||typeof t!="object")return{};let e=t.typography;if(e&&typeof e=="object")return e;let r=t.design?.typography;return r&&typeof r=="object"?r:{}}function Co(t={}){let e=$o(t),r=Number(e.fontScale);return Number.isFinite(r)?Math.max(1,Math.min(2,r)):ot}function Mo(t="",e=ot){let n={"4xl":1,"3xl":2,"2xl":3,xl:4}[t];if(!n)return"";let o=Number.isFinite(Number(e))?Math.max(1,Math.min(2,Number(e))):ot,a=Math.max(-1,Math.min(1,Math.round((o-ot)/.25))),i=n-a;return i<1?"h1":i>4?"":`h${i}`}function zo(t="",e=null,r={}){let n=String(t||"");if(!n)return n;let o=Co(r.config||{}),a=0,i=0,s=n.replace(/<(p|div|span)([^>]*)>([\s\S]*?)<\/\1>/gi,(p,d,c,l)=>{let u=String(c||"").match(/\sclass\s*=\s*(["'])(.*?)\1/i);if(!u)return p;let g=ee(u[2]);if(!g.includes("import-font-bold"))return p;let b=g.find(S=>/^import-text-(?:4xl|3xl|2xl|xl)$/.test(String(S||"")))||"",h=b.match(/^import-text-(4xl|3xl|2xl|xl)$/);if(h){let S=Mo(h[1],o);if(!S)return p;let R=ko(c,$=>$.filter(L=>L!=="import-font-bold"&&L!==b));return a+=1,`<${S}${R}>${l}</${S}>`}let f=/<\/?(?:div|p|section|article|aside|main|header|footer|ul|ol|li|table|tr|td|th|h[1-6])\b/i.test(l),k=/<\/?(?:strong|b)\b/i.test(l);if(f||k)return p;let v=Br(c,"import-font-bold");return i+=1,`<${d}${v}><strong>${l}</strong></${d}>`});return e&&(a>0&&(e.intentHits+=1,F(e,"intent.typography.semantic-heading-from-scale"),j(e,`Converted ${a} bold display text node(s) to semantic heading tags (fontScale=${Number(o).toFixed(2)}).`)),i>0&&(e.intentHits+=1,F(e,"intent.typography.bold-to-strong"),j(e,`Wrapped ${i} bold text node(s) in strong tags.`))),s}function Eo(t=[]){if(!Array.isArray(t)||t.length===0)return"";let e=t.filter(n=>!at.includes(n));if(e.length===0||e.length>1)return"";let r=e[0];return["hover","focus","active"].includes(r)?r:""}function Rr(t,e="base",r=[]){let n=Eo(r),o=po[t];if(o)return{declaration:o,breakpoint:e,pseudo:n,ruleId:"fallback.import-style"};let a=String(t).match(/^gap-(\d+)$/);if(a){let x={0:"var(--spacing-0)",1:"var(--spacing-1)",2:"var(--spacing-2)",3:"var(--spacing-3)",4:"var(--spacing-4)",5:"var(--spacing-5)",6:"var(--spacing-6)",7:"var(--spacing-7)",8:"var(--spacing-8)",10:"var(--spacing-10)",12:"var(--spacing-12)"},w=Number(a[1]);if(x[w])return{declaration:`gap:${x[w]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.gap-scale"}}let i=String(t).match(/^(mt|mb|my)-(.+)$/);if(i){let x=i[1],w=i[2],M=Pe(w);if(M){let z="";return x==="mt"?z=`margin-top:${M}`:x==="mb"?z=`margin-bottom:${M}`:z=`margin-top:${M};margin-bottom:${M}`,{declaration:z,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.margin-scale"}}}let s=String(t).match(/^min-w-\[([^\]]+)\]$/);if(s){let x=we(s[1]);if(ke(x))return{declaration:`min-width:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.min-width-arbitrary"}}let p=String(t).match(/^max-w-\[([^\]]+)\]$/);if(p){let x=we(p[1]);if(ke(x))return{declaration:`max-width:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.max-width-arbitrary"}}let d=String(t).match(/^min-h-\[([^\]]+)\]$/);if(d){let x=we(d[1]);if(ke(x))return{declaration:`min-height:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.min-height-arbitrary"}}let c=String(t).match(/^grid-rows-\[([^\]]+)\]$/);if(c){let x=we(c[1]);if(ke(x))return{declaration:`grid-template-rows:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.grid-rows-arbitrary"}}let l=String(t).match(/^size-(.+)$/);if(l){let x=Pe(l[1]);if(x)return{declaration:`width:${x};height:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.size-scale"}}let u=String(t).match(/^w-(.+)$/);if(u){let x=Pe(u[1]);if(x)return{declaration:`width:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.width-scale"}}let g=String(t).match(/^h-(.+)$/);if(g){let x=Pe(g[1]);if(x)return{declaration:`height:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.height-scale"}}let m={xs:"var(--font-size-xs)",sm:"var(--font-size-sm)",base:"var(--font-size-md)",lg:"var(--font-size-lg)",xl:"var(--font-size-xl)","2xl":"var(--font-size-2xl)","3xl":"var(--font-size-3xl)","4xl":"var(--font-size-4xl)"},b=String(t).match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/);if(b)return{declaration:`font-size:${m[b[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-size"};let h={normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},f=String(t).match(/^font-(normal|medium|semibold|bold|extrabold|black)$/);if(f)return{declaration:`font-weight:${h[f[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.font-weight"};let k={none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2"},v=String(t).match(/^leading-(none|tight|snug|normal|relaxed|loose)$/);if(v)return{declaration:`line-height:${k[v[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.line-height"};let S={tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},R=String(t).match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);if(R)return{declaration:`letter-spacing:${S[R[1]]}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.tracking"};let $=String(t).match(/^bg-black\/(\d{1,3})$/);if($)return{declaration:`background-color:color-mix(in srgb, var(--color-gray-900) ${Math.max(0,Math.min(100,Number($[1])))}%, transparent)`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.overlay-alpha"};if(t==="text-white")return{declaration:"color:var(--color-gray-50)",breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-inverse"};let L=String(t).match(/^bg-(primary|secondary|accent)$/);if(L){let w={primary:"var(--color-primary-fill)",secondary:"var(--color-gray-500)",accent:"var(--color-accent-500)"}[L[1]];if(w)return{declaration:`background-color:${w}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-semantic"}}let P=String(t).match(/^bg-([a-z]+)-(\d{2,3})$/);if(P){let x=Ne(P[1],P[2]);if(x)return{declaration:`background-color:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-tokenized"}}let E=String(t).match(/^bg-\[([^\]]+)\]$/);if(E){let x=Lr(E[1]);if(x)return{declaration:`background-color:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.bg-arbitrary"}}let A=String(t).match(/^text-([a-z]+)-(\d{2,3})$/);if(A){let x=Ne(A[1],A[2]);if(x)return{declaration:`color:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-tokenized"}}let N=String(t).match(/^text-\[([^\]]+)\]$/);if(N){let x=Lr(N[1]);if(x)return{declaration:`color:${x}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.text-arbitrary"}}let C=String(t).match(/^rounded(?:-([trbl]{1,2}))?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(C){let x=C[1]||"",w=C[2]||"sm",M=w==="none"?"0":`var(--radius-${w})`,z={t:["top-left","top-right"],b:["bottom-left","bottom-right"],l:["top-left","bottom-left"],r:["top-right","bottom-right"],tl:["top-left"],tr:["top-right"],bl:["bottom-left"],br:["bottom-right"]};if(!x)return{declaration:`border-radius:${M}`,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.rounded"};let D=(z[x]||[]).map(q=>`border-${q}-radius:${M}`).join(";");if(D)return{declaration:D,breakpoint:e,pseudo:n,ruleId:"fallback.import-style.rounded"}}return null}function nt(t,e){return typeof t=="number"&&Number.isFinite(t)?`${t}px`:typeof t=="string"&&t.trim()?t.trim():`${e}px`}function To(t={}){let r=(t?.design&&typeof t.design=="object"?t.design:t)?.layout?.breakpoints||{};return{sm:nt(r.sm,640),md:nt(r.md,768),lg:nt(r.lg,1024),xl:nt(r.xl,1280)}}function Ao(t,e){let r=Array.from(t.importBaseStyles.entries()).map(([a,i])=>`.${a}{${i};}`),n=[];for(let[a,i]of t.importResponsiveStyles.entries()){let s=e?.[a];if(!s||!i?.size)continue;let p=Array.from(i.entries()).map(([d,c])=>`.${d}{${c};}`).join(`
`);n.push(`@media (min-width: ${s}) {
${p}
}`)}for(let[a,i]of t.importPseudoStyles.entries()){let[s,p]=String(a).split("|");if(!p||!i?.size)continue;let d=Array.from(i.entries()).map(([l,u])=>`.${l}:${p}{${u};}`).join(`
`);if(!d)continue;if(s==="base"){n.push(d);continue}let c=e?.[s];c&&n.push(`@media (min-width: ${c}) {
${d}
}`)}let o=[...r,...n].filter(Boolean).join(`
`);return o.trim()?["/* pds-import: generated fallback styles for unmapped Tailwind utilities */",o].join(`
`):""}function Lo(t="",e=""){if(!e||!e.trim())return t;let r=`<style data-pds-import="tailwind-fallback">
${e}
</style>`;return/<head[^>]*>/i.test(t)?t.replace(/<head([^>]*)>/i,`<head$1>
${r}`):`${r}
${t}`}function Fr(t=""){if(!t)return!1;if(t.includes(":")||t.includes("["))return!0;let e=t.split("-")[0];return go.includes(e)}function te(t=""){let e=String(t).split(":");if(e.length===1)return{breakpoint:"base",base:e[0],variants:[]};let r=e[e.length-1],n=e.slice(0,-1);return{breakpoint:n.find(a=>at.includes(a))||"base",base:r,variants:n}}function Ro(){return{totalTailwind:0,mapped:0,ignored:0,policySkipped:0,unknown:0,intentHits:0,unknownTokens:new Map,notes:[],appliedRules:new Set,importBaseStyles:new Map,importResponsiveStyles:new Map,importPseudoStyles:new Map,importedStyleCount:0,labelNestingCount:0,removedAtomicSpacingCount:0,removedAtomicPositioningCount:0}}function Fo(t=""){let e=String(t||"").toLowerCase().replace(/\s+/g,""),r=e.includes("menu,ol,ul{list-style:none")||e.includes("ol,ul,menu{list-style:none")||e.includes("ul,ol,menu{list-style:none"),n=e.includes("a{color:inherit;text-decoration:inherit");return{listReset:r,anchorReset:n}}function Po(t=""){return String(t||"").toLowerCase().includes("cdn.tailwindcss.com")?{listReset:!0,anchorReset:!0}:{listReset:!1,anchorReset:!1}}function Io(t="",e=null){let r=String(t||""),n={listReset:!1,anchorReset:!1,strippedRuntimeCssBlocks:0,strippedRuntimeScripts:0};return r=r.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi,(o,a,i)=>{let s=String(i||"");if(!(/tailwindcss\s+v\d/i.test(s)||/\*\s*!\s*tailwindcss/i.test(s)))return o;let d=Fo(s);return n.listReset=n.listReset||d.listReset,n.anchorReset=n.anchorReset||d.anchorReset,n.strippedRuntimeCssBlocks+=1,""}),r=r.replace(/<script([^>]*?)src\s*=\s*(?:(['"])([^"']*cdn\.tailwindcss\.com[^"']*)\2|([^\s>]*cdn\.tailwindcss\.com[^\s>]*))([^>]*)><\/script>/gi,(o,a,i,s,p)=>{let c=Po(s||p||"");return n.listReset=n.listReset||c.listReset,n.anchorReset=n.anchorReset||c.anchorReset,n.strippedRuntimeScripts+=1,""}),e&&(n.strippedRuntimeCssBlocks>0||n.strippedRuntimeScripts>0)&&(F(e,"intent.preflight.tailwind-runtime-detected"),n.strippedRuntimeCssBlocks>0&&j(e,`Detected and stripped ${n.strippedRuntimeCssBlocks} Tailwind runtime style block(s).`)),e&&n.strippedRuntimeScripts>0&&j(e,`Removed ${n.strippedRuntimeScripts} Tailwind CDN script reference(s).`),{html:r,hints:n}}function j(t,e){!t||!e||t.notes.includes(e)||t.notes.push(e)}function No(t,e){let r=t.unknownTokens.get(e)||0;t.unknownTokens.set(e,r+1)}function jo(t={}){let r=(t?.design&&typeof t.design=="object"?t.design:t)?.layout?.utilities||{};return{grid:r.grid!==!1,flex:r.flex!==!1,spacing:r.spacing!==!1,container:r.container!==!1}}function Y(t,e){return e?t?.[e]!==!1:!0}function Pr(t){let e=String(t).match(/^grid-cols-(\d+)$/);return e?Number(e[1]):null}function Ir(t={}){let e=at.map(o=>({bp:o,cols:t[o]})).filter(o=>Number.isFinite(o.cols));if(e.length<2)return null;if(e.length===2){let[o,a]=e;if(o.bp==="base"&&o.cols===1&&a.cols===2)return"grid-auto-lg";if(o.bp==="base"&&o.cols===1&&a.cols>=3)return null;if(o.cols<a.cols){if(a.cols>=4)return"grid-auto-md";if(a.cols>=2)return"grid-auto-lg"}return null}let r=!0;for(let o=1;o<e.length;o+=1)if(e[o].cols<=e[o-1].cols){r=!1;break}if(!r)return null;let n=e[e.length-1]?.cols||0;return n>=4?"grid-auto-md":n>=3?"grid-auto-sm":null}function Bo(t=""){let e=String(t).match(/^text-(gray|slate|zinc|neutral|stone)-(\d{2,3})$/);if(!e)return"";let r=Number(e[2]);return Number.isFinite(r)&&r>=400&&r<=600?"text-muted":""}function Oo(t="",e=0){return!t||!Number.isFinite(e)?"":{sm:{2:"sm:grid-cols-2"},md:{3:"md:grid-cols-3"},lg:{4:"lg:grid-cols-4"}}?.[t]?.[e]||""}function _o(t=""){let e=te(t),n=String(e?.base||"").match(/^space-y-(\d+)$/);if(!n)return"stack-md";let o=Number(n[1]);return Number.isFinite(o)?o<=1?"stack-xs":o<=2?"stack-sm":o<=4?"stack-md":"stack-lg":"stack-md"}function Do(t=new Set){return Array.from(t).some(e=>{let r=String(e||"");return/^gap-(?:xs|sm|md|lg|xl)$/.test(r)||/^gap-[0-9]+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?gap-/.test(r)})}function Wo(t=new Set){return Array.from(t).some(e=>/^stack-(?:xs|sm|md|lg|xl)$/.test(String(e||"")))}function Ho(t=new Set){return Array.from(t).some(e=>{let r=String(e||"");return/^grid-cols-\d+$/.test(r)||/^grid-auto-(?:sm|md|lg|xl)$/.test(r)||/^(?:sm|md|lg|xl):grid-cols-\d+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?grid-cols-\d+$/.test(r)})}function Uo(t,e=12){return Array.from(t.unknownTokens.entries()).sort((r,n)=>n[1]-r[1]).slice(0,e).map(([r])=>r)}function F(t,e){!t||!e||t.appliedRules.add(e)}function ne(t=[],e){return!Array.isArray(t)||!e?!1:t.some(r=>e.test(String(r)))}function qo(t=[]){for(let e of t){let r=te(e);if(r.breakpoint!=="base")continue;let n=String(r.base).match(/^h-(.+)$/);if(!n)continue;let o=Pe(n[1]);if(!o||o==="auto")continue;let a=String(o).match(/^(-?\d+(?:\.\d+)?)rem$/);if(a){let i=Number(a[1]);if(Number.isFinite(i))return i*16}}return null}function Go(t=[],e=""){let r=e==="button",n=ne(t,/^bg-/),o=ne(t,/^hover:bg-/),a=ne(t,/^border/),i=ne(t,/^shadow/),s=t.includes("cursor-pointer"),p=ne(t,/^rounded/),d=ne(t,/^(?:min-w|max-w|w)-/),c=ne(t,/^text-(?:white|black|\[[^\]]+\]|[a-z]+-\d{2,3})$/),l=n||o||i;if(!(r||e==="a"&&(l||a||s||p&&d)))return{shouldNormalize:!1,variant:"none",size:"base",iconOnly:!1};let m="none";a&&!n&&!o?m="outline":(l||n&&c)&&(m="primary");let b=t.includes("rounded-full")&&(t.includes("p-2")||t.includes("p-1")||t.includes("p-2.5")),h=ne(t,/^size-(?:6|7|8|9|10|11|12)$/),f=b||h,k=qo(t),v=t.includes("text-sm")||t.includes("text-xs"),S=t.includes("text-lg")||t.includes("text-xl"),R="base";return k&&k<=40||v?R="sm":(k&&k>=48||S)&&(R="lg"),{shouldNormalize:!0,variant:m,size:R,iconOnly:f}}function Vo(t=""){let e=String(t||"").toLowerCase();return["green","emerald","lime","teal"].includes(e)?"badge-success":["blue","sky","cyan","indigo"].includes(e)?"badge-info":["yellow","amber","orange"].includes(e)?"badge-warning":["red","rose","pink"].includes(e)?"badge-danger":["gray","slate","zinc","neutral","stone"].includes(e)?"badge-secondary":["purple","violet","fuchsia","primary","accent"].includes(e)?"badge-primary":"badge-secondary"}function Yo(t=[],e="",r={shouldNormalize:!1}){if(r?.shouldNormalize)return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(["button","a","input","select","textarea"].includes(e))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};if(t.some(A=>/^badge(?:-|$)/.test(String(A))))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let n=t.map(A=>te(A)).filter(A=>A.breakpoint==="base").map(A=>String(A.base)),o=n.some(A=>/^rounded(?:-|$)/.test(A)),a=n.some(A=>/^px-/.test(A)),i=n.some(A=>/^py-/.test(A)),s=a&&i,p=n.includes("text-xs")||n.includes("text-sm"),d=n.includes("text-lg")||n.includes("text-xl"),c=n.map(A=>A.match(/^bg-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),l=n.map(A=>A.match(/^text-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean),u=n.map(A=>A.match(/^border-([a-z]+)-(\d{2,3})$/)).find(Boolean),g=Number(c?.[2]),m=Number(l?.[2]),b=!!(c&&Number.isFinite(g)&&g<=300),h=n.some(A=>/^border(?:-|$)/.test(A)),f=!!(c||l||u),k=[o,s,p,b||h].filter(Boolean).length;if(!(f&&k>=3))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:"",pastel:null};let S=c&&c[1]||l&&l[1]||u&&u[1]||"",R=Vo(S),$=h&&!b,L=p?"badge-sm":d?"badge-lg":"",P=b?{family:S,bgShade:Number.isFinite(g)?g:200,textShade:Number.isFinite(m)?m:700}:null;return{shouldNormalize:!0,variantClass:P?"":R,outline:$,sizeClass:L,pastel:P}}function Jo(t="",e=0){let r=String(t||"").toLowerCase(),n=Number(e);return r==="white"?"surface-base":["gray","slate","zinc","neutral","stone"].includes(r)?Number.isFinite(n)&&n<=100?"surface-base":"surface-subtle":["blue","sky","cyan","indigo","primary","info"].includes(r)?"surface-info":["purple","violet","fuchsia","accent"].includes(r)?"surface-primary":["green","emerald","lime","teal","success"].includes(r)?"surface-success":["yellow","amber","orange","warning"].includes(r)?"surface-warning":["red","rose","pink","danger"].includes(r)?"surface-danger":"surface-base"}function Ko(t=[],e="",r={shouldNormalize:!1},n={shouldNormalize:!1}){if(r?.shouldNormalize||n?.shouldNormalize)return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(!new Set(["div","section","article","aside","li"]).has(e))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(t.some(h=>/^card(?:-|$)/.test(String(h))))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let a=t.map(h=>te(h)).filter(h=>h.breakpoint==="base").map(h=>String(h.base)),i=a.some(h=>/^rounded(?:-|$)/.test(h)),s=a.some(h=>/^border(?:$|-)/.test(h)),p=a.some(h=>/^shadow(?:$|-)/.test(h)),d=a.some(h=>/^(?:p|px|py|pt|pb|pl|pr)-/.test(h)),c=a.map(h=>h.match(/^bg-([a-z]+)-?(\d{2,3})?$/)).find(Boolean),l=a.includes("bg-white")||!!c;if(!([i,s||p,l,d].filter(Boolean).length>=3))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let m="card-basic";p?m="card-elevated":s&&(m="card-outlined");let b="";return p?b="surface-elevated":c?b=Jo(c[1],c[2]):l&&(b="surface-base"),{shouldNormalize:!0,cardVariantClass:m,surfaceClass:b}}function Zo({tagName:t,originalClassValue:e,policy:r,summary:n,preflightHints:o={}}){if(co.has(t))return F(n,"table.strict-tags.no-classes"),"";let a=String(e).split(/\s+/).filter(Boolean),i=Go(a,t),s=Yo(a,t,i),p=Ko(a,t,i,s),d=/^h[1-6]$/.test(t),c=["i","svg"].includes(t)||a.some(C=>/^fa(?:[a-z-]+)?$/i.test(String(C||""))||/^fa-/.test(String(C||""))),l=new Set,u={},g={},m=!1,b="",h="",f=!1,k="";a.forEach(C=>{let x=te(C),w=x.base;if(lo.some(I=>I.test(w))){n.ignored+=1,F(n,"cleanup.non-pds-class");return}let M=Fr(C)||Fr(w);if(M&&(n.totalTailwind+=1),/^space-y-/.test(w)){m=!0,b=b||C,h=h||_o(C),n.ignored+=1,F(n,"layout.spacing.space-y-to-stack");return}if(/^space-x-/.test(w)){let I=String(w).match(/^space-x-(\d+)$/);if(I){let W=`gap-${I[1]}`,re=Bt.get(W);if(re&&Y(r,"spacing")){l.add(re),f=!0,k=k||C,n.mapped+=1,n.intentHits+=1,F(n,"layout.spacing.space-x-to-gap");return}}n.ignored+=1,F(n,"style.spacing.atomic");return}if(/^grid-cols-\d+$/.test(w)&&x.breakpoint!=="base"){let I=Pr(w);if(Number.isFinite(I)&&Y(r,"grid")){u[x.breakpoint]=I,n.mapped+=1,F(n,"intent.layout.responsive-grid-to-auto");return}if(!Y(r,"grid")){n.policySkipped+=1,j(n,"Skipped responsive grid mapping because layout.utilities.grid=false.");return}}if(/^flex-(?:row|col)$/.test(w)&&x.breakpoint!=="base"){if(Y(r,"flex")){g[x.breakpoint]=w,n.mapped+=1,F(n,"intent.layout.mobile-stack");return}n.policySkipped+=1,j(n,"Skipped responsive flex mapping because layout.utilities.flex=false.");return}if(/^grid-cols-\d+$/.test(w)&&x.breakpoint==="base"){let I=Pr(w);Number.isFinite(I)&&Y(r,"grid")&&(u.base=I)}let z=so.get(w);if(z&&x.breakpoint==="base"){if(!Y(r,z.gate)){n.policySkipped+=1,j(n,`Skipped ${w} because layout.utilities.${z.gate}=false.`);return}z.pds.forEach(I=>{I&&l.add(I)}),n.mapped+=1,F(n,z.id);return}if(Bt.has(w)&&x.breakpoint==="base"){if(!Y(r,"spacing")){n.policySkipped+=1,j(n,"Skipped gap utility because layout.utilities.spacing=false.");return}l.add(Bt.get(w)),n.mapped+=1,F(n,"layout.spacing.gap-scale");return}if(Er.has(w)&&x.breakpoint==="base"){if(!Y(r,"container")){n.policySkipped+=1,j(n,"Skipped max-width utility because layout.utilities.container=false.");return}l.add(Er.get(w)),n.mapped+=1,F(n,"layout.container.max-width");return}if(i.shouldNormalize&&M){let I=String(w||"");if(x.breakpoint==="base"&&["flex-1","grow","flex-grow"].includes(I)){l.add("grow"),n.mapped+=1,n.intentHits+=1,F(n,"intent.component.button.layout-grow");return}if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(I)||I.startsWith("hover:")){n.ignored+=1,F(n,"intent.component.button.normalize");return}}if(d&&/^(?:text-(?:xs|sm|base|lg|xl|\dxl|white|black|\[[^\]]+\]|[a-z]+-\d{2,3})|font-|leading-|tracking-|uppercase|lowercase|capitalize)/.test(w)){n.ignored+=1,n.intentHits+=1,F(n,"intent.typography.heading-semantic");return}if(s.shouldNormalize&&M){let I=String(w||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(I)||I.startsWith("hover:")){n.ignored+=1,F(n,"intent.component.badge.normalize");return}}if(p.shouldNormalize&&M){let I=String(w||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)/.test(I)||I.startsWith("hover:")){n.ignored+=1,F(n,"intent.component.card.normalize");return}}let B=Bo(w);if(B&&x.breakpoint==="base"){l.add(B),n.mapped+=1,n.intentHits+=1,F(n,"intent.typography.text-neutral-to-muted");return}if(/^text-(?:white|black|[a-z]+-\d{2,3}|\[[^\]]+\])$/.test(w)){if(c||t==="a"&&!i.shouldNormalize){let W=Rr(w,x.breakpoint,x.variants);if(W){let re=ce(n,`${t}-color-${w}`,W.declaration,W.breakpoint,W.pseudo);if(re){l.add(re),n.mapped+=1,n.intentHits+=1,F(n,c?"intent.icon.color-preserve":"intent.typography.link-active-preserve");return}}}n.ignored+=1,F(n,"style.color");return}let q=Rr(w,x.breakpoint,x.variants);if(q){let I=ce(n,w,q.declaration,q.breakpoint,q.pseudo);if(I){l.add(I),n.mapped+=1,n.intentHits+=1,F(n,q.ruleId),x.breakpoint!=="base"&&j(n,`Generated responsive import fallback for ${C}.`);return}}for(let I of U.ignoredPatterns)if(I.pattern.test(w)){n.ignored+=1,F(n,I.id),I.id==="style.spacing.atomic"&&(n.removedAtomicSpacingCount+=1),I.id==="style.positioning.atomic"&&(n.removedAtomicPositioningCount+=1);return}if(M){n.unknown+=1,No(n,C);return}l.add(C)}),m&&Y(r,"spacing")&&(l.add(h||"stack-md"),n.mapped+=1,n.intentHits+=1,j(n,`Mapped ${b} to ${h||"stack-md"}.`)),f&&Y(r,"spacing")&&j(n,`Mapped ${k} to gap utility.`);let v=Ir(u);if(v&&Y(r,"grid")?(l.delete("grid-cols-1"),l.delete("grid-cols-2"),l.delete("grid-cols-3"),l.delete("grid-cols-4"),l.delete("grid-cols-6"),l.add("grid"),l.add(v),n.intentHits+=1,F(n,"intent.layout.responsive-grid-to-auto"),j(n,`Collapsed responsive grid columns to ${v}.`)):Y(r,"grid")&&at.filter(x=>x!=="base"&&Number.isFinite(u[x])).forEach(x=>{let w=u[x],M=Oo(x,w);if(M){l.add("grid"),l.add(M),n.intentHits+=1,F(n,"intent.layout.responsive-grid-to-auto"),j(n,`Mapped ${x}:grid-cols-${w} to ${M}.`);return}let z=ce(n,`grid-cols-${w}`,`grid-template-columns:repeat(${w}, minmax(0, 1fr))`,x);z&&(l.add("grid"),l.add(z),n.intentHits+=1,F(n,"fallback.import-style.grid-cols-responsive"),j(n,`Mapped ${x}:grid-cols-${w} to responsive import fallback for exact columns.`))}),Y(r,"flex")&&a.includes("flex-col")&&(g.md==="flex-row"||g.lg==="flex-row")&&(l.delete("flex-col"),l.delete("flex-row"),l.add("mobile-stack"),n.intentHits+=1,F(n,"intent.layout.mobile-stack"),j(n,"Mapped flex-col + breakpoint flex-row to mobile-stack.")),(l.has("flex")||l.has("inline-flex"))&&Y(r,"spacing")&&(Do(l)||Wo(l)||f||m||(l.add("gap-sm"),n.intentHits+=1,F(n,"layout.spacing.flex-min-gap"),j(n,"Added gap-sm fallback for flex container without explicit spacing."))),a.some(C=>/^grid-cols-\d+$/.test(te(C).base))&&l.has("grid")&&!Ho(l)){let C=Ir(u);C?(l.add(C),n.intentHits+=1,F(n,"intent.layout.responsive-grid-to-auto"),j(n,`Applied grid safety fallback ${C} to avoid bare grid output.`)):Number.isFinite(u.base)&&u.base>1?(l.add(`grid-cols-${u.base}`),n.intentHits+=1,F(n,"intent.layout.grid-safety-fallback"),j(n,`Applied grid safety fallback grid-cols-${u.base} to preserve explicit grid intent.`)):(l.add("mobile-stack"),n.intentHits+=1,F(n,"intent.layout.grid-safety-fallback.mobile-stack"),j(n,"Applied mobile-stack safety fallback to avoid bare grid output when explicit grid intent was present."))}let $=a.some(C=>/^(?:bg-white|shadow|shadow-md|shadow-lg)$/.test(C)),L=a.some(C=>/^rounded/.test(C));if(["div","section","article","li","aside"].includes(t)&&$&&L&&(l.add("card"),!l.has("surface-elevated")&&a.some(C=>/^shadow/.test(C))&&l.add("surface-elevated"),!l.has("surface-base")&&a.includes("bg-white")&&l.add("surface-base"),n.intentHits+=1,F(n,"intent.component.card")),t==="button"||t==="a"){let C=a.some(M=>/^bg-(?:[a-z]+-)?[4567]00$/.test(M))&&a.includes("text-white"),x=a.some(M=>/^border/.test(M))&&!C,w=a.includes("p-2")&&a.includes("rounded-full");C?(l.delete("surface-base"),l.delete("surface-elevated"),l.add("btn-primary"),n.intentHits+=1,F(n,"intent.component.button.primary")):x&&(l.add("btn-outline"),n.intentHits+=1,F(n,"intent.component.button.outline")),w&&(l.add("icon-only"),F(n,"intent.component.button.icon-only"))}if(i.shouldNormalize){for(let x of Array.from(l))String(x).startsWith("import-")&&l.delete(x);["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","surface-base","surface-elevated","surface-subtle","card"].forEach(x=>l.delete(x)),i.variant==="primary"?(l.add("btn-primary"),F(n,"intent.component.button.primary")):i.variant==="outline"&&(l.add("btn-outline"),F(n,"intent.component.button.outline")),i.size==="sm"?(l.add("btn-sm"),F(n,"intent.component.button.size-sm")):i.size==="lg"&&(l.add("btn-lg"),F(n,"intent.component.button.size-lg")),i.iconOnly&&(l.add("icon-only"),F(n,"intent.component.button.icon-only")),n.intentHits+=1,F(n,"intent.component.button.normalize")}if(s.shouldNormalize){for(let x of Array.from(l))String(x).startsWith("import-")&&l.delete(x);if(["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","grow","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","text-muted","surface-base","surface-elevated","surface-subtle","card"].forEach(x=>l.delete(x)),l.add("badge"),s.variantClass&&l.add(s.variantClass),s.outline&&l.add("badge-outline"),s.sizeClass&&l.add(s.sizeClass),s.pastel&&s.pastel.family){let x=Ne(s.pastel.family,String(s.pastel.bgShade||200)),w=Ne(s.pastel.family,String(s.pastel.textShade||700));if(x&&w){let M=`badge-pastel-${s.pastel.family}-${s.pastel.bgShade}-${s.pastel.textShade}`,z=ce(n,M,`background-color:${x};color:${w}`,"base");z&&(l.add(z),F(n,"intent.component.badge.pastel-preserve"),j(n,`Preserved pastel badge tone using ${z}.`))}}n.intentHits+=1,F(n,"intent.component.badge.normalize"),j(n,"Normalized badge/pill utility cluster to PDS badge classes.")}if(p.shouldNormalize){for(let x of Array.from(l))String(x).startsWith("import-")&&l.delete(x);["surface-base","surface-subtle","surface-elevated","surface-sunken","surface-overlay","surface-inverse","surface-primary","surface-secondary","surface-success","surface-warning","surface-danger","surface-info","card-basic","card-elevated","card-outlined","card-interactive"].forEach(x=>l.delete(x)),l.add("card"),p.cardVariantClass&&l.add(p.cardVariantClass),p.surfaceClass&&l.add(p.surfaceClass),n.intentHits+=1,F(n,"intent.component.card.normalize"),j(n,"Normalized card utility cluster to PDS card/surface classes.")}if(t==="a"&&!i.shouldNormalize&&a.some(x=>x.includes("hover:text")||x==="transition-colors")){let x=ce(n,"link-reset","text-decoration:none");x&&l.add(x),n.intentHits+=1,F(n,"intent.typography.link-treatment")}if(t==="footer"&&(l.has("surface-base")||a.some(x=>/^bg-/.test(x)))&&(l.delete("surface-base"),l.delete("surface-subtle"),l.add("surface-inverse"),n.intentHits+=1,F(n,"intent.surface.footer-inverse")),o?.listReset&&["ul","ol","menu"].includes(t)){let C=ce(n,"list-reset","list-style:none;margin:0;padding:0");C&&(l.add(C),n.intentHits+=1,F(n,"intent.preflight.list-reset"))}if(o?.anchorReset&&t==="a"&&!i.shouldNormalize){let C=ce(n,"anchor-reset","color:inherit;text-decoration:inherit");C&&(l.add(C),n.intentHits+=1,F(n,"intent.preflight.anchor-reset"))}let A=new Set(["div","section","article","aside","nav","main","header","footer","form","fieldset","ul","ol","li"]),N=a.some(C=>{let x=te(C).base;return/^(?:flex|grid|container|gap-|space-[xy]-|items-|justify-|content-|place-|self-|w-|h-|min-|max-)/.test(x)});return l.size===0&&A.has(t)&&N&&(l.add("stack-sm"),j(n,`Added stack-sm fallback for <${t}> with unmapped classes.`)),Array.from(l).join(" ")}function Qo(t="",e={}){let r=String(t||""),n=jo(e.config||{}),o=To(e.config||{}),a=Ro(),i=Io(r,a),p=mo(i.html,a).replace(/<([a-zA-Z][\w:-]*)([^>]*?)\sclass\s*=\s*(["'])(.*?)\3([^>]*)>/gs,(R,$,L,P,E,A)=>{let N=Zo({tagName:String($||"").toLowerCase(),originalClassValue:E,policy:n,summary:a,preflightHints:i.hints}),C=String(N||"").trim();return C?`<${$}${L} class=${P}${C}${P}${A}>`:`<${$}${L}${A}>`}),d=zo(So(wo(xo(p,a),a),a),a,{config:e.config||{}}),c=Ao(a,o),l=Lo(d,c);c&&j(a,`Generated ${a.importedStyleCount} import-* fallback style mappings.`),(a.removedAtomicSpacingCount>0||a.removedAtomicPositioningCount>0)&&j(a,`Removed atomic utilities by policy: spacing=${a.removedAtomicSpacingCount}, positioning=${a.removedAtomicPositioningCount}.`);let u=Uo(a,16),g=a.mapped+a.ignored+a.policySkipped,m=a.totalTailwind>0?g/a.totalTailwind:1,b=a.totalTailwind>0?a.unknown/a.totalTailwind:0,h=.42+m*.45+Math.min(a.intentHits,4)*.025-b*.18,f=Math.max(.15,Math.min(.96,Number(h.toFixed(2)))),k=[`pds-import: rulebook=${zr} confidence=${Math.round(f*100)}%`,`pds-import: tailwind=${a.totalTailwind} mapped=${a.mapped} ignored=${a.ignored} policySkipped=${a.policySkipped} unknown=${a.unknown}`];u.length&&k.push(`pds-import: unknown-tailwind=${u.join(", ")}`),a.notes.length&&k.push(`pds-import: notes=${a.notes.join(" | ")}`);let v=`<!-- ${k.join(` -->
<!-- `)} -->
${l}`,S=[];return a.unknown>0&&S.push({severity:"warning",message:`Converted with ${a.unknown} unknown Tailwind utilities requiring manual review.`}),a.policySkipped>0&&S.push({severity:"info",message:`Skipped ${a.policySkipped} utility mappings due to PDS config policy.`}),u.length&&S.push({severity:"info",message:`Top unknown utilities: ${u.slice(0,8).join(", ")}`}),{html:v,confidence:f,issues:S,meta:{rulebookVersion:zr,coverage:{tailwind:a.totalTailwind,mapped:a.mapped,ignored:a.ignored,policySkipped:a.policySkipped,unknown:a.unknown,importedStyles:a.importedStyleCount,nestedLabelPairs:a.labelNestingCount},unknownTailwindTokens:u,notes:a.notes,appliedRules:Array.from(a.appliedRules),policy:n,importStyleSheetInjected:!!c,breakpoints:o}}}function Xo(){return{rulesJsonPath:ao,...U,directMappings:U.directMappings.map(t=>({id:t.id,tw:t.tw,pds:t.pds,gate:t.gate||null})),ignoredPatterns:U.ignoredPatterns.map(t=>({id:t.id,pattern:String(t.pattern),reason:t.reason}))}}function ea(t){let e=String(t||"").match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);return e?e[0]:null}function ta(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Or(t){return/<\s*[a-z][^>]*>/i.test(String(t||""))}function ra(t){let e=String(t||"").trim().toLowerCase();if(!e)return null;let r=Number.parseFloat(e);return Number.isFinite(r)?e.endsWith("rem")||e.endsWith("em")?r*16:e.endsWith("px")||/^[0-9.\-]+$/.test(e)?r:null:null}function Z(t){let e=String(t||"").trim();if(!e)return"";let r=e.match(/#(?:[0-9a-f]{3,8})\b/i);if(r)return r[0].toLowerCase();let n=e.match(/rgba?\([^)]*\)/i);if(n)return n[0];let o=e.match(/hsla?\([^)]*\)/i);return o?o[0]:""}function na(t=""){let e=String(t||"").trim();if(!e||typeof window>"u"||typeof document>"u")return"";let r=document.documentElement;if(!r)return"";let n=window.getComputedStyle(r);return String(n.getPropertyValue(e)||"").trim()}function oa(t=""){let e=String(t||"").trim(),r=Z(e);if(r)return r;let n=e.match(/var\(\s*(--[^\s,)]+)\s*(?:,[^)]+)?\)/i);if(!n)return"";let o=na(n[1]);return Z(o)}function aa(t=""){let e=String(t||"").trim();if(!e)return"";let r=e.split(":").pop()||e;if(r==="bg-white")return"#ffffff";if(r==="bg-black")return"#000000";let n=r.match(/^bg-black\/(\d{1,3})$/i);if(n)return`rgba(0,0,0,${Math.max(0,Math.min(100,Number(n[1])))/100})`;let o=r.match(/^bg-\[([^\]]+)\]$/i);if(o)return Z(o[1]);let a=r.match(/^bg-([a-z]+)-(\d{2,3})$/i);if(!a)return"";let i=Ne(a[1],a[2]);return i?oa(i):""}function Nr(t=""){return String(t||"").split(/\s+/).map(r=>r.trim()).filter(Boolean).map(r=>aa(r)).filter(Boolean)}function ia(t=""){let e=[],r=String(t||""),n=/([^{}]+)\{([^{}]*)\}/g,o=n.exec(r);for(;o;){let a=String(o[1]||"").trim(),i=String(o[2]||"").trim();a&&i&&e.push({selector:a,body:i}),o=n.exec(r)}return e}function sa(t=""){let e=String(t||"").toLowerCase();return e?/(^|\s|,)(html|body|:root|main)(\s|,|$)|#app\b|#root\b|\.app\b|\.page\b/.test(e):!1}function la(t=""){let e=String(t||"").trim().match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)/i);if(!e)return null;let r=Number.parseFloat(e[1]),n=Number.parseFloat(e[2]),o=Number.parseFloat(e[3]),a=e[4]==null?1:Number.parseFloat(e[4]);return[r,n,o,a].every(i=>Number.isFinite(i))?{r:Math.max(0,Math.min(255,r)),g:Math.max(0,Math.min(255,n)),b:Math.max(0,Math.min(255,o)),a:Math.max(0,Math.min(1,a))}:null}function ca(t=""){let e=String(t||"").trim().match(/^#([0-9a-f]{3,8})$/i);if(!e)return null;let r=e[1].toLowerCase();if(r.length===3){let[n,o,a]=r.split("");return{r:Number.parseInt(`${n}${n}`,16),g:Number.parseInt(`${o}${o}`,16),b:Number.parseInt(`${a}${a}`,16),a:1}}return r.length===6||r.length===8?{r:Number.parseInt(r.slice(0,2),16),g:Number.parseInt(r.slice(2,4),16),b:Number.parseInt(r.slice(4,6),16),a:r.length===8?Number.parseInt(r.slice(6,8),16)/255:1}:null}function _r(t=""){let e=Z(t);return e?e.startsWith("#")?ca(e):e.startsWith("rgb")?la(e):null:null}function da(t){if(!t)return null;let e=a=>{let i=Number(a)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4},r=e(t.r),n=e(t.g),o=e(t.b);return .2126*r+.7152*n+.0722*o}function jr(t=""){let e=String(t||"").trim().toLowerCase();if(!e||e==="transparent")return!0;let r=_r(e);return r&&Number.isFinite(r.a)?r.a<=.04:!1}function pa(t=[],e=[]){let r=t.map(p=>Z(p)).filter(p=>p&&!jr(p)),n=Ie(r);if(n)return{color:n,source:"root"};let o=e.map(p=>Z(p)).filter(p=>p&&!jr(p)),a=o.filter(p=>{let d=_r(p),c=da(d);return Number.isFinite(c)?c>=.72:!1}),i=Ie(a);if(i)return{color:i,source:"fallback-bright"};let s=Ie(o);return s?{color:s,source:"fallback"}:{color:"",source:"none"}}function xe(t,e=new Map){let r=String(t||""),n=/([a-z-]+)\s*:\s*([^;{}]+)/gi,o=n.exec(r);for(;o;){let a=String(o[1]||"").trim().toLowerCase(),i=String(o[2]||"").trim();a&&i&&(e.has(a)||e.set(a,[]),e.get(a).push(i)),o=n.exec(r)}return e}function ua(t=""){let e=String(t||""),r=new Map,n=[],o=[],a=[],i=[],s=[],p=[],d=[],c=/#(?:[0-9a-f]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi,l=u=>{(String(u||"").match(c)||[]).forEach(m=>{let b=Z(m);b&&n.push(b)})};if(typeof DOMParser<"u"&&Or(e))try{let g=new DOMParser().parseFromString(e,"text/html");Array.from(g.querySelectorAll("style")).map(v=>v.textContent||"").forEach(v=>{xe(v,r),l(v),ia(v).forEach(S=>{if(!sa(S.selector))return;let R=xe(S.body,new Map),$=J(R,["background","background-color"]).map(L=>Z(L)).filter(Boolean);o.push(...$)})}),Array.from(g.querySelectorAll("[style]")).forEach(v=>{let S=v.getAttribute("style")||"";xe(S,r),l(S)}),["html","body","main","#app","#root",".app",".page"].forEach(v=>{let S=g.querySelector(v);if(!S)return;let R=S.getAttribute("style")||"";if(!R)return;let $=xe(R,new Map),L=J($,["background","background-color"]).map(E=>Z(E)).filter(Boolean);o.push(...L);let P=Nr(S.getAttribute("class")||"");a.push(...P)}),Array.from(g.querySelectorAll("[class]")).forEach(v=>{let S=ee(v.getAttribute("class")||"");p.push(...S);let R=Nr(v.getAttribute("class")||"");i.push(...R);let $=String(v.tagName||"").toLowerCase(),L=$==="button"||$==="a",P=S.some(E=>/^bg-/.test(String(te(E).base||"")));L&&P&&R.length&&s.push(...R)});let k=g.body?.textContent||"";k.trim()&&d.push(k),l(g.documentElement?.outerHTML||e)}catch{xe(e,r),l(e),d.push(e)}else xe(e,r),l(e),d.push(e);return{declarations:r,colorValues:n,rootBackgroundColors:o,rootClassBackgroundColors:a,classBackgroundColors:i,buttonBackgroundColors:s,classTokens:p,textCorpus:d.join(`
`)}}function Ie(t=[]){let e=new Map;t.forEach(o=>{let a=String(o||"").trim();a&&e.set(a,(e.get(a)||0)+1)});let r="",n=-1;return e.forEach((o,a)=>{o>n&&(r=a,n=o)}),r}function J(t,e=[]){return e.flatMap(r=>t.get(r)||[])}function ga(t,e){if(!t||!e)return null;let r=String(e).split(".").filter(Boolean),n=t;for(let o of r){if(!n||n.type!=="object"||!n.properties||typeof n.properties!="object")return null;n=n.properties[o]}return n||null}function ma(t={}){let e=t&&typeof t=="object"?t:{},r=T?.configRelations&&typeof T.configRelations=="object"?T.configRelations:{},n=new Set(Object.keys(r)),o=null;if(typeof T?.buildConfigFormSchema=="function")try{o=T.buildConfigFormSchema(e)?.schema||null}catch{o=null}return!o&&T?.configFormSchema?.schema&&(o=T.configFormSchema.schema),{design:e,schema:o,allowedPaths:n}}function fa(t,e){if(!t)return e;if(Array.isArray(t.oneOf)&&t.oneOf.length){let r=t.oneOf.map(n=>n?.const).filter(n=>n!=null);if(r.length){if(typeof e=="string"){let n=r.find(o=>String(o).toLowerCase()===e.toLowerCase());if(n!==void 0)return n}if(typeof e=="number"){let n=r.map(o=>Number(o)).filter(o=>Number.isFinite(o));if(n.length)return n.reduce((o,a)=>Math.abs(a-e)<Math.abs(o-e)?a:o,n[0])}return r[0]}}if(t.type==="number"||t.type==="integer"){let r=Number(e);return Number.isFinite(r)?t.type==="integer"?Math.round(r):r:void 0}return t.type==="boolean"?!!e:t.type==="string"?String(e||"").trim():e}function ha(t,e,r){let n=String(e||"").split(".").filter(Boolean);if(!n.length)return;let o=t;for(let a=0;a<n.length;a+=1){let i=n[a];if(a===n.length-1){o[i]=r;return}(!o[i]||typeof o[i]!="object"||Array.isArray(o[i]))&&(o[i]={}),o=o[i]}}function _(t,e,r){if(r==null||r===""||t.allowedPaths.size&&!t.allowedPaths.has(e))return;let n=ga(t.schema,e),o=fa(n,r);o==null||o===""||(ha(t.patch,e,o),t.inferredPaths.add(e))}function de(t=[]){let e=t.map(n=>ra(n)).filter(n=>Number.isFinite(n));if(!e.length)return null;e.sort((n,o)=>n-o);let r=Math.floor(e.length/2);return e.length%2?e[r]:(e[r-1]+e[r])/2}function ba(t=[]){let e=t.map(r=>String(r||"").split(",")[0]||"").map(r=>r.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean);return Ie(e)}function ya(t){let e=Number(t);return Number.isFinite(e)?e<=.75?"hairline":e<=1.5?"thin":e<=2.5?"medium":"thick":"thin"}function va(t=""){let r=String(te(t).base||"").toLowerCase().match(/^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(!r)return null;let n=r[1]||"DEFAULT",o={none:0,xs:2,sm:4,DEFAULT:6,md:8,lg:12,xl:16,"2xl":24,"3xl":32};return n==="full"?null:Number.isFinite(o[n])?o[n]:null}function xa(t=[]){let e=t.map(n=>va(n)).filter(n=>Number.isFinite(n));if(!e.length)return null;e.sort((n,o)=>n-o);let r=Math.floor(e.length/2);return e.length%2?e[r]:(e[r-1]+e[r])/2}function _t(t={}){let e=String(t.html||"");if(!e.trim())return O({source:"html-inference",type:String(t.sourceType||"design-inference"),confidence:0,issues:[{severity:"warning",message:"No HTML or guideline text provided for design extraction."}],designPatch:{},meta:{extractedPathCount:0,extractedPaths:[]}});let r=ma(t.config||{}),n=ua(e),o={patch:{},inferredPaths:new Set,allowedPaths:r.allowedPaths,schema:r.schema},a=J(n.declarations,["color"]).map(G=>Z(G)).filter(Boolean),i=J(n.declarations,["background","background-color"]).map(G=>Z(G)).filter(Boolean),s=[...i,...a,...n.colorValues].filter(Boolean),p=Array.from(new Set(s)),d=[...n.rootBackgroundColors||[]],c=[...n.rootClassBackgroundColors||[]],l=d.length?d:c,u=[...i,...n.classBackgroundColors||[]],g=pa(l,u),m=g.color;_(o,"colors.background",m||i[0]||p[0]);let b=p.filter(G=>G&&G!==m),f=Ie(n.buttonBackgroundColors||[])||b[0]||p[0],k=b.filter(G=>G&&G!==f);_(o,"colors.primary",f),_(o,"colors.secondary",k[0]||f||p[0]),_(o,"colors.accent",k[1]||k[0]||f||p[0]);let v=J(n.declarations,["font-family"]),S=ba(v);_(o,"typography.fontFamilyBody",S),_(o,"typography.fontFamilyHeadings",S),_(o,"typography.fontFamilyMono",/mono|code/i.test(n.textCorpus)?"JetBrains Mono":"");let R=J(n.declarations,["font-size"]),$=de(R);_(o,"typography.baseSize",$);let L=J(n.declarations,["padding","padding-top","padding-right","padding-bottom","padding-left","margin","margin-top","margin-right","margin-bottom","margin-left","gap","row-gap","column-gap"]),P=de(L);_(o,"spatialRhythm.baseUnit",P),_(o,"spatialRhythm.inputPadding",P),_(o,"spatialRhythm.buttonPadding",P);let E=J(n.declarations,["border-radius"]),A=de(E)||xa(n.classTokens||[]);_(o,"shape.radiusSize",A);let N=J(n.declarations,["border-width","border-top-width","border-right-width","border-bottom-width","border-left-width"]),C=de(N);_(o,"shape.borderWidth",ya(C));let x=J(n.declarations,["max-width"]),w=de(x);_(o,"layout.containerMaxWidth",w),_(o,"layout.maxWidth",w);let M=J(n.declarations,["min-height","height"]),z=de(M);_(o,"layout.buttonMinHeight",z),_(o,"layout.inputMinHeight",z);let B=J(n.declarations,["transition-duration"]),D=de(B.map(G=>{let Se=String(G||"").trim().toLowerCase(),oe=Number.parseFloat(Se);return Number.isFinite(oe)?Se.endsWith("ms")?oe:Se.endsWith("s")?oe*1e3:oe:null}));_(o,"behavior.transitionSpeed",D);let I=J(n.declarations,["box-shadow"]).length>0;_(o,"layers.baseShadowOpacity",I?.2:.08);let W=Array.from(o.inferredPaths),re=W.reduce((G,Se)=>{let oe=Se.split(".")[0];return G[oe]=(G[oe]||0)+1,G},{}),Yr=W.length?Math.min(.92,.35+W.length*.02):.25;return O({source:"html-inference",type:String(t.sourceType||"design-inference"),confidence:Yr,issues:W.length?[]:[{severity:"warning",message:"Could not infer enough design signals from input."}],designPatch:o.patch,meta:{extractedPathCount:W.length,extractedPaths:W,categoryCoverage:re,colorSampleSize:p.length,backgroundInference:{source:g.source,candidates:{root:l.length,declaration:i.length,classBased:(n.classBackgroundColors||[]).length}}}})}function Dr(t={}){let e=String(t.input||"").trim(),r=String(t.sourceType||"unknown");if(!e)return O({source:r,type:r,confidence:0,issues:[{severity:"error",message:"No input provided."}],meta:{conversionMode:"none"}});if(Or(e)){let n=it({html:e,config:t.config||{}});return O({source:r,type:r,confidence:n.confidence,issues:n.issues,template:n.template,meta:{...n.meta||{},conversionMode:"html-to-pds"}})}return O({source:r,type:r,confidence:.48,issues:[{severity:"info",message:"Input is not HTML; generated text-based preview template."}],template:{id:`${r}-text-import`,name:"Imported Guideline Text",html:`<article class="card surface-base stack-sm"><h3>Imported Guidelines</h3><pre>${ta(e)}</pre></article>`},meta:{conversionMode:"text-preview"}})}function it(t={}){let e=String(t.html||"").trim();if(!e)return O({source:"tailwind",type:"tailwind-html",confidence:0,issues:[{severity:"error",message:"No HTML provided."}]});let r=Qo(e,{config:t.config||{}});return O({source:"tailwind",type:"tailwind-html",confidence:r.confidence,issues:r.issues,template:{id:"tailwind-import",name:"Converted Tailwind Markup",html:r.html},meta:r.meta})}function Dt(t={}){let e=String(t.text||"").trim();if(!e)return O({source:"brand",type:"brand-guidelines",confidence:0,issues:[{severity:"error",message:"No brand guideline text provided."}]});let r=ea(e),n={colors:{},typography:{}},o=[];return r?n.colors.primary=r:o.push({severity:"warning",message:"No HEX color found; primary color was not inferred."}),/serif/i.test(e)&&(n.typography.fontFamilyBody="Georgia, serif"),/sans[-\s]?serif/i.test(e)&&(n.typography.fontFamilyBody="Inter, Arial, sans-serif"),/mono|monospace/i.test(e)&&(n.typography.fontFamilyMono="JetBrains Mono, monospace"),O({source:"brand",type:"brand-guidelines",confidence:r?.68:.52,issues:o,designPatch:n,meta:{inferred:{primaryColor:r}}})}var Wt="convert-only",Wr="adopt-design-and-convert";function wa(t){return String(t||"").trim().toLowerCase()===Wr?Wr:Wt}function Hr(...t){let e=t.flat().filter(Boolean);if(!e.length)return[];let r=new Set;return e.filter(n=>{let o=`${String(n?.severity||"info")}::${String(n?.path||"")}::${String(n?.message||"")}`;return r.has(o)?!1:(r.add(o),!0)})}function Ur(t=[]){let e=t.map(r=>Number(r)).filter(r=>Number.isFinite(r));return e.length?Math.max(0,Math.min(1,e.reduce((r,n)=>r+n,0)/e.length)):0}function je(t={},e={}){return{...t&&typeof t=="object"?t:{},...e&&typeof e=="object"?e:{}}}function Vr(t={},e={}){if(!e||typeof e!="object")return t;let r=Array.isArray(t)?[...t]:{...t};return Object.entries(e).forEach(([n,o])=>{o&&typeof o=="object"&&!Array.isArray(o)?r[n]=Vr(r[n]&&typeof r[n]=="object"?r[n]:{},o):r[n]=o}),r}function qr(t){if(typeof structuredClone=="function")try{return structuredClone(t)}catch{}return JSON.parse(JSON.stringify(t||{}))}function ka(t={}){let e=Number(t?.ratio),r=Number(t?.min),n=Number.isFinite(e)?e.toFixed(2):"n/a",o=Number.isFinite(r)?r.toFixed(2):"n/a";return{severity:"error",path:String(t?.path||"/colors"),message:`${String(t?.message||"Color contrast validation failed.")} (ratio=${n}, required=${o})`}}function Gr(t={},e={},r={}){if(!(e&&typeof e=="object"?Object.keys(e):[]).length)return{ok:!0,blocked:!1,issues:[],report:{ok:!0,issues:[]}};let o=Number(r.minContrast),a=Number.isFinite(o)?o:4.5,i=Vr(qr(t||{}),qr(e||{})),s=nr(i,{minContrast:a,minMutedContrast:3,extendedChecks:!0}),p=Array.isArray(s?.issues)?s.issues.map(d=>ka(d)):[];return{ok:!!s?.ok,blocked:!s?.ok,issues:p,report:{ok:!!s?.ok,minContrast:a,issues:Array.isArray(s?.issues)?s.issues:[]}}}function Sa(){return[{id:"template",name:"Templates"},{id:"tailwind-html",name:"Tailwind HTML"},{id:"brand-guidelines",name:"Brand Guidelines"},{id:"figma-json",name:"Figma Tokens JSON (planned)"},{id:"ux-pilot",name:"UX Pilot (planned)"},{id:"google-stitch",name:"Google Stitch (planned)"}]}async function $a(t={}){let e=String(t.sourceType||""),r=wa(t.importMode),n=String(t.input||""),o=t.config||null;if(e==="template"){let a=wr(t.templateId,t);return a.meta=je(a.meta,{importMode:r}),a}if(e==="tailwind-html"){let a=it({html:n,config:o});if(r===Wt)return a.meta=je(a.meta,{importMode:r}),a;let i=_t({html:n,config:o,sourceType:e}),s=Gr(o||{},i.designPatch||{}),p=s.blocked?{}:i.designPatch,d=s.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...s.issues]:[];return O({source:a.source||"tailwind",type:e,confidence:Ur([a.confidence,i.confidence]),issues:Hr(a.issues,i.issues,d),template:a.template,designPatch:p,meta:je(a.meta,{importMode:r,inference:i.meta,validation:s.report,validationBlocked:s.blocked})})}if(e==="brand-guidelines"){let a=Dr({input:n,sourceType:e,config:o});if(r===Wt)return a.meta=je(a.meta,{importMode:r}),a;let i=Dt({text:n}),s=_t({html:n,config:o,sourceType:e}),p={...i.designPatch&&typeof i.designPatch=="object"?i.designPatch:{},...s.designPatch&&typeof s.designPatch=="object"?s.designPatch:{}},d=Gr(o||{},p||{}),c=d.blocked?{}:p,l=d.blocked?[{severity:"error",path:"/colors",message:"Import blocked: inferred design patch failed accessibility contrast validation."},...d.issues]:[];return O({source:"brand",type:e,confidence:Ur([a.confidence,i.confidence,s.confidence]),issues:Hr(a.issues,i.issues,s.issues,l),template:a.template,designPatch:c,meta:je(a.meta,{importMode:r,inference:s.meta,brandHeuristics:i.meta,validation:d.report,validationBlocked:d.blocked})})}return e==="figma-json"||e==="ux-pilot"||e==="google-stitch"?O({source:e,type:e,confidence:0,issues:[{severity:"info",message:`${e} adapter is not implemented yet in this phase.`}],meta:{importMode:r}}):O({source:e||"unknown",type:"unknown",confidence:0,issues:[{severity:"error",message:"Unsupported import source type."}],meta:{importMode:r}})}var Ca="pds-live-import-history";var X="imports",st=null;function Ma(){return typeof globalThis<"u"&&typeof globalThis.indexedDB<"u"}function Q(t){return typeof t=="string"?t:""}function lt(t){return Array.isArray(t)?t:[]}function ct(t){return t&&typeof t=="object"?t:{}}function dt(){return Ma()?st||(st=new Promise((t,e)=>{let r=globalThis.indexedDB.open(Ca,1);r.onupgradeneeded=()=>{let n=r.result;if(!n.objectStoreNames.contains(X)){let o=n.createObjectStore(X,{keyPath:"id",autoIncrement:!0});o.createIndex("createdAt","createdAt",{unique:!1}),o.createIndex("sourceType","sourceType",{unique:!1}),o.createIndex("fileName","fileName",{unique:!1})}},r.onsuccess=()=>t(r.result),r.onerror=()=>e(r.error||new Error("Failed to open import history database."))}),st):Promise.resolve(null)}function pt(t){return new Promise((e,r)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>r(t.error||new Error("IndexedDB operation failed."))})}function za(t={}){let e=Date.now(),r=Number.isFinite(Number(t.createdAt))?Number(t.createdAt):e,n=new Date(r).toISOString(),o=lt(t.issues).map(p=>({severity:Q(p?.severity||"info"),message:Q(p?.message||"")})),a=lt(t.notes).filter(p=>typeof p=="string"),i=lt(t.unknownTailwindTokens).filter(p=>typeof p=="string"),s=lt(t.appliedRules).filter(p=>typeof p=="string");return{createdAt:r,createdAtIso:n,sourceType:Q(t.sourceType||"unknown"),importMode:Q(t.importMode||"convert-only"),source:Q(t.source||"unknown"),type:Q(t.type||"unknown"),fileName:Q(t.fileName||""),fileSize:Number.isFinite(Number(t.fileSize))?Number(t.fileSize):0,mimeType:Q(t.mimeType||""),fileContents:Q(t.fileContents||""),convertedHtml:Q(t.convertedHtml||""),confidence:Number.isFinite(Number(t.confidence))?Number(t.confidence):0,notes:a,issues:o,coverage:ct(t.coverage),unknownTailwindTokens:i,appliedRules:s,importStyleSheetInjected:!!t.importStyleSheetInjected,templateName:Q(t.templateName||""),designPatch:ct(t.designPatch),meta:ct(t.meta),resultSnapshot:ct(t.resultSnapshot)}}async function Ea(t={}){let e=await dt();if(!e)return null;let r=za(t),o=e.transaction(X,"readwrite").objectStore(X);return{id:await pt(o.add(r)),...r}}async function Ta(t={}){let e=await dt();if(!e)return[];let r=Number.isFinite(Number(t.limit))?Math.max(1,Number(t.limit)):30,o=e.transaction(X,"readonly").objectStore(X);return(await pt(o.getAll())||[]).sort((i,s)=>Number(s?.createdAt||0)-Number(i?.createdAt||0)).slice(0,r)}async function Aa(t){let e=await dt();if(!e)return null;let r=Number(t);if(!Number.isFinite(r))return null;let o=e.transaction(X,"readonly").objectStore(X);return await pt(o.get(r))||null}async function La(){let t=await dt();if(!t)return;let r=t.transaction(X,"readwrite").objectStore(X);await pt(r.clear())}export{La as clearLiveImportHistory,Dt as convertBrandGuidelinesToPatch,it as convertTailwindHtmlToPds,O as createImportResult,Xo as describeTailwindConversionRules,Aa as getLiveImportHistoryEntry,Sa as getLiveImportSources,Un as isImportResult,Ta as listLiveImportHistory,xr as listLiveTemplates,pr as loadGoogleFont,Ze as loadLiveTemplateCatalog,$a as runLiveImport,Ea as saveLiveImportHistory,Dn as startLive};
