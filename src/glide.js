import Glide from '@glidejs/glide'
const config = {
  // type: 'carousel',
  perView: 3,
  // focusAt: 'center',
  dragTreshold: 0,
  breakpoints: {
    760: {
      perView: 2
    },

    500: {
      perView: 1.4,
      // peek: 60
    }
  },
  arrows: true
}
const glide = new Glide('.glide', config);
export default glide;