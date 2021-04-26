import React, { Component } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../style/batiment.css' ;
import AddIcon from '@material-ui/icons/Add';
import ReactModal from 'react-modal'

export class addbatiment extends Component {
    constructor () {
        super();
        this.state = {
            showModal : false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
    handleCloseModal () {
        this.setState({ showModal: false });
      }
    render() {
        return (
            <div className="batiments" >
                <div className="lfo" >
                  <div className="titre" > <strong> Liste des batiments</strong> </div>
                  <div className="ajouter" > <button onClick={this.handleOpenModal}><AddIcon/><p>Ajouter</p></button> </div>
                  {/* React modals to add new batiment  */}
                    <ReactModal isOpen={this.state.showModal} className="modal" >
                           <div className="title" > <strong>Remplir le formulaire pour ajouter un batiment </strong>  </div>
                           <div className="formulaire">

                               <div className="ajout"  > <strong>  Ajout Batiment </strong> </div>
                                   
                                <div className="batiment" >
                                    <label htmlFor="batiment">Nom de Batiment :</label>
                                    <input type="text" name="batiment"/>
                                </div>
                                <div className="etage" >
                                    <label htmlFor="etage">Nombre d'etage :</label>
                                    <input type="text" name="etage"/>
                                </div>
                                    
                                <div>
                                    <label htmlFor="nbre">Nombre de chambre par etage :</label>
                                    <input type="text" name="nbre"/>
                                </div>
                                <div className="config" >
                                    <button>Ajouter</button>
                                    <button onClick={this.handleCloseModal}>Annuler</button>
                                </div>
                                </div>
                    </ReactModal>
                </div>
                <div className="nour" >
                  <table>
                    <tr>
                       <th>Nom Batiment</th>
                       <th>Nombre d'etage</th>
                       <th>Nombre de chambre/etage</th>
                       <th className="buttons" ></th>
                       <th className="buttons" ></th>
                    </tr>
                    <tr>
                       <td> D</td>
                       <td> 5 </td>
                       <td> 44 </td>
                       <td className="buttons" > <button><DeleteIcon/></button> <button><EditIcon/></button>   </td>
   
                    </tr>
                    <tr>
                       <td> D</td>
                       <td> 5 </td>
                       <td> 44 </td>
                       <td className="buttons" > <button><DeleteIcon/></button> <button><EditIcon/></button>   </td>
                    </tr>
                    <tr>
                       <td> D</td>
                       <td> 5 </td>
                       <td> 44 </td>
                       <td className="buttons" > <button><DeleteIcon/></button> <button><EditIcon/></button>   </td>
                    </tr>
                    <tr>
                       <td> D</td>
                       <td> 5 </td>
                       <td> 44 </td>
                       <td className="buttons" > <button><DeleteIcon/></button> <button><EditIcon/></button>   </td>
                    </tr>
                    <tr>
                       <td> D</td>
                       <td> 5 </td>
                       <td> 44 </td>
                       <td className="buttons" > <button><DeleteIcon/></button> <button><EditIcon/></button>   </td>
                    </tr>
                  </table>  
                </div>  
            </div>
        )
    }
}

export default addbatiment
