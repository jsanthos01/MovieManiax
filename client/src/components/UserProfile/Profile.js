import React, {useState, useEffect} from 'react'
import AvatarUpload from './AvatarUpload';



    function Profile() {
        const userid = localStorage.id;
        const [ profileInfo, setProfileInfo] = useState( {} )
        const [ showForm, setShowForm] = useState( false )
        // console.log(userid);
        

        async function loadAvatar(){  

            const profileData = await fetch(`/api/avatar/${userid}`).then( result => result.json() )  
            // console.log(i);
            // console.log(profileData)
            // let one = { ...profileInfo}  
            // one [ name ] = 'norma';
           
            
            setProfileInfo (profileData)
            
        }
        console.log(profileInfo)
        console.log(profileInfo.watchlist);
        // console.log(profileInfo.watchlist.slice(0,3));
        // let watchListArray = {... profileInfo}
        // console.log(watchListArray.watchlist[0])
        // console.log(watchListArray[watchlist])
        // console.log(watchListArray.map(movie => console.log(movie.title)));
       
        
        
        useEffect( function(){
            loadAvatar();
        }, [] );

        function uploadPic( e ){
            e.preventDefault();
    
            setShowForm(false);
        } 

    return (
        <div>
            <div class="row mt-4">
                <div class="col-lg-8">  
                    <div class="row">
                        <div class="col">
                                    <div class="row">
                                        <div class="col-4">
                                            <img src={profileInfo.profileImg} alt="..." class="img-thumbnail"/><br/>
                                            <button onClick={function(){ setShowForm(true) }}>edit</button>
                                        </div>    
                                        
                                        <div class="col-6">
                                            <h1>{profileInfo.name}</h1>
                                            <div>{profileInfo.createdAt}</div>
                                            { showForm ? <AvatarUpload uploadPic={uploadPic} /> : 
                                                <div >
                                                    <button onClick={function(){ setShowForm(true) }}>
                                                       edit</button>
                                                </div> }
                                        </div>
                                    </div>    
                            <div class="row">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-12">
                                            <h2>Your Watchlist</h2>
                                        </div>
                                        <div class="col">
    
                                            {/* {profileInfo.watchlist.slice(0,10).map(movie => 
                                                <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                    <img src={movie.image} alt="..." class="img-thumbnail"/>
                                                    <div ><a href="#" >{movie.title}</a></div>
                                                </div> 
                                            )} */}
                            
                                        </div>
                                    </div>
                                 </div>

                            
                            </div>
                            <div class="row">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-12">
                                            <h2>Your Favorites</h2>
                                        </div>
                                        <div class="col">
                                            <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                <img src="https://via.placeholder.com/150/000000/FFFFFF/" alt="..." class="img-thumbnail"/>
                                                <div >     <a href="#" >Movie name</a>    </div>                                    
                                            </div>
                                            <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                <img src="https://via.placeholder.com/150/000000/FFFFFF/" alt="..." class="img-thumbnail"/>
                                                <div >     <a href="#" >Movie name</a>    </div>                                    
                                            </div>
                                            <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                <img src="https://via.placeholder.com/150/000000/FFFFFF/" alt="..." class="img-thumbnail"/>
                                                <div >     <a href="#" >Movie name</a>    </div>                                    
                                            </div>
                                        </div>
                                    </div>
                                 </div>

                            
                            </div>
                            <div class="row">
                                 <div class="col"> 
                                    <div class="row">
                                        <div class="col-12">
                                            <h2>Recomded for you</h2>
                                        </div>
                                        <div class="col">
                                            <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                <img src="https://via.placeholder.com/150/000000/FFFFFF/" alt="..." class="img-thumbnail"/>
                                                <div >     <a href="#" >Movie name</a>    </div>                                    
                                            </div>
                                            <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                <img src="https://via.placeholder.com/150/000000/FFFFFF/" alt="..." class="img-thumbnail"/>
                                                <div >     <a href="#" >Movie name</a>    </div>                                    
                                            </div>
                                            <div class="card d-inline-flex m-2" style={{width: '10rem'}}>
                                                <img src="https://via.placeholder.com/150/000000/FFFFFF/" alt="..." class="img-thumbnail"/>
                                                <div >     <a href="#" >Movie name</a>    </div>                                    
                                            </div>
                                        </div>
                                    </div>
                                 </div>

                            
                            </div>
                            
                            
                        </div>
                    </div>
                    
                    
                </div>
                <div class="col-lg-4">col-4
                </div>
            </div>
        </div>
    )
}

export default Profile
