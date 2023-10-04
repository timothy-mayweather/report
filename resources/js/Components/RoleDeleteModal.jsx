import React from 'react'
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import {router} from "@inertiajs/react";

function RoleDeleteModal({currentRole, showModal, setShowModal}) {
    function close(){
        setShowModal(false)
    }

    function apply(){
        close()
        axios.delete("/roles/"+currentRole.id).then((response) => {
            if (response.status === 200) {
                $.notify('Deleted successfully', "success")
                router.visit("/roles")
            } else {
                $.notify('An error occurred')
            }
        }).catch(error => {
            $.notify(error.response.data.message??error)
        })
    }

    return (
        <div>
            <Modal onClose={close} show={showModal}>
                <div className="px-6 py-6 text-xl">
                    <div className="mb-4 text-xl">Are you sure you want to delete <u className="text-2xl text-green-700 font-bold">{currentRole.name}</u> role</div>

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

export default RoleDeleteModal


