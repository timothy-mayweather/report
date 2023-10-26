import React, {useEffect, useRef, useState} from "react";
import Modal from "@/Components/Modal.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default  function SaveModal({setShowSaveModal, showSaveModal, fileDetails, setFileDetails, edit, user, selectedShared, selected, initialMembers, resetMembers}){
    const [showError, setShowError] = useState(false);
    const [showMembers, setShowMembers] = useState(false)
    const [membersData, setMembersData] = useState(initialMembers)
    const tableId = "membersTable";
    const [currentSelected, setCurrentSelected] = useState({})
    const [saveRole, setSaveRole] = useState(user.employmentRoles[0]['id'])
    const [enableSpinner, setEnableSpinner] = useState(false)

    useEffect(() => {
        if(showSaveModal) {
            setMembersData(initialMembers)
            setEnableSpinner(false)
        }
    }, [showSaveModal]);

    useEffect(() => {
        selected.current = {...selected.current, ...currentSelected}
    }, [currentSelected]);

    function changeSelected(data){
        let selectedIds = {}
        Object.values(data).forEach((mem)=>{
            if(!selectedShared.hasOwnProperty(mem['id'])){
                selectedIds[mem['id'].toString()] = false
            }
        })
        selected.current = {...selectedShared, ...selectedIds}
    }

    useEffect(() => {
        changeSelected(membersData)
    }, [membersData]);

    function select(id, ev){
        let newSelectedObj = {...selected.current, [id]:!selected.current[id]}
        let newSelected = Object.keys(newSelectedObj).filter((id)=>newSelectedObj[id]).map((id)=>membersData[id])
        let testObj = {}
        for(let i=0; i<newSelected.length; i++){
            if(testObj.hasOwnProperty(newSelected[i]['id'])){
                $.notify("For "+newSelected[i]['email']+", please choose one role","info")
                ev.target.checked = false
                return;
            }else{
                testObj[newSelected[i]['id']] = newSelected[i]
            }
        }
        selected.current[id]=!selected.current[id]
        setCurrentSelected({[id]:selected.current[id]})
    }
    function getUsers(){
        setEnableSpinner(true)
        axios.get("/users/create?role="+saveRole).then((response)=>{
            if(response.status === 200) {
                setEnableSpinner(false)
                // const rules = ((obj={})=>{response.data.rules.forEach((dt)=>{obj[dt['shared_role']]=dt}); return obj})()
                const roles = ((obj={})=>{response.data.roles.forEach((dt)=>{obj[dt['id']]=dt}); return obj})()
                const users = response.data.users.map((us)=>{return {...us, 'role':roles[us['employment_role_id']]['name']}})
                const responseData = users.filter((us)=>us.id!==user.id)

                let savedMembers = {}
                responseData.forEach((mem, index)=>{
                    savedMembers[index] = mem
                })
                setEnableSpinner(false)
                changeSelected(savedMembers)
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

                let membersSharedWith = Object.keys(selected.current).filter((id)=>selected.current[id]).map((id)=>membersData[id])

                axios.post("/reports", {
                    filename: fileDetails.filename,
                    fileType: fileDetails.fileType,
                    content: getEditAreaHtml(),
                    senderRoleId:saveRole,
                    share: membersSharedWith
                }).then((response) => {
                    if (response.status === 200) {
                        setFileDetails({
                            filename: response.data.filename,
                            fileType: response.data.fileType,
                            id: response.data.id
                        });
                        resetMembers(membersData)
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
                <label className="mr-2">Enter {fileDetails.fileType.replace(/\b\w/g, s => s.toUpperCase())} Name</label><input name="filename" type="text" value={fileDetails.filename} onInput={setData} /><br/><br/>
                {/*{user.isAdminRoute&&<><label className="mr-2">As</label>*/}
                {/*<select name="fileType" value={fileDetails.fileType} onChange={setData}>*/}
                {/*    <option value=""></option>*/}
                {/*    <option value="report">Report</option>*/}
                {/*    <option value="template">Template</option>*/}
                {/*</select><br/><br/></>}*/}
                {!user.isAdminRoute&&
                <>
                    <div>
                        Saving Report as <select name="saveRole" onChange={(ev)=>setSaveRole(ev.target.value)} value={saveRole}  disabled={enableSpinner || Object.values(membersData).length>0}>
                        {user.employmentRoles.map((r)=><option value={r.id} key={r.id}>{r.name}</option>)}
                    </select>
                    </div>
                    <button className="inline-flex items-center py-2 border border-transparent" type="button" onClick={getUsers} disabled={enableSpinner || Object.values(membersData).length>0}>
                        {enableSpinner&&<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75  text-blue-700" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                        <span className="hover:text-gray-700 mr-2">Share With:</span>
                        <span>{Object.keys(selected.current).filter((id)=>selected.current[id]).map((id)=>membersData[id]['email']).toString()}</span>
                    </button>
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
                                        (member, index) => {
                                            let key = (member.hasOwnProperty('employment_role_id'))?index:member['id']

                                            return <tr key={key}>
                                            <td>{member['name']}</td>
                                            <td>{member['email']}</td>
                                            <td>{member['role']}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className={
                                                        'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 '
                                                    }
                                                    defaultChecked={selected.current[key]}
                                                    onChange={(ev) => {select([key], ev)}}
                                                />
                                            </td>
                                        </tr>}
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>}

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
