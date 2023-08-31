import React, {useRef, useState} from 'react';
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


export default function Editor({user, report}) {
    if(!user.isAdmin && report['id']===null){
        report['fileType'] = 'report'
    }
    const [fileDetails, setFileDetails] = useState({
        id:report['id'], filename:report['filename'], fileType:report['fileType']
    })
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [showSavePDFModal, setShowSavePDFModal] = useState(false)
    const [showLockModal, setShowLockModal] = useState(false)
    const [showTools, setShowTools] = useState(true)
    const [readonly, setReadonly] = useState(false)
    const [clickedCell, setClickedCell] = useState(null)
    const [selectedShared, setSelectedShared] = useState(!report.hasOwnProperty('users')?{}:Object.fromEntries(new Map(report.users.map((us)=>[us.id, true]))))
    // const [selected, setSelected] = useState(selectedShared)//set of ids with true if selected or false otherwise
    const selected = useRef(selectedShared);

    function edit(){
        if(fileDetails.filename.trim().length===0 || fileDetails.fileType.trim().length===0){
            $.notify('Please enter all fields.')
        }else {
            let idsToShare = Object.keys(selected.current).filter((id)=>selected.current[id]).toString()

            axios.put("/reports/"+fileDetails.id, {
                filename: fileDetails.filename,
                fileType: fileDetails.fileType,
                content: getEditAreaHtml(),
                share: idsToShare.length===0?"0":idsToShare
            }).then((response)=>{
                if(response.status===200){
                    setFileDetails({
                        filename: response.data.filename,
                        fileType: response.data.fileType,
                        id: response.data.id
                    });
                    setSelectedShared(Object.fromEntries(new Map(response.data.users.map((us)=>[us.id, true]))))
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

    function removeEditing(){
        if(!user.isAdmin) {
            const adminAreas = document.getElementsByClassName('perm-admin');
            const supervisorAreas = document.getElementsByClassName('perm-supervisor');
            const employeeAreas = document.getElementsByClassName('perm-employee');
            for(let el of adminAreas){
                el.className = "perm-admin"
                el.removeAttribute('role')
                el.contentEditable = false
            }

            for(let el of supervisorAreas){
                let isEditable = user.role==="supervisor"
                el.contentEditable = isEditable
                el.className = isEditable?el.className:"perm-supervisor"
                if(!isEditable) {
                    el.removeAttribute('role')
                }
            }

            for(let el of employeeAreas){
                let isEditable = user.role==="employee"
                el.contentEditable = isEditable
                el.className = isEditable?el.className:"perm-employee"
                if(!isEditable) {
                    el.removeAttribute('role')
                }
            }
        }
    }


    return (
        <div className="bg-white">
            <div id="data-exchange" hidden={true}>
                {/*treat data before sending it to editor from here*/}
            </div>
            {/*file prompt modal*/}
            <SaveModal setShowSaveModal={setShowSaveModal} showSaveModal={showSaveModal} fileDetails={fileDetails} setFileDetails={setFileDetails} edit={edit} user={user} selected={selected} selectedShared={selectedShared} initialMembers={report.hasOwnProperty('users')?Object.fromEntries(new Map(report.users.map((us)=>[us.id, us]))):{}}/>
            <PDFModal setShowSavePDFModal={setShowSavePDFModal} showSavePDFModal={showSavePDFModal}/>
            {clickedCell &&<LockModal setShowLockModal={setShowLockModal} showLockModal={showLockModal} cell={clickedCell}/>}
            <div className="ml-3">
                <span className="inline-flex rounded-md mr-6 mt-3">
                    {"Report Details>"}
                </span>
                <span className="inline-flex rounded-md mr-6">
                    Name: {fileDetails.filename}
                </span>
                {user.isAdmin&&<span className="inline-flex rounded-md mr-6">
                    Type: {fileDetails.fileType}
                </span>}
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
                <ReportModal user={user}/>
                <TemplateModal user={user}/>
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
                    window.loadData = function (data) {
                        const exchangeArea = document.getElementById("data-exchange");
                        exchangeArea.innerHTML=data
                        removeEditing();
                        window.editor.setData(exchangeArea.innerHTML)
                    }

                    window.getEditAreaHtml = function () {
                        const exchangeArea = document.getElementById("data-exchange");
                        exchangeArea.innerHTML=editor.ui.view.editable.element.innerHTML
                        exchangeArea.querySelectorAll('.ck-table-column-resizer').forEach((el)=>{
                            el.remove();
                        })
                        exchangeArea.querySelectorAll('.ck-table-bogus-paragraph').forEach((el)=>{
                            el.className = el.className.replace("ck-table-bogus-paragraph", "")
                            let children = el.children;
                            for (let i = 0; i < children.length; i++) {
                                if(children[i].tagName === "BR"){
                                    children[i].remove()
                                }
                            }
                            if(el.children.length===0 && el.innerText.length===0){
                                el.remove()
                            }
                        })
                        exchangeArea.querySelectorAll('p').forEach((el)=>{
                            let children = el.children;
                            if(children.length>0) {
                                if (children[0].tagName === "BR") {
                                    children[0].remove();
                                }
                                if(el.children.length===0 && el.innerText.length===0){
                                    el.remove()
                                }
                            }
                        })
                        return exchangeArea.innerHTML;
                    }

                    window.editor = editor;

                    // loadData(recordTable)
                    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                        return new UploadAdapter(loader);
                    };

                    if(report['id']!==null) {
                        loadData(report['content']);
                    }

                    editor.on( 'change:isReadOnly', ( evt, propertyName, isReadOnly ) => {
                        setReadonly(isReadOnly);
                        // toggleShowState(!isReadOnly);
                    } );

                    if(user.isAdmin) {
                        editor.ui.view.editable.element.addEventListener('click', (ev) => {
                            setClickedCell(ev.target.closest('td') ?? ev.target.closest('th'))
                        })
                    }
                } }

                onFocus={()=>{

                }}
            />
        </div>
    );
}
