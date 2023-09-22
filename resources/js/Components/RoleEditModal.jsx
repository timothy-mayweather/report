import React from 'react'
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from "@/Components/Modal.jsx";

function RoleEditModal({currentRole, showModal, setShowModal, setRespRole}) {
    let newName = currentRole.name;
    function close(){
        setShowModal(false)
    }

    function apply(){
        if(newName===currentRole.name || newName.length===0){
            $.notify("No action to apply!")
        }else{
            axios.put("/roles/"+currentRole.id, {
                'name':newName,
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
                <div className="px-6 py-6">
                    <div className="mb-4"><span className="mr-2">Name: </span>
                        <span><input defaultValue={newName} onInput={(ev)=>{newName=ev.target.value}}/></span></div>
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


