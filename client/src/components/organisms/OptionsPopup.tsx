import {
  Popover,
  PopoverProps,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React from 'react';

export interface OptionsPopupProps extends PopoverProps {
  onClose: () => void;
  options: Array<{
    key: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
}
const OptionsPopup = ({ onClose, options, ...props }: OptionsPopupProps) => {
  return (
    <Popover {...props} sx={{ zIndex: 1200, ...props.sx }} onClose={onClose}>
      {options.map((option) => {
        return (
          <MenuItem
            onClick={() => {
              option.onClick();
              onClose();
            }}
            key={option.key}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        );
      })}
    </Popover>
  );
};

export default OptionsPopup;
