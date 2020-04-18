import React, {useRef, useState} from 'react'
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';


function Modal(props) {
    const [reviewData, setReviewData] = useState({id: '', name: '', movieId: '', rating: '', comment:''})
    const { id } = useParams();
    // console.log(props.movieId)
    const modalWrapper = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

    }
    const modalBackdrop = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.4)"
    }

    const modalBox = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '70%',
        width: '70%',
        overflowY: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.25)',
        zIndex: 101,
        padding: '40px',
        marginTop:'10px',
        marginBottom:'10px'
    }

    const close = {
        position: 'absolute',
        top: 0,
        right: '14px',
        fontSize: '23px',
        transform: 'rotate(45deg)',
        cursor: 'pointer',
       color:'black'
    }

    const modalForm={
        height:'100%',
    }

    const ratingNum = useRef();
    function handleInputChange(e){
        const { id, value } = e.target;
        setReviewData( { ...reviewData, [id]: value } );
        
        
    }

    async function postReview(e){
        e.preventDefault();
        props.setModalDisplay(false)
        let changedReview = {...reviewData};
        changedReview["id"] = id;
        changedReview["movieId"] = props.movieId;
        setReviewData(changedReview)
        console.log(reviewData)
        // const apiResult = await fetch('/api/user/register', userData);


    }
    return (
        <div className={'modal-wrapper'} style={modalWrapper}>
            <div className={'modal-backdrop'} style={modalBackdrop} />
            <div className={'modal-box'} style={modalBox}>
                <div class='close' onClick={() => props.setModalDisplay(false)} style={close}>
                    +
                </div>
                <div class='row' style={modalForm}>
    
                    <div class='col-12'>
                        <h3 >Add a Review and click on the Save Button!!</h3>
                        <form>
                            <div class="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    value={reviewData.name} 
                                    onChange={handleInputChange} 
                                    class="form-control" 
                                    id="name" 
                                    type="text" 
                                />
                            </div>
                            <div class="form-group">
                                <label htmlFor="rating">Rating</label>
                                <select class="form-control" id="rating" ref={ratingNum} value={reviewData.rating} onChange={handleInputChange}>
                                    <option value="1/10">1/10</option>
                                    <option value="2/10">2/10</option>
                                    <option value="3/10">3/10</option>
                                    <option value="4/10">4/10</option>
                                    <option value="5/10">5/10</option>
                                    <option value="6/10">6/10</option>
                                    <option value="7/10">7/10</option>
                                    <option value="8/10">8/10</option>
                                    <option value="9/10">9/10</option>
                                    <option value="10/10">10/10</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label htmlFor="comment">Your Review</label>
                                <textarea 
                                    value={reviewData.comment}
                                    class="form-control" 
                                    id="comment" 
                                    rows="3"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button class='btn btn-lg btn-primary' onClick={postReview}>Save Review</button>
                        </form>        
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal
