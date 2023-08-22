import React, {useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import UploadAdapter from "@/Helpers/UploadAdapter.js";
import FileModal from "@/Components/Editor/FileModal.jsx";
import Modal from "@/Components/Modal.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

function ShowEditorButton({showTools, onClick}){
    return (
        <>
            <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={onClick}>
                <span className="hover:text-gray-700">editor tools
                    <span >
                        <svg style={showTools?{}:{transform: 'rotate(180deg)'}}
                             className="ml-2 -mr-0.5 h-4 w-4 inline-flex"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"
                             fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </span>
            </button>
        </>
    );
}

function PDFModal({setShowSavePDFModal, showSavePDFModal, setShowTools}){
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
                        Save PDF
                    </PrimaryButton>

                    <PrimaryButton className="bg-red-600 hover:bg-red-600" onClick={()=>setShowSavePDFModal(false)}>
                        Cancel
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

export default function Editor() {
    const [showSavePDFModal, setShowSavePDFModal] = useState(false)
    const [showTools, setShowTools] = useState(false)
    function toggleShow(){
        let top = document.getElementsByClassName("ck-editor__top");
        for(let i=0; i<top.length; i++){
            top[i].hidden = !showTools;
        }
    }

    function toggleShowState(){
        toggleShow();
        setShowTools(!showTools)
    }


    let recordTable = "<table>\n" +
        "                    <thead>\n" +
        "                    <tr>\n" +
        "                        <th>Sn</th>\n" +
        "                        <th>\n" +
        "                            Corporate\n" +
        "                            Objectives\n" +
        "                        </th>\n" +
        "                        <th>\n" +
        "                            Individual Objectives: What you are\n" +
        "                            to do / achieve and by when- to\n" +
        "                            contribute to the achievement of the\n" +
        "                            Company objective\n" +
        "                        </th>\n" +
        "                        <th>\n" +
        "                            By when\n" +
        "                        </th>\n" +
        "                        <th>\n" +
        "                            Agreed\n" +
        "                            Weights\n" +
        "                        </th>\n" +
        "                        <th>\n" +
        "                            Indicator/ measure\n" +
        "                            (what will show that\n" +
        "                            you have achieved\n" +
        "                            what you set out to\n" +
        "                            achieve?)\n" +
        "                        </th>\n" +
        "                        <th>\n" +
        "                            Remarks\n" +
        "                        </th>\n" +
        "                        <th>\n" +
        "                            Marks\n" +
        "                        </th>\n" +
        "                    </tr>\n" +
        "                    </thead>\n" +
        "                    <tbody>\n" +
        "                    <tr>\n" +
        "                        <td contentEditable=\"true\"></td>\n" +
        "                        <td contentEditable=\"true\"></td>\n" +
        "                        <td contentEditable=\"true\"></td>\n" +
        "                        <td contentEditable=\"true\"></td>\n" +
        "                        <td contentEditable=\"true\"></td>\n" +
        "                        <td contentEditable=\"true\"></td>\n" +
        "                        <td contentEditable=\"true\"></td>\n" +
        "                        <td contentEditable=\"true\"></td>\n" +
        "                    </tr>\n" +
        "                    </tbody>\n" +
        "                </table><br/>\n";


    return (
        <div className="bg-white">
            {/*file prompt modal*/}
            <PDFModal setShowSavePDFModal={setShowSavePDFModal} showSavePDFModal={showSavePDFModal} setShowTools={setShowTools}/>
            <div>
                <span className="inline-flex rounded-md">
                    <ShowEditorButton onClick={toggleShowState} showTools={showTools}/>
                </span>
                <FileModal />
                <span className="inline-flex rounded-md">
                    <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={()=>setShowSavePDFModal(true)}>
                        <span className="hover:text-gray-700">save PDF</span>
                    </button>
                </span>
            </div>
            <CKEditor
                editor={ ClassicEditor }
                onReady={ editor => {
                    editor.setData(recordTable)
                    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                        return new UploadAdapter(loader);
                    };
                } }
                onChange={ ( event, editor ) => {
                    // const data = editor.getData();
                    // console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    // console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    // console.log( 'Focus.', editor );
                } }
            />
        </div>
    );
}
