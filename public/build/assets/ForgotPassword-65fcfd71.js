import{W as n,j as t,a as e,b as d}from"./app-5960b47b.js";import{G as u}from"./GuestLayout-bb3e6958.js";import{T as c,I as p}from"./TextInput-172af7bb.js";import{P as w}from"./PrimaryButton-d8099d5e.js";import"./ApplicationLogo-1c9b6ac3.js";function N({status:s}){const{data:o,setData:r,post:m,processing:l,errors:i}=n({email:""});return t(u,{children:[e(d,{title:"Forgot Password"}),e("div",{className:"mb-4 text-sm text-gray-600",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),s&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:s}),t("form",{onSubmit:a=>{a.preventDefault(),m(route("password.email"))},children:[e(c,{id:"email",type:"email",name:"email",value:o.email,className:"mt-1 block w-full",isFocused:!0,onChange:a=>r("email",a.target.value)}),e(p,{message:i.email,className:"mt-2"}),e("div",{className:"flex items-center justify-end mt-4",children:e(w,{className:"ml-4",disabled:l,children:"Email Password Reset Link"})})]})]})}export{N as default};
