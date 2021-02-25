import React, {Component} from "react";
import {Button, Container, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import getBaseURL from "../../../services/api/getBaseURL";
import getBearerToken from "../../../services/api/getBearerToken";
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import DeleteIcon from '@material-ui/icons/Delete';
import getImageURL from "../../../services/api/getResouceURL";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import ImageService from "../../../services/api/ImageService";
import CircularProgress from '@material-ui/core/CircularProgress';
import {green} from '@material-ui/core/colors';
import {Alert, AlertTitle} from '@material-ui/lab';
import Modal from '@material-ui/core/Modal';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import unEscape from "unescape-js";
import MuiPhoneNumber from "material-ui-phone-number";

const styles = (theme) => ({
    gridContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& .MuiTextField-root': {
            width: '50ch',
        },
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    mainTitle: {
        margin: theme.spacing(1, 0, 1),
    },
    images: {margin: theme.spacing(0, 1, 0),},
    root: {},
    input: {
        display: 'none',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    uploadImg: {
        fill: "fluid",
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    topAlert: {
        width: '50ch',
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
    imageView: {
        maxWidth: "100%",
        height: "auto",
    },
    descEditor: {
        lineHeight: 1,
    }
});


class AdvertisementDashboardView extends Component {

    /**
     * Default data
     */


    constructor(props) {
        super(props);
        this.state = {
            show_image_view_model: false,
            image_url_view_model: "",

            is_alert_visible: false,
            alert_title: "",
            alert_message: "",

            is_spinner_enable: false,
            // Drop downs
            statuses: [],
            categories: [],
            countries: [],
            cities: [
                {
                    ID: 0,
                    name: "Select your country",
                }
            ],
            // Form data
            id: 0, // this is no use by this page
            title: "",
            desc: "",
            images: [],
            category_id: 0,
            country_id: 0,
            city_id: 0,
            phone: "",
            email: "",
            price: 0,

            editorState: this.stringToDraftState('{"blocks":[{"key":"492qc","text":"Please describe your advertisement here ...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}')
        };


        if (this.props.type === "user_add_edit") {
            this.getAdvertisement(this.props.id)
        }
    }

    setAlert(isVisible, title, message) {
        if (!isVisible) {
            this.setState({
                is_alert_visible: false,
                alert_title: "",
                alert_message: "",
            });
        }
        this.setState({
            is_alert_visible: isVisible,
            alert_title: title,
            alert_message: message,
        });
    }

    /**
     * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
     */
    componentDidMount() {
        this.getCountries();
        this.getCategories();
        this.getCities(this.state.country_id);
    }

    /**
     * Call common api to get Status of the platform
     */
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

    /**
     * Call common api to get Status of the platform
     */
    getCategories() {
        axios.get(getBaseURL("/common/v1/categories"), {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(res => {
            let categories = res.data.map(x => x);
            this.setState({
                categories: categories,
            });
        }).catch(err => {
            // Log the error in the console
            console.log(err)
        });
    }

    /**
     * Get countries
     */
    getCountries() {
        axios.get(getBaseURL("/common/v1/countries"), {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(res => {
            let countries = res.data.map(x => x);
            this.setState({
                countries: countries,
            });
        }).catch(err => {
            // Log the error in the console
            console.log(err)
        });
    }

    /**
     * Get cities
     */
    getCities(countryId) {
        axios.get(getBaseURL("/common/v1/cities"), {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(res => {
            let cities = res.data.map(x => x);
            this.setState({
                cities: cities,
            });
        }).catch(err => {
            // Log the error in the console
            console.log(err)
        });
    }

    /**
     * This function is used start fetch cities
     * @param e
     */
    onCountryChange(e) {
        this.getCities(0)
    }

    handleUploadClick(e) {
        console.log(this.state.images.length);
        if (this.state.images.length > 4) {
            this.setAlert(
                true,
                "Error",
                "Please select five best images for your advertisement.")
            return
        }
        this.setState({
            is_spinner_enable: true
        });
        ImageService.uploadImage(e).then(res => {
            this.setState({
                images: this.state.images.concat({
                    file_name: res.data.file_name,
                    base_url: "not applicable"
                },),
                is_spinner_enable: false
            });
            console.log(res.data.file_name)
        }).catch(err => {
            this.setState({
                is_spinner_enable: false
            });
            console.log(err)
        })
    };

    // common setter for text filed
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.setAlert(false, "", "")
    };

    onDeleteImage(index, name) {
        ImageService.deleteImage(name).then(res => {
            let images = [...this.state.images];
            if (index !== -1) {
                images.splice(index, 1);
                this.setState({images: images});
            }
            this.setAlert(false, "", "")
        }).catch(err => {
            console.log(err)
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.images.length === 0) {
            this.setAlert(
                true,
                "Error",
                "Upload images.");
            return
        }
        if (this.state.country_id === 0) {
            this.setAlert(
                true,
                "Error",
                "Select your country.");
            return
        }

        if (this.state.city_id === 0) {
            this.setAlert(
                true,
                "Error",
                "Select your city.");
            return
        }

        if (this.state.category_id === 0) {
            this.setAlert(
                true,
                "Error",
                "Select your advertisement category.");
            return
        }

        if (this.props.type === "user_add") {
            this.addAdvertisement(e).finally(() => {
                console.log("Submitted advertisement")
            })
        }

        if (this.props.type === "user_add_edit") {
            this.updateAdvertisement(e).finally(() => {
                console.log("Re-Submitted advertisement")
            })
        }
    }

    addAdvertisement(e) {
        const url = getBaseURL('/user/v1/advertisement');
        return axios.post(url, {
            id: this.state.id,
            title: this.state.title,
            desc: this.state.desc,
            images: this.state.images,
            category_id: this.state.category_id,
            country_id: this.state.country_id,
            city_id: this.state.city_id,
            phone: this.state.phone,
            email: this.state.email,
            price: Number(this.state.price),
        }, {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(value => {
            this.props.history.push("/dashboard")
        }).catch(reason => {
            console.log("Error", reason)
        });
    }

    updateAdvertisement(e) {
        const url = getBaseURL('/user/v1/advertisement');
        return axios.put(url, {
            id: this.state.id,
            title: this.state.title,
            desc: this.state.desc,
            images: this.state.images,
            category_id: this.state.category_id,
            country_id: this.state.country_id,
            city_id: this.state.city_id,
            phone: this.state.phone,
            email: this.state.email,
            price: Number(this.state.price),
        }, {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(value => {
            this.props.history.push("/dashboard")
        }).catch(reason => {
            console.log("Error", reason)
        });
    }

    getAdvertisement(id) {
        const url = getBaseURL('/user/v1/advertisement/' + id);
        return axios.get(url, {
            headers: {
                Authorization: getBearerToken()
            }
        }).then(value => {
            this.setState({
                id: value.data.id,
                title: value.data.title,
                desc: value.data.desc,
                images: value.data.images,
                category_id: value.data.category_id,
                country_id: value.data.country_id,
                city_id: value.data.city_id,
                phone: value.data.phone,
                email: value.data.email,
                price: Number(value.data.price),
                // Sample
                editorState: this.stringToDraftState(unEscape(value.data.desc))
            });
            console.log(this.state)
        }).catch(reason => {
            console.log("Error", reason)
        });
    }


    openImageViewModel(e, name) {
        this.setState({
            show_image_view_model: true,
            image_url_view_model: getImageURL(name, "800x600"),
        });
    }


    closeImageViewModel(e) {
        this.setState({
            show_image_view_model: false,
            image_url_view_model: "",
        });
    }

    stringToDraftState(text) {
        try {
            const json = JSON.parse(text);
            const raw = convertFromRaw(json);
            const state = EditorState.createWithContent(raw);
            console.log(state);
            return state;
        } catch (e) {
            return EditorState.createEmpty();
        }
    }

    handleOnPhoneChange(num) {
        this.setState({
            phone: num,
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <section>
                <Container className={classes.root}>

                    <form onSubmit={e => this.onSubmit(e)}>

                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h4"
                                        className={classes.mainTitle}>
                                {this.props.title}
                            </Typography>
                        </Grid>

                        {this.state.is_alert_visible && (
                            <Alert className={classes.topAlert}
                                   severity="error">
                                <AlertTitle>{this.state.alert_title}</AlertTitle>
                                {this.state.alert_message}
                            </Alert>)}


                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h6"
                                        className={classes.mainTitle}>
                                Title
                            </Typography>
                        </Grid>
                        <Grid container spacing={1} className={classes.gridContainer}>
                            <TextField
                                name="title"
                                type="text"
                                required
                                value={this.state.title}
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            />
                        </Grid>


                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h6"
                                        className={classes.mainTitle}>
                                Description
                            </Typography>
                        </Grid>
                        <div style={{
                            border: "1px solid black",
                            minHeight: "300px",
                        }}>
                            <Editor
                                editorState={this.state.editorState}
                                stripPastedStyles={true}
                                editorClassName={classes.descEditor}
                                onEditorStateChange={(text) => {
                                    this.setState({
                                        editorState: text,
                                        desc: JSON.stringify(convertToRaw(text.getCurrentContent()))
                                    });

                                }}
                                toolbar={{
                                    options: ["inline", "list", "link", "colorPicker"],
                                    emoji: {
                                        className: "demo-option-custom",
                                        popupClassName: "demo-popup-custom"
                                    }
                                }}
                            />
                        </div>

                        <Grid container className={classes.gridContainer}>
                            <TextField
                                select
                                label="Category"
                                name="category_id"
                                required
                                onChange={e => {
                                    this.onChange(e)
                                }}
                                value={this.state.category_id}
                            >
                                {this.state.categories.map(function (row, i) {
                                    if (row.ID !== 0) {
                                        return (<MenuItem value={row.ID}>{row.name}</MenuItem>)
                                    }
                                })}
                            </TextField>
                        </Grid>

                        <Grid container className={classes.gridContainer}>
                            <TextField
                                select
                                label="Country"
                                required
                                name="country_id"
                                value={this.state.country_id}
                                onChange={e => {
                                    this.onCountryChange(e);
                                    this.onChange(e);
                                }}
                            >
                                {this.state.countries.map(function (row, i) {
                                    if (row.ID !== 0) {
                                        return (<MenuItem value={row.ID}>{row.name}</MenuItem>)
                                    }
                                })}
                            </TextField>
                        </Grid>

                        <Grid container className={classes.gridContainer}>
                            <TextField
                                select
                                label="City"
                                name="city_id"
                                value={this.state.city_id}
                                required
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            >
                                {this.state.cities.map(function (row, i) {
                                    if (row.ID !== 0) {
                                        return (<MenuItem value={row.ID}>{row.name}</MenuItem>)
                                    }
                                })}
                            </TextField>
                        </Grid>


                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h6"
                                        className={classes.mainTitle}>
                                Image Preview
                            </Typography>
                        </Grid>


                        {/*Image viewing components*/}
                        <Grid container className={classes.gridContainer}>
                            <GridList className={classes.gridList} cols="25%">
                                {console.log("Images", this.state.images)}
                                {this.state.images.map((tile, i) => (
                                    <GridListTile key={tile.file_name}>
                                        <img className={classes.uploadImg}
                                             src={getImageURL(tile.file_name, "thumbnail")}/>
                                        <GridListTileBar className={classes.titleBar}
                                                         actionIcon={
                                                             <section>
                                                                 <IconButton aria-label={`view`}
                                                                             onClick={e => this.openImageViewModel(e, tile.file_name)}>
                                                                     <VisibilityIcon color="primary"/>
                                                                 </IconButton>
                                                                 <IconButton aria-label={`delete`}
                                                                             onClick={e => this.onDeleteImage(i, tile.file_name)}>
                                                                     <DeleteIcon color="primary"/>
                                                                 </IconButton>
                                                             </section>
                                                         }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>

                        {/*
                        Button combined with the spinner to visualize the
                        uploading process.
                        */}
                        <Grid container className={classes.gridContainer}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={e => this.handleUploadClick(e)}
                            />
                            <label htmlFor="contained-button-file">
                                <div className={classes.wrapper}>
                                    <Fab component="span" className={classes.button}>
                                        <AddPhotoAlternateIcon/>
                                    </Fab>
                                    {this.state.is_spinner_enable &&
                                    <CircularProgress size={68} className={classes.fabProgress}/>}
                                </div>
                            </label>
                        </Grid>

                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h6" className={classes.mainTitle}>Phone</Typography>
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <MuiPhoneNumber
                                autoFormat={true}
                                required
                                value={this.state.phone}
                                defaultCountry={'lk'} onChange={e => {
                                this.handleOnPhoneChange(e)
                            }}/>,
                        </Grid>



                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h6" className={classes.mainTitle}>E-mail</Typography>
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <TextField
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            />
                        </Grid>

                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h6" className={classes.mainTitle}>Price</Typography>
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <TextField
                                type="price"
                                name="price"
                                required
                                value={this.state.price}
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            />
                        </Grid>

                        <Grid container className={classes.gridContainer}>

                            {/*Submit advertisement for approval process*/}
                            {(this.props.type === 'user_add') &&
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>}

                            {/*Button to re submit the changes to the platform*/}
                            {/*When we resubmitting remove the */}
                            {(this.props.type === 'user_add_edit') &&
                            <Button type="submit" variant="contained">
                                Re Submit
                            </Button>}

                            {/* Button for admin usage */}
                            {(this.props.type === 'admin') && <>
                                <Button type="submit" variant="contained">
                                    Approve
                                </Button>
                                <Button type="submit" variant="contained">
                                    Block
                                </Button>
                            </>}

                        </Grid>
                    </form>
                </Container>

                {/*Model to dashboardView photos of the shortView*/}
                <Modal
                    className={classes.modal}
                    open={this.state.show_image_view_model}
                    onClose={e => this.closeImageViewModel(e)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <section className={classes.modalContent}>
                        {console.log(this.state.image_url_view_model)}
                        <img className={classes.imageView} src={this.state.image_url_view_model}/>
                    </section>
                </Modal>

            </section>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AdvertisementDashboardView);

