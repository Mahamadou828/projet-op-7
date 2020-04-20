import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropsType from "prop-types" ; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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

export default function PanelPost(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
        <Typography className={classes.heading}>General settings</Typography>
        <Typography className={classes.secondaryHeading}>There's the description of your post, title and image you choice in the last step</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <form className="markdown-form">
            <TextField
              id="title"
              defaultValue={props.title}
            />
            <TextField
              id="description"
              label="Multiline"
              multiline
              rows="10"
              defaultValue={props.description}
              variant="outlined"
            />
            <img src={`${props.file}`} alt="..." id="image" /> 
            <input type="file" id="picture" />
            <Button variant="contained" color="primary" onClick={() => props.change()}>
              Change
            </Button>
            </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

PanelPost.propTypes = {
    change: PropsType.func.isRequired ,
    title: PropsType.string.isRequired , 
    description: PropsType.string.isRequired , 
    file: PropsType.string.isRequired , 
}