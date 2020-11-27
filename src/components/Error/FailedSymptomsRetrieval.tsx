import React, { FunctionComponent } from 'react'
import { GenericError } from './GenericError'

const FailedSymptomsRetrieval: FunctionComponent = () => {
  return (
    <GenericError
      msg="Ha ocurrido un error, espera unos minutos e inténtalo nuevamente."
      retryUrl="/ver-registros-sintomas"
    />
  )
}

export { FailedSymptomsRetrieval }
