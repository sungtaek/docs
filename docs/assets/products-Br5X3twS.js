import{r as u,j as n,B as R,W as Je,v as ke,I as T,a9 as Qe,e as I,F as eo,i as Ie,P as oo,M as no,m as me,n as to,ay as so,az as ce,R as J,s as $,am as Pe,_ as m,g as Q,a as ee,p as D,U as ao,b as ue,c as X,aA as ro,f as B,h as oe,av as io,J as de,K as Me,a5 as lo,aB as co,V as $e,aC as uo,ak as po,al as ho,aD as xo,l as ve,D as fo,S as mo,y as vo,aE as go,H as bo}from"./index-C5rqW695.js";import{C as yo}from"./config-global-CE93-cEV.js";import{c as ge,G as be}from"./format-number-DQKMKR2-.js";import{S as z,a as ye,F as re}from"./FormControlLabel-BUpYzjpd.js";import{C as jo}from"./Card-BNbgIvIO.js";import{S as Co,C as Ro}from"./Checkbox-4h8UzWze.js";import{P as Fo}from"./Pagination-BT9Jy4V6.js";import"./LastPage-CZ2XS6qa.js";const wo={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},So=u.forwardRef(({colors:e,selected:o,onSelectColor:t,limit:s="auto",sx:r,slotProps:c,...d},f)=>{const p=typeof o=="string",h=u.useCallback(a=>{if(p)a!==o&&t(a);else{const l=o.includes(a)?o.filter(x=>x!==a):[...o,a];t(l)}},[t,o,p]);return n.jsx(R,{ref:f,component:"ul",sx:{flexWrap:"wrap",flexDirection:"row",display:"inline-flex",...s!=="auto"&&{width:s*36,justifyContent:"flex-end"},...r},...d,children:e.map(a=>{const l=p?o===a:o.includes(a);return n.jsx(R,{component:"li",sx:{display:"inline-flex"},children:n.jsx(Je,{"aria-label":a,onClick:()=>h(a),sx:{width:36,height:36,borderRadius:"50%",...c==null?void 0:c.button},children:n.jsx(z,{alignItems:"center",justifyContent:"center",sx:x=>({width:20,height:20,bgcolor:a,borderRadius:"50%",border:`solid 1px ${ke(x.vars.palette.grey["500Channel"],.16)}`,...l&&{transform:"scale(1.3)",boxShadow:`4px 4px 8px 0 ${ye(a,.48)}`,outline:`solid 2px ${ye(a,.08)}`,transition:x.transitions.create("all",{duration:x.transitions.duration.shortest})}}),children:n.jsx(T,{width:l?12:0,icon:"eva:checkmark-fill",sx:x=>({color:x.palette.getContrastText(a),transition:x.transitions.create("all",{duration:x.transitions.duration.shortest})})})})})},a)})})}),ko=u.forwardRef(({colors:e,limit:o=3,sx:t,...s},r)=>{const c=e.slice(0,o),d=e.length-o;return n.jsxs(R,{ref:r,sx:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-end",...t},...s,children:[c.map((f,p)=>n.jsx(R,{sx:{ml:-.75,width:16,height:16,bgcolor:f,borderRadius:"50%",border:h=>`solid 2px ${h.vars.palette.background.paper}`,boxShadow:h=>`inset -1px 1px 2px ${ke(h.vars.palette.common.blackChannel,.24)}`}},f+p)),e.length>o&&n.jsx(R,{component:"span",sx:{typography:"subtitle2"},children:`+${d}`})]})});function Io({product:e}){const o=n.jsx(Qe,{variant:"inverted",color:e.status==="sale"&&"error"||"info",sx:{zIndex:9,top:16,right:16,position:"absolute",textTransform:"uppercase"},children:e.status}),t=n.jsx(R,{component:"img",alt:e.name,src:e.coverUrl,sx:{top:0,width:1,height:1,objectFit:"cover",position:"absolute"}}),s=n.jsxs(I,{variant:"subtitle1",children:[n.jsx(I,{component:"span",variant:"body1",sx:{color:"text.disabled",textDecoration:"line-through"},children:e.priceSale&&ge(e.priceSale)})," ",ge(e.price)]});return n.jsxs(jo,{children:[n.jsxs(R,{sx:{pt:"100%",position:"relative"},children:[e.status&&o,t]}),n.jsxs(z,{spacing:2,sx:{p:3},children:[n.jsx(eo,{color:"inherit",underline:"hover",variant:"subtitle2",noWrap:!0,children:e.name}),n.jsxs(R,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[n.jsx(ko,{colors:e.colors}),s]})]})]})}function Po({options:e,sortBy:o,onSort:t,sx:s,...r}){var h;const[c,d]=u.useState(null),f=u.useCallback(a=>{d(a.currentTarget)},[]),p=u.useCallback(()=>{d(null)},[]);return n.jsxs(n.Fragment,{children:[n.jsxs(Ie,{disableRipple:!0,color:"inherit",onClick:f,endIcon:n.jsx(T,{icon:c?"eva:chevron-up-fill":"eva:chevron-down-fill"}),sx:s,...r,children:["Sort By: ",n.jsx(I,{component:"span",variant:"subtitle2",sx:{color:"text.secondary"},children:(h=e.find(a=>a.value===o))==null?void 0:h.label})]}),n.jsx(oo,{open:!!c,anchorEl:c,onClose:p,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:n.jsx(no,{disablePadding:!0,sx:{p:.5,gap:.5,width:160,display:"flex",flexDirection:"column",[`& .${me.root}`]:{px:1,gap:2,borderRadius:.75,[`&.${me.selected}`]:{bgcolor:"action.selected"}}},children:e.map(a=>n.jsx(to,{selected:a.value===o,onClick:()=>{t(a.value),p()},children:a.label},a.value))})})]})}function Mo({totalItems:e,sx:o,...t}){return n.jsx(R,{component:so,href:"#",sx:{right:0,top:112,zIndex:999,display:"flex",cursor:"pointer",position:"fixed",color:"text.primary",borderTopLeftRadius:16,borderBottomLeftRadius:16,bgcolor:"background.paper",padding:s=>s.spacing(1,3,1,2),boxShadow:s=>s.customShadows.dropdown,transition:s=>s.transitions.create(["opacity"]),"&:hover":{opacity:.72},...o},...t,children:n.jsx(ce,{showZero:!0,badgeContent:e,color:"error",max:99,children:n.jsx(T,{icon:"solar:cart-3-bold",width:24})})})}const $o=J(n.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),Vo=J(n.jsx("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),zo=$("span",{shouldForwardProp:Pe})({position:"relative",display:"flex"}),Oo=$($o)({transform:"scale(1)"}),Ao=$(Vo)(({theme:e,ownerState:o})=>m({left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},o.checked&&{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}));function Ve(e){const{checked:o=!1,classes:t={},fontSize:s}=e,r=m({},e,{checked:o});return n.jsxs(zo,{className:t.root,ownerState:r,children:[n.jsx(Oo,{fontSize:s,className:t.background,ownerState:r}),n.jsx(Ao,{fontSize:s,className:t.dot,ownerState:r})]})}const ze=u.createContext(void 0);function Bo(){return u.useContext(ze)}function No(e){return ee("MuiRadio",e)}const je=Q("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary","sizeSmall"]),Lo=["checked","checkedIcon","color","icon","name","onChange","size","className"],Eo=e=>{const{classes:o,color:t,size:s}=e,r={root:["root",`color${D(t)}`,s!=="medium"&&`size${D(s)}`]};return m({},o,oe(r,No,o))},Ho=$(Co,{shouldForwardProp:e=>Pe(e)||e==="classes",name:"MuiRadio",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.size!=="medium"&&o[`size${D(t.size)}`],o[`color${D(t.color)}`]]}})(({theme:e,ownerState:o})=>m({color:(e.vars||e).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${o.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette[o.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:ao(o.color==="default"?e.palette.action.active:e.palette[o.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${je.checked}`]:{color:(e.vars||e).palette[o.color].main}},{[`&.${je.disabled}`]:{color:(e.vars||e).palette.action.disabled}}));function Go(e,o){return typeof o=="object"&&o!==null?e===o:String(e)===String(o)}const Ce=n.jsx(Ve,{checked:!0}),Re=n.jsx(Ve,{}),Fe=u.forwardRef(function(o,t){var s,r;const c=ue({props:o,name:"MuiRadio"}),{checked:d,checkedIcon:f=Ce,color:p="primary",icon:h=Re,name:a,onChange:l,size:x="medium",className:i}=c,F=X(c,Lo),j=m({},c,{color:p,size:x}),w=Eo(j),S=Bo();let g=d;const y=ro(l,S&&S.onChange);let C=a;return S&&(typeof g>"u"&&(g=Go(S.value,c.value)),typeof C>"u"&&(C=S.name)),n.jsx(Ho,m({type:"radio",icon:u.cloneElement(h,{fontSize:(s=Re.props.fontSize)!=null?s:x}),checkedIcon:u.cloneElement(f,{fontSize:(r=Ce.props.fontSize)!=null?r:x}),ownerState:j,classes:w,name:C,checked:g,onChange:y,ref:t,className:B(w.root,i)},F))}),To=J(n.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star"),Do=J(n.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),"StarBorder");function _o(e){return ee("MuiRating",e)}const q=Q("MuiRating",["root","sizeSmall","sizeMedium","sizeLarge","readOnly","disabled","focusVisible","visuallyHidden","pristine","label","labelEmptyValueActive","icon","iconEmpty","iconFilled","iconHover","iconFocus","iconActive","decimal"]),Uo=["value"],Wo=["className","defaultValue","disabled","emptyIcon","emptyLabelText","getLabelText","highlightSelectedOnly","icon","IconContainerComponent","max","name","onChange","onChangeActive","onMouseLeave","onMouseMove","precision","readOnly","size","value"];function qo(e){const o=e.toString().split(".")[1];return o?o.length:0}function ie(e,o){if(e==null)return e;const t=Math.round(e/o)*o;return Number(t.toFixed(qo(o)))}const Xo=e=>{const{classes:o,size:t,readOnly:s,disabled:r,emptyValueFocused:c,focusVisible:d}=e,f={root:["root",`size${D(t)}`,r&&"disabled",d&&"focusVisible",s&&"readOnly"],label:["label","pristine"],labelEmptyValue:[c&&"labelEmptyValueActive"],icon:["icon"],iconEmpty:["iconEmpty"],iconFilled:["iconFilled"],iconHover:["iconHover"],iconFocus:["iconFocus"],iconActive:["iconActive"],decimal:["decimal"],visuallyHidden:["visuallyHidden"]};return oe(f,_o,o)},Ko=$("span",{name:"MuiRating",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[{[`& .${q.visuallyHidden}`]:o.visuallyHidden},o.root,o[`size${D(t.size)}`],t.readOnly&&o.readOnly]}})(({theme:e,ownerState:o})=>m({display:"inline-flex",position:"relative",fontSize:e.typography.pxToRem(24),color:"#faaf00",cursor:"pointer",textAlign:"left",width:"min-content",WebkitTapHighlightColor:"transparent",[`&.${q.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${q.focusVisible} .${q.iconActive}`]:{outline:"1px solid #999"},[`& .${q.visuallyHidden}`]:wo},o.size==="small"&&{fontSize:e.typography.pxToRem(18)},o.size==="large"&&{fontSize:e.typography.pxToRem(30)},o.readOnly&&{pointerEvents:"none"})),Oe=$("label",{name:"MuiRating",slot:"Label",overridesResolver:({ownerState:e},o)=>[o.label,e.emptyValueFocused&&o.labelEmptyValueActive]})(({ownerState:e})=>m({cursor:"inherit"},e.emptyValueFocused&&{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"})),Yo=$("span",{name:"MuiRating",slot:"Icon",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.icon,t.iconEmpty&&o.iconEmpty,t.iconFilled&&o.iconFilled,t.iconHover&&o.iconHover,t.iconFocus&&o.iconFocus,t.iconActive&&o.iconActive]}})(({theme:e,ownerState:o})=>m({display:"flex",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),pointerEvents:"none"},o.iconActive&&{transform:"scale(1.2)"},o.iconEmpty&&{color:(e.vars||e).palette.action.disabled})),Zo=$("span",{name:"MuiRating",slot:"Decimal",shouldForwardProp:e=>io(e)&&e!=="iconActive",overridesResolver:(e,o)=>{const{iconActive:t}=e;return[o.decimal,t&&o.iconActive]}})(({iconActive:e})=>m({position:"relative"},e&&{transform:"scale(1.2)"}));function Jo(e){const o=X(e,Uo);return n.jsx("span",m({},o))}function we(e){const{classes:o,disabled:t,emptyIcon:s,focus:r,getLabelText:c,highlightSelectedOnly:d,hover:f,icon:p,IconContainerComponent:h,isActive:a,itemValue:l,labelProps:x,name:i,onBlur:F,onChange:j,onClick:w,onFocus:S,readOnly:g,ownerState:y,ratingValue:C,ratingValueRounded:ne}=e,N=d?l===C:l<=C,K=l<=f,L=l<=r,te=l===ne,_=de(),O=n.jsx(Yo,{as:h,value:l,className:B(o.icon,N?o.iconFilled:o.iconEmpty,K&&o.iconHover,L&&o.iconFocus,a&&o.iconActive),ownerState:m({},y,{iconEmpty:!N,iconFilled:N,iconHover:K,iconFocus:L,iconActive:a}),children:s&&!N?s:p});return g?n.jsx("span",m({},x,{children:O})):n.jsxs(u.Fragment,{children:[n.jsxs(Oe,m({ownerState:m({},y,{emptyValueFocused:void 0}),htmlFor:_},x,{children:[O,n.jsx("span",{className:o.visuallyHidden,children:c(l)})]})),n.jsx("input",{className:o.visuallyHidden,onFocus:S,onBlur:F,onChange:j,onClick:w,disabled:t,value:l,id:_,type:"radio",name:i,checked:te})]})}const Qo=n.jsx(To,{fontSize:"inherit"}),en=n.jsx(Do,{fontSize:"inherit"});function on(e){return`${e} Star${e!==1?"s":""}`}const nn=u.forwardRef(function(o,t){const s=ue({name:"MuiRating",props:o}),{className:r,defaultValue:c=null,disabled:d=!1,emptyIcon:f=en,emptyLabelText:p="Empty",getLabelText:h=on,highlightSelectedOnly:a=!1,icon:l=Qo,IconContainerComponent:x=Jo,max:i=5,name:F,onChange:j,onChangeActive:w,onMouseLeave:S,onMouseMove:g,precision:y=1,readOnly:C=!1,size:ne="medium",value:N}=s,K=X(s,Wo),L=de(F),[te,_]=Me({controlled:N,default:c,name:"Rating"}),O=ie(te,y),He=lo(),[{hover:P,focus:Y},U]=u.useState({hover:-1,focus:-1});let E=O;P!==-1&&(E=P),Y!==-1&&(E=Y);const{isFocusVisibleRef:pe,onBlur:Ge,onFocus:Te,ref:De}=co(),[_e,se]=u.useState(!1),he=u.useRef(),Ue=$e(De,he,t),We=v=>{g&&g(v);const b=he.current,{right:k,left:Z,width:H}=b.getBoundingClientRect();let G;He?G=(k-v.clientX)/H:G=(v.clientX-Z)/H;let M=ie(i*G+y/2,y);M=uo(M,y,i),U(A=>A.hover===M&&A.focus===M?A:{hover:M,focus:M}),se(!1),w&&P!==M&&w(v,M)},qe=v=>{S&&S(v);const b=-1;U({hover:b,focus:b}),w&&P!==b&&w(v,b)},xe=v=>{let b=v.target.value===""?null:parseFloat(v.target.value);P!==-1&&(b=P),_(b),j&&j(v,b)},Xe=v=>{v.clientX===0&&v.clientY===0||(U({hover:-1,focus:-1}),_(null),j&&parseFloat(v.target.value)===O&&j(v,null))},Ke=v=>{Te(v),pe.current===!0&&se(!0);const b=parseFloat(v.target.value);U(k=>({hover:k.hover,focus:b}))},Ye=v=>{if(P!==-1)return;Ge(v),pe.current===!1&&se(!1);const b=-1;U(k=>({hover:k.hover,focus:b}))},[Ze,fe]=u.useState(!1),W=m({},s,{defaultValue:c,disabled:d,emptyIcon:f,emptyLabelText:p,emptyValueFocused:Ze,focusVisible:_e,getLabelText:h,icon:l,IconContainerComponent:x,max:i,precision:y,readOnly:C,size:ne}),V=Xo(W);return n.jsxs(Ko,m({ref:Ue,onMouseMove:We,onMouseLeave:qe,className:B(V.root,r,C&&"MuiRating-readOnly"),ownerState:W,role:C?"img":null,"aria-label":C?h(E):null},K,{children:[Array.from(new Array(i)).map((v,b)=>{const k=b+1,Z={classes:V,disabled:d,emptyIcon:f,focus:Y,getLabelText:h,highlightSelectedOnly:a,hover:P,icon:l,IconContainerComponent:x,name:L,onBlur:Ye,onChange:xe,onClick:Xe,onFocus:Ke,ratingValue:E,ratingValueRounded:O,readOnly:C,ownerState:W},H=k===Math.ceil(E)&&(P!==-1||Y!==-1);if(y<1){const G=Array.from(new Array(1/y));return n.jsx(Zo,{className:B(V.decimal,H&&V.iconActive),ownerState:W,iconActive:H,children:G.map((M,A)=>{const ae=ie(k-1+(A+1)*y,y);return n.jsx(we,m({},Z,{isActive:!1,itemValue:ae,labelProps:{style:G.length-1===A?{}:{width:ae===E?`${(A+1)*y*100}%`:"0%",overflow:"hidden",position:"absolute"}}}),ae)})},k)}return n.jsx(we,m({},Z,{isActive:H,itemValue:k}),k)}),!C&&!d&&n.jsxs(Oe,{className:B(V.label,V.labelEmptyValue),ownerState:W,children:[n.jsx("input",{className:V.visuallyHidden,value:"",id:`${L}-empty`,type:"radio",name:L,checked:O==null,onFocus:()=>fe(!0),onBlur:()=>fe(!1),onChange:xe}),n.jsx("span",{className:V.visuallyHidden,children:p})]})]}))});function tn(e){return ee("MuiFormGroup",e)}Q("MuiFormGroup",["root","row","error"]);const sn=["className","row"],an=e=>{const{classes:o,row:t,error:s}=e;return oe({root:["root",t&&"row",s&&"error"]},tn,o)},rn=$("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.row&&o.row]}})(({ownerState:e})=>m({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})),Ae=u.forwardRef(function(o,t){const s=ue({props:o,name:"MuiFormGroup"}),{className:r,row:c=!1}=s,d=X(s,sn),f=po(),p=ho({props:s,muiFormControl:f,states:["error"]}),h=m({},s,{row:c,error:p.error}),a=an(h);return n.jsx(rn,m({className:B(a.root,r),ownerState:h,ref:t},d))});function ln(e){return ee("MuiRadioGroup",e)}Q("MuiRadioGroup",["root","row","error"]);const cn=["actions","children","className","defaultValue","name","onChange","value"],un=e=>{const{classes:o,row:t,error:s}=e;return oe({root:["root",t&&"row",s&&"error"]},ln,o)},Se=u.forwardRef(function(o,t){const{actions:s,children:r,className:c,defaultValue:d,name:f,onChange:p,value:h}=o,a=X(o,cn),l=u.useRef(null),x=un(o),[i,F]=Me({controlled:h,default:d,name:"RadioGroup"});u.useImperativeHandle(s,()=>({focus:()=>{let g=l.current.querySelector("input:not(:disabled):checked");g||(g=l.current.querySelector("input:not(:disabled)")),g&&g.focus()}}),[]);const j=$e(t,l),w=de(f),S=u.useMemo(()=>({name:w,onChange(g){F(g.target.value),p&&p(g,g.target.value)},value:i}),[w,p,F,i]);return n.jsx(ze.Provider,{value:S,children:n.jsx(Ae,m({role:"radiogroup",ref:j,className:B(x.root,c)},a,{children:r}))})});function dn({filters:e,options:o,canReset:t,openFilter:s,onSetFilters:r,onOpenFilter:c,onCloseFilter:d,onResetFilter:f}){const p=n.jsxs(z,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Gender"}),n.jsx(Ae,{children:o.genders.map(i=>n.jsx(re,{control:n.jsx(Ro,{checked:e.gender.includes(i.value),onChange:()=>{const F=e.gender.includes(i.value)?e.gender.filter(j=>j!==i.value):[...e.gender,i.value];r({gender:F})}}),label:i.label},i.value))})]}),h=n.jsxs(z,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Category"}),n.jsx(Se,{children:o.categories.map(i=>n.jsx(re,{value:i.value,control:n.jsx(Fe,{checked:e.category.includes(i.value),onChange:()=>r({category:i.value})}),label:i.label},i.value))})]}),a=n.jsxs(z,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Colors"}),n.jsx(So,{selected:e.colors,onSelectColor:i=>r({colors:i}),colors:o.colors,limit:6})]}),l=n.jsxs(z,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Price"}),n.jsx(Se,{children:o.price.map(i=>n.jsx(re,{value:i.value,control:n.jsx(Fe,{checked:e.price.includes(i.value),onChange:()=>r({price:i.value})}),label:i.label},i.value))})]}),x=n.jsxs(z,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",sx:{mb:2},children:"Rating"}),o.ratings.map((i,F)=>n.jsxs(R,{onClick:()=>r({rating:i}),sx:{mb:1,gap:1,ml:-1,p:.5,display:"flex",borderRadius:1,cursor:"pointer",typography:"body2",alignItems:"center","&:hover":{opacity:.48},...e.rating===i&&{bgcolor:"action.selected"}},children:[n.jsx(nn,{readOnly:!0,value:4-F})," & Up"]},i))]});return n.jsxs(n.Fragment,{children:[n.jsx(Ie,{disableRipple:!0,color:"inherit",endIcon:n.jsx(ce,{color:"error",variant:"dot",invisible:!t,children:n.jsx(T,{icon:"ic:round-filter-list"})}),onClick:c,children:"Filters"}),n.jsxs(xo,{anchor:"right",open:s,onClose:d,PaperProps:{sx:{width:280,overflow:"hidden"}},children:[n.jsxs(R,{display:"flex",alignItems:"center",sx:{pl:2.5,pr:1.5,py:2},children:[n.jsx(I,{variant:"h6",flexGrow:1,children:"Filters"}),n.jsx(ve,{onClick:f,children:n.jsx(ce,{color:"error",variant:"dot",invisible:!t,children:n.jsx(T,{icon:"solar:refresh-linear"})})}),n.jsx(ve,{onClick:d,children:n.jsx(T,{icon:"mingcute:close-line"})})]}),n.jsx(fo,{}),n.jsx(mo,{children:n.jsxs(z,{spacing:3,sx:{p:3},children:[p,h,a,l,x]})})]})]})}const Be=[{value:"men",label:"Men"},{value:"women",label:"Women"},{value:"kids",label:"Kids"}],Ne=[{value:"all",label:"All"},{value:"shose",label:"Shose"},{value:"apparel",label:"Apparel"},{value:"accessories",label:"Accessories"}],Le=["up4Star","up3Star","up2Star","up1Star"],pn=[{value:"below",label:"Below $25"},{value:"between",label:"Between $25 - $75"},{value:"above",label:"Above $75"}],Ee=["#00AB55","#000000","#FFFFFF","#FFC0CB","#FF4842","#1890FF","#94D82D","#FFC107"],le={price:"",gender:[Be[0].value],colors:[Ee[4]],rating:Le[0],category:Ne[0].value};function hn(){const[e,o]=u.useState("featured"),[t,s]=u.useState(!1),[r,c]=u.useState(le),d=u.useCallback(()=>{s(!0)},[]),f=u.useCallback(()=>{s(!1)},[]),p=u.useCallback(l=>{o(l)},[]),h=u.useCallback(l=>{c(x=>({...x,...l}))},[]),a=Object.keys(r).some(l=>r[l]!==le[l]);return n.jsxs(vo,{children:[n.jsx(I,{variant:"h4",sx:{mb:5},children:"Products"}),n.jsx(Mo,{totalItems:8}),n.jsx(R,{display:"flex",alignItems:"center",flexWrap:"wrap-reverse",justifyContent:"flex-end",sx:{mb:5},children:n.jsxs(R,{gap:1,display:"flex",flexShrink:0,sx:{my:1},children:[n.jsx(dn,{canReset:a,filters:r,onSetFilters:h,openFilter:t,onOpenFilter:d,onCloseFilter:f,onResetFilter:()=>c(le),options:{genders:Be,categories:Ne,ratings:Le,price:pn,colors:Ee}}),n.jsx(Po,{sortBy:e,onSort:p,options:[{value:"featured",label:"Featured"},{value:"newest",label:"Newest"},{value:"priceDesc",label:"Price: High-Low"},{value:"priceAsc",label:"Price: Low-High"}]})]})}),n.jsx(be,{container:!0,spacing:3,children:go.map(l=>n.jsx(be,{xs:12,sm:6,md:3,children:n.jsx(Io,{product:l})},l.id))}),n.jsx(Fo,{count:10,color:"primary",sx:{mt:8,mx:"auto"}})]})}function Cn(){return n.jsxs(n.Fragment,{children:[n.jsx(bo,{children:n.jsxs("title",{children:[" ",`Products - ${yo.appName}`]})}),n.jsx(hn,{})]})}export{Cn as default};
