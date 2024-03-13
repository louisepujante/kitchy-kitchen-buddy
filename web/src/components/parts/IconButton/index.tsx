import { IconButton } from '@mui/material'

type ActionButtonProps = {
  onClick: () => void
  icon: React.ReactNode
}

const CustomIconButton = ({ onClick, icon }: ActionButtonProps) => {
  return (
    <IconButton
      sx={{
        '&.MuiButtonBase-root:hover': {
          bgcolor: 'transparent',
        },
      }}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  )
}

export default CustomIconButton