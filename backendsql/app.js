const express = require('express') ;
var mysql = require('mysql') ;
const cors = require('cors') ;
const app = express() ;


app.use(express.json());
app.use(cors());
var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "" ,
    database : "pidbé"
})

console.log('Hey from main');
class Etudiant{
    constructor(matricule ,classmement ,info) {
        this.matricule=matricule;
        this.classmement=classmement;
        this.info=info;
        this.idChombre=-1;
    }
    setIdChombre=(idChombre)=>{
        this.idChombre=idChombre ;
    }
}

class Chombre {
    // chombre : new Chombre(resulti.idChambre ,resulti.dispo ,resulti.serie ,resulti.Capacite)
    constructor(idChambre,dispo,serie,capasite){
        this.idChambre=idChambre;
        this.dispo=dispo;
        this.serie=serie;
        this.capasite=capasite;
        //new add
        this.ListEtudiant=[];
    }

    // chercher etudiant :
    chercherEtudiant(matricule){
        for(let i =0 ; i< this.ListEtudiant.length ; i++){
            if(this.ListEtudiant[i].matricule===matricule){
                return this.ListEtudiants[i];
            }
        }
    }
    // verifier la disponibilite de la chombre :
    isDisponible(){
        const numberOfEtudiant = this.ListEtudiant.length  ;
        const capasite =this.capasite ;

        if(numberOfEtudiant < capasite ){
            return true;
        }else{
            return false;
        }
    }

    // Ajouter un etudiant a une chombre
    addEtudiant( etudiant){
        if(this.isDisponible()){
            this.ListEtudiant.push(etudiant)
        }else{
            console.log("PAS DE PLACE ICI ASSSI !")
        }

    }

      



}

class Etage {

    constructor(idEtage){
        this.idEtage=idEtage;
        this.chambers=[]
    }

    //ajouter une chombre dans cette etage
    addChombre(chombre){
        this.chambers.push( chombre );
    }
    

    //Chercher chombre assi houssam
    chercherChombre(idChambre){
        for(let i =0 ; i< this.chambers.length ; i++){
            if(this.chambers[i].idChambre===idChambre){
                return this.chambers[i];
            }
        }

    }




    // 1-random chombre of disponible chombre 
    // 1-1 get random elemrnt from list
    rand(items) {
        // "~~" for a closest "int"
        return items[~~(items.length * Math.random())];
    }

    //return id of avilable chombre (chombre dispo)
    getDispChombre(){
        var listOfDispoChombre =[]
        this.chambers.forEach(chombre =>{
            if(chombre.isDisponible()){
                listOfDispoChombre.push(chombre.idChambre)
            }
        })
        if(listOfDispoChombre===[]){
            return -1 ;

        }else{
            //random chombre dispo 
            var randomChombre =this.rand(listOfDispoChombre);
            //return idChombre dispo
            return randomChombre ;
        }

    }


    //affecter etudiant a une chombre specific 10
    affecterEtudiant(idChombre , etudiant){
        var chombre = this.chercherChombre(idChombre);
        etudiant.setIdChombre(idChombre);
        chombre.addEtudiant(etudiant);   
    }

    //verifier si ce ettage est pispo
    isDisponibleEtage(){
        var found = 0;
        const chambers =this.chambers ;
        if(chambers === []){
            return false ;
        }

        chambers.forEach(chombre =>{
            if(chombre.isDisponible()){
               found++ ;
            }
        })
        if(found > 0){
            return true
        }else{
            return false
        }
    }
    
    


}
class Batiment {
    constructor(idBatiment ,nomBatiment ,type ) {
        this.idBatiment=idBatiment;
        this.nomBatiment=nomBatiment;
        this.type=type;
        this.Etages=[];
        
    }


    //chercher etage 
    chercherEtage(idEtage){
        for(let i =0 ; i< this.Etages.length ; i++){
            if(this.Etages[i].idEtage===idEtage){
                return this.Etages[i];
            }
        }
    }

    //ajouter unetage a une chomber
    addEtage(etage){
        this.Etages.push(
             etage
        );
    }
    
    //initialiser un batiment avec des etage
    initBatiment(nombreEtage){
        for (let i=0 ; i< nombreEtage ; i++){
            var etage =new Etage(i);
            this.addEtage(etage);
        }

    }

