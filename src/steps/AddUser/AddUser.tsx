import axios from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { SubmitButton } from 'src/components/SubmitButton'
import { Role } from 'src/model/Role'

const AddUser = () => {
  const { handleSubmit, register } = useForm()
  const router = useRouter()

  return (
    <main>
      <h1>Agregar usuario</h1>
      <form
        onSubmit={handleSubmit(async ({ userMail, role }: any) => {
          const userData = {
            userMail,
            role,
          }

          await axios.post('/api/registry-save', userData)
          router.push('/registro-exitoso-usuario')
        })}
      >
        <div>
          <label htmlFor="userEmail">Correo electrónico</label>
          <input id="userEmail" name="userMail" type="email" ref={register} />
        </div>
        <div>
          <h2>Rol de la persona</h2>
          <div>
            <label htmlFor="tratante">Profesional tratante</label>
            <input
              id="tratante"
              name="role"
              type="radio"
              value={Role.TRATANTE}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="cuidador">Cuidadora</label>
            <input
              id="cuidador"
              name="role"
              type="radio"
              value={Role.CUIDADOR}
              ref={register}
            />
          </div>
        </div>

        <SubmitButton label="Guardar" />
      </form>
    </main>
  )
}

export default AddUser
