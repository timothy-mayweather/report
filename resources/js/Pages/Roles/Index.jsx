import React, {useEffect, useState} from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import {Head} from '@inertiajs/react'
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import RoleEditModal from "@/Components/RoleEditModal.jsx";

function RoleView({fetchedRoles}){
    const [roles, setRoles] = useState(Object.fromEntries(new Map(fetchedRoles.map((us)=>[us.id, us]))))
    const [showModal, setShowModal] = useState(false)
    const [currentRole, setCurrentRole] = useState(fetchedRoles[0])
    const [respRole, setRespRole] = useState(null)
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        if(respRole!==null){
            setRoles({...roles, [respRole.id]:respRole})
        }
    }, [respRole]);


    function show(us){
        setCurrentRole(us)
        setShowModal(true)
    }

    return (
        <div>
            <div>
                <span className="mr-2">New Role</span>
                <input name="name" value={newRole} onInput={(ev)=>setNewRole(ev.target.value)}/>
                <PrimaryButton className="ml-2" onClick={
                    ()=>{
                        if(newRole.trim().length===0) {
                            $.notify("Please Enter new role")
                        }else {
                            axios.post("/roles", {
                                'name': newRole,
                            }).then((response) => {
                                if (response.status === 200) {
                                    setNewRole("")
                                    setRespRole(response.data)
                                    $.notify('Added successfully', "success")
                                } else {
                                    $.notify('An error occurred')
                                }
                            }).catch(error => {
                                $.notify(error.response.data.message ?? error)
                            })
                        }
                    }
                }>
                    Save
                </PrimaryButton>
            </div>
            <br/>
            <RoleEditModal showModal={showModal} setShowModal={setShowModal} currentRole={currentRole} setRespRole={setRespRole} />
            <p className="text-left text-lg font-bold">Current Roles</p>
            <table>
                <tbody>
                    {Object.values(roles).map((r)=><tr key={r.id}>
                        <td className="pr-4 pb-4 text-left"><span>+ </span>{r.name}</td>
                        <td className="pb-4">
                            <PrimaryButton onClick={()=>{show(r)}}>
                                EDIT
                            </PrimaryButton>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default function Index({auth, roles}) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Roles"/>
            <div className="mx-auto p-4 sm:p-6 lg:p-8 bg-white">
                <RoleView fetchedRoles={roles} />
            </div>
        </Authenticated>
    );
}