    ajouterChombreEtage(idEtage ,chombre){
        var etage = this.Etages[idEtage];
        etage.addChombre(chombre);
        console.log('ADD CHOMBRE WITH SUCCES !')
        // this.Etages[idEtage].addChombre(chombre)
    }

    //affecter un  etudiannt a un etage
    affectteEtudiantAunEtage(etudiant , choix){
        var  idChombre  ;
        var  ichoix ;
        for (let i=0 ;i<choix.length ;i++){
            ichoix = choix[i];   
            if(this.Etages[ichoix].isDisponibleEtage()){
                idChombre =this.Etages[ichoix].getDispChombre();         
                this.Etages[ichoix].affecterEtudiant(idChombre, etudiant) ;
                console.log('AFFECTATION AVEC SUCCES !')
                console.log('['+etudiant.matricule+']'+'-------------->'+'[Etage = '+ichoix+']'+'------------>[chombre :'+idChombre+']')
                
                break ;
                     
            }
           

        }
        
    }
}

class GestionaireBatiment{
    constructor(){
        this.ListBatiment=[];
    }
    //chercher un batiment 
    chercherBatimnet(nomBatiment){
        for(let i =0 ; i< this.ListBatiment.length ; i++){
            if(this.ListBatiment[i].nomBatiment===nomBatiment){
                return this.ListBatiment[i];
            }
        }
    }



    // ajouter un batimnet 
    addBatiment(batiment){
        this.ListBatiment.push(
            batiment
        );
    }
    
    //listBatimentInfo =[{'idBatiment' ,'nomBatiment' ,'type' , 'nombre d'etage' }]
    init(listBatimentInfo){
        listBatimentInfo.forEach(batimenInfo=>{
            var batiment = new Batiment(batimenInfo.idBatiment , batimenInfo.nomBatiment , batimenInfo.type );
            console.log('batiment create ..')
            batiment.initBatiment(batimenInfo.nombreEtage)
            console.log('initialiser avec des etage')
            this.addBatiment(batiment)
            console.log('add avec succes !')

        })

    }
    //ajouter des chombre a des batiment deja creer avec leur etage
    //apres declaration de gestionbatiment.init()


    //listChombre = [{(chombreInfo.idBatiment ,chombreInfo.idEtage ,chombre)}]

    ajouterListOfChombre(ListeOfChombre){
        ListeOfChombre.forEach(chombreInfo =>{
            this.ajouterChombreBat(chombreInfo.idBatiment ,chombreInfo.idEtage ,chombreInfo.chombre)
        })
    }


    //ajouter une chiombre a un batiment et etage deja creer
    ajouterChombreBat(idBatiment , idEtage ,chombre){
        this.ListBatiment[idBatiment].ajouterChombreEtage(idEtage ,chombre);
    }

    ///creerer  des batiment et chambres 
    initialiserBatiment( listBatimentInfo ,ListeOfChombre){
        if(listBatimentInfo===[]){
            return ;
        }
        this.init(listBatimentInfo);
        if(ListeOfChombre === []){
            return ;
        }
        console.log(1,listBatimentInfo)
         this.ajouterListOfChombre(ListeOfChombre);
        console.log(2 ,ListeOfChombre)
    }


    //afffecter un etudiant a une chombre au hasrd
    affectteEtudiantAunBatiment(idBatiment ,  etudiant ,choix){
        const batiment = this.ListBatiment[idBatiment];
        batiment.affectteEtudiantAunEtage(etudiant ,choix);

    }


    // affecter des etudiant a une chombre dapres leur choix ;
    /// listEtudiantEtLeurChoix =[{etudiant ,choix}] 
    affectteEtudiant(idBatiment , listEtudiantEtLeurChoix ){
        const batiment = this.ListBatiment[idBatiment];
        listEtudiantEtLeurChoix.forEach(etudiantETleurChoix =>{
            batiment.affectteEtudiantAunEtage( etudiantETleurChoix.etudiant ,  etudiantETleurChoix.choix );
            // console.log("AFFECTTER AVEC SUCCES Mr  [ "+etudiantETleurChoix.etudiant.matricule+" ]")
        })
    }
}


