import { useSession } from 'next-auth/client'
import { FunctionComponent } from 'react'
import { GenericSuccess } from './GenericSuccess'

const SuccessfulSymptomRegistry: FunctionComponent = () => {
  const [session] = useSession()

  return (
    <GenericSuccess
      msg="¡Se han guardado los síntomas exitosamente!"
      labelBackButton="Ir a historial de síntomas"
      urlBackButton={`/ver-registros-sintomas?cuidador=${session?.idUser}`}
    />
  )
}

export { SuccessfulSymptomRegistry }
