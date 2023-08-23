import React, {useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import UploadAdapter from "@/Helpers/UploadAdapter.js";
import FileModal from "@/Components/Editor/FileModal.jsx";
import ShowEditorButton from "@/Components/Editor/ShowEditorButton.jsx";
import PDFModal from "@/Components/Editor/PDFModal.jsx";

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
            <PDFModal setShowSavePDFModal={setShowSavePDFModal} showSavePDFModal={showSavePDFModal}/>
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
            />
        </div>
    );
}
