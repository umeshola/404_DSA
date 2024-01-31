import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
// import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import { useNavigate } from "react-router-dom";

import {
    useRecoilValue, useSetRecoilState,
  } from 'recoil';
import { userstate } from "../atoms/atom";

function DataLL(){
    const [question, setQ] = useState([]);

    const init = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/ll`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQ(response.data.ll);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{
            backgroundImage: "url('https://img.freepik.com/free-photo/modern-background-with-white-round-lines_23-2148811507.jpg?w=1380&t=st=1706698117~exp=1706698717~hmac=38d159510de0c8a0d6ee72485c743207ac5427ba52374aefbd37623deade3152')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh"}}>
            <div>
                <Topbar></Topbar>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 style={{ fontSize: "65px" }}>404 DSA Cracker</h1>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "100px",
                paddingRight: "100px",
            }}>
                <Link to="/admin/home" style={{ textDecoration: "none", color: "blue", transition: "text-decoration 0.3s" }}
                    onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                    onMouseLeave={(e) => e.target.style.textDecoration = "none"}>
                    <h2 style={{ fontSize: "35px", fontWeight: "lighter" }}>Topics</h2>
                </Link>
                <h2 style={{ fontSize: "35px", fontWeight: "lighter" }}>/LinkList</h2>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "100px",
                paddingRight: "100px",
                maxWidth: "1100px",
                margin: "0 auto",
            }}>
                <Card style={{ width: "100%", minWidth: "600px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" ,backgroundColor:"red"}}>
                    {/* <div style={{ fontSize: "25px", fontWeight: "lighter" }}>Status</div> */}
                    <div style={{ fontSize: "25px", fontWeight: "lighter" }}>Question</div>
                    <div style={{ fontSize: "25px", fontWeight: "lighter" }}>Links</div>
                </Card>
                {question.map(que => (
                    <Each key={que._id} que={que} />
                ))}
            </div>
        </div>
    );
}

function Each({ que }) {
    const han = () => {
        window.open(`${que.link}`, '_blank');
    };
    const boo=que.state;
        return (
        <Card style={{ width: "100%", minWidth: "600px", display: "flex", justifyContent: "space-between",marginTop:"15px" ,alignItems: "center", padding: "20px" ,backgroundColor:"lavender"}}>
            <div style={{ fontSize: "25px", fontWeight: "lighter" }}>{que.title}</div>
            <div>
            <Button variant="contained" color="success" style={{ borderRadius: "25px",fontWeight:"bold",fontFamily:"monospace" }} onClick={han}>Code</Button>
            </div>
        </Card>
         
         
    );
}
function Topbar(){
    const navigate = useNavigate()
    const name=useRecoilValue(userstate);
    const setUser = useSetRecoilState(userstate);
    if(name){
        return(
            <div style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                <div style={{fontSize:"30px",fontWeight:"bold"}}>404</div>
                <div style={{fontSize:"30px",fontWeight:"lighter"}}>aDmin</div>
                <div style={{display:"flex"}}>
                <h1 style={{fontSize:"17px",marginRight:"5px"}}>{name}</h1>
                <Button variant="contained" style={{borderRadius:"22px",fontWeight:"bold"}} onClick={()=>{
                     localStorage.setItem("token",null);
                     setUser(null);
                     navigate("/");
                }}>Logout</Button>
                </div>
            </div>
        );
    }
    else{
        return(
            <div style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                <div style={{fontSize:"30px",fontWeight:"bold"}}>404</div>
                <div style={{fontSize:"30px",fontWeight:"lighter"}}>aDmin</div>
                <div>
                <Button variant="contained" style={{borderRadius:"22px",fontWeight:"bold"}} onClick={()=>{
                     navigate("/admin/Signup")
                }}>Signup</Button>
                </div>
            </div>
        );
    }
}
export default DataLL;