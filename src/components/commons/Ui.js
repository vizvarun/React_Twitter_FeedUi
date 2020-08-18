import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';

export const ProfileMenu = ({ButtonChildren,MenuChildren,btnClass}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Sidebar-option"  style={{
      borderRadius : '30px'
    }}>
      <Button 
      aria-controls="simple-menu" 
      aria-haspopup="true" 
      onClick={handleClick} 
      fullWidth 
      className={btnClass}>
        {ButtonChildren}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="Popup-Menu"
      >
       {MenuChildren}
      </Menu>
    </div>
  );
}


export const FollowUp = ({Image,SomeProp,name,idname,newClass}) =>{
    return(
        <>
            <Avatar src={Image} alt="Name" className={`${newClass}-img`} />
            <div className={`${newClass}-name--container`}>
              <div className={`${newClass}-name`}>{name}</div>
              <div className={`${newClass}-idname`}>{idname}</div>
            </div>
            {SomeProp}
        </>
    )
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    bottom : 0,
    left: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export const ControlledAccordions = ({ButtonChildren,MenuChildren,IconExpand}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={`Profile`} style={{
        borderRadius : '30px',
        boxShadow : 'none'
      }}>
        <AccordionSummary
          expandIcon={IconExpand}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
        {ButtonChildren}
        </AccordionSummary>
        <AccordionDetails>
          {MenuChildren}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
