import {useState} from "react";
import Modal from "@/Components/Modal.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default  function PDFModal({setShowSavePDFModal, showSavePDFModal}){
    const [data, setData] = useState({
        filename: "", pdfType: "image"
    });

    const [showError, setShowError] = useState(false);

    function changeData(ev){
        setData({...data, [ev.target.name]:ev.target.value})
    }

    function generatePDF(){
        if(data.filename.trim().length===0 || data.pdfType.trim().length===0){
            setShowError(true)
        }
        else{
            if(data.pdfType === "image") {
                let inlineEditor = document.querySelector(".ck.ck-editor__editable_inline");
                let oldBorder = inlineEditor.style.border
                inlineEditor.style.removeProperty('border');
                let element = document.getElementsByClassName('ck-editor__main')[0];
                html2pdf().set(
                    {
                        filename: data.filename + ".pdf",
                        image: {type: 'jpeg', quality: 0.98}
                    }
                ).from(element).save();
                inlineEditor.style.border = oldBorder;
            }else{
                // setShowTools(false)
                // let oldBg = "";
                // document.querySelectorAll(".ck-content .table table th").forEach((el)=>{
                //     oldBg = el.style.background;
                //    el.style.background = "unset";
                // });
                // let oldTitle = document.title;
                // let oldUrl = window.location.href;
                // document.title = data.filename;
                // // window.location.href = data.filename;
                // setShowSavePDFModal(false)
                // window.print();
                //
                // document.title = oldTitle
                // // window.location.href = oldUrl
                // document.querySelectorAll(".ck-content .table table th").forEach((el)=>{
                //     el.style.background = oldBg;
                // });
                // setShowTools(true)
            }
            setShowSavePDFModal(false)
        }
    }

    return (
        <Modal onClose={()=>setShowSavePDFModal(false)} show={showSavePDFModal}>
            <div className="px-6 py-6">
                <label className="mr-2">Enter filename</label><input name="filename" type="text" onInput={changeData} /><span> .pdf</span><br/><br/>
                {/*<label className="mr-2">Choose type</label>*/}
                {/*<select name="pdfType" onChange={changeData}>*/}
                {/*    <option value=""></option>*/}
                {/*    <option value="native">Browser native</option>*/}
                {/*    <option value="image">Image</option>*/}
                {/*</select><br/><br/>*/}
                <span className="text-red-600" hidden={!showError}>*Please fill all fields</span>
                <div><br/>
                    <PrimaryButton className="mr-6" onClick={generatePDF}>
                        Download
                    </PrimaryButton>

                    <PrimaryButton className="bg-red-600 hover:bg-red-600" onClick={()=>setShowSavePDFModal(false)}>
                        Cancel
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}
