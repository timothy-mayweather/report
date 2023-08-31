import {useState} from "react";
import Modal from "@/Components/Modal.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default  function LockModal({setShowLockModal, showLockModal, cell}){
    const [element, setElement] = useState("");
    const [permissions, setPermissions] = useState("");
    const [showError, setShowError] = useState(false);
    const [elements, setElements] = useState([]);
    const row = cell.closest('tr');
    const table = cell.closest('table');
    function applyPermissions(){
       elements.forEach((el)=>{
           el.className = permissions
       })
        close();

        loadData(getEditAreaHtml());
        showChanged()
    }

    function showChanged(){
        setTimeout(()=> {
            const adminAreas = document.getElementsByClassName('perm-admin');
            const supervisorAreas = document.getElementsByClassName('perm-supervisor');
            const employeeAreas = document.getElementsByClassName('perm-employee');
            for (let el of adminAreas) {
                el.className += " bg-red-600"
            }
            for (let el of supervisorAreas) {
                el.className += " bg-yellow-300"
            }
            for (let el of employeeAreas) {
                el.className += " bg-green-800"
            }
        }, 500);

        setTimeout(()=>{
            const adminAreas = document.getElementsByClassName('perm-admin');
            const supervisorAreas = document.getElementsByClassName('perm-supervisor');
            const employeeAreas = document.getElementsByClassName('perm-employee');
            for(let el of adminAreas){
                el.className = el.className.replace("bg-red-600", "")
            }

            for(let el of supervisorAreas){
                el.className = el.className.replace("bg-yellow-300", "")
            }

            for(let el of employeeAreas){
                el.className = el.className.replace("bg-green-800", "")
            }
        }, 3000)
    }

    function handleCellPermissions(cells){
        setElements(cells)
        let className = null;
        let isSame = true;
        cells.forEach((el)=>{
            const index = el.className.search('perm-')
            const perm= (index===-1)?"perm-all": el.className.substring(index).split(" ")[0];
            if(className===null){
                className=perm;
            }
            else if(className!==perm){
                isSame=false;
            }
        })
        setPermissions((isSame && className!==null)?className:"")
    }

    function handleSelectChange(ev){
        const chosen = ev.target.value;
        setElement(chosen);
        if(chosen==="Cell"){
            handleCellPermissions([cell])
        }
        else if(chosen==="Table"){
            handleCellPermissions(table.cells)
        }
        else if(chosen==="Row"){
            handleCellPermissions(row.cells)
        }
        else if(chosen==="Column"){
            const cellIndex = cell.cellIndex;
            let elements = [];
            table.rows.forEach((el)=>{
                let newCell = el.cells[cellIndex]
                if(newCell){
                    elements.push(newCell)
                }
            })
            handleCellPermissions(elements)
        }
    }

    function handlePermissionChange(ev){
        setPermissions(ev.target.value)
    }

    function close(){
        setShowLockModal(false)
        setElement("")
        setPermissions("")
        setShowError(false)
        setElements([])
    }

    return (
        // works only on tables for now
        <Modal onClose={close} show={showLockModal}>
            <div className="px-6 py-6">
                <label className="mr-2">Choose Element</label>
                <select name="element" onChange={handleSelectChange} value={element} >
                    <option value=""></option>
                    <option value="Cell">Cell</option>
                    <option value="Row">Row</option>
                    <option value="Column">Column</option>
                    <option value="Table">Table</option>
                </select><br/><br/>
                <div>
                    <div>Choose Permissions</div>
                    <div className="md:flex items-center">
                        <input className="ml-2 mr-2" type="radio" name="permissions" value="perm-all" checked={permissions==="perm-all"} onChange={handlePermissionChange}/>
                        <label>All</label>
                        <input className="ml-4 mr-2" type="radio" name="permissions" value="perm-admin" checked={permissions==="perm-admin"} onChange={handlePermissionChange}/>
                        <label>Admin Only</label><span className="ml-1 rounded-bl-2xl bg-red-600 h-4 w-4"></span>
                    </div>
                    <span className="ml-2">Admin and </span><br/>
                    <div className="md:flex items-center">
                        <input className="ml-2 mr-2" type="radio" name="permissions" value="perm-supervisor" checked={permissions==="perm-supervisor"} onChange={handlePermissionChange}/>
                        <label>Supervisor</label><span className="ml-1 rounded-bl-2xl bg-yellow-300 h-4 w-4"></span>
                        <input className="ml-4 mr-2" type="radio" name="permissions" value="perm-employee" checked={permissions==="perm-employee"} onChange={handlePermissionChange}/>
                        <label>Employee</label><span className="ml-1 rounded-bl-2xl bg-green-800 h-4 w-4"></span>
                    </div>
                </div>
                <span className="text-red-600" hidden={!showError}>*Please fill all fields</span>
                <div><br/>
                    <PrimaryButton className="mr-6" onClick={applyPermissions}>
                        Apply
                    </PrimaryButton>

                    <PrimaryButton className="bg-red-600 hover:bg-red-600" onClick={()=>setShowLockModal(false)}>
                        Cancel
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}
