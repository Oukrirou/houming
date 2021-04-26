import React from 'react'
import style from '../style/profile.module.css'
import profile from '../images/profile.PNG'
import {useState} from 'react' 


export default function Profile() {
   const [buttonText , setButtonText ] = useState("Edit");
   // the information management : 
   const inf = {
        nom : "Oukrirou" ,
        prenom : "oukrirou" ,
        matricle : "123456" ,
        email : "ayouboukrirou@gmail.com" ,
        tel : "6574934875" ,
        Promo : " 2 eme annee" ,
        filier : "g info " ,
        gender : "M" ,
        password : "jlkfdkfhg" ,
        departement : "D" ,
        Etage : "2" ,
        chambre : "342"
      } 
    const changeText = () => {
        if (buttonText==="Edit") {
          setButtonText("Enregistrer");
        }
        else {
          setButtonText("Edit") ;
        }
   }  

  return (
        <> 
        <div className={style.profile} >  
            <button className={style.edit} onClick={() => changeText()} > {buttonText} </button>
            <div className={style.container} >
                <img src= {profile} alt=""/>
             </div>
            <div className={style.infos} >
              <div className={style.labels}  >
                <label htmlFor="nom"> <strong>Nom : </strong></label>
                <label htmlFor="Prenom"><strong>Prenom :</strong> </label>
                <label htmlFor="Matricule"> <strong>Maticule</strong> </label>
                <label htmlFor="Email"> <strong>Email : </strong> </label>
                <label htmlFor="Tel"> <strong>Tel</strong> </label>
                <label htmlFor="Promotion"> <strong>Promotion : </strong> </label>
                <label htmlFor="Filiere"><strong>Filiere : </strong> </label>
                <label htmlFor="Sexe"> <strong>Sexe :</strong> </label>
                <label htmlFor="Motdepasse"> <strong>Mot de Passe </strong> </label>
                <label htmlFor="batiment"> <strong> Batiment :</strong> </label>
                <label htmlFor="Etage"> <strong> Etage :  </strong> </label>
                <label htmlFor="chambre"> <strong>Chambre : </strong> </label>
              </div>
              <div  className={style.inputs}  >
                <input name="nom" type="text" value={inf.nom}/>
                <input name="Prenom" type="text" value={inf.prenom}  />
                <input name="Matricule" type="text" value={inf.matricle}/>   
                <input name="Email" type="text" value={inf.email}/>               
                <input name="Tel" type="text" value={inf.tel}   />   
                <input name="Promotion" type="text" value={inf.Promo} />       
                <input name="Filiere" type="text" value={inf.filier} />   
                <input name="Sexe" type="text" value={inf.gender}  />
                <input name="Motdepasse" type="password" value={inf.password}  />
                <input name="Batiment" type="text" value={inf.departement} />
                <input name="Etage" type="text" value={inf.Etage}  />
                <input name="Chambre" type="text" value={inf.chambre}  />
              </div>  
            </div>
        </div>
      </>
    )
}
