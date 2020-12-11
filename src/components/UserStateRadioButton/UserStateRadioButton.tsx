import { FunctionComponent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Radio, RadioGroup } from '@chakra-ui/core'
import styles from './UserStateRadioButton.module.scss'

const RoleRadioButton: FunctionComponent<{ selectedState: string }> = ({
  selectedState,
}) => {
  const { control } = useFormContext()

  return (
    <div className={styles['state']}>
      <h2>Estado</h2>
      <div className={styles['state-values']}>
        <Controller
          control={control}
          name="state"
          defaultValue={selectedState ? selectedState : 'activo'}
          render={({ onChange, onBlur, value }) => (
            <RadioGroup
              isInline
              onChange={(_, value) => onChange(value)}
              value={value}
              onBlur={onBlur}
            >
              <Radio id="activo" variantColor="blue" value="activo" size="lg">
                <span className={styles['state-value']}>Activo</span>
              </Radio>
              <Radio
                id="inactivo"
                variantColor="blue"
                value="inactivo"
                size="lg"
              >
                <span className={styles['state-value']}>Inactivo</span>
              </Radio>
            </RadioGroup>
          )}
        />
      </div>
    </div>
  )
}

export default RoleRadioButton
