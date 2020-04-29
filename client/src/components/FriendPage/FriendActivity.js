import React,{useState , useEffect} from 'react'
import { Link } from "react-router-dom";
import './Friends.css'

function FriendActivity() {

    const imgStyle={
        width: '20vh',
        height: '20vh',
        objectFit: 'cover'
    }
    
    const [ myFriendList, setMyFriendList ] = useState([]);
    const [ myFriendIds, setMyFriendIds ] = useState([]);
    const [ activityList, setActivityList ] = useState([]);
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const [formOpen, setFormOpen] = useState({});
    const [comment, setComment] = useState({name: localStorage.name, userId: localStorage.id, activityId: "", content: ""});
    const [ profileImg, setProfileImg] = useState( [] )

    let friendIds;
    async function loadFriend(){
        const userId = localStorage.id;
        const friendListResult = await fetch(`/api/friendList/${userId}`).then(result=>result.json());  
        setMyFriendList( friendListResult[0].friendList );
        friendIds = friendListResult[0].friendList.map(ids=>
            ids.friendId
            )
        setMyFriendIds(friendIds)
        const getUserInfo = await fetch(`/api/UsersList`).then(res => res.json());
        setProfileImg(getUserInfo);  

        loadActivity()  

    } 
    async function loadActivity(){
        const activityListResult = await fetch('/api/activityList',
        {  
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friendIds)
        }).then( result=>result.json());

        activityListResult.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
        setActivityList(activityListResult)
    }

    async function likeComment(idx){
        const activityLikes = {
            activityId: idx
        }

        const postLike = await fetch('/api/likeCommentActivity',
        {  
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activityLikes)
        }).then( result=>result.json());

        comment.content = '';
        loadFriend()

    }
    async function postComment(idx){
        setFormOpen({id: idx, state: false});
        const postComment = await fetch('/api/postCommentActivity',
        {  
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        }).then( result=>result.json());

        comment.content = '';
        loadFriend()
    }

    function handleInputChange(e){
        let commentInfo = {...comment}
        commentInfo["content"] = e.target.value;
        commentInfo["activityId"] = e.target.id;
        setComment(commentInfo);
    }  

    useEffect( function(){
        loadFriend()  
    }, []);
    return (
        <div class="row">
            <div class="col-lg-8">
            {activityList.slice(0,15).map((activity, idx)=>{
            
            switch (activity.activityType) {
            
            case "watchList":   
                return <div class="container movieHrzCard mx-auto" >
                <div class="mvHrzCrdDesc">
                    <p class="movieCard-title"><a class=" mr-2" href={"/friendProfile/" + activity.userId}><span style={{fontSize: '1.4rem'}}>{activity.userName}</span></a> {activity.activity}</p>
                </div>
                <div class="mvHrzCrdDesc row">
                    <div class="col-md-2">
                        <img src={`https://image.tmdb.org/t/p/w500/${activity.movie.movieImg}`} class="hrCdImg" alt="movie poster" style={imgStyle}/>
                    </div>
                    <div class="col-md-10">
                        <p class="movieCrdTitle">{activity.movie.movieName}</p>
                        <a class="btn myBtnPink mr-2" href={"/movieDetails/" + activity.movie.movieId}> View Detail</a>
                        <p >{activity.createdAt}</p>
                    </div>
                </div>
                <div class="row container">
                    <button class="btn myBtnPink mr-2" onClick={() => setFormOpen({id: idx, state: true})}><i class="far fa-comments"></i><span>{activity.comment.length}</span></button>
                    <button class="btn myBtnPink mr-2" onClick={()=>likeComment(activity._id)} ><i class="far fa-thumbs-up"></i><span>{activity.likes}</span></button>
                </div>
                <div class="container mt-3">
                    {formOpen.id === idx && formOpen.state ? 
                    <div>
                        <form>
                            <div class="form-group">
                                <textarea 
                                    value={comment.content}
                                    class="form-control" 
                                    id={activity._id}
                                    rows="3"
                                    onChange={handleInputChange}/>
                            </div>
                            <button type="submit" class="btn btn-outline-primary" style={{marginBottom: "20px"}} onClick={() => postComment(idx)}>Post Comment</button>
                        </form> 
                    <div>{activity.comment.map(comment=> 
                        <div class="card mt-3" style={{color: "black"}}>
                            <div class="col-md-8">
                                <a class="movieCrdTitle mr-2" href={"/friendProfile/" + comment.userId}>{comment.userName}</a>
                                <p>{comment.content}</p>
                                <p >{comment.createdAt}</p>
                            </div>
                        </div>
                        )}
                    </div>

                </div>: ''  
                    }
                </div>
            </div>;

            case "favouritesList": return <div class="container movieHrzCard mx-auto" >
                <div class="mvHrzCrdDesc">
                    <p class="movieCrdTitle"></p>  
                    <p class="movieCard-title"><a class=" mr-2" href={"/friendProfile/" + activity.userId}><span style={{fontSize: '1.4rem'}}>{activity.userName}</span></a> {activity.activity}</p>
                </div>
                <div class="mvHrzCrdDesc row">
                    <div class="col-md-2">
                        <img src={`https://image.tmdb.org/t/p/w500/${activity.movie.movieImg}`} class="hrCdImg " alt="movie poster" style={imgStyle}/>
                    </div>
                    <div class="col-md-8">
                        <p class="movieCrdTitle">{activity.movie.movieName}</p>
                        <a class="btn myBtnPink mr-2" href={"/movieDetails/" + activity.movie.movieId}> View Detail</a>
                        <p>{activity.createdAt}</p>
                    </div>
                </div>
                <div class="row container">
                    <button class="btn myBtnPink mr-2" onClick={() => setFormOpen({id: idx, state: true})}><i class="far fa-comments"></i><span>{activity.comment.length}</span></button>
                    <button class="btn myBtnPink mr-2" onClick={()=>likeComment(activity._id)}><i class="far fa-thumbs-up"></i><span>{activity.likes}</span></button>
                </div>
                <div class="container mt-3">
                    {formOpen.id === idx && formOpen.state ? 
                    <div>
                    <form>
                        <div class="form-group">
                            <textarea 
                                value={comment.content}
                                class="form-control" 
                                id={activity._id}
                                rows="3"
                                onChange={handleInputChange}/>
                        </div>
                        <button type="submit" class="btn btn-outline-primary" style={{marginBottom: "20px"}} onClick={() => postComment(idx)}>Post Comment</button>
                    </form> 
                <div>{activity.comment.map(comment=> 
                    <div class="card mt-3" style={{color: "black"}}>
                        <div class="col-md-8">
                            <a class="movieCrdTitle mr-2" href={"/friendProfile/" + comment.userId}>{comment.userName}</a>
                            <p>{comment.content}</p>
                            <p >{comment.createdAt}</p>
                        </div>
                    </div>
                    )}
                </div>

            </div>: ''  
                    }
                </div>
            </div>;
            case "friendList":  return <div class="container movieHrzCard mx-auto" >
                <div class="mvHrzCrdDesc">
                    <p class="movieCard-title"><a class=" mr-2" href={"/friendProfile/" + activity.userId}><span style={{fontSize: '1.4rem'}}>{activity.userName}</span></a> {activity.activity}</p>
                </div>
                <div class="mvHrzCrdDesc row">
                    <div class="col-md-2">
                        {profileImg.map(user => user._id === activity.friend.friendId ? <img class="hrCdImg" style={imgStyle} src={user.profileImg} />: "") }
                    </div>
                    <div class="col-md-8">
                        <p class="movieCrdTitle">{activity.friend.friendName}</p>
                        <a class="btn myBtnPink mr-2" href={"/friendProfile/" + activity.friend.friendId}> View Profile</a>
                        <p >{activity.createdAt}</p>
                    </div>
                </div>
                <div class="row container">
                    <button class="btn myBtnPink mr-2" onClick={() => setFormOpen({id: idx, state: true})}><i class="far fa-comments"></i><span>{activity.comment.length}</span></button>
                    <button class="btn myBtnPink mr-2" onClick={()=>likeComment(activity._id)} ><i class="far fa-thumbs-up"></i><span>{activity.likes}</span></button>
                </div>
                <div class="container mt-3">
                    {formOpen.id === idx && formOpen.state ? 
                    <div>
                    <form>
                        <div class="form-group">
                            <textarea 
                                value={comment.content}
                                class="form-control" 
                                id={activity._id}
                                rows="3"
                                onChange={handleInputChange}/>
                        </div>
                        <button type="submit" class="btn btn-outline-primary" style={{marginBottom: "20px"}} onClick={() => postComment(idx)}>Post Comment</button>
                    </form> 
                <div>{activity.comment.map(comment=> 
                    <div class="card mt-3" style={{color: "black"}}>
                        <div class="col-md-8">
                            <a class="movieCrdTitle mr-2" href={"/friendProfile/" + comment.userId}>{comment.userName}</a>
                            <p>{comment.content}</p>
                            <p >{comment.createdAt}</p>
                        </div>
                    </div>
                    )}
                </div>

            </div>
                    : ''  
                    }
                </div>
            </div>;
            case "reviewList":  return <div class="container movieHrzCard mx-auto" >
                <div class="mvHrzCrdDesc">
                    <p class="movieCard-title"> <a class=" mr-2" href={"/friendProfile/" + activity.userId} ><span style={{fontSize: '1.4rem'}}>{activity.userName}</span></a>{activity.activity}</p>
                </div>
                <div class="mvHrzCrdDesc row">
                    <div class="col-md-2">
                        <img src={`https://image.tmdb.org/t/p/w500/${activity.movie.movieImg}`} class="hrCdImg" alt="movie poster" style={imgStyle}/>
                    </div>
                    <div class="col-md-8">
                        <p class="movieCrdTitle">{activity.movie.movieName}</p>
                        <p class="">{activity.review.comment}</p>
                        <p class="">{activity.review.rating}</p>
                        <a class="btn myBtnPink mr-2" href={"/movieDetails/" + activity.movie.movieId}> View Detail</a>
                        <p >{activity.createdAt}</p>
                    </div>
                </div>
                <div class="row container">
                    <button class="btn myBtnPink mr-2" onClick={() => setFormOpen({id: idx, state: true})}><i class="far fa-comments"></i><span>{activity.comment.length}</span></button>
                    <button class="btn myBtnPink mr-2" onClick={()=>likeComment(activity._id)} ><i class="far fa-thumbs-up"></i><span>{activity.likes}</span></button>
                </div>
                <div class="container mt-3">
                    {formOpen.id === idx && formOpen.state ? 
                    <div>
                    <form>
                        <div class="form-group">
                            <textarea 
                                value={comment.content}
                                class="form-control" 
                                id={activity._id}
                                rows="3"
                                onChange={handleInputChange}/>
                        </div>
                        <button type="submit" class="btn btn-outline-primary" style={{marginBottom: "20px"}} onClick={() => postComment(idx)}>Post Comment</button>
                    </form> 
                <div>{activity.comment.map(comment=> 
                    <div class="card mt-3" style={{color: "black"}}>
                        <div class="col-md-8">
                            <a class="movieCrdTitle mr-2" href={"/friendProfile/" + comment.userId}>{comment.userName}</a>
                            <p>{comment.content}</p>
                            <p >{comment.createdAt}</p>
                        </div>
                    </div>
                    )}
                </div>

            </div> : ''  
                    }
                </div>
            </div>;
                default:   return "";
                }
            }
            )}
            </div>
            <div class="col-lg-4">
                {myFriendList.map(friend=>
                <a class=" mr-2" href={"/friendProfile/" + friend.friendId} style={{display: "block"}}> 
                {profileImg.map(user => user._id === friend.friendId ? <img class="hrCdImg" style={imgStyle} src={user.profileImg} />: "") }

                {/* <img src={friend.image} class="hrCdImg" alt="profile poster" style={imgStyle}/>  */}
                </a>
                    )}
            </div>
        </div>
    )
}

export default FriendActivity
