import axios from "axios";
import {useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import swal from "sweetalert";
import styles from './Preview.module.css'
const Preview = (props) => {
    const [data, setData] = useState({
        title: '',
        description: '',
        image:null
    });
    
    const params=useParams();
    const URL='http://localhost:8080/photo/'+params.id;
    useEffect(()=>{
        axios.get(URL)
        .then(res=>{
            if(res.status===200)
            {
                setData({
                    title: res.data.title,
                    description: res.data.description,
                    image:res.data.image
                })
            }
        }).catch(err=>console.log(err))
    },[URL]);

    function updatePhoto(event) {
        event.preventDefault();
                const payload = new FormData();
                payload.set('title', data.title);
                payload.set('description', data.description);
        swal({
            title: "Do you want to update this photo?",
            icon: "info",
            buttons: [true,"Yes"],
            
        }).then(willDelete=>{
            if(willDelete)
            {
                axios.put(URL, payload)
                .then(res => {
                if (res.status === 200) {
                    swal({
                        title: "Done",
                        text: "Photo updated successfully!",
                        icon: "success",
                        button: "OK",
                    }).then(flag => {
                        if (flag || !flag) {
                            props.history.push('/')
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err)
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
            {
                    data !== null && <>
                    <div className="mt-4 row">
                    <h3 className="text-center">{data.title.toUpperCase()}</h3>
                    <div className="col-lg-12 text-center">
                        <img className={styles.frame} src={data.image} alt={data.description} />
                    </div>
                </div>
                    <div className="mt-5 row justify-content-center">
                        <div className="border col-lg-4 col-md-6 col-sm-12 text-center p-4">
                            <form encType="multipart/form-data" onSubmit={updatePhoto}>
                                <div className="mb-3">
                                    <input value={data.title} onChange={(event) => { setData({ ...data, title: event.target.value }) }} placeholder="Title" type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <input value={data.description} onChange={(event) => { setData({ ...data, description: event.target.value }) }} placeholder="Description" type="text" className="form-control" />
                                </div>
                                <div className="text-center mt-3">
                                    <button type="submit" className={`btn-lg btn-primary ${styles.updatebtn}`}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Preview
