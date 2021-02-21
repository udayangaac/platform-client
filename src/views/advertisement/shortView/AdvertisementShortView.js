import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import withStyles from "@material-ui/core/styles/withStyles";
import getImageURL from "../../../services/api/getResouceURL";


const styles = (theme) => ({
    root: {
        fontFamily: "'Nunito Sans', sans-serif",
        position: 'relative',
    },
    media: {
        minHeight: 200,
        width: "100%",
    },
    locationTagContainer: {
        fontFamily: "'Nunito Sans', sans-serif",
        position: 'absolute',
        top: theme.spacing(0.5),
        left: theme.spacing(0.5),
    },
    locationTag: {
        margin: theme.spacing(0.5),
        fontFamily: "'Nunito Sans', sans-serif",
    },
    title: {
        fontFamily: "'Nunito Sans', sans-serif",
        fontWeight: "bold",
    },
    locationTopRightTagContainer: {
        fontFamily: "'Nunito Sans', sans-serif",
        position: 'absolute',
        top: theme.spacing(0.5),
        right: theme.spacing(0.5),
    },

    locationTopLeftTagContainer: {
        fontFamily: "'Nunito Sans', sans-serif",
        position: 'absolute',
        top: theme.spacing(0.5),
        left: theme.spacing(0.5),
    },

    locationBottomRightTagContainer: {
        fontFamily: "'Nunito Sans', sans-serif",
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
    },

    locationBottomLeftTagContainer: {
        fontFamily: "'Nunito Sans', sans-serif",
        position: 'absolute',
        bottom: theme.spacing(0.5),
        left: theme.spacing(0.5),
    },
});

class AdvertisementShortView extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpenModel: false};
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={getImageURL(this.props.data.images[0], "thumbnail")}
                        />
                        <CardContent>
                            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                                {this.props.data.title}
                            </Typography>
                            <Typography className={classes.title} variant="body2" color="textSecondary" component="p">
                                {this.props.data.desc_part}
                            </Typography>
                            <Typography className={classes.title} variant="h5" color="textSecondary">
                                <b>{this.props.data.price_str}</b>
                            </Typography>
                        </CardContent>
                        {this.props.data.labels.map((tile, i) => {
                            if (tile.alignment === "RT") {
                                return (<div className={classes.locationTopRightTagContainer}>
                                    <Chip
                                        className={classes.locationTag}
                                        size="small"
                                        label={tile.name}
                                        color="primary"
                                        style={{
                                            backgroundColor: tile.color
                                        }}
                                    />
                                </div>);
                            } else {
                                return (<div className={classes.locationTopLeftTagContainer}>
                                    <Chip
                                        className={classes.locationTag}
                                        size="small"
                                        label={tile.name}
                                        color="primary"
                                        icon={<LocationOnIcon/>}
                                        style={{
                                            backgroundColor: tile.color
                                        }}
                                    />
                                </div>);
                            }
                        })}
                    </CardActionArea>
                </Card>
            </>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AdvertisementShortView);
