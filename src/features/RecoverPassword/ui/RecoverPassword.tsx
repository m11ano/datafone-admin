import classNames from 'classnames';
import { memo } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import cls from './RecoverPassword.module.less';

interface RecoverPasswordProps {
    className?: string;
}

export const RecoverPassword = memo((props: RecoverPasswordProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.recoverPassword, [className])}>
            1
            <ReCAPTCHA
                // ref={recaptchaRef}
                sitekey="6Lek2LcoAAAAAAXyi6GUiFMkDzwBl_swy8WGZb5I"
                // onChange={onChange}
            />
        </div>
    );
});
