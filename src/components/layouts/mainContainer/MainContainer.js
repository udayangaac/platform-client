import React, {Component} from "react";
import {Container, Grid} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleCard from "../../card/Card";
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
    title:{
       fontFamily: " 'Montserrat', sans-serif",
    }
});


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleAddChip(chip) {

    }

    handleDeleteChip(chip, index) {

    }

    render() {
        const {classes} = this.props;
        return (
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
                                color={"secondary"}
                                variant='outlined'
                                label="Search Terms"
                                onAdd={(chip) => this.handleAddChip(chip)}
                                onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                                chipRenderer={({value, text, isFocused, isDisabled, isReadOnly, handleClick, handleDelete, className}, key) => (
                                    <Chip
                                        color="primary"
                                        key={key}
                                        className={className}
                                        style={{
                                            pointerEvents: isDisabled || isReadOnly ? 'none' : undefined,
                                            backgroundColor: isFocused ? blue : undefined
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
                                <InputLabel id="categoryLabelId">Category</InputLabel>
                                <Select
                                    labelId="categoryLabelId"
                                    id="categoryId"
                                    defaultValue={0}>
                                    <MenuItem value={0}>All</MenuItem>
                                </Select>
                            </FormControl>
                            {/*country is disable for the first deployment*/}
                            <FormControl className={classes.formControl}>
                                <InputLabel id="countryLabelId">County</InputLabel>
                                <Select
                                    labelId="countryLabelId"
                                    id="countryId"
                                    defaultValue={1}>
                                    <MenuItem value={1}>Sri Lanka</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel id="cityLabelId">City</InputLabel>
                                <Select
                                    labelId="cityLabelId"
                                    id="cityId"
                                    defaultValue={0}>
                                    <MenuItem value={0}>All</MenuItem>
                                    <MenuItem value={1}>Horana</MenuItem>
                                </Select>
                            </FormControl>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} lg={2}>
                        <FormControl className={classes.formControl}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                            >Search</Button>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid className={classes.gridContainer}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl className={classes.formControl}>
                            <Button
                                variant={"text"}
                                color="primary"
                                size="small"
                            >Reset Filters</Button>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SimpleCard/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SimpleCard/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SimpleCard/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SimpleCard/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SimpleCard/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SimpleCard/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles, {withTheme: true})(MainContainer);
