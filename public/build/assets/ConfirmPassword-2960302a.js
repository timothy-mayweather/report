import{W as d,r as l,j as a,a as s,b as p}from"./app-ed6a17c1.js";import{G as c}from"./GuestLayout-3da6e1c5.js";import{T as u,I as f}from"./TextInput-00a1049c.js";import{I as w}from"./InputLabel-29ccb357.js";import{P as h}from"./PrimaryButton-c7f8bf6d.js";import"./ApplicationLogo-9d6af40b.js";function I(){const{data:e,setData:t,post:o,processing:i,errors:m,reset:n}=d({password:""});return l.useEffect(()=>()=>{n("password")},[]),a(c,{children:[s(p,{title:"Confirm Password"}),s("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),a("form",{onSubmit:r=>{r.preventDefault(),o(route("password.confirm"))},children:[a("div",{className:"mt-4",children:[s(w,{htmlFor:"password",value:"Password"}),s(u,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>t("password",r.target.value)}),s(f,{message:m.password,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(h,{className:"ml-4",disabled:i,children:"Confirm"})})]})]})}export{I as default};
