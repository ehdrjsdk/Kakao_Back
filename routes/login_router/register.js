/** @module register */
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

function register(req,res)
{
    /**
     * <pre>
     * 입력받은 email, name, password를 통해 새 계정을 DB에 저장함
     * 만약 해당 정보를 가진 계정이 존재한다면 에러메세지를 출력함
     * register구문에서는 이메일을 가지고있는지에 대해서 확인하는 절차를 가짐
     * </pre>
     * 
     * @function register
     * 
     * @requires User
     * 
     * @param {*} req
     * @param {*} res
     * 
     * @returns null
     * @throws 해당 이메일을 가진 사용자가 존재합니다.
     */
    User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            return res.status(400).json({
                email: "해당 이메일을 가진 사용자가 존재합니다."
            })
        } else {
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                token: 'null',
                profile_image_filename: 'null'
            });
            bcryptmaker(newUser, res);
        }
    })
}

function bcryptmaker(newUser, res)
{
    /**
    * <pre>
    * bcrypt를 이용해서 입력받은 password를 암호화하고 저장하는 함수를 불러오는
    * 함수로써 만약 암호화를 작동함에 있어 에러가 생기게되면 에러구문을 출력 할 수있도록 함
    * </pre>
    * 
    * @function bcryptmaker
    * 
    * @requires bcryptjs
    * 
    * @param {Document} newUser 회원가입을 위해 입력받은 유저 정보
    * @param {*} res
    * 
    * @returns null
    * @throws bcrypt를 제작하는데 있어서 err메세지 출력
    */
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            
            register_save(newUser, res, hash);

        })
    })
}

function register_save(newUser,res,hash)
{
    /**
    * <pre>
    * bcryptmaker에서 만들어진 암호화된 패스워드와 유저 정보를 저장하는 구문을 가진다.
    * </pre>
    * 
    * @function register_save
    * 
    * @param {Document} newUser 회원가입을 위해 입력받은 유저 정보
    * @param {*} res
    * 
    * @returns null
    * @throws null
    */
    newUser.password = hash;

    newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
}

module.exports.register = register;
