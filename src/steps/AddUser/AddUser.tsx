import { useRouter } from 'next/router'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { Radio, RadioGroup } from '@chakra-ui/core'
import { SubmitButton } from 'src/components/SubmitButton'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { Role } from 'src/model/Role'
import styles from './AddUser.module.scss'

const AddUser = () => {
  const { handleSubmit, register, control } = useForm()
  const router = useRouter()

  return (
    <>
      <main id={styles['add-user']}>
        <TitleHeader />
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
          <div className={styles['user-email']}>
            <label htmlFor="userEmail">Correo electrónico</label>
            <input id="userEmail" name="userMail" type="email" ref={register} />
          </div>
          <div className={styles['role']}>
            <h2>Rol de la persona</h2>
            <div className={styles['role-values']}>
              <Controller
                control={control}
                name="role"
                defaultValue={Role.CUIDADOR}
                render={({ onChange, onBlur, value }) => (
                  <RadioGroup
                    isInline
                    onChange={(_, value) => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  >
                    <Radio
                      id={Role.TRATANTE}
                      variantColor="blue"
                      value={Role.TRATANTE}
                      size="lg"
                    >
                      <span className={styles['role-value']}>
                        Profesional tratante
                      </span>
                    </Radio>
                    <Radio
                      id={Role.CUIDADOR}
                      variantColor="blue"
                      value={Role.CUIDADOR}
                      size="lg"
                    >
                      <span className={styles['role-value']}>Cuidadora</span>
                    </Radio>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <SubmitButton label="Guardar" />
        </form>
      </main>
    </>
  )
}

export default AddUser
