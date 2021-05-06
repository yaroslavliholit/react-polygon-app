import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    pageWrapper: {
      padding: '40px 50px',
      [theme.breakpoints.down('md')]: {
        padding: '30px',
      },
    },
    networkIndicatorWrapper: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
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
    headerInfoContainerMobile: {
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    priceIndicatorWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    priceTitle: {
      marginRight: 13,
      fontSize: 32,
      fontWeight: 'bold',
    },
    priceLow: {
      fontSize: 18,
      color: theme.palette.error.main,
    },
    pricePositive: {
      fontSize: 18,
      color: theme.palette.success.main,
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
      justifyContent: 'space-between',
      marginBottom: 35,
      [theme.breakpoints.down('md')]: {
        marginBottom: 15,
      },
    },
    pageSectionItem: {
      width: '48%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    aboutCompanyWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        marginBottom: 20,
      },
    },
    aboutCompanyInfo: {
      width: '45%',
    },
    aboutCompanyAddress: {
      width: '40%',
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
      fontWeight: 'bold',
    },
    tagsWrapper: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column-reverse',
      },
    },
  })
);

export default useStyles;
