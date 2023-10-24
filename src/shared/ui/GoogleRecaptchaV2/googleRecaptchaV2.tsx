import classNames from 'classnames';
import { useEffect, useState, useCallback, memo, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import cls from './GoogleRecaptchaV2.module.less';

interface GoogleRecaptchaV2Props {
    className?: string;
    onChange: (v: string | null) => void;
    size?: 'normal' | 'compact';
    theme?: 'light' | 'dark';
    setReset?: (o: Function) => void;
}

export const GoogleRecaptchaV2 = memo((props: GoogleRecaptchaV2Props) => {
    const { className, onChange, size = 'normal', theme = 'light', setReset } = props;

    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const changeHandler = useCallback(
        (e: string | null) => {
            onChange(e);
        },
        [onChange],
    );

    const asyncScriptOnLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    const onExpired = useCallback(() => {
        onChange(null);
    }, [onChange]);

    const onErrored = useCallback(() => {
        onChange(null);
        console.log('recaptcha error');
    }, [onChange]);

    useEffect(() => {
        timer.current = setTimeout(() => {
            setLoaded(true);
        }, 2000);

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    const resetCallback = useCallback(() => {
        recaptchaRef.current?.reset();
    }, []);

    if (recaptchaRef.current && setReset) {
        setReset(resetCallback);
    }

    return (
        <div className={classNames(cls.googleRecaptchaV2, className)}>
            {loaded === false && <div className={classNames(cls.skeleton, cls[size])} />}
            <div className={classNames(loaded === false ? cls.hide : undefined)}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    theme={theme}
                    size={size}
                    sitekey={__RECAPTCHA_V2_PUBLIC__}
                    onChange={changeHandler}
                    onExpired={onExpired}
                    onErrored={onErrored}
                    asyncScriptOnLoad={asyncScriptOnLoad}
                />
            </div>
        </div>
    );
});
