import BaseElement from "./BaseElement";
import WidgetIcon from "../../../svgs/map.svg";
import {
  TAB_STYLE,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
} from "../modules/ControllersManager";

class PigeonMap extends BaseElement {
  static getName() {
    return "pigeon-map";
  }
  static getTitle() {
    return "PigeonMap";
  }
  static getIconComponent() {
    return WidgetIcon;
  }
  static getType() {
    return "widget";
  }
  static getGroup() {
    return "Advanced";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("pigeon_map_content_style", {
      tab: TAB_STYLE,
      label: "Content",
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl('map_content_width', {
      type: CONTROLLER_SLIDER,
      label: 'Map width',
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 1000,
      min: 0,
      default: {
        unit: '%',
        size: "100"
      },
    });

    this.addControl('map_content_height', {
      type: CONTROLLER_SLIDER,
      label: 'Map height',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
      default: {
        unit: 'px',
        size: "300"
      },
    });

    this.endControlSection();
  }
}

export default PigeonMap;
