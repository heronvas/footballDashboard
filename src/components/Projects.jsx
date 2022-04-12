import {React, useState, useEffect } from "react";
import styled from "styled-components";
import AvatarImage from "../assets/avatarImage2.jpg";
import AvatarImage2 from "../assets/avatarImage3.jpg";
import { cardShadow, hoverEffect, themeColor } from "../utils";
import ".././App.css";
import axios from "axios";


function Projects() {

  const baseURL = "https://football-flask.herokuapp.com/predict";
  //const baseURL = "http://127.0.0.1:5000/predict";


  const [selectedClient,setSelectedClient] = useState("ManUtd");
  const [post, setPost] = useState(null);
  const [players, setdata] = useState(["NA","NA","NA","NA","NA","NA","NA","NA","NA","NA","NA"]);
  const [rating, setrate] = useState(["NA","NA","NA","NA","NA","NA","NA","NA","NA","NA","NA"]);
  const [opponents, setOpp] = useState([]);
  const [opponentRating, setOppRating] = useState({});
  var dict = { "ManUtd" : 7 , 
    "Chelsea" : 9 ,
    "Liverpool" : 5 ,
    "SC" : 2 ,
  };

  var dict1 = {}
  var playergroup = []
  var ratinggroup = []

  useEffect(() => {
    axios.get("https://football-flask.herokuapp.com/tables/Team_Ratings").then((response) => {
      console.log(response.data)

      for (var i=0; i < response.data.length; i++){
        dict1[response.data[i][0]] = response.data[i][1] 
        playergroup.push(response.data[i][0])
        
      }

      playergroup = Object.keys(dict1)
      setOpp(playergroup)
      setOppRating(dict1)
      
      // console.log(opponentRating["Sampdoria"])
      
    })

    axios.post("https://football-flask.herokuapp.com/").then((response) => {
      console.log("hellos")
      console.log(response.data)
    })

  }, []);

  


  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
}

async function predicts(values) {
  console.log(values)
  await axios.get(`${baseURL}/${values}`).then((response) => {
    setPost(response.data);
    console.log(response.data)

    // const myJSON = JSON.stringify(response.data);

    // console.log(myJSON)

    const objs = Object.keys(response.data)
    const rate = Object.values(response.data)
    console.log(objs)
    setdata(objs);
    setrate(rate);
    // console.log(objs["Ederson"])


  });
}


  return (
    <YourProjects>
      <select class = "selector" value={selectedClient} onChange={handleSelectChange}>
        
    {
      opponents.map((item) =>  <option value={item}>{item}</option>)
    }
    </select>
    
    {/* <select value={selectedClient} onChange={handleSelectChange}>
    {dict1.map((opp, val) => (
      <option value={val}>{opp}</option>
    ))}
    </select> */}
      <button class="butn" onClick={() => predicts(opponentRating[selectedClient])}>Predict</button>
      <Project>

      <div class="wrapper">
<div class="campo">
     <div class="semi1"></div>
     <div class="semi2"></div>
     <div class="divisoria"></div>
     <div class="interior"></div>
     <div class="penalty"></div>           
     <div class="gk">{String(rating[0]).slice(0,3)}</div>
     <p class="gktxt">{players[0]}</p>
     <div class="lb">{String(rating[1]).slice(0,3)}</div>
     <p class="lbtxt">{players[1]}</p>
     <div class="rb">{String(rating[2]).slice(0,3)}</div>
     <p class="rbtxt">{players[2]}</p>
     <div class="lwb">{String(rating[3]).slice(0,3)}</div>
     <p class="lwbtxt">{players[3]}</p>
     <div class="dm">{String(rating[4]).slice(0,3)}</div>
     <p class="dmtxt">{players[4]}</p>
     <div class="rwb">{String(rating[5]).slice(0,3)}</div>
     <p class="rwbtxt">{players[5]}</p>
     <div class="lm">{String(rating[6]).slice(0,3)}</div>
     <p class="lmtxt">{players[6]}</p>
     {/* <div class="cm"></div> */}
     <div class="rm">{String(rating[7]).slice(0,3)}</div>
     <p class="rmtxt">{players[7]}</p>
     <div class="amr">{String(rating[8]).slice(0,3)}</div>
     <p class="amrtxt">{players[8]}</p>
     {/* <div class="am"></div> */}
     <div class="aml">{String(rating[9]).slice(0,3)}</div>
     <p class="amltxt">{players[9]}</p>
     {/* <div class="wl"></div> */}
     <div class="cf">{String(rating[10]).slice(0,3)}</div>
     <p class="cftxt">{players[10]}</p>
     {/* <div class="wr"></div> */}
     {/* <div class="st"></div> */}
  </div>
 </div>
      </Project>
      
    </YourProjects>
  );
}

const YourProjects = styled.div`
  height: 70%;
  background-color: white;
  margin: 0;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: max-content;
    width: 75%;
    margin-top: 1rem;
  }
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
`;
const Avatar = styled.div`
  img {
    height: 4rem;
    width: 4rem;
    border-radius: 4rem;
  }
`;
const Detail = styled.div`
  margin-left: 1rem;
`;
const Title = styled.h3`
  font-weight: 500;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    font-size: 1rem;
  }
`;
const SubTitle = styled.h5`
  font-weight: 300;
`;
const AllProjects = styled.h5`
  text-align: end;
  color: ${themeColor};
  cursor: pointer;
`;

export default Projects;
