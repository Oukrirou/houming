import React from 'react'
import '../style/etudiant.css'
import PersonIcon from '@material-ui/icons/Person';

export default function etudiant() {
    return (
       
       <div className="etudiant">
           
            <div className="niveau">
                <button className="pre" >1 ere annee</button>
                <button className="deux" >2 eme annee</button>
                <button className="trois"  >3 eme annee</button>
            </div>
            <hr/>
            <p className="promo" >  Promotion 1 ere annee !  </p>
            <table>
                  <tr>
                    <th className="profl"  > </th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Matricule</th>
                    <th>Batiment</th>
                    <th>Etage</th>
                    <th>Chambre</th>
                  </tr>
                  <tr>
                    <td className="profl" > <PersonIcon/> </td>
                    <td> Oukrirou</td>
                    <td>Ayoub</td>
                    <td>193102</td>
                    <td>D</td>
                    <td>2 eme </td>
                    <td>232</td>
                  </tr>
                  <tr>
                    <td className="profl" > <PersonIcon/> </td>
                    <td>Krimchi</td>
                    <td>Moataz</td>
                    <td>1941521</td>
                    <td>D</td>
                    <td>2 eme </td>
                    <td>224</td>
                  </tr>
                  <tr>
                    <td className="profl" > <PersonIcon/> </td>
                    <td>Kabbaj</td>
                    <td>Samiha</td>
                    <td>1941521</td>
                    <td>F</td>
                    <td>2 eme </td>
                    <td>324</td>
                  </tr>
                  <tr>
                    <td className="profl" > <PersonIcon/> </td>
                    <td>Kabbaj</td>
                    <td>Samiha</td>
                    <td>1941521</td>
                    <td>F</td>
                    <td>2 eme </td>
                    <td>324</td>
                  </tr>
            </table>      
        </div>
    )
}
