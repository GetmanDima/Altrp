import {Map, Marker, ZoomControl} from "pigeon-maps"

const MAX_MAP_ZOOM = 18;

class PigeonMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      coordinates: [55.751244, 37.618423] // default Moscow lat and long
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          ...this.state,
          loading: false,
          coordinates: [position.coords.latitude, position.coords.longitude],
        })
      }, () => {
        this.setState({
          ...this.state,
          loading: false
        })
      });
    } else {
      this.setState({
        ...this.state,
        loading: false
      })
    }
  }

  render() {
    return (
      <div className="pigeon-map-wrapper">
        {this.state.loading ? (
          <div className="pigeon-map-loading">Loading...</div>
        ): (
          <Map defaultCenter={this.state.coordinates} defaultZoom={MAX_MAP_ZOOM}>
            <Marker width={50} anchor={this.state.coordinates} />
            <ZoomControl />
          </Map>
        )}
      </div>
    )
  }
}

export default PigeonMap
