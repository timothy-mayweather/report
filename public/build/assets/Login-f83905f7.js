import{a as e,W as h,r as x,j as r,b,d as n}from"./app-e880263b.js";import{G as w}from"./GuestLayout-8d24c6fe.js";import{T as l,I as d}from"./TextInput-3206b76f.js";import{I as c}from"./InputLabel-423afe47.js";import{P as v}from"./PrimaryButton-5f6b0396.js";import"./ApplicationLogo-b81fba6a.js";function N({className:a="",...t}){return e("input",{...t,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+a})}function F({status:a,canResetPassword:t}){const{data:o,setData:m,post:u,processing:f,errors:i,reset:g}=h({email:"",password:"",remember:!1});x.useEffect(()=>()=>{g("password")},[]);const p=s=>{s.preventDefault(),u(route("login"))};return r(w,{children:[e(b,{title:"Log in"}),e("div",{className:"flex items-center justify-end mt-4",children:e(n,{href:route("register"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Register"})}),a&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:a}),r("form",{onSubmit:p,children:[r("div",{children:[e(c,{htmlFor:"email",value:"Email"}),e(l,{id:"email",type:"email",name:"email",value:o.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:s=>m("email",s.target.value)}),e(d,{message:i.email,className:"mt-2"})]}),r("div",{className:"mt-4",children:[e(c,{htmlFor:"password",value:"Password"}),e(l,{id:"password",type:"password",name:"password",value:o.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>m("password",s.target.value)}),e(d,{message:i.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:r("label",{className:"flex items-center",children:[e(N,{name:"remember",checked:o.remember,onChange:s=>m("remember",s.target.checked)}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),r("div",{className:"flex items-center justify-end mt-4",children:[t&&e(n,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e(v,{className:"ml-4",disabled:f,children:"Log in"})]})]})]})}export{F as default};