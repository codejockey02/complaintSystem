const user = require('./reqSchema');

exports.registerReq = (issue, desc, time, ttime, name, reg, room, Block, phone, email) =>
    new Promise((resolve, reject) => {
        const newUser = new user({
            issue: issue,
            desc: desc,
            time: time,
            ttime: ttime,
            name: name,
            reg: reg,
            room: room,
            Block: Block,
            phone: phone,
            email: email,
            status: "Request Pending",
            date: new Date()
        });

        /* function getNextSequenceValue(sequenceName){

            var sequenceDocument = user.findOneAndUpdate({
               query:{_id: sequenceName },
               update: {$inc:{sequence_value:1}},
               new:true
            });
             
            return sequenceDocument.sequence_value;
        } */
        newUser.save()
            .then(() => resolve({
                status: 201,
                message: 'Request Registered Successfully'
            }))
            .catch(err => {
                if (err.code == 11000) {
                    reject({
                        status: 409,
                        message: 'User Already Registered'
                    });
                } else {
                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }

            });
    });