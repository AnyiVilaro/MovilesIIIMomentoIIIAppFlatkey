import Property from '../models/PropertyModel';

let controller = {
    add: async (req, res) => {
        const {title, type, address, rooms, price, area, landlord} = req.body;
        const newProperty = new Property({title, type, address, rooms, price, area, landlord});        
        if (title && type && address && rooms && price && area && landlord){            
            await newProperty.save((error, document) => {                                
                // check for errors
                if (error){
                    return res.status(500).json(setResponse({
                        error: {
                            title: "Validation fields",
                            message: "There was an error. Details: " + error.message
                        }
                    }, false));
                }else{
                    return res.status(200).json(setResponse({}, true));
                }                
            });             
        }else{
            let errorRes = {
                error: {
                    title: "Empty fields",
                    message: "There was an validation error."
                }
            };
            return res.status(500).json(setResponse({errorRes}, false));
        }                 
    },
    get: async(req, res) => {
        const { id } = req.body;
        console.log(id);
        await Property.findById(id).then((item) => {
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
    listByUser: async (req,res) =>{
        const { email } = req.query    
        const properties = await Property.find({ landlord: email});        
        
        if(properties && properties.length > 0){
            return res.status(200).json(setResponse(properties, true));
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
    listSortedByUser: async (req,res) =>{
        const { email } = req.query    
        const properties = await Property.find({ landlord: email}).sort({"price" : 1});        
        
        if(properties && properties.length > 0){
            return res.status(200).json(setResponse(properties, true));
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
        const properties = await Property.find();
        
        if(properties){
            return res.status(200).json(setResponse(properties, true));
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
    listSorted: async (req,res) =>{        
        const properties = await Property.find().sort({"price" : 1});
        
        if(properties){
            return res.status(200).json(setResponse(properties, true));
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
    update: async (req,res) =>{
        const { id } = req.params;
        const { title, type, address, rooms, price, area, landlord } = req.body;
        await Property.findByIdAndUpdate(id,{title, type, address, rooms, price, area, landlord});
        return res.status(200).json(setResponse({}, true));
    },
    delete: async (req,res) => {
        const { id } = req.params;        
        await Property.findByIdAndDelete(id);
        return res.status(200).json(setResponse({}, true));
    },

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
                error: {
                    title: "",
                    message: response.error
                }
            }
        };
    }
    
    return resp;
}

module.exports = controller;