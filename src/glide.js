import Glide from '@glidejs/glide'
export const config = {
  perView: 3,
  dragTreshold: 0,
  autoplay: 3000,
  breakpoints: {

    760: {
      perView: 2
    },

    500: {
      perView: 1.8,
      autoplay: false
    }
  },
  arrows: true
}
const glide = new Glide('.glide', config);
export default glide;