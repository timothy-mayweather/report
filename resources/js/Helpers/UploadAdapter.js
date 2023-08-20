import { router } from '@inertiajs/react'

class UploadAdapter {
    constructor( loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                router.post('/upload', {'file':file}, {
                    forceFormData: true,
                    onSuccess(res){
                        resolve( {
                            default: res.props.flash.success.urls.default
                        } );
                    }
                })
            } ) );
    }

    // Aborts the upload process.
    abort() {
        console.log('abort');
    }
}

export default UploadAdapter;
