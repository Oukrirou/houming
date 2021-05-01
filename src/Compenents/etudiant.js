import React ,{useState} from 'react'
import '../style/etudiant.css'
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Etudiant() {
  const [users, setusers] = useState([])
  const [niv,setniv] = useState("1 ere")
  const configuration = {
    headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"        
    }
    }
    function firstyear(niveau,nivi){
        axios.get("http://localhost:3307/etudiant/"+ niveau +"/",configuration )
        .then(res =>{
            setniv(nivi)
            setusers(res.data)
        });
    };    
 
  return (
       <div className="etudiant">
            <div className="niveau">
                <button className="pre" onClick={()=>{firstyear("first","1 ere")}}>1 ere annee</button>
                <button className="deux" onClick={()=>{firstyear("second","2 eme")}}>2 eme annee</button>
                <button className="trois" onClick={()=>{firstyear("third","3 eme")}}>3 eme annee</button>
            </div>
            <div className="list">
            <p className="promo" >  Promotion {niv} annee !  </p>
            <table>
                  <tr className="attribut" >
                    <th className="profl"  > </th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Matricule</th>
                    <th>Batiment</th>
                    <th>Chambre</th>
                  </tr>
                  {users.map((user,i)=>{
                      const url ="/profiter/"+ i +"/" ;
                      return(
                          <tr>
                          <Link to={url}>
                             <td className="profl" ><PersonIcon/> </td> 
                          </Link> 
                          <td>{users[i].Nom}</td>
                          <td>{users[i].Prenom}</td>
                          <td>{users[i].Matricule}</td>
                          <td>{users[i].NomBatiment}</td>
                          <td>{users[i].NumChambre} </td>
                        </tr>
                      );
                    })}
            </table>   
            </div>   
        </div>
    )
}
