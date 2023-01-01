import SportSelection, { links as sportSelectionLinks } from '~/components/SportSelection';
import OutdoorIndoor from '~/components/OutdoorIndoor';
import DetailsPage from '~/components/DetailsPage';
import homeStyles from '~/styles/home.css';
import { useState } from 'react';
import { useActionData } from '@remix-run/react';
import { Link } from '@remix-run/react';


export default function Index() {

  const activityData = useActionData();

  const titles = ["¿Qué deporte hiciste?", "¿Qué tipo de actividad fue?", "Ingrese los detalles de tu actividad", "¡Listo!"];
  const [sport, setSport] = useState("run");
  const [type, setType] = useState("outdoor");
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [elevation, setElevation] = useState(0);
  const [chalPoints, setChalPoints] = useState(0);



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

    setChalPoints(calculateChallengePoints(sport, type, { distance: d, time: t, elevation: e }));

    setActivityPhase(3);
  }

  return (
    <main id="content">
      <h1>{titles[activityPhase]}</h1>
      <div className='container'>
        {activityPhase == 0 && <SportSelection sportChanger={chooseSport} />}
        {activityPhase == 1 && <OutdoorIndoor typeChanger={chooseType} />}
        {activityPhase == 2 && <DetailsPage detailsUpdater={setDetails} />}
        {activityPhase == 3 &&
          <>
            <h1>Challenge points: {chalPoints.toFixed(2)}</h1>
            <button onClick={() => window.location.reload(false)}>Regresar!</button>
          </>

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