const batimentData = [
    {
        nomBatiment:'A',
        type:'H',
        Etages:[
            {
                idEtage:1,
                chambres:[
                    
                    {
                        idChmbre:10,
                        dispo:0
                    },
                    {
                        idChmbre:11,
                        dispo:0
                    },
                    {
                        idChmbre:12,
                        dispo:0
                    },
                    {
                        idChmbre:13,
                        dispo:0
                    },
                    {
                        idChmbre:14,
                        dispo:0
                    },
                    {
                        idChmbre:15,
                        dispo:0
                    },
                    {
                        idChmbre:16,
                        dispo:0
                    },
                    {
                        idChmbre:17,
                        dispo:0
                    },
                    {
                        idChmbre:18,
                        dispo:1
                    },
                    {
                        idChmbre:19,
                        dispo:0
                    },
                    {
                        idChmbre:20,
                        dispo:0
                    },
                    {
                        idChmbre:21,
                        dispo:0
                    },
                    {
                        idChmbre:22,
                        dispo:1
                    },
                    {
                        idChmbre:23,
                        dispo:0
                    },
                    {
                        idChmbre:24,
                        dispo:2
                    }
                ]
            },
            {
                idEtage:2,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },         
            {
                idEtage:3,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            }
        ]
    },
    {
        nomBatiment:'B',
        type:'H',
        Etages:[
            {
                idEtage:1,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },
            {
                idEtage:2,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },         
            {
                idEtage:3,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            }
        ]
    },
    {
        nomBatiment:'C',
        type:'F',
        Etages:[
            {
                idEtage:1,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },
            {
                idEtage:2,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },         
            {
                idEtage:3,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            }
        ]
    },
    {
        nomBatiment:'TITANIC',
        type:'F',
        Etages:[
            {
                idEtage:1,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },
            {
                idEtage:2,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },         
            {
                idEtage:3,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            }
        ]
    }
  ];
  















