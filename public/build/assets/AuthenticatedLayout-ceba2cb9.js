import{r as d,a as e,j as t,F as m,d as x}from"./app-74c4a37c.js";import{$ as v}from"./transition-80f8baf5.js";const p=d.createContext(),h=({children:r})=>{const[n,o]=d.useState(!1),i=()=>{o(s=>!s)};return e(p.Provider,{value:{open:n,setOpen:o,toggleOpen:i},children:e("div",{className:"relative",children:r})})},y=({children:r})=>{const{open:n,setOpen:o,toggleOpen:i}=d.useContext(p);return t(m,{children:[e("div",{onClick:i,children:r}),n&&e("div",{className:"fixed inset-0 z-40",onClick:()=>o(!1)})]})},b=({align:r="right",width:n="48",contentClasses:o="py-1 bg-white",children:i})=>{const{open:s,setOpen:u}=d.useContext(p);let g="origin-top";r==="left"?g="origin-top-left left-0":r==="right"&&(g="origin-top-right right-0");let f="";return n==="48"&&(f="w-48"),e(m,{children:e(v,{as:d.Fragment,show:s,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${g} ${f}`,onClick:()=>u(!1),children:e("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+o,children:i})})})})},N=({className:r="",children:n,...o})=>e(x,{...o,className:"block w-full px-4 py-2 text-left text-xl leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out "+r,children:n});h.Trigger=y;h.Content=b;h.Link=N;const l=h;function c({className:r="",hrefRoute:n,children:o,...i}){let s=route().current(n);return i={...i,href:route(n)},e(x,{...i,className:"inline-flex items-center px-1 pt-1 border-b-2 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none "+(s?"border-indigo-400 text-gray-900 focus:border-indigo-700 ":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ")+r,preserveState:!0,children:o})}function a({active:r=!1,className:n="",children:o,...i}){return e(x,{...i,className:`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${r?"border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700":"border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"} text-base font-medium focus:outline-none transition duration-150 ease-in-out ${n}`,preserveState:!0,children:o})}function C({user:r,header:n,children:o}){const[i,s]=d.useState(!1);return t("div",{className:"min-h-screen bg-gray-100 text-xl",children:[t("nav",{className:"bg-white border-b border-gray-100",children:[e("div",{className:"mx-auto px-4 sm:px-6 lg:px-8",children:t("div",{className:"flex justify-between h-10",children:[t("div",{className:"flex",children:[r.isAdmin&&t(m,{children:[e("div",{className:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex",children:e(c,{hrefRoute:"users.index",children:"Users"})}),e("div",{className:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex",children:e(c,{hrefRoute:"roles.index",children:"Roles"})}),e("div",{className:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex",children:e(c,{hrefRoute:"admin.reports.index",children:"Templates & Reports"})})]}),e("div",{className:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex",children:e(c,{hrefRoute:"reports.index",children:"My Reports"})})]}),e("div",{className:"flex",children:e("div",{className:"hidden sm:flex sm:items-center",children:e("div",{className:"relative",children:t(l,{children:[e(l.Trigger,{children:e("span",{className:"inline-flex rounded-md",children:t("button",{type:"button",className:"inline-flex items-center px-3 py-2 border border-transparent leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150",children:[r.name,e("svg",{className:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})}),t(l.Content,{children:[e(l.Link,{href:route("profile.edit"),children:"Profile"}),e(l.Link,{href:route("logout"),method:"post",as:"button",children:"Log Out"})]})]})})})}),e("div",{className:"-mr-2 flex items-center sm:hidden",children:e("button",{onClick:()=>s(u=>!u),className:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out",children:t("svg",{className:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",children:[e("path",{className:i?"hidden":"inline-flex",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"}),e("path",{className:i?"inline-flex":"hidden",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})]})})})]})}),t("div",{className:(i?"block":"hidden")+" sm:hidden",children:[t("div",{className:"pt-2 pb-3 space-y-1",children:[r.isAdmin&&t(m,{children:[e(a,{href:route("users.index"),active:route().current("users.index"),children:"Users"}),e(a,{href:route("roles.index"),active:route().current("roles.index"),children:"Roles"}),e(a,{href:route("admin.reports.index"),active:route().current("admin.reports.index"),children:"Templates & Reports"})]}),e(a,{href:route("reports.index"),active:route().current("reports.index"),children:"My Reports"})]}),t("div",{className:"pt-4 pb-1 border-t border-gray-200",children:[t("div",{className:"px-4",children:[e("div",{className:"font-medium text-base text-gray-800",children:r.name}),e("div",{className:"font-medium text-sm text-gray-500",children:r.email})]}),t("div",{className:"mt-3 space-y-1",children:[e(a,{fhref:route("profile.edit"),children:"Profile"}),e(a,{method:"post",href:route("logout"),as:"button",children:"Log Out"})]})]})]})]}),n&&e("header",{className:"bg-white shadow",children:e("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8",children:n})}),e("main",{children:o})]})}export{C as A};
