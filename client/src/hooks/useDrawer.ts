import { useState } from 'react';

interface TReturnUseDrawer {
  open: boolean;
  onOpen: (callback?: () => void) => void;
  onClose: () => void;
}

const useDrawer = (): TReturnUseDrawer => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = (callback?: () => void) => {
    setOpen(true);
    callback?.();
  };
  const onClose = () => {
    setOpen(false);
  };

  return { open, onOpen, onClose };
};

export default useDrawer;
