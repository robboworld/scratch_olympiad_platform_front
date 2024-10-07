import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import styles from './CookieConsent.module.scss';
import { useNavigate } from 'react-router-dom';

const CookieConsent = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/personal-data-processing');
    };

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const agreed = localStorage.getItem('agreedToCookies');
        if (agreed !== 'true') {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('agreedToCookies', 'true');
        setIsVisible(false);
        message.success('Thank you for accepting the cookies!');
    };

    if (!isVisible) return null;

    return (
        <div className={styles.banner}>
            <div>
                <p>To give you the best possible experience, this site uses cookies. By continuing to browse this site you give consent for cookies to be used.</p>
            </div>
            <div
                onClick={handleClick}
                style={{ textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer' }}
            >
                Read more
            </div>
            <Button type="primary" onClick={handleAccept}>
                ACCEPT
            </Button>
        </div>
    );
};

export default CookieConsent;