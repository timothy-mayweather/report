import{r as m,W as g,j as e,a as s}from"./app-5960b47b.js";import{T as d,I as c}from"./TextInput-172af7bb.js";import{I as p}from"./InputLabel-f74add0b.js";import{P as _}from"./PrimaryButton-d8099d5e.js";import{$ as y}from"./transition-feff8603.js";function S({className:w=""}){const l=m.useRef(),u=m.useRef(),{data:a,setData:o,errors:t,put:f,reset:n,processing:h,recentlySuccessful:v}=g({current_password:"",password:"",password_confirmation:""});return e("section",{className:w,children:[e("header",{children:[s("h2",{className:"text-lg font-medium text-gray-900",children:"Update Password"}),s("p",{className:"mt-1 text-sm text-gray-600",children:"Ensure your account is using a long, random password to stay secure."})]}),e("form",{onSubmit:r=>{r.preventDefault(),f(route("password.update"),{preserveScroll:!0,onSuccess:()=>n(),onError:i=>{i.password&&(n("password","password_confirmation"),l.current.focus()),i.current_password&&(n("current_password"),u.current.focus())}})},className:"mt-6 space-y-6",children:[e("div",{children:[s(p,{htmlFor:"current_password",value:"Current Password"}),s(d,{id:"current_password",ref:u,value:a.current_password,onChange:r=>o("current_password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"current-password"}),s(c,{message:t.current_password,className:"mt-2"})]}),e("div",{children:[s(p,{htmlFor:"password",value:"New Password"}),s(d,{id:"password",ref:l,value:a.password,onChange:r=>o("password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s(c,{message:t.password,className:"mt-2"})]}),e("div",{children:[s(p,{htmlFor:"password_confirmation",value:"Confirm Password"}),s(d,{id:"password_confirmation",value:a.password_confirmation,onChange:r=>o("password_confirmation",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s(c,{message:t.password_confirmation,className:"mt-2"})]}),e("div",{className:"flex items-center gap-4",children:[s(_,{disabled:h,children:"Save"}),s(y,{show:v,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:s("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{S as default};
