const user = require('./userSchema');

exports.registerUser = (regno, name, pwd, gender, Block, roomno, pno, email)=>
    new Promise((resolve, reject)=>{
        const newUser = new user({ 
            reg : regno,
            name: name,
            password: pwd,
            gender: gender,
            Block: Block,
            room: roomno,
            phone: pno,
            email: email
        });
        
        newUser.save()
        .then(()=> resolve({status: 201, message: 'User Registered Successfully'}))       
            .catch(err => {
                if(err.code == 11000){
                    reject({status: 409, message: 'User Already Registered'});
                } else {
                    reject({status: 500, message: 'Internal Server Error !'});
                }

            });
    });