import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {Container, Grid} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = (theme) => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    mainTitle: {
        margin: theme.spacing(2, 0, 2),
    },
    subTitle: {
        margin: theme.spacing(2, 0, 0),
    },
    listAvatarSmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    listAvatarLarge: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: theme.spacing(0, 1, 0),
    },
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
    statusDropdown: {
        minWidth: "200px"
    },
    filterForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        }
    }
});

class AdminContainer extends Component {

    createData(id, title, expire_date, status) {
        return {id, title, expire_date, status};
    }

    getStatusTag(status) {
        if (status === 1) {
            return (
                <Chip
                    variant="default"
                    size="small"
                    label="Active"
                    color="primary"
                />
            )
        } else {
            return (
                <Chip
                    variant="default"
                    size="small"
                    label="Pending Activation"
                    color="green"
                />
            )
        }
    }

    render() {
        const {classes} = this.props;
        const rows = [
            this.createData(502, "Luxury Hotel Rooms", "2021-01-10 5:00 PM", 1),
            this.createData(502, "Luxury Hotel Rooms", "2021-01-10 5:00 PM", 2),
        ];

        return (
            <Container>
                <Grid container spacing={1} className={classes.gridContainer}>
                    <Typography variant="h5" className={classes.mainTitle}>
                        Dashboard
                    </Typography>
                </Grid>
                <Grid container spacing={1} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant="h6" className={classes.subTitle}>
                            Your Advertisements
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <form className={classes.filterForm} noValidate autoComplete="off">
                            <TextField
                                id=""
                                label="Reference ID"
                                variant="standard"/>
                            <TextField
                                id=""
                                select
                                label="Select"
                                defaultValue={10}>
                                <MenuItem value={20}>Pending Approval</MenuItem>
                                <MenuItem value={10}>Active</MenuItem>
                                <MenuItem value={30}>Expired</MenuItem>
                            </TextField>
                        </form>
                    </Grid>
                </Grid>
                <List dense={false}>
                    {rows.map((row) => (
                        <ListItem divider={true}>
                            <ListItemAvatar>
                                <Avatar className={classes.listAvatarLarge} variant="square"/>
                            </ListItemAvatar>
                            <ListItemText primary={row.title} secondary={
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>{row.expire_date}</Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>{this.getStatusTag(row.status)}</Grid>
                                </Grid>
                            }/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="settings">
                                    <SettingsIcon fontSize="small"/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Container>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AdminContainer);
