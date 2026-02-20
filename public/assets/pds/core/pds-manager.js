var Qt=Object.defineProperty;var X=(t,e)=>()=>(t&&(e=t(t=0)),e);var ee=(t,e)=>{for(var r in e)Qt(t,r,{get:e[r],enumerable:!0})};var et={};ee(et,{enums:()=>m});var m,ue=X(()=>{m={FontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},LineHeights:{tight:1.25,normal:1.5,relaxed:1.75},BorderWidths:{hairline:.5,thin:1,medium:2,thick:3},RadiusSizes:{none:0,small:4,medium:8,large:16,xlarge:24,xxlarge:32},ShadowDepths:{none:"none",light:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",medium:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",deep:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",extreme:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},TransitionSpeeds:{fast:150,normal:250,slow:350},AnimationEasings:{linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out",bounce:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},TouchTargetSizes:{compact:36,standard:44,comfortable:48,spacious:56},LinkStyles:{inline:"inline",block:"block",button:"button"},FocusStyles:{ring:"ring",outline:"outline",border:"border",glow:"glow"},TabSizes:{compact:2,standard:4,wide:8},SelectIcons:{chevron:"chevron",arrow:"arrow",caret:"caret",none:"none"},IconSizes:{xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64,"3xl":96}}});var gt={};ee(gt,{default:()=>cr,findComponentForElement:()=>ar,getAllSelectors:()=>nr,getAllTags:()=>lr,getByCategory:()=>sr,ontology:()=>N,searchOntology:()=>ir});function V(t,e){if(!t||!e)return!1;try{return t.matches(e)}catch{return!1}}function ut(t,e){if(!t||!e||!t.closest)return null;try{return t.closest(e)}catch{return null}}function ar(t,{maxDepth:e=5}={}){if(!t||t.closest&&t.closest(".showcase-toc"))return null;let r=t,o=0;for(;r&&o<e;){if(o++,r.tagName==="DS-SHOWCASE")return null;if(r.classList&&r.classList.contains("showcase-section")){r=r.parentElement;continue}for(let a of PDS.ontology.enhancements){let i=a.selector||a;if(V(r,i))return{element:r,componentType:"enhanced-component",displayName:a.description||i,id:a.id}}if(r.tagName==="FIELDSET"){let a=r.getAttribute("role");if(a==="group"||a==="radiogroup")return{element:r,componentType:"form-group",displayName:a==="radiogroup"?"radio group":"form group"}}if(r.tagName==="LABEL"&&r.querySelector&&r.querySelector("input,select,textarea"))return{element:r,componentType:"form-control",displayName:"label with input"};let n=r.closest?r.closest("label"):null;if(n&&n.querySelector&&n.querySelector("input,select,textarea"))return{element:n,componentType:"form-control",displayName:"label with input"};for(let a of PDS.ontology.primitives){for(let i of a.selectors||[]){let l=String(i||"").trim();if(l.includes("*")){if(l.startsWith(".")){let d=l.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(u=>u.startsWith(d)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let s=r.parentElement,p=0;for(;s&&p<e;){if(s.classList&&Array.from(s.classList).some(u=>u.startsWith(d))&&s.tagName!=="DS-SHOWCASE")return{element:s,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};s=s.parentElement,p++}continue}continue}if(V(r,l))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags};let c=ut(r,l);if(c&&c.tagName!=="DS-SHOWCASE")return{element:c,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.classList){let i=Array.from(r.classList);for(let l of a.selectors||[])if(typeof l=="string"&&l.includes("*")&&l.startsWith(".")){let c=l.slice(1).replace(/\*/g,"");if(i.some(d=>d.startsWith(c)))return{element:r,componentType:"pds-primitive",displayName:a.name||a.id,id:a.id,tags:a.tags}}}}for(let a of PDS.ontology.layoutPatterns||[])for(let i of a.selectors||[]){let l=String(i||"").trim();if(l.includes("*")){if(l.startsWith(".")){let d=l.slice(1).replace(/\*/g,"");if(r.classList&&Array.from(r.classList).some(s=>s.startsWith(d)))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}continue}if(V(r,l))return{element:r,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags};let c=ut(r,l);if(c&&c.tagName!=="DS-SHOWCASE")return{element:c,componentType:"layout-pattern",displayName:a.name||a.id,id:a.id,tags:a.tags}}if(r.tagName&&r.tagName.includes("-")){let a=r.tagName.toLowerCase(),i=PDS.ontology.components.find(l=>l.selectors.includes(a));return{element:r,componentType:"web-component",displayName:i?.name||a,id:i?.id||a,tags:i?.tags}}if(r.tagName==="BUTTON"){let a=r.querySelector&&r.querySelector("pds-icon");return{element:r,componentType:"button",displayName:a?"button with icon":"button",id:"button"}}if(V(r,"pds-icon")||r.closest&&r.closest("pds-icon")){let a=V(r,"pds-icon")?r:r.closest("pds-icon");return{element:a,componentType:"icon",displayName:`pds-icon (${a.getAttribute&&a.getAttribute("icon")||"unknown"})`,id:"pds-icon"}}if(V(r,"nav[data-dropdown]")||r.closest&&r.closest("nav[data-dropdown]"))return{element:V(r,"nav[data-dropdown]")?r:r.closest("nav[data-dropdown]"),componentType:"navigation",displayName:"dropdown menu",id:"dropdown"};r=r.parentElement}return null}function nr(){let t=[];for(let e of PDS.ontology.primitives)t.push(...e.selectors||[]);for(let e of PDS.ontology.components)t.push(...e.selectors||[]);for(let e of PDS.ontology.layoutPatterns||[])t.push(...e.selectors||[]);return Array.from(new Set(t))}function ir(t,e={}){let r=t.toLowerCase(),o=[],n=(a,i)=>{for(let l of a)(l.id?.toLowerCase().includes(r)||l.name?.toLowerCase().includes(r)||l.description?.toLowerCase().includes(r)||l.tags?.some(d=>d.toLowerCase().includes(r))||l.category?.toLowerCase().includes(r)||l.selectors?.some(d=>d.toLowerCase().includes(r)))&&o.push({...l,type:i})};return(!e.type||e.type==="primitive")&&n(N.primitives,"primitive"),(!e.type||e.type==="component")&&n(N.components,"component"),(!e.type||e.type==="layout")&&n(N.layoutPatterns,"layout"),(!e.type||e.type==="enhancement")&&n(N.enhancements,"enhancement"),o}function sr(t){let e=t.toLowerCase();return{primitives:N.primitives.filter(r=>r.category===e),components:N.components.filter(r=>r.category===e),layouts:N.layoutPatterns.filter(r=>r.category===e)}}function lr(){let t=new Set;return N.primitives.forEach(e=>e.tags?.forEach(r=>t.add(r))),N.components.forEach(e=>e.tags?.forEach(r=>t.add(r))),N.layoutPatterns.forEach(e=>e.tags?.forEach(r=>t.add(r))),N.enhancements.forEach(e=>e.tags?.forEach(r=>t.add(r))),Array.from(t).sort()}var N,cr,Pe=X(()=>{N={meta:{name:"Pure Design System Ontology",version:"1.0.0",description:"Complete metadata registry for PDS primitives, components, utilities, and tokens"},tokens:{colors:{semantic:["primary","secondary","accent","success","warning","danger","info"],neutral:["gray"],shades:[50,100,200,300,400,500,600,700,800,900,950],surface:["base","subtle","elevated","sunken","overlay","inverse","translucent"],text:["default","muted","subtle","inverse","primary","success","warning","danger","info"]},spacing:{scale:["1","2","3","4","5","6","8","10","12","16","20","24"],semantic:["xs","sm","md","lg","xl"]},typography:{families:["heading","body","mono"],sizes:["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl"],weights:["light","normal","medium","semibold","bold"]},radius:{scale:["none","sm","base","md","lg","xl","2xl","full"]},shadows:{scale:["none","sm","base","md","lg","xl","inner"]},themes:["light","dark"],breakpoints:{sm:640,md:768,lg:1024,xl:1280}},primitives:[{id:"badge",name:"Badge / Pill",description:"Inline status indicators and labels",selectors:[".badge",".badge-primary",".badge-secondary",".badge-success",".badge-info",".badge-warning",".badge-danger",".badge-outline",".badge-sm",".badge-lg",".pill",".tag",".chip"],tags:["status","label","indicator","inline"],category:"feedback"},{id:"card",name:"Card",description:"Content container with padding, border-radius, and optional shadow",selectors:[".card",".card-basic",".card-elevated",".card-outlined",".card-interactive"],tags:["container","content","grouping"],category:"container"},{id:"surface",name:"Surface",description:"Smart surface classes with automatic text/background color handling",selectors:[".surface-base",".surface-subtle",".surface-elevated",".surface-sunken",".surface-overlay",".surface-inverse",".surface-translucent",".surface-translucent-25",".surface-translucent-50",".surface-translucent-75",".surface-primary",".surface-secondary",".surface-success",".surface-warning",".surface-danger",".surface-info"],tags:["background","theming","color","container"],category:"theming"},{id:"callout",name:"Callout",description:"Contextual information and notification messages",selectors:[".callout",".callout-info",".callout-success",".callout-warning",".callout-danger",".callout-error",".callout-dismissible"],tags:["feedback","message","notification","status","information"],category:"feedback"},{id:"empty-state",name:"Empty State",description:"Empty state layout for missing data or onboarding",selectors:[".empty-state"],tags:["empty","no-data","zero","placeholder","onboarding","state"],category:"feedback"},{id:"dialog",name:"Dialog",description:"Modal dialog element",selectors:["dialog",".dialog"],tags:["modal","overlay","popup","modal"],category:"overlay"},{id:"divider",name:"Divider",description:"Horizontal rule with optional label",selectors:["hr","hr[data-content]"],tags:["separator","line","content-divider"],category:"layout"},{id:"table",name:"Table",description:"Data tables with responsive and styling variants",selectors:["table",".table-responsive",".table-striped",".table-bordered",".table-compact",".data-table"],tags:["data","grid","tabular","responsive"],category:"data"},{id:"button",name:"Button",description:"Interactive button element with variants",selectors:["button",".btn-primary",".btn-secondary",".btn-outline",".btn-sm",".btn-xs",".btn-lg",".btn-working",".icon-only"],tags:["interactive","action","cta","form"],category:"action"},{id:"fieldset",name:"Fieldset Group",description:"Form field grouping for radio/checkbox groups",selectors:["fieldset[role='group']","fieldset[role='radiogroup']","fieldset.buttons"],tags:["form","grouping","radio","checkbox"],category:"form"},{id:"label-field",name:"Label+Input",description:"Semantic label wrapping form input",selectors:["label","label:has(input)","label:has(select)","label:has(textarea)"],tags:["form","input","accessibility"],category:"form"},{id:"accordion",name:"Accordion",description:"Collapsible content sections",selectors:[".accordion",".accordion-item","details","details > summary"],tags:["expandable","collapsible","disclosure"],category:"disclosure"},{id:"icon",name:"Icon",description:"SVG icon element with size and color variants",selectors:["pds-icon",".icon-xs",".icon-sm",".icon-md",".icon-lg",".icon-xl",".icon-primary",".icon-secondary",".icon-accent",".icon-success",".icon-warning",".icon-danger",".icon-info",".icon-muted",".icon-subtle",".icon-text",".icon-text-start",".icon-text-end"],tags:["graphic","symbol","visual"],category:"media"},{id:"figure",name:"Figure/Media",description:"Figure element for images with captions",selectors:["figure","figure.media","figcaption"],tags:["image","media","caption"],category:"media"},{id:"gallery",name:"Gallery",description:"Image gallery grid",selectors:[".gallery",".gallery-grid",".img-gallery"],tags:["images","grid","collection"],category:"media"},{id:"form",name:"Form Container",description:"Form styling and layout",selectors:["form",".form-container",".form-actions",".field-description"],tags:["form","input","submission"],category:"form"},{id:"navigation",name:"Navigation",description:"Navigation elements and menus",selectors:["nav","nav[data-dropdown]","menu","nav menu li"],tags:["menu","links","routing"],category:"navigation"}],components:[{id:"pds-tabstrip",name:"Tab Strip",description:"Tabbed interface component",selectors:["pds-tabstrip"],tags:["tabs","navigation","panels"],category:"navigation"},{id:"pds-drawer",name:"Drawer",description:"Slide-out panel overlay",selectors:["pds-drawer"],tags:["panel","overlay","sidebar"],category:"overlay"},{id:"pds-fab",name:"FAB",description:"Floating Action Button with expandable satellite actions",selectors:["pds-fab"],tags:["button","action","floating","interactive"],category:"action"},{id:"pds-upload",name:"Upload",description:"File upload component with drag-and-drop",selectors:["pds-upload"],tags:["file","upload","drag-drop","form"],category:"form"},{id:"pds-icon",name:"Icon",description:"SVG icon web component",selectors:["pds-icon"],tags:["icon","graphic","svg"],category:"media"},{id:"pds-toaster",name:"Toaster",description:"Toast notification container",selectors:["pds-toaster"],tags:["notification","toast","feedback"],category:"feedback"},{id:"pds-form",name:"JSON Form",description:"Auto-generated form from JSON Schema",selectors:["pds-form"],tags:["form","schema","auto-generate"],category:"form"},{id:"pds-live-edit",name:"Live Edit",description:"Contextual live editing for PDS design settings",selectors:["pds-live-edit"],tags:["editor","live","config","tooling"],category:"tooling"},{id:"pds-splitpanel",name:"Split Panel",description:"Resizable split pane layout",selectors:["pds-splitpanel"],tags:["layout","resize","panels"],category:"layout"},{id:"pds-scrollrow",name:"Scroll Row",description:"Horizontal scrolling row with snap points",selectors:["pds-scrollrow"],tags:["scroll","horizontal","carousel"],category:"layout"},{id:"pds-richtext",name:"Rich Text",description:"Rich text editor component",selectors:["pds-richtext"],tags:["editor","wysiwyg","text"],category:"form"},{id:"pds-calendar",name:"Calendar",description:"Date picker calendar component",selectors:["pds-calendar"],tags:["date","picker","calendar"],category:"form"}],layoutPatterns:[{id:"container",name:"Container",description:"Centered max-width wrapper with padding",selectors:[".container"],tags:["wrapper","centered","max-width","page"],category:"structure"},{id:"grid",name:"Grid",description:"CSS Grid layout container",selectors:[".grid"],tags:["layout","columns","css-grid"],category:"layout"},{id:"grid-cols",name:"Grid Columns",description:"Fixed column count grids",selectors:[".grid-cols-1",".grid-cols-2",".grid-cols-3",".grid-cols-4",".grid-cols-6"],tags:["columns","fixed","grid"],category:"layout"},{id:"grid-auto",name:"Auto-fit Grid",description:"Responsive auto-fit grid with minimum widths",selectors:[".grid-auto-sm",".grid-auto-md",".grid-auto-lg",".grid-auto-xl"],tags:["responsive","auto-fit","fluid"],category:"layout"},{id:"flex",name:"Flex Container",description:"Flexbox layout with direction and wrap modifiers",selectors:[".flex",".flex-wrap",".flex-col",".flex-row"],tags:["flexbox","layout","alignment"],category:"layout"},{id:"grow",name:"Flex Grow",description:"Fill remaining flex space",selectors:[".grow"],tags:["flex","expand","fill"],category:"layout"},{id:"stack",name:"Stack",description:"Vertical flex layout with predefined gaps",selectors:[".stack-sm",".stack-md",".stack-lg",".stack-xl"],tags:["vertical","spacing","column"],category:"layout"},{id:"gap",name:"Gap",description:"Spacing between flex/grid children",selectors:[".gap-0",".gap-xs",".gap-sm",".gap-md",".gap-lg",".gap-xl"],tags:["spacing","margin","gutters"],category:"spacing"},{id:"items",name:"Items Alignment",description:"Cross-axis alignment for flex/grid",selectors:[".items-start",".items-center",".items-end",".items-stretch",".items-baseline"],tags:["alignment","vertical","cross-axis"],category:"alignment"},{id:"justify",name:"Justify Content",description:"Main-axis alignment for flex/grid",selectors:[".justify-start",".justify-center",".justify-end",".justify-between",".justify-around",".justify-evenly"],tags:["alignment","horizontal","main-axis"],category:"alignment"},{id:"max-width",name:"Max-Width",description:"Content width constraints",selectors:[".max-w-sm",".max-w-md",".max-w-lg",".max-w-xl"],tags:["width","constraint","readable"],category:"sizing"},{id:"section",name:"Section Spacing",description:"Vertical padding for content sections",selectors:[".section",".section-lg"],tags:["spacing","vertical","padding"],category:"spacing"},{id:"mobile-stack",name:"Mobile Stack",description:"Stack on mobile, row on desktop",selectors:[".mobile-stack"],tags:["responsive","mobile","breakpoint"],category:"responsive"}],utilities:{text:{alignment:[".text-left",".text-center",".text-right"],color:[".text-muted"],overflow:[".truncate"]},backdrop:{base:[".backdrop"],variants:[".backdrop-light",".backdrop-dark"],blur:[".backdrop-blur-sm",".backdrop-blur-md",".backdrop-blur-lg"]},shadow:{scale:[".shadow-sm",".shadow-base",".shadow-md",".shadow-lg",".shadow-xl",".shadow-inner",".shadow-none"]},border:{gradient:[".border-gradient",".border-gradient-primary",".border-gradient-accent",".border-gradient-secondary",".border-gradient-soft",".border-gradient-medium",".border-gradient-strong"],glow:[".border-glow",".border-glow-sm",".border-glow-lg",".border-glow-primary",".border-glow-accent",".border-glow-success",".border-glow-warning",".border-glow-danger"],combined:[".border-gradient-glow"]},media:{image:[".img-gallery",".img-rounded-sm",".img-rounded-md",".img-rounded-lg",".img-rounded-xl",".img-rounded-full",".img-inline"],video:[".video-responsive"],figure:[".figure-responsive"]},effects:{glass:[".liquid-glass"]}},responsive:{prefixes:["sm","md","lg"],utilities:{grid:[":grid-cols-2",":grid-cols-3",":grid-cols-4"],flex:[":flex-row"],text:[":text-sm",":text-lg",":text-xl"],spacing:[":p-6",":p-8",":p-12",":gap-6",":gap-8",":gap-12"],width:[":w-1/2",":w-1/3",":w-1/4"],display:[":hidden",":block"]}},enhancements:[{id:"dropdown",selector:"nav[data-dropdown]",description:"Dropdown menu from nav element",tags:["menu","interactive","navigation"]},{id:"toggle",selector:"label[data-toggle]",description:"Toggle switch from checkbox",tags:["switch","boolean","form"]},{id:"color-input",selector:"label[data-color]",description:"Enhanced color input with swatch shell and hex output",tags:["color","input","form"]},{id:"range",selector:'input[type="range"]',description:"Enhanced range slider with output",tags:["slider","input","form"]},{id:"required",selector:"form [required]",description:"Required field asterisk indicator",tags:["validation","form","accessibility"]},{id:"open-group",selector:"fieldset[role=group][data-open]",description:"Editable checkbox/radio group",tags:["form","dynamic","editable"]},{id:"working-button",selector:"button.btn-working, a.btn-working",description:"Button with loading spinner",tags:["loading","async","feedback"]},{id:"labeled-divider",selector:"hr[data-content]",description:"Horizontal rule with centered label",tags:["divider","separator","text"]}],categories:{feedback:{description:"User feedback and status indicators",primitives:["callout","badge","empty-state"],components:["pds-toaster"]},form:{description:"Form inputs and controls",primitives:["button","fieldset","label-field","form"],components:["pds-upload","pds-form","pds-richtext","pds-calendar"]},layout:{description:"Page structure and content arrangement",patterns:["container","grid","flex","stack","section"],components:["pds-splitpanel","pds-scrollrow"]},navigation:{description:"Navigation and routing",primitives:["navigation"],components:["pds-tabstrip","pds-drawer"]},media:{description:"Images, icons, and visual content",primitives:["icon","figure","gallery"],components:["pds-icon"]},overlay:{description:"Modal and overlay content",primitives:["dialog"],components:["pds-drawer"]},data:{description:"Data display and tables",primitives:["table"]},theming:{description:"Colors, surfaces, and visual theming",primitives:["surface"]},action:{description:"Interactive actions and buttons",primitives:["button"],components:["pds-fab"]}},styles:{typography:["headings","body","code","links"],icons:{source:"svg",sets:["core","brand"]},interactive:["focus","hover","active","disabled"],states:["success","warning","danger","info","muted"]},searchRelations:{text:["typography","truncate","text-muted","text-primary","text-left","text-center","text-right","pds-richtext","heading","font","label","paragraph","content","ellipsis","overflow","input"],font:["typography","text","heading","font-size","font-weight","font-family"],type:["typography","text","font"],typography:["text","font","heading","truncate","text-muted"],heading:["typography","text","font-size","h1","h2","h3"],truncate:["text","overflow","ellipsis","clamp","nowrap","typography"],ellipsis:["truncate","text","overflow","clamp"],overflow:["truncate","scroll","hidden","text"],paragraph:["text","typography","content","body"],content:["text","typography","body","article"],empty:["empty-state","placeholder","zero","no-data","onboarding","callout","card","icon","button"],"empty state":["empty-state","empty","no-data","zero","onboarding"],"no data":["empty-state","empty","zero","placeholder"],form:["input","field","label","button","fieldset","pds-form","pds-upload","pds-richtext","pds-calendar","required","validation","submit"],input:["form","field","text","label","required","validation"],field:["form","input","label","required"],button:["btn","interactive","action","submit","form","btn-primary","btn-secondary","btn-working","pds-fab","floating"],btn:["button","interactive","action","pds-fab"],fab:["pds-fab","floating","button","action","menu"],floating:["fab","pds-fab","button","action"],toggle:["switch","checkbox","boolean","form","interactive"],switch:["toggle","checkbox","boolean"],slider:["range","input","form"],range:["slider","input","form"],checkbox:["toggle","form","fieldset","boolean"],radio:["fieldset","form","group"],select:["dropdown","form","input","menu"],upload:["file","pds-upload","form","drag-drop"],file:["upload","pds-upload","form"],modal:["dialog","pds-ask","overlay","popup","backdrop","pds-drawer","alert","confirm","prompt","lightbox"],dialog:["modal","pds-ask","overlay","popup","backdrop","alert","confirm","prompt"],popup:["modal","dialog","dropdown","popover","overlay","tooltip"],popover:["popup","tooltip","overlay"],overlay:["modal","dialog","backdrop","drawer","popup"],drawer:["pds-drawer","sidebar","panel","overlay","modal"],backdrop:["overlay","modal","dialog","blur"],confirm:["pds-ask","dialog","modal"],prompt:["pds-ask","dialog","modal","input"],ask:["pds-ask","dialog","confirm","prompt","modal"],dropdown:["menu","nav-dropdown","select","popover"],menu:["dropdown","navigation","nav","list"],nav:["navigation","menu","dropdown","tabs","links"],navigation:["nav","menu","tabs","pds-tabstrip","links","routing"],tabs:["pds-tabstrip","navigation","panels"],tab:["tabs","pds-tabstrip","panel"],link:["navigation","anchor","href","routing"],callout:["notification","feedback","message","status","toast","information","alert","warning","error","info","success","danger"],alert:["callout","notification","feedback","message","status","toast","modal","dialog","pds-ask","confirm","warning","error","info","success","danger"],notification:["callout","toast","pds-toaster","feedback","message","popup","alert"],toast:["pds-toaster","notification","callout","feedback","popup","snackbar","alert"],feedback:["callout","notification","toast","status","badge","validation","error","success","alert"],message:["callout","notification","feedback","dialog","toast","alert"],status:["badge","callout","indicator","feedback","state","alert"],error:["callout","danger","validation","feedback","warning","alert"],success:["callout","feedback","badge","status","check","alert"],warning:["callout","caution","feedback","status","alert"],info:["callout","information","feedback","status","alert"],danger:["callout","error","feedback","destructive","delete","alert"],badge:["status","pill","tag","chip","indicator","label"],pill:["badge","tag","chip"],tag:["badge","pill","chip","label"],chip:["badge","pill","tag"],layout:["grid","flex","stack","container","gap","spacing","pds-splitpanel","section"],grid:["layout","columns","css-grid","table","gallery"],flex:["layout","flexbox","alignment","row","column"],stack:["layout","vertical","spacing","column","gap"],container:["wrapper","layout","max-width","centered"],gap:["spacing","margin","padding","layout"],spacing:["gap","margin","padding","section"],section:["spacing","layout","container","page"],split:["pds-splitpanel","resizable","panels","layout"],panel:["pds-splitpanel","drawer","sidebar","section"],card:["surface","container","elevated","content"],surface:["card","background","elevated","theming","color"],box:["card","container","surface"],elevated:["surface","shadow","card"],color:["palette","theme","surface","primary","secondary","accent"],colours:["color","palette","theme"],palette:["color","theme","tokens"],theme:["color","palette","dark","light","surface"],primary:["color","button","badge","surface"],secondary:["color","button","badge","surface"],accent:["color","highlight","surface"],border:["border-gradient","border-glow","outline","radius"],effect:["border-gradient","border-glow","shadow","glass","animation"],gradient:["border-gradient","color","background"],glow:["border-glow","effect","shadow"],shadow:["elevated","effect","depth","card"],radius:["rounded","border","corner"],rounded:["radius","border","corner"],glass:["liquid-glass","backdrop","blur","effect"],icon:["pds-icon","graphic","symbol","svg","phosphor"],image:["img","figure","gallery","media","picture"],img:["image","figure","gallery","media"],figure:["image","media","caption"],gallery:["images","grid","collection","media"],media:["image","icon","figure","gallery","video"],table:["data","grid","tabular","rows","columns"],data:["table","json","form","display"],editor:["pds-richtext","wysiwyg","text","content"],wysiwyg:["editor","pds-richtext","richtext"],richtext:["pds-richtext","editor","wysiwyg","text"],calendar:["pds-calendar","date","picker","datepicker"],date:["calendar","pds-calendar","picker","input"],datepicker:["calendar","date","pds-calendar"],scroll:["pds-scrollrow","carousel","horizontal","overflow"],carousel:["scroll","pds-scrollrow","slider","gallery"],accordion:["details","collapsible","expandable","disclosure"],collapsible:["accordion","details","expandable"],expandable:["accordion","collapsible","disclosure"],details:["accordion","summary","disclosure"],divider:["hr","separator","line","rule"],separator:["divider","hr","line"],hr:["divider","separator","horizontal-rule"],interactive:["hover","focus","active","disabled","button","link"],hover:["interactive","effect","state"],focus:["interactive","accessibility","state","outline"],disabled:["interactive","state","muted"],loading:["btn-working","spinner","async","progress"],spinner:["loading","btn-working","progress"],accessibility:["a11y","aria","focus","label","required"],a11y:["accessibility","aria","semantic"],aria:["accessibility","a11y","role"],required:["form","validation","asterisk","input"],validation:["form","required","error","feedback"],start:["getting-started","intro","overview","whatispds"],intro:["getting-started","overview","start","docs"],getting:["getting-started","start","intro"],overview:["intro","start","summary","layout-overview"],docs:["documentation","reference","guide"],primitive:["primitives"],component:["components"],enhancement:["enhancements"],foundation:["foundations","color","icon","typography","spacing","tokens"],utility:["utilities","text","backdrop","shadow","border","helper"],pattern:["patterns","layout","responsive","mobile-stack"]}};cr=N});var St={};ee(St,{AutoDefiner:()=>Oe});async function Tr(...t){let e={};t.length&&typeof t[t.length-1]=="object"&&(e=t.pop()||{});let r=t,{baseURL:o,mapper:n=d=>`${d}.js`,onError:a=(d,s)=>console.error(`[defineWebComponents] ${d}:`,s)}=e,i=o?new URL(o,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),l=d=>d.toLowerCase().replace(/(^|-)([a-z])/g,(s,p,u)=>u.toUpperCase()),c=async d=>{try{if(customElements.get(d))return{tag:d,status:"already-defined"};let s=n(d),u=await import(s instanceof URL?s.href:new URL(s,i).href),f=u?.default??u?.[l(d)];if(!f){if(customElements.get(d))return{tag:d,status:"self-defined"};throw new Error(`No export found for ${d}. Expected default export or named export "${l(d)}".`)}return customElements.get(d)?{tag:d,status:"race-already-defined"}:(customElements.define(d,f),{tag:d,status:"defined"})}catch(s){throw a(d,s),s}};return Promise.all(r.map(c))}var Oe,$t=X(()=>{Oe=class{constructor(e={}){let{baseURL:r,mapper:o,onError:n,predicate:a=()=>!0,attributeModule:i="data-module",root:l=document,scanExisting:c=!0,debounceMs:d=16,observeShadows:s=!0,enhancers:p=[],patchAttachShadow:u=!0}=e,f=new Set,h=new Set,y=new Set,g=new Map,b=new WeakMap,v=new WeakMap,S=0,T=!1,M=null,$=A=>{if(!A||!p.length)return;let E=v.get(A);E||(E=new Set,v.set(A,E));for(let k of p)if(!(!k.selector||!k.run)&&!E.has(k.selector))try{A.matches&&A.matches(k.selector)&&(k.run(A),E.add(k.selector))}catch(j){console.warn(`[AutoDefiner] Error applying enhancer for selector "${k.selector}":`,j)}},R=(A,E)=>{if(!T&&!(!A||!A.includes("-"))&&!customElements.get(A)&&!h.has(A)&&!y.has(A)){if(E&&E.getAttribute){let k=E.getAttribute(i);k&&!g.has(A)&&g.set(A,k)}f.add(A),x()}},x=()=>{S||(S=setTimeout(z,d))},w=A=>{if(A){if(A.nodeType===1){let E=A,k=E.tagName?.toLowerCase();k&&k.includes("-")&&!customElements.get(k)&&a(k,E)&&R(k,E),$(E),s&&E.shadowRoot&&C(E.shadowRoot)}A.querySelectorAll&&A.querySelectorAll("*").forEach(E=>{let k=E.tagName?.toLowerCase();k&&k.includes("-")&&!customElements.get(k)&&a(k,E)&&R(k,E),$(E),s&&E.shadowRoot&&C(E.shadowRoot)})}},C=A=>{if(!A||b.has(A))return;w(A);let E=new MutationObserver(k=>{for(let j of k)j.addedNodes?.forEach(B=>{w(B)}),j.type==="attributes"&&j.target&&w(j.target)});E.observe(A,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...p.map(k=>k.selector).filter(k=>k.startsWith("data-"))]}),b.set(A,E)};async function z(){if(clearTimeout(S),S=0,!f.size)return;let A=Array.from(f);f.clear(),A.forEach(E=>h.add(E));try{let E=k=>g.get(k)??(o?o(k):`${k}.js`);await Tr(...A,{baseURL:r,mapper:E,onError:(k,j)=>{y.add(k),n?.(k,j)}})}catch{}finally{A.forEach(E=>h.delete(E))}}let F=l===document?document.documentElement:l,I=new MutationObserver(A=>{for(let E of A)E.addedNodes?.forEach(k=>{w(k)}),E.type==="attributes"&&E.target&&w(E.target)});if(I.observe(F,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[i,...p.map(A=>A.selector).filter(A=>A.startsWith("data-"))]}),s&&u&&Element.prototype.attachShadow){let A=Element.prototype.attachShadow;Element.prototype.attachShadow=function(k){let j=A.call(this,k);if(k&&k.mode==="open"){C(j);let B=this.tagName?.toLowerCase();B&&B.includes("-")&&!customElements.get(B)&&R(B,this)}return j},M=()=>Element.prototype.attachShadow=A}return c&&w(F),{stop(){T=!0,I.disconnect(),M&&M(),S&&(clearTimeout(S),S=0),b.forEach(A=>A.disconnect())},flush:z}}static async define(...e){let r={};e.length&&typeof e[e.length-1]=="object"&&(r=e.pop()||{});let o=e,{baseURL:n,mapper:a=s=>`${s}.js`,onError:i=(s,p)=>console.error(`[defineWebComponents] ${s}:`,p)}=r,l=n?new URL(n,typeof location<"u"?location.href:import.meta.url):new URL("./",import.meta.url),c=s=>s.toLowerCase().replace(/(^|-)([a-z])/g,(p,u,f)=>f.toUpperCase()),d=async s=>{try{if(customElements.get(s))return{tag:s,status:"already-defined"};let p=a(s),f=await import(p instanceof URL?p.href:new URL(p,l).href),h=f?.default??f?.[c(s)];if(!h){if(customElements.get(s))return{tag:s,status:"self-defined"};throw new Error(`No export found for ${s}. Expected default export or named export "${c(s)}".`)}return customElements.get(s)?{tag:s,status:"race-already-defined"}:(customElements.define(s,h),{tag:s,status:"defined"})}catch(p){throw i(s,p),p}};return Promise.all(o.map(d))}}});var Ve={};ee(Ve,{PDSQuery:()=>qe});var qe,Je=X(()=>{qe=class{constructor(e){this.pds=e,this.intents={color:["color","colours","shade","tint","hue","foreground","background","text","fill","bg","fg"],spacing:["spacing","space","gap","padding","margin","distance","rhythm"],typography:["font","text","type","typography","heading","body","size","weight","family"],border:["border","outline","stroke","edge","frame"],radius:["radius","rounded","corner","curve","round"],shadow:["shadow","elevation","depth","glow","drop-shadow"],component:["component","element","widget"],utility:["utility","class","helper","css"],layout:["layout","container","grid","flex","group","arrange","organize"],pattern:["pattern","example","template","structure"],interaction:["hover","focus","active","disabled","pressed","selected","checked"]},this.entities={button:["button","btn","cta"],input:["input","field","textbox","text-field","form-control"],card:["card","panel"],badge:["badge","pill","tag","chip"],surface:["surface","background","layer","container"],icon:["icon","svg","glyph","symbol"],link:["link","anchor","hyperlink"],nav:["nav","navigation","menu"],modal:["modal","dialog","popup","overlay"],drawer:["drawer","sidebar","panel"],tab:["tab","tabstrip"],toast:["toast","notification","callout","message","alert"]},this.questionWords=["what","which","how","where","when","show","find","get","give","tell"]}async search(e){if(!e||e.length<2)return[];let r=e.toLowerCase().trim(),o=this.tokenize(r),n=this.analyzeQuery(o,r),a=[];n.intents.has("color")&&a.push(...this.queryColors(n,r)),(n.intents.has("utility")||n.intents.has("border")||n.intents.has("layout")||r.includes("class"))&&a.push(...this.queryUtilities(n,r)),(n.intents.has("component")||n.entities.size>0)&&a.push(...this.queryComponents(n,r)),(n.intents.has("layout")||n.intents.has("pattern"))&&a.push(...this.queryPatterns(n,r)),n.intents.has("typography")&&a.push(...this.queryTypography(n,r)),n.intents.has("spacing")&&a.push(...this.querySpacing(n,r));let i=new Map;for(let l of a){let c=l.value;(!i.has(c)||i.get(c).score<l.score)&&i.set(c,l)}return Array.from(i.values()).sort((l,c)=>c.score-l.score).slice(0,10)}tokenize(e){return e.toLowerCase().replace(/[?!.]/g,"").split(/\s+/).filter(r=>r.length>0)}analyzeQuery(e,r){let o={intents:new Set,entities:new Set,modifiers:new Set,isQuestion:!1,tokens:e,fullText:r};o.isQuestion=this.questionWords.some(n=>e.includes(n));for(let[n,a]of Object.entries(this.intents))a.some(i=>e.includes(i)||r.includes(i))&&o.intents.add(n);for(let[n,a]of Object.entries(this.entities))a.some(i=>e.includes(i)||r.includes(i))&&o.entities.add(n);return(e.includes("hover")||r.includes("hover"))&&o.modifiers.add("hover"),(e.includes("focus")||r.includes("focus"))&&o.modifiers.add("focus"),(e.includes("active")||r.includes("active"))&&o.modifiers.add("active"),(e.includes("disabled")||r.includes("disabled"))&&o.modifiers.add("disabled"),o}queryColors(e,r){let o=[],n=this.pds.compiled;if(!n?.tokens?.colors)return o;let a=n.tokens.colors,i=Array.from(e.entities),l=Array.from(e.modifiers);if(l.includes("focus")&&e.intents.has("border")&&i.includes("input")&&o.push({text:"Focus border color: var(--color-primary-500)",value:"--color-primary-500",icon:"palette",category:"Color Token",score:100,cssVar:"var(--color-primary-500)",description:"Primary color used for focus states on form inputs"}),(r.includes("foreground")||r.includes("text"))&&(r.includes("surface")||e.entities.has("surface"))&&(o.push({text:"Text on surface: var(--surface-text)",value:"--surface-text",icon:"palette",category:"Surface Token",score:95,cssVar:"var(--surface-text)",description:"Default text color for current surface"}),o.push({text:"Secondary text: var(--surface-text-secondary)",value:"--surface-text-secondary",icon:"palette",category:"Surface Token",score:90,cssVar:"var(--surface-text-secondary)",description:"Secondary/muted text on surface"})),r.includes("primary")||r.includes("accent")||r.includes("secondary")){let c=r.includes("primary")?"primary":r.includes("accent")?"accent":"secondary";for(let d of[500,600,700]){let s=`--color-${c}-${d}`;o.push({text:`${c.charAt(0).toUpperCase()+c.slice(1)} ${d}: var(${s})`,value:s,icon:"palette",category:"Color Scale",score:80-(d-500)/100,cssVar:`var(${s})`,description:`${c} color scale shade ${d}`})}}if(i.includes("button")&&e.intents.has("color")){let c=l[0];c?o.push({text:`Button ${c} fill: var(--primary-fill-${c})`,value:`--primary-fill-${c}`,icon:"palette",category:"Interactive Token",score:92,description:`Button background color in ${c} state`}):o.push({text:"Button fill: var(--primary-fill)",value:"--primary-fill",icon:"palette",category:"Interactive Token",score:88,description:"Default button background color"})}return o}queryUtilities(e,r){let o=[],n=this.pds.ontology;if(!n?.utilities)return o;let a=n.utilities,i=[];for(let l of Object.values(a))if(typeof l=="object")for(let c of Object.values(l))Array.isArray(c)&&i.push(...c);return e.intents.has("border")&&i.filter(c=>c.includes("border")||c.includes("outline")).forEach(c=>{let d=80;r.includes("gradient")&&c.includes("gradient")&&(d=95),r.includes("glow")&&c.includes("glow")&&(d=95),o.push({text:`${c} - Border utility class`,value:c,icon:"code",category:"Utility Class",score:d,code:`<div class="${c}">...</div>`,description:this.describeUtility(c)})}),e.intents.has("layout")&&i.filter(c=>c.includes("flex")||c.includes("grid")||c.includes("items-")||c.includes("justify-")||c.includes("gap-")).forEach(c=>{o.push({text:`${c} - Layout utility`,value:c,icon:"layout",category:"Utility Class",score:85,code:`<div class="${c}">...</div>`,description:this.describeUtility(c)})}),r.includes("group")&&e.entities.has("button")&&o.push({text:".btn-group - Group buttons together",value:".btn-group",icon:"code",category:"Utility Class",score:90,code:`<div class="btn-group">
  <button class="btn-primary">One</button>
  <button class="btn-primary">Two</button>
</div>`,description:"Container for grouped buttons with connected styling"}),o}queryComponents(e,r){let o=[],n=this.pds.ontology;return!n?.components&&!n?.primitives||(n.components&&n.components.forEach(a=>{let i=this.scoreMatch(r,a.name+" "+a.id);i>50&&o.push({text:`<${a.id}> - ${a.name}`,value:a.id,icon:"brackets-curly",category:"Web Component",score:i,code:`<${a.id}></${a.id}>`,description:a.description||`${a.name} web component`})}),n.primitives&&n.primitives.forEach(a=>{let i=this.scoreMatch(r,a.name+" "+a.id);if(i>50){let l=a.selectors?.[0]||a.id;o.push({text:`${l} - ${a.name}`,value:a.id,icon:"tag",category:"Primitive",score:i-5,code:this.generatePrimitiveExample(a),description:a.description||`${a.name} primitive element`})}}),r.includes("icon")&&(r.includes("only")||r.includes("button"))&&o.push({text:'Icon-only button: <button class="btn-icon">',value:"btn-icon",icon:"star",category:"Pattern",score:95,code:`<button class="btn-icon btn-primary">
  <pds-icon icon="heart"></pds-icon>
</button>`,description:"Button with only an icon, no text label"})),o}queryPatterns(e,r){let o=[],n=this.pds.ontology;return n?.layoutPatterns&&(n.layoutPatterns.forEach(a=>{let i=this.scoreMatch(r,a.name+" "+a.id+" "+(a.description||""));if(i>50){let l=a.selectors?.[0]||`.${a.id}`;o.push({text:`${a.name} - ${a.description||"Layout pattern"}`,value:a.id,icon:"layout",category:"Layout Pattern",score:i,code:`<div class="${l.replace(".","")}">
  <!-- content -->
</div>`,description:a.description||a.name})}}),(r.includes("container")||r.includes("group"))&&(o.push({text:"Card - Container for grouping content",value:"card",icon:"layout",category:"Primitive",score:88,code:`<article class="card">
  <header>
    <h3>Title</h3>
  </header>
  <p>Content...</p>
</article>`,description:"Card container with optional header, body, and footer"}),o.push({text:"Section - Semantic container for grouping",value:"section",icon:"layout",category:"Pattern",score:85,code:`<section>
  <h2>Section Title</h2>
  <!-- content -->
</section>`,description:"Semantic section element for content grouping"}))),o}queryTypography(e,r){let o=[],n=this.pds.compiled;if(!n?.tokens?.typography)return o;let a=n.tokens.typography;return(r.includes("heading")||r.includes("title"))&&o.push({text:"Heading font: var(--font-family-heading)",value:"--font-family-heading",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-heading)",description:"Font family for headings"}),(r.includes("body")||r.includes("text"))&&o.push({text:"Body font: var(--font-family-body)",value:"--font-family-body",icon:"text-aa",category:"Typography Token",score:85,cssVar:"var(--font-family-body)",description:"Font family for body text"}),o}querySpacing(e,r){let o=[],n=this.pds.compiled;if(!n?.tokens?.spacing)return o;let a=n.tokens.spacing;for(let[i,l]of Object.entries(a))["2","4","6","8"].includes(i)&&o.push({text:`Spacing ${i}: var(--spacing-${i})`,value:`--spacing-${i}`,icon:"ruler",category:"Spacing Token",score:75,cssVar:`var(--spacing-${i})`,description:`Spacing value: ${l}`});return o}scoreMatch(e,r){let o=e.toLowerCase(),n=r.toLowerCase(),a=0;if(o===n)return 100;n.includes(o)&&(a+=80);let i=this.tokenize(o),l=this.tokenize(n),c=i.filter(d=>l.includes(d)).length;return a+=c/i.length*40,n.startsWith(o)&&(a+=20),Math.min(100,a)}generatePrimitiveExample(e){let r=e.selectors?.[0]||e.id;return r.includes("button")||e.id==="button"?'<button class="btn-primary">Click me</button>':r.includes("card")||e.id==="card"?`<article class="card">
  <h3>Title</h3>
  <p>Content</p>
</article>`:r.includes("badge")||e.id==="badge"?'<span class="badge">New</span>':`<${r}>Content</${r}>`}describeUtility(e){return e.includes("border-gradient")?"Apply animated gradient border effect":e.includes("border-glow")?"Apply glowing border effect":e.includes("flex")?"Flexbox container utility":e.includes("grid")?"Grid container utility":e.includes("gap-")?"Set gap between flex/grid children":e.includes("items-")?"Align items in flex container":e.includes("justify-")?"Justify content in flex container":e===".btn-group"?"Group buttons with connected styling":"Utility class for styling"}}});var Rt={};ee(Rt,{deepMerge:()=>Lt,fragmentFromTemplateLike:()=>Ar,isObject:()=>ye,parseHTML:()=>Lr});function ye(t){return t&&typeof t=="object"&&!Array.isArray(t)}function Lt(t,e){let r={...t};return ye(t)&&ye(e)&&Object.keys(e).forEach(o=>{ye(e[o])?o in t?r[o]=Lt(t[o],e[o]):Object.assign(r,{[o]:e[o]}):Object.assign(r,{[o]:e[o]})}),r}function Ar(t){let e=Array.isArray(t?.strings)?t.strings:[],r=Array.isArray(t?.values)?t.values:[],o=new Set,n=[],a=/(\s)(\.[\w-]+)=\s*$/;for(let p=0;p<e.length;p+=1){let u=e[p]??"",f=u.match(a);if(f&&p<r.length){let y=f[2].slice(1),g=`pds-val-${p}`;u=u.replace(a,`$1data-pds-prop="${y}:${g}"`),o.add(p)}n.push(u),p<r.length&&!o.has(p)&&n.push(`<!--pds-val-${p}-->`)}let i=document.createElement("template");i.innerHTML=n.join("");let l=(p,u)=>{let f=p.parentNode;if(!f)return;if(u==null){f.removeChild(p);return}let h=y=>{if(y!=null){if(y instanceof Node){f.insertBefore(y,p);return}if(Array.isArray(y)){y.forEach(g=>h(g));return}f.insertBefore(document.createTextNode(String(y)),p)}};h(u),f.removeChild(p)},c=document.createTreeWalker(i.content,NodeFilter.SHOW_COMMENT),d=[];for(;c.nextNode();){let p=c.currentNode;p?.nodeValue?.startsWith("pds-val-")&&d.push(p)}return d.forEach(p=>{let u=Number(p.nodeValue.replace("pds-val-",""));l(p,r[u])}),i.content.querySelectorAll("*").forEach(p=>{let u=p.getAttribute("data-pds-prop");if(!u)return;let[f,h]=u.split(":"),y=Number(String(h).replace("pds-val-",""));f&&Number.isInteger(y)&&(p[f]=r[y]),p.removeAttribute("data-pds-prop")}),i.content}function Lr(t){return new DOMParser().parseFromString(t,"text/html").body.childNodes}var Ft=X(()=>{});ue();var Y="any",oe={type:"object",allowUnknown:!1,properties:{id:{type:"string",minLength:1,maxLength:64},name:{type:"string",minLength:1,maxLength:80},tags:{type:"array",uniqueItems:!0,items:{type:"string"}},themes:{type:"array",uniqueItems:!0,items:{type:"string",oneOf:[{const:"light",title:"Light"},{const:"dark",title:"Dark"},{const:"system",title:"System"}]}},description:{type:"string",maxLength:500},options:{type:"object",allowUnknown:!0,properties:{liquidGlassEffects:{type:"boolean"},backgroundMesh:{type:"number"}}},form:{type:"object",allowUnknown:!0,properties:{options:{type:"object",allowUnknown:!0,properties:{widgets:{type:"object",allowUnknown:!1,properties:{booleans:{type:"string"},numbers:{type:"string"},selects:{type:"string"}}},layouts:{type:"object",allowUnknown:!1,properties:{fieldsets:{type:"string"},arrays:{type:"string"}}},enhancements:{type:"object",allowUnknown:!1,properties:{icons:{type:"boolean"},datalists:{type:"boolean"},rangeOutput:{type:"boolean"},colorInput:{type:"boolean"}}},validation:{type:"object",allowUnknown:!1,properties:{showErrors:{type:"boolean"},validateOnChange:{type:"boolean"}}}}}}},colors:{type:"object",allowUnknown:!1,properties:{primary:{type:"string",relations:{tokens:["--color-primary-*","--color-primary-fill","--color-primary-text","--background-mesh-*"]}},secondary:{type:"string",relations:{tokens:["--color-secondary-*","--color-gray-*","--background-mesh-*"]}},accent:{type:"string",relations:{tokens:["--color-accent-*","--background-mesh-*"]}},background:{type:"string",relations:{tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},success:{type:["string","null"],relations:{tokens:["--color-success-*"]}},warning:{type:["string","null"],relations:{tokens:["--color-warning-*"]}},danger:{type:["string","null"],relations:{tokens:["--color-danger-*"]}},info:{type:["string","null"],relations:{tokens:["--color-info-*"]}},gradientStops:{type:"number"},elevationOpacity:{type:"number",relations:{tokens:["--surface-*-shadow"]}},darkMode:{type:"object",allowUnknown:!1,properties:{background:{type:"string",relations:{theme:"dark",tokens:["--color-surface-*","--color-surface-translucent-*","--surface-*-bg","--surface-*-text","--surface-*-text-secondary","--surface-*-text-muted","--surface-*-icon","--surface-*-icon-subtle","--surface-*-shadow","--surface-*-border"]}},primary:{type:"string",relations:{theme:"dark",tokens:["--color-primary-*","--color-primary-fill","--color-primary-text"]}},secondary:{type:"string",relations:{theme:"dark",tokens:["--color-secondary-*","--color-gray-*"]}},accent:{type:"string",relations:{theme:"dark",tokens:["--color-accent-*"]}}}}}},typography:{type:"object",allowUnknown:!1,properties:{fontFamilyHeadings:{type:"string",relations:{tokens:["--font-family-headings"]}},fontFamilyBody:{type:"string",relations:{tokens:["--font-family-body"]}},fontFamilyMono:{type:"string",relations:{tokens:["--font-family-mono"]}},baseFontSize:{type:"number",relations:{tokens:["--font-size-*"]}},fontScale:{type:"number",relations:{tokens:["--font-size-*"]}},fontWeightLight:{type:["string","number"],relations:{tokens:["--font-weight-light"]}},fontWeightNormal:{type:["string","number"],relations:{tokens:["--font-weight-normal"]}},fontWeightMedium:{type:["string","number"],relations:{tokens:["--font-weight-medium"]}},fontWeightSemibold:{type:["string","number"],relations:{tokens:["--font-weight-semibold"]}},fontWeightBold:{type:["string","number"],relations:{tokens:["--font-weight-bold"]}},lineHeightTight:{type:["string","number"],relations:{tokens:["--font-line-height-tight"]}},lineHeightNormal:{type:["string","number"],relations:{tokens:["--font-line-height-normal"]}},lineHeightRelaxed:{type:["string","number"],relations:{tokens:["--font-line-height-relaxed"]}},letterSpacingTight:{type:"number"},letterSpacingNormal:{type:"number"},letterSpacingWide:{type:"number"}}},spatialRhythm:{type:"object",allowUnknown:!1,properties:{baseUnit:{type:"number",relations:{tokens:["--spacing-*"]}},scaleRatio:{type:"number"},maxSpacingSteps:{type:"number",relations:{tokens:["--spacing-*"]}},containerPadding:{type:"number"},inputPadding:{type:"number",relations:{rules:[{selectors:["input","textarea","select"],properties:["padding"]}]}},buttonPadding:{type:"number",relations:{rules:[{selectors:["button",".btn"],properties:["padding"]}]}},sectionSpacing:{type:"number",relations:{rules:[{selectors:["section"],properties:["margin","padding"]}]}}}},shape:{type:"object",allowUnknown:!1,properties:{radiusSize:{type:["string","number"],relations:{tokens:["--radius-*"]}},customRadius:{type:["string","number","null"]},borderWidth:{type:["string","number"],relations:{tokens:["--border-width-*"]}}}},behavior:{type:"object",allowUnknown:!1,properties:{transitionSpeed:{type:["string","number"],relations:{tokens:["--transition-*"]}},animationEasing:{type:"string"},customTransitionSpeed:{type:["number","null"]},customEasing:{type:["string","null"]},focusRingWidth:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["outline-width","box-shadow"]}]}},focusRingOpacity:{type:"number",relations:{rules:[{selectors:[":focus-visible"],properties:["box-shadow","outline-color"]}]}},hoverOpacity:{type:"number"}}},layout:{type:"object",allowUnknown:!1,properties:{maxWidth:{type:["number","string"],relations:{tokens:["--layout-max-width","--layout-max-width-*"]}},maxWidths:{type:"object",allowUnknown:!1,properties:{sm:{type:["number","string"],relations:{tokens:["--layout-max-width-sm"]}},md:{type:["number","string"],relations:{tokens:["--layout-max-width-md"]}},lg:{type:["number","string"],relations:{tokens:["--layout-max-width-lg"]}},xl:{type:["number","string"],relations:{tokens:["--layout-max-width-xl"]}}}},containerPadding:{type:["number","string"],relations:{tokens:["--layout-container-padding"]}},breakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"number"},md:{type:"number"},lg:{type:"number"},xl:{type:"number"}}},gridColumns:{type:"number"},gridGutter:{type:"number"},densityCompact:{type:"number"},densityNormal:{type:"number"},densityComfortable:{type:"number"},buttonMinHeight:{type:"number"},inputMinHeight:{type:"number"},baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}},utilities:{type:"object",allowUnknown:!0,properties:{grid:{type:"boolean"},flex:{type:"boolean"},spacing:{type:"boolean"},container:{type:"boolean"}}},gridSystem:{type:"object",allowUnknown:!0,properties:{columns:{type:"array",items:{type:"number"}},autoFitBreakpoints:{type:"object",allowUnknown:!1,properties:{sm:{type:"string"},md:{type:"string"},lg:{type:"string"},xl:{type:"string"}}},enableGapUtilities:{type:"boolean"}}},containerMaxWidth:{type:["number","string"]}}},layers:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{tokens:["--shadow-*"]}},shadowBlurMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowOffsetMultiplier:{type:"number",relations:{tokens:["--shadow-*"]}},shadowDepth:{type:"string"},blurLight:{type:"number"},blurMedium:{type:"number"},blurHeavy:{type:"number"},baseZIndex:{type:"number",relations:{tokens:["--z-*"]}},zIndexStep:{type:"number",relations:{tokens:["--z-*"]}},zIndexBase:{type:"number"},zIndexDropdown:{type:"number"},zIndexSticky:{type:"number"},zIndexFixed:{type:"number"},zIndexModal:{type:"number"},zIndexPopover:{type:"number"},zIndexTooltip:{type:"number"},zIndexNotification:{type:"number"},darkMode:{type:"object",allowUnknown:!1,properties:{baseShadowOpacity:{type:"number",relations:{theme:"dark",tokens:["--shadow-*"]}}}}}},advanced:{type:"object",allowUnknown:!0,properties:{linkStyle:{type:"string"},colorDerivation:{type:"string"}}},a11y:{type:"object",allowUnknown:!0,properties:{minTouchTarget:{type:["string","number"]},prefersReducedMotion:{type:"boolean"},focusStyle:{type:"string"}}},icons:{type:"object",allowUnknown:!1,properties:{set:{type:"string"},weight:{type:"string"},defaultSize:{type:"number",relations:{tokens:["--icon-size"]}},sizes:{type:"object",allowUnknown:!0,properties:{xs:{type:["number","string"]},sm:{type:["number","string"]},md:{type:["number","string"]},lg:{type:["number","string"]},xl:{type:["number","string"]},"2xl":{type:["number","string"]}}},spritePath:{type:"string"},externalPath:{type:"string"},include:{type:"object",allowUnknown:!0,properties:{navigation:{type:"array",items:{type:"string"}},actions:{type:"array",items:{type:"string"}},communication:{type:"array",items:{type:"string"}},content:{type:"array",items:{type:"string"}},status:{type:"array",items:{type:"string"}},time:{type:"array",items:{type:"string"}},commerce:{type:"array",items:{type:"string"}},formatting:{type:"array",items:{type:"string"}},system:{type:"array",items:{type:"string"}}}}}},components:{type:"object",allowUnknown:!0},debug:{type:"boolean"}}},Kt={type:"object",allowUnknown:!0,properties:{mode:{type:"string"},preset:{type:"string"},design:oe,enhancers:{type:["object","array"]},applyGlobalStyles:{type:"boolean"},manageTheme:{type:"boolean"},themeStorageKey:{type:"string"},preloadStyles:{type:"boolean"},criticalLayers:{type:"array",items:{type:"string"}},autoDefine:{type:"object",allowUnknown:!1,properties:{predefine:{type:"array",items:{type:"string"}},mapper:{type:Y},enhancers:{type:["object","array"]},scanExisting:{type:"boolean"},observeShadows:{type:"boolean"},patchAttachShadow:{type:"boolean"},debounceMs:{type:"number"},onError:{type:Y},baseURL:{type:"string"}}},managerURL:{type:"string"},manager:{type:Y},liveEdit:{type:"boolean"},log:{type:Y}}};function te(t){return t===null?"null":Array.isArray(t)?"array":typeof t}function Xt(t,e){if(e===Y)return!0;let r=te(t);return Array.isArray(e)?e.includes(r):r===e}function ge(t,e,r,o){if(!e)return;let n=e.type||Y;if(!Xt(t,n)){o.push({path:r,expected:n,actual:te(t),message:`Expected ${n} but got ${te(t)}`});return}if(n==="array"&&e.items&&Array.isArray(t)&&t.forEach((a,i)=>{ge(a,e.items,`${r}[${i}]`,o)}),n==="object"&&t&&typeof t=="object"){let a=e.properties||{};for(let[i,l]of Object.entries(t)){if(!Object.prototype.hasOwnProperty.call(a,i)){e.allowUnknown||o.push({path:`${r}.${i}`,expected:"known property",actual:"unknown",message:`Unknown property "${i}"`});continue}ge(l,a[i],`${r}.${i}`,o)}}}function Le(t,e="",r={}){if(!t||typeof t!="object")return r;if(t.relations&&e&&(r[e]=t.relations),t.type==="object"&&t.properties&&Object.entries(t.properties).forEach(([o,n])=>{let a=e?`${e}.${o}`:o;Le(n,a,r)}),t.type==="array"&&t.items){let o=`${e}[]`;Le(t.items,o,r)}return r}var it=Le(oe,""),st=oe,er={"colors.primary":{widget:"input-color"},"colors.secondary":{widget:"input-color"},"colors.accent":{widget:"input-color"},"colors.background":{widget:"input-color"},"colors.success":{widget:"input-color"},"colors.warning":{widget:"input-color"},"colors.danger":{widget:"input-color"},"colors.info":{widget:"input-color"},"colors.gradientStops":{min:2,max:8,step:1,widget:"range"},"colors.elevationOpacity":{min:0,max:1,step:.01,widget:"range"},"colors.darkMode.background":{widget:"input-color"},"colors.darkMode.primary":{widget:"input-color"},"colors.darkMode.secondary":{widget:"input-color"},"colors.darkMode.accent":{widget:"input-color"},description:{widget:"textarea",maxLength:500,rows:4,placeholder:"Summarize the visual and interaction intent"},"typography.fontFamilyHeadings":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Heading font stack"},"typography.fontFamilyBody":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Body font stack"},"typography.fontFamilyMono":{widget:"font-family-omnibox",icon:"text-aa",placeholder:"Monospace font stack"},"typography.baseFontSize":{min:8,max:32,step:1,widget:"input-range"},"typography.fontScale":{min:1,max:2,step:.01,widget:"range"},"typography.fontWeightLight":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightNormal":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightMedium":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightSemibold":{min:100,max:800,step:100,widget:"input-range"},"typography.fontWeightBold":{min:100,max:800,step:100,widget:"input-range"},"typography.lineHeightTight":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightNormal":{min:.75,max:3,step:.001,widget:"input-range"},"typography.lineHeightRelaxed":{min:.75,max:3,step:.001,widget:"input-range"},"typography.letterSpacingTight":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingNormal":{min:-.1,max:.1,step:.001,widget:"range"},"typography.letterSpacingWide":{min:-.1,max:.1,step:.001,widget:"range"},"spatialRhythm.baseUnit":{min:1,max:16,step:1,widget:"range"},"spatialRhythm.scaleRatio":{min:1,max:2,step:.01,widget:"range"},"spatialRhythm.maxSpacingSteps":{min:4,max:64,step:1,widget:"range"},"spatialRhythm.containerPadding":{min:0,max:8,step:.05,widget:"range"},"spatialRhythm.inputPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.buttonPadding":{min:0,max:4,step:.05,widget:"range"},"spatialRhythm.sectionSpacing":{min:0,max:8,step:.05,widget:"range"},"shape.radiusSize":{oneOf:Object.entries(m.RadiusSizes).map(([t,e])=>({const:e,title:t}))},"shape.borderWidth":{widget:"select",oneOf:Object.entries(m.BorderWidths).map(([t,e])=>({const:e,title:t}))},"shape.customRadius":{min:0,max:64,step:1,widget:"range"},"behavior.transitionSpeed":{oneOf:Object.entries(m.TransitionSpeeds).map(([t,e])=>({const:e,title:t}))},"behavior.animationEasing":{enum:Object.values(m.AnimationEasings)},"behavior.customTransitionSpeed":{min:0,max:1e3,step:10,widget:"range"},"behavior.focusRingWidth":{min:0,max:8,step:1,widget:"range"},"behavior.focusRingOpacity":{min:0,max:1,step:.01,widget:"range"},"behavior.hoverOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.gridColumns":{min:1,max:24,step:1,widget:"range"},"layout.gridGutter":{min:0,max:8,step:.05,widget:"range"},"layout.maxWidth":{widget:"input-text",placeholder:"e.g. 1200 or 1200px"},"layout.maxWidths.sm":{widget:"input-text",placeholder:"e.g. 640 or 640px"},"layout.maxWidths.md":{widget:"input-text",placeholder:"e.g. 768 or 768px"},"layout.maxWidths.lg":{widget:"input-text",placeholder:"e.g. 1024 or 1024px"},"layout.maxWidths.xl":{widget:"input-text",placeholder:"e.g. 1280 or 1280px"},"layout.containerMaxWidth":{widget:"input-text",placeholder:"e.g. 1400px"},"layout.containerPadding":{widget:"input-text",placeholder:"e.g. var(--spacing-6)"},"layout.breakpoints.sm":{min:320,max:2560,step:1,widget:"input-number"},"layout.breakpoints.md":{min:480,max:3200,step:1,widget:"input-number"},"layout.breakpoints.lg":{min:640,max:3840,step:1,widget:"input-number"},"layout.breakpoints.xl":{min:768,max:5120,step:1,widget:"input-number"},"layout.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layout.densityCompact":{min:.5,max:2,step:.05,widget:"range"},"layout.densityNormal":{min:.5,max:2,step:.05,widget:"range"},"layout.densityComfortable":{min:.5,max:2,step:.05,widget:"range"},"layout.buttonMinHeight":{min:24,max:96,step:1,widget:"range"},"layout.inputMinHeight":{min:24,max:96,step:1,widget:"range"},"layers.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"layers.shadowBlurMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.shadowOffsetMultiplier":{min:0,max:8,step:.1,widget:"range"},"layers.blurLight":{min:0,max:48,step:1,widget:"range"},"layers.blurMedium":{min:0,max:64,step:1,widget:"range"},"layers.blurHeavy":{min:0,max:96,step:1,widget:"range"},"layers.baseZIndex":{min:0,max:1e4,step:10,widget:"range"},"layers.zIndexStep":{min:1,max:100,step:1,widget:"range"},"layers.darkMode.baseShadowOpacity":{min:0,max:1,step:.01,widget:"range"},"advanced.linkStyle":{enum:Object.values(m.LinkStyles)},"a11y.minTouchTarget":{oneOf:Object.entries(m.TouchTargetSizes).map(([t,e])=>({const:e,title:t}))},"a11y.focusStyle":{enum:Object.values(m.FocusStyles)},"icons.defaultSize":{min:8,max:128,step:1,widget:"range",icon:"sparkle"}};function tt(t=[]){return t.join(".")}function rt(t=[]){return`/${t.join("/")}`}function tr(t,e=[]){if(!(!t||typeof t!="object"))return e.reduce((r,o)=>{if(r!=null&&typeof r=="object")return r[o]},t)}function ot(t,e,r=[]){if(t!=null)return t;let o=tr(e,r);return o??void 0}function re(t=""){return String(t).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/^./,e=>e.toUpperCase())}function lt(t,e){if(!t)return"string";let r=t.type||"string";if(Array.isArray(r)){let o=te(e);return o!=="undefined"&&r.includes(o)?o:r.includes("string")?"string":r.find(n=>n!=="null")||r[0]||"string"}return r}function Ae(t,e,r=[]){return!t||!e||!Array.isArray(r)||r.forEach(o=>{e[o]!==void 0&&(t[o]=e[o])}),t}function at(t,e){return Array.isArray(e?.oneOf)&&e.oneOf.length?e.oneOf:Array.isArray(e?.enum)&&e.enum.length?e.enum.map(r=>({const:r,title:re(r)})):Array.isArray(t?.oneOf)&&t.oneOf.length?t.oneOf:Array.isArray(t?.enum)&&t.enum.length?t.enum.map(r=>({const:r,title:re(r)})):null}function rr(t){return t&&(t==="range"?"input-range":t)}function or(t,e){if(!Array.isArray(e)||!e.length)return t;let r=new Set;for(let o of e)!o||o.const===void 0||r.add(te(o.const));if(!r.size)return t;if(r.size===1){let o=Array.from(r)[0];if(o==="number")return"number";if(o==="string")return"string";if(o==="boolean")return"boolean"}return t}function nt(t,e,r){let o=lt(e,r),n=t.toLowerCase(),a={label:re(t.split(".").slice(-1)[0]||t)};o==="boolean"&&(a.widget="toggle"),o==="number"&&(a.widget="range",n.includes("opacity")?(a.min=0,a.max=1,a.step=.01):n.includes("lineheight")?(a.min=.75,a.max=3,a.step=.001,a.widget="input-range"):n.includes("fontweight")?(a.min=100,a.max=800,a.step=100,a.widget="input-range"):n.endsWith("basefontsize")?(a.min=8,a.max=32,a.step=1,a.widget="input-range"):n.includes("scale")||n.includes("ratio")?(a.min=1,a.max=2,a.step=.01):(a.min=0,a.max=Math.max(10,Number.isFinite(Number(r))?Number(r)*4:100),a.step=1)),o==="string"&&t.startsWith("colors.")&&(a.widget="input-color"),o==="string"&&n==="description"&&(a.widget="textarea",a.maxLength=500,a.rows=4);let i=er[t]||{},l={...a,...i};return l.widget&&(l.widget=rr(l.widget)),l}function ct(t,e,r,o,n,a){if(!t||typeof t!="object")return null;let i=ot(e,a,r),l=lt(t,i);if(l==="object"&&t.properties){let b={type:"object",properties:{}};r.length>0&&(b.title=re(r[r.length-1]));let v={};for(let[S,T]of Object.entries(t.properties)){let M=e&&typeof e=="object"&&!Array.isArray(e)?e[S]:void 0,$=ct(T,M,[...r,S],o,n,a);$&&(b.properties[S]=$.schema,$.hasValue&&(v[S]=$.value))}return Object.keys(b.properties).length?{schema:b,value:v,hasValue:Object.keys(v).length>0}:null}if(l==="array"){let b=tt(r),v=nt(b,t,e);n[b]=v;let S=ot(e,a,r),T=t.items?.type||"string",M=Array.isArray(T)?T[0]:T,$={type:M},R=at(t?.items,null);if(R&&($.oneOf=R),M==="string"&&Array.isArray(S)&&S.length>0){let F=S.find(I=>typeof I=="string"&&I.trim().length>0);F&&($.examples=[F])}Ae($,t?.items,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","minItems","maxItems","uniqueItems","description","default"]);let x={type:"array",items:$};Ae(x,t,["minItems","maxItems","uniqueItems","description","default"]);let w=rt(r),C={},z=Array.isArray($.oneOf)&&$.oneOf.length>0;if(M==="string"&&z&&(C["ui:widget"]=x.maxItems===1?"radio":"checkbox-group"),M==="string"&&Array.isArray(S)&&S.length>0){let F=S.filter(I=>typeof I=="string"&&I.trim().length>0).slice(0,5).join(", ");F&&(C["ui:placeholder"]=F)}return Object.keys(C).length&&(o[w]={...o[w]||{},...C}),{schema:x,value:Array.isArray(e)?e:[],hasValue:Array.isArray(e)}}let c=tt(r),d=nt(c,t,i);n[c]=d;let s=at(t,d),f={type:or(l==="null"?"string":l,s),title:d.label||re(r[r.length-1]||c)};s&&(f.oneOf=s),Ae(f,t,["minimum","maximum","exclusiveMinimum","exclusiveMaximum","multipleOf","minLength","maxLength","pattern","format","description","default"]),typeof d.maxLength=="number"&&f.maxLength===void 0&&(f.maxLength=d.maxLength),(f.type==="number"||f.type==="integer")&&typeof d.min=="number"&&f.minimum===void 0&&(f.minimum=d.min),(f.type==="number"||f.type==="integer")&&typeof d.max=="number"&&f.maximum===void 0&&(f.maximum=d.max),(f.type==="number"||f.type==="integer")&&typeof d.step=="number"&&f.multipleOf===void 0&&(f.multipleOf=d.step);let h=i;h!==void 0&&(f.examples=[h]);let y=rt(r),g={};return d.widget&&(g["ui:widget"]=d.widget),d.icon&&(g["ui:icon"]=d.icon),typeof d.min=="number"&&(g["ui:min"]=d.min),typeof d.max=="number"&&(g["ui:max"]=d.max),typeof d.step=="number"&&(g["ui:step"]=d.step),d.placeholder&&(g["ui:placeholder"]=d.placeholder),typeof d.rows=="number"&&(g["ui:options"]={...g["ui:options"]||{},rows:d.rows}),d.widget==="input-range"&&h!==void 0&&(g["ui:allowUnset"]=!0),(typeof d.min=="number"||typeof d.max=="number"||typeof d.step=="number")&&(g["ui:options"]={...g["ui:options"]||{},...typeof d.min=="number"?{min:d.min}:{},...typeof d.max=="number"?{max:d.max}:{},...typeof d.step=="number"?{step:d.step}:{}}),Object.keys(g).length&&(o[y]=g),{schema:f,value:e,hasValue:e!==void 0}}function Z(t={}){let e={},r={"/colors":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}},"/colors/darkMode":{"ui:layout":"flex","ui:layoutOptions":{wrap:!0,gap:"sm"}}},o=U?.default&&typeof U.default=="object"?U.default:null,n=ct(oe,t,[],r,e,o);return{schema:n?.schema||{type:"object",properties:{}},uiSchema:r,values:n?.value||{},metadata:e}}function ae(t={}){return Z(t).metadata}function Re(t,{log:e,context:r="PDS config"}={}){if(!t||typeof t!="object")return[];let o=[];return ge(t,oe,"design",o),o.length&&typeof e=="function"&&o.forEach(n=>{e("warn",`[${r}] ${n.message} at ${n.path}`)}),o}function Fe(t,{log:e,context:r="PDS config"}={}){if(!t||typeof t!="object")return[];let o=[];return ge(t,Kt,"config",o),o.length&&typeof e=="function"&&o.forEach(n=>{e("warn",`[${r}] ${n.message} at ${n.path}`)}),o}var U={"ocean-breeze":{id:"ocean-breeze",name:"Ocean Breeze",tags:["playful"],description:"Fresh and calming ocean-inspired palette with professional undertones",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#0891b2",secondary:"#64748b",accent:"#06b6d4",background:"#f0f9ff",darkMode:{background:"#0c1821",secondary:"#94a3b8",primary:"#0891b2"}},typography:{baseFontSize:17,fontScale:1.5,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'},spatialRhythm:{baseUnit:6,scaleRatio:1.2},shape:{radiusSize:m.RadiusSizes.xxlarge}},"midnight-steel":{id:"midnight-steel",name:"Midnight Steel",description:"Bold industrial aesthetic with sharp contrasts and urban edge",colors:{primary:"#3b82f6",secondary:"#52525b",accent:"#f59e0b",background:"#fafaf9",darkMode:{background:"#18181b",secondary:"#71717a",primary:"#3b82f6"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'IBM Plex Sans', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:m.RadiusSizes.small,borderWidth:m.BorderWidths.thin}},"neural-glow":{id:"neural-glow",name:"Neural Glow",description:"AI-inspired with vibrant purple-blue gradients and futuristic vibes",colors:{primary:"#8b5cf6",secondary:"#6366f1",accent:"#ec4899",background:"#faf5ff",darkMode:{background:"#0f0a1a",secondary:"#818cf8",primary:"#8b5cf6"}},typography:{baseFontSize:16,fontScale:1.618,fontFamilyHeadings:"'Space Grotesk', system-ui, sans-serif",fontFamilyBody:"'Space Grotesk', system-ui, sans-serif"},spatialRhythm:{baseUnit:4,scaleRatio:1.5},shape:{radiusSize:m.RadiusSizes.xlarge,borderWidth:m.BorderWidths.medium},behavior:{transitionSpeed:m.TransitionSpeeds.fast}},"paper-and-ink":{id:"paper-and-ink",name:"Paper & Ink",tags:["app","featured"],themes:["light"],description:"Ultra-minimal design with focus on typography and whitespace",colors:{primary:"#171717",secondary:"#737373",accent:"#525252",background:"#ffffff",darkMode:{background:"#0a0a0a",secondary:"#a3a3a3",primary:"#737373"}},typography:{baseFontSize:18,fontScale:1.333,fontFamilyHeadings:"'Helvetica Neue', 'Arial', sans-serif",fontFamilyBody:"'Georgia', 'Times New Roman', serif",fontWeightNormal:400,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.2},shape:{radiusSize:m.RadiusSizes.none,borderWidth:m.BorderWidths.thin}},"sunset-paradise":{id:"sunset-paradise",name:"Sunset Paradise",description:"Warm tropical colors evoking golden hour by the beach",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#ea580c",secondary:"#d4a373",accent:"#fb923c",background:"#fffbeb",darkMode:{background:"#1a0f0a",secondary:"#c9a482",primary:"#f97316"}},typography:{baseFontSize:16,fontScale:1.5,fontFamilyHeadings:"'Quicksand', 'Comfortaa', sans-serif",fontFamilyBody:"'Quicksand', 'Comfortaa', sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.5},shape:{radiusSize:m.RadiusSizes.xxlarge,borderWidth:m.BorderWidths.medium}},"retro-wave":{id:"retro-wave",name:"Retro Wave",description:"Nostalgic 80s-inspired palette with neon undertones",colors:{primary:"#c026d3",secondary:"#a78bfa",accent:"#22d3ee",background:"#fef3ff",darkMode:{background:"#1a0a1f",secondary:"#c4b5fd",primary:"#d946ef"}},typography:{baseFontSize:15,fontScale:1.5,fontFamilyHeadings:"'Orbitron', 'Impact', monospace",fontFamilyBody:"'Courier New', 'Courier', monospace",fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:m.RadiusSizes.none,borderWidth:m.BorderWidths.thick},behavior:{transitionSpeed:m.TransitionSpeeds.instant}},"forest-canopy":{id:"forest-canopy",name:"Forest Canopy",description:"Natural earth tones with organic, calming green hues",colors:{primary:"#059669",secondary:"#78716c",accent:"#84cc16",background:"#f0fdf4",darkMode:{background:"#0a1410",secondary:"#a8a29e",primary:"#10b981"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Merriweather Sans', 'Arial', sans-serif",fontFamilyBody:"'Merriweather', 'Georgia', serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:m.RadiusSizes.medium,borderWidth:m.BorderWidths.thin}},"ruby-elegance":{id:"ruby-elegance",name:"Ruby Elegance",description:"Sophisticated palette with rich ruby reds and warm accents",colors:{primary:"#dc2626",secondary:"#9ca3af",accent:"#be123c",background:"#fef2f2",darkMode:{background:"#1b0808",secondary:"#d1d5db",primary:"#ef4444"}},typography:{baseFontSize:17,fontScale:1.5,fontFamilyHeadings:"'Playfair Display', 'Georgia', serif",fontFamilyBody:"'Crimson Text', 'Garamond', serif",fontWeightNormal:400,fontWeightSemibold:600},spatialRhythm:{baseUnit:4,scaleRatio:1.333},shape:{radiusSize:m.RadiusSizes.small,borderWidth:m.BorderWidths.thin}},"desert-dawn":{id:"desert-dawn",name:"Desert Dawn",description:"Sun-baked neutrals with grounded terracotta and cool oasis accents",colors:{primary:"#b45309",secondary:"#a8a29e",accent:"#0ea5a8",background:"#fcf6ef",darkMode:{background:"#12100e",secondary:"#d1d5db",primary:"#f59e0b"}},typography:{baseFontSize:16,fontScale:1.414,fontFamilyHeadings:"'Source Sans Pro', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Source Serif Pro', Georgia, serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.3},shape:{radiusSize:m.RadiusSizes.medium,borderWidth:m.BorderWidths.medium}},"contrast-pro":{id:"contrast-pro",name:"Contrast Pro",description:"Accessibility-first, high-contrast UI with assertive clarity",colors:{primary:"#1f2937",secondary:"#111827",accent:"#eab308",background:"#ffffff",darkMode:{background:"#0b0f14",secondary:"#9ca3af",primary:"#9ca3af"}},typography:{baseFontSize:17,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightBold:700},spatialRhythm:{baseUnit:3,scaleRatio:1.2},shape:{radiusSize:m.RadiusSizes.small,borderWidth:m.BorderWidths.thick},behavior:{transitionSpeed:m.TransitionSpeeds.fast,focusRingWidth:4}},"pastel-play":{id:"pastel-play",name:"Pastel Play",themes:["light"],description:"Playful pastels with soft surfaces and friendly rounded shapes",colors:{primary:"#db2777",secondary:"#a78bfa",accent:"#34d399",background:"#fff7fa",darkMode:{background:"#1a1016",secondary:"#c4b5fd",primary:"#ec4899"}},typography:{baseFontSize:16,fontScale:1.333,fontFamilyHeadings:"'Nunito', system-ui, -apple-system, sans-serif",fontFamilyBody:"'Nunito', system-ui, -apple-system, sans-serif",lineHeightRelaxed:m.LineHeights.relaxed},spatialRhythm:{baseUnit:6,scaleRatio:1.4},shape:{radiusSize:m.RadiusSizes.xxlarge,borderWidth:m.BorderWidths.thin},behavior:{transitionSpeed:m.TransitionSpeeds.slow,animationEasing:m.AnimationEasings["ease-out"]}},"brutalist-tech":{id:"brutalist-tech",name:"Brutalist Tech",description:"Stark grayscale with engineered accents and unapologetically bold structure",colors:{primary:"#111111",secondary:"#4b5563",accent:"#06b6d4",background:"#f8fafc",darkMode:{background:"#0c0c0c",secondary:"#9ca3af",primary:"#06b6d4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",fontFamilyBody:"'Inter', system-ui, -apple-system, sans-serif",letterSpacingTight:-.02},spatialRhythm:{baseUnit:4,scaleRatio:1.25},shape:{radiusSize:m.RadiusSizes.none,borderWidth:m.BorderWidths.thick},behavior:{transitionSpeed:m.TransitionSpeeds.instant}},"zen-garden":{id:"zen-garden",name:"Zen Garden",description:"Soft botanicals with contemplative spacing and balanced motion",colors:{primary:"#3f6212",secondary:"#6b7280",accent:"#7c3aed",background:"#f7fbef",darkMode:{background:"#0d130a",secondary:"#a3a3a3",primary:"#84cc16"}},typography:{baseFontSize:17,fontScale:1.414,fontFamilyHeadings:"'Merriweather', Georgia, serif",fontFamilyBody:"'Noto Sans', system-ui, -apple-system, sans-serif"},spatialRhythm:{baseUnit:6,scaleRatio:1.35},shape:{radiusSize:m.RadiusSizes.large,borderWidth:m.BorderWidths.medium},behavior:{transitionSpeed:m.TransitionSpeeds.normal,animationEasing:m.AnimationEasings.ease}},"fitness-pro":{id:"fitness-pro",name:"Fitness Pro",tags:["app","featured"],description:"Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",options:{liquidGlassEffects:!0,backgroundMesh:2},colors:{primary:"#e91e63",secondary:"#78909c",accent:"#ab47bc",background:"#fafafa",darkMode:{background:"#1a1d21",secondary:"#78909c",primary:"#0a4ca4"}},typography:{baseFontSize:15,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:m.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.25,sectionSpacing:2.5},shape:{radiusSize:m.RadiusSizes.large,borderWidth:m.BorderWidths.thin},layers:{shadowDepth:"medium",blurMedium:12},behavior:{transitionSpeed:m.TransitionSpeeds.fast,animationEasing:m.AnimationEasings["ease-out"],focusRingWidth:2}},"travel-market":{id:"travel-market",name:"Travel Market",description:"Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",options:{liquidGlassEffects:!0,backgroundMesh:3},colors:{primary:"#d93251",secondary:"#717171",accent:"#144990",background:"#ffffff",darkMode:{background:"#222222",secondary:"#b0b0b0",primary:"#ff5a7a"}},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightRelaxed:m.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,containerPadding:1.5,sectionSpacing:3},shape:{radiusSize:m.RadiusSizes.medium,borderWidth:m.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:8},behavior:{transitionSpeed:m.TransitionSpeeds.normal,animationEasing:m.AnimationEasings["ease-in-out"],hoverOpacity:.9}},"mobility-app":{id:"mobility-app",name:"Mobility App",tags:["app","featured"],description:"On-demand service platform with bold typography, map-ready colors, and action-driven UI",options:{liquidGlassEffects:!0,backgroundMesh:0},colors:{primary:"#000000",secondary:"#545454",accent:"#06c167",background:"#f6f6f6",darkMode:{background:"#0f0f0f",secondary:"#8a8a8a",primary:"#06c167"}},typography:{baseFontSize:16,fontScale:1.3,fontFamilyHeadings:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,buttonPadding:1.25,inputPadding:1},shape:{radiusSize:m.RadiusSizes.small,borderWidth:m.BorderWidths.medium},behavior:{transitionSpeed:m.TransitionSpeeds.fast,animationEasing:m.AnimationEasings["ease-out"],focusRingWidth:3},a11y:{minTouchTarget:m.TouchTargetSizes.comfortable,focusStyle:m.FocusStyles.ring}},"fintech-secure":{id:"fintech-secure",name:"Fintech Secure",description:"Financial services app UI with trust-building blues, precise spacing, and security-first design",options:{liquidGlassEffects:!1,backgroundMesh:0},colors:{primary:"#0a2540",secondary:"#425466",accent:"#00d4ff",background:"#f7fafc",darkMode:{background:"#0a1929",secondary:"#8796a5",primary:"#00d4ff"}},typography:{baseFontSize:16,fontScale:1.25,fontFamilyHeadings:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:2.5},shape:{radiusSize:m.RadiusSizes.medium,borderWidth:m.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:6},behavior:{transitionSpeed:m.TransitionSpeeds.fast,animationEasing:m.AnimationEasings["ease-in-out"],focusRingWidth:3,focusRingOpacity:.4},a11y:{minTouchTarget:m.TouchTargetSizes.standard,focusStyle:m.FocusStyles.ring}},"social-feed":{id:"social-feed",name:"Social Feed",tags:["app","featured"],description:"Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",options:{liquidGlassEffects:!0,backgroundMesh:4},colors:{primary:"#1877f2",secondary:"#65676b",accent:"#fe2c55",background:"#ffffff",darkMode:{background:"#18191a",secondary:"#b0b3b8",primary:"#2d88ff"}},typography:{baseFontSize:15,fontScale:1.2,fontFamilyHeadings:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontFamilyBody:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:m.LineHeights.relaxed},spatialRhythm:{baseUnit:4,scaleRatio:1.25,sectionSpacing:1.5},shape:{radiusSize:m.RadiusSizes.medium,borderWidth:m.BorderWidths.thin},behavior:{transitionSpeed:m.TransitionSpeeds.fast,animationEasing:m.AnimationEasings["ease-out"],hoverOpacity:.85}},"enterprise-dash":{id:"enterprise-dash",tags:["app","featured"],name:"Enterprise Dashboard",description:"Data-dense business intelligence app interface with organized hierarchy and professional polish",options:{liquidGlassEffects:!1},colors:{primary:"#0066cc",secondary:"#5f6368",accent:"#1a73e8",background:"#ffffff",success:"#34a853",warning:"#fbbc04",danger:"#ea4335",darkMode:{background:"#202124",secondary:"#9aa0a6",primary:"#8ab4f8"}},typography:{baseFontSize:14,fontScale:1.2,fontFamilyHeadings:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyBody:"'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",fontFamilyMono:"'Roboto Mono', ui-monospace, Consolas, monospace",fontWeightNormal:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700,lineHeightNormal:m.LineHeights.tight},spatialRhythm:{baseUnit:4,scaleRatio:1.2,containerPadding:1.5,sectionSpacing:2},shape:{radiusSize:m.RadiusSizes.small,borderWidth:m.BorderWidths.thin},layers:{shadowDepth:"light",blurLight:4},behavior:{transitionSpeed:m.TransitionSpeeds.fast,animationEasing:m.AnimationEasings["ease-in-out"],focusRingWidth:2},layout:{densityCompact:.85,gridColumns:12}}};U.default={id:"default",name:"Default",tags:["app","featured"],description:"Fresh and modern design system with balanced aesthetics and usability",options:{liquidGlassEffects:!0,backgroundMesh:4},form:{options:{widgets:{booleans:"toggle",numbers:"input",selects:"standard"},layouts:{fieldsets:"default",arrays:"default"},enhancements:{icons:!0,datalists:!0,rangeOutput:!0,colorInput:!0},validation:{showErrors:!0,validateOnChange:!1}}},colors:{primary:"#0e7490",secondary:"#a99b95",accent:"#e54271",background:"#e7e6de",darkMode:{background:"#16171a",secondary:"#8b9199",primary:"#06b6d4"},success:null,warning:"#B38600",danger:null,info:null,gradientStops:3,elevationOpacity:.05},typography:{baseFontSize:16,fontScale:1.2,fontFamilyHeadings:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyBody:'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',fontFamilyMono:'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',fontWeightLight:m.FontWeights.light,fontWeightNormal:m.FontWeights.normal,fontWeightMedium:m.FontWeights.medium,fontWeightSemibold:m.FontWeights.semibold,fontWeightBold:m.FontWeights.bold,lineHeightTight:m.LineHeights.tight,lineHeightNormal:m.LineHeights.normal,lineHeightRelaxed:m.LineHeights.relaxed,letterSpacingTight:-.025,letterSpacingNormal:0,letterSpacingWide:.025},spatialRhythm:{baseUnit:4,scaleRatio:1.25,maxSpacingSteps:32,containerPadding:1,inputPadding:.75,buttonPadding:1,sectionSpacing:2},layers:{baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},shadowDepth:"medium",blurLight:4,blurMedium:8,blurHeavy:16,zIndexBase:0,zIndexDropdown:1e3,zIndexSticky:1020,zIndexFixed:1030,zIndexModal:1040,zIndexPopover:1050,zIndexTooltip:1060,zIndexNotification:1070},shape:{radiusSize:m.RadiusSizes.large,borderWidth:m.BorderWidths.medium,customRadius:null},behavior:{transitionSpeed:m.TransitionSpeeds.normal,animationEasing:m.AnimationEasings["ease-out"],customTransitionSpeed:null,customEasing:null,focusRingWidth:3,focusRingOpacity:.3,hoverOpacity:.8},layout:{gridColumns:12,gridGutter:1,baseShadowOpacity:.1,darkMode:{baseShadowOpacity:.25},breakpoints:{sm:640,md:768,lg:1024,xl:1280},densityCompact:.8,densityNormal:1,densityComfortable:1.2,buttonMinHeight:m.TouchTargetSizes.standard,inputMinHeight:40,utilities:{grid:!0,flex:!0,spacing:!0,container:!0},gridSystem:{columns:[1,2,3,4,6],autoFitBreakpoints:{sm:"150px",md:"250px",lg:"350px",xl:"450px"},enableGapUtilities:!0},containerMaxWidth:"1400px",containerPadding:"var(--spacing-6)"},advanced:{linkStyle:m.LinkStyles.inline,colorDerivation:"hsl"},a11y:{minTouchTarget:m.TouchTargetSizes.standard,prefersReducedMotion:!0,focusStyle:m.FocusStyles.ring},icons:{set:"phosphor",weight:"regular",defaultSize:24,externalPath:"/assets/img/icons/",sizes:m.IconSizes,include:{navigation:["arrow-left","arrow-right","arrow-up","arrow-down","arrow-counter-clockwise","caret-left","caret-right","caret-down","caret-up","x","list","list-dashes","dots-three-vertical","dots-three","house","gear","magnifying-glass","funnel","tabs","sidebar"],actions:["plus","minus","check","trash","pencil","floppy-disk","copy","download","upload","share","link","eye","eye-slash","heart","star","bookmark","note-pencil","cursor-click","clipboard","magic-wand","sparkle"],communication:["envelope","bell","bell-ringing","bell-simple","chat-circle","phone","paper-plane-tilt","user","users","user-gear","at"],content:["image","file","file-text","file-css","file-js","folder","folder-open","book-open","camera","video-camera","play","pause","microphone","brackets-curly","code","folder-simple","grid-four","briefcase","chart-line","chart-bar","database","map-pin"],status:["info","warning","check-circle","x-circle","question","shield","shield-check","shield-warning","lock","lock-open","fingerprint","circle-notch"],time:["calendar","clock","timer","hourglass"],commerce:["shopping-cart","credit-card","currency-dollar","tag","receipt","storefront"],formatting:["text-align-left","text-align-center","text-align-right","text-b","text-italic","text-underline","list-bullets","list-numbers","text-aa"],system:["cloud","cloud-arrow-up","cloud-arrow-down","desktop","device-mobile","globe","wifi-high","battery-charging","sun","moon","moon-stars","palette","rocket","feather","square","circle","squares-four","lightning","wrench"]},spritePath:"/assets/pds/icons/pds-icons.svg"},debug:!1};var dt=ae(U.default),pt=Z(U.default);function je(t="log",e,...r){if(this?.debug||this?.design?.debug||!1||t==="error"||t==="warn"){let n=console[t]||console.log;r.length>0?n(e,...r):n(e)}}ue();Pe();var O=class t{static#m;static get instance(){return this.#m}#e;#a;constructor(e={}){this.options={debug:!1,...e},this.options.design||(this.options.design={}),this.options.debug&&this.options.log?.("debug","Generator options:",this.options),t.#m=this,this.tokens=this.generateTokens(),this.options.debug&&this.options.log?.("debug","Generated tokens:",this.tokens),this.#Se(),typeof CSSStyleSheet<"u"?this.#Te():this.options.debug&&this.options.log?.("debug","[Generator] Skipping browser features (CSSStyleSheet not available)")}generateTokens(){let e=this.options.design||{},r=this.#M(e),o=e.layers||{},n=this.#h(o,r.light),a=this.#z(n),i=r.dark!=null?this.#z(this.#h(o,r.dark)):null;return{colors:this.#T(e.colors||{},r),spacing:this.generateSpacingTokens(e.spatialRhythm||{}),radius:this.#O(e.shape||{}),borderWidths:this.#W(e.shape||{}),typography:this.generateTypographyTokens(e.typography||{}),shadows:a,darkShadows:i,layout:this.#_(e.layout||{}),transitions:this.#D(e.behavior||{}),zIndex:this.#U(e.layers||{}),icons:this.#H(e.icons||{})}}#M(e={}){let r=e.layout||{},o=e.layers||{};return{light:this.#f(r.baseShadowOpacity??o.baseShadowOpacity),dark:this.#f(r.darkMode?.baseShadowOpacity??o.darkMode?.baseShadowOpacity)}}#f(e){let r=Number(e);if(Number.isFinite(r))return Math.min(Math.max(r,0),1)}#h(e={},r){let o={...e};return r!=null&&(o.baseShadowOpacity=r),o}#T(e,r={}){let{primary:o="#3b82f6",secondary:n="#64748b",accent:a="#ec4899",background:i="#ffffff",success:l=null,warning:c="#FFBF00",danger:d=null,info:s=null,darkMode:p={}}=e,u={primary:this.#r(o),secondary:this.#r(n),accent:this.#r(a),success:this.#r(l||this.#E(o)),warning:this.#r(c||a),danger:this.#r(d||this.#A(o)),info:this.#r(s||o),gray:this.#b(n),surface:this.#y(i)};return u.surface.fieldset=this.#L(u.surface),u.surfaceSmart=this.#S(u.surface,r),u.dark=this.#F(u,i,p),u.dark&&u.dark.surface&&(u.dark.surfaceSmart=this.#S(u.dark.surface,r)),u.interactive={light:{fill:this.#k(u.primary,4.5),text:u.primary[600]},dark:{fill:this.#k(u.dark.primary,4.5),text:this.#I(u.dark.primary,u.dark.surface.base,4.5)}},u}#r(e){let r=this.#n(e);return{50:this.#t(r.h,Math.max(r.s-10,10),Math.min(r.l+45,95)),100:this.#t(r.h,Math.max(r.s-5,15),Math.min(r.l+35,90)),200:this.#t(r.h,r.s,Math.min(r.l+25,85)),300:this.#t(r.h,r.s,Math.min(r.l+15,75)),400:this.#t(r.h,r.s,Math.min(r.l+5,65)),500:e,600:this.#t(r.h,r.s,Math.max(r.l-10,25)),700:this.#t(r.h,r.s,Math.max(r.l-20,20)),800:this.#t(r.h,r.s,Math.max(r.l-30,15)),900:this.#t(r.h,r.s,Math.max(r.l-40,10))}}#E(e){let r=this.#n(e);return this.#t(120,Math.max(r.s,60),45)}#A(e){let r=this.#n(e);return this.#t(0,Math.max(r.s,70),50)}#b(e){let r=this.#n(e),o=r.h,n=Math.min(r.s,10);return{50:this.#t(o,n,98),100:this.#t(o,n,95),200:this.#t(o,n,88),300:this.#t(o,n,78),400:this.#t(o,n,60),500:e,600:this.#t(o,Math.min(n+5,15),45),700:this.#t(o,Math.min(n+8,18),35),800:this.#t(o,Math.min(n+10,20),20),900:this.#t(o,Math.min(n+12,22),10)}}#y(e){let r=this.#n(e);return{base:e,subtle:this.#t(r.h,Math.max(r.s,2),Math.max(r.l-2,2)),elevated:this.#t(r.h,Math.max(r.s,3),Math.max(r.l-4,5)),sunken:this.#t(r.h,Math.max(r.s,4),Math.max(r.l-6,8)),overlay:this.#t(r.h,Math.max(r.s,2),Math.min(r.l+2,98)),inverse:this.#v(e),hover:"color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);"}}#L(e){return{base:e.subtle,subtle:e.elevated,elevated:e.sunken,sunken:this.#R(e.sunken,.05),overlay:e.elevated}}#R(e,r=.05){let o=this.#n(e),n=Math.max(o.l-o.l*r,5);return this.#t(o.h,o.s,n)}#v(e){let r=this.#n(e);if(r.l>50){let o=Math.min(r.s+5,25),n=Math.max(12-(r.l-50)*.1,8);return this.#t(r.h,o,n)}else{let o=Math.max(r.s-10,5),n=Math.min(85+(50-r.l)*.3,95);return this.#t(r.h,o,n)}}#F(e,r="#ffffff",o={}){let n=o.background?o.background:this.#v(r),a=this.#y(n),i=o.primary?this.#r(o.primary):this.#i(e.primary);return{surface:{...a,fieldset:this.#N(a)},primary:i,secondary:o.secondary?this.#r(o.secondary):this.#i(e.secondary),accent:o.accent?this.#r(o.accent):this.#i(e.accent),gray:o.secondary?this.#b(o.secondary):e.gray,success:this.#i(e.success),info:this.#i(e.info),warning:this.#i(e.warning),danger:this.#i(e.danger)}}#c(e){let r=String(e||"").replace("#",""),o=r.length===3?r.split("").map(a=>a+a).join(""):r,n=parseInt(o,16);return{r:n>>16&255,g:n>>8&255,b:n&255}}#p(e){let{r,g:o,b:n}=this.#c(e),a=[r/255,o/255,n/255].map(i=>i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4));return .2126*a[0]+.7152*a[1]+.0722*a[2]}#d(e,r){let o=this.#p(e),n=this.#p(r),a=Math.max(o,n),i=Math.min(o,n);return(a+.05)/(i+.05)}#x(e,r=4.5){if(!e)return"#000000";let o="#ffffff",n="#000000",a=this.#d(e,o);if(a>=r)return o;let i=this.#d(e,n);return i>=r||i>a?n:o}#w(e,r=1){let{r:o,g:n,b:a}=this.#c(e);return`rgba(${o}, ${n}, ${a}, ${r})`}#j(e,r,o=.5){let n=this.#c(e),a=this.#c(r),i=Math.round(n.r+(a.r-n.r)*o),l=Math.round(n.g+(a.g-n.g)*o),c=Math.round(n.b+(a.b-n.b)*o);return this.#P(i,l,c)}#P(e,r,o){let n=a=>{let i=Math.max(0,Math.min(255,Math.round(a))).toString(16);return i.length===1?"0"+i:i};return`#${n(e)}${n(r)}${n(o)}`}#N(e){return{base:e.elevated,subtle:e.overlay,elevated:this.#$(e.elevated,.08),sunken:e.elevated,overlay:this.#$(e.overlay,.05)}}#I(e={},r="#000000",o=4.5){let n=["600","700","800","500","400","900","300","200"],a={shade:null,color:null,ratio:0};for(let i of n){let l=e?.[i];if(!l||typeof l!="string")continue;let c=this.#d(l,r);if(c>a.ratio&&(a={shade:i,color:l,ratio:c}),c>=o)return l}return a.color||e?.["600"]||e?.["500"]}#k(e={},r=4.5){let o=["600","700","800","500","400","900"],n={shade:null,color:null,ratio:0};for(let a of o){let i=e?.[a];if(!i||typeof i!="string")continue;let l=this.#d(i,"#ffffff");if(l>n.ratio&&(n={shade:a,color:i,ratio:l}),l>=r)return i}return n.color||e?.["600"]||e?.["500"]}#S(e,r={}){let o={},n=r.light??.1,a=r.dark??.25;return Object.entries(e).forEach(([i,l])=>{if(!l||typeof l!="string"||!l.startsWith("#"))return;let c=this.#p(l)<.5,d=this.#x(l,4.5),s=this.#x(l,3),p=this.#j(d,l,.4),u=d,f=p,h=c?"#ffffff":"#000000",y=c?a:n,g=this.#w(h,y),b=c?"#ffffff":"#000000",v=c?.15:.1,S=this.#w(b,v);o[i]={bg:l,text:d,textSecondary:s,textMuted:p,icon:u,iconSubtle:f,shadow:g,border:S,scheme:c?"dark":"light"}}),o}#$(e,r=.05){let o=this.#n(e),n=Math.min(o.l+(100-o.l)*r,95);return this.#t(o.h,o.s,n)}#i(e){let r={};return Object.entries({50:{source:"900",dimFactor:.8},100:{source:"800",dimFactor:.8},200:{source:"700",dimFactor:.8},300:{source:"600",dimFactor:.8},400:{source:"500",dimFactor:.85},500:{source:"400",dimFactor:.85},600:{source:"300",dimFactor:.85},700:{source:"200",dimFactor:.85},800:{source:"100",dimFactor:.95},900:{source:"50",dimFactor:.95}}).forEach(([n,a])=>{let i=e[a.source];r[n]=this.#B(i,a.dimFactor)}),r}#B(e,r=.8){let o=this.#n(e),n=Math.max(o.s*r,5),a=Math.max(o.l*r,5);return this.#t(o.h,n,a)}generateSpacingTokens(e){let{baseUnit:r=4,scaleRatio:o=1.25,maxSpacingSteps:n=12}=e,a=Number.isFinite(Number(r))?Number(r):4,i=Math.min(Number.isFinite(Number(n))?Number(n):12,12),l={0:"0"};for(let c=1;c<=i;c++)l[c]=`${a*c}px`;return l}#O(e){let{radiusSize:r="medium",customRadius:o=null}=e,n;o!=null?n=o:typeof r=="number"?n=r:typeof r=="string"?n=m.RadiusSizes[r]??m.RadiusSizes.medium:n=m.RadiusSizes.medium;let a=Number.isFinite(Number(n))?Number(n):m.RadiusSizes.medium;return{none:"0",xs:`${Number.isFinite(a*.25)?Math.round(a*.25):0}px`,sm:`${Number.isFinite(a*.5)?Math.round(a*.5):0}px`,md:`${a}px`,lg:`${Number.isFinite(a*1.5)?Math.round(a*1.5):0}px`,xl:`${Number.isFinite(a*2)?Math.round(a*2):0}px`,full:"9999px"}}#W(e){let{borderWidth:r="medium"}=e,o;typeof r=="number"?o=r:typeof r=="string"?o=m.BorderWidths[r]??m.BorderWidths.medium:o=m.BorderWidths.medium;let n=Number.isFinite(Number(o))?Number(o):m.BorderWidths.medium,a=i=>`${Math.max(0,Math.round(i*100)/100)}px`;return{hairline:a(n*.25),thin:a(n*.5),medium:a(n),thick:a(n*1.5)}}generateTypographyTokens(e){let{fontFamilyHeadings:r="system-ui, -apple-system, sans-serif",fontFamilyBody:o="system-ui, -apple-system, sans-serif",fontFamilyMono:n='ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',baseFontSize:a=16,fontScale:i=1.25,fontWeightLight:l=m.FontWeights.light,fontWeightNormal:c=m.FontWeights.normal,fontWeightMedium:d=m.FontWeights.medium,fontWeightSemibold:s=m.FontWeights.semibold,fontWeightBold:p=m.FontWeights.bold,lineHeightTight:u=m.LineHeights.tight,lineHeightNormal:f=m.LineHeights.normal,lineHeightRelaxed:h=m.LineHeights.relaxed}=e,y=Number.isFinite(Number(a))?Number(a):16,g=Number.isFinite(Number(i))?Number(i):1.25;return{fontFamily:{headings:r,body:o,mono:n},fontSize:{xs:`${Math.round(y/Math.pow(g,2))}px`,sm:`${Math.round(y/g)}px`,base:`${y}px`,lg:`${Math.round(y*g)}px`,xl:`${Math.round(y*Math.pow(g,2))}px`,"2xl":`${Math.round(y*Math.pow(g,3))}px`,"3xl":`${Math.round(y*Math.pow(g,4))}px`,"4xl":`${Math.round(y*Math.pow(g,5))}px`},fontWeight:{light:l?.toString()||"300",normal:c?.toString()||"400",medium:d?.toString()||"500",semibold:s?.toString()||"600",bold:p?.toString()||"700"},lineHeight:{tight:u?.toString()||"1.25",normal:f?.toString()||"1.5",relaxed:h?.toString()||"1.75"}}}#z(e){let{baseShadowOpacity:r=.1,shadowBlurMultiplier:o=1,shadowOffsetMultiplier:n=1}=e,a=`rgba(0, 0, 0, ${r})`,i=`rgba(0, 0, 0, ${r*.5})`;return{sm:`0 ${1*n}px ${2*o}px 0 ${i}`,base:`0 ${1*n}px ${3*o}px 0 ${a}, 0 ${1*n}px ${2*o}px 0 ${i}`,md:`0 ${4*n}px ${6*o}px ${-1*n}px ${a}, 0 ${2*n}px ${4*o}px ${-1*n}px ${i}`,lg:`0 ${10*n}px ${15*o}px ${-3*n}px ${a}, 0 ${4*n}px ${6*o}px ${-2*n}px ${i}`,xl:`0 ${20*n}px ${25*o}px ${-5*n}px ${a}, 0 ${10*n}px ${10*o}px ${-5*n}px ${i}`,inner:`inset 0 ${2*n}px ${4*o}px 0 ${i}`}}#_(e){let{containerPadding:r=16,breakpoints:o={sm:640,md:768,lg:1024,xl:1280}}=e,n=this.#u(e,"maxWidth"),a=e.maxWidth,i=this.#C(e,{emitFallbacks:!1});return{maxWidth:n?this.#o(a,"1200px"):void 0,maxWidthSm:i.sm,maxWidthMd:i.md,maxWidthLg:i.lg,maxWidthXl:i.xl,minHeight:"100vh",containerPadding:this.#o(r,"16px"),breakpoints:{sm:this.#o(o.sm,"640px"),md:this.#o(o.md,"768px"),lg:this.#o(o.lg,"1024px"),xl:this.#o(o.xl,"1280px")},pageMargin:"120px",sectionGap:"160px",containerGap:"200px",heroSpacing:"240px",footerSpacing:"160px"}}#C(e={},r={}){let{emitFallbacks:o=!0}=r,n={sm:640,md:768,lg:1024,xl:1280},{maxWidths:a={},containerPadding:i=16,breakpoints:l=n}=e||{},c=this.#u(e,"maxWidth"),d=["sm","md","lg","xl"].some(g=>this.#u(a,g));if(!o&&!c&&!d)return{sm:void 0,md:void 0,lg:void 0,xl:void 0};let s=e?.maxWidth,p=this.#s(i,16),u=this.#s(s,n.xl),f={sm:this.#s(l.sm,n.sm),md:this.#s(l.md,n.md),lg:this.#s(l.lg,n.lg),xl:this.#s(l.xl,n.xl)},h=g=>g?Math.max(320,g-p*2):u,y={sm:Math.min(u,h(f.sm)),md:Math.min(u,h(f.md)),lg:Math.min(u,h(f.lg)),xl:Math.max(320,u)};return{sm:this.#o(a.sm,`${y.sm}px`),md:this.#o(a.md,`${y.md}px`),lg:this.#o(a.lg,`${y.lg}px`),xl:this.#o(a.xl,`${y.xl}px`)}}#u(e,r){if(!e||typeof e!="object"||!Object.prototype.hasOwnProperty.call(e,r))return!1;let o=e[r];return!(o==null||typeof o=="string"&&o.trim().length===0)}#o(e,r){return typeof e=="number"&&Number.isFinite(e)?`${e}px`:typeof e=="string"&&e.trim().length>0?e:r}#s(e,r){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let o=parseFloat(e);if(Number.isFinite(o))return o}return r}#D(e){let{transitionSpeed:r=m.TransitionSpeeds.normal,animationEasing:o=m.AnimationEasings["ease-out"]}=e,n;return typeof r=="number"?n=r:typeof r=="string"&&m.TransitionSpeeds[r]?n=m.TransitionSpeeds[r]:n=m.TransitionSpeeds.normal,{fast:`${Math.round(n*.6)}ms`,normal:`${n}ms`,slow:`${Math.round(n*1.4)}ms`}}#U(e){let{baseZIndex:r=1e3,zIndexStep:o=10}=e;return{dropdown:r.toString(),sticky:(r+o*2).toString(),fixed:(r+o*3).toString(),modal:(r+o*4).toString(),drawer:(r+o*5).toString(),popover:(r+o*6).toString(),tooltip:(r+o*7).toString(),notification:(r+o*8).toString()}}#H(e){let{set:r="phosphor",weight:o="regular",defaultSize:n=24,sizes:a={xs:16,sm:20,md:24,lg:32,xl:48,"2xl":64},spritePath:i="/assets/pds/icons/pds-icons.svg",externalPath:l="/assets/img/icons/"}=e;return{set:r,weight:o,defaultSize:`${n}px`,sizes:Object.fromEntries(Object.entries(a).map(([c,d])=>[c,`${d}px`])),spritePath:i,externalPath:l}}#G(e){let r=[];r.push(`  /* Colors */
`);let o=(n,a="")=>{Object.entries(n).forEach(([i,l])=>{typeof l=="object"&&l!==null?o(l,`${a}${i}-`):typeof l=="string"&&r.push(`  --color-${a}${i}: ${l};
`)})};return Object.entries(e).forEach(([n,a])=>{n!=="dark"&&n!=="surfaceSmart"&&n!=="interactive"&&typeof a=="object"&&a!==null&&o(a,`${n}-`)}),e.surfaceSmart&&(r.push(`  /* Smart Surface Tokens (context-aware) */
`),Object.entries(e.surfaceSmart).forEach(([n,a])=>{r.push(`  --surface-${n}-bg: ${a.bg};
`),r.push(`  --surface-${n}-text: ${a.text};
`),r.push(`  --surface-${n}-text-secondary: ${a.textSecondary};
`),r.push(`  --surface-${n}-text-muted: ${a.textMuted};
`),r.push(`  --surface-${n}-icon: ${a.icon};
`),r.push(`  --surface-${n}-icon-subtle: ${a.iconSubtle};
`),r.push(`  --surface-${n}-shadow: ${a.shadow};
`),r.push(`  --surface-${n}-border: ${a.border};
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
    `),r.push(this.#q(e)),`${r.join("")}
`}#q(e){let r=e.primary?.[500]||"#3b82f6",o=e.secondary?.[500]||"#8b5cf6",n=e.accent?.[500]||"#f59e0b";return`
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${r} 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${o} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${n} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${r} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${o} 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${r} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${n} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${o} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${n} 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${r} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${n} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${r} 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${o} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${n} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${r} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${r} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${n} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${o} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${n} 15%, transparent) 0px, transparent 50%);
    `}#V(e){let r=[`  /* Spacing */
`];return Object.entries(e).forEach(([o,n])=>{o!=null&&o!=="NaN"&&n!==void 0&&!n.includes("NaN")&&r.push(`  --spacing-${o}: ${n};
`)}),`${r.join("")}
`}#J(e){let r=[`  /* Border Radius */
`];return Object.entries(e).forEach(([o,n])=>{r.push(`  --radius-${o}: ${n};
`)}),`${r.join("")}
`}#Y(e){let r=[`  /* Border Widths */
`];return Object.entries(e).forEach(([o,n])=>{r.push(`  --border-width-${o}: ${n};
`)}),`${r.join("")}
`}#Z(e){let r=[`  /* Typography */
`];return Object.entries(e).forEach(([o,n])=>{let a=o.replace(/^font/,"").replace(/^(.)/,i=>i.toLowerCase()).replace(/([A-Z])/g,"-$1").toLowerCase();Object.entries(n).forEach(([i,l])=>{let c=i.replace(/([A-Z])/g,"-$1").toLowerCase();r.push(`  --font-${a}-${c}: ${l};
`)})}),`${r.join("")}
`}#g(e){let r=[`  /* Shadows */
`];return Object.entries(e).forEach(([o,n])=>{r.push(`  --shadow-${o}: ${n};
`)}),`${r.join("")}
`}#Q(e){let r=[`  /* Layout */
`];return Object.entries(e).forEach(([o,n])=>{let a=o.replace(/([A-Z])/g,"-$1").toLowerCase();n!=null&&o!=="breakpoints"&&r.push(`  --layout-${a}: ${n};
`)}),`${r.join("")}
`}#K(e){let r=[`  /* Transitions */
`];return Object.entries(e).forEach(([o,n])=>{r.push(`  --transition-${o}: ${n};
`)}),`${r.join("")}
`}#X(e){let r=[`  /* Z-Index */
`];return Object.entries(e).forEach(([o,n])=>{r.push(`  --z-${o}: ${n};
`)}),`${r.join("")}
`}#ee(e){let r=[`  /* Icon System */
`];return r.push(`  --icon-set: ${e.set};
`),r.push(`  --icon-weight: ${e.weight};
`),r.push(`  --icon-size: ${e.defaultSize};
`),Object.entries(e.sizes).forEach(([o,n])=>{r.push(`  --icon-size-${o}: ${n};
`)}),`${r.join("")}
`}#te(e,r){if(!e?.dark)return"";let o=[],n=(p,u="")=>{Object.entries(p).forEach(([f,h])=>{typeof h=="object"&&h!==null?n(h,`${u}${f}-`):typeof h=="string"&&o.push(`  --color-${u}${f}: ${h};
`)})};Object.entries(e.dark).forEach(([p,u])=>{p!=="surfaceSmart"&&typeof u=="object"&&u!==null&&n(u,`${p}-`)});let a=[];e.dark.surfaceSmart&&(a.push(`  /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(e.dark.surfaceSmart).forEach(([p,u])=>{a.push(`  --surface-${p}-bg: ${u.bg};
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
`,l=`  /* Backdrop tokens - dark mode */
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
`,c=this.#ae(e),d=r?[this.#g(r)]:[];return`html[data-theme="dark"] {
${[...o,...a,...d,i,l,c].join("")}}
`}#re(e,r){if(!e?.dark)return"";let o=[],n=(u,f="")=>{Object.entries(u).forEach(([h,y])=>{typeof y=="object"&&y!==null?n(y,`${f}${h}-`):typeof y=="string"&&o.push(`    --color-${f}${h}: ${y};
`)})};Object.entries(e.dark).forEach(([u,f])=>{u!=="surfaceSmart"&&typeof f=="object"&&f!==null&&n(f,`${u}-`)});let a=[];e.dark.surfaceSmart&&(a.push(`    /* Smart Surface Tokens (dark mode, context-aware) */
`),Object.entries(e.dark.surfaceSmart).forEach(([u,f])=>{a.push(`    --surface-${u}-bg: ${f.bg};
`),a.push(`    --surface-${u}-text: ${f.text};
`),a.push(`    --surface-${u}-text-secondary: ${f.textSecondary};
`),a.push(`    --surface-${u}-text-muted: ${f.textMuted};
`),a.push(`    --surface-${u}-icon: ${f.icon};
`),a.push(`    --surface-${u}-icon-subtle: ${f.iconSubtle};
`),a.push(`    --surface-${u}-shadow: ${f.shadow};
`),a.push(`    --surface-${u}-border: ${f.border};
`)}),a.push(`
`));let i=[];e.interactive&&e.interactive.dark&&(i.push(`    /* Interactive Colors - optimized for specific use cases (dark mode) */
`),i.push(`    --color-primary-fill: ${e.interactive.dark.fill}; /* For button backgrounds with white text */
`),i.push(`    --color-primary-text: ${e.interactive.dark.text}; /* For links and outline buttons on dark surfaces */
`));let l=[`    --color-text-primary: var(--color-gray-100);
`,`    --color-text-secondary: var(--color-gray-300);
`,`    --color-text-muted: var(--color-gray-400);
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
`,d=this.#oe(e),s=r?[this.#g(r)]:[];return`
       html[data-theme="dark"] {
${[...o,...a,...s,l,c,d].join("")}       }
`}#oe(e){let r=e.dark||e,o=r.primary?.[400]||"#60a5fa",n=r.secondary?.[400]||"#a78bfa",a=r.accent?.[400]||"#fbbf24";return`    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${o} 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, ${n} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, ${o} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${n} 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, ${o} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, ${n} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${a} 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, ${n} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, ${a} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${o} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, ${n} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, ${o} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, ${n} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
      `}#ae(e){let r=e.dark||e,o=r.primary?.[400]||"#60a5fa",n=r.secondary?.[400]||"#a78bfa",a=r.accent?.[400]||"#fbbf24";return`
  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${o} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${n} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${a} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${o} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${n} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${o} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${n} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${a} 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${n} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${a} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${o} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${n} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${a} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${o} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${o} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${a} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${n} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${a} 10%, transparent) 0px, transparent 50%);
    `}#ne(){return`/* Callout dark mode adjustments */
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

`}#de(){let{shape:e={},spatialRhythm:r={},inputPadding:o,buttonPadding:n,focusRingWidth:a,focusRingOpacity:i,borderWidthThin:l,sectionSpacing:c,buttonMinHeight:d,inputMinHeight:s}=this.options.design,p=typeof e.borderWidth=="number"?e.borderWidth:typeof e.borderWidth=="string"?m.BorderWidths[e.borderWidth]??null:null,u=r.inputPadding??o??.75,f=r.buttonPadding??n??1,h=a||3,y=l||p||m.BorderWidths.thin,g=r.sectionSpacing??c??2,b=d||44;return`/* Mobile-First Form Styles - Generated from Design Config */
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
  min-height: ${s||40}px;
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
      box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-danger-500) ${Math.round((i||.3)*100)}%, transparent);
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
  padding: calc(var(--spacing-1) * ${f*.6}) calc(var(--spacing-4) * 0.85);
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
  box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
    padding: calc(var(--spacing-1) * ${f*.6}) calc(var(--spacing-4) * 0.85);
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
    box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
  padding: calc(var(--spacing-1) * ${f}) var(--spacing-6);
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
    box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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
    box-shadow: 0 0 0 ${h}px color-mix(in oklab, var(--color-primary-500) ${Math.round((i||.3)*100)}%, transparent);
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

`}#ye(){let{a11y:e={}}=this.options.design,r=e.minTouchTarget||m.TouchTargetSizes.standard;return`/* Icon System */

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
`}#xe(){let{layout:e={}}=this.options.design,r=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280},o=e.gridSystem||{},n=o.columns||[1,2,3,4,6],a=o.autoFitBreakpoints||{sm:"150px",md:"250px",lg:"350px",xl:"450px"},i=this.#C(e),l=[`
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

`];for(let c of n)l.push(`.grid-cols-${c} { grid-template-columns: repeat(${c}, 1fr); }
`);l.push(`
/* Auto-fit grids (responsive) */
`);for(let[c,d]of Object.entries(a))l.push(`.grid-auto-${c} { grid-template-columns: repeat(auto-fit, minmax(${d}, 1fr)); }
`);return l.push(`
/* Gap utilities */
.gap-0 { gap: 0; } .gap-xs { gap: var(--spacing-1); } .gap-sm { gap: var(--spacing-2); } .gap-md { gap: var(--spacing-4); } .gap-lg { gap: var(--spacing-6); } .gap-xl { gap: var(--spacing-8); }

`),l.push(`
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
`),l.join("")}#we(){return`/* Media Element Utilities */

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

`}#ke(){let{layout:e={},a11y:r={}}=this.options.design,o=e.breakpoints||{sm:640,md:768,lg:1024,xl:1280},n=r.minTouchTarget||m.TouchTargetSizes.standard;return`/* Mobile-First Responsive Design */

/* Small devices (${o.sm}px and up) */
@media (min-width: ${o.sm}px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } .sm\\:flex-row { flex-direction: row; } .sm\\:text-sm { font-size: var(--font-size-sm); } .sm\\:p-6 { padding: var(--spacing-6); } .sm\\:gap-6 { gap: var(--spacing-6); } .sm\\:hidden { display: none; } .sm\\:block { display: block; }
}

