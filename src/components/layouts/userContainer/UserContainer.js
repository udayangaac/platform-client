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
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import getBaseURL from "../../../services/api/getBaseURL";
import getBearerToken from "../../../services/api/getBearerToken";
import getImageURL from "../../../services/api/getResouceURL";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';


const styles = (theme) => ({
    root: {},
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
    addButton: {},
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
        this.getUserAdvertisementList(0)
    }


    getUserAdvertisementList(pageIndex) {
        axios.get(getBaseURL("/user/v1/advertisements?page_index=" + pageIndex + "&page_count=10"), {
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

    onEditAdvertisement(e, id) {
        this.props.history.push("/dashboard/advertisement/edit/" + id)
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Container>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} className={classes.mainTitle}>
                            <Typography variant="h5">
                                Dashboard
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.mainTitle}>
                            <Tooltip
                                title="Add Advertisement" aria-label="add">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href="/dashboard/advertisement/add"
                                    className={classes.addButton}
                                    startIcon={<AddIcon/>}
                                >Create</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid spacing={1} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography variant="h6" className={classes.subTitle}>
                                Your Advertisements
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid spacing={1} className={classes.gridContainer}>
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
                                    <Avatar className={classes.listAvatarLarge}
                                            src={getImageURL(row.image, "thumbnail")}
                                            variant="square"/>
                                </ListItemAvatar>
                                <ListItemText primary={row.title} secondary={
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={4} md={4} lg={4}>{row.expire_date}</Grid>
                                        <Grid item xs={12} sm={4} md={4}
                                              lg={4}>{this.getStatusTag(row.status.id)}</Grid>
                                    </Grid>
                                }/>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={e=>{this.onEditAdvertisement(e,row.id)}} aria-label="edit">
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton aria-label="view">
                                        <VisibilityIcon fontSize="small"/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <BottomNavigation>
                        <BottomNavigationAction label="previous" icon={<ArrowBackIosIcon/>}/>
                        <BottomNavigationAction label="next" icon={<ArrowForwardIosIcon/>}/>
                    </BottomNavigation>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(UserContainer);
