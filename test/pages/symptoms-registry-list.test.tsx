import React from 'react'
import { screen, cleanup, render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'
import { SymptomsRegistryList } from 'src/steps/SymptomsRegistryList'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('<SymptomsRegistryList />', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <SymptomsRegistryList />
      </ThemeProvider>
    )
    jest.clearAllMocks()
  })

  afterEach(cleanup)

  test('should display month/year of symptoms registered', async () => {
    const data = [
      {
        airLevel: 3,
        appetiteLevel: 5,
        depositionLevel: true,
        feverLevel: true,
        id: 1,
        nauseaLevel: 0,
        painLevel: 6,
        swallowLevel: 8,
        symptomDate: '2020-11-18T15:12:40.528Z',
        tireLevel: 1,
      },
      {
        airLevel: 3,
        appetiteLevel: 8,
        depositionLevel: true,
        feverLevel: false,
        id: 2,
        nauseaLevel: 0,
        painLevel: 6,
        swallowLevel: 10,
        symptomDate: '2020-11-18T22:12:40.528Z',
        tireLevel: 2,
      },
    ]
    mockedAxios.get.mockResolvedValue(data)

    const month = screen.getByText(/noviembre, 2020/i)

    expect(month).toBeInTheDocument()
  })
})
