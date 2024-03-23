import { ReactNode } from "react";

export interface weatherCardDetails {
  offset: boolean;
  icon: ReactNode;
  iconSize: string;
  details: string;
  title: string;
}

interface Props {
  weatherCardDetails: weatherCardDetails;
}

const WeatherCardDetail = ({ weatherCardDetails }: Props) => {
  return (
    <div className="col-6">
      <div className="row">
        <div
          className={`${
            weatherCardDetails.offset ? "offset-3" : ""
          } col-2 pe-0 ${weatherCardDetails.iconSize}`}
        >
          {weatherCardDetails.icon}
        </div>
        <div className="col-6 px-0">
          <p className="card-text fs-6">
            <span className="fs-5">{weatherCardDetails.details}</span>
            <br />
            {weatherCardDetails.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardDetail;
