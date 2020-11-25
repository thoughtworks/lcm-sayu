import { FunctionComponent } from 'react'
import { GenericError } from './GenericError'

const Unauthorized: FunctionComponent = () => (
  <GenericError msg="No tiene permisos para ver pagina" />
)
export { Unauthorized }
