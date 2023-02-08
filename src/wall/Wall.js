import axios from "axios";
import { useEffect, useState } from "react";
import Photo from "./Photo";

const Wall = (props) => {
    const URL = 'http://localhost:8080/photos';
    const [message,setMessage]=useState(null);
    const [photos, setPhotos] = useState(null);
    const [deleteCount, setDeleteCount] = useState(0);
    function changeDeleteCount() {
        setDeleteCount(deleteCount + 1);
    }
    useEffect(() => {
        axios.get(URL).then(response => {
            if(response.data.length===0)
            {
                setPhotos(null);
                setMessage('No photos on your wall, goto upload section for adding...');
            }
            else
                setPhotos(response.data);
        }).catch(err => {
            setMessage('Unable to fetch photos from the server!');
        })
    }, [deleteCount])
    return (
        <div className="container mt-5 p-4">
            <div className="row justify-content-center">
                {
                    (photos !== null && message===null) && photos.map(photo =>
                        <Photo key={photo.id} photo={photo} render={changeDeleteCount} />
                    )
                }
                {message && <h2>{message}</h2>}
            </div>
        </div>

    );
}

export default Wall;