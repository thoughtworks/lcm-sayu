import { FunctionComponent } from 'react'
import { GenericSuccess } from './GenericSuccess'

const SuccessfulSymptomRegistry: FunctionComponent = () => (
  <GenericSuccess
    msg="¡Se han guardado los síntomas exitosamente!"
    labelBackButton="Ir a historial de síntomas"
    urlBackButton="/ver-registros-sintomas"
  />
)

export { SuccessfulSymptomRegistry }
