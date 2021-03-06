import Glide from '@glidejs/glide'
const config = {
  type: 'carousel',
  // bound: true,
  gap: 1,
  perView: 3,
  // focusAt: 'center',
  // autoplay: 2500,
  dragTreshold: 0,
  breakpoints: {
    800: {
      perView: 2
    },

    500: {
      perView: 1
    }
  },
  arrows: true
}
const glide = new Glide('.glide', config);
export default glide;