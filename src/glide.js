import Glide from '@glidejs/glide'
const config = {
  type: 'carousel',
  perView: 4,
  focusAt: 'center',
  // autoplay: 2500,
  dragTreshold: 1,
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