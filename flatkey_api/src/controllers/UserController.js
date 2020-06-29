import User from '../models/UserModel';

let controller = {
    add: async (req, res) => {
        const {name, lastname, email, password, isowner} = req.body;
        const newUser = new User({name, lastname, email, password, isowner});        
        if (name && lastname && email && password){
            const user = await User.findOne({email: email});
            if (user != null){
                let errorRes = {
                    error: {
                        title: "Error",
                        message: "Email already exist"
                    }
                };
                return res.status(500).json(setResponse(errorRes, false));
            }
            await newUser.save((error, document) => {
                // check for errors
                let errors = getErrors(error);
                // Send errors                
                if (errors[0].error){
                    let errorRes = {
                        error: {
                            title: "Error",
                            message: errors[0].error
                        }
                    };
                    return res.status(500).json(setResponse(errorRes, false));
                }else{
                    return res.status(200).json(setResponse(errors[0].response, true));
                }                
            });             
        }else{
            let errorRes = {
                error: {
                    title: "Empty fields",
                    message: "There was an validation error" 
                }
            };
            return res.status(500).json(setResponse(errorRes, false));
        }                 
    },
    getById: async(req, res) => {
        const { id } = req.query;
        const user = await User.findById(id).then((item) => {
            return res.status(200).json(setResponse({item}, true));
        }).catch(() => {
            let errorRes = {
                error: {
                    title: "Error",
                    message: "Not found"
                }
            };
            return res.status(404).json(setResponse(errorRes, false));
        });        
    },
    get: async (req,res) =>{
        const { email } = req.body;        
        const user = await User.findOne({email: email});
        if(user){
            return res.status(200).json(
                setResponse({user}, true)
            );  
        }else{            
            let errorRes = {
                error: {
                    title: "Error",
                    message: "Not found"
                }
            };
            return res.status(500).json(setResponse(errorRes, false));   
        }
    },
    validate:  async (req,res) =>{
        const { email, password } = req.body;                
        const user = await User.findOne({email: email});
        if(user){
            if(password == user.password){
                return res.status(200).json(setResponse({user}, true));                  
            }else{
                let errorRes = {
                    error: {
                        title: "Error",
                        message: "Email and password are invalid"
                    }
                };
                return res.status(404).json(setResponse(errorRes, false));                   
            }
        }else{  
            let errorRes = {
                error: {
                    title: "Error",
                    message: "Not found"
                }
            };
            return res.status(404).json(setResponse(errorRes, false));                                 
        }
    },
    list: async (req,res) =>{
        const users = await User.find({});
        if(users && users.length > 0){
            return res.status(200).json(setResponse({users}, true));
        }else{
            let errorRes = {
                error: {
                    title: "Empty",
                    message: "Not found"
                }
            };
            return res.status(404).json(setResponse(errorRes, false));
        }                        
    },
    update: async (req,res) => {
        const { id } = req.params;
        const { name, lastname, email, password, isowner } = req.body;
        await User.findByIdAndUpdate(id,{name, lastname, email, password, isowner});
        return res.status(200).json(
            setResponse({}, true)
        );
    },
    delete: async (req,res) =>{
        const { id } = req.body;
        await User.findByIdAndDelete(id);
        return res.status(200).json(
            setResponse({}, true)
        );
    },

};

function getErrors(error) {
    let errorArray = [];
    if (error) {
        if (error.errors['email']) {        
            errorArray.push({
                error: error.errors['email'].message
            });
        }        
    } else {
        errorArray.push({ 
            response: "User added successfully" 
        });
    }
    return errorArray;
};

function setResponse(response, isSuccess){
    let resp = {};

    if(isSuccess){
        resp = {
            res: {
                success: true,
                data: [response]
            }
        };
    }else{
        
        resp = {
            res: {
                success: false,
                error: response.error
            }
        };        
    }
    
    return resp;
}

module.exports = controller;