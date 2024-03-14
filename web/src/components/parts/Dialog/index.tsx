import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import MUIDialog, { DialogProps as MUIDialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import DialogTitle from '@mui/material/DialogTitle'

export type ModalContent = {
  type?: 'error' | 'success'
  message?: string
}

type DialogProps = MUIDialogProps & {
  open: boolean
  title: string
  children: React.ReactNode
  content?: ModalContent
  handleClose?: () => void
  handleSubmit?: () => void
  submitButtonText?: string
  closeButtonText?: string
}

const Dialog = ({
  open,
  title,
  handleClose,
  handleSubmit,
  children,
  submitButtonText,
  closeButtonText,
  sx,
}: DialogProps) => {
  return (
    <MUIDialog
      open={open}
      onClose={handleClose}
      sx={{ ...sx, '& .MuiPaper-root': { gap: 1 } }}
    >
      <DialogTitle sx={{ fontSize: '20px' }}>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions sx={{ padding: 2, paddingTop: 0, gap: 4 }}>
        {handleClose && (
          <Button
            onClick={handleClose}
            size='large'
            variant='outlined'
            fullWidth
          >
            {closeButtonText ?? 'Cancel'}
          </Button>
        )}
        {handleSubmit && (
          <Button
            type='submit'
            onClick={handleSubmit}
            size='large'
            variant='contained'
            fullWidth
          >
            {submitButtonText ?? 'Submit'}
          </Button>
        )}
      </DialogActions>
    </MUIDialog>
  )
}

export default Dialog
