import Glide from '@glidejs/glide'
export const config = {
  perView: 3,
  dragTreshold: 0,
  breakpoints: {
    760: {
      perView: 2
    },

    500: {
      perView: 1.4,
    }
  },
  arrows: true
}
const glide = new Glide('.glide', config);
export default glide;