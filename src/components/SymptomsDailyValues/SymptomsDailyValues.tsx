import React from 'react'
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Icon,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import axios from 'axios'

import { Role } from 'src/model/Role'
import { DateService } from 'src/services/DateService'
import { ErrorCodes } from 'src/components/Error'

import styles from './symptomsDailyValues.module.scss'

type SymptomsLevel = {
  symptomTimeStamp: number
  painLevel: number
  tireLevel: number
  appetiteLevel: number
  nauseaLevel: number
  swallowLevel: number
  airLevel: number
  depositionLevel: boolean
  feverLevel: boolean
  rescueLevel: boolean
}

const SymptomsDailyValues = ({
  symptomTimeStamp,
  painLevel,
  tireLevel,
  appetiteLevel,
  nauseaLevel,
  swallowLevel,
  airLevel,
  depositionLevel,
  feverLevel,
  rescueLevel,
}: SymptomsLevel) => {
  const [session] = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const dateService = new DateService()
  const symptomDate = new Date(symptomTimeStamp)

  const symptomDay = dateService.formatDayAndNumberDate(symptomTimeStamp)
  const symptomHour = dateService.formatHourAndMinutes(symptomTimeStamp)
  const symptomMonth = dateService.getMonthName(symptomDate.getMonth())
  const symptomYear = symptomDate.getFullYear()

  return (
    <div
      className={`${styles['symptom-list']} ${
        rescueLevel && styles['with-rescue']
      }`}
    >
      <Text fontSize={'xs'} ml={1} lineHeight={'tall'}>
        {symptomHour}
      </Text>
      <Box ml={1}>
        <div className={`${styles['dolor-value']} ${styles['symptom-circle']}`}>
          {painLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['cansancio-value']} ${styles['symptom-circle']}`}
        >
          {tireLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['apetito-value']} ${styles['symptom-circle']}`}
        >
          {appetiteLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['nauseas-value']} ${styles['symptom-circle']}`}
        >
          {nauseaLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['tragar-value']} ${styles['symptom-circle']}`}
        >
          {swallowLevel}
        </div>
      </Box>
      <Box>
        <div className={`${styles['aire-value']} ${styles['symptom-circle']}`}>
          {airLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['deposicion-value']} ${styles['symptom-circle']}`}
        >
          {depositionLevel ? 'SI' : 'NO'}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['fiebre-value']} ${styles['symptom-circle']}`}
        >
          {feverLevel ? 'SI' : 'NO'}
        </div>
      </Box>
      {session?.role === Role.CUIDADOR && (
        <Box>
          <button
            title={`Borrar registro ${symptomDay} ${symptomHour}`}
            onClick={onOpen}
          >
            <Icon name="delete" />
          </button>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar registro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Confirmas que deseas eliminar el registro de síntomas del día{' '}
            <strong>
              {symptomDay} de {symptomMonth} del {symptomYear} a las{' '}
              {symptomHour}
            </strong>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              borderColor="lightGreen"
              color="lightGreen"
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              variantColor="teal"
              backgroundColor="lightGreen"
              variant="solid"
              onClick={async () => {
                try {
                  await axios.delete(
                    `/api/remove-registries?registry-timestamp=${symptomTimeStamp}`
                  )
                  router.reload()
                } catch (err) {
                  router.push(
                    `/_error?error=${ErrorCodes.FAILED_REGISTRY_REMOVE}`
                  )
                }
              }}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SymptomsDailyValues
