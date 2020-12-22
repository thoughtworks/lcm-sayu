import { FunctionComponent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Radio, RadioGroup } from '@chakra-ui/core'
import styles from './UserStatusRadioButton.module.scss'

const UserStatusRadioButton: FunctionComponent<{ selectedStatus?: string }> = ({
  selectedStatus,
}) => {
  const { control } = useFormContext()

  return (
    <div className={styles['status']}>
      <h2>Estado</h2>
      <div className={styles['status-values']}>
        <Controller
          control={control}
          name="status"
          defaultValue={selectedStatus ? selectedStatus : 'activo'}
          render={({ onChange, onBlur, value }) => (
            <RadioGroup
              isInline
              onChange={onChange}
              value={value}
              onBlur={onBlur}
            >
              <Radio id="activo" variantColor="blue" value="activo" size="lg">
                <span className={styles['status-value']}>Activo</span>
              </Radio>
              <Radio
                id="inactivo"
                variantColor="blue"
                value="inactivo"
                size="lg"
              >
                <span className={styles['status-value']}>Inactivo</span>
              </Radio>
            </RadioGroup>
          )}
        />
      </div>
    </div>
  )
}

export default UserStatusRadioButton