/* Medium devices (${o.md}px and up) */
@media (min-width: ${o.md}px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); } .md\\:text-lg { font-size: var(--font-size-lg); } .md\\:p-8 { padding: var(--spacing-8); } .md\\:gap-8 { gap: var(--spacing-8); } .md\\:flex-row { flex-direction: row; } .md\\:w-1\\/2 { width: 50%; } .md\\:w-1\\/3 { width: 33.333333%; } .md\\:hidden { display: none; } .md\\:block { display: block; }
}

/* Large devices (${o.lg}px and up) */
@media (min-width: ${o.lg}px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); } .lg\\:text-xl { font-size: var(--font-size-xl); } .lg\\:p-12 { padding: var(--spacing-12); } .lg\\:gap-12 { gap: var(--spacing-12); } .lg\\:w-1\\/4 { width: 25%; } .lg\\:hidden { display: none; } .lg\\:block { display: block; }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Touch devices - larger touch targets for interactive elements */
  button, a, select, textarea,
  input:not([type="radio"]):not([type="checkbox"]) {
    min-height: ${n}px;
    min-width: ${n}px;
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
    min-height: ${n}px;
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

`}#n(e){let r=parseInt(e.slice(1,3),16)/255,o=parseInt(e.slice(3,5),16)/255,n=parseInt(e.slice(5,7),16)/255,a=Math.max(r,o,n),i=Math.min(r,o,n),l,c,d=(a+i)/2;if(a===i)l=c=0;else{let s=a-i;switch(c=d>.5?s/(2-a-i):s/(a+i),a){case r:l=(o-n)/s+(o<n?6:0);break;case o:l=(n-r)/s+2;break;case n:l=(r-o)/s+4;break}l/=6}return{h:l*360,s:c*100,l:d*100}}#t(e,r,o){e=e/360,r=r/100,o=o/100;let n=(d,s,p)=>(p<0&&(p+=1),p>1&&(p-=1),p<1/6?d+(s-d)*6*p:p<1/2?s:p<2/3?d+(s-d)*(2/3-p)*6:d),a,i,l;if(r===0)a=i=l=o;else{let d=o<.5?o*(1+r):o+r-o*r,s=2*o-d;a=n(s,d,e+1/3),i=n(s,d,e),l=n(s,d,e-1/3)}let c=d=>{let s=Math.round(d*255).toString(16);return s.length===1?"0"+s:s};return`#${c(a)}${c(i)}${c(l)}`}getTokens(){return this.tokens}exportCSS(){return this.layeredCSS}#Se(){this.#e={tokens:this.#$e(),primitives:this.#ze(),components:this.#Ce(),utilities:this.#Me()},this.options.debug&&this.options.log?.("debug","[Generator] Layer sizes:",{tokens:`${(this.#e.tokens.length/1024).toFixed(2)} KB`,primitives:`${(this.#e.primitives.length/1024).toFixed(2)} KB`,components:`${(this.#e.components.length/1024).toFixed(2)} KB`,utilities:`${(this.#e.utilities.length/1024).toFixed(2)} KB`})}#$e(){let{colors:e,spacing:r,radius:o,borderWidths:n,typography:a,shadows:i,darkShadows:l,layout:c,transitions:d,zIndex:s,icons:p}=this.tokens,u=[`@layer tokens {
       :root {
          ${this.#G(e)}
          ${this.#V(r)}
          ${this.#J(o)}
          ${this.#Y(n)}
          ${this.#Z(a)}
          ${this.#g(i)}
          ${this.#Q(c)}
          ${this.#K(d)}
          ${this.#X(s)}
          ${this.#ee(p)}
       }
       ${this.#re(e,l)}
    }`];return u.push(`
/* Non-layered dark variables fallback (ensures attribute wins) */
`),u.push(this.#te(e,l)),u.join("")}#ze(){let{advanced:e={},a11y:r={},layout:o={}}=this.options.design,n=e.tabSize||m.TabSizes.standard,a=r.minTouchTarget||m.TouchTargetSizes.standard,i=o.breakpoints||{sm:640,md:768,lg:1024,xl:1280};return`@layer primitives {
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
    tab-size: ${n};
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

`}#Ce(){return`@layer components {

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

${this.#ne()}

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


${this.#we()}

${this.#ke()}

}
`}#Te(){this.#a={tokens:new CSSStyleSheet,primitives:new CSSStyleSheet,components:new CSSStyleSheet,utilities:new CSSStyleSheet},this.#Ee()}#Ee(){this.#a.tokens.replaceSync(this.#e.tokens),this.#a.primitives.replaceSync(this.#e.primitives),this.#a.components.replaceSync(this.#e.components),this.#a.utilities.replaceSync(this.#e.utilities)}get tokensCSS(){return this.#e?.tokens||""}get primitivesCSS(){return this.#e?.primitives||""}get componentsCSS(){return this.#e?.components||""}get utilitiesCSS(){return this.#e?.utilities||""}get layeredCSS(){return this.#e?`${this.#e.tokens}
${this.#e.primitives}
${this.#e.components}
${this.#e.utilities}`:""}get compiled(){return{tokens:{colors:this.tokens.colors,spacing:this.tokens.spacing,radius:this.tokens.radius,borderWidths:this.tokens.borderWidths,typography:this.tokens.typography,shadows:this.tokens.shadows,layout:this.tokens.layout,transitions:this.tokens.transitions,zIndex:this.tokens.zIndex,icons:this.tokens.icons},layers:{tokens:{css:this.#e?.tokens||"",size:this.#e?.tokens?.length||0,sizeKB:((this.#e?.tokens?.length||0)/1024).toFixed(2)},primitives:{css:this.#e?.primitives||"",size:this.#e?.primitives?.length||0,sizeKB:((this.#e?.primitives?.length||0)/1024).toFixed(2)},components:{css:this.#e?.components||"",size:this.#e?.components?.length||0,sizeKB:((this.#e?.components?.length||0)/1024).toFixed(2)},utilities:{css:this.#e?.utilities||"",size:this.#e?.utilities?.length||0,sizeKB:((this.#e?.utilities?.length||0)/1024).toFixed(2)},combined:{css:this.layeredCSS,size:this.layeredCSS?.length||0,sizeKB:((this.layeredCSS?.length||0)/1024).toFixed(2)}},config:{design:this.options.design||{},preset:this.options.preset||null,debug:this.options.debug||!1},capabilities:{constructableStylesheets:typeof CSSStyleSheet<"u",blobURLs:typeof Blob<"u"&&typeof URL<"u",shadowDOM:typeof ShadowRoot<"u"},references:{ontology:typeof N<"u"?N:null,enums:typeof m<"u"?m:null},meta:{generatedAt:new Date().toISOString(),totalSize:(this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0),totalSizeKB:(((this.#e?.tokens?.length||0)+(this.#e?.primitives?.length||0)+(this.#e?.components?.length||0)+(this.#e?.utilities?.length||0))/1024).toFixed(2),layerCount:4,tokenGroups:Object.keys(this.tokens).length},helpers:{getColorScales:()=>{let e=[],r=this.tokens.colors;for(let[o,n]of Object.entries(r))typeof n=="object"&&n!==null&&e.push({name:o,scale:n});return e},getColorScale:e=>this.tokens.colors[e]||null,getSpacingValues:()=>Object.entries(this.tokens.spacing).map(([e,r])=>({key:e,value:r})),getTypography:()=>this.tokens.typography,getLayerCSS:e=>{let r=["tokens","primitives","components","utilities"];if(!r.includes(e))throw new Error(`Invalid layer: ${e}. Must be one of ${r.join(", ")}`);return this.#e?.[e]||""},usesEnumValue:(e,r)=>{let o=this.options.design||{};return JSON.stringify(o).includes(r)}}}}get tokensStylesheet(){return this.#a?.tokens}get primitivesStylesheet(){return this.#a?.primitives}get componentsStylesheet(){return this.#a?.components}get utilitiesStylesheet(){return this.#a?.utilities}getCSSModules(){return{"pds-tokens.css.js":this.#l("tokens",this.#e.tokens),"pds-primitives.css.js":this.#l("primitives",this.#e.primitives),"pds-components.css.js":this.#l("components",this.#e.components),"pds-utilities.css.js":this.#l("utilities",this.#e.utilities),"pds-styles.css.js":this.#l("styles",this.layeredCSS)}}#l(e,r){let o=r.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`// Pure Design System - ${e}
// Auto-generated - do not edit directly

export const ${e} = new CSSStyleSheet();
${e}.replaceSync(\`${o}\`);

export const ${e}CSS = \`${o}\`;
`}};var Ne=class{constructor(){this._mode="static",this._staticPaths={tokens:"/assets/pds/styles/pds-tokens.css.js",primitives:"/assets/pds/styles/pds-primitives.css.js",components:"/assets/pds/styles/pds-components.css.js",utilities:"/assets/pds/styles/pds-utilities.css.js",styles:"/assets/pds/styles/pds-styles.css.js"}}setLiveMode(){this._mode="live"}setStaticMode(e={}){this._mode="static",this._staticPaths={...this._staticPaths,...e}}async getStylesheet(e){if(this._mode==="live")return null;try{return(await import(this._staticPaths[e]))[e]}catch(r){console.error(`[PDS Registry] Failed to load static ${e}:`,r),console.error(`[PDS Registry] Looking for: ${this._staticPaths[e]}`),console.error("[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");let o=new CSSStyleSheet;return o.replaceSync("/* Failed to load "+e+" */"),o}}get mode(){return this._mode}get isLive(){return this._mode==="live"}},Ie=new Ne;function dr(t){try{if(typeof document>"u")return;if(typeof CSSStyleSheet<"u"&&"adoptedStyleSheets"in Document.prototype){let o=new CSSStyleSheet;o.replaceSync(t),o._pds=!0;let n=(document.adoptedStyleSheets||[]).filter(a=>a._pds!==!0);document.adoptedStyleSheets=[...n,o];return}let e="pds-runtime-stylesheet",r=document.getElementById(e);if(!r){r=document.createElement("style"),r.id=e,r.type="text/css";let o=document.head||document.getElementsByTagName("head")[0];o?o.appendChild(r):document.documentElement.appendChild(r)}r.textContent=t}catch(e){console.warn("installRuntimeStyles failed:",e)}}function me(t){let e=t;if(!e||typeof e!="object"){console.error("[Runtime] applyStyles requires an explicit generator instance in live mode");return}let r=e.layeredCSS||e.css||"";if(!r){e.options?.log?.("warn","[Runtime] No CSS available on generator to apply");return}dr(r)}async function mt(t,e=[],r=null){try{let o=r?.primitivesStylesheet?r.primitivesStylesheet:await Ie.getStylesheet("primitives");t.adoptedStyleSheets=[o,...e]}catch(o){let n=t.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${n}> failed to adopt primitives:`,o),t.adoptedStyleSheets=e}}async function ft(t,e=["primitives"],r=[],o=null){try{let a=(await Promise.all(e.map(async i=>{if(o)switch(i){case"tokens":return o.tokensStylesheet;case"primitives":return o.primitivesStylesheet;case"components":return o.componentsStylesheet;case"utilities":return o.utilitiesStylesheet;default:break}return Ie.getStylesheet(i)}))).filter(i=>i!==null);t.adoptedStyleSheets=[...a,...r]}catch(n){let a=t.host?.tagName?.toLowerCase()||"unknown";console.error(`[PDS Adopter] <${a}> failed to adopt layers:`,n),t.adoptedStyleSheets=r}}var pr=[{selector:".accordion"},{selector:"nav[data-dropdown]"},{selector:"label[data-toggle]"},{selector:"label[data-color]"},{selector:'input[type="range"]'},{selector:"form[data-required]"},{selector:"fieldset[role=group][data-open]"},{selector:"[data-clip]"},{selector:"button, a[class*='btn-']"}];function ur(t){t.dataset.enhancedAccordion||(t.dataset.enhancedAccordion="true",t.addEventListener("toggle",e=>{e.target.open&&e.target.parentElement===t&&t.querySelectorAll(":scope > details[open]").forEach(r=>{r!==e.target&&(r.open=!1)})},!0))}function gr(t){if(t.dataset.enhancedDropdown)return;t.dataset.enhancedDropdown="true";let e=t.lastElementChild;if(!e)return;let r=t.querySelector("[data-dropdown-toggle]")||t.querySelector("button");r&&!r.hasAttribute("type")&&r.setAttribute("type","button"),e.id||(e.id=`dropdown-${Math.random().toString(36).slice(2,9)}`);let o=e.tagName?.toLowerCase()==="menu",n=8;o&&!e.hasAttribute("role")&&e.setAttribute("role","menu"),e.hasAttribute("aria-hidden")||e.setAttribute("aria-hidden","true"),r&&(r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-controls",e.id),r.setAttribute("aria-expanded","false"));let a=()=>{let v=e.getAttribute("style");e.style.visibility="hidden",e.style.display="inline-block",e.style.pointerEvents="none";let S=e.getBoundingClientRect(),T=Math.max(e.offsetWidth||0,e.scrollWidth||0,S.width||0,1),M=Math.max(e.offsetHeight||0,e.scrollHeight||0,S.height||0,1);return v===null?e.removeAttribute("style"):e.setAttribute("style",v),{width:T,height:M}},i=()=>{let v=(t.getAttribute("data-direction")||t.getAttribute("data-dropdown-direction")||t.getAttribute("data-mode")||"auto").toLowerCase();if(v==="up"||v==="down")return v;let S=(r||t).getBoundingClientRect(),{height:T}=a(),M=Math.max(0,window.innerHeight-S.bottom),$=Math.max(0,S.top),R=M>=T,x=$>=T;return R&&!x?"down":x&&!R?"up":R&&x?"down":$>M?"up":"down"},l=()=>{let v=(t.getAttribute("data-align")||t.getAttribute("data-dropdown-align")||"auto").toLowerCase();if(v==="left"||v==="right"||v==="start"||v==="end")return v==="start"?"left":v==="end"?"right":v;let S=(r||t).getBoundingClientRect(),{width:T}=a(),M=Math.max(0,window.innerWidth-S.left),$=Math.max(0,S.right),R=M>=T,x=$>=T;return R&&!x?"left":x&&!R?"right":R&&x?"left":$>M?"right":"left"},c=(v,S=8)=>{let T=getComputedStyle(t).getPropertyValue(v).trim();if(!T)return S;let M=document.createElement("span");M.style.position="fixed",M.style.visibility="hidden",M.style.pointerEvents="none",M.style.height=T,document.body.appendChild(M);let $=Number.parseFloat(getComputedStyle(M).height);return M.remove(),Number.isFinite($)?$:S},d=()=>{e.style.removeProperty("position"),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("right"),e.style.removeProperty("bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom")},s=()=>{if(e.getAttribute("aria-hidden")!=="false")return;let v=(r||t).getBoundingClientRect(),{width:S,height:T}=a(),M=c("--spacing-2",8),$=i(),R=l(),x=window.innerWidth,w=window.innerHeight;t.dataset.dropdownDirection=$,t.dataset.dropdownAlign=R;let C=R==="right"?v.right-S:v.left;C=Math.max(n,Math.min(C,x-S-n));let z=$==="up"?v.top-M-T:v.bottom+M;z=Math.max(n,Math.min(z,w-T-n)),e.style.position="fixed",e.style.left=`${Math.round(C)}px`,e.style.top=`${Math.round(z)}px`,e.style.right="auto",e.style.bottom="auto",e.style.marginTop="0",e.style.marginBottom="0"},p=null,u=()=>{p||(p=()=>s(),window.addEventListener("resize",p),window.addEventListener("scroll",p,!0))},f=()=>{p&&(window.removeEventListener("resize",p),window.removeEventListener("scroll",p,!0),p=null)},h=null,y=()=>{t.dataset.dropdownDirection=i(),t.dataset.dropdownAlign=l(),e.setAttribute("aria-hidden","false"),r?.setAttribute("aria-expanded","true"),u(),requestAnimationFrame(s),h||(h=v=>{(v.composedPath?v.composedPath():[v.target]).some(M=>M===t)||g()},setTimeout(()=>{document.addEventListener("click",h)},0))},g=()=>{e.setAttribute("aria-hidden","true"),r?.setAttribute("aria-expanded","false"),f(),d(),h&&(document.removeEventListener("click",h),h=null)},b=()=>{e.getAttribute("aria-hidden")==="false"?g():y()};r?.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),b()}),t.addEventListener("keydown",v=>{v.key==="Escape"&&(g(),r?.focus())}),t.addEventListener("focusout",v=>{v.relatedTarget&&((v.composedPath?v.composedPath():[v.relatedTarget]).some(M=>M===t)||g())})}function mr(t){if(t.dataset.enhancedToggle)return;t.dataset.enhancedToggle="true";let e=t.querySelector('input[type="checkbox"]');if(!e)return;t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.setAttribute("role","switch"),t.setAttribute("aria-checked",e.checked?"true":"false");let r=document.createElement("span");r.className="toggle-switch",r.setAttribute("role","presentation"),r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="toggle-knob",r.appendChild(o),t.insertBefore(r,e.nextSibling);let n=()=>{t.setAttribute("aria-checked",e.checked?"true":"false")},a=()=>{e.disabled||(e.checked=!e.checked,n(),e.dispatchEvent(new Event("change",{bubbles:!0})))};t.addEventListener("click",i=>{i.preventDefault(),a()}),t.addEventListener("keydown",i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),a())}),e.addEventListener("change",n)}function fr(t){if(t.dataset.enhancedColorInput)return;let e=t.querySelector('input[type="color"]');if(!e)return;t.dataset.enhancedColorInput="true";let r=t.querySelector(":scope > .color-control"),o=t.querySelector(":scope > .color-control > .color-swatch"),n=t.querySelector(":scope > .color-control > output");r||(r=document.createElement("span"),r.className="color-control",e.before(r)),o||(o=document.createElement("span"),o.className="color-swatch",r.appendChild(o)),e.parentElement!==o&&o.appendChild(e),n||(n=document.createElement("output"),r.appendChild(n));let a=()=>{if(e.dataset.colorUnset==="1"){n.value="",n.textContent="not set",r.dataset.value="",r.dataset.unset="1",o.dataset.unset="1";return}n.value=e.value,n.textContent=e.value,r.dataset.value=e.value,delete r.dataset.unset,delete o.dataset.unset};a();let i=()=>{e.dataset.colorUnset==="1"&&(e.dataset.colorUnset="0"),a()};e.addEventListener("input",i,{passive:!0}),e.addEventListener("change",i,{passive:!0})}function hr(t){if(t.dataset.enhancedRange)return;let e=i=>{if(t.dataset.enhancedRangeProgrammatic)return;t.dataset.enhancedRangeProgrammatic="1";let l=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"value")||Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");l?.get&&l?.set&&Object.defineProperty(t,"value",{configurable:!0,enumerable:l.enumerable,get(){return l.get.call(this)},set(d){l.set.call(this,d),i()}}),new MutationObserver(d=>{d.some(p=>{let u=p.attributeName;return u==="value"||u==="min"||u==="max"})&&i()}).observe(t,{attributes:!0,attributeFilter:["value","min","max"]})},r=t.closest("label"),o=r?.classList.contains("range-output"),n=t.id||`range-${Math.random().toString(36).substring(2,11)}`,a=`${n}-output`;if(t.id=n,o){let i=r.querySelector("span");if(i&&!i.classList.contains("range-output-wrapper")){let l=document.createElement("span");l.className="range-output-wrapper",l.style.display="flex",l.style.justifyContent="space-between",l.style.alignItems="center";let c=document.createElement("span");c.textContent=i.textContent,l.appendChild(c);let d=document.createElement("output");d.id=a,d.setAttribute("for",n),d.style.color="var(--surface-text-secondary, var(--color-text-secondary))",d.style.fontSize="0.875rem",d.textContent=t.value,l.appendChild(d),i.textContent="",i.appendChild(l);let s=()=>{d.textContent=t.value};t.addEventListener("input",s),t.addEventListener("change",s),e(s),s()}}else{let i=t.closest(".range-container");i||(i=document.createElement("div"),i.className="range-container",t.parentNode?.insertBefore(i,t),i.appendChild(t)),i.style.position="relative";let l=document.createElement("output");l.id=a,l.setAttribute("for",n),l.className="range-bubble",l.setAttribute("aria-live","polite"),i.appendChild(l);let c=()=>{let p=parseFloat(t.min)||0,u=parseFloat(t.max)||100,f=parseFloat(t.value),h=(f-p)/(u-p);l.style.left=`calc(${h*100}% )`,l.textContent=String(f)},d=()=>l.classList.add("visible"),s=()=>l.classList.remove("visible");t.addEventListener("input",c),t.addEventListener("pointerdown",d),t.addEventListener("pointerup",s),t.addEventListener("pointerleave",s),t.addEventListener("focus",d),t.addEventListener("blur",s),t.addEventListener("change",c),e(c),c()}t.dataset.enhancedRange="1"}function br(t){if(t.dataset.enhancedRequired)return;t.dataset.enhancedRequired="true";let e=r=>{let o;if(r.closest("[role$=group]")?o=r.closest("[role$=group]").querySelector("legend"):o=r.closest("label"),!o||o.querySelector(".required-asterisk"))return;let n=document.createElement("span");n.classList.add("required-asterisk"),n.textContent="*",n.style.marginLeft="4px";let a=o.querySelector("span, [data-label]");if(a)a.appendChild(n);else{let l=o.querySelector("input, select, textarea");l?o.insertBefore(n,l):o.appendChild(n)}let i=r.closest("form");if(i&&!i.querySelector(".required-legend")){let l=document.createElement("small");l.classList.add("required-legend"),l.textContent="* Required fields",i.insertBefore(l,i.querySelector(".form-actions")||i.lastElementChild)}};t.querySelectorAll("[required]").forEach(r=>{e(r)})}function yr(t){if(t.dataset.enhancedOpenGroup)return;t.dataset.enhancedOpenGroup="true",t.classList.add("flex","flex-wrap","buttons");let e=document.createElement("input");e.type="text",e.placeholder="Add item...",e.classList.add("input-text","input-sm"),e.style.width="auto";let r=()=>t.querySelector('input[type="radio"], input[type="checkbox"]');t.appendChild(e),e.addEventListener("keydown",o=>{if(o.key==="Enter"||o.key==="Tab"){let n=e.value.trim();if(n){o.preventDefault();let a=r(),i=a?.type==="radio"?"radio":"checkbox",l=`open-group-${Math.random().toString(36).substring(2,11)}`,c=document.createElement("label"),d=document.createElement("span");d.setAttribute("data-label",""),d.textContent=n;let s=document.createElement("input");s.type=i,s.name=a?.name||t.getAttribute("data-name")||"open-group",s.value=n,s.id=l,c.appendChild(d),c.appendChild(s),t.insertBefore(c,e),e.value=""}}else if(o.key==="Backspace"&&e.value===""){o.preventDefault();let n=t.querySelectorAll("label");n.length>0&&n[n.length-1].remove()}})}function vr(t){if(t.dataset.enhancedClip)return;t.dataset.enhancedClip="true",t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.hasAttribute("role")||t.setAttribute("role","button");let e=()=>{let o=t.getAttribute("data-clip-open")==="true";t.setAttribute("aria-expanded",o?"true":"false")},r=()=>{let o=t.getAttribute("data-clip-open")==="true";t.setAttribute("data-clip-open",o?"false":"true"),e()};t.addEventListener("click",o=>{o.defaultPrevented||r()}),t.addEventListener("keydown",o=>{(o.key===" "||o.key==="Enter")&&(o.preventDefault(),r())}),e()}function xr(t){if(t.dataset.enhancedBtnWorking)return;t.dataset.enhancedBtnWorking="true";let e=null,r=!1;new MutationObserver(n=>{n.forEach(a=>{if(a.attributeName==="class"){let i=t.classList.contains("btn-working"),l=t.querySelector("pds-icon");if(i)if(l)e||(e=l.getAttribute("icon")),l.setAttribute("icon","circle-notch");else{let c=document.createElement("pds-icon");c.setAttribute("icon","circle-notch"),c.setAttribute("size","sm"),t.insertBefore(c,t.firstChild),r=!0}else a.oldValue?.includes("btn-working")&&l&&(r?(l.remove(),r=!1):e&&(l.setAttribute("icon",e),e=null))}})}).observe(t,{attributes:!0,attributeFilter:["class"],attributeOldValue:!0})}var wr=new Map([[".accordion",ur],["nav[data-dropdown]",gr],["label[data-toggle]",mr],["label[data-color]",fr],['input[type="range"]',hr],["form[data-required]",br],["fieldset[role=group][data-open]",yr],["[data-clip]",vr],["button, a[class*='btn-']",xr]]),ht=pr.map(t=>({...t,run:wr.get(t.selector)||(()=>{})}));var bt=[{selector:".accordion",description:"Ensures only one <details> element can be open at a time within the accordion.",demoHtml:`
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
    `.trim()}];var vt="pds",kr=/^([a-z][a-z0-9+\-.]*:)?\/\//i,yt=/^[a-z]:/i;function ne(t=""){return t.endsWith("/")?t:`${t}/`}function Sr(t="",e=vt){let r=t.replace(/\/+$/,"");return new RegExp(`(?:^|/)${e}$`,"i").test(r)?r:`${r}/${e}`}function $r(t){return t.replace(/^\.\/+/,"")}function zr(t){return yt.test(t)?t.replace(yt,"").replace(/^\/+/,""):t}function Cr(t){return t.startsWith("public/")?t.substring(7):t}function xt(t,e={}){let r=e.segment||vt,o=e.defaultRoot||`/assets/${r}/`,n=t?.public&&t.public?.root||t?.static&&t.static?.root||null;if(!n||typeof n!="string")return ne(o);let a=n.trim();return a?(a=a.replace(/\\/g,"/"),a=Sr(a,r),a=ne(a),kr.test(a)?a:(a=$r(a),a=zr(a),a.startsWith("/")||(a=Cr(a),a.startsWith("/")||(a=`/${a}`),a=a.replace(/\/+/g,(i,l)=>l===0?i:"/")),ne(a))):ne(o)}function wt(t){let e=t.replace(/['"]/g,"").trim();if(["system-ui","-apple-system","sans-serif","serif","monospace","cursive","fantasy","ui-sans-serif","ui-serif","ui-monospace","ui-rounded"].includes(e.toLowerCase()))return!0;let n=document.createElement("canvas").getContext("2d");if(!n)return!1;let a="mmmmmmmmmmlli",i="72px",l="monospace";n.font=`${i} ${l}`;let c=n.measureText(a).width;n.font=`${i} "${e}", ${l}`;let d=n.measureText(a).width;return c!==d}function Mr(t){return t?t.split(",").map(o=>o.trim())[0].replace(/['"]/g,"").trim():null}async function kt(t,e={}){if(!t)return Promise.resolve();let{weights:r=[400,500,600,700],italic:o=!1}=e,n=Mr(t);if(!n||wt(n))return Promise.resolve();let a=encodeURIComponent(n);return document.querySelector(`link[href*="fonts.googleapis.com"][href*="${a}"]`)?(console.log(`Font "${n}" is already loading or loaded`),Promise.resolve()):(console.log(`Loading font "${n}" from Google Fonts...`),new Promise((l,c)=>{let d=document.createElement("link");d.rel="stylesheet";let s=o?`ital,wght@0,${r.join(";0,")};1,${r.join(";1,")}`:`wght@${r.join(";")}`;d.href=`https://fonts.googleapis.com/css2?family=${a}:${s}&display=swap`,d.setAttribute("data-font-loader",n),d.onload=()=>{console.log(`Successfully loaded font "${n}"`),l()},d.onerror=()=>{console.warn(`Failed to load font "${n}" from Google Fonts`),c(new Error(`Failed to load font: ${n}`))},document.head.appendChild(d),setTimeout(()=>{wt(n)||console.warn(`Font "${n}" did not load within timeout`),l()},5e3)}))}async function Be(t){if(!t)return Promise.resolve();let e=new Set;t.fontFamilyHeadings&&e.add(t.fontFamilyHeadings),t.fontFamilyBody&&e.add(t.fontFamilyBody),t.fontFamilyMono&&e.add(t.fontFamilyMono);let r=Array.from(e).map(o=>kt(o).catch(n=>{console.warn(`Could not load font: ${o}`,n)}));await Promise.all(r)}var Er=/^[a-z][a-z0-9+\-.]*:\/\//i,ie=(()=>{try{return import.meta.url}catch{return}})(),fe=t=>typeof t=="string"&&t.length&&!t.endsWith("/")?`${t}/`:t;function he(t,e={}){if(!t||Er.test(t))return t;let{preferModule:r=!0}=e,o=()=>{if(!ie)return null;try{return new URL(t,ie).href}catch{return null}},n=()=>{if(typeof window>"u"||!window.location?.origin)return null;try{return new URL(t,window.location.origin).href}catch{return null}};return(r?o()||n():n()||o())||t}var zt=(()=>{if(ie)try{let t=new URL(ie);if(/\/public\/assets\/js\//.test(t.pathname))return new URL("../pds/",ie).href}catch{return}})(),Ct=!1;function Mt(t){Ct||typeof document>"u"||(Ct=!0,t.addEventListener("pds:ready",e=>{let r=e.detail?.mode;r&&document.documentElement.classList.add(`pds-${r}`,"pds-ready")}))}function _e(t={},e={}){if(!e||typeof e!="object")return t;let r=Array.isArray(t)?[...t]:{...t};for(let[o,n]of Object.entries(e))n&&typeof n=="object"&&!Array.isArray(n)?r[o]=_e(r[o]&&typeof r[o]=="object"?r[o]:{},n):r[o]=n;return r}function We(t=""){return String(t).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function J(t){if(t==null)return t;if(typeof t=="function")return;if(typeof t!="object")return t;if(Array.isArray(t))return t.map(r=>J(r)).filter(r=>r!==void 0);let e={};for(let r in t)if(t.hasOwnProperty(r)){let o=t[r];if(typeof o!="function"){let n=J(o);n!==void 0&&(e[r]=n)}}return e}function De(t={},e={},{presets:r,defaultLog:o,validateDesignConfig:n,validateInitConfig:a}={}){let i=t&&typeof t.log=="function"?t.log:o,l=typeof t=="object"&&("colors"in t||"typography"in t||"spatialRhythm"in t||"shape"in t||"behavior"in t||"layout"in t||"advanced"in t||"a11y"in t||"components"in t||"icons"in t),c=t&&t.enhancers;c&&!Array.isArray(c)&&(c=Object.values(c));let d=c??e.enhancers??[],s=t&&t.preset,p=t&&t.design,u=t&&t.icons&&typeof t.icons=="object"?t.icons:null,f="preset"in(t||{})||"design"in(t||{})||"enhancers"in(t||{});t&&typeof t=="object"&&typeof a=="function"&&a(t,{log:i,context:"PDS.start"});let h,y=null;if(f){p&&typeof p=="object"&&typeof n=="function"&&n(p,{log:i,context:"PDS.start"});let g=String(s||"default").toLowerCase(),b=r?.[g]||Object.values(r||{}).find(j=>We(j.name)===g||String(j.name||"").toLowerCase()===g);if(!b)throw new Error(`PDS preset not found: "${s||"default"}"`);y={id:b.id||We(b.name),name:b.name||b.id||String(g)};let v=structuredClone(b);if(p&&typeof p=="object"||u){let j=p?J(p):{},B=u?J(u):null,Zt=B?_e(j,{icons:B}):j;v=_e(v,structuredClone(Zt))}let{mode:S,autoDefine:T,applyGlobalStyles:M,manageTheme:$,themeStorageKey:R,preloadStyles:x,criticalLayers:w,managerURL:C,manager:z,preset:F,design:I,enhancers:A,log:E,...k}=t;h={...k,design:v,preset:y.name,log:E||o}}else if(l){typeof n=="function"&&n(t,{log:i,context:"PDS.start"});let{log:g,...b}=t;h={design:structuredClone(b),log:g||o}}else{let g=r?.default||Object.values(r||{}).find(b=>We(b.name)==="default");if(!g)throw new Error("PDS default preset not available");y={id:g.id||"default",name:g.name||"Default"},h={design:structuredClone(g),preset:y.name,log:o}}return{generatorConfig:h,enhancers:d,presetInfo:y}}function Tt({manageTheme:t,themeStorageKey:e,applyResolvedTheme:r,setupSystemListenerIfNeeded:o}){let n="light",a=null;if(t&&typeof window<"u"){try{a=localStorage.getItem(e)||null}catch{a=null}try{r?.(a),o?.(a)}catch{}a?a==="system"?n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":n=a:n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return{resolvedTheme:n,storedTheme:a}}function Et(t,{resolvePublicAssetURL:e}){let r=!!(t?.public?.root||t?.static?.root),o=e(t);return!r&&zt&&(o=zt),fe(he(o))}async function At(t,{baseEnhancers:e=[]}={}){let{autoDefineBaseURL:r="/auto-define/",autoDefinePreload:o=[],autoDefineMapper:n=null,enhancers:a=[],autoDefineOverrides:i=null,autoDefinePreferModule:l=!0}=t,c=(()=>{let s=new Map;return(e||[]).forEach(p=>s.set(p.selector,p)),(a||[]).forEach(p=>s.set(p.selector,p)),Array.from(s.values())})(),d=null;if(typeof window<"u"&&typeof document<"u"){let s=null;try{let g=await Promise.resolve().then(()=>($t(),St));s=g?.AutoDefiner||g?.default?.AutoDefiner||g?.default||null}catch(g){console.warn("AutoDefiner not available:",g?.message||g)}let p=g=>{switch(g){case"pds-tabpanel":return"pds-tabstrip.js";default:return`${g}.js`}},{mapper:u,...f}=i&&typeof i=="object"?i:{},y={baseURL:r&&fe(he(r,{preferModule:l})),predefine:o,scanExisting:!0,observeShadows:!0,patchAttachShadow:!0,debounceMs:16,enhancers:c,onError:(g,b)=>{if(typeof g=="string"&&g.startsWith("pds-")){let S=["pds-form","pds-drawer"].includes(g),T=b?.message?.includes("#pds/lit")||b?.message?.includes("Failed to resolve module specifier");S&&T?console.error(`\u274C PDS component <${g}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`):console.warn(`\u26A0\uFE0F PDS component <${g}> not found. Assets may not be installed.`)}else console.error(`\u274C Auto-define error for <${g}>:`,b)},...f,mapper:g=>{if(customElements.get(g))return null;if(typeof n=="function")try{let b=n(g);return b===void 0?p(g):b}catch(b){return console.warn("Custom autoDefine.mapper error; falling back to default:",b?.message||b),p(g)}return p(g)}};s&&(d=new s(y),o.length>0&&typeof s.define=="function"&&await s.define(...o,{baseURL:r,mapper:y.mapper,onError:y.onError}))}return{autoDefiner:d,mergedEnhancers:c}}var Ue=["light","dark"],He=new Set(Ue);function Ge(t){let r=(Array.isArray(t?.themes)?t.themes.map(o=>String(o).toLowerCase()):Ue).filter(o=>He.has(o));return r.length?r:Ue}function be(t,{preferDocument:e=!0}={}){let r=String(t||"").toLowerCase();if(He.has(r))return r;if(e&&typeof document<"u"){let o=document.documentElement?.getAttribute("data-theme");if(He.has(o))return o}return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function se(t,e){let r=be(e);return Ge(t).includes(r)}var jt=!1,le=null,ce="pds-live-edit-toggle",Ye="pds-live-edit-toggle-style";function Pt(t){if(typeof document>"u"||typeof t!="function")return;if(document.body){t();return}let e=()=>{document.body&&(document.removeEventListener("DOMContentLoaded",e),t())};document.addEventListener("DOMContentLoaded",e,{once:!0})}function Rr(){typeof document>"u"||Pt(()=>{if(!document.querySelector("pds-live-edit")){let t=document.createElement("pds-live-edit");document.body.appendChild(t)}})}function Nt(){if(typeof document>"u")return;document.querySelectorAll("pds-live-edit").forEach(e=>e.remove())}function Fr(){if(typeof document>"u"||document.getElementById(Ye))return;let t=document.createElement("style");t.id=Ye,t.textContent=`
    :where(#${ce}) {
      position: fixed;
      top: var(--spacing-3);
      right: var(--spacing-3);
      z-index: var(--z-dropdown, 1050);
    }
  `,document.head.appendChild(t)}function jr(t,e){if(!t)return;t.classList.toggle("btn-primary",e),t.classList.toggle("btn-secondary",!e),t.setAttribute("aria-pressed",e?"true":"false");let r=e?"Disable live edit mode":"Enable live edit mode";t.setAttribute("aria-label",r),t.setAttribute("title",r)}function Pr(){if(typeof document>"u")return null;Fr();let t=document.getElementById(ce);return t||(t=document.createElement("button"),t.id=ce,t.type="button",t.className="icon-only btn-secondary",t.setAttribute("data-pds-live-edit-ignore","true"),t.innerHTML='<pds-icon icon="cursor-click" size="sm"></pds-icon>',Pt(()=>{document.getElementById(ce)||document.body.appendChild(t)})),t}function Nr(){if(typeof document>"u")return;let t=document.getElementById(ce);t&&t.remove();let e=document.getElementById(Ye);e&&e.remove(),Nt()}function Ir(){if(typeof document>"u")return;let t=Pr();if(!t)return;let e=n=>{n?Rr():Nt(),jr(t,n)};e(!1),t.onclick=()=>{if(!!document.querySelector("pds-live-edit")){e(!1);return}e(!0)},t.__pdsLiveEditDisableHandler&&document.removeEventListener("pds:live-edit:disable",t.__pdsLiveEditDisableHandler),t.__pdsLiveEditEnableHandler&&document.removeEventListener("pds:live-edit:enable",t.__pdsLiveEditEnableHandler);let r=()=>{e(!1)},o=()=>{e(!0)};t.__pdsLiveEditDisableHandler=r,document.addEventListener("pds:live-edit:disable",r),t.__pdsLiveEditEnableHandler=o,document.addEventListener("pds:live-edit:enable",o)}function Br(){if(typeof window>"u"||!window.localStorage)return null;try{let t=window.localStorage.getItem("pure-ds-config");if(!t)return null;let e=JSON.parse(t);if(e&&("preset"in e||"design"in e))return e}catch{return null}return null}function Ze(t={},e={}){if(!e||typeof e!="object")return t;let r=Array.isArray(t)?[...t]:{...t};for(let[o,n]of Object.entries(e))n&&typeof n=="object"&&!Array.isArray(n)?r[o]=Ze(r[o]&&typeof r[o]=="object"?r[o]:{},n):r[o]=n;return r}function Or(t){let e=Br();if(!e||!t||typeof t!="object")return t;let r=e.preset,o=e.design&&typeof e.design=="object"?e.design:null;if(!r&&!o)return t;let n="preset"in t||"design"in t||"enhancers"in t,a={...t};if(r&&(a.preset=r),o)if(n){let i=t.design&&typeof t.design=="object"?t.design:{};a.design=Ze(i,o)}else a=Ze(t,o);return a}function Wr(t,e={}){let{hideCategory:r=!0,itemGrid:o="45px 1fr",includeIncompatible:n=!0,disableIncompatible:a=!0,categoryName:i="Presets",theme:l,onSelect:c,iconHandler:d}=e||{},s=be(l??t?.theme),p=h=>{let g=f(h?.id)?.colors||{},b=g?.primary,v=g?.secondary,S=g?.accent;return b&&v&&S?`<span style="display:flex;gap:1px;flex-shrink:0;" aria-hidden="true">
        <span style="display:inline-block;width:10px;height:20px;background-color:${b};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${v};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${S};">&nbsp;</span>
      </span>`:h?.icon?`<pds-icon icon="${h.icon}" size="sm"></pds-icon>`:""},u=()=>{let h=t?.presets||{};return Object.values(h||{}).filter(y=>!!(y?.id||y?.name))},f=h=>h&&u().find(g=>String(g?.id||g?.name)===String(h))||null;return{hideCategory:r,itemGrid:o,iconHandler:typeof d=="function"?d:p,categories:{[i]:{trigger:()=>!0,getItems:(h={})=>{let y=String(h?.search||"").toLowerCase().trim();return u().filter(b=>{let v=String(b?.name||b?.id||"").toLowerCase(),S=String(b?.description||"").toLowerCase(),T=Array.isArray(b?.tags)?b.tags.map($=>String($).toLowerCase()):[];if(y&&!(v.includes(y)||S.includes(y)||T.some(R=>R.includes(y))))return!1;let M=se(b,s);return!(!n&&!M)}).map(b=>{let v=b?.id||b?.name,S=se(b,s),T=Ge(b),M=T.length===1?`${T[0]} only`:`Not available in ${s} mode`,$=String(b?.description||"").trim(),R=S?$:$?`${$} - ${M}`:M;return{id:v,text:b?.name||String(v),description:R,icon:"palette",class:!S&&a?"disabled":"",disabled:!S&&a,tooltip:S?"":M}}).sort((b,v)=>String(b.text||"").localeCompare(String(v.text||"")))},action:async h=>{if(!h?.id||h?.disabled)return h?.id;let y=f(h.id);return y?typeof c=="function"?await c({preset:y,selection:h,resolvedTheme:s}):(typeof t?.applyLivePreset=="function"&&await t.applyLivePreset(y.id||h.id),y.id||h.id):h?.id}}}}}async function _r(t,{applyResolvedTheme:e,setupSystemListenerIfNeeded:r}){if(jt)return;let[o,n,a,i]=await Promise.all([Promise.resolve().then(()=>(Pe(),gt)),Promise.resolve().then(()=>(ue(),et)),Promise.resolve().then(()=>(Je(),Ve)),Promise.resolve().then(()=>(Ft(),Rt))]),l=o?.default||o?.ontology,c=o?.findComponentForElement,d=n?.enums;le=a?.PDSQuery||a?.default||null,t.ontology=l,t.findComponentForElement=c,t.enums=d,t.common=i||{},t.presets=U,t.configRelations=it,t.configSpec=st,t.configEditorMetadata=dt,t.configFormSchema=pt,t.buildConfigFormSchema=Z,t.getConfigEditorMetadata=ae,t.enhancerMetadata=bt,t.applyStyles=function(s){return me(s||O.instance)},t.adoptLayers=function(s,p,u){return ft(s,p,u,O.instance)},t.adoptPrimitives=function(s,p){return mt(s,p,O.instance)},t.getGenerator=async function(){return O},t.query=async function(s){if(!le){let u=await Promise.resolve().then(()=>(Je(),Ve));le=u?.PDSQuery||u?.default||null}return le?await new le(t).search(s):[]},t.buildPresetOmniboxSettings=function(s={}){return Wr(t,s)},t.applyLivePreset=async function(s,p={}){if(!s)return!1;if(!t.registry?.isLive)return console.warn("PDS.applyLivePreset is only available in live mode."),!1;let u=t.currentConfig||{},{design:f,preset:h,...y}=u,g={...structuredClone(J(y)),preset:s},b=De(g,{},{presets:U,defaultLog:je,validateDesignConfig:Re,validateInitConfig:Fe}),v=be(t.theme);if(!se(b.generatorConfig.design,v)){let $=b.presetInfo?.name||b.generatorConfig?.design?.name||s;console.warn(`PDS theme "${v}" not supported by preset "${$}".`)}u.theme&&!b.generatorConfig.theme&&(b.generatorConfig.theme=u.theme);let S=new O(b.generatorConfig);if(b.generatorConfig.design?.typography)try{await Be(b.generatorConfig.design.typography)}catch($){b.generatorConfig?.log?.("warn","Failed to load some fonts from Google Fonts:",$)}await me(S);let T=b.presetInfo||{id:s,name:s};if(t.currentPreset=T,t.currentConfig=Object.freeze({...u,preset:b.generatorConfig.preset,design:structuredClone(b.generatorConfig.design),theme:b.generatorConfig.theme||u.theme}),t.configEditorMetadata=ae(b.generatorConfig.design),t.configFormSchema=Z(b.generatorConfig.design),p?.persist!==!1&&typeof window<"u"){let $="pure-ds-config";try{let R=localStorage.getItem($),x=R?JSON.parse(R):null,w={...x&&typeof x=="object"?x:{},preset:T.id||s,design:structuredClone(b.generatorConfig.design||{})};localStorage.setItem($,JSON.stringify(w))}catch(R){b.generatorConfig?.log?.("warn","Failed to store preset:",R)}}return!0},Object.getOwnPropertyDescriptor(t,"compiled")||Object.defineProperty(t,"compiled",{get(){return t.registry?.isLive&&O.instance?O.instance.compiled:null},enumerable:!0,configurable:!1}),t.preloadCritical=function(s,p={}){if(typeof window>"u"||!document.head||!s)return;let{theme:u,layers:f=["tokens"]}=p;try{let h=u||"light";(u==="system"||!u)&&(h=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.setAttribute("data-theme",h);let y=s.design?{...s,theme:h}:{design:s,theme:h},g=new O(y),b=f.map(v=>{try{return g.css?.[v]||""}catch{return""}}).filter(v=>v.trim()).join(`
`);if(b){let v=document.head.querySelector("style[data-pds-preload]");v&&v.remove();let S=document.createElement("style");S.setAttribute("data-pds-preload",""),S.textContent=b,document.head.insertBefore(S,document.head.firstChild)}}catch(h){console.warn("PDS preload failed:",h)}},jt=!0}async function Dr(t,e,{emitReady:r,applyResolvedTheme:o,setupSystemListenerIfNeeded:n}){if(!e||typeof e!="object")throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");if(e=Or(e),await _r(t,{applyResolvedTheme:o,setupSystemListenerIfNeeded:n}),Mt(t),typeof document<"u"&&document.adoptedStyleSheets){let p=`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;try{if(!document.adoptedStyleSheets.some(f=>f._pdsFouc)){let f=new CSSStyleSheet;f.replaceSync(p),f._pdsFouc=!0,document.adoptedStyleSheets=[f,...document.adoptedStyleSheets]}}catch(u){if(console.warn("Constructable stylesheets not supported, using <style> tag fallback:",u),!document.head.querySelector("style[data-pds-fouc]")){let h=document.createElement("style");h.setAttribute("data-pds-fouc",""),h.textContent=p,document.head.insertBefore(h,document.head.firstChild)}}}let a=e.applyGlobalStyles??!0,i=e.manageTheme??!0,l=e.themeStorageKey??"pure-ds-theme",c=e.preloadStyles??!1,d=e.criticalLayers??["tokens","primitives"],s=e&&e.autoDefine||null;try{let{resolvedTheme:p}=Tt({manageTheme:i,themeStorageKey:l,applyResolvedTheme:o,setupSystemListenerIfNeeded:n}),u=De(e,{},{presets:U,defaultLog:je,validateDesignConfig:Re,validateInitConfig:Fe});if(i&&!se(u.generatorConfig.design,p)){let x=u.presetInfo?.name||u.generatorConfig?.design?.name||u.generatorConfig?.preset||"current preset";console.warn(`PDS theme "${p}" not supported by preset "${x}".`)}let f=u.enhancers,{log:h,...y}=u.generatorConfig,g=structuredClone(y);g.log=h,i&&(g.theme=p);let b=new O(g);if(g.design?.typography)try{await Be(g.design.typography)}catch(x){g?.log?.("warn","Failed to load some fonts from Google Fonts:",x)}if(c&&typeof window<"u"&&document.head)try{let x=d.map(w=>{try{return b.css?.[w]||""}catch(C){return g?.log?.("warn",`Failed to generate critical CSS for layer "${w}":`,C),""}}).filter(w=>w.trim()).join(`
`);if(x){let w=document.head.querySelector("style[data-pds-critical]");w&&w.remove();let C=document.createElement("style");C.setAttribute("data-pds-critical",""),C.textContent=x;let z=document.head.querySelector('meta[charset], meta[name="viewport"]');z?z.parentNode.insertBefore(C,z.nextSibling):document.head.insertBefore(C,document.head.firstChild)}}catch(x){g?.log?.("warn","Failed to preload critical styles:",x)}t.registry.setLiveMode(),u.presetInfo?.name?g?.log?.("log",`PDS live with preset "${u.presetInfo.name}"`):g?.log?.("log","PDS live with custom config"),a&&(await me(O.instance),typeof window<"u"&&setTimeout(()=>{let x=document.head.querySelector("style[data-pds-critical]");x&&x.remove();let w=document.head.querySelector("style[data-pds-preload]");w&&w.remove();let C=document.getElementById("pds-runtime-stylesheet");C&&C.remove()},100));let v=Et(e,{resolvePublicAssetURL:xt}),S;s&&s.baseURL?S=fe(he(s.baseURL,{preferModule:!1})):S=`${v}components/`;let T=null,M=[];try{let x=await At({autoDefineBaseURL:S,autoDefinePreload:s&&Array.isArray(s.predefine)&&s.predefine||[],autoDefineMapper:s&&typeof s.mapper=="function"&&s.mapper||null,enhancers:f,autoDefineOverrides:s||null,autoDefinePreferModule:!(s&&s.baseURL)},{baseEnhancers:ht});T=x.autoDefiner,M=x.mergedEnhancers||[]}catch(x){g?.log?.("error","\u274C Failed to initialize AutoDefiner/Enhancers:",x)}let $=b?.options||g,R=J(e);if(t.currentConfig=Object.freeze({mode:"live",...structuredClone(R),design:structuredClone(u.generatorConfig.design),preset:u.generatorConfig.preset,theme:p,enhancers:M}),t.configEditorMetadata=ae(u.generatorConfig.design),t.configFormSchema=Z(u.generatorConfig.design),typeof document<"u")try{e?.liveEdit?setTimeout(()=>{Ir()},0):Nr()}catch(x){g?.log?.("warn","Live editor toggle failed to start:",x)}return r({mode:"live",generator:b,config:$,theme:p,autoDefiner:T}),{generator:b,config:$,theme:p,autoDefiner:T}}catch(p){throw t.dispatchEvent(new CustomEvent("pds:error",{detail:{error:p}})),p}}function Ur(t){let e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):.5}function Hr(t){return Array.isArray(t)?t.map(e=>e?{severity:String(e.severity||"info").toLowerCase(),message:String(e.message||""),path:e.path?String(e.path):""}:null).filter(e=>e&&e.message):[]}function _(t={}){let e=String(t.source||"unknown"),r=String(t.type||"generic"),o=Ur(t.confidence),n=Hr(t.issues),a=t.designPatch&&typeof t.designPatch=="object"?t.designPatch:{},i=t.template&&typeof t.template=="object"?t.template:null;return{source:e,type:r,confidence:o,issues:n,designPatch:a,template:i,meta:t.meta&&typeof t.meta=="object"?t.meta:{}}}function Gr(t){return!!(t&&typeof t=="object"&&"source"in t&&"type"in t&&"confidence"in t&&"issues"in t&&"designPatch"in t)}var qr="../templates/templates.json",It="/assets/pds/templates/templates.json",Vr=["public","assets","pds","templates","templates.json"],Jr=["..","..","..","public","assets","pds","templates","templates.json"],ve=null;function Bt(){return!!(typeof process<"u"&&process?.versions?.node)}function Yr(t={}){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"Template").trim(),description:String(t.description||"").trim(),icon:String(t.icon||"layout").trim(),file:String(t.file||"").trim(),tags:Array.isArray(t.tags)?t.tags.map(e=>String(e)):[]}}function xe(t={},e={}){let o=(Array.isArray(t)?t:Array.isArray(t?.templates)?t.templates:[]).map(Yr).filter(n=>n.id&&n.file);return{version:t?.version||"1",templates:o,__catalogURL:e.catalogURL||null,__catalogFilePath:e.catalogFilePath||null}}async function Zr(t={}){let r=[t.catalogURL||globalThis?.PDS?.currentConfig?.templateCatalogURL,qr,It].filter(Boolean);for(let o of r)try{let n=new URL(o,import.meta.url).href,a=await fetch(n,{credentials:"same-origin"});if(!a.ok)continue;let i=await a.json();return xe(i,{catalogURL:n})}catch{}return xe({templates:[]})}async function Qr(t={}){let e="node:fs/promises",r="node:path",o="node:url",[{readFile:n},a,{fileURLToPath:i}]=await Promise.all([import(e),import(r),import(o)]),l=[];t.catalogPath&&l.push(a.resolve(t.catalogPath)),l.push(a.resolve(process.cwd(),...Vr));let c=a.dirname(i(import.meta.url));l.push(a.resolve(c,...Jr));for(let d of l)try{let s=await n(d,"utf8"),p=JSON.parse(s);return xe(p,{catalogFilePath:d})}catch{}return xe({templates:[]})}async function Kr(t,e){if(!t?.file)return"";if(!Bt()){let c=e?.__catalogURL||It,d=new URL(t.file,c).href,s=await fetch(d,{credentials:"same-origin"});if(!s.ok)throw new Error(`Template file not found: ${t.file}`);return(await s.text()).trim()}let r="node:fs/promises",o="node:path",[{readFile:n},a]=await Promise.all([import(r),import(o)]),i=e?.__catalogFilePath?a.dirname(e.__catalogFilePath):a.resolve(process.cwd(),"public","assets","pds","templates"),l=a.resolve(i,t.file);return(await n(l,"utf8")).trim()}async function we(t={}){return ve&&!t.forceReload||(ve=Bt()?await Qr(t):await Zr(t)),ve}async function Ot(t={}){return(await we(t)).templates.map(({id:r,name:o,description:n,icon:a,file:i,tags:l})=>({id:r,name:o,description:n,icon:a,file:i,tags:l}))}async function Xr(t,e={}){let r=await we(e),o=r.templates.find(a=>a.id===t)||null;if(!o)return null;let n=await Kr(o,r);return{...o,html:n}}async function Wt(t,e={}){let r=await Xr(t,e);return r?_({source:"template",type:"template",confidence:1,template:{id:r.id,name:r.name,html:r.html,icon:r.icon,description:r.description}}):_({source:"template",type:"template",confidence:0,issues:[{severity:"error",message:`Unknown template: ${t}`}]})}var _t={version:"tw2pds-layout-v4",summary:"Deterministic Tailwind\u2192PDS conversion rules focused on layout intent, semantic primitive mapping, and richer import-* fallback coverage.",governance:[{id:"layout.utilities.grid",controls:["grid","grid-cols-*","grid-auto-*"],note:"When false, grid mappings are skipped."},{id:"layout.utilities.flex",controls:["flex","flex-*","items-*","justify-*","grow"],note:"When false, flex mappings are skipped."},{id:"layout.utilities.spacing",controls:["gap-*","stack-*"],note:"When false, spacing mappings are skipped."},{id:"layout.utilities.container",controls:["container","max-w-*"],note:"When false, container mappings are skipped."}],nonPdsClassPatterns:["^group(?:[/:].*)?$","^layout-container$"],neverFallbackTags:["table","thead","tbody","tfoot","tr","th","td","caption","colgroup","col"],directMappings:[{id:"layout.flex.base",tw:"flex",pds:["flex"],gate:"flex"},{id:"layout.flex.inline",tw:"inline-flex",pds:["flex"],gate:"flex"},{id:"layout.flex.row",tw:"flex-row",pds:["flex-row"],gate:"flex"},{id:"layout.flex.col",tw:"flex-col",pds:["flex-col"],gate:"flex"},{id:"layout.flex.wrap",tw:"flex-wrap",pds:["flex-wrap"],gate:"flex"},{id:"layout.flex.grow",tw:"grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow.tw",tw:"flex-grow",pds:["grow"],gate:"flex"},{id:"layout.flex.grow1",tw:"flex-1",pds:["grow"],gate:"flex"},{id:"layout.items.start",tw:"items-start",pds:["items-start"],gate:"flex"},{id:"layout.items.center",tw:"items-center",pds:["items-center"],gate:"flex"},{id:"layout.items.end",tw:"items-end",pds:["items-end"],gate:"flex"},{id:"layout.items.stretch",tw:"items-stretch",pds:["items-stretch"],gate:"flex"},{id:"layout.items.baseline",tw:"items-baseline",pds:["items-baseline"],gate:"flex"},{id:"layout.justify.start",tw:"justify-start",pds:["justify-start"],gate:"flex"},{id:"layout.justify.center",tw:"justify-center",pds:["justify-center"],gate:"flex"},{id:"layout.justify.end",tw:"justify-end",pds:["justify-end"],gate:"flex"},{id:"layout.justify.between",tw:"justify-between",pds:["justify-between"],gate:"flex"},{id:"layout.justify.around",tw:"justify-around",pds:["justify-around"],gate:"flex"},{id:"layout.justify.evenly",tw:"justify-evenly",pds:["justify-evenly"],gate:"flex"},{id:"layout.grid.base",tw:"grid",pds:["grid"],gate:"grid"},{id:"layout.grid.cols.1",tw:"grid-cols-1",pds:["grid-cols-1"],gate:"grid"},{id:"layout.grid.cols.2",tw:"grid-cols-2",pds:["grid-cols-2"],gate:"grid"},{id:"layout.grid.cols.3",tw:"grid-cols-3",pds:["grid-cols-3"],gate:"grid"},{id:"layout.grid.cols.4",tw:"grid-cols-4",pds:["grid-cols-4"],gate:"grid"},{id:"layout.grid.cols.6",tw:"grid-cols-6",pds:["grid-cols-6"],gate:"grid"},{id:"layout.container",tw:"container",pds:["container"],gate:"container"},{id:"intent.surface.shadow",tw:"shadow",pds:["surface-elevated"]},{id:"intent.surface.shadow-md",tw:"shadow-md",pds:["surface-elevated"]},{id:"intent.surface.shadow-lg",tw:"shadow-lg",pds:["surface-elevated"]},{id:"intent.surface.base",tw:"bg-white",pds:["surface-base"]},{id:"typography.align.center",tw:"text-center",pds:["text-center"]},{id:"typography.align.left",tw:"text-left",pds:["text-left"]},{id:"typography.align.right",tw:"text-right",pds:["text-right"]},{id:"typography.text.muted.gray500",tw:"text-gray-500",pds:["text-muted"]},{id:"typography.text.muted.slate500",tw:"text-slate-500",pds:["text-muted"]}],ignoredPatterns:[{id:"style.color",pattern:"^(?:text|from|to|via|decoration|accent|caret)-|^bg-(?!cover$|center$|no-repeat$)",reason:"Visual style token skipped in favor of semantic PDS styling."},{id:"style.radius-border-shadow",pattern:"^(?:rounded|ring|border|shadow|outline)-?",reason:"Surface/shape inferred at primitive level."},{id:"style.typography",pattern:"^(?:font|leading|tracking|uppercase|lowercase|capitalize)-?",reason:"Typography atomic utilities are skipped."},{id:"style.effects",pattern:"^(?:opacity|blur|backdrop|drop-shadow|mix-blend|filter)-",reason:"Visual effects skipped unless mapped to a PDS utility."},{id:"style.transitions",pattern:"^(?:transition|duration|ease|delay|animate)-",reason:"Motion is system-defined in PDS."},{id:"style.spacing.atomic",pattern:"^(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-",reason:"Atomic spacing skipped; structural spacing intent is mapped."},{id:"style.positioning.atomic",pattern:"^(?:absolute|relative|fixed|sticky|inset(?:-[xy])?|top|right|bottom|left|z|translate(?:-[xy])?|-translate-[xy])(?:-|$)",reason:"Atomic positioning/offset utilities are skipped so PDS primitives and layout utilities control placement."}],intentRules:[{id:"intent.layout.responsive-grid-to-auto",summary:"Collapse responsive grid-cols patterns (including base+md two-step patterns) to best-fit grid-auto-*"},{id:"intent.layout.mobile-stack",summary:"Map flex-col + md/lg:flex-row to mobile-stack"},{id:"intent.component.card",summary:"Infer card/surface classes from rounded+shadow+surface signals"},{id:"intent.component.card.normalize",summary:"Detect Tailwind card utility clusters and normalize them to PDS card and surface variants."},{id:"intent.component.button",summary:"Infer btn-primary / btn-outline / icon-only from CTA patterns"},{id:"intent.component.button.normalize",summary:"Prevents import-* style classes on button-like elements and applies PDS button variants/sizes."},{id:"intent.component.badge.normalize",summary:"Detects Tailwind badge/pill utility clusters and normalizes them to PDS badge primitives/variants."},{id:"intent.typography.heading-semantic",summary:"Removes Tailwind heading typography/color utilities so heading semantics and PDS defaults control typography."},{id:"intent.surface.footer-inverse",summary:"Use surface-inverse for footers with explicit background intent"},{id:"intent.typography.link-treatment",summary:"Apply minimal link treatment for hover/transition-tailwind anchors"},{id:"intent.preflight.tailwind-runtime-detected",summary:"Detect Tailwind runtime CSS injection and translate key preflight intent"},{id:"intent.preflight.list-reset",summary:"Preserve Tailwind list-reset preflight behavior via scoped fallback class"},{id:"intent.preflight.anchor-reset",summary:"Preserve Tailwind anchor reset preflight behavior via scoped fallback class"},{id:"table.strict-tags.no-classes",summary:"Never emit classes for semantic table tags (table/thead/tbody/tfoot/tr/th/td/caption/colgroup/col)"},{id:"intent.form.nested-label",summary:"Convert sibling label+control pairs into nested labels"},{id:"fallback.import-style",summary:"Generate import-* classes + local style block for unmapped utility styles"}],gapScaleMap:{"gap-0":"gap-0","gap-1":"gap-xs","gap-2":"gap-sm","gap-3":"gap-sm","gap-4":"gap-md","gap-5":"gap-md","gap-6":"gap-lg","gap-7":"gap-lg","gap-8":"gap-xl","gap-10":"gap-xl","gap-12":"gap-xl"},maxWidthMap:{"max-w-xs":"max-w-sm","max-w-sm":"max-w-sm","max-w-md":"max-w-md","max-w-lg":"max-w-lg","max-w-xl":"max-w-xl","max-w-2xl":"max-w-xl","max-w-3xl":"max-w-xl","max-w-4xl":"max-w-xl","max-w-5xl":"max-w-xl","max-w-6xl":"max-w-xl","max-w-7xl":"max-w-xl"},tailwindSizeScale:{"0":"var(--spacing-0)","0.5":"0.125rem","1":"var(--spacing-1)","1.5":"0.375rem","2":"var(--spacing-2)","2.5":"0.625rem","3":"var(--spacing-3)","3.5":"0.875rem","4":"var(--spacing-4)","5":"var(--spacing-5)","6":"var(--spacing-6)","7":"var(--spacing-7)","8":"var(--spacing-8)","9":"var(--spacing-9)","10":"var(--spacing-10)","11":"var(--spacing-11)","12":"var(--spacing-12)","14":"3.5rem","16":"4rem","20":"5rem","24":"6rem","28":"7rem","32":"8rem","36":"9rem","40":"10rem","48":"12rem"},importStyleRules:{"w-full":"width:100%","w-auto":"width:auto","h-full":"height:100%","h-48":"height:12rem","h-2.5":"height:0.625rem","h-10":"height:var(--spacing-10)","h-2":"height:var(--spacing-2)","w-2":"width:var(--spacing-2)","size-8":"width:var(--spacing-8);height:var(--spacing-8)","size-10":"width:var(--spacing-10);height:var(--spacing-10)","size-full":"width:100%;height:100%","min-h-screen":"min-height:100vh","overflow-hidden":"overflow:hidden","overflow-x-hidden":"overflow-x:hidden","overflow-x-auto":"overflow-x:auto","whitespace-nowrap":"white-space:nowrap",hidden:"display:none",block:"display:block",truncate:"overflow:hidden;text-overflow:ellipsis;white-space:nowrap","justify-items-center":"justify-items:center","justify-items-start":"justify-items:start","justify-items-end":"justify-items:end","justify-items-stretch":"justify-items:stretch","grid-flow-col":"grid-auto-flow:column","aspect-square":"aspect-ratio:1 / 1","bg-center":"background-position:center","bg-cover":"background-size:cover","bg-no-repeat":"background-repeat:no-repeat","transition-colors":"transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms"},importStyleDynamicRules:[{id:"fallback.import-style.gap-scale",pattern:"^gap-(\\d+)$",summary:"Converts gap scale utilities (including responsive variants like md:gap-6) to generated import-* fallback classes."},{id:"fallback.import-style.min-width-arbitrary",pattern:"^min-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-width utilities (e.g. min-w-[600px]) to generated import-* fallback classes."},{id:"fallback.import-style.max-width-arbitrary",pattern:"^max-w-\\[[^\\]]+\\]$",summary:"Converts arbitrary max-width utilities (e.g. max-w-[480px]) to generated import-* fallback classes."},{id:"fallback.import-style.min-height-arbitrary",pattern:"^min-h-\\[[^\\]]+\\]$",summary:"Converts arbitrary min-height utilities (e.g. min-h-[180px]) to generated import-* fallback classes."},{id:"fallback.import-style.grid-rows-arbitrary",pattern:"^grid-rows-\\[[^\\]]+\\]$",summary:"Converts arbitrary grid template row utilities (e.g. grid-rows-[1fr_auto]) to generated import-* fallback classes."},{id:"fallback.import-style.size-scale",pattern:"^size-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts size scale/arbitrary utilities into width+height fallback declarations."},{id:"fallback.import-style.width-height-scale",pattern:"^[wh]-(\\[[^\\]]+\\]|[0-9.]+)$",summary:"Converts width/height scale and arbitrary utilities to import-* classes."},{id:"fallback.import-style.spacing",pattern:"^-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(.+)$",summary:"Converts spacing utilities to directional padding/margin fallback declarations, including responsive variants."},{id:"fallback.import-style.text-size",pattern:"^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$",summary:"Converts common text size utilities to import-* font-size declarations."},{id:"fallback.import-style.font-weight",pattern:"^font-(normal|medium|semibold|bold|extrabold|black)$",summary:"Converts common font weight utilities to import-* font-weight declarations."},{id:"fallback.import-style.leading-tracking",pattern:"^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|tighter|wide|wider|widest)$",summary:"Converts line-height and letter-spacing utilities to import-* declarations for typography fidelity."},{id:"fallback.import-style.bg-tokenized",pattern:"^bg-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind background color utilities by mapping families like blue/purple/green/red to PDS semantic tokens."},{id:"fallback.import-style.text-tokenized",pattern:"^text-([a-z]+)-(\\d{2,3})$",summary:"Safeguards Tailwind text color utilities by mapping common families to PDS semantic tokens."},{id:"fallback.import-style.rounded",pattern:"^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$",summary:"Safeguards rounded utilities (including rounded-t-sm) by mapping to PDS radius tokens."},{id:"fallback.import-style.overlay-alpha",pattern:"^bg-black\\/(\\d{1,3})$",summary:"Converts alpha black overlay classes (e.g. bg-black/50) to tokenized color-mix background overlays."},{id:"fallback.import-style.text-inverse",pattern:"^text-white$",summary:"Preserves white foreground intent for text-on-image use cases using inverse-compatible tokens."},{id:"fallback.import-style.bg-arbitrary",pattern:"^bg-\\[[^\\]]+\\]$",summary:"Converts arbitrary background colors to import-* fallback classes when values are CSS-safe."},{id:"fallback.import-style.text-arbitrary",pattern:"^text-\\[[^\\]]+\\]$",summary:"Converts arbitrary text colors to import-* fallback classes when values are CSS-safe."}]};var to="src/js/pds-live-manager/tailwind-conversion-rules.json",$e=["base","sm","md","lg","xl","2xl"];function ro(t={}){let e=Array.isArray(t.ignoredPatterns)?t.ignoredPatterns.map(o=>({...o,pattern:o?.pattern instanceof RegExp?o.pattern:new RegExp(String(o?.pattern||""))})):[],r=Array.isArray(t.nonPdsClassPatterns)?t.nonPdsClassPatterns.map(o=>o instanceof RegExp?o:new RegExp(String(o||""))):[];return{...t,ignoredPatterns:e,nonPdsClassPatterns:r}}var D=ro(_t),Dt=D.version||"tw2pds-layout-v4",oo=new Map(D.directMappings.map(t=>[t.tw,t])),Qe=new Map(Object.entries(D.gapScaleMap||{})),Ut=new Map(Object.entries(D.maxWidthMap||{})),ao=D.nonPdsClassPatterns||[],no=new Set(D.neverFallbackTags||[]),io={...D.importStyleRules||{}},so=D.tailwindSizeScale||{},lo=["container","grid","flex","gap","space","items","justify","content","place","self","col","row","w","h","min","max","p","m","rounded","border","ring","outline","shadow","bg","text","font","leading","tracking","uppercase","lowercase","capitalize","overflow","whitespace","truncate","object","aspect","opacity","blur","backdrop","transition","duration","ease","delay","animate","hidden","block","inline","absolute","relative","fixed","sticky","size"];function Ht(t="",e=""){if(!t||!e)return t;let r=new RegExp(`\\s${e}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`,"gi");return String(t).replace(r,"")}function co(t="",e=null){let r=String(t||""),o=0;return r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(input)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*?)>/gi,(n,a,i,l,c,d,s,p,u,f,h)=>{if(l!==f)return n;let y=Ht(`${a||""}${c||""}`,"for"),g=`<${s}${p||""} id="${f}"${h||""}>`;return o+=1,`<label${y}>${d}${g}</label>`}),r=r.replace(/<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(select|textarea)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*)>([\s\S]*?)<\/\6>/gi,(n,a,i,l,c,d,s,p,u,f,h,y)=>{if(l!==f)return n;let g=Ht(`${a||""}${c||""}`,"for"),b=`<${s}${p||""} id="${f}"${h||""}>${y}</${s}>`;return o+=1,`<label${g}>${d}${b}</label>`}),e&&o>0&&(e.labelNestingCount+=o,P(e,`Nested ${o} label/control pairs.`),L(e,"intent.form.nested-label")),r}function po(t="",e="base"){let r=String(t||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rule";return`import-${e&&e!=="base"?`${e}-`:""}${r}`}function de(t,e,r,o="base",n=""){if(!t||!e||!r)return"";let a=po(e,o);if(n){let i=`${o}|${n}`;t.importPseudoStyles.has(i)||t.importPseudoStyles.set(i,new Map),t.importPseudoStyles.get(i).set(a,r)}else o==="base"?t.importBaseStyles.set(a,r):(t.importResponsiveStyles.has(o)||t.importResponsiveStyles.set(o,new Map),t.importResponsiveStyles.get(o).set(a,r));return t.importedStyleCount+=1,a}function Q(t=""){return String(t||"").trim().replace(/_/g," ")}function K(t=""){return!t||/[;{}]/.test(t)?!1:/^[-#(),.%/\sa-zA-Z0-9]+$/.test(t)}function Se(t=""){let e=String(t||"").trim();if(!e)return null;let r=e.match(/^\[([^\]]+)\]$/);if(r){let o=Q(r[1]);return K(o)?o:null}return so[e]||null}function uo(t=""){let e=Number(t);if(!Number.isFinite(e))return"500";let r=["50","100","200","300","400","500","600","700","800","900"],o=String(e);return r.includes(o)?o:e<=75?"50":e<=150?"100":e<=250?"200":e<=350?"300":e<=450?"400":e<=550?"500":e<=650?"600":e<=750?"700":e<=850?"800":"900"}function Gt(t="",e="500"){let r=String(t||"").toLowerCase(),o=uo(e);return["blue","sky","indigo","cyan"].includes(r)?`var(--color-primary-${o})`:["purple","violet","fuchsia"].includes(r)?`var(--color-accent-${o})`:["green","emerald","lime","teal"].includes(r)?`var(--color-success-${o})`:["red","rose","pink","orange"].includes(r)?`var(--color-danger-${o})`:["slate","gray","zinc","neutral","stone"].includes(r)?`var(--color-secondary-${o})`:""}function qt(t=""){let e=Q(t);return K(e)&&(/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(e)||/^(?:rgb|hsl)a?\([^)]*\)$/.test(e))?e:""}function go(t=[]){if(!Array.isArray(t)||t.length===0)return"";let e=t.filter(o=>!$e.includes(o));if(e.length===0||e.length>1)return"";let r=e[0];return["hover","focus","active"].includes(r)?r:""}function mo(t,e="base",r=[]){let o=go(r),n=io[t];if(n)return{declaration:n,breakpoint:e,pseudo:o,ruleId:"fallback.import-style"};let a=String(t).match(/^gap-(\d+)$/);if(a){let z={0:"var(--spacing-0)",1:"var(--spacing-1)",2:"var(--spacing-2)",3:"var(--spacing-3)",4:"var(--spacing-4)",5:"var(--spacing-5)",6:"var(--spacing-6)",7:"var(--spacing-7)",8:"var(--spacing-8)",10:"var(--spacing-10)",12:"var(--spacing-12)"},F=Number(a[1]);if(z[F])return{declaration:`gap:${z[F]}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.gap-scale"}}let i=String(t).match(/^min-w-\[([^\]]+)\]$/);if(i){let z=Q(i[1]);if(K(z))return{declaration:`min-width:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.min-width-arbitrary"}}let l=String(t).match(/^max-w-\[([^\]]+)\]$/);if(l){let z=Q(l[1]);if(K(z))return{declaration:`max-width:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.max-width-arbitrary"}}let c=String(t).match(/^min-h-\[([^\]]+)\]$/);if(c){let z=Q(c[1]);if(K(z))return{declaration:`min-height:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.min-height-arbitrary"}}let d=String(t).match(/^grid-rows-\[([^\]]+)\]$/);if(d){let z=Q(d[1]);if(K(z))return{declaration:`grid-template-rows:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.grid-rows-arbitrary"}}let s=String(t).match(/^size-(.+)$/);if(s){let z=Se(s[1]);if(z)return{declaration:`width:${z};height:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.size-scale"}}let p=String(t).match(/^w-(.+)$/);if(p){let z=Se(p[1]);if(z)return{declaration:`width:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.width-scale"}}let u=String(t).match(/^h-(.+)$/);if(u){let z=Se(u[1]);if(z)return{declaration:`height:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.height-scale"}}let f={xs:"var(--font-size-xs)",sm:"var(--font-size-sm)",base:"var(--font-size-md)",lg:"var(--font-size-lg)",xl:"var(--font-size-xl)","2xl":"var(--font-size-2xl)","3xl":"var(--font-size-3xl)","4xl":"var(--font-size-4xl)"},h=String(t).match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/);if(h)return{declaration:`font-size:${f[h[1]]}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.text-size"};let y={normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},g=String(t).match(/^font-(normal|medium|semibold|bold|extrabold|black)$/);if(g)return{declaration:`font-weight:${y[g[1]]}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.font-weight"};let b={none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2"},v=String(t).match(/^leading-(none|tight|snug|normal|relaxed|loose)$/);if(v)return{declaration:`line-height:${b[v[1]]}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.line-height"};let S={tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},T=String(t).match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);if(T)return{declaration:`letter-spacing:${S[T[1]]}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.tracking"};let M=String(t).match(/^bg-black\/(\d{1,3})$/);if(M)return{declaration:`background-color:color-mix(in srgb, var(--color-secondary-900) ${Math.max(0,Math.min(100,Number(M[1])))}%, transparent)`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.overlay-alpha"};if(t==="text-white")return{declaration:"color:var(--color-secondary-50)",breakpoint:e,pseudo:o,ruleId:"fallback.import-style.text-inverse"};let $=String(t).match(/^bg-([a-z]+)-(\d{2,3})$/);if($){let z=Gt($[1],$[2]);if(z)return{declaration:`background-color:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.bg-tokenized"}}let R=String(t).match(/^bg-\[([^\]]+)\]$/);if(R){let z=qt(R[1]);if(z)return{declaration:`background-color:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.bg-arbitrary"}}let x=String(t).match(/^text-([a-z]+)-(\d{2,3})$/);if(x){let z=Gt(x[1],x[2]);if(z)return{declaration:`color:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.text-tokenized"}}let w=String(t).match(/^text-\[([^\]]+)\]$/);if(w){let z=qt(w[1]);if(z)return{declaration:`color:${z}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.text-arbitrary"}}let C=String(t).match(/^rounded(?:-([trbl]{1,2}))?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);if(C){let z=C[1]||"",F=C[2]||"sm",I=F==="none"?"0":`var(--radius-${F})`,A={t:["top-left","top-right"],b:["bottom-left","bottom-right"],l:["top-left","bottom-left"],r:["top-right","bottom-right"],tl:["top-left"],tr:["top-right"],bl:["bottom-left"],br:["bottom-right"]};if(!z)return{declaration:`border-radius:${I}`,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.rounded"};let k=(A[z]||[]).map(j=>`border-${j}-radius:${I}`).join(";");if(k)return{declaration:k,breakpoint:e,pseudo:o,ruleId:"fallback.import-style.rounded"}}return null}function ke(t,e){return typeof t=="number"&&Number.isFinite(t)?`${t}px`:typeof t=="string"&&t.trim()?t.trim():`${e}px`}function fo(t={}){let r=(t?.design&&typeof t.design=="object"?t.design:t)?.layout?.breakpoints||{};return{sm:ke(r.sm,640),md:ke(r.md,768),lg:ke(r.lg,1024),xl:ke(r.xl,1280)}}function ho(t,e){let r=Array.from(t.importBaseStyles.entries()).map(([a,i])=>`.${a}{${i};}`),o=[];for(let[a,i]of t.importResponsiveStyles.entries()){let l=e?.[a];if(!l||!i?.size)continue;let c=Array.from(i.entries()).map(([d,s])=>`.${d}{${s};}`).join(`
`);o.push(`@media (min-width: ${l}) {
${c}
}`)}for(let[a,i]of t.importPseudoStyles.entries()){let[l,c]=String(a).split("|");if(!c||!i?.size)continue;let d=Array.from(i.entries()).map(([p,u])=>`.${p}:${c}{${u};}`).join(`
`);if(!d)continue;if(l==="base"){o.push(d);continue}let s=e?.[l];s&&o.push(`@media (min-width: ${s}) {
${d}
}`)}let n=[...r,...o].filter(Boolean).join(`
`);return n.trim()?["/* pds-import: generated fallback styles for unmapped Tailwind utilities */",n].join(`
`):""}function bo(t="",e=""){if(!e||!e.trim())return t;let r=`<style data-pds-import="tailwind-fallback">
${e}
</style>`;return/<head[^>]*>/i.test(t)?t.replace(/<head([^>]*)>/i,`<head$1>
${r}`):`${r}
${t}`}function Vt(t=""){if(!t)return!1;if(t.includes(":")||t.includes("["))return!0;let e=t.split("-")[0];return lo.includes(e)}function pe(t=""){let e=String(t).split(":");if(e.length===1)return{breakpoint:"base",base:e[0],variants:[]};let r=e[e.length-1],o=e.slice(0,-1);return{breakpoint:o.find(a=>$e.includes(a))||"base",base:r,variants:o}}function yo(){return{totalTailwind:0,mapped:0,ignored:0,policySkipped:0,unknown:0,intentHits:0,unknownTokens:new Map,notes:[],appliedRules:new Set,importBaseStyles:new Map,importResponsiveStyles:new Map,importPseudoStyles:new Map,importedStyleCount:0,labelNestingCount:0,removedAtomicSpacingCount:0,removedAtomicPositioningCount:0}}function vo(t=""){let e=String(t||"").toLowerCase().replace(/\s+/g,""),r=e.includes("menu,ol,ul{list-style:none")||e.includes("ol,ul,menu{list-style:none")||e.includes("ul,ol,menu{list-style:none"),o=e.includes("a{color:inherit;text-decoration:inherit");return{listReset:r,anchorReset:o}}function xo(t=""){return String(t||"").toLowerCase().includes("cdn.tailwindcss.com")?{listReset:!0,anchorReset:!0}:{listReset:!1,anchorReset:!1}}function wo(t="",e=null){let r=String(t||""),o={listReset:!1,anchorReset:!1,strippedRuntimeCssBlocks:0,strippedRuntimeScripts:0};return r=r.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi,(n,a,i)=>{let l=String(i||"");if(!(/tailwindcss\s+v\d/i.test(l)||/\*\s*!\s*tailwindcss/i.test(l)))return n;let d=vo(l);return o.listReset=o.listReset||d.listReset,o.anchorReset=o.anchorReset||d.anchorReset,o.strippedRuntimeCssBlocks+=1,""}),r=r.replace(/<script([^>]*?)src\s*=\s*(?:(['"])([^"']*cdn\.tailwindcss\.com[^"']*)\2|([^\s>]*cdn\.tailwindcss\.com[^\s>]*))([^>]*)><\/script>/gi,(n,a,i,l,c)=>{let s=xo(l||c||"");return o.listReset=o.listReset||s.listReset,o.anchorReset=o.anchorReset||s.anchorReset,o.strippedRuntimeScripts+=1,""}),e&&(o.strippedRuntimeCssBlocks>0||o.strippedRuntimeScripts>0)&&(L(e,"intent.preflight.tailwind-runtime-detected"),o.strippedRuntimeCssBlocks>0&&P(e,`Detected and stripped ${o.strippedRuntimeCssBlocks} Tailwind runtime style block(s).`)),e&&o.strippedRuntimeScripts>0&&P(e,`Removed ${o.strippedRuntimeScripts} Tailwind CDN script reference(s).`),{html:r,hints:o}}function P(t,e){!t||!e||t.notes.includes(e)||t.notes.push(e)}function ko(t,e){let r=t.unknownTokens.get(e)||0;t.unknownTokens.set(e,r+1)}function So(t={}){let r=(t?.design&&typeof t.design=="object"?t.design:t)?.layout?.utilities||{};return{grid:r.grid!==!1,flex:r.flex!==!1,spacing:r.spacing!==!1,container:r.container!==!1}}function W(t,e){return e?t?.[e]!==!1:!0}function Jt(t){let e=String(t).match(/^grid-cols-(\d+)$/);return e?Number(e[1]):null}function Yt(t={}){let e=$e.map(n=>({bp:n,cols:t[n]})).filter(n=>Number.isFinite(n.cols));if(e.length<2)return null;if(e.length===2){let[n,a]=e;if(n.bp==="base"&&n.cols===1&&a.cols===2)return"grid-auto-lg";if(n.bp==="base"&&n.cols===1&&a.cols>=3)return null;if(n.cols<a.cols){if(a.cols>=4)return"grid-auto-md";if(a.cols>=2)return"grid-auto-lg"}return null}let r=!0;for(let n=1;n<e.length;n+=1)if(e[n].cols<=e[n-1].cols){r=!1;break}if(!r)return null;let o=e[e.length-1]?.cols||0;return o>=4?"grid-auto-md":o>=3?"grid-auto-sm":null}function $o(t=""){let e=String(t).match(/^text-(gray|slate|zinc|neutral|stone)-(\d{2,3})$/);if(!e)return"";let r=Number(e[2]);return Number.isFinite(r)&&r>=400&&r<=600?"text-muted":""}function zo(t="",e=0){return!t||!Number.isFinite(e)?"":{sm:{2:"sm:grid-cols-2"},md:{3:"md:grid-cols-3"},lg:{4:"lg:grid-cols-4"}}?.[t]?.[e]||""}function Co(t=new Set){return Array.from(t).some(e=>{let r=String(e||"");return/^grid-cols-\d+$/.test(r)||/^grid-auto-(?:sm|md|lg|xl)$/.test(r)||/^(?:sm|md|lg|xl):grid-cols-\d+$/.test(r)||/^import-(?:sm-|md-|lg-|xl-)?grid-cols-\d+$/.test(r)})}function Mo(t,e=12){return Array.from(t.unknownTokens.entries()).sort((r,o)=>o[1]-r[1]).slice(0,e).map(([r])=>r)}function L(t,e){!t||!e||t.appliedRules.add(e)}function q(t=[],e){return!Array.isArray(t)||!e?!1:t.some(r=>e.test(String(r)))}function To(t=[]){for(let e of t){let r=pe(e);if(r.breakpoint!=="base")continue;let o=String(r.base).match(/^h-(.+)$/);if(!o)continue;let n=Se(o[1]);if(!n||n==="auto")continue;let a=String(n).match(/^(-?\d+(?:\.\d+)?)rem$/);if(a){let i=Number(a[1]);if(Number.isFinite(i))return i*16}}return null}function Eo(t=[],e=""){let r=e==="button",o=q(t,/^bg-/),n=q(t,/^hover:bg-/),a=q(t,/^border/),i=q(t,/^shadow/),l=t.includes("cursor-pointer"),c=q(t,/^rounded/),d=q(t,/^(?:min-w|max-w|w)-/),s=q(t,/^text-(?:white|black|\[[^\]]+\]|[a-z]+-\d{2,3})$/),p=o||n||i;if(!(r||e==="a"&&(p||a||l||c&&d)))return{shouldNormalize:!1,variant:"none",size:"base",iconOnly:!1};let h="none";a&&!o&&!n?h="outline":(p||o&&s)&&(h="primary");let y=t.includes("rounded-full")&&(t.includes("p-2")||t.includes("p-1")||t.includes("p-2.5")),g=q(t,/^size-(?:6|7|8|9|10|11|12)$/),b=y||g,v=To(t),S=t.includes("text-sm")||t.includes("text-xs"),T=t.includes("text-lg")||t.includes("text-xl"),M="base";return v&&v<=40||S?M="sm":(v&&v>=48||T)&&(M="lg"),{shouldNormalize:!0,variant:h,size:M,iconOnly:b}}function Ao(t=""){let e=String(t||"").toLowerCase();return["green","emerald","lime","teal"].includes(e)?"badge-success":["blue","sky","cyan","indigo"].includes(e)?"badge-info":["yellow","amber","orange"].includes(e)?"badge-warning":["red","rose","pink"].includes(e)?"badge-danger":["gray","slate","zinc","neutral","stone"].includes(e)?"badge-secondary":["purple","violet","fuchsia","primary","accent"].includes(e)?"badge-primary":"badge-secondary"}function Lo(t=[],e="",r={shouldNormalize:!1}){if(r?.shouldNormalize)return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:""};if(["button","a","input","select","textarea"].includes(e))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:""};if(t.some($=>/^badge(?:-|$)/.test(String($))))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:""};let o=t.map($=>pe($)).filter($=>$.breakpoint==="base").map($=>String($.base)),n=o.some($=>/^rounded(?:-|$)/.test($)),a=o.some($=>/^px-/.test($)),i=o.some($=>/^py-/.test($)),l=a&&i,c=o.includes("text-xs")||o.includes("text-sm"),d=o.includes("text-lg")||o.includes("text-xl"),s=o.map($=>$.match(/^bg-([a-z]+)-(\d{2,3})$/)).find(Boolean),p=o.map($=>$.match(/^text-([a-z]+)-(\d{2,3})$/)).find(Boolean),u=o.map($=>$.match(/^border-([a-z]+)-(\d{2,3})$/)).find(Boolean),f=!!(s&&Number(s[2])<=300),h=o.some($=>/^border(?:-|$)/.test($)),y=!!(s||p||u),g=[n,l,c,f||h].filter(Boolean).length;if(!(y&&g>=3))return{shouldNormalize:!1,variantClass:"",outline:!1,sizeClass:""};let v=s&&s[1]||p&&p[1]||u&&u[1]||"";return{shouldNormalize:!0,variantClass:Ao(v),outline:h&&!f,sizeClass:c?"badge-sm":d?"badge-lg":""}}function Ro(t="",e=0){let r=String(t||"").toLowerCase(),o=Number(e);return r==="white"?"surface-base":["gray","slate","zinc","neutral","stone"].includes(r)?Number.isFinite(o)&&o<=100?"surface-base":"surface-subtle":["blue","sky","cyan","indigo","primary","info"].includes(r)?"surface-info":["purple","violet","fuchsia","accent"].includes(r)?"surface-primary":["green","emerald","lime","teal","success"].includes(r)?"surface-success":["yellow","amber","orange","warning"].includes(r)?"surface-warning":["red","rose","pink","danger"].includes(r)?"surface-danger":"surface-base"}function Fo(t=[],e="",r={shouldNormalize:!1},o={shouldNormalize:!1}){if(r?.shouldNormalize||o?.shouldNormalize)return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(!new Set(["div","section","article","aside","li"]).has(e))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};if(t.some(g=>/^card(?:-|$)/.test(String(g))))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let a=t.map(g=>pe(g)).filter(g=>g.breakpoint==="base").map(g=>String(g.base)),i=a.some(g=>/^rounded(?:-|$)/.test(g)),l=a.some(g=>/^border(?:$|-)/.test(g)),c=a.some(g=>/^shadow(?:$|-)/.test(g)),d=a.some(g=>/^(?:p|px|py|pt|pb|pl|pr)-/.test(g)),s=a.map(g=>g.match(/^bg-([a-z]+)-?(\d{2,3})?$/)).find(Boolean),p=a.includes("bg-white")||!!s;if(!([i,l||c,p,d].filter(Boolean).length>=3))return{shouldNormalize:!1,cardVariantClass:"",surfaceClass:""};let h="card-basic";c?h="card-elevated":l&&(h="card-outlined");let y="";return c?y="surface-elevated":s?y=Ro(s[1],s[2]):p&&(y="surface-base"),{shouldNormalize:!0,cardVariantClass:h,surfaceClass:y}}function jo({tagName:t,originalClassValue:e,policy:r,summary:o,preflightHints:n={}}){if(no.has(t))return L(o,"table.strict-tags.no-classes"),"";let a=String(e).split(/\s+/).filter(Boolean),i=Eo(a,t),l=Lo(a,t,i),c=Fo(a,t,i,l),d=/^h[1-6]$/.test(t),s=new Set,p={},u={},f=!1,h="",y=!1,g="";a.forEach(x=>{let w=pe(x),C=w.base;if(ao.some(k=>k.test(C))){o.ignored+=1,L(o,"cleanup.non-pds-class");return}let z=Vt(x)||Vt(C);if(z&&(o.totalTailwind+=1),/^space-y-/.test(C)){f=!0,h=h||x,o.ignored+=1,L(o,"layout.spacing.space-y-to-stack");return}if(/^space-x-/.test(C)){let k=String(C).match(/^space-x-(\d+)$/);if(k){let j=`gap-${k[1]}`,B=Qe.get(j);if(B&&W(r,"spacing")){s.add(B),y=!0,g=g||x,o.mapped+=1,o.intentHits+=1,L(o,"layout.spacing.space-x-to-gap");return}}o.ignored+=1,L(o,"style.spacing.atomic");return}if(/^grid-cols-\d+$/.test(C)&&w.breakpoint!=="base"){let k=Jt(C);if(Number.isFinite(k)&&W(r,"grid")){p[w.breakpoint]=k,o.mapped+=1,L(o,"intent.layout.responsive-grid-to-auto");return}if(!W(r,"grid")){o.policySkipped+=1,P(o,"Skipped responsive grid mapping because layout.utilities.grid=false.");return}}if(/^flex-(?:row|col)$/.test(C)&&w.breakpoint!=="base"){if(W(r,"flex")){u[w.breakpoint]=C,o.mapped+=1,L(o,"intent.layout.mobile-stack");return}o.policySkipped+=1,P(o,"Skipped responsive flex mapping because layout.utilities.flex=false.");return}if(/^grid-cols-\d+$/.test(C)&&w.breakpoint==="base"){let k=Jt(C);Number.isFinite(k)&&W(r,"grid")&&(p.base=k)}let F=oo.get(C);if(F&&w.breakpoint==="base"){if(!W(r,F.gate)){o.policySkipped+=1,P(o,`Skipped ${C} because layout.utilities.${F.gate}=false.`);return}F.pds.forEach(k=>{k&&s.add(k)}),o.mapped+=1,L(o,F.id);return}if(Qe.has(C)&&w.breakpoint==="base"){if(!W(r,"spacing")){o.policySkipped+=1,P(o,"Skipped gap utility because layout.utilities.spacing=false.");return}s.add(Qe.get(C)),o.mapped+=1,L(o,"layout.spacing.gap-scale");return}if(Ut.has(C)&&w.breakpoint==="base"){if(!W(r,"container")){o.policySkipped+=1,P(o,"Skipped max-width utility because layout.utilities.container=false.");return}s.add(Ut.get(C)),o.mapped+=1,L(o,"layout.container.max-width");return}if(i.shouldNormalize&&z){let k=String(C||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(k)||k.startsWith("hover:")){o.ignored+=1,L(o,"intent.component.button.normalize");return}}if(d&&/^(?:text-(?:xs|sm|base|lg|xl|\dxl|white|black|\[[^\]]+\]|[a-z]+-\d{2,3})|font-|leading-|tracking-|uppercase|lowercase|capitalize)/.test(C)){o.ignored+=1,o.intentHits+=1,L(o,"intent.typography.heading-semantic");return}if(l.shouldNormalize&&z){let k=String(C||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/.test(k)||k.startsWith("hover:")){o.ignored+=1,L(o,"intent.component.badge.normalize");return}}if(c.shouldNormalize&&z){let k=String(C||"");if(/^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)/.test(k)||k.startsWith("hover:")){o.ignored+=1,L(o,"intent.component.card.normalize");return}}let I=$o(C);if(I&&w.breakpoint==="base"){s.add(I),o.mapped+=1,o.intentHits+=1,L(o,"intent.typography.text-neutral-to-muted");return}if(/^text-(?:white|black|[a-z]+-\d{2,3}|\[[^\]]+\])$/.test(C)){o.ignored+=1,L(o,"style.color");return}let E=mo(C,w.breakpoint,w.variants);if(E){let k=de(o,C,E.declaration,E.breakpoint,E.pseudo);if(k){s.add(k),o.mapped+=1,o.intentHits+=1,L(o,E.ruleId),w.breakpoint!=="base"&&P(o,`Generated responsive import fallback for ${x}.`);return}}for(let k of D.ignoredPatterns)if(k.pattern.test(C)){o.ignored+=1,L(o,k.id),k.id==="style.spacing.atomic"&&(o.removedAtomicSpacingCount+=1),k.id==="style.positioning.atomic"&&(o.removedAtomicPositioningCount+=1);return}if(z){o.unknown+=1,ko(o,x);return}s.add(x)}),f&&W(r,"spacing")&&(s.add("stack-md"),o.mapped+=1,o.intentHits+=1,P(o,`Mapped ${h} to stack-md.`)),y&&W(r,"spacing")&&P(o,`Mapped ${g} to gap utility.`);let b=Yt(p);if(b&&W(r,"grid")?(s.delete("grid-cols-1"),s.delete("grid-cols-2"),s.delete("grid-cols-3"),s.delete("grid-cols-4"),s.delete("grid-cols-6"),s.add("grid"),s.add(b),o.intentHits+=1,L(o,"intent.layout.responsive-grid-to-auto"),P(o,`Collapsed responsive grid columns to ${b}.`)):W(r,"grid")&&$e.filter(w=>w!=="base"&&Number.isFinite(p[w])).forEach(w=>{let C=p[w],z=zo(w,C);if(z){s.add("grid"),s.add(z),o.intentHits+=1,L(o,"intent.layout.responsive-grid-to-auto"),P(o,`Mapped ${w}:grid-cols-${C} to ${z}.`);return}let F=de(o,`grid-cols-${C}`,`grid-template-columns:repeat(${C}, minmax(0, 1fr))`,w);F&&(s.add("grid"),s.add(F),o.intentHits+=1,L(o,"fallback.import-style.grid-cols-responsive"),P(o,`Mapped ${w}:grid-cols-${C} to responsive import fallback for exact columns.`))}),W(r,"flex")&&a.includes("flex-col")&&(u.md==="flex-row"||u.lg==="flex-row")&&(s.delete("flex-col"),s.delete("flex-row"),s.add("mobile-stack"),o.intentHits+=1,L(o,"intent.layout.mobile-stack"),P(o,"Mapped flex-col + breakpoint flex-row to mobile-stack.")),a.some(x=>/^grid-cols-\d+$/.test(pe(x).base))&&s.has("grid")&&!Co(s)){let x=Yt(p);x?(s.add(x),o.intentHits+=1,L(o,"intent.layout.responsive-grid-to-auto"),P(o,`Applied grid safety fallback ${x} to avoid bare grid output.`)):Number.isFinite(p.base)&&p.base>1?(s.add(`grid-cols-${p.base}`),o.intentHits+=1,L(o,"intent.layout.grid-safety-fallback"),P(o,`Applied grid safety fallback grid-cols-${p.base} to preserve explicit grid intent.`)):(s.add("mobile-stack"),o.intentHits+=1,L(o,"intent.layout.grid-safety-fallback.mobile-stack"),P(o,"Applied mobile-stack safety fallback to avoid bare grid output when explicit grid intent was present."))}let S=a.some(x=>/^(?:bg-white|shadow|shadow-md|shadow-lg)$/.test(x)),T=a.some(x=>/^rounded/.test(x));if(["div","section","article","li","aside"].includes(t)&&S&&T&&(s.add("card"),!s.has("surface-elevated")&&a.some(x=>/^shadow/.test(x))&&s.add("surface-elevated"),!s.has("surface-base")&&a.includes("bg-white")&&s.add("surface-base"),o.intentHits+=1,L(o,"intent.component.card")),t==="button"||t==="a"){let x=a.some(z=>/^bg-(?:[a-z]+-)?[4567]00$/.test(z))&&a.includes("text-white"),w=a.some(z=>/^border/.test(z))&&!x,C=a.includes("p-2")&&a.includes("rounded-full");x?(s.delete("surface-base"),s.delete("surface-elevated"),s.add("btn-primary"),o.intentHits+=1,L(o,"intent.component.button.primary")):w&&(s.add("btn-outline"),o.intentHits+=1,L(o,"intent.component.button.outline")),C&&(s.add("icon-only"),L(o,"intent.component.button.icon-only"))}if(i.shouldNormalize){for(let w of Array.from(s))String(w).startsWith("import-")&&s.delete(w);["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","grow","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","surface-base","surface-elevated","surface-subtle","card"].forEach(w=>s.delete(w)),i.variant==="primary"?(s.add("btn-primary"),L(o,"intent.component.button.primary")):i.variant==="outline"&&(s.add("btn-outline"),L(o,"intent.component.button.outline")),i.size==="sm"?(s.add("btn-sm"),L(o,"intent.component.button.size-sm")):i.size==="lg"&&(s.add("btn-lg"),L(o,"intent.component.button.size-lg")),i.iconOnly&&(s.add("icon-only"),L(o,"intent.component.button.icon-only")),o.intentHits+=1,L(o,"intent.component.button.normalize")}if(l.shouldNormalize){for(let w of Array.from(s))String(w).startsWith("import-")&&s.delete(w);["flex","inline-flex","items-start","items-center","items-end","justify-start","justify-center","justify-end","justify-between","grow","shrink","self-start","self-center","self-end","cursor-pointer","truncate","overflow-hidden","whitespace-nowrap","text-muted","surface-base","surface-elevated","surface-subtle","card"].forEach(w=>s.delete(w)),s.add("badge"),l.variantClass&&s.add(l.variantClass),l.outline&&s.add("badge-outline"),l.sizeClass&&s.add(l.sizeClass),o.intentHits+=1,L(o,"intent.component.badge.normalize"),P(o,"Normalized badge/pill utility cluster to PDS badge classes.")}if(c.shouldNormalize){for(let w of Array.from(s))String(w).startsWith("import-")&&s.delete(w);["surface-base","surface-subtle","surface-elevated","surface-sunken","surface-overlay","surface-inverse","surface-primary","surface-secondary","surface-success","surface-warning","surface-danger","surface-info","card-basic","card-elevated","card-outlined","card-interactive"].forEach(w=>s.delete(w)),s.add("card"),c.cardVariantClass&&s.add(c.cardVariantClass),c.surfaceClass&&s.add(c.surfaceClass),o.intentHits+=1,L(o,"intent.component.card.normalize"),P(o,"Normalized card utility cluster to PDS card/surface classes.")}if(t==="a"&&!i.shouldNormalize&&a.some(w=>w.includes("hover:text")||w==="transition-colors")){let w=de(o,"link-reset","text-decoration:none");w&&s.add(w),o.intentHits+=1,L(o,"intent.typography.link-treatment")}if(t==="footer"&&(s.has("surface-base")||a.some(w=>/^bg-/.test(w)))&&(s.delete("surface-base"),s.delete("surface-subtle"),s.add("surface-inverse"),o.intentHits+=1,L(o,"intent.surface.footer-inverse")),n?.listReset&&["ul","ol","menu"].includes(t)){let x=de(o,"list-reset","list-style:none;margin:0;padding:0");x&&(s.add(x),o.intentHits+=1,L(o,"intent.preflight.list-reset"))}if(n?.anchorReset&&t==="a"&&!i.shouldNormalize){let x=de(o,"anchor-reset","color:inherit;text-decoration:inherit");x&&(s.add(x),o.intentHits+=1,L(o,"intent.preflight.anchor-reset"))}let R=new Set(["div","section","article","aside","nav","main","header","footer","form","fieldset","ul","ol","li"]);return s.size===0&&R.has(t)&&(s.add("stack-sm"),P(o,`Added stack-sm fallback for <${t}> with unmapped classes.`)),Array.from(s).join(" ")}function Po(t="",e={}){let r=String(t||""),o=So(e.config||{}),n=fo(e.config||{}),a=yo(),i=wo(r,a),c=co(i.html,a).replace(/<([a-zA-Z][\w:-]*)([^>]*?)\sclass\s*=\s*(["'])(.*?)\3([^>]*)>/gs,(T,M,$,R,x,w)=>{let C=jo({tagName:String(M||"").toLowerCase(),originalClassValue:x,policy:o,summary:a,preflightHints:i.hints}),z=String(C||"").trim();return z?`<${M}${$} class=${R}${z}${R}${w}>`:`<${M}${$}${w}>`}),d=ho(a,n),s=bo(c,d);d&&P(a,`Generated ${a.importedStyleCount} import-* fallback style mappings.`),(a.removedAtomicSpacingCount>0||a.removedAtomicPositioningCount>0)&&P(a,`Removed atomic utilities by policy: spacing=${a.removedAtomicSpacingCount}, positioning=${a.removedAtomicPositioningCount}.`);let p=Mo(a,16),u=a.mapped+a.ignored+a.policySkipped,f=a.totalTailwind>0?u/a.totalTailwind:1,h=a.totalTailwind>0?a.unknown/a.totalTailwind:0,y=.42+f*.45+Math.min(a.intentHits,4)*.025-h*.18,g=Math.max(.15,Math.min(.96,Number(y.toFixed(2)))),b=[`pds-import: rulebook=${Dt} confidence=${Math.round(g*100)}%`,`pds-import: tailwind=${a.totalTailwind} mapped=${a.mapped} ignored=${a.ignored} policySkipped=${a.policySkipped} unknown=${a.unknown}`];p.length&&b.push(`pds-import: unknown-tailwind=${p.join(", ")}`),a.notes.length&&b.push(`pds-import: notes=${a.notes.join(" | ")}`);let v=`<!-- ${b.join(` -->
<!-- `)} -->
${s}`,S=[];return a.unknown>0&&S.push({severity:"warning",message:`Converted with ${a.unknown} unknown Tailwind utilities requiring manual review.`}),a.policySkipped>0&&S.push({severity:"info",message:`Skipped ${a.policySkipped} utility mappings due to PDS config policy.`}),p.length&&S.push({severity:"info",message:`Top unknown utilities: ${p.slice(0,8).join(", ")}`}),{html:v,confidence:g,issues:S,meta:{rulebookVersion:Dt,coverage:{tailwind:a.totalTailwind,mapped:a.mapped,ignored:a.ignored,policySkipped:a.policySkipped,unknown:a.unknown,importedStyles:a.importedStyleCount,nestedLabelPairs:a.labelNestingCount},unknownTailwindTokens:p,notes:a.notes,appliedRules:Array.from(a.appliedRules),policy:o,importStyleSheetInjected:!!d,breakpoints:n}}}function No(){return{rulesJsonPath:to,...D,directMappings:D.directMappings.map(t=>({id:t.id,tw:t.tw,pds:t.pds,gate:t.gate||null})),ignoredPatterns:D.ignoredPatterns.map(t=>({id:t.id,pattern:String(t.pattern),reason:t.reason}))}}function Io(t){let e=String(t||"").match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);return e?e[0]:null}function Ke(t={}){let e=String(t.html||"").trim();if(!e)return _({source:"tailwind",type:"tailwind-html",confidence:0,issues:[{severity:"error",message:"No HTML provided."}]});let r=Po(e,{config:t.config||{}});return _({source:"tailwind",type:"tailwind-html",confidence:r.confidence,issues:r.issues,template:{id:"tailwind-import",name:"Converted Tailwind Markup",html:r.html},meta:r.meta})}function Xe(t={}){let e=String(t.text||"").trim();if(!e)return _({source:"brand",type:"brand-guidelines",confidence:0,issues:[{severity:"error",message:"No brand guideline text provided."}]});let r=Io(e),o={colors:{},typography:{}},n=[];return r?o.colors.primary=r:n.push({severity:"warning",message:"No HEX color found; primary color was not inferred."}),/serif/i.test(e)&&(o.typography.fontFamilyBody="Georgia, serif"),/sans[-\s]?serif/i.test(e)&&(o.typography.fontFamilyBody="Inter, Arial, sans-serif"),/mono|monospace/i.test(e)&&(o.typography.fontFamilyMono="JetBrains Mono, monospace"),_({source:"brand",type:"brand-guidelines",confidence:r?.68:.52,issues:n,designPatch:o,meta:{inferred:{primaryColor:r}}})}function Bo(){return[{id:"template",name:"Templates"},{id:"tailwind-html",name:"Tailwind HTML"},{id:"brand-guidelines",name:"Brand Guidelines"},{id:"figma-json",name:"Figma Tokens JSON (planned)"},{id:"ux-pilot",name:"UX Pilot (planned)"},{id:"google-stitch",name:"Google Stitch (planned)"}]}async function Oo(t={}){let e=String(t.sourceType||"");return e==="template"?Wt(t.templateId,t):e==="tailwind-html"?Ke({html:t.input,config:t.config}):e==="brand-guidelines"?Xe({text:t.input}):e==="figma-json"||e==="ux-pilot"||e==="google-stitch"?_({source:e,type:e,confidence:0,issues:[{severity:"info",message:`${e} adapter is not implemented yet in this phase.`}]}):_({source:e||"unknown",type:"unknown",confidence:0,issues:[{severity:"error",message:"Unsupported import source type."}]})}var Wo="pds-live-import-history";var G="imports",ze=null;function _o(){return typeof globalThis<"u"&&typeof globalThis.indexedDB<"u"}function H(t){return typeof t=="string"?t:""}function Ce(t){return Array.isArray(t)?t:[]}function Me(t){return t&&typeof t=="object"?t:{}}function Te(){return _o()?ze||(ze=new Promise((t,e)=>{let r=globalThis.indexedDB.open(Wo,1);r.onupgradeneeded=()=>{let o=r.result;if(!o.objectStoreNames.contains(G)){let n=o.createObjectStore(G,{keyPath:"id",autoIncrement:!0});n.createIndex("createdAt","createdAt",{unique:!1}),n.createIndex("sourceType","sourceType",{unique:!1}),n.createIndex("fileName","fileName",{unique:!1})}},r.onsuccess=()=>t(r.result),r.onerror=()=>e(r.error||new Error("Failed to open import history database."))}),ze):Promise.resolve(null)}function Ee(t){return new Promise((e,r)=>{t.onsuccess=()=>e(t.result),t.onerror=()=>r(t.error||new Error("IndexedDB operation failed."))})}function Do(t={}){let e=Date.now(),r=Number.isFinite(Number(t.createdAt))?Number(t.createdAt):e,o=new Date(r).toISOString(),n=Ce(t.issues).map(c=>({severity:H(c?.severity||"info"),message:H(c?.message||"")})),a=Ce(t.notes).filter(c=>typeof c=="string"),i=Ce(t.unknownTailwindTokens).filter(c=>typeof c=="string"),l=Ce(t.appliedRules).filter(c=>typeof c=="string");return{createdAt:r,createdAtIso:o,sourceType:H(t.sourceType||"unknown"),source:H(t.source||"unknown"),type:H(t.type||"unknown"),fileName:H(t.fileName||""),fileSize:Number.isFinite(Number(t.fileSize))?Number(t.fileSize):0,mimeType:H(t.mimeType||""),fileContents:H(t.fileContents||""),convertedHtml:H(t.convertedHtml||""),confidence:Number.isFinite(Number(t.confidence))?Number(t.confidence):0,notes:a,issues:n,coverage:Me(t.coverage),unknownTailwindTokens:i,appliedRules:l,importStyleSheetInjected:!!t.importStyleSheetInjected,templateName:H(t.templateName||""),designPatch:Me(t.designPatch),meta:Me(t.meta),resultSnapshot:Me(t.resultSnapshot)}}async function Uo(t={}){let e=await Te();if(!e)return null;let r=Do(t),n=e.transaction(G,"readwrite").objectStore(G);return{id:await Ee(n.add(r)),...r}}async function Ho(t={}){let e=await Te();if(!e)return[];let r=Number.isFinite(Number(t.limit))?Math.max(1,Number(t.limit)):30,n=e.transaction(G,"readonly").objectStore(G);return(await Ee(n.getAll())||[]).sort((i,l)=>Number(l?.createdAt||0)-Number(i?.createdAt||0)).slice(0,r)}async function Go(t){let e=await Te();if(!e)return null;let r=Number(t);if(!Number.isFinite(r))return null;let n=e.transaction(G,"readonly").objectStore(G);return await Ee(n.get(r))||null}async function qo(){let t=await Te();if(!t)return;let r=t.transaction(G,"readwrite").objectStore(G);await Ee(r.clear())}export{qo as clearLiveImportHistory,Xe as convertBrandGuidelinesToPatch,Ke as convertTailwindHtmlToPds,_ as createImportResult,No as describeTailwindConversionRules,Go as getLiveImportHistoryEntry,Bo as getLiveImportSources,Gr as isImportResult,Ho as listLiveImportHistory,Ot as listLiveTemplates,kt as loadGoogleFont,we as loadLiveTemplateCatalog,Oo as runLiveImport,Uo as saveLiveImportHistory,Dr as startLive};
