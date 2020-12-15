import { useSession } from 'next-auth/client'
import { FunctionComponent } from 'react'
import { GenericSuccess } from './GenericSuccess'

const SuccessfulSymptomRegistry: FunctionComponent = () => {
  const [session] = useSession()

  return (
    <GenericSuccess
      msg="¡Se han guardado los síntomas exitosamente!"
      backLabel="Ir a historial de síntomas"
      backUrl={`/ver-registros-sintomas?cuidador=${session?.idUser}`}
    />
  )
}

export { SuccessfulSymptomRegistry }
