import { useEffect, useRef, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { getPhonesService, getPhoneDetails } from "../services/phones.services";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [allPhones, setAllPhones] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [foundPhone, setFoundPhone] = useState();
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState();
  const [isShowing,setIsShowing]=useState(false)
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView({ // autoscroll a los detalles
         behavior: "smooth",
         block: "nearest",
        inline: "start"
       });

  const getData = async () => {
    try {
      setIsLoading(true);     
      const response = await getPhonesService();
      setAllPhones(response.data);
      setTimeout(() => {
        // loading from server simulation
        setIsLoading(false);
        
      }, 1500);
    } catch (error) {
      navigate("/error");
    }
  };

  const getDataDetails = async () => {
    try {
      setIsLoadingDetails(true);
      
      const response = await getPhoneDetails(selectedPhone);
      setFoundPhone(response.data);
      setTimeout(() => {
        // loading from server simulation
        setIsLoadingDetails(false);
      }, 2000);
    } catch (error) {
      navigate(error);
    }
  };
  const handleSelectedPhone = (id) => {
    setIsShowing(true)
    setSelectedPhone(id);
    executeScroll();
  };
  const handleClose =()=>{
    setSelectedPhone(undefined)
    setIsShowing(false)
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getDataDetails();
  }, [selectedPhone]);

  if (isLoading) {
    return (
      <div className="center-container">
        <BounceLoader color={"green"} />
      </div>
    );
  }

  return (
    <div>
      <div ref={myRef}>
        {(isLoadingDetails && isShowing) && (
          <div className="center-container">
            <BounceLoader color={"green"} />
          </div>
        )}

        {(foundPhone && !isLoadingDetails) && (
          <div className="phone-details">
          <button onClick={handleClose} >X</button>
            <h1>{foundPhone.name}</h1>
            <h2>{foundPhone.manufacturer}</h2>
            <div className="center-container details">
              <div className="img-phone-details">
                <img
                  src={`../images/${foundPhone.imageFileName}`}
                  alt={foundPhone.name}
                />
              </div>
              <div className="phone-info">
                <h5>Color:</h5>
                <p>{foundPhone.color}</p>
                <h5>Description:</h5>
                <p>{foundPhone.description}</p>
                <h5>Price:</h5>
                <p>{foundPhone.price}</p>
                <h5>Processor:</h5>
                <p>{foundPhone.processor}</p>
                <h5>Ram:</h5>
                <p>{foundPhone.ram}</p>
                <h5>Screen:</h5>
                <p>{foundPhone.screen}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="center-container">
        <div className="phones-container">
          {allPhones.map((eachPhone) => {
            return (
              <div className="card" key={eachPhone.id}> 
              
                <Link
                  to="#goto-details"
                  onClick={() => {
                    handleSelectedPhone(eachPhone.id);
                  }}
                >
                  <li>
                    <h3>{eachPhone.name}</h3>
                    <h5>{eachPhone.manufacturer}</h5>
                    <img
                      src={`./images/${eachPhone.imageFileName}`}
                      alt={eachPhone.name}
                    />
                  </li>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    
    </div>
  );
}

export default Home;
