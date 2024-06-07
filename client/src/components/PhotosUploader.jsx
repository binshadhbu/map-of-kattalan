import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function PhotosUploader({ addedPhotos, onChange }) {
    // const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => { return [...prev, filename] });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        console.log(files);
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // console.log(res);
            const { data: filename } = res;
            console.log(data);
            onChange(prev => { return [...prev, filename]; });

        });
    }

    return (
        <>
            <div className="flex gap-2 ">
                <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type='text' placeholder='add  by link ' />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>upload</button>
            </div>

            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 '>
                {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                    <div key={index} className='h-32 flex'>
                        <img className='rounded-2xl w-full object-cover ' src={'http://localhost:4000/uploads/' + link} alt="" />
                    </div>
                ))}
                <label className='flex h-32 cursor-pointer items-center gap-1 justify-center border  bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                    <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    upload
                </label>
            </div>

        </>
    )
}
PhotosUploader.propTypes = {
    addedPhotos: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default PhotosUploader


