import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({
    pageWrapper: {
        padding: '40px 50px',
        [theme.breakpoints.down('md')]: {
            padding: '30px',
        },
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    headerInfoContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 8,
    },
    priceTitle: {
        marginRight: 13,
        fontSize: 32,
        fontWeight: 'bold',
    },
    priceLow: {
        fontSize: 18,
        color: '#e51616'
    },
    symbolTitle: {
        marginRight: 13,
        fontSize: 22,
        fontWeight: 'bold',
    },
    pageSubTitle: {
        fontSize: 18,
        marginBottom: 14,
    },
    pageSection: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    pageSectionItem: {
        width: '48%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    infoList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    infoListItem: {
        marginBottom: 3,
    },
    infoListItemValue: {
        fontWeight: 'bold'
    },
}));

export default useStyles;
