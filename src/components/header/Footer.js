import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

export default function MenuAppBar() {
    return (
        <Box mt={8}>
            <Typography
                style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                }}
                variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    )
}
