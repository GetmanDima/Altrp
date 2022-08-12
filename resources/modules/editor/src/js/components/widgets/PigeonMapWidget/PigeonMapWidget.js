import PigeonMap from "./PigeonMap";

const {
  isEditor,
} = window.altrpHelpers;

(window.globalDefaults = window.globalDefaults || []).push(`
  .pigeon-map-loading {
    text-align: center
  }
`);

class PigeonMapWidget extends React.Component {
  constructor(props) {
    super(props);

    this.element = props.element;
    this.elementId = props.element.getId();

    props.element.component = this;

    let settings = props.element.getSettings();

    this.state = {
      settings
    }
  }

  render() {
    if (isEditor()) {
      return <PigeonMap />
    }
    return '';
  }
}

export default PigeonMapWidget;
