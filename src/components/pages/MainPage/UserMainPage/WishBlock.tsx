import React from "react";
import {Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import {SentimentVerySatisfiedRounded} from "@mui/icons-material";

import {goodDayWishes} from "../../../../assets/wishesArray.ts";

const WishBlock: React.FC = () => {
    const wishNum = Math.floor(Math.random() * goodDayWishes.length)
    return (
        <>
            <SentimentVerySatisfiedRounded
                fontSize={'large'}
                sx={{
                    width: '100%',
                    mx: '0 auto',

                    fill: green[300],
                }}
            />
            <Typography
                textAlign={'center'}
                color={'success'}
                variant={'h2'}
                sx={{mb: 3}}
                fontWeight={500}
                fontSize={18}
            >
                Відмітку збереженно!
            </Typography>
            <Typography
                textAlign={'center'}
                variant={'subtitle1'}
                color={'textSecondary'}
            >
               №{wishNum + 1}
            </Typography>
            <Typography
                variant="h3"
                textAlign="center"
                fontSize={22}
            >
                {goodDayWishes[wishNum]}
            </Typography>
        </>
    )
}

export default WishBlock