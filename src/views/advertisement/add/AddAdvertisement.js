import React, {Component} from "react";
import MenuAppBar from "../../../components/header/MenuAppBar";
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

const styles = (theme) => ({
    gridContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    mainTitle: {
        margin: theme.spacing(1, 0, 1),
    },
    images: {margin: theme.spacing(0, 1, 0),},
    root: {
        '& .MuiTextField-root': {
            width: '50ch',
        },
    },
    input: {
        display: 'none',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    titleBar: {
        background: "none",
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
        width: '25ch',
    }
});


class AddAdvertisement extends Component {

    /**
     * Default data
     */

    constructor(props) {
        super(props);
        this.state = {
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
            country_id: 1,
            city_id: 0,
            phone: "",
            email: "",
            price: 0
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
        if (this.state.images.length > 1) {
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
        this.setAlert(false,"","")
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

        console.log(JSON.stringify(this.state));
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
            price: this.state.price,
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


    render() {
        const {classes} = this.props;
        return (
            <section>
                <MenuAppBar/>
                <Container className={classes.root}>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h4" className={classes.mainTitle}>
                                Add Advertisement
                            </Typography>
                        </Grid>

                        {this.state.is_alert_visible && (<Alert className={classes.topAlert} severity="error">
                            <AlertTitle>{this.state.alert_title}</AlertTitle>
                            {this.state.alert_message}
                        </Alert>)}
                        <Grid container spacing={1} className={classes.gridContainer}>
                            <TextField
                                name="title"
                                label="Title"
                                type="text"
                                required
                                defaultValue={this.state.title}
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            />
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <TextField
                                label="Description"
                                type="text"
                                name="desc"
                                required
                                defaultValue={this.state.desc}
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            />
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <TextField
                                select
                                label="Category"
                                name="category_id"
                                required
                                onChange={e => {
                                    this.onChange(e)
                                }}
                                defaultValue={this.state.category_id}
                            >
                                {this.state.categories.map(function (row, i) {
                                    if (row.id !== -1) {
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
                                defaultValue={this.state.country_id}
                                onChange={e => {
                                    this.onCountryChange(e);
                                }}
                            >
                                {this.state.countries.map(function (row, i) {
                                    return (<MenuItem value={row.ID}>{row.name}</MenuItem>)
                                })}
                            </TextField>
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <TextField
                                select
                                label="City"
                                name="city_id"
                                defaultValue={this.state.city_id}
                                required
                                onChange={e => {
                                    this.onChange(e)
                                }}
                                defaultValue={0}
                            >
                                {this.state.cities.map(function (row, i) {
                                    if (row.id !== -1) {
                                        return (<MenuItem value={row.ID}>{row.name}</MenuItem>)
                                    }
                                })}
                            </TextField>
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <Typography variant="h6" className={classes.mainTitle}>
                                Image Preview
                            </Typography>
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <GridList className={classes.gridList} cols="25%">
                                {this.state.images.map((tile, i) => (
                                    <GridListTile key={tile.file_name}>
                                        <img className={classes.uploadImg}
                                             src={getImageURL(tile.file_name, "thumbnail")}/>
                                        <GridListTileBar className={classes.titleBar}
                                                         actionIcon={
                                                             <IconButton aria-label={`delete`}
                                                                         onClick={e => this.onDeleteImage(i, tile.file_name)}>
                                                                 <DeleteIcon/>
                                                             </IconButton>
                                                         }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
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
                            <TextField
                                label="Phone"
                                type="phone"
                                name="phone"
                                defaultValue={this.state.phone}
                                required
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            />
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <TextField
                                label="E-mail"
                                type="email"
                                name="email"
                                defaultValue={this.state.email}
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            />
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <TextField
                                label="Price"
                                type="price"
                                name="price"
                                required
                                defaultValue={this.state.price}
                                onChange={e => {
                                    this.onChange(e)
                                }}
                            />
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Container>
            </section>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AddAdvertisement);

