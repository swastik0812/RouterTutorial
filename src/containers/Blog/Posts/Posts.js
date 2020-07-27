import React,{ Component } from "react";
import axios from '../../../axios'
import Post from '../../../components/Post/Post'
import './Posts.css';
import { Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost"
//import {Link} from 'react-router-dom';
class Posts extends Component {
    state={
        posts:[],
        
    }
    
    componentDidMount(){
        console.log(this.props)
        console.log('componentDidMount');
        axios.get('/posts')
        .then((response)=>{
            const posts =response.data.slice(0,4);
            const updatePost = posts.map((post=>{
                return {
                    ...post,
                    auther:'swastik'
                }
            }))
            this.setState({posts:updatePost})
            console.log(response);
        }).catch((error)=>{
            console.log(error)
          // this.setState({error:true})
        })
    }

   

    postSelectedHaandler = (id)=>{
        console.log(id);
    //* */ below both the method work properly
        // this.props.history.push({pathname : '/posts/'+ id})
        this.props.history.push('/posts/'+ id)

        
    }

    render(){
        console.log("render");
       

        let posts = <p style={{textAlign:'center'}}> Something went wrong!</p>
//the error property is removed from the state SO THERE IS NO ROLR OF IT HERE
        if(!this.state.error){
            posts = this.state.posts.map((post =>{
                return (
               // <Link to={"/posts/"+ post.id} key={post.id}>
                <Post 
                key={post.id}
                 title={post.title} 
                 auther={post.auther}
                 clicked={()=>this.postSelectedHaandler(post.id)}/>
                // </Link>
                 )
            }))
        }

        return( 
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>

            </div>
            
        )
    }

}

export default Posts; 