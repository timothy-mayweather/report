import React, {useEffect, useState} from 'react'
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from "@/Components/Modal.jsx";

function RoleEditModal({roles, currentRole, showModal, setShowModal, setRespRole}) {
    let newName = currentRole.name;
    const [clickedRole, setClickedRole] = useState({})
    const [clickedEdit, setClickedEdit] = useState({})
    const [employmentRoles, setEmploymentRoles] = useState(getRoles())
    function getRoles(rObj={}){const shareRules = ((obj = {})=>{currentRole.shareRules.forEach((r)=>{obj[r.shared_role]=r}); return obj})(); Object.values(roles).forEach((r)=>{rObj={...rObj, [r.id]:{...r, ...(shareRules.hasOwnProperty(r.id)?{edit:shareRules[r.id]['edit'],shareId:shareRules[r.id]['id'], isShared:true}:{edit:false, isShared:false})}}}); return rObj}

    useEffect(() => {
        setEmploymentRoles(getRoles())
    }, [currentRole]);

    useEffect(() => {
        let cRoles = Object.keys(clickedRole);
        if(cRoles.length>0) {
            setEmploymentRoles({...employmentRoles, [cRoles[0]]:{...employmentRoles[cRoles[0]], isShared:clickedRole[cRoles[0]]}})
        }
    }, [clickedRole]);

    useEffect(() => {
        let cRoles = Object.keys(clickedEdit);
        if(cRoles.length>0) {
            setEmploymentRoles({...employmentRoles, [cRoles[0]]:{...employmentRoles[cRoles[0]], edit:clickedEdit[cRoles[0]]}})
        }
    }, [clickedEdit]);

    function close(){
        setShowModal(false)
    }

    function apply(){
        let initialRoles = getRoles();
        if(newName.trim().length===0){
            $.notify("Name can never be empty!")
        }
        else if((newName===currentRole.name)&&(JSON.stringify(employmentRoles) === JSON.stringify(initialRoles))){
            close();
            $.notify("No action to apply!")
        }else{
            let newShare = []
            for(let key in employmentRoles){
                if(JSON.stringify(employmentRoles[key])!==JSON.stringify(initialRoles[key])&&(employmentRoles[key].isShared||initialRoles[key].isShared)) {
                    newShare.push(employmentRoles[key])
                }
            }
            if((newName===currentRole.name) && Object.keys(newShare).length===0){
                close();
                $.notify("No action to apply!")
                return
            }
            axios.put("/roles/"+currentRole.id, {
                'name':newName,
                'shareRules':JSON.stringify(newShare)
            }).then((response) => {
                if (response.status === 200) {
                    setRespRole(response.data)
                    $.notify('Changed successfully', "success")
                    close()
                } else {
                    $.notify('An error occurred')
                }
            }).catch(error => {
                $.notify(error.response.data.message??error)
            })
        }
    }

    return (
        <div>
            <Modal onClose={close} show={showModal}>
                <div className="px-6 py-6 text-xl">
                    <div className="mb-4"><span className="mr-2">Name: </span>
                        <span><input defaultValue={newName} onInput={(ev)=>{newName=ev.target.value}}/></span></div>
                        <p className="text-xl">{newName+" submits reports to:"}</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.values(roles).map((r)=>{
                                return !employmentRoles.hasOwnProperty(r.id)?<></>:
                                <tr key={r.id}>
                                    <td>
                                        <input type="checkbox" defaultChecked={employmentRoles[r.id].isShared} onChange={(ev)=>{setClickedRole({[parseInt(r.id)]: ev.target.checked})}}/> <span className="ml-2">{r.name}</span>
                                    </td>
                                    <td className="px-5">
                                        <input type="checkbox" defaultChecked={employmentRoles[r.id].edit} onChange={(ev)=>{setClickedEdit({[parseInt(r.id)]: ev.target.checked})}}/>
                                    </td>
                            </tr>})}
                            </tbody>
                        </table>
                    <div>
                        <PrimaryButton className="mr-6" onClick={()=>{apply()}}>
                            Apply
                        </PrimaryButton>

                        <PrimaryButton className="bg-red-600 hover:bg-red-600" onClick={()=>{close()}}>
                            Cancel
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default RoleEditModal


