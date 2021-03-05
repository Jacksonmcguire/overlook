import Glide from '@glidejs/glide'
const config = {
  type: 'carousel',
  perView: 3,
  focusAt: 'center',
  // autoplay: 2500,
  dragTreshold: 120,
  breakpoints: {
    800: {
      perView: 2
    },

    500: {
      perView: 1
    }
  }
}
new Glide('.glide', config).mount()