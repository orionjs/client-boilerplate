import Loading from './Loading'
import Loadable from 'react-loadable'

export default loader => {
  return Loadable({
    loader,
    loading: Loading
  })
}
