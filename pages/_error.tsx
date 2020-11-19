import React, { FunctionComponent } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import {
  ErrorCodes,
  AuthenticationDeniedError,
  GenericError,
  Unauthorized,
  FailedSymptomsRegistry,
} from 'src/components/Error'

const Error: FunctionComponent<{ statusCode: number }> = ({ statusCode }) => {
  const router = useRouter()
  const { error } = router.query

  switch (error as string) {
    case ErrorCodes.AccessDenied:
      return <AuthenticationDeniedError />
    case ErrorCodes.Unauthorized:
      return <Unauthorized />
    case ErrorCodes.FailedSymptomsRegistry:
      return <FailedSymptomsRegistry />
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
