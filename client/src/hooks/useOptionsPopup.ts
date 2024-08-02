import { MouseEvent, useState } from 'react';

interface TReturnUseOptionsPopup {
  id: number;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleOpen: (event: MouseEvent<HTMLButtonElement>, id: number) => void;
  handleClose: () => void;
}

const useOptionsPopup = (): TReturnUseOptionsPopup => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [id, setId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    setId(id);
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return { id, open, anchorEl, handleOpen, handleClose };
};

export default useOptionsPopup;
