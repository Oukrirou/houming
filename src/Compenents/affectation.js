import React from 'react'
import '../style/affectation.css';

export default function affectation() {
    return (
        <div className="aff" >
            <div className="titre"> <strong>  Remplir le formulaire pour affecter un étudiant à une chambre </strong> </div>
            <form className="affectation" >
                 <h3> Formulaire d'affectation </h3>
                 <div>
                     <input type="text" placeholder="Matricule" />
                 </div>
                 <div>
                     <select name="batiment" id="batiment">
                         <option value="Batiment F">Batiment</option>
                         <option value="Batiment D">Batiment D</option>
                         <option value="Batiment G">Batiment G</option>
                     </select>
                 </div>
                 <div>
                     <select name="etage" id="etage">
                         <option value="etage1">Etage</option>
                         <option value="etage2">Etage 2</option>
                         <option value="etage3">Etage 3</option>
                     </select>
                 </div>
                 <div>
                     <select name="chambre" id="chambre">
                         <option value="254">Chambre</option>
                         <option value="678">345</option>
                         <option value="987">736</option>
                     </select>
                 </div>
                 <div> <button>Ajouter</button> </div>
            </form>
        </div>
    )
}