con.connect(function(err) {
    
    // in case of error
     if(err){
        console.log(err.code);
    }

  
        var gestionBatiment = new GestionaireBatiment();



        var listBatimentInfo =[];
        const q ="SELECT IdBatiment , NomBatiment , Sexe , NombreEtage from batiment"
        con.query(q,(err,result)=>{
            if(result ==[]){
                console.log("liste  viiide assi ")
                return ;
            } 
            result.forEach(resulti =>
                listBatimentInfo.push(
                    {
                        idBatiment : resulti.IdBatiment,
                        nomBatiment : resulti.NomBatiment,
                        type : resulti.Sexe ,
                        nombreEtage :resulti.NombreEtage 
    
                    }
                )

            )       
            
            console.log(999 ,listBatimentInfo)
            gestionBatiment.init(listBatimentInfo)

        })
        //initialiser le batiment creer par un nombre des etage 
        

        //ajoutter des chombre 
        
        //1 1 listChombre = [{(chombreInfo.idBatiment ,chombreInfo.idEtage ,chombre)}]
        var listChombre = [] ;
        
        const q1 ="SELECT idChambre, idBatiment , idEtage , dispo , Capacite , serie from room";
        con.query(q1,(err,result)=>{
            result.forEach(resulti =>
                listChombre.push(
                    {
                        idBatiment : resulti.idBatiment,
                        idEtage  : resulti.idEtage ,
                        chombre : new Chombre(resulti.idChambre+1 ,resulti.dispo ,resulti.serie ,resulti.Capacite)
    
                    }
                )

            )       
            
            
             console.log(888 ,listChombre)
            gestionBatiment.ajouterListOfChombre(listChombre)
            console.log(gestionBatiment.ListBatiment)
        })
        
        
        

        




  


































    app.get('/batimentInfo',(req,res)=>{
          res.json(gestionBatiment.ListBatiment);
    })































    



    app.get('/etudiant/first',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='1m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/etudiant/1m',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='1m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/etudiant/2m',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='2m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/etudiant/3m',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='3m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/batiment',(req,res)=>{
        console.log('hellow from the backend to front end !')
           const q = "SELECT * from batiment " ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
  


app.post("/laylay",(req,res) =>{
   
        const   nom = req.body.prenom ;
      const   matricule = req.body.matricule ;
      const q = "UPDATE etudiant SET Nom = ? WHERE Matricule =?";
      
      con.query(q,[nom,matricule],(err,result)=>{
              if(err){
              res.status(400).send(err.toString())
              console.log(err);
          }else{
              res.send(result);
          }
      })
    } 
    )
    app.post('/modifier',(req,res)=>{
        const  nomb = req.body.nomb ;
        const sex = req.body.sex ;
        const idb = req.body.idb ;
        const  nombreetage = req.body.nombreetage ;
        const  nbrchmbre = req.body.nbrchmbre ;
        const q = "UPDATE batiment SET NomBatiment = ? , Sexe=? , NombreEtage=? ,NombreChmbre_E=? WHERE IdBatiment=?" ;
        con.query(q,[nomb,sex,nombreetage,nbrchmbre,idb]),(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    })
    app.post('/ajoutbatiment',(req,res)=>{
      const  nomb = req.body.nomb ;
      const sex = req.body.sex ;
      const  nombreetage = req.body.nombreetage ;
      const  nbrchmbre = req.body.nbrchmbre ;
      const q = "INSERT INTO `batiment` ( `NomBatiment`, `Sexe`, `NombreEtage`, `NombreChmbre_E`) VALUES( ?, ?, ?, ?)";
      con.query(q,[nomb,sex,nombreetage,nbrchmbre]),(err,result) =>{
          if(err){
              console.log(err);
          }else{
              res.send(result);
          }
      }
    } 
    )
    app.get('/etudiant/second',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='2m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.post('/deletbatiment',(req,res)=>{
        const idb = req.body.idb ; 
        const q = "DELETE FROM `batiment` WHERE `batiment`.`IdBatiment` = ?" ;
        con.query(q,[idb], function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    });
    app.post('/affectation',(req,res)=>{
        const matri = req.body.matricul ;
        const  q ="SELECT `batiment`.`NomBatiment` from `batiment` where `batiment`.`Sexe` =  ( Select `etudiant`.`Sexe` From `etudiant` where `etudiant`.`Matricule` = ? )" ;
        con.query(q,[matri], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.post('/proaff',(req,res)=>{
        const matri = req.body.matricul ;
        const  q ="SELECT * from `etudiant` where `etudiant`.`Matricule`= ?" ;
        con.query(q,[matri], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get('/etudiant/',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant " ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.post("/affectation/chambre",(req,res)=>{
        const etg = req.body.etg ;
        const nombt = req.body.nomb ;
        const q ="SELECT NumChambre from chambre where NumEtage=? and NomBatiment=? and Etat='Libre' " ;
        con.query(q,[etg,nombt],function(err,result,fields){
            if (err) throw err;
            console.log(etg);
            console.log(nombt);
            res.send(result);
        })
    });
    //================affectation data : 
    app.post("/affectationData",(req,res)=>{
        const batiment = req.body.batiment ;
        const level = req.body.level ;
        console.log("affecter les etudiant de niveau :" + level) ;
        console.log("au Batiment "+ batiment);
    })
    //=============================================
    app.get("/affectationBatiment",(req,res)=>{
        const q = "SELECT * from batiment " ;
        con.query(q,function(err,result){
            res.send(result);
        })
    })
    // the rooms parts : _____-------_________-------
    app.get("/rooms",(req,res)=>{
        const q ="SELECT * from chambre";
        con.query(q,function(err,result,fields){
            if (err) throw err;
            console.log(result);
            res.send(result);
        })
    });
    app.post("/affecter/",(req,res)=>{
        const nombt = req.body.nomb ;
        const matri = req.body.matri ;
        const nc = req.body.nbrchambr ;
        const q ="UPDATE etudiant SET NomBatiment = ? , NumChambre=?  WHERE Matricule =?" ;
        con.query(q,[nombt,nc,matri],function (err, result, fields) {
            if (err) throw err;
            res.send(result)
            console.log(nombt +"hoe"+ matri + nc)
        });
    });
    app.get('/etudiant/third',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='3m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
});

app.listen(3307, ()=>{
    console.log('server run on ayoub');
});
