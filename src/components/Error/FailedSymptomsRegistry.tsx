import React, { FunctionComponent } from 'react'
import { GenericError } from './GenericError'

const FailedSymptomsRegistry: FunctionComponent = () => (
  <GenericError
    msg="Ha ocurrido un error, espera unos minutos e inténtalo nuevamente."
    retryUrl="/seleccion-nivel-dolor"
  />
)

export { FailedSymptomsRegistry }
