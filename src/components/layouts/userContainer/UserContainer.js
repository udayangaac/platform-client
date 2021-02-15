import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {Container, Grid} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import getBaseURL from "../../../services/api/getBaseURL";
import getBearerToken from "../../../services/api/getBearerToken";
import getImageURL from "../../../services/api/getResouceURL";

const styles = (theme) => ({
    gridContainer: {},
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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 0,
        borderRadius: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        "&:focus": {
            outline: "none",
            border: 0,
        },
        "&:active": {
            outline: "none",
            border: 0,
        },
    },
    modalContent: {
        outline: 0
    }
});

class UserContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advertisement: [],
            isOpenModel: false,
        };
    };

    getStatusTag(status) {
        if (status === 1) {
            return (
                <Chip
                    variant="default"
                    size="small"
                    label="Pending Activation"
                    color="green"
                />
            )
        } else if (status === 2) {
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
                    label="Blocked"
                    color="green"
                />
            )
        }
    }

    componentDidMount() {
        this.getUserAdvertisementList()
    }


    getUserAdvertisementList() {
        axios.get(getBaseURL("/user/v1/advertisements"), {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(res => {
            let advertisement = res.data.rows.map(x => x);
            this.setState({
                advertisement: advertisement,
            });
        }).catch(err => {

        });
    }

    render() {
        const {classes} = this.props;
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
                    <Tooltip title="Add Advertisement" aria-label="add">
                        <Fab href="/dashboard/advertisement/add" color="secondary" className={classes.addButton}>
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid container spacing={1} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <form className={classes.filterForm} noValidate autoComplete="off">
                            <TextField
                                id=""
                                select
                                label="Select"
                                defaultValue={10}
                            >
                                <MenuItem value={20}>Pending Approval</MenuItem>
                                <MenuItem value={10}>Active</MenuItem>
                                <MenuItem value={30}>Expired</MenuItem>
                            </TextField>
                        </form>
                    </Grid>
                </Grid>
                <List dense={false}>
                    {this.state.advertisement.map((row) => (
                        <ListItem divider={true}>
                            <ListItemAvatar>
                                <Avatar className={classes.listAvatarLarge} src={getImageURL(row.image, "thumbnail")}
                                        variant="square"/>
                            </ListItemAvatar>
                            <ListItemText primary={row.title} secondary={
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>{row.expire_date}</Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>{this.getStatusTag(row.status.id)}</Grid>
                                </Grid>
                            }/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="delete">
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <VisibilityIcon fontSize="small"/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Container>
        )
    }
}

export default withStyles(styles, {withTheme: true})(UserContainer);
