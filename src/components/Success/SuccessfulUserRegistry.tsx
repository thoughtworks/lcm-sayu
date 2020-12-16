import { FunctionComponent } from 'react'
import { GenericSuccess } from './GenericSuccess'

const SuccessfulUserRegistry: FunctionComponent = () => (
  <GenericSuccess
    msg="¡Se ha registrado el usuario de manera exitosa!"
    backUrl="tratante/gestion-usuario"
    backLabel="Volver a lista de usuarios"
  />
)

export { SuccessfulUserRegistry }
