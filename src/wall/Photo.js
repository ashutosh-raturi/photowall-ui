import axios from "axios"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import swal from "sweetalert";
import {actions} from '../store/photo-reducer'

const Photo = ({ photo, render }) => {
    const dispatch=useDispatch();
    function deletePhoto() {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Photo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:8080/photo/${photo.id}`).then(res => {
                        if (res.status === 200) {
                            swal("Photo has been deleted!", {
                                icon: "success",
                            })
                            render();
                        }
                        else {
                            swal({
                                title: "Something went wrong!!!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                    })
                }
            })
    }
    function onPhotoSelect() {
        const selectedPhoto = {
            title: photo.title,
            description: photo.description,
            image: photo.image,
        }
        dispatch(actions.setPhotoDetails(selectedPhoto));
        dispatch(actions.setID(photo.id));
    }
    return (
        <>
            <div className="mb-4 col-lg-4 col-md-6 col-sm-12">
                <div className="card" style={{ width: "18rem" }}>
                    <img height="200px" src={photo.image} className="card-img-top" alt={photo.description} />
                    <div className="card-body">
                        <h5 className="card-title">{photo.title}</h5>
                        <Link to={`preview/${photo.id}`}><button onClick={onPhotoSelect} className="btn btn-lg btn-outline-secondary me-3">View</button></Link>
                        <button onClick={deletePhoto} className="btn btn-lg btn-outline-danger">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Photo