import { Button, ButtonGroup, ClickAwayListener,  Grow,  MenuItem,  MenuList, Paper, Popper, } from "@mui/material";
import { useRef, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ICustomSelect } from "../layout/models";

interface IProps {
  selectData: ICustomSelect[];
  selectedValue: string;
  onHandleButtonSelectGroup: (data: string) => void;
}

const getIndexByValue = (value: string, selectData:ICustomSelect[] ): number => {
  let returnIndex = 0;
  selectData.map(
    (data, index) => {
      if(data.value === value) {
        returnIndex = index;
      }
    }
  )

  return returnIndex;
}

export const BasicButtonGroup = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(getIndexByValue(props.selectedValue, props.selectData));
  const options = props.selectData;

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = async(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    event.preventDefault();
    setSelectedIndex(index);
    setOpen(false);
    props.onHandleButtonSelectGroup(options[index].value);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };


  return (
    <>
        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
          <Button size="small" onClick={handleClick}>{options[selectedIndex].label}</Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option.label}  
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
    </>
  )
}
