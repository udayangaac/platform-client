import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Container} from "@material-ui/core";

const styles = {
    cardAction: {
        display: 'block',
        textAlign: 'initial'
    },
    root: {
        maxWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        margin: 12,

    },
};

function Dashboard(props) {
    return (
        <Container maxWidth="sm">
            <Card className={props.classes.root}>
                <ButtonBase
                    className={props.classes.cardAction}
                    onClick={event => {
                    }}>
                    <CardContent>
                        <Typography className={props.classes.title} color="textSecondary" gutterBottom>
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Hello
                        </Typography>
                        <Typography className={props.classes.pos} color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            <br/>
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                </ButtonBase>
            </Card>
        </Container>

    );
}

export default withStyles(styles)(Dashboard)

