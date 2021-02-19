import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";


const styles = (theme) => ({
    root: {
        maxWidth: "100%",
        height: "auto",
        minWidth: "50ch",
        zIndex: 1,
    },
    media: {
        position: 'relative',
        minHeight: 200,
        width: "100%",
    },

    locationTopRightTagContainer: {
        position: 'absolute',
        top: theme.spacing(0.5),
        right: theme.spacing(0.5),
    },

    locationTopLeftTagContainer: {
        position: 'absolute',
        top: theme.spacing(0.5),
        left: theme.spacing(0.5),
    },

    locationBottomRightTagContainer: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
    },

    locationBottomLeftTagContainer: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        left: theme.spacing(0.5),
    },

    locationTag: {
        margin: theme.spacing(0.5),
        fontFamily: " 'Open Sans', sans-serif;",
    },
    title: {
        fontFamily: " 'Open Sans', sans-serif;",
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
    },
});


class AdvertisementDetailedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModel: true,
            images: [
                "https://extranet.horisonhotels.com/assets/images/rooms/1e1e2c7071968cd6892f1e3794fa01ec.png"
            ]
        };
    }

    closeImageViewModel(e) {
        this.setState({
            isOpenModel: false,
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://extranet.horisonhotels.com/assets/images/rooms/1e1e2c7071968cd6892f1e3794fa01ec.png"
                            title=""
                        >
                            <div className={classes.locationTopLeftTagContainer}>
                                <Chip
                                    className={classes.locationTag}
                                    size="small"
                                    color={"primary"}
                                    label={this.props.id}
                                />
                            </div>
                            <div className={classes.locationTopRightTagContainer}>
                                <Chip
                                    className={classes.locationTag}
                                    size="small"
                                    color={"primary"}
                                    label="Batagoda"
                                    icon={<LocationOnIcon/>}
                                />
                            </div>
                            <div className={classes.locationBottomLeftTagContainer}>
                                <Chip
                                    className={classes.locationTag}
                                    size="small"
                                    color={"primary"}
                                    label="Horana"
                                    icon={<LocationOnIcon/>}
                                />
                            </div>
                            <div className={classes.locationBottomRightTagContainer}>
                                <Chip
                                    className={classes.locationTag}
                                    size="small"
                                    color={"primary"}
                                    label="Batagoda"
                                    icon={<LocationOnIcon/>}
                                />
                            </div>
                        </CardMedia>
                    </CardActionArea>
                    <CardContent>
                        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                            Advertisement Name
                        </Typography>
                        <Typography className={classes.title} variant="body2" color="textSecondary" component="p">
                            Advertisement description part...
                        </Typography>
                        <Typography className={classes.title} variant="h5" color="textSecondary">
                            <b>Rs: 5000.00</b>
                        </Typography>
                    </CardContent>

                </Card>

                {/*Model to dashboardView photos of the shortView*/}
                <Modal
                    className={classes.modal}
                    open={this.state.isOpenModel}
                    onClose={e => this.closeImageViewModel(e)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <section className={classes.modalContent}>
                        <img
                            src="https://extranet.horisonhotels.com/assets/images/rooms/1e1e2c7071968cd6892f1e3794fa01ec.png"/>
                    </section>
                </Modal>
            </>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AdvertisementDetailedView);
