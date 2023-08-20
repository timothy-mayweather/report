import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import {useForm, Head} from '@inertiajs/react'
import {CKEditor} from "@ckeditor/ckeditor5-react";
import UploadAdapter from "@/Helpers/UploadAdapter.js";

export default function Index({auth}) {

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
        <Authenticated user={auth.user}>
            <Head title="Records"/>
            <div className="p-0">
                <CKEditor
                    editor={ ClassicEditor }
                    // data={recordTable}
                    onReady={ editor => {
                        editor.setData(recordTable)
                        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                            return new UploadAdapter(loader);
                        };

                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
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
        </Authenticated>
    );
}

//other authenticated items should look like this
// <br/>
// <div className="mx-auto p-4 sm:p-6 lg:p-8 bg-white"></div>

