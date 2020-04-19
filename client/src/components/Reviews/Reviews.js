import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import picture from './assets/positive.png'
import Modal from './Modal'

function Reviews() {
    const {id, title} = useParams();
    const userId = localStorage.id
    const [reviews, setReviews] = useState([]);
    const [modalDisplay, setModalDisplay] = useState(false);

    async function getSpecificReviews(){
        const getMovies = await fetch(`/api/specificReviews/${id}`).then(res => res.json());
        console.log(getMovies);
        setReviews(getMovies);
    }

    async function deleteReview(){
        console.log("Inside delete review function")
        const removeSpecificReview = await fetch(`/api/removeReview/${userId}/${id}`, 
            {
                method: 'DELETE'
            }).then(result => result.json());
            console.log(removeSpecificReview.message);
            getSpecificReviews();
    }


    useEffect(function(){
        getSpecificReviews();
    }, [modalDisplay])
    return ( 
        <div className="result container mb-5" style={{backgroundColor:"white"}}>
            <div>
                <h1 style={{color: "black", padding: "20px"}}>{title}</h1>
                <button type="button" class="btn btn-sm btn-outline-primary m-3"  onClick={() => setModalDisplay(true)}>Add a Review</button>
                {modalDisplay ? <Modal setModalDisplay={setModalDisplay}  movieId={id} movieName={title} /> : ''}

            </div>

            <div class="container">
                <table class="table table-striped">
                    <thead class="thead-light">
                        <tr>
                        <th scope="col">Rating</th>
                        <th scope="col">Review</th>
                        <th scope="col">Writer </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => 
                            <>
                            <tr>
                                <td> <img src={picture} />{review.rating}</td>
                                <td>{review.comment}
                                    <hr />
                                    <p>{review.createdAt}</p>
                                </td>
                                <td>{review.user.name}
                                    { userId === review.user.id ? <button type="button" class="btn btn-danger ml-3" onClick={deleteReview} >Delete</button> : ''}
                                </td>
                            </tr>  
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Reviews
