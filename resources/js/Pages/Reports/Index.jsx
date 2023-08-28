import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import {Head} from '@inertiajs/react'
import Editor from "@/Components/Editor/Editor.jsx";

export default function Index({auth, report}) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Records"/>
            <div className="p-0">
                <Editor report={report}/>
            </div>
        </Authenticated>
    );
}

//other authenticated items should look like this
// <br/>
// <div className="mx-auto p-4 sm:p-6 lg:p-8 bg-white"></div>

