import { Controller, useForm } from 'react-hook-form'
import { SymptomRadioButton } from 'src/components/SymptomRadioButton/SymptomRadioButton'
import { Slider } from 'src/components/SymptomSlider/SymptomSlider'

const Test = () => {
  const { register, handleSubmit, control } = useForm()

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input name="firstName" ref={register} />
      <input name="lastName" ref={register} />
      <input name="email" ref={register} />

      <Controller
        control={control}
        name="Cansancio"
        defaultValue={0}
        render={({ onChange, onBlur, value, name }) => (
          <Slider
            symptomValue={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        control={control}
        name="Fiebre"
        defaultValue="1"
        render={({ onChange, onBlur, value, name }) => (
          <SymptomRadioButton
            symptomValue={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <input type="submit" />
    </form>
  )
}

export default Test
