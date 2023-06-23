import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { getPhoneDetails } from "../services/phones.services";
function PhoneDetails() {
  const navigate = useNavigate();
  const [foundPhone, setfoundPhone] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getPhoneDetails(params.id);
      console.log(response.data);
      setfoundPhone(response.data);
      setIsLoading(false);
    } catch (error) {
      navigate(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (isLoading) {
    return (
      <div className="center-container">
        <BounceLoader color={"green"} />
      </div>
    );
  }

  return (
    <div>
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
  );
}

export default PhoneDetails;
