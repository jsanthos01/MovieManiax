import React from 'react'

function Modal(props) {
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
    return (
        <>
        { props.modalDisplay ? <div className={'modal-wrapper'} style={modalWrapper}>
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
                                <label for="formName">Email</label>
                                <input type="email" class="form-control" id="formName" placeholder="name@example.com" />
                            </div>
                            <div class="form-group">
                                <label for="formRating">Rating...</label>
                                <select class="form-control" id="formRating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="formReview">Your Review</label>
                                <textarea class="form-control" id="formReview" rows="3"></textarea>
                            </div>
                            <button class='btn btn-lg btn-primary' >Save Review</button>
                        </form>        
                    </div>
                </div>
            </div>
        </div>: ''}
        </>
    )
}

export default Modal
