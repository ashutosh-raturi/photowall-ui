import axios from 'axios'
import swal from 'sweetalert'
import { useState } from 'react'
import styles from './Upload.module.css'
const Upload = (props) => {
    const URL = 'http://localhost:8080/photo'
    const [data, setData] = useState({
        title: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const uploadPhoto = async (event) => {
        event.preventDefault();
        const payload = new FormData();
        payload.append('title', data.title);
        payload.append('description', data.description);
        payload.append('image', image);
        swal({
            title: "Do you want to upload this photo?",
            icon: "info",
            buttons: [true,"Yes"],
            
        })
        .then(willUpload=>{
            if(willUpload)
            {
                axios.post(URL, payload).then(res => {
                    if (res.status === 200) {
                        swal({
                            title: "Done",
                            text: "Form submitted successfully!",
                            icon: "success",
                            button: "OK",
                        }).then(flag => {
                            if (flag || !flag) {
                                props.history.push('/')
                            }
                        })
                    }
                }).catch(err => {
                    swal({
                        title: "Something went wrong!!!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then(flag => {
                        if (flag || !flag) {
                            props.history.push('/');
                        }
                    })
                })
            }
        })
    }
    return (
        <>
            <h1 className={`text-center mt-4 ${styles.banner}`}>Photowall</h1>
            <div className="row justify-content-center mt-5">
                <div className="p-5 col-md-8 border justify-content-center">
                    <form encType="multipart/form-data" onSubmit={uploadPhoto}>
                        <div className="mb-3">
                            <input value={data.title} onChange={(event) => { setData({ ...data, title: event.target.value }) }} placeholder="Title" type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <input value={data.description} onChange={(event) => { setData({ ...data, description: event.target.value }) }} placeholder="Description" type="text" className="form-control" />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={(event) => { setImage(event.target.files[0]) }} type="file" className="form-control" id="inputGroupFile02" />
                            <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                        </div>
                        <div className="text-center mt-3">
                            <button type="submit" className={`btn-lg btn-primary ${styles.submitbtn}`}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Upload;
