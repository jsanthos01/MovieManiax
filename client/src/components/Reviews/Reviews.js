import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";

import negative from './assets/negative2.png'
import positive from './assets/positive.png'
import picture from './assets/positive.png'

function Reviews() {
    const {id, title} = useParams();
    const userId = localStorage.id
    const [reviews, setReviews] = useState([]);
    // console.log(`Reviews page: ${id}`);
    // console.log(`Reviews page: ${title}`);

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
    }, [])
    return ( 
        <div className="result container mb-5" style={{backgroundColor:"white"}}>
            <h1 style={{color: "black", padding: "20px"}}>{title}</h1>
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
                    {reviews.map((review, idx) => 
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
