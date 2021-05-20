import OrbitGenerator from './OrbitGenerator';

export default function GeneratorSwitch(props) {
  switch(props.type) {
    default:
    case 'Orbit':
      return <OrbitGenerator />;
  }
}
