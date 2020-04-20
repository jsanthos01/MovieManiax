import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Modal from './Modal'
import './Reviews.css'

function Reviews() {
    const {id, title} = useParams();
    const userId = localStorage.id
    const [reviews, setReviews] = useState([]);
    const [modalDisplay, setModalDisplay] = useState(false);

    async function getSpecificReviews(){
        const getMovies = await fetch(`/api/specificReviews/${id}`).then(res => res.json());
        setReviews(getMovies);
    }

    async function deleteReview(reviewId, comment){
        console.log(reviewId)
        const putComment = {comment: comment}
        const removeSpecificReview = await fetch(`/api/removeReview/${userId}/${reviewId}`, 
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(putComment)
            }
        ).then(result => result.json());
        console.log(removeSpecificReview.message);
        getSpecificReviews();
    }

    useEffect(function(){
        getSpecificReviews();
    }, [modalDisplay])

    return ( 
        <div className="result container mb-5">
            <div>
                <h1>{title}</h1>
                <button type="button" class="btn btn-sm btn-outline-primary m-3"  onClick={() => setModalDisplay(true)}>Add a Review</button>
            </div>
            <div class="container">
                {reviews.map(review => 
                    <div class="content">
                        <div class="inner_content">
                            <div class="card styleCard">
                                <div class="grouped">
                                    <div class="avatar">
                                        <a href="/u/Ruuz?language=en-US">
                                            <img class="avatar lazyload" src="https://images-platform.99static.com/jQu2xohritutSVmnVq7np7rbkxg=/0x0:1920x1920/500x500/top/smart/99designs-contests-attachments/106/106359/attachment_106359975" data-srcset="https://image.tmdb.org/t/p/w64_and_h64_face/xUObnJSvHrFPsIpoDmb1jiQZLq7.jpg 1x, https://image.tmdb.org/t/p/w128_and_h128_face/xUObnJSvHrFPsIpoDmb1jiQZLq7.jpg 2x" alt="Gimly" />
                                        </a>
                                    </div>
                                    <div class="info">
                                        <div class="rating_wrapper">
                                            <h3>{review.user.name}</h3>
                                            <div class="rounded rating"><i class="fas fa-star pr-2" style={{color: "yellow"}}></i>{review.rating}</div>
                                        </div>
                                        <h5>Written on {review.createdAt}</h5>
                                        <ul class="nav justify-content-end">
                                            <li class="nav-item ">
                                                { userId === review.user.id ? <i class=" trash fas fa-trash" onClick={()=> deleteReview(review._id, review.comment)} ></i> : ''}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="teaser">
                                    <p>{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                  
            </div>
            {modalDisplay ? <Modal setModalDisplay={setModalDisplay}  movieId={id} movieName={title} /> : ''}
        </div>
    )
}

export default Reviews
