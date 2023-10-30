import classNames from 'classnames';
import { memo } from 'react';
import cls from './CalculatorPage.module.less';

interface CalculatorPageProps {
    className?: string;
}

const CalculatorPage = memo((props: CalculatorPageProps) => {
    const { className } = props;

    return <div className={classNames(cls.calculatorPage, [className])}>Калькулятор</div>;
});

export default CalculatorPage;
