import{a as u,_ as g,R as y,b as d,c as h,P as e}from"./index-BfLOjBmH.js";var b=["xxl","xl","lg","md","sm","xs"],x=u.forwardRef(function(a,l){var p=a.children,i=a.className,n=g(a,["children","className"]),o=[];return b.forEach(function(t){var s=n[t];delete n[t];var r=t==="xs"?"":"-".concat(t);(typeof s=="number"||typeof s=="string")&&o.push("col".concat(r,"-").concat(s)),typeof s=="boolean"&&o.push("col".concat(r)),s&&typeof s=="object"&&((typeof s.span=="number"||typeof s.span=="string")&&o.push("col".concat(r,"-").concat(s.span)),typeof s.span=="boolean"&&o.push("col".concat(r)),(typeof s.order=="number"||typeof s.order=="string")&&o.push("order".concat(r,"-").concat(s.order)),typeof s.offset=="number"&&o.push("offset".concat(r,"-").concat(s.offset)))}),y.createElement("div",d({className:h(o.length>0?o:"col",i)},n,{ref:l}),p)}),m=e.oneOfType([e.bool,e.number,e.string,e.oneOf(["auto"])]),c=e.oneOfType([m,e.shape({span:m,offset:e.oneOfType([e.number,e.string]),order:e.oneOfType([e.oneOf(["first","last"]),e.number,e.string])})]);x.propTypes={children:e.node,className:e.string,xs:c,sm:c,md:c,lg:c,xl:c,xxl:c};x.displayName="CCol";var N=["xxl","xl","lg","md","sm","xs"],v=u.forwardRef(function(a,l){var p=a.children,i=a.className,n=g(a,["children","className"]),o=[];return N.forEach(function(t){var s=n[t];delete n[t];var r=t==="xs"?"":"-".concat(t);typeof s=="object"&&(s.cols&&o.push("row-cols".concat(r,"-").concat(s.cols)),typeof s.gutter=="number"&&o.push("g".concat(r,"-").concat(s.gutter)),typeof s.gutterX=="number"&&o.push("gx".concat(r,"-").concat(s.gutterX)),typeof s.gutterY=="number"&&o.push("gy".concat(r,"-").concat(s.gutterY)))}),y.createElement("div",d({className:h("row",o,i)},n,{ref:l}),p)}),f=e.shape({cols:e.oneOfType([e.oneOf(["auto"]),e.number,e.string]),gutter:e.oneOfType([e.string,e.number]),gutterX:e.oneOfType([e.string,e.number]),gutterY:e.oneOfType([e.string,e.number])});v.propTypes={children:e.node,className:e.string,xs:f,sm:f,md:f,lg:f,xl:f,xxl:f};v.displayName="CRow";export{v as C,x as a};
