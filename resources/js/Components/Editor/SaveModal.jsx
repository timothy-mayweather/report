import React, {useEffect, useRef, useState} from "react";
import Modal from "@/Components/Modal.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {router} from "@inertiajs/react";

export default  function SaveModal({setShowSaveModal, showSaveModal, fileDetails, setFileDetails, edit, user, selectedShared, selected, initialMembers}){
    const [showError, setShowError] = useState(false);
    const [showMembers, setShowMembers] = useState(false)
    const [membersData, setMembersData] = useState(initialMembers)
    const tableId = "membersTable";
    const [currentSelected, setCurrentSelected] = useState({})

    useEffect(() => {
        selected.current = {...selected.current, ...currentSelected}
    }, [currentSelected]);

    useEffect(() => {
        let selectedIds = {}
        Object.values(membersData).forEach((mem)=>{
            if(!selectedShared.hasOwnProperty(mem['id'])){
                selectedIds[mem['id'].toString()] = false
            }
        })
        selected.current = {...selectedShared, ...selectedIds}

    }, [membersData]);

    function select(id){
        selected.current[id]=!selected.current[id]
        setCurrentSelected({[id]:selected.current[id]})
    }
    function getUsers(){
        axios.get("/users/create").then((response)=>{
            if(response.status === 200) {
                let responseData = response.data.filter((us)=>us.id!==user.id)
                let savedMembers = {}
                responseData.forEach((mem)=>{
                    savedMembers[mem['id']] = mem
                })
                setMembersData(savedMembers);
                setShowMembers(true)
                $(document).ready(function () {
                    $("#" + tableId).DataTable(
                        {
                            'columnDefs': [
                                {
                                    'searchable': false,
                                    'targets': [3]
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

    function save(){
        if(fileDetails.filename.trim().length===0 || fileDetails.fileType.trim().length===0){
            setShowError(true)
        }else {
            if(fileDetails.id!==null){
                edit();
            }else {
                let idsToShare = Object.keys(selected).filter((id)=>selected[id]).toString()
                axios.post("/reports", {
                    filename: fileDetails.filename,
                    fileType: fileDetails.fileType,
                    content: getEditAreaHtml(),
                    share: idsToShare.length===0?"0":idsToShare
                }).then((response) => {
                    if (response.status === 200) {
                        setFileDetails({
                            filename: response.data.filename,
                            fileType: response.data.fileType,
                            id: response.data.id
                        });
                        $.notify('Saved successfully', "success")
                    } else {
                        $.notify('An error occurred')
                    }
                }).catch(error => {
                    $.notify(error)
                })
            }
            close();
        }
    }

    function setData(ev){
        setFileDetails({...fileDetails, [ev.target.name]:ev.target.value})
    }

    function close(){
        setShowSaveModal(false);
        setShowMembers(false)
    }

    return (
        <Modal onClose={close} show={showSaveModal}>
            <div className="px-6 py-6">
                {/*{fileDetails.id===null && <><div className="text-green-700 font-bold text-lg">Please enter file name now to enable auto save</div><br /></>}*/}
                <label className="mr-2">Enter Name</label><input name="filename" type="text" value={fileDetails.filename} onInput={setData} /><br/><br/>
                {user.isAdmin&&<><label className="mr-2">As</label>
                <select name="fileType" value={fileDetails.fileType} onChange={setData}>
                    <option value=""></option>
                    <option value="report">Report</option>
                    <option value="template">Template</option>
                </select><br/><br/></>}
                {!user.isAdmin&&<button className="inline-flex items-center py-2 border border-transparent" type="button" onClick={getUsers}>
                    <span className="hover:text-gray-700 mr-2">Share With:</span>
                    <span>{Object.keys(selected.current).filter((id)=>selected.current[id]).map((id)=>membersData[id]['email']).toString()}</span>
                </button>}
                <div className="relative p-6 flex-auto">
                    <div className="w-full">
                        <table id={tableId} data-order="[]" className="cell-border display w-full overflow-y-auto" hidden={!showMembers}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.values(membersData).map(
                                    (member) => <tr key={member['id']}>
                                        <td>{member['name']}</td>
                                        <td>{member['email']}</td>
                                        <td>{member['role']}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className={
                                                    'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 '
                                                }
                                                defaultChecked={selected.current[member['id']]}
                                                onChange={() => select([member['id']])}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <span className="text-red-600" hidden={!showError}>*Please fill all fields</span>

                <div><br/>
                    <PrimaryButton className="mr-6" onClick={save}>
                        Save
                    </PrimaryButton>

                    <PrimaryButton className="bg-red-600 hover:bg-red-600" onClick={close}>
                        Cancel
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}
