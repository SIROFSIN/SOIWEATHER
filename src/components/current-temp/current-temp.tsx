import styles from './current-temp.module.scss';
import classNames from 'classnames';
export interface CurrentTempProps {
    className?: string;
    temperature: number;
    unit: string;
}

export const CurrentTemp = ({ className, temperature, unit }: CurrentTempProps) => {
    return (
        <div className={classNames('flex', styles.div1)}>
            <span className={classNames('font-bold', styles.span1)}>{Math.round(temperature)}</span>
            <span className={classNames('ml-2', styles.span2)}>°{unit}</span>
        </div>
    );
};
