import React ,{useState,useEffect} from 'react'
import '../style/affectationglobal.css'
import axios from   'axios' ;

export default function AffecterParPromotion() {
    const [level, setlevel] = useState() ;
    const [listbatiment, setlistbatiment] = useState([]);
    const [batiment, setbatiment] = useState();
    const [msg, setmsg] = useState();
    const [refresh, setrefresh] = useState(true)
    function envoyer(){
       axios.post("http://localhost:3307/affectationData",{
           level : level ,
           batiment: batiment 
       })
    };  
    useEffect(() => {
       axios.get("http://localhost:3307/affectationBatiment").
       then(res=>{
           setlistbatiment(res.data);
       })
    }, [refresh])
    return (
        <div>
            <form action="">
                    <select name="promotion" id="" value={level} onChange={(e)=>setlevel(e.target.value)}>
                        <option value="1">1ere anne</option>
                        <option value="2">2ere anne</option>
                        <option value="3">3ere anne</option>
                    </select>
                    <select action="" value={batiment} onChange={(e)=>setbatiment(e.target.value)}>
                        {listbatiment.map((bat,i)=>{
                        return(
                                <option value={listbatiment[i].IdBatiment}> {listbatiment[i].NomBatiment} </option>
                        );
                        })}
                    </select>
                    <button onClick={()=>envoyer()}>Affecter</button>
            </form>
        </div>
    )
}
