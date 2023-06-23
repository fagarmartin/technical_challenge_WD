import service from "./config.services";

const getPhonesService =()=>{
    return service.get("/phones")
}

const getPhoneDetails =(id)=>{
    return service.get(`/phones/${id}`)
}
export {getPhonesService,getPhoneDetails}