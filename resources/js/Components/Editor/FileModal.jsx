import React, {useState} from "react";
// import DataTable from 'datatables.net-dt';

export default function FileModal() {
    const [showModal, setShowModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(<tr></tr>);
    const tableId = "filesTable";

    function showFiles(){
        axios.get("/upload").then((response)=>{
            setModalChildren(response.data.map(
                    (file)=><tr key={file['id']}>
                        <td >{file['file_name']}</td>
                        <td >{file['name']}</td>
                        <td >{file['mime_type']}</td>
                        <td ><a href={"/storage/"+file['path']} target="_blank"><u>view</u></a></td>
                        <td >
                            <button className="border p-2 inline-flex items-center px-4 py-2 bg-gray-800 border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2" type="button" onClick={()=>navigator.clipboard.writeText("/storage/"+file['path'])}>
                                Copy Url
                            </button>
                        </td>
                    </tr>
                )
            );
            setShowModal(true);
            $(document).ready(function(){ $("#"+tableId).DataTable(
                {
                    'columnDefs'        : [
                        {
                            'searchable'    : false,
                            'targets'       : [3,4]
                        },
                    ]
                }
            ); });
            // new DataTable("#"+tableId);
        });
    }

    return (
        <>
            <span className="inline-flex rounded-md">
                <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={showFiles}>
                    <span className="hover:text-gray-700">view uploads</span>
                </button>
            </span>
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
                                        Uploaded Files
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
                                                <th>Alias</th>
                                                <th>Mimetype</th>
                                                <th>Link</th>
                                                <th>COPY URL</th>
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
