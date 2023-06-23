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
      console.log(response.data)
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

  return <div>

    <h2>{foundPhone.name}</h2>
    <h3>{foundPhone.manufacturer}</h3>
    <h5>Color:{foundPhone.color}</h5>
    <p>Description:{foundPhone.description}</p>


  </div>;
}

export default PhoneDetails;
