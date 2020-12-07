import React, { FunctionComponent } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import {
  ErrorCodes,
  AuthenticationDeniedError,
  GenericError,
  Unauthorized,
  FailedSymptomsRegistry,
  FailedSymptomsRetrieval,
  UserRegistryError,
  UserManagementError,
} from 'src/components/Error'

const Error: FunctionComponent<{ statusCode: number }> = ({ statusCode }) => {
  const router = useRouter()
  const { error } = router.query

  switch (error as string) {
    case ErrorCodes.ACCESS_DENIED:
      return <AuthenticationDeniedError />
    case ErrorCodes.UNAUTHORIZED:
      return <Unauthorized />
    case ErrorCodes.FAILED_SYMPTOMS_REGISTRY:
      return <FailedSymptomsRegistry />
    case ErrorCodes.FAILED_SYMPTOMS_RETRIEVAL:
      return <FailedSymptomsRetrieval />
    case ErrorCodes.USER_REGISTRY_ERROR:
      return <UserRegistryError />
    case ErrorCodes.USER_LIST_ERROR:
      return <UserManagementError />
    default:
      switch (statusCode) {
        default:
          return <GenericError />
      }
  }
}

export const getServerSideProps: any = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 404
  return { props: { statusCode } }
}

export default Error
