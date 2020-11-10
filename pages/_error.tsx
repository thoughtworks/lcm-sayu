import React, { FunctionComponent } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import {
  AuthenticationDeniedError,
  GenericError,
  Unauthorized,
} from 'src/components/Error'

const Error: FunctionComponent<{ statusCode: number }> = ({ statusCode }) => {
  const router = useRouter()
  const { error } = router.query

  switch (error) {
    case 'AccessDenied':
      return <AuthenticationDeniedError />
    case 'Unauthorized':
      return <Unauthorized />
    default:
      switch (statusCode) {
        default:
          return <GenericError />
      }
  }
}

export const getServerSideProps: any = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { props: { statusCode } }
}

export default Error
