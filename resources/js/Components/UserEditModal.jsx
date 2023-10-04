import React, {useEffect, useRef, useState} from 'react'
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from "@/Components/Modal.jsx";

function UserEditModal({currentUser, setCurrentUser, showModal, setShowModal, setRespUser, roles}) {
    let newRole=null;
    let checked = false;
    const [employmentRoles, setEmploymentRoles] = useState({})
    const [clickedRole, setClickedRole] = useState({})

    useEffect(() => {
        if(currentUser.hasOwnProperty('id')) {
            setShowModal(true)
            let currentRoles = currentUser.employmentRoles.map((r)=>r.id);
            setEmploymentRoles({...employmentRoles, ...Object.fromEntries(new Map(roles.map((us) => [us.id, currentRoles.includes(parseInt(us.id))])))})
        }else{
            setShowModal(false)
        }
    }, [currentUser]);

    useEffect(() => {
        setEmploymentRoles({...employmentRoles, ...clickedRole})
    }, [clickedRole]);

    function close(){
        setCurrentUser({})
        newRole=null
        checked=false
    }

    function apply(){
        let chosenRoles = Object.keys(employmentRoles).filter((e)=>employmentRoles[e]);
        let chosenRolesStr = "["+chosenRoles.toString()+"]"
        if(chosenRoles.length===0){
            $.notify("A user must have at least one employment role!")
        }
        else if(newRole===null && !checked && chosenRolesStr===currentUser.employmentRoles){
            $.notify("No action to apply!")
        }else{
            axios.put("/users/"+currentUser.id, {
                'newRole':newRole,
                'checked':checked,
                'employmentRoles':chosenRolesStr===currentUser.employmentRoles?null:chosenRolesStr
            }).then((response) => {
                if (response.status === 200) {
                    setRespUser(response.data)
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
                <div className="px-6 py-6">
                    <div className="mb-4"><span className="mr-2">Name: </span><span>{currentUser.name}</span></div>
                    <div className="mb-4"><span className="mr-2">Email: </span><span>{currentUser.email}</span></div>
                    <div>
                        {Object.values(roles).map((r)=><span key={r.id}>
                            <input type="checkbox" checked={employmentRoles[r.id]} onChange={(ev)=>{setClickedRole({[parseInt(r.id)]: ev.target.checked})}}/> <span className="mr-4">{r.name}</span>
                        </span>)}
                    </div>
                    <div className="mb-4"><span className="mr-2">Type: </span><span className="mr-4">{currentUser.role}</span><label className="mr-4">Change Type:</label><select defaultValue={currentUser.role} onChange={(ev)=>{newRole=ev.target.value}}>
                        <option value="admin">Admin</option>
                        <option value="normal">Normal</option>
                        <option value="provisional">Provisional</option>
                    </select></div>
                    <div className="mb-4"><span className="mr-2">Status: </span><span className="mr-8">{currentUser.deleted_at!==null?"Deactivated":currentUser.role==="provisional"?"Not Approved":"Active"}</span>
                        <input type="checkbox" defaultChecked={false} onChange={(ev)=>{checked=ev.target.checked}}/><label className="ml-3">{currentUser.deleted_at!==null?"Activate":"Deactivate"}</label>
                    </div>
                    <div className="mb-4"><span className="mr-2">Email Verified: </span><span>{currentUser.email_verified_at===null?"No":"Yes"}</span></div>
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

export default UserEditModal


