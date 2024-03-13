import { createTheme } from '@mui/material'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const theme = createTheme({
  typography: {
    // fontFamily: `${inter.style.fontFamily}, Helvetica`
    fontFamily: [
      `${inter.style.fontFamily}`,
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})