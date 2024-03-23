import { ReactNode } from "react";

export interface weatherCardDetails {
  offset: boolean;
  icon: ReactNode;
  iconSize: string;
  details: string;
  title: string;
  floatDirection: string;
}

interface Props {
  weatherCardDetails: weatherCardDetails;
}

const WeatherCardDetail = ({ weatherCardDetails }: Props) => {
  return (
    <div className="col-6">
      <div className={weatherCardDetails.floatDirection}>
        <div className={`float-md-start ${weatherCardDetails.iconSize}`}>
          {weatherCardDetails.icon}
        </div>
        <div className="px-sm-3 float-md-start">
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
