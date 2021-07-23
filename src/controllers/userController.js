let fs = require('fs');
let path = require('path');
let userListPath = path.join(__dirname,"../dataBase/userList.json");
let userDatos = fs.readFileSync (userListPath, 'utf-8');
let {validationResult} = require ('express-validator');
const bcryptjs = require('bcryptjs');
const { send } = require('process');
const { localsName } = require('ejs');
let userListOl ;
if (userDatos == "") {
    userListOl = [];
} 
else { 
    userListOl = JSON.parse(userDatos);
};

let userController = {
    register: function(req,res){
        res.render('users/register');
    },
    

    login: function(req,res){
        // para verificar que trae session
        //console.log(req.session);
        res.render('users/login'); 
    },












    


    storeRegister: function(req,res){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('users/register' , {mensajeError : errors.array() , old:req.body})
        };

        for(let i=0; i<userListOl.length; i++){
            if(req.body.email == userListOl[i].email){
               return res.render('users/register' , {mensajeError: [{msg:"Este mail es invalido"}]})
            } }

        let newUser= {
            id: userListOl.length+1,
            user: req.body.user,
            lastNameUser: req.body.lastNameUser,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password , 10)
        };
        if(req.file){
            newUser.userImage=req.file.filename;
        } else{
            newUser.userImage='';
        }


        userListOl.push(newUser);
        let userListOlupdated= JSON.stringify(userListOl, null, " ");
        fs.writeFileSync(userListPath, userListOlupdated)
        res.redirect('/users/register')
   

    },

    loginProcess: function(req,res){
        
        //return res.send(req.body);
        let errorMessage= 'Las credenciales son inválidas';
        let userToLogin= userListOl.find(user=>user.email==req.body.email);
        if(userToLogin){
            //return res.send('Bienvenido señor '+ userToLogin.lastNameUser)
            let passwordOk= bcryptjs.compareSync(req.body.password,userToLogin.password);
            if(passwordOk){
                delete userToLogin.password;
				req.session.userLogged= userToLogin;
                return res.redirect('/users/profile');
            }
            return res.render('users/login',{errorMessage});
        }
        return res.render('users/login',{errorMessage});
    },

    profile: function(req,res){
        if(req.session.userLogged){
            res.render('users/profile',{user:req.session.userLogged}); 
        } else {
            res.redirect('/'); 
        }
        
    },
    
}

module.exports = userController;