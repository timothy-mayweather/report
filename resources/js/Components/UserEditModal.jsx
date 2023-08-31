import React from 'react'
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from "@/Components/Modal.jsx";

function UserEditModal({currentUser, showModal, setShowModal, setRespUser}) {
    let newRole=null;
    let checked = false;
    function close(){
        setShowModal(false)
        newRole=null
        checked=false
    }

    function apply(){
        if(newRole===null && !checked){
            $.notify("No action to apply!")
        }else{
            axios.put("/users/"+currentUser.id, {
                'newRole':newRole,
                'checked':checked
            }).then((response) => {
                if (response.status === 200) {
                    setRespUser(response.data)
                    $.notify('Changed successfully', "success")
                    close()
                } else {
                    $.notify('An error occurred')
                }
            }).catch(error => {
                console.log(error)
                $.notify(error)
            })
        }
    }

    return (
        <div>
            <Modal onClose={close} show={showModal}>
                <div className="px-6 py-6">
                    <div className="mb-4"><span className="mr-2">Name: </span><span>{currentUser.name}</span></div>
                    <div className="mb-4"><span className="mr-2">Email: </span><span>{currentUser.email}</span></div>
                    <div className="mb-4"><span className="mr-2">Role: </span><span className="mr-4">{currentUser.role}</span><label className="mr-4">Change Role:</label><select defaultValue={currentUser.role} onChange={(ev)=>{newRole=ev.target.value}}>
                        <option value="admin">Admin</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="employee">Employee</option>
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


