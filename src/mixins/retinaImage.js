// @flow

import hiDPI from './hiDPI'

/**
 * The retina-image mixin is a helper to generate a retina background image and non-retina
 * background image. The retina background image will output to a HiDPI media query. The mixin uses
 * a _2x.png filename suffix by default.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  ...retinaImage('my-img')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${retinaImage('my-img')}
 * `
 *
 * // CSS as JS Output
 * div {
 *   backgroundImage: 'url(my-img.png)',
 *   '@media only screen and (-webkit-min-device-pixel-ratio: 1.3),
 *    only screen and (min--moz-device-pixel-ratio: 1.3),
 *    only screen and (-o-min-device-pixel-ratio: 1.3/1),
 *    only screen and (min-resolution: 144dpi),
 *    only screen and (min-resolution: 1.5dppx)': {
 *     backgroundImage: 'url(my-img_2x.png)',
 *   }
 * }
 */
function retinaImage(filename: string, backgroundSize?: string, extension?: string = 'png', retinaFilename?: string, retinaSuffix?: string = '_2x') {
  if (!filename) {
    throw new Error('Please supply a filename to retinaImage() as the first argument.')
  }
  // Replace the dot at the beginning of the passed extension if one exists
  const ext = extension.replace(/^\./, '')
  const rFilename = retinaFilename ? `${retinaFilename}.${ext}` : `${filename}${retinaSuffix}.${ext}`

  return {
    backgroundImage: `url(${filename}.${ext})`,
    [hiDPI()]: {
      backgroundImage: `url(${rFilename})`,
      backgroundSize,
    },
  }
}

export default retinaImage
