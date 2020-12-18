import React, { FunctionComponent } from 'react'
import { GenericError } from './GenericError'
import { useSession } from 'next-auth/client'

const FailedRegistryRemove: FunctionComponent = () => {
  const [session] = useSession()
  return (
    <GenericError
      msg="Ha ocurrido un error, espera unos minutos e inténtalo nuevamente."
      retryLabel="Volver al historial de síntomas"
      retryUrl={`/ver-registros-sintomas?cuidador=${session?.idUser}`}
    />
  )
}

export { FailedRegistryRemove }
