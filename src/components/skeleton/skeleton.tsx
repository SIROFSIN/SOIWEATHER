import styles from './skeleton.module.scss';
import classNames from 'classnames';

export const WeatherSkeleton = () => {
    return (
        <div className={styles.fadeIn}>
            <div className="text-center mb-8 flex flex-col justify-center items-center">
                {/* Weather Icon */}
                <div className={styles.div3}>
                    <div className={classNames(styles.skeleton, styles.weatherIcon)} />
                </div>

                {/* Temperature */}
                <div className={styles.temperature}>
                    <div className={classNames(styles.skeleton, styles.value)} />
                    <div className={classNames(styles.skeleton, styles.unit)} />
                </div>

                {/* Location */}
                <div className={classNames(styles.skeleton, styles.location)} />

                {/* Description */}
                <div className={classNames(styles.skeleton, styles.description)} />
            </div>

            {/* Weather Details */}
            <div className="flex justify-between mt-8 text-center">
                {[0, 1, 2].map((index) => (
                    <div key={index} className={styles.detailItem}>
                        <div className={classNames(styles.skeleton, styles.icon)} />
                        <div className={classNames(styles.skeleton, styles.label)} />
                        <div className={classNames(styles.skeleton, styles.value)} />
                    </div>
                ))}
            </div>

            {/* Hourly Forecast */}
            <div className={styles.hourlyForecast}>
                <div className={styles.scrollContainer}>
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className={classNames(styles.skeleton, styles.item)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const WeeklyForecastSkeleton = () => {
    return (
        <div className={styles.fadeIn}>
            <h3 className={classNames(styles.skeleton, styles.weeklyTitle)}>
                <div className="w-40 h-6" />
            </h3>
            <div className={styles.weeklyContainer}>
                {[...Array(7)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className={classNames(styles.skeleton, styles.weeklyDate)} />
                        <div className={classNames(styles.skeleton, styles.weeklyIcon)} />
                        <div className={classNames(styles.skeleton, styles.weeklyTemp)} />
                    </div>
                ))}
            </div>
        </div>
    );
};