import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {makeStyles} from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme) => ({
    root: {
        position: 'relative',
    },
    media: {
        minHeight: 200,
        width:"100%",
    },
    locationTagContainer: {
        position: 'absolute',
        top: theme.spacing(0.5),
        left: theme.spacing(0.5),
    },
    locationTag: {
        margin: theme.spacing(0.5),
        fontFamily: " 'Open Sans', sans-serif;",
    },
    title: {
        fontFamily: " 'Open Sans', sans-serif;",
    }

});


class AddView extends Component {
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
                            image="https://extranet.horisonhotels.com/assets/images/rooms/1e1e2c7071968cd6892f1e3794fa01ec.png"
                            title=""
                        />
                        <CardContent>
                            <Typography  className={classes.title} gutterBottom variant="h5" component="h2">
                                Advertisement Name
                            </Typography>
                            <Typography className={classes.title} variant="body2" color="textSecondary" component="p">
                                Advertisement description part...
                            </Typography>
                            <Typography className={classes.title} variant="h5" color="textSecondary">
                                <b>Rs: 5000.00</b>
                            </Typography>
                        </CardContent>
                        <div className={classes.locationTagContainer}>
                            <Chip
                                className={classes.locationTag}
                                size="small"
                                color={"primary"}
                                label="Horana"
                                icon={<LocationOnIcon/>}
                            />
                        </div>
                    </CardActionArea>
                </Card>
            </>
        )
    }
}
export default withStyles(styles, {withTheme: true})(AddView);
