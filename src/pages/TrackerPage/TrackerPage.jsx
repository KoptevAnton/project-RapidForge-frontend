import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedMonth } from '../../redux/water/selectors.js';
import { useEffect, useState } from 'react';
import {
  getWaterByMonth,
  getWaterRecords,
} from '../../redux/water/operations.js';
import dayjs from 'dayjs';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import TourSteps from '../../onboardingTour/TourSteps.jsx';
import clsx from 'clsx';
import css from './TrackerPage.module.css';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const [isTour, setIsTour] = useState(false);
  const selectedMonth = useSelector(selectSelectedMonth);

  const [year, month] = selectedMonth.split('-');
  const todayDate = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    dispatch(getWaterByMonth({ month, year }));
  }, [dispatch, month, year]);

  useEffect(() => {
    dispatch(getWaterRecords(todayDate));
  }, [dispatch, todayDate]);

  // Запустити тур вручну
  const handleStartTour = () => {
    setIsTour(true);
  };

  // Закрити тур після завершення
  const handleCloseTour = () => {
    setIsTour(false);
    localStorage.setItem('tourFinished', 'true');
  };

  return (
    <div className={clsx('container', css.container)}>
      {isTour ? (
        <TourSteps onClose={handleCloseTour}>
          <WaterMainInfo tourOn={handleStartTour} />
          <WaterDetailedInfo />
        </TourSteps>
      ) : (
        <>
          <WaterMainInfo tourOn={handleStartTour} />
          <WaterDetailedInfo />
        </>
      )}
    </div>
  );
}
