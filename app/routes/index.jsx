import SportSelection, { links as sportSelectionLinks } from '~/components/SportSelection';
import OutdoorIndoor from '~/components/OutdoorIndoor';
import DetailsPage from '~/components/DetailsPage';
import ResultCard from '~/components/ResultCard';
import ExportCard from '~/components/ExportCard';
import homeStyles from '~/styles/home.css';
import { useState } from 'react';
import { useActionData } from '@remix-run/react';


export default function Index() {

  const activityData = useActionData();

  const titles = ["¿Qué deporte hiciste?", "¿Qué tipo de actividad fue?", "Ingrese los detalles de tu actividad", "¡Listo!", "Ingrese su ultima actividad de whatsapp"];
  const [sport, setSport] = useState("run");
  const [type, setType] = useState("outdoor");
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [elevation, setElevation] = useState(0);
  const [chalPoints, setChalPoints] = useState(0);
  const [distanceSum, setDistanceSum] = useState(0);
  const [elevationSum, setElevationSum] = useState(0);



  const [activityPhase, setActivityPhase] = useState(0);

  const chooseSport = (sport) => {
    setSport(sport);
    setActivityPhase(1);
  }

  const chooseType = (type) => {
    setType(type);
    setActivityPhase(2);
  }

  const setDetails = (d, t, e) => {

    setDistance(d);
    setTime(t);
    setElevation(e);

    // set distance sum
    if (sport == "run") setDistanceSum(parseFloat(d));
    else if (sport == "bike") setDistanceSum(d / 3);
    else setDistanceSum(d * 5);

    // set elevation sum
    if (sport == "run" && type == "Outdoor") setElevationSum(e * 0.01);
    else if (sport == "bike" && type == "Outdoor") setElevationSum(e * 0.005);

    setChalPoints(calculateChallengePoints(sport, type, { distance: d, time: t, elevation: e }));

    setActivityPhase(3);
  }

  const exportActivity = () => {
    setActivityPhase(4);
  }
  return (
    <main id="content">
      <h1>{titles[activityPhase]}</h1>
      <div className='container'>
        {activityPhase == 0 && <SportSelection sportChanger={chooseSport} />}
        {activityPhase == 1 && <OutdoorIndoor typeChanger={chooseType} sport={sport} />}
        {activityPhase == 2 && <DetailsPage detailsUpdater={setDetails} type={type} sport={sport} />}
        {activityPhase == 3 &&
          <ResultCard
            activity={sport}
            type={type}
            typeMultiplier={type == "Outdoor" ? 1.2 : 1}
            distance={distance}
            distanceSum={distanceSum}
            elevationSum={elevationSum}
            elevation={elevation}
            time={time}
            challengePoints={chalPoints}
            export={exportActivity}
          />
        }
        {
          activityPhase == 4 &&
          <ExportCard
            activity={sport}
            type={type}
            challengePoints={chalPoints}
            time={time}
          />
        }
      </div>

    </main>
  );
}

const calculateChallengePoints = (sport, type, activityData) => {
  var multiplier = 1.0;
  var elevationMultiplier = 0.01;
  var isOutdoor = type == "Outdoor";

  if (sport === "bike") {
    multiplier = 1 / 3;
    elevationMultiplier = 0.005;
  }
  else if (sport === "swim") {
    multiplier = 5.0;
  }

  if (isOutdoor) multiplier *= 1.2;


  console.log(activityData.distance * multiplier + activityData.elevation * elevationMultiplier);

  return (activityData.distance * multiplier) + (activityData.elevation * elevationMultiplier);

}

export function links() {
  return [...sportSelectionLinks(), { rel: 'stylesheet', href: homeStyles }];
}
