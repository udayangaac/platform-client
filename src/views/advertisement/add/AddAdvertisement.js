import React, {Component} from "react";
import MenuAppBar from "../../../components/header/MenuAppBar";
import {Container, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import getBaseURL from "../../../services/api/getBaseURL";
import getBearerToken from "../../../services/api/getBearerToken";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import DeleteIcon from '@material-ui/icons/Delete';
import getImageURL from "../../../services/api/getResouceURL";


const styles = (theme) => ({
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
    images: {margin: theme.spacing(0, 1, 0),},
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        display: 'none',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
});


class AddAdvertisement extends Component {

    /**
     * Default data
     */

    constructor(props) {
        super(props);
        this.state = {
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
            title: "Sample add",
            desc: "This is sample add",
            images: [
                {
                    file_name: "2021_02_13_00_29_13_314c2c4d-1f8d-4f88-af7b-cfbda588573f.jpg",
                    base_url: "not applicable"
                },
                {
                    file_name: "2021_02_13_00_29_13_314c2c4d-1f8d-4f88-af7b-cfbda588573f.jpg",
                    base_url: "not applicable"
                },
                {
                    file_name: "2021_02_13_00_29_13_314c2c4d-1f8d-4f88-af7b-cfbda588573f.jpg",
                    base_url: "not applicable"
                }
            ],
            category_id: 1,
            city_id: 1,
            phone: "0762278118",
            email: "chamith@gmail.com",
            price: 2000.5
        }

    }


    /**
     * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
     */
    componentDidMount() {
        this.getStatus();
        this.getCountries();
        this.getCategories();
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

    handleChange(files) {
        this.setState({
            files: files
        });
    }


    render() {
        const {classes} = this.props;
        return (
            <section>
                <MenuAppBar/>
                <Container className={classes.root}>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <Typography variant="h5" className={classes.mainTitle}>
                            Dashboard
                        </Typography>
                    </Grid>

                    <Grid container spacing={1} className={classes.gridContainer}>
                        <TextField
                            id=""
                            label="Title"
                            type="title"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <TextField
                            id="standard-password-input"
                            label="Description"
                            type="title"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <TextField
                            id=""
                            select
                            label="Category"
                            defaultValue={1}
                            fullWidth={true}
                        >
                            {this.state.categories.map(function (row, i) {
                                if (row.id !== -1) {
                                    return (<MenuItem value={row.ID}>{row.name}</MenuItem>)
                                }
                            })}
                        </TextField>
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <TextField
                            nameCountry
                            select
                            label="Country"
                            defaultValue={0}
                            fullWidth={true}
                            onChange={e => {
                                this.onCountryChange(e);
                            }}
                        >
                            {this.state.countries.map(function (row, i) {
                                return (<MenuItem value={row.ID}>{row.name}</MenuItem>)
                            })}
                        </TextField>
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <TextField
                            name="city"
                            select
                            label="Cities"
                            defaultValue={0}
                            fullWidth={true}
                        >
                            {this.state.cities.map(function (row, i) {
                                if (row.id !== -1) {
                                    return (<MenuItem value={row.ID}>{row.name}</MenuItem>)
                                }
                            })}
                        </TextField>
                    </Grid>
                    <br/>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <GridList className={classes.gridList} cols="25%" >
                            {this.state.images.map((tile) => (
                                <GridListTile key={tile.file_name}>
                                    <img src={getImageURL(tile.file_name, "thumbnail")}/>
                                    <GridListTileBar
                                        actionIcon={
                                            <IconButton aria-label={`delete`}><DeleteIcon/></IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                    <Grid container spacing={2} className={classes.gridContainer}>
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file"/>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera/>
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <TextField
                            label="Phone"
                            type="phone"
                            required
                        />
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <TextField
                            label="E-mail"
                            type="email"
                            required
                        />
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <TextField
                            label="Price"
                            type="price"
                            required
                        />
                    </Grid>
                </Container>
            </section>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AddAdvertisement);

