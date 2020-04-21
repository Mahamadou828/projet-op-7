import React from 'react';
import PropsType from "prop-types" ; 
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Badge from '@material-ui/core/Badge';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

export default function NavBar (props) {

    return (
        <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical outlined primary button group"
        >
            <Button onClick={() => props.onLike()} >
                <StyledBadge badgeContent={props.numLike} color="secondary">
                    <FavoriteIcon />
                </StyledBadge> 
            </Button>
            <Button onClick={() => props.onDislike()}>
                <StyledBadge badgeContent={props.numDislike} color="secondary">
                    <ThumbDownAltIcon />
                </StyledBadge> 
            </Button>
            <Button>
                <StyledBadge badgeContent={0} color="secondary">
                    <ChatBubbleTwoToneIcon />
                </StyledBadge> 
            </Button>
            <Button onClick={() => props.onShare()}>
                <StyledBadge badgeContent={props.numShare} color="secondary">
                    <ShareIcon />
                </StyledBadge> 
            </Button>
            <Button onClick={() => props.onRedirect()}>
                <ArrowLeftIcon />
            </Button>
        </ButtonGroup>
    ) ; 
}

NavBar.propTypes = {
    numLike: PropsType.number.isRequired , 
    numDislike: PropsType.number.isRequired , 
    numShare: PropsType.number.isRequired , 
    onRedirect: PropsType.func.isRequired , 
    onShare: PropsType.func.isRequired , 
    onLike: PropsType.func.isRequired , 
    onDislike: PropsType.func.isRequired , 
}