import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Modal from './Modal'
import './Reviews.css'

function Reviews() {
    const {id, title} = useParams();
    const userId = localStorage.id
    const [reviews, setReviews] = useState([]);
    const [reviewUserId, setReviewUserId] = useState([]);
    const [profileImg, setProfileImg] = useState([])
    const [modalDisplay, setModalDisplay] = useState(false);
    const [movieImage, setMovieImage] = useState("");
    async function getSpecificReviews(){
        const getMovies = await fetch(`/api/specificReviews/${id}`).then(res => res.json());
        // const getProfileImage = await fetch(`/api/userImage/${id}`).then(res => res.json());
        setReviews(getMovies);
        getMovies.map(review =>reviewUserId.push(review.user.id));

        const getUserInfo = await fetch(`/api/UsersList`).then(res => res.json());
        console.log(getUserInfo);
        setProfileImg(getUserInfo);   
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

    async function getMovieImage(){
        const apiMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5b4dbf95cc35d2e911560cca64385e60&language=en-US`).then( result=>result.json() );
        console.log(apiMovie)
        setMovieImage(apiMovie.poster_path)
        // console.log(movieImage)
        setModalDisplay(true)
    }

    useEffect(function(){
        getSpecificReviews();
    }, [modalDisplay])

    console.log(reviews)
    return ( 
        <div className="result container mb-5">
            <div>
                <h1>{title}</h1>
                <button type="button" class="btn btn-sm btn-outline-primary m-3"  onClick={getMovieImage}>Add a Review</button>
            </div>
            <div class="container">
                {reviews.map(review => 
                    <div class="content">
                        <div class="inner_content">
                            <div class="card styleCard">
                                <div class="grouped">
                                    <div class="avatar">
                                        {profileImg.map(user => user._id === review.user.id ? <img class="avatar lazyload" src={user.profileImg} alt="Gimly" />: '')}
                                        
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
            {modalDisplay ? <Modal setModalDisplay={setModalDisplay}  movieId={id} movieName={title} movieImage={movieImage} /> : ''}
        </div>
    )
}

export default Reviews
