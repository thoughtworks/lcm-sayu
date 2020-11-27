import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'

import {
  SuccessCodes,
  GenericSuccess,
  SuccessfulSymptomRegistry,
  SuccessfulUserRegistry,
} from 'src/components/Success'

const Success: FunctionComponent = () => {
  const router = useRouter()
  const { key } = router.query

  switch (key as string) {
    case SuccessCodes.SUCCESSFUL_SYMPTOM_REGISTRY:
      return <SuccessfulSymptomRegistry />
    case SuccessCodes.SUCCESSFUL_USER_REGISTRY:
      return <SuccessfulUserRegistry />
    default:
      return <GenericSuccess />
  }
}

export default Success
