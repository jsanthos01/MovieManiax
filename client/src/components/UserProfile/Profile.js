import React, {useState, useEffect} from 'react'
import AvatarUpload from './AvatarUpload';
import { Link } from "react-router-dom";
import Bio from './Bio';
import './Profile.css'

function Profile() {
    const userid = localStorage.id;
    const [ profileInfo, setProfileInfo] = useState( {} )
    const [ watchList, setwatchList] = useState( [] )
    const [ favoriteList, setFavoriteList] = useState ( [] )
    const [ friendList, setFriendList] = useState ( [] )
    const [ showForm, setShowForm] = useState( false )
    const [ newDate, setNewDate] = useState( '' )
    const [ bioForm, setBioForm] = useState( false )
    const [ profileImg, setProfileImg] = useState( [] )
    const [ myReviews, setMyReviews] = useState( [] )    

    async function loadAvatar(){  
        const profileData = await fetch(`/api/avatar/${userid}`).then( result => result.json() );
        setProfileInfo (profileData)
        setwatchList( profileData.watchlist);
        setFavoriteList( profileData.favourites )
        setFriendList( profileData.friendList)

        const getUserInfo = await fetch(`/api/UsersList`).then(res => res.json());
        setProfileImg(getUserInfo);  

        setMyReviews( profileData.myReviews)
        let date = new Date(profileData.createdAt)
        let newDate = date.toString().substring(4, 15)
        setNewDate( newDate )  
    }

    useEffect( function(){
        loadAvatar();
    }, [bioForm, showForm] );

    function uploadPic( e ){
        e.preventDefault();
        setShowForm(false);
    } 

    function handleBioSubmit( e ){
        e.preventDefault();
        setBioForm(false);
    }

    return (
        <div class="profileContainer container-fluid">
            <div class="row " >
                <div class="col-lg-8 specialContainer ">  
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row">
                                <div class="col-lg-4 imageHolder">
                                    <img src={profileInfo.profileImg} style={{minHeight:'70px', height:'120px'}} alt="..." class="img-thumbnail"/><br/>
                                    { showForm ? <AvatarUpload uploadPic={uploadPic} /> : 
                                    <div >
                                        <button class="btn btnStyle" onClick={function(){ setShowForm(true) }}>
                                            Edit Profile Pic</button>
                                    </div> }
                                </div>    
                                
                                <div class="col-lg-7 ">
                                    <div class="col-lg-12">
                                        <h1 class="profileh1" style={{padding: "0px"}} >{profileInfo.name}</h1>
                                        <small class="text-muted ml-4">Movie Maniax member since {newDate}</small>
                                    </div>
                                    
                                    <div class="col-lg-12 col-12">
                                        <form>
                                            { bioForm ? <Bio handleBioSubmit={handleBioSubmit} /> : 
                                            <button style={{backgroundColor: 'transparent', borderStyle: 'none', color: 'white'}}  onClick={() => { setBioForm(true) }}><p class="text-left">{profileInfo.bio}<span class="pl-2 "><i class="fas fa-pencil-alt pencil"></i></span></p></button>}
                                        </form>    
                                    </div>
                                </div>
                                
                            </div>  
     
                            <div class="col-12 mt-4" style={{ border: '1px solid #2ec3d6'}}></div>                

                            <div class="row mt-4">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-12 importantTitles">
                                            <h3 style={{display: 'inline', marginRight:'5px'}}>Your Watchlist  </h3><span><i class="fas fa-bookmark iconsStyle"></i></span>
                                        </div>

                                        <div class="cardContainer col mt-4 mb-4">
                                            { watchList.slice(0, 10).map(movie => 
                                                <div class="card cardStyle d-inline-flex m-2" style={{width: '10rem'}}>
                                                {movie.image && movie.image !== "null" ? <img class="" style={{minHeight:'70px', height:'160px', objectFit: 'cover'}} src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt={movie.title} /> : <img class="card-img-top" src='https://via.placeholder.com/150/000000/FFFFFF/'  /> }
                                                <div class="text-center">{movie.title}</div>
                                            </div>)}
                                        </div>
                                        { watchList.length !== 0 ? <div class="col-12 more"><Link to={`/watchlist/${userid}`} class="ml-2 " style={{color:'white'}}>More</Link></div> : <div class="col-12">Add movies to your watch list</div>}
                                    </div>
                                 </div>              
                                <div class="col-12 mt-4" style={{ border: '1px solid #2ec3d6'}}></div>                
                            </div>
                            <div class="row mt-4">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-12 importantTitles">
                                            <h3 style={{display: 'inline', marginRight:'5px'}}>Your Favorites </h3><span><i class="fas fa-heart iconsStyle"></i></span>
                                        </div>
                                        <div class="cardContainer col mt-4 mb-4">

                                            { favoriteList.slice(0, 10).map(movie => 
                                                <div class="card cardStyle d-inline-flex m-2" style={{width: '10rem'}}>
                                                {movie.image && movie.image !== "null"? <img class="" style={{minHeight:'70px', height:'160px', objectFit: 'cover'}} src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt={movie.title} /> : <img class="card-img-top" src='https://via.placeholder.com/150/000000/FFFFFF/'  /> }
                                                <div class="text-center">{movie.title}</div>                                    
                                            </div> )}
                                            
                                        </div>
                                        { favoriteList.length !== 0 ? <div class="col-12 more"><Link to={`/favourites/${userid}`} class="ml-2 " style={{color:'white'}}>More</Link></div> : <div  class="col-12">List out your favorite movies! </div>}
                                    </div>
                                 </div>
                                 <div class="col-12 mt-4" style={{ border: '1px solid #2ec3d6'}}></div>                
                            </div>
                            <div class="row mt-4">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-lg-12 importantTitles">
                                            <h3 style={{display: 'inline', marginRight:'5px'}}>Your Reviews </h3><span><i class="fas fa-comments iconsStyle"></i></span>
                                        </div>
                                        <div class="col mt-4 mb-4 ">
                                            {myReviews.slice(0, 10).map(item => 
                                            <div class="row reviewContainer">
                                                    <div class="col-lg-8">
                                                        <div class="row">
                                                            <h4 class="col-12 mt-2">{item.movieName}</h4>
                                                            <div class="col-lg-12">
                                                                <p>
                                                                {item.comment}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>)}
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="row justify-content-center">
                        <div class="col-8">
                            <h4 class="text-center">Quick Links</h4>
                            <div class="row">
                                <div class="col">
                                    <div class="text-center "> <Link to={`/watchlist/${userid}`} class="textStyle">Watchlist</Link></div>
                                    <div class="text-center "><Link to={`/favourites/${userid}`} class="textStyle">Favorites</Link></div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-8 mt-4">
                            <h4 class="text-center">Followers</h4>
                            <div class="row justify-content-center">
                                <div class="col">   
                                    { friendList.slice(0, 10).map(friend => 
                                        <div>
                                            <div class="mt-4">
                                                <div style={{display: 'block', width:'60px', margin: "0 auto"}}>
                                                    {profileImg.map(user => user._id === friend.friendId ? <img class="imgStyling"  src={user.profileImg} alt={friend.name} />: "") }
                                                </div>    
                                        </div>
                                            <div class="text-center"><Link to={`/friendProfile/${friend.friendId}`} class="textStyle">{friend.name}</Link></div>                                    
                                        </div> )
                                    }
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile