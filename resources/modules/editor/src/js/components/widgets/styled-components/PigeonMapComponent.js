import {
  sliderStyled,
  styledString,
} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

export function pigeonMapStyles(settings) {
  return [
    "pigeon-map-wrapper",

    ["margin", "position_margin", "dimensions"],

    () => {
      const value = getResponsiveSetting(settings, "map_content_width");
      const slider = sliderStyled(value);

      if(slider) {
        return `width: ${slider};`
      }

      return 'width: 100%;'
    },

    () => {
      const value = getResponsiveSetting(settings, "map_content_height");
      const slider = sliderStyled(value);

      if(slider) {
        return `height: ${slider};`
      }

      return 'height: 300px;'
    },

    "}",
  ]
}

/**
 * @return {string}
 */

export default function PigeonMapComponent(settings) {

  const styles = [
    ...pigeonMapStyles(settings)
  ];

  let stylesInString = '';

  stylesInString += styledString(styles, settings);

  return stylesInString;
}
