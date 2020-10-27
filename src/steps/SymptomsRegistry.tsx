import React from 'react'
import { useRouter } from 'next/router'
import { Text, Stack, Box } from '@chakra-ui/core'

import { Slider } from 'src/components/SymptomSlider/SymptomSlider'
import { PainBox } from 'src/components/PainBox/PainBox'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { CustomButton } from 'src/components/CustomButton/CustomButton'
import { SymptomRadioButton } from 'src/components/SymptomRadioButton/SymptomRadioButton'

function SymptomsRegistry() {
  const router = useRouter()
  const painLevel = router.query['pain-level'] as string

  // const [datos, setDatos] = useState({
  //   nombre: '',
  //   apellido: '',
  //   Cansancio: '',
  // })

  // const handleInputChange = (event) => {
  //   console.log(event)
  //   console.log(event.target.value)
  //   setDatos({
  //     ...datos,
  //     [event.target.name]: event.target.value,
  //   })
  // }
  // const enviarDatos = (event) => {
  //   event.preventDefault()
  //   console.log(
  //     'enviando datos...' +
  //       datos.nombre +
  //       ' ' +
  //       datos.apellido +
  //       '' +
  //       JSON.stringify(datos)
  //   )
  // }
  return (
    <>
      {/* <form className="row" onSubmit={enviarDatos}>
     <Box>
          <Slider symptomValue='Cansancio' handleInputChange={handleInputChange}/>
        </Box>
        <Box>
          <SymptomRadioButton symptomValue='Fiebre'/>
        </Box>
     <div className="col-md-3">
                    <input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="nombre"></input>
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="Apellido" className="form-control" onChange={handleInputChange} name="apellido"></input>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
     </form> */}
      <TitleHeader backArrowRoute="/face-scale-screen" closeRoute="/" />
      <PainBox painLevel={painLevel} />
      <Text fontSize="md" mb="8" mt="8">
        ¿Tienes otros síntomas? <br /> Regístralos considerando que 0 es
        ausencia del síntoma y 10 es la mayor intensidad de este.
      </Text>

      <Stack spacing={10}>
        <Box>
          <Slider symptomValue="Cansancio" />
        </Box>
        <Box>
          <Slider symptomValue="Náusea" />
        </Box>
        <Box>
          <Slider symptomValue="Apetito" />
        </Box>
        <Box>
          <Slider symptomValue="Falta de aire" />
        </Box>
        <Box>
          <Slider symptomValue="Dificultad para tragar" />
        </Box>
        <Box>
          <SymptomRadioButton symptomValue="Constipación" />
        </Box>
        <Box>
          <SymptomRadioButton symptomValue="Fiebre" />
        </Box>
      </Stack>

      <Stack marginTop={8} width="100%" align="center">
        <CustomButton
          backgroundColor="lightGreen"
          color="white"
          hover={{ backgroundColor: 'darkGreen' }}
          onClick={() => {
            router.push('/successful-symptoms-registry')
          }}
          label="Registrar"
        />
      </Stack>
      <Stack marginTop={2} width="100%" align="center">
        <CustomButton
          backgroundColor="white"
          color="lightGreen"
          borderColor="lightGreen"
          border="2px"
          hover={{ backgroundColor: 'darkGreen', color: 'white' }}
          onClick={() => {
            router.push('/failed-symptoms-registry')
          }}
          label="Cancelar"
        />
      </Stack>
    </>
  )
}
export { SymptomsRegistry }
