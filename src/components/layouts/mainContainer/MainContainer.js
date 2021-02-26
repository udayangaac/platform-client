import React, {Component} from "react";
import {Container, Grid} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Chip from '@material-ui/core/Chip';
import {blue} from "@material-ui/core/colors";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import AdvertisementDetailedView from "../../../views/advertisement/detailedView/AdvertisementDetailedView";
import axios from "axios";
import getBaseURL from "../../../services/api/getBaseURL";
import AdvertisementShortView from "../../../views/advertisement/shortView/AdvertisementShortView";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MessengerCustomerChat from "react-messenger-customer-chat";

const styles = (theme) => ({
    gridContainer: {
        paddingTop: '10px'
    },
    formControl: {
        margin: theme.spacing(0.5),
        minWidth: 100,
    },
    searchFormControl: {
        width: "100%",
    },
    title: {},
    modal: {
        position: 'absolute',
        left: '10%',
        overflow: 'scroll',
        display: 'flex',
        alignItems: 'stretch',
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
    filterBtn: {
        textTransform: "capitalize"
    },
    searchBtn: {
        textTransform: "capitalize"
    }
});

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModel: false,
            modelData: {},
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


            country_id: 1,
            category_id: 0,
            city_id: 0,
            search_terms_tmp: [],

            // Search related status


            search_terms: [],
            category_ids: [],
            country_id_search: 0,
            city_ids: [],

            list: [],
            pagination: {},
        };
    }


    // Chip input related functions
    // Add chip
    handleAddChip(chip) {
    }

    // Chip change
    handleChange(chips) {
        this.setState({
            search_terms_tmp: chips,
        })
    }

    // Delete chip
    handleDeleteChip(chip, index) {
        console.log(chip, index)
    }


    handleModelOpen(e) {
        this.setState({
            isOpenModel: true
        })
    };

    handleModelClose(e) {
        this.setState({
            isOpenModel: false
        })
    };

    componentDidMount() {
        this.getCountries();
        this.getCategories();
        this.getCities(this.state.country_id);
        this.getAdvertisementList(0)
    }

    /**
     * Call common api to get Status of the platform
     */
    getCategories() {
        axios.get(getBaseURL("/public/v1/categories")).then(res => {
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
        axios.get(getBaseURL("/public/v1/countries")).then(res => {
            let countries = res.data.map(x => x);
            this.setState({
                countries: countries,
            });
        }).catch(err => {
            console.log(err)
        });
    }

    /**
     * Get cities
     */
    getCities(countryId) {
        axios.get(getBaseURL("/public/v1/cities")).then(res => {
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
        this.getCities(this.state.country_id)
    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSearchButtonClick(e) {
        console.log(this.state);
        if (this.state.city_id !== 0) {
            this.setState({
                city_ids: [this.state.city_id],
            });
        }

        if (this.state.category_id !== 0) {
            this.setState({
                category_ids: [this.state.category_id],
            });
        }

        this.setState({
            country_id_search: this.state.country_id,
            search_terms: this.state.search_terms_tmp,
        });

        console.log({
            search_terms: this.state.search_terms,
            category_ids: this.state.category_ids,
            country_id: this.state.country_id_search,
            city_ids: this.state.city_ids,
        });

        this.getAdvertisementList(0)
    }

    onClearFilterButtonClick(e) {
        console.log(this.state);
        this.setState({
            search_terms: [],
            category_ids: [],
            country_id_search: 0,
            city_ids: [],
        });

        console.log({
            search_terms: this.state.search_terms,
            category_ids: this.state.category_ids,
            country_id: this.state.country_id_search,
            city_ids: this.state.city_ids,
        });
        this.getAdvertisementList(0)
    }


    getAdvertisementList(pageIndex) {
        let url = getBaseURL("/public/v1/search?page_index=" + pageIndex + "&page_count=5");
        axios.post(url, {
            search_terms: this.state.search_terms,
            category_ids: this.state.category_ids,
            country_id: this.state.country_id_search,
            city_ids: this.state.city_ids,
        }, {
            headers: {}
        }).then(res => {
            let list = res.data.list.map(x => x);
            this.setState({
                list: list,
                pagination: res.data.pagination,
            });
        }).catch(err => {
            console.log(err)
        });
    }

    onPrevIconClick(e) {
        this.getAdvertisementList(this.state.pagination.previous)
    };

    onNextIconClick(e) {
        this.getAdvertisementList(this.state.pagination.next)
    };


    onViewAdvertisement(id) {
        let url = getBaseURL("/public/v1/advertisement/" + id);
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({
                modelData: res.data,
                isOpenModel: true,
            })
        }).catch(err => {
        });
    }

    onItemClick(id) {
        console.log("Clicked", id);
        this.onViewAdvertisement(id)
    }


    render() {
        const {classes} = this.props;
        return (
            <>
                <Container>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <Typography variant="h6" className={classes.title}>
                            Filters
                        </Typography>
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <FormControl className={classes.searchFormControl}>
                                <ChipInput
                                    className={classes.font}
                                    color={"secondary"}
                                    variant='outlined'
                                    label="Search Terms"
                                    onAdd={(chip) => this.handleAddChip(chip)}
                                    onChange={(chips) => this.handleChange(chips)}
                                    onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                                    chipRenderer={({value, text, isFocused, isDisabled, isReadOnly, handleClick, handleDelete, className}, key) => (
                                        <Chip
                                            color="primary"
                                            key={key}
                                            className={className}
                                            style={{
                                                pointerEvents: isDisabled || isReadOnly ? 'none' : undefined,
                                                backgroundColor: isFocused ? blue : undefined,
                                            }}
                                            size="small"
                                            onClick={handleClick}
                                            onDelete={handleDelete}
                                            label={text}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FormGroup row>
                                <FormControl className={classes.formControl}>
                                    <InputLabel className={classes.font} id="categoryLabelId">Category</InputLabel>
                                    <Select
                                        className={classes.font}
                                        name="category_id"
                                        onChange={e => {
                                            this.onChange(e)
                                        }}
                                        labelId="categoryLabelId"
                                        defaultValue={0}>
                                        {this.state.categories.map(function (row, i) {
                                            if (row.id !== -1) {
                                                return (<MenuItem className={classes.font}
                                                                  value={row.ID}>{row.name}</MenuItem>)
                                            }
                                        })}
                                    </Select>
                                </FormControl>
                                {/*country is disable for the first deployment*/}
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="countryLabelId" className={classes.font}>County</InputLabel>
                                    <Select
                                        className={classes.font}
                                        name="country_id"
                                        labelId="countryLabelId"
                                        id="countryId"
                                        onChange={e => {
                                            this.onChange(e);
                                            this.onCountryChange(e);
                                        }}
                                        defaultValue={0}>
                                        {this.state.countries.map(function (row, i) {
                                            return (
                                                <MenuItem className={classes.font} value={row.ID}>{row.name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel className={classes.font} id="cityLabelId">City</InputLabel>
                                    <Select
                                        className={classes.font}
                                        labelId="cityLabelId"
                                        id="cityId"
                                        name="city_id"
                                        onChange={e => {
                                            this.onChange(e)
                                        }}
                                        defaultValue={0}>
                                        {this.state.cities.map(function (row, i) {
                                            return (
                                                <MenuItem className={classes.font} value={row.ID}>{row.name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2}>
                            <FormControl className={classes.formControl}>
                                <Button
                                    className={classes.searchBtn}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={e => this.onSearchButtonClick(e)}
                                >Search</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid className={classes.gridContainer}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl className={classes.formControl}>
                                <Button
                                    className={classes.filterBtn}
                                    variant={"text"}
                                    color="primary"
                                    size="small"
                                    onClick={e => this.onClearFilterButtonClick(e)}
                                >Reset Filters</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} className={classes.gridContainer}>

                        {this.state.list.map((d, i) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} onClick={e => {
                                    this.onItemClick(d.id)
                                }}>
                                    <AdvertisementShortView data={d}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <br/>
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
                        />
                        <BottomNavigationAction
                            disabled={this.state.pagination.next === -1}
                            label="next"
                            onClick={e => {
                                this.onNextIconClick(e)
                            }}
                            icon={<ArrowForwardIosIcon/>}/>
                    </BottomNavigation>
                    <div>
                        <MessengerCustomerChat
                            pageId="102850301858242"
                            appId="1315776515444028"
                            loggedInGreeting="Chat with us"
                            loggedOutGreeting="Thank you"
                        />
                    </div>
                </Container>
                <div>
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
                            <AdvertisementDetailedView close={event => this.handleModelClose(event)}
                                                       data={this.state.modelData}/>
                        </section>
                    </Modal>
                </div>
            </>
        )
    }
}

export default withStyles(styles, {withTheme: true})(MainContainer);
