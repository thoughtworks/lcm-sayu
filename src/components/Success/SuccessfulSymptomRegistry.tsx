import { FunctionComponent } from 'react'
import { GenericSuccess } from './GenericSuccess'

const SuccessfulSymptomRegistry: FunctionComponent = () => (
  <GenericSuccess
    msg="¡Se han guardado los síntomas exitosamente!"
    msgButton="Ir a historial de síntomas"
    urlButton="/ver-registros-sintomas"
  />
)

export { SuccessfulSymptomRegistry }
