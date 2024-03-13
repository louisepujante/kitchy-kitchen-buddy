'use client'

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type SnackbarInfoProps = {  
  open: boolean
  severity?: 'success' | 'error'
  message?: string
}

type SnackbarContextValues = {
  snackbarInfo: SnackbarInfoProps
  setSnackbarInfo: Dispatch<SetStateAction<SnackbarInfoProps>>
}

export const defaultSnackbarInfo: SnackbarInfoProps = {
  severity: undefined,
  message: '',
  open: false,
}

const SnackbarContext = createContext<SnackbarContextValues>({
  snackbarInfo: defaultSnackbarInfo,
  setSnackbarInfo: () => {},
})

export const SnackbarContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [snackbarInfo, setSnackbarInfo] =
    useState<SnackbarInfoProps>(defaultSnackbarInfo)

  return (
    <SnackbarContext.Provider value={{ snackbarInfo, setSnackbarInfo }}>
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbarContext = () => {
  const values = useContext(SnackbarContext)

  if (!values) {
    throw new Error(
      'Component is not wrapped with a SnackbarProvider.'
    )
  }

  return values
}
