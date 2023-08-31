import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import {Head} from '@inertiajs/react'
import Editor from "@/Components/Editor/Editor.jsx";

export default function Index({auth, report}) {
    let user = {...auth.user, isAdmin:auth.user.role==="admin"};
    return (
        <Authenticated user={user}>
            <Head title="Records"/>
            <div className="p-0">
                <Editor user={user} report={report}/>
            </div>
        </Authenticated>
    );
}

