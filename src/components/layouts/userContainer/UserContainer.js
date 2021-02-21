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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import AdvertisementDetailedView from "../../../views/advertisement/detailedView/AdvertisementDetailedView";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import BlockIcon from "@material-ui/icons/Block";



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
            modelData: {},
            statuses: [],
            status: -1,
            pagination: {
                next: -1,
                previous: -1,
                current: 0,
                total_count: 0
            }
        };
    };

    getStatusTag(status) {
        if (status === 1) {
            return (
                <Chip
                    variant="default"
                    size="small"
                    color="secondary"
                    label="Pending Activation"
                    style={{
                        backgroundColor: "#C8C800"
                    }}
                    icon={<AssignmentTurnedInIcon/>}
                />
            )
        } else if (status === 2) {
            return (
                <Chip
                    variant="default"
                    size="small"
                    label="Active"
                    color="secondary"
                    style={{
                        backgroundColor: "#00c800"
                    }}
                    icon={<DoneAllIcon/>}
                />
            )
        } else {
            return (
                <Chip
                    variant="default"
                    size="small"
                    label="Blocked"
                    color="secondary"
                    icon={<BlockIcon/>}
                    style={{
                        backgroundColor: "#c80000"
                    }}
                />
            )
        }
    }

    getStatus() {
        axios.get(getBaseURL("/common/v1/statuses"), {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(res => {
            let statuses = res.data.map(x => x);
            this.setState({
                statuses: statuses,
            });
        }).catch(err => {
            // Log the error in the console
            console.log(err)
        });
    }

    componentDidMount() {
        this.getUserAdvertisementList(0, this.state.status);
        this.getStatus();
    }

    getUserAdvertisementList(pageIndex, status) {
        let url = getBaseURL("/user/v1/advertisements?page_index=" + pageIndex + "&page_count=5");
        if (status !== -1) {
            url = url + "&status=" + status
        }
        axios.get(url, {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(res => {
            let advertisement = res.data.rows.map(x => x);
            this.setState({
                advertisement: advertisement,
                pagination: res.data.pagination,
            });
        }).catch(err => {

        });
    }

    onEditAdvertisement(e, id) {
        this.props.history.push("/dashboard/advertisement/edit/" + id)
    };

    onViewAdvertisement(e, id) {
        let url = getBaseURL("/public/v1/advertisement/"+id);
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({
                modelData: res.data,
                isOpenModel: true,
            })
        }).catch(err => {

        });
    }


    onPrevIconClick(e) {
        this.getUserAdvertisementList(this.state.pagination.previous, this.state.status)
    };

    onNextIconClick(e) {
        this.getUserAdvertisementList(this.state.pagination.next, this.state.status)
    };

    onStatusFilterChange(e) {
        this.setState({
            status: e.target.value
        });
        this.getUserAdvertisementList(0, e.target.value)
    };


    handleModelClose(e) {
        this.setState({
            isOpenModel: false
        })
    };


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
                                    defaultValue={-1}
                                    onChange={e => {
                                        this.onStatusFilterChange(e)
                                    }}
                                >
                                    {this.state.statuses.map(function (row, i) {
                                        return (<MenuItem value={row.id}>{row.text}</MenuItem>)
                                    })}
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
                                    <IconButton onClick={e => {
                                        this.onEditAdvertisement(e, row.id)
                                    }} aria-label="edit">
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton onClick={e =>{
                                        this.onViewAdvertisement(e, row.id)
                                    }}>
                                        <VisibilityIcon fontSize="small"/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <BottomNavigation>
                        <BottomNavigationAction
                            disabled={this.state.pagination.previous === -1}
                            label="previous"
                            onClick={e => {
                                this.onPrevIconClick(e)
                            }}
                            icon={<ArrowBackIosIcon/>}/>
                        <BottomNavigationAction
                            disabled={true}
                            icon={<b>{this.state.pagination.current + 1}</b>}
                        />
                        <BottomNavigationAction
                            disabled={this.state.pagination.next === -1}
                            label="next"
                            onClick={e => {
                                this.onNextIconClick(e)
                            }}
                            icon={<ArrowForwardIosIcon/>}/>
                    </BottomNavigation>
                </Container>
                <Modal
                    className={classes.modal}
                    open={this.state.isOpenModel}
                    onClose={event => this.handleModelClose(event)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <section className={classes.modalContent}>
                        <AdvertisementDetailedView data={this.state.modelData}/>
                    </section>
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(UserContainer);
