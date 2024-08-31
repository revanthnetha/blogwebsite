import { Hono } from 'hono';
import { cors } from 'hono/cors';


const app = new Hono();

app.use(cors());

app.post("/api/v1/signup", async (c)=>{

})

app.post("/api/v1/signin", async (c)=>{

})

app.post("/api/v1/blog", async (c)=>{

})

app.put("/api/v1/blog", async (c)=>{

})

app.get("/api/v1/blog/:id", async (c)=>{
  
})

export default app
