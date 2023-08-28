import React, {useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import UploadAdapter from "@/Helpers/UploadAdapter.js";
import FileModal from "@/Components/Editor/FileModal.jsx";
import ShowEditorButton from "@/Components/Editor/ShowEditorButton.jsx";
import PDFModal from "@/Components/Editor/PDFModal.jsx";
import ReadonlyButton from "@/Components/Editor/ReadonlyButton.jsx";
import LockModal from "@/Components/Editor/LockModal.jsx";
import SaveModal from "@/Components/Editor/SaveModal.jsx";
import TemplateModal from "@/Components/Editor/TemplateModal.jsx";
import ReportModal from "@/Components/Editor/ReportModal.jsx";


export default function Editor({report}) {

    const [fileDetails, setFileDetails] = useState({
        id:report['id'], filename:report['filename'], fileType:report['fileType']
    })
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [showSavePDFModal, setShowSavePDFModal] = useState(false)
    const [showLockModal, setShowLockModal] = useState(false)
    const [showTools, setShowTools] = useState(true)
    const [readonly, setReadonly] = useState(false)
    const [clickedCell, setClickedCell] = useState(null)

    function edit(){
        if(fileDetails.filename.trim().length===0 || fileDetails.fileType.trim().length===0){
            $.notify('Please enter all fields.')
        }else {
            axios.put("/reports/"+fileDetails.id, {
                filename: fileDetails.filename,
                fileType: fileDetails.fileType,
                content: editor.ui.view.editable.element.innerHTML
            }).then((response)=>{
                if(response.status===200){
                    setFileDetails({
                        filename: response.data.filename,
                        fileType: response.data.fileType,
                        id: response.data.id
                    });
                    $.notify('Edited successfully', "success")
                }else{
                    $.notify('An error occurred')
                }
            }).catch(error => {
                $.notify(error)
            })
            close();
        }
    }

    function toggleShowState(showState=null){
        showState ??= !showTools;
        editor.ui.view.toolbar.element.style.display = showState?'flex':'none';
        setShowTools(showState)
    }

    function toggleReadonly(){
        readonly?editor.disableReadOnlyMode('lock-all'):editor.enableReadOnlyMode('lock-all');
    }

    function onClickSave(){
        (fileDetails.id===null)?setShowSaveModal(true):edit()
    }


    return (
        <div className="bg-white">
            {/*file prompt modal*/}
            <SaveModal setShowSaveModal={setShowSaveModal} showSaveModal={showSaveModal} fileDetails={fileDetails} setFileDetails={setFileDetails} edit={edit}/>
            <PDFModal setShowSavePDFModal={setShowSavePDFModal} showSavePDFModal={showSavePDFModal}/>
            {clickedCell &&<LockModal setShowLockModal={setShowLockModal} showLockModal={showLockModal} cell={clickedCell}/>}
            <div className="ml-4">
                <span className="inline-flex rounded-md mr-6">
                    {"Report Details>"}
                </span>
                <span className="inline-flex rounded-md mr-6">
                    Name: {fileDetails.filename}
                </span>
                <span className="inline-flex rounded-md mr-6">
                    Type: {fileDetails.fileType}
                </span>
                {fileDetails.id===null? <span className="inline-flex rounded-md mr-6">
                    Not saved
                </span>:
                    <span className="inline-flex rounded-md">
                    <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={()=>setShowSaveModal(true)}>
                        <span className="hover:text-gray-700">Edit Details</span>
                    </button>
                </span>
                }
            </div>
            <div>
                <span className="inline-flex rounded-md">
                    <ShowEditorButton onClick={()=>toggleShowState()} showTools={showTools}/>
                </span>
                <FileModal />
                <ReportModal />
                <TemplateModal />
                <span className="inline-flex rounded-md">
                    <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={onClickSave}>
                        <span className="hover:text-gray-700">Save</span>
                    </button>
                </span>
                {/*<span className="inline-flex rounded-md">|</span>*/}
                <span className="inline-flex rounded-md">
                    <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={()=>setShowSavePDFModal(true)}>
                        <span className="hover:text-gray-700">download PDF</span>
                    </button>
                </span>
                <ReadonlyButton onClick={toggleReadonly} readonly={readonly} />
                {clickedCell &&
                <span className="inline-flex rounded-md">
                    <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={()=>setShowLockModal(true)}>
                        <span className="hover:text-gray-700 lock-button">Lock</span>
                    </button>
                </span>}
            </div>
            <CKEditor
                editor={ ClassicEditor }
                config={{
                    htmlSupport: {
                        allow: [
                            {
                                name: /.*/,
                                attributes: true,
                                classes: true,
                                styles: true
                            }
                        ],
                        disallow: [ /* HTML features to disallow */ ]
                    }
                }}
                onReady={ editor => {
                    window.editor = editor;

                    // editor.setData(recordTable)
                    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                        return new UploadAdapter(loader);
                    };

                    if(report['id']!==null) {
                        editor.setData(report['content']);
                    }

                    editor.on( 'change:isReadOnly', ( evt, propertyName, isReadOnly ) => {
                        setReadonly(isReadOnly);
                        // toggleShowState(!isReadOnly);
                    } );

                    //only if user is admin
                    editor.ui.view.editable.element.addEventListener('click', (ev)=>{
                        setClickedCell(ev.target.closest('td')??ev.target.closest('th'))
                    })
                } }
            />
        </div>
    );
}
