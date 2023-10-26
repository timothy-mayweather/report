import{q as v,W as g,j as a,a as e,d as x}from"./app-74c4a37c.js";import{T as i,I as o}from"./TextInput-892760c7.js";import{I as s}from"./InputLabel-1ca14a08.js";import{P as y}from"./PrimaryButton-612045f9.js";import{$ as N}from"./transition-80f8baf5.js";function S({mustVerifyEmail:d,status:c,className:u=""}){const r=v().props.auth.user,{data:l,setData:n,patch:f,errors:m,processing:p,recentlySuccessful:h}=g({name:r.name,email:r.email});return a("section",{className:u,children:[a("header",{children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Profile Information"}),e("p",{className:"mt-1 text-sm text-gray-600",children:"Update your account's profile information and email address."})]}),a("form",{onSubmit:t=>{t.preventDefault(),f(route("profile.update"))},className:"mt-6 space-y-6",children:[a("div",{children:[e(s,{htmlFor:"roles",value:"Roles"}),e(i,{id:"roles",className:"mt-1 block w-full",value:r.employmentRoles.map(t=>t.name).toString().replaceAll(",",", "),disabled:!0})]}),a("div",{children:[e(s,{htmlFor:"name",value:"Name"}),e(i,{id:"name",className:"mt-1 block w-full",value:l.name,onChange:t=>n("name",t.target.value),required:!0,isFocused:!0,autoComplete:"name"}),e(o,{className:"mt-2",message:m.name})]}),a("div",{children:[e(s,{htmlFor:"email",value:"Email"}),e(i,{id:"email",type:"email",className:"mt-1 block w-full",value:l.email,onChange:t=>n("email",t.target.value),required:!0,autoComplete:"username"}),e(o,{className:"mt-2",message:m.email})]}),d&&r.email_verified_at===null&&a("div",{children:[a("p",{className:"text-sm mt-2 text-gray-800",children:["Your email address is unverified.",e(x,{href:route("verification.send"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Click here to re-send the verification email."})]}),c==="verification-link-sent"&&e("div",{className:"mt-2 font-medium text-sm text-green-600",children:"A new verification link has been sent to your email address."})]}),a("div",{className:"flex items-center gap-4",children:[e(y,{disabled:p,children:"Save"}),e(N,{show:h,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{S as default};