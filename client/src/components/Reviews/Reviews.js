import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Modal from './Modal'
import './Reviews.css'

function Reviews() {
    const {id, title} = useParams();
    const userId = localStorage.id
    const userName = localStorage.name;
    const [reviews, setReviews] = useState([]);
    const [profileImg, setProfileImg] = useState([]);
    const [modalDisplay, setModalDisplay] = useState(false);
    const [movieImage, setMovieImage] = useState("");
    const [formOpen, setFormOpen] = useState({});
    const [comment, setComment] = useState({name: "", userId: "", reviewId: "", content: ""});

    async function getSpecificReviews(){
        const getMoviesReviews = await fetch(`/api/specificReviews/${id}`).then(res => res.json());
        setReviews(getMoviesReviews);
        const getUserInfo = await fetch(`/api/UsersList`).then(res => res.json());
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
    
    function handleInputChange(e){
        let commentInfo = {...comment}
        commentInfo["userId"] = userId;
        commentInfo["name"] = userName;
        commentInfo["content"] = e.target.value;
        commentInfo["reviewId"] = e.target.id;
        setComment(commentInfo);
    }  

    async function postComment(idx){
        setFormOpen({id: idx, state: false});
        console.log(comment)
        const postReviewComment = await fetch('/api/reviewComment',
        {  
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        }).then( result=>result.json());

        console.log(postReviewComment);   
        getSpecificReviews();
    }

    async function postThumbsUp(idx){
        const thumbsUp = {
            reviewId: idx
        }
        const postThumbsUp = await fetch('/api/thumbsUp',
        {  
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(thumbsUp)
        }).then( result=>result.json());

        console.log(postThumbsUp);
        getSpecificReviews();
    }

    useEffect(function(){
        getSpecificReviews();
    }, [modalDisplay])

    return ( 
        <div className="result container mb-5">
            <div>
                <h1>{title}</h1>
                <button type="button" class="btn btn-md btn-outline-primary m-3"  onClick={getMovieImage}>Add a Review</button>
            </div>
            <div class="container">
                {reviews.map((review, idx) => 
                    <div class="card styleCard">
                        <div class="introSection">
                            <div class="avatar">
                                {profileImg.map(user => user._id === review.user.id ? <img class="avatar lazyload" src={user.profileImg} alt="userProfile" />: '')} 
                            </div>
                            <div class="info">
                                <div class="rating_wrapper">
                                    <h3>{review.user.name}</h3>
                                    <div class="rating">{review.rating}</div>
                                </div>
                                <h5>Written on {review.createdAt}</h5>
                                <ul class="nav justify-content-end">
                                    <li class="nav-item ">
                                        { userId === review.user.id ? <i class=" trash fas fa-trash" onClick={()=> deleteReview(review._id, review.comment)} ></i> : ''}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="commentSection">
                            <p>{review.comment}</p>
                        </div>
                        <ul class="nav justify-content-start">
                            <li class="nav-item ">
                                <i class="comments far fa-comment" onClick={() => setFormOpen({id: idx, state: true})}></i><span>{review.miniComments.length}</span>
                                <i class="thumbsUp far fa-thumbs-up" onClick={()=> postThumbsUp(review._id)}></i><span>{review.like}</span>
                            </li>
                            <div class="container">
                                {formOpen.id === idx && formOpen.state ? 
                                    <form>
                                        <div class="form-group">
                                            <textarea 
                                                value={comment.content}
                                                class="form-control" 
                                                id={review._id}
                                                rows="3"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <button type="submit" class="btn btn-outline-primary" style={{marginBottom: "20px"}} onClick={() => postComment(idx)}>Post Comment</button>
                                    </form> : ''  
                                }
                            </div>
                            {formOpen.id === idx && formOpen.state ? 
                                <div class="container">
                                    {review.miniComments.map(comment => 
                                        <div class="card styleCard">
                                            <div class="grouped">
                                                <div class="avatar">
                                                {profileImg.map(user => user._id === comment.userId ? <img class="avatar lazyload" src={user.profileImg} alt="userProfile" />: '')}
                                                    
                                                </div>
                                                <div class="info">
                                                    <h5>Written by {comment.userName}</h5>
                                                    <p>{comment.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>: ''
                            }
                        </ul>
                    </div>
                )}
                  
            </div>
            {modalDisplay ? <Modal setModalDisplay={setModalDisplay}  movieId={id} movieName={title} movieImage={movieImage} /> : ''}
        </div>
    )
}

export default Reviews