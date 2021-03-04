import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import withStyles from "@material-ui/core/styles/withStyles";
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SimpleReactLightbox, {SRLWrapper} from "simple-react-lightbox";
import getImageURL from "../../../services/api/getResouceURL";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import draftJsToHtml from "draftjs-to-html";
import unEscape from "unescape-js";
import FingerprintTwoToneIcon from '@material-ui/icons/FingerprintTwoTone';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Price from 'react-price';
import Button from "@material-ui/core/Button";


const styles = (theme) => ({
    root: {
        width: "100%",
        maxWidth: "70ch",
        height: "auto",
        position: 'relative',
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
    closeBtn: {
        textTransform: "capitalize",
    },
    closeBtnContainer: {
        position: 'absolute',
        top: theme.spacing(0.5),
        right: theme.spacing(0.5),
    },
    cardContent: {
        position: 'relative',
    },

    locationTag: {
        margin: theme.spacing(0.5),
    },
    title: {
        fontWeight: "bold",
    },
    bottomContent: {
        marginTop: "1ch"
    },
    bottomLeftContent: {},

    bottomRightContent: {},

    modalContent: {
        outline: 0
    },
    icon: {
        position: "relative",
        top: theme.spacing.unit,
    },
    content: {},
    priceTag: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(1),
    },
    smallImages: {
        padding: theme.spacing(0.25),
    }
});

const options = {
    settings: {
        autoplaySpeed: 3000,
        boxShadow: 'none',
        disablePanzoom: false,
    },
    thumbnails: {
        showThumbnails: true,
        thumbnailsAlignment: 'center',
        thumbnailsContainerBackgroundColor: 'transparent',
        thumbnailsContainerPadding: '0',
        thumbnailsGap: '0 1px',
        thumbnailsIconColor: '#ffffff',
        thumbnailsOpacity: 0.4,
        thumbnailsPosition: 'bottom',
        thumbnailsSize: ['80px', '60px']
    },
    buttons: {
        iconPadding: "10px",
    }


};


class AdvertisementDetailedView extends Component {
    constructor(props) {
        super(props);
    }

    getDescHtml(text) {
        try {
            const json = JSON.parse(unEscape(text));
            const raw = convertFromRaw(json);
            const state = EditorState.createWithContent(raw);
            let __html = "";
            if (state) {
                const content = state.getCurrentContent();
                const raw = convertToRaw(content);
                __html = draftJsToHtml(raw);
            }
            console.log(__html);
            return __html;
        } catch (e) {
            return "<span>" + text + "</span>";
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <Card className={classes.root}>
                    <CardActionArea disabled>
                        <CardMedia
                            className={classes.media}
                            image={getImageURL(this.props.data.images[0], "800x600")}
                            title={this.props.data.title}
                        >
                            {this.props.data.labels.map((tile, i) => {
                                if (tile.alignment === "RB") {
                                    return (<div className={classes.locationBottomRightTagContainer}>
                                        <Chip
                                            className={classes.locationTag}
                                            size="small"
                                            label={tile.name}
                                            color="primary"
                                            style={{
                                                backgroundColor: tile.color,
                                            }}
                                        />
                                    </div>)
                                } else if (tile.alignment === "LB") {
                                    return (<div className={classes.locationBottomLeftTagContainer}>
                                        <Chip
                                            className={classes.locationTag}
                                            size="small"
                                            color="primary"
                                            label={tile.name}
                                            style={{
                                                backgroundColor: tile.color
                                            }}
                                        />
                                    </div>);
                                } else if (tile.alignment === "RT") {
                                    return (<div className={classes.locationTopRightTagContainer}>
                                        <Chip
                                            className={classes.locationTag}
                                            size="small"
                                            label={tile.name}
                                            color="primary"
                                            icon={<LibraryBooksIcon/>}
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
                                            icon={<FingerprintTwoToneIcon/>}
                                            style={{
                                                backgroundColor: tile.color
                                            }}
                                        />
                                    </div>);
                                }
                            })}
                        </CardMedia>
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.closeBtnContainer}>
                            <Button className={classes.closeBtn} onClick={this.props.close}>Close</Button>
                        </div>
                        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                            {this.props.data.title}
                        </Typography>
                        <Typography variant="body" color="textSecondary" component="p">
                            <div dangerouslySetInnerHTML={{__html: this.getDescHtml(this.props.data.desc)}}/>
                        </Typography>
                        <br/>
                        <SimpleReactLightbox>
                            <SRLWrapper options={options}>
                                {this.props.data.images.map((img, i) => {
                                    return (
                                        <a href={getImageURL(img, "800x600")}>
                                            <img width="80px"
                                                 className={classes.smallImages}
                                                 src={getImageURL(img, "thumbnail")}
                                                 alt=""/>
                                        </a>
                                    )
                                })}
                            </SRLWrapper>
                        </SimpleReactLightbox>
                        <br/>
                        <Typography className={classes.content}>
                            <LocationOnIcon className={classes.icon}/> {this.props.data.location}
                        </Typography>
                        <br/>
                        <Typography className={classes.content}>
                            <PhoneIcon className={classes.icon}/> {this.props.data.phone}
                        </Typography>
                        <br/>
                        <Typography className={classes.priceTag} variant="h4" color="textSecondary">
                            <Price currencyFirst={true} currency={this.props.data.currency_code}
                                   cost={this.props.data.price_str}/>
                        </Typography>
                    </CardContent>
                </Card>
            </>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AdvertisementDetailedView);
