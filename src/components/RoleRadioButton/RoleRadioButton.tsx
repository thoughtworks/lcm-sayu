import { FunctionComponent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Radio, RadioGroup } from '@chakra-ui/core'
import { Role } from 'src/model/Role'
import styles from './RoleRadioButton.module.scss'

const RoleRadioButton: FunctionComponent = () => {
  const { control } = useFormContext()
  return (
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
                id={Role.CUIDADOR}
                variantColor="blue"
                value={Role.CUIDADOR}
                size="lg"
              >
                <span className={styles['role-value']}>Cuidadora</span>
              </Radio>
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
            </RadioGroup>
          )}
        />
      </div>
    </div>
  )
}

export default RoleRadioButton
