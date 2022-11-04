import bcrypt from 'bcrypt';
const SALT_ROUND = 10;

const signup = async (req, res) => {
    const { username,email, password,handphone } = req.body;

    let hashPassword = password;
    hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);
    try {
        const result = await req.context.models.users.create({
            user_name : username,
            user_email : email,
            user_password: hashPassword,
            user_handphone : handphone
        });
        const {user_name,user_email} = result.dataValues;
        res.send({user_name,user_email});
    } catch (error) {
        res.status(404).send(error.message);
    }

        /*  test dulu   
        
        let userPassword = user_password
        userPassword = await bcrypt.hash(userPassword,SALT_ROUND);
        console.log(userPassword);
    
        console.log(await bcrypt.compare("rahasia",userPassword));
        console.log(await bcrypt.compare("rahasiax",userPassword)); */
}

// use sigin with token in authJWT
const signin = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const result = await req.context.models.users.findOne({
            where : {user_email : email}
        });
        const {user_name,user_email,user_password} = result.dataValues;
        const compare = await bcrypt.compare(password,user_password);
        if(compare){
            return res.send({user_name,user_email});
        }else{
            return res.sendStatus(404);
        }
        
    } catch (error) {
        return res.sendStatus(404);
    }
}

const all = async (req,res) =>{
    try {
        const result  = await req.context.models.users.findAll();
        return res.status(201).json({result})
    } catch (error) {
        return res.status(404).send("no data found")       
    }
}

const create = async (req,res) =>{
    try {
        const users = await req.context.models.users.create({
            user_id : req.body.user_id,
            user_name : req.body.user_name,
            user_email : req.body.user_email,
            user_password : req.body.user_password,
            user_phone : req.body.user_phone
        })
        return res.send(users)
    } catch (error) {
        return res.status(404).send("not found")
    }
}

const update = async (req,res)=>{
    const {user_phone,user_password,user_email,user_name,user_id} = req.body
    try {
        const users = await req.context.models.users.update(
            {
                user_phone : user_phone,
                user_password : user_password,
                user_email : user_email,
                user_name : user_name,
                user_id : user_id
            },
            {returning : true, where :{user_id : req.params.id}}
        )
        return res.send(users)
    } catch (error) {
        return res.status(404).send("not found")
    }
}

const remove = async (req,res)=>{
    try {
        const users = await req.context.models.users.destroy({
            where :  {user_id : req.params.id}
        })
        return res.send("delete"+users+"rows")
    } catch (error) {
        return res.status(404).send("not found")
    }
}

export default {
    signup,
    signin,
    all,
    create,
    update,
    remove
}