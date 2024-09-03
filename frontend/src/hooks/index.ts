import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";


export interface blog {
    author: {
        name? : string;
        email? : string;
    }
    id: string;
    date: string;
    title: string;
    content: string;
  }

export const useBlogs = () =>{
    const [loading,setLoading] = useState(true);
    const [Blogs,setBlogs] = useState<blog[]>([]);
    useEffect(()=>{
        async function getAllBlogs(){
            try{
            const res = await axios.get(`${BACKEND_URL}/blog/bulk`);
            setLoading(false)
            setBlogs(res.data.posts);
            }catch(e){
                console.log(e);
            }
        }
        getAllBlogs();
    },[])

    return {
        loading,
        Blogs
    }
}

export const useBlog = ({id}:{id:string}) =>{
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<blog>()
    useEffect(()=>{
        async function getBlogById(id:string){
            try{
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BACKEND_URL}/blog/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.post);
            setBlog(res.data.post)
            setLoading(false)
        }catch(e){
            console.log(e);
        }
        }
        getBlogById(id);
    },[id])

    return {
        loading,
        blog
    }
}