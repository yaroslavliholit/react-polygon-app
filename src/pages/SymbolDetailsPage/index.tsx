import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import useFetchTickerDetails from '../../shared/hooks/useFetchTickerDetails';
import TagsList from '../../shared/components/TagsList';
import useStyles from './styles';
import SymbolChart from '../../shared/components/SymbolChart';
import { ReactComponent as DownArrow } from '../../shared/assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '../../shared/assets/icons/up-arrow.svg';
import ShowMoreText from '../../shared/components/ShowMoreText';
import Map from '../../shared/components/Map';
import ErrorIndicator from '../../shared/components/ErrorIndicator';
import ROUTES_PATHS from '../../app/routes/paths';
import withCommonLayout from '../../shared/hocs/withCommonLayout';

const SymbolDetailsPage = () => {
  // ****** DATA START ******
  const history = useHistory();
  const cn = useStyles();

  const { id } = useParams<{ id: string }>();
  const {
    networkError,
    isAnyLoading,
    tickerDetails,
    lastAvailablePrice,
    priceDifference,
    changePercent,
    aggregatesBars,
  } = useFetchTickerDetails(id);

  const companyInfos = [
    { label: 'Selector:', description: tickerDetails?.sector },
    { label: 'Industry:', description: tickerDetails?.industry },
    { label: 'CEO:', description: tickerDetails?.ceo },
    { label: 'Employees:', description: tickerDetails?.employees },
  ];

  const isPositiveNumber = Math.sign(priceDifference || -1) !== -1;
  // ****** DATA END ******

  // ****** CALLBACKS START ******
  const handleSelectSuggestion = useCallback(
    (ticker: string) => {
      history.push(ROUTES_PATHS.getSymbolDetailsUrl(ticker));
    },
    [history]
  );
  // ****** CALLBACKS END ******

  // ****** JSX START ******
  if (isAnyLoading) {
    return (
      <div className={cn.networkIndicatorWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (networkError) {
    return <ErrorIndicator />
  }

  if (!tickerDetails || !aggregatesBars.length) return null;

  return (
    <div className={cn.pageWrapper}>
      <section className={cn.header}>
        <div className={cn.headerInfoContainer}>
          <div className={cn.symbolTitle}>{tickerDetails.symbol}</div>
          <div>{tickerDetails.name}</div>
        </div>
        <div className={`${cn.headerInfoContainer} ${cn.headerInfoContainerMobile}`}>
          <div className={cn.priceTitle}>${lastAvailablePrice}</div>
          <div className={cn.priceIndicatorWrapper}>
            <span className={isPositiveNumber ? cn.pricePositive : cn.priceLow}>
              {priceDifference}
            </span>
            {isPositiveNumber ? <UpArrow /> : <DownArrow />}
            <span className={isPositiveNumber ? cn.pricePositive : cn.priceLow}>
              {changePercent}%
            </span>
          </div>
        </div>
      </section>

      <section className={cn.pageSection}>
        <SymbolChart chartData={aggregatesBars} />
      </section>

      <section className={cn.pageSection}>
        <div className={cn.pageSectionItem}>
          <Typography variant={'subtitle1'} gutterBottom>About {tickerDetails.symbol}</Typography>
          <div className={cn.aboutCompanyWrapper}>
            <div className={cn.aboutCompanyInfo}>
              <ul className={cn.infoList}>
                {companyInfos.map((e) => (
                  <li key={e.label} className={cn.infoListItem}>
                    {e.label} <span className={cn.infoListItemValue}>{e.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn.aboutCompanyAddress}>
              {/* @ts-ignore */}
              <div>{tickerDetails.hq_address}</div>
              <div>{tickerDetails.phone}</div>
            </div>
          </div>
        </div>
        <div className={cn.pageSectionItem}>
          <Map />
        </div>
      </section>

      <section className={cn.pageSection}>
        <div className={cn.pageSectionItem}>
          <Typography variant={'subtitle1'} gutterBottom>Description</Typography>
          {tickerDetails.description && <ShowMoreText text={tickerDetails.description} />}
        </div>
        <div className={`${cn.pageSectionItem} ${cn.tagsWrapper}`}>
          <TagsList
            title={'Related Stocks'}
            items={tickerDetails.similar}
            colors={['#e51616', '#58d38c']}
            onItemClick={handleSelectSuggestion}
          />
          <TagsList title={'Tags'} items={tickerDetails.tags} colors={['#8b40cb', '#5887d3']} />
        </div>
      </section>
    </div>
  );
  // ****** JSX END ******
};

export default withCommonLayout(SymbolDetailsPage);
