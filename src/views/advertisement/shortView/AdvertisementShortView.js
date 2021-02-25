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
import Price from "react-price";


const styles = (theme) => ({
    root: {
        position: 'relative',
    },
    media: {
        minHeight: 200,
        width: "100%",
    },
    locationTagContainer: {
        position: 'absolute',
        top: theme.spacing(0.5),
        left: theme.spacing(0.5),
    },
    locationTag: {
        margin: theme.spacing(0.5),
    },
    title: {
        fontWeight: "bold",
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
                                <Price currencyFirst={true} currency={"LKR"} cost={this.props.data.price_str} />
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
