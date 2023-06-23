import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { getPhonesService } from "../services/phones.services";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [allPhones, setAllPhones] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getPhonesService();
      setAllPhones(response.data);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
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
    <div className="phones-container">
      {allPhones.map((eachPhone) => {
        return (
          <Link
            className="card"
            key={eachPhone.id}
            to={`/phones/${eachPhone.id}`}
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
        );
      })}
    </div>
  );
}

export default Home;
