import React,{useState , useEffect} from 'react'
import { Link } from "react-router-dom";

function FriendActivity() {

    const imgStyle={
        width: '20vh',
        height: '20vh',
        objectFit: 'cover'
    }
    const style = {
        messageStyle: {
            width: '80%',
            border: 'none',
            background: '#26b3b8',
            color: 'white',
            position: 'sticky',
            top: '0',
            left: '0',
            zIndex: '10',
            margin: '0 auto'
        }}

    const [ myFriendList, setMyFriendList ] = useState([]);
    const [ myFriendIds, setMyFriendIds ] = useState([]);
    const [ activityList, setActivityList ] = useState([]);

    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );

    let friendIds;
    async function loadFriend(){
        const userId = localStorage.id;

        console.log(`***loading friendList in activity page: `);
        const friendListResult = await fetch(`/api/friendList/${userId}`).then(result=>result.json());  
        setMyFriendList( friendListResult[0].friendList );
        console.log( '104 friendListResult: ', friendListResult[0].friendList )
        friendIds = friendListResult[0].friendList.map(ids=>
            ids.friendId
            )
        setMyFriendIds(friendIds)
        console.log('friendIds: ', friendIds)
        loadActivity()  

        // console.log('myFriendIds: ', myFriendIds)
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
        console.log('friends activity: ', activityListResult)

        activityListResult.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)

        setActivityList(activityListResult)
    }

    async function showCommentForm(){
        console.log('is comment form working?')
        setAlertMessage( { type: 'success', message: 'show something' } );

    }
    async function likeComment(){
        console.log('is like working?')

    }

    useEffect( function(){
        loadFriend()  
        // loadActivity()  
    }, []);
    
    return (
        <div class="row">

            <div class="col-lg-8">
            {activityList.map(activity=>{
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
                    <button class="btn myBtnPink mr-2" onClick={()=>showCommentForm(activity._id)}><i class="far fa-comments"></i><span>{activity.likes} 1</span></button>
                    <button class="btn myBtnPink mr-2" onClick={()=>likeComment(activity._id)} ><i class="far fa-thumbs-up"></i></button>
                </div>
                <div style={style.messageStyle} className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
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
                        <p >{activity.createdAt}</p>

                    </div>
                </div>
                <div class="row container">
                    <button class="btn myBtnPink mr-2" onClick={()=>showCommentForm(activity._id)}><i class="far fa-comments"></i><span>{activity.likes} 1</span></button>
                    <button class="btn myBtnPink mr-2" onClick={()=>likeComment(activity._id)} ><i class="far fa-thumbs-up"></i></button>
                </div>
            </div>;
            case "friendList":  return <div class="container movieHrzCard mx-auto" >
                <div class="mvHrzCrdDesc">
                    <p class="movieCard-title"><a class=" mr-2" href={"/friendProfile/" + activity.userId}><span style={{fontSize: '1.4rem'}}>{activity.userName}</span></a> {activity.activity}</p>
                </div>
                <div class="mvHrzCrdDesc row">
                    <div class="col-md-2">
                        <img src={`${activity.friend.friendImg}`} class="hrCdImg " alt="friend poster" style={imgStyle}/>
                    </div>
                    <div class="col-md-8">
                        <p class="movieCrdTitle">{activity.friend.friendName}</p>
                        <a class="btn myBtnPink mr-2" href={"/friendProfile/" + activity.friend.friendId}> View Profile</a>
                        <p >{activity.createdAt}</p>

                    </div>
                </div>
                <div class="row container">
                    <button class="btn myBtnPink mr-2" onClick={()=>showCommentForm(activity._id)}><i class="far fa-comments"></i><span>{activity.likes} 1</span></button>
                    <button class="btn myBtnPink mr-2" onClick={()=>likeComment(activity._id)} ><i class="far fa-thumbs-up"></i></button>
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
                    <button class="btn myBtnPink mr-2" onClick={()=>showCommentForm(activity._id)}><i class="far fa-comments"></i><span>{activity.likes} 1</span></button>
                    <button class="btn myBtnPink mr-2" onClick={()=>likeComment(activity._id)} ><i class="far fa-thumbs-up"></i></button>
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
                <img src={friend.image} class="hrCdImg" alt="profile poster" style={imgStyle}/>
                    </a>
                    )}
            </div>
        </div>
    )
}

export default FriendActivity
