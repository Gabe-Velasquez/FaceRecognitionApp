import React from "react";

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {'This cute little robot can detect faces in pictures. Show a picture and watch the magic happen.'}
            </p>
            <div className='center'>
            <div className='center pa4 br3 shadow-5'>
            <input className='f3 pa3 w-70 center' type='text' />
            <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
            </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;