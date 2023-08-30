import React, {useState} from "react";
import { router } from '@inertiajs/react'
import Dropdown from "@/Components/Dropdown.jsx";

export default function ReportModal({user}) {
    const [showModal, setShowModal] = useState(false);
    const [hideDropdown, setHideDropdown] = useState(true)
    const [modalChildren, setModalChildren] = useState(<tr></tr>);
    const tableId = "reportsTable";
    const [reportHeading, setReportHeading] = useState(user.isAdmin?"Reports":"My Reports")
    // ['id','filename','fileType','created_at','updated_at']
    function showReports(url = "/reports/create"){
        if(!user.isAdmin)
        setReportHeading(url.endsWith('create')?"My Reports":"Shared With Me")
        axios.get(url).then((response)=>{
            if(response.status === 200) {
                setModalChildren(response.data.map(
                        (file) => <tr key={file['id']}>
                            <td>{file['filename']}</td>
                            <td>{file['fileType']}</td>
                            <td>{file['created_at']}</td>
                            <td>{file['updated_at']}</td>
                            <td><u className="cursor-pointer" onClick={() => {router.get('/reports', {reportId:file['id']})}}>edit</u></td>
                        </tr>
                    )
                );
                setShowModal(true);
                $(document).ready(function () {
                    $("#" + tableId).DataTable(
                        {
                            'columnDefs': [
                                {
                                    'searchable': false,
                                    'targets': [1, 4]
                                },
                            ]
                        }
                    );
                });//show success
            }else{
                $.notify('an error occurred')
            }

        }).catch((error)=>{
            $.notify(error.message) //show error
        })
    }

    let mouseProps = user.isAdmin?{onClick:()=>showReports()}:{onMouseEnter:()=>setHideDropdown(false), onMouseLeave:()=>setHideDropdown(true)}

    return (
        <>
            <div className="relative inline-block text-left">
                <span className="inline-flex rounded-md">
                    <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button"  {...mouseProps}>

                        <span className="hover:text-gray-700">reports</span>
                    </button>
                </span>

                <div className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" hidden={hideDropdown} onMouseEnter={()=>setHideDropdown(false)} onMouseLeave={()=>setHideDropdown(true)}>
                    <div className="py-1" role="none">
                        <button className="inline-flex items-center px-4 py-2 border border-transparent" type="button" onClick={()=>router.get('/reports')}>
                            <span className="hover:text-gray-700">New</span>
                        </button><br/>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent" type="button" onClick={()=>showReports()}>
                            <span className="hover:text-gray-700">My Reports</span>
                        </button><br/>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent" type="button" onClick={()=>showReports("/reports/shared")}>
                            <span className="hover:text-gray-700">Shared with me</span>
                        </button>
                    </div>
                </div>
            </div>


            {showModal ? (
                <>
                    <div
                        className="flex overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold justify-center p-2">
                                        {reportHeading}
                                    </h3>
                                    <button
                                        className="p-2 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="text-black h-6 w-6 text-4xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}

                                <div className="relative p-6 flex-auto">
                                    <div className="w-full">
                                        <table id={tableId} data-order="[]" className="cell-border display w-full overflow-y-auto">
                                            <thead>
                                            <tr>
                                                <th>Filename</th>
                                                <th>Type</th>
                                                <th>Created At</th>
                                                <th>Updated At</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {modalChildren}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/*footer*/}
                                {/*<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">*/}
                                {/*    <button*/}
                                {/*        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"*/}
                                {/*        type="button"*/}
                                {/*        onClick={() => setShowModal(false)}*/}
                                {/*    >*/}
                                {/*        Close*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={()=>setShowModal(false)}></div>
                </>
            ) : null}
        </>
    );
}
