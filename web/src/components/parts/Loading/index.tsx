import { Backdrop, CircularProgress } from '@mui/material'

const Loading = ({ open }: { open: boolean }) => {
  return (
    <Backdrop sx={{ color: '#000', zIndex: 10000, width: '100%' }} open={open}>
      <CircularProgress color='inherit' />
      hello
    </Backdrop>
  )
}

export default Loading
