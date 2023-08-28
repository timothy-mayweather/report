import React, {useState} from "react";
import Modal from "@/Components/Modal.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default  function SaveModal({setShowSaveModal, showSaveModal, fileDetails, setFileDetails, edit}){
    const [showError, setShowError] = useState(false);

    function save(){
        if(fileDetails.filename.trim().length===0 || fileDetails.fileType.trim().length===0){
            setShowError(true)
        }else {
            if(fileDetails.id!==null){
                edit();
            }else {
                axios.post("/reports", {
                    filename: fileDetails.filename,
                    fileType: fileDetails.fileType,
                    content: editor.ui.view.editable.element.innerHTML
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
    }

    return (
        <Modal onClose={close} show={showSaveModal}>
            <div className="px-6 py-6">
                {/*{fileDetails.id===null && <><div className="text-green-700 font-bold text-lg">Please enter file name now to enable auto save</div><br /></>}*/}
                <label className="mr-2">Enter Name</label><input name="filename" type="text" value={fileDetails.filename} onInput={setData} /><br/><br/>
                <label className="mr-2">As</label>
                <select name="fileType" value={fileDetails.fileType} onChange={setData}>
                    <option value=""></option>
                    <option value="report">Report</option>
                    <option value="template">Template</option>
                </select><br/><br/>
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
